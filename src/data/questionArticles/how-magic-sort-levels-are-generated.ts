import type { Article } from "../articles";

export const howMagicSortLevelsAreGenerated: Article = {
  slug: "how-magic-sort-levels-are-generated",
  title: "How Are Magic Sort Levels Generated?",
  description: "See how Magic Sort combines level settings, complete color quantities, shuffled tube positions, empty space, and a seeded daily challenge.",
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  keywords: ["how Magic Sort levels are generated", "random Magic Sort levels", "Magic Sort daily challenge", "procedural puzzle generation", "Magic Sort levels"],
  category: "Game Mechanics",
  readTime: "13 min read",
  html: `
    <h2>The short answer</h2>
    <p>Magic Sort uses 90 predefined difficulty settings rather than 90 hand-authored tube layouts. A setting specifies values such as tube count, empty tubes, layers per full tube, timer, and responsive layout. When you start an ordinary level, the game builds complete quantities of each color, shuffles those liquid layers, and distributes them among the non-empty tubes. The exact arrangement can therefore change while the level's overall size and difficulty structure remain familiar.</p>
    <p>The daily challenge uses the same general construction with a date-based seeded shuffle. That makes the daily arrangement repeatable for the same local date. It is generated, not manually seeded into a database as a separate static board for every day.</p>

    <h2>Settings and layouts are different things</h2>
    <p>A level setting is a recipe. It says how many containers exist, how many begin empty, how many layers fill each active tube, and how long the timer runs. A layout is the specific order of colors produced when that recipe is shuffled.</p>
    <p>This distinction explains why two attempts can feel different. Level 20 still has the same structural values, but red may begin in different tubes after a fresh random generation. You are practicing the same scale of puzzle without memorizing one fixed list of moves.</p>
    <p>It also explains why a video solution for a level number may not match your board. Unless the video shows the same generated arrangement, its exact tube sequence is not transferable. Strategy guides are more useful than level-number walkthroughs for ordinary play.</p>

    <h2>What each level setting controls</h2>
    <p>The game currently defines 90 settings. Early stages use few tubes and a single empty container. Later stages increase tube counts, layer counts, and available empty space. Timer values expand as boards become larger. The settings also specify how many columns should appear and how much spacing the tube grid needs.</p>
    <p>Portrait values are stored separately because a phone cannot use the same wide grid as a desktop. The puzzle data remains the same, but tubes wrap into more rows and the board scales to fit the available area.</p>
    <p>These authored settings shape the difficulty curve. Randomness decides where colors appear; the recipe decides how much information and workspace the player must manage.</p>

    <h2>Step one: create the tubes</h2>
    <p>At stage setup, Magic Sort clears the previous board and creates the number of tube display objects required by the selected setting. Each tube receives the active tube style, fill measurements, masks, liquid containers, and interaction state.</p>
    <p>The game then creates a list of tube positions, shuffles it, and selects the required number of initially empty tubes. The remaining positions will receive liquid. Randomizing which tubes are empty changes the opening geometry even before colors are distributed.</p>
    <p>Empty tubes are not extra color slots in the inventory. They are workspace reserved by the level recipe. The number of filled tubes determines how many complete color quantities the stage needs.</p>

    <h2>Step two: build balanced color quantities</h2>
    <p>For each non-empty tube, the generator selects a color identity and creates one tube's full capacity of that color, divided into the stage's number of layers. If a full tube has four layers, one color contributes four equal units to the shared pool.</p>
    <p>The color selector cycles through the available palette and reshuffles the palette as needed. This lets large stages use many color identities while keeping complete quantities. The important invariant is that every selected color contributes enough liquid to occupy one completed tube.</p>
    <p>That balance is what makes the goal coherent. The puzzle does not intentionally ask you to finish a tube when only three quarters of its color exists.</p>

    <h2>Step three: shuffle and distribute</h2>
    <p>The generator shuffles the shared layer pool and the list of filled tubes. It then loops through the layers, placing each into a tube with enough remaining capacity. Tube order is reshuffled as distribution continues, preventing a simple fixed pattern.</p>
    <p>When neighboring layers in the same tube share a color, the game merges them into a connected visual group. A starting tube can therefore show one thick band rather than several identical thin bands. During play, that connected group moves together.</p>
    <p>After distribution, liquid shapes, surfaces, symbols, and tube data are built. The board is positioned according to the current screen orientation and faded into view.</p>

    <h2>Why the generator rejects an already solved board</h2>
    <p>A shuffle could theoretically place every complete color back into its own tube. That would produce a level with nothing to solve. Magic Sort checks the generated state before play. If all non-empty tubes are already full and uniform, it creates another arrangement.</p>
    <p>For an ordinary level, the retry uses normal randomness. For a daily challenge, the retry advances a deterministic generation attempt so the same date still arrives at the same accepted board when reopened.</p>
    <p>This check prevents trivial starts. It does not perform a full search for the shortest solution or certify every candidate's solvability. The separate <a href="/blog/are-magic-sort-levels-always-solvable/">solvability article</a> explains that limitation.</p>

    <h2>How the daily seed works</h2>
    <p>The daily mode creates a date key in year-month-day form using the player's local date. It hashes a string containing that date into a numeric seed. A deterministic random-number function uses the seed to make shuffle choices.</p>
    <p>The date also selects one setting from a limited range beyond the earliest tutorial-sized levels. This keeps daily boards substantial without jumping to the largest 26-tube configurations. Once the generator accepts an arrangement, it locks the generation attempt for that session.</p>
    <p>The practical result is simple: players on the same local date should receive the same daily shuffle under the same game version. Crossing midnight, changing the device date, or playing in a different local date context can change the key.</p>

    <h2>Why a seeded daily is better than fresh randomness</h2>
    <p>A fresh random board would change every time you reopened the daily challenge. You could not compare attempts fairly because a better score might come from an easier arrangement. A seed keeps the puzzle identity stable while still generating it from code.</p>
    <p>Stable identity also makes best results meaningful. Magic Sort stores daily bests under the date key. Stars come first, then moves, then Undo usage. Replaying the same arrangement lets you improve a route instead of waiting for favorable randomness.</p>
    <p>For bug reports, the date is a reproducible reference. Ordinary random levels require a screenshot because the number alone may not identify the layout.</p>

    <h2>Does random mean difficulty is random?</h2>
    <p>Partly. The authored setting controls the broad challenge: more tubes and layers require more scanning, and empty-tube count changes flexibility. The shuffle controls local difficulty: one arrangement may expose easy groups, while another buries them under awkward caps.</p>
    <p>This means difficulty can vary within a level number. The progression is a range rather than a perfectly smooth staircase. If one arrangement feels unusually hard, restarting can generate a new ordinary board, but doing so also means you are solving a different layout rather than overcoming the original.</p>
    <p>The daily challenge removes that variation for the day so replay improvement is more comparable.</p>

    <h2>Why Magic Sort does not need a database row for every board</h2>
    <p>Procedural construction keeps the game lightweight. The browser downloads the level recipes and generation code, then creates the board locally. There is no need to fetch a large file containing thousands of tube arrays.</p>
    <p>This supports faster transfers and many possible arrangements, but it trades away hand-authored solution paths. A verified puzzle library would need stored boards, solution testing, or both. Each model has benefits: procedural play offers variety; verified libraries offer exact reproducibility and formal solutions.</p>
    <p>Magic Sort currently combines procedural ordinary levels with a deterministic procedural daily mode.</p>

    <h2>Can you memorize a level?</h2>
    <p>You can learn the level's scale and useful strategies, but an ordinary restart may change the color distribution. Memorizing "tube three into tube seven" is less reliable than remembering "preserve one large gap and combine connected groups."</p>
    <p>You can memorize the current daily arrangement for that date because its seed is stable. Replay it and look for a shorter route. The board changes when the date key changes.</p>
    <p>This design rewards transferable planning. The <a href="/blog/safe-vs-risky-magic-sort-moves/">safe versus risky moves guide</a> focuses on decisions that work across layouts.</p>

    <h2>Why game versions matter for generated boards</h2>
    <p>A seed reproduces choices only when the generation rules, level settings, and shuffle order remain the same. If a future update changes the available colors, tube recipe, or distribution process, the same calendar date could produce a different result under the new version. That is normal for procedural content. When comparing a daily board with a screenshot, check both the date and whether the image came from the current game release.</p>

    <h2>Frequently asked questions</h2>
    <h3>How many level settings does Magic Sort have?</h3>
    <p>The current game defines 90 settings, ranging from small early boards to much larger tube grids.</p>
    <h3>Are all 90 levels hand designed?</h3>
    <p>The difficulty recipes are authored, but the ordinary color arrangements are generated by shuffling balanced color layers.</p>
    <h3>Why does my level look different after restarting?</h3>
    <p>Ordinary stages use normal randomness during setup, so a fresh setup can distribute the same color quantities differently.</p>
    <h3>Is the daily challenge random?</h3>
    <p>It is procedurally shuffled with a date-based seed. It looks random but remains repeatable for the same local date.</p>
    <h3>Does the generator prove every board has a solution?</h3>
    <p>No. It balances color inventory and rejects already completed starts, but it does not currently run an exhaustive solver over every generated arrangement.</p>
  `,
};
