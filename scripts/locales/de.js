// scripts/locales/de.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Person hinzufügen",
      celebrities: "Prominente",
      fictional: "Fiktiv",
      entities: "Objekte",
      addImage: "Bild hinzufügen"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Zu imperialen Einheiten wechseln",
      switchToMetric: "Zu metrischen Einheiten wechseln",
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern",
      zoomPercentage: "Zoom-Prozentsatz",
      autoFit: "Auto-Anpassung",
      editList: "Liste bearbeiten",
      clearAll: "Alles löschen",
      share: "Teilen",
      generating: "Wird generiert...",
      copied: "Kopiert!",
      error: "Fehler",
      linkCopied: "Link kopiert.",
      linkExpiry: "Links bleiben 7 Tage lang aktiv.",
      png: "PNG",
      downloadChart: "Diagramm als PNG-Bild herunterladen",
      fullscreen: "Vollbild",
      exitFullscreen: "Vollbild beenden"
    },
    canvas: {
      loading: "Vergleich wird geladen...",
      addPersonPrompt: "Füge eine Person hinzu, um zu beginnen",
      addPersonAria: "Eine Person zum Diagramm hinzufügen",
      sameHeight: "Gleiche Größe",
      sameHeightBoth: "{name1} und {name2} sind beide {height}.",
      gapTaller: "{name} ist {pct}% größer",
      gapShorter: "{name} ist {pct}% kleiner",
      gapSummary: "{taller} ist {tallerPct}% größer als {shorter} ({shorterPct}% kleiner).",
      ref: "REF"
    },
    modal: {
      clearTitle: "Diagramm leeren",
      clearDesc: "Alle Personen entfernen? Dies kann nicht rückgängig gemacht werden.",
      cancel: "Abbrechen",
      clearConfirm: "Alles löschen"
    },
    form: {
      enterDetails: "Details eingeben",
      editPerson: "Person bearbeiten",
      male: "Männlich",
      female: "Weiblich",
      name: "Name",
      optional: "Optional",
      heightLabel: "Größe (CM/FT)",
      heightPlaceholder: "Größe",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Avatar-Stil",
      addPerson: "Person hinzufügen",
      saveChanges: "Änderungen speichern",
      cancel: "Abbrechen"
    },
    personChart: {
      compareAgainst: "Vergleichen mit",
      tallestVsShortest: "Größte vs. Kleinste",
      differencesVs: "Unterschiede zu {name}",
      yourList: "Deine Liste",
      reorder: "Umordnen",
      edit: "Bearbeiten",
      remove: "Entfernen"
    },
    quickAdd: {
      quickInsertion: "Schnelleinfügung",
      quickAddAria: "{name} schnell hinzufügen"
    },
    panels: {
      all: "Alle",
      celebritiesTitle: "Promi-Auswahl",
      celebritiesSub: "Füge Ikonen zu deinem Vergleichsdiagramm hinzu",
      celebritiesSearch: "Nach Name oder Kategorie suchen",
      celebritiesLoading: "Prominente werden geladen...",
      celebritiesNotFound: "Keine Prominenten gefunden für \"{query}\"",
      fictionalTitle: "Fiktive Charaktere",
      fictionalSub: "Vergleiche Größen mit fiktiven Ikonen",
      fictionalSearch: "Nach Name oder Universum suchen...",
      fictionalLoading: "Charaktere werden geladen...",
      fictionalNotFound: "Keine Charaktere gefunden für \"{query}\"",
      entitiesTitle: "Objekte & Bauwerke",
      entitiesSub: "Reale Referenzobjekte und berühmte Bauwerke",
      entitiesSearch: "Objekte suchen...",
      entitiesLoading: "Objekte werden geladen...",
      entitiesNotFound: "Keine Objekte gefunden für \"{query}\"",
      addImageTitle: "Eigenes Bild hinzufügen",
      addImageSub: "Lade ein Foto hoch, um Proportionen zu vergleichen"
    }
  },
  contact: {
    metadata: {
      title: "Kontakt | Größenvergleichsrechner",
      description: "Kontaktiere das Team des Größenvergleichsrechners, um eine falsche Angabe, einen Fehler oder eine Datenschutzanfrage zu melden."
    },
    breadcrumb: {
      home: "Startseite",
      contact: "Kontakt"
    },
    header: {
      title: "Kontaktiere uns",
      description: "Hast du eine Frage, Feedback oder eine Größenkorrektur? Sende uns eine Nachricht und wir antworten dir gerne.",
      emailUs: "Direkt per E-Mail",
      emailDesc: "Für allgemeine Anfragen, Kooperationen oder Medienanfragen.",
      reportBug: "Fehler melden",
      reportBugDesc: "Einen Berechnungsfehler oder Darstellungsfehler entdeckt? Lass es uns wissen.",
      requestFeature: "Funktion vorschlagen",
      requestFeatureDesc: "Wünschst du dir neue Prominente, Charaktere oder Maßeinheiten? Wir freuen uns über Vorschläge.",
      privacyInquiry: "Datenschutz & Rechte",
      privacyInquiryDesc: "Fragen zu deinen Daten oder zur Ausübung deiner gesetzlichen Datenschutzrechte? Kontaktiere uns."
    },
    form: {
      title: "Nachricht senden",
      name: "Dein Name",
      namePlaceholder: "Max Mustermann",
      email: "E-Mail-Adresse",
      emailPlaceholder: "du@example.com",
      subject: "Betreff",
      subjectPlaceholder: "z. B. Größenkorrektur für Robert Wadlow",
      message: "Nachricht",
      messagePlaceholder: "Schreibe uns deine Nachricht...",
      submit: "Nachricht senden",
      sending: "Wird gesendet...",
      successTitle: "Nachricht gesendet!",
      successDesc: "Vielen Dank für deine Nachricht. Wir werden uns schnellstmöglich bei dir melden.",
      errorTitle: "Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreibe uns eine E-Mail."
    }
  },
  home: {
    cta: {
      heading: "Los geht's, erstelle deinen Vergleich",
      description: "Kostenlos. Kein Konto. Keine Limits. Vergleiche unbegrenzt Personen, Prominente, Charaktere und reale Objekte im echten Maßstab.",
      startComparing: "↑ Vergleich starten",
      exploreCelebrities: "Promi-Größen entdecken"
    },
    section8: {
      sources: "Quellen: CDC National Center for Health Statistics (NHANES 2021 bis 2023), CDC-Wachstumskurven, Guinness World Records. Stand November 2026.",
      items: [
        {
          q: "Wie vergleiche ich die Größe zweier Personen nebeneinander?",
          a: "Klicke auf Person hinzufügen, gib Namen und Größe in cm oder ft/in ein und wähle eine Farbe. Füge eine zweite Person genauso hinzu. Das Größendiagramm wird sofort im exakten Maßstab aktualisiert. Du kannst auch die Promi-Datenbank oder fiktive Charaktere nach vorbereiteten Größen durchsuchen."
        },
        {
          q: "Wie berechnet das Diagramm die Proportionen?",
          a: "Das Diagramm verwendet eine mathematische Verhältnis-Engine. Wenn Person A 170 cm und Person B 185 cm groß ist, wird der zweite Balken exakt mit dem 1,09-Fachen des ersten gezeichnet. Die Balken basieren exakt auf deinen Eingaben ohne Rundungsverfälschung."
        },
        {
          q: "Wie viele Personen kann ich zu einem Vergleich hinzufügen?",
          a: "Es gibt keine Begrenzung. Füge so viele Personen, Prominente, fiktive Figuren und reale Objekte hinzu, wie du möchtest. Alle teilen sich ein gemeinsames proportionales Diagramm, das sich automatisch anpasst."
        },
        {
          q: "Was ist der Unterschied zwischen diesem Tool und dem Größenunterschied-Rechner?",
          a: "Dieses Größenvergleichstool erstellt ein visuelles Diagramm im echten Maßstab für alle Subjekte. Der Größenunterschied-Rechner ermittelt die exakte Differenz zweier Größen in cm, Zoll und Prozent."
        },
        {
          q: "Wer ist die größte Person der Welt?",
          a: "Die größte lebende Person ist Sultan Kösen aus der Türkei mit 251 cm (8 ft 2,8 in), gemessen von Guinness World Records im Jahr 2011. Die größte jemals gemessene Person war Robert Wadlow aus den USA mit 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Was ist die durchschnittliche Größe nach Alter?",
          a: "Wichtige US-Richtwerte aus CDC-Daten: 4-jähriger Junge: ca. 103 cm (3 ft 4 in). 10-jähriger Junge: ca. 138 cm (4 ft 6 in). 10-jähriges Mädchen: ca. 138 cm (4 ft 6 in). Erwachsene Männer (US, ab 20, 2021 bis 2023): 175,0 cm (5 ft 8,9 in). Erwachsene Frauen (US, ab 20, 2021 bis 2023): 161,3 cm (5 ft 3,5 in). Weitere Tabellen findest du im Größen-Gewichts-Perzentilen-Rechner."
        },
        {
          q: "Sind 2 Zoll ein großer Größenunterschied?",
          a: "Zwei Zoll entsprechen 5,1 cm, etwa 3 % der durchschnittlichen Größe eines US-Mannes von 5'9\" (175,3 cm). Nebeneinander liegt die Augenlinie der größeren Person etwa 2 Zoll höher – ungefähr die kurze Kante einer Kreditkarte."
        },
        {
          q: "Wie viel größer ist 5'10\" als 5'7\"?",
          a: "5'10\" ist 3 Zoll (7,6 cm) größer als 5'7\", was einem Unterschied von 4,5 % entspricht. In Zentimetern sind das 177,8 cm im Vergleich zu 170,2 cm."
        },
        {
          q: "Wie rechne ich cm in Fuß und Zoll um?",
          a: "Teile Zentimeter durch 2,54 für Zoll und teile dann durch 12 für Fuß. 169 cm sind 66,5 Zoll oder 5 ft 6,5 in. Umgekehrt multiplizierst du Gesamtzoll mit 2,54: 5'1\" sind 61 Zoll oder 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Prominente",
        fictional: "Fiktiv",
        objects: "Objekte",
        caption: "2.696 vorbereitete Größenangaben aus drei kuratierten Sammlungen: Prominente, fiktive Figuren und reale Objekte."
      },
      workedExample: {
        diff: "Unterschied",
        ratio: "Verhältnis",
        taller: "Ben ist {pct}% größer",
        shorter: "Alex ist {pct}% kleiner",
        caption: "Alex mit 5'7\" (170 cm) und Ben mit 6'1\" (185 cm), maßstabsgetreu von einer Nulllinie gezeichnet. Ben ist 15 cm (5,9 in) größer: 8,8 % größer als Alex, der 8,1 % kleiner ist."
      },
      scaleLadder: {
        humanScale: "1 m (Menschlicher Maßstab)",
        limit: "10.000 m (32.808 ft Limit)",
        person: "Person",
        eiffelTower: "Eiffelturm",
        angelFalls: "Salto Ángel",
        mtEverest: "Mt. Everest",
        chartLimit: "Diagrammlimit",
        caption: "Auf einer logarithmischen Skala dargestellt (jeder Schritt ist 10-mal größer), damit alle Markierungen passen. Das Tool selbst zeichnet alle Subjekte auf einer linearen Achse."
      },
      gapPairBars: {
        shorterBase: "Kleinere Basis (160 vs 172 cm)",
        tallerBase: "Größere Basis (190 vs 202 cm)",
        gapDiff: "12 cm Unterschied = {pct}% Differenz",
        caption: "Derselbe Abstand von 12 cm entspricht einem Größenanstieg von 7,5 % bei kleineren Körpergrößen (160 vs. 172 cm), aber nur 6,3 % bei größeren Körpergrößen (190 vs. 202 cm)."
      },
      heightGapTable: {
        colPair: "Größenpaarung",
        colDiff: "Unterschied",
        colTaller: "Größer %",
        colShorter: "Kleiner %",
        colScale: "Visueller Maßstab",
        caption: "Gängige Größenunterschiede in Fuß und Zoll mit exakten Umrechnungen und proportionaler Skalierung."
      },
      ageBenchmarks: {
        colPop: "Bevölkerung / Altersgruppe",
        colAvg: "Gemessener Durchschnitt (CDC)",
        boy4: "Junge (Alter 4, 50. Perz.)",
        girl10: "Mädchen (Alter 10, 50. Perz.)",
        boy10: "Junge (Alter 10, 50. Perz.)",
        women: "US-Frauen (20+, NHANES)",
        men: "US-Männer (20+, NHANES)",
        caption: "US-Erwachsenendurchschnitte von CDC FastStats / NHANES (Aug 2021 bis Aug 2023) neben CDC-Wachstumskurven-Medianen für Kinder."
      },
      twoInchGap: {
        baseline: "0 cm Basislinie",
        eyeLevel: "Augenhöhe",
        forehead: "Stirn",
        caption: "5'9\" und 5'11\" maßstabsgetreu von einer Nulllinie gezeichnet. Die Scheitel liegen 2 Zoll (5,1 cm) auseinander, ein Unterschied von 2,9 %."
      },
      conversionFlow: {
        step1: "Gesamtzoll",
        step2: "Fuß & Rest",
        step3: "Endergebnis",
        caption: "Dreistufiger Umrechnungsprozess: Zentimeter durch 2,54 teilen für Gesamtzoll, durch 12 teilen für ganze Fuß und die restlichen Zoll runden."
      }
    }
  }
};

