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
            guard let payload = body["payload"] as? [String: Any] else {
                injectStoreAction("exportFailed", message: "Missing image payload.")
                return
            }
            presentImageActivity(payload: payload)
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

    private func presentImageActivity(payload: [String: Any]) {
        guard let dataURL = payload["dataURL"] as? String,
              let commaIndex = dataURL.firstIndex(of: ","),
              let data = Data(base64Encoded: String(dataURL[dataURL.index(after: commaIndex)...])),
              let webView else {
            injectStoreAction("exportFailed", message: "The image could not be prepared.")
            return
        }

        let requestedName = (payload["filename"] as? String) ?? "style-atlas.png"
        let safeName = requestedName.replacingOccurrences(of: "/", with: "-")
        let fileURL = FileManager.default.temporaryDirectory.appendingPathComponent(safeName)

        do {
            try data.write(to: fileURL, options: .atomic)
        } catch {
            injectStoreAction("exportFailed", message: error.localizedDescription)
            return
        }

        let activity = UIActivityViewController(activityItems: [fileURL], applicationActivities: nil)
        activity.popoverPresentationController?.sourceView = webView
        activity.popoverPresentationController?.sourceRect = CGRect(
            x: webView.bounds.midX,
            y: webView.bounds.midY,
            width: 1,
            height: 1
        )
        activity.completionWithItemsHandler = { [weak self] _, completed, _, error in
            Task { @MainActor in
                try? FileManager.default.removeItem(at: fileURL)
                if let error {
                    self?.injectStoreAction("exportFailed", message: error.localizedDescription)
                } else if completed {
                    self?.injectStoreAction("exportComplete")
                }
            }
        }

        guard let presenter = topViewController(from: webView.window?.rootViewController) else {
            injectStoreAction("exportFailed", message: "No presentation context is available.")
            return
        }
        presenter.present(activity, animated: true)
    }

    private func topViewController(from root: UIViewController?) -> UIViewController? {
        if let presented = root?.presentedViewController {
            return topViewController(from: presented)
        }
        if let navigation = root as? UINavigationController {
            return topViewController(from: navigation.visibleViewController)
        }
        if let tab = root as? UITabBarController {
            return topViewController(from: tab.selectedViewController)
        }
        return root
    }
}
