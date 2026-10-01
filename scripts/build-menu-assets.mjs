import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const icons = [
  "settings",
  "play",
  "grid-3x3",
  "sun",
  "shopping-bag",
  "chevron-left",
  "chevron-right",
  "arrow-right",
  "gem",
  "star",
  "lock-keyhole",
  "check",
  "undo-2", "lightbulb", "rotate-ccw", "timer", "trophy", "flask-conical",
  "zap", "sparkles", "flame", "volume-2", "music-2", "shapes", "log-out",
];
const target = join(process.cwd(), "public/game");
await mkdir(join(target, "assets/menu-icons"), { recursive: true });
await Promise.all(
  icons.map((icon) =>
    copyFile(
      join(process.cwd(), "node_modules/lucide-static/icons", `${icon}.svg`),
      join(target, "assets/menu-icons", `${icon}.svg`),
    ),
  ),
);
await Promise.all(
  [700, 900].map((weight) =>
    copyFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/nunito/files",
        `nunito-latin-${weight}-normal.woff2`,
      ),
      join(target, "css/fonts", `nunito-latin-${weight}.woff2`),
    ),
  ),
);
await copyFile(
  "node_modules/@fontsource/nunito/LICENSE",
  join(target, "css/fonts/nunito-LICENSE.txt"),
);
await copyFile(
  "node_modules/lucide-static/LICENSE",
  join(target, "assets/menu-icons/LICENSE.txt"),
);
