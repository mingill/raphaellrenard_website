# COLORS — Saga & Smoke palette

One charcoal universe, one accent per page. Everything lives in
`css/saga.css`: the `:root` house tokens plus the **accents** block
(`body.accent-*` classes). Every glow, button, line, marker, subheading,
book-stage gradient and language tag follows the accent automatically —
nothing is hardcoded per page.

## Constant base (all pages)

| Token | Value | Role |
|---|---|---|
| `--saga-bg0` | `#0d0b09` | charcoal ground |
| `--saga-bg1` | `#14110d` | panels |
| `--saga-bg2` | `#1e1812` | raised surfaces |
| `--saga-ink` | `#f0e6d2` | text |
| `--saga-muted` | `#c9b896` | secondary text |
| `--saga-faint` | `#8a7a5f` | faint lines, quiet text |
| `--saga-blood` | `#a0301c` | "unfinished" ribbon (global, never accented) |

## Per-page accents

| Page | Class | Ember (base) | Hot (hover/glow) | Gold (lines) | Stage mid | World |
|---|---|---|---|---|---|---|
| `index.html`, `en/index.html` | *(none — house)* | `#e8930c` | `#f7b733` | `#d9a441` | `#171208` | expedition ember |
| `apt.html` | `accent-jungle` | `#3fae6e` | `#82e6a8` | `#6fbf8f` | `#0b1a13` | pirates, jungle green |
| `festung.html` | `accent-sand` | `#d9b77c` | `#f4dcaa` | `#c9a45f` | `#1a140d` | desert fortress, pale sand |
| `abenteurer.html` | `accent-dusk` | `#c04527` | `#ef7d4f` | `#d06a3f` | `#1a0e0a` | orient, ember red |
| `proverbs.html` | `accent-violet` | `#9a6ee8` | `#c4a6ff` | `#a884f0` | `#141020` | purple cover |
| `oftheworld.html` | `accent-teal` | `#2ea8a0` | `#5fd6cc` | `#4fb8ae` | `#0b181c` | ocean teal |
| `impressum.html`, `datasecurity.html` | `accent-stone` | `#a08c5b` | `#c9b896` | `#a08c5b` | `#14110d` | quiet bronze |

Design rule: all accents sit in the same saturation/luminance band, so
pages feel like rooms of one house, not different houses. Sand and dusk
are deliberately stepped (pale sand vs deep ember red) so the warm book
worlds stay distinguishable.

## How to tweak

1. Change the hex + rgb triplet inside the page's `body.accent-*` block.
2. Done — buttons, glows (`--saga-glow`), hairlines (`--saga-line`),
   markers, subheadings, `.section-book` stage gradient and `.tag--place`
   all follow. The rgb triplets (`--saga-accent-rgb` etc.) feed every
   translucent `rgba()` in the file.
3. New page? Add a class + one row in the table above.

## Retired

- Old light-theme tokens (`--main-color` etc.) are remapped onto saga
  tokens and only survive for non-pilot legacy rules.
- `--el-*` elementals still tint index sections; book pages use accents.
- Google Fonts removed — system serif/sans stacks (`--saga-display`,
  `--saga-body`), zero external requests.
