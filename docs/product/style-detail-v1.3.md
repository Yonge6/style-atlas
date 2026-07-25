# Style Detail 2.0

## Product Goal

详情页从连续堆叠资料，升级为面向普通用户的审美理解体验。用户离开页面前，应能回答：先看哪里、怎样识别、为什么产生这种感受、生活中在哪里遇见、如何与相似风格区分，以及怎样表达自己的偏好。

## Information Architecture

1. Hero
2. 带我看懂这张图
3. 一眼识别
4. 审美气质
5. 为什么这样会好看
6. 生活中的同一种美
7. 相似但不同
8. 可选的第一感觉记录
9. 创作与应用
10. 深入了解
11. 相似风格

顶部使用“看 / 懂 / 用 / 创作 / 深入”轻量分段导航。它负责跳转，不承担课程进度或完成状态。

## Guided Looking

“带我看懂这张图”是所有用户可用的五阶段看图引导：

1. 先别急着分析，只观察第一反应。
2. 聚焦第一个可见线索。
3. 转向第二个画面位置。
4. 感受整体情绪或节奏。
5. 用一句记忆锚点收束并返回详情。

引导不计时、不答题、不记录完成天数，也不触发购买或 Native Bridge。弹层使用 modal dialog 语义、焦点约束、背景 inert、Escape 关闭和触发点焦点恢复；Reduced Motion 下取消明显位移动画。

## Enhanced Data Model

`data-aesthetic-guides.js` 暴露 `window.STYLE_AESTHETIC_GUIDES`。完整 guide 包含：

- `openingQuestion`
- 3 个 `observe`
- 4 个 1-5 级 `profile`
- 3-5 个 `feelingWords`
- 4 个 `everydayLife`
- 2 个 `comparisons`
- `reflectionPrompt`

V1.3-A 的完整试点为 Swiss Style、Art Deco、Impressionism、Van Gogh、中国水墨、敦煌壁画、浮世绘、伊斯兰几何、非洲部落图案、墨西哥壁画、编辑插画和 Solarpunk。

## Fallback

其余风格不运行算法猜测，也不伪造 profile：

- opening：优先 `curatorNote`，否则 `memoryAnchor`
- observe：`lookFor` 前三项，不足时补 `visualFeatures`
- feeling words：`tags` 前四项
- everyday：使用 `useCases`
- comparisons：`relatedStyles` 前两项，只展示已有摘要
- profile：显示“分析正在完善中”

Fallback 必须避免 `undefined`、空标题、空列表和虚构差异。

## Life Aesthetics

完整 guide 从家居、穿搭、摄影和日常物件四个角度提供可执行的观察方法。内容不做商品推荐，不把审美写成标准答案，也不只服务专业设计应用。

## Similar Styles

完整 guide 明确给出相似点与最关键区别，并可进入相关详情。返回操作优先回到上一个详情。Fallback 只展示已有相关风格和摘要，不编造区别。

## Reflection

“我对它的第一感觉”完全可选，最多 300 字符，自动保存到 `styleAtlasReflectionsV1`。数据只保存在本地，不上传、不记录日志。损坏 JSON 或 localStorage 不可用时，页面继续正常工作；切换语言不会清除输入。

## Free and Plus

新增的审美观察、Guided Looking 和 Reflection 对所有用户免费。原有 Plus 边界保持不变：完整专业档案、完整风格表达词、无限收藏及高清多比例无水印导出继续沿用既有权限逻辑。StoreKit、Product ID、商品价格和导出结果不在本阶段变更。

## Image and Performance Rules

- Hero 是详情页唯一默认本地主图。
- 相同 `style.image` 不在 Gallery 或 Example 中重复。
- 外部 Wiki 图片是可选附加信息，保持 lazy load；iOS 离线壳继续禁用。
- Guided Looking 复用主图和现有图片管线。
- 解码缓存仍不超过 7 张。
- 离开详情或切换风格时取消旧 Wiki 请求。

## Expansion Plan

V1.3-B 先对试点内容做人工审核，再逐批扩展。是否覆盖全部 120 个完整 guide，取决于双语质量、事实核查和文化语境审核，不使用运行时 AI 批量补齐。

