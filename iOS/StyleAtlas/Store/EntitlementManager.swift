import Foundation
import OSLog

@MainActor
final class EntitlementManager: ObservableObject {
    private let logger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "com.xiazishuo.styleatlas",
        category: "entitlement"
    )

    @Published var hasPlus = false {
        didSet {
            guard hasPlus != oldValue else { return }
            logger.info("status=changed entitlement=\(self.hasPlus, privacy: .public)")
        }
    }
}
