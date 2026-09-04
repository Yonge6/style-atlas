import SwiftUI
import UIKit
import UserNotifications

final class StyleAtlasAppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        return true
    }

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound])
    }

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        if let styleID = response.notification.request.content.userInfo["styleID"] as? String {
            NotificationCenter.default.post(name: .styleAtlasOpenStyle, object: styleID)
        }
        completionHandler()
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
                    NotificationCenter.default.post(name: .styleAtlasOpenStyle, object: styleID)
                }
        }
    }
}
