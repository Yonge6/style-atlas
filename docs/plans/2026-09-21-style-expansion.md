# Style Atlas 132 styles implementation plan

**Goal:** Ship the approved 12-style expansion, clearer entry types and reference provenance, preserving iPad and direct Photos export work.

**Architecture:** Keep the canonical catalog in data-styles.js. A focused data-expansion.js module supplies bilingual editorial content and complete guides before game.js loads. Ship identical web resources offline in the app and regenerate the native daily catalog and widget thumbnails.

**Tech Stack:** Vanilla JavaScript, Playwright, SwiftUI/WKWebView, StoreKit, Photos, Xcode, GitHub Pages.

## Execution checklist

1. Add a failing corpus validator for 132 unique entries, 12 complete bilingual guides, known comparison targets and source links.
2. Append 12 catalog rows; implement the content module and entry-type/provenance UI. Preserve current subscription offer terms and all existing content.
3. Generate original educational covers; inspect each, convert to WebP and widget JPEG. Retain generated originals and record prompts and mappings.
4. Update visible counts and resource loaders. Regenerate DailyStyles.json and sync offline resources. Run the corpus check, iOS resource check, SEO check and UX suite.
5. Build native iPhone/iPad targets. Verify iPad layout and Photos success/denial handling without claiming a mocked save is a physical-device save.
6. Commit only scoped files, excluding pre-existing docs/growth. Publish root web assets to gh-pages while retaining download routes and preview/archive resources. Independently read back production assets and browser UI.
7. Inspect current App Store state before choosing version/build and submission operation. Authentication requires user login. Upload and submit if available; report exact externally read-back state, not an inferred approval.

## Acceptance commands

- `node scripts/validate-expansion.mjs`: 132 catalog rows and 12 complete new guides.
- `npm run test:ios-features` and `bash iOS/StyleAtlas/scripts/check-ios-resources.sh`: catalog, covers, thumbnails and device support.
- `npm run test:seo` and `npm run test:ux`: no regressions.
- Xcode simulator and release archive builds: app + widget extension, correct version metadata.

## Boundaries

No change to the paid introductory offer or existing trial-removal work. Do not force-push, alter unrelated growth drafts, claim historical authenticity for generated images, or report App approval before Apple confirms it.
