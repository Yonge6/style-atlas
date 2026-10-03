# Style Atlas share-image fix

## Root cause

The live H5 referenced `assets/styles/style-atlas-h5-qr.png` while the production file was missing. Main style artwork continued to load, but share-card rendering failed when `drawShareQRCode` decoded the absent QR asset and surfaced the localized image-read error.

## Fix

- Published the missing QR image and added cache versions to the QR request and `game.js` script URL.
- Made QR rendering resilient: if the QR image cannot be decoded, the card still renders with a compact Style Atlas URL panel instead of failing the entire share operation.
- Kept Web and bundled native Web sources synchronized. The already-submitted App Store build 21 archive and review submission were not changed.

## Verification

- Three focused browser tests passed: native bundled-image handling, normal WeChat share preview, and missing-QR fallback.
- Production HTTPS returned the QR image as `image/png`; SHA-256 matched source: `050d18a5ed38487555b808b6711ca560a6c6411273ee322c503acc525f569cbc`.
- Production `index.html` loads `game.js?v=20261003-share`.
- Live Manga share interaction generated a PNG data URL, displayed the long-press WeChat guidance, hid duplicate save/share controls, and visually showed the complete card and QR code.
- Nginx configuration passed before and after deployment. Public hashes for all three deployed files matched source.

## Deployment

- Root: `/srv/wonderelian/style-atlas.wonderelian.com`
- Backup: `/srv/wonderelian/backups/style-atlas-share-fix-20261003`
- Stage: `/srv/wonderelian/releases/style-atlas-share-fix-20261003`
- Scoped files: `index.html`, `game.js`, `assets/styles/style-atlas-h5-qr.png`
