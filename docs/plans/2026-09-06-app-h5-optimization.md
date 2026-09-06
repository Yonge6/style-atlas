# App and H5 lifecycle optimization

Scope: inspect and optimize the current implementation, publish the H5 changes,
and install version 1.6 (15) on the paired iPhone. The existing App Store review
submission is independent of this device build.

## Findings and implementation

- Search rebuilt bilingual names, aliases and descriptions for all 120 styles on
  each input event. Cache this immutable search data once and preserve the existing
  exact-name/partial-name ranking.
- Today's card was chosen only at startup. Refresh it at local midnight and when
  returning to the foreground; preserve an open guide or a manually selected card.
- Notification and widget links could arrive before the web bridge or SwiftUI
  subscriber existed. Retain the pending destination through both startup stages
  and deliver after navigation finishes.
- WKWebView did not recover after its content process terminated. Reload its
  bundled document and reapply native state when navigation finishes.
- Flush pending reflection writes when the page becomes hidden.
- Skip native entitlement updates when access has not changed, so returning to
  the foreground does not rebuild the current reading DOM unnecessarily.

## Verification and release

Run regression tests for midnight, foreground restoration, guide preservation,
search and existing native links, followed by the full UX suite. Compile the native
app and widget, verify bundled resources and signing, then install and launch on
the paired iPhone. Build artifacts live on LaCie to limit internal disk usage.

Apply the shared web optimization to the production branch while preserving its
existing policy links, analytics, and production-only pages. Back up the server's
changed files before replacement and compare public hashes and live interactions.
