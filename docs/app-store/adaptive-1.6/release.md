# Style Atlas 1.6 (16) — adaptive reading

App: 6787447019 · Bundle: com.xiazishuo.styleatlas.

## Scope

- Medium and wide windows use more available width and safe-area-aware spacing.
- Guided Looking separates artwork and instructions in wider windows, returning
  to the existing compact view when narrowed.
- Rotation and window-width changes preserve the reading paragraph and guide
  step. Height-only keyboard changes do not trigger restoration. Covered reading
  positions are restored after closing the drawer.
- iPhone supports portrait and both landscape orientations; iPad support remains.
- Native large-text guide height accounts for page zoom and instructions scroll
  inside the visible panel in short windows.
- No commerce, subscription, entitlement, notification schedule or widget changes.
  Production H5 is not deployed as part of this App release.

## Verification

- Seven new adaptive Playwright tests pass. Full run: 333 pass and one timeout
  while creating the browser page, before the test body. That case passes on
  retry. All 334 cases have passed against this source.
- `node --check game.js`, `git diff --check`, iOS resource integrity and
  `npm run test:ios-features` pass. `npm audit`: zero vulnerabilities.
- Release archive and Debug simulator build succeed with Xcode 26.6 / iOS 26.5.
- Code-signature validation passes. Archived JS and CSS match source exactly.
- Native iPad Pro 13-inch simulator: English and Chinese guide views, portrait
  and both landscape orientations, step 2 retained on rotation.
- Native iPhone 17 Pro Max simulator: portrait home/detail, landscape detail and
  guide, next-step controls, step 2 retained on return to portrait; safe-area
  controls remain outside the camera cutout.
- Browser viewport stress tests are not actual iPhone Duo validation. No Duo
  simulator or device was available. No hardware-specific claims are made in
  the submitted copy; layout follows available width rather than a model ID.

## Artifacts

- Archive: `/Volumes/LaCie/StyleAtlas-Adaptive-20260910/StyleAtlas-1.6-16.xcarchive`.
- Build / upload logs: `/Volumes/LaCie/style-atlas-{archive16,simulator16,upload16}-20260910.log`.
- Regression logs: `/Volumes/LaCie/style-atlas-full-20260910.log` and
  `/Volumes/LaCie/style-atlas-full-retry-20260910.log`.
- iPad store screenshots: `screenshots/{en-US,zh-Hans}/01-guided-wide.jpg`,
  2752×2064, no alpha. Actual simulator captures, orientation corrected and
  converted to JPEG; no composited or fabricated app UI.
- iPhone raw QA screenshots retained in `/Volumes/LaCie/StyleAtlas-Adaptive-20260910/`.
- Dedicated disposable Style Atlas simulators were removed after QA due to low
  disk space. Builds and screenshots remain reproducible. Other simulators,
  user documents, release-assets and archives were not removed.

## Submission checkpoint

Wendao 1.8 (19) was verified Waiting for Review before this release resumed,
as requested. Apple upload of Style Atlas 1.6 (16) succeeded on 2026-09-10.
Processing and final review submission are pending at this checkpoint. Existing
Style Atlas 1.6 (14) review is still retained. Preserve manual release, ratings,
all six iPhone screenshots and the existing iPad daily-style screenshot.
