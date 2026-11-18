const fs = require('fs');
const path = require('path');

function updateLocale(loc, trans) {
  const filePath = path.resolve(`messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.home = trans.home;
  data.imageToHeight = trans.imageToHeight;

  if (trans.heightDifference) {
    data.heightDifference = trans.heightDifference;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${loc} successfully!`);
}

// ==========================================
// SWEDISH (sv)
// ==========================================
const svData = {
  home: {
    intro: {
      h1: "Längdjämförelse Kalkylator: Jämför Längder Online med Visuell Skala",
      p: "Använd detta längdjämförelseverktyg för att visualisera kroppslängder sida vid sida i en skalenlig graf. Ange valfri längd i centimeter eller fot och tum för att omedelbart se skillnaden. Verktyget ger en visuell jämförelse med exakta proportioner. Diagrammet uppdateras i realtid och ritar varje figur efter ditt angivna mått.",
      freeLibraryBadge: "Kostnadsfritt Online-bibliotek",
      freeLibraryDesc: "Få tillgång till vårt bibliotek med färdiga referenslängder i tre samlingar, skapa obegränsat med egna jämförelser och ladda ner högupplösta PNG-bilder.",
      noAccounts: "Inget konto krävs",
      noPayments: "Helt gratis",
      free100: "100 % Gratis",
      compareNowCta: "Jämför nu ↑"
    },
    section1: {
      eyebrow: "Hur det fungerar",
      title: "Hur Fungerar ett Längdjämförelsediagram?",
      p1: "Ett längdjämförelsediagram omvandlar siffror till en skalenlig visuell bild där varje figur återspeglar exakta geometriska proportioner i naturlig storlek.",
      p2: "Om Person A är 170 cm och Person B är 185 cm, ritas den andra figuren till exakt 1,09 gånger höjden av den första. En skillnad på 10 cm vid 160 cm är proportionellt annorlunda än vid 190 cm — diagrammet gör detta direkt synligt utan huvudräkning.",
      p3: "Perfekt för familjejämförelser, idrottslag eller kreativa projekt.",
      imgAlt: "Längdjämförelsediagram mellan en person på 170 cm och 185 cm sida vid sida",
      imgCaption: "Alex på 170 cm (5'7\") och Ben på 185 cm (6'1\"), ritade i skala.",
      needGapTitle: "Behöver du bara den exakta matematiska skillnaden?",
      needGapDesc: "Kalkylatorn för längdskillnad visar det exakta avståndet i cm och tum, procentskillnad och en visuell stapel. Perfekt för rena sifferberäkningar.",
      needGapCta: "Öppna Kalkylator för Längdskillnad"
    },
    section2: {
      eyebrow: "Steg för steg",
      title: "Hur man Jämför Längder Online: Guide för Nybörjare",
      step1Title: "Steg 1: Välj vad du vill jämföra",
      step1Desc: "Välj vilka du vill ställa bredvid varandra: vänner, dig själv mot en kändis, anime-karaktärer eller kända byggnader. Växla direkt mellan cm och fot/tum.",
      guidebookNoteLabel: "Anteckning från officiella källor:",
      guidebookNoteText: "Sök i vår kändisdatabas eller utforska fiktiva figurer. Alla längder hämtas från officiella databöcker och verifierade register.",
      panelPeople: "Personer",
      panelCelebrities: "Kändisar",
      panelCharacters: "Fiktiva figurer",
      panelObjects: "Föremål och monument",
      step2Title: "Steg 2: Bygg ditt längddiagram",
      step2Desc: "Lägg till namn, färger och mått. Systemet skalar upp till 10 000 meter (32 808 fot), så du kan placera en människa bredvid Eiffeltornet eller Mount Everest.",
      panels: [
        { label: "Lägg till person", desc: "Namn, kön, längd i cm eller fot/tum och valfri färg." },
        { label: "Kändisar", desc: "Idrottare, skådespelare och historiska ikoner från hela världen." },
        { label: "Fiktiva figurer", desc: "Anime, tecknat och superhjältar från officiella handböcker." },
        { label: "Föremål och natur", desc: "Djur, välkända monument och bergstoppar." }
      ],
      step3Title: "Steg 3: Se skillnaden och dela",
      step3Desc: "Varje silhuett visar namn och längd. Skillnaden syns direkt. Ladda ner en skarp PNG-bild eller dela en direktlänk som är aktiv i 7 dagar."
    },
    section3: {
      eyebrow: "Varför använda verktyget",
      title: "Varför en Visuell Graf Säger Mer Än Siffror",
      description: "Ett visuellt diagram sätter matematiska mått i verklig proportion, vilket gör skillnaden i kroppslängd självklar vid första anblicken.",
      card1Title: "Proportionell skala visar vad siffror döljer",
      card1Desc: "Ett gap på 12 cm vid 160 cm är proportionellt större än vid 190 cm. Våra staplar visar detta omedelbart. För ren matematik, se ",
      card1Link: "Kalkylator för Längdskillnad",
      card2Title: "Jämför dig med vem som helst eller vad som helst",
      card2Desc: "Lägg in din egen längd och ställ dig bredvid en kändis eller ett berg på samma baslinje.",
      card3Title: "Karaktärsjämförelse för konstnärer och författare",
      card3Desc: "Illustratörer och skribenter kan enkelt kontrollera korrekta kroppsproportioner mellan karaktärer.",
      card4Title: "Inga manuella konverteringar krävs",
      card4Desc: "Skriv i cm eller ft/in. Differenser, procenttal och skalor räknas ut i realtid medan du skriver.",
      card5Title: "Verklig skala ger mänskligt perspektiv",
      card5Desc: "Se en person på 175 cm intill Mount Everest (8 848 m) för att förstå naturens verkliga proportioner.",
      card6Title: "Exportera med ett enda klick",
      card6Desc: "Ladda ner skarpa PNG-filer eller skapa länkar för sociala medier, forum eller presentationer."
    },
    section4: {
      eyebrow: "Praktiska exempel",
      title: "Jämföra Längder: Vardagliga Scenarier och Exempel",
      description: "Verkliga situationer där en skalenlig visning ger omedelbar klarhet jämfört med enbart siffror.",
      useCases: [
        {
          tag: "PAR OCH VÄNNER",
          quote: "”Vänta, hur mycket längre än mig är du egentligen?”",
          desc: "Mata in båda längderna och se skillnaden direkt. Ett gap på 10 cm syns tydligt vid en blick.",
          try: "165 CM + 178 CM · SKILLNAD PÅ 13 CM (7,9 %)"
        },
        {
          tag: "SPORT OCH ATLETER",
          quote: "”Vem har egentligen längdfördelen på planen?”",
          desc: "Jämför NBA-spelare och andra idrottare för att se räckvidd och övertag i matchsituationer.",
          try: "NBA-STARTER 200 CM · NFL-LINEBACKER 188 CM · KLÄTTRARE 174 CM"
        },
        {
          tag: "ANIME OCH FANDOM",
          quote: "”Wikisidan anger måtten, men hur ser de ut bredvid varandra?”",
          desc: "Anime-karaktärer i naturlig skala: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) och Levi (160 cm).",
          try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
        },
        {
          tag: "OBJEKT OCH MONUMENT",
          quote: "”Jag insåg inte hur enormt det faktiskt är.”",
          desc: "Placera en människa bredvid Angel Falls (979 m), en standarddörr (203 cm) eller ditt vardagsrumstak.",
          try: "MÄNNISKA 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8 848 M"
        },
        {
          tag: "JAG MOT KÄNDISARNA",
          quote: "”Är jag verkligen lika lång som dem?”",
          desc: "Jämför dig med stjärnor som Tom Cruise, The Rock eller Taylor Swift baserat på verifierade data.",
          try: "DU + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
        },
        {
          tag: "INREDNING OCH DESIGN",
          quote: "”Kommer den här möbeln verkligen att få plats i rummet?”",
          desc: "Sätt in dörrkarm eller takhöjd bredvid en människa innan du beställer nya möbler.",
          try: "MÄNNISKA 185 CM · STANDARDDÖRR 203 CM · TAKHÖJD 260 CM"
        }
      ],
      tableTitle: "Tabell över längdskillnader i fot, tum och centimeter",
      tableDesc: "Sju vardagliga exempel för att jämföra par och personer i fot, tum, centimeter och procent."
    },
    section5: {
      eyebrow: "Fördelar",
      title: "Varför Välja Vår Längdjämförelse Kalkylator?",
      description: "Omfattande funktioner. Blixtsnabb prestanda. Inget konto krävs.",
      features: [
        { title: "Omedelbar uppdatering", desc: "Grafen uppdateras i realtid medan du skriver, utan sidomladdning." },
        { title: "Anpassade silhuetter", desc: "Sex färger och manliga/kvinnliga silhuetter för att särskilja över 10 figurer." },
        { title: "Kändisdatabas", desc: "1 294 verifierade personer bland idrottare, skådespelare och historiska ledare." },
        { title: "Fiktiva figurer", desc: "1 138 figurer från anime, serietidningar och spel enligt officiella källor." },
        { title: "Objekt och monument", desc: "264 verkliga referenser från djurriket, skyskrapor och bergstoppar." },
        { title: "Mät från foto", desc: "Ladda upp ett vanligt fotografi och placera in det i rätt skala." },
        { title: "Ren PNG-export", desc: "Ladda ner högupplösta bilder helt gratis och utan vattenstämplar." },
        { title: "Delbara länkar", desc: "Skapa en direktlänk till ditt diagram som fungerar i 7 dagar utan inloggning." }
      ]
    },
    section6: {
      eyebrow: "Tillförlitlighet",
      title: "Hur Noggrant är Vårt Längdjämförelsediagram?",
      items: [
        { title: "Skalenlig renderingsmotor", desc: "Varje silhuett motsvarar det exakta värdet: 170 cm ritas som exakt 170,00 enheter på axeln." },
        { title: "Standardiserade referenser", desc: "Om källor varierar använder vi de senast officiellt bekräftade siffrorna." },
        { title: "Kändislängder", desc: "Hämtade från officiella folkbokföringar och verifierade register utan gissningar." },
        { title: "Originalmaterial", desc: "Fiktiva karaktärer baseras på officiella produktionsböcker och skaparnas manualer." },
        { title: "Byggnader och djur", desc: "Byggnadshöjder är arkitektoniskt verifierade; djurmått avser mankhöjd (skuldran)." }
      ]
    },
    section7: {
      eyebrow: "Översikt",
      title: "Byggt för Enkelhet och Precision",
      description: "Allt du behöver för att jämföra längder med millimeterprecision och noll krångel.",
      thFeature: "Funktion",
      thFree: "Vad du får gratis",
      rows: [
        ["Personer per diagram", "Obegränsat — alla på samma proportionella axel"],
        ["Färdiga referenslängder", "2 696 profiler (1 294 kändisar, 1 138 karaktärer, 264 föremål)"],
        ["Måttenheter", "Centimeter, meter, fot och tum (omedelbar konvertering)"],
        ["Skalomfång", "Från några centimeter upp till 10 000 meter med automatisk zoom"],
        ["Export och delning", "Ladda ner skarp PNG och skapa delbara länkar (giltiga i 7 dagar)"],
        ["Kostnad och registrering", "0,00 kr för alltid — inga abonnemang och inget kort krävs"]
      ]
    },
    section8: {
      title: "Vanliga Frågor om Längdjämförelse",
      description: "Tydliga svar på vanliga funderingar kring proportioner, enheter och källor",
      badge: "HJÄLPCENTER"
    },
    section9: {
      eyebrow: "Resurser",
      title: "Fler Längdkalkylatorer och Verktyg Online",
      launchTool: "Öppna verktyg",
      privacyTitle: "Dataskydd och Användarrättigheter",
      privacyText: "Vi säljer inte dina personuppgifter till tredje part. Enligt GDPR och gällande dataskyddslagar kan du när som helst begära radering av data. Läs vår ",
      privacyLink: "Integritetspolicy",
      privacyTextEnd: " eller kontakta oss. Vanlig användning av verktyget samlar inte in några personuppgifter.",
      cards: [
        {
          label: "Kalkylator för Längdskillnad",
          desc: "Exakt skillnad i cm och tum, procentskillnad och partabell.",
          badge: "Verktyg",
          href: "/height-difference-calculator"
        },
        {
          label: "Kalkylator för Längd- och Viktpercentil",
          desc: "Jämför dina mått mot WHO- och CDC-tillväxtkurvor efter ålder och kön.",
          badge: "Verktyg",
          href: "/height-weight-percentile-calculator"
        },
        {
          label: "Kalkylator för Idealisk Kroppsvikt",
          desc: "Devine-, Robinson- och Hamwi-formler med hälsosamma viktintervall.",
          badge: "Verktyg",
          href: "/ideal-body-weight-calculator"
        },
        {
          label: "Mät Längd från Foto",
          desc: "Räkna ut kroppslängd direkt från en bild utan måttband.",
          badge: "Verktyg",
          href: "/image-to-height"
        },
        {
          label: "Kalkylator för Barns Slutlängd",
          desc: "Uppskatta framtida vuxenlängd med den vetenskapliga Khamis-Roche-metoden.",
          badge: "Verktyg",
          href: "/height-predictor"
        }
      ]
    }
  },
  imageToHeight: {
    hero: {
      eyebrow: "Foto till längd",
      title: "Mät Din Längd Från ett Foto. ",
      titleAccent: "Helt Utan Måttband.",
      description: "Ladda upp en helkroppsbild med en dörr, ett A4-papper eller ett kreditkort i bild. Välj referensobjektet, ange dess verkliga storlek och dra en linje från golvet till hjässan. Få din exakta längd i centimeter och fot/tum med 1–2 cm felmarginal. Gratis, utan konto, på alla enheter.",
      badgeFree: "Gratis",
      badgeNoAccount: "Inget konto",
      badgePrivate: "Bilden stannar i webbläsaren",
      badgeUnits: "Svar i cm och ft/in",
      ctaUpload: "Ladda upp bild och mät nu",
      accuracyNotice: "Noggrannhet på 1–2 cm. 100 % privat. Bearbetas lokalt.",
      prepTitle: "Kontrollera tre saker före fotografering:",
      prep1: "Helkroppsbild där både fötter och golv syns tydligt.",
      prep2: "Stå mot samma vägg som referensobjektet.",
      prep3: "Håll telefonen rakt och i våg, ungefär i höfthöjd."
    },
    howItWorks: {
      eyebrow: "Fem enkla tryck, ett foto",
      title: "Så Fungerar Verktyget: Steg för Steg",
      description: "Ett fotografi innehåller sina egna måttproportioner när det innehåller ett objekt med känd storlek. Ange referensens mått så beräknar verktyget längden på alla i bilden.",
      stepPrefix: "Steg",
      steps: [
        {
          step: "01",
          title: "Ladda upp en helkroppsbild",
          desc: "Välj en bild där personen syns från topp till tå intill en dörr, ett A4-papper eller ett betalkort. Dörrkarmen är oftast det stabilaste valet."
        },
        {
          step: "02",
          title: "Beskär och bekräfta",
          desc: "Justera rutan så att både personen och referensobjektet syns tydligt, tryck sedan på 'Tillämpa beskärning'."
        },
        {
          step: "03",
          title: "Välj referensmått",
          desc: "Tryck på båda ändarna av dörren eller kortet. Välj Dörr (203 cm), Kreditkort (8,56 cm), A4-ark (29,7 cm), 1 meter eller ange ett eget mått."
        },
        {
          step: "04",
          title: "Markera fötter och huvud",
          desc: "Dra en rak linje från golvet vid fötterna till toppen av huvudet. Börja på golvet, inte skosulan. Eller använd automatisk AI-skanning."
        },
        {
          step: "05",
          title: "Läs av och spara måttet",
          desc: "Din längd visas direkt i centimeter och fot/tum. Tryck på 'Spara' för att behålla resultatet och jämföra med andra figurer."
        }
      ]
    },
    whatYouCanMeasure: {
      eyebrow: "Mer än bara din egen längd",
      title: "Vad Du Kan Mäta Med Hjälp av ett Foto",
      description: "Vilken person eller föremål som helst kan mätas, förutsatt att referensobjektet är på samma avstånd från kameran.",
      items: [
        {
          title: "Dig själv, helt utan hjälp",
          desc: "Placera mobilen i höfthöjd, ställ in självutlösaren och ställ dig vid en dörr eller ett A4-ark tejpat på väggen."
        },
        {
          title: "Barnens tillväxtkurva",
          desc: "Fota barnet vid samma dörr med några månaders mellanrum för att följa tillväxten. Kolla sedan in vår ",
          linkLabel: "kalkylator för vuxenlängd"
        },
        {
          title: "Personer på gamla fotografier",
          desc: "Familjefoton, idrottslag eller kändisbilder fungerar utmärkt om det finns ett standardobjekt i samma bildplan."
        },
        {
          title: "Möbler och dörröppningar",
          desc: "Fäst ett A4-ark vid en bokhylla eller ett kylskåp för att mäta höjden innan du köper eller flyttar möbler."
        },
        {
          title: "Träd, staket och grindar",
          desc: "Ställ dig bredvid och använd din egen kända längd som referens. Backa tills båda syns och håll mobilen vågrätt."
        }
      ],
      whyArTitle: "Varför använda ett foto istället för en AR-app?",
      why1Bold: "Mät gamla bilder:",
      why1Desc: " AR-appar mäter bara det du ser just nu. Med ett foto kan du mäta historiska bilder och gamla familjealbum.",
      why2Bold: "Ingen appinstallation:",
      why2Desc: " Fungerar direkt i din vanliga webbläsare på iOS, Android, Mac och PC utan att ladda ner något.",
      why3Bold: "Integritetssäkert:",
      why3Desc: " Bilden sparas lokalt i webbläsarens minne och laddas aldrig upp till någon extern server."
    },
    referenceObjects: {
      eyebrow: "Kalibrering",
      title: "Vilket Referensobjekt Bör Du Välja?",
      description: "Ju mer exakt och standardiserat referensobjektet är, desto mer tillförlitligt blir mätresultatet.",
      thObject: "Objekt",
      thSize: "Mått att ange",
      thStandard: "Standardmått?",
      thBestFor: "Bäst för",
      rows: [
        {
          object: "A4-papper (långsidan)",
          size: "29,7 cm",
          standard: "Ja, ISO 216",
          bestFor: "Upptejpat på väggen precis bredvid personen"
        },
        {
          object: "Kreditkort (långsidan)",
          size: "8,56 cm",
          standard: "Ja, ISO/IEC 7810",
          bestFor: "Närbilder. Zooma in och markera hörnen noggrant."
        },
        {
          object: "Standarddörr",
          size: "203 cm (vanlig)",
          standard: "Nej, varierar mellan byggnader",
          bestFor: "Helkroppsbilder efter att dörren kontrollmätts en gång"
        }
      ]
    },
    accuracy: {
      eyebrow: "Tester och precision",
      title: "Så Får Du en Exakt Mätning från ett Foto",
      description: "Att stå för långt framför objektet eller luta telefonen orsakar nästan alla fel. Håll mobilen i våg och stå mot väggen.",
      tiltLowTitle: "Lågt, vinklad uppåt",
      tiltLowBadge: "Överskattar",
      tiltLowDesc: "Toppen hamnar längre bort från linsen och ser mindre ut, vilket gör att personen beräknas för lång (+2,4 till +4,5 cm fel).",
      tiltLevelTitle: "I våg vid midjehöjd",
      tiltLevelBadge: "Optimalt resultat",
      tiltLevelDesc: "Mobilen är riktad vinkelrätt mot väggen, vilket bevarar perspektivet perfekt (0,0 cm mätfel).",
      tiltHighTitle: "Högt, vinklad nedåt",
      tiltHighBadge: "Underskattar",
      tiltHighDesc: "Golvet hamnar längre bort från linsen, vilket gör att personen beräknas för kort (−2,8 till −5,9 cm fel).",
      tableTitle: "Vårt kontrollerade jämförelsetest (14 miljöer)",
      tableDesc: "Vi testade 14 miljöer med kända höjder på 3,5 meters avstånd för att isolera vinkelfel från markörens precision.",
      thSetup: "Kameravinkel",
      thTrueHeight: "Verklig längd",
      thMeasured: "Uppmätt",
      thError: "Avvikelse",
      benchmarkRows: [
        {
          setup: "Mobil i våg på 60, 100 eller 130 cm, person mot vägg intill dörr",
          trueHeight: "172 cm",
          measured: "172,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Samma uppställning för barn på 120 cm och vuxen på 190 cm",
          trueHeight: "120, 190 cm",
          measured: "120,0, 190,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Mobil vinklad 10° uppåt från 60 cm",
          trueHeight: "172 cm",
          measured: "174,4 cm",
          error: "+2,4 cm"
        },
        {
          setup: "Mobil vinklad 20° uppåt från 40 cm",
          trueHeight: "172 cm",
          measured: "176,5 cm",
          error: "+4,5 cm"
        },
        {
          setup: "Mobil vinklad 10° nedåt från 160 cm",
          trueHeight: "172 cm",
          measured: "169,2 cm",
          error: "−2,8 cm"
        },
        {
          setup: "Mobil vinklad 20° nedåt från 180 cm",
          trueHeight: "172 cm",
          measured: "166,1 cm",
          error: "−5,9 cm"
        },
        {
          setup: "A4-ark som referens, mobil vinklad 10° uppåt",
          trueHeight: "172 cm",
          measured: "176,8 cm",
          error: "+4,8 cm"
        },
        {
          setup: "Person står 30 cm framför dörren",
          trueHeight: "172 cm",
          measured: "188,1 cm",
          error: "+16,1 cm"
        },
        {
          setup: "Person står 60 cm framför dörren",
          trueHeight: "172 cm",
          measured: "207,6 cm",
          error: "+35,6 cm"
        }
      ],
      pixelSensitivityBold: "Känslighet vid markering:",
      pixelSensitivityDesc: " Att missa med markören skapar avvikelser, särskilt vid små objekt. Ett missat klick med 1 pixel flyttar måttet med 1 cm vid en dörr, 7 cm vid ett A4 och 23 cm vid ett kort. Välj det största objektet och zooma in innan du trycker.",
      tips: [
        {
          title: "Luta inte mobilen",
          desc: "Perspektivlutning är den vanligaste felkällan. Håll telefonen rakt i midjehöjd och backa tills hela kroppen syns."
        },
        {
          title: "Objektets placering",
          desc: "Stå mot samma vägg som referensen, aldrig längre fram. Att kliva fram bara 30 cm gav 16 cm felaktig extrahöjd i testet."
        },
        {
          title: "Korrekt kroppshållning",
          desc: "Hälarna i golvet, rak rygg och blicken rakt fram. Dålig hållning i bilden ger exakt samma fel som vid en manuell mätning."
        },
        {
          title: "Hela kroppen synlig",
          desc: "Om fötter eller huvud skärs bort går det inte att mäta hela höjden. En skarp helbild ger bäst resultat."
        }
      ]
    },
    noTapeMethods: {
      eyebrow: "Alternativa metoder",
      title: "Hur Man Mäter Sin Längd Utan Måttband",
      description: "Fem beprövade metoder när du inte har tillgång till ett måttband eller en tumstock.",
      methods: [
        {
          id: "wall-a4",
          title: "Väggmärke och A4-papper",
          tags: ["Inbunden bok", "A4-papper", "Blyertspenna"],
          desc: "Märk din längd på väggen med en bok. Lägg långsidan av ett A4-ark (29,7 cm) från golvet och uppåt, markera och klättra upp till ditt märke. Multiplicera antalet ark med 29,7 cm och använd ett vikt ark (14,85 cm) för det sista steget."
        },
        {
          id: "door",
          title: "Dörrkarmmetoden",
          tags: ["En dörr"],
          desc: "Svenska standarddörrar är ofta 200–210 cm i karmöppning. Ställ dig under karmen och uppskatta avståndet till toppen av huvudet."
        },
        {
          id: "arm-span",
          title: "Armspännviddsmetoden",
          tags: ["En medhjälpare eller vägg"],
          desc: "Avståndet mellan dina långfingertoppar med armarna utsträckta motsvarar nästan exakt din kroppslängd (genomsnittlig avvikelse under 2,5 cm)."
        },
        {
          id: "phone",
          title: "Mätapp i mobilen",
          tags: ["En smartphone"],
          desc: "På kompatibla iPhones finns Apples Mät-app. Med andra telefoner tar du bara ett foto och använder vårt onlineverktyg."
        },
        {
          id: "dollar",
          title: "Sedelmetoden",
          tags: ["Sedlar"],
          desc: "Sedlar har fasta standardmått (svensk 100-lapp är 13,3 cm lång, 20-eurosedel är 13,3 cm). Du kan stapla dem vertikalt upp till ditt väggmärke."
        }
      ],
      footer: "Alla dessa metoder ger en rimlig uppskattning, men ett kalibrerat foto ger överlägset bäst och mest pålitligt resultat."
    },
    clinicMethod: {
      eyebrow: "Medicinsk standard",
      title: "Hur Man Mäter Längd med Precision: Den Kliniska Metoden",
      description: "Anpassad efter medicinska mätprotokoll (CDC-riktlinjer) för maximal noggrannhet i hemmiljö.",
      steps: [
        "Ta av skor, tjocka sockor, mössor och hårspännen och släpp ut höga frisyrer.",
        "Ställ dig på ett plant och hårt golv (parkett eller klinker, inte tjock matta) mot en slät vägg utan golvsockel.",
        "Fötterna ihop och platt mot golvet, raka ben, armarna längs sidorna och axlarna avslappnade.",
        "Hälarna, baksidan av huvudet, skulderbladen och rumpan ska vidröra väggen (beroende på kroppsbyggnad nuddar inte alla punkter samtidigt).",
        "Titta rakt framåt. För en inbunden bok eller vinkelhake i 90 graders vinkel mot väggen ner till hjässan och sätt ett litet blyertsmärke.",
        "Mät avståndet från golvet upp till märket med ett metallmåttband med millimeters precision. Saknas måttband, använd A4-papper eller vårt fotoverktyg."
      ],
      whyAloneTitle: "Varför Egenmätning Nästan Alltid Blir Felaktig",
      errorCauses: [
        {
          title: "Krokig hållning",
          desc: "Man böjer sig omedvetet framåt när man försöker balansera en bok på huvudet."
        },
        {
          title: "Lutande bok",
          desc: "Boken eller linjalen hålls inte i exakt 90 graders rät vinkel mot väggen."
        },
        {
          title: "Böjt måttband",
          desc: "Måttbandet buktar eller vinklas snett längs väggen under avläsningen."
        },
        {
          title: "Tid på dygnet",
          desc: "Ryggradens diskar pressas ihop under dagen, vilket gör dig upp till 1 cm kortare på kvällen än på morgonen."
        }
      ],
      whyAloneFooter: "Att göra allt själv är besvärligt: stå rakt, hålla boken och rita märket. Ett foto med ett referensobjekt eliminerar behovet av en hjälpreda."
    },
    faq: {
      badge: "HJÄLPCENTER",
      title: "Vanliga Frågor",
      items: [
        {
          id: "how-accurate-is-height-measurement-from-a-photo",
          q: "Hur exakt är mätning av längd från ett fotografi?",
          a: "Det beror på bilden. I kontrollerade tester i 14 miljöer gav en mobil i våg med personen mot väggen exakt samma mått som ett medicinskt mätband. Att luta kameran 10–20° gav 2–6 cm fel, och att stå 30 cm framför dörren lade till 16 cm. Med en bra bild är felet normalt 1–2 cm."
        },
        {
          id: "what-is-the-best-object-to-use-for-calibration",
          q: "Vilket är det bästa objektet att kalibrera med?",
          a: "Ett A4-papper (29,7 cm) eller ett kreditkort (8,56 cm) är ISO-standardiserade och exakta överallt. En standarddörr (ofta 203 cm) fungerar utmärkt för helkroppsbilder efter att du mätt karmen en gång."
        },
        {
          id: "is-my-photo-uploaded-or-stored",
          q: "Laddas mitt foto upp eller sparas på era servrar?",
          a: "Nej. All bildbehandling sker lokalt i din egen webbläsare. Bilden lämnar aldrig din telefon eller dator."
        },
        {
          id: "can-i-measure-someone-elses-height-from-a-photo",
          q: "Kan jag mäta någon annans längd från ett foto?",
          a: "Ja. Ladda bara upp en bild där personen står intill ett referensobjekt med känd storlek, kalibrera och dra linjen även om personen inte är närvarande."
        },
        {
          id: "does-it-work-for-celebrities",
          q: "Fungerar det även på kändisar?",
          a: "Ja, om kändisen fotograferats rakt framifrån bredvid en dörrkarm eller annat objekt med känd standardstorlek."
        },
        {
          id: "why-do-i-measure-taller-in-the-morning",
          q: "Varför är man längre på morgonen?",
          a: "Ryggradens broskdiskar trycks ihop under dagen på grund av kroppsvikten, vilket kan minska din längd med upp till en centimeter mot kvällen."
        },
        {
          id: "do-i-need-an-account",
          q: "Måste jag skapa ett konto?",
          a: "Nej. Verktyget är helt gratis, kräver ingen registrering och fungerar i alla moderna webbläsare."
        }
      ]
    },
    tool: {
      step1Calibration: "Steg 1: Kalibrering",
      step2Measure: "Steg 2: Mät person",
      tapOtherEnd: "Tryck på den andra änden för att slutföra",
      drawCalibLine: "Dra en kalibreringslinje genom att trycka på skärmen",
      drawMeasLine: "Klicka på 'Auto Scan' eller dra en linje från topp till tå",
      cancel: "Avbryt",
      done: "Klar"
    }
  },
  heightDifference: {
    intro: {
      title: "Kalkylator för Längdskillnad",
      description: "Kalkylatorn för längdskillnad drar den kortare längden från den längre och visar skillnaden i centimeter och tum. Den visar även procentskillnaden och vem som är längst. Ange längder i cm eller fot och tum. Kalkylatorn är gratis, kräver inget konto och uppdateras medan du skriver.",
      heroCtaButton: "Beräkna längdskillnad nu",
      heroBadgeFree: "Gratis och obegränsat",
      heroBadgeNoSignup: "Inget konto krävs",
      heroBadgeUnits: "Metriskt och imperiellt"
    },
    calculateSection: {
      title: "Beräkna Längdskillnad",
      description: "Mata in längd för Person 1 och Person 2, och välj sedan Metriskt (cm) eller Imperiellt (ft/in). Kalkylatorn visar avståndet, procentskillnaden och vem som är längst direkt under rutorna. Den jämför två längder åt gången och fungerar på alla enheter."
    },
    howToCalculate: {
      title: "Hur Man Beräknar Längdskillnad",
      p1: "Längdskillnaden är den längre personen minus den kortare personen. Kalkylatorn hittar automatiskt den längre personen först, så resultatet blir alltid ett positivt tal. Ordningsföljden du anger måtten i spelar ingen roll.",
      formulaTitle: "Formel för längdskillnad",
      formulaText: "Längdskillnad = Längre Längd − Kortare Längd",
      personALabel: "Alex",
      personAValue: "180 cm",
      personBLabel: "Ben",
      personBValue: "165 cm",
      differenceLabel: "Skillnad",
      differenceValue: "180 − 165 = 15 cm",
      p2: "Fot och tum följer samma princip efter ett enkelt steg. Omvandla båda måtten till tum och subtrahera sedan. 5'10\" motsvarar 70 tum och 5'3\" är 63 tum, vilket ger en skillnad på 7 tum (17,8 cm)."
    },
    percentage: {
      title: "Längdskillnad i Procent",
      p1: "Procentskillnaden uttrycker avståndet som en andel av den längre personens längd. Råmåttet i centimeter anger det fysiska avståndet, medan procenttalet visar hur stor skillnaden är i förhållande till personerna.",
      formulaTitle: "Formel för procentskillnad",
      formulaText: "Procentskillnad = (Längdskillnad ÷ Längre Längd) × 100",
      heightDiffLabel: "Längdskillnad",
      heightDiffValue: "15 cm",
      tallerHeightLabel: "Längre person",
      tallerHeightValue: "180 cm",
      calculationLabel: "Uträkning",
      calculationValue: "(15 ÷ 180) × 100",
      percentDiffLabel: "Procentskillnad",
      percentDiffValue: "8,3 %",
      p2: "Person B är 8,3 % kortare än Person A. Kalkylatorn visar detta procenttal bredvid avståndet i centimeter. Båda värdena uppdateras direkt när du ändrar en siffra.",
      p3: "Vilket basmått du delar med förändrar resultatet. Denna kalkylator delar med den längre längden och anger hur mycket kortare Person B är. Delar du med den kortare längden får du hur mycket längre Person A är: 15 ÷ 165 × 100 = 9,1 %. Båda beskriver samma gap på 15 cm.",
      duoShorterLabel: "I förhållande till den kortare personen",
      duoShorterValue: "9,1 % längre",
      duoShorterEq: "(15 ÷ 165) × 100 = 9,09 %",
      duoTallerLabel: "I förhållande till den längre personen",
      duoTallerValue: "8,3 % kortare",
      duoTallerEq: "(15 ÷ 180) × 100 = 8,33 %",
      p4: "Samma skillnad i cm motsvarar en lägre procentandel ju längre personerna är. Ett gap på 10 cm är 6,3 % när den längre är 160 cm, men bara 5,3 % när den längre är 190 cm."
    },
    couple: {
      title: "Kalkylator för Längdskillnad i Par",
      p1: "En parkalkylator mäter längdskillnaden mellan två partners. Par använder den för att se hur deras skillnad förhåller sig till verkliga befolkningsdata. Verktyget fungerar på samma sätt för vilka två personer som helst.",
      statAvgGapLabel: "Genomsnittlig skillnad, brittiska par",
      statAvgGapValue: "14,1 cm",
      statAvgGapSub: "5,6 tum",
      statAvgGapSampleSize: "12 502 par",
      statManTallerLabel: "Mannen längre",
      statManTallerValue: "92,5 %",
      statManTallerSub: "av paren i undersökningen",
      p2: "En brittisk studie på 12 502 par visade att mannen var längre i 92,5 % av fallen. Den genomsnittliga skillnaden var 14,1 cm (5,6 tum). Par där kvinnan var längre eller där mannen var över 25 cm längre förekom mer sällan än slumpen förutspår.",
      distTableCaption: "Fördelning av par efter längdskillnad",
      tableHeaderGap: "Mannen längre med",
      tableHeaderShare: "Andel av par",
      tableHeaderBar: "Grafik",
      bandWomanTaller: "Kvinnan längre",
      band0to5: "0 till 5 cm",
      band5to10: "5 till 10 cm",
      band10to15: "10 till 15 cm",
      band15to20: "15 till 20 cm",
      band20to25: "20 till 25 cm",
      band25to30: "25 till 30 cm",
      bandOver30: "Över 30 cm",
      tableSource: "Källa: Stulp et al. (2013), föräldrar i UK Millennium Cohort Study.",
      p3: "Skillnader mellan 10 och 20 cm omfattade cirka 42 % av paren i studien.",
      coupleCardChipsLabel: "Exempelpar",
      coupleLine: "Partner 1 ({h1} cm) är <strong>{gap} cm längre</strong> än Partner 2 ({h2} cm). Skillnaden motsvarar {pct} % av längden för Partner 1.",
      coupleBandText: "En skillnad på {gap} cm hamnar i gruppen \"{band}\", som omfattar cirka {share} % av paren i studien."
    },
    chartSection: {
      title: "Jämförelsetabell för Längdskillnader",
      p1: "Vår tabell visar vanliga längdkombinationer, skillnaden i centimeter och tum samt den relativa procentuella avvikelsen.",
      p2: "Använd den för att snabbt slå upp skillnader mellan vänner, familjemedlemmar eller partners.",
      calloutPrefix: "Vill du jämföra tre eller fler personer sida vid sida i skalenlig grafik? Prova vår ",
      calloutLink: "Längdjämförelse Kalkylator",
      calloutSuffix: " med stöd för upp till tio figurer samtidigt."
    },
    unitsSection: {
      title: "Längdskillnad i Olika Enheter",
      p1: "Kalkylatorn stöder både metriska och imperiella mått. Här ser du hur olika vanliga längdskillnader ser ut i båda enhetssystemen.",
      subheadFtIn: "Längdskillnad i fot och tum",
      table1HeaderPersonA: "Person A",
      table1HeaderPersonB: "Person B",
      table1HeaderDiffIn: "Skillnad (tum)",
      table1HeaderDiffCm: "Skillnad (cm)",
      table1HeaderPercent: "% Skillnad",
      subheadCm: "Längdskillnad i centimeter",
      table2HeaderDiffCm: "Längdskillnad (cm)",
      table2HeaderInInches: "I tum",
      table2HeaderExamplePair: "Exempelpar",
      table2HeaderPercent: "% Skillnad"
    },
    cta: {
      title: "Redo att Testa Längdskillnadskalkylatorn?",
      descriptionLine1: "Mata in två längder och få avståndet i centimeter och tum, procentuell skillnad och parklassificering direkt.",
      descriptionLine2: "Verktyget är helt gratis, fungerar i alla webbläsare och kräver ingen registrering.",
      feature1: "Omedelbar beräkning i realtid",
      feature2: "Procentskillnad och visuell stapel",
      feature3: "Stöd för cm och fot/tum",
      feature4: "100 % gratis utan konto",
      buttonText: "Rulla upp och beräkna nu ↑"
    },
    faq: [
      {
        q: "Vad är en normal längdskillnad i ett par?",
        a: "Det finns inget fast standardmått. I en stor brittisk studie på 12 502 par var mannen i genomsnitt 14,1 cm (5,6 tum) längre. Cirka 42 % av alla par hade en skillnad mellan 10 och 20 cm. Vår parkalkylator låter dig visualisera alla kombinationer."
      },
      {
        q: "Hur beräknar man längdskillnaden?",
        a: "Subtrahera den kortare längden från den längre: Längdskillnad = Längre Längd − Kortare Längd. Vid 180 cm och 165 cm är skillnaden 15 cm. För procentandel delar man 15 med 180 och multiplicerar med 100 (8,3 %)."
      },
      {
        q: "Visar kalkylatorn även procentskillnad?",
        a: "Ja. Den visar både det fysiska avståndet i cm och tum samt procentskillnaden i förhållande till den längre personen, och uppdateras i realtid."
      },
      {
        q: "Är \"procent längre\" samma sak som \"procent kortare\"?",
        a: "Nej. \"Procent kortare\" delar skillnaden med den längre längden (15 ÷ 180 = 8,3 %). \"Procent längre\" delar skillnaden med den kortare längden (15 ÷ 165 = 9,1 %). Båda siffrorna beskriver samma skillnad på 15 cm."
      },
      {
        q: "Vilka måttenheter kan användas i verktyget?",
        a: "Kalkylatorn stöder centimeter samt fot och tum. När du byter enhet räknas både inmatade värden och resultatet om direkt."
      }
    ],
    toc: [
      { id: "calculate-height-difference", label: "Beräkna längdskillnad" },
      { id: "how-to-calculate-height-difference", label: "Hur man beräknar längdskillnad" },
      { id: "height-difference-percentage", label: "Längdskillnad i procent" },
      { id: "couple-height-difference-calculator", label: "Kalkylator för par" },
      { id: "height-difference-chart", label: "Jämförelsetabell" },
      { id: "height-difference-in-different-units", label: "Skillnad i olika enheter" },
      { id: "try-the-height-difference-calculator", label: "Testa kalkylatorn" },
      { id: "frequently-asked-questions", label: "Vanliga frågor" },
      { id: "references", label: "Källor" }
    ],
    references: {
      title: "Källor",
      ref1: "Stulp G, Buunk AP, Pollet TV, Nettle D, Verhulst S (2013). Are Human Mating Preferences with Respect to Height Reflected in Actual Pairings? PLOS ONE 8(1): e54186.",
      ref1Url: "https://doi.org/10.1371/journal.pone.0054186",
      ref2: "Stulp G, Buunk AP, Pollet TV (2013). Women want taller men more than men want shorter women. Personality and Individual Differences.",
      ref2Url: "https://tvpollet.github.io/pdfs/Stulp_et_al_2013_PAID.pdf"
    },
    tool: {
      cardHeaderTitle: "Ange två längder",
      cardHeaderSub: "Resultaten uppdateras medan du skriver",
      unitMetric: "Metriskt (cm)",
      unitImperial: "Imperiellt (ft/in)",
      person1Label: "Person 1",
      person2Label: "Person 2",
      swapButtonLabel: "Växla Person 1 och Person 2",
      swapButtonTitle: "Byt plats på längder",
      cmPlaceholder: "t.ex. 180",
      cmPlaceholder2: "t.ex. 165",
      ftLabel: "FT",
      inLabel: "IN",
      hintText: "Ange en längd i varje ruta. Använd knappen ovan för att växla till fot och tum.",
      heightDifferenceLabel: "Längdskillnad",
      percentDifferenceLabel: "% Skillnad",
      tallerPersonLabel: "Längre person",
      gapGraphicLabel: "Höjdavstånd",
      badgeFree: "Gratis",
      badgeNoAccount: "Inget konto krävs",
      badgeSupportsUnits: "Stöder cm och ft/in",
      badgeUpdatesLive: "Uppdateras i realtid",
      noDifferenceText: "Ingen skillnad",
      personShorterText: "{person} är {pct} % kortare",
      sameHeightText: "Samma längd"
    },
    coupleCalc: {
      chipsLabel: "Exempelpar",
      partner1Label: "Partner 1",
      partner2Label: "Partner 2",
      coupleLine: "Partner 1 ({h1} cm) är <strong>{gap} cm längre</strong> än Partner 2 ({h2} cm). Skillnaden motsvarar {pct} % av längden för Partner 1.",
      coupleBandText: "En skillnad på {gap} cm hamnar i gruppen \"{band}\", som omfattar cirka {share} % av paren i studien.",
      bandWomanTaller: "kvinnan längre",
      band0to5: "0 till 5 cm",
      band5to10: "5 till 10 cm",
      band10to15: "10 till 15 cm",
      band15to20: "15 till 20 cm",
      band20to25: "20 till 25 cm",
      band25to30: "25 till 30 cm",
      bandOver30: "över 30 cm"
    },
    chartTable: {
      headerPersonA: "Person A",
      headerPersonB: "Person B",
      headerDifference: "Skillnad",
      headerPercentDifference: "% Skillnad"
    }
  }
};

// ==========================================
// POLISH (pl)
// ==========================================
const plData = {
  home: {
    intro: {
      h1: "Kalkulator Porównania Wzrostu: Porównaj Wzrost Online na Wizualnym Wykresie",
      p: "Skorzystaj z tego narzędzia do porównywania wzrostu, aby zestawić sylwetki obok siebie na wykresie w rzeczywistej skali. Wpisz dowolny wzrost w centymetrach lub stopach i calach, aby natychmiast zobaczyć różnicę. Narzędzie oferuje wizualne porównanie z zachowaniem precyzyjnych proporcji. Wykres aktualizuje się na żywo i precyzyjnie skaluje każdą postać.",
      freeLibraryBadge: "Darmowa Baza Online",
      freeLibraryDesc: "Uzyskaj dostęp do bazy gotowych sylwetek referencyjnych w trzech kolekcjach, twórz nieograniczone zestawienia i pobieraj wykresy PNG w wysokiej rozdzielczości.",
      noAccounts: "Bez rejestracji",
      noPayments: "Bez opłat",
      free100: "100% Za darmo",
      compareNowCta: "Porównaj teraz ↑"
    },
    section1: {
      eyebrow: "Jak to działa",
      title: "Jak Działa Wykres Porównania Wzrostu?",
      p1: "Wykres porównania wzrostu przekształca liczby na przeskalowany diagram, w którym każda sylwetka zachowuje dokładne proporcje geometryczne w skali rzeczywistej.",
      p2: "Jeśli Osoba A ma 170 cm, a Osoba B 185 cm, druga postać jest renderowana jako dokładnie 1,09 wysokości pierwszej. Różnica 10 cm przy wzroście 160 cm wygląda proporcjonalnie inaczej niż przy 190 cm — wykres natychmiast to uwidacznia bez żmudnych obliczeń.",
      p3: "Idealne rozwiązanie dla par, rodzin, drużyn sportowych i projektów artystycznych.",
      imgAlt: "Wykres porównania wzrostu między osobą o wzroście 170 cm i 185 cm obok siebie",
      imgCaption: "Alex o wzroście 170 cm (5'7\") i Ben o wzroście 185 cm (6'1\"), narysowani w skali.",
      needGapTitle: "Potrzebujesz tylko dokładnego wyliczenia różnicy?",
      needGapDesc: "Kalkulator Różnicy Wzrostu pokazuje dokładną różnicę w cm i calach, różnicę procentową oraz wykres słupkowy. Idealny do szybkich obliczeń numerycznych.",
      needGapCta: "Otwórz Kalkulator Różnicy Wzrostu"
    },
    section2: {
      eyebrow: "Krok po kroku",
      title: "Jak Porównać Wzrost Online: Przewodnik dla Początkujących",
      step1Title: "Krok 1: Wybierz, kogo chcesz porównać",
      step1Desc: "Wybierz kogo zestawić: dwoje znajomych, siebie z celebrytą, postacie z anime lub znane budowle. Działa w cm oraz stopach/calach z natychmiastowym przeliczaniem.",
      guidebookNoteLabel: "Informacja z oficjalnych źródeł:",
      guidebookNoteText: "Przeszukaj bazę gwiazd lub odkryj bohaterów fikcyjnych. Wszystkie wymiary pochodzą z oficjalnych przewodników i zweryfikowanych kart produkcji.",
      panelPeople: "Ludzie",
      panelCelebrities: "Celebryci",
      panelCharacters: "Postacie fikcyjne",
      panelObjects: "Obiekty i budowle",
      step2Title: "Krok 2: Zbuduj swój wykres wzrostu",
      step2Desc: "Wprowadź imiona, kolory i wymiary. System skaluje obiekty aż do 10 000 metrów (32 808 stóp), co pozwala zestawić człowieka z Wieżą Eiffla czy Mount Everestem.",
      panels: [
        { label: "Dodaj osobę", desc: "Imię, płeć, wzrost w cm lub ft/in oraz dowolny kolor sylwetki." },
        { label: "Celebryci", desc: "Sportowcy, aktorzy i postacie historyczne z całego świata." },
        { label: "Postacie fikcyjne", desc: "Bohaterowie anime, komiksów i gier z autoryzowanych databooków." },
        { label: "Obiekty i natura", desc: "Zwierzęta, słynne monumenty architektury i szczyty górskie." }
      ],
      step3Title: "Krok 3: Zobacz różnicę i podziel się",
      step3Desc: "Każda sylwetka zawiera podpis z imieniem i wzrostem. Różnica jest widoczna na pierwszy rzut oka. Pobierz plik PNG lub udostępnij bezpośredni link aktywny przez 7 dni."
    },
    section3: {
      eyebrow: "Dlaczego warto",
      title: "Dlaczego Wizualny Wykres Pokazuje Więcej Niż Same Liczby",
      description: "Wizualne zestawienie przedstawia zależności matematyczne w realnych proporcjach, dzięki czemu różnica wzrostu staje się natychmiast czytelna.",
      card1Title: "Skala proporcjonalna ujawnia to, co kryją liczby",
      card1Desc: "Różnica 12 cm przy wzroście 160 cm stanowi proporcjonalnie większą część sylwetki niż przy 190 cm. Nasze słupki od razu to obrazują. Aby poznać wyliczenia, sprawdź ",
      card1Link: "Kalkulator Różnicy Wzrostu",
      card2Title: "Porównaj się z kimkolwiek lub czymkolwiek",
      card2Desc: "Wpisz swój wzrost i stań obok ulubionego aktora lub drapacza chmur na wspólnej linii bazowej.",
      card3Title: "Porównanie postaci dla ilustratorów i pisarzy",
      card3Desc: "Artyści i autorzy mogą z łatwością ustalić właściwe proporcje między bohaterami według oficjalnych wytycznych.",
      card4Title: "Brak konieczności ręcznych przeliczeń",
      card4Desc: "Wpisuj w cm lub ft/in. Różnice, procenty i skale wyliczają się na bieżąco podczas wpisywania danych.",
      card5Title: "Prawdziwa skala daje ludzką perspektywę",
      card5Desc: "Zobacz postać o wzroście 175 cm przy Mount Evereście (8 848 m), by docenić potęgę natury w skali 1:1.",
      card6Title: "Eksport jednym kliknięciem",
      card6Desc: "Pobieraj wyraźne pliki PNG w wysokiej rozdzielczości lub generuj linki na fora i do mediów społecznościowych."
    },
    section4: {
      eyebrow: "Przykłady z życia",
      title: "Porównywanie Wzrostu: Codzienne Sytuacje i Przykłady",
      description: "Prawdziwe sytuacje, w których przeskalowany wykres daje natychmiastową jasność przewyższającą same liczby.",
      useCases: [
        {
          tag: "PARY I PRZYJACIELE",
          quote: "„Czekaj, o ile dokładnie jesteś ode mnie wyższy?”",
          desc: "Wpisz oba wymiary i zobacz dokładny odstęp. Różnica 10 cm jest widoczna od pierwszego spojrzenia.",
          try: "165 CM + 178 CM · RÓŻNICA 13 CM (7,9%)"
        },
        {
          tag: "SPORT I ZAWODNICY",
          quote: "„Kto naprawdę ma przewagę zasięgu na boisku?”",
          desc: "Porównaj koszykarzy NBA i innych sportowców, by ocenić przewagę wzrostu i zasięgu ramion.",
          try: "GRACZ NBA 200 CM · ZAWODNIK NFL 188 CM · WSPINACZ 174 CM"
        },
        {
          tag: "ANIME I FANDOM",
          quote: "„Wiki podaje liczby, ale jak oni wyglądają stojąc obok siebie?”",
          desc: "Postacie anime w realnej skali: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) i Levi (160 cm).",
          try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
        },
        {
          tag: "OBIEKTY I ZABYTKI",
          quote: "„Nie miałem pojęcia, że to jest aż tak ogromne w rzeczywistości.”",
          desc: "Postaw człowieka obok wodospadu Salto Angel (979 m), standardowych drzwi (203 cm) lub sufitu w pokoju.",
          try: "CZŁOWIEK 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8 848 M"
        },
        {
          tag: "JA KONTRA CELEBRYCI",
          quote: "„Czy naprawdę jestem dokładnie tego samego wzrostu?”",
          desc: "Porównaj się z gwiazdami takimi jak Tom Cruise, Dwayne Johnson czy Taylor Swift w oparciu o rzetelne źródła.",
          try: "TY + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
        },
        {
          tag: "WNĘTRZA I MEBLE",
          quote: "„Czy ten mebel na pewno zmieści się w moim pokoju?”",
          desc: "Umieść futrynę drzwi lub wysokość sufitu obok sylwetki człowieka przed zakupem wyposażenia domu.",
          try: "CZŁOWIEK 185 CM · DRZWI STANDARDOWE 203 CM · SUFIT 260 CM"
        }
      ],
      tableTitle: "Tabela różnic wzrostu w stopach, calach i centymetrach",
      tableDesc: "Siedem codziennych sytuacji ilustrujących porównanie par i osób w stopach, calach, centymetrach i procentach."
    },
    section5: {
      eyebrow: "Zalety",
      title: "Dlaczego Warto Wybrać Nasz Kalkulator Porównania Wzrostu?",
      description: "Kompleksowe możliwości. Błyskawiczne działanie. Bez rejestracji.",
      features: [
        { title: "Błyskawiczne odświeżanie", desc: "Wykres przelicza się w czasie rzeczywistym podczas pisania, bez przeładowywania strony." },
        { title: "Personalizowane sylwetki", desc: "Sześć wyrazistych kolorów oraz sylwetki męskie i żeńskie pozwalają odróżnić ponad 10 postaci." },
        { title: "Baza celebrytów", desc: "1 294 zweryfikowane sylwetki sportowców, aktorów i wybitnych postaci historycznych." },
        { title: "Postacie fikcyjne", desc: "1 138 postaci z anime, komiksów i gier zgodnie z kanonicznymi źródłami." },
        { title: "Obiekty i budowle", desc: "264 realne odniesienia ze świata zwierząt, drapaczy chmur i szczytów górskich." },
        { title: "Pomiar ze zdjęcia", desc: "Wgraj własną fotografię i umieść postać na wykresie z zachowaniem skali." },
        { title: "Czysty eksport PNG", desc: "Pobieraj ostre pliki graficzne bez znaków wodnych i bez limitów." },
        { title: "Linki do udostępniania", desc: "Generuj bezpośredni link do swojego zestawienia, aktywny przez 7 dni bez logowania." }
      ]
    },
    section6: {
      eyebrow: "Wiarygodność",
      title: "Jak Dokładny Jest Nasz Wykres Porównania Wzrostu?",
      items: [
        { title: "Silnik renderujący 1:1", desc: "Każda sylwetka idealnie odzwierciedla wartość liczbową: 170 cm to dokładnie 170,00 jednostek na osi." },
        { title: "Ujednolicone źródła", desc: "Gdy dane publiczne się różnią, przyjmujemy najnowsze oficjalnie potwierdzone wymiary." },
        { title: "Wzrost gwiazd", desc: "Pochodzi z oficjalnych rejestrów, danych paszportowych i wiarygodnych biografii, bez zgadywania." },
        { title: "Materiały kanoniczne", desc: "Wymiary postaci fikcyjnych opierają się na oficjalnych książkach produkcyjnych i databookach." },
        { title: "Budynki i zwierzęta", desc: "Wysokości budowli opierają się na dokumentacji architektonicznej; u zwierząt podajemy wysokość w kłębie." }
      ]
    },
    section7: {
      eyebrow: "Zestawienie",
      title: "Stworzony z Myślą o Prostocie i Precyzji",
      description: "Wszystko, czego potrzebujesz do porównywania wzrostu z milimetrową dokładnością i bez zbędnych barier.",
      thFeature: "Funkcja",
      thFree: "Co otrzymujesz bezpłatnie",
      rows: [
        ["Liczba osób na wykresie", "Bez limitu — wszystkie na jednej proporcjonalnej osi"],
        ["Gotowe sylwetki w bazie", "2 696 profili (1 294 celebrytów, 1 138 postaci, 264 obiekty)"],
        ["Jednostki miar", "Centymetry, metry, stopy i cale (natychmiastowa konwersja)"],
        ["Zakres skali", "Od kilku centymetrów do 10 000 metrów z automatycznym zoomem"],
        ["Opcje zapisu", "Pobieranie plików PNG w jakości HD oraz linki do udostępniania (7 dni)"],
        ["Koszty i logowanie", "0 zł na zawsze — bez subskrypcji i bez podawania karty"]
      ]
    },
    section8: {
      title: "Często Zadawane Pytania o Porównywanie Wzrostu",
      description: "Rzetelne odpowiedzi na najczęstsze pytania dotyczące proporcji, jednostek i wiarygodności danych",
      badge: "CENTRUM POMOCY"
    },
    section9: {
      eyebrow: "Narzędzia",
      title: "Więcej Narzędzi i Kalkulatorów Wzrostu Online",
      launchTool: "Uruchom narzędzie",
      privacyTitle: "Ochrona Danych i Prawa Użytkownika",
      privacyText: "Nie sprzedajemy Twoich danych osobowych podmiotom trzecim. Zgodnie z RODO możesz w każdej chwili zażądać usunięcia swoich danych. Zobacz naszą ",
      privacyLink: "Politykę Prywatności",
      privacyTextEnd: " lub skontaktuj się z nami. Zwykłe korzystanie z narzędzia nie gromadzi danych osobowych.",
      cards: [
        {
          label: "Kalkulator Różnicy Wzrostu",
          desc: "Dokładna różnica w cm i calach, ujęcie procentowe oraz statystyki dla par.",
          badge: "Narzędzie",
          href: "/height-difference-calculator"
        },
        {
          label: "Kalkulator Percentyli Wzrostu i Wagi",
          desc: "Porównaj swoje wymiary z siatkami centylowymi WHO i CDC według wieku i płci.",
          badge: "Narzędzie",
          href: "/height-weight-percentile-calculator"
        },
        {
          label: "Kalkulator Należnej Masy Ciała",
          desc: "Wzory Devine'a, Robinsona i Hamwiego wraz ze zdrowymi przedziałami wagi.",
          badge: "Narzędzie",
          href: "/ideal-body-weight-calculator"
        },
        {
          label: "Pomiar Wzrostu ze Zdjęcia",
          desc: "Zmierz wzrost bezpośrednio z fotografii bez użycia taśmy mierniczej.",
          badge: "Narzędzie",
          href: "/image-to-height"
        },
        {
          label: "Kalkulator Wzrostu Dziecka",
          desc: "Oszacuj przyszły wzrost dorosły dziecka sprawdzoną metodą Khamis-Roche.",
          badge: "Narzędzie",
          href: "/height-predictor"
        }
      ]
    }
  },
  imageToHeight: {
    hero: {
      eyebrow: "Zdjęcie na wzrost",
      title: "Zmierz Swój Wzrost ze Zdjęcia. ",
      titleAccent: "Bez Użycia Centymetra.",
      description: "Wgraj zdjęcie całej sylwetki z drzwiami, kartką A4 lub kartą płatniczą w kadrze. Wybierz obiekt odniesienia, podaj jego rzeczywisty wymiar i przeciągnij linię od podłogi do czubka głowy. Poznaj swój wzrost w centymetrach oraz stopach/calach z dokładnością do 1–2 cm. Bezpłatnie, bez konta, na każdym urządzeniu.",
      badgeFree: "Za darmo",
      badgeNoAccount: "Bez konta",
      badgePrivate: "Zdjęcie nie opuszcza przeglądarki",
      badgeUnits: "Wyniki w cm i ft/in",
      ctaUpload: "Wgraj zdjęcie i zmierz teraz",
      accuracyNotice: "Dokładność 1–2 cm. 100% prywatności. Przetwarzanie lokalne.",
      prepTitle: "Zwróć uwagę na 3 zasady przed zrobieniem zdjęcia:",
      prep1: "Cała sylwetka w kadrze, od stóp do głowy wraz z widoczną podłogą.",
      prep2: "Stój bezpośrednio przy tej samej ścianie, na której znajduje się obiekt referencyjny.",
      prep3: "Trzymaj telefon prosto i poziomo, mniej więcej na wysokości pasa."
    },
    howItWorks: {
      eyebrow: "Pięć kliknięć, jedno zdjęcie",
      title: "Jak Działa Narzędzie: Krok po Kroku",
      description: "Fotografia zawiera w sobie proporcje geometryczne, o ile znajduje się na niej obiekt o znanym wymiarze. Wskaż ten wymiar, a narzędzie obliczy wzrost każdego na zdjęciu.",
      stepPrefix: "Krok",
      steps: [
        {
          step: "01",
          title: "Wgraj zdjęcie całej sylwetki",
          desc: "Wybierz ujęcie, na którym widać całą postać obok drzwi, kartki A4 lub karty płatniczej. Futryna drzwi jest najbardziej stabilnym punktem odniesienia."
        },
        {
          step: "02",
          title: "Wykadruj i potwierdź",
          desc: "Dopasuj ramkę, aby wyraźnie objąć postać oraz obiekt referencyjny, a następnie kliknij 'Zastosuj kadrowanie'."
        },
        {
          step: "03",
          title: "Wybierz wymiar odniesienia",
          desc: "Zaznacz oba końce drzwi lub karty. Wybierz Drzwi (203 cm), Kartę płatniczą (8,56 cm), Kartkę A4 (29,7 cm), 1 metr lub wpisz własny wymiar."
        },
        {
          step: "04",
          title: "Zaznacz stopy i czubek głowy",
          desc: "Poprowadź linię od podłogi pod stopami do czubka głowy. Zacznij od podłoża, nie od podeszwy. Możesz też wybrać automatyczne skanowanie AI."
        },
        {
          step: "05",
          title: "Odczytaj i zapisz wynik",
          desc: "Twój wzrost pojawi się w centymetrach oraz stopach i calach. Kliknij 'Zapisz', aby zachować wynik i porównać go z innymi sylwetkami."
        }
      ]
    },
    whatYouCanMeasure: {
      eyebrow: "Więcej niż tylko własny wzrost",
      title: "Co Możesz Zmierzyć za Pomocą Zdjęcia",
      description: "Możesz zmierzyć dowolną osobę lub przedmiot pod warunkiem, że obiekt odniesienia znajduje się w tej samej odległości od aparatu.",
      items: [
        {
          title: "Samego siebie bez pomocy innych",
          desc: "Ustaw telefon na wysokości pasa, włącz samowyzwalacz i stań obok drzwi lub kartki A4 przyklejonej do ściany."
        },
        {
          title: "Wzrost rosnących dzieci",
          desc: "Rób dziecku zdjęcie przy tych samych drzwiach co kilka miesięcy i śledź jego rozwój. Następnie sprawdź nasz ",
          linkLabel: "kalkulator prognozy wzrostu dorosłego"
        },
        {
          title: "Osoby na archiwalnych fotografiach",
          desc: "Zdjęcia rodzinne, drużyn sportowych czy gwiazd świetnie się nadają, jeśli w kadrze widać jakikolwiek standardowy obiekt."
        },
        {
          title: "Meble i wnęki ścienne",
          desc: "Przyklej kartkę A4 taśmą do regału lub lodówki, aby sprawdzić wymiary przed zakupem lub przeprowadzką."
        },
        {
          title: "Drzewa, płoty i bramy",
          desc: "Stań obok obiektu i wpisz własny znany wzrost jako odniesienie. Odejdź tak, by objąć całość, trzymając telefon pionowo."
        }
      ],
      whyArTitle: "Dlaczego zdjęcie zamiast aplikacji AR w telefonie?",
      why1Bold: "Pomiary starych zdjęć:",
      why1Desc: " Aplikacje AR mierzą tylko to, co masz przed sobą w tej chwili. Ze zdjęciem możesz zmierzyć kadry historyczne i albumy rodzinne.",
      why2Bold: "Bez instalacji programów:",
      why2Desc: " Działa bezpośrednio w przeglądarce na iOS, Androidzie, Macu i PC bez pobierania aplikacji.",
      why3Bold: "Prywatność i bezpieczeństwo:",
      why3Desc: " Zdjęcie pozostaje w pamięci podręcznej przeglądarki i nigdy nie jest wysyłane na żaden zewnętrzny serwer."
    },
    referenceObjects: {
      eyebrow: "Kalibracja",
      title: "Jaki Obiekt Odniesienia Wybrać?",
      description: "Im bardziej znormalizowany i stabilny jest obiekt referencyjny, tym precyzyjniejszy będzie obliczony wzrost.",
      thObject: "Obiekt",
      thSize: "Wymiar do wpisania",
      thStandard: "Standardowy wymiar?",
      thBestFor: "Najlepszy do",
      rows: [
        {
          object: "Kartka A4 (dłuższy bok)",
          size: "29,7 cm",
          standard: "Tak, ISO 216",
          bestFor: "Przyklejona taśmą do ściany tuż obok mierzonej osoby"
        },
        {
          object: "Karta płatnicza (dłuższy bok)",
          size: "8,56 cm",
          standard: "Tak, ISO/IEC 7810",
          bestFor: "Zbliżenia. Ze względu na mały rozmiar powiększ obraz i precyzyjnie zaznacz rogi."
        },
        {
          object: "Standardowe drzwi wewnętrzne",
          size: "203 cm (typowe)",
          standard: "Nie, zależy od budynku",
          bestFor: "Zdjęcia całej sylwetki, po jednorazowym zmierzeniu futryny"
        }
      ]
    },
    accuracy: {
      eyebrow: "Badania i testy laboratoryjne",
      title: "Jak Uzyskać Dokładny Pomiar ze Zdjęcia",
      description: "Stanie zbyt daleko przed obiektem referencyjnym oraz przechylanie telefonu to przyczyny niemal wszystkich błędów. Trzymaj telefon prosto i stój przy ścianie.",
      tiltLowTitle: "Nisko, skierowany w górę",
      tiltLowBadge: "Przeszacowanie",
      tiltLowDesc: "Głowa znajduje się dalej od obiektywu i ulega zmniejszeniu w perspektywie, co sztucznie zawyża wynik (+2,4 do +4,5 cm błędu).",
      tiltLevelTitle: "Poziomo na wysokości pasa",
      tiltLevelBadge: "Optymalny wynik",
      tiltLevelDesc: "Telefon skierowany jest prostopadle do ściany, co zachowuje idealne proporcje geometryczne (0,0 cm błędu pomiaru).",
      tiltHighTitle: "Wysoko, skierowany w dół",
      tiltHighBadge: "Niedoszacowanie",
      tiltHighDesc: "Podłoga jest dalej od obiektywu i ulega pozornej redukcji, przez co osoba wydaje się niższa (−2,8 do −5,9 cm błędu).",
      tableTitle: "Nasz kontrolowany test porównawczy (14 konfiguracji)",
      tableDesc: "Przetestowaliśmy 14 konfiguracji ze znanymi wysokościami z odległości 3,5 metra, aby oddzielić błędy perspektywy od precyzji kliknięć.",
      thSetup: "Ustawienie aparatu",
      thTrueHeight: "Rzeczywisty wzrost",
      thMeasured: "Wynik pomiaru",
      thError: "Błąd",
      benchmarkRows: [
        {
          setup: "Telefon poziomo na wys. 60, 100 lub 130 cm, osoba przy ścianie obok drzwi",
          trueHeight: "172 cm",
          measured: "172,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "To samo ustawienie dla dziecka 120 cm i osoby dorosłej 190 cm",
          trueHeight: "120, 190 cm",
          measured: "120,0, 190,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Telefon pochylony 10° w górę z wysokości 60 cm",
          trueHeight: "172 cm",
          measured: "174,4 cm",
          error: "+2,4 cm"
        },
        {
          setup: "Telefon pochylony 20° w górę z wysokości 40 cm",
          trueHeight: "172 cm",
          measured: "176,5 cm",
          error: "+4,5 cm"
        },
        {
          setup: "Telefon pochylony 10° w dół z wysokości 160 cm",
          trueHeight: "172 cm",
          measured: "169,2 cm",
          error: "−2,8 cm"
        },
        {
          setup: "Telefon pochylony 20° w dół z wysokości 180 cm",
          trueHeight: "172 cm",
          measured: "166,1 cm",
          error: "−5,9 cm"
        },
        {
          setup: "Kartka A4 jako odniesienie, telefon pochylony 10° w górę",
          trueHeight: "172 cm",
          measured: "176,8 cm",
          error: "+4,8 cm"
        },
        {
          setup: "Osoba stojąca 30 cm przed płaszczyzną drzwi",
          trueHeight: "172 cm",
          measured: "188,1 cm",
          error: "+16,1 cm"
        },
        {
          setup: "Osoba stojąca 60 cm przed płaszczyzną drzwi",
          trueHeight: "172 cm",
          measured: "207,6 cm",
          error: "+35,6 cm"
        }
      ],
      pixelSensitivityBold: "Czułość zaznaczenia punktów:",
      pixelSensitivityDesc: " Niedokładne kliknięcie generuje błąd, szczególnie przy małych obiektach. Na ekranie chybienie o 1 piksel przesuwa wynik o 1 cm przy drzwiach, o 7 cm przy kartce A4 i aż o 23 cm przy karcie bankowej. Wybieraj jak największe obiekty i przybliżaj obraz przed kliknięciem.",
      tips: [
        {
          title: "Nie przechylaj telefonu",
          desc: "Kąt nachylenia to główna przyczyna błędów. Trzymaj telefon pionowo na wysokości pasa i cofnij się, aż obejmiesz całą postać."
        },
        {
          title: "Wspólna płaszczyzna",
          desc: "Stój bezpośrednio przy tej samej ścianie co odniesienie. Krok do przodu o zaledwie 30 cm dodał w teście aż 16 cm pozornego wzrostu."
        },
        {
          title: "Prawidłowa postawa",
          desc: "Pięty na podłodze, wyprostowane plecy i wzrok skierowany przed siebie. Zła postawa na zdjęciu da identyczny błąd jak przy tradycyjnym mierzeniu."
        },
        {
          title: "Widoczna cała postać",
          desc: "Ucięcie stóp lub czubka głowy uniemożliwia wyznaczenie pełnej wysokości. Wyraźne ujęcie zapewnia najwyższą precyzję."
        }
      ]
    },
    noTapeMethods: {
      eyebrow: "Metody alternatywne",
      title: "Jak Zmierzyć Swój Wzrost Bez Miarki i Centymetra",
      description: "Pięć sprawdzonych sposobów, gdy nie masz pod ręką miary krawieckiej ani taśmy budowlanej.",
      methods: [
        {
          id: "wall-a4",
          title: "Metoda ze znakiem na ścianie i kartką A4",
          tags: ["Książka w twardej oprawie", "Kartka A4", "Ołówek"],
          desc: "Zaznacz wzrost na ścianie przy pomocy książki. Przyłóż dłuższą krawędź kartki A4 (29,7 cm) od podłogi w górę, zaznaczaj kolejne odcinki i policz łączną wysokość. Końcówkę zmierz arkuszem złożonym na pół (14,85 cm)."
        },
        {
          id: "door",
          title: "Metoda z futryną drzwi",
          tags: ["Drzwi"],
          desc: "Standardowe drzwi pokojowe mają zazwyczaj wysokość 200–205 cm. Stań pod ościeżnicą i oszacuj odległość od czubka głowy do górnej krawędzi."
        },
        {
          id: "arm-span",
          title: "Metoda z rozpiętością ramion",
          tags: ["Pomocnik lub ściana"],
          desc: "Rozpiętość ramion od czubka środkowego palca jednej ręki do drugiej odpowiada niemal co do milimetra wzrostowi człowieka (średnia różnica poniżej 2,5 cm)."
        },
        {
          id: "phone",
          title: "Aplikacja pomiarowa w smartfonie",
          tags: ["Smartfon"],
          desc: "Na kompatybilnych iPhone'ach aplikacja Miarka Apple mierzy wzrost automatycznie. Na innych telefonach wystarczy zrobić zdjęcie i użyć naszego narzędzia."
        },
        {
          id: "dollar",
          title: "Metoda z banknotami",
          tags: ["Banknoty"],
          desc: "Banknoty mają ściśle określone wymiary (polskie 100 zł ma 13,8 cm długości, 50 zł to 13,2 cm). Możesz układać je pionowo wzdłuż ściany."
        }
      ],
      footer: "Wszystkie te sposoby dają dobre przybliżenie, jednak skalibrowana fotografia pozostaje najbardziej powtarzalną i precyzyjną metodą."
    },
    clinicMethod: {
      eyebrow: "Standard medyczny",
      title: "Jak Zmierzyć Wzrost z Precyzją: Metoda Kliniczna",
      description: "Oparta na procedurach medycznych stadiometrii (wytyczne CDC) dla zachowania maksymalnej dokładności w domu.",
      steps: [
        "Zdejmij buty, grube skarpety, czapki, opaski i rozpuść wysokie fryzury.",
        "Stań na płaskiej, twardej podłodze (panele lub płytki, bez dywanu) opierając się o gładką ścianę bez odstających listew.",
        "Stopy złączone płasko na podłożu, nogi proste w kolanach, ramiona luźno wzdłuż tułowia, barki na równej wysokości.",
        "Pięty, pośladki, łopatki i tył głowy powinny dotykać ściany (w zależności od budowy ciała nie każdy dotknie wszystkimi punktami jednocześnie).",
        "Patrz prosto przed siebie. Przyłóż twardą książkę pod kątem prostym do ściany, opuść ją na czubek głowy i zrób delikatny znak ołówkiem.",
        "Zmierz odległość od podłogi do znaku metalową taśmą mierniczą z dokładnością do milimetra. W razie braku miarki użyj kartki A4 lub naszego narzędzia ze zdjęcia."
      ],
      whyAloneTitle: "Dlaczego Samodzielny Pomiar Niemal Zawsze Zawodzi",
      errorCauses: [
        {
          title: "Garbienie się",
          desc: "Człowiek mimowolnie pochyla się, próbując zrównoważyć książkę lub linijkę na czubku głowy."
        },
        {
          title: "Krzywa książka",
          desc: "Książka lub ekierka nie jest trzymana pod idealnym kątem 90 stopni do płaszczyzny ściany."
        },
        {
          title: "Uginająca się miarka",
          desc: "Taśma miernicza wygina się lub biegnie po skosie w trakcie odczytywania pomiaru."
        },
        {
          title: "Pora dnia",
          desc: "Dyski kręgosłupa ulegają kompresji w ciągu dnia, sprawiając, że wieczorem jesteśmy nawet o 1 cm niżsi niż rano."
        }
      ],
      whyAloneFooter: "Wykonywanie wszystkiego samemu jest niewygodne: utrzymanie pionu, trzymanie książki i zaznaczanie kreski. Zdjęcie z obiektem referencyjnym całkowicie rozwiązuje ten problem."
    },
    faq: {
      badge: "CENTRUM POMOCY",
      title: "Często Zadawane Pytania",
      items: [
        {
          id: "how-accurate-is-height-measurement-from-a-photo",
          q: "Jak dokładny jest pomiar wzrostu ze zdjęcia?",
          a: "Wszystko zależy od ujęcia. W testach w 14 skalibrowanych konfiguracjach aparat umieszczony poziomo przy osobie stojącej przy ścianie wykazał dokładny wzrost rzeczywisty. Przechylenie o 10–20° wprowadziło błąd 2–6 cm, a odsunięcie się o 30 cm od drzwi dodało 16 cm błędu. Przy prawidłowym zdjęciu błąd wynosi zazwyczaj 1–2 cm."
        },
        {
          id: "what-is-the-best-object-to-use-for-calibration",
          q: "Jaki jest najlepszy obiekt do kalibracji?",
          a: "Kartka A4 (29,7 cm) lub karta bankowa (8,56 cm) to międzynarodowe standardy ISO identyczne na całym świecie. Standardowe drzwi (zwykle 203 cm) są doskonałe do zdjęć całej sylwetki po uprzednim jednorazowym zmierzeniu futryny."
        },
        {
          id: "is-my-photo-uploaded-or-stored",
          q: "Czy moje zdjęcie jest wgrywane lub zapisywane na serwerach?",
          a: "Nie. Całe przetwarzanie odbywa się bezpośrednio w Twojej przeglądarce. Zdjęcie nigdy nie opuszcza Twojego urządzenia."
        },
        {
          id: "can-i-measure-someone-elses-height-from-a-photo",
          q: "Czy mogę zmierzyć wzrost kogoś innego ze zdjęcia?",
          a: "Tak. Wystarczy wgrać dowolną fotografię, na której dana osoba stoi obok obiektu o znanym wymiarze, skalibrować skalę i przeciągnąć linię pomiarową."
        },
        {
          id: "does-it-work-for-celebrities",
          q: "Czy to działa również w przypadku osób publicznych i gwiazd?",
          a: "Tak, jeśli zdjęcie przedstawia gwiazdę stojącą frontalnie obok futryny drzwi lub innego elementu o znormalizowanych wymiarach."
        },
        {
          id: "why-do-i-measure-taller-in-the-morning",
          q: "Dlaczego rano jesteśmy wyżsi niż wieczorem?",
          a: "Krążki międzykręgowe w kręgosłupie ulegają naturalnemu ściskaniu pod wpływem masy ciała w ciągu dnia, zmniejszając wzrost wieczorem nawet o centymetr."
        },
        {
          id: "do-i-need-an-account",
          q: "Czy muszę zakładać konto?",
          a: "Nie. Narzędzie jest w pełni bezpłatne, nie wymaga rejestracji i działa na każdym urządzeniu."
        }
      ]
    },
    tool: {
      step1Calibration: "Krok 1: Kalibracja",
      step2Measure: "Krok 2: Pomiar osoby",
      tapOtherEnd: "Dotknij drugiego końca, aby zakończyć",
      drawCalibLine: "Narysuj linię kalibracyjną, dotykając ekranu",
      drawMeasLine: "Kliknij 'Auto Scan' lub narysuj linię od stóp do głowy",
      cancel: "Anuluj",
      done: "Gotowe"
    }
  },
  heightDifference: {
    intro: {
      title: "Kalkulator Różnicy Wzrostu",
      description: "Kalkulator różnicy wzrostu odejmuje niższą wartość od wyższej i podaje dokładną różnicę w centymetrach oraz calach. Wskazuje również różnicę procentową oraz określa, która osoba jest wyższa. Wpisuj dane w cm lub stopach i calach. Narzędzie jest bezpłatne, nie wymaga logowania i przelicza wynik na bieżąco.",
      heroCtaButton: "Oblicz różnicę wzrostu teraz",
      heroBadgeFree: "Darmowy i bez limitu",
      heroBadgeNoSignup: "Bez rejestracji",
      heroBadgeUnits: "Metryczny i imperialny"
    },
    calculateSection: {
      title: "Oblicz Różnicę Wzrostu",
      description: "Wpisz wzrost dla Osoby 1 i Osoby 2, a następnie wybierz system metryczny (cm) lub imperialny (ft/in). Kalkulator wyświetli różnicę, wartość procentową i wskaże wyższą osobę bezpośrednio pod polami. Porównuje dwie wartości jednocześnie i działa na dowolnym urządzeniu."
    },
    howToCalculate: {
      title: "Jak Obliczyć Różnicę Wzrostu",
      p1: "Różnica wzrostu to wzrost osoby wyższej minus wzrost osoby niższej. Narzędzie automatycznie rozpoznaje wyższą postać, dzięki czemu wynik jest zawsze liczbą dodatnią. Kolejność wpisywania danych nie wpływa na poprawność obliczeń.",
      formulaTitle: "Wzór na różnicę wzrostu",
      formulaText: "Różnica Wzrostu = Wyższy Wzrost − Niższy Wzrost",
      personALabel: "Alex",
      personAValue: "180 cm",
      personBLabel: "Ben",
      personBValue: "165 cm",
      differenceLabel: "Różnica",
      differenceValue: "180 − 165 = 15 cm",
      p2: "W przypadku stóp i cali zasada jest identyczna po jednym prostym kroku. Przelicz oba wymiary na cale, a następnie odejmij. 5'10\" to 70 cali, a 5'3\" to 63 cale, co daje różnicę 7 cali (17,8 cm)."
    },
    percentage: {
      title: "Procentowa Różnica Wzrostu",
      p1: "Różnica procentowa wyraża dystans wzrostowy jako udział w całkowitym wzroście wyższej osoby. Odstęp w centymetrach podaje fizyczną odległość, natomiast ujęcie procentowe obrazuje, jak znacząca jest to dysproporcja.",
      formulaTitle: "Wzór na różnicę procentową",
      formulaText: "Różnica Procentowa = (Różnica Wzrostu ÷ Wyższy Wzrost) × 100",
      heightDiffLabel: "Różnica wzrostu",
      heightDiffValue: "15 cm",
      tallerHeightLabel: "Wyższy wzrost",
      tallerHeightValue: "180 cm",
      calculationLabel: "Działanie",
      calculationValue: "(15 ÷ 180) × 100",
      percentDiffLabel: "Różnica procentowa",
      percentDiffValue: "8,3%",
      p2: "Osoba B jest o 8,3% niższa od Osoby A. Kalkulator wyświetla tę wartość obok różnicy w cm. Obie liczby aktualizują się natychmiast przy każdej zmianie.",
      p3: "Wartość bazowa użyta w mianowniku decyduje o wyniku. Ten kalkulator dzieli przez wyższy wzrost, określając, o ile procent niższa jest Osoba B. Dzieląc przez niższy wzrost, dowiesz się, o ile wyższa jest Osoba A: 15 ÷ 165 × 100 = 9,1%. Obie wielkości opisują tę samą 15-centymetrową różnicę.",
      duoShorterLabel: "W odniesieniu do osoby niższej",
      duoShorterValue: "9,1% wyższy",
      duoShorterEq: "(15 ÷ 165) × 100 = 9,09%",
      duoTallerLabel: "W odniesieniu do osoby wyższej",
      duoTallerValue: "8,3% niższy",
      duoTallerEq: "(15 ÷ 180) × 100 = 8,33%",
      p4: "Ta sama różnica w centymetrach odpowiada mniejszemu odsetkowi w miarę wzrostu całkowitej wysokości. Różnica 10 cm stanowi 6,3% przy wzroście 160 cm, lecz zaledwie 5,3% przy 190 cm."
    },
    couple: {
      title: "Kalkulator Różnicy Wzrostu w Parze",
      p1: "Kalkulator różnicy wzrostu dla par mierzy odstęp między partnerami. Pary sprawdzają za jego pomocą, jak ich wymiary prezentują się na tle rzeczywistych badań populacyjnych.",
      statAvgGapLabel: "Średnia różnica, pary w UK",
      statAvgGapValue: "14,1 cm",
      statAvgGapSub: "5,6 cala",
      statAvgGapSampleSize: "12 502 pary",
      statManTallerLabel: "Mężczyzna wyższy",
      statManTallerValue: "92,5%",
      statManTallerSub: "par w badanej grupie",
      p2: "Brytyjskie badanie obejmujące 12 502 pary wykazało, że mężczyzna był wyższy w 92,5% związków. Średnia różnica wynosiła 14,1 cm (5,6 cala). Związki, w których to kobieta była wyższa lub w których mężczyzna przewyższał partnerkę o ponad 25 cm, zdarzały się rzadziej niż wynikałoby to z losowego doboru.",
      distTableCaption: "Rozkład par według różnicy wzrostu",
      tableHeaderGap: "Mężczyzna wyższy o",
      tableHeaderShare: "Udział par",
      tableHeaderBar: "Wykres",
      bandWomanTaller: "Kobieta wyższa",
      band0to5: "0 do 5 cm",
      band5to10: "5 do 10 cm",
      band10to15: "10 do 15 cm",
      band15to20: "15 do 20 cm",
      band20to25: "20 do 25 cm",
      band25to30: "25 do 30 cm",
      bandOver30: "Ponad 30 cm",
      tableSource: "Źródło: Stulp i in. (2013), rodzice w badaniu UK Millennium Cohort Study.",
      p3: "Różnice od 10 do 20 cm dotyczyły około 42% par uczestniczących w badaniu.",
      coupleCardChipsLabel: "Przykładowe pary",
      coupleLine: "Partner 1 ({h1} cm) jest o <strong>{gap} cm wyższy</strong> od Partnera 2 ({h2} cm). Różnica stanowi {pct}% wzrostu Partnera 1.",
      coupleBandText: "Różnica {gap} cm mieści się w przedziale „{band}”, który obejmował około {share}% badanych par.",
    },
    chartSection: {
      title: "Tabela Porównawcza Różnic Wzrostu",
      p1: "Nasza tabela prezentuje powszechne zestawienia wzrostu, różnicę w centymetrach i calach oraz względny odsetek odchylenia.",
      p2: "Wykorzystaj ją do szybkiego sprawdzenia relacji między znajomymi, rodzeństwem lub partnerami.",
      calloutPrefix: "Chcesz zestawić ze sobą trzy lub więcej osób na jednym skalenym wykresie? Sprawdź nasz ",
      calloutLink: "Kalkulator Porównania Wzrostu",
      calloutSuffix: " obsługujący do dziesięciu postaci jednocześnie."
    },
    unitsSection: {
      title: "Różnica Wzrostu w Różnych Jednostkach",
      p1: "Kalkulator obsługuje zarówno jednostki metryczne, jak i imperialne. Sprawdź, jak popularne różnice prezentują się w obu systemach.",
      subheadFtIn: "Różnica wzrostu w stopach i calach",
      table1HeaderPersonA: "Osoba A",
      table1HeaderPersonB: "Osoba B",
      table1HeaderDiffIn: "Różnica (cale)",
      table1HeaderDiffCm: "Różnica (cm)",
      table1HeaderPercent: "% Różnicy",
      subheadCm: "Różnica wzrostu w centymetrach",
      table2HeaderDiffCm: "Różnica wzrostu (cm)",
      table2HeaderInInches: "W calach",
      table2HeaderExamplePair: "Przykładowa para",
      table2HeaderPercent: "% Różnicy"
    },
    cta: {
      title: "Chcesz Sprawdzić Swój Wynik?",
      descriptionLine1: "Wpisz dwa wzrosty i poznaj różnicę w centymetrach i calach, odsetek procentowy oraz klasyfikację w statystykach par.",
      descriptionLine2: "Narzędzie jest w 100% bezpłatne, działa w każdej przeglądarce i nie wymaga rejestracji.",
      feature1: "Natychmiastowe przeliczanie na żywo",
      feature2: "Różnica procentowa i wykres słupkowy",
      feature3: "Obsługa cm oraz stóp i cali",
      feature4: "Całkowicie za darmo bez logowania",
      buttonText: "Przewiń do góry i oblicz teraz ↑"
    },
    faq: [
      {
        q: "Jaka jest normalna różnica wzrostu w parze?",
        a: "Nie ma jednej normy. W dużym badaniu na 12 502 brytyjskich parach mężczyzna był przeciętnie o 14,1 cm (5,6 cala) wyższy. U około 42% par różnica wynosiła od 10 do 20 cm. Nasz kalkulator pozwala zwizualizować każdą dowolną kombinację."
      },
      {
        q: "Jak obliczyć różnicę wzrostu?",
        a: "Odejmij mniejszy wzrost od większego: Różnica Wzrostu = Wyższy Wzrost − Niższy Wzrost. Dla 180 cm i 165 cm różnica wynosi 15 cm. Aby obliczyć procent, podziel 15 przez 180 i pomnóż przez 100 (8,3%)."
      },
      {
        q: "Czy kalkulator pokazuje różnicę procentową?",
        a: "Tak. Narzędzie podaje odległość w cm i calach oraz różnicę procentową w odniesieniu do osoby wyższej, przeliczając obie wartości na żywo."
      },
      {
        q: "Czy „procent wyższy” to to samo co „procent niższy”?",
        a: "Nie. „Procent niższy” dzieli różnicę przez wyższy wzrost (15 ÷ 180 = 8,3%). „Procent wyższy” dzieli różnicę przez niższy wzrost (15 ÷ 165 = 9,1%). Obie wartości opisują tę samą 15-centymetrową różnicę."
      },
      {
        q: "Jakich jednostek miary można używać?",
        a: "Kalkulator akceptuje centymetry oraz stopy i cale. Zmiana jednostki natychmiast przelicza wprowadzone wartości i wynik końcowy."
      }
    ],
    toc: [
      { id: "calculate-height-difference", label: "Oblicz różnicę wzrostu" },
      { id: "how-to-calculate-height-difference", label: "Jak obliczyć różnicę wzrostu" },
      { id: "height-difference-percentage", label: "Procentowa różnica wzrostu" },
      { id: "couple-height-difference-calculator", label: "Kalkulator par" },
      { id: "height-difference-chart", label: "Tabela porównawcza" },
      { id: "height-difference-in-different-units", label: "Różnica w różnych jednostkach" },
      { id: "try-the-height-difference-calculator", label: "Wypróbuj kalkulator" },
      { id: "frequently-asked-questions", label: "Często zadawane pytania" },
      { id: "references", label: "Źródła" }
    ],
    references: {
      title: "Źródła",
      ref1: "Stulp G, Buunk AP, Pollet TV, Nettle D, Verhulst S (2013). Are Human Mating Preferences with Respect to Height Reflected in Actual Pairings? PLOS ONE 8(1): e54186.",
      ref1Url: "https://doi.org/10.1371/journal.pone.0054186",
      ref2: "Stulp G, Buunk AP, Pollet TV (2013). Women want taller men more than men want shorter women. Personality and Individual Differences.",
      ref2Url: "https://tvpollet.github.io/pdfs/Stulp_et_al_2013_PAID.pdf"
    },
    tool: {
      cardHeaderTitle: "Wpisz dwa wzrosty",
      cardHeaderSub: "Wyniki aktualizują się na bieżąco",
      unitMetric: "Metryczny (cm)",
      unitImperial: "Imperialny (ft/in)",
      person1Label: "Osoba 1",
      person2Label: "Osoba 2",
      swapButtonLabel: "Zamień Osobę 1 i Osobę 2",
      swapButtonTitle: "Zamień miejscami",
      cmPlaceholder: "np. 180",
      cmPlaceholder2: "np. 165",
      ftLabel: "FT",
      inLabel: "IN",
      hintText: "Wpisz wzrost w obu polach. Użyj przełącznika powyżej, by zmienić na stopy i cale.",
      heightDifferenceLabel: "Różnica wzrostu",
      percentDifferenceLabel: "% Różnicy",
      tallerPersonLabel: "Wyższa osoba",
      gapGraphicLabel: "Wykres różnicy",
      badgeFree: "Za darmo",
      badgeNoAccount: "Bez rejestracji",
      badgeSupportsUnits: "Obsługuje cm i ft/in",
      badgeUpdatesLive: "Aktualizacja na żywo",
      noDifferenceText: "Brak różnicy",
      personShorterText: "{person} jest o {pct}% niższy(a)",
      sameHeightText: "Ten sam wzrost"
    },
    coupleCalc: {
      chipsLabel: "Przykładowe pary",
      partner1Label: "Partner 1",
      partner2Label: "Partner 2",
      coupleLine: "Partner 1 ({h1} cm) jest o <strong>{gap} cm wyższy</strong> od Partnera 2 ({h2} cm). Różnica stanowi {pct}% wzrostu Partnera 1.",
      coupleBandText: "Różnica {gap} cm mieści się w przedziale „{band}”, który obejmował około {share}% badanych par.",
      bandWomanTaller: "kobieta wyższa",
      band0to5: "0 do 5 cm",
      band5to10: "5 do 10 cm",
      band10to15: "10 do 15 cm",
      band15to20: "15 do 20 cm",
      band20to25: "20 do 25 cm",
      band25to30: "25 do 30 cm",
      bandOver30: "ponad 30 cm"
    },
    chartTable: {
      headerPersonA: "Osoba A",
      headerPersonB: "Osoba B",
      headerDifference: "Różnica",
      headerPercentDifference: "% Różnicy"
    }
  }
};

updateLocale('sv', svData);
updateLocale('pl', plData);

