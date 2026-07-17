# TestFlight Validation｜虾子曰艺术风格图鉴 1.2 Build 8

## Build

- Version：1.2
- Build：8
- Install source：TestFlight
- Commit：pending final release commit
- Device：NOT TESTED
- iOS：NOT TESTED
- Tester：NOT TESTED
- Test date：NOT TESTED

## Upload Status

- Archive：PENDING
- App Store Connect upload：PENDING
- Last uploader status：NOT UPLOADED
- Processing completion：NOT CONFIRMED
- TestFlight installation：NOT TESTED

Build 8 includes the post-Build-7 native swipe deduplication and Plus modal action refinements. All TestFlight-specific checks below remain unchecked until Build 8 is processed and installed from TestFlight.

## Installation

- [ ] Build 在 TestFlight 中 Processing 完成
- [ ] 安装成功
- [ ] 升级安装保留收藏
- [ ] 全新安装正常
- [ ] 启动无白屏
- [ ] 120 个风格图片正常

## Core Regression

- [ ] 首页浏览
- [ ] 左右滑动
- [ ] 随机风格
- [ ] 搜索
- [ ] 分类
- [ ] 收藏
- [ ] 详情
- [ ] 中英文切换
- [ ] Plus
- [ ] 分享
- [ ] 图片预览
- [ ] 离线浏览

## StoreKit Sandbox

TestFlight uses the Sandbox IAP environment.

- [ ] 商品成功加载
- [ ] 显示 Apple 返回价格
- [ ] 取消购买正常
- [ ] Sandbox 购买成功
- [ ] Plus 立即生效
- [ ] 重启后 Plus 保留
- [ ] 恢复购买成功
- [ ] 连续点击不会重复支付
- [ ] Pending 状态可恢复
- [ ] 中文界面无 Native 英文技术错误

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
| 9:16 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 4:5 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 1:1 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| 16:9 | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |

- [ ] 无重复分享面板
- [ ] 连续导出没有持续变慢
- [ ] 用户取消后按钮恢复
- [ ] 导出失败后按钮恢复
- [ ] 没有内存警告
- [ ] 无异常明显发热
- [ ] 临时目录没有持续堆积导出文件

## Result

- Overall：NOT TESTED
- Blockers：NOT TESTED
- High：NOT TESTED
- Medium：NOT TESTED
- Low：NOT TESTED
- App Review ready：NO
- Notes：Complete this document only with results from the TestFlight build on a physical device.
