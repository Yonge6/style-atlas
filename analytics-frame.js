(() => {
  'use strict';
  if (location.hostname !== 'style-atlas.wonderelian.com' || location.protocol !== 'https:' || parent === window) return;
  try { if (parent.location.origin !== location.origin || localStorage.getItem('styleAtlas.analyticsConsent.v1') !== 'granted') return; } catch { return; }
  const id = 'G-HDHST6WKKB';
  document.body.style.minHeight = '1000px';
  window.dataLayer = [];
  const gtag = window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', id, { send_page_view: false, cookie_domain: location.hostname, cookie_expires: 2592000, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: 'https://style-atlas.wonderelian.com/', page_referrer: '', page_title: 'Style Atlas' });
  addEventListener('message', e => {
    if (e.source !== parent || e.origin !== location.origin || e.data?.type !== 'atlas:event' || !/^atlas_v1_[a-z_]+$/.test(e.data.name)) return;
    if (localStorage.getItem('styleAtlas.analyticsConsent.v1') !== 'granted') return;
    gtag('event', e.data.name, { ...e.data.parameters, transport_type: 'beacon' });
    // Keep existing website PV and acquisition reports, but only after opt-in.
    if (e.data.name === 'atlas_v1_visit') gtag('event', 'page_view', { site_id: 'site-style-atlas' });
    if (e.data.name === 'atlas_v1_download_click') gtag('event', 'app_store_download', { site_id: 'site-style-atlas', destination: 'app_store', transport_type: 'beacon' });
  });
  const script = document.createElement('script'); script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`; document.head.append(script);
  parent.postMessage({ type: 'atlas:ready' }, location.origin);
})();
