import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "build", "preview", "v1.3");
const buildRoot = path.join(root, "build", "preview");

if (!output.startsWith(`${buildRoot}${path.sep}`)) {
  throw new Error(`Refusing to clean unexpected preview path: ${output}`);
}

const webFiles = [
  "styles.css",
  "game.js",
  "data-core.js",
  "data-styles.js",
  "data-refined.js",
  "data-aesthetic-guides.js",
  "examples.js",
  "privacy.html"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await Promise.all(webFiles.map((file) => cp(path.join(root, file), path.join(output, file))));
await Promise.all([
  cp(path.join(root, "assets", "brand"), path.join(output, "assets", "brand"), { recursive: true }),
  cp(path.join(root, "assets", "examples"), path.join(output, "assets", "examples"), { recursive: true }),
  cp(path.join(root, "assets", "styles"), path.join(output, "assets", "styles"), {
    recursive: true,
    filter: (source) => !path.extname(source) || path.extname(source) === ".webp"
  })
]);

const sourceIndex = await readFile(path.join(root, "index.html"), "utf8");
const previewIndex = sourceIndex
  .replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />\n  <meta name="robots" content="noindex,nofollow" />'
  )
  .replace(
    "<body>",
    `<body>
  <div class="v13-preview-badge" aria-label="V1.3 preview environment">V1.3 Preview</div>
  <style>
    .v13-preview-badge {
      position: fixed;
      right: max(10px, env(safe-area-inset-right));
      bottom: max(10px, env(safe-area-inset-bottom));
      z-index: 200;
      padding: 5px 8px;
      border: 1px solid rgba(255, 235, 180, 0.35);
      border-radius: 6px;
      background: rgba(8, 7, 5, 0.76);
      color: #f3dfad;
      font: 700 11px/1.2 ui-sans-serif, system-ui, sans-serif;
      pointer-events: none;
    }
  </style>`
  );

if (previewIndex === sourceIndex || !previewIndex.includes("noindex,nofollow") || !previewIndex.includes("V1.3 Preview")) {
  throw new Error("Preview markers were not injected");
}

await writeFile(path.join(output, "index.html"), previewIndex);
await writeFile(
  path.join(output, "preview-manifest.json"),
  `${JSON.stringify({
    version: "v1.3",
    source: "feature/v1.3-style-deep-dive",
    deployPath: "/preview/v1.3/",
    productionRootFilesIncluded: false
  }, null, 2)}\n`
);

console.log(`Built isolated V1.3 preview at ${path.relative(root, output)}/`);
