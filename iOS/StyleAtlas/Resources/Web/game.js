(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const data = window.STYLE_ATLAS_DATA || {};
  const aestheticGuides = window.STYLE_AESTHETIC_GUIDES || {};
  const { categories, categoryAliases, styleAliases, categoryCopy, palettes, peopleByStyle, categoryHistory, riskByStyle, rawStyles, refinedStyles } = data;
  window.STYLE_ATLAS_RUNTIME_CONFIG = Object.assign({
    nativeShell: false,
    externalGalleryEnabled: true,
    submissionMode: "web",
    publicBaseURL: "https://style-atlas.wonderelian.com/"
  }, window.STYLE_ATLAS_RUNTIME_CONFIG || {});
  const APP_STORE_URL = "https://apps.apple.com/cn/app/%E8%99%BE%E5%AD%90%E6%9B%B0%E8%89%BA%E6%9C%AF%E9%A3%8E%E6%A0%BC%E5%9B%BE%E9%89%B4/id6787447019";
  const ACCESS_CONFIG = {
    freeFullStyleLimit: 20,
    maxFreeSaved: 20,
    freeExportWatermark: true,
    plusEnabled: false,
    freeFullStyleIds: [
      "swiss-style",
      "bauhaus",
      "art-deco",
      "art-nouveau",
      "constructivism",
      "minimalism",
      "pop-art-poster",
      "van-gogh",
      "monet",
      "picasso-cubism",
      "matisse",
      "dali",
      "magritte",
      "edward-hopper",
      "gustav-klimt",
      "chinese-ink-painting",
      "dunhuang-mural",
      "ukiyo-e",
      "cinematic-anime",
      "childrens-picture-book"
    ]
  };
  const readStorage = (key, fallback = null) => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  };
  const readLang = () => {
    const stored = readStorage("styleAtlasLang");
    return ["zh", "en"].includes(stored) ? stored : (navigator.language.startsWith("zh") ? "zh" : "en");
  };
  const readArray = (key) => {
    try {
      const value = JSON.parse(readStorage(key, "[]"));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  const store = {
    lang: readLang(),
    saved: readArray("styleAtlasSaved"),
    recent: readArray("styleAtlasRecent"),
    activeId: null,
    view: "home",
    backView: "home",
    query: "",
    filter: "",
    exportRatio: "9:16",
    drawerOpen: false,
    drawerReturnFocus: null,
    overlayReturnFocus: null,
    guidedStage: 0,
    activeDetailSection: "see",
    detailHistory: [],
    reviewMode: "",
    reviewSection: "",
    reviewGuidedStage: null,
    detailSectionObserver: null,
    detailSectionScrollFrame: 0,
    selectedPlusPlan: "annual_auto",
    reflectionTimers: new Map()
  };

  const styles = rawStyles.map((item, index) => {
    const [id, en, zh, category, pinyin, keywords] = item;
    const copy = categoryCopy[category];
    const tagsZh = copy.featuresZh.slice(0, 3);
    const tagsEn = copy.featuresEn.slice(0, 3);
    const people = peopleByStyle[id] || [["相关创作者", "Relevant creators"]];
    const peopleZh = people.map((item) => item[0]);
    const peopleEn = people.map((item) => item[1]);
    const era = categoryHistory[category];
    const risk = riskByStyle[id];
    return {
      id,
      number: index + 1,
      category,
      pinyin,
      name: { en, zh },
      subtitle: {
        zh: `${tagsZh.join(" / ")} 的视觉语言`,
        en: `${tagsEn.join(" / ")} visual language`
      },
      summary: {
        zh: `${zh}强调${tagsZh.join("、")}。${copy.zh}`,
        en: `${en} emphasizes ${tagsEn.join(", ").toLowerCase()}. ${copy.en}`
      },
      memoryAnchor: {
        zh: `${zh}像把${tagsZh[0]}、${tagsZh[1]}和${tagsZh[2]}压成一个清晰符号；远看先抓住气质，近看才发现它的结构。`,
        en: `${en} compresses ${tagsEn[0].toLowerCase()}, ${tagsEn[1].toLowerCase()} and ${tagsEn[2].toLowerCase()} into one clear signal; from far away you catch the mood, up close you see the structure.`
      },
      history: {
        zh: `${zh}通常放在${era[0]}中理解。它不是一个单独滤镜，而是一套由时代背景、媒介技术和创作者选择共同形成的视觉语言；代表人物包括${peopleZh.join("、")}。阅读这个风格时，可以像查百科一样先看它出现的年代和地域，再看它怎样改变了色彩、构图、线条和图像叙事。`,
        en: `${en} is best understood through ${era[1]}. It is not a single filter, but a visual language shaped by historical context, media technology and creative choices; representative figures include ${peopleEn.join(", ")}. Read it like an encyclopedia entry: first locate its time and place, then see how it changed color, composition, line and image narrative.`
      },
      why: {
        zh: `它会形成这种样子，通常是因为创作者需要用${tagsZh.join("、")}回应当时的审美问题：有的要让信息更清楚，有的要摆脱学院规则，有的要把地方记忆变成可传播的图像。复刻时先抓${peopleZh[0]}这类代表人物的核心方法，再把它转译到自己的主题里。`,
        en: `It looks this way because artists and designers used ${tagsEn.join(", ").toLowerCase()} to answer the visual problems of their time: clearer information, freedom from academic rules, or local memory made shareable. To replicate it, start from the core method behind figures such as ${peopleEn[0]}, then translate it into your own subject.`
      },
      curatorNote: {
        zh: `把${zh}当作艺术馆里的一件展品来看：先退后一步，看它如何用${tagsZh[0]}建立第一印象；再靠近一点，看${tagsZh[1]}和${tagsZh[2]}如何让画面成立。${peopleZh[0]}、${peopleZh[1]}和${peopleZh[2]}是进入这条线索的三个入口。`,
        en: `Look at ${en} like an exhibit in a gallery: step back to see how ${tagsEn[0].toLowerCase()} creates the first impression, then move closer to see how ${tagsEn[1].toLowerCase()} and ${tagsEn[2].toLowerCase()} hold the image together. ${peopleEn[0]}, ${peopleEn[1]} and ${peopleEn[2]} are three entry points into the style.`
      },
      people: { zh: peopleZh, en: peopleEn },
      wikiTitles: [en, ...peopleEn],
      lookFor: {
        zh: [`第一眼先看${tagsZh[0]}`, `再看${tagsZh[1]}如何组织画面`, `最后看${tagsZh[2]}是否稳定地重复出现`],
        en: [`First notice ${tagsEn[0].toLowerCase()}`, `Then see how ${tagsEn[1].toLowerCase()} organizes the image`, `Finally check whether ${tagsEn[2].toLowerCase()} repeats consistently`]
      },
      references: {
        zh: [`先看${peopleZh[0]}的代表作品或案例，理解这个风格的基本语法`, `对照${peopleZh[1]}，观察同一风格在构图和材料上的变化`, `再做一张${zh}原创封面/海报，练习把历史语言转成现代应用`],
        en: [`Start with representative works or cases by ${peopleEn[0]} to understand the basic grammar`, `Compare ${peopleEn[1]} to see how composition and material can shift inside the same style`, `Create an original ${en} cover or poster to translate the historical language into a modern use case`]
      },
      visualFeatures: { zh: copy.featuresZh, en: copy.featuresEn },
      useCases: { zh: copy.usesZh, en: copy.usesEn },
      tags: { zh: tagsZh.concat(["高级", "灵感"]), en: tagsEn.concat(["Premium", "Inspiration"]) },
      searchAliases: (categoryAliases[category] || []).concat(styleAliases[id] || []),
      imagePrompts: {
        zh: `以复刻${zh}视觉语言为目标，提取${copy.featuresZh.join("、")}，控制色彩、构图、线条和材质，让画面像该风格的原创应用案例，高清，完整构图，不复制具体原作`,
        en: `Replicate the visual language of ${en}: extract ${copy.featuresEn.join(", ").toLowerCase()}, control color, composition, line and material, create an original applied case in this style, high resolution, complete composition, not a copy of a specific artwork`
      },
      negativePrompt: {
        zh: `避免盗用原作、低清晰度文字、杂乱构图、廉价滤镜、直接复制当代工作室完整风格${risk ? `；${risk[0]}` : ""}`,
        en: `Avoid copied artwork, low-quality text, cluttered composition, cheap filters, directly copying a contemporary studio style${risk ? `; ${risk[1]}` : ""}`
      },
      relatedStyles: related(index),
      art: palettes[index % palettes.length],
      image: `assets/styles/${id}.webp`,
      keywords
    };
  });

  Object.entries(refinedStyles || {}).forEach(([id, data]) => Object.assign(styles.find((style) => style.id === id), data));
  const validStyleIds = new Set(styles.map((style) => style.id));
  const stylesById = new Map(styles.map((style) => [style.id, style]));
  store.saved = [...new Set(store.saved.filter((id) => validStyleIds.has(id)))];
  store.recent = [...new Set(store.recent.filter((id) => validStyleIds.has(id)))].slice(0, 12);

  const REFLECTIONS_KEY = "styleAtlasReflectionsV1";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function readReflections() {
    try {
      const parsed = JSON.parse(readStorage(REFLECTIONS_KEY, "{}"));
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      writeStorage(REFLECTIONS_KEY, "{}");
      return {};
    }
  }

  function localizedList(value, lang = store.lang) {
    return Array.isArray(value?.[lang]) ? value[lang].filter(Boolean) : [];
  }

  function normalizedFocus(focus) {
    if (!focus || typeof focus !== "object") return null;
    const x = Number(focus.x);
    const y = Number(focus.y);
    const scale = Number(focus.scale);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(scale)) return null;
    return {
      x: clamp(x, 0, 100),
      y: clamp(y, 0, 100),
      scale: clamp(scale, 1, 2)
    };
  }

  function guideFor(style) {
    const guide = aestheticGuides[style.id];
    if (guide) return { ...guide, enhanced: true };
    const observationZh = [...new Set(localizedList(style.lookFor, "zh").concat(localizedList(style.visualFeatures, "zh")))].slice(0, 3);
    const observationEn = [...new Set(localizedList(style.lookFor, "en").concat(localizedList(style.visualFeatures, "en")))].slice(0, 3);
    const observationCount = Math.max(3, Math.min(5, Math.max(observationZh.length, observationEn.length)));
    return {
      enhanced: false,
      openingQuestion: {
        zh: style.curatorNote?.zh || style.memoryAnchor.zh,
        en: style.curatorNote?.en || style.memoryAnchor.en
      },
      observe: Array.from({ length: observationCount }, (_, index) => ({
        key: `fallback-${index + 1}`,
        label: {
          zh: `观察线索 ${index + 1}`,
          en: `Viewing cue ${index + 1}`
        },
        text: {
          zh: observationZh[index] || observationZh[observationZh.length - 1] || style.memoryAnchor.zh,
          en: observationEn[index] || observationEn[observationEn.length - 1] || style.memoryAnchor.en
        }
      })),
      profile: null,
      feelingWords: {
        zh: localizedList(style.tags, "zh").slice(0, 4),
        en: localizedList(style.tags, "en").slice(0, 4)
      },
      everydayLife: localizedList(style.useCases, "zh").slice(0, 4).map((item, index) => ({
        scene: {
          zh: item,
          en: localizedList(style.useCases, "en")[index] || item
        },
        text: { zh: "", en: "" }
      })),
      comparisons: style.relatedStyles.filter((id) => validStyleIds.has(id)).slice(0, 2).map((styleId) => ({ styleId })),
      reflectionPrompt: {
        zh: style.memoryAnchor.zh,
        en: style.memoryAnchor.en
      }
    };
  }

  function hasPlusAccess() {
    return ACCESS_CONFIG.plusEnabled === true;
  }

  function canViewFullStyle(style) {
    return hasPlusAccess() || style.isFreeFullAccess;
  }

  function isStyleLocked(style) {
    return !canViewFullStyle(style);
  }

  function canExportHighRes() {
    return hasPlusAccess();
  }

  function refreshStyleAccess() {
    styles.forEach((style) => {
      style.isFreeFullAccess = ACCESS_CONFIG.freeFullStyleIds.includes(style.id);
      style.isPlusLocked = isStyleLocked(style);
      style.accessTier = style.isPlusLocked ? "plus" : (style.isFreeFullAccess ? "free-full" : "plus-unlocked");
      style.exportTier = hasPlusAccess() ? "plus" : "free";
    });
  }

  function setPlusAccessFromNative(value) {
    ACCESS_CONFIG.plusEnabled = value === true;
    refreshStyleAccess();
    if (hasPlusAccess() && !dom.plusModal.hidden) closePlus();
    renderAll();
    return hasPlusAccess();
  }

  refreshStyleAccess();

  const text = {
    zh: {
      today: "今日推荐",
      brandTitle: "虾子曰艺术风格图鉴",
      brandSubtitle: "风格图鉴",
      headerBrandTitle: "虾子曰",
      headerBrandSubtitle: "艺术风格图鉴",
      productName: "虾子曰艺术风格图鉴",
      drawerEyebrow: "虾子曰 · STYLE ATLAS",
      drawerTitle: "你的风格图鉴",
      drawerSavedTitle: "我的收藏",
      drawerSavedNote: (n) => `${n} 个已收藏风格`,
      drawerAboutTitle: "关于图鉴",
      drawerAboutNote: "认识产品、内容范围与使用方式",
      drawerDownloadKicker: "iPhone App",
      drawerDownloadTitle: "带走完整风格图鉴",
      drawerDownloadNote: "120 篇深度指南、中英双语与离线浏览，都装进口袋里。",
      drawerDownloadCta: "前往 App Store 下载",
      drawerDownloadCtaNote: "免费下载 · iPhone",
      drawerReviewCta: "已经安装？去评分与评价",
      drawerReviewCtaNote: "你的反馈会帮助图鉴继续完善",
      drawerContactTitle: "联系我们",
      drawerContactNote: "邮箱与社交媒体",
      drawerSupportKicker: "有余相助",
      drawerSupportTitle: "随喜相助",
      drawerSupportCopy: "若这份风格图鉴于你有用，可以让一份心意继续支持内容维护；也可以把它留给自己。",
      drawerSupportNote: "有余则助，无余亦安",
      drawerWorksTitle: "沿途所作",
      drawerWorksHeading: "观世界，识自己，也学习看见美。",
      drawerWorkWonderTitle: "WonderElian",
      drawerWorkWonderNote: "WonderElian 是永歌 Elian 的个人创作空间。这里记录作品，也记录关于设计、AI、产品，以及如何慢慢成为自己的思考与探索。",
      drawerWorkYixiuTitle: "一休冥想",
      drawerWorkYixiuNote: "打开真实的山间溪流，让没有音乐和人声的自然声，陪你读完眼前这一章；也可以在 iPhone 后台继续播放。",
      drawerWorkWendaoTitle: "三慢问道",
      drawerWorkWendaoNote: "慢读《道德经》，也慢慢认识自己。",
      drawerWorkXiaziTitle: "虾子曰",
      drawerWorkXiaziNote: "每天用 9 个全球热点与 18 张双语海报，把昨天的复杂世界讲清楚。",
      drawerWorkHumanTitle: "不二 认识自己",
      drawerWorkHumanNote: "从出生信息生成中英双语人类图与基础解读，换一个角度认识自己的运行方式。",
      supportCopy: "阅读、停留与分享，本身已经是同行。若仍有余力，也可以随喜相助。",
      supportRecognition: "长按二维码，识别并支付",
      supportCodeLink: "单独打开二维码",
      supportPosterLink: "查看完整赞赏海报",
      drawerFooter: "120 种风格 · 120 篇深度指南 · 中英双语",
      positioning: "探索 120 种艺术与设计风格，每一种都提供完整深度指南。\n每天 3 分钟，从看见一种美，到真正看懂它。",
      valueLine: "跟着看图引导观察构图、色彩与线条，再用审美画像、日常观察和风格对比建立自己的审美词库。",
      random: "随机",
      swipe: "左右滑动探索",
      categories: "分类",
      search: "搜索风格",
      saved: (n) => `已收藏 ${n} 个风格`,
      copyList: "复制清单",
      detail: "了解这个风格",
      favorite: "收藏",
      unfavorite: "已收藏",
      share: "分享",
      saveStyle: (name) => `收藏 ${name}`,
      unsaveStyle: (name) => `取消收藏 ${name}，已收藏`,
      shareStyle: (name) => `分享 ${name}`,
      copyStyle: (name) => `复制 ${name} 风格表达词`,
      styleCardRole: "风格卡片",
      styleCardLabel: (name, summary) => `${name}。${summary}。查看 ${name} 风格详情`,
      styleChanged: (name, summary) => `已切换到 ${name}。${summary}`,
      searchResults: (n) => `${n} 个搜索结果`,
      savedResults: (n) => `${n} 个已收藏风格`,
      saveCard: "保存卡片",
      copyPrompt: "复制表达词",
      copyOverview: "复制风格介绍",
      features: "视觉特征",
      history: "风格源流",
      why: "形成原因",
      curator: "策展说明",
      exhibitImages: "展品图像",
      people: "代表人物",
      lookFor: "识别方法",
      references: "代表作品与案例",
      memory: "记住它",
      useCases: "适用场景",
      detailSections: ["看", "懂", "用", "创作", "深入"],
      detailSectionHints: ["识别", "原理", "应用", "实践", "延展"],
      detailSectionNav: "风格详情分段导航",
      guidedEntry: "带我看懂这张图",
      guidedOpening: "先别急着分析",
      guidedFirst: "先看这里",
      guidedSecond: "再看一个地方",
      guidedThird: "最后感受一下",
      guidedComplete: "你已经抓住这种风格最重要的线索了。",
      guidedLooked: "我看了一会儿",
      guidedContinue: "继续看",
      guidedBack: "回到详情",
      closeGuided: "关闭看图引导",
      previousGuided: "上一步",
      guidedStep: (current, total) => `${current} / ${total}`,
      rememberInOneLine: "一句话记住它",
      recognizeTitle: "下次再见到它，先认这几个地方",
      profileTitle: "审美气质",
      profileLabels: ["秩序感", "色彩浓度", "装饰程度", "情绪张力"],
      profileScaleHints: ["自由 ↔ 严谨", "克制 ↔ 浓郁", "简洁 ↔ 丰富", "平静 ↔ 强烈"],
      profileNote: "这是观察提示，不是审美评分。",
      profilePending: "审美气质分析正在完善中。",
      whyFeelTitle: "为什么它会给你这种感觉？",
      curatorObservation: "策展人观察",
      formationMechanism: "形成机制",
      rememberSentence: "记住它",
      everydayTitle: "这种美，也藏在日常生活里",
      compareTitle: "看起来有点像，但它们不一样",
      similarityLabel: "相似点",
      differenceLabel: "关键区别",
      createTitle: "把这种美用进创作",
      exploreTitle: "深入了解",
      reflectionTitle: "我对它的第一感觉",
      reflectionLabel: "记录你对这个风格的第一感觉",
      reflectionLimit: "最多 300 字符，仅保存在这台设备。",
      reflectionClear: "清除",
      reflectionSaved: "已保存在本机",
      reflectionCleared: "已清除",
      reflectionStorageUnavailable: "本地保存暂时不可用，但你仍可以继续输入。",
      accordionHistory: "历史背景",
      accordionPeople: "代表人物",
      accordionReferences: "参考作品",
      accordionGallery: "公开案例",
      accordionContext: "文化与形成原因补充",
      prompt: "风格表达词",
      examples: "公开案例",
      source: "查看来源",
      similar: "相似风格",
      empty: "没找到这个风格。试试：海报、油画、东方、漫画、科技、复古。",
      copied: "已复制",
      savedToast: "已收藏",
      removedToast: "已取消收藏",
      shared: "链接已复制",
      cardSaved: "分享卡片已保存",
      saveFailed: "保存失败，请稍后重试",
      shareFailed: "分享失败，请稍后重试",
      wechatShareHint: "分享图已生成，长按图片保存或发送给朋友",
      copyFailed: "复制失败，请长按手动复制",
      savedEmpty: "还没有收藏。先从今日风格或搜索里保存喜欢的风格。",
      styleCount: (n) => `${n} 种风格`,
      previousStyle: "上一个风格",
      nextStyle: "下一个风格",
      openStyle: "查看风格详情",
      closeMenu: "关闭菜单",
      openMenu: "打开菜单",
      closePreview: "关闭图片预览",
      imagePreview: "图片预览",
      exportStarted: "正在准备图片…",
      exportSharing: "正在打开系统分享…",
      exportComplete: "图片已准备好",
      lockedPreview: "完整内容包含深入源流、识别方法、案例与风格表达词。"
      ,
      plus: "虾子曰艺术风格图鉴 Plus",
      unlockTitle: "解锁完整风格档案",
      unlockBody: "主图与简介可免费浏览。Plus 打开从观察、理解到表达的完整学习路径。",
      unlockCta: "查看 Plus 解锁内容",
      locked: "Plus",
      lockedArchiveTitle: (name) => `继续看懂 ${name}`,
      lockedArchiveBody: "先看一段真实内容。完整档案会继续带你从观察、理解走到比较与表达。",
      lockedArchiveNote: "Hero 与简介可浏览，Plus 打开完整学习路径。",
      lockedObservationTitle: "观察与识别",
      lockedObservationNote: "关键线索（节选）",
      lockedProfileTitle: "审美 Profile",
      lockedProfileNote: "四个观察维度（节选）",
      lockedComparisonTitle: "风格比较",
      lockedComparisonNote: "相近风格辨析（节选）",
      lockedMore: "更多内容解锁中",
      lockedValueHidden: "解锁查看",
      lockedOpenArchive: "打开完整风格档案",
      exportOptions: "保存导出",
      freeExport: "普通清晰度 · 带水印",
      plusExport: "高清无水印 · 9:16 / 1:1 / 4:5 / 16:9",
      plusSubtitle: "从看见到看懂，完整打开每一种风格。",
      plusBenefits: ["120 篇完整档案与 Guided Looking", "Profile、Comparison、历史与创作表达", "无限收藏与高清多比例导出"],
      freePlan: "免费版",
      plusPlan: "Plus",
      freePlanItems: ["120 个主图与简介", "20 篇完整档案"],
      plusPlanItems: ["全部 120 篇深度指南", "全部学习、收藏与高清导出"],
      appStorePrice: "价格以 App Store 显示为准",
      appStoreCta: "前往 App Store 查看 Plus",
      downloadApp: "下载 App",
      downloadOnAppStore: "前往 App Store 下载",
      downloadAppNote: "免费下载 iPhone App，在完整的离线体验中继续探索、创作与导出。",
      comingSoon: "即将开放",
      unlockPlus: "解锁 Plus",
      restorePurchases: "恢复购买",
      planPicker: "选择方案",
      annualAutoTitle: "连续包年",
      annualAutoNote: "每年自动续订，可随时取消",
      annualAutoBadge: "推荐",
      annualTitle: "年费",
      annualNote: "1 年使用期，到期不自动续订",
      annualAutoDisclosure: "连续包年：确认购买后从 Apple ID 扣款；除非到期前至少 24 小时取消，否则按年自动续订。可在 Apple ID 的“订阅”中管理或取消。",
      annualDisclosure: "购买后可使用 Plus 1 年，到期不自动续订。如需继续使用，可再次购买年费方案。",
      subscribePlus: "开启连续包年",
      buyAnnualPlus: "购买一年 Plus",
      termsOfUse: "使用条款",
      privacyPolicy: "隐私政策",
      priceLoading: "正在载入 App Store 价格…",
      purchaseLoading: "正在连接 App Store…",
      purchaseSuccess: "Plus 已解锁",
      purchasePending: "购买正在等待处理",
      purchaseCancelled: "已取消购买",
      purchaseUnavailable: "暂时无法载入 Plus，请稍后重试。",
      purchaseFailed: "购买未完成，请稍后重试。",
      restoreLoading: "正在恢复购买…",
      restoreSuccess: "购买已恢复",
      restoreNone: "没有找到可恢复的购买",
      exportFailed: "图片导出失败，请重试",
      operationInProgress: "已有 App Store 操作正在进行，请稍候。",
      productUnavailable: "暂时无法获取 Plus 商品，请稍后再试。",
      productLoadTimeout: "连接 App Store 超时，请检查网络后重试。",
      purchaseVerificationFailed: "购买验证失败，请稍后重试或联系支持。",
      restoreFailed: "恢复购买失败，请检查网络后重试。",
      noPurchaseToRestore: "没有找到可恢复的购买记录。",
      transactionUnverified: "App Store 交易验证失败，请稍后重试。",
      exportPayloadMissing: "图片数据不完整，请重新生成后再试。",
      exportWriteFailed: "图片保存失败，请稍后重试。",
      presentationUnavailable: "暂时无法打开系统分享面板。",
      exportInProgress: "已有图片任务正在进行，请稍候。",
      canvasUnavailable: "当前设备无法创建导出画布。",
      imageDecodeFailed: "图片读取失败，请重新打开后再试。",
      blobCreationFailed: "无法创建导出图片，请重试。",
      unknown: "操作失败，请稍后重试。",
      iapFootnote: "价格与付款均由 Apple App Store 处理",
      appStoreFootnote: "下载 App 后可在应用内解锁 Plus",
      plusFuture: "Plus 将在后续版本开放",
      plusFutureBody: "首版先提供完整的免费风格浏览、搜索、收藏和离线体验。",
      savedLimit: "你已经收藏了 20 个风格。升级 Plus，建立无限风格灵感库。",
      lockedExpression: "完整风格表达词已收纳在 Plus。",
      highResLocked: "高清无水印导出属于 Plus 预览功能。"
      ,
      about: "关于",
      aboutTitle: "关于虾子曰艺术风格图鉴",
      aboutBody: "虾子曰艺术风格图鉴把海报、绘画、插画、动画、民俗与数字艺术等 120 种视觉语言整理成可以观察、理解、比较和表达的完整深度指南。\n\n每篇深度指南从“看、懂、用、创作、深入”五个阶段展开，并配有看图引导、审美画像、日常观察、相近风格对比和创作表达。它不是替你生成图片，而是帮助你知道什么好看、为什么好看，以及如何清楚表达自己的视觉感受。",
      aboutFor: "适合希望提升审美的人、自媒体人、设计师、AI 创作者、品牌人、内容创作者、设计学生和艺术爱好者。",
      aboutFree: "App 可免费下载，包含每日推荐、120 种风格浏览、双语搜索、收藏，以及 20 个可使用全部学习模块的免费完整风格档案。",
      aboutPlus: "Plus 提供年费与连续包年两种年度方案，解锁其余完整风格档案、Guided Looking、Profile、Everyday、Comparison、创作表达、深入内容、无限收藏和高清多比例导出。",
      appFeaturesTitle: "在 App 里看懂一种美",
      appFeatures: ["浏览 120 种艺术与设计风格", "阅读 120 篇完整深度指南", "跟随 Guided Looking 一步步观察画面", "通过 Profile、Everyday 与 Comparison 建立辨识力", "用风格表达词把理解带进创作", "支持中英文、离线浏览与多比例导出"],
      safetyTitle: "版权与风格安全说明",
      safetyBody: "虾子曰艺术风格图鉴鼓励学习视觉语言，而不是复制具体作品、具体角色或当代创作者的完整可识别风格。历史艺术流派可以作为学习对象，涉及当代工作室、IP 或在世创作者时，我们更建议使用通用视觉特征来表达。",
      screenshotsTitle: "App Store Screenshot Kit",
      screenshotSlides: [
        ["每天 3 分钟提升审美", "今日推荐"],
        ["120 种全球视觉风格", "风格图鉴"],
        ["看懂风格为什么好看", "深度档案"],
        ["建立你的审美资料库", "风格收藏"],
        ["保存好看的风格卡片", "高清导出"],
        ["解锁完整风格档案", "虾子曰艺术风格图鉴 Plus"]
      ]
    },
    en: {
      today: "Today's Pick",
      brandTitle: "Xiazishuo Style Atlas",
      brandSubtitle: "Style Atlas",
      headerBrandTitle: "Xiazishuo",
      headerBrandSubtitle: "Style Atlas",
      productName: "Xiazishuo Style Atlas",
      drawerEyebrow: "XIAZISHUO · STYLE ATLAS",
      drawerTitle: "Your Style Atlas",
      drawerSavedTitle: "Saved styles",
      drawerSavedNote: (n) => `${n} saved ${n === 1 ? "style" : "styles"}`,
      drawerAboutTitle: "About the atlas",
      drawerAboutNote: "Product purpose, content scope, and how it works",
      drawerDownloadKicker: "iPhone App",
      drawerDownloadTitle: "Take the complete atlas with you",
      drawerDownloadNote: "120 in-depth guides, bilingual content, and offline browsing.",
      drawerDownloadCta: "Download on the App Store",
      drawerDownloadCtaNote: "Free download · iPhone",
      drawerReviewCta: "Already installed? Rate the app",
      drawerReviewCtaNote: "Your review helps the atlas keep improving",
      drawerContactTitle: "Contact",
      drawerContactNote: "Email and social channels",
      drawerSupportKicker: "IF YOU HAVE SOMETHING TO SPARE",
      drawerSupportTitle: "Support the journey",
      drawerSupportCopy: "If the atlas has helped, you may support its continued care—or keep that care for what your own life needs.",
      drawerSupportNote: "Give freely, or simply explore in peace",
      drawerWorksTitle: "WORKS ALONG THE WAY",
      drawerWorksHeading: "See the world, know yourself, and learn to see beauty.",
      drawerWorkWonderTitle: "WonderElian",
      drawerWorkWonderNote: "An independent creative world from Wuhan, connecting visual culture, wellbeing, and real life through design, AI, and digital products.",
      drawerWorkYixiuTitle: "Yixiu Meditation",
      drawerWorkYixiuNote: "Play a real mountain stream—no music, no talking—while you read, then continue in the background on iPhone.",
      drawerWorkWendaoTitle: "Wendao",
      drawerWorkWendaoNote: "Read the Tao Te Ching slowly, and come to know yourself.",
      drawerWorkXiaziTitle: "Xiazi Says",
      drawerWorkXiaziNote: "Nine global stories and eighteen bilingual posters make yesterday's complex world easier to see.",
      drawerWorkHumanTitle: "Bu'er · Know Yourself",
      drawerWorkHumanNote: "Turn birth details into a bilingual chart and foundational reading—a different lens on how you move through life.",
      supportCopy: "Reading, pausing, and sharing are already forms of participation. If you still have something to spare, you may offer support.",
      supportRecognition: "Press and hold the QR code to recognize and pay",
      supportCodeLink: "Open QR code",
      supportPosterLink: "View complete support poster",
      drawerFooter: "120 styles · 120 in-depth guides · Bilingual",
      positioning: "Explore 120 art and design styles, each with a complete in-depth guide.\nMove from seeing a style to truly understanding it in three minutes a day.",
      valueLine: "Follow guided looking prompts, then build recognition through aesthetic profiles, everyday observations, and side-by-side comparisons.",
      random: "Random",
      swipe: "Swipe to explore",
      categories: "Categories",
      search: "Search styles",
      saved: (n) => `${n} saved styles`,
      copyList: "Copy list",
      detail: "Learn this style",
      favorite: "Save",
      unfavorite: "Saved",
      share: "Share",
      saveStyle: (name) => `Save ${name}`,
      unsaveStyle: (name) => `Remove ${name} from saved styles, saved`,
      shareStyle: (name) => `Share ${name}`,
      copyStyle: (name) => `Copy ${name} style expression`,
      styleCardRole: "Style card",
      styleCardLabel: (name, summary) => `${name}. ${summary}. View ${name} style details`,
      styleChanged: (name, summary) => `Now showing ${name}. ${summary}`,
      searchResults: (n) => `${n} search results`,
      savedResults: (n) => `${n} saved styles`,
      saveCard: "Save card",
      copyPrompt: "Copy expression",
      copyOverview: "Copy style overview",
      features: "Visual features",
      history: "Origins",
      why: "Why It Formed",
      curator: "Curator Note",
      exhibitImages: "Exhibit Images",
      people: "Representative Figures",
      lookFor: "How To Recognize It",
      references: "Works And Cases",
      memory: "Remember it",
      useCases: "Use cases",
      detailSections: ["See", "Understand", "Apply", "Create", "Explore"],
      detailSectionHints: ["View", "Principles", "Use", "Practice", "Context"],
      detailSectionNav: "Style detail section navigation",
      guidedEntry: "Help me see this style",
      guidedOpening: "Do not analyze it yet",
      guidedFirst: "First, look here",
      guidedSecond: "Notice one more place",
      guidedThird: "Finally, sense the whole",
      guidedComplete: "You have found the most important cues in this style.",
      guidedLooked: "I've taken a look",
      guidedContinue: "Keep looking",
      guidedBack: "Back to the style",
      closeGuided: "Close guided looking",
      previousGuided: "Previous",
      guidedStep: (current, total) => `${current} / ${total}`,
      rememberInOneLine: "Remember it in one line",
      recognizeTitle: "How to recognize it again",
      profileTitle: "Aesthetic character",
      profileLabels: ["Order", "Color intensity", "Ornament", "Emotional intensity"],
      profileScaleHints: ["Free ↔ Rigorous", "Restrained ↔ Rich", "Simple ↔ Layered", "Calm ↔ Intense"],
      profileNote: "These are viewing cues, not scores of quality.",
      profilePending: "Aesthetic character analysis is being refined.",
      whyFeelTitle: "Why does it feel this way?",
      curatorObservation: "Curator observation",
      formationMechanism: "How the feeling is formed",
      rememberSentence: "Remember it",
      everydayTitle: "This kind of beauty appears in everyday life",
      compareTitle: "Similar at first glance, different when you look closer",
      similarityLabel: "Shared quality",
      differenceLabel: "Key difference",
      createTitle: "Create with this style",
      exploreTitle: "Explore deeper",
      reflectionTitle: "My first impression",
      reflectionLabel: "Record your first impression of this style",
      reflectionLimit: "Up to 300 characters, saved only on this device.",
      reflectionClear: "Clear",
      reflectionSaved: "Saved on this device",
      reflectionCleared: "Cleared",
      reflectionStorageUnavailable: "Local saving is temporarily unavailable, but you can keep typing.",
      accordionHistory: "Historical background",
      accordionPeople: "Representative figures",
      accordionReferences: "Reference works",
      accordionGallery: "Public examples",
      accordionContext: "Culture and formation",
      prompt: "Style Expression",
      examples: "Public example",
      source: "View source",
      similar: "Similar styles",
      empty: "No style found. Try poster, painting, Eastern, comic, tech or retro.",
      copied: "Copied",
      savedToast: "Saved",
      removedToast: "Removed",
      shared: "Link copied",
      cardSaved: "Share card saved",
      saveFailed: "Could not save. Please try again.",
      shareFailed: "Could not share. Please try again.",
      wechatShareHint: "Your share image is ready. Press and hold to save or send it.",
      copyFailed: "Could not copy. Please press and hold to copy.",
      savedEmpty: "Nothing saved yet. Start from Today's Pick or Search.",
      styleCount: (n) => `${n} styles`,
      previousStyle: "Previous style",
      nextStyle: "Next style",
      openStyle: "Open style details",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      closePreview: "Close image preview",
      imagePreview: "Image preview",
      exportStarted: "Preparing image…",
      exportSharing: "Opening the system share sheet…",
      exportComplete: "Image is ready",
      lockedPreview: "The full archive includes deeper origins, recognition methods, cases and style expression.",
      plus: "Xiazishuo Style Atlas Plus",
      unlockTitle: "Unlock the full style archive",
      unlockBody: "The Hero and introduction are free to browse. Plus opens the complete path from observation to expression.",
      unlockCta: "See what Plus unlocks",
      locked: "Plus",
      lockedArchiveTitle: (name) => `Keep understanding ${name}`,
      lockedArchiveBody: "Start with a real excerpt. The complete archive continues from observation and understanding to comparison and expression.",
      lockedArchiveNote: "The Hero and introduction are open to browse. Plus unlocks the complete learning path.",
      lockedObservationTitle: "Observe and recognize",
      lockedObservationNote: "Key cues (excerpt)",
      lockedProfileTitle: "Aesthetic Profile",
      lockedProfileNote: "Four viewing dimensions (excerpt)",
      lockedComparisonTitle: "Style comparison",
      lockedComparisonNote: "Nearby styles (excerpt)",
      lockedMore: "More content unlocks inside",
      lockedValueHidden: "Unlock to view",
      lockedOpenArchive: "Open the complete style archive",
      exportOptions: "Export",
      freeExport: "Standard clarity · watermarked",
      plusExport: "HD watermark-free · 9:16 / 1:1 / 4:5 / 16:9",
      plusSubtitle: "Go from seeing to understanding with every style fully open.",
      plusBenefits: ["120 complete guides with Guided Looking", "Profile, comparison, context, and creative expression", "Unlimited saves and HD multi-ratio export"],
      freePlan: "Free",
      plusPlan: "Plus",
      freePlanItems: ["120 hero images and introductions", "20 complete style archives"],
      plusPlanItems: ["All 120 in-depth guides", "All learning tools, saves, and HD export"],
      appStorePrice: "Price shown in the App Store",
      appStoreCta: "View Plus on the App Store",
      downloadApp: "Download App",
      downloadOnAppStore: "Download on the App Store",
      downloadAppNote: "Download the free iPhone app for the complete offline experience, creative tools, and exports.",
      comingSoon: "Coming Soon",
      unlockPlus: "Unlock Plus",
      restorePurchases: "Restore Purchases",
      planPicker: "Choose a plan",
      annualAutoTitle: "Annual subscription",
      annualAutoNote: "Renews yearly until cancelled",
      annualAutoBadge: "Recommended",
      annualTitle: "One-year pass",
      annualNote: "1 year of access, no automatic renewal",
      annualAutoDisclosure: "Annual subscription: charged to your Apple ID at confirmation and renews automatically each year unless cancelled at least 24 hours before expiry. Manage or cancel in Apple ID subscriptions.",
      annualDisclosure: "Includes 1 year of Plus access and does not renew automatically. Purchase another one-year pass to continue after it expires.",
      subscribePlus: "Start annual subscription",
      buyAnnualPlus: "Buy one year of Plus",
      termsOfUse: "Terms of Use",
      privacyPolicy: "Privacy Policy",
      priceLoading: "Loading App Store price…",
      purchaseLoading: "Connecting to the App Store…",
      purchaseSuccess: "Plus unlocked",
      purchasePending: "Purchase is pending",
      purchaseCancelled: "Purchase cancelled",
      purchaseUnavailable: "Plus is temporarily unavailable. Please try again.",
      purchaseFailed: "Purchase was not completed. Please try again.",
      restoreLoading: "Restoring purchases…",
      restoreSuccess: "Purchase restored",
      restoreNone: "No purchase was found to restore",
      exportFailed: "Image export failed. Please try again.",
      operationInProgress: "Another App Store operation is in progress. Please wait.",
      productUnavailable: "Plus is temporarily unavailable. Please try again later.",
      productLoadTimeout: "The App Store connection timed out. Check your network and try again.",
      purchaseVerificationFailed: "The purchase could not be verified. Please try again or contact support.",
      restoreFailed: "Purchases could not be restored. Check your network and try again.",
      noPurchaseToRestore: "No restorable purchase was found.",
      transactionUnverified: "The App Store transaction could not be verified. Please try again.",
      exportPayloadMissing: "The image data is incomplete. Generate it again and retry.",
      exportWriteFailed: "The image could not be saved. Please try again.",
      presentationUnavailable: "The system share sheet is temporarily unavailable.",
      exportInProgress: "Another image task is already in progress.",
      canvasUnavailable: "This device cannot create the export canvas.",
      imageDecodeFailed: "The image could not be read. Reopen it and try again.",
      blobCreationFailed: "The export image could not be created. Please try again.",
      unknown: "The operation could not be completed. Please try again.",
      iapFootnote: "Price and payment are handled by Apple App Store",
      appStoreFootnote: "Download the app to unlock Plus with an in-app purchase",
      plusFuture: "Plus will be available in a future version",
      plusFutureBody: "The first version focuses on free browsing, search, saved styles, and offline access.",
      savedLimit: "You’ve saved 20 styles. Upgrade to Plus to build an unlimited style library.",
      lockedExpression: "Complete style expression is included in Plus.",
      highResLocked: "HD watermark-free export is a Plus preview feature."
      ,
      about: "About",
      aboutTitle: "About Xiazishuo Style Atlas",
      aboutBody: "Xiazishuo Style Atlas organizes 120 visual languages across posters, painting, illustration, animation, folk art, and digital aesthetics into complete in-depth guides you can observe, understand, compare, and express.\n\nEach guide moves through See, Understand, Apply, Create, and Explore, with guided looking, aesthetic profiles, everyday observations, comparisons, and creative expression. It does not generate images for you. It helps you understand what looks good, why it works, and how to express your visual ideas clearly.",
      aboutFor: "For anyone building visual taste, social media creators, designers, AI creators, brand builders, content creators, design students, and art lovers.",
      aboutFree: "The app is free to download and includes the daily pick, all 120 styles, bilingual search, saved styles, and 20 free complete archives with every learning module available.",
      aboutPlus: "Plus offers a one-year pass and an annual auto-renewing subscription. Both unlock the remaining complete archives, Guided Looking, Profile, Everyday, Comparison, creative expression, deeper context, unlimited saved styles, and HD multi-ratio export.",
      appFeaturesTitle: "Learn to see a style in the app",
      appFeatures: ["Explore 120 art and design styles", "Read 120 complete in-depth guides", "Follow Guided Looking prompts step by step", "Build recognition with Profile, Everyday, and Comparison", "Turn understanding into creative prompts with style vocabulary", "Use Chinese or English, browse offline, and export in multiple ratios"],
      safetyTitle: "Copyright And Style Safety",
      safetyBody: "Xiazishuo Style Atlas encourages learning visual languages, not copying specific artworks, characters, or the fully recognizable style of contemporary creators. Historical movements can be studied directly, while contemporary studios, IPs and living creators should be described through general visual traits.",
      screenshotsTitle: "App Store Screenshot Kit",
      screenshotSlides: [
        ["Learn one visual style a day", "Today's Pick"],
        ["120 global visual styles", "Xiazishuo Style Atlas"],
        ["Understand why each style works", "Deep Archive"],
        ["Build your taste archive", "Saved Styles"],
        ["Save beautiful style cards", "Export"],
        ["Unlock the full style archive", "Xiazishuo Style Atlas Plus"]
      ]
    }
  };

  const dom = {
    appShell: $("appShell"),
    backBtn: $("backBtn"),
    langBtn: $("langBtn"),
    searchOpenBtn: $("searchOpenBtn"),
    drawerBtn: $("drawerBtn"),
    drawerCloseBtn: $("drawerCloseBtn"),
    drawer: $("drawer"),
    drawerBackdrop: $("drawerBackdrop"),
    lightbox: $("lightbox"),
    lightboxImage: $("lightboxImage"),
    lightboxTitle: $("lightboxTitle"),
    lightboxDescription: $("lightboxDescription"),
    lightboxHint: $("lightboxHint"),
    lightboxCloseBtn: $("lightboxCloseBtn"),
    saveLightboxBtn: $("saveLightboxBtn"),
    shareLightboxBtn: $("shareLightboxBtn"),
    deckStage: $("deckStage"),
    deckAnnouncement: $("deckAnnouncement"),
    prevGhost: $("prevGhost"),
    nextGhost: $("nextGhost"),
    todayLabel: $("todayLabel"),
    randomBtn: $("randomBtn"),
    styleDeck: $("styleDeck"),
    prevBtn: $("prevBtn"),
    nextBtn: $("nextBtn"),
    categoryTitle: $("categoryTitle"),
    categoryChips: $("categoryChips"),
    detailContent: $("detailContent"),
    aboutContent: $("aboutContent"),
    screenshotsContent: $("screenshotsContent"),
    searchLabel: $("searchLabel"),
    searchInput: $("searchInput"),
    clearSearchBtn: $("clearSearchBtn"),
    filterChips: $("filterChips"),
    searchResults: $("searchResults"),
    searchResultsTitle: $("searchResultsTitle"),
    savedCount: $("savedCount"),
    copyListBtn: $("copyListBtn"),
    savedList: $("savedList"),
    savedResultsTitle: $("savedResultsTitle"),
    toast: $("toast"),
    plusModal: $("plusModal"),
    plusPanel: $("plusPanel"),
    plusTitle: $("plusTitle"),
    plusSubtitle: $("plusSubtitle"),
    plusBenefits: $("plusBenefits"),
    freePlanTitle: $("freePlanTitle"),
    freePlanList: $("freePlanList"),
    plusPlanTitle: $("plusPlanTitle"),
    plusPlanList: $("plusPlanList"),
    plusPlanPicker: $("plusPlanPicker"),
    plusPlanPickerLegend: $("plusPlanPickerLegend"),
    plusAnnualAutoTitle: $("plusAnnualAutoTitle"),
    plusAnnualAutoNote: $("plusAnnualAutoNote"),
    plusAnnualAutoPrice: $("plusAnnualAutoPrice"),
    plusAnnualAutoBadge: $("plusAnnualAutoBadge"),
    plusAnnualTitle: $("plusAnnualTitle"),
    plusAnnualNote: $("plusAnnualNote"),
    plusAnnualPrice: $("plusAnnualPrice"),
    plusLaunchPrice: $("plusLaunchPrice"),
    plusRegularPrice: $("plusRegularPrice"),
    plusFootnote: $("plusFootnote"),
    plusRenewalDisclosure: $("plusRenewalDisclosure"),
    plusTermsLink: $("plusTermsLink"),
    plusPrivacyLink: $("plusPrivacyLink"),
    plusCta: $("plusCta"),
    plusRestoreBtn: $("plusRestoreBtn"),
    plusCloseBtn: $("plusCloseBtn"),
    supportModal: $("supportModal"),
    supportPanel: $("supportPanel"),
    supportCloseBtn: $("supportCloseBtn"),
    videoChannelModal: $("videoChannelModal"),
    videoChannelPanel: $("videoChannelPanel"),
    videoChannelCloseBtn: $("videoChannelCloseBtn"),
    guidedOverlay: $("guidedOverlay"),
    guidedPanel: $("guidedPanel"),
    guidedImage: $("guidedImage"),
    guidedStage: $("guidedStage"),
    guidedKicker: $("guidedKicker"),
    guidedTitle: $("guidedTitle"),
    guidedText: $("guidedText"),
    guidedStepLabel: $("guidedStepLabel"),
    guidedDots: $("guidedDots"),
    guidedPrevBtn: $("guidedPrevBtn"),
    guidedNextBtn: $("guidedNextBtn"),
    guidedCloseBtn: $("guidedCloseBtn")
  };

  function pngFallback(src) {
    const file = new URL(src, location.href).pathname.split("/").pop().replace(".webp", ".png");
    return location.hostname.endsWith("github.io")
      ? `https://raw.githubusercontent.com/Yonge6/style-atlas/main/assets/styles/${file}`
      : src.replace(".webp", ".png");
  }

  function performanceError(code, message = code) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  const imagePipeline = (() => {
    const maxEntries = 7;
    const entries = new Map();

    function touch(key, entry) {
      entries.delete(key);
      entries.set(key, entry);
      while (entries.size > maxEntries) entries.delete(entries.keys().next().value);
    }

    function decodeSource(src, priority, fallbackUsed = false) {
      const image = new Image();
      const resolvedSource = new URL(src, location.href);
      if (/^https?:$/.test(resolvedSource.protocol) && resolvedSource.origin !== location.origin) {
        image.crossOrigin = "anonymous";
      }
      image.decoding = "async";
      if ("fetchPriority" in image) image.fetchPriority = priority;
      image.src = src;
      const decoded = typeof image.decode === "function"
        ? image.decode()
        : new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", reject, { once: true });
        });
      return decoded.then(() => image).catch((error) => {
        if (!fallbackUsed && /\.webp(?:\?|$)/i.test(src)) {
          return decodeSource(pngFallback(src), priority, true);
        }
        throw performanceError("imageDecodeFailed", error?.message || "Image decode failed");
      });
    }

    function preload(src, { priority = "low" } = {}) {
      const key = new URL(src, location.href).href;
      const existing = entries.get(key);
      if (existing) {
        touch(key, existing);
        return existing.promise;
      }
      const entry = { promise: null };
      entry.promise = decodeSource(src, priority).catch((error) => {
        entries.delete(key);
        throw error;
      });
      touch(key, entry);
      return entry.promise;
    }

    return {
      preload,
      decode: preload,
      has(src) {
        return entries.has(new URL(src, location.href).href);
      },
      evict(src) {
        entries.delete(new URL(src, location.href).href);
      },
      clear() {
        entries.clear();
      },
      size() {
        return entries.size;
      },
      maxEntries
    };
  })();

  const lazyImageObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = entry.target;
        observer.unobserve(image);
        if (image.dataset.src) {
          image.src = image.dataset.src;
          delete image.dataset.src;
        }
      });
    }, { rootMargin: "240px 0px" })
    : null;

  function setImageState(image, state) {
    image.dataset.imageState = state;
    const slot = image.closest(".image-slot");
    if (!slot) return;
    slot.classList.toggle("image-loading", state === "loading");
    slot.classList.toggle("image-loaded", state === "loaded");
    slot.classList.toggle("image-failed", state === "failed");
  }

  function prepareImage(image) {
    if (!(image instanceof HTMLImageElement) || image.dataset.imagePrepared === "true") return;
    image.dataset.imagePrepared = "true";
    setImageState(image, "loading");
    image.addEventListener("load", () => setImageState(image, "loaded"));
    image.addEventListener("error", () => {
      const currentSource = image.currentSrc || image.src || image.dataset.src || "";
      if (image.dataset.fallbackAttempted !== "true" && /\.webp(?:\?|$)/i.test(currentSource)) {
        image.dataset.fallbackAttempted = "true";
        image.src = pngFallback(currentSource);
        delete image.dataset.src;
        return;
      }
      setImageState(image, "failed");
      image.removeAttribute("src");
      delete image.dataset.src;
    });
    if (image.dataset.src) {
      if (lazyImageObserver) lazyImageObserver.observe(image);
      else {
        image.src = image.dataset.src;
        delete image.dataset.src;
      }
    } else if (image.complete) {
      setImageState(image, image.naturalWidth > 0 ? "loaded" : "loading");
    }
  }

  function prepareImages(root = document) {
    if (root instanceof HTMLImageElement) prepareImage(root);
    root.querySelectorAll?.("img.image-managed").forEach(prepareImage);
  }

  function releasePreparedImages(root) {
    if (!lazyImageObserver || !root) return;
    root.querySelectorAll?.("img.image-managed").forEach((image) => lazyImageObserver.unobserve(image));
  }

  function imageMarkup(src, alt, className = "", { eager = false, priority = "low", decorative = false } = {}) {
    const sourceAttribute = eager ? `src="${escapeHtml(src)}"` : `data-src="${escapeHtml(src)}"`;
    const accessibleImage = decorative ? 'alt="" aria-hidden="true"' : `alt="${escapeHtml(alt)}"`;
    return `<img class="image-managed ${className}" ${sourceAttribute} ${accessibleImage} loading="${eager ? "eager" : "lazy"}" decoding="async" fetchpriority="${priority}">`;
  }

  const wikiRequestState = {
    controller: null,
    timer: 0,
    token: 0,
    activeStyleId: "",
    abortedCount: 0
  };

  function abortWikiGallery() {
    clearTimeout(wikiRequestState.timer);
    wikiRequestState.timer = 0;
    if (wikiRequestState.controller && !wikiRequestState.controller.signal.aborted) {
      wikiRequestState.controller.abort();
      wikiRequestState.abortedCount += 1;
    }
    wikiRequestState.controller = null;
    wikiRequestState.activeStyleId = "";
  }

  const exportState = { status: "idle", operationId: 0 };
  const NATIVE_EXPORT_PENDING = Symbol("native-export-pending");
  const nativeAssetRequests = new Map();
  let nativeAssetRequestSequence = 0;

  function updateExportControls() {
    const busy = exportState.status === "preparing" || exportState.status === "sharing";
    document.querySelectorAll("[data-export-control]").forEach((button) => {
      button.disabled = busy;
      button.setAttribute("aria-busy", String(busy));
    });
    const status = $("exportStatus");
    if (status) {
      status.textContent = exportState.status === "preparing"
        ? t("exportStarted")
        : (exportState.status === "sharing" ? t("exportSharing") : "");
    }
  }

  function setExportState(status) {
    exportState.status = status;
    updateExportControls();
    updateAccessibilityDebug();
  }

  function finishExportState(status = "completed") {
    setExportState(status);
    setExportState("idle");
  }

  async function runExportOperation(task, fallbackKey = "saveFailed") {
    if (exportState.status !== "idle") {
      toast(t("exportInProgress"));
      return false;
    }
    exportState.operationId += 1;
    setExportState("preparing");
    toast(t("exportStarted"));
    try {
      const result = await task();
      if (result === NATIVE_EXPORT_PENDING) {
        setExportState("sharing");
        return true;
      }
      finishExportState("completed");
      return true;
    } catch (error) {
      console.error("Style Atlas export failed", error);
      finishExportState("failed");
      if (error?.name === "AbortError") return false;
      const knownCode = ["exportInProgress", "canvasUnavailable", "imageDecodeFailed", "blobCreationFailed"].includes(error?.code)
        ? error.code
        : fallbackKey;
      toast(t(knownCode));
      return false;
    }
  }

  function catName(id, lang = store.lang) {
    const cat = categories.find((item) => item[0] === id);
    return cat ? cat[lang === "zh" ? 1 : 2] : id;
  }

  function related(index) {
    return [1, 2, 3].map((offset) => rawStyles[(index + offset) % rawStyles.length][0]);
  }

  function dailyIndex() {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    let hash = 0;
    for (const char of date) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return hash % styles.length;
  }

  function activeStyle() {
    return styles.find((style) => style.id === store.activeId) || styles[0];
  }

  function styleByOffset(offset) {
    const index = styles.findIndex((style) => style.id === store.activeId);
    return styles[(index + offset + styles.length) % styles.length];
  }

  function isSaved(id) {
    return store.saved.includes(id);
  }

  function saveState() {
    const ok = [
      writeStorage("styleAtlasLang", store.lang),
      writeStorage("styleAtlasSaved", JSON.stringify(store.saved)),
      writeStorage("styleAtlasRecent", JSON.stringify(store.recent))
    ].every(Boolean);
    if (!ok) toast(store.lang === "zh" ? "本地存储不可用，收藏可能无法保留。" : "Local storage is unavailable. Saved styles may not persist.");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function iconMarkup(name, className = "") {
    return `<span class="ui-icon ui-icon-${name}${className ? ` ${className}` : ""}" aria-hidden="true"></span>`;
  }

  function t(key, ...args) {
    const value = text[store.lang][key];
    return typeof value === "function" ? value(...args) : value;
  }

  function prefersReducedMotion() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function accessibleStyleName(style) {
    return style?.name?.[store.lang] || "";
  }

  function savedLabel(style, saved = isSaved(style.id)) {
    return t(saved ? "unsaveStyle" : "saveStyle", accessibleStyleName(style));
  }

  function updateAccessibilityDebug() {
    const panel = $("a11yDebugPanel");
    if (!panel) return;
    const focus = document.activeElement;
    const overlay = !dom.plusModal.hidden
      ? "Plus"
      : (!dom.lightbox.hidden ? "Lightbox" : (!dom.guidedOverlay.hidden ? "Guided Looking" : (store.drawerOpen ? "Drawer" : "None")));
    panel.textContent = [
      `View: ${store.view}`,
      `Focus: ${focus?.id || focus?.tagName || "None"}`,
      `Overlay: ${overlay}`,
      `Reduced Motion: ${prefersReducedMotion()}`,
      `Viewport: ${window.innerWidth} x ${window.innerHeight}`,
      `Safe Area: CSS env()`,
      `Decoded Images: ${imagePipeline.size()} / ${imagePipeline.maxEntries}`,
      `Export: ${exportState.status}`
    ].join("\n");
  }

  function postNativeMessage(type, payload = {}) {
    const handler = window.webkit?.messageHandlers?.styleAtlas;
    if (!handler) return false;
    handler.postMessage({ type, payload });
    return true;
  }

  function hasNativeBridge() {
    return Boolean(window.webkit?.messageHandlers?.styleAtlas);
  }

  function openAppStore() {
    if (store.drawerOpen) setDrawer(false, false);
    if (!dom.plusModal.hidden) closePlus(false);
    window.location.assign(APP_STORE_URL);
  }

  function getSubmissionMode() {
    return window.STYLE_ATLAS_RUNTIME_CONFIG?.submissionMode || "web";
  }

  function isIapMode() {
    return getSubmissionMode() === "iap";
  }

  function isFreeLaunchMode() {
    return getSubmissionMode() === "freeLaunch";
  }

  function isExternalGalleryEnabled() {
    return window.STYLE_ATLAS_RUNTIME_CONFIG?.externalGalleryEnabled !== false;
  }

  function focusableElements(container) {
    return [...container.querySelectorAll("button:not([disabled]):not([hidden]), a[href], input:not([disabled]), [tabindex]:not([tabindex='-1'])")]
      .filter((node) => !node.closest("[inert]") && node.offsetParent !== null);
  }

  function openOverlay(container, focusTarget, returnFocus = null) {
    const intendedReturnFocus = returnFocus || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    if (container !== dom.plusModal && !dom.plusModal.hidden) closePlus(false);
    if (container !== dom.lightbox && !dom.lightbox.hidden) closeImage(false);
    if (container !== dom.guidedOverlay && !dom.guidedOverlay.hidden) closeGuided(false);
    if (container !== dom.supportModal && !dom.supportModal.hidden) closeSupport(false);
    if (container !== dom.videoChannelModal && !dom.videoChannelModal.hidden) closeVideoChannel(false);
    if (store.drawerOpen) setDrawer(false, false);
    store.overlayReturnFocus = intendedReturnFocus;
    store.overlayScrollY = window.scrollY;
    document.body.style.top = `-${store.overlayScrollY}px`;
    dom.appShell.inert = true;
    container.hidden = false;
    document.body.classList.add("drawer-lock");
    requestAnimationFrame(() => {
      (focusTarget || focusableElements(container)[0])?.focus();
      updateAccessibilityDebug();
    });
  }

  function closeOverlay(container, restoreFocus = true) {
    container.hidden = true;
    dom.appShell.inert = false;
    document.body.classList.remove("drawer-lock");
    document.body.style.removeProperty("top");
    window.scrollTo(0, store.overlayScrollY || 0);
    const returnFocus = store.overlayReturnFocus;
    store.overlayReturnFocus = null;
    if (restoreFocus) requestAnimationFrame(() => {
      returnFocus?.focus();
      updateAccessibilityDebug();
    });
    else updateAccessibilityDebug();
  }

  function showPlus(reasonKey = "plusSubtitle") {
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocus = activeElement?.closest("#drawer") ? dom.drawerBtn : activeElement;
    const native = hasNativeBridge();
    const web = !native;
    const iapReady = isIapMode() && native;
    const freeLaunch = isFreeLaunchMode();
    store.plusReasonKey = reasonKey;
    dom.plusTitle.textContent = t("plus");
    dom.plusSubtitle.textContent = freeLaunch ? t("plusFuture") : t(reasonKey);
    $("plusKicker").textContent = t("plus");
    $("plusGentleNote").textContent = freeLaunch ? t("plusFutureBody") : t("unlockBody");
    dom.plusBenefits.innerHTML = t("plusBenefits").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    dom.freePlanTitle.textContent = t("freePlan");
    dom.plusPlanTitle.textContent = t("plusPlan");
    dom.freePlanList.innerHTML = t("freePlanItems").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    dom.plusPlanList.innerHTML = t("plusPlanItems").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const iapDisplayPrices = window.STYLE_ATLAS_RUNTIME_CONFIG?.iapDisplayPrices || {};
    const selectedPlan = store.selectedPlusPlan === "annual" ? "annual" : "annual_auto";
    const selectedPrice = iapDisplayPrices[selectedPlan] || "";
    dom.plusPlanPickerLegend.textContent = t("planPicker");
    dom.plusAnnualAutoTitle.textContent = t("annualAutoTitle");
    dom.plusAnnualAutoNote.textContent = t("annualAutoNote");
    dom.plusAnnualAutoBadge.textContent = t("annualAutoBadge");
    dom.plusAnnualTitle.textContent = t("annualTitle");
    dom.plusAnnualNote.textContent = t("annualNote");
    dom.plusAnnualAutoPrice.textContent = iapDisplayPrices.annual_auto || t("priceLoading");
    dom.plusAnnualPrice.textContent = iapDisplayPrices.annual || t("priceLoading");
    dom.plusPlanPicker.querySelectorAll("input[name='plus-plan']").forEach((input) => {
      input.checked = input.value === selectedPlan;
      input.disabled = !iapReady || hasPlusAccess();
    });
    dom.plusPlanPicker.hidden = freeLaunch || web;
    dom.plusLaunchPrice.textContent = iapReady
      ? `${selectedPrice || t("priceLoading")} / ${store.lang === "zh" ? "年" : "year"}`
      : t("appStorePrice");
    dom.plusRegularPrice.textContent = "";
    dom.plusLaunchPrice.parentElement.hidden = freeLaunch;
    dom.plusRegularPrice.hidden = true;
    dom.plusFootnote.textContent = freeLaunch ? t("plusFutureBody") : (iapReady ? t("iapFootnote") : t("appStoreFootnote"));
    dom.plusRenewalDisclosure.textContent = iapReady
      ? t(selectedPlan === "annual_auto" ? "annualAutoDisclosure" : "annualDisclosure")
      : "";
    dom.plusRenewalDisclosure.hidden = !iapReady;
    dom.plusTermsLink.textContent = t("termsOfUse");
    dom.plusPrivacyLink.textContent = t("privacyPolicy");
    dom.plusCta.hidden = false;
    const storeAction = window.STYLE_ATLAS_RUNTIME_CONFIG?.storeAction || "idle";
    const isStoreBusy = ["purchasing", "restoring", "pending"].includes(storeAction);
    dom.plusCta.textContent = web
      ? t("appStoreCta")
      : (hasPlusAccess()
      ? t("purchaseSuccess")
      : (storeAction === "purchasing"
        ? t("purchaseLoading")
        : (storeAction === "pending"
          ? t("purchasePending")
          : (iapReady ? t(selectedPlan === "annual_auto" ? "subscribePlus" : "buyAnnualPlus") : (freeLaunch ? t("plusFuture") : t("comingSoon"))))));
    dom.plusCta.disabled = web ? false : (hasPlusAccess() || !iapReady || !selectedPrice || isStoreBusy);
    dom.plusRestoreBtn.hidden = !iapReady || hasPlusAccess();
    dom.plusRestoreBtn.textContent = storeAction === "restoring" ? t("restoreLoading") : t("restorePurchases");
    dom.plusRestoreBtn.disabled = isStoreBusy;
    if (dom.plusModal.hidden) openOverlay(dom.plusModal, dom.plusPanel, returnFocus);
  }

  function closePlus(restoreFocus = true) {
    if (dom.plusModal.hidden) return;
    store.plusReasonKey = "";
    closeOverlay(dom.plusModal, restoreFocus);
  }

  function loadDeferredImage(image) {
    if (!image?.src && image?.dataset.src) image.src = image.dataset.src;
  }

  function showSupport() {
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocus = activeElement?.closest("#drawer") ? dom.drawerBtn : activeElement;
    if (store.drawerOpen) setDrawer(false, false);
    loadDeferredImage($("supportImage"));
    if (dom.supportModal.hidden) openOverlay(dom.supportModal, dom.supportPanel, returnFocus);
  }

  function closeSupport(restoreFocus = true) {
    if (dom.supportModal.hidden) return;
    closeOverlay(dom.supportModal, restoreFocus);
  }

  function showVideoChannel() {
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocus = activeElement?.closest("#drawer") ? dom.drawerBtn : activeElement;
    if (store.drawerOpen) setDrawer(false, false);
    loadDeferredImage($("videoChannelImage"));
    if (dom.videoChannelModal.hidden) openOverlay(dom.videoChannelModal, dom.videoChannelPanel, returnFocus);
  }

  function closeVideoChannel(restoreFocus = true) {
    if (dom.videoChannelModal.hidden) return;
    closeOverlay(dom.videoChannelModal, restoreFocus);
  }

  function setStoreActionFromNative(status, errorCode = "", debugMessage = "") {
    const normalized = String(status || "idle");
    const normalizedErrorCode = String(errorCode || "");
    clearTimeout(setStoreActionFromNative.pendingTimer);
    window.STYLE_ATLAS_RUNTIME_CONFIG.storeAction = normalized;
    window.STYLE_ATLAS_RUNTIME_CONFIG.storeErrorCode = normalizedErrorCode;
    const statusKeys = {
      purchasing: "purchaseLoading",
      purchased: "purchaseSuccess",
      pending: "purchasePending",
      cancelled: "purchaseCancelled",
      unavailable: "purchaseUnavailable",
      failed: "purchaseFailed",
      restoring: "restoreLoading",
      restored: "restoreSuccess",
      nothingToRestore: "restoreNone",
      exportComplete: "exportComplete",
      exportFailed: "exportFailed",
      exportCancelled: ""
    };
    const knownErrorCodes = new Set([
      "operationInProgress",
      "productUnavailable",
      "productLoadTimeout",
      "purchaseVerificationFailed",
      "purchaseFailed",
      "restoreFailed",
      "noPurchaseToRestore",
      "transactionUnverified",
      "exportPayloadMissing",
      "exportWriteFailed",
      "presentationUnavailable",
      "exportInProgress",
      "canvasUnavailable",
      "imageDecodeFailed",
      "blobCreationFailed",
      "unknown"
    ]);
    const fallbackErrorKeys = {
      unavailable: "productUnavailable",
      failed: "purchaseFailed",
      nothingToRestore: "noPurchaseToRestore",
      exportFailed: "exportWriteFailed"
    };
    const key = knownErrorCodes.has(normalizedErrorCode)
      ? normalizedErrorCode
      : (normalizedErrorCode ? "unknown" : (statusKeys[normalized] || fallbackErrorKeys[normalized]));
    if (normalized === "exportComplete") {
      toast(t("exportComplete"));
      finishExportState("completed");
    } else if (normalized === "exportFailed") {
      toast(t(key || "exportFailed"));
      finishExportState("failed");
    } else if (normalized === "exportCancelled") {
      finishExportState("idle");
    } else if (key && normalized !== "idle") {
      toast(t(key));
    }
    if (normalized === "pending") {
      setStoreActionFromNative.pendingTimer = setTimeout(() => {
        if (window.STYLE_ATLAS_RUNTIME_CONFIG.storeAction === "pending") {
          setStoreActionFromNative("idle");
        }
      }, 30000);
    }
    if (!dom.plusModal.hidden) showPlus(store.plusReasonKey || "plusSubtitle");
    return normalized;
  }

  function lockedSection(title, preview) {
    return `
      <section class="detail-section locked-section">
        <div class="locked-preview">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(t("lockedPreview"))}</p>
        </div>
        <div class="lock-overlay">
          <span>${t("locked")}</span>
          <strong>${t("unlockTitle")}</strong>
          <p>${t("unlockBody")}</p>
          <button class="copy-btn" type="button" data-action="show-plus">${t("unlockCta")}</button>
        </div>
      </section>
    `;
  }

  function renderExportPanel() {
    const highResReady = canExportHighRes();
    return `
      <section class="detail-section export-section">
        <h2>${t("exportOptions")}</h2>
        <p id="exportStatus" class="export-status" role="status" aria-live="polite"></p>
        <button class="copy-btn" type="button" data-action="save-card" data-export-control>${t("freeExport")}</button>
        ${highResReady ? `
          <p>${t("plusExport")}</p>
          <div class="export-ratios" role="group" aria-label="${t("plusExport")}">
            ${["9:16", "4:5", "1:1", "16:9"].map((ratio) => `<button class="copy-btn plus-export-ready" type="button" data-action="export-ratio" data-ratio="${ratio}" data-export-control>${ratio}</button>`).join("")}
          </div>
        ` : `<button class="copy-btn locked-export" type="button" data-action="plus-export" data-export-control>${t("plusExport")}</button>`}
      </section>
    `;
  }

  function renderDeckCard(style, active = false) {
    const lang = store.lang;
    const saved = isSaved(style.id);
    return `
      ${imageMarkup(style.image, "", "cover-image", { eager: true, priority: active ? "high" : "low", decorative: true })}
      <div class="cover-shade"></div>
      <div class="cover-top">
        <span>#${style.number}</span>
        <div class="card-actions">
          <button class="card-action ${saved ? "saved" : ""}" type="button" data-action="save" data-id="${style.id}" aria-pressed="${saved}" aria-label="${escapeHtml(savedLabel(style, saved))}">${iconMarkup("heart")}</button>
          <button class="card-action" type="button" data-action="copy-prompt" aria-label="${escapeHtml(t("copyStyle", style.name[lang]))}">${iconMarkup("copy")}</button>
          <button class="card-action" type="button" data-action="share" data-export-control aria-label="${escapeHtml(t("shareStyle", style.name[lang]))}">${iconMarkup("share")}</button>
        </div>
      </div>
      <div class="cover-title">
        <h2>${escapeHtml(style.name.en)}</h2>
        <p>${escapeHtml(style.name.zh)}</p>
      </div>
    `;
  }

  function renderDeck() {
    const style = activeStyle();
    releasePreparedImages(dom.deckStage);
    dom.styleDeck.innerHTML = renderDeckCard(style, true);
    dom.prevGhost.innerHTML = renderDeckCard(styleByOffset(-1));
    dom.nextGhost.innerHTML = renderDeckCard(styleByOffset(1));
    [dom.styleDeck, dom.prevGhost, dom.nextGhost].forEach((card) => {
      card.classList.add("image-slot");
      card.dataset.imageLabel = card === dom.styleDeck ? style.name[store.lang] : card.querySelector("img")?.alt || "";
    });
    prepareImages(dom.deckStage);
    imagePipeline.preload(style.image, { priority: "high" }).catch(() => null);
    [-1, 1, -2, 2].forEach((offset) => imagePipeline.preload(styleByOffset(offset).image, { priority: "low" }).catch(() => null));
    dom.deckStage.classList.remove("dragging", "fly-left", "fly-right", "is-animating", "random-out", "random-in");
    dom.styleDeck.style.removeProperty("--drag-x");
    dom.styleDeck.style.removeProperty("--drag-y");
    dom.styleDeck.style.removeProperty("--drag-rotate");
    [dom.prevGhost, dom.nextGhost].forEach((card) => {
      card.style.removeProperty("--ghost-x");
      card.style.removeProperty("--ghost-y");
      card.style.removeProperty("--ghost-rotate");
      card.style.removeProperty("--ghost-scale");
      card.style.removeProperty("--ghost-opacity");
    });
    dom.styleDeck.setAttribute("aria-roledescription", t("styleCardRole"));
    dom.styleDeck.setAttribute("aria-label", t("styleCardLabel", style.name[store.lang], style.summary[store.lang]));
    dom.deckAnnouncement.textContent = t("styleChanged", style.name[store.lang], style.summary[store.lang]);
    updateAccessibilityDebug();
  }

  function renderCard(style, compact = false) {
    const lang = store.lang;
    const saved = isSaved(style.id);
    return `
      <div class="badge-row">
        <div class="badge">#${style.number} · ${escapeHtml(catName(style.category))}<br>${escapeHtml(style.subtitle[lang])}</div>
        <div class="card-actions">
          <button class="card-action ${saved ? "saved" : ""}" type="button" data-action="save" data-id="${style.id}" aria-pressed="${saved}" aria-label="${escapeHtml(savedLabel(style, saved))}">${iconMarkup("heart")}</button>
          <button class="card-action" type="button" data-action="share" data-export-control aria-label="${escapeHtml(t("shareStyle", style.name[lang]))}">${iconMarkup("share")}</button>
        </div>
      </div>
      <div class="visual image-slot" data-image-label="${escapeHtml(style.name[lang])}">
        ${imageMarkup(style.image, style.name[lang], "", { eager: compact, priority: compact ? "high" : "low" })}
        <p class="visual-title">${escapeHtml(style.name.en)}</p>
      </div>
      <h1>${escapeHtml(style.name.en)}</h1>
      <p class="zh-name">${escapeHtml(style.name.zh)}</p>
      <p class="summary">${escapeHtml(style.summary[lang])}</p>
      <div class="chip-row">${style.tags[lang].slice(0, compact ? 3 : 5).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>
      ${compact ? `<div class="overview-actions"><button class="overview-copy-btn" type="button" data-action="copy-overview" aria-label="${escapeHtml(t("copyOverview"))}" title="${escapeHtml(t("copyOverview"))}">${iconMarkup("copy")}</button></div>` : ""}
      ${compact ? "" : `<div class="card-footer"><span>← ${t("swipe")} →</span><button type="button" data-action="detail">${t("detail")}</button></div>`}
    `;
  }

  function renderHome() {
    const style = activeStyle();
    const lang = store.lang;
    dom.todayLabel.textContent = t("today");
    document.querySelector(".brand-primary").textContent = t("headerBrandTitle");
    document.querySelector(".brand-secondary").textContent = t("headerBrandSubtitle");
    $("drawerTitle").textContent = t("drawerTitle");
    dom.randomBtn.innerHTML = `${iconMarkup("shuffle")}<span>${escapeHtml(t("random"))}</span>`;
    dom.randomBtn.setAttribute("aria-label", t("random"));
    dom.categoryTitle.textContent = t("categories");
    renderDeck();
    releasePreparedImages(dom.categoryChips);
    dom.categoryChips.innerHTML = categories.map((cat) => {
      const categoryStyles = styles.filter((item) => item.category === cat[0]);
      const preview = categoryStyles.slice(0, 3).map((item) => imageMarkup(item.image, "", "", { decorative: true })).join("");
      return `
        <button class="category-card" type="button" data-filter="${cat[0]}">
          <span class="category-copy">
            <strong>${escapeHtml(catName(cat[0]))}</strong>
            <small>${escapeHtml(t("styleCount", categoryStyles.length))}</small>
          </span>
          <span class="category-stack image-slot" data-image-label="${escapeHtml(catName(cat[0]))}">${preview}</span>
        </button>
      `;
    }).join("");
    prepareImages(dom.categoryChips);
  }

  function detailSectionNav(locked = false) {
    const targets = ["detail-see", "detail-understand", "detail-apply", "detail-create", "detail-explore"];
    return `
      <nav class="detail-section-nav" aria-label="${escapeHtml(t("detailSectionNav"))}">
        ${t("detailSections").map((label, index) => {
          const plusLocked = locked && index > 0;
          return `
          <button class="${plusLocked ? "plus-locked" : ""}" type="button" data-action="${plusLocked ? "show-plus" : "jump-detail-section"}" ${plusLocked ? "" : `data-target="${targets[index]}"`} aria-label="${escapeHtml(plusLocked ? `${label} · Plus` : label)}" aria-current="${index === 0 ? "true" : "false"}">
            <span class="detail-nav-label">${escapeHtml(label)}</span>
            <span class="detail-nav-arrow" aria-hidden="true">${plusLocked ? iconMarkup("lock") : iconMarkup("chevron-right")}</span>
            <small>${escapeHtml(t("detailSectionHints")[index])}</small>
          </button>
        `;
        }).join("")}
      </nav>
    `;
  }

  function renderLockedArchive(style, guide) {
    const lang = store.lang;
    const cues = recognitionItems(style, guide).slice(0, 3);
    const profileKeys = ["order", "color", "ornament", "emotion"];
    const comparisons = guide.comparisons
      .map((item) => ({ item, style: stylesById.get(item.styleId) }))
      .filter(({ style: comparisonStyle }) => comparisonStyle)
      .slice(0, 2);
    return `
      <section id="detail-understand" class="detail-section locked-archive-gate" aria-labelledby="lockedArchiveTitle">
        <div class="locked-gate-head">
          <span class="locked-gate-mark" aria-hidden="true">PLUS</span>
          <h2 id="lockedArchiveTitle">${escapeHtml(t("lockedArchiveTitle", style.name[lang]))}</h2>
          <p>${escapeHtml(t("lockedArchiveBody"))}</p>
        </div>
        <div class="locked-preview-flow">
          <section class="locked-preview-chapter locked-observation-preview">
            <header>
              <span aria-hidden="true">01</span>
              <div><h3>${escapeHtml(t("lockedObservationTitle"))}</h3><p>${escapeHtml(t("lockedObservationNote"))}</p></div>
              <small>${escapeHtml(t("lockedMore"))}${iconMarkup("lock")}</small>
            </header>
            <div class="locked-observation-body">
              <div class="locked-preview-image image-slot" data-image-label="${escapeHtml(style.name[lang])}">
                ${imageMarkup(style.image, "", "", { decorative: true })}
              </div>
              <ol>
                ${cues.map((cue) => `<li><strong>${escapeHtml(cue.title)}</strong><p>${escapeHtml(cue.text)}</p></li>`).join("")}
              </ol>
            </div>
          </section>
          <section class="locked-preview-chapter locked-profile-preview">
            <header>
              <span aria-hidden="true">02</span>
              <div><h3>${escapeHtml(t("lockedProfileTitle"))}</h3><p>${escapeHtml(t("lockedProfileNote"))}</p></div>
              <small>${escapeHtml(t("lockedMore"))}${iconMarkup("lock")}</small>
            </header>
            <div class="locked-profile-grid">
              ${profileKeys.map((key, index) => {
                const item = guide.profile?.[key];
                return `
                  <div class="locked-profile-item">
                    <strong>${escapeHtml(t("profileLabels")[index])}</strong>
                    <span>${escapeHtml(item?.[lang] || t("lockedValueHidden"))}</span>
                    <div class="profile-scale" aria-hidden="true">
                      ${Array.from({ length: 5 }, (_, scaleIndex) => `<i class="${item && scaleIndex < item.level ? "active" : ""}"></i>`).join("")}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </section>
          <section class="locked-preview-chapter locked-comparison-preview">
            <header>
              <span aria-hidden="true">03</span>
              <div><h3>${escapeHtml(t("lockedComparisonTitle"))}</h3><p>${escapeHtml(t("lockedComparisonNote"))}</p></div>
              <small>${escapeHtml(t("lockedMore"))}${iconMarkup("lock")}</small>
            </header>
            <div class="locked-comparison-list">
              ${comparisons.map(({ item, style: comparisonStyle }) => `
                <article>
                  <div class="locked-comparison-image image-slot" data-image-label="${escapeHtml(comparisonStyle.name[lang])}">
                    ${imageMarkup(comparisonStyle.image, "", "", { decorative: true })}
                  </div>
                  <div>
                    <strong>${escapeHtml(comparisonStyle.name[lang])}</strong>
                    <small>${escapeHtml(comparisonStyle.name[lang === "zh" ? "en" : "zh"])}</small>
                    <p>${escapeHtml(item.similarity?.[lang] || comparisonStyle.summary[lang])}</p>
                  </div>
                </article>
              `).join("")}
            </div>
          </section>
        </div>
        <button class="plus-gate-cta" type="button" data-action="show-plus">
          <span>${escapeHtml(t("lockedOpenArchive"))}</span>${iconMarkup("arrow-right")}
        </button>
        <small>${escapeHtml(t("lockedArchiveNote"))}</small>
      </section>
    `;
  }

  function recognitionItems(style, guide) {
    const lang = store.lang;
    const items = guide.observe.map((item) => ({
      title: item.label[lang],
      text: item.text[lang]
    }));
    if (!guide.enhanced) {
      localizedList(style.lookFor).forEach((text, index) => {
        if (items.length >= 5) return;
        if (items.some((item) => item.text === text || item.title === text)) return;
        items.push({
          title: store.lang === "zh" ? `识别线索 ${index + 1}` : `Recognition cue ${index + 1}`,
          text
        });
      });
    }
    return items.filter((item) => item.title && item.text).slice(0, 5);
  }

  function renderRecognition(style, guide) {
    return `
      <section id="detail-understand" class="detail-section aesthetic-section recognize-section" aria-labelledby="recognizeTitle">
        <p class="section-kicker">${escapeHtml(t("detailSections")[1])}</p>
        <h2 id="recognizeTitle">${escapeHtml(t("recognizeTitle"))}</h2>
        <div class="recognition-grid">
          ${recognitionItems(style, guide).map((item, index) => `
            <article class="observation-card">
              <span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderProfile(guide) {
    if (!guide.profile) {
      return `
        <section class="detail-section aesthetic-section profile-pending">
          <h2>${escapeHtml(t("profileTitle"))}</h2>
          <p>${escapeHtml(t("profilePending"))}</p>
        </section>
      `;
    }
    const lang = store.lang;
    const keys = ["order", "color", "ornament", "emotion"];
    return `
      <section class="detail-section aesthetic-section profile-section">
        <h2>${escapeHtml(t("profileTitle"))}</h2>
        <p class="profile-note">${escapeHtml(t("profileNote"))}</p>
        <div class="profile-grid">
          ${keys.map((key, index) => {
            const item = guide.profile[key];
            return `
              <div class="profile-row">
                <div>
                  <strong>${escapeHtml(t("profileLabels")[index])}</strong>
                  <span>${escapeHtml(item[lang])}</span>
                </div>
                <div class="profile-scale" role="img" aria-label="${escapeHtml(store.lang === "zh"
                  ? `${t("profileLabels")[index]}：${item[lang]}。观察强度第 ${item.level} 级，共 5 级，不代表好坏`
                  : `${t("profileLabels")[index]}: ${item[lang]}. Observation level ${item.level} of 5, not a score`)}">
                  ${Array.from({ length: 5 }, (_, scaleIndex) => `<i class="${scaleIndex < item.level ? "active" : ""}" aria-hidden="true"></i>`).join("")}
                </div>
                <small class="profile-hint">${escapeHtml(t("profileScaleHints")[index])}</small>
              </div>
            `;
          }).join("")}
        </div>
        <div class="feeling-words" aria-label="${escapeHtml(store.lang === "zh" ? "感受词" : "Feeling words")}">
          ${localizedList(guide.feelingWords).map((word) => `<span>${escapeHtml(word)}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderWhyItFeels(style, guide, locked) {
    const lang = store.lang;
    const observation = locked ? guide.openingQuestion[lang] : style.curatorNote[lang];
    const mechanism = locked ? style.summary[lang] : style.why[lang];
    return `
      <section class="detail-section aesthetic-section why-feels">
        <h2>${escapeHtml(t("whyFeelTitle"))}</h2>
        <div class="why-block">
          <h3>${escapeHtml(t("curatorObservation"))}</h3>
          <p>${escapeHtml(observation)}</p>
        </div>
        <div class="why-block">
          <h3>${escapeHtml(t("formationMechanism"))}</h3>
          <p>${escapeHtml(mechanism)}</p>
        </div>
        <blockquote>
          <strong>${escapeHtml(t("rememberSentence"))}</strong>
          <p>${escapeHtml(style.memoryAnchor[lang])}</p>
        </blockquote>
      </section>
    `;
  }

  function renderEveryday(guide) {
    const lang = store.lang;
    return `
      <section id="detail-apply" class="detail-section aesthetic-section everyday-section" aria-labelledby="everydayTitle">
        <p class="section-kicker">${escapeHtml(t("detailSections")[2])}</p>
        <h2 id="everydayTitle">${escapeHtml(t("everydayTitle"))}</h2>
        <div class="everyday-grid">
          ${guide.everydayLife.filter((item) => item.scene?.[lang]).map((item, index) => `
            <article>
              <span class="everyday-icon" aria-hidden="true">${iconMarkup(["house", "shirt", "camera", "package"][index] || "package")}</span>
              <h3>${escapeHtml(item.scene[lang])}</h3>
              ${item.text?.[lang] ? `<p>${escapeHtml(item.text[lang])}</p>` : ""}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderComparisons(guide) {
    const lang = store.lang;
    const comparisons = guide.comparisons.map((item) => ({ item, style: stylesById.get(item.styleId) })).filter(({ style }) => style);
    if (!comparisons.length) return "";
    return `
      <section id="detail-compare" class="detail-section aesthetic-section comparison-section">
        <h2>${escapeHtml(t("compareTitle"))}</h2>
        <div class="comparison-list">
          ${comparisons.map(({ item, style }) => `
            <article class="comparison-card">
              <button class="comparison-open image-slot" type="button" data-action="open-style" data-id="${style.id}" data-return-section="detail-compare" data-image-label="${escapeHtml(style.name[lang])}">
                ${imageMarkup(style.image, "", "", { decorative: true })}
                <span><strong>${escapeHtml(style.name[lang])}</strong><small>${escapeHtml(style.name[lang === "zh" ? "en" : "zh"])}</small></span>
              </button>
              ${item.similarity?.[lang] ? `<p><strong>${escapeHtml(t("similarityLabel"))}</strong>${escapeHtml(item.similarity[lang])}</p>` : `<p>${escapeHtml(style.summary[lang])}</p>`}
              ${item.difference?.[lang] ? `<p><strong>${escapeHtml(t("differenceLabel"))}</strong>${escapeHtml(item.difference[lang])}</p>` : ""}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderPromptSection(style, locked) {
    const lang = store.lang;
    const sectionHeading = `
      <p class="section-kicker">${escapeHtml(t("detailSections")[3])}</p>
      <h2 id="createTitle">${escapeHtml(t("createTitle"))}</h2>
    `;
    if (locked) {
      return `
        <section class="detail-section prompt-section locked-section">
          ${sectionHeading}
          <div class="locked-preview" aria-hidden="true" inert>
            <p>${escapeHtml(t("lockedPreview"))}</p>
          </div>
          <div class="lock-overlay">
            <span>${escapeHtml(t("locked"))}</span>
            <strong>${escapeHtml(t("unlockTitle"))}</strong>
            <p>${escapeHtml(t("unlockBody"))}</p>
            <button class="copy-btn" type="button" data-action="show-plus">${escapeHtml(t("unlockCta"))}</button>
          </div>
        </section>
      `;
    }
    return `
      <section class="detail-section prompt-section">
        ${sectionHeading}
        <div class="prompt-box">${escapeHtml(style.imagePrompts[lang])}<br><br>${escapeHtml(style.negativePrompt[lang])}</div>
        <div class="prompt-actions">
          <button class="copy-btn" type="button" data-action="copy-prompt">${escapeHtml(t("copyPrompt"))}</button>
        </div>
      </section>
    `;
  }

  function renderAccordion(id, title, content, expanded = false) {
    return `
      <section class="deep-accordion">
        <h3>
          <button type="button" data-action="toggle-accordion" aria-expanded="${expanded}" aria-controls="${id}">
            <span>${escapeHtml(title)}</span>${iconMarkup("chevron-down", "accordion-chevron")}
          </button>
        </h3>
        <div id="${id}" class="deep-accordion-panel" ${expanded ? "" : "hidden"}>${content}</div>
      </section>
    `;
  }

  function renderExplore(style, locked) {
    const lang = store.lang;
    if (locked) {
      return `
        <section id="detail-explore" class="detail-section explore-section locked-section" aria-labelledby="exploreTitle">
          <div class="locked-preview" aria-hidden="true" inert>
            <p class="section-kicker">${escapeHtml(t("detailSections")[4])}</p>
            <h2 id="exploreTitle">${escapeHtml(t("exploreTitle"))}</h2>
            <p>${escapeHtml(style.history[lang])}</p>
          </div>
          <div class="lock-overlay">
            <span>${escapeHtml(t("locked"))}</span>
            <strong>${escapeHtml(t("unlockTitle"))}</strong>
            <p>${escapeHtml(t("unlockBody"))}</p>
            <button class="copy-btn" type="button" data-action="show-plus">${escapeHtml(t("unlockCta"))}</button>
          </div>
        </section>
      `;
    }
    const base = style.id.replace(/[^a-z0-9-]/gi, "");
    return `
      <section id="detail-explore" class="detail-section explore-section" aria-labelledby="exploreTitle">
        <p class="section-kicker">${escapeHtml(t("detailSections")[4])}</p>
        <h2 id="exploreTitle">${escapeHtml(t("exploreTitle"))}</h2>
        <div class="deep-accordions">
          ${renderAccordion(`${base}-history`, t("accordionHistory"), `<p>${escapeHtml(style.history[lang])}</p>`, true)}
          ${renderAccordion(`${base}-people`, t("accordionPeople"), `<div class="chip-row">${style.people[lang].map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>`)}
          ${renderAccordion(`${base}-references`, t("accordionReferences"), `<ul class="detail-list">${style.references[lang].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`)}
          ${renderAccordion(`${base}-gallery`, t("accordionGallery"), `<div class="gallery-grid" id="galleryGrid"></div><p class="gallery-note">${escapeHtml(store.lang === "zh" ? "公开图库是可选补充；离线时不影响其余内容。" : "The public gallery is optional context; the rest remains available offline.")}</p>`)}
          ${renderAccordion(`${base}-context`, t("accordionContext"), `<p>${escapeHtml(style.curatorNote[lang])}</p><p>${escapeHtml(style.why[lang])}</p>`)}
        </div>
      </section>
    `;
  }

  function renderDetail() {
    flushAllReflections();
    abortWikiGallery();
    releasePreparedImages(dom.detailContent);
    const style = activeStyle();
    const lang = store.lang;
    const locked = isStyleLocked(style);
    const guide = guideFor(style);
    const saved = isSaved(style.id);
    addRecent(style.id);
    store.activeDetailSection = "see";

    dom.detailContent.innerHTML = `
      <section id="detail-see" class="detail-hero style-card" aria-labelledby="detailTitle">
        <div class="badge-row">
          <div class="badge">#${style.number} · ${escapeHtml(catName(style.category))}<br>${escapeHtml(style.subtitle[lang])}</div>
          <div class="card-actions">
            <button class="card-action ${saved ? "saved" : ""}" type="button" data-action="save" data-id="${style.id}" aria-pressed="${saved}" aria-label="${escapeHtml(savedLabel(style, saved))}">${iconMarkup("heart")}</button>
            <button class="card-action" type="button" data-action="share" data-export-control aria-label="${escapeHtml(t("shareStyle", style.name[lang]))}">${iconMarkup("share")}</button>
          </div>
        </div>
        <div class="visual image-slot" data-image-label="${escapeHtml(style.name[lang])}">
          <button class="hero-image-button" type="button" data-action="open-image" aria-label="${escapeHtml(`${t("imagePreview")}：${style.name[lang]}`)}">
            ${imageMarkup(style.image, style.name[lang], "", { eager: true, priority: "high" })}
          </button>
        </div>
        <div class="detail-hero-copy">
          <h1 id="detailTitle">${escapeHtml(style.name[lang])}</h1>
          <p class="zh-name alternate-name">${escapeHtml(style.name[lang === "zh" ? "en" : "zh"])}</p>
          <p class="summary">${escapeHtml(style.summary[lang])}</p>
          ${locked ? `<div class="chip-row">${style.tags[lang].slice(0, 3).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
          <div class="hero-copy-actions">
            <button class="overview-copy-btn" type="button" data-action="copy-overview" aria-label="${escapeHtml(t("copyOverview"))}" title="${escapeHtml(t("copyOverview"))}">${iconMarkup("copy")}</button>
          </div>
        </div>
      </section>
      ${detailSectionNav(locked)}
      ${locked ? "" : `<section class="detail-section detail-see-tools" aria-label="${escapeHtml(t("detailSections")[0])}">
        <div class="memory-anchor">
          <span>${escapeHtml(t("rememberInOneLine"))}</span>
          <p>${escapeHtml(style.memoryAnchor[lang])}</p>
        </div>
        <div class="chip-row">${style.tags[lang].slice(0, 3).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="hero-actions">
          <button class="guided-entry" type="button" data-action="open-guided"><span>${escapeHtml(t("guidedEntry"))}</span>${iconMarkup("arrow-right")}</button>
        </div>
      </section>`}
      ${locked ? renderLockedArchive(style, guide) : `
        ${renderRecognition(style, guide)}
        ${renderProfile(guide)}
        ${renderWhyItFeels(style, guide, false)}
        ${renderEveryday(guide)}
        ${renderComparisons(guide)}
        <section id="detail-create" class="detail-create-group" aria-labelledby="createTitle">
          ${renderPromptSection(style, false)}
          ${renderExportPanel()}
        </section>
        ${renderExplore(style, false)}
        <section class="detail-section similar-section">
          <h2>${escapeHtml(t("similar"))}</h2>
          <div class="result-list">${style.relatedStyles.filter((id) => validStyleIds.has(id)).slice(0, 4).map((id) => resultCard(stylesById.get(id))).join("")}</div>
        </section>
      `}
    `;
    prepareImages(dom.detailContent);
    observeDetailSections();
    imagePipeline.preload(style.image, { priority: "high" }).catch(() => null);
    updateExportControls();
    if (!locked) loadWikiGallery(style);
  }

  function guidedStages(style) {
    const lang = store.lang;
    const guide = guideFor(style);
    const observeStages = guide.observe.slice(0, 3).map((item, index) => ({
      title: [t("guidedFirst"), t("guidedSecond"), t("guidedThird")][index],
      kicker: item.label[lang],
      text: item.text[lang],
      button: t("guidedContinue"),
      focus: normalizedFocus(item.focus)
    }));
    return [
      {
        title: t("guidedOpening"),
        kicker: style.name[lang],
        text: guide.openingQuestion[lang],
        button: t("guidedLooked"),
        focus: normalizedFocus(guide.openingFocus)
      },
      ...observeStages,
      {
        title: t("guidedComplete"),
        kicker: t("rememberInOneLine"),
        text: style.memoryAnchor[lang],
        button: t("guidedBack"),
        focus: normalizedFocus(guide.closingFocus)
      }
    ];
  }

  function renderGuidedStage() {
    const stages = guidedStages(activeStyle());
    const stageIndex = Math.min(store.guidedStage, stages.length - 1);
    const stage = stages[stageIndex];
    dom.guidedStage.dataset.stage = String(stageIndex);
    dom.guidedStage.dataset.total = String(stages.length);
    dom.guidedStepLabel.textContent = t("guidedStep", stageIndex + 1, stages.length);
    dom.guidedDots.innerHTML = stages.map((_, index) => `<i class="${index === stageIndex ? "active" : ""}" aria-hidden="true"></i>`).join("");
    dom.guidedKicker.textContent = stage.kicker;
    dom.guidedTitle.textContent = stage.title;
    dom.guidedText.textContent = stage.text;
    dom.guidedPrevBtn.textContent = t("previousGuided");
    dom.guidedPrevBtn.hidden = stageIndex === 0;
    dom.guidedNextBtn.textContent = stage.button;
    const focus = normalizedFocus(stage.focus);
    dom.guidedImage.classList.toggle("has-focus", Boolean(focus));
    if (focus) {
      dom.guidedImage.style.setProperty("--focus-x", `${focus.x}%`);
      dom.guidedImage.style.setProperty("--focus-y", `${focus.y}%`);
      dom.guidedImage.style.setProperty("--focus-scale", String(focus.scale));
    } else {
      dom.guidedImage.style.removeProperty("--focus-x");
      dom.guidedImage.style.removeProperty("--focus-y");
      dom.guidedImage.style.removeProperty("--focus-scale");
    }
  }

  function openGuided(returnFocus = null, stage = 0) {
    const style = activeStyle();
    const stages = guidedStages(style);
    store.guidedStage = clamp(Number.isFinite(Number(stage)) ? Number(stage) : 0, 0, stages.length - 1);
    dom.guidedImage.src = style.image;
    dom.guidedImage.alt = "";
    dom.guidedImage.setAttribute("aria-hidden", "true");
    renderGuidedStage();
    imagePipeline.preload(style.image, { priority: "high" }).catch(() => null);
    openOverlay(dom.guidedOverlay, dom.guidedPanel, returnFocus);
  }

  function nextGuided() {
    const stages = guidedStages(activeStyle());
    if (store.guidedStage >= stages.length - 1) {
      closeGuided();
      return;
    }
    store.guidedStage += 1;
    renderGuidedStage();
    dom.guidedTitle.focus?.({ preventScroll: true });
  }

  function previousGuided() {
    if (store.guidedStage <= 0) return;
    store.guidedStage -= 1;
    renderGuidedStage();
    dom.guidedTitle.focus?.({ preventScroll: true });
  }

  function closeGuided(restoreFocus = true) {
    if (dom.guidedOverlay.hidden) return;
    closeOverlay(dom.guidedOverlay, restoreFocus);
  }

  function writeReflection(styleId, text) {
    if (!validStyleIds.has(styleId)) return false;
    const reflections = readReflections();
    const normalized = String(text || "").slice(0, 300);
    if (normalized) {
      reflections[styleId] = { text: normalized, updatedAt: new Date().toISOString() };
    } else {
      delete reflections[styleId];
    }
    return writeStorage(REFLECTIONS_KEY, JSON.stringify(reflections));
  }

  function setReflectionStatus(styleId, key) {
    const status = dom.detailContent.querySelector(`[data-reflection-status="${CSS.escape(styleId)}"]`);
    if (status) status.textContent = key ? t(key) : "";
  }

  function flushReflection(styleId) {
    const pending = store.reflectionTimers.get(styleId);
    if (!pending) return true;
    clearTimeout(pending.timer);
    store.reflectionTimers.delete(styleId);
    const ok = writeReflection(styleId, pending.text);
    setReflectionStatus(styleId, ok ? "reflectionSaved" : "reflectionStorageUnavailable");
    return ok;
  }

  function flushAllReflections() {
    [...store.reflectionTimers.keys()].forEach(flushReflection);
  }

  function scheduleReflectionSave(styleId, text) {
    if (!validStyleIds.has(styleId)) return;
    const existing = store.reflectionTimers.get(styleId);
    if (existing) clearTimeout(existing.timer);
    const timer = setTimeout(() => flushReflection(styleId), 450);
    store.reflectionTimers.set(styleId, { text, timer });
  }

  function clearReflection(styleId) {
    flushReflection(styleId);
    writeReflection(styleId, "");
    const textarea = dom.detailContent.querySelector(`[data-reflection-id="${CSS.escape(styleId)}"]`);
    if (textarea) {
      textarea.value = "";
      textarea.focus();
    }
    setReflectionStatus(styleId, "reflectionCleared");
    toast(t("reflectionCleared"));
  }

  function jumpToDetailSection(targetId, button) {
    const target = $(targetId);
    if (!target) return;
    dom.detailContent.querySelectorAll(".detail-section-nav button").forEach((item) => item.setAttribute("aria-current", String(item === button)));
    store.activeDetailSection = targetId.replace("detail-", "");
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  function updateCurrentDetailSection() {
    const targets = ["detail-see", "detail-understand", "detail-apply", "detail-create", "detail-explore"]
      .map((id) => $(id))
      .filter(Boolean);
    if (!targets.length) return;
    const anchor = 140;
    const candidate = targets
      .map((target) => ({ target, rect: target.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > anchor)
      .sort((a, b) => Math.abs(a.rect.top - anchor) - Math.abs(b.rect.top - anchor))[0];
    if (!candidate) return;
    const targetId = candidate.target.id;
    store.activeDetailSection = targetId.replace("detail-", "");
    dom.detailContent.querySelectorAll(".detail-section-nav button").forEach((button) => {
      button.setAttribute("aria-current", String(button.dataset.target === targetId));
    });
  }

  function observeDetailSections() {
    store.detailSectionObserver?.disconnect();
    if (typeof IntersectionObserver !== "function") return;
    store.detailSectionObserver = new IntersectionObserver(updateCurrentDetailSection, {
      rootMargin: "-128px 0px -65% 0px",
      threshold: [0, 0.01]
    });
    ["detail-see", "detail-understand", "detail-apply", "detail-create", "detail-explore"]
      .map((id) => $(id))
      .filter(Boolean)
      .forEach((target) => store.detailSectionObserver.observe(target));
    updateCurrentDetailSection();
  }

  function toggleAccordion(button) {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? $(panelId) : null;
    if (!panel) return;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    if (!expanded) prepareImages(panel);
  }

  async function loadWikiGallery(style) {
    if (!isExternalGalleryEnabled()) return;
    const gallery = $("galleryGrid");
    if (!gallery) return;
    abortWikiGallery();
    const controller = new AbortController();
    const token = ++wikiRequestState.token;
    wikiRequestState.controller = controller;
    wikiRequestState.activeStyleId = style.id;
    wikiRequestState.timer = setTimeout(() => controller.abort(), 8000);
    try {
      const params = new URLSearchParams({
        action: "query",
        format: "json",
        origin: "*",
        prop: "pageimages|info",
        inprop: "url",
        pithumbsize: "700",
        titles: style.wikiTitles.join("|")
      });
      const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`, { signal: controller.signal });
      if (!response.ok || controller.signal.aborted || token !== wikiRequestState.token || style.id !== activeStyle().id) return;
      const data = await response.json();
      if (controller.signal.aborted || token !== wikiRequestState.token || style.id !== activeStyle().id || !gallery.isConnected) return;
      const pages = Object.values(data.query?.pages || {})
        .filter((page) => page.thumbnail?.source && page.fullurl)
        .slice(0, 4);
      gallery.insertAdjacentHTML("beforeend", pages.map((page) => `
        <figure class="gallery-item image-slot" data-image-label="${escapeHtml(page.title)}">
          <button class="gallery-open" type="button" data-action="open-image" aria-label="${escapeHtml(t("imagePreview"))}：${escapeHtml(page.title)}">
            ${imageMarkup(page.thumbnail.source, page.title)}
          </button>
          <figcaption><a href="${escapeHtml(page.fullurl)}" target="_blank" rel="noreferrer">${escapeHtml(page.title)}</a></figcaption>
        </figure>
      `).join(""));
      prepareImages(gallery);
    } catch (error) {
      if (error?.name === "AbortError") return;
      // External images are bonus context; the detail page must still work offline.
    } finally {
      if (token === wikiRequestState.token) {
        clearTimeout(wikiRequestState.timer);
        wikiRequestState.timer = 0;
        wikiRequestState.controller = null;
        wikiRequestState.activeStyleId = "";
      }
    }
  }

  function resultCard(style) {
    const lang = store.lang;
    const saved = isSaved(style.id);
    return `
      <article class="result-card" data-style="${style.id}">
        <button class="result-open" type="button" data-action="open-style" data-id="${style.id}" aria-label="${escapeHtml(t("openStyle"))}：${escapeHtml(style.name[lang])}">
          <span class="thumb-slot image-slot" data-image-label="${escapeHtml(style.name[lang])}">${imageMarkup(style.image, "", "thumb", { decorative: true })}</span>
          <span>
            <h3>${escapeHtml(style.name[lang])}</h3>
            <p>${escapeHtml(style.summary[lang])}</p>
          </span>
        </button>
        <button class="card-action ${saved ? "saved" : ""}" type="button" data-action="save-row" data-id="${style.id}" aria-pressed="${saved}" aria-label="${escapeHtml(savedLabel(style, saved))}">${iconMarkup("heart")}</button>
      </article>
    `;
  }

  function renderSearch() {
    const lang = store.lang;
    dom.searchLabel.textContent = t("search");
    dom.searchInput.placeholder = lang === "zh" ? "瑞士、Ukiyo-e、海报、复古..." : "Swiss, Ukiyo-e, poster, retro...";
    dom.filterChips.innerHTML = categories.map((cat) => `<button class="chip ${store.filter === cat[0] ? "active" : ""}" type="button" data-filter="${cat[0]}" aria-pressed="${store.filter === cat[0]}">${escapeHtml(catName(cat[0]))}</button>`).join("");

    const query = store.query.trim().toLowerCase();
    const score = (style) => {
      if (!query) return 0;
      const names = [style.name.zh, style.name.en, style.pinyin].map((item) => item.toLowerCase());
      if (names.includes(query)) return 0;
      if (names.some((name) => name.includes(query))) return 1;
      return 2;
    };
    const results = styles.filter((style) => {
      const haystack = [
        style.name.zh,
        style.name.en,
        style.pinyin,
        style.keywords,
        style.tags.zh.join(" "),
        style.tags.en.join(" "),
        style.summary.zh,
        style.summary.en,
        catName(style.category, "zh"),
        catName(style.category, "en"),
        style.searchAliases.join(" ")
      ].join(" ").toLowerCase();
      return (!store.filter || style.category === store.filter) && (!query || haystack.includes(query));
    }).sort((a, b) => score(a) - score(b));

    releasePreparedImages(dom.searchResults);
    dom.searchResults.classList.toggle("gallery-grid", !query && !store.filter);
    dom.searchResults.innerHTML = results.length ? results.map(resultCard).join("") : `<p class="empty">${t("empty")}</p>`;
    dom.searchResultsTitle.textContent = t("searchResults", results.length);
    prepareImages(dom.searchResults);
  }

  function renderSaved() {
    const savedStyles = store.saved.map((id) => styles.find((style) => style.id === id)).filter(Boolean);
    dom.savedCount.textContent = t("saved", savedStyles.length);
    dom.savedResultsTitle.textContent = t("savedResults", savedStyles.length);
    dom.copyListBtn.textContent = t("copyList");
    dom.copyListBtn.disabled = savedStyles.length === 0;
    releasePreparedImages(dom.savedList);
    dom.savedList.innerHTML = savedStyles.length ? savedStyles.map(resultCard).join("") : `<p class="empty">${t("savedEmpty")}</p>`;
    prepareImages(dom.savedList);
  }

  function renderAbout() {
    dom.aboutContent.innerHTML = `
      <section class="detail-section about-hero">
        <h1>${escapeHtml(t("aboutTitle"))}</h1>
        ${t("aboutBody").split("\n\n").map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </section>
      <section class="detail-section">
        <h2>${store.lang === "zh" ? "产品定位" : "Positioning"}</h2>
        <p>${escapeHtml(t("positioning"))}</p>
        <p>${escapeHtml(t("valueLine"))}</p>
      </section>
      <section class="detail-section">
        <h2>${store.lang === "zh" ? "适合谁使用" : "Who It Is For"}</h2>
        <p>${escapeHtml(t("aboutFor"))}</p>
      </section>
      <section class="detail-section app-feature-section">
        <h2>${escapeHtml(t("appFeaturesTitle"))}</h2>
        <ul class="app-feature-list">
          ${t("appFeatures").map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <p>${escapeHtml(t("downloadAppNote"))}</p>
        <a class="copy-btn app-store-link" href="${APP_STORE_URL}" target="_blank" rel="noopener">${escapeHtml(t("downloadOnAppStore"))}<span aria-hidden="true">↗</span></a>
      </section>
      <section class="detail-section">
        <h2>${store.lang === "zh" ? "免费版能做什么" : "What Free Includes"}</h2>
        <p>${escapeHtml(t("aboutFree"))}</p>
      </section>
      <section class="detail-section">
        <h2>${store.lang === "zh" ? "虾子曰艺术风格图鉴 Plus" : "Xiazishuo Style Atlas Plus"}</h2>
        <p>${escapeHtml(isFreeLaunchMode() ? `${t("plusFutureBody")} ${t("aboutPlus")}` : t("aboutPlus"))}</p>
      </section>
      <section class="detail-section">
        <h2>${escapeHtml(t("safetyTitle"))}</h2>
        <p>${escapeHtml(t("safetyBody"))}</p>
      </section>
    `;
  }

  function renderScreenshots() {
    const lang = store.lang;
    const featured = [styles[38], styles[0], styles[2], styles[60], styles[35], styles[99]].filter(Boolean);
    releasePreparedImages(dom.screenshotsContent);
    dom.screenshotsContent.innerHTML = `
      <section class="screenshot-head">
        <p>${escapeHtml(t("productName"))}</p>
        <h1>${escapeHtml(t("screenshotsTitle"))}</h1>
        <span>${escapeHtml(t("valueLine"))}</span>
      </section>
      <div class="screenshot-grid">
        ${screenshotSlides().map((slide, index) => {
          const style = featured[index] || styles[index];
          return `
            <article class="screenshot-card shot-${index + 1}">
              <div class="shot-copy">
                <strong>${escapeHtml(slide[0])}</strong>
                <span>${escapeHtml(slide[1])}</span>
              </div>
              ${screenshotMock(index, style, lang)}
              <small>${escapeHtml(t("productName"))}</small>
            </article>
          `;
        }).join("")}
      </div>
    `;
    prepareImages(dom.screenshotsContent);
  }

  function screenshotMock(index, style, lang) {
    if (index === 5) {
      if (isFreeLaunchMode()) {
        return `<div class="shot-list">${styles.slice(8, 12).map((item) => `<span class="image-slot" data-image-label="${escapeHtml(item.name[lang])}">${imageMarkup(item.image, "", "", { decorative: true })}<b>${escapeHtml(item.name[lang])}</b></span>`).join("")}</div>`;
      }
      return `<div class="shot-paywall"><h2>${escapeHtml(t("plus"))}</h2><p>${escapeHtml(t("plusSubtitle"))}</p><ul>${t("plusPlanItems").slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
    }
    if (index === 2) {
      return `<div class="shot-panel"><h3>${escapeHtml(style.name[lang])}</h3><p>${escapeHtml(style.history[lang]).slice(0, 90)}...</p><p>${escapeHtml(style.why[lang]).slice(0, 72)}...</p></div>`;
    }
    if (index === 3) {
      return `<div class="shot-list">${styles.slice(0, 4).map((item) => `<span class="image-slot" data-image-label="${escapeHtml(item.name[lang])}">${imageMarkup(item.image, "", "", { decorative: true })}<b>${escapeHtml(item.name[lang])}</b></span>`).join("")}</div>`;
    }
    if (index === 4) {
      return `<div class="shot-export image-slot" data-image-label="${escapeHtml(style.name[lang])}">${imageMarkup(style.image, "", "", { decorative: true })}<button>${escapeHtml(t("freeExport"))}</button></div>`;
    }
    return `<div class="shot-card-visual image-slot" data-image-label="${escapeHtml(style.name[lang])}">${imageMarkup(style.image, "", "", { decorative: true })}<h2>${escapeHtml(style.name.en)}</h2><p>${escapeHtml(style.name.zh)}</p></div>`;
  }

  function screenshotSlides() {
    const slides = t("screenshotSlides").slice();
    if (isFreeLaunchMode()) {
      slides[5] = store.lang === "zh"
        ? ["离线收藏你的风格灵感", "免费图鉴"]
        : ["Save your style inspiration offline", "Free Atlas"];
    }
    return slides;
  }

  function openDetail(id = store.activeId, sourceView = store.view, returnSection = "") {
    flushAllReflections();
    const previousId = store.activeId;
    if (sourceView === "detail" && id && id !== previousId) {
      store.detailHistory.push({ id: previousId, section: returnSection });
    } else if (sourceView !== "detail") {
      store.detailHistory = [];
    }
    if (id && validStyleIds.has(id)) store.activeId = id;
    if (sourceView !== "detail") store.backView = sourceView;
    setView("detail");
  }

  function setView(view, shouldRender = true) {
    flushAllReflections();
    if (store.view === "detail" && view !== "detail") abortWikiGallery();
    if (view !== "detail" && !dom.guidedOverlay.hidden) closeGuided(false);
    if (view !== "detail") {
      const detailView = $("detailView");
      detailView.classList.remove("edge-back-dragging", "edge-back-settling");
      detailView.style.removeProperty("--edge-back-x");
      detailView.style.removeProperty("--edge-back-opacity");
    }
    if (view === "detail" && !store.backView) store.backView = "home";
    if (shouldRender && view === "screenshots") renderScreenshots();
    if (shouldRender && view === "about") renderAbout();
    if (shouldRender && view === "detail") renderDetail();
    if (store.drawerOpen) setDrawer(false, false);
    store.view = view;
    document.querySelectorAll(".view").forEach((node) => {
      const active = node.id === `${view}View`;
      node.classList.toggle("active", active);
      node.setAttribute("aria-hidden", String(!active));
      node.inert = !active;
    });
    document.querySelectorAll(".nav-btn").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
    document.querySelectorAll(".nav-btn").forEach((node) => {
      if (node.dataset.view) node.setAttribute("aria-current", node.dataset.view === view ? "page" : "false");
    });
    dom.backBtn.classList.toggle("hidden", view === "home");
    document.querySelector(".topbar").classList.toggle("has-back", view !== "home");
    document.body.classList.toggle("detail-mode", view === "detail");
    document.documentElement.classList.toggle("detail-mode", view === "detail");
    if (view === "search") {
      if (shouldRender) renderSearch();
      const focusBeforeSearch = document.activeElement;
      setTimeout(() => {
        if (store.view !== "search") return;
        if (document.activeElement === focusBeforeSearch || document.activeElement === document.body) {
          dom.searchInput.focus();
        }
      }, 80);
    }
    if (shouldRender && view === "saved") renderSaved();
    if (view === "detail") {
      const heading = dom.detailContent.querySelector("h1");
      if (heading) {
        heading.tabIndex = -1;
        requestAnimationFrame(() => heading.focus({ preventScroll: true }));
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    updateAccessibilityDebug();
  }

  function setDrawer(open, restoreFocus = true) {
    if (store.drawerOpen === open) return;
    if (open) {
      if (!dom.plusModal.hidden) closePlus(false);
      if (!dom.lightbox.hidden) closeImage(false);
    }
    store.drawerOpen = open;
    if (open) {
      store.drawerScrollY = window.scrollY;
      document.body.style.top = `-${store.drawerScrollY}px`;
      store.drawerReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : dom.drawerBtn;
    }
    dom.drawer.classList.toggle("open", open);
    dom.drawer.setAttribute("aria-hidden", String(!open));
    dom.drawer.inert = !open;
    dom.drawerBtn.setAttribute("aria-expanded", String(open));
    dom.drawerBtn.setAttribute("aria-label", t(open ? "closeMenu" : "openMenu"));
    dom.drawerBackdrop.hidden = !open;
    document.body.classList.toggle("drawer-open", open);
    document.querySelector("main").inert = open;
    document.querySelector(".topbar").inert = open;
    if (open) requestAnimationFrame(() => {
      dom.drawerCloseBtn.focus();
      updateAccessibilityDebug();
    });
    if (!open) {
      document.body.style.removeProperty("top");
      window.scrollTo(0, store.drawerScrollY || 0);
      const returnFocus = store.drawerReturnFocus;
      store.drawerReturnFocus = null;
      if (restoreFocus) requestAnimationFrame(() => {
        returnFocus?.focus();
        updateAccessibilityDebug();
      });
      else updateAccessibilityDebug();
    }
  }

  function setActiveByOffset(offset) {
    const index = styles.findIndex((style) => style.id === store.activeId);
    const next = (index + offset + styles.length) % styles.length;
    store.activeId = styles[next].id;
    renderDeck();
  }

  function addRecent(id) {
    store.recent = [id].concat(store.recent.filter((item) => item !== id)).slice(0, 12);
    saveState();
  }

  function updateSavedButtons(id) {
    const saved = isSaved(id);
    const style = styles.find((item) => item.id === id);
    document.querySelectorAll(`[data-id="${id}"][data-action="save"], [data-id="${id}"][data-action="save-row"]`).forEach((button) => {
      button.classList.toggle("saved", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", style ? savedLabel(style, saved) : t(saved ? "unfavorite" : "favorite"));
    });
  }

  function updateSavedCount() {
    dom.savedCount.textContent = t("saved", store.saved.length);
    dom.copyListBtn.disabled = store.saved.length === 0;
    if ($("drawerSavedNote")) $("drawerSavedNote").textContent = t("drawerSavedNote", store.saved.length);
  }

  function syncSavedState(id) {
    updateSavedButtons(id);
    updateSavedCount();
    if (store.view === "saved") renderSaved();
  }

  function toggleSaved(id = activeStyle().id) {
    const scrollPosition = window.scrollY;
    if (isSaved(id)) {
      store.saved = store.saved.filter((item) => item !== id);
      toast(t("removedToast"));
    } else {
      if (!hasPlusAccess() && store.saved.length >= ACCESS_CONFIG.maxFreeSaved) {
        showPlus("savedLimit");
        return;
      }
      store.saved.push(id);
      toast(t("savedToast"));
    }
    saveState();
    syncSavedState(id);
    if (store.view === "detail") window.scrollTo(0, scrollPosition);
  }

  async function copyText(value) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const input = document.createElement("textarea");
        input.value = value;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.append(input);
        input.select();
        if (!document.execCommand("copy")) throw new Error("copy failed");
        input.remove();
      }
      toast(t("copied"));
      return true;
    } catch {
      toast(t("copyFailed"));
      return false;
    }
  }

  async function copyStyleExpression(style = activeStyle()) {
    if (isStyleLocked(style)) {
      showPlus("lockedExpression");
      return;
    }
    await copyText(`${style.imagePrompts[store.lang]}\n\n${style.negativePrompt[store.lang]}`);
  }

  async function copyStyleOverview(style = activeStyle()) {
    await copyText(`${style.name.en}\n${style.name.zh}\n\n${style.summary[store.lang]}`);
  }

  function requestBundledImageFromNative(src) {
    const filename = decodeURIComponent(new URL(src, location.href).pathname.split("/").pop() || "");
    const requestId = `asset-${Date.now()}-${++nativeAssetRequestSequence}`;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        nativeAssetRequests.delete(requestId);
        reject(performanceError("imageDecodeFailed", "Bundled image request timed out"));
      }, 8000);
      nativeAssetRequests.set(requestId, { resolve, reject, timer });
      if (!postNativeMessage("readBundledAsset", { requestId, filename })) {
        clearTimeout(timer);
        nativeAssetRequests.delete(requestId);
        reject(performanceError("imageDecodeFailed", "Native asset bridge is unavailable"));
      }
    });
  }

  function resolveBundledAssetFromNative(requestId, dataURL = "", errorCode = "") {
    const pending = nativeAssetRequests.get(String(requestId));
    if (!pending) return false;
    clearTimeout(pending.timer);
    nativeAssetRequests.delete(String(requestId));
    if (errorCode || !String(dataURL).startsWith("data:image/")) {
      pending.reject(performanceError("imageDecodeFailed", errorCode || "Bundled image data is invalid"));
      return false;
    }
    pending.resolve(String(dataURL));
    return true;
  }

  async function loadImage(src) {
    if (hasNativeBridge() && location.protocol === "file:") {
      const dataURL = await requestBundledImageFromNative(src);
      const image = new Image();
      image.decoding = "async";
      image.src = dataURL;
      try {
        if (typeof image.decode === "function") await image.decode();
        else await new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", reject, { once: true });
        });
        return image;
      } catch (error) {
        throw performanceError("imageDecodeFailed", error?.message || "Bundled image decode failed");
      }
    }
    return imagePipeline.preload(src, { priority: "high" });
  }

  function canvasContext(canvas) {
    const context = canvas.getContext("2d");
    if (!context) throw performanceError("canvasUnavailable", "2D canvas context is unavailable");
    return context;
  }

  function canvasBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(performanceError("blobCreationFailed", "Canvas returned a null blob"));
      }, "image/png", 0.94);
    });
  }

  function releaseCanvas(canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }

  async function coverCardBlob(style, ratio = "9:16") {
    const sizes = {
      "9:16": [1080, 1920],
      "4:5": [1200, 1500],
      "1:1": [1440, 1440],
      "16:9": [1920, 1080]
    };
    const [canvasWidth, canvasHeight] = sizes[ratio] || sizes["9:16"];
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    try {
    const ctx = canvasContext(canvas);
    const image = await loadImage(style.image);
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    const shade = ctx.createLinearGradient(0, canvas.height * 0.46, 0, canvas.height);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(0.52, "rgba(0,0,0,0.42)");
    shade.addColorStop(1, "rgba(0,0,0,0.82)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff6dc";
    const titleSize = Math.max(72, Math.min(126, canvas.width * 0.1, canvas.height * 0.12));
    ctx.font = `700 ${titleSize}px Georgia`;
    const titleLineHeight = titleSize * 0.92;
    const qrLayout = shareQRCodeLayout(canvas.width, canvas.height);
    const titleLines = wrappedLines(ctx, style.name.en, canvas.width - 128);
    ctx.fillStyle = "#f4cf76";
    const subtitleSize = Math.max(34, Math.min(52, canvas.width * 0.043));
    const subtitleY = qrLayout.y - 34;
    const titleLastY = subtitleY - subtitleSize * 1.55;
    const titleFirstY = titleLastY - Math.max(0, titleLines.length - 1) * titleLineHeight;
    ctx.fillStyle = "#fff6dc";
    ctx.font = `700 ${titleSize}px Georgia`;
    titleLines.forEach((line, index) => ctx.fillText(line, 64, titleFirstY + index * titleLineHeight));
    ctx.fillStyle = "#f4cf76";
    ctx.font = `800 ${subtitleSize}px sans-serif`;
    wrap(ctx, style.name.zh, 68, subtitleY, canvas.width - 136, subtitleSize * 1.18);
    await drawShareQRCode(ctx, qrLayout);
    drawWatermark(ctx, canvas.width, canvas.height, qrLayout.width + 88);
    return await canvasBlob(canvas);
    } finally {
      releaseCanvas(canvas);
    }
  }

  async function pureImageBlob(style, ratio = "9:16") {
    const sizes = {
      "9:16": [1080, 1920],
      "4:5": [1200, 1500],
      "1:1": [1440, 1440],
      "16:9": [1920, 1080]
    };
    const [canvasWidth, canvasHeight] = sizes[ratio] || sizes["9:16"];
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    try {
      const ctx = canvasContext(canvas);
      const image = await loadImage(style.image);
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      ctx.fillStyle = "#0d0c09";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      return await canvasBlob(canvas);
    } finally {
      releaseCanvas(canvas);
    }
  }

  async function detailCardBlob(style) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 2400;
    try {
      const ctx = canvasContext(canvas);
      ctx.fillStyle = "#ead397";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(27, 20, 8, .07)";
      ctx.lineWidth = 2;
      for (let x = 54; x < canvas.width; x += 92) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      const shine = ctx.createLinearGradient(0, 0, canvas.width, 760);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(0.58, "rgba(255,255,255,0.2)");
      shine.addColorStop(0.68, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const image = await loadImage(style.image);
      const x = 64;
      const y = 64;
      const width = 952;
      const height = 1556;
      ctx.save();
      roundRect(ctx, x, y, width, height, 28);
      ctx.clip();
      ctx.fillStyle = "#111";
      ctx.fillRect(x, y, width, height);
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      ctx.drawImage(image, x + (width - imageWidth) / 2, y + (height - imageHeight) / 2, imageWidth, imageHeight);
      ctx.restore();

      ctx.fillStyle = "#14100a";
      const titleSize = style.name.en.length > 24 ? 72 : style.name.en.length > 15 ? 88 : 112;
      ctx.font = `700 ${titleSize}px Georgia`;
      const titleEndY = wrap(ctx, style.name.en, 64, 1760, 952, titleSize * 1.02);
      ctx.fillStyle = "#57451e";
      ctx.font = "800 50px sans-serif";
      const chineseEndY = wrap(ctx, style.name.zh, 68, titleEndY + 100, 930, 62);
      ctx.fillStyle = "rgba(63, 52, 34, 0.42)";
      const dividerY = chineseEndY + 54;
      ctx.fillRect(68, dividerY, 944, 2);
      ctx.fillStyle = "#3f3422";
      ctx.font = "40px sans-serif";
      const qrLayout = shareQRCodeLayout(canvas.width, canvas.height);
      const summaryLines = wrappedLines(ctx, style.summary[store.lang], qrLayout.x - 104).slice(0, 3);
      summaryLines.forEach((line, index) => ctx.fillText(line, 68, dividerY + 76 + index * 58));
      await drawShareQRCode(ctx, qrLayout);
      drawWatermark(ctx, canvas.width, canvas.height, qrLayout.width + 88);
      return await canvasBlob(canvas);
    } finally {
      releaseCanvas(canvas);
    }
  }

  async function coverFile(style) {
    const blob = await (store.view === "detail" ? detailCardBlob(style) : coverCardBlob(style));
    return new File([blob], `${style.id}-style-atlas-card.png`, { type: "image/png" });
  }

  async function imageFile(src, name = "style-atlas-image.png") {
    const response = await fetch(src);
    if (!response.ok) throw new Error("image fetch failed");
    const blob = await response.blob();
    return new File([blob], name, { type: blob.type || "image/png" });
  }

  function openImage(src, alt, sharePreview = false) {
    dom.lightboxImage.src = src;
    dom.lightboxImage.alt = alt || "";
    dom.lightboxTitle.textContent = t("imagePreview");
    dom.lightboxDescription.textContent = alt || activeStyle().name[store.lang];
    dom.lightboxHint.textContent = sharePreview ? t("wechatShareHint") : "";
    dom.lightboxHint.hidden = !sharePreview;
    dom.saveLightboxBtn.hidden = sharePreview;
    dom.shareLightboxBtn.hidden = sharePreview;
    dom.lightboxCloseBtn.setAttribute("aria-label", t("closePreview"));
    dom.saveLightboxBtn.textContent = t("saveCard");
    dom.shareLightboxBtn.textContent = t("share");
    dom.lightbox.dataset.src = src;
    openOverlay(dom.lightbox, dom.lightbox);
  }

  function closeImage(restoreFocus = true) {
    if (dom.lightbox.hidden) return;
    dom.lightboxImage.removeAttribute("src");
    dom.lightboxHint.hidden = true;
    dom.lightboxHint.textContent = "";
    dom.saveLightboxBtn.hidden = false;
    dom.shareLightboxBtn.hidden = false;
    delete dom.lightbox.dataset.src;
    closeOverlay(dom.lightbox, restoreFocus);
  }

  async function shareImage(src = dom.lightbox.dataset.src) {
    if (!src) return;
    return runExportOperation(async () => {
      const file = await imageFile(src, "style-atlas-image.png");
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(file);
        if (postNativeMessage("shareImage", { dataURL, filename: file.name })) return NATIVE_EXPORT_PENDING;
      }
      if (isWeChatBrowser()) {
        openImage(await blobToDataURL(file), t("wechatShareHint"), true);
        return;
      }
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: activeStyle().name[store.lang], files: [file] });
        return;
      }
      await copyText(src);
    }, "shareFailed");
  }

  async function saveImage(src = dom.lightbox.dataset.src) {
    if (!src) return;
    return runExportOperation(async () => {
      const file = await imageFile(src, "style-atlas-image.png");
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(file);
        if (postNativeMessage("exportImage", { dataURL, filename: file.name })) {
          return NATIVE_EXPORT_PENDING;
        }
      }
      downloadBlob(file, file.name);
      toast(t("cardSaved"));
    }, "saveFailed");
  }

  async function shareStyle(style = activeStyle()) {
    const publicBase = new URL(window.STYLE_ATLAS_RUNTIME_CONFIG.publicBaseURL, "https://style-atlas.wonderelian.com/");
    publicBase.hash = "";
    publicBase.search = "";
    publicBase.searchParams.set("review", "detail");
    publicBase.searchParams.set("style", style.id);
    publicBase.searchParams.set("lang", store.lang);
    publicBase.searchParams.set("section", "see");
    const url = publicBase.href;
    const payload = { title: style.name[store.lang], text: style.summary[store.lang], url };
    return runExportOperation(async () => {
      const file = await coverFile(style);
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(file);
        if (postNativeMessage("shareImage", { dataURL, filename: file.name })) return NATIVE_EXPORT_PENDING;
      }
      if (isWeChatBrowser()) {
        openImage(await blobToDataURL(file), t("wechatShareHint"), true);
        return;
      }
      if (navigator.share) {
        if (!navigator.canShare || navigator.canShare({ files: [file] })) {
          await navigator.share({ ...payload, files: [file] });
          return;
        }
        await navigator.share(payload);
        return;
      }
      await copyText(`${payload.title}\n${payload.text}\n${payload.url}`);
    }, "shareFailed");
  }

  async function saveShareCard(style = activeStyle(), ratio = null) {
    return runExportOperation(async () => {
      const blob = hasPlusAccess()
        ? await pureImageBlob(style, ratio || "9:16")
        : ratio
          ? await coverCardBlob(style, ratio)
          : await (store.view === "detail" ? detailCardBlob(style) : coverCardBlob(style));
      const filename = `${style.id}-style-atlas${ratio ? `-${ratio.replace(":", "x")}` : ""}.png`;
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(blob);
        if (postNativeMessage("exportImage", { dataURL, filename })) return NATIVE_EXPORT_PENDING;
      }
      downloadBlob(blob, filename);
      toast(t("cardSaved"));
    }, "saveFailed");
  }

  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("file read failed"));
      reader.readAsDataURL(blob);
    });
  }

  function downloadBlob(blob, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  function shareQRCodeLayout(canvasWidth, canvasHeight) {
    const size = Math.round(Math.min(154, canvasWidth * 0.143));
    const padding = 12;
    const width = size + padding * 2;
    const height = size + padding * 2;
    return {
      size,
      padding,
      width,
      height,
      x: canvasWidth - width - 44,
      y: canvasHeight - height - 44
    };
  }

  async function drawShareQRCode(ctx, layout) {
    const qr = await loadImage("./assets/styles/style-atlas-h5-qr.png");
    const { size, padding, width, height, x, y } = layout;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.34)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    roundRect(ctx, x, y, width, height, 18);
    ctx.fillStyle = "#fff8e7";
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.drawImage(qr, x + padding, y + padding, size, size);
    ctx.restore();
  }

  function isWeChatBrowser() {
    return /MicroMessenger/i.test(navigator.userAgent || "");
  }

  function wrappedLines(ctx, textValue, maxWidth) {
    const words = String(textValue).split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
      if (ctx.measureText(word).width > maxWidth) {
        for (const char of word) {
          const test = line ? `${line}${char}` : char;
          if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = char;
          } else {
            line = test;
          }
        }
        continue;
      }
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }

  function wrap(ctx, textValue, x, y, maxWidth, lineHeight, centered = false) {
    const lines = wrappedLines(ctx, textValue, maxWidth);
    lines.forEach((line, index) => ctx.fillText(line, centered ? x : x, y + index * lineHeight));
    return y + Math.max(0, lines.length - 1) * lineHeight;
  }

  function drawWatermark(ctx, width, height, rightInset = 60) {
    if (!ACCESS_CONFIG.freeExportWatermark || hasPlusAccess()) return;
    const watermark = store.lang === "zh" ? "虾子曰艺术风格图鉴" : "Xiazishuo Style Atlas";
    ctx.save();
    ctx.globalAlpha = 0.62;
    ctx.textAlign = "right";
    ctx.fillStyle = "#493816";
    ctx.font = "700 20px sans-serif";
    const textWidth = ctx.measureText(watermark).width;
    const textX = width - rightInset;
    const textY = height - 24;
    ctx.fillRect(textX - textWidth - 54, textY - 8, 34, 2);
    ctx.beginPath();
    ctx.arc(textX - textWidth - 9, textY - 9, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(watermark, textX, textY);
    ctx.restore();
  }

  function toast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => dom.toast.classList.remove("show"), 1500);
  }

  function bind() {
    dom.langBtn.addEventListener("click", () => {
      store.lang = store.lang === "zh" ? "en" : "zh";
      document.documentElement.lang = store.lang === "zh" ? "zh-CN" : "en";
      saveState();
      renderAll();
    });

    dom.searchOpenBtn.addEventListener("click", () => {
      store.viewReturnFocus = dom.searchOpenBtn;
      setView("search");
    });
    dom.drawerBtn.addEventListener("click", () => setDrawer(true));
    dom.drawerCloseBtn.addEventListener("click", () => setDrawer(false));
    dom.drawerBackdrop.addEventListener("click", () => setDrawer(false));
    function navigateBack() {
      if (store.view === "detail" && store.detailHistory.length) {
        const entry = store.detailHistory.pop();
        store.activeId = typeof entry === "string" ? entry : entry.id;
        renderDetail();
        const section = typeof entry === "object" ? entry.section : "";
        if (section) {
          requestAnimationFrame(() => $(section)?.scrollIntoView({ behavior: "auto", block: "start" }));
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        const heading = dom.detailContent.querySelector("h1");
        if (heading && !section) {
          heading.tabIndex = -1;
          requestAnimationFrame(() => heading.focus({ preventScroll: true }));
        }
        return;
      }
      const returnFocus = store.view === "search" ? store.viewReturnFocus : null;
      setView(store.view === "detail" ? store.backView : "home");
      store.viewReturnFocus = null;
      if (returnFocus) requestAnimationFrame(() => returnFocus.focus());
    }

    dom.backBtn.addEventListener("click", navigateBack);
    dom.prevBtn.addEventListener("click", () => completeSwipe(-1));
    dom.nextBtn.addEventListener("click", () => completeSwipe(1));
    dom.styleDeck.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (action) {
        event.stopPropagation();
        moved = false;
        if (action === "save") return toggleSaved();
        if (action === "share") return shareStyle();
        if (action === "copy-prompt") return copyStyleExpression();
        if (action === "detail") return openDetail(store.activeId, "home");
      }
      if (moved) {
        moved = false;
        return;
      }
      openDetail(store.activeId, "home");
    });

    let startX = 0;
    let startY = 0;
    let dragging = false;
    let moved = false;
    let dragFrame = 0;
    let dragX = 0;
    let dragY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocityX = 0;
    let gestureAxis = "";
    let gestureInput = "";
    let touchIdentifier = null;
    let animating = false;
    let settleTimer = 0;
    let swipeTimer = 0;
    let randomTimer = 0;
    let lastSwipeStartedAt = 0;

    function resetGhost(card) {
      card.style.removeProperty("--ghost-x");
      card.style.removeProperty("--ghost-y");
      card.style.removeProperty("--ghost-rotate");
      card.style.removeProperty("--ghost-scale");
      card.style.removeProperty("--ghost-opacity");
    }

    function paintDrag() {
      dragFrame = 0;
      const width = Math.max(1, dom.styleDeck.clientWidth);
      const signedProgress = Math.max(-1, Math.min(1, dragX / width));
      dom.styleDeck.style.setProperty("--drag-x", `${dragX}px`);
      dom.styleDeck.style.setProperty("--drag-y", `${Math.abs(signedProgress) * 8}px`);
      dom.styleDeck.style.setProperty("--drag-rotate", `${signedProgress * 7.5}deg`);
      const progress = Math.min(1, Math.abs(dragX) / Math.max(96, width * 0.42));
      const target = dragX < 0 ? dom.nextGhost : dom.prevGhost;
      const other = dragX < 0 ? dom.prevGhost : dom.nextGhost;
      const side = dragX < 0 ? 1 : -1;
      target.style.setProperty("--ghost-x", `${side * 18 * (1 - progress)}px`);
      target.style.setProperty("--ghost-y", `${5 * (1 - progress)}px`);
      target.style.setProperty("--ghost-rotate", `${side * 2.4 * (1 - progress)}deg`);
      target.style.setProperty("--ghost-scale", String(0.965 + 0.035 * progress));
      target.style.setProperty("--ghost-opacity", String(0.72 + 0.28 * progress));
      resetGhost(other);
    }

    function cancelDragFrame() {
      if (dragFrame) cancelAnimationFrame(dragFrame);
      dragFrame = 0;
    }

    function clearGestureTimers() {
      clearTimeout(settleTimer);
      clearTimeout(swipeTimer);
      settleTimer = 0;
      swipeTimer = 0;
    }

    function chooseRandomStyle() {
      if (styles.length < 2) return;
      let next = activeStyle();
      while (next.id === store.activeId) next = styles[Math.floor(Math.random() * styles.length)];
      store.activeId = next.id;
    }

    function animateRandomCard() {
      if (animating || dragging) return;
      clearTimeout(randomTimer);
      if (prefersReducedMotion()) {
        chooseRandomStyle();
        renderDeck();
        postNativeMessage("hapticFeedback");
        return;
      }
      animating = true;
      dom.randomBtn.disabled = true;
      dom.randomBtn.setAttribute("aria-busy", "true");
      dom.deckStage.classList.add("is-animating", "random-out");
      postNativeMessage("hapticFeedback");
      randomTimer = setTimeout(() => {
        chooseRandomStyle();
        renderDeck();
        dom.deckStage.classList.add("is-animating", "random-in");
        randomTimer = setTimeout(() => {
          dom.deckStage.classList.remove("is-animating", "random-in");
          dom.randomBtn.disabled = false;
          dom.randomBtn.removeAttribute("aria-busy");
          animating = false;
        }, 380);
      }, 180);
    }

    dom.randomBtn.addEventListener("click", animateRandomCard);

    function settleBack() {
      clearGestureTimers();
      cancelDragFrame();
      dom.deckStage.classList.remove("dragging");
      if (prefersReducedMotion()) {
        dom.styleDeck.style.removeProperty("--drag-x");
        dom.styleDeck.style.removeProperty("--drag-y");
        dom.styleDeck.style.removeProperty("--drag-rotate");
        resetGhost(dom.prevGhost);
        resetGhost(dom.nextGhost);
        return;
      }
      requestAnimationFrame(() => {
        dom.styleDeck.style.setProperty("--drag-x", "0px");
        dom.styleDeck.style.setProperty("--drag-y", "0px");
        dom.styleDeck.style.setProperty("--drag-rotate", "0deg");
        resetGhost(dom.prevGhost);
        resetGhost(dom.nextGhost);
      });
      settleTimer = setTimeout(() => {
        dom.styleDeck.style.removeProperty("--drag-x");
        dom.styleDeck.style.removeProperty("--drag-y");
        dom.styleDeck.style.removeProperty("--drag-rotate");
      }, 240);
    }

    function completeSwipe(direction) {
      if (animating || dragging) return;
      const now = performance.now();
      if (lastSwipeStartedAt && now - lastSwipeStartedAt < 320) return;
      lastSwipeStartedAt = now;
      clearGestureTimers();
      if (prefersReducedMotion()) {
        dom.deckStage.classList.remove("dragging", "fly-left", "fly-right", "is-animating");
        dom.styleDeck.style.removeProperty("--drag-x");
        dom.styleDeck.style.removeProperty("--drag-y");
        dom.styleDeck.style.removeProperty("--drag-rotate");
        resetGhost(dom.prevGhost);
        resetGhost(dom.nextGhost);
        setActiveByOffset(direction);
        postNativeMessage("hapticFeedback");
        return;
      }
      animating = true;
      if (dragFrame) paintDrag();
      dom.deckStage.classList.remove("dragging");
      dom.deckStage.classList.add("is-animating");
      let completed = false;
      const finish = () => {
        if (completed) return;
        completed = true;
        dom.styleDeck.removeEventListener("transitionend", onTransitionEnd);
        setActiveByOffset(direction);
        animating = false;
      };
      const onTransitionEnd = (event) => {
        if (event.target === dom.styleDeck && event.propertyName === "transform") finish();
      };
      dom.styleDeck.addEventListener("transitionend", onTransitionEnd);
      requestAnimationFrame(() => {
        dom.deckStage.classList.add(direction > 0 ? "fly-left" : "fly-right");
        postNativeMessage("hapticFeedback");
      });
      swipeTimer = setTimeout(finish, 250);
    }

    function finishGesture(cancelled = false) {
      if (!dragging) return;
      dragging = false;
      if (cancelled) {
        settleBack();
        return;
      }
      const horizontal = gestureAxis === "x" || Math.abs(dragX) > Math.abs(dragY);
      const distanceThreshold = Math.min(54, dom.styleDeck.clientWidth * 0.14);
      const velocityIsFresh = performance.now() - lastTime < 130;
      const shouldChange = horizontal && (Math.abs(dragX) >= distanceThreshold || (!prefersReducedMotion() && velocityIsFresh && Math.abs(velocityX) >= 0.3));
      if (shouldChange) {
        completeSwipe(dragX < 0 || (dragX === 0 && velocityX < 0) ? 1 : -1);
        return;
      }
      settleBack();
    }

    function beginGesture(x, y, input) {
      clearGestureTimers();
      dragging = true;
      moved = false;
      gestureInput = input;
      startX = x;
      startY = y;
      lastX = startX;
      lastTime = performance.now();
      dragX = 0;
      dragY = 0;
      velocityX = 0;
      gestureAxis = "";
    }

    function moveGesture(x, y, event) {
      if (!dragging) return;
      const dx = x - startX;
      const dy = y - startY;
      dragY = dy;
      if (!gestureAxis) {
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (absX > 7 && absX > absY * 1.08) {
          gestureAxis = "x";
          moved = true;
          dom.deckStage.classList.add("dragging");
        } else if (absY > 7 && absY > absX * 1.08) {
          gestureAxis = "y";
          dragging = false;
          gestureInput = "";
          return;
        } else {
          return;
        }
      }
      if (gestureAxis === "y") return;
      if (event.cancelable) event.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(1, now - lastTime);
      const sampleVelocity = (x - lastX) / elapsed;
      velocityX = velocityX * 0.58 + sampleVelocity * 0.42;
      lastX = x;
      lastTime = now;
      dragX = Math.max(-dom.styleDeck.clientWidth, Math.min(dom.styleDeck.clientWidth, dx));
      if (!dragFrame) dragFrame = requestAnimationFrame(paintDrag);
    }

    dom.styleDeck.addEventListener("pointerdown", (event) => {
      if (window.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell === true || event.pointerType === "touch" || event.target.closest("button") || animating) return;
      beginGesture(event.clientX, event.clientY, "pointer");
      try {
        dom.styleDeck.setPointerCapture(event.pointerId);
      } catch (_) {
        // Pointer capture is an enhancement for mouse and stylus only.
      }
    });

    dom.styleDeck.addEventListener("pointermove", (event) => {
      if (!dragging || gestureInput !== "pointer") return;
      const coalesced = event.getCoalescedEvents ? event.getCoalescedEvents() : [];
      const point = coalesced[coalesced.length - 1] || event;
      moveGesture(point.clientX, point.clientY, event);
    }, { passive: false });

    dom.styleDeck.addEventListener("pointerup", () => {
      if (!dragging || gestureInput !== "pointer") return;
      finishGesture();
      gestureInput = "";
    });

    dom.styleDeck.addEventListener("pointercancel", () => {
      if (gestureInput !== "pointer") return;
      finishGesture(true);
      gestureInput = "";
    });

    dom.styleDeck.addEventListener("touchstart", (event) => {
      if (event.touches.length !== 1 || event.target.closest("button") || animating) {
        if (dragging && gestureInput === "touch") finishGesture(true);
        touchIdentifier = null;
        gestureInput = "";
        return;
      }
      const touch = event.changedTouches[0];
      touchIdentifier = touch.identifier;
      beginGesture(touch.clientX, touch.clientY, "touch");
    }, { passive: true });

    dom.styleDeck.addEventListener("touchmove", (event) => {
      if (!dragging || gestureInput !== "touch" || event.touches.length !== 1) return;
      const touch = Array.from(event.touches).find((item) => item.identifier === touchIdentifier);
      if (touch) moveGesture(touch.clientX, touch.clientY, event);
    }, { passive: false });

    dom.styleDeck.addEventListener("touchend", (event) => {
      if (gestureInput !== "touch") return;
      const ended = Array.from(event.changedTouches).some((item) => item.identifier === touchIdentifier);
      if (!ended) return;
      finishGesture();
      touchIdentifier = null;
      gestureInput = "";
    });

    dom.styleDeck.addEventListener("touchcancel", () => {
      if (gestureInput !== "touch") return;
      finishGesture(true);
      touchIdentifier = null;
      gestureInput = "";
    });

    const detailView = $("detailView");
    let edgeBackTracking = false;
    let edgeBackActive = false;
    let edgeBackStartX = 0;
    let edgeBackStartY = 0;
    let edgeBackX = 0;
    let edgeBackLastX = 0;
    let edgeBackLastTime = 0;
    let edgeBackVelocity = 0;

    function resetEdgeBack(animated = true) {
      detailView.classList.toggle("edge-back-settling", animated && !prefersReducedMotion());
      detailView.style.setProperty("--edge-back-x", "0px");
      detailView.style.setProperty("--edge-back-opacity", "1");
      setTimeout(() => {
        if (store.view !== "detail" || edgeBackTracking) return;
        detailView.classList.remove("edge-back-dragging", "edge-back-settling");
        detailView.style.removeProperty("--edge-back-x");
        detailView.style.removeProperty("--edge-back-opacity");
      }, animated ? 190 : 0);
    }

    dom.appShell.addEventListener("touchstart", (event) => {
      if (store.view !== "detail" || event.touches.length !== 1 || !dom.plusModal.hidden || !dom.lightbox.hidden) return;
      const touch = event.touches[0];
      const shellLeft = dom.appShell.getBoundingClientRect().left;
      if (touch.clientX - shellLeft > 48) return;
      edgeBackTracking = true;
      edgeBackActive = false;
      edgeBackStartX = touch.clientX;
      edgeBackStartY = touch.clientY;
      edgeBackX = 0;
      edgeBackLastX = touch.clientX;
      edgeBackLastTime = performance.now();
      edgeBackVelocity = 0;
    }, { passive: true });

    dom.appShell.addEventListener("touchmove", (event) => {
      if (!edgeBackTracking || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const dx = Math.max(0, touch.clientX - edgeBackStartX);
      const dy = touch.clientY - edgeBackStartY;
      if (!edgeBackActive) {
        if (Math.abs(dy) > 14 && Math.abs(dy) > dx * 1.15) {
          edgeBackTracking = false;
          return;
        }
        if (dx <= 5 || dx <= Math.abs(dy) * 0.92) return;
        edgeBackActive = true;
        detailView.classList.remove("edge-back-settling");
        detailView.classList.add("edge-back-dragging");
      }
      if (event.cancelable) event.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(1, now - edgeBackLastTime);
      const sampleVelocity = (touch.clientX - edgeBackLastX) / elapsed;
      edgeBackVelocity = edgeBackVelocity * 0.55 + sampleVelocity * 0.45;
      edgeBackLastX = touch.clientX;
      edgeBackLastTime = now;
      edgeBackX = Math.min(window.innerWidth, dx);
      const progress = Math.min(1, edgeBackX / Math.max(160, window.innerWidth * 0.7));
      detailView.style.setProperty("--edge-back-x", `${edgeBackX}px`);
      detailView.style.setProperty("--edge-back-opacity", String(1 - progress * 0.18));
    }, { passive: false });

    dom.appShell.addEventListener("touchend", () => {
      if (!edgeBackTracking) return;
      const velocityIsFresh = performance.now() - edgeBackLastTime < 150;
      const enoughDistance = edgeBackX >= Math.min(72, window.innerWidth * 0.18);
      const fastFlick = edgeBackX >= 20 && velocityIsFresh && edgeBackVelocity >= 0.28;
      const shouldReturn = edgeBackActive && (enoughDistance || fastFlick);
      edgeBackTracking = false;
      edgeBackActive = false;
      if (!shouldReturn) {
        resetEdgeBack();
        return;
      }
      postNativeMessage("hapticFeedback");
      if (prefersReducedMotion()) {
        navigateBack();
        return;
      }
      detailView.classList.add("edge-back-settling");
      detailView.style.setProperty("--edge-back-x", `${window.innerWidth}px`);
      detailView.style.setProperty("--edge-back-opacity", "0.82");
      setTimeout(navigateBack, 180);
    });

    dom.appShell.addEventListener("touchcancel", () => {
      if (!edgeBackTracking) return;
      edgeBackTracking = false;
      edgeBackActive = false;
      resetEdgeBack();
    });

    let desktopScrollPointerId = null;
    let desktopScrollActive = false;
    let desktopScrollStartX = 0;
    let desktopScrollStartY = 0;
    let desktopScrollStartTop = 0;

    function finishDesktopScroll(pointerId = desktopScrollPointerId) {
      if (pointerId !== desktopScrollPointerId) return;
      try {
        if (detailView.hasPointerCapture(pointerId)) detailView.releasePointerCapture(pointerId);
      } catch (_) {
        // Pointer capture may already have been released by the browser.
      }
      desktopScrollPointerId = null;
      desktopScrollActive = false;
      document.body.classList.remove("desktop-drag-scrolling");
    }

    detailView.addEventListener("pointerdown", (event) => {
      const interactive = event.target.closest("button, a, input, textarea, select, label, summary, [contenteditable='true'], [role='button']");
      if (
        event.pointerType !== "mouse"
        || event.button !== 0
        || store.view !== "detail"
        || window.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell === true
        || !dom.plusModal.hidden
        || !dom.lightbox.hidden
        || !dom.guidedOverlay.hidden
        || store.drawerOpen
        || interactive
      ) return;
      desktopScrollPointerId = event.pointerId;
      desktopScrollActive = false;
      desktopScrollStartX = event.clientX;
      desktopScrollStartY = event.clientY;
      desktopScrollStartTop = window.scrollY;
      try {
        detailView.setPointerCapture(event.pointerId);
      } catch (_) {
        // Drag scrolling still works while the pointer remains over the detail view.
      }
    });

    detailView.addEventListener("pointermove", (event) => {
      if (event.pointerId !== desktopScrollPointerId) return;
      const dx = event.clientX - desktopScrollStartX;
      const dy = event.clientY - desktopScrollStartY;
      if (!desktopScrollActive) {
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (absX > 8 && absX > absY * 1.1) {
          finishDesktopScroll(event.pointerId);
          return;
        }
        if (absY < 8 || absY <= absX * 1.1) return;
        desktopScrollActive = true;
        document.body.classList.add("desktop-drag-scrolling");
      }
      if (event.cancelable) event.preventDefault();
      window.scrollTo(0, desktopScrollStartTop - dy);
    }, { passive: false });

    detailView.addEventListener("pointerup", (event) => finishDesktopScroll(event.pointerId));
    detailView.addEventListener("pointercancel", (event) => finishDesktopScroll(event.pointerId));
    detailView.addEventListener("lostpointercapture", (event) => finishDesktopScroll(event.pointerId));

    dom.styleDeck.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        completeSwipe(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        completeSwipe(1);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(store.activeId, "home");
      }
    });

    document.body.addEventListener("click", (event) => {
      const row = event.target.closest("[data-style]");
      const action = event.target.closest("[data-action]")?.dataset.action;
      const id = event.target.closest("[data-id]")?.dataset.id;
      const ratio = event.target.closest("[data-ratio]")?.dataset.ratio;
      const filter = event.target.closest("[data-filter]")?.dataset.filter;
      if (action === "save-row" && id) {
        event.stopPropagation();
        return toggleSaved(id);
      }
      if (action === "save") return toggleSaved();
      if (action === "share") return shareStyle();
      if (action === "open-image") {
        const img = event.target.closest("[data-action='open-image']")?.querySelector("img") || event.target.closest("img");
        if (!img) return;
        return openImage(img.currentSrc || img.src || img.dataset.src, img.alt);
      }
      if (action === "open-style" && id) return openDetail(id, store.view, event.target.closest("[data-return-section]")?.dataset.returnSection || "");
      if (action === "purchase-plus") {
        if (!hasNativeBridge()) return openAppStore();
        if (!isIapMode()) return toast(isFreeLaunchMode() ? t("plusFuture") : t("comingSoon"));
        if (["purchasing", "restoring", "pending"].includes(window.STYLE_ATLAS_RUNTIME_CONFIG?.storeAction)) return;
        setStoreActionFromNative("purchasing");
        if (!postNativeMessage("purchasePlus", { plan: store.selectedPlusPlan })) setStoreActionFromNative("unavailable", "productUnavailable");
        return;
      }
      if (action === "restore-purchases") {
        if (!isIapMode() || !hasNativeBridge()) return toast(t("comingSoon"));
        if (["purchasing", "restoring", "pending"].includes(window.STYLE_ATLAS_RUNTIME_CONFIG?.storeAction)) return;
        setStoreActionFromNative("restoring");
        if (!postNativeMessage("restorePurchases")) setStoreActionFromNative("failed", "restoreFailed");
        return;
      }
      if (action === "open-legal") {
        if (!hasNativeBridge()) return;
        event.preventDefault();
        const url = event.target.closest("a[href]")?.href;
        if (url) postNativeMessage("openExternalURL", { url });
        return;
      }
      if (action === "close-lightbox") return closeImage();
      if (action === "share-lightbox") return shareImage();
      if (action === "save-lightbox") return saveImage();
      if (action === "show-plus") return showPlus();
      if (action === "close-plus") return closePlus();
      if (action === "show-support") return showSupport();
      if (action === "close-support") return closeSupport();
      if (action === "show-video-channel") return showVideoChannel();
      if (action === "close-video-channel") return closeVideoChannel();
      if (action === "plus-export") return canExportHighRes() ? saveShareCard() : showPlus("highResLocked");
      if (action === "export-ratio" && ratio) return canExportHighRes() ? saveShareCard(activeStyle(), ratio) : showPlus("highResLocked");
      if (action === "copy-overview") return copyStyleOverview();
      if (action === "copy-prompt") return copyStyleExpression();
      if (action === "save-card") return saveShareCard();
      if (action === "open-guided") return openGuided(event.target.closest("[data-action='open-guided']"));
      if (action === "next-guided") return nextGuided();
      if (action === "previous-guided") return previousGuided();
      if (action === "close-guided") return closeGuided();
      if (action === "jump-detail-section") return jumpToDetailSection(event.target.closest("[data-target]")?.dataset.target, event.target.closest("[data-target]"));
      if (action === "toggle-accordion") return toggleAccordion(event.target.closest("[data-action='toggle-accordion']"));
      if (action === "clear-reflection" && id) return clearReflection(id);
      if (filter) {
        store.filter = store.filter === filter ? "" : filter;
        if (store.view !== "search") {
          store.query = "";
          dom.searchInput.value = "";
        }
        setView("search");
        return;
      }
      if (row) {
        openDetail(row.dataset.style, store.view);
      }
    });

    dom.plusPlanPicker.addEventListener("change", (event) => {
      const input = event.target.closest("input[name='plus-plan']");
      if (!input || !["annual", "annual_auto"].includes(input.value)) return;
      store.selectedPlusPlan = input.value;
      showPlus(store.plusReasonKey || "plusSubtitle");
    });

    dom.plusModal.addEventListener("click", (event) => {
      if (event.target === dom.plusModal) closePlus();
    });
    dom.supportModal.addEventListener("click", (event) => {
      if (!event.target.closest("#supportPanel")) closeSupport();
    });
    dom.videoChannelModal.addEventListener("click", (event) => {
      if (!event.target.closest("#videoChannelPanel")) closeVideoChannel();
    });
    dom.lightbox.addEventListener("click", (event) => {
      if (event.target === dom.lightbox) closeImage();
    });
    dom.guidedOverlay.addEventListener("click", (event) => {
      if (event.target === dom.guidedOverlay) closeGuided();
    });
    dom.detailContent.addEventListener("input", (event) => {
      const textarea = event.target.closest("[data-reflection-id]");
      if (!textarea) return;
      scheduleReflectionSave(textarea.dataset.reflectionId, textarea.value);
    });
    dom.detailContent.addEventListener("blur", (event) => {
      const textarea = event.target.closest("[data-reflection-id]");
      if (!textarea) return;
      flushReflection(textarea.dataset.reflectionId);
    }, true);
    window.addEventListener("pagehide", flushAllReflections);
    window.addEventListener("beforeunload", flushAllReflections);
    window.addEventListener("scroll", () => {
      if (store.view !== "detail" || store.detailSectionScrollFrame) return;
      store.detailSectionScrollFrame = requestAnimationFrame(() => {
        store.detailSectionScrollFrame = 0;
        updateCurrentDetailSection();
      });
    }, { passive: true });

    document.querySelectorAll(".nav-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        if (button.dataset.action === "download-app") {
          event.preventDefault();
          event.stopPropagation();
          openAppStore();
          return;
        }
        if (button.dataset.action === "show-plus") {
          event.stopPropagation();
          showPlus();
          return;
        }
        setView(button.dataset.view);
      });
    });

    dom.searchInput.addEventListener("input", () => {
      store.query = dom.searchInput.value;
      renderSearch();
    });
    dom.clearSearchBtn.addEventListener("click", () => {
      store.query = "";
      dom.searchInput.value = "";
      renderSearch();
    });
    dom.copyListBtn.addEventListener("click", () => {
      const list = store.saved.map((id) => styles.find((style) => style.id === id)).filter(Boolean).map((style) => `${style.name.en} / ${style.name.zh}`).join("\n");
      copyText(list || t("productName"));
    });
    document.addEventListener("keydown", (event) => {
      const overlay = !dom.videoChannelModal.hidden
        ? dom.videoChannelModal
        : (!dom.supportModal.hidden
          ? dom.supportModal
          : (!dom.plusModal.hidden
            ? dom.plusModal
            : (!dom.lightbox.hidden ? dom.lightbox : (!dom.guidedOverlay.hidden ? dom.guidedOverlay : (store.drawerOpen ? dom.drawer : null)))));
      if (!overlay) return;
      if (event.key === "Escape") {
        event.preventDefault();
        if (!dom.videoChannelModal.hidden) closeVideoChannel();
        else if (!dom.supportModal.hidden) closeSupport();
        else if (!dom.plusModal.hidden) closePlus();
        else if (!dom.lightbox.hidden) closeImage();
        else if (!dom.guidedOverlay.hidden) closeGuided();
        else setDrawer(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusableElements(overlay);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const dialog = overlay.matches?.("[role='dialog']") ? overlay : overlay.querySelector("[role='dialog']");
      if (document.activeElement === dialog) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    window.addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (id === "screenshots") {
        setView("screenshots");
        return;
      }
      if (!styles.some((style) => style.id === id)) return;
      openDetail(id, "home");
    });
  }

  function setDrawerRowCopy(id, title, note) {
    const row = $(id);
    row.querySelector(".drawer-row-copy strong").textContent = title;
    row.querySelector(".drawer-row-copy small").textContent = note;
  }

  function renderDrawerContent() {
    $("drawerEyebrow").textContent = t("drawerEyebrow");
    $("drawerTitle").textContent = t("drawerTitle");
    setDrawerRowCopy("drawerSavedBtn", t("drawerSavedTitle"), t("drawerSavedNote", store.saved.length));
    setDrawerRowCopy("drawerAboutBtn", t("drawerAboutTitle"), t("drawerAboutNote"));
    $("drawerContactTitle").textContent = t("drawerContactTitle");
    $("drawerContactNote").textContent = t("drawerContactNote");
    $("drawerContact").querySelector(".drawer-contact-list").setAttribute("aria-label", store.lang === "zh" ? "联系方式" : "Contact methods");
    const contactLabels = store.lang === "zh"
      ? [["邮箱", "hustyy986@gmail.com"], ["小红书", "打开主页"], ["抖音", "打开主页"], ["X", "@yongyuan1"], ["TikTok", "@wonderelian"]]
      : [["Email", "hustyy986@gmail.com"], ["RED", "Open profile"], ["Douyin", "Open profile"], ["X", "@yongyuan1"], ["TikTok", "@wonderelian"]];
    $("drawerContact").querySelectorAll(".drawer-contact-list a").forEach((link, index) => {
      link.querySelector("span").textContent = contactLabels[index][0];
      link.querySelector("strong").textContent = contactLabels[index][1];
    });
    $("drawerVideoChannelLabel").textContent = store.lang === "zh" ? "视频号" : "WeChat Channels";
    $("drawerVideoChannelValue").textContent = store.lang === "zh" ? "查看二维码" : "View QR code";
    $("videoChannelKicker").textContent = store.lang === "zh" ? "微信视频号" : "WECHAT CHANNELS";
    $("videoChannelTitle").textContent = store.lang === "zh" ? "关注视频号" : "Follow on WeChat Channels";
    $("videoChannelCaption").textContent = store.lang === "zh" ? "扫码关注视频号" : "Scan to follow on WeChat Channels";
    $("videoChannelImage").alt = store.lang === "zh" ? "三慢问道视频号二维码" : "Wendao WeChat Channels QR code";
    dom.videoChannelCloseBtn.setAttribute("aria-label", store.lang === "zh" ? "关闭视频号二维码" : "Close WeChat Channels QR code");
    $("drawerDownloadKicker").textContent = t("drawerDownloadKicker");
    $("drawerDownloadTitle").textContent = t("drawerDownloadTitle");
    $("drawerDownloadNote").textContent = t("drawerDownloadNote");
    $("drawerDownloadCta").textContent = t("drawerDownloadCta");
    $("drawerDownloadCtaNote").textContent = t("drawerDownloadCtaNote");
    $("drawerReviewCta").textContent = t("drawerReviewCta");
    $("drawerReviewCtaNote").textContent = t("drawerReviewCtaNote");
    $("drawerSupportKicker").textContent = t("drawerSupportKicker");
    $("drawerSupportTitle").textContent = t("drawerSupportTitle");
    $("drawerSupportCopy").textContent = t("drawerSupportCopy");
    $("drawerSupportCta").textContent = t("drawerSupportTitle");
    $("drawerSupportNote").textContent = t("drawerSupportNote");
    $("drawerSupport").hidden = hasNativeBridge();
    $("drawerWorksTitle").textContent = t("drawerWorksTitle");
    $("drawerWorksHeading").textContent = t("drawerWorksHeading");
    $("drawerWorkWonderTitle").textContent = t("drawerWorkWonderTitle");
    $("drawerWorkWonderNote").textContent = t("drawerWorkWonderNote");
    $("drawerWorkYixiuTitle").textContent = t("drawerWorkYixiuTitle");
    $("drawerWorkYixiuNote").textContent = t("drawerWorkYixiuNote");
    $("drawerWorkWendaoTitle").textContent = t("drawerWorkWendaoTitle");
    $("drawerWorkWendaoNote").textContent = t("drawerWorkWendaoNote");
    $("drawerWorkXiaziTitle").textContent = t("drawerWorkXiaziTitle");
    $("drawerWorkXiaziNote").textContent = t("drawerWorkXiaziNote");
    $("drawerWorkHumanTitle").textContent = t("drawerWorkHumanTitle");
    $("drawerWorkHumanNote").textContent = t("drawerWorkHumanNote");
    $("supportKicker").textContent = t("drawerSupportKicker");
    $("supportTitle").textContent = t("drawerSupportTitle");
    $("supportCopy").textContent = t("supportCopy");
    $("supportRecognition").textContent = t("supportRecognition");
    $("supportCodeLink").textContent = t("supportCodeLink");
    $("supportPosterLink").textContent = t("supportPosterLink");
    dom.supportPanel.querySelector("img").alt = store.lang === "zh" ? "微信赞赏码" : "WeChat appreciation code";
    dom.supportCloseBtn.setAttribute("aria-label", store.lang === "zh" ? "关闭随喜相助" : "Close support");
    $("drawerFooter").textContent = t("drawerFooter");
    $("downloadAppNav").setAttribute("aria-label", t("downloadOnAppStore"));
    const nativeShell = hasNativeBridge();
    $("drawerDownloadKicker").hidden = nativeShell;
    $("drawerDownloadTitle").hidden = nativeShell;
    $("drawerDownloadNote").hidden = nativeShell;
    $("downloadAppNav").hidden = nativeShell;
    $("reviewAppNav").setAttribute("aria-label", t("drawerReviewCta"));
    $("reviewAppNav").hidden = false;
  }

  function renderAll() {
    document.title = t("productName");
    dom.appShell.setAttribute("aria-label", t("productName"));
    renderDrawerContent();
    $("homeViewTitle").textContent = t("today");
    $("searchViewTitle").textContent = t("search");
    $("savedViewTitle").textContent = store.lang === "zh" ? "收藏" : "Saved styles";
    dom.langBtn.textContent = store.lang === "zh" ? "EN" : "中文";
    dom.langBtn.setAttribute("aria-label", store.lang === "zh" ? "Switch to English" : "切换为中文");
    dom.searchOpenBtn.setAttribute("aria-label", t("search"));
    dom.drawerBtn.setAttribute("aria-label", t(store.drawerOpen ? "closeMenu" : "openMenu"));
    dom.drawerCloseBtn.setAttribute("aria-label", t("closeMenu"));
    dom.backBtn.setAttribute("aria-label", store.lang === "zh" ? "返回" : "Back");
    dom.prevBtn.setAttribute("aria-label", t("previousStyle"));
    dom.nextBtn.setAttribute("aria-label", t("nextStyle"));
    dom.clearSearchBtn.setAttribute("aria-label", store.lang === "zh" ? "清除搜索" : "Clear search");
    dom.styleDeck.setAttribute("aria-roledescription", t("styleCardRole"));
    dom.lightboxCloseBtn.setAttribute("aria-label", t("closePreview"));
    dom.plusCloseBtn.setAttribute("aria-label", store.lang === "zh" ? "关闭 Plus" : "Close Plus");
    dom.guidedCloseBtn.setAttribute("aria-label", t("closeGuided"));
    renderHome();
    if (store.view === "detail") renderDetail();
    if (store.view === "search") renderSearch();
    if (store.view === "saved") renderSaved();
    if (store.view === "about") renderAbout();
    if (store.view === "screenshots") renderScreenshots();
    if (!dom.plusModal.hidden) showPlus(store.plusReasonKey || "plusSubtitle");
    if (!dom.guidedOverlay.hidden) renderGuidedStage();
  }

  const initialHash = location.hash.slice(1);
  const initialParams = new URLSearchParams(location.search);
  const screenshotMode = initialHash === "screenshots" || initialParams.get("screenshots") === "1";
  const reviewMode = initialParams.get("review") === "detail";
  const reviewStyle = initialParams.get("style");
  const reviewLang = initialParams.get("lang");
  const reviewSection = initialParams.get("section");
  const reviewGuided = initialParams.has("guided") ? Number(initialParams.get("guided")) : NaN;
  if (reviewMode) {
    store.reviewMode = "detail";
    if (["zh", "en"].includes(reviewLang)) store.lang = reviewLang;
    if (["see", "understand", "apply", "create", "explore", "compare"].includes(reviewSection)) {
      store.reviewSection = reviewSection;
    }
    if (Number.isInteger(reviewGuided) && reviewGuided >= 0) store.reviewGuidedStage = reviewGuided;
  }
  store.activeId = initialHash && styles.some((style) => style.id === initialHash)
    ? location.hash.slice(1)
    : (reviewStyle && validStyleIds.has(reviewStyle) ? reviewStyle : styles[dailyIndex()].id);
  if (initialHash && styles.some((style) => style.id === initialHash)) store.view = "detail";
  if (reviewMode) store.view = "detail";
  if (screenshotMode) store.view = "screenshots";
  document.documentElement.lang = store.lang === "zh" ? "zh-CN" : "en";
  function setTextScaleFromNative(value) {
    if (window.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell !== true) return 1;
    const scale = Math.min(1.6, Math.max(0.9, Number(value) || 1));
    document.documentElement.style.zoom = String(scale);
    document.documentElement.toggleAttribute("data-native-large-text", scale > 1.05);
    return scale;
  }

  window.StyleAtlasNativeBridge = {
    setPlusAccess(value) {
      if (window.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell !== true) return false;
      return setPlusAccessFromNative(value);
    },
    setProductPrices(value) {
      const prices = value && typeof value === "object" ? value : {};
      window.STYLE_ATLAS_RUNTIME_CONFIG.iapDisplayPrices = {
        annual: String(prices.annual || ""),
        annual_auto: String(prices.annual_auto || "")
      };
      if (!dom.plusModal.hidden) showPlus(store.plusReasonKey || "plusSubtitle");
      return window.STYLE_ATLAS_RUNTIME_CONFIG.iapDisplayPrices;
    },
    setProductPrice(value) {
      return this.setProductPrices({ annual_auto: value });
    },
    setStoreAction: setStoreActionFromNative,
    setTextScale: setTextScaleFromNative,
    resolveBundledAsset: resolveBundledAssetFromNative,
    getPlusAccess: hasPlusAccess,
    postNativeMessage
  };
  window.StyleAtlasNative = window.StyleAtlasNativeBridge;
  window.StyleAtlasRuntime = {
    getConfig: () => window.STYLE_ATLAS_RUNTIME_CONFIG,
    isExternalGalleryEnabled,
    getSubmissionMode,
    isFreeLaunchMode,
    isIapMode
  };
  window.StyleAtlasPerformance = {
    imagePipeline,
    prepareImages,
    getWikiState: () => ({
      activeStyleId: wikiRequestState.activeStyleId,
      abortedCount: wikiRequestState.abortedCount,
      inFlight: Boolean(wikiRequestState.controller)
    }),
    getExportState: () => ({ ...exportState })
  };
  window.StyleAtlasAccessibility = {
    prefersReducedMotion,
    getState: () => ({
      view: store.view,
      focus: document.activeElement?.id || document.activeElement?.tagName || "",
      overlay: !dom.plusModal.hidden ? "plus" : (!dom.lightbox.hidden ? "lightbox" : (!dom.guidedOverlay.hidden ? "guided" : (store.drawerOpen ? "drawer" : "none"))),
      viewport: { width: window.innerWidth, height: window.innerHeight }
    })
  };
  window.StyleAtlasAesthetic = {
    guides: aestheticGuides,
    getGuide: (styleId) => {
      const style = stylesById.get(styleId);
      return style ? guideFor(style) : null;
    },
    normalizeFocus: normalizedFocus,
    getReflection: (styleId) => readReflections()[styleId] || null,
    openGuided,
    closeGuided
  };
  if (new URLSearchParams(location.search).get("debug") === "a11y") {
    const panel = document.createElement("pre");
    panel.id = "a11yDebugPanel";
    panel.className = "a11y-debug-panel";
    panel.setAttribute("aria-hidden", "true");
    document.body.append(panel);
    document.addEventListener("focusin", updateAccessibilityDebug);
    window.addEventListener("resize", updateAccessibilityDebug);
    matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", updateAccessibilityDebug);
  }
  bind();
  renderAll();
  setView(store.view, false);
  if (store.reviewMode === "detail") {
    const sectionId = store.reviewSection === "compare" ? "detail-compare" : (store.reviewSection ? `detail-${store.reviewSection}` : "");
    if (sectionId) {
      const alignReviewSection = () => requestAnimationFrame(() => $(sectionId)?.scrollIntoView({ behavior: "auto", block: "start" }));
      alignReviewSection();
      const heroImage = dom.detailContent.querySelector(".detail-hero img");
      if (heroImage && !heroImage.complete) heroImage.addEventListener("load", alignReviewSection, { once: true });
    }
    if (store.reviewGuidedStage !== null) requestAnimationFrame(() => openGuided(null, store.reviewGuidedStage));
  }
  updateAccessibilityDebug();
})();
