# TODO — raphaellrenard.com

## Motion & Feel (Emil Kowalski review)

Source: `emil-design-eng` evaluation of the live site. Ordered by leverage —
highest feel-gain per change first. All CSS-only, no markup or behavior
changes. Explicitly out of scope (review-approved, do not "fix"): the
rAF-throttled passive parallax, the hover-gated flip tip, the marker pulse,
the finite language pulse, and the reduced-motion coverage.

- [ ] Add `:active` press feedback to all pressable controls (`.btn--*`,
      carousel arrows, map markers, links). No `:active` rule on the site
      currently uses `transform` — add `scale(0.97)` so every press confirms
      instantly. Single highest-leverage feel fix.
- [ ] Define one custom ease-out token (e.g. `--ease-out:
      cubic-bezier(0.23, 1, 0.32, 1)`) and use it everywhere. Every
      transition on the site currently uses weak built-in easings; one token
      upgrades them all.
- [ ] Fix the flipcard transition (`style.css:464`
      `transition: all 1s ease-in`). Triple violation: unbounded `all`,
      1s duration, sluggish `ease-in`. Replace with transform-only ~0.7s
      custom ease-out.
- [ ] Replace all `transition: all` instances (7 in `general.css`, plus
      `books.css:114`, `style.css:121,418,518`) with exact property lists
      so hovers never re-animate unintended properties.
- [ ] Calm the hero hover (`style.css:121-134`
      `scale(1.1)` over 0.6s). Reduce to ~`scale(1.04)` over ~0.3s — a
      caress, not a lunge.
- [ ] Speed up the book-cover hover (`saga.css:411`
      `transform 0.4s ease, box-shadow 0.4s ease`). Props are correctly
      specified; reduce to ~0.22s with the custom ease-out so hovers feel
      awake.
- [ ] Swap the reveal easing (`saga.css:822` `0.7s ease`). Keep the
      duration (once-per-element ambient reveals may run long) but use the
      custom ease-out token instead of weak built-in `ease`.
- [ ] Optional: give map `.info` panels a small fade + `translateY(4px)`
      enter transition so user-summoned panels don't appear from nothing.
      Lowest priority; skip if it complicates the panel logic.

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

## Priorities

Work from top to bottom. `P0` means a correctness, accessibility, SEO, or
responsive issue that should be fixed before visual polish. `P1` means a high-
value improvement. `P2` means polish, maintenance, or optional expansion.

Skill references below are planning matches only; do not run them automatically.
All visual work remains constrained by the preserve-first SAGA & SMOKE direction
and the `design-taste-frontend` guardrails.

## Latest Homepage Critique — Impeccable (2026-09-21)

Scope: current German `index.html`, English `en/index.html`, shared homepage
styles/scripts, and existing assets. No implementation changes were made from
this critique. Browser screenshots were unavailable; findings are based on
source inspection and the deterministic detector. The SAGA & SMOKE visual
language remains the design authority.

Design health score: `16/32` across eight applicable Nielsen heuristics.
Heuristics 7 and 10 were not applicable to this persuade-oriented homepage.
Detector output: 51 findings on the German homepage and 19 on the English
homepage. Most dark-glow, quotation-cadence, image-hover, and heading-leading
findings are intentional parts of the existing literary direction; the manual
issues below are the actionable ones.

### P0 — Message, hierarchy, and conversion

**Fitting skills:** Impeccable `clarify`, `layout`, and `distill`;
`design-taste-frontend` as the visual-direction guardrail.

- [x] Decide the homepage's first visitor decision: the first step is now
      choosing a book. Both homepages lead with a curated three-book catalogue
      before the atmospheric imagery or general author-store utility link.
      (2026-09-21)
- [x] Establish a curated three-book gateway using existing facts and imagery.
      Both language versions now show readable book titles and direct links
      before the atmospheric image section; the six-image strip remains an
      atmosphere layer rather than a single featured-book claim. (2026-09-21)
- [x] Clarify the primary and secondary CTA hierarchy without changing the
      existing Amazon URL. The catalogue and direct book links are the primary
      exploration action; the general author-store link remains secondary
      utility. (2026-09-21)
- [x] Add a compact image-led closing book index to both homepages using the
      existing cover assets and routes. Covers are centered, rounded, and
      softly lit like the main carousel; visible title spans and divider lines
      were removed while accessible image names remain. (2026-09-21)
- [x] Establish a title-led book choice on the homepage. The `Wähle ein Buch`
      / `Choose a book` heading and direct links to the curated books provide
      the clear next step; the compact image index reinforces the same routes.
      (2026-09-21) Update: German heading renamed to `Wähle ein Abenteuer`
      per approval; a per-book hook-line experiment was tried and reverted —
      the shelf stays cover + title + chips. (2026-09-21)

### P0 — Accessibility and interaction clarity

**Fitting skills:** Impeccable `audit` and `harden`; `review-animations` for
motion and reduced-motion review.

- [x] Repair the non-semantic `Romane` / `Novels` flyout trigger across the
      shared navigation. It is now a labelled button with synchronized state,
      keyboard activation, outside-click closing, and Escape-to-close behavior.
      (2026-09-21)
- [x] Repair the mobile menu's accessible state and keyboard behavior. It now
      exposes synchronized ARIA state, manages focus, closes on Escape and link
      activation, locks page scrolling while open, and resets on desktop resize.
      (2026-09-21)
- [x] Repair the map markers as separate keyboard-operable controls with
      labelled state, accessible information panels, and usable touch targets.
      (2026-09-21)
- [x] Remove the nested-interactive flipcard pattern. The visible flip buttons
      were removed; cards now provide the click and keyboard interaction while
      preserving separate book links and hidden-side focus protection.
      (2026-09-21)
- [x] Replace infinite carousel cloning with finite, labelled regions. Hidden
      scrollbars were replaced with visible themed scrollbars; duplicated cards
      and their duplicate focus targets are gone. Homepage shelves now expose
      bounded arrow navigation, keyboard Home/End/Arrow support, and dynamic
      card-plus-gap measurements. The primary German and English shelves now
      start on the second book when one fits, start on the left two when two
      fit, and hide both arrows when all three fit. (2026-09-21)
- [x] Remove automatic five-second touch flip behavior. Cards now flip only
      when the visitor clicks or activates them with Enter/Space.
      (2026-09-21)
- [x] Restore robust focus treatment. Removed the global focus reset from
      `general.css` and the book-page carousel suppression from `books.css`;
      the Saga `:focus-visible` treatment now remains visible. (2026-09-21)

### P1 — Editorial journey and emotional resonance

**Fitting skills:** Impeccable `distill`, `clarify`, and `layout`;
`design-taste-frontend` for preserving the established editorial language.

- [x] Shape the homepage as a deliberate emotional sequence: book choice,
      atmosphere, author premise, selected excerpts, optional map capstone, and
      a final return to book links. Both language homepages now follow this
      backbone without replacing the existing SAGA & SMOKE assets.
- [x] Keep the contextual discovery paths. Hero links, book carousel, flyout,
      flipcards, map, and closing index may lead to the same book pages because
      each offers a different narrative context. The opening book choice remains
      the primary path; the other links are secondary enrichment rather than
      competing calls to action. (2026-09-21)
- [x] Make the English homepage a deliberate journey rather than a reduced
      German page. The German-only teaser was removed and the world map was
      added; `Places` now appears in desktop and mobile navigation. (2026-09-21)
- [x] Preserve the strong emotional assets: real expedition imagery, physical
      book covers, quotations, geography, and the charcoal/ember visual world.
      The fix remained prioritization, not a replacement aesthetic. (2026-09-21)

### P1 — Navigation and information architecture

**Fitting skills:** Impeccable `clarify` and `harden`; `design-taste-frontend`
for preserving routes, labels, and the existing visual system.

- [x] Make book grouping understandable. German pages now group the flyout
      and mobile navigation as `Romane` and `Weitere Bücher`; English pages use
      `Novels`, `German novels`, and `Other books`. Public labels, routes,
      titles, and book facts were preserved, and the mobile language switch is
      separated with its own divider. (2026-09-21)
- [x] Resolve the English homepage teaser mismatch by removing the obsolete
      German-only teaser while preserving the existing public book routes.
      (2026-09-21)
- [x] Localize English internal-page navigation and footer chrome. The three
      English book pages now use `Author`, `Impressions`, `Places`, `Novels`
      and `Contact` / `Imprint` / `Privacy`, matching the English homepage.
      Section links point to the English homepage sections, and German-only
      titles stay explicitly grouped under `German novels` with no English
      equivalents. (2026-09-21)
- [x] Add visible labels to clickable hero panels and book items. Resolved by
      decision (2026-09-21): the primary book cards already show visible
      titles, the closing index stays intentionally image-only, and the
      six-image atmosphere mosaic was made non-interactive instead of labeled
      — its links duplicated destinations available elsewhere.
- [x] Flag German-only destinations for English visitors. The English homepage
      now shows `German only` badges (existing `.tag` styling) on the Arabia,
      Persia, Sahara, and Colorado map panels and on the Festung/Abenteurer
      closing-index covers; English-available destinations carry no badge.
      The unreleased Svalbard cover was delinked on both homepages instead of
      pointing at a dead `href="#"`. (2026-09-21)

### P1 — Mobile usability and responsive rhythm

**Fitting skills:** Impeccable `adapt`, `layout`, and `audit`.

- [x] Fix the final-loaded Saga cascade overriding mobile typography. The hero
      heading reached `6.2rem` on phones; mobile `.heading-primary` sizes now
      live in `saga.css` (2026-09-21), restoring the intended phone sizes.
- [x] Fix sticky-header compensation hiding the first section's top. The old
      `.sticky .section-hero` rule matched nothing first after the homepage
      reorder, so the book shelf slid under the fixed header; replaced with
      `.sticky main > section:first-of-type` in `general.css` (2026-09-21).
- [x] Test the first viewport at 320px, 375px, and 414px so the message, useful
      imagery, and primary action are visible without scroll-dependent discovery.
      (2026-09-21: headline cascade and sticky overlap fixed; `#books` mobile
      top padding tightened `4.8rem` → `2.4rem`. Micro-fix approved, first
      viewport verified good by Renard.)
- [x] Increase carousel controls from the former 40px square to the 44px
      minimum on homepages and book pages (2026-09-21). Map marker buttons
      were already 44px at every breakpoint — verified, no change needed.
- [x] Widen the phone map to nearly full width: the `@41em` cap is now
      `max-width: 100%` instead of `30rem` (2026-09-21).
- [x] Rework the fixed map dimensions and tall flipcards for narrow viewports.
      Done conservatively (2026-09-21): phone panels capped with
      `max-width: 72%` so they stay inside the map; stacked flipcard gap
      `6rem` → `4rem`. Card heights deliberately untouched — the cards are
      already content-sized and cuts would risk clipping the aligned links.
- [x] Realign map markers after the touch-target enlargement. The buttons grew
      from 2.2rem to 4.4rem below 63em while anchored by their top-left
      corner, shifting every dot 1.1rem down-right; restored with
      `translate: -1.1rem -1.1rem` in `queries.css` (2026-09-21).
      Done conservatively (2026-09-21): phone panels capped with
      `max-width: 72%` so they stay inside the map; stacked flipcard gap
      `6rem` → `4rem`. Card heights deliberately untouched — the cards are
      already content-sized and cuts would risk clipping the aligned links.
- [x] Rebalance section spacing after the cascade fix. Done (2026-09-21):
      shelf keeps 12.8/9.6 and index widened to 6.4/8 as the two dominant
      moments; mosaic 4.8/4.8, features 4.8/6.4, author/impressions/map 8/8.
      Mobile mirrors it (3.2 for mosaic/features, 4.8 elsewhere); flipcards
      fixed from a silent inherited 9.6rem on phones.

### P1 — Reading and typography

**Fitting skills:** Impeccable `typeset`, `layout`, and `clarify`.

- [x] Give long-form map and book text a comfortable readable measure and line
      height. Skipped by decision (2026-09-21): the current justification and
      line spacing stay as they are.
- [x] Remove or review justified text where it creates uneven word spacing.
      Skipped by decision (2026-09-21): the current text rendering stays as
      it is.
- [x] Audit heading scale, paragraph width, and section-label repetition as one
      system. Desktop scale was already coherent (6.2 → 4.4 → 3.0 → 2.4rem);
      fixed phone level-collapse where h2 and h3 both rendered 2.4rem at
      ≤416px — h3 now steps down to 2.0rem in `queries.css`. (2026-09-21)
- [x] Fix visible copy issues found during review, including `Norderns`,
      `aktische`, `Vielschichte`, and `Myterien`, using the confirmed German
      wording; the repeated metadata typo was corrected across German pages.
      (2026-09-21)

### P1 — Complexity and performance

**Fitting skills:** Impeccable `distill`, `optimize`, and `audit`.

- [x] Remove or subordinate modules that do not help the first book decision.
      Verdict (2026-09-21): already resolved by earlier work — the shelf is
      cut to three books, the mosaic is non-interactive atmosphere, and the
      closing index carries the final action. No further removals needed.
- [x] Verify the primary homepage carousel behavior after user browser testing.
      Homepage scroll steps measure the current card-plus-gap distance per
      action; responsive alignment, arrow visibility, and boundary state now
      update correctly. Book-page carousel behavior remains separate.
      (2026-09-21)
- [x] Lazy-load below-fold book covers and the German map where appropriate,
      reserve image space, and avoid loading background assets that are later
      hidden by `saga.css`. Done (2026-09-21): the 8 hidden panorama `<img>`
      tags (up to 4000w) were removed from all book pages with zero visual
      change, and `loading="lazy"` was added to both homepage mosaics and map
      images. Logos, shelf covers, and first book-page covers stay eager.
- [x] Replace the Ionicons CDN with local inline SVG rendering. Done
      (2026-09-21): all 12 pages use `js/icons.js`; the homepage feature,
      menu, close, Amazon, and Instagram icons use local Ionicons SVG source.
      Exact feature SVGs are constrained to the original circle dimensions in
      `saga.css`; no external icon request remains.

### P2 — Detector and polish follow-up

**Fitting skills:** Impeccable `polish` and `quieter`; `review-animations` for
motion-specific follow-up.

- [x] Treat the detector's 26 German / 12 English `dark-glow` findings as a
      consistency audit, not an instruction to remove the SAGA & SMOKE glow.
      Audit completed: the glow token is properly tokenized per page accent,
      hot-accent glows are consistent, one dead white-glow rule left untouched,
      and the unfinished-badge glow was tokenized via `--saga-blood-rgb`.
      (2026-09-21)
- [x] Review the detector's tight-leading and cramped-padding findings against
      actual rendered text. Static review found all findings intentional or
      already decided (display headings, inset quote padding, full-bleed card
      images); the one tight case (map info text) stays per the approved
      line-spacing decision. No changes. (2026-09-21)
- [x] Remove production carousel logging and correct external `_blank` links
      after interaction behavior is stabilized. Completed across the shared
      pages and scripts: logs removed, safe rel attributes added, and malformed
      targets corrected. (2026-09-21)
- [x] Run a real desktop/mobile browser pass before implementing visual changes.
      Completed by site owner on desktop and mobile (2026-09-21): overflow,
      contrast, focus, touch targets, first-viewport CTA placement, and the
      German/English journey confirmed.

## Cross-Site Backlog

## P0 — SEO and route integrity

**Fitting skills:** Impeccable `harden` and `audit`.

- [x] Add page-specific canonical URLs without changing any existing `.html`
      slug, anchor, language route, legal route, or redirect behavior. All 12
      public pages now use the confirmed apex-host policy with directory
      slashes for the two homepages. (2026-09-21)
- [x] Complete the hreflang matrix and add `x-default` where appropriate. The
      eight true German/English page pairs now include `x-default` pointing to
      the German/default route; German-only and legal pages remain unchanged.
      (2026-09-21)
- [x] Add page-specific Open Graph and Twitter Card metadata with real existing
      imagery; do not invent book facts or promotional claims. All 12 public
      pages now carry page-specific titles, descriptions, URLs, and real
      cover/hero/logo images with matching Twitter cards. (2026-09-21)
- [x] Add `robots.txt`, `sitemap.xml`, and JSON-LD for the website, author,
      books, and breadcrumbs where the existing facts support it. `robots.txt`
      and `sitemap.xml` (12 pages, hreflang alternates on the 8 pairs) are
      live; all 12 pages carry one JSON-LD block (WebSite/Book/BookSeries/
      WebPage) with no invented facts. (2026-09-21)
- [x] Promote the top visible heading on book and legal pages from `h2` to
      `h1`, preserving the visible copy and page voice. All 10 pages now carry
      exactly one `h1`; homepages were already correct. (2026-09-21)
- [x] Replace generic descriptions with accurate page-specific descriptions and
      correct the German `Norderns` typo to `Nordens` where applicable. All 8
      book pages now carry unique descriptions across meta/OG/Twitter tags;
      legal pages use short factual descriptions. Zero `Norderns` remains in
      HTML. (2026-09-21)
- [x] Audit every internal and external link after metadata changes, including
      `.de` redirects and all Amazon URLs.

## P1 — Content and conversion

**Fitting skills:** Impeccable `clarify` and `harden`; use `manuscript` only
for approved long-form copy review, never for unapproved rewriting.

- [x] Final-review the German translations of the three book pages before using
      them in prominent navigation or SEO metadata.
- [x] Re-read the English Proverbs page for remaining Denglish or grammar issues
      before linking it prominently.
- [x] Replace or correct the remaining `href="#"` placeholders. Never invent a
      destination for an unreleased book; use a non-link state or an explicit
      unavailable treatment instead.
- [x] Decide whether English visitors should receive regional Amazon links or
      whether the existing Amazon.de links are intentional. Decided (2026-09-21):
      the 20 product links for English-language books and the 4 author-store
      links on English pages now point to amazon.com (all ASINs verified live);
      German-only volumes, German footers, legal pages, and 404.html stay on
      Amazon.de.
- [ ] Add a contact form only after deciding on the service and privacy copy.
      Include a honeypot, validation, success state, failure state, and no
      unapproved form field names.
- [ ] Consider a sample-chapter or series-index path only if it can use existing
      content and does not add an unnecessary homepage section.

## P1 — Performance and asset loading

**Fitting skills:** Impeccable `optimize`, `audit`, and `harden`.

- [x] Stop requesting panorama/background assets that `saga.css` subsequently
      hides. Hidden panorama tags were removed from the book pages, and
      below-fold homepage mosaic/map images use lazy loading. (2026-09-21)
- [x] Decide whether the Ionicons CDN is still justified. Replaced it with
      exact local Ionicons SVG assets and the local `icons.js` renderer without
      changing the logo treatment. (2026-09-21)
- [x] Add safe `rel="noopener noreferrer"` to external links using
      `target="_blank"`, while preserving their exact destinations. (2026-09-21)
- [x] Correct malformed `target="”_blank”"` attributes in `abenteurer.html`.
      (2026-09-21)
- [x] Run Lighthouse or equivalent checks and target LCP under 2.5s, INP under
      200ms, and CLS under 0.1 on representative German and English pages.
      Passed (2026-09-21): 100 performance desktop, 92 mobile with 100 in
      accessibility, best practices, and SEO. Fixes along the way:
      `fetchpriority="high"` on the first shelf cover of both homepages,
      `width`/`height` + `object-fit: cover` on the 12 mosaic images, and a
      mosaic gap fix (cells fill the row, figure margins reset, images block).

## P1 — Loading, error, and fallback states

**Fitting skills:** Impeccable `harden` and `audit`.

- [x] Add a custom 404 page in German and English that fits SAGA & SMOKE and
      links back to valid routes. Built as one bilingual `site/404.html` with
      the full German site header/footer, section links rewritten to homepage
      anchors, only `icons.js` + `overall.js` loaded, noindex, no canonical,
      not in sitemap. (2026-09-21)
- [ ] Define failure behavior for future forms, external purchase links,
      language switching, carousel initialization, and map panels.
- [x] Guard or document assumptions around `IntersectionObserver`, `matchMedia`,
      and `requestAnimationFrame` so unsupported environments fail gracefully.
      Done (2026-09-21): `script.js` (top-level and sticky-nav observer),
      `saga.js` (media queries plus an rAF helper with timer fallback), and
      `overall.js` (resize handler) are guarded; `icons.js` and `abenteurer.js`
      use none of these APIs. Zero behavior change on modern browsers.

## P2 — Visual system and motion maintenance

**Fitting skills:** Impeccable `extract`, `layout`, `typeset`, and `polish`;
`review-animations` before changing motion behavior.

- [x] Reduce duplicated legacy CSS and document the final token ownership for
      charcoal surfaces, parchment text, house accents, page accents, lines,
      radii, and shadows. Final ownership documented in a `saga.css` TOKEN
      OWNERSHIP block; dead legacy `:root` blocks removed from `style.css`,
      `books.css`, and `general.css`, including the invalid
      `--accent-color-tertiary: ##4b5f11`. Zero visual change. (2026-09-21)
- [x] Rebalance section spacing and heading margins after responsive fixes;
      prioritize content hierarchy over empty structural space.
- [x] Remove production `console.log` calls and dead JavaScript after behavior
      is verified. The remaining cleanup removed the production carousel log
      and its dead commented counterpart. (2026-09-21)
- [x] Micro-defect sweep from the fresh audit (2026-09-21): removed obsolete
      `name=`/`alt=` attributes from footer social anchors and icons on both
      homepages, shipped German carousel `aria-label`s in markup, rewrote the
      fragile stacked `saga.css` header comment, and evened feature-copy
      indentation. No visual or behavioral change.

## P2 — Housekeeping

**Fitting skills:** Impeccable `optimize` for asset cleanup; otherwise ordinary
repository maintenance.

- [x] Confirm whether `img/fox_logo_website.png` is used; remove it only if it is
      unused and not part of the brand archive. Confirmed USED as the
      `og:image`/`twitter:image` on both legal pages — kept, not removed.
      (2026-09-21)

## Non-negotiable preservation rules

- [ ] Preserve all public `.html` URLs, anchors, language paths, legal routes,
      `.de` redirect behavior, and existing Amazon URLs until a migration plan
      exists.
- [ ] Preserve primary navigation labels, form field names, logo treatment,
      legal copy, book facts, series counts, quotations, place/book associations,
      and the author's voice unless Renard explicitly approves a change.
- [ ] Do not invent prices, reviews, awards, dates, author details, book facts,
      sample content, or SEO claims.
- [ ] Do not rewrite long-form book copy as part of visual, accessibility, SEO,
      or code-health work.
- [ ] Keep the site static, GitHub Pages-compatible, system-font based, and free
      of unnecessary build or framework dependencies.

## Later / calendar

- [ ] Nov 2026: `.de` dies — remove redirect entries, delete DNS notes
- [ ] 2028-02: idle Hostinger hosting prepaid ends — nothing to do, verify
      no renewal attempt happens
