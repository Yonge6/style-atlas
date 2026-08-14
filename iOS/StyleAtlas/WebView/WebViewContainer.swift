import SwiftUI
import WebKit

struct WebViewContainer: UIViewRepresentable {
    @ObservedObject var bridge: WebViewBridge
    let hasPlus: Bool
    let productDisplayPrices: [String: String]
    let textScale: Double

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        let runtimeConfigScript = """
        window.STYLE_ATLAS_RUNTIME_CONFIG = {
          nativeShell: true,
          externalGalleryEnabled: false,
          submissionMode: "iap",
          publicBaseURL: "https://yonge6.github.io/style-atlas/"
        };
        """
        config.userContentController.addUserScript(WKUserScript(
            source: runtimeConfigScript,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        ))
        config.userContentController.add(bridge, name: "styleAtlas")

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = false
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 8 / 255, green: 8 / 255, blue: 6 / 255, alpha: 1)
        webView.scrollView.backgroundColor = webView.backgroundColor
        webView.scrollView.keyboardDismissMode = .interactive
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.delaysContentTouches = false
        webView.scrollView.canCancelContentTouches = true
        webView.scrollView.pinchGestureRecognizer?.isEnabled = true
        webView.allowsLinkPreview = false
        bridge.webView = webView

        guard let url = Bundle.main.resourceURL?.appendingPathComponent("Web/index.html"),
              FileManager.default.fileExists(atPath: url.path) else {
            webView.loadHTMLString("<h1>Missing Web/index.html</h1><p>Run sync-web-resources.sh and add Resources/Web to Copy Bundle Resources.</p>", baseURL: nil)
            return webView
        }

        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.hasPlus = hasPlus
        context.coordinator.productDisplayPrices = productDisplayPrices
        context.coordinator.textScale = textScale
        bridge.injectPlusAccess(hasPlus)
        bridge.injectProductPrices(productDisplayPrices)
        bridge.injectTextScale(textScale)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(
            bridge: bridge,
            hasPlus: hasPlus,
            productDisplayPrices: productDisplayPrices,
            textScale: textScale
        )
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        private let bridge: WebViewBridge
        var hasPlus: Bool
        var productDisplayPrices: [String: String]
        var textScale: Double

        init(bridge: WebViewBridge, hasPlus: Bool, productDisplayPrices: [String: String], textScale: Double) {
            self.bridge = bridge
            self.hasPlus = hasPlus
            self.productDisplayPrices = productDisplayPrices
            self.textScale = textScale
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            bridge.injectPlusAccess(hasPlus)
            bridge.injectProductPrices(productDisplayPrices)
            bridge.injectTextScale(textScale)
        }
    }
}
