const { test, expect } = require('@playwright/test');
const path = require('node:path');
test('real Google tag serializes events while all collection requests are intercepted', async ({ page }) => {
  test.skip(process.env.ATLAS_WIRE_QA !== '1', 'Opt-in external SDK download; never transmits collection requests.');
  const sent = [];
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await page.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.hostname === 'style-atlas.wonderelian.com') {
      const name = decodeURIComponent(url.pathname).slice(1) || 'index.html';
      if (name.includes('..')) return route.abort();
      try { return await route.fulfill({ path: path.resolve(__dirname, '..', name) }); } catch { return route.fulfill({status:404,body:''}); }
    }
    if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') return route.continue();
    // Block every other external request before it leaves the browser.
    sent.push(url.search + '&' + (request.postData() || ''));
    return route.fulfill({status:204,body:''});
  });
  await page.goto('https://style-atlas.wonderelian.com/');
  await page.locator('[data-consent="yes"]').click();
  await page.evaluate(() => window.StyleAtlasAnalytics.track('style_view',{style_id:'bauhaus'}));
  await expect.poll(() => sent.join('\n'), {timeout:20000}).toContain('atlas_v1_style_view');
  expect(sent.join('\n')).toContain('bauhaus');
  expect(sent.join('\n')).not.toContain('file%3A');
});
