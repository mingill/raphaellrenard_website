# TODO — raphaellrenard.com redesign (UI/UX only, content pass later)

Skill: `design-makeover` (installed in opencode skills dir). Stack: vanilla HTML/CSS/JS, no build step.
Pilot: `index.html` + `apt.html` → review in Live Server → lock direction → roll out to all pages + `/en/`.

## Done (migration, history)
- [x] Backups, Porkbun transfer (expiry 2027-11-17), GitHub Pages + HTTPS
- [x] German root + curated `/en/` + DE|EN switcher + hreflang
- [x] `.de` forwarding to `.com`, dies Nov 2026 (auto-renew off)

## 1. Design system (`css/general.css` tokens)
- [ ] Fix dead tokens: `--accent-color-tertiary: ##4b5f11` (invalid), `--tertiary-color: yellow` (raw)
- [ ] Reduce palette: orange + cream + 5 accents is template DNA — 1 brand + 1 support + neutrals
- [ ] Typography: max 2 families (drop Inter-as-primary — generic AI-slop signal; keep a serif display + clean body), fluid `clamp()` scale, DE long-word line-heights
- [ ] Radius/shadow system: 30+ bespoke shadows → 3 radii + 3 elevations
- [ ] Dark mode via CSS vars (`prefers-color-scheme` + manual toggle, localStorage like `rl-lang`)
- [ ] Self-host fonts (Google Fonts CDN = GDPR problem on a German site; contradicts datasecurity.html)

## 2. Head / dependencies (every page)
- [ ] Remove duplicate `preconnect` pairs + commented-out font-awesome link
- [ ] Drop `smoothscroll-polyfill` (dead weight — CSS `scroll-behavior` covers all modern browsers)
- [ ] Replace ionicons CDN (ESM + nomodule = 2 requests, render-blocking) with inline SVGs for the ~6 icons actually used
- [ ] Housekeeping: delete 8× `.DS_Store`, stray `img/world map.pdf`, check `fox_logo_website.png` (200 KB, unused?)

## 3. Global chrome (header / nav / footer)
- [ ] `Romane` trigger is an `<li>`, not a `<button>` — keyboard users can't open it; add `aria-expanded`, Esc-to-close
- [ ] Mobile menu has book links only — no Autor/Impressionen/Orte anchors, no language entry context (add section links)
- [ ] Sticky header: add shrink-on-scroll variant (`.sticky` groundwork exists)
- [ ] Restyle appended DE|EN switcher to match new direction
- [ ] Footer: real mini-sitemap, back-to-top, social SVGs

## 4. Index — hero (no value prop today: H1 + 6 thumbnails + CTA, zero copy)
- [ ] One-line subhead under "Starte ins Abenteuer" (who + what: Abenteuerromane, DE + EN)
- [ ] Un-hide or remove the `hidden` "Mehr erfahren" button (dead CTA in DOM now)
- [ ] Hero gallery: 6 static thumbs → intentional composition (3 large? angled covers?) with hover/tap affordance

## 5. Index — books carousel (`js/script.js` rewrite)
- [ ] Touch support (today: mouse-only drag — broken on phones, the main reading device)
- [ ] Kill infinite-scroll cloning (duplicates links in DOM, confuses screen readers/SEO) — plain scroll-snap + drag
- [ ] Keyboard arrows, visible focus, `aria-roledescription="carousel"`, real `<button>` arrows with labels
- [ ] Lazy-load covers below fold; keep srcset/_320 variants (already good)
- [ ] Remove `console.log` litter + ~90 lines dead commented code in script.js

## 6. Index — impressions flipcards
- [ ] Tap-to-flip (today hover-only = dead on touch) + kill 5s auto-flip timer (distracting, a11y hostile)
- [ ] 6 cards → 3 + gallery link, or one rotating quote; honor `prefers-reduced-motion`

## 7. Book pages (pilot `apt.html`, then rollout)
- [ ] Buy-box pattern: cover + facts + CTA as one sticky card on desktop
- [ ] Feature grids share one card component with index (one component, two languages)
- [ ] Anchor links (`Mehr erfahren`) need `scroll-margin-top` for sticky-header offset
- [ ] Playfair Display: keep for editorial flavor or fold into new 2-family system (decision at direction lock)

## 8. New UX functions
- [ ] Contact form (Formspree/FormSubmit free tier, honeypot, success state)
- [ ] Custom 404 ("lost in the desert" page, DE + EN)
- [ ] Reading-progress hairline on long book pages (cheap, fancy)
- [ ] Print stylesheet for book pages

## 9. Quality gates (before rollout leaves pilot)
- [ ] Contrast ratios, focus-visible, carousel/switcher/form aria, `prefers-reduced-motion` everywhere
- [ ] Lighthouse via Live Server; images get width/height (no CLS); fonts/icons diet (see §2)
- [ ] SEO: OG/Twitter cards per page, `sitemap.xml`, `robots.txt`, canonicals (root vs `/en/`)
- [ ] `/en/` inherits every change (shared CSS, mirrored components)

## 10. Rollout order
- [ ] Direction lock from skill's analysis brief (Checkpoint 1) → detailed plan (Checkpoint 2)
- [ ] Pilot build: index + apt → Live Server review → self-critique loop
- [ ] Rollout: 7 remaining root pages → `/en/index.html` → design-guide spec file saved
- [ ] Push (your workflow) + deployments-page check
