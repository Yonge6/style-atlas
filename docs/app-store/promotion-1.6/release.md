# Style Atlas 1.6 (17) — introductory promotion

App: `6787447019` · Bundle: `com.xiazishuo.styleatlas`.

## Scope

- Reads StoreKit introductory-offer eligibility, localized price, payment mode,
  period and period count for both monthly and annual subscriptions.
- Eligible users see the complete first-term price and the later standard renewal
  price. Ineligible, unknown or incomplete offers fall back to standard pricing.
- No login, entitlement, product ID, subscription group, benefit or restore
  behavior changes.

## Campaign contract

- Duration: one calendar month after the corrected build is ready for review.
- China monthly: first month CNY 13.80, then CNY 68/month.
- China annual: first year CNY 120, then CNY 598/year.
- Apple equalization read before configuration: USD 1.99 and USD 17.99.
- Payment mode: paid up front for one month or one year.
- Existing annual seven-day trial ends before the paid introductory offer starts;
  offers do not stack.
- Apple determines introductory eligibility for the subscription group.

## Verification

- Source commit: `3dfbc82 Prepare paid introductory promotion`.
- Playwright: 335 passed; the four targeted introductory-offer tests also passed
  after the final presentation adjustment.
- iOS simulator build succeeded. Daily content, the 09:00 reminder, small and
  medium widgets, and iPhone/iPad support passed the existing feature check.
- `npm audit` reported zero vulnerabilities. JSON validation, `git diff --check`
  and root-to-embedded-Web byte synchronization passed.
- Archive signing and embedded provisioning validation passed. The archived app
  and widget are version 1.6 build 17, and the embedded Web bundle is byte-identical
  to the tested root bundle.
- Archive: `/Volumes/LaCie/StyleAtlas-Promotion-20260916/StyleAtlas-1.6-17.xcarchive`.
- Upload succeeded. App Store Connect build
  `9cab4da3-2cf8-4d29-9561-f8983c4491a7` is `VALID` and
  `APP_STORE_ELIGIBLE` for iPhone and iPad, with no non-exempt encryption.

## App Store Connect readback

- The prior review submission was withdrawn and reached `COMPLETE` before the
  corrected submission was made.
- The old annual seven-day free trial was removed.
- Monthly introductory offer: 175 territories, 2026-09-17 through 2026-10-17,
  `PAY_UP_FRONT`, `ONE_MONTH`, CNY 13.80 and USD 1.99.
- Annual introductory offer: 175 territories, 2026-09-17 through 2026-10-17,
  `PAY_UP_FRONT`, `ONE_YEAR`, CNY 120 and USD 17.99.
- Subscription review submission
  `09a7acc8-38b3-429d-8f3d-5be72ee91496` contains the monthly and annual
  subscription changes and is `WAITING_FOR_REVIEW`.
- App review submission `79b9068e-f120-4825-96f9-5d8b319f5b30` contains iOS
  App 1.6 build 17 and is `WAITING_FOR_REVIEW`.
- App version 1.6 independently reads back as `WAITING_FOR_REVIEW`; release type
  remains `MANUAL`.
- App descriptions, version notes, App review notes and subscription review notes
  describe paid first-term offers followed by standard renewal pricing and state
  that this campaign has no free trial.

## Submission boundary

Submission or `Waiting for Review` will not be described as approval, public
availability, offer eligibility or a successful production checkout.
