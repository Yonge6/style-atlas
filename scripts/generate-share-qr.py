from pathlib import Path

import qrcode
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "brand" / "style-atlas-site-qr.png"
URL = "https://style-atlas.wonderelian.com/"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=16,
    border=4,
)
qr.add_data(URL)
qr.make(fit=True)
image = qr.make_image(fill_color="#0a0907", back_color="#fffaf0").convert("RGB")
image = image.resize((512, 512), Image.Resampling.NEAREST)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, optimize=True)
print(f"generated {OUTPUT.relative_to(ROOT)} -> {URL}")
