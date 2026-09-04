# Daily Style Notifications, Widgets, and iPad Design

## Goal

Extend the existing Style Atlas iOS shell with a dependable 09:00 local daily style reminder, useful Home Screen widgets, and native iPad support without changing subscriptions, StoreKit products, the app version/build, or release state.

## Chosen approach

The reminder is a local notification scheduled with `UNUserNotificationCenter`. This avoids an APNs backend, device-token storage, credentials, and an always-on service. The user explicitly enables or disables it from the existing app drawer. Enabling requests system permission once and schedules a rolling set of non-repeating 09:00 notifications; foreground activation reconciles the schedule after timezone, locale, or calendar changes. Denied permission produces an explicit bilingual status and never blocks the app.

A small shared Swift catalog reproduces the JavaScript `dailyIndex()` algorithm. Its generated JSON is derived from the canonical `data-styles.js`, so the app, reminders, and WidgetKit select the same style for a date. The widget extension supports system small and medium families, renders the daily name, category, and a lightweight local thumbnail, and deep-links to that style in the main app. It does not use App Groups, network fetches, accounts, or StoreKit.

iPad support changes the target family from iPhone-only to universal, enables all standard iPad orientations, and keeps the existing phone orientation unchanged. The web shell remains edge-to-edge, while wide-screen CSS constrains reading surfaces to comfortable widths. Existing popover anchoring for share/export remains in place for iPad. Split View, portrait, and landscape layouts must not overflow horizontally.

## Data flow

1. `data-styles.js` remains the source of truth for 120 style identifiers and bilingual names.
2. A deterministic generator writes the compact widget/notification catalog and thumbnails.
3. `DailyStyleCatalog` loads the bundled catalog and hashes the device-local Gregorian date exactly like the web app.
4. `DailyStyleNotificationManager` schedules future 09:00 notifications and exposes authorization/enabled status to the web bridge.
5. The drawer sends enable/disable requests through the existing `styleAtlas` bridge and receives status updates.
6. Widget timelines refresh after local midnight and open `styleatlas://style/<id>`; the app forwards that identifier into the bundled web view.

## Failure handling and acceptance

Missing catalog data falls back to a safe placeholder instead of crashing. Missing thumbnails use a branded gradient. Notification denial, scheduling errors, and unsupported settings are logged without exposing private data. The feature is accepted only when web tests pass, Web/iOS resources remain synchronized, the source and widget targets build for iOS Simulator, the app declares device families `1,2`, the widget is embedded, and iPad viewport tests show zero horizontal overflow. No archive, upload, App Store mutation, StoreKit edit, or production deployment is part of this change.
