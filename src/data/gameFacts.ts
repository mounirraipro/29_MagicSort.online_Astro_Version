export const gameFacts = {
  levelCount: 30,
  validPour:
    "A pour is valid when the destination tube has enough empty capacity for the source tube's top color group. The destination color does not have to match.",
  controls:
    "Click or tap a source tube, then click or tap the destination tube. The game pours the visible top color group when the destination has enough room.",
  goal: "Complete the level by making every non-empty tube full and uniform, with one color from top to bottom.",
  saveBehavior:
    "Level unlocks and best results are stored locally in the current browser. Magic Sort does not use an account or cloud synchronization.",
  freePlay:
    "This Playtad browser edition is free to play without an account, app installation, or required download.",
} as const;

export type GameFacts = typeof gameFacts;
