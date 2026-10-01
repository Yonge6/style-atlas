import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
const output = resolve('build/usage-20261001');
const names = ['index.html','game.js','analytics.js','analytics.css','analytics-frame.html','analytics-frame.js','privacy.html','download/app-banner.js','guides/visual-hierarchy-checklist/index.html','compare/art-nouveau-vs-art-deco/index.html'];
const existing = names;
const sha = value => createHash('sha256').update(value).digest('hex');
const manifest = [], baseline = [];
for (const file of names) {
  const body = await readFile(file); await mkdir(dirname(resolve(output,file)),{recursive:true}); await writeFile(resolve(output,file),body); manifest.push(`${sha(body)}  ${file}`);
  if (existing.includes(file)) { const r = await fetch(`https://style-atlas.wonderelian.com/${file}`); if (!r.ok) throw new Error(`Baseline failed: ${file}`); baseline.push(`${sha(Buffer.from(await r.arrayBuffer()))}  ${file}`); }
}
await writeFile(resolve(output,'SHA256SUMS'),manifest.join('\n')+'\n');
await writeFile(resolve(output,'BASELINE'),baseline.join('\n')+'\n');
console.log(`ATLAS_WEB_STAGE_READY files=${names.length}`);
