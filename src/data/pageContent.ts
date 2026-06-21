import { siteConfig } from "@/data/siteConfig";

export type ContentSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type ContentPage = {
  title: string;
  description: string;
  seoTitle?: string;
  keywords?: string[];
  schemaType?: "AboutPage" | "Article" | "Blog" | "ContactPage" | "FAQPage" | "HowTo" | "PrivacyPolicy" | "TermsOfService" | "WebPage";
  eyebrow?: string;
  updated?: string;
  intro: string;
  sections: ContentSection[];
};

const gameName = siteConfig.name;
const contact = siteConfig.contactEmail;
const updated = "June 16, 2026";

export const pageContent = {
  about: {
    title: "About Magic Sort",
    seoTitle: `About ${gameName} - Free Online Bottle Sorting Game`,
    description: `Learn what ${gameName} is, how the site supports calm puzzle play, and why the game is built for quick browser sessions.`,
    keywords: ["about Magic Sort", "bottle sorting game site", "browser puzzle game", "Magic Sort mission"],
    schemaType: "AboutPage",
    intro: "A clear, free, browser-first color sorting puzzle.",
    sections: [
      {
        heading: "What Magic Sort Is",
        body: "Magic Sort is a free browser puzzle focused on bottle-by-bottle liquid sorting. Each level gives you mixed color layers, limited empty space, and a simple goal: pour until every filled bottle holds one clean color.",
      },
      {
        heading: "Why The Site Exists",
        body: "Browser game sites are often noisy or too thin to be useful. Magic Sort aims for a cleaner balance: a playable game, practical help pages, useful strategy articles, and trust pages that explain how the site works.",
      },
      {
        heading: "Playability First",
        items: [
          "The game stays central on home and play pages.",
          "No account is required for core gameplay.",
          "The layout works on phones, tablets, laptops, and desktops.",
          "Supporting content explains rules, safety, privacy, and strategy without hiding the game.",
        ],
      },
      {
        heading: "Who Magic Sort Is For",
        body: "Magic Sort is for players who like short sessions of focused problem-solving. Some use it as a work break, some play with children, and some simply enjoy the tidy logic of sorting colors into place.",
      },
      {
        heading: "Contact The Team",
        body: `Send feedback, bug reports, accessibility notes, or partnership questions to ${contact}.`,
      },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    seoTitle: `Accessibility Statement | ${gameName}`,
    description: `${gameName} is committed to digital accessibility and to making the sorting game easier to use for as many players as possible.`,
    keywords: ["Magic Sort accessibility", "accessible browser game", "web accessibility statement"],
    updated,
    intro: "Our commitment to making Magic Sort accessible to everyone.",
    sections: [
      {
        heading: "Our Commitment",
        body: "Magic Sort is committed to improving digital accessibility for people with disabilities and to making the site easier to use for everyone.",
      },
      {
        heading: "Website Measures",
        items: [
          "Semantic HTML for clearer document structure.",
          "Keyboard access for website navigation.",
          "Responsive layouts for common device sizes and zoom levels.",
          "Readable text contrast and consistent navigation patterns.",
          "Plain-language help, policy, and support pages.",
        ],
      },
      {
        heading: "Game Accessibility",
        body: "The game itself has extra accessibility challenges because it relies on color recognition, visual planning, and precise click or touch input. We treat those limitations honestly and look for ways to improve clarity over time.",
      },
      {
        heading: "Known Limitations",
        items: [
          "The game requires visual distinction between colored layers.",
          "Touch or click controls may be difficult for some users with motor impairments.",
          "Third-party content, such as advertisements or embedded related games, may not meet the same standard.",
        ],
      },
      {
        heading: "Feedback",
        body: `If you encounter an accessibility barrier, contact us at ${contact}.`,
      },
    ],
  },
  blog: {
    title: "Magic Sort Blog",
    seoTitle: `Magic Sort Blog - Strategy, Focus, and Browser Puzzle Guides`,
    description: "Read Magic Sort guides about bottle sorting strategy, calm play, family use, focus routines, and browser game quality.",
    keywords: ["Magic Sort blog", "bottle sorting strategy", "browser puzzle guides"],
    schemaType: "Blog",
    eyebrow: "Guides",
    intro: "Short reads for better color sorting, calmer play, and cleaner browser game habits.",
    sections: [
      {
        heading: "What We Cover",
        items: [
          "Beginner and advanced Magic Sort strategy.",
          "Calm play routines for short focus breaks.",
          "Family guidance for shared puzzle sessions.",
          "Browser game quality, privacy, and safety notes.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact Us",
    seoTitle: `Contact ${gameName} Support`,
    description: `Contact the ${gameName} team for gameplay help, bug reports, accessibility feedback, privacy questions, or partnerships.`,
    keywords: ["contact Magic Sort", "Magic Sort support", "bottle sort game contact"],
    schemaType: "ContactPage",
    intro: "Have a question, suggestion, or policy concern? Send it here.",
    sections: [
      {
        heading: "Send A Message",
        body: "We value clear messages from players and partners. Whether you are reporting a bug, asking about the site, or suggesting an improvement, include enough detail for us to understand the issue.",
      },
      {
        heading: "Contact Details",
        items: [`Email: ${contact}`, "Response time: usually within 48 hours.", "Availability: players worldwide."],
      },
      {
        heading: "What To Include",
        items: [
          "The page or game state you were using.",
          "Your browser, device, and operating system.",
          "A short description of what happened and what you expected.",
          "Screenshots or reproduction steps if you are reporting a bug.",
        ],
      },
      {
        heading: "Advertising And Partnerships",
        body: "For advertising, publishing, or partnership questions, include your organization, website, proposal summary, and the placement or page you are asking about.",
      },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    seoTitle: `${gameName} Cookie Policy - Ads and Browser Storage`,
    description: `Learn how ${gameName} uses cookies, browser storage, and third-party ad technologies.`,
    keywords: ["Magic Sort cookies", "cookie policy", "browser storage", "ad cookies"],
    updated,
    intro: "This page explains how Magic Sort uses cookies and similar browser-side technologies.",
    sections: [
      {
        heading: "What Browser Storage Is",
        body: "Browser storage, including cookies and localStorage, lets a site remember simple information on your device. It can support preferences, gameplay state, delivery, security, and advertising.",
      },
      {
        heading: "How Magic Sort Uses These Technologies",
        items: [
          "Local gameplay state and preferences where supported by the game.",
          "Site delivery, security, and abuse prevention.",
          "Advertising technologies where ads are enabled.",
          "Basic contact or support flows that you choose to use.",
        ],
      },
      {
        heading: "Analytics",
        body: "We do not currently claim that Magic Sort runs Google Analytics on the site. If analytics tooling is added later, this page and the Privacy Policy will be updated.",
      },
      {
        heading: "Managing Cookies",
        body: "Most browsers let you block, delete, or manage cookies through settings. You can also manage personalized advertising choices through your ad provider settings where available.",
      },
      {
        heading: "Cookie Questions",
        body: `Questions about cookies or browser storage can be sent to ${contact}.`,
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    seoTitle: `${gameName} Disclaimer - Website and Game Notes`,
    description: `Read the ${gameName} disclaimer about gameplay, informational content, third-party links, and advertising.`,
    keywords: ["Magic Sort disclaimer", "website disclaimer", "browser game disclaimer"],
    updated,
    intro: "This disclaimer explains the limits of the information and services provided on magicsort.online.",
    sections: [
      {
        heading: "Entertainment Service",
        body: "Magic Sort is a browser-based entertainment and informational website. The game, guides, and blog are provided for general use and reference.",
      },
      {
        heading: "No Professional Advice",
        body: "Articles about attention, habits, family use, or screen time are informational only. They are not medical, psychological, educational, or legal advice.",
      },
      {
        heading: "Game Performance And Availability",
        body: "The game is provided as available. Performance may vary by device, browser, extensions, network conditions, and future changes to the site or embedded game files.",
      },
      {
        heading: "External Links And Ads",
        body: "The site may link to external websites or display third-party advertising. Those services are controlled by their own owners and policies.",
      },
      {
        heading: "Questions",
        body: `Questions about this disclaimer can be sent to ${contact}.`,
      },
    ],
  },
  faq: {
    title: "Magic Sort FAQ",
    seoTitle: `Magic Sort FAQ - Gameplay, Devices, Privacy, and Support`,
    description: `Frequently asked questions about ${gameName}, including gameplay, devices, privacy, ads, and support.`,
    keywords: ["Magic Sort FAQ", "liquid sorting game questions", "Magic Sort help"],
    schemaType: "FAQPage",
    intro: "Clear answers about gameplay, support, privacy, and how the site works.",
    sections: [
      {
        heading: "Is Magic Sort really free to play?",
        body: "Yes. Magic Sort is free to play in the browser. You do not need an account, app install, or paid unlock to access the main game.",
      },
      {
        heading: "Do I need to download anything?",
        body: "No. Magic Sort runs directly in your browser. If the page loads, you can start sorting without installing an app or extension.",
      },
      {
        heading: "What devices does Magic Sort support?",
        body: "Magic Sort is designed for modern desktop and mobile browsers. The layout adapts for phones, tablets, and larger screens so the bottles stay readable across common device sizes.",
      },
      {
        heading: "How do you play?",
        body: "Tap or click one bottle, then choose a destination bottle. You can pour into an empty bottle or onto the same top color when the destination has enough room.",
      },
      {
        heading: "How many levels are included?",
        body: "The current game includes 30 browser levels, with easier openings and denser late-game setups as the sorting flow tightens up.",
      },
      {
        heading: "Does Magic Sort work offline?",
        body: "An internet connection is required to load the site and game assets. After the page loads, gameplay itself is lightweight, but the site is not designed as a fully offline product.",
      },
      {
        heading: "Is Magic Sort safe for children?",
        body: "The game is designed to be family-friendly and does not include chat, public profiles, or account creation. Parents should still supervise use and review the Parents guide and Privacy Policy if children will use the site regularly.",
      },
    ],
  },
  "how-to-play": {
    title: "How to Play Magic Sort",
    seoTitle: `How to Play Magic Sort - Complete Bottle Sorting Guide`,
    description: `Learn how to play ${gameName} step by step, from basic bottle-pouring rules to strategy, planning, and common mistakes.`,
    keywords: ["how to play Magic Sort", "Magic Sort guide", "liquid sorting strategy guide", "bottle sort instructions"],
    schemaType: "HowTo",
    intro: "A full beginner-friendly guide to Magic Sort rules, controls, strategy, and common mistakes.",
    sections: [
      {
        heading: "The Goal",
        body: "Magic Sort starts each level with mixed liquid colors inside bottles. Your goal is to pour layers between bottles until each filled bottle contains one color from top to bottom.",
      },
      {
        heading: "Step 1: Pick A Bottle",
        body: "Select a bottle with a color on top. Before pouring, check whether the destination bottle is empty or already has the same top color.",
      },
      {
        heading: "Step 2: Pour By The Rules",
        body: "A pour is valid when the destination is empty or its top layer matches the color you are pouring, and there is enough room for the liquid.",
      },
      {
        heading: "Step 3: Protect Empty Space",
        body: "Empty bottles are the strongest tool in the game. Avoid filling every spare bottle unless the move completes a color or opens a better route.",
      },
      {
        heading: "Step 4: Finish Colors",
        body: "When you can complete one bottle with a single color, do it if it does not block another important move. Completed bottles reduce the number of choices you need to track.",
      },
      {
        heading: "Beginner Tips",
        items: [
          "Look at the second layer before moving the top color.",
          "Use empty bottles to expose hidden colors, not just to move liquid around.",
          "Avoid burying a color that has no matching destination.",
          "Restart early when every path feels blocked.",
        ],
      },
    ],
  },
  parents: {
    title: "Parents & Safety Guide",
    seoTitle: `Parents & Safety Guide | ${gameName}`,
    description: `${gameName} is a family-friendly browser puzzle. Learn how to think about safe, calm, and balanced use.`,
    keywords: ["Magic Sort for kids", "safe puzzle game", "children online safety", "family friendly browser games"],
    intro: "Everything parents need to know about Magic Sort and online safety.",
    sections: [
      {
        heading: "A Calm Puzzle Format",
        body: "Magic Sort is built around simple color sorting, no chat, no public profiles, and no account creation. It is best used as a short puzzle break rather than an endless default activity.",
      },
      {
        heading: "Potential Benefits",
        items: [
          "Planning: players think about the next few pours.",
          "Patience: harder levels reward slowing down.",
          "Pattern reading: top colors and hidden layers need attention.",
          "Shared play: adults can ask children to explain their next move.",
        ],
      },
      {
        heading: "Safety Commitments",
        items: [
          "No account creation is required to play.",
          "No chat rooms, messaging systems, or social features are included.",
          "No personal information from children is knowingly collected.",
          "Support and policy pages are visible from the site navigation.",
        ],
      },
      {
        heading: "Tips For Parents",
        items: [
          "Play together first so the rules are clear.",
          "Set session limits that fit your family routine.",
          "Use the game as a discussion about patience and planning.",
          "Use browser or device parental controls where appropriate.",
        ],
      },
      {
        heading: "Have Concerns?",
        body: `Parents and guardians can contact us at ${contact}.`,
      },
    ],
  },
  strategy: {
    title: "Strategy Guide",
    seoTitle: `Magic Sort Strategy Guide - Solve Bottle Puzzles Cleaner`,
    description: "Learn practical Magic Sort strategies for reading bottles, protecting empty space, planning pours, and recovering from stuck layouts.",
    keywords: ["Magic Sort strategy", "water sort tips", "bottle sort puzzle strategy", "color sort guide"],
    schemaType: "Article",
    intro: "A practical strategy guide for players who want cleaner solves and fewer stuck boards.",
    sections: [
      {
        heading: "Value Empty Bottles",
        body: "Empty bottles are your ability to reorganize. Spend them only when the move exposes a useful hidden color, creates a completed bottle, or opens a path that was blocked.",
      },
      {
        heading: "Read The Second Layer",
        body: "The top color tells you what can move now. The second layer tells you what becomes possible after that move. Good players check both before pouring.",
      },
      {
        heading: "Complete One Color At A Time",
        body: "A completed color reduces clutter and makes future choices easier. Do not chase every color equally; choose the cleanest near-finish and build around it.",
      },
      {
        heading: "Avoid Legal But Bad Moves",
        body: "Some pours are allowed but still harmful. If a pour uses your last empty bottle, buries a needed color, or creates no new option, wait.",
      },
      {
        heading: "Recover From Mistakes",
        body: "When stuck, stop moving quickly. Identify which colors are trapped, free one empty bottle if possible, and consider restarting if every move only makes the layout tighter.",
      },
    ],
  },
  "difficulty-guide": {
    title: "Difficulty Guide",
    seoTitle: "Magic Sort Difficulty Guide - Bottle Counts, Colors, and Space",
    description: "Understand Magic Sort difficulty, bottle count, color layers, empty space, and how to choose levels that match your focus.",
    keywords: ["Magic Sort difficulty", "water sort levels", "bottle puzzle difficulty", "choose puzzle level"],
    schemaType: "Article",
    intro: "Difficulty in Magic Sort comes from bottle count, color count, hidden layers, and how much empty space the level gives you.",
    sections: [
      {
        heading: "What Makes A Level Easy",
        items: [
          "Fewer colors.",
          "More empty bottles.",
          "Obvious matching top layers.",
          "Short routes to complete a first color.",
        ],
      },
      {
        heading: "What Makes A Level Hard",
        items: [
          "More colors and more mixed layers.",
          "Only one useful empty bottle.",
          "Several colors buried under similar stacks.",
          "Moves that look helpful but block the next pour.",
        ],
      },
      {
        heading: "When To Move Up",
        body: "Try harder levels when you can finish easy boards without using random pours, keep one empty bottle available, and explain why your next move helps.",
      },
      {
        heading: "Short Sessions",
        body: "If you only have a few minutes, play an easier level and focus on a clean finish. A completed small board is often better than abandoning a hard one halfway through.",
      },
    ],
  },
  "game-mechanics": {
    title: "Game Mechanics",
    seoTitle: "Magic Sort Mechanics - Bottles, Pours, Layers, and Space",
    description: "Learn how Magic Sort works, including bottle selection, valid pours, color layers, empty space, level completion, and browser controls.",
    keywords: ["Magic Sort mechanics", "valid pours", "bottle sorting rules", "liquid sorting game"],
    schemaType: "Article",
    intro: "Magic Sort is built from a small set of rules that create surprisingly deep sorting decisions.",
    sections: [
      {
        heading: "Bottle Selection",
        body: "A move starts when you select a source bottle. The game checks the top liquid layer because only the visible top color can pour.",
      },
      {
        heading: "Valid Pours",
        body: "A pour is valid when the destination is empty or has the same top color, and when the destination has enough room to receive the moving layer.",
      },
      {
        heading: "Layer Order",
        body: "The visible top layer changes after each pour. That means one move can expose a helpful color or reveal that a bottle is more tangled than it first looked.",
      },
      {
        heading: "Empty Space",
        body: "Empty bottles are not just spare containers. They are temporary workspaces that let you uncover, combine, and finish colors.",
      },
      {
        heading: "Winning",
        body: "A level is complete when every filled bottle contains a single color from top to bottom. Some bottles may remain empty at the end.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    seoTitle: `${gameName} Privacy Policy - Data, Ads, and Contact`,
    description: `Read the ${gameName} Privacy Policy and learn how data, ads, contact messages, and browser storage are handled.`,
    keywords: ["Magic Sort privacy policy", "data protection", "browser game privacy", "ad privacy"],
    updated,
    intro: "At Magic Sort, we aim to be clear about how data is handled when you use the site.",
    sections: [
      {
        heading: "Information You Provide",
        body: "When you contact us, you may voluntarily provide your name, email address, and message content. We only collect this information when you choose to submit it.",
      },
      {
        heading: "Automatically Collected Information",
        items: [
          "Browser type and version.",
          "Operating system and device type.",
          "Pages visited and approximate activity on the site.",
          "Referring website or search engine.",
          "General region-level information where provided by service logs.",
        ],
      },
      {
        heading: "Cookies And Local Storage",
        body: "Cookies and local storage may support site functionality, game preferences, advertising, and security. See the Cookie Policy for more detail.",
      },
      {
        heading: "Third-Party Services",
        body: "Magic Sort may display advertisements from third-party providers, including Google AdSense where enabled. Related games may also load from third-party iframe providers.",
      },
      {
        heading: "Children's Privacy",
        body: "Magic Sort does not require account creation and does not knowingly collect personal information from children under 13. Parents can contact us if they believe a child has provided personal information.",
      },
      {
        heading: "Privacy Questions",
        body: `If you have privacy questions, contact us at ${contact}.`,
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    seoTitle: `Terms of Service | ${gameName}`,
    description: `Read the ${gameName} Terms of Service and understand the rules for using the free browser puzzle site.`,
    keywords: ["Magic Sort terms of service", "terms and conditions", "browser game terms"],
    updated,
    intro: `Welcome to ${gameName}. By accessing or using the website and game, you agree to these Terms of Service.`,
    sections: [
      {
        heading: "Acceptance Of Terms",
        body: "By accessing Magic Sort, you acknowledge that you have read, understood, and agree to these Terms of Service and our Privacy Policy.",
      },
      {
        heading: "Description Of Service",
        body: "Magic Sort provides a free browser-based bottle sorting puzzle game, supporting guide pages, blog articles, and related browser game links.",
      },
      {
        heading: "Acceptable Use",
        items: [
          "Do not use the service for illegal or unauthorized purposes.",
          "Do not attempt unauthorized access to systems or servers.",
          "Do not disrupt or interfere with website operation.",
          "Do not scrape, copy, redistribute, or reverse-engineer protected game or site content beyond legally permitted use.",
          "Do not upload or transmit viruses, malware, or harmful code.",
        ],
      },
      {
        heading: "Advertisements",
        body: "Magic Sort may display third-party advertisements to support free access. We are not responsible for third-party ad content.",
      },
      {
        heading: "Disclaimer Of Warranties",
        body: "Magic Sort is provided as is and as available without warranties of any kind. We do not guarantee uninterrupted, error-free, or virus-free operation.",
      },
      {
        heading: "Terms Questions",
        body: `If you have questions about these Terms of Service, contact us at ${contact}.`,
      },
    ],
  },
} satisfies Record<string, ContentPage>;

export type PageKey = keyof typeof pageContent;
