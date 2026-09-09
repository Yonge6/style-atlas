# Adaptive Reading Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Prepare a release-quality adaptive iPhone reading experience for compact,
expanded and changing window sizes without claiming unperformed iPhone Duo tests.

**Architecture:** Adapt to available viewport width, not a hardware-model string.
Extend the existing wide-layout breakpoint to medium windows, separate artwork
and guide text when space permits, and retain reading position on width changes.
Keep the same web document and native WKWebView instance through transitions.

**Tech Stack:** SwiftUI / WKWebView, CSS Grid, JavaScript, Playwright, Xcode.

---

## Evidence and release constraints

Apple's https://www.apple.com/iphone-duo/specs/ lists a 7.6-inch inner screen at
1878×2670 pixels, a 5.4-inch outer screen at 1398×2034 pixels and iOS 27.
These physical pixels do not establish UIKit point sizes or safe-area insets.
Test a broad viewport matrix; do not label inferred CSS dimensions as an official
simulator or use browser renders as fabricated Duo App Store screenshots.
Current local tools: Xcode 26.6 / iOS 26.5 runtime, no Duo device type.
Current ASC version 1.6 build 14 is Waiting for Review; release mode is manual.
Do not withdraw until the replacement build and truthful metadata are ready.
Do not change commerce, prices, entitlements, release mode or live H5 as part of
this App-specific request. Figma conversion and unavailable superpowers-specific
automation are not needed; execute the requested work directly in this worktree.

### Task 1: Responsive layout regression

**Files:** Create `tests/adaptive.spec.js`; modify `styles.css`.

1. Add failing tests for medium-width shell utilization, side-by-side guide image
   and text at 626×890 / 890×626 (test viewports, not official device points),
   compact restoration, short landscape controls and large text overflow.
2. Run `npx playwright test tests/adaptive.spec.js`; record baseline failures.
3. Use the existing wide layout from 600 px, flexible hero columns, safe-area-aware
   padding, and a wide guided panel with independently scrollable instructions.
4. Re-run targeted tests; visually inspect compact, medium and wide screenshots.

### Task 2: Preserve reading across live width changes

**Files:** Modify `game.js`, `tests/adaptive.spec.js`.

1. Add a failing test that scrolls to an interior paragraph then repeatedly changes
   the viewport width, asserting the current style, paragraph and guide stage.
2. Capture a visible reading anchor on settled scrolling; restore its relative
   offset after width changes without renderAll, navigation or data changes.
3. Skip height-only keyboard resizing and overlay interactions; keep native
   entitlement, search query, favorites and current guide step unchanged.
4. Run tests with reduced motion and native runtime mock.

### Task 3: Native packaging and release evidence

**Files:** Modify `iOS/StyleAtlas/Info.plist`, project build number and synchronized
`iOS/StyleAtlas/Resources/Web/`; create `docs/app-store/adaptive-1.6/`.

1. Enable iPhone landscape left/right alongside portrait; retain all iPad modes.
2. Sync bundled web files; run syntax, resource, feature and full UX checks.
3. Build App and Widget for simulator and distribution; verify signing and build.
4. Capture actual supported simulator screenshots and bilingual release copy.
5. Recheck SDK / Duo validation availability. Never describe unsupported device
   simulation, Apple Pencil functionality or hardware-specific features as tested.
6. Only after replacement readiness, remove the waiting submission, select the new
   processed build, upload accurate assets, preserve manual release and submit.
   If hardware/SDK readiness blocks the claimed release scope, keep old review
   intact and report the exact remaining decision instead of misrepresenting it.

## Execution checkpoint — 2026-09-10

- User required waiting for Wendao's review submission. Verified in App Store
  Connect that Wendao 1.8 (19), build c8f7362a-3dab-41c6-b2c5-6ce204e6a955,
  is Waiting for Review before resuming this release.
- Tasks 1 and 2 complete. Seven adaptive tests pass. Full regression: 333 passed
  initially; one browser-setup timeout (before the test body) passed on retry.
  All 334 test cases have passed against the current code.
- Short-window QA found native page zoom enlarged the dvh-based panel beyond
  the visible screen. The guide now divides its viewport height by the native
  zoom scale and uses a shrinkable grid row with a scrollable instruction pane.
- Syntax, diff whitespace, 120-image bundled resources, notification/widget
  validation and npm audit (zero vulnerabilities) pass.
- Release archive and simulator build 1.6 (16) succeed. Archived web JS/CSS match
  source byte-for-byte; codesign verification passes.
- Native iPad Pro 13-inch simulator validated both orientations, both languages,
  and retained step 2 while rotating. Two actual 2752×2064 JPEG screenshots
  captured, with only orientation correction and format conversion.
- Native iPhone 17 Pro Max QA completed: portrait/landscape detail and guide,
  safe-area controls, and step 2 retained on return to portrait.
- Both disposable Style Atlas simulators were removed after preserving captures
  due to low disk space. Other projects' simulators and user archives untouched.
- Task 3 complete: build 16 uploaded and processed; old build 14 review removed
  only after replacement readiness. Bilingual metadata and actual screenshots
  saved. Original monthly subscription reattached; annual remains Approved.
- Final submission `b3c41e4d-77b8-42ef-94ca-d3d640bca1d8` read back as Waiting
  for Review for both App 1.6 (16) and Monthly Auto-Renewable, 2026-09-10 04:09.
  Manual release and commerce settings preserved; H5 not deployed this turn.
- Wait-and-resume heartbeat paused after completion. Duo-specific device testing
  remains unperformed and is not claimed by the release copy.
