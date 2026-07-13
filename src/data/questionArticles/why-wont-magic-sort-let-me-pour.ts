import type { Article } from "../articles";

export const whyWontMagicSortLetMePour: Article = {
  slug: "why-wont-magic-sort-let-me-pour",
  title: "Why Won't Magic Sort Let Me Pour Into a Tube?",
  description: "Find out why a Magic Sort pour is blocked, how tube capacity works, and what to check when tapping two bottles does nothing.",
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  keywords: ["why won't Magic Sort pour", "Magic Sort rules", "tube full", "liquid sorting controls", "invalid Magic Sort move"],
  category: "How To Play",
  readTime: "12 min read",
  html: `
    <h2>The short answer</h2>
    <p>Magic Sort blocks a pour when the source tube is empty, you tap the selected source again, the destination does not have enough room for the top liquid group, or another pour or menu action is still in progress. Unlike many traditional water-sort games, this version does not require the destination's top color to match. You can pour onto a different color when the tube has enough open capacity. That freedom is useful, but it also means you need to watch space carefully.</p>
    <p>If nothing happens, use a quick four-part check: confirm that the first tube contains liquid, choose a different second tube, look for visible room in the destination, and wait until the current animation finishes. In most cases, one of those checks explains the blocked action. You can <a href="/play/">open Magic Sort</a> in another tab and test each rule on an early level while reading this guide.</p>

    <h2>How selecting and pouring actually works</h2>
    <p>A move takes two taps or clicks. The first selects a source tube. The game lifts or focuses that tube so you can see which one is active. The second chooses a destination. If the destination can hold the complete top group, the pour begins. If it cannot, the game rejects the move and clears the selection.</p>
    <p>The phrase <strong>top group</strong> matters. When two or more neighboring layers of the same color have already joined at the top, Magic Sort treats that connected liquid as one group. You are not always moving a single thin band. A group can be much taller, so a destination that appears to have a little room may still be too full. The game does not split that connected group merely to squeeze part of it into a smaller gap.</p>
    <p>This is why a pour can work early in a level and fail later even though the two tubes look similar. The source may now have a double-height or triple-height top group. Check both the available gap and the thickness of the moving color before assuming the controls are unresponsive.</p>

    <h2>Reason one: the destination is too full</h2>
    <p>Capacity is the most common explanation. Every tube has a fixed usable height. A valid destination needs enough empty height for the entire connected top group from the source. If the source has one red layer, a one-layer gap is enough. If it has two joined red layers, that same gap is not enough.</p>
    <p>Try comparing the liquid line with the neck of the bottle. When the destination is already close to the top, choose a roomier tube. If no tube has enough space, look for a move that combines or relocates a smaller group first. This can create a larger gap for the group you originally wanted to move.</p>
    <p>Do not confuse a nearly full tube with a completed tube. A completed tube is full and contains one color. A nearly full mixed tube may still accept a small layer, but adding to it can be strategically expensive. A legal pour only tells you that the liquid fits. It does not tell you that the move will improve the board.</p>

    <h2>Reason two: you tapped the same tube twice</h2>
    <p>Tapping the selected source a second time cancels it. This is intentional. It gives you a quick way to change your mind without pouring. On a small phone screen, however, the cancellation can feel like a failed move if your second tap lands on the same bottle.</p>
    <p>Watch for the selected tube's focused position before making the second tap. If tubes are close together, tap near the middle of the destination rather than near an edge shared with its neighbor. Rotating a phone to a more comfortable orientation or using the dedicated <a href="/blog/magic-sort-mobile-browser-tips/">mobile play tips</a> can make selection clearer on dense levels.</p>
    <p>If you lose track of the selected tube, deliberately tap it once to cancel, pause, and begin the move again. A clean reset is faster than repeatedly tapping and wondering which bottle is active.</p>

    <h2>Reason three: the source has nothing to move</h2>
    <p>An empty tube cannot be selected as a source. Empty tubes are destinations and workspace. Select a non-empty tube first, then choose the empty one. This sounds obvious, but it is easy to reverse the order when planning quickly: your eyes focus on the empty space you want to use, and your finger taps it before the liquid you intended to move.</p>
    <p>A useful habit is to say the move in source-to-destination order: "blue into the left empty tube" or "orange from tube five into tube two." This tiny verbal cue reduces accidental reversals. It also helps when two people solve a level together, because both players know which tube should be selected first.</p>

    <h2>Reason four: the game is busy</h2>
    <p>Magic Sort temporarily disables new gameplay actions while liquid is moving, the tubes are settling, a level is opening, or a completion sequence is running. This prevents two pours from editing the same bottle state at once. On a fast device, the pause is barely noticeable. On a slower phone or during a larger pour, tapping before the animation ends can feel as though the next move was ignored.</p>
    <p>Wait until the pouring tube returns to its position and the liquid surface stops moving. Then select the next source. The Undo, Hint, Restart, and Symbols controls are also protected during active pours, because changing state halfway through an animation could make the visible board disagree with the saved puzzle data.</p>
    <p>If the board remains inactive long after an animation should have ended, reload the page once. A persistent freeze is different from a normal input lock. Before reloading, note that unfinished moves may not be recoverable, while completed level bests and unlocked progress are stored locally in the browser.</p>

    <h2>Magic Sort is more flexible than match-only water sort</h2>
    <p>Many water-sort apps allow a pour only onto the same top color or into an empty tube. Search results and generic guides often repeat that rule. Magic Sort currently uses a more flexible capacity rule: a top group can be placed onto another color as long as the destination has room. The goal is still to finish with every non-empty tube full and uniform.</p>
    <p>This difference changes strategy. A mixed-color destination can rescue you when matching tops are unavailable, but it can also bury a useful color. Think of cross-color pours as temporary loans. Before making one, identify where the moved color can go later and what color will be trapped below it.</p>
    <p>Suppose purple is on top of yellow and you move purple onto green. The pour may be legal because the green tube has space. It may even reveal the yellow you need. But the new purple-on-green stack now needs another move before green can be completed. The move is good only if revealing yellow is worth that future cost.</p>

    <h2>A troubleshooting sequence that takes ten seconds</h2>
    <ol>
      <li><strong>Check the source.</strong> It must contain at least one liquid layer.</li>
      <li><strong>Check the selection.</strong> The second tap must land on a different tube.</li>
      <li><strong>Compare group height with free space.</strong> Joined top layers move together.</li>
      <li><strong>Let the animation finish.</strong> Inputs are paused while the board is changing.</li>
      <li><strong>Try a clearly empty destination.</strong> This separates a capacity problem from a selection problem.</li>
    </ol>
    <p>If a small group pours into an empty tube successfully, the controls are working. Return with Undo if needed and reconsider the original destination's capacity. If no source can pour into a clearly empty destination after the board is still, refresh the game and test again.</p>

    <h2>Why a valid pour can still be a bad move</h2>
    <p>Once the rules are clear, the more interesting question is not "can I pour here?" but "what will this pour cost?" Magic Sort gives you broad legal freedom. Strategy comes from using less of it. A strong move usually joins useful colors, exposes a needed layer, creates an empty tube, or preserves a route back. A weak move merely transfers clutter.</p>
    <p>Before a cross-color pour, inspect the destination's current top. That color will be buried. Ask whether it has another visible copy you can work with, whether the new top group has a future home, and whether the source becomes empty. Emptying a source can justify a temporary mixed stack because you gain a full workspace tube in return.</p>
    <p>Undo is ideal for learning this distinction. Predict the result, make the pour, inspect the new board, and undo if the trade was poor. The move counter will return to its earlier number, but Undo usage still affects the final quality rating, so deliberate experiments are better than rapid guessing.</p>

    <h2>Frequently asked questions</h2>
    <h3>Do the colors have to match before I pour?</h3>
    <p>No. In this version of Magic Sort, the destination needs sufficient capacity, but its top color does not have to match. Matching pours are often strategically cleaner because identical neighboring layers merge, yet cross-color pours are available when you need temporary storage.</p>
    <h3>Why does one red layer fit but another red pour does not?</h3>
    <p>The second source may contain several connected red layers. They move as one taller group. The destination must fit that whole group.</p>
    <h3>Can I pour only part of a connected color group?</h3>
    <p>No. The game moves the connected top group together. Make more room elsewhere or move a smaller group first.</p>
    <h3>Why is Undo disabled?</h3>
    <p>Undo is disabled before the first completed move, during a pour, while the game is paused, and after the level has finished. Wait for the animation to settle or make one valid move first.</p>
    <h3>What should I do when every useful destination looks full?</h3>
    <p>Look for the smallest movable top group, a pour that empties its source, or a joined color that can be consolidated. If your current route consumed the available space, use Undo or Restart rather than filling tubes at random. The next guide in this series explains <a href="/blog/magic-sort-stuck-level-recovery/">how to recover from a stuck Magic Sort board</a> step by step.</p>
  `,
};
