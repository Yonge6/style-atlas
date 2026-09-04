import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "data-styles.js");
const outputPath = path.join(root, "iOS/StyleAtlas/Resources/DailyStyles.json");
const source = fs.readFileSync(sourcePath, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: sourcePath });

const rawStyles = sandbox.window.STYLE_ATLAS_DATA?.rawStyles;
if (!Array.isArray(rawStyles) || rawStyles.length !== 120) {
  throw new Error(`Expected 120 styles, received ${rawStyles?.length ?? "none"}`);
}

const catalog = rawStyles.map(([id, englishName, chineseName, category]) => ({
  id,
  englishName,
  chineseName,
  category,
  thumbnail: `${id}.jpg`
}));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Wrote ${catalog.length} daily styles to ${path.relative(root, outputPath)}`);
