#!/usr/bin/env node
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const pages = [
  {
    file: new URL("../guides/visual-hierarchy-checklist/index.html", import.meta.url),
    canonical: "https://style-atlas.wonderelian.com/guides/visual-hierarchy-checklist/",
    campaign: "SEO%20Guide%20Visual%20Hierarchy",
  },
  {
    file: new URL("../compare/art-nouveau-vs-art-deco/index.html", import.meta.url),
    canonical: "https://style-atlas.wonderelian.com/compare/art-nouveau-vs-art-deco/",
    campaign: "SEO%20Compare%20Nouveau%20Deco",
  },
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for (const page of pages) {
  const html = await readFile(page.file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || "";
  const description = html.match(/<meta name="description" content="([^"]+)"/u)?.[1] || "";
  const directAnswer = html.match(/<p class="direct-answer">([^<]+)<\/p>/u)?.[1] || "";
  const schemaSource = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/u)?.[1] || "";

  assert.match(html, /<html lang="en">/);
  assert.match(html, new RegExp(`rel="canonical" href="${escapeRegExp(page.canonical)}"`));
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(title.length >= 50 && title.length <= 60, `title length ${title.length}: ${title}`);
  assert.ok(description.length >= 150 && description.length <= 160, `description length ${description.length}: ${description}`);
  assert.ok(directAnswer.split(/\s+/u).length >= 40 && directAnswer.split(/\s+/u).length <= 70, "direct answer must be 40–70 words");
  assert.match(html, /Original visual example/);
  assert.match(html, /WonderElian Editorial/);
  assert.match(html, /Updated August 14, 2026/);
  assert.match(html, /application\/ld\+json/);
  assert.equal(JSON.parse(schemaSource)["@type"], "Article");
  assert.match(html, new RegExp(page.campaign));
  assert.doesNotMatch(html, /apps\.apple\.com\/cn\//);
}

const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
for (const page of pages) assert.match(sitemap, new RegExp(escapeRegExp(page.canonical)));

await Promise.all([
  access(new URL("../content/content.css", import.meta.url)),
  access(new URL("../assets/brand/app-icon.png", import.meta.url)),
  access(new URL("../assets/styles/swiss-style.webp", import.meta.url)),
  access(new URL("../assets/styles/art-nouveau.webp", import.meta.url)),
  access(new URL("../assets/styles/art-deco.webp", import.meta.url)),
]);

console.log(`SEO_PAGE_VALIDATION_OK pages=${pages.length}`);
