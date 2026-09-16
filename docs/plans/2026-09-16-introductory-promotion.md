# Style Atlas Introductory Promotion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the annual free trial with a one-month introductory-price campaign for both monthly and annual subscriptions, ship truthful offer display in Style Atlas 1.6 (17), and submit the replacement build for App Review.

**Architecture:** StoreKit remains the source of truth for localized standard prices, introductory-offer eligibility, payment mode, duration, and offer price. The native layer flattens those values into the existing WebView bridge; the web paywall advertises an offer only when eligibility and every required term are known, otherwise it shows the standard renewal price. App Store Connect uses paid-up-front introductory offers in all 175 storefronts, with China as the reference storefront and automatic Apple equalization elsewhere.

**Tech Stack:** StoreKit 2, SwiftUI/WKWebView, vanilla JavaScript/CSS, Playwright, Xcode 26.6, App Store Connect.

---

## Release and campaign constraints

- Preserve subscription product IDs, subscription group, entitlements, manual release, screenshots, ratings, availability, and unrelated app behavior.
- Standard China prices remain CNY 68/month and CNY 598/year.
- Campaign reference prices are CNY 13.80 for the first month and CNY 120 for the first year; Apple equalization currently maps these to USD 1.99 and USD 17.99.
- Offers use `PAY_UP_FRONT`, one monthly period or one annual period, then renew at the standard price until cancelled.
- The existing annual seven-day free trial must end before the paid offer begins. No free trial and paid introductory offer may overlap.
- Apple determines eligibility at the subscription-group level. Ineligible or unknown users must never see discounted claims in the paywall.
- Do not withdraw submission `b3c41e4d-77b8-42ef-94ca-d3d640bca1d8` until Build 17 has passed tests, archive validation, and upload.

### Task 1: Add failing offer-display coverage

**Files:**
- Modify: `tests/ux.spec.js`

1. Replace the legacy `annual_trial_eligible` fixture with complete StoreKit offer fields.
2. Add Chinese and English tests for paid-up-front monthly and annual offers, including offer price, full period, standard renewal price, CTA, and disclosure.
3. Add tests proving ineligible, missing, malformed, and unknown-mode offers fall back to standard pricing without discount or trial claims.
4. Run targeted Playwright tests and confirm they fail against the legacy hard-coded trial UI.

### Task 2: Bridge complete StoreKit introductory terms

**Files:**
- Modify: `iOS/StyleAtlas/Store/StoreManager.swift`

1. Replace the annual-only eligibility boolean with an atomically published display payload.
2. For each plan, include the localized standard price and, only when StoreKit returns a complete offer, its eligibility, localized offer price, period unit/value/count, and payment mode.
3. Normalize StoreKit values to `day|week|month|year` and `freeTrial|payAsYouGo|payUpFront`; unknown values remain unadvertised.
4. Preserve purchase, restore, entitlement, timeout, and product-ID behavior.

### Task 3: Render truthful bilingual offer terms

**Files:**
- Modify: `game.js`
- Modify: `index.html`
- Modify: `styles.css`
- Sync: `iOS/StyleAtlas/Resources/Web/game.js`
- Sync: `iOS/StyleAtlas/Resources/Web/index.html`
- Sync: `iOS/StyleAtlas/Resources/Web/styles.css`

1. Parse and validate complete introductory-offer payloads per plan.
2. Format paid-up-front, pay-as-you-go, and free-trial periods in Chinese and English.
3. Show the eligible offer price in the plan card and selected-price area, while explicitly showing the later standard renewal price.
4. Keep ineligible/unknown users on standard price and standard renewal copy.
5. Remove fixed seven-day-trial marketing from About and static paywall fallback text.
6. Keep both plan options, legal links, restore, purchase message payload, focus behavior, and compact layout intact.

### Task 4: Update local StoreKit configuration and Build 17

**Files:**
- Modify: `iOS/StyleAtlas/Resources/StoreKit/StyleAtlas.storekit`
- Modify: `iOS/StyleAtlas/StyleAtlas.xcodeproj/project.pbxproj`
- Create: `docs/app-store/promotion-1.6/release.md`

1. Replace the annual free-trial fixture with a paid first-year offer and add a paid first-month offer.
2. Increment App and Widget build numbers from 16 to 17; retain marketing version 1.6.
3. Record exact campaign rules, validation, artifacts, upload, review, and public-state boundaries.

### Task 5: Verify and package

1. Run targeted offer tests, the full UX suite, JavaScript syntax, iOS resource synchronization, daily-feature validation, `npm audit`, and `git diff --check`.
2. Build a simulator Release and archive a distribution Release.
3. Verify Info.plist version/build, code signature, embedded provisioning, absence of internal-Plus flags, and byte equality of bundled web resources.
4. Export and upload Build 17. Wait for App Store Connect processing and read back the exact build.

### Task 6: Replace review and configure the campaign

1. Only after Build 17 is processed, withdraw the current 1.6 (16) review submission.
2. Select Build 17, update bilingual What's New and review notes to describe dynamic introductory terms, and preserve manual release and existing media.
3. End the annual seven-day trial before the campaign starts.
4. Create monthly first-month and annual first-year paid-up-front offers across all 175 storefronts for one calendar month, using CNY 13.80 and CNY 120 reference prices with Apple equalization.
5. Attach the app version and any subscription items Apple requires, submit for review, and read back `Waiting for Review` from the new review record.
6. Record that submission does not prove approval, public availability, offer eligibility, or a completed production purchase.
