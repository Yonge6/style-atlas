# V1.3 Style Detail UI Freeze

## Candidate Baseline

- Branch: `feature/v1.3-editorial-audit`
- Original editorial review baseline: `b0f641528b6c8eb878c6d2c834a1aa9b6252aa7d`
- App/UI candidate commit: `6e2e6fdc3b4b5bc01499a883ff7d72375d86747a`
- Documentation HEAD: this document's containing commit; report the exact hash after commit
- Preview deploy commit: `28f19c554b450c7f3262fefdd81e8cb161b63c9a`
- Product position: V1.3 RC UI Candidate
- UI Freeze: YES

## UI Polish Scope

1. Changed the three recognition cards in the Understand section to a dark surface while retaining the light text system.
2. Added arrows, visible borders, current-state styling, focus treatment and pressed feedback to the five detail-section navigation controls.
3. Integrated the Create heading and introduction into the Style Expression module.
4. Restored Style Expression and Save & Export as two independent cards with complete rounded corners.
5. Added desktop mouse drag scrolling to the Web detail view without changing wheel, trackpad, touch, native-shell or interactive-control behavior.
6. Added the required scroll offset so the integrated Create heading remains visible below the top bar when opened directly.
7. Synchronized the changed Web files into the iOS bundled resources.

## Modified Files

- `game.js`
- `styles.css`
- `iOS/StyleAtlas/Resources/Web/game.js`
- `iOS/StyleAtlas/Resources/Web/styles.css`
- `scripts/audit-aesthetic-guides.mjs`
- `tests/ux.spec.js`
- `docs/qa/style-detail-ui-freeze-v1.3.md`
- `docs/review/v1.3-product-owner-signoff.md`

## Protected Boundaries

- Guide copy changed: NO
- Product-owner signoff status changed: NO
- StoreKit changed: NO
- Product ID changed: NO
- Purchase or restore changed: NO
- Native Bridge changed: NO
- Export behavior changed: NO
- Version / Build: 1.2 / 9
- iPhone orientation: portrait only
- Merge main: NO
- Archive: NO
- Build upload: NO
- Production Pages root replacement: NO

## Verification

- `npm ci`: PASS
- Playwright: PASS, 264 / 264
- npm audit: PASS, 0 vulnerabilities
- Requested JavaScript syntax checks: PASS, 6 / 6
- Guide / fallback: PASS, 72 / 48
- Poster enhanced coverage: PASS, 20 / 20
- Guide copy fingerprint: PASS, 0 unapproved changes
- Product-owner status: PASS, 0 / 36 complete and 36 NOT REVIEWED
- Home image requests: PASS, 11 / 15
- Root / iOS WebP: PASS, 120 / 120
- Web / iOS resource sync: PASS, 8 / 8 required Web files byte-identical
- iOS resource integrity: PASS, 129 bundled files
- Debug generic iOS build: PASS
- Release generic iOS build: PASS
- Isolated Preview: PASS
- Preview source manifest: PASS, `feature/v1.3-editorial-audit@6e2e6fdc3b4b5bc01499a883ff7d72375d86747a`
- Preview badge and `noindex,nofollow`: PASS
- Preview online Guide / fallback / poster: PASS, 72 / 48 / 20 of 20
- Preview online source bytes: PASS, 9 / 9 checked files match the App/UI candidate
- Production Pages root: unchanged

## Manual UI Review

- Chinese and English recognition cards are readable on the dark surface.
- Computed contrast against the card surface is 14.42:1 for the heading and 11.35:1 for body text.
- All five section controls retain a 44px minimum height and expose border, current, focus and pressed feedback.
- Arrows remain secondary to the section labels.
- Style Expression retains the complete prompt and negative-prompt content.
- Style Expression and Save & Export render as separate 14px-radius cards.
- The 320px compact viewport has no page-level horizontal overflow.
- Guided Looking, Reflection, Comparison, purchase/restore and every export ratio pass the unchanged regression suite.

## Freeze Rule

During the 36-page product-owner signoff, the UI remains frozen by default. UI work may reopen only for:

- unreachable content;
- clipped text;
- unusable click or tap targets;
- an obvious contrast problem;
- the keyboard covering a critical action;
- inability to complete a core flow.

Pure style preference is not a reason to reopen this V1.3 UI pass.
