# TODO — raphaellrenard.com

## Done

Migration + rebuild (2026-09-06/07), all pushed to `main` and live:

- [x] Hostinger → Porkbun transfer (`.com` expiry 2027-11-17), Pages + HTTPS
- [x] German root + `/en/` true twins + hreflang pairs + DE|EN switcher
      (`rl-lang` localStorage, no auto-redirect)
- [x] Root `apt/proverbs/oftheworld` translated to German; twins stay English
- [x] SAGA & SMOKE redesign on all pages (tokens, accents — see `COLORS.md`)
- [x] Head cleanup (Google Fonts / smoothscroll / font-awesome gone),
      heading-wash removed, header + Romane flyout z-index fixes
- [x] `egds.html` deleted (old Festung title); nav-mobile dead anchors fixed
- [x] `.de` 301-redirects to `.com`, dies Nov 2026 (auto-renew off)
- [x] `README.md`, `CONTENT.md`, `COLORS.md` docs current

## Open — content decisions (Renard)

- [ ] `/en/` teaser card still shows old egds cover/title → new Festung art?
- [ ] Proverbs page: book title stays English on the German page — intended?
- [ ] German translations of the 3 book pages are agent drafts — final review
- [ ] Proverbs EN page Denglish fully out? (commenly/day-to-day/oder/it's/und
      fixed 2026-09-07; re-read once more before linking it anywhere prominent)

## Open — features

- [ ] Contact form (Formspree/FormSubmit free tier, honeypot, success state)
- [ ] Custom 404 ("lost in the desert" page, DE + EN)
- [ ] SEO: OG/Twitter cards per page, `sitemap.xml`, `robots.txt`, canonicals
- [ ] Reading-progress hairline on long book pages; print stylesheet

## Open — code health (from the original audit, still valid)

- [ ] `js/script.js`: carousel touch support, kill infinite-scroll cloning,
      keyboard/focus/aria, remove `console.log` litter + dead code
- [ ] Flipcards: 6 → 3 + gallery link (or rotating quote)
- [ ] `Romane` trigger is an `<li>`, not a `<button>` (+ `aria-expanded`, Esc)
- [ ] Mobile menu: add Autor/Impressionen/Orte section anchors
- [ ] Replace ionicons CDN with inline SVGs (~6 icons actually used)
- [ ] Dead `general.css` tokens (`##4b5f11`, raw `yellow`); radius/shadow scale
- [ ] Housekeeping (local only, git-ignored): 8× `.DS_Store`, stray
      `img/world map.pdf`, `fox_logo_website.png` (200 KB — used anywhere?)
- [ ] Hero: one-line subhead (who + what); un-hide or remove dead CTA

## Later / calendar

- [ ] Nov 2026: `.de` dies — remove redirect entries, delete DNS notes
- [ ] 2028-02: idle Hostinger hosting prepaid ends — nothing to do, verify
      no renewal attempt happens
