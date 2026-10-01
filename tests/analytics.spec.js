const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); });
  await page.route('https://style-atlas.wonderelian.com/**', async route => {
    const name = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\//, '') || 'index.html';
    if (name.includes('..')) return route.abort();
    try { await route.fulfill({ path: path.join(root, name) }); } catch { await route.fulfill({ status: 404, body: '' }); }
  });
  await page.route(/googletagmanager|google-analytics/, route => route.fulfill({ body: '' }));
});
test('default off, explicit consent, withdrawal, fresh page remains denied', async ({ page }) => {
  await page.goto('https://style-atlas.wonderelian.com/');
  await expect(page.locator('.atlas-usage-consent')).toBeVisible();
  await expect(page.locator('iframe[title="Usage analytics"]')).toHaveCount(0);
  await page.locator('[data-consent="yes"]').click();
  await expect(page.locator('iframe[title="Usage analytics"]')).toHaveCount(1);
  await expect.poll(() => page.frames().find(f => f.url().includes('analytics-frame'))?.evaluate(() => window.dataLayer?.filter(v => v[0] === 'event').map(v => v[1]))).toContain('atlas_v1_visit');
  await page.locator('#drawerBtn').click();
  await page.locator('.atlas-usage-setting').click();
  await expect(page.locator('iframe[title="Usage analytics"]')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('.atlas-usage-consent')).toBeHidden();
  await expect(page.locator('iframe[title="Usage analytics"]')).toHaveCount(0);
});
test('preview excludes transmission even after permission', async ({ page }) => {
  await page.goto('https://style-atlas.wonderelian.com/?analytics=off');
  await page.locator('[data-consent="yes"]').click();
  await expect(page.locator('iframe[title="Usage analytics"]')).toHaveCount(0);
});
test('native sends only bridge events and withdrawal stops them', async ({ page }) => {
  await page.addInitScript(() => {
    window.records = [];
    window.STYLE_ATLAS_RUNTIME_CONFIG = { nativeShell: true };
    window.webkit = { messageHandlers: { styleAtlas: { postMessage: e => window.records.push(e) } } };
  });
  await page.goto('https://style-atlas.wonderelian.com/');
  await page.locator('[data-consent="yes"]').click();
  await page.evaluate(() => window.StyleAtlasAnalytics.track('favorite', { style_id: 'bauhaus', note: 'private note' }));
  const events = await page.evaluate(() => window.records.filter(e => e.type === 'analyticsEvent'));
  expect(events.some(e => e.payload.name === 'atlas_v1_favorite')).toBeTruthy();
  expect(JSON.stringify(events)).not.toContain('private note');
  expect(events.every(e => e.payload.parameters.surface === 'ios')).toBeTruthy();
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.evaluate(() => window.StyleAtlasAnalytics.consent(false));
  const before = await page.evaluate(() => window.records.length);
  await page.evaluate(() => window.StyleAtlasAnalytics.track('favorite'));
  expect(await page.evaluate(() => window.records.length)).toBe(before);
});
test('consent is readable on mobile and does not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://style-atlas.wonderelian.com/?analytics=off');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.locator('[data-consent="no"]').click();
  await expect(page.locator('.atlas-usage-consent')).toBeHidden();
  await page.locator('#drawerBtn').click();
  await page.locator('.atlas-usage-setting').click();
  await expect(page.locator('#drawer')).not.toHaveClass(/open/);
  await expect(page.locator('.atlas-usage-consent')).toBeVisible();
});
