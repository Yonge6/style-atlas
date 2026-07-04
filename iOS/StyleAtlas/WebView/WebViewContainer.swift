import SwiftUI
import WebKit

struct WebViewContainer: UIViewRepresentable {
    @ObservedObject var bridge: WebViewBridge
    let hasPlus: Bool

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        let runtimeConfigScript = """
        window.STYLE_ATLAS_RUNTIME_CONFIG = {
          nativeShell: true,
          externalGalleryEnabled: false
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
        bridge.injectPlusAccess(hasPlus)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(bridge: bridge, hasPlus: hasPlus)
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        private let bridge: WebViewBridge
        private let hasPlus: Bool

        init(bridge: WebViewBridge, hasPlus: Bool) {
            self.bridge = bridge
            self.hasPlus = hasPlus
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            bridge.injectPlusAccess(hasPlus)
        }
    }
}
