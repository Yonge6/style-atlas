import SwiftUI

struct ContentView: View {
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @StateObject private var entitlementManager: EntitlementManager
    @StateObject private var storeManager: StoreManager
    @StateObject private var notificationManager: DailyStyleNotificationManager
    @StateObject private var bridge: WebViewBridge

    init() {
        let entitlements = EntitlementManager()
        let store = StoreManager(entitlementManager: entitlements)
        let notifications = DailyStyleNotificationManager()
        _entitlementManager = StateObject(wrappedValue: entitlements)
        _storeManager = StateObject(wrappedValue: store)
        _notificationManager = StateObject(wrappedValue: notifications)
        _bridge = StateObject(wrappedValue: WebViewBridge(
            storeManager: store,
            notificationManager: notifications
        ))
    }

    var body: some View {
        WebViewContainer(
            bridge: bridge,
            hasPlus: entitlementManager.hasPlus,
            productDisplayPrices: storeManager.productDisplayPrices,
            textScale: textScale,
            notificationStatus: notificationManager.status
        )
            .ignoresSafeArea()
            .task {
                await storeManager.start()
                await notificationManager.refreshAndReschedule()
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
            .onReceive(NotificationCenter.default.publisher(for: .styleAtlasOpenStyle)) { notification in
                guard let styleID = notification.object as? String else { return }
                bridge.openStyle(styleID)
            }
    }

    private var textScale: Double {
        switch dynamicTypeSize {
        case .xSmall: 0.92
        case .small: 0.95
        case .medium: 0.98
        case .large: 1
        case .xLarge: 1.12
        case .xxLarge: 1.18
        case .xxxLarge: 1.24
        case .accessibility1: 1.3
        case .accessibility2: 1.36
        case .accessibility3: 1.42
        case .accessibility4: 1.48
        case .accessibility5: 1.54
        @unknown default: 1
        }
    }
}
