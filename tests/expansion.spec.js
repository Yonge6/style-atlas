const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const ids=['rinpa','blue-white-porcelain','chinese-paper-cut','song-bird-flower','arts-and-crafts','mid-century-modern','vienna-secession','sachplakat','risograph','cyanotype','linocut','paper-collage'];
test.beforeEach(async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('styleAtlasLang','zh');
    window.__nativeMessages=[];
    window.webkit={messageHandlers:{styleAtlas:{postMessage:m=>window.__nativeMessages.push(m)}}};
    window.STYLE_ATLAS_RUNTIME_CONFIG={nativeShell:true,externalGalleryEnabled:false,submissionMode:'iap'};
  });
});
test('expansion source and offline modules remain identical',()=>{
  const root=path.resolve(__dirname,'..');
  for(const file of ['data-styles.js','data-refined.js','data-aesthetic-guides.js','data-expansion.js','game.js','styles.css','index.html']) {
    expect(fs.readFileSync(path.join(root,file)).equals(fs.readFileSync(path.join(root,'iOS/StyleAtlas/Resources/Web',file)))).toBe(true);
  }
});
for(const lang of ['zh','en']) {
  test(`all 12 added styles have complete ${lang} content, source links and loaded covers`,async({page})=>{
    await page.addInitScript(l=>localStorage.setItem('styleAtlasLang',l),lang);
    await page.goto('/#rinpa');
    await page.evaluate(()=>window.StyleAtlasNativeBridge.setPlusAccess(true));
    for(const id of ids) {
      await page.evaluate(id=>location.hash=id,id);
      await expect(page.locator('#detailContent')).not.toContainText('undefined');
      await expect(page.locator('.entry-type')).toBeVisible();
      await expect(page.locator('.image-provenance')).toContainText(lang==='zh'?'非历史原作':'not a historical original');
      await expect(page.locator('.profile-scale')).toHaveCount(4);
      await expect(page.locator('.everyday-grid article')).toHaveCount(4);
      await expect(page.locator('.source-links a').first()).toHaveAttribute('href',/^https:\/\//);
      await expect.poll(()=>page.locator('.detail-hero img').evaluate(img=>img.complete && img.naturalWidth>0)).toBe(true);
      await expect(page.locator('#detailContent')).not.toContainText(lang==='zh'?'相关创作者':'Relevant creators');
    }
  });
}
for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1024,height:768},{width:507,height:768}]) {
  test(`new style layout fits ${viewport.width}x${viewport.height}`,async({page})=>{
    await page.setViewportSize(viewport);
    await page.goto('/#blue-white-porcelain');
    await page.evaluate(()=>window.StyleAtlasNativeBridge.setPlusAccess(true));
    await expect(page.locator('#detailTitle')).toHaveText('青花瓷装饰语汇');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`/tmp/style-atlas-expansion-${viewport.width}.png`,fullPage:false});
  });
}
test('institutional reference opens through native external URL bridge',async({page})=>{
  await page.goto('/#rinpa');
  await page.evaluate(()=>window.StyleAtlasNativeBridge.setPlusAccess(true));
  await page.locator('[data-action="toggle-accordion"]').filter({hasText:'参考'}).click();
  await page.locator('.source-links a').first().click();
  await expect.poll(()=>page.evaluate(()=>window.__nativeMessages.filter(m=>m.type==='openExternalURL').length)).toBe(1);
  expect(await page.evaluate(()=>location.hash)).toBe('#rinpa');
});
