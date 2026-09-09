(() => {
  "use strict";
  const english = new URLSearchParams(location.search).get("lang") === "en";
  const inWeChat = /MicroMessenger/i.test(navigator.userAgent);
  const link = document.getElementById("app-store-link");
  // The destination is fixed in markup, never accepted from URL parameters.
  const storeURL = link.href;
  const copyButton = document.getElementById("copy-link");
  const feedback = document.getElementById("copy-feedback");
  const copy = (id, zh, en) => { document.getElementById(id).textContent = english ? en : zh; };
  document.documentElement.lang = english ? "en" : "zh-CN";
  document.title = english ? "Download Style Atlas" : "下载虾子曰艺术风格图鉴";
  copy("app-store-link", "打开 App Store", "Open App Store");
  copy("copy-link", "复制 App Store 链接", "Copy App Store link");
  copy("back-to-atlas", "返回风格图鉴", "Return to Style Atlas");
  copyButton.hidden = false;

  copyButton.addEventListener("click", async () => {
    copyButton.disabled = true;
    let copied = false;
    try {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(storeURL);
          copied = true;
        }
      } catch { /* Older WeChat versions may reject the clipboard API. */ }
      if (!copied) {
        const field = document.createElement("textarea");
        field.value = storeURL;
        field.readOnly = true;
        field.style.cssText = "position:fixed;opacity:0;font-size:16px";
        document.body.appendChild(field);
        try {
          field.select();
          field.setSelectionRange(0, field.value.length);
          copied = document.execCommand("copy");
        } finally { field.remove(); }
      }
    } catch { /* Report failure below instead of claiming a copy succeeded. */ }
    copyButton.disabled = false;
    copy("copy-feedback",
      copied ? "已复制，可粘贴到浏览器打开" : "复制失败，请长按“打开 App Store”复制链接",
      copied ? "Link copied. Paste it into your browser." : "Could not copy. Press and hold Open App Store to copy the link.");
  });

  if (inWeChat) {
    copy("download-title", "在浏览器中继续下载", "Continue in your browser");
    copy("download-description", "请在默认浏览器中打开此页，即可自动前往 App Store。", "Open this page outside WeChat to continue to the App Store automatically.");
    const guide = document.getElementById("wechat-guide");
    guide.hidden = false;
    guide.setAttribute("aria-label", english ? "Open in your default browser" : "在默认浏览器中打开");
    document.getElementById("browser-pointer").hidden = false;
    copy("guide-menu", "点击微信右上角 ···", "Tap ··· at the top right of WeChat");
    copy("guide-browser", "选择“在默认浏览器中打开”", "Choose Open in Default Browser");
    copy("guide-result", "浏览器打开后，将自动前往 App Store，无需再次点击下载。", "Your browser will open the App Store automatically. No second download tap is needed.");
    copy("fallback-note", "也可以复制 App Store 链接，粘贴到浏览器打开。", "You can also copy the App Store link and paste it into your browser.");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      copy("copy-feedback", "请点右上角 ···，在默认浏览器中打开", "Use ··· to open this page in your default browser.");
    });
    return;
  }

  copy("download-title", "正在前往 App Store", "Opening the App Store");
  copy("download-description", "即将打开艺术风格图鉴下载页。", "Continue to Style Atlas on the App Store.");
  copy("fallback-note", "如未自动跳转，请点击上方按钮。", "If nothing opens, tap Open App Store above.");
  location.replace(storeURL);
})();
