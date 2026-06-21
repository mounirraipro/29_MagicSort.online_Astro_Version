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
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GTM_ID=GTM-TBJVHRC5
```

Customize the game name, description, genre, contact email, policy date, social defaults, and topic keywords in `src/data/siteConfig.ts`.

Page copy and page-level SEO live in `src/data/pageContent.ts`. Route-level SEO, canonical sitemap entries, JSON-LD schema choices, and crawl priority live in `src/data/seo.ts` and `src/data/siteRoutes.ts`.
