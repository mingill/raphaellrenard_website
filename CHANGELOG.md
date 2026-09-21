# Changelog

## 2026-09-21

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
