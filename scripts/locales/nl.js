// scripts/locales/nl.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Persoon toevoegen",
      celebrities: "Beroemdheden",
      fictional: "Fictief",
      entities: "Objecten",
      addImage: "Afbeelding toevoegen"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Naar imperiale eenheden wisselen",
      switchToMetric: "Naar metrische eenheden wisselen",
      zoomIn: "Inzoomen",
      zoomOut: "Uitzoomen",
      zoomPercentage: "Zoompercentage",
      autoFit: "Automatisch passend",
      editList: "Lijst bewerken",
      clearAll: "Alles wissen",
      share: "Delen",
      generating: "Genereren...",
      copied: "Gekopieerd!",
      error: "Fout",
      linkCopied: "Link gekopieerd.",
      linkExpiry: "Links blijven 7 dagen actief.",
      png: "PNG",
      downloadChart: "Grafiek als PNG-afbeelding downloaden",
      fullscreen: "Volledig scherm",
      exitFullscreen: "Volledig scherm sluiten"
    },
    canvas: {
      loading: "Vergelijking laden...",
      addPersonPrompt: "Voeg een persoon toe om te beginnen",
      addPersonAria: "Een persoon toevoegen aan de grafiek",
      sameHeight: "Zelfde lengte",
      sameHeightBoth: "{name1} en {name2} zijn beiden {height}.",
      gapTaller: "{name} is {pct}% langer",
      gapShorter: "{name} is {pct}% korter",
      gapSummary: "{taller} is {tallerPct}% langer dan {shorter} ({shorterPct}% korter).",
      ref: "REF"
    },
    modal: {
      clearTitle: "Grafiek wissen",
      clearDesc: "Alle personen verwijderen? Dit kan niet ongedaan worden gemaakt.",
      cancel: "Annuleren",
      clearConfirm: "Alles wissen"
    },
    form: {
      enterDetails: "Gegevens invoeren",
      editPerson: "Persoon bewerken",
      male: "Man",
      female: "Vrouw",
      name: "Naam",
      optional: "Optioneel",
      heightLabel: "Lengte (CM/FT)",
      heightPlaceholder: "Lengte",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Avatarstijl",
      addPerson: "Persoon toevoegen",
      saveChanges: "Wijzigingen opslaan",
      cancel: "Annuleren"
    },
    personChart: {
      compareAgainst: "Vergelijken met",
      tallestVsShortest: "Langste vs Kortste",
      differencesVs: "Verschillen t.o.v. {name}",
      yourList: "Jouw lijst",
      reorder: "Herschikken",
      edit: "Bewerken",
      remove: "Verwijderen"
    },
    quickAdd: {
      quickInsertion: "Snelle invoeging",
      quickAddAria: "{name} snel toevoegen"
    },
    panels: {
      all: "Alles",
      celebritiesTitle: "Selectie beroemdheden",
      celebritiesSub: "Voeg bekende personen toe aan je vergelijking",
      celebritiesSearch: "Zoeken op naam of categorie",
      celebritiesLoading: "Beroemdheden laden...",
      celebritiesNotFound: "Geen beroemdheden gevonden voor \"{query}\"",
      fictionalTitle: "Fictieve personages",
      fictionalSub: "Vergelijk lengtes met fictieve figuren",
      fictionalSearch: "Zoeken op naam of universum...",
      fictionalLoading: "Personages laden...",
      fictionalNotFound: "Geen personages gevonden voor \"{query}\"",
      entitiesTitle: "Objecten & monumenten",
      entitiesSub: "Echte referentieobjecten en beroemde bouwwerken",
      entitiesSearch: "Objecten zoeken...",
      entitiesLoading: "Objecten laden...",
      entitiesNotFound: "Geen objecten gevonden voor \"{query}\"",
      addImageTitle: "Eigen afbeelding toevoegen",
      addImageSub: "Upload een foto om verhoudingen te vergelijken"
    }
  },
  contact: {
    metadata: {
      title: "Contact | Lengte Vergelijken Calculator",
      description: "Neem contact op met het team van de lengte vergelijken calculator om een onjuiste lengte of fout te melden of voor privacyvragen."
    },
    breadcrumb: {
      home: "Home",
      contact: "Contact"
    },
    header: {
      title: "Contacteer ons",
      description: "Heb je een vraag, feedback of een lengtecorrectie? Stuur ons een bericht en we nemen contact met je op.",
      emailUs: "Direct e-mailen",
      emailDesc: "Voor algemene vragen, samenwerkingen of persvragen.",
      reportBug: "Fout melden",
      reportBugDesc: "Een rekenfout of weergaveprobleem gevonden? Laat ons de details weten.",
      requestFeature: "Functie voorstellen",
      requestFeatureDesc: "Wil je een nieuwe beroemdheid, personage of eenheid zien? Suggesties zijn welkom.",
      privacyInquiry: "Privacy & rechten",
      privacyInquiryDesc: "Vragen over je persoonsgegevens of wettelijke privacyrechten? Neem contact op met compliance."
    },
    form: {
      title: "Bericht versturen",
      name: "Je naam",
      namePlaceholder: "Jan de Vries",
      email: "E-mailadres",
      emailPlaceholder: "jouw@voorbeeld.nl",
      subject: "Onderwerp",
      subjectPlaceholder: "bijv. Lengtecorrectie voor Robert Wadlow",
      message: "Bericht",
      messagePlaceholder: "Vertel ons wat je bezighoudt...",
      submit: "Bericht versturen",
      sending: "Versturen...",
      successTitle: "Bericht verzonden!",
      successDesc: "Bedankt voor je bericht. We reageren zo snel mogelijk.",
      errorTitle: "Er is iets misgegaan. Probeer het opnieuw of stuur ons een e-mail."
    }
  },
  home: {
    cta: {
      heading: "Ga je gang, bouw je vergelijking",
      description: "Gratis. Geen account. Geen limieten. Vergelijk onbeperkt personen, beroemdheden, personages en objecten op ware schaal.",
      startComparing: "↑ Start met vergelijken",
      exploreCelebrities: "Lengtes van beroemdheden bekijken"
    },
    section8: {
      sources: "Bronnen: CDC National Center for Health Statistics (NHANES 2021 tot 2023), CDC-groeicurven, Guinness World Records. Gecontroleerd november 2026.",
      items: [
        {
          q: "Hoe vergelijk ik de lengte van twee personen naast elkaar?",
          a: "Klik op Persoon toevoegen, voer een naam en lengte in cm of ft/in in en kies een kleur. Voeg een tweede persoon op dezelfde manier toe. De lengtegrafiek wordt direct op exacte schaal bijgewerkt. Je kunt ook zoeken in de database met beroemdheden of fictieve personages."
        },
        {
          q: "Hoe berekent de grafiek de verhoudingen?",
          a: "De grafiek gebruikt een visuele verhoudingsmotor. Als Persoon A 170 cm is en Persoon B 185 cm, wordt de tweede staaf exact getoond op 1,09× de hoogte van de eerste, zonder afrondingsfouten."
        },
        {
          q: "Hoeveel personen kan ik aan één vergelijking toevoegen?",
          a: "Er is geen limiet. Voeg zoveel personen, beroemdheden, fictieve personages en echte voorwerpen toe als je wilt. Alles wordt op één proportionele as weergegeven."
        },
        {
          q: "Wat is het verschil tussen deze tool en de Lengteverschil Calculator?",
          a: "Deze tool toont een visuele grafiek op ware schaal van alle onderwerpen. De Lengteverschil Calculator toont het exacte verschil tussen twee lengtes in cm, inches en percentages."
        },
        {
          q: "Wie is de langste persoon ter wereld?",
          a: "De langste levende persoon is Sultan Kösen uit Turkije met 251 cm (8 ft 2,8 in), gemeten door Guinness World Records in 2011. De langste persoon ooit gemeten was Robert Wadlow uit de VS met 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Wat is de gemiddelde lengte per leeftijd?",
          a: "Belangrijke richtlijnen van de Amerikaanse CDC: Jongen van 4 jaar: ca. 103 cm (3 ft 4 in). Jongen van 10 jaar: ca. 138 cm (4 ft 6 in). Meisje van 10 jaar: ca. 138 cm (4 ft 6 in). Volwassen mannen (VS, 20+, 2021-2023): 175,0 cm (5 ft 8,9 in). Volwassen vrouwen: 161,3 cm (5 ft 3,5 in). Zie de Lengte-Gewicht Percentielen Calculator voor volledige tabellen."
        },
        {
          q: "Is 2 inch (5 cm) een groot lengteverschil?",
          a: "Twee inch is 5,1 cm, ongeveer 3% van de lengte van een gemiddelde Amerikaanse man van 5'9\" (175,3 cm). Naast elkaar bevindt de ooghoogte van de langere persoon zich 2 inch hoger, ongeveer de korte zijde van een betaalpas."
        },
        {
          q: "Hoeveel langer is 5'10\" dan 5'7\"?",
          a: "5'10\" is 3 inch (7,6 cm) langer dan 5'7\", oftewel 4,5% langer. In centimeters is dat 177,8 cm tegenover 170,2 cm."
        },
        {
          q: "Hoe reken ik cm om naar voet en inches?",
          a: "Deel centimeters door 2,54 voor inches en deel daarna door 12 voor voet. 169 cm is 66,5 inch oftewel 5 ft 6,5 in. Omgekeerd vermenigvuldig je het totale aantal inches met 2,54: 5'1\" is 61 inches oftewel 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Beroemdheden",
        fictional: "Fictief",
        objects: "Objecten",
        caption: "2.696 kant-en-klare lengtes uit drie gecureerde collecties: beroemdheden, fictieve personages en echte voorwerpen."
      },
      workedExample: {
        diff: "Verschil",
        ratio: "Verhouding",
        taller: "Ben is {pct}% langer",
        shorter: "Alex is {pct}% korter",
        caption: "Alex van 5'7\" (170 cm) en Ben van 6'1\" (185 cm), op schaal getekend vanaf een nulbasis. Ben is 15 cm (5,9 in) langer: 8,8% langer dan Alex, die 8,1% korter is."
      },
      scaleLadder: {
        humanScale: "1 m (Menselijke schaal)",
        limit: "10.000 m (32.808 ft Limiet)",
        person: "Persoon",
        eiffelTower: "Eiffeltoren",
        angelFalls: "Angelwaterval",
        mtEverest: "Mount Everest",
        chartLimit: "Grafieklimiet",
        caption: "Weergegeven op een logaritmische schaal (elke stap is 10 keer zo groot) zodat alle markeringen passen. De tool zelf tekent alles op één lineaire as."
      },
      gapPairBars: {
        shorterBase: "Kortere basis (160 vs 172 cm)",
        tallerBase: "Langere basis (190 vs 202 cm)",
        gapDiff: "12 cm verschil = {pct}% variatie",
        caption: "Hetzelfde verschil van 12 cm betekent 7,5% toename bij kleinere lengtes (160 vs 172 cm), maar slechts 6,3% bij grotere lengtes (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Lengtepaar",
        colDiff: "Verschil",
        colTaller: "Langer %",
        colShorter: "Korter %",
        colScale: "Visuele schaal",
        caption: "Veelvoorkomende lengteverschillen in voet en inches met exacte omrekeningen en proportionele schaal."
      },
      ageBenchmarks: {
        colPop: "Populatie / Leeftijdsgroep",
        colAvg: "Gemeten gemiddelde (CDC)",
        boy4: "Jongen (4 jaar, 50e perc.)",
        girl10: "Meisje (10 jaar, 50e perc.)",
        boy10: "Jongen (10 jaar, 50e perc.)",
        women: "Amerikaanse vrouwen (20+, NHANES)",
        men: "Amerikaanse mannen (20+, NHANES)",
        caption: "Gemiddelden van volwassenen uit de VS van CDC FastStats / NHANES (aug 2021 tot aug 2023) naast klinische groeicurven voor kinderen."
      },
      twoInchGap: {
        baseline: "0 cm basislijn",
        eyeLevel: "Ooghoogte",
        forehead: "Voorhoofd",
        caption: "5'9\" en 5'11\" op schaal getekend vanaf een nulbasis. De toppen liggen 2 inch (5,1 cm) uit elkaar, een verschil van 2,9%."
      },
      conversionFlow: {
        step1: "Totaal inches",
        step2: "Voet en rest",
        step3: "Eindresultaat",
        caption: "Omrekening in drie stappen: deel centimeters door 2,54 voor inches, deel door 12 voor hele voeten en rond de overgebleven inches af."
      }
    }
  }
};

