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
