# WeChat download handoff

Follow the existing Wendao implementation: all iPhone WeChat H5 download entries
navigate in the same tab to `download.html?lang=zh|en`. The standalone lightweight
page keeps the WeChat guide visible; when that exact URL opens in an external
browser, it replaces itself with the fixed Style Atlas App Store URL automatically.
Ordinary browsers retain the existing direct App Store action.

Preserve the real App Store anchor, bilingual copy, truthful clipboard feedback
and legacy-copy fallback. Never accept a redirect destination from query input.
Do not change subscription behavior, version/build or App Store submission state.

Verify all three entry points, both languages, external-browser auto-navigation,
copy success/failure, non-WeChat direct download, and mobile overflow. Back up
production, publish new download resources before updating entry scripts, then
verify public hashes and interactions. Preserve production-only policies/analytics.
