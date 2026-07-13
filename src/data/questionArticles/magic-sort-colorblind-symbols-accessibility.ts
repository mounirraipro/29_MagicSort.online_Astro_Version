import type { Article } from "../articles";

export const magicSortColorblindSymbolsAccessibility: Article = {
  slug: "magic-sort-colorblind-symbols-accessibility",
  title: "Can You Play Magic Sort Without Relying Only on Color?",
  description: "Use Magic Sort's alchemy-style symbols, higher-contrast palette, screen descriptions, and practical display settings to separate liquid groups.",
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  keywords: ["Magic Sort colorblind mode", "Magic Sort symbols", "accessible color puzzle", "liquid sort accessibility", "play without color"],
  category: "Accessibility",
  readTime: "12 min read",
  html: `
    <h2>The short answer</h2>
    <p>Yes. Magic Sort can display a distinct symbol on each liquid color so players do not have to identify groups by hue alone. The current set uses neutral alchemy-inspired marks such as Sun, Moon, Droplet, Spark, Fire, Water, Crystal, Spiral, and Orbit. Matching symbols indicate matching liquid identities. You can switch Symbols on or off in the game settings, and the preference is remembered in the same browser.</p>
    <p>The game also uses a higher-contrast palette and provides a text description of tube contents for assistive technology. These features improve redundant identification, but they do not guarantee that every player or every device will have the same experience. Use the controls and display adjustments that make the board clearest for you.</p>

    <h2>Why color alone is not enough</h2>
    <p>Color puzzles often assume that every hue looks clearly different. Real play conditions are less tidy. A player may have a color-vision difference, low vision, a dim screen, a warm display filter, glare, or simply a small phone. Purple and blue can become difficult to separate. Orange and yellow can merge under high brightness. Dark colors can disappear into a purple background.</p>
    <p>Good visual communication uses redundancy: color plus shape, text, position, or pattern. In Magic Sort, the symbol travels with the liquid group. Two groups with the same symbol belong together even if their colors appear similar.</p>
    <p>This approach also helps players who can distinguish the colors but struggle to remember which shade they saw in another tube. A name such as Droplet or Spiral is easier to hold in working memory than "the slightly cooler blue."</p>

    <h2>How to turn symbols on</h2>
    <ol>
      <li>Open <a href="/play/">Magic Sort</a> and begin a level.</li>
      <li>Open the in-game settings control.</li>
      <li>Select the button labeled <strong>Symbols: Off</strong> to change it to <strong>Symbols: On</strong>.</li>
      <li>Close settings and inspect the marks inside the liquid layers.</li>
    </ol>
    <p>Symbols are on by default for new browser storage. The setting is saved locally, so it should remain the same when you return with the same browser profile. Clearing site data, using private browsing, or switching devices can reset the preference.</p>
    <p>The Symbols control is temporarily disabled during a pour. Wait for the animation to finish before changing the mode. This prevents markers from rebuilding while liquid display objects are moving.</p>

    <h2>How to read the symbol set</h2>
    <p>The twelve identities are Sun, Moon, Droplet, Spark, Salt, Fire, Water, Air, Earth, Crystal, Spiral, and Orbit. Each appears within a light circular badge with a dark outline so the mark remains visible over bright and dark liquid colors.</p>
    <p>You do not need to memorize all twelve names. Start by comparing shapes. Upward and downward triangles differ in orientation and internal lines. Spiral has a curved path. Crystal has a faceted outline. Orbit uses crossing elliptical paths. Sun has concentric circles and a center dot.</p>
    <p>When planning, give the group a short spoken or mental label: "move Spiral onto Spiral" or "Droplet is under Moon." Shape names reduce ambiguity when the board contains several blue-green shades.</p>

    <h2>Use shape and color together</h2>
    <p>Redundant cues are strongest when both agree. First notice the hue family, then confirm the symbol. If two colors look similar but the symbols differ, treat them as different liquids. If the marks match, they belong to the same color identity even when lighting makes one instance look slightly different.</p>
    <p>This double check is useful before moving a large group. A mistaken identity can bury a needed layer and consume capacity. Taking half a second to confirm the mark is cheaper than undoing a sequence later.</p>
    <p>Players without a color-vision difference may also prefer symbols on harder levels because the board contains more tubes and repeated scanning becomes tiring.</p>

    <h2>Adjust the device before blaming your eyes</h2>
    <p>Display settings change color perception. Night Light, blue-light filters, extreme brightness, low contrast, and browser zoom can all affect the game. Try neutral color temperature, moderate brightness, and a viewing angle without glare.</p>
    <p>On desktop, enlarge the browser window or use the fullscreen control outside the game iframe. On mobile, rotate only if the alternative orientation gives larger tubes; the game adapts its layout, but the best orientation depends on screen shape. Keep the device close enough to see the symbols without straining.</p>
    <p>Do not disable an operating-system accessibility setting that you need elsewhere simply to play. Use Symbols as the primary compensation and adjust the game presentation around your normal setup.</p>

    <h2>What the text description provides</h2>
    <p>Magic Sort updates a screen-reader-friendly puzzle description that identifies tubes in order and lists their liquid symbols from bottom to top. Empty tubes are announced as empty. This gives assistive technology a structured summary of the state rather than leaving the canvas entirely unlabeled.</p>
    <p>The description can help with orientation and memory, but the game still relies on pointer interaction and animated canvas content. It should be viewed as an accessibility improvement, not a claim of complete keyboard or nonvisual equivalence.</p>
    <p>If a description and the visible board ever disagree after an Undo or rapid resize, wait for the board to settle. The description updates with gameplay UI state. Report persistent mismatches through the <a href="/contact/">contact page</a> with your browser and assistive technology details.</p>

    <h2>A symbol-first solving method</h2>
    <p>Begin by choosing two distinctive marks, such as Spiral and Crystal. Find every visible instance. Note which groups are already connected and which are buried. Then pick the symbol with the clearest destination.</p>
    <p>Before a pour, name three items: source symbol, revealed symbol, and destination symbol. For example, "Moon moves; Fire appears; Moon lands on Spiral temporarily." This creates a precise record even when the colors are difficult to distinguish.</p>
    <p>After several moves, scan only the symbol you are trying to complete. Ignoring unrelated hues reduces visual load. Once that tube is stable, choose the next mark.</p>

    <h2>Tips for similar geometric marks</h2>
    <p>Some alchemy-inspired marks share triangular geometry. Fire points upward. Water points downward. Air points upward with a horizontal bar. Earth points downward with a bar. Orientation and the bar are both meaningful.</p>
    <p>If those four remain difficult to separate at your screen size, combine mark reading with color and tube location. Refer to them as "up plain," "down plain," "up bar," and "down bar." The label does not need to match the official name; it only needs to be consistent for you.</p>
    <p>Crystal is more faceted than the elemental triangles and includes interior structure. Spark has a four-point shape with small dots. These details become clearer at normal or enlarged browser scale.</p>

    <h2>Playing with another person</h2>
    <p>Symbols make cooperative play easier because instructions become unambiguous. "Move Orbit from the right tube into the empty center tube" is clearer than "move the dark bluish color." One person can read the board while the other controls the pointer.</p>
    <p>Agree on tube numbering from left to right and top to bottom. Say source first, destination second. This mirrors the game's input order and reduces accidental taps.</p>
    <p>For children, let them invent memorable names for the marks. Consistent recognition matters more than technical terminology.</p>

    <h2>What accessibility mode does not change</h2>
    <p>Symbols do not change puzzle rules, timer values, generation, score, or star thresholds. They are a visual identification layer. Turning them on does not add a penalty and does not count as a Hint.</p>
    <p>The mode also does not reveal hidden future information. It identifies liquid currently represented on the board. Strategy still depends on capacity, connected group size, and move order.</p>
    <p>Because the game is rendered in an iframe canvas, browser extensions that recolor pages may affect the surrounding site differently from the game itself. Test your normal extension setup and use the symbol badges as the stable cue.</p>

    <h2>A two-minute accessibility setup</h2>
    <p>Before a longer session, open an early board and turn Symbols on. Identify four different marks without pouring. Next, lower and raise brightness slightly to find a comfortable middle point. Confirm that you can distinguish the plain and barred triangles, then test browser zoom or the outer fullscreen control. Finally, make one pour and check that the symbol moves with the liquid group.</p>
    <p>If any step remains unclear, use a larger display or ask another person to verify the first board with you. Once the setup works, leave it stable. Constantly changing brightness, color filters, or zoom during a puzzle makes comparisons harder and can create avoidable fatigue.</p>

    <h2>Feedback that helps improve accessibility</h2>
    <p>A useful report names the exact pair that is difficult, such as "Air and Fire look identical at 125 percent zoom on a 6-inch Android screen." Mention whether the problem is the mark, liquid contrast, badge size, animation, or screen-reader order. Screenshots are helpful when the issue is visual, but do not include unrelated personal information from your device.</p>

    <h2>Frequently asked questions</h2>
    <h3>Do symbols replace the liquid colors?</h3>
    <p>No. They appear on top of the colored liquid, providing a second identification channel.</p>
    <h3>Does turning on symbols affect my score?</h3>
    <p>No. Symbols are an accessibility preference, not a gameplay assist, and do not affect moves or stars.</p>
    <h3>Why did my symbol setting reset?</h3>
    <p>The preference is stored locally. Private mode, cleared site data, a different browser, or another device will not share the saved value.</p>
    <h3>Can a screen reader describe every tube?</h3>
    <p>The game provides a changing text summary listing each tube and its symbols from bottom to top. The overall canvas interaction may still require assistance depending on your setup.</p>
    <h3>Where can I report a contrast problem?</h3>
    <p>Use the site's contact form and include the device, browser, display mode, and which two symbols or colors are difficult to distinguish. Specific reports are the most useful for future adjustments.</p>
  `,
};
