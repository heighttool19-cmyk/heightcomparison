const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

// Helper to update a locale
function updateLocale(loc, trans) {
  const filePath = path.resolve(`messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Home
  data.home = trans.home;

  // 2. Image to Height
  data.imageToHeight = trans.imageToHeight;

  // 3. Height Difference updates
  if (trans.heightDifference) {
    if (trans.heightDifference.intro) Object.assign(data.heightDifference.intro, trans.heightDifference.intro);
    if (trans.heightDifference.percentage) Object.assign(data.heightDifference.percentage, trans.heightDifference.percentage);
    if (trans.heightDifference.howToCalculate) Object.assign(data.heightDifference.howToCalculate, trans.heightDifference.howToCalculate);
    if (trans.heightDifference.couple) Object.assign(data.heightDifference.couple, trans.heightDifference.couple);
    if (trans.heightDifference.coupleCalc) Object.assign(data.heightDifference.coupleCalc, trans.heightDifference.coupleCalc);
  }

  // Ensure exact key parity with en.json
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${loc} successfully!`);
}

// ==========================================
// FRENCH (fr)
// ==========================================
const frData = {
  home: {
    intro: {
      h1: "Calculateur de Comparaison de Taille : Comparez les Tailles en Ligne avec un Graphique Visuel",
      p: "Utilisez cet outil de comparaison de taille pour visualiser des statures côte à côte sur un graphique à échelle réelle. Entrez n'importe quelle taille en centimètres ou en pieds et pouces pour voir immédiatement la différence. L'outil offre une comparaison visuelle avec mise à l'échelle proportionnelle. Le graphique s'actualise en temps réel et ajuste chaque silhouette à partir de la valeur exacte saisie. Vous pouvez comparer deux personnes ou plus en quelques secondes.",
      freeLibraryBadge: "Bibliothèque en ligne gratuite",
      freeLibraryDesc: "Accédez à notre base de données de tailles de référence réparties en trois collections, créez des comparaisons personnalisées illimitées et exportez des graphiques PNG haute résolution.",
      noAccounts: "Sans compte",
      noPayments: "Sans paiement",
      free100: "100 % gratuit",
      compareNowCta: "Comparer maintenant ↑"
    },
    section1: {
      eyebrow: "Fonctionnement",
      title: "Comment fonctionne un graphique de comparaison de taille ?",
      p1: "Un graphique de comparaison de taille convertit les mesures brutes en une représentation visuelle où chaque silhouette respecte la proportion mathématique exacte à échelle réelle.",
      p2: "Si la personne A mesure 170 cm et la personne B 185 cm, la seconde silhouette s'affiche exactement à 1,09 fois la taille de la première. Un écart de 10 cm à 160 cm est visuellement très différent du même écart à 190 cm : le graphique rend cette distinction évidente sans aucun calcul.",
      p3: "Utilisez-le pour vos comparaisons familiales, sportives ou vos créations artistiques.",
      imgAlt: "Graphique de comparaison de taille d'une personne de 170 cm et d'une autre de 185 cm côte à côte",
      imgCaption: "Alex à 170 cm (5'7\") et Ben à 185 cm (6'1\"), dessinés à l'échelle.",
      needGapTitle: "Besoin uniquement de l'écart précis entre deux tailles ?",
      needGapDesc: "Le Calculateur de Différence de Taille indique l'écart exact en cm et pouces, le pourcentage de différence et une barre visuelle. Idéal pour obtenir un chiffre immédiat sans créer un graphique complet.",
      needGapCta: "Ouvrir le Calculateur de Différence de Taille"
    },
    section2: {
      eyebrow: "Étape par étape",
      title: "Comment Comparer les Tailles en Ligne : Guide pour Débutants",
      step1Title: "Étape 1 : Choisissez vos éléments de comparaison",
      step1Desc: "Décidez qui comparer : deux amis, vous et une célébrité, des personnages d'anime ou un monument. Fonctionne en cm et en pieds/pouces avec bascule instantanée.",
      guidebookNoteLabel: "Note des guides officiels :",
      guidebookNoteText: "Recherchez dans la base des célébrités ou explorez les personnages fictifs. Les tailles proviennent des guides officiels et fiches de production publiées.",
      panelPeople: "Personnes",
      panelCelebrities: "Célébrités",
      panelCharacters: "Personnages",
      panelObjects: "Objets",
      step2Title: "Étape 2 : Créez votre graphique",
      step2Desc: "Saisissez les noms, choisissez les couleurs et indiquez les tailles. Le graphique s'ajuste instantanément jusqu'à 10 000 mètres (32 808 ft), pour comparer un humain à la Tour Eiffel ou à l'Everest.",
      panels: [
        { label: "Ajouter une personne", desc: "Nom, sexe, taille en cm ou ft/in et couleur personnalisée." },
        { label: "Célébrités", desc: "Sportifs, acteurs et figures historiques mondiales." },
        { label: "Fiction", desc: "Anime, dessins animés et super-héros issus de recueils officiels." },
        { label: "Objets & Monuments", desc: "Animaux, édifices architecturaux et sommets naturels." }
      ],
      step3Title: "Étape 3 : Visualisez l'écart et partagez-le",
      step3Desc: "Chaque silhouette affiche son nom et sa taille. L'écart est lisible d'un coup d'œil. Téléchargez un PNG net ou partagez un lien direct valide pendant 7 jours."
    },
    section3: {
      eyebrow: "Pourquoi l'utiliser",
      title: "Pourquoi un Graphique Visuel est Plus Parlant que de Simples Chiffres",
      description: "Un graphique visuel traduit le rapport mathématique en une image à l'échelle, rendant les proportions évidentes sans calcul mental.",
      card1Title: "L'échelle proportionnelle révèle ce que les chiffres masquent",
      card1Desc: "Un écart de 12 cm à 160 cm représente une proportion plus importante qu'à 190 cm. Les silhouettes le montrent immédiatement. Pour calculer l'écart exact, ouvrez le ",
      card1Link: "Calculateur de Différence de Taille",
      card2Title: "Comparez-vous à n'importe qui ou n'importe quoi",
      card2Desc: "Ajoutez votre propre taille et placez à côté une star, un héros de manga ou une montagne, tous alignés avec précision sur un axe unique.",
      card3Title: "Comparaison de personnages pour les créateurs",
      card3Desc: "Artistes et illustrateurs visualisent les relations de taille selon les proportions officielles des fiches de production.",
      card4Title: "Aucune conversion d'unité ni calcul manuel",
      card4Desc: "Saisissez vos valeurs en cm ou ft/in. Les différences et pourcentages sont calculés automatiquement en direct.",
      card5Title: "L'échelle réelle met la taille humaine en perspective",
      card5Desc: "Placez une personne de 175 cm à côté de l'Everest (8 848 m) pour apprécier la démesure des géants naturels.",
      card6Title: "Exportation visuelle en un clic",
      card6Desc: "Téléchargez des images PNG labellisées ou générez des liens pour vos réseaux sociaux, forums et présentations."
    },
    section4: {
      eyebrow: "Cas d'usage",
      title: "Comparaison de Tailles : Exemples et Situations Réelles",
      description: "Des situations concrètes où l'échelle visuelle apporte une clarté instantanée par rapport à de simples chiffres.",
      useCases: [
        {
          tag: "COUPLES ET AMIS",
          quote: "« Attends, combien mesures-tu de plus que moi exactement ? »",
          desc: "Entrez les deux tailles et découvrez l'écart exact. Une différence de 10 cm saute immédiatement aux yeux.",
          try: "165 CM + 178 CM · ÉCART DE 13 CM (7,9 %)"
        },
        {
          tag: "SPORT ET ATHLÈTES",
          quote: "« Qui possède réellement l'avantage de taille sur le terrain ? »",
          desc: "Comparez des joueurs de NBA, de football américain ou des grimpeurs pour évaluer l'avantage physique réel.",
          try: "JOUEUR NBA 200 CM · LINEBACKER NFL 188 CM · GRIMPEUR 174 CM"
        },
        {
          tag: "ANIME ET FICTION",
          quote: "« Le wiki donne un chiffre, mais qu'est-ce que cela donne en vrai ? »",
          desc: "Personnages d'anime à échelle vérifiée : Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) et Levi (160 cm).",
          try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
        },
        {
          tag: "OBJETS ET MONUMENTS",
          quote: "« Je n'imaginais pas que c'était aussi colossal en réalité. »",
          desc: "Placez un être humain à côté des chutes Salto Ángel (979 m), d'une porte de 203 cm ou d'un plafond de 2,60 m.",
          try: "HUMAIN 175 CM + CHRYSLER BUILDING 319 M + MONT EVEREST 8 848 M"
        },
        {
          tag: "MOI CONTRE LES STARS",
          quote: "« Attends, ils font exactement la même taille que moi ? »",
          desc: "Comparez votre taille à celles de Tom Cruise, Dwayne Johnson ou Taylor Swift à partir de sources biographiques.",
          try: "VOUS + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
        },
        {
          tag: "AMÉNAGEMENT ET DÉCO",
          quote: "« Ce meuble va-t-il vraiment s'intégrer dans ma pièce ? »",
          desc: "Ajoutez un cadre de porte ou la hauteur sous plafond à côté d'une personne pour vérifier les volumes avant achat.",
          try: "PERSONNE 185 CM · PORTE STANDARD 203 CM · PLAFOND 260 CM"
        }
      ],
      tableTitle: "Tableau d'écart de taille en pieds, pouces et centimètres",
      tableDesc: "Sept exemples courants pour comparer des couples et des personnes en pieds, pouces, centimètres et pourcentages."
    },
    section5: {
      eyebrow: "Avantages",
      title: "Pourquoi Choisir Notre Outil de Comparaison de Taille ?",
      description: "Des outils professionnels. Zéro contrainte. Aucune inscription requise.",
      features: [
        {
          title: "Générateur instantané de taille",
          desc: "Le graphique s'actualise en direct à chaque frappe, sans rechargement de page."
        },
        {
          title: "Silhouettes personnalisables",
          desc: "Six teintes et styles homme/femme pour distinguer facilement plus de 10 personnes."
        },
        {
          title: "Données de célébrités",
          desc: "1 294 célébrités du sport, du cinéma et de la culture répertoriées dans la base."
        },
        {
          title: "Personnages de fiction",
          desc: "1 138 héros de mangas, comics et fantastique documentés selon les guides officiels."
        },
        {
          title: "Objets et monuments",
          desc: "264 édifices, animaux et sommets mondiaux modélisés à échelle vérifiée."
        },
        {
          title: "Mesure d'après photo",
          desc: "Importez vos photos pour intégrer des personnes réelles avec une géométrie fiable."
        },
        {
          title: "Export PNG haute qualité",
          desc: "Téléchargez des images haute résolution gratuitement et de manière illimitée."
        },
        {
          title: "Liens de partage directs",
          desc: "Générez un lien direct vers votre graphique, actif pendant 7 jours sans compte."
        }
      ]
    },
    section6: {
      eyebrow: "Précision des données",
      title: "Quel est le Degré de Précision du Graphique ?",
      items: [
        {
          title: "Moteur d'échelle mathématique",
          desc: "Chaque silhouette est tracée selon la valeur exacte saisie : 170 cm équivaut à 170,00 unités sur le canevas."
        },
        {
          title: "Valeurs de référence",
          desc: "Les tailles publiées pouvant diverger, nous retenons les chiffres vérifiés les plus récents de sources fiables."
        },
        {
          title: "Registres officiels",
          desc: "Issues de biographies et documents vérifiés ; aucune estimation arbitraire de fans."
        },
        {
          title: "Fiches de production",
          desc: "Les héros de fiction proviennent des guides de production et fiches de licence autorisées."
        },
        {
          title: "Monuments et animaux",
          desc: "Édifices vérifiés d'après plans architecturaux. Les animaux sont mesurés au garrot (épaule)."
        }
      ]
    },
    section7: {
      eyebrow: "Fonctionnalités",
      title: "Un Outil Conçu pour une Simplicité Absolue",
      description: "Tout ce dont vous avez besoin pour comparer des tailles sans aucune barrière.",
      thFeature: "Fonctionnalité",
      thFree: "Ce que vous obtenez gratuitement",
      rows: [
        ["Silhouettes par graphique", "Illimitées — toutes sur un même axe proportionnel"],
        ["Tailles prêtes à l'emploi", "2 696 profils (1 294 stars, 1 138 personnages, 264 objets)"],
        ["Unités prises en charge", "Centimètres, mètres, pieds et pouces (conversion en direct)"],
        ["Échelle de mesure", "De quelques centimètres à 10 000 mètres (32 808 ft) avec zoom auto"],
        ["Options d'exportation", "Téléchargement PNG haute résolution et liens partageables (7 jours)"],
        ["Compte et tarif", "0,00 € pour toujours — sans inscription ni carte bancaire"]
      ]
    },
    section8: {
      title: "Foire Aux Questions sur la Comparaison de Taille",
      description: "Réponses d'experts aux questions fréquentes sur les échelles, unités et données",
      badge: "CENTRE D'AIDE"
    },
    section9: {
      eyebrow: "Découvrir",
      title: "Outils et Calculateurs en Ligne Dédiés à la Taille",
      launchTool: "Lancer l'outil",
      privacyTitle: "Confidentialité des Données et Droits",
      privacyText: "Nous ne vendons pas vos données personnelles à des tiers. Conformément au RGPD et aux lois sur la vie privée, vous disposez d'un droit d'accès et d'effacement. Consultez notre ",
      privacyLink: "Politique de Confidentialité",
      privacyTextEnd: " ou contactez-nous directement. L'utilisation courante de l'outil ne collecte aucune donnée personnelle.",
      cards: [
        {
          label: "Calculateur de Différence de Taille",
          desc: "Écart exact en cm et pouces, pourcentage d'écart et tableau de référence pour couples.",
          badge: "Outil",
          href: "/height-difference-calculator"
        },
        {
          label: "Calculateur de Centile Taille & Poids",
          desc: "Comparez vos mensurations aux courbes OMS et CDC selon l'âge et le sexe.",
          badge: "Outil",
          href: "/height-weight-percentile-calculator"
        },
        {
          label: "Calculateur de Poids Idéal",
          desc: "Formules de Devine, Robinson et Hamwi avec plages de poids santé.",
          badge: "Outil",
          href: "/ideal-body-weight-calculator"
        },
        {
          label: "Calculateur Image vers Taille",
          desc: "Mesurez une stature à partir d'une photo sans mètre ruban avec conseils de précision.",
          badge: "Outil",
          href: "/image-to-height"
        },
        {
          label: "Prédicteur de Taille Enfant",
          desc: "Estimez la taille adulte future selon les modèles scientifiques Khamis-Roche.",
          badge: "Outil",
          href: "/height-predictor"
        }
      ]
    }
  },
  imageToHeight: {
    hero: {
      eyebrow: "Image vers taille",
      title: "Mesurez Votre Taille à Partir d'une Photo. ",
      titleAccent: "Sans Mètre Ruban.",
      description: "Importez une photo de plain-pied avec une porte, une feuille A4 ou une carte bancaire visible. Pointez l'objet de référence, indiquez sa taille réelle et tracez une ligne du sol au sommet du crâne. Obtenez votre taille en centimètres et en pieds/pouces avec une précision de 1 à 2 cm. Gratuit, sans inscription, sur tout appareil.",
      badgeFree: "Gratuit",
      badgeNoAccount: "Sans compte",
      badgePrivate: "La photo reste sur votre appareil",
      badgeUnits: "Résultats en cm et ft/in",
      ctaUpload: "Importer une Photo et Mesurer",
      accuracyNotice: "Précision de 1 à 2 cm. 100 % privé. S'exécute dans votre navigateur.",
      prepTitle: "Vérifiez 3 points avant de prendre la photo :",
      prep1: "Corps entier dans le cadre, de la tête aux pieds avec le sol visible.",
      prep2: "Tenez-vous contre le même mur que l'objet de référence.",
      prep3: "Smartphone tenu droit et à niveau, environ à hauteur de taille."
    },
    howItWorks: {
      eyebrow: "Cinq clics, une photo",
      title: "Comment Fonctionne l'Outil : Étape par Étape",
      description: "Une photo porte sa propre échelle dès lors qu'un objet de taille connue s'y trouve. Indiquez sa dimension à l'outil pour mesurer toute personne ou objet placé à côté.",
      stepPrefix: "Étape",
      steps: [
        {
          step: "01",
          title: "Importez une photo en pied",
          desc: "Choisissez une photo montrant la personne de la tête aux pieds, à côté d'une porte, d'une feuille A4 ou d'une carte. L'encadrement de porte est le plus fiable."
        },
        {
          step: "02",
          title: "Recadrez et validez",
          desc: "Ajustez les bords pour que la personne et la référence remplissent l'image, puis cliquez sur 'Appliquer le recadrage'."
        },
        {
          step: "03",
          title: "Marquez la référence et indiquez sa taille",
          desc: "Touchez les deux extrémités de la porte ou de la carte. Choisissez Porte (203 cm), Carte bancaire (8,56 cm), Feuille A4 (29,7 cm), 1 mètre ou saisissez une taille sur mesure."
        },
        {
          step: "04",
          title: "Pointez la tête et les pieds",
          desc: "Tracez une ligne du sol sous les pieds jusqu'au sommet du crâne. Partez bien du sol et non des chaussures. Ou utilisez le scan automatique par IA."
        },
        {
          step: "05",
          title: "Lisez votre résultat et enregistrez",
          desc: "Votre taille apparaît en centimètres et en pieds/pouces. Cliquez sur 'Enregistrer' pour la comparer à vos proches ou athlètes favoris."
        }
      ]
    },
    whatYouCanMeasure: {
      eyebrow: "Au-delà de votre propre taille",
      title: "Ce Que Vous Pouvez Mesurer d'Après Photo",
      description: "Tout élément est mesurable si l'objet de référence connu se situe à la même distance de l'objectif.",
      items: [
        {
          title: "Vous-même, sans aucune aide",
          desc: "Posez votre téléphone à hauteur de hanches, activez le retardateur et placez-vous contre une porte ou une feuille A4 scotchée."
        },
        {
          title: "Vos enfants au fil de leur croissance",
          desc: "Photographiez votre enfant devant la même porte tous les trimestres et suivez son évolution. Vérifiez ensuite sa ",
          linkLabel: "taille adulte prédite"
        },
        {
          title: "Des personnes sur d'anciennes photos",
          desc: "Photos de famille, d'équipes ou de célébrités à côté d'une porte fonctionnent dès qu'un objet connu est présent dans le cadre."
        },
        {
          title: "Meubles et encadrements",
          desc: "Scotchez une feuille A4 près d'un meuble ou d'une ouverture pour en mesurer la hauteur avant d'acheter ou d'emménager."
        },
        {
          title: "Arbres, clôtures et murs",
          desc: "Placez-vous à côté et indiquez votre propre taille comme référence. Reculez pour faire tenir les deux dans le cadre en gardant l'appareil bien droit."
        }
      ],
      whyArTitle: "Pourquoi une photo plutôt qu'une application de réalité augmentée (RA) ?",
      why1Bold: "Mesure le passé :",
      why1Desc: " Les applications de RA mesurent uniquement l'instant présent. Une photo permet de mesurer des clichés historiques et des souvenirs d'archives.",
      why2Bold: "Sans installation :",
      why2Desc: " Fonctionne nativement dans tout navigateur moderne sur iOS, Android, Mac ou PC sans application à télécharger.",
      why3Bold: "Vie privée garantie :",
      why3Desc: " Votre photo reste dans l'environnement local de votre navigateur et n'est jamais envoyée vers un serveur distant."
    },
    referenceObjects: {
      eyebrow: "Référence d'étalonnage",
      title: "Quel Objet de Référence Choisir pour Étalonner",
      description: "Plus la dimension de l'objet est certaine, plus le résultat est fiable. Les objets normalisés garantissent une précision constante.",
      thObject: "Objet",
      thSize: "Taille à indiquer",
      thStandard: "Dimension normalisée ?",
      thBestFor: "Idéal pour",
      rows: [
        {
          object: "Feuille A4 (grand côté)",
          size: "29,7 cm",
          standard: "Oui, ISO 216",
          bestFor: "Scotchée au mur à côté de la personne"
        },
        {
          object: "Carte bancaire (grand côté)",
          size: "8,56 cm",
          standard: "Oui, ISO/IEC 7810",
          bestFor: "Photos rapprochées. Petite taille : pointez bien les coins."
        },
        {
          object: "Porte intérieure",
          size: "203 cm (standard US/courant)",
          standard: "Non, varie selon le logement",
          bestFor: "Photos en pied, après avoir mesuré la porte une première fois"
        }
      ]
    },
    accuracy: {
      eyebrow: "Mesures et bancs d'essai",
      title: "Comment Obtenir un Résultat Précis d'Après Photo",
      description: "Deux erreurs expliquent la majorité des écarts : se tenir en avant de la référence et incliner l'appareil. Tenez le téléphone droit et restez bien au contact du mur.",
      tiltLowTitle: "Bas, incliné vers le haut",
      tiltLowBadge: "Taille surévaluée",
      tiltLowDesc: "Le haut de la scène est plus éloigné et rétrécit, ce qui fait paraître la porte plus petite à côté de la personne (+2,4 à +4,5 cm d'erreur).",
      tiltLevelTitle: "À niveau, à hauteur de taille",
      tiltLevelBadge: "Résultat optimal",
      tiltLevelDesc: "L'appareil fait face au mur, préservant les proportions géométriques réelles (0,0 cm d'erreur).",
      tiltHighTitle: "Haut, incliné vers le bas",
      tiltHighBadge: "Taille sous-évaluée",
      tiltHighDesc: "Le sol est plus éloigné et rétrécit, ce qui fait paraître la porte plus haute (−2,8 à −5,9 cm d'erreur).",
      tableTitle: "Notre banc d'essai de précision (14 scènes calibrées)",
      tableDesc: "Nous avons évalué 14 scènes calibrées avec des hauteurs connues à 3,5 mètres pour distinguer la géométrie de la prise de vue des clics manuels.",
      thSetup: "Configuration photo",
      thTrueHeight: "Taille réelle",
      thMeasured: "Mesurée",
      thError: "Écart",
      benchmarkRows: [
        {
          setup: "Smartphone à niveau à 60, 100 ou 130 cm, personne contre le mur près de la porte",
          trueHeight: "172 cm",
          measured: "172,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Même configuration pour un enfant de 120 cm et un adulte de 190 cm",
          trueHeight: "120, 190 cm",
          measured: "120,0, 190,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Smartphone incliné de 10° vers le haut depuis 60 cm",
          trueHeight: "172 cm",
          measured: "174,4 cm",
          error: "+2,4 cm"
        },
        {
          setup: "Smartphone incliné de 20° vers le haut depuis 40 cm",
          trueHeight: "172 cm",
          measured: "176,5 cm",
          error: "+4,5 cm"
        },
        {
          setup: "Smartphone incliné de 10° vers le bas depuis 160 cm",
          trueHeight: "172 cm",
          measured: "169,2 cm",
          error: "−2,8 cm"
        },
        {
          setup: "Smartphone incliné de 20° vers le bas depuis 180 cm",
          trueHeight: "172 cm",
          measured: "166,1 cm",
          error: "−5,9 cm"
        },
        {
          setup: "Feuille A4 comme référence, smartphone incliné de 10° vers le haut",
          trueHeight: "172 cm",
          measured: "176,8 cm",
          error: "+4,8 cm"
        },
        {
          setup: "Personne placée à 30 cm en avant de la porte",
          trueHeight: "172 cm",
          measured: "188,1 cm",
          error: "+16,1 cm"
        },
        {
          setup: "Personne placée à 60 cm en avant de la porte",
          trueHeight: "172 cm",
          measured: "207,6 cm",
          error: "+35,6 cm"
        }
      ],
      pixelSensitivityBold: "Sensibilité au pixel :",
      pixelSensitivityDesc: " Imprécision au clic : sur écran mobile, rater un bord d'un seul pixel déplace la mesure de 1 cm avec une porte, 7 cm avec un A4 et 23 cm avec une carte. Préférez la plus grande référence et zoomez avant de pointer.",
      tips: [
        {
          title: "Évitez d'incliner l'appareil",
          desc: "L'inclinaison est la cause principale d'erreur. Tenez le smartphone bien droit à mi-hauteur et reculez jusqu'à cadrer de la tête aux pieds."
        },
        {
          title: "Position de la référence",
          desc: "Tenez-vous contre le même mur que l'objet de référence, jamais en avant. Avancer de 30 cm fausse la taille de 16 cm."
        },
        {
          title: "Posture droite",
          desc: "Talons au sol, dos droit, regard horizontal. Tout défaut de posture sur la photo reproduit les mêmes erreurs qu'une toise physique."
        },
        {
          title: "Corps entier visible",
          desc: "Couper les pieds ou le haut de la tête empêche une mesure précise. Un cadrage net des pieds à la tête donne le résultat le plus fiable."
        }
      ]
    },
    noTapeMethods: {
      eyebrow: "Méthodes alternatives",
      title: "Comment Mesurer sa Taille Sans Mètre Ruban",
      description: "Cinq méthodes pratiques lorsque aucun mètre ruban n'est disponible.",
      methods: [
        {
          id: "wall-a4",
          title: "Méthode du repère mural et de la feuille A4",
          tags: ["Livre rigide", "Feuille A4", "Crayon"],
          desc: "Tracez un repère au mur à l'aide d'un livre rigide. Posez le grand côté d'une feuille A4 (29,7 cm) du sol vers le haut, marquez et répétez jusqu'au repère. Multipliez les feuilles par 29,7 cm et complétez avec une feuille pliée en deux (14,85 cm)."
        },
        {
          id: "door",
          title: "Méthode du chambranle de porte",
          tags: ["Une porte"],
          desc: "Les portes standards mesurent souvent autour de 200 à 203 cm. Placez-vous dans l'ouverture, notez où arrive le sommet de votre crâne pour obtenir une estimation immédiate."
        },
        {
          id: "arm-span",
          title: "Méthode de l'envergure des bras",
          tags: ["Un mur ou une personne"],
          desc: "L'envergure d'un bout des doigts à l'autre, bras tendus à l'horizontale, correspond presque exactement à votre taille (écart moyen inférieur à 2,5 cm)."
        },
        {
          id: "phone",
          title: "Méthode de l'application smartphone",
          tags: ["Un smartphone"],
          desc: "Sur les iPhone et iPad récents, l'application Mesures d'Apple mesure la taille des personnes. Sur tout autre appareil, prenez une photo et utilisez notre outil ci-dessus."
        },
        {
          id: "dollar",
          title: "Méthode du billet de banque",
          tags: ["Billets"],
          desc: "Les billets de banque ont des dimensions fixes (5 € = 12 cm, 20 € = 13,3 cm ; dollar = 15,6 cm). Empilez-les verticalement le long du mur sur votre repère."
        }
      ],
      footer: "Chaque méthode fournit une bonne approximation, mais aucune n'égale un étalonnage rigoureux d'après photo."
    },
    clinicMethod: {
      eyebrow: "Protocole médical",
      title: "Comment Mesurer sa Taille Précisément : La Méthode Clinique",
      description: "Adapté des protocoles médicaux de toise stadiométrique (directives CDC) pour une précision physique maximale à domicile.",
      steps: [
        "Retirez chaussures, vêtements épais, chapeaux et accessoires, et défaites les coiffures hautes.",
        "Tenez-vous sur un sol dur (carrelage ou parquet, pas de moquette) contre un mur droit sans plinthe saillante.",
        "Pieds joints à plat, jambes tendues, bras le long du corps et épaules relâchées au même niveau.",
        "Touchez le mur avec l'arrière de la tête, les omoplates, les fesses et les talons (selon les morphologies, tous les points ne touchent pas en même temps).",
        "Regardez droit devant vous. Descendez un livre rigide ou une équerre perpendiculairement au mur jusqu'au sommet du crâne et tracez un trait au crayon en dessous.",
        "Mesurez du sol au trait avec un mètre ruban métallique au millimètre près. Sans mètre, utilisez une feuille A4 ou notre outil photo."
      ],
      whyAloneTitle: "Pourquoi se Mesurer Seul Conduit Souvent à l'Erreur",
      errorCauses: [
        {
          title: "Tendance à s'affaisser",
          desc: "On s'affaisse souvent légèrement sans s'en rendre compte en essayant de placer un livre sur sa tête."
        },
        {
          title: "Livre incliné",
          desc: "Le livre ou la règle n'est pas tenu parfaitement à angle droit (90°) avec le mur."
        },
        {
          title: "Mètre non tendu",
          desc: "Le ruban ne repose pas parfaitement à plat au sol ou dévie le long du mur."
        },
        {
          title: "Moment de la journée",
          desc: "La compression des disques vertébraux fait perdre jusqu'à 1 cm de taille entre le matin et le soir."
        }
      ],
      whyAloneFooter: "Se mesurer seul complique tout : rester droit, tenir un livre d'équerre, marquer et mesurer en même temps. Une photo avec un objet de référence évite d'avoir besoin d'une seconde personne."
    },
    faq: {
      badge: "CENTRE D'AIDE",
      title: "Foire Aux Questions",
      items: [
        {
          id: "how-accurate-is-height-measurement-from-a-photo",
          q: "Quelle est la précision de la mesure de taille d'après photo ?",
          a: "Tout dépend de la prise de vue. Lors de nos essais sur 14 scènes calibrées, un smartphone tenu à niveau face à une personne au mur a mesuré la taille exacte. Une inclinaison de 10° à 20° a induit un écart de 2 à 6 cm, et s'avancer de 30 cm par rapport à la porte a ajouté 16 cm fictifs. Dans de bonnes conditions, les résultats restent régulièrement compris entre 1 et 2 cm de marge."
        },
        {
          id: "what-is-the-best-object-to-use-for-calibration",
          q: "Quel est le meilleur objet pour calibrer ?",
          a: "Une feuille A4 (29,7 cm de long) ou une carte bancaire (8,56 cm de large) conviennent partout dans le monde grâce aux normes ISO. Une porte intérieure (souvent 203 cm) est idéale pour les photos en pied, en vérifiant sa hauteur une première fois."
        },
        {
          id: "is-my-photo-uploaded-or-stored",
          q: "Ma photo est-elle enregistrée ou envoyée sur un serveur ?",
          a: "Non. L'outil s'exécute entièrement dans votre navigateur. Votre cliché ne quitte jamais votre appareil."
        },
        {
          id: "can-i-measure-someone-elses-height-from-a-photo",
          q: "Puis-je mesurer la taille d'une autre personne sur une photo ?",
          a: "Oui. Importez n'importe quelle photo où la personne pose à côté d'un objet de taille connue, étalonnez et tracez la ligne pour lire le résultat sans qu'elle soit présente."
        },
        {
          id: "does-it-work-for-celebrities",
          q: "Est-ce que cela fonctionne pour les célébrités ?",
          a: "Oui, dès lors que la photo montre la star à côté d'une porte ou d'un repère identifiable, sur une vue de face sans perspective déformée."
        },
        {
          id: "why-do-i-measure-taller-in-the-morning",
          q: "Pourquoi est-on plus grand le matin ?",
          a: "Les disques intervertébraux se tassent au cours de la journée sous le poids du corps. Ce tassement réduit la stature debout jusqu'à 1 centimètre entre le réveil et le coucher."
        },
        {
          id: "do-i-need-an-account",
          q: "Faut-il créer un compte ?",
          a: "Non. L'outil est totalement gratuit, sans inscription et fonctionne sur n'importe quel appareil."
        }
      ]
    },
    tool: {
      step1Calibration: "Étape 1 : Calibrage",
      step2Measure: "Étape 2 : Mesurer la personne",
      tapOtherEnd: "Touchez l'autre extrémité pour valider",
      drawCalibLine: "Tracez la ligne d'étalonnage de l'objet sur l'écran",
      drawMeasLine: "Cliquez sur 'Scan auto' ou tracez une ligne de la tête aux pieds",
      cancel: "Annuler",
      done: "Terminé"
    }
  },
  heightDifference: {
    intro: {
      heroCtaButton: "Calculer la Différence Maintenant",
      heroBadgeFree: "Gratuit et sans limite",
      heroBadgeNoSignup: "Sans inscription",
      heroBadgeUnits: "Métrique & Impérial"
    },
    howToCalculate: {
      personAValue: "Alex : 170 cm",
      personBValue: "Ben : 185 cm",
      differenceValue: "15 cm (5,9 in)"
    },
    percentage: {
      heightDiffValue: "15 cm",
      tallerHeightValue: "185 cm",
      calculationValue: "(15 ÷ 185) × 100",
      percentDiffValue: "8,1 %",
      p3: "Cette distinction a son importance : pour évaluer des écarts de taille dans un couple ou chez des athlètes, le pourcentage relatif donne une vision plus juste que le simple écart en centimètres.",
      p4: "Le même écart en centimètres devient un pourcentage plus faible à mesure que les tailles augmentent. Un écart de 10 cm équivaut à 6,3 % lorsque la personne la plus grande mesure 160 cm, et à 5,3 % lorsqu'elle mesure 190 cm.",
      duoShorterLabel: "Par rapport à la personne la plus petite",
      duoShorterValue: "8,8 % plus grand",
      duoShorterEq: "(15 ÷ 170) × 100 = 8,82 %",
      duoTallerLabel: "Par rapport à la personne la plus grande",
      duoTallerValue: "8,1 % plus petit",
      duoTallerEq: "(15 ÷ 185) × 100 = 8,11 %"
    },
    couple: {
      statAvgGapLabel: "Écart moyen, couples britanniques",
      statAvgGapValue: "14,1 cm",
      statAvgGapSub: "5,6 in",
      statAvgGapSampleSize: "12 502 couples",
      statManTallerLabel: "Homme plus grand",
      statManTallerValue: "92,5 %",
      statManTallerSub: "des couples dans l'étude",
      distTableCaption: "Répartition des couples selon l'écart de taille",
      tableHeaderGap: "Homme plus grand de",
      tableHeaderShare: "Part des couples",
      bandWomanTaller: "Femme plus grande",
      band0to5: "0 à 5 cm",
      band5to10: "5 à 10 cm",
      band10to15: "10 à 15 cm",
      band15to20: "15 a 20 cm",
      band20to25: "20 à 25 cm",
      band25to30: "25 à 30 cm",
      bandOver30: "Plus de 30 cm"
    }
  }
};

updateLocale('fr', frData);

