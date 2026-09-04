import Foundation
import OSLog
import UIKit
import UserNotifications

struct DailyStyleNotificationStatus: Codable, Equatable {
    enum Authorization: String, Codable {
        case notDetermined
        case denied
        case authorized
        case unavailable
    }

    var authorization: Authorization = .notDetermined
    var enabled = false
    var hour = 9
}

@MainActor
final class DailyStyleNotificationManager: ObservableObject {
    @Published private(set) var status = DailyStyleNotificationStatus()

    private let center: UNUserNotificationCenter
    private let defaults: UserDefaults
    private let calendar: Calendar
    private let styles: [DailyStyle]
    private let enabledKey = "styleAtlas.dailyReminderEnabled"
    private let requestPrefix = "style-atlas.daily."
    private let logger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "com.xiazishuo.styleatlas",
        category: "daily-reminder"
    )

    init(
        center: UNUserNotificationCenter = .current(),
        defaults: UserDefaults = .standard,
        calendar inputCalendar: Calendar = .autoupdatingCurrent,
        bundle: Bundle = .main
    ) {
        self.center = center
        self.defaults = defaults
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = inputCalendar.timeZone
        self.calendar = calendar
        self.styles = DailyStyleCatalog.load(bundle: bundle)
    }

    func refreshAndReschedule() async {
        let settings = await center.notificationSettings()
        updateStatus(from: settings.authorizationStatus)
        if status.enabled {
            await scheduleUpcomingNotifications()
        }
    }

    func setEnabled(_ enabled: Bool) async {
        if !enabled {
            defaults.set(false, forKey: enabledKey)
            await removeScheduledNotifications()
            status.enabled = false
            logger.info("operation=disable status=complete")
            return
        }

        let settings = await center.notificationSettings()
        let granted: Bool
        switch settings.authorizationStatus {
        case .authorized, .provisional, .ephemeral:
            granted = true
        case .notDetermined:
            do {
                granted = try await center.requestAuthorization(options: [.alert, .sound])
            } catch {
                logger.error("operation=authorize status=failed")
                status = DailyStyleNotificationStatus(authorization: .unavailable, enabled: false)
                return
            }
        case .denied:
            granted = false
        @unknown default:
            granted = false
        }

        guard granted else {
            defaults.set(false, forKey: enabledKey)
            status = DailyStyleNotificationStatus(authorization: .denied, enabled: false)
            logger.notice("operation=authorize status=denied")
            return
        }

        defaults.set(true, forKey: enabledKey)
        status = DailyStyleNotificationStatus(authorization: .authorized, enabled: true)
        await scheduleUpcomingNotifications()
        logger.info("operation=enable status=complete hour=9")
    }

    func openSystemSettings() {
        guard let url = URL(string: UIApplication.openNotificationSettingsURLString) else { return }
        UIApplication.shared.open(url)
    }

    private func updateStatus(from authorizationStatus: UNAuthorizationStatus) {
        let wantsReminders = defaults.bool(forKey: enabledKey)
        switch authorizationStatus {
        case .authorized, .provisional, .ephemeral:
            status = DailyStyleNotificationStatus(authorization: .authorized, enabled: wantsReminders)
        case .denied:
            defaults.set(false, forKey: enabledKey)
            status = DailyStyleNotificationStatus(authorization: .denied, enabled: false)
        case .notDetermined:
            status = DailyStyleNotificationStatus(authorization: .notDetermined, enabled: false)
        @unknown default:
            status = DailyStyleNotificationStatus(authorization: .unavailable, enabled: false)
        }
    }

    private func scheduleUpcomingNotifications(now: Date = Date()) async {
        await removeScheduledNotifications()
        var scheduledCount = 0
        for dayOffset in 0...30 {
            guard let day = calendar.date(byAdding: .day, value: dayOffset, to: now),
                  let fireDate = calendar.date(
                    bySettingHour: 9,
                    minute: 0,
                    second: 0,
                    of: day
                  ), fireDate > now else { continue }

            let style = DailyStyleCatalog.style(for: fireDate, styles: styles, calendar: calendar)
            let components = calendar.dateComponents([.year, .month, .day, .hour, .minute], from: fireDate)
            let content = UNMutableNotificationContent()
            if Locale.preferredLanguages.first?.lowercased().hasPrefix("zh") == true {
                content.title = "今日风格 · \(style.chineseName)"
                content.body = "用 3 分钟看懂一种新的视觉语言。"
            } else {
                content.title = "Today's style · \(style.englishName)"
                content.body = "Take three minutes to understand a new visual language."
            }
            content.sound = .default
            content.threadIdentifier = "style-atlas.daily"
            content.userInfo = ["styleID": style.id]

            let identifier = requestPrefix + Self.dateKey(for: fireDate, calendar: calendar)
            let request = UNNotificationRequest(
                identifier: identifier,
                content: content,
                trigger: UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
            )
            do {
                try await center.add(request)
                scheduledCount += 1
                if scheduledCount == 30 { break }
            } catch {
                logger.error("operation=schedule status=failed offset=\(dayOffset, privacy: .public)")
            }
        }
    }

    private func removeScheduledNotifications() async {
        let pending = await center.pendingNotificationRequests()
        let identifiers = pending.map(\.identifier).filter { $0.hasPrefix(requestPrefix) }
        center.removePendingNotificationRequests(withIdentifiers: identifiers)
    }

    private static func dateKey(for date: Date, calendar: Calendar) -> String {
        let components = calendar.dateComponents([.year, .month, .day], from: date)
        return String(
            format: "%04d-%02d-%02d",
            components.year ?? 1970,
            components.month ?? 1,
            components.day ?? 1
        )
    }
}
