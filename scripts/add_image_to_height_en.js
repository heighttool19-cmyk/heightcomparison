const fs = require('fs');
const path = require('path');

const enPath = path.resolve('messages/en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

en.metadata.imageToHeightTitle = "How to Measure Your Height at Home Without Measuring Tape";
en.metadata.imageToHeightDescription = "Do you want to know how tall am I? Click to find out how to measure your own height without a measuring tape using our image to height calculator";

en.imageToHeight = {
  hero: {
    eyebrow: "Image to Height",
    title: "Measure Your Height From a Photo. ",
    titleAccent: "No Tape Measure Needed.",
    description: "Upload a full-body photo with a door, an A4 sheet, or a credit card in the frame. Mark the reference object and enter its real size, then draw a line from the floor to the top of the head. Get your height in centimeters and in feet and inches. Results land within 1 to 2 centimeters. Free, no sign-up, works on any device.",
    badgeFree: "Free to use",
    badgeNoAccount: "No account needed",
    badgePrivate: "Photo stays on your device",
    badgeUnits: "Results in cm and ft/in",
    ctaUpload: "Upload Your Photo and Measure Now",
    accuracyNotice: "Accurate to 1–2 cm. 100% private. Runs in browser.",
    prepTitle: "Check 3 Things Before Taking Your Photo:",
    prep1: "Full body in frame, head to toe with floor visible.",
    prep2: "Stand against the same wall as the reference object.",
    prep3: "Phone upright and level, at about waist height."
  },
  howItWorks: {
    eyebrow: "Five Taps, One Photo",
    title: "How the Image Height Tool Works: Step by Step",
    description: "A photo holds its own scale when one object of known size sits in the frame. Tell the tool how long that object is, and it can measure anyone or anything standing beside it.",
    stepPrefix: "Step",
    steps: [
      {
        step: "01",
        title: "Upload a full-body photo",
        desc: "Pick a photo that shows the person head to toe, with a door, an A4 sheet, or a card beside them. A doorframe is the most reliable option."
      },
      {
        step: "02",
        title: "Crop and confirm",
        desc: "Trim the edges so the person and the reference fill the frame cleanly, then tap Apply crop."
      },
      {
        step: "03",
        title: "Mark the reference and pick its size",
        desc: "Tap both ends of the door or card. Choose Door (203 cm), ID card (8.56 cm), A4 paper (29.7 cm), 1 metre, or type custom real size."
      },
      {
        step: "04",
        title: "Tap head and feet",
        desc: "Place a line from the floor beneath the subject's feet to the crown of their head. Start from the floor, not the feet, especially when footwear appears in the photo. Or tap AI auto-scan."
      },
      {
        step: "05",
        title: "Read your result and save to chart",
        desc: "Your measured height appears in both centimeters and feet and inches. Hit 'Save to Chart' to log it and compare against friends, family, athletes, or celebrities."
      }
    ]
  },
  whatYouCanMeasure: {
    eyebrow: "Beyond Your Own Height",
    title: "What You Can Measure from a Photo",
    description: "Anything works if a reference of known size stands at the exact same distance from the camera.",
    items: [
      {
        title: "Yourself, with no helper",
        desc: "Prop your phone upright at waist height, set the timer, and stand beside a door or a taped A4 sheet."
      },
      {
        title: "Children as they grow",
        desc: "Photograph your child against the same door every few months and save each result to the chart. Then check their predicted adult height.",
        linkLabel: "predicted adult height"
      },
      {
        title: "Anyone in an old photo",
        desc: "Family photos, team photos, or a celebrity beside a door all work, as long as a known object sits next to the person."
      },
      {
        title: "Furniture and doorways",
        desc: "Tape an A4 sheet to the wall next to a shelf, fridge, or doorway and measure it before you buy, move, or deliver."
      },
      {
        title: "Trees, walls and gates",
        desc: "Stand next to it and enter your own height as the reference size. Step back until both of you fit in the frame and keep the phone level. Tall objects lean away from the camera in photos, so treat the result as an estimate."
      }
    ],
    whyArTitle: "Why Use a Photo Instead of an AR Measurement App?",
    why1Bold: "Measures past moments:",
    why1Desc: " AR apps only measure what is in front of you right now. A photo allows you to measure historic pictures, past milestones, and archive shots.",
    why2Bold: "Zero installation:",
    why2Desc: " Runs natively in any modern browser on iOS, Android, Mac, or PC with no apps to download or subscriptions.",
    why3Bold: "Complete device privacy:",
    why3Desc: " Your photo stays securely inside your browser's local sandbox and is never uploaded to any remote server."
  },
  referenceObjects: {
    eyebrow: "Calibration Reference",
    title: "Which Reference Object to Use for Calibration",
    description: "The more certain you are of the reference size, the more you can trust the result. Standardized objects guarantee repeatable accuracy.",
    thObject: "Object",
    thSize: "Size to enter",
    thStandard: "Standard dimension?",
    thBestFor: "Best for",
    rows: [
      {
        object: "A4 sheet (long edge)",
        size: "29.7 cm",
        standard: "Yes, ISO 216",
        bestFor: "Taped to the wall beside the person"
      },
      {
        object: "Credit card (long edge)",
        size: "8.56 cm",
        standard: "Yes, ISO/IEC 7810",
        bestFor: "Close-up photos. Small, so tap its corners carefully."
      },
      {
        object: "Interior door",
        size: "203 cm in the US",
        standard: "No, varies by country and home",
        bestFor: "Full-body photos, after you measure the door once"
      }
    ]
  },
  accuracy: {
    eyebrow: "Empirical Accuracy Testing",
    title: "How to Get an Accurate Result from a Photo",
    description: "Two habits cause most of the error: standing in front of the reference and tilting the phone. Camera height on its own does not matter. Keep the phone upright and level, and stand against the same wall as the reference.",
    tiltLowTitle: "Low, Tilted Up",
    tiltLowBadge: "Reads taller",
    tiltLowDesc: "The top of the scene sits farther from the lens and shrinks, so the door looks short next to the person (+2.4 to +4.5 cm error).",
    tiltLevelTitle: "Level, at Waist Height",
    tiltLevelBadge: "Closest result",
    tiltLevelDesc: "The phone faces the wall square on, so the reference and the person maintain their true geometric proportions (0.0 cm error).",
    tiltHighTitle: "High, Tilted Down",
    tiltHighBadge: "Reads shorter",
    tiltHighDesc: "The floor sits farther from the lens and shrinks, so the door looks tall next to the person (−2.8 to −5.9 cm error).",
    tableTitle: "Our Controlled Accuracy Benchmark (14 Rendered Scenes)",
    tableDesc: "We evaluated 14 calibrated scenes with known heights taken from 3.5 meters away to isolate camera geometry from manual tap variations.",
    thSetup: "Photo Setup",
    thTrueHeight: "True Height",
    thMeasured: "Measured",
    thError: "Error",
    benchmarkRows: [
      {
        setup: "Phone level at 60, 100 or 130 cm, person against the wall beside the door",
        trueHeight: "172 cm",
        measured: "172.0 cm",
        error: "0.0 cm"
      },
      {
        setup: "Same, for a 120 cm child and a 190 cm adult",
        trueHeight: "120, 190 cm",
        measured: "120.0, 190.0 cm",
        error: "0.0 cm"
      },
      {
        setup: "Phone tilted up 10° from 60 cm",
        trueHeight: "172 cm",
        measured: "174.4 cm",
        error: "+2.4 cm"
      },
      {
        setup: "Phone tilted up 20° from 40 cm",
        trueHeight: "172 cm",
        measured: "176.5 cm",
        error: "+4.5 cm"
      },
      {
        setup: "Phone tilted down 10° from 160 cm",
        trueHeight: "172 cm",
        measured: "169.2 cm",
        error: "−2.8 cm"
      },
      {
        setup: "Phone tilted down 20° from 180 cm",
        trueHeight: "172 cm",
        measured: "166.1 cm",
        error: "−5.9 cm"
      },
      {
        setup: "A4 sheet as reference, phone tilted up 10°",
        trueHeight: "172 cm",
        measured: "176.8 cm",
        error: "+4.8 cm"
      },
      {
        setup: "Person standing 30 cm in front of the door",
        trueHeight: "172 cm",
        measured: "188.1 cm",
        error: "+16.1 cm"
      },
      {
        setup: "Person standing 60 cm in front of the door",
        trueHeight: "172 cm",
        measured: "207.6 cm",
        error: "+35.6 cm"
      }
    ],
    pixelSensitivityBold: "Pixel Sensitivity:",
    pixelSensitivityDesc: " Tapping adds its own error, and small references magnify it. On a phone screen, missing one end of the reference by a single screen pixel moves a 172 cm result by about 1 cm with a door, 7 cm with an A4 sheet, and 23 cm with a card. Use the biggest reference in the photo, and zoom in before tapping.",
    tips: [
      {
        title: "Camera tilt",
        desc: "Camera tilt is the single biggest source of error in photo-based measurement. Hold the phone upright and level at about waist height for an adult, then step back until both head and feet fit cleanly."
      },
      {
        title: "Reference placement",
        desc: "Stand against the same wall as the reference object, not in front of it. In our test, stepping 30 cm forward added 16 cm in false height. Keep the reference close to the subject to avoid lens distortion near edges."
      },
      {
        title: "Stand straight",
        desc: "Heels flat, back straight, head level. Posture errors in the photo produce the exact same measurement errors as posture errors against a wall."
      },
      {
        title: "Show the full body",
        desc: "Cropped feet or a cropped head makes a floor-to-crown measurement impossible. A clean head-to-toe shot in the frame gives the most reliable result."
      }
    ]
  },
  noTapeMethods: {
    eyebrow: "Alternative Methods",
    title: "How to Measure Your Height Without a Measuring Tape",
    description: "Five methods work reliably when no tape measure is available. Each uses an object of known size to establish scale.",
    methods: [
      {
        id: "wall-a4",
        title: "The wall mark and A4 sheet method",
        tags: ["Hardcover book", "A4 sheet", "Pencil"],
        desc: "Mark your height on the wall with a hardcover book, as in the clinic method below. Lay an A4 sheet's long edge (29.7 cm) against the wall from the floor up, mark its top, and repeat until you reach your mark. Multiply the full sheets by 29.7 cm, then estimate the last gap against a sheet folded in half (14.85 cm)."
      },
      {
        id: "door",
        title: "The doorframe method",
        tags: ["A door"],
        desc: "Standard US interior doors stand 80 inches (203 cm) tall. Stand in the frame, note where the top of your head falls, and you have a working estimate. Not precise to the half-inch, but accurate enough to know whether you are 5'8\" or 5'10\". Door heights differ outside the US and between homes, so check yours first."
      },
      {
        id: "arm-span",
        title: "The arm span method",
        tags: ["A helper or a wall"],
        desc: "Your fingertip-to-fingertip wingspan with arms fully extended matches your height within about one inch. If you know your arm span, you know your height."
      },
      {
        id: "phone",
        title: "The phone method",
        tags: ["A phone"],
        desc: "On supported iPhone and iPad models, Apple's Measure app can measure a person's height from the floor to the top of the head. On any other phone, take a full-body photo and use the tool above."
      },
      {
        id: "dollar",
        title: "The dollar bill method (US)",
        tags: ["US dollar bills"],
        desc: "A US dollar bill is 6.14 inches long. Mark your height on a wall, stack bills from the floor to the mark, count them, and multiply. Tedious, but mathematically sound."
      }
    ],
    footer: "Each method gets you close, and none is exact. Confirming the precise number still needs a calibrated reference at some point, unless you use a calibrated photo."
  },
  clinicMethod: {
    eyebrow: "Clinical Standard",
    title: "How to Measure Height Accurately: The Clinic Method",
    description: "Adapted from clinical stadiometer protocols (CDC guidelines) to ensure maximum physical accuracy at home.",
    steps: [
      "Take off your shoes, bulky clothing, hats and hair accessories, and undo any hairstyle that sits on top of the head.",
      "Stand on a firm floor such as tile or wood, not carpet, against a flat wall with no skirting or moulding.",
      "Keep your feet flat and together, legs straight, arms at your sides and shoulders level.",
      "Touch the wall with your head, shoulders, buttocks and heels. Not every point touches on every body shape.",
      "Look straight ahead. Lower a flat book or ruler at a right angle to the wall until it rests on the crown of your head, then mark the wall under it.",
      "Measure from the floor to the mark with a metal tape, to the nearest 0.1 cm. Without a tape, step an A4 sheet up the wall or use the photo tool above."
    ],
    whyAloneTitle: "Why Measuring Yourself Alone Goes Wrong",
    errorCauses: [
      {
        title: "Hunching",
        desc: "You are probably hunching slightly without realizing it."
      },
      {
        title: "A tilted book",
        desc: "The book is not held perfectly level at a right angle."
      },
      {
        title: "A loose tape",
        desc: "The tape measure is not sitting completely flat on the floor."
      },
      {
        title: "Time of day",
        desc: "You stand up to one centimeter taller in the morning than at night due to spinal disc compression. Measure at the same time of day."
      }
    ],
    whyAloneFooter: "Doing it alone makes everything worse. Standing straight, balancing a hardback on your head, marking a wall, and measuring the mark all at once is physically awkward. A photo with a reference object removes the need for a second person entirely."
  },
  faq: {
    badge: "HELP CENTER",
    title: "Frequently Asked Questions",
    items: [
      {
        id: "how-accurate-is-height-measurement-from-a-photo",
        q: "How accurate is height measurement from a photo?",
        a: "It depends on how the photo is taken. In our empirical test of 14 rendered scenes, a level phone with the person standing against the same wall as a door measured the true height exactly. Tilting the phone 10° to 20° moved the result by 2 to 6 cm, and standing 30 cm in front of the door added 16 cm. On a phone screen, each pixel you miss on a door's edge adds about 1 cm more. For personal tracking and casual comparisons under good conditions, results consistently land within 1 to 2 centimeters."
      },
      {
        id: "what-is-the-best-object-to-use-for-calibration",
        q: "What is the best object to use for calibration?",
        a: "An A4 sheet (29.7 cm / 297 mm long) or a credit card (8.56 cm / 85.6 mm wide) works anywhere worldwide because international ISO standards fix both sizes. A standard interior door at 203 cm (80 inches) in the US is the easiest choice for full-body photos because of its size, but measure yours first if outside the US. The larger the reference object, the less sensitive the result is to minor screen tapping errors."
      },
      {
        id: "is-my-photo-uploaded-or-stored",
        q: "Is my photo uploaded or stored?",
        a: "No. The tool runs entirely client-side in your browser, and your photo never leaves your device."
      },
      {
        id: "can-i-measure-someone-elses-height-from-a-photo",
        q: "Can I measure someone else's height from a photo?",
        a: "Yes. Upload any photo where the person appears next to a known object, calibrate, draw the line, read the result. The subject does not need to be present."
      },
      {
        id: "does-it-work-for-celebrities",
        q: "Does it work for celebrities?",
        a: "Yes, when the photo shows them next to a door or another object of known size. Photos taken from unusual angles produce less reliable results."
      },
      {
        id: "why-do-i-measure-taller-in-the-morning",
        q: "Why do I measure taller in the morning?",
        a: "Spinal discs compress under body weight throughout the day. That compression reduces standing height by up to one centimeter between morning and evening. Measuring at the same time each day gives the most consistent results over time."
      },
      {
        id: "do-i-need-an-account",
        q: "Do I need an account?",
        a: "No. The tool is free, requires no sign-up, and works on any device."
      }
    ]
  },
  tool: {
    step1Calibration: "Step 1: Calibration",
    step2Measure: "Step 2: Measure Person",
    tapOtherEnd: "Tap the other end to finish",
    drawCalibLine: "Draw calibration line of reference object by tapping on screen",
    drawMeasLine: "Click \"Auto Scan\" below or manually draw a line from head to toe",
    cancel: "Cancel",
    done: "Done"
  }
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('Successfully updated messages/en.json with imageToHeight namespace!');
