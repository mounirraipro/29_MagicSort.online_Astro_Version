// Magic Sort units only. Publisher activation is separate from provider category filters.
export const adsterra = {
  enabled: (import.meta.env.PUBLIC_ADSTERRA_ENABLED ?? "true") === "true",
  consentKey: "magic-sort-adsterra-consent-v1",
  leaderboard: { enabled: true, key: "69c57e7bfab394f61a0a5e3a1bc7a623", width: 728, height: 90 },
  skyscraper: { enabled: true, key: "69f3c4bc657f34079352f7500afb5422", width: 160, height: 600 },
  socialBar: { enabled: true, src: "https://pl31569487.profitableratecpmnetwork.com/34/7c/0a/347c0a607788dbb1c35fb832da1553cd.js" },
  smartlink: { enabled: true, href: "https://www.profitableratecpmnetwork.com/f0q0uuezms?key=947896461fbb21d91fe019e0f3b5f212" },
};

// Explicit editorial allowlist: never load Social Bar on a page containing a game.
export const adsterraGuidePaths = ["/how-to-play", "/strategy", "/difficulty-guide", "/game-mechanics"];
