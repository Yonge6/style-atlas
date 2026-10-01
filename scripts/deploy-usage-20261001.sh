#!/usr/bin/env bash
set -euo pipefail
surface="${1:?style-atlas or ops}"
digest="${2:?archive hash}"
revision="${3:-r1}"
[[ "$revision" =~ ^r[0-9]+$ ]]
[[ "$surface" == style-atlas || "$surface" == ops ]]
[[ "$digest" =~ ^[0-9a-f]{64}$ ]]
site="/srv/wonderelian/$surface.wonderelian.com"
stage="/srv/wonderelian/.atlas-usage-20261001-$surface-$revision"
backup="/srv/wonderelian/backups/atlas-usage-20261001-$surface-$revision"
archive="/tmp/atlas-usage-20261001-$surface.tar.gz"
test -d "$site" && test ! -e "$stage" && test ! -e "$backup"
printf '%s  %s\n' "$digest" "$archive" | sha256sum -c -
while IFS= read -r file; do
  case "$surface:$file" in
    *:BASELINE|*:SHA256SUMS|*:index.html|style-atlas:analytics.js|style-atlas:game.js|style-atlas:analytics.css|style-atlas:analytics-frame.html|style-atlas:analytics-frame.js|style-atlas:privacy.html|style-atlas:download/app-banner.js|style-atlas:guides/visual-hierarchy-checklist/index.html|style-atlas:compare/art-nouveau-vs-art-deco/index.html|ops:app.js|ops:product-usage.js|ops:data/state.json) ;;
    *) echo UNEXPECTED_FILE; exit 3 ;;
  esac
done < <(tar -tzf "$archive")
mkdir -p "$stage" "$backup"
tar -xzf "$archive" -C "$stage"
(cd "$stage" && sha256sum -c SHA256SUMS)
(cd "$site" && sha256sum -c "$stage/BASELINE")
mapfile -t files < <(awk '{print $2}' "$stage/SHA256SUMS")
for file in "${files[@]}"; do
  test ! -L "$stage/$file" && test -f "$stage/$file"
  mkdir -p "$backup/$(dirname "$file")"
  if [ -f "$site/$file" ]; then cp -p "$site/$file" "$backup/$file"; fi
done
nginx -t
rollback(){ for file in "${files[@]}"; do if [ -f "$backup/$file" ]; then cp -p "$backup/$file" "$site/$file"; fi; done; echo ROLLED_BACK; }
trap rollback ERR
for file in "${files[@]}"; do
  [ "$file" != index.html ] || continue
  mkdir -p "$site/$(dirname "$file")"
  install -m 0644 "$stage/$file" "$site/$file.atlas-next"
  mv "$site/$file.atlas-next" "$site/$file"
done
install -m 0644 "$stage/index.html" "$site/index.html.atlas-next"
mv "$site/index.html.atlas-next" "$site/index.html"
for file in "${files[@]}"; do
  expected="$(awk -v f="$file" '$2==f {print $1}' "$stage/SHA256SUMS")"
  actual="$(curl -fsS --resolve "$surface.wonderelian.com:443:127.0.0.1" "https://$surface.wonderelian.com/$file" | sha256sum | cut -d' ' -f1)"
  test "$expected" = "$actual"
done
nginx -t
trap - ERR
echo "DEPLOY_OK_ATLAS_USAGE_$surface BACKUP=$backup"
