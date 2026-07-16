const { test, expect } = require("@playwright/test");

test.use({ viewport: { width: 390, height: 844 }, locale: "zh-CN" });

test("core mobile flows remain stable", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");

  await expect(page.locator(".brand strong")).toContainText("Style Atlas");
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
  await page.locator("#langBtn").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#searchInput")).toHaveValue("Swiss");

  expect(errors).toEqual([]);
});

test("native paywall posts purchase and restore messages", async ({ page }) => {
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
  await page.goto("/");
  await page.locator("#drawerBtn").click();
  await page.locator("[data-action='show-plus']").click();
  await expect(page.locator("#plusModal")).toBeVisible();
  await expect(page.locator("#plusCta")).toBeEnabled();
  await page.locator("#plusCta").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("purchasePlus");
  await page.evaluate(() => window.StyleAtlasNativeBridge.setStoreAction("idle"));
  await page.locator("#plusRestoreBtn").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("restorePurchases");
  await page.locator("#plusCloseBtn").click();
  await expect(page.locator("#drawerBtn")).toBeFocused();
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

test("native entitlement unlocks archives and exports the requested ratio", async ({ page }) => {
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

  await page.goto("/#baroque");
  await expect(page.locator(".locked-section").first()).toBeVisible();
  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(true));
  await expect(page.locator(".locked-section")).toHaveCount(0);

  await page.locator("[data-action='export-ratio'][data-ratio='1:1']").click();
  await expect.poll(() => page.evaluate(() => window.__nativeMessages.at(-1)?.type)).toBe("exportImage");
  const dataURL = await page.evaluate(() => window.__nativeMessages.at(-1).payload.dataURL);
  const png = Buffer.from(dataURL.split(",")[1], "base64");
  expect(png.readUInt32BE(16)).toBe(1440);
  expect(png.readUInt32BE(20)).toBe(1440);

  await page.evaluate(() => window.StyleAtlasNativeBridge.setPlusAccess(false));
  await expect(page.locator(".locked-section").first()).toBeVisible();
});
