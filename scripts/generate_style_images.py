import ast
import random
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "styles"
OUT.mkdir(parents=True, exist_ok=True)

source = (ROOT / "game.js").read_text()
match = re.search(r"const rawStyles = (\[.*?\n  \]);", source, re.S)
styles = ast.literal_eval(match.group(1))

palettes = {
    "poster": ["#f2e6c7", "#12100c", "#d5392f", "#d7a43f", "#ffffff"],
    "painting": ["#1d2630", "#dec486", "#8f3e2e", "#456b65", "#f4ead2"],
    "master": ["#101014", "#f1c85b", "#2b5d8a", "#b33d32", "#f5ead0"],
    "modern": ["#0e0f12", "#e64b3c", "#f2d25c", "#3e73b8", "#f7f1dc"],
    "asian": ["#f2e4ca", "#183d52", "#ba3b2f", "#d5a34a", "#1b1712"],
    "folk": ["#17120d", "#d6a84b", "#7d2f27", "#2e6a5b", "#f0dfb8"],
    "animation": ["#10203a", "#f0c56a", "#dd6f5e", "#8dc1d2", "#f9efd7"],
    "illustration": ["#f4ead8", "#1b1b1b", "#6aa084", "#d2a14b", "#c75a4a"],
}


def font(size, bold=False):
    names = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/PingFang.ttc",
    ]
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()


def font_cjk(size):
    for name in ["/System/Library/Fonts/PingFang.ttc", "/System/Library/Fonts/STHeiti Light.ttc"]:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return font(size)


def wrap(draw, text, fnt, width):
    words = text.replace("/", " / ").split()
    lines, line = [], ""
    for word in words:
        test = f"{line} {word}".strip()
        if draw.textlength(test, font=fnt) > width and line:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)
    return lines[:3]


for i, (slug, en, zh, cat, _pinyin, keywords) in enumerate(styles, 1):
    rng = random.Random(slug)
    colors = palettes[cat][:]
    rng.shuffle(colors)
    img = Image.new("RGB", (900, 1500), colors[0])
    draw = ImageDraw.Draw(img)

    if cat == "poster":
        for x in range(60 + rng.randrange(40), 860, rng.randrange(112, 176)):
            draw.line((x, 80, x, 1400), fill=colors[1], width=3)
        for _ in range(4):
            x = rng.randrange(70, 650)
            y = rng.randrange(120, 1020)
            w = rng.randrange(160, 390)
            h = rng.randrange(140, 360)
            draw.rectangle((x, y, min(830, x + w), min(1350, y + h)), fill=colors[rng.randrange(1, 5)])
    elif cat == "painting":
        for r in range(920, 110, -90):
            draw.ellipse((450 - r, 350 - r // 2, 450 + r, 1140 + r // 2), outline=colors[(r // 90) % 5], width=24)
        draw.polygon([(0, 1260), (320, 720), (650, 1360), (900, 880), (900, 1500), (0, 1500)], fill=colors[3])
    elif cat == "master":
        for n in range(92):
            x = (n * 109) % 960 - 30
            y = 120 + (n * 71) % 1180
            draw.arc((x, y, x + 230, y + 160), 20, 310, fill=colors[n % 5], width=11)
    elif cat == "modern":
        for n in range(12):
            x = (n * 83) % 820
            y = 120 + (n * 137) % 1180
            draw.rectangle((x, y, x + rng.randrange(120, 290), y + rng.randrange(52, 116)), fill=colors[n % 5])
            draw.line((x - 90, y + 110, x + 330, y - 60), fill=colors[(n + 2) % 5], width=rng.randrange(10, 24))
    elif cat == "asian":
        draw.rectangle((0, 0, 900, 1500), fill=colors[0])
        for n in range(9):
            y = 360 + n * 68
            draw.arc((80, y, 820, y + 360), 180, 355, fill=colors[n % 5], width=14)
        draw.polygon([(100, 1040), (360, 520), (610, 1040)], fill=colors[1])
        draw.polygon([(320, 1040), (610, 420), (870, 1040)], fill=colors[3])
        draw.ellipse((650, 150, 770, 270), fill=colors[2])
    elif cat == "folk":
        draw.rectangle((0, 0, 900, 1500), fill=colors[0])
        for y in range(120, 1380, 150):
            for x in range(90, 840, 150):
                draw.ellipse((x - 50, y - 50, x + 50, y + 50), fill=colors[(x + y) % 5])
                draw.rectangle((x - 25, y - 25, x + 25, y + 25), fill=colors[(x + y + 1) % 5])
    elif cat == "animation":
        draw.rectangle((0, 0, 900, 1500), fill=colors[0])
        draw.ellipse((90, 120, 330, 360), fill=colors[1])
        draw.polygon([(0, 1200), (210, 760), (400, 1200)], fill=colors[3])
        draw.polygon([(260, 1200), (590, 520), (900, 1200)], fill=colors[4])
        for n in range(7):
            draw.rounded_rectangle((90 + n * 100, 1040 - n * 26, 220 + n * 100, 1260 - n * 26), radius=58, fill=colors[(n + 2) % 5])
    else:
        draw.rectangle((0, 0, 900, 1500), fill=colors[0])
        for n in range(8):
            x = 80 + (n % 4) * 190
            y = 180 + (n // 4) * 420
            draw.rounded_rectangle((x, y, x + 155, y + 300), radius=36, fill=colors[(n + 1) % 5])
        draw.line((100, 1200, 800, 1200), fill=colors[1], width=10)

    draw.rounded_rectangle((54, 54, 846, 1446), radius=48, outline="#f7df9a", width=7)
    img.save(OUT / f"{slug}.png", optimize=True)

print(f"generated {len(styles)} images in {OUT}")
