import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

// A small adapter exercises the real menu handlers without a browser or saved player data.
const elements = new Map();
function $(selector) {
  if (typeof selector !== "string")
    return $(selector.testSelector || "fixture");
  if (!elements.has(selector)) {
    const element = {
      values: {},
      handlers: {},
      text(value) {
        this.values.text = value;
        return this;
      },
      html(value) {
        this.values.html = value;
        return this;
      },
      prop(key, value) {
        this.values[key] = value;
        return this;
      },
      attr(key, value) {
        this.values[key] = value;
        return this;
      },
      val(value) {
        this.values.value = value;
        return this;
      },
      toggleClass() {
        return this;
      },
      addClass() {
        return this;
      },
      each() {
        return this;
      },
      scrollTop() {
        return this;
      },
      focus() {
        return this;
      },
      on(event, selectorOrHandler, handler) {
        this.handlers[event + (handler ? ":" + selectorOrHandler : "")] =
          handler || selectorOrHandler;
        return this;
      },
    };
    elements.set(selector, element);
  }
  return elements.get(selector);
}

const storage = new Map();
const context = vm.createContext({
  $,
  URL,
  console,
  location: { href: "https://magicsort.online/game/index.html" },
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
  },
  setTimeout: () => 1,
  clearTimeout() {},
  versionGameAsset: (path) => `${path}?v=test`,
  loader: { getResult: () => ({}) },
  setThemeBackgroundImage() {},
  playSound() {},
  Image: class {},
});
context.window = context;
for (const file of [
  "menu-screens",
  "achievements",
  "player-profile",
  "cosmetic-catalog",
  "cosmetic-cabinet",
]) {
  vm.runInContext(
    await readFile(
      new URL(`../public/game/js/${file}.js`, import.meta.url),
      "utf8",
    ),
    context,
  );
}

const menu = context.MenuScreens;
assert.equal(menu.resumeLevel({ total: 90, unlocked: 200 }), 90);
assert.equal(menu.resumeLevel({ total: 90, unlocked: -1 }), 1);
assert.match(
  menu.icon("settings"),
  /https:\/\/magicsort.online\/game\/assets\/menu-icons\/settings.svg/,
);
assert.equal(menu.icon("invalid"), "");
let started;
menu.init({
  startLevel: (level) => {
    started = level;
  },
  startEndless() {},
});
const state = {
  page: 2,
  pageSize: 12,
  total: 90,
  unlocked: 16,
  getBest: (level) => (level < 16 ? { stars: 3, moves: 5 } : null),
};
menu.renderLevels(state);
assert.equal($("#htmlLevelTitle").values.text, "Levels 13-24");
assert.equal($("#htmlLevelGrid").values.html.match(/data-level=/g).length, 12);
assert.equal($("#htmlLevelGrid").values.html.match(/ disabled/g).length, 8);
assert.equal($("#htmlLevelProgress").values.value, 3);
assert.equal($("#htmlLevelPlay").values.text, "Play level 16");
$("#htmlLevelPlay").handlers.click();
assert.equal(started, 16);
menu.renderLevels({ ...state, unlocked: 17 });
assert.equal($("#htmlLevelPlay").values.text, "Play level 17", "A newly unlocked level becomes the next action");
menu.renderLevels({ ...state, page: 3 });
assert.equal($("#htmlLevelPlay").values.disabled, true);
started = null;
$("#htmlLevelPlay").handlers.click();
assert.equal(started, null, "A locked page must not start a level");
menu.renderLevels({ ...state, page: 8, unlocked: 90 });
assert.equal($("#htmlLevelGrid").values.html.match(/data-level=/g).length, 6);
assert.equal($("#htmlLevelNext").values.disabled, true);

context.CosmeticCabinet.init();
const browse = $("#htmlShopMenu").handlers["click:[data-cosmetic-type]"];
const apply = $("#htmlCabinetApply").handlers.click;
browse.call({ dataset: { cosmeticType: "background", cosmeticId: "emerald" } });
assert.equal(context.PlayerProfile.isOwned("background", "emerald"), false);
assert.equal(context.PlayerProfile.get().equipped.background, "classic");
apply();
assert.equal(context.PlayerProfile.getEssence(), 0);
assert.equal(context.PlayerProfile.get().equipped.background, "classic");
assert.match($("#htmlCabinetStatus").values.text, /350 more Essence/);

storage.set(
  "magic-sort:player-profile:v1",
  JSON.stringify({ version: 1, essence: 1000 }),
);
vm.runInContext(
  await readFile(
    new URL("../public/game/js/player-profile.js", import.meta.url),
    "utf8",
  ),
  context,
);
browse.call({ dataset: { cosmeticType: "background", cosmeticId: "emerald" } });
assert.equal(
  context.PlayerProfile.getEssence(),
  1000,
  "Browsing never spends Essence",
);
apply();
assert.equal(context.PlayerProfile.getEssence(), 650);
assert.equal(context.PlayerProfile.get().equipped.background, "emerald");
apply();
assert.equal(
  context.PlayerProfile.getEssence(),
  650,
  "An owned item is not charged twice",
);
assert.equal($("#htmlCabinetApply").values.disabled, true);
assert.equal(
  JSON.parse(storage.get("magic-sort:player-profile:v1")).equipped.background,
  "emerald",
);
$("[data-cabinet-tab]").handlers.click.call({
  dataset: { cabinetTab: "effect" },
});
assert.equal($("#htmlThemesPanel").values.hidden, true);
assert.equal($("#htmlEffectsPanel").values.hidden, false);
console.log(
  "Menu checks passed: pagination, locks, saved progress, explicit purchases, balances, persistence and tabs.",
);
