# Product usage release — 2026-10-01

## Deployed and verified

- H5/Web: https://style-atlas.wonderelian.com/
- Dashboard: https://ops.wonderelian.com/#usage → 艺术风格图鉴, separate Web/H5 and iOS tabs.
- Scoped production release r3: 10 website files, 4 ops files. Nginx syntax and public HTTPS file hashes verified after deployment. No pricing or App Store submission changes.
- Opt-in consent with equally available decline, and a menu setting to withdraw/reopen consent. No tracking script before permission. The compact black/gold consent UI follows the product's existing design.
- Measures visits, detail reading and foreground active time, guided learning, favorites, reflection-save counts, search usage/result counts, filters, sharing/export outcomes, download entry clicks and membership operations. No reflection/search text or transaction identifiers are sent.
- Hidden/inactive time is excluded; long delayed timer samples are dropped. H5 and native transports are mutually exclusive. QA uses `?analytics=off` or an intercepted transport, not synthetic production ingestion.
- Style IDs map to GA4 built-in `content_id` / Data API `contentId`; no new custom dimension is required. Reports isolate the exact web hostname or dedicated iOS stream. Missing/empty observations remain unavailable, not fabricated zeroes, installs, retention or revenue.
- Actual Data API readback for 2026-09-03 through 2026-09-30 returned no new `atlas_v1_` events. Historic H5 evidence is retained separately. New data awaits real consenting users and processed daily reporting.

## Verification

- Node analytics unit tests: 2 passed.
- Analytics browser integration tests: 4 passed (permission, withdrawal/reopen through actual menu controls, production exclusions/native separation).
- Optional real Google SDK wire test: passed with `ATLAS_WIRE_QA=1`; external collection requests were intercepted, not delivered to production.
- Final full UX run: 356 passed, 1 optional external SDK wire test skipped (that test passed separately with explicit opt-in). The native consent expectations were updated. Run log: `/tmp/style-atlas-usage-final-tests.log` (temporary local evidence).
- Native catalog/resource, SEO and expansion validators passed; 132-style resources preserved.
- Mobile production consent/menu and ops tabs inspected at 390 px with no horizontal overflow.
- Firebase package resolution and standalone Swift module compilation passed. Full App build did **not** pass: Xcode reports no available simulator runtimes for asset compilation. No new archive was uploaded or installed.

## Native activation still pending

The logged-in account was confirmed as `hustyy986@gmail.com`. Firebase project `yixiu-meditation` still denies project access; this is a project permission issue, not a different login.

1. A project owner must grant this account access, then register a distinct Style Atlas iOS application for `com.xiazishuo.styleatlas` (App Store ID `6787447019`). Do not copy another app's Firebase configuration.
2. Add the generated `GoogleService-Info.plist` as a bundle resource and validate the bundle ID. Configure the dedicated numeric stream as `styleAtlasIosStreamId` in the private ops analytics config (or `STYLE_ATLAS_IOS_STREAM_ID`); verify stream/property association through an actual report.
3. Install the missing Xcode runtime/platform components, build and test the complete App, review privacy manifests/App Store privacy declarations, then distribute a new App Store version under release authorization. Existing installed builds do not gain telemetry from the website release.
4. Native collection stays off without valid configuration/consent, in Debug/simulator, and for non-production AppTransaction environments (including TestFlight).

## Rollback evidence

Server backups (preserved, no broad cleanup):

- Initial H5: `/srv/wonderelian/backups/atlas-usage-20261001-style-atlas`
- Menu/article correction: `/srv/wonderelian/backups/atlas-usage-20261001-style-atlas-r2`
- Final Google command serialization correction: `/srv/wonderelian/backups/atlas-usage-20261001-style-atlas-r3`
- Ops: `/srv/wonderelian/backups/atlas-usage-20261001-ops`

Use exact allowlisted file restoration after reviewing each backup; never recursively replace the site. Release tooling checks current baseline hashes before modifying live files.
