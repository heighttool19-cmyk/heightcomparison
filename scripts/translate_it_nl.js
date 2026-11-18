const fs = require('fs');
const path = require('path');

function updateLocale(loc, trans) {
  const filePath = path.resolve(`messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.home = trans.home;
  data.imageToHeight = trans.imageToHeight;

  if (trans.heightDifference) {
    if (trans.heightDifference.intro) Object.assign(data.heightDifference.intro, trans.heightDifference.intro);
    if (trans.heightDifference.percentage) Object.assign(data.heightDifference.percentage, trans.heightDifference.percentage);
    if (trans.heightDifference.howToCalculate) Object.assign(data.heightDifference.howToCalculate, trans.heightDifference.howToCalculate);
    if (trans.heightDifference.couple) Object.assign(data.heightDifference.couple, trans.heightDifference.couple);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${loc} successfully!`);
}

// ==========================================
// ITALIAN (it)
// ==========================================
const itData = {
  home: {
    intro: {
      h1: "Calcolatore di Confronto Altezza: Confronta Altezze Online con Grafico Visivo",
      p: "Usa questo strumento di confronto altezza per visualizzare le stature affiancate in un grafico in scala reale. Inserisci qualsiasi altezza in centimetri o piedi e pollici per vedere all'istante la differenza. Lo strumento offre un confronto visivo con proporzioni esatte. Il grafico si aggiorna in tempo reale e scala ogni figura a partire dal valore preciso inserito.",
      freeLibraryBadge: "Archivio Online Gratuito",
      freeLibraryDesc: "Accedi al nostro database di altezze di riferimento pronte all'uso suddivise in tre collezioni, crea confronti personalizzati illimitati ed esporta grafici PNG ad alta risoluzione.",
      noAccounts: "Nessun account",
      noPayments: "Nessun pagamento",
      free100: "100% Gratuito",
      compareNowCta: "Confronta Ora ↑"
    },
    section1: {
      eyebrow: "Come funziona",
      title: "Come Funziona un Grafico di Confronto Altezza?",
      p1: "Un grafico di confronto altezza converte le misure numeriche in un'immagine scalata in cui ogni barra rispetta l'esatta proporzione geometrica a grandezza reale.",
      p2: "Se la Persona A è alta 170 cm e la Persona B 185 cm, la seconda figura viene renderizzata esattamente a 1,09 volte l'altezza della prima. Un dislivello di 10 cm su 160 cm è proporzionalmente diverso rispetto a 190 cm: il grafico rende visibile questa differenza senza calcoli.",
      p3: "Ideale per confronti in famiglia, squadre sportive o progetti artistici.",
      imgAlt: "Grafico di confronto altezza tra una persona di 170 cm e una di 185 cm affiancate",
      imgCaption: "Alex a 170 cm (5'7\") e Ben a 185 cm (6'1\"), disegnati in scala.",
      needGapTitle: "Ti serve solo il calcolo preciso della differenza?",
      needGapDesc: "Il Calcolatore di Differenza Altezza mostra la differenza esatta in cm e pollici, la percentuale di scarto e una barra visiva. Ideale per conoscere il dato numerico diretto.",
      needGapCta: "Apri Calcolatore di Differenza Altezza"
    },
    section2: {
      eyebrow: "Passo dopo passo",
      title: "Come Confrontare le Altezze Online: Guida per Principianti",
      step1Title: "Passo 1: Imposta il tuo confronto",
      step1Desc: "Scegli chi confrontare: due amici, te stesso con una celebrità, personaggi anime o monumenti. Funziona in cm e piedi/pollici con passaggio istantaneo.",
      guidebookNoteLabel: "Nota da guide ufficiali:",
      guidebookNoteText: "Cerca nel database dei vip o esplora i personaggi fantastici. Tutte le altezze provengono da databook e schede di produzione ufficiali.",
      panelPeople: "Persone",
      panelCelebrities: "Celebrità",
      panelCharacters: "Personaggi",
      panelObjects: "Oggetti",
      step2Title: "Passo 2: Crea il tuo grafico di altezza",
      step2Desc: "Inserisci nomi, colori e misure. Il sistema scala fino a 10.000 metri (32.808 ft), consentendoti di affiancare una persona alla Torre Eiffel o all'Everest.",
      panels: [
        { label: "Aggiungi Persona", desc: "Nome, genere, altezza in cm o ft/in e colore a scelta." },
        { label: "Celebrità", desc: "Atleti, attori e icone storiche di tutto il mondo." },
        { label: "Personaggi Fittizi", desc: "Anime, cartoni animati e supereroi da guide autorizzate." },
        { label: "Entità e Oggetti", desc: "Animali, monumenti celebri e cime montuose." }
      ],
      step3Title: "Passo 3: Visualizza la differenza e condividi",
      step3Desc: "Ogni sagoma include nome e altezza. La differenza è visibile all'istante. Scarica un'immagine PNG nitida o condividi un link diretto valido 7 giorni."
    },
    section3: {
      eyebrow: "Perché usarlo",
      title: "Perché un Grafico Visivo Mostra Molto Più dei Numeri",
      description: "Un grafico visivo restituisce le relazioni matematiche in proporzioni reali, rendendo comprensibile la differenza di statura al primo sguardo.",
      card1Title: "La scala proporzionale svela ciò che i numeri celano",
      card1Desc: "Un divario di 12 cm a 160 cm è proporzionalmente maggiore rispetto a 190 cm. Le barre visive lo mostrano subito. Per il calcolo matematico, apri il ",
      card1Link: "Calcolatore di Differenza Altezza",
      card2Title: "Confrontati con chiunque o con qualsiasi cosa",
      card2Desc: "Aggiungi la tua altezza e posiziona accanto un personaggio famoso o una montagna: tutto allineato sullo stesso asse.",
      card3Title: "Confronto personaggi per disegnatori e autori",
      card3Desc: "Scrittori e illustratori possono impostare la corretta scala corporea dei loro personaggi secondo le schede canoniche.",
      card4Title: "Nessuna conversione o calcolo manuale",
      card4Desc: "Scrivi in cm o ft/in. Differenze, percentuali e rapporti dimensionali vengono elaborati in tempo reale durante la digitazione.",
      card5Title: "La scala reale contestualizza l'essere umano",
      card5Desc: "Guarda una persona di 175 cm accanto all'Everest (8.848 m) per apprezzare l'effettiva grandezza della natura.",
      card6Title: "Esportazione visiva in un clic",
      card6Desc: "Scarica file PNG ad alta risoluzione o genera link per social media, presentazioni o forum di discussione."
    },
    section4: {
      eyebrow: "Esempi pratici",
      title: "Confrontare le Altezze: Esempi e Scenari Quotidiani",
      description: "Casi reali in cui una resa visiva in scala apporta immediata chiarezza rispetto ai soli numeri.",
      useCases: [
        {
          tag: "COPPIE E AMICI",
          quote: "“Aspetta un attimo, di quanto sei più alto di me esattamente?”",
          desc: "Inserisci entrambe le altezze e visualizza lo stacco preciso. 10 cm di differenza si notano subito a colpo d'occhio.",
          try: "165 CM + 178 CM · SCARTO DI 13 CM (7,9%)"
        },
        {
          tag: "SPORT ED ATLETI",
          quote: "“Chi ha davvero il vantaggio di statura sul parquet?”",
          desc: "Confronta atleti della NBA o di altri sport per valutare l'effettivo vantaggio di altezza e allungo.",
          try: "TITOLARE NBA 200 CM · LINEBACKER NFL 188 CM · CLIMBER 174 CM"
        },
        {
          tag: "ANIME E FANDOM",
          quote: "“La wiki dice un numero, ma come appaiono vicini nella realtà?”",
          desc: "Personaggi anime a grandezza fedele: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) e Levi (160 cm).",
          try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
        },
        {
          tag: "OGGETTI E MONUMENTI",
          quote: "“Non avevo idea di quanto fosse mastodontico dal vivo.”",
          desc: "Posiziona una persona accanto alle cascate Salto Angel (979 m), a una porta standard (203 cm) o al soffitto di casa.",
          try: "PERSONA 175 CM + CHRYSLER BUILDING 319 M + MONTE EVEREST 8.848 M"
        },
        {
          tag: "IO CONTRO I VIP",
          quote: "“Davvero sono alto esattamente quanto loro?”",
          desc: "Confrontati con celebrità come Tom Cruise, The Rock o Taylor Swift usando dati biografici attendibili.",
          try: "TU + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
        },
        {
          tag: "DESIGN E SPAZI",
          quote: "“Questo mobile entrerà davvero nella mia stanza?”",
          desc: "Inserisci il telaio di una porta o l'altezza del soffitto a fianco di una persona prima di comprare arredamento.",
          try: "PERSONA 185 CM · PORTA STANDARD 203 CM · SOFFITTO 260 CM"
        }
      ],
      tableTitle: "Tabella di differenza altezza in piedi, pollici e centimetri",
      tableDesc: "Sette scenari quotidiani per confrontare coppie e persone in piedi, pollici, centimetri e percentuali."
    },
    section5: {
      eyebrow: "Punti di forza",
      title: "Perché Scegliere il Nostro Calcolatore di Confronto Altezza?",
      description: "Strumenti completi. Massima immediatezza. Nessuna registrazione.",
      features: [
        {
          title: "Generatore istantaneo di altezze",
          desc: "Il grafico si aggiorna in tempo reale mentre digiti, senza ricaricare la pagina."
        },
        {
          title: "Sagome personalizzabili",
          desc: "Sei colori e silhouette maschili/femminili per distinguere fino a oltre 10 soggetti."
        },
        {
          title: "Database celebrità",
          desc: "1.294 personaggi noti tra sportivi, attori e figure storiche già censiti."
        },
        {
          title: "Eroi di fantasia",
          desc: "1.138 personaggi di anime, fumetti e videogiochi da fonti ufficiali."
        },
        {
          title: "Oggetti e monumenti",
          desc: "264 riferimenti del mondo reale tra animali, grattacieli e vette montuose."
        },
        {
          title: "Misurazione da foto",
          desc: "Carica una foto reale e inseriscila nel grafico a grandezza fedele."
        },
        {
          title: "Download PNG pulito",
          desc: "Scarica grafici ad alta risoluzione in modo illimitato e gratuito."
        },
        {
          title: "Link condivisibili",
          desc: "Crea un link diretto al tuo grafico valido per 7 giorni senza dover effettuare il login."
        }
      ]
    },
    section6: {
      eyebrow: "Affidabilità",
      title: "Quanto è Preciso il Grafico di Confronto Altezza?",
      items: [
        {
          title: "Motore a scala esatta",
          desc: "Ogni sagoma rispecchia il dato esatto: 170 cm corrispondono a 170,00 unità esatte sull'asse."
        },
        {
          title: "Valori di riferimento",
          desc: "Poiché le fonti pubbliche possono differire, adottiamo i dati confermati più recenti."
        },
        {
          title: "Altezze dei vip",
          desc: "Tratte da archivi anagrafici e schede biografiche certificate, senza stime arbitrarie."
        },
        {
          title: "Materiale originale",
          desc: "I dati sui personaggi fittizi provengono da manuali di produzione autorizzati."
        },
        {
          title: "Edifici e fauna",
          desc: "Monumenti verificati da rilievi tecnici. Negli animali si misura l'altezza al garrese (spalla)."
        }
      ]
    },
    section7: {
      eyebrow: "Panoramica",
      title: "Un Sito Costruito per la Massima Semplicità",
      description: "Tutto ciò che serve per confrontare altezze con estrema precisione e zero ostacoli.",
      thFeature: "Caratteristica",
      thFree: "Cosa ottieni gratuitamente",
      rows: [
        ["Persone per grafico", "Illimitate — tutte sullo stesso asse proporzionale"],
        ["Altezze già pronte", "2.696 riferimenti (1.294 celebrità, 1.138 personaggi, 264 oggetti)"],
        ["Unità di misura", "Centimetri, metri, piedi e pollici (conversione immediata)"],
        ["Estensione di scala", "Da pochi centimetri fino a 10.000 metri con auto-zoom"],
        ["Opzioni di salvataggio", "Download PNG in alta definizione e link condivisibili (7 giorni)"],
        ["Costo e registrazione", "0,00 € per sempre — senza abbonamenti né carte di credito"]
      ]
    },
    section8: {
      title: "Domande Frequenti sul Confronto Altezza",
      description: "Risposte autorevoli a dubbi comuni su proporzioni, conversioni e fonti",
      badge: "CENTRO ASSISTENZA"
    },
    section9: {
      eyebrow: "Risorse",
      title: "Strumenti e Calcolatori Online Dedicati all'Altezza",
      launchTool: "Apri Strumento",
      privacyTitle: "Tutela dei Dati e Diritti Utente",
      privacyText: "Non vendiamo le tue informazioni personali a terze parti. Ai sensi del GDPR e delle normative sulla privacy, puoi richiedere la cancellazione dei dati in qualsiasi momento. Consulta la nostra ",
      privacyLink: "Informativa sulla Privacy",
      privacyTextEnd: " o contattaci. L'uso ordinario dello strumento non raccoglie dati personali.",
      cards: [
        {
          label: "Calcolatore di Differenza Altezza",
          desc: "Differenza esatta in cm e pollici, scarto percentuale e tabella per coppie.",
          badge: "Strumento",
          href: "/height-difference-calculator"
        },
        {
          label: "Calcolatore Percentili Altezza e Peso",
          desc: "Confronta le tue misure con le curve di crescita OMS e CDC per età e sesso.",
          badge: "Strumento",
          href: "/height-weight-percentile-calculator"
        },
        {
          label: "Calcolatore del Peso Corporeo Ideale",
          desc: "Formule di Devine, Robinson e Hamwi con fasce di peso corporeo sano.",
          badge: "Strumento",
          href: "/ideal-body-weight-calculator"
        },
        {
          label: "Calcolatore Immagine in Altezza",
          desc: "Misura la statura partendo da una foto senza bisogno del metro da sarto.",
          badge: "Strumento",
          href: "/image-to-height"
        },
        {
          label: "Calcolatore Previsione Altezza Bambini",
          desc: "Stima la futura statura da adulti nei ragazzi con il metodo scientifico Khamis-Roche.",
          badge: "Strumento",
          href: "/height-predictor"
        }
      ]
    }
  },
  imageToHeight: {
    hero: {
      eyebrow: "Immagine in altezza",
      title: "Misura la Tua Altezza da una Foto. ",
      titleAccent: "Senza Metro da Sarto.",
      description: "Carica una foto a figura intera con una porta, un foglio A4 o una carta di credito nell'inquadratura. Seleziona l'oggetto di riferimento, digita la sua dimensione reale e traccia una linea da terra alla testa. Scopri la tua altezza in centimetri e piedi/pollici con scarto di 1-2 cm. Gratuito, senza registrazione, su ogni dispositivo.",
      badgeFree: "Gratuito",
      badgeNoAccount: "Senza account",
      badgePrivate: "La foto non lascia il tuo dispositivo",
      badgeUnits: "Risultati in cm e ft/in",
      ctaUpload: "Carica Foto e Misura Ora",
      accuracyNotice: "Accurato a 1–2 cm. 100% privato. Elaborato nel browser.",
      prepTitle: "Controlla 3 dettagli prima dello scatto:",
      prep1: "Figura intera nella foto, dalla testa ai piedi con il pavimento visibile.",
      prep2: "Rimani a ridosso della stessa parete dell'oggetto di riferimento.",
      prep3: "Telefono dritto e a bolla, approssimativamente ad altezza bacino."
    },
    howItWorks: {
      eyebrow: "Cinque tocchi, una foto",
      title: "Come Funziona lo Strumento: Passo dopo Passo",
      description: "Una fotografia racchiude le proprie proporzioni quando contiene un oggetto a misura nota. Indica tale misura e lo strumento calcolerà l'altezza di chiunque compaia a fianco.",
      stepPrefix: "Passo",
      steps: [
        {
          step: "01",
          title: "Carica una foto a figura intera",
          desc: "Scegli un'immagine dove la persona sia visibile da testa a piedi, vicino a una porta, un foglio A4 o una tessera. Lo stipite è il riferimento più affidabile."
        },
        {
          step: "02",
          title: "Ritaglia e conferma",
          desc: "Regola i bordi per inquadrare bene la persona e la misura di riferimento, quindi tocca 'Applica ritaglio'."
        },
        {
          step: "03",
          title: "Seleziona la misura dell'oggetto",
          desc: "Tocca le due estremità della porta o della tessera. Scegli Porta (203 cm), Carta di credito (8,56 cm), Foglio A4 (29,7 cm), 1 metro o inserisci una cifra personalizzata."
        },
        {
          step: "04",
          title: "Tocca piedi e testa",
          desc: "Disegna una linea dal pavimento sotto i piedi fino alla sommità del capo. Parti dal pavimento, non dalla suola. Oppure usa la scansione automatica AI."
        },
        {
          step: "05",
          title: "Leggi l'altezza e salvala",
          desc: "La tua altezza comparirà in centimetri e in piedi/pollici. Tocca 'Salva' per conservarla e confrontarla con altri."
        }
      ]
    },
    whatYouCanMeasure: {
      eyebrow: "Oltre la tua sola statura",
      title: "Cosa Puoi Misurare Partendo da una Foto",
      description: "Qualsiasi persona o elemento è misurabile, purché il riferimento noto sia alla medesima distanza dall'obiettivo.",
      items: [
        {
          title: "Te stesso, senza l'aiuto di nessuno",
          desc: "Appoggia il telefono ad altezza vita, imposta l'autoscatto e posizionati vicino a una porta o a un foglio A4 attaccato al muro."
        },
        {
          title: "I tuoi figli durante la crescita",
          desc: "Fotografa tuo figlio accanto alla stessa porta ogni pochi mesi e monitora lo sviluppo. Poi controlla la sua ",
          linkLabel: "previsione di altezza adulta"
        },
        {
          title: "Persone in vecchie fotografie",
          desc: "Foto di famiglia, squadre sportive o celebrità funzionano benissimo purché vi sia un oggetto standard visibile."
        },
        {
          title: "Mobili e varchi",
          desc: "Fissa un foglio A4 accanto a una libreria o un frigorifero per misurarne l'altezza prima di un acquisto o trasloco."
        },
        {
          title: "Alberi, recinzioni e cancelli",
          desc: "Mettiti a fianco e imposta la tua stessa altezza come valore noto. Allontanati finché entrate entrambi nell'inquadratura tenendo il telefono dritto."
        }
      ],
      whyArTitle: "Perché una foto invece di un'app di realtà aumentata (AR)?",
      why1Bold: "Misura immagini del passato:",
      why1Desc: " Le app AR misurano solo ciò che hai davanti adesso. Con una foto puoi misurare scatti storici e ricordi di famiglia.",
      why2Bold: "Zero installazione:",
      why2Desc: " Funziona direttamente in ogni browser moderno su iOS, Android, Mac o PC senza installare app.",
      why3Bold: "Privacy protetta:",
      why3Desc: " La foto rimane al sicuro nella memoria locale del browser e non viene mai caricata su server esterni."
    },
    referenceObjects: {
      eyebrow: "Calibrazione",
      title: "Quale Oggetto di Riferimento Scegliere",
      description: "Più è affidabile la grandezza dell'oggetto noto, più precisa sarà la misura calcolata. Gli oggetti normati offrono risultati ripetibili.",
      thObject: "Oggetto",
      thSize: "Misura da inserire",
      thStandard: "Dimensione standard?",
      thBestFor: "Ideale per",
      rows: [
        {
          object: "Foglio A4 (lato lungo)",
          size: "29,7 cm",
          standard: "Sì, ISO 216",
          bestFor: "Attaccato al muro vicino alla persona"
        },
        {
          object: "Carta di credito (lato lungo)",
          size: "8,56 cm",
          standard: "Sì, ISO/IEC 7810",
          bestFor: "Foto da vicino. Date le dimensioni ridotte, tocca gli angoli con cura."
        },
        {
          object: "Porta standard",
          size: "203 cm (comune)",
          standard: "No, cambia a seconda della casa",
          bestFor: "Foto a figura intera, dopo aver verificato la porta la prima volta"
        }
      ]
    },
    accuracy: {
      eyebrow: "Rilievi e test di precisione",
      title: "Come Ottenere una Misura Precisa da una Foto",
      description: "Posizionarsi troppo avanti rispetto all'oggetto e inclinare il telefono provocano quasi tutti gli errori. Tieni il dispositivo a bolla e resta vicino alla parete.",
      tiltLowTitle: "In basso, puntato verso l'alto",
      tiltLowBadge: "Stima per eccesso",
      tiltLowDesc: "La sommità è più lontana dall'obiettivo e rimpicciolisce, facendo apparire la porta più bassa (+2,4 a +4,5 cm di errore).",
      tiltLevelTitle: "A livello, ad altezza cintura",
      tiltLevelBadge: "Risultato ottimale",
      tiltLevelDesc: "Il telefono punta frontalmente verso la parete, preservando le corrette proporzioni prospettiche (0,0 cm di errore).",
      tiltHighTitle: "In alto, puntato verso il basso",
      tiltHighBadge: "Stima per difetto",
      tiltHighDesc: "Il pavimento è più lontano e si riduce nell'immagine, facendo sembrare la porta più alta (−2,8 a −5,9 cm di errore).",
      tableTitle: "Nostro test comparativo controllato (14 ambientazioni)",
      tableDesc: "Abbiamo esaminato 14 ambientazioni con altezze certe a 3,5 metri per isolare l'inclinazione prospettica dall'accuratezza del tocco su schermo.",
      thSetup: "Inquadratura",
      thTrueHeight: "Altezza reale",
      thMeasured: "Misurata",
      thError: "Scarto",
      benchmarkRows: [
        {
          setup: "Smartphone a livello a 60, 100 o 130 cm, persona a ridosso del muro vicino alla porta",
          trueHeight: "172 cm",
          measured: "172,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Identica impostazione per bambino di 120 cm e adulto di 190 cm",
          trueHeight: "120, 190 cm",
          measured: "120,0, 190,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Smartphone inclinato di 10° verso l'alto da 60 cm",
          trueHeight: "172 cm",
          measured: "174,4 cm",
          error: "+2,4 cm"
        },
        {
          setup: "Smartphone inclinato di 20° verso l'alto da 40 cm",
          trueHeight: "172 cm",
          measured: "176,5 cm",
          error: "+4,5 cm"
        },
        {
          setup: "Smartphone inclinato di 10° verso il basso da 160 cm",
          trueHeight: "172 cm",
          measured: "169,2 cm",
          error: "−2,8 cm"
        },
        {
          setup: "Smartphone inclinato di 20° verso il basso da 180 cm",
          trueHeight: "172 cm",
          measured: "166,1 cm",
          error: "−5,9 cm"
        },
        {
          setup: "Foglio A4 come riferimento, telefono inclinato di 10° verso l'alto",
          trueHeight: "172 cm",
          measured: "176,8 cm",
          error: "+4,8 cm"
        },
        {
          setup: "Persona posizionata 30 cm davanti alla porta",
          trueHeight: "172 cm",
          measured: "188,1 cm",
          error: "+16,1 cm"
        },
        {
          setup: "Persona posizionata 60 cm davanti alla porta",
          trueHeight: "172 cm",
          measured: "207,6 cm",
          error: "+35,6 cm"
        }
      ],
      pixelSensitivityBold: "Sensibilità del tocco:",
      pixelSensitivityDesc: " Toccare fuori asse genera imprecisione, e con oggetti piccoli l'errore aumenta. Sullo schermo, mancare l'estremità di 1 pixel sposta il calcolo di 1 cm con una porta, 7 cm con un A4 e 23 cm con una tessera. Scegli il riferimento più grande e ingrandisci prima di toccare.",
      tips: [
        {
          title: "Non inclinare il telefono",
          desc: "L'inclinazione è la causa principale di errore. Tieni il telefono diritto ad altezza bacino e allontanati fino a inquadrare dalla testa ai piedi."
        },
        {
          title: "Posizione dell'oggetto",
          desc: "Resta a contatto con la stessa parete dell'oggetto, mai più avanti. Spostarsi avanti di soli 30 cm ha aggiunto 16 cm fittizi nei test."
        },
        {
          title: "Postura corretta",
          desc: "Talloni a terra, schiena dritta e sguardo orizzontale. Difetti di postura nello scatto comportano gli stessi errori di una misurazione classica."
        },
        {
          title: "Corpo intero visibile",
          desc: "Tagliare piedi o testa non consente di calcolare il dislivello completo. Un'inquadratura nitida garantisce il risultato migliore."
        }
      ]
    },
    noTapeMethods: {
      eyebrow: "Metodi alternativi",
      title: "Come Misurare la Propria Altezza Senza Metro",
      description: "Cinque soluzioni funzionali quando non si dispone di un metro da sarto o a nastro.",
      methods: [
        {
          id: "wall-a4",
          title: "Metodo del segno al muro e foglio A4",
          tags: ["Libro rigido", "Foglio A4", "Matita"],
          desc: "Fai un segno della tua altezza con un libro rigido. Appoggia il lato lungo di un foglio A4 (29,7 cm) dal pavimento in su, segna dove arriva e risali fino al tuo segno. Moltiplica i fogli per 29,7 cm e usa un foglio piegato a metà (14,85 cm) per lo scarto finale."
        },
        {
          id: "door",
          title: "Metodo dello stipite della porta",
          tags: ["Una porta"],
          desc: "Le porte standard misurano spesso tra i 200 e i 203 cm. Mettiti sotto lo stipite, controlla dove arriva la testa e ottieni una stima rapida."
        },
        {
          id: "arm-span",
          title: "Metodo dell'apertura delle braccia",
          tags: ["Un aiutante o una parete"],
          desc: "L'apertura delle braccia da punta a punta dei medi corrisponde quasi al millimetro alla propria altezza (scarto medio inferiore a 2,5 cm)."
        },
        {
          id: "phone",
          title: "Metodo dell'app dello smartphone",
          tags: ["Uno smartphone"],
          desc: "Sugli iPhone e iPad compatibili, l'app Metro di Apple calcola l'altezza delle persone. Con altri telefoni, basta scattare una foto e usare il nostro tool."
        },
        {
          id: "dollar",
          title: "Metodo delle banconote",
          tags: ["Banconote"],
          desc: "Le banconote hanno dimensioni fisse (5 € = 12 cm, 20 € = 13,3 cm; il dollaro = 15,6 cm). Puoi disporle verticalmente fino al tuo segno sul muro."
        }
      ],
      footer: "Tutti questi metodi offrono una buona approssimazione, ma una foto opportunamente calibrata rimane la via più solida."
    },
    clinicMethod: {
      eyebrow: "Standard medico",
      title: "Come Misurare l'Altezza con Precisione: Il Metodo Clinico",
      description: "Adattato dai protocolli clinici con statimetro (linee guida CDC) per la massima accuratezza a casa.",
      steps: [
        "Togli scarpe, indumenti pesanti, cappelli e fasce, sciogliendo acconciature alte.",
        "Mettiti su un pavimento piano e solido (piastrelle o parquet, niente tappeti) appoggiato a una parete liscia senza battiscopa sporgente.",
        "Piedi uniti e piatti a terra, gambe tese, braccia lungo i fianchi e spalle orizzontali.",
        "Tocca la parete con la parte posteriore della testa, scapole, glutei e talloni (in base alla corporatura non tutti i punti toccheranno assieme).",
        "Guarda dritto davanti a te. Fai scendere un libro rigido o una squadra ad angolo retto con la parete fin sopra la testa e segna con una matita.",
        "Misura dal pavimento al segno con un metro a nastro metallico, al millimetro. Senza metro, usa un foglio A4 o il nostro tool."
      ],
      whyAloneTitle: "Perché Misurarsi da Soli Porta Quasi Sempre a Errori",
      errorCauses: [
        {
          title: "Incurvarsi",
          desc: "Ci si piega leggermente senza volerlo nel tentativo di tenere un libro in equilibrio sulla testa."
        },
        {
          title: "Libro inclinato",
          desc: "Il libro o la riga non viene mantenuto a 90° esatti con la parete."
        },
        {
          title: "Metro non dritto",
          desc: "Il metro a nastro flette o scorre storto lungo la parete."
        },
        {
          title: "Orario del giorno",
          desc: "La compressione dei dischi della colonna vertebrale fa perdere fino a 1 cm di statura tra mattina e sera."
        }
      ],
      whyAloneFooter: "Fare tutto da soli è scomodo: stare dritti, posizionare il libro e tracciare la linea. Una foto con oggetto noto elimina il bisogno di un aiutante."
    },
    faq: {
      badge: "CENTRO ASSISTENZA",
      title: "Domande Frequenti",
      items: [
        {
          id: "how-accurate-is-height-measurement-from-a-photo",
          q: "Quanto è precisa la misurazione dell'altezza da una foto?",
          a: "Dipende dallo scatto. Nei test su 14 ambientazioni calibrate, un telefono a livello con la persona al muro ha misurato l'altezza reale esatta. Inclinare di 10°-20° ha introdotto da 2 a 6 cm di scarto, e avanzare di 30 cm ha aggiunto 16 cm errati. Con buoni scatti, l'errore resta regolarmente contenuto tra 1 e 2 cm."
        },
        {
          id: "what-is-the-best-object-to-use-for-calibration",
          q: "Qual è l'oggetto migliore per calibrare?",
          a: "Un foglio A4 (29,7 cm di lunghezza) o una carta di credito (8,56 cm) sono standard internazionali ISO validi ovunque. Una porta interna (spesso 203 cm) è ottima per figure intere, verificandone la misura la prima volta."
        },
        {
          id: "is-my-photo-uploaded-or-stored",
          q: "La mia foto viene caricata o conservata sui server?",
          a: "No. Il software viene eseguito interamente nel tuo browser. L'immagine non lascia mai il tuo smartphone o PC."
        },
        {
          id: "can-i-measure-someone-elses-height-from-a-photo",
          q: "Posso misurare l'altezza di un'altra persona da una foto?",
          a: "Sì. Basta caricare qualsiasi immagine in cui compaia vicino a un oggetto a grandezza nota, calibrare e tracciare la linea anche se la persona non è presente."
        },
        {
          id: "does-it-work-for-celebrities",
          q: "Funziona anche per i personaggi famosi?",
          a: "Sì, se la foto ritrae la celebrità accanto a una porta o a un elemento di scala nota, in prospettiva frontale."
        },
        {
          id: "why-do-i-measure-taller-in-the-morning",
          q: "Perché siamo più alti al mattino?",
          a: "I dischi intervertebrali si schiacciano durante il giorno a causa del peso corporeo, riducendo l'altezza fino a un centimetro la sera."
        },
        {
          id: "do-i-need-an-account",
          q: "Devo creare un account?",
          a: "No. Lo strumento è gratis, non richiede registrazioni e funziona su qualsiasi dispositivo."
        }
      ]
    },
    tool: {
      step1Calibration: "Passo 1: Calibrazione",
      step2Measure: "Passo 2: Misura persona",
      tapOtherEnd: "Tocca l'altra estremità per completare",
      drawCalibLine: "Disegna la linea di calibrazione toccando lo schermo",
      drawMeasLine: "Fai clic su 'Auto Scan' o traccia una linea dalla testa ai piedi",
      cancel: "Annulla",
      done: "Fine"
    }
  },
  heightDifference: {
    intro: {
      heroCtaButton: "Calcola Differenza Ora",
      heroBadgeFree: "Gratuito e illimitato",
      heroBadgeNoSignup: "Senza registrazione",
      heroBadgeUnits: "Metrico & Imperiale"
    },
    howToCalculate: {
      personAValue: "Alex: 170 cm",
      personBValue: "Ben: 185 cm",
      differenceValue: "15 cm (5,9 in)"
    },
    percentage: {
      heightDiffValue: "15 cm",
      tallerHeightValue: "185 cm",
      calculationValue: "(15 ÷ 185) × 100",
      percentDiffValue: "8,1%",
      p3: "Questa distinzione conta molto: nel valutare le differenze di statura in una coppia o tra sportivi, il rapporto percentuale offre una percezione molto più precisa del solo divario in centimetri.",
      p4: "La medesima differenza in cm corrisponde a una percentuale inferiore man mano che le stature salgono. Un divario di 10 cm equivale al 6,3% con il più alto a 160 cm, e al 5,3% a 190 cm.",
      duoShorterLabel: "Rispetto alla persona più bassa",
      duoShorterValue: "8,8% più alto",
      duoShorterEq: "(15 ÷ 170) × 100 = 8,82%",
      duoTallerLabel: "Rispetto alla persona più alta",
      duoTallerValue: "8,1% più basso",
      duoTallerEq: "(15 ÷ 185) × 100 = 8,11%"
    },
    couple: {
      statAvgGapLabel: "Differenza media, coppie UK",
      statAvgGapValue: "14,1 cm",
      statAvgGapSub: "5,6 in",
      statAvgGapSampleSize: "12.502 coppie",
      statManTallerLabel: "Uomo più alto",
      statManTallerValue: "92,5%",
      statManTallerSub: "delle coppie nell'indagine",
      distTableCaption: "Distribuzione delle coppie per scarto di statura",
      tableHeaderGap: "Uomo più alto di",
      tableHeaderShare: "Quota delle coppie",
      bandWomanTaller: "Donna più alta",
      band0to5: "0 a 5 cm",
      band5to10: "5 a 10 cm",
      band10to15: "10 a 15 cm",
      band15to20: "15 a 20 cm",
      band20to25: "20 a 25 cm",
      band25to30: "25 a 30 cm",
      bandOver30: "Oltre 30 cm"
    }
  }
};

// ==========================================
// DUTCH (nl)
// ==========================================
const nlData = {
  home: {
    intro: {
      h1: "Lengte Vergelijken Calculator: Vergelijk Lengtes Online met Visuele Grafiek",
      p: "Gebruik deze tool om lengtes naast elkaar te bekijken op een nauwkeurige schaalgrafiek. Voer elke lengte in centimeters of feet en inches in om direct het verschil te zien. De tool toont een visuele vergelijking met proportionele schaling. De grafiek past zich in real-time aan en tekent elke figuur op basis van de ingevoerde waarden.",
      freeLibraryBadge: "Gratis Online Bibliotheek",
      freeLibraryDesc: "Krijg toegang tot onze database met kant-en-klare referentielengtes in drie collecties, maak onbeperkt vergelijkingen en download hoge-resolutie PNG-afbeeldingen.",
      noAccounts: "Geen account",
      noPayments: "Geen kosten",
      free100: "100% Gratis",
      compareNowCta: "Nu vergelijken ↑"
    },
    section1: {
      eyebrow: "Hoe het werkt",
      title: "Hoe Werkt een Lengtevergelijkingsgrafiek?",
      p1: "Een lengtevergelijkingsgrafiek zet ruwe afmetingen om in een visueel diagram waarin elke figuur exact de wiskundige verhouding op ware schaal weergeeft.",
      p2: "Als Persoon A 170 cm is en Persoon B 185 cm, wordt het tweede figuur precies 1,09 keer zo hoog getekend. Een verschil van 10 cm bij 160 cm toont proportioneel heel anders dan bij 190 cm — de grafiek maakt dat onderscheid direct zichtbaar zonder rekenwerk.",
      p3: "Ideaal voor gezinnen, sportteams of creatieve tekenprojecten.",
      imgAlt: "Lengtevergelijkingsgrafiek van een persoon van 170 cm en een van 185 cm naast elkaar",
      imgCaption: "Alex met 170 cm (5'7\") en Ben met 185 cm (6'1\"), op schaal getekend.",
      needGapTitle: "Heb je alleen het exacte lengteverschil nodig?",
      needGapDesc: "De Lengteverschil Calculator toont het precieze verschil in cm en inches, het percentage en een visuele balk. Handig wanneer je direct een getal zoekt.",
      needGapCta: "Open Lengteverschil Calculator"
    },
    section2: {
      eyebrow: "Stap voor stap",
      title: "Online Lengtes Vergelijken: Handleiding voor Beginners",
      step1Title: "Stap 1: Kies je vergelijking",
      step1Desc: "Bepaal wie je wilt vergelijken: vrienden, jezelf met een beroemdheid, anime-karakters of gebouwen. Werkt in cm en ft/in met directe omzetting.",
      guidebookNoteLabel: "Bronvermelding:",
      guidebookNoteText: "Zoek in onze database met beroemdheden of fictieve figuren. Alle lengtes zijn gebaseerd op officiële databoeken en publicaties.",
      panelPeople: "Personen",
      panelCelebrities: "Beroemdheden",
      panelCharacters: "Personages",
      panelObjects: "Objecten",
      step2Title: "Stap 2: Bouw je lengtegrafiek",
      step2Desc: "Typ namen, kies kleuren en vul maten in. De schaal reikt tot 10.000 meter (32.808 ft), zodat je iemand kunt vergelijken met de Eiffeltoren of de Mount Everest.",
      panels: [
        { label: "Persoon toevoegen", desc: "Naam, geslacht, lengte in cm of ft/in en eigen kleur." },
        { label: "Beroemdheden", desc: "Sporters, acteurs en historische iconen wereldwijd." },
        { label: "Fictie", desc: "Anime, cartoons en superhelden uit officiële naslagwerken." },
        { label: "Objecten & Gebouwen", desc: "Dieren, beroemde bouwwerken en bergtoppen." }
      ],
      step3Title: "Stap 3: Zie het verschil en deel",
      step3Desc: "Elke figuur toont naam en lengte. Het verschil valt meteen op. Download een scherpe PNG of deel een directe link die 7 dagen actief blijft."
    },
    section3: {
      eyebrow: "Waarom gebruiken",
      title: "Waarom een Visuele Grafiek Meer Zegt dan Cijfers",
      description: "Een visuele vergelijking toont de wiskundige verhouding op ware schaal, waardoor lengteverschillen direct begrijpelijk worden.",
      card1Title: "Proportionele schaal toont wat cijfers verbergen",
      card1Desc: "Een verschil van 12 cm op 160 cm is verhoudingsgewijs groter dan op 190 cm. De balken tonen dat meteen. Voor het exacte getal, open de ",
      card1Link: "Lengteverschil Calculator",
      card2Title: "Vergelijk jezelf met iedereen en alles",
      card2Desc: "Voeg je eigen lengte toe en plaats er een filmster, stripheld of berg naast — allemaal op dezelfde schaalas.",
      card3Title: "Personagevergelijking voor tekenaars en schrijvers",
      card3Desc: "Creatieven visualiseren verhoudingen tussen karakters volgens officiële productiespecificaties.",
      card4Title: "Geen handmatige omrekeningen",
      card4Desc: "Vul in wat je wilt: cm of ft/in. Aftrekkingen, verhoudingen en percentages worden direct berekend.",
      card5Title: "Ware schaal geeft menselijke afmetingen context",
      card5Desc: "Plaats een mens van 175 cm naast de Mount Everest (8.848 m) om de grootsheid van de natuur te ervaren.",
      card6Title: "Download met één klik",
      card6Desc: "Download PNG-bestanden of maak deelbare links voor sociale media, fora en presentaties."
    },
    section4: {
      eyebrow: "Toepassingen",
      title: "Lengtes Vergelijken: Voorbeelden en Praktijksituaties",
      description: "Alledaagse situaties waarin visuele schaling meteen duidelijkheid biedt.",
      useCases: [
        {
          tag: "KOPPELS EN VRIENDEN",
          quote: "“Wacht eens, hoeveel langer ben jij nou precies dan ik?”",
          desc: "Vul beide lengtes in en zie de exacte afstand op een proportionele grafiek. 10 cm verschil zie je meteen.",
          try: "165 CM + 178 CM · 13 CM VERSCHIL (7,9%)"
        },
        {
          tag: "SPORT EN ATLETEN",
          quote: "“Wie heeft hier nou echt het lengtevoordeel?”",
          desc: "Vergelijk basketbalspelers uit de NBA of klimmers om het werkelijke fysieke voordeel te zien.",
          try: "NBA-SPELER 200 CM · NFL-LINEBACKER 188 CM · KLIMMER 174 CM"
        },
        {
          tag: "ANIME EN FICTIE",
          quote: "“De wiki noemt een getal, maar hoe ziet dat er samen uit?”",
          desc: "Anime-helden op geverifieerde schaal: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) en Levi (160 cm).",
          try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
        },
        {
          tag: "OBJECTEN EN GEBOUWEN",
          quote: "“Ik had geen idee dat het in werkelijkheid zo gigantisch was.”",
          desc: "Plaats iemand naast de Angel Falls (979 m), een kamerdeur (203 cm) of een plafond van 2,60 m.",
          try: "MENS 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8.848 M"
        },
        {
          tag: "IK VS BEROEMDHEDEN",
          quote: "“Zijn zij nou echt precies even lang als ik?”",
          desc: "Vergelijk je met Tom Cruise, The Rock of Taylor Swift op basis van geverifieerde biografieën.",
          try: "JIJ + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
        },
        {
          tag: "INTERIEUR EN ONTWERP",
          quote: "“Past deze kast eigenlijk wel mooi in mijn kamer?”",
          desc: "Voeg een deurkozijn of plafondhoogte toe naast een persoon voordat je meubels aanschaft.",
          try: "PERSOON 185 CM · DEUR 203 CM · PLAFOND 260 CM"
        }
      ],
      tableTitle: "Lengteverschil tabel in feet, inches en centimeters",
      tableDesc: "Zeven praktische voorbeelden om koppels en personen te vergelijken in centimeters en percentages."
    },
    section5: {
      eyebrow: "Voordelen",
      title: "Waarom Kiezen voor Onze Lengtevergelijker?",
      description: "Professionele opties. Geen drempels. Geen account nodig.",
      features: [
        {
          title: "Directe lengtegenerator",
          desc: "De grafiek past zich direct aan terwijl je typt, zonder herladen."
        },
        {
          title: "Aanpasbare figuren",
          desc: "Zes kleuren en man/vrouw stijlen houden het overzichtelijk bij 10+ personen."
        },
        {
          title: "Beroemdhedenoverzicht",
          desc: "1.294 bekende personen uit sport, film en muziek opgenomen in de database."
        },
        {
          title: "Fictieve personages",
          desc: "1.138 figuren uit anime, strips en games volgens officiële boeken."
        },
        {
          title: "Objecten en bouwwerken",
          desc: "264 natuurmonumenten, dieren en bouwwerken op ware schaal."
        },
        {
          title: "Meting via foto",
          desc: "Upload een foto en plaats echte personen proportioneel in de grafiek."
        },
        {
          title: "Heldere PNG-export",
          desc: "Download afbeeldingen in hoge resolutie, onbeperkt en gratis."
        },
        {
          title: "Deelbare links",
          desc: "Maak een directe link naar je grafiek die 7 dagen geldig blijft zonder inloggen."
        }
      ]
    },
    section6: {
      eyebrow: "Nauwkeurigheid",
      title: "Hoe Betrouwbaar is de Lengtevergelijking?",
      items: [
        {
          title: "Exacte schaalberekening",
          desc: "Elke figuur wordt getekend volgens de precieze invoer: 170 cm is exact 170,00 punten op het scherm."
        },
        {
          title: "Referentiewaarden",
          desc: "Openbare bronnen kunnen verschillen; we hanteren altijd de meest recente betrouwbare bron."
        },
        {
          title: "Gegevens van beroemdheden",
          desc: "Afkomstig uit biografieën en officiële documenten, geen schattingen van fans."
        },
        {
          title: "Originele bronnen",
          desc: "Personagelengths komen uit geautoriseerde databoeken en productiedocumenten."
        },
        {
          title: "Architectuur en dieren",
          desc: "Bouwwerken gecontroleerd volgens bouwplannen. Dieren worden gemeten aan de schoft (schouder)."
        }
      ]
    },
    section7: {
      eyebrow: "Overzicht",
      title: "Ontworpen voor Eenvoud",
      description: "Alles wat je nodig hebt om lengtes te vergelijken zonder gedoe.",
      thFeature: "Functionaliteit",
      thFree: "Wat je gratis krijgt",
      rows: [
        ["Personen per grafiek", "Onbeperkt — allemaal op dezelfde schaalas"],
        ["Kant-en-klare lengtes", "2.696 opties (1.294 beroemdheden, 1.138 karakters, 264 objecten)"],
        ["Ondersteunde eenheden", "Centimeters, meters, feet en inches (direct wisselen)"],
        ["Schaalbereik", "Van enkele centimeters tot 10.000 meter met automatische zoom"],
        ["Exportopties", "PNG-download en deelbare links (7 dagen geldig)"],
        ["Kosten en account", "€ 0,00 voor altijd — geen abonnementen of creditcards"]
      ]
    },
    section8: {
      title: "Veelgestelde Vragen over Lengte Vergelijken",
      description: "Antwoorden van experts op vragen over schaal, eenheden en bronnen",
      badge: "HELPCENTRUM"
    },
    section9: {
      eyebrow: "Ontdekken",
      title: "Online Hulpmiddelen & Rekenmachines voor Lengte",
      launchTool: "Start Tool",
      privacyTitle: "Privacy & Gegevensrechten",
      privacyText: "Wij verkopen je persoonlijke gegevens niet aan derden. Onder de AVG heb je recht op inzage en verwijdering. Bekijk ons ",
      privacyLink: "Privacybeleid",
      privacyTextEnd: " of neem contact op. Normaal gebruik van de tool verzamelt geen persoonsgegevens.",
      cards: [
        {
          label: "Lengteverschil Calculator",
          desc: "Exact verschil in cm en inches, percentage en koppeltabel.",
          badge: "Tool",
          href: "/height-difference-calculator"
        },
        {
          label: "Lengte en Gewicht Percentiel Calculator",
          desc: "Vergelijk je waarden met WHO- en CDC-groeicurves naar leeftijd en geslacht.",
          badge: "Tool",
          href: "/height-weight-percentile-calculator"
        },
        {
          label: "Ideaal Lichaamsgewicht Calculator",
          desc: "Formules van Devine, Robinson en Hamwi naast gezonde gewichtstabellen.",
          badge: "Tool",
          href: "/ideal-body-weight-calculator"
        },
        {
          label: "Foto naar Lengte Calculator",
          desc: "Meet je lengte vanaf een foto zonder dat je een meetlint nodig hebt.",
          badge: "Tool",
          href: "/image-to-height"
        },
        {
          label: "Lengte Voorspeller voor Kinderen",
          desc: "Bereken de volwassen lengte van kinderen volgens Khamis-Roche.",
          badge: "Tool",
          href: "/height-predictor"
        }
      ]
    }
  },
  imageToHeight: {
    hero: {
      eyebrow: "Afbeelding naar lengte",
      title: "Meet Je Lengte Vanaf een Foto. ",
      titleAccent: "Geen Meetlint Nodig.",
      description: "Upload een foto van top tot teen met een deur, A4-tje of pinpas in beeld. Duid het referentie-object aan, vul de werkelijke maat in en trek een lijn van de vloer naar je kruin. Ontvang je lengte in centimeters en feet/inches met 1 tot 2 cm nauwkeurigheid. Gratis, zonder registratie op elk apparaat.",
      badgeFree: "Gratis",
      badgeNoAccount: "Zonder account",
      badgePrivate: "Foto blijft op je toestel",
      badgeUnits: "In cm en ft/in",
      ctaUpload: "Foto Uploaden en Nu Meten",
      accuracyNotice: "Nauwkeurig tot 1–2 cm. 100% privé. Werkt in de browser.",
      prepTitle: "Check 3 dingen voor je de foto maakt:",
      prep1: "Hele lichaam in beeld, van hoofd tot voeten met de vloer zichtbaar.",
      prep2: "Sta tegen dezelfde muur als het referentie-object.",
      prep3: "Telefoon rechtop en waterpas gehouden, rond heuphoogte."
    },
    howItWorks: {
      eyebrow: "Vijf stappen, één foto",
      title: "Hoe de Tool Werkt: Stap voor Stap",
      description: "Een foto behoudt zijn eigen schaal als er een voorwerp van bekende grootte op staat. Geef de maat door en de tool meet iedereen die ernaast staat.",
      stepPrefix: "Stap",
      steps: [
        {
          step: "01",
          title: "Upload een foto van top tot teen",
          desc: "Kies een foto van het hele lichaam naast een deur, A4-papier of pasje. Een deurpost is het meest betrouwbaar."
        },
        {
          step: "02",
          title: "Bijsnijden en bevestigen",
          desc: "Pas de randen aan zodat de persoon en het voorwerp het beeld goed vullen en klik op 'Uitsnede toepassen'."
        },
        {
          step: "03",
          title: "Markeer de referentie en vul maat in",
          desc: "Tik op beide uiteinden van de deur of het pasje. Kies Deur (203 cm), Pasje (8,56 cm), A4-papier (29,7 cm), 1 meter of typ een eigen maat."
        },
        {
          step: "04",
          title: "Tik op hoofd en voeten",
          desc: "Trek een lijn vanaf de vloer onder de voeten tot aan de kruin. Begin op de vloer, niet op de schoenen. Of gebruik de AI auto-scan."
        },
        {
          step: "05",
          title: "Lees je uitslag en bewaar",
          desc: "Je lengte verschijnt in centimeters en feet/inches. Klik op 'Opslaan in grafiek' om te vergelijken."
        }
      ]
    },
    whatYouCanMeasure: {
      eyebrow: "Meer dan alleen jezelf",
      title: "Wat Je Kunt Meten Vanaf een Foto",
      description: "Alles is meetbaar zolang het bekende voorwerp op dezelfde afstand van de camera staat.",
      items: [
        {
          title: "Jezelf, zonder hulp van anderen",
          desc: "Zet je telefoon op heuphoogte neer, stel de zelfontspanner in en ga naast een deur of vastgeplakt A4-tje staan."
        },
        {
          title: "Kinderen tijdens hun groei",
          desc: "Fotografeer je kind elke paar maanden bij dezelfde deur en houd de groei bij. Bekijk ook de ",
          linkLabel: "voorspelde volwassen lengte"
        },
        {
          title: "Mensen op oude foto's",
          desc: "Familiekiekjes of foto's van sporters naast een deur werken prima zolang er een herkenbaar voorwerp naast staat."
        },
        {
          title: "Meubels en deuropeningen",
          desc: "Plak een A4-tje naast een kast of koelkast om de hoogte op te meten voor een verhuizing of aankoop."
        },
        {
          title: "Bomen, schuttingen en hekken",
          desc: "Ga ernaast staan en vul je eigen lengte in als maat. Neem afstand tot jullie er beiden opstaan terwijl je het toestel recht houdt."
        }
      ],
      whyArTitle: "Waarom een foto in plaats van een augmented reality (AR) app?",
      why1Bold: "Meet het verleden:",
      why1Desc: " AR-apps meten alleen het nu. Een foto maakt het mogelijk om historische foto's en jeugdherinneringen te meten.",
      why2Bold: "Geen installatie:",
      why2Desc: " Werkt gewoon in elke browser op iOS, Android, Mac of pc zonder apps te downloaden.",
      why3Bold: "Volledige privacy:",
      why3Desc: " Je foto blijft op je eigen toestel in de browser en wordt nooit naar servers gestuurd."
    },
    referenceObjects: {
      eyebrow: "Kalibratie-object",
      title: "Welk Voorwerp Je het Beste Kunt Gebruiken",
      description: "Hoe zekerder de maat van het voorwerp, des te betrouwbaarder de uitslag. Gestandaardiseerde voorwerpen geven vaste zekerheid.",
      thObject: "Voorwerp",
      thSize: "In te vullen maat",
      thStandard: "Standaardformaat?",
      thBestFor: "Ideaal voor",
      rows: [
        {
          object: "A4-vel (lange zijde)",
          size: "29,7 cm",
          standard: "Ja, ISO 216",
          bestFor: "Op de muur geplakt naast de persoon"
        },
        {
          object: "Betaalpasje (lange zijde)",
          size: "8,56 cm",
          standard: "Ja, ISO/IEC 7810",
          bestFor: "Dichtbijfoto's. Let goed op de hoeken bij het aantikken."
        },
        {
          object: "Binnendeur",
          size: "203 cm (vaak voorkomend)",
          standard: "Nee, verschilt per huis",
          bestFor: "Volledige lichaamsfoto's, nadat je de deur één keer hebt nagemeten"
        }
      ]
    },
    accuracy: {
      eyebrow: "Praktijktests en nauwkeurigheid",
      title: "Zo Krijg Je een Nauwkeurig Resultaat",
      description: "Voor het object gaan staan en het toestel schuin houden veroorzaken de meeste fouten. Houd het toestel recht en sta strak tegen de muur.",
      tiltLowTitle: "Laag, naar boven gekanteld",
      tiltLowBadge: "Lijkt langer",
      tiltLowDesc: "De bovenkant is verder weg en oogt kleiner, waardoor de deur kleiner lijkt (+2,4 tot +4,5 cm fout).",
      tiltLevelTitle: "Waterpas, op heuphoogte",
      tiltLevelBadge: "Beste resultaat",
      tiltLevelDesc: "Het toestel kijkt recht naar de muur, waardoor de echte verhoudingen behouden blijven (0,0 cm fout).",
      tiltHighTitle: "Hoog, naar beneden gekanteld",
      tiltHighBadge: "Lijkt korter",
      tiltHighDesc: "De vloer is verder weg en lijkt kleiner, waardoor de deur langer lijkt (−2,8 tot −5,9 cm fout).",
      tableTitle: "Onze gecontroleerde precisietest (14 situaties)",
      tableDesc: "We onderzochten 14 gekalibreerde opstellingen op 3,5 meter afstand om camerahoeken te scheiden van tikfouten op het scherm.",
      thSetup: "Foto-opstelling",
      thTrueHeight: "Echte lengte",
      thMeasured: "Gemeten",
      thError: "Verschil",
      benchmarkRows: [
        {
          setup: "Telefoon waterpas op 60, 100 of 130 cm, persoon tegen de muur naast de deur",
          trueHeight: "172 cm",
          measured: "172,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Zelfde situatie voor een kind van 120 cm en volwassene van 190 cm",
          trueHeight: "120, 190 cm",
          measured: "120,0, 190,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Telefoon 10° omhoog gekanteld vanaf 60 cm",
          trueHeight: "172 cm",
          measured: "174,4 cm",
          error: "+2,4 cm"
        },
        {
          setup: "Telefoon 20° omhoog gekanteld vanaf 40 cm",
          trueHeight: "172 cm",
          measured: "176,5 cm",
          error: "+4,5 cm"
        },
        {
          setup: "Telefoon 10° omlaag gekanteld vanaf 160 cm",
          trueHeight: "172 cm",
          measured: "169,2 cm",
          error: "−2,8 cm"
        },
        {
          setup: "Telefoon 20° omlaag gekanteld vanaf 180 cm",
          trueHeight: "172 cm",
          measured: "166,1 cm",
          error: "−5,9 cm"
        },
        {
          setup: "A4-vel als referentie, telefoon 10° omhoog gekanteld",
          trueHeight: "172 cm",
          measured: "176,8 cm",
          error: "+4,8 cm"
        },
        {
          setup: "Persoon staat 30 cm vóór de deur",
          trueHeight: "172 cm",
          measured: "188,1 cm",
          error: "+16,1 cm"
        },
        {
          setup: "Persoon staat 60 cm vóór de deur",
          trueHeight: "172 cm",
          measured: "207,6 cm",
          error: "+35,6 cm"
        }
      ],
      pixelSensitivityBold: "Pixel-nauwkeurigheid:",
      pixelSensitivityDesc: " Scheef aantikken geeft afwijkingen. Op een telefoonscherm verschuift een misplaatst pixel de meting met 1 cm bij een deur, 7 cm bij een A4 en 23 cm bij een pasje. Gebruik de grootste referentie en zoom in.",
      tips: [
        {
          title: "Houd de camera recht",
          desc: "Kantelen is foutoorzaak nummer één. Houd de telefoon rechtop op heuphoogte en neem afstand tot het hele lichaam erop staat."
        },
        {
          title: "Plek van het voorwerp",
          desc: "Sta tegen dezelfde muur als het voorwerp, nooit ervoor. 30 cm naar voren staan voegde al 16 cm neplengte toe."
        },
        {
          title: "Rechte houding",
          desc: "Hakken op de grond, rug recht, blik vooruit. Houdingsfouten op de foto geven dezelfde meetfout als bij een meetlat."
        },
        {
          title: "Hele lichaam zichtbaar",
          desc: "Voeten of hoofd afsnijden maakt meten onmogelijk. Een helder totaalbeeld levert de meest betrouwbare meting op."
        }
      ]
    },
    noTapeMethods: {
      eyebrow: "Alternatieve methoden",
      title: "Je Lengte Meten Zonder Meetlint",
      description: "Vijf manieren die werken als je even geen meetlint bij de hand hebt.",
      methods: [
        {
          id: "wall-a4",
          title: "Muurstreepje en A4-papier methode",
          tags: ["Hard boek", "A4-papier", "Potlood"],
          desc: "Zet met een stevig boek een streepje bij je lengte. Leg de lange kant van een A4 (29,7 cm) vanaf de vloer omhoog, markeer en herhaal tot je streepje. Vermenigvuldig de vellen met 29,7 cm en schat het laatste stukje met een dubbelgevouwen vel (14,85 cm)."
        },
        {
          id: "door",
          title: "Deurkozijn methode",
          tags: ["Een deur"],
          desc: "Standaard binnendeuren zijn vaak 201,5 tot 203 cm hoog. Ga onder het kozijn staan en kijk waar je kruin uitkomt voor een snelle schatting."
        },
        {
          id: "arm-span",
          title: "Armspanwijdte methode",
          tags: ["Iemand die helpt of muur"],
          desc: "Je spanwijdte van middelvinger tot middelvinger met wijdgestrekte armen komt vrijwel exact overeen met je lengte (gemiddeld binnen 2,5 cm)."
        },
        {
          id: "phone",
          title: "Telefoon-app methode",
          tags: ["Een smartphone"],
          desc: "Op geschikte iPhones en iPads meet de Meten-app van Apple de lengte van personen. Op andere telefoons maak je een foto en gebruik je onze tool hierboven."
        },
        {
          id: "dollar",
          title: "Geldbriefjes methode",
          tags: ["Bankbiljetten"],
          desc: "Geldbriefjes hebben vaste maten (een briefje van € 20 is 13,3 cm lang; dollar is 15,6 cm). Stapel ze verticaal op vanaf de vloer tot je streepje."
        }
      ],
      footer: "Elke methode geeft een goede indicatie, maar een gekalibreerde foto levert het meest consistente resultaat."
    },
    clinicMethod: {
      eyebrow: "Klinische standaard",
      title: "Nauwkeurig Lengte Meten: De Klinische Methode",
      description: "Gebaseerd op medische stadiometer-richtlijnen (CDC-protocollen) voor thuis.",
      steps: [
        "Doe schoenen, dikke kleding, petjes en haarspelden uit en doe hoge staarten los.",
        "Ga op een harde vloer staan (tegels of laminaat, geen tapijt) tegen een vlakke muur zonder plint.",
        "Voeten plat en tegen elkaar, benen recht, armen langs het lichaam en schouders ontspannen op gelijke hoogte.",
        "Raak de muur met achterhoofd, schouderbladen, billen en hakken (afhankelijk van lichaamsbouw raakt niet alles tegelijk).",
        "Kijk recht vooruit. Laat een hard boek haaks op de muur zakken tot op de kruin en zet eronder een potloodstreepje.",
        "Meet vanaf de vloer tot het streepje met een metalen rolmaat tot op de millimeter. Zonder rolmaat gebruik je een A4 of onze foto-tool."
      ],
      whyAloneTitle: "Waarom Alleen Meten Vaak Misgaat",
      errorCauses: [
        {
          title: "Inzakken",
          desc: "Je zakt ongemerkt wat in wanneer je zelf een boek op je hoofd balanceert."
        },
        {
          title: "Scheef boek",
          desc: "Het boek wordt niet exact in een hoek van 90° tegen de muur gehouden."
        },
        {
          title: "Slap meetlint",
          desc: "Het meetlint buigt door of loopt schuin langs de muur omhoog."
        },
        {
          title: "Tijdstip op de dag",
          desc: "Door compressie van de tussenwervelschijven ben je 's ochtends tot 1 cm langer dan 's avonds."
        }
      ],
      whyAloneFooter: "Het zelf doen maakt het lastig: rechtop staan, het boek horizontaal houden en tegelijk aftekenen. Een foto met een herkenbaar voorwerp lost dit direct op."
    },
    faq: {
      badge: "HELPCENTRUM",
      title: "Veelgestelde Vragen",
      items: [
        {
          id: "how-accurate-is-height-measurement-from-a-photo",
          q: "Hoe nauwkeurig is lengte meten vanaf een foto?",
          a: "Dat hangt af van de foto. In tests met 14 situaties mat een recht gehouden telefoon bij iemand strak tegen de muur de lengte exact. Een kanteling van 10° tot 20° gaf 2 tot 6 cm afwijking, en 30 cm vóór de deur staan voegde 16 cm neplengte toe. Onder goede omstandigheden zit je altijd binnen 1 tot 2 cm marge."
        },
        {
          id: "what-is-the-best-object-to-use-for-calibration",
          q: "Wat is het beste voorwerp voor de kalibratie?",
          a: "Een A4-tje (29,7 cm) of een betaalpasje (8,56 cm) werken wereldwijd door ISO-normen. Een binnendeur (vaak 201,5 tot 203 cm) is ideaal voor totaalbeelden nadat je hem eenmalig hebt nagemeten."
        },
        {
          id: "is-my-photo-uploaded-or-stored",
          q: "Wordt mijn foto opgeslagen op een server?",
          a: "Nee. De software draait geheel in je eigen webbrowser. De foto verlaat je telefoon of computer niet."
        },
        {
          id: "can-i-measure-someone-elses-height-from-a-photo",
          q: "Kan ik iemand anders meten op een foto?",
          a: "Ja. Upload een foto waarop de ander naast een bekend voorwerp staat, kalibreer en trek de lijn om de lengte te zien."
        },
        {
          id: "does-it-work-for-celebrities",
          q: "Werkt dit ook voor beroemdheden?",
          a: "Ja, mits de foto de beroemdheid toont naast een deur of ander herkenbaar voorwerp van voren gefotografeerd."
        },
        {
          id: "why-do-i-measure-taller-in-the-morning",
          q: "Waarom ben je 's ochtends langer?",
          a: "Tussenwervelschijven veren overdag in door je lichaamsgewicht. Daardoor krimp je tegen de avond tot wel één centimeter."
        },
        {
          id: "do-i-need-an-account",
          q: "Heb ik een account nodig?",
          a: "Nee. De tool is helemaal gratis, vereist geen aanmelding en werkt op elk apparaat."
        }
      ]
    },
    tool: {
      step1Calibration: "Stap 1: Kalibratie",
      step2Measure: "Stap 2: Persoon meten",
      tapOtherEnd: "Tik op het andere uiteinde om te voltooien",
      drawCalibLine: "Teken de kalibratielijn van het voorwerp op het scherm",
      drawMeasLine: "Klik op 'Auto Scan' of teken handmatig een lijn van hoofd tot teen",
      cancel: "Annuleren",
      done: "Klaar"
    }
  },
  heightDifference: {
    intro: {
      heroCtaButton: "Bereken Verschil Nu",
      heroBadgeFree: "Gratis en onbeperkt",
      heroBadgeNoSignup: "Geen registratie",
      heroBadgeUnits: "Metrisch & Imperiaal"
    },
    howToCalculate: {
      personAValue: "Alex: 170 cm",
      personBValue: "Ben: 185 cm",
      differenceValue: "15 cm (5,9 in)"
    },
    percentage: {
      heightDiffValue: "15 cm",
      tallerHeightValue: "185 cm",
      calculationValue: "(15 ÷ 185) × 100",
      percentDiffValue: "8,1%",
      p3: "Dit onderscheid is belangrijk: bij het vergelijken van koppels of sporters geeft het relatieve percentage een veel zuiverder beeld dan alleen de afstand in centimeters.",
      p4: "Hetzelfde verschil in cm vormt een kleiner percentage naarmate de lengtes groter worden. Een verschil van 10 cm staat gelijk aan 6,3% als de langere persoon 160 cm is, en 5,3% bij 190 cm.",
      duoShorterLabel: "Ten opzichte van de kortere persoon",
      duoShorterValue: "8,8% langer",
      duoShorterEq: "(15 ÷ 170) × 100 = 8,82%",
      duoTallerLabel: "Ten opzichte van de langere persoon",
      duoTallerValue: "8,1% korter",
      duoTallerEq: "(15 ÷ 185) × 100 = 8,11%"
    },
    couple: {
      statAvgGapLabel: "Gemiddeld verschil, Britse koppels",
      statAvgGapValue: "14,1 cm",
      statAvgGapSub: "5,6 in",
      statAvgGapSampleSize: "12.502 koppels",
      statManTallerLabel: "Man langer",
      statManTallerValue: "92,5%",
      statManTallerSub: "van de koppels in het onderzoek",
      distTableCaption: "Verdeling van koppels naar lengteverschil",
      tableHeaderGap: "Man langer met",
      tableHeaderShare: "Aandeel koppels",
      bandWomanTaller: "Vrouw langer",
      band0to5: "0 tot 5 cm",
      band5to10: "5 tot 10 cm",
      band10to15: "10 tot 15 cm",
      band15to20: "15 tot 20 cm",
      band20to25: "20 tot 25 cm",
      band25to30: "25 tot 30 cm",
      bandOver30: "Meer dan 30 cm"
    }
  }
};

updateLocale('it', itData);
updateLocale('nl', nlData);

