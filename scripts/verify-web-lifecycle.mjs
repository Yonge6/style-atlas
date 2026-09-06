import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";

const baseURL = process.argv[2] || "http://127.0.0.1:8766/";
const screenshotPath = process.argv[3];
const browser = await chromium.launch();
const report = [];
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1024, height: 768 }]) {
    const context = await browser.newContext({ viewport, timezoneId: "Asia/Shanghai" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.url().startsWith(baseURL) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.clock.install({ time: new Date("2026-09-05T15:59:58Z") });
    await page.clock.pauseAt(new Date("2026-09-05T15:59:59Z"));
    await page.goto(baseURL);
    await page.locator("#styleDeck h2").waitFor();
    assert.equal(await page.locator("#styleDeck h2").textContent(), "Synthwave");
    await page.clock.runFor(1500);
    assert.notEqual(await page.locator("#styleDeck h2").textContent(), "Synthwave");
    await page.clock.resume();
    await page.locator("#searchOpenBtn").click();
    await page.locator("#searchInput").fill("Swiss");
    assert.equal(await page.locator("#searchResults .result-card").first().getAttribute("data-style"), "swiss-style");
    await page.locator("#searchResults .result-open").first().click();
    await page.locator("#detailTitle").waitFor();
    const title = await page.locator("#detailTitle").textContent();
    await page.clock.setSystemTime(new Date("2026-09-07T04:00:00Z"));
    await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
    assert.equal(await page.locator("#detailTitle").textContent(), title);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.equal(overflow, 0);
    assert.deepEqual(errors, []);
    if (screenshotPath && viewport.width === 390) await page.screenshot({ path: screenshotPath });
    report.push({ viewport, midnight: "PASS", search: "PASS", guidePreserved: "PASS", overflow, errors });
    await context.close();
  }
  const wechat = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0.50"
  });
  await wechat.addInitScript(() => {
    localStorage.setItem("styleAtlasLang", "zh");
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      async writeText(value) { window.__copiedAppLink = value; }
    } });
  });
  const page = await wechat.newPage();
  await page.goto(baseURL);
  await page.locator("#drawerBtn").click();
  await page.locator("#downloadAppNav").click();
  await expect(page.locator("#wechatDownloadGuide")).toBeVisible();
  await page.locator("#wechatDownloadCopyBtn").click();
  await expect(page.locator("#wechatDownloadStatus")).toContainText("已复制");
  await expect(page.locator("#toast")).not.toHaveClass(/show/);
  assert.equal(await page.evaluate(() => window.__copiedAppLink), "https://apps.apple.com/app/apple-store/id6787447019?pt=120014121&ct=Website%20Organic&mt=8");
  await page.locator("#wechatDownloadGotItBtn").click();
  await page.locator("#drawerBtn").click();
  await page.locator("#drawerAboutBtn").click();
  await page.locator("#aboutContent .app-store-link").click();
  await expect(page.locator("#wechatDownloadGuide")).toBeVisible();
  await page.locator("#wechatDownloadCloseBtn").click();
  await page.goto(`${baseURL}#isometric-illustration`);
  await page.locator("[data-action='show-plus']").first().click();
  await page.locator("#plusCta").click();
  await expect(page.locator("#wechatDownloadGuide")).toBeVisible();
  await wechat.close();
  console.log(JSON.stringify({ baseURL, report, wechatDownload: "3 entries PASS; copy PASS; duplicate toast absent" }, null, 2));
} finally {
  await browser.close();
}
