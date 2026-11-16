# Triple Extraction — Target (DE) — height-predictor

Same predicate normalization as `triples-source.md`: "uses" for
uses/analyzes/applies-to; "predicts" for predicts/estimates/calculates;
"requires" for requires/needs.

| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | Khamis-Roche-Methode | predicts | Erwachsenengröße ohne Knochenalter-Test | 96 | "Gilt als die genaueste Größenvorhersage-Methode ohne Knochenalter-Test." |
| 2 | Khamis-Roche-Methode | uses | Alter, Größe, Gewicht des Kindes sowie durchschnittliche Elterngröße | 90 | Matches source's four inputs exactly. |
| 3 | Khamis-Roche-Methode | has accuracy | ±2,1 Zoll bei Jungen, ±1,7 Zoll bei Mädchen | 92 | Numbers preserved exactly (comma decimal per German convention). |
| 4 | Mid-Parental Height Formula | predicts | Erwachsenengröße allein anhand der Elterngröße | 90 | Entity name kept verbatim per registry. |
| 5 | Mid-Parental Height Formula (Jungen) | equals | (Vater + Mutter + 5 Zoll) ÷ 2 | 88 | Formula preserved; "Father/Mother/in" translated to Vater/Mutter/Zoll. |
| 6 | Mid-Parental Height Formula (Mädchen) | equals | (Vater + Mutter − 5 Zoll) ÷ 2 | 88 | Formula preserved. |
| 7 | Mid-Parental Height Formula | has accuracy | innerhalb von ±4 Zoll (10 cm) der endgültigen Erwachsenengröße | 80 | Numbers preserved. |
| 8 | Genetik | accounts for | 60–80 % der endgültigen Körpergröße | 92 | Number preserved (en dash + narrow space per German typographic convention). |
| 9 | Umwelt (Ernährung/Schlaf/Bewegung) | accounts for | verbleibende 20–40 % der endgültigen Größe | 82 | Number preserved. |
| 10 | Jungen | stop growing around | Alter von 18 Jahren | 85 | "Die meisten Jungen hören etwa mit 18 Jahren auf zu wachsen." |
| 11 | Mädchen | reach adult height between | 15 und 16 Jahren | 85 | Number preserved. |
| 12 | Knochenalter-Methode (Handgelenk-Röntgen) | is | genaueste verfügbare Vorhersagemethode | 88 | Matches source claim. |
| 13 | Knochenalter-Methode | uses evaluation methods | Greulich-Pyle, Tanner-Whitehouse | 70 | Method names kept verbatim (proper names). |
| 14 | Bayley-Pinneau-Methode | combines | Knochenalterdaten mit Größe-für-Alter-Tabellen | 74 | Matches source. |
| 15 | Roche-Wainer-Thissen-Methode | uses | Knochenalter, aktuelle Größe, Gewicht, Elterngröße | 72 | Matches source. |
| 16 | 50. Perzentile | represents | mittlere Körpergröße für Alter und Geschlecht | 80 | Matches source. |
| 17 | Gesunde Kinder | fall between | 3. und 97. Perzentile | 78 | Number preserved. |
| 18 | CDC Growth Charts | tracks | durchschnittliche Größe und Gewicht von Geburt bis junges Erwachsenenalter (2–18 Jahre) | 82 | Entity name kept verbatim; numbers preserved. |
| 19 | Größenrechner | requires | Alter, Größe, Gewicht, Elterngröße | 70 | Matches source. |
| 20 | Wachstumskurve | requires | Alter + aktuelle Größe | 70 | Matches source. |
| 21 | Größenrechner | achieves accuracy | ±2–4 Zoll | 75 | Number preserved. |
| 22 | Dieser Rechner | uses | Khamis-Roche-Wachstumsmodell, Langzeitstudien zu kindlichen Wachstumsdaten | 80 | Matches source. |
| 23 | Größenvorhersagen | fall within | 5–10 cm (2–4 Zoll) der endgültigen Erwachsenengröße | 78 | Numbers preserved. |
| 24 | Ergebnisse des Größenrechners | are | wahrscheinlicher Bereich, kein exakter Wert | 76 | Recurring caveat translated consistently in all 3 occurrences. |
| 25 | Medizinischer Haftungsausschluss | states | Rechner ist nur informativ, kein Ersatz für medizinische Beratung | 74 | Matches source. |
| 26 | Height Comparison Tool | visualizes | Größenunterschiede zwischen Personen, Prominenten und Objekten | 60 | Entity name kept verbatim (brand). |
| 27 | Image to Height Tool | estimates | Körpergröße aus Fotos mit Referenzobjekten | 60 | Entity name kept verbatim (brand). |
| 28 | Height & Weight Percentile Tool | compares | Größe und Gewicht des Kindes mit WHO- und CDC-Daten | 60 | Entity names (WHO, CDC) kept verbatim. |
| 29 | Kein Training oder Nahrungsergänzungsmittel | can increase height | sobald Wachstumsfugen geschlossen sind | 70 | Matches source. |
| 30 | HeightCharts-Daten | is based on | CDC-Wachstumskurvendaten | 85 | "Basierend auf CDC-Wachstumskurvendaten..." |
| 31 | HeightCharts-Quelle | is | CDC Growth Charts / National Center for Health Statistics | 82 | Entity names kept verbatim in both chart and table view footers. |
| 32 | 50. Perzentile-Linie | represents | Durchschnitt/Median | 76 | Matches source; reused in tooltip and legend. |
| 33 | Jungen | stop growing | ~16–18 J. (Kennzahlen-Karte) | 80 | Matches source. |
| 34 | Mädchen | stop growing | ~14–15 J. (Kennzahlen-Karte) | 80 | Matches source. |
| 35 | Durchschnittsgröße erwachsener Männer (USA 20+ NHANES) | is | 175 cm / 5'9" | 78 | Numeric literal kept byte-identical to source. |
| 36 | Durchschnittsgröße erwachsener Frauen (USA 20+ NHANES) | is | 161.3 cm / 5'3.5" | 78 | Numeric literal kept byte-identical to source. |
| 37 | Mayo Clinic | publishes / validates | 2-Jahres-Verdopplungsregel neben Mid-Parental-Methode | 85 | Preserved in howTallChild and methods cards. |
| 38 | Khamis-Roche-Fehlerspanne | is within | 5,3 cm (2,1 Zoll) für Jungen und 4,3 cm (1,7 Zoll) für Mädchen bei 9 von 10 Kindern | 90 | Preserved in intro, comparisonTable, accuracy, and FAQ. |
| 39 | Mid-Parental erwarteter Bereich | is | innerhalb von ca. ±10 cm (4 Zoll) der Erwachsenengröße | 85 | Preserved in midParental, workedExample, and methods. |
| 40 | Größenprognose ohne Elterngrößen | is | von Rechnern nicht unterstützt; erfordert Perzentilenkurven oder Knochenalter-Röntgen | 80 | Preserved in teensAdults and comparisonTable. |
| 41 | 100%ige Genauigkeit | is | mit keinem Rechner oder klinischem Verfahren möglich | 85 | Preserved in accuracy and FAQ. |

## Deliberate deviations (flagged, not meaning loss)
- Triples #10 ("Boys stop growing around 18") and #11 ("Girls reach adult
  height between 15 and 16") are phrased with slightly different sentence
  connectors in German for natural word order but preserve every number and
  the core claim — classified as Preserved, not Weakened, in
  `validation-report.md`.
- The `canIncrease.titlePrefix`/`titleHighlight` split ("Can You" /
  "Increase Height") required reflowing German word order ("Kannst du
  deine" / "Körpergröße noch steigern") because German verb-second word
  order does not map word-for-word onto the English split point. The
  rendered sentence "Kannst du deine Körpergröße noch steigern?" preserves
  the full question's meaning; no triple is affected since this is a
  section title, not a factual claim.
- `heightCharts.insightMaleHeightValue`/`insightFemaleHeightValue` values
  ("172.2 cm / 5'8\"", "160.1 cm / 5'3\"") were deliberately left byte-identical
  to the English source (English-style decimal point) rather than converted
  to German comma-decimal notation, because this literal string mixes cm
  and ft/in in one value and matches the raw numeric data already baked
  into `HeightCharts.tsx`'s `boysData`/`girlsData` age-18 `p50` values —
  changing the separator here would visually diverge from the chart/table's
  own axis and cell numbers on the same screen, which are rendered directly
  from those untranslated data arrays and were never in scope for
  translation (they are numeric chart data, not UI copy). This is a
  formatting/consistency choice, not a meaning loss.
- The References/Bibliography section (`references.ref1`-`ref11`) was left
  untranslated by deliberate decision (see `seo-adaptation.md` and
  `validation-report.md`) — these are formal citations of English-language
  sources, and international academic convention keeps such citations in
  their original language even inside German-language pages. No triples
  were extracted from this section on either pass since it contains no
  general-audience claims beyond citation metadata.
