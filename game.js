(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
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

  const categories = [
    ["poster", "经典海报与平面设计风格", "Classic poster and graphic design"],
    ["painting", "经典西方绘画流派", "Classic Western painting"],
    ["master", "经典艺术大师式视觉语言", "Master visual languages"],
    ["modern", "现代艺术与观念风格", "Modern art and concepts"],
    ["asian", "东方与亚洲经典视觉风格", "Eastern and Asian classics"],
    ["folk", "民族、地域与民俗视觉风格", "Regional and folk visuals"],
    ["animation", "动画、漫画与影视视觉风格", "Animation, comics and film"],
    ["illustration", "插画、出版与商业绘本风格", "Illustration and publishing"]
  ];

  const rawStyles = [
    ["swiss-style", "Swiss Style", "瑞士国际主义风格", "poster", "ruishi", "grid clarity typography"],
    ["bauhaus", "Bauhaus", "包豪斯风格", "poster", "baohaosi", "geometry primary functional"],
    ["art-deco", "Art Deco", "装饰艺术风格", "poster", "zhuangshiyishu", "gold luxury geometric"],
    ["art-nouveau", "Art Nouveau", "新艺术风格", "poster", "xinyishu", "floral organic elegant"],
    ["constructivism", "Constructivism", "构成主义风格", "poster", "gouchengzhuyi", "red diagonal propaganda"],
    ["de-stijl", "De Stijl", "风格派", "poster", "fenggepai", "primary grid abstraction"],
    ["futurism", "Futurism", "未来主义风格", "poster", "weilaizhuyi", "speed motion machine"],
    ["minimalism", "Minimalism", "极简主义风格", "poster", "jijian", "reductive whitespace calm"],
    ["brutalism", "Brutalism", "粗野主义平面风格", "poster", "cuyeyizhuyi", "raw bold anti polish"],
    ["memphis", "Memphis", "孟菲斯风格", "poster", "mengfeisi", "playful pattern color"],
    ["editorial-typography", "Editorial Typography", "编辑排版风格", "poster", "bianjipaiban", "magazine hierarchy type"],
    ["new-wave-typography", "New Wave Typography", "新浪潮字体风格", "poster", "xinlangchao", "experimental type movement"],
    ["punk-diy", "Punk DIY", "朋克拼贴风格", "poster", "pengke", "copy machine collage"],
    ["grunge", "Grunge", "垃圾摇滚风格", "poster", "lajiyaogun", "distressed texture raw"],
    ["psychedelic-poster", "Psychedelic Poster", "迷幻海报风格", "poster", "mihuan", "swirl acid color"],
    ["pop-art-poster", "Pop Art Poster", "波普海报风格", "poster", "bopu", "comic bright repetition"],
    ["corporate-modernism", "Corporate Modernism", "企业现代主义", "poster", "qiye", "clean business systems"],
    ["anti-design", "Anti-Design", "反设计风格", "poster", "fansheji", "chaos rejection rule"],
    ["experimental-typography", "Experimental Typography", "实验字体风格", "poster", "shiyan", "letterform distortion"],
    ["kinetic-poster", "Kinetic Poster", "动态感海报风格", "poster", "dongtaigan", "motion rhythm poster"],
    ["renaissance", "Renaissance", "文艺复兴风格", "painting", "wenyifuxing", "humanism perspective classical"],
    ["baroque", "Baroque", "巴洛克风格", "painting", "baluoke", "drama light movement"],
    ["rococo", "Rococo", "洛可可风格", "painting", "luokeke", "pastel ornate playful"],
    ["neoclassicism", "Neoclassicism", "新古典主义", "painting", "xingudian", "order virtue antique"],
    ["romanticism", "Romanticism", "浪漫主义", "painting", "langman", "emotion nature sublime"],
    ["realism", "Realism", "现实主义", "painting", "xianshi", "ordinary life truthful"],
    ["academic-painting", "Academic Painting", "学院派绘画", "painting", "xueyuanpai", "polished anatomy formal"],
    ["pre-raphaelite", "Pre-Raphaelite", "前拉斐尔派", "painting", "qianlafeier", "detail medieval romance"],
    ["impressionism", "Impressionism", "印象派", "painting", "yinxiangpai", "light brush outdoor"],
    ["post-impressionism", "Post-Impressionism", "后印象派", "painting", "houyinxiang", "color structure emotion"],
    ["van-gogh", "Van Gogh", "梵高式笔触", "master", "fangao", "swirl impasto emotion"],
    ["monet", "Monet", "莫奈式光影", "master", "monai", "mist light water"],
    ["renoir", "Renoir", "雷诺阿式温暖人物", "master", "leinuoa", "warm people soft"],
    ["cezanne", "Cezanne", "塞尚式结构", "master", "saishang", "structure planes volume"],
    ["picasso-cubism", "Picasso / Cubism", "毕加索立体主义", "master", "bijiasuo", "facets multiple viewpoints"],
    ["matisse", "Matisse", "马蒂斯式色块", "master", "madisi", "cutout color rhythm"],
    ["dali", "Dali", "达利式超现实", "master", "dali", "dream surreal precision"],
    ["magritte", "Magritte", "马格利特式观念超现实", "master", "magelite", "concept surreal calm"],
    ["edward-hopper", "Edward Hopper", "霍普式孤独光影", "master", "huopu", "quiet city light"],
    ["gustav-klimt", "Gustav Klimt", "克里姆特式金色装饰", "master", "kelimute", "gold ornament portrait"],
    ["kandinsky", "Kandinsky", "康定斯基式抽象", "master", "kangdingsiji", "abstract music color"],
    ["mondrian", "Mondrian", "蒙德里安式几何", "master", "mengdelian", "grid primary balance"],
    ["pollock", "Pollock", "波洛克式滴画", "master", "boluoke", "drip action field"],
    ["rothko", "Rothko", "罗斯科式色域", "master", "luosike", "color field silence"],
    ["basquiat", "Basquiat", "巴斯奎特式涂鸦表现", "master", "basikui", "graffiti crown raw"],
    ["expressionism", "Expressionism", "表现主义", "modern", "biaoxian", "intense distortion emotion"],
    ["german-expressionism", "German Expressionism", "德国表现主义", "modern", "deguo", "sharp shadow anxiety"],
    ["surrealism", "Surrealism", "超现实主义", "modern", "chaoxianshi", "dream impossible symbols"],
    ["symbolism", "Symbolism", "象征主义", "modern", "xiangzheng", "myth mood signs"],
    ["fauvism", "Fauvism", "野兽派", "modern", "yeshou", "wild color flat"],
    ["dada", "Dada", "达达主义", "modern", "dada", "absurd collage anti art"],
    ["abstract-expressionism", "Abstract Expressionism", "抽象表现主义", "modern", "chouxiang", "gesture scale emotion"],
    ["color-field-painting", "Color Field Painting", "色域绘画", "modern", "seyu", "large color atmosphere"],
    ["op-art", "Op Art", "欧普艺术", "modern", "oupu", "optical pattern vibration"],
    ["conceptual-art", "Conceptual Art", "观念艺术", "modern", "guannian", "idea language context"],
    ["chinese-ink-painting", "Chinese Ink Painting", "中国水墨画", "asian", "shuimo", "ink void brush"],
    ["gongbi", "Gongbi", "工笔画", "asian", "gongbi", "fine line mineral color"],
    ["xieyi", "Xieyi", "写意画", "asian", "xieyi", "expressive brush spirit"],
    ["shanshui", "Shanshui", "山水画风格", "asian", "shanshui", "mountain water void"],
    ["dunhuang-mural", "Dunhuang Mural", "敦煌壁画风格", "asian", "dunhuang", "mural mineral celestial"],
    ["ukiyo-e", "Ukiyo-e", "浮世绘风格", "asian", "fushihui", "woodblock wave flat"],
    ["sumi-e", "Sumi-e", "日本墨绘", "asian", "mohui", "ink minimal zen"],
    ["nihonga", "Nihonga", "日本岩彩画", "asian", "yancai", "mineral color quiet"],
    ["yamato-e", "Yamato-e", "大和绘", "asian", "dahehe", "court narrative color"],
    ["korean-minhwa", "Korean Minhwa", "韩国民画", "asian", "minhua", "folk tiger color"],
    ["indian-miniature", "Indian Miniature", "印度细密画", "asian", "ximi", "miniature palace detail"],
    ["persian-miniature", "Persian Miniature", "波斯细密画", "asian", "bosi", "garden manuscript detail"],
    ["islamic-geometric", "Islamic Geometric", "伊斯兰几何纹样", "asian", "yisilanjijihe", "geometry tile sacred"],
    ["tibetan-thangka", "Tibetan Thangka", "唐卡风格", "asian", "tangka", "sacred mandala mineral"],
    ["thai-temple-mural", "Thai Temple Mural", "泰国寺庙壁画风格", "asian", "taiguo", "temple mural gold"],
    ["byzantine-icon", "Byzantine Icon", "拜占庭圣像风格", "folk", "baizhanting", "icon gold sacred"],
    ["mexican-muralism", "Mexican Muralism", "墨西哥壁画风格", "folk", "moxige", "public mural social"],
    ["aboriginal-dot-painting", "Aboriginal Dot Painting", "澳大利亚原住民点画", "folk", "dianhua", "dot earth map"],
    ["african-tribal-pattern", "African Tribal Pattern", "非洲部落图案", "folk", "feizhou", "rhythm mask pattern"],
    ["native-american-art", "Native American Art", "北美原住民艺术", "folk", "beimei", "symbol animal earth"],
    ["russian-lubok", "Russian Lubok", "俄罗斯民间版画", "folk", "eluosi", "folk print bold"],
    ["nordic-folk-art", "Nordic Folk Art", "北欧民俗风格", "folk", "beiou", "floral winter craft"],
    ["celtic-art", "Celtic Art", "凯尔特纹样风格", "folk", "kaierte", "knot manuscript pattern"],
    ["madhubani", "Madhubani", "印度马杜巴尼民间画", "folk", "madubani", "folk line filled"],
    ["chinese-new-year-woodblock", "Chinese New Year Woodblock", "年画风格", "folk", "nianhua", "festive woodblock red"],
    ["healing-animation", "Healing Animation", "治愈手绘动画语汇", "animation", "zhiyu", "pastoral hand drawn warm"],
    ["cinematic-anime", "Cinematic Anime", "电影级日系动画光影", "animation", "dianyingriji", "sky city light"],
    ["classic-disney", "Classic Disney", "经典手绘童话动画", "animation", "tonghua", "musical charm storybook"],
    ["warm-3d-animation", "Warm 3D Animation", "温情三维动画语汇", "animation", "sanwei", "soft material expressive"],
    ["dreamworks-cartoon", "DreamWorks Cartoon", "梦工厂式卡通语汇", "animation", "katong", "bold character comedy"],
    ["anime", "Anime", "日漫风格", "animation", "riman", "clean line expressive"],
    ["manga", "Manga", "漫画黑白风格", "animation", "manhua", "black white screentone"],
    ["shonen", "Shonen", "少年漫画风格", "animation", "shaonian", "action speed power"],
    ["shojo", "Shojo", "少女漫画风格", "animation", "shaonv", "romance sparkle delicate"],
    ["american-comic-book", "American Comic Book", "美式漫画风格", "animation", "meishi", "bold ink halftone"],
    ["ligne-claire", "Ligne Claire", "清线漫画风格", "illustration", "qingxian", "clear line flat"],
    ["graphic-novel", "Graphic Novel", "图像小说风格", "illustration", "tuxiangxiaoshuo", "cinematic panels mature"],
    ["noir-illustration", "Noir Illustration", "黑色电影插画", "illustration", "heise", "shadow mystery contrast"],
    ["childrens-picture-book", "Children's Picture Book", "儿童绘本风格", "illustration", "ertonghuiben", "gentle simple story"],
    ["editorial-illustration", "Editorial Illustration", "编辑插画风格", "illustration", "bianjichahua", "concept article clean"],
    ["fashion-illustration", "Fashion Illustration", "时装插画风格", "illustration", "shizhuang", "gesture fabric elegance"],
    ["botanical-illustration", "Botanical Illustration", "植物科学插画", "illustration", "zhiwu", "precise botanical plate"],
    ["scientific-illustration", "Scientific Illustration", "科学插画风格", "illustration", "kexue", "diagram accuracy detail"],
    ["isometric-illustration", "Isometric Illustration", "等距插画风格", "illustration", "dengju", "isometric system object"],
    ["flat-illustration", "Flat Illustration", "扁平插画风格", "illustration", "bianping", "flat shapes friendly"]
  ];

  const categoryCopy = {
    poster: {
      zh: "用版式、字体、网格和图形秩序建立强识别度，适合海报、品牌发布和展会物料。",
      en: "Uses layout, type, grids and graphic order to create strong recognition for posters, launches and event graphics.",
      featuresZh: ["强版式", "字体主导", "图形秩序", "高对比", "海报感"],
      featuresEn: ["Strong layout", "Type-led", "Graphic order", "High contrast", "Poster-ready"],
      usesZh: ["海报", "品牌", "展会", "信息图", "社媒"],
      usesEn: ["Posters", "Branding", "Events", "Infographics", "Social"]
    },
    painting: {
      zh: "来自西方艺术史的经典绘画语言，适合建立画面氛围、光影叙事和艺术质感。",
      en: "A classic Western art-history language for atmosphere, light, narrative and painterly texture.",
      featuresZh: ["绘画质感", "历史语境", "光影叙事", "人物/场景", "艺术感"],
      featuresEn: ["Painterly texture", "Historical context", "Light narrative", "Figures/scenes", "Artful mood"],
      usesZh: ["插画", "封面", "品牌大片", "展览", "AI 生图"],
      usesEn: ["Illustration", "Covers", "Campaigns", "Exhibitions", "AI images"]
    },
    master: {
      zh: "从已故艺术大师的视觉语言中提炼可学习元素，重点看笔触、结构、色彩和情绪。",
      en: "Extracts learnable visual traits from historical masters: brushwork, structure, color and emotion.",
      featuresZh: ["强个人语言", "可记忆笔触", "色彩性格", "情绪浓度", "艺术史锚点"],
      featuresEn: ["Distinct voice", "Memorable mark", "Color character", "Emotional density", "Art-history anchor"],
      usesZh: ["艺术海报", "书封", "概念图", "文创", "AI 灵感"],
      usesEn: ["Art posters", "Book covers", "Concept art", "Cultural products", "AI inspiration"]
    },
    modern: {
      zh: "现代艺术把规则拆开重组，适合表达情绪、观念、实验和非传统视觉。",
      en: "Modern art breaks and recombines rules, useful for emotion, concepts, experiments and unconventional visuals.",
      featuresZh: ["观念优先", "形式实验", "强情绪", "反常规", "符号化"],
      featuresEn: ["Idea-first", "Formal experiment", "Strong emotion", "Rule-breaking", "Symbolic"],
      usesZh: ["展览", "艺术活动", "唱片", "实验海报", "影像视觉"],
      usesEn: ["Exhibitions", "Art events", "Albums", "Experimental posters", "Motion visuals"]
    },
    asian: {
      zh: "东方与亚洲经典视觉传统，强调留白、线条、材质、装饰与地域文化记忆。",
      en: "Eastern and Asian visual traditions built on void, line, material, ornament and regional memory.",
      featuresZh: ["地域文化", "线条节奏", "留白", "传统材质", "装饰纹样"],
      featuresEn: ["Regional culture", "Line rhythm", "Void space", "Traditional material", "Ornament"],
      usesZh: ["东方品牌", "茶酒包装", "文旅", "国风海报", "AI 生图"],
      usesEn: ["Asian brands", "Packaging", "Travel", "Culture posters", "AI images"]
    },
    folk: {
      zh: "民族与民俗视觉通常更直接、更符号化，适合做文化主题、节庆和地域识别。",
      en: "Folk visuals are direct and symbolic, good for cultural themes, festivals and regional identity.",
      featuresZh: ["民俗符号", "手工感", "重复纹样", "节庆色彩", "地域识别"],
      featuresEn: ["Folk symbols", "Handmade feel", "Repeat patterns", "Festival color", "Regional identity"],
      usesZh: ["节日海报", "文旅", "包装", "IP 周边", "公共艺术"],
      usesEn: ["Festival posters", "Tourism", "Packaging", "Merch", "Public art"]
    },
    animation: {
      zh: "以更通用的动画视觉语汇描述氛围，适合角色、短视频封面、故事场景和情绪表达。",
      en: "Uses generalized animation vocabularies for characters, covers, story scenes and emotional tone.",
      featuresZh: ["角色感", "电影光影", "故事场景", "表情丰富", "易传播"],
      featuresEn: ["Character feel", "Cinematic light", "Story scenes", "Expressive", "Shareable"],
      usesZh: ["短视频", "角色设定", "封面", "故事板", "社媒"],
      usesEn: ["Short video", "Characters", "Covers", "Storyboards", "Social"]
    },
    illustration: {
      zh: "面向出版、商业和说明的插画语言，清晰、可控，适合把信息变成好看的画面。",
      en: "Illustration languages for publishing and commercial communication: clear, controlled and useful.",
      featuresZh: ["信息清晰", "商业友好", "图文结合", "可扩展", "亲和"],
      featuresEn: ["Clear information", "Commercial-friendly", "Image plus text", "Scalable", "Approachable"],
      usesZh: ["文章配图", "绘本", "包装", "产品说明", "品牌插画"],
      usesEn: ["Editorial art", "Picture books", "Packaging", "Explainers", "Brand illustration"]
    }
  };

  const palettes = [
    "radial-gradient(circle at 50% 15%, #f7d574 0 9%, transparent 10%), linear-gradient(135deg, #111, #34230b 48%, #d0a23b 49%, #1b1510)",
    "linear-gradient(135deg, #f2ead4 0 24%, #d33728 25% 42%, #111 43% 72%, #e1b53d 73%)",
    "radial-gradient(circle at 50% 50%, #f4d67f 0 18%, #1a1208 19% 31%, #dfb044 32% 35%, #0c0b0a 36%)",
    "linear-gradient(120deg, #123b55, #e8d2a3 34%, #9e2f24 35% 52%, #0e2230 53%)",
    "repeating-linear-gradient(45deg, #101010 0 18px, #dfb44f 18px 20px, #7c1f1f 20px 34px)"
  ];

  const styles = rawStyles.map((item, index) => {
    const [id, en, zh, category, pinyin, keywords] = item;
    const copy = categoryCopy[category];
    const tagsZh = copy.featuresZh.slice(0, 3);
    const tagsEn = copy.featuresEn.slice(0, 3);
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
        zh: `${zh}来自${catName(category, "zh")}的脉络。它不是一个单独的滤镜，而是一整套关于色彩、构图、材质和观看方式的习惯。理解它时，先看它解决了什么问题：如何让画面在第一眼被认出，又能承载特定时代、地域或创作者的审美。`,
        en: `${en} comes from the ${catName(category, "en").toLowerCase()} tradition. It is not a single filter, but a system of color, composition, material and ways of seeing. Learn it by asking what visual problem it solves and why the image becomes recognizable at first glance.`
      },
      why: {
        zh: `这种风格之所以成立，是因为它持续强化${tagsZh.join("、")}，把复杂信息压缩成容易记住的视觉信号。创作时不要只套表面元素，要先确定画面的主情绪、主体关系和节奏，再选择颜色、线条和构图。`,
        en: `This style works because it repeatedly reinforces ${tagsEn.join(", ").toLowerCase()}, turning complex information into memorable visual signals. Do not copy surface details only; define mood, subject hierarchy and rhythm first, then choose color, line and composition.`
      },
      lookFor: {
        zh: [`第一眼先看${tagsZh[0]}`, `再看${tagsZh[1]}如何组织画面`, `最后看${tagsZh[2]}是否稳定地重复出现`],
        en: [`First notice ${tagsEn[0].toLowerCase()}`, `Then see how ${tagsEn[1].toLowerCase()} organizes the image`, `Finally check whether ${tagsEn[2].toLowerCase()} repeats consistently`]
      },
      references: {
        zh: [`${zh}风格封面案例`, `${zh}海报应用案例`, `${zh}AI 生图复刻练习`],
        en: [`${en} cover case`, `${en} poster application`, `${en} AI style-replication exercise`]
      },
      visualFeatures: { zh: copy.featuresZh, en: copy.featuresEn },
      useCases: { zh: copy.usesZh, en: copy.usesEn },
      tags: { zh: tagsZh.concat(["高级", "灵感"]), en: tagsEn.concat(["Premium", "Inspiration"]) },
      imagePrompts: {
        zh: `以复刻${zh}视觉语言为目标，提取${copy.featuresZh.join("、")}，控制色彩、构图、线条和材质，让画面像该风格的原创应用案例，高清，完整构图，不复制具体原作`,
        en: `Replicate the visual language of ${en}: extract ${copy.featuresEn.join(", ").toLowerCase()}, control color, composition, line and material, create an original applied case in this style, high resolution, complete composition, not a copy of a specific artwork`
      },
      negativePrompt: {
        zh: "避免盗用原作、低清晰度文字、杂乱构图、廉价滤镜、直接复制当代工作室完整风格",
        en: "Avoid copied artwork, low-quality text, cluttered composition, cheap filters, directly copying a contemporary studio style"
      },
      relatedStyles: related(index),
      art: palettes[index % palettes.length],
      image: `assets/styles/${id}.png`,
      keywords
    };
  });

  Object.assign(styles.find((style) => style.id === "matisse"), {
    summary: {
      zh: "马蒂斯式色块强调明亮、扁平、自由的颜色关系，用剪纸般的形状和流动线条，把画面变成有节奏的色彩乐章。",
      en: "Matisse-like color blocks use bright flat color, cut-paper shapes and flowing lines to turn the image into a rhythmic color composition."
    },
    memoryAnchor: {
      zh: "像把花园、舞蹈和阳光剪成彩纸，再贴成一幅会呼吸的画。",
      en: "Like cutting gardens, dance and sunlight into colored paper, then arranging them into a breathing image."
    },
    history: {
      zh: "亨利·马蒂斯（Henri Matisse，1869–1954）是法国现代艺术的重要人物，也是野兽派的核心代表。他长期探索颜色和线条的关系：颜色不只是给物体上色，而是可以直接表达情绪、空间和节奏。晚年因身体受限，他把涂有水粉的彩纸剪成植物、人物和抽象形状，再由助手协助固定和组合，发展出著名的 cut-outs 剪纸作品。马蒂斯式色块因此不是“简单儿童画”，而是把绘画、装饰、空间和身体动作压缩成最直接的颜色结构。",
      en: "Henri Matisse (1869-1954) was a major French modern artist and a central figure of Fauvism. He treated color not as decoration on objects, but as a direct tool for emotion, space and rhythm. In his late years, limited physically, he cut shapes from gouache-painted paper and arranged them with studio assistance, developing his celebrated cut-outs. The Matisse-like color block language is therefore not childish simplicity, but a concentrated structure of painting, decoration, space and bodily movement."
    },
    why: {
      zh: "他喜欢这样画，是因为明亮色块能绕开传统明暗塑形，直接把观看者带进一种轻快、装饰性、充满生命感的空间。剪纸让他像“用剪刀画画”：先用颜色决定情绪，再用轮廓决定节奏，最后用色块之间的距离决定画面的呼吸。",
      en: "He worked this way because bright color blocks could bypass traditional light-and-shadow modeling and create a lively decorative space immediately. Cut paper let him 'draw with scissors': color sets the mood, contour sets rhythm, and the spacing between blocks gives the image its breathing room."
    },
    lookFor: {
      zh: ["高饱和纯色大色块", "剪纸感边缘和植物/舞蹈般曲线", "少阴影、少透视，靠色彩关系建立空间", "画面像装饰、壁画或拼贴，而不是写实场景"],
      en: ["Large areas of saturated flat color", "Cut-paper edges and plant-like or dance-like curves", "Little shadow or perspective; space is built through color relationships", "The image feels like decoration, mural or collage rather than realism"]
    },
    references: {
      zh: ["《The Snail》（1953）：用彩纸方块组成近乎抽象的蜗牛旋涡", "《Memory of Oceania》（1953）：把海洋记忆变成漂浮的色块和符号", "《Large Decoration with Masks》（1953）：壁画尺度的剪纸装饰案例", "《The Swimming Pool》（1952）：房间尺度的蓝白剪纸环境"],
      en: ["The Snail (1953): colored paper blocks forming an almost abstract spiral", "Memory of Oceania (1953): ocean memory translated into floating color signs", "Large Decoration with Masks (1953): a mural-scale cut-out decoration", "The Swimming Pool (1952): a room-scale blue-and-white cut-out environment"]
    },
    imagePrompts: {
      zh: "以复刻马蒂斯晚期剪纸与色块视觉语言为目标，明亮高饱和色块，扁平构图，剪纸边缘，植物叶片、舞蹈曲线、阳光感，大面积留白与装饰性节奏，少阴影少写实透视，原创海报/封面案例，不复制马蒂斯具体作品",
      en: "Replicate the visual language of late Matisse cut-outs and color blocks: bright saturated flat color, cut-paper edges, botanical leaf shapes, dance-like curves, sunny decorative rhythm, generous negative space, minimal shadow and realism, original poster or cover case, not a copy of a specific Matisse artwork"
    },
    negativePrompt: {
      zh: "避免照片写实、厚重油画肌理、复杂透视、灰暗脏色、直接复制《The Snail》或其他具体作品构图",
      en: "Avoid photorealism, heavy oil-paint texture, complex perspective, muddy colors, directly copying The Snail or any specific composition"
    }
  });

  const text = {
    zh: {
      today: "今日风格",
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
      copyPrompt: "复制提示词",
      features: "视觉特征",
      history: "历史来源",
      why: "为什么这样画",
      lookFor: "一眼识别",
      references: "作品与案例",
      memory: "记住它",
      useCases: "适用场景",
      prompt: "AI 提示词",
      examples: "公开案例",
      source: "查看来源",
      similar: "相似风格",
      empty: "没找到这个风格。试试：海报、油画、东方、漫画、科技、复古。",
      copied: "已复制",
      savedToast: "已收藏",
      removedToast: "已取消收藏",
      shared: "链接已复制",
      cardSaved: "分享卡片已下载"
    },
    en: {
      today: "Today's Pick",
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
      copyPrompt: "Copy prompt",
      features: "Visual features",
      history: "History",
      why: "Why It Looks This Way",
      lookFor: "How To Recognize It",
      references: "Works And Cases",
      memory: "Remember it",
      useCases: "Use cases",
      prompt: "AI prompt",
      examples: "Public example",
      source: "View source",
      similar: "Similar styles",
      empty: "No style found. Try poster, painting, Eastern, comic, tech or retro.",
      copied: "Copied",
      savedToast: "Saved",
      removedToast: "Removed",
      shared: "Link copied",
      cardSaved: "Share card downloaded"
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
    deckStage: $("deckStage"),
    prevGhost: $("prevGhost"),
    nextGhost: $("nextGhost"),
    todayLabel: $("todayLabel"),
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
    toast: $("toast")
  };

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
    const example = window.STYLE_EXAMPLES?.[style.id];
    addRecent(style.id);
    dom.detailContent.innerHTML = `
      <div class="detail-hero style-card">${renderCard(style, true)}</div>
      <section class="detail-section">
        <h2>${t("memory")}</h2>
        <p>${escapeHtml(style.memoryAnchor[lang])}</p>
      </section>
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
      ${example ? `
        <section class="detail-section">
          <h2>${t("examples")}</h2>
          <figure class="example-card">
            <img src="${escapeHtml(example.image)}" alt="${escapeHtml(example.title)}" loading="lazy">
            <figcaption>
              <strong>${escapeHtml(example.title)}</strong>
              <span>${escapeHtml(example.artist)}</span>
              <a href="${escapeHtml(example.source)}" target="_blank" rel="noreferrer">${t("source")}</a>
            </figcaption>
          </figure>
        </section>
      ` : ""}
      <section class="detail-section">
        <h2>${t("prompt")}</h2>
        <div class="prompt-box">${escapeHtml(style.imagePrompts[lang])}<br><br>${escapeHtml(style.negativePrompt[lang])}</div>
        <div class="prompt-actions">
          <button class="copy-btn" type="button" data-action="copy-prompt">${t("copyPrompt")}</button>
          <button class="copy-btn" type="button" data-action="save-card">${t("saveCard")}</button>
        </div>
      </section>
      <section class="detail-section">
        <h2>${t("similar")}</h2>
        <div class="result-list">${style.relatedStyles.map((id) => resultCard(styles.find((item) => item.id === id))).join("")}</div>
      </section>
    `;
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
        catName(style.category, "en")
      ].join(" ").toLowerCase();
      return (!store.filter || style.category === store.filter) && (!query || haystack.includes(query));
    });

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

  async function shareStyle(style = activeStyle()) {
    const url = `${location.origin}${location.pathname}#${style.id}`;
    const payload = { title: style.name[store.lang], text: style.summary[store.lang], url };
    try {
      if (navigator.share) {
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

  function saveShareCard(style = activeStyle()) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#090806";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3e7c9";
    roundRect(ctx, 80, 110, 920, 1540, 40);
    ctx.fill();
    ctx.fillStyle = "#14100a";
    ctx.font = "700 96px Georgia";
    wrap(ctx, style.name.en, 130, 270, 820, 105);
    ctx.fillStyle = "#6a5122";
    ctx.font = "700 46px sans-serif";
    ctx.fillText(style.name.zh, 130, 450);
    const gradient = ctx.createLinearGradient(130, 540, 950, 1180);
    gradient.addColorStop(0, "#0d0b08");
    gradient.addColorStop(0.45, "#d8a93f");
    gradient.addColorStop(1, "#2b1d0c");
    ctx.fillStyle = gradient;
    roundRect(ctx, 130, 540, 820, 620, 28);
    ctx.fill();
    ctx.fillStyle = "#fff0c4";
    ctx.font = "700 72px Georgia";
    ctx.textAlign = "center";
    wrap(ctx, style.name.en, 540, 840, 680, 80, true);
    ctx.textAlign = "left";
    ctx.fillStyle = "#21190e";
    ctx.font = "40px sans-serif";
    wrap(ctx, style.summary[store.lang], 130, 1260, 820, 56);
    ctx.fillStyle = "#d8a93f";
    ctx.font = "700 34px sans-serif";
    ctx.fillText("Style Atlas | 风格图鉴", 130, 1540);
    const link = document.createElement("a");
    link.download = `${style.id}-style-atlas.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
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
      if (action === "copy-prompt") {
        const style = activeStyle();
        return copyText(`${style.imagePrompts[store.lang]}\n\n${style.negativePrompt[store.lang]}`);
      }
      if (action === "save-card") return saveShareCard();
      if (filter) {
        store.filter = store.filter === filter ? "" : filter;
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
    dom.langBtn.textContent = store.lang === "zh" ? "EN / 中" : "EN / 中";
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
      button.textContent = map[button.dataset.view];
    });
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
