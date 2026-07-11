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
            Task {
                injectStoreAction("purchasing")
                injectStoreResult(await storeManager.purchasePlus())
            }
        case "restorePurchases":
            Task {
                injectStoreAction("restoring")
                injectStoreResult(await storeManager.restorePurchases())
            }
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

    func injectProductPrice(_ price: String?) {
        guard let data = try? JSONEncoder().encode(price ?? ""),
              let value = String(data: data, encoding: .utf8) else { return }
        webView?.evaluateJavaScript("window.StyleAtlasNativeBridge?.setProductPrice(\(value))")
    }

    private func injectStoreResult(_ result: StoreActionResult) {
        switch result {
        case .purchased:
            injectPlusAccess(true)
            injectStoreAction("purchased")
        case .pending:
            injectStoreAction("pending")
        case .cancelled:
            injectStoreAction("cancelled")
        case .restored:
            injectPlusAccess(true)
            injectStoreAction("restored")
        case .nothingToRestore:
            injectStoreAction("nothingToRestore")
        case .unavailable(let message):
            injectStoreAction("unavailable", message: message)
        case .failed(let message):
            injectStoreAction("failed", message: message)
        }
    }

    private func injectStoreAction(_ status: String, message: String = "") {
        guard let statusData = try? JSONEncoder().encode(status),
              let statusValue = String(data: statusData, encoding: .utf8),
              let messageData = try? JSONEncoder().encode(message),
              let messageValue = String(data: messageData, encoding: .utf8) else { return }
        webView?.evaluateJavaScript("window.StyleAtlasNativeBridge?.setStoreAction(\(statusValue), \(messageValue))")
    }
}
