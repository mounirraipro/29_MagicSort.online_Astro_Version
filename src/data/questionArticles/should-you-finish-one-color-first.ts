import type { Article } from "../articles";

export const shouldYouFinishOneColorFirst: Article = {
  slug: "should-you-finish-one-color-first-magic-sort",
  title: "Should You Finish One Color at a Time in Magic Sort?",
  description: "Learn when completing one color is the right Magic Sort strategy, when it removes needed space, and how to choose the best color to finish first.",
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  keywords: ["finish one color Magic Sort", "which color first", "Magic Sort strategy", "complete a tube", "liquid sorting order"],
  category: "Strategy",
  readTime: "12 min read",
  html: `
    <h2>The short answer</h2>
    <p>Finishing one color at a time is a strong Magic Sort strategy when the final pours also free a source tube or leave enough workspace for the remaining colors. It is a weak strategy when completing the tube consumes your only large gap, requires several temporary moves, or distracts you from a more urgent buried color. Treat color completion as a tool, not an absolute rule.</p>
    <p>The best first color is usually the one that is already concentrated in a few accessible groups and can be completed with little storage debt. It is not always the color with the most visible layers. Sometimes the correct first project is freeing a bottleneck tube, then completing the color that the move reveals.</p>

    <h2>Why completing a color feels so powerful</h2>
    <p>A full single-color tube gives clear progress. It removes one color from active planning, reduces visual noise, and increases the completed-tube counter. You no longer need to remember where those layers belong. On a crowded board, that mental simplification is valuable.</p>
    <p>Completion can also improve physical space. If the final layer comes from a tube that becomes empty, you trade one destination for one new workspace tube. The board becomes cleaner without losing flexibility. This is the ideal completion: visible progress and neutral or positive space.</p>
    <p>The trap is assuming every completed tube creates space. A finished tube is full, so it cannot receive anything else. If the source of the final layer remains occupied, you may reduce the board's total usable capacity. The completion looks good while making every other color harder.</p>

    <h2>The three tests before finishing a tube</h2>
    <p>Use three quick tests: cost, replacement, and aftermath. <strong>Cost</strong> asks how many setup pours are required to expose the missing layers. <strong>Replacement</strong> asks whether any source becomes empty as the tube is completed. <strong>Aftermath</strong> asks whether the remaining large groups still have destinations.</p>
    <p>If the color needs one direct pour, empties its source, and leaves an open tube, finish it. If it needs four temporary pours, fills your only roomy destination, and traps a double group, delay it. Most real positions fall between these extremes, but the tests make the trade visible.</p>
    <p>You can apply the tests without calculating exact move counts. Simply identify the final two pours and imagine the board afterward. If you cannot picture where the displaced colors go, the completion plan is probably premature.</p>

    <h2>Choose the color with the lowest completion cost</h2>
    <p>Completion cost includes more than the number of missing layers. A color may have three visible pieces but be scattered across awkward mixed tubes. Another may have only two visible pieces, yet both are joined and ready to move. The second color often has the lower cost.</p>
    <p>Count groups rather than raw layers. One triple-height blue group is easier to manage than three separate blue layers because it moves in one pour. Check whether the destination can fit the largest group and whether the smaller group sits above a useful reveal.</p>
    <p>Also count temporary blockers. If a red layer is buried under yellow and green, those blockers need homes before red can finish. Their moves belong to red's true completion cost. Ignoring them is how a simple-looking plan turns into a long detour.</p>

    <h2>Finish a color when it empties a source</h2>
    <p>The strongest timing occurs when the final pour drains its source tube. Suppose a destination contains three quarters of the orange quantity, while a source holds the last orange group and nothing beneath it. Pouring orange completes one tube and empties another. You reduce active colors while preserving workspace.</p>
    <p>A similar pattern occurs across two moves. Moving a small cap exposes the final color group; transferring that group then empties the source. The cap move is temporary, but the empty tube repays the debt immediately.</p>
    <p>Look for this exchange throughout the level. Completing colors becomes much safer when empty sources appear at the same pace as finished destinations.</p>

    <h2>Delay completion when it consumes your only large gap</h2>
    <p>Partial tubes are not merely unfinished work. Their open space can hold connected groups. A tube with half its capacity free may be the only destination for a double layer. Filling it with its final matching color removes that option.</p>
    <p>Before completion, scan the board for large top groups. If one has no other destination, use the gap first or create another. You can return to the nearly finished color later. Its layers are already organized and unlikely to become harder to identify.</p>
    <p>This is especially important in levels with many layers per tube. As group sizes grow, small gaps stop being interchangeable. Protecting one large opening can matter more than marking one tube complete.</p>

    <h2>Do not chase a color that is deeply buried</h2>
    <p>A color can look close to complete because most of it is gathered, while the final layer sits at the bottom of a heavily mixed tube. Chasing that layer may require moving three unrelated groups and spending every empty space. The color is visually close but strategically far away.</p>
    <p>Instead, work on the blockers. If removing them naturally advances yellow and green, those colors may finish first. The original target will become cheap later. Good Magic Sort plans change as layers are revealed.</p>
    <p>This is why "one color at a time" should mean one current priority, not tunnel vision. You can prioritize purple while making supporting moves for the colors above it.</p>

    <h2>When two colors should advance together</h2>
    <p>Some layouts contain paired dependencies. Moving blue reveals pink, and moving pink creates the space blue needs. Trying to finish either color in isolation causes extra storage. Advance them together until one reaches a clean finish.</p>
    <p>Keep the plan short: "move blue, combine pink, then empty tube four." You are still organizing around clear targets, but you allow the board's structure to choose the order.</p>
    <p>Two-color planning is often more efficient than touching every visible color. It keeps dependencies understandable while avoiding the rigidity of a single-color rule.</p>

    <h2>What to do with an easy completed tube</h2>
    <p>Sometimes a color can be completed immediately with no obvious downside. Take the win, then leave the tube alone. Breaking a finished tube usually adds moves and restores a problem you already solved.</p>
    <p>The rare exception is when every remaining route is blocked and the completed tube is the only capacity available. Before breaking it, use Undo to check whether an earlier move can preserve workspace. If not, moving a finished group may be a legitimate emergency loan, but identify how and when it returns.</p>
    <p>Hint logic strongly discourages breaking full uniform tubes because most positions offer a cheaper alternative. Treat a completed tube as locked unless you can explain the payoff in one sentence.</p>

    <h2>A color-priority score you can use mentally</h2>
    <p>Give each candidate color one point for every helpful condition: it has a connected group, it needs no more than two pours, its final move empties a source, and its destination is not your only large gap. Subtract one point if its last layer is deeply buried or if setup requires a cross-color temporary stack with no exit.</p>
    <p>The highest score is a sensible first target. This is not a solver. It is a quick way to compare colors when several look appealing. Recalculate after a major reveal because the cheapest target can change.</p>
    <p>Experienced players do this intuitively. Making the criteria explicit helps beginners avoid choosing based only on appearance.</p>

    <h2>An example of good and bad timing</h2>
    <p>Imagine teal is three quarters complete. The final teal layer sits alone on top of orange. The teal destination is half open, and another double blue group needs that large gap. If you finish teal now, orange becomes visible but blue loses its only home. Completion is cheap but poorly timed.</p>
    <p>Move the double blue group into the teal gap first only if you have a plan to remove it, or better, create another large destination by consolidating yellow. Once blue has a home, undo or route teal into its final tube. The same completion becomes safe after the capacity problem is solved.</p>
    <p>Now change the example: the final teal layer is the entire content of its source. Completing teal empties that source, giving blue a full tube. In that case, finish teal immediately. The source replacement changes the answer.</p>

    <h2>How completion affects moves and stars</h2>
    <p>Completing a tube efficiently can lower future moves because the connected color no longer needs handling. Completing it through several temporary pours can do the opposite. Stars reward the whole route, not the number of tubes finished early.</p>
    <p>Use the HUD's sorted count as progress information, not a command. A low sorted count midway through a level is acceptable if you have built large groups and protected space. Several tubes may complete quickly near the end.</p>
    <p>For direct optimization, combine this approach with the <a href="/blog/magic-sort-fewer-moves-three-stars/">fewer moves and three stars guide</a>.</p>

    <h2>Frequently asked questions</h2>
    <h3>Which color should I finish first?</h3>
    <p>Choose the accessible color with the fewest separate groups and the lowest setup cost, especially when its final pour empties a source tube.</p>
    <h3>Should I always fill a tube when I can?</h3>
    <p>No. A nearly finished tube may provide the only gap large enough for another group. Check the board's capacity after completion.</p>
    <h3>Can I break a completed tube?</h3>
    <p>The game may allow it, but it usually adds work. Break one only when the released capacity creates a clear route that no other move provides.</p>
    <h3>Is it bad to work on two colors at once?</h3>
    <p>No. Two colors often have linked dependencies. Advancing a pair with a short plan is different from scattering attention across the whole board.</p>
    <h3>What is the simplest completion rule?</h3>
    <p>Finish the color when the move replaces the space it consumes. If the final pour empties its source, completion is usually well timed.</p>
  `,
};
