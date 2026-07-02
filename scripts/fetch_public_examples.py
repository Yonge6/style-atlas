import ast
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "examples"
OUT.mkdir(parents=True, exist_ok=True)

source = (ROOT / "game.js").read_text()
styles = ast.literal_eval(re.search(r"const rawStyles = (\[.*?\n  \]);", source, re.S).group(1))

query_overrides = {
    "swiss-style": "modern poster",
    "bauhaus": "Bauhaus design",
    "art-deco": "Art Deco",
    "art-nouveau": "Art Nouveau",
    "constructivism": "constructivist poster",
    "de-stijl": "De Stijl",
    "renaissance": "Renaissance painting",
    "baroque": "Baroque painting",
    "rococo": "Rococo painting",
    "impressionism": "Impressionism",
    "post-impressionism": "Post-Impressionism",
    "van-gogh": "Van Gogh",
    "monet": "Monet",
    "renoir": "Renoir",
    "cezanne": "Cezanne",
    "picasso-cubism": "Cubism",
    "matisse": "Matisse",
    "dali": "Surrealism",
    "magritte": "Surrealism",
    "gustav-klimt": "Klimt",
    "kandinsky": "Kandinsky",
    "mondrian": "Mondrian",
    "pollock": "Abstract Expressionism",
    "ukiyo-e": "Ukiyo-e",
    "gongbi": "Chinese painting",
    "chinese-ink-painting": "Chinese ink painting",
    "dunhuang-mural": "Buddhist mural",
    "islamic-geometric": "Islamic geometric",
    "persian-miniature": "Persian miniature",
    "indian-miniature": "Indian miniature",
    "byzantine-icon": "Byzantine icon",
    "mexican-muralism": "Mexican mural",
    "aboriginal-dot-painting": "Aboriginal art",
    "african-tribal-pattern": "African textile pattern",
    "russian-lubok": "Russian print",
    "celtic-art": "Celtic ornament",
    "botanical-illustration": "Botanical illustration",
    "scientific-illustration": "Scientific illustration",
}


def get_json(url):
    with urllib.request.urlopen(url, timeout=18) as res:
        return json.load(res)


manifest = {}
manifest_path = ROOT / "examples.js"
if manifest_path.exists():
    try:
        manifest = json.loads(manifest_path.read_text().removeprefix("window.STYLE_EXAMPLES = ").removesuffix(";\n"))
    except Exception:
        manifest = {}

max_examples = 40
for slug, en, _zh, _cat, _pinyin, keywords in styles:
    if len(manifest) >= max_examples:
        break
    if slug in manifest:
        continue
    query = query_overrides.get(slug, en.replace("/", " "))
    search_url = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isPublicDomain=true&q=" + urllib.parse.quote(query)
    try:
        ids = (get_json(search_url).get("objectIDs") or [])[:8]
        for object_id in ids:
            obj = get_json(f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}")
            image_url = obj.get("primaryImageSmall") or obj.get("primaryImage")
            if not image_url:
                continue
            suffix = Path(urllib.parse.urlparse(image_url).path).suffix or ".jpg"
            image_path = OUT / f"{slug}{suffix}"
            if not image_path.exists():
                image_path.write_bytes(urllib.request.urlopen(image_url, timeout=25).read())
            manifest[slug] = {
                "title": obj.get("title") or en,
                "artist": obj.get("artistDisplayName") or obj.get("culture") or "The Met",
                "source": obj.get("objectURL") or "https://www.metmuseum.org/art/collection",
                "image": f"assets/examples/{image_path.name}",
            }
            manifest_path.write_text("window.STYLE_EXAMPLES = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n")
            break
    except Exception as exc:
        print(f"skip {slug}: {exc}")
    time.sleep(0.08)

manifest_path.write_text("window.STYLE_EXAMPLES = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n")
print(f"saved {len(manifest)} public-domain examples")
