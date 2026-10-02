# Opt-in analytics release — 1.6.1 (20)

## Scope

The user explicitly authorized submission to Apple and confirmed that the submitted build must contain usage analytics. Read App Store Connect live: 1.6 was already distributable and the latest uploaded build was 19. Created version 1.6.1, increased both app and widget build numbers to 20, and preserved subscription pricing/no introductory offer.

## Verified package and tests

- Archive: `/Volumes/LaCie/StyleAtlas-analytics-review-20261002/StyleAtlas-1.6.1-20.xcarchive`.
- Archive log: `/tmp/style-atlas-archive20-20261002.log` — ARCHIVE SUCCEEDED.
- `scripts/verify-analytics-app.cjs` independently verifies signed bundle version/build, iPhone/iPad support, four disabled default collection flags, exact Firebase/privacy configuration, widget isolation, all 170 embedded Web file hashes and daily-catalog hash. Passed against the new archive.
- Native symbols include `ProductAnalytics`; this is the instrumented build, not a re-upload of build 19.
- Four analytics/native configuration unit tests passed.
- Four analytics browser tests passed, including default off, explicit opt-in, withdrawal persistence, preview exclusion, native bridge transport and mobile consent layout.
- No device installation or production analytics receipt is claimed.

## Upload

Apple upload completed at approximately 13:06:57 Asia/Shanghai on October 2, 2026. Xcode reported “Upload succeeded”, “Uploaded StyleAtlas” and EXPORT SUCCEEDED. Log: `/tmp/style-atlas-upload20-20261002.log`.

Non-fatal upload warnings: the archive did not contain the matching FirebaseAnalytics.framework and GoogleAppMeasurement.framework dSYMs. Upload succeeded, Apple finished processing, and build 20 became selectable for App Review. No claim about third-party crash symbolication is made.

## App Store metadata / submission

Created 1.6.1 and saved English and Simplified Chinese update notes explaining opt-in analytics. Existing screenshots and product descriptions were inherited. App Review notes retain purchase/Photos review paths and add analytics disclosure, including the exact side-menu “Usage statistics” control and exclusion of sandbox/TestFlight events from production reporting. Recovered the temporary browser timeout in the same task space and corrected the initial About-page wording before submission.

Published all five native privacy categories: coarse location, device ID, purchase history, product interaction and other diagnostic data. Every category is analytics-only, linked conservatively through the app-instance identifier, and not used for tracking. App Store Connect readback showed all five categories complete, with no unfinished setup warning. Updated both localized privacy-policy URLs to `https://style-atlas.wonderelian.com/privacy.html`; its live page contains matching default-off/withdrawable-consent disclosures.

Preserved `AFTER_APPROVAL` automatic release, immediate availability (no phased rollout), existing ratings, and no sign-in requirement. No subscription price or offer changes were made.

## Submission verified

Submitted **1.6.1 (20)** at **2026-10-02 13:13 Asia/Shanghai**. After the success dialog, independently opened the specific submission details page and read back **Waiting for Review / 等待审核**, including the exact 1.6.1 (20) build link.

- Build ID: `0bf19c90-1c66-4492-a739-8195666f1401`.
- Submission ID: `7aae1ec4-0a36-48df-aebc-9afbf6ae8af4`.
- Review: https://appstoreconnect.apple.com/apps/6787447019/distribution/reviewsubmissions/details/7aae1ec4-0a36-48df-aebc-9afbf6ae8af4

This is verified submission, not approval or public availability. Native production telemetry still requires the approved instrumented release, a production AppTransaction and user consent; no production-event receipt or phone installation is claimed.

## Storage check

At the beginning of this continuation, the internal Data volume had approximately 33 GiB free; the installed iOS runtime remained Ready / Verified. Neither the obsolete Inbox staging file nor its former zero-byte external placeholder remained at their old paths. This turn did not delete them or attribute the user's freed space to this task.
