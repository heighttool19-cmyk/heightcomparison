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
// PORTUGUESE (pt)
// ==========================================
const ptData = {
  home: {
    intro: {
      h1: "Calculadora de Comparação de Altura: Compare Alturas Online com Gráfico Visual",
      p: "Use esta ferramenta de comparação de altura para visualizar estaturas lado a lado em um gráfico em escala real. Insira qualquer altura em centímetros, pés ou polegadas para ver a diferença instantaneamente. A ferramenta oferece comparação visual com escala proporcional. O gráfico atualiza em tempo real e desenha cada silhueta a partir do valor exato informado. Compare duas ou mais pessoas em poucos segundos.",
      freeLibraryBadge: "Biblioteca Online Gratuita",
      freeLibraryDesc: "Acesse nosso banco de dados com alturas de referência prontas em três coleções, crie comparações ilimitadas e exporte gráficos PNG em alta resolução.",
      noAccounts: "Sem contas",
      noPayments: "Sem pagamentos",
      free100: "100% Grátis",
      compareNowCta: "Comparar Agora ↑"
    },
    section1: {
      eyebrow: "Como funciona",
      title: "Como funciona um gráfico de comparação de altura?",
      p1: "Um gráfico de comparação de altura transforma medições numéricas em uma representação visual onde cada barra reflete a proporção matemática exata em escala real.",
      p2: "Se a Pessoa A tem 170 cm e a Pessoa B tem 185 cm, a segunda barra é desenhada exatamente com 1,09 vez a altura da primeira. Uma diferença de 10 cm aos 160 cm é percebida de forma bem diferente da mesma diferença aos 190 cm — o gráfico torna isso evidente sem cálculos.",
      p3: "Use como criador de tabelas de estatura para famílias, times esportivos ou projetos visuais.",
      imgAlt: "Gráfico de comparação de altura entre uma pessoa de 170 cm e outra de 185 cm lado a lado",
      imgCaption: "Alex com 170 cm (5'7\") e Ben com 185 cm (6'1\"), desenhados em escala.",
      needGapTitle: "Precisa apenas da diferença exata entre duas alturas?",
      needGapDesc: "A Calculadora de Diferença de Altura mostra a diferença precisa em cm e polegadas, a porcentagem relativa e uma barra comparativa. Ideal para quem quer apenas a resposta direta.",
      needGapCta: "Abrir Calculadora de Diferença de Altura"
    },
    section2: {
      eyebrow: "Passo a passo",
      title: "Como Comparar Alturas Online: Guia Passo a Passo para Iniciantes",
      step1Title: "Passo 1: Comece configurando sua comparação",
      step1Desc: "Escolha o que comparar: dois amigos, você e uma celebridade, personagens de anime ou monumentos. Funciona em cm e ft/in, alternando quando quiser.",
      guidebookNoteLabel: "Nota de publicações oficiais:",
      guidebookNoteText: "Busque no banco de celebridades ou explore figuras da ficção. As estaturas são baseadas em guías e livros de referência autorizados de cada obra.",
      panelPeople: "Pessoas",
      panelCelebrities: "Celebridades",
      panelCharacters: "Personagens",
      panelObjects: "Objetos",
      step2Title: "Passo 2: Monte seu gráfico de altura",
      step2Desc: "Digite nomes, escolha cores personalizadas e insira as medidas. A escala alcança até 10.000 metros (32.808 ft), permitindo posicionar uma pessoa ao lado da Torre Eiffel ou do Monte Everest.",
      panels: [
        { label: "Adicionar Pessoa", desc: "Nome, gênero, altura em cm ou ft/in e cor à sua escolha." },
        { label: "Celebridades", desc: "Atletas, atores e ícones históricos do mundo todo." },
        { label: "Ficção", desc: "Animes, desenhos e super-heróis de livros de referência." },
        { label: "Entidades e Objetos", desc: "Animais, monumentos arquitetônicos e picos naturais." }
      ],
      step3Title: "Passo 3: Veja a diferença e compartilhe",
      step3Desc: "Cada barra exibe nome e altura. O intervalo visual fica nítido de imediato. Baixe um PNG nítido ou compartilhe um link direto ativo por 7 dias."
    },
    section3: {
      eyebrow: "Por que usar",
      title: "Por Que um Gráfico Visual Mostra Muito Mais que Simples Números",
      description: "Um gráfico visual traduz relações matemáticas em proporções reais, permitindo compreender diferenças de tamanho num relance.",
      card1Title: "A escala proporcional revela o que os números ocultam",
      card1Desc: "Uma diferença de 12 cm a 160 cm é proporcionalmente maior do que a 190 cm. As barras mostram isso instantaneamente. Para calcular o valor exato, use a ",
      card1Link: "Calculadora de Diferença de Altura",
      card2Title: "Compare-se com qualquer pessoa ou monumento",
      card2Desc: "Coloque sua altura ao lado de um famoso, um herói de ficção ou uma montanha — tudo no mesmo eixo proporcional.",
      card3Title: "Comparação de personagens para desenhistas e escritores",
      card3Desc: "Criadores visualizam proporções anatômicas a partir de guias oficiais de produção.",
      card4Title: "Sem conversões manuais de medidas",
      card4Desc: "Digite em cm ou ft/in. Subtrações, proporções e porcentagens são calculadas em tempo real.",
      card5Title: "A escala real contextualiza a dimensão humana",
      card5Desc: "Veja uma pessoa de 175 cm ao lado do Monte Everest (8.848 m) para compreender a grandiosidade da natureza.",
      card6Title: "Exportação em imagem com apenas um clique",
      card6Desc: "Baixe imagens PNG em alta resolução ou crie links para redes sociais e apresentações."
    },
    section4: {
      eyebrow: "Casos de uso",
      title: "Comparando Alturas: Exemplos e Casos Práticos",
      description: "Situações do cotidiano em que a escala visual traz clareza imediata sobre diferenças de estatura.",
      useCases: [
        {
          tag: "CASAIS E AMIGOS",
          quote: "“Espera aí, quanto você é mais alto do que eu exatamente?”",
          desc: "Insira ambas as alturas e visualize a diferença exata. Uma brecha de 10 cm é perceptível de imediato.",
          try: "165 CM + 178 CM · DIFERENÇA DE 13 CM (7,9%)"
        },
        {
          tag: "ESPORTES E ATLETAS",
          quote: "“Quem realmente tem a vantagem de estatura em quadra?”",
          desc: "Monte comparações com elencos da NBA ou qualquer esporte para analisar a vantagem física real.",
          try: "TITULAR NBA 200 CM · LINEBACKER NFL 188 CM · ESCALADOR 174 CM"
        },
        {
          tag: "ANIME E FICÇÃO",
          quote: "“A wiki diz um número, mas como fica isso lado a lado?”",
          desc: "Personagens de anime em escala verificada: Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) e Levi (160 cm).",
          try: "GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM"
        },
        {
          tag: "OBJETOS E MONUMENTOS",
          quote: "“Eu não tinha noção de que isso era tão colossal.”",
          desc: "Coloque uma pessoa ao lado do Salto Ángel (979 m), de uma porta padrão (203 cm) ou do teto de um cômodo.",
          try: "PESSOA 175 CM + EDIFÍCIO CHRYSLER 319 M + MONTE EVEREST 8.848 M"
        },
        {
          tag: "EU CONTRA CELEBRIDADES",
          quote: "“Sério que eles têm exatamente a mesma altura que eu?”",
          desc: "Compare sua estatura com astros como Tom Cruise, The Rock ou Taylor Swift usando dados biográficos reais.",
          try: "VOCÊ + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM"
        },
        {
          tag: "DESIGN E AMBIENTES",
          quote: "“Será que este móvel realmente cabe no meu quarto?”",
          desc: "Adicione o batente de uma porta ou a altura do teto ao lado de uma pessoa antes de comprar mobília.",
          try: "PESSOA 185 CM · PORTA PADRÃO 203 CM · PÉ-DIREITO 260 CM"
        }
      ],
      tableTitle: "Tabela de diferença de altura em pés, polegadas e centímetros",
      tableDesc: "Sete exemplos comuns do dia a dia para comparar casais e pessoas em pés, polegadas, centímetros e porcentagens."
    },
    section5: {
      eyebrow: "Diferenciais",
      title: "Por Que Escolher Nossa Ferramenta de Comparação de Altura?",
      description: "Recursos profissionais. Sem burocracia. Não exige cadastro.",
      features: [
        {
          title: "Gerador instantâneo de altura",
          desc: "O gráfico atualiza em tempo real enquanto você digita, sem recarregar a página."
        },
        {
          title: "Silhuetas personalizáveis",
          desc: "Seis cores e modelos masculino/feminino para diferenciar até mais de 10 pessoas."
        },
        {
          title: "Dados de celebridades",
          desc: "1.294 famosos de esportes, cinema e cultura já catalogados no sistema."
        },
        {
          title: "Personagens fictícios",
          desc: "1.138 heróis de animes, quadrinhos e fantasia segundo materiais oficiais."
        },
        {
          title: "Objetos e monumentos",
          desc: "264 construções, animais e marcos geográficos com escala checada."
        },
        {
          title: "Medição por foto",
          desc: "Envie fotos reais e encaixe pessoas com geometria proporcional no gráfico."
        },
        {
          title: "Exportação em PNG limpo",
          desc: "Baixe imagens em alta definição sem custos e de forma ilimitada."
        },
        {
          title: "Links de compartilhamento",
          desc: "Crie um link direto para seu gráfico válido por 7 dias sem criar conta."
        }
      ]
    },
    section6: {
      eyebrow: "Confiabilidade",
      title: "Qual o Nível de Precisão do Gráfico de Altura?",
      items: [
        {
          title: "Motor de escala milimétrica",
          desc: "Cada elemento é desenhado conforme a medida exata: 170 cm equivalem a 170,00 pontos na tela."
        },
        {
          title: "Valores de referência",
          desc: "Fontes públicas podem divergir; adotamos sempre os registros recentes mais confiáveis."
        },
        {
          title: "Famosos e personalidades",
          desc: "Obtidos de certidões, biografias e dados verificados, sem palpites de internet."
        },
        {
          title: "Material original",
          desc: "Alturas de personagens retiradas de guias de produção e livros autorizados."
        },
        {
          title: "Edifícios e animais",
          desc: "Marcos arquitetônicos por plantas oficiais. Animais medidos até a cernelha (ombro)."
        }
      ]
    },
    section7: {
      eyebrow: "Recursos",
      title: "Um Site Construído para Facilitar sua Vida",
      description: "Tudo o que você precisa para comparar alturas sem complicações.",
      thFeature: "Recurso",
      thFree: "O que você recebe de graça",
      rows: [
        ["Pessoas por gráfico", "Ilimitadas — todas no mesmo eixo proporcional"],
        ["Estaturas prontas", "2.696 opções (1.294 famosos, 1.138 personagens, 264 objetos)"],
        ["Unidades aceitas", "Centímetros, metros, pés e polegadas (conversão imediata)"],
        ["Alcance de escala", "De centímetros a 10.000 metros (32.808 ft) com zoom automático"],
        ["Opções de exportação", "Download em PNG nítido e links diretos compartilháveis (7 dias)"],
        ["Custo e conta", "R$ 0,00 para sempre — sem assinaturas nem cartões"]
      ]
    },
    section8: {
      title: "Perguntas Frequentes sobre Comparação de Altura",
      description: "Respostas claras sobre escalas, conversões de medidas e fontes de dados",
      badge: "CENTRAL DE AJUDA"
    },
    section9: {
      eyebrow: "Explorar",
      title: "Ferramentas e Calculadoras Online de Estatura",
      launchTool: "Abrir Ferramenta",
      privacyTitle: "Privacidade de Dados e Seus Direitos",
      privacyText: "Não vendemos suas informações para terceiros. Segundo a LGPD e leis globais de proteção, você pode solicitar exclusão de dados a qualquer momento. Conheça nossa ",
      privacyLink: "Política de Privacidade",
      privacyTextEnd: " ou fale conosco. O uso padrão da calculadora não coleta dados pessoais nem exige login.",
      cards: [
        {
          label: "Calculadora de Diferença de Altura",
          desc: "Diferença em cm e polegadas, porcentagem e tabela de referência para casais.",
          badge: "Ferramenta",
          href: "/height-difference-calculator"
        },
        {
          label: "Calculadora de Percentil de Altura e Peso",
          desc: "Compare suas medidas com as curvas da OMS e CDC por idade e sexo.",
          badge: "Ferramenta",
          href: "/height-weight-percentile-calculator"
        },
        {
          label: "Calculadora de Peso Corporal Ideal",
          desc: "Fórmulas de Devine, Robinson e Hamwi junto a faixas de peso saudável.",
          badge: "Ferramenta",
          href: "/ideal-body-weight-calculator"
        },
        {
          label: "Calculadora Imagem para Altura",
          desc: "Descubra sua altura a partir de uma foto sem precisar de fita métrica.",
          badge: "Ferramenta",
          href: "/image-to-height"
        },
        {
          label: "Calculadora Predictora de Altura",
          desc: "Estime a altura adulta de crianças pelo modelo científico Khamis-Roche.",
          badge: "Ferramenta",
          href: "/height-predictor"
        }
      ]
    }
  },
  imageToHeight: {
    hero: {
      eyebrow: "Imagem para altura",
      title: "Meça Sua Altura a Partir de uma Foto. ",
      titleAccent: "Sem Fita Métrica.",
      description: "Envie uma foto de corpo inteiro com uma porta, uma folha A4 ou um cartão no enquadramento. Marque o objeto de referência, informe a medida real dele e trace uma linha do chão até o topo da cabeça. Obtenha sua altura em centímetros e em pés e polegadas com margem de 1 a 2 cm. Gratuito, sem cadastro, em qualquer aparelho.",
      badgeFree: "Grátis",
      badgeNoAccount: "Sem conta",
      badgePrivate: "A foto não sai do seu aparelho",
      badgeUnits: "Resultados em cm e ft/in",
      ctaUpload: "Enviar Foto e Medir Agora",
      accuracyNotice: "Precisão de 1 a 2 cm. 100% privado. Roda no navegador.",
      prepTitle: "Confira 3 detalhes antes de tirar a foto:",
      prep1: "Corpo inteiro no enquadramento, da cabeça aos pés com o chão visível.",
      prep2: "Encoste na mesma parede em que o objeto de referência está.",
      prep3: "Celular nivelado e em pé, aproximadamente na altura da cintura."
    },
    howItWorks: {
      eyebrow: "Cinco toques, uma foto",
      title: "Como a Ferramenta Funciona: Passo a Passo",
      description: "Uma foto guarda sua própria proporção quando contém um objeto de tamanho conhecido. Diga a medida desse objeto e a ferramenta medirá quem estiver ao lado.",
      stepPrefix: "Passo",
      steps: [
        {
          step: "01",
          title: "Envie uma foto de corpo inteiro",
          desc: "Escolha uma imagem de corpo inteiro ao lado de uma porta, folha A4 ou cartão. O batente da porta é a opção mais confiável."
        },
        {
          step: "02",
          title: "Recorte e confirme",
          desc: "Ajuste os limites para que a pessoa e a referência ocupem bem o espaço e clique em 'Aplicar corte'."
        },
        {
          step: "03",
          title: "Marque a referência e indique o tamanho",
          desc: "Toque nas duas pontas da porta ou do cartão. Selecione Porta (203 cm), Cartão (8,56 cm), Folha A4 (29,7 cm), 1 metro ou digite um tamanho."
        },
        {
          step: "04",
          title: "Marque cabeça e pés",
          desc: "Trace uma linha do chão sob os pés até o topo da cabeça. Comece no piso, não no sapato. Ou use o escaneamento automático por IA."
        },
        {
          step: "05",
          title: "Veja seu resultado e salve",
          desc: "Sua altura surge em centímetros e em pés/polegadas. Clique em 'Salvar' para comparar com quem você quiser."
        }
      ]
    },
    whatYouCanMeasure: {
      eyebrow: "Além da sua própria altura",
      title: "O Que Você Pode Medir em uma Foto",
      description: "Qualquer pessoa ou elemento pode ser medido, desde que o objeto de referência esteja na mesma distância da câmera.",
      items: [
        {
          title: "Você mesmo, sem ninguém para ajudar",
          desc: "Apoie o celular na altura do quadril, use o temporizador e posicione-se junto a uma porta ou folha A4 na parede."
        },
        {
          title: "Crianças durante o crescimento",
          desc: "Fotografe seus filhos junto à mesma porta a cada trimestre e acompanhe a evolução. Depois veja a ",
          linkLabel: "altura adulta prevista"
        },
        {
          title: "Pessoas em fotos antigas",
          desc: "Retratos de família, de equipes ou de celebridades ao lado de uma porta funcionam desde que haja um objeto conhecido."
        },
        {
          title: "Móveis e vãos de porta",
          desc: "Cole uma folha A4 perto de uma estante ou geladeira para medir a altura antes de comprar ou mudar."
        },
        {
          title: "Árvores, muros e portões",
          desc: "Fique ao lado e insira sua própria altura como referência. Afaste-se até ambos caberem na foto mantendo o celular reto."
        }
      ],
      whyArTitle: "Por que uma foto em vez de um app de realidade aumentada (RA)?",
      why1Bold: "Mede o passado:",
      why1Desc: " Aplicativos de RA só medem o presente. Com uma foto, você consegue medir imagens antigas e registros de infância.",
      why2Bold: "Sem instalação:",
      why2Desc: " Roda direto no navegador em iOS, Android, Mac ou PC sem downloads ou cobranças.",
      why3Bold: "Privacidade total:",
      why3Desc: " Sua imagem fica segura no navegador do aparelho e nunca é enviada a servidores externos."
    },
    referenceObjects: {
      eyebrow: "Referência para calibragem",
      title: "Qual Objeto de Referência Usar para Calibrar",
      description: "Quanto mais confiável o tamanho do objeto, mais exato o cálculo. Objetos padronizados garantem precisão repetível.",
      thObject: "Objeto",
      thSize: "Medida a inserir",
      thStandard: "Tamanho padrão?",
      thBestFor: "Mais indicado para",
      rows: [
        {
          object: "Folha A4 (lado mais longo)",
          size: "29,7 cm",
          standard: "Sim, ISO 216",
          bestFor: "Fixada na parede ao lado da pessoa"
        },
        {
          object: "Cartão de crédito (lado longo)",
          size: "8,56 cm",
          standard: "Sim, ISO/IEC 7810",
          bestFor: "Fotos de perto. Por ser pequeno, marque os cantos com cautela."
        },
        {
          object: "Porta padrão",
          size: "203 cm (comum)",
          standard: "Não, muda por imóvel",
          bestFor: "Fotos de corpo inteiro, após medir a porta uma primeira vez"
        }
      ]
    },
    accuracy: {
      eyebrow: "Testes empíricos de precisão",
      title: "Como Conseguir um Resultado Preciso na Foto",
      description: "Ficar à frente do objeto e inclinar o celular são as maiores causas de erro. Mantenha o telefone reto e encoste na mesma parede da referência.",
      tiltLowTitle: "Baixo, apontado para cima",
      tiltLowBadge: "Resultado mais alto",
      tiltLowDesc: "O topo da cena fica mais distante e encolhe na foto, fazendo a porta parecer menor (+2,4 a +4,5 cm de erro).",
      tiltLevelTitle: "Nivelado, na altura da cintura",
      tiltLevelBadge: "Precisão ideal",
      tiltLevelDesc: "O aparelho fica de frente para a parede, preservando as proporções geométricas reais (0,0 cm de erro).",
      tiltHighTitle: "Alto, apontado para baixo",
      tiltHighBadge: "Resultado mais baixo",
      tiltHighDesc: "O chão fica mais longe e reduz na imagem, fazendo a porta parecer mais alta (−2,8 a −5,9 cm de erro).",
      tableTitle: "Nosso teste controlado de precisão (14 cenas simuladas)",
      tableDesc: "Analisamos 14 cenários com alturas exatas a 3,5 metros para isolar a inclinação do aparelho dos toques na tela.",
      thSetup: "Posicionamento da foto",
      thTrueHeight: "Altura real",
      thMeasured: "Medida",
      thError: "Erro",
      benchmarkRows: [
        {
          setup: "Celular nivelado a 60, 100 ou 130 cm, pessoa encostada na parede junto à porta",
          trueHeight: "172 cm",
          measured: "172,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Mesmo cenário para criança de 120 cm e adulto de 190 cm",
          trueHeight: "120, 190 cm",
          measured: "120,0, 190,0 cm",
          error: "0,0 cm"
        },
        {
          setup: "Celular inclinado 10° para cima a 60 cm do chão",
          trueHeight: "172 cm",
          measured: "174,4 cm",
          error: "+2,4 cm"
        },
        {
          setup: "Celular inclinado 20° para cima a 40 cm do chão",
          trueHeight: "172 cm",
          measured: "176,5 cm",
          error: "+4,5 cm"
        },
        {
          setup: "Celular inclinado 10° para baixo a 160 cm do chão",
          trueHeight: "172 cm",
          measured: "169,2 cm",
          error: "−2,8 cm"
        },
        {
          setup: "Celular inclinado 20° para baixo a 180 cm do chão",
          trueHeight: "172 cm",
          measured: "166,1 cm",
          error: "−5,9 cm"
        },
        {
          setup: "Folha A4 como referência, celular inclinado 10° para cima",
          trueHeight: "172 cm",
          measured: "176,8 cm",
          error: "+4,8 cm"
        },
        {
          setup: "Pessoa 30 cm à frente da porta",
          trueHeight: "172 cm",
          measured: "188,1 cm",
          error: "+16,1 cm"
        },
        {
          setup: "Pessoa 60 cm à frente da porta",
          trueHeight: "172 cm",
          measured: "207,6 cm",
          error: "+35,6 cm"
        }
      ],
      pixelSensitivityBold: "Sensibilidade ao toque:",
      pixelSensitivityDesc: " Tocar fora do ponto acrescenta erro, e objetos pequenos ampliam isso. Na tela do celular, errar a borda por 1 pixel desloca o valor em 1 cm com uma porta, 7 cm com um A4 e 23 cm com um cartão. Escolha a maior referência e amplie antes de marcar.",
      tips: [
        {
          title: "Não incline a câmera",
          desc: "A inclinação é a causa número um de desvio. Segure o celular reto na altura da cintura e afaste-se até enquadrar de cabeça a pés."
        },
        {
          title: "Posição da referência",
          desc: "Fique rente à mesma parede do objeto, nunca à frente. Ficar 30 cm adiante aumentou a medida em 16 cm em nossos testes."
        },
        {
          title: "Postura ereta",
          desc: "Calcanhares no chão, coluna reta e olhar no horizonte. Erros de postura na foto causam o mesmo desvio que em uma fita métrica."
        },
        {
          title: "Corpo inteiro aparente",
          desc: "Cortar pés ou cabeça inviabiliza o cálculo de chão a topo. Um enquadramento limpo da cabeça aos pés garante o melhor resultado."
        }
      ]
    },
    noTapeMethods: {
      eyebrow: "Métodos alternativos",
      title: "Como Medir Sua Altura Sem Fita Métrica",
      description: "Cinco métodos confiáveis para quando você não tiver trena por perto.",
      methods: [
        {
          id: "wall-a4",
          title: "Método da marca na parede e folha A4",
          tags: ["Livro de capa dura", "Folha A4", "Lápis"],
          desc: "Marque sua altura na parede com um livro firme. Apoie a lateral de uma folha A4 (29,7 cm) a partir do chão, marque onde ela termina e vá subindo até a sua marca. Multiplique as folhas por 29,7 cm e use uma folha dobrada (14,85 cm) para o trecho final."
        },
        {
          id: "door",
          title: "Método do batente da porta",
          tags: ["Uma porta"],
          desc: "Portas normais costumam medir em torno de 200 a 203 cm. Pare sob o batente, veja onde o topo da cabeça fica em relação a ele e tenha uma estimativa rápida."
        },
        {
          id: "arm-span",
          title: "Método da envergadura dos braços",
          tags: ["Alguém para ajudar ou parede"],
          desc: "A distância de ponta a ponta dos dedos com os braços bem abertos é praticamente idêntica à sua altura (variação média de até 2,5 cm)."
        },
        {
          id: "phone",
          title: "Método do aplicativo do celular",
          tags: ["Um smartphone"],
          desc: "Em iPhones e iPads modernos, o app Medidas calcula a altura de pessoas. Em outros celulares, basta tirar uma foto e usar a ferramenta acima."
        },
        {
          id: "dollar",
          title: "Método da nota de dinheiro",
          tags: ["Cédulas"],
          desc: "Notas têm tamanhos padronizados (a nota de 100 reais mede 15,6 cm, similar ao dólar). Você pode empilhá-las na vertical sobre a sua marcação na parede."
        }
      ],
      footer: "Cada alternativa oferece uma boa aproximação, mas nada substitui uma calibração por foto bem tirada."
    },
    clinicMethod: {
      eyebrow: "Padrão clínico",
      title: "Como Medir a Altura com Precisão: O Método Clínico",
      description: "Adaptado das diretrizes médicas de estadiômetro (protocolos do CDC) para obter a maior exatidão física em casa.",
      steps: [
        "Tire sapatos, roupas pesadas, bonés e adereços de cabelo, desmanchando coques ou penteados altos.",
        "Fique em piso rígido (cerâmica ou madeira, sem tapete) encostado em parede lisa e sem rodapé saliente.",
        "Pés juntos e retos no chão, pernas esticadas, braços soltos nas laterais e ombros alinhados.",
        "Encoste na parede a parte de trás da cabeça, ombros, glúteos e calcanhares (o contato simultâneo varia conforme o biotipo).",
        "Olhe reto para a frente. Baixe um livro de capa dura em ângulo reto com a parede até encostar no topo da cabeça e marque na parede logo abaixo.",
        "Meça do chão até a marca com trena metálica no milímetro exato. Sem trena, use uma folha A4 ou nossa ferramenta fotográfica."
      ],
      whyAloneTitle: "Por Que Medir Sozinho Quase Sempre Dá Errado",
      errorCauses: [
        {
          title: "Postura curvada",
          desc: "É quase inevitável se curvar de leve tentando equilibrar um livro na cabeça."
        },
        {
          title: "Livro torto",
          desc: "O livro ou régua não fica em ângulo de 90° exato com a parede."
        },
        {
          title: "Fita folgada",
          desc: "A fita métrica dobra ou desvia ao longo da subida na parede."
        },
        {
          title: "Hora do dia",
          desc: "A compressão dos discos da coluna faz você perder até 1 cm de altura entre o início da manhã e a noite."
        }
      ],
      whyAloneFooter: "Fazer tudo sozinho é desajeitado: manter a postura, equilibrar o livro e marcar o traço. Uma foto com objeto de referência dispensa totalmente uma segunda pessoa."
    },
    faq: {
      badge: "CENTRAL DE AJUDA",
      title: "Perguntas Frequentes",
      items: [
        {
          id: "how-accurate-is-height-measurement-from-a-photo",
          q: "Qual a precisão ao medir altura por foto?",
          a: "Depende da foto. Em testes com 14 cenas calibradas, o celular nivelado com a pessoa rente à parede aferiu o valor exato. Inclinar de 10° a 20° gerou de 2 a 6 cm de desvio, e dar 30 cm de distância da porta adicionou 16 cm fictícios. Em boas condições, a margem fica sempre entre 1 e 2 cm."
        },
        {
          id: "what-is-the-best-object-to-use-for-calibration",
          q: "Qual o melhor objeto para calibrar?",
          a: "Uma folha A4 (29,7 cm de comprimento) ou um cartão bancário (8,56 cm) funcionam em qualquer lugar pelas normas ISO. Portas normais (203 cm) são ótimas para fotos inteiras, bastando medir o batente uma vez."
        },
        {
          id: "is-my-photo-uploaded-or-stored",
          q: "Minha foto é salva ou enviada a algum servidor?",
          a: "Não. O processamento roda inteiro no seu navegador. A imagem nunca sai do seu aparelho."
        },
        {
          id: "can-i-measure-someone-elses-height-from-a-photo",
          q: "Posso medir outra pessoa por uma foto?",
          a: "Sim. Basta enviar uma foto em que ela apareça ao lado de um objeto de tamanho conhecido, calibrar e traçar a linha para ver a medida."
        },
        {
          id: "does-it-work-for-celebrities",
          q: "Dá para medir celebridades?",
          a: "Sim, se a foto mostrar o famoso ao lado de uma porta ou referência de tamanho conhecido, sem ângulos inclinados."
        },
        {
          id: "why-do-i-measure-taller-in-the-morning",
          q: "Por que ficamos mais altos pela manhã?",
          a: "Os discos da coluna se comprimem com o peso ao longo do dia, reduzindo a estatura em pé em até um centímetro até o anoitecer."
        },
        {
          id: "do-i-need-an-account",
          q: "Preciso de cadastro?",
          a: "Não. A ferramenta é gratuita, não pede login e funciona em qualquer navegador."
        }
      ]
    },
    tool: {
      step1Calibration: "Passo 1: Calibração",
      step2Measure: "Passo 2: Medir pessoa",
      tapOtherEnd: "Toque na outra extremidade para concluir",
      drawCalibLine: "Desenhe a linha de calibração do objeto tocando na tela",
      drawMeasLine: "Clique em 'Auto Scan' ou desenhe uma linha da cabeça aos pés",
      cancel: "Cancelar",
      done: "Concluído"
    }
  },
  heightDifference: {
    intro: {
      heroCtaButton: "Calcular Diferença Agora",
      heroBadgeFree: "Gratuito e ilimitado",
      heroBadgeNoSignup: "Sem cadastro",
      heroBadgeUnits: "Métrico e Imperial"
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
      p3: "Essa distinção é essencial: ao comparar a estatura de casais ou atletas, a porcentagem relativa fornece uma visão muito mais fiel do que apenas o número absoluto em centímetros.",
      p4: "A mesma diferença em cm representa uma porcentagem menor conforme a estatura aumenta. Uma folga de 10 cm equivale a 6,3% quando a pessoa mais alta mede 160 cm, e a 5,3% quando mede 190 cm.",
      duoShorterLabel: "Em relação à pessoa mais baixa",
      duoShorterValue: "8,8% mais alto",
      duoShorterEq: "(15 ÷ 170) × 100 = 8,82%",
      duoTallerLabel: "Em relação à pessoa mais alta",
      duoTallerValue: "8,1% mais baixo",
      duoTallerEq: "(15 ÷ 185) × 100 = 8,11%"
    },
    couple: {
      statAvgGapLabel: "Diferença média em casais no Reino Unido",
      statAvgGapValue: "14,1 cm",
      statAvgGapSub: "5,6 in",
      statAvgGapSampleSize: "12.502 casais",
      statManTallerLabel: "Homem mais alto",
      statManTallerValue: "92,5%",
      statManTallerSub: "dos casais estudados",
      distTableCaption: "Distribuição de casais no Reino Unido por diferença de altura",
      tableHeaderGap: "Homem mais alto por",
      tableHeaderShare: "Fatia dos casais",
      bandWomanTaller: "Mulher mais alta",
      band0to5: "0 a 5 cm",
      band5to10: "5 a 10 cm",
      band10to15: "10 a 15 cm",
      band15to20: "15 a 20 cm",
      band20to25: "20 a 25 cm",
      band25to30: "25 a 30 cm",
      bandOver30: "Mais de 30 cm"
    }
  }
};

updateLocale('pt', ptData);

