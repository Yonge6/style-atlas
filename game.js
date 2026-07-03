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
    const example = window.STYLE_EXAMPLES?.[style.id]?.curated ? window.STYLE_EXAMPLES[style.id] : null;
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
