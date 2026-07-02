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
    img = Image.new("RGB", (720, 900), colors[0])
    draw = ImageDraw.Draw(img)

    if cat == "poster":
        for x in range(50 + rng.randrange(30), 700, rng.randrange(92, 146)):
            draw.line((x, 60, x, 840), fill=colors[1], width=2)
        for _ in range(4):
            x = rng.randrange(60, 500)
            y = rng.randrange(90, 600)
            w = rng.randrange(120, 320)
            h = rng.randrange(90, 260)
            draw.rectangle((x, y, min(660, x + w), min(820, y + h)), fill=colors[rng.randrange(1, 5)])
    elif cat == "painting":
        for r in range(720, 80, -80):
            draw.ellipse((360 - r, 210 - r // 2, 360 + r, 690 + r // 2), outline=colors[(r // 80) % 5], width=18)
        draw.polygon([(0, 760), (260, 440), (520, 820), (720, 540), (720, 900), (0, 900)], fill=colors[3])
    elif cat == "master":
        for n in range(70):
            x = (n * 89) % 760 - 20
            y = 80 + (n * 47) % 700
            draw.arc((x, y, x + 180, y + 120), 20, 310, fill=colors[n % 5], width=8)
    elif cat == "modern":
        for n in range(12):
            x = (n * 61) % 680
            y = 80 + (n * 97) % 720
            draw.rectangle((x, y, x + rng.randrange(90, 230), y + rng.randrange(34, 74)), fill=colors[n % 5])
            draw.line((x - 70, y + 80, x + 260, y - 40), fill=colors[(n + 2) % 5], width=rng.randrange(6, 16))
    elif cat == "asian":
        draw.rectangle((0, 0, 720, 900), fill=colors[0])
        for n in range(9):
            y = 210 + n * 44
            draw.arc((60, y, 660, y + 260), 180, 355, fill=colors[n % 5], width=10)
        draw.polygon([(90, 620), (290, 320), (480, 620)], fill=colors[1])
        draw.polygon([(260, 620), (490, 260), (690, 620)], fill=colors[3])
        draw.ellipse((520, 110, 610, 200), fill=colors[2])
    elif cat == "folk":
        draw.rectangle((0, 0, 720, 900), fill=colors[0])
        for y in range(80, 820, 120):
            for x in range(80, 660, 120):
                draw.ellipse((x - 38, y - 38, x + 38, y + 38), fill=colors[(x + y) % 5])
                draw.rectangle((x - 18, y - 18, x + 18, y + 18), fill=colors[(x + y + 1) % 5])
    elif cat == "animation":
        draw.rectangle((0, 0, 720, 900), fill=colors[0])
        draw.ellipse((80, 90, 260, 270), fill=colors[1])
        draw.polygon([(0, 720), (160, 470), (310, 720)], fill=colors[3])
        draw.polygon([(210, 720), (470, 330), (720, 720)], fill=colors[4])
        for n in range(7):
            draw.rounded_rectangle((80 + n * 80, 620 - n * 18, 180 + n * 80, 760 - n * 18), radius=46, fill=colors[(n + 2) % 5])
    else:
        draw.rectangle((0, 0, 720, 900), fill=colors[0])
        for n in range(8):
            x = 70 + (n % 4) * 150
            y = 110 + (n // 4) * 250
            draw.rounded_rectangle((x, y, x + 120, y + 180), radius=28, fill=colors[(n + 1) % 5])
        draw.line((80, 720, 640, 720), fill=colors[1], width=6)

    draw.rounded_rectangle((44, 44, 676, 856), radius=34, outline="#f7df9a", width=5)
    draw.rectangle((0, 650, 720, 900), fill=(8, 7, 5))
    title_font = font(58, True)
    sub_font = font_cjk(27)
    small_font = font(22)
    y = 690
    for line in wrap(draw, en, title_font, 600):
        draw.text((64, y), line, font=title_font, fill="#f8edcf")
        y += 62
    draw.text((64, y + 8), zh, font=sub_font, fill="#d9aa45")
    draw.text((64, 80), f"{i:03d} / {cat.upper()}", font=small_font, fill="#f8edcf")
    img.save(OUT / f"{slug}.png", optimize=True)

print(f"generated {len(styles)} images in {OUT}")
