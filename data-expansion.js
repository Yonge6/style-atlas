(() => {
  'use strict';
  // Original bilingual teaching text. Sources identify historical context, not the generated covers.
  const bi = (pair) => ({zh: pair[0], en: pair[1]});
  const entries = [
    {
      id: 'rinpa', type: 'movement',
      summary: ['琳派把花草、水流和季节意象提炼为平面节奏，以金银地、大片留空与装饰性轮廓连接绘画和工艺。', 'Rinpa distills flowers, streams and seasonal motifs into flat rhythms, joining painting and craft through gold or silver grounds, open space and decorative contours.'],
      history: ['琳派的源头可追溯到 17 世纪京都的俵屋宗达与本阿弥光悦，后来尾形光琳、尾形乾山等人发展出不同面貌。它并非持续以师徒制维系的单一画室，而是后来的创作者反复学习、转化前人的图像资源；屏风、扇面、陶器和漆器都可成为载体。', 'Rinpa developed from the work of Tawaraya Sotatsu and Honami Koetsu in seventeenth-century Kyoto and was reinterpreted by Ogata Korin, Ogata Kenzan and others. It was not one continuously operating studio: later artists renewed an inherited repertoire across screens, fans, ceramics and lacquer.'],
      why: ['金地削弱了写实空间，花叶因而像音符一样靠疏密和方向组织画面。湿色互渗的“垂滴”也能让简化形体保留丰富表面；不是所有琳派作品都用金色。', 'A metallic ground reduces illusionistic depth, letting spacing and direction organize plants like musical notes. Wet pigment pooling, or tarashikomi, can enrich simplified forms; gold is not a requirement of every Rinpa work.'],
      anchor: ['先看花叶之间的空隙，再看金地如何把它们连成节奏。', 'Read the gaps between leaves, then the ground that connects them into a rhythm.'],
      tags: [['装饰平面','季节意象','疏密节奏'],['Decorative planes','Seasonal motifs','Rhythmic spacing']],
      people: [['俵屋宗达','尾形光琳','尾形乾山'],['Tawaraya Sotatsu','Ogata Korin','Ogata Kenzan']],
      observe: [
        ['space','看空隙','Read the intervals','花叶聚集的密处与大片空处交替，留空也是构图中有重量的形状。','Dense clusters alternate with broad openings; empty areas carry compositional weight.'],
        ['shape','看轮廓','Trace the contours','叶片和流水被概括为长弧与色块，不依靠完整的明暗塑造体积。','Leaves and water become long curves and color masses rather than fully shaded volumes.'],
        ['surface','看表面','Study the surface','金属底与哑光颜料的反差制造层次，示意图只能近似呈现这种材质关系。','Metallic ground and matte pigment create contrast; the illustration only approximates that material relationship.']
      ],
      profile: [[4,'疏密有节奏','Rhythmic spacing'],[3,'色彩节制而集中','Selective, focused color'],[5,'装饰构成鲜明','Strong decorative structure'],[3,'安静而华美','Quiet and sumptuous']],
      words: [['流动','疏朗','华美','季节感'],['Flowing','Spacious','Luminous','Seasonal']],
      life: [
        ['屏风与空间','Screens and space','让一组枝叶跨越几块面板，比较合拢和展开时的节奏变化。','Follow one branch across several panels and compare its rhythm when folded and extended.'],
        ['服饰纹样','Textile motifs','观察图案是否顺着身体转折组织，而不是均匀铺满每一处。','Notice whether a pattern responds to the body instead of filling every area evenly.'],
        ['花艺','Flower arranging','把少量花枝集中在一侧，用另一侧的空白形成方向与呼吸。','Cluster a few stems to one side and let the opposite opening establish direction and breathing room.'],
        ['包装','Packaging','用一条弧线贯穿盒盖和盒身，保留足够空白让纹样停得下来。','Carry a curve across lid and box, leaving enough open ground for the pattern to pause.']
      ],
      comparisons: [
        ['ukiyo-e','都能用轮廓与平面色块组织形象。','Both organize images through contour and flat color.','浮世绘常与都市出版及版画生产相连；琳派更需结合屏风、装饰工艺与古典意象理解。','Ukiyo-e often belongs to urban publishing and print production; Rinpa also calls for screens, decorative crafts and classical motifs.'],
        ['gustav-klimt','都可能让金色平面与装饰图案成为主角。','Both may foreground gold surfaces and ornament.','克里姆特式语言与维也纳现代艺术、人物和象征有关；琳派的传承与日本绘画工艺语境不同。','Klimt belongs to Viennese modern art, figuration and symbolism; Rinpa has a distinct Japanese painting and craft lineage.']
      ],
      reflection: ['如果去掉金色，仅靠花叶的位置和空隙，这幅画还保有琳派的节奏吗？','If the gold disappeared, would the placement of plants and their intervals still carry the rhythm?'],
      sources: [['The Met · Rinpa aesthetic','https://www.metmuseum.org/exhibitions/listings/2012/rinpa-aesthetic']]
    },
    {
      id: 'blue-white-porcelain', type: 'language',
      summary: ['青花瓷装饰语汇让钴蓝纹样在白色瓷胎与透明釉下展开，器形、分区和笔意一起决定观看节奏。', 'Blue-and-white porcelain sets cobalt decoration beneath a transparent glaze on a white body; vessel shape, painted zones and brushwork organize the view together.'],
      history: ['这里讨论的是陶瓷上的装饰语言，不是一个独立艺术流派。中国青花瓷在元代发展显著，明清时期形成丰富变化，并通过贸易影响其他地区。不同年代、窑口、器形和用途差异很大，不能只凭蓝白配色判断年代或真伪。', 'This entry describes a ceramic decorative language, not a separate art movement. Chinese blue-and-white porcelain developed prominently during the Yuan and diversified through the Ming and Qing, circulating through trade. Period, kiln, vessel and use matter: a blue-and-white palette cannot establish age or authenticity.'],
      why: ['纹样不是贴在平面上的壁纸：口沿、肩部、腹部和足部各有节奏。蓝色浓淡与线条密度跟随器形，使转动器物的过程也成为阅读图像的过程。', 'Decoration is not wallpaper on a flat surface. Rim, shoulder, body and foot have different rhythms; cobalt density and line spacing follow the vessel, making rotation part of reading the image.'],
      anchor: ['沿着器形看纹样，而不是只记住蓝与白。','Follow the pattern around the vessel, not just the blue and white.'],
      tags: [['钴蓝釉下彩','器形分区','缠枝纹样'],['Underglaze cobalt','Vessel zones','Scrolling motifs']],
      people: [['景德镇陶瓷工匠','元明清窑场与贸易网络'],['Jingdezhen ceramic makers','Yuan, Ming and Qing kilns and trade networks']],
      observe: [
        ['form','看器形','Read the vessel','先辨认口、肩、腹、足的转折，观察纹样如何响应弧面。','Identify the rim, shoulder, body and foot, then see how decoration responds to their curves.'],
        ['bands','看分区','Follow the zones','边饰与主体纹样的比例决定节奏，密集并不等于没有秩序。','The proportion of borders to main motifs sets the rhythm; density does not imply disorder.'],
        ['blue','看蓝色浓淡','Read cobalt density','用深浅和笔触辨认层次，不把数字图里的蓝色当作鉴定实物的证据。','Read tonal variation and brush marks, without treating digitally displayed blue as evidence for authenticating an object.']
      ],
      profile: [[4,'器形带动分区','Form-led zones'],[2,'蓝白中的丰富层次','Variety within blue and white'],[5,'纹样密度较高','Dense ornament'],[3,'清雅而有秩序','Crisp and ordered']],
      words: [['清雅','流转','细密','温润'],['Crisp','Circling','Intricate','Glazed']],
      life: [
        ['餐桌','Tableware','转动杯碗观察纹样的起止，不只从正面寻找一幅完整图画。','Turn a cup or bowl to find where motifs begin and end instead of seeking only a frontal image.'],
        ['家居织物','Home textiles','借用蓝白对比时留意大纹样与窄边饰的分工。','When borrowing blue-white contrast, distinguish large motifs from narrow borders.'],
        ['摄影','Photography','侧光能表现釉面，但反光不能遮住你想研究的笔触。','Side light can reveal glaze, but reflections should not conceal the brushwork you want to study.'],
        ['包装','Packaging','让条带环绕圆筒包装，检验接缝处纹样是否自然衔接。','Wrap bands around cylindrical packaging and check that patterns meet naturally at the seam.']
      ],
      comparisons: [
        ['islamic-geometric','都可以用重复纹样组织装饰表面。','Both can organize decorated surfaces through repetition.','青花包含植物、人物等多种题材，并受瓷器与釉下彩约束；伊斯兰几何纹样更聚焦几何构造，不能混为同一传统。','Blue-and-white includes plants and figures and depends on ceramic and glaze processes; Islamic geometric pattern centers geometric construction within distinct traditions.'],
        ['gongbi','都能依靠细线与层次分明的设色描述对象。','Both can describe subjects through fine lines and layered color.','工笔是绘画方法；青花的线与色还要经过制瓷、施釉和烧成，媒介条件不同。','Gongbi is a painting method; cobalt decoration also undergoes glazing and firing, changing the material conditions.']
      ],
      reflection: ['同一组纹样移到平纸上后，哪些节奏会因失去器物曲面而改变？','Which rhythms change when the same motifs move from a curved vessel onto flat paper?'],
      sources: [['V&A · Chinese blue-and-white ceramics','https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics']]
    },
    {
      id: 'chinese-paper-cut', type: 'technique',
      summary: ['中国剪纸用剪、刻与镂空建立虚实相生的图案，既是手工技艺，也承载各地生活、节庆和祝愿。','Chinese paper-cut uses cutting, carving and openings to construct interdependent shapes, joining hand skills with local life, celebrations and wishes.'],
      history: ['剪纸分布于中国不同地域与社群，题材、色彩和制作方法并不统一，不能缩减为红纸窗花一种样子。它可用于日常装饰与仪式，并在家庭和社区实践中传承；中国剪纸于 2009 年列入联合国教科文组织人类非物质文化遗产代表作名录。','Paper-cut varies across Chinese regions and communities in subject, color and method; red window decorations are only one form. Domestic decoration, ceremonies and community transmission are important contexts. Chinese paper-cut was inscribed on UNESCO’s Representative List of Intangible Cultural Heritage in 2009.'],
      why: ['每一个洞都会改变剩余纸面的连接关系。轮廓、桥接和阴阳形共同工作：好看的负形也必须考虑真实纸张能否完整保留。','Every opening changes how the remaining paper connects. Contour, bridges and positive-negative shapes work together; an appealing opening must also consider whether actual paper stays intact.'],
      anchor: ['看被剪掉的部分，也看让整张纸连在一起的桥。','Look at what is removed and at the bridges holding the sheet together.'],
      tags: [['镂空','虚实相生','连接结构'],['Openwork','Positive-negative shapes','Connecting bridges']],
      people: [['地方剪纸传承人','家庭与社区手工实践者'],['Local paper-cut practitioners','Household and community makers']],
      observe: [
        ['void','看负形','Read the openings','花瓣之间的洞同样是形状，注意洞的大小如何形成疏密。','Openings between petals are shapes too; their sizes establish density and rhythm.'],
        ['bridge','看连接','Check the bridges','寻找鸟、枝、边框之间细小的连接，判断图案能否作为一张纸成立。','Find the small links between bird, branch and border that allow the design to remain one sheet.'],
        ['context','看使用情境','Consider the use','窗花、礼俗与当代创作的目的不同，不要仅凭红色就推断寓意。','Window decoration, ceremonial use and contemporary work differ; red alone does not establish meaning.']
      ],
      profile: [[4,'连接与重复建立秩序','Connections and repeats'],[2,'单色也能丰富','Richness without many colors'],[5,'细密镂空','Intricate openwork'],[4,'鲜明而有生活气息','Vivid and lived-in']],
      words: [['通透','热闹','连绵','轻巧'],['Open','Festive','Connected','Delicate']],
      life: [
        ['窗边','Windows','将剪纸放到透光处，观察光如何让负形从背景变成主角。','Hold a cut sheet against light and watch the openings become active shapes.'],
        ['服饰','Clothing','观察镂空面料的连接结构，不把所有蕾丝都直接称为中国剪纸。','Study connections in openwork fabric without labeling every lace pattern Chinese paper-cut.'],
        ['摄影','Photography','用侧光保留纸边的小阴影，同时检查图案细桥是否清晰。','Use side light for tiny edge shadows while keeping connecting bridges readable.'],
        ['贺卡','Cards','先画连续的支撑结构，再加洞与细节，避免图案切开就散落。','Design a continuous supporting structure before adding openings so the cut design does not fall apart.']
      ],
      comparisons: [
        ['chinese-new-year-woodblock','都可与节庆、地方生活和祝愿相关。','Both may connect to festivals, local life and wishes.','年画通过雕版与印刷转移图像；剪纸通过移除纸面形成图案，两者的生产逻辑不同。','New Year woodblock pictures transfer an image by printing; paper-cut forms an image by removing the sheet itself.'],
        ['paper-collage','都让纸张边缘成为造型语言。','Both make paper edges part of their visual language.','剪纸关注镂空与连接；拼贴关注多个碎片的叠置，不必保持为一张连续纸面。','Paper-cut emphasizes openings and connections; collage layers separate fragments that need not remain one continuous sheet.']
      ],
      reflection: ['这张图中最细的连接在哪里？如果剪断它，图案的结构和意义会怎样变化？','Where is the thinnest connection, and how would cutting it change the structure and reading of the design?'],
      sources: [['UNESCO · Chinese paper-cut','https://ich.unesco.org/en/RL/chinese-paper-cut-00219']]
    },
    {
      id: 'song-bird-flower', type: 'language',
      summary: ['宋代院体花鸟以细致观察、精微线色和经过取舍的构图，让一枝花、一只鸟成为可以慢慢观看的世界。','Song academy bird-and-flower painting combines close observation, delicate line and color, and selective composition to make a branch or bird a world for sustained looking.'],
      history: ['本条聚焦宋代宫廷及画院语境中的花鸟绘画，而不是所有宋画。北宋与南宋作品各有差异，册页、团扇和立轴的观看尺度也不同。马麟等人的作品能帮助理解写生观察与诗意经营如何并存，具体归属应以馆藏说明为准。','This entry focuses on bird-and-flower painting associated with the Song court and academy, not all Song painting. Northern and Southern Song works differ, as do album leaves, fans and hanging scrolls. Works by Ma Lin offer a way to study observation alongside poetic arrangement; attribution follows collection records.'],
      why: ['细节不是越多越好。枝条的方向、鸟的注视和空白相互牵引，精细描绘因此有了观看次序；“像真的”与“被构图选择过”同时存在。','Detail is selective rather than unlimited. The branch direction, a bird’s gaze and empty ground guide attention together, joining natural observation with deliberate arrangement.'],
      anchor: ['一枝一鸟之间的距离，和羽毛一样值得细看。','The distance between branch and bird deserves as much attention as the feathers.'],
      tags: [['细察物态','精微线色','诗意留空'],['Observed nature','Fine line and color','Poetic intervals']],
      people: [['马麟','宋代宫廷与画院画家'],['Ma Lin','Song court and academy painters']],
      observe: [
        ['life','看生命姿态','Read living posture','鸟足如何握枝、花瓣如何转折，比单纯数羽毛更能显示观察。','A bird’s grip and a petal’s turn reveal observation more clearly than simply counting feathers.'],
        ['line','看细线与色层','Read line and washes','轮廓与薄色协同工作，让柔软与坚硬的部分有不同触感。','Fine contours and thin washes work together to distinguish soft surfaces from firm ones.'],
        ['pause','看空白的作用','Read the pause','空处隔开形象，也延长鸟的视线或枝条的方向，并非未完成的背景。','Open ground separates forms and extends a gaze or branch direction; it is not an unfinished backdrop.']
      ],
      profile: [[4,'细节服从构图','Detail within composition'],[2,'设色细腻克制','Subtle, restrained color'],[3,'精微而不铺满','Fine but selective detail'],[3,'安静的生命感','Quiet liveliness']],
      words: [['细腻','清寂','生动','含蓄'],['Delicate','Quiet','Alive','Reserved']],
      life: [
        ['窗台植物','Window plants','只选择一枝叶做观察，记录弯曲、转折和叶面受光的差异。','Choose a single stem and record its bends, turns and differences in illumination.'],
        ['织物','Textiles','用小尺度花鸟纹样时，留出间距让细节能被单独阅读。','When using small bird-and-flower motifs, leave intervals so each detail can be read.'],
        ['摄影','Photography','靠近拍一枝花，同时保留它周围的空气，不必填满整个画面。','Photograph one blossom closely while preserving surrounding air rather than filling the frame.'],
        ['手账','Journaling','写下观察到的姿态而不只写物种名称，让细看成为记录的一部分。','Record an observed posture as well as a species name so attention becomes part of the note.']
      ],
      comparisons: [
        ['gongbi','都重视细线、设色与精微描绘。','Both value fine line, color and close description.','工笔是跨时代的方法；宋代院体花鸟还限定了历史、题材与宫廷语境，不能互相替代。','Gongbi is a method across periods; Song academy bird-and-flower also specifies a historical, thematic and court context.'],
        ['botanical-illustration','都需要认真观察植物结构与细节。','Both require close attention to plant structure and detail.','科学插画以识别和说明为重要目的；院体花鸟也经营诗意、观看距离与宫廷审美。','Botanical illustration prioritizes identification and explanation; academy painting also develops poetic arrangement and courtly viewing.']
      ],
      reflection: ['如果把画面的空白裁掉一半，你对这只鸟或这枝花的感受会怎样改变？','How would your experience of the bird or flower change if half the surrounding empty space were cropped away?'],
      sources: [['The Met · Ma Lin, Orchids','https://www.metmuseum.org/art/collection/search/40133'],['National Palace Museum · Silent Poetry','https://theme.npm.edu.tw/exh111/silentpoetry/en/page-6.html']]
    },
    {
      id: 'arts-and-crafts', type: 'movement',
      summary: ['工艺美术运动把材料、制作和日常生活放回设计中心，纹样的美也来自手工逻辑与整体环境。','Arts and Crafts places material, making and everyday life at the center of design; pattern gains meaning through craft and the surrounding environment.'],
      history: ['运动兴起于 19 世纪后期英国，与对工业生产质量及劳动条件的反思相关，并在其他地区形成不同实践。威廉·莫里斯的织物、壁纸与书籍是重要入口，但工艺美术并不等于一种繁花壁纸，也不意味着所有作品都拒绝机器。','Emerging in late nineteenth-century Britain, the movement questioned the quality and conditions of industrial production and developed differently elsewhere. William Morris’s textiles, wallpapers and books offer useful entry points, but Arts and Crafts is neither one floral pattern nor a universal rejection of machines.'],
      why: ['枝叶被整理成能重复的结构，接缝处仍保持生长感；材料和制作痕迹让装饰不只是表面贴花，而与日常使用产生联系。','Leaves and stems become repeatable structures that retain a sense of growth across joins. Material and making keep ornament connected to everyday use rather than functioning only as a surface sticker.'],
      anchor: ['看图案如何连续生长，也问它是怎样被做出来的。','See how the pattern keeps growing, and ask how it was made.'],
      tags: [['材料诚实','植物重复','手工逻辑'],['Material integrity','Botanical repeats','Craft logic']],
      people: [['威廉·莫里斯','C. F. A. 沃伊西','约翰·拉斯金'],['William Morris','C. F. A. Voysey','John Ruskin']],
      observe: [
        ['repeat','找重复单元','Find the repeat','沿一根茎追踪到下一组叶片，观察重复边界是否被自然地隐藏。','Follow a stem into the next leaf cluster and notice how the repeat boundary is integrated.'],
        ['material','读材料','Read the material','木、纸、织物有不同制作限制，不能只靠仿旧颗粒来表达手工。','Wood, paper and fabric impose different making constraints; fake grain alone cannot stand for craft.'],
        ['whole','看整体环境','Read the ensemble','图案的尺度要与家具、书页或房间相配，局部装饰不脱离整体。','Pattern scale relates to furniture, page or room; local ornament works within a larger whole.']
      ],
      profile: [[5,'重复中保持生长','Growth within repetition'],[3,'自然色调相互支撑','Related natural hues'],[5,'丰富植物装饰','Rich botanical ornament'],[3,'温暖而踏实','Warm and grounded']],
      words: [['生长','丰茂','手作','踏实'],['Growing','Lush','Handmade','Grounded']],
      life: [
        ['家居','Home','比较壁纸与窗帘的纹样尺度，避免所有表面都争抢注意力。','Compare wallpaper and curtain pattern scales so every surface does not compete for attention.'],
        ['服饰','Clothing','观察连续纹样在衣缝处如何对接，而不只看花朵本身。','Study how repeats meet at seams instead of looking only at individual flowers.'],
        ['书籍','Books','让页边装饰和正文保持清晰分工，装饰不能阻碍阅读。','Give border ornament and body text distinct roles so decoration does not obstruct reading.'],
        ['器物','Objects','询问物件的材料与制作方法，把使用寿命也纳入审美判断。','Ask about material and construction, including useful life in your aesthetic judgment.']
      ],
      comparisons: [
        ['art-nouveau','都可能借用植物曲线与连续装饰。','Both may use plant curves and continuous ornament.','新艺术常以线条流动和新形式实验展开；工艺美术还特别关注制作、劳动与生活环境。','Art Nouveau often explores flowing lines and new forms; Arts and Crafts also foregrounds making, labor and the lived environment.'],
        ['bauhaus','都试图连接艺术、工艺和日常用品。','Both sought connections between art, craft and everyday objects.','包豪斯逐步探索工业与标准化；工艺美术更多从材料、制作质量与社会批评切入，二者都不是单一外观。','Bauhaus increasingly explored industry and standardization; Arts and Crafts approached material, quality and social critique. Neither is a single look.']
      ],
      reflection: ['你喜欢的是花纹本身，还是也能从中读到材料、制作与使用之间的关系？','Do you enjoy only the pattern, or can you also read the relationship between material, making and use?'],
      sources: [['V&A · Arts and Crafts: an introduction','https://www.vam.ac.uk/articles/arts-and-crafts-an-introduction']]
    },
    {
      id: 'mid-century-modern', type: 'language',
      summary: ['世纪中期现代设计用清晰结构、有机曲线和材料实验回应现代生活，轻巧家具与实用空间比复古配色更重要。','Mid-century modern design responds to modern living with clear structures, organic curves and material experiments; light furniture and usable space matter more than a retro palette.'],
      history: ['这是涵盖 20 世纪中期建筑、家具与平面设计的宽泛称谓，不是统一宣言下的单一流派。不同国家和设计师的实践各异；战后生活方式、工业制造与新材料是理解它的重要背景。弯曲胶合板、模塑材料及模块化思维提供了新的形体可能。','This broad label covers mid-twentieth-century architecture, furniture and graphics rather than one movement with a unified manifesto. Practices differed across places and designers. Postwar lifestyles, manufacturing and material experiments, including bent plywood and molded forms, opened new possibilities.'],
      why: ['纤细支撑让家具显得离地而轻，有机轮廓回应身体，模块化则便于组合。暖木色与亮色可以共存，但颜色不能替代结构与功能。','Slender supports lift furniture visually, organic contours respond to the body, and modules allow flexible arrangements. Warm wood and bright accents may coexist, but color cannot replace structure and function.'],
      anchor: ['先看腿、接点与身体怎样相遇，再看芥末黄。','Look at legs, joints and the body’s contact before noticing mustard yellow.'],
      tags: [['有机曲线','轻巧结构','材料实验'],['Organic curves','Light structures','Material experiments']],
      people: [['查尔斯与蕾·伊姆斯','埃罗·沙里宁','阿尔瓦·阿尔托'],['Charles and Ray Eames','Eero Saarinen','Alvar Aalto']],
      observe: [
        ['support','看支撑','Read the supports','椅腿、桌面和连接点共同传递重量，轻巧感不等于不需要结构。','Legs, surfaces and joints carry weight together; visual lightness still requires structure.'],
        ['body','看身体关系','Read body fit','座面、靠背和扶手的弧线是否回应坐姿，而不是任意的圆角。','Ask whether seat, back and arm curves respond to posture rather than merely adding rounded corners.'],
        ['material','看材料转折','Read material transitions','木、金属和织物各有角色，关注它们交接的方式而非只看复古色。','Wood, metal and fabric play different roles; study their junctions rather than only retro colors.']
      ],
      profile: [[4,'结构清楚','Legible structure'],[3,'木色与局部亮色','Wood with color accents'],[2,'装饰服从形体','Restrained surface ornament'],[3,'轻松的现代感','Relaxed modernity']],
      words: [['轻巧','有机','实用','明朗'],['Light','Organic','Useful','Optimistic']],
      life: [
        ['家居','Home','检查家具间是否留出真实动线，不为拍照而牺牲日常使用。','Check that furniture leaves usable circulation instead of sacrificing daily life for a photograph.'],
        ['服饰','Clothing','用明确轮廓与少量色块呼应设计精神，不必把年代服装当成唯一入口。','Echo clear outlines and selective color without treating period costume as the only approach.'],
        ['摄影','Photography','低一点的视角可以显示细腿与离地空隙，避免广角过度扭曲。','A slightly lower view reveals slender legs and ground clearance without excessive wide-angle distortion.'],
        ['日常用品','Everyday products','握住把手、打开抽屉，检验好看的曲线是否也便于使用。','Hold a handle or open a drawer to test whether an attractive curve is also useful.']
      ],
      comparisons: [
        ['bauhaus','都关注现代生活、结构与设计生产。','Both address modern life, structure and design production.','包豪斯是具有明确历史的学校与影响网络；世纪中期现代是跨地域的较宽泛设计称谓。','Bauhaus was a historically specific school and network; mid-century modern is a broader cross-regional design label.'],
        ['memphis','都可能出现几何形和鲜明的局部颜色。','Both may feature geometric forms and vivid accents.','孟菲斯常以图案、戏谑和不寻常组合挑战功能主义；世纪中期现代通常更重使用、材料与身体关系。','Memphis often challenges functionalism with pattern and playful combinations; mid-century modern more often foregrounds use, material and the body.']
      ],
      reflection: ['拿掉复古色彩，这件物品还会通过结构、材料与使用方式显得属于这个语境吗？','Without the retro colors, would structure, material and use still connect this object to the period?'],
      sources: [['V&A · Mid-century modern design','https://www.vam.ac.uk/event/Y1wlKoBLXDG/o24011-mid-century-modern-design']]
    },
    {
      id: 'vienna-secession', type: 'movement',
      summary: ['维也纳分离派把几何秩序、植物装饰与展览实验并置，追求跨越绘画、建筑和应用艺术的整体表达。','The Vienna Secession joins geometric order, botanical ornament and exhibition experimentation across painting, architecture and applied art.'],
      history: ['维也纳分离派于 1897 年成立，艺术家试图摆脱保守展览制度。奥尔布里希设计的展馆及《神圣之春》杂志是重要入口。团体内部并非只有一种画法；本条特别观察其平面与装饰设计中的线、格子和留白。','Founded in 1897, the Vienna Secession sought independence from conservative exhibition structures. Olbrich’s exhibition building and the journal Ver Sacrum provide useful entry points. Its members did not share one painting style; this entry focuses on line, grid and open space in graphic and decorative work.'],
      why: ['自然形象被压缩成可重复的线和几何单位，与严格边界形成张力。画面可以同时华丽和克制，关键在装饰如何被框架组织。','Natural forms are compressed into repeatable lines and geometric units that meet strict boundaries. A design may be ornate yet restrained because a framework controls its ornament.'],
      anchor: ['看植物怎样变成几何，几何又怎样留下呼吸。','See plants turn into geometry, and geometry leave room to breathe.'],
      tags: [['几何装饰','线性节奏','整体设计'],['Geometric ornament','Linear rhythm','Integrated design']],
      people: [['古斯塔夫·克里姆特','科洛曼·莫泽','约瑟夫·玛丽亚·奥尔布里希'],['Gustav Klimt','Koloman Moser','Joseph Maria Olbrich']],
      observe: [
        ['grid','找几何骨架','Find the geometric frame','方格、长条与边界先搭出秩序，再容纳植物或人物形象。','Squares, strips and boundaries establish order before accommodating plants or figures.'],
        ['line','看线的节奏','Follow linear rhythm','细线的重复、转折和停顿让装饰有节拍，不只靠金色产生华丽。','Repeated lines, turns and pauses give ornament a beat; richness does not depend on gold alone.'],
        ['integration','看整体关系','Read integration','展览、书页和建筑可能共享图形逻辑，但不应把所有成员都归为同一外观。','Exhibition, page and building can share graphic logic without making every member’s work look identical.']
      ],
      profile: [[5,'几何框架鲜明','Strong geometric framework'],[2,'有限色彩的对比','Limited-color contrast'],[4,'被秩序约束的装饰','Structured ornament'],[3,'庄重而新颖','Formal and exploratory']],
      words: [['端正','精致','节拍','革新'],['Formal','Refined','Rhythmic','Innovative']],
      life: [
        ['室内','Interiors','观察门窗边框与装饰是否使用同一组比例，形成整体而非堆叠。','Check whether frames and decoration share proportions rather than simply accumulating details.'],
        ['服饰','Clothing','用细条、格子与少量植物图形组织面料，保留清晰边界。','Organize fabric with fine stripes, grids and a few botanical forms, keeping boundaries legible.'],
        ['书刊','Publications','让图形与标题共用骨架，同时保证文字有独立的阅读空间。','Give graphic and title a shared frame while preserving a clear reading area for text.'],
        ['包装','Packaging','对比有边框和无边框的版本，感受装饰如何因边界变得安定。','Compare framed and unframed versions to see how a boundary steadies ornament.']
      ],
      comparisons: [
        ['art-nouveau','都探索约 1900 年前后的新装饰语言。','Both explored new decorative languages around 1900.','分离派是具体的维也纳团体与展览实践；新艺术是更广泛的国际语境，两者有交集但非同义词。','The Secession was a specific Viennese association and exhibition practice; Art Nouveau is a broader international context. They overlap but are not synonyms.'],
        ['gustav-klimt','克里姆特是理解分离派的重要人物。','Klimt is an important figure for understanding the Secession.','克里姆特个人的金色人物语言不能代表整个团体，分离派还包括建筑、平面与其他艺术实验。','Klimt’s gilded figuration cannot stand for the entire association, which included architecture, graphics and other experiments.']
      ],
      reflection: ['这件设计的华丽来自装饰数量，还是来自几何边界与装饰之间的张力？','Does this design’s richness come from the quantity of ornament or its tension with geometric boundaries?'],
      sources: [['Secession · Building and history','https://secession.at/building']]
    },
    {
      id: 'sachplakat', type: 'language',
      summary: ['物体海报把商品轮廓、品牌字样和大面积平色压缩为直接的信息，让物本身成为海报主角。','Sachplakat compresses an object silhouette, brand lettering and broad flat color into a direct message, making the product the poster’s main subject.'],
      history: ['Sachplakat 与 20 世纪初德国广告海报、卢西安·伯恩哈德等设计师密切相关，常放在 Plakatstil 的讨论中理解。它不属于瑞士国际主义风格。教学封面省略了品牌字样以突出物体轮廓，但真实历史案例常让产品与短标题共同工作。','Sachplakat is closely associated with early twentieth-century German advertising and designers such as Lucian Bernhard, often discussed within Plakatstil. It is not Swiss International Style. The teaching cover omits branding to isolate the object; historical examples commonly combine product and short lettering.'],
      why: ['去掉场景和复杂叙事后，轮廓、尺寸和背景反差承担识别任务。物体不是越写实越好，而是要在远处仍能一眼认出。','Removing setting and elaborate narrative transfers recognition to contour, scale and background contrast. The object need not be maximally realistic; it must remain recognizable at a distance.'],
      anchor: ['一个物体，少量文字，让轮廓与色块完成一眼识别。','One object, a few words: let silhouette and color deliver immediate recognition.'],
      tags: [['主体物件','轮廓概括','广告直达'],['Object focus','Reduced silhouette','Direct advertising']],
      people: [['卢西安·伯恩哈德','路德维希·霍尔魏因'],['Lucian Bernhard','Ludwig Hohlwein']],
      observe: [
        ['object','先找物体','Find the object','主体占据明确位置，没有依赖复杂故事才能解释的背景。','The subject occupies a clear position without a setting that requires a complicated story.'],
        ['silhouette','看轮廓压缩','Read reduction','细节被删减，壶嘴、把手等关键特征保留下来，让形象远看仍清楚。','Details are removed while a spout or handle remains, keeping the image clear from afar.'],
        ['message','看信息关系','Read the message','真实海报中短字样与商品共同完成广告；无字教学图不代表这种语言没有文字。','In actual posters, short lettering works with the product; a text-free teaching image does not mean this language excludes type.']
      ],
      profile: [[4,'单一焦点明确','One clear focal point'],[3,'平色强对比','Strong flat-color contrast'],[1,'删除多余装饰','Minimal extra ornament'],[4,'直接而有力','Direct and forceful']],
      words: [['直接','醒目','结实','简练'],['Direct','Bold','Solid','Concise']],
      life: [
        ['产品陈列','Product display','只摆一个关键物件，改变背景颜色来测试识别是否更直接。','Display one key object and vary the background to test immediate recognition.'],
        ['穿搭','Clothing','用一个轮廓清楚的配件做重点，避免每个部分同时成为主角。','Let one clearly shaped accessory lead rather than making every element a focal point.'],
        ['摄影','Photography','用干净背景拍产品，缩小到手机缩略图检查轮廓是否还清晰。','Photograph an object on a plain ground and check its silhouette at thumbnail size.'],
        ['海报','Posters','把信息缩成产品与一句短标题，逐项判断哪些细节可以删除。','Reduce a message to a product and short heading, then assess each removable detail.']
      ],
      comparisons: [
        ['swiss-style','都追求快速而清楚的信息传达。','Both pursue fast, clear communication.','瑞士风格更强调网格、字体层级与系统；物体海报主要靠单个商品、轮廓和平色完成识别。','Swiss Style emphasizes grids, typographic hierarchy and systems; Sachplakat relies chiefly on one product, silhouette and flat color.'],
        ['pop-art-poster','都可能使用明亮色块与熟悉的消费物件。','Both may use bright color and familiar consumer objects.','物体海报首先服务广告识别；波普语汇还可能利用重复、挪用与大众文化反思，历史背景不同。','Sachplakat primarily serves advertising recognition; Pop may also use repetition, appropriation and reflection on mass culture in a different historical context.']
      ],
      reflection: ['把图片缩到指甲大小，哪些细节仍然帮助你认出物体，哪些只是装饰？','At thumbnail size, which details still help you recognize the object and which are only decoration?'],
      sources: [['MoMA · Lucian Bernhard','https://www.moma.org/artists/515-lucian-bernhard']]
    },
    {
      id: 'risograph', type: 'technique',
      summary: ['Riso 孔版印刷视觉来自分色、专色油墨和逐色套印；颗粒、叠色与轻微错位是可观察的工艺特征，不是必须添加的滤镜。','Risograph visuals arise from color separation, spot inks and successive printing passes; grain, overprint and small registration shifts are process clues, not mandatory filters.'],
      history: ['Risograph 是 RISO 的孔版印刷设备体系，被用于文档、出版物及创作印刷。本条关注其在独立出版、插画和海报中的视觉运用，不把一个品牌设备等同于艺术流派。数字模拟能练习分色思维，但不能冒充真实印刷品。','Risograph is RISO’s stencil-printing system, used for documents, publications and creative printing. This entry focuses on its use in independent publishing, illustration and posters, not a brand-defined art movement. Digital simulation can teach separation but is not evidence of an actual printed artifact.'],
      why: ['每种油墨对应一个印刷层，颜色叠加可形成新的视觉色。先限制油墨，再安排重叠与留白，往往比后期加满颗粒更能体现孔版印刷思维。','Each ink corresponds to a printed layer, and overlaps can produce additional perceived colors. Choosing inks before arranging overlap and paper is more meaningful than adding grain afterward.'],
      anchor: ['把画面拆成几张单色版，再看重叠处发生什么。','Separate the image into single-color layers and read what happens where they overlap.'],
      tags: [['专色油墨','套印叠色','纸张颗粒'],['Spot inks','Overprint','Paper grain']],
      people: [['RISO 印刷设备与技术团队','独立出版与工作室印刷实践者'],['RISO printing technology teams','Independent publishers and studio printers']],
      observe: [
        ['layers','拆分颜色层','Separate ink layers','试着找出每种专色覆盖的形状，重叠部分可能比实际油墨数量更多彩。','Identify the forms assigned to each ink; overlap may create more apparent colors than the ink count.'],
        ['registration','看套准关系','Read registration','轻微错位会露出另一层边缘，但大量随机错位不是工艺准确性的证明。','Small shifts reveal edges of another layer, but random misalignment does not prove process accuracy.'],
        ['paper','看纸与网点','Read paper and halftone','纸色参与配色，网点改变浓淡；屏幕发光不能完整还原实物油墨。','Paper color enters the palette and halftones control tone; a luminous screen cannot fully reproduce ink on paper.']
      ],
      profile: [[3,'分层组织图像','Layered organization'],[4,'少量专色鲜明','Vivid limited spot inks'],[3,'颗粒与网点可见','Visible grain and dots'],[4,'轻快而有手感','Lively and tactile']],
      words: [['鲜活','叠色','颗粒','轻松'],['Lively','Overprinted','Grainy','Relaxed']],
      life: [
        ['海报','Posters','先选两种油墨再设计图形，用叠色增加层次而非无限加色。','Choose two inks before drawing and use overprint rather than unlimited colors to add depth.'],
        ['布料观察','Textile observation','比较织物印花的套色边界，理解同一图案如何分层制作。','Compare color boundaries on printed cloth to understand how a design can be made in layers.'],
        ['照片转印','Photo interpretation','把照片分成亮暗与网点层，检查人物仍有足够清晰的识别信息。','Translate a photo into tonal and halftone layers while preserving essential recognition.'],
        ['小册子','Zines','预留装订与裁切余量，让工艺限制成为版式设计的一部分。','Allow binding and trim margins so production constraints become part of the layout.']
      ],
      comparisons: [
        ['pop-art-poster','都可能出现明亮色彩、网点与平面形象。','Both may feature bright color, halftone dots and flat imagery.','Riso 描述印刷过程及其视觉结果；波普是更广泛的艺术与大众文化语境，不能由网点直接判定。','Riso names a printing process and its effects; Pop belongs to a broader art and mass-culture context that dots alone cannot establish.'],
        ['linocut','都需要把画面转化为可印刷的版层。','Both translate an image into printable layers.','油毡版画从凸起表面转印油墨；Riso 让油墨通过孔版，两种制版与着墨方式不同。','Linocut transfers ink from a raised surface; Riso passes ink through a stencil, using different plate-making and ink transfer.']
      ],
      reflection: ['这张图真正需要几种油墨？哪些颜色来自重叠，哪些地方应该让纸面露出来？','How many inks does this image really need, which colors come from overlap, and where should the paper remain visible?'],
      sources: [['RISO · Company and technology profile','https://www.riso.co.uk/pdf/profile.pdf']]
    },
    {
      id: 'cyanotype', type: 'technique',
      summary: ['蓝晒是一种铁盐感光成像工艺，以普鲁士蓝和浅色影像形成鲜明关系，物体遮挡与曝光共同决定图形。','Cyanotype is an iron-based photographic process whose Prussian blue ground contrasts with pale imagery, shaped by exposure and the objects blocking light.'],
      history: ['蓝晒由约翰·赫歇尔于 1842 年提出，安娜·阿特金斯的植物影像是重要的历史案例。它既可通过物体接触形成影像，也可使用负片；因此不是“植物蓝色滤镜”。本条的封面是数字教学示意，不是一次实际曝光的记录。','John Herschel introduced cyanotype in 1842, and Anna Atkins’s botanical images are important historical examples. It can use objects in contact or photographic negatives, so it is not simply a blue botanical filter. The cover is a digital teaching illustration, not a record of an actual exposure.'],
      why: ['物体阻挡光线，透明度与贴合程度改变边缘和层次。蓝色与纸白看似简单，却把植物结构、重叠和空隙变得格外明显。','Objects block light, while transparency and contact affect edges and tone. Blue and paper white make plant structure, overlap and intervals unusually legible.'],
      anchor: ['看光被挡住的地方，而不是把照片整体染成蓝色。','Read where light was blocked rather than imagining a photograph tinted blue.'],
      tags: [['感光成像','普鲁士蓝','接触轮廓'],['Light-sensitive imaging','Prussian blue','Contact silhouettes']],
      people: [['约翰·赫歇尔','安娜·阿特金斯'],['John Herschel','Anna Atkins']],
      observe: [
        ['silhouette','看遮光轮廓','Read blocked light','叶脉、细茎和叶片的透光差异可能产生不同明度，不全是纯白剪影。','Veins, stems and leaves can transmit different amounts of light, producing more than solid white silhouettes.'],
        ['contact','看边缘','Read the edges','贴合与离开纸面的部分可能形成不同清晰度，模糊应有物理原因。','Areas touching or lifted from the paper can differ in sharpness; blur should have a physical cause.'],
        ['ground','看蓝与空白','Read blue and white','蓝色不是背景填充，它也记录曝光；未放植物的区域参与整体构图。','Blue is not merely a background fill: it records exposure, and unoccupied areas contribute to composition.']
      ],
      profile: [[3,'物体与空白相互平衡','Objects balanced by gaps'],[1,'单一蓝色体系','One blue tonal family'],[2,'结构本身成纹样','Structure as pattern'],[3,'清晰而安静','Clear and quiet']],
      words: [['清透','幽蓝','痕迹','静谧'],['Translucent','Deep blue','Trace','Still']],
      life: [
        ['植物观察','Plant observation','将叶片对光看透光层次，再比较数字示意与真实接触印相的区别。','Hold leaves against light, then compare digital illustrations with actual contact prints.'],
        ['织物','Textiles','欣赏蓝白植物布料时区分印花图案与真正的感光工艺。','Distinguish printed botanical patterns from an actual light-sensitive process on fabric.'],
        ['摄影','Photography','先用普通纸排布物体研究留白；实际操作感光材料前查阅安全说明。','Arrange objects on ordinary paper to study spacing; consult safety instructions before handling photographic materials.'],
        ['书页','Pages','用少量枝叶组织章节页，把植物结构当作视觉线索而非装饰堆砌。','Use a few stems on a section page, letting plant structure guide the eye without decorative overload.']
      ],
      comparisons: [
        ['botanical-illustration','都可以呈现植物轮廓、脉络和形态。','Both can reveal plant outlines, veins and form.','蓝晒由光与感光材料成像，不必符合科学图谱的说明要求；植物科学插画重视识别信息与绘制选择。','Cyanotype forms through light-sensitive material and need not meet scientific illustration requirements; botanical illustration prioritizes identification and selected description.'],
        ['chinese-paper-cut','都能让实形与空隙形成鲜明对比。','Both create striking relations between shapes and gaps.','剪纸真实移除纸张；蓝晒改变感光表面的颜色，纸面本身仍连续存在。','Paper-cut physically removes paper; cyanotype changes the color of a sensitive surface while the sheet remains continuous.']
      ],
      reflection: ['如果一片叶子离纸面稍远，它的边缘与贴紧纸面的叶子应该有什么差别？','How should the edge of a leaf lifted above the paper differ from one held in close contact?'],
      sources: [['Smithsonian · Prints Fit for a Dig','https://asia-archive.si.edu/prints-fit-for-a-dig/']]
    },
    {
      id: 'linocut', type: 'technique',
      summary: ['油毡版画通过刻去非着墨部分、保留凸面来印出图像，刀痕、黑白关系与反向思考构成鲜明的视觉语言。','Linocut removes non-printing areas while raised surfaces carry ink; gouge marks, positive-negative relations and reversal create its distinctive visual language.'],
      history: ['油毡版画属于凸版印刷，版材是油毡而非木板。在 20 世纪艺术、教育与工作室实践中被广泛采用，既有单色也有多版套色或减版作品。它是一种技法，不应被限定为黑白粗线条的单一风格。','Linocut is relief printing from linoleum rather than wood. Widely used in twentieth-century art, teaching and studio practice, it includes single-color, multi-block and reduction prints. It is a technique, not a single style restricted to heavy black-and-white lines.'],
      why: ['刻掉的沟槽通常不着墨，保留部分形成印面，因此画者要同时设计黑形和白形。刀的方向、宽度和转折也能描述羽毛、风或树叶的运动。','Cut grooves normally remain uninked while retained surfaces print, so the maker designs dark and light shapes together. Gouge direction, width and turns can describe feathers, wind or leaf movement.'],
      anchor: ['白线是刻去的路，黑面是留下的形。','White lines follow removed material; dark shapes follow what remains.'],
      tags: [['凸版转印','方向刀痕','黑白结构'],['Relief transfer','Directional cuts','Positive-negative structure']],
      people: [['克劳德·弗莱特','西里尔·鲍尔','西比尔·安德鲁斯'],['Claude Flight','Cyril Power','Sybil Andrews']],
      observe: [
        ['cut','找刻去的部分','Find the cuts','白色细线穿过黑面时，想象它们是被刀移除的沟槽。','When pale lines cross a dark mass, imagine the grooves removed by a gouge.'],
        ['direction','看刀痕方向','Read direction','线条顺着羽毛、树枝或动作排列，不只是随机添加的旧印刷噪点。','Marks follow feathers, branches or movement rather than acting as random distressed noise.'],
        ['print','看印面关系','Read the printed surface','大黑面与细白线互相支撑；多色作品还要考虑分版与套准。','Large dark masses and fine light lines support each other; multicolor works also require separation and registration.']
      ],
      profile: [[4,'黑白结构清楚','Clear positive-negative structure'],[2,'有限印色','Limited printing colors'],[3,'刀痕形成肌理','Texture through cutting'],[4,'有力的手工节奏','Forceful handmade rhythm']],
      words: [['有力','锐利','粗粝','节奏'],['Forceful','Sharp','Tactile','Rhythmic']],
      life: [
        ['室内装饰','Wall prints','远看版画的大黑白形，近看刀痕，检验两个距离是否都成立。','Read the main light-dark shapes from afar, then the cuts up close, checking both distances.'],
        ['服饰图案','Garment graphics','把图形缩成单色检查轮廓，保留印刷后仍可辨认的细线宽度。','Reduce a graphic to one color and preserve line widths that remain legible after printing.'],
        ['摄影转译','Photo translation','将照片概括为黑白几块，再用有方向的线条解释形体。','Reduce a photograph to a few light-dark masses, then use directional lines to describe form.'],
        ['卡片','Cards','先在纸上设计反向图稿；实际用刀制作时遵循工具安全指导。','Plan a reversed design on paper first; follow tool safety guidance for actual carving.']
      ],
      comparisons: [
        ['ukiyo-e','都可通过凸版与套印形成图像。','Both can form images through relief printing and registration.','浮世绘是有特定历史题材和出版体系的艺术语境；油毡版画指版材与技法，并不限定题材。','Ukiyo-e has a specific historical and publishing context; linocut names a material and technique without fixing the subject.'],
        ['german-expressionism','都可能用尖锐线条和强烈黑白关系传递力量。','Both may communicate force with sharp lines and strong light-dark contrasts.','德国表现主义是艺术运动语境，包含多种媒介；油毡版画是一种印刷技法，可服务很多不同情绪与主题。','German Expressionism is a movement spanning media; linocut is a print technique serving many different moods and subjects.']
      ],
      reflection: ['如果只能保留三块黑形，这幅画的主体还成立吗？你会让刀痕朝哪个方向走？','If only three dark masses remained, would the subject still read, and which direction would you give the cuts?'],
      sources: [['Tate · Linocut','https://www.tate.org.uk/art/art-terms/l/linocut']]
    },
    {
      id: 'paper-collage', type: 'technique',
      summary: ['纸艺拼贴通过剪、撕、叠和粘把碎片组织成新图像，边缘、纸色与覆盖关系让材料本身参与叙事。','Paper collage builds new images by cutting, tearing, layering and attaching fragments; edges, paper color and overlap let material participate in the story.'],
      history: ['拼贴在现代艺术中与立体主义、达达等实践相互交织，也广泛用于插画、书籍和日常手工。本条聚焦纸张拼贴的材料与构图方法，不把所有剪贴图都归为同一历史运动。使用报刊、照片等现成素材时还需留意来源与使用许可。','Collage intersects with Cubism, Dada and other modern practices and is also widespread in illustration, books and everyday craft. This entry focuses on paper material and composition rather than treating all cut-and-paste images as one movement. Found publications and photos require attention to source and reuse permissions.'],
      why: ['边缘直接显示形状如何被制造，叠压则建立前后关系。不同纸面带来不同光泽与触感，小阴影可以说明层数，但不应靠夸张投影掩盖构图。','Edges reveal how shapes were made, while overlap establishes depth. Paper surfaces differ in sheen and texture; small shadows can indicate layers but should not replace composition with exaggerated effects.'],
      anchor: ['每一道边缘都是一次选择，每一层覆盖都改变故事。','Every edge is a choice, and every overlap changes the story.'],
      tags: [['剪撕边缘','材料叠层','碎片重组'],['Cut and torn edges','Material layers','Reassembled fragments']],
      people: [['乔治·布拉克','库尔特·施维特斯','纸艺插画与出版实践者'],['Georges Braque','Kurt Schwitters','Paper illustrators and publication makers']],
      observe: [
        ['edge','看边缘','Read the edges','剪出的边干净，撕出的边带纤维，二者会给同一形状不同语气。','Cut edges are clean and torn edges fibrous, giving the same form a different tone.'],
        ['layer','看叠压','Read overlap','沿覆盖关系判断前后，注意一块小纸如何遮断或接续另一块。','Follow overlaps to read depth and how one small piece interrupts or continues another.'],
        ['material','看材料差异','Read material differences','纸张颜色、厚薄和表面印迹可以承担叙事，不只提供统一的纸纹滤镜。','Paper color, thickness and existing marks can carry narrative instead of supplying one uniform texture filter.']
      ],
      profile: [[3,'碎片重新组织','Reorganized fragments'],[4,'纸色并置','Juxtaposed paper colors'],[3,'边缘与肌理可见','Visible edges and texture'],[4,'亲切而有实验感','Approachable and experimental']],
      words: [['层叠','触感','轻快','重组'],['Layered','Tactile','Playful','Reassembled']],
      life: [
        ['空间草图','Room sketches','用不同纸块快速测试家具位置，让移动碎片替代反复擦改。','Test furniture placement with movable paper pieces instead of repeatedly erasing a drawing.'],
        ['穿搭配色','Outfit palettes','把布料颜色近似成几块纸，调整面积比例而不只选择色号。','Approximate clothing colors with paper pieces and adjust their proportions, not just their hue.'],
        ['摄影','Photography','用侧光记录真实纸边与层次，不把数字投影当作材料存在的证明。','Use side light to record real edges and layers without treating digital shadows as proof of physical material.'],
        ['手账与卡片','Journals and cards','保留一小块票据或包装作为记忆线索，公开分享前遮住个人信息。','Keep a small ticket or package fragment as a memory cue, hiding personal information before sharing.']
      ],
      comparisons: [
        ['matisse','都能通过剪出的色形建立节奏。','Both can build rhythm through cut colored shapes.','马蒂斯式色块强调特定艺术家的形色探索；纸艺拼贴是更广的方法，可包含文字、照片和多种纸材。','Matisse’s color shapes refer to one artist’s exploration; paper collage is a broader method that can include text, photos and varied paper.'],
        ['dada','都可以把原本分离的碎片重新组合。','Both can recombine fragments from separate contexts.','达达有特定历史与反艺术立场，常利用冲突与荒诞；纸艺拼贴本身不必持有这些立场。','Dada has a particular history and anti-art position, often using conflict and absurdity; paper collage need not share those positions.']
      ],
      reflection: ['如果把所有纸张换成同一种光滑材质，这幅拼贴会失去哪些信息与情绪？','If every fragment became the same smooth material, which information and feelings would the collage lose?'],
      sources: [['Tate · Collage','https://www.tate.org.uk/art/art-terms/c/collage']]
    }
  ];

  const {refinedStyles, rawStyles} = window.STYLE_ATLAS_DATA;
  const movements = new Set(['bauhaus','art-deco','art-nouveau','constructivism','de-stijl','futurism','minimalism','memphis','renaissance','baroque','rococo','neoclassicism','romanticism','realism','pre-raphaelite','impressionism','post-impressionism','expressionism','german-expressionism','surrealism','symbolism','fauvism','dada','abstract-expressionism','color-field-painting','op-art','conceptual-art','mexican-muralism']);
  const techniques = new Set(['gongbi','xieyi','chinese-ink-painting','sumi-e','chinese-new-year-woodblock']);
  for (const [id] of rawStyles) {
    refinedStyles[id] = {...refinedStyles[id], entryType: movements.has(id) ? 'movement' : techniques.has(id) ? 'technique' : 'language'};
  }
  for (const entry of entries) {
    const row = rawStyles.find(([id]) => id === entry.id);
    const observations = entry.observe.map(([key, zhLabel, enLabel, zhText, enText]) => ({key, label: bi([zhLabel,enLabel]), text: bi([zhText,enText])}));
    const comparisons = entry.comparisons.map(([styleId, sz, se, dz, de]) => ({styleId, similarity: bi([sz,se]), difference: bi([dz,de])}));
    const sources = entry.sources.map(([title,url]) => ({title,url}));
    refinedStyles[entry.id] = {
      entryType: entry.type,
      imageProvenance: 'ai-teaching-illustration',
      sources,
      subtitle: bi(entry.tags.map(tags => tags.join(' / '))),
      summary: bi(entry.summary), history: bi(entry.history), why: bi(entry.why), memoryAnchor: bi(entry.anchor),
      curatorNote: bi(['先从这三个线索看起：' + entry.observe.map(item => item[3]).join(''), 'Begin with three clues: ' + entry.observe.map(item => item[4]).join(' ')]),
      people: bi(entry.people), wikiTitles: [row[1], ...entry.people[1]],
      lookFor: bi([entry.observe.map(item=>item[3]),entry.observe.map(item=>item[4])]),
      references: bi([entry.sources.map(([title])=>`历史与工艺参考：${title}。封面示意图不是馆藏原作。`),entry.sources.map(([title])=>`Historical and process reference: ${title}. The teaching cover is not a collection object.`)]),
      visualFeatures: bi(entry.tags), tags: bi(entry.tags),
      useCases: bi([entry.life.map(item=>item[0]),entry.life.map(item=>item[1])]),
      searchAliases: [...entry.tags[0],...entry.tags[1],...entry.people[0],...entry.people[1]],
      relatedStyles: comparisons.map(item=>item.styleId),
      imagePrompts: bi([`制作一张用于学习${row[2]}视觉语言的原创图像。重点：${entry.tags[0].join('、')}。${entry.observe.map(item=>item[3]).join('')}完整构图，不复制馆藏原作，不添加伪造签名或印章。`, `Create an original educational image exploring ${row[1]}. Focus on ${entry.tags[1].join(', ')}. ${entry.observe.map(item=>item[4]).join(' ')} Complete composition; do not copy a collection object or add fabricated signatures or seals.`]),
      negativePrompt: bi(['避免把示意图冒充历史原作、复制具体作品、伪造签名或印章，以及用统一滤镜代替材料与构图逻辑。','Avoid presenting illustrations as historical originals, copying specific works, fabricated signatures or seals, and replacing material or compositional logic with a generic filter.'])
    };
    window.STYLE_AESTHETIC_GUIDES[entry.id] = {
      openingQuestion: bi(entry.reflection), observe: observations,
      profile: Object.fromEntries(['order','color','ornament','emotion'].map((key,index)=>[key,{level:entry.profile[index][0],zh:entry.profile[index][1],en:entry.profile[index][2]}])),
      feelingWords: bi(entry.words),
      everydayLife: entry.life.map(([sz,se,tz,te])=>({scene:bi([sz,se]),text:bi([tz,te])})),
      comparisons, reflectionPrompt: bi(entry.reflection)
    };
  }
})();
