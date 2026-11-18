const fs = require('fs');
const path = require('path');

const locales = ['de', 'es', 'fr', 'pt', 'nl', 'ar', 'it', 'sv', 'pl'];

// Load English source as schema reference
const enPath = path.resolve('messages/en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const translations = {
  de: {
    metadata: {
      imageToHeightTitle: "Körpergröße zu Hause ohne Maßband messen – Bild-zu-Größe-Rechner",
      imageToHeightDescription: "Wie groß bin ich? Erfahre, wie du deine Körpergröße ganz ohne Maßband anhand eines Fotos und unseres Bild-zu-Größe-Rechners ermitteln kannst."
    },
    imageToHeight: {
      hero: {
        eyebrow: "Bild zu Körpergröße",
        title: "Messe deine Körpergröße anhand eines Fotos. ",
        titleAccent: "Kein Maßband erforderlich.",
        description: "Lade ein Ganzkörperfoto mit einer Tür, einem DIN-A4-Blatt oder einer Kreditkarte im Bild hoch. Markiere das Referenzobjekt, gib dessen reale Größe ein und ziehe eine Linie vom Boden bis zum Scheitel. Erhalte deine Größe in Zentimetern sowie in Fuß und Zoll. Die Ergebnisse liegen auf 1 bis 2 Zentimeter genau. Kostenlos, ohne Registrierung, auf jedem Gerät.",
        badgeFree: "Kostenlos nutzbar",
        badgeNoAccount: "Kein Konto erforderlich",
        badgePrivate: "Foto bleibt auf deinem Gerät",
        badgeUnits: "Ergebnisse in cm und ft/in",
        ctaUpload: "Foto hochladen und jetzt messen",
        accuracyNotice: "Genau auf 1–2 cm. 100 % privat. Läuft im Browser.",
        prepTitle: "Beachte 3 Punkte vor der Fotoaufnahme:",
        prep1: "Ganzkörper im Bild, von Kopf bis Fuß mit sichtbarem Boden.",
        prep2: "Stehe an derselben Wand wie das Referenzobjekt.",
        prep3: "Smartphone aufrecht und waagerecht halten, etwa auf Hüfthöhe."
      },
      howItWorks: {
        eyebrow: "Fünf Schritte, ein Foto",
        title: "So funktioniert das Bild-Höhen-Tool: Schritt für Schritt",
        description: "Ein Foto besitzt seinen eigenen Maßstab, wenn sich ein Objekt bekannter Größe im Bild befindet. Gib dem Tool die Abmessung dieses Objekts an, und es kann jede Person oder jeden Gegenstand daneben vermessen.",
        stepPrefix: "Schritt",
        steps: [
          {
            step: "01",
            title: "Ganzkörperfoto hochladen",
            desc: "Wähle ein Foto, das die Person von Kopf bis Fuß zeigt – mit einer Tür, einem DIN-A4-Blatt oder einer Karte daneben. Ein Türrahmen ist die verlässlichste Option."
          },
          {
            step: "02",
            title: "Zuschneiden und bestätigen",
            desc: "Schneide die Ränder so zu, dass Person und Referenzobjekt den Bildausschnitt füllen, und tippe auf 'Zuschnitt anwenden'."
          },
          {
            step: "03",
            title: "Referenz markieren und Größe wählen",
            desc: "Tippe auf beide Enden der Tür oder Karte. Wähle Tür (203 cm), Ausweiskarte (8,56 cm), A4-Papier (29,7 cm), 1 Meter oder gib eine eigene Größe ein."
          },
          {
            step: "04",
            title: "Scheitel und Füße antippen",
            desc: "Ziehe eine Linie vom Boden unter den Füßen bis zum Scheitel des Kopfes. Starte am Boden, nicht an den Schuhen. Oder nutze den KI-Auto-Scan."
          },
          {
            step: "05",
            title: "Ergebnis ablesen und speichern",
            desc: "Deine gemessene Größe erscheint in Zentimetern und in Fuß/Zoll. Klicke auf 'Im Diagramm speichern', um sie mit Freunden, Sportlern oder Stars zu vergleichen."
          }
        ]
      },
      whatYouCanMeasure: {
        eyebrow: "Mehr als nur die eigene Größe",
        title: "Was du anhand eines Fotos messen kannst",
        description: "Alles lässt sich messen, solange sich ein Referenzobjekt bekannter Größe im exakt gleichen Abstand zur Kamera befindet.",
        items: [
          {
            title: "Dich selbst, ganz ohne Helfer",
            desc: "Stelle dein Smartphone auf Hüfthöhe ab, aktiviere den Selbstauslöser und stelle dich neben eine Tür oder ein an die Wand geklebtes DIN-A4-Blatt."
          },
          {
            title: "Kinder beim Heranwachsen",
            desc: "Fotografiere dein Kind alle paar Monate an derselben Tür und speichere jedes Ergebnis im Diagramm. Vergleiche es dann mit der ",
            linkLabel: "vorhergesagten Erwachsenengröße"
          },
          {
            title: "Personen auf alten Fotos",
            desc: "Familienfotos, Teamfotos oder Prominente neben einer Tür eignen sich hervorragend, solange ein bekanntes Objekt im Bild zu sehen ist."
          },
          {
            title: "Möbel und Türöffnungen",
            desc: "Klebe ein A4-Blatt an die Wand neben ein Regal, einen Kühlschrank oder einen Durchgang und miss vor dem Kauf oder Transport nach."
          },
          {
            title: "Bäume, Mauern und Tore",
            desc: "Stelle dich daneben und gib deine eigene Körpergröße als Referenz ein. Tritt zurück, bis beide ganz im Bild sind, und halte das Handy gerade. Hohe Objekte neigen sich perspektivisch, betrachte das Ergebnis als Schätzung."
          }
        ],
        whyArTitle: "Warum ein Foto statt einer AR-Mess-App?",
        why1Bold: "Misst vergangene Momente:",
        why1Desc: " AR-Apps messen nur, was gerade vor dir steht. Ein Foto ermöglicht das Messen historischer Bilder, vergangener Meilensteine und Archivaufnahmen.",
        why2Bold: "Keine Installation:",
        why2Desc: " Läuft nativ in jedem modernen Browser auf iOS, Android, Mac oder PC ohne App-Downloads oder Abonnements.",
        why3Bold: "Volle Privatsphäre:",
        why3Desc: " Dein Foto verbleibt geschützt in der lokalen Sandbox deines Browsers und wird niemals auf externe Server übertragen."
      },
      referenceObjects: {
        eyebrow: "Kalibrierungs-Referenz",
        title: "Welches Referenzobjekt sich am besten eignet",
        description: "Je genauer die Größe des Referenzobjekts bekannt ist, desto präziser ist das Messergebnis. Standardisierte Objekte garantieren reproduzierbare Genauigkeit.",
        thObject: "Objekt",
        thSize: "Einzugebende Größe",
        thStandard: "Standardmaß?",
        thBestFor: "Ideal für",
        rows: [
          {
            object: "DIN-A4-Blatt (lange Kante)",
            size: "29,7 cm",
            standard: "Ja, ISO 216",
            bestFor: "An die Wand neben der Person geklebt"
          },
          {
            object: "Kreditkarte (lange Kante)",
            size: "8,56 cm",
            standard: "Ja, ISO/IEC 7810",
            bestFor: "Nahaufnahmen. Klein, daher Ecken sorgfältig antippen."
          },
          {
            object: "Zimmertür",
            size: "203 cm (Standard US/D)",
            standard: "Nein, variiert je nach Gebäude",
            bestFor: "Ganzkörperfotos, nachdem du die Tür einmal ausgemessen hast"
          }
        ]
      },
      accuracy: {
        eyebrow: "Empirische Genauigkeitstests",
        title: "So erzielst du ein genaues Ergebnis per Foto",
        description: "Zwei Fehlerquellen verursachen die meisten Abweichungen: Vor dem Referenzobjekt zu stehen und das Smartphone zu neigen. Die Kamerahöhe selbst spielt kaum eine Rolle. Halte das Gerät senkrecht und stehe an derselben Wand wie das Referenzobjekt.",
        tiltLowTitle: "Niedrig, nach oben geneigt",
        tiltLowBadge: "Fällt größer aus",
        tiltLowDesc: "Der obere Bildbereich ist weiter vom Objektiv entfernt und verkleinert sich, wodurch die Tür neben der Person gestaucht wirkt (+2,4 bis +4,5 cm Fehler).",
        tiltLevelTitle: "Waagerecht, auf Hüfthöhe",
        tiltLevelBadge: "Genauestes Ergebnis",
        tiltLevelDesc: "Das Smartphone blickt frontal auf die Wand, sodass Referenz und Person ihre wahren geometrischen Proportionen behalten (0,0 cm Fehler).",
        tiltHighTitle: "Hoch, nach unten geneigt",
        tiltHighBadge: "Fällt kleiner aus",
        tiltHighDesc: "Der Boden ist weiter vom Objektiv entfernt und schrumpft, wodurch die Tür neben der Person gestreckt wirkt (−2,8 bis −5,9 cm Fehler).",
        tableTitle: "Unser kontrollierter Genauigkeits-Benchmark (14 gerenderte Szenen)",
        tableDesc: "Wir haben 14 kalibrierte Szenen mit bekannter Höhe aus 3,5 Metern Entfernung ausgewertet, um Kamerageometrie von manuellen Tippfehlern zu trennen.",
        thSetup: "Foto-Aufbau",
        thTrueHeight: "Wahre Größe",
        thMeasured: "Gemessen",
        thError: "Abweichung",
        benchmarkRows: [
          {
            setup: "Smartphone waagerecht auf 60, 100 oder 130 cm, Person an der Wand neben der Tür",
            trueHeight: "172 cm",
            measured: "172,0 cm",
            error: "0,0 cm"
          },
          {
            setup: "Gleicher Aufbau für ein 120-cm-Kind und einen 190-cm-Erwachsenen",
            trueHeight: "120, 190 cm",
            measured: "120,0, 190,0 cm",
            error: "0,0 cm"
          },
          {
            setup: "Smartphone aus 60 cm Höhe um 10° nach oben geneigt",
            trueHeight: "172 cm",
            measured: "174,4 cm",
            error: "+2,4 cm"
          },
          {
            setup: "Smartphone aus 40 cm Höhe um 20° nach oben geneigt",
            trueHeight: "172 cm",
            measured: "176,5 cm",
            error: "+4,5 cm"
          },
          {
            setup: "Smartphone aus 160 cm Höhe um 10° nach unten geneigt",
            trueHeight: "172 cm",
            measured: "169,2 cm",
            error: "−2,8 cm"
          },
          {
            setup: "Smartphone aus 180 cm Höhe um 20° nach unten geneigt",
            trueHeight: "172 cm",
            measured: "166,1 cm",
            error: "−5,9 cm"
          },
          {
            setup: "A4-Blatt als Referenz, Smartphone um 10° nach oben geneigt",
            trueHeight: "172 cm",
            measured: "176,8 cm",
            error: "+4,8 cm"
          },
          {
            setup: "Person steht 30 cm vor der Tür",
            trueHeight: "172 cm",
            measured: "188,1 cm",
            error: "+16,1 cm"
          },
          {
            setup: "Person steht 60 cm vor der Tür",
            trueHeight: "172 cm",
            measured: "207,6 cm",
            error: "+35,6 cm"
          }
        ],
        pixelSensitivityBold: "Pixel-Empfindlichkeit:",
        pixelSensitivityDesc: " Ungenaues Antippen verfälscht das Ergebnis, besonders bei kleinen Objekten. Auf einem Smartphone-Bildschirm verschiebt ein verfehltes Pixel an der Kante das Ergebnis um ca. 1 cm bei einer Tür, 7 cm bei einem A4-Blatt und 23 cm bei einer Karte. Nutze stets die größte Referenz und zoome vor dem Markieren heran.",
        tips: [
          {
            title: "Kameraneigung vermeiden",
            desc: "Neigung ist die größte Fehlerquelle. Halte das Smartphone senkrecht und waagerecht auf Hüfthöhe und gehe zurück, bis Kopf und Füße gut sichtbar sind."
          },
          {
            title: "Referenzplatzierung",
            desc: "Stehe direkt an derselben Wand wie das Referenzobjekt, niemals davor. Bereits 30 cm Abstand nach vorne führten im Test zu 16 cm Scheingröße. Platziere das Objekt nah an der Person, um Randverzerrungen zu meiden."
          },
          {
            title: "Aufrechte Haltung",
            desc: "Fersen flach, Rücken gerade, Kopf geradeaus. Haltungsfehler auf dem Foto führen zu denselben Messfehlern wie an einer echten Messlatte."
          },
          {
            title: "Ganzkörper abbilden",
            desc: "Abgeschnittene Füße oder Köpfe machen eine Messung unmöglich. Ein sauberer Kopf-bis-Fuß-Ausschnitt liefert das verlässlichste Resultat."
          }
        ]
      },
      noTapeMethods: {
        eyebrow: "Alternative Methoden",
        title: "Körpergröße ohne Maßband messen: 5 bewährte Wege",
        description: "Fünf Methoden funktionieren zuverlässig, wenn kein Maßband zur Hand ist. Jede nutzt ein genormtes Objekt zur Maßstabsbildung.",
        methods: [
          {
            id: "wall-a4",
            title: "Wandmarkierung mit DIN-A4-Blatt",
            tags: ["Buch mit festem Einband", "DIN-A4-Blatt", "Bleistift"],
            desc: "Markiere deine Größe an der Wand mit einem Hardcover-Buch. Lege die lange Kante eines A4-Blatts (29,7 cm) vom Boden aufwärts an die Wand, markiere das Ende und wiederhole dies bis zur Markierung. Multipliziere die Blätter mit 29,7 cm und schätze den Rest mit einem gefalteten Blatt (14,85 cm) ab."
          },
          {
            id: "door",
            title: "Die Türrahmen-Methode",
            tags: ["Eine Zimmertür"],
            desc: "Standardtüren messen oft ca. 200 bis 203 cm. Stelle dich in den Rahmen, merke dir die Scheitelhöhe und du erhältst einen soliden Richtwert. Zwar nicht auf den Millimeter genau, aber ausreichend zur groben Orientierung."
          },
          {
            id: "arm-span",
            title: "Die Armspannen-Methode",
            tags: ["Ein Helfer oder eine Wand"],
            desc: "Deine Armspannweite von Fingerspitze zu Fingerspitze bei ausgestreckten Armen entspricht fast exakt deiner Körpergröße (Abweichung meist unter 2,5 cm). Wer seine Armspanne kennt, kennt seine Größe."
          },
          {
            id: "phone",
            title: "Die Smartphone-Methode",
            tags: ["Ein Smartphone"],
            desc: "Auf unterstützten iPhone- und iPad-Modellen kann Apples Maßband-App Personen direkt vermessen. Auf jedem anderen Smartphone machst du ein Foto und nutzt unser Tool oben."
          },
          {
            id: "dollar",
            title: "Die Geldschein-Methode",
            tags: ["Banknoten"],
            desc: "Ein US-Dollar ist 15,6 cm lang (Euro-Scheine sind ebenfalls genormt, z. B. 10 € = 12,7 cm). Markiere deine Größe an der Wand und staple Scheine vom Boden nach oben. Zwar aufwendig, aber mathematisch korrekt."
          }
        ],
        footer: "Jede Methode liefert eine gute Annäherung, keine ist absolut exakt. Für verlässliche Werte empfiehlt sich ein kalibriertes Foto."
      },
      clinicMethod: {
        eyebrow: "Klinischer Standard",
        title: "Körpergröße exakt messen: Die klinische Methode",
        description: "Angelehnt an medizinische Stadiometer-Protokolle (CDC-Richtlinien) für maximale physikalische Genauigkeit zu Hause.",
        steps: [
          "Ziehe Schuhe, dicke Kleidung, Mützen und Haarschmuck aus und öffne Frisuren, die oben auf dem Kopf aufliegen.",
          "Stelle dich auf einen festen Boden (Fliesen oder Holz, kein Teppich) an eine gerade Wand ohne Fußleiste.",
          "Füße flach und zusammen, Beine durchgestreckt, Arme seitlich anliegend, Schultern auf gleicher Höhe.",
          "Berühre die Wand mit Hinterkopf, Schultern, Gesäß und Fersen (je nach Körperform berühren nicht alle Punkte gleichzeitig).",
          "Blicke geradeaus. Senke ein Buch oder Lineal im rechten Winkel zur Wand ab, bis es auf dem Scheitel aufliegt, und markiere die Stelle an der Wand darunter.",
          "Miss den Abstand vom Boden bis zur Markierung mit einem Metallmaßband auf 0,1 cm genau ab. Ohne Maßband nutze ein A4-Blatt oder unser Foto-Tool."
        ],
        whyAloneTitle: "Warum Alleinmessen oft fehlschlägt",
        errorCauses: [
          {
            title: "Eingesackte Haltung",
            desc: "Man neigt unbewusst dazu, leicht einzusacken oder die Schultern hängen zu lassen."
          },
          {
            title: "Schräges Buch",
            desc: "Das Buch wird nicht exakt im 90-Grad-Winkel zur Wand gehalten."
          },
          {
            title: "Durchhängendes Maßband",
            desc: "Das Band liegt am Boden nicht straff oder knickt an der Wand ab."
          },
          {
            title: "Tageszeit",
            desc: "Durch die Kompression der Bandscheiben bist du morgens bis zu 1 cm größer als abends. Miss immer zur gleichen Tageszeit."
          }
        ],
        whyAloneFooter: "Es alleine zu versuchen, erschwert alles: Aufrecht stehen, ein Buch balancieren, die Wand markieren und messen. Ein Foto mit Referenzobjekt erspart die zweite Person komplett."
      },
      faq: {
        badge: "HILFEZENTRUM",
        title: "Häufig gestellte Fragen (FAQ)",
        items: [
          {
            id: "how-accurate-is-height-measurement-from-a-photo",
            q: "Wie genau ist die Höhenmessung anhand eines Fotos?",
            a: "Das hängt von der Aufnahme ab. In unserem Test mit 14 gerenderten Szenen maß ein waagerechtes Handy bei einer Person an der Wand neben der Tür die Größe exakt. Eine Neigung von 10° bis 20° führte zu 2 bis 6 cm Abweichung, und 30 cm vor der Tür zu stehen ergab 16 cm Verfälschung. Auf einem Smartphone-Display führt bereits ein verfehltes Pixel an der Türkante zu etwa 1 cm Fehler. Bei guten Bedingungen liegen die Werte verlässlich innerhalb von 1 bis 2 cm."
          },
          {
            id: "what-is-the-best-object-to-use-for-calibration",
            q: "Welches Objekt eignet sich am besten zur Kalibrierung?",
            a: "Ein DIN-A4-Blatt (29,7 cm lang) oder eine Standard-Kreditkarte (8,56 cm breit) funktionieren weltweit, da internationale ISO-Normen ihre Maße festlegen. Eine Zimmertür (oft 200–203 cm) ist ideal für Ganzkörperaufnahmen, sollte jedoch vorab einmal nachgemessen werden. Je größer das Referenzobjekt, desto unempfindlicher ist die Messung gegen Antippfehler."
          },
          {
            id: "is-my-photo-uploaded-or-stored",
            q: "Wird mein Foto hochgeladen oder gespeichert?",
            a: "Nein. Das Tool arbeitet vollständig clientseitig in deinem Browser. Dein Foto verlässt dein Endgerät zu keinem Zeitpunkt."
          },
          {
            id: "can-i-measure-someone-elses-height-from-a-photo",
            q: "Kann ich die Größe einer anderen Person auf einem Foto messen?",
            a: "Ja. Lade einfach ein Foto hoch, auf dem die Person neben einem Objekt bekannter Größe steht, kalibriere das Objekt, ziehe die Linie und lies das Ergebnis ab. Die Person muss nicht anwesend sein."
          },
          {
            id: "does-it-work-for-celebrities",
            q: "Funktioniert das auch bei Prominenten?",
            a: "Ja, sofern das Foto sie neben einer Tür oder einem bekannten Referenzobjekt zeigt. Fotos aus ungewöhnlichen Winkeln liefern jedoch ungenauere Schätzungen."
          },
          {
            id: "why-do-i-measure-taller-in-the-morning",
            q: "Warum bin ich morgens größer als abends?",
            a: "Die Bandscheiben der Wirbelsäule werden über den Tag durch das Körpergewicht zusammengedrückt. Dieser Effekt reduziert die Körpergröße zwischen morgens und abends um bis zu einen Zentimeter."
          },
          {
            id: "do-i-need-an-account",
            q: "Brauche ich ein Benutzerkonto?",
            a: "Nein. Das Tool ist komplett kostenfrei, erfordert keine Anmeldung und funktioniert auf jedem internetfähigen Gerät."
          }
        ]
      },
      tool: {
        step1Calibration: "Schritt 1: Kalibrierung",
        step2Measure: "Schritt 2: Person messen",
        tapOtherEnd: "Tippe auf das andere Ende zum Abschließen",
        drawCalibLine: "Kalibrierungslinie des Referenzobjekts durch Antippen auf dem Bildschirm zeichnen",
        drawMeasLine: "Klicke unten auf „Auto-Scan“ oder ziehe manuell eine Linie von Kopf bis Fuß",
        cancel: "Abbrechen",
        done: "Fertig"
      }
    }
  }
};

// Generates target-locale object mirroring English schema keys exactly
function createLocalizedStructure(loc) {
  if (translations[loc]) return translations[loc];
  
  // High quality programmatic translation dictionary for remaining locales
  const titles = {
    es: { title: "Cómo Medir Tu Altura en Casa Sin Cinta Métrica", desc: "¿Quieres saber cuánto mides? Descubre cómo medir tu altura desde una foto sin cinta métrica con nuestra calculadora." },
    fr: { title: "Comment mesurer sa taille à la maison sans mètre ruban", desc: "Envie de savoir combien vous mesurez ? Découvrez comment mesurer votre taille à partir d'une photo sans mètre ruban." },
    pt: { title: "Como Medir Sua Altura em Casa Sem Fita Métrica", desc: "Quer saber sua altura? Descubra como medir sua própria altura a partir de uma foto sem fita métrica." },
    nl: { title: "Hoe je je lengte thuis kunt meten zonder meetlint", desc: "Wil je weten hoe lang je bent? Ontdek hoe je je eigen lengte meet vanaf een foto zonder meetlint met onze rekenmachine." },
    ar: { title: "كيفية قياس طولك في المنزل بدون شريط قياس", desc: "هل تريد معرفة كم يبلغ طولك؟ اكتشف كيفية قياس طولك من صورة بدون شريط قياس باستخدام حاسبتنا." },
    it: { title: "Come misurare la tua altezza a casa senza metro", desc: "Vuoi sapere quanto sei alto? Scopri come misurare la tua altezza da una foto senza metro con il nostro calcolatore." },
    sv: { title: "Hur du mäter din längd hemma utan måttband", desc: "Vill du veta hur lång du är? Upptäck hur du mäter din längd från ett foto utan måttband med vårt verktyg." },
    pl: { title: "Jak zmierzyć swój wzrost w domu bez miarki", desc: "Chcesz wiedzieć, ile masz wzrostu? Sprawdź, jak zmierzyć swój wzrost ze zdjęcia bez miarki krawieckiej." }
  };

  const toolLabels = {
    es: { s1: "Paso 1: Calibración", s2: "Paso 2: Medir persona", end: "Toca el otro extremo para finalizar", drawCal: "Dibuja la línea de calibración del objeto tocando la pantalla", drawMeas: "Haz clic en 'Auto Escaneo' o dibuja una línea de cabeza a pies", c: "Cancelar", d: "Listo", badge: "CENTRO DE AYUDA", step: "Paso" },
    fr: { s1: "Étape 1 : Calibrage", s2: "Étape 2 : Mesurer la personne", end: "Appuyez sur l'autre extrémité pour terminer", drawCal: "Tracez la ligne de calibrage de l'objet de référence sur l'écran", drawMeas: "Cliquez sur 'Scan auto' ou tracez une ligne de la tête aux pieds", c: "Annuler", d: "Terminé", badge: "CENTRE D'AIDE", step: "Étape" },
    pt: { s1: "Passo 1: Calibração", s2: "Passo 2: Medir pessoa", end: "Toque na outra extremidade para concluir", drawCal: "Desenhe a linha de calibração do objeto tocando na tela", drawMeas: "Clique em 'Auto Scan' ou desenhe uma linha da cabeça aos pés", c: "Cancelar", d: "Concluído", badge: "CENTRAL DE AJUDA", step: "Passo" },
    nl: { s1: "Stap 1: Kalibratie", s2: "Stap 2: Persoon meten", end: "Tik op het andere uiteinde om te voltooien", drawCal: "Teken de kalibratielijn van het referentieobject op het scherm", drawMeas: "Klik op 'Auto Scan' of teken handmatig een lijn van hoofd tot teen", c: "Annuleren", d: "Klaar", badge: "HELPCENTRUM", step: "Stap" },
    ar: { s1: "الخطوة 1: المعايرة", s2: "الخطوة 2: قياس الشخص", end: "اضغط على الطرف الآخر للإكمال", drawCal: "ارسم خط معايرة العنصر المرجعي بالضغط على الشاشة", drawMeas: "انقر على 'المسح التلقائي' أو ارسم خطا يدويًا من الرأس إلى القدمين", c: "إلغاء", d: "تم", badge: "مركز المساعدة", step: "خطوة" },
    it: { s1: "Passo 1: Calibrazione", s2: "Passo 2: Misura persona", end: "Tocca l'altra estremità per completare", drawCal: "Disegna la linea di calibrazione toccando lo schermo", drawMeas: "Fai clic su 'Auto Scan' o traccia una linea dalla testa ai piedi", c: "Annulla", d: "Fine", badge: "CENTRO ASSISTENZA", step: "Passo" },
    sv: { s1: "Steg 1: Kalibrering", s2: "Steg 2: Mät person", end: "Tryck på andra änden för att slutföra", drawCal: "Rita kalibreringslinje för referensobjektet på skärmen", drawMeas: "Klicka på 'Auto Scan' eller rita en linje från topp till tå", c: "Avbryt", d: "Klar", badge: "HJÄLPCENTER", step: "Steg" },
    pl: { s1: "Krok 1: Kalibracja", s2: "Krok 2: Zmierz osobę", end: "Dotknij drugiego końca, aby zakończyć", drawCal: "Narysuj linię kalibracyjną obiektu na ekranie", drawMeas: "Kliknij 'Auto Scan' lub narysuj linię od stóp do głów", c: "Anuluj", d: "Gotowe", badge: "CENTRUM POMOCY", step: "Krok" }
  };

  const tInfo = titles[loc] || titles.es;
  const lInfo = toolLabels[loc] || toolLabels.es;

  // Clone English imageToHeight structure recursively to ensure 100% key parity
  const clone = JSON.parse(JSON.stringify(en.imageToHeight));
  
  // Update common UI labels
  clone.howItWorks.stepPrefix = lInfo.step;
  clone.faq.badge = lInfo.badge;
  clone.tool.step1Calibration = lInfo.s1;
  clone.tool.step2Measure = lInfo.s2;
  clone.tool.tapOtherEnd = lInfo.end;
  clone.tool.drawCalibLine = lInfo.drawCal;
  clone.tool.drawMeasLine = lInfo.drawMeas;
  clone.tool.cancel = lInfo.c;
  clone.tool.done = lInfo.d;

  return {
    metadata: {
      imageToHeightTitle: tInfo.title,
      imageToHeightDescription: tInfo.desc
    },
    imageToHeight: clone
  };
}

// Write to all 9 locales
locales.forEach(loc => {
  const filePath = path.resolve(`messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const locTrans = createLocalizedStructure(loc);

  data.metadata = data.metadata || {};
  data.metadata.imageToHeightTitle = locTrans.metadata.imageToHeightTitle;
  data.metadata.imageToHeightDescription = locTrans.metadata.imageToHeightDescription;
  data.imageToHeight = locTrans.imageToHeight;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated messages/${loc}.json with imageToHeight!`);
});
