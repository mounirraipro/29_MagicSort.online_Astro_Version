import { adsterra } from "../data/adsterra";
import { initializeBanners } from "./adsterra-banners";

let current: { preferences: HTMLElement; dispose: () => void } | undefined;
const hasGpc = () => (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
const optedOut = () => {
  try {
    const raw = localStorage.getItem(adsterra.consentKey);
    return raw !== null && JSON.parse(raw)?.allowed !== true;
  } catch { return true; }
};

export function initializeAdsterra() {
  const preferences = document.querySelector<HTMLElement>("[data-adsterra-preferences]");
  if (current?.preferences === preferences) return;
  disposeAdsterra();
  if (!adsterra.enabled || !preferences) return;
  const events = new AbortController();
  const permitted = () => !optedOut() && !hasGpc() && !document.documentElement.hasAttribute("data-adsterra-disabled");
  const toggle = preferences.querySelector<HTMLInputElement>("[data-adsterra-opt-out]")!;
  const status = preferences.querySelector<HTMLElement>("[data-adsterra-status]")!;
  let socialLoaded = !!document.getElementById("adsterra-social-bar");
  const banners = initializeBanners(permitted);
  const update = () => {
    toggle.checked = optedOut();
    status.textContent = permitted() ? "Adsterra ads can load automatically. You can hide them using this setting." : "Adsterra ads are off on this browser.";
    banners.update();
    if (!permitted() && socialLoaded) { location.reload(); return; }
    if (!permitted() || socialLoaded || !adsterra.socialBar.enabled || preferences.dataset.socialBar !== "true"
      || document.querySelector("[data-game-embed], .embedded-game-frame")) return;
    const script = document.createElement("script");
    script.id = "adsterra-social-bar";
    script.src = adsterra.socialBar.src;
    script.async = true;
    socialLoaded = true;
    document.body.append(script);
  };
  toggle.addEventListener("change", () => {
    try {
      localStorage.setItem(adsterra.consentKey, JSON.stringify({ allowed: !toggle.checked }));
      banners.update();
      location.reload(); // Preserve the existing preference interaction.
    } catch { status.textContent = "Your browser could not save this setting. Use your browser's site settings to block advertising."; }
  }, { signal: events.signal });
  window.addEventListener("storage", event => {
    if (event.key === adsterra.consentKey || event.key === null) update();
  }, { signal: events.signal });
  const timer = window.setInterval(() => {
    if (!preferences.isConnected) { disposeAdsterra(); initializeAdsterra(); return; }
    update();
  }, 1_000);
  current = { preferences, dispose: () => { clearInterval(timer); events.abort(); banners.dispose(); } };
  update();
}

function disposeAdsterra() { current?.dispose(); current = undefined; }
window.addEventListener("pagehide", disposeAdsterra);
window.addEventListener("pageshow", initializeAdsterra);
document.addEventListener("astro:before-swap", disposeAdsterra);
document.addEventListener("astro:page-load", initializeAdsterra);
