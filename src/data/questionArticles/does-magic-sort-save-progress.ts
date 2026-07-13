import type { Article } from "../articles";

export const doesMagicSortSaveProgress: Article = {
  slug: "does-magic-sort-save-progress",
  title: "Does Magic Sort Save Your Progress, Stars, and Daily Best?",
  description: "Learn what Magic Sort saves in your browser, how level unlocks and best results work, and why progress may differ across devices or private sessions.",
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  keywords: ["does Magic Sort save progress", "Magic Sort stars saved", "Magic Sort daily best", "level progress browser", "Magic Sort local storage"],
  category: "Game Mechanics",
  readTime: "12 min read",
  html: `
    <h2>The short answer</h2>
    <p>Magic Sort saves ordinary level unlock progress and best level or daily results in your browser. Unlock progress is stored in a cookie, while stars, moves, Undo count, Hint count, and completion time for your best results are stored in local storage. There is no account-based cloud sync, so another browser, device, profile, or private session may show different progress.</p>
    <p>The daily puzzle itself is generated from the local calendar date. Its best result is saved under that date key. Clearing site data can remove progress, bests, and preferences, so browser storage should be treated as convenient local history rather than a permanent online account.</p>

    <h2>What happens when you complete an ordinary level</h2>
    <p>When a level is cleared, Magic Sort checks whether its number reaches or passes your current unlocked position. If it does, the game advances the completion value so the next level becomes available. The value is capped at the number of level settings.</p>
    <p>The level-selection screen reads this value and enables completed and newly available stages. The cookie is configured with a 360-day lifetime, although browser privacy rules, user settings, or manual clearing can shorten that practical lifetime.</p>
    <p>Unlock progress answers "how far have I reached?" It is separate from best-result history, which answers "how well did I solve this stage?"</p>

    <h2>What a best result contains</h2>
    <p>For ordinary levels and daily challenges, the game records a compact result with stars, completed moves, Undo count, Hint count, and an ISO completion timestamp. These records live in a versioned local-storage object.</p>
    <p>When you replay, the new result replaces the old one only when it is better. The comparison prioritizes higher stars. If stars are equal, fewer moves wins. If moves also match, fewer Undos wins. Hint count is stored for context but is not the final tie-breaker in the current comparison.</p>
    <p>This hierarchy prevents a one-star low-move run from replacing a three-star result. Quality tier comes first, then route efficiency.</p>

    <h2>How stars are saved</h2>
    <p>Stars are calculated at completion. The game derives a target from the number of filled color tubes and layers in the selected setting. It compares that target with an adjusted total: completed moves plus additional penalties for Undos and Hints.</p>
    <p>The saved result uses one to three stars. The level menu can display a compact best summary with star count and moves. Daily mode shows the best move count for that date when one exists.</p>
    <p>Stars are not a currency and do not unlock purchases. They are a local quality record designed for replay and improvement. The <a href="/blog/magic-sort-fewer-moves-three-stars/">three-star strategy guide</a> explains how to lower the adjusted total.</p>

    <h2>How the daily best is identified</h2>
    <p>Daily mode creates a key from the device's local year, month, and day. The puzzle generator uses that date to select and seed the board. The progress store uses the same date key to identify the result.</p>
    <p>Completing July 13 creates a best associated with July 13. On July 14, the game creates a new daily identity and a separate best slot. Reopening the July 13 challenge during that date uses the stable seed and lets you improve the same board.</p>
    <p>If two devices believe it is a different date because of time-zone or clock settings, they may show different daily challenges. The current mode is based on local date rather than a shared server reset at one global UTC moment.</p>

    <h2>Why progress does not follow you to another device</h2>
    <p>Cookies and local storage belong to a browser context. A desktop Chrome profile cannot automatically read data from Safari on a phone. Even two profiles in the same browser keep separate storage. Magic Sort does not currently ask you to sign in or upload gameplay history to a server.</p>
    <p>This local-only approach keeps the game quick and avoids requiring an account, but it means there is no built-in restore process after moving devices. A screenshot of your level menu can document progress, yet it cannot import the records into another browser.</p>
    <p>When choosing where to play regularly, use the same browser profile if maintaining your local bests matters to you.</p>

    <h2>What private browsing changes</h2>
    <p>Private or incognito windows isolate storage from normal sessions and often clear it when the private session closes. A level completed there may not appear when you return to a standard window. The exact behavior depends on the browser.</p>
    <p>Private mode is useful when you intentionally want a temporary session, but it is not suitable for long-term progress. It can also reset the Symbols preference and sound settings because those choices rely on browser-side state.</p>
    <p>If the game unexpectedly starts from the beginning, first check whether you opened a private window or a different browser profile.</p>

    <h2>What clearing site data removes</h2>
    <p>Using a browser's "clear cookies and site data" action can remove level unlocks, best results, and saved preferences. Clearing only cached images and files is different: cache removal forces assets to download again but may leave cookies and local storage intact, depending on the selected options.</p>
    <p>Read the browser dialog carefully. "Cookies and other site data" is the category most likely to affect progress. Extensions that automatically delete site storage can have the same effect.</p>
    <p>The site cannot restore a locally deleted record because it was never synced to an account. This is an intentional limitation of the current architecture.</p>

    <h2>Why a game update should not normally reset progress</h2>
    <p>Asset cache versions are changed so browsers fetch updated scripts, styles, and game images. The player-progress storage uses its own stable version key. A routine visual or gameplay update does not need to erase bests.</p>
    <p>A future data-format migration could require conversion or a new storage version, but that should be handled deliberately. The current progress module validates its version and falls back to an empty structure if stored data is malformed or incompatible.</p>
    <p>If a deployment appears to reset progress, report the browser, previous level, and whether other site data was cleared. That helps distinguish a storage migration from a local privacy action.</p>

    <h2>Why your best did not change after a replay</h2>
    <p>A replay result replaces the existing best only when the comparison says it is better. Suppose your best is three stars in 24 moves. A two-star result in 18 moves will not replace it because stars have priority. A three-star result in 23 moves will replace it. A three-star 24-move result replaces the old one only if it used fewer Undos.</p>
    <p>The result screen may still show your current performance even when it is not a new best. Look for the best indicator rather than assuming every completion overwrites history.</p>
    <p>This structure encourages experimentation without losing a stronger record.</p>

    <h2>A practical routine for preserving local progress</h2>
    <ol>
      <li>Use one normal browser profile for regular play.</li>
      <li>Avoid private mode when you want results to persist.</li>
      <li>When clearing browsing data, review whether site cookies and storage are selected.</li>
      <li>Keep the device date and time zone accurate for daily challenges.</li>
      <li>Capture the level menu occasionally if you want a human-readable record.</li>
    </ol>
    <p>No local browser storage should be considered an irreplaceable archive. The game records convenience data, not personal account ownership.</p>

    <h2>How progress and random generation interact</h2>
    <p>Ordinary level progress unlocks a setting number, not one immutable tube arrangement. Replaying level 30 can create another shuffled board under the same recipe. Your saved best remains associated with level 30 even though the new local arrangement may differ.</p>
    <p>The daily mode is different because its date seed keeps the arrangement stable for that day. A daily best therefore compares repeated attempts on the same generated identity more directly.</p>
    <p>Read <a href="/blog/how-magic-sort-levels-are-generated/">How Are Magic Sort Levels Generated?</a> for the full difference between settings, random layouts, and the seeded daily.</p>

    <h2>Troubleshooting missing progress</h2>
    <p>Start with the simplest checks. Are you on the same site address, browser, profile, and device? Are you in a normal window? Did a privacy cleaner run? Did you recently clear cookies? Is storage blocked for the site?</p>
    <p>Complete one early level and reload. If that unlock persists, storage currently works and the earlier history was probably removed or belongs to another context. If it disappears immediately, review browser privacy settings or test without an extension that clears storage.</p>
    <p>When asking for support, include the browser version, operating system, whether private mode is active, and what happens after a simple reload. Do not send unrelated private browsing data.</p>

    <h2>Frequently asked questions</h2>
    <h3>Do I need an account to save progress?</h3>
    <p>No. Progress is stored locally in the browser without sign-in.</p>
    <h3>Will my stars sync from phone to computer?</h3>
    <p>No. There is currently no cloud synchronization between devices or browsers.</p>
    <h3>How long is level unlock progress kept?</h3>
    <p>The game sets its unlock cookie for 360 days, but browser policies and user actions can remove it earlier.</p>
    <h3>Does refreshing erase my best score?</h3>
    <p>A normal refresh should not erase saved bests. Clearing site data, private browsing, blocked storage, or switching profiles can.</p>
    <h3>Is today's daily result saved tomorrow?</h3>
    <p>The result remains in local storage under its date key unless site data is removed. The menu focuses on the current date's puzzle rather than presenting a full historical calendar.</p>
  `,
};
