# Style Atlas / 风格图鉴

手机端优先的双语视觉风格图鉴静态网页。

## 已实现

- 每日推荐：按日期从 100 个风格中固定轮换
- 卡片探索：上一张、下一张、随机、点击详情、手机/网页拖拽滑动，带三层卡片堆叠动效
- 右上角抽屉：今日、探索、搜索、收藏都收纳到顶部菜单，不再占用底部操作区
- 100 个风格基础数据：中英文名称、分类、简介、历史、特征、用途、提示词
- 100 张本地原创示例图：`assets/styles/*.png`
- 重点风格 Image Tool 封面：Swiss Style、Art Deco、Ukiyo-e、中国水墨
- 公共领域案例：使用 The Met Collection API 抓取到的公开馆藏案例，保存在 `assets/examples/`
- 搜索：支持中文、英文、拼音、标签和分类筛选
- 收藏：使用 `localStorage` 本地保存
- 分享：优先使用 `navigator.share`，不支持时复制链接
- 保存分享卡片：用 Canvas 下载 9:16 图片
- 中英文切换：使用 `localStorage` 记住选择

## 运行方式

直接打开 `index.html` 即可使用。

也可以启动本地服务：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173/
```

## 文件结构

```text
vile-saint-game/
├── index.html
├── styles.css
├── game.js
└── assets/
```

## 暂缓

当前 100 张示例图先保证每个风格都有封面。重点风格已用 Image Tool 精修；公开案例抓取受 The Met API 速度影响，当前先补已成功下载的条目，可继续运行 `scripts/fetch_public_examples.py` 增量补充。
