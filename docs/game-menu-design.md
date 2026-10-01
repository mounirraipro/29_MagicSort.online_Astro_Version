# Magic Sort: Garden Atelier Menus

The October 2026 refresh implements the approved bright alchemy direction: a sunlit workshop, purple fabric, wood, neutral surfaces, turquoise actions, and self-hosted Nunito text. Menu artwork contains no labels or controls.

## Ownership

- `public/game/js/menu-screens.js`: menu icons, Home progress, selected level, paginated level cards, earned stars and locked states. Game transitions are injected callbacks, not puzzle logic.
- `public/game/js/cosmetic-cabinet.js`: Atelier tabs, item selection, explicit Apply/Unlock actions, status messages and equipped background loading. `player-profile.js` remains the only owner of balances, ownership and persistence.
- `public/game/js/cosmetic-catalog.js`: unchanged IDs/prices, with optional short display labels. Existing saves remain compatible.
- `public/game/css/menu-layout.css`: design tokens, fonts, menu layouts, responsive rules and shared controls. The legacy engine/canvas styles stay in `main.css`.
- `public/game/index.html`: semantic menu markup. No baked-in image text.
- `scripts/build-menu-assets.mjs`: copies only the required Lucide icons and two Nunito weights, including licenses, from pinned npm dependencies. Runs during `build:game`.
- `scripts/test-game-menus.mjs`: isolated menu/purchase regression checks using Node's existing VM test pattern.

## Navigation

Home's Play/Continue opens the highest unlocked numbered level through the existing vial picker. This continues level progression, not an unfinished puzzle. The original endless challenge remains available from Levels. Daily, tube selection, timer, pouring, undo, rewards and progression are unchanged.

The level grid displays 12 levels per page and real saved stars. Selecting a tile does not start it until Play is pressed. All 90 levels remain accessible. Atelier retains the six existing backgrounds and three effects. Selecting an item never spends Essence; Unlock does. Applied items cannot be purchased again. Arrow keys, Home and End switch shop tabs.

Concept data was illustrative. The implementation uses real levels, prices and achievements; the second shop tab is Effects because that is the existing purchasable category. Vial selection is still available in the pre-game picker. No fake chapter names or progress were introduced.

## Art and Loading

Generated with the built-in ImageGen tool, then converted to WebP with Sharp:

- `public/game/assets/menu-garden-desktop.webp`: 77,086 bytes; sunlit ivory alchemy room, purple curtain, golden tabletop, open center, no UI/text/tubes.
- `public/game/assets/menu-garden-mobile.webp`: 71,424 bytes; portrait composition of the same scene, no UI/text/tubes.
- `public/game/assets/menu-sorting-tubes.webp`: 72,842 bytes; transparent trio of glass tubes, cyan/coral/yellow/mint layers with geometric white symbols, no UI/text/background.

These briefs reproduce the accepted concept's background and foreground separately. Responsive preload media select one backdrop. Original generated PNGs remain outside the repository; only the compressed production assets ship. Store artwork is reused unchanged. Assets and the iframe URL use version `20261001-board4`.

## Portrait Gameplay

- `public/game/js/gameplay-layout.js`: pure `fitCanvas`, `fitInterface` and `fitBoard` calculations, plus `positionBoard` to map the reserved HTML board rectangle into canvas coordinates. The production canvas is 900 x 1200 (3:4), uniformly scaled, never stretched. Desktop embeds are 520-680px wide instead of shrinking to a narrow phone-sized frame. Narrow landscape frames scale a minimum-width interface rather than clipping labels. The editor retains its orientation handling.
- `public/game/js/gameplay-ui.js`: `formatTime`, throttled `updateTimer`, `resetTimer`, completion status, mastery goals, result stars and settings switches. This module renders existing engine state; it does not calculate moves, scores, rewards or puzzle rules.
- `public/game/css/gameplay-layout.css`: compact two-row desktop HUD, clock, 44px horizontal tool buttons, responsive sizing and shared settings/result refinements. Mastery objectives are a native details popover behind the star button, not a permanent row of cards. At the tested 575 x 767 canvas, the HUD is 91px, the dock is 67px, and 76% of the height is reserved for the board. Obsolete HUD/assist/mastery styles were removed from `main.css` and `menu-layout.css` after confirming there were no remaining consumers.
- `src/styles/game-embed.css`: portrait embed sizing on both routes and fullscreen. The mobile fullscreen fallback now keeps the iframe in its existing DOM position, releasing ancestor clipping instead of reparenting and reloading the game.
- `scripts/test-gameplay-layout.mjs`: aspect-ratio checks, board bounds across all existing difficulties/vial widths, a minimum desktop tube-height regression, narrow-interface fit, clock update throttling, star/settings output and SVG image-loader regression coverage.

The alchemy sheet is explicitly loaded with `createjs.Types.IMAGE`. PreloadJS's inferred SVG loader returns a document rather than a drawable image, which made enabled liquid symbols invisible. No symbol designs, palette IDs, themes or save data were changed.

Gameplay browser checks covered valid pours, blocked Undo while pouring, move increments, undo to an empty stack, hints, restart, timeout, a five-move/three-star clear, the eight-tube Daily layout, settings, portrait fullscreen entry/exit without resetting the puzzle, and short landscape rotation. Tested viewport sizes: 320 x 568, 390 x 844, 844 x 390 and 1440 x 1000. These are desktop-browser viewport tests, not physical iOS Safari verification.

## Verification

Run `npm run test:menus`, `npm run test:gameplay-ui` and `npm run build`. Test Home, Levels, Daily, Endless, Atelier, settings and the vial picker at desktop, portrait and short landscape sizes. Verify the shop's insufficient-balance state, selection without purchase, locked levels, saved stars, and the real pour/undo path. Actual iOS Safari testing remains a separate device check.
