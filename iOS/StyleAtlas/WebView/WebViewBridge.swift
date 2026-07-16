import OSLog
import UIKit
import WebKit

@MainActor
final class WebViewBridge: NSObject, ObservableObject, WKScriptMessageHandler {
    weak var webView: WKWebView?
    var storeManager: StoreManager

    private let bridgeLogger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "com.xiazishuo.styleatlas",
        category: "bridge"
    )
    private let exportLogger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "com.xiazishuo.styleatlas",
        category: "export"
    )

    init(storeManager: StoreManager) {
        self.storeManager = storeManager
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "styleAtlas",
              let body = message.body as? [String: Any],
              let type = body["type"] as? String else {
            bridgeLogger.error("operation=receive status=ignored errorCode=\(StoreErrorCode.unknown.rawValue, privacy: .public)")
            return
        }

        bridgeLogger.info("operation=\(type, privacy: .public) status=received")
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
                injectStoreAction(
                    "exportFailed",
                    errorCode: .exportPayloadMissing,
                    debugMessage: "Image action message did not include a payload dictionary."
                )
                return
            }
            presentImageActivity(payload: payload)
        default:
            bridgeLogger.notice("operation=\(type, privacy: .public) status=unsupported")
        }
    }

    func injectPlusAccess(_ hasPlus: Bool) {
        bridgeLogger.info("operation=setPlusAccess status=injecting entitlement=\(hasPlus, privacy: .public)")
        let js = "window.StyleAtlasNativeBridge?.setPlusAccess(\(hasPlus ? "true" : "false"))"
        webView?.evaluateJavaScript(js)
    }

    func injectProductPrice(_ price: String?) {
        guard let data = try? JSONEncoder().encode(price ?? ""),
              let value = String(data: data, encoding: .utf8) else { return }
        bridgeLogger.info("operation=setProductPrice status=injecting product=\(StoreManager.plusProductID, privacy: .public)")
        webView?.evaluateJavaScript("window.StyleAtlasNativeBridge?.setProductPrice(\(value))")
    }

    func refreshAfterForeground() async {
        bridgeLogger.info("operation=foregroundRefresh status=started")
        await storeManager.refreshEntitlements()
        injectPlusAccess(storeManager.entitlementManagerHasPlus)
        if !storeManager.isOperationInFlight {
            injectStoreAction("idle")
        }
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
            injectStoreAction("nothingToRestore", errorCode: .noPurchaseToRestore)
        case .unavailable(let code, let debugMessage):
            injectStoreAction("unavailable", errorCode: code, debugMessage: debugMessage)
        case .failed(let code, let debugMessage):
            injectStoreAction("failed", errorCode: code, debugMessage: debugMessage)
        }
    }

    private func injectStoreAction(
        _ status: String,
        errorCode: StoreErrorCode? = nil,
        debugMessage: String? = nil
    ) {
#if DEBUG
        if let debugMessage {
            bridgeLogger.debug(
                "operation=setStoreAction debug=\(debugMessage, privacy: .private)"
            )
        }
#endif
        guard let statusValue = jsonString(status),
              let errorCodeValue = jsonString(errorCode?.rawValue ?? ""),
              let debugValue = jsonString("") else { return }
        bridgeLogger.info(
            "operation=setStoreAction status=\(status, privacy: .public) errorCode=\(errorCode?.rawValue ?? "none", privacy: .public)"
        )
        webView?.evaluateJavaScript(
            "window.StyleAtlasNativeBridge?.setStoreAction(\(statusValue), \(errorCodeValue), \(debugValue))"
        )
    }

    private func presentImageActivity(payload: [String: Any]) {
        guard let dataURL = payload["dataURL"] as? String,
              let commaIndex = dataURL.firstIndex(of: ","),
              let data = Data(base64Encoded: String(dataURL[dataURL.index(after: commaIndex)...])),
              let webView else {
            exportLogger.error("operation=prepare status=failed errorCode=\(StoreErrorCode.exportPayloadMissing.rawValue, privacy: .public)")
            injectStoreAction("exportFailed", errorCode: .exportPayloadMissing)
            return
        }

        let requestedName = (payload["filename"] as? String) ?? "style-atlas.png"
        let safeName = requestedName.replacingOccurrences(of: "/", with: "-")
        let fileURL = FileManager.default.temporaryDirectory.appendingPathComponent(safeName)

        do {
            try data.write(to: fileURL, options: .atomic)
        } catch {
            exportLogger.error("operation=write status=failed errorCode=\(StoreErrorCode.exportWriteFailed.rawValue, privacy: .public)")
            injectStoreAction(
                "exportFailed",
                errorCode: .exportWriteFailed,
                debugMessage: error.localizedDescription
            )
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
                    self?.exportLogger.error(
                        "operation=present status=failed errorCode=\(StoreErrorCode.presentationUnavailable.rawValue, privacy: .public)"
                    )
                    self?.injectStoreAction(
                        "exportFailed",
                        errorCode: .presentationUnavailable,
                        debugMessage: error.localizedDescription
                    )
                } else if completed {
                    self?.exportLogger.info("operation=present status=completed")
                    self?.injectStoreAction("exportComplete")
                }
            }
        }

        guard let presenter = topViewController(from: webView.window?.rootViewController) else {
            exportLogger.error("operation=present status=failed errorCode=\(StoreErrorCode.presentationUnavailable.rawValue, privacy: .public)")
            injectStoreAction("exportFailed", errorCode: .presentationUnavailable)
            try? FileManager.default.removeItem(at: fileURL)
            return
        }
        exportLogger.info("operation=present status=started")
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

    private func jsonString(_ value: String) -> String? {
        guard let data = try? JSONEncoder().encode(value) else { return nil }
        return String(data: data, encoding: .utf8)
    }
}
