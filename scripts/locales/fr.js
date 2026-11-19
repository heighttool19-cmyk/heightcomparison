// scripts/locales/fr.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Ajouter une personne",
      celebrities: "Célébrités",
      fictional: "Fiction",
      entities: "Objets",
      addImage: "Ajouter une image"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Passer aux unités impériales",
      switchToMetric: "Passer aux unités métriques",
      zoomIn: "Zoom avant",
      zoomOut: "Zoom arrière",
      zoomPercentage: "Pourcentage de zoom",
      autoFit: "Ajustement automatique",
      editList: "Modifier la liste",
      clearAll: "Tout effacer",
      share: "Partager",
      generating: "Génération...",
      copied: "Copié !",
      error: "Erreur",
      linkCopied: "Lien copié.",
      linkExpiry: "Les liens restent actifs pendant 7 jours.",
      png: "PNG",
      downloadChart: "Télécharger le graphique en image PNG",
      fullscreen: "Plein écran",
      exitFullscreen: "Quitter le plein écran"
    },
    canvas: {
      loading: "Chargement de la comparaison...",
      addPersonPrompt: "Ajoutez une personne pour commencer",
      addPersonAria: "Ajouter une personne au graphique",
      sameHeight: "Même taille",
      sameHeightBoth: "{name1} et {name2} mesurent tous les deux {height}.",
      gapTaller: "{name} est plus grand(e) de {pct}%",
      gapShorter: "{name} est plus petit(e) de {pct}%",
      gapSummary: "{taller} est {tallerPct}% plus grand(e) que {shorter} ({shorterPct}% plus petit(e)).",
      ref: "RÉF"
    },
    modal: {
      clearTitle: "Effacer le graphique",
      clearDesc: "Supprimer tous les sujets ? Cette action est irréversible.",
      cancel: "Annuler",
      clearConfirm: "Tout effacer"
    },
    form: {
      enterDetails: "Saisir vos informations",
      editPerson: "Modifier la personne",
      male: "Homme",
      female: "Femme",
      name: "Nom",
      optional: "Optionnel",
      heightLabel: "Taille (CM/FT)",
      heightPlaceholder: "Taille",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Style d'avatar",
      addPerson: "Ajouter la personne",
      saveChanges: "Enregistrer les modifications",
      cancel: "Annuler"
    },
    personChart: {
      compareAgainst: "Comparer avec",
      tallestVsShortest: "Plus grand vs Plus petit",
      differencesVs: "Différences avec {name}",
      yourList: "Votre liste",
      reorder: "Réorganiser",
      edit: "Modifier",
      remove: "Supprimer"
    },
    quickAdd: {
      quickInsertion: "Insertion rapide",
      quickAddAria: "Ajout rapide de {name}"
    },
    panels: {
      all: "Tous",
      celebritiesTitle: "Sélection de célébrités",
      celebritiesSub: "Ajoutez des icônes à votre graphique comparatif",
      celebritiesSearch: "Rechercher par nom ou catégorie",
      celebritiesLoading: "Chargement des célébrités...",
      celebritiesNotFound: "Aucune célébrité trouvée pour \"{query}\"",
      fictionalTitle: "Personnages de fiction",
      fictionalSub: "Comparez les tailles avec des personnages fictifs",
      fictionalSearch: "Rechercher par nom ou univers...",
      fictionalLoading: "Chargement des personnages...",
      fictionalNotFound: "Aucun personnage trouvé pour \"{query}\"",
      entitiesTitle: "Objets et monuments",
      entitiesSub: "Objets de référence réels et monuments célèbres",
      entitiesSearch: "Rechercher des objets...",
      entitiesLoading: "Chargement des objets...",
      entitiesNotFound: "Aucun objet trouvé pour \"{query}\"",
      addImageTitle: "Ajouter une image personnalisée",
      addImageSub: "Importez une photo pour comparer les proportions"
    }
  },
  contact: {
    metadata: {
      title: "Contactez-nous | Calculateur de Comparaison de Taille",
      description: "Contactez l'équipe du calculateur de comparaison de taille pour signaler une taille incorrecte, un bogue ou exercer vos droits de confidentialité."
    },
    breadcrumb: {
      home: "Accueil",
      contact: "Contact"
    },
    header: {
      title: "Contactez-nous",
      description: "Vous avez une question, une suggestion ou une correction de taille ? Envoyez-nous un message et nous vous répondrons avec plaisir.",
      emailUs: "Contact direct par e-mail",
      emailDesc: "Pour les demandes générales, partenariats ou questions presse.",
      reportBug: "Signaler un bogue",
      reportBugDesc: "Un problème de calcul ou un défaut d'affichage ? Décrivez-nous les détails.",
      requestFeature: "Suggérer une fonctionnalité",
      requestFeatureDesc: "Vous souhaitez ajouter une célébrité, un personnage ou une unité ? Vos suggestions sont les bienvenues.",
      privacyInquiry: "Confidentialité et droits",
      privacyInquiryDesc: "Des questions sur vos données personnelles ou l'exercice de vos droits légaux ? Contactez notre pôle conformité."
    },
    form: {
      title: "Envoyer un message",
      name: "Votre nom",
      namePlaceholder: "Jean Dupont",
      email: "Adresse e-mail",
      emailPlaceholder: "vous@exemple.com",
      subject: "Objet",
      subjectPlaceholder: "ex. Correction de taille pour Robert Wadlow",
      message: "Message",
      messagePlaceholder: "Expliquez-nous votre demande...",
      submit: "Envoyer le message",
      sending: "Envoi en cours...",
      successTitle: "Message envoyé !",
      successDesc: "Merci de nous avoir contactés. Nous reviendrons vers vous dès que possible.",
      errorTitle: "Une erreur s'est produite. Veuillez réessayer ou nous écrire directement."
    }
  },
  home: {
    cta: {
      heading: "À vous de jouer, créez votre comparaison",
      description: "Gratuit. Sans inscription. Sans limites. Comparez autant de personnes, célébrités, personnages et objets que vous le souhaitez à échelle exacte.",
      startComparing: "↑ Commencer à comparer",
      exploreCelebrities: "Découvrir la taille des célébrités"
    },
    section8: {
      sources: "Sources : CDC National Center for Health Statistics (NHANES 2021 à 2023), courbes de croissance CDC, Guinness World Records. Vérifié en novembre 2026.",
      items: [
        {
          q: "Comment comparer la taille de deux personnes côte à côte ?",
          a: "Cliquez sur Ajouter une personne, saisissez le nom et la taille en cm ou en ft/in, et choisissez une couleur. Procédez de la même façon pour la deuxième personne. Le graphique se met à jour immédiatement avec un ratio proportionnel exact. Vous pouvez également rechercher dans la base de célébrités."
        },
        {
          q: "Comment le graphique calcule-t-il les proportions ?",
          a: "Le graphique utilise un moteur de ratios visuels précis. Si la personne A mesure 170 cm et la personne B 185 cm, la deuxième barre s'affiche exactement à 1,09 fois la hauteur de la première, sans distorsion ni arrondi approximatif."
        },
        {
          q: "Combien de personnes puis-je ajouter à une comparaison ?",
          a: "Il n'y a aucune limite. Ajoutez autant de personnes, célébrités, personnages fictifs et objets réels que vous le souhaitez. Tous partagent le même repère proportionnel."
        },
        {
          q: "Quelle est la différence entre cet outil et le Calculateur de Différence de Taille ?",
          a: "Cet outil génère un graphique visuel à échelle réelle pour comparer plusieurs sujets. Le Calculateur de Différence de Taille fournit l'écart précis entre deux hauteurs en centimètres, pouces et pourcentage."
        },
        {
          q: "Qui est la personne la plus grande du monde ?",
          a: "L'homme vivant le plus grand est Sultan Kösen (Turquie) à 251 cm (8 ft 2,8 in), homologué par le Guinness World Records en 2011. La personne la plus grande jamais mesurée était Robert Wadlow (États-Unis) à 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Quelle est la taille moyenne par âge ?",
          a: "Repères clés des données CDC : garçon de 4 ans : env. 103 cm (3 ft 4 in). Garçon de 10 ans : env. 138 cm (4 ft 6 in). Fille de 10 ans : env. 138 cm (4 ft 6 in). Hommes adultes (États-Unis, 20 ans et +, 2021-2023) : 175,0 cm (5 ft 8,9 in). Femmes adultes : 161,3 cm (5 ft 3,5 in). Retrouvez l'ensemble des données dans le Calculateur de Percentiles Taille/Poids."
        },
        {
          q: "Un écart de 2 pouces (5 cm) est-il important ?",
          a: "Deux pouces correspondent à 5,1 cm, soit environ 3 % de la taille d'un homme américain moyen de 5'9\" (175,3 cm). Côte à côte, la ligne des yeux de la personne la plus grande se situe environ 2 pouces plus haut, soit la largeur d'une carte bancaire."
        },
        {
          q: "De combien 5'10\" est-il plus grand que 5'7\" ?",
          a: "5'10\" dépasse 5'7\" de 3 pouces (7,6 cm), soit 4,5 % de plus. En centimètres, cela représente 177,8 cm contre 170,2 cm."
        },
        {
          q: "Comment convertir des cm en pieds et pouces ?",
          a: "Divisez les centimètres par 2,54 pour obtenir les pouces, puis divisez par 12 pour les pieds. 169 cm font 66,5 pouces, soit 5 ft 6,5 in. Dans l'autre sens, multipliez le total de pouces par 2,54 : 5'1\" correspond à 61 pouces, soit 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Célébrités",
        fictional: "Fiction",
        objects: "Objets",
        caption: "2 696 tailles prêtes à l'emploi réparties en trois collections : célébrités, personnages de fiction et objets réels."
      },
      workedExample: {
        diff: "Différence",
        ratio: "Ratio",
        taller: "Ben est {pct}% plus grand",
        shorter: "Alex est {pct}% plus petit",
        caption: "Alex à 5'7\" (170 cm) et Ben à 6'1\" (185 cm), dessinés à l'échelle depuis une ligne de base zéro. Ben dépasse Alex de 15 cm (5,9 in) : 8,8 % plus grand qu'Alex, qui est 8,1 % plus petit."
      },
      scaleLadder: {
        humanScale: "1 m (Échelle humaine)",
        limit: "10 000 m (Limite 32 808 ft)",
        person: "Personne",
        eiffelTower: "Tour Eiffel",
        angelFalls: "Salto Ángel",
        mtEverest: "Mont Everest",
        chartLimit: "Limite du graphique",
        caption: "Représenté sur une échelle logarithmique (chaque palier est multiplié par 10) pour visualiser tous les repères. L'outil principal trace l'ensemble sur un axe linéaire unique."
      },
      gapPairBars: {
        shorterBase: "Base plus petite (160 vs 172 cm)",
        tallerBase: "Base plus grande (190 vs 202 cm)",
        gapDiff: "Écart de 12 cm = différence de {pct}%",
        caption: "Le même écart de 12 cm représente une augmentation de taille de 7,5 % sur de plus petites statures (160 vs 172 cm), mais seulement de 6,3 % sur de plus grandes statures (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Paire comparée",
        colDiff: "Différence",
        colTaller: "Plus grand %",
        colShorter: "Plus petit %",
        colScale: "Échelle visuelle",
        caption: "Différences de taille courantes en pieds et pouces avec conversions exactes et mise à l'échelle proportionnelle."
      },
      ageBenchmarks: {
        colPop: "Population / Groupe d'âge",
        colAvg: "Moyenne mesurée (CDC)",
        boy4: "Garçon (4 ans, 50e centile)",
        girl10: "Fille (10 ans, 50e centile)",
        boy10: "Garçon (10 ans, 50e centile)",
        women: "Femmes américaines (20+, NHANES)",
        men: "Hommes américains (20+, NHANES)",
        caption: "Moyennes adultes américaines CDC FastStats / NHANES (août 2021 à août 2023) aux côtés des médianes cliniques infantiles du CDC."
      },
      twoInchGap: {
        baseline: "Ligne de base 0 cm",
        eyeLevel: "Hauteur des yeux",
        forehead: "Front",
        caption: "5'9\" et 5'11\" dessinés à l'échelle depuis la base zéro. Les sommets sont distants de 2 pouces (5,1 cm), soit un écart de 2,9 %."
      },
      conversionFlow: {
        step1: "Pouces totaux",
        step2: "Pieds et reste",
        step3: "Résultat final",
        caption: "Conversion en trois étapes : divisez les centimètres par 2,54 pour les pouces totaux, divisez par 12 pour les pieds entiers et arrondissez les pouces restants."
      }
    }
  }
};

