#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_ROOT="$(cd "$IOS_ROOT/../.." && pwd)"
TARGET="$IOS_ROOT/Resources/Web"

rm -rf "$TARGET"
mkdir -p \
  "$TARGET/assets/styles" \
  "$TARGET/assets/brand" \
  "$TARGET/assets/contact" \
  "$TARGET/assets/icons" \
  "$TARGET/assets/support"

for file in index.html styles.css game.js data-core.js data-styles.js data-refined.js data-aesthetic-guides.js examples.js; do
  cp "$WEB_ROOT/$file" "$TARGET/$file"
done

find "$WEB_ROOT/assets/styles" -maxdepth 1 -type f -name "*.webp" -exec cp {} "$TARGET/assets/styles/" \;
cp "$WEB_ROOT/assets/brand/app-icon.png" "$TARGET/assets/brand/app-icon.png"
cp -R "$WEB_ROOT/assets/contact/." "$TARGET/assets/contact/"
cp -R "$WEB_ROOT/assets/icons/." "$TARGET/assets/icons/"
cp -R "$WEB_ROOT/assets/support/." "$TARGET/assets/support/"

count=$(find "$TARGET" -type f | wc -l | tr -d " ")
echo "Synced $count files to $TARGET"
echo "PNG fallback is not bundled in V1; WebP covers are the offline source of truth."
