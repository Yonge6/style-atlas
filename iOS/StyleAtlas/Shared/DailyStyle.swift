import Foundation

struct DailyStyle: Codable, Hashable {
    let id: String
    let englishName: String
    let chineseName: String
    let category: String
    let thumbnail: String

    static let fallback = DailyStyle(
        id: "swiss-style",
        englishName: "Swiss Style",
        chineseName: "瑞士国际主义风格",
        category: "poster",
        thumbnail: "swiss-style.jpg"
    )
}

enum DailyStyleCatalog {
    static func load(bundle: Bundle = .main) -> [DailyStyle] {
        guard let url = bundle.url(forResource: "DailyStyles", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let styles = try? JSONDecoder().decode([DailyStyle].self, from: data),
              !styles.isEmpty else {
            return [.fallback]
        }
        return styles
    }

    static func style(
        for date: Date,
        styles: [DailyStyle],
        calendar inputCalendar: Calendar = .autoupdatingCurrent
    ) -> DailyStyle {
        guard !styles.isEmpty else { return .fallback }
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = inputCalendar.timeZone
        let components = calendar.dateComponents([.year, .month, .day], from: date)
        let key = String(
            format: "%04d-%02d-%02d",
            components.year ?? 1970,
            components.month ?? 1,
            components.day ?? 1
        )
        return styles[index(for: key, count: styles.count)]
    }

    static func index(for dateKey: String, count: Int) -> Int {
        guard count > 0 else { return 0 }
        var hash: UInt32 = 0
        for scalar in dateKey.unicodeScalars {
            hash = hash &* 31 &+ UInt32(scalar.value)
        }
        return Int(hash % UInt32(count))
    }
}

extension Notification.Name {
    static let styleAtlasOpenStyle = Notification.Name("StyleAtlasOpenStyle")
}
