// scripts/add_missing_i18n_keys.js
// Adds dashboard, home.cta, home.faq, home.visuals, and contact to all 10 locales.

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

const data = {
  en: {
    dashboard: {
      nav: {
        addPerson: "Add Person",
        celebrities: "Celebrities",
        fictional: "Fictional",
        entities: "Entities",
        addImage: "Add Image"
      },
      toolbar: {
        cmToFt: "cm → ft",
        ftToCm: "ft → cm",
        switchToImperial: "Switch to Imperial units",
        switchToMetric: "Switch to Metric units",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        zoomPercentage: "Zoom percentage",
        autoFit: "Auto Fit",
        editList: "Edit List",
        clearAll: "Clear All",
        share: "Share",
        generating: "Generating...",
        copied: "Copied!",
        error: "Error",
        linkCopied: "Link copied.",
        linkExpiry: "Links stay active for 7 days.",
        png: "PNG",
        downloadChart: "Download chart as PNG image",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit fullscreen"
      },
      canvas: {
        loading: "Loading Comparison...",
        addPersonPrompt: "Add a person to get started",
        addPersonAria: "Add a person to the chart",
        sameHeight: "Same height",
        sameHeightBoth: "{name1} and {name2} are both {height}.",
        gapTaller: "{name} is {pct}% taller",
        gapShorter: "{name} is {pct}% shorter",
        gapSummary: "{taller} is {tallerPct}% taller than {shorter} ({shorterPct}% shorter).",
        ref: "REF"
      },
      modal: {
        clearTitle: "Clear Chart",
        clearDesc: "Remove all subjects? This cannot be undone.",
        cancel: "Cancel",
        clearConfirm: "Clear All"
      },
      form: {
        enterDetails: "Enter Your Details",
        editPerson: "Edit Person",
        male: "Male",
        female: "Female",
        name: "Name",
        optional: "Optional",
        heightLabel: "Height (CM/FT)",
        heightPlaceholder: "Height",
        ftPlaceholder: "Ft",
        inPlaceholder: "In",
        avatarStyle: "Avatar Style",
        addPerson: "Add Person",
        saveChanges: "Save Changes",
        cancel: "Cancel"
      },
      personChart: {
        compareAgainst: "Compare against",
        tallestVsShortest: "Tallest vs Shortest",
        differencesVs: "Differences vs {name}",
        yourList: "Your List",
        reorder: "Reorder",
        edit: "Edit",
        remove: "Remove"
      },
      quickAdd: {
        quickInsertion: "Quick Insertion",
        quickAddAria: "Quick add {name}"
      },
      panels: {
        all: "All",
        celebritiesTitle: "Celebrity Selection",
        celebritiesSub: "Add icons to your comparison chart",
        celebritiesSearch: "Search by name or category",
        celebritiesLoading: "Loading celebrities...",
        celebritiesNotFound: "No celebrities found matching \"{query}\"",
        fictionalTitle: "Fictional Characters",
        fictionalSub: "Compare heights with fictional icons",
        fictionalSearch: "Search by name or universe...",
        fictionalLoading: "Loading characters...",
        fictionalNotFound: "No characters found matching \"{query}\"",
        entitiesTitle: "Objects & Landmarks",
        entitiesSub: "Real-world reference items and famous structures",
        entitiesSearch: "Search objects...",
        entitiesLoading: "Loading objects...",
        entitiesNotFound: "No objects found matching \"{query}\"",
        addImageTitle: "Add Custom Image",
        addImageSub: "Upload a photo to compare proportions"
      }
    },
    contact: {
      metadata: {
        title: "Contact Us | Height Comparison Calculator",
        description: "Contact the Height Comparison Calculator team to report a wrong height, a bug or a privacy request. Use the form or email us directly."
      },
      breadcrumb: {
        home: "Home",
        contact: "Contact Us"
      },
      header: {
        title: "Contact Us",
        description: "Have a question, feedback, or a height correction? Send us a message and we'll get back to you.",
        emailUs: "Email Us Directly",
        emailDesc: "For general inquiries, partnership proposals, or media questions.",
        reportBug: "Report a Bug",
        reportBugDesc: "Found a calculation issue or display glitch on a device? Let us know the details.",
        requestFeature: "Suggest a Feature",
        requestFeatureDesc: "Want a new celebrity, fictional character, or unit supported? We love suggestions.",
        privacyInquiry: "Privacy & Rights",
        privacyInquiryDesc: "Questions about your data or exercising legal privacy rights? Reach our compliance desk."
      },
      form: {
        title: "Send a Message",
        name: "Your Name",
        namePlaceholder: "Jane Doe",
        email: "Email Address",
        emailPlaceholder: "you@example.com",
        subject: "Subject",
        subjectPlaceholder: "e.g., Height correction for Robert Wadlow",
        message: "Message",
        messagePlaceholder: "Tell us what's on your mind...",
        submit: "Send Message",
        sending: "Sending...",
        successTitle: "Message Sent!",
        successDesc: "Thank you for reaching out. We will get back to you as soon as possible.",
        errorTitle: "Something went wrong. Please try again or email us directly."
      }
    },
    home: {
      cta: {
        heading: "Go on, build your comparison",
        description: "Free. No account. No limits. Compare unlimited people, celebrities, characters, and real-world objects at true proportional scale.",
        startComparing: "↑ Start Comparing",
        exploreCelebrities: "Explore Celebrity Heights"
      },
      section8: {
        sources: "Sources: CDC National Center for Health Statistics (NHANES 2021 to 2023), CDC growth charts, Guinness World Records. Checked November 2026.",
        items: [
          {
            q: "How do I compare two people's heights side by side?",
            a: "Click Add Person, enter a name and height in cm or ft/in, and pick a color. Add a second person the same way. The height chart updates instantly at exact proportional scale. You can also search the celebrity database or fictional character panel for pre-loaded heights."
          },
          {
            q: "How does the chart calculate proportions?",
            a: "The chart uses a visual ratio engine. If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09x the first. That ratio is calculated mathematically from the values entered. Bars use the exact values you enter, and only the text labels round, to the nearest cm or inch."
          },
          {
            q: "How many people can I add to one comparison?",
            a: "There is no limit. Add as many people, celebrities, fictional characters, and real-world objects as you want. All subjects share one proportional chart and the chart scales automatically."
          },
          {
            q: "What is the difference between this tool and the Height Difference Calculator?",
            a: "This height comparison tool generates a proportional visual chart for all subjects at true scale. The Height Difference Calculator returns the exact gap between two heights in cm, inches, and percentage. Use the comparison tool to see the visual, and the difference calculator for the precise number."
          },
          {
            q: "Who is the tallest person in the world?",
            a: "The tallest living person is Sultan Kösen of Turkey at 251 cm (8 ft 2.8 in), as measured by Guinness World Records in 2011. The tallest person ever recorded was Robert Wadlow of the USA at 272 cm (8 ft 11.1 in). You can add either to this height chart by entering the height in the Add Person panel."
          },
          {
            q: "What is the average height by age?",
            a: "Key US benchmarks from CDC data: 4-year-old boy: approx. 103 cm (3 ft 4 in). 10-year-old boy: approx. 138 cm (4 ft 6 in). 10-year-old girl: approx. 138 cm (4 ft 6 in). Adult men (US, 20 and older, 2021 to 2023): 175.0 cm (5 ft 8.9 in). Adult women (US, 20 and older, 2021 to 2023): 161.3 cm (5 ft 3.5 in). Median at age 20 on CDC growth charts: 176.9 cm for men and 163.3 cm for women. For full average height by age tables across all ages and genders, see our Height Weight Percentile Calculator."
          },
          {
            q: "Is 2 inches a big height difference?",
            a: "Two inches is 5.1 cm, about 3% of an average US man's height of 5'9\" (68.9 in). Side by side, the taller person's eye line sits 2 inches higher, about the short side of a credit card. Enter both heights in the chart to see the gap at true scale."
          },
          {
            q: "How much taller is 5'10\" than 5'7\"?",
            a: "5'10\" is 3 inches (7.6 cm) taller than 5'7\", or 4.5% taller. In centimeters, that is 177.8 cm against 170.2 cm."
          },
          {
            q: "How do I convert cm to feet and inches?",
            a: "Divide centimeters by 2.54 to get inches, then divide by 12 for feet. 169 cm is 66.5 inches, or 5 ft 6.5 in. To go the other way, multiply total inches by 2.54: 5'1\" is 61 inches, or 154.9 cm. The cm to ft button on the chart converts every subject at once."
          }
        ]
      },
      visuals: {
        libraryStackBar: {
          celebrities: "Celebrities",
          fictional: "Fictional",
          objects: "Objects",
          caption: "2,696 ready-made heights across three curated collections: celebrities, fictional characters, and real-world objects."
        },
        workedExample: {
          diff: "Difference",
          ratio: "Ratio",
          taller: "Ben is {pct}% taller",
          shorter: "Alex is {pct}% shorter",
          caption: "Alex at 5'7\" (170 cm) and Ben at 6'1\" (185 cm), drawn to scale from a zero baseline. Ben is 15 cm (5.9 in) taller: 8.8% taller than Alex, who is 8.1% shorter."
        },
        scaleLadder: {
          humanScale: "1 m (Human scale)",
          limit: "10,000 m (32,808 ft Limit)",
          person: "Person",
          eiffelTower: "Eiffel Tower",
          angelFalls: "Angel Falls",
          mtEverest: "Mt Everest",
          chartLimit: "Chart Limit",
          caption: "Shown on a logarithmic scale (each step is 10 times larger) so every marker fits. The tool itself draws all subjects on one linear axis."
        },
        gapPairBars: {
          shorterBase: "Shorter Base (160 vs 172 cm)",
          tallerBase: "Taller Base (190 vs 202 cm)",
          gapDiff: "12 cm gap = {pct}% difference",
          caption: "The same 12 cm gap represents a 7.5% height increase at shorter heights (160 vs 172 cm), but only a 6.3% increase at taller heights (190 vs 202 cm). Visual side-by-side charts reveal relative proportion that raw millimeter numbers obscure."
        },
        heightGapTable: {
          colPair: "Height Pairing",
          colDiff: "Difference",
          colTaller: "Taller %",
          colShorter: "Shorter %",
          colScale: "Visual Scale",
          caption: "Common height differences in feet and inches with exact conversions and proportional scaling. Directional percentages show both perspectives: how much taller the second person is, and how much shorter the first person is."
        },
        ageBenchmarks: {
          colPop: "Population / Age Group",
          colAvg: "Measured Average (CDC)",
          boy4: "Boy (Age 4, 50th%)",
          girl10: "Girl (Age 10, 50th%)",
          boy10: "Boy (Age 10, 50th%)",
          women: "US Women (20+, NHANES)",
          men: "US Men (20+, NHANES)",
          caption: "US adult averages from CDC FastStats / NHANES (Aug 2021 to Aug 2023) alongside CDC clinical growth chart medians for children. All bars drawn to scale starting from a zero baseline."
        },
        twoInchGap: {
          baseline: "0 cm baseline",
          eyeLevel: "Eye level",
          forehead: "Forehead",
          caption: "5'9\" and 5'11\" drawn to scale from a zero baseline. The tops sit 2 inches (5.1 cm) apart, a 2.9% difference. In face-to-face conversation, the 5'9\" person's eye level aligns directly with the 5'11\" person's eyebrow or forehead line."
        },
        conversionFlow: {
          step1: "Total Inches",
          step2: "Feet & Remainder",
          step3: "Final Result",
          caption: "Three-step conversion flow: divide centimeters by 2.54 to get total inches, divide by 12 to find whole feet, and round the remaining inches."
        }
      }
    }
  }
};

module.exports = { data };

