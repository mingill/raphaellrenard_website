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
