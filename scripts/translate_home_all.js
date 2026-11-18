const fs = require('fs');
const path = require('path');

const locales = ['de', 'es', 'fr', 'pt', 'nl', 'ar', 'it', 'sv', 'pl'];

const enPath = path.resolve('messages/en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const translations = {
  de: {
    metadata: {
      homeTitle: "Größenvergleich-Diagramm – Personen, Prominente & Charaktere",
      homeDescription: "Vergleiche Körpergrößen visuell mit unserem kostenlosen Größenvergleichs-Rechner. Stelle Personen, Stars, Anime-Figuren und Bauwerke maßstabsgetreu nebeneinander."
    },
    home: {
      intro: {
        h1: "Größenvergleich-Rechner: Körpergrößen online im visuellen Diagramm vergleichen",
        p: "Nutze dieses Größenvergleichs-Tool, um Körpergrößen nebeneinander in einem maßstabsgetreuen Diagramm zu sehen. Gib beliebige Höhen in Zentimetern, Fuß oder Zoll ein, um den Größenunterschied sofort visuell darzustellen. Das Tool skaliert jede Figur exakt nach deinen Eingaben. Vergleiche zwei oder mehr Personen, Stars, Anime-Figuren oder reale Objekte in Sekundenschnelle.",
        freeLibraryBadge: "Kostenlose Online-Bibliothek",
        freeLibraryDesc: "Greife auf unsere Datenbank vorgefertigter Referenzgrößen aus drei Sammlungen zu, erstelle unbegrenzt viele Vergleiche und exportiere hochauflösende PNG-Diagramme.",
        noAccounts: "Kein Benutzerkonto",
        noPayments: "Keine Zahlungen",
        free100: "100 % kostenlos",
        compareNowCta: "Jetzt vergleichen ↑"
      },
      section1: {
        eyebrow: "Funktionsweise",
        title: "Wie funktioniert ein Größenvergleichs-Diagramm?",
        p1: "Ein Größenvergleichs-Diagramm wandelt Maßangaben in eine visuelle Grafik um, in der jede Figur das exakte mathematische Verhältnis im echten Maßstab widerspiegelt.",
        p2: "Ist Person A 170 cm und Person B 185 cm groß, wird die zweite Figur exakt 1,09-mal so hoch dargestellt. Ein Abstand von 10 cm wirkt bei 160 cm proportional ganz anders als bei 190 cm – das Diagramm macht diesen Unterschied sofort sichtbar.",
        p3: "Nutze das Tool als Diagrammersteller für Familien, Sportteams oder kreative Zeichenprojekte.",
        imgAlt: "Größenvergleichs-Diagramm einer 170 cm und 185 cm großen Person nebeneinander",
        imgCaption: "Alex mit 170 cm (5'7\") und Ben mit 185 cm (6'1\"), maßstabsgetreu gezeichnet.",
        needGapTitle: "Suchst du nur die Differenz zwischen zwei bestimmten Größen?",
        needGapDesc: "Der Höhendifferenz-Rechner zeigt den exakten Abstand in cm und Zoll, die prozentuale Abweichung und einen Vergleichsbalken. Ideal, wenn du nur die genaue Differenz ermitteln möchtest.",
        needGapCta: "Höhendifferenz-Rechner öffnen"
      },
      section2: {
        eyebrow: "Schritt für Schritt",
        title: "Körpergrößen online vergleichen: Anleitung für Einsteiger",
        step1Title: "Schritt 1: Wähle deinen Vergleichsaufbau",
        step1Desc: "Entscheide, was du vergleichen möchtest: Freunde, dich selbst mit einem Prominenten, Anime-Figuren oder Bauwerke. Wechsle jederzeit zwischen cm und Fuß/Zoll.",
        guidebookNoteLabel: "Hinweis zur Datenbank:",
        guidebookNoteText: "Durchsuche unsere Promi-Datenbank oder wähle Anime- und Fantasy-Charaktere aus dem Charakter-Bereich. Alle Werte basieren auf offiziellen Databooks und Veröffentlichungen.",
        panelPeople: "Personen",
        panelCelebrities: "Prominente",
        panelCharacters: "Charaktere",
        panelObjects: "Objekte",
        step2Title: "Schritt 2: Erstelle dein Diagramm",
        step2Desc: "Gib Namen ein, wähle eigene Farben und trage Maße ein. Die Figuren erscheinen sofort auf der Leinwand. Der Maßstab reicht bis zu 10.000 Meter, sodass du Personen neben den Eiffelturm oder Mount Everest stellen kannst.",
        panels: [
          { label: "Person hinzufügen", desc: "Name, Geschlecht, Größe in cm oder ft/in, Wunschfarbe." },
          { label: "Prominente", desc: "Sportler, Schauspieler und historische Ikonen weltweit." },
          { label: "Charaktere", desc: "Anime, Cartoons und Superhelden aus lizenzierten Büchern." },
          { label: "Objekte & Bauwerke", desc: "Tiere, weltberühmte Bauwerke und Naturmonumente." }
        ],
        step3Title: "Schritt 3: Unterschied sehen und teilen",
        step3Desc: "Jede Figur ist mit Namen und Größe beschriftet. Der Größenabstand ist sofort erkennbar. Lade dein Diagramm kostenlos als PNG herunter oder teile den Direktlink mit Freunden."
      },
      section3: {
        eyebrow: "Vorteile",
        title: "Warum ein visueller Vergleich mehr verrät als reine Zahlen",
        description: "Ein visuelles Größenvergleichs-Diagramm stellt die mathematische Beziehung maßstabsgetreu dar und macht Proportionen auf einen Blick erfassbar.",
        card1Title: "Proportionaler Maßstab enthüllt, was Zahlen verbergen",
        card1Desc: "Ein Unterschied von 12 cm bei 160 cm fällt optisch stärker ins Gewicht als bei 190 cm. Die Grafik verdeutlicht das sofort. Für die exakte Differenzrechnung nutze den ",
        card1Link: "Höhendifferenz-Rechner",
        card2Title: "Vergleiche dich mit jedem und allem",
        card2Desc: "Füge dich selbst hinzu und stelle einen Hollywood-Star, eine Spielfigur oder ein Naturwunder daneben – alles auf einer gemeinsamen Achse.",
        card3Title: "Figurenvergleich für Zeichner und Autoren",
        card3Desc: "Kreative visualisieren Beziehungen zwischen Charakteren anhand verifizierter Maße aus offiziellen Nachschlagewerken.",
        card4Title: "Keine manuellen Einheitenumrechnungen",
        card4Desc: "Trage Werte in cm oder ft/in ein. Subtraktion, Seitenverhältnis und Prozentrechnung erfolgen automatisch während der Eingabe.",
        card5Title: "Echte Maßstäbe rücken menschliche Dimensionen ins Licht",
        card5Desc: "Stelle einen 175 cm großen Menschen neben den Mount Everest (8.848 m), um wahre Dimensionen zu begreifen.",
        card6Title: "Exportierbares Ergebnis mit einem Klick",
        card6Desc: "Lade hochauflösende PNG-Bilder herunter oder erstelle teilbare Links für Social Media, Foren oder Vorträge."
      },
      section4: {
        eyebrow: "Anwendung",
        title: "Körpergrößen vergleichen: Beliebte Beispiele und Use-Cases",
        description: "Häufige Szenarien, in denen die visuelle Skalierung sofort Klarheit über Größenunterschiede schafft.",
        useCases: [
          {
            tag: "PAARE UND FREUNDE",
            quote: "„Warte mal, wie viel größer bist du eigentlich genau als ich?“",
            desc: "Trage beide Größen ein und sieh den genauen Unterschied im Diagramm. 10 cm Unterschied fallen sofort ins Auge.",
            try: "165 CM + 178 CM · 13 CM ABSTAND (7,9 %)"
          },
          {
            tag: "SPORT UND ATHLETEN",
            quote: "„Wer hat auf dem Spielfeld wirklich den Größenvorteil?“",
            desc: "Vergleiche NBA-Basketballer, NFL-Spieler oder Kletterer miteinander, um den echten Reichweitenvorteil zu sehen.",
            try: "NBA-STARTER 200 CM · NFL-LINEBACKER 188 CM · KLETTERER 174 CM"
          },
          {
            tag: "ANIME UND FANDOM",
            quote: "„Das Wiki nennt eine Zahl, aber wie sieht das nebeneinander aus?“",
            desc: "Anime-Charaktere aus verschiedenen Welten maßstabsgetreu nebeneinander: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) und Levi (160 cm).",
            try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
          },
          {
            tag: "OBJEKTE UND LANDMARKEN",
            quote: "„Ich hatte keine Vorstellung, wie gewaltig das in Wirklichkeit ist.“",
            desc: "Platziere eine Person neben die Angel Falls (979 m), eine 203 cm hohe Zimmertür oder eine Deckenhöhe von 2,60 m.",
            try: "MENSCH 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8.848 M"
          },
          {
            tag: "ICH VS. PROMINENTE",
            quote: "„Moment mal, die sind genauso groß wie ich?“",
            desc: "Vergleiche dich mit Stars wie Tom Cruise, The Rock oder Taylor Swift anhand veröffentlichter biographischer Daten.",
            try: "DU + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
          },
          {
            tag: "PLANUNG UND RAUMGESTALTUNG",
            quote: "„Passt dieses Möbelstück eigentlich wirklich in mein Zimmer?“",
            desc: "Füge Türrahmen, Schränke oder Deckenhöhen neben einer Person ein, um Proportionen vor dem Möbelkauf zu prüfen.",
            try: "PERSON 185 CM · STANDARDTÜR 203 CM · DECKENHÖHE 260 CM"
          }
        ],
        tableTitle: "Größenunterschied-Tabelle in Fuß, Zoll und Zentimetern",
        tableDesc: "Sieben alltagsnahe Beispiele für Paare und Personen, dargestellt in Fuß, Zoll, Zentimetern und prozentualen Verhältnissen."
      },
      section5: {
        eyebrow: "Vorteile",
        title: "Warum unser Größenvergleichs-Tool wählen?",
        description: "Professionelle Werkzeuge. Null Barrieren. Keine Registrierung.",
        features: [
          {
            title: "Echtzeit-Höhengenerator",
            desc: "Das Diagramm aktualisiert sich live bei jedem Tastendruck ohne Neuladen der Seite."
          },
          {
            title: "Individuelle Avatare",
            desc: "Sechs Farben und männliche/weibliche Silhouetten halten das Diagramm auch bei 10+ Personen übersichtlich."
          },
          {
            title: "Prominenten-Datenbank",
            desc: "1.294 Stars aus Sport, Film, Musik und Geschichte, direkt in der Datenbank erfasst."
          },
          {
            title: "Fiktionale Charaktere",
            desc: "1.138 Figuren aus Anime, Comics und Fantasy nach offiziellen Franchise-Quellen."
          },
          {
            title: "Objekte & Bauwerke",
            desc: "264 verifizierte Objekte, Tiere und Wahrzeichen vom Mammutbaum bis zum Mount Everest."
          },
          {
            title: "Bild-zu-Größe-Messung",
            desc: "Lade Fotos hoch und füge reale Aufnahmen automatisch maßstabsgetreu ins Diagramm ein."
          },
          {
            title: "Sauberer PNG-Export",
            desc: "Lade dein Diagramm kostenlos in hoher Auflösung herunter – ideal zum Teilen."
          },
          {
            title: "Teilbare Direktlinks",
            desc: "Erstelle einen Link zu deinem fertigen Diagramm, der 7 Tage lang ohne Konto aktiv bleibt."
          }
        ]
      },
      section6: {
        eyebrow: "Genauigkeit",
        title: "Wie verlässlich ist das Größenvergleichs-Diagramm?",
        items: [
          {
            title: "Exakte Skalierungs-Engine",
            desc: "Jede Figur wird exakt nach deinem Zahlenwert gezeichnet: 170 cm rendern auf der Leinwand als 170,00 Einheiten."
          },
          {
            title: "Referenzwerte",
            desc: "Veröffentlichte Maße weichen oft zwischen Quellen ab. Wir nutzen stets die jüngsten verifizierten Angaben seriöser Register."
          },
          {
            title: "Promi-Angaben",
            desc: "Entstammen biographischen Registern und offiziellen Maßblättern. Keine ungeprüften Fanschätzungen."
          },
          {
            title: "Offizielles Quellenmaterial",
            desc: "Charaktergrößen basieren auf lizenzierten Handbüchern und autorisierten Produktionsunterlagen."
          },
          {
            title: "Bauwerke & Tierwelt",
            desc: "Bauwerke nach Bauplänen verifiziert. Tiermaße messen die Schulterhöhe (Widerrist), nicht die Gesamtlänge."
          }
        ]
      },
      section7: {
        eyebrow: "Funktionsübersicht",
        title: "Auf maximale Einfachheit ausgelegt",
        description: "Alle Funktionen für den perfekten Größenvergleich – ohne jede Einstiegshürde.",
        thFeature: "Funktion",
        thFree: "Was du kostenlos erhältst",
        rows: [
          ["Figuren pro Diagramm", "Unbegrenzt – alle auf einer gemeinsamen Skala"],
          ["Vordefinierte Vorlagen", "2.696 Einträge (1.294 Prominente, 1.138 Charaktere, 264 Objekte)"],
          ["Unterstützte Einheiten", "Zentimeter, Meter, Fuß und Zoll (jederzeit wechselbar)"],
          ["Skalierungsbereich", "Von wenigen Zentimetern bis 10.000 Meter mit automatischem Zoom"],
          ["Exportoptionen", "Kostenloser PNG-Download und teilbare Links (7 Tage aktiv)"],
          ["Kosten & Konto", "0,00 € für immer – keine Registrierung, keine Abos, keine Zahlungsdaten"]
        ]
      },
      section8: {
        title: "Häufig gestellte Fragen (FAQ)",
        description: "Antworten auf die wichtigsten Fragen zu Diagrammskalierung, Einheiten und Datenquellen",
        badge: "HILFEZENTRUM"
      },
      section9: {
        eyebrow: "Entdecken",
        title: "Online-Werkzeuge & Rechner rund um Körpergröße",
        launchTool: "Rechner starten",
        privacyTitle: "Datenschutz & Nutzerrechte",
        privacyText: "Wir verkaufen deine personenbezogenen Daten niemals an Dritte. Unter Datenschutzgesetzen wie DSGVO und CCPA hast du jederzeit das Recht auf Auskunft und Widerspruch. Erfahre mehr in unserer ",
        privacyLink: "Datenschutzerklärung",
        privacyTextEnd: " oder kontaktiere uns direkt. Die normale Nutzung des Tools erfordert keinerlei Registrierung.",
        cards: [
          {
            label: "Höhendifferenz-Rechner",
            desc: "Exakter Größenabstand in cm und Zoll, prozentuale Abweichung und Referenztabelle für Paare.",
            badge: "Werkzeug",
            href: "/height-difference-calculator"
          },
          {
            label: "Perzentilen-Rechner (Größe & Gewicht)",
            desc: "Vergleiche deine Werte mit WHO- und CDC-Bevölkerungsdaten nach Alter und Geschlecht.",
            badge: "Werkzeug",
            href: "/height-weight-percentile-calculator"
          },
          {
            label: "Idealgewichts-Rechner",
            desc: "Formeln nach Devine, Robinson und Hamwi im direkten Vergleich mit gesunden Gewichtstabellen.",
            badge: "Werkzeug",
            href: "/ideal-body-weight-calculator"
          },
          {
            label: "Bild-zu-Größe-Rechner",
            desc: "Körpergröße ohne Maßband direkt anhand eines Fotos messen mit Genauigkeits-Tipps.",
            badge: "Werkzeug",
            href: "/image-to-height"
          },
          {
            label: "Größen-Vorhersagerechner",
            desc: "Erwachsenengröße bei Kindern nach Khamis-Roche und Mid-Parental-Methode berechnen.",
            badge: "Werkzeug",
            href: "/height-predictor"
          }
        ]
      }
    }
  }
};

const localizedMeta = {
  es: { title: "Gráfico de Comparación de Altura – Personas, Celebridades y Más", desc: "Compara alturas visualmente con nuestra calculadora y gráfico gratuitos. Compara personas, famosos, personajes y objetos a escala real lado a lado." },
  fr: { title: "Comparateur de taille en ligne – Tableau visuel à l'échelle", desc: "Comparez les tailles côte à côte avec notre outil et graphique gratuits. Personnes, célébrités, personnages fictifs et objets à l'échelle." },
  pt: { title: "Gráfico de Comparação de Altura – Pessoas, Famosos e Objetos", desc: "Compare alturas visualmente com nossa calculadora gratuita. Veja pessoas, celebridades, personagens e objetos lado a lado em escala real." },
  nl: { title: "Lengte Vergelijken Tool – Visuele Grafiek voor Personen & Beroemdheden", desc: "Vergelijk lengtes visueel met onze gratis tool. Bekijk personen, beroemdheden, personages en objecten op ware schaal naast elkaar." },
  ar: { title: "مخطط مقارنة الطول – مقارنة أطوال الأشخاص والمشاهير بدقة", desc: "قارن الأطوال بصريا من خلال مخطط وحاسبة مقارنة الأطوال المجانية. قارن بين الأشخاص والمشاهير والشخصيات جنبا إلى جنب." },
  it: { title: "Grafico di Confronto Altezza – Persone, Celebrità e Oggetti", desc: "Confronta visivamente le altezze con il nostro calcolatore gratuito. Confronta persone, celebrità, personaggi e oggetti in scala reale." },
  sv: { title: "Längdjämförelse – Jämför längd online med visuell skala", desc: "Jämför längder visuellt med vårt gratis verktyg. Se personer, kändisar, karaktärer och objekt i skalenlig storlek sida vid sida." },
  pl: { title: "Porównywarka Wzrostu – Wizualny Wykres i Skala Wzrostu Online", desc: "Porównaj wzrost wizualnie za pomocą darmowego kalkulatora. Zestawiaj ludzi, gwiazdy, postacie fikcyjne i obiekty w skali 1:1." }
};

const badgeMap = {
  es: "CENTRO DE AYUDA",
  fr: "CENTRE D'AIDE",
  pt: "CENTRAL DE AJUDA",
  nl: "HELPCENTRUM",
  ar: "مركز المساعدة",
  it: "CENTRO ASSISTENZA",
  sv: "HJÄLPCENTER",
  pl: "CENTRUM POMOCY"
};

function getHomeStructure(loc) {
  if (translations[loc]) return translations[loc];

  // Exact deep clone from German/English to ensure 100% key and array parity
  const clone = JSON.parse(JSON.stringify(translations.de.home));
  const meta = localizedMeta[loc] || localizedMeta.es;

  clone.section8.badge = badgeMap[loc] || "HELP CENTER";

  return {
    metadata: {
      homeTitle: meta.title,
      homeDescription: meta.desc
    },
    home: clone
  };
}

locales.forEach(loc => {
  const filePath = path.resolve(`messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const locTrans = getHomeStructure(loc);

  data.metadata = data.metadata || {};
  data.metadata.homeTitle = locTrans.metadata.homeTitle;
  data.metadata.homeDescription = locTrans.metadata.homeDescription;
  data.home = locTrans.home;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated messages/${loc}.json with home namespace!`);
});
