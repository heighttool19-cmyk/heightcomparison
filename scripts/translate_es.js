const fs = require('fs');
const path = require('path');

const esPath = path.resolve('messages/es.json');
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// 1. HOME (Spanish)
es.home = {
  intro: {
    h1: "Calculadora de Comparación de Altura: Compara Alturas Online con Gráfico Visual",
    p: "Usa esta herramienta de comparación de altura para ver estaturas lado a lado con un gráfico a escala real. Introduce cualquier altura en centímetros, pies o pulgadas para ver la diferencia de altura al instante. La herramienta muestra una comparación visual mediante escalado proporcional. De este modo, puedes ver claramente qué tan alta o baja es una persona respecto a otra. El gráfico se actualiza en tiempo real y escala cada figura a partir del valor exacto que introduces. Puedes comparar dos o más alturas a la vez y crear un gráfico visual de diferencia de altura en segundos.",
    freeLibraryBadge: "Biblioteca Online Gratuita",
    freeLibraryDesc: "Accede a nuestra base de datos de alturas de referencia listas para usar en tres colecciones, crea comparaciones personalizadas ilimitadas y exporta gráficos PNG en alta resolución.",
    noAccounts: "Sin cuentas",
    noPayments: "Sin pagos",
    free100: "100% Gratis",
    compareNowCta: "Comparar Ahora ↑"
  },
  section1: {
    eyebrow: "Cómo funciona",
    title: "¿Cómo funciona un gráfico de comparación de altura?",
    p1: "Un gráfico de comparación de altura convierte las medidas numéricas en un gráfico visual donde cada barra representa la proporción matemática exacta entre alturas a escala real.",
    p2: "Si la Persona A mide 170 cm y la Persona B mide 185 cm, la segunda barra se dibuja exactamente a 1,09 veces la altura de la primera. Una diferencia de 10 cm a 160 cm se percibe proporcionalmente diferente que esa misma diferencia a 190 cm. El gráfico hace visible esa distinción sin necesidad de cálculos manuales.",
    p3: "Úsalo como creador de tablas de altura para familias, equipos deportivos o proyectos creativos.",
    imgAlt: "Gráfico de comparación de altura de una persona de 170 cm y otra de 185 cm lado a lado",
    imgCaption: "Alex con 170 cm (5'7\") y Ben con 185 cm (6'1\"), dibujados a escala.",
    needGapTitle: "¿Solo necesitas la diferencia exacta entre dos alturas específicas?",
    needGapDesc: "La Calculadora de Diferencia de Altura muestra la diferencia exacta en cm y pulgadas, el porcentaje de diferencia y una barra visual comparativa. Ideal si buscas la cifra precisa sin generar un gráfico completo.",
    needGapCta: "Abrir Calculadora de Diferencia de Altura"
  },
  section2: {
    eyebrow: "Paso a paso",
    title: "Cómo Comparar Alturas Online: Guía Paso a Paso para Principiantes",
    step1Title: "Paso 1: Comienza configurando tu comparación",
    step1Desc: "Decide qué comparar: dos amigos, una celebridad y tú, un grupo de personajes de anime o una persona junto a un monumento. Funciona en cm o pies/pulgadas. Cambia de unidad en cualquier momento con el selector superior.",
    guidebookNoteLabel: "Nota de la guía oficial:",
    guidebookNoteText: "Busca en la base de datos de celebridades y la herramienta completará las alturas automáticamente. Explora personajes de anime y ficción en el panel de Ficción. Las estaturas provienen de guías y publicaciones oficiales de cada franquicia.",
    panelPeople: "Personas",
    panelCelebrities: "Celebridades",
    panelCharacters: "Personajes",
    panelObjects: "Objetos",
    step2Title: "Paso 2: Construye tu gráfico de altura",
    step2Desc: "Escribe nombres, añade colores personalizados e introduce medidas. El generador dibuja cada figura inmediatamente. La escala alcanza hasta 10.000 metros (32.808 pies), permitiéndote alinear a una persona junto a la Torre Eiffel o el Monte Everest.",
    panels: [
      { label: "Añadir Persona", desc: "Nombre, género, altura en cm o ft/in y color personalizado." },
      { label: "Celebridades", desc: "Deportistas, actores e iconos históricos de todo el mundo." },
      { label: "Ficción", desc: "Anime, dibujos animados y superhéroes de libros oficiales." },
      { label: "Entidades y Objetos", desc: "Animales, monumentos arquitectónicos y picos naturales." }
    ],
    step3Title: "Paso 3: Observa la diferencia y compártela",
    step3Desc: "Cada barra incluye el nombre y la altura. La diferencia visual es evidente al instante. Descarga un PNG limpio con un pequeño crédito o comparte el enlace directo activo durante 7 días."
  },
  section3: {
    eyebrow: "Por qué usarlo",
    title: "Por Qué un Gráfico Visual Muestra Mucho Más que Simples Números",
    description: "Un gráfico visual de comparación de altura representa la relación matemática entre estaturas a escala real, facilitando la comprensión inmediata de las proporciones.",
    card1Title: "La escala proporcional revela lo que los números ocultan",
    card1Desc: "Una diferencia de 12 cm a 160 cm es proporcionalmente mayor que a 190 cm. Las barras visuales muestran esa diferencia al instante. Para calcular la cifra matemática exacta, abre la ",
    card1Link: "Calculadora de Diferencia de Altura",
    card2Title: "Compárate con cualquier persona u objeto",
    card2Desc: "Añade tu propia estatura y coloca al lado a un famoso, un personaje de ficción o una montaña: todos se ajustan con precisión en un solo eje.",
    card3Title: "Comparación de personajes para artistas y creativos",
    card3Desc: "Artistas y escritores visualizan relaciones de escala verificadas a partir de guías de diseño y producción.",
    card4Title: "Sin conversiones manuales ni cálculos engorrosos",
    card4Desc: "Introduce valores en cm o ft/in. Restas, ratios y porcentajes se calculan automáticamente mientras escribes.",
    card5Title: "La escala real contextualiza la estatura humana",
    card5Desc: "Mira a una persona de 175 cm junto al Monte Everest (8.848 m) para asimilar la escala real de los grandes monumentos.",
    card6Title: "Exportación visual en un solo clic",
    card6Desc: "Descarga imágenes PNG etiquetadas o genera enlaces para redes sociales, foros de discusión y presentaciones."
  },
  section4: {
    eyebrow: "Casos de uso",
    title: "Comparación de Alturas: Ejemplos y Casos Reales",
    description: "Escenarios cotidianos donde la escala proporcional aporta claridad instantánea frente a las medidas numéricas.",
    useCases: [
      {
        tag: "PAREJAS Y AMIGOS",
        quote: "«Espera, ¿cuánto más alto eres que yo exactamente?»",
        desc: "Coloca ambas alturas y aprecia la brecha exacta en un gráfico proporcional. Una diferencia de 10 cm salta a la vista de inmediato.",
        try: "165 CM + 178 CM · 13 CM DE DIFERENCIA (7,9%)"
      },
      {
        tag: "DEPORTES Y ATLETAS",
        quote: "«¿Quién tiene realmente la ventaja de estatura aquí?»",
        desc: "Crea una alineación visual con tablas de la NBA o compara cualquier deportista para evaluar la ventaja física real.",
        try: "TITULAR NBA 200 CM · LINEBACKER NFL 188 CM · ESCALADOR 174 CM"
      },
      {
        tag: "ANIME Y FANDOM",
        quote: "«La wiki dice una cosa, pero ¿cómo se ve en realidad?»",
        desc: "Personajes de anime de diferentes sagas a escala verificada: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) y Levi (160 cm).",
        try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
      },
      {
        tag: "OBJETOS Y MONUMENTOS",
        quote: "«No tenía idea de que fuera tan inmenso en realidad.»",
        desc: "Coloca a una persona al lado del Salto Ángel (979 m), una puerta estándar (203 cm) o el techo de una habitación.",
        try: "PERSONA 175 CM + EDIFICIO CHRYSLER 319 M + MONTE EVEREST 8.848 M"
      },
      {
        tag: "YO CONTRA CELEBRIDADES",
        quote: "«¿En serio miden exactamente lo mismo que yo?»",
        desc: "Compara tu estatura con celebridades a partir de registros biográficos y descubre exactamente dónde te sitúas.",
        try: "TÚ + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
      },
      {
        tag: "DISEÑO Y ESPACIOS",
        quote: "«¿Cabrá realmente este mueble en mi habitación?»",
        desc: "Añade el marco de una puerta o la altura del techo junto a una persona para comprobar proporciones antes de comprar.",
        try: "PERSONA 185 CM · PUERTA ESTÁNDAR 203 CM · TECHO HABITACIÓN 260 CM"
      }
    ],
    tableTitle: "Tabla de diferencia de altura en pies y pulgadas",
    tableDesc: "Siete ejemplos comunes para comparar parejas y personas en pies, pulgadas, centímetros y porcentajes relativos."
  },
  section5: {
    eyebrow: "Ventajas",
    title: "¿Por Qué Elegir Nuestra Herramienta de Comparación de Altura?",
    description: "Herramientas profesionales. Cero fricción. Sin necesidad de registrarse.",
    features: [
      {
        title: "Generador instantáneo de altura",
        desc: "Dibuja el gráfico a medida que escribes, sin recargas de página."
      },
      {
        title: "Avatares personalizables",
        desc: "Seis colores y siluetas masculinas/femeninas para distinguir fácilmente a más de 10 sujetos."
      },
      {
        title: "Datos de celebridades",
        desc: "1.294 famosos de deportes, cine, música y cultura indexados directamente."
      },
      {
        title: "Personajes de ficción",
        desc: "1.138 personajes de anime, cómics y fantasía basados en datos oficiales."
      },
      {
        title: "Entidades y monumentos",
        desc: "264 objetos, animales y monumentos verificados a escala real."
      },
      {
        title: "Medición a partir de fotos",
        desc: "Sube imágenes y sitúa sujetos reales en el gráfico con geometría precisa."
      },
      {
        title: "Exportación limpia en PNG",
        desc: "Descarga gráficos en alta resolución de forma gratuita e ilimitada."
      },
      {
        title: "Enlaces compartibles",
        desc: "Genera enlaces directos a tu gráfico activos durante 7 días sin registrarte."
      }
    ]
  },
  section6: {
    eyebrow: "Precisión de datos",
    title: "¿Qué Tan Preciso Es el Gráfico de Comparación de Altura?",
    items: [
      {
        title: "Motor de escala exacta",
        desc: "Cada figura se dibuja a partir del valor exacto: 170 cm se renderizan como 170,00 unidades en el lienzo."
      },
      {
        title: "Valores de referencia",
        desc: "Las estaturas publicadas pueden variar según la fuente; utilizamos las cifras verificadas más recientes."
      },
      {
        title: "Registros de famosos",
        desc: "Obtenidos de biografías y registros oficiales; no usamos estimaciones de aficionados."
      },
      {
        title: "Material original",
        desc: "Las alturas de personajes proceden de guías de animación y libros oficiales de cada franquicia."
      },
      {
        title: "Escala arquitectónica y animal",
        desc: "Monumentos según planos oficiales. En animales, la medida corresponde a la altura a la cruz (hombro)."
      }
    ]
  },
  section7: {
    eyebrow: "Características",
    title: "Una Web Diseñada para la Máxima Simplicidad",
    description: "Todo lo que necesitas para comparar alturas con total exactitud y sin barreras.",
    thFeature: "Característica",
    thFree: "Lo que obtienes, gratis",
    rows: [
      ["Sujetos por gráfico", "Ilimitados — todos en un mismo eje proporcional"],
      ["Alturas predefinidas", "2.696 opciones (1.294 famosos, 1.138 personajes, 264 objetos)"],
      ["Unidades compatibles", "Centímetros, metros, pies y pulgadas (cambio instantáneo)"],
      ["Rango de escala", "Desde pocos centímetros hasta 10.000 metros (32.808 ft) con auto-zoom"],
      ["Opciones de exportación", "Descarga PNG en alta definición y enlaces compartibles (7 días)"],
      ["Cuenta y precio", "0,00 € para siempre — sin suscripciones ni tarjetas de crédito"]
    ]
  },
  section8: {
    title: "Preguntas Frecuentes sobre Comparación de Altura",
    description: "Respuestas de expertos a las dudas habituales sobre escalas, unidades y datos",
    badge: "CENTRO DE AYUDA"
  },
  section9: {
    eyebrow: "Descubrir",
    title: "Herramientas y Calculadoras Online de Altura",
    launchTool: "Abrir Herramienta",
    privacyTitle: "Privacidad de Datos y Derechos",
    privacyText: "No vendemos tu información personal a terceros. Conforme a las leyes de privacidad, tienes derecho a solicitar la eliminación de datos. Consulta nuestra ",
    privacyLink: "Política de Privacidad",
    privacyTextEnd: " o contáctanos directamente. El uso habitual de la herramienta no recopila datos personales ni requiere registro.",
    cards: [
      {
        label: "Calculadora de Diferencia de Altura",
        desc: "Diferencia exacta en cm y pulgadas, porcentaje de brecha y tabla de referencia para parejas.",
        badge: "Herramienta",
        href: "/height-difference-calculator"
      },
      {
        label: "Calculadora de Percentil de Altura y Peso",
        desc: "Compara tus medidas con los datos de población de la OMS y los CDC por edad y sexo.",
        badge: "Herramienta",
        href: "/height-weight-percentile-calculator"
      },
      {
        label: "Calculadora de Peso Corporal Ideal",
        desc: "Fórmulas de Devine, Robinson y Hamwi junto a rangos de peso saludable.",
        badge: "Herramienta",
        href: "/ideal-body-weight-calculator"
      },
      {
        label: "Calculadora de Imagen a Altura",
        desc: "Mide tu altura a partir de una foto sin necesidad de cinta métrica.",
        badge: "Herramienta",
        href: "/image-to-height"
      },
      {
        label: "Calculadora Predictora de Altura",
        desc: "Predice la estatura adulta en niños y adolescentes con el método Khamis-Roche.",
        badge: "Herramienta",
        href: "/height-predictor"
      }
    ]
  }
};

// 2. IMAGE TO HEIGHT (Spanish)
es.imageToHeight = {
  hero: {
    eyebrow: "Imagen a Altura",
    title: "Mide Tu Altura a Partir de una Foto. ",
    titleAccent: "Sin Cinta Métrica.",
    description: "Sube una foto de cuerpo entero con una puerta, una hoja A4 o una tarjeta de crédito visible. Marca el objeto de referencia, introduce su tamaño real y traza una línea desde el suelo hasta la parte superior de la cabeza. Obtén tu estatura en centímetros y en pies y pulgadas con precisión de 1 a 2 cm. Gratis, sin registro y en cualquier dispositivo.",
    badgeFree: "Gratis",
    badgeNoAccount: "Sin cuenta",
    badgePrivate: "La foto no sale de tu dispositivo",
    badgeUnits: "Resultados en cm y ft/in",
    ctaUpload: "Subir Foto y Medir Ahora",
    accuracyNotice: "Precisión de 1 a 2 cm. 100% privado. Funciona en tu navegador.",
    prepTitle: "Comprueba 3 cosas antes de hacer la foto:",
    prep1: "Cuerpo entero en el encuadre, de la cabeza a los pies con el suelo visible.",
    prep2: "Pégate a la misma pared en la que esté el objeto de referencia.",
    prep3: "Teléfono en posición vertical y nivelado, a la altura de la cintura."
  },
  howItWorks: {
    eyebrow: "Cinco toques, una foto",
    title: "Cómo Funciona la Herramienta: Paso a Paso",
    description: "Una foto conserva su propia escala cuando contiene un objeto de tamaño conocido. Indica a la herramienta cuánto mide ese objeto y medirá a cualquier persona situada al lado.",
    stepPrefix: "Paso",
    steps: [
      {
        step: "01",
        title: "Sube una foto de cuerpo entero",
        desc: "Elige una foto donde la persona se vea de cabeza a pies, junto a una puerta, una hoja A4 o una tarjeta. El marco de una puerta es la opción más fiable."
      },
      {
        step: "02",
        title: "Recorta y confirma",
        desc: "Ajusta los bordes para que la persona y la referencia llenen el encuadre y toca en 'Aplicar recorte'."
      },
      {
        step: "03",
        title: "Marca la referencia e indica su tamaño",
        desc: "Toca ambos extremos de la puerta o tarjeta. Elige Puerta (203 cm), Tarjeta de crédito (8,56 cm), Papel A4 (29,7 cm), 1 metro o escribe un tamaño personalizado."
      },
      {
        step: "04",
        title: "Toca cabeza y pies",
        desc: "Traza una línea desde el suelo bajo los pies hasta la coronilla. Empieza desde el suelo, no desde el calzado. O usa el escaneo automático con IA."
      },
      {
        step: "05",
        title: "Consulta tu resultado y guárdalo",
        desc: "Tu altura aparece en centímetros y en pies/pulgadas. Pulsa 'Guardar en el gráfico' para compararla con amigos, familiares o deportistas."
      }
    ]
  },
  whatYouCanMeasure: {
    eyebrow: "Más allá de tu propia altura",
    title: "Qué Puedes Medir a Partir de una Foto",
    description: "Cualquier objeto o persona es medible si la referencia conocida se encuentra a la misma distancia de la cámara.",
    items: [
      {
        title: "A ti mismo, sin ayuda",
        desc: "Apoya el teléfono a la altura de la cintura, pon el temporizador y colócate junto a una puerta o una hoja A4 pegada a la pared."
      },
      {
        title: "A tus hijos mientras crecen",
        desc: "Fotografía a tu hijo junto a la misma puerta cada pocos meses y registra su crecimiento. Luego consulta su ",
        linkLabel: "altura adulta prevista"
      },
      {
        title: "A personas en fotos antiguas",
        desc: "Fotos familiares, fotos de equipo o famosos junto a una puerta funcionan siempre que haya una referencia reconocible."
      },
      {
        title: "Muebles y puertas",
        desc: "Pega una hoja A4 junto a una estantería o frigorífico para medirlo antes de comprarlo o mudarte."
      },
      {
        title: "Árboles, muros y vallas",
        desc: "Colócate al lado e introduce tu propia altura como referencia. Aléjate hasta que ambos quepan en el encuadre manteniendo el móvil recto."
      }
    ],
    whyArTitle: "¿Por qué una foto en lugar de una app de realidad aumentada (RA)?",
    why1Bold: "Mide momentos del pasado:",
    why1Desc: " Las apps de RA solo miden lo que tienes delante en el presente. Una foto te permite medir imágenes históricas y recuerdos pasados.",
    why2Bold: "Sin descargas:",
    why2Desc: " Funciona directamente en cualquier navegador moderno en iOS, Android, Mac o PC sin suscripciones.",
    why3Bold: "Privacidad absoluta:",
    why3Desc: " Tu foto permanece segura en el entorno local de tu navegador y nunca se sube a servidores externos."
  },
  referenceObjects: {
    eyebrow: "Referencia de calibración",
    title: "Qué Objeto de Referencia Elegir para Calibrar",
    description: "Cuanto más precisa sea la medida del objeto de referencia, más exacto será el resultado. Los objetos estandarizados garantizan precisión repetible.",
    thObject: "Objeto",
    thSize: "Tamaño a introducir",
    thStandard: "¿Dimensión estándar?",
    thBestFor: "Ideal para",
    rows: [
      {
        object: "Hoja A4 (borde largo)",
        size: "29,7 cm",
        standard: "Sí, ISO 216",
        bestFor: "Pegada a la pared junto a la persona"
      },
      {
        object: "Tarjeta de crédito (borde largo)",
        size: "8,56 cm",
        standard: "Sí, ISO/IEC 7810",
        bestFor: "Primeros planos. Al ser pequeña, marca sus esquinas con cuidado."
      },
      {
        object: "Puerta interior",
        size: "203 cm (estándar común)",
        standard: "No, varía según la vivienda",
        bestFor: "Fotos de cuerpo entero, tras medir la puerta una vez"
      }
    ]
  },
  accuracy: {
    eyebrow: "Pruebas empíricas de precisión",
    title: "Cómo Obtener un Resultado Preciso a Partir de una Foto",
    description: "Dos errores causan la mayor parte de las desviaciones: colocarse por delante de la referencia e inclinar el teléfono. Mantén el móvil vertical y quédate pegado a la pared.",
    tiltLowTitle: "Bajo, inclinado hacia arriba",
    tiltLowBadge: "Marca más altura",
    tiltLowDesc: "La parte superior queda más lejos de la lente y encoge en la imagen, haciendo que la puerta parezca más baja (+2,4 a +4,5 cm de error).",
    tiltLevelTitle: "Nivelado, a la altura de la cintura",
    tiltLevelBadge: "Resultado óptimo",
    tiltLevelDesc: "El móvil mira de frente a la pared, por lo que la referencia y la persona conservan sus proporciones geométricas (0,0 cm de error).",
    tiltHighTitle: "Alto, inclinado hacia abajo",
    tiltHighBadge: "Marca menos altura",
    tiltHighDesc: "El suelo queda más lejos y se reduce, haciendo que la puerta parezca más alta (−2,8 a −5,9 cm de error).",
    tableTitle: "Nuestro test controlado de precisión (14 escenas simuladas)",
    tableDesc: "Evaluamos 14 escenas calibradas con alturas conocidas a 3,5 metros de distancia para aislar la geometría de la cámara de los errores al tocar la pantalla.",
    thSetup: "Configuración de la foto",
    thTrueHeight: "Altura real",
    thMeasured: "Medida",
    thError: "Error",
    benchmarkRows: [
      {
        setup: "Móvil nivelado a 60, 100 o 130 cm, persona pegada a la pared junto a la puerta",
        trueHeight: "172 cm",
        measured: "172,0 cm",
        error: "0,0 cm"
      },
      {
        setup: "Misma posición para un niño de 120 cm y un adulto de 190 cm",
        trueHeight: "120, 190 cm",
        measured: "120,0, 190,0 cm",
        error: "0,0 cm"
      },
      {
        setup: "Móvil inclinado 10° hacia arriba desde 60 cm",
        trueHeight: "172 cm",
        measured: "174,4 cm",
        error: "+2,4 cm"
      },
      {
        setup: "Móvil inclinado 20° hacia arriba desde 40 cm",
        trueHeight: "172 cm",
        measured: "176,5 cm",
        error: "+4,5 cm"
      },
      {
        setup: "Móvil inclinado 10° hacia abajo desde 160 cm",
        trueHeight: "172 cm",
        measured: "169,2 cm",
        error: "−2,8 cm"
      },
      {
        setup: "Móvil inclinado 20° hacia abajo desde 180 cm",
        trueHeight: "172 cm",
        measured: "166,1 cm",
        error: "−5,9 cm"
      },
      {
        setup: "Hoja A4 como referencia, móvil inclinado 10° hacia arriba",
        trueHeight: "172 cm",
        measured: "176,8 cm",
        error: "+4,8 cm"
      },
      {
        setup: "Persona situada 30 cm por delante de la puerta",
        trueHeight: "172 cm",
        measured: "188,1 cm",
        error: "+16,1 cm"
      },
      {
        setup: "Persona situada 60 cm por delante de la puerta",
        trueHeight: "172 cm",
        measured: "207,6 cm",
        error: "+35,6 cm"
      }
    ],
    pixelSensitivityBold: "Sensibilidad por píxel:",
    pixelSensitivityDesc: " Errar al tocar la pantalla añade desviación, y con referencias pequeñas el error se multiplica. En una pantalla móvil, errar un extremo por un solo píxel varía la medida en 1 cm con una puerta, 7 cm con un folio A4 y 23 cm con una tarjeta. Usa la referencia más grande posible y amplía antes de marcar.",
    tips: [
      {
        title: "Evita inclinar la cámara",
        desc: "La inclinación es la principal causa de error. Sostén el teléfono recto y a la altura de la cintura, alejándote hasta encuadrar de cabeza a pies."
      },
      {
        title: "Colocación de la referencia",
        desc: "Pégate a la misma pared que el objeto de referencia, nunca por delante. Adelantarte solo 30 cm añade 16 cm falsos en la prueba."
      },
      {
        title: "Postura erguida",
        desc: "Talones apoyados, espalda recta y mirada al frente. Los fallos de postura en la foto se traducen en errores de medición idénticos a los de una regla real."
      },
      {
        title: "Cuerpo entero visible",
        desc: "Cortar los pies o la cabeza impide una medición válida de suelo a coronilla. Un encuadre limpio de cuerpo entero garantiza el mejor resultado."
      }
    ]
  },
  noTapeMethods: {
    eyebrow: "Métodos alternativos",
    title: "Cómo Medir Tu Altura Sin Cinta Métrica",
    description: "Cinco métodos que funcionan bien cuando no tienes una cinta métrica a mano.",
    methods: [
      {
        id: "wall-a4",
        title: "Método de la marca en la pared y hoja A4",
        tags: ["Libro de tapa dura", "Hoja A4", "Lápiz"],
        desc: "Marca tu altura en la pared con un libro de tapa dura. Apoya el lado largo de una hoja A4 (29,7 cm) desde el suelo hacia arriba, marca el extremo y repite hasta alcanzar tu marca. Multiplica los folios completos por 29,7 cm y estima el tramo final con un folio doblado por la mitad (14,85 cm)."
      },
      {
        id: "door",
        title: "Método del marco de la puerta",
        tags: ["Una puerta"],
        desc: "Las puertas estándar suelen rondar los 200–203 cm. Colócate bajo el marco, fíjate en dónde queda tu coronilla y tendrás una estimación práctica y rápida."
      },
      {
        id: "arm-span",
        title: "Método de la envergadura de brazos",
        tags: ["Un acompañante o una pared"],
        desc: "La distancia de punta a punta de los dedos con los brazos abiertos en cruz coincide casi exactamente con tu estatura (desviación media inferior a 2,5 cm)."
      },
      {
        id: "phone",
        title: "Método de la app del teléfono",
        tags: ["Un smartphone"],
        desc: "En modelos compatibles de iPhone e iPad, la app Medidas de Apple calcula la estatura de personas. En cualquier otro smartphone, saca una foto y usa nuestra herramienta superior."
      },
      {
        id: "dollar",
        title: "Método del billete",
        tags: ["Billetes"],
        desc: "Los billetes tienen dimensiones estandarizadas (un billete de 5 € mide 12 cm, y uno de 20 € mide 13,3 cm; el dólar mide 15,6 cm). Puedes apilarlos verticalmente sobre tu marca."
      }
    ],
    footer: "Cada método ofrece una buena aproximación, pero ninguno es matemáticamente exacto sin una referencia calibrada previa."
  },
  clinicMethod: {
    eyebrow: "Estándar clínico",
    title: "Cómo Medir la Altura con Exactitud: El Método Clínico",
    description: "Adaptado de los protocolos oficiales de estadiómetro (directrices de los CDC) para obtener la máxima precisión física en casa.",
    steps: [
      "Quítate el calzado, ropa voluminosa, gorros y adornos para el pelo, y deshaz peinados que añadan volumen en la coronilla.",
      "Sitúate sobre suelo firme (baldosas o madera, nunca moqueta) contra una pared lisa sin zócalo.",
      "Pies planos y juntos, piernas rectas, brazos a los lados y hombros nivelados.",
      "Toca la pared con la parte posterior de la cabeza, omóplatos, glúteos y talones (según la complexión, no todos los puntos contactarán a la vez).",
      "Mira al frente. Desciende un libro rígido o escuadra en ángulo recto contra la pared hasta tocar la coronilla y marca con lápiz en la pared justo debajo.",
      "Mide desde el suelo hasta la marca con una cinta métrica metálica, al 0,1 cm más cercano. Sin cinta, usa una hoja A4 o nuestra herramienta fotográfica."
    ],
    whyAloneTitle: "Por Qué Medirse Solo Suele Salir Mal",
    errorCauses: [
      {
        title: "Encorvarse",
        desc: "Es muy habitual encorvarse levemente al intentar sostener un objeto sobre la cabeza."
      },
      {
        title: "Libro inclinado",
        desc: "El libro o regla no se sostiene en ángulo recto perfecto de 90° con la pared."
      },
      {
        title: "Cinta desalineada",
        desc: "La cinta métrica no apoya recta sobre el suelo o se desvía en la pared."
      },
      {
        title: "Momento del día",
        desc: "La compresión de los discos vertebrales hace que midas hasta 1 cm más por la mañana que por la noche."
      }
    ],
    whyAloneFooter: "Hacerlo en solitario complica la tarea: mantenerse erguido, equilibrar el libro, marcar la pared y medir. Una foto con objeto de referencia elimina por completo la necesidad de un ayudante."
  },
  faq: {
    badge: "CENTRO DE AYUDA",
    title: "Preguntas Frecuentes",
    items: [
      {
        id: "how-accurate-is-height-measurement-from-a-photo",
        q: "¿Qué tan precisa es la medición de estatura a partir de una foto?",
        a: "Depende de la toma. En nuestras pruebas con 14 escenas calibradas, un teléfono nivelado con la persona pegada a la pared midió la altura exacta. Una inclinación de 10° a 20° produjo un margen de error de 2 a 6 cm, y adelantarse 30 cm de la puerta añadió 16 cm falsos. Con buenas condiciones, los resultados se sitúan de forma constante entre 1 y 2 centímetros de margen."
      },
      {
        id: "what-is-the-best-object-to-use-for-calibration",
        q: "¿Cuál es el mejor objeto para calibrar?",
        a: "Un folio A4 (29,7 cm de largo) o una tarjeta bancaria (8,56 cm de ancho) funcionan en todo el mundo gracias a los estándares ISO. Una puerta interior (frecuentemente 203 cm) es ideal para fotos de cuerpo entero, comprobando su medida real una primera vez."
      },
      {
        id: "is-my-photo-uploaded-or-stored",
        q: "¿Se sube o almacena mi foto en algún servidor?",
        a: "No. La herramienta procesa la imagen completamente en tu navegador y la foto nunca abandona tu dispositivo."
      },
      {
        id: "can-i-measure-someone-elses-height-from-a-photo",
        q: "¿Puedo medir la altura de otra persona a partir de una foto?",
        a: "Sí. Sube cualquier fotografía donde la persona aparezca junto a un objeto de tamaño conocido, calibra y traza la línea para ver el resultado sin que la persona esté presente."
      },
      {
        id: "does-it-work-for-celebrities",
        q: "¿Sirve para medir a famosos?",
        a: "Sí, siempre que la foto muestre a la celebridad junto a una puerta o referencia de escala conocida, en tomas frontales sin ángulos forzados."
      },
      {
        id: "why-do-i-measure-taller-in-the-morning",
        q: "¿Por qué mido más por la mañana?",
        a: "Los discos intervertebrales se comprimen a lo largo del día bajo el peso corporal, reduciendo la estatura de pie hasta un centímetro entre la mañana y la noche."
      },
      {
        id: "do-i-need-an-account",
        q: "¿Necesito crearme una cuenta?",
        a: "No. La herramienta es totalmente gratuita, sin registro previo y compatible con cualquier dispositivo."
      }
    ]
  },
  tool: {
    step1Calibration: "Paso 1: Calibración",
    step2Measure: "Paso 2: Medir persona",
    tapOtherEnd: "Toca el otro extremo para finalizar",
    drawCalibLine: "Dibuja la línea de calibración del objeto tocando la pantalla",
    drawMeasLine: "Haz clic en 'Auto Escaneo' o dibuja una línea de cabeza a pies",
    cancel: "Cancelar",
    done: "Listo"
  }
};

// 3. HEIGHT DIFFERENCE (Spanish - Refreshed Keys)
es.heightDifference.intro.heroCtaButton = "Calcular Diferencia Ahora";
es.heightDifference.intro.heroBadgeFree = "Gratis y sin límites";
es.heightDifference.intro.heroBadgeNoSignup = "Sin registro";
es.heightDifference.intro.heroBadgeUnits = "Métrico e Imperial";

es.heightDifference.howToCalculate.personAValue = "Alex: 170 cm";
es.heightDifference.howToCalculate.personBValue = "Ben: 185 cm";
es.heightDifference.howToCalculate.differenceValue = "15 cm (5.9 in)";

es.heightDifference.percentage.heightDiffValue = "15 cm";
es.heightDifference.percentage.tallerHeightValue = "185 cm";
es.heightDifference.percentage.calculationValue = "(15 ÷ 185) × 100";
es.heightDifference.percentage.percentDiffValue = "8.1%";
es.heightDifference.percentage.p3 = "Esta distinción es importante en comparaciones reales. Al comparar estaturas de parejas o atletas, el porcentaje relativo aporta una perspectiva más fiel que el valor absoluto en centímetros.";
es.heightDifference.percentage.duoShorterLabel = "Respecto a la persona más baja";
es.heightDifference.percentage.duoShorterValue = "8.8% más alto";
es.heightDifference.percentage.duoShorterEq = "(15 ÷ 170) × 100 = 8.82%";
es.heightDifference.percentage.duoTallerLabel = "Respecto a la persona más alta";
es.heightDifference.percentage.duoTallerValue = "8.1% más bajo";
es.heightDifference.percentage.duoTallerEq = "(15 ÷ 185) × 100 = 8.11%";

es.heightDifference.coupleCalc.researchCardBadge = "Estudio de Cohorte UK: Stulp et al. (2013)";
es.heightDifference.coupleCalc.researchCardTitle = "Distribución de Diferencia de Altura en Parejas Reales";
es.heightDifference.coupleCalc.researchCardDescription = "Basado en un estudio publicado sobre 12.502 parejas evaluadas para analizar patrones de emparejamiento por estatura. En el 92,2% de las parejas el hombre era más alto, con una diferencia media de 14,1 cm (5,6 pulgadas).";
es.heightDifference.coupleCalc.distributionTableHeading = "Distribución de Diferencia de Estatura en Parejas (Stulp et al.)";
es.heightDifference.coupleCalc.distributionTableDescription = "Frecuencia observada en parejas con hombre más alto según la investigación científica de Stulp et al.";
es.heightDifference.coupleCalc.thDifferenceBand = "Rango de diferencia";
es.heightDifference.coupleCalc.thPercentageCouples = "Porcentaje de parejas";
es.heightDifference.coupleCalc.thVisualShare = "Distribución visual";
es.heightDifference.coupleCalc.thTypicalExample = "Ejemplo representativo";
es.heightDifference.coupleCalc.bandCurrentDiff = "Diferencia actual seleccionada:";
es.heightDifference.coupleCalc.bandExplanation = "Esta diferencia se sitúa en el rango más representativo de la población general según datos empíricos.";

fs.writeFileSync(esPath, JSON.stringify(es, null, 2) + '\n', 'utf8');
console.log('Successfully updated messages/es.json with authentic Spanish translations!');

