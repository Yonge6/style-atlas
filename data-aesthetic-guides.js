(() => {
  "use strict";

  const bi = (zh, en) => ({ zh, en });
  const observe = (key, zhLabel, enLabel, zhText, enText) => ({
    key,
    label: bi(zhLabel, enLabel),
    text: bi(zhText, enText)
  });

  const addIllustrationGuides = () => Object.assign(window.STYLE_AESTHETIC_GUIDES, {
    "ligne-claire": fullGuide(
      ["先看轮廓：每件物体是否都像被同样清楚的线条单独说出来？", "Begin with the outlines: does every object seem separately spoken by the same clear line?"],
      [
        ["line", "先看均匀轮廓", "Begin with even contours", "人物、建筑和物件都由稳定线宽界定，很少用浓重排线制造体积。", "Figures, buildings and objects are bounded by stable line weight, with little heavy hatching for volume."],
        ["space", "再看清楚空间", "Then, read the clear space", "前景与远景都保留可辨细节，透视严谨，却不会被空气感模糊。", "Foreground and distance retain legible detail; perspective is precise without atmospheric blur."],
        ["color", "最后看平涂色块", "Finally, notice flat color", "颜色被轮廓分开，以有限明度层次帮助辨认，而不是覆盖线条。", "Color is separated by contours and uses limited value steps to aid recognition rather than cover the drawing."]
      ],
      [[5, "线条与空间秩序严谨", "Rigorous line and spatial order"], [3, "平涂色彩清楚", "Clear flat color"], [2, "装饰服从叙事", "Ornament serves narrative"], [2, "情绪克制明快", "Restrained, bright emotion"]],
      [["清楚", "轻快", "精确", "开放"], ["Clear", "Light", "Precise", "Open"]],
      [
        ["家居", "Home", "观察开放搁架和透明收纳如何让每件物品都有边界与位置。", "Notice how open shelves and transparent storage give every object a boundary and place."],
        ["穿搭", "Clothing", "用干净外轮廓、两三块纯色和少量细节建立清晰形象。", "Use a clean silhouette, two or three flat colors and few details to build a legible look."],
        ["摄影", "Photography", "选择空气清楚的日光，让前后景都可读，并避免过度虚化。", "Choose clear daylight so foreground and background remain readable, avoiding excessive blur."],
        ["日常物件", "Everyday objects", "看地图、装配图和交通插画如何用一致线宽区分复杂信息。", "See how maps, assembly diagrams and transit illustrations separate complex information with consistent line weight."]
      ],
      [
        ["american-comic-book", "都用轮廓、分格、文字与连续图像讲故事。", "Both tell stories with contours, panels, lettering and sequential images.", "清线漫画保持均匀线宽、开放空间和平涂色；美式漫画更常用粗细墨线、强阴影与戏剧冲击。", "Ligne claire keeps even line, open space and flat color; American comics more often use varied inks, deep shadow and dramatic impact."],
        ["flat-illustration", "都依靠清楚边界和平面色块快速传递信息。", "Both rely on clear boundaries and flat color for rapid communication.", "清线漫画保留具象空间、透视和连续叙事；扁平插画常压缩空间并以图形概括概念。", "Ligne claire preserves representational space, perspective and sequence; flat illustration often compresses space into conceptual shapes."]
      ],
      ["哪一条轮廓让复杂场景突然变得容易阅读？", "Which contour suddenly makes the complex scene easy to read?"]
    ),

    "graphic-novel": fullGuide(
      ["翻页之前，哪一个画面正在让时间变慢，要求你多停一会儿？", "Before turning the page, which image slows time and asks you to stay?"],
      [
        ["sequence", "先看分格节奏", "Begin with panel rhythm", "重复小格、突然的大格和无框画面共同控制停顿、推进与转折。", "Repeated small panels, sudden large panels and borderless images control pause, advance and turn."],
        ["voice", "再看文字声音", "Then, hear the written voice", "旁白、对白与图像有时互相补充，有时故意矛盾，让阅读产生第二层意义。", "Caption, dialogue and image sometimes reinforce and sometimes contradict one another, creating a second layer of meaning."],
        ["motif", "最后找重复意象", "Finally, find recurring motifs", "一个地点、物件或姿势跨章节返回，把长篇记忆连接起来。", "A place, object or pose returns across chapters, connecting long-form memory."]
      ],
      [[4, "长篇结构明确", "Clear long-form structure"], [2, "色彩因作品而异", "Color varies by work"], [3, "画面语言可繁可简", "Visual language ranges widely"], [5, "情绪与主题深入", "Deep emotion and theme"]],
      [["叙事", "沉浸", "层次", "余韵"], ["Narrative", "Immersive", "Layered", "Resonant"]],
      [
        ["家居", "Home", "把旅行票据、照片和短句按时间排列，观察缺口如何让记忆继续。", "Arrange tickets, photos and short notes over time, and see how gaps let memory continue."],
        ["穿搭", "Clothing", "用重复出现的颜色或小物作为个人叙事线索，而不是一次堆满符号。", "Use a recurring color or small object as a personal narrative cue rather than filling one look with symbols."],
        ["摄影", "Photography", "用六张照片记录同一地点一天中的变化，让顺序产生故事。", "Use six photos to record one place changing through a day, letting sequence create story."],
        ["日常物件", "Everyday objects", "观察日记、相册和说明漫画如何让文字与图片分担信息。", "Notice how journals, albums and instructional comics divide information between words and pictures."]
      ],
      [
        ["manga", "都通过分格、文字、翻页和连续图像展开长篇叙事。", "Both unfold long narratives through panels, lettering, page turns and sequential images.", "Graphic Novel 多是书本长度或出版形式的称呼，并非固定画风；Manga 指日本漫画的广泛媒介、行业与阅读传统。", "Graphic novel usually names book-length or publishing form rather than one style; manga names a broad Japanese medium, industry and reading tradition."],
        ["noir-illustration", "都可用黑影、心理张力和城市空间讲述复杂故事。", "Both can use shadow, psychological tension and urban space for complex stories.", "Graphic Novel 由连续页面建立时间；Noir Illustration 可在单幅画面中浓缩悬念与道德不确定。", "Graphic novels build time across pages; noir illustration may condense suspense and moral uncertainty into one image."]
      ],
      ["如果删掉所有旁白，这个故事会失去事实，还是失去人物的内心？", "If every caption vanished, would the story lose facts or the character's inner life?"]
    ),

    "noir-illustration": fullGuide(
      ["你先看到人物，还是先看到包围人物的那片黑暗？", "Do you see the figure first, or the darkness surrounding them?"],
      [
        ["shadow", "先看黑影形状", "Begin with the shape of shadow", "百叶窗、门框和街灯把黑暗切成有方向的块面，隐藏与揭示同时发生。", "Blinds, doorways and streetlights cut darkness into directional shapes, hiding and revealing at once."],
        ["angle", "再看不安机位", "Then, notice uneasy angles", "俯视、仰视和倾斜构图让普通房间或街角失去稳定感。", "High, low and tilted viewpoints make an ordinary room or corner lose stability."],
        ["clue", "最后找线索", "Finally, find the clue", "一只手、一道反光或半开的门承担叙事，画面把答案留在边缘。", "A hand, reflection or half-open door carries the story while the answer remains at the edge."]
      ],
      [[4, "构图控制严密", "Tightly controlled composition"], [1, "色彩极度克制", "Extremely restrained color"], [2, "装饰很少", "Very little ornament"], [5, "悬疑情绪浓重", "Intense suspense"]],
      [["阴影", "悬疑", "冷峻", "含混"], ["Shadowed", "Suspenseful", "Severe", "Ambiguous"]],
      [
        ["家居", "Home", "夜间只开一盏侧灯，观察门框、窗帘和家具如何分割空间。", "At night, use one side light and notice how doorframes, curtains and furniture divide space."],
        ["穿搭", "Clothing", "用清晰长外套轮廓、深浅反差和一件反光配饰建立神秘感。", "Use a clear long-coat silhouette, dark-light contrast and one reflective accessory to create mystery."],
        ["摄影", "Photography", "让主体靠近画面边缘，用前景遮挡和硬光留下未解释的信息。", "Place the subject near an edge and use foreground obstruction and hard light to leave information unexplained."],
        ["日常物件", "Everyday objects", "看旧侦探书封、黑白海报和夜间路牌怎样用少量线索制造故事。", "See how detective covers, monochrome posters and night signs create story from few clues."]
      ],
      [
        ["graphic-novel", "都可用高反差、内心独白和城市空间表现心理冲突。", "Both can express psychological conflict through high contrast, inner voice and urban space.", "Noir Illustration 强调一种阴影与悬念语言；Graphic Novel 是可容纳多种风格与主题的长篇叙事形式。", "Noir illustration emphasizes a language of shadow and suspense; graphic novel is a long-form format containing many styles and themes."],
        ["edward-hopper", "都常把孤立人物放在夜间室内、街角或窗边。", "Both often place isolated figures in night interiors, corners or windows.", "Noir 用斜角、硬影和线索推进危险；Hopper 更常以静止光线、距离和沉默延长日常孤独。", "Noir advances danger with oblique angles, hard shadow and clues; Hopper more often extends everyday solitude through still light, distance and silence."]
      ],
      ["画面真正让你不安的是它展示的危险，还是它没有展示的部分？", "Is the unease caused by the danger shown, or by what remains unseen?"]
    ),

    "childrens-picture-book": fullGuide(
      ["如果你还不识字，能不能只靠颜色、动作和翻页猜到接下来会发生什么？", "If you could not read yet, could color, action and the page turn tell you what happens next?"],
      [
        ["readability", "先看一眼能否读懂", "Begin with instant readability", "角色轮廓、表情与主要动作足够清楚，让文字不是理解故事的唯一入口。", "Character silhouette, expression and main action are clear enough that words are not the only entrance to the story."],
        ["page", "再看翻页惊喜", "Then, notice the page-turn surprise", "前一页提出方向或期待，后一页用尺度、颜色或结果回应。", "One page sets direction or expectation; the next answers through scale, color or outcome."],
        ["detail", "最后找可重复发现的细节", "Finally, find repeatable details", "背景里的小角色、物件和图案奖励再次阅读，却不抢走主线。", "Small background characters, objects and motifs reward rereading without stealing the main thread."]
      ],
      [[4, "阅读顺序清楚", "Clear reading order"], [4, "色彩亲切鲜明", "Warm, vivid color"], [3, "细节丰富但可控", "Rich but controlled detail"], [4, "情绪直接有温度", "Direct, warm emotion"]],
      [["亲切", "好奇", "清楚", "想象"], ["Welcoming", "Curious", "Clear", "Imaginative"]],
      [
        ["家居", "Home", "把常用物品放在孩子视线高度，用图形标签帮助找到与归位。", "Place common objects at a child's eye level and use picture labels for finding and returning them."],
        ["穿搭", "Clothing", "用一个易认主色和清楚轮廓帮助快速辨认，再加入可发现的小细节。", "Use one recognizable main color and clear silhouette, then add a small discoverable detail."],
        ["摄影", "Photography", "从较低视角记录日常动作，让普通桌椅重新显得巨大而有故事。", "Photograph everyday action from a lower view so ordinary furniture feels large and storied again."],
        ["日常物件", "Everyday objects", "看玩具包装、儿童标识和绘本如何用图像先说明动作，再由文字补充。", "See how toy packs, child-facing signs and picture books show action in image before words add detail."]
      ],
      [
        ["editorial-illustration", "都让图像与文字合作，并把复杂内容变得可进入。", "Both make images work with words and invite readers into complex content.", "绘本通过连续翻页、角色与重复建立儿童阅读经验；编辑插画通常为一篇文章或观点提炼视觉隐喻。", "Picture books build a child's reading experience through page sequence, character and repetition; editorial illustration often distills one article or opinion into a visual metaphor."],
        ["healing-animation", "都可使用柔和角色、温暖色彩和日常小事建立安全感。", "Both can use gentle characters, warm color and small daily events to create safety.", "绘本是纸页或屏幕上的出版叙事，受翻页和文字关系控制；疗愈动画还通过时间、声音和运动延长陪伴感。", "Picture books are publishing narratives controlled by page turns and text-image relation; healing animation extends companionship through time, sound and motion."]
      ],
      ["哪一个小细节会让你愿意把这一页再看一次？", "Which small detail would make you look at this page again?"]
    ),

    "fashion-illustration": fullGuide(
      ["这件衣服的感觉来自被准确画出的结构，还是来自被故意拉长的一条线？", "Does the garment's feeling come from accurately drawn construction or one deliberately elongated line?"],
      [
        ["gesture", "先看姿态线", "Begin with the gesture line", "身体被简化或拉长，以一条主要方向承托服装的垂坠、转折与态度。", "The body is simplified or elongated so one main direction carries drape, turn and attitude."],
        ["material", "再看材质笔触", "Then, read material marks", "水彩晕染、墨线、铅笔或数字笔刷用不同边缘暗示丝、毛、皮革与透明层。", "Watercolor bloom, ink, pencil or digital brush use different edges to suggest silk, wool, leather and sheer layers."],
        ["omit", "最后看省略", "Finally, notice omission", "脸、手或背景常被弱化，让轮廓、比例和服装重点更快显现。", "Face, hands or setting may recede so silhouette, proportion and garment emphasis appear faster."]
      ],
      [[3, "姿态组织明确", "Clear gestural organization"], [4, "色彩表达灵活", "Flexible expressive color"], [3, "材质细节选择性丰富", "Selectively rich material detail"], [4, "情绪优雅外放", "Elegant, outward emotion"]],
      [["修长", "流动", "材质", "姿态"], ["Elongated", "Fluid", "Material", "Attitudinal"]],
      [
        ["家居", "Home", "看窗帘、毯子和椅背的垂线如何改变房间的轻重与方向。", "See how the falling lines of curtains, throws and chair backs change a room's weight and direction."],
        ["穿搭", "Clothing", "先用一条整体轮廓判断比例，再看面料如何在关节处折叠。", "Judge proportion first through one overall silhouette, then see how fabric folds at joints."],
        ["摄影", "Photography", "让人物在转身或行走时被拍下，用动作而非摆满道具表现衣服。", "Photograph a turn or walk, using movement rather than abundant props to reveal clothing."],
        ["日常物件", "Everyday objects", "看服装草图、纸样和橱窗陈列如何从概念线变成实际体积。", "See how fashion sketches, patterns and window displays move from conceptual line to physical volume."]
      ],
      [
        ["editorial-illustration", "都可用省略、变形和鲜明笔触为传播内容建立气质。", "Both may use omission, distortion and expressive marks to give communication a mood.", "时装插画围绕服装轮廓、材质与姿态；编辑插画围绕文章观点与视觉隐喻。", "Fashion illustration centers garment silhouette, material and pose; editorial illustration centers an article's idea and visual metaphor."],
        ["art-nouveau", "都常借助长曲线、优雅人物和装饰性轮廓。", "Both often use long curves, elegant figures and decorative contours.", "时装插画服务服装构想与传播，可跨多种时代画法；新艺术是特定现代时期贯穿海报、建筑与物件的整体装饰语言。", "Fashion illustration serves garment conception and communication across eras; Art Nouveau is a period-specific decorative language across posters, architecture and objects."]
      ],
      ["如果只保留一条线，你会留下身体的姿势，还是衣服的外轮廓？", "If only one line could remain, would you keep the body's gesture or the garment's outline?"]
    ),

    "botanical-illustration": fullGuide(
      ["这株植物是作为一朵漂亮的花被观看，还是作为一个可以辨认的生命结构被说明？", "Is this plant shown as a beautiful flower or as a living structure to be identified?"],
      [
        ["structure", "先看完整结构", "Begin with complete structure", "根、茎、叶、花与果实被安排在可比较的位置，关键连接不被装饰遮住。", "Root, stem, leaf, flower and fruit are arranged for comparison, with key connections unobscured."],
        ["variation", "再看差异细节", "Then, compare variations", "叶缘、脉络、花瓣数量和不同生长阶段被准确区分。", "Leaf margin, veins, petal count and growth stages are carefully distinguished."],
        ["space", "最后看标本式留白", "Finally, notice specimen-like space", "浅色背景和分离布局让每个局部可被观察、编号或注释。", "A pale ground and separated layout allow each part to be observed, numbered or annotated."]
      ],
      [[5, "分类秩序很强", "Strong taxonomic order"], [3, "色彩接近观察对象", "Color follows observation"], [2, "装饰不是首要目的", "Ornament is not primary"], [2, "情绪安静专注", "Quiet, attentive emotion"]],
      [["细察", "自然", "精确", "标本"], ["Observed", "Natural", "Precise", "Specimen-like"]],
      [
        ["家居", "Home", "比较两株同属植物的叶缘、叶脉和生长方向，而不只看颜色。", "Compare leaf margins, veins and growth direction in two related plants, not only color."],
        ["穿搭", "Clothing", "选择能辨认具体叶形的植物图案，观察重复后哪些结构仍保留。", "Choose a botanical pattern with identifiable leaf forms and see which structures survive repetition."],
        ["摄影", "Photography", "在同一光线下记录花苞、盛开与结果，让阶段可以并排比较。", "Record bud, bloom and fruit under consistent light so stages can be compared side by side."],
        ["日常物件", "Everyday objects", "看种子包装、草本标签和自然笔记如何同时传递名称、形态与尺度。", "See how seed packets, herb labels and field notes communicate name, form and scale together."]
      ],
      [
        ["scientific-illustration", "都以清楚观察、选择性细节和说明结构服务知识。", "Both use close observation, selective detail and explanatory structure in service of knowledge.", "植物插图专注植物辨认、生命周期和分类特征；科学插图还覆盖动物、医学、工程、地质等广泛对象。", "Botanical illustration focuses plant identification, life cycle and taxonomic traits; scientific illustration also covers animals, medicine, engineering, geology and more."],
        ["gongbi", "都可用细线、层层设色和耐心观察描绘花鸟。", "Both can depict flowers and birds with fine line, layered color and patient observation.", "植物插图优先可验证的形态与辨认信息；工笔画的线、设色与构图属于中国绘画审美和文化表达。", "Botanical illustration prioritizes verifiable morphology and identification; gongbi line, color and composition belong to Chinese painting aesthetics and cultural expression."]
      ],
      ["哪一个微小结构让你确认这不是另一种相似植物？", "Which small structure tells you this is not another similar plant?"]
    ),

    "scientific-illustration": fullGuide(
      ["照片已经可以记录对象时，这张图为什么仍要选择、分解或重组它？", "When photography can record the subject, why does this image still select, separate or reconstruct it?"],
      [
        ["purpose", "先找说明目的", "Begin with explanatory purpose", "画面只保留回答问题所需的结构，视角与比例围绕理解而选择。", "The image keeps structures needed to answer a question; viewpoint and scale are chosen for understanding."],
        ["layer", "再看分层与剖面", "Then, inspect layers and sections", "透明、爆炸图、剖面和不同阶段让肉眼无法同时看到的关系并置。", "Transparency, exploded views, sections and stages place relations together that the eye cannot see at once."],
        ["label", "最后看图文系统", "Finally, read the graphic system", "编号、引线、尺度和图例与图像形成可核对的导航。", "Numbers, leaders, scales and legends form a verifiable navigation system with the image."]
      ],
      [[5, "信息秩序严格", "Strict information order"], [2, "色彩用于区分", "Color used for distinction"], [1, "几乎无非必要装饰", "Almost no unnecessary ornament"], [1, "情绪中性专注", "Neutral, focused emotion"]],
      [["解释", "剖面", "准确", "可核对"], ["Explanatory", "Sectioned", "Accurate", "Verifiable"]],
      [
        ["家居", "Home", "拆解一件简单工具，按顺序摆放零件并画出连接关系。", "Disassemble a simple tool, arrange its parts in order and draw their connections."],
        ["穿搭", "Clothing", "看纸样、缝份和里层图如何解释一件衣服从平面变成立体。", "See how patterns, seam allowances and lining diagrams explain a garment moving from flat to volume."],
        ["摄影", "Photography", "为同一对象拍正面、侧面和细节，比较单一漂亮角度遗漏了什么。", "Photograph one subject from front, side and detail, and compare what a single attractive angle omits."],
        ["日常物件", "Everyday objects", "观察药品说明、维修手册和博物馆图解如何用编号连接文字与部位。", "Notice how medical inserts, repair manuals and museum diagrams connect text to parts through numbering."]
      ],
      [
        ["botanical-illustration", "都要求观察准确、结构清楚，并允许图像选择性地超越照片。", "Both require accurate observation, clear structure and selective advantages beyond photography.", "植物插图聚焦植物的辨认与生命周期；科学插图覆盖更广学科，并常使用剖面、流程与技术标注。", "Botanical illustration focuses plant identification and life cycle; scientific illustration spans wider disciplines and often uses sections, processes and technical labels."],
        ["isometric-illustration", "都可拆解复杂对象并用清楚视角说明部件关系。", "Both can separate complex objects and explain relations from a clear viewpoint.", "科学插图的比例和取舍受证据与学科目的约束；等距插画可为传播自由简化、组合场景与品牌化。", "Scientific illustration is constrained by evidence and disciplinary purpose; isometric illustration may freely simplify, combine scenes and adopt brand styling for communication."]
      ],
      ["这张图帮助你看见了照片难以同时呈现的哪一种关系？", "What relationship does this image reveal that a photograph could not show all at once?"]
    ),

    "isometric-illustration": fullGuide(
      ["没有近大远小的强烈变化时，你仍能一眼看出每个部件在哪里、怎样连接吗？", "Without strong near-far scaling, can you still tell where every part sits and how it connects?"],
      [
        ["axis", "先看三组平行方向", "Begin with three parallel directions", "垂直线保持垂直，两组斜线以稳定角度展开，让多个表面同时可见。", "Verticals remain vertical while two stable diagonal sets reveal several surfaces at once."],
        ["module", "再看模块组合", "Then, see modular assembly", "房间、机器和人物像积木一样占据清楚单元，复杂系统被拆成可浏览部分。", "Rooms, machines and figures occupy clear units like blocks, breaking a complex system into browsable parts."],
        ["scale", "最后看信息尺度", "Finally, read informational scale", "重要对象可被适度放大或简化，空间可信度让位于说明效率。", "Important objects may be enlarged or simplified; spatial realism yields to explanatory efficiency."]
      ],
      [[5, "几何秩序很强", "Very strong geometric order"], [3, "色彩用于分区", "Color separates zones"], [2, "装饰简洁可控", "Controlled, simple ornament"], [2, "情绪理性友好", "Rational, approachable emotion"]],
      [["模块", "立体", "清楚", "系统"], ["Modular", "Dimensional", "Clear", "Systematic"]],
      [
        ["家居", "Home", "从房间角落观察桌、柜与通道，画出不遮挡主要关系的简化布局。", "Observe desk, storage and pathways from a room corner and sketch a simplified layout with key relations unobscured."],
        ["穿搭", "Clothing", "把口袋、扣件和层次看成模块，观察它们如何围绕身体功能分布。", "Treat pockets, closures and layers as modules distributed around bodily function."],
        ["摄影", "Photography", "从略高位置拍桌面或街区，让多个表面与路径同时可见。", "Photograph a tabletop or block from slightly above so several surfaces and routes appear together."],
        ["日常物件", "Everyday objects", "看物流图、园区地图和软件插画如何用统一角度组织系统。", "See how logistics diagrams, campus maps and software illustrations organize systems with one angle."]
      ],
      [
        ["scientific-illustration", "都可用固定视角、拆解和标注解释复杂结构。", "Both can explain complex structures through fixed viewpoint, separation and labels.", "等距插画优先统一空间和传播效率，可自由组合场景；科学插图必须围绕可验证对象与专业说明目的。", "Isometric illustration prioritizes consistent space and communication, freely combining scenes; scientific illustration must serve verifiable subjects and disciplinary explanation."],
        ["flat-illustration", "都常以简化形状、有限色彩和清楚层级服务数字传播。", "Both often use simplified shapes, limited color and clear hierarchy in digital communication.", "等距插画保留三维轴线和模块深度；扁平插画可完全压缩透视，以二维关系表达概念。", "Isometric illustration retains 3D axes and modular depth; flat illustration may compress perspective entirely into 2D conceptual relations."]
      ],
      ["哪一个空间关系因为统一角度而变得比照片更容易理解？", "Which spatial relationship becomes easier to understand than in a photograph because of the unified angle?"]
    ),

    "flat-illustration": fullGuide(
      ["当阴影、纹理和透视都退后时，哪几个形状仍足以让你认出主题？", "When shadow, texture and perspective recede, which shapes are still enough to identify the subject?"],
      [
        ["shape", "先看大形状", "Begin with large shapes", "人物和物件被概括成少量清楚色块，轮廓承担主要辨认任务。", "Figures and objects become a few clear color fields, with silhouette carrying recognition."],
        ["hierarchy", "再看尺寸层级", "Then, notice scale hierarchy", "重要内容更大、更亮或更靠前，空间不必真实也能快速说明关系。", "Important content is larger, brighter or more forward; space need not be realistic to explain relation quickly."],
        ["accent", "最后找唯一强调", "Finally, find the single accent", "有限色板中一处对比色、图标或动作成为视觉入口。", "Within a limited palette, one contrasting color, icon or gesture becomes the entry point."]
      ],
      [[5, "图形层级清楚", "Clear graphic hierarchy"], [4, "色块鲜明有限", "Vivid, limited color fields"], [1, "纹理装饰很少", "Very little texture ornament"], [3, "情绪直接友好", "Direct, friendly emotion"]],
      [["简洁", "明快", "图形", "直接"], ["Simple", "Bright", "Graphic", "Direct"]],
      [
        ["家居", "Home", "把一个房间概括为三种主要形状和三种颜色，看功能是否仍可辨认。", "Reduce a room to three main shapes and colors and see whether its function remains recognizable."],
        ["穿搭", "Clothing", "先看整体色块比例，再决定是否需要图案与材质细节。", "Read the overall color-block proportion before deciding whether pattern and texture are needed."],
        ["摄影", "Photography", "寻找纯色墙面与清楚剪影，让照片在缩小后仍有辨识度。", "Find a plain wall and clear silhouette so the photo remains recognizable when reduced."],
        ["日常物件", "Everyday objects", "观察应用引导、公共图标和包装说明如何用最少形状表达动作。", "Notice how app onboarding, public icons and packaging instructions express action with minimal shapes."]
      ],
      [
        ["isometric-illustration", "都用简化形状、有限色板和清楚层级服务说明。", "Both use simplified shapes, limited palettes and clear hierarchy for explanation.", "扁平插画可取消一致透视，重视二维概念关系；等距插画用三组轴线建立可浏览的模块空间。", "Flat illustration may discard consistent perspective for 2D conceptual relation; isometric illustration builds browsable modular space on three axes."],
        ["editorial-illustration", "都可把复杂主题压缩为少量形状与视觉隐喻。", "Both can compress complex topics into few shapes and a visual metaphor.", "扁平插画是一种广泛图形处理方式；编辑插画由具体文章、观点与出版语境决定图像意义。", "Flat illustration is a broad graphic treatment; editorial illustration derives meaning from a specific article, viewpoint and publishing context."]
      ],
      ["如果再删掉一个形状，信息会更清楚，还是主题会开始消失？", "If one more shape were removed, would the message become clearer or would the subject begin to disappear?"]
    )
  });
  const trait = (level, zh, en) => ({ level, zh, en });
  const life = (zhScene, enScene, zhText, enText) => ({
    scene: bi(zhScene, enScene),
    text: bi(zhText, enText)
  });
  const compare = (styleId, zhSimilarity, enSimilarity, zhDifference, enDifference) => ({
    styleId,
    similarity: bi(zhSimilarity, enSimilarity),
    difference: bi(zhDifference, enDifference)
  });
  const fullGuide = (opening, observations, profile, words, lifeScenes, comparisons, reflection) => ({
    openingQuestion: bi(...opening),
    observe: observations.map((item) => observe(...item)),
    profile: {
      order: trait(...profile[0]),
      color: trait(...profile[1]),
      ornament: trait(...profile[2]),
      emotion: trait(...profile[3])
    },
    feelingWords: bi(...words),
    everydayLife: lifeScenes.map((item) => life(...item)),
    comparisons: comparisons.map((item) => compare(...item)),
    reflectionPrompt: bi(...reflection)
  });

  window.STYLE_AESTHETIC_GUIDES = {
    "swiss-style": {
      openingQuestion: bi(
        "先别读文字。你的视线是不是已经被一条看不见的线带到了最重要的位置？",
        "Before reading the words, notice whether an invisible line has already led your eye to what matters most."
      ),
      observe: [
        observe("composition", "先看网格", "First, notice the grid", "标题、图片、数字和空白像被同一套坐标吸住，位置不同却不会散。", "Headline, image, numbers and empty space feel attached to one coordinate system: different positions, one coherent order."),
        observe("space", "再看留白", "Then, notice the space", "空白不是没做完，而是在分隔信息、制造呼吸，并让重点更快被看见。", "Blank space is not unfinished; it separates information, creates breathing room and makes priorities visible sooner."),
        observe("feeling", "最后感受冷静", "Finally, notice the calm", "颜色和字体都主动退后，画面把注意力留给内容，因此显得准确而克制。", "Color and type deliberately step back, leaving attention to the content and creating an exact, restrained mood.")
      ],
      profile: {
        order: trait(5, "秩序感很强", "Very strong order"),
        color: trait(2, "色彩克制", "Restrained color"),
        ornament: trait(1, "装饰很少", "Very low ornament"),
        emotion: trait(2, "情绪冷静", "Calm emotional tone")
      },
      feelingWords: bi(["冷静", "准确", "清晰", "克制"], ["Calm", "Precise", "Clear", "Restrained"]),
      everydayLife: [
        life("家居", "Home", "看家具边缘是否对齐、通道是否留白；少量物件也能形成清楚层级。", "Notice aligned furniture edges and open pathways; a few objects can still form a clear hierarchy."),
        life("穿搭", "Clothing", "把颜色控制在两三种，用版型、比例和间距代替复杂装饰。", "Limit the palette to two or three colors and let silhouette, proportion and spacing replace decoration."),
        life("摄影", "Photography", "让主体偏离正中，再用建筑线条或背景边界把视线带回主体。", "Place the subject off-center, then use architecture or background edges to guide the eye back."),
        life("日常物件", "Everyday objects", "观察地铁导视、药品包装和说明书如何用字号与空白建立顺序。", "Look at how transit signs, medicine packaging and manuals use type size and space to establish order.")
      ],
      comparisons: [
        compare("bauhaus", "都追求现代、清楚和功能。", "Both pursue modernity, clarity and function.", "Swiss Style 更专注信息传达、网格和字体层级；Bauhaus 更强调材料、基础几何与形式实验。", "Swiss Style focuses on communication, grids and type hierarchy; Bauhaus gives more weight to materials, basic geometry and formal experiment."),
        compare("editorial-typography", "都依靠字体和版式组织阅读。", "Both organize reading through type and layout.", "Swiss Style 通常让系统保持中性稳定；编辑排版更允许标题、图文比例和节奏随内容改变。", "Swiss Style usually keeps the system neutral and stable; editorial typography lets headline scale, image-text balance and rhythm shift with the story.")
      ],
      reflectionPrompt: bi("你喜欢它的秩序，还是觉得它有一点太冷静？", "Do you enjoy its order, or does it feel a little too restrained?")
    },

    "art-deco": {
      openingQuestion: bi(
        "如果这张图是一栋建筑，你会先走向中央入口，还是先抬头看它向上的轮廓？",
        "If this image were a building, would you walk toward its central entrance or look up at its rising silhouette first?"
      ),
      observe: [
        observe("composition", "先看对称", "First, notice symmetry", "中心轴像建筑入口一样稳定，两边的形状互相回应，把画面变成一种仪式。", "A central axis holds the image like an architectural entrance, with mirrored forms creating ceremony."),
        observe("material", "再看光泽", "Then, notice the shine", "金色、黑色、象牙白和深色宝石调，让平面看起来像金属、漆面或镶嵌。", "Gold, black, ivory and jewel tones make the flat surface feel like metal, lacquer or inlay."),
        observe("rhythm", "最后看向上生长", "Finally, notice the rise", "阶梯、尖角和放射线不断把视线推高，像城市天际线在庆祝现代速度。", "Steps, points and sunbursts keep lifting the eye, like a skyline celebrating modern speed.")
      ],
      profile: {
        order: trait(5, "对称秩序很强", "Very strong symmetrical order"),
        color: trait(4, "色彩浓郁", "Rich color intensity"),
        ornament: trait(5, "装饰密度高", "High ornament"),
        emotion: trait(4, "情绪华丽有力", "Bold, glamorous emotion")
      },
      feelingWords: bi(["华丽", "锐利", "庄重", "都市"], ["Glamorous", "Sharp", "Ceremonial", "Urban"]),
      everydayLife: [
        life("家居", "Home", "在灯具、镜框或柜门上找重复的扇形与阶梯线；一个强装饰点就足够。", "Look for repeated fans and stepped lines in lamps, mirrors or cabinets; one strong accent can be enough."),
        life("穿搭", "Clothing", "观察直线轮廓、金属配件和几何首饰如何把整体变得更有仪式感。", "Notice how straight silhouettes, metal hardware and geometric jewelry add ceremony."),
        life("摄影", "Photography", "寻找门廊、楼梯和走廊的中轴，让人物站在对称关系里。", "Find the central axes of entrances, stairs and corridors, then place the subject inside that symmetry."),
        life("日常物件", "Everyday objects", "观察香水瓶、影院招牌和巧克力包装怎样用黑金、放射线与切角建立清楚的装饰秩序。", "Notice how perfume bottles, cinema signs and chocolate boxes use black-gold palettes, sunbursts and clipped corners to build a clear decorative order.")
      ],
      comparisons: [
        compare("art-nouveau", "都重视装饰，并把建筑、海报和物件做成完整视觉语言。", "Both value ornament and extend one visual language across architecture, posters and objects.", "Art Deco 偏几何、对称和机器时代；Art Nouveau 偏植物曲线、手工感和自然生长。", "Art Deco is geometric, symmetrical and machine-age; Art Nouveau is organic, handmade and plant-like."),
        compare("minimalism", "两者都能用清楚轮廓形成高辨识度。", "Both can become recognizable through clear silhouettes.", "Art Deco 用重复和材质把画面推向盛大；极简主义主动删除装饰，让空白和比例成为主角。", "Art Deco builds grandeur through repetition and material; Minimalism removes ornament so space and proportion take the lead.")
      ],
      reflectionPrompt: bi("你被它的仪式感吸引，还是会觉得装饰太满？", "Are you drawn to its ceremony, or does the ornament feel too full?")
    },

    impressionism: {
      openingQuestion: bi(
        "先把它当成一瞬间的天气：你感到的是阳光、空气，还是水面反光？",
        "Treat it as a moment of weather: do you feel sunlight, air or reflected water first?"
      ),
      observe: [
        observe("light", "先看光", "First, notice light", "物体边界并不完全固定，亮色笔触在表面跳动，让光比物体本身更先被看见。", "Object edges are not fully fixed; bright strokes flicker across surfaces so light arrives before solid form."),
        observe("color", "再看颜色相邻", "Then, notice neighboring color", "画家常把冷暖小色块并排放，让眼睛在远处自己混合，而不是先调成平滑颜色。", "Small warm and cool marks sit side by side, letting the eye blend them at a distance instead of smoothing them in advance."),
        observe("feeling", "最后感受瞬间", "Finally, notice the moment", "构图像偶然抬头或经过时看到的一幕，因此比摆好的舞台更轻、更短暂。", "The composition feels glimpsed while passing by, lighter and more temporary than a carefully staged scene.")
      ],
      profile: {
        order: trait(2, "秩序较松", "Loose order"),
        color: trait(4, "色彩明亮", "Bright color intensity"),
        ornament: trait(2, "装饰较少", "Low ornament"),
        emotion: trait(3, "情绪轻盈流动", "Light, fluid emotion")
      },
      feelingWords: bi(["轻盈", "湿润", "明亮", "短暂"], ["Airy", "Luminous", "Fresh", "Fleeting"]),
      everydayLife: [
        life("家居", "Home", "留意纱帘、浅色墙面和玻璃如何把自然光分散成柔和色块。", "Notice how sheer curtains, pale walls and glass scatter daylight into soft patches."),
        life("穿搭", "Clothing", "尝试相近但不完全相同的浅色层叠，让颜色在移动中变化。", "Layer pale colors that are close but not identical so the palette shifts with movement."),
        life("摄影", "Photography", "在清晨、雨后或逆光时拍摄，让反光和空气感比锐利轮廓更重要。", "Photograph at dawn, after rain or against the light, letting reflection and atmosphere matter more than sharp edges."),
        life("日常物件", "Everyday objects", "观察玻璃杯、水面、湿路和浅色织物怎样把同一种光拆成不同颜色。", "Watch how a glass, water, wet pavement and pale fabric split the same light into different colors.")
      ],
      comparisons: [
        compare("post-impressionism", "都从可见世界出发，并保留明显笔触。", "Both begin from the visible world and retain visible brushwork.", "印象派更关心当下的光与空气；后印象派更常把色彩和形体组织成个人化结构或情绪。", "Impressionism follows immediate light and air; Post-Impressionism more often organizes color and form into personal structure or emotion."),
        compare("monet", "莫奈的视觉语言是印象派中最清楚的光色范例之一。", "Monet is one of the clearest examples of Impressionist light and color.", "“印象派”是多位画家的共同语境；“莫奈式光影”更聚焦水面、雾气、花园和系列观察中的色彩变化。", "Impressionism is a shared movement; Monet-like light focuses more specifically on water, mist, gardens and changing color across series.")
      ],
      reflectionPrompt: bi("你喜欢这种没有完全说清的瞬间，还是更需要清楚轮廓？", "Do you enjoy a moment left slightly unresolved, or do you prefer clearer outlines?")
    },

    "van-gogh": {
      openingQuestion: bi(
        "先别看画的是什么。笔触正在向哪个方向流动，它让你的身体也跟着转动了吗？",
        "Ignore the subject for a moment. Which way are the strokes moving, and do they make your body move with them?"
      ),
      observe: [
        observe("line", "先看笔触方向", "First, follow the strokes", "短而厚的笔触会绕着天空、树木和道路转弯，形体像被一股看不见的力量推动。", "Short, thick strokes curve around sky, trees and roads, making forms feel driven by an invisible force."),
        observe("color", "再看冷暖碰撞", "Then, notice warm and cool color", "蓝与黄、绿与橙常被放在近处，让光和情绪同时变得更强。", "Blue and yellow, green and orange often meet at close range, intensifying both light and emotion."),
        observe("feeling", "最后感受不安与生命力", "Finally, feel tension and vitality", "画面并不追求平静复制现实；重复、旋转和起伏让普通景物也带着明显的内在节奏。", "The image does not calmly copy reality; repetition, spirals and rises give ordinary scenery a visible inner rhythm.")
      ],
      profile: {
        order: trait(3, "结构清楚但表面涌动", "Clear structure with a restless surface"),
        color: trait(5, "色彩饱和而明亮", "Saturated, bright color"),
        ornament: trait(3, "笔触纹理丰富", "Rich brush texture"),
        emotion: trait(5, "情绪张力很高", "Very high emotional intensity")
      },
      feelingWords: bi(["炽热", "旋转", "孤独", "有生命力"], ["Intense", "Swirling", "Solitary", "Alive"]),
      everydayLife: [
        life("家居", "Home", "观察粗织物、手工陶器和木纹如何保留制作痕迹，让表面显得有温度。", "Notice how coarse textiles, handmade ceramics and wood grain retain marks of making and add warmth."),
        life("穿搭", "Clothing", "用一组高饱和主色配一组冷色，让颜色产生明显情绪而不是只求协调。", "Pair one saturated warm group with a cool group so color carries emotion rather than mere harmony."),
        life("摄影", "Photography", "在风、云或夜间灯光中寻找旋转方向，再用长曝光或重复线条强化节奏。", "Find directional movement in wind, clouds or night lights, then strengthen it with long exposure or repeated lines."),
        life("日常物件", "Everyday objects", "看刷痕墙面、旧木桌和手写字如何因为不完美而显得更有人在场。", "See how brush-marked walls, old wood and handwriting feel more human because they are imperfect.")
      ],
      comparisons: [
        compare("post-impressionism", "都保留可见笔触，并让色彩超出自然再现。", "Both keep visible brushwork and push color beyond natural description.", "后印象派包含多种不同方向；梵高式笔触尤其依靠旋转线条、厚涂和鲜明冷暖对比表达内心节奏。", "Post-Impressionism contains several directions; Van Gogh-like language is especially driven by swirling line, impasto and vivid warm-cool contrast."),
        compare("expressionism", "都允许形体和颜色服从情绪。", "Both let form and color serve emotion.", "表现主义常进一步扭曲人物和空间以制造冲击；梵高仍多从可见景物出发，让笔触在景物内部燃烧。", "Expressionism often distorts figures and space more aggressively; Van Gogh usually starts from visible scenery and lets the strokes burn within it.")
      ],
      reflectionPrompt: bi("你感到的是生命力、焦虑，还是两者同时存在？", "Do you feel vitality, anxiety, or both at once?")
    },

    "chinese-ink-painting": {
      openingQuestion: bi(
        "画面没有画满的地方，是空着，还是正在留给雾、空气和你的想象？",
        "Are the unpainted areas truly empty, or are they holding mist, air and room for your imagination?"
      ),
      observe: [
        observe("space", "先看空白", "First, notice the blank space", "纸面留白可以成为水、雾、天空或距离，它不是背景，而是画面的一部分。", "Bare paper can become water, mist, sky or distance; it is not background but an active part of the image."),
        observe("line", "再看墨色层次", "Then, notice ink values", "同一种墨从焦、浓、重、淡到清产生距离和材质，变化来自水分、速度与压力。", "One ink moves from dense black to pale wash, creating distance and material through water, speed and pressure."),
        observe("feeling", "最后感受气息", "Finally, notice the breath", "笔画之间的停顿和连贯让画面像一次呼吸，观看者会在未画尽的地方继续补全。", "Pauses and continuities between strokes make the image breathe, inviting the viewer to complete what remains unstated.")
      ],
      profile: {
        order: trait(3, "秩序含蓄", "Subtle order"),
        color: trait(1, "色彩极克制", "Very restrained color"),
        ornament: trait(2, "装饰较少", "Low ornament"),
        emotion: trait(3, "情绪含蓄悠长", "Quiet, lingering emotion")
      },
      feelingWords: bi(["空灵", "含蓄", "流动", "沉静"], ["Spacious", "Suggestive", "Flowing", "Quiet"]),
      everydayLife: [
        life("家居", "Home", "不要急着填满墙面和桌面，让物件之间的空隙也参与整体。", "Do not rush to fill every wall and surface; let the space between objects join the composition."),
        life("穿搭", "Clothing", "控制颜色数量，用布料垂坠、深浅层次和一处重点代替复杂图案。", "Limit the palette and use drape, tonal depth and one focal point instead of dense pattern."),
        life("摄影", "Photography", "在雾天、逆光或远景中保留大片安静区域，让主体不必占满画面。", "In mist, backlight or distant views, preserve broad quiet areas and let the subject occupy less of the frame."),
        life("日常物件", "Everyday objects", "观察茶杯、宣纸、石头和枝叶之间的距离，以及材质留下的自然痕迹。", "Notice the distance among a cup, paper, stone and branch, and the natural traces carried by each material.")
      ],
      comparisons: [
        compare("shanshui", "都用墨色、留白和笔法建立空间与气韵。", "Both use ink, blank space and brushwork to build space and vitality.", "中国水墨画是更大的媒介与语言范围；山水画专注山水秩序、行旅观看和可游可居的空间。", "Chinese ink painting is a broader medium and language; Shanshui focuses on landscape order, journeys of looking and inhabitable space."),
        compare("sumi-e", "都重视墨、水、速度和未画之处。", "Both value ink, water, speed and what remains unpainted.", "中国水墨传统包含工整、写意、人物、花鸟与山水等多条线索；日本墨绘常更强调简化、禅意和一次性笔势。", "Chinese ink traditions include meticulous and expressive modes, figures, flowers and landscape; Sumi-e often emphasizes reduction, Zen inflection and decisive strokes.")
      ],
      reflectionPrompt: bi("你喜欢它留下的想象空间，还是会觉得画面太安静？", "Do you enjoy the space it leaves for imagination, or does it feel too quiet?")
    },

    "ukiyo-e": {
      openingQuestion: bi(
        "先看轮廓把画面切成了哪些平面：人物、浪、天空和文字是否像拼在一起？",
        "Notice how outlines divide the image into planes: do figure, wave, sky and lettering feel fitted together?"
      ),
      observe: [
        observe("line", "先看轮廓线", "First, notice the contour", "清楚而有弹性的线把人物、衣纹和自然形状锁成可印刷的平面。", "Clear, elastic outlines lock figures, fabric and natural forms into printable planes."),
        observe("composition", "再看大胆裁切", "Then, notice the crop", "主体可能被边缘截断，近景被放得很大，远景突然变小，制造像快照一样的视角。", "Subjects may be cut by the frame, foregrounds enlarged and distances compressed, creating a snapshot-like viewpoint."),
        observe("color", "最后看平涂色块", "Finally, notice flat color", "颜色很少依赖立体明暗，而通过色块、纹样和套色关系形成节奏。", "Color relies less on modeled light and more on flat areas, pattern and relationships between printed layers.")
      ],
      profile: {
        order: trait(4, "构图秩序鲜明", "Strong compositional order"),
        color: trait(4, "色彩清楚浓缩", "Clear, concentrated color"),
        ornament: trait(4, "纹样丰富", "Rich pattern"),
        emotion: trait(3, "情绪鲜活克制", "Lively yet contained emotion")
      },
      feelingWords: bi(["鲜明", "轻快", "戏剧性", "平面"], ["Vivid", "Lively", "Dramatic", "Graphic"]),
      everydayLife: [
        life("家居", "Home", "在挂画、屏风或织物中观察大色块与重复纹样如何形成清楚边界。", "In prints, screens or textiles, notice how large color areas and repeated patterns create clear boundaries."),
        life("穿搭", "Clothing", "让一件有强图案的单品成为主体，其余颜色从图案中提取。", "Let one strongly patterned item lead, with the remaining colors drawn from that pattern."),
        life("摄影", "Photography", "尝试让近景遮挡一部分画面，或用边缘裁切制造正在经过的感觉。", "Let a foreground object block part of the frame or crop at the edge to suggest passing movement."),
        life("日常物件", "Everyday objects", "观察包装、餐具和布料如何用轮廓、平涂和小纹样讲一个简短场景。", "See how packaging, tableware and fabric use contour, flat color and small patterns to tell a compact scene.")
      ],
      comparisons: [
        compare("yamato-e", "都使用平面色彩、叙事场景和日本传统题材。", "Both use flat color, narrative scenes and Japanese subject matter.", "大和绘多服务宫廷绘卷与古典叙事，空间展开更连续；浮世绘来自城市出版与木版传播，裁切更大胆、日常题材更直接。", "Yamato-e often serves courtly handscrolls and continuous classical narratives; Ukiyo-e comes from urban publishing and woodblock circulation, with bolder crops and more direct everyday subjects."),
        compare("art-nouveau", "都重视流动轮廓、平面构图和图案。", "Both value flowing contour, flat composition and pattern.", "浮世绘用木版套色与大胆裁切压缩空间；新艺术把这些影响转成植物曲线、整体边框与欧洲装饰设计。", "Ukiyo-e compresses space through woodblock color and bold cropping; Art Nouveau translates those influences into botanical curves, total borders and European decorative design.")
      ],
      reflectionPrompt: bi("你更喜欢它的清楚平面，还是被大胆裁切带来的动感吸引？", "Do you prefer its clear flatness, or the movement created by its bold cropping?")
    },

    "dunhuang-mural": {
      openingQuestion: bi(
        "先看人物和飘带的方向：它们是在墙面上站立，还是像音乐一样环绕流动？",
        "Follow the figures and ribbons: are they standing on the wall, or circulating through it like music?"
      ),
      observe: [
        observe("line", "先看飞动的线", "First, notice the flying line", "衣带、云气和身体姿态组成连续曲线，让静止墙面产生舞蹈般的方向。", "Ribbons, clouds and body poses form continuous curves that make a still wall feel choreographed."),
        observe("color", "再看矿物色", "Then, notice mineral color", "土红、石青、石绿与赭色经过时间沉淀，既有明度对比，也保留壁面的温度。", "Earth red, mineral blue, green and ochre carry both contrast and the warmth of an aged wall."),
        observe("rhythm", "最后看重复与中心", "Finally, notice repetition and center", "人物、花纹和建筑常围绕中心或按带状展开，重复把宗教叙事变成可观看的秩序。", "Figures, motifs and architecture often circle a center or unfold in bands, turning sacred narrative into visual order.")
      ],
      profile: {
        order: trait(4, "叙事秩序丰富", "Rich narrative order"),
        color: trait(4, "色彩厚重温暖", "Dense, warm color"),
        ornament: trait(5, "装饰高度丰富", "Very high ornament"),
        emotion: trait(4, "情绪庄严又流动", "Ceremonial yet flowing emotion")
      },
      feelingWords: bi(["庄严", "飞动", "温暖", "神圣"], ["Ceremonial", "Flying", "Warm", "Sacred"]),
      everydayLife: [
        life("家居", "Home", "观察壁毯、长卷或连续墙面如何用横向节奏讲述多段内容。", "Notice how tapestries, scrolls or long walls use horizontal rhythm to carry several moments."),
        life("穿搭", "Clothing", "关注飘带、层叠衣褶和矿物色组合，让动作与颜色一起流动。", "Focus on ribbons, layered folds and mineral palettes so movement and color travel together."),
        life("摄影", "Photography", "用侧向运动、长布料或连续人物姿态，把单张照片组织成一段舞蹈。", "Use lateral movement, long fabric or sequential poses to organize one frame like a dance."),
        life("日常物件", "Everyday objects", "在书封、织物和器物边饰中找连续卷草、莲花和带状纹样的节奏。", "Look for rhythmic scrolls, lotus forms and banded motifs on books, textiles and vessels.")
      ],
      comparisons: [
        compare("chinese-ink-painting", "都重视线条气韵和画面留有可游走的空间。", "Both value expressive line and space through which the eye can travel.", "敦煌壁画依靠矿物色、墙面叙事和高密度装饰；水墨更依赖墨色浓淡、纸面留白和笔触呼吸。", "Dunhuang murals rely on mineral color, wall narrative and dense ornament; ink painting relies on tonal ink, bare paper and breathing brushwork."),
        compare("persian-miniature", "都以细密人物、建筑、植物和装饰组织叙事。", "Both organize narrative through detailed figures, architecture, plants and ornament.", "敦煌壁画面向洞窟与宗教空间，尺度和环绕感更强；波斯细密画多属于书籍页面，细节集中在可手持阅读的画幅中。", "Dunhuang murals belong to cave and sacred space, with larger scale and enclosure; Persian miniatures concentrate detail within a handheld manuscript page.")
      ],
      reflectionPrompt: bi("你先感到的是宗教的庄严，还是线条和色彩带来的舞动？", "Do you first feel sacred ceremony, or the dance created by line and color?")
    },

    "islamic-geometric": {
      openingQuestion: bi(
        "不要急着找图案的起点。你的眼睛会沿着它一直走下去，还是不断回到某个中心？",
        "Do not rush to find where the pattern begins. Does your eye keep traveling, or repeatedly return to a center?"
      ),
      observe: [
        observe("geometry", "先看基本单元", "First, find the unit", "星形、多边形与交织线从少量规则生成，复杂表面背后有清楚的几何骨架。", "Stars, polygons and interlacing lines grow from a few rules; beneath the complex surface is a clear geometric skeleton."),
        observe("rhythm", "再看重复延伸", "Then, notice extension", "单元向四周连续连接，边界像只是被画框暂时截断，暗示图案可以继续。", "Units connect in every direction, as if the frame only temporarily interrupts a pattern that could continue."),
        observe("feeling", "最后感受秩序与无限", "Finally, feel order and infinity", "没有单一人物主角，观看注意力被分散到整体关系中，产生专注而稳定的感受。", "With no single figure as protagonist, attention spreads across relationships in the whole, creating focus and stability.")
      ],
      profile: {
        order: trait(5, "几何秩序极强", "Extremely strong geometric order"),
        color: trait(4, "色彩清楚饱满", "Clear, saturated color"),
        ornament: trait(5, "装饰密度很高", "Very high ornament"),
        emotion: trait(2, "情绪稳定专注", "Stable, focused emotion")
      },
      feelingWords: bi(["精确", "无限", "专注", "和谐"], ["Precise", "Infinite", "Focused", "Harmonious"]),
      everydayLife: [
        life("家居", "Home", "观察瓷砖、屏风和地毯如何用同一单元覆盖大表面，同时保持边界清楚。", "See how tiles, screens and rugs cover a large surface with one unit while keeping edges coherent."),
        life("穿搭", "Clothing", "用一种重复几何作为主图案，控制配饰数量，避免多个尺度互相争抢。", "Use one repeating geometry as the main pattern and limit accessories so competing scales do not fight."),
        life("摄影", "Photography", "正面拍摄窗格、穹顶或铺地，保持透视稳定，让重复关系成为主体。", "Photograph windows, domes or paving frontally, keeping perspective stable so repetition becomes the subject."),
        life("日常物件", "Everyday objects", "留意笔记本、餐盘和包装上，边框如何接住中心图案并完成收束。", "Notice how borders on notebooks, plates and packaging contain and resolve a central pattern.")
      ],
      comparisons: [
        compare("art-deco", "都依靠几何、重复和精确边界形成辨识度。", "Both use geometry, repetition and precise edges to become recognizable.", "伊斯兰几何纹样强调可连续延伸的关系网络；Art Deco 更强调中心轴、阶梯轮廓与都市奢华。", "Islamic geometry emphasizes continuously extending networks; Art Deco emphasizes central axes, stepped silhouettes and urban glamour."),
        compare("persian-miniature", "都可见精细纹样、建筑装饰和高密度表面。", "Both can contain fine pattern, architectural ornament and dense surfaces.", "伊斯兰几何以非具象规则和重复为核心；波斯细密画以人物、园林和叙事场景为核心。", "Islamic geometry centers on nonfigurative rule and repetition; Persian miniature centers on figures, gardens and narrative scenes.")
      ],
      reflectionPrompt: bi("这种重复让你安定，还是让你更想追踪它的规则？", "Does the repetition calm you, or make you want to trace its rules?")
    },

    "african-tribal-pattern": {
      openingQuestion: bi(
        "先把它当成一段节奏：哪一种形状像鼓点，哪一种颜色像回应？",
        "Read it as rhythm: which shape feels like the beat, and which color answers it?"
      ),
      observe: [
        observe("rhythm", "先看重复节奏", "First, notice rhythm", "条带、方格、三角和折线按不同密度重复，像节拍在织物上交替强弱。", "Bands, checks, triangles and zigzags repeat at changing densities, like strong and weak beats woven into cloth."),
        observe("color", "再看颜色关系", "Then, notice color relationships", "高对比色不是平均分布，而是成组出现，让某些区段突然变亮或变重。", "Contrasting colors are grouped rather than evenly spread, causing some passages to brighten or gain weight."),
        observe("material", "最后看手工结构", "Finally, notice the making", "织线、印染与拼接会留下微小偏差，图案因此不是机械复制，而带有人的尺度。", "Weaving, dyeing and joining leave small variations, so pattern feels human-scaled rather than mechanically copied.")
      ],
      profile: {
        order: trait(4, "重复秩序鲜明", "Strong repetitive order"),
        color: trait(5, "色彩浓度很高", "Very high color intensity"),
        ornament: trait(5, "纹样密度很高", "Very high pattern density"),
        emotion: trait(4, "情绪有力活跃", "Energetic, active emotion")
      },
      feelingWords: bi(["有力", "节奏", "温暖", "集体感"], ["Bold", "Rhythmic", "Warm", "Collective"]),
      everydayLife: [
        life("家居", "Home", "让一块织物或靠垫承担主要节奏，周围材质保持朴素，图案会更有力量。", "Let one textile or cushion carry the main rhythm and keep surrounding materials plain so the pattern remains strong."),
        life("穿搭", "Clothing", "观察条带宽度和图案尺度，选择一个主节奏，再用纯色给它停顿。", "Watch band width and motif scale; choose one main rhythm and use solid color as a pause."),
        life("摄影", "Photography", "寻找市场、建筑立面或人群中颜色成组重复的区域，而不是只拍单个纹样。", "Look for grouped color repetition in markets, facades or crowds rather than isolating a single motif."),
        life("日常物件", "Everyday objects", "在篮筐、编织袋和印花纸上观察材料结构如何直接决定图案。", "On baskets, woven bags and printed paper, see how the material structure directly shapes the pattern.")
      ],
      comparisons: [
        compare("aboriginal-dot-painting", "都用重复单元、节奏和与地域文化相关的图像结构。", "Both use repeated units, rhythm and image structures tied to cultural place.", "西非织物纹样常由织造、印染和条带结构形成；澳大利亚原住民点画以点、路径和地景关系组织图面，文化语境不同，不能互换。", "West African textile pattern often grows from weaving, dyeing and bands; Aboriginal dot painting organizes dots, paths and relationships to Country. Their cultural contexts are distinct and not interchangeable."),
        compare("afrofuturism", "都可能使用非洲及非洲离散文化中的色彩、纹样和身份线索。", "Both may use color, pattern and identity cues from African and diasporic cultures.", "传统织物纹样首先来自具体材料与社群实践；Afrofuturism 把这些线索与科技、未来和离散经验重新组合。", "Traditional textile pattern begins with specific materials and community practice; Afrofuturism recombines such cues with technology, futures and diasporic experience.")
      ],
      reflectionPrompt: bi("你先感到颜色的力量，还是重复节奏带来的集体感？", "Do you first feel the force of color, or the collective rhythm of repetition?")
    },

    "mexican-muralism": {
      openingQuestion: bi(
        "如果这幅画占满一面公共墙，你会先看见哪个人物，又会被哪条动作线带向人群？",
        "If this image filled a public wall, which figure would you see first, and which movement would lead you into the crowd?"
      ),
      observe: [
        observe("scale", "先看人物尺度", "First, notice human scale", "人物常被画得有重量、有劳动姿态，身体本身就是叙事和公共立场。", "Figures often carry physical weight and working poses; the body itself becomes narrative and public position."),
        observe("composition", "再看群体构图", "Then, notice the crowd", "视线从中心人物向周围事件扩散，多个场景被组织成一条可阅读的历史或社会关系。", "The eye spreads from central figures into surrounding events, organizing several scenes into readable history or social relation."),
        observe("color", "最后看墙面的颜色", "Finally, notice wall color", "土色、红色、蓝绿与强轮廓适应远距离观看，让复杂故事仍然清楚。", "Earth colors, reds, blue-greens and strong contours remain legible from a distance even when the story is complex.")
      ],
      profile: {
        order: trait(4, "叙事秩序强", "Strong narrative order"),
        color: trait(4, "色彩厚重", "Dense color intensity"),
        ornament: trait(3, "细节服务叙事", "Detail serves narrative"),
        emotion: trait(5, "情绪张力很高", "Very high emotional intensity")
      },
      feelingWords: bi(["公共", "有力", "叙事", "团结"], ["Public", "Powerful", "Narrative", "Collective"]),
      everydayLife: [
        life("家居", "Home", "把一面墙当作完整叙事，而不是零散挂很多小装饰；先决定主场景和观看距离。", "Treat one wall as a complete narrative rather than a collection of small decorations; decide the main scene and viewing distance first."),
        life("穿搭", "Clothing", "观察工装轮廓、土地色和强色块如何表达行动感，而不仅是复古外观。", "Notice how workwear silhouettes, earth tones and bold blocks express action rather than mere vintage styling."),
        life("摄影", "Photography", "拍摄人物与环境的关系，让手势、工具和背景共同说明他们在做什么。", "Photograph people in relation to their environment, letting gesture, tools and background explain what they are doing."),
        life("日常物件", "Everyday objects", "看社区墙画、公共海报和市场招牌如何让远处的人也能读懂主题。", "See how community murals, public posters and market signs make a subject readable from a distance.")
      ],
      comparisons: [
        compare("constructivism", "都把视觉艺术带入公共传播，并使用强构图表达社会行动。", "Both bring visual art into public communication and use forceful composition to express social action.", "墨西哥壁画主义依靠大型具象人物与连续历史叙事；构成主义更偏几何、摄影拼贴、斜线和口号式信息。", "Mexican Muralism relies on large figurative bodies and continuous historical narrative; Constructivism favors geometry, photomontage, diagonals and slogan-like information."),
        compare("pop-art-poster", "都使用醒目色彩和公众易读的图像。", "Both use striking color and publicly legible images.", "墨西哥壁画主义把人物与社会历史放在公共墙面；波普海报常挪用商业传播、消费图像和重复印刷的视觉逻辑。", "Mexican Muralism places people and social history on public walls; Pop Art posters often work with commercial communication, consumer imagery and repeated print logic.")
      ],
      reflectionPrompt: bi("你更被具体人物打动，还是被整面墙的公共力量打动？", "Are you moved more by individual figures, or by the public force of the whole wall?")
    },

    "editorial-illustration": {
      openingQuestion: bi(
        "如果不知道文章标题，你能从这张图猜到它正在讨论哪一种关系或问题吗？",
        "Without seeing the headline, can you guess which relationship or question the image is discussing?"
      ),
      observe: [
        observe("idea", "先找视觉比喻", "First, find the visual metaphor", "画面常把两个不属于同一场景的事物组合起来，用一个关系代替一整段解释。", "The image often combines things that do not share a scene, using one relationship to replace a paragraph of explanation."),
        observe("composition", "再看信息焦点", "Then, notice the focus", "主体数量被控制，轮廓和空白帮助读者在几秒内先懂核心，再发现细节。", "The number of subjects is controlled; silhouette and empty space help readers grasp the core in seconds before noticing detail."),
        observe("tone", "最后判断语气", "Finally, read the tone", "颜色、夸张程度和材质会告诉你这是严肃分析、讽刺评论，还是温和解释。", "Color, exaggeration and material tell you whether the piece is serious analysis, satire or gentle explanation.")
      ],
      profile: {
        order: trait(4, "信息秩序清楚", "Clear information order"),
        color: trait(3, "色彩为观点服务", "Color serves the idea"),
        ornament: trait(2, "装饰较少", "Low ornament"),
        emotion: trait(3, "情绪随议题变化", "Emotion varies with the topic")
      },
      feelingWords: bi(["聪明", "清楚", "含义", "克制"], ["Thoughtful", "Clear", "Meaningful", "Controlled"]),
      everydayLife: [
        life("家居", "Home", "观察书封、杂志和墙上小画如何用一个物件暗示更大的主题。", "Notice how book covers, magazines and small wall prints use one object to suggest a larger theme."),
        life("穿搭", "Clothing", "把一个有含义的配饰作为视觉句子，其余部分保持清楚，让重点不被淹没。", "Let one meaningful accessory act as the visual sentence and keep the rest clear so the point is not buried."),
        life("摄影", "Photography", "尝试把两个日常物件放在意外关系中，让画面提出问题而不是只记录物品。", "Place two everyday objects in an unexpected relationship so the image asks a question instead of merely documenting them."),
        life("日常物件", "Everyday objects", "看报刊封面、播客封面和公共议题海报如何把抽象问题变成一个可见动作。", "See how magazine covers, podcast art and public-issue posters turn abstract questions into visible actions.")
      ],
      comparisons: [
        compare("editorial-typography", "都服务阅读内容，并重视清楚层级和版面节奏。", "Both serve reading and value clear hierarchy and page rhythm.", "编辑插画用图像比喻解释观点；编辑排版主要用字体、栏目、图片比例与阅读顺序塑造内容。", "Editorial illustration explains ideas through visual metaphor; editorial typography shapes content mainly through type, columns, image scale and reading order."),
        compare("graphic-novel", "都能用图像讲复杂情绪和社会主题。", "Both can communicate complex emotion and social themes through images.", "编辑插画通常浓缩成单幅观点，依赖文章语境；图像小说通过连续分镜、时间和角色发展建立叙事。", "Editorial illustration usually condenses a point into one image and depends on article context; graphic novels build narrative through panels, time and character development.")
      ],
      reflectionPrompt: bi("你喜欢一眼懂的比喻，还是愿意让图像保留一点谜面？", "Do you prefer a metaphor that reads immediately, or an image that keeps some mystery?")
    },

    bauhaus: {
      openingQuestion: bi(
        "这些圆、方和线条是在装饰画面，还是正在告诉你每一部分该怎样工作？",
        "Are the circles, blocks and lines decorating the image, or showing how each part is meant to work?"
      ),
      observe: [
        observe("geometry", "先看基础形", "Begin with basic forms", "圆、方、三角和直线像一套造型字母，彼此叠放、对齐或穿插，先建立清楚结构。", "Circles, squares, triangles and lines act like a formal alphabet, overlapping and aligning to establish structure first."),
        observe("color", "再看颜色分工", "See what color is doing", "红、黄、蓝与黑白常被分成不同任务：强调、分区、连接，而不是把每个位置都涂满。", "Red, yellow, blue, black and white often take different jobs: emphasis, division and connection rather than blanket decoration."),
        observe("material", "最后看功能与材料", "Finish with function and material", "字体、家具或建筑构件保留简单轮廓，画面让你感到它们可以被制作、组合并真正使用。", "Type, furniture and architectural parts keep simple silhouettes, suggesting things that can be made, assembled and used.")
      ],
      profile: {
        order: trait(5, "结构秩序很强", "Very strong structural order"),
        color: trait(4, "基础色对比鲜明", "Clear primary-color contrast"),
        ornament: trait(1, "装饰主动收缩", "Ornament deliberately reduced"),
        emotion: trait(2, "情绪理性直接", "Direct, rational tone")
      },
      feelingWords: bi(["理性", "清楚", "实验", "实用"], ["Rational", "Clear", "Experimental", "Useful"]),
      everydayLife: [
        life("家居", "Home", "观察椅子、灯具和置物架是否把支撑结构直接露出来，让功能本身形成外观。", "See whether chairs, lamps and shelves reveal how they stand, letting function shape their appearance."),
        life("穿搭", "Clothing", "从版型和色块关系入手，让一个圆形配件或一块主色承担重点，不必堆满图案。", "Start with silhouette and color blocks, letting one circular accessory or primary hue carry the emphasis."),
        life("摄影", "Photography", "寻找楼梯、窗格与圆形物件的组合，用正面视角让基础形之间的关系变清楚。", "Combine stairs, window grids and circular objects, using a frontal view to clarify their relationships."),
        life("日常物件", "Everyday objects", "看收纳盒、玩具和说明图怎样依靠简单模块完成拆分、组合和识别。", "Notice how boxes, toys and diagrams use simple modules for separation, assembly and recognition.")
      ],
      comparisons: [
        compare("swiss-style", "都重视功能、几何和现代信息秩序。", "Both value function, geometry and modern order.", "包豪斯更像跨越材料、家具、建筑与平面的造型实验；Swiss Style 更集中于网格、字体层级和清楚传达。", "Bauhaus experiments across material, furniture, architecture and graphics; Swiss Style concentrates on grids, type hierarchy and communication."),
        compare("constructivism", "都使用基础几何、无衬线字体和工业时代语言。", "Both use basic geometry, sans-serif type and an industrial-age vocabulary.", "包豪斯常让形与功能保持平衡；构成主义更偏斜线、冲突比例与宣传式方向感。", "Bauhaus balances form with function; Constructivism pushes diagonals, scale clashes and campaign-like direction.")
      ],
      reflectionPrompt: bi("你先感到它好用、好懂，还是先被几何实验吸引？", "Do you first sense usefulness and clarity, or the experiment happening through geometry?")
    },

    "art-nouveau": {
      openingQuestion: bi(
        "沿着最长的那条曲线走一遍：它更像植物正在生长，还是像边框把整张图抱在一起？",
        "Follow the longest curve: does it grow like a plant, or wrap the whole image together like a frame?"
      ),
      observe: [
        observe("line", "先跟随曲线", "Follow the curve", "茎、头发、衣褶和字母常共享同一种起伏线条，视线会被它连续带过画面。", "Stems, hair, drapery and lettering often share one undulating line that carries the eye across the image."),
        observe("composition", "再看整体边框", "Watch the frame gather", "人物、植物与文字不是各自摆放，而会互相嵌入边缘和留白，形成完整的装饰场。", "Figure, plant and type interlock with edges and empty spaces instead of sitting as separate pieces."),
        observe("nature", "最后辨认自然变化", "See how nature is transformed", "花叶通常被拉长、重复或简化成纹样，保留生长感，却不等于写实植物图鉴。", "Leaves and flowers are stretched, repeated or simplified into pattern, retaining growth without becoming botanical illustration.")
      ],
      profile: {
        order: trait(4, "曲线秩序连贯", "Coherent curving order"),
        color: trait(3, "色彩柔和浓缩", "Soft, concentrated color"),
        ornament: trait(5, "装饰高度丰富", "Very high ornament"),
        emotion: trait(3, "情绪优雅流动", "Elegant, flowing mood")
      },
      feelingWords: bi(["流动", "植物感", "优雅", "包围"], ["Flowing", "Botanical", "Elegant", "Enveloping"]),
      everydayLife: [
        life("家居", "Home", "观察栏杆、镜框和灯罩怎样让一条曲线从结构延伸到细节，而不是贴上孤立花纹。", "See how a curve travels from structure into detail across railings, mirrors and lamps rather than appearing as an applied motif."),
        life("穿搭", "Clothing", "留意垂坠布料、长线条和植物形首饰如何让轮廓连续，避免同时堆叠太多焦点。", "Notice how drape, long lines and botanical jewelry make a continuous silhouette without competing focal points."),
        life("摄影", "Photography", "用枝条、拱门或头发在主体周围形成自然边框，让视线沿曲线进入。", "Use branches, arches or hair as a natural frame that leads the eye toward the subject."),
        life("日常物件", "Everyday objects", "看书封、玻璃器与铁艺中，字母和图案是否像同一株植物长出来。", "Look at book covers, glassware and ironwork to see whether letters and motifs seem to grow from one plant.")
      ],
      comparisons: [
        compare("art-deco", "都把海报、建筑和物件组织成完整装饰语言。", "Both extend a complete decorative language across posters, buildings and objects.", "新艺术依赖植物曲线、不对称生长与手工感；Art Deco 依赖几何切角、中心轴和机器时代光泽。", "Art Nouveau relies on botanical curves, asymmetric growth and craft; Art Deco relies on clipped geometry, central axes and machine-age sheen."),
        compare("ukiyo-e", "都可见平面色块、清楚轮廓和大胆裁切。", "Both can show flat color, clear contour and bold cropping.", "浮世绘来自木版套色与城市图像传统；新艺术吸收这些平面线索后，把它们转进欧洲植物装饰、字体与整体边框。", "Ukiyo-e comes from woodblock color and urban print culture; Art Nouveau redirects such flatness into European botanical ornament, lettering and total frames.")
      ],
      reflectionPrompt: bi("这些曲线让你感到自然舒展，还是觉得装饰正在占据所有空间？", "Do the curves feel naturally expansive, or as if ornament is taking over every space?")
    },

    constructivism: {
      openingQuestion: bi(
        "如果画面是一句大声说出的话，哪一条斜线或哪一组文字决定了它的语气？",
        "If the image were a sentence spoken aloud, which diagonal or block of type would set its tone?"
      ),
      observe: [
        observe("direction", "先看斜线方向", "Start with the diagonals", "三角、圆和长条常向同一方向推进，让静止版面像正在发出命令或召集行动。", "Triangles, circles and bars often drive in one direction, making a still page feel like a call to action."),
        observe("scale", "再看比例冲突", "Watch the scale collide", "大字、人物剪影和小型说明故意形成悬殊比例，阅读顺序由冲突而不是温和过渡建立。", "Huge type, figure silhouettes and small captions use abrupt scale changes, building hierarchy through collision rather than gentle transition."),
        observe("material", "最后看拼接感", "Finish with the assembled surface", "照片、色块和印刷文字像被裁切后重新装配，保留复制、机械与公共传播的质感。", "Photographs, color fields and printed type look cut apart and reassembled, retaining the feel of reproduction and public communication.")
      ],
      profile: {
        order: trait(4, "方向秩序强烈", "Forceful directional order"),
        color: trait(3, "少量高对比色", "Few high-contrast colors"),
        ornament: trait(2, "装饰服从传播", "Ornament serves communication"),
        emotion: trait(5, "情绪紧迫有力", "Urgent, forceful emotion")
      },
      feelingWords: bi(["推进", "公共", "紧迫", "机械"], ["Propulsive", "Public", "Urgent", "Mechanical"]),
      everydayLife: [
        life("家居", "Home", "观察楼梯、海报墙和搁板中明显的斜向关系，理解方向如何让静态空间产生行动感。", "Notice pronounced diagonals in stairs, poster walls and shelves, and how direction activates a static room."),
        life("穿搭", "Clothing", "看斜向闭合、功能带和大面积色块怎样把身体轮廓切成明确方向。", "See how diagonal closures, utility straps and broad color blocks divide the silhouette into clear directions."),
        life("摄影", "Photography", "降低或抬高机位，让建筑边线穿过画面，再用人物尺度强化公共空间的力量。", "Lower or raise the camera so architecture cuts across the frame, then use figure scale to amplify public space."),
        life("日常物件", "Everyday objects", "观察交通警示、活动传单和运输标签如何用斜线、大字与少量颜色迅速传达动作。", "See how warnings, flyers and shipping labels use diagonals, large type and few colors to communicate action quickly.")
      ],
      comparisons: [
        compare("bauhaus", "都用几何、现代字体和工业生产语言。", "Both use geometry, modern type and industrial production language.", "构成主义更强调宣传、摄影拼贴和斜向冲击；包豪斯更强调基础训练、材料实验与功能平衡。", "Constructivism emphasizes campaigning, photomontage and diagonal impact; Bauhaus emphasizes foundational study, material experiment and functional balance."),
        compare("mexican-muralism", "都把艺术放进公共传播，并关心集体行动。", "Both bring art into public communication and collective action.", "构成主义常以几何、剪影、摄影和口号压缩信息；墨西哥壁画主义以大型具象人物和连续场景展开社会叙事。", "Constructivism compresses information through geometry, silhouettes, photography and slogans; Mexican Muralism unfolds social narrative through large figures and continuous scenes.")
      ],
      reflectionPrompt: bi("这种强方向感让你更快读懂信息，还是让你感到被催促？", "Does this forceful direction help you read faster, or make you feel pushed?")
    },

    minimalism: {
      openingQuestion: bi(
        "画面删到这么少之后，真正留下来掌控你注意力的是比例、材质，还是空白？",
        "After so much has been removed, what controls your attention: proportion, material or empty space?"
      ),
      observe: [
        observe("space", "先看空白边界", "Begin with the empty field", "空白占据大部分面积，让一个物体、一条线或一个色面显得更有重量，也让观看速度慢下来。", "Empty space occupies most of the field, giving one object, line or plane greater weight and slowing the act of looking."),
        observe("proportion", "再看比例关系", "Compare proportions", "细微的宽窄、距离与对齐会取代复杂内容，稍微移动一个元素，整体平衡就会改变。", "Subtle width, distance and alignment replace complex content; moving one element slightly can change the whole balance."),
        observe("material", "最后看表面", "Finish with the surface", "当图案和叙事退后，纸、金属、木材或纯色本身的边缘、纹理与光线开始成为内容。", "When pattern and narrative recede, the edge, texture and light of paper, metal, wood or pure color become the content.")
      ],
      profile: {
        order: trait(5, "比例秩序精确", "Precise proportional order"),
        color: trait(1, "色彩极为克制", "Extremely restrained color"),
        ornament: trait(1, "几乎没有装饰", "Almost no ornament"),
        emotion: trait(2, "情绪安静疏离", "Quiet, detached tone")
      },
      feelingWords: bi(["安静", "留白", "精确", "克制"], ["Quiet", "Spacious", "Exact", "Restrained"]),
      everydayLife: [
        life("家居", "Home", "观察一件家具与墙面、地面和通道的比例，让未放物件的区域也承担功能。", "Observe the proportion between one piece of furniture, the wall, floor and pathway, letting unfilled areas do work."),
        life("穿搭", "Clothing", "用清楚版型、单一材质差异和有限颜色建立重点，注意衣长与身体比例。", "Build emphasis through clear silhouette, one material contrast and a limited palette, watching garment-to-body proportion."),
        life("摄影", "Photography", "让主体只占画面一小部分，并检查每条边缘是否真的支持它，而不是把空白当作随意背景。", "Let the subject occupy little of the frame and check whether every edge supports it instead of treating emptiness casually."),
        life("日常物件", "Everyday objects", "看包装、餐具和电子界面如何减少操作与标记，同时仍让用途一眼可辨。", "See how packaging, tableware and interfaces reduce controls and marks while keeping purpose immediately legible.")
      ],
      comparisons: [
        compare("swiss-style", "都重视留白、清楚层级和克制形式。", "Both value space, clear hierarchy and restrained form.", "Swiss Style 仍服务具体信息、网格与阅读效率；极简主义可以把物体、材料和比例本身作为主要观看内容。", "Swiss Style still serves information, grids and reading efficiency; Minimalism can make object, material and proportion the main subject."),
        compare("art-deco", "两者都依靠清楚轮廓和精确比例建立识别。", "Both use clear silhouettes and exact proportion.", "极简主义通过删除让空白主导；Art Deco 通过重复、金属感和几何装饰制造盛大。", "Minimalism lets absence and space lead; Art Deco builds grandeur through repetition, sheen and geometric ornament.")
      ],
      reflectionPrompt: bi("这种减少让你更专注，还是让你觉得缺少可以停留的细节？", "Does this reduction sharpen your attention, or leave too little detail to stay with?")
    },

    memphis: {
      openingQuestion: bi(
        "这些颜色和形状像在遵守家具的规则，还是故意让稳定的东西看起来有一点顽皮？",
        "Do these colors and shapes obey the rules of furniture, or deliberately make stable things feel mischievous?"
      ),
      observe: [
        observe("shape", "先看不稳定几何", "Begin with unstable geometry", "圆柱、波浪、锯齿和薄板以出乎意料的角度叠在一起，结构像玩具却仍能被辨认。", "Cylinders, waves, zigzags and slabs meet at unexpected angles, looking toy-like while remaining recognizable."),
        observe("pattern", "再看表面图案", "Watch pattern interrupt", "小点、短线和不规则纹理会跨过家具或版面的表面，让材质不再显得严肃统一。", "Dots, dashes and irregular textures cross furniture and pages, preventing material from feeling solemn or uniform."),
        observe("color", "最后看颜色反常", "Finish with unruly color", "粉色、青绿、黄和黑白同时出现，颜色不模拟自然，而是在不同部件之间制造玩笑与节奏。", "Pink, turquoise, yellow, black and white coexist; color does not imitate nature but creates jokes and rhythm between parts.")
      ],
      profile: {
        order: trait(2, "秩序故意松动", "Order deliberately loosened"),
        color: trait(5, "色彩跳跃饱满", "Playful, saturated color"),
        ornament: trait(5, "图案密度很高", "Very high pattern density"),
        emotion: trait(4, "情绪幽默外向", "Humorous, outgoing mood")
      },
      feelingWords: bi(["顽皮", "跳跃", "反常规", "热闹"], ["Playful", "Bouncy", "Unconventional", "Lively"]),
      everydayLife: [
        life("家居", "Home", "观察一件带强图案或反常轮廓的物件如何改变房间语气，其余区域可以保留安静。", "Notice how one patterned or oddly shaped object changes a room's tone while the rest stays quiet."),
        life("穿搭", "Clothing", "把不规则小图案与一块纯色放在一起，看它们如何形成轻松而非正式的节奏。", "Pair an irregular small pattern with one solid color and see how it creates an informal rhythm."),
        life("摄影", "Photography", "寻找游乐设施、彩色墙面与普通家具的反差，用轻微倾斜机位放大不稳定感。", "Find contrasts among playground structures, colored walls and ordinary furniture, using a slight tilt to amplify instability."),
        life("日常物件", "Everyday objects", "看文具、钟表和餐具怎样用意外把手、波浪边缘或散点纹样挑战熟悉外形。", "See how stationery, clocks and tableware challenge familiar forms with odd handles, wavy edges or scattered marks.")
      ],
      comparisons: [
        compare("bauhaus", "都使用基础几何、鲜明颜色，并跨越平面与家具。", "Both use basic geometry, vivid color and work across graphics and furniture.", "包豪斯让几何服从结构与功能；Memphis 故意增加图案、反常比例和幽默，挑战功能主义的严肃感。", "Bauhaus makes geometry serve structure and function; Memphis adds pattern, odd proportions and humor to challenge functionalist seriousness."),
        compare("pop-art-poster", "都喜欢高饱和颜色、日常物件与直接的平面冲击。", "Both enjoy saturated color, everyday objects and immediate graphic impact.", "波普海报常借用商业图像、漫画与重复印刷；Memphis 更集中于物件结构、表面图案和后现代家具语言。", "Pop Art posters often borrow advertising, comics and print repetition; Memphis centers on object construction, surface pattern and postmodern furniture.")
      ],
      reflectionPrompt: bi("你喜欢它把规则变成游戏，还是会觉得颜色和图案抢得太厉害？", "Do you enjoy seeing rules turned into play, or do the colors and patterns compete too much?")
    },

    baroque: {
      openingQuestion: bi(
        "先找画面最亮的地方：光是在照清人物，还是正在把一个瞬间推向戏剧高潮？",
        "Find the brightest area first: is the light simply revealing a figure, or driving the moment toward a climax?"
      ),
      observe: [
        observe("light", "先看光线落点", "Find where the light lands", "亮部常集中在脸、手或关键动作，周围迅速沉入暗处，让观看像被舞台灯光指挥。", "Light often gathers on a face, hand or decisive action while the surroundings fall quickly into shadow, directing the eye like stage lighting."),
        observe("movement", "再看对角运动", "Follow the diagonal movement", "身体、布料、云层和建筑线不会安静平排，而是沿斜线旋转、冲出或卷回画面。", "Bodies, drapery, clouds and architecture avoid calm rows, turning along diagonals that surge outward and curl back."),
        observe("material", "最后看重量与触感", "Feel the material weight", "厚重织物、皮肤、金属与石材通过高光和褶皱显得可以触摸，进一步放大现场感。", "Heavy cloth, skin, metal and stone become tactile through highlights and folds, intensifying the sense of presence.")
      ],
      profile: {
        order: trait(4, "戏剧秩序集中", "Concentrated dramatic order"),
        color: trait(4, "明暗色彩浓重", "Dense color and contrast"),
        ornament: trait(4, "细节丰厚", "Rich detail"),
        emotion: trait(5, "情绪张力极高", "Very high emotional intensity")
      },
      feelingWords: bi(["戏剧性", "厚重", "运动", "庄严"], ["Dramatic", "Weighty", "Dynamic", "Ceremonial"]),
      everydayLife: [
        life("家居", "Home", "观察厚窗帘、弧形楼梯与一束定向灯怎样共同形成焦点，而不是平均照亮所有位置。", "See how heavy curtains, a curving stair and one directed light create focus instead of illuminating everything evenly."),
        life("穿搭", "Clothing", "留意有重量的垂褶、深色层次和一处明亮材质如何让身体动作更有舞台感。", "Notice how weighted folds, dark layers and one bright material make body movement feel theatrical."),
        life("摄影", "Photography", "让侧光只照亮动作最关键的部分，并用前景遮挡或斜线增加正在发生的感觉。", "Let side light reveal only the decisive action, adding foreground occlusion or diagonals to make the scene feel underway."),
        life("日常物件", "Everyday objects", "看金属餐具、深色木器和褶皱布面如何借高光显出重量、温度与使用痕迹。", "Watch highlights reveal weight, warmth and use across metal utensils, dark wood and folded cloth.")
      ],
      comparisons: [
        compare("rococo", "都重视曲线、装饰、华丽材质和情境表演。", "Both value curves, ornament, luxurious material and staged situations.", "巴洛克以强明暗、宏大对角线和庄严冲突制造重量；洛可可更轻盈、粉彩、亲密并带游戏感。", "Baroque builds weight through sharp light, grand diagonals and solemn conflict; Rococo is lighter, pastel, intimate and playful."),
        compare("renaissance", "都重视人体、空间与叙事的清楚组织。", "Both organize bodies, space and narrative carefully.", "文艺复兴常以稳定透视、平衡构图和均匀可读性建立秩序；巴洛克让光、动作与视角打破稳定，抓住高潮。", "Renaissance art often builds order through stable perspective, balance and even legibility; Baroque lets light, action and viewpoint break that stability at the climax.")
      ],
      reflectionPrompt: bi("你被光线带进了故事，还是先感到画面过于强烈？", "Does the light pull you into the story, or does the intensity arrive first?")
    },

    romanticism: {
      openingQuestion: bi(
        "人物在这片天空、山海或风暴面前有多大？这个比例让你感到自由，还是不安？",
        "How large is the figure beside this sky, mountain, sea or storm, and does that scale feel freeing or unsettling?"
      ),
      observe: [
        observe("scale", "先比人物与自然", "Compare figure and nature", "人物常被放得很小，悬崖、海浪、森林或云层占据大部分画面，让自然像无法完全掌控的力量。", "Figures are often small beside cliffs, waves, forests or clouds, making nature feel larger than human control."),
        observe("weather", "再看天气变化", "Watch the weather turn", "雾、风、火光和暴雨不只是背景，它们改变边缘、颜色与能见度，也改变故事的情绪。", "Mist, wind, firelight and storms are not backdrop; they alter edges, color and visibility, changing the emotional stakes."),
        observe("emotion", "最后看主观选择", "Find the subjective emphasis", "画面会夸大光线、距离或动作，把真实景物推向敬畏、孤独、渴望或反抗，而不是冷静记录。", "Light, distance or gesture may be heightened, pushing real scenery toward awe, solitude, longing or resistance rather than neutral description.")
      ],
      profile: {
        order: trait(3, "秩序服从情境", "Order serves the situation"),
        color: trait(4, "天气色彩浓烈", "Intense atmospheric color"),
        ornament: trait(3, "细节围绕自然", "Detail gathers around nature"),
        emotion: trait(5, "情绪幅度很大", "Very broad emotional range")
      },
      feelingWords: bi(["敬畏", "辽阔", "孤独", "激荡"], ["Awe", "Vast", "Solitary", "Turbulent"]),
      everydayLife: [
        life("家居", "Home", "观察一张大尺度风景与小型家具的比例，理解图像如何让房间产生远方感。", "Notice how a large landscape image relates to small furniture and creates a sense of distance in a room."),
        life("穿搭", "Clothing", "看长外套、风吹布料和深浅层次怎样让身体与天气产生关系，而不是只呈现单件衣服。", "See how long coats, windblown fabric and tonal layers connect the body to weather rather than displaying one garment."),
        life("摄影", "Photography", "在海边、山谷或暴雨前保留大片环境，让人物成为尺度参照，而不是占满镜头。", "At a coast, valley or approaching storm, keep the environment broad and use the figure as a measure of scale."),
        life("日常物件", "Everyday objects", "观察旅行旧物、地图和磨损表面怎样因为距离、时间与使用痕迹引出个人想象。", "Notice how travel objects, maps and worn surfaces evoke personal imagination through distance, time and use.")
      ],
      comparisons: [
        compare("realism", "都可能描绘普通人物、自然与同时代事件。", "Both may depict ordinary people, nature and contemporary events.", "现实主义更强调社会生活与可见条件的直接观察；浪漫主义常放大天气、尺度和情绪，让经验走向崇高或激烈。", "Realism stresses direct observation of social life and visible conditions; Romanticism heightens weather, scale and emotion toward awe or intensity."),
        compare("symbolism", "都允许自然景物承载内心状态和超出字面的含义。", "Both let natural scenes carry inner states and meanings beyond the literal.", "浪漫主义常从宏大自然、历史行动和个人情感出发；象征主义更偏梦境、隐喻形象与私人精神世界。", "Romanticism often begins with vast nature, historical action and personal feeling; Symbolism leans toward dream, metaphorical figures and private inner worlds.")
      ],
      reflectionPrompt: bi("面对这片景象，你更想进入其中，还是保持距离观看？", "Facing this scene, do you want to enter it, or keep your distance?")
    },

    "post-impressionism": {
      openingQuestion: bi(
        "这幅画还在记录眼前的光吗，还是已经开始用颜色和形状重新组织世界？",
        "Is the painting still recording passing light, or has color and form begun to reorganize the world?"
      ),
      observe: [
        observe("structure", "先看形体骨架", "Begin with the structure", "人物、树木和建筑可能被简化成更稳定的块面，笔触不仅描光，也在搭建体积与构图。", "Figures, trees and buildings may become stable masses; brushwork does more than describe light, helping construct volume and composition."),
        observe("color", "再看主观颜色", "Follow the chosen color", "颜色可以偏离现场光线，承担情绪、空间分区或节奏，不同画家会发展出很不一样的色彩逻辑。", "Color may depart from observed light to carry emotion, divide space or set rhythm, producing very different systems from one artist to another."),
        observe("surface", "最后看个人笔法", "Read the personal mark", "点、短笔、平涂或旋转厚笔都可能出现，表面不再追求统一瞬间，而保留明确的作者选择。", "Dots, short strokes, flat areas or swirling impasto may appear; the surface no longer seeks one passing instant but keeps distinct artistic choices.")
      ],
      profile: {
        order: trait(4, "结构倾向明显", "Clear structural tendency"),
        color: trait(5, "色彩高度主动", "Highly active color"),
        ornament: trait(3, "表面笔触丰富", "Rich painted surface"),
        emotion: trait(4, "情绪个体化", "Individualized emotion")
      },
      feelingWords: bi(["构成", "主观", "浓缩", "多样"], ["Constructed", "Subjective", "Concentrated", "Varied"]),
      everydayLife: [
        life("家居", "Home", "观察同一组水果、植物或家具能否先被看成几个大色块，再看细节怎样稳住这些块面。", "See whether fruit, plants or furniture first read as large color masses, then how detail stabilizes them."),
        life("穿搭", "Clothing", "用颜色之间的面积关系建立整体，不必让每种颜色都来自自然写实或传统配色。", "Build the outfit through areas of color without requiring every hue to be naturalistic or conventionally matched."),
        life("摄影", "Photography", "尝试让道路、树干和建筑成为重复方向，再用后期色彩强调结构，而不是只强化光晕。", "Let roads, trunks and buildings establish repeated directions, then use color to reinforce structure rather than glow alone."),
        life("日常物件", "Everyday objects", "看手绘陶器、织物和封面怎样用可见制作痕迹，把普通物件变成有明确作者节奏的表面。", "Notice how painted ceramics, textiles and covers use visible making to give ordinary objects an authored rhythm.")
      ],
      comparisons: [
        compare("impressionism", "都保留可见笔触，并关注现代生活、自然和色彩变化。", "Both retain visible brushwork and engage modern life, nature and changing color.", "印象派更常追踪瞬间光色与空气；后印象派把光色进一步转成结构、象征或个人表现，没有单一统一面貌。", "Impressionism more often follows fleeting light and air; Post-Impressionism redirects color into structure, symbol or personal expression and has no single look."),
        compare("van-gogh", "梵高的旋转笔触和强烈冷暖是后印象派的重要方向之一。", "Van Gogh's swirling marks and warm-cool intensity form one major Post-Impressionist direction.", "后印象派还包含点彩、结构化块面和平涂象征等多条路径；梵高式语言尤其依赖厚笔、方向线与情绪运动。", "Post-Impressionism also includes pointillism, constructed planes and symbolic flat color; Van Gogh's language is especially driven by impasto, directional line and emotional motion.")
      ],
      reflectionPrompt: bi("你更在意它画出了什么，还是画家怎样重新安排了颜色和形状？", "Are you more aware of what is depicted, or how the painter rearranged color and form?")
    },

    fauvism: {
      openingQuestion: bi(
        "如果把颜色换回现实中的样子，这张画最先失去的会是空间、温度，还是情绪？",
        "If the colors returned to natural appearance, what would the image lose first: space, temperature or emotion?"
      ),
      observe: [
        observe("color", "先找非自然色", "Find the non-natural color", "脸、树和阴影可以变成红、绿、紫或蓝，颜色不负责逼真，而是直接建立画面温度与关系。", "Faces, trees and shadows may turn red, green, violet or blue; color does not pursue realism but builds temperature and relationships."),
        observe("line", "再看宽阔轮廓", "Follow the broad contour", "边缘常由简短、粗放的线或相邻色块界定，细节被压缩，主体却更快被看见。", "Edges are often set by brief, broad lines or adjacent color areas; detail is compressed while the subject reads faster."),
        observe("space", "最后看扁平空间", "See the space flatten", "远近仍然存在，但透视和明暗被色彩节奏取代，背景可能像一块与人物同样主动的表面。", "Depth remains, but color rhythm replaces much modeled light and perspective, making the background as active as the figure.")
      ],
      profile: {
        order: trait(3, "结构简化直接", "Direct, simplified structure"),
        color: trait(5, "色彩极度主动", "Extremely active color"),
        ornament: trait(2, "装饰较少", "Low ornament"),
        emotion: trait(4, "情绪明快有力", "Bright, forceful emotion")
      },
      feelingWords: bi(["炽烈", "直接", "平面", "自由"], ["Fiery", "Direct", "Flat", "Free"]),
      everydayLife: [
        life("家居", "Home", "观察一面高饱和墙与相邻物件的冷暖关系，重点不是颜色多，而是颜色彼此怎样推拉。", "Observe warm-cool tension between one saturated wall and nearby objects; the key is not quantity but interaction."),
        life("穿搭", "Clothing", "尝试让两块本来不写实搭配的纯色相邻，用面积和轮廓控制冲突。", "Place two unexpectedly pure colors together and control their clash through area and silhouette."),
        life("摄影", "Photography", "寻找彩色阴影、霓虹反光或强日照，把它们当成独立色块，而不是必须校正的偏色。", "Find colored shadows, neon reflections or hard sun and treat them as independent areas rather than casts to correct."),
        life("日常物件", "Everyday objects", "看蜡笔画、手绘杯与彩色纸张怎样用不准确却明确的颜色保留情绪。", "See how crayon drawings, painted cups and colored papers keep emotion through color that is inaccurate but decisive.")
      ],
      comparisons: [
        compare("impressionism", "都让纯色笔触保持可见，并关注光线中的颜色变化。", "Both keep colored strokes visible and attend to color in light.", "印象派多从现场光色出发，让边缘在空气中溶解；野兽派更主动改写物体颜色，用扁平对比表达画面情绪。", "Impressionism often begins with observed light and dissolving edges; Fauvism rewrites object color more freely through flat emotional contrast."),
        compare("expressionism", "都允许颜色偏离现实，并让形式服务情绪。", "Both let color depart from reality and form serve emotion.", "野兽派常保持明亮、装饰性和平面愉悦；表现主义更常扭曲人物与空间，走向焦虑、冲突或心理压力。", "Fauvism often stays bright, decorative and sensually flat; Expressionism more often distorts figure and space toward anxiety, conflict or psychological pressure.")
      ],
      reflectionPrompt: bi("这些颜色让场景更鲜活，还是让你难以相信它的空间？", "Do these colors make the scene more alive, or make its space harder to believe?")
    },

    surrealism: {
      openingQuestion: bi(
        "画面里哪一件事看起来画得最真实，却最不可能在现实中发生？",
        "Which event is rendered most convincingly, yet could never happen in ordinary reality?"
      ),
      observe: [
        observe("relation", "先找不可能关系", "Find the impossible relation", "熟悉的人、房间和物件被放进不合常理的组合，奇异感常来自关系错位，而不是陌生材料。", "Familiar people, rooms and objects enter impossible combinations; strangeness often comes from displaced relationships rather than unfamiliar materials."),
        observe("scale", "再看比例与重力", "Test scale and gravity", "物件可能过大、悬浮、融化或穿过彼此，空间保留写实线索，却故意破坏日常物理规则。", "Objects may become enormous, float, melt or pass through each other; the space keeps realistic cues while breaking ordinary physics."),
        observe("tone", "最后判断梦的语气", "Read the dream's tone", "清晰光线和安静表面会让荒诞显得冷静可信，也可能转向幽默、欲望或不安，而非只有怪诞。", "Clear light and quiet surfaces can make absurdity calmly believable, shifting toward humor, desire or unease rather than strangeness alone.")
      ],
      profile: {
        order: trait(3, "表面有序内在错位", "Ordered surface, displaced logic"),
        color: trait(3, "色彩随梦境变化", "Color varies with the dream"),
        ornament: trait(3, "细节承担暗示", "Detail carries suggestion"),
        emotion: trait(5, "心理张力很高", "Very high psychological tension")
      },
      feelingWords: bi(["梦境", "错位", "神秘", "不安"], ["Dreamlike", "Displaced", "Mysterious", "Unsettling"]),
      everydayLife: [
        life("家居", "Home", "观察镜面、门洞和物件倒置怎样改变熟悉房间的逻辑，先理解错位，不必把它解释成固定象征。", "Notice how mirrors, doorways and inverted objects alter a familiar room; understand the displacement without assigning a fixed symbol."),
        life("穿搭", "Clothing", "看比例异常的配件、身体错视和材料反差如何提出问题，而不是只追求奇装异服。", "See how oversized accessories, body illusions and material contrasts pose a question rather than merely look eccentric."),
        life("摄影", "Photography", "用倒影、遮挡或强制透视把两个真实场景连接成一个不可能关系，保持光线一致会更可信。", "Use reflection, occlusion or forced perspective to join two real scenes impossibly; consistent light makes the result more convincing."),
        life("日常物件", "Everyday objects", "观察玩具、厨具和办公用品在尺度或用途被交换后，熟悉感怎样迅速变成疑问。", "Watch familiarity turn into a question when toys, utensils and office tools exchange scale or purpose.")
      ],
      comparisons: [
        compare("realism", "都可能使用细致空间、可辨物体和可信光线。", "Both may use detailed space, recognizable objects and convincing light.", "现实主义让这些线索服务可观察生活与社会条件；超现实主义保留可信表面，却把关系、尺度和因果改造成梦的逻辑。", "Realism uses those cues for observed life and social conditions; Surrealism keeps the credible surface but rewrites relation, scale and cause through dream logic."),
        compare("dada", "都挑战常识，并把熟悉物件放进新的语境。", "Both challenge common sense and relocate familiar objects.", "Dada 常通过现成品、拼贴、反艺术姿态和偶然性直接质疑制度；超现实主义更集中于梦、欲望、潜意识联想与不可能场景。", "Dada directly questions institutions through readymades, collage, anti-art gestures and chance; Surrealism focuses more on dream, desire, association and impossible scenes.")
      ],
      reflectionPrompt: bi("你想为这个场景找到解释，还是愿意让它保持无法完全解开的状态？", "Do you want to explain this scene, or let it remain partly unresolved?")
    },

    gongbi: {
      openingQuestion: bi(
        "先靠近看一条最细的轮廓：它只是把形状圈出来，还是在控制羽毛、衣褶与花叶的质感？",
        "Move close to one fine contour: does it merely enclose a shape, or control the texture of feather, cloth and leaf?"
      ),
      observe: [
        observe("line", "先看用线", "Begin with the line", "轮廓细而稳定，转折、粗细和停顿会区分花瓣、鸟羽、衣纹与人物姿态，不是机械描边。", "Contours are fine and steady; turns, pressure and pauses distinguish petals, feathers, drapery and pose rather than mechanically tracing them."),
        observe("color", "再看层层设色", "Watch color accumulate", "颜色常以薄层逐步覆盖，在保留线条的同时建立透明、厚重或矿物般的表面。", "Color often builds through thin layers, preserving the drawing while creating transparent, dense or mineral-like surfaces."),
        observe("composition", "最后看精密与空白", "See precision beside space", "细节可以非常密集，但主体之间仍有清楚呼吸和方向，空白会帮助视线停在关键形态。", "Detail can be dense, yet subjects retain breathing room and direction; open areas help the eye settle on key forms.")
      ],
      profile: {
        order: trait(5, "描绘秩序精密", "Highly precise descriptive order"),
        color: trait(4, "设色层次丰富", "Rich layered color"),
        ornament: trait(4, "细节密度较高", "High detail density"),
        emotion: trait(2, "情绪含蓄稳定", "Subtle, steady emotion")
      },
      feelingWords: bi(["精微", "耐心", "清润", "含蓄"], ["Meticulous", "Patient", "Luminous", "Subtle"]),
      everydayLife: [
        life("家居", "Home", "观察花枝、鸟羽和器物边缘的细微差异，理解精细并不等于把每处都填满。", "Observe subtle differences among stems, feathers and vessel edges, noting that precision does not require filling every area."),
        life("穿搭", "Clothing", "留意领口、刺绣和面料边缘如何用细线与有限设色建立层次，不必复制传统图样。", "Notice how necklines, embroidery and fabric edges build layers through fine line and restrained color without copying traditional motifs."),
        life("摄影", "Photography", "用柔和侧光拍花、鸟或静物，让轮廓和表面层次清楚，同时保留安静背景。", "Use soft side light for flowers, birds or still life so contour and surface stay clear against a quiet background."),
        life("日常物件", "Everyday objects", "看瓷器、书页与植物标本中，细线怎样区分结构、材质和生长方向。", "See how fine line distinguishes structure, material and growth across ceramics, pages and botanical specimens.")
      ],
      comparisons: [
        compare("chinese-ink-painting", "都依赖笔线、纸绢与留白建立气息。", "Both rely on brush line, paper or silk and open space.", "中国水墨是更大的媒介与语言范围；工笔尤其强调严谨勾线、层层设色和精密描绘，不等于所有水墨画。", "Chinese ink painting is a broader field; Gongbi especially emphasizes disciplined contour, layered color and meticulous description and does not represent all ink painting."),
        compare("nihonga", "都可能使用细线、矿物性颜色、纸绢与安静构图。", "Both may use fine line, mineral color, paper or silk and quiet compositions.", "工笔来自中国绘画内部的细密方法传统；Nihonga 是近代形成的日本画类别，借传统材料与格式回应现代主题和展览制度。", "Gongbi is a meticulous method within Chinese painting; Nihonga is a modern Japanese painting category that reworks inherited materials and formats for modern subjects and exhibitions.")
      ],
      reflectionPrompt: bi("这些精细线条让你更靠近观看，还是让你先保持安静距离？", "Do these fine lines draw you closer, or make you pause at a quiet distance?")
    },

    shanshui: {
      openingQuestion: bi(
        "你的视线会从哪条山路、溪流或云气进入，又会在哪一处峰谷之间停下来？",
        "Which path, stream or bank of mist lets your eye enter, and where does it pause among peaks and valleys?"
      ),
      observe: [
        observe("path", "先找可游的路径", "Find a path for the eye", "山路、河流、桥与屋舍常形成连续线索，观看不是站在一个固定点，而像沿画面缓慢行进。", "Paths, rivers, bridges and dwellings form a chain; viewing is less a fixed viewpoint than a slow journey through the image."),
        observe("space", "再看云水留白", "Read mist and water", "未画或淡墨区域会连接近景与远山，既是云、水和空气，也是让不同空间层次转折的地方。", "Bare or pale areas connect foreground and distant peaks, acting as mist, water and air while shifting between spatial layers."),
        observe("texture", "最后看山石笔法", "Study rock and tree texture", "皴擦、点染与墨色干湿区分岩石、树木和气候，山并非一个平涂轮廓，而由笔触慢慢生长。", "Texturing strokes, dots and wet-dry ink distinguish rock, tree and climate; the mountain grows through marks rather than one filled silhouette.")
      ],
      profile: {
        order: trait(4, "行旅秩序清楚", "Clear journey-like order"),
        color: trait(2, "色彩克制含蓄", "Restrained, subtle color"),
        ornament: trait(3, "笔墨细节适中", "Moderate brush detail"),
        emotion: trait(3, "情绪悠远沉静", "Distant, contemplative mood")
      },
      feelingWords: bi(["可游", "悠远", "层叠", "沉静"], ["Journeying", "Distant", "Layered", "Contemplative"]),
      everydayLife: [
        life("家居", "Home", "观察窗外近树、中景建筑与远处天际如何形成层次，把观看路径带进室内，而不是摆放山水符号。", "Observe how a near tree, middle-distance building and far horizon create layers, bringing a viewing path indoors without applying landscape symbols."),
        life("穿搭", "Clothing", "从深浅层叠、垂直走势和留出的空隙观察整体节奏，不把具体山水母题当作随意图案。", "Read rhythm through tonal layers, vertical movement and open intervals rather than using landscape motifs casually."),
        life("摄影", "Photography", "在雾、山路或河谷中同时保留前中远景，让视线可以逐层移动，而不是只追求单一壮观峰顶。", "In mist, paths or valleys, retain foreground, middle and distance so the eye can travel beyond one spectacular peak."),
        life("日常物件", "Everyday objects", "看长卷、地图和园林路径如何通过展开顺序改变观看时间，重点是移动关系而非复制笔法。", "See how scrolls, maps and garden paths shape viewing through sequence, focusing on movement rather than copying brushwork.")
      ],
      comparisons: [
        compare("chinese-ink-painting", "都使用墨色、笔法和留白建立空间与气息。", "Both use ink, brushwork and open space to build atmosphere.", "中国水墨还包括人物、花鸟、工笔与写意等广阔范围；山水特别围绕山川秩序、行旅观看和人与自然的空间关系。", "Chinese ink painting also includes figures, birds-and-flowers, meticulous and expressive modes; Shanshui specifically organizes mountains, waters, journeys and human scale within nature."),
        compare("romanticism", "都可能让人物在宏大自然中显得很小，并借天气营造情绪。", "Both may place small figures within vast nature and use weather emotionally.", "山水常以多重观看点、笔墨路径与云水留白组织可游空间；浪漫主义更常以单一戏剧视点、光线和崇高情绪制造冲击。", "Shanshui organizes a traversable space through shifting viewpoints, brush paths and mist; Romanticism more often uses one dramatic viewpoint, light and sublime emotion for impact.")
      ],
      reflectionPrompt: bi("你会沿着哪条路径进入这片山水，又愿意在哪一段停留？", "Which route would you take into this landscape, and where would you choose to pause?")
    },

    "sumi-e": {
      openingQuestion: bi(
        "只用这么少的笔触，你仍能认出形体；是哪一笔提供结构，哪一处空白让它继续呼吸？",
        "With so few strokes, the form remains recognizable: which mark provides structure, and which empty area lets it breathe?"
      ),
      observe: [
        observe("stroke", "先看决定性一笔", "Begin with the decisive stroke", "一笔中的速度、压力和转折会同时交代轮廓、质感与动作，反复修补通常不是主要观看重点。", "Speed, pressure and turning within one mark can convey contour, texture and movement at once; repeated correction is not the main effect."),
        observe("ink", "再看干湿浓淡", "Watch ink change", "干笔会留下纸纹与断续边缘，湿墨向外渗开；深浅变化让少量笔触承担远近和重量。", "Dry strokes expose paper grain and broken edges while wet ink spreads; tonal change lets few marks carry depth and weight."),
        observe("space", "最后看未画之处", "Attend to what is unpainted", "空白不是等待补全的背景，它与笔触共同决定节奏，让形体在纸面上出现，也允许它不被说尽。", "Blank paper is not unfinished background; it sets rhythm with the marks, allowing form to appear without being fully stated.")
      ],
      profile: {
        order: trait(3, "笔势秩序简练", "Concise order through gesture"),
        color: trait(1, "色彩极度克制", "Extremely restrained color"),
        ornament: trait(1, "装饰很少", "Very low ornament"),
        emotion: trait(3, "情绪安静集中", "Quiet, concentrated emotion")
      },
      feelingWords: bi(["简练", "瞬时", "呼吸", "专注"], ["Concise", "Immediate", "Breathing", "Focused"]),
      everydayLife: [
        life("家居", "Home", "观察一枝植物、一个器物与墙面空白的关系，理解少量形体怎样保持存在感，不必模仿传统笔画。", "Observe one plant or vessel against open wall space, seeing how little form can retain presence without imitating traditional strokes."),
        life("穿搭", "Clothing", "从单色层次、布料垂坠和一条清楚动作线观察整体，避免把墨迹当作任意装饰图案。", "Read the whole through monochrome layers, drape and one clear line of movement rather than treating ink marks as generic pattern."),
        life("摄影", "Photography", "在雪、雾或白墙前保留大面积亮部，用一个枝条、人物或阴影承担主要动作。", "Against snow, mist or a white wall, preserve broad light areas and let one branch, figure or shadow carry the action."),
        life("日常物件", "Everyday objects", "看手写便笺、刷痕和水渍边缘怎样记录速度、压力与吸收过程，而不是只看黑白配色。", "See how handwriting, brush marks and water edges record speed, pressure and absorption rather than merely a black-white palette.")
      ],
      comparisons: [
        compare("chinese-ink-painting", "都依靠墨、水、纸、笔势和留白产生形与气息。", "Both rely on ink, water, paper, gesture and open space.", "中国水墨涵盖更广的中国绘画方法、题材与历史传统；Sumi-e 指向日本墨绘语境，常突出凝练笔势，但两者既有交流也不能视为完全相同。", "Chinese ink painting spans a broader range of Chinese methods, subjects and histories; Sumi-e belongs to Japanese ink-painting contexts and often stresses condensed gesture, with exchange between them but no complete equivalence."),
        compare("nihonga", "都可能使用日本纸、墨、自然材料与传统画面格式。", "Both may use Japanese paper, ink, natural materials and inherited formats.", "Sumi-e 以墨的干湿浓淡和少量笔势为核心；Nihonga 可使用广泛矿物颜料、金属箔与细密设色，并回应现代绘画主题。", "Sumi-e centers on ink tone and economical gesture; Nihonga may use broad mineral pigments, metal leaf and meticulous color while addressing modern painting subjects.")
      ],
      reflectionPrompt: bi("当画面不把形体说尽时，你会主动补全，还是更关注笔触本身？", "When the image leaves form incomplete, do you finish it mentally or attend more closely to the mark itself?")
    },

    nihonga: {
      openingQuestion: bi(
        "先别只把它看成矿物颜色：纸、绢、墨、金属箔和颜料颗粒正在怎样改变光与表面？",
        "Do not reduce it to mineral color: how are paper, silk, ink, metal leaf and pigment particles changing light and surface?"
      ),
      observe: [
        observe("material", "先看材料发光方式", "Begin with material light", "矿物颜料、胡粉、墨与金属箔会吸收或反射不同光线，颜色常带颗粒、哑光、透层或微弱闪烁。", "Mineral pigments, shell white, ink and metal leaf absorb or return light differently, creating grain, matte depth, translucency or shimmer."),
        observe("format", "再看画面展开", "See how the format unfolds", "屏风、卷轴、纸绢或现代展览画面会改变阅读方向，留白和边缘不一定服从西方单点透视。", "Screens, scrolls, paper, silk and modern exhibition formats shape reading direction; edges and open space need not follow Western single-point perspective."),
        observe("modernity", "最后看传统如何更新", "Watch tradition become modern", "题材可以来自自然、人物或现代生活；重点是艺术家如何借继承的材料与构图回应新的观看经验。", "Subjects may come from nature, figures or modern life; the key is how inherited materials and compositions address new viewing experience.")
      ],
      profile: {
        order: trait(4, "构图秩序沉稳", "Composed, steady order"),
        color: trait(4, "材料色层丰富", "Rich material color"),
        ornament: trait(3, "表面细节适中", "Moderate surface detail"),
        emotion: trait(3, "情绪安静凝聚", "Quiet, concentrated mood")
      },
      feelingWords: bi(["沉静", "颗粒", "层叠", "现代传统"], ["Quiet", "Granular", "Layered", "Modern tradition"]),
      everydayLife: [
        life("家居", "Home", "观察哑光墙面、纸纤维和金属微光如何随角度改变，不把日本画简化成几个传统纹样。", "Observe how matte walls, paper fibers and subtle metal light change with angle without reducing Japanese painting to a few motifs."),
        life("穿搭", "Clothing", "留意织物颗粒、低光泽层次和一处金属微光的关系，重点放在材料而非复制画面题材。", "Notice relationships among textile grain, low-sheen layers and one metallic glint, focusing on material rather than copied subjects."),
        life("摄影", "Photography", "用侧光记录纸、石粉、金箔或哑光表面的细微变化，让材料成为主体。", "Use angled light to record subtle changes in paper, mineral grain, leaf or matte surfaces, making material the subject."),
        life("日常物件", "Everyday objects", "看书纸、漆面和陶器在不同距离下怎样从整体色面变成可见颗粒与制作痕迹。", "See how paper, lacquer and ceramics shift from broad color fields to visible grain and making marks at different distances.")
      ],
      comparisons: [
        compare("yamato-e", "都可使用纸绢、屏风卷轴、平面色彩与日本题材。", "Both may use paper or silk, screens or scrolls, flat color and Japanese subjects.", "大和绘是更早形成的日本题材绘画传统；Nihonga 是近代语境中的类别，在继承材料与格式时也回应西方绘画、现代生活和展览制度。", "Yamato-e is an older tradition of Japanese subject painting; Nihonga is a modern category that inherited materials and formats while responding to Western painting, modern life and exhibitions."),
        compare("gongbi", "都可能以细线、层层设色和纸绢表面呈现精密形态。", "Both may render precise forms through fine line, layered color and paper or silk.", "工笔是中国绘画中的细密方法传统；Nihonga 的范围不由一种线描方法定义，更强调近代日本画家对材料、传统与现代主题的重新组织。", "Gongbi is a meticulous method within Chinese painting; Nihonga is not defined by one drawing method but by modern Japanese reorganization of material, tradition and subject.")
      ],
      reflectionPrompt: bi("你先被题材吸引，还是在靠近后才发现材料表面的变化？", "Does the subject draw you first, or do material changes emerge only when you move closer?")
    },

    "indian-miniature": {
      openingQuestion: bi(
        "在这么小的画面里，你的眼睛先跟随人物、建筑、花园，还是边框把它们组织成阅读顺序？",
        "Within such a small image, does your eye follow figures, architecture, gardens, or the border that organizes their reading order?"
      ),
      observe: [
        observe("detail", "先看近距离细节", "Begin at close range", "细线、衣饰、植物和器物适合在手持距离慢慢阅读，小尺寸并不等于内容简单。", "Fine line, clothing, plants and objects reward close handheld viewing; small scale does not mean simple content."),
        observe("space", "再看层叠空间", "Read the stacked space", "院落、山坡和房间可能向上展开或同时呈现多个区域，空间服务叙事，不一定服从单点透视。", "Courtyards, slopes and rooms may stack upward or show several zones at once; space serves narrative rather than one-point perspective."),
        observe("variation", "最后注意传统差异", "Notice variation among traditions", "不同地区、宫廷、时期与宗教或世俗语境会使用不同色彩、人物比例和笔法，不能用一个固定模板概括。", "Regions, courts, periods and religious or secular settings use different palettes, figure proportions and hands; no single template represents them all.")
      ],
      profile: {
        order: trait(5, "叙事秩序精密", "Highly precise narrative order"),
        color: trait(4, "色彩层次鲜明", "Clear layered color"),
        ornament: trait(5, "细节密度很高", "Very high detail density"),
        emotion: trait(3, "情绪细腻含蓄", "Nuanced, contained emotion")
      },
      feelingWords: bi(["细密", "叙事", "层叠", "亲近"], ["Intricate", "Narrative", "Layered", "Intimate"]),
      everydayLife: [
        life("家居", "Home", "观察小幅作品如何通过边框、间隔和多场景形成完整阅读，不把宗教或宫廷图像当作通用装饰。", "Observe how a small work becomes a complete reading through borders, intervals and multiple scenes without treating sacred or courtly imagery as generic decoration."),
        life("穿搭", "Clothing", "从细线、局部色彩与层叠边缘观察服饰节奏，避免把特定社群、宗教或宫廷符号随意移用。", "Read clothing rhythm through fine line, local color and layered edges without casually borrowing community, sacred or courtly symbols."),
        life("摄影", "Photography", "在一张照片中保留前景人物、中景建筑与远处景物，让多个区域都可被慢慢阅读。", "Keep foreground figures, middle architecture and distant landscape readable within one frame so the eye can move among zones."),
        life("日常物件", "Everyday objects", "看图书插页、邮票和小型画面如何借边框与细节控制近距离观看时间。", "See how book plates, stamps and small images use borders and detail to pace close viewing.")
      ],
      comparisons: [
        compare("persian-miniature", "都与手稿、宫廷作坊、细线、层叠空间和高密度叙事有关。", "Both relate to manuscripts and court workshops, using fine line, stacked space and dense narrative.", "两者长期交流但各自包含多种传统；印度细密画涵盖莫卧儿、拉贾斯坦、帕哈里等不同语境，不能只按一个波斯来源或单一外观理解。", "They exchanged ideas over time but each contains many traditions; Indian miniature includes Mughal, Rajasthani, Pahari and other contexts and cannot be reduced to one Persian source or look."),
        compare("madhubani", "都可能以清楚轮廓、密集细节、人物动植物和叙事题材吸引近看。", "Both may invite close looking through clear contour, dense detail, figures, plants and narrative.", "印度细密画常与手稿、宫廷作坊和小幅精细设色相关；Madhubani/Mithila painting 来自不同社群与生活、仪式及当代纸本实践，空间和线条逻辑不同。", "Indian miniature often relates to manuscripts, court workshops and finely painted small formats; Madhubani or Mithila painting comes from different communities and domestic, ritual and contemporary paper practices with different spatial and linear logics.")
      ],
      reflectionPrompt: bi("你愿意先读完整故事，还是先停在一个人物、边框或植物细节上？", "Would you rather read the whole story first, or pause on one figure, border or plant detail?")
    },

    "korean-minhwa": {
      openingQuestion: bi(
        "这只动物、花木或书架看起来庄重又有一点幽默；线条、比例和重复怎样同时做到这两件事？",
        "This animal, plant or book-filled screen feels ceremonial yet slightly humorous; how do line, proportion and repetition create both?"
      ),
      observe: [
        observe("shape", "先看形体与比例", "Begin with shape and proportion", "动物、器物与植物常以清楚轮廓出现，比例可以夸张或带稚拙感，让熟悉题材获得鲜活性格。", "Animals, objects and plants appear in clear contour; exaggerated or deliberately naive proportion gives familiar subjects vivid character."),
        observe("space", "再看平面排列", "Read the flat arrangement", "书架、花鸟或山石会并置、叠高或重复，空间不完全追求写实深度，而强调观看顺序与充实感。", "Shelves, flowers, birds or rocks may sit side by side, stack or repeat; space favors sequence and fullness over fully realistic depth."),
        observe("context", "最后避免固定象征", "Leave symbols in context", "题材含义会随作品、时期、用途和观看社群变化；先描述可见关系，不把动物与颜色套成统一符号表。", "Meanings vary by work, period, use and community; describe visible relationships before turning animals or colors into a universal symbol chart.")
      ],
      profile: {
        order: trait(4, "平面秩序充实", "Full, flat order"),
        color: trait(4, "色彩清楚鲜活", "Clear, lively color"),
        ornament: trait(4, "图案细节丰富", "Rich patterned detail"),
        emotion: trait(4, "情绪亲切幽默", "Warm, humorous mood")
      },
      feelingWords: bi(["亲切", "鲜活", "平面", "幽默"], ["Warm", "Lively", "Flat", "Humorous"]),
      everydayLife: [
        life("家居", "Home", "观察屏风、书架和成组物件如何在一个平面内建立秩序，重点是观看关系，不复制特定吉祥图像。", "Observe how screens, shelves and grouped objects build order on one plane, focusing on viewing relationships rather than copying auspicious imagery."),
        life("穿搭", "Clothing", "看清楚轮廓、小面积鲜色和略带幽默的比例怎样使整体亲近，避免挪用具体传统母题。", "See how clear silhouette, small vivid areas and playful proportion create warmth without borrowing specific traditional motifs."),
        life("摄影", "Photography", "正面拍摄陈列架、植物和动物玩偶，让大小差异与重复本身形成叙事。", "Photograph shelves, plants and animal figures frontally, letting scale differences and repetition create the story."),
        life("日常物件", "Everyday objects", "看民间绘画、儿童书和手绘器物怎样用不完全写实的比例保留制作人的性格。", "See how folk painting, children's books and painted objects keep the maker's character through non-naturalistic proportion.")
      ],
      comparisons: [
        compare("chinese-new-year-woodblock", "都可能使用清楚轮廓、鲜明色彩、动物人物与家居相关题材。", "Both may use clear contour, vivid color, figures, animals and subjects connected with domestic life.", "韩国民画涵盖屏风、花鸟、书架与多种民间绘画语境；中国年画与木版印刷、节令张贴和地域作坊传统紧密相关，不能只按吉祥图案互换。", "Korean Minhwa includes screens, birds-and-flowers, book images and varied folk contexts; Chinese New Year prints are closely tied to woodblock printing, seasonal display and regional workshops, not interchangeable as lucky motifs."),
        compare("yamato-e", "都可见平面色彩、叙事性题材和不完全服从单点透视的空间。", "Both may show flat color, narrative subjects and space not governed by one-point perspective.", "大和绘与宫廷文学、绘卷和日本古典题材关系更深；韩国民画常来自不同生活与民间绘画语境，比例和幽默感也更自由。", "Yamato-e is more closely tied to court literature, handscrolls and classical Japanese themes; Korean Minhwa arises from different everyday and folk contexts with freer proportion and humor.")
      ],
      reflectionPrompt: bi("你先感到它亲切有趣，还是先想追踪画面里每件物品的排列？", "Do you first feel warmth and humor, or want to trace how every object is arranged?")
    },

    madhubani: {
      openingQuestion: bi(
        "当人物、植物、动物和边框几乎填满画面时，你的视线靠哪一种线或重复找到入口？",
        "When figures, plants, animals and borders nearly fill the surface, which line or repetition gives your eye an entry?"
      ),
      observe: [
        observe("line", "先看轮廓与填线", "Begin with contour and infill", "形体常由清楚线条围合，内部再以短线、网格、点或色面组织，密度来自多层线性关系。", "Forms are often enclosed by clear lines and organized inside with hatching, grids, dots or color, creating density through layered line."),
        observe("space", "再看少留空的表面", "Read the filled field", "人物、花木、动物和边框彼此接近，背景也参与节奏；观看会在多个局部之间移动，而不是只盯一个中心。", "Figures, plants, animals and borders sit close together and the ground joins the rhythm, moving attention among many local areas."),
        observe("context", "最后看多样实践", "Recognize varied practices", "Mithila 地区不同社群、家庭与当代艺术家有不同题材、材料和线色方法，不能把它只概括成鲜艳民俗装饰。", "Communities, families and contemporary artists in the Mithila region use different subjects, materials and linear or color approaches; the practice is more than bright folk decoration.")
      ],
      profile: {
        order: trait(4, "密集秩序清楚", "Clear order within density"),
        color: trait(4, "色彩方法多样", "Varied approaches to color"),
        ornament: trait(5, "表面细节很高", "Very high surface detail"),
        emotion: trait(4, "情绪直接有生命力", "Direct, lively emotion")
      },
      feelingWords: bi(["密集", "线性", "叙事", "有生命力"], ["Dense", "Linear", "Narrative", "Lively"]),
      everydayLife: [
        life("家居", "Home", "观察满幅作品怎样通过边框、重复和局部间隔避免混乱，不把礼仪或社群限定图像当作墙面模板。", "Observe how a full surface avoids chaos through borders, repetition and local intervals without treating ritual or community-specific imagery as a wall template."),
        life("穿搭", "Clothing", "看一组重复线纹与一块纯色怎样平衡密度，重点理解节奏，不直接挪用特定人物、神祇或仪式母题。", "Balance one repeated linear texture with a solid area, studying rhythm without borrowing specific figures, deities or ritual motifs."),
        life("摄影", "Photography", "俯拍市场、植物或桌面陈列，让多个对象相互连接，同时保留一条清楚阅读路径。", "Photograph markets, plants or tabletop arrangements from above, connecting many objects while preserving a clear route for the eye."),
        life("日常物件", "Everyday objects", "看手绘纸张、篮筐和织物怎样用边框与重复填线记录制作过程和局部差异。", "See how painted paper, baskets and textiles use borders and repeated marks to record making and local variation.")
      ],
      comparisons: [
        compare("indian-miniature", "都可包含人物、动植物、叙事、清楚轮廓与适合近看的细节。", "Both may include figures, plants, animals, narrative, clear contour and close-viewed detail.", "印度细密画常与手稿、宫廷作坊和层叠场景有关；Madhubani/Mithila painting 来自不同社群的墙面、纸本、礼仪与当代实践，满幅线性结构更突出。", "Indian miniature often relates to manuscripts, court workshops and layered scenes; Madhubani or Mithila painting grows from varied community wall, paper, ritual and contemporary practices with stronger all-over linear structure."),
        compare("chinese-new-year-woodblock", "都可能使用满幅构图、民间传播、人物动物与节庆或家庭语境。", "Both may use full compositions, popular circulation, figures, animals and festive or domestic contexts.", "Madhubani 主要依靠手绘线条、填线与不同社群实践；中国年画依靠地域木版套印、成对张贴和印刷轮廓形成另一种节奏。", "Madhubani relies on hand-drawn contour, infill and varied community practices; Chinese New Year prints build another rhythm through regional woodblock printing, paired display and printed outlines.")
      ],
      reflectionPrompt: bi("面对这么丰富的表面，你会先跟随大轮廓，还是逐块阅读内部细线？", "Across such a full surface, do you follow the large contour first or read the inner marks piece by piece?")
    },

    "chinese-new-year-woodblock": {
      openingQuestion: bi(
        "这张图如果被贴在门上或墙上，哪一组对称、轮廓和颜色能让人从远处先读懂它？",
        "If this print were placed on a door or wall, which symmetry, contour and color would make it readable from a distance?"
      ),
      observe: [
        observe("print", "先看木版轮廓", "Begin with the printed contour", "人物、动物与文字由坚实线条定形，套色可能留下轻微错位与纸张吸墨，让图像保留手工印刷感。", "Firm lines define figures, animals and words; slight registration shifts and paper absorption retain the feel of hand printing."),
        observe("composition", "再看成对与正面", "Watch pairs and frontal order", "门神、娃娃、人物或花果常正面展开、成对呼应或围绕中心排列，适合在节令空间中快速识别。", "Guardians, children, figures, flowers or fruits may face forward, answer in pairs or gather around a center for quick reading in seasonal display."),
        observe("context", "最后保留地域差异", "Keep regional differences visible", "不同产地、作坊、时期与题材有各自用色、刻线和含义；不要把每个动物、颜色或物件解释成统一吉祥密码。", "Regions, workshops, periods and subjects have distinct palettes, cuts and meanings; not every animal, color or object shares one auspicious code.")
      ],
      profile: {
        order: trait(5, "正面秩序鲜明", "Strong frontal order"),
        color: trait(5, "节令色彩醒目", "Striking seasonal color"),
        ornament: trait(4, "图案信息丰富", "Rich patterned information"),
        emotion: trait(4, "情绪热烈直接", "Warm, direct emotion")
      },
      feelingWords: bi(["热烈", "印刷", "正面", "团聚"], ["Festive", "Printed", "Frontal", "Communal"]),
      everydayLife: [
        life("家居", "Home", "观察成对门面、中心陈列与远距离可读性，理解节令张贴的空间作用，不复制具体神祇或仪式形象。", "Observe paired entrances, centered displays and distance legibility to understand seasonal placement without copying specific deities or ritual images."),
        life("穿搭", "Clothing", "从高对比色块、清楚边缘和成对小元素观察节奏，避免把具体传统图像当作随意印花。", "Read rhythm through high-contrast color, clear edges and paired small elements without turning specific traditional images into casual prints."),
        life("摄影", "Photography", "正面拍摄门、摊位或节庆陈列，让左右呼应和中心人物保持清楚。", "Photograph doors, stalls or festive displays frontally so bilateral relationships and central figures remain clear."),
        life("日常物件", "Everyday objects", "看包装、印章和旧纸张中，套色边缘、纸纹与重复印刷怎样留下制作痕迹。", "See how registration edges, paper grain and repeated printing leave making visible on packages, seals and old paper.")
      ],
      comparisons: [
        compare("russian-lubok", "都以木版或民间印刷传播清楚人物、文字、故事和醒目色块。", "Both use popular print traditions to circulate clear figures, text, stories and bold color areas.", "中国年画与春节张贴、地域作坊、成对门面和家庭语境关系紧密；Lubok 常以单张图文、讽刺、故事或宗教世俗题材流通。", "Chinese New Year prints are closely tied to Lunar New Year display, regional workshops, paired doors and domestic settings; Lubok often circulates as single image-text sheets carrying satire, stories, sacred or secular subjects."),
        compare("korean-minhwa", "都可能在家庭空间中使用鲜明轮廓、动物人物与正面平面构图。", "Both may use vivid contour, figures, animals and frontal flat composition in domestic settings.", "韩国民画包含屏风、花鸟、书架等不同绘画传统与用途；中国年画更直接受木版印刷、节令张贴和地域版式影响。", "Korean Minhwa includes screens, birds-and-flowers, book images and varied painting uses; Chinese New Year prints are more directly shaped by woodblock production, seasonal display and regional formats.")
      ],
      reflectionPrompt: bi("你先读到的是节日气氛，还是印刷线条与成对构图的秩序？", "Do you register the festive mood first, or the order of printed line and paired composition?")
    },

    "aboriginal-dot-painting": {
      openingQuestion: bi(
        "先不猜这些点代表什么：它们的密度、间隔和移动方向怎样组织整张画面？",
        "Before guessing what the dots mean, how do their density, spacing and direction organize the whole surface?"
      ),
      observe: [
        observe("rhythm", "先看点的节奏", "Begin with dot rhythm", "点可以形成密集带、疏松区域、轮廓或路径，大小与间距的变化让视线移动、停顿或绕行。", "Dots can form dense bands, open areas, contours or paths; shifts in size and spacing make the eye move, pause or circle."),
        observe("space", "再看层与关系", "Read layers and relations", "线、圆、色面和点可能互相覆盖或连接，空间既可像地图，也可保持抽象；不能只凭外观断定故事内容。", "Lines, circles, color fields and dots may overlap or connect; space may feel map-like or abstract, but appearance alone cannot determine a story."),
        observe("context", "最后尊重作品归属", "Keep cultural ownership present", "澳大利亚 First Nations 艺术来自众多不同民族、语言群体、社群与艺术家；有些故事、符号和知识受权限约束，点状技法不是可脱离语境任意复制的通用风格。", "Australian First Nations art comes from many distinct peoples, language groups, communities and artists; some stories, signs and knowledge are restricted, and dotting is not a generic style free for contextless copying.")
      ],
      profile: {
        order: trait(4, "关系秩序层叠", "Layered relational order"),
        color: trait(3, "色彩因艺术家而异", "Color varies by artist"),
        ornament: trait(4, "表面密度较高", "High surface density"),
        emotion: trait(3, "情绪专注延展", "Focused, expansive mood")
      },
      feelingWords: bi(["节奏", "层叠", "路径", "关系"], ["Rhythmic", "Layered", "Path-like", "Relational"]),
      everydayLife: [
        life("家居", "Home", "只观察重复、密度与开放区域如何影响观看；不要复制来源不明的图案、故事或社群限定符号。", "Observe only how repetition, density and open areas shape looking; do not copy unproven patterns, stories or community-restricted signs."),
        life("穿搭", "Clothing", "关注布料上一般性的点阵密度与留白比例，同时避开对 First Nations 作品和图式的仿制。", "Attend to generic dot density and open-space ratios on fabric while avoiding imitation of First Nations works and designs."),
        life("摄影", "Photography", "拍摄自然或城市中已有的重复点、孔洞与路径关系，不把它们包装成原住民艺术替代品。", "Photograph existing repetitions, perforations and paths in nature or cities without presenting them as substitutes for Indigenous art."),
        life("日常物件", "Everyday objects", "比较筛网、砂石、灯点和种子排列中的密度变化，把练习限定在形式观察。", "Compare density shifts in mesh, gravel, lights and seeds, keeping the exercise to formal observation.")
      ],
      comparisons: [
        compare("op-art", "第一眼都可能通过重复单元、密度变化和全幅节奏让眼睛持续移动。", "At first glance both may keep the eye moving through repeated units, density shifts and all-over rhythm.", "Op Art 主要通过几何规则制造视错觉；First Nations 点状作品属于具体艺术家、社群、Country、知识与文化权利语境，形式相似不能抹去这些关系。", "Op Art primarily uses geometric systems to create optical effects; First Nations dotted works belong to specific artists, communities, Country, knowledge and cultural rights, which formal resemblance cannot erase."),
        compare("abstract-expressionism", "都可能覆盖整张画面，让重复动作和表面过程保持可见。", "Both may cover the full field and keep repeated action and surface process visible.", "抽象表现主义常强调个人动作、材料事件与现代画布；First Nations 作品的形式可能连接 Country、叙事、亲属与文化知识，不能只按个人抽象笔触理解。", "Abstract Expressionism often emphasizes individual gesture, material event and modern canvas; First Nations works may connect Country, narrative, kinship and cultural knowledge and cannot be read as personal abstraction alone.")
      ],
      reflectionPrompt: bi("在不知道具体文化含义时，你能否先准确描述节奏，同时保留不越界解释的克制？", "Without knowing the cultural meaning, can you describe the rhythm accurately while resisting interpretation beyond your knowledge?")
    },

    "nordic-folk-art": {
      openingQuestion: bi(
        "这些花叶、动物或几何纹样怎样围绕中心、边框或器物形状生长，而不是只铺满表面？",
        "How do flowers, animals or geometric motifs grow around a center, border or object shape rather than simply cover it?"
      ),
      observe: [
        observe("craft", "先看材料与手工", "Begin with material and craft", "木雕、彩绘、织物、刺绣和纸艺会留下不同边缘与重复方式，纹样往往顺着器物和制作工序展开。", "Woodcarving, painting, weaving, embroidery and paper work leave different edges and repetitions; motifs often follow the object and its making process."),
        observe("symmetry", "再看中心与边框", "Read centers and borders", "花枝、心形、动物或几何单元可能左右呼应、围绕中心旋转，或沿边缘连续生长。", "Branches, hearts, animals or geometric units may mirror, rotate around a center or continue along an edge."),
        observe("variation", "最后保留地域差异", "Keep regional variation visible", "北欧多个国家、地区和社群有不同材料、色彩与传统；不要把所有民俗视觉压成一种红蓝花纹或统一冬日风格。", "Countries, regions and communities across the Nordic area hold different materials, palettes and traditions; they cannot be compressed into one red-blue floral or winter look.")
      ],
      profile: {
        order: trait(4, "重复秩序清楚", "Clear repetitive order"),
        color: trait(4, "色彩随材料变化", "Color varies with material"),
        ornament: trait(4, "手工纹样丰富", "Rich crafted pattern"),
        emotion: trait(3, "情绪温暖稳重", "Warm, steady mood")
      },
      feelingWords: bi(["手工", "重复", "温暖", "地域性"], ["Crafted", "Repetitive", "Warm", "Regional"]),
      everydayLife: [
        life("家居", "Home", "观察木器、织物和墙面纹样怎样顺着物件结构展开，优先理解材料和制作，不拼贴来源不明的民俗符号。", "See how motifs follow the structure of wood, textiles and walls, prioritizing material and making over mixed, unverified folk symbols."),
        life("穿搭", "Clothing", "看针织、织带和刺绣中一个单元怎样重复成边缘或中心，保留图案来源意识。", "See how one unit repeats into a border or center in knitting, woven bands and embroidery while staying aware of provenance."),
        life("摄影", "Photography", "正面记录木门、织物和手工器物，让对称误差、磨损与材料纹理保留下来。", "Record doors, textiles and crafted objects frontally, retaining asymmetry, wear and material texture."),
        life("日常物件", "Everyday objects", "观察碗、箱、玩具与纸艺如何让纹样适应弧面、转角和折叠，而不是平面贴图。", "Notice how bowls, boxes, toys and paper craft adapt motifs to curves, corners and folds rather than applying a flat skin.")
      ],
      comparisons: [
        compare("celtic-art", "都可能依靠重复、边框、手工材料与连续图案建立识别。", "Both may use repetition, borders, craft materials and continuous pattern.", "Celtic Art 常以结饰、交织线、金属与手稿传统形成连续结构；Nordic folk art 涵盖多地木作、彩绘、织物和家居工艺，母题与材料范围不同。", "Celtic Art often forms continuous structures through knotwork, interlace, metal and manuscripts; Nordic folk art spans regional woodwork, painting, textiles and domestic craft with different motifs and materials."),
        compare("russian-lubok", "都来自多样民间制作与传播环境，并可使用清楚轮廓、装饰边框和有限色彩。", "Both arise from varied popular making and circulation and may use clear contour, borders and limited color.", "Lubok 主要是图文并置的民间版画传统；Nordic folk art 的范围更跨木器、纺织、彩绘和家居物件，不以单张印刷叙事为核心。", "Lubok is primarily a popular print tradition combining image and text; Nordic folk art extends across wood, textile, painting and household objects rather than centering on single printed narratives.")
      ],
      reflectionPrompt: bi("你先注意图案本身，还是它如何服从木、线、布或器物的制作方式？", "Do you notice the motif first, or the way it follows wood, thread, cloth or the object's construction?")
    },

    renaissance: {
      openingQuestion: bi(
        "先找画面中最像舞台中心的位置：人物、建筑和视线是不是都在帮你走向那里？",
        "Find the place that feels most like the center of a stage: do figures, architecture and sightlines all lead you there?"
      ),
      observe: [
        observe("space", "先追透视线", "Trace the perspective", "地砖、墙面和建筑边缘常向同一消失点收拢，把平面变成仿佛可以走进去的连续空间。", "Floor tiles, walls and architectural edges often converge toward one vanishing point, turning the surface into a space that seems enterable."),
        observe("composition", "再看人物结构", "Read the figure group", "人物会以三角形、半圆或对称关系稳定地聚合，手势和目光继续连接主要事件。", "Figures gather in triangles, arcs or balanced groups, while gestures and glances keep the main event connected."),
        observe("light", "最后看身体体积", "Watch bodies gain volume", "明暗沿着脸、手臂和衣褶缓慢转折，让身体像雕塑般占据空间，而不是贴在背景上。", "Light turns gradually across faces, arms and drapery, giving bodies sculptural volume instead of leaving them pasted to the backdrop.")
      ],
      profile: {
        order: trait(5, "结构稳定清楚", "Stable, legible structure"),
        color: trait(3, "色彩服务体积", "Color supports volume"),
        ornament: trait(3, "细节服从叙事", "Detail serves the narrative"),
        emotion: trait(3, "情绪庄重可亲", "Dignified, human tone")
      },
      feelingWords: bi(["稳定", "可信", "人文", "平衡"], ["Stable", "Believable", "Human", "Balanced"]),
      everydayLife: [
        life("家居", "Home", "观察门框、桌边和地板线如何共同指向空间深处，以及家具怎样围出清楚的活动中心。", "Follow doorframes, table edges and floor lines into depth, and see how furniture defines a clear center of activity."),
        life("穿搭", "Clothing", "留意衣料在肩、腰和膝部形成的明暗转折，理解布料怎样帮助身体显出重量。", "Attend to shifts of light around shoulders, waist and knees, and how fabric gives the body a sense of weight."),
        life("摄影", "Photography", "利用走廊或街道的汇聚线组织纵深，再让人物手势和目光连接画面的主要关系。", "Use converging lines in a corridor or street to organize depth, then connect the scene through gestures and glances."),
        life("日常物件", "Everyday objects", "看说明图、桌面陈列或包装怎样用中心、比例和前后遮挡建立可信空间。", "See how diagrams, tabletop arrangements or packaging use centers, scale and overlap to establish convincing space.")
      ],
      comparisons: [
        compare("neoclassicism", "都借助古典比例、清楚轮廓和稳定人物群建立秩序。", "Both use classical proportion, clear contours and stable figure groups to create order.", "文艺复兴在不同地区重新研究透视、人体与人文主体；新古典主义在十八世纪考古与启蒙语境中更有意识地控制轮廓、题材和道德叙事。", "Renaissance traditions reexamined perspective, the body and human subjects across regions; Neoclassicism later imposed a more deliberate control of contour, antique subject and moral narrative."),
        compare("baroque", "都能以大型人物、建筑空间和光线讲述宗教或历史事件。", "Both can stage religious or historical events through large figures, architecture and light.", "文艺复兴构图通常让空间与人物保持稳定平衡；巴洛克更常以对角线、强烈明暗和越出边界的动作制造即时戏剧。", "Renaissance compositions usually stabilize figures within coherent space; Baroque art more often uses diagonals, sharp light and outward movement for immediate drama.")
      ],
      reflectionPrompt: bi("你更被这个空间的可信秩序吸引，还是被人物作为叙事中心的位置吸引？", "Are you drawn more to the believable order of the space, or to the new weight given to people within it?")
    },

    rococo: {
      openingQuestion: bi(
        "让视线沿着墙角和人物之间最轻的曲线移动：它是在组织空间，还是故意让空间松开？",
        "Let your eye follow the lightest curve between architecture and figures: is it organizing the space, or allowing it to loosen?"
      ),
      observe: [
        observe("line", "先看不对称曲线", "Follow the off-center curves", "贝壳状转折、枝叶和衣褶常向不同方向伸展，左右并不镜像，却以连续节奏保持平衡。", "Shell-like turns, foliage and drapery extend in different directions; the sides do not mirror each other, yet their rhythm stays balanced."),
        observe("space", "再看轻盈空间", "Enter the airy space", "浅色墙面、柔和天空和开放边缘减轻建筑重量，人物像在小尺度场景中自由交谈或游戏。", "Pale interiors, soft skies and open edges reduce architectural weight, letting figures converse or play within intimate settings."),
        observe("surface", "最后看表面节奏", "Read the surface rhythm", "丝绸反光、花束和雕饰密集出现，但小笔触与弯曲间隔让装饰显得流动而非僵硬。", "Silk highlights, flowers and carving appear in abundance, yet small marks and curved intervals keep the ornament mobile rather than rigid.")
      ],
      profile: {
        order: trait(3, "不对称中有节奏", "Rhythm within asymmetry"),
        color: trait(4, "浅亮色彩丰富", "Rich, pale luminosity"),
        ornament: trait(5, "表面装饰繁盛", "Abundant surface ornament"),
        emotion: trait(3, "情绪轻快亲密", "Light, intimate mood")
      },
      feelingWords: bi(["轻盈", "亲密", "流动", "闲适"], ["Airy", "Intimate", "Flowing", "Leisurely"]),
      everydayLife: [
        life("家居", "Home", "观察镜框、扶手和墙角曲线如何互相接续，让装饰顺着空间移动，而不是平均铺满。", "See how mirrors, rails and corner curves continue one another, moving ornament through space instead of spreading it evenly."),
        life("穿搭", "Clothing", "关注柔软面料、小尺度细节和不对称配件之间的轻重关系，不必把浅色直接等同于甜美。", "Consider the balance among soft fabric, small detail and an off-center accessory without treating pale color as automatically sweet."),
        life("摄影", "Photography", "寻找树影、窗帘或人物姿态形成的弯曲路径，用近距离关系表现轻松交流。", "Find a curved path through shadows, curtains or poses, and use close spacing to suggest relaxed exchange."),
        life("日常物件", "Everyday objects", "看茶具、盒盖和把手怎样在小面积中安排曲线、空白与细碎反光。", "Examine how cups, lids and handles arrange curves, open areas and small highlights within a compact surface.")
      ],
      comparisons: [
        compare("baroque", "都重视曲线、装饰、动作和感官表面。", "Both value curves, ornament, movement and sensuous surfaces.", "巴洛克常以宏大尺度、深暗背景和强烈戏剧推动叙事；洛可可更偏浅亮空间、亲密场景与松弛的不对称节奏。", "Baroque often drives narrative through monumental scale, deep shadow and drama; Rococo favors pale space, intimate scenes and relaxed asymmetry."),
        compare("art-nouveau", "都让曲线贯穿人物、植物、边框和物件。", "Both let curves travel through figures, plants, frames and objects.", "洛可可属于十八世纪宫廷与室内装饰语境，曲线轻碎且场景亲密；新艺术以十九世纪末的整体设计把植物线条接入字体、海报和现代材料。", "Rococo belongs to eighteenth-century courtly and interior contexts, with light broken curves and intimacy; Art Nouveau redirects botanical line into modern type, posters and materials.")
      ],
      reflectionPrompt: bi("这些曲线让你感到空间更自由，还是让你意识到闲适生活背后的社会距离？", "Do these curves make the space feel freer, or make you consider the social distance behind its leisure?")
    },

    neoclassicism: {
      openingQuestion: bi(
        "先别找古代服装，看看人物的轮廓和动作：画面是不是在要求每个选择都显得明确？",
        "Before identifying antique dress, study the contours and actions: does the image make every choice feel deliberate?"
      ),
      observe: [
        observe("line", "先看受控轮廓", "Begin with controlled contours", "人物边缘、手臂和衣褶常被清楚收住，笔触退到表面之后，使动作像经过排练。", "Edges of bodies, arms and drapery are clearly contained while brushwork recedes, making each action seem rehearsed."),
        observe("composition", "再看秩序分组", "Read the ordered grouping", "垂直、水平和稳定三角形把人物分成清楚阵营，空隙帮助你判断责任、选择或冲突。", "Verticals, horizontals and stable triangles divide figures into legible groups, with gaps clarifying responsibility, choice or conflict."),
        observe("tone", "最后看叙事克制", "Feel the narrative restraint", "表情和手势可以强烈，但背景、颜色和表面通常受控，让画面更像公开陈述而非私人爆发。", "Expressions and gestures may be forceful, but setting, color and surface remain controlled, turning the scene into a public statement rather than a private outburst.")
      ],
      profile: {
        order: trait(5, "秩序高度受控", "Highly controlled order"),
        color: trait(2, "色彩服务轮廓", "Color serves contour"),
        ornament: trait(2, "装饰受到约束", "Ornament is constrained"),
        emotion: trait(3, "情绪坚定克制", "Firm, restrained emotion")
      },
      feelingWords: bi(["清楚", "坚定", "克制", "公共"], ["Clear", "Resolute", "Restrained", "Public"]),
      everydayLife: [
        life("家居", "Home", "观察门、柱、桌面和座椅如何以水平垂直关系分区，让空间显得有规则但不必复古。", "Watch doors, columns, tables and chairs divide space through horizontal and vertical relations without requiring antique decor."),
        life("穿搭", "Clothing", "从清楚肩线、完整轮廓和有限配色观察衣着怎样传达正式程度，而不是模仿历史服装。", "Read formality through a clear shoulder line, complete silhouette and limited palette rather than copying historical dress."),
        life("摄影", "Photography", "把人物安排在明确分组和建筑轴线上，用手势与空隙说明关系，不依赖夸张表情。", "Place people in clear groups along architectural axes, using gestures and gaps to explain relationships without exaggerated expressions."),
        life("日常物件", "Everyday objects", "看证书、纪念品和公共标识如何用边框、中心和稳定比例传达制度感。", "See how certificates, commemorative objects and civic signs use borders, centers and stable proportion to convey institution.")
      ],
      comparisons: [
        compare("renaissance", "都借鉴古典形式，并重视比例、人物结构和清楚空间。", "Both draw on classical form and value proportion, figure structure and legible space.", "文艺复兴以透视、人体和人文研究重建可居空间；新古典主义在十八世纪重新面对古代遗存，以更冷静轮廓和道德叙事回应当代公共生活。", "Renaissance art rebuilt inhabitable space through perspective, anatomy and humanist study; Neoclassicism revisited antiquity in the eighteenth century through cooler contour and moral public narrative."),
        compare("romanticism", "两者都能处理历史、文学、政治和极端选择。", "Both can address history, literature, politics and difficult choices.", "新古典主义倾向稳定分组、收束轮廓和可读责任；浪漫主义更常让天气、色彩、运动与个人感受打破这种控制。", "Neoclassicism favors stable groups, contained contours and legible duty; Romanticism more often lets weather, color, movement and personal feeling break that control.")
      ],
      reflectionPrompt: bi("你更相信这种清楚秩序带来的说服力，还是会寻找被它压低的个人情绪？", "Do you trust the argument made by this clear order, or look for personal feelings held beneath it?")
    },

    realism: {
      openingQuestion: bi(
        "画面没有把生活整理得很体面时，你会先看人物的劳动、环境的重量，还是观看者的位置？",
        "When life has not been tidied into an ideal, do you first read the labor, the weight of the setting, or your own position as viewer?"
      ),
      observe: [
        observe("subject", "先看谁成为主体", "Ask who occupies the center", "劳动者、街道和普通室内不再只是背景，它们以完整尺度占据画面，要求被认真观看。", "Workers, streets and ordinary interiors cease to be background; they occupy full pictorial weight and demand sustained attention."),
        observe("surface", "再看未被理想化的表面", "Read the unidealized surface", "手、衣物、泥土和墙面保留磨损、重量与不规则，真实感来自具体处境而不只是像照片。", "Hands, clothes, soil and walls retain wear, weight and irregularity; truth comes from a specific condition, not mere photographic likeness."),
        observe("composition", "最后看画面立场", "Find the picture's position", "人物仍被比例、遮挡和视线精心组织，题材选择与观看距离会告诉你画面如何面对社会现实。", "Figures are still carefully organized through scale, overlap and gaze; subject choice and viewing distance reveal how the image faces social reality.")
      ],
      profile: {
        order: trait(3, "构图扎实直接", "Grounded, direct composition"),
        color: trait(2, "色彩贴近日常", "Everyday color range"),
        ornament: trait(1, "装饰主动退后", "Ornament steps back"),
        emotion: trait(4, "情绪沉着有立场", "Sober, positioned emotion")
      },
      feelingWords: bi(["日常", "沉着", "具体", "有重量"], ["Everyday", "Sober", "Specific", "Weighty"]),
      everydayLife: [
        life("家居", "Home", "观察使用痕迹、照明条件和物件摆放怎样说明谁在这里生活，而不急着把空间整理成样板。", "Read wear, available light and object placement as evidence of who lives here instead of tidying the room into a display."),
        life("穿搭", "Clothing", "留意衣物在实际动作中产生的折痕、磨损和层次，把它们当作生活信息而不是缺点。", "Treat folds, wear and layers produced by real movement as information about life rather than flaws."),
        life("摄影", "Photography", "让工作、等待或通勤保持原有环境关系，同时思考机位是否把人物变成被观看的对象。", "Keep work, waiting or commuting connected to its setting, while considering whether the camera turns people into objects of observation."),
        life("日常物件", "Everyday objects", "看工具、账本、容器和修补处如何记录使用时间，并通过排列说明具体劳动流程。", "See how tools, ledgers, containers and repairs record duration and, through arrangement, reveal a working process.")
      ],
      comparisons: [
        compare("romanticism", "都能关注社会、自然和人的处境，也都通过题材选择表达立场。", "Both address society, nature and human circumstance, expressing a position through subject choice.", "现实主义常把普通劳动与不理想化环境置于中心；浪漫主义更常借极端天气、历史事件和主观色彩放大情绪经验。", "Realism centers ordinary labor and unidealized settings; Romanticism more often amplifies feeling through extreme weather, history and subjective color."),
        compare("impressionism", "都转向现代生活、户外场景和未经英雄化的日常片段。", "Both turn toward modern life, outdoor scenes and everyday moments without heroic framing.", "现实主义更强调题材的社会位置、物质重量和持续观察；印象主义更关注瞬时光色、开放笔触和观看条件的变化。", "Realism emphasizes social position, material weight and sustained observation; Impressionism attends more to transient light, open brushwork and changing conditions of sight.")
      ],
      reflectionPrompt: bi("你觉得画面的真实来自外观相似，还是来自它选择认真面对的生活处境？", "Does the image feel truthful because it looks familiar, or because of the life it chooses to confront?")
    },

    "academic-painting": {
      openingQuestion: bi(
        "当笔触几乎消失时，看看人物、道具和背景是否像一场被完整排练过的正式演出？",
        "When brushstrokes nearly disappear, do figures, props and setting feel like a formal performance rehearsed down to every detail?"
      ),
      observe: [
        observe("finish", "先看隐藏的笔触", "Begin with the concealed brushwork", "颜色过渡和皮肤表面被反复平整，制作痕迹主动后退，让题材显得完成、连续而可信。", "Transitions and skin surfaces are repeatedly smoothed, pushing the making process behind a finished, continuous illusion."),
        observe("figure", "再看训练过的身体", "Study the trained figure", "姿态、解剖与衣褶显示长期素描和模型训练，身体常承担历史、神话或道德叙事。", "Pose, anatomy and drapery show sustained drawing and model study, with bodies carrying historical, mythic or moral narrative."),
        observe("hierarchy", "最后看题材层级", "Read the hierarchy of subject", "尺寸、中心位置、舞台式建筑和配角分布共同说明哪些题材在学院与展览体系中被赋予声望。", "Scale, central placement, staged architecture and supporting figures reveal which subjects received prestige within academies and exhibitions.")
      ],
      profile: {
        order: trait(5, "训练秩序严密", "Rigorous trained order"),
        color: trait(3, "色彩过渡完整", "Fully modeled color"),
        ornament: trait(4, "细节完成度高", "Highly finished detail"),
        emotion: trait(3, "情绪正式戏剧", "Formal dramatic tone")
      },
      feelingWords: bi(["正式", "完成", "训练", "舞台感"], ["Formal", "Finished", "Trained", "Staged"]),
      everydayLife: [
        life("家居", "Home", "观察正式空间如何用中心轴、陈列高度和完整照明建立等级，而不把这种秩序当作唯一标准。", "See how formal rooms establish hierarchy through axes, display height and complete lighting without treating that order as the only standard."),
        life("穿搭", "Clothing", "从结构、合体程度和面料转折判断正式感，关注身体如何被轮廓组织而非复制历史服装。", "Read formality through structure, fit and fabric modeling, focusing on how the silhouette organizes the body rather than copying period dress."),
        life("摄影", "Photography", "用预先安排的姿态、道具和均衡照明观察制作痕迹如何被藏起，同时保留人物的主体性。", "Use planned poses, props and balanced light to study how production disappears while preserving the sitter's agency."),
        life("日常物件", "Everyday objects", "看奖章、证书和陈列品怎样依靠边框、材质和精细收尾表达制度认可。", "Examine how medals, certificates and display objects use framing, material and finish to express institutional recognition.")
      ],
      comparisons: [
        compare("neoclassicism", "都重视素描、清楚轮廓、古典范例和正式历史题材。", "Both value drawing, clear contour, classical precedent and formal history subjects.", "新古典主义是一种强调克制秩序与古代道德叙事的风格方向；学院绘画更指训练、评审和展览制度，可容纳多种历史风格。", "Neoclassicism is a stylistic direction centered on controlled order and antique moral narrative; Academic Painting describes systems of training, judgment and exhibition that could contain several styles."),
        compare("pre-raphaelite", "都展现精密制作、文学题材和高度完成的表面。", "Both can show meticulous making, literary subjects and highly finished surfaces.", "学院绘画常以理想化人体、层级题材和隐藏笔触证明训练；前拉斐尔派反对部分学院惯例，以清晰颜色、近距离自然和均等细节重新组织表面。", "Academic Painting often demonstrates training through ideal bodies, ranked subjects and concealed brushwork; the Pre-Raphaelites challenged parts of that system with lucid color, close nature study and evenly sharp detail.")
      ],
      reflectionPrompt: bi("精细完成让你更容易进入故事，还是让你开始追问谁制定了这种完成标准？", "Does the polished finish draw you into the story, or make you ask who defined that standard?")
    },

    "pre-raphaelite": {
      openingQuestion: bi(
        "当人物、花草和衣料都同样清楚时，你的视线会停在主角，还是不断被细节拉走？",
        "When figures, plants and fabric are equally clear, does your eye stay with the protagonist or keep being drawn into detail?"
      ),
      observe: [
        observe("detail", "先看均等清晰度", "Begin with equal sharpness", "前景花叶、远处物件和人物衣饰都保留鲜明边缘，背景不轻易退成模糊陪衬。", "Foreground plants, distant objects and clothing all retain crisp edges; the background rarely dissolves into soft support."),
        observe("color", "再看清亮颜色", "Watch the lucid color", "透明层次与明亮底色让红、绿、蓝显得清澈，颜色把自然细节和文学气氛同时推近。", "Transparent layers and bright grounds make reds, greens and blues unusually lucid, bringing natural detail and literary mood equally close."),
        observe("relation", "最后看人物与自然", "Connect figure and nature", "植物、季节、手势与物件会围绕人物形成密集关系，但含义需由具体作品语境判断。", "Plants, season, gesture and objects form dense relations around the figure, but their meanings depend on the context of each work.")
      ],
      profile: {
        order: trait(4, "细节组织紧密", "Tightly organized detail"),
        color: trait(4, "色彩清亮饱和", "Lucid, saturated color"),
        ornament: trait(4, "表面信息丰富", "Information-rich surface"),
        emotion: trait(4, "情绪文学浓郁", "Literary, intense mood")
      },
      feelingWords: bi(["清澈", "密集", "文学", "专注"], ["Lucid", "Dense", "Literary", "Attentive"]),
      everydayLife: [
        life("家居", "Home", "观察植物、织物和小物件是否都被同样认真照亮，以及密集细节怎样仍围绕一个叙事中心。", "See whether plants, textiles and small objects receive equal attention, and how dense detail still gathers around one narrative center."),
        life("穿搭", "Clothing", "关注纹理、颜色与自然光的关系，不必借用具体文学人物或把长发、长裙当成唯一标志。", "Attend to texture, color and daylight without borrowing a literary character or treating long hair and dress as defining signs."),
        life("摄影", "Photography", "选择细节丰富的自然环境，让前后景保持清楚，再用人物目光或手势稳住故事。", "Choose a richly detailed natural setting, keep foreground and distance clear, and anchor the story through gaze or gesture."),
        life("日常物件", "Everyday objects", "看插图书、植物标本和织物如何让微小形状保持可辨，并通过重复颜色建立联系。", "Look at illustrated books, botanical specimens and textiles to see how tiny forms remain legible and repeated colors create links.")
      ],
      comparisons: [
        compare("romanticism", "都借助文学、自然和强烈个人情境建立情绪。", "Both build emotion through literature, nature and intense personal situations.", "浪漫主义常以天气、运动和尺度放大情感；前拉斐尔派更常以清晰光色、近距离自然研究和几乎均等的细节密度制造沉浸。", "Romanticism often enlarges feeling through weather, motion and scale; the Pre-Raphaelites more often immerse through lucid color, close nature study and nearly equal detail."),
        compare("art-nouveau", "都可见植物曲线、清楚轮廓和人物与装饰表面的结合。", "Both can combine botanical curves, clear contours and figures with decorative surfaces.", "前拉斐尔派主要以绘画重访文学、自然和中世纪题材；新艺术把有机线条发展为海报、字体、建筑和物件的整体设计语言。", "The Pre-Raphaelites primarily revisited literature, nature and medieval subjects through painting; Art Nouveau developed organic line across posters, type, architecture and objects.")
      ],
      reflectionPrompt: bi("这些同样清楚的细节让故事更真实，还是让你怀疑真正的主角可能是整个环境？", "Do these equally sharp details make the story more real, or suggest that the whole environment may be the protagonist?")
    },

    monet: {
      openingQuestion: bi(
        "如果同一处景物过一小时再画一次，最先变化的会是物体本身，还是物体周围的光和空气？",
        "If the same place were painted again an hour later, what would change first: the object itself, or the light and air around it?"
      ),
      observe: [
        observe("light", "先看光色关系", "Begin with light becoming color", "阴影不只是加黑，而会转成蓝、紫、绿等相邻色；亮处也由多种色点共同闪动。", "Shadows are not simply darkened but shift into blues, violets and greens, while highlights flicker through several adjacent hues."),
        observe("surface", "再看水雾与反光", "Watch water, mist and reflection", "水面、雾气、雪和花园会打散物体边缘，笔触记录空气如何改变你能看清的程度。", "Water, mist, snow and gardens break up edges, with strokes recording how atmosphere changes what can be seen."),
        observe("time", "最后想象系列", "Imagine the sequence", "同一地点在不同时间、天气与季节中反复出现，稳定的对象成为比较光线变化的坐标。", "The same site returns across hours, weather and seasons, turning a stable subject into a measure of changing light.")
      ],
      profile: {
        order: trait(2, "结构被光线软化", "Structure softened by light"),
        color: trait(5, "光色变化丰富", "Highly varied light-color"),
        ornament: trait(2, "细节融入笔触", "Detail dissolves into strokes"),
        emotion: trait(3, "情绪开放流动", "Open, flowing mood")
      },
      feelingWords: bi(["闪动", "湿润", "短暂", "空气感"], ["Flickering", "Moist", "Transient", "Atmospheric"]),
      everydayLife: [
        life("家居", "Home", "比较同一面墙在早晚、晴雨和不同窗帘下的颜色变化，暂时别急着给它一个固定色名。", "Compare one wall across morning, evening, weather and curtains before assigning it a fixed color name."),
        life("穿搭", "Clothing", "观察面料在日光、树影和反光环境中怎样变色，把颜色理解为与周围光线共同发生。", "Watch fabric change under daylight, tree shadow and reflected light, treating color as something produced with its surroundings."),
        life("摄影", "Photography", "在不同时间重复拍摄同一地点，比较水面、雾气、天空和反光怎样改变边缘。", "Return to one site at different times and compare how water, mist, sky and reflection alter its edges."),
        life("日常物件", "Everyday objects", "看玻璃、金属和湿润表面如何借来周围颜色，理解物体色并不总是稳定。", "See how glass, metal and wet surfaces borrow surrounding hues, revealing that object color is not always stable.")
      ],
      comparisons: [
        compare("impressionism", "都使用开放笔触、户外光线和现代生活片段研究瞬时观看。", "Both use open brushwork, outdoor light and modern-life fragments to study momentary vision.", "Impressionism 是包含多位艺术家与不同方法的流派；Monet 的个人语言尤其持续于系列、同址重访、水面、花园、雾气与反光中的光色变化。", "Impressionism includes many artists and approaches; Monet's language is especially sustained through series, revisited sites, water, gardens, mist and reflected light."),
        compare("renoir", "都与印象主义相关，也用碎笔触和明亮色彩处理户外光。", "Both are associated with Impressionism and use broken strokes and bright color in outdoor light.", "Monet 常让景物成为测量时间与空气的场域；Renoir 更常把注意力放在人物、肌肤、社交场景与温暖光色的流动。", "Monet often turns landscape into a field for measuring time and atmosphere; Renoir more often centers figures, skin, sociability and warm moving light.")
      ],
      reflectionPrompt: bi("你看到的是一个固定地点，还是光线暂时把它变成的这一刻？", "Are you seeing a fixed place, or what light has temporarily made of it at this moment?")
    },

    cezanne: {
      openingQuestion: bi(
        "桌面似乎有点倾斜、杯口又不完全一致时，画面是在出错，还是在记录眼睛不断移动？",
        "When the table tilts and rims do not quite agree, is the image failing, or recording an eye that keeps moving?"
      ),
      observe: [
        observe("volume", "先看色块建体积", "Build volume through color", "物体不是主要靠黑白阴影塑形，短小色块在冷暖与深浅之间累积出苹果、山体和身体的重量。", "Objects are not modeled mainly by black and white shadow; short color patches accumulate warmth, coolness and depth into the weight of fruit, mountain or body."),
        observe("viewpoint", "再看移动视点", "Let the viewpoint shift", "桌边、杯口和地平线可能各自略向不同方向，像眼睛在观看过程中移动后留下多个判断。", "Table edges, rims and horizons may tilt in different directions, as if several judgments from a moving gaze remain visible."),
        observe("structure", "最后看观察与结构", "Join seeing to structure", "轮廓常被重复寻找，局部保留未完成感；画面一边确认对象，一边重新组织空间。", "Contours are searched more than once and areas may remain unresolved; the image confirms an object while reorganizing the space around it.")
      ],
      profile: {
        order: trait(4, "结构持续校准", "Structure under continual adjustment"),
        color: trait(4, "色块承担造型", "Color patches build form"),
        ornament: trait(1, "装饰很少", "Very little ornament"),
        emotion: trait(3, "情绪专注沉着", "Focused, steady mood")
      },
      feelingWords: bi(["结实", "搜寻", "多视点", "缓慢"], ["Solid", "Searching", "Multi-view", "Deliberate"]),
      everydayLife: [
        life("家居", "Home", "从不同座位看同一张桌子，比较边缘、杯口和物件遮挡如何随身体位置改变。", "View one table from several seats and compare how its edges, rims and overlaps change with your body position."),
        life("穿搭", "Clothing", "观察大色块怎样绕过肩、胸和腿建立体积，不只依赖清楚外轮廓或明暗渐变。", "See how broad color patches turn around shoulders, torso and legs to build volume without relying only on a clean outline or smooth shading."),
        life("摄影", "Photography", "围绕静物移动并拍摄几个角度，比较单张透视与连续观看提供的信息差异。", "Move around a still life and photograph several angles, comparing single-point perspective with the information of continuous looking."),
        life("日常物件", "Everyday objects", "把水果、瓶子和布料并置，观察圆体、斜面和空隙怎样通过颜色互相支撑。", "Arrange fruit, bottles and cloth, then see how rounded volumes, tilted planes and gaps support one another through color.")
      ],
      comparisons: [
        compare("post-impressionism", "都从印象主义的开放笔触与现代色彩出发，进一步强化个人结构。", "Both begin from Impressionist openness and modern color, then strengthen personal structure.", "Post-Impressionism 是包含多条艺术道路的总称；Cézanne 特别以重复轮廓、色块体积和移动视点连接直接观察与空间构造。", "Post-Impressionism names several artistic paths; Cézanne particularly joins direct observation to constructed space through repeated contours, color volume and shifting viewpoints."),
        compare("picasso-cubism", "都松动单一透视，并让对象的结构比瞬时外观更重要。", "Both loosen single-point perspective and value an object's structure over one instant appearance.", "Cézanne仍在持续观察中以色块建立可辨对象；Picasso参与的立体主义进一步拆分平面、并置多角度，并把拼贴材料带入画面。", "Cézanne still builds recognizable objects through sustained observation and color; Cubism, with Picasso among its participants, further fractures planes, combines viewpoints and introduces collage.")
      ],
      reflectionPrompt: bi("你希望空间保持一次观看的统一，还是愿意让多次观看同时留在画面里？", "Do you want space to preserve one unified view, or allow several moments of looking to remain at once?")
    },

    matisse: {
      openingQuestion: bi(
        "当墙、桌面和人物都被压成大色块时，空间消失了吗，还是换了一种更平面的呼吸方式？",
        "When wall, table and figure become broad fields of color, has space vanished, or learned to breathe in a flatter way?"
      ),
      observe: [
        observe("color", "先看色块关系", "Begin with the color fields", "颜色不必服从物体固有色，大面积红、蓝、绿会互相推拉，同时决定人物与室内的距离。", "Color need not obey local appearance; broad reds, blues and greens push and pull one another, setting distance between figure and room."),
        observe("line", "再看轮廓节奏", "Follow the contour rhythm", "简化线条绕过身体、家具和植物，轮廓既分隔形状，也像书写一样让视线连续移动。", "Simplified lines circle bodies, furniture and plants, separating shapes while carrying the eye with the rhythm of handwriting."),
        observe("space", "最后看装饰空间", "Enter the decorative space", "壁纸、地毯、窗景和人物共享平面纹样，前后关系被压缩，却仍通过重叠和色差保持室内感。", "Wallpaper, rugs, windows and figures share flat pattern; depth is compressed yet survives through overlap and color difference.")
      ],
      profile: {
        order: trait(3, "构图自由平衡", "Freely balanced composition"),
        color: trait(5, "色彩主导空间", "Color governs space"),
        ornament: trait(4, "图案融入结构", "Pattern joins structure"),
        emotion: trait(4, "情绪明亮舒展", "Bright, expansive mood")
      },
      feelingWords: bi(["明亮", "舒展", "平面", "有节奏"], ["Bright", "Expansive", "Flat", "Rhythmic"]),
      everydayLife: [
        life("家居", "Home", "观察墙面、织物、植物和窗景怎样通过大色块相互呼应，让图案参与空间而不是只作点缀。", "See how walls, textiles, plants and windows answer one another through broad color, making pattern part of the room rather than an accent."),
        life("穿搭", "Clothing", "关注完整轮廓与两三块颜色的关系，让线条和色面组织身体，不必复制具体剪纸形状。", "Attend to the relation between a complete silhouette and two or three colors, letting line and field organize the body without copying a specific cutout."),
        life("摄影", "Photography", "寻找人物与墙、桌布或植物之间的色彩呼应，用正面构图压缩空间并保留重叠。", "Find color echoes among a person, wall, cloth or plant, using a frontal composition to compress depth while preserving overlap."),
        life("日常物件", "Everyday objects", "看餐盘、书封和纸张剪形怎样用连续轮廓与纯色区域形成轻快节奏。", "Look at plates, book covers and cut paper to see how continuous contour and unmodulated color create buoyant rhythm.")
      ],
      comparisons: [
        compare("fauvism", "都使用非自然色、简化轮廓和直接笔触释放颜色力量。", "Both release color through non-natural hues, simplified contours and direct handling.", "野兽派指一段较集中的群体实践；Matisse 的长期语言继续发展装饰室内、平面空间、流动线条与晚期剪纸节奏。", "Fauvism names a concentrated group practice; Matisse's longer language continued through decorative interiors, flattened space, flowing line and late cut-paper rhythm."),
        compare("picasso-cubism", "都重新处理人物、静物与室内空间，不服从传统透视。", "Both rethink figure, still life and interior without obeying traditional perspective.", "Matisse常让大色块、轮廓和图案保持感官连续；立体主义更常拆分物体、交错正负空间，并把多个角度压进同一结构。", "Matisse often preserves sensuous continuity through broad color, contour and pattern; Cubism more often fractures objects, interlocks positive and negative space, and compresses several views.")
      ],
      reflectionPrompt: bi("你需要透视才能相信一个室内，还是颜色、轮廓和重叠已经足够？", "Do you need perspective to believe in a room, or are color, contour and overlap enough?")
    },

    "picasso-cubism": {
      openingQuestion: bi(
        "如果你能同时看到一个物体的正面、侧面和内部，哪一块会最先让你重新认出它？",
        "If front, side and interior appeared at once, which fragment would let you recognize the object again?"
      ),
      observe: [
        observe("viewpoint", "先看多角度并置", "Begin with several viewpoints", "眼睛、杯口、桌面或乐器会同时出现正面与侧面线索，单一固定机位被拆开。", "Eyes, rims, tabletops or instruments combine frontal and side clues, breaking apart the authority of one fixed viewpoint."),
        observe("space", "再看正负空间", "Track positive and negative space", "物体边缘与背景平面互相穿插，空隙不再只是剩余区域，而成为形体结构的一部分。", "Object edges and background planes interlock; gaps stop being leftover space and become active parts of the construction."),
        observe("material", "最后看拼贴材料", "Finish with collage material", "报纸、墙纸、木纹或文字片段可以直接进入作品，让真实材料与被描绘的物体互相质疑。", "Newspaper, wallpaper, wood grain or fragments of type can enter directly, making actual material and represented object question one another.")
      ],
      profile: {
        order: trait(4, "碎片结构严密", "Tightly constructed fragments"),
        color: trait(2, "色彩常被压低", "Color often subdued"),
        ornament: trait(2, "材料不是装饰", "Material is not mere ornament"),
        emotion: trait(3, "情绪分析又机敏", "Analytical, alert mood")
      },
      feelingWords: bi(["拆分", "多角度", "拼贴", "机敏"], ["Fragmented", "Multi-view", "Collaged", "Alert"]),
      everydayLife: [
        life("家居", "Home", "从门口、桌边和镜面同时观察一个房间，比较不同角度提供的形状怎样在记忆里合成。", "Observe one room from doorway, table and mirror, comparing how shapes from different angles combine in memory."),
        life("穿搭", "Clothing", "看衣片接缝、重叠层次和正侧轮廓如何把身体分成相互连接的平面，而非模仿具体人物。", "See how seams, layers and front-side contours divide the body into connected planes without imitating a particular figure."),
        life("摄影", "Photography", "通过玻璃反射、重复曝光或连续取景并置多个视点，同时保留主体可辨的关键线索。", "Combine viewpoints through reflection, repeated exposure or sequential framing while preserving clues that keep the subject recognizable."),
        life("日常物件", "Everyday objects", "拆看包装、票据和标签的材质关系，观察文字既能被阅读，也能成为形状和表面。", "Examine packaging, receipts and labels to see how type can be read while also acting as shape and surface.")
      ],
      comparisons: [
        compare("cezanne", "都挑战固定透视，并通过结构分析人物、静物和空间。", "Both challenge fixed perspective and analyze figure, still life and space through structure.", "Cézanne以持续观察、色块和重复轮廓让视点缓慢移动；立体主义进一步拆分平面、压缩多角度，并引入拼贴。", "Cézanne lets viewpoint shift gradually through sustained looking, color patches and repeated contour; Cubism fractures planes further, compresses views and introduces collage."),
        compare("constructivism", "都使用几何切分、拼贴和现代印刷材料重组画面。", "Both reorganize images through geometric division, collage and modern printed material.", "立体主义从观看物体与画面空间的问题出发；构成主义更常把斜向几何、摄影和字体投入公共传播与集体行动。", "Cubism begins with problems of seeing objects and pictorial space; Constructivism more often directs diagonal geometry, photography and type toward public communication and collective action.")
      ],
      reflectionPrompt: bi("形体被拆开后，你是在重新理解物体，还是更注意画面本身如何被制造？", "Once form is broken apart, are you understanding the object anew, or noticing how the picture itself is made?")
    },

    "gustav-klimt": {
      openingQuestion: bi(
        "当人物的脸和手仍有体积，而身体周围变成金色纹样时，你觉得人是在浮现，还是被表面包围？",
        "When face and hands retain volume but the body enters a field of gold pattern, does the person emerge or become enclosed by the surface?"
      ),
      observe: [
        observe("figure", "先看身体与平面", "Begin with body and plane", "脸、手和少量皮肤常以较自然的体积出现，服装与背景却压成连续图案，两种空间彼此拉扯。", "Faces, hands and small areas of skin often retain natural volume while dress and background flatten into continuous pattern, creating tension between two spaces."),
        observe("surface", "再看金色与镶嵌感", "Read gold and mosaic-like surface", "金色、方块、圆形与重复小图形让画面反光并减弱纵深，但不同作品的材料与密度并不相同。", "Gold, squares, circles and repeated small motifs create shimmer and reduce depth, though materials and density vary across works."),
        observe("line", "最后看轮廓关系", "Follow the enclosing contour", "流动外轮廓会把人物、衣物和背景连接起来，同时面孔的目光与姿态仍保留个体存在。", "A flowing outer contour joins figure, clothing and ground, while gaze and posture preserve the sitter's individual presence.")
      ],
      profile: {
        order: trait(4, "纹样秩序密集", "Dense patterned order"),
        color: trait(4, "金色对比突出", "Pronounced gold contrast"),
        ornament: trait(5, "装饰占据表面", "Ornament fills the surface"),
        emotion: trait(4, "情绪亲密又疏离", "Intimate yet distant mood")
      },
      feelingWords: bi(["闪耀", "包围", "亲密", "平面"], ["Shimmering", "Enclosing", "Intimate", "Planar"]),
      everydayLife: [
        life("家居", "Home", "观察反光表面、几何织物和人物照片怎样保持主次，让装饰围绕生活者而不是吞没他们。", "See how reflective surfaces, geometric textiles and portraits preserve hierarchy, allowing ornament to surround inhabitants without consuming them."),
        life("穿搭", "Clothing", "留意脸、手与大面积纹样服装之间的张力，让身体姿态仍是主体而非图案展示架。", "Attend to the tension between face, hands and patterned clothing, keeping bodily presence central rather than turning it into a pattern display."),
        life("摄影", "Photography", "用反光墙面或密集背景包围人物，同时保留清楚目光、手势和轮廓边界。", "Surround a sitter with a reflective or dense ground while keeping gaze, gesture and contour clearly present."),
        life("日常物件", "Everyday objects", "看首饰、书封和盒面如何通过重复小形、金属反光与少量空白控制密度。", "Examine how jewelry, book covers and boxes control density through repeated small forms, metallic reflection and limited open space.")
      ],
      comparisons: [
        compare("art-nouveau", "都使用流动轮廓、植物线条和整体装饰表面。", "Both use flowing contour, botanical line and integrated decorative surfaces.", "Art Nouveau 是跨建筑、海报、字体与物件的广泛设计运动；Klimt 的个人绘画语言更集中于人物体积与金色、镶嵌式平面之间的张力。", "Art Nouveau is a broad movement across architecture, posters, type and objects; Klimt's painting language focuses more specifically on tension between bodily volume and gold, mosaic-like planes."),
        compare("byzantine-icon", "都可见金色背景、正面性、平面化与镶嵌般的重复节奏。", "Both may show gold grounds, frontality, flatness and mosaic-like repetition.", "拜占庭圣像属于礼仪、信仰和特定图像传统；Klimt 借鉴相关表面语言进入现代肖像、寓意与维也纳视觉文化，功能与语境不同。", "Byzantine icons belong to liturgical, devotional and specific image traditions; Klimt redirected related surface language into modern portraiture, allegory and Viennese visual culture.")
      ],
      reflectionPrompt: bi("装饰越密集时，你仍先看见人物，还是先感受到人物与表面之间的距离？", "As ornament grows denser, do you still see the person first, or feel the distance between person and surface?")
    },

    kandinsky: {
      openingQuestion: bi(
        "如果这些点、线和色块不是在画物体，它们靠什么让你感到一次加速、停顿或转向？",
        "If these points, lines and colors do not describe objects, what makes you feel an acceleration, pause or turn?"
      ),
      observe: [
        observe("movement", "先跟随方向", "Follow the directional movement", "斜线、弧线和尖角向不同方向施力，密集处像加速，孤立形状则让视线暂时停住。", "Diagonals, arcs and angles apply force in different directions; crowded passages accelerate while isolated forms create pauses."),
        observe("relation", "再看形色张力", "Read tensions among forms", "圆、三角和不规则色块通过距离、重叠与尺度互相回应，情绪来自关系而非单个颜色的固定含义。", "Circles, triangles and irregular fields answer through distance, overlap and scale; feeling arises from relations, not a fixed meaning assigned to one color."),
        observe("rhythm", "最后听见节奏", "Sense the rhythm", "音乐可以帮助理解重复、对位与停顿，但画面不是乐谱翻译，每次观看仍可形成不同节奏。", "Music can suggest repetition, counterpoint and pause, but the image is not a score translated into color; each viewing can form a different rhythm.")
      ],
      profile: {
        order: trait(3, "关系秩序开放", "Open relational order"),
        color: trait(5, "色彩主动施力", "Color acts with force"),
        ornament: trait(2, "形状承担结构", "Shapes carry structure"),
        emotion: trait(5, "情绪活跃多变", "Active, shifting emotion")
      },
      feelingWords: bi(["运动", "张力", "停顿", "回响"], ["Motion", "Tension", "Pause", "Resonance"]),
      everydayLife: [
        life("家居", "Home", "观察圆桌、斜灯和墙面色块之间的距离与方向，体会物件关系怎样产生节奏而非寻找固定象征。", "Read distance and direction among a round table, angled lamp and wall color, sensing rhythm without searching for fixed symbols."),
        life("穿搭", "Clothing", "关注线条方向、色块大小与身体动作的呼应，让关系产生动感，不为每种颜色指定情绪。", "Relate line direction and color-field size to bodily movement, letting their interaction create energy without assigning an emotion to each hue."),
        life("摄影", "Photography", "寻找电线、路标、圆形物与阴影的方向冲突，把取景当作组织加速和停顿。", "Find directional conflict among wires, signs, circles and shadows, treating framing as an arrangement of acceleration and pause."),
        life("日常物件", "Everyday objects", "看地图、积木和桌面散物如何通过间距、角度和重复形成可感节奏。", "See how maps, blocks and scattered desk objects form a felt rhythm through spacing, angle and repetition.")
      ],
      comparisons: [
        compare("expressionism", "都允许颜色、线条和形变直接承担主观情绪。", "Both allow color, line and deformation to carry subjective experience.", "Expressionism 常保留人物、城市或风景作为情绪载体；Kandinsky 的抽象语言逐步让点、线、色块及其关系本身成为画面事件。", "Expressionism often retains figures, cities or landscapes as emotional carriers; Kandinsky's abstraction increasingly makes points, lines, color fields and their relations the event."),
        compare("mondrian", "两者都从自然观察走向抽象，并研究基本形色之间的关系。", "Both moved from natural observation toward abstraction and studied relations among basic forms and colors.", "Kandinsky 的画面常保留斜向、曲线、密度变化和即兴运动；Mondrian 更集中于垂直水平、矩形、不对称平衡与持续校准的网格。", "Kandinsky often retains diagonals, curves, changing density and improvisatory motion; Mondrian concentrates on vertical-horizontal relations, rectangles, asymmetric balance and calibrated grids.")
      ],
      reflectionPrompt: bi("你会为这些形色寻找一个故事，还是愿意只跟随它们之间的力量变化？", "Do you search for a story in these forms and colors, or simply follow the changing forces between them?")
    },

    mondrian: {
      openingQuestion: bi(
        "先忽略红黄蓝，看看白色区域和黑线：哪一次宽窄变化让画面没有倒向任何一边？",
        "Ignore red, yellow and blue for a moment: which shift in white space or black-line width keeps the image from tipping to one side?"
      ),
      observe: [
        observe("axis", "先看垂直与水平", "Begin with vertical and horizontal", "线条只沿两个方向相遇，取消斜线与曲线，却通过长短、断开和延伸保持内部运动。", "Lines meet along only two directions, removing diagonals and curves while retaining movement through length, interruption and extension."),
        observe("balance", "再看不对称平衡", "Test the asymmetric balance", "色块并不居中或镜像，较小的强色会与较大的白区互相校正，使重量保持悬而未决。", "Color blocks are neither centered nor mirrored; a small intense field counterbalances a larger white area, keeping weight actively unresolved."),
        observe("process", "最后看逐步抽象", "Remember the path from nature", "树、海岸和建筑曾在他的作品中逐渐被压缩成方向与比例，网格不是突然出现的装饰公式。", "Trees, coasts and buildings were gradually compressed into direction and proportion; the grid did not appear suddenly as a decorative formula.")
      ],
      profile: {
        order: trait(5, "网格秩序精确", "Precisely calibrated grid"),
        color: trait(3, "少量主色制衡", "Few primary colors balance"),
        ornament: trait(1, "装饰降到最低", "Ornament reduced to a minimum"),
        emotion: trait(2, "情绪安静而活跃", "Quiet yet active mood")
      },
      feelingWords: bi(["平衡", "清醒", "校准", "开放"], ["Balanced", "Lucid", "Calibrated", "Open"]),
      everydayLife: [
        life("家居", "Home", "观察门窗、搁板和空墙形成的水平垂直关系，比较不对称布局怎样仍保持平衡。", "Read the horizontal and vertical relations among doors, shelves and open wall, comparing how asymmetry can remain balanced."),
        life("穿搭", "Clothing", "把注意力放在接缝、分区和大小色块的制衡，不必复制红黄蓝方格。", "Focus on seams, divisions and the balance of differently sized color areas without copying a red-yellow-blue grid."),
        life("摄影", "Photography", "正面拍摄建筑边线与空白区域，让一个小色点和大片中性色互相牵制。", "Photograph architectural edges and open areas frontally, allowing one small color accent to counter a broad neutral field."),
        life("日常物件", "Everyday objects", "看日历、窗格和收纳分区如何通过线宽、间隔与空白建立秩序。", "See how calendars, window grids and storage divisions create order through line width, intervals and empty space.")
      ],
      comparisons: [
        compare("de-stijl", "都使用几何抽象、垂直水平和有限颜色追求整体秩序。", "Both pursue overall order through geometric abstraction, vertical-horizontal structure and limited color.", "De Stijl 是包含建筑、家具、字体和多位艺术家的运动；Mondrian 的个人绘画是在长期自然观察后持续校准线、白区与色块关系。", "De Stijl is a movement spanning architecture, furniture, type and several artists; Mondrian's painting continually recalibrated line, white fields and color after long study of nature."),
        compare("minimalism", "都减少元素，让比例、边界、重复和空白成为主要内容。", "Both reduce elements until proportion, edge, repetition and space become central.", "Mondrian 的网格保留主色与不对称关系的动态平衡；Minimalism 是更广的后期方向，常强调实际材料、连续模块和物体与场地。", "Mondrian's grid retains dynamic balance among primary color and asymmetry; Minimalism is a broader later direction often emphasizing literal material, serial modules and object-site relations.")
      ],
      reflectionPrompt: bi("画面元素这么少时，你感到秩序已经完成，还是仍在不断微调？", "With so few elements, does the order feel complete, or still under continual adjustment?")
    },

    rothko: {
      openingQuestion: bi(
        "站远一点和靠近一点时，这几块颜色的边缘、重量和包围感会发生什么变化？",
        "What changes in edge, weight and sense of enclosure when you view these color fields from farther away and then closer?"
      ),
      observe: [
        observe("scale", "先感受尺度", "Begin with bodily scale", "大画幅让色块接近身体范围，观看不只是在识别构图，也包含你与画面距离的变化。", "Large canvases bring fields of color toward bodily scale, so looking involves changing your distance rather than only identifying composition."),
        observe("edge", "再看柔软边缘", "Watch the softened edges", "矩形边界并不硬切，薄层颜色向周围渗开，使色块像停在表面之前或之后。", "Rectangular boundaries do not cut sharply; thin layers feather outward, making fields seem to hover before or behind the surface."),
        observe("relation", "最后让情绪开放", "Leave the feeling open", "上下色层通过明暗、温度和间距彼此影响，但它们不会保证所有观众得到同一种宗教或悲伤体验。", "Stacked fields affect one another through value, temperature and spacing, but they do not guarantee one religious or sorrowful response for every viewer.")
      ],
      profile: {
        order: trait(3, "结构简单悬浮", "Simple, hovering structure"),
        color: trait(5, "色层关系主导", "Layered color dominates"),
        ornament: trait(1, "几乎没有装饰", "Almost no ornament"),
        emotion: trait(5, "情绪深但开放", "Deep but open emotion")
      },
      feelingWords: bi(["包围", "悬浮", "呼吸", "沉浸"], ["Enveloping", "Hovering", "Breathing", "Immersive"]),
      everydayLife: [
        life("家居", "Home", "比较一面大色墙在远近位置和不同光线下的包围感，关注边缘与相邻色的作用。", "Compare how a large colored wall encloses you from different distances and light, attending to edges and neighboring hues."),
        life("穿搭", "Clothing", "观察相近色层在面料重叠处怎样产生深度，不必把深色自动解释为悲伤。", "See how neighboring color layers create depth where fabrics overlap without automatically reading dark color as sadness."),
        life("摄影", "Photography", "用雾、幕布或虚化边缘形成大面积色域，并比较观看距离怎样改变空间感。", "Use mist, fabric or softened edges to form broad color fields, then compare how viewing distance changes the space."),
        life("日常物件", "Everyday objects", "看纸张叠层、磨砂玻璃和渐染表面如何让矩形边界显得呼吸而非硬切。", "Look at layered paper, frosted glass and stained surfaces to see how rectangular boundaries can breathe rather than cut.")
      ],
      comparisons: [
        compare("color-field-painting", "都以大面积颜色、弱化中心图形和沉浸观看减少具象叙事。", "Both reduce figurative narrative through broad color, weakened central figure and immersive viewing.", "Color Field Painting 是包含多位艺术家、染色方法、色带与开放表面的广泛方向；Rothko 的个人语言尤其常见层叠矩形、柔边和亲密观看距离。", "Color Field Painting is a broader direction including many artists, staining methods, bands and open surfaces; Rothko's language is especially associated with stacked rectangles, soft edges and intimate viewing distance."),
        compare("minimalism", "都减少元素、放大尺度，并让观看者与作品的距离变得重要。", "Both reduce elements, enlarge scale and make the viewer's distance important.", "Rothko 以薄层色彩与柔边形成开放情绪关系；Minimalism 更常强调物体的实际材料、模块、边界和现场空间，避免绘画式情绪引导。", "Rothko uses thin color layers and soft edges to open emotional relations; Minimalism more often stresses literal material, modules, edges and site while resisting painterly emotional guidance.")
      ],
      reflectionPrompt: bi("这些颜色是否改变了你站立和呼吸的节奏，还是先让你分析它们的结构？", "Do these colors alter the rhythm of your standing and breathing, or make you analyze their structure first?")
    },

    expressionism: {
      openingQuestion: bi(
        "如果形状和颜色不再负责准确描述现实，它们正在替哪一种感受增加音量？",
        "If shape and color no longer aim to describe reality accurately, which experience are they turning up?"
      ),
      observe: [
        observe("form", "先看主动形变", "Begin with deliberate distortion", "脸、身体、建筑或风景会被拉长、压缩和扭转，变化服务主观经验而非解剖准确。", "Faces, bodies, buildings or landscapes stretch, compress and twist in service of subjective experience rather than anatomical accuracy."),
        observe("color", "再看情绪色彩", "Read expressive color", "颜色可以偏离自然外观，冷暖冲突、突兀邻接或大面积饱和共同加强心理距离。", "Color can depart from natural appearance; clashes of temperature, abrupt adjacency and saturation intensify psychological distance."),
        observe("surface", "最后看留下的动作", "See the retained gesture", "粗线、厚笔触和刮擦痕迹让制作动作留在表面，画面像一次正在发生的反应。", "Heavy lines, thick strokes and scraping retain the act of making, so the image feels like a response still taking place.")
      ],
      profile: {
        order: trait(2, "秩序服从感受", "Order bends to experience"),
        color: trait(5, "色彩情绪强烈", "Emotionally forceful color"),
        ornament: trait(1, "装饰不是重点", "Ornament is not central"),
        emotion: trait(5, "主观情绪外显", "Subjective emotion exposed")
      },
      feelingWords: bi(["主观", "扭曲", "直接", "高张力"], ["Subjective", "Distorted", "Direct", "Tense"]),
      everydayLife: [
        life("家居", "Home", "观察光线、倾斜家具和强烈颜色怎样改变同一房间的心理感受，而不把凌乱等同于某种情绪。", "See how light, tilted furniture and forceful color alter a room psychologically without treating disorder as one fixed emotion."),
        life("穿搭", "Clothing", "留意拉长轮廓、冲突色和粗糙表面怎样表达状态，同时避免把具体身体特征当作夸张素材。", "Attend to elongated silhouette, clashing hues and rough surface as expressions of state without using bodily features as material for caricature."),
        life("摄影", "Photography", "用倾斜机位、局部强色或运动模糊表达观看感受，并保留被摄者的尊严和语境。", "Use tilt, isolated strong color or motion blur to express a way of seeing while preserving the sitter's dignity and context."),
        life("日常物件", "Everyday objects", "看手写字、磨损标牌和快速草图如何通过压力、速度与不规则留下情绪痕迹。", "Look at handwriting, worn signs and quick sketches to see how pressure, speed and irregularity retain emotional traces.")
      ],
      comparisons: [
        compare("fauvism", "都使用非自然色、简化轮廓和直接笔触摆脱写实限制。", "Both use non-natural color, simplified contour and direct brushwork to loosen realism.", "Fauvism 常把色彩用于明亮、开放的画面实验；Expressionism 是更广的主观形变语言，可覆盖焦虑、精神体验、社会冲突与多种地域实践。", "Fauvism often uses color in bright, open pictorial experiment; Expressionism is a broader language of subjective distortion spanning anxiety, spiritual experience, social conflict and varied regions."),
        compare("german-expressionism", "都通过形变、强色、粗线和暴露笔触表达内在经验。", "Both use distortion, forceful color, rough line and exposed handling to express inner experience.", "Expressionism 是跨地域与媒介的广义倾向；German Expressionism 指二十世纪初德国特定群体与语境，城市经验、木刻语言和战争冲击更突出。", "Expressionism is a broad tendency across regions and media; German Expressionism refers to specific early-twentieth-century German groups and contexts, with urban experience, woodcut language and wartime rupture more pronounced.")
      ],
      reflectionPrompt: bi("你需要知道画中发生了什么，还是形色本身已经把感受传给了你？", "Do you need to know what happened in the scene, or have form and color already carried the experience?")
    },

    "german-expressionism": {
      openingQuestion: bi(
        "这些尖锐轮廓和倾斜街道让你更靠近人物，还是让城市显得无法安稳站立？",
        "Do these jagged contours and tilted streets bring you closer to the figures, or make the city itself unable to stand still?"
      ),
      observe: [
        observe("line", "先看木刻般轮廓", "Begin with woodcut-like contours", "粗黑线、尖角和被压缩的形体保留刻刀或版画感，人物与街景因此显得直接而紧绷。", "Heavy black lines, sharp angles and compressed forms retain the feel of carving or print, making figures and streets direct and taut."),
        observe("space", "再看焦虑空间", "Enter the unstable space", "街道、室内和人物比例会倾斜或互相挤压，现代城市不只是背景，而成为心理压力的一部分。", "Streets, interiors and figure scale tilt or press together; the modern city becomes part of the psychological pressure rather than mere backdrop."),
        observe("context", "最后看历史裂缝", "Hold the historical rupture", "作品回应二十世纪初德国的城市变化、社会冲突与战争经验，但不同群体和艺术家的主题并不完全相同。", "The work responds to urban change, social conflict and war in early-twentieth-century Germany, though its groups and artists do not share one identical subject.")
      ],
      profile: {
        order: trait(2, "空间故意不稳定", "Deliberately unstable space"),
        color: trait(5, "色彩冲突明显", "Pronounced color clashes"),
        ornament: trait(1, "表面粗粝直接", "Rough, direct surface"),
        emotion: trait(5, "情绪尖锐紧张", "Sharp, tense emotion")
      },
      feelingWords: bi(["尖锐", "城市", "紧绷", "刻痕"], ["Jagged", "Urban", "Taut", "Incised"]),
      everydayLife: [
        life("家居", "Home", "观察夜间照明、狭窄走道和倾斜阴影如何改变空间压力，不把某种生活环境简单标签化。", "See how night lighting, narrow passages and tilted shadows alter spatial pressure without reducing a living environment to a label."),
        life("穿搭", "Clothing", "关注尖锐轮廓、深浅冲突和粗线条的节奏，让衣着表达紧张感而不夸张具体人物特征。", "Use angular silhouette, value contrast and rough line to express tension without exaggerating a person's features."),
        life("摄影", "Photography", "利用夜街、橱窗反光和倾斜边线观察城市怎样挤压人物，同时交代真实环境关系。", "Use night streets, shop-window reflection and tilted edges to see how a city presses around figures while retaining their real context."),
        life("日常物件", "Everyday objects", "看木刻、粗印刷和磨损海报如何让边缘不整齐，并以压力痕迹传达制作动作。", "Examine woodcuts, rough printing and worn posters to see how uneven edges and pressure marks convey the act of making.")
      ],
      comparisons: [
        compare("expressionism", "都让形变、色彩与笔触优先表达主观经验。", "Both give distortion, color and handling priority in conveying subjective experience.", "广义 Expressionism 可跨越国家、时期和媒介；German Expressionism 更具体地联系 Die Brücke、Der Blaue Reiter 等群体及德国城市、版画和战争语境。", "Expressionism broadly crosses countries, periods and media; German Expressionism is more specifically tied to groups such as Die Brücke and Der Blaue Reiter and to German urban, print and wartime contexts."),
        compare("noir-illustration", "都可使用强烈明暗、尖锐城市线条和人物疏离感。", "Both may use stark value contrast, sharp urban lines and alienated figures.", "German Expressionism 以绘画、版画和雕塑中的主观形变回应现代经验；Noir Illustration 更来自犯罪叙事、电影照明和出版图像的类型语言。", "German Expressionism responds to modern experience through subjective deformation in painting, print and sculpture; Noir Illustration comes more from crime narrative, cinematic lighting and publishing conventions.")
      ],
      reflectionPrompt: bi("紧张感主要来自人物表情，还是城市线条和空间已经替他们说话？", "Does the tension come mainly from facial expression, or have urban lines and space already spoken for the figures?")
    },

    symbolism: {
      openingQuestion: bi(
        "画面没有把故事说完时，哪一处颜色、目光或不寻常物件让你觉得它在暗示别的层次？",
        "When the image leaves its story unfinished, which color, gaze or unexpected object suggests another layer?"
      ),
      observe: [
        observe("suggestion", "先看叙事留白", "Begin with what is withheld", "人物与场景看似可辨，却缺少完整因果；夜色、沉默姿态或空白让画面更像暗示而非说明。", "Figures and settings remain recognizable but lack complete cause and effect; night, silent poses or gaps make the image suggest rather than explain."),
        observe("relation", "再看符号关系", "Read symbols in relation", "花、动物、神话或女性形象可能承担意义，但需要结合题名、时代与作品关系，不能套用统一字典。", "Flowers, animals, myth or female figures may carry meaning, but title, period and pictorial relation matter; no universal dictionary applies."),
        observe("tone", "最后看梦与现实边界", "Sense the threshold", "自然细节可以很真实，却被不寻常比例、色彩或组合推向心理、精神和想象空间。", "Natural detail may remain convincing, yet unusual scale, color or combination pushes the scene toward psychological, spiritual or imagined space.")
      ],
      profile: {
        order: trait(3, "叙事关系隐约", "Suggestive narrative order"),
        color: trait(4, "色彩营造暗示", "Color creates suggestion"),
        ornament: trait(3, "细节具有关系", "Details carry relations"),
        emotion: trait(5, "气氛深沉开放", "Deep, open atmosphere")
      },
      feelingWords: bi(["暗示", "梦境", "神秘", "内向"], ["Suggestive", "Dreamlike", "Mysterious", "Inward"]),
      everydayLife: [
        life("家居", "Home", "观察夜灯、镜面、植物和旧物怎样共同改变房间气氛，不给单个物件强加固定意义。", "See how night light, mirrors, plants and old objects alter a room together without imposing a fixed meaning on any one thing."),
        life("穿搭", "Clothing", "关注颜色、材质与个人记忆的联系，把意义留给具体穿着者而不是套用通用象征。", "Attend to how color and material connect with personal memory, leaving meaning to the wearer rather than a universal symbol."),
        life("摄影", "Photography", "用遮挡、背影或未完成动作留下叙事空缺，让环境线索提供多种可能解释。", "Use occlusion, a turned figure or unfinished action to leave a narrative gap that environmental clues can open in several ways."),
        life("日常物件", "Everyday objects", "看书签、纪念物和包装图像如何因组合与使用经历获得私人含义，而非天然携带答案。", "See how bookmarks, keepsakes and packaging gain private meaning through combination and use rather than carrying answers inherently.")
      ],
      comparisons: [
        compare("romanticism", "都重视想象、主观情绪、文学和超越日常现实的经验。", "Both value imagination, subjective feeling, literature and experiences beyond ordinary reality.", "浪漫主义常以自然力量、历史动作和极端尺度直接放大情绪；Symbolism 更常借沉默场景、神话与多义物件间接暗示心理或精神层次。", "Romanticism often amplifies feeling directly through nature, historical action and extreme scale; Symbolism more often suggests psychological or spiritual layers through silence, myth and ambiguous objects."),
        compare("surrealism", "都让熟悉物件进入不寻常关系，并为图像保留多重解释。", "Both place familiar things in unusual relations and preserve multiple interpretations.", "Symbolism 多在十九世纪末以诗性暗示、神话和精神主题建立氛围；Surrealism 后来更明确探索梦、无意识、偶然组合与现实逻辑的断裂。", "Symbolism builds atmosphere through poetic suggestion, myth and spiritual themes in the late nineteenth century; Surrealism later explores dreams, the unconscious, chance combination and breaks in ordinary logic more explicitly.")
      ],
      reflectionPrompt: bi("你想立刻解释这些暗示，还是愿意让它们在不同观看中改变含义？", "Do you want to explain these suggestions immediately, or let their meanings change across viewings?")
    },

    dada: {
      openingQuestion: bi(
        "当报纸、票据、现成物和荒谬文字被放进作品时，它是在制造新图像，还是质疑谁有权定义艺术？",
        "When newspapers, tickets, found objects and absurd words enter a work, are they making a new image or questioning who gets to define art?"
      ),
      observe: [
        observe("material", "先看现成材料", "Begin with found material", "印刷品、照片、票据和日常物件保留原有用途痕迹，被重新命名、并置或移入展览语境。", "Print, photographs, tickets and ordinary objects retain traces of use, then are renamed, juxtaposed or moved into an exhibition context."),
        observe("chance", "再看偶然与断裂", "Follow chance and rupture", "裁切边缘、随机落点和不连续句子打破稳定构图，使过程、事故和选择同时可见。", "Cut edges, chance placement and discontinuous sentences break stable composition, keeping process, accident and decision visible together."),
        observe("context", "最后看质疑对象", "Ask what is challenged", "战争、民族主义、现代制度与艺术权威构成重要背景；荒谬和幽默并非只是胡闹。", "War, nationalism, modern institutions and artistic authority form crucial contexts; absurdity and humor are not merely mischief.")
      ],
      profile: {
        order: trait(1, "秩序主动断裂", "Order deliberately disrupted"),
        color: trait(2, "色彩依材料而变", "Color follows found material"),
        ornament: trait(2, "碎片用于质疑", "Fragments serve critique"),
        emotion: trait(4, "情绪讽刺不安", "Ironic, unsettled mood")
      },
      feelingWords: bi(["断裂", "偶然", "讽刺", "质疑"], ["Disrupted", "Chance", "Ironic", "Questioning"]),
      everydayLife: [
        life("家居", "Home", "观察被重新使用的容器、旧报纸和错位标签如何改变物件身份，而不是把杂乱直接当作风格。", "See how reused containers, old newspapers and displaced labels alter object identity without treating clutter itself as a style."),
        life("穿搭", "Clothing", "留意旧标识、拼接材料和反常搭配怎样质疑正式规则，同时考虑原材料的出处与语境。", "Attend to how old labels, joined materials and unlikely combinations question formal rules while considering where those materials came from."),
        life("摄影", "Photography", "记录广告、路牌和人物动作之间偶然形成的反讽关系，不必导演成固定答案。", "Record accidental irony among advertisements, street signs and human action without staging it into one fixed answer."),
        life("日常物件", "Everyday objects", "看收据、包装和办公用品在离开原用途后，名称、位置和制度如何决定它们的新身份。", "See how receipts, packaging and office supplies acquire new identities through naming, placement and institution after leaving their usual function.")
      ],
      comparisons: [
        compare("surrealism", "都使用拼贴、偶然关系和熟悉物件的错位挑战日常逻辑。", "Both use collage, chance relation and displaced familiar objects to challenge ordinary logic.", "Dada 在战争与制度危机中更直接质疑艺术、语言和权威；Surrealism 后来更系统地探索梦、无意识、自动性与欲望。", "Dada more directly challenges art, language and authority amid war and institutional crisis; Surrealism later pursues dreams, the unconscious, automatism and desire more systematically."),
        compare("anti-design", "都故意破坏顺滑规则，并借错误感、冲突和不服从质疑规范。", "Both disrupt polished rules and use error, conflict and refusal to question norms.", "Dada 是一战前后跨城市的前卫实践，涉及表演、诗歌、现成品与拼贴；Anti-design 是更宽泛的后期设计立场，常直接回应功能主义和商业视觉惯例。", "Dada is an avant-garde practice across cities around World War I, spanning performance, poetry, readymades and collage; Anti-design is a broader later design stance often responding to functionalism and commercial conventions.")
      ],
      reflectionPrompt: bi("当作品拒绝提供熟练之美时，你会离开，还是开始追问它拒绝了什么？", "When a work refuses polished beauty, do you turn away, or begin asking what exactly it refuses?")
    },

    "abstract-expressionism": {
      openingQuestion: bi(
        "面对一张接近身体尺度的抽象画，你先意识到颜料留下的动作，还是整片颜色正在把你包围？",
        "Facing an abstract painting near bodily scale, do you first sense the actions left in paint, or the field of color enclosing you?"
      ),
      observe: [
        observe("scale", "先看画面如场域", "Begin with the canvas as field", "大画幅削弱小型中心构图，观看者需要用身体和视线移动，画面更像持续发生的场域。", "Large scale weakens a small central composition; the viewer must move body and gaze, making the canvas feel like an ongoing field."),
        observe("gesture", "再看动作方向", "Trace the gesture", "滴洒、扫动、刮擦或厚涂留下速度、压力和身体范围，但并非所有作品都依赖激烈动作。", "Drips, sweeps, scraping or impasto retain speed, pressure and bodily reach, though not every work depends on vigorous gesture."),
        observe("range", "最后看内部差异", "See the range within the movement", "动作性绘画与色域方向可以并存于这一广泛运动，Pollock 只是重要艺术家之一，不代表全部。", "Gestural painting and color-field directions coexist within this broad movement; Pollock is one important artist, not the whole of it.")
      ],
      profile: {
        order: trait(2, "构图扩散开放", "Diffuse, open composition"),
        color: trait(4, "颜色覆盖场域", "Color occupies the field"),
        ornament: trait(1, "材料动作即内容", "Material action is content"),
        emotion: trait(5, "情绪尺度强烈", "Emotionally forceful scale")
      },
      feelingWords: bi(["场域", "动作", "尺度", "开放"], ["Field", "Gesture", "Scale", "Open"]),
      everydayLife: [
        life("家居", "Home", "观察大墙面、地毯或窗景如何改变身体在空间中的尺度感，不把随意泼洒等同于运动本身。", "See how a large wall, rug or window changes bodily scale in a room without equating casual splashing with the movement."),
        life("穿搭", "Clothing", "关注材料痕迹、身体动作和大面积色彩之间的关系，区分真实制作过程与印刷仿痕。", "Attend to the relation among material trace, bodily motion and broad color, distinguishing actual process from printed imitation."),
        life("摄影", "Photography", "靠近记录表面动作，再退远观察整体场域，比较两个距离提供的信息。", "Photograph surface action close up, then step back for the whole field, comparing what each distance reveals."),
        life("日常物件", "Everyday objects", "看刷痕、擦拭、染色和材料沉积如何记录过程，同时判断这些痕迹是否覆盖整个表面。", "See how brushing, wiping, staining and accumulation record process, and whether those marks extend across the whole surface.")
      ],
      comparisons: [
        compare("pollock", "都关联大尺度、全覆盖构图和可见身体动作。", "Both are associated with large scale, allover composition and visible bodily action.", "Pollock 是以滴洒、线网与地面作画著称的具体艺术家；Abstract Expressionism 是更广运动，还包括 de Kooning、Krasner、Kline、Newman、Rothko 等不同方向。", "Pollock is a specific artist known for poured line networks and floor-based process; Abstract Expressionism is a broader movement including distinct directions represented by de Kooning, Krasner, Kline, Newman, Rothko and others."),
        compare("color-field-painting", "都使用大画幅、弱化传统叙事，并把观看变成身体尺度的经验。", "Both use large canvases, reduce traditional narrative and make viewing bodily in scale.", "Abstract Expressionism 包含动作性与色域等多种路径；Color Field Painting 更集中于大面积连续颜色、弱化笔触中心和沉浸表面。", "Abstract Expressionism includes gestural and color-field paths among others; Color Field Painting concentrates on continuous expanses of color, reduced central gesture and immersive surface.")
      ],
      reflectionPrompt: bi("你把画面看成艺术家动作的记录，还是一个与你共同发生的空间？", "Do you see the canvas as a record of the artist's actions, or as a space unfolding with your presence?")
    },

    "color-field-painting": {
      openingQuestion: bi(
        "当画面没有明确主体时，你的视线会寻找一个中心，还是慢慢接受整片颜色就是事件？",
        "When a painting offers no clear subject, does your eye search for a center, or slowly accept the entire field of color as the event?"
      ),
      observe: [
        observe("field", "先看颜色铺开", "Begin with color spreading", "大面积颜色跨越画布，中心图形被削弱，边缘、色带或染色共同决定整体连续性。", "Broad color extends across the canvas, weakening a central figure while edges, bands or stains determine overall continuity."),
        observe("surface", "再看表面是否连续", "Read the continuous surface", "颜料可能渗入画布、保持薄层或形成平整色带，使表面少见传统厚重塑形。", "Paint may soak into canvas, remain thin or form even bands, leaving less of the heavy modeling found in traditional painting."),
        observe("scale", "最后让视线沉浸", "Let the gaze immerse", "大尺度和弱中心让眼睛不必停在一个物体上，而是在色彩温度、边界与相邻关系中游移。", "Large scale and a weak center free the eye from one object, allowing it to move through color temperature, boundaries and adjacency.")
      ],
      profile: {
        order: trait(2, "秩序扩散连续", "Diffuse, continuous order"),
        color: trait(5, "颜色就是主体", "Color is the subject"),
        ornament: trait(1, "几乎无附加装饰", "Almost no added ornament"),
        emotion: trait(4, "情绪沉浸开放", "Immersive, open emotion")
      },
      feelingWords: bi(["连续", "扩散", "沉浸", "无中心"], ["Continuous", "Diffuse", "Immersive", "Centerless"]),
      everydayLife: [
        life("家居", "Home", "观察大面积墙色、窗帘或地面如何包围身体，并比较边界清楚与颜色渗开的不同感受。", "See how broad wall color, curtains or flooring surround the body, comparing hard boundaries with color that seems to spread."),
        life("穿搭", "Clothing", "留意整片颜色在身体移动时的连续性，以及接缝、层叠和材质怎样轻微改变色域。", "Attend to the continuity of a broad color as the body moves, and how seams, layering and material subtly alter the field."),
        life("摄影", "Photography", "用天空、墙面、水域或雾形成弱中心的大色面，让边缘和邻近色承担空间变化。", "Use sky, wall, water or mist as a broad field with little center, letting edges and neighboring colors carry spatial change."),
        life("日常物件", "Everyday objects", "看染布、色纸和磨砂表面如何让颜色保持连续，同时通过渗透、折痕或边缘发生变化。", "Examine dyed cloth, colored paper and matte surfaces where color remains continuous yet changes through soaking, folds or edges.")
      ],
      comparisons: [
        compare("abstract-expressionism", "都常用大尺度、抽象语言和身体化观看削弱传统叙事。", "Both often use large scale, abstraction and embodied viewing to reduce traditional narrative.", "Abstract Expressionism 是包含动作绘画、色域及其他路径的广泛运动；Color Field Painting 更专注大面积连续颜色、薄表面与弱化中心动作。", "Abstract Expressionism is a broad movement containing gestural, color-field and other paths; Color Field Painting focuses more narrowly on continuous expanses, thin surfaces and reduced central action."),
        compare("rothko", "都以大面积色彩、沉浸尺度和弱化具象中心影响观看。", "Both shape viewing through broad color, immersive scale and reduced figurative center.", "Rothko 的个人语言常以柔边层叠矩形组织色层；Color Field Painting 还包括色带、染色画布、单色区和其他艺术家的不同表面方法。", "Rothko's personal language often organizes layers as soft-edged stacked rectangles; Color Field Painting also includes bands, stained canvas, monochrome zones and other surface approaches.")
      ],
      reflectionPrompt: bi("没有明确图形中心时，你会感到迷失，还是更能注意颜色在身体周围的变化？", "Without a clear graphic center, do you feel lost, or become more aware of color changing around your body?")
    },

    solarpunk: {
      openingQuestion: bi(
        "这座未来城市最先让你看到的是机器，还是植物、阳光和人如何一起生活？",
        "In this future city, do you notice machines first, or the way plants, sunlight and people live together?"
      ),
      observe: [
        observe("light", "先看阳光", "First, notice sunlight", "明亮自然光不是背景效果，而是能源、开放空间和乐观未来的可见线索。", "Bright natural light is not just atmosphere; it signals energy, openness and an optimistic future."),
        observe("material", "再看自然与技术连接", "Then, notice nature meeting technology", "植物、木材、水和可再生设施被放在同一结构里，技术看起来可维护、可共同使用。", "Plants, wood, water and renewable systems share one structure, making technology feel maintainable and communal."),
        observe("feeling", "最后感受可居住", "Finally, notice livability", "未来并不靠黑暗危险制造刺激，而通过遮荫、步行、社区和丰富生态让人想住进去。", "The future is not exciting because it is dark or dangerous; shade, walking, community and biodiversity make it feel inhabitable.")
      ],
      profile: {
        order: trait(3, "秩序有机开放", "Organic, open order"),
        color: trait(4, "色彩明亮自然", "Bright natural color"),
        ornament: trait(3, "细节来自生态系统", "Detail comes from living systems"),
        emotion: trait(4, "情绪乐观有活力", "Optimistic, lively emotion")
      },
      feelingWords: bi(["明亮", "共生", "希望", "可居住"], ["Bright", "Symbiotic", "Hopeful", "Livable"]),
      everydayLife: [
        life("家居", "Home", "观察采光、通风、植物和可修复材料如何共同改善生活，而不是只摆绿色装饰。", "Notice how daylight, ventilation, plants and repairable materials improve life together rather than merely adding green decoration."),
        life("穿搭", "Clothing", "关注耐用、可层叠和自然材质，颜色可来自叶绿、天空蓝与太阳黄。", "Look for durability, layering and natural materials, with colors drawn from leaves, sky and sunlight."),
        life("摄影", "Photography", "寻找人在绿地、公共交通、能源设施和社区空间中的实际使用关系。", "Photograph how people actually use green space, public transport, energy systems and communal places."),
        life("日常物件", "Everyday objects", "观察可重复使用容器、模块化家具和修补痕迹如何让物件显得面向长期生活。", "Notice how reusable containers, modular furniture and visible repairs make objects feel designed for long-term life.")
      ],
      comparisons: [
        compare("cyberpunk", "都想象高技术城市，也会使用密集建筑和鲜明视觉信号。", "Both imagine high-tech cities with dense architecture and strong visual signals.", "Solarpunk 把技术与生态、公共生活和希望连接；Cyberpunk 常通过霓虹、企业权力、拥挤和不平等表现技术社会的阴影。", "Solarpunk links technology to ecology, public life and hope; Cyberpunk often uses neon, corporate power, density and inequality to expose technology's darker social side."),
        compare("retrofuturism", "都把未来当作一种可以被设计的整体生活图景。", "Both treat the future as a designed vision of everyday life.", "复古未来主义从过去的太空时代和工业想象回看未来；Solarpunk 从当下生态问题出发，强调可再生系统与社区韧性。", "Retrofuturism looks at the future through past space-age and industrial dreams; Solarpunk starts from current ecological problems and emphasizes renewable systems and community resilience.")
      ],
      reflectionPrompt: bi("你喜欢它的乐观，还是希望未来想象里保留更多矛盾和不确定？", "Do you enjoy its optimism, or want a future vision with more conflict and uncertainty?")
    }
  };

  Object.assign(window.STYLE_AESTHETIC_GUIDES, {
    "de-stijl": {
      openingQuestion: bi(
        "先看这些线和色块：它们是在装饰画面，还是在建立一种共同生活的秩序？",
        "Start with the lines and color blocks: are they decorating the image, or building a shared order for living?"
      ),
      observe: [
        observe("grid", "先看垂直与水平", "Begin with vertical and horizontal", "线条尽量避开斜向和曲线，垂直、水平与矩形让画面像被一套基础秩序支撑。", "Lines avoid diagonals and curves as much as possible; verticals, horizontals and rectangles make the image feel supported by a basic order."),
        observe("balance", "再看不对称平衡", "Read the asymmetric balance", "红黄蓝与黑白灰数量很少，却被放在不同重量的位置，让画面没有中心也能稳定。", "Red, yellow, blue, black, white and gray appear sparingly, but their different weights let the image stay stable without a central focus."),
        observe("scope", "最后看跨媒介秩序", "See the order across media", "这种语言不只属于画布，也进入建筑、家具和书刊，像把日常环境一起重新校准。", "This language does not belong only to canvas; it enters architecture, furniture and print, as if recalibrating everyday surroundings together.")
      ],
      profile: {
        order: trait(5, "基础秩序很强", "Very strong basic order"),
        color: trait(3, "色彩少而明确", "Few but explicit colors"),
        ornament: trait(1, "几乎删除装饰", "Ornament nearly removed"),
        emotion: trait(2, "情绪理性安静", "Rational, quiet tone")
      },
      feelingWords: bi(["清楚", "平衡", "克制", "基础"], ["Clear", "Balanced", "Restrained", "Fundamental"]),
      everydayLife: [
        life("家居", "Home", "观察书架、柜门和地毯边线是否能形成垂直水平关系，色彩不必多也能有节奏。", "Notice whether shelves, cabinet doors and rug edges form vertical-horizontal relations; color can be sparse and still rhythmic."),
        life("穿搭", "Clothing", "用清楚分割、直线轮廓和少量基础色观察身体比例，而不是追求满身图案。", "Use clear divisions, straight silhouette and a few basic colors to read proportion rather than covering the body with pattern."),
        life("摄影", "Photography", "寻找窗框、墙角和街区立面里的矩形关系，让不对称构图仍然安稳。", "Find rectangular relations in windows, corners and facades so an asymmetric frame can still feel settled."),
        life("日常物件", "Everyday objects", "看笔记本、收纳盒和路牌如何用少数线条和色块建立可预期的秩序。", "See how notebooks, storage boxes and signs use a few lines and blocks to create predictable order.")
      ],
      comparisons: [
        compare("mondrian", "都依靠垂直水平、基础色和非对称平衡。", "Both rely on vertical-horizontal structure, primary color and asymmetric balance.", "De Stijl 是一场共同运动与理念；Mondrian 是其中重要艺术家，个人实践不能替代整个运动。", "De Stijl is a shared movement and ideal; Mondrian is a major artist within it, not a synonym for the whole movement."),
        compare("bauhaus", "都相信现代生活可以通过清楚形式重新组织。", "Both believe modern life can be reorganized through clear form.", "De Stijl 更追求抽象秩序在各媒介间延展；Bauhaus 更强调学校、工艺、材料和工业生产之间的连接。", "De Stijl extends abstract order across media; Bauhaus more strongly connects school, craft, material and industrial production.")
      ],
      reflectionPrompt: bi("这种被简化的秩序让你放松，还是让你想念更柔软的变化？", "Does this simplified order relax you, or make you miss softer variation?")
    },

    futurism: {
      openingQuestion: bi(
        "这张图像像不像把同一个动作拆成几秒钟，让速度本身变成主角？",
        "Does this image seem to split one action into several seconds, making speed itself the subject?"
      ),
      observe: [
        observe("motion", "先看重复轮廓", "Begin with repeated contours", "身体、车轮或机器部件会以连续残影出现，像同一动作的几个阶段叠在一起。", "Bodies, wheels or machine parts appear as successive afterimages, as if several phases of one action were layered together."),
        observe("force", "再看力线方向", "Follow the lines of force", "斜线、放射线和压缩空间把视线向前推，文字也可能像声音一样撞入图像。", "Diagonals, rays and compressed space push the eye forward, and type may crash into the image like sound."),
        observe("context", "最后看现代迷恋", "Hold the modern fascination", "它迷恋工业速度与机器城市，同时也需要克制理解部分成员与民族主义和法西斯主义的历史联系。", "It is fascinated by industrial speed and machine cities, while requiring a restrained awareness of some members' historical ties to nationalism and fascism.")
      ],
      profile: {
        order: trait(3, "秩序被速度拉伸", "Order stretched by speed"),
        color: trait(4, "色彩常有高能量", "Often high-energy color"),
        ornament: trait(2, "装饰服从运动", "Ornament follows motion"),
        emotion: trait(5, "情绪急促兴奋", "Urgent, excited tone")
      },
      feelingWords: bi(["速度", "推进", "机械", "紧张"], ["Speed", "Propulsive", "Mechanical", "Tense"]),
      everydayLife: [
        life("家居", "Home", "观察风扇、楼梯和光影重复如何制造方向感，不把危险或暴力当作活力来源。", "Notice how fans, stairs and repeated light create direction without treating danger or violence as the source of energy."),
        life("穿搭", "Clothing", "看斜向切线、运动面料和重复条纹怎样让身体显得正在前进。", "See how diagonal cuts, active fabrics and repeated stripes make the body feel in motion."),
        life("摄影", "Photography", "拍摄运动残影、车流或手势连续阶段，让速度可见而不美化冲撞。", "Photograph motion blur, traffic flow or phases of a gesture so speed becomes visible without glorifying collision."),
        life("日常物件", "Everyday objects", "留意车站屏幕、快递标签和仪表盘如何用斜线、箭头和数字制造加速感。", "Notice how station screens, shipping labels and dashboards use diagonals, arrows and numbers to suggest acceleration.")
      ],
      comparisons: [
        compare("constructivism", "都使用斜线、强方向和现代机器时代的能量。", "Both use diagonals, forceful direction and machine-age energy.", "Futurism 更迷恋速度、连续动作和冲击；Constructivism 更强调社会建设、几何结构和传播任务。", "Futurism is more fascinated by speed, successive action and impact; Constructivism stresses social construction, geometric structure and communication."),
        compare("kinetic-poster", "都让静止画面显得正在移动。", "Both make a still image feel as if it is moving.", "Futurism 是历史前卫运动并带有复杂政治语境；Kinetic Poster 是更宽的平面语言，可用重复、偏移和模糊制造动感。", "Futurism is a historical avant-garde movement with complex politics; Kinetic Poster is a broader graphic language using repetition, offset and blur.")
      ],
      reflectionPrompt: bi("你被速度吸引时，也会注意它背后的历史和代价吗？", "When speed attracts you, do you also notice the history and cost behind it?")
    },

    brutalism: {
      openingQuestion: bi(
        "这个画面是不是故意把结构露出来，让你看见信息是怎样被摆上台面的？",
        "Is this image deliberately exposing its structure, letting you see how information has been placed on the table?"
      ),
      observe: [
        observe("structure", "先看裸露结构", "Begin with exposed structure", "边框、模块、默认按钮感和粗大分区直接显露，画面不急着把施工痕迹藏起来。", "Borders, modules, default-button feelings and heavy divisions are exposed, with little rush to hide construction marks."),
        observe("surface", "再看不精修表面", "Read the unpolished surface", "字体可能像系统默认，图片裁切也可能生硬，但这种粗糙需要有意组织而非随便堆放。", "Type may feel system-default and image crops may be blunt, but the roughness must be intentionally organized rather than casually piled up."),
        observe("difference", "最后区别建筑来源", "Separate the borrowed language", "当代平面粗野主义借用建筑粗野主义的直接、重和裸露感，却不等于所有粗糙网页。", "Contemporary graphic brutalism borrows directness, heaviness and exposure from Brutalist architecture, but not every rough page belongs to it.")
      ],
      profile: {
        order: trait(4, "结构直白强硬", "Blunt, forceful structure"),
        color: trait(2, "色彩常较克制", "Often restrained color"),
        ornament: trait(1, "少修饰甚至反修饰", "Little polish, sometimes anti-polish"),
        emotion: trait(4, "情绪直接生硬", "Direct, blunt tone")
      },
      feelingWords: bi(["直接", "裸露", "坚硬", "未修饰"], ["Direct", "Exposed", "Hard", "Unpolished"]),
      everydayLife: [
        life("家居", "Home", "看水泥、金属架和开放收纳如何显露承重与使用结构，而不是只追求粗糙表面。", "See how concrete, metal shelving and open storage reveal support and use, rather than chasing rough surface alone."),
        life("穿搭", "Clothing", "观察工装口袋、外露缝线和厚重边界如何让结构成为可见信息。", "Notice how workwear pockets, exposed seams and heavy edges make structure visible."),
        life("摄影", "Photography", "拍摄建筑边界、临时标牌和未美化角落，保留信息关系而不是只找破败。", "Photograph building edges, temporary signs and unbeautified corners while preserving information relations, not just decay."),
        life("日常物件", "Everyday objects", "看说明贴纸、纸箱编号和系统界面如何因为直给而显得诚实或生硬。", "Look at instruction stickers, carton numbers and system interfaces that feel honest or harsh because they are so direct.")
      ],
      comparisons: [
        compare("swiss-style", "都能用清楚结构组织信息。", "Both can organize information through clear structure.", "Swiss Style 把系统磨到冷静透明；Graphic Brutalism 则让边界、默认感和未精修表面留在前景。", "Swiss Style refines the system until it feels calm and transparent; Graphic Brutalism keeps borders, defaults and unpolished surfaces in front."),
        compare("punk-diy", "都可能拒绝光滑商业外观。", "Both may refuse a polished commercial look.", "Brutalism 更强调裸露结构和硬边信息；Punk DIY 更来自剪贴、复印、手写与自主传播。", "Brutalism stresses exposed structure and hard-edged information; Punk DIY comes more from collage, photocopy, handwriting and self-publishing.")
      ],
      reflectionPrompt: bi("你觉得这种直接更可信，还是会因为太生硬而产生距离？", "Does this directness feel more trustworthy, or does its bluntness create distance?")
    },

    "editorial-typography": {
      openingQuestion: bi(
        "你还没读正文时，标题、图片和说明文字已经告诉你应该先看哪里了吗？",
        "Before you read the body text, have headline, image and caption already told you where to begin?"
      ),
      observe: [
        observe("hierarchy", "先看阅读顺序", "Begin with reading order", "标题、正文、图片和说明文字用大小、位置与空白排出先后，让复杂内容可以被慢慢进入。", "Headline, body, image and caption use size, position and space to sequence entry into complex content."),
        observe("voice", "再看字体语气", "Read the type voice", "字体比例、粗细和行距会改变文章气质，同样的信息可能变得冷静、亲近或紧张。", "Type proportion, weight and leading alter the voice of a story, making the same information feel calm, close or tense."),
        observe("rhythm", "最后看内容节奏", "Follow the story rhythm", "不同主题需要不同呼吸，版面会在长读、停顿、图片和小注之间调整速度。", "Different subjects need different breathing; layout adjusts speed among long reading, pause, image and small note.")
      ],
      profile: {
        order: trait(4, "阅读秩序清楚", "Clear reading order"),
        color: trait(2, "色彩服务内容", "Color serves content"),
        ornament: trait(2, "装饰从属版面", "Ornament follows layout"),
        emotion: trait(3, "情绪随内容变化", "Tone shifts with content")
      },
      feelingWords: bi(["可读", "节奏", "层级", "语气"], ["Readable", "Rhythmic", "Layered", "Voiced"]),
      everydayLife: [
        life("家居", "Home", "观察书墙、菜单和标签的字号层级，哪些信息让你先拿起、再细读。", "Notice type hierarchy on bookshelves, menus and labels: what makes you pick something up before reading closely?"),
        life("穿搭", "Clothing", "看衣物上的文字、吊牌和图案比例如何改变整体语气，而不只把字当装饰。", "See how text on clothing, tags and graphic scale change the overall voice, not merely decorating fabric."),
        life("摄影", "Photography", "拍摄有文字的场景时，留意招牌、人物和空白如何共同决定阅读顺序。", "When photographing text-rich scenes, watch how signs, people and empty space decide the reading order together."),
        life("日常物件", "Everyday objects", "看报纸、杂志、药盒和票据如何用字号、栏宽和说明文字安排注意力。", "Look at newspapers, magazines, medicine boxes and tickets arranging attention with size, column width and captions.")
      ],
      comparisons: [
        compare("swiss-style", "都依靠字体、空白和层级帮助信息被理解。", "Both rely on type, space and hierarchy to make information understandable.", "Swiss Style 常追求稳定中性系统；Editorial Typography 更会随文章内容改变节奏、语气和图文比例。", "Swiss Style often seeks a stable neutral system; Editorial Typography shifts rhythm, voice and image-text balance with the story."),
        compare("new-wave-typography", "都把字体视为画面结构的一部分。", "Both treat type as part of pictorial structure.", "Editorial Typography 通常保持阅读路径清楚；New Wave Typography 会移动基线、字距和方向，让阅读被打散但未消失。", "Editorial Typography usually keeps the reading path clear; New Wave Typography shifts baseline, spacing and direction so reading is disturbed but not lost.")
      ],
      reflectionPrompt: bi("你是被内容吸引，还是先被字体安排出来的节奏带进去？", "Are you drawn by the content, or first carried in by the rhythm type has arranged?")
    },

    "new-wave-typography": {
      openingQuestion: bi(
        "这些文字还是在给你读，还是已经像图形一样让你的眼睛绕路行走？",
        "Are these words still asking to be read, or have they become shapes that make your eye take a detour?"
      ),
      observe: [
        observe("baseline", "先看基线移动", "Begin with shifting baselines", "文字可能上升、下沉、旋转或分段错位，阅读路径被打散，却仍留下可追踪的线索。", "Type may rise, sink, rotate or split into offsets; the reading path is disrupted but still leaves clues to follow."),
        observe("spacing", "再看字距张力", "Read spacing tension", "字母之间的距离忽紧忽松，文字不再只是容器，而开始承担节奏和图像重量。", "Letter spacing tightens and loosens, so type stops being only a container and starts carrying rhythm and pictorial weight."),
        observe("context", "最后看后现代语境", "See the postmodern context", "它回应过度稳定的现代主义秩序，用实验让阅读重新变成一种身体动作。", "It responds to overly stable modernist order, using experiment to make reading a bodily act again.")
      ],
      profile: {
        order: trait(3, "秩序被重新打散", "Order deliberately unsettled"),
        color: trait(3, "色彩可强可弱", "Color can vary widely"),
        ornament: trait(3, "字体本身成图形", "Type itself becomes graphic"),
        emotion: trait(4, "情绪活跃不安", "Active, unsettled tone")
      },
      feelingWords: bi(["跳动", "错位", "实验", "后现代"], ["Jumping", "Offset", "Experimental", "Postmodern"]),
      everydayLife: [
        life("家居", "Home", "看唱片、书脊和展览小册子的字距与方向，哪些仍能读，哪些先成为图形。", "Look at records, book spines and exhibition leaflets: which type remains readable, and which first becomes shape?"),
        life("穿搭", "Clothing", "观察印字在衣褶和身体转折处如何改变阅读顺序，但不必把文字随便倾斜。", "Notice how printed words change reading order across folds and body turns without simply slanting text at random."),
        life("摄影", "Photography", "拍摄路牌、玻璃反射和屏幕文字，让错位来自真实观看角度。", "Photograph signs, reflections and screen text so displacement comes from an actual viewing angle."),
        life("日常物件", "Everyday objects", "看活动海报、票根和包装字样如何用断行、叠压和留白制造节奏。", "See how event posters, tickets and packaging create rhythm through line breaks, overlap and space.")
      ],
      comparisons: [
        compare("editorial-typography", "都让字体、图像和空白共同组织阅读。", "Both use type, image and space to organize reading.", "Editorial Typography 更服务文章节奏；New Wave Typography 更主动挑战基线、字距和现代主义稳定性。", "Editorial Typography serves the story rhythm; New Wave Typography more actively challenges baseline, spacing and modernist stability."),
        compare("experimental-typography", "都把文字推到普通阅读之外。", "Both push type beyond ordinary reading.", "New Wave Typography 有较具体的后现代平面设计语境；Experimental Typography 范围更广，可涉及材料、动态、空间和生成文字。", "New Wave Typography has a more specific postmodern graphic context; Experimental Typography is broader, including material, motion, spatial and generative type.")
      ],
      reflectionPrompt: bi("当阅读变慢时，你会烦躁，还是开始注意文字本身的身体感？", "When reading slows down, do you get impatient, or begin noticing the body of the letters?")
    },

    "punk-diy": {
      openingQuestion: bi(
        "这些剪贴、手写和复印痕迹，是粗糙失败，还是一种自己发声的方式？",
        "Are these cutouts, handwriting and photocopy marks a rough failure, or a way of speaking for oneself?"
      ),
      observe: [
        observe("making", "先看低成本制作", "Begin with low-cost making", "剪贴、复印、手写和重复覆盖让制作过程留在表面，像信息刚从现场传出来。", "Cutting, photocopying, handwriting and repeated overprinting leave the making on the surface, as if the message just came from the scene."),
        observe("community", "再看自主传播", "Read self-publishing", "它常与乐队、社群、小刊和反主流文化有关，重点不是脏乱，而是谁能绕过正式渠道发声。", "It often belongs to bands, communities, zines and counterculture; the point is not mess, but who can speak outside official channels."),
        observe("friction", "最后看冲突关系", "See the friction", "字体、照片和纸片故意碰撞，但冲突仍服务态度和传播，不等于随意堆满。", "Type, photos and paper fragments collide deliberately, yet the conflict still serves attitude and circulation rather than random filling.")
      ],
      profile: {
        order: trait(2, "秩序粗粝直接", "Rough, direct order"),
        color: trait(2, "色彩受材料限制", "Color limited by materials"),
        ornament: trait(3, "碎片密度较高", "Fragment density is high"),
        emotion: trait(5, "情绪自主尖锐", "Autonomous, sharp emotion")
      },
      feelingWords: bi(["自主", "剪贴", "粗粝", "急迫"], ["Self-made", "Collaged", "Rough", "Urgent"]),
      everydayLife: [
        life("家居", "Home", "观察冰箱便签、手工小册和修补痕迹如何记录真实生活，而不是把房间故意弄乱。", "Notice how fridge notes, handmade booklets and repairs record real life without intentionally making a room messy."),
        life("穿搭", "Clothing", "看补丁、手写标语和旧衣改造怎样表达立场，同时尊重社群来源。", "See how patches, handwritten slogans and altered clothing express a stance while respecting their community origins."),
        life("摄影", "Photography", "拍摄演出门口、小广告和临时告示，保留纸张层叠与现场使用痕迹。", "Photograph venue doors, small flyers and temporary notices, keeping layered paper and traces of use."),
        life("日常物件", "Everyday objects", "看复印件、贴纸和胶带如何让信息快速流通，也暴露制作条件。", "Look at photocopies, stickers and tape as fast circulation of information that also reveals making conditions.")
      ],
      comparisons: [
        compare("dada", "都使用拼贴、断裂和对正式规则的质疑。", "Both use collage, rupture and questioning of official rules.", "Dada 是一战前后前卫艺术对制度和语言的挑战；Punk DIY 更集中在音乐社群、小刊、复印和低成本自主传播。", "Dada is an avant-garde challenge to institutions and language around World War I; Punk DIY centers on music communities, zines, photocopying and low-cost self-publishing."),
        compare("grunge", "都可能呈现磨损、噪声和反精修表面。", "Both may show wear, noise and anti-polished surfaces.", "Punk DIY 强调剪贴与自主出版方式；Grunge 更强调侵蚀纹理、失真、污点和九十年代音乐传播气候。", "Punk DIY stresses collage and self-publishing methods; Grunge emphasizes eroded texture, distortion, stains and a 1990s music-culture climate.")
      ],
      reflectionPrompt: bi("你看到的是杂乱，还是看见了绕开正式渠道的能量？", "Do you see disorder, or the energy of bypassing official channels?")
    },

    grunge: {
      openingQuestion: bi(
        "这些污点、撕裂和失真，是在做旧，还是让表面带着声音和年代的摩擦？",
        "Are these stains, tears and distortions merely aged, or do they make the surface carry sound and period friction?"
      ),
      observe: [
        observe("surface", "先看侵蚀表面", "Begin with eroded surface", "污点、划痕、破边和模糊让图像像经过复印、潮湿、摩擦或信号失真。", "Stains, scratches, torn edges and blur make the image feel photocopied, damp, rubbed or signal-distorted."),
        observe("culture", "再看音乐传播", "Read the music context", "Grunge 与九十年代音乐、唱片封面和地下传播有关，不是所有做旧纹理都属于它。", "Grunge relates to 1990s music, album covers and underground circulation; not every aged texture belongs to it."),
        observe("difference", "最后区别制作方式", "Separate it from DIY", "它比 Punk DIY 更关注表面被侵蚀和失真的状态，而不是剪贴、复印和社群自出版本身。", "It focuses more than Punk DIY on surfaces being eroded and distorted, rather than collage, photocopy and community self-publishing itself.")
      ],
      profile: {
        order: trait(2, "秩序被噪声侵蚀", "Order eroded by noise"),
        color: trait(2, "色彩常低沉脏化", "Often muted and muddied"),
        ornament: trait(4, "纹理痕迹密集", "Dense texture traces"),
        emotion: trait(4, "情绪低沉摩擦", "Muted, abrasive emotion")
      },
      feelingWords: bi(["侵蚀", "失真", "低沉", "磨损"], ["Eroded", "Distorted", "Muted", "Worn"]),
      everydayLife: [
        life("家居", "Home", "观察旧墙、磨损木面和海报残胶如何记录时间，不把所有破旧都包装成风格。", "Notice old walls, worn wood and poster glue as records of time without packaging all damage as a style."),
        life("穿搭", "Clothing", "看褪色布料、起毛针织和旧印花如何产生年代感，同时避免空洞地消费反文化符号。", "See how faded fabric, fuzzy knit and old prints create period feeling while avoiding empty consumption of counterculture signs."),
        life("摄影", "Photography", "利用低光、胶片颗粒或运动模糊观察声音感和空间压迫，不必把画面故意弄脏。", "Use low light, grain or motion blur to observe sonic feeling and spatial pressure without dirtying the image on purpose."),
        life("日常物件", "Everyday objects", "看唱片封套、旧票据和磨损包装如何因使用而失真，留下触摸和流通痕迹。", "Look at album sleeves, old tickets and worn packaging distorted by use, leaving traces of touch and circulation.")
      ],
      comparisons: [
        compare("punk-diy", "都拒绝过度光滑，也常与地下音乐传播有关。", "Both reject over-polish and often connect with underground music circulation.", "Grunge 更强调侵蚀表面、失真和九十年代气候；Punk DIY 更强调剪贴、复印和自主制作渠道。", "Grunge emphasizes eroded surfaces, distortion and a 1990s climate; Punk DIY emphasizes collage, photocopy and self-made channels."),
        compare("brutalism", "都可能让画面显得不精修。", "Both may make an image feel unpolished.", "Graphic Brutalism 借用裸露结构和硬边信息；Grunge 通过污点、破损、噪声和音乐文化让表面带有磨耗。", "Graphic Brutalism borrows exposed structure and hard-edged information; Grunge uses stains, damage, noise and music culture to make the surface worn.")
      ],
      reflectionPrompt: bi("这些磨损让你靠近真实时间，还是让你觉得它被刻意表演出来？", "Do these worn marks bring you closer to real time, or feel deliberately performed?")
    },

    "psychedelic-poster": {
      openingQuestion: bi(
        "如果你需要多看几秒才能读清文字，这种慢下来是在制造困难，还是制造沉浸？",
        "If you need a few extra seconds to read the words, is that delay making difficulty or immersion?"
      ),
      observe: [
        observe("contour", "先看波动轮廓", "Begin with wavering contours", "字母、人物和图案像液体一样弯曲，边界互相渗入，让阅读和观看同时发生。", "Letters, figures and patterns bend like liquid, their borders seeping into one another so reading and looking happen together."),
        observe("color", "再看高饱和碰撞", "Read saturated collisions", "互补色和强烈明暗会让表面振动，音乐现场的声音感被转化成颜色和线条。", "Complementary hues and sharp value shifts make the surface vibrate, translating live music's sound into color and line."),
        observe("context", "最后看反文化语境", "Hold the counterculture context", "它与六十年代音乐海报和反文化有关，但不需要浪漫化药物，也不能提供相关指导。", "It relates to 1960s music posters and counterculture, but does not require romanticizing drugs or giving related guidance.")
      ],
      profile: {
        order: trait(2, "秩序流动缠绕", "Flowing, tangled order"),
        color: trait(5, "色彩高饱和", "Highly saturated color"),
        ornament: trait(5, "图案密集融合", "Dense, fused pattern"),
        emotion: trait(5, "情绪沉浸亢奋", "Immersive, heightened emotion")
      },
      feelingWords: bi(["波动", "沉浸", "饱和", "迷离"], ["Wavering", "Immersive", "Saturated", "Trance-like"]),
      everydayLife: [
        life("家居", "Home", "观察灯光、织物和曲线图案如何改变房间节奏，一处强烈元素就足以制造沉浸。", "Notice how lighting, textiles and curving pattern alter a room's rhythm; one strong element can be enough for immersion."),
        life("穿搭", "Clothing", "看旋涡纹、互补色和流动字样如何影响身体轮廓，避免把反文化只当装饰标签。", "See how swirls, complementary hues and flowing type affect silhouette while avoiding counterculture as a mere decorative label."),
        life("摄影", "Photography", "拍摄演出灯光、玻璃反射和人群节奏，让色彩与声音感互相牵引。", "Photograph concert light, glass reflection and crowd rhythm so color and sound seem to pull on each other."),
        life("日常物件", "Everyday objects", "看唱片、门票和活动海报如何把字体融入图案，让读字变成慢观看。", "Look at records, tickets and event posters merging type into pattern so reading becomes slow looking.")
      ],
      comparisons: [
        compare("art-nouveau", "都使用流动轮廓、整体边框和图案化字体。", "Both use flowing contours, total frames and patterned lettering.", "Art Nouveau 多来自植物曲线与手工装饰传统；Psychedelic Poster 更强调高饱和振动、音乐现场和反文化沉浸。", "Art Nouveau grows from botanical curves and crafted ornament; Psychedelic Poster stresses saturated vibration, live music and countercultural immersion."),
        compare("pop-art-poster", "都放大大众传播中的颜色、图像和印刷感。", "Both amplify color, image and print feeling in mass circulation.", "Psychedelic Poster 让字体与图案缠绕到难读边缘；Pop Art Poster 更关注商品图像、大众媒体、重复和机械复制。", "Psychedelic Poster entwines type and pattern near the edge of legibility; Pop Art Poster focuses on commodities, mass media, repetition and mechanical reproduction.")
      ],
      reflectionPrompt: bi("你愿意为了沉浸放慢阅读，还是更需要文字立即清楚？", "Are you willing to slow reading for immersion, or do you need the words clear immediately?")
    },

    "pop-art-poster": {
      openingQuestion: bi(
        "这些像广告或漫画的图像被放大后，你看到的是熟悉快乐，还是消费图像的回声？",
        "When images like ads or comics are enlarged, do you see familiar pleasure, or echoes of consumer imagery?"
      ),
      observe: [
        observe("source", "先看大众图像来源", "Begin with mass-image sources", "商品包装、漫画、明星照片和广告语进入画面，原本普通的复制图像被当作观看对象。", "Packaging, comics, celebrity photos and slogans enter the image, turning ordinary reproduced pictures into things to examine."),
        observe("repetition", "再看重复与放大", "Read repetition and enlargement", "同一物件、头像或网点被放大、并列或机械复制，让原作与消费图像的距离变得可见。", "The same object, face or dot pattern is enlarged, repeated or mechanically copied, making the gap between artwork and consumer image visible."),
        observe("tone", "最后看明亮表面下的关系", "Look under the bright surface", "鲜艳颜色和黑色轮廓可以很亲近，但它们也在提醒我们日常欲望怎样被媒体组织。", "Bright color and black contour can feel friendly, yet they also remind us how everyday desire is organized by media.")
      ],
      profile: {
        order: trait(4, "重复秩序鲜明", "Strong repeated order"),
        color: trait(5, "色彩明亮饱和", "Bright, saturated color"),
        ornament: trait(3, "印刷纹理突出", "Print texture stands out"),
        emotion: trait(4, "情绪明快带反讽", "Bright with irony")
      },
      feelingWords: bi(["明快", "重复", "消费", "反讽"], ["Bright", "Repeated", "Consumer", "Ironic"]),
      everydayLife: [
        life("家居", "Home", "观察食品包装、日历和冰箱贴如何把普通商品图像变成房间里的颜色节奏。", "Notice how food packaging, calendars and magnets turn ordinary product images into color rhythm in a room."),
        life("穿搭", "Clothing", "看大图案、印刷网点和标语如何让衣服接近媒体图像，同时避免复制真实品牌或名人脸。", "See how large graphics, halftone dots and slogans make clothing feel media-like while avoiding real brands or celebrity faces."),
        life("摄影", "Photography", "拍摄橱窗、自动售货机和广告重复，让消费图像的排列方式被看见。", "Photograph shop windows, vending machines and repeated ads so the arrangement of consumer images becomes visible."),
        life("日常物件", "Everyday objects", "看罐头、杂志和玩具包装如何通过放大、重复和鲜艳色彩制造熟悉感。", "Look at cans, magazines and toy packaging creating familiarity through enlargement, repetition and vivid color.")
      ],
      comparisons: [
        compare("dada", "都把现成图像和日常物件带入艺术观看。", "Both bring found images and everyday objects into artistic looking.", "Dada 更直接质疑艺术制度和语言权威；Pop Art Poster 更关注广告、商品、媒体复制和流行文化表面。", "Dada more directly questions art institutions and language authority; Pop Art Poster focuses on advertising, commodities, media reproduction and popular-culture surfaces."),
        compare("psychedelic-poster", "都可能使用高饱和颜色和强烈海报性。", "Both may use saturated color and strong poster presence.", "Pop Art Poster 常使用清楚轮廓、网点、重复和消费图像；Psychedelic Poster 更追求波动轮廓、难读字体和沉浸图案。", "Pop Art Poster often uses clear contour, dots, repetition and consumer imagery; Psychedelic Poster seeks wavering contours, difficult type and immersive pattern.")
      ],
      reflectionPrompt: bi("这些熟悉图像让你放松，还是让你意识到自己被媒体训练过？", "Do these familiar images relax you, or make you aware of being trained by media?")
    },

    "corporate-modernism": {
      openingQuestion: bi(
        "为什么有些标识、导视和文件看起来不热情，却让你相信它们来自同一个系统？",
        "Why do some signs, wayfinding and documents feel unemotional, yet convince you they come from one system?"
      ),
      observe: [
        observe("system", "先看模块化系统", "Begin with modular systems", "标识、字体、网格、色块和导视被反复组合，让大型机构在不同场景中保持同一种声音。", "Marks, type, grids, color fields and wayfinding recombine repeatedly so a large institution keeps one voice across settings."),
        observe("clarity", "再看可复制性", "Read reproducibility", "版面不靠一次性惊喜，而靠稳定规则让表格、建筑标牌、包装和广告可以持续扩展。", "The layout does not depend on one-time surprise; stable rules let forms, building signs, packaging and ads keep expanding."),
        observe("power", "最后看清晰与权力", "Consider clarity and power", "系统清楚会降低理解成本，也可能让机构权力显得自然可靠，两种感受可以同时存在。", "System clarity lowers the cost of understanding, and may also make institutional power feel natural and reliable; both can exist at once.")
      ],
      profile: {
        order: trait(5, "系统秩序很强", "Very strong system order"),
        color: trait(2, "色彩统一克制", "Unified, restrained color"),
        ornament: trait(1, "装饰极少", "Very little ornament"),
        emotion: trait(2, "情绪稳定中性", "Stable, neutral tone")
      },
      feelingWords: bi(["一致", "可靠", "机构", "清晰"], ["Consistent", "Reliable", "Institutional", "Clear"]),
      everydayLife: [
        life("家居", "Home", "观察收纳标签、文件夹和家电说明如何用同一套字体与间距降低寻找成本。", "Notice how labels, folders and appliance manuals use consistent type and spacing to reduce search effort."),
        life("穿搭", "Clothing", "看制服、工牌和基础配色如何建立可识别身份，同时也限制个人表达。", "See how uniforms, badges and basic palettes create recognizable identity while limiting personal expression."),
        life("摄影", "Photography", "拍摄机场、医院和银行导视，比较清楚秩序如何让空间更可信。", "Photograph wayfinding in airports, hospitals and banks, comparing how clear order makes space feel trustworthy."),
        life("日常物件", "Everyday objects", "看票据、说明书和办公用品如何通过重复规则，让不同物件像来自同一机构。", "Look at receipts, manuals and office supplies using repeated rules so different objects feel from one institution.")
      ],
      comparisons: [
        compare("swiss-style", "都依靠网格、无衬线字体和清楚层级建立可信秩序。", "Both use grids, sans-serif type and clear hierarchy to build credible order.", "Swiss Style 是更广的现代主义信息语言；Corporate Modernism 把这种语言系统化，用于机构身份、导视和大规模复制。", "Swiss Style is a broader modernist information language; Corporate Modernism systematizes it for institutional identity, wayfinding and large-scale reproduction."),
        compare("bauhaus", "都把现代形式与日常功能联系起来。", "Both connect modern form with everyday function.", "Bauhaus 强调学校、工艺和工业实验；Corporate Modernism 更关注大型组织如何保持统一声音。", "Bauhaus stresses school, craft and industrial experiment; Corporate Modernism focuses on how large organizations maintain one voice.")
      ],
      reflectionPrompt: bi("你喜欢这种一致性带来的安心，还是会注意它让机构显得过于自然？", "Do you enjoy the reassurance of consistency, or notice how it makes institutions feel too natural?")
    },

    "anti-design": {
      openingQuestion: bi(
        "当画面故意难读、冲突和过量时，它是在放弃设计，还是在反问什么叫好设计？",
        "When an image is deliberately hard to read, conflicting and excessive, is it abandoning design or questioning what good design means?"
      ),
      observe: [
        observe("conflict", "先看故意冲突", "Begin with deliberate conflict", "颜色、字体、比例和边界彼此顶撞，画面反对干净中性不等于没有选择。", "Color, type, scale and edges collide; rejecting clean neutrality does not mean choices are absent."),
        observe("excess", "再看过量信息", "Read excess information", "元素可能太多、太近或太响，让观看者意识到商业视觉常要求我们顺滑接受。", "Elements may be too many, too close or too loud, making the viewer aware of how commercial visuals often ask for smooth acceptance."),
        observe("rule", "最后看被打破的规则", "Find the broken rule", "反设计不是随便设计，它通常先知道可读性、层级和秩序，再有意识地拆开它们。", "Anti-design is not careless work; it usually knows legibility, hierarchy and order before consciously taking them apart.")
      ],
      profile: {
        order: trait(1, "秩序被主动抵抗", "Order actively resisted"),
        color: trait(4, "色彩常冲突", "Often clashing color"),
        ornament: trait(5, "元素过量外显", "Excess elements exposed"),
        emotion: trait(5, "情绪挑衅不安", "Provocative, unsettled tone")
      },
      feelingWords: bi(["冲突", "过量", "挑衅", "反规则"], ["Conflicting", "Excessive", "Provocative", "Rule-breaking"]),
      everydayLife: [
        life("家居", "Home", "观察贴满便签的墙或混搭角落何时表达真实关系，何时只是增加噪声。", "Notice when a note-covered wall or mixed corner expresses real relations, and when it merely adds noise."),
        life("穿搭", "Clothing", "看冲突图案、反常比例和不协调颜色如何提出态度，而不是把不合身当作答案。", "See how clashing patterns, odd proportions and discordant colors state an attitude, without treating poor fit as the answer."),
        life("摄影", "Photography", "拍摄广告牌、屏幕和街头文字相互遮挡的现场，让冲突来自真实公共空间。", "Photograph ads, screens and street text blocking one another so conflict comes from real public space."),
        life("日常物件", "Everyday objects", "看廉价传单、错误界面和过度包装如何暴露规则，也提醒你判断哪些破坏是有意识的。", "Look at cheap flyers, broken interfaces and excessive packaging exposing rules, while judging which disruptions are conscious.")
      ],
      comparisons: [
        compare("swiss-style", "都围绕可读性、秩序和信息组织展开。", "Both revolve around legibility, order and information organization.", "Swiss Style 让秩序尽量清楚透明；Anti-Design 则把秩序拆开，回应商业洁净感和中性规范。", "Swiss Style makes order as clear and transparent as possible; Anti-Design pulls order apart in response to commercial cleanliness and neutral norms."),
        compare("new-wave-typography", "都可能打散阅读路径并挑战现代主义稳定性。", "Both may disturb reading paths and challenge modernist stability.", "New Wave Typography 主要从字体基线、字距和后现代排版入手；Anti-Design 范围更宽，常使用过量、冲突和难读来反问设计规则。", "New Wave Typography works mainly through baseline, spacing and postmodern type; Anti-Design is broader, using excess, conflict and difficulty to question design rules.")
      ],
      reflectionPrompt: bi("你会先拒绝这种混乱，还是愿意问它到底在抵抗哪一种顺滑？", "Do you reject this disorder first, or ask what kind of smoothness it is resisting?")
    },

    "experimental-typography": {
      openingQuestion: bi(
        "当字母被拉伸、切开或变成材料时，你还在读文字，还是在观看文字的身体？",
        "When letters are stretched, cut or turned into material, are you reading words or watching the body of type?"
      ),
      observe: [
        observe("letterform", "先看字母变形", "Begin with transformed letters", "笔画可能被压缩、溶解、拆开或重组，文字的形体在画面里成为主要事件。", "Strokes may be compressed, dissolved, separated or rebuilt, making the letterform itself the main event."),
        observe("material", "再看材料与媒介", "Read material and medium", "纸张、屏幕、光、空间、生成规则或身体动作都可能改变字的边界。", "Paper, screen, light, space, generative rules or bodily action can all change the boundary of type."),
        observe("legibility", "最后看可读性边界", "Test the edge of legibility", "它不只是把字弄怪，而是在可读和不可读之间让你意识到阅读本身。", "It is not merely making type strange; it makes you aware of reading itself at the edge between legible and illegible.")
      ],
      profile: {
        order: trait(3, "秩序随实验变化", "Order shifts with experiment"),
        color: trait(3, "色彩不是固定重点", "Color is not fixed"),
        ornament: trait(4, "字形细节突出", "Letterform detail is prominent"),
        emotion: trait(4, "情绪探索开放", "Exploratory, open tone")
      },
      feelingWords: bi(["变形", "材料", "边界", "探索"], ["Transformed", "Material", "Boundary", "Exploratory"]),
      everydayLife: [
        life("家居", "Home", "观察霓虹字、门牌和书法摆件如何因材料改变字的边缘和影子。", "Notice how neon lettering, door numbers and calligraphic objects change letter edges and shadows through material."),
        life("穿搭", "Clothing", "看印字在拉伸布料、刺绣和反光材料上如何变形，文字不再只是平面。", "See how type changes on stretched fabric, embroidery and reflective material, no longer staying flat."),
        life("摄影", "Photography", "拍摄投影文字、玻璃遮挡或运动中的招牌，让可读性随着光和角度变化。", "Photograph projected text, glass occlusion or moving signs so legibility changes with light and angle."),
        life("日常物件", "Everyday objects", "看票据热敏字、压印标识和屏幕故障如何让字形暴露材料条件。", "Look at thermal receipts, embossed marks and screen errors exposing the material conditions of type.")
      ],
      comparisons: [
        compare("new-wave-typography", "都让文字不只承担传递内容的任务。", "Both let type do more than deliver content.", "New Wave Typography 有明确后现代平面排版背景；Experimental Typography 更广，可包括材料、动态、空间和生成系统。", "New Wave Typography has a specific postmodern graphic background; Experimental Typography is broader, including material, motion, space and generative systems."),
        compare("anti-design", "都可能挑战普通可读性和干净秩序。", "Both may challenge ordinary legibility and clean order.", "Experimental Typography 主要探索字形和阅读边界；Anti-Design 更常用冲突、过量和反商业姿态质疑设计规范。", "Experimental Typography explores letterform and reading boundaries; Anti-Design more often questions design norms through conflict, excess and anti-commercial stance.")
      ],
      reflectionPrompt: bi("字变得难读时，你会寻找内容，还是开始欣赏字形如何生成？", "When type becomes hard to read, do you search for content, or notice how the letterform is being made?")
    },

    "kinetic-poster": {
      openingQuestion: bi(
        "画面明明静止，却让你的眼睛想跟着移动；这种运动感从哪里开始？",
        "The image is still, yet your eye wants to move with it; where does that sense of motion begin?"
      ),
      observe: [
        observe("repetition", "先看重复与偏移", "Begin with repetition and offset", "同一形状、文字或图像连续错开，像时间被切成几片同时放在纸上。", "The same shape, word or image is offset in sequence, as if time were sliced and placed on the page at once."),
        observe("direction", "再看方向线索", "Read directional cues", "模糊、箭头感、比例变化和斜向布局会推动视线，不需要真实动画也能产生动势。", "Blur, arrow-like cues, scale changes and diagonal layout push the eye, creating motion without actual animation."),
        observe("rhythm", "最后看节奏", "Follow the rhythm", "元素之间的间距像节拍，密集处加速，空白处停顿，让静止图像带着时间感。", "Spacing works like beats: dense areas accelerate and empty areas pause, giving a still image a sense of time.")
      ],
      profile: {
        order: trait(4, "秩序带有节奏", "Rhythmic order"),
        color: trait(3, "色彩服务动势", "Color serves motion"),
        ornament: trait(2, "装饰从属速度", "Ornament follows speed"),
        emotion: trait(4, "情绪轻快推进", "Light, propulsive tone")
      },
      feelingWords: bi(["动势", "节奏", "偏移", "推进"], ["Motion", "Rhythm", "Offset", "Propulsive"]),
      everydayLife: [
        life("家居", "Home", "观察楼梯、百叶窗和重复灯具如何让视线按节奏移动。", "Notice how stairs, blinds and repeated lamps make the eye move rhythmically."),
        life("穿搭", "Clothing", "看条纹、褶皱和渐变比例如何在身体移动时产生连续阶段。", "See how stripes, folds and shifting scale create successive phases as the body moves."),
        life("摄影", "Photography", "用连拍、拖影或重复姿态表现时间经过，而不是依赖真正动画。", "Use sequence, motion blur or repeated posture to show time passing without requiring actual animation."),
        life("日常物件", "Everyday objects", "看交通图、运动包装和活动海报如何用偏移、模糊和方向建立速度。", "Look at transit maps, sports packaging and event posters building speed with offset, blur and direction.")
      ],
      comparisons: [
        compare("futurism", "都通过重复、斜向和连续阶段表现运动。", "Both show motion through repetition, diagonals and successive phases.", "Futurism 是迷恋速度与工业现代性的历史运动；Kinetic Poster 是更通用的静态图像动感方法。", "Futurism is a historical movement fascinated by speed and industrial modernity; Kinetic Poster is a more general method for motion in still images."),
        compare("op-art", "都能让静止表面产生运动错觉。", "Both can make a still surface produce the illusion of motion.", "Kinetic Poster 多靠偏移、模糊、方向和节奏模拟时间；Op Art 更依靠高频重复、图地关系和观看距离产生视网膜振动。", "Kinetic Poster simulates time through offset, blur, direction and rhythm; Op Art relies on high-frequency repetition, figure-ground relations and viewing distance.")
      ],
      reflectionPrompt: bi("你感到画面在移动，是因为形状真的变了，还是你的眼睛被节奏牵动？", "Do you feel the image moving because forms changed, or because rhythm pulled your eye?")
    },

    "op-art": {
      openingQuestion: bi(
        "这些重复图形没有真的动，可你的眼睛为什么会感觉表面在闪烁或起伏？",
        "These repeated forms are not actually moving, so why does your eye feel the surface flicker or swell?"
      ),
      observe: [
        observe("frequency", "先看高频重复", "Begin with high-frequency repetition", "细密线条、格子或圆点反复接近，让眼睛难以一次固定在稳定边界上。", "Dense lines, grids or dots repeat closely, making it difficult for the eye to settle on one stable edge."),
        observe("ground", "再看图形背景关系", "Read figure and ground", "黑白、明暗或互补色互相争夺前后位置，图形和背景会像在交换角色。", "Black-white, value or complementary contrasts compete for front and back, so figure and ground seem to exchange roles."),
        observe("distance", "最后看观看距离", "Change viewing distance", "远看和近看会产生不同振动、弯曲或凸起感；部分高频图案可能让人不适，需要允许移开视线。", "Near and far views create different vibration, bending or swelling; some high-frequency patterns may feel uncomfortable, so looking away is fine.")
      ],
      profile: {
        order: trait(5, "重复秩序极强", "Extremely strong repeated order"),
        color: trait(3, "色彩用于视错觉", "Color serves optical effect"),
        ornament: trait(3, "图案密度高", "High pattern density"),
        emotion: trait(4, "情绪警觉跳动", "Alert, flickering tone")
      },
      feelingWords: bi(["振动", "错觉", "精密", "闪烁"], ["Vibrating", "Illusory", "Precise", "Flickering"]),
      everydayLife: [
        life("家居", "Home", "观察细格窗帘、瓷砖和地毯在不同距离下如何改变稳定感，必要时减少密度。", "Notice how fine curtains, tiles and rugs change stability at different distances, reducing density when needed."),
        life("穿搭", "Clothing", "看密条纹和小格纹如何随身体移动产生闪烁感，选择时也照顾观看舒适。", "See how tight stripes and small checks flicker with movement, while considering viewing comfort."),
        life("摄影", "Photography", "拍摄栏杆、百叶窗和网格立面，比较近景与远景中的图地变化。", "Photograph railings, blinds and grid facades, comparing figure-ground shifts close up and far away."),
        life("日常物件", "Everyday objects", "看包装防伪纹、屏幕摩尔纹和织物纹理如何让静止表面显得在动。", "Look at security patterns, screen moire and fabric texture making a still surface feel active.")
      ],
      comparisons: [
        compare("kinetic-poster", "都让静止图像产生运动感。", "Both create motion in still images.", "Op Art 主要依靠重复、图地和观看距离造成视错觉；Kinetic Poster 更常通过偏移、模糊和方向表现时间节奏。", "Op Art relies on repetition, figure-ground and viewing distance for optical illusion; Kinetic Poster more often uses offset, blur and direction to show time rhythm."),
        compare("fractal-art", "都可能使用高度重复和数学感图案。", "Both may use intense repetition and mathematical pattern.", "Op Art 关注观看时的视网膜振动和图地转换；Fractal Art 更强调递归结构、尺度自相似和数字生成的无限细节。", "Op Art focuses on retinal vibration and figure-ground switching; Fractal Art stresses recursive structure, self-similar scale and digitally generated detail.")
      ],
      reflectionPrompt: bi("你会享受这种眼睛被唤醒的感觉，还是更想退到安静表面？", "Do you enjoy having your eye awakened this way, or want to return to a quieter surface?")
    },

    "conceptual-art": {
      openingQuestion: bi(
        "如果作品最重要的部分不是物件本身，而是它提出的问题，你会从哪里开始看？",
        "If the most important part is not the object itself but the question it raises, where do you begin looking?"
      ),
      observe: [
        observe("idea", "先看概念位置", "Begin with the concept's place", "作品可能把想法、规则、题名或指令放在物件之前，物质形式反而变得很克制。", "A work may place idea, rule, title or instruction before the object, making the physical form restrained."),
        observe("language", "再看语言与记录", "Read language and record", "文字、照片、清单、地图或档案可以成为作品的一部分，而不只是说明材料。", "Text, photograph, list, map or archive can become part of the work, not merely explanatory material."),
        observe("context", "最后看展示制度", "Ask about context", "同一物件在展厅、文件或日常环境中意义会改变，作品也许正在询问谁决定它被怎样理解。", "The same object changes meaning in a gallery, document or daily setting; the work may ask who decides how it is understood.")
      ],
      profile: {
        order: trait(4, "概念秩序清楚", "Clear conceptual order"),
        color: trait(1, "色彩通常克制", "Color often restrained"),
        ornament: trait(1, "装饰不是重点", "Ornament is not central"),
        emotion: trait(3, "情绪思辨开放", "Reflective, open tone")
      },
      feelingWords: bi(["提问", "语言", "语境", "克制"], ["Questioning", "Linguistic", "Contextual", "Restrained"]),
      everydayLife: [
        life("家居", "Home", "观察一张清单、标签或摆放位置如何改变物件意义，而不是只看物件是否好看。", "Notice how a list, label or placement changes an object's meaning, not only whether it looks good."),
        life("穿搭", "Clothing", "看衣服上的文字、编号和穿着场合如何提出身份问题，而不把口号当作全部答案。", "See how words, numbers and occasion on clothing raise questions of identity without treating slogans as the whole answer."),
        life("摄影", "Photography", "拍摄同一物件在不同语境中的位置，比较题名和环境如何改变观看。", "Photograph the same object in different contexts, comparing how title and setting change the looking."),
        life("日常物件", "Everyday objects", "看票、证件、说明书和档案袋如何因为制度关系而拥有超过材料本身的意义。", "Look at tickets, IDs, manuals and folders carrying meaning beyond their material through institutional relations.")
      ],
      comparisons: [
        compare("dada", "都可能使用现成物、语言和制度语境来质疑艺术边界。", "Both may use readymades, language and institutional context to question art boundaries.", "Dada 更带有战时反权威、荒谬和前卫表演背景；Conceptual Art 更系统地让概念、指令和记录先于物件。", "Dada carries wartime anti-authority, absurd and performance contexts; Conceptual Art more systematically places concept, instruction and record before object."),
        compare("editorial-illustration", "都可能借文字与图像关系表达抽象问题。", "Both can use text-image relations to express abstract issues.", "Editorial Illustration 通常服务一篇文章或公共议题的可读表达；Conceptual Art 可能把表达条件本身变成作品问题。", "Editorial Illustration usually serves readable expression of an article or public issue; Conceptual Art may turn the conditions of expression into the work's question.")
      ],
      reflectionPrompt: bi("当作品把答案留给你时，你会觉得被拒绝，还是被邀请一起思考？", "When a work leaves the answer to you, do you feel refused, or invited to think with it?")
    },

    dali: {
      openingQuestion: bi(
        "这个梦境为什么看起来这么清楚：是物体荒诞，还是写实表面让荒诞更可信？",
        "Why does this dream look so clear: are the objects strange, or does the realistic surface make the strangeness believable?"
      ),
      observe: [
        observe("surface", "先看精细写实表面", "Begin with precise realism", "空间、影子和物体边缘常被画得很清楚，荒诞因此不像草图，而像真的发生过。", "Space, shadow and object edges are often rendered clearly, so the absurdity feels not like a sketch but like something that happened."),
        observe("transformation", "再看软化和变形", "Read softening and distortion", "坚硬物会变软，身体或日常物件被拉长、融化或错置，现实规则在局部失效。", "Hard things soften, and bodies or everyday objects stretch, melt or shift place, making rules of reality fail locally."),
        observe("persona", "最后看个人舞台", "See the personal stage", "Dalí 的语言包括梦境逻辑和强烈公众形象，不能把所有超现实图像都叫作 Dalí。", "Dali's language includes dream logic and a powerful public persona; not every Surrealist image should be called Dali-like.")
      ],
      profile: {
        order: trait(3, "空间清楚但逻辑错位", "Clear space with displaced logic"),
        color: trait(3, "色彩戏剧化克制", "Dramatic but controlled color"),
        ornament: trait(3, "细节精密突出", "Precise detail stands out"),
        emotion: trait(5, "情绪荒诞戏剧", "Absurd, theatrical emotion")
      },
      feelingWords: bi(["梦境", "荒诞", "精细", "变形"], ["Dreamlike", "Absurd", "Precise", "Distorted"]),
      everydayLife: [
        life("家居", "Home", "观察镜子、钟表和阴影如何改变物件确定性，但不要把任何奇怪物件都称为 Dalí。", "Notice how mirrors, clocks and shadows change certainty around objects, without calling every strange object Dali-like."),
        life("穿搭", "Clothing", "看硬软材质反差、夸张配件和尺度错位如何制造梦感，而不复制艺术家的个人符号。", "See how hard-soft contrast, exaggerated accessories and scale shifts create dream feeling without copying the artist's personal symbols."),
        life("摄影", "Photography", "用清晰光影拍摄不合常理的摆放，让荒诞来自真实空间里的错位。", "Use clear light and shadow to photograph illogical placement, letting absurdity come from displacement in real space."),
        life("日常物件", "Everyday objects", "看融化冰、弯曲塑料和反射器物如何让熟悉东西短暂失去稳定身份。", "Look at melting ice, bent plastic and reflective objects making familiar things briefly lose stable identity.")
      ],
      comparisons: [
        compare("surrealism", "都让梦、无意识和日常物件错位进入图像。", "Both bring dreams, the unconscious and displaced everyday objects into images.", "Surrealism 是更大的运动；Dalí 是其中一位艺术家，以精细写实表面、软化物体和公众形象特别突出。", "Surrealism is the broader movement; Dali is one artist within it, especially marked by precise realism, softened objects and public persona."),
        compare("magritte", "都让熟悉物件进入不合常理的关系。", "Both place familiar objects in illogical relations.", "Dalí 更常戏剧化、细密和梦境空间强烈；Magritte 更冷静地用日常物体、遮挡、文字和语境错位提出问题。", "Dali is often more theatrical, detailed and dream-spatial; Magritte more calmly uses everyday objects, occlusion, text and contextual displacement to pose questions.")
      ],
      reflectionPrompt: bi("你更相信这个梦，是因为它荒诞，还是因为它被画得太清楚？", "Do you believe this dream because it is absurd, or because it is rendered so clearly?")
    },

    magritte: {
      openingQuestion: bi(
        "这件普通物体为什么突然不普通了：是位置变了，还是它和文字、尺度的关系变了？",
        "Why has this ordinary object become strange: did its position change, or its relation to words and scale?"
      ),
      observe: [
        observe("ordinary", "先看日常物体", "Begin with ordinary objects", "帽子、苹果、窗、云和室内空间常被冷静画出，奇异感来自关系而不是表面扭曲。", "Hats, apples, windows, clouds and rooms are often painted calmly; strangeness comes from relation rather than surface distortion."),
        observe("occlusion", "再看遮挡与尺度", "Read occlusion and scale", "物体可能挡住脸、穿过空间或被放到不合比例的位置，让你怀疑看见与理解是否相同。", "An object may cover a face, pass through space or sit at impossible scale, making you doubt whether seeing equals understanding."),
        observe("language", "最后看文字图像关系", "Ask about word and image", "题名、句子或标签可能否定眼前图像，作品的冷静语气让问题更尖锐。", "Titles, sentences or labels may contradict the image before you, and the calmness makes the question sharper.")
      ],
      profile: {
        order: trait(4, "画面秩序冷静", "Calm pictorial order"),
        color: trait(3, "色彩清楚克制", "Clear, restrained color"),
        ornament: trait(1, "装饰很少", "Very little ornament"),
        emotion: trait(4, "情绪安静诡异", "Quietly uncanny tone")
      },
      feelingWords: bi(["冷静", "错位", "遮挡", "疑问"], ["Calm", "Displaced", "Occluded", "Questioning"]),
      everydayLife: [
        life("家居", "Home", "观察镜子、门框和窗景如何让一个普通物件因为位置改变而变得陌生。", "Notice how mirrors, doorframes and window views make an ordinary object strange by changing its position."),
        life("穿搭", "Clothing", "看帽子、围巾和图案如何遮挡或替换身份线索，但避免复制特定作品符号。", "See how hats, scarves and motifs obscure or replace identity cues without copying symbols from specific works."),
        life("摄影", "Photography", "拍摄物体遮住脸、天空进入室内或文字否定图像的场景，让问题保持冷静。", "Photograph objects covering faces, sky entering interiors or words contradicting images, keeping the question calm."),
        life("日常物件", "Everyday objects", "看标签、说明和物品本身何时不一致，日常语言怎样改变观看。", "Look at moments when labels, instructions and objects disagree, and how everyday language changes looking.")
      ],
      comparisons: [
        compare("surrealism", "都打破日常逻辑，并让熟悉物件产生陌生关系。", "Both break ordinary logic and make familiar objects enter strange relations.", "Surrealism 是更广运动；Magritte 的个人语言更冷静、写实、概念化，常围绕文字、遮挡和语境错位。", "Surrealism is the broader movement; Magritte's personal language is calmer, realistic and conceptual, often around words, occlusion and contextual displacement."),
        compare("dali", "都以清楚描绘制造不合常理的图像。", "Both use clear depiction to create illogical images.", "Magritte 少有 Dalí 式软化物体和戏剧梦境表面，更常把普通物件放进安静而尖锐的逻辑问题。", "Magritte rarely uses Dali-like softened objects and theatrical dream surfaces; he more often places ordinary things inside quiet, sharp logical questions.")
      ],
      reflectionPrompt: bi("你会急着解释这个谜，还是愿意让它继续改变你对普通物的信任？", "Do you rush to solve the puzzle, or let it keep changing your trust in ordinary things?")
    },

    "edward-hopper": {
      openingQuestion: bi(
        "这里的人物没有说话时，光线、窗户和房间切面已经替他们留下故事了吗？",
        "When the figures say nothing, have light, windows and room sections already left a story for them?"
      ),
      observe: [
        observe("space", "先看建筑切面", "Begin with cutaway space", "房间、餐馆和街角像被切开观看，窗框与墙面让人物处在清楚却封闭的位置。", "Rooms, diners and corners feel cut open for viewing; window frames and walls place figures in clear but enclosed positions."),
        observe("distance", "再看人物距离", "Read human distance", "人物可能相隔不远，却被桌子、窗光或视线方向隔开；这不必直接等同于悲伤。", "Figures may be physically close yet separated by tables, window light or gaze direction; this need not mean simple sadness."),
        observe("light", "最后看人工与自然光", "Watch artificial and natural light", "强烈日光、夜间灯光和大片阴影制造叙事留白，让城市空间像暂停的一刻。", "Hard daylight, night lighting and broad shadow create narrative gaps, making urban space feel paused.")
      ],
      profile: {
        order: trait(4, "空间秩序清楚", "Clear spatial order"),
        color: trait(3, "色彩安静集中", "Quiet, focused color"),
        ornament: trait(1, "装饰很少", "Little ornament"),
        emotion: trait(4, "情绪张力含蓄而持续", "Quiet but sustained emotional tension")
      },
      feelingWords: bi(["停顿", "城市", "距离", "光线"], ["Paused", "Urban", "Distant", "Lit"]),
      everydayLife: [
        life("家居", "Home", "观察窗边椅子、门口光线和空桌面如何让房间像有故事却未说完。", "Notice how a chair by a window, light at a doorway or an empty table makes a room feel storied but unfinished."),
        life("穿搭", "Clothing", "看简单轮廓、低饱和颜色和人物姿态如何在空间里保持距离感。", "See how simple silhouette, muted color and posture hold distance within space."),
        life("摄影", "Photography", "拍摄咖啡馆、车站和夜窗时，保留人物之间的空隙和光线方向。", "When photographing cafes, stations and night windows, preserve gaps between people and the direction of light."),
        life("日常物件", "Everyday objects", "看台灯、百叶窗、杯子和空椅子如何在没有人物时也留下使用痕迹。", "Look at lamps, blinds, cups and empty chairs leaving traces of use even without figures.")
      ],
      comparisons: [
        compare("realism", "都从可识别的日常场景和人物关系出发。", "Both begin from recognizable daily scenes and human relations.", "Realism 是更广的社会与日常再现立场；Edward Hopper 的语言尤其依靠建筑切面、光线、城市空间和叙事留白。", "Realism is a broader stance toward social and everyday representation; Edward Hopper's language especially relies on cutaway architecture, light, urban space and narrative silence."),
        compare("noir-illustration", "都可能使用城市夜景、强光影和疏离人物。", "Both may use urban night, stark light and distant figures.", "Hopper 的画面更安静、开放，不一定服务犯罪叙事；Noir Illustration 更来自电影和出版类型中的悬疑光影。", "Hopper's images are quieter and more open, not necessarily serving crime narrative; Noir Illustration comes more from suspenseful lighting in film and publishing genres.")
      ],
      reflectionPrompt: bi("你是在替人物补故事，还是被空间和光线本身留住了？", "Are you inventing a story for the figures, or being held by the space and light itself?")
    },

    pollock: {
      openingQuestion: bi(
        "这些线条像不是被画在画布上，而是身体绕着画布移动后留下的轨迹吗？",
        "Do these lines feel less painted onto canvas than left by a body moving around it?"
      ),
      observe: [
        observe("process", "先看滴洒与倾倒", "Begin with dripping and pouring", "颜料以滴洒、倾倒和甩动形成线网，痕迹记录速度、距离和手臂范围。", "Paint forms networks through dripping, pouring and flinging, recording speed, distance and the reach of the arm."),
        observe("field", "再看全覆盖画面", "Read the allover field", "视线很难找到唯一中心，线条在整个表面延展，让观看像进入一片密度不同的场。", "The eye has trouble finding one center; lines extend across the whole surface, making viewing a field of changing density."),
        observe("myth", "最后避开天才神话", "Avoid the genius myth", "重点不是浪漫化个人困境，而是看制作行为、层次、重力和身体移动如何留在画面里。", "The point is not romanticizing personal struggle, but seeing how action, layers, gravity and bodily movement remain in the image.")
      ],
      profile: {
        order: trait(2, "秩序扩散全覆盖", "Diffuse allover order"),
        color: trait(3, "颜色服从层次", "Color serves layering"),
        ornament: trait(2, "线网不是装饰", "Line network is not ornament"),
        emotion: trait(5, "情绪动作强烈", "Strong action-based emotion")
      },
      feelingWords: bi(["滴洒", "身体", "密度", "轨迹"], ["Dripped", "Bodily", "Dense", "Trace-like"]),
      everydayLife: [
        life("家居", "Home", "观察大地毯、桌面划痕和墙面刷痕如何显示动作范围，而不把随意泼洒当作同义词。", "Notice how a large rug, tabletop scratches and wall brush marks show the range of action without equating casual splashing with the language."),
        life("穿搭", "Clothing", "看线条印花和层叠纱线如何形成全身节奏，同时避免复制特定作品表面。", "See how line prints and layered yarn create body-wide rhythm while avoiding copies of specific work surfaces."),
        life("摄影", "Photography", "从近处拍材料轨迹，再退远看整体密度，比较动作和场域两种信息。", "Photograph material traces up close, then step back for overall density, comparing action and field."),
        life("日常物件", "Everyday objects", "看油漆桶边缘、调色盘和工作台如何记录重力、甩动和层层覆盖。", "Look at paint-can rims, palettes and worktables recording gravity, flicking and layered coverage.")
      ],
      comparisons: [
        compare("abstract-expressionism", "都关联大尺度、身体动作和抽象绘画场域。", "Both relate to large scale, bodily action and the field of abstract painting.", "Pollock 是具体艺术家，以地面作画、滴洒和全覆盖线网著称；Abstract Expressionism 是更广运动，包含许多不同路径。", "Pollock is a specific artist known for floor-based process, dripping and allover networks; Abstract Expressionism is a broader movement with many paths."),
        compare("color-field-painting", "都弱化传统主体，并让观看面对大面积画面。", "Both weaken traditional subject matter and make viewing face a large pictorial field.", "Pollock 的场域由线网、动作和层次形成；Color Field Painting 更集中于连续色面、染色表面和弱化中心手势。", "Pollock's field forms through line networks, action and layers; Color Field Painting focuses on continuous color, stained surface and reduced central gesture.")
      ],
      reflectionPrompt: bi("你更先看到混乱，还是看到动作在整个表面建立出的密度？", "Do you first see chaos, or the density built by action across the whole surface?")
    },

    basquiat: {
      openingQuestion: bi(
        "这些文字、数字和身体图像同时出现时，你是在读信息，还是在面对一层层被擦写的历史？",
        "When words, numbers and bodily images appear together, are you reading information or facing layers of history being written and crossed out?"
      ),
      observe: [
        observe("language", "先看文字与删除线", "Begin with writing and crossing out", "词语、数字和重复书写常被划掉又保留，像让信息在显露和拒绝解释之间摇摆。", "Words, numbers and repeated writing are often crossed out yet retained, making information hover between exposure and refusal to explain."),
        observe("symbols", "再看符号并置", "Read juxtaposed signs", "解剖形象、头部、皇冠或街头标记彼此碰撞，但不能把任何符号固定成单一字典。", "Anatomical images, heads, crowns or street marks collide, but no symbol should be fixed into a single dictionary."),
        observe("context", "最后看文化张力", "Hold the cultural tension", "他的语言连接纽约街头、画廊、黑人历史、海地与波多黎各家庭背景和艺术市场，不能把这些当装饰标签。", "His language connects New York streets, galleries, Black history, Haitian and Puerto Rican family background and the art market; these are not decorative labels.")
      ],
      profile: {
        order: trait(2, "秩序碰撞分层", "Colliding, layered order"),
        color: trait(4, "色彩直接粗粝", "Direct, rough color"),
        ornament: trait(3, "符号密度较高", "High sign density"),
        emotion: trait(5, "情绪尖锐复杂", "Sharp, complex emotion")
      },
      feelingWords: bi(["擦写", "并置", "历史", "紧迫"], ["Crossed-out", "Juxtaposed", "Historical", "Urgent"]),
      everydayLife: [
        life("家居", "Home", "观察便签、旧书页和墙面涂写如何叠出生活痕迹，不把个人符号语言变成装饰模板。", "Notice how notes, old pages and wall writing layer traces of life without turning a personal sign language into decor."),
        life("穿搭", "Clothing", "看文字、数字和手绘线如何表达经历与身份，同时避免挪用黑人文化或复制签名式图像。", "See how words, numbers and drawn lines express experience and identity while avoiding appropriation of Black culture or signature imagery."),
        life("摄影", "Photography", "拍摄街头文字、博物馆标签和人物身体之间的关系，保留社会语境而非只取表面能量。", "Photograph relations among street text, museum labels and bodies, preserving social context rather than taking surface energy alone."),
        life("日常物件", "Everyday objects", "看课本批注、账单数字和药盒图示如何把知识、身体和制度放到同一张纸上。", "Look at textbook notes, bill numbers and medicine-box diagrams putting knowledge, body and institution on one page.")
      ],
      comparisons: [
        compare("expressionism", "都允许线条、颜色和形体承载强烈主观经验。", "Both allow line, color and form to carry forceful subjective experience.", "Expressionism 是更广的主观形变语言；Basquiat 的个人语言更集中于文字、符号、解剖图像、黑人历史和纽约文化张力。", "Expressionism is a broader language of subjective distortion; Basquiat's personal language centers more on writing, signs, anatomy, Black history and New York cultural tension."),
        compare("punk-diy", "都可能显露手写、街头能量和反精修表面。", "Both may expose handwriting, street energy and anti-polished surfaces.", "Punk DIY 更指向剪贴、复印和社群自主传播；Basquiat 不能被简化为朋克涂鸦，必须保留其艺术、历史和身份语境。", "Punk DIY points more to collage, photocopy and community self-publishing; Basquiat cannot be reduced to punk graffiti and must retain artistic, historical and identity contexts.")
      ],
      reflectionPrompt: bi("你会把这些符号当成谜题解码，还是先承认它们来自复杂语境？", "Do you decode these signs like a puzzle, or first acknowledge the complex contexts they come from?")
    }
  });

  Object.assign(window.STYLE_AESTHETIC_GUIDES, {
    renoir: fullGuide(
      ["先别追着人物的表情。光是否像穿过树叶和空气，把皮肤、布料与背景连成了一片温度？", "Before following the figures' expressions, notice whether light passes through leaves and air, joining skin, fabric and background into one field of warmth."],
      [
        ["light", "先看斑驳亮部", "Begin with the broken light", "亮色常落在脸、肩部和衣裙上，边缘被周围色彩轻轻融化。", "Light catches faces, shoulders and dresses while surrounding color gently dissolves their edges."],
        ["color", "再看暖色如何呼应", "Then follow the warm echoes", "粉、橙、金和蓝绿在皮肤与环境之间反复出现，人物不会像被剪贴到背景上。", "Pink, orange, gold and blue-green recur across skin and setting, keeping figures from looking pasted onto the background."],
        ["gesture", "最后看轻松的姿态", "Finally, notice the relaxed gestures", "偏转的头、交叠的手和正在移动的衣褶让场景像聚会中被短暂留住。", "Turned heads, folded hands and moving drapery make the scene feel briefly held in the middle of social life."]
      ],
      [[3, "构图稳定而柔和", "Stable, gentle order"], [4, "暖色丰富互渗", "Rich interwoven warm color"], [3, "表面细节柔润", "Soft surface detail"], [4, "情绪亲密明亮", "Intimate, bright emotion"]],
      [["温暖", "斑驳", "亲密", "轻快"], ["Warm", "Dappled", "Intimate", "Lively"]],
      [
        ["家居", "Home", "观察窗边、木色和布料如何用小片暖光把人与房间连起来。", "Notice how window light, wood tones and fabric connect people to a room through small patches of warmth."],
        ["穿搭", "Clothing", "将粉、珊瑚或奶油色与一点冷色并置，看颜色如何随动作相互反照。", "Place pink, coral or cream beside one cool accent and watch how colors reflect into one another as the body moves."],
        ["摄影", "Photography", "在树荫或露天聚会中保留斑驳光点，不必把每张脸都照得一样平。", "Keep dappled light at a gathering under trees instead of lighting every face with the same flatness."],
        ["日常物件", "Everyday objects", "看花束、瓷杯和果盘的反光如何把相邻颜色轻轻带到对方表面。", "See how reflections on flowers, cups and fruit carry neighboring colors gently across their surfaces."]
      ],
      [
        ["impressionism", "都用可见笔触和变动光色留住瞬间。", "Both use visible brushwork and changing light to hold a passing moment.", "印象派是更广的共同语境；雷诺阿式语言更聚焦人物、皮肤、社交场景与暖色气氛。", "Impressionism is the broader shared context; Renoir's language focuses more on figures, skin, sociability and warm atmosphere."],
        ["monet", "都观察户外光色如何改变可见表面。", "Both observe how outdoor light changes visible surfaces.", "Monet 更常让水、雾、花园和系列时间成为主角；Renoir 更常把光落在人际距离与身体姿态上。", "Monet more often centers water, mist, gardens and serial time; Renoir more often lets light settle on social distance and bodily gesture."]
      ],
      ["你是先被人物间的亲密吸引，还是先感到光在整个场景中流动？", "Are you drawn first to intimacy between people, or to light moving through the whole scene?"]
    ),

    xieyi: fullGuide(
      ["这几笔看起来很少，却让你认出了花、鸟或山石吗？哪一处是它的神情？", "These few strokes may already suggest a flower, bird or rock. Which mark carries its living character?"],
      [
        ["gesture", "先看一气呵成的笔势", "Begin with the continuous gesture", "墨痕的提按、快慢和断连同时交代形状与书写的身体动作。", "Pressure, speed and broken or joined ink marks describe form while recording the body's act of writing."],
        ["essence", "再看取舍", "Then, notice what is omitted", "细节被大量省略，只保留最能显出姿态、重量和气息的部分。", "Most detail is omitted, leaving the parts that best convey posture, weight and vitality."],
        ["ink", "最后看墨与水的意外", "Finally, watch ink meet water", "渗化、飞白和浓淡并不是失控，它们让物象在清楚与未尽之间保持活性。", "Bleeding, dry-brush gaps and tonal shifts are not accidents; they keep the subject alive between clarity and incompletion."]
      ],
      [[2, "秩序来自笔势", "Order carried by gesture"], [1, "色彩极克制", "Very restrained color"], [1, "不依赖装饰", "Little reliance on ornament"], [4, "情趣凝练鲜活", "Condensed, vivid spirit"]],
      [["概括", "飞白", "活气", "留白"], ["Suggestive", "Dry-brushed", "Alive", "Open"]],
      [
        ["家居", "Home", "从房间里留下一两个最能定义气息的物件，让其余空间继续说话。", "Keep one or two objects that define the room's character and let the remaining space continue the statement."],
        ["穿搭", "Clothing", "用一个明确轮廓和一处自然垂落表达姿态，不必靠密集纹样填满。", "Use one clear silhouette and one natural drape to express posture without filling the look with dense pattern."],
        ["摄影", "Photography", "只拍最能显出动作的轮廓或局部，看省略能否让观者自行补全。", "Photograph only the contour or fragment that best carries the action and see whether omission invites completion."],
        ["日常物件", "Everyday objects", "观察快速手写、茶渍和旧纸边缘如何在不完美中保留动作。", "Notice how quick handwriting, tea stains and worn paper edges preserve action through imperfection."]
      ],
      [
        ["chinese-ink-painting", "都以墨、水、笔势和留白建立画面。", "Both build images through ink, water, brush movement and blank space.", "中国水墨画包含工笔、山水、花鸟等多条路径；写意更强调概括物象并捕捉意趣。", "Chinese ink painting includes meticulous, landscape, bird-and-flower and other paths; Xieyi more specifically condenses the subject to capture spirit."],
        ["gongbi", "都来自中国绘画传统，也都需要练习与控制。", "Both belong to Chinese painting traditions and require disciplined practice.", "工笔依靠精细勾线、分层设色和完整形体；写意以更少的笔墨保留生动气息。", "Gongbi relies on precise contour, layered color and complete form; Xieyi keeps living energy through fewer marks."]
      ],
      ["当细节被省略时，你是更容易感到生命力，还是更需要清楚的轮廓？", "When detail is omitted, do you feel more vitality, or do you want a clearer contour?"]
    ),

    "yamato-e": fullGuide(
      ["你的视线会沿着云带和建筑一层层移动，像在读一段被展开的故事吗？", "Does your eye move through cloud bands and buildings layer by layer, as if reading a story being gradually unrolled?"],
      [
        ["narrative", "先看故事的分段", "Begin with the narrative divisions", "金色或雾状云带遮挡部分空间，同时把场景分成可以顺序阅读的片段。", "Gold or mist-like cloud bands obscure parts of the space while dividing scenes into readable narrative passages."],
        ["viewpoint", "再看掀顶式视角", "Then, notice the roofless viewpoint", "屋顶像被移开，观者从斜上方同时看到室内人物、庭院与建筑格局。", "Roofs appear removed so the viewer can see interiors, figures, gardens and architecture from an elevated angle."],
        ["season", "最后看季节与文学", "Finally, read season and literature", "花木、服饰、诗意题材和宫廷生活共同提示时令、人际关系与情绪。", "Plants, clothing, poetic subjects and court life together signal season, relationship and mood."]
      ],
      [[4, "故事秩序层层展开", "Layered narrative order"], [4, "色彩明亮而雅致", "Bright, refined color"], [4, "金色与纹样丰富", "Rich gold and pattern"], [3, "情绪含蓄叙事", "Subtle narrative emotion"]],
      [["层叠", "宫廷", "季节", "叙事"], ["Layered", "Courtly", "Seasonal", "Narrative"]],
      [
        ["家居", "Home", "看屏风、推拉门和高低错落的桌面如何把一个房间分成连续场景。", "See how screens, sliding doors and surfaces at different heights divide one room into connected scenes."],
        ["穿搭", "Clothing", "观察多层衣摆、小面积纹样和季节色彩如何记录身体的移动。", "Notice how layered hems, small patterns and seasonal colors record the body's movement."],
        ["摄影", "Photography", "从高处拍摄庭院或聚会，用建筑边缘和遮挡将多个小情节连起来。", "Photograph a garden or gathering from above, using architecture and occlusion to connect several small episodes."],
        ["日常物件", "Everyday objects", "将信纸、花枝和布料当成一段季节日记，看物件之间是否能形成叙事。", "Treat paper, a flowering branch and fabric as a seasonal diary and see whether the objects form a narrative."]
      ],
      [
        ["ukiyo-e", "都使用清楚平面、大胆分区和日本题材。", "Both use clear planes, bold divisions and Japanese subject matter.", "Yamato-e 源于宫廷文学、手卷与屏风传统，常展开古典叙事；浮世绘更聚焦江户时代的城市生活和版画传播。", "Yamato-e grows from court literature, handscrolls and screens, often unfolding classical narratives; Ukiyo-e centers more on Edo urban life and print circulation."],
        ["nihonga", "都会使用矿物色、金色和日本传统题材。", "Both may use mineral color, gold and Japanese traditional subjects.", "Yamato-e 是历史悠久的类型与绘画惯例；Nihonga 是近代形成的概念，在现代美术制度中重新界定材料与传统。", "Yamato-e is a long historical genre and set of conventions; Nihonga is a modern category that redefined material and tradition within modern art institutions."]
      ],
      ["你会把画面当成一幅整体来看，还是会沿着它一段一段读下去？", "Do you see the image as one whole, or read it passage by passage?"]
    ),

    "persian-miniature": fullGuide(
      ["画面里似乎每个角落都在讲故事。你的视线是被中心吸住，还是在细节间游走？", "Every corner seems to tell part of the story. Is your eye held by a center, or does it wander among details?"],
      [
        ["space", "先看折叠的空间", "Begin with the folded space", "建筑、花园和人物以斜上方视角层叠，不必服从单一透视点。", "Architecture, gardens and figures stack from an elevated angle without obeying a single vanishing point."],
        ["detail", "再看小而精密的纹样", "Then, inspect the miniature detail", "地毯、衣料、植物和建筑表面充满可以近距离阅读的纹样与色彩。", "Carpets, textiles, plants and buildings hold patterns and color meant for close reading."],
        ["manuscript", "最后看图像与文字的关系", "Finally, notice image beside text", "许多绘画本来属于手稿书页，边框、书法和画面共同构成阅读节奏。", "Many paintings belonged to manuscript pages, where borders, calligraphy and image form one rhythm of reading."]
      ],
      [[5, "层叠秩序精密", "Dense layered order"], [5, "色彩浓郁清亮", "Rich, clear color"], [5, "纹样与金饰繁密", "Dense pattern and gold"], [3, "叙事情绪含蓄", "Subtle narrative emotion"]],
      [["精密", "层叠", "珠宝色", "叙事"], ["Intricate", "Layered", "Jewel-toned", "Narrative"]],
      [
        ["家居", "Home", "观察地毯、瓷砖和书架如何在小范围内建立密集但清楚的细节层次。", "Notice how rugs, tiles and bookshelves create dense but legible layers of detail within a small area."],
        ["穿搭", "Clothing", "将精细纹样集中在一层布料上，其余层次用纯色托住，避免每处同时竞争。", "Concentrate intricate pattern on one layer and support it with quieter solids so every surface does not compete."],
        ["摄影", "Photography", "从高处拍摄庭院、餐桌或市场，让多个小动作共存而不必归向单一焦点。", "Photograph a courtyard, table or market from above, allowing several small actions to coexist without one focal point."],
        ["日常物件", "Everyday objects", "看书页边框、包装与手写文字如何一起引导阅读，而不只把花纹当装饰。", "See how page borders, packaging and handwriting guide reading together rather than treating pattern as surface decoration alone."]
      ],
      [
        ["indian-miniature", "都与手稿、宫廷赞助、叙事和精密绘制有关。", "Both relate to manuscripts, court patronage, narrative and meticulous painting.", "波斯与印度细密画在不同地区、王朝和工坊中彼此交流，但不能视为同一风格；需看具体作品的语言、服饰与题材。", "Persian and Indian miniature traditions exchanged ideas across regions, courts and workshops, but are not one style; language, dress and subject must be read in each specific work."],
        ["islamic-geometric", "都可以呈现精确边框、强烈节奏和繁密表面。", "Both can present precise borders, strong rhythm and richly worked surfaces.", "波斯细密画通常以人物和叙事场景展开书页；伊斯兰几何纹样更依靠无尽延展的比例、网格与对称。", "Persian miniature pages often unfold figures and narrative scenes; Islamic geometric pattern relies more on proportion, grids and symmetry that can extend without end."]
      ],
      ["面对这样密集的画面，你会顺着故事走，还是会停在某个小细节里？", "In such a dense image, do you follow the story or pause inside one small detail?"]
    ),

    "tibetan-thangka": fullGuide(
      ["中心人物与周围层层图像之间，你能感到一套严格的位置和比例关系吗？", "Can you sense a strict system of position and proportion between the central figure and the surrounding layers?"],
      [
        ["iconometry", "先看中轴与比例", "Begin with axis and proportion", "神圣人物的身体比例、手印与座位遵循图像规范，不是自由变形的装饰人物。", "Sacred figures follow iconometric conventions in body proportion, gesture and seat; they are not freely distorted decorative characters."],
        ["hierarchy", "再看环绕层级", "Then, read the surrounding hierarchy", "主尊、伴神、上师、供养与风景按宗教关系排列，大小不只表示距离。", "Principal deity, attendants, teachers, offerings and landscape are arranged by religious relation; size does not merely indicate distance."],
        ["symbol", "最后看颜色与持物", "Finally, read color and attributes", "人物颜色、手持物、姿态和座骑都有特定图像含义，不应脱离语境随意拼贴。", "Figure color, attributes, posture and mount carry specific iconographic meanings and should not be recombined without context."]
      ],
      [[5, "宗教层级严密", "Strict sacred hierarchy"], [5, "色彩饱和具象征", "Saturated symbolic color"], [5, "细节与边饰繁密", "Dense detail and borders"], [4, "情绪庄严集中", "Solemn, concentrated emotion"]],
      [["中轴", "神圣", "精密", "仪轨"], ["Axial", "Sacred", "Intricate", "Ritual"]],
      [
        ["家居", "Home", "观察中心物件、周围辅助物与边界如何建立清楚层级，但不把宗教图像当普通装饰。", "Notice how a central object, supporting objects and boundary create hierarchy without treating sacred imagery as ordinary decor."],
        ["穿搭", "Clothing", "体会对称、层叠与中心挂件如何稳定全身秩序，避免挪用不理解的宗教符号。", "Observe how symmetry, layers and a central pendant stabilize an outfit while avoiding sacred symbols you do not understand."],
        ["摄影", "Photography", "拍摄对称正面时，留意中心、四角和边界之间的等级关系。", "When photographing a frontal symmetrical subject, notice the hierarchy among center, corners and frame."],
        ["日常物件", "Everyday objects", "看教学图、地图或仪器面板如何用中心与环绕层级组织复杂信息。", "See how diagrams, maps or instrument panels organize complex information through center and surrounding levels."]
      ],
      [
        ["dunhuang-mural", "都与佛教图像、色彩象征和修行语境相关。", "Both relate to Buddhist imagery, symbolic color and devotional contexts.", "敦煌壁画依附石窟建筑，跨越多个时期并常展开大型叙事；唐卡通常是可悬挂卷轴，围绕特定尊像与仪轨。", "Dunhuang murals belong to cave architecture across many periods and often unfold broad narratives; thangkas are usually portable hanging scrolls centered on specific sacred figures and practices."],
        ["byzantine-icon", "都以正面化人物、象征色彩和明确层级服务宗教观想。", "Both use frontal figures, symbolic color and clear hierarchy in devotional viewing.", "唐卡属于藏传佛教及喜马拉雅艺术语境，有特定量度与尊像系统；拜占庭圣像属于东方基督教传统。", "Thangka belongs to Tibetan Buddhist and Himalayan contexts with specific iconometry and deity systems; Byzantine icons belong to Eastern Christian traditions."]
      ],
      ["当你不知道具体图像含义时，你能否先观察它的秩序，同时保留对宗教语境的尊重？", "When you do not know the exact iconography, can you observe its order while respecting the religious context?" ]
    ),

    "thai-temple-mural": fullGuide(
      ["一面墙上同时出现许多场景时，你能找到故事正在向哪个方向推进吗？", "When many scenes share one wall, can you find the direction in which the story is moving?"],
      [
        ["sequence", "先找连续叙事", "First, find the continuous narrative", "不同时间的人物与事件可以共处一幅壁画，建筑、山石和边界引导视线转场。", "Figures and events from different moments can share one mural, with buildings, rocks and boundaries guiding transitions."],
        ["hierarchy", "再看人物尺度", "Then, compare the scale of figures", "主要人物、王宫与神圣场景可能被放大或置于重要位置，尺度也表示叙事等级。", "Principal figures, palaces and sacred scenes may be enlarged or prominently placed; scale also marks narrative importance."],
        ["surface", "最后看金色与密集细节", "Finally, read gold and dense detail", "服饰、建筑与森林充满细线、金色和鲜艳色块，在庄严空间里建立强烈视觉节奏。", "Costume, architecture and forest fill with fine line, gold and vivid color, building visual rhythm within a sacred space."]
      ],
      [[4, "叙事秩序连续", "Continuous narrative order"], [5, "鲜艳色彩与金色", "Vivid color and gold"], [5, "建筑服饰细节繁密", "Dense architectural and costume detail"], [4, "情节与神圣感强", "Strong drama and sacred presence"]],
      [["连续", "金色", "繁密", "叙事"], ["Continuous", "Golden", "Dense", "Narrative"]],
      [
        ["家居", "Home", "观察长墙、走廊和楼梯如何让人边移动边阅读一组连续画面。", "Notice how a long wall, corridor or stair lets a viewer read a sequence while moving."],
        ["穿搭", "Clothing", "看金色边缘、鲜艳局部与层叠轮廓如何建立主次，而不复制宗教人物或仪式图案。", "See how gold edging, vivid accents and layered silhouette build hierarchy without copying sacred figures or ritual patterns."],
        ["摄影", "Photography", "拍摄节庆或街道时，让前景、中景和远景同时保留不同小情节。", "When photographing a festival or street, preserve different small episodes in foreground, middle ground and distance."],
        ["日常物件", "Everyday objects", "看长卷、连环包装或路线图如何不切断主线，却能容纳多个片段。", "See how scrolls, sequential packaging or route maps hold many episodes without breaking the main line."]
      ],
      [
        ["dunhuang-mural", "都把大量人物、建筑和叙事放进宗教建筑的壁面。", "Both place many figures, buildings and narratives across walls of religious architecture.", "泰国寺庙壁画来自泰国佛教、王宫与文学语境，如拉玛坚故事；敦煌壁画则来自中国石窟与丝路交流语境。", "Thai temple murals belong to Thai Buddhist, royal and literary contexts such as the Ramakien; Dunhuang murals belong to Chinese cave temples and Silk Road exchange."],
        ["indian-miniature", "都可以用鲜艳色彩、建筑分区和多人物展开叙事。", "Both can unfold narrative through vivid color, architectural divisions and many figures.", "泰国寺庙壁画是大尺度建筑表面，观者随空间移动；印度细密画更常属于小尺度书页或画册。", "Thai temple murals occupy large architectural surfaces traversed by viewers; Indian miniatures more often belong to small pages or albums."]
      ],
      ["你在这种密集叙事里是先找主角，还是先被整面墙的节奏吸引？", "In this dense narrative, do you first seek the protagonist or feel the rhythm of the whole wall?"]
    ),

    "byzantine-icon": fullGuide(
      ["人物正面朝向你，背后却没有普通风景。金色空间是在表示光，还是另一种现实？", "The figure faces you without an ordinary landscape behind it. Does the gold space represent light, or another order of reality?"],
      [
        ["gaze", "先看正面凝视", "Begin with the frontal gaze", "眼睛、手势和身体被安排成直接面对观者的存在，强调观想而不是自然抓拍。", "Eyes, gesture and body directly face the viewer, emphasizing contemplation rather than a natural snapshot."],
        ["gold", "再看金地", "Then, notice the gold ground", "背景弱化日常深度，金色反光把人物置于超越普通时空的宗教空间。", "The background suppresses ordinary depth, while reflected gold places the figure in a sacred space beyond everyday time."],
        ["type", "最后看固定图像类型", "Finally, read the established image type", "姿势、服饰、光环和题记遵循传统图像类型，微小变化也可以带出神学与祈祷含义。", "Pose, dress, halo and inscription follow established types in which small changes can carry theological and devotional meaning."]
      ],
      [[5, "图像秩序严格", "Strict iconographic order"], [4, "金色与深色庄严", "Solemn gold and deep color"], [4, "光环边框精致", "Refined halos and borders"], [4, "情绪肃穆凝视", "Solemn, contemplative emotion"]],
      [["正面", "金地", "庄严", "观想"], ["Frontal", "Gold-grounded", "Solemn", "Contemplative"]],
      [
        ["家居", "Home", "观察一件中心物与简洁背景如何建立安静凝视，但不把圣像复制为纯装饰。", "Notice how one centered object and a quiet background create contemplation without copying sacred icons as decor."],
        ["穿搭", "Clothing", "看正面对称、深色层次和少量金色如何带来仪式感，避免挪用神圣题记。", "See how frontal symmetry, deep layers and limited gold create ceremony while avoiding sacred inscriptions."],
        ["摄影", "Photography", "用正面光线和简单背景拍摄人物，观察目光如何改变与观者的关系。", "Photograph a person frontally against a simple ground and observe how the gaze changes the viewer's relation to the image."],
        ["日常物件", "Everyday objects", "看证件照、纪念牌和家庭肖像如何通过正面性与边框建立不同的凝视方式。", "Compare how IDs, memorial plaques and family portraits use frontality and framing to establish different forms of attention."]
      ],
      [
        ["renaissance", "都以基督教人物、手势和象征组织神圣叙事。", "Both organize sacred Christian narratives through figures, gestures and symbols.", "拜占庭圣像强调固定图像类型、正面凝视和超越日常的空间；文艺复兴绘画更强调人体体积、线性透视和可感世界。", "Byzantine icons stress established types, frontal contemplation and space beyond the everyday; Renaissance painting stresses bodily volume, linear perspective and the perceptible world."],
        ["tibetan-thangka", "都是服务信仰实践的神圣图像，使用明确层级和象征。", "Both are sacred images serving religious practice through hierarchy and symbol.", "两者属于不同宗教与文化传统；不能因为正面、金色和对称就互换其图像含义。", "They belong to different religious and cultural traditions; frontal pose, gold and symmetry do not make their iconography interchangeable."]
      ],
      ["你感到的是一位人物的存在，还是一套神圣图像秩序在与你对视？", "Do you feel the presence of one figure, or an entire sacred image system looking back at you?"]
    ),

    "native-american-art": fullGuide(
      ["在说它像什么之前，你能先问：这件作品来自哪个具体民族、地区、材料与用途吗？", "Before saying what it looks like, can you ask which specific nation, region, material and purpose it comes from?"],
      [
        ["specificity", "先看具体来源", "Begin with specific origin", "北美原住民艺术不是单一风格；陶器、编织、珠饰、木雕与绘画必须回到具体社群和时代阅读。", "North American Indigenous art is not one style; pottery, weaving, beadwork, carving and painting must be read through specific communities and periods."],
        ["material", "再看材料与使用", "Then, notice material and use", "皮革、树皮、羽毛、珠子、石头或植物纤维与当地环境、交易和生活实践相连。", "Hide, bark, feathers, beads, stone or plant fiber connect to local environments, exchange and lived practice."],
        ["continuity", "最后看延续与创新", "Finally, see continuity and innovation", "当代原住民艺术家不是只保存过去，也持续用新媒介回应身份、主权、历史与当下生活。", "Contemporary Indigenous artists do not merely preserve the past; they use new media to address identity, sovereignty, history and present life."]
      ],
      [[3, "秩序因社群与媒介而异", "Order varies by community and medium"], [4, "色彩与材料紧密相连", "Color closely tied to material"], [4, "纹样可承载具体含义", "Pattern may carry specific meaning"], [4, "情感与历史关系深", "Deep emotional and historical relation"]],
      [["多样", "在地", "持续", "具体"], ["Diverse", "Place-based", "Continuing", "Specific"]],
      [
        ["家居", "Home", "看一件编织、陶器或雕刻时，先阅读艺术家、民族、材料与用途标签，不用泛化的部落想象代替。", "When viewing weaving, pottery or carving, read the artist, nation, material and use before replacing them with a generalized tribal idea."],
        ["穿搭", "Clothing", "区分当代原住民设计师的作品与无来源仿制品，了解图案是否属于特定社群或仪式。", "Distinguish work by contemporary Indigenous designers from unattributed imitation and learn whether patterns belong to a specific community or ceremony."],
        ["摄影", "Photography", "拍摄文化活动或社群艺术时，先确认是否允许拍摄、如何标注及图像可否公开。", "Before photographing cultural events or community art, confirm permission, attribution and whether images may be shared."],
        ["日常物件", "Everyday objects", "查看博物馆或市场中物件的采集史、作者和归属，让来源也成为观看的一部分。", "Check an object's collecting history, maker and affiliation in museums or markets, making provenance part of looking."]
      ],
      [
        ["aboriginal-dot-painting", "都是仍在发展的原住民艺术，与土地、社群和知识传承有关。", "Both are living Indigenous arts tied to land, community and transmitted knowledge.", "两者来自不同大陆、民族与历史；不能用点、几何或自然符号把它们合并成一种泛原住民风格。", "They come from different continents, peoples and histories; dots, geometry or natural symbols do not make one generic Indigenous style."],
        ["nordic-folk-art", "都可以出现在纺织、雕刻、绘画与日常器物中，并由社群实践延续。", "Both may appear in textiles, carving, painting and everyday objects sustained through community practice.", "北欧民间艺术与北美众多原住民传统的历史、权利和文化规范不同；不能因为都是手工传统就互换图案。", "Nordic folk art differs from the histories, rights and cultural protocols of many North American Indigenous traditions; handmade heritage does not make patterns interchangeable."]
      ],
      ["你能否把“这是什么风格”换成“这是谁、在哪里、为什么而做”？", "Can you replace 'What style is this?' with 'Who made this, where, and for what purpose?'" ]
    ),

    "russian-lubok": fullGuide(
      ["图像与文字同时大声说话时，你是先被色块吸引，还是先想读懂它在讲什么？", "When image and caption speak loudly together, are you drawn first to the color blocks or to the story being told?"],
      [
        ["outline", "先看粗壮轮廓", "Begin with the sturdy outline", "人物、动物和建筑被直接线条锁定，即使套色略有错位也保持清楚。", "Figures, animals and buildings are held by direct outlines that remain legible even when color registration shifts."],
        ["caption", "再看图文配合", "Then, read image with caption", "标题、对话或长短不一的文字补充寓言、新闻、讽刺或通俗故事。", "Titles, dialogue and captions extend fables, news, satire or popular stories."],
        ["rhythm", "最后看反复和夸张", "Finally, notice repetition and exaggeration", "表情、动作和纹样被简化并放大，让信息在传播中快速被记住。", "Expression, action and pattern are simplified and enlarged so the message is quickly remembered in circulation."]
      ],
      [[3, "叙事秩序直接", "Direct narrative order"], [4, "套色鲜明朴素", "Bright, plain printed color"], [3, "花边与图案有节奏", "Rhythmic borders and motifs"], [4, "情绪幽默夸张", "Humorous, exaggerated emotion"]],
      [["通俗", "直白", "套色", "讽刺"], ["Popular", "Direct", "Color-printed", "Satirical"]],
      [
        ["家居", "Home", "观察冰箱贴、日历和小海报如何用一幅图配一句话讲完日常故事。", "Notice how fridge notes, calendars and small posters tell an everyday story through one image and one line."],
        ["穿搭", "Clothing", "看大轮廓图案、少量鲜色和手工错位感如何带来亲近的印刷气质。", "See how large outlined motifs, a few bright colors and slight handmade misregistration create an approachable printed character."],
        ["摄影", "Photography", "拍摄市集或街头标语时，将人物动作与旁边文字同时收进画面。", "When photographing markets or street slogans, keep human action and nearby words in the same frame."],
        ["日常物件", "Everyday objects", "看便宜包装、漫画栏和民间印刷品如何靠清楚轮廓弥补粗糙工艺。", "See how inexpensive packaging, comic panels and popular prints use clear contour to work with rough production."]
      ],
      [
        ["chinese-new-year-woodblock", "都是面向广泛观众的民间版画，使用轮廓、套色和吉祥或叙事题材。", "Both are popular prints using contour, color printing and auspicious or narrative subjects for broad audiences.", "俄罗斯 Lubok 常与寓言、讽刺、新闻和文字说明结合；中国年画更集中于节庆、护佑、家庭愿望与地方工坊传统。", "Russian lubok often combines fable, satire, news and caption; Chinese New Year woodblock prints focus more on festival, protection, family wishes and local workshop traditions."],
        ["korean-minhwa", "都可用鲜明色彩、清楚轮廓和亲近的日常或象征题材面向广泛观看。", "Both may use vivid color, clear contour and approachable everyday or symbolic subjects for broad viewing.", "韩国民画包含屏风、花鸟、书架与多种生活绘画语境；Lubok 特指俄罗斯图文并置的通俗印刷传统，历史与传播方式不同。", "Korean Minhwa includes screens, birds-and-flowers, book images and varied domestic painting contexts; lubok specifically names a Russian popular print tradition combining image and text, with a different history and circulation."]
      ],
      ["你是先读懂它的故事，还是先喜欢上它直接、略带笨拙的印刷感？", "Do you first understand the story, or enjoy the direct, slightly rough character of the print?"]
    ),

    "celtic-art": fullGuide(
      ["一条线穿过、绕回又继续前进时，你能用目光跟它走完吗？", "When one line passes over, loops under and continues, can your eye follow its full journey?"],
      [
        ["interlace", "先追踪上下编织", "First, trace the over-under interlace", "带状线条以稳定规则交替穿越，让平面图案产生连续编织感。", "Ribbon-like lines alternate over and under by a consistent rule, giving a flat pattern the logic of weaving."],
        ["transformation", "再看植物与动物变形", "Then, notice plant and animal transformation", "叶、蛇、鸟或兽的身体可以拉长成螺旋与结，在可识别形体与抽象节奏间转换。", "Leaves, serpents, birds or beasts may stretch into spirals and knots, shifting between recognizable bodies and abstract rhythm."],
        ["object", "最后看图案如何服从器物", "Finally, see pattern follow the object", "金属、石刻、手稿或十字架的边缘决定了线条折返、填充与中断的方式。", "Edges of metalwork, stone, manuscripts or crosses determine where lines turn, fill and break."]
      ],
      [[5, "编织规则严密", "Rigorous interlaced order"], [2, "色彩常服从材料", "Color often follows material"], [5, "结、螺旋与动物纹繁密", "Dense knots, spirals and animal forms"], [3, "情绪神秘而持续", "Mysterious, sustained emotion"]],
      [["编织", "连续", "螺旋", "雕刻感"], ["Interlaced", "Continuous", "Spiraling", "Carved"]],
      [
        ["家居", "Home", "观察编织地毯、栏杆和桥架里上下穿越的结构，看规则如何让复杂不乱。", "Notice over-under structures in rugs, railings and bridges, and how rules keep complexity coherent."],
        ["穿搭", "Clothing", "看编织带、缝线和金属扣如何沿身体边缘连续，而不把具体历史符号随意拼贴。", "See how braid, seam and metal fastening continue along body edges without casually assembling specific historical symbols."],
        ["摄影", "Photography", "拍摄树根、道路与电缆交错时，找一条能让视线持续追踪的路径。", "When photographing roots, roads or cables, find one path the eye can follow continuously."],
        ["日常物件", "Everyday objects", "看绳结、编篮和编程流程图如何用重复规则建立可检查的复杂性。", "See how knots, baskets and programming flow diagrams build inspectable complexity through repeated rules."]
      ],
      [
        ["islamic-geometric", "都以重复规则、对称和无尽延展的节奏组织表面。", "Both organize surfaces through repeated rule, symmetry and rhythms that can extend beyond the frame.", "凯尔特艺术常以带状交织、螺旋和变形动物围绕器物边界；伊斯兰几何纹样更依靠多边形网格、星形和精确平面分割。", "Celtic art often wraps objects with ribbon interlace, spirals and transformed animals; Islamic geometric pattern relies more on polygon grids, stars and precise planar division."],
        ["art-nouveau", "都喜欢连续曲线、植物形和线条绕行。", "Both favor continuous curves, vegetal form and wandering line.", "新艺术以近代设计中的鞭线、花茎和人物轮廓建立流动；凯尔特交织更强调上下穿越的规则与历史媒介。", "Art Nouveau builds flow through modern design's whiplash line, stems and figures; Celtic interlace stresses regulated over-under crossings and historical media."]
      ],
      ["你会想追着一条线找到它的结束，还是会享受它似乎永远没有终点？", "Do you want to find where one line ends, or enjoy the sense that it may continue forever?"]
    )
  });

  Object.assign(window.STYLE_AESTHETIC_GUIDES, {
    "healing-animation": fullGuide(
      ["先别寻找剧情。风、云、草木和小动作是否已经让这个世界显得正在呼吸？", "Before looking for plot, notice whether wind, cloud, plants and small gestures already make the world feel alive and breathing."],
      [
        ["environment", "先看环境的微动", "Begin with small environmental motion", "树叶摇动、云影移动、烟气升起或水面反光，让背景不只是人物的布景。", "Leaves sway, shadows pass, smoke rises or water glints, making the setting more than scenery behind a character."],
        ["gesture", "再看小而准确的动作", "Then, notice the small precise gesture", "端杯、穿鞋、回头或停顿被给予完整时间，日常行为因此显得可感。", "Lifting a cup, putting on shoes, turning or pausing receives full duration, making ordinary action tangible."],
        ["pace", "最后感受留给观察的速度", "Finally, feel the pace of observation", "剪辑不急着把信息推过去，空镜和停顿让观者有时间进入场所。", "Editing does not hurry information past the viewer; held shots and pauses allow time to enter the place."]
      ],
      [[3, "场景秩序清楚自然", "Clear, natural scene order"], [3, "色彩柔和随天气变化", "Soft color shaped by weather"], [2, "细节有生活感而不繁复", "Lived-in rather than ornate detail"], [4, "情绪温和含蓄", "Gentle, understated emotion"]],
      [["田园", "呼吸", "细微", "温和"], ["Pastoral", "Breathing", "Subtle", "Gentle"]],
      [
        ["家居", "Home", "观察窗帘、植物和蒸汽如何让安静房间保持微小动势。", "Notice how curtains, plants and steam keep a quiet room in subtle motion."],
        ["穿搭", "Clothing", "看宽松布料、使用痕迹和层叠如何让人物显得正在生活，而不只是摆造型。", "See how loose fabric, signs of use and layers make a person feel lived-in rather than merely styled."],
        ["摄影", "Photography", "留出一段不发生大事的镜头，让天气、声音想象和小动作建立氛围。", "Hold a frame where nothing major happens and let weather, imagined sound and small movement create atmosphere."],
        ["日常物件", "Everyday objects", "看便当盒、旧自行车和晾晒的衣物如何因使用状态而带出人的存在。", "See how a lunch box, old bicycle or drying clothes imply people through their state of use."]
      ],
      [
        ["cinematic-anime", "都用环境、天气和日常动作建立动画世界的可感性。", "Both use environment, weather and daily gesture to make an animated world tangible.", "田园手绘动画更常保留缓慢生活节奏与自然微动；日系动画电影光影更聚焦镜头化的光线、深度和时刻转折。", "Pastoral hand-drawn animation more often holds slow daily rhythms and natural micro-movement; Japanese animated-film lighting focuses more on cinematic light, depth and turning moments."],
        ["childrens-picture-book", "都可以用温和图像、日常物件和简单动作建立亲近感。", "Both can build warmth through approachable images, everyday objects and simple actions.", "绘本依靠翻页、图文与静态跨页控制时间；动画依靠真实时长、运动与声音想象。", "Picture books control time through page turns, text-image relation and static spreads; animation uses duration, movement and imagined sound."]
      ],
      ["你是在等故事发生，还是已经在风、光和小动作里感到了世界？", "Are you waiting for the story to begin, or already feeling the world through wind, light and small gestures?"]
    ),

    "cinematic-anime": fullGuide(
      ["光从门缝、列车窗或云层后面出现时，它只是照亮场景，还是在提醒你这一刻很重要？", "When light appears through a doorway, train window or cloud, is it merely illuminating the scene or marking the moment as important?"],
      [
        ["light", "先找光的来源", "First, locate the light source", "逆光、侧光和大片云影把人物与环境分成明确深度，也暗示时间和天气。", "Backlight, side light and broad cloud shadows separate figure and setting into depth while signaling time and weather."],
        ["atmosphere", "再看空气中的颗粒", "Then, notice the air itself", "雨丝、尘埃、雪、雾或耀光被绘制成可见层，让空间不再是空白。", "Rain, dust, snow, mist or glare becomes a visible layer, so space no longer feels empty."],
        ["framing", "最后看镜头式构图", "Finally, read the cinematic framing", "前景遮挡、远景大景和偏离中心的人物让画面像一个被选中的电影镜头。", "Foreground occlusion, distant scale and off-center figures make the image feel like a selected film shot."]
      ],
      [[4, "镜头秩序清楚", "Clear cinematic order"], [4, "色彩随光线与时刻变化", "Color shaped by light and time"], [2, "细节服务空气感", "Detail serves atmosphere"], [5, "情绪时刻性强", "Strong emotional sense of a moment"]],
      [["逆光", "空气", "镜头感", "瞬间"], ["Backlit", "Atmospheric", "Cinematic", "Momentary"]],
      [
        ["家居", "Home", "看门缝、百叶窗和走廊尽头的光如何让普通空间出现时刻感。", "Notice how light through a door, blinds or the end of a corridor gives an ordinary space a sense of timing."],
        ["穿搭", "Clothing", "观察半透明面料、边缘光与深色轮廓如何随环境光改变层次。", "Observe how translucent fabric, rim light and dark silhouette change depth under environmental light."],
        ["摄影", "Photography", "在雨后、黄昏或车窗边拍摄，让反光和空气颗粒与人物共同完成画面。", "Photograph after rain, at dusk or beside a vehicle window, letting reflections and atmosphere work with the figure."],
        ["日常物件", "Everyday objects", "看玻璃杯、手机屏和金属边缘如何因一道光突然成为视觉焦点。", "See how one beam turns a glass, phone screen or metal edge into a sudden focal point."]
      ],
      [
        ["healing-animation", "都使用天气、场所和小动作让动画世界具有生活感。", "Both use weather, place and small gestures to make animated worlds feel lived in.", "田园手绘动画更强调缓慢日常与自然微动；电影光影语汇更强调光源、景别、空气层和戏剧时刻。", "Pastoral hand-drawn animation stresses slow daily life and natural micro-motion; cinematic lighting stresses light source, shot scale, atmosphere and dramatic moment."],
        ["noir-illustration", "都用强光影、遮挡和镜头化视角推动情绪。", "Both use strong light, occlusion and cinematic viewpoints to drive mood.", "日系动画电影光影可以明亮、温柔或灿烂，并不固定服务悬疑；黑色电影插画更聚焦犯罪类型、黑暗城市与不安光影。", "Japanese animated-film lighting can be bright, tender or radiant and is not tied to suspense; Noir Illustration centers crime genre, dark cities and uneasy contrast."]
      ],
      ["如果把人物移走，这道光和这片空气还能让你感到故事正在发生吗？", "If the figure disappeared, would the light and air still make you feel that a story is happening?"]
    ),

    "classic-disney": fullGuide(
      ["人物的身体被拉伸、压缩又恢复时，你是否在它开口之前就读懂了情绪？", "As a character stretches, compresses and recovers, can you read the emotion before any words are spoken?"],
      [
        ["silhouette", "先看轮廓是否一眼可读", "Begin with the readable silhouette", "帽子、手臂、裙摆和姿态被简化成清楚外形，缩小或去色后仍能看出动作。", "Hats, arms, hems and posture simplify into clear shapes that remain readable when small or colorless."],
        ["motion", "再看拉伸与压缩", "Then, watch stretch and squash", "身体和物件通过形变表现重量、弹性和冲击，夸张却保持连续动势。", "Bodies and objects deform to show weight, elasticity and impact, exaggerating while preserving continuous motion."],
        ["staging", "最后看舞台式调度", "Finally, notice theatrical staging", "人物常在清楚景别里用大动作与目光交流，背景主动让出表演空间。", "Characters exchange large gestures and glances within clear staging while backgrounds yield space to performance."]
      ],
      [[4, "表演秩序清楚", "Clear performance order"], [4, "色彩鲜明服务人物", "Bright color serving characters"], [3, "细节精致但不抢戏", "Refined detail without distraction"], [5, "情绪表演外放", "Highly expressive emotion"]],
      [["流畅", "夸张", "舞台感", "鲜明"], ["Fluid", "Exaggerated", "Theatrical", "Vivid"]],
      [
        ["家居", "Home", "看楼梯、门框和家具是否为人的走动、转身和拿取留出清楚表演空间。", "See whether stairs, doorways and furniture leave clear space for walking, turning and reaching."],
        ["穿搭", "Clothing", "用明确轮廓和能随动作放大节奏的衣摆，从远处也能读出姿态。", "Use a clear silhouette and hems that amplify movement so posture remains readable from a distance."],
        ["摄影", "Photography", "连拍一个跳跃或抛接动作，比较准备、极点和恢复三个姿态。", "Photograph a jump or toss in sequence and compare anticipation, extreme and recovery poses."],
        ["日常物件", "Everyday objects", "看弹簧、气球和布袋如何通过形变显示重量与弹性。", "See how springs, balloons and cloth bags reveal weight and elasticity through deformation."]
      ],
      [
        ["anime", "都使用绘制人物、分镜和夸张动作建立情绪。", "Both use drawn characters, staging and exaggerated movement to build emotion.", "黄金时代手绘动画常依靠饱满连续动作、弹性形变和舞台式表演；Anime 是更广的日本动画范围，可以使用有限动画、强分镜与多种类型语汇。", "Golden Age hand-drawn animation often uses full continuous motion, elastic deformation and theatrical performance; Anime is a broader Japanese field that may use limited animation, strong shot design and many genres."],
        ["healing-animation", "都保留手绘线条、角色表演和可视的动画节奏。", "Both retain drawn line, character acting and visible animation rhythm.", "黄金时代语汇更常把大幅度动作与喜剧节拍放在前景；田园手绘动画更强调小动作、环境呼吸和缓慢时间。", "Golden Age language foregrounds broad action and comic timing; pastoral hand-drawn animation stresses small gestures, breathing environments and slower time."]
      ],
      ["当动作被夸张时，你感到的是失真，还是更清楚的重量与情绪？", "When motion is exaggerated, does it feel less real or more clearly weighted and emotional?"]
    ),

    "warm-3d-animation": fullGuide(
      ["这些圆润形体为什么让你想伸手触摸？是材质、光，还是人物的小表情？", "Why do these rounded forms invite touch: material, light, or the character's small expression?"],
      [
        ["shape", "先看柔软轮廓", "Begin with the soft silhouette", "头部、手脚和家具边缘被圆化，尖锐转折减少，让角色显得可亲近。", "Heads, limbs and furniture edges are rounded, reducing sharp turns and making characters approachable."],
        ["material", "再看可触的表面", "Then, notice touchable surfaces", "织物、木头、毛发和磨砂塑料保留微小粗糙度，避免所有物件都像同一种亮塑料。", "Fabric, wood, hair and matte plastic keep slight roughness so every object does not look like the same glossy material."],
        ["acting", "最后看微表情与重量", "Finally, read micro-expression and weight", "眼神、呼吸、肩部下沉与身体偏移让温情不靠夸大笑容，而来自可信的身体状态。", "Gaze, breath, lowered shoulders and shifted weight create warmth through believable bodily state rather than a huge smile."]
      ],
      [[4, "形体秩序清晰圆润", "Clear rounded form order"], [3, "色彩温和低刺激", "Warm, low-stimulation color"], [3, "材质细节可触", "Touchable material detail"], [4, "情绪温暖细腻", "Warm, nuanced emotion"]],
      [["圆润", "可触", "温暖", "细腻"], ["Rounded", "Tactile", "Warm", "Tender"]],
      [
        ["家居", "Home", "观察圆角家具、哑光材质和暖色小灯如何减少紧张，同时保留真实使用痕迹。", "Notice how rounded furniture, matte materials and warm lamps reduce tension while retaining signs of use."],
        ["穿搭", "Clothing", "看羊毛、棉布和柔软外廓如何用材质而不是幼态比例表达亲和。", "See how wool, cotton and soft silhouettes express approachability through material rather than childish proportion."],
        ["摄影", "Photography", "用靠近窗边的大面柔光拍摄人与物，保留织物和皮肤的细微纹理。", "Use broad window light on people and objects while preserving subtle textile and skin texture."],
        ["日常物件", "Everyday objects", "比较陶杯、毛绒和木柄的反光差异，看材质如何先于颜色传达温度。", "Compare reflections on ceramic, plush and wood, and see how material conveys warmth before color does."]
      ],
      [
        ["dreamworks-cartoon", "都以三维角色、清楚轮廓和可感材质建立亲近感。", "Both build approachable 3D characters through clear silhouette and tangible material.", "温情三维动画更依靠微表情、柔光和安静节奏；夸张三维卡通喜剧更依靠大表情、形体对比和快节拍反应。", "Warm 3D animation relies more on micro-expression, soft light and quiet rhythm; exaggerated 3D comedy relies on broad faces, shape contrast and rapid reactions."],
        ["claymorphism", "都使用圆角、哑光体积和柔软阴影创造可触感。", "Both use rounded corners, matte volume and soft shadow to create tactility.", "温情三维动画需要完整角色表演、环境与时间；Claymorphism 主要是界面、图标和插图中的黏土式表面语汇。", "Warm 3D animation requires character acting, environment and duration; Claymorphism is mainly a clay-like surface language for interfaces, icons and illustration."]
      ],
      ["你觉得它温暖，是因为形状很圆，还是因为角色的重量和反应很真？", "Does it feel warm because the shapes are round, or because the character's weight and responses feel true?"]
    ),

    "dreamworks-cartoon": fullGuide(
      ["角色只是抬一下眉毛、偏一下头，你是否就已经知道它在吐槽、怀疑或准备惹麻烦？", "From one raised brow or tilted head, can you already tell that the character is skeptical, joking or about to cause trouble?"],
      [
        ["contrast", "先看形体对比", "Begin with shape contrast", "高与矮、宽与窄、圆与尖的角色并置，让性格关系在开口之前就可读。", "Tall and short, broad and narrow, round and sharp characters sit together so personality relations read before dialogue."],
        ["face", "再看面部不对称", "Then, notice facial asymmetry", "单边挑眉、歪嘴和短暂停顿让喜剧来自反应，而不只是大声叫喊。", "One raised brow, a crooked mouth and a brief pause make comedy arise from reaction, not only loud action."],
        ["timing", "最后看节拍反转", "Finally, watch the timing turn", "准备动作可能被拉长，结果却突然加速，视觉节拍本身就构成笑点。", "Anticipation may stretch while the result snaps quickly, making visual timing itself the joke."]
      ],
      [[3, "秩序服务角色冲突", "Order serves character conflict"], [4, "色彩鲜明对比强", "Bright, contrasting color"], [3, "形体细节夸张", "Exaggerated form detail"], [5, "喜剧情绪外放", "Highly extroverted comic emotion"]],
      [["俏皮", "夸张", "反应快", "群像"], ["Witty", "Exaggerated", "Reactive", "Ensemble-driven"]],
      [
        ["家居", "Home", "看一组家具的高矮、胖瘦和轮廓对比如何让它们像各有性格的群像。", "See how furniture of different heights, widths and silhouettes can read like an ensemble of personalities."],
        ["穿搭", "Clothing", "用大外廓对比和一处略带幽默的比例变化表达性格，不必堆满符号。", "Use broad silhouette contrast and one playfully shifted proportion to express character without piling on symbols."],
        ["摄影", "Photography", "拍摄对话时不只抓说话者，也保留旁人挑眉、停顿和对视的反应。", "When photographing conversation, keep the listeners' raised brows, pauses and glances, not only the speaker."],
        ["日常物件", "Everyday objects", "比较不同杯子、瓶子和包装的轮廓，看它们是否因比例而显得严肃或俏皮。", "Compare silhouettes of cups, bottles and packages and see how proportion makes them feel serious or playful."]
      ],
      [
        ["warm-3d-animation", "都使用可读三维轮廓、材质和面部表演创造亲近角色。", "Both use readable 3D silhouette, material and facial acting to create approachable characters.", "夸张三维喜剧更强调人物对比、讽刺表情和节拍反转；温情三维更强调微表情、柔光与情感停顿。", "Exaggerated 3D comedy stresses character contrast, ironic expressions and timing reversals; warm 3D stresses micro-expression, soft light and emotional pauses."],
        ["american-comic-book", "都使用大轮廓、强动作和鲜明角色区分推动娱乐叙事。", "Both drive entertainment narratives through bold silhouette, strong action and vivid character differentiation.", "三维卡通喜剧依赖时间、声音和连续表演；美式漫画依靠分格、拟声词、墨线与静态姿势发挥冲击。", "3D cartoon comedy depends on duration, sound and continuous acting; American comics use panels, sound effects, ink and held poses for impact."]
      ],
      ["你的笑是来自角色长得夸张，还是来自它对别人做出的那一秒反应？", "Does the humor come from exaggerated design, or from the one-second reaction to another character?"]
    ),

    anime: fullGuide(
      ["一个静止眼神、一片空景和一次突然加速，是否比持续动作更能让你记住时刻？", "Can a held gaze, an empty setting and one sudden acceleration make a moment more memorable than constant motion?"],
      [
        ["design", "先看角色识别线索", "Begin with character identifiers", "发型、服装轮廓、眼神和一两个色彩重点让人物在多样画风中仍能快速被认出。", "Hair, costume silhouette, gaze and one or two color accents keep characters identifiable across varied drawing styles."],
        ["editing", "再看静止与爆发的切换", "Then, watch stillness switch to impact", "有限动画可用持续的静态画面积累张力，再用快速镜头、动态线或局部变形释放。", "Limited animation can build tension through held images, then release it with rapid shots, motion lines or local deformation."],
        ["genre", "最后分清媒介与类型", "Finally, separate medium from genre", "Anime 是广泛的日本动画范围，内部包含日常、科幻、历史、实验等不同语汇，不是单一大眼风格。", "Anime is a broad field of Japanese animation spanning daily life, science fiction, history and experiment; it is not one big-eye style."]
      ],
      [[3, "镜头秩序变化广", "Widely varied shot order"], [4, "色彩随类型变化", "Color varies by genre"], [3, "角色线索集中", "Concentrated character cues"], [4, "情绪节拍对比强", "Strong emotional timing contrast"]],
      [["分镜", "角色", "停顿", "爆发"], ["Shot-driven", "Character-led", "Held", "Explosive"]],
      [
        ["家居", "Home", "观察房间里哪一两个轮廓或颜色能让人立刻识别使用者的性格。", "Notice which one or two shapes or colors in a room instantly suggest its user's character."],
        ["穿搭", "Clothing", "用清楚剪影、一个识别配件和可动的发型建立人物感，不必复制具体角色。", "Build character through clear silhouette, one identifying accessory and movable hair without copying a specific character."],
        ["摄影", "Photography", "用一张安静远景配一张高张力近景，观察景别切换如何改变情绪。", "Pair one quiet long shot with one tense close-up and see how shot scale changes emotion."],
        ["日常物件", "Everyday objects", "看钥匙扣、文具和手机壁纸如何用少量图形成为个人身份线索。", "See how keychains, stationery and phone wallpapers become identity cues through a few shapes."]
      ],
      [
        ["manga", "都来自日本图像叙事生态，共享角色设计、类型惯例和分镜语汇。", "Both belong to Japanese image-narrative ecosystems and share character design, genre conventions and framing language.", "Manga 以纸页、分格、黑白节奏和读者自定速度展开；Anime 以屏幕时长、运动、声音和剪辑控制时间。", "Manga unfolds through pages, panels, black-and-white rhythm and reader-controlled pace; Anime controls time through screen duration, motion, sound and editing."],
        ["cinematic-anime", "都使用日本动画中的镜头、角色与环境语汇。", "Both use shot, character and environment languages found in Japanese animation.", "Anime 是包含众多制作方法和类型的大范围；“电影光影”只聚焦光源、空气深度和电影式时刻。", "Anime is a broad field of methods and genres; cinematic lighting focuses specifically on light source, atmospheric depth and filmic moments."]
      ],
      ["你记住这一刻，是因为角色动得很多，还是因为镜头知道什么时候停下？", "Do you remember the moment because the character moves a lot, or because the shot knows when to hold?"]
    ),

    manga: fullGuide(
      ["两个分格之间没有画出的那段时间，你的大脑是否已经自动把它补完？", "Between two panels, has your mind already completed the time that was never drawn?"],
      [
        ["panel", "先看分格尺寸", "Begin with panel size", "大格让时刻停留，小格加快动作，突破边框可以放大冲击或情绪。", "Large panels hold a moment, small panels accelerate action, and breaking the border can enlarge impact or emotion."],
        ["value", "再看黑白与网点", "Then, read black, white and screentone", "纯黑、白地、排线和网点区分光线、材质、气氛与心理强度。", "Solid black, white ground, hatching and screentone distinguish light, material, atmosphere and psychological intensity."],
        ["reading", "最后看视线如何翻页", "Finally, follow the page-turn path", "人物目光、动态线、对话框和留白共同引导阅读方向，跨页与翻页也是叙事工具。", "Gaze, motion line, speech balloon and blank space guide reading direction, while spreads and page turns become narrative tools."]
      ],
      [[4, "分格秩序强但可破格", "Strong panel order that can be broken"], [1, "主要依靠黑白灰", "Primarily black, white and gray"], [3, "网点线条细节丰富", "Rich tone and line detail"], [4, "情绪由节奏放大", "Emotion amplified by pacing"]],
      [["分格", "黑白", "翻页", "节奏"], ["Paneled", "Monochrome", "Page-turned", "Rhythmic"]],
      [
        ["家居", "Home", "把墙面照片、便签和空白视为不同分格，看尺寸差异如何改变阅读顺序。", "Treat wall photos, notes and blank areas as panels and see how size changes reading order."],
        ["穿搭", "Clothing", "用黑白大块、线性纹理和一个突出轮廓建立清晰节奏，不必复制角色。", "Build clear rhythm with large black-white areas, linear texture and one strong silhouette without copying a character."],
        ["摄影", "Photography", "用三张照片记录一个动作的前、中、后，观察哪些过程可以留给观者补全。", "Record before, during and after an action in three photos and see which transitions the viewer can complete."],
        ["日常物件", "Everyday objects", "看说明书、地铁广告和外卖菜单如何用格子、箭头和尺寸差引导阅读。", "See how manuals, transit ads and menus use boxes, arrows and scale differences to guide reading."]
      ],
      [
        ["anime", "都使用日本图像叙事中的角色、镜头与类型语汇。", "Both use character, framing and genre languages within Japanese image narrative.", "Manga 由读者通过分格、翻页和黑白画面决定速度；Anime 用时长、运动、声音与剪辑控制观看。", "Manga lets readers control pace through panels, page turns and monochrome images; Anime controls viewing through duration, motion, sound and editing."],
        ["graphic-novel", "都以连环图像、分格和文字叙述长短不一的故事。", "Both tell stories of varied length through sequential images, panels and text.", "Manga 指日本漫画的广泛出版与阅读传统，包含多种受众与类型；Graphic Novel 更常是对长篇或书本形式漫画的出版称呼，不限国家画法。", "Manga names a broad Japanese publishing and reading tradition with many audiences and genres; Graphic Novel is more often a publishing term for long-form or book-form comics, not one national drawing style."]
      ],
      ["你在哪个分格停得最久？是因为它画得最多，还是因为它留得最少？", "Which panel holds you longest: the one that shows the most, or the one that leaves the most unsaid?"]
    ),

    shonen: fullGuide(
      ["在冲突真正爆发之前，画面用了多少准备、对视和动作方向让你期待那一刻？", "Before conflict erupts, how much anticipation, eye contact and directional motion prepares you for it?"],
      [
        ["direction", "先看力量方向", "Begin with force direction", "动态线、身体倾斜和透视缩短把力量集中到一个冲击点，让静态分格像在前进。", "Motion lines, tilted bodies and foreshortening focus force on one impact point, making a static panel advance."],
        ["escalation", "再看尺度递增", "Then, watch scale escalate", "从眼神近景、手部准备到跨页大动作，分格尺寸随能量和风险增长。", "From eye close-up and prepared hand to full-spread action, panel scale grows with energy and risk."],
        ["team", "最后看成长与群体关系", "Finally, read growth through the group", "训练、竞争、失败与合作通过角色位置和反复对照展开，力量不只是一次打击。", "Training, rivalry, failure and cooperation unfold through placement and repeated contrast; power is more than one strike."]
      ],
      [[3, "节奏秩序持续升级", "Pacing continually escalates"], [2, "黑白对比强", "Strong monochrome contrast"], [3, "动态线与效果密集", "Dense motion and impact effects"], [5, "情绪热血外放", "Highly charged, outward emotion"]],
      [["冲刺", "成长", "对决", "合作"], ["Driving", "Growth-led", "Confrontational", "Collective"]],
      [
        ["家居", "Home", "把长期目标分成可见进度、小挑战和休息节点，观察尺度递增如何建立动力。", "Break a long goal into visible progress, small challenges and recovery points, and observe how escalation builds momentum."],
        ["穿搭", "Clothing", "用向前的斜线、明确身体轮廓和一处高对比建立动势，避免复制角色服装。", "Build forward motion through diagonals, a clear body silhouette and one high contrast without copying a character costume."],
        ["摄影", "Photography", "在运动中同时拍准备姿态和完成瞬间，看哪一张更能让人感到力量。", "Photograph both anticipation and completion in sport and compare which frame carries more force."],
        ["日常物件", "Everyday objects", "看运动鞋底、工具手柄和自行车车架如何用斜线与受力点显示方向。", "See how shoe soles, tool handles and bicycle frames reveal direction through diagonals and load points."]
      ],
      [
        ["manga", "都使用分格、黑白节奏、动态线和翻页控制叙事。", "Both use panels, monochrome rhythm, motion lines and page turns to control narrative.", "Manga 是广泛媒介与出版传统，包含众多题材；Shonen 主要是面向少年读者的市场分类，常突出成长、竞争、冒险与伙伴，但不是单一画法。", "Manga is a broad medium and publishing tradition; Shonen is mainly a market category for young male readers, often emphasizing growth, rivalry, adventure and peers, not one drawing style."],
        ["american-comic-book", "都可以用英雄对决、强透视、动态线和跨页冲击推动行动。", "Both can drive action through heroic conflict, forceful perspective, motion lines and full-page impact.", "Shonen 通常按日本杂志与单行本节奏展开长期成长；美式漫画与美国出版格式、彩色分色和其类型历史相连。", "Shonen often unfolds long-term growth through Japanese magazine and volume rhythms; American comics relate to US publishing formats, color separation and their own genre history."]
      ],
      ["你被留住的是一次强力冲击，还是角色经历失败后再站起来的过程？", "Are you held by one powerful impact, or by the process of a character rising after failure?"]
    ),

    shojo: fullGuide(
      ["花、星光、头发和空白穿过分格时，它们是背景装饰，还是人物心情正在溢出边框？", "When flowers, sparkles, hair and blank space cross panel borders, are they decoration or emotion spilling beyond the frame?"],
      [
        ["gaze", "先看目光与距离", "Begin with gaze and distance", "眼神近景、侧脸和人物之间的空白组织关系，距离本身就是情节。", "Close-up eyes, profiles and blank space between figures organize relationship; distance itself becomes plot."],
        ["flow", "再看头发与花纹如何跨格", "Then, follow hair and motifs across panels", "长线、花瓣、光点和柔软边界穿过分格，让心理时间盖过物理空间。", "Long lines, petals, sparkles and soft borders cross panels, letting psychological time overtake physical space."],
        ["interior", "最后看内心声音的排版", "Finally, read the inner voice", "独白、对话和没有文字的停顿以不同字形与位置区分外在行动和内在感受。", "Monologue, dialogue and wordless pause use different lettering and placement to separate outer action from inner feeling."]
      ],
      [[3, "分格为心理节奏让路", "Panels yield to psychological rhythm"], [2, "黑白层次轻盈", "Light monochrome layering"], [4, "花纹光点与长线丰富", "Rich flowers, sparkles and long line"], [5, "情感细腻内向", "Nuanced, inward emotion"]],
      [["轻盈", "心动", "流动", "内省"], ["Airy", "Tender", "Flowing", "Introspective"]],
      [
        ["家居", "Home", "看透明帘、镜子和花枝如何在房间里制造反射、遮挡与含蓄距离。", "See how sheer curtains, mirrors and branches create reflection, occlusion and suggestive distance in a room."],
        ["穿搭", "Clothing", "用长线条、层叠半透明材质和小面积光点建立流动，不必复制具体人物。", "Build flow through long lines, layered translucent materials and small points of light without copying a specific character."],
        ["摄影", "Photography", "拍摄对话前后的目光、手势和人物间空白，让关系不只靠拥抱来表达。", "Photograph gaze, gesture and space before and after dialogue so relationship is not expressed only by embrace."],
        ["日常物件", "Everyday objects", "看信纸、日记和香水瓶如何用字体、留白与小图案区分公开话语和私密感受。", "See how letters, diaries and perfume bottles use type, blank space and small motifs to distinguish public words from private feeling."]
      ],
      [
        ["manga", "都使用黑白分格、翻页、对话与线条叙事。", "Both use monochrome panels, page turns, dialogue and line for narrative.", "Manga 是广泛媒介；Shojo 主要是面向少女读者的市场分类，常突出关系、内心时间和流动页面，但包含多种题材与画法。", "Manga is the broad medium; Shojo is mainly a market category for young female readers, often foregrounding relation, inner time and flowing pages, but containing many subjects and styles."],
        ["art-nouveau", "都会使用长曲线、花朵、发丝和装饰边界让画面流动。", "Both may use long curves, flowers, hair and decorative borders to create flow.", "Shojo 中的花与长线常穿越分格，表示角色心理和阅读时间；新艺术更是建筑、海报与物件设计中的近代装饰语言。", "In Shojo, flowers and long lines cross panels to express psychology and reading time; Art Nouveau is a modern decorative language across architecture, posters and objects."]
      ],
      ["画面里哪一处空白最像一句没有说出来的话？", "Which blank space feels most like a sentence left unsaid?"]
    ),

    "american-comic-book": fullGuide(
      ["如果去掉所有文字，你仍能从姿势、阴影和分格方向读出冲突即将发生吗？", "If every word disappeared, could pose, shadow and panel direction still tell you that conflict is about to happen?"],
      [
        ["pose", "先看英雄式姿势", "Begin with the heroic pose", "身体被扭转到能同时展示力量、方向和身份的角度，剪影通常很强。", "Bodies twist to display force, direction and identity at once, usually producing a strong silhouette."],
        ["ink", "再看墨线与黑影", "Then, notice ink and shadow", "轮廓线、排线和大块黑影塑造体积与戏剧光，印刷分色让形体保持清楚。", "Contour, hatching and solid shadow model volume and dramatic light, while printed color keeps forms legible."],
        ["impact", "最后看文字如何进入画面", "Finally, see words enter the image", "拟声词、对话框和旁白以尺寸、字重和爆炸形状参与动作，不只是说明文字。", "Sound effects, balloons and captions join the action through scale, weight and burst shapes rather than sitting as explanation."]
      ],
      [[4, "分格与动作秩序强", "Strong panel and action order"], [4, "印刷色彩对比鲜明", "Vivid printed color contrast"], [3, "墨线、网点与拟声密集", "Dense ink, tone and sound effects"], [5, "情绪冲突强烈", "Intense conflict-driven emotion"]],
      [["有力", "分格", "高对比", "爆发"], ["Forceful", "Paneled", "High-contrast", "Explosive"]],
      [
        ["家居", "Home", "看墙面画作、黑色家具和彩色物件如何形成像分格一样的大小对比。", "See how wall art, dark furniture and colored objects form panel-like contrasts of scale."],
        ["穿搭", "Clothing", "用强剪影、大色块和一处高对比标识建立力量，不复制具体英雄制服。", "Build force with a strong silhouette, large color blocks and one high-contrast mark without copying a hero costume."],
        ["摄影", "Photography", "从低机位拍摄强姿态，再用一张手、眼或物件的近景组成双格叙事。", "Photograph a strong pose from low angle, then pair it with a close-up of hand, eye or object as a two-panel sequence."],
        ["日常物件", "Everyday objects", "看运动包装、警示标签和报纸头条如何用粗字与爆炸形让信息显得有动作。", "See how sports packaging, warning labels and headlines use bold type and burst shapes to make information act."]
      ],
      [
        ["manga", "都用连环图像、分格、文字和动态线建立故事时间。", "Both build story time through sequential images, panels, words and motion lines.", "美式漫画与美国期刊、彩色分色、英雄及多种独立类型发展相连；Manga 则来自日本出版、黑白单行本与其多样读者分类。", "American comics relate to US periodicals, color separation, superheroes and many independent genres; Manga grows from Japanese publishing, monochrome volumes and diverse reader categories."],
        ["pop-art-poster", "都可使用漫画线条、网点、鲜艳印刷色和拟声文字。", "Both may use comic line, halftone, vivid print color and sound-effect lettering.", "美式漫画以连环分格服务角色与故事；波普海报把商品、媒体和漫画图像放大、重复或转用为单幅视觉评论。", "American comics use sequential panels for character and story; Pop Art posters enlarge, repeat or repurpose commercial and comic imagery as single-image visual commentary."]
      ],
      ["你感到的力量主要来自身体姿势，黑影，还是文字与分格的冲击？", "Does the force come mainly from bodily pose, shadow, or the impact of lettering and panels?"]
    )
  });

  Object.assign(window.STYLE_AESTHETIC_GUIDES, {
    cyberpunk: fullGuide(
      ["霓虹最亮的地方是在展示未来，还是在照出城市里更深的不平等？", "Is the brightest neon showing the future, or exposing deeper inequality in the city?"],
      [["city", "先看技术压住城市", "Begin with technology over the city", "巨型屏幕、管线和高楼覆盖旧街道，先进系统与拥挤生活同时存在。", "Massive screens, conduits and towers cover older streets, placing advanced systems beside crowded life."], ["contrast", "再看霓虹与黑暗", "Then, compare neon and darkness", "高纯度冷暖光只照亮局部，人物常被留在雨、烟和反射之间。", "Saturated warm-cool light reveals only fragments, leaving figures amid rain, haze and reflections."], ["body", "最后看技术进入身体", "Finally, see technology enter the body", "义体、接口和监控把身份、自由与权力问题落到人的尺度。", "Prosthetics, interfaces and surveillance bring questions of identity, freedom and power to the human scale."]],
      [[4,"系统密集有秩序","Dense systemic order"],[5,"霓虹对比强烈","Intense neon contrast"],[4,"技术细节繁多","Dense technological detail"],[5,"情绪压迫警觉","Oppressive, alert emotion"]],
      [["霓虹","拥挤","反抗","高科技"],["Neon","Crowded","Defiant","High-tech"]],
      [["家居","Home","用一处冷光屏幕对比温暖旧物，观察新旧技术怎样共存。","Contrast one cool screen with warm worn objects and notice old and new technology coexisting."],["穿搭","Clothing","用功能层叠、反光材质和一处电子细节表达城市适应，而非复制角色。","Use functional layers, reflective material and one electronic detail to express urban adaptation without copying a character."],["摄影","Photography","在雨后夜街寻找广告反光与行人剪影，让光也讲述空间权力。","Find ad reflections and pedestrian silhouettes on a wet night street, letting light describe spatial power."],["日常物件","Everyday objects","观察支付屏、门禁与摄像头如何把便利和监控同时带入日常。","Notice how payment screens, access controls and cameras bring convenience and surveillance together."]],
      [["synthwave","都常使用霓虹、夜色、数字界面和未来城市想象。","Both often use neon, night, digital interfaces and imagined futures.","Cyberpunk 关注高科技与低生活、权力和身体；Synthwave 更偏向对 1980 年代电子文化的复古未来情绪。","Cyberpunk examines high tech beside low life, power and bodies; synthwave leans toward retro-futurist feeling rooted in 1980s electronic culture."],["solarpunk","都把技术、城市与未来社会放进视觉叙事。","Both place technology, cities and future society in visual narrative.","Cyberpunk 常通过企业控制、污染和分裂提出警告；Solarpunk 想象生态修复、社区协作与可持续技术。","Cyberpunk often warns through corporate control, pollution and division; solarpunk imagines ecological repair, community and sustainable technology."]],
      ["你被霓虹吸引之后，画面希望你看见谁拥有技术，谁又被技术控制？", "After neon draws you in, who does the image ask you to see as owning technology, and who is controlled by it?"]
    ),
    vaporwave: fullGuide(
      ["这些熟悉的商品、雕像和电脑界面为什么像一段被放慢、褪色的记忆？", "Why do these familiar products, statues and computer interfaces feel like a slowed, faded memory?"],
      [["sample","先看被挪用的旧图像","Begin with sampled old images","古典雕像、早期电脑、商场和广告素材被并置，原本的用途变成怀旧碎片。","Classical statues, early computers, malls and ad imagery are juxtaposed, their original uses becoming nostalgic fragments."],["palette","再看粉紫青色","Then, notice pink, violet and cyan","柔亮渐变、夕阳和低清色偏让商业表面显得梦幻又疏离。","Soft gradients, sunsets and low-resolution color casts make commercial surfaces dreamy yet distant."],["loop","最后感受循环","Finally, feel repetition","网格、棕榈、窗格和重复物件像慢速音乐采样，让时间停在一个人工场景。","Grids, palms, windows and repeated objects act like slowed musical samples, holding time in an artificial scene."]],
      [[3,"拼贴秩序松散","Loose collage order"],[5,"粉紫青色浓烈","Intense pink-cyan color"],[4,"怀旧符号密集","Dense nostalgic symbols"],[4,"情绪梦幻疏离","Dreamy, detached emotion"]],
      [["怀旧","失真","柔亮","循环"],["Nostalgic","Distorted","Luminous","Looping"]],
      [["家居","Home","把一件旧电子产品与光滑新材质并置，看怀旧如何改变物件意义。","Place an old electronic object beside a glossy new material and see how nostalgia changes meaning."],["穿搭","Clothing","用粉、青与淡紫的小面积组合，加一处早期数码感配件。","Combine small areas of pink, cyan and pale violet with one early-digital accessory."],["摄影","Photography","拍摄空商场、反光瓷砖或旧显示器，让空旷比人物更有存在感。","Photograph an empty mall, reflective tiles or an old monitor, letting vacancy outweigh the figure."],["日常物件","Everyday objects","观察旧软件界面、购物目录和磁带包装怎样把消费记忆变成图形。","See how old software, catalogs and cassette packaging turn consumer memory into graphics."]],
      [["synthwave","都使用霓虹渐变、网格和 1980 年代数字想象。","Both use neon gradients, grids and 1980s digital imagination.","Vaporwave 更常挪用消费图像并制造缓慢、空洞的怀旧；Synthwave 更强调速度、夜行和电子电影感。","Vaporwave more often samples consumer imagery into slow, hollow nostalgia; synthwave emphasizes speed, night driving and electronic cinema."],["y2k","都回收早期数字文化、商业界面和过时技术的视觉记忆。","Both recycle visual memories of early digital culture, commerce and obsolete technology.","Vaporwave 常以低清采样和古典拼贴保持疏离；Y2K 更偏千禧年前后的光亮未来、透明塑料和网络乐观。","Vaporwave stays detached through lo-fi sampling and classical collage; Y2K favors turn-of-the-millennium gloss, transparent plastic and web optimism."]],
      ["这份怀旧让你想回到过去，还是让你重新怀疑过去的消费承诺？", "Does this nostalgia make you want to return, or question the consumer promises of the past?"]
    ),
    synthwave: fullGuide(
      ["视线是被地平线吸进去，还是被像脉冲一样重复的光带推向前方？", "Is your eye pulled into the horizon, or driven forward by repeating bands of light like a pulse?"],
      [["horizon","先看消失点","Begin with the vanishing point","道路、网格与光线集中到低地平线，制造驾驶般的向前速度。","Road, grid and light converge on a low horizon, creating forward driving speed."],["glow","再看冷暖霓虹","Then, compare neon temperatures","洋红、紫、蓝与橙色夕阳在深黑背景上发光。","Magenta, violet, blue and orange sunset glow against a deep black ground."],["retro","最后找复古未来符号","Finally, find retro-future signs","跑车、合成器、镀铬字和几何太阳让未来看起来来自旧电影想象。","Cars, synthesizers, chrome type and geometric suns make the future look imagined by an older cinema."]],
      [[5,"透视方向强","Strong perspective direction"],[5,"霓虹色彩浓烈","Intense neon color"],[3,"复古符号明确","Clear retro symbols"],[4,"情绪兴奋孤独","Excited, solitary emotion"]],
      [["夜行","脉冲","镀铬","远方"],["Nocturnal","Pulsing","Chrome","Distant"]],
      [["家居","Home","用一条隐藏灯带强调房间纵深，避免全屋同时发光。","Use one concealed light strip to emphasize depth rather than lighting the whole room."],["穿搭","Clothing","在深色基础上加入一处洋红或电蓝反光，保持清楚运动轮廓。","Add one magenta or electric-blue reflective accent to a dark base while keeping a clear moving silhouette."],["摄影","Photography","让道路灯、隧道或扶梯线条汇向远点，拍出夜行节奏。","Let road lights, tunnels or escalators converge into distance to capture a night-driving rhythm."],["日常物件","Everyday objects","看游戏封面、车载界面和音乐海报如何把速度编码进透视与光。","See how game covers, dashboards and music posters encode speed through perspective and light."]],
      [["vaporwave","都使用霓虹、网格、夕阳与复古数字文化。","Both use neon, grids, sunsets and retro digital culture.","Synthwave 偏速度、电影动作和电子音乐脉冲；Vaporwave 偏采样、消费记忆与缓慢疏离。","Synthwave favors speed, cinematic action and electronic pulse; vaporwave favors sampling, consumer memory and slow detachment."],["retrofuturism","都让过去的人如何想象未来成为视觉主题。","Both turn past visions of the future into a visual subject.","Synthwave 集中于 1980 年代式霓虹夜行语汇；Retrofuturism 范围更广，可引用太空时代、流线现代或早期工业未来。","Synthwave concentrates an 1980s neon-night language; retrofuturism ranges across space-age, streamline and earlier industrial futures."]],
      ["如果去掉霓虹颜色，这个画面还剩下速度，还是只剩下怀旧？", "Without neon color, would the image still carry speed, or only nostalgia?"]
    ),
    y2k: fullGuide(
      ["这些透明、鼓起、闪亮的表面是在承诺轻松未来，还是在展示早期网络的天真？", "Are these transparent, inflated, glossy surfaces promising an easy future, or revealing early-web optimism?"],
      [["surface","先看透明与果冻质感","Begin with transparent jelly surfaces","透明塑料、凝胶按钮和水滴高光让界面像可触摸的消费物。","Clear plastic, gel buttons and droplet highlights make interfaces feel like touchable products."],["type","再看圆润科技字","Then, notice rounded tech type","宽体、泡泡字与金属边缘介于玩具、运动品牌和数码设备之间。","Wide, bubbly type and metallic edges sit between toys, sports brands and digital devices."],["optimism","最后看友好未来","Finally, read friendly futurism","蓝、银、青柠与白色把科技包装成清洁、便携和全球连接。","Blue, silver, lime and white package technology as clean, portable and globally connected."]],
      [[4,"模块秩序清楚","Clear modular order"],[5,"亮色与金属感强","Strong bright and metallic color"],[4,"表面效果丰富","Rich surface effects"],[4,"情绪乐观活跃","Optimistic, active emotion"]],
      [["透明","弹性","闪亮","网络化"],["Transparent","Bouncy","Glossy","Networked"]],
      [["家居","Home","观察透明收纳、银色电器和圆角物件如何让科技显得轻巧。","Notice how clear storage, silver devices and rounded objects make technology feel light."],["穿搭","Clothing","用金属银、亮色小包和运动材质组成轻快层次，避免全身反光。","Combine metallic silver, a bright small bag and sport material in light layers without making everything reflective."],["摄影","Photography","用直闪拍透明塑料、旧数码相机和光滑表面，保留真实年代痕迹。","Use direct flash on clear plastic, old digital cameras and glossy surfaces while retaining real signs of age."],["日常物件","Everyday objects","看早期网页、翻盖手机和光盘包装怎样把连接感做成按钮与光泽。","See how early websites, flip phones and disc packaging turned connectivity into buttons and shine."]],
      [["vaporwave","都重新使用早期网络、商业产品和过时数字界面。","Both reuse early-web, commercial-product and obsolete-interface imagery.","Y2K 更接近千禧年前后的光亮乐观与实体产品感；Vaporwave 以采样、低清和空旷感反思消费记忆。","Y2K stays closer to turn-of-millennium glossy optimism and physical products; vaporwave uses sampling, lo-fi and emptiness to reconsider consumer memory."],["glassmorphism","都利用透明层、亮边和光滑数字表面建立层次。","Both use transparent layers, bright edges and smooth digital surfaces for hierarchy.","Y2K 是更宽的时代审美，包含字体、产品与网络文化；Glassmorphism 是以磨砂透明面板为核心的界面处理。","Y2K is a broader period aesthetic across type, products and web culture; glassmorphism is an interface treatment centered on frosted translucent panels."]],
      ["这份未来感今天看起来仍然先进，还是已经变成一种可辨认的年代记忆？", "Does this futurism still feel advanced today, or has it become a recognizable period memory?"]
    ),
    retrofuturism: fullGuide(
      ["这是未来的真实样子，还是过去某个时代对未来的愿望留下的肖像？", "Is this what the future looks like, or a portrait of what one past era wished it would be?"],
      [["era","先找过去的技术语法","Begin with the past's technology","铆钉、流线外壳、模拟仪表或太空舱透露想象来自哪个年代。","Rivets, streamlined shells, analog gauges or capsules reveal the era doing the imagining."],["promise","再看未来承诺","Then, read the promise","自动城市、家庭机器与星际旅行把进步变成具体生活场景。","Automated cities, domestic machines and space travel make progress into concrete daily scenes."],["distance","最后看历史距离","Finally, notice historical distance","今天的观看让当年的乐观、焦虑与遗漏同时显现。","Viewing today reveals the optimism, anxiety and omissions of the original moment together."]],
      [[4,"技术世界秩序明确","Clear technological world order"],[3,"色彩随引用年代变化","Color varies by referenced era"],[4,"机械与时代细节丰富","Rich mechanical period detail"],[3,"情绪乐观又反思","Optimistic yet reflective emotion"]],
      [["复古","未来","机械","愿景"],["Retro","Futurist","Mechanical","Visionary"]],
      [["家居","Home","比较旧家电的按钮与新智能设备，观察两代人如何想象便利。","Compare controls on old appliances and new smart devices to see how two eras imagine convenience."],["穿搭","Clothing","用一个时代轮廓搭配现代功能材质，让时间层次保持清楚。","Pair one period silhouette with modern functional material, keeping the time layers legible."],["摄影","Photography","在老建筑中拍新设备，或在新空间中拍旧机器，让年代关系成为主题。","Photograph new devices in old architecture or old machines in new spaces, making temporal relation the subject."],["日常物件","Everyday objects","看未来概念车、旧科普封面和家电广告如何把愿望变成产品形状。","See how concept cars, old science covers and appliance ads turn wishes into product forms."]],
      [["synthwave","都通过过去的视觉语汇重新想象未来。","Both reimagine the future through visual languages of the past.","Retrofuturism 可跨多个时代与媒介；Synthwave 更集中于 1980 年代霓虹、电子音乐和夜行速度。","Retrofuturism spans several eras and media; synthwave concentrates 1980s neon, electronic music and night-driving speed."],["steampunk","都把历史材料、机械和未发生的技术路径结合。","Both combine historical materials, machinery and technologies that did not happen.","Steampunk 多从蒸汽时代与维多利亚工业想象分叉；Retrofuturism 还包括太空时代、原子时代和其他过去的未来。","Steampunk often branches from steam-age and Victorian industrial imagination; retrofuturism also includes space-age, atomic-age and other past futures."]],
      ["这个未来最清楚地暴露了过去的人相信什么，又忽略了什么？", "What does this future reveal most clearly about what people in the past believed and overlooked?"]
    ),
    afrofuturism: fullGuide(
      ["当未来从黑人历史与非洲离散经验出发时，时间、技术和身份会被怎样重新排列？", "When the future begins from Black histories and African diasporic experience, how are time, technology and identity rearranged?"],
      [["time","先看过去与未来并存","Begin with past and future together","祖先记忆、殖民历史、当代城市与太空想象不是直线阶段，而会在同一画面互相回应。","Ancestral memory, colonial history, contemporary cities and space imagination are not linear stages; they answer one another in one image."],["agency","再看谁掌握技术","Then, ask who holds technology","交通、服装、声音与身体改造常被重新想象为黑人主体创造世界的工具。","Transport, dress, sound and bodily transformation are reimagined as tools through which Black subjects make worlds."],["specificity","最后看文化具体性","Finally, look for cultural specificity","材料、发型、建筑或符号应指向具体社群与创作者语境，而不是泛化的非洲装饰。","Materials, hair, architecture or symbols should point to specific communities and makers, not generalized African decoration."]],
      [[4,"时空结构多层","Layered temporal order"],[5,"色彩与材质有力量","Powerful color and material"],[4,"符号丰富且需有语境","Rich symbols requiring context"],[5,"情绪自主而有愿景","Agentive, visionary emotion"]],
      [["未来祖先","自主","离散","造世界"],["Ancestral-future","Agentive","Diasporic","World-making"]],
      [["家居","Home","了解一件来自黑人设计师或具体非洲文化的作品出处，再决定如何陈列。","Learn the provenance of work by a Black designer or from a specific African culture before deciding how to display it."],["穿搭","Clothing","从具体设计师、音乐或社群理解造型，不把不同非洲传统混成一种图案。","Understand a look through a specific designer, music or community rather than blending distinct African traditions into one pattern."],["摄影","Photography","让被摄者参与决定未来形象与叙事，避免只把文化元素当异域背景。","Let subjects help determine the future image and narrative rather than using culture as an exotic backdrop."],["日常物件","Everyday objects","观察音乐封面、科技设计和当代艺术如何讨论记忆、权力与未来归属。","See how album art, technology design and contemporary art discuss memory, power and belonging in the future."]],
      [["retrofuturism","都重新排列历史技术与未来想象，并检视谁定义进步。","Both rearrange historical technology and future imagination, examining who defines progress.","Afrofuturism 根植黑人历史、非洲离散文化与解放性未来；Retrofuturism 是更广的过去未来想象，不必包含这一政治文化立场。","Afrofuturism is rooted in Black histories, African diasporic cultures and liberatory futures; retrofuturism broadly revisits past futures without necessarily carrying that cultural-political position."],["cyberpunk","都可借技术、城市与身体讨论权力、身份和不平等。","Both can use technology, cities and bodies to examine power, identity and inequality.","Cyberpunk 常从企业控制和技术异化展开反乌托邦；Afrofuturism 以黑人经验重写历史与未来，也可包含疗愈、主权和共同体愿景。","Cyberpunk often builds dystopia from corporate control and alienation; Afrofuturism rewrites history and futures through Black experience, also holding healing, sovereignty and community visions."]],
      ["作品是在借用一种未来外观，还是让具体黑人经验真正改变了未来由谁创造？", "Is the work borrowing a futuristic look, or does specific Black experience truly change who creates the future?"]
    ),
    steampunk: fullGuide(
      ["如果电力与数字技术没有成为主角，这台机器会怎样用齿轮、蒸汽和手工结构解释自己？", "If electricity and digital technology were not the stars, how would this machine explain itself through gears, steam and hand-built structure?"],
      [["mechanism","先看外露机械","Begin with exposed mechanism","齿轮、管道、压力表和铆钉把功能放到表面，机器像可以被拆解阅读。","Gears, pipes, gauges and rivets bring function to the surface, making machines readable by disassembly."],["era","再看历史混合","Then, notice historical mixing","维多利亚式服装、工业材料与未曾出现的交通工具形成架空技术史。","Victorian-inflected dress and industrial material combine with unrealized transport into an alternate technological history."],["craft","最后看手工痕迹","Finally, notice craft","黄铜、皮革、木与磨损边缘让未来物件像由工坊制造，而非无缝量产。","Brass, leather, wood and worn edges make future objects feel workshop-made rather than seamlessly mass-produced."]],
      [[4,"机械结构明确","Clear mechanical structure"],[2,"铜木色彩克制","Restrained brass and wood color"],[5,"零件装饰密集","Dense component ornament"],[4,"情绪冒险怀旧","Adventurous, nostalgic emotion"]],
      [["蒸汽","工坊","冒险","架空"],["Steam-powered","Workshop-made","Adventurous","Alternate-history"]],
      [["家居","Home","观察旧钟、工具和黄铜灯具中功能部件如何同时成为装饰。","Notice how functional parts in clocks, tools and brass lamps also become ornament."],["穿搭","Clothing","用皮革、羊毛和一个机械配件建立材质层次，避免堆满无功能齿轮。","Layer leather, wool and one mechanical accessory without covering everything in functionless gears."],["摄影","Photography","在车间、车站或旧机械旁用侧光强调金属磨损与手工接合。","Use side light in workshops, stations or near old machinery to reveal wear and hand-joined construction."],["日常物件","Everyday objects","看机械表、咖啡机和自行车如何让内部结构成为可见审美。","See how mechanical watches, coffee machines and bicycles turn inner structure into visible aesthetics."]],
      [["retrofuturism","都把历史材料与没有实现的未来技术结合。","Both combine historical materials with unrealized future technologies.","Steampunk 主要围绕蒸汽时代、工坊机械和架空历史；Retrofuturism 覆盖更广的时代未来想象。","Steampunk centers steam-age workshop mechanics and alternate history; retrofuturism spans a broader range of period futures."],["cyberpunk","都以密集技术、城市系统和改造物件建立架空世界。","Both build alternate worlds from dense technology, urban systems and modified objects.","Steampunk 偏外露机械、手工与历史冒险；Cyberpunk 偏数字网络、霓虹都市与企业权力批判。","Steampunk favors exposed mechanics, craft and historical adventure; cyberpunk favors digital networks, neon cities and critique of corporate power."]],
      ["哪些部件真的说明机器如何工作，哪些只是把齿轮当成装饰？", "Which parts truly explain how the machine works, and which merely use gears as decoration?"]
    ),
    "glitch-art": fullGuide(
      ["当图像失去正常传输后，你看到的是错误，还是媒介本身终于露出了结构？", "When an image fails to transmit normally, are you seeing an error or the medium revealing its structure?"],
      [["break","先看断裂类型","Begin with the kind of break","像素错位、色道分离、数据块和扫描线指向不同的生成或传输故障。","Pixel displacement, channel separation, data blocks and scan lines point to different failures of generation or transmission."],["recognition","再看可辨与不可辨","Then, balance recognition and loss","主体仍保留足够轮廓供识别，破坏才会与原图产生张力。","The subject keeps enough contour to be recognized, allowing damage to create tension with the source."],["system","最后看错误是否有规则","Finally, see whether error has rules","重复位移、压缩边界或颜色偏移形成节奏，故障被组织成视觉语言。","Repeated displacement, compression boundaries or color shifts form rhythm, organizing failure into visual language."]],
      [[3,"破坏中仍有节奏","Rhythm within disruption"],[5,"色道冲突强","Strong channel conflict"],[4,"数字噪声密集","Dense digital noise"],[4,"情绪不稳定警觉","Unstable, alert emotion"]],
      [["断裂","错位","噪声","暴露"],["Broken","Displaced","Noisy","Revealing"]],
      [["家居","Home","观察电视雪花、坏屏和压缩图片，让技术瑕疵成为短暂焦点而非永久噪音。","Notice static, damaged screens and compressed images, using technical flaws as brief focus rather than permanent noise."],["穿搭","Clothing","用一处错位印花或色道偏移打破整齐轮廓，保持其他部分安静。","Use one displaced print or channel shift to interrupt a clean silhouette while keeping the rest quiet."],["摄影","Photography","尝试通过反射、滚动快门或真实屏幕干扰制造失真，并记录产生条件。","Create distortion through reflection, rolling shutter or real screen interference and record its conditions."],["日常物件","Everyday objects","看二维码损坏、视频卡顿和打印错版何时仍可读，何时信息完全消失。","See when damaged QR codes, video artifacts and misprints remain readable and when information disappears."]],
      [["generative-ai-dreamlike","都可让熟悉图像产生不稳定、混合和无法完全解释的细节。","Both can make familiar images unstable, hybrid and not fully explainable.","Glitch Art 从信号、数据和设备故障的结构出发；AI 梦境图像来自生成模型重组训练模式与提示。","Glitch art begins with structures of signal, data and device failure; AI dreamlike imagery comes from generative models recombining learned patterns and prompts."],["pixel-art","都让数字图像的最小单位和屏幕结构变得可见。","Both make digital image units and screen structure visible.","Glitch Art 通过错误、损坏和错位打断图像；Pixel Art 主动以像素网格精确构造可读形体。","Glitch art interrupts images through error, corruption and displacement; pixel art deliberately constructs legible forms on a pixel grid."]],
      ["如果修复这个错误，作品会变得更完整，还是会失去它真正想揭示的东西？", "If the error were repaired, would the work become more complete or lose what it truly reveals?"]
    ),
    "pixel-art": fullGuide(
      ["只用有限方格时，哪几个像素决定了这个表情、动作或材质仍能被认出？", "With only a limited grid, which pixels make the expression, action or material recognizable?"],
      [["grid","先看像素网格","Begin with the pixel grid","边缘以阶梯状取舍，每一个方格都参与轮廓，而不是缩小后的模糊图片。","Edges are deliberately stepped, with every square shaping the contour rather than forming a blurred reduced image."],["cluster","再看像素簇","Then, read pixel clusters","颜色成组构成亮面、中间调和阴影，单个噪点会破坏体积。","Grouped colors build light, midtone and shadow; isolated noise can break volume."],["motion","最后看有限帧动作","Finally, notice limited-frame motion","少量关键姿势通过清楚重心与剪影让动作成立。","A few key poses make movement work through clear balance and silhouette."]],
      [[5,"网格秩序严格","Strict grid order"],[3,"有限色板明确","Clear limited palette"],[2,"细节高度压缩","Highly compressed detail"],[3,"情绪直接有节奏","Direct, rhythmic emotion"]],
      [["方格","精炼","怀旧","可读"],["Gridded","Economical","Nostalgic","Legible"]],
      [["家居","Home","用小方砖或收纳格观察图案如何在有限网格中保持轮廓。","Use small tiles or storage grids to see how a motif keeps its outline within a limited grid."],["穿搭","Clothing","选择像素图案时看远距离剪影是否仍清楚，避免只依赖细碎噪点。","For pixel patterns, check whether the silhouette remains clear at distance rather than relying on scattered noise."],["摄影","Photography","把照片缩小后手动限制色板，观察哪些细节必须保留才能辨认。","Reduce a photo and manually limit its palette, noticing which details must remain for recognition."],["日常物件","Everyday objects","看图标、电子屏和十字绣如何在格点限制中用最少单位传递形象。","See how icons, displays and cross-stitch use minimal units to communicate forms under grid limits."]],
      [["voxel-art","都以离散网格单位构造形体并主动展示数字结构。","Both construct form from discrete grid units and visibly embrace digital structure.","Pixel Art 在二维方格上组织轮廓与色块；Voxel Art 用立方体体素建立三维体积、光照与空间。","Pixel art organizes contours and color fields on a 2D grid; voxel art uses cubic voxels for 3D volume, lighting and space."],["glitch-art","都可让像素、扫描与数字媒介结构成为画面主题。","Both can make pixels, scanning and digital medium structure the subject.","Pixel Art 精确安排每个像素以建立可读形体；Glitch Art 借故障、错位和数据破坏打断原有形体。","Pixel art precisely places pixels to build legible form; glitch art disrupts existing form through failure, displacement and data corruption."]],
      ["哪一个最小像素簇承担了最多的辨认信息？", "Which smallest cluster carries the most recognition?"]
    ),
    "voxel-art": fullGuide(
      ["当世界由同样大小的立方体组成时，光、尺度和轮廓怎样让它不只是堆积？", "When a world is built from equal cubes, how do light, scale and silhouette keep it from becoming a pile?"],
      [["volume","先看体素体积","Begin with voxel volume","立方单位沿三轴堆叠，表面阶梯和空洞共同塑造形体。","Cubic units stack on three axes, with stepped surfaces and voids shaping form together."],["silhouette","再看远处轮廓","Then, read the distant silhouette","复杂细节被压缩后，大轮廓仍需区分角色、建筑和地形。","After detail is compressed, large silhouettes must still distinguish characters, buildings and terrain."],["light","最后看块面光照","Finally, notice block lighting","每个立方表面的明暗关系让材质、深度和时间可读。","Value differences across cube faces make material, depth and time readable."]],
      [[5,"三维网格秩序强","Strong 3D grid order"],[3,"色彩按块组织","Color organized by blocks"],[3,"颗粒细节明显","Visible granular detail"],[3,"情绪玩具般具体","Tangible, toy-like emotion"]],
      [["立方","模块","颗粒","世界"],["Cubic","Modular","Granular","World-built"]],
      [["家居","Home","用同尺寸收纳盒测试堆叠、留洞与高低变化如何建立空间。","Use equal storage boxes to test how stacking, voids and height changes create space."],["穿搭","Clothing","用方格纹和块面层叠强调结构，保持人体整体轮廓。","Use checks and block layers to emphasize structure while preserving the overall body silhouette."],["摄影","Photography","从高处拍密集建筑或货架，让单位、阴影和路径形成可读系统。","Photograph dense buildings or shelves from above so units, shadows and paths form a readable system."],["日常物件","Everyday objects","观察积木、像素雕塑和三维地图如何用重复单元表达复杂体积。","Notice how blocks, pixel sculptures and 3D maps express complex volume through repeated units."]],
      [["pixel-art","都通过离散网格与有限单位主动显示数字构成。","Both visibly construct digital form through discrete grids and limited units.","Voxel Art 在三维空间堆成立方体并处理体积光；Pixel Art 在二维平面安排像素簇与轮廓。","Voxel art stacks cubes in 3D and handles volumetric light; pixel art arranges clusters and contours in 2D."],["low-poly","都用简化几何减少细节并突出整体体积。","Both simplify geometry to reduce detail and emphasize overall volume.","Voxel Art 的基本单位固定为立方体网格；Low Poly 使用大小、角度不同的多边形面近似形体。","Voxel art uses a fixed cubic grid; low poly approximates form with polygon faces of varied sizes and angles."]],
      ["哪些立方体是在说明结构，哪些只是增加表面颗粒？", "Which cubes explain structure, and which merely add surface grain?"]
    ),
    "low-poly": fullGuide(
      ["减少曲面之后，哪些折面反而让身体、山脉或物件的方向更清楚？", "After curves are reduced, which facets make the direction of a body, mountain or object clearer?"],
      [["facet","先看折面方向","Begin with facet direction","少量多边形近似曲面，每个面的转折都参与体积。","A small number of polygons approximate curves, with each turn contributing to volume."],["silhouette","再看大轮廓","Then, read the large silhouette","细节被删减后，比例和外缘必须足以辨认对象。","Once detail is removed, proportion and outer edge must carry recognition."],["light","最后看面与光","Finally, see face and light","平面着色让光按几何面跳变，产生水晶般清楚结构。","Flat shading makes light jump across geometric faces, producing crystal-clear structure."]],
      [[4,"几何结构清楚","Clear geometric structure"],[3,"色彩分面明显","Color changes by facet"],[1,"细节装饰很少","Very little detail ornament"],[3,"情绪简练轻盈","Economical, light emotion"]],
      [["折面","简化","晶体","轻量"],["Faceted","Reduced","Crystalline","Lightweight"]],
      [["家居","Home","观察折纸灯、切面花瓶和多面家具怎样借转折捕捉光。","Notice how folded lamps, faceted vases and polygonal furniture catch light through turns."],["穿搭","Clothing","用结构折线和硬挺面料建立折面感，不必加入复杂图案。","Use structural folds and crisp fabric for a faceted feel without complex pattern."],["摄影","Photography","用硬侧光拍岩石、纸雕或建筑，让大面转折比纹理更清楚。","Use hard side light on rocks, paper sculpture or architecture so major planes read more clearly than texture."],["日常物件","Everyday objects","看游戏模型、包装结构和纸艺如何在有限面数中保留辨识度。","See how game models, package structures and papercraft preserve recognition with limited faces."]],
      [["voxel-art","都减少几何细节，以离散表面突出体积与轮廓。","Both reduce geometric detail and emphasize volume and silhouette through discrete surfaces.","Low Poly 使用不规则多边形面逼近形体；Voxel Art 由规则立方体网格堆叠体积。","Low poly approximates form with irregular polygon faces; voxel art stacks volume from a regular cubic grid."],["3d-abstract-cgi","都使用数字三维建模、材质与灯光组织形体。","Both use digital 3D modeling, material and lighting to organize form.","Low Poly 以有限面数和可见折面为核心；3D Abstract CGI 可使用高精度曲面、流体与复杂程序材质。","Low poly centers limited polygons and visible facets; 3D abstract CGI may use refined curves, fluids and complex procedural materials."]],
      ["如果增加更多多边形，形体会更准确，还是会失去现在的清楚节奏？", "Would more polygons make the form more accurate, or erase its current clear rhythm?"]
    ),
    glassmorphism: fullGuide(
      ["你是先看到半透明面板，还是先通过它感知后面的空间层次？", "Do you see the translucent panel first, or perceive the space behind it through the panel?"],
      [["blur","先看背景模糊","Begin with background blur","面板保留后景颜色与光，却抹去细节，使前后层可以同时存在。","Panels retain background color and light while removing detail, allowing front and back layers to coexist."],["edge","再看亮边","Then, notice bright edges","细边框、内高光和柔和阴影让透明面有厚度，不会完全消失。","Fine borders, inner highlights and soft shadow give translucent surfaces thickness so they do not disappear."],["hierarchy","最后看层级是否清楚","Finally, check hierarchy","文字和操作必须有稳定对比；玻璃效果应说明层次，而非覆盖所有内容。","Text and controls need stable contrast; the glass effect should explain layers rather than cover everything."]],
      [[4,"界面层级清楚","Clear interface hierarchy"],[4,"背景色透入面板","Background color enters panels"],[3,"光泽边缘适中","Moderate glossy edges"],[3,"情绪轻盈科技","Light, technological emotion"]],
      [["通透","悬浮","柔光","分层"],["Translucent","Floating","Soft-lit","Layered"]],
      [["家居","Home","看磨砂玻璃隔断怎样让光通过，同时隐藏杂乱细节。","See how frosted partitions transmit light while hiding visual clutter."],["穿搭","Clothing","用一层半透明材质覆盖清楚底层颜色，确保身体轮廓仍可读。","Layer one translucent material over a clear base color while keeping the body silhouette readable."],["摄影","Photography","隔着雾面玻璃拍摄，让色块透出而细节退后。","Photograph through frosted glass so color fields remain while detail recedes."],["日常物件","Everyday objects","观察系统界面、导视牌和透明包装何时通过层次帮助理解，何时降低可读性。","Notice when interfaces, signs and clear packaging use layering to aid understanding and when they reduce readability."]],
      [["neumorphism","都以细腻光影让界面控件显得具有物理表面。","Both use subtle light and shadow to give interface controls a physical surface.","Glassmorphism 依靠透明、模糊和叠层；Neumorphism 让控件像从同色背景凸起或凹入。","Glassmorphism relies on transparency, blur and overlap; neumorphism makes controls rise from or sink into a same-color ground."],["holographic","都利用光、透明感与颜色变化制造未来表面。","Both use light, translucency and color shifts for futuristic surfaces.","Glassmorphism 主要组织界面层级并保持可读；Holographic 以视角色散、虹彩与动态光变作为主要视觉事件。","Glassmorphism mainly organizes interface hierarchy and readability; holographic style centers angle-dependent iridescence and shifting light."]],
      ["透明效果是在帮助你理解前后关系，还是只是让界面显得更复杂？", "Is transparency helping you understand depth, or merely making the interface more complex?"]
    ),
    neumorphism: fullGuide(
      ["这个按钮是浮在背景上，还是像从同一块柔软材料里被压出来？", "Is this button floating above the background, or pressed from the same soft material?"],
      [["surface","先看同色表面","Begin with the same-color surface","控件与背景几乎同色，形状主要依靠光影而非边框区分。","Control and background are nearly the same color, separated mainly by light and shadow rather than borders."],["shadow","再看双向阴影","Then, read paired shadows","一侧亮、一侧暗制造凸起或凹陷，但对比过低会让操作消失。","A light side and dark side create relief or recess, but low contrast can make actions disappear."],["state","最后看按压状态","Finally, check pressed state","光影方向与深浅需要明确变化，用户才能感到控件可操作。","Shadow direction and depth must change clearly for controls to feel operable."]],
      [[5,"控件秩序规则","Regular control order"],[1,"近单色色彩","Near-monochrome color"],[2,"柔和浮雕效果","Soft relief effect"],[2,"情绪安静柔软","Quiet, soft emotion"]],
      [["柔软","浮雕","单色","触感"],["Soft","Embossed","Monochrome","Tactile"]],
      [["家居","Home","观察同色墙面开关和嵌入式把手如何靠阴影提示功能。","Notice how same-color switches and recessed handles rely on shadow to signal function."],["穿搭","Clothing","用同色不同厚度的层叠产生触感，保留缝线或边缘作为辨认线索。","Create tactility with same-color layers of different thickness, retaining seams or edges as cues."],["摄影","Photography","用宽柔光拍白色浮雕或纸面，让浅阴影仍有方向。","Use broad soft light on white relief or paper so shallow shadows retain direction."],["日常物件","Everyday objects","看遥控器、键盘和触控面板如何同时用形状、文字与反馈保证可用。","See how remotes, keyboards and touch panels combine shape, labels and feedback for usability."]],
      [["glassmorphism","都以柔和光影和简洁面板赋予数字界面物理感。","Both use soft light and simple panels to give digital interfaces physical presence.","Neumorphism 依靠同色凸凹；Glassmorphism 依靠透明模糊与背景叠层。","Neumorphism relies on same-color relief; glassmorphism relies on translucent blur and background layering."],["claymorphism","都让控件像柔软材料塑成，并强调圆角与体积。","Both make controls feel molded from soft material, emphasizing rounded volume.","Neumorphism 的起伏浅且与背景同色；Claymorphism 使用更独立、饱满、常有彩色的三维块体。","Neumorphism uses shallow relief continuous with the background; claymorphism uses more separate, plump and often colorful 3D masses."]],
      ["不看文字时，你仍能确定哪些元素能点击、哪些只是背景吗？", "Without reading labels, can you still tell what is clickable and what is merely background?"]
    ),
    claymorphism: fullGuide(
      ["这些物体为什么像刚被手捏出来，同时又保持数字界面的整齐？", "Why do these objects feel freshly hand-molded while remaining orderly as a digital interface?"],
      [["volume","先看饱满体积","Begin with plump volume","圆角、鼓起表面和厚边让图形像柔软黏土块，而不是平面图标。","Rounded corners, bulging surfaces and thick edges make shapes feel like soft clay rather than flat icons."],["shadow","再看短而软的影子","Then, notice short soft shadows","接触阴影把物体稳稳放在表面上，体积可爱但不漂浮。","Contact shadows seat objects firmly on a surface, keeping the cute volume from floating."],["color","最后看分块色彩","Finally, read blocked color","每个体块常用一组低饱和或糖果色，颜色帮助分辨功能与角色。","Each mass often uses a muted or candy-like color family, helping distinguish functions and characters."]],
      [[4,"模块排列清楚","Clear modular arrangement"],[4,"柔和色块丰富","Rich soft color blocks"],[3,"体积装饰明显","Visible volumetric ornament"],[4,"情绪友好活泼","Friendly, playful emotion"]],
      [["柔软","饱满","亲切","玩具感"],["Soft","Plump","Friendly","Toy-like"]],
      [["家居","Home","观察陶器、软包家具和圆角收纳如何用饱满体积减少距离感。","Notice how ceramics, upholstered furniture and rounded storage use plump volume to reduce distance."],["穿搭","Clothing","用厚实软材质与圆润配件形成触感，避免全身都像同一块材料。","Use thick soft material and rounded accessories for tactility without making the whole look one material."],["摄影","Photography","用柔光拍黏土、食物或软玩具，让接触阴影保持清楚。","Use soft light on clay, food or plush objects while keeping contact shadows clear."],["日常物件","Everyday objects","看儿童应用、三维图标和包装角色怎样用体积让操作显得亲近。","See how children's apps, 3D icons and package mascots use volume to make interaction approachable."]],
      [["neumorphism","都用圆角、柔光与阴影让数字控件具有触感。","Both use rounding, soft light and shadow to make digital controls tactile.","Claymorphism 的物体独立、厚实且常有多色；Neumorphism 与同色背景连续，起伏更浅。","Claymorphism uses separate, thick and often multicolored objects; neumorphism remains continuous with a same-color background and shallower relief."],["warm-3d-animation","都使用圆润三维形体、柔软材质和亲切角色感。","Both use rounded 3D forms, soft materials and approachable character feeling.","Claymorphism 常是界面、图标或静态视觉处理；Warm 3D Animation 通过角色表演、镜头、时间和声音建立情感。","Claymorphism is often an interface, icon or static treatment; warm 3D animation builds feeling through performance, camera, time and sound."]],
      ["这种柔软体积是在帮助理解功能，还是只是在增加可爱感？", "Is the soft volume helping you understand function, or only adding cuteness?"]
    ),
    holographic: fullGuide(
      ["当视角改变时，颜色像留在物体表面，还是像光本身正在移动？", "As the viewpoint changes, does color stay on the surface or seem to move with the light itself?"],
      [["shift","先看虹彩偏移","Begin with iridescent shift","青、紫、粉、绿随角度滑动，同一表面不能用单一固有色描述。","Cyan, violet, pink and green slide with angle, so one surface cannot be described by a single local color."],["depth","再看光层深度","Then, notice layers of light","反射、透明与衍射般色带叠加，让薄面看起来有多层空间。","Reflection, transparency and diffraction-like bands overlap, giving a thin surface layered depth."],["anchor","最后找稳定锚点","Finally, find a stable anchor","黑白文字或哑光形体固定阅读，防止所有元素同时闪烁。","Black-white type or matte forms anchor reading so not everything shimmers at once."]],
      [[3,"流动中保留层级","Hierarchy within flow"],[5,"虹彩变化强烈","Intense iridescent change"],[4,"光泽效果丰富","Rich optical effects"],[4,"情绪未来梦幻","Futuristic, dreamlike emotion"]],
      [["虹彩","变色","光层","未来"],["Iridescent","Color-shifting","Light-layered","Futuristic"]],
      [["家居","Home","用一件虹彩物件对比哑光背景，让光变成为焦点而不是噪音。","Contrast one iridescent object with a matte background so shifting light becomes focus rather than noise."],["穿搭","Clothing","选择小面积变色材质，并用中性色稳定整体轮廓。","Use a small area of color-shifting material and stabilize the silhouette with neutrals."],["摄影","Photography","改变光源和拍摄角度记录同一表面的色变，不用后期替代真实反射。","Change light and viewpoint to record one surface shifting color rather than replacing real reflection in post."],["日常物件","Everyday objects","看防伪膜、光盘和虹彩包装如何用角度变化传递真伪或吸引注意。","See how security foils, discs and iridescent packs use angle change to signal authenticity or attract attention."]],
      [["liquid-metal","都以高反射、动态高光和未来材质吸引视线。","Both attract through high reflection, moving highlights and futuristic material.","Holographic 以虹彩和视角色散为核心；Liquid Metal 以镜面金属的流动体积与变形为核心。","Holographic style centers iridescence and angle-dependent color; liquid metal centers reflective metallic volume and deformation."],["glassmorphism","都可使用透明、柔光和叠层制造轻盈科技感。","Both can use translucency, soft light and layering for a light technological feel.","Holographic 让颜色随角度成为主视觉；Glassmorphism 用磨砂透明面板组织界面层级，必须优先保证可读。","Holographic style makes angle-shifting color the event; glassmorphism organizes interface hierarchy with frosted panels and must prioritize readability."]],
      ["如果颜色停止随角度变化，这个对象还会显得特别吗？", "If the color stopped shifting with angle, would the object still feel distinctive?"]
    ),
    "liquid-metal": fullGuide(
      ["这块金属是在维持一个物体，还是正处于融化、拉伸和重新成形之间？", "Is this metal holding an object, or caught between melting, stretching and reforming?"],
      [["flow","先看连续流动","Begin with continuous flow","表面没有明显接缝，凸起、滴落和拉伸像同一团物质受力变形。","The surface has no obvious seams; bulges, drips and stretches deform as one substance under force."],["reflection","再看镜面环境","Then, read mirrored surroundings","高光与暗部沿曲面急速移动，周围颜色被压缩成金属反射。","Highlights and darks race across curves, compressing surrounding color into metallic reflection."],["tension","最后看软硬矛盾","Finally, feel the soft-hard contradiction","金属的重量与液体的柔性同时存在，制造不稳定的触觉想象。","Metallic weight and liquid flexibility coexist, creating unstable tactile imagination."]],
      [[3,"形体秩序流动","Fluid formal order"],[3,"颜色来自环境反射","Color comes from surroundings"],[4,"镜面效果强","Strong mirror effect"],[4,"情绪陌生感强","Strong uncanny emotion"]],
      [["流体","镜面","变形","重量"],["Fluid","Mirrored","Deforming","Weighty"]],
      [["家居","Home","观察不锈钢器皿与弧面镜如何把房间颜色压进反射。","Notice how stainless vessels and curved mirrors compress room colors into reflection."],["穿搭","Clothing","用一件流线金属配饰对比柔软织物，突出软硬关系。","Contrast one streamlined metal accessory with soft textile to emphasize hard-soft relation."],["摄影","Photography","用长条柔光拍弧形金属，让高光连续描述表面转折。","Use a long soft light on curved metal so a continuous highlight describes surface turns."],["日常物件","Everyday objects","看水银般字形、汽车曲面和镀铬包装怎样借反射制造运动。","See how mercury-like lettering, vehicle curves and chrome packaging create motion through reflection."]],
      [["holographic","都使用光变、高反射与未来表面制造视觉吸引。","Both use shifting light, high reflection and futuristic surfaces.","Liquid Metal 强调可变形的镜面体积；Holographic 强调薄层材料随角度产生虹彩色变。","Liquid metal emphasizes deformable mirrored volume; holographic style emphasizes iridescent color shifts across thin layered material."],["3d-abstract-cgi","都依赖数字三维材质、灯光和难以在现实中稳定存在的形体。","Both rely on digital 3D material, light and forms difficult to sustain physically.","Liquid Metal 围绕一种流动金属材质展开；3D Abstract CGI 可组合玻璃、布料、粒子、流体与多种抽象系统。","Liquid metal develops one flowing metallic material; 3D abstract CGI may combine glass, cloth, particles, fluids and many abstract systems."]],
      ["你的眼睛是沿着物体轮廓移动，还是被反射的高光牵着走？", "Does your eye follow the object's outline, or the highlight reflected across it?"]
    ),
    "3d-abstract-cgi": fullGuide(
      ["当对象没有现实名称时，你仍能从重量、材质和运动方向感到它遵循什么规则吗？", "When an object has no real-world name, can weight, material and motion still reveal its rules?"],
      [["form","先看形体家族","Begin with the family of forms","球体、管状、布面或粒子按共同尺度与方向组合，不是任意堆放。","Spheres, tubes, cloth-like sheets or particles combine through shared scale and direction rather than random accumulation."],["material","再看材质冲突","Then, compare materials","玻璃、橡胶、金属与毛绒的反射和形变差异构成主要叙事。","Differences in reflection and deformation among glass, rubber, metal and fuzz become the main narrative."],["light","最后看灯光建立空间","Finally, let light build space","背景可极简，但投影、接触光和景深让抽象形体拥有可信位置。","The setting may be minimal, but cast shadow, contact light and depth of field give abstract forms credible placement."]],
      [[4,"抽象系统有秩序","Ordered abstract system"],[4,"材质色彩丰富","Rich material color"],[4,"表面细节明显","Strong surface detail"],[3,"情绪奇异沉浸","Strange, immersive emotion"]],
      [["合成","材质","悬浮","实验"],["Synthetic","Material-led","Floating","Experimental"]],
      [["家居","Home","把不同触感但同一色系的物件并置，观察材质而非用途如何建立关系。","Place objects of different textures in one color family and see how material, not use, creates relation."],["穿搭","Clothing","组合哑光、透明与反光材质时，只保留一个主轮廓和一处重点。","When combining matte, clear and reflective materials, retain one main silhouette and focal point."],["摄影","Photography","拍摄玻璃、布和金属的接触处，让材质差异成为主题。","Photograph contact points among glass, cloth and metal, making material difference the subject."],["日常物件","Everyday objects","看动态品牌片、专辑封面和展览视觉如何用无名形体表达声音或概念。","See how motion branding, album covers and exhibition graphics use unnamed forms to express sound or ideas."]],
      [["low-poly","都使用数字三维、灯光与简化形体建立视觉系统。","Both use digital 3D, lighting and simplified form to build visual systems.","Low Poly 以有限多边形和可见折面为约束；3D Abstract CGI 可追求光滑曲面、流体、粒子和复杂材质实验。","Low poly is constrained by limited polygons and visible facets; 3D abstract CGI may pursue smooth curves, fluids, particles and complex material experiments."],["liquid-metal","都可创造现实中难以稳定存在的高反射三维形体。","Both can create highly reflective 3D forms difficult to sustain in reality.","3D Abstract CGI 是宽泛的抽象数字影像语言；Liquid Metal 集中表现镜面金属如液体般流动与变形。","3D abstract CGI is a broad abstract digital language; liquid metal concentrates mirrored metal flowing and deforming like liquid."]],
      ["即使不知道对象是什么，哪一种材质线索让你相信它有重量？", "Even without knowing what the object is, which material cue makes you believe it has weight?"]
    ),
    "fractal-art": fullGuide(
      ["你看到的是同一个形状不断缩小重现，还是每一层都在产生新的差异？", "Are you seeing one shape repeat at smaller scales, or new differences emerging at every level?"],
      [["repeat","先看跨尺度重复","Begin with repetition across scale","枝杈、旋涡或边界在大结构和小细节中保持相似规律。","Branches, spirals or boundaries retain related rules in both large structure and small detail."],["depth","再看无尽深入","Then, sense endless depth","层层细节让视线像可以持续放大，中心与边缘都不是终点。","Nested detail makes the view feel endlessly magnifiable, with neither center nor edge as final."],["parameter","最后看颜色如何标记规律","Finally, see color mark rules","渐变和色带常对应迭代层次或数值区间，而不只是表面装饰。","Gradients and bands often correspond to iteration or value ranges rather than surface decoration."]],
      [[5,"数学重复秩序强","Strong mathematical repetition"],[5,"色带变化丰富","Rich color banding"],[5,"微观细节极密","Extremely dense micro-detail"],[4,"情绪宏大催眠","Vast, hypnotic emotion"]],
      [["递归","无尽","分形","催眠"],["Recursive","Endless","Fractal","Hypnotic"]],
      [["家居","Home","观察蕨叶、罗马花椰菜和树枝怎样在不同尺度重复相似分叉。","Notice how fern leaves, Romanesco and branches repeat similar branching at different scales."],["穿搭","Clothing","使用分形图案时保留大片安静区域，让跨尺度细节有呼吸。","When using fractal pattern, keep broad quiet areas so cross-scale detail can breathe."],["摄影","Photography","靠近拍摄裂纹、海岸或云层，再与远景比较相似结构。","Photograph cracks, coastlines or clouds close up, then compare their structure with a distant view."],["日常物件","Everyday objects","看生成壁纸、数据图像和自然纹理如何用规则产生难以手工逐项绘制的复杂度。","See how generated wallpapers, data images and natural textures use rules to create complexity impractical to draw item by item."]],
      [["op-art","都以重复、数学关系和视觉持续运动吸引眼睛。","Both engage the eye through repetition, mathematical relation and persistent visual movement.","Fractal Art 以递归和跨尺度自相似生成复杂结构；Op Art 主要在平面几何对比中制造振动、深度与错觉。","Fractal art generates complexity through recursion and self-similarity across scales; Op Art produces vibration, depth and illusion mainly through planar geometric contrast."],["3d-abstract-cgi","都可由程序规则生成复杂、非具象且沉浸的数字形体。","Both can use procedural rules for complex, nonfigurative and immersive digital forms.","Fractal Art 的核心是迭代与跨尺度结构；3D Abstract CGI 更广泛地组织建模、材质、粒子和物理模拟。","Fractal art centers iteration and cross-scale structure; 3D abstract CGI more broadly organizes modeling, materials, particles and simulation."]],
      ["你愿意继续放大的原因，是期待相同规律，还是期待规律突然变化？", "Do you keep zooming to find the same rule, or to see where the rule suddenly changes?"]
    ),
    "generative-ai-dreamlike": fullGuide(
      ["这幅图最像梦的地方，是不可能的组合，还是每个局部都合理、整体却无法解释？", "What feels most dreamlike: the impossible combination, or the way each detail seems plausible while the whole cannot be explained?"],
      [["hybrid","先看混合对象","Begin with hybrid objects","人物、建筑、植物与材质平滑融合，类别边界像在生成过程中被重新协商。","People, architecture, plants and materials blend smoothly, as if categories were renegotiated during generation."],["logic","再看局部逻辑断裂","Then, find local breaks in logic","手、文字、重复结构或空间连接可能似是而非，暴露统计相似而非真实因果。","Hands, lettering, repeated structures or spatial joins may be plausible yet wrong, revealing statistical resemblance rather than physical causality."],["authorship","最后问选择来自哪里","Finally, ask where choices came from","提示、模型、训练素材、筛选与后期共同形成结果，不能把所有决定归给一个自动按钮。","Prompt, model, training material, selection and post-production jointly shape the result; choices cannot be assigned to one automatic button."]],
      [[2,"梦境秩序流动","Fluid dream logic"],[5,"色彩变化自由","Free-ranging color"],[5,"细节繁密混合","Dense hybrid detail"],[5,"情绪奇异强烈","Intense uncanny emotion"]],
      [["混合","梦境","似真","生成"],["Hybrid","Dreamlike","Plausible","Generated"]],
      [["家居","Home","把生成图当灵感时核对真实材料、尺度和用途，不让奇观替代可生活性。","When using generated imagery as inspiration, verify real material, scale and use rather than letting spectacle replace livability."],["穿搭","Clothing","从生成形象提取颜色或轮廓，不直接复制可能来自不明来源的具体设计。","Extract color or silhouette from generated imagery rather than directly copying a specific design of unclear provenance."],["摄影","Photography","把真实照片与生成图并排，观察光源、手部、文字和空间连接的证据差异。","Compare a real photo with a generated image, checking evidence in light, hands, lettering and spatial joins."],["日常物件","Everyday objects","留意图像是否标注生成方式、来源与编辑过程，特别是在新闻、教育和商业语境。","Notice whether images disclose generation, sources and editing, especially in news, education and commerce."]],
      [["surrealism","都把不相容对象、梦境联想和变形空间放在一起。","Both combine incompatible objects, dream association and transformed space.","Surrealism 是有具体历史、艺术家与思想脉络的现代艺术运动；AI 梦境图像是当代生成技术的视觉结果，不能仅因奇异就等同于超现实主义。","Surrealism is a modern movement with specific history, artists and ideas; AI dreamlike imagery is a contemporary generative result and is not automatically Surrealism because it looks strange."],["glitch-art","都可能暴露数字媒介的不稳定，并产生似真而错误的细节。","Both can expose digital instability and produce plausible but incorrect details.","AI 梦境感来自模型生成与模式重组；Glitch Art 来自或模拟信号、数据、压缩与设备故障。","AI dreamlikeness comes from model generation and pattern recombination; glitch art comes from or simulates signal, data, compression and device failure."]],
      ["你欣赏的是图像的陌生结果，还是也能辨认提示、模型、来源和筛选如何共同塑造它？", "Are you admiring only the strange result, or can you also recognize how prompt, model, sources and selection shaped it?"]
    )
  });

  addIllustrationGuides();
})();
