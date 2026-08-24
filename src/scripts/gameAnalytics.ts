const gameEventNames = new Set([
  "game_loaded",
  "game_assets_ready",
  "game_start",
  "level_start",
  "level_end",
  "level_complete",
  "post_score",
  "game_error",
  "return_to_game",
]);

type GameEventValue = string | number | boolean;

export type MagicSortGameMessage = {
  type: "magic-sort-event";
  name: string;
  params?: Record<string, unknown>;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const cleanParams = (params: Record<string, unknown> = {}) =>
  Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => ["string", "number", "boolean"].includes(typeof value))
      .slice(0, 16)
      .map(([key, value]) => [key.slice(0, 40), typeof value === "string" ? value.slice(0, 100) : (value as GameEventValue)]),
  );

export const pushGameAnalyticsEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (!gameEventNames.has(name)) return false;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...cleanParams(params) });
  return true;
};

export const isMagicSortGameMessage = (value: unknown): value is MagicSortGameMessage => {
  if (!value || typeof value !== "object") return false;
  const message = value as Partial<MagicSortGameMessage>;
  return message.type === "magic-sort-event" && typeof message.name === "string" && gameEventNames.has(message.name);
};
