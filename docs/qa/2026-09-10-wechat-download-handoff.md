# WeChat download handoff — released 2026-09-10

## Behavior

Following Wendao's dedicated-download-page pattern, drawer, About and Plus H5
download actions now navigate in the same tab to `download.html?lang=zh|en` in
iPhone WeChat. This is a real navigation, not a modal or history-only URL change.
The page displays the default-browser guide in WeChat. Opening that same URL in
an external browser automatically replaces it with the existing fixed App Store
URL for app 6787447019, retaining attribution parameters. No second H5 tap needed.
Normal browsers still navigate directly to the App Store. Real link, modern and
legacy clipboard fallback, and truthful failure feedback remain available.
Redirect query parameters are ignored; only the language parameter is read.

## Verification

- Full UX regression: **327 / 327 passed** (1.9 minutes).
- Targeted download/native-drawer checks: **3 / 3 passed**.
- Local and public reusable smoke checks: three entries in both languages PASS;
  external-browser automatic redirect PASS; ordinary-browser direct download PASS;
  modern clipboard, rejected API/legacy success and total failure PASS.
- Download page horizontal overflow at 320, 390 and 768 px: 0.
- Existing home, search and reading lifecycle smoke checks at 390×844 and
  1024×768: PASS; page errors / failed same-origin responses: 0.
- Reviewed the 390 px download-page screenshot.
- JavaScript syntax, `git diff --check`, Web/iOS game.js consistency and bundled
  resource validation: PASS. npm dependency audit: 0 vulnerabilities.
- Browser automation emulates the iPhone WeChat user agent and intercepts the
  outgoing Apple URL to assert its destination. This does not claim a physical
  WeChat menu tap or App Store app installation was performed.

## Release

- URL: https://style-atlas.wonderelian.com/
- Production commit: `5ead5f468cdf9d4d98bf8ae411dbdf8cbe540f67` (`gh-pages`).
- Backup: `/srv/wonderelian/backups/style-atlas-20260910-wechat-handoff-682453d`.
- Added download assets before switching game.js and index.html. Nginx check PASS.
- Existing main styling, policy pages and analytics preserved; analytics HTTP 200.
- No native source, version/build, subscription or App Store review change.
  Shared web source resources are synchronized, but no new App binary was built.

Public SHA-256 values match the production commit:

| File | SHA-256 |
| --- | --- |
| index.html | `73951ca5fe77ca82a5f02bfdbda1e4d342467cf46b9f8611e639a407f9d1fc5d` |
| game.js | `2cbe37684aa354539890007d524531aa305013fd858e3b9577852af87652a56e` |
| download.html | `e9860c8f26c5b32d96e93af50e45e0d08f516f50d32b8e1386e1af10ce258037` |
| download/download.js | `943fbba6edd7462a8b96c0967ce44bf497b11e30e44a9980a1218224841edd9a` |
| download/download.css | `0e3a172efe56fc842440d4b4009b3205d4a1b9d5be1e7a5ed592e9abd753b7d4` |

Evidence on LaCie: `style-atlas-ux-20260910.log`,
`style-atlas-download-targeted-20260910.log`,
`style-atlas-download-live-20260910.json`,
`style-atlas-download-live-20260910-download.png`.
