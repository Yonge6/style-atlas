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
