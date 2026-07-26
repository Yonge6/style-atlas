# Aesthetic Guide Corpus Audit V1.3

## Audit Scope

- Branch: `feature/v1.3-editorial-audit`
- Frozen base commit: `46ea2392dfbb07530162b70c7db099f7aea03978`
- Enhanced guides: 72
- Fallback styles: 48
- Poster enhanced coverage: 20 / 20
- Approved revision records: 1
- Guide objects changed from frozen fingerprints: 1
- Method: deterministic structural checks plus similarity and wording heuristics; warnings require human judgment and do not trigger automatic rewrites.

## Blocking Consistency Checks

| Check | Result |
| --- | --- |
| Guide count = 72 | PASS |
| Fallback count = 48 | PASS |
| Poster coverage = 20 / 20 | PASS |
| Exact duplicate openingQuestion | PASS, none |
| Exact duplicate observe body | PASS, none |
| Invalid comparison styleId | PASS, none |
| Self comparison | PASS, none |
| Unrecorded fingerprint changes | PASS, none |

## Duplicate And Template Heuristics

Exact Chinese duplicate groups:

- `chinese-new-year-woodblock.observe[2].label`, `nordic-folk-art.observe[2].label`
- `mondrian.observe[0].label`, `de-stijl.observe[0].label`
- `mondrian.observe[1].label`, `de-stijl.observe[1].label`

Exact English duplicate groups:

- `mondrian.observe[0].label`, `de-stijl.observe[0].label`

High-similarity Chinese pairs (Dice score >= 0.72, top 30):

- 0.800: `minimalism.observe[2].label` / `rococo.observe[2].label`
- 0.765: `new-wave-typography.comparisons[1].difference` / `experimental-typography.comparisons[0].difference`
- 0.750: `chinese-ink-painting.observe[0].label` / `minimalism.observe[0].label`

High-similarity English pairs (Dice score >= 0.72, top 30):

- 0.889: `constructivism.observe[2].label` / `minimalism.observe[2].label`
- 0.857: `matisse.observe[1].label` / `kinetic-poster.observe[2].label`
- 0.857: `kandinsky.comparisons[0].similarity` / `basquiat.comparisons[0].similarity`
- 0.857: `editorial-typography.observe[2].label` / `kinetic-poster.observe[2].label`
- 0.829: `new-wave-typography.comparisons[1].difference` / `experimental-typography.comparisons[0].difference`
- 0.824: `van-gogh.comparisons[1].similarity` / `fauvism.comparisons[1].similarity`
- 0.750: `swiss-style.observe[0].label` / `ukiyo-e.observe[0].label`
- 0.750: `swiss-style.observe[1].label` / `art-deco.observe[1].label`
- 0.750: `swiss-style.observe[1].label` / `ukiyo-e.observe[1].label`
- 0.750: `swiss-style.observe[1].label` / `mexican-muralism.observe[1].label`
- 0.750: `swiss-style.observe[1].label` / `editorial-illustration.observe[1].label`
- 0.750: `swiss-style.observe[2].label` / `art-deco.observe[2].label`
- 0.750: `swiss-style.observe[2].label` / `impressionism.observe[2].label`
- 0.750: `swiss-style.observe[2].label` / `chinese-ink-painting.observe[2].label`
- 0.750: `swiss-style.observe[2].label` / `african-tribal-pattern.observe[2].label`
- 0.750: `art-deco.observe[1].label` / `ukiyo-e.observe[1].label`
- 0.750: `art-deco.observe[1].label` / `mexican-muralism.observe[1].label`
- 0.750: `art-deco.observe[1].label` / `editorial-illustration.observe[1].label`
- 0.750: `art-deco.observe[2].label` / `impressionism.observe[2].label`
- 0.750: `art-deco.observe[2].label` / `chinese-ink-painting.observe[2].label`
- 0.750: `art-deco.observe[2].label` / `african-tribal-pattern.observe[2].label`
- 0.750: `impressionism.observe[1].label` / `dunhuang-mural.observe[1].label`
- 0.750: `impressionism.observe[1].label` / `african-tribal-pattern.observe[1].label`
- 0.750: `impressionism.observe[2].label` / `chinese-ink-painting.observe[2].label`
- 0.750: `impressionism.observe[2].label` / `african-tribal-pattern.observe[2].label`
- 0.750: `chinese-ink-painting.observe[2].label` / `african-tribal-pattern.observe[2].label`
- 0.750: `ukiyo-e.observe[1].label` / `mexican-muralism.observe[1].label`
- 0.750: `ukiyo-e.observe[1].label` / `editorial-illustration.observe[1].label`
- 0.750: `ukiyo-e.observe[2].label` / `mexican-muralism.observe[2].label`
- 0.750: `dunhuang-mural.observe[1].label` / `african-tribal-pattern.observe[1].label`

Frequent Chinese openings (same field type, prefix used at least 3 times):

- `comparisons[].similarity` starts with "都可能使" in 10 entries: `african-tribal-pattern.comparisons[1].similarity`, `surrealism.comparisons[0].similarity`, `gongbi.comparisons[1].similarity`, `sumi-e.comparisons[1].similarity`, `korean-minhwa.comparisons[0].similarity`, `madhubani.comparisons[1].similarity`, `pop-art-poster.comparisons[1].similarity`, `op-art.comparisons[1].similarity`, `conceptual-art.comparisons[0].similarity`, `edward-hopper.comparisons[1].similarity`
- `comparisons[].difference` starts with "swis" in 7 entries: `swiss-style.comparisons[0].difference`, `swiss-style.comparisons[1].difference`, `minimalism.comparisons[0].difference`, `brutalism.comparisons[0].difference`, `editorial-typography.comparisons[0].difference`, `corporate-modernism.comparisons[0].difference`, `anti-design.comparisons[0].difference`
- `observe[].label` starts with "最后感受" in 6 entries: `swiss-style.observe[2].label`, `impressionism.observe[2].label`, `van-gogh.observe[2].label`, `chinese-ink-painting.observe[2].label`, `islamic-geometric.observe[2].label`, `solarpunk.observe[2].label`
- `comparisons[].difference` starts with "dada" in 6 entries: `surrealism.comparisons[1].difference`, `dada.comparisons[0].difference`, `dada.comparisons[1].difference`, `punk-diy.comparisons[0].difference`, `pop-art-poster.comparisons[0].difference`, `conceptual-art.comparisons[0].difference`
- `comparisons[].difference` starts with "中国水墨" in 5 entries: `chinese-ink-painting.comparisons[0].difference`, `chinese-ink-painting.comparisons[1].difference`, `gongbi.comparisons[0].difference`, `shanshui.comparisons[0].difference`, `sumi-e.comparisons[0].difference`
- `reflectionPrompt` starts with "你喜欢它" in 4 entries: `swiss-style.reflectionPrompt`, `chinese-ink-painting.reflectionPrompt`, `memphis.reflectionPrompt`, `solarpunk.reflectionPrompt`
- `reflectionPrompt` starts with "你先感到" in 4 entries: `dunhuang-mural.reflectionPrompt`, `african-tribal-pattern.reflectionPrompt`, `bauhaus.reflectionPrompt`, `korean-minhwa.reflectionPrompt`
- `everydayLife[].text` starts with "正面拍摄" in 4 entries: `islamic-geometric.everydayLife[2].text`, `korean-minhwa.everydayLife[2].text`, `chinese-new-year-woodblock.everydayLife[2].text`, `mondrian.everydayLife[2].text`
- `comparisons[].difference` starts with "文艺复兴" in 4 entries: `baroque.comparisons[1].difference`, `renaissance.comparisons[0].difference`, `renaissance.comparisons[1].difference`, `neoclassicism.comparisons[0].difference`
- `comparisons[].difference` starts with "现实主义" in 4 entries: `romanticism.comparisons[0].difference`, `surrealism.comparisons[0].difference`, `realism.comparisons[0].difference`, `realism.comparisons[1].difference`
- `observe[].label` starts with "再看颜色" in 3 entries: `impressionism.observe[1].label`, `african-tribal-pattern.observe[1].label`, `bauhaus.observe[1].label`
- `openingQuestion` starts with "画面没有" in 3 entries: `chinese-ink-painting.openingQuestion`, `realism.openingQuestion`, `symbolism.openingQuestion`
- `observe[].label` starts with "先看重复" in 3 entries: `african-tribal-pattern.observe[0].label`, `futurism.observe[0].label`, `kinetic-poster.observe[0].label`
- `observe[].label` starts with "再看比例" in 3 entries: `constructivism.observe[1].label`, `minimalism.observe[1].label`, `surrealism.observe[1].label`
- `comparisons[].difference` starts with "浪漫主义" in 3 entries: `romanticism.comparisons[1].difference`, `pre-raphaelite.comparisons[0].difference`, `symbolism.comparisons[0].difference`
- `comparisons[].difference` starts with "opar" in 3 entries: `aboriginal-dot-painting.comparisons[0].difference`, `op-art.comparisons[0].difference`, `op-art.comparisons[1].difference`
- `comparisons[].difference` starts with "expr" in 3 entries: `kandinsky.comparisons[0].difference`, `expressionism.comparisons[1].difference`, `basquiat.comparisons[0].difference`
- `comparisons[].difference` starts with "dest" in 3 entries: `mondrian.comparisons[0].difference`, `de-stijl.comparisons[0].difference`, `de-stijl.comparisons[1].difference`
- `comparisons[].difference` starts with "poll" in 3 entries: `abstract-expressionism.comparisons[0].difference`, `pollock.comparisons[0].difference`, `pollock.comparisons[1].difference`
- `comparisons[].difference` starts with "futu" in 3 entries: `futurism.comparisons[0].difference`, `futurism.comparisons[1].difference`, `kinetic-poster.comparisons[0].difference`
- `comparisons[].difference` starts with "edit" in 3 entries: `editorial-typography.comparisons[1].difference`, `new-wave-typography.comparisons[0].difference`, `conceptual-art.comparisons[1].difference`
- `comparisons[].difference` starts with "neww" in 3 entries: `new-wave-typography.comparisons[1].difference`, `anti-design.comparisons[1].difference`, `experimental-typography.comparisons[0].difference`

Frequent English openings (same field type, prefix used at least 3 times):

- `comparisons[].similarity` starts with "both may use" in 14 entries: `african-tribal-pattern.comparisons[1].similarity`, `surrealism.comparisons[0].similarity`, `gongbi.comparisons[1].similarity`, `sumi-e.comparisons[1].similarity`, `nihonga.comparisons[0].similarity`, `korean-minhwa.comparisons[0].similarity`, `madhubani.comparisons[1].similarity`, `chinese-new-year-woodblock.comparisons[1].similarity`, `nordic-folk-art.comparisons[0].similarity`, `german-expressionism.comparisons[1].similarity`, `pop-art-poster.comparisons[1].similarity`, `op-art.comparisons[1].similarity`, `conceptual-art.comparisons[0].similarity`, `edward-hopper.comparisons[1].similarity`
- `observe[].label` starts with "begin with the" in 9 entries: `minimalism.observe[0].label`, `post-impressionism.observe[0].label`, `gongbi.observe[0].label`, `sumi-e.observe[0].label`, `chinese-new-year-woodblock.observe[0].label`, `academic-painting.observe[0].label`, `matisse.observe[0].label`, `abstract-expressionism.observe[0].label`, `conceptual-art.observe[0].label`
- `reflectionPrompt` starts with "do you enjoy" in 7 entries: `swiss-style.reflectionPrompt`, `impressionism.reflectionPrompt`, `chinese-ink-painting.reflectionPrompt`, `memphis.reflectionPrompt`, `solarpunk.reflectionPrompt`, `corporate-modernism.reflectionPrompt`, `op-art.reflectionPrompt`
- `observe[].label` starts with "then notice the" in 5 entries: `swiss-style.observe[1].label`, `art-deco.observe[1].label`, `ukiyo-e.observe[1].label`, `mexican-muralism.observe[1].label`, `editorial-illustration.observe[1].label`
- `observe[].label` starts with "finally notice the" in 5 entries: `swiss-style.observe[2].label`, `art-deco.observe[2].label`, `impressionism.observe[2].label`, `chinese-ink-painting.observe[2].label`, `african-tribal-pattern.observe[2].label`
- `reflectionPrompt` starts with "do you first" in 5 entries: `dunhuang-mural.reflectionPrompt`, `african-tribal-pattern.reflectionPrompt`, `bauhaus.reflectionPrompt`, `korean-minhwa.reflectionPrompt`, `pollock.reflectionPrompt`
- `observe[].label` starts with "first notice the" in 4 entries: `swiss-style.observe[0].label`, `chinese-ink-painting.observe[0].label`, `ukiyo-e.observe[0].label`, `dunhuang-mural.observe[0].label`
- `comparisons[].difference` starts with "chinese ink painting" in 4 entries: `chinese-ink-painting.comparisons[0].difference`, `gongbi.comparisons[0].difference`, `shanshui.comparisons[0].difference`, `sumi-e.comparisons[0].difference`
- `everydayLife[].text` starts with "notice how a" in 4 entries: `romanticism.everydayLife[0].text`, `conceptual-art.everydayLife[0].text`, `edward-hopper.everydayLife[0].text`, `pollock.everydayLife[0].text`
- `comparisons[].similarity` starts with "both rely on" in 4 entries: `gongbi.comparisons[0].similarity`, `sumi-e.comparisons[0].similarity`, `de-stijl.comparisons[0].similarity`, `editorial-typography.comparisons[0].similarity`
- `everydayLife[].text` starts with "attend to the" in 4 entries: `matisse.everydayLife[1].text`, `gustav-klimt.everydayLife[1].text`, `abstract-expressionism.everydayLife[1].text`, `color-field-painting.everydayLife[1].text`
- `reflectionPrompt` starts with "are you drawn" in 3 entries: `art-deco.reflectionPrompt`, `renaissance.reflectionPrompt`, `editorial-typography.reflectionPrompt`
- `comparisons[].similarity` starts with "both begin from" in 3 entries: `impressionism.comparisons[0].similarity`, `cezanne.comparisons[0].similarity`, `edward-hopper.comparisons[0].similarity`
- `everydayLife[].text` starts with "notice how mirrors" in 3 entries: `surrealism.everydayLife[0].text`, `dali.everydayLife[0].text`, `magritte.everydayLife[0].text`
- `reflectionPrompt` starts with "do you want" in 3 entries: `surrealism.reflectionPrompt`, `cezanne.reflectionPrompt`, `symbolism.reflectionPrompt`
- `everydayLife[].text` starts with "observe how a" in 3 entries: `shanshui.everydayLife[0].text`, `indian-miniature.everydayLife[0].text`, `madhubani.everydayLife[0].text`
- `comparisons[].similarity` starts with "both may show" in 3 entries: `korean-minhwa.comparisons[1].similarity`, `gustav-klimt.comparisons[1].similarity`, `punk-diy.comparisons[1].similarity`
- `comparisons[].difference` starts with "new wave typography" in 3 entries: `new-wave-typography.comparisons[1].difference`, `anti-design.comparisons[1].difference`, `experimental-typography.comparisons[0].difference`

Interpretation: high similarity and frequent openings are review queues, not proof of template replacement. No content was auto-edited.

## Length And Bilingual Balance Hints

Thresholds are deliberately advisory: openingQuestion zh 15-60 characters or en 8-30 words; observe zh <= 90 or en <= 38; Everyday zh <= 95 or en <= 42; comparison difference zh <= 110 or en <= 50. Bilingual information-ratio hints flag only broad outliers.

- `gongbi.comparisons[0].similarity`: bilingual information ratio; zh=14 characters, en=11 words
- `futurism.comparisons[1].similarity`: bilingual information ratio; zh=12 characters, en=11 words
- `experimental-typography.reflectionPrompt`: bilingual information ratio; zh=24 characters, en=19 words
- `kinetic-poster.observe[0].text`: bilingual information ratio; zh=27 characters, en=22 words
- `kinetic-poster.comparisons[1].similarity`: bilingual information ratio; zh=13 characters, en=11 words
- `edward-hopper.everydayLife[0].text`: bilingual information ratio; zh=27 characters, en=22 words

## Profile Calibration

| Dimension | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
| order | 2 | 12 | 17 | 26 | 15 |
| color | 4 | 11 | 17 | 25 | 15 |
| ornament | 18 | 14 | 16 | 12 | 12 |
| emotion | 0 | 8 | 20 | 25 | 19 |

Level 4-5 concentration:

- `order`: 41/72 (56.9%) at level 4-5
- `color`: 40/72 (55.6%) at level 4-5
- `ornament`: 24/72 (33.3%) at level 4-5
- `emotion`: 44/72 (61.1%) at level 4-5

Repeated Profile vectors:

- `4-4-5-4` (3): `dunhuang-mural`, `madhubani`, `gustav-klimt`
- `5-2-1-2` (2): `swiss-style`, `corporate-modernism`
- `4-4-4-3` (2): `ukiyo-e`, `nordic-folk-art`
- `3-4-3-5` (2): `romanticism`, `symbolism`
- `4-5-3-4` (2): `post-impressionism`, `pop-art-poster`
- `3-3-3-5` (2): `surrealism`, `dali`
- `4-4-4-4` (2): `korean-minhwa`, `pre-raphaelite`
- `4-2-2-3` (2): `picasso-cubism`, `editorial-typography`
- `5-3-1-2` (2): `mondrian`, `de-stijl`
- `2-5-1-5` (2): `expressionism`, `german-expressionism`
- `4-3-1-4` (2): `magritte`, `edward-hopper`

Possible wording/level contradictions (heuristic only):

- None

No level was changed to make the distribution look more even.

## Comparison Graph

- Invalid styleId: 0
- Self comparison: 0
- Duplicate target within one Guide: 0

Highly referenced targets (5 or more inbound links):

- `swiss-style`: 6
- `art-nouveau`: 6
- `bauhaus`: 5
- `romanticism`: 5
- `expressionism`: 5

Enhanced Guides with no inbound comparison:

- `dunhuang-mural`
- `islamic-geometric`
- `african-tribal-pattern`
- `memphis`
- `nordic-folk-art`
- `academic-painting`
- `matisse`
- `gustav-klimt`
- `kandinsky`
- `solarpunk`
- `corporate-modernism`
- `conceptual-art`
- `edward-hopper`
- `basquiat`

Artist-to-movement or movement-to-artist pairs requiring manual distinction:

- `impressionism -> monet`
- `van-gogh -> post-impressionism`
- `van-gogh -> expressionism`
- `post-impressionism -> van-gogh`
- `monet -> impressionism`
- `monet -> renoir`
- `cezanne -> post-impressionism`
- `matisse -> fauvism`
- `picasso-cubism -> constructivism`
- `gustav-klimt -> art-nouveau`
- `gustav-klimt -> byzantine-icon`
- `kandinsky -> expressionism`
- `mondrian -> de-stijl`
- `mondrian -> minimalism`
- `rothko -> color-field-painting`
- `rothko -> minimalism`
- `abstract-expressionism -> pollock`
- `color-field-painting -> rothko`
- `de-stijl -> mondrian`
- `dali -> surrealism`
- `magritte -> surrealism`
- `edward-hopper -> realism`
- `edward-hopper -> noir-illustration`
- `pollock -> abstract-expressionism`
- `pollock -> color-field-painting`
- `basquiat -> expressionism`
- `basquiat -> punk-diy`

The graph does not require reciprocal links. The artist/movement list is a semantic review queue, not an error list.

## Everyday Repetition

Requested phrase scan:

- None

High-similarity Chinese Everyday pairs:

- None

High-similarity English Everyday pairs:

- None

These results require reading the full scenes before deciding whether the action is merely an adjective substitution.

## Risk Wording

Keyword matches:

- surrealism [zh] "固定象征"
- surrealism [en] "fixed symbol"
- korean-minhwa [zh] "固定象征"
- kandinsky [zh] "固定象征"
- kandinsky [en] "fixed symbol"

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
| `dunhuang-mural` | SPECIALIST REVIEW RECOMMENDED | Buddhist cave murals carry site, devotional and conservation contexts; keep Everyday prompts observational and avoid extracting sacred figures as decoration. |
| `islamic-geometric` | SPECIALIST REVIEW RECOMMENDED | Geometric practices vary across regions, periods and religious or secular settings; geometry is not a universal dictionary of Islamic belief. |
| `african-tribal-pattern` | SPECIALIST REVIEW RECOMMENDED | The retained styleId is broader than the guide's West African textile focus; do not collapse a continent or copy community- and status-specific cloth motifs. |
| `aboriginal-dot-painting` | SPECIALIST REVIEW RECOMMENDED | Australian First Nations cultural and intellectual property, Country, community authority and restricted knowledge make context-free copying inappropriate. |
| `indian-miniature` | SPECIALIST REVIEW RECOMMENDED | The category contains Mughal, Rajasthani, Pahari and other courtly, religious and secular contexts; it is not one uniform Indian look. |
| `madhubani` | SPECIALIST REVIEW RECOMMENDED | Mithila practices vary by community, maker, ritual setting, wall or paper support and contemporary use; avoid treating them as generic bright folk decoration. |
| `chinese-new-year-woodblock` | AUTHOR PASS | The guide preserves regional workshop and seasonal-use variation and does not assign one fixed meaning to every color, animal or object. |
| `futurism` | SOURCE-BACKED PASS | The guide names the movement's links to nationalism, war rhetoric and later Fascism without celebrating them. |
| `basquiat` | SOURCE-BACKED PASS | The guide keeps Black history, Haitian and Puerto Rican family background, New York and art-market context visible and rejects a fixed symbol dictionary. |
| `mexican-muralism` | AUTHOR PASS | The guide treats public scale, social history and political address as context rather than reducing Mexican Muralism to colorful wall decoration. |

`SPECIALIST REVIEW RECOMMENDED` is a recommendation, not a claim that an independent expert has reviewed the page.

## Content Freeze And Change Control

- Frozen fingerprint count: 72
- Current fingerprint count: 72
- Changed styleIds: `edward-hopper`
- Approved revision records: `edward-hopper.profile.emotion.zh/en`
- Unapproved Guide objects remain byte-for-byte equivalent at the object JSON level: PASS

Approved revision details:

- `edward-hopper.profile.emotion.zh/en`: The Emotional intensity dimension was level 4, but its wording read like a low-intensity description. Reason: Align the descriptor with the existing level and the UI dimension without changing the calibrated level. Before: 情绪留白克制 / Restrained, open-ended emotion. After: 情绪张力含蓄而持续 / Quiet but sustained emotional tension. Source: V1.3-E1 cross-batch Profile calibration against the UI label 情绪张力 / Emotional intensity.

## Release Candidate Gate

- Automated corpus audit: PASS
- Product-owner signoff: COMPLETE, 36 / 36 final statuses assigned
- Complete Chinese and English page-by-page manual inspection: 3 representative pages (`swiss-style`, `art-deco`, `impressionism`)
- Explicit product-owner batch acceptance: 33 pages; these pages were not individually represented as having received page-by-page manual inspection
- Final status counts: PASS 30, REVISE 0, SPECIALIST REVIEW 6, BLOCKED 0, NOT REVIEWED 0
- Ready for V1.3 Release Candidate: YES
- Decision basis:
  1. The product owner explicitly approved the batch-signoff method.
  2. All 36 representative pages have a final status.
  3. BLOCKED = 0.
  4. REVISE = 0.
  5. Unresolved High content issues = 0.
  6. The six SPECIALIST REVIEW recommendations do not block the current RC.
  7. The 72-Guide full-corpus audit passed.
  8. UI Freeze is active.
  9. Automated, build, resource and StoreKit regression evidence passed.
- Independent cultural specialist review completed: NO
- The six SPECIALIST REVIEW pages retain a recommendation for independent expert review before large-scale promotion, education partnerships or content expansion.
- D4: NO
- Next stage: V1.3-RC1
