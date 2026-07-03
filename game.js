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

  const categoryAliases = {
    poster: ["高级海报", "科技品牌", "网格排版", "发布会", "品牌视觉", "premium poster", "tech brand", "grid layout", "brand launch"],
    painting: ["油画", "艺术感", "古典", "光影", "画布质感", "oil painting", "classical", "painterly", "dramatic light"],
    master: ["大师", "艺术家", "强风格", "名画感", "artist style", "master style", "iconic art"],
    modern: ["实验", "观念", "抽象", "情绪", "展览", "experimental", "conceptual", "abstract", "emotional"],
    asian: ["东方", "国风", "水墨", "日式", "传统", "Eastern", "Asian", "ink", "traditional"],
    folk: ["民俗", "节庆", "地域", "手工", "文旅", "folk", "festival", "regional", "handmade"],
    animation: ["动画", "漫画", "角色", "短视频封面", "anime", "animation", "comic", "character"],
    illustration: ["插画", "绘本", "商业插画", "儿童", "说明图", "illustration", "picture book", "editorial", "explainer"]
  };

  const styleAliases = {
    "swiss-style": ["高级海报", "科技感", "理性设计", "网格排版", "premium poster", "tech brand", "rational design"],
    "art-deco": ["复古奢华", "黄金时代", "高级酒店", "电影海报", "luxury retro", "golden age"],
    "ukiyo-e": ["浮世绘", "海浪", "东方版画", "日式复古", "Japanese woodblock", "wave"],
    "cinematic-anime": ["日式动画天空", "城市黄昏", "青春电影", "anime sky", "cinematic anime light"],
    cyberpunk: ["赛博朋克", "霓虹", "未来城市", "科技感", "neon city", "future tech"]
  };

  const rawStyles = [
    ["swiss-style", "Swiss Style", "瑞士国际主义风格", "poster", "ruishi", "grid clarity typography"],
    ["bauhaus", "Bauhaus", "包豪斯风格", "poster", "baohaosi", "geometry primary functional"],
    ["art-deco", "Art Deco", "装饰艺术风格", "poster", "zhuangshiyishu", "gold luxury geometric"],
    ["art-nouveau", "Art Nouveau", "新艺术风格", "poster", "xinyishu", "floral organic elegant"],
    ["constructivism", "Constructivism", "构成主义风格", "poster", "gouchengzhuyi", "red diagonal propaganda"],
    ["de-stijl", "De Stijl", "风格派", "poster", "fenggepai", "primary grid abstraction"],
    ["futurism", "Futurism", "未来主义风格", "poster", "weilaizhuyi", "speed motion machine"],
    ["minimalism", "Minimalism", "极简主义风格", "poster", "jijian", "reductive whitespace calm"],
    ["brutalism", "Graphic Brutalism", "粗野主义视觉语汇", "poster", "cuyeyizhuyi", "raw bold anti polish"],
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
    ["african-tribal-pattern", "West African Textile Pattern", "西非织物纹样", "folk", "feizhou", "rhythm mask pattern"],
    ["native-american-art", "North American Indigenous Art", "北美原住民艺术", "folk", "beimei", "symbol animal earth"],
    ["russian-lubok", "Russian Lubok", "俄罗斯民间版画", "folk", "eluosi", "folk print bold"],
    ["nordic-folk-art", "Nordic Folk Art", "北欧民俗风格", "folk", "beiou", "floral winter craft"],
    ["celtic-art", "Celtic Art", "凯尔特纹样风格", "folk", "kaierte", "knot manuscript pattern"],
    ["madhubani", "Madhubani", "印度马杜巴尼民间画", "folk", "madubani", "folk line filled"],
    ["chinese-new-year-woodblock", "Chinese New Year Woodblock", "年画风格", "folk", "nianhua", "festive woodblock red"],
    ["healing-animation", "Pastoral Hand-drawn Animation", "田园手绘动画语汇", "animation", "zhiyu", "pastoral hand drawn warm"],
    ["cinematic-anime", "Japanese Animated Film Lighting", "日系动画电影光影", "animation", "dianyingriji", "sky city light"],
    ["classic-disney", "Golden Age Hand-drawn Animation", "黄金时代手绘动画", "animation", "tonghua", "musical charm storybook"],
    ["warm-3d-animation", "Warm 3D Animation", "温情三维动画语汇", "animation", "sanwei", "soft material expressive"],
    ["dreamworks-cartoon", "Exaggerated 3D Cartoon Comedy", "夸张三维卡通喜剧语汇", "animation", "katong", "bold character comedy"],
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
    ["flat-illustration", "Flat Vector Illustration", "扁平矢量插画", "illustration", "bianping", "flat shapes friendly"]
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

  const peopleByStyle = {
    "swiss-style": [["约瑟夫·穆勒-布罗克曼", "Josef Muller-Brockmann"], ["阿明·霍夫曼", "Armin Hofmann"], ["马克斯·比尔", "Max Bill"]],
    bauhaus: [["沃尔特·格罗皮乌斯", "Walter Gropius"], ["保罗·克利", "Paul Klee"], ["瓦西里·康定斯基", "Wassily Kandinsky"]],
    "art-deco": [["阿道夫·穆龙·卡桑德尔", "A. M. Cassandre"], ["埃尔特", "Erte"], ["塔玛拉·德·蓝碧嘉", "Tamara de Lempicka"]],
    "art-nouveau": [["阿尔丰斯·穆夏", "Alphonse Mucha"], ["维克多·奥塔", "Victor Horta"], ["赫克托·吉马尔", "Hector Guimard"]],
    constructivism: [["亚历山大·罗德琴科", "Alexander Rodchenko"], ["埃尔·利西茨基", "El Lissitzky"], ["瓦尔瓦拉·斯捷潘诺娃", "Varvara Stepanova"]],
    "de-stijl": [["皮特·蒙德里安", "Piet Mondrian"], ["特奥·范·杜斯堡", "Theo van Doesburg"], ["赫里特·里特费尔德", "Gerrit Rietveld"]],
    futurism: [["菲利波·托马索·马里内蒂", "F. T. Marinetti"], ["翁贝托·博乔尼", "Umberto Boccioni"], ["贾科莫·巴拉", "Giacomo Balla"]],
    minimalism: [["唐纳德·贾德", "Donald Judd"], ["阿格尼丝·马丁", "Agnes Martin"], ["索尔·勒维特", "Sol LeWitt"]],
    brutalism: [["勒·柯布西耶", "Le Corbusier"], ["艾莉森与彼得·史密森", "Alison and Peter Smithson"], ["雷纳·班纳姆", "Reyner Banham"]],
    memphis: [["埃托雷·索特萨斯", "Ettore Sottsass"], ["娜塔莉·杜·帕斯奎尔", "Nathalie Du Pasquier"], ["米歇尔·德·卢基", "Michele De Lucchi"]],
    "editorial-typography": [["扬·奇肖尔德", "Jan Tschichold"], ["阿列克谢·布罗多维奇", "Alexey Brodovitch"], ["赫布·卢巴林", "Herb Lubalin"]],
    "new-wave-typography": [["沃尔夫冈·魏因加特", "Wolfgang Weingart"], ["阿普丽尔·格雷曼", "April Greiman"], ["丹·弗里德曼", "Dan Friedman"]],
    "punk-diy": [["杰米·里德", "Jamie Reid"], ["吉·沃彻", "Gee Vaucher"], ["温斯顿·史密斯", "Winston Smith"]],
    grunge: [["大卫·卡森", "David Carson"], ["阿特·钱特里", "Art Chantry"], ["克里斯·阿什沃思", "Chris Ashworth"]],
    "psychedelic-poster": [["维克托·莫斯科索", "Victor Moscoso"], ["韦斯·威尔逊", "Wes Wilson"], ["斯坦利·米勒", "Stanley Mouse"]],
    "pop-art-poster": [["安迪·沃霍尔", "Andy Warhol"], ["罗伊·利希滕斯坦", "Roy Lichtenstein"], ["彼得·布莱克", "Peter Blake"]],
    "corporate-modernism": [["保罗·兰德", "Paul Rand"], ["马西莫·维涅利", "Massimo Vignelli"], ["索尔·巴斯", "Saul Bass"]],
    "anti-design": [["Archizoom", "Archizoom"], ["Superstudio", "Superstudio"], ["埃托雷·索特萨斯", "Ettore Sottsass"]],
    "experimental-typography": [["内维尔·布罗迪", "Neville Brody"], ["大卫·卡森", "David Carson"], ["凯瑟琳·麦考伊", "Katherine McCoy"]],
    "kinetic-poster": [["拉斯洛·莫霍利-纳吉", "Laszlo Moholy-Nagy"], ["约瑟夫·穆勒-布罗克曼", "Josef Muller-Brockmann"], ["索尔·巴斯", "Saul Bass"]],
    renaissance: [["列奥纳多·达·芬奇", "Leonardo da Vinci"], ["米开朗基罗", "Michelangelo"], ["拉斐尔", "Raphael"]],
    baroque: [["卡拉瓦乔", "Caravaggio"], ["彼得·保罗·鲁本斯", "Peter Paul Rubens"], ["贝尔尼尼", "Gian Lorenzo Bernini"]],
    rococo: [["让-奥诺雷·弗拉戈纳尔", "Jean-Honore Fragonard"], ["安托万·华托", "Antoine Watteau"], ["弗朗索瓦·布歇", "Francois Boucher"]],
    neoclassicism: [["雅克-路易·大卫", "Jacques-Louis David"], ["安格尔", "Jean-Auguste-Dominique Ingres"], ["安东尼奥·卡诺瓦", "Antonio Canova"]],
    romanticism: [["欧仁·德拉克罗瓦", "Eugene Delacroix"], ["威廉·特纳", "J. M. W. Turner"], ["卡斯帕·大卫·弗里德里希", "Caspar David Friedrich"]],
    realism: [["古斯塔夫·库尔贝", "Gustave Courbet"], ["让-弗朗索瓦·米勒", "Jean-Francois Millet"], ["奥诺雷·杜米埃", "Honore Daumier"]],
    "academic-painting": [["威廉-阿道夫·布格罗", "William-Adolphe Bouguereau"], ["让-莱昂·热罗姆", "Jean-Leon Gerome"], ["亚历山大·卡巴内尔", "Alexandre Cabanel"]],
    "pre-raphaelite": [["但丁·加百列·罗塞蒂", "Dante Gabriel Rossetti"], ["约翰·埃弗里特·米莱", "John Everett Millais"], ["威廉·霍尔曼·亨特", "William Holman Hunt"]],
    impressionism: [["克洛德·莫奈", "Claude Monet"], ["皮埃尔-奥古斯特·雷诺阿", "Pierre-Auguste Renoir"], ["埃德加·德加", "Edgar Degas"]],
    "post-impressionism": [["文森特·梵高", "Vincent van Gogh"], ["保罗·塞尚", "Paul Cezanne"], ["保罗·高更", "Paul Gauguin"]],
    "van-gogh": [["文森特·梵高", "Vincent van Gogh"], ["让-弗朗索瓦·米勒", "Jean-Francois Millet"], ["歌川广重", "Utagawa Hiroshige"]],
    monet: [["克洛德·莫奈", "Claude Monet"], ["卡米耶·毕沙罗", "Camille Pissarro"], ["贝尔特·莫里索", "Berthe Morisot"]],
    renoir: [["皮埃尔-奥古斯特·雷诺阿", "Pierre-Auguste Renoir"], ["克洛德·莫奈", "Claude Monet"], ["埃德加·德加", "Edgar Degas"]],
    cezanne: [["保罗·塞尚", "Paul Cezanne"], ["埃米尔·贝尔纳", "Emile Bernard"], ["巴勃罗·毕加索", "Pablo Picasso"]],
    "picasso-cubism": [["巴勃罗·毕加索", "Pablo Picasso"], ["乔治·布拉克", "Georges Braque"], ["胡安·格里斯", "Juan Gris"]],
    matisse: [["亨利·马蒂斯", "Henri Matisse"], ["安德烈·德兰", "Andre Derain"], ["拉乌尔·杜菲", "Raoul Dufy"]],
    dali: [["萨尔瓦多·达利", "Salvador Dali"], ["马克斯·恩斯特", "Max Ernst"], ["伊夫·唐吉", "Yves Tanguy"]],
    magritte: [["勒内·马格利特", "Rene Magritte"], ["乔治·德·基里科", "Giorgio de Chirico"], ["马克斯·恩斯特", "Max Ernst"]],
    "edward-hopper": [["爱德华·霍普", "Edward Hopper"], ["约瑟芬·霍普", "Josephine Hopper"], ["罗伯特·亨利", "Robert Henri"]],
    "gustav-klimt": [["古斯塔夫·克里姆特", "Gustav Klimt"], ["埃贡·席勒", "Egon Schiele"], ["约瑟夫·霍夫曼", "Josef Hoffmann"]],
    kandinsky: [["瓦西里·康定斯基", "Wassily Kandinsky"], ["弗朗茨·马克", "Franz Marc"], ["加布里埃尔·明特", "Gabriele Munter"]],
    mondrian: [["皮特·蒙德里安", "Piet Mondrian"], ["特奥·范·杜斯堡", "Theo van Doesburg"], ["巴特·范德莱克", "Bart van der Leck"]],
    pollock: [["杰克逊·波洛克", "Jackson Pollock"], ["李·克拉斯纳", "Lee Krasner"], ["珍妮特·索贝尔", "Janet Sobel"]],
    rothko: [["马克·罗斯科", "Mark Rothko"], ["巴尼特·纽曼", "Barnett Newman"], ["克莱福德·斯蒂尔", "Clyfford Still"]],
    basquiat: [["让-米歇尔·巴斯奎特", "Jean-Michel Basquiat"], ["凯斯·哈林", "Keith Haring"], ["A. R. 彭克", "A. R. Penck"]],
    expressionism: [["爱德华·蒙克", "Edvard Munch"], ["埃贡·席勒", "Egon Schiele"], ["奥斯卡·柯柯施卡", "Oskar Kokoschka"]],
    "german-expressionism": [["恩斯特·路德维希·基希纳", "Ernst Ludwig Kirchner"], ["埃米尔·诺尔德", "Emil Nolde"], ["弗朗茨·马克", "Franz Marc"]],
    surrealism: [["安德烈·布勒东", "Andre Breton"], ["萨尔瓦多·达利", "Salvador Dali"], ["马克斯·恩斯特", "Max Ernst"]],
    symbolism: [["古斯塔夫·莫罗", "Gustave Moreau"], ["奥迪隆·雷东", "Odilon Redon"], ["费尔南·克诺普夫", "Fernand Khnopff"]],
    fauvism: [["亨利·马蒂斯", "Henri Matisse"], ["安德烈·德兰", "Andre Derain"], ["莫里斯·德·弗拉芒克", "Maurice de Vlaminck"]],
    dada: [["马塞尔·杜尚", "Marcel Duchamp"], ["汉娜·霍赫", "Hannah Hoch"], ["特里斯坦·查拉", "Tristan Tzara"]],
    "abstract-expressionism": [["杰克逊·波洛克", "Jackson Pollock"], ["威廉·德·库宁", "Willem de Kooning"], ["李·克拉斯纳", "Lee Krasner"]],
    "color-field-painting": [["马克·罗斯科", "Mark Rothko"], ["海伦·弗兰肯塔勒", "Helen Frankenthaler"], ["莫里斯·路易斯", "Morris Louis"]],
    "op-art": [["维克托·瓦萨雷里", "Victor Vasarely"], ["布里奇特·赖利", "Bridget Riley"], ["赫苏斯·拉斐尔·索托", "Jesus Rafael Soto"]],
    "conceptual-art": [["约瑟夫·科苏斯", "Joseph Kosuth"], ["索尔·勒维特", "Sol LeWitt"], ["劳伦斯·韦纳", "Lawrence Weiner"]],
    "chinese-ink-painting": [["王维", "Wang Wei"], ["董其昌", "Dong Qichang"], ["齐白石", "Qi Baishi"]],
    gongbi: [["顾恺之", "Gu Kaizhi"], ["宋徽宗", "Emperor Huizong of Song"], ["仇英", "Qiu Ying"]],
    xieyi: [["徐渭", "Xu Wei"], ["八大山人", "Bada Shanren"], ["齐白石", "Qi Baishi"]],
    shanshui: [["范宽", "Fan Kuan"], ["郭熙", "Guo Xi"], ["黄公望", "Huang Gongwang"]],
    "dunhuang-mural": [["敦煌无名壁画师", "Anonymous Dunhuang mural painters"], ["北魏工匠", "Northern Wei artisans"], ["唐代佛教画师", "Tang dynasty Buddhist painters"]],
    "ukiyo-e": [["葛饰北斋", "Katsushika Hokusai"], ["歌川广重", "Utagawa Hiroshige"], ["喜多川歌麿", "Kitagawa Utamaro"]],
    "sumi-e": [["雪舟等杨", "Sesshu Toyo"], ["狩野元信", "Kano Motonobu"], ["白隐慧鹤", "Hakuin Ekaku"]],
    nihonga: [["横山大观", "Yokoyama Taikan"], ["菱田春草", "Hishida Shunso"], ["上村松园", "Uemura Shoen"]],
    "yamato-e": [["土佐光信", "Tosa Mitsunobu"], ["土佐光起", "Tosa Mitsuoki"], ["俵屋宗达", "Tawaraya Sotatsu"]],
    "korean-minhwa": [["朝鲜无名民画师", "Anonymous Joseon folk painters"], ["册架图画师", "Chaekgeori painters"], ["文字图画师", "Munjado painters"]],
    "indian-miniature": [["比萨万", "Basawan"], ["曼苏尔", "Ustad Mansur"], ["尼哈尔·昌德", "Nihal Chand"]],
    "persian-miniature": [["比赫扎德", "Behzad"], ["礼萨·阿巴西", "Reza Abbasi"], ["苏丹·穆罕默德", "Sultan Muhammad"]],
    "islamic-geometric": [["阿尔罕布拉工匠", "Alhambra craftsmen"], ["奥斯曼瓷砖工匠", "Ottoman tile makers"], ["伊斯兰书法家", "Islamic calligraphers"]],
    "tibetan-thangka": [["门拉顿珠", "Menla Dondrup"], ["赤美仁增", "Choying Dorje"], ["藏传佛教画师", "Tibetan Buddhist painters"]],
    "thai-temple-mural": [["泰国寺庙壁画师", "Thai temple muralists"], ["Khrua In Khong", "Khrua In Khong"], ["查克里时期宫廷画师", "Chakri court painters"]],
    "byzantine-icon": [["安德烈·鲁布廖夫", "Andrei Rublev"], ["塞萨洛尼基圣像画师", "Thessaloniki icon painters"], ["拜占庭镶嵌工匠", "Byzantine mosaicists"]],
    "mexican-muralism": [["迭戈·里维拉", "Diego Rivera"], ["何塞·克莱门特·奥罗斯科", "Jose Clemente Orozco"], ["大卫·阿尔法罗·西凯罗斯", "David Alfaro Siqueiros"]],
    "aboriginal-dot-painting": [["Papunya Tula 艺术家", "Papunya Tula artists"], ["克利福德·波苏姆", "Clifford Possum Tjapaltjarri"], ["艾米丽·卡梅·金瓦雷耶", "Emily Kame Kngwarreye"]],
    "african-tribal-pattern": [["库巴织工", "Kuba weavers"], ["约鲁巴珠饰工匠", "Yoruba beadworkers"], ["恩德贝莱壁画师", "Ndebele mural painters"]],
    "native-american-art": [["普韦布洛陶艺传统", "Pueblo pottery traditions"], ["纳瓦霍织工", "Navajo weavers"], ["西北海岸 Formline 艺术家", "Northwest Coast formline artists"]],
    "russian-lubok": [["俄罗斯民间版画师", "Russian lubok printmakers"], ["伊万·比利宾", "Ivan Bilibin"], ["瓦西里·科伦", "Vasily Koren"]],
    "nordic-folk-art": [["罗斯马林画师", "Rosemaling painters"], ["达拉木马工匠", "Dala horse painters"], ["北欧纺织工匠", "Nordic textile makers"]],
    "celtic-art": [["凯尔斯书抄写员", "Book of Kells scribes"], ["乔治·贝恩", "George Bain"], ["凯尔特金工匠", "Celtic metalworkers"]],
    madhubani: [["西塔·德维", "Sita Devi"], ["甘加·德维", "Ganga Devi"], ["巴乌阿·德维", "Baua Devi"]],
    "chinese-new-year-woodblock": [["天津杨柳青年画艺人", "Yangliuqing printmakers"], ["苏州桃花坞画师", "Taohuawu printmakers"], ["潍坊杨家埠画师", "Yangjiabu printmakers"]],
    "healing-animation": [["手绘背景美术师", "Hand-painted background artists"], ["角色动画师", "Character animators"], ["动画美术指导", "Animation art directors"]],
    "cinematic-anime": [["背景美术团队", "Background art teams"], ["合成与摄影团队", "Compositing teams"], ["色彩脚本设计师", "Color script artists"]],
    "classic-disney": [["华特·迪士尼", "Walt Disney"], ["乌布·伊沃克斯", "Ub Iwerks"], ["玛丽·布莱尔", "Mary Blair"]],
    "warm-3d-animation": [["角色动画团队", "Character animation teams"], ["故事板艺术家", "Storyboard artists"], ["材质与灯光团队", "Material and lighting teams"]],
    "dreamworks-cartoon": [["角色设计师", "Character designers"], ["故事艺术家", "Story artists"], ["动画导演", "Animation directors"]],
    anime: [["手冢治虫", "Osamu Tezuka"], ["大友克洋", "Katsuhiro Otomo"], ["庵野秀明", "Hideaki Anno"]],
    manga: [["手冢治虫", "Osamu Tezuka"], ["石之森章太郎", "Shotaro Ishinomori"], ["赤冢不二夫", "Fujio Akatsuka"]],
    shonen: [["手冢治虫", "Osamu Tezuka"], ["石之森章太郎", "Shotaro Ishinomori"], ["鸟山明", "Akira Toriyama"]],
    shojo: [["萩尾望都", "Moto Hagio"], ["竹宫惠子", "Keiko Takemiya"], ["池田理代子", "Riyoko Ikeda"]],
    "american-comic-book": [["杰克·柯比", "Jack Kirby"], ["斯坦·李", "Stan Lee"], ["威尔·艾斯纳", "Will Eisner"]],
    "ligne-claire": [["埃尔热", "Herge"], ["埃德加·皮埃尔·雅各布", "E. P. Jacobs"], ["雅克·马丁", "Jacques Martin"]],
    "graphic-novel": [["威尔·艾斯纳", "Will Eisner"], ["林德·沃德", "Lynd Ward"], ["弗朗斯·马塞雷尔", "Frans Masereel"]],
    "noir-illustration": [["爱德华·霍普", "Edward Hopper"], ["罗伯特·麦金尼斯", "Robert McGinnis"], ["索尔·巴斯", "Saul Bass"]],
    "childrens-picture-book": [["莫里斯·桑达克", "Maurice Sendak"], ["碧雅翠丝·波特", "Beatrix Potter"], ["埃里克·卡尔", "Eric Carle"]],
    "editorial-illustration": [["索尔·斯坦伯格", "Saul Steinberg"], ["米尔顿·格拉泽", "Milton Glaser"], ["西摩·克瓦斯特", "Seymour Chwast"]],
    "fashion-illustration": [["勒内·格吕奥", "Rene Gruau"], ["安东尼奥·洛佩兹", "Antonio Lopez"], ["大卫·唐顿", "David Downton"]],
    "botanical-illustration": [["玛丽亚·西比拉·梅里安", "Maria Sibylla Merian"], ["皮埃尔-约瑟夫·雷杜德", "Pierre-Joseph Redoute"], ["玛格丽特·米", "Margaret Mee"]],
    "scientific-illustration": [["恩斯特·海克尔", "Ernst Haeckel"], ["圣地亚哥·拉蒙-卡哈尔", "Santiago Ramon y Cajal"], ["约翰·詹姆斯·奥杜邦", "John James Audubon"]],
    "isometric-illustration": [["奥托·纽拉特", "Otto Neurath"], ["格尔德·阿恩茨", "Gerd Arntz"], ["现代信息设计师", "Contemporary information designers"]],
    "flat-illustration": [["苏珊·卡尔", "Susan Kare"], ["奥托·纽拉特", "Otto Neurath"], ["格尔德·阿恩茨", "Gerd Arntz"]]
  };

  const categoryHistory = {
    poster: ["20 世纪平面设计史", "20th-century graphic design"],
    painting: ["欧洲绘画史", "European painting history"],
    master: ["艺术家个人语言与现代艺术史", "an artist's personal language and modern art history"],
    modern: ["19 世纪末到 20 世纪的现代艺术运动", "late-19th- to 20th-century modern art movements"],
    asian: ["亚洲艺术史、宗教图像和手工艺传统", "Asian art history, religious imagery and craft traditions"],
    folk: ["地方民俗、公共图像和手工艺传统", "regional folklore, public imagery and craft traditions"],
    animation: ["动画工业、漫画出版和影视美术", "animation production, comics publishing and film art direction"],
    illustration: ["出版、商业传播和说明图像史", "publishing, commercial communication and explanatory image history"]
  };

  const riskByStyle = {
    "healing-animation": ["不要写成宫崎骏、吉卜力或任何在世导演/工作室的直接风格；避免复刻具体角色、场景和 IP。", "Do not prompt for Miyazaki, Studio Ghibli or any living director/studio style; avoid copying specific characters, scenes or IP."],
    "cinematic-anime": ["不要点名复刻在世动画导演或具体电影；只描述天空、城市、逆光、合成摄影等通用视觉语法。", "Do not imitate living anime directors or specific films; describe general sky, city, backlight and compositing language only."],
    "classic-disney": ["避免 Disney、Mickey、公主城堡和具体角色轮廓；只使用黄金时代手绘动画的通用原则。", "Avoid Disney, Mickey, princess castles and specific character silhouettes; use only general golden-age hand-drawn animation principles."],
    "warm-3d-animation": ["避免 Pixar 或具体工作室/角色；只描述温情三维角色动画、材质和灯光。", "Avoid Pixar or specific studios/characters; describe warm 3D character animation, materials and lighting only."],
    "dreamworks-cartoon": ["避免 DreamWorks 或具体角色；只描述夸张表情、喜剧节奏和三维卡通造型。", "Avoid DreamWorks or specific characters; describe exaggerated expression, comedy timing and 3D cartoon forms only."],
    shonen: ["避免复制具体漫画角色、服装、招式、分镜和标志性文字。", "Avoid copying specific manga characters, costumes, attacks, panel layouts or signature lettering."],
    basquiat: ["避免复制皇冠、SAMO、特定文字涂鸦和具体作品构图。", "Avoid copying crowns, SAMO, specific graffiti text or exact artwork compositions."],
    "aboriginal-dot-painting": ["不要复制神圣图像、Dreaming 故事或部族专属符号；只做受点阵节奏启发的原创抽象。", "Do not copy sacred imagery, Dreaming stories or clan-specific symbols; make only original abstraction inspired by dot rhythm."],
    "african-tribal-pattern": ["避免把非洲视觉混成单一“部落风”；应限定为织物、珠饰或壁画等具体传统。", "Avoid reducing African visuals to one generic tribal style; specify textile, beadwork or mural traditions."],
    "native-american-art": ["避免混用不同民族的神圣符号和仪式图像；只做公开视觉原则的原创转译。", "Avoid mixing sacred symbols and ceremonial imagery from different nations; create original work from public visual principles only."]
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

  const refinedStyles = {
    "swiss-style": {
      summary: {
        zh: `瑞士国际主义风格用网格、无衬线字体和克制留白把信息变得像仪表盘一样清楚，适合科技、展会、品牌发布和理性海报。`,
        en: `Swiss Style turns information into a precise visual system with grids, sans-serif type and disciplined whitespace, ideal for tech, events, brand launches and rational posters.`
      },
      memoryAnchor: {
        zh: `像一张被隐形网格校准过的新闻海报：冷静、准确、没有多余动作。`,
        en: `Like a news poster calibrated by an invisible grid: calm, exact and free of wasted gestures.`
      },
      history: {
        zh: `它在 20 世纪中期的瑞士平面设计中成熟，吸收了包豪斯、构成主义和现代主义排版的影响。战后国际交流、企业识别和公共信息需要更清楚的视觉语言，于是网格系统、Helvetica/Univers 一类无衬线字体、左对齐和客观摄影成为核心工具。`,
        en: `It matured in mid-20th-century Swiss graphic design, drawing from Bauhaus, Constructivism and modernist typography. Postwar communication, corporate identity and public information needed clarity, so grids, sans-serif faces such as Helvetica or Univers, flush-left type and objective photography became central tools.`
      },
      why: {
        zh: `它这样画不是为了冷，而是为了让内容自己说话。设计师把主观装饰降到最低，用网格决定位置，用字号决定层级，用留白决定呼吸。`,
        en: `It looks cool-headed because the designer steps back and lets content speak. The grid decides placement, type size decides hierarchy, and whitespace gives the message air.`
      },
      curatorNote: {
        zh: `看 Swiss Style 时先找网格：标题、图片、数字和空白通常像被同一套坐标系统吸住。它的高级感来自准确，不来自装饰。`,
        en: `When viewing Swiss Style, look for the grid first: headline, image, numbers and blank space feel locked to one coordinate system. Its premium tone comes from precision, not decoration.`
      },
      lookFor: {
        zh: [`严格网格和不对称布局`, `无衬线大标题，左对齐、右侧参差`, `黑白红或少量强调色`, `大量留白，信息层级非常清楚`],
        en: [`Strict grid with asymmetric layout`, `Large sans-serif type, flush-left and ragged-right`, `Black, white, red or very restrained accent color`, `Generous whitespace and clear hierarchy`]
      },
      references: {
        zh: [`约瑟夫·穆勒-布罗克曼的音乐会海报：理解网格如何制造节奏`, `阿明·霍夫曼的教学与海报：看黑白对比和形式训练`, `Helvetica/Univers 字体系统：理解“中性字体”如何服务信息`],
        en: [`Josef Muller-Brockmann concert posters: see how grids create rhythm`, `Armin Hofmann posters and teaching: study contrast and formal discipline`, `Helvetica and Univers systems: understand neutral type as an information tool`]
      },
      imagePrompts: {
        zh: `瑞士国际主义风格品牌发布海报，严格数学网格，左对齐无衬线大标题，客观摄影或几何图形，黑白红克制配色，大留白，清晰信息层级，高级印刷质感，原创现代设计，不复制具体海报`,
        en: `Swiss International Typographic Style brand launch poster, strict mathematical grid, flush-left sans-serif headline, objective photography or geometric form, restrained black white red palette, strong whitespace, clear information hierarchy, premium print texture, original modern design, not copying any specific poster`
      },
      negativePrompt: {
        zh: `避免杂乱装饰、花体字、廉价渐变、随意居中、低清晰度文字、复刻具体设计师海报构图`,
        en: `Avoid cluttered decoration, script fonts, cheap gradients, random centered layout, low-quality text, copying a specific designer poster composition`
      }
    },
    bauhaus: {
      summary: {
        zh: `包豪斯把艺术、工艺和工业设计放在同一张桌上，用几何、基础色和功能逻辑建立现代视觉秩序。`,
        en: `Bauhaus puts art, craft and industry at one table, using geometry, primary color and functional logic to build modern visual order.`
      },
      memoryAnchor: {
        zh: `像一间用圆、方、三角和红黄蓝搭起来的现代设计教室。`,
        en: `Like a modern design classroom built from circles, squares, triangles, red, yellow and blue.`
      },
      history: {
        zh: `包豪斯学校 1919 年由沃尔特·格罗皮乌斯在德国魏玛创办，后来迁至德绍和柏林。它处在一战后工业化和现代生活重建的语境里，强调基础造型训练、材料实验、建筑、家具、字体和平面设计的统一。`,
        en: `The Bauhaus school was founded by Walter Gropius in Weimar, Germany in 1919 and later moved to Dessau and Berlin. In the post-World War I context of industrialization and modern living, it connected basic form training, material experiments, architecture, furniture, typography and graphic design.`
      },
      why: {
        zh: `它追求“好用的美”。几何形不是装饰，而是最容易被工业生产和大众理解的基础语言；颜色也常被当成结构提示，而不是单纯上色。`,
        en: `It seeks useful beauty. Geometry is not decoration but a basic language that industry can produce and the public can understand; color often works as structure, not just surface.`
      },
      curatorNote: {
        zh: `看包豪斯不要只看红黄蓝，重点看它有没有把功能、结构和视觉节奏合在一起。真正的包豪斯感通常很简单，但不随便。`,
        en: `Do not reduce Bauhaus to red-yellow-blue. Look for function, structure and visual rhythm working together. Real Bauhaus feels simple, but never casual.`
      },
      lookFor: {
        zh: [`圆形、方形、三角形等基础几何`, `红黄蓝黑白等基础色`, `字体、图形、空间像同一套系统`, `少装饰，强调功能和构成`],
        en: [`Basic geometry: circle, square, triangle`, `Primary colors plus black and white`, `Type, image and space feel systematic`, `Minimal ornament, strong function and composition`]
      },
      references: {
        zh: [`格罗皮乌斯的学校理念：艺术与工业结合`, `保罗·克利与康定斯基的基础课程：理解点线面和色彩训练`, `德绍校舍与包豪斯展览海报：看建筑和平面的共同秩序`],
        en: [`Gropius school concept: art joined with industry`, `Klee and Kandinsky foundation courses: point, line, plane and color training`, `Dessau building and Bauhaus exhibition posters: shared order across architecture and graphics`]
      },
      imagePrompts: {
        zh: `包豪斯风格设计海报，圆形方形三角形组合，红黄蓝黑白基础色，功能主义构图，现代主义无衬线字体，清晰模块化版式，纸张印刷质感，原创展览海报，不复制具体历史作品`,
        en: `Bauhaus design poster, circles squares triangles, red yellow blue black white primary palette, functionalist composition, modernist sans-serif typography, clear modular layout, printed paper texture, original exhibition poster, not copying a specific historical work`
      },
      negativePrompt: {
        zh: `避免过度装饰、复古脏污过重、复杂渐变、卡通化、直接复制包豪斯校舍或具体海报`,
        en: `Avoid excessive ornament, heavy fake aging, complex gradients, cartoonish treatment, direct copy of the Bauhaus building or a specific poster`
      }
    },
    "art-deco": {
      summary: {
        zh: `装饰艺术风格把几何秩序、金属光泽和都市奢华结合起来，像 1920–30 年代电影院、邮轮和摩天楼的视觉语言。`,
        en: `Art Deco combines geometric order, metallic shine and urban luxury, like the visual language of 1920s-30s cinemas, ocean liners and skyscrapers.`
      },
      memoryAnchor: {
        zh: `像黄金时代电影院门口的霓虹立面：对称、锋利、闪闪发光。`,
        en: `Like the neon facade of a Golden Age cinema: symmetrical, sharp and glowing.`
      },
      history: {
        zh: `Art Deco 在 1925 年巴黎国际装饰艺术与现代工业博览会后成为代表性名称，兴盛于欧洲和美国的两次世界大战之间。它吸收了机器时代、古埃及热、爵士时代、现代建筑和高级工艺的视觉来源。`,
        en: `Art Deco became strongly associated with the 1925 Paris Exposition Internationale des Arts Decoratifs et Industriels Modernes and flourished between the world wars in Europe and the United States. Its sources include the machine age, Egyptomania, the Jazz Age, modern architecture and luxury craft.`
      },
      why: {
        zh: `它回应的是现代都市对“新奢华”的想象：既要工业时代的速度和几何，又要手工材料的贵气。于是阶梯形、放射线、金色和高对称变成了它的招牌。`,
        en: `It answers the modern city's desire for new luxury: industrial speed and geometry, but also expensive craft and material. Stepped forms, sunbursts, gold and symmetry became its signature.`
      },
      curatorNote: {
        zh: `看 Art Deco 先看轮廓：是不是像建筑立面一样向上生长；再看光泽：金属、黑色、象牙白和深绿会把画面推向奢华。`,
        en: `Read Art Deco by silhouette first: does it rise like an architectural facade? Then read the shine: metal, black, ivory and deep green push the image toward luxury.`
      },
      lookFor: {
        zh: [`强对称和阶梯形结构`, `金色、黑色、象牙白、祖母绿等奢华配色`, `放射线、扇形、尖角、摩天楼轮廓`, `像海报、建筑立面或高级包装`],
        en: [`Strong symmetry and stepped structure`, `Gold, black, ivory, emerald luxury palettes`, `Sunbursts, fans, sharp angles, skyscraper silhouettes`, `Poster, facade or premium packaging feeling`]
      },
      references: {
        zh: [`A. M. Cassandre 海报：看速度感和几何简化`, `克莱斯勒大厦：理解金属和阶梯式都市奢华`, `1920–30 年代电影海报与邮轮视觉：看旅行、娱乐和现代性`],
        en: [`A. M. Cassandre posters: speed and geometric simplification`, `Chrysler Building: metal and stepped urban luxury`, `1920s-30s cinema and ocean-liner graphics: travel, entertainment and modernity`]
      },
      imagePrompts: {
        zh: `Art Deco 装饰艺术风格高端活动海报，黑金象牙白配色，对称几何构图，放射线和阶梯形摩天楼轮廓，金属质感，爵士时代奢华，高清原创海报，不复制具体建筑或历史海报`,
        en: `Art Deco luxury event poster, black gold ivory palette, symmetrical geometric composition, sunburst rays and stepped skyscraper silhouettes, metallic finish, Jazz Age glamour, high-resolution original poster, not copying a specific building or historical poster`
      },
      negativePrompt: {
        zh: `避免廉价金色渐变、过度 3D、巴洛克花纹混入、现代霓虹赛博感、复制具体电影海报或建筑外观`,
        en: `Avoid cheap gold gradients, excessive 3D, Baroque ornament mixed in, cyberpunk neon mood, copying a specific film poster or building facade`
      }
    },
    "art-nouveau": {
      summary: {
        zh: `新艺术风格用藤蔓般的曲线、花卉、女性形象和手工装饰，把海报、建筑、首饰和书籍变成一整套流动的自然图案。`,
        en: `Art Nouveau uses vine-like curves, flowers, female figures and crafted ornament to turn posters, architecture, jewelry and books into one flowing natural pattern.`
      },
      memoryAnchor: {
        zh: `像一株植物长成了海报边框，线条绕着人物慢慢开花。`,
        en: `Like a plant growing into the poster frame, its lines flowering around the figure.`
      },
      history: {
        zh: `新艺术兴起于 19 世纪末到 20 世纪初的欧洲，反对历史复古风的拼贴，也回应工业化带来的粗糙量产。它从植物、昆虫、日本版画、手工艺运动和城市商业海报中吸收灵感。`,
        en: `Art Nouveau rose in Europe around the late 19th and early 20th centuries, rejecting recycled historic styles while responding to rough industrial mass production. It drew from plants, insects, Japanese prints, the Arts and Crafts movement and urban commercial posters.`
      },
      why: {
        zh: `它想让现代生活重新有“自然的手感”。所以线条不直来直去，而像枝叶、头发和水流一样绕行；装饰不是贴上去的，而是和人物、文字、边框长在一起。`,
        en: `It wanted modern life to regain an organic handmade feeling. Lines do not move straight; they curl like leaves, hair and water. Ornament is not pasted on; it grows with figure, type and frame.`
      },
      curatorNote: {
        zh: `看新艺术时盯住线条：如果画面最先吸引你的不是物体，而是一条连续的卷曲轮廓，那就很接近了。`,
        en: `For Art Nouveau, follow the line. If the first thing you notice is not an object but a continuous curling contour, you are close.`
      },
      lookFor: {
        zh: [`藤蔓、花卉、昆虫翅膀般的自然曲线`, `女性人物和长发常与装饰融为一体`, `边框、字体、图案高度一体化`, `柔和但繁复，像手工海报或装饰门廊`],
        en: [`Vine, flower and insect-wing organic curves`, `Female figures and hair merging with ornament`, `Frame, type and pattern integrated`, `Soft but intricate, like a crafted poster or decorated entrance`]
      },
      references: {
        zh: [`阿尔丰斯·穆夏海报：人物、花环和字体的一体化`, `赫克托·吉马尔巴黎地铁入口：看曲线如何进入建筑`, `蒂芙尼玻璃与珠宝：理解自然形态和材料光泽`],
        en: [`Alphonse Mucha posters: figure, halo and lettering as one system`, `Hector Guimard Paris Metro entrances: curves in architecture`, `Tiffany glass and jewelry: natural form plus material glow`]
      },
      imagePrompts: {
        zh: `Art Nouveau 新艺术风格插画海报，藤蔓曲线，花卉边框，优雅女性剪影，手绘装饰字体，柔和自然色，平面装饰构图，精致印刷质感，原创海报，不复制穆夏具体作品`,
        en: `Art Nouveau illustration poster, vine-like curves, floral border, elegant female silhouette, hand-drawn ornamental lettering, soft natural palette, flat decorative composition, refined print texture, original poster, not copying a specific Mucha work`
      },
      negativePrompt: {
        zh: `避免现代极简、硬直几何、廉价花边素材、过度性感化人物、复制具体穆夏海报构图`,
        en: `Avoid modern minimalism, rigid geometry, cheap floral clipart, oversexualized figure, copying a specific Mucha poster composition`
      }
    },
    constructivism: {
      summary: {
        zh: `构成主义把红黑几何、斜线、摄影拼贴和强口号组合成革命时代的视觉机器，画面像正在向前推进。`,
        en: `Constructivism turns red-black geometry, diagonals, photomontage and bold slogans into a revolutionary visual machine that feels like it is advancing.`
      },
      memoryAnchor: {
        zh: `像一只红色楔子劈开画面，所有文字和人物都在向前冲。`,
        en: `Like a red wedge cutting through the page, with every word and figure rushing forward.`
      },
      history: {
        zh: `构成主义源于 20 世纪初俄罗斯先锋艺术，和革命后的工业、宣传、建筑、戏剧、摄影密切相关。塔特林、罗德琴科、利西茨基等人把艺术从画架推向社会用途，强调材料、结构、生产和公共传播。`,
        en: `Constructivism came from early-20th-century Russian avant-garde culture and was tied to post-revolution industry, propaganda, architecture, theatre and photography. Tatlin, Rodchenko and El Lissitzky pushed art away from easel painting toward social use, material, structure, production and public communication.`
      },
      why: {
        zh: `它要表现新社会的速度和力量，所以不爱平稳居中，而爱斜线、楔形、强对比和拼贴。画面不是“装饰”，更像传达行动指令。`,
        en: `It wanted to show the speed and force of a new society, so it prefers diagonals, wedges, sharp contrast and montage over calm centered balance. The image feels less like decoration and more like an instruction to act.`
      },
      curatorNote: {
        zh: `看构成主义时找“力的方向”：斜线、箭头、人物视线和大字会把你推向同一个运动方向。`,
        en: `Look for direction of force: diagonals, arrows, gaze and large type push the viewer toward one movement.`
      },
      lookFor: {
        zh: [`红黑白高对比`, `斜线、楔形、圆和强几何切割`, `摄影拼贴或人物仰拍`, `文字像口号一样参与构图`],
        en: [`Red black white high contrast`, `Diagonals, wedges, circles and geometric cuts`, `Photomontage or low-angle figures`, `Text acting like a slogan inside the composition`]
      },
      references: {
        zh: [`利西茨基《Beat the Whites with the Red Wedge》：理解楔形和政治符号`, `罗德琴科海报与摄影：看仰拍、斜线和拼贴`, `苏联早期宣传与书籍设计：看文字如何变成画面结构`],
        en: [`El Lissitzky's Beat the Whites with the Red Wedge: wedge and political symbol`, `Rodchenko posters and photography: low angles, diagonals and montage`, `Early Soviet propaganda and book design: text as visual structure`]
      },
      imagePrompts: {
        zh: `俄罗斯构成主义风格宣传海报，红黑白配色，强斜线构图，几何楔形和圆形，摄影拼贴感，粗体无衬线口号文字，工业时代动势，原创现代主题，不复制具体政治海报`,
        en: `Russian Constructivist propaganda-style poster, red black white palette, strong diagonal layout, geometric wedge and circle, photomontage feel, bold sans-serif slogan type, industrial motion, original modern subject, not copying a specific political poster`
      },
      negativePrompt: {
        zh: `避免柔和插画、复古苏联符号堆砌、真实政治标志、低清晰度文字、复制具体历史宣传海报`,
        en: `Avoid soft illustration, random Soviet-symbol clutter, real political emblems, low-quality text, copying a specific historical propaganda poster`
      }
    },
    minimalism: {
      summary: {
        zh: `极简主义把画面削减到最少元素：少颜色、少形状、少叙事，用比例、空白和材料感制造安静的力量。`,
        en: `Minimalism reduces the image to the fewest elements: limited color, form and narrative, using proportion, space and material presence to create quiet force.`
      },
      memoryAnchor: {
        zh: `像一间只留下一把椅子和一束光的房间，空白本身就是主角。`,
        en: `Like a room with only one chair and one beam of light, where emptiness becomes the subject.`
      },
      history: {
        zh: `极简主义在 1960 年代美国艺术中成为重要倾向，常和唐纳德·贾德、索尔·勒维特、阿格尼丝·马丁等人相关。它反对过度个人化的表现主义笔触，转向工业材料、重复结构、基础几何和观看者所在空间。`,
        en: `Minimalism became a major tendency in 1960s American art, associated with Donald Judd, Sol LeWitt, Agnes Martin and others. It resisted highly personal expressive brushwork and turned toward industrial material, repetition, basic geometry and the viewer's space.`
      },
      why: {
        zh: `它的逻辑是：删到不能再删，剩下的关系才会被看见。一个方块、一道线、一片空白都必须有位置和重量。`,
        en: `Its logic is to remove until nothing more can go; then the remaining relationships become visible. A square, a line or a blank field must carry position and weight.`
      },
      curatorNote: {
        zh: `看极简不要问“画了什么”，先问“留下了什么”。真正的极简不是空，而是每个留下的东西都很准。`,
        en: `Do not ask first what is depicted; ask what remains. True minimalism is not empty. Everything left has to be exact.`
      },
      lookFor: {
        zh: [`极少元素和大面积空白`, `基础几何、重复或单一结构`, `低饱和或单色配色`, `安静、克制、没有叙事噪音`],
        en: [`Very few elements and large negative space`, `Basic geometry, repetition or single structure`, `Low saturation or monochrome palette`, `Quiet restraint with no narrative noise`]
      },
      references: {
        zh: [`唐纳德·贾德盒体作品：看工业材料和空间关系`, `阿格尼丝·马丁网格绘画：看安静重复`, `索尔·勒维特结构与规则：看概念如何生成形式`],
        en: [`Donald Judd boxes: industrial material and spatial relation`, `Agnes Martin grids: quiet repetition`, `Sol LeWitt structures and rules: concept generating form`]
      },
      imagePrompts: {
        zh: `极简主义视觉海报，大面积留白，单一几何形体，低饱和中性色，精确比例，安静高级，少量文字，纸张或金属材质感，原创品牌海报，不复制具体极简艺术作品`,
        en: `Minimalist visual poster, vast negative space, single geometric form, low-saturation neutral palette, precise proportion, quiet premium mood, minimal text, paper or metal material feel, original brand poster, not copying a specific minimalist artwork`
      },
      negativePrompt: {
        zh: `避免装饰图案、复杂场景、强烈渐变、杂乱文字、假高级样机、直接复制艺术装置`,
        en: `Avoid decorative patterns, complex scenes, loud gradients, cluttered text, fake luxury mockup look, direct copy of an art installation`
      }
    },
    "pop-art-poster": {
      summary: {
        zh: `波普海报把漫画、广告、明星、商品和高饱和色放进艺术画面，像大众文化突然被放大成一张响亮的海报。`,
        en: `Pop Art Poster brings comics, advertising, celebrities, products and saturated color into art, as if mass culture has been enlarged into a loud poster.`
      },
      memoryAnchor: {
        zh: `像便利店货架和漫画分镜同时爆开：鲜艳、重复、带一点讽刺。`,
        en: `Like a convenience-store shelf and comic panel exploding at once: bright, repeated and slightly ironic.`
      },
      history: {
        zh: `波普艺术 1950 年代在英国出现，1960 年代在美国变得非常醒目。它从广告、漫画、消费品包装、电视和明星文化中取材，把“低俗大众图像”带进美术馆和海报设计。`,
        en: `Pop art emerged in Britain in the 1950s and became highly visible in the United States in the 1960s. It drew from advertising, comics, consumer packaging, television and celebrity culture, bringing mass images into galleries and poster design.`
      },
      why: {
        zh: `它不是单纯可爱，而是在问：当商品和明星每天包围我们，什么才是现代图像？所以它故意使用印刷网点、重复和夸张颜色，让商业视觉变得醒目甚至荒诞。`,
        en: `It is not just cute. It asks what modern images are when products and celebrities surround us daily. Ben-Day dots, repetition and exaggerated color make commercial imagery loud, attractive and absurd.`
      },
      curatorNote: {
        zh: `看波普海报时找“复制感”：同一个头像、商品或符号被重复、放大、换色，像广告又像玩笑。`,
        en: `Look for copy-like repetition: a face, product or symbol repeated, enlarged or recolored until it feels both like an ad and a joke.`
      },
      lookFor: {
        zh: [`漫画分格、粗黑线和网点`, `高饱和红黄蓝粉`, `商品、明星、拟声词或广告口吻`, `重复、放大、强烈平面感`],
        en: [`Comic panels, bold black outlines and halftone dots`, `Saturated red yellow blue pink`, `Products, celebrities, sound words or ad language`, `Repetition, enlargement and flat graphic punch`]
      },
      references: {
        zh: [`安迪·沃霍尔丝网版画：看重复和消费符号`, `罗伊·利希滕斯坦漫画语言：看网点和对白框`, `1960 年代广告与杂志版面：理解大众图像来源`],
        en: [`Andy Warhol screenprints: repetition and consumer symbols`, `Roy Lichtenstein comic language: dots and speech bubbles`, `1960s advertising and magazines: sources of mass imagery`]
      },
      imagePrompts: {
        zh: `波普艺术海报，漫画网点，粗黑轮廓，高饱和红黄蓝粉，重复商品符号或原创人物头像，广告式大标题，丝网印刷质感，幽默讽刺，原创构图，不使用真实品牌或名人肖像`,
        en: `Pop art poster, comic halftone dots, bold black outlines, saturated red yellow blue pink, repeated product-like symbols or original portrait, advertising headline, screenprint texture, humorous irony, original composition, no real brands or celebrity likenesses`
      },
      negativePrompt: {
        zh: `避免真实商标、真实名人脸、低质漫画截图、过度 3D、复制沃霍尔或利希滕斯坦具体作品`,
        en: `Avoid real trademarks, real celebrity faces, low-quality comic screenshots, excessive 3D, copying a specific Warhol or Lichtenstein work`
      }
    },
    "van-gogh": {
      summary: {
        zh: `梵高式笔触用旋转、厚涂、强烈互补色和情绪化线条，把风景和人物变成正在燃烧的心理现场。`,
        en: `Van Gogh-like brushwork uses swirling marks, impasto, strong complementary color and emotional line to turn landscapes and figures into burning psychological scenes.`
      },
      memoryAnchor: {
        zh: `像情绪在天空、麦田和星光里一圈圈旋转。`,
        en: `Like emotion spinning through sky, wheat fields and starlight.`
      },
      history: {
        zh: `文森特·梵高活跃于 19 世纪末欧洲后印象派语境，受到荷兰现实主义、法国印象派、日本浮世绘和南法强烈阳光影响。他把可见世界转化成充满方向感的笔触和高浓度颜色。`,
        en: `Vincent van Gogh worked in the late-19th-century European Post-Impressionist context, shaped by Dutch realism, French Impressionism, Japanese prints and the intense light of southern France. He translated the visible world into directional brushwork and concentrated color.`
      },
      why: {
        zh: `他这样画，是因为颜色和笔触可以比准确写实更直接地表达感受。短促、旋转、厚重的笔触让静止的天空、树和脸都带上了内在运动。`,
        en: `He painted this way because color and brushwork could express feeling more directly than accurate realism. Short, swirling and heavy marks give still skies, trees and faces inner motion.`
      },
      curatorNote: {
        zh: `看梵高式视觉时不要只找星空，要找“笔触方向”。每一笔都像情绪留下的指纹。`,
        en: `Do not only look for starry skies. Look for direction of mark. Every stroke should feel like an emotional fingerprint.`
      },
      lookFor: {
        zh: [`旋转或短促的可见笔触`, `蓝黄、橙蓝等强互补色`, `厚涂质感和手的力度`, `风景也像有情绪和运动`],
        en: [`Visible swirling or short strokes`, `Strong complementary blues/yellows or orange/blues`, `Impasto texture and hand pressure`, `Landscape feels emotional and moving`]
      },
      references: {
        zh: [`《Starry Night》：看天空如何被笔触变成运动`, `《Sunflowers》：看黄色如何形成情绪强度`, `阿尔时期风景：看南法光线和互补色`],
        en: [`Starry Night: sky turned into motion by mark`, `Sunflowers: yellow as emotional intensity`, `Arles landscapes: southern light and complementary color`]
      },
      imagePrompts: {
        zh: `后印象派梵高式视觉语言，厚涂油画质感，旋转可见笔触，蓝黄互补色，情绪化夜空或田野，强方向感线条，原创风景海报，高清，不复制《星夜》或任何具体作品构图`,
        en: `Post-Impressionist Van Gogh-like visual language, impasto oil texture, swirling visible brushstrokes, blue-yellow complementary palette, emotional night sky or field, strong directional lines, original landscape poster, high resolution, not copying Starry Night or any specific composition`
      },
      negativePrompt: {
        zh: `避免直接复刻星夜构图、廉价旋涡滤镜、平滑数字油画、低清晰度笔触、真实艺术品截图`,
        en: `Avoid direct Starry Night composition, cheap swirl filters, smooth digital oil look, low-quality brush marks, screenshots of real artworks`
      }
    },
    monet: {
      summary: {
        zh: `莫奈式光影用松动笔触和空气感颜色捕捉某一瞬间的光，画面像雾、河面和花园在眼前慢慢变亮。`,
        en: `Monet-like light uses loose brushwork and airy color to catch a moment of illumination, as if mist, water and garden slowly brighten before the eye.`
      },
      memoryAnchor: {
        zh: `像清晨水面上的光，还没凝固就被画了下来。`,
        en: `Like morning light on water, painted before it has time to solidify.`
      },
      history: {
        zh: `克洛德·莫奈是法国印象派核心人物，活跃于 19 世纪后半叶。他和同伴走出画室，关注户外光线、天气、时间变化和现代生活场景；晚年的吉维尼花园与睡莲系列把光、水和色彩推向近乎抽象。`,
        en: `Claude Monet was central to French Impressionism in the late 19th century. He and his peers moved outside the studio to study outdoor light, weather, changing time and modern life; his late Giverny garden and water-lily series pushed light, water and color toward abstraction.`
      },
      why: {
        zh: `他关心的不是物体“本来是什么颜色”，而是光照到那一刻它看起来怎样。快速、松动的笔触能保留时间流动感。`,
        en: `He cared less about an object's fixed color and more about how it appears under a particular light. Fast, loose marks preserve the feeling of time passing.`
      },
      curatorNote: {
        zh: `看莫奈式画面时，把眼睛稍微眯起来：如果边界变软、颜色在空气里互相渗开，就对了。`,
        en: `Squint slightly when reading a Monet-like image. If edges soften and colors breathe into the air, it is working.`
      },
      lookFor: {
        zh: [`松动短笔触，不追求硬轮廓`, `雾蓝、浅紫、嫩绿、粉橙等空气色`, `水面、花园、桥、天空常被光包裹`, `同一主题像在不同时间被观察`],
        en: [`Loose short strokes without hard outlines`, `Airy blues, lilacs, greens and peach tones`, `Water, gardens, bridges and sky wrapped in light`, `A subject observed through changing time`]
      },
      references: {
        zh: [`《Impression, Sunrise》：印象派名称来源和瞬间光感`, `睡莲系列：看水面和倒影如何接近抽象`, `鲁昂大教堂系列：看同一对象在不同光线下变化`],
        en: [`Impression, Sunrise: the name and momentary light`, `Water Lilies: water and reflection approaching abstraction`, `Rouen Cathedral series: one subject changing under light`]
      },
      imagePrompts: {
        zh: `莫奈式印象派光影，清晨花园或水面，松动短笔触，雾蓝浅紫睡莲绿，柔和空气透视，边界轻微溶解，原创风景插画，高清，不复制具体莫奈作品`,
        en: `Monet-like Impressionist light, morning garden or water surface, loose short brushstrokes, misty blue pale lilac water-lily green, soft atmospheric perspective, gently dissolved edges, original landscape illustration, high resolution, not copying a specific Monet work`
      },
      negativePrompt: {
        zh: `避免硬边线稿、照片写实、厚重黑影、过饱和霓虹、复制睡莲或鲁昂大教堂具体构图`,
        en: `Avoid hard line art, photorealism, heavy black shadows, oversaturated neon, copying a specific Water Lilies or Rouen Cathedral composition`
      }
    },
    "picasso-cubism": {
      summary: {
        zh: `立体主义把一个对象拆成多个角度同时观看，用平面碎片、结构线和克制色彩重组现实。`,
        en: `Cubism breaks an object into multiple viewpoints at once, rebuilding reality with flat facets, structural lines and restrained color.`
      },
      memoryAnchor: {
        zh: `像把一张脸打碎成几面镜子，再从正面、侧面和记忆里一起拼回去。`,
        en: `Like breaking a face into mirrors and rebuilding it from front, side and memory at the same time.`
      },
      history: {
        zh: `立体主义在 1907–1910 年前后的巴黎形成，毕加索和乔治·布拉克是关键人物。它受到塞尚结构观、非洲与伊比利亚雕塑、现代城市经验影响，挑战单点透视和传统写实空间。`,
        en: `Cubism formed in Paris around 1907-1910 with Picasso and Georges Braque as central figures. It drew from Cezanne's structural approach, African and Iberian sculpture and modern urban experience, challenging single-point perspective and traditional realism.`
      },
      why: {
        zh: `它想说明：真实不只是一个角度。对象可以被拆开、旋转、压平，让观者同时看到形体、时间和观看过程。`,
        en: `It argues that reality is not one angle. Objects can be split, rotated and flattened so viewers see form, time and the act of looking together.`
      },
      curatorNote: {
        zh: `看立体主义别急着找“像不像”，先找几个视角如何同时存在。鼻子、眼睛、桌面和乐器常被拆成结构碎片。`,
        en: `Do not first ask whether it looks accurate. Ask how several viewpoints coexist. Noses, eyes, tables and instruments often become structural fragments.`
      },
      lookFor: {
        zh: [`多视角同时出现`, `脸、器物、空间被拆成几何碎片`, `棕灰、土色或克制色调`, `透视被压平，像拼贴或结构图`],
        en: [`Multiple viewpoints at once`, `Faces, objects and space broken into geometric facets`, `Brown, grey, earthy or restrained tones`, `Flattened perspective, collage or diagram feeling`]
      },
      references: {
        zh: [`毕加索《Les Demoiselles d'Avignon》：看形体断裂和面具影响`, `布拉克早期立体主义静物：看对象如何被结构化`, `分析立体主义与综合立体主义：从碎片到拼贴语言`],
        en: [`Picasso's Les Demoiselles d'Avignon: fractured form and mask influence`, `Braque's early Cubist still lifes: object as structure`, `Analytic and Synthetic Cubism: from facets to collage language`]
      },
      imagePrompts: {
        zh: `立体主义原创肖像或静物，多个视角同时呈现，几何碎片结构，棕灰土色克制调色，压平空间，线条切割，报纸拼贴质感，现代艺术海报，不复制毕加索具体作品`,
        en: `Cubist original portrait or still life, multiple viewpoints at once, geometric facet structure, restrained brown grey earth palette, flattened space, cutting lines, newspaper collage texture, modern art poster, not copying a specific Picasso work`
      },
      negativePrompt: {
        zh: `避免直接复制格尔尼卡或具体人物构图、过度漫画化、随机三角碎片、照片写实、当代艺术家完整风格`,
        en: `Avoid copying Guernica or a specific figure composition, excessive cartooning, random triangle fragments, photorealism, a living artist's complete style`
      }
    },
    matisse: {
      curatorNote: {
        zh: `看马蒂斯式色块时，先看颜色是不是在“跳舞”，再看剪纸边缘和留白如何让画面呼吸。它的重点不是画得像，而是让颜色、形状和节奏变得轻快有生命。`,
        en: `When viewing Matisse-like color blocks, first see whether the colors dance, then watch how cut-paper edges and open space let the image breathe. The point is not likeness, but color, shape and rhythm becoming light and alive.`
      }
    },
    dali: {
      summary: {
        zh: `达利式超现实把梦境里不可能的事物画得像照片一样精细，用软化物体、荒凉空间和怪异比例制造不安的奇观。`,
        en: `Dali-like Surrealism paints impossible dream events with near-photographic precision, using soft objects, barren spaces and strange scale to create unsettling spectacle.`
      },
      memoryAnchor: {
        zh: `像沙漠里一只融化的钟：荒诞，却被画得一本正经。`,
        en: `Like a melting clock in a desert: absurd, but painted with complete seriousness.`
      },
      history: {
        zh: `萨尔瓦多·达利是 20 世纪西班牙超现实主义代表，活跃于欧洲先锋艺术和精神分析流行的语境中。他把古典写实技巧、弗洛伊德式梦境、偏执联想和地中海荒地结合起来。`,
        en: `Salvador Dali was a major 20th-century Spanish Surrealist working within European avant-garde culture and the rise of psychoanalytic ideas. He combined classical illusionistic skill, Freudian dream logic, paranoid association and Mediterranean barren landscapes.`
      },
      why: {
        zh: `它的冲击来自“画得很真但事情不对”。越精细的明暗和透视，越能让荒诞物体显得像真实发生过。`,
        en: `Its shock comes from being realistically painted while reality is wrong. The more precise the light and perspective, the more impossible objects feel as if they truly happened.`
      },
      curatorNote: {
        zh: `看达利式画面时找冲突：写实技法和梦境逻辑必须同时存在。只有怪，不够；只有真，也不够。`,
        en: `Look for conflict: realistic technique and dream logic must coexist. Strange alone is not enough; realistic alone is not enough.`
      },
      lookFor: {
        zh: [`荒凉远景和低地平线`, `软化、变形或不合常理的物体`, `高精度写实光影`, `梦境符号之间没有日常逻辑`],
        en: [`Barren distance and low horizon`, `Softened, distorted or irrational objects`, `Highly precise realistic light`, `Dream symbols without everyday logic`]
      },
      references: {
        zh: [`《The Persistence of Memory》：理解软化物体和梦境时间`, `达利早期超现实绘画：看古典技法如何服务怪异图像`, `超现实主义与精神分析：理解潜意识符号来源`],
        en: [`The Persistence of Memory: soft objects and dream time`, `Dali's early Surrealist paintings: classical technique serving strange images`, `Surrealism and psychoanalysis: sources of unconscious symbols`]
      },
      imagePrompts: {
        zh: `达利式超现实视觉语言，荒凉地平线，精细古典写实光影，梦境中不可能的原创物体，软化形态，奇异尺度，安静但不安的气氛，高清原创场景，不复制融化钟或具体作品`,
        en: `Dali-like Surrealist visual language, barren horizon, precise classical realistic lighting, impossible original dream objects, softened forms, strange scale, quiet unsettling mood, high-resolution original scene, not copying melting clocks or any specific work`
      },
      negativePrompt: {
        zh: `避免直接画融化钟、复制达利具体构图、低质奇幻拼贴、恐怖血腥、廉价梦境滤镜`,
        en: `Avoid directly drawing melting clocks, copying a specific Dali composition, low-quality fantasy collage, gore horror, cheap dream filters`
      }
    },
    magritte: {
      summary: {
        zh: `马格利特式超现实把普通物体放到不普通的位置，用冷静、清楚、像广告一样的画法制造哲学谜题。`,
        en: `Magritte-like Surrealism places ordinary objects in unordinary situations, using calm clear almost advertising-like painting to create philosophical puzzles.`
      },
      memoryAnchor: {
        zh: `像一顶礼帽、一片天空和一句反常识的话，把现实轻轻拧错。`,
        en: `Like a bowler hat, a sky and one wrong sentence gently twisting reality.`
      },
      history: {
        zh: `勒内·马格利特是比利时超现实主义画家，1920 年代进入超现实主义语境。他早年做过广告和平面设计，这让他的画面常有清晰、冷静、可读的外观；但物体关系却不断质疑图像和现实的边界。`,
        en: `Rene Magritte was a Belgian Surrealist who entered the movement in the 1920s. His background in advertising and graphic work helped give his paintings a clear, calm and readable surface, while the relationships between objects question the boundary between image and reality.`
      },
      why: {
        zh: `他不靠激烈变形，而靠“熟悉物的错位”。越普通的苹果、窗、云、帽子，被放错语境后越像一个问题。`,
        en: `He does not rely on violent distortion but on misplaced familiar things. The more ordinary an apple, window, cloud or hat is, the more it becomes a question when placed in the wrong context.`
      },
      curatorNote: {
        zh: `看马格利特时先问：这张图哪一点“不该发生”？答案通常很安静，但会一直卡在脑子里。`,
        en: `Ask what in the image should not happen. The answer is often quiet, but it stays in the mind.`
      },
      lookFor: {
        zh: [`普通物体出现在错误语境`, `蓝天、云、窗、室内外关系反常`, `画法冷静清楚，不夸张`, `像一句视觉谜语而不是梦境爆炸`],
        en: [`Ordinary objects in wrong contexts`, `Blue sky, clouds, windows and inside/outside reversals`, `Calm clear painting without exaggeration`, `A visual riddle rather than a dream explosion`]
      },
      references: {
        zh: [`《The Treachery of Images》：图像和文字的关系`, `《The Human Condition》：窗、画布和现实边界`, `《The Son of Man》：遮挡、身份和普通物体的谜题`],
        en: [`The Treachery of Images: image and text`, `The Human Condition: window, canvas and reality`, `The Son of Man: concealment, identity and ordinary-object riddle`]
      },
      imagePrompts: {
        zh: `马格利特式观念超现实，普通物体被放在错误语境，蓝天白云，窗户与室内外错位，冷静写实画法，干净构图，视觉谜语感，原创场景，不复制苹果遮脸或具体作品`,
        en: `Magritte-like conceptual Surrealism, ordinary object placed in the wrong context, blue sky and white clouds, window and inside-outside paradox, calm realistic rendering, clean composition, visual riddle, original scene, not copying apple-over-face or any specific work`
      },
      negativePrompt: {
        zh: `避免复制礼帽苹果遮脸、直接使用具体作品构图、恐怖梦魇、过度达利式变形、廉价合成图`,
        en: `Avoid copying bowler-hat apple-face imagery, direct use of specific compositions, horror nightmare, excessive Dali-like distortion, cheap compositing`
      }
    },
    "edward-hopper": {
      summary: {
        zh: `霍普式光影用空旷街角、窗边人物、冷静建筑和强烈斜光，表现现代城市里的安静孤独。`,
        en: `Edward Hopper-like light uses empty corners, figures by windows, calm architecture and strong angled light to express quiet loneliness in modern life.`
      },
      memoryAnchor: {
        zh: `像深夜餐馆里只剩一盏灯，人在画面里，却像和世界隔着玻璃。`,
        en: `Like a late-night diner with one light left on: people are present, yet separated from the world by glass.`
      },
      history: {
        zh: `爱德华·霍普是 20 世纪美国现实主义画家，长期描绘纽约、旅馆、加油站、电影院和海边建筑。他生活在现代城市、汽车旅行和商业空间扩张的时代，用精简构图记录美国日常生活的疏离感。`,
        en: `Edward Hopper was a 20th-century American realist painter of New York, hotels, gas stations, cinemas and coastal architecture. In an age of modern cities, automobile travel and commercial spaces, he used pared-down composition to record everyday American alienation.`
      },
      why: {
        zh: `他的画安静，是因为叙事被故意压低。人物很少交流，建筑很硬，光线像舞台灯一样切开空间，让观众自己补全故事。`,
        en: `His paintings feel quiet because narrative is deliberately reduced. Figures rarely connect, architecture is hard-edged, and light cuts space like stage lighting, leaving viewers to complete the story.`
      },
      curatorNote: {
        zh: `看霍普时别只看孤独人物，重点看光怎么把人困在空间里。窗、门、柜台和街道都是心理边界。`,
        en: `Do not only look at lonely figures. Watch how light traps people in space. Windows, doors, counters and streets are psychological borders.`
      },
      lookFor: {
        zh: [`强烈斜射阳光或夜间人造光`, `空旷建筑、窗户、街角和室内边界`, `人物少、表情克制、互不交流`, `像电影剧照但故事暂停`],
        en: [`Strong angled sunlight or night artificial light`, `Empty architecture, windows, corners and interior edges`, `Few restrained figures with little interaction`, `Film-still feeling with the story paused`]
      },
      references: {
        zh: [`《Nighthawks》：看夜间商业空间和孤独`, `《Morning Sun》：看窗边人物与强光`, `美国城镇与公路题材：理解现代空间的疏离`],
        en: [`Nighthawks: night commercial space and loneliness`, `Morning Sun: figure by window and strong light`, `American town and road subjects: alienation in modern space`]
      },
      imagePrompts: {
        zh: `霍普式美国现实主义光影，空旷街角或夜间餐馆，少量孤独人物，强斜光和深阴影，冷静建筑几何，电影剧照构图，安静疏离感，原创场景，不复制 Nighthawks 或具体作品`,
        en: `Edward Hopper-like American realist lighting, empty street corner or night diner, few isolated figures, strong angled light and deep shadow, calm architectural geometry, cinematic still composition, quiet alienation, original scene, not copying Nighthawks or any specific work`
      },
      negativePrompt: {
        zh: `避免直接复刻夜鹰构图、过度黑色电影、夸张表情、赛博霓虹、低质照片滤镜`,
        en: `Avoid directly copying Nighthawks composition, excessive noir styling, exaggerated expressions, cyber neon, low-quality photo filters`
      }
    },
    "gustav-klimt": {
      summary: {
        zh: `克里姆特式金色装饰把人物、金箔、马赛克图案和象征性纹样融成华丽而神秘的平面装饰。`,
        en: `Klimt-like golden ornament fuses figures, gold leaf, mosaic patterns and symbolic motifs into a luxurious, mysterious decorative surface.`
      },
      memoryAnchor: {
        zh: `像一个人被金色马赛克和花纹包裹，身体几乎变成圣像。`,
        en: `Like a person wrapped in golden mosaic and pattern until the body almost becomes an icon.`
      },
      history: {
        zh: `古斯塔夫·克里姆特是维也纳分离派核心人物，活跃于 19 世纪末到 20 世纪初的奥地利。他吸收拜占庭马赛克、象征主义、装饰艺术和维也纳现代生活，将肖像变成金色、图案化、充满心理暗示的视觉世界。`,
        en: `Gustav Klimt was central to the Vienna Secession in late-19th- and early-20th-century Austria. He absorbed Byzantine mosaics, Symbolism, decorative art and modern Viennese culture, turning portraits into golden, patterned and psychologically charged worlds.`
      },
      why: {
        zh: `他这样画，是把人物的肉身和装饰的平面拉到一起：脸和手保留真实感，衣服和背景则化成金色符号，形成现实与梦境的交界。`,
        en: `He brings bodily presence and flat ornament together: faces and hands remain realistic while clothing and background dissolve into golden signs, creating a border between reality and dream.`
      },
      curatorNote: {
        zh: `看克里姆特时先找金色，再看金色里藏了多少小图案。人物不是站在背景前，而是被图案世界吞进去。`,
        en: `Look for gold first, then count how many small patterns live inside it. The figure is not simply in front of a background; it is absorbed by a patterned world.`
      },
      lookFor: {
        zh: [`金箔、马赛克和宝石般质感`, `人物脸手相对写实，衣服背景高度图案化`, `圆形、眼形、花卉、螺旋等符号`, `华丽、亲密、带一点神秘和仪式感`],
        en: [`Gold leaf, mosaic and jewel-like surfaces`, `Realistic face/hands with patterned clothing/background`, `Circles, eyes, flowers, spirals and symbols`, `Luxurious, intimate, mysterious and ritual-like`]
      },
      references: {
        zh: [`《The Kiss》：看人物和金色装饰的融合`, `阿黛尔·布洛赫-鲍尔肖像：看肖像与图案身份`, `维也纳分离派：理解装饰和现代性的关系`],
        en: [`The Kiss: figure fused with gold ornament`, `Adele Bloch-Bauer portrait: portrait identity and pattern`, `Vienna Secession: ornament and modernity`]
      },
      imagePrompts: {
        zh: `克里姆特式金色装饰视觉语言，优雅原创人物肖像，金箔质感，马赛克几何纹样，花卉与螺旋符号，脸部写实衣服平面装饰化，华丽神秘，高清，不复制具体作品或人物姿态`,
        en: `Klimt-like golden decorative visual language, elegant original portrait, gold leaf texture, mosaic geometric patterns, floral and spiral symbols, realistic face with flat ornamental clothing, luxurious mysterious mood, high resolution, not copying a specific work or pose`
      },
      negativePrompt: {
        zh: `避免直接复制《吻》姿势、廉价金粉滤镜、过度性感化、低质马赛克贴图、真实作品截图`,
        en: `Avoid directly copying The Kiss pose, cheap gold glitter filters, oversexualization, low-quality mosaic textures, screenshots of real artworks`
      }
    },
    "chinese-ink-painting": {
      summary: {
        zh: `中国水墨画用墨色浓淡、笔法速度和留白组织山水、花鸟与人物，重在气韵和意境，不只是黑白画。`,
        en: `Chinese ink painting uses ink tones, brush speed and empty space to organize landscapes, birds, flowers and figures, valuing spirit and atmosphere rather than simply black-and-white depiction.`
      },
      memoryAnchor: {
        zh: `像一口气落在宣纸上，没画的空白也在说话。`,
        en: `Like one breath landing on rice paper, where the unpainted space also speaks.`
      },
      history: {
        zh: `水墨传统在中国书法、文人画、山水画和禅意审美中长期发展，宋元以后形成强大的笔墨体系。它的视觉来源包括毛笔、墨、宣纸、卷轴观看方式、诗书画印结合，以及对自然与心境关系的理解。`,
        en: `Ink painting developed through Chinese calligraphy, literati painting, landscape painting and Chan-related aesthetics, with a powerful brush-and-ink system after the Song and Yuan periods. Its sources include brush, ink, paper, scroll viewing, poetry-calligraphy-painting-seal integration and the relation between nature and mind.`
      },
      why: {
        zh: `它不追求把对象涂满，而是用一笔的轻重、干湿、快慢暗示形体和气息。留白不是没完成，而是给云、水、风和想象留下位置。`,
        en: `It does not try to fill the object. Weight, dryness, wetness and speed of a stroke suggest form and breath. Empty space is not unfinished; it holds cloud, water, wind and imagination.`
      },
      curatorNote: {
        zh: `看水墨先看笔，再看空。好的水墨不是细节多，而是每一笔有方向，每一块空白有用。`,
        en: `Read the brush first, then the emptiness. Good ink painting is not about more detail; each stroke has direction and each blank area has purpose.`
      },
      lookFor: {
        zh: [`墨分浓淡干湿`, `毛笔线条有速度和压力`, `大量留白承载云水空气`, `诗、书、画、印可能共同出现`],
        en: [`Ink shifts between dark, pale, dry and wet`, `Brush lines show speed and pressure`, `Large empty spaces carry cloud, water and air`, `Poetry, calligraphy, painting and seal may appear together`]
      },
      references: {
        zh: [`宋代山水：看空间层次和气势`, `元明文人画：看笔墨和心境`, `齐白石花鸟：看简练笔法和生活趣味`],
        en: [`Song landscape painting: space and grandeur`, `Yuan-Ming literati painting: brushwork and mind`, `Qi Baishi flowers and animals: concise brush and everyday vitality`]
      },
      imagePrompts: {
        zh: `中国水墨画视觉语言，宣纸肌理，毛笔浓淡干湿变化，大量留白，山水或花鸟主题，诗意构图，黑白灰加少量淡彩，气韵生动，原创画面，不复制具体古画`,
        en: `Chinese ink painting visual language, rice-paper texture, brush ink shifting dry wet dark pale, generous empty space, landscape or birds-and-flowers subject, poetic composition, black white grey with slight pale color, living spirit, original image, not copying a specific historical painting`
      },
      negativePrompt: {
        zh: `避免西式油画明暗、AI 假书法乱码、过满构图、廉价国风贴纸、直接复制古画或名家作品`,
        en: `Avoid Western oil-paint lighting, AI gibberish calligraphy, overfilled composition, cheap Chinese-style stickers, direct copy of ancient or master works`
      }
    },
    "dunhuang-mural": {
      summary: {
        zh: `敦煌壁画风格把佛教叙事、飞天、矿物色、线描和丝路文化融合在洞窟墙面上，庄严又充满流动感。`,
        en: `Dunhuang mural style fuses Buddhist narrative, flying apsaras, mineral color, line drawing and Silk Road culture on cave walls, solemn yet full of movement.`
      },
      memoryAnchor: {
        zh: `像一阵带着矿物色的风，从洞窟墙上吹出飞天衣带。`,
        en: `Like a mineral-colored wind blowing flying ribbons out of a cave wall.`
      },
      history: {
        zh: `敦煌莫高窟位于甘肃敦煌，是丝绸之路上的佛教艺术宝库，洞窟营建和绘制跨越多个朝代。壁画吸收中原、印度、中亚和地方工匠传统，内容包括佛传、本生故事、供养人、飞天、藻井和装饰纹样。`,
        en: `The Mogao Caves near Dunhuang, Gansu are a major Buddhist art site on the Silk Road, built and painted across many dynasties. The murals absorb Chinese, Indian, Central Asian and local craft traditions, showing Buddhist stories, donors, apsaras, ceiling patterns and ornament.`
      },
      why: {
        zh: `它的画面要服务礼拜、叙事和洞窟空间，所以人物庄严，衣带和云气流动，颜色来自矿物颜料的厚重与耐久。`,
        en: `The images served devotion, storytelling and cave space, so figures are solemn, ribbons and clouds flow, and mineral pigments give weight and durability.`
      },
      curatorNote: {
        zh: `看敦煌风格时，不要只看飞天。看人物姿态、衣纹、矿物色和墙面时间感如何一起形成神圣空间。`,
        en: `Do not look only for apsaras. See how posture, drapery lines, mineral color and aged wall texture create sacred space together.`
      },
      lookFor: {
        zh: [`赭红、石绿、青金、土黄等矿物色`, `飞天、飘带、云气和莲花纹`, `线描清楚，人物姿态庄严`, `壁画剥落、洞窟墙面和装饰边框感`],
        en: [`Mineral reds, greens, lapis blues and earth yellows`, `Apsaras, ribbons, clouds and lotus ornament`, `Clear line drawing and solemn figures`, `Aged mural wall, cave surface and decorative borders`]
      },
      references: {
        zh: [`莫高窟飞天壁画：看衣带和动态`, `藻井与边饰图案：看空间装饰系统`, `供养人和佛教故事画：看叙事和时代服饰`],
        en: [`Mogao apsara murals: ribbons and motion`, `Ceiling and border ornaments: spatial decoration system`, `Donor figures and Buddhist narratives: storytelling and costume history`]
      },
      imagePrompts: {
        zh: `敦煌壁画视觉语言，矿物颜料质感，赭红石绿青金配色，飞天飘带和莲花纹，洞窟墙面斑驳肌理，佛教叙事氛围，庄严流动，原创壁画式插画，不复制具体洞窟壁画`,
        en: `Dunhuang mural visual language, mineral pigment texture, ochre red malachite green lapis blue palette, flying apsara ribbons and lotus patterns, aged cave-wall surface, Buddhist narrative atmosphere, solemn flowing original mural-style illustration, not copying a specific cave mural`
      },
      negativePrompt: {
        zh: `避免现代仙侠网游风、廉价金光、随意宗教符号混搭、AI 伪梵文乱码、直接复制莫高窟具体壁画`,
        en: `Avoid modern fantasy-game styling, cheap golden glow, random religious symbol mixing, AI pseudo-Sanskrit gibberish, direct copy of a specific Mogao mural`
      }
    },
    "ukiyo-e": {
      summary: {
        zh: `浮世绘用木版平涂色、清晰轮廓、强构图和日常题材描绘江户时代的城市娱乐、风景、美人和役者。`,
        en: `Ukiyo-e uses woodblock flat color, clear contours, bold composition and everyday subjects to depict Edo-period urban entertainment, landscapes, beauties and actors.`
      },
      memoryAnchor: {
        zh: `像一阵海浪被木版刻进纸里：平、准、有节奏。`,
        en: `Like a wave carved into paper by woodblock: flat, precise and rhythmic.`
      },
      history: {
        zh: `浮世绘兴盛于日本江户时代，依托城市消费、木版印刷和出版业发展。它描绘“浮世”中的游乐、歌舞伎、名所风景和日常生活，后来影响了欧洲印象派、后印象派和新艺术等视觉语言。`,
        en: `Ukiyo-e flourished in Japan's Edo period through urban consumption, woodblock printing and publishing. It depicted the floating world of entertainment, kabuki, famous places and daily life, later influencing Impressionism, Post-Impressionism and Art Nouveau in Europe.`
      },
      why: {
        zh: `它的平涂和强轮廓来自木版印刷工艺：画师、刻工、摺师共同完成图像。清晰色块和大胆裁切让画面即使批量印刷也很有力量。`,
        en: `Its flat color and strong contour come from woodblock production, with designer, carver and printer working together. Clear color fields and bold cropping make the image powerful even as a printed edition.`
      },
      curatorNote: {
        zh: `看浮世绘先看边线和色块，再看构图裁切。它常把浪、桥、山、人物像图形一样安排，而不是按西方透视填满空间。`,
        en: `Read contour and color fields first, then cropping. Waves, bridges, mountains and figures are arranged graphically rather than filling space through Western perspective.`
      },
      lookFor: {
        zh: [`木版平涂色和清晰黑线`, `大胆裁切、斜向构图或大面积色块`, `浪、富士山、桥、歌舞伎人物、美人等题材`, `纸张颗粒和套色印刷感`],
        en: [`Woodblock flat color and clear black contour`, `Bold cropping, diagonals or large color fields`, `Waves, Fuji, bridges, kabuki actors, beauties and daily subjects`, `Paper grain and registration-print feel`]
      },
      references: {
        zh: [`葛饰北斋《神奈川冲浪里》：看浪形和富士山构图`, `歌川广重名所绘：看天气、桥和城市风景`, `喜多川歌麿美人画：看线条与人物姿态`],
        en: [`Hokusai's Great Wave: wave shape and Fuji composition`, `Hiroshige landscapes: weather, bridges and urban views`, `Utamaro beauties: line and figure posture`]
      },
      imagePrompts: {
        zh: `浮世绘木版画风格原创海报，平涂色块，清晰黑色轮廓，靛蓝米白朱红配色，大胆裁切，海浪或桥与远山，纸张纹理，套色印刷感，不复制神奈川冲浪里或具体作品`,
        en: `Ukiyo-e woodblock-style original poster, flat color fields, clear black contour, indigo cream vermilion palette, bold cropping, wave or bridge with distant mountain, paper texture, registration print feel, not copying The Great Wave or a specific work`
      },
      negativePrompt: {
        zh: `避免现代动漫脸、照片写实、复杂渐变、随机汉字乱码、直接复制北斋或广重具体构图`,
        en: `Avoid modern anime faces, photorealism, complex gradients, random kanji gibberish, direct copy of a Hokusai or Hiroshige composition`
      }
    },
    "cinematic-anime": {
      summary: {
        zh: `日系动画电影光影用天空、城市、逆光、云层、玻璃反射和细腻色彩营造青春、距离和时间流动感。`,
        en: `Japanese animated film lighting uses sky, city, backlight, clouds, glass reflection and delicate color to create youth, distance and the feeling of time passing.`
      },
      memoryAnchor: {
        zh: `像傍晚车站外的一束逆光，把天空、城市和没说出口的情绪照亮。`,
        en: `Like a backlight outside an evening station illuminating sky, city and unspoken feeling.`
      },
      history: {
        zh: `这种视觉语言来自日本动画电影和电视动画长期发展的背景美术、摄影合成、色彩脚本和数字后期流程。它不等于某一位在世导演或工作室，而是一套更通用的电影级动画光影语法。`,
        en: `This language comes from Japanese animation's long development of background painting, compositing, color scripting and digital post-production. It is not one living director or studio, but a broader cinematic anime lighting vocabulary.`
      },
      why: {
        zh: `它常用天空和光表达情绪，因为动画里天气、云层、镜头光斑和城市细节可以被精确控制。人物情绪不必大喊，环境光就能替他们说话。`,
        en: `It often uses sky and light to carry emotion because animation can precisely control weather, clouds, lens glow and city detail. Characters do not need to shout; environmental light speaks for them.`
      },
      curatorNote: {
        zh: `看这一类画面，重点不是“像某导演”，而是天空层次、逆光轮廓、城市细节和青春情绪是否一起成立。`,
        en: `Do not judge it by whether it resembles a named director. Look for layered sky, backlit silhouettes, city detail and youthful emotion working together.`
      },
      lookFor: {
        zh: [`高层次天空、云、霞光或雨后空气`, `人物常是剪影或被逆光包住`, `城市、电车、窗户、反射和细节背景`, `色彩干净，情绪细腻，不靠夸张表情`],
        en: [`Layered sky, clouds, sunset or after-rain air`, `Figures as silhouettes or rim-lit forms`, `City, trains, windows, reflections and detailed backgrounds`, `Clean color and subtle emotion without exaggerated acting`]
      },
      references: {
        zh: [`日本动画背景美术：看天空和城市如何承担叙事`, `色彩脚本与摄影合成：理解光斑、景深和空气感`, `青春题材动画电影海报：学习人物与环境的距离感`],
        en: [`Japanese animation background art: sky and city as narrative`, `Color script and compositing: glow, depth and air`, `Youth animated film posters: emotional distance between figure and environment`]
      },
      imagePrompts: {
        zh: `电影级日系动画光影，原创城市青春场景，傍晚天空和层叠云，逆光人物剪影，电车站或街道玻璃反射，干净细腻色彩，空气透视，高清动画背景质感，不点名在世导演或具体工作室，不复制具体电影画面`,
        en: `Cinematic Japanese animation lighting, original urban youth scene, evening sky and layered clouds, backlit character silhouette, train station or street glass reflections, clean delicate color, atmospheric perspective, high-resolution animated background feel, no living director or specific studio named, not copying a film frame`
      },
      negativePrompt: {
        zh: `避免写成新海诚或任何在世导演/工作室风格，避免复制具体电影场景、角色校服设定、低质二次元脸、过度 HDR 和廉价镜头光斑`,
        en: `Avoid naming Makoto Shinkai or any living director/studio style, avoid copying specific film scenes, character uniforms, low-quality anime faces, excessive HDR and cheap lens flare`
      }
    },
    "childrens-picture-book": {
      summary: {
        zh: `儿童绘本风格用清楚的角色、温柔色彩、可读构图和故事性细节，让画面像一页能被孩子反复翻看的小剧场。`,
        en: `Children's picture book style uses clear characters, gentle color, readable composition and story details so the image feels like a small stage children can revisit.`
      },
      memoryAnchor: {
        zh: `像睡前故事翻到最暖的一页：简单，但每个角落都有小线索。`,
        en: `Like the warmest page of a bedtime story: simple, but every corner holds a clue.`
      },
      history: {
        zh: `绘本随着印刷、童书出版、教育观念和插画传统发展而成熟。20 世纪以来，莫里斯·桑达克、碧雅翠丝·波特、埃里克·卡尔等创作者让绘本既能讲故事，也能建立独立的视觉世界。`,
        en: `Picture books matured through printing, children's publishing, educational ideas and illustration traditions. Since the 20th century, creators such as Maurice Sendak, Beatrix Potter and Eric Carle showed that picture books can tell stories and build independent visual worlds.`
      },
      why: {
        zh: `它需要同时服务孩子和大人：孩子要一眼读懂角色和动作，大人要感到情绪和审美耐看。所以线条、色彩和细节都要温柔清楚。`,
        en: `It must serve children and adults at once: children need instantly readable characters and actions, while adults need emotional and visual richness. Line, color and detail must be gentle and clear.`
      },
      curatorNote: {
        zh: `看儿童绘本风格时，问它能不能讲一页故事：角色在做什么？下一秒会发生什么？背景有没有帮助孩子理解情绪？`,
        en: `Ask whether it can tell one page of story: what is the character doing, what might happen next, and does the background help a child read the emotion?`
      },
      lookFor: {
        zh: [`角色轮廓清楚，表情动作易读`, `柔和配色和手绘材质`, `背景有故事细节但不喧宾夺主`, `画面适合翻页节奏，温暖、有安全感`],
        en: [`Clear character silhouettes and readable expressions`, `Gentle palette and handmade texture`, `Background details support story without clutter`, `Page-turn rhythm, warmth and safety`]
      },
      references: {
        zh: [`莫里斯·桑达克：看想象力与儿童情绪`, `碧雅翠丝·波特：看动物角色和自然细节`, `埃里克·卡尔：看拼贴色块和低龄可读性`],
        en: [`Maurice Sendak: imagination and child emotion`, `Beatrix Potter: animal characters and natural detail`, `Eric Carle: collage color and early-child readability`]
      },
      imagePrompts: {
        zh: `儿童绘本风格原创插画，温柔手绘线条，柔和暖色，清楚可爱的原创角色，小动物或孩子在温暖室内/花园场景，故事性细节，纸张和水彩/彩铅质感，适合睡前故事，不复制具体绘本角色`,
        en: `Children's picture book original illustration, gentle hand-drawn lines, soft warm palette, clear lovable original character, animal or child in cozy interior or garden scene, story details, paper plus watercolor or colored-pencil texture, bedtime-story mood, not copying specific picture-book characters`
      },
      negativePrompt: {
        zh: `避免恐怖、成人化、过度写实、复杂脏乱背景、真实 IP 角色、模仿在世插画师完整可识别风格`,
        en: `Avoid horror, adult themes, over-realism, messy complex backgrounds, real IP characters, imitating a living illustrator's full recognizable style`
      }
    }
  };

  Object.entries(refinedStyles).forEach(([id, data]) => Object.assign(styles.find((style) => style.id === id), data));

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
      history: "风格源流",
      why: "形成原因",
      curator: "策展说明",
      exhibitImages: "展品图像",
      people: "代表人物",
      lookFor: "识别方法",
      references: "代表作品与案例",
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
      history: "Origins",
      why: "Why It Formed",
      curator: "Curator Note",
      exhibitImages: "Exhibit Images",
      people: "Representative Figures",
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
    lightbox: $("lightbox"),
    lightboxImage: $("lightboxImage"),
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
    const example = {
      title: `${style.name[lang]} ${store.lang === "zh" ? "原创示例" : "original example"}`,
      artist: "Style Atlas",
      image: style.image
    };
    addRecent(style.id);
    dom.detailContent.innerHTML = `
      <div class="detail-hero style-card">${renderCard(style, true)}</div>
      <section class="detail-section">
        <h2>${t("memory")}</h2>
        <p>${escapeHtml(style.memoryAnchor[lang])}</p>
      </section>
      <section class="detail-section">
        <h2>${t("curator")}</h2>
        <p>${escapeHtml(style.curatorNote[lang])}</p>
      </section>
      <section class="detail-section">
        <h2>${t("exhibitImages")}</h2>
        <div class="gallery-grid" id="galleryGrid">
          <figure class="gallery-item">
            <img src="${style.image}" alt="${escapeHtml(style.name[lang])}" loading="lazy" data-action="open-image">
            <figcaption>${escapeHtml(style.name[lang])}</figcaption>
          </figure>
        </div>
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
      ${example ? `
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
    loadWikiGallery(style);
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

  async function loadImage(src) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    await image.decode();
    return image;
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
      if (action === "open-image") {
        const img = event.target.closest("img");
        return openImage(img.currentSrc || img.src, img.alt);
      }
      if (action === "close-lightbox") return closeImage();
      if (action === "share-lightbox") return shareImage();
      if (action === "save-lightbox") return saveImage();
      if (action === "copy-prompt") {
        const style = activeStyle();
        return copyText(`${style.imagePrompts[store.lang]}\n\n${style.negativePrompt[store.lang]}`);
      }
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
