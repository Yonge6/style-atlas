import Foundation
import StoreKit

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

    func loadProducts() async {
        do {
            plusProduct = try await Product.products(for: [Self.plusProductID]).first
        } catch {
            lastError = error.localizedDescription
        }
    }

    func purchasePlus() async {
        guard let product = plusProduct else {
            await loadProducts()
            guard let product = plusProduct else { return }
            await purchase(product)
            return
        }
        await purchase(product)
    }

    func restorePurchases() async {
        do {
            try await AppStore.sync()
            await refreshEntitlements()
        } catch {
            lastError = error.localizedDescription
        }
    }

    private func purchase(_ product: Product) async {
        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                if case .verified(let transaction) = verification {
                    entitlementManager.hasPlus = transaction.productID == Self.plusProductID
                    await transaction.finish()
                } else {
                    lastError = "Unverified transaction"
                }
            case .userCancelled:
                break
            case .pending:
                lastError = "Purchase pending"
            @unknown default:
                lastError = "Unknown purchase result"
            }
        } catch {
            lastError = error.localizedDescription
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
