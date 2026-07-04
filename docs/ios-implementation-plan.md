# iOS Implementation Plan

## 虾子曰 Style Atlas / Xiazishuo Style Atlas

This document describes the first iOS App Store implementation path for the current static Style Atlas web app. The goal is a shippable iOS wrapper that works offline, preserves the existing visual experience, and unlocks Style Atlas Plus through StoreKit 2.

This plan does not add Stripe, external payment, login, backend services, user uploads, social features, AI image generation, or a complex Prompt Playground.

## 1. First Version Direction

Product names:

- 中文：虾子曰 Style Atlas
- English: Xiazishuo Style Atlas

Recommended first iOS architecture:

- Use `WKWebView` to wrap the current static site.
- Package static resources into the App Bundle.
- Do not depend on GitHub Pages or any external webpage for the main experience.
- Allow users to browse the existing 120 styles offline.
- Keep saved styles local.
- Use StoreKit 2 for one non-consumable in-app purchase: Style Atlas Plus.
- Do not use Stripe or external web payment.
- Do not add login or backend services.

## 2. Suggested Project Structure

```text
iOS/
  StyleAtlas/
    StyleAtlasApp.swift
    ContentView.swift
    WebView/
      WebViewContainer.swift
      WebViewBridge.swift
    Store/
      StoreManager.swift
      EntitlementManager.swift
    Resources/
      Web/
        index.html
        styles.css
        game.js
        data-core.js
        data-styles.js
        data-refined.js
        examples.js
        assets/
```

Recommended responsibilities:

- `StyleAtlasApp.swift`: app entry point.
- `ContentView.swift`: hosts the web container and StoreKit entitlement state.
- `WebViewContainer.swift`: configures `WKWebView`, loads local `index.html`, and injects entitlement state.
- `WebViewBridge.swift`: owns JavaScript message handlers and calls from native to web.
- `StoreManager.swift`: loads products, starts purchases, handles transaction updates, and restores purchases.
- `EntitlementManager.swift`: stores the current Plus entitlement state and exposes it to the SwiftUI layer.
- `Resources/Web/`: exact bundled copy of the static web app.

## 3. WKWebView Local Loading

The iOS app should load `index.html` from the local App Bundle:

```swift
let url = Bundle.main.url(
  forResource: "index",
  withExtension: "html",
  subdirectory: "Web"
)!
webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
```

Requirements:

- Load the main experience from local bundled files.
- Allow local access to `assets/`, JS, CSS, and image files.
- Do not use GitHub Pages as the main runtime.
- Keep the web app functional without network.
- Existing Wikipedia image requests remain a web-only optional enhancement.
- Core style covers, data, search, saved styles, and Plus logic must work without network.

P8.1 adds an iOS-only runtime config injection at `documentStart`:

```js
window.STYLE_ATLAS_RUNTIME_CONFIG = {
  nativeShell: true,
  externalGalleryEnabled: false
}
```

V1 iOS therefore defaults to fully offline mode. GitHub Pages keeps `externalGalleryEnabled=true`, so Wiki gallery images remain available on the web as an optional enhancement.

## 4. Web And Native Communication

The web app should expose a small Native Bridge and keep working when no native environment exists.

Native to Web:

- `setPlusAccess(true / false)`
- `getPlusAccess()`
- `restorePurchaseResult()`
- `shareCard()`
- `saveImageToPhotos()`

Web to Native:

- `purchasePlus`
- `restorePurchases`
- `exportImage`
- `shareImage`
- `hapticFeedback`

Recommended first-version bridge scope:

- Implement `purchasePlus`.
- Implement `restorePurchases`.
- Implement native-to-web `setPlusAccess`.

The web side now exposes:

```js
window.StyleAtlasNativeBridge.setPlusAccess(true)
window.StyleAtlasNativeBridge.getPlusAccess()
```

An alias is also available for simpler injection:

```js
window.StyleAtlasNative.setPlusAccess(true)
```

The iOS app can call this after checking StoreKit entitlement:

```swift
webView.evaluateJavaScript(
  "window.StyleAtlasNativeBridge?.setPlusAccess(true)"
)
```

## 5. Plus Permission Mapping

The current web permission helpers are the source of truth:

- `hasPlusAccess()`
- `canViewFullStyle(style)`
- `isStyleLocked(style)`
- `canExportHighRes()`

iOS should not duplicate style-by-style lock rules. Instead:

1. Web defaults to `plusEnabled=false`.
2. Native starts.
3. Native checks StoreKit entitlement.
4. Native injects the current Plus state:

```js
window.StyleAtlasNativeBridge.setPlusAccess(true)
```

When the value changes, the web app recalculates:

- `isFreeFullAccess`
- `accessTier`
- `isPlusLocked`
- `exportTier`

Then it re-renders the current page. This keeps detail locks, saved limits, expression copying, and export watermark behavior aligned with StoreKit state.

## 6. StoreKit 2 IAP Design

Product ID:

```text
xiazishuo_style_atlas_plus_lifetime
```

Type:

- Non-consumable

Display names:

- 中文：虾子曰 Style Atlas Plus
- English: Xiazishuo Style Atlas Plus

Price:

- Regular: $7.99 / ¥48
- Launch offer: $3.99 / ¥28

Unlocks:

- All 120 complete style archives
- Unlimited saved styles
- HD watermark-free export
- Multi-ratio export
- Offline viewing
- Future minor updates

StoreKit 2 requirements:

- Load product metadata.
- Start purchase.
- Handle successful purchase.
- Handle cancelled purchase.
- Handle failed purchase.
- Restore purchases.
- Validate current entitlement.
- Check entitlement automatically on app launch.
- Listen for transaction updates while the app is running.

Recommended Swift-level flow:

1. `StoreManager` loads `Product.products(for:)`.
2. Paywall calls `purchase(product)`.
3. Successful verified transaction updates `EntitlementManager.hasPlus`.
4. `WebViewBridge` injects `setPlusAccess(true)`.
5. Restore purchase checks `Transaction.currentEntitlements`.
6. App launch repeats entitlement validation before or immediately after loading the web view.

## 7. App Review Notes

Important review constraints:

- If the app displays Plus paid functionality, IAP must be real and testable.
- Do not guide users to external webpages for payment.
- App Store description and screenshots must match the submitted app.
- If Plus is not fully connected, hide the purchase CTA in the submitted build or keep it clearly as a non-purchasable prototype outside the App Store build.
- If Plus is connected, reviewers must be able to see and test the StoreKit 2 purchase.
- Do not market the app as an AI image generator.
- The core product is a visual style atlas, aesthetic learning tool, saved archive, and export utility.

Suggested App Review Notes when StoreKit 2 is complete:

```text
Style Atlas Plus is a non-consumable in-app purchase powered by StoreKit 2.
Purchasing Plus unlocks all complete style archives, unlimited saved styles,
HD watermark-free export, multi-ratio export, and offline viewing.
```

## 8. Privacy Manifest And App Privacy Planning

Current product privacy posture:

- No login.
- No account system.
- Saved styles are stored locally.
- User content is not uploaded.
- User data is not sold.
- No third-party advertising.

If StoreKit 2 is added:

- Apple processes purchase records.
- The app reads purchase entitlement state only to unlock features.
- No separate payment data should be collected by the app.

If analytics are added later:

- Clearly document whether Apple or third-party analytics tools are used.
- Update App Privacy responses and privacy policy.
- Avoid adding analytics to the first release unless there is a clear reason.

If a future `WKWebView` build re-enables Wikipedia images:

- The app may make external network requests to Wikimedia/Wikipedia.
- Privacy copy should disclose that some optional reference images may load from public web sources.
- Keep the P8.1 runtime config disabled for the first fully offline version.

## 9. Offline Strategy

### Option A: Fully Offline Version

- Bundle all 120 WebP/PNG images.
- Bundle all JS, CSS, data files, and local examples.
- Disable Wikipedia image enhancement through the P8.1 iOS runtime config injection.
- Lower review risk.
- Stable behavior in poor network conditions.
- Best match for the first App Store release.

Recommended for V1.

### Option B: Semi-Offline Version

- Core content works offline.
- Wikipedia images load as optional enhancement when network is available.
- Requires clearer network and privacy disclosure.
- Adds variability to App Review and screenshots.
- Useful later if richer public reference browsing becomes important.

## 10. Submission Copy State

If StoreKit 2 is not complete:

- App Store description should not say Plus is already purchasable.
- App should not present a working purchase button.
- Paywall should be hidden in the submitted App Store build, or clearly remain a prototype in non-store builds only.

If StoreKit 2 is complete:

- Plus Paywall may show the purchase button.
- App Store screenshots may show Plus.
- Review notes should state:

```text
Plus is a non-consumable in-app purchase powered by StoreKit 2.
```

## 11. Pre-Submission Checklist

- Web app loads from local Bundle.
- Airplane mode browsing works for all 120 style covers.
- Search works offline.
- Saved styles persist after app restart.
- StoreKit product metadata loads in sandbox.
- Purchase success unlocks Plus.
- Restore purchase unlocks Plus.
- `window.StyleAtlasNativeBridge.setPlusAccess(true)` unlocks web content.
- `window.StyleAtlasNativeBridge.setPlusAccess(false)` restores free locks.
- Free mode keeps watermark on exports.
- Plus mode removes the Free watermark.
- App Store screenshots and description match the actual build.
- No external payment route exists inside the app.
