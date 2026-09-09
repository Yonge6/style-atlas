const { test, expect } = require("@playwright/test");

test.use({ reducedMotion: "reduce" });
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("styleAtlasLang", "en");
    window.webkit = { messageHandlers: { styleAtlas: { postMessage() {} } } };
    window.STYLE_ATLAS_RUNTIME_CONFIG = { nativeShell: true, submissionMode: "iap", externalGalleryEnabled: false };
  });
});

// Viewport stress cases, not assertions of unverified Duo UIKit point dimensions.
for (const viewport of [{ width: 626, height: 890 }, { width: 890, height: 626 }]) {
  test(`expanded guide separates artwork and instructions at ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/#swiss-style");
    expect((await page.locator("#appShell").boundingBox()).width).toBeGreaterThan(viewport.width * .9);
    await page.locator("[data-action='open-guided']").click();
    const picture = await page.locator(".guided-visual").boundingBox();
    const instructions = await page.locator("#guidedStage").boundingBox();
    expect(picture.x + picture.width).toBeLessThanOrEqual(instructions.x);
    expect(instructions.x + instructions.width).toBeLessThanOrEqual(viewport.width);
    await expect(page.locator("#guidedNextBtn")).toBeInViewport();
  });
}

test("live compact-expanded transitions preserve guide step and document identity", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await page.locator("#guidedNextBtn").click();
  const step = await page.locator("#guidedStepLabel").textContent();
  await page.evaluate(() => { window.__readingNode = document.getElementById("detailTitle"); });
  for (const viewport of [{ width: 626, height: 890 }, { width: 890, height: 626 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await expect(page.locator("#guidedStepLabel")).toHaveText(step);
    expect(await page.evaluate(() => window.__readingNode === document.getElementById("detailTitle"))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  }
  await page.locator("#guidedCloseBtn").click();
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
});

test("reading paragraph remains in place after repeated width changes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#swiss-style");
  await page.evaluate(() => {
    const paragraph = document.querySelector("#detail-apply p");
    window.__paragraph = paragraph;
    scrollTo(0, scrollY + paragraph.getBoundingClientRect().top - document.querySelector(".topbar").getBoundingClientRect().bottom - 20);
  });
  await page.waitForTimeout(120);
  for (const viewport of [{ width: 626, height: 890 }, { width: 890, height: 626 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await expect.poll(() => page.evaluate(() => Math.abs(window.__paragraph.getBoundingClientRect().top - document.querySelector(".topbar").getBoundingClientRect().bottom - 20))).toBeLessThan(8);
  }
});

test("short landscape and large type keep guide actions reachable", async ({ page }) => {
  await page.setViewportSize({ width: 678, height: 360 });
  await page.goto("/#swiss-style");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setTextScale(1.35));
  await page.locator("[data-action='open-guided']").click();
  await page.locator("#guidedNextBtn").click();
  await expect(page.locator("#guidedStepLabel")).toContainText("2");
  await expect(page.locator("#guidedCloseBtn")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
});

test("height-only changes do not move the reading position", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#swiss-style");
  await page.locator("#detail-apply").scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  const before = await page.evaluate(() => scrollY);
  await page.setViewportSize({ width: 390, height: 500 });
  await page.waitForTimeout(120);
  expect(Math.abs(await page.evaluate(() => scrollY) - before)).toBeLessThan(2);
});

test("a covered reading position is restored after resizing and closing the drawer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#swiss-style");
  await page.evaluate(() => {
    window.__paragraph = document.querySelector("#detail-apply p");
    scrollTo(0, scrollY + window.__paragraph.getBoundingClientRect().top - document.querySelector(".topbar").getBoundingClientRect().bottom - 20);
  });
  await page.waitForTimeout(120);
  await page.locator("#drawerBtn").click();
  await page.setViewportSize({ width: 890, height: 626 });
  await page.locator("#drawerCloseBtn").click();
  await expect.poll(() => page.evaluate(() => Math.abs(window.__paragraph.getBoundingClientRect().top - document.querySelector(".topbar").getBoundingClientRect().bottom - 20))).toBeLessThan(8);
});
