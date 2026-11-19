// scripts/locales/sv.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Lägg till person",
      celebrities: "Kändisar",
      fictional: "Fiktivt",
      entities: "Objekt",
      addImage: "Lägg till bild"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Växla till brittiska enheter",
      switchToMetric: "Växla till metriska enheter",
      zoomIn: "Zooma in",
      zoomOut: "Zooma ut",
      zoomPercentage: "Zoomprocent",
      autoFit: "Autoanpassa",
      editList: "Redigera lista",
      clearAll: "Rensa allt",
      share: "Dela",
      generating: "Genererar...",
      copied: "Kopierad!",
      error: "Fel",
      linkCopied: "Länk kopierad.",
      linkExpiry: "Länkar förblir aktiva i 7 dagar.",
      png: "PNG",
      downloadChart: "Ladda ner diagram som PNG-bild",
      fullscreen: "Helskärm",
      exitFullscreen: "Avsluta helskärm"
    },
    canvas: {
      loading: "Laddar jämförelse...",
      addPersonPrompt: "Lägg till en person för att börja",
      addPersonAria: "Lägg till en person i diagrammet",
      sameHeight: "Samma längd",
      sameHeightBoth: "{name1} och {name2} är båda {height}.",
      gapTaller: "{name} är {pct}% längre",
      gapShorter: "{name} är {pct}% kortare",
      gapSummary: "{taller} är {tallerPct}% längre än {shorter} ({shorterPct}% kortare).",
      ref: "REF"
    },
    modal: {
      clearTitle: "Rensa diagram",
      clearDesc: "Ta bort alla personer? Detta kan inte ångras.",
      cancel: "Avbryt",
      clearConfirm: "Rensa allt"
    },
    form: {
      enterDetails: "Ange dina uppgifter",
      editPerson: "Redigera person",
      male: "Man",
      female: "Kvinna",
      name: "Namn",
      optional: "Valfritt",
      heightLabel: "Längd (CM/FT)",
      heightPlaceholder: "Längd",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Avatarstil",
      addPerson: "Lägg till person",
      saveChanges: "Spara ändringar",
      cancel: "Avbryt"
    },
    personChart: {
      compareAgainst: "Jämför mot",
      tallestVsShortest: "Längst vs Kortast",
      differencesVs: "Skillnader mot {name}",
      yourList: "Din lista",
      reorder: "Ändra ordning",
      edit: "Redigera",
      remove: "Ta bort"
    },
    quickAdd: {
      quickInsertion: "Snabbinsättning",
      quickAddAria: "Lägg till {name} snabbt"
    },
    panels: {
      all: "Alla",
      celebritiesTitle: "Kändisurval",
      celebritiesSub: "Lägg till ikoner i ditt jämförelsediagram",
      celebritiesSearch: "Sök efter namn eller kategori",
      celebritiesLoading: "Laddar kändisar...",
      celebritiesNotFound: "Inga kändisar hittades för \"{query}\"",
      fictionalTitle: "Fiktiva karaktärer",
      fictionalSub: "Jämför längd med fiktiva figurer",
      fictionalSearch: "Sök efter namn eller universum...",
      fictionalLoading: "Laddar karaktärer...",
      fictionalNotFound: "Inga karaktärer hittades för \"{query}\"",
      entitiesTitle: "Objekt & landmärken",
      entitiesSub: "Verkliga referensobjekt och kända byggnader",
      entitiesSearch: "Sök objekt...",
      entitiesLoading: "Laddar objekt...",
      entitiesNotFound: "Inga objekt hittades för \"{query}\"",
      addImageTitle: "Lägg till egen bild",
      addImageSub: "Ladda upp ett foto för att jämföra proportioner"
    }
  },
  contact: {
    metadata: {
      title: "Kontakta oss | Längdjämförelse Kalkylator",
      description: "Kontakta teamet bakom längdjämförelse kalkylatorn för att rapportera felaktig längd, en bugg eller integritetsfrågor."
    },
    breadcrumb: {
      home: "Hem",
      contact: "Kontakt"
    },
    header: {
      title: "Kontakta oss",
      description: "Har du en fråga, feedback eller en längdkorrigering? Skicka ett meddelande så svarar vi så snart som möjligt.",
      emailUs: "Mejla oss direkt",
      emailDesc: "För allmänna förfrågningar, samarbeten eller pressfrågor.",
      reportBug: "Rapportera en bugg",
      reportBugDesc: "Hittat ett beräkningsfel eller visningsproblem? Låt oss veta detaljerna.",
      requestFeature: "Föreslå en funktion",
      requestFeatureDesc: "Vill du att vi lägger till en ny kändis, karaktär eller enhet? Vi välkomnar idéer.",
      privacyInquiry: "Integritet & rättigheter",
      privacyInquiryDesc: "Frågor om dina personuppgifter eller juridiska rättigheter? Kontakta vårt dataskyddsombud."
    },
    form: {
      title: "Skicka ett meddelande",
      name: "Ditt namn",
      namePlaceholder: "Anna Andersson",
      email: "E-postadress",
      emailPlaceholder: "du@exempel.se",
      subject: "Ämne",
      subjectPlaceholder: "t.ex. Längdkorrigering för Robert Wadlow",
      message: "Meddelande",
      messagePlaceholder: "Berätta vad du har på hjärtat...",
      submit: "Skicka meddelande",
      sending: "Skickar...",
      successTitle: "Meddelande skickat!",
      successDesc: "Tack för att du kontaktar oss. Vi återkommer så snart vi kan.",
      errorTitle: "Något gick fel. Försök igen eller mejla oss direkt."
    }
  },
  home: {
    cta: {
      heading: "Kom igång, bygg din jämförelse",
      description: "Gratis. Inget konto. Inga gränser. Jämför obegränsat med personer, kändisar, karaktärer och föremål i exakt proportionell skala.",
      startComparing: "↑ Börja jämföra",
      exploreCelebrities: "Utforska kändisars längder"
    },
    section8: {
      sources: "Källor: CDC National Center for Health Statistics (NHANES 2021 till 2023), CDC tillväxtkurvor, Guinness World Records. Verifierat november 2026.",
      items: [
        {
          q: "Hur jämför jag längden på två personer sida vid sida?",
          a: "Klicka på Lägg till person, ange namn och längd i cm eller ft/in och välj en färg. Lägg till en andra person på samma sätt. Diagrammet uppdateras omedelbart i exakt skala. Du kan också söka i kändisdatabasen."
        },
        {
          q: "Hur beräknar diagrammet proportionerna?",
          a: "Diagrammet använder en visuell förhållandemotor. Om Person A är 170 cm och Person B är 185 cm visas den andra stapeln i exakt 1,09× höjden av den första, beräknat direkt från dina värden utan avrundningsfel."
        },
        {
          q: "Hur många personer kan jag lägga till i en jämförelse?",
          a: "Det finns ingen gräns. Lägg till så många personer, kändisar, fiktiva figurer och verkliga föremål du vill. Alla delar samma automatiskt anpassade axel."
        },
        {
          q: "Vad är skillnaden mellan detta verktyg och Längdskillnad Kalkylatorn?",
          a: "Detta verktyg skapar ett proportionellt visuellt diagram i full skala över alla objekt. Längdskillnad Kalkylatorn beräknar den exakta skillnaden mellan två längder i cm, tum och procent."
        },
        {
          q: "Vem är världens längsta person?",
          a: "Den längsta levande personen är Sultan Kösen från Turkiet på 251 cm (8 ft 2,8 in), mätt av Guinness World Records 2011. Den längsta personen som någonsin registrerats var Robert Wadlow från USA på 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Vad är medellängden efter ålder?",
          a: "Viktiga riktmärken från amerikanska CDC: 4-årig pojke: ca 103 cm (3 ft 4 in). 10-årig pojke: ca 138 cm (4 ft 6 in). 10-årig flicka: ca 138 cm (4 ft 6 in). Vuxna män (USA, 20+, 2021-2023): 175,0 cm (5 ft 8,9 in). Vuxna kvinnor: 161,3 cm (5 ft 3,5 in). Se vår Längd-Vikt Percentilräknare för fullständiga tabeller."
        },
        {
          q: "Är 2 tum (5 cm) en stor längdskillnad?",
          a: "Två tum är 5,1 cm, cirka 3 % av längden för en genomsnittlig amerikansk man på 5'9\" (175,3 cm). Sida vid sida sitter den längre personens ögonlinje 2 tum högre, ungefär kortsidan av ett kreditkort."
        },
        {
          q: "Hur mycket längre är 5'10\" än 5'7\"?",
          a: "5'10\" är 3 tum (7,6 cm) längre än 5'7\", eller 4,5 % längre. I centimeter är det 177,8 cm mot 170,2 cm."
        },
        {
          q: "Hur omvandlar jag cm till fot och tum?",
          a: "Dela centimeter med 2,54 för att få tum, och dela sedan med 12 för fot. 169 cm är 66,5 tum eller 5 ft 6,5 in. Omvänt multiplicerar du totala tum med 2,54: 5'1\" är 61 tum eller 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Kändisar",
        fictional: "Fiktivt",
        objects: "Objekt",
        caption: "2 696 färdiga längder fördelade på tre samlingar: kändisar, fiktiva karaktärer och verkliga föremål."
      },
      workedExample: {
        diff: "Skillnad",
        ratio: "Förhållande",
        taller: "Ben är {pct}% längre",
        shorter: "Alex är {pct}% kortare",
        caption: "Alex på 5'7\" (170 cm) och Ben på 6'1\" (185 cm), ritade i skala från nollinjen. Ben är 15 cm (5,9 in) längre: 8,8 % längre än Alex, som är 8,1 % kortare."
      },
      scaleLadder: {
        humanScale: "1 m (Mänsklig skala)",
        limit: "10 000 m (Gräns 32 808 ft)",
        person: "Person",
        eiffelTower: "Eiffeltornet",
        angelFalls: "Angelfallen",
        mtEverest: "Mount Everest",
        chartLimit: "Diagramgräns",
        caption: "Visas på en logaritmisk skala (varje steg är 10 gånger större) så att alla markörer får plats. Huvudverktyget ritar alla motiv på en enda linjär axel."
      },
      gapPairBars: {
        shorterBase: "Kortare bas (160 vs 172 cm)",
        tallerBase: "Längre bas (190 vs 202 cm)",
        gapDiff: "12 cm skillnad = {pct}% differens",
        caption: "Samma skillnad på 12 cm motsvarar en ökning på 7,5 % vid kortare längder (160 vs 172 cm), men endast 6,3 % vid längre längder (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Längdpar",
        colDiff: "Skillnad",
        colTaller: "Längre %",
        colShorter: "Kortare %",
        colScale: "Visuell skala",
        caption: "Vanliga längdskillnader i fot och tum med exakta omvandlingar och proportionell skalning."
      },
      ageBenchmarks: {
        colPop: "Befolkning / Åldersgrupp",
        colAvg: "Uppmätt genomsnitt (CDC)",
        boy4: "Pojke (4 år, 50:e perc.)",
        girl10: "Flicka (10 år, 50:e perc.)",
        boy10: "Pojke (10 år, 50:e perc.)",
        women: "Kvinnor USA (20+, NHANES)",
        men: "Män USA (20+, NHANES)",
        caption: "Vuxensnitt från amerikanska CDC FastStats / NHANES (aug 2021 till aug 2023) tillsammans med kliniska tillväxtmedianer för barn."
      },
      twoInchGap: {
        baseline: "0 cm baslinje",
        eyeLevel: "Ögonhöjd",
        forehead: "Panna",
        caption: "5'9\" och 5'11\" ritade i skala från nollinjen. Hjässorna skiljer sig med 2 tum (5,1 cm), en skillnad på 2,9 %."
      },
      conversionFlow: {
        step1: "Totala tum",
        step2: "Fot & rest",
        step3: "Slutresultat",
        caption: "Tre-stegs omvandling: dela centimeter med 2,54 för totala tum, dela med 12 för hela fot och avrunda återstående tum."
      }
    }
  }
};

