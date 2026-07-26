(() => {
  "use strict";

  const categories = [
    ["poster", "经典海报与平面设计风格", "Classic poster and graphic design"],
    ["painting", "经典西方绘画流派", "Classic Western painting"],
    ["master", "经典艺术大师式视觉语言", "Master visual languages"],
    ["modern", "现代艺术与观念风格", "Modern art and concepts"],
    ["asian", "东方与亚洲经典视觉风格", "Eastern and Asian classics"],
    ["folk", "民族、地域与民俗视觉风格", "Regional and folk visuals"],
    ["animation", "动画、漫画与影视视觉风格", "Animation, comics and film"],
    ["illustration", "插画、出版与商业绘本风格", "Illustration and publishing"],
    ["digital", "数字时代视觉风格", "Digital era visual styles"]
  ];

  const categoryAliases = {
    poster: ["高级海报", "科技品牌", "网格排版", "发布会", "品牌视觉", "premium poster", "tech brand", "grid layout", "brand launch"],
    painting: ["油画", "艺术感", "古典", "光影", "画布质感", "oil painting", "classical", "painterly", "dramatic light"],
    master: ["大师", "艺术家", "强风格", "名画感", "artist style", "master style", "iconic art"],
    modern: ["实验", "观念", "抽象", "情绪", "展览", "experimental", "conceptual", "abstract", "emotional"],
    asian: ["东方", "国风", "水墨", "日式", "传统", "Eastern", "Asian", "ink", "traditional"],
    folk: ["民俗", "节庆", "地域", "手工", "文旅", "folk", "festival", "regional", "handmade"],
    animation: ["动画", "漫画", "角色", "短视频封面", "anime", "animation", "comic", "character"],
    illustration: ["插画", "绘本", "商业插画", "儿童", "说明图", "illustration", "picture book", "editorial", "explainer"],
    digital: ["AI生图", "科技感", "未来", "界面", "海报", "霓虹", "三维", "digital", "ai image", "future", "tech", "poster", "interface", "3d"]
  };

  const styleAliases = {
    "swiss-style": ["高级海报", "科技感", "理性设计", "网格排版", "premium poster", "tech brand", "rational design"],
    "art-deco": ["复古奢华", "黄金时代", "高级酒店", "电影海报", "luxury retro", "golden age"],
    "ukiyo-e": ["浮世绘", "海浪", "东方版画", "日式复古", "Japanese woodblock", "wave"],
    "cinematic-anime": ["日式动画天空", "城市黄昏", "青春电影", "anime sky", "cinematic anime light"],
    cyberpunk: ["赛博朋克", "霓虹", "未来城市", "科技感", "neon city", "future tech"],
    vaporwave: ["蒸汽波", "粉紫", "复古电脑", "故障怀旧", "pastel retro", "mallsoft"],
    synthwave: ["合成波", "霓虹网格", "日落", "80年代未来", "neon grid", "retro synth"],
    y2k: ["千禧", "银色塑料", "果冻按钮", "数码复古", "chrome plastic", "early internet"],
    retrofuturism: ["复古未来", "老科幻", "太空时代", "未来怀旧", "space age", "vintage future"],
    solarpunk: ["太阳朋克", "绿色未来", "生态科技", "可持续城市", "green future", "eco tech"],
    afrofuturism: ["非洲未来主义", "非洲纹样", "未来科技", "diaspora future", "African future"],
    steampunk: ["蒸汽朋克", "黄铜齿轮", "维多利亚机械", "retro machine", "brass gear"],
    "glitch-art": ["故障艺术", "像素错位", "信号错误", "数据噪声", "datamosh", "signal error"],
    "pixel-art": ["像素艺术", "8bit", "游戏", "低分辨率", "retro game", "sprite"],
    "voxel-art": ["体素", "方块三维", "立方体世界", "blocky 3d", "voxel"],
    "low-poly": ["低多边形", "三角面", "游戏美术", "polygon", "faceted 3d"],
    glassmorphism: ["玻璃拟态", "磨砂玻璃", "半透明界面", "frosted glass", "blurred ui"],
    neumorphism: ["新拟物", "柔软凸起", "浅色界面", "soft ui", "embossed"],
    claymorphism: ["黏土风格", "软3D", "圆润角色", "soft 3d", "clay"],
    holographic: ["镭射", "全息", "虹彩", "iridescent", "hologram"],
    "liquid-metal": ["液态金属", "银色流体", "铬金属", "chrome liquid", "molten metal"],
    "3d-abstract-cgi": ["三维抽象", "CGI", "抽象材质", "3d abstract", "render"],
    "fractal-art": ["分形", "递归图案", "数学视觉", "recursive pattern", "algorithmic"],
    "generative-ai-dreamlike": ["AI梦境", "梦幻生成", "超现实混合", "dreamlike ai", "surreal generative"]
  };

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
    },
    digital: {
      zh: "面向 AI 生图、现代海报、品牌视觉和数字界面的视觉词库，强调材质、光效、技术感和时代情绪。",
      en: "A vocabulary for AI images, modern posters, brand visuals and digital interfaces, focused on materials, light, technology and era-specific moods.",
      featuresZh: ["数字质感", "光效材质", "未来情绪", "生成友好", "现代海报"],
      featuresEn: ["Digital texture", "Light and material", "Future mood", "Generation-friendly", "Modern poster"],
      usesZh: ["AI 生图", "科技海报", "品牌视觉", "社媒封面", "UI 概念"],
      usesEn: ["AI images", "Tech posters", "Brand visuals", "Social covers", "UI concepts"]
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
    illustration: ["出版、商业传播和说明图像史", "publishing, commercial communication and explanatory image history"],
    digital: ["互联网文化、数字设计工具和 AI 生图语境", "internet culture, digital design tools and AI image-generation contexts"]
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

  window.STYLE_ATLAS_DATA = Object.assign(window.STYLE_ATLAS_DATA || {}, {
    categories,
    categoryAliases,
    styleAliases,
    categoryCopy,
    palettes,
    peopleByStyle,
    categoryHistory,
    riskByStyle
  });
})();
