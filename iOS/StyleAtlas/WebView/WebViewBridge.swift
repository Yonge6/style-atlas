import UIKit
import WebKit

@MainActor
final class WebViewBridge: NSObject, ObservableObject, WKScriptMessageHandler {
    weak var webView: WKWebView?
    var storeManager: StoreManager

    init(storeManager: StoreManager) {
        self.storeManager = storeManager
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "styleAtlas",
              let body = message.body as? [String: Any],
              let type = body["type"] as? String else { return }

        switch type {
        case "purchasePlus":
            Task { await storeManager.purchasePlus() }
        case "restorePurchases":
            Task { await storeManager.restorePurchases() }
        case "hapticFeedback":
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
        case "shareImage", "exportImage":
            // TODO: Reserved until the web app sends image payloads; Photos/share sheets need a real data contract.
            break
        default:
            break
        }
    }

    func injectPlusAccess(_ hasPlus: Bool) {
        let js = "window.StyleAtlasNativeBridge?.setPlusAccess(\(hasPlus ? "true" : "false"))"
        webView?.evaluateJavaScript(js)
    }
}
