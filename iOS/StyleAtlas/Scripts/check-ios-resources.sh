#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_DIR="$IOS_ROOT/Resources/Web"
STOREKIT_FILE="$IOS_ROOT/Resources/StoreKit/StyleAtlas.storekit"
missing=()

required_web_files=(
  "index.html"
  "styles.css"
  "game.js"
  "data-core.js"
  "data-styles.js"
  "data-refined.js"
  "examples.js"
)

for file in "${required_web_files[@]}"; do
  [[ -f "$WEB_DIR/$file" ]] || missing+=("Resources/Web/$file")
done

[[ -f "$STOREKIT_FILE" ]] || missing+=("Resources/StoreKit/StyleAtlas.storekit")

webp_count=0
if [[ -d "$WEB_DIR/assets/styles" ]]; then
  webp_count=$(find "$WEB_DIR/assets/styles" -maxdepth 1 -type f -name "*.webp" | wc -l | tr -d " ")
else
  missing+=("Resources/Web/assets/styles/")
fi

if [[ "$webp_count" != "120" ]]; then
  missing+=("Resources/Web/assets/styles/*.webp expected 120, found $webp_count")
fi

if ((${#missing[@]})); then
  echo "FAIL: iOS resources are incomplete"
  echo "WebP count: $webp_count"
  echo "Missing or invalid:"
  printf ' - %s\n' "${missing[@]}"
  exit 1
fi

echo "PASS: iOS resources are complete"
echo "WebP count: $webp_count"
