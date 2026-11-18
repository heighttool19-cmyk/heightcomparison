const fs = require('fs');
const path = require('path');

function updateHD(loc, patch) {
  const filePath = path.resolve(`messages/${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.heightDifference) data.heightDifference = {};

  for (const sec in patch) {
    if (typeof patch[sec] === 'object' && !Array.isArray(patch[sec])) {
      data.heightDifference[sec] = Object.assign(data.heightDifference[sec] || {}, patch[sec]);
    } else {
      data.heightDifference[sec] = patch[sec];
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated heightDifference for ${loc}`);
}

// SPANISH (es)
const esPatch = {
  tool: {
    cardHeaderTitle: "Introduce dos estaturas",
    cardHeaderSub: "Los resultados se actualizan al escribir",
    unitMetric: "Métrico (cm)",
    unitImperial: "Imperial (ft/in)",
    person1Label: "Persona 1",
    person2Label: "Persona 2",
    swapButtonLabel: "Intercambiar Persona 1 y Persona 2",
    swapButtonTitle: "Intercambiar alturas",
    cmPlaceholder: "ej. 180",
    cmPlaceholder2: "ej. 165",
    ftLabel: "FT",
    inLabel: "IN",
    hintText: "Escribe una altura en cada casilla. Usa el selector para cambiar a pies y pulgadas.",
    heightDifferenceLabel: "Diferencia de altura",
    percentDifferenceLabel: "% de diferencia",
    tallerPersonLabel: "Persona más alta",
    gapGraphicLabel: "Gráfico de diferencia",
    badgeFree: "Gratis",
    badgeNoAccount: "Sin registro",
    badgeSupportsUnits: "Compatible con cm y ft/in",
    badgeUpdatesLive: "Actualización en directo",
    noDifferenceText: "Sin diferencia",
    personShorterText: "{person} es un {pct}% más bajo/a",
    sameHeightText: "Misma estatura"
  },
  coupleCalc: {
    chipsLabel: "Parejas de ejemplo",
    partner1Label: "Pareja 1",
    partner2Label: "Pareja 2",
    coupleLine: "La Pareja 1 ({h1} cm) es <strong>{gap} cm más alta</strong> que la Pareja 2 ({h2} cm). La diferencia equivale al {pct}% de la altura de la Pareja 1.",
    coupleBandText: "Una diferencia de {gap} cm se sitúa en el grupo \"{band}\", que abarca aproximadamente el {share}% de las parejas del estudio.",
    bandWomanTaller: "mujer más alta",
    band0to5: "0 a 5 cm",
    band5to10: "5 a 10 cm",
    band10to15: "10 a 15 cm",
    band15to20: "15 a 20 cm",
    band20to25: "20 a 25 cm",
    band25to30: "25 a 30 cm",
    bandOver30: "más de 30 cm"
  },
  couple: {
    tableSource: "Fuente: Stulp et al. (2013), padres en el UK Millennium Cohort Study.",
    p3: "Las diferencias de 10 a 20 cm representaron aproximadamente el 42% de las parejas estudiadas.",
    coupleCardChipsLabel: "Parejas de ejemplo",
    coupleLine: "La Pareja 1 ({h1} cm) es <strong>{gap} cm más alta</strong> que la Pareja 2 ({h2} cm). La diferencia equivale al {pct}% de la altura de la Pareja 1.",
    coupleBandText: "Una diferencia de {gap} cm se sitúa en el grupo \"{band}\", que abarca aproximadamente el {share}% de las parejas del estudio."
  },
  unitsSection: {
    title: "Diferencia de Altura en Distintas Unidades",
    p1: "La calculadora admite tanto unidades métricas como imperiales. Comprueba cómo se expresan las diferencias más comunes en ambos sistemas.",
    subheadFtIn: "Diferencia de altura en pies y pulgadas",
    table1HeaderPersonA: "Persona A",
    table1HeaderPersonB: "Persona B",
    table1HeaderDiffIn: "Diferencia (in)",
    table1HeaderDiffCm: "Diferencia (cm)",
    table1HeaderPercent: "% Diferencia",
    subheadCm: "Diferencia de altura en centímetros",
    table2HeaderDiffCm: "Diferencia de altura (cm)",
    table2HeaderInInches: "En pulgadas",
    table2HeaderExamplePair: "Pareja de ejemplo",
    table2HeaderPercent: "% Diferencia"
  },
  chartSection: {
    title: "Tabla Comparativa de Diferencia de Altura",
    p1: "Nuestra tabla muestra combinaciones comunes de estatura, la diferencia en centímetros y pulgadas, y el porcentaje relativo.",
    p2: "Úsala para consultar rápidamente la diferencia entre amigos, familiares o parejas.",
    calloutPrefix: "¿Quieres comparar tres o más personas juntas a escala? Prueba nuestra ",
    calloutLink: "Calculadora de Comparación de Altura",
    calloutSuffix: " con soporte para más de diez figuras a la vez."
  },
  cta: {
    title: "¿Listo para Calcular la Diferencia de Altura?",
    descriptionLine1: "Introduce dos estaturas y obtén la diferencia en centímetros y pulgadas, el porcentaje y la clasificación en parejas al instante.",
    descriptionLine2: "La herramienta es 100% gratuita, funciona en cualquier dispositivo y no requiere registro.",
    feature1: "Cálculo instantáneo en tiempo real",
    feature2: "Porcentaje de diferencia y barra gráfica",
    feature3: "Compatible con cm y pies/pulgadas",
    feature4: "Completamente gratis y sin cuenta",
    buttonText: "Subir y calcular ahora ↑"
  },
  faq: [
    {
      q: "¿Cuál es la diferencia de altura normal entre parejas?",
      a: "No existe una medida fija. En un amplio estudio británico con 12.502 parejas, el hombre era en promedio 14,1 cm (5,6 pulgadas) más alto. Aproximadamente el 42% de las parejas presentaban una diferencia de entre 10 y 20 cm. Nuestra calculadora permite visualizar cualquier combinación."
    },
    {
      q: "¿Cómo se calcula la diferencia de altura?",
      a: "Resta la estatura menor de la mayor: Diferencia de Altura = Estatura Mayor − Estatura Menor. Para 180 cm y 165 cm, la diferencia es de 15 cm. Para obtener el porcentaje, divide 15 entre 180 y multiplica por 100 (8,3%)."
    },
    {
      q: "¿Muestra la calculadora la diferencia porcentual?",
      a: "Sí. Muestra tanto la distancia en cm y pulgadas como la diferencia porcentual respecto a la persona más alta, actualizando ambos valores en directo."
    },
    {
      q: "¿Es lo mismo \"porcentaje más alto\" que \"porcentaje más bajo\"?",
      a: "No. \"Porcentaje más bajo\" divide la diferencia entre la altura mayor (15 ÷ 180 = 8,3%). \"Porcentaje más alto\" divide entre la altura menor (15 ÷ 165 = 9,1%). Ambos porcentajes describen la misma diferencia de 15 cm."
    },
    {
      q: "¿Qué unidades de medida se pueden utilizar?",
      a: "La calculadora admite centímetros, así como pies y pulgadas. Cambiar de unidad convierte al instante tanto los datos introducidos como los resultados."
    }
  ],
  toc: [
    { id: "calculate-height-difference", label: "Calcular diferencia de altura" },
    { id: "how-to-calculate-height-difference", label: "Cómo calcular la diferencia de altura" },
    { id: "height-difference-percentage", label: "Diferencia de altura en porcentaje" },
    { id: "couple-height-difference-calculator", label: "Calculadora para parejas" },
    { id: "height-difference-chart", label: "Tabla de diferencias de altura" },
    { id: "height-difference-in-different-units", label: "Diferencia en distintas unidades" },
    { id: "try-the-height-difference-calculator", label: "Probar la calculadora" },
    { id: "frequently-asked-questions", label: "Preguntas frecuentes" },
    { id: "references", label: "Fuentes" }
  ]
};

// FRENCH (fr)
const frPatch = {
  tool: {
    cardHeaderTitle: "Entrez deux tailles",
    cardHeaderSub: "Résultats mis à jour en direct",
    unitMetric: "Métrique (cm)",
    unitImperial: "Impérial (ft/in)",
    person1Label: "Personne 1",
    person2Label: "Personne 2",
    swapButtonLabel: "Inverser Personne 1 et Personne 2",
    swapButtonTitle: "Inverser les tailles",
    cmPlaceholder: "ex. 180",
    cmPlaceholder2: "ex. 165",
    ftLabel: "FT",
    inLabel: "IN",
    hintText: "Saisissez une taille dans chaque case. Utilisez le sélecteur ci-dessus pour passer en pieds et pouces.",
    heightDifferenceLabel: "Différence de taille",
    percentDifferenceLabel: "% de différence",
    tallerPersonLabel: "Personne la plus grande",
    gapGraphicLabel: "Écart visuel",
    badgeFree: "Gratuit",
    badgeNoAccount: "Sans inscription",
    badgeSupportsUnits: "Compatible cm et ft/in",
    badgeUpdatesLive: "Mise à jour en direct",
    noDifferenceText: "Aucune différence",
    personShorterText: "{person} est {pct}% plus petit(e)",
    sameHeightText: "Même taille"
  },
  coupleCalc: {
    chipsLabel: "Exemples de couples",
    partner1Label: "Partenaire 1",
    partner2Label: "Partenaire 2",
    coupleLine: "Partenaire 1 ({h1} cm) est <strong>{gap} cm plus grand(e)</strong> que Partenaire 2 ({h2} cm). Cet écart correspond à {pct}% de la taille de Partenaire 1.",
    coupleBandText: "Un écart de {gap} cm se situe dans la catégorie \"{band}\", qui représentait environ {share}% des couples étudiés.",
    bandWomanTaller: "femme plus grande",
    band0to5: "0 à 5 cm",
    band5to10: "5 à 10 cm",
    band10to15: "10 à 15 cm",
    band15to20: "15 à 20 cm",
    band20to25: "20 à 25 cm",
    band25to30: "25 à 30 cm",
    bandOver30: "plus de 30 cm"
  },
  couple: {
    tableSource: "Source : Stulp et al. (2013), parents dans la UK Millennium Cohort Study.",
    p3: "Les écarts de 10 à 20 cm représentaient environ 42% des couples étudiés.",
    coupleCardChipsLabel: "Exemples de couples",
    coupleLine: "Partenaire 1 ({h1} cm) est <strong>{gap} cm plus grand(e)</strong> que Partenaire 2 ({h2} cm). Cet écart correspond à {pct}% de la taille de Partenaire 1.",
    coupleBandText: "Un écart de {gap} cm se situe dans la catégorie \"{band}\", qui représentait environ {share}% des couples étudiés."
  },
  unitsSection: {
    title: "Différence de Taille dans Différentes Unités",
    p1: "Le calculateur prend en charge les systèmes métrique et impérial. Découvrez ci-dessous les écarts courants exprimés dans les deux systèmes.",
    subheadFtIn: "Différence de taille en pieds et pouces",
    table1HeaderPersonA: "Personne A",
    table1HeaderPersonB: "Personne B",
    table1HeaderDiffIn: "Différence (in)",
    table1HeaderDiffCm: "Différence (cm)",
    table1HeaderPercent: "% Différence",
    subheadCm: "Différence de taille en centimètres",
    table2HeaderDiffCm: "Différence de taille (cm)",
    table2HeaderInInches: "En pouces",
    table2HeaderExamplePair: "Couple d'exemple",
    table2HeaderPercent: "% Différence"
  },
  chartSection: {
    title: "Tableau Comparatif des Écarts de Taille",
    p1: "Notre tableau présente les combinaisons de tailles fréquentes, l'écart en centimètres et en pouces, ainsi que le pourcentage relatif.",
    p2: "Consultez-le pour comparer facilement des amis, des membres de la famille ou des partenaires.",
    calloutPrefix: "Vous souhaitez comparer trois personnes ou plus à l'échelle ? Essayez notre ",
    calloutLink: "Calculateur de Comparaison de Taille",
    calloutSuffix: " avec prise en charge de plus de dix silhouettes en simultané."
  },
  cta: {
    title: "Prêt à Calculer Votre Différence de Taille ?",
    descriptionLine1: "Entrez deux tailles pour voir l'écart en centimètres et pouces, le pourcentage et la répartition statistique chez les couples.",
    descriptionLine2: "L'outil est 100% gratuit, fonctionne sur tous les navigateurs et ne nécessite aucune inscription.",
    feature1: "Calcul instantané en direct",
    feature2: "Pourcentage et barre visuelle",
    feature3: "Compatible cm et pieds/pouces",
    feature4: "Gratuit et sans compte",
    buttonText: "Remonter et calculer maintenant ↑"
  },
  faq: [
    {
      q: "Quelle est la différence de taille normale dans un couple ?",
      a: "Il n'y a pas de norme unique. Dans une grande étude britannique portant sur 12 502 couples, l'homme mesurait en moyenne 14,1 cm (5,6 pouces) de plus. Environ 42% des couples présentaient un écart de 10 à 20 cm. Notre outil vous permet de visualiser n'importe quel écart."
    },
    {
      q: "Comment calcule-t-on la différence de taille ?",
      a: "Soustrayez la plus petite taille de la plus grande : Différence = Plus Grande Taille − Plus Petite Taille. Pour 180 cm et 165 cm, l'écart est de 15 cm. Pour obtenir le pourcentage, divisez 15 par 180 et multipliez par 100 (8,3%)."
    },
    {
      q: "Le calculateur indique-t-il la différence en pourcentage ?",
      a: "Oui. Il affiche l'écart en cm et pouces ainsi que le pourcentage par rapport à la personne la plus grande, actualisé en temps réel."
    },
    {
      q: "Le « pourcentage plus grand » est-il identique au « pourcentage plus petit » ?",
      a: "Non. « Pourcentage plus petit » divise l'écart par la plus grande taille (15 ÷ 180 = 8,3%). « Pourcentage plus grand » divise par la plus petite taille (15 ÷ 165 = 9,1%). Les deux décrivent le même écart de 15 cm."
    },
    {
      q: "Quelles unités de mesure peut-on utiliser ?",
      a: "Le calculateur accepte les centimètres ainsi que les pieds et pouces. Changer d'unité convertit instantanément les saisies et le résultat."
    }
  ],
  toc: [
    { id: "calculate-height-difference", label: "Calculer la différence de taille" },
    { id: "how-to-calculate-height-difference", label: "Comment calculer la différence de taille" },
    { id: "height-difference-percentage", label: "Différence de taille en pourcentage" },
    { id: "couple-height-difference-calculator", label: "Calculateur pour couples" },
    { id: "height-difference-chart", label: "Tableau des différences de taille" },
    { id: "height-difference-in-different-units", label: "Différence dans d'autres unités" },
    { id: "try-the-height-difference-calculator", label: "Essayer le calculateur" },
    { id: "frequently-asked-questions", label: "Foire aux questions" },
    { id: "references", label: "Sources" }
  ]
};

// PORTUGUESE (pt)
const ptPatch = {
  tool: {
    cardHeaderTitle: "Insira duas alturas",
    cardHeaderSub: "Resultados atualizados ao digitar",
    unitMetric: "Métrico (cm)",
    unitImperial: "Imperial (ft/in)",
    person1Label: "Pessoa 1",
    person2Label: "Pessoa 2",
    swapButtonLabel: "Inverter Pessoa 1 e Pessoa 2",
    swapButtonTitle: "Inverter alturas",
    cmPlaceholder: "ex: 180",
    cmPlaceholder2: "ex: 165",
    ftLabel: "FT",
    inLabel: "IN",
    hintText: "Digite uma altura em cada campo. Use o seletor acima para alternar para pés e polegadas.",
    heightDifferenceLabel: "Diferença de altura",
    percentDifferenceLabel: "% de diferença",
    tallerPersonLabel: "Pessoa mais alta",
    gapGraphicLabel: "Gráfico de diferença",
    badgeFree: "Grátis",
    badgeNoAccount: "Sem cadastro",
    badgeSupportsUnits: "Suporta cm e ft/in",
    badgeUpdatesLive: "Atualização ao vivo",
    noDifferenceText: "Sem diferença",
    personShorterText: "{person} é {pct}% mais baixo(a)",
    sameHeightText: "Mesma altura"
  },
  coupleCalc: {
    chipsLabel: "Casais de exemplo",
    partner1Label: "Parceiro(a) 1",
    partner2Label: "Parceiro(a) 2",
    coupleLine: "Parceiro(a) 1 ({h1} cm) é <strong>{gap} cm mais alto(a)</strong> que Parceiro(a) 2 ({h2} cm). A diferença equivale a {pct}% da altura de Parceiro(a) 1.",
    coupleBandText: "Uma diferença de {gap} cm enquadra-se no grupo \"{band}\", que representou cerca de {share}% dos casais do estudo.",
    bandWomanTaller: "mulher mais alta",
    band0to5: "0 a 5 cm",
    band5to10: "5 a 10 cm",
    band10to15: "10 a 15 cm",
    band15to20: "15 a 20 cm",
    band20to25: "20 a 25 cm",
    band25to30: "25 a 30 cm",
    bandOver30: "mais de 30 cm"
  },
  couple: {
    tableSource: "Fonte: Stulp et al. (2013), pais no UK Millennium Cohort Study.",
    p3: "Diferenças entre 10 e 20 cm abrangeram cerca de 42% dos casais do estudo.",
    coupleCardChipsLabel: "Casais de exemplo",
    coupleLine: "Parceiro(a) 1 ({h1} cm) é <strong>{gap} cm mais alto(a)</strong> que Parceiro(a) 2 ({h2} cm). A diferença equivale a {pct}% da altura de Parceiro(a) 1.",
    coupleBandText: "Uma diferença de {gap} cm enquadra-se no grupo \"{band}\", que representou cerca de {share}% dos casais do estudo."
  },
  unitsSection: {
    title: "Diferença de Altura em Unidades Diferentes",
    p1: "A calculadora suporta tanto unidades métricas quanto imperiais. Confira abaixo como se expressam as diferenças mais comuns em ambos os sistemas.",
    subheadFtIn: "Diferença de altura em pés e polegadas",
    table1HeaderPersonA: "Pessoa A",
    table1HeaderPersonB: "Pessoa B",
    table1HeaderDiffIn: "Diferença (in)",
    table1HeaderDiffCm: "Diferença (cm)",
    table1HeaderPercent: "% Diferença",
    subheadCm: "Diferença de altura em centímetros",
    table2HeaderDiffCm: "Diferença de altura (cm)",
    table2HeaderInInches: "Em polegadas",
    table2HeaderExamplePair: "Casal de exemplo",
    table2HeaderPercent: "% Diferença"
  },
  chartSection: {
    title: "Tabela Comparativa de Diferença de Altura",
    p1: "Nossa tabela apresenta combinações comuns de estatura, a diferença em centímetros e polegadas, e a porcentagem relativa.",
    p2: "Utilize-a para consultar com rapidez as diferenças entre amigos, parentes ou casais.",
    calloutPrefix: "Deseja comparar três ou mais pessoas lado a lado em escala? Experimente a nossa ",
    calloutLink: "Calculadora de Comparação de Altura",
    calloutSuffix: " com suporte a mais de dez figuras simultâneas."
  },
  cta: {
    title: "Pronto para Calcular a Diferença de Altura?",
    descriptionLine1: "Insira duas alturas e veja a diferença em centímetros e polegadas, a porcentagem e a classificação em casais na hora.",
    descriptionLine2: "A ferramenta é 100% gratuita, funciona em qualquer navegador e não requer cadastro.",
    feature1: "Cálculo instantâneo em tempo real",
    feature2: "Porcentagem e barra gráfica",
    feature3: "Compatível com cm e pés/polegadas",
    feature4: "Totalmente grátis e sem conta",
    buttonText: "Rolar para o topo e calcular agora ↑"
  },
  faq: [
    {
      q: "Qual é a diferença de altura normal entre casais?",
      a: "Não existe um padrão fixo. Em um estudo britânico amplo com 12.502 casais, o homem era em média 14,1 cm (5,6 polegadas) mais alto. Cerca de 42% dos casais apresentavam uma diferença de 10 a 20 cm. Nossa calculadora permite visualizar qualquer combinação."
    },
    {
      q: "Como se calcula a diferença de altura?",
      a: "Subtraia a menor altura da maior: Diferença = Altura Maior − Altura Menor. Para 180 cm e 165 cm, a diferença é de 15 cm. Para obter a porcentagem, divida 15 por 180 e multiplique por 100 (8,3%)."
    },
    {
      q: "A calculadora mostra a diferença percentual?",
      a: "Sim. Ela exibe a distância em cm e polegadas e a porcentagem relativa à pessoa mais alta, atualizando os dados ao vivo."
    },
    {
      q: "\"Porcentagem mais alto\" é o mesmo que \"porcentagem mais baixo\"?",
      a: "Não. \"Porcentagem mais baixo\" divide a diferença pela maior altura (15 ÷ 180 = 8,3%). \"Porcentagem mais alto\" divide pela menor altura (15 ÷ 165 = 9,1%). Ambos descrevem a mesma distância de 15 cm."
    },
    {
      q: "Quais unidades de medida podem ser utilizadas?",
      a: "A calculadora aceita centímetros, além de pés e polegadas. Alternar a unidade converte instantaneamente tanto as entradas quanto o resultado."
    }
  ],
  toc: [
    { id: "calculate-height-difference", label: "Calcular diferença de altura" },
    { id: "how-to-calculate-height-difference", label: "Como calcular a diferença de altura" },
    { id: "height-difference-percentage", label: "Diferença de altura em porcentagem" },
    { id: "couple-height-difference-calculator", label: "Calculadora para casais" },
    { id: "height-difference-chart", label: "Tabela de diferenças de altura" },
    { id: "height-difference-in-different-units", label: "Diferença em outras unidades" },
    { id: "try-the-height-difference-calculator", label: "Testar a calculadora" },
    { id: "frequently-asked-questions", label: "Perguntas frequentes" },
    { id: "references", label: "Fontes" }
  ]
};

// ITALIAN (it)
const itPatch = {
  tool: {
    cardHeaderTitle: "Inserisci due altezze",
    cardHeaderSub: "Risultati aggiornati in tempo reale",
    unitMetric: "Metrico (cm)",
    unitImperial: "Imperiale (ft/in)",
    person1Label: "Persona 1",
    person2Label: "Persona 2",
    swapButtonLabel: "Inverti Persona 1 e Persona 2",
    swapButtonTitle: "Scambia altezze",
    cmPlaceholder: "es. 180",
    cmPlaceholder2: "es. 165",
    ftLabel: "FT",
    inLabel: "IN",
    hintText: "Digita un'altezza in ciascuna casella. Usa il selettore in alto per passare a piedi e pollici.",
    heightDifferenceLabel: "Differenza di altezza",
    percentDifferenceLabel: "% di differenza",
    tallerPersonLabel: "Persona più alta",
    gapGraphicLabel: "Grafico dello scarto",
    badgeFree: "Gratuito",
    badgeNoAccount: "Senza registrazione",
    badgeSupportsUnits: "Supporta cm e ft/in",
    badgeUpdatesLive: "Aggiornato in tempo reale",
    noDifferenceText: "Nessuna differenza",
    personShorterText: "{person} è più basso/a dell'{pct}%",
    sameHeightText: "Stessa altezza"
  },
  coupleCalc: {
    chipsLabel: "Coppie di esempio",
    partner1Label: "Partner 1",
    partner2Label: "Partner 2",
    coupleLine: "Partner 1 ({h1} cm) è <strong>{gap} cm più alto/a</strong> di Partner 2 ({h2} cm). Lo scarto equivale all'{pct}% dell'altezza di Partner 1.",
    coupleBandText: "Uno scarto di {gap} cm rientra nella fascia \"{band}\", che corrisponde a circa il {share}% delle coppie nello studio.",
    bandWomanTaller: "donna più alta",
    band0to5: "da 0 a 5 cm",
    band5to10: "da 5 a 10 cm",
    band10to15: "da 10 a 15 cm",
    band15to20: "da 15 a 20 cm",
    band20to25: "da 20 a 25 cm",
    band25to30: "da 25 a 30 cm",
    bandOver30: "oltre 30 cm"
  },
  couple: {
    tableSource: "Fonte: Stulp et al. (2013), genitori nello studio UK Millennium Cohort.",
    p3: "Gli scarti compresi tra 10 e 20 cm riguardavano circa il 42% delle coppie esaminate.",
    coupleCardChipsLabel: "Coppie di esempio",
    coupleLine: "Partner 1 ({h1} cm) è <strong>{gap} cm più alto/a</strong> di Partner 2 ({h2} cm). Lo scarto equivale all'{pct}% dell'altezza di Partner 1.",
    coupleBandText: "Uno scarto di {gap} cm rientra nella fascia \"{band}\", che corrisponde a circa il {share}% delle coppie nello studio."
  },
  unitsSection: {
    title: "Differenza di Altezza in Diverse Unità",
    p1: "Il calcolatore supporta sia il sistema metrico che quello imperiale. Ecco come si presentano gli scarti più comuni in entrambi i sistemi.",
    subheadFtIn: "Differenza di altezza in piedi e pollici",
    table1HeaderPersonA: "Persona A",
    table1HeaderPersonB: "Persona B",
    table1HeaderDiffIn: "Differenza (in)",
    table1HeaderDiffCm: "Differenza (cm)",
    table1HeaderPercent: "% Differenza",
    subheadCm: "Differenza di altezza in centimetri",
    table2HeaderDiffCm: "Differenza di altezza (cm)",
    table2HeaderInInches: "In pollici",
    table2HeaderExamplePair: "Coppia di esempio",
    table2HeaderPercent: "% Differenza"
  },
  chartSection: {
    title: "Tabella Comparativa delle Differenze di Altezza",
    p1: "La nostra tabella riassume le combinazioni più comuni, il divario in centimetri e pollici e lo scarto percentuale relativo.",
    p2: "Consultala per verificare rapidamente i rapporti di statura tra amici, familiari o partner.",
    calloutPrefix: "Vuoi confrontare tre o più persone insieme in scala proporzionale? Prova il nostro ",
    calloutLink: "Calcolatore di Confronto Altezza",
    calloutSuffix: " con supporto per oltre dieci figure contemporaneamente."
  },
  cta: {
    title: "Pronto a Calcolare la Differenza di Statura?",
    descriptionLine1: "Inserisci due altezze per scoprire lo scarto in centimetri e pollici, la percentuale e la collocazione nelle statistiche delle coppie.",
    descriptionLine2: "Lo strumento è gratis al 100%, funziona su ogni dispositivo e non richiede iscrizioni.",
    feature1: "Elaborazione istantanea in tempo reale",
    feature2: "Percentuale e barra visiva dello scarto",
    feature3: "Supporto completo per cm e piedi/pollici",
    feature4: "Gratuito per sempre e senza account",
    buttonText: "Torna in alto e calcola ora ↑"
  },
  faq: [
    {
      q: "Qual è la normale differenza di altezza in una coppia?",
      a: "Non esiste una misura fissa. In un'indagine britannica su 12.502 coppie, l'uomo era in media 14,1 cm (5,6 pollici) più alto. Circa il 42% delle coppie mostrava un divario compreso tra 10 e 20 cm. Il nostro calcolatore permette di simulare qualsiasi combinazione."
    },
    {
      q: "Come si calcola la differenza di altezza?",
      a: "Sottrai la statura minore da quella maggiore: Differenza = Statura Maggiore − Statura Minore. Con 180 cm e 165 cm, la differenza è di 15 cm. Per il valore percentuale, dividi 15 per 180 e moltiplica per 100 (8,3%)."
    },
    {
      q: "Il calcolatore mostra anche la percentuale di scarto?",
      a: "Sì. Visualizza sia la differenza in cm e pollici sia il valore percentuale calcolato rispetto alla persona più alta, aggiornati all'istante."
    },
    {
      q: "\"Percentuale più alto\" equivale a \"percentuale più basso\"?",
      a: "No. \"Percentuale più basso\" divide la differenza per la statura maggiore (15 ÷ 180 = 8,3%). \"Percentuale più alto\" divide per la statura minore (15 ÷ 165 = 9,1%). Entrambi descrivono lo stesso divario di 15 cm."
    },
    {
      q: "Quali unità di misura possono essere inserite?",
      a: "Il calcolatore accetta centimetri, nonché piedi e pollici. Cambiare unità converte all'istante sia i dati inseriti che il risultato finale."
    }
  ],
  toc: [
    { id: "calculate-height-difference", label: "Calcola differenza di altezza" },
    { id: "how-to-calculate-height-difference", label: "Come calcolare la differenza di altezza" },
    { id: "height-difference-percentage", label: "Differenza di altezza in percentuale" },
    { id: "couple-height-difference-calculator", label: "Calcolatore per coppie" },
    { id: "height-difference-chart", label: "Tabella di confronto altezze" },
    { id: "height-difference-in-different-units", label: "Differenza in unità diverse" },
    { id: "try-the-height-difference-calculator", label: "Prova il calcolatore" },
    { id: "frequently-asked-questions", label: "Domande frequenti" },
    { id: "references", label: "Fonti" }
  ]
};

// DUTCH (nl)
const nlPatch = {
  tool: {
    cardHeaderTitle: "Voer twee lengtes in",
    cardHeaderSub: "Resultaten worden direct bijgewerkt",
    unitMetric: "Metrisch (cm)",
    unitImperial: "Imperiaal (ft/in)",
    person1Label: "Persoon 1",
    person2Label: "Persoon 2",
    swapButtonLabel: "Wissel Persoon 1 en Persoon 2 om",
    swapButtonTitle: "Lengtes omwisselen",
    cmPlaceholder: "bijv. 180",
    cmPlaceholder2: "bijv. 165",
    ftLabel: "FT",
    inLabel: "IN",
    hintText: "Vul in elk veld een lengte in. Gebruik de schakelaar hierboven voor feet en inches.",
    heightDifferenceLabel: "Lengteverschil",
    percentDifferenceLabel: "% Verschil",
    tallerPersonLabel: "Langere persoon",
    gapGraphicLabel: "Verschilbalk",
    badgeFree: "Gratis",
    badgeNoAccount: "Geen account nodig",
    badgeSupportsUnits: "Ondersteunt cm en ft/in",
    badgeUpdatesLive: "Live bijgewerkt",
    noDifferenceText: "Geen verschil",
    personShorterText: "{person} is {pct}% korter",
    sameHeightText: "Zelfde lengte"
  },
  coupleCalc: {
    chipsLabel: "Voorbeeldkoppels",
    partner1Label: "Partner 1",
    partner2Label: "Partner 2",
    coupleLine: "Partner 1 ({h1} cm) is <strong>{gap} cm langer</strong> dan Partner 2 ({h2} cm). Dit verschil komt overeen met {pct}% van de lengte van Partner 1.",
    coupleBandText: "Een verschil van {gap} cm valt in de groep \"{band}\", die ongeveer {share}% van de onderzochte koppels uitmaakte.",
    bandWomanTaller: "vrouw langer",
    band0to5: "0 tot 5 cm",
    band5to10: "5 tot 10 cm",
    band10to15: "10 tot 15 cm",
    band15to20: "15 to 20 cm",
    band20to25: "20 tot 25 cm",
    band25to30: "25 tot 30 cm",
    bandOver30: "meer dan 30 cm"
  },
  couple: {
    tableSource: "Bron: Stulp et al. (2013), ouders in de UK Millennium Cohort Study.",
    p3: "Verschillen tussen 10 en 20 cm besloegen ongeveer 42% van de onderzochte koppels.",
    coupleCardChipsLabel: "Voorbeeldkoppels",
    coupleLine: "Partner 1 ({h1} cm) is <strong>{gap} cm langer</strong> dan Partner 2 ({h2} cm). Dit verschil komt overeen met {pct}% van de lengte van Partner 1.",
    coupleBandText: "Een verschil van {gap} cm valt in de groep \"{band}\", die ongeveer {share}% van de onderzochte koppels uitmaakte."
  },
  unitsSection: {
    title: "Lengteverschil in Verschillende Eenheden",
    p1: "De calculator ondersteunt zowel metrische als imperiale eenheden. Bekijk hieronder hoe veelvoorkomende lengteverschillen er in beide systemen uitzien.",
    subheadFtIn: "Lengteverschil in feet en inches",
    table1HeaderPersonA: "Persoon A",
    table1HeaderPersonB: "Persoon B",
    table1HeaderDiffIn: "Verschil (in)",
    table1HeaderDiffCm: "Verschil (cm)",
    table1HeaderPercent: "% Verschil",
    subheadCm: "Lengteverschil in centimeters",
    table2HeaderDiffCm: "Lengteverschil (cm)",
    table2HeaderInInches: "In inches",
    table2HeaderExamplePair: "Voorbeeldpaar",
    table2HeaderPercent: "% Verschil"
  },
  chartSection: {
    title: "Vergelijkingstabel Lengteverschillen",
    p1: "Onze tabel toont veelvoorkomende combinaties, het verschil in centimeters en inches, en het relatieve percentage.",
    p2: "Gebruik de tabel om snel verhoudingen tussen vrienden, familieleden of partners op te zoeken.",
    calloutPrefix: "Wil je drie of meer personen op schaal naast elkaar vergelijken? Probeer onze ",
    calloutLink: "Lengte Vergelijken Calculator",
    calloutSuffix: " met ondersteuning voor meer dan tien figuren tegelijk."
  },
  cta: {
    title: "Klaar om Jouw Lengteverschil te Berekenen?",
    descriptionLine1: "Voer twee lengtes in en ontdek het verschil in centimeters en inches, het percentage en de koppelstatistieken.",
    descriptionLine2: "De tool is 100% gratis, werkt in elke browser en vereist geen account.",
    feature1: "Directe live berekening",
    feature2: "Procentueel verschil en visuele balk",
    feature3: "Ondersteuning voor cm en ft/in",
    feature4: "Volledig gratis zonder inloggen",
    buttonText: "Naar boven en nu berekenen ↑"
  },
  faq: [
    {
      q: "Wat is een normaal lengteverschil tussen partners?",
      a: "Er is geen vaste standaard. In een grootschalig Brits onderzoek onder 12.502 koppels was de man gemiddeld 14,1 cm (5,6 inch) langer. Ongeveer 42% van de koppels had een verschil van 10 tot 20 cm. Onze calculator visualiseert elke mogelijke combinatie."
    },
    {
      q: "Hoe bereken je het lengteverschil?",
      a: "Trek de kleinere lengte af van de grotere lengte: Lengteverschil = Langere Lengte − Kortere Lengte. Bij 180 cm en 165 cm is het verschil 15 cm. Om het percentage te berekenen, deel je 15 door 180 en vermenigvuldig je met 100 (8,3%)."
    },
    {
      q: "Toont de calculator ook het procentuele verschil?",
      a: "Ja. De tool toont zowel de afstand in cm en inches als het percentage ten opzichte van de langere persoon, direct live bijgewerkt."
    },
    {
      q: "Is \"procent langer\" hetzelfde als \"procent korter\"?",
      a: "Nee. \"Procent korter\" deelt het verschil door de langere lengte (15 ÷ 180 = 8,3%). \"Procent langer\" deelt door de kortere lengte (15 ÷ 165 = 9,1%). Beide getallen beschrijven exact dezelfde afstand van 15 cm."
    },
    {
      q: "Welke maateenheden kunnen worden gebruikt?",
      a: "De calculator verwerkt centimeters, meters, feet en inches. Het wisselen van eenheid rekent direct zowel de invoer als het resultaat om."
    }
  ],
  toc: [
    { id: "calculate-height-difference", label: "Lengteverschil berekenen" },
    { id: "how-to-calculate-height-difference", label: "Hoe bereken je het lengteverschil" },
    { id: "height-difference-percentage", label: "Lengteverschil in percentage" },
    { id: "couple-height-difference-calculator", label: "Calculator voor koppels" },
    { id: "height-difference-chart", label: "Lengteverschil tabel" },
    { id: "height-difference-in-different-units", label: "Verschil in verschillende eenheden" },
    { id: "try-the-height-difference-calculator", label: "Probeer de calculator" },
    { id: "frequently-asked-questions", label: "Veelgestelde vragen" },
    { id: "references", label: "Bronnen" }
  ]
};

updateHD('es', esPatch);
updateHD('fr', frPatch);
updateHD('pt', ptPatch);
updateHD('it', itPatch);
updateHD('nl', nlPatch);

