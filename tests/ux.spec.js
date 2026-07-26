const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

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

async function dispatchTouchGesture(page, selector, points) {
  await page.locator(selector).evaluate((node, gesturePoints) => {
    const dispatch = (type, point, touches) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      const touch = point ? {
        identifier: 7,
        target: node,
        clientX: point.x,
        clientY: point.y,
        pageX: point.x,
        pageY: point.y,
        screenX: point.x,
        screenY: point.y
      } : null;
      Object.defineProperty(event, "touches", { value: touches && touch ? [touch] : [] });
      Object.defineProperty(event, "targetTouches", { value: touches && touch ? [touch] : [] });
      Object.defineProperty(event, "changedTouches", { value: touch ? [touch] : [] });
      node.dispatchEvent(event);
    };
    dispatch("touchstart", gesturePoints[0], true);
    gesturePoints.slice(1).forEach((point) => dispatch("touchmove", point, true));
    dispatch("touchend", gesturePoints[gesturePoints.length - 1], false);
  }, points);
}

test("core mobile flows remain stable", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");

  await expect(page.locator(".brand-primary")).toHaveText("虾子曰");
  await expect(page.locator(".brand-secondary")).toHaveText("艺术风格图鉴");
  await expect(page.locator(".brand-icon")).toBeVisible();
  await expect(page.locator("meta[name='viewport']")).not.toHaveAttribute("content", /maximum-scale=1/);
  await expect(page.locator("#randomBtn")).toHaveText("随机");
  await expect(page.locator("#todayLabel")).toHaveText("今日推荐");
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

test("iOS-style touch swipe changes cards while vertical touch does not", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator("#styleDeck .cover-top > span").textContent();
  await dispatchTouchGesture(page, "#styleDeck", [
    { x: 320, y: 420 },
    { x: 275, y: 422 },
    { x: 220, y: 423 }
  ]);
  await expect(page.locator("#styleDeck .cover-top > span")).not.toHaveText(before);

  const afterHorizontal = await page.locator("#styleDeck .cover-top > span").textContent();
  await dispatchTouchGesture(page, "#styleDeck", [
    { x: 190, y: 360 },
    { x: 192, y: 420 },
    { x: 193, y: 485 }
  ]);
  await expect(page.locator("#styleDeck .cover-top > span")).toHaveText(afterHorizontal);
  await expect(page.locator("#deckStage")).not.toHaveClass(/dragging|is-animating/);
});

test("native shell ignores compatibility mouse drags and consumes one touch swipe", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  const before = await page.locator("#styleDeck .cover-top > span").textContent();
  const deck = page.locator("#styleDeck");
  const box = await deck.boundingBox();
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, { steps: 8 });
  await page.mouse.up();
  await expect(page.locator("#styleDeck .cover-top > span")).toHaveText(before);

  await dispatchTouchGesture(page, "#styleDeck", [
    { x: 320, y: 420 },
    { x: 270, y: 421 },
    { x: 215, y: 422 }
  ]);
  await expect(page.locator("#styleDeck .cover-top > span")).not.toHaveText(before);
});

test("home introduction follows the card controls and random uses a card transition", async ({ page }) => {
  await page.goto("/");
  const order = await page.locator("#homeView").evaluate((home) => {
    const controls = home.querySelector(".deck-controls");
    const copy = home.querySelector("#positioningCopy");
    return Boolean(controls.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(order).toBe(true);

  const before = await page.locator("#styleDeck .cover-top > span").textContent();
  await page.locator("#randomBtn").click();
  await expect(page.locator("#deckStage")).toHaveClass(/random-out|random-in/);
  await expect(page.locator("#randomBtn")).toBeDisabled();
  await expect(page.locator("#styleDeck .cover-top > span")).not.toHaveText(before);
  await expect(page.locator("#randomBtn")).toBeEnabled();
  await expect(page.locator("#deckStage")).not.toHaveClass(/random-out|random-in|is-animating/);
});

test("detail view supports a left-edge touch gesture to return", async ({ page }) => {
  await page.goto("/");
  await page.locator("#styleDeck").click({ position: { x: 180, y: 260 } });
  await expect(page.locator("#detailView")).toHaveClass(/active/);
  await dispatchTouchGesture(page, "#detailView", [
    { x: 5, y: 410 },
    { x: 52, y: 411 },
    { x: 118, y: 412 }
  ]);
  await expect(page.locator("#homeView")).toHaveClass(/active/);
  await expect(page.locator("#detailView")).not.toHaveClass(/edge-back-dragging|edge-back-settling/);
});

test("detail edge back accepts a short fast gesture from the wider edge zone", async ({ page }) => {
  await page.goto("/");
  await page.locator("#styleDeck").click({ position: { x: 180, y: 260 } });
  await expect(page.locator("#detailView")).toHaveClass(/active/);
  await dispatchTouchGesture(page, "#detailView", [
    { x: 42, y: 410 },
    { x: 68, y: 411 }
  ]);
  await expect(page.locator("#homeView")).toHaveClass(/active/);
});

test("native file mode requests a clean bundled image before canvas export", async ({ page }) => {
  await page.addInitScript(() => {
    window.__nativeMessages = [];
    window.webkit = {
      messageHandlers: {
        styleAtlas: {
          postMessage(message) {
            window.__nativeMessages.push(message);
            if (message.type !== "readBundledAsset") return;
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1500"><rect width="900" height="1500" fill="#8b5a2b"/></svg>';
            const dataURL = `data:image/svg+xml;base64,${btoa(svg)}`;
            setTimeout(() => window.StyleAtlasNativeBridge?.resolveBundledAsset(message.payload.requestId, dataURL, ""));
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
  const localIndex = pathToFileURL(path.resolve(__dirname, "..", "index.html")).href;
  await page.goto(localIndex);
  await page.locator("#styleDeck [data-action='share']").click();
  await expect.poll(async () => page.evaluate(() => window.__nativeMessages.map((message) => message.type))).toContain("shareImage");
  const messages = await page.evaluate(() => window.__nativeMessages);
  expect(messages.filter((message) => message.type === "readBundledAsset")).toHaveLength(1);
  expect(messages.filter((message) => message.type === "shareImage")).toHaveLength(1);
});

test("Chinese brand is exact across product surfaces", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("虾子曰艺术风格图鉴");
  await expect(page.locator("#appShell")).toHaveAttribute("aria-label", "虾子曰艺术风格图鉴");
  await expect(page.locator(".brand-primary")).toHaveText("虾子曰");
  await expect(page.locator(".brand-secondary")).toHaveText("艺术风格图鉴");
  await page.locator("#drawerBtn").click();
  await expect(page.locator(".drawer-head strong")).toHaveText("虾子曰艺术风格图鉴");
  await expect(page.locator(".drawer-nav [data-view='detail']")).toHaveCount(0);
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
  await expect(page.locator(".brand-primary")).toHaveText("Xiazishuo");
  await expect(page.locator(".brand-secondary")).toHaveText("Style Atlas");
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
  await expect(page.locator(".brand-primary")).toHaveText("虾子曰");
  await expect(page.locator(".brand-secondary")).toHaveText("艺术风格图鉴");
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
  await expect(page.locator("#plusPanel")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator("#plusCta")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("#plusCloseBtn")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator("#plusCta")).toBeFocused();
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
  const trigger = page.locator(".detail-hero [data-action='open-image']");
  await trigger.click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await expect(page.locator("#lightbox")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lightbox")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("detail hero is the only default local artwork and opens the shared image preview", async ({ page }) => {
  await page.goto("/#swiss-style");
  const trigger = page.locator(".detail-hero [data-action='open-image']");
  await expect(page.locator(".detail-hero img[src*='swiss-style.webp']")).toHaveCount(1);
  await expect(page.locator("#galleryGrid img[src*='swiss-style.webp']")).toHaveCount(0);
  await trigger.click();
  await expect(page.locator("#lightbox")).toBeVisible();
  await expect(page.locator("#lightboxImage")).toHaveAttribute("src", /swiss-style\.webp/);
});

test("detail overview copy includes style names and summary without rebuilding the hero", async ({ page }) => {
  await page.addInitScript(() => {
    window.__copiedOverview = "";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (value) => { window.__copiedOverview = value; } }
    });
  });
  await page.goto("/#swiss-style");
  await page.locator(".detail-hero").evaluate((node) => { node.dataset.copyIdentity = "preserved"; });
  await page.locator(".detail-hero [data-action='copy-overview']").click();
  await expect.poll(() => page.evaluate(() => window.__copiedOverview)).toContain("Swiss Style");
  await expect.poll(() => page.evaluate(() => window.__copiedOverview)).toContain("瑞士国际主义风格");
  await expect(page.locator(".detail-hero")).toHaveAttribute("data-copy-identity", "preserved");
  await expect(page.locator("#toast")).toHaveText("已复制");
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

test("Plus export renders pure artwork without any canvas text", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await page.evaluate(() => {
    window.__canvasText = [];
    const original = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function captureText(value, ...args) {
      window.__canvasText.push(String(value));
      return original.call(this, value, ...args);
    };
    window.StyleAtlasNativeBridge.setPlusAccess(true);
  });
  await page.locator("[data-action='export-ratio'][data-ratio='4:5']").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("exportImage");
  expect(await page.evaluate(() => window.__canvasText)).toEqual([]);
});

test("detail share card omits the metadata row and style tags", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#swiss-style");
  const tags = await page.locator(".detail-hero .chip").allTextContents();
  await page.evaluate(() => {
    window.__canvasText = [];
    const original = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function captureText(value, ...args) {
      window.__canvasText.push(String(value));
      return original.call(this, value, ...args);
    };
  });
  await page.locator(".detail-hero [data-action='share']").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("shareImage");
  const canvasText = await page.evaluate(() => window.__canvasText);
  expect(canvasText.join(" ")).toContain("Swiss Style");
  expect(canvasText).not.toContain("#1");
  expect(canvasText.join(" ")).not.toContain("Free");
  tags.forEach((tag) => expect(canvasText).not.toContain(tag));
});

test("home share card omits the top style number and product name", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  const styleNumber = await page.locator("#styleDeck .cover-top > span").textContent();
  await page.evaluate(() => {
    window.__canvasText = [];
    const original = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function captureText(value, ...args) {
      window.__canvasText.push(String(value));
      return original.call(this, value, ...args);
    };
  });
  await page.locator("#styleDeck [data-action='share']").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("shareImage");
  const canvasText = await page.evaluate(() => window.__canvasText);
  expect(canvasText).not.toContain(styleNumber);
  expect(canvasText.filter((value) => value === "虾子曰艺术风格图鉴")).toHaveLength(1);
});

test("detail overview uses a bottom-right icon copy control and hides free preview label", async ({ page }) => {
  await page.goto("/#baroque");
  const copy = page.locator(".detail-hero .overview-copy-btn");
  await expect(copy).toBeVisible();
  await expect(copy).toHaveText("⧉");
  await expect(copy).toHaveAttribute("aria-label", "复制风格介绍");
  await expect(page.locator(".access-note")).toHaveCount(0);
  const position = await copy.evaluate((button) => {
    const buttonRect = button.getBoundingClientRect();
    const cardRect = button.closest(".detail-hero").getBoundingClientRect();
    return {
      right: Math.round(cardRect.right - buttonRect.right),
      bottom: Math.round(cardRect.bottom - buttonRect.bottom)
    };
  });
  expect(position.right).toBeLessThanOrEqual(18);
  expect(position.bottom).toBeLessThanOrEqual(18);
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

test("viewport permits user scaling and does not opt out", async ({ page }) => {
  await page.goto("/");
  const content = await page.locator("meta[name='viewport']").getAttribute("content");
  expect(content).not.toContain("maximum-scale=1");
  expect(content).not.toContain("user-scalable=no");
  expect(content).toContain("viewport-fit=cover");
});

test("core navigation remains operable at 200 percent visual zoom", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await page.locator("#searchOpenBtn").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#searchView")).toHaveClass(/active/);
  await expect(page.locator("#searchInput")).toBeFocused();
});

for (const viewport of [
  { width: 320, height: 700 },
  { width: 430, height: 932 }
]) {
  test(`${viewport.width}px header controls do not overlap`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const boxes = await page.locator(".topbar > *, .top-actions > *").evaluateAll((nodes) => nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { id: node.id || node.className, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    }));
    const actions = boxes.filter((box) => ["searchOpenBtn", "langBtn", "drawerBtn"].includes(box.id));
    for (let index = 1; index < actions.length; index += 1) {
      expect(actions[index].left).toBeGreaterThanOrEqual(actions[index - 1].right - 0.5);
    }
    expect(Math.max(...actions.map((box) => box.right))).toBeLessThanOrEqual(viewport.width + 0.5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
  });
}

test("core interactive controls meet the 44 by 44 target", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  const selectors = ["#searchOpenBtn", "#langBtn", "#drawerBtn", "#prevBtn", "#nextBtn", "#randomBtn", "#styleDeck .card-action"];
  for (const selector of selectors) {
    const boxes = await page.locator(selector).evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().toJSON()));
    expect(boxes.length).toBeGreaterThan(0);
    boxes.forEach((box) => {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    });
  }
  await openPlus(page);
  for (const selector of ["#plusCta", "#plusRestoreBtn", "#plusCloseBtn"]) {
    const box = await page.locator(selector).boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});

test("saved controls expose pressed state and style-specific labels", async ({ page }) => {
  await page.goto("/");
  const save = page.locator("#styleDeck [data-action='save']");
  await expect(save).toHaveAttribute("aria-pressed", "false");
  await expect(save).toHaveAttribute("aria-label", /收藏.+/);
  await save.click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await expect(save).toHaveAttribute("aria-label", /取消收藏.+已收藏/);
});

test("Plus uses a named modal dialog with a description", async ({ page }) => {
  await page.goto("/");
  await openPlus(page);
  const dialog = page.locator("#plusPanel");
  await expect(dialog).toHaveAttribute("role", "dialog");
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveAttribute("aria-labelledby", "plusTitle");
  await expect(dialog).toHaveAttribute("aria-describedby", /plusSubtitle/);
  await expect(dialog).toBeFocused();
});

test("image preview uses a named modal dialog with coordinated description", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".detail-hero [data-action='open-image']").click();
  await expect(page.locator("#lightbox")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#lightbox")).toHaveAttribute("aria-modal", "true");
  await expect(page.locator("#lightbox")).toHaveAttribute("aria-labelledby", "lightboxTitle");
  await expect(page.locator("#lightboxDescription")).toContainText(/瑞士/);
  await expect(page.locator("#lightbox")).toBeFocused();
});

test("drawer makes the full background inert and restores it on close", async ({ page }) => {
  await page.goto("/");
  await page.locator("#drawerBtn").click();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator(".topbar")).toHaveAttribute("inert", "");
  await expect(page.locator("#drawerCloseBtn")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await expect(page.locator(".topbar")).not.toHaveAttribute("inert", "");
});

test("inactive views are hidden from focus and the accessibility tree", async ({ page }) => {
  await page.goto("/");
  for (const selector of ["#detailView", "#searchView", "#savedView", "#aboutView", "#screenshotsView"]) {
    await expect(page.locator(selector)).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(selector)).toHaveAttribute("inert", "");
  }
  await page.locator("#searchOpenBtn").click();
  await expect(page.locator("#searchView")).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator("#searchView")).not.toHaveAttribute("inert", "");
  await expect(page.locator("#homeView")).toHaveAttribute("inert", "");
});

test("home style card has a readable role description and natural label", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#styleDeck")).toHaveAttribute("aria-roledescription", "风格卡片");
  await expect(page.locator("#styleDeck")).toHaveAttribute("aria-label", /查看.+风格详情/);
  await expect(page.locator("#styleDeck .cover-image")).toHaveAttribute("alt", "");
  await expect(page.locator("#styleDeck .cover-image")).toHaveAttribute("aria-hidden", "true");
});

test("style changes update a concise live announcement without internal numbering", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator("#deckAnnouncement").textContent();
  await page.locator("#nextBtn").click();
  await expect(page.locator("#deckAnnouncement")).not.toHaveText(before);
  const announcement = await page.locator("#deckAnnouncement").textContent();
  expect(announcement).toContain("已切换到");
  expect(announcement).not.toMatch(/\d+\s*\/\s*120/);
});

test("category preview images are decorative", async ({ page }) => {
  await page.goto("/");
  const images = page.locator("#categoryChips .category-stack img");
  await expect(images).toHaveCount(27);
  expect(await images.evaluateAll((nodes) => nodes.every((image) => image.alt === "" && image.getAttribute("aria-hidden") === "true"))).toBe(true);
});

test("reduced motion uses automatic scrolling and skips card fly animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => window.StyleAtlasAccessibility.prefersReducedMotion())).toBe(true);
  const before = await page.locator("#styleDeck .cover-top > span").textContent();
  await page.locator("#nextBtn").click();
  await expect(page.locator("#styleDeck .cover-top > span")).not.toHaveText(before);
  await expect(page.locator("#deckStage")).not.toHaveClass(/fly-left|fly-right|is-animating/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("Escape closes only the topmost available layer", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await page.locator("#drawerBtn").click();
  await page.locator("[data-action='show-plus']").click();
  await expect(page.locator("#plusModal")).toBeVisible();
  await expect(page.locator("#drawer")).toHaveAttribute("aria-hidden", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#plusModal")).toBeHidden();
  await expect(page.locator("#drawer")).toHaveAttribute("aria-hidden", "true");
});

test("search input and results region have explicit accessible names", async ({ page }) => {
  await page.goto("/");
  await page.locator("#searchOpenBtn").click();
  await expect(page.locator("#searchInput")).toHaveAttribute("aria-labelledby", "searchLabel");
  await expect(page.locator("#searchResults")).toHaveAttribute("role", "region");
  await expect(page.locator("#searchResults")).toHaveAttribute("aria-labelledby", "searchResultsTitle");
  await expect(page.locator("#searchResultsTitle")).toContainText("120");
});

test("search result opens with external keyboard activation", async ({ page }) => {
  await page.goto("/");
  await page.locator("#searchOpenBtn").click();
  await page.locator("#searchInput").fill("Swiss");
  await page.locator("#searchResults .result-open").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#detailView")).toHaveClass(/active/);
  await expect(page.locator("#detailContent h1")).toBeFocused();
});

test("export ratio is operable with Space on an external keyboard", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#baroque");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  const ratio = page.locator("[data-action='export-ratio'][data-ratio='4:5']");
  await ratio.focus();
  await page.keyboard.press("Space");
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.filter((item) => item.type === "exportImage").length)).toBe(1);
});

test("focus-visible treatment is present and visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  const style = await focused.evaluate((node) => {
    const computed = getComputedStyle(node);
    return { width: computed.outlineWidth, style: computed.outlineStyle, color: computed.outlineColor };
  });
  expect(parseFloat(style.width)).toBeGreaterThanOrEqual(2);
  expect(style.style).not.toBe("none");
  expect(style.color).not.toBe("rgba(0, 0, 0, 0)");
});

test("Plus actions remain within the panel at 150 percent text size", async ({ page }) => {
  await installNativeMock(page);
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await page.evaluate(() => { document.documentElement.style.fontSize = "150%"; });
  await openPlus(page);
  const metrics = await page.locator("#plusPanel").evaluate((panel) => ({
    clientWidth: panel.clientWidth,
    scrollWidth: panel.scrollWidth,
    cta: panel.querySelector("#plusCta").getBoundingClientRect().toJSON(),
    panel: panel.getBoundingClientRect().toJSON()
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(metrics.cta.left).toBeGreaterThanOrEqual(metrics.panel.left);
  expect(metrics.cta.right).toBeLessThanOrEqual(metrics.panel.right + 0.5);
});

test("Plus close control stays at the panel top-right and purchase is the primary action", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setProductPrice("¥1.00"));
  await openPlus(page);
  const layout = await page.locator("#plusPanel").evaluate((panel) => {
    const panelBox = panel.getBoundingClientRect();
    const closeBox = panel.querySelector("#plusCloseBtn").getBoundingClientRect();
    const cta = panel.querySelector("#plusCta");
    const style = getComputedStyle(cta);
    return {
      closeTop: closeBox.top - panelBox.top,
      closeRight: panelBox.right - closeBox.right,
      ctaBackground: style.backgroundColor,
      ctaHeight: cta.getBoundingClientRect().height
    };
  });
  expect(layout.closeTop).toBeLessThanOrEqual(24);
  expect(layout.closeRight).toBeLessThanOrEqual(24);
  expect(layout.ctaBackground).toBe("rgb(221, 180, 85)");
  expect(layout.ctaHeight).toBeGreaterThanOrEqual(50);
});

test("safe area environment variables cover header overlays and page bottom", async ({ page }) => {
  await page.goto("/");
  const css = await page.evaluate(async () => (await fetch("styles.css")).text());
  for (const inset of ["top", "right", "bottom", "left"]) {
    expect(css).toContain(`env(safe-area-inset-${inset})`);
  }
});

for (const [view, open] of [
  ["home", async (page) => page.goto("/")],
  ["search", async (page) => { await page.goto("/"); await page.locator("#searchOpenBtn").click(); }],
  ["saved", async (page) => { await page.goto("/"); await page.locator("#drawerBtn").click(); await page.locator("[data-view='saved']").click(); }],
  ["about", async (page) => { await page.goto("/"); await page.locator("#drawerBtn").click(); await page.locator("[data-view='about']").click(); }],
  ["detail", async (page) => page.goto("/#swiss-style")]
]) {
  test(`${view} view exposes exactly one primary heading`, async ({ page }) => {
    await open(page);
    await expect(page.locator(".view.active h1")).toHaveCount(1);
  });
}

test("hidden dialogs cannot retain keyboard focus", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#plusModal")).toBeHidden();
  await expect(page.locator("#lightbox")).toBeHidden();
  expect(await page.evaluate(() => !document.activeElement.closest("#plusModal, #lightbox"))).toBe(true);
});

test("accessibility diagnostics are absent by default and opt-in by query", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#a11yDebugPanel")).toHaveCount(0);
  await page.goto("/?debug=a11y");
  await expect(page.locator("#a11yDebugPanel")).toBeVisible();
  await expect(page.locator("#a11yDebugPanel")).toContainText("View");
  await expect(page.locator("#a11yDebugPanel")).toContainText("Decode");
  await expect(page.locator("#a11yDebugPanel")).toHaveAttribute("aria-hidden", "true");
});

const originalEnhancedGuideIds = [
  "swiss-style",
  "art-deco",
  "impressionism",
  "van-gogh",
  "chinese-ink-painting",
  "ukiyo-e",
  "dunhuang-mural",
  "islamic-geometric",
  "african-tribal-pattern",
  "mexican-muralism",
  "editorial-illustration",
  "solarpunk"
];

const batchOneGuideIds = [
  "bauhaus",
  "art-nouveau",
  "constructivism",
  "minimalism",
  "memphis",
  "baroque",
  "romanticism",
  "post-impressionism",
  "fauvism",
  "surrealism",
  "gongbi",
  "shanshui",
  "sumi-e",
  "nihonga",
  "indian-miniature",
  "korean-minhwa",
  "madhubani",
  "chinese-new-year-woodblock",
  "aboriginal-dot-painting",
  "nordic-folk-art"
];

const batchTwoGuideIds = [
  "renaissance",
  "rococo",
  "neoclassicism",
  "realism",
  "academic-painting",
  "pre-raphaelite",
  "monet",
  "cezanne",
  "matisse",
  "picasso-cubism",
  "gustav-klimt",
  "kandinsky",
  "mondrian",
  "rothko",
  "expressionism",
  "german-expressionism",
  "symbolism",
  "dada",
  "abstract-expressionism",
  "color-field-painting"
];

const original32GuideFingerprints = {
  "swiss-style": "b6f70828",
  "art-deco": "e556a3de",
  "impressionism": "afff473e",
  "van-gogh": "93fb129f",
  "chinese-ink-painting": "0366cc26",
  "ukiyo-e": "b68d3e6f",
  "dunhuang-mural": "d62bdaf4",
  "islamic-geometric": "d1c1807d",
  "african-tribal-pattern": "6cd31d73",
  "mexican-muralism": "c68677e9",
  "editorial-illustration": "97e41b87",
  "solarpunk": "04ebfc94",
  "bauhaus": "7e6cfe47",
  "art-nouveau": "ca16dfb5",
  "constructivism": "fb6a47fe",
  "minimalism": "89af1c32",
  "memphis": "dc184350",
  "baroque": "e8a80fc0",
  "romanticism": "e91624a1",
  "post-impressionism": "ef260a30",
  "fauvism": "55ca936f",
  "surrealism": "f1078f95",
  "gongbi": "669c7040",
  "shanshui": "860083b1",
  "sumi-e": "a0f7a132",
  "nihonga": "b23d5c7e",
  "indian-miniature": "ddac3234",
  "korean-minhwa": "a46e5d62",
  "madhubani": "fd08301a",
  "chinese-new-year-woodblock": "009fd875",
  "aboriginal-dot-painting": "863492f9",
  "nordic-folk-art": "e3332760"
};

const enhancedGuideIds = [...originalEnhancedGuideIds, ...batchOneGuideIds, ...batchTwoGuideIds];

test("batch one guide coverage remains complete after later expansion", async ({ page }) => {
  await page.goto("/");
  const coverage = await page.evaluate((batchIds) => {
    const guides = window.StyleAtlasAesthetic.guides;
    return {
      missing: batchIds.filter((id) => !guides[id])
    };
  }, batchOneGuideIds);
  expect(coverage).toEqual({ missing: [] });
});

test("batch one contains no empty Chinese or English fields", async ({ page }) => {
  await page.goto("/");
  const emptyPaths = await page.evaluate((batchIds) => {
    const empty = [];
    const visit = (value, path) => {
      if (typeof value === "string") {
        if (!value.trim()) empty.push(path);
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item, index) => visit(item, `${path}[${index}]`));
        return;
      }
      if (value && typeof value === "object") {
        Object.entries(value).forEach(([key, item]) => visit(item, `${path}.${key}`));
      }
    };
    batchIds.forEach((id) => visit(window.StyleAtlasAesthetic.guides[id], id));
    return empty;
  }, batchOneGuideIds);
  expect(emptyPaths).toEqual([]);
});

test("batch one respects editorial lengths, scene order and prohibited wording", async ({ page }) => {
  await page.goto("/");
  const violations = await page.evaluate((batchIds) => {
    const issues = [];
    const expectedZhScenes = ["家居", "穿搭", "摄影", "日常物件"];
    const expectedEnScenes = ["Home", "Clothing", "Photography", "Everyday objects"];
    const prohibited = ["更高级", "higher quality", "more premium", "similar, but different"];
    for (const id of batchIds) {
      const guide = window.StyleAtlasAesthetic.guides[id];
      if (guide.openingQuestion.zh.length < 20 || guide.openingQuestion.zh.length > 55) {
        issues.push(`${id}.openingQuestion.zh`);
      }
      guide.observe.forEach((item, index) => {
        if (item.text.zh.length < 30 || item.text.zh.length > 85) issues.push(`${id}.observe[${index}].text.zh`);
      });
      const zhScenes = guide.everydayLife.map((item) => item.scene.zh);
      const enScenes = guide.everydayLife.map((item) => item.scene.en);
      if (JSON.stringify(zhScenes) !== JSON.stringify(expectedZhScenes)) issues.push(`${id}.everydayLife.zh`);
      if (JSON.stringify(enScenes) !== JSON.stringify(expectedEnScenes)) issues.push(`${id}.everydayLife.en`);
      const serialized = JSON.stringify(guide).toLowerCase();
      prohibited.forEach((phrase) => {
        if (serialized.includes(phrase.toLowerCase())) issues.push(`${id}.prohibited:${phrase}`);
      });
    }
    return issues;
  }, batchOneGuideIds);
  expect(violations).toEqual([]);
});

test("batch two expands guide coverage to 52 with 68 fallback styles", async ({ page }) => {
  await page.goto("/");
  const coverage = await page.evaluate((batchIds) => {
    const guides = window.StyleAtlasAesthetic.guides;
    const styleCount = window.STYLE_ATLAS_DATA.rawStyles.length;
    return {
      guideCount: Object.keys(guides).length,
      fallbackCount: styleCount - Object.keys(guides).length,
      missing: batchIds.filter((id) => !guides[id])
    };
  }, batchTwoGuideIds);
  expect(coverage).toEqual({ guideCount: 52, fallbackCount: 68, missing: [] });
});

test("batch two contains no empty Chinese or English fields", async ({ page }) => {
  await page.goto("/");
  const emptyPaths = await page.evaluate((batchIds) => {
    const empty = [];
    const visit = (value, path) => {
      if (typeof value === "string") {
        if (!value.trim()) empty.push(path);
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item, index) => visit(item, `${path}[${index}]`));
        return;
      }
      if (value && typeof value === "object") {
        Object.entries(value).forEach(([key, item]) => visit(item, `${path}.${key}`));
      }
    };
    batchIds.forEach((id) => visit(window.StyleAtlasAesthetic.guides[id], id));
    return empty;
  }, batchTwoGuideIds);
  expect(emptyPaths).toEqual([]);
});

test("batch two respects editorial lengths scene order and prohibited wording", async ({ page }) => {
  await page.goto("/");
  const violations = await page.evaluate((batchIds) => {
    const issues = [];
    const expectedZhScenes = ["家居", "穿搭", "摄影", "日常物件"];
    const expectedEnScenes = ["Home", "Clothing", "Photography", "Everyday objects"];
    const prohibited = [
      "更高级",
      "大师感",
      "视觉冲击",
      "higher quality",
      "more premium",
      "picasso invented",
      "all viewers"
    ];
    for (const id of batchIds) {
      const guide = window.StyleAtlasAesthetic.guides[id];
      if (guide.openingQuestion.zh.length < 20 || guide.openingQuestion.zh.length > 55) {
        issues.push(`${id}.openingQuestion.zh`);
      }
      guide.observe.forEach((item, index) => {
        if (item.text.zh.length < 30 || item.text.zh.length > 85) issues.push(`${id}.observe[${index}].text.zh`);
      });
      const zhScenes = guide.everydayLife.map((item) => item.scene.zh);
      const enScenes = guide.everydayLife.map((item) => item.scene.en);
      if (JSON.stringify(zhScenes) !== JSON.stringify(expectedZhScenes)) issues.push(`${id}.everydayLife.zh`);
      if (JSON.stringify(enScenes) !== JSON.stringify(expectedEnScenes)) issues.push(`${id}.everydayLife.en`);
      const serialized = JSON.stringify(guide).toLowerCase();
      prohibited.forEach((phrase) => {
        if (serialized.includes(phrase.toLowerCase())) issues.push(`${id}.prohibited:${phrase}`);
      });
    }
    return issues;
  }, batchTwoGuideIds);
  expect(violations).toEqual([]);
});

test("the original 32 guides retain their approved content fingerprints", async ({ page }) => {
  await page.goto("/");
  const actual = await page.evaluate((expected) => {
    const hash = (value) => {
      let result = 2166136261;
      for (let index = 0; index < value.length; index += 1) {
        result ^= value.charCodeAt(index);
        result = Math.imul(result, 16777619);
      }
      return (result >>> 0).toString(16).padStart(8, "0");
    };
    return Object.fromEntries(Object.keys(expected).map((id) => [
      id,
      hash(JSON.stringify(window.StyleAtlasAesthetic.guides[id]))
    ]));
  }, original32GuideFingerprints);
  expect(actual).toEqual(original32GuideFingerprints);
});

for (const styleId of enhancedGuideIds) {
  test(`enhanced aesthetic guide is complete for ${styleId}`, async ({ page }) => {
    await page.goto("/");
    const result = await page.evaluate((id) => {
      const guide = window.StyleAtlasAesthetic.guides[id];
      const validIds = new Set(window.STYLE_ATLAS_DATA.rawStyles.map((style) => style[0]));
      const bilingual = (value) => Boolean(value && value.zh && value.en);
      return {
        exists: Boolean(guide),
        opening: bilingual(guide?.openingQuestion),
        observe: guide?.observe?.length,
        observeBilingual: guide?.observe?.every((item) => bilingual(item.label) && bilingual(item.text)),
        profileKeys: Object.keys(guide?.profile || {}).sort(),
        levelsValid: Object.values(guide?.profile || {}).every((item) => Number.isInteger(item.level) && item.level >= 1 && item.level <= 5),
        profileBilingual: Object.values(guide?.profile || {}).every((item) => item.zh && item.en),
        feelingWords: [guide?.feelingWords?.zh?.length, guide?.feelingWords?.en?.length],
        everyday: guide?.everydayLife?.length,
        everydayBilingual: guide?.everydayLife?.every((item) => bilingual(item.scene) && bilingual(item.text)),
        comparisons: guide?.comparisons?.length,
        comparisonsValid: guide?.comparisons?.every((item) => validIds.has(item.styleId) && bilingual(item.similarity) && bilingual(item.difference)),
        reflection: bilingual(guide?.reflectionPrompt)
      };
    }, styleId);
    expect(result).toEqual({
      exists: true,
      opening: true,
      observe: 3,
      observeBilingual: true,
      profileKeys: ["color", "emotion", "order", "ornament"],
      levelsValid: true,
      profileBilingual: true,
      feelingWords: [expect.any(Number), expect.any(Number)],
      everyday: 4,
      everydayBilingual: true,
      comparisons: 2,
      comparisonsValid: true,
      reflection: true
    });
    expect(result.feelingWords[0]).toBeGreaterThanOrEqual(3);
    expect(result.feelingWords[0]).toBeLessThanOrEqual(5);
    expect(result.feelingWords[1]).toBe(result.feelingWords[0]);
  });
}

test("all batch-one guides render and complete the five-stage Guided Looking flow", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/#bauhaus");
  for (const styleId of batchOneGuideIds) {
    await page.evaluate((id) => {
      location.hash = id;
    }, styleId);
    await expect(page.locator("#detailView")).toHaveClass(/active/);
    await expect(page.locator("#detailContent h1")).not.toHaveText("");
    await expect(page.locator(".profile-scale")).toHaveCount(4);
    await expect(page.locator(".profile-note")).toContainText("不是审美评分");
    await page.locator("[data-action='open-guided']").click();
    for (let stage = 1; stage <= 4; stage += 1) {
      await page.locator("#guidedNextBtn").click();
      await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", String(stage));
    }
    await page.locator("#guidedNextBtn").click();
    await expect(page.locator("#guidedOverlay")).toBeHidden();
  }
});

test("all batch-two guides render and complete the five-stage Guided Looking flow", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/#renaissance");
  for (const styleId of batchTwoGuideIds) {
    await page.evaluate((id) => {
      location.hash = id;
    }, styleId);
    await expect(page.locator("#detailView")).toHaveClass(/active/);
    await expect(page.locator("#detailContent h1")).not.toHaveText("");
    await expect(page.locator(".profile-scale")).toHaveCount(4);
    await expect(page.locator(".profile-note")).toContainText("不是审美评分");
    await page.locator("[data-action='open-guided']").click();
    for (let stage = 1; stage <= 4; stage += 1) {
      await page.locator("#guidedNextBtn").click();
      await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", String(stage));
    }
    await page.locator("#guidedNextBtn").click();
    await expect(page.locator("#guidedOverlay")).toBeHidden();
  }
});

test("all 120 style detail pages render without empty primary content", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/#swiss-style");
  const failures = await page.evaluate(async () => {
    const ids = window.STYLE_ATLAS_DATA.rawStyles.map((style) => style[0]);
    const invalid = [];
    for (const id of ids) {
      location.hash = id;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const detail = document.querySelector("#detailView.active");
      const title = document.querySelector("#detailContent h1");
      if (!detail || !title?.textContent.trim() || detail.textContent.includes("undefined")) invalid.push(id);
    }
    return { count: ids.length, invalid };
  });
  expect(failures.count).toBe(120);
  expect(failures.invalid).toEqual([]);
});

test("detail hero has one h1 and one default local artwork", async ({ page }) => {
  await page.goto("/#swiss-style");
  await expect(page.locator("#detailContent h1")).toHaveCount(1);
  await expect(page.locator(".detail-hero .hero-image-button img[src*='swiss-style.webp']")).toHaveCount(1);
  await expect(page.locator("#detailContent img[src*='swiss-style.webp']")).toHaveCount(1);
});

test("every detail exposes the guided looking entry", async ({ page }) => {
  await page.goto("/#bauhaus");
  await expect(page.locator("[data-action='open-guided']")).toBeVisible();
  await expect(page.locator("[data-action='open-guided']")).toHaveText("带我看懂这张图");
});

test("guided looking opens as a named modal dialog", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  const panel = page.locator("#guidedPanel");
  await expect(page.locator("#guidedOverlay")).toBeVisible();
  await expect(panel).toHaveAttribute("role", "dialog");
  await expect(panel).toHaveAttribute("aria-modal", "true");
  await expect(panel).toHaveAttribute("aria-labelledby", "guidedTitle");
  await expect(panel).toHaveAttribute("aria-describedby", "guidedText");
  await expect(panel).toBeFocused();
});

test("guided opening does not reveal all observation answers", async ({ page }) => {
  await page.goto("/#swiss-style");
  const firstObservation = await page.evaluate(() => window.StyleAtlasAesthetic.guides["swiss-style"].observe[0].text.zh);
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", "0");
  await expect(page.locator("#guidedText")).not.toHaveText(firstObservation);
});

test("guided looking advances through three observations and completion", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  for (let stage = 1; stage <= 4; stage += 1) {
    await page.locator("#guidedNextBtn").click();
    await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", String(stage));
  }
  await expect(page.locator("#guidedTitle")).toHaveText("你已经抓住这种风格最重要的线索了。");
});

test("guided completion returns to the detail page", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  for (let step = 0; step < 4; step += 1) await page.locator("#guidedNextBtn").click();
  await page.locator("#guidedNextBtn").click();
  await expect(page.locator("#guidedOverlay")).toBeHidden();
  await expect(page.locator("#detailView")).toHaveClass(/active/);
});

test("guided Escape closes and restores focus to its entry", async ({ page }) => {
  await page.goto("/#swiss-style");
  const trigger = page.locator("[data-action='open-guided']");
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#guidedOverlay")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("guided overlay makes the app background inert", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#appShell")).toHaveAttribute("inert", "");
  await page.locator("#guidedCloseBtn").click();
  await expect(page.locator("#appShell")).not.toHaveAttribute("inert", "");
});

test("guided looking stays free and sends no native purchase message", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#cyberpunk");
  await page.locator("[data-action='open-guided']").click();
  await page.locator("#guidedNextBtn").click();
  const purchaseMessages = await page.evaluate(() => window.__nativeMessages.filter((item) => item.type === "purchasePlus"));
  expect(purchaseMessages).toEqual([]);
});

test("non-pilot styles use a stable fallback guide", async ({ page }) => {
  await page.goto("/#cyberpunk");
  const fallback = await page.evaluate(() => window.StyleAtlasAesthetic.getGuide("cyberpunk"));
  expect(fallback.enhanced).toBe(false);
  expect(fallback.observe.length).toBeGreaterThanOrEqual(3);
  expect(fallback.profile).toBeNull();
  expect(fallback.everydayLife.length).toBeGreaterThan(0);
  expect(fallback.comparisons.length).toBeGreaterThan(0);
});

test("fallback detail contains no undefined values or empty profile scale", async ({ page }) => {
  await page.goto("/#cyberpunk");
  await expect(page.locator("#detailContent")).not.toContainText("undefined");
  await expect(page.locator(".profile-pending")).toBeVisible();
  await expect(page.locator(".profile-scale")).toHaveCount(0);
});

test("recognition module presents at least three explained observation cards", async ({ page }) => {
  await page.goto("/#swiss-style");
  const cards = page.locator(".recognition-grid .observation-card");
  expect(await cards.count()).toBeGreaterThanOrEqual(3);
  for (const card of await cards.all()) {
    await expect(card.locator("h3")).not.toHaveText("");
    await expect(card.locator("p")).not.toHaveText("");
  }
});

test("pilot everyday module presents four ordinary-life scenes", async ({ page }) => {
  await page.goto("/#art-deco");
  await expect(page.locator(".everyday-grid article")).toHaveCount(4);
  await expect(page.locator(".everyday-grid")).toContainText("家居");
  await expect(page.locator(".everyday-grid")).toContainText("穿搭");
  await expect(page.locator(".everyday-grid")).toContainText("摄影");
  await expect(page.locator(".everyday-grid")).toContainText("日常物件");
});

test("comparison navigation enters a related style and back returns to the source", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".comparison-open").first().click();
  await expect(page.locator("#detailTitle")).toHaveText("Bauhaus");
  await page.locator("#backBtn").click();
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
});

test("deep accordion is keyboard operable and updates expanded state", async ({ page }) => {
  await page.goto("/#swiss-style");
  const button = page.locator(".deep-accordion button").nth(1);
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  const panelId = await button.getAttribute("aria-controls");
  await expect(page.locator(`#${panelId}`)).toBeVisible();
});

test("reflection input saves locally and survives detail navigation", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  const input = page.locator("[data-reflection-id='swiss-style']");
  await input.fill("我喜欢它让信息变得清楚。");
  await page.locator(".comparison-open").first().click();
  await page.locator("#backBtn").click();
  await expect(page.locator("[data-reflection-id='swiss-style']")).toHaveValue("我喜欢它让信息变得清楚。");
});

test("reflection survives a page reload", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("留白让我更容易呼吸。");
  await page.reload();
  await expect(page.locator("[data-reflection-id='swiss-style']")).toHaveValue("留白让我更容易呼吸。");
});

test("reflection enforces the 300 character limit", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  const input = page.locator("[data-reflection-id='swiss-style']");
  await input.fill("审".repeat(360));
  await expect(input).toHaveValue("审".repeat(300));
  await expect(input).toHaveAttribute("maxlength", "300");
});

test("corrupt reflection JSON recovers without breaking the page", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("styleAtlasReflectionsV1", "{broken"));
  await page.goto("/#swiss-style");
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
  await expect(page.locator("[data-reflection-id='swiss-style']")).toHaveValue("");
});

test("detail remains usable when localStorage is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("storage disabled"); };
    Storage.prototype.setItem = () => { throw new Error("storage disabled"); };
    Storage.prototype.removeItem = () => { throw new Error("storage disabled"); };
  });
  await page.goto("/#swiss-style");
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("仍然可以输入");
  await expect(page.locator("[data-reflection-id='swiss-style']")).toHaveValue("仍然可以输入");
});

test("language switching renders complete enhanced English content", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("#langBtn").click();
  await expect(page.locator("#recognizeTitle")).toHaveText("How to recognize it again");
  await expect(page.locator("[data-action='open-guided']")).toHaveText("Help me see this style");
  await expect(page.locator(".everyday-grid article")).toHaveCount(4);
  await expect(page.locator(".profile-note")).toHaveText("These are viewing cues, not scores of quality.");
});

test("guided overlay honors reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  const durations = await page.locator("#guidedStage").evaluate((node) => {
    const style = getComputedStyle(node);
    return { transition: style.transitionDuration, animation: style.animationDuration };
  });
  expect(["0s", "0.001s"]).toContain(durations.transition);
  expect(["0s", "0.001s"]).toContain(durations.animation);
});

test("guided overlay can be closed at 200 percent page scale", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  const client = await page.context().newCDPSession(page);
  await client.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  await expect(page.locator("#guidedCloseBtn")).toBeVisible();
  const box = await page.locator("#guidedCloseBtn").boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.y).toBeGreaterThanOrEqual(0);
  await page.keyboard.press("Escape");
  await expect(page.locator("#guidedOverlay")).toBeHidden();
});

test("prompt and export controls remain in the redesigned detail", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#swiss-style");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await expect(page.locator("#detail-create")).toBeVisible();
  await expect(page.locator("#detail-create [data-action='copy-prompt']")).toBeVisible();
  await expect(page.locator("#detail-create [data-action='save-card']").first()).toBeVisible();
  await expect(page.locator("#detail-create [data-action='export-ratio']")).toHaveCount(4);
});

test("offline detail does not duplicate the hero in the optional gallery", async ({ page }) => {
  await page.addInitScript(() => {
    window.STYLE_ATLAS_RUNTIME_CONFIG = { nativeShell: true, externalGalleryEnabled: false, submissionMode: "iap" };
  });
  await page.goto("/#swiss-style");
  await expect(page.locator(".detail-hero img[src*='swiss-style.webp']")).toHaveCount(1);
  await expect(page.locator("#galleryGrid img")).toHaveCount(0);
  expect(await page.evaluate(() => window.StyleAtlasRuntime.isExternalGalleryEnabled())).toBe(false);
});

test("detail section navigation is named and updates its current target", async ({ page }) => {
  await page.goto("/#swiss-style");
  const nav = page.locator(".detail-section-nav");
  await expect(nav).toHaveAttribute("aria-label", "风格详情分段导航");
  await expect(nav.locator("button")).toHaveCount(5);
  await nav.locator("button").nth(1).click();
  await expect(nav.locator("button").nth(1)).toHaveAttribute("aria-current", "true");
});

test("aesthetic profile exposes level and description without a total score", async ({ page }) => {
  await page.goto("/#swiss-style");
  await expect(page.locator(".profile-scale")).toHaveCount(4);
  await expect(page.locator(".profile-scale").first()).toHaveAttribute("aria-label", /观察强度第 5 级，共 5 级，不代表好坏/);
  await expect(page.locator(".profile-note")).toHaveText("这是观察提示，不是审美评分。");
  await expect(page.locator(".profile-section")).not.toContainText(/总分|排名/);
});

test("review mode opens a specified style detail", async ({ page }) => {
  await page.goto("/?review=detail&style=swiss-style");
  await expect(page.locator("#detailView")).toHaveClass(/active/);
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
});

test("review mode switches to English", async ({ page }) => {
  await page.goto("/?review=detail&style=ukiyo-e&lang=en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("[data-action='open-guided']")).toHaveText("Help me see this style");
});

test("review mode opens a requested guided stage", async ({ page }) => {
  await page.goto("/?review=detail&style=art-deco&guided=2");
  await expect(page.locator("#guidedOverlay")).toBeVisible();
  await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", "2");
});

test("review mode falls back safely for an invalid style", async ({ page }) => {
  await page.goto("/?review=detail&style=missing-style");
  await expect(page.locator("#detailView")).toHaveClass(/active/);
  await expect(page.locator("#detailTitle")).not.toHaveText("");
  await expect(page.locator("#detailContent")).not.toContainText("undefined");
});

test("review mode scrolls to a valid comparison section", async ({ page }) => {
  await page.goto("/?review=detail&style=solarpunk&section=compare");
  await expect(page.locator("#detail-compare")).toBeVisible();
  await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector("#detail-compare").getBoundingClientRect().top))).toBeLessThan(220);
});

test("invalid review section is ignored", async ({ page }) => {
  await page.goto("/?review=detail&style=solarpunk&section=nope");
  await expect(page.locator("#detail-see")).toBeVisible();
  expect(await page.locator("#detail-see").boundingBox()).not.toBeNull();
});

test("guided first stage hides previous", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#guidedPrevBtn")).toBeHidden();
});

test("guided second stage shows previous and returns to opening", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await page.locator("#guidedNextBtn").click();
  await expect(page.locator("#guidedPrevBtn")).toBeVisible();
  await page.locator("#guidedPrevBtn").click();
  await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", "0");
});

test("guided indicator shows current stage and total", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#guidedStepLabel")).toHaveText("1 / 5");
  await expect(page.locator("#guidedDots i")).toHaveCount(5);
  await expect(page.locator("#guidedDots i.active")).toHaveCount(1);
});

test("guided focus data clamps to valid image coordinates", async ({ page }) => {
  await page.goto("/#swiss-style");
  const focus = await page.evaluate(() => window.StyleAtlasAesthetic.normalizeFocus({ x: -20, y: 140, scale: 4 }));
  expect(focus).toEqual({ x: 0, y: 100, scale: 2 });
});

test("guided image is not scaled when focus is absent", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#guidedImage")).not.toHaveClass(/has-focus/);
});

test("guided image applies optional focus when present", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.evaluate(() => {
    window.StyleAtlasAesthetic.guides["swiss-style"].observe[0].focus = { x: 42, y: 58, scale: 1.4 };
    window.StyleAtlasAesthetic.openGuided(null, 1);
  });
  await expect(page.locator("#guidedImage")).toHaveClass(/has-focus/);
  await expect(page.locator("#guidedImage")).toHaveCSS("object-position", "42% 58%");
});

test("reduced motion removes guided focus transition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#swiss-style");
  await page.evaluate(() => {
    window.StyleAtlasAesthetic.guides["swiss-style"].observe[0].focus = { x: 50, y: 50, scale: 1.2 };
    window.StyleAtlasAesthetic.openGuided(null, 1);
  });
  const duration = await page.locator("#guidedImage").evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(["0s", "0.001s"]).toContain(duration);
});

test("pilot recognition titles are not generic numbered labels", async ({ page }) => {
  await page.goto("/#swiss-style");
  const titles = await page.locator(".recognition-grid h3").allTextContents();
  expect(titles).not.toContain("识别线索 1");
  expect(titles).not.toContain("Recognition cue 1");
});

test("pilot recognition text has no duplicate body copy", async ({ page }) => {
  await page.goto("/#swiss-style");
  const body = await page.locator(".recognition-grid p").allTextContents();
  expect(new Set(body).size).toBe(body.length);
});

test("profile scale exposes endpoint hint text", async ({ page }) => {
  await page.goto("/#swiss-style");
  await expect(page.locator(".profile-hint")).toHaveCount(4);
  await expect(page.locator(".profile-hint").first()).toHaveText("自由 ↔ 严谨");
});

test("comparison back returns near the comparison section", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("#detail-compare").scrollIntoViewIfNeeded();
  await page.locator(".comparison-open").first().click();
  await expect(page.locator("#detailTitle")).toHaveText("Bauhaus");
  await page.locator("#backBtn").click();
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
  await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector("#detail-compare").getBoundingClientRect().top))).toBeLessThan(220);
});

test("reflection debounce delays local write until quiet", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("延迟保存");
  expect(await page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style"))).toBeNull();
  await expect.poll(() => page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style")?.text)).toBe("延迟保存");
});

test("reflection flushes before opening a comparison style", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("切换前保存");
  await page.locator(".comparison-open").first().click();
  expect(await page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style")?.text)).toBe("切换前保存");
});

test("reflection clear removes stored text and confirms", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("准备清除");
  await expect.poll(() => page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style")?.text)).toBe("准备清除");
  await page.locator("[data-action='clear-reflection']").click();
  expect(await page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style"))).toBeNull();
  await expect(page.locator("[data-reflection-status='swiss-style']")).toHaveText("已清除");
});

test("empty reflection does not create a stored record", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("");
  await page.locator("[data-reflection-id='swiss-style']").blur();
  expect(await page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style"))).toBeNull();
});

test("English reflection saved status is localized", async ({ page }) => {
  await page.goto("/?review=detail&style=swiss-style&lang=en");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("Clear order.");
  await expect.poll(() => page.locator("[data-reflection-status='swiss-style']").textContent()).toBe("Saved on this device");
});

test("Plus purchase and restore actions remain wired after detail polish", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#swiss-style");
  await openPlus(page);
  await page.evaluate(() => window.StyleAtlasNativeBridge.setProductPrice("$4.99"));
  await page.locator("#plusCta").click();
  await page.evaluate(() => window.StyleAtlasNativeBridge.setStoreAction("idle"));
  await page.locator("#plusRestoreBtn").click();
  const messages = await page.evaluate(() => window.__nativeMessages.map((item) => item.type));
  expect(messages).toContain("purchasePlus");
  expect(messages).toContain("restorePurchases");
});

const pilotStyleIds = [
  "swiss-style",
  "art-deco",
  "impressionism",
  "van-gogh",
  "chinese-ink-painting",
  "ukiyo-e",
  "dunhuang-mural",
  "islamic-geometric",
  "african-tribal-pattern",
  "mexican-muralism",
  "editorial-illustration",
  "solarpunk"
];

for (const styleId of pilotStyleIds) {
  test(`pilot ${styleId} has complete Chinese guide copy`, async ({ page }) => {
    await page.goto(`/?review=detail&style=${styleId}&lang=zh`);
    const result = await page.evaluate((id) => {
      const guide = window.StyleAtlasAesthetic.getGuide(id);
      return {
        opening: guide.openingQuestion.zh.trim(),
        observe: guide.observe.map((item) => [item.label.zh, item.text.zh]),
        everyday: guide.everydayLife.map((item) => [item.scene.zh, item.text.zh]),
        comparisons: guide.comparisons.map((item) => [item.similarity.zh, item.difference.zh]),
        reflection: guide.reflectionPrompt.zh.trim()
      };
    }, styleId);
    expect(result.opening.length).toBeGreaterThan(8);
    expect(result.observe).toHaveLength(3);
    expect(result.observe.flat().every((item) => item.trim().length > 0)).toBe(true);
    expect(result.everyday).toHaveLength(4);
    expect(result.everyday.flat().every((item) => item.trim().length > 0)).toBe(true);
    expect(result.comparisons).toHaveLength(2);
    expect(result.comparisons.flat().every((item) => item.trim().length > 0)).toBe(true);
    expect(result.reflection.length).toBeGreaterThan(8);
  });

  test(`pilot ${styleId} has complete English guide copy`, async ({ page }) => {
    await page.goto(`/?review=detail&style=${styleId}&lang=en`);
    const result = await page.evaluate((id) => {
      const guide = window.StyleAtlasAesthetic.getGuide(id);
      return {
        opening: guide.openingQuestion.en.trim(),
        observe: guide.observe.map((item) => [item.label.en, item.text.en]),
        everyday: guide.everydayLife.map((item) => [item.scene.en, item.text.en]),
        comparisons: guide.comparisons.map((item) => [item.similarity.en, item.difference.en]),
        reflection: guide.reflectionPrompt.en.trim()
      };
    }, styleId);
    expect(result.opening.length).toBeGreaterThan(12);
    expect(result.observe).toHaveLength(3);
    expect(result.observe.flat().every((item) => item.trim().length > 0)).toBe(true);
    expect(result.everyday).toHaveLength(4);
    expect(result.everyday.flat().every((item) => item.trim().length > 0)).toBe(true);
    expect(result.comparisons).toHaveLength(2);
    expect(result.comparisons.flat().every((item) => item.trim().length > 0)).toBe(true);
    expect(result.reflection.length).toBeGreaterThan(12);
  });
}

test("preview build has noindex and its visible environment label", async ({ page }) => {
  await page.goto("/build/preview/v1.3/");
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", "noindex,nofollow");
  await expect(page.locator(".v13-preview-badge")).toHaveText("V1.3 Preview");
});

test("preview label never enters the iOS resource index", async ({ page }) => {
  await page.goto("/");
  const iosIndex = fs.readFileSync(path.join(__dirname, "..", "iOS", "StyleAtlas", "Resources", "Web", "index.html"), "utf8");
  expect(iosIndex).not.toContain("V1.3 Preview");
  expect(iosIndex).not.toContain("v13-preview-badge");
});

test("production source never displays the preview label", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".v13-preview-badge")).toHaveCount(0);
  await expect(page.locator("meta[name='robots']")).toHaveCount(0);
});

test("preview subdirectory resolves scripts, styles, and local hero assets", async ({ page }) => {
  const failures = [];
  page.on("requestfailed", (request) => failures.push(request.url()));
  await page.goto("/build/preview/v1.3/?review=detail&style=swiss-style");
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
  await expect(page.locator(".detail-hero img")).toBeVisible();
  await expect(page.locator(".detail-hero img")).toHaveAttribute("src", "assets/styles/swiss-style.webp");
  expect(failures.filter((url) => url.includes("/build/preview/v1.3/"))).toEqual([]);
});

test("detail navigation leaves the target heading below sticky controls", async ({ page }) => {
  await page.goto("/#swiss-style");
  const button = page.locator(".detail-section-nav button").nth(1);
  await button.click();
  await expect(button).toHaveAttribute("aria-current", "true");
  await expect.poll(() => page.locator("#recognizeTitle").evaluate((node) => node.getBoundingClientRect().top)).toBeGreaterThan(120);
});

test("detail navigation current state follows manual scrolling", async ({ page }) => {
  await page.goto("/#swiss-style");
  const nav = page.locator(".detail-section-nav");
  await nav.locator("button").nth(1).click();
  await expect(nav.locator("button").nth(1)).toHaveAttribute("aria-current", "true");
  await page.locator("#detail-see").evaluate((node) => node.scrollIntoView({ behavior: "auto", block: "start" }));
  await expect.poll(() => nav.locator("button").first().getAttribute("aria-current")).toBe("true");
});

test("related style returns to the source comparison region", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("#detail-compare").scrollIntoViewIfNeeded();
  await page.locator(".comparison-open").first().click();
  await page.locator("#backBtn").click();
  await expect(page.locator("#detailTitle")).toHaveText("Swiss Style");
  await expect.poll(() => page.locator("#detail-compare").evaluate((node) => Math.abs(node.getBoundingClientRect().top))).toBeLessThan(220);
});

test("reflection remains focusable and visible at 200 percent zoom", async ({ page }) => {
  await page.goto("/#chinese-ink-painting");
  await page.locator(".reflection-section summary").click();
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  const input = page.locator("[data-reflection-id='chinese-ink-painting']");
  await input.focus();
  await expect(input).toBeFocused();
  const box = await input.boundingBox();
  expect(box.width).toBeGreaterThan(100);
  expect(box.height).toBeGreaterThan(80);
});

test("XXL text keeps detail navigation operable at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/#dunhuang-mural");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  const nav = page.locator(".detail-section-nav");
  await expect(nav).toBeVisible();
  expect(await nav.evaluate((node) => node.scrollWidth >= node.clientWidth)).toBe(true);
  await nav.locator("button").last().click();
  await expect(nav.locator("button").last()).toHaveAttribute("aria-current", "true");
});

test("native Dynamic Type scales the page without affecting the web build", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#swiss-style");
  await expect.poll(() => page.evaluate(() => window.StyleAtlasNativeBridge.setTextScale(1.24))).toBe(1.24);
  await expect(page.locator("html")).toHaveCSS("zoom", "1.24");
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("html")).toHaveAttribute("data-native-large-text", "");
  const nextButton = await page.locator("#guidedNextBtn").boundingBox();
  expect(nextButton.y + nextButton.height).toBeLessThanOrEqual(page.viewportSize().height);

  await page.reload();
  await page.evaluate(() => {
    window.STYLE_ATLAS_RUNTIME_CONFIG.nativeShell = false;
  });
  await expect.poll(() => page.evaluate(() => window.StyleAtlasNativeBridge.setTextScale(1.54))).toBe(1);
  await expect(page.locator("html")).toHaveCSS("zoom", "1");
  await expect(page.locator("html")).not.toHaveAttribute("data-native-large-text", "");
});

test("profile announces the non-rating note before semantic levels", async ({ page }) => {
  await page.goto("/#swiss-style");
  const profile = page.locator(".profile-section");
  const order = await profile.locator(".profile-note, .profile-scale").evaluateAll((nodes) => nodes.map((node) => node.className));
  expect(order[0]).toBe("profile-note");
  await expect(profile.locator(".profile-note")).toHaveText("这是观察提示，不是审美评分。");
  await expect(profile.locator(".profile-scale").first()).toHaveAttribute("aria-label", /不代表好坏/);
  await expect(profile.locator(".profile-scale").first()).not.toHaveAttribute("aria-label", /5 \/ 5/);
});

test("guided looking ignores a horizontal swipe", async ({ page }) => {
  await page.goto("/#swiss-style");
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", "0");
  await dispatchTouchGesture(page, "#guidedPanel", [
    { x: 320, y: 420 },
    { x: 240, y: 420 },
    { x: 140, y: 420 }
  ]);
  await expect(page.locator("#guidedStage")).toHaveAttribute("data-stage", "0");
});

test("twelve native detail visits produce no Wiki requests", async ({ page }) => {
  await installNativeMock(page);
  let wikiRequests = 0;
  page.on("request", (request) => {
    if (request.url().includes("wikipedia.org/w/api.php")) wikiRequests += 1;
  });
  for (const styleId of pilotStyleIds) {
    await page.goto(`/?review=detail&style=${styleId}`);
    await expect(page.locator("#detailTitle")).not.toHaveText("");
  }
  expect(wikiRequests).toBe(0);
});

test("detail hero and guided looking reuse one local image request", async ({ page }) => {
  let heroRequests = 0;
  page.on("request", (request) => {
    if (request.url().includes("/assets/styles/solarpunk.webp")) heroRequests += 1;
  });
  await page.goto("/#solarpunk");
  await expect(page.locator(".detail-hero img")).toBeVisible();
  await page.locator("[data-action='open-guided']").click();
  await expect(page.locator("#guidedImage")).toBeVisible();
  expect(heroRequests).toBe(1);
});

test("reflection creates no fetch or Native bridge message", async ({ page }) => {
  await installNativeMock(page);
  const externalRequests = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:8765/")) externalRequests.push(request.url());
  });
  await page.goto("/#swiss-style");
  await page.locator(".reflection-section summary").click();
  await page.locator("[data-reflection-id='swiss-style']").fill("只保存在本机");
  await page.locator("[data-reflection-id='swiss-style']").blur();
  await expect.poll(() => page.evaluate(() => window.StyleAtlasAesthetic.getReflection("swiss-style")?.text)).toBe("只保存在本机");
  expect(externalRequests).toEqual([]);
  expect(await page.evaluate(() => window.__nativeMessages)).toEqual([]);
});

test("preview payload is nested and cannot replace production root files", async () => {
  const previewRoot = path.join(__dirname, "..", "build", "preview");
  const manifest = JSON.parse(fs.readFileSync(path.join(previewRoot, "v1.3", "preview-manifest.json"), "utf8"));
  expect(manifest.deployPath).toBe("/preview/v1.3/");
  expect(manifest.productionRootFilesIncluded).toBe(false);
  expect(fs.existsSync(path.join(previewRoot, "index.html"))).toBe(false);
  expect(fs.existsSync(path.join(previewRoot, "CNAME"))).toBe(false);
});

test("StoreKit purchase restore and all export ratios survive preview work", async ({ page }) => {
  await installNativeMock(page);
  await page.goto("/#art-deco");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await expect(page.locator("[data-action='export-ratio']")).toHaveCount(4);
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(false));
  await openPlus(page);
  await page.evaluate(() => window.StyleAtlasNativeBridge.setProductPrice("$4.99"));
  await page.locator("#plusCta").click();
  await page.evaluate(() => window.StyleAtlasNativeBridge.setStoreAction("idle"));
  await page.locator("#plusRestoreBtn").click();
  const messages = await page.evaluate(() => window.__nativeMessages.map((message) => message.type));
  expect(messages).toContain("purchasePlus");
  expect(messages).toContain("restorePurchases");
});
