const { test, expect } = require("@playwright/test");
const baseURL = process.env.STYLE_ATLAS_TEST_URL || "http://127.0.0.1:8765";
test.use({ baseURL });
const APP_STORE = "https://apps.apple.com/app/apple-store/id6787447019?pt=120014121&ct=Website%20Organic&mt=8";
const WECHAT = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0.50";
const pages = ["/", "/guides/visual-hierarchy-checklist/", "/compare/art-nouveau-vs-art-deco/"];

for (const width of [320, 390, 768, 1440]) {
  test(`banner fits at ${width}px and clears the page header`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator("#appDownloadBanner")).toBeVisible();
      const geometry = await page.evaluate(() => {
        const banner = document.getElementById("appDownloadBanner").getBoundingClientRect();
        const header = document.querySelector(".topbar, .site-header").getBoundingClientRect();
        const cta = document.querySelector(".sa-banner-action").getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth - innerWidth, bottom: banner.bottom, header: header.top, ctaLeft: cta.left, ctaRight: cta.right };
      });
      expect(geometry.overflow).toBe(0);
      expect(geometry.header).toBeGreaterThanOrEqual(geometry.bottom - 1);
      expect(geometry.ctaLeft).toBeGreaterThanOrEqual(0);
      expect(geometry.ctaRight).toBeLessThanOrEqual(width);
    }
  });
}

test("dismissal persists across refresh and article navigation; language stays in sync", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".sa-banner-action")).toHaveText("Get App");
  await page.locator("#langBtn").click();
  await expect(page.locator(".sa-banner-action")).toHaveText("下载 App");
  await page.locator(".sa-banner-close").click();
  await expect(page.locator("#appDownloadBanner")).toHaveCount(0);
  expect(await page.locator(".topbar").evaluate(el => el.getBoundingClientRect().top)).toBe(0);
  await page.reload();
  await expect(page.locator("#appDownloadBanner")).toHaveCount(0);
  await page.goto(pages[1]);
  await expect(page.locator("#appDownloadBanner")).toHaveCount(0);
});

test("WeChat banner navigates in the same tab; external browser continues to Apple", async ({ browser }) => {
  const context = await browser.newContext({ userAgent: WECHAT, baseURL, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(path);
    await page.locator(".sa-banner-action").click();
    await expect(page).toHaveURL(/\/download.html\?lang=en$/);
    await expect(page.locator("#wechat-guide")).toBeVisible();
    expect(context.pages()).toHaveLength(1);
  }
  await context.close();
  const external = await browser.newPage();
  await external.route("https://apps.apple.com/**", r => r.fulfill({ body: "Apple destination" }));
  await external.goto(`${baseURL}/download.html?lang=en`);
  await expect(external).toHaveURL(APP_STORE);
  await external.goto(`${baseURL}/`);
  await external.locator(".sa-banner-action").click();
  await expect(external).toHaveURL(APP_STORE);
  await external.close();
});

test("native app omits banner and blocked storage still permits closing", async ({ browser }) => {
  const native = await browser.newContext();
  await native.addInitScript(() => { window.webkit = { messageHandlers: { styleAtlas: { postMessage() {} } } }; });
  const page = await native.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator("#appDownloadBanner")).toHaveCount(0);
  await native.close();
  const restricted = await browser.newContext();
  await restricted.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", { get() { throw new Error("storage blocked"); } });
  });
  const restrictedPage = await restricted.newPage();
  await restrictedPage.goto(`${baseURL}/`);
  await restrictedPage.locator(".sa-banner-close").click();
  await expect(restrictedPage.locator("#appDownloadBanner")).toHaveCount(0);
  await restricted.close();
});
