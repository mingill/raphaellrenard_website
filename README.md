# raphaellrenard.com — Website of Raphael L. Renard

Static site (vanilla HTML/CSS/JS, no build step) for adventure novels in
German and English. Live at https://raphaellrenard.com via GitHub Pages.

## Language structure: German root + English twins

- Root `*.html` — German pages (URLs unchanged from the old Hostinger site,
  keeps SEO; the `.de` domain 301-redirects here until it dies Nov 2026).
- `/en/` — English twins: `index.html` (bio + English books + German-books
  teaser) plus 1:1 copies `apt.html`, `proverbs.html`, `oftheworld.html`.
  Facts (covers, stats, dates, Amazon links) are identical on both sides —
  only prose differs. Root and twin link via hreflang pairs + header
  DE|EN switcher (same book, other language; choice remembered in
  localStorage as `rl-lang`, no auto-redirect).
- German-only books (`abenteurer.html`, `festung.html`) exist in German only;
  their EN switcher points at `/en/` home. `egds.html` was deleted (old title
  of *Die Festung*); only its panorama assets live on in `festung.html`.

## Design: SAGA & SMOKE (dark cinematic)

- `css/saga.css` (loaded last, overrides `general.css`) — tokens
  (`--saga-*`), system font stacks (no webfonts, GDPR-clean), film grain,
  hero vignette + parallax, scroll reveals, elemental section themes.
- 7 `body.accent-*` classes recolor pages automatically (jungle, sand, dusk,
  violet, teal, stone, house default) — see `COLORS.md` for palette + tweak
  workflow.
- `js/saga.js` — reveals, parallax, manual flipcards (click/keyboard),
  carousel arrow keys. Sets `SAGA_MANUAL_FLIP` so legacy `script.js`
  auto-flip stands down.

## Docs in this repo

- `CONTENT.md` — string inventory: every text on every page (DE + EN columns).
  Translation worklist and record (incl. egds deletion note).
- `COLORS.md` — SAGA & SMOKE palette, accent classes, how to tweak.
- `TODO.md` — what is done, what is still open.
- `.gitignore` — `.DS_Store`, `Thumbs.db`, logs (macOS droppings stay local).

## Local preview

VS Code Live Server (recommended), or fallback:

```
python -m http.server 8000
```

then open http://localhost:8000 (English section: http://localhost:8000/en/).

## Deploy (Renard's workflow)

1. Commit + push to `main` (this machine serves stale DNS — never verify
   from here).
2. Repo → Deployments page: `github-pages` run must be green.
3. Verify live on phone / mobile data (home network caches the old site).

Hosting: GitHub Pages (free). DNS + domain at Porkbun (`.com` expires
2027-11-17, auto-renew on). No backend — when the contact form comes, it
will be Formspree/FormSubmit free tier (see TODO).
