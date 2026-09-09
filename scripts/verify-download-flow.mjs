import assert from "node:assert/strict";
import { expect } from "@playwright/test";

const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6787447019?pt=120014121&ct=Website%20Organic&mt=8";
const WECHAT_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0.50";

export async function verifyDownloadFlow(browser, baseURL, screenshotPath) {
  const report = [];
  for (const lang of ["zh", "en"]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: WECHAT_UA });
    await context.addInitScript((language) => {
      localStorage.setItem("styleAtlasLang", language);
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        async writeText(value) { window.__copied = value; }
      } });
    }, lang);
    try {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (response.url().startsWith(baseURL) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      const destination = new URL(`download.html?lang=${lang}`, baseURL).href;
      for (const entry of ["drawer", "about", "plus"]) {
        await page.goto(baseURL);
        if (entry === "plus") {
          await page.goto(`${baseURL}#isometric-illustration`);
          await page.locator("[data-action='show-plus']").first().click();
          await page.locator("#plusCta").click();
        } else {
          await page.locator("#drawerBtn").click();
          if (entry === "drawer") await page.locator("#downloadAppNav").click();
          else {
            await page.locator("#drawerAboutBtn").click();
            await page.locator("#aboutContent .app-store-link").click();
          }
        }
        await expect(page).toHaveURL(destination);
        await expect(page.locator("#wechat-guide")).toBeVisible();
        await expect(page.locator("#guide-result")).toContainText(lang === "zh" ? "无需再次点击下载" : "No second download tap");
        await page.locator("#copy-link").click();
        await expect(page.locator("#copy-feedback")).toContainText(lang === "zh" ? "已复制" : "Link copied");
        assert.equal(await page.evaluate(() => window.__copied), APP_STORE_URL);
        assert.equal(context.pages().length, 1);
      }
      for (const width of [320, 390, 768]) {
        await page.setViewportSize({ width, height: 844 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      if (screenshotPath && lang === "zh") await page.screenshot({ path: screenshotPath });

      // Exercise rejected modern API, legacy success, and total failure separately.
      await page.evaluate(() => {
        navigator.clipboard.writeText = async () => { throw new Error("denied"); };
        document.execCommand = () => { window.__legacyCopy = document.querySelector("textarea").value; return true; };
      });
      await page.locator("#copy-link").click();
      assert.equal(await page.evaluate(() => window.__legacyCopy), APP_STORE_URL);
      await page.evaluate(() => { document.execCommand = () => false; });
      await page.locator("#copy-link").click();
      await expect(page.locator("#copy-feedback")).toContainText(lang === "zh" ? "复制失败" : "Could not copy");
      await expect(page.locator("textarea")).toHaveCount(0);
      assert.deepEqual(errors, []);

      // Simulate the same URL being opened by the default browser; intercept Apple
      // only to record navigation, never to require a real App Store installation.
      const external = await browser.newContext();
      try {
        const safari = await external.newPage();
        await safari.route("https://apps.apple.com/**", (route) => route.fulfill({ contentType: "text/html", body: "App Store destination" }));
        await safari.goto(destination);
        await expect(safari).toHaveURL(APP_STORE_URL);
        await safari.goto(`${destination}&url=https://example.com&redirect=javascript:alert(1)`);
        await expect(safari).toHaveURL(APP_STORE_URL);
        await safari.goto(baseURL);
        await safari.locator("#drawerBtn").click();
        await safari.locator("#downloadAppNav").click();
        await expect(safari).toHaveURL(APP_STORE_URL);
      } finally { await external.close(); }
      report.push({ lang, entries: 3, autoRedirect: "PASS", directDownload: "PASS", clipboard: "modern/legacy/failure PASS", overflow: 0, errors });
    } finally { await context.close(); }
  }
  return report;
}
