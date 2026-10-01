# Magic Sort Astro

Astro version of Magic Sort, built from the proven browser-game site template and wired to the standalone bottle sorting game.

## Included

- Astro project config
- `@astrojs/sitemap` for generated sitemaps during build
- `@astrojs/partytown` for offloading Google scripts
- Google Analytics / Google Tag Manager helper component
- AMP-ready layout and AMP Google Analytics helper

## Setup

```bash
npm install
npm run dev
```

Set production values in `.env`. `SITE_URL` must be the final public origin so Astro can generate correct sitemap URLs:

```bash
SITE_URL=https://magicsort.online
PUBLIC_GTM_ID=GTM-TBJVHRC5
```

Customize the game name, description, genre, contact email, policy date, social defaults, and topic keywords in `src/data/siteConfig.ts`.

Page copy and page-level SEO live in `src/data/pageContent.ts`. Route-level SEO, canonical sitemap entries, JSON-LD schema choices, and crawl priority live in `src/data/seo.ts` and `src/data/siteRoutes.ts`.

## Optional Adsterra units (Magic Sort only)

The four supplied units and individual switches live in src/data/adsterra.ts.
The build-time master switch PUBLIC_ADSTERRA_ENABLED=true defaults to off.
Rebuild to apply changes. Google Tag Manager and game analytics are preserved.
The build no longer downloads a managed seller feed. public/ads.txt retains the
original independent Google seller entry; add only provider-verified seller records.

Activation remains a separate publisher decision; the release switch stays off.
Adult and gambling exclusions for magicsort.online and all four supplied units,
including Smartlink, remain unconfirmed. Request confirmation from Adsterra;
Block Blast filters do not establish filtering here. No tag flag or local test
proves creative safety. This integration does not change account settings or
implement a category-filter confirmation gate.

The 728x90 banner is below gameplay on / and /play/ at widths of at least 1024px
and only when its container fits. The 160x600 banner is in guide sidebars at
1200px and wider. Smaller screens never request these banners; shrinking an
already-loaded desktop page hides them. Widening requires a reload. Social Bar
runs only on /how-to-play/, /strategy/, /difficulty-guide/ and /game-mechanics/,
never on game routes. Sponsored Smartlink text is near the footer on those guides
and the two Magic Sort pages. No game controls redirect.

Visitors have no custom authorize-ad gate. Unset and previously allowed visitors
load eligible placements automatically; a footer checkbox lets them hide Adsterra
ads. The existing magic-sort-adsterra-consent-v1 key is retained, and explicit
refusals (including older expired refusals) are never automatically discarded.
New preferences have no automatic expiry. Storage failure or corrupt preferences
fail closed. Changing the setting reloads the page and may interrupt a puzzle;
revocation in another tab also reloads. Sponsored links are separate manual links.

Adsterra does not wait for a third-party CMP API. Unset/allowed preferences load
automatically when the publisher switch is enabled and Global Privacy Control is
not on. Saved refusals, including older expired refusals, remain blocked. No
independent CMP was found in the local source; Google Tag Manager is unchanged.
Remote tag-container settings are outside this code cleanup. This setup is not a
claim of jurisdiction-wide consent compliance or non-tracking advertising.

Banners invoke provider iframe-format scripts directly in the host document,
serializing shared atOptions. No custom wrapper iframe or invented category flags
are used. Mocked loader/layout QA cannot verify actual provider rendering, ad fill
or content, including compatibility with deferred direct script insertion.

Reusable preference for future projects: no custom authorization button for unset
visitors; auto-load eligible placements, preserve refusals and independent CMP
requirements, provide an accessible opt-out and accurate disclosures. Unit IDs,
provider mappings and filtering confirmations are always specific to each site.

To publish after the activation decision: set the master switch in the build environment,
run npm run build, review dist, and use the existing publishing workflow.
For local mocked QA, start the dev server with the switch true and intercept all
external requests before navigating. Check unset/allowed/denied/withdrawn preferences and Global Privacy Control,
desktop/mobile sizes, gameplay, repeated navigation and a master-off build.
Do not click live ads to test them.

Security headers are unchanged. If Caddyfile or public/_headers is active, its
current CSP blocks Adsterra. Before changing it, review and
approve exact script/frame/connect origins with the providers; delivery may use
additional partner origins. Do not broadly allow HTTPS scripts or disable CSP.
Production response headers and real ad delivery remain deployment checks.
