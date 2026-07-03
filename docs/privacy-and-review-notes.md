# Privacy And Review Notes

## Privacy Policy Draft

Product names:
- 虾子曰 Style Atlas
- Xiazishuo Style Atlas

Current version privacy position:

- The app does not require login.
- The app does not collect user name, phone number, or email address.
- Saved styles are stored locally on the user's device.
- The app does not upload user-created content.
- The app does not sell user data.
- The app does not include third-party advertising.
- The current product is a visual style atlas and taste archive, not a social network or user-content platform.

Suggested privacy policy wording:

虾子曰 Style Atlas 尊重用户隐私。当前版本不需要登录，不收集姓名、手机号或邮箱。用户收藏的风格数据保存在本地设备中，不会上传到服务器。应用不出售用户数据，也不接入第三方广告。

Xiazishuo Style Atlas respects user privacy. The current version does not require login and does not collect your name, phone number, or email address. Saved style data is stored locally on your device and is not uploaded to a server. The app does not sell user data and does not include third-party advertising.

## If IAP Is Added Later

If Style Atlas Plus is added in a native iOS version:

- Purchase records are handled by Apple.
- The app should only read the purchase entitlement state needed to unlock Plus features.
- The app should not collect payment card information directly.
- The app should not direct users to external payment pages for unlocking digital content.
- The privacy policy should mention that purchases are processed through Apple In-App Purchase.

Suggested wording:

如果未来接入虾子曰 Style Atlas Plus 内购，购买流程和购买记录将由 Apple 处理。应用只会读取必要的购买状态，用于解锁 Plus 功能。

If Xiazishuo Style Atlas Plus is added, purchases and purchase records will be handled by Apple. The app will only read the purchase status needed to unlock Plus features.

## If Analytics Is Added Later

If analytics is added in a future version:

- Clearly state whether Apple analytics or third-party analytics tools are used.
- Explain what events are collected.
- Avoid collecting personal identity data unless necessary.
- Update App Store privacy answers.
- Update the privacy policy before release.

Examples of analytics questions to answer before release:

- Are style views counted?
- Are searches counted?
- Are export actions counted?
- Is device information collected?
- Is any data linked to the user's identity?
- Is any third-party SDK used?

## App Review Notes

Important review guidance:

- The current web prototype shows Plus as Coming Soon and does not connect to real payment.
- A real iOS version that unlocks digital content must use Apple In-App Purchase.
- Do not guide users to an external webpage to pay for Plus inside the app.
- Do not present the product as an AI prompt generator as the core promise.
- Do not promise image generation, because the product's core value is a visual style atlas, daily aesthetic learning, saved style archives, and exportable style cards.
- Keep "Style Expression" as an aid for describing visual style, not as a full prompt-generation product.
- Historical art movements can be introduced and studied directly.
- For contemporary studios, IPs, or living creators, use general visual traits instead of encouraging users to copy a complete recognizable style.

Suggested review note:

虾子曰 Style Atlas 是一个视觉风格学习和资料库应用。它帮助用户学习 120 种视觉风格、建立审美词库、收藏风格卡片并保存风格资料。当前版本不提供真实支付，不接入第三方支付，也不承诺生成图片。未来如在 iOS 版本中解锁 Plus 数字内容，将使用 Apple In-App Purchase。

Xiazishuo Style Atlas is a visual style learning and archive app. It helps users learn 120 visual styles, build a taste vocabulary, save style cards, and export style references. The current version does not include real payment, does not use third-party payment, and does not promise image generation. If Plus digital content is unlocked in a future iOS version, it will use Apple In-App Purchase.

## Current Review Risk Checklist

Current low-risk items:

- No login.
- No user-generated public content.
- No direct payment.
- No third-party ads.
- No backend account system.
- No image generation claim.

Items to re-check before native iOS submission:

- Whether external links are visible inside the app.
- Whether Plus is still marked as Coming Soon or connected to StoreKit 2.
- Whether all digital unlocks use Apple In-App Purchase.
- Whether screenshot and description copy match the actual app behavior.
- Whether offline bundle assets are complete.
- Whether App Store privacy answers match the actual implementation.

