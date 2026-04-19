#!/usr/bin/env bash
# Sync the Grassfed Design System from the brandkit submodule into public/.
#
# Steps:
#   1. Extract brandkit/Grassfed Design System.zip to design-system/ (fresh).
#   2. Copy CSS, logos, shared icons, and marketing JSX into public/.
#   3. Rewrite relative asset paths to absolute (/...).
#   4. Rewrite internal page links to clean URLs (/, /farm, /pricing).
#   5. Copy opt-in + results HTML from flows/ into public/unlock/* and
#      public/farm/unlock/*, fix paths, and wire the form POST to /api/optin.
#
# Idempotent: run it any time the submodule updates. Commits are still manual.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_ZIP="$ROOT/brandkit/Grassfed Design System.zip"
DESIGN="$ROOT/design-system"
PUB="$ROOT/public"

if [[ ! -f "$SRC_ZIP" ]]; then
  echo "ERROR: $SRC_ZIP not found. Did you init the brandkit submodule?" >&2
  echo "  git submodule update --init --recursive" >&2
  exit 1
fi

echo "==> Extracting design kit to $DESIGN/"
rm -rf "$DESIGN"
mkdir -p "$DESIGN"
unzip -q "$SRC_ZIP" -d "$DESIGN"

echo "==> Refreshing public/ assets"
rm -rf "$PUB/assets/logos" "$PUB"/*.jsx "$PUB/icons.js" "$PUB/colors_and_type.css"
mkdir -p "$PUB/assets/logos"
cp "$DESIGN/colors_and_type.css" "$PUB/"
cp "$DESIGN/ui_kits/_shared/icons.js" "$PUB/icons.js"
cp "$DESIGN/ui_kits/marketing/"*.jsx "$PUB/"
cp -r "$DESIGN/assets/logos/." "$PUB/assets/logos/"

echo "==> Rewriting JSX paths (relative -> absolute)"
sed -i 's|\.\./\.\./assets/logos/|/assets/logos/|g' "$PUB"/*.jsx
sed -i 's|href="Grassfed Home\.html"|href="/"|g; s|href="Grassfed Home\.html#aha"|href="/#aha"|g; s|href="Grassfed Farm\.html"|href="/farm"|g; s|href="Pricing\.html"|href="/pricing"|g' "$PUB"/*.jsx

echo "==> Refreshing opt-in + results HTML"
rm -rf "$PUB/unlock" "$PUB/farm/unlock"
mkdir -p "$PUB/unlock/results" "$PUB/farm/unlock/results"
cp "$DESIGN/ui_kits/marketing/flows/grsfd/01-optin.html"   "$PUB/unlock/index.html"
cp "$DESIGN/ui_kits/marketing/flows/grsfd/02-results.html" "$PUB/unlock/results/index.html"
cp "$DESIGN/ui_kits/marketing/flows/grsfd-farm/01-optin.html"   "$PUB/farm/unlock/index.html"
cp "$DESIGN/ui_kits/marketing/flows/grsfd-farm/02-results.html" "$PUB/farm/unlock/results/index.html"

for f in "$PUB/unlock/index.html" "$PUB/unlock/results/index.html" "$PUB/farm/unlock/index.html" "$PUB/farm/unlock/results/index.html"; do
  sed -i 's|\.\./\.\./\.\./\.\./colors_and_type\.css|/colors_and_type.css|g' "$f"
  sed -i 's|\.\./\.\./\.\./\.\./assets/logos/|/assets/logos/|g' "$f"
done

echo "==> Wiring grsfd opt-in form to POST /api/optin"
python3 "$ROOT/scripts/wire-optin.py" grsfd "$PUB/unlock/index.html"

echo "==> Wiring grsfd-farm opt-in form to POST /api/optin"
python3 "$ROOT/scripts/wire-optin.py" grsfd-farm "$PUB/farm/unlock/index.html"

echo "==> Done. Review changes with 'git status' and commit."
