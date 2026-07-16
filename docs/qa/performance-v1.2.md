# V1.2 Performance Validation

## Baseline

- Base commit：`8197420`
- Test viewport：390 × 844
- Test device：iPhone 14 Pro Max - NOT TESTED in this phase
- Network：
  - Local bundled resources
  - GitHub Pages
- WebP count：120

## Metrics

| Metric | Before V1.2-B | After V1.2-B |
| --- | --- | --- |
| Home initially visible style-image requests | 29 requests in the pre-change Playwright baseline | 11 requests at 390 × 844 after 500 ms |
| Home requests all 120 images | No, but no explicit request budget existed | No; automated budget passes at 11/120 |
| Current-card display time | NOT TESTED | NOT TESTED |
| Ten continuous swipes show blank cards | NOT TESTED | PASS in Playwright; every live card completed with non-zero natural width |
| Search results open time | NOT TESTED | NOT TESTED |
| Saving rebuilds the whole detail page | Yes; `toggleSaved()` called `renderDetail()` | No; detail root identity and scroll position are preserved |
| 1:1 export time | NOT TESTED | NOT TESTED |
| 16:9 export time | NOT TESTED | NOT TESTED |
| Repeated export starts only one task | No explicit single-flight guard | PASS in Playwright; rapid multi-ratio clicks emit one Native message |
| Native temporary file is cleaned after share closes | Completion and no-presenter paths existed; duplicate and cancellation lifecycle was incomplete | Implemented for completion, cancellation, failure, no presenter, termination and deinit; device lifecycle test NOT TESTED |

## Regression Budgets

- Home must not request all 120 style images; automated budget is at most 15 style-image requests after initial stabilization.
- The decode cache must not retain more than 7 entries.
- The current, previous, and next deck images must be decoded before the first completed swipe.
- At most one Wiki request, one Web export task, and one Native share sheet may be active.
- Saving from detail must preserve the detail root and scroll position.
- Export sizes remain 1080 × 1920, 1200 × 1500, 1440 × 1440, and 1920 × 1080.

## Manual Checks

- [ ] iPhone 14 Pro Max: current card display time recorded
- [ ] iPhone 14 Pro Max: ten continuous swipes contain no blank card
- [ ] iPhone 14 Pro Max: 1:1 export time recorded
- [ ] iPhone 14 Pro Max: 16:9 export time recorded
- [ ] Native share cancellation removes the temporary file
- [ ] Native share completion removes the temporary file
- [ ] Native share failure/no-presenter removes the temporary file

Items without repeatable instrumentation remain `NOT TESTED`; no timing or
memory number should be inferred from automated functional tests.

## Automated Result

- Playwright：39/39 passed
- Home style-image requests：11
- Decode cache after home stabilization：5; hard maximum：7
- Ten continuous swipes：PASS
- Lazy/async/low-priority offscreen results：PASS
- Concurrent decode promise reuse：PASS
- WebP fallback limit and stable placeholder：PASS
- Detail save without DOM reconstruction or scroll reset：PASS
- Wiki cancellation and stale-result rejection：PASS
- Single-flight export and control recovery：PASS
- Export dimensions：PASS for all four ratios
- 120-item saved list rendering and scrolling：PASS
