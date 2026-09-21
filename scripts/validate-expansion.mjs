import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({window: {}});
for (const file of ['data-core.js', 'data-styles.js', 'data-refined.js', 'data-aesthetic-guides.js', 'data-expansion.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
const {rawStyles,refinedStyles} = context.window.STYLE_ATLAS_DATA;
const guides = context.window.STYLE_AESTHETIC_GUIDES;
assert.equal(rawStyles.length,132);
const ids = new Set(rawStyles.map(row=>row[0]));
assert.equal(ids.size,132);
for (const [id] of rawStyles.slice(120)) {
  const style=refinedStyles[id], guide=guides[id];
  assert.ok(['movement','technique','language'].includes(style.entryType),id);
  for (const lang of ['zh','en']) {
    for (const field of ['summary','memoryAnchor','history','why','curatorNote','imagePrompts','negativePrompt']) {
      assert.ok(style[field][lang]?.length>15,`${id}.${field}.${lang}`);
      assert.ok(!/undefined|Relevant creators|相关创作者/.test(style[field][lang]),id);
    }
    assert.ok(style.people[lang].length>=2,id);
    assert.ok(style.tags[lang].length>=3,id);
    assert.equal(guide.observe.length,3,id);
    assert.equal(guide.everydayLife.length,4,id);
    for(const item of guide.observe) assert.ok(item.text[lang].length>15,id);
    for(const item of guide.everydayLife) assert.ok(item.text[lang].length>15,id);
    for(const item of guide.comparisons) {
      assert.ok(ids.has(item.styleId) && item.styleId!==id,id);
      assert.ok(item.similarity[lang].length>10 && item.difference[lang].length>15,id);
    }
    assert.ok(guide.reflectionPrompt[lang].length>15,id);
  }
  assert.equal(guide.comparisons.length,2,id);
  assert.equal(Object.keys(guide.profile).length,4,id);
  for (const trait of Object.values(guide.profile)) assert.ok(trait.level>=1 && trait.level<=5,id);
  assert.ok(style.sources.length>=1,id);
  for(const source of style.sources) assert.match(source.url,/^https:\/\//);
  assert.equal(style.imageProvenance,'ai-teaching-illustration');
}
console.log('EXPANSION_OK catalog=132 complete_new_guides=12 bilingual=true');
