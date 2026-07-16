(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const data = window.STYLE_ATLAS_DATA || {};
  const { categories, categoryAliases, styleAliases, categoryCopy, palettes, peopleByStyle, categoryHistory, riskByStyle, rawStyles, refinedStyles } = data;
  window.STYLE_ATLAS_RUNTIME_CONFIG = Object.assign({
    nativeShell: false,
    externalGalleryEnabled: true,
    submissionMode: "web",
    publicBaseURL: "https://yonge6.github.io/style-atlas/"
  }, window.STYLE_ATLAS_RUNTIME_CONFIG || {});
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
    overlayReturnFocus: null
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
  store.saved = [...new Set(store.saved.filter((id) => validStyleIds.has(id)))];
  store.recent = [...new Set(store.recent.filter((id) => validStyleIds.has(id)))].slice(0, 12);

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
      today: "今日风格",
      brandTitle: "虾子曰艺术风格图鉴",
      brandSubtitle: "风格图鉴",
      productName: "虾子曰艺术风格图鉴",
      positioning: "虾子曰艺术风格图鉴是一本装进口袋里的视觉风格图鉴。\n每天 3 分钟认识一种风格，建立自己的审美词库。",
      valueLine: "不是替你生成图片，而是帮你知道什么好看、为什么好看、怎么表达好看。",
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
      saveCard: "保存卡片",
      copyPrompt: "复制表达词",
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
      exportComplete: "图片已准备好",
      lockedPreview: "完整内容包含深入源流、识别方法、案例与风格表达词。"
      ,
      plus: "虾子曰艺术风格图鉴 Plus",
      unlockTitle: "解锁完整风格档案",
      unlockBody: "免费版可以先认识风格，Plus 帮你建立完整审美资料库。",
      unlockCta: "了解 Plus",
      locked: "Plus",
      freePreview: "免费预览",
      exportOptions: "保存导出",
      freeExport: "普通清晰度 · 带水印",
      plusExport: "高清无水印 · 9:16 / 1:1 / 4:5 / 16:9",
      plusSubtitle: "建立你的私人审美资料库。",
      plusBenefits: ["解锁全部 120 个风格完整档案", "无限收藏", "高清无水印保存", "多比例导出", "完整风格表达词", "后续小更新"],
      freePlan: "免费版",
      plusPlan: "Plus",
      freePlanItems: ["每日推荐", "浏览全部 120 个风格封面", "查看 20 个完整风格档案", "收藏最多 20 个", "普通清晰度带水印保存"],
      plusPlanItems: ["解锁全部 120 个完整风格档案", "无限收藏", "高清无水印保存", "多比例导出", "完整风格表达词", "后续小更新"],
      appStorePrice: "价格以 App Store 显示为准",
      comingSoon: "即将开放",
      unlockPlus: "解锁 Plus",
      restorePurchases: "恢复购买",
      oneTimePurchase: "一次购买，永久解锁",
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
      unknown: "操作失败，请稍后重试。",
      iapFootnote: "购买由 Apple App Store 安全处理",
      appStoreFootnote: "正式版将在 App Store 内开放",
      plusFuture: "Plus 将在后续版本开放",
      plusFutureBody: "首版先提供完整的免费风格浏览、搜索、收藏和离线体验。",
      savedLimit: "你已经收藏了 20 个风格。升级 Plus，建立无限风格灵感库。",
      lockedExpression: "完整风格表达词已收纳在 Plus。",
      highResLocked: "高清无水印导出属于 Plus 预览功能。"
      ,
      about: "关于",
      aboutTitle: "关于虾子曰艺术风格图鉴",
      aboutBody: "虾子曰艺术风格图鉴不是一个 AI 生成工具，而是一本帮助你建立审美词库的视觉风格图鉴。它把海报、绘画、插画、动画、民俗、数字艺术等 120 种视觉语言整理成可学习、可收藏、可表达的风格卡片。\n\n每天认识一种风格，慢慢你会更清楚地知道：什么好看，为什么好看，以及如何把脑海中的视觉感受准确表达出来。",
      aboutFor: "适合设计师、AI 创作者、品牌人、内容创作者、设计学生和艺术爱好者。",
      aboutFree: "免费版可以查看每日推荐、浏览全部风格封面、搜索风格、收藏 20 个风格，并学习 20 个完整风格档案。",
      aboutPlus: "Plus 未来会解锁全部完整风格档案、无限收藏、高清无水印保存、多比例导出和完整风格表达词。",
      safetyTitle: "版权与风格安全说明",
      safetyBody: "虾子曰艺术风格图鉴鼓励学习视觉语言，而不是复制具体作品、具体角色或当代创作者的完整可识别风格。历史艺术流派可以作为学习对象，涉及当代工作室、IP 或在世创作者时，我们更建议使用通用视觉特征来表达。",
      screenshotsTitle: "App Store Screenshot Kit",
      screenshotSlides: [
        ["每天 3 分钟提升审美", "今日风格"],
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
      productName: "Xiazishuo Style Atlas",
      positioning: "Xiazishuo Style Atlas is a pocket visual style atlas.\nLearn one visual style a day and build your own taste vocabulary.",
      valueLine: "Not just generating images — but helping you understand what looks good, why it works, and how to express it.",
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
      saveCard: "Save card",
      copyPrompt: "Copy expression",
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
      exportComplete: "Image is ready",
      lockedPreview: "The full archive includes deeper origins, recognition methods, cases and style expression.",
      plus: "Xiazishuo Style Atlas Plus",
      unlockTitle: "Unlock the full style archive",
      unlockBody: "The free version helps you discover styles. Plus helps you build a complete taste archive.",
      unlockCta: "View Plus",
      locked: "Plus",
      freePreview: "Free preview",
      exportOptions: "Export",
      freeExport: "Standard clarity · watermarked",
      plusExport: "HD watermark-free · 9:16 / 1:1 / 4:5 / 16:9",
      plusSubtitle: "Build your private taste archive.",
      plusBenefits: ["Unlock all 120 full style archives", "Unlimited saved styles", "HD watermark-free export", "Multi-ratio export", "Complete style expression", "Future minor updates"],
      freePlan: "Free",
      plusPlan: "Plus",
      freePlanItems: ["Daily pick", "Browse all 120 style covers", "View 20 full style archives", "Save up to 20 styles", "Standard watermarked export"],
      plusPlanItems: ["Unlock all 120 full style archives", "Unlimited saved styles", "HD watermark-free export", "Multi-ratio export", "Complete style expression", "Future minor updates"],
      appStorePrice: "Price shown in the App Store",
      comingSoon: "Coming Soon",
      unlockPlus: "Unlock Plus",
      restorePurchases: "Restore Purchases",
      oneTimePurchase: "One-time purchase, lifetime access",
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
      unknown: "The operation could not be completed. Please try again.",
      iapFootnote: "Purchase securely processed by Apple App Store",
      appStoreFootnote: "Available later via App Store in-app purchase",
      plusFuture: "Plus will be available in a future version",
      plusFutureBody: "The first version focuses on free browsing, search, saved styles, and offline access.",
      savedLimit: "You’ve saved 20 styles. Upgrade to Plus to build an unlimited style library.",
      lockedExpression: "Complete style expression is included in Plus.",
      highResLocked: "HD watermark-free export is a Plus preview feature."
      ,
      about: "About",
      aboutTitle: "About Xiazishuo Style Atlas",
      aboutBody: "Xiazishuo Style Atlas is not just an AI image tool. It is a visual style atlas that helps you build your taste vocabulary. It turns 120 visual languages across posters, painting, illustration, animation, folk art and digital aesthetics into learnable, saveable and expressible style cards.\n\nLearn one style a day, and you will gradually understand what looks good, why it works, and how to express the visual feeling in your mind more clearly.",
      aboutFor: "For designers, AI creators, brand builders, content creators, design students and art lovers.",
      aboutFree: "The free version includes the daily pick, all style covers, search, 20 saved styles and 20 full style archives.",
      aboutPlus: "Plus will unlock all full archives, unlimited saved styles, HD watermark-free export, multi-ratio export and complete style expression.",
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
    lightboxCloseBtn: $("lightboxCloseBtn"),
    saveLightboxBtn: $("saveLightboxBtn"),
    shareLightboxBtn: $("shareLightboxBtn"),
    deckStage: $("deckStage"),
    deckAnnouncement: $("deckAnnouncement"),
    prevGhost: $("prevGhost"),
    nextGhost: $("nextGhost"),
    todayLabel: $("todayLabel"),
    positioningCopy: $("positioningCopy"),
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
    savedCount: $("savedCount"),
    copyListBtn: $("copyListBtn"),
    savedList: $("savedList"),
    toast: $("toast"),
    plusModal: $("plusModal"),
    plusTitle: $("plusTitle"),
    plusSubtitle: $("plusSubtitle"),
    plusBenefits: $("plusBenefits"),
    freePlanTitle: $("freePlanTitle"),
    freePlanList: $("freePlanList"),
    plusPlanTitle: $("plusPlanTitle"),
    plusPlanList: $("plusPlanList"),
    plusLaunchPrice: $("plusLaunchPrice"),
    plusRegularPrice: $("plusRegularPrice"),
    plusFootnote: $("plusFootnote"),
    plusCta: $("plusCta"),
    plusRestoreBtn: $("plusRestoreBtn"),
    plusCloseBtn: $("plusCloseBtn")
  };

  document.addEventListener("error", (event) => {
    const img = event.target;
    if (img instanceof HTMLImageElement && img.src.includes("/assets/styles/") && img.src.endsWith(".webp")) {
      img.src = pngFallback(img.src);
    }
  }, true);

  function pngFallback(src) {
    const file = new URL(src, location.href).pathname.split("/").pop().replace(".webp", ".png");
    return location.hostname.endsWith("github.io")
      ? `https://raw.githubusercontent.com/Yonge6/style-atlas/main/assets/styles/${file}`
      : src.replace(".webp", ".png");
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

  function t(key, ...args) {
    const value = text[store.lang][key];
    return typeof value === "function" ? value(...args) : value;
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
    if (store.drawerOpen) setDrawer(false, false);
    store.overlayReturnFocus = intendedReturnFocus;
    store.overlayScrollY = window.scrollY;
    document.body.style.top = `-${store.overlayScrollY}px`;
    dom.appShell.inert = true;
    container.hidden = false;
    document.body.classList.add("drawer-lock");
    requestAnimationFrame(() => (focusTarget || focusableElements(container)[0])?.focus());
  }

  function closeOverlay(container, restoreFocus = true) {
    container.hidden = true;
    dom.appShell.inert = false;
    document.body.classList.remove("drawer-lock");
    document.body.style.removeProperty("top");
    window.scrollTo(0, store.overlayScrollY || 0);
    const returnFocus = store.overlayReturnFocus;
    store.overlayReturnFocus = null;
    if (restoreFocus) requestAnimationFrame(() => returnFocus?.focus());
  }

  function showPlus(reasonKey = "plusSubtitle") {
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocus = activeElement?.closest("#drawer") ? dom.drawerBtn : activeElement;
    const native = hasNativeBridge();
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
    const iapDisplayPrice = window.STYLE_ATLAS_RUNTIME_CONFIG?.iapDisplayPrice;
    dom.plusLaunchPrice.textContent = iapReady
      ? `${iapDisplayPrice || t("priceLoading")} · ${t("oneTimePurchase")}`
      : t("appStorePrice");
    dom.plusRegularPrice.textContent = "";
    dom.plusLaunchPrice.parentElement.hidden = freeLaunch;
    dom.plusRegularPrice.hidden = true;
    dom.plusFootnote.textContent = freeLaunch ? t("plusFutureBody") : (iapReady ? t("iapFootnote") : t("appStoreFootnote"));
    dom.plusCta.hidden = false;
    const storeAction = window.STYLE_ATLAS_RUNTIME_CONFIG?.storeAction || "idle";
    const isStoreBusy = ["purchasing", "restoring", "pending"].includes(storeAction);
    dom.plusCta.textContent = hasPlusAccess()
      ? t("purchaseSuccess")
      : (storeAction === "purchasing"
        ? t("purchaseLoading")
        : (storeAction === "pending"
          ? t("purchasePending")
          : (iapReady ? t("unlockPlus") : (freeLaunch ? t("plusFuture") : t("comingSoon")))));
    dom.plusCta.disabled = hasPlusAccess() || !iapReady || isStoreBusy;
    dom.plusRestoreBtn.hidden = !iapReady || hasPlusAccess();
    dom.plusRestoreBtn.textContent = storeAction === "restoring" ? t("restoreLoading") : t("restorePurchases");
    dom.plusRestoreBtn.disabled = isStoreBusy;
    if (dom.plusModal.hidden) openOverlay(dom.plusModal, dom.plusCloseBtn, returnFocus);
  }

  function closePlus(restoreFocus = true) {
    if (dom.plusModal.hidden) return;
    store.plusReasonKey = "";
    closeOverlay(dom.plusModal, restoreFocus);
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
      exportFailed: "exportFailed"
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
    if (key && normalized !== "idle") toast(t(key));
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
        <button class="copy-btn" type="button" data-action="save-card">${t("freeExport")}</button>
        ${highResReady ? `
          <p>${t("plusExport")}</p>
          <div class="export-ratios" role="group" aria-label="${t("plusExport")}">
            ${["9:16", "4:5", "1:1", "16:9"].map((ratio) => `<button class="copy-btn plus-export-ready" type="button" data-action="export-ratio" data-ratio="${ratio}">${ratio}</button>`).join("")}
          </div>
        ` : `<button class="copy-btn locked-export" type="button" data-action="plus-export">${t("plusExport")}</button>`}
      </section>
    `;
  }

  function renderDeckCard(style, active = false) {
    const lang = store.lang;
    const saved = isSaved(style.id);
    return `
      <img class="cover-image" src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="eager" decoding="async" fetchpriority="${active ? "high" : "low"}">
      <div class="cover-shade"></div>
      <div class="cover-top">
        <span>#${style.number}</span>
        <div class="card-actions">
          <button class="card-action ${saved ? "saved" : ""}" type="button" data-action="save" aria-label="${t(saved ? "unfavorite" : "favorite")}">${saved ? "♥" : "♡"}</button>
          <button class="card-action" type="button" data-action="copy-prompt" aria-label="${t("copyPrompt")}">⧉</button>
          <button class="card-action" type="button" data-action="share" aria-label="${t("share")}">↗</button>
        </div>
      </div>
      <div class="cover-title">
        <h1>${escapeHtml(style.name.en)}</h1>
        <p>${escapeHtml(style.name.zh)}</p>
      </div>
    `;
  }

  function renderDeck() {
    const style = activeStyle();
    dom.styleDeck.innerHTML = renderDeckCard(style, true);
    dom.prevGhost.innerHTML = renderDeckCard(styleByOffset(-1));
    dom.nextGhost.innerHTML = renderDeckCard(styleByOffset(1));
    dom.deckStage.classList.remove("dragging", "fly-left", "fly-right", "is-animating");
    dom.styleDeck.style.removeProperty("--drag-x");
    [dom.prevGhost, dom.nextGhost].forEach((card) => {
      card.style.removeProperty("--ghost-x");
      card.style.removeProperty("--ghost-scale");
      card.style.removeProperty("--ghost-opacity");
    });
    dom.styleDeck.setAttribute("aria-label", `${style.name[store.lang]}，${style.summary[store.lang]}`);
    dom.deckAnnouncement.textContent = `${style.number} / ${styles.length} · ${style.name[store.lang]}`;
  }

  function renderCard(style, compact = false) {
    const lang = store.lang;
    const saved = isSaved(style.id);
    return `
      <div class="badge-row">
        <div class="badge">#${style.number} · ${escapeHtml(catName(style.category))}<br>${escapeHtml(style.subtitle[lang])}</div>
        <div class="card-actions">
          <button class="card-action ${saved ? "saved" : ""}" type="button" data-action="save" aria-label="${t(saved ? "unfavorite" : "favorite")}">${saved ? "♥" : "♡"}</button>
          <button class="card-action" type="button" data-action="share" aria-label="${t("share")}">↗</button>
        </div>
      </div>
      <div class="visual">
        <img src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="lazy">
        <p class="visual-title">${escapeHtml(style.name.en)}</p>
      </div>
      <h1>${escapeHtml(style.name.en)}</h1>
      <p class="zh-name">${escapeHtml(style.name.zh)}</p>
      <p class="summary">${escapeHtml(style.summary[lang])}</p>
      <div class="chip-row">${style.tags[lang].slice(0, compact ? 3 : 5).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>
      ${compact ? "" : `<div class="card-footer"><span>← ${t("swipe")} →</span><button type="button" data-action="detail">${t("detail")}</button></div>`}
    `;
  }

  function renderHome() {
    const style = activeStyle();
    const lang = store.lang;
    dom.todayLabel.textContent = t("today");
    dom.positioningCopy.textContent = `${t("positioning")}\n${t("valueLine")}`;
    document.querySelector(".brand strong").textContent = t("brandTitle");
    document.querySelector(".brand span").textContent = t("brandSubtitle");
    document.querySelector(".drawer-head strong").textContent = t("brandTitle");
    dom.randomBtn.textContent = t("random");
    dom.categoryTitle.textContent = t("categories");
    renderDeck();
    dom.categoryChips.innerHTML = categories.map((cat) => {
      const categoryStyles = styles.filter((item) => item.category === cat[0]);
      const preview = categoryStyles.slice(0, 3).map((item) => `<img src="${item.image}" alt="${escapeHtml(item.name[lang])}" loading="lazy">`).join("");
      return `
        <button class="category-card" type="button" data-filter="${cat[0]}">
          <span class="category-copy">
            <strong>${escapeHtml(catName(cat[0]))}</strong>
            <small>${escapeHtml(t("styleCount", categoryStyles.length))}</small>
          </span>
          <span class="category-stack">${preview}</span>
        </button>
      `;
    }).join("");
  }

  function renderDetail() {
    const style = activeStyle();
    const lang = store.lang;
    const locked = isStyleLocked(style);
    const example = {
      title: `${style.name[lang]} ${store.lang === "zh" ? "原创示例" : "original example"}`,
      artist: t("productName"),
      image: style.image
    };
    addRecent(style.id);
    const gallerySection = `
      <section class="detail-section">
        <h2>${t("exhibitImages")}</h2>
        <div class="gallery-grid" id="galleryGrid">
          <figure class="gallery-item">
            <button class="gallery-open" type="button" data-action="open-image" aria-label="${escapeHtml(t("imagePreview"))}：${escapeHtml(style.name[lang])}">
              <img src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="lazy">
            </button>
            <figcaption>${escapeHtml(style.name[lang])}</figcaption>
          </figure>
        </div>
      </section>
    `;
    const exampleSection = example ? `
      <section class="detail-section">
        <h2>${t("examples")}</h2>
        <figure class="example-card">
          <img src="${escapeHtml(example.image)}" alt="${escapeHtml(example.title)}" loading="lazy">
          <figcaption>
            <strong>${escapeHtml(example.title)}</strong>
            <span>${escapeHtml(example.artist)}</span>
            ${example.source ? `<a href="${escapeHtml(example.source)}" target="_blank" rel="noreferrer">${t("source")}</a>` : ""}
          </figcaption>
        </figure>
      </section>
    ` : "";
    const promptSection = locked ? `
      <section class="detail-section locked-section">
        <div class="locked-preview">
          <h2>${t("prompt")}</h2>
          <p>${escapeHtml(t("lockedPreview"))}</p>
        </div>
        <div class="lock-overlay">
          <span>${t("locked")}</span>
          <strong>${t("unlockTitle")}</strong>
          <p>${t("unlockBody")}</p>
          <button class="copy-btn" type="button" data-action="show-plus">${t("unlockCta")}</button>
        </div>
      </section>
    ` : `
      <section class="detail-section">
        <h2>${t("prompt")}</h2>
        <div class="prompt-box">${escapeHtml(style.imagePrompts[lang])}<br><br>${escapeHtml(style.negativePrompt[lang])}</div>
        <div class="prompt-actions">
          <button class="copy-btn" type="button" data-action="copy-prompt">${t("copyPrompt")}</button>
          <button class="copy-btn" type="button" data-action="save-card">${t("saveCard")}</button>
        </div>
      </section>
    `;
    const archiveSections = locked ? `
      ${lockedSection(t("curator"), style.curatorNote[lang])}
      ${lockedSection(t("exhibitImages"), style.name[lang])}
      <section class="detail-section">
        <h2>${t("features")}</h2>
        <div class="feature-grid">${style.visualFeatures[lang].slice(0, 3).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </section>
      ${lockedSection(t("history"), style.history[lang])}
      ${lockedSection(t("why"), style.why[lang])}
      ${lockedSection(t("people"), style.people[lang].join(" / "))}
      ${lockedSection(t("lookFor"), style.lookFor[lang].slice(0, 2).join(" / "))}
      ${lockedSection(t("references"), style.references[lang][0])}
      <section class="detail-section">
        <h2>${t("useCases")}</h2>
        <div class="chip-row">${style.useCases[lang].slice(0, 3).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
      </section>
      ${promptSection}
    ` : `
      <section class="detail-section">
        <h2>${t("curator")}</h2>
        <p>${escapeHtml(style.curatorNote[lang])}</p>
      </section>
      ${gallerySection}
      <section class="detail-section">
        <h2>${t("features")}</h2>
        <div class="feature-grid">${style.visualFeatures[lang].map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </section>
      <section class="detail-section">
        <h2>${t("history")}</h2>
        <p>${escapeHtml(style.history[lang])}</p>
      </section>
      <section class="detail-section">
        <h2>${t("why")}</h2>
        <p>${escapeHtml(style.why[lang])}</p>
      </section>
      <section class="detail-section">
        <h2>${t("people")}</h2>
        <div class="chip-row">${style.people[lang].map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
      </section>
      <section class="detail-section">
        <h2>${t("lookFor")}</h2>
        <ul class="detail-list">${style.lookFor[lang].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="detail-section">
        <h2>${t("references")}</h2>
        <ul class="detail-list">${style.references[lang].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="detail-section">
        <h2>${t("useCases")}</h2>
        <div class="chip-row">${style.useCases[lang].map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}</div>
      </section>
      ${exampleSection}
      ${promptSection}
    `;
    dom.detailContent.innerHTML = `
      <div class="detail-hero style-card">${renderCard(style, true)}</div>
      ${locked ? `<p class="access-note">${t("freePreview")}</p>` : ""}
      <section class="detail-section">
        <h2>${t("memory")}</h2>
        <p>${escapeHtml(style.memoryAnchor[lang])}</p>
      </section>
      ${archiveSections}
      ${renderExportPanel()}
      <section class="detail-section">
        <h2>${t("similar")}</h2>
        <div class="result-list">${style.relatedStyles.map((id) => resultCard(styles.find((item) => item.id === id))).join("")}</div>
      </section>
    `;
    if (!locked) loadWikiGallery(style);
  }

  async function loadWikiGallery(style) {
    if (!isExternalGalleryEnabled()) return;
    const gallery = $("galleryGrid");
    if (!gallery) return;
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
      const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
      if (!response.ok || style.id !== activeStyle().id) return;
      const data = await response.json();
      const pages = Object.values(data.query?.pages || {})
        .filter((page) => page.thumbnail?.source && page.fullurl)
        .slice(0, 4);
      gallery.insertAdjacentHTML("beforeend", pages.map((page) => `
        <figure class="gallery-item">
          <button class="gallery-open" type="button" data-action="open-image" aria-label="${escapeHtml(t("imagePreview"))}：${escapeHtml(page.title)}">
            <img src="${escapeHtml(page.thumbnail.source)}" alt="${escapeHtml(page.title)}" loading="lazy">
          </button>
          <figcaption><a href="${escapeHtml(page.fullurl)}" target="_blank" rel="noreferrer">${escapeHtml(page.title)}</a></figcaption>
        </figure>
      `).join(""));
    } catch {
      // External images are bonus context; the detail page must still work offline.
    }
  }

  function resultCard(style) {
    const lang = store.lang;
    return `
      <article class="result-card" data-style="${style.id}">
        <button class="result-open" type="button" data-action="open-style" data-id="${style.id}" aria-label="${escapeHtml(t("openStyle"))}：${escapeHtml(style.name[lang])}">
          <img class="thumb" src="${style.image}" alt="" loading="lazy">
          <span>
            <h3>${escapeHtml(style.name[lang])}</h3>
            <p>${escapeHtml(style.summary[lang])}</p>
          </span>
        </button>
        <button class="card-action ${isSaved(style.id) ? "saved" : ""}" type="button" data-action="save-row" data-id="${style.id}" aria-label="${t("favorite")}">${isSaved(style.id) ? "♥" : "♡"}</button>
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

    dom.searchResults.classList.toggle("gallery-grid", !query && !store.filter);
    dom.searchResults.innerHTML = results.length ? results.map(resultCard).join("") : `<p class="empty">${t("empty")}</p>`;
  }

  function renderSaved() {
    const savedStyles = store.saved.map((id) => styles.find((style) => style.id === id)).filter(Boolean);
    dom.savedCount.textContent = t("saved", savedStyles.length);
    dom.copyListBtn.textContent = t("copyList");
    dom.copyListBtn.disabled = savedStyles.length === 0;
    dom.savedList.innerHTML = savedStyles.length ? savedStyles.map(resultCard).join("") : `<p class="empty">${t("savedEmpty")}</p>`;
  }

  function renderAbout() {
    dom.aboutContent.innerHTML = `
      <section class="detail-section about-hero">
        <p class="plus-kicker">${escapeHtml(t("productName"))}</p>
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
      <section class="detail-section">
        <h2>${store.lang === "zh" ? "免费版能做什么" : "What Free Includes"}</h2>
        <p>${escapeHtml(t("aboutFree"))}</p>
      </section>
      <section class="detail-section">
        <h2>${isFreeLaunchMode() ? (store.lang === "zh" ? "Plus 后续版本计划" : "Future Plus Plan") : (store.lang === "zh" ? "Plus 未来会解锁什么" : "What Plus Will Unlock")}</h2>
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
  }

  function screenshotMock(index, style, lang) {
    if (index === 5) {
      if (isFreeLaunchMode()) {
        return `<div class="shot-list">${styles.slice(8, 12).map((item) => `<span><img src="${item.image}" alt=""><b>${escapeHtml(item.name[lang])}</b></span>`).join("")}</div>`;
      }
      return `<div class="shot-paywall"><h2>${escapeHtml(t("plus"))}</h2><p>${escapeHtml(t("plusSubtitle"))}</p><ul>${t("plusPlanItems").slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
    }
    if (index === 2) {
      return `<div class="shot-panel"><h3>${escapeHtml(style.name[lang])}</h3><p>${escapeHtml(style.history[lang]).slice(0, 90)}...</p><p>${escapeHtml(style.why[lang]).slice(0, 72)}...</p></div>`;
    }
    if (index === 3) {
      return `<div class="shot-list">${styles.slice(0, 4).map((item) => `<span><img src="${item.image}" alt=""><b>${escapeHtml(item.name[lang])}</b></span>`).join("")}</div>`;
    }
    if (index === 4) {
      return `<div class="shot-export"><img src="${style.image}" alt=""><button>${escapeHtml(t("freeExport"))}</button></div>`;
    }
    return `<div class="shot-card-visual"><img src="${style.image}" alt=""><h2>${escapeHtml(style.name.en)}</h2><p>${escapeHtml(style.name.zh)}</p></div>`;
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

  function openDetail(id = store.activeId, sourceView = store.view) {
    if (id && validStyleIds.has(id)) store.activeId = id;
    store.backView = sourceView === "detail" ? "home" : sourceView;
    setView("detail");
  }

  function setView(view) {
    if (view === "detail" && !store.backView) store.backView = "home";
    if (view === "screenshots") renderScreenshots();
    if (view === "about") renderAbout();
    if (view === "detail") renderDetail();
    if (store.drawerOpen) setDrawer(false, false);
    store.view = view;
    document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === `${view}View`));
    document.querySelectorAll(".nav-btn").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
    document.querySelectorAll(".nav-btn").forEach((node) => {
      if (node.dataset.view) node.setAttribute("aria-current", node.dataset.view === view ? "page" : "false");
    });
    dom.backBtn.classList.toggle("hidden", view === "home");
    document.querySelector(".topbar").classList.toggle("has-back", view !== "home");
    if (view === "search") {
      renderSearch();
      setTimeout(() => dom.searchInput.focus(), 80);
    }
    if (view === "saved") renderSaved();
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
    if (open) requestAnimationFrame(() => dom.drawerCloseBtn.focus());
    if (!open) {
      document.body.style.removeProperty("top");
      window.scrollTo(0, store.drawerScrollY || 0);
      const returnFocus = store.drawerReturnFocus;
      store.drawerReturnFocus = null;
      if (restoreFocus) requestAnimationFrame(() => returnFocus?.focus());
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

  function toggleSaved(id = activeStyle().id) {
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
    renderDeck();
    if (store.view === "detail") renderDetail();
    if (store.view === "search") renderSearch();
    if (store.view === "saved") renderSaved();
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

  async function loadImage(src) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    try {
      await image.decode();
      return image;
    } catch (error) {
      if (!src.endsWith(".webp")) throw error;
      return loadImage(pngFallback(src));
    }
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
    const ctx = canvas.getContext("2d");
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
    ctx.fillStyle = "rgba(22, 18, 12, 0.82)";
    roundRect(ctx, 52, 62, 150, 70, 30);
    ctx.fill();
    ctx.fillStyle = "#f4cf76";
    ctx.font = "700 34px sans-serif";
    ctx.fillText(`#${style.number}`, 85, 108);
    ctx.fillStyle = "rgba(255, 246, 220, 0.82)";
    ctx.font = `700 ${Math.max(24, Math.min(34, canvas.width * 0.028))}px sans-serif`;
    ctx.textAlign = "right";
    ctx.fillText(t("productName"), canvas.width - 64, 108);
    ctx.textAlign = "left";
    ctx.fillStyle = "#fff6dc";
    const titleSize = Math.max(72, Math.min(126, canvas.width * 0.1, canvas.height * 0.12));
    ctx.font = `700 ${titleSize}px Georgia`;
    wrap(ctx, style.name.en, 64, canvas.height - titleSize * 1.55, canvas.width - 128, titleSize * 0.98);
    ctx.fillStyle = "#f4cf76";
    const subtitleSize = Math.max(34, Math.min(52, canvas.width * 0.043));
    ctx.font = `800 ${subtitleSize}px sans-serif`;
    wrap(ctx, style.name.zh, 68, canvas.height - 72, canvas.width - 136, subtitleSize * 1.18);
    drawWatermark(ctx, canvas.width, canvas.height);
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.94));
  }

  async function detailCardBlob(style) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 2500;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ead397";
    roundRect(ctx, 0, 0, 1080, 2500, 48);
    ctx.fill();
    ctx.strokeStyle = "rgba(27, 20, 8, .08)";
    ctx.lineWidth = 2;
    for (let x = 48; x < 1080; x += 92) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 2500);
      ctx.stroke();
    }
    const shine = ctx.createLinearGradient(0, 0, 1080, 700);
    shine.addColorStop(0, "rgba(255,255,255,0)");
    shine.addColorStop(0.58, "rgba(255,255,255,0.2)");
    shine.addColorStop(0.66, "rgba(255,255,255,0)");
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, 1080, 2500);
    ctx.fillStyle = "rgba(22, 18, 12, 0.92)";
    roundRect(ctx, 52, 50, 590, 148, 16);
    ctx.fill();
    ctx.fillStyle = "#f4cf76";
    ctx.font = "800 28px sans-serif";
    wrap(ctx, `#${style.number} · ${catName(style.category)} ${style.subtitle[store.lang]}`, 78, 88, 520, 38);
    ctx.fillStyle = "#5b4518";
    ctx.font = "800 28px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(t("productName"), 1020, 208);
    ctx.textAlign = "left";
    ctx.fillStyle = "#17130d";
    roundRect(ctx, 760, 50, 110, 110, 18);
    ctx.fill();
    roundRect(ctx, 900, 50, 110, 110, 18);
    ctx.fill();
    ctx.fillStyle = "#fff6dc";
    ctx.font = "700 50px sans-serif";
    ctx.fillText(isSaved(style.id) ? "♥" : "♡", 797, 122);
    ctx.fillText("↗", 938, 122);
    const image = await loadImage(style.image);
    const x = 52;
    const y = 230;
    const width = 976;
    const height = 1627;
    ctx.save();
    roundRect(ctx, x, y, width, height, 18);
    ctx.clip();
    const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const imageWidth = image.naturalWidth * scale;
    const imageHeight = image.naturalHeight * scale;
    ctx.fillStyle = "#111";
    ctx.fillRect(x, y, width, height);
    ctx.drawImage(image, x + (width - imageWidth) / 2, y + (height - imageHeight) / 2, imageWidth, imageHeight);
    ctx.restore();
    ctx.fillStyle = "#14100a";
    ctx.font = "700 124px Georgia";
    wrap(ctx, style.name.en, 52, 2010, 980, 124);
    ctx.fillStyle = "#57451e";
    ctx.font = "800 52px sans-serif";
    wrap(ctx, style.name.zh, 56, 2142, 920, 64);
    ctx.fillStyle = "#3f3422";
    ctx.font = "42px sans-serif";
    wrap(ctx, style.summary[store.lang], 56, 2260, 920, 60);
    let chipX = 56;
    const chipY = 2388;
    ctx.font = "700 32px sans-serif";
    style.tags[store.lang].slice(0, 3).forEach((tag) => {
      const chipWidth = Math.min(250, ctx.measureText(tag).width + 64);
      ctx.fillStyle = "rgba(255, 255, 255, 0.36)";
      roundRect(ctx, chipX, chipY, chipWidth, 78, 39);
      ctx.fill();
      ctx.strokeStyle = "rgba(22, 18, 12, 0.14)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#302716";
      ctx.fillText(tag, chipX + 32, chipY + 50);
      chipX += chipWidth + 22;
    });
    drawWatermark(ctx, canvas.width, canvas.height);
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.94));
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

  function openImage(src, alt) {
    dom.lightboxImage.src = src;
    dom.lightboxImage.alt = alt || "";
    dom.lightbox.setAttribute("aria-label", `${t("imagePreview")}：${alt || ""}`);
    dom.lightboxCloseBtn.setAttribute("aria-label", t("closePreview"));
    dom.saveLightboxBtn.textContent = t("saveCard");
    dom.shareLightboxBtn.textContent = t("share");
    dom.lightbox.dataset.src = src;
    openOverlay(dom.lightbox, dom.lightboxCloseBtn);
  }

  function closeImage(restoreFocus = true) {
    if (dom.lightbox.hidden) return;
    dom.lightboxImage.removeAttribute("src");
    delete dom.lightbox.dataset.src;
    closeOverlay(dom.lightbox, restoreFocus);
  }

  async function shareImage(src = dom.lightbox.dataset.src) {
    if (!src) return;
    try {
      const file = await imageFile(src, "style-atlas-image.png");
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(file);
        if (postNativeMessage("shareImage", { dataURL, filename: file.name })) return;
      }
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: activeStyle().name[store.lang], files: [file] });
        return;
      }
      await copyText(src);
    } catch {
      toast(t("shareFailed"));
    }
  }

  async function saveImage(src = dom.lightbox.dataset.src) {
    if (!src) return;
    try {
      const file = await imageFile(src, "style-atlas-image.png");
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(file);
        if (postNativeMessage("exportImage", { dataURL, filename: file.name })) {
          toast(t("exportStarted"));
          return;
        }
      }
      downloadBlob(file, file.name);
      toast(t("cardSaved"));
    } catch {
      toast(t("saveFailed"));
    }
  }

  async function shareStyle(style = activeStyle()) {
    const publicBase = new URL(window.STYLE_ATLAS_RUNTIME_CONFIG.publicBaseURL, "https://yonge6.github.io/style-atlas/");
    const url = `${publicBase.href.replace(/#.*$/, "").replace(/\/?$/, "/")}#${style.id}`;
    const payload = { title: style.name[store.lang], text: style.summary[store.lang], url };
    try {
      if (navigator.share) {
        const file = await coverFile(style);
        if (!navigator.canShare || navigator.canShare({ files: [file] })) {
          await navigator.share({ ...payload, files: [file] });
          return;
        }
        await navigator.share(payload);
        return;
      }
      await copyText(`${payload.title}\n${payload.text}\n${payload.url}`);
    } catch (error) {
      if (error?.name === "AbortError") return;
      const copied = await copyText(url);
      if (!copied) toast(t("shareFailed"));
    }
  }

  async function saveShareCard(style = activeStyle(), ratio = null) {
    try {
      toast(t("exportStarted"));
      const blob = ratio
        ? await coverCardBlob(style, ratio)
        : await (store.view === "detail" ? detailCardBlob(style) : coverCardBlob(style));
      const filename = `${style.id}-style-atlas${ratio ? `-${ratio.replace(":", "x")}` : ""}.png`;
      if (hasNativeBridge()) {
        const dataURL = await blobToDataURL(blob);
        if (postNativeMessage("exportImage", { dataURL, filename })) return;
      }
      downloadBlob(blob, filename);
      toast(t("cardSaved"));
    } catch {
      toast(t("saveFailed"));
    }
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

  function wrap(ctx, textValue, x, y, maxWidth, lineHeight, centered = false) {
    const words = String(textValue).split(/\s+/);
    let line = "";
    for (const word of words) {
      if (ctx.measureText(word).width > maxWidth) {
        for (const char of word) {
          const test = line ? `${line}${char}` : char;
          if (ctx.measureText(test).width > maxWidth && line) {
            ctx.fillText(line, x, y);
            line = char;
            y += lineHeight;
          } else {
            line = test;
          }
        }
        continue;
      }
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = word;
        y += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, centered ? x : x, y);
  }

  function drawWatermark(ctx, width, height) {
    if (!ACCESS_CONFIG.freeExportWatermark || hasPlusAccess()) return;
    const watermark = store.lang === "zh" ? "虾子曰艺术风格图鉴 Free" : "Xiazishuo Style Atlas Free";
    ctx.save();
    ctx.globalAlpha = 0.82;
    ctx.fillStyle = "rgba(10, 8, 6, 0.58)";
    const boxWidth = Math.min(430, Math.max(292, watermark.length * 18));
    roundRect(ctx, width - boxWidth - 60, height - 92, boxWidth, 50, 25);
    ctx.fill();
    ctx.fillStyle = "#fff6dc";
    ctx.font = "700 24px sans-serif";
    ctx.fillText(watermark, width - boxWidth - 32, height - 58);
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
    dom.backBtn.addEventListener("click", () => {
      const returnFocus = store.view === "search" ? store.viewReturnFocus : null;
      setView(store.view === "detail" ? store.backView : "home");
      store.viewReturnFocus = null;
      if (returnFocus) requestAnimationFrame(() => returnFocus.focus());
    });
    dom.randomBtn.addEventListener("click", () => {
      if (animating || dragging) return;
      store.activeId = styles[Math.floor(Math.random() * styles.length)].id;
      renderDeck();
    });
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
    let animating = false;
    let settleTimer = 0;
    let swipeTimer = 0;

    function resetGhost(card) {
      card.style.removeProperty("--ghost-x");
      card.style.removeProperty("--ghost-scale");
      card.style.removeProperty("--ghost-opacity");
    }

    function paintDrag() {
      dragFrame = 0;
      dom.styleDeck.style.setProperty("--drag-x", `${dragX}px`);
      const progress = Math.min(1, Math.abs(dragX) / Math.max(96, dom.styleDeck.clientWidth * 0.42));
      const target = dragX < 0 ? dom.nextGhost : dom.prevGhost;
      const other = dragX < 0 ? dom.prevGhost : dom.nextGhost;
      const side = dragX < 0 ? 1 : -1;
      target.style.setProperty("--ghost-x", `${side * 22 * (1 - progress)}px`);
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

    function settleBack() {
      clearGestureTimers();
      cancelDragFrame();
      dom.deckStage.classList.remove("dragging");
      requestAnimationFrame(() => {
        dom.styleDeck.style.setProperty("--drag-x", "0px");
        resetGhost(dom.prevGhost);
        resetGhost(dom.nextGhost);
      });
      settleTimer = setTimeout(() => {
        dom.styleDeck.style.removeProperty("--drag-x");
      }, 240);
    }

    function completeSwipe(direction) {
      if (animating || dragging) return;
      clearGestureTimers();
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
      swipeTimer = setTimeout(finish, 280);
    }

    function finishGesture(cancelled = false) {
      if (!dragging) return;
      dragging = false;
      if (cancelled) {
        settleBack();
        return;
      }
      const horizontal = gestureAxis === "x" || Math.abs(dragX) > Math.abs(dragY);
      const distanceThreshold = Math.min(72, dom.styleDeck.clientWidth * 0.18);
      const velocityIsFresh = performance.now() - lastTime < 100;
      const shouldChange = horizontal && (Math.abs(dragX) >= distanceThreshold || (velocityIsFresh && Math.abs(velocityX) >= 0.36));
      if (shouldChange) {
        completeSwipe(dragX < 0 || (dragX === 0 && velocityX < 0) ? 1 : -1);
        return;
      }
      settleBack();
    }

    dom.styleDeck.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button") || animating) return;
      clearGestureTimers();
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      lastX = startX;
      lastTime = performance.now();
      dragX = 0;
      dragY = 0;
      velocityX = 0;
      gestureAxis = "";
      dom.styleDeck.setPointerCapture(event.pointerId);
      dom.deckStage.classList.add("dragging");
    });

    dom.styleDeck.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const coalesced = event.getCoalescedEvents ? event.getCoalescedEvents() : [];
      const point = coalesced[coalesced.length - 1] || event;
      const dx = point.clientX - startX;
      const dy = point.clientY - startY;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) moved = true;
      dragY = dy;
      if (!gestureAxis && Math.max(Math.abs(dx), Math.abs(dy)) > 7) gestureAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      if (gestureAxis === "y") return;
      event.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(1, now - lastTime);
      const sampleVelocity = (point.clientX - lastX) / elapsed;
      velocityX = velocityX * 0.58 + sampleVelocity * 0.42;
      lastX = point.clientX;
      lastTime = now;
      dragX = Math.max(-dom.styleDeck.clientWidth, Math.min(dom.styleDeck.clientWidth, dx));
      if (!dragFrame) dragFrame = requestAnimationFrame(paintDrag);
    }, { passive: false });

    dom.styleDeck.addEventListener("pointerup", () => {
      if (!dragging) return;
      finishGesture();
    });

    dom.styleDeck.addEventListener("pointercancel", () => {
      finishGesture(true);
    });

    document.addEventListener("gesturestart", (event) => event.preventDefault(), { passive: false });
    document.addEventListener("gesturechange", (event) => event.preventDefault(), { passive: false });

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
        return openImage(img.currentSrc || img.src, img.alt);
      }
      if (action === "open-style" && id) return openDetail(id, store.view);
      if (action === "purchase-plus") {
        if (!isIapMode() || !hasNativeBridge()) return toast(isFreeLaunchMode() ? t("plusFuture") : t("comingSoon"));
        if (["purchasing", "restoring", "pending"].includes(window.STYLE_ATLAS_RUNTIME_CONFIG?.storeAction)) return;
        setStoreActionFromNative("purchasing");
        if (!postNativeMessage("purchasePlus")) setStoreActionFromNative("unavailable", "productUnavailable");
        return;
      }
      if (action === "restore-purchases") {
        if (!isIapMode() || !hasNativeBridge()) return toast(t("comingSoon"));
        if (["purchasing", "restoring", "pending"].includes(window.STYLE_ATLAS_RUNTIME_CONFIG?.storeAction)) return;
        setStoreActionFromNative("restoring");
        if (!postNativeMessage("restorePurchases")) setStoreActionFromNative("failed", "restoreFailed");
        return;
      }
      if (action === "close-lightbox") return closeImage();
      if (action === "share-lightbox") return shareImage();
      if (action === "save-lightbox") return saveImage();
      if (action === "show-plus") return showPlus();
      if (action === "close-plus") return closePlus();
      if (action === "plus-export") return canExportHighRes() ? saveShareCard() : showPlus("highResLocked");
      if (action === "export-ratio" && ratio) return canExportHighRes() ? saveShareCard(activeStyle(), ratio) : showPlus("highResLocked");
      if (action === "copy-prompt") return copyStyleExpression();
      if (action === "save-card") return saveShareCard();
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

    dom.plusModal.addEventListener("click", (event) => {
      if (event.target === dom.plusModal) closePlus();
    });
    dom.lightbox.addEventListener("click", (event) => {
      if (event.target === dom.lightbox) closeImage();
    });

    document.querySelectorAll(".nav-btn").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.action === "show-plus") {
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
      const overlay = !dom.plusModal.hidden ? dom.plusModal : (!dom.lightbox.hidden ? dom.lightbox : (store.drawerOpen ? dom.drawer : null));
      if (!overlay) return;
      if (event.key === "Escape") {
        event.preventDefault();
        if (!dom.plusModal.hidden) closePlus();
        else if (!dom.lightbox.hidden) closeImage();
        else setDrawer(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusableElements(overlay);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
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

  function renderAll() {
    document.title = t("productName");
    dom.appShell.setAttribute("aria-label", t("productName"));
    dom.drawer.setAttribute("aria-label", `${t("productName")} · ${store.lang === "zh" ? "导航" : "Navigation"}`);
    dom.langBtn.textContent = store.lang === "zh" ? "EN" : "中文";
    dom.langBtn.setAttribute("aria-label", store.lang === "zh" ? "Switch to English" : "切换为中文");
    dom.searchOpenBtn.setAttribute("aria-label", t("search"));
    dom.drawerBtn.setAttribute("aria-label", t(store.drawerOpen ? "closeMenu" : "openMenu"));
    dom.drawerCloseBtn.setAttribute("aria-label", t("closeMenu"));
    dom.backBtn.setAttribute("aria-label", store.lang === "zh" ? "返回" : "Back");
    dom.prevBtn.setAttribute("aria-label", t("previousStyle"));
    dom.nextBtn.setAttribute("aria-label", t("nextStyle"));
    dom.clearSearchBtn.setAttribute("aria-label", store.lang === "zh" ? "清除搜索" : "Clear search");
    dom.styleDeck.setAttribute("aria-label", t("openStyle"));
    dom.lightboxCloseBtn.setAttribute("aria-label", t("closePreview"));
    dom.plusCloseBtn.setAttribute("aria-label", store.lang === "zh" ? "关闭 Plus" : "Close Plus");
    renderHome();
    if (store.view === "detail") renderDetail();
    if (store.view === "search") renderSearch();
    if (store.view === "saved") renderSaved();
    document.querySelectorAll(".nav-btn").forEach((button) => {
      const map = {
        home: store.lang === "zh" ? "今日" : "Today",
        detail: store.lang === "zh" ? "探索" : "Explore",
        search: store.lang === "zh" ? "搜索" : "Search",
        saved: store.lang === "zh" ? "收藏" : "Saved",
        about: t("about"),
        screenshots: t("screenshotsTitle")
      };
      button.textContent = button.dataset.view ? map[button.dataset.view] : t("plus");
    });
    if (store.view === "about") renderAbout();
    if (store.view === "screenshots") renderScreenshots();
    if (!dom.plusModal.hidden) showPlus(store.plusReasonKey || "plusSubtitle");
  }

  const initialHash = location.hash.slice(1);
  const screenshotMode = initialHash === "screenshots" || new URLSearchParams(location.search).get("screenshots") === "1";
  store.activeId = initialHash && styles.some((style) => style.id === initialHash)
    ? location.hash.slice(1)
    : styles[dailyIndex()].id;
  if (initialHash && styles.some((style) => style.id === initialHash)) store.view = "detail";
  if (screenshotMode) store.view = "screenshots";
  document.documentElement.lang = store.lang === "zh" ? "zh-CN" : "en";
  window.StyleAtlasNativeBridge = {
    setPlusAccess(value) {
      if (window.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell !== true) return false;
      return setPlusAccessFromNative(value);
    },
    setProductPrice(value) {
      window.STYLE_ATLAS_RUNTIME_CONFIG.iapDisplayPrice = String(value || "");
      if (!dom.plusModal.hidden) showPlus(store.plusReasonKey || "plusSubtitle");
      return window.STYLE_ATLAS_RUNTIME_CONFIG.iapDisplayPrice;
    },
    setStoreAction: setStoreActionFromNative,
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
  bind();
  renderAll();
  setView(store.view);
})();
