# Natural Health — Static Site

## Stack
- Pure HTML/CSS/JS — no build tools, no package manager, no bundler.
- Russian-language site for "ТД Здоровье".

## Commands
No build, test, lint, or typecheck commands exist. Open `index.html` in a browser to preview.

## Structure
```
about.html         — about company page (main page)
css/about.css      — all styles for about.html
js/about.js        — Swiper, AOS, advantages tabs, number animation
franchise.html      — franchise/product landing page with calculator
css/franchise.css   — styles for franchise.html (self-contained: fonts, reset, header, footer, sections)
js/franchise.js     — script for franchise.html (calculator logic, radio/slider handlers)
mini-landing.html  — mini-landing page
css/mini-landing.css — styles for mini-landing.html
fonts/             — FuturaCyrillic*.woff (7 weights 300–900) + Berlin-Regular (woff2+woff)
images/            — root-level images (legacy, shared across pages)
images/franchise/  — franchise page images exported from Figma (hero, banners, list, why, icons, iphone, decorative SVGs)
```

## CSS conventions
- Design tokens in `:root` CSS custom properties (e.g. `--primary-color: #007d75`, `--main-ff: "Futura PT"`).
- **Font variables**: use `font: var(--title-h1)`, `font: var(--text-t1)`, etc. instead of hardcoded `font-size`/`line-height`. Add `font-weight: 500` after for Medium weight.
- BEM naming: `.block__element--modifier`.
- Sizing in `rem`, layout uses flexbox and grid.
- Safe-area inset support via `env(safe-area-inset-*)`.
- Primary color: `#007d75`.
- Font family: `"Futura PT", sans-serif`.

## Root Variables — Fonts
| Variable | Value |
|---|---|
| `--title-h1` | 7.2rem/90% (→ 5rem at 1024px, → 3.6rem at 640px) |
| `--title-h2` | 4.8rem/90% (→ 4rem at 1024px, → 3rem at 640px) |
| `--title-h3` | 3.2rem/80% |
| `--title-h3-lh` | 3.2rem/110% |
| `--title-h4` | 2.4rem/100% |
| `--text-t1` | 2rem/110% (→ 1.8rem at 1024px, → 1.6rem at 640px) |
| `--text-t2` | 1.8rem/100% |
| `--text-t3` | 1.4rem/100% |
| `--text-t4` | 1.2rem/100% |

## Fonts
- `@font-face` blocks in `css/about.css` resolve to `../fonts/*.woff2` and `../fonts/*.woff`.
- Both font files are already present in `fonts/`.

## Notes
- Not a git repo.
- No README.
