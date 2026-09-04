import SwiftUI
import UIKit
import WidgetKit

struct DailyStyleEntry: TimelineEntry {
    let date: Date
    let style: DailyStyle
}

struct DailyStyleProvider: TimelineProvider {
    private let styles = DailyStyleCatalog.load()

    func placeholder(in context: Context) -> DailyStyleEntry {
        DailyStyleEntry(date: Date(), style: .fallback)
    }

    func getSnapshot(in context: Context, completion: @escaping (DailyStyleEntry) -> Void) {
        completion(entry(for: Date()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<DailyStyleEntry>) -> Void) {
        let now = Date()
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .autoupdatingCurrent
        let nextMidnight = calendar.nextDate(
            after: now,
            matching: DateComponents(hour: 0, minute: 0),
            matchingPolicy: .nextTime
        ) ?? calendar.date(byAdding: .day, value: 1, to: now) ?? now.addingTimeInterval(86_400)

        var entries = [entry(for: now)]
        for offset in 0..<7 {
            guard let date = calendar.date(byAdding: .day, value: offset, to: nextMidnight) else { continue }
            entries.append(entry(for: date))
        }
        completion(Timeline(entries: entries, policy: .atEnd))
    }

    private func entry(for date: Date) -> DailyStyleEntry {
        DailyStyleEntry(date: date, style: DailyStyleCatalog.style(for: date, styles: styles))
    }
}

struct DailyStyleWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let entry: DailyStyleEntry

    var body: some View {
        Group {
            if #available(iOSApplicationExtension 17.0, *) {
                content.containerBackground(Color(uiColor: .systemBackground), for: .widget)
            } else {
                content.background(Color(uiColor: .systemBackground))
            }
        }
        .widgetURL(URL(string: "styleatlas://style/\(entry.style.id)"))
    }

    private var content: some View {
        HStack(spacing: family == .systemMedium ? 14 : 0) {
            if family == .systemMedium {
                thumbnail
                    .frame(width: 112)
            }
            VStack(alignment: .leading, spacing: 7) {
                Label("今日风格", systemImage: "sparkles")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                Spacer(minLength: 2)
                Text(entry.style.chineseName)
                    .font(.headline)
                    .foregroundStyle(.primary)
                    .lineLimit(2)
                Text(entry.style.englishName)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
                Spacer(minLength: 2)
                Text("STYLE ATLAS")
                    .font(.caption2.weight(.bold))
                    .tracking(1.2)
                    .foregroundStyle(Color(uiColor: .tertiaryLabel))
            }
            if family == .systemSmall {
                Spacer(minLength: 0)
            }
        }
        .padding(14)
        .background(alignment: .bottomTrailing) {
            if family == .systemSmall {
                thumbnail
                    .frame(width: 76, height: 104)
                    .opacity(0.2)
                    .offset(x: 16, y: 22)
            }
        }
        .clipped()
    }

    private var thumbnail: some View {
        Group {
            if let image = widgetImage {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
            } else {
                LinearGradient(
                    colors: [Color(red: 0.91, green: 0.80, blue: 0.50), .black],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private var widgetImage: UIImage? {
        guard let url = Bundle.main.url(
            forResource: entry.style.id,
            withExtension: "jpg",
            subdirectory: "Thumbnails"
        ) else { return nil }
        return UIImage(contentsOfFile: url.path)
    }
}

struct DailyStyleWidget: Widget {
    let kind = "DailyStyleWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: DailyStyleProvider()) { entry in
            DailyStyleWidgetView(entry: entry)
        }
        .configurationDisplayName("今日风格")
        .description("每天认识一种新的艺术与设计风格。")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
