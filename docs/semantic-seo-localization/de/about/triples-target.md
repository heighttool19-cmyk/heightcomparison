# Target Triples — about (de)

**Predicate normalization notes:** same as `triples-source.md` — "renders at" / "sized relative to" → `renders at`; "runs ... side by side" → `runs alongside`; "covers" / "pulls from" / "sourced from" kept distinct.

Translated draft reference (working output, not yet written to `messages/de.json`):
> "Das Größenvergleichs-Diagramm nimmt deine Maße und stellt sie maßstabsgetreu dar... Du kannst eine unbegrenzte Anzahl an Personen oder Objekten gleichzeitig vergleichen... Die Promi-Datenbank umfasst Sportler, Schauspieler, Musiker und Personen des öffentlichen Lebens aus Regionen wie Bollywood sowie der britischen, asiatischen und amerikanischen Unterhaltungsbranche... Nutzt die Khamis-Roche-Formel und die Mid-Parental-Methode... Vergleicht Größe und Gewicht einer Person mit Bevölkerungsdaten der WHO und der CDC... Berechnet die Devine-, Robinson- und Hamwi-Formel nebeneinander... Deckt 46 Länder... Der PNG-Export hat kein Wasserzeichen... Nichts davon wird von Nutzern eingereicht."
(Full draft held in the pipeline's working output per contextual-translation.md; see task-7-report.md for the complete text.)

| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | HeightComparison | renders at | maßstabsgetreue Darstellung (true proportional scale) | 92 | Matches source #1; "stellt ... maßstabsgetreu dar" preserves the proportional-rendering claim exactly. |
| 2 | HeightComparison | has feature | Foto-Upload mit Genauigkeit von 1 bis 2 cm | 85 | Matches source #2; quantified accuracy figure preserved unchanged. |
| 3 | Promi-Datenbank (celebrity database) | covers | Sportler, Schauspieler, Musiker und Personen des öffentlichen Lebens | 82 | Matches source #3; scope list preserved. |
| 4 | Promi-Datenbank (celebrity database) | covers regions including | Bollywood, britische, asiatische und amerikanische Unterhaltungsbranche | 78 | Matches source #4; regional list and Bollywood entity preserved verbatim. |
| 5 | Bibliothek fiktiver Charaktere (fictional character library) | pulls from | offizielle Produktionsunterlagen und lizenzierte Databooks | 80 | Matches source #5; provenance claim preserved. |
| 6 | Height Predictor | uses | Khamis-Roche-Formel und Mid-Parental-Methode | 88 | Matches source #6; both protected entity names preserved verbatim within German noun phrases. |
| 7 | Khamis-Roche-Formel und Mid-Parental-Methode | are used in | klinischer Bereich (clinical settings) | 70 | Matches source #7; credibility claim preserved. |
| 8 | Height Weight Percentile Calculator | compares against | Bevölkerungsdaten der WHO und der CDC | 84 | Matches source #8; both protected entity names preserved verbatim. |
| 9 | Ideal Body Weight Calculator | runs alongside | Devine-, Robinson- und Hamwi-Formel | 83 | Matches source #9; all three protected names preserved. |
| 10 | Average Height by Country | covers | 46 Länder (46 countries) | 79 | Matches source #10; number preserved exactly. |
| 11 | Image to Height | estimates | Körpergröße anhand eines Fotos | 75 | Matches source #11. |
| 12 | Image to Height | includes | Leitfaden zu morgendlichen Größenschwankungen | 60 | Matches source #12. |
| 13 | HeightComparison | has no | Wasserzeichen beim PNG-Export | 72 | Matches source #13; PNG entity preserved verbatim. |
| 14 | HeightComparison | does not require | Konto oder Zahlung | 88 | Matches source #14. |
| 15 | Promi-Datenbank (celebrity database) | is not behind | Bezahlschranke (paywall) | 65 | Matches source #15. |
| 16 | HeightComparison | normalizes conflicting data to | zuletzt verifizierter Wert aus glaubwürdiger öffentlicher Quelle | 76 | Matches source #16. |
| 17 | Charaktergrößen (character heights) | come from | lizenzierte offizielle Materialien, wo möglich | 68 | Matches source #17. |
| 18 | Maße von Bauwerken und Objekten (landmark/object dimensions) | come from | architektonische und wissenschaftliche Referenzquellen | 66 | Matches source #18. |
| 19 | Inhalt (content) | is not | von Nutzern eingereicht (user-submitted) | 55 | Matches source #19. |
| 20 | HeightComparison | allows comparison of | unbegrenzte Anzahl an Personen/Objekten gleichzeitig | 70 | Matches source #20; "unlimited" preserved as "unbegrenzte Anzahl." |

## Excluded as non-central
Same rationale as `triples-source.md`: framing/tone sentences ("Wir haben etwas anderes gebaut," "Das ist kein Marketing-Trick," "Diese Entscheidung wurde früh getroffen") were not converted to triples.
