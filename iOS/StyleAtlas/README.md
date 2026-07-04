# 虾子曰 Style Atlas iOS Shell

This is the first iOS scaffold for Xiazishuo Style Atlas. It is not a finished Xcode project yet. The goal is a small native shell that can be dropped into a SwiftUI app: local `WKWebView`, bundled web resources, Native-Web Bridge, and StoreKit 2 Plus entitlement structure.

## Current Stage

- SwiftUI shell files are provided.
- `WKWebView` loads bundled `Resources/Web/index.html`.
- StoreKit 2 non-consumable product structure is provided.
- Web can call native `purchasePlus` and `restorePurchases`.
- Native can inject `window.StyleAtlasNativeBridge.setPlusAccess(true / false)`.
- No Stripe, external payment, login, backend, AI image generation, or social features.
- Xcode compile has not been verified in this environment.

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
