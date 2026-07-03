(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const data = window.STYLE_ATLAS_DATA || {};
  const { categories, categoryAliases, styleAliases, categoryCopy, palettes, peopleByStyle, categoryHistory, riskByStyle, rawStyles, refinedStyles } = data;
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
  const readLang = () => (["zh", "en"].includes(localStorage.getItem("styleAtlasLang")) ? localStorage.getItem("styleAtlasLang") : (navigator.language.startsWith("zh") ? "zh" : "en"));
  const readArray = (key) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
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
    query: "",
    filter: ""
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
  styles.forEach((style) => {
    style.isFreeFullAccess = ACCESS_CONFIG.freeFullStyleIds.includes(style.id);
    style.accessTier = style.isFreeFullAccess ? "free-full" : "plus";
    style.isPlusLocked = !canViewFullStyle(style);
    style.exportTier = hasPlusAccess() ? "plus" : "free";
  });

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

  const text = {
    zh: {
      today: "今日风格",
      positioning: "一本装进口袋里的视觉风格图鉴。每天 3 分钟认识一种风格，建立自己的审美词库。",
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
      cardSaved: "分享卡片已下载"
      ,
      plus: "Style Atlas Plus",
      unlockTitle: "解锁完整风格档案",
      unlockBody: "完整源流、形成原因、识别方法、代表案例和完整风格表达词已收纳在 Plus。",
      unlockCta: "了解 Plus",
      locked: "Plus",
      freePreview: "免费预览",
      exportOptions: "保存导出",
      freeExport: "普通清晰度 · 9:16 · 带水印",
      plusExport: "高清无水印 · 9:16 / 1:1 / 4:5 / 16:9",
      plusSubtitle: "建立你的私人审美资料库。",
      plusBenefits: ["解锁全部 120 个风格完整档案", "无限收藏", "高清无水印保存", "多比例导出", "离线查看", "后续小更新"],
      launchPrice: "首发限时 ¥28 / $3.99",
      regularPrice: "正式价 ¥48 / $7.99",
      comingSoon: "即将开放",
      appStoreFootnote: "正式版将在 App Store 内开放",
      savedLimit: "你已经收藏了 20 个风格。升级 Plus，建立无限风格灵感库。",
      lockedExpression: "完整风格表达词已收纳在 Plus。",
      highResLocked: "高清无水印导出属于 Plus 预览功能。"
    },
    en: {
      today: "Today's Pick",
      positioning: "A pocket visual style atlas. Learn one visual style a day and build your own taste vocabulary.",
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
      cardSaved: "Share card downloaded",
      plus: "Style Atlas Plus",
      unlockTitle: "Unlock the full style archive",
      unlockBody: "Full origins, reasons, recognition methods, representative cases and complete style expression are included in Plus.",
      unlockCta: "View Plus",
      locked: "Plus",
      freePreview: "Free preview",
      exportOptions: "Export",
      freeExport: "Standard clarity · 9:16 · watermarked",
      plusExport: "HD watermark-free · 9:16 / 1:1 / 4:5 / 16:9",
      plusSubtitle: "Build your private taste archive.",
      plusBenefits: ["Unlock all 120 full style archives", "Unlimited saved styles", "HD watermark-free export", "Multi-ratio export", "Offline viewing", "Future minor updates"],
      launchPrice: "Launch offer ¥28 / $3.99",
      regularPrice: "Regular ¥48 / $7.99",
      comingSoon: "Coming Soon",
      appStoreFootnote: "Available later via App Store in-app purchase",
      savedLimit: "You’ve saved 20 styles. Upgrade to Plus to build an unlimited style library.",
      lockedExpression: "Complete style expression is included in Plus.",
      highResLocked: "HD watermark-free export is a Plus preview feature."
    }
  };

  const dom = {
    backBtn: $("backBtn"),
    langBtn: $("langBtn"),
    searchOpenBtn: $("searchOpenBtn"),
    drawerBtn: $("drawerBtn"),
    drawerCloseBtn: $("drawerCloseBtn"),
    drawer: $("drawer"),
    drawerBackdrop: $("drawerBackdrop"),
    lightbox: $("lightbox"),
    lightboxImage: $("lightboxImage"),
    deckStage: $("deckStage"),
    prevGhost: $("prevGhost"),
    nextGhost: $("nextGhost"),
    todayLabel: $("todayLabel"),
    positioningCopy: $("positioningCopy"),
    randomBtn: $("randomBtn"),
    styleDeck: $("styleDeck"),
    prevBtn: $("prevBtn"),
    nextBtn: $("nextBtn"),
    swipeHint: $("swipeHint"),
    categoryTitle: $("categoryTitle"),
    categoryChips: $("categoryChips"),
    detailContent: $("detailContent"),
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
    plusLaunchPrice: $("plusLaunchPrice"),
    plusRegularPrice: $("plusRegularPrice"),
    plusFootnote: $("plusFootnote"),
    plusCta: $("plusCta")
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
    const date = new Date().toISOString().slice(0, 10);
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
    localStorage.setItem("styleAtlasLang", store.lang);
    localStorage.setItem("styleAtlasSaved", JSON.stringify(store.saved));
    localStorage.setItem("styleAtlasRecent", JSON.stringify(store.recent));
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

  function showPlus(reasonKey = "plusSubtitle") {
    store.plusReasonKey = reasonKey;
    dom.plusTitle.textContent = t("plus");
    dom.plusSubtitle.textContent = t(reasonKey);
    dom.plusBenefits.innerHTML = t("plusBenefits").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    dom.plusLaunchPrice.textContent = t("launchPrice");
    dom.plusRegularPrice.textContent = t("regularPrice");
    dom.plusFootnote.textContent = t("appStoreFootnote");
    dom.plusCta.textContent = t("comingSoon");
    dom.plusModal.hidden = false;
    document.body.classList.add("drawer-lock");
    setDrawer(false);
  }

  function closePlus() {
    dom.plusModal.hidden = true;
    store.plusReasonKey = "";
    document.body.classList.remove("drawer-lock");
  }

  function lockedSection(title, preview) {
    return `
      <section class="detail-section locked-section">
        <div class="locked-preview">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(preview)}</p>
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
        <button class="copy-btn ${highResReady ? "plus-export-ready" : "locked-export"}" type="button" data-action="plus-export">${t("plusExport")}</button>
      </section>
    `;
  }

  function renderDeckCard(style) {
    const lang = store.lang;
    const saved = isSaved(style.id);
    return `
      <img class="cover-image" src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="eager">
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
    dom.positioningCopy.textContent = t("positioning");
    dom.randomBtn.textContent = t("random");
    dom.swipeHint.textContent = t("swipe");
    dom.categoryTitle.textContent = t("categories");
    dom.styleDeck.innerHTML = renderDeckCard(style);
    dom.prevGhost.innerHTML = renderDeckCard(styleByOffset(-1));
    dom.nextGhost.innerHTML = renderDeckCard(styleByOffset(1));
    dom.deckStage.classList.remove("dragging", "fly-left", "fly-right");
    dom.styleDeck.style.removeProperty("--drag-x");
    dom.styleDeck.style.removeProperty("--drag-rotate");
    dom.categoryChips.innerHTML = categories.map((cat) => {
      const categoryStyles = styles.filter((item) => item.category === cat[0]);
      const preview = categoryStyles.slice(0, 3).map((item) => `<img src="${item.image}" alt="${escapeHtml(item.name[lang])}" loading="lazy">`).join("");
      return `
        <button class="category-card" type="button" data-filter="${cat[0]}">
          <span class="category-copy">
            <strong>${escapeHtml(catName(cat[0]))}</strong>
            <small>${categoryStyles.length} styles</small>
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
      artist: "Style Atlas",
      image: style.image
    };
    addRecent(style.id);
    const gallerySection = `
      <section class="detail-section">
        <h2>${t("exhibitImages")}</h2>
        <div class="gallery-grid" id="galleryGrid">
          <figure class="gallery-item">
            <img src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="lazy" data-action="open-image">
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
          <p>${escapeHtml(style.imagePrompts[lang])}</p>
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
          <img src="${escapeHtml(page.thumbnail.source)}" alt="${escapeHtml(page.title)}" loading="lazy" data-action="open-image">
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
        <img class="thumb" src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="lazy">
        <div>
          <h3>${escapeHtml(style.name[lang])}</h3>
          <p>${escapeHtml(style.summary[lang])}</p>
        </div>
        <button class="card-action ${isSaved(style.id) ? "saved" : ""}" type="button" data-action="save-row" data-id="${style.id}" aria-label="${t("favorite")}">${isSaved(style.id) ? "♥" : "♡"}</button>
      </article>
    `;
  }

  function renderSearch() {
    const lang = store.lang;
    dom.searchLabel.textContent = t("search");
    dom.searchInput.placeholder = lang === "zh" ? "瑞士、Ukiyo-e、海报、复古..." : "Swiss, Ukiyo-e, poster, retro...";
    dom.filterChips.innerHTML = categories.map((cat) => `<button class="chip ${store.filter === cat[0] ? "active" : ""}" type="button" data-filter="${cat[0]}">${escapeHtml(catName(cat[0]))}</button>`).join("");

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
    dom.savedList.innerHTML = savedStyles.length ? savedStyles.map(resultCard).join("") : `<p class="empty">${t("empty")}</p>`;
  }

  function setView(view) {
    if (view === "detail") renderDetail();
    setDrawer(false);
    store.view = view;
    document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === `${view}View`));
    document.querySelectorAll(".nav-btn").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
    dom.backBtn.classList.toggle("hidden", view === "home");
    document.querySelector(".topbar").classList.toggle("has-back", view !== "home");
    if (view === "search") {
      renderSearch();
      setTimeout(() => dom.searchInput.focus(), 80);
    }
    if (view === "saved") renderSaved();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setDrawer(open) {
    if (open) {
      store.drawerScrollY = window.scrollY;
      document.body.style.top = `-${store.drawerScrollY}px`;
    }
    dom.drawer.classList.toggle("open", open);
    dom.drawer.setAttribute("aria-hidden", String(!open));
    dom.drawerBackdrop.hidden = !open;
    document.body.classList.toggle("drawer-open", open);
    if (!open) {
      document.body.style.removeProperty("top");
      window.scrollTo(0, store.drawerScrollY || 0);
    }
  }

  function setActiveByOffset(offset) {
    const index = styles.findIndex((style) => style.id === store.activeId);
    const next = (index + offset + styles.length) % styles.length;
    store.activeId = styles[next].id;
    renderHome();
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
    renderHome();
    if (store.view === "detail") renderDetail();
    if (store.view === "search") renderSearch();
    if (store.view === "saved") renderSaved();
  }

  async function copyText(value) {
    await navigator.clipboard.writeText(value);
    toast(t("copied"));
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

  async function coverCardBlob(style) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1800;
    const ctx = canvas.getContext("2d");
    const image = await loadImage(style.image);
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    const shade = ctx.createLinearGradient(0, 850, 0, 1800);
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
    ctx.fillStyle = "#fff6dc";
    ctx.font = "700 126px Georgia";
    wrap(ctx, style.name.en, 64, 1540, 940, 124);
    ctx.fillStyle = "#f4cf76";
    ctx.font = "800 48px sans-serif";
    wrap(ctx, style.name.zh, 68, 1688, 900, 58);
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
    dom.lightbox.hidden = false;
    dom.lightbox.dataset.src = src;
    document.body.classList.add("drawer-lock");
  }

  function closeImage() {
    dom.lightbox.hidden = true;
    dom.lightboxImage.removeAttribute("src");
    delete dom.lightbox.dataset.src;
    document.body.classList.remove("drawer-lock");
  }

  async function shareImage(src = dom.lightbox.dataset.src) {
    if (!src) return;
    const file = await imageFile(src, "style-atlas-image.png");
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      await navigator.share({ title: activeStyle().name[store.lang], files: [file] });
      return;
    }
    await navigator.clipboard.writeText(src);
    toast(t("shared"));
  }

  function saveImage(src = dom.lightbox.dataset.src) {
    if (!src) return;
    const link = document.createElement("a");
    link.href = src;
    link.download = "style-atlas-image.png";
    link.click();
  }

  async function shareStyle(style = activeStyle()) {
    const url = `${location.origin}${location.pathname}#${style.id}`;
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
      await navigator.clipboard.writeText(`${payload.title}\n${payload.text}\n${payload.url}`);
      toast(t("shared"));
    } catch {
      await navigator.clipboard.writeText(url).catch(() => {});
      toast(t("shared"));
    }
  }

  async function saveShareCard(style = activeStyle()) {
    const blob = await (store.view === "detail" ? detailCardBlob(style) : coverCardBlob(style));
    const link = document.createElement("a");
    link.download = `${style.id}-style-atlas.png`;
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    toast(t("cardSaved"));
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
    ctx.save();
    ctx.globalAlpha = 0.82;
    ctx.fillStyle = "rgba(10, 8, 6, 0.58)";
    roundRect(ctx, width - 352, height - 92, 292, 50, 25);
    ctx.fill();
    ctx.fillStyle = "#fff6dc";
    ctx.font = "700 24px sans-serif";
    ctx.fillText("Style Atlas Free", width - 326, height - 58);
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

    dom.searchOpenBtn.addEventListener("click", () => setView("search"));
    dom.drawerBtn.addEventListener("click", () => setDrawer(true));
    dom.drawerCloseBtn.addEventListener("click", () => setDrawer(false));
    dom.drawerBackdrop.addEventListener("click", () => setDrawer(false));
    dom.backBtn.addEventListener("click", () => setView("home"));
    dom.randomBtn.addEventListener("click", () => {
      store.activeId = styles[Math.floor(Math.random() * styles.length)].id;
      renderHome();
    });
    dom.prevBtn.addEventListener("click", () => setActiveByOffset(-1));
    dom.nextBtn.addEventListener("click", () => setActiveByOffset(1));
    dom.styleDeck.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (action) {
        event.stopPropagation();
        moved = false;
        if (action === "save") return toggleSaved();
        if (action === "share") return shareStyle();
        if (action === "copy-prompt") return copyStyleExpression();
        if (action === "detail") return setView("detail");
      }
      if (moved) {
        moved = false;
        return;
      }
      setView("detail");
    });

    let startX = 0;
    let startY = 0;
    let dragging = false;
    let moved = false;
    let dragFrame = 0;
    let dragX = 0;

    function paintDrag() {
      dragFrame = 0;
      dom.styleDeck.style.setProperty("--drag-x", `${dragX}px`);
      dom.styleDeck.style.setProperty("--drag-rotate", `${dragX / 13}deg`);
    }

    function resetDrag() {
      if (dragFrame) cancelAnimationFrame(dragFrame);
      dragFrame = 0;
      dom.deckStage.classList.remove("dragging");
      dom.styleDeck.style.removeProperty("--drag-x");
      dom.styleDeck.style.removeProperty("--drag-rotate");
    }

    dom.styleDeck.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      dom.styleDeck.setPointerCapture(event.pointerId);
      dom.deckStage.classList.add("dragging");
    });

    dom.styleDeck.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) moved = true;
      dragX = Math.max(-130, Math.min(130, dx));
      if (!dragFrame) dragFrame = requestAnimationFrame(paintDrag);
    });

    dom.styleDeck.addEventListener("pointerup", (event) => {
      if (!dragging) return;
      dragging = false;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      resetDrag();
      if (Math.abs(dx) > 84 && Math.abs(dx) > Math.abs(dy)) {
        dom.deckStage.classList.add(dx < 0 ? "fly-left" : "fly-right");
        setTimeout(() => setActiveByOffset(dx < 0 ? 1 : -1), 210);
        return;
      }
      if (dy < -80 && Math.abs(dy) > Math.abs(dx)) setView("detail");
    });

    dom.styleDeck.addEventListener("pointercancel", () => {
      dragging = false;
      resetDrag();
    });

    document.body.addEventListener("click", (event) => {
      const row = event.target.closest("[data-style]");
      const action = event.target.closest("[data-action]")?.dataset.action;
      const id = event.target.closest("[data-id]")?.dataset.id;
      const filter = event.target.closest("[data-filter]")?.dataset.filter;
      if (action === "save-row" && id) {
        event.stopPropagation();
        return toggleSaved(id);
      }
      if (action === "save") return toggleSaved();
      if (action === "share") return shareStyle();
      if (action === "open-image") {
        const img = event.target.closest("img");
        return openImage(img.currentSrc || img.src, img.alt);
      }
      if (action === "close-lightbox") return closeImage();
      if (action === "share-lightbox") return shareImage();
      if (action === "save-lightbox") return saveImage();
      if (action === "show-plus") return showPlus();
      if (action === "close-plus") return closePlus();
      if (action === "plus-export") return canExportHighRes() ? saveShareCard() : showPlus("highResLocked");
      if (action === "copy-prompt") return copyStyleExpression();
      if (action === "save-card") return saveShareCard();
      if (filter) {
        store.filter = store.filter === filter ? "" : filter;
        store.query = "";
        dom.searchInput.value = "";
        setView("search");
        return;
      }
      if (row) {
        store.activeId = row.dataset.style;
        setView("detail");
      }
    });

    document.querySelectorAll(".nav-btn").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.action === "show-plus") {
          showPlus();
          return;
        }
        setView(button.dataset.view);
        setDrawer(false);
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
      copyText(list || "Style Atlas");
    });
    window.addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (!styles.some((style) => style.id === id)) return;
      store.activeId = id;
      setView("detail");
    });
  }

  function renderAll() {
    dom.langBtn.textContent = store.lang === "zh" ? "EN" : "中文";
    renderHome();
    if (store.view === "detail") renderDetail();
    if (store.view === "search") renderSearch();
    if (store.view === "saved") renderSaved();
    document.querySelectorAll(".nav-btn").forEach((button) => {
      const map = {
        home: store.lang === "zh" ? "今日" : "Today",
        detail: store.lang === "zh" ? "探索" : "Explore",
        search: store.lang === "zh" ? "搜索" : "Search",
        saved: store.lang === "zh" ? "收藏" : "Saved"
      };
      button.textContent = button.dataset.view ? map[button.dataset.view] : t("plus");
    });
    if (!dom.plusModal.hidden) showPlus(store.plusReasonKey || "plusSubtitle");
  }

  store.activeId = location.hash.slice(1) && styles.some((style) => style.id === location.hash.slice(1))
    ? location.hash.slice(1)
    : styles[dailyIndex()].id;
  if (location.hash.slice(1) && styles.some((style) => style.id === location.hash.slice(1))) store.view = "detail";
  document.documentElement.lang = store.lang === "zh" ? "zh-CN" : "en";
  bind();
  renderAll();
  setView(store.view);
})();
