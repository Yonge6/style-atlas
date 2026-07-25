(() => {
  "use strict";

  const bi = (zh, en) => ({ zh, en });
  const observe = (key, zhLabel, enLabel, zhText, enText) => ({
    key,
    label: bi(zhLabel, enLabel),
    text: bi(zhText, enText)
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
})();
