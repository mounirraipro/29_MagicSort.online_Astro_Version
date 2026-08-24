import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../public/game/js/game-telemetry.js", import.meta.url), "utf8");
const messages = [];
let now = 100;
const parent = {
  postMessage(message, targetOrigin) {
    messages.push({ message, targetOrigin });
  },
};
const window = {
  location: { origin: "https://magicsort.online" },
  parent,
  performance: { now: () => now },
};

const context = vm.createContext({ window, Date, Math, String });
vm.runInContext(source, context, { filename: "game-telemetry.js" });

const telemetry = vm.runInContext("MagicSortTelemetry", context);
telemetry.gameLoaded({ critical_ready_ms: 80 });
telemetry.startLevel({ game_mode: "level", level_number: 1 });
now = 650;
telemetry.completeLevel({ game_mode: "level", level_number: 1, moves: 12, stars: 3 });
telemetry.completeLevel({ game_mode: "level", level_number: 1, moves: 12, stars: 3 });
telemetry.postScore({ level_number: 1, score: 4200 });

assert.deepEqual(
  messages.map(({ message }) => message.name),
  ["game_loaded", "game_start", "level_start", "level_end", "level_complete", "post_score"],
);
assert.equal(messages[0].targetOrigin, "https://magicsort.online");
assert.equal(messages[3].message.params.success, true);
assert.equal(messages[3].message.params.elapsed_ms, 550);

console.log(`Verified ${messages.length} ordered game telemetry events.`);
