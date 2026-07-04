# 虾子曰 Style Atlas iOS Shell

This is the first iOS shell for Xiazishuo Style Atlas. It includes a minimal Xcode project, local `WKWebView`, bundled web resources, Native-Web Bridge, and StoreKit 2 Plus entitlement structure.

## Current Stage

- SwiftUI shell files are provided.
- `WKWebView` loads bundled `Resources/Web/index.html`.
- StoreKit 2 non-consumable product structure is provided.
- Web can call native `purchasePlus` and `restorePurchases`.
- Native can inject `window.StyleAtlasNativeBridge.setPlusAccess(true / false)`.
- No Stripe, external payment, login, backend, AI image generation, or social features.
- Simulator build has been verified with Xcode 26.6 and iOS 26.5 Simulator.

## Create The Xcode Project

1. Open Xcode.
2. Create a new iOS App project.
3. Product Name: `StyleAtlas`.
4. Interface: SwiftUI.
5. Language: Swift.
6. Copy this `iOS/StyleAtlas/` folder content into the project.
7. Add these Swift files to the app target:
   - `StyleAtlasApp.swift`
   - `ContentView.swift`
   - `WebView/WebViewContainer.swift`
   - `WebView/WebViewBridge.swift`
   - `Store/StoreManager.swift`
   - `Store/EntitlementManager.swift`

If Xcode creates its own app entry file, keep only one `@main` app struct.

## Xcode Import Checklist

1. Create a new iOS App project in Xcode.
2. Product Name: `StyleAtlas`.
3. Interface: SwiftUI.
4. Language: Swift.
5. Minimum iOS: iOS 16 or iOS 17.
6. Drag these Swift files into Xcode and check the app target:
   - `StyleAtlasApp.swift`
   - `ContentView.swift`
   - `WebView/WebViewContainer.swift`
   - `WebView/WebViewBridge.swift`
   - `Store/StoreManager.swift`
   - `Store/EntitlementManager.swift`
7. Drag `Resources/Web/` into the project and add it to Copy Bundle Resources.
8. Drag `Resources/StoreKit/StyleAtlas.storekit` into the project.
9. In the scheme, choose `StyleAtlas.storekit` as the StoreKit Configuration.
10. Before running, execute:

```bash
iOS/StyleAtlas/Scripts/sync-web-resources.sh
iOS/StyleAtlas/Scripts/check-ios-resources.sh
```

## Sync Web Resources

From the repo root:

```bash
chmod +x iOS/StyleAtlas/Scripts/sync-web-resources.sh
iOS/StyleAtlas/Scripts/sync-web-resources.sh
```

The script clears and rebuilds:

```text
iOS/StyleAtlas/Resources/Web/
```

It copies:

- `index.html`
- `styles.css`
- `game.js`
- `data-core.js`
- `data-styles.js`
- `data-refined.js`
- `examples.js`
- `assets/styles/*.webp`

PNG fallback is not bundled in V1. The offline app should use WebP covers as the source of truth.

Check the bundled resources:

```bash
chmod +x iOS/StyleAtlas/Scripts/check-ios-resources.sh
iOS/StyleAtlas/Scripts/check-ios-resources.sh
```

## Copy Bundle Resources

In Xcode, add these to Copy Bundle Resources:

- `Resources/Web/`
- `Resources/StoreKit/StyleAtlas.storekit`

The `WKWebView` code expects:

```text
Bundle/Web/index.html
```

If Xcode nests folders differently, update the `subdirectory: "Web"` value in `WebViewContainer.swift`.

## StoreKit Configuration

Use the included:

```text
Resources/StoreKit/StyleAtlas.storekit
```

Product:

- Product ID: `xiazishuo_style_atlas_plus_lifetime`
- Type: Non-Consumable
- Reference Name: `Xiazishuo Style Atlas Plus`
- Price: `$3.99` for local testing

If Xcode cannot recognize the included `.storekit` file, create a new StoreKit Configuration in Xcode and enter the same product values above. The product ID must stay exactly the same.

In Xcode:

1. Select the scheme.
2. Edit Scheme.
3. Run > Options.
4. StoreKit Configuration: select `StyleAtlas.storekit`.

## Local Purchase Test

1. Launch the app from Xcode.
2. Open Plus Paywall in the web UI.
3. Tap `Unlock Plus`.
4. Confirm the StoreKit local purchase sheet.
5. Verify locked style archives unlock.
6. Tap Restore Purchases and verify entitlement refresh.

## Native Bridge Test

Web to Native messages are sent through:

```js
window.webkit.messageHandlers.styleAtlas.postMessage({ type: "purchasePlus", payload: {} })
window.webkit.messageHandlers.styleAtlas.postMessage({ type: "restorePurchases", payload: {} })
```

Native to Web entitlement injection:

```js
window.StyleAtlasNativeBridge?.setPlusAccess(true)
```

In Safari Web Inspector, verify:

```js
window.StyleAtlasNativeBridge.getPlusAccess()
```

## Bridge Debugging

Use Safari Web Inspector on simulator or device:

```js
window.StyleAtlasNativeBridge.getPlusAccess()
window.StyleAtlasRuntime.getConfig()
window.StyleAtlasRuntime.isExternalGalleryEnabled()
```

Expected iOS V1 values:

- `getPlusAccess()` is `false` before purchase or restore.
- `getConfig().nativeShell` is `true`.
- `isExternalGalleryEnabled()` is `false`.

If the Plus button does nothing, confirm `window.webkit.messageHandlers.styleAtlas` exists in the inspector.

## Simulator / Device QA Checklist

Basic startup:

1. App launches.
2. `WKWebView` loads local `index.html`.
3. Home still displays in airplane mode.
4. All 120 style covers display.
5. Search works.
6. Detail pages work.
7. Saved styles persist after app restart.

Offline:

1. Open multiple detail pages in airplane mode.
2. Confirm no Wikipedia requests.
3. WebP images display.
4. No blank hero images.

Free Plus state:

1. Default Plus is `false`.
2. Locked styles show the soft lock.
3. Copying locked style expression opens Plus.
4. Saving more than 20 styles opens Plus.
5. Free export includes watermark.

StoreKit local purchase:

1. Open Plus Paywall.
2. Tap `Unlock Plus`.
3. StoreKit local purchase sheet appears.
4. Successful purchase unlocks locked content.
5. Export watermark disappears.
6. Saved style limit is removed.
7. Restarting the app keeps Plus.
8. `Restore Purchases` restores Plus.

Language:

1. Chinese displays correctly.
2. English displays correctly.
3. Plus Paywall switches language.
4. About page switches language.

## Offline Mode

V1 should be fully offline:

- Bundle all web files and WebP covers.
- Do not depend on GitHub Pages.
- Keep saved styles local.
- Disable external Wikipedia gallery requests inside the iOS shell.

The iOS shell injects this runtime config at `documentStart`:

```js
window.STYLE_ATLAS_RUNTIME_CONFIG = {
  nativeShell: true,
  externalGalleryEnabled: false
}
```

The GitHub Pages web version does not receive this native config, so it keeps `externalGalleryEnabled=true` and may still show optional Wiki gallery images.

## App Review State

If StoreKit 2 is not truly working:

- Do not submit a build with a visible purchase button.
- Do not claim Plus is available in App Store screenshots or description.
- Do not show a paid feature that cannot be purchased.

If StoreKit 2 is working:

- Paywall can show the purchase button.
- Restore Purchases must be visible and working.
- App Review Notes should say: `Plus is a non-consumable in-app purchase powered by StoreKit 2.`

Never add external payment links inside the app.

## App Store Submission Risk Checklist

- StoreKit purchase works in sandbox before Plus is shown as available.
- Restore Purchases works.
- No external payment link exists.
- App Store screenshots match actual app behavior.
- If Plus is not ready, hide purchasable Paywall UI in the submitted build.
- Airplane mode still shows the core atlas.
- Optional Wikipedia gallery stays disabled for iOS V1.
- App privacy answers mention no login, no ads, local saved styles, and Apple-handled purchases.
- Product description does not promise AI image generation.

## Pre-Submission Checklist

- Xcode build passes on simulator.
- Web resources are bundled.
- Airplane mode still shows all core content.
- Search works offline.
- Saved styles persist locally.
- Plus purchase unlocks all locked archives.
- Restore purchase works.
- Free export has watermark.
- Plus export removes watermark.
- App Store screenshots match actual app behavior.
