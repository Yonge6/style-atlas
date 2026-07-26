# Style Detail 2.0 Device QA

## Build

- Branch: `feature/v1.3-style-deep-dive`
- Source baseline: `52c2d355e721253a4ca98be2e2763f5b8222e265`
- App candidate commit: `676d351cf99e70892953dcddde69962cbb094513`
- Preview deploy commit: `31d5712bacba72e71441afbec3a2862ad38ec42e`
- Device: iPhone 14 Pro Max (`永歌14PM`)
- iOS: 26.5.2 (`23F84`)
- Install source: Xcode Debug direct install
- Date: 2026-07-26
- Install result: PASS
- Launch result: PASS after the device was unlocked
- Installed app identity: version 1.2, build 9

## 12 Style Review

| Style | Hero | Guided | Recognition | Profile | Everyday | Comparison | Reflection | Overall |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Swiss Style | PASS | PASS | PASS | PASS | NOT TESTED | PASS | NOT TESTED | NOT TESTED |
| Art Deco | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | PARTIAL | NOT TESTED | NOT TESTED |
| Impressionism | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Van Gogh | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 中国水墨 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | PASS | PARTIAL | NOT TESTED |
| 浮世绘 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 敦煌壁画 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 伊斯兰几何 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 西非织物纹样 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 墨西哥壁画 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 编辑插画 | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Solarpunk | PASS | PASS | PASS | PASS | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |

All 12 pilot Hero images were opened in one continuous physical-device session. Each image loaded with the expected aspect ratio and no persistent blank state. The full module matrix was not completed, so each untouched cell remains `NOT TESTED`. `PARTIAL` means the module opened, but the complete C2 return or persistence sequence was not proven.

## Reading Length

| Module | Chinese | English |
| --- | --- | --- |
| Summary | PASS (Swiss sample) | PASS (Solarpunk sample) |
| Memory Anchor | PASS (Swiss sample) | PASS (Solarpunk sample) |
| Recognition | PASS (Swiss sample) | PASS (Solarpunk sample) |
| Why It Feels | NOT TESTED | NOT TESTED |
| Everyday | NOT TESTED | NOT TESTED |
| Comparison | GOOD (Swiss sample) | NOT TESTED |
| Reflection Prompt | GOOD (Chinese Ink prompt only) | NOT TESTED |
| Accordion | NOT TESTED | NOT TESTED |

The requested full reading samples remain incomplete. Swiss Chinese and Solarpunk English Summary, Memory Anchor, Recognition, and Profile were `GOOD`; Chinese Ink, Dunhuang, West African Textile, Impressionism, Islamic Geometric, and Editorial Illustration were not read end to end. No copy was changed without a complete reading judgment.

## Accessibility

- VoiceOver: PARTIAL. VoiceOver and Caption Panel were enabled, and Xcode Accessibility Inspector reported no audit warnings on the foreground app. iPhone Mirroring mouse events bypass touch-style VoiceOver focus, and simultaneous Quick Nav traversal could not be reproduced by the control tool. Spoken order, current-stage-only reading, hidden Accordion focus, and focus return therefore remain `NOT TESTED` for Swiss Style, Chinese Ink, Dunhuang, and Solarpunk English.
- Larger Text: PARTIAL PASS. The native candidate originally ignored Dynamic Type. The candidate now bridges the system setting into the web view. Swiss Chinese was checked at the normal setting and at maximum standard text (at least XXL): the segmented navigation stayed usable, body content did not require horizontal scrolling, and the Guided close/previous/next controls remained visible after the Guided stage was made scrollable. Solarpunk English and the exact separate Large/XL ticks remain `NOT TESTED`.
- Reduce Motion: PASS for the checked Swiss path. Segmented navigation, Guided stage changes, and Swiss to Editorial Typography to Swiss return remained understandable with no sustained zoom, obvious fly-in, or flashing. Optional image focus and every Accordion state were not exhaustively traversed.
- Zoom (200%): NOT TESTED on the physical display. System Zoom was enabled, set to Full Screen, and configured to show while mirroring, but iPhone Mirroring did not expose the magnified interaction surface. Automated 200% coverage passes but is not counted as physical-device proof.
- Screen orientation: PASS by product decision. The iPhone app is intentionally portrait-only; landscape is not part of the V1.3 product requirement.

## Core Interaction Checks

- Comparison return, Swiss Style to Editorial Typography to Swiss Style: PASS using the in-app back control; the page returned near Comparison and did not go to Home or loop.
- Comparison return, Art Deco to Art Nouveau: PARTIAL. Related style opening passed. The synthetic edge drag did not deliver a reliable touch end, so iOS edge return and the complete return-to-Art-Deco assertion remain `NOT TESTED`.
- Chinese Reflection: PARTIAL. The field focused, the keyboard did not cover the clear/back controls, and the local save indicator reacted. iPhone Mirroring could not faithfully submit Chinese IME composition, so the required 50-character save, reopen, leave-time flush, restore, and clear/delete sequence remains `NOT TESTED`.

## Performance Observation

- 12-style continuous browsing: PASS; no progressive slowdown or crash observed
- Guided Overlay: PASS for the complete five-stage Swiss flow; additional openings produced no observed stall
- Comparison: Swiss, Editorial Typography, Art Deco, Art Nouveau, and Chinese Ink were opened with no observed progressive slowdown
- Wiki requests: NOT TESTED
- Image loading: PASS for all 12 pilot Hero images after normal lazy-load delay
- Heat: NOT TESTED
- Memory warning: no warning observed; Instruments measurement NOT TESTED
- Full requested 12-style scrolling plus exactly four Guided and four Comparison cycles: PARTIAL, not counted as a complete performance pass

## Issues

- Blocker: NONE RECORDED
- High: NONE RECORDED
- Medium: RESOLVED - the native WKWebView ignored system Dynamic Type; SwiftUI now bridges the current text scale into the native shell
- Medium: RESOLVED - at maximum standard text, the first Guided stage pushed the next action below the viewport; large-text Guided content now scrolls while keeping controls reachable
- Low: RESOLVED - manual scrolling could leave the previous detail-navigation item selected; the current section now updates from scroll position and was rechecked on device

## Decision

- Detail architecture ready for expansion: NO
- Ready to enter V1.3-D: NO
- Ready to merge main: NO
- Ready to expand additional guides: NO

Blocker and High remain zero, and the XXL Guided layout issue is fixed. The strict expansion gate is still not met because the core spoken VoiceOver path, physical 200% Zoom exit path, complete Art Deco return, and Chinese Reflection save/restore/clear path lack physical-device proof.

## Additional Device Evidence

- Guided Looking: opening safe area, close control, five-stage progression, previous/return controls, and final state were usable.
- English Solarpunk: Hero, Guided Looking opening state, Recognition, and Profile entry were readable; Everyday and Comparison remain `NOT TESTED`.
- Detail navigation: tapping `懂` reached the intended content without sticky-header overlap.
- Manual-scroll navigation: after the fix, returning to the Hero region changed the current item back to `看`.
- Preview badge: absent from the installed native bundle.
- Crash, persistent white image, and memory-warning dialog: not observed.
- Preview URL: `https://style-atlas.wonderelian.com/preview/v1.3/`
- Preview deploy: PASS at `31d5712bacba72e71441afbec3a2862ad38ec42e`; the Preview badge and `noindex,nofollow` are present.
- Preview candidate hashes: deployed `game.js` and `styles.css` match the app candidate source.
- Production isolation: the deploy changed only `preview/v1.3/game.js` and `preview/v1.3/styles.css`; the production-root `game.js` hash remained unchanged between the previous and current `gh-pages` commits.

## Automated Regression

- Playwright: 185 / 185 passed
- npm audit: 0 vulnerabilities
- JavaScript syntax checks: PASS
- iOS resource sync/integrity: PASS, 129 files, WebP = 120
- Home image requests: within the existing <= 15 gate
- Debug generic build: PASS
- Release generic build: PASS
- Signed Debug device build/install/launch: PASS
- StoreKit: unchanged
- Version / Build: 1.2 / 9
- Archive: not generated
- App Store/TestFlight build: not uploaded

## Product Orientation Decision

Portrait-only is an intentional product decision. Style Atlas is currently positioned as a phone-first, vertically browsed art-style atlas. Debug and Release both declare `UIInterfaceOrientationPortrait`; the earlier C2 description of portrait-only support as a Medium defect is withdrawn.
