#!/usr/bin/env python3
"""Build public/index.html from design-system/ui_kits/marketing/Hero Prototype.html.

Transforms applied:
  - Rewrite ../../colors_and_type.css + ../../assets/... to absolute / paths.
  - Rewrite flows/grsfd/01-optin.html -> /unlock, flows/grsfd-farm/01-optin.html
    -> /farm/unlock.
  - Point the nav "Pricing" link at /pricing.
  - Replace the two <form class="agent-form"> blocks with plain anchor buttons
    so the agent cards navigate straight to the opt-in page (data captured there).
  - Drop the now-unused document.querySelectorAll('form.agent-form') JS block.

Usage: build-home.py <src-hero-prototype.html> <dest-public-index.html>
"""
import re
import sys
from pathlib import Path

SRC, DEST = Path(sys.argv[1]), Path(sys.argv[2])
html = SRC.read_text()

# Absolute asset paths
html = html.replace('href="../../colors_and_type.css"', 'href="/colors_and_type.css"')
html = html.replace('src="../../assets/', 'src="/assets/')

# Funnel links
html = html.replace('href="flows/grsfd/01-optin.html"', 'href="/unlock"')
html = html.replace('href="flows/grsfd-farm/01-optin.html"', 'href="/farm/unlock"')

# Nav: make the bare <a>Pricing</a> a real link.
html = html.replace('<a>Pricing</a>', '<a href="/pricing">Pricing</a>', 1)

# Replace <form class="agent-form" data-product="grsfd"> ... </form> with an anchor.
html = re.sub(
    r'<form class="agent-form" data-product="grsfd">.*?</form>',
    lambda _m: (
        '<a class="btn btn-primary" href="/unlock" style="width:100%;padding:12px 18px;font-size:15px">'
        '<span class="btn-label">Submit MLS-ID →</span>'
        '</a>'
    ),
    html,
    count=1,
    flags=re.DOTALL,
)

html = re.sub(
    r'<form class="agent-form" data-product="farm">.*?</form>',
    lambda _m: (
        '<a class="btn btn-accent" href="/farm/unlock" style="width:100%;padding:12px 18px;font-size:15px">'
        '<span class="btn-label">Check zip codes →</span>'
        '</a>'
    ),
    html,
    count=1,
    flags=re.DOTALL,
)

# Drop the obsolete form-submit JS block.
html = re.sub(
    r"document\.querySelectorAll\('form\.agent-form'\)\.forEach\(.*?\}\);\s*\n",
    "",
    html,
    count=1,
    flags=re.DOTALL,
)

DEST.write_text(html)
print(f"built home -> {DEST}")
