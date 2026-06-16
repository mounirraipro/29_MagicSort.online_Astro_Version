export type GameLevel = {
  id: number;
  title: string;
  gridSize: string;
  difficulty: string;
  image: string;
  thumbnail: string;
};

export type GameCategory = {
  slug: string;
  name: string;
  color: string;
  description: string;
  longDescription: string;
  levels: GameLevel[];
};

const tubeThumb = (index: number) => `/game/assets/tube_front_${String(index).padStart(2, "0")}.png`;

export const totalLevels = 30;

export const categories = [
  {
    name: "Starter Sorts",
    slug: "starter-sorts",
    color: "#57b8ff",
    description: "Begin with readable Magic Sort layouts that teach empty-bottle control and clean color matching.",
    longDescription:
      "Starter Sorts focus on simple bottle patterns, clear top colors, and enough open space to learn the core pouring rhythm.",
    levels: [
      { id: 1, title: "First Pour", gridSize: "4 bottles", difficulty: "Easy", image: tubeThumb(1), thumbnail: tubeThumb(1) },
      { id: 2, title: "Clean Match", gridSize: "5 bottles", difficulty: "Easy", image: tubeThumb(2), thumbnail: tubeThumb(2) },
      { id: 3, title: "Open Space", gridSize: "6 bottles", difficulty: "Medium", image: tubeThumb(3), thumbnail: tubeThumb(3) },
    ],
  },
  {
    name: "Color Control",
    slug: "color-control",
    color: "#6d5dfc",
    description: "Practice reading buried liquid layers and building completed tubes without wasting spare space.",
    longDescription:
      "Color Control levels ask players to plan two or three pours ahead while keeping at least one useful bottle open.",
    levels: [
      { id: 4, title: "Layer Read", gridSize: "7 bottles", difficulty: "Medium", image: tubeThumb(4), thumbnail: tubeThumb(4) },
      { id: 5, title: "Double Stack", gridSize: "8 bottles", difficulty: "Hard", image: tubeThumb(5), thumbnail: tubeThumb(5) },
      { id: 6, title: "Tidy Route", gridSize: "8 bottles", difficulty: "Hard", image: tubeThumb(6), thumbnail: tubeThumb(6) },
    ],
  },
  {
    name: "Tight Space",
    slug: "tight-space",
    color: "#ff8a4c",
    description: "Solve denser Magic Sort boards where every empty bottle matters.",
    longDescription:
      "Tight Space layouts are about patience, restarts, and avoiding pours that look legal but trap an important color.",
    levels: [
      { id: 7, title: "Narrow Room", gridSize: "9 bottles", difficulty: "Expert", image: tubeThumb(2), thumbnail: tubeThumb(2) },
      { id: 8, title: "Hidden Top", gridSize: "10 bottles", difficulty: "Expert", image: tubeThumb(4), thumbnail: tubeThumb(4) },
      { id: 9, title: "Last Bottle", gridSize: "10 bottles", difficulty: "Master", image: tubeThumb(6), thumbnail: tubeThumb(6) },
    ],
  },
] satisfies GameCategory[];

export const allLevels = categories.flatMap((category) => category.levels.map((level) => ({ category, level })));
export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);
