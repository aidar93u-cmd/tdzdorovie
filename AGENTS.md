# Natural Health — Static Site

## Stack
- Pure HTML/CSS/JS — no build tools, no package manager, no bundler.
- Russian-language site for "ТД Здоровье".

## Commands
No build, test, lint, or typecheck commands exist. Open `index.html` in a browser to preview.

## Structure
```
index.html         — main (and only) page
css/about.css      — all styles (BEM, CSS custom properties, rem units)
js/about.js        — scripts (currently empty)
fonts/             — FuturaPT-Book + Berlin-Regular (woff2 + woff)
```

## CSS conventions
- Design tokens in `:root` CSS custom properties (e.g. `--primary-color: #007d75`, `--main-ff: "Futura PT"`).
- BEM naming: `.block__element--modifier`.
- Sizing in `rem`, layout uses flexbox and grid.
- Safe-area inset support via `env(safe-area-inset-*)`.
- Primary color: `#007d75`.
- Font family: `"Futura PT", sans-serif`.

## Fonts
- `@font-face` blocks in `css/about.css` resolve to `../fonts/*.woff2` and `../fonts/*.woff`.
- Both font files are already present in `fonts/`.

## Notes
- Not a git repo.
- No README.
