// scripts/locales/pl.js
module.exports = {
  dashboard: {
    nav: {
      addPerson: "Dodaj osobę",
      celebrities: "Gwiazdy",
      fictional: "Postacie fikcyjne",
      entities: "Obiekty",
      addImage: "Dodaj zdjęcie"
    },
    toolbar: {
      cmToFt: "cm → ft",
      ftToCm: "ft → cm",
      switchToImperial: "Przełącz na jednostki imperialne",
      switchToMetric: "Przełącz na jednostki metryczne",
      zoomIn: "Przybliż",
      zoomOut: "Oddal",
      zoomPercentage: "Procent powiększenia",
      autoFit: "Dopasuj automatycznie",
      editList: "Edytuj listę",
      clearAll: "Wyczyść wszystko",
      share: "Udostępnij",
      generating: "Generowanie...",
      copied: "Skopiowano!",
      error: "Błąd",
      linkCopied: "Link skopiowany.",
      linkExpiry: "Linki pozostają aktywne przez 7 dni.",
      png: "PNG",
      downloadChart: "Pobierz wykres jako obraz PNG",
      fullscreen: "Pełny ekran",
      exitFullscreen: "Wyjdź z pełnego ekranu"
    },
    canvas: {
      loading: "Ładowanie porównania...",
      addPersonPrompt: "Dodaj osobę, aby rozpocząć",
      addPersonAria: "Dodaj osobę do wykresu",
      sameHeight: "Ten sam wzrost",
      sameHeightBoth: "{name1} i {name2} mają po {height}.",
      gapTaller: "{name} jest o {pct}% wyższy/a",
      gapShorter: "{name} jest o {pct}% niższy/a",
      gapSummary: "{taller} jest o {tallerPct}% wyższy/a niż {shorter} (o {shorterPct}% niższy/a).",
      ref: "REF"
    },
    modal: {
      clearTitle: "Wyczyść wykres",
      clearDesc: "Usunąć wszystkie postacie? Tej operacji nie można cofnąć.",
      cancel: "Anuluj",
      clearConfirm: "Wyczyść wszystko"
    },
    form: {
      enterDetails: "Wprowadź dane",
      editPerson: "Edytuj osobę",
      male: "Mężczyzna",
      female: "Kobieta",
      name: "Imię",
      optional: "Opcjonalnie",
      heightLabel: "Wzrost (CM/FT)",
      heightPlaceholder: "Wzrost",
      ftPlaceholder: "Ft",
      inPlaceholder: "In",
      avatarStyle: "Styl awatara",
      addPerson: "Dodaj osobę",
      saveChanges: "Zapisz zmiany",
      cancel: "Anuluj"
    },
    personChart: {
      compareAgainst: "Porównaj z",
      tallestVsShortest: "Najwyższy vs Najniższy",
      differencesVs: "Różnice względem {name}",
      yourList: "Twoja lista",
      reorder: "Zmień kolejność",
      edit: "Edytuj",
      remove: "Usuń"
    },
    quickAdd: {
      quickInsertion: "Szybkie dodawanie",
      quickAddAria: "Dodaj szybko {name}"
    },
    panels: {
      all: "Wszystkie",
      celebritiesTitle: "Wybór gwiazd",
      celebritiesSub: "Dodaj znane osoby do wykresu",
      celebritiesSearch: "Szukaj według nazwiska lub kategorii",
      celebritiesLoading: "Ładowanie gwiazd...",
      celebritiesNotFound: "Nie znaleziono gwiazd dla \"{query}\"",
      fictionalTitle: "Postacie fikcyjne",
      fictionalSub: "Porównaj wzrost z bohaterami fikcji",
      fictionalSearch: "Szukaj według nazwy lub uniwersum...",
      fictionalLoading: "Ładowanie postaci...",
      fictionalNotFound: "Nie znaleziono postaci dla \"{query}\"",
      entitiesTitle: "Obiekty i budowle",
      entitiesSub: "Rzeczywiste punkty odniesienia i słynne budowle",
      entitiesSearch: "Szukaj obiektów...",
      entitiesLoading: "Ładowanie obiektów...",
      entitiesNotFound: "Nie znaleziono obiektów dla \"{query}\"",
      addImageTitle: "Dodaj własne zdjęcie",
      addImageSub: "Prześlij zdjęcie, aby porównać proporcje"
    }
  },
  contact: {
    metadata: {
      title: "Kontakt | Kalkulator Porównania Wzrostu",
      description: "Skontaktuj się z zespołem kalkulatora porównania wzrostu, aby zgłosić błędny wzrost, błąd na stronie lub zapytanie o prywatność."
    },
    breadcrumb: {
      home: "Strona główna",
      contact: "Kontakt"
    },
    header: {
      title: "Skontaktuj się z nami",
      description: "Masz pytanie, opinię lub korektę wzrostu? Wyślij nam wiadomość, a wkrótce odpowiemy.",
      emailUs: "Napisz bezpośrednio",
      emailDesc: "W sprawach ogólnych, propozycji współpracy lub pytań medialnych.",
      reportBug: "Zgłoś błąd",
      reportBugDesc: "Znalazłeś błąd w obliczeniach lub problem z wyświetlaniem? Daj nam znać.",
      requestFeature: "Zaproponuj funkcję",
      requestFeatureDesc: "Chcesz dodać nową postać, celebrytę lub jednostkę miary? Czekamy na pomysły.",
      privacyInquiry: "Prywatność i prawa",
      privacyInquiryDesc: "Pytania o Twoje dane lub realizację praw ochrony prywatności? Skontaktuj się z nami."
    },
    form: {
      title: "Wyślij wiadomość",
      name: "Twoje imię",
      namePlaceholder: "Jan Kowalski",
      email: "Adres e-mail",
      emailPlaceholder: "ty@przyklad.pl",
      subject: "Temat",
      subjectPlaceholder: "np. Korekta wzrostu Roberta Wadlowa",
      message: "Wiadomość",
      messagePlaceholder: "Napisz, w czym możemy pomóc...",
      submit: "Wyślij wiadomość",
      sending: "Wysyłanie...",
      successTitle: "Wiadomość wysłana!",
      successDesc: "Dziękujemy za kontakt. Odpowiemy najszybciej, jak to możliwe.",
      errorTitle: "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio."
    }
  },
  home: {
    cta: {
      heading: "Śmiało, stwórz swoje porównanie",
      description: "Bezpłatnie. Bez konta. Bez limitów. Porównuj dowolną liczbę osób, celebrytów, postaci i obiektów w rzeczywistej skali.",
      startComparing: "↑ Rozpocznij porównanie",
      exploreCelebrities: "Sprawdź wzrost gwiazd"
    },
    section8: {
      sources: "Źródła: CDC National Center for Health Statistics (NHANES 2021-2023), siatki centylowe CDC, Guinness World Records. Zweryfikowano w listopadzie 2026 r.",
      items: [
        {
          q: "Jak porównać wzrost dwóch osób obok siebie?",
          a: "Kliknij Dodaj osobę, wpisz imię oraz wzrost w cm lub ft/in i wybierz kolor. Dodaj drugą osobę w ten sam sposób. Wykres zaktualizuje się natychmiast w dokładnej skali. Możesz także przeszukiwać bazę gwiazd i postaci fikcyjnych."
        },
        {
          q: "Jak wykres oblicza proporcje?",
          a: "Wykres wykorzystuje silnik proporcji wizualnych. Jeśli Osoba A ma 170 cm, a Osoba B 185 cm, drugi słupek jest renderowany dokładnie w proporcji 1,09× pierwszego, bez przekłamań i przybliżeń."
        },
        {
          q: "Ile osób mogę dodać do jednego porównania?",
          a: "Nie ma limitu. Dodawaj tylu ludzi, celebrytów, postaci z bajek i obiektów, ile chcesz. Wszyscy dzielą wspólną, automatycznie dopasowującą się oś."
        },
        {
          q: "Czym różni się to narzędzie od Kalkulatora Różnicy Wzrostu?",
          a: "To narzędzie generuje proporcjonalny wykres w skali dla wielu postaci. Kalkulator Różnicy Wzrostu skupia się na dokładnej różnicy między dwoma wzrostami w cm, calach i procentach."
        },
        {
          q: "Kto jest najwyższym człowiekiem na świecie?",
          a: "Najwyższym żyjącym człowiekiem jest Sultan Kösen z Turcji o wzroście 251 cm (8 ft 2,8 in), zmierzony przez Guinness World Records w 2011 roku. Najwyższym człowiekiem w historii był Robert Wadlow z USA o wzroście 272 cm (8 ft 11,1 in)."
        },
        {
          q: "Jaki jest średni wzrost w zależności od wieku?",
          a: "Kluczowe dane CDC z USA: 4-letni chłopiec: ok. 103 cm (3 ft 4 in). 10-letni chłopiec: ok. 138 cm (4 ft 6 in). 10-letnia dziewczynka: ok. 138 cm (4 ft 6 in). Dorośli mężczyźni (USA, 20+, 2021-2023): 175,0 cm (5 ft 8,9 in). Dorosłe kobiety: 161,3 cm (5 ft 3,5 in). Zobacz Kalkulator Percentyli Wzrostu i Wagi dla pełnych tabel."
        },
        {
          q: "Czy 2 cale (5 cm) to duża różnica wzrostu?",
          a: "Dwa cale to 5,1 cm, czyli około 3% wzrostu przeciętnego Amerykanina o wzroście 5'9\" (175,3 cm). Stojąc obok siebie, linia oczu wyższej osoby znajduje się 2 cale wyżej – mniej więcej na szerokość karty płatniczej."
        },
        {
          q: "O ile 5'10\" jest wyższy od 5'7\"?",
          a: "5'10\" jest o 3 cale (7,6 cm) wyższy od 5'7\", czyli o 4,5%. W centymetrach jest to 177,8 cm w porównaniu do 170,2 cm."
        },
        {
          q: "Jak przeliczyć cm na stopy i cale?",
          a: "Podziel centymetry przez 2,54, aby otrzymać cale, a następnie podziel przez 12, aby uzyskać stopy. 169 cm to 66,5 cala, czyli 5 ft 6,5 in. W drugą stronę pomnóż cale przez 2,54: 5'1\" to 61 cali, czyli 154,9 cm."
        }
      ]
    },
    visuals: {
      libraryStackBar: {
        celebrities: "Gwiazdy",
        fictional: "Postacie fikcyjne",
        objects: "Obiekty",
        caption: "2 696 gotowych wzrostów z trzech kolekcji: celebrytów, postaci fikcyjnych i rzeczywistych obiektów."
      },
      workedExample: {
        diff: "Różnica",
        ratio: "Stosunek",
        taller: "Ben jest o {pct}% wyższy",
        shorter: "Alex jest o {pct}% niższy",
        caption: "Alex mający 5'7\" (170 cm) i Ben mający 6'1\" (185 cm), narysowani w skali od linii zerowej. Ben jest o 15 cm (5,9 in) wyższy: o 8,8% wyższy od Alexa, który jest o 8,1% niższy."
      },
      scaleLadder: {
        humanScale: "1 m (Skala człowieka)",
        limit: "10 000 m (Granica 32 808 ft)",
        person: "Osoba",
        eiffelTower: "Wieża Eiffla",
        angelFalls: "Salto Angel",
        mtEverest: "Mount Everest",
        chartLimit: "Limit wykresu",
        caption: "Przedstawiono w skali logarytmicznej (każdy krok jest 10 razy większy), aby pomieścić wszystkie punkty. Główne narzędzie rysuje obiekty na jednej osi liniowej."
      },
      gapPairBars: {
        shorterBase: "Niższa baza (160 vs 172 cm)",
        tallerBase: "Wyższa baza (190 vs 202 cm)",
        gapDiff: "Różnica 12 cm = {pct}% różnicy",
        caption: "Ta sama różnica 12 cm oznacza wzrost o 7,5% przy niższym wzroście (160 vs 172 cm), ale tylko o 6,3% przy wyższym wzroście (190 vs 202 cm)."
      },
      heightGapTable: {
        colPair: "Para wzrostów",
        colDiff: "Różnica",
        colTaller: "Wyższy %",
        colShorter: "Niższy %",
        colScale: "Skala wizualna",
        caption: "Typowe różnice wzrostu w stopach i calach z dokładnymi przeliczeniami i proporcjonalną skalą."
      },
      ageBenchmarks: {
        colPop: "Populacja / Grupa wiekowa",
        colAvg: "Zmierzona średnia (CDC)",
        boy4: "Chłopiec (Wiek 4, 50. centyl)",
        girl10: "Dziewczynka (Wiek 10, 50. centyl)",
        boy10: "Chłopiec (Wiek 10, 50. centyl)",
        women: "Kobiety w USA (20+, NHANES)",
        men: "Mężczyźni w USA (20+, NHANES)",
        caption: "Średnie dorosłych w USA z CDC FastStats / NHANES (sierpień 2021 - sierpień 2023) wraz z klinicznymi medianami wzrostu dzieci."
      },
      twoInchGap: {
        baseline: "Linia bazowa 0 cm",
        eyeLevel: "Poziom oczu",
        forehead: "Czoło",
        caption: "5'9\" i 5'11\" narysowani w skali od linii zerowej. Różnica wynosi 2 cale (5,1 cm), czyli 2,9%."
      },
      conversionFlow: {
        step1: "Łącznie cale",
        step2: "Stopy i reszta",
        step3: "Wynik końcowy",
        caption: "Trzystopniowa konwersja: podziel centymetry przez 2,54, aby uzyskać cale, podziel przez 12 dla pełnych stóp i zaokrąglij resztę cali."
      }
    }
  }
};

