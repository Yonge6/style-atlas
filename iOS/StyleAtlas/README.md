# 虾子曰 Style Atlas iOS Shell

This is the first iOS shell for Xiazishuo Style Atlas. It includes a minimal Xcode project, local `WKWebView`, bundled web resources, Native-Web Bridge, and StoreKit 2 Plus entitlement structure.

## Current Stage

- SwiftUI shell files are provided.
- `WKWebView` loads bundled `Resources/Web/index.html`.
- StoreKit 2 supports the V1.5 one-year pass and annual auto-renewing Plus plans while preserving legacy lifetime entitlements.
- Web can call native `purchasePlus` and `restorePurchases`.
- Native can inject `window.StyleAtlasNativeBridge.setPlusAccess(true / false)`.
- Native injects both localized StoreKit prices into the Plus paywall.
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

Products:

- `xiazishuo_style_atlas_plus_annual`: non-renewing one-year pass, `$29.99` in the local configuration; the app calculates one Gregorian year from the verified purchase date.
- `xiazishuo_style_atlas_plus_annual_auto`: annual auto-renewing subscription, `$19.99` in the local configuration and selected by default.
- `xiazishuo_style_atlas_plus_lifetime`: legacy non-consumable entitlement retained only for existing purchasers.

If Xcode cannot recognize the included `.storekit` file, create a new StoreKit Configuration in Xcode and enter the same product values above. All Product IDs must stay exactly the same.

In Xcode:

1. Select the scheme.
2. Edit Scheme.
3. Run > Options.
4. StoreKit Configuration: select `StyleAtlas.storekit`.

## Runtime Mode

iOS 1.0 shipped in `freeLaunch` mode. The current subscription development branch injects this runtime config at document start:

```js
window.STYLE_ATLAS_RUNTIME_CONFIG = {
  nativeShell: true,
  externalGalleryEnabled: false,
  submissionMode: "iap"
}
```

This enables the native StoreKit 2 flow while keeping the web version unchanged:

- the native app shows both annual Plus plans and Restore Purchases
- the web version cannot initiate a purchase
- new customers choose a one-year pass or annual auto-renewing subscription
- existing lifetime purchasers keep permanent Plus access
- GitHub Pages still defaults to `submissionMode: "web"`

## App Store Assets

Final App Store assets are organized under the repository-level asset folder:

- App Icon: `assets/app-store/final/icon/app-icon-1024.png`
- App Icon source: `assets/app-store/final/icon/app-icon-source.png`
- Launch Screen source: `assets/app-store/final/launch/launch-screen.png`
- Chinese screenshots: `assets/app-store/final/screenshots/zh/`
- English screenshots: `assets/app-store/final/screenshots/en/`
- Free launch metadata: `assets/app-store/app-store-metadata-free-v1.md`
- Privacy page: `privacy.html`

The 1.0 App Store release used:

```text
submissionMode="freeLaunch"
```

The current development build uses `submissionMode="iap"`. It must not be submitted until both matching App Store Connect products, Sandbox purchase, Restore Purchases, and subscription review metadata are complete.

The final app icon is also wired into `Assets.xcassets/AppIcon.appiconset` for Xcode. The supplied launch screen artwork is preserved as a source asset; the current project can continue using the system-generated launch screen for the free launch. To use the custom image later, configure a `LaunchScreen.storyboard` or a SwiftUI launch screen in Xcode and reference `assets/app-store/final/launch/launch-screen.png`.

Screenshot dimensions:

- Chinese screenshots: 6 files, each 852 x 1846
- English screenshots: 6 files, each 852 x 1846
- Launch source: 863 x 1822

Before uploading screenshots to App Store Connect, confirm the required screenshot size for the chosen iPhone display set and adapt only if App Store Connect rejects the supplied dimensions.

## IAP Release Checklist

Before shipping the subscription update:

1. Create the App Store Connect Plus products:
   `xiazishuo_style_atlas_plus_annual`
   `xiazishuo_style_atlas_plus_annual_auto`
   Keep `xiazishuo_style_atlas_plus_lifetime` for legacy entitlement verification.
2. Complete IAP metadata.
3. Test Sandbox purchase.
4. Test Restore Purchases.
5. Confirm `WebView/WebViewContainer.swift` remains in `submissionMode: "iap"`.
6. Update the App Store description and review notes to disclose both annual Plus plans and the automatic-renewal terms.

## Local Purchase Test

The shared Xcode scheme selects `StyleAtlas.storekit` for local StoreKit testing:

1. Launch the app from Xcode.
2. Open Plus Paywall in the web UI.
3. Confirm the annual auto-renewing subscription is selected by default and shows `$19.99`.
4. Tap `Start annual subscription` and confirm the StoreKit local purchase sheet.
5. Verify locked style archives unlock and Restore Purchases retains access.
6. Reset StoreKit transactions, select the non-renewing one-year pass, and confirm it shows `$29.99`.
7. Verify purchase, restore, expiry and legacy lifetime migration independently before release.

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

StoreKit local purchase for future IAP mode:

1. Switch `submissionMode` to `iap`.
2. Open Plus Paywall.
3. Confirm the annual auto-renewing plan is selected by default, or select the one-year pass.
4. Start the selected plan.
5. StoreKit local purchase sheet appears for the matching Product ID.
6. Successful purchase unlocks locked content.
7. Export watermark disappears.
8. Saved style limit is removed.
9. Restarting the app keeps active Plus access.
10. `Restore Purchases` restores active annual or legacy lifetime access.

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
- App Review Notes should identify the non-renewing one-year pass, the annual auto-renewing subscription, and the retained legacy lifetime entitlement.

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
- Free export has watermark.
- App Store screenshots match actual app behavior.
- Free launch mode hides Plus purchase and Restore Purchases.
- App Store copy does not claim Plus is currently purchasable.
