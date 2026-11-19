// scripts/locales/it.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Aggiungi persona",
      celebrities: "Personaggi famosi",
      fictional: "Finzione",
      entities: "Oggetti",
      addImage: "Aggiungi immagine"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Passa a unità imperiali",
      switchToMetric: "Passa a unità metriche",
      zoomIn: "Ingrandisci",
      zoomOut: "Rimpicciolisci",
      zoomPercentage: "Percentuale zoom",
      autoFit: "Adattamento automatico",
      editList: "Modifica elenco",
      clearAll: "Cancella tutto",
      share: "Condividi",
      generating: "Generazione...",
      copied: "Copiato!",
      error: "Errore",
      linkCopied: "Link copiato.",
      linkExpiry: "I link rimangono attivi per 7 giorni.",
      png: "PNG",
      downloadChart: "Scarica grafico come immagine PNG",
      fullscreen: "Schermo intero",
      exitFullscreen: "Esci da schermo intero"
    },
    canvas: {
      loading: "Caricamento confronto...",
      addPersonPrompt: "Aggiungi una persona per iniziare",
      addPersonAria: "Aggiungi una persona al grafico",
      sameHeight: "Stessa altezza",
      sameHeightBoth: "{name1} e {name2} sono entrambi alti {height}.",
      gapTaller: "{name} è più alto/a del {pct}%",
      gapShorter: "{name} è più basso/a del {pct}%",
      gapSummary: "{taller} è più alto/a del {tallerPct}% rispetto a {shorter} ({shorterPct}% più basso/a).",
      ref: "RIF"
    },
    modal: {
      clearTitle: "Svuota grafico",
      clearDesc: "Rimuovere tutti i soggetti? Questa azione non può essere annullata.",
      cancel: "Annulla",
      clearConfirm: "Cancella tutto"
    },
    form: {
      enterDetails: "Inserisci i tuoi dati",
      editPerson: "Modifica persona",
      male: "Uomo",
      female: "Donna",
      name: "Nome",
      optional: "Opzionale",
      heightLabel: "Altezza (CM/FT)",
      heightPlaceholder: "Altezza",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Stile avatar",
      addPerson: "Aggiungi persona",
      saveChanges: "Salva modifiche",
      cancel: "Annulla"
    },
    personChart: {
      compareAgainst: "Confronta con",
      tallestVsShortest: "Più alto vs Più basso",
      differencesVs: "Differenze rispetto a {name}",
      yourList: "La tua lista",
      reorder: "Riordina",
      edit: "Modifica",
      remove: "Rimuovi"
    },
    quickAdd: {
      quickInsertion: "Inserimento rapido",
      quickAddAria: "Aggiungi rapidamente {name}"
    },
    panels: {
      all: "Tutti",
      celebritiesTitle: "Selezione celebrità",
      celebritiesSub: "Aggiungi icone al tuo grafico comparativo",
      celebritiesSearch: "Cerca per nome o categoria",
      celebritiesLoading: "Caricamento celebrità...",
      celebritiesNotFound: "Nessuna celebrità trovata per \"{query}\"",
      fictionalTitle: "Personaggi di fantasia",
      fictionalSub: "Confronta altezze con icone della finzione",
      fictionalSearch: "Cerca per nome o universo...",
      fictionalLoading: "Caricamento personaggi...",
      fictionalNotFound: "Nessun personaggio trovato per \"{query}\"",
      entitiesTitle: "Oggetti ed edifici",
      entitiesSub: "Punti di riferimento reali e strutture famose",
      entitiesSearch: "Cerca oggetti...",
      entitiesLoading: "Caricamento oggetti...",
      entitiesNotFound: "Nessun oggetto trovato per \"{query}\"",
      addImageTitle: "Aggiungi immagine personalizzata",
      addImageSub: "Carica una foto per confrontare le proporzioni"
    }
  },
  contact: {
    metadata: {
      title: "Contattaci | Calcolatore di Confronto Altezza",
      description: "Contatta il team del calcolatore di confronto altezza per segnalare un'altezza errata, un bug o per richieste di privacy."
    },
    breadcrumb: {
      home: "Home",
      contact: "Contattaci"
    },
    header: {
      title: "Contattaci",
      description: "Hai una domanda, un commento o una correzione di altezza? Inviaci un messaggio e ti risponderemo presto.",
      emailUs: "Inviaci un'e-mail",
      emailDesc: "Per richieste generali, partnership o contatti stampa.",
      reportBug: "Segnala un bug",
      reportBugDesc: "Hai trovato un errore di calcolo o un problema grafico? Facci sapere i dettagli.",
      requestFeature: "Suggerisci una funzione",
      requestFeatureDesc: "Vorresti aggiungere una nuova celebrità, personaggio o unità di misura? I suggerimenti sono benvenuti.",
      privacyInquiry: "Privacy e diritti",
      privacyInquiryDesc: "Domande sui tuoi dati personali o sui diritti di privacy? Contatta il nostro team di conformità."
    },
    form: {
      title: "Invia un messaggio",
      name: "Il tuo nome",
      namePlaceholder: "Mario Rossi",
      email: "Indirizzo e-mail",
      emailPlaceholder: "tu@esempio.it",
      subject: "Oggetto",
      subjectPlaceholder: "es. Correzione altezza per Robert Wadlow",
      message: "Messaggio",
      messagePlaceholder: "Scrivi il tuo messaggio qui...",
      submit: "Invia messaggio",
      sending: "Invio in corso...",
      successTitle: "Messaggio inviato!",
      successDesc: "Grazie per averci contattato. Ti risponderemo il prima possibile.",
      errorTitle: "Si è verificato un errore. Riprova o scrivici direttamente via e-mail."
    }
  },
  home: {
    cta: {
      heading: "Fai la tua prova, crea il tuo confronto",
      description: "Gratis. Senza registrazione. Senza limiti. Confronta persone, celebrità, personaggi e oggetti reali in scala proporzionale esatta.",
      startComparing: "↑ Inizia a confrontare",
      exploreCelebrities: "Scopri le altezze dei VIP"
    },
    section8: {
      sources: "Fonti: CDC National Center for Health Statistics (NHANES 2021-2023), tabelle di crescita CDC, Guinness World Records. Verificato a novembre 2026.",
      items: [
        {
          q: "Come posso confrontare l'altezza di due persone affiancate?",
          a: "Fai clic su Aggiungi persona, inserisci nome e altezza in cm o ft/in e scegli un colore. Aggiungi la seconda persona nello stesso modo. Il grafico si aggiorna all'istante in scala proporzionale esatta. Puoi anche cercare nel database delle celebrità."
        },
        {
          q: "Come calcola le proporzioni il grafico?",
          a: "Il grafico impiega un motore visivo matematico. Se la Persona A è alta 170 cm e la Persona B 185 cm, la seconda barra viene disegnata esattamente a 1,09 volte la prima, senza alcuna approssimazione arbitraria."
        },
        {
          q: "Quante persone posso aggiungere a un confronto?",
          a: "Non c'è limite. Aggiungi tutte le persone, celebrità, personaggi di fantasia e oggetti del mondo reale che desideri. Tutti condividono lo stesso asse proporzionale."
        },
        {
          q: "Qual è la differenza tra questo strumento e il Calcolatore Differenza Altezza?",
          a: "Questo strumento crea un grafico visivo proporzionale a grandezza naturale. Il Calcolatore Differenza Altezza mostra il divario esatto tra due stature in cm, pollici e percentuale."
        },
        {
          q: "Chi è la persona più alta del mondo?",
          a: "La persona vivente più alta è Sultan Kösen (Turchia) con 251 cm (8 ft 2,8 in), certificato dal Guinness World Records nel 2011. La persona più alta mai documentata è stata Robert Wadlow (USA) con 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Qual è l'altezza media per età?",
          a: "Dati di riferimento CDC USA: Bambino di 4 anni: ca. 103 cm (3 ft 4 in). Bambino di 10 anni: ca. 138 cm (4 ft 6 in). Bambina di 10 anni: ca. 138 cm (4 ft 6 in). Uomini adulti (USA, 20+, 2021-2023): 175,0 cm (5 ft 8,9 in). Donne adulte: 161,3 cm (5 ft 3,5 in). Consulta il Calcolatore Percentili Altezza e Peso per tabelle dettagliate."
        },
        {
          q: "2 pollici (5 cm) sono una grande differenza di altezza?",
          a: "Due pollici equivalgono a 5,1 cm, circa il 3% dell'altezza di un uomo medio americano di 5'9\" (175,3 cm). Fianco a fianco, lo sguardo della persona più alta si trova 2 pollici sopra, pressappoco il lato corto di una carta di credito."
        },
        {
          q: "Quanto è più alto 5'10\" rispetto a 5'7\"?",
          a: "5'10\" supera 5'7\" di 3 pollici (7,6 cm), ovvero il 4,5% in più. In centimetri equivale a 177,8 cm contro 170,2 cm."
        },
        {
          q: "Come si convertono i cm in piedi e pollici?",
          a: "Dividi i centimetri per 2,54 per ottenere i pollici, poi dividi per 12 per i piedi. 169 cm equivalgono a 66,5 pollici o 5 ft 6,5 in. Al contrario, moltiplica il totale dei pollici per 2,54: 5'1\" sono 61 pollici, pari a 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Personaggi famosi",
        fictional: "Finzione",
        objects: "Oggetti",
        caption: "2.696 altezze pronte all'uso suddivise in tre raccolte: celebrità, personaggi di fantasia e oggetti reali."
      },
      workedExample: {
        diff: "Differenza",
        ratio: "Rapporto",
        taller: "Ben è {pct}% più alto",
        shorter: "Alex è {pct}% più basso",
        caption: "Alex a 5'7\" (170 cm) e Ben a 6'1\" (185 cm), tracciati in scala da una base zero. Ben supera Alex di 15 cm (5,9 in): 8,8% più alto di Alex, che è l'8,1% più basso."
      },
      scaleLadder: {
        humanScale: "1 m (Scala umana)",
        limit: "10.000 m (Limite 32.808 ft)",
        person: "Persona",
        eiffelTower: "Torre Eiffel",
        angelFalls: "Salto Angel",
        mtEverest: "Monte Everest",
        chartLimit: "Limite grafico",
        caption: "Mostrato in scala logaritmica (ogni passo aumenta di 10 volte) per includere tutti i riferimenti. Lo strumento principale posiziona tutti i soggetti su un unico asse lineare."
      },
      gapPairBars: {
        shorterBase: "Base più bassa (160 vs 172 cm)",
        tallerBase: "Base più alta (190 vs 202 cm)",
        gapDiff: "Differenza di 12 cm = scarto del {pct}%",
        caption: "La stessa differenza di 12 cm rappresenta un aumento di altezza del 7,5% su stature inferiori (160 vs 172 cm), ma solo del 6,3% su stature superiori (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Confronto altezze",
        colDiff: "Differenza",
        colTaller: "Più alto %",
        colShorter: "Più basso %",
        colScale: "Scala visiva",
        caption: "Differenze comuni di statura in piedi e pollici con conversioni precise e proporzioni visive."
      },
      ageBenchmarks: {
        colPop: "Popolazione / Fascia d'età",
        colAvg: "Media misurata (CDC)",
        boy4: "Bambino (4 anni, 50° perc.)",
        girl10: "Bambina (10 anni, 50° perc.)",
        boy10: "Bambino (10 anni, 50° perc.)",
        women: "Donne USA (20+, NHANES)",
        men: "Uomini USA (20+, NHANES)",
        caption: "Medie di adulti statunitensi CDC FastStats / NHANES (ago 2021 - ago 2023) insieme alle mediane di crescita clinica infantile del CDC."
      },
      twoInchGap: {
        baseline: "Linea base 0 cm",
        eyeLevel: "Livello occhi",
        forehead: "Fronte",
        caption: "5'9\" e 5'11\" disegnati in scala da una base zero. I vertici distano 2 pollici (5,1 cm), uno scarto del 2,9%."
      },
      conversionFlow: {
        step1: "Pollici totali",
        step2: "Piedi e resto",
        step3: "Risultato finale",
        caption: "Conversione in tre passaggi: dividi i centimetri per 2,54 per ottenere i pollici, dividi per 12 per i piedi interi e arrotonda i pollici rimanenti."
      }
    }
  }
};

