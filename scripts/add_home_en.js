const fs = require('fs');
const path = require('path');

const enPath = path.resolve('messages/en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

en.metadata.homeTitle = "Height Comparison Chart - Person Height, Character Height & More";
en.metadata.homeDescription = "Compare heights visually with our free height comparison chart and calculator. Compare people, celebrities, characters, and objects to scale side by side.";

en.home = {
  intro: {
    h1: "Height Comparison Calculator to Compare Heights Online with Visual Chart",
    p: "Use this height comparison tool to see heights side by side with a real-scale chart. Enter any height in centimeters, feet, or inches to view the height difference instantly. The tool shows a visual comparison using proportional scaling. This way, you can clearly see how tall or short one subject is compared to another. The chart updates in real-time and scales every figure from the exact value you enter. You can compare two or more heights at once and create a visual height difference chart in seconds. The tool also converts units automatically, so you can use cm, feet, or inches easily. It works for comparing people, celebrities, fictional characters, and real-world objects. This helps you understand size differences and proportions better.",
    freeLibraryBadge: "Free Online Library",
    freeLibraryDesc: "Access our database of ready-made reference heights across three collections, create unlimited custom comparisons, and export high-resolution PNG charts.",
    noAccounts: "No accounts",
    noPayments: "No payments",
    free100: "100% Free",
    compareNowCta: "Compare Now ↑"
  },
  section1: {
    eyebrow: "How it works",
    title: "How Does a Height Comparison Chart Work?",
    p1: "A height comparison chart converts raw height measurements into a visual chart where each bar represents the exact ratio between heights at true proportional scale.",
    p2: "If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09x the height of the first. A 10 cm gap at 160 cm reads proportionally different from the same gap at 190 cm. The height chart makes that distinction visible without any calculation on your part.",
    p3: "Use it as a height chart maker for families, teams, or creative projects.",
    imgAlt: "Height comparison chart of a 5'7\" and a 6'1\" person side by side",
    imgCaption: "Alex at 5'7\" (170 cm) and Ben at 6'1\" (185 cm), drawn to scale.",
    needGapTitle: "Need just the gap between two specific heights?",
    needGapDesc: "The Height Difference Calculator shows the exact difference in cm and inches, the percentage gap, and a visual bar. Use it when you need the precise height gap without building a full chart.",
    needGapCta: "Open Height Difference Calculator"
  },
  section2: {
    eyebrow: "Step by step",
    title: "How to Compare Heights Online: Step-by-Step for Beginners",
    step1Title: "Step 1: Begin with Your Comparison Setup",
    step1Desc: "Decide what to compare. Two friends, a celebrity and yourself, a group of anime characters, a person next to a landmark. Heights work in cm or ft/in. Switch units at any time using the toggle at the top of the chart.",
    guidebookNoteLabel: "Guidebook Note:",
    guidebookNoteText: "Search the celebrity height database and the tool fills heights in automatically. Browse anime character heights and fictional character heights from the Fictional panel. Character heights come from official guidebooks where a franchise publishes them.",
    panelPeople: "People",
    panelCelebrities: "Celebrities",
    panelCharacters: "Characters",
    panelObjects: "Objects",
    step2Title: "Step 2: Build your height chart",
    step2Desc: "Type names, add custom colors, and enter measurements. The height generator draws each figure immediately. The visual comparison scales dynamically as you add people or objects. Scale reaches up to 10,000 meters (32,808 ft), so you can line up a person next to the Eiffel Tower or Mount Everest.",
    panels: [
      { label: "Add Person", desc: "Name, gender, height in cm or ft/in, custom color." },
      { label: "Celebrities", desc: "Athletes, actors, historical icons worldwide." },
      { label: "Fictional", desc: "Anime, cartoons, superheroes from licensed databooks." },
      { label: "Entities & Objects", desc: "Animals, architectural landmarks, natural peaks." }
    ],
    step3Title: "Step 3: See the Difference, Then Share It",
    step3Desc: "Every bar is labelled with name and height. The gap between any two subjects is visible straight away. The height chart maker updates instantly with every change. Hit Download PNG for a clean image with a small site credit, or Share to get a direct link. Share links stay active for 7 days."
  },
  section3: {
    eyebrow: "Why use it",
    title: "Why a Visual Height Comparison Chart Shows More Than Numbers",
    description: "A visual height comparison chart renders the mathematical relationship between heights as a scaled image, making the size difference between subjects immediately readable without any calculation on your part.",
    card1Title: "Proportional scale reveals what numbers hide",
    card1Desc: "A 12 cm gap at 160 cm is proportionally larger than at 190 cm. The visual bars show that distinction instantly. Raw numbers alone never make this visible. Need to calculate the exact difference between two heights? Open the ",
    card1Link: "Height Difference Calculator",
    card2Title: "Compare yourself with anyone or anything",
    card2Desc: "Add yourself and drop in a celebrity, a fictional character, or a mountain. The chart scales all of them together accurately on one proportional axis.",
    card3Title: "Character height comparison for creative work",
    card3Desc: "Artists and writers visualise character relationships at verified scale from official production guides. Updates live as you type.",
    card4Title: "No unit conversions or manual calculations",
    card4Desc: "Enter heights in cm or ft/in. Subtraction, ratio, and percentage calculations all happen automatically as you type. Switch units at any time.",
    card5Title: "Real-world scale puts human height in context",
    card5Desc: "See a 175 cm person next to Mt Everest (8,848 m) to understand true scale. Compare human heights directly against natural and architectural landmarks on the same axis.",
    card6Title: "Exportable visual output in one click",
    card6Desc: "Download labelled PNGs or generate shareable URLs. Sized for social media, discussion forums, and presentations."
  },
  section4: {
    eyebrow: "Usage",
    title: "Comparing Heights: Examples and Use Cases",
    description: "Common real-world scenarios where visual proportional scaling provides immediate clarity over raw measurements.",
    useCases: [
      {
        tag: "COUPLES AND FRIENDS",
        quote: "\"Wait, how much taller are you than me, exactly?\"",
        desc: "Drop in both heights and see the exact gap on a proportional chart. A 10 cm difference is visually obvious straight away.",
        try: "165 CM + 178 CM · 13 CM GAP (7.9%)"
      },
      {
        tag: "SPORTS AND ATHLETES",
        quote: "\"Who actually has the height advantage here?\"",
        desc: "Build a visual lineup with NBA height comparison charts or any athlete height comparison. Coaches and fans use this to see the real height advantage with proportional data.",
        try: "NBA STARTER 200 CM · NFL LINEBACKER 188 CM · CLIMBER 174 CM"
      },
      {
        tag: "ANIME AND FANDOM",
        quote: "\"The wiki says one thing, but what does it actually look like?\"",
        desc: "Cross-franchise anime character heights at verified scale. Compare Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) and Levi (160 cm) side by side.",
        try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
      },
      {
        tag: "OBJECTS AND REAL-WORLD SCALE",
        quote: "\"I had no idea it was actually that big.\"",
        desc: "Place a person next to Angel Falls (979 m). Check standard door height (203 cm) or ceiling height against your own height for design decisions.",
        try: "PERSON 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8,848 M"
      },
      {
        tag: "ME VS CELEBRITY",
        quote: "\"Hang on, they are the same height as me?\"",
        desc: "Celebrity height comparison using published heights. Add yourself and find out exactly where you stand.",
        try: "YOU + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
      },
      {
        tag: "PLANNING AND DESIGN",
        quote: "\"Will this actually fit in my room?\"",
        desc: "Add a door frame or ceiling height alongside a person to check proportions before making decisions.",
        try: "PERSON 185 CM · STANDARD DOOR 203 CM · ROOM CEILING 260 CM"
      }
    ],
    tableTitle: "Height difference chart in feet and inches",
    tableDesc: "When you want to see how common pairings compare side by side, this height difference chart lists seven everyday examples in feet, inches, centimeters, and relative percentages."
  },
  section5: {
    eyebrow: "Why choose it",
    title: "Why Choose Our Height Comparison Tool?",
    description: "Professional toolset. Zero friction. No accounts.",
    features: [
      {
        title: "Instant height generator",
        desc: "This height generator renders your height chart as you type. No submits, no reloads."
      },
      {
        title: "Custom avatars",
        desc: "Six colors, Male/Female styles. Stays distinct with 10+ subjects on one height comparison chart."
      },
      {
        title: "Celebrity data",
        desc: "1,294 celebrities across athletes, Bollywood, British, and Asian figures. Counted directly in the database."
      },
      {
        title: "Fictional characters",
        desc: "1,138 fictional characters across Anime, Cartoons, DC, and Fantasy. Sourced from official franchise guidebooks where published."
      },
      {
        title: "Entities and objects",
        desc: "264 objects, animals, and landmarks at verified scale. Place a person next to a Patagonian Cypress, Angel Falls, or Mt Everest."
      },
      {
        title: "Image upload",
        desc: "Our image to height tool slots any photo into the chart at real proportions using auto-scale geometry."
      },
      {
        title: "Clean PNG export",
        desc: "Download height comparison PNG charts with a small site credit. Free, unlimited, high resolution."
      },
      {
        title: "Shareable links",
        desc: "A direct shareable height comparison link for your exact chart. Links stay active for 7 days with no account needed."
      }
    ]
  },
  section6: {
    eyebrow: "Data Accuracy",
    title: "How Accurate Is the Height Comparison Chart?",
    items: [
      {
        title: "Exact Scale Engine",
        desc: "Every figure is drawn from the exact value you enter: 170 cm renders at 170.00 on the canvas. Text labels round to the nearest cm or inch for readability, but the bars themselves never round."
      },
      {
        title: "Reference Values",
        desc: "Published heights for the same person often differ between sources. We use the most recently verified figure from a credible public source, but treat all presets as reference values."
      },
      {
        title: "Celebrity Records",
        desc: "Sourced from public records and biographical guides. Conflicting data is normalized to the most recent published figure. No crowd estimates."
      },
      {
        title: "Source Material",
        desc: "Character heights come from official production guides, licensed databooks, and verified franchise repositories."
      },
      {
        title: "Architectural & Natural Scale",
        desc: "Landmarks verified from architectural records. Animal heights measure to the shoulder (withers) rather than head or total length."
      }
    ]
  },
  section7: {
    eyebrow: "Feature Checklist",
    title: "A Height Comparison Website Built for Simplicity",
    description: "Everything you need to compare heights accurately, with zero barriers.",
    thFeature: "Feature",
    thFree: "What You Get, Free",
    rows: [
      ["Subjects per chart", "Unlimited — all on one proportional axis"],
      ["Ready-made heights", "2,696 presets (1,294 celebrities, 1,138 fictional characters, 264 objects)"],
      ["Supported units", "Centimeters, meters, feet and inches (switch anytime)"],
      ["Scale range", "A few centimeters up to 10,000 meters (32,808 ft) with dynamic auto-zoom"],
      ["Export options", "Clean PNG chart download with site credit; shareable links (7-day active duration)"],
      ["Account & price", "$0.00 forever — no account creation, no subscriptions, no credit card required"]
    ]
  },
  section8: {
    title: "Height Comparison FAQ",
    description: "Expert answers to common scaling, data, and height conversion questions",
    badge: "HELP CENTER"
  },
  section9: {
    eyebrow: "Discovery",
    title: "Compare Heights Online Tools and Articles",
    launchTool: "Launch Tool",
    privacyTitle: "Data Privacy And Rights",
    privacyText: "We do not sell your personal information to third parties. Under the California Consumer Privacy Act (CCPA) and similar state laws, you have the right to opt out of data sharing for cross-context behavioral advertising. Visit our ",
    privacyLink: "Privacy Policy",
    privacyTextEnd: " or contact us directly. Standard use of the height comparison tool collects zero personal information and requires no authentication.",
    cards: [
      {
        label: "Height Difference Calculator",
        desc: "Exact gaps in cm and inches, percentage difference, and reference chart for common height pairings.",
        badge: "Toolkit",
        href: "/height-difference-calculator"
      },
      {
        label: "Height Weight Percentile Calculator",
        desc: "Compare your height and weight against WHO and CDC population data. Includes a height weight chart by age and sex for adults and children.",
        badge: "Toolkit",
        href: "/height-weight-percentile-calculator"
      },
      {
        label: "Ideal Body Weight Calculator",
        desc: "Devine, Robinson, and Hamwi formulas side by side. Includes a complete height and weight chart by sex.",
        badge: "Toolkit",
        href: "/ideal-body-weight-calculator"
      },
      {
        label: "Image to Height Calculator",
        desc: "Measure height from a photo with no tape measure needed. Morning height variation and accuracy guides.",
        badge: "Toolkit",
        href: "/image-to-height"
      },
      {
        label: "Height Calculator",
        desc: "Khamis-Roche and Mid-Parental formulas for estimating adult height in children.",
        badge: "Toolkit",
        href: "/height-predictor"
      }
    ]
  }
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('Successfully updated messages/en.json with home namespace!');

