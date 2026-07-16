import SwiftUI

struct ContentView: View {
    @Environment(\.scenePhase) private var scenePhase
    @StateObject private var entitlementManager: EntitlementManager
    @StateObject private var storeManager: StoreManager
    @StateObject private var bridge: WebViewBridge

    init() {
        let entitlements = EntitlementManager()
        let store = StoreManager(entitlementManager: entitlements)
        _entitlementManager = StateObject(wrappedValue: entitlements)
        _storeManager = StateObject(wrappedValue: store)
        _bridge = StateObject(wrappedValue: WebViewBridge(storeManager: store))
    }

    var body: some View {
        WebViewContainer(
            bridge: bridge,
            hasPlus: entitlementManager.hasPlus,
            productDisplayPrice: storeManager.plusProduct?.displayPrice
        )
            .ignoresSafeArea()
            .task {
                await storeManager.start()
            }
            .onChange(of: entitlementManager.hasPlus) { hasPlus in
                bridge.injectPlusAccess(hasPlus)
            }
            .onChange(of: scenePhase) { phase in
                guard phase == .active else { return }
                Task {
                    await bridge.refreshAfterForeground()
                }
            }
    }
}
