import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const sandbox = { window: {} };
vm.runInNewContext(read("data-styles.js"), sandbox, { filename: "data-styles.js" });
const sourceStyles = sandbox.window.STYLE_ATLAS_DATA?.rawStyles;
assert.equal(sourceStyles?.length, 120, "canonical web catalog must contain 120 styles");

assert.ok(exists("iOS/StyleAtlas/Resources/DailyStyles.json"), "native daily catalog is missing");
const catalog = JSON.parse(read("iOS/StyleAtlas/Resources/DailyStyles.json"));
assert.equal(catalog.length, 120, "native catalog must contain 120 styles");
assert.equal(new Set(catalog.map((style) => style.id)).size, 120, "style ids must be unique");
for (let index = 0; index < sourceStyles.length; index += 1) {
  assert.deepEqual(
    [catalog[index].id, catalog[index].englishName, catalog[index].chineseName, catalog[index].category],
    Array.from(sourceStyles[index].slice(0, 4)),
    `native catalog row ${index} must match data-styles.js`
  );
}

function dailyIndex(date) {
  let hash = 0;
  for (const character of date) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash % catalog.length;
}

assert.equal(catalog[dailyIndex("2026-09-04")].id, "vaporwave");
assert.equal(catalog[dailyIndex("2026-09-05")].id, "synthwave");

const project = read("iOS/StyleAtlas/StyleAtlas.xcodeproj/project.pbxproj");
assert.match(project, /StyleAtlasWidgetExtension/, "widget extension target must exist");
assert.match(project, /TARGETED_DEVICE_FAMILY = "1,2";/, "app must support iPhone and iPad");
assert.match(project, /com\.apple\.product-type\.app-extension/, "widget product type is missing");

const app = read("iOS/StyleAtlas/StyleAtlasApp.swift");
assert.match(app, /onOpenURL/, "app must route widget deep links");
const notifications = read("iOS/StyleAtlas/Notifications/DailyStyleNotificationManager.swift");
assert.match(notifications, /UNUserNotificationCenter/);
assert.match(notifications, /let hour = 9/);

const widget = read("iOS/StyleAtlas/Widgets/DailyStyleWidget.swift");
assert.match(widget, /supportedFamilies\(\[\.systemSmall, \.systemMedium\]\)/);
assert.match(widget, /widgetURL/);

const web = read("game.js");
assert.match(web, /setDailyReminder/);
assert.match(web, /setNotificationStatus/);
assert.match(read("index.html"), /drawerDailyReminderBtn/);

console.log("IOS_DAILY_FEATURES_OK styles=120 notifications=09:00 widgets=small,medium devices=iphone,ipad");
