import SwiftUI
import UIKit
import UserNotifications

@MainActor
final class StyleAtlasAppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    static var pendingStyleID: String?

    static func routeStyle(_ styleID: String) {
        pendingStyleID = styleID
        NotificationCenter.default.post(name: .styleAtlasOpenStyle, object: styleID)
    }

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        return true
    }

    nonisolated func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound])
    }

    nonisolated func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let styleID = response.notification.request.content.userInfo["styleID"] as? String
        Task { @MainActor in
            if let styleID { Self.routeStyle(styleID) }
            completionHandler()
        }
    }
}

@main
struct StyleAtlasApp: App {
    @UIApplicationDelegateAdaptor(StyleAtlasAppDelegate.self) private var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    guard url.scheme == "styleatlas",
                          url.host == "style",
                          let styleID = url.pathComponents.last,
                          styleID != "/" else { return }
                    StyleAtlasAppDelegate.routeStyle(styleID)
                }
        }
    }
}
