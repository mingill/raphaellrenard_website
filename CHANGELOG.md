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
