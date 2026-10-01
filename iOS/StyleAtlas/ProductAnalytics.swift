import Foundation
import StoreKit
import FirebaseCore
import FirebaseAnalytics

/// Opt-in, production-only. No notes, search text or transaction IDs.
@MainActor
final class ProductAnalytics {
    static let shared = ProductAnalytics()
    private var enabled = false
    private var configured = false
    private var generation = 0
    private var queue: [(String, [String: Any])] = []
    private let events: Set<String> = ["visit", "screen", "style_view", "active_time", "reading_time", "guided_start", "guided_step", "guided_complete", "favorite", "reflection_saved", "search", "filter", "share_request", "share_success", "share_preview", "share_cancel", "share_error", "copy_success", "save_request", "file_download", "photo_saved", "export_error", "paywall_view", "purchase_request", "purchase_result", "restore_request", "restore_result", "download_click", "banner_close"]
    func consent(_ granted: Bool) {
        generation += 1
        let current = generation
        enabled = granted
        queue.removeAll()
        if configured {
            Analytics.setConsent([.analyticsStorage: granted ? .granted : .denied, .adStorage: .denied, .adUserData: .denied, .adPersonalization: .denied])
            Analytics.setAnalyticsCollectionEnabled(granted)
            if !granted { Analytics.resetAnalyticsData() }
            return
        }
#if DEBUG || targetEnvironment(simulator)
        enabled = false
#else
        guard granted else { return }
        Task {
            guard let path = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist"),
                  let options = FirebaseOptions(contentsOfFile: path),
                  options.bundleID == Bundle.main.bundleIdentifier,
                  case .verified(let transaction) = try? await AppTransaction.shared,
                  transaction.environment == .production else {
                if current == generation { enabled = false; queue.removeAll() }
                return
            }
            guard current == generation, enabled else { return }
            FirebaseApp.configure(options: options)
            configured = true
            Analytics.setConsent([.analyticsStorage: .granted, .adStorage: .denied, .adUserData: .denied, .adPersonalization: .denied])
            Analytics.setAnalyticsCollectionEnabled(true)
            let pending = queue; queue.removeAll()
            for (name, fields) in pending { record(name, fields) }
        }
#endif
    }
    func record(_ name: String, _ fields: [String: Any] = [:]) {
        let short = name.hasPrefix("atlas_v1_") ? String(name.dropFirst(9)) : name
        guard enabled, events.contains(short) else { return }
        let allowed: Set<String> = ["style_id", "screen", "action", "step", "value", "result_count", "plan", "result", "language", "placement"]
        var safe: [String: Any] = [:]
        for (key, value) in fields where allowed.contains(key) {
            if let string = value as? String, string.range(of: "^[a-zA-Z0-9_-]{1,80}$", options: .regularExpression) != nil { safe[key] = string }
            else if let number = value as? NSNumber, number.doubleValue.isFinite, (0...100000).contains(number.doubleValue) { safe[key] = number }
        }
        guard configured else { if queue.count < 50 { queue.append((short, safe)) }; return }
        safe["schema_version"] = 1; safe["surface"] = "ios"
        if let styleID = safe["style_id"] { safe["content_id"] = styleID; safe["content_type"] = "art_style" }
        Analytics.logEvent("atlas_v1_" + short, parameters: safe)
    }
}
