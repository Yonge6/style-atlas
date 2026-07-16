const { test, expect } = require("@playwright/test");

test.use({ viewport: { width: 390, height: 844 }, locale: "zh-CN" });

async function installNativeMock(page) {
  await page.addInitScript(() => {
    window.__nativeMessages = [];
    window.webkit = {
      messageHandlers: {
        styleAtlas: {
          postMessage(message) {
            window.__nativeMessages.push(message);
          }
        }
      }
    };
    window.STYLE_ATLAS_RUNTIME_CONFIG = {
      nativeShell: true,
      externalGalleryEnabled: false,
      submissionMode: "iap"
    };
  });
}

async function openPlus(page) {
  await page.locator("#drawerBtn").click();
  await page.locator("[data-action='show-plus']").click();
  await expect(page.locator("#plusModal")).toBeVisible();
}

test("core mobile flows remain stable", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");

  await expect(page.locator(".brand strong")).toHaveText("虾子曰艺术风格图鉴");
  await expect(page.locator("meta[name='viewport']")).toHaveAttribute("content", /maximum-scale=1/);
  await expect(page.locator("#randomBtn")).toHaveText("随机");
  await expect(page.locator(".deck-controls #randomBtn")).toHaveCount(1);
  await expect(page.locator("#swipeHint")).toHaveCount(0);
  const initialNumber = await page.locator("#styleDeck .cover-top > span").textContent();

  const deck = page.locator("#styleDeck");
  const box = await deck.boundingBox();
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, { steps: 8 });
  await page.mouse.up();
  await expect(page.locator("#styleDeck .cover-top > span")).not.toHaveText(initialNumber);

  const afterSwipe = await page.locator("#styleDeck .cover-top > span").textContent();
  const nextBox = await deck.boundingBox();
  await page.mouse.move(nextBox.x + nextBox.width * 0.5, nextBox.y + nextBox.height * 0.35);
  await page.mouse.down();
  await page.mouse.move(nextBox.x + nextBox.width * 0.5, nextBox.y + nextBox.height * 0.7, { steps: 8 });
  await page.mouse.up();
  await expect(page.locator("#styleDeck .cover-top > span")).toHaveText(afterSwipe);

  await page.locator("#searchOpenBtn").click();
  await page.locator("#searchInput").fill("Swiss");
  await expect(page.locator("#searchResults .result-card")).toHaveCount(1);
  const resultWidth = await page.locator("#searchResults .result-open").evaluate((node) => node.getBoundingClientRect().width);
  expect(resultWidth).toBeGreaterThan(250);
  await page.locator("#searchResults .result-open").click();
  await expect(page.locator("#detailView")).toHaveClass(/active/);
  await page.locator("#backBtn").click();
  await expect(page.locator("#searchView")).toHaveClass(/active/);
  await expect(page.locator("#searchInput")).toHaveValue("Swiss");

  await page.locator("#drawerBtn").click();
  await expect(page.locator("#drawer")).toHaveAttribute("aria-hidden", "false");
  await page.keyboard.press("Escape");
  await expect(page.locator("#drawer")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator("#drawerBtn")).toBeFocused();
  expect(errors).toEqual([]);
});

test("Chinese brand is exact across product surfaces", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("虾子曰艺术风格图鉴");
  await expect(page.locator("#appShell")).toHaveAttribute("aria-label", "虾子曰艺术风格图鉴");
  await expect(page.locator(".brand strong")).toHaveText("虾子曰艺术风格图鉴");
  await page.locator("#drawerBtn").click();
  await expect(page.locator(".drawer-head strong")).toHaveText("虾子曰艺术风格图鉴");
  await expect(page.locator(".plus-nav")).toHaveText("虾子曰艺术风格图鉴 Plus");
  await page.locator("[data-view='about']").click();
  await expect(page.locator("#aboutContent")).toContainText("关于虾子曰艺术风格图鉴");
  await page.goto("/#screenshots");
  await expect(page.locator("#screenshotsContent")).toContainText("虾子曰艺术风格图鉴");
  expect(await page.locator("body").innerText()).not.toContain("虾子曰 Style Atlas");
});

test("English brand is exact across product surfaces", async ({ page }) => {
  await page.goto("/");
  await page.locator("#langBtn").click();
  await expect(page).toHaveTitle("Xiazishuo Style Atlas");
  await expect(page.locator("#appShell")).toHaveAttribute("aria-label", "Xiazishuo Style Atlas");
  await expect(page.locator(".brand strong")).toHaveText("Xiazishuo Style Atlas");
  await page.locator("#drawerBtn").click();
  await expect(page.locator(".drawer-head strong")).toHaveText("Xiazishuo Style Atlas");
  await expect(page.locator(".plus-nav")).toHaveText("Xiazishuo Style Atlas Plus");
  await page.locator("[data-view='about']").click();
  await expect(page.locator("#aboutContent")).toContainText("About Xiazishuo Style Atlas");
});

test("Chinese purchase failure never exposes Native English debug text", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await page.evaluate(() => {
    window.StyleAtlasNativeBridge.setStoreAction(
      "failed",
      "purchaseFailed",
      "SKErrorDomain raw native English failure"
    );
  });
  await expect(page.locator("#toast")).toHaveText("购买未完成，请稍后重试。");
  await expect(page.locator("#toast")).not.toContainText("SKErrorDomain");
});

for (const [errorCode, expected] of [
  ["productUnavailable", "暂时无法获取 Plus 商品，请稍后再试。"],
  ["productLoadTimeout", "连接 App Store 超时，请检查网络后重试。"],
  ["purchaseVerificationFailed", "购买验证失败，请稍后重试或联系支持。"],
  ["restoreFailed", "恢复购买失败，请检查网络后重试。"]
]) {
  test(`${errorCode} uses localized Web copy`, async ({ page }) => {
    await installNativeMock(page);
    await page.goto("/");
    await page.evaluate((code) => {
      window.StyleAtlasNativeBridge.setStoreAction("failed", code, "Native debug only");
    }, errorCode);
    await expect(page.locator("#toast")).toHaveText(expected);
    await expect(page.locator("#toast")).not.toContainText("Native debug only");
  });
}

test("unknown Native errors use a generic localized message", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await page.evaluate(() => {
    window.StyleAtlasNativeBridge.setStoreAction("failed", "futureUnknownCode", "Sensitive technical details");
  });
  await expect(page.locator("#toast")).toHaveText("操作失败，请稍后重试。");
});

test("localStorage exceptions do not break the app", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("storage read blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("storage write blocked");
    };
  });
  await page.goto("/");
  await expect(page.locator(".brand strong")).toHaveText("虾子曰艺术风格图鉴");
  await page.locator("#searchOpenBtn").click();
  await page.locator("#searchInput").fill("Swiss");
  await expect(page.locator("#searchResults .result-card")).toHaveCount(1);
});

test("corrupted storage JSON recovers to empty arrays", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("styleAtlasSaved", "{broken");
    localStorage.setItem("styleAtlasRecent", "not-json");
  });
  await page.goto("/");
  await page.locator("#drawerBtn").click();
  await page.locator("[data-view='saved']").click();
  await expect(page.locator("#savedCount")).toHaveText("已收藏 0 个风格");
  await expect(page.locator("#savedList .result-card")).toHaveCount(0);
});

test("saved storage removes invalid IDs and duplicates", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("styleAtlasSaved", JSON.stringify(["swiss-style", "missing-style", "swiss-style"]));
  });
  await page.goto("/");
  await page.locator("#drawerBtn").click();
  await page.locator("[data-view='saved']").click();
  await expect(page.locator("#savedCount")).toHaveText("已收藏 1 个风格");
  await expect(page.locator("#savedList .result-card")).toHaveCount(1);
});

test("rapid purchase taps post only one Native message", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await openPlus(page);
  await page.evaluate(() => {
    const button = document.querySelector("#plusCta");
    button.click();
    button.click();
  });
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.filter((item) => item.type === "purchasePlus").length)).toBe(1);
  await expect(page.locator("#plusCta")).toBeDisabled();
});

test("Plus modal traps Tab focus", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await openPlus(page);
  await expect(page.locator("#plusCloseBtn")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("#plusRestoreBtn")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator("#plusCloseBtn")).toBeFocused();
});

test("Plus modal Escape closes and restores trigger focus", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await openPlus(page);
  await page.keyboard.press("Escape");
  await expect(page.locator("#plusModal")).toBeHidden();
  await expect(page.locator("#drawerBtn")).toBeFocused();
});

test("image preview Escape closes and restores image trigger focus", async ({ page }) => {
  await page.goto("/#swiss-style");
  const trigger = page.locator("#galleryGrid [data-action='open-image']").first();
  await trigger.click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await expect(page.locator("#lightboxCloseBtn")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lightbox")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("pending purchase keeps purchase controls disabled", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await openPlus(page);
  await page.evaluate(() => window.StyleAtlasNativeBridge.setStoreAction("pending"));
  await expect(page.locator("#plusCta")).toBeDisabled();
  await expect(page.locator("#plusCta")).toHaveText("购买正在等待处理");
  await expect(page.locator("#plusRestoreBtn")).toBeDisabled();
});

test("restoring state disables restore and purchase controls", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await openPlus(page);
  await page.evaluate(() => window.StyleAtlasNativeBridge.setStoreAction("restoring"));
  await expect(page.locator("#plusRestoreBtn")).toBeDisabled();
  await expect(page.locator("#plusRestoreBtn")).toHaveText("正在恢复购买…");
  await expect(page.locator("#plusCta")).toBeDisabled();
});

test("native paywall uses StoreKit display price and posts purchase and restore", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setProductPrice("¥1.00"));
  await openPlus(page);
  await expect(page.locator("#plusLaunchPrice")).toContainText("¥1.00");
  await expect(page.locator("#plusLaunchPrice")).not.toContainText("¥28");
  await page.locator("#plusCta").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("purchasePlus");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setStoreAction("idle"));
  await page.locator("#plusRestoreBtn").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("restorePurchases");
});

test("compact viewport does not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  const metrics = await page.evaluate(() => ({
    body: document.body.scrollWidth,
    viewport: document.documentElement.clientWidth,
    topbar: document.querySelector(".topbar").getBoundingClientRect().toJSON(),
    search: document.querySelector("#searchOpenBtn").getBoundingClientRect().toJSON(),
    lang: document.querySelector("#langBtn").getBoundingClientRect().toJSON(),
    drawer: document.querySelector("#drawerBtn").getBoundingClientRect().toJSON(),
    deck: document.querySelector("#deckStage").getBoundingClientRect().toJSON()
  }));
  expect(metrics.body).toBeLessThanOrEqual(metrics.viewport);
  expect(metrics.topbar.right).toBeLessThanOrEqual(metrics.viewport + 0.5);
  expect(metrics.search.height).toBe(metrics.lang.height);
  expect(metrics.lang.height).toBe(metrics.drawer.height);
  expect(metrics.topbar.bottom - metrics.search.bottom).toBeGreaterThanOrEqual(8);
  expect(Math.abs(metrics.deck.height - metrics.deck.width * 5 / 3)).toBeLessThan(1);
});

test("saved styles persist and the free limit opens Plus", async ({ page }) => {
  const savedIds = [
    "swiss-style", "bauhaus", "art-deco", "art-nouveau", "constructivism",
    "de-stijl", "futurism", "minimalism", "brutalism", "memphis",
    "editorial-typography", "new-wave-typography", "punk-diy", "grunge",
    "psychedelic-poster", "pop-art-poster", "corporate-modernism",
    "anti-design", "experimental-typography", "kinetic-poster"
  ];
  await page.addInitScript((ids) => {
    localStorage.setItem("styleAtlasSaved", JSON.stringify(ids));
  }, savedIds);

  await page.goto("/");
  await page.locator("#drawerBtn").click();
  await page.locator("[data-view='saved']").click();
  await expect(page.locator("#savedList .result-card")).toHaveCount(20);
  await page.reload();
  await page.locator("#drawerBtn").click();
  await page.locator("[data-view='saved']").click();
  await expect(page.locator("#savedList .result-card")).toHaveCount(20);

  await page.goto("/#baroque");
  await page.locator("#detailContent [data-action='save']").first().click();
  await expect(page.locator("#plusModal")).toBeVisible();
});

test("native entitlement true and false update locked UI", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await expect(page.locator(".locked-section").first()).toBeVisible();
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await expect(page.locator(".locked-section")).toHaveCount(0);
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(false));
  await expect(page.locator(".locked-section").first()).toBeVisible();
});

test("Plus export uses the requested ratio without a free watermark", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await page.locator("[data-action='export-ratio'][data-ratio='1:1']").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("exportImage");
  const dataURL = await page.evaluate(() => window.__nativeMessages.at(-1).payload.dataURL);
  const png = Buffer.from(dataURL.split(",")[1], "base64");
  expect(png.readUInt32BE(16)).toBe(1440);
  expect(png.readUInt32BE(20)).toBe(1440);
});

test("home image request budget stays below fifteen style covers", async ({ page }) => {
  const requested = new Set();
  page.on("request", (request) => {
    if (/\/assets\/styles\/[^/]+\.(webp|png)(?:\?|$)/.test(request.url())) requested.add(request.url());
  });
  await page.goto("/");
  await page.waitForTimeout(500);
  expect(requested.size).toBeLessThanOrEqual(15);
  expect(requested.size).toBeLessThan(120);
});

test("current deck image is high priority and adjacent cards are decoded", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#styleDeck .cover-image")).toHaveAttribute("loading", "eager");
  await expect(page.locator("#styleDeck .cover-image")).toHaveAttribute("decoding", "async");
  await expect(page.locator("#styleDeck .cover-image")).toHaveAttribute("fetchpriority", "high");
  await expect.poll(() => page.locator("#prevGhost .cover-image, #nextGhost .cover-image").evaluateAll((images) =>
    images.length === 2 && images.every((image) => image.complete && image.naturalWidth > 0)
  )).toBe(true);
});

test("ten continuous deck swipes never leave a blank live card", async ({ page }) => {
  await page.goto("/");
  for (let index = 0; index < 10; index += 1) {
    await page.locator("#nextBtn").click();
    await expect.poll(() => page.locator("#styleDeck .cover-image").evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
});

test("offscreen search result images use lazy low-priority loading", async ({ page }) => {
  await page.goto("/");
  await page.locator("#searchOpenBtn").click();
  const image = page.locator("#searchResults .result-card .thumb").last();
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveAttribute("decoding", "async");
  await expect(image).toHaveAttribute("fetchpriority", "low");
});

test("concurrent decode requests reuse one pipeline promise", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const pipeline = window.StyleAtlasPerformance.imagePipeline;
    pipeline.clear();
    const first = pipeline.preload("assets/styles/swiss-style.webp", { priority: "low" });
    const second = pipeline.preload("assets/styles/swiss-style.webp", { priority: "low" });
    const samePromise = first === second;
    await Promise.all([first, second]);
    return { samePromise, size: pipeline.size() };
  });
  expect(result).toEqual({ samePromise: true, size: 1 });
});

test("image decode cache never retains more than seven entries", async ({ page }) => {
  await page.goto("/");
  const size = await page.evaluate(async () => {
    const pipeline = window.StyleAtlasPerformance.imagePipeline;
    pipeline.clear();
    const sources = window.STYLE_ATLAS_DATA.rawStyles.slice(0, 12).map((item) => `assets/styles/${item[0]}.webp`);
    await Promise.all(sources.map((source) => pipeline.preload(source, { priority: "low" }).catch(() => null)));
    return pipeline.size();
  });
  expect(size).toBeLessThanOrEqual(7);
});

test("WebP fallback runs once and failed PNG becomes a stable placeholder", async ({ page }) => {
  const requests = [];
  page.on("request", (request) => {
    if (request.url().includes("missing-performance-image")) requests.push(request.url());
  });
  await page.goto("/");
  await page.evaluate(() => {
    const slot = document.createElement("span");
    slot.className = "image-slot";
    slot.dataset.imageLabel = "Missing image";
    slot.innerHTML = '<img id="missingPerformanceImage" class="image-managed" src="assets/styles/missing-performance-image.webp" alt="Missing image" loading="eager" decoding="async">';
    document.body.append(slot);
    window.StyleAtlasPerformance.prepareImages(slot);
  });
  await expect.poll(() => page.locator("#missingPerformanceImage").getAttribute("data-image-state")).toBe("failed");
  expect(requests.filter((url) => url.endsWith("missing-performance-image.webp")).length).toBe(1);
  expect(requests.filter((url) => url.endsWith("missing-performance-image.png")).length).toBe(1);
  await expect(page.locator("#missingPerformanceImage").locator("xpath=..")).toHaveClass(/image-failed/);
});

test("saving in detail does not rebuild detail content or change scroll", async ({ page }) => {
  await page.addInitScript(() => {
    window.STYLE_ATLAS_RUNTIME_CONFIG = { externalGalleryEnabled: false };
  });
  await page.goto("/#swiss-style");
  await page.waitForTimeout(350);
  await page.evaluate(() => {
    document.querySelector("#detailContent").dataset.identity = "preserve-me";
    window.scrollTo(0, 500);
  });
  const before = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => document.querySelector("#detailContent [data-action='save']").click());
  await expect(page.locator("#detailContent")).toHaveAttribute("data-identity", "preserve-me");
  expect(await page.evaluate(() => window.scrollY)).toBe(before);
});

test("switching detail aborts the previous Wiki request", async ({ page }) => {
  let requestIndex = 0;
  await page.route("**/w/api.php?**", async (route) => {
    requestIndex += 1;
    const title = requestIndex === 1 ? "STALE" : "FRESH";
    await new Promise((resolve) => setTimeout(resolve, requestIndex === 1 ? 300 : 10));
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ query: { pages: { 1: { title, fullurl: "https://example.com", thumbnail: { source: "assets/styles/swiss-style.webp" } } } } })
    });
  });
  await page.goto("/#swiss-style");
  await expect.poll(() => page.evaluate(() => window.StyleAtlasPerformance.getWikiState().activeStyleId)).toBe("swiss-style");
  await page.locator("#detailContent [data-action='open-style']").first().click();
  await expect.poll(() => page.evaluate(() => window.StyleAtlasPerformance.getWikiState().abortedCount)).toBeGreaterThanOrEqual(1);
  await page.waitForTimeout(450);
  await expect(page.locator("#galleryGrid")).not.toContainText("STALE");
});

test("rapid multi-ratio export posts only one Native image message", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await page.evaluate(() => {
    document.querySelectorAll("[data-action='export-ratio']").forEach((button) => button.click());
  });
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.filter((item) => item.type === "exportImage").length)).toBe(1);
});

test("preparing export disables every export control", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await page.evaluate(() => {
    window.StyleAtlasNativeBridge.setPlusAccess(true);
    const original = HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob = function delayed(callback, ...args) {
      setTimeout(() => original.call(this, callback, ...args), 250);
    };
  });
  await page.locator("[data-action='export-ratio'][data-ratio='9:16']").click();
  await expect.poll(() => page.locator("[data-export-control]").evaluateAll((buttons) => buttons.length > 0 && buttons.every((button) => button.disabled))).toBe(true);
  await expect(page.locator("#exportStatus")).toContainText("正在准备图片");
});

test("null canvas blob shows localized failure and restores controls", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await page.evaluate(() => {
    window.StyleAtlasNativeBridge.setPlusAccess(true);
    HTMLCanvasElement.prototype.toBlob = function nullBlob(callback) { callback(null); };
  });
  await page.locator("[data-action='export-ratio'][data-ratio='1:1']").click();
  await expect(page.locator("#toast")).toHaveText("无法创建导出图片，请重试。");
  await expect.poll(() => page.locator("[data-export-control]").evaluateAll((buttons) => buttons.every((button) => !button.disabled))).toBe(true);
});

for (const [ratio, width, height] of [
  ["9:16", 1080, 1920],
  ["4:5", 1200, 1500],
  ["16:9", 1920, 1080]
]) {
  test(`${ratio} export keeps ${width} x ${height} pixels`, async ({ page }) => {
    await installNativeMock(page);
    await page.goto("/#baroque");
    await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
    await page.locator(`[data-action='export-ratio'][data-ratio='${ratio}']`).click();
    await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("exportImage");
    const dataURL = await page.evaluate(() => window.__nativeMessages.at(-1).payload.dataURL);
    const png = Buffer.from(dataURL.split(",")[1], "base64");
    expect(png.readUInt32BE(16)).toBe(width);
    expect(png.readUInt32BE(20)).toBe(height);
  });
}

test("all 120 saved styles render in a scrollable list", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("styleAtlasSaved", JSON.stringify(window.STYLE_ATLAS_DATA.rawStyles.map((item) => item[0])));
  });
  await page.reload();
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await page.locator("#drawerBtn").click();
  await page.locator("[data-view='saved']").click();
  await expect(page.locator("#savedList .result-card")).toHaveCount(120);
  expect(await page.locator("#savedView").evaluate((node) => node.scrollHeight > window.innerHeight)).toBe(true);
});
