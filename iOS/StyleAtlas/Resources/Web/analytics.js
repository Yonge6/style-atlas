(function (root) {
  'use strict';
  const consentKey = 'styleAtlas.analyticsConsent.v1';
  const names = new Set(['visit','screen','style_view','active_time','reading_time','guided_start','guided_step','guided_complete','favorite','reflection_saved','search','filter','share_request','share_success','share_preview','share_cancel','share_error','copy_success','save_request','file_download','photo_saved','export_error','paywall_view','purchase_request','purchase_result','restore_request','restore_result','download_click','banner_close']);
  const keys = new Set(['style_id','screen','action','step','value','result_count','plan','result','language','placement']);
  function event(name, fields = {}, surface = 'h5') {
    if (!names.has(name)) return null;
    const safe = {};
    for (const [key, value] of Object.entries(fields)) {
      if (!keys.has(key)) continue;
      if (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100000) safe[key] = value;
      if (typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) safe[key] = value;
    }
    return { name: `atlas_v1_${name}`, parameters: { ...safe, ...(safe.style_id ? { content_id: safe.style_id, content_type: 'art_style' } : {}), surface: surface === 'ios' ? 'ios' : 'h5', schema_version: 1, site_id: 'site-style-atlas' } };
  }
  function activeClock() {
    let previous = null;
    return { reset() { previous = null; }, sample(now, active) {
      const before = previous; previous = active ? now : null;
      if (!active || before === null) return 0;
      const seconds = (now - before) / 1000;
      return seconds > 0 && seconds <= 35 ? seconds : 0;
    } };
  }
  if (typeof module !== 'undefined') module.exports = { event, activeClock, consentKey };
  if (!root?.document) return;
  const doc = root.document, query = new URLSearchParams(location.search);
  const native = Boolean(root.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell && root.webkit?.messageHandlers?.styleAtlas);
  const eligible = (native || (location.protocol === 'https:' && location.hostname === 'style-atlas.wonderelian.com'))
    && !navigator.webdriver && query.get('analytics') !== 'off' && !query.has('preview') && !location.pathname.startsWith('/preview/');
  let choice = null;
  try { choice = localStorage.getItem(consentKey); } catch {}
  let enabled = eligible && choice === 'granted', frame = null, ready = false, queue = [];
  let context = { screen: location.pathname.includes('/articles/') ? 'article' : 'home' }, lastInteraction = performance.now(), pending = 0, reading = 0, foreground = true;
  const clock = activeClock();
  const language = () => doc.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  function bridge(type, payload) { root.webkit?.messageHandlers?.styleAtlas?.postMessage({ type, payload }); }
  function transport(value) {
    if (!enabled || !value) return;
    if (native) bridge('analyticsEvent', value);
    else if (ready && frame?.contentWindow) frame.contentWindow.postMessage({ type: 'atlas:event', ...value }, location.origin);
    else if (queue.length < 50) queue.push(value);
  }
  function track(name, fields = {}) { transport(event(name, { ...context, language: language(), ...fields }, native ? 'ios' : 'h5')); }
  function stop() {
    clock.reset(); pending = 0; reading = 0; queue = []; ready = false;
    frame?.remove(); frame = null;
    for (const part of doc.cookie.split(';')) {
      const name = part.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; domain=style-atlas.wonderelian.com']) doc.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
  function start() {
    if (native) { bridge('analyticsConsent', { enabled }); return; }
    if (!enabled || frame) return;
    frame = doc.createElement('iframe'); frame.hidden = true; frame.title = 'Usage analytics'; frame.setAttribute('aria-hidden', 'true');
    frame.src = '/analytics-frame.html?v=20261001'; doc.body.append(frame);
  }
  root.addEventListener('message', e => {
    if (!enabled || e.origin !== location.origin || e.source !== frame?.contentWindow || e.data?.type !== 'atlas:ready') return;
    ready = true; const items = queue; queue = []; items.forEach(transport);
  });
  function consent(value) {
    choice = value ? 'granted' : 'denied';
    try { localStorage.setItem(consentKey, choice); } catch {}
    enabled = eligible && value === true; stop(); start();
    if (enabled) { lastInteraction = performance.now(); track('visit'); track('screen'); clock.sample(performance.now(), true); }
    render();
  }
  function flush() { if (pending >= 0.1) track('active_time', { value: Math.round(pending * 100) / 100 }); if (reading >= 0.1) track('reading_time', { value: Math.round(reading * 100) / 100 }); pending = 0; reading = 0; }
  function sample() {
    const now = performance.now();
    const seconds = clock.sample(now, enabled && foreground && doc.visibilityState === 'visible' && now - lastInteraction < 60000);
    pending += seconds;
    if (context.screen === 'detail' && !doc.querySelector('#detailView')?.inert && !doc.body.classList.contains('drawer-lock')) reading += seconds;
    if (pending >= 30) flush();
  }
  root.StyleAtlasAnalytics = { track, consent, setForeground(value) {
    sample(); flush(); foreground = value === true; clock.reset();
    if (foreground) { lastInteraction = performance.now(); sample(); }
  }, context(next) {
    sample(); flush(); context = { screen: next.screen || 'home', ...(next.style_id ? { style_id: next.style_id } : {}) }; clock.reset(); sample();
  } };
  let panel, setting;
  function render() {
    const zh = language() === 'zh';
    const description = zh ? '可选使用统计：向 Google Analytics / Firebase 发送操作结果、内容编号和活跃时长，含假名化设备标识。不上传笔记或搜索原文，可随时在菜单关闭。' : 'Optional statistics send action outcomes, content IDs and active time, with pseudonymous device identifiers, to Google Analytics / Firebase. No notes or search text. Turn off in the menu at any time.';
    if (panel) {
      panel.hidden = choice !== null;
      panel.querySelector('strong').textContent = zh ? '帮助改进艺术风格图鉴' : 'Help improve Style Atlas';
      panel.querySelector('p').textContent = description;
      panel.querySelector('[data-consent="yes"]').textContent = zh ? '允许统计' : 'Allow';
      panel.querySelector('[data-consent="no"]').textContent = zh ? '暂不允许' : 'Not now';
    }
    if (setting) { setting.querySelector('span').textContent = `${zh ? '使用统计' : 'Usage statistics'} · ${choice === 'granted' ? (zh ? '已开启' : 'On') : (zh ? '已关闭' : 'Off')}`; setting.title = description; }
  }
  function mount() {
    const css = doc.createElement('link'); css.rel = 'stylesheet'; css.href = new URL('./analytics.css?v=20261001', doc.querySelector('script[src*="analytics.js"]')?.src || location.href).href; doc.head.append(css);
    const menu = doc.querySelector('#drawer');
    setting = doc.createElement('button'); setting.type = 'button'; setting.className = 'atlas-usage-setting'; setting.innerHTML = '<span></span>';
    setting.onclick = () => { if (choice === 'granted') consent(false); else { doc.querySelector('#drawer.open #drawerCloseBtn')?.click(); choice = null; render(); requestAnimationFrame(() => panel?.querySelector('button')?.focus()); } };
    (menu?.querySelector('.drawer-nav') || doc.querySelector('main') || doc.body).append(setting);
    panel = doc.createElement('section'); panel.className = 'atlas-usage-consent'; panel.setAttribute('aria-label', 'Optional usage statistics');
    panel.innerHTML = '<strong></strong><p></p><div><button type="button" data-consent="no"></button><button type="button" data-consent="yes"></button></div>';
    panel.querySelectorAll('button').forEach(button => button.onclick = () => consent(button.dataset.consent === 'yes'));
    doc.body.append(panel); render();
    new MutationObserver(render).observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
    start(); track('visit'); track('screen'); sample();
    setInterval(sample, 5000);
    for (const name of ['pointerdown', 'keydown', 'scroll']) root.addEventListener(name, () => { sample(); lastInteraction = performance.now(); }, { passive: true });
    doc.addEventListener('visibilitychange', () => { flush(); clock.reset(); sample(); });
    root.addEventListener('pagehide', () => { sample(); flush(); clock.reset(); });
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount, { once: true }); else mount();
})(typeof window === 'undefined' ? null : window);
