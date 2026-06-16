export type ExternalGame = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  seoOverview: string;
  howToPlay: string;
  strategyGuide: string;
  playerTips: string[];
  category: string;
  thumbnail: string;
  iframeUrl: string;
  accent: string;
  accentClass: string;
};

const playgamaCatalogId = "p_eb5ee739-3023-44bb-875d-81fe60b91666";
const playgamaIframeUrl = (slug: string) => `https://playgama.com/export/game/${slug}?clid=${playgamaCatalogId}`;
const playgamaThumbnail = (slug: string, extension = "webp") => `/game-thumbs/playgama/${slug}.${extension}`;

export const externalGames = [
  {
    slug: "block-puzzle",
    title: "Block Puzzle",
    shortTitle: "Blocks",
    description: "Play Block Puzzle online, a free browser logic game where you place shapes, clear lines, and keep space open.",
    seoOverview:
      "Block Puzzle is a useful companion for Magic Sort players because both games reward patience, space management, and deliberate placement. Instead of pouring liquid, you fit shapes onto a grid and clear full lines before the board fills up.",
    howToPlay:
      "Drag each available block shape onto the board. Complete a full row or column to clear it and create more room. The game ends when none of the current pieces fit.",
    strategyGuide:
      "Preserve one large open area instead of creating small gaps. Place awkward shapes early, clear lines when they improve future space, and avoid moves that leave isolated holes.",
    playerTips: [
      "Keep the center flexible for larger pieces.",
      "Avoid one-cell gaps unless they are about to clear.",
      "Place awkward shapes while the board still has room.",
      "Choose clears that improve the next placement.",
    ],
    category: "Spatial",
    thumbnail: playgamaThumbnail("block-puzzle"),
    iframeUrl: playgamaIframeUrl("block-blast-master"),
    accent: "#f97316",
    accentClass: "accent-orange",
  },
  {
    slug: "sudoku-block-puzzle",
    title: "Sudoku Block Puzzle",
    shortTitle: "Sudoku Blocks",
    description: "Play Sudoku Block Puzzle online, a block-placement game that mixes sudoku-style zones with line clears.",
    seoOverview:
      "Sudoku Block Puzzle keeps the calm planning rhythm of Magic Sort but changes the board into a 9 by 9 placement challenge. Players clear rows, columns, and square zones by fitting blocks cleanly.",
    howToPlay:
      "Drag each block onto the 9 by 9 board. Complete rows, columns, or 3 by 3 boxes to clear space and continue the run.",
    strategyGuide:
      "Think of the board as nine smaller zones. Look for moves that set up multiple clears and keep room for both long pieces and square pieces.",
    playerTips: [
      "Keep at least one 3 by 3 box close to clearing.",
      "Avoid splitting the board into tiny pockets.",
      "Place large pieces before the grid gets crowded.",
      "Look for row and box clears in the same move.",
    ],
    category: "Logic",
    thumbnail: playgamaThumbnail("sudoku-block-puzzle"),
    iframeUrl: playgamaIframeUrl("sudoku-block-puzzle"),
    accent: "#2563eb",
    accentClass: "accent-blue",
  },
  {
    slug: "2048-merge-blocks",
    title: "2048 Merge Blocks",
    shortTitle: "2048",
    description: "Play 2048 Merge Blocks online, a number puzzle where matching tiles merge into higher values.",
    seoOverview:
      "2048 Merge Blocks is a number-merging puzzle for players who like simple rules with deep planning. Like Magic Sort, every good move changes the shape of the next few decisions.",
    howToPlay:
      "Select matching number tiles and merge connected groups into a higher value. Keep combining numbers while preserving enough space for future matches.",
    strategyGuide:
      "Keep high-value tiles near each other and avoid scattering important numbers across the board. Strong chains come from setting up future groups, not only taking the biggest immediate merge.",
    playerTips: [
      "Build around one area of the board.",
      "Look for the largest connected group before merging.",
      "Keep open space around important numbers.",
      "Use power-ups only when they prevent a blocked board.",
    ],
    category: "Numbers",
    thumbnail: playgamaThumbnail("2048-merge-blocks"),
    iframeUrl: playgamaIframeUrl("2048-merge-blocks"),
    accent: "#f97316",
    accentClass: "accent-orange",
  },
  {
    slug: "brain-line-connect",
    title: "Brain Line Connect",
    shortTitle: "Line Connect",
    description: "Play Brain Line Connect online, a one-line logic puzzle where you connect every dot without crossing obstacles.",
    seoOverview:
      "Brain Line Connect is a quiet route-planning puzzle. It works well beside Magic Sort because both games ask players to pause, read the board, and commit to a sequence only after the path makes sense.",
    howToPlay:
      "Start on a dot and drag one continuous line through every required dot. Avoid blocked lines and restart the path when the route fails.",
    strategyGuide:
      "Before drawing, identify endpoints, chokepoints, and blocked corridors. Tight areas usually decide the route, so plan those before sweeping through open space.",
    playerTips: [
      "Plan the route before drawing.",
      "Solve tight corridors before open areas.",
      "Use obstacles as route boundaries.",
      "Reverse the start point when stuck.",
    ],
    category: "Logic",
    thumbnail: playgamaThumbnail("brain-line-connect"),
    iframeUrl: playgamaIframeUrl("brain-line-connect"),
    accent: "#8b5cf6",
    accentClass: "accent-violet",
  },
  {
    slug: "bubble-shooter",
    title: "Bubble Shooter",
    shortTitle: "Bubbles",
    description: "Play Bubble Shooter online, a free arcade puzzle where you aim, match colors, and clear bubble clusters.",
    seoOverview:
      "Bubble Shooter is faster than Magic Sort, but it still rewards color reading and board control. Aim carefully, match colors, and use chain reactions to keep the board from crowding the launcher.",
    howToPlay:
      "Aim the launcher at bubbles of the same color and shoot to create a matching group, usually three or more. Matched groups pop and disappear.",
    strategyGuide:
      "Do not only pop the first match you see. Aim for high clusters that can drop many lower bubbles at once, and use wall shots when a direct line is blocked.",
    playerTips: [
      "Target hanging clusters.",
      "Use bank shots for blocked colors.",
      "Avoid scattering single bubbles.",
      "Plan around the next bubble color.",
    ],
    category: "Arcade",
    thumbnail: playgamaThumbnail("bubble-shooter"),
    iframeUrl: playgamaIframeUrl("bubble-shooter-island-quest"),
    accent: "#8b5cf6",
    accentClass: "accent-violet",
  },
  {
    slug: "word-search",
    title: "Word Search",
    shortTitle: "Word Search",
    description: "Play Word Search online, a browser word puzzle where you scan the grid and find hidden themed words.",
    seoOverview:
      "Word Search changes the challenge from color sorting to careful scanning. It is a calm browser puzzle for players who want focus practice without timers or complicated controls.",
    howToPlay:
      "Read the word list, then search the grid horizontally, vertically, diagonally, forward, and backward. Drag across each full word to mark it.",
    strategyGuide:
      "Start with long words and rare letters because they create fewer possible locations. Search rows, columns, and diagonals in a consistent order.",
    playerTips: [
      "Use rare letters as anchors.",
      "Search one direction at a time.",
      "Start with longer words.",
      "Look for endings when starts repeat.",
    ],
    category: "Words",
    thumbnail: playgamaThumbnail("word-search"),
    iframeUrl: playgamaIframeUrl("word-search-hidden-words"),
    accent: "#f6b63d",
    accentClass: "accent-gold",
  },
] satisfies ExternalGame[];

export const getExternalGameBySlug = (slug: string) => externalGames.find((game) => game.slug === slug);
