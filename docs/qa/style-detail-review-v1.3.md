# Style Detail 2.0 Review Suite

## Scope

This local review suite is for V1.3-B product QA only. It is not App Store screenshot material and is not part of the production GitHub Pages release.

## Review Mode

Open detail review states with:

- `?review=detail`
- `?review=detail&style=swiss-style`
- `?review=detail&style=ukiyo-e&lang=en`
- `?review=detail&style=solarpunk&section=compare`
- `?review=detail&style=art-deco&guided=2`

Invalid `style` falls back to the daily style. Invalid `section` and `guided` values are ignored. Review Mode adds no visible controls to the normal user interface.

## Screenshot Output

Local screenshot directory:

`assets/review/v1.3-style-detail/`

The directory is ignored by Git because screenshots are inspection artifacts.

## Styles

Capture the six visually distinct styles below:

- `swiss-style`
- `impressionism`
- `chinese-ink-painting`
- `dunhuang-mural`
- `african-tribal-pattern`
- `solarpunk`

## Languages

Capture each state in:

- Chinese: `lang=zh`
- English: `lang=en`

## Viewports

Capture each state at:

- `390 x 844`
- `430 x 932`

## Required States

For each style, language, and viewport, capture:

- Hero: `?review=detail&style={style}&lang={lang}&section=see`
- Recognition and profile: `?review=detail&style={style}&lang={lang}&section=understand`
- Everyday life and comparison: `?review=detail&style={style}&lang={lang}&section=compare`
- Guided Looking second observation: `?review=detail&style={style}&lang={lang}&guided=2`

## Manual Content Review Notes

Chinese review focus:

- Opening questions sound conversational and observable.
- The three observation cards cover different visual dimensions.
- Copy avoids overusing `高级`, `精致`, `独特`, `强烈`, and `视觉冲击`.
- Cultural traditions are not reduced to decorative labels or a single unified style.
- Religious and regional visual languages are described through observable structure, material, rhythm, and context.

English review focus:

- Copy reads like a natural museum guide or popular art book.
- It avoids repeated `Notice`, `Look at`, `Strong`, and `Visual` phrasing.
- Names of regions, cultures, and art forms remain accurate.
- English meaning matches the Chinese guide while using natural phrasing.

## Current Manual Status

- Browser screenshot generation: NOT TESTED
- iPhone 14 Pro Max Debug install: NOT TESTED
- Chinese 12-style manual pass: reviewed in source, pending device pass
- English 12-style manual pass: reviewed in source, pending device pass
- Reduce Motion, 200 percent zoom, and VoiceOver: automated coverage added; device pass NOT TESTED
