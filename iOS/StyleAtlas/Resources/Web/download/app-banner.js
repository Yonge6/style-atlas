(() => {
  "use strict";
  // Native WKWebView already is the app. Never show acquisition UI there.
  if (location.protocol === "file:" || window.webkit?.messageHandlers?.styleAtlas || window.STYLE_ATLAS_RUNTIME_CONFIG?.nativeShell) return;
  const key = "style-atlas-app-banner-dismissed";
  try { if (sessionStorage.getItem(key) === "1") return; } catch { /* Still dismissible when storage is blocked. */ }
  if (document.getElementById("appDownloadBanner")) return;
  const base = new URL("../", document.currentScript.src);
  const storeURL = "https://apps.apple.com/app/apple-store/id6787447019?pt=120014121&ct=Website%20Organic&mt=8";
  const banner = document.createElement("aside");
  banner.id = "appDownloadBanner";
  banner.className = "sa-download-banner";
  banner.innerHTML = '<div class="sa-download-banner-inner"><button class="sa-banner-close" type="button"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"/></svg></button><img width="48" height="48" alt=""><div class="sa-banner-copy"><strong></strong><span></span></div><a class="sa-banner-action"></a></div>';
  banner.querySelector("img").src = new URL("assets/brand/app-icon.png", base).href;
  const close = banner.querySelector("button");
  const action = banner.querySelector("a");
  action.href = storeURL;
  const isEnglish = () => !document.documentElement.lang.toLowerCase().startsWith("zh");
  function translate() {
    const en = isEnglish();
    banner.setAttribute("aria-label", en ? "Download Style Atlas" : "下载艺术风格图鉴 App");
    close.setAttribute("aria-label", en ? "Dismiss app banner" : "关闭下载横幅");
    banner.querySelector("strong").textContent = en ? "Style Atlas: Art & Design" : "虾子曰艺术风格图鉴";
    banner.querySelector(".sa-banner-copy span").textContent = en ? "132 styles · iPhone & iPad" : "132 种风格，随身探索 · iPhone / iPad";
    action.textContent = en ? "Get App" : "下载 App";
  }
  const languageObserver = new MutationObserver(translate);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  action.addEventListener("click", (event) => {
    window.StyleAtlasAnalytics?.track("download_click", { placement: "top_banner" });
    if (!/MicroMessenger/i.test(navigator.userAgent)) return;
    event.preventDefault();
    const destination = new URL("download.html", base);
    destination.searchParams.set("lang", isEnglish() ? "en" : "zh");
    // Real same-tab navigation lets WeChat hand this URL to the external browser.
    location.assign(destination.href);
  });
  function measure() {
    document.documentElement.style.setProperty("--sa-banner-height", `${banner.getBoundingClientRect().height}px`);
  }
  const sizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
  close.addEventListener("click", () => {
    window.StyleAtlasAnalytics?.track("banner_close");
    try { sessionStorage.setItem(key, "1"); } catch { /* Dismiss for this page. */ }
    languageObserver.disconnect();
    sizeObserver?.disconnect();
    window.removeEventListener("resize", measure);
    banner.remove();
    document.body.classList.remove("sa-has-banner", "sa-banner-app");
    document.documentElement.style.removeProperty("--sa-banner-height");
  });
  translate();
  if (document.getElementById("appShell")) document.body.classList.add("sa-banner-app");
  document.body.classList.add("sa-has-banner");
  (document.getElementById("appShell") || document.body).prepend(banner);
  measure();
  sizeObserver?.observe(banner);
  window.addEventListener("resize", measure);
})();
