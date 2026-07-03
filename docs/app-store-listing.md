# App Store Listing Package

## App Names

Chinese app name:
虾子曰 Style Atlas

English app name:
Xiazishuo Style Atlas

Product naming rule:
- 虾子曰 is the parent brand / IP.
- Style Atlas is the product name.
- 风格图鉴 is the Chinese explanatory name.

## Chinese Subtitle Candidates

1. 每天 3 分钟提升审美
2. 口袋里的视觉风格图鉴
3. 建立你的审美词库
4. 120 种全球视觉风格
5. 设计师与 AI 创作者的灵感图鉴

## English Subtitle Candidates

1. A pocket visual style atlas
2. Learn one visual style a day
3. Build your taste vocabulary
4. 120 global visual styles
5. Inspiration for creators and designers

## App Store Chinese Description

虾子曰 Style Atlas 是一本装进口袋里的视觉风格图鉴。

每天 3 分钟认识一种风格，慢慢建立自己的审美词库。它不是替你生成图片，而是帮助你知道什么好看、为什么好看、以及如何更准确地表达好看。

应用收录 120 种全球视觉风格，覆盖经典海报与平面设计、西方绘画流派、艺术大师视觉语言、东方与亚洲经典视觉、民俗与地域风格、动画漫画、插画出版、数字时代视觉风格等方向。

每个风格都整理为适合手机阅读的风格卡片，包含名称、简介、视觉特征、历史来源、形成原因、识别方法、适用场景、代表案例和风格表达词。你可以通过每日推荐轻松学习，也可以搜索、浏览、收藏自己喜欢的风格。

适合设计师、AI 创作者、品牌人、内容创作者、设计学生和艺术爱好者使用。无论你在做海报、品牌视觉、插画、社媒封面、内容选题，还是只是想提升审美表达，Style Atlas 都可以成为你的随身风格资料库。

免费版可以浏览全部风格封面、查看部分完整风格档案、使用基础搜索、收藏风格，并保存带水印的普通清晰度风格卡片。

Style Atlas Plus 未来将解锁全部 120 个完整风格档案、无限收藏、高清无水印保存、多比例导出、离线查看和后续小更新。

## App Store English Description

Xiazishuo Style Atlas is a pocket visual style atlas.

Learn one visual style a day and build your own taste vocabulary. It is not just about generating images. It helps you understand what looks good, why it works, and how to express visual ideas more clearly.

The app includes 120 global visual styles across poster design, graphic design, Western painting, master visual languages, Eastern and Asian classics, folk and regional visuals, animation, comics, illustration, publishing, and digital-era aesthetics.

Each style is organized into a mobile-friendly style card with its name, summary, visual traits, historical origin, reasons behind the look, recognition tips, use cases, representative references, and style expression notes. You can learn through the daily pick, browse by category, search for styles, and save the ones you want to remember.

Style Atlas is designed for designers, AI creators, brand builders, content creators, design students, and art lovers. Whether you are working on a poster, brand identity, illustration, social cover, campaign direction, or simply want to improve your visual vocabulary, Style Atlas can become your personal style archive.

The free version lets you browse all style covers, view selected full style archives, use basic search, save styles, and export standard watermarked style cards.

Style Atlas Plus will unlock all 120 full style archives, unlimited saved styles, HD watermark-free export, multi-ratio export, offline viewing, and future minor updates.

## Keywords

Chinese keywords:
审美,设计,风格,海报,插画,艺术,绘画,灵感,视觉,AI

English keywords:
design,style,visual,poster,art,illustration,aesthetic,inspiration,painting,creative

## Category Suggestions

Primary category:
Graphics & Design

Alternative categories:
- Education
- Reference

## Age Rating Suggestion

Recommended age rating:
4+

Note:
If the app later includes external links, user-generated content, social features, or dynamic network content, the age rating and review answers should be re-evaluated.

## In-App Purchase Design

IAP product 1:

Product ID:
`xiazishuo_style_atlas_plus_lifetime`

Display name:
Style Atlas Plus

Chinese display name:
虾子曰 Style Atlas Plus

Type:
非消耗型购买 / Non-consumable

Recommended price:
- Regular price: $7.99 / ¥48
- Launch price: $3.99 / ¥28

Unlocks:
- 全部 120 个完整风格档案
- 无限收藏
- 高清无水印保存
- 多比例导出
- 离线查看
- 后续小更新

English unlock list:
- All 120 full style archives
- Unlimited saved styles
- HD watermark-free export
- Multi-ratio export
- Offline viewing
- Future minor updates

Implementation note:
This document only defines the IAP product plan. The current web prototype does not connect to real IAP, Stripe, or any payment service.

## App Store Screenshot Copy

Chinese 6 screenshots:

1. 每天 3 分钟提升审美
2. 120 种全球视觉风格
3. 看懂风格为什么好看
4. 建立你的审美资料库
5. 保存好看的风格卡片
6. 解锁完整风格档案

English 6 screenshots:

1. Learn one visual style a day
2. 120 global visual styles
3. Understand why each style works
4. Build your taste archive
5. Save beautiful style cards
6. Unlock the full style archive

Screenshot kit route in the current prototype:
- `#screenshots`
- `?screenshots=1`

## Recommended iOS App Packaging

Recommended first version:

- Use `WKWebView` to package the current static site.
- Bundle static resources locally to avoid network dependency.
- Keep the app usable offline.
- Store image assets in the local app bundle.
- Keep saved styles in `UserDefaults` or the existing `localStorage` bridge for the first version.
- Use StoreKit 2 later for the Plus non-consumable IAP.
- Map the existing Plus access state to the StoreKit purchase state.
- Keep the current web permission helpers as the conceptual model:
  - `hasPlusAccess()`
  - `canViewFullStyle(style)`
  - `isStyleLocked(style)`
  - `canExportHighRes()`

## Do Not Do In This Phase

- Do not connect real IAP.
- Do not connect Stripe.
- Do not add a backend.
- Do not add login.
- Do not add analytics SDKs.
- Do not change the 120 style data.
- Do not generate final App Store screenshot image files.

