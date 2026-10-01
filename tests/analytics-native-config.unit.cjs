const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '../iOS/StyleAtlas');
const plist = name => JSON.parse(execFileSync('/usr/bin/plutil',['-convert','json','-o','-',path.join(root,name)],{encoding:'utf8'}));
test('official Firebase config matches Style Atlas and is main-app-only', () => {
  const config=plist('GoogleService-Info.plist');
  assert.equal(config.BUNDLE_ID,'com.xiazishuo.styleatlas');
  assert.equal(config.PROJECT_ID,'yixiu-meditation');
  assert.equal(config.GOOGLE_APP_ID,'1:319625849765:ios:5c0aa2d3e6fc5cbb28564c');
  const project=plist('StyleAtlas.xcodeproj/project.pbxproj');
  const objects=project.objects;
  const resources=target=>objects[Object.keys(objects).find(k=>objects[k].isa==='PBXNativeTarget'&&objects[k].name===target)].buildPhases.flatMap(id=>objects[id].isa==='PBXResourcesBuildPhase'?objects[id].files.map(f=>objects[objects[f].fileRef].path):[]);
  assert.ok(resources('StyleAtlas').includes('GoogleService-Info.plist'));
  assert.ok(resources('StyleAtlas').includes('PrivacyInfo.xcprivacy'));
  assert.ok(!resources('StyleAtlasWidgetExtension').includes('GoogleService-Info.plist'));
  assert.equal(fs.existsSync(path.join(root,'Widgets/GoogleService-Info.plist')),false);
  const info=plist('Info.plist');
  for(const key of ['FIREBASE_ANALYTICS_COLLECTION_ENABLED','GOOGLE_ANALYTICS_IDFV_COLLECTION_ENABLED','FirebaseAutomaticScreenReportingEnabled','GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_PERSONALIZATION_SIGNALS']) assert.equal(info[key],false,key);
});
test('native privacy manifest declares limited analytics and app-local preferences', () => {
  const privacy=plist('PrivacyInfo.xcprivacy');
  assert.equal(privacy.NSPrivacyTracking,false);
  assert.deepEqual(privacy.NSPrivacyTrackingDomains,[]);
  assert.deepEqual(privacy.NSPrivacyAccessedAPITypes,[{NSPrivacyAccessedAPIType:'NSPrivacyAccessedAPICategoryUserDefaults',NSPrivacyAccessedAPITypeReasons:['CA92.1']}]);
  assert.equal(privacy.NSPrivacyCollectedDataTypes.length,5);
  for(const type of privacy.NSPrivacyCollectedDataTypes) {
    assert.equal(type.NSPrivacyCollectedDataTypeTracking,false);
    assert.deepEqual(type.NSPrivacyCollectedDataTypePurposes,['NSPrivacyCollectedDataTypePurposeAnalytics']);
  }
});
