# Style Atlas Product Usage Implementation Plan

**Goal:** Add consent-based H5 and native usage analytics and a dedicated Style Atlas section in the existing ops User Usage module.

**Architecture:** Reuse Yixiu's GA4/Firebase contract, with `atlas_v1_` events, exact web hostname and a separate iOS stream. H5 and native share semantic interaction hooks; native forwards only allowlisted metadata to Firebase. No notes, search text, personal identity or transaction IDs are uploaded. Missing observations remain null.

**Tech Stack:** Vanilla JavaScript, WKWebView/Swift, FirebaseAnalyticsCore, GA4 Data API, existing ops Node provider and renderer.

## Tasks

1. Add a strict event transport and consent UI (`product-analytics.js`, `.css`, `analytics.js`, `index.html`), default off and withdrawable in the menu. Unit-test allowlists, production exclusions, consent transitions and active-time clock with Node test runner.
2. Instrument real outcomes in `game.js`: screen/detail views, active foreground time, guided learning, saved styles, local reflection save counts, search use without query, sharing/export outcomes and membership operations. No click-based inferred installations or revenue. Mirror changed web resources into the native bundle.
3. Add production-only Firebase bridge in native sources, dependency and privacy flags; validate config against bundle and AppTransaction environment. Build unsigned Release and document separate production distribution requirement. Do not replace the App Store submission as part of telemetry implementation.
4. Extend ops provider, config, synchronizer and `public/product-usage.js` with isolated Style Atlas web/iOS reports, content and daily details. Test filtering, null metrics, stale-data retention and bilingual UI.
5. Safely deploy scoped web and ops deltas with backup/hash checks; run interaction tests with telemetry disabled and read back public UI. Keep test observations out of production usage. Record exact completed/pending activation states.

## Acceptance

- Opt-out causes no analytics loading/transmission; withdrawn users stop immediately.
- Idle/background time not counted; duration is incremental, not total repeated.
- Native debug/simulator/TestFlight excluded; native never uses web GA tag.
- Existing pricing, promotions, assets and unrelated checkout changes preserved.
- Production web and ops independently read back; native build is not represented as a released App.

## Native activation continuation (user authorized using Yixiu's successful path)

1. Use the already-signed-in administrator at Firebase to register only `com.xiazishuo.styleatlas` in the existing free project; preserve Yixiu/Buer registrations and account roles. Download the official configuration and verify identity before bundling.
2. Add a native configuration/privacy validation test, first demonstrate failure without the required resources, then add `GoogleService-Info.plist` and `PrivacyInfo.xcprivacy` to the main target only. Keep collection default-off and all production/test gates.
3. Restore the matching retained 23F77 Xcode platform from LaCie and build Release with DerivedData on LaCie; verify bundled flags/config and unchanged version/pricing. Do not alter an existing App Store submission in this activation step.
4. Read back the newly created exact GA4 iOS stream; update only ignored `config/product-analytics.local.json` mapping and refresh only Style Atlas. Test isolation and deploy the same four-file ops delta with a distinct backup revision.
5. Record official registration, build and reporting evidence; distinguish a verified connection from an App Store release and actual production observations. Commit scoped source changes, preserving unrelated files.
