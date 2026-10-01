import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const elements = new Map();
let writes = 0;
function $(selector) {
  if (!elements.has(selector))
    elements.set(selector, {
      values: {},
      text(value) {
        writes++;
        this.values.text = value;
        return this;
      },
      html(value) {
        writes++;
        this.values.html = value;
        return this;
      },
      val(value) {
        writes++;
        this.values.value = value;
        return this;
      },
      prop(key, value) {
        writes++;
        this.values[key] = value;
        return this;
      },
      attr(key, value) {
        writes++;
        this.values[key] = value;
        return this;
      },
      toggleClass(key, value) {
        writes++;
        this.values[key] = value;
        return this;
      },
    });
  return elements.get(selector);
}
const context = vm.createContext({
  $,
  MenuScreens: { icon: (name) => `<i data-icon="${name}"></i>` },
  createjs: { Types: { IMAGE: "image" } },
  tubes_arr: [],
  bubbles_arr: [],
});
context.window = context;
for (const file of [
  "gameplay-layout",
  "gameplay-ui",
  "levels",
  "asset-manifest",
]) {
  vm.runInContext(
    await readFile(
      new URL(`../public/game/js/${file}.js`, import.meta.url),
      "utf8",
    ),
    context,
  );
}
const { GameplayLayout: layout, GameplayUI: ui } = context;
assert.equal(
  context
    .buildGameplayAssetManifest()
    .find((asset) => asset.id === "alchemySymbols").type,
  "image",
);
for (const [width, height] of [
  [320, 480],
  [390, 585],
  [540, 810],
  [844, 390],
  [1440, 900],
]) {
  const canvas = layout.fitCanvas(width, height, 900, 1200);
  assert.equal(canvas.width / canvas.height, 3 / 4);
  assert.ok(canvas.width <= width && canvas.height <= height);
  assert.ok(canvas.left >= 0 && canvas.top >= 0);
  const ui = layout.fitInterface(canvas.width, canvas.height);
  assert.ok(ui.width >= 300);
  assert.ok(Math.abs(ui.width * ui.scale - canvas.width) < 0.001);
  assert.ok(Math.abs(ui.height * ui.scale - canvas.height) < 0.001);
}

// Every existing difficulty and all vial widths must fit the reserved board area.
for (const settings of context.levelSettings) {
  for (const vialWidth of [86, 181, 192, 205]) {
    const columns = settings.portrait.column;
    const rows = Math.ceil(settings.tubes / columns);
    const width = columns * (vialWidth + settings.portrait.marginX);
    const height = rows * (300 + settings.portrait.marginY);
    for (const bounds of [
      { x: 24, y: 280, width: 720, height: 520 },
      { x: 24, y: 330, width: 720, height: 390 },
    ]) {
      const board = layout.fitBoard(bounds, width, height);
      assert.ok(board.scale > 0 && board.scale <= 1.35);
      assert.ok((width + 100) * board.scale <= bounds.width + 0.001);
      assert.ok((height + 120) * board.scale <= bounds.height + 0.001);
      assert.ok(board.y - (height * board.scale) / 2 >= bounds.y);
      assert.ok(
        board.y + (height * board.scale) / 2 <= bounds.y + bounds.height,
      );
    }
  }
}

assert.equal(ui.formatTime(60000), "1:00");
// A two-row board must keep its tubes large at the minimum desktop frame width.
const desktopScale = 520 / 900;
const desktopBoard = layout.fitBoard({
  x: 16 / desktopScale, y: 104 / desktopScale,
  width: 488 / desktopScale, height: (520 * 4 / 3 - 184) / desktopScale,
}, 4 * (86 + 40), 2 * (300 + 50));
assert.ok(300 * desktopBoard.scale * desktopScale >= 180, 'Desktop tubes must remain at least 180px tall');
assert.equal(ui.formatTime(59400), "1:00");
assert.equal(ui.formatTime(-20), "0:00");
ui.resetTimer(60000);
assert.equal($('#htmlGameMastery').values.open, false);
const initialWrites = writes;
ui.updateTimer(59999, 60000);
assert.equal(
  writes,
  initialWrites,
  "Unchanged clock values must not cause per-frame DOM work",
);
ui.updateTimer(9000, 60000);
assert.equal($("#htmlTimeValue").values.text, "0:09");
assert.equal($("#htmlGameClock").values["is-urgent"], true);
assert.equal($("#htmlTimeProgress").values.value, 15);
ui.updateTimer(-1, 60000);
assert.equal($("#htmlTimeProgress").values.value, 0);
ui.resetTimer(90000);
assert.equal($("#htmlTimeValue").values.text, "1:30");
assert.equal($("#htmlGameClock").values["is-urgent"], false);
ui.renderStars(2);
assert.equal($("#htmlResultStars").values["aria-label"], "2 of 3 stars");
assert.equal(
  ($("#htmlResultStars").values.html.match(/is-earned/g) || []).length,
  2,
);
ui.renderSettings(true, false, true);
assert.equal($("#htmlSoundButton").values["aria-pressed"], "true");
assert.equal($("#htmlMusicButton").values["aria-pressed"], "false");
console.log(
  "Portrait layout, all difficulty/vial bounds, clock throttling, stars and settings checks passed.",
);
