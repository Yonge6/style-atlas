const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const [app, version, build] = process.argv.slice(2);
assert.ok(app && version && build, 'Usage: node verify-analytics-app.cjs APP VERSION BUILD');
const source = path.resolve(__dirname, '../iOS/StyleAtlas');
const plist = file => JSON.parse(cp.execFileSync('/usr/bin/plutil', ['-convert', 'json', '-o', '-', file], {encoding: 'utf8'}));
const info = plist(path.join(app, 'Info.plist'));
assert.equal(info.CFBundleIdentifier, 'com.xiazishuo.styleatlas');
assert.equal(info.CFBundleShortVersionString, version);
assert.equal(info.CFBundleVersion, build);
assert.deepEqual(info.UIDeviceFamily, [1, 2]);
for (const key of ['FIREBASE_ANALYTICS_COLLECTION_ENABLED', 'GOOGLE_ANALYTICS_IDFV_COLLECTION_ENABLED', 'FirebaseAutomaticScreenReportingEnabled', 'GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_PERSONALIZATION_SIGNALS']) assert.equal(info[key], false, key);
for (const name of ['GoogleService-Info.plist', 'PrivacyInfo.xcprivacy']) assert.deepEqual(plist(path.join(app, name)), plist(path.join(source, name)));
const widget = path.join(app, 'PlugIns/StyleAtlasWidgetExtension.appex');
assert.ok(!fs.existsSync(path.join(widget, 'GoogleService-Info.plist')));
assert.equal(plist(path.join(widget, 'Info.plist')).CFBundleVersion, build);
const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
let count = 0;
const web = path.join(source, 'Resources/Web');
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.DS_Store') continue;
    const file = path.join(dir, name);
    if (fs.statSync(file).isDirectory()) walk(file);
    else { const relative = path.relative(web, file); assert.equal(digest(file), digest(path.join(app, 'Web', relative)), relative); count++; }
  }
}
walk(web);
assert.equal(digest(path.join(source, 'Resources/DailyStyles.json')), digest(path.join(app, 'DailyStyles.json')));
cp.execFileSync('/usr/bin/codesign', ['--verify', '--deep', '--strict', app]);
console.log(JSON.stringify({version, build, signed: true, iPhoneAndIPad: true, analyticsDefaultsOff: true, officialConfigMatches: true, privacyMatches: true, webFilesVerified: count, dailyStylesMatches: true}));
