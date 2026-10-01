# App download banner — live 2026-10-01

The atlas homepage/detail views and both public editorial pages now show a
dismissible bilingual banner. It uses the same dedicated WeChat handoff pattern
as Wendao, with Style Atlas icon, copy and charcoal/gold styling.

Close persists for the current tab session across reload and article navigation.
Native WKWebView/file views omit the banner. Its measured height offsets the
main navigation, sticky chapter navigation and article sidebar. Safari-only
smart-banner metadata was replaced to avoid duplicate banners.

WeChat clicks navigate in the same tab to `download.html?lang=zh|en`. That page
shows external-browser instructions and copy-link fallback; opening it in an
ordinary browser automatically continues to the fixed attributed Apple URL.

## Verification

- Full local regression: 349 passed initially; three old fixed viewport-offset
  assertions needed to account for the new banner. They now assert that the
  comparison section sits below the actual navigation, including chapter tabs.
- After that test correction, the seven banner tests plus those three comparison
  tests passed: **10/10**. No product navigation change was needed.
- The same seven banner tests passed against the production HTTPS site:
  **7/7**, including WeChat guide visibility and automatic external navigation.
- Widths 320, 390, 768 and 1440: no horizontal overflow; banner/nav separation
  verified on the homepage and both articles. English/Chinese switching,
  session dismissal, blocked storage, ordinary download and native suppression
  all passed. Visual mobile and desktop inspection also passed.
- SEO validation, iOS resource validation, JavaScript syntax, shared bundle
  equality and `git diff --check`: PASS.
- WeChat behavior was verified with an emulated user agent. No physical WeChat
  menu interaction or App Store installation is claimed in this release.

## Deployment

- Site: https://style-atlas.wonderelian.com/
- Existing Nginx host mapping independently verified before publication.
- Root: `/srv/wonderelian/style-atlas.wonderelian.com`.
- Stage: `/srv/wonderelian/releases/style-atlas-banner-20261001`.
- Original HTML backup: `/srv/wonderelian/backups/style-atlas-before-banner-20261001`.
- Installed the two new banner assets before switching the three HTML entry
  points by same-directory rename. Nginx checks passed before and after.
- Each of the five published files was downloaded via HTTPS and compared
  byte-for-byte with the local candidate.
- Rollback: restore the three backed-up HTML files; unused banner assets may
  remain without affecting the restored pages.
- Existing site content, analytics and native App Store submission were retained.
  Pre-existing untracked `docs/growth/` is excluded from this change.

| File | Public SHA-256 |
| --- | --- |
| index.html | e17df01b2eb6259260aed2c1d08f97b81ad3ddb7730bdb33b5560cd7969d535c |
| download/app-banner.js | 6f3e2cf70bb4c57c0055d29175389ef24d1aa76b44470f3f550936fe21a2666d |
| download/app-banner.css | bbdeb4aeb86492f38db6df9c3adee67a249f631f560ef89337fb446f24bdb12c |
| guides/visual-hierarchy-checklist/index.html | 6ac984dd6b56eec54d134c922cc8505356535bb78fd06718f1ab2aace90836be |
| compare/art-nouveau-vs-art-deco/index.html | b9d31940a1f8328004313936eb4b087aa2763fe626c0de02075f72ad13869945 |
