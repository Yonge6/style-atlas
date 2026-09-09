import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

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
  const { verifyDownloadFlow } = await import("./verify-download-flow.mjs");
  const wechatDownload = await verifyDownloadFlow(browser, baseURL, screenshotPath ? screenshotPath.replace(/\.png$/, "-download.png") : undefined);
  console.log(JSON.stringify({ baseURL, report, wechatDownload }, null, 2));
} finally {
  await browser.close();
}
