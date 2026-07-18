# TestFlight Validation｜虾子曰艺术风格图鉴 1.2 Build 9

## Build

- Version：1.2
- Build：9
- Install source：TestFlight
- Source base：`584a9748b192fa4be59e27eaf05eadfc12fe7ef3`
- Release candidate commit：`ae08b58`
- Device：iPhone 14 Pro Max（永歌14PM）
- iOS：26.5.2（23F84）
- Tester：袁勇 / Codex assisted QA
- Test date：2026-07-18

## Upload Status

- Archive：SUCCEEDED
- App Store Connect upload：SUCCEEDED on 2026-07-18 at approximately 07:14 CST
- Last uploader status：`Uploaded StyleAtlas` / `EXPORT SUCCEEDED`
- Processing completion：COMPLETED
- TestFlight installation：PASSED（Version 1.2 / Build 9）

Build 9 supersedes Build 8 before App Review submission. It includes the refreshed App Icon, the latest synchronized offline Web resources, full-size public example previews, style-overview copy, refined detail share cards, and pure-image Plus export. Build 8 remains valid upload history and was not marked failed.

## Installation

- [x] Build 在 TestFlight 中 Processing 完成
- [x] 安装成功
- [ ] 升级安装保留收藏
- [x] 全新安装正常
- [x] 启动无白屏
- [x] 120 个本地 WebP 资源随包存在，已抽查首页、详情及收藏图片
- [x] 删除前备份并在重装后恢复 5 个本地收藏

## Core Regression

- [x] 首页浏览
- [ ] 左右滑动
- [x] 随机风格
- [x] 搜索
- [x] 分类
- [x] 收藏
- [x] 详情
- [x] 中英文切换
- [x] Plus
- [x] 分享
- [ ] 图片预览
- [ ] 离线浏览

左右箭头切换已通过；物理触控左右滑动未在本轮镜像操作中可靠验证，因此“左右滑动”保持未勾选。

## StoreKit Sandbox

TestFlight uses the Sandbox IAP environment.

- [x] 商品成功加载
- [x] 显示 Apple 返回价格（中国大陆 `¥1.00`）
- [x] 取消购买正常
- [x] Sandbox 购买成功
- [x] Plus 立即生效
- [x] 重启后 Plus 保留
- [x] 删除并从 TestFlight 重装后，`Transaction.currentEntitlements` 自动恢复 Plus
- [ ] 手动点击恢复购买（自动恢复后界面已显示 Plus 解锁，不再提供恢复按钮）
- [ ] 连续点击不会重复支付
- [ ] Pending 状态可恢复
- [x] 中文界面无 Native 英文技术错误

第一次冷启动曾长时间停留在“正在载入 App Store 价格”，一次购买点击未拉起支付面板；第二次冷启动约 15 秒后成功显示 `¥1.00`，随后取消、重试和购买均正常。该现象记录为 Medium 风险，提交审核前应再做一次干净网络环境的商品加载复测。

## Accessibility

### VoiceOver

- [ ] 产品名只自然朗读一次
- [ ] 当前风格名称和摘要清楚
- [ ] 收藏状态清楚
- [ ] 搜索可用
- [ ] Drawer 顺序自然
- [ ] Plus 顺序自然
- [ ] 价格、购买和恢复按钮清楚
- [ ] 详情标题层级自然
- [ ] 图片预览可关闭
- [ ] 导出比例可选择
- [ ] 弹层关闭后焦点恢复

### Larger Text

- [ ] Large
- [ ] XL
- [ ] XXL
- [ ] Header 不重叠
- [ ] 中文品牌不截断关键内容
- [ ] Drawer 可滚动
- [ ] Plus 按钮可达
- [ ] 导出按钮可达
- [ ] 重要文字未被裁切

### Reduce Motion

- [ ] 首页切换没有明显飞卡
- [ ] Drawer 没有大幅位移
- [ ] Modal 没有弹簧动画
- [ ] 页面不平滑滚动
- [ ] 功能仍可正常使用

### Zoom

- [ ] 双指缩放可用
- [ ] 可放大到至少 200%
- [ ] 放大后按钮可达
- [ ] 页面可以合理滚动
- [ ] 不出现无法关闭的弹层

## Four-Ratio Export

Run two consecutive rounds on a physical device.

| Ratio | Round 1 | Round 2 | Share | Cancel recovery | Temp cleanup | Heat / memory |
| --- | --- | --- | --- | --- | --- | --- |
| 9:16 | PASS | PASS | PASS | PASS | PASS | No issue observed |
| 4:5 | PASS | PASS | PASS | PASS | PASS | No issue observed |
| 1:1 | PASS | PASS | PASS | PASS | PASS | No issue observed |
| 16:9 | PASS | PASS | PASS | PASS | PASS | No issue observed |

- [x] 无重复分享面板
- [x] 连续导出没有持续变慢
- [x] 用户取消后按钮恢复
- [ ] 导出失败后按钮恢复
- [x] 测试期间未观察到内存警告
- [x] 测试期间未观察到异常明显发热
- [x] 分享面板关闭后 App 临时目录 PNG 数量为 0

四种比例各连续执行两轮。系统分享面板每次只出现一个，取消后导出按钮恢复。抽取的 16:9 文件为 1920 × 1080，SHA-256 为 `bcf1cc296fa1e91e3c205d40664ca6136bde452b7ca66927bedec5141b793074`，视觉检查为无文字、无标签、无水印纯图。未使用 Instruments 做定量内存或温度测量。

## Result

- Overall：PARTIAL
- Blockers：0
- High：0
- Medium：1（首次冷启动商品价格加载延迟，重启后恢复）
- Low：0
- App Review ready：YES（产品负责人已接受剩余人工覆盖风险）
- App Review submission：SUBMITTED，2026-07-18，当前状态为“正在等待审核”
- Release method：Manual release
- Notes：购买、重启保持、删除重装后的 entitlement 自动恢复及四比例连续导出均通过。VoiceOver、Large / XL / XXL、Reduce Motion、200% 页面缩放、完整离线浏览和物理触控左右滑动尚未真实执行，因此总体测试结果仍保持 PARTIAL；产品负责人已明确接受这些剩余风险并授权提交 Build 9 审核。
