import Foundation
import StoreKit

enum StoreActionResult {
    case purchased
    case pending
    case cancelled
    case restored
    case nothingToRestore
    case unavailable(String)
    case failed(String)
}

@MainActor
final class StoreManager: ObservableObject {
    static let plusProductID = "xiazishuo_style_atlas_plus_lifetime"

    @Published private(set) var plusProduct: Product?
    @Published private(set) var lastError: String?

    private let entitlementManager: EntitlementManager
    private var updatesTask: Task<Void, Never>?

    init(entitlementManager: EntitlementManager) {
        self.entitlementManager = entitlementManager
    }

    deinit {
        updatesTask?.cancel()
    }

    func start() async {
        await loadProducts()
        await refreshEntitlements()
        listenForTransactions()
    }

    @discardableResult
    func loadProducts() async -> Bool {
        do {
            plusProduct = try await Product.products(for: [Self.plusProductID]).first
            if plusProduct == nil {
                lastError = "The Plus product is not available from the App Store."
                return false
            }
            lastError = nil
            return true
        } catch {
            lastError = error.localizedDescription
            return false
        }
    }

    func purchasePlus() async -> StoreActionResult {
        guard let product = plusProduct else {
            guard await loadProducts(), let product = plusProduct else {
                return .unavailable(lastError ?? "The Plus product is not available from the App Store.")
            }
            return await purchase(product)
        }
        return await purchase(product)
    }

    func restorePurchases() async -> StoreActionResult {
        do {
            try await AppStore.sync()
            await refreshEntitlements()
            return entitlementManager.hasPlus ? .restored : .nothingToRestore
        } catch {
            lastError = error.localizedDescription
            return .failed(error.localizedDescription)
        }
    }

    private func purchase(_ product: Product) async -> StoreActionResult {
        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                if case .verified(let transaction) = verification {
                    entitlementManager.hasPlus = transaction.productID == Self.plusProductID
                    await transaction.finish()
                    return entitlementManager.hasPlus ? .purchased : .failed("The completed purchase did not match Style Atlas Plus.")
                } else {
                    lastError = "Unverified transaction"
                    return .failed("The App Store could not verify this purchase.")
                }
            case .userCancelled:
                return .cancelled
            case .pending:
                lastError = "Purchase pending"
                return .pending
            @unknown default:
                lastError = "Unknown purchase result"
                return .failed("The App Store returned an unknown purchase result.")
            }
        } catch {
            lastError = error.localizedDescription
            return .failed(error.localizedDescription)
        }
    }

    func refreshEntitlements() async {
        var hasPlus = false
        for await result in Transaction.currentEntitlements {
            guard case .verified(let transaction) = result else {
                lastError = "Unverified entitlement"
                continue
            }
            if transaction.productID == Self.plusProductID {
                hasPlus = true
            }
        }
        entitlementManager.hasPlus = hasPlus
    }

    private func listenForTransactions() {
        guard updatesTask == nil else { return }
        updatesTask = Task { [weak self] in
            for await result in Transaction.updates {
                guard let self else { return }
                guard case .verified(let transaction) = result else {
                    await MainActor.run { self.lastError = "Unverified transaction update" }
                    continue
                }
                if transaction.productID == Self.plusProductID {
                    await MainActor.run { self.entitlementManager.hasPlus = true }
                }
                await transaction.finish()
            }
        }
    }
}
