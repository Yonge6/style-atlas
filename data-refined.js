(() => {
  "use strict";

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
    },
    matisse: {
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
    },
    curatorNote: {
      zh: `看马蒂斯式色块时，先看颜色是不是在“跳舞”，再看剪纸边缘和留白如何让画面呼吸。它的重点不是画得像，而是让颜色、形状和节奏变得轻快有生命。`,
      en: `When viewing Matisse-like color blocks, first see whether the colors dance, then watch how cut-paper edges and open space let the image breathe. The point is not likeness, but color, shape and rhythm becoming light and alive.`
    }
  },
  };

  function digitalStyle(nameEn, nameZh, anchorZh, anchorEn, traitsZh, traitsEn, sceneZh, sceneEn, avoidZh, avoidEn) {
    return {
      summary: {
        zh: `${nameZh}是一种面向 AI 生图、现代海报和数字品牌视觉的风格词，重点是${traitsZh.join("、")}，适合快速建立强烈时代感。`,
        en: `${nameEn} is a style keyword for AI image generation, modern posters and digital brand visuals, focused on ${traitsEn.join(", ")} to quickly create a strong era-specific mood.`
      },
      memoryAnchor: { zh: anchorZh, en: anchorEn },
      history: {
        zh: `${nameZh}主要来自互联网视觉文化、数字工具、游戏/影视界面、电子音乐封面和社交媒体传播。它不是传统艺术流派，更像一组可组合的视觉参数：材质、光效、色彩、界面语言和技术想象。`,
        en: `${nameEn} comes mainly from internet visual culture, digital tools, game and film interfaces, electronic music covers and social-media circulation. It is less a classical art movement than a set of combinable visual parameters: material, light, color, interface language and technological imagination.`
      },
      why: {
        zh: `它会形成这种样子，是因为数字媒介需要在很短时间里传达情绪和场景。${traitsZh[0]}负责第一眼吸引，${traitsZh[1]}建立材质记忆，${traitsZh[2]}把画面推向可用于海报或封面的完整视觉。`,
        en: `It looks this way because digital media must communicate mood and setting quickly. ${traitsEn[0]} catches the eye, ${traitsEn[1]} creates material memory, and ${traitsEn[2]} pushes the image toward a usable poster or cover.`
      },
      curatorNote: {
        zh: `使用 ${nameZh} 时，不要只堆滤镜。先确定应用场景：${sceneZh}；再控制色彩、材质和构图，让它像一张可以发布的现代视觉。`,
        en: `When using ${nameEn}, do not just stack filters. Start with the use case: ${sceneEn}; then control color, material and composition until it feels like a publishable modern visual.`
      },
      lookFor: {
        zh: [`第一眼看到${traitsZh[0]}`, `材质或光效呈现${traitsZh[1]}`, `构图适合${sceneZh}`, `不是随机滤镜，而是有明确主题和视觉层级`],
        en: [`First notice ${traitsEn[0]}`, `Material or lighting shows ${traitsEn[1]}`, `Composition works for ${sceneEn}`, `Not a random filter, but a clear subject and hierarchy`]
      },
      references: {
        zh: [`电子音乐封面、游戏 UI、科技发布海报和社媒视觉是主要参考入口`, `观察同类风格如何处理字体、背景和材质，不要照搬具体品牌或艺术家`, `用一个现代主题重做封面/海报，比复刻某张图更有价值`],
        en: [`Electronic music covers, game UI, tech launch posters and social visuals are useful references`, `Study how related visuals handle type, background and material without copying a brand or artist`, `Rebuild a cover or poster for a modern subject rather than replicating a specific image`]
      },
      imagePrompts: {
        zh: `${nameZh}现代海报，${traitsZh.join("，")}，${sceneZh}，清晰主体，强视觉层级，高级数字质感，适合 AI 生图和品牌视觉，原创构图，不复制具体艺术家、工作室、品牌或影视作品`,
        en: `${nameEn} modern poster, ${traitsEn.join(", ")}, ${sceneEn}, clear subject, strong visual hierarchy, premium digital texture, suitable for AI image generation and brand visuals, original composition, not copying a specific artist, studio, brand or film`
      },
      negativePrompt: {
        zh: `避免${avoidZh}、低清晰度文字、廉价滤镜、素材堆砌、真实商标、在世艺术家或当代工作室完整可识别风格`,
        en: `Avoid ${avoidEn}, low-quality text, cheap filters, asset clutter, real trademarks, or the full recognizable style of a living artist or contemporary studio`
      }
    };
  }

  Object.assign(refinedStyles, {
    cyberpunk: digitalStyle("Cyberpunk", "赛博朋克", "像雨夜未来城市里一块霓虹广告牌，漂亮但危险。", "Like a neon sign in a rainy future city: beautiful but dangerous.", ["霓虹高对比", "湿冷金属与玻璃", "未来城市压迫感"], ["neon contrast", "wet metal and glass", "future-city pressure"], "科技海报、游戏封面、夜间城市概念图", "tech posters, game covers and night-city concept art", "只剩紫蓝霓虹没有叙事", "purple-blue neon without narrative"),
    vaporwave: digitalStyle("Vaporwave", "蒸汽波", "像一台老电脑在粉紫色商场梦里循环播放。", "Like an old computer looping inside a pink-purple mall dream.", ["粉紫渐变", "复古电脑与雕塑符号", "故障怀旧"], ["pink-purple gradients", "retro computer and statue symbols", "glitched nostalgia"], "音乐封面、复古社媒图、怀旧品牌视觉", "music covers, retro social graphics and nostalgic brand visuals", "随机罗马柱和日文乱码", "random columns and fake Japanese text"),
    synthwave: digitalStyle("Synthwave", "合成波", "像霓虹网格公路一直开向紫色日落。", "Like a neon grid road driving forever into a purple sunset.", ["霓虹网格", "80 年代合成器色彩", "复古未来日落"], ["neon grids", "80s synth color", "retro-future sunset"], "音乐海报、赛车/游戏封面、夜间活动视觉", "music posters, racing/game covers and night-event visuals", "过度俗套棕榈树模板", "overused palm-tree templates"),
    y2k: digitalStyle("Y2K", "千禧风格", "像 2000 年网页按钮、银色随身听和果冻塑料一起发光。", "Like a 2000s web button, silver player and jelly plastic glowing together.", ["银色铬感", "果冻塑料与气泡", "早期互联网乐观"], ["silver chrome", "jelly plastic and bubbles", "early-internet optimism"], "潮流海报、美妆包装、社媒封面", "fashion posters, beauty packaging and social covers", "低质网页截图和真实品牌复刻", "low-quality web screenshots and real brand copies"),
    retrofuturism: digitalStyle("Retrofuturism", "复古未来主义", "像上世纪的人画了一张明天的太空旅行广告。", "Like someone from the last century drawing tomorrow's space-travel ad.", ["太空时代造型", "复古印刷色", "乐观科技想象"], ["space-age forms", "vintage print color", "optimistic technology"], "展览海报、科幻封面、产品概念图", "exhibition posters, sci-fi covers and product concepts", "直接复制老电影海报", "copying old film posters"),
    solarpunk: digitalStyle("Solarpunk", "太阳朋克", "像植物、太阳能板和玻璃温室一起长成未来城市。", "Like plants, solar panels and glass greenhouses growing into a future city.", ["绿色生态", "温暖阳光科技", "可持续城市"], ["green ecology", "warm solar technology", "sustainable city"], "环保品牌、城市愿景海报、科技公益视觉", "eco brands, city-vision posters and public-interest tech visuals", "空泛绿色滤镜和假环保标语", "empty green filters and fake eco slogans"),
    afrofuturism: digitalStyle("Afrofuturism", "非洲未来主义", "像非洲纹样、宇宙想象和未来科技在同一件战袍上发光。", "Like African pattern, cosmic imagination and future technology glowing on one ceremonial suit.", ["非洲 Diaspora 文化线索", "未来科技材质", "宇宙叙事"], ["African diaspora cues", "future-tech material", "cosmic narrative"], "音乐视觉、文化活动海报、科幻角色概念", "music visuals, cultural event posters and sci-fi character concepts", "泛化部落符号和文化混用", "generic tribal symbols and cultural mixing"),
    steampunk: digitalStyle("Steampunk", "蒸汽朋克", "像维多利亚时代的黄铜机器提前发明了未来。", "Like a Victorian brass machine inventing the future early.", ["黄铜齿轮", "蒸汽机械", "复古工业幻想"], ["brass gears", "steam machinery", "retro industrial fantasy"], "游戏设定、展会海报、机械产品概念", "game concepts, event posters and mechanical product concepts", "齿轮乱贴和脏污过度", "random gear stickers and excessive grime"),
    "glitch-art": digitalStyle("Glitch Art", "故障艺术", "像屏幕信号坏掉的一瞬间，错误反而变成图案。", "Like a broken screen signal turning error into pattern.", ["信号错位", "像素撕裂", "数据噪声"], ["signal displacement", "pixel tearing", "data noise"], "电子音乐封面、潮流海报、实验视觉", "electronic music covers, fashion posters and experimental visuals", "不可读主体和纯噪声", "unreadable subject and pure noise"),
    "pixel-art": digitalStyle("Pixel Art", "像素艺术", "像游戏卡带里的一格小世界，每个方块都有位置。", "Like a tiny world inside a game cartridge, every block placed deliberately.", ["低分辨率像素", "网格角色或场景", "复古游戏感"], ["low-resolution pixels", "grid-based characters or scenes", "retro game mood"], "游戏封面、图标、复古社媒图", "game covers, icons and retro social graphics", "自动马赛克照片和模糊像素", "auto-mosaic photos and blurry pixels"),
    "voxel-art": digitalStyle("Voxel Art", "体素风格", "像把 3D 世界切成一块块发光积木。", "Like cutting a 3D world into glowing building blocks.", ["立方体体素", "等距三维", "玩具感场景"], ["cube voxels", "isometric 3D", "toy-like scenes"], "游戏场景、地图视觉、品牌吉祥物世界", "game scenes, map visuals and mascot worlds", "杂乱方块堆积", "messy cube piles"),
    "low-poly": digitalStyle("Low Poly", "低多边形", "像用三角切面雕出一个轻量级 3D 世界。", "Like sculpting a lightweight 3D world from triangular facets.", ["三角切面", "简化三维造型", "低面数光影"], ["triangular facets", "simplified 3D forms", "low-poly lighting"], "科技插画、游戏概念、产品背景", "tech illustration, game concepts and product backgrounds", "随机三角滤镜和粗糙建模", "random triangle filters and rough modeling"),
    glassmorphism: digitalStyle("Glassmorphism", "玻璃拟态", "像磨砂玻璃卡片漂浮在柔和渐变界面上。", "Like frosted glass cards floating over a soft gradient interface.", ["半透明玻璃", "背景模糊", "轻量界面层级"], ["translucent glass", "background blur", "light UI layering"], "App 宣传图、SaaS 海报、界面概念", "app promos, SaaS posters and UI concepts", "对比不足和不可读文字", "low contrast and unreadable text"),
    neumorphism: digitalStyle("Neumorphism", "新拟物风格", "像按钮从浅色界面里轻轻鼓起来。", "Like a button softly swelling out of a pale interface.", ["柔和凸起", "内外阴影", "低对比浅色界面"], ["soft embossing", "inner and outer shadows", "low-contrast pale UI"], "App 概念、控制面板、产品展示", "app concepts, control panels and product displays", "可访问性差的低对比", "inaccessible low contrast"),
    claymorphism: digitalStyle("Claymorphism", "黏土风格", "像一组圆润软糖做成的 3D 图标世界。", "Like a world of rounded candy-soft 3D icons.", ["软 3D 形体", "圆润黏土材质", "明亮友好色"], ["soft 3D forms", "rounded clay material", "bright friendly color"], "品牌插画、App 空状态、教育产品视觉", "brand illustration, app empty states and education product visuals", "儿童化过度和塑料廉价感", "over-childishness and cheap plastic feel"),
    holographic: digitalStyle("Holographic", "镭射全息风格", "像光在一张透明膜上折出彩虹。", "Like light folding a rainbow across a transparent film.", ["虹彩渐变", "透明膜材质", "高光折射"], ["iridescent gradient", "transparent film material", "refracted highlights"], "美妆包装、音乐海报、科技发布视觉", "beauty packaging, music posters and tech launch visuals", "廉价彩虹渐变和过曝高光", "cheap rainbow gradients and blown highlights"),
    "liquid-metal": digitalStyle("Liquid Metal", "液态金属风格", "像银色水银在黑色空间里缓慢变形。", "Like silver mercury slowly reshaping in black space.", ["流体金属", "高反射铬面", "暗场高级感"], ["fluid metal", "reflective chrome surface", "dark premium space"], "奢侈科技海报、产品 KV、音乐视觉", "luxury tech posters, product key visuals and music visuals", "脏灰金属和过度终结者感", "muddy metal and excessive Terminator-like mood"),
    "3d-abstract-cgi": digitalStyle("3D Abstract CGI", "三维抽象", "像材质、光和形体在无重力空间里做实验。", "Like material, light and form experimenting in zero gravity.", ["抽象三维形体", "高级材质渲染", "摄影棚光效"], ["abstract 3D forms", "premium material rendering", "studio lighting"], "品牌 KV、展览主视觉、科技海报", "brand key visuals, exhibition identity and tech posters", "无主题材质球堆砌", "theme-less material sphere piles"),
    "fractal-art": digitalStyle("Fractal Art", "分形艺术", "像一个图案不断长出更小的自己。", "Like a pattern endlessly growing smaller versions of itself.", ["递归结构", "数学纹样", "无限细节"], ["recursive structure", "mathematical pattern", "infinite detail"], "音乐视觉、沉浸展览、抽象海报", "music visuals, immersive exhibitions and abstract posters", "眩晕噪点和无层级复杂度", "dizzy noise and hierarchy-free complexity"),
    "generative-ai-dreamlike": digitalStyle("Generative AI Dreamlike", "AI 梦境风格", "像梦把几个不相干的世界轻轻缝在一起。", "Like a dream gently stitching unrelated worlds together.", ["梦境混合", "柔和超现实", "生成式细节"], ["dreamlike blending", "soft surrealism", "generative detail"], "AI 概念图、专辑封面、幻想品牌视觉", "AI concept art, album covers and fantasy brand visuals", "随机拼贴、恐怖畸形和不可控手脸", "random collage, horror deformities and uncontrolled hands/faces")
  });

  window.STYLE_ATLAS_DATA = Object.assign(window.STYLE_ATLAS_DATA || {}, { refinedStyles });
})();
