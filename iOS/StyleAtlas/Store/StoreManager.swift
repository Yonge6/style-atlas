import Foundation
import OSLog
import StoreKit

enum StoreErrorCode: String {
    case operationInProgress
    case productUnavailable
    case productLoadTimeout
    case purchaseVerificationFailed
    case purchaseFailed
    case restoreFailed
    case noPurchaseToRestore
    case transactionUnverified
    case exportPayloadMissing
    case exportWriteFailed
    case presentationUnavailable
    case unknown
}

enum StoreActionResult {
    case purchased
    case pending
    case cancelled
    case restored
    case nothingToRestore
    case unavailable(StoreErrorCode, debugMessage: String?)
    case failed(StoreErrorCode, debugMessage: String?)
}

private struct StoreTimeoutError: Error {}

@MainActor
final class StoreManager: ObservableObject {
    static let plusProductID = "xiazishuo_style_atlas_plus_lifetime"

    @Published private(set) var plusProduct: Product?
    @Published private(set) var lastErrorCode: StoreErrorCode?

    var isOperationInFlight: Bool {
        storeOperationInFlight
    }

    var entitlementManagerHasPlus: Bool {
        entitlementManager.hasPlus
    }

    private let entitlementManager: EntitlementManager
    private let logger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "com.xiazishuo.styleatlas",
        category: "store"
    )
    private var updatesTask: Task<Void, Never>?
    private var storeOperationInFlight = false

    init(entitlementManager: EntitlementManager) {
        self.entitlementManager = entitlementManager
    }

    deinit {
        updatesTask?.cancel()
    }

    func start() async {
        logger.info("operation=start status=started product=\(Self.plusProductID, privacy: .public)")
        listenForTransactions()
        await refreshEntitlements()
        await loadProducts()
    }

    @discardableResult
    func loadProducts() async -> Bool {
        logger.info("operation=loadProducts status=started product=\(Self.plusProductID, privacy: .public)")
        do {
            plusProduct = try await withTimeout {
                try await Product.products(for: [Self.plusProductID]).first
            }
            guard plusProduct != nil else {
                recordFailure(
                    operation: "loadProducts",
                    code: .productUnavailable,
                    debugMessage: "Product.products returned no matching product."
                )
                return false
            }
            lastErrorCode = nil
            logger.info("operation=loadProducts status=succeeded product=\(Self.plusProductID, privacy: .public)")
            return true
        } catch is StoreTimeoutError {
            recordFailure(
                operation: "loadProducts",
                code: .productLoadTimeout,
                debugMessage: "Product loading exceeded the configured timeout."
            )
            return false
        } catch {
            recordFailure(
                operation: "loadProducts",
                code: .productUnavailable,
                debugMessage: error.localizedDescription
            )
            return false
        }
    }

    func purchasePlus() async -> StoreActionResult {
        guard !storeOperationInFlight else {
            logger.notice("operation=purchase status=blocked errorCode=\(StoreErrorCode.operationInProgress.rawValue, privacy: .public)")
            return .unavailable(.operationInProgress, debugMessage: nil)
        }
        storeOperationInFlight = true
        defer { storeOperationInFlight = false }

        guard let product = plusProduct else {
            guard await loadProducts(), let product = plusProduct else {
                let code = lastErrorCode ?? .productUnavailable
                return .unavailable(code, debugMessage: nil)
            }
            return await purchase(product)
        }
        return await purchase(product)
    }

    func restorePurchases() async -> StoreActionResult {
        guard !storeOperationInFlight else {
            logger.notice("operation=restore status=blocked errorCode=\(StoreErrorCode.operationInProgress.rawValue, privacy: .public)")
            return .unavailable(.operationInProgress, debugMessage: nil)
        }
        storeOperationInFlight = true
        defer { storeOperationInFlight = false }

        logger.info("operation=restore status=started product=\(Self.plusProductID, privacy: .public)")
        do {
            try await AppStore.sync()
            await refreshEntitlements()
            if entitlementManager.hasPlus {
                logger.info("operation=restore status=succeeded product=\(Self.plusProductID, privacy: .public)")
                return .restored
            }
            logger.info("operation=restore status=empty errorCode=\(StoreErrorCode.noPurchaseToRestore.rawValue, privacy: .public)")
            return .nothingToRestore
        } catch {
            recordFailure(
                operation: "restore",
                code: .restoreFailed,
                debugMessage: error.localizedDescription
            )
            return .failed(.restoreFailed, debugMessage: error.localizedDescription)
        }
    }

    private func purchase(_ product: Product) async -> StoreActionResult {
        logger.info("operation=purchase status=started product=\(product.id, privacy: .public)")
        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                guard case .verified(let transaction) = verification else {
                    recordFailure(
                        operation: "purchase",
                        code: .purchaseVerificationFailed,
                        debugMessage: "StoreKit returned an unverified purchase transaction."
                    )
                    return .failed(.purchaseVerificationFailed, debugMessage: nil)
                }
                guard transaction.productID == Self.plusProductID else {
                    recordFailure(
                        operation: "purchase",
                        code: .purchaseVerificationFailed,
                        debugMessage: "Verified transaction product ID did not match Plus."
                    )
                    await transaction.finish()
                    return .failed(.purchaseVerificationFailed, debugMessage: nil)
                }
                entitlementManager.hasPlus = transaction.revocationDate == nil
                await transaction.finish()
                guard entitlementManager.hasPlus else {
                    recordFailure(
                        operation: "purchase",
                        code: .purchaseVerificationFailed,
                        debugMessage: "Verified transaction was already revoked."
                    )
                    return .failed(.purchaseVerificationFailed, debugMessage: nil)
                }
                lastErrorCode = nil
                logger.info("operation=purchase status=succeeded product=\(product.id, privacy: .public)")
                return .purchased
            case .userCancelled:
                logger.info("operation=purchase status=cancelled product=\(product.id, privacy: .public)")
                return .cancelled
            case .pending:
                logger.info("operation=purchase status=pending product=\(product.id, privacy: .public)")
                return .pending
            @unknown default:
                recordFailure(
                    operation: "purchase",
                    code: .unknown,
                    debugMessage: "StoreKit returned an unknown purchase result."
                )
                return .failed(.unknown, debugMessage: nil)
            }
        } catch {
            recordFailure(
                operation: "purchase",
                code: .purchaseFailed,
                debugMessage: error.localizedDescription
            )
            return .failed(.purchaseFailed, debugMessage: error.localizedDescription)
        }
    }

    func refreshEntitlements() async {
        logger.info("operation=refreshEntitlements status=started product=\(Self.plusProductID, privacy: .public)")
        var hasPlus = false
        for await result in Transaction.currentEntitlements {
            guard case .verified(let transaction) = result else {
                recordFailure(
                    operation: "refreshEntitlements",
                    code: .transactionUnverified,
                    debugMessage: "StoreKit returned an unverified current entitlement."
                )
                continue
            }
            guard transaction.productID == Self.plusProductID else { continue }
            hasPlus = transaction.revocationDate == nil
            if !hasPlus {
                logger.notice("operation=refreshEntitlements status=revoked product=\(transaction.productID, privacy: .public)")
            }
        }
        entitlementManager.hasPlus = hasPlus
        logger.info("operation=refreshEntitlements status=completed entitlement=\(hasPlus, privacy: .public)")
    }

    private func listenForTransactions() {
        guard updatesTask == nil else { return }
        updatesTask = Task { [weak self] in
            for await result in Transaction.updates {
                guard let self else { return }
                guard case .verified(let transaction) = result else {
                    self.recordFailure(
                        operation: "transactionUpdate",
                        code: .transactionUnverified,
                        debugMessage: "StoreKit returned an unverified transaction update."
                    )
                    continue
                }
                self.logger.info("operation=transactionUpdate status=received product=\(transaction.productID, privacy: .public)")
                await transaction.finish()
                await self.refreshEntitlements()
            }
        }
    }

    private func recordFailure(operation: String, code: StoreErrorCode, debugMessage: String?) {
        lastErrorCode = code
        logger.error(
            "operation=\(operation, privacy: .public) status=failed errorCode=\(code.rawValue, privacy: .public) product=\(Self.plusProductID, privacy: .public)"
        )
#if DEBUG
        if let debugMessage {
            logger.debug("operation=\(operation, privacy: .public) debug=\(debugMessage, privacy: .private)")
        }
#endif
    }

    private func withTimeout<T>(
        seconds: UInt64 = 10,
        task: @escaping @Sendable () async throws -> T
    ) async throws -> T {
        try await withThrowingTaskGroup(of: T.self) { group in
            group.addTask {
                try await task()
            }
            group.addTask {
                try await Task.sleep(nanoseconds: seconds * 1_000_000_000)
                throw StoreTimeoutError()
            }

            guard let result = try await group.next() else {
                throw StoreTimeoutError()
            }
            group.cancelAll()
            return result
        }
    }
}
