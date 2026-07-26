# Style Detail 2.0 Validation

## Candidate

- Branch: `feature/v1.3-style-deep-dive`
- Theme: 看懂一种美 / Understand a Style
- Release status: Development prototype
- iOS 1.2 Build 9 release baseline remains frozen

## 120 Detail Pages

- [x] 120 个详情页均可渲染
- [x] 每页只有一个 `h1`
- [x] 没有 `undefined`、空标题或空列表
- [x] Hero 主图只默认出现一次
- [x] 本地主图不被 Gallery / Example 重复
- [x] 图片失败时比例和操作保持稳定

## 12 Enhanced Guides

- [x] 12 个试点 guide 全部存在
- [x] guide styleId 全部有效
- [x] 每个 guide 有 3 个 observe
- [x] 每个 guide 有 4 个 profile
- [x] profile level 全部在 1-5
- [x] 每个 guide 有 3-5 个 feelingWords
- [x] 每个 guide 有 4 个 everydayLife
- [x] 每个 guide 有 2 个有效 comparison
- [x] 中英文字段完整
- [ ] 内容已人工审核

人工内容审核状态：首轮作者检查完成；独立文化语境与英文编辑审核 PENDING

## Guided Looking

- [x] 所有风格均有入口
- [x] 五阶段可以完整前进和返回
- [x] 第一阶段不提前显示全部观察答案
- [x] dialog / aria-modal / label 语义正确
- [x] 焦点进入、循环、Escape 和恢复正确
- [x] 背景 inert
- [x] Reduced Motion 取消明显位移
- [x] 免费用户可用
- [x] 不发送购买或其他 Native 消息

## Fallback

- [x] 非试点使用现有数据生成基础体验
- [x] lookFor 不足时可由 visualFeatures 补齐
- [x] 无人工 profile 时不伪造刻度
- [x] relatedStyles 只展示已有摘要
- [x] 不运行 AI 或复杂关键词猜测

## Reflection

- [x] 输入最多 300 字符
- [x] 自动本地保存
- [x] 页面离开或刷新后保留
- [x] 切换语言后保留
- [x] 清除按钮正常
- [x] 损坏 JSON 自动恢复
- [x] localStorage 不可用时页面正常
- [x] 内容不上传、不写日志

## Accessibility

- [x] 分段导航有明确名称
- [x] Accordion 使用 button、aria-expanded 和 aria-controls
- [x] Profile level 与说明具备可读的 aria-label
- [x] 关键按钮至少 44 × 44
- [x] 200% 自动化缩放下弹层可通过键盘关闭
- [ ] Large / XL / XXL 真机不裁切
- [x] Guided Overlay 可关闭且关闭后焦点恢复
- [x] 隐藏区块不能获得焦点

## Performance

- [x] 首页风格图片请求不超过 15（390 × 844 实测 10）
- [x] 详情首次进入不请求全部相关图片
- [x] decode cache 不超过 7
- [x] 旧 Wiki 请求在切换风格或离开详情时取消
- [x] iOS `externalGalleryEnabled=false`
- [x] WebP 数量为 120

## StoreKit and Export Regression

- [x] Product ID 未修改
- [x] 购买与恢复购买消息回归通过
- [x] 免费导出结果回归通过
- [x] Plus 四比例高清无水印导出回归通过
- [x] 导出状态机保持互斥

## Automated Result

- Playwright: 183 / 183 passed
- Node syntax: PASS
- npm audit: 0 vulnerabilities
- iOS resource check: PASS, WebP count 120
- Debug build: PASS
- Release build: PASS

## Manual Review

- 12 个增强 guide 的中英文内容：PENDING
- iPhone 14 Pro Max Debug 安装与启动：PASS
- 12 个试点 Hero 连续浏览：PASS
- 12 个试点全模块真机矩阵：NOT TESTED
- VoiceOver 真机流程：NOT TESTED
- Large / XL / XXL 真机布局：NOT TESTED
- 200% 缩放真机操作：NOT TESTED
