# App download banner

The user requested the same dismissible H5/Web acquisition flow just shipped in
Wendao. Reuse its dedicated WeChat handoff pattern with Style Atlas branding.

- One fixed, bilingual banner above the existing navigation on the atlas and
  both editorial pages. Use the existing app icon and charcoal/gold palette.
- Close for the current browser tab session, including reloads and page changes.
- Normal browsers navigate to the existing attributed Apple URL. WeChat uses
  same-tab navigation to the existing download page; opening that page outside
  WeChat automatically continues to Apple. This does not bypass WeChat controls.
- Use a measured height for navigation/content offsets and narrow layouts.
- Hide in native WKWebView and local file views. Synchronize bundled assets but
  do not build or submit an app as part of this web release.
- Replace the Safari-only native banner metadata to avoid two download bars.
- Verify mobile, tablet, desktop, language switching, close persistence, native
  suppression, and the download handoff before deploying scoped files with backups.
