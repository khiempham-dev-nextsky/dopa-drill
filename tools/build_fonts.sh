#!/usr/bin/env bash
# Rebuild the subset WOFF2 fonts used by the game from the Google Fonts (OFL) sources.
# Requires: curl, uv. Usage: bash tools/build_fonts.sh
set -euo pipefail
GAME="$(cd "$(dirname "$0")/../app" && pwd)"
WORK="$(mktemp -d)"
BASE=https://raw.githubusercontent.com/google/fonts/main/ofl
curl -sSfo "$WORK/baloo.ttf" "$BASE/baloo2/Baloo2%5Bwght%5D.ttf"
curl -sSfo "$WORK/nunito.ttf" "$BASE/nunito/Nunito%5Bwght%5D.ttf"
python3 - "$GAME" "$WORK/chars.txt" <<'PY'
import sys, pathlib
game = pathlib.Path(sys.argv[1])
chars = {chr(c) for c in range(0x20, 0x7f)}
for f in [*game.glob('*.html'), *game.glob('*.css'), *game.glob('js/*.js')]:
    chars |= set(f.read_text(encoding='utf-8'))
chars |= set('０１２３４５６７８９＋−×÷＝、。・！？「」（）ー〜…')
pathlib.Path(sys.argv[2]).write_text(''.join(sorted(c for c in chars if ord(c) >= 0x20)), encoding='utf-8')
PY
for pair in "baloo baloo-2" "nunito nunito"; do
  set -- $pair
  uv run --no-project --with fonttools --with brotli pyftsubset "$WORK/$1.ttf" --text-file="$WORK/chars.txt" --flavor=woff2 --layout-features='*' --output-file="$GAME/fonts/$2.woff2"
done
rm -rf "$WORK"
echo "fonts rebuilt in $GAME/fonts"
