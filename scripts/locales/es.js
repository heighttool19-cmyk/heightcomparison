// scripts/locales/es.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Añadir persona",
      celebrities: "Famosos",
      fictional: "Ficción",
      entities: "Objetos",
      addImage: "Añadir imagen"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Cambiar a unidades imperiales",
      switchToMetric: "Cambiar a unidades métricas",
      zoomIn: "Acercar",
      zoomOut: "Alejar",
      zoomPercentage: "Porcentaje de zoom",
      autoFit: "Ajuste automático",
      editList: "Editar lista",
      clearAll: "Borrar todo",
      share: "Compartir",
      generating: "Generando...",
      copied: "¡Copiado!",
      error: "Error",
      linkCopied: "Enlace copiado.",
      linkExpiry: "Los enlaces duran 7 días activos.",
      png: "PNG",
      downloadChart: "Descargar gráfico en PNG",
      fullscreen: "Pantalla completa",
      exitFullscreen: "Salir de pantalla completa"
    },
    canvas: {
      loading: "Cargando comparación...",
      addPersonPrompt: "Añade una persona para empezar",
      addPersonAria: "Añadir una persona al gráfico",
      sameHeight: "Misma estatura",
      sameHeightBoth: "{name1} y {name2} miden {height}.",
      gapTaller: "{name} es {pct}% más alto/a",
      gapShorter: "{name} es {pct}% más bajo/a",
      gapSummary: "{taller} es {tallerPct}% más alto/a que {shorter} ({shorterPct}% más bajo/a).",
      ref: "REF"
    },
    modal: {
      clearTitle: "Limpiar gráfico",
      clearDesc: "¿Eliminar a todos los sujetos? Esta acción no se puede deshacer.",
      cancel: "Cancelar",
      clearConfirm: "Borrar todo"
    },
    form: {
      enterDetails: "Introduce tus datos",
      editPerson: "Editar persona",
      male: "Hombre",
      female: "Mujer",
      name: "Nombre",
      optional: "Opcional",
      heightLabel: "Estatura (CM/FT)",
      heightPlaceholder: "Estatura",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Estilo de avatar",
      addPerson: "Añadir persona",
      saveChanges: "Guardar cambios",
      cancel: "Cancelar"
    },
    personChart: {
      compareAgainst: "Comparar con",
      tallestVsShortest: "Más alto/a vs Más bajo/a",
      differencesVs: "Diferencias con {name}",
      yourList: "Tu lista",
      reorder: "Reordenar",
      edit: "Editar",
      remove: "Eliminar"
    },
    quickAdd: {
      quickInsertion: "Inserción rápida",
      quickAddAria: "Añadir rápidamente a {name}"
    },
    panels: {
      all: "Todos",
      celebritiesTitle: "Selección de famosos",
      celebritiesSub: "Añade iconos a tu gráfico comparativo",
      celebritiesSearch: "Buscar por nombre o categoría",
      celebritiesLoading: "Cargando famosos...",
      celebritiesNotFound: "No se encontraron famosos para \"{query}\"",
      fictionalTitle: "Personajes de ficción",
      fictionalSub: "Compara estaturas con personajes ficticios",
      fictionalSearch: "Buscar por nombre o universo...",
      fictionalLoading: "Cargando personajes...",
      fictionalNotFound: "No se encontraron personajes para \"{query}\"",
      entitiesTitle: "Objetos y monumentos",
      entitiesSub: "Objetos de referencia reales y estructuras famosas",
      entitiesSearch: "Buscar objetos...",
      entitiesLoading: "Cargando objetos...",
      entitiesNotFound: "No se encontraron objetos para \"{query}\"",
      addImageTitle: "Añadir imagen personalizada",
      addImageSub: "Sube una foto para comparar proporciones"
    }
  },
  contact: {
    metadata: {
      title: "Contacto | Calculadora de Comparación de Estatura",
      description: "Contacta con el equipo de la calculadora de comparación de estatura para informar sobre una altura incorrecta, un error o solicitar privacidad."
    },
    breadcrumb: {
      home: "Inicio",
      contact: "Contacto"
    },
    header: {
      title: "Contáctanos",
      description: "¿Tienes alguna pregunta, comentario o corrección de estatura? Envíanos un mensaje y te responderemos lo antes posible.",
      emailUs: "Envíanos un correo",
      emailDesc: "Para consultas generales, colaboraciones o prensa.",
      reportBug: "Informar de un error",
      reportBugDesc: "¿Encontraste un problema de cálculo o fallo visual? Cuéntanos los detalles.",
      requestFeature: "Sugerir una función",
      requestFeatureDesc: "¿Quieres que añadamos un nuevo famoso, personaje o unidad? Agradecemos tus sugerencias.",
      privacyInquiry: "Privacidad y derechos",
      privacyInquiryDesc: "¿Dudas sobre tus datos o derechos legales de privacidad? Contacta con nuestro departamento legal."
    },
    form: {
      title: "Enviar un mensaje",
      name: "Tu nombre",
      namePlaceholder: "Juan Pérez",
      email: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      subject: "Asunto",
      subjectPlaceholder: "ej. Corrección de estatura para Robert Wadlow",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos lo que tienes en mente...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successDesc: "Gracias por contactarnos. Te responderemos lo antes posible.",
      errorTitle: "Algo salió mal. Por favor, inténtalo de nuevo o escríbenos directamente."
    }
  },
  home: {
    cta: {
      heading: "Adelante, crea tu comparación",
      description: "Gratis. Sin cuenta. Sin límites. Compara personas ilimitadas, famosos, personajes y objetos reales a escala proporcional exacta.",
      startComparing: "↑ Empezar a comparar",
      exploreCelebrities: "Ver estaturas de famosos"
    },
    section8: {
      sources: "Fuentes: CDC National Center for Health Statistics (NHANES 2021 a 2023), tablas de crecimiento CDC, Guinness World Records. Verificado en noviembre de 2026.",
      items: [
        {
          q: "¿Cómo comparo la estatura de dos personas lado a lado?",
          a: "Haz clic en Añadir persona, introduce el nombre y la estatura en cm o ft/in, y elige un color. Añade una segunda persona de la misma manera. El gráfico se actualiza al instante con una escala proporcional exacta. También puedes buscar en la base de datos de famosos o personajes ficticios."
        },
        {
          q: "¿Cómo calcula el gráfico las proporciones?",
          a: "El gráfico utiliza un motor de proporciones visuales matemáticas. Si la Persona A mide 170 cm y la Persona B mide 185 cm, la segunda barra se dibuja a exactamente 1,09 veces la primera, calculada directamente de los valores introducidos sin redondeos ficticios."
        },
        {
          q: "¿Cuántas personas puedo añadir a una comparación?",
          a: "No hay límite. Añade tantas personas, famosos, personajes de ficción y objetos reales como quieras. Todos comparten un gráfico proporcional que se ajusta automáticamente."
        },
        {
          q: "¿Cuál es la diferencia entre esta herramienta y la Calculadora de Diferencia de Estatura?",
          a: "Esta herramienta genera un gráfico visual proporcional a escala real de todos los sujetos. La Calculadora de Diferencia de Estatura muestra la diferencia exacta entre dos alturas en cm, pulgadas y porcentaje."
        },
        {
          q: "¿Quién es la persona más alta del mundo?",
          a: "La persona viva más alta es Sultan Kösen de Turquía con 251 cm (8 ft 2.8 in), según Guinness World Records en 2011. La persona más alta registrada en la historia fue Robert Wadlow de EE. UU. con 272 cm (8 ft 11.1 in)."
        },
        {
          q: "¿Cuál es la estatura promedio según la edad?",
          a: "Valores de referencia de los CDC en EE. UU.: Niño de 4 años: aprox. 103 cm (3 ft 4 in). Niño de 10 años: aprox. 138 cm (4 ft 6 in). Niña de 10 años: aprox. 138 cm (4 ft 6 in). Hombres adultos (EE. UU., 20+ años, 2021-2023): 175,0 cm (5 ft 8.9 in). Mujeres adultas (EE. UU., 20+ años, 2021-2023): 161,3 cm (5 ft 3.5 in). Consulta más detalles en la Calculadora de Percentiles de Altura y Peso."
        },
        {
          q: "¿Son 2 pulgadas una gran diferencia de estatura?",
          a: "Dos pulgadas son 5,1 cm, alrededor del 3% de la estatura de un hombre promedio de EE. UU. de 5'9\" (175,3 cm). Lado a lado, la línea de los ojos de la persona más alta queda unos 2 pulgadas más arriba, aproximadamente el lado corto de una tarjeta de crédito."
        },
        {
          q: "¿Cuánto más alto es 5'10\" que 5'7\"?",
          a: "5'10\" es 3 pulgadas (7,6 cm) más alto que 5'7\", o un 4,5% más alto. En centímetros, son 177,8 cm frente a 170,2 cm."
        },
        {
          q: "¿Cómo convierto de cm a pies y pulgadas?",
          a: "Divide los centímetros entre 2,54 para obtener pulgadas y luego entre 12 para los pies. 169 cm son 66,5 pulgadas, o 5 ft 6.5 in. Para hacerlo al revés, multiplica el total de pulgadas por 2,54: 5'1\" son 61 pulgadas, o 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Famosos",
        fictional: "Ficción",
        objects: "Objetos",
        caption: "2.696 estaturas listas para usar en tres colecciones seleccionadas: famosos, personajes de ficción y objetos reales."
      },
      workedExample: {
        diff: "Diferencia",
        ratio: "Proporción",
        taller: "Ben es {pct}% más alto",
        shorter: "Alex es {pct}% más bajo",
        caption: "Alex con 5'7\" (170 cm) y Ben con 6'1\" (185 cm), dibujados a escala desde una base cero. Ben es 15 cm (5,9 in) más alto: 8,8% más alto que Alex, quien es 8,1% más bajo."
      },
      scaleLadder: {
        humanScale: "1 m (Escala humana)",
        limit: "10.000 m (Límite 32.808 ft)",
        person: "Persona",
        eiffelTower: "Torre Eiffel",
        angelFalls: "Salto Ángel",
        mtEverest: "Monte Everest",
        chartLimit: "Límite del gráfico",
        caption: "Mostrado en escala logarítmica (cada paso es 10 veces mayor) para que encajen todas las marcas. La herramienta muestra todos los elementos en un único eje lineal."
      },
      gapPairBars: {
        shorterBase: "Base más baja (160 vs 172 cm)",
        tallerBase: "Base más alta (190 vs 202 cm)",
        gapDiff: "Brecha de 12 cm = {pct}% de diferencia",
        caption: "La misma brecha de 12 cm representa un aumento de estatura del 7,5% en personas más bajas (160 vs 172 cm), pero solo del 6,3% en personas más altas (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Comparación de estatura",
        colDiff: "Diferencia",
        colTaller: "Más alto %",
        colShorter: "Más bajo %",
        colScale: "Escala visual",
        caption: "Diferencias comunes de estatura en pies y pulgadas con conversiones exactas y escala proporcional."
      },
      ageBenchmarks: {
        colPop: "Población / Grupo de edad",
        colAvg: "Promedio medido (CDC)",
        boy4: "Niño (Edad 4, percentil 50)",
        girl10: "Niña (Edad 10, percentil 50)",
        boy10: "Niño (Edad 10, percentil 50)",
        women: "Mujeres de EE. UU. (20+, NHANES)",
        men: "Hombres de EE. UU. (20+, NHANES)",
        caption: "Promedios de adultos de EE. UU. de CDC FastStats / NHANES (ago 2021 a ago 2023) junto con medianas clínicas infantiles de los CDC."
      },
      twoInchGap: {
        baseline: "Línea base 0 cm",
        eyeLevel: "Nivel de ojos",
        forehead: "Frente",
        caption: "5'9\" y 5'11\" dibujados a escala desde la línea cero. Las coronillas difieren en 2 pulgadas (5,1 cm), una diferencia del 2,9%."
      },
      conversionFlow: {
        step1: "Pulgadas totales",
        step2: "Pies y residuo",
        step3: "Resultado final",
        caption: "Flujo de conversión en tres pasos: divide centímetros por 2,54 para obtener pulgadas, divide por 12 para los pies enteros y redondea el residuo."
      }
    }
  }
};

