# V1.2 Accessibility Validation

## Scope

- VoiceOver
- Zoom
- Dynamic Type
- Reduced Motion
- Touch targets
- Focus
- Safe Area
- Color contrast
- Keyboard operation

## Test Devices

| Environment | Status | Notes |
| --- | --- | --- |
| iPhone SE size simulation, 320 × 700 | Automated | Playwright layout and keyboard regression |
| Standard mobile, 390 × 844 | Automated | Primary Playwright viewport |
| Large mobile, 430 × 932 | Automated | Header, modal and overflow regression |
| iPhone 14 Pro Max device | NOT TESTED | Record iOS version before manual validation |
| VoiceOver enabled | NOT TESTED | Requires device-assisted manual reading-order review |
| Larger Text enabled | NOT TESTED | Test Large, XL and XXL on device |
| Reduce Motion enabled | Automated / device NOT TESTED | CSS and JS behavior automated; device perception pending |

## Core Flows

- [x] Home browsing is keyboard operable and exposes the active style card.
- [x] Previous, next and random style controls expose descriptive labels.
- [x] Search has an explicit label and a named results region.
- [x] Search results open with keyboard activation.
- [x] Detail exposes one primary heading and named sections.
- [x] Saved state uses text, icon change, `aria-pressed` and a descriptive label.
- [x] Drawer traps focus, makes the background inert and restores focus.
- [x] Plus dialog is named, described, focus-contained and keyboard operable.
- [ ] Restore Purchases VoiceOver wording on a StoreKit sandbox device — NOT TESTED.
- [x] Image preview is a named dialog and restores focus when closed.
- [x] Export ratio buttons are native buttons and keyboard operable.
- [x] Back returns to the previous view without leaving hidden views focusable.

## Zoom And Text Resilience

- [x] Viewport does not disable user scaling.
- [x] WKWebView pinch zoom is enabled.
- [x] Core controls remain reachable at 200% visual zoom.
- [x] 320 × 700, 375 × 667, 390 × 844 and 430 × 932 layouts avoid document overflow at default scale.
- [x] 150% text sizing does not overlap the header, drawer or Plus actions in automated checks.
- [ ] iOS Large, XL and XXL Larger Text visual review — NOT TESTED.

## Reduced Motion

- [x] Smooth scrolling is replaced with automatic scrolling.
- [x] Card fly-out, rotation, spring and velocity-only swipe completion are disabled.
- [x] Drawer, modal, image and toast movement is removed; a short opacity change may remain.
- [x] Gesture controls remain available.
- [ ] Device-level Reduce Motion perception review — NOT TESTED.

## Touch Targets And Contrast

- [x] Core icon, navigation, card-action, filter and export controls are at least 44 × 44 CSS px.
- [x] Focus-visible styling remains visible against dark and paper surfaces.
- [x] Saved state is not communicated by color alone.
- [x] Disabled controls retain readable text contrast.
- [ ] Full WCAG contrast sampling across every generated style palette — NOT TESTED; manual review required.

## Manual VoiceOver Checklist

### Home

- [ ] Product name is announced once and clearly.
- [ ] Current style name and summary are understandable.
- [ ] Saved state is identifiable.
- [ ] Share, expression and detail actions are operable.
- [ ] Style changes produce a short, non-technical announcement.

### Search

- [ ] Search field name is clear.
- [ ] Search result region and result count are clear.
- [ ] A result can be opened.
- [ ] Returning places focus in a sensible location.

### Drawer

- [ ] Focus moves into the drawer.
- [ ] Background content is unavailable.
- [ ] Closing returns focus to the menu button.

### Plus

- [ ] Title, explanation and benefits read in a natural order.
- [ ] App Store price is understandable.
- [ ] Purchase and Restore Purchases labels are clear.
- [ ] Busy and pending states are announced.
- [ ] Closing restores focus.

### Detail

- [ ] Heading hierarchy is natural.
- [ ] Image descriptions are useful and not repetitive.
- [ ] Saved state is understandable.
- [ ] Locked-content explanation reads naturally.
- [ ] Export ratios can be selected.

### Image Preview

- [ ] Dialog title is announced.
- [ ] Image description is understandable.
- [ ] Close control is easy to find.

## Device Export Checklist

Run the following consecutively on a physical iPhone. All results remain NOT TESTED in this phase until recorded from hardware.

| Ratio | First duration | Repeated duration | Share sheet | Cancel recovery | Temp file cleanup | Memory warning / heat |
| --- | --- | --- | --- | --- | --- | --- |
| 9:16 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 4:5 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 1:1 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 16:9 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |

Also verify that no duplicate share sheet appears and that successive exports do not become progressively slower.

## Automated Result

- Validation date: 2026-07-17.
- Playwright: 67 / 67 passed.
- Initial style-image requests: 11, within the V1.2-B budget of 15.
- WebP resource count: 120.
- Physical-device VoiceOver, Larger Text, Reduce Motion perception and repeated export checks remain NOT TESTED.
