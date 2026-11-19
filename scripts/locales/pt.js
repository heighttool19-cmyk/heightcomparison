// scripts/locales/pt.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Adicionar pessoa",
      celebrities: "Famosos",
      fictional: "Ficção",
      entities: "Objetos",
      addImage: "Adicionar imagem"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Mudar para unidades imperiais",
      switchToMetric: "Mudar para unidades métricas",
      zoomIn: "Aproximar",
      zoomOut: "Afastar",
      zoomPercentage: "Porcentagem de zoom",
      autoFit: "Ajuste automático",
      editList: "Editar lista",
      clearAll: "Limpar tudo",
      share: "Compartilhar",
      generating: "Gerando...",
      copied: "Copiado!",
      error: "Erro",
      linkCopied: "Link copiado.",
      linkExpiry: "Os links permanecem ativos por 7 dias.",
      png: "PNG",
      downloadChart: "Baixar gráfico em imagem PNG",
      fullscreen: "Tela cheia",
      exitFullscreen: "Sair da tela cheia"
    },
    canvas: {
      loading: "Carregando comparação...",
      addPersonPrompt: "Adicione uma pessoa para começar",
      addPersonAria: "Adicionar uma pessoa ao gráfico",
      sameHeight: "Mesma altura",
      sameHeightBoth: "{name1} e {name2} medem {height}.",
      gapTaller: "{name} é {pct}% mais alto(a)",
      gapShorter: "{name} é {pct}% mais baixo(a)",
      gapSummary: "{taller} é {tallerPct}% mais alto(a) que {shorter} ({shorterPct}% mais baixo(a)).",
      ref: "REF"
    },
    modal: {
      clearTitle: "Limpar gráfico",
      clearDesc: "Remover todos os participantes? Esta ação não pode ser desfeita.",
      cancel: "Cancelar",
      clearConfirm: "Limpar tudo"
    },
    form: {
      enterDetails: "Insira seus dados",
      editPerson: "Editar pessoa",
      male: "Masculino",
      female: "Feminino",
      name: "Nome",
      optional: "Opcional",
      heightLabel: "Altura (CM/FT)",
      heightPlaceholder: "Altura",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Estilo do avatar",
      addPerson: "Adicionar pessoa",
      saveChanges: "Salvar alterações",
      cancel: "Cancelar"
    },
    personChart: {
      compareAgainst: "Comparar com",
      tallestVsShortest: "Mais alto vs Mais baixo",
      differencesVs: "Diferenças em relação a {name}",
      yourList: "Sua lista",
      reorder: "Reordenar",
      edit: "Editar",
      remove: "Remover"
    },
    quickAdd: {
      quickInsertion: "Inserção rápida",
      quickAddAria: "Adicionar {name} rapidamente"
    },
    panels: {
      all: "Todos",
      celebritiesTitle: "Seleção de famosos",
      celebritiesSub: "Adicione figuras públicas ao seu gráfico",
      celebritiesSearch: "Buscar por nome ou categoria",
      celebritiesLoading: "Carregando famosos...",
      celebritiesNotFound: "Nenhum famoso encontrado para \"{query}\"",
      fictionalTitle: "Personagens fictícios",
      fictionalSub: "Compare alturas com personagens da ficção",
      fictionalSearch: "Buscar por nome ou universo...",
      fictionalLoading: "Carregando personagens...",
      fictionalNotFound: "Nenhum personagem encontrado para \"{query}\"",
      entitiesTitle: "Objetos e monumentos",
      entitiesSub: "Itens de referência reais e monumentos famosos",
      entitiesSearch: "Buscar objetos...",
      entitiesLoading: "Carregando objetos...",
      entitiesNotFound: "Nenhum objeto encontrado para \"{query}\"",
      addImageTitle: "Adicionar imagem personalizada",
      addImageSub: "Envie uma foto para comparar proporções"
    }
  },
  contact: {
    metadata: {
      title: "Contato | Calculadora de Comparação de Altura",
      description: "Entre em contato com a equipe da calculadora de comparação de altura para relatar uma altura incorreta, um bug ou fazer uma solicitação de privacidade."
    },
    breadcrumb: {
      home: "Início",
      contact: "Contato"
    },
    header: {
      title: "Fale conosco",
      description: "Tem alguma dúvida, sugestão ou correção de altura? Envie-nos uma mensagem e retornaremos em breve.",
      emailUs: "Envie um e-mail direto",
      emailDesc: "Para dúvidas gerais, parcerias ou contato de imprensa.",
      reportBug: "Relatar um erro",
      reportBugDesc: "Encontrou um erro de cálculo ou falha visual? Conte-nos os detalhes.",
      requestFeature: "Sugerir um recurso",
      requestFeatureDesc: "Gostaria de ver novos famosos, personagens ou unidades? Sugestões são bem-vindas.",
      privacyInquiry: "Privacidade e direitos",
      privacyInquiryDesc: "Perguntas sobre seus dados pessoais ou exercício de direitos de privacidade? Fale com nosso departamento."
    },
    form: {
      title: "Enviar uma mensagem",
      name: "Seu nome",
      namePlaceholder: "João da Silva",
      email: "Endereço de e-mail",
      emailPlaceholder: "voce@exemplo.com",
      subject: "Assunto",
      subjectPlaceholder: "ex.: Correção de altura de Robert Wadlow",
      message: "Mensagem",
      messagePlaceholder: "Escreva sua mensagem aqui...",
      submit: "Enviar mensagem",
      sending: "Enviando...",
      successTitle: "Mensagem enviada!",
      successDesc: "Obrigado por entrar em contato. Responderemos o mais breve possível.",
      errorTitle: "Algo deu errado. Tente novamente ou nos envie um e-mail diretamente."
    }
  },
  home: {
    cta: {
      heading: "Vá em frente, crie sua comparação",
      description: "Grátis. Sem cadastro. Sem limites. Compare quantas pessoas, famosos, personagens e objetos quiser em escala proporcional real.",
      startComparing: "↑ Começar a comparar",
      exploreCelebrities: "Explorar altura dos famosos"
    },
    section8: {
      sources: "Fontes: CDC National Center for Health Statistics (NHANES 2021 a 2023), curvas de crescimento do CDC, Guinness World Records. Verificado em novembro de 2026.",
      items: [
        {
          q: "Como comparar a altura de duas pessoas lado a lado?",
          a: "Clique em Adicionar pessoa, digite o nome e a altura em cm ou ft/in e escolha uma cor. Adicione a segunda pessoa da mesma maneira. O gráfico é renderizado instantaneamente em escala proporcional exata. Você também pode pesquisar no banco de dados de celebridades ou personagens fictícios."
        },
        {
          q: "Como o gráfico calcula as proporções?",
          a: "O gráfico utiliza um motor matemático de proporção visual. Se a Pessoa A mede 170 cm e a Pessoa B mede 185 cm, a segunda barra é renderizada a exatamente 1,09 vezes a primeira, calculada diretamente a partir dos valores inseridos sem arredondamentos distorcidos."
        },
        {
          q: "Quantas pessoas posso adicionar a uma única comparação?",
          a: "Não há limite. Adicione quantas pessoas, celebridades, personagens de ficção e objetos do mundo real desejar. Todos compartilham o mesmo gráfico proporcional ajustado automaticamente."
        },
        {
          q: "Qual é a diferença entre esta ferramenta e a Calculadora de Diferença de Altura?",
          a: "Esta ferramenta gera um gráfico visual proporcional em escala real para todos os sujeitos. A Calculadora de Diferença de Altura informa a diferença exata entre duas alturas em centímetros, polegadas e porcentagem."
        },
        {
          q: "Quem é a pessoa mais alta do mundo?",
          a: "A pessoa viva mais alta é Sultan Kösen, da Turquia, com 251 cm (8 ft 2,8 in), registrado pelo Guinness World Records em 2011. A pessoa mais alta de todos os tempos foi Robert Wadlow, dos EUA, com 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Qual é a altura média por idade?",
          a: "Principais parâmetros do CDC dos EUA: Menino de 4 anos: aprox. 103 cm (3 ft 4 in). Menino de 10 anos: aprox. 138 cm (4 ft 6 in). Menina de 10 anos: aprox. 138 cm (4 ft 6 in). Homens adultos (EUA, 20+ anos, 2021-2023): 175,0 cm (5 ft 8,9 in). Mulheres adultas: 161,3 cm (5 ft 3,5 in). Consulte a Calculadora de Percentil de Altura e Peso para tabelas completas."
        },
        {
          q: "2 polegadas (5 cm) é uma grande diferença de altura?",
          a: "Duas polegadas equivalem a 5,1 cm, cerca de 3% da altura de um homem americano médio de 5'9\" (175,3 cm). Lado a lado, a linha dos olhos da pessoa mais alta fica 2 polegadas acima, aproximadamente a largura de um cartão de crédito."
        },
        {
          q: "Quanto 5'10\" é mais alto que 5'7\"?",
          a: "5'10\" é 3 polegadas (7,6 cm) mais alto que 5'7\", ou 4,5% mais alto. Em centímetros, isso representa 177,8 cm contra 170,2 cm."
        },
        {
          q: "Como converter cm para pés e polegadas?",
          a: "Divida os centímetros por 2,54 para obter as polegadas e depois divida por 12 para encontrar os pés. 169 cm equivalem a 66,5 polegadas, ou 5 ft 6,5 in. No sentido inverso, multiplique o total de polegadas por 2,54: 5'1\" são 61 polegadas, ou 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Famosos",
        fictional: "Ficção",
        objects: "Objetos",
        caption: "2.696 alturas prontas para uso em três coleções organizadas: celebridades, personagens de ficção e objetos reais."
      },
      workedExample: {
        diff: "Diferença",
        ratio: "Proporção",
        taller: "Ben é {pct}% mais alto",
        shorter: "Alex é {pct}% mais baixo",
        caption: "Alex com 5'7\" (170 cm) e Ben com 6'1\" (185 cm), desenhados em escala a partir da linha de base zero. Ben é 15 cm (5,9 in) mais alto: 8,8% mais alto que Alex, que é 8,1% mais baixo."
      },
      scaleLadder: {
        humanScale: "1 m (Escala humana)",
        limit: "10.000 m (Limite de 32.808 ft)",
        person: "Pessoa",
        eiffelTower: "Torre Eiffel",
        angelFalls: "Salto Ángel",
        mtEverest: "Monte Everest",
        chartLimit: "Limite do gráfico",
        caption: "Exibido em escala logarítmica (cada etapa é 10 vezes maior) para que todas as marcações caibam. A ferramenta principal desenha todos os sujeitos em um único eixo linear."
      },
      gapPairBars: {
        shorterBase: "Base mais baixa (160 vs 172 cm)",
        tallerBase: "Base mais alta (190 vs 202 cm)",
        gapDiff: "Diferença de 12 cm = {pct}% de variação",
        caption: "A mesma diferença de 12 cm representa um aumento de 7,5% em alturas mais baixas (160 vs 172 cm), mas apenas 6,3% em alturas mais altas (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Par de alturas",
        colDiff: "Diferença",
        colTaller: "Mais alto %",
        colShorter: "Mais baixo %",
        colScale: "Escala visual",
        caption: "Diferenças de altura comuns em pés e polegadas com conversões exatas e escala proporcional."
      },
      ageBenchmarks: {
        colPop: "População / Faixa etária",
        colAvg: "Média aferida (CDC)",
        boy4: "Menino (4 anos, 50º percentil)",
        girl10: "Menina (10 anos, 50º percentil)",
        boy10: "Menino (10 anos, 50º percentil)",
        women: "Mulheres dos EUA (20+, NHANES)",
        men: "Homens dos EUA (20+, NHANES)",
        caption: "Médias de adultos dos EUA do CDC FastStats / NHANES (ago 2021 a ago 2023) junto com medianas clínicas infantis do CDC."
      },
      twoInchGap: {
        baseline: "Linha de base 0 cm",
        eyeLevel: "Nível dos olhos",
        forehead: "Testa",
        caption: "5'9\" e 5'11\" desenhados em escala a partir da linha zero. As cabeças distam 2 polegadas (5,1 cm), uma diferença de 2,9%."
      },
      conversionFlow: {
        step1: "Polegadas totais",
        step2: "Pés e resto",
        step3: "Resultado final",
        caption: "Conversão em três etapas: divida centímetros por 2,54 para polegadas totais, divida por 12 para os pés inteiros e arredonde as polegadas restantes."
      }
    }
  }
};

