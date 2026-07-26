import crypto from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselinePath = path.join(root, "scripts", "aesthetic-guide-audit-baseline.json");
const auditPath = path.join(root, "docs", "qa", "aesthetic-guide-corpus-audit-v1.3.md");
const signoffPath = path.join(root, "docs", "review", "v1.3-product-owner-signoff.md");
const checkOnly = process.argv.includes("--check");

const signoffStyleIds = [
  "swiss-style", "art-deco", "impressionism", "van-gogh",
  "chinese-ink-painting", "ukiyo-e", "dunhuang-mural", "islamic-geometric",
  "african-tribal-pattern", "mexican-muralism", "editorial-illustration", "solarpunk",
  "bauhaus", "baroque", "shanshui", "sumi-e", "indian-miniature", "madhubani",
  "aboriginal-dot-painting", "chinese-new-year-woodblock",
  "renaissance", "rococo", "pre-raphaelite", "picasso-cubism",
  "gustav-klimt", "kandinsky", "rothko", "dada",
  "futurism", "punk-diy", "psychedelic-poster", "corporate-modernism",
  "anti-design", "conceptual-art", "pollock", "basquiat"
];

const culturalReview = {
  "dunhuang-mural": {
    status: "SPECIALIST REVIEW RECOMMENDED",
    note: "Buddhist cave murals carry site, devotional and conservation contexts; keep Everyday prompts observational and avoid extracting sacred figures as decoration."
  },
  "islamic-geometric": {
    status: "SPECIALIST REVIEW RECOMMENDED",
    note: "Geometric practices vary across regions, periods and religious or secular settings; geometry is not a universal dictionary of Islamic belief."
  },
  "african-tribal-pattern": {
    status: "SPECIALIST REVIEW RECOMMENDED",
    note: "The retained styleId is broader than the guide's West African textile focus; do not collapse a continent or copy community- and status-specific cloth motifs."
  },
  "aboriginal-dot-painting": {
    status: "SPECIALIST REVIEW RECOMMENDED",
    note: "Australian First Nations cultural and intellectual property, Country, community authority and restricted knowledge make context-free copying inappropriate."
  },
  "indian-miniature": {
    status: "SPECIALIST REVIEW RECOMMENDED",
    note: "The category contains Mughal, Rajasthani, Pahari and other courtly, religious and secular contexts; it is not one uniform Indian look."
  },
  madhubani: {
    status: "SPECIALIST REVIEW RECOMMENDED",
    note: "Mithila practices vary by community, maker, ritual setting, wall or paper support and contemporary use; avoid treating them as generic bright folk decoration."
  },
  "chinese-new-year-woodblock": {
    status: "AUTHOR PASS",
    note: "The guide preserves regional workshop and seasonal-use variation and does not assign one fixed meaning to every color, animal or object."
  },
  futurism: {
    status: "SOURCE-BACKED PASS",
    note: "The guide names the movement's links to nationalism, war rhetoric and later Fascism without celebrating them."
  },
  basquiat: {
    status: "SOURCE-BACKED PASS",
    note: "The guide keeps Black history, Haitian and Puerto Rican family background, New York and art-market context visible and rejects a fixed symbol dictionary."
  },
  "mexican-muralism": {
    status: "AUTHOR PASS",
    note: "The guide treats public scale, social history and political address as context rather than reducing Mexican Muralism to colorful wall decoration."
  }
};

const signoffNotes = {
  "swiss-style": "Treat neutrality and grid order as designed choices, not universal or culturally neutral rules.",
  "art-deco": "Keep machine-age geometry, luxury materials and varied international contexts distinct from a generic premium look.",
  impressionism: "Impressionism is a varied movement, not a synonym for Monet or an all-purpose soft-focus effect.",
  "van-gogh": "Avoid reducing the work to mental illness, tortured-genius mythology or one swirling motif.",
  "chinese-ink-painting": "This is a broad field of media and traditions, not one timeless monochrome national style.",
  "ukiyo-e": "Keep the urban publishing, woodblock production and historical subject context distinct from Japanese art as a whole.",
  "dunhuang-mural": culturalReview["dunhuang-mural"].note,
  "islamic-geometric": culturalReview["islamic-geometric"].note,
  "african-tribal-pattern": culturalReview["african-tribal-pattern"].note,
  "mexican-muralism": culturalReview["mexican-muralism"].note,
  "editorial-illustration": "This is a broad publishing practice; do not imply one fixed visual treatment or political position.",
  solarpunk: "Treat Solarpunk as plural speculative and community practices, not a guaranteed technological future.",
  bauhaus: "Do not reduce a complex school and its workshops to primary colors and circles.",
  baroque: "Sacred, courtly and civic drama should not be flattened into surface luxury.",
  shanshui: "Shanshui is not generic monochrome mountain decoration; path, viewpoint and cultivated landscape traditions matter.",
  "sumi-e": "Acknowledge exchange with Chinese ink traditions without presenting the fields as interchangeable.",
  "indian-miniature": culturalReview["indian-miniature"].note,
  madhubani: culturalReview.madhubani.note,
  "aboriginal-dot-painting": culturalReview["aboriginal-dot-painting"].note,
  "chinese-new-year-woodblock": culturalReview["chinese-new-year-woodblock"].note,
  renaissance: "Keep regional and workshop variation visible; linear perspective and anatomy do not define every Renaissance work.",
  rococo: "Do not reduce the field to pastel luxury; intimate scale, ornament, leisure and social distance all require context.",
  "pre-raphaelite": "Avoid equating meticulous surfaces and medieval subjects with a universal ideal of beauty.",
  "picasso-cubism": "Picasso was one Cubist participant; Cubism is not a synonym for distorted faces.",
  "gustav-klimt": "Keep the sitter's agency and modern painting context distinct from Byzantine devotional function.",
  kandinsky: "Music is an analogy for rhythm and relation, not a fixed color-to-sound dictionary.",
  rothko: "Do not promise a universal spiritual, tragic or therapeutic response.",
  dada: "War, language, authority and institutions matter; Dada is not random mischief.",
  futurism: culturalReview.futurism.note,
  "punk-diy": "Keep low-cost self-publishing, community circulation and political context distinct from generic distressed styling.",
  "psychedelic-poster": "Keep live-music and counterculture context without romanticizing or instructing drug use.",
  "corporate-modernism": "Show reproducibility and institutional authority together; do not present it as a recipe for premium taste.",
  "anti-design": "Describe deliberate rule conflict, not careless work or proof that design has no constraints.",
  "conceptual-art": "Concept, instruction, record and institutional context matter; avoid the shortcut that anything is automatically art.",
  pollock: "Separate one artist from Abstract Expressionism as a whole and avoid the troubled-genius myth.",
  basquiat: culturalReview.basquiat.note
};

const riskTerms = {
  zh: ["高级", "精致", "大师感", "艺术感", "视觉冲击", "最好", "更美", "固定象征", "一定代表", "所有人都会感到"],
  en: ["premium", "refined", "masterpiece feel", "artistic feel", "visual impact", "best", "more beautiful", "fixed symbol", "always represents", "everyone will feel"]
};

const everydayPatterns = {
  zh: ["用少量颜色", "注意留白", "用清楚轮廓", "寻找建筑线条", "避免堆叠图案"],
  en: ["use a few colors", "notice blank space", "use clear outlines", "look for architectural lines", "avoid stacking patterns"]
};

function sha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalize(value, lang) {
  const normalized = String(value || "").normalize("NFKC").toLowerCase();
  if (lang === "zh") {
    return normalized.replace(/[\p{P}\p{S}\s]/gu, "");
  }
  return normalized.replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");
}

function tokens(value, lang) {
  const normalized = normalize(value, lang);
  if (lang === "zh") {
    return Array.from({ length: Math.max(0, normalized.length - 1) }, (_, index) => normalized.slice(index, index + 2));
  }
  return normalized.split(" ").filter(Boolean);
}

function dice(left, right, lang) {
  const leftTokens = tokens(left, lang);
  const rightTokens = tokens(right, lang);
  if (!leftTokens.length || !rightTokens.length) return 0;
  const counts = new Map();
  leftTokens.forEach((token) => counts.set(token, (counts.get(token) || 0) + 1));
  let overlap = 0;
  rightTokens.forEach((token) => {
    const count = counts.get(token) || 0;
    if (count > 0) {
      overlap += 1;
      counts.set(token, count - 1);
    }
  });
  return (2 * overlap) / (leftTokens.length + rightTokens.length);
}

function loadScript(source, context) {
  vm.runInNewContext(source, context, { filename: "Style Atlas data" });
}

function collectPairs(guides) {
  const pairs = [];
  const add = (styleId, field, value) => {
    if (value?.zh && value?.en) pairs.push({ styleId, field, zh: value.zh, en: value.en });
  };
  for (const [styleId, guide] of Object.entries(guides)) {
    add(styleId, "openingQuestion", guide.openingQuestion);
    guide.observe.forEach((item, index) => {
      add(styleId, `observe[${index}].label`, item.label);
      add(styleId, `observe[${index}].text`, item.text);
    });
    guide.everydayLife.forEach((item, index) => add(styleId, `everydayLife[${index}].text`, item.text));
    guide.comparisons.forEach((item, index) => {
      add(styleId, `comparisons[${index}].similarity`, item.similarity);
      add(styleId, `comparisons[${index}].difference`, item.difference);
    });
    add(styleId, "reflectionPrompt", guide.reflectionPrompt);
  }
  return pairs;
}

function fieldType(field) {
  return field.replace(/\[\d+\]/g, "[]");
}

function duplicateGroups(records, lang) {
  const groups = new Map();
  for (const record of records) {
    const key = `${fieldType(record.field)}\u0000${normalize(record[lang], lang)}`;
    const group = groups.get(key) || [];
    group.push(`${record.styleId}.${record.field}`);
    groups.set(key, group);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

function similarPairs(records, lang, threshold = 0.72) {
  const results = [];
  for (let leftIndex = 0; leftIndex < records.length; leftIndex += 1) {
    const left = records[leftIndex];
    for (let rightIndex = leftIndex + 1; rightIndex < records.length; rightIndex += 1) {
      const right = records[rightIndex];
      if (left.styleId === right.styleId || fieldType(left.field) !== fieldType(right.field)) continue;
      const score = dice(left[lang], right[lang], lang);
      if (score >= threshold && normalize(left[lang], lang) !== normalize(right[lang], lang)) {
        results.push({
          left: `${left.styleId}.${left.field}`,
          right: `${right.styleId}.${right.field}`,
          score
        });
      }
    }
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 30);
}

function frequentPrefixes(records, lang) {
  const groups = new Map();
  for (const record of records) {
    const normalized = normalize(record[lang], lang);
    const prefix = lang === "zh" ? normalized.slice(0, 4) : normalized.split(" ").slice(0, 3).join(" ");
    if (!prefix) continue;
    const key = `${fieldType(record.field)}\u0000${prefix}`;
    const entry = groups.get(key) || { field: fieldType(record.field), prefix, paths: [] };
    entry.paths.push(`${record.styleId}.${record.field}`);
    groups.set(key, entry);
  }
  return [...groups.values()].filter((entry) => entry.paths.length >= 3).sort((a, b) => b.paths.length - a.paths.length);
}

function lengthHints(pairs) {
  const hints = [];
  for (const pair of pairs) {
    const type = fieldType(pair.field);
    const zhLength = normalize(pair.zh, "zh").length;
    const enWords = tokens(pair.en, "en").length;
    let reason = "";
    if (type === "openingQuestion" && (zhLength < 15 || zhLength > 60 || enWords < 8 || enWords > 30)) {
      reason = "openingQuestion length";
    } else if (type === "observe[].text" && (zhLength > 90 || enWords > 38)) {
      reason = "observe length";
    } else if (type === "everydayLife[].text" && (zhLength > 95 || enWords > 42)) {
      reason = "Everyday length";
    } else if (type === "comparisons[].difference" && (zhLength > 110 || enWords > 50)) {
      reason = "comparison difference length";
    }
    if (reason) hints.push({ path: `${pair.styleId}.${pair.field}`, zhLength, enWords, reason });

    if (zhLength >= 12 && enWords >= 4) {
      const ratio = enWords / zhLength;
      if (ratio < 0.22 || ratio > 0.78) {
        hints.push({ path: `${pair.styleId}.${pair.field}`, zhLength, enWords, reason: "bilingual information ratio" });
      }
    }
  }
  return hints;
}

function profileAnalysis(guides) {
  const dimensions = ["order", "color", "ornament", "emotion"];
  const distributions = Object.fromEntries(dimensions.map((dimension) => [
    dimension,
    Object.fromEntries([1, 2, 3, 4, 5].map((level) => [level, 0]))
  ]));
  const vectors = new Map();
  const calibrationHints = [];
  const lowWithStrong = /很强|极强|高度|浓郁|丰富|强烈|饱和|very strong|very high|high |rich|intense|saturated/i;
  const highWithLow = /很少|极少|较低|克制|低装饰|very low|low |restrained/i;

  for (const [styleId, guide] of Object.entries(guides)) {
    const vector = dimensions.map((dimension) => guide.profile[dimension].level);
    const key = vector.join("-");
    const ids = vectors.get(key) || [];
    ids.push(styleId);
    vectors.set(key, ids);
    dimensions.forEach((dimension) => {
      const trait = guide.profile[dimension];
      distributions[dimension][trait.level] += 1;
      const copy = `${trait.zh} ${trait.en}`;
      if ((trait.level <= 2 && lowWithStrong.test(copy)) || (trait.level >= 4 && highWithLow.test(copy))) {
        calibrationHints.push(`${styleId}.${dimension} level ${trait.level}: ${trait.zh} / ${trait.en}`);
      }
    });
  }

  return {
    distributions,
    duplicateVectors: [...vectors.entries()]
      .filter(([, ids]) => ids.length > 1)
      .sort((a, b) => b[1].length - a[1].length),
    calibrationHints
  };
}

function comparisonAnalysis(guides, styleIds) {
  const validIds = new Set(styleIds);
  const enhancedIds = new Set(Object.keys(guides));
  const invalid = [];
  const self = [];
  const duplicates = [];
  const inbound = Object.fromEntries(styleIds.map((id) => [id, 0]));
  const artistIds = new Set(["van-gogh", "monet", "cezanne", "matisse", "picasso-cubism", "dali", "magritte", "edward-hopper", "gustav-klimt", "kandinsky", "mondrian", "pollock", "rothko", "basquiat"]);
  const artistMovementPairs = [];

  for (const [styleId, guide] of Object.entries(guides)) {
    const seen = new Set();
    guide.comparisons.forEach((comparison, index) => {
      const target = comparison.styleId;
      if (!validIds.has(target)) invalid.push(`${styleId}.comparisons[${index}] -> ${target}`);
      if (target === styleId) self.push(`${styleId}.comparisons[${index}]`);
      if (seen.has(target)) duplicates.push(`${styleId} -> ${target}`);
      seen.add(target);
      if (target in inbound) inbound[target] += 1;
      if (artistIds.has(styleId) !== artistIds.has(target) && (artistIds.has(styleId) || artistIds.has(target))) {
        artistMovementPairs.push(`${styleId} -> ${target}`);
      }
    });
  }

  return {
    invalid,
    self,
    duplicates,
    concentrated: Object.entries(inbound).filter(([, count]) => count >= 5).sort((a, b) => b[1] - a[1]),
    unreferencedEnhanced: [...enhancedIds].filter((id) => inbound[id] === 0),
    artistMovementPairs
  };
}

function phraseMatches(guides, phrases) {
  const matches = [];
  for (const [styleId, guide] of Object.entries(guides)) {
    for (const lang of ["zh", "en"]) {
      const serialized = JSON.stringify(guide).toLowerCase();
      for (const phrase of phrases[lang]) {
        if (serialized.includes(phrase.toLowerCase())) matches.push(`${styleId} [${lang}] "${phrase}"`);
      }
    }
  }
  return matches;
}

function everydayPhraseMatches(guides) {
  const matches = [];
  for (const [styleId, guide] of Object.entries(guides)) {
    for (const lang of ["zh", "en"]) {
      const serialized = guide.everydayLife.map((item) => item.text[lang]).join("\n").toLowerCase();
      for (const phrase of everydayPatterns[lang]) {
        if (serialized.includes(phrase.toLowerCase())) matches.push(`${styleId} [${lang}] "${phrase}"`);
      }
    }
  }
  return matches;
}

function markdownList(items, render = (item) => String(item)) {
  return items.length ? items.map((item) => `- ${render(item)}`).join("\n") : "- None";
}

function escapeTable(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function buildAuditReport({
  guides,
  styles,
  baseline,
  actualChangedIds,
  unapprovedChangedIds,
  pairs,
  exactZh,
  exactEn,
  similarZh,
  similarEn,
  prefixesZh,
  prefixesEn,
  lengths,
  profile,
  comparison,
  everydayMatches,
  everydaySimilarZh,
  everydaySimilarEn,
  risks
}) {
  const posterIds = styles.filter((style) => style[3] === "poster").map((style) => style[0]);
  const posterComplete = posterIds.filter((id) => guides[id]).length;
  const topSimilar = (item) => `${item.score.toFixed(3)}: \`${item.left}\` / \`${item.right}\``;
  const prefixLine = (item) => `\`${item.field}\` starts with "${item.prefix}" in ${item.paths.length} entries: ${item.paths.map((itemPath) => `\`${itemPath}\``).join(", ")}`;
  const profileRows = ["order", "color", "ornament", "emotion"]
    .map((dimension) => `| ${dimension} | ${[1, 2, 3, 4, 5].map((level) => profile.distributions[dimension][level]).join(" | ")} |`)
    .join("\n");
  const highDimensions = ["order", "color", "ornament", "emotion"].map((dimension) => {
    const levels = profile.distributions[dimension];
    const high = levels[4] + levels[5];
    return `\`${dimension}\`: ${high}/72 (${((high / 72) * 100).toFixed(1)}%) at level 4-5`;
  });
  const sensitiveRows = Object.entries(culturalReview)
    .map(([styleId, review]) => `| \`${styleId}\` | ${review.status} | ${escapeTable(review.note)} |`)
    .join("\n");

  return `# Aesthetic Guide Corpus Audit V1.3

## Audit Scope

- Branch: \`feature/v1.3-editorial-audit\`
- Frozen base commit: \`${baseline.baseCommit}\`
- Enhanced guides: ${Object.keys(guides).length}
- Fallback styles: ${styles.length - Object.keys(guides).length}
- Poster enhanced coverage: ${posterComplete} / ${posterIds.length}
- Approved revision records: ${baseline.approvedRevisions.length}
- Guide objects changed from frozen fingerprints: ${actualChangedIds.length}
- Method: deterministic structural checks plus similarity and wording heuristics; warnings require human judgment and do not trigger automatic rewrites.

## Blocking Consistency Checks

| Check | Result |
| --- | --- |
| Guide count = ${baseline.guideCount} | ${Object.keys(guides).length === baseline.guideCount ? "PASS" : "FAIL"} |
| Fallback count = ${baseline.fallbackCount} | ${styles.length - Object.keys(guides).length === baseline.fallbackCount ? "PASS" : "FAIL"} |
| Poster coverage = ${baseline.posterComplete} / ${posterIds.length} | ${posterComplete === baseline.posterComplete ? "PASS" : "FAIL"} |
| Exact duplicate openingQuestion | ${[...exactZh.filter((group) => group[0].includes("openingQuestion")), ...exactEn.filter((group) => group[0].includes("openingQuestion"))].length === 0 ? "PASS, none" : "FAIL"} |
| Exact duplicate observe body | ${[...exactZh.filter((group) => group[0].includes("observe") && group[0].includes(".text")), ...exactEn.filter((group) => group[0].includes("observe") && group[0].includes(".text"))].length === 0 ? "PASS, none" : "FAIL"} |
| Invalid comparison styleId | ${comparison.invalid.length === 0 ? "PASS, none" : "FAIL"} |
| Self comparison | ${comparison.self.length === 0 ? "PASS, none" : "FAIL"} |
| Unrecorded fingerprint changes | ${unapprovedChangedIds.length === 0 ? "PASS, none" : "FAIL"} |

## Duplicate And Template Heuristics

Exact Chinese duplicate groups:

${markdownList(exactZh, (group) => group.map((item) => `\`${item}\``).join(", "))}

Exact English duplicate groups:

${markdownList(exactEn, (group) => group.map((item) => `\`${item}\``).join(", "))}

High-similarity Chinese pairs (Dice score >= 0.72, top 30):

${markdownList(similarZh, topSimilar)}

High-similarity English pairs (Dice score >= 0.72, top 30):

${markdownList(similarEn, topSimilar)}

Frequent Chinese openings (same field type, prefix used at least 3 times):

${markdownList(prefixesZh, prefixLine)}

Frequent English openings (same field type, prefix used at least 3 times):

${markdownList(prefixesEn, prefixLine)}

Interpretation: high similarity and frequent openings are review queues, not proof of template replacement. No content was auto-edited.

## Length And Bilingual Balance Hints

Thresholds are deliberately advisory: openingQuestion zh 15-60 characters or en 8-30 words; observe zh <= 90 or en <= 38; Everyday zh <= 95 or en <= 42; comparison difference zh <= 110 or en <= 50. Bilingual information-ratio hints flag only broad outliers.

${markdownList(lengths, (item) => `\`${item.path}\`: ${item.reason}; zh=${item.zhLength} characters, en=${item.enWords} words`)}

## Profile Calibration

| Dimension | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
${profileRows}

Level 4-5 concentration:

${markdownList(highDimensions)}

Repeated Profile vectors:

${markdownList(profile.duplicateVectors, ([vector, ids]) => `\`${vector}\` (${ids.length}): ${ids.map((id) => `\`${id}\``).join(", ")}`)}

Possible wording/level contradictions (heuristic only):

${markdownList(profile.calibrationHints)}

No level was changed to make the distribution look more even.

## Comparison Graph

- Invalid styleId: ${comparison.invalid.length}
- Self comparison: ${comparison.self.length}
- Duplicate target within one Guide: ${comparison.duplicates.length}

Highly referenced targets (5 or more inbound links):

${markdownList(comparison.concentrated, ([id, count]) => `\`${id}\`: ${count}`)}

Enhanced Guides with no inbound comparison:

${markdownList(comparison.unreferencedEnhanced, (id) => `\`${id}\``)}

Artist-to-movement or movement-to-artist pairs requiring manual distinction:

${markdownList(comparison.artistMovementPairs, (item) => `\`${item}\``)}

The graph does not require reciprocal links. The artist/movement list is a semantic review queue, not an error list.

## Everyday Repetition

Requested phrase scan:

${markdownList(everydayMatches)}

High-similarity Chinese Everyday pairs:

${markdownList(everydaySimilarZh, topSimilar)}

High-similarity English Everyday pairs:

${markdownList(everydaySimilarEn, topSimilar)}

These results require reading the full scenes before deciding whether the action is merely an adjective substitution.

## Risk Wording

Keyword matches:

${markdownList(risks)}

Keywords are reported in context for human judgment. Negation, critique and historical description are not automatically removed.

## Chinese Corpus Assessment

- No exact duplicate openingQuestion or observe body is present.
- Repeated sequencing words such as "先看", "再看" and "最后" are expected in Guided Looking, but the high-frequency list should be sampled for template feel.
- The audit found no structural reason to rewrite the corpus for tone consistency.

## English Corpus Assessment

- No exact duplicate openingQuestion or observe body is present.
- Repeated guide verbs are visible in the prefix report; their surrounding objects and viewing actions must be reviewed before treating them as mechanical translation.
- The audit found no structural reason to rewrite the corpus for tone consistency.

## Cultural And Historical Priority Review

| styleId | Internal status | Review note |
| --- | --- | --- |
${sensitiveRows}

\`SPECIALIST REVIEW RECOMMENDED\` is a recommendation, not a claim that an independent expert has reviewed the page.

## Content Freeze And Change Control

- Frozen fingerprint count: ${Object.keys(baseline.fingerprints).length}
- Current fingerprint count: ${Object.keys(guides).length}
- Changed styleIds: ${actualChangedIds.length ? actualChangedIds.map((id) => `\`${id}\``).join(", ") : "None"}
- Approved revision records: ${baseline.approvedRevisions.length ? baseline.approvedRevisions.map((item) => `\`${item.styleId}.${item.field}\``).join(", ") : "None"}
- Unapproved Guide objects remain byte-for-byte equivalent at the object JSON level: ${unapprovedChangedIds.length === 0 ? "PASS" : "FAIL"}

Approved revision details:

${markdownList(baseline.approvedRevisions, (item) => `\`${item.styleId}.${item.field}\`: ${item.issue} Reason: ${item.reason} Before: ${item.before}. After: ${item.after}. Source: ${item.source}.`)}

## Release Candidate Gate

- Automated corpus audit: ${unapprovedChangedIds.length === 0 && comparison.invalid.length === 0 && comparison.self.length === 0 ? "PASS" : "FAIL"}
- Product-owner signoff: PENDING, 0 / 36 inspected
- BLOCKED known from product-owner review: 0, but review has not started
- Ready for V1.3 Release Candidate: NO
- Reason: all 36 signoff entries must be inspected by the product owner before the gate can become YES.
- D4 recommended now: NO
`;
}

function buildSignoffDocument(guides) {
  const previewBase = "https://style-atlas.wonderelian.com/preview/v1.3/";
  const sections = signoffStyleIds.map((styleId, index) => {
    const guide = guides[styleId];
    const profile = ["order", "color", "ornament", "emotion"]
      .map((dimension) => {
        const item = guide.profile[dimension];
        return `\`${dimension}\` ${item.level}/5: ${item.zh} / ${item.en}`;
      })
      .join("; ");
    const observeTitles = guide.observe
      .map((item, observeIndex) => `${observeIndex + 1}. ${item.label.zh} / ${item.label.en}`)
      .join("; ");
    const comparisons = guide.comparisons.map((item) => `\`${item.styleId}\``).join(", ");
    const query = (lang) => `${previewBase}?review=detail&style=${styleId}&lang=${lang}&section=see`;
    return `## ${index + 1}. \`${styleId}\`

- Chinese Preview URL: [open Chinese page](${query("zh")})
- English Preview URL: [open English page](${query("en")})
- openingQuestion zh: ${guide.openingQuestion.zh}
- openingQuestion en: ${guide.openingQuestion.en}
- Three observe titles: ${observeTitles}
- Profile: ${profile}
- Comparison objects: ${comparisons}
- Cultural or historical note: ${signoffNotes[styleId]}
- Review status: NOT REVIEWED
- Modification feedback: Pending product-owner inspection.
`;
  }).join("\n");

  return `# V1.3 Product Owner Signoff

## Status Rules

- Allowed statuses: PASS, REVISE, SPECIALIST REVIEW, BLOCKED, NOT REVIEWED.
- No entry may be changed to PASS before the product owner opens both language URLs and checks the complete page.
- Current completion: 0 / 36.
- PASS: 0
- REVISE: 0
- SPECIALIST REVIEW: 0
- BLOCKED: 0
- NOT REVIEWED: 36

## Review Checklist

For every Chinese and English page, confirm:

1. The opening creates a reason to keep looking.
2. The three observations are materially different and visible in the image.
3. The voice accompanies looking rather than testing the reader.
4. Profile levels match the described feeling and do not read as quality scores.
5. Everyday scenes are concrete, non-commercial and do not invite cultural appropriation.
6. Comparisons explain the most useful distinction.
7. Reflection is natural and not repetitive.
8. Chinese avoids mechanical templates; English reads naturally.
9. Historical statements avoid absolutes.
10. Cultural pages avoid unified-region claims, decorative religion and fixed symbol dictionaries.

${sections}
`;
}

const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
const context = { window: {} };
loadScript(await readFile(path.join(root, "data-styles.js"), "utf8"), context);
loadScript(await readFile(path.join(root, "data-aesthetic-guides.js"), "utf8"), context);

const guides = context.window.STYLE_AESTHETIC_GUIDES;
const styles = context.window.STYLE_ATLAS_DATA.rawStyles;
const styleIds = styles.map((style) => style[0]);
const fingerprints = Object.fromEntries(Object.entries(guides).map(([id, guide]) => [id, sha256(guide)]));
const approvedIds = new Set(baseline.approvedRevisions.map((item) => item.styleId));
const actualChangedIds = Object.keys(fingerprints).filter((id) => fingerprints[id] !== baseline.fingerprints[id]);
const unapprovedChangedIds = actualChangedIds.filter((id) => !approvedIds.has(id));
const revisionIdsWithoutChanges = [...approvedIds].filter((id) => !actualChangedIds.includes(id));
const missingBaselineIds = Object.keys(baseline.fingerprints).filter((id) => !fingerprints[id]);
const unexpectedIds = Object.keys(fingerprints).filter((id) => !baseline.fingerprints[id]);
const incompleteRevisionRecords = baseline.approvedRevisions.filter((item) => (
  !item.styleId || !item.field || !item.issue || !item.reason || !item.before || !item.after || !item.source
));

const pairs = collectPairs(guides);
const exactZh = duplicateGroups(pairs, "zh");
const exactEn = duplicateGroups(pairs, "en");
const similarZh = similarPairs(pairs, "zh");
const similarEn = similarPairs(pairs, "en");
const prefixesZh = frequentPrefixes(pairs, "zh");
const prefixesEn = frequentPrefixes(pairs, "en");
const lengths = lengthHints(pairs);
const profile = profileAnalysis(guides);
const comparison = comparisonAnalysis(guides, styleIds);
const everydayPairs = pairs.filter((pair) => fieldType(pair.field) === "everydayLife[].text");
const everydayMatches = everydayPhraseMatches(guides);
const everydaySimilarZh = similarPairs(everydayPairs, "zh");
const everydaySimilarEn = similarPairs(everydayPairs, "en");
const risks = phraseMatches(guides, riskTerms);

const exactOpening = [...exactZh, ...exactEn].filter((group) => group[0].includes("openingQuestion"));
const exactObserveBodies = [...exactZh, ...exactEn].filter((group) => group[0].includes("observe") && group[0].includes(".text"));
const posterIds = styles.filter((style) => style[3] === "poster").map((style) => style[0]);
const posterComplete = posterIds.filter((id) => guides[id]).length;
const blockers = [
  Object.keys(guides).length !== baseline.guideCount && `guide count is ${Object.keys(guides).length}`,
  styles.length - Object.keys(guides).length !== baseline.fallbackCount && `fallback count is ${styles.length - Object.keys(guides).length}`,
  posterComplete !== baseline.posterComplete && `poster coverage is ${posterComplete}/${posterIds.length}`,
  exactOpening.length > 0 && "exact duplicate openingQuestion",
  exactObserveBodies.length > 0 && "exact duplicate observe body",
  comparison.invalid.length > 0 && "invalid comparison styleId",
  comparison.self.length > 0 && "self comparison",
  unapprovedChangedIds.length > 0 && `unapproved fingerprint changes: ${unapprovedChangedIds.join(", ")}`,
  revisionIdsWithoutChanges.length > 0 && `revision records without fingerprint changes: ${revisionIdsWithoutChanges.join(", ")}`,
  missingBaselineIds.length > 0 && `missing baseline ids: ${missingBaselineIds.join(", ")}`,
  unexpectedIds.length > 0 && `unexpected guide ids: ${unexpectedIds.join(", ")}`,
  incompleteRevisionRecords.length > 0 && "incomplete approved revision records",
  signoffStyleIds.some((id) => !guides[id]) && "missing signoff style"
].filter(Boolean);

const auditReport = buildAuditReport({
  guides,
  styles,
  baseline,
  actualChangedIds,
  unapprovedChangedIds,
  pairs,
  exactZh,
  exactEn,
  similarZh,
  similarEn,
  prefixesZh,
  prefixesEn,
  lengths,
  profile,
  comparison,
  everydayMatches,
  everydaySimilarZh,
  everydaySimilarEn,
  risks
});
const signoffDocument = buildSignoffDocument(guides);

if (checkOnly) {
  const [storedAudit, storedSignoff] = await Promise.all([
    readFile(auditPath, "utf8"),
    readFile(signoffPath, "utf8")
  ]);
  if (storedAudit !== auditReport) blockers.push("corpus audit report is stale");
  if (storedSignoff !== signoffDocument) blockers.push("product-owner signoff document is stale");
} else {
  await mkdir(path.dirname(signoffPath), { recursive: true });
  await Promise.all([
    writeFile(auditPath, auditReport),
    writeFile(signoffPath, signoffDocument)
  ]);
}

if (blockers.length) {
  console.error(`Guide audit failed:\n${blockers.map((item) => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Guide audit passed: ${Object.keys(guides).length} enhanced, ${styles.length - Object.keys(guides).length} fallback, ${posterComplete}/${posterIds.length} poster.`);
  console.log(`Approved fingerprint changes: ${actualChangedIds.length}; unapproved changes: ${unapprovedChangedIds.length}.`);
  console.log(`${checkOnly ? "Verified" : "Generated"} ${path.relative(root, auditPath)} and ${path.relative(root, signoffPath)}.`);
}
