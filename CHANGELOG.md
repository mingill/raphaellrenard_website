# Changelog

## 2026-09-21

### Homepage

- Confirmed and recorded the homepage's first visitor decision as choosing a
  book, with the curated three-book catalogue leading both language versions.
- Recorded the curated three-book gateway and clarified its CTA hierarchy:
  direct book links are primary, while the existing general author-store link
  remains secondary utility.
- Aligned the primary German and English shelves across responsive widths:
  one visible book starts on the second, two visible books start on the left
  two, and both arrows are hidden when all three books fit.
- Added a compact image-led all-books index to both homepages using existing
  covers and routes.
- Matched the index covers to the carousel treatment with centered alignment,
  rounded corners, and a restrained glow; removed visible title spans and
  divider lines while preserving accessible image names.
- Confirmed the homepage's title-led book choice as complete: the
  `Wähle ein Buch` / `Choose a book` heading and direct book links provide the
  closing decision without requiring a separate CTA section.
- Removed the obsolete German-only teaser from the English homepage.
- Added the translated world map and `Places` links to the English desktop and
  mobile navigation, preserving all existing place and book associations.
- Corrected the reviewed German typography and metadata errors, including
  `Nordens`, `arktische`, and `Vielschichtige`.

### Accessibility

- Restored reliable keyboard focus indicators across the shared site styles.
- Removed the global focus-outline reset from `css/general.css`.
- Removed the book-page carousel focus suppression from `css/books.css`.
- Preserved the existing SAGA & SMOKE ember `:focus-visible` treatment.
- No markup, JavaScript, route, copy, or visual-system changes were made.
- Converted the shared `Romane` / `Novels` flyout triggers across all 12 pages
  into labelled buttons with synchronized ARIA state.
- Added keyboard activation, Escape-to-close with focus return, and preserved
  outside-click closing for the book flyout.
- Added synchronized ARIA state to the mobile menu across all 12 pages.
- Added focus management, keyboard focus containment, Escape and link closing,
  scroll locking, and desktop-resize cleanup for the mobile menu.
- Converted the German homepage map markers into labelled button controls with
  synchronized panel state and accessible touch targets.
- Added keyboard and outside-click closing, Escape handling, close controls, and
  focus return for the map information panels.
- Preserved all existing map positions, content, cover links, and destinations.
- Replaced homepage carousel cloning and infinite scroll resets with finite shelves.
- Added labelled carousel regions, bounded arrow buttons, and keyboard
  Arrow/Home/End navigation for the homepage book collections.
- Preserved native touch scrolling and mouse dragging while measuring each
  movement from the current card width plus gap.
- Restored visible, SAGA-themed horizontal scrollbars and removed duplicate
  cloned focus targets. Book-page carousels and touch-flip behavior were not
  changed.
- Removed the visible flip controls from both homepages and made each full
  flipcard clickable and keyboard-operable with Enter and Space.
- Preserved independent book-link navigation and hidden-face focus protection.
- Removed all automatic flip timers and touch visibility observers.
- Fixed the flipcard quote layout so quote text, novel names, and book links
  use aligned rows without clipping the links inside the card.
- Aligned map info headings and close buttons in a two-column header row on both
  homepages, with the existing focus and close behavior preserved.
- Grouped the shared book navigation across all 12 pages: German pages use
  `Romane` and `Weitere Bücher`; English pages use `Novels`, `German novels`,
  and `Other books` in both desktop and mobile navigation.
- Preserved all public navigation labels, routes, titles, and book links while
  keeping group headings non-interactive and readable by assistive technology.
- Separated the mobile language switch with its own divider using the existing
  divider color.
- Localized the three English internal pages (`en/apt.html`,
  `en/proverbs.html`, `en/oftheworld.html`): desktop header and footer now use
  `Author`, `Impressions`, `Places`, `Novels` and `Contact` / `Imprint` /
  `Privacy`, matching the English homepage.
- Repointed the English internal header section links to the English homepage
  sections (`index.html#author`, `#impressions`, `#map`).
- Added `Author` / `Impressions` / `Places` links to the internal English
  mobile navigation, placed after the book groups and before the language
  switch.
- Centered the single English impressions flipcard in the middle grid column
  on desktop while preserving the single-column mobile layout and the German
  three-card layout.
- Removed the links from the six atmosphere mosaic images on both homepages.
  The mosaic is now purely decorative: same images, same layout, but no Tab
  stops and no duplicate destinations. All book pages remain reachable through
  the shelf, navigation, map, flipcards, and closing index.
- Passed Lighthouse checks: 100 performance on desktop, 92 on mobile with 100
  in accessibility, best practices, and SEO.
- Added `fetchpriority="high"` to the first book-shelf cover on both
  homepages for a faster LCP.
- Gave all 12 mosaic images explicit `width`/`height` and `object-fit: cover`
  so they keep their aspect ratio instead of stretching.
- Fixed the mosaic gap: image cells now fill the box edge to edge (row-height
  fill, figure margins reset, images displayed as blocks).
- Fixed the mobile headline cascade: phone `.heading-primary` sizes
  (`3.6rem` below 41em, `3rem` below 26em) now live in `site/css/saga.css`,
  which loads last, so the homepage headline no longer renders at the 6.2rem
  desktop size on phones.
- Fixed the sticky-header compensation: replaced `.sticky .section-hero` with
  `.sticky main > section:first-of-type` in `site/css/general.css`, so the
  homepage book shelf (and book-page tops) no longer slide underneath the
  fixed header and the opening subheading stays reachable.
- Tightened the mobile `#books` top padding (`4.8rem` → `2.4rem`) so less of
  the small phone viewport is header plus whitespace.
- Widened the phone map to nearly full width (`max-width: 100%` instead of
  `30rem` below 41em); markers and panels scale along automatically.
- Enlarged homepage and book-page carousel arrows from 40px to the 44px
  minimum touch-target size.
- Capped phone map panels at `max-width: 72%` so long panels stay inside the
  map on narrow screens; reduced the stacked flipcard gap (`6rem` → `4rem`).
  Card heights intentionally unchanged to protect the aligned novel links.
- Realigned map markers on tablets and phones: the earlier touch-target
  enlargement had shifted every dot 1.1rem down-right; restored with
  `translate: -1.1rem -1.1rem`, which composes with the hover zoom.
- Rebalanced section spacing around book discovery: the shelf keeps the most
  air (12.8/9.6) and the closing index was widened (6.4/8); mosaic, features,
  author, impressions, and map sit closer together. Mobile mirrors the rhythm,
  and flipcards were fixed from a silently inherited 9.6rem phone padding.
- Removed the hidden panorama images from all 8 book pages (files up to
  4000px wide, suppressed by `saga.css` on every page) with no visual change;
  the asset files remain on disk.
- Added `loading="lazy"` to both homepage mosaics and map images. Logos,
  shelf covers, and first book-page covers intentionally stay eager.
- Added a bilingual custom 404 page (`site/404.html`) in SAGA & SMOKE styling
  with the full site header/footer, links back to both homepages, featured
  books, and contact. Section links point to homepage anchors, only the icon
  and navigation scripts load, and the page is noindex with no canonical.
  so h3 (author name, book volume titles) now steps down to 2.0rem in
  `site/css/queries.css`. Justified text and line spacing intentionally
  unchanged per approval.
- Removed the remaining production carousel console log and its dead
  commented counterpart.
- Added `rel="noopener noreferrer"` to external links opened with
  `target="_blank"`, and corrected malformed quoted targets in
  `abenteurer.html` while preserving every destination.
- Added page-specific canonical URLs to all 12 public HTML pages. Canonicals
  use `https://raphaellrenard.com`, preserve every existing route, use `/` and
  `/en/` for the homepages, and use `.html` for document pages.
- Completed the hreflang matrix for the eight true German/English page pairs
  and added `x-default` links pointing to the German/default routes. German-
  only book pages and legal pages were intentionally left unchanged.
- Replaced the Ionicons CDN dependency across all 12 pages with the local
  `site/js/icons.js` inline SVG renderer. Added exact local Ionicons assets for
  the homepage feature icons, menu, close, Amazon, and Instagram marks.
- Restored the feature icon geometry and alignment by constraining native SVGs
  to the original 3.2rem glyph box, 1.6rem padding, and circular background.
- Added page-specific Open Graph and Twitter Card metadata to all 12 public
  pages: page-specific titles, existing descriptions, canonical URLs, real
  cover/hero/logo images with alt text, German/English locales, large-image
  cards for home and book pages, and compact cards for legal pages.
- Added `site/robots.txt` and `site/sitemap.xml` covering all 12 public pages
  with hreflang alternates on the eight German/English pairs.
- Added one JSON-LD structured-data block per public page (WebSite, Book,
  BookSeries, or WebPage as the existing facts support), with no invented
  identifiers, prices, or claims.
- Promoted the top visible heading on all 8 book pages and both legal pages
  from `h2` to `h1` with copy and styling untouched, so every public page now
  has exactly one `h1`.
- Replaced the shared generic description with unique page-specific
  descriptions on all 8 book pages (meta, Open Graph, and Twitter tags), and
  aligned the legal-page descriptions with their existing OG wording. Zero
  `Norderns` occurrences remain in HTML.
- Ran the full link audit: all internal links resolve, the .de domain serves
  the live site, and Amazon/Instagram URLs resolve. The 4 remaining `href="#"`
  placeholders are intentional markers for unreleased books.
- Audited all 61 shadow/glow declarations: the SAGA glow token is properly
  tokenized per page accent and hot-accent glows are consistent. Tokenized the
  unfinished-badge glow via `--saga-blood-rgb`; one dead white-glow rule was
  intentionally left untouched.
- Reviewed tight-leading and cramped-padding findings: all intentional
  (display headings, inset quote padding, full-bleed card images). No changes.
- Site owner completed the desktop/mobile browser pass: overflow, contrast,
  focus, touch targets, first viewport, and both language journeys confirmed.
- Documented final token ownership in a `saga.css` TOKEN OWNERSHIP block and
  removed the dead legacy `:root` token blocks from `style.css`, `books.css`,
  and `general.css`, including the invalid `--accent-color-tertiary` value.
  Zero visual change.
- Confirmed `img/fox_logo_website.png` is used as the social preview image on
  both legal pages — kept, not removed.
