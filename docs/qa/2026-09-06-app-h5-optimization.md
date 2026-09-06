# App / H5 optimization verification — 2026-09-06

## Scope

Cached bilingual search data, local-midnight and foreground daily-card refresh,
unchanged-entitlement DOM preservation, background reflection persistence,
queued native notification/widget destinations, and WKWebView process recovery.
No subscription product, purchase flow, pricing, or App Store review state changed.

## Checks

- Full UX run: 326 passed; one existing core-mobile-flow test timed out in
  `mouse.move`. That exact test then passed three consecutive standalone runs.
  New lifecycle and entitlement regression tests all passed in the full run.
- `npm run test:ios-features`: PASS (120 styles, 09:00 notifications, small/medium
  widgets, iPhone/iPad).
- `npm audit`: 0 vulnerabilities.
- JavaScript syntax and `git diff --check`: PASS.
- iOS resource checker: PASS, 120 WebP resources.
- Release device build: BUILD SUCCEEDED; code-signature deep/strict verification PASS.
- Root, iOS source bundle, and built App `game.js` SHA-256 all equal:
  `8c30dd54741528c57d99c6faa8597ee7f93dc38d730d94d2b449c20b6ffdcdce`.

## H5 release

- Production commit: `682453dd06085b64a2606a41d5cd090f4bdb5821`, pushed to `gh-pages`.
- Only production `game.js` and `index.html` changed; existing policy pages,
  analytics, styling, and other production-only content preserved.
- Backup: `/srv/wonderelian/backups/style-atlas-20260906-lifecycle-9c3e0be`.
- Public URL: https://style-atlas.wonderelian.com/
- Live automated checks at 390×844 and 1024×768: midnight refresh, search ranking,
  open-guide preservation PASS; horizontal overflow 0; page errors / failed
  same-origin responses 0.
- WeChat drawer/about/Plus download entries PASS; copied full App Store link PASS;
  duplicate toast absent.
- Nginx configuration validation PASS.
- Public hashes match production files:
  - index.html: `1bb056022ae2bc0176805576f93c2e7dbed28e98b3f0a952a68c037355c39f58`
  - game.js: `b3344ea846a96af74f5f316edaa77ba336731c17d7848a9afb3eb31074be4503`
  - styles.css (unchanged): `40f6f1cb457cb10467536fb2f2cc1228c8c90b607d05f7e2423278010ce00056`
  - analytics.js (unchanged): `85411b5403496b06739a4b70ccd1abf5db42bee70886a0d1e7376eaa266e1b6b`

## Device installation — pending user unlock

App version 1.6 (15), with embedded Widget extension, is built and development-signed:
`/Volumes/LaCie/StyleAtlas-Optimization-20260906/Build/Products/Release-iphoneos/StyleAtlas.app`.
Installation onto paired iPhone “永歌14PM” was attempted, but iOS refused to mount
developer services with `kAMDMobileImageMounterDeviceLocked` (`0xe80000e2`).
The new App has NOT been installed or device-launch-tested yet. Unlock the phone,
retry installation without uninstalling the existing App, then verify installed
version/build and launch. The App Store submission 1.6 (14) remains untouched.

## Local evidence

- `/Volumes/LaCie/style-atlas-ux-final-20260906.log`
- `/Volumes/LaCie/style-atlas-core-recheck-20260906.log`
- `/Volumes/LaCie/style-atlas-h5-live-qa-20260906.json`
- `/Volumes/LaCie/style-atlas-h5-live-20260906.png`
- `/Volumes/LaCie/style-atlas-install15.json`
- `/tmp/style-atlas-release15.log`

The reusable live verification command is `node scripts/verify-web-lifecycle.mjs
https://style-atlas.wonderelian.com/` with the configured Playwright browser path.
