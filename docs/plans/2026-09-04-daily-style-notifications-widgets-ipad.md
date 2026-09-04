# Daily Style Notifications, Widgets, and iPad Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an opt-in 09:00 local daily style notification, WidgetKit widgets, and universal iPhone/iPad support while preserving all commerce and release settings.

**Architecture:** Generate a compact native daily-style catalog from the canonical web data, share its date-selection logic between the app and WidgetKit extension, and route reminder controls through the existing web/native bridge. Keep reminders local and widgets self-contained so no backend or App Group capability is required.

**Tech Stack:** Swift 5, SwiftUI, WidgetKit, UserNotifications, WKWebView bridge, JavaScript/Node validation, Playwright, Xcode project file.

---

### Task 1: Lock the data contract and failing feature checks

**Files:**
- Create: `scripts/generate-ios-daily-catalog.mjs`
- Create: `scripts/validate-ios-daily-features.mjs`
- Modify: `package.json`

**Steps:**
1. Add validation for 120 unique catalog rows, known-date parity with JavaScript `dailyIndex()`, widget target/build settings, device families, orientations, URL scheme, and notification source markers.
2. Run `npm run test:ios-features` and confirm it fails because the catalog and native features do not yet exist.
3. Add the generator, produce the compact catalog, and rerun only the catalog portion until it passes.

### Task 2: Add shared daily-style logic and local notifications

**Files:**
- Create: `iOS/StyleAtlas/Shared/DailyStyle.swift`
- Create: `iOS/StyleAtlas/Notifications/DailyStyleNotificationManager.swift`
- Modify: `iOS/StyleAtlas/StyleAtlasApp.swift`
- Modify: `iOS/StyleAtlas/ContentView.swift`
- Modify: `iOS/StyleAtlas/WebView/WebViewBridge.swift`
- Modify: `iOS/StyleAtlas/WebView/WebViewContainer.swift`

**Steps:**
1. Implement exact local-date hashing and catalog loading with safe fallback behavior.
2. Implement opt-in/out, authorization-state readback, rolling future 09:00 scheduling, cancellation, and foreground reconciliation.
3. Inject notification state into JavaScript and accept one bridge command for toggling reminders.
4. Build the app target with signing disabled and fix all compiler errors before proceeding.

### Task 3: Add the bilingual reminder control to the existing drawer

**Files:**
- Modify: `index.html`
- Modify: `game.js`
- Modify: `styles.css`
- Modify: `tests/ux.spec.js`
- Regenerate: `iOS/StyleAtlas/Resources/Web/`

**Steps:**
1. Write Playwright tests that require the control only in native mode, verify bilingual text, bridge payloads, enabled/denied feedback, and no web-store regression.
2. Run the focused tests and confirm failure.
3. Add the drawer control and native bridge state renderer.
4. Synchronize the Web bundle and rerun focused tests until passing.

### Task 4: Add WidgetKit and deep links

**Files:**
- Create: `iOS/StyleAtlas/Widgets/StyleAtlasWidgetBundle.swift`
- Create: `iOS/StyleAtlas/Widgets/DailyStyleWidget.swift`
- Create: `iOS/StyleAtlas/Widgets/Info.plist`
- Create: `iOS/StyleAtlas/Info.plist`
- Create: `iOS/StyleAtlas/Resources/DailyStyles.json`
- Create: `iOS/StyleAtlas/Widgets/Resources/`
- Modify: `iOS/StyleAtlas/StyleAtlas.xcodeproj/project.pbxproj`
- Modify: `iOS/StyleAtlas/StyleAtlasApp.swift`
- Modify: `iOS/StyleAtlas/WebView/WebViewBridge.swift`

**Steps:**
1. Add a WidgetKit extension target and embed it in the app.
2. Compile shared catalog code into both targets and bundle the compact catalog/resources into each target.
3. Add small and medium widget layouts using semantic system colors and SF Symbols.
4. Register `styleatlas://` and route widget URLs to the matching web style.
5. Build both targets for a generic iOS Simulator destination.

### Task 5: Enable iPad and verify responsive behavior

**Files:**
- Modify: `iOS/StyleAtlas/StyleAtlas.xcodeproj/project.pbxproj`
- Modify: `styles.css`
- Modify: `tests/ux.spec.js`

**Steps:**
1. Set app and widget device families to `1,2`; preserve iPhone portrait and add four standard iPad orientations.
2. Add wide-screen reading-width constraints without changing phone layouts.
3. Test 768×1024 portrait, 1024×768 landscape, and narrow Split View widths for zero overflow and usable dialogs/drawers.
4. Confirm the share/export popover source remains valid on iPad.

### Task 6: Full verification and source delivery

**Files:**
- Modify: `iOS/StyleAtlas/README.md`

**Steps:**
1. Run `npm run test:ios-features`, `npm run test:ux`, `npm audit`, `node --check game.js`, resource synchronization checks, and `git diff --check`.
2. Build Debug and Release for generic iOS Simulator with signing disabled and verify both app and widget products.
3. Inspect the built app Info.plist for device families, orientations, version/build invariance, URL scheme, and embedded widget.
4. Document local notification/widget/iPad test steps and the explicit non-release boundary.
5. Commit only scoped tracked files, confirm `release-assets/` remains only on LaCie, push `feature/v1.5-plus-subscriptions`, and verify the remote SHA.
