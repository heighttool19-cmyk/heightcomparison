# PENDING REVIEW — average-height-by-country German Localization

This is Stages 1-5 of `semantic-seo-localization` for `/average-height-by-country`,
resumed from a prior paused session (see `RESUME-CONTEXT.md` for the full
resume trail). **Nothing in this task has been wired into `.tsx`, written to
`messages/de.json`, or committed** — this document is the human review gate
before any of that happens.

## 1. Entity list changes (`docs/semantic-seo-localization/de/entities.json`)

**Note on file state:** while this session was writing to `entities.json`, the
file was also modified on disk by what appears to be a concurrent process
(the tool reported "changed on disk since you last read it" mid-task, showing
content that matched my intended additions but with the whole file
re-sorted into strict alphabetical order). The final on-disk state contains
all the intended additions below, correctly alphabetized, and is valid JSON
(verified with `node -e "require(...)"`, 43 entities total, up from 30).
Flagging this for visibility even though the end state looks correct — see
"Bugs/gaps found" section below for the fuller note.

### Conflict resolved
- **`Average Height by Country`** — was `translate:false`, updated to
  `translate:true` / `localized_form: "Durchschnittsgröße nach Land"`, matching
  the already-shipped nav/footer label (`messages/de.json`
  `nav.averageHeightByCountry` / `footer.averageHeightByCountry`). Same
  resolution pattern already applied to `Height Predictor`, `Ideal Body Weight
  Calculator`, and `Height Difference Calculator` in prior migrations.

### New entities added (10)
| Canonical name | Type | translate | Why |
|---|---|---|---|
| American Horror Story | Brand | false | TV show referenced once (Jyoti Amge's paragraph) |
| Chandra Bahadur Dangi | Person | false | Shortest documented adult male ever |
| Guinness World Records | Organization | false | Record-verification body, cited 4× in extremes section |
| Jyoti Amge | Person | false | Shortest living woman (Guinness record holder) |
| NCD Risk Factor Collaboration | Organization | false | Primary dataset publisher for this page (also abbreviated NCD-RisC, same entity) |
| Robert Wadlow | Person | false | Tallest documented person ever |
| Rumeysa Gelgi | Person | false | Tallest living woman (current record) |
| Sultan Kösen | Person | false | Tallest living man (current record) |
| World Population Review | Organization | false | Secondary dataset publisher cited alongside NCD-RisC |
| Zeng Jinlian | Person | false | Tallest woman in verified medical history |

### Explicitly NOT added (per RESUME-CONTEXT.md's already-made decisions)
- Individual country names (Netherlands, Japan, Germany, etc.) — translate as
  normal prose place names with standard German exonyms, not registered entities.
- "World Health Organization" (spelled out inline in `globalAverage.paragraph1`) —
  not a new entity, already covered by the existing `WHO` registry entry; kept
  untranslated verbatim in the German candidate per the confirmed site convention.

## 2. Batch plan actually used

Confirmed against `messages/en.json` with the Node leaf-walker script: **229
total keys** (227 under `averageHeightByCountry` + 2 under `metadata`). Batches
were executed in the same order/grouping as RESUME-CONTEXT.md's 21-batch plan,
with corrected per-batch counts (the resume file flagged its own batch-3 count
as unverified — recomputed here):

1. (4) metadata title/description, h1, intro.description
2. (11) globalTable.* (title, unitToggle×2, description, searchPlaceholder, tableHeaders×4, noResults, sourceNote)
3. (9) common.*×4 + tallestCountries.title/barsLabelMen/barsLabelWomen/captionMen/captionWomen×5
4. (8) tallestCountries.paragraph1-3×3 + shortestCountries.title/barsLabelMen/barsLabelWomen/captionMen/captionWomen×5
5. (7) shortestCountries.paragraph1-3×3 + tallestShortest.title+tabs×4
6. (6) tallestShortest.chartTitle×3/caption/paragraph×5 + averageMale.title×1
7. (5) averageMale.paragraph1-2×2 + averageFemale.title/paragraph1-2×3
8. (4) maleAndFemale.*
9. (13) selectedCountries.title×1 + 6 countries×(name+paragraph)=12
10. (12) selectedCountries: remaining 6 countries×(name+paragraph)
11. (4) chartForMen.*
12. (5) globalAverage.title/maleStatLabel/femaleStatLabel/paragraph1-2
13. (21) globalAverage.regionMap.* (3 labels + 9 regions×name/ex=18)
14. (8) extremes.tallestMan/shortestMan/tallestFemale/shortestFemale × title+paragraph
15. (16) extremes.dataCards.* (4 cards × label/name/value/meta)
16. (14) distribution.title + bellCurve.*(10) + legendNote + dataSourcesLabel + dataSourcesText
17. (10) distribution.paragraph1-2 + tableHeaders×5 + captionMale/Female/Sources×3
18. (6) whyDiffers.*
19. (34) toc[] whole array (17 id + 17 label)
20. (10) faq[] whole array (5×q/a)
21. (22) references.* (4 titles + 18 refs)

**Sum: 4+11+9+8+7+6+5+4+13+12+4+5+21+8+16+14+10+6+34+10+22 = 229** — matches the
mechanical leaf count exactly, confirming no batch dropped or duplicated a key.
This matches RESUME-CONTEXT.md's plan with only the batch-3 arithmetic
corrected (9, not the ambiguous "12" flagged as unverified in the resume note).

## 3. Completeness gate result

```
EN leaf count: 229
DE leaf count: 229
Missing in DE: 0
Extra in DE: 0
```

**PASS — key sets match exactly.** Full detail and methodology in
`validation-report.md`. A numeric-fidelity cross-check (every digit sequence in
every source value vs. every target value) was also run across all 229 keys:
9 keys were initially flagged, all 9 confirmed as false positives from the
extraction regex swallowing a trailing sentence-final period (e.g. "1940." vs
"1940") — no actual numeric drift found anywhere in the page.

## 4. Full merged German translation candidate

Every one of the 229 keys, English source value directly above its German
translation candidate, in the same order as the batch plan above (which is
also `messages/en.json`'s natural key order). This is the literal content that
would be merged into `messages/de.json` under the `averageHeightByCountry`
namespace and the 2 `metadata.averageHeightByCountry*` keys, **once approved**
— nothing below has been written to that file yet.

**`metadata.averageHeightByCountryTitle`**
- EN: Average Height by Country - Global Human Height Chart
- DE: Durchschnittsgröße nach Land – Weltweiter Körpergrößen-Vergleich

**`metadata.averageHeightByCountryDescription`**
- EN: Learn the average height of a woman & man worldwide and compare average heights by country. See the average human height around the world in one chart.
- DE: Erfahren Sie die durchschnittliche Körpergröße von Mann und Frau weltweit und vergleichen Sie die Durchschnittsgröße nach Land. Die durchschnittliche menschliche Körpergröße weltweit auf einen Blick.

**`averageHeightByCountry.h1`**
- EN: Average Height by Country
- DE: Durchschnittsgröße nach Land

**`averageHeightByCountry.intro.description`**
- EN: Average height varies more than most people expect. The gap between the world's tallest and shortest populations spans nearly 24 cm for men and 21 cm for women. This page compares average human height around the world for both sexes, from the Netherlands at the top to Timor-Leste at the foot, drawing on data from the <ncdRisc>NCD Risk Factor Collaboration</ncdRisc> and <wpr>World Population Review</wpr>. Men and women follow the same broad geographic pattern, with Northern Europe at the top and parts of South and Central Asia at the lower end.
- DE: Die durchschnittliche Körpergröße variiert stärker, als die meisten Menschen erwarten. Die Lücke zwischen den größten und kleinsten Bevölkerungen der Welt beträgt bei Männern fast 24 cm und bei Frauen 21 cm. Diese Seite vergleicht die durchschnittliche menschliche Körpergröße weltweit für beide Geschlechter, von den Niederlanden an der Spitze bis Timor-Leste am unteren Ende, basierend auf Daten der <ncdRisc>NCD Risk Factor Collaboration</ncdRisc> und der <wpr>World Population Review</wpr>. Männer und Frauen folgen demselben groben geografischen Muster, wobei Nordeuropa an der Spitze steht und Teile Süd- und Zentralasiens am unteren Ende liegen.

**`averageHeightByCountry.globalTable.title`**
- EN: Average Height by Country (Global Table)
- DE: Durchschnittsgröße nach Land (Globale Tabelle)

**`averageHeightByCountry.globalTable.unitToggle.metric`**
- EN: Metric (cm)
- DE: Metrisch (cm)

**`averageHeightByCountry.globalTable.unitToggle.imperial`**
- EN: US (ft/in)
- DE: US (ft/in)

**`averageHeightByCountry.globalTable.description`**
- EN: The table below shows average male height by country, average female height, and combined average across 46 nations. Click any column header to sort. Use the search field to find a specific country.
- DE: Die folgende Tabelle zeigt die durchschnittliche Körpergröße von Männern nach Land, die durchschnittliche Körpergröße von Frauen sowie den kombinierten Durchschnitt über 46 Länder. Klicken Sie auf eine Spaltenüberschrift, um zu sortieren. Nutzen Sie das Suchfeld, um ein bestimmtes Land zu finden.

**`averageHeightByCountry.globalTable.searchPlaceholder`**
- EN: Search countries...
- DE: Länder suchen...

**`averageHeightByCountry.globalTable.tableHeaders.rank`**
- EN: Rank
- DE: Rang

**`averageHeightByCountry.globalTable.tableHeaders.country`**
- EN: Country
- DE: Land

**`averageHeightByCountry.globalTable.tableHeaders.avgMale`**
- EN: Avg Male
- DE: Ø Männer

**`averageHeightByCountry.globalTable.tableHeaders.avgFemale`**
- EN: Avg Female
- DE: Ø Frauen

**`averageHeightByCountry.globalTable.noResults`**
- EN: No countries found matching "{query}"
- DE: Keine Länder gefunden, die zu "{query}" passen

**`averageHeightByCountry.globalTable.sourceNote`**
- EN: Source: NCD Risk Factor Collaboration (NCD-RisC) / World Population Review. Adults aged ~19.
- DE: Quelle: NCD Risk Factor Collaboration (NCD-RisC) / World Population Review. Erwachsene im Alter von ca. 19 Jahren.

**`averageHeightByCountry.common.tabMen`**
- EN: Men
- DE: Männer

**`averageHeightByCountry.common.tabWomen`**
- EN: Women
- DE: Frauen

**`averageHeightByCountry.common.tabMale`**
- EN: Male
- DE: Männlich

**`averageHeightByCountry.common.tabFemale`**
- EN: Female
- DE: Weiblich

**`averageHeightByCountry.tallestCountries.title`**
- EN: Tallest Countries in the World
- DE: Die größten Länder der Welt

**`averageHeightByCountry.tallestCountries.barsLabelMen`**
- EN: Top 10 tallest nations — Average male height (cm)
- DE: Top 10 größte Nationen — Durchschnittliche Körpergröße Männer (cm)

**`averageHeightByCountry.tallestCountries.barsLabelWomen`**
- EN: Top 10 tallest nations — Average female height (cm)
- DE: Top 10 größte Nationen — Durchschnittliche Körpergröße Frauen (cm)

**`averageHeightByCountry.tallestCountries.captionMen`**
- EN: Netherlands men average 183.8 cm, the highest recorded national average globally. Eight of the top ten tallest nations for men are European.
- DE: Niederländische Männer sind mit durchschnittlich 183,8 cm die größten weltweit erfassten Landesdurchschnitte. Acht der zehn größten Nationen für Männer liegen in Europa.

**`averageHeightByCountry.tallestCountries.captionWomen`**
- EN: Netherlands and Montenegrin women average 170.4 cm and 170.0 cm respectively — the tallest female populations on record. Latvia and Estonia follow closely.
- DE: Niederländische und montenegrinische Frauen sind mit durchschnittlich 170,4 cm bzw. 170,0 cm die größten erfassten weiblichen Bevölkerungen. Lettland und Estland folgen dicht dahinter.

**`averageHeightByCountry.tallestCountries.paragraph1`**
- EN: The Netherlands has topped global male height rankings for decades, with men averaging 183.8 cm, just under 6'1". Denmark sits at 181.9 cm, Germany at 180.3 cm, and Norway at 180.5 cm.
- DE: Die Niederlande führen seit Jahrzehnten die globale Rangliste der Männergröße an: Männer sind im Durchschnitt 183,8 cm groß, knapp unter 6'1". Dänemark liegt bei 181,9 cm, Deutschland bei 180,3 cm und Norwegen bei 180,5 cm.

**`averageHeightByCountry.tallestCountries.paragraph2`**
- EN: Three factors reinforce each other across this cluster: generous dairy consumption from early childhood, strong public healthcare that reduces illness during growth years, and long-term genetic selection in well-nourished populations.
- DE: Drei Faktoren verstärken sich in dieser Ländergruppe gegenseitig: reichlicher Milchkonsum von früher Kindheit an, ein starkes öffentliches Gesundheitssystem, das Krankheiten während der Wachstumsjahre reduziert, sowie eine langfristige genetische Selektion in gut ernährten Bevölkerungen.

**`averageHeightByCountry.tallestCountries.paragraph3`**
- EN: Montenegro and Estonia have recently overtaken many traditionally tall Western European nations, reflecting rapid improvements in living standards following the post-Soviet period.
- DE: Montenegro und Estland haben in jüngster Zeit viele traditionell große westeuropäische Nationen überholt, was die raschen Verbesserungen des Lebensstandards nach der postsowjetischen Zeit widerspiegelt.

**`averageHeightByCountry.shortestCountries.title`**
- EN: Shortest Countries in the World
- DE: Die kleinsten Länder der Welt

**`averageHeightByCountry.shortestCountries.barsLabelMen`**
- EN: 10 shortest nations — Average male height (cm)
- DE: 10 kleinste Nationen — Durchschnittliche Körpergröße Männer (cm)

**`averageHeightByCountry.shortestCountries.barsLabelWomen`**
- EN: 10 shortest nations — Average female height (cm)
- DE: 10 kleinste Nationen — Durchschnittliche Körpergröße Frauen (cm)

**`averageHeightByCountry.shortestCountries.captionMen`**
- EN: Timor-Leste men average 159.8 cm, the shortest male average of any tracked nation. Six of the ten shortest countries for men are in South or Southeast Asia.
- DE: Männer aus Timor-Leste sind mit durchschnittlich 159,8 cm der kleinste männliche Durchschnitt aller erfassten Nationen. Sechs der zehn kleinsten Länder für Männer liegen in Süd- oder Südostasien.

**`averageHeightByCountry.shortestCountries.captionWomen`**
- EN: Guatemalan and Filipino women average around 149 cm, the lowest female averages in the Americas and Southeast Asia respectively.
- DE: Guatemaltekische und philippinische Frauen sind mit rund 149 cm die niedrigsten weiblichen Durchschnittswerte in Amerika bzw. Südostasien.

**`averageHeightByCountry.shortestCountries.paragraph1`**
- EN: The shortest populations sit predominantly in South and Southeast Asia and Central America. Timor-Leste records the lowest combined average globally, followed closely by Guatemala and Laos.
- DE: Die kleinsten Bevölkerungen befinden sich überwiegend in Süd- und Südostasien sowie Mittelamerika. Timor-Leste verzeichnet weltweit den niedrigsten kombinierten Durchschnitt, dicht gefolgt von Guatemala und Laos.

**`averageHeightByCountry.shortestCountries.paragraph2`**
- EN: In Guatemala, chronic malnutrition affects nearly a third of children under five, directly stunting skeletal development. Bangladesh and Nepal face similar constraints: protein-scarce diets, limited healthcare access, and structural poverty that limits growth potential from birth.
- DE: In Guatemala ist fast ein Drittel der Kinder unter fünf Jahren von chronischer Mangelernährung betroffen, was die Skelettentwicklung direkt beeinträchtigt. Bangladesch und Nepal stehen vor ähnlichen Einschränkungen: proteinarme Ernährung, eingeschränkter Zugang zur Gesundheitsversorgung und strukturelle Armut, die das Wachstumspotenzial von Geburt an begrenzt.

**`averageHeightByCountry.shortestCountries.paragraph3`**
- EN: These figures are not genetic ceilings. They are largely markers of historical underdevelopment, reversible, as South Korea and China demonstrated across the 20th century.
- DE: Diese Werte sind keine genetischen Obergrenzen. Sie sind größtenteils Zeichen historischer Unterentwicklung und umkehrbar, wie Südkorea und China im Laufe des 20. Jahrhunderts gezeigt haben.

**`averageHeightByCountry.tallestShortest.title`**
- EN: Tallest and Shortest Countries by Average Height
- DE: Größte und kleinste Länder nach Durchschnittsgröße

**`averageHeightByCountry.tallestShortest.tabs.tallestVsShortest`**
- EN: Tallest vs Shortest
- DE: Größte vs. Kleinste

**`averageHeightByCountry.tallestShortest.tabs.top10Tallest`**
- EN: Top 10 tallest
- DE: Top 10 Größte

**`averageHeightByCountry.tallestShortest.tabs.bottom10Shortest`**
- EN: Bottom 10 shortest
- DE: Bottom 10 Kleinste

**`averageHeightByCountry.tallestShortest.chartTitleTallestVsShortest`**
- EN: 10 countries spanning the full global height range — male (blue) and female (teal)
- DE: 10 Länder über die gesamte globale Größenspanne — Männer (blau) und Frauen (türkis)

**`averageHeightByCountry.tallestShortest.chartTitleTop10`**
- EN: Top 10 tallest nations — male vs female
- DE: Top 10 größte Nationen — Männer vs. Frauen

**`averageHeightByCountry.tallestShortest.chartTitleBottom10`**
- EN: 10 shortest nations — male vs female
- DE: 10 kleinste Nationen — Männer vs. Frauen

**`averageHeightByCountry.tallestShortest.caption`**
- EN: Across all populations, men are taller than women by 12–15 cm. This gap holds consistent regardless of overall height level, it is nearly identical in the Netherlands and in Bangladesh.
- DE: In allen Bevölkerungen sind Männer 12–15 cm größer als Frauen. Diese Differenz bleibt unabhängig vom allgemeinen Größenniveau konstant — sie ist in den Niederlanden nahezu identisch mit der in Bangladesch.

**`averageHeightByCountry.tallestShortest.paragraph`**
- EN: Average height varies widely due to genetics, diet quality, childhood health, and economic development. Northern European populations consistently rank among the tallest, while some South Asian and Central American countries show shorter averages shaped by historical nutritional limitations.
- DE: Die Durchschnittsgröße variiert stark aufgrund von Genetik, Ernährungsqualität, Gesundheit im Kindesalter und wirtschaftlicher Entwicklung. Nordeuropäische Bevölkerungen zählen durchgehend zu den größten, während einige südasiatische und mittelamerikanische Länder aufgrund historischer Ernährungseinschränkungen niedrigere Durchschnittswerte aufweisen.

**`averageHeightByCountry.averageMale.title`**
- EN: Average Male Height by Country
- DE: Durchschnittliche Körpergröße von Männern nach Land

**`averageHeightByCountry.averageMale.paragraph1`**
- EN: The average height of a man worldwide is approximately 171 cm (5'7"). This figure masks a wide spread, from Dutch men at 183.8 cm down to Timor-Leste at 159.8 cm. Northern and Eastern European men are the tallest group globally, averaging 178 to 184 cm. North Americans and Australians sit in the 176 to 179 cm band.
- DE: Die durchschnittliche Körpergröße eines Mannes weltweit beträgt etwa 171 cm (5'7"). Diese Zahl verdeckt eine große Bandbreite, von niederländischen Männern mit 183,8 cm bis hinunter zu Timor-Leste mit 159,8 cm. Nord- und osteuropäische Männer sind weltweit die größte Gruppe, mit einem Durchschnitt von 178 bis 184 cm. Nordamerikaner und Australier liegen im Bereich von 176 bis 179 cm.

**`averageHeightByCountry.averageMale.paragraph2`**
- EN: Japan at 170.8 cm sits noticeably shorter than South Korea at 175.5 cm: a gap that has widened as South Korean diets and healthcare improved faster following the 1960s economic boom. Iran at 175.6 cm sits mid-table. India at 166.5 cm and Bangladesh at 163 cm sit at the lower end of the Asian cohort. Guatemala at 163.4 cm and Timor-Leste at 159.8 cm reflect the most severe documented nutritional constraints on record.
- DE: Japan liegt mit 170,8 cm merklich kleiner als Südkorea mit 175,5 cm — eine Lücke, die sich vergrößert hat, da sich Ernährung und Gesundheitsversorgung in Südkorea nach dem Wirtschaftsboom der 1960er-Jahre schneller verbesserten. Der Iran liegt mit 175,6 cm im Mittelfeld. Indien mit 166,5 cm und Bangladesch mit 163 cm liegen am unteren Ende der asiatischen Gruppe. Guatemala mit 163,4 cm und Timor-Leste mit 159,8 cm spiegeln die am stärksten dokumentierten Ernährungseinschränkungen wider.

**`averageHeightByCountry.averageFemale.title`**
- EN: Average Female Height by Country
- DE: Durchschnittliche Körpergröße von Frauen nach Land

**`averageHeightByCountry.averageFemale.paragraph1`**
- EN: The average height of a woman worldwide is approximately 159 cm (5'3"). Netherlands and Montenegrin women, averaging 170.4 cm and 170.0 cm respectively, are the tallest female populations on record. Russia at 164.5 cm consistently appears in global lists alongside Eastern European countries that make up most of the top ten.
- DE: Die durchschnittliche Körpergröße einer Frau weltweit beträgt etwa 159 cm (5'3"). Niederländische und montenegrinische Frauen mit durchschnittlich 170,4 cm bzw. 170,0 cm sind die größten erfassten weiblichen Bevölkerungen. Russland liegt mit 164,5 cm durchgehend in globalen Ranglisten neben osteuropäischen Ländern, die den Großteil der Top Ten ausmachen.

**`averageHeightByCountry.averageFemale.paragraph2`**
- EN: South Korean women at 163.2 cm stand notably taller than Japanese women at 158.0 cm, a gap that has grown over the past half-century. Filipino women average 149.6 cm and Guatemalan women 149.4 cm, the lowest verified female average in the Americas. The average height for women in Japan was around 148 cm in the 1950s and has since climbed by a full ten centimetres, one of the steepest documented rises for any female population.
- DE: Südkoreanische Frauen sind mit 163,2 cm merklich größer als japanische Frauen mit 158,0 cm — eine Lücke, die sich im letzten halben Jahrhundert vergrößert hat. Philippinische Frauen sind im Durchschnitt 149,6 cm groß und guatemaltekische Frauen 149,4 cm, der niedrigste verifizierte weibliche Durchschnitt in Amerika. Die durchschnittliche Körpergröße von Frauen in Japan lag in den 1950er-Jahren bei etwa 148 cm und ist seitdem um ganze zehn Zentimeter gestiegen — einer der stärksten dokumentierten Anstiege bei einer weiblichen Bevölkerung.

**`averageHeightByCountry.maleAndFemale.title`**
- EN: Average Male and Female Height
- DE: Durchschnittliche Körpergröße von Männern und Frauen

**`averageHeightByCountry.maleAndFemale.barsLabelMale`**
- EN: Average male height (cm)
- DE: Durchschnittliche Körpergröße Männer (cm)

**`averageHeightByCountry.maleAndFemale.barsLabelFemale`**
- EN: Average female height (cm)
- DE: Durchschnittliche Körpergröße Frauen (cm)

**`averageHeightByCountry.maleAndFemale.callout`**
- EN: Across virtually every population, men are taller than women by 12 to 15 centimetres. This gap holds consistent across very different absolute height ranges, the difference in the Netherlands is roughly the same as in Bangladesh. It reflects hormonal differences during adolescence: testosterone drives a longer growth spurt in males, while earlier oestrogen onset in females closes growth plates sooner. The sex gap is not meaningfully affected by nutrition or economic development.
- DE: In praktisch allen Bevölkerungen sind Männer 12 bis 15 Zentimeter größer als Frauen. Diese Differenz bleibt über sehr unterschiedliche absolute Größenbereiche hinweg konstant — der Unterschied in den Niederlanden ist ungefähr derselbe wie in Bangladesch. Er spiegelt hormonelle Unterschiede während der Pubertät wider: Testosteron treibt bei Männern einen längeren Wachstumsschub an, während der frühere Östrogeneinsatz bei Frauen die Wachstumsfugen früher schließt. Das geschlechtsspezifische Gefälle wird durch Ernährung oder wirtschaftliche Entwicklung nicht wesentlich beeinflusst.

**`averageHeightByCountry.selectedCountries.title`**
- EN: Average Height in Selected Countries
- DE: Durchschnittsgröße in ausgewählten Ländern

**`averageHeightByCountry.selectedCountries.countries.netherlands.name`**
- EN: Netherlands
- DE: Niederlande

**`averageHeightByCountry.selectedCountries.countries.netherlands.paragraph`**
- EN: Netherlands men have topped global rankings for decades. Dairy-rich diets and universal healthcare drive the result.
- DE: Niederländische Männer führen seit Jahrzehnten die globale Rangliste an. Milchreiche Ernährung und eine allgemeine Gesundheitsversorgung treiben dieses Ergebnis an.

**`averageHeightByCountry.selectedCountries.countries.unitedKingdom.name`**
- EN: United Kingdom
- DE: Vereinigtes Königreich

**`averageHeightByCountry.selectedCountries.countries.unitedKingdom.paragraph`**
- EN: UK sits mid-table in Europe. Heights vary by region — northern England and Scotland tend to average slightly taller.
- DE: Das Vereinigte Königreich liegt im europäischen Mittelfeld. Die Körpergröße variiert regional — Nordengland und Schottland tendieren zu etwas größeren Durchschnittswerten.

**`averageHeightByCountry.selectedCountries.countries.japan.name`**
- EN: Japan
- DE: Japan

**`averageHeightByCountry.selectedCountries.countries.japan.paragraph`**
- EN: Japanese heights have risen sharply since the 1950s. South Korean men at 175.5 cm have since overtaken their Japanese neighbours.
- DE: Die Körpergröße in Japan ist seit den 1950er-Jahren stark gestiegen. Südkoreanische Männer mit 175,5 cm haben ihre japanischen Nachbarn inzwischen überholt.

**`averageHeightByCountry.selectedCountries.countries.bangladesh.name`**
- EN: Bangladesh
- DE: Bangladesch

**`averageHeightByCountry.selectedCountries.countries.bangladesh.paragraph`**
- EN: High rates of childhood malnutrition have historically limited growth. Urban populations show modest gains over recent decades.
- DE: Hohe Raten kindlicher Mangelernährung haben das Wachstum historisch eingeschränkt. Städtische Bevölkerungen zeigen in den letzten Jahrzehnten moderate Zuwächse.

**`averageHeightByCountry.selectedCountries.countries.iran.name`**
- EN: Iran
- DE: Iran

**`averageHeightByCountry.selectedCountries.countries.iran.paragraph`**
- EN: One of the fastest documented rises in the Middle East — average male height has increased an estimated 5 to 6 cm over 40 years.
- DE: Einer der am stärksten dokumentierten Anstiege im Nahen Osten — die durchschnittliche Körpergröße von Männern ist über 40 Jahre um schätzungsweise 5 bis 6 cm gestiegen.

**`averageHeightByCountry.selectedCountries.countries.canada.name`**
- EN: Canada
- DE: Kanada

**`averageHeightByCountry.selectedCountries.countries.canada.paragraph`**
- EN: Canada's figures mirror Australia's closely, reflecting a well-nourished, high-income population profile. Growth has plateaued since the 1990s.
- DE: Kanadas Werte spiegeln die Australiens eng wider und zeigen eine gut ernährte Bevölkerung mit hohem Einkommen. Das Wachstum stagniert seit den 1990er-Jahren.

**`averageHeightByCountry.selectedCountries.countries.ireland.name`**
- EN: Ireland
- DE: Irland

**`averageHeightByCountry.selectedCountries.countries.ireland.paragraph`**
- EN: Ireland sits in the upper quarter of European rankings. Heights have risen steadily since the mid-20th century.
- DE: Irland liegt im oberen Viertel der europäischen Rangliste. Die Körpergröße ist seit Mitte des 20. Jahrhunderts stetig gestiegen.

**`averageHeightByCountry.selectedCountries.countries.sriLanka.name`**
- EN: Sri Lanka
- DE: Sri Lanka

**`averageHeightByCountry.selectedCountries.countries.sriLanka.paragraph`**
- EN: Urban populations in Colombo show measurable height gains over two generations. Rural areas have lagged due to food insecurity.
- DE: Städtische Bevölkerungen in Colombo zeigen über zwei Generationen hinweg messbare Größenzuwächse. Ländliche Gebiete hinken aufgrund von Ernährungsunsicherheit hinterher.

**`averageHeightByCountry.selectedCountries.countries.southKorea.name`**
- EN: South Korea
- DE: Südkorea

**`averageHeightByCountry.selectedCountries.countries.southKorea.paragraph`**
- EN: One of the largest documented generational height increases ever recorded — men gained around 6 cm across two generations post-war.
- DE: Einer der größten dokumentierten generationenübergreifenden Größenanstiege überhaupt — Männer gewannen über zwei Generationen nach dem Krieg rund 6 cm hinzu.

**`averageHeightByCountry.selectedCountries.countries.india.name`**
- EN: India
- DE: Indien

**`averageHeightByCountry.selectedCountries.countries.india.paragraph`**
- EN: India's national average masks large regional variation. Men in Punjab average around 172 to 174 cm. Urban areas show consistent gains.
- DE: Indiens landesweiter Durchschnitt verdeckt große regionale Unterschiede. Männer im Punjab sind im Durchschnitt etwa 172 bis 174 cm groß. Städtische Gebiete zeigen durchgehende Zuwächse.

**`averageHeightByCountry.selectedCountries.countries.usa.name`**
- EN: USA
- DE: USA

**`averageHeightByCountry.selectedCountries.countries.usa.paragraph`**
- EN: The US was once third tallest globally. It now sits around 47th for men, reflecting diet quality diverging from European peers after the 1970s.
- DE: Die USA lagen einst weltweit auf Platz drei. Heute liegen sie bei Männern etwa auf Platz 47, was eine Ernährungsqualität widerspiegelt, die sich nach den 1970er-Jahren von der europäischer Vergleichsländer entfernt hat.

**`averageHeightByCountry.selectedCountries.countries.denmark.name`**
- EN: Denmark
- DE: Dänemark

**`averageHeightByCountry.selectedCountries.countries.denmark.paragraph`**
- EN: Denmark consistently ranks in the global top five. Strong public healthcare and high dairy consumption from early childhood contribute.
- DE: Dänemark rangiert durchgehend in den globalen Top Fünf. Ein starkes öffentliches Gesundheitssystem und hoher Milchkonsum von früher Kindheit an tragen dazu bei.

**`averageHeightByCountry.chartForMen.title`**
- EN: Average Height Chart for Men
- DE: Größendiagramm für Männer

**`averageHeightByCountry.chartForMen.paragraph`**
- EN: The chart below shows how male height benchmarks stack up across major world regions, from Northern Europe at the top to Central America at the foot. Country-level data varies within each region.
- DE: Das folgende Diagramm zeigt, wie sich die Größenrichtwerte für Männer über die wichtigsten Weltregionen verteilen, von Nordeuropa an der Spitze bis Mittelamerika am unteren Ende. Die Daten auf Länderebene variieren innerhalb jeder Region.

**`averageHeightByCountry.chartForMen.barsLabel`**
- EN: Approximate regional average male height (cm)
- DE: Ungefähre regionale durchschnittliche Körpergröße Männer (cm)

**`averageHeightByCountry.chartForMen.caption`**
- EN: Regional figures are weighted averages. Individual countries within each region may sit above or below the band shown. Source: NCD-RisC and World Population Review.
- DE: Die regionalen Werte sind gewichtete Durchschnitte. Einzelne Länder innerhalb jeder Region können über oder unter dem angezeigten Bereich liegen. Quelle: NCD-RisC und World Population Review.

**`averageHeightByCountry.globalAverage.title`**
- EN: Global Average Height
- DE: Globale Durchschnittsgröße

**`averageHeightByCountry.globalAverage.maleStatLabel`**
- EN: Global average male height
- DE: Globale durchschnittliche Körpergröße Männer

**`averageHeightByCountry.globalAverage.femaleStatLabel`**
- EN: Global average female height
- DE: Globale durchschnittliche Körpergröße Frauen

**`averageHeightByCountry.globalAverage.paragraph1`**
- EN: <who>The World Health Organization</who> and NCD Risk Factor Collaboration place the global average male height at approximately 171 cm and the global average female height at approximately 159 cm. These weighted figures pull lower than most Western country averages because they account for the large populations of South and Southeast Asia.
- DE: <who>Die World Health Organization</who> und die NCD Risk Factor Collaboration beziffern die globale durchschnittliche Körpergröße von Männern auf etwa 171 cm und die von Frauen auf etwa 159 cm. Diese gewichteten Werte liegen niedriger als die meisten westlichen Landesdurchschnitte, da sie die großen Bevölkerungen Süd- und Südostasiens berücksichtigen.

**`averageHeightByCountry.globalAverage.paragraph2`**
- EN: The global figure has been rising since the early 20th century, with the most dramatic gains in East Asia. South Korea and China gained around 5 to 8 cm per generation since the 1950s. Gains in Western Europe, which started earlier, have largely plateaued since the 1980s.
- DE: Der globale Wert steigt seit Anfang des 20. Jahrhunderts, mit den dramatischsten Zuwächsen in Ostasien. Südkorea und China gewannen seit den 1950er-Jahren pro Generation etwa 5 bis 8 cm hinzu. Die Zuwächse in Westeuropa, die früher einsetzten, stagnieren seit den 1980er-Jahren weitgehend.

**`averageHeightByCountry.globalAverage.regionMap.colourScaleLabel`**
- EN: Colour scale — average male height by region
- DE: Farbskala — durchschnittliche Körpergröße Männer nach Region

**`averageHeightByCountry.globalAverage.regionMap.tallestLabel`**
- EN: 180+ cm (tallest)
- DE: 180+ cm (größte)

**`averageHeightByCountry.globalAverage.regionMap.shortestLabel`**
- EN: ≤162 cm (shortest)
- DE: ≤162 cm (kleinste)

**`averageHeightByCountry.globalAverage.regionMap.regions.northernEurope.name`**
- EN: Northern Europe
- DE: Nordeuropa

**`averageHeightByCountry.globalAverage.regionMap.regions.northernEurope.ex`**
- EN: Netherlands, Denmark, Norway
- DE: Niederlande, Dänemark, Norwegen

**`averageHeightByCountry.globalAverage.regionMap.regions.easternEurope.name`**
- EN: Eastern Europe
- DE: Osteuropa

**`averageHeightByCountry.globalAverage.regionMap.regions.easternEurope.ex`**
- EN: Serbia, Ukraine, Poland
- DE: Serbien, Ukraine, Polen

**`averageHeightByCountry.globalAverage.regionMap.regions.westernEurope.name`**
- EN: Western Europe
- DE: Westeuropa

**`averageHeightByCountry.globalAverage.regionMap.regions.westernEurope.ex`**
- EN: Germany, France, UK
- DE: Deutschland, Frankreich, Vereinigtes Königreich

**`averageHeightByCountry.globalAverage.regionMap.regions.northAmericaOceania.name`**
- EN: Northern America/Oceania
- DE: Nordamerika/Ozeanien

**`averageHeightByCountry.globalAverage.regionMap.regions.northAmericaOceania.ex`**
- EN: Canada, USA, Australia
- DE: Kanada, USA, Australien

**`averageHeightByCountry.globalAverage.regionMap.regions.middleEast.name`**
- EN: Middle East
- DE: Naher Osten

**`averageHeightByCountry.globalAverage.regionMap.regions.middleEast.ex`**
- EN: Iran, Turkey
- DE: Iran, Türkei

**`averageHeightByCountry.globalAverage.regionMap.regions.eastAsia.name`**
- EN: East Asia
- DE: Ostasien

**`averageHeightByCountry.globalAverage.regionMap.regions.eastAsia.ex`**
- EN: China, South Korea, Japan
- DE: China, Südkorea, Japan

**`averageHeightByCountry.globalAverage.regionMap.regions.latinAmerica.name`**
- EN: Latin America
- DE: Lateinamerika

**`averageHeightByCountry.globalAverage.regionMap.regions.latinAmerica.ex`**
- EN: Brazil, Mexico
- DE: Brasilien, Mexiko

**`averageHeightByCountry.globalAverage.regionMap.regions.southSeAsia.name`**
- EN: South/SE Asia
- DE: Süd-/Südostasien

**`averageHeightByCountry.globalAverage.regionMap.regions.southSeAsia.ex`**
- EN: India, Indonesia, Nepal
- DE: Indien, Indonesien, Nepal

**`averageHeightByCountry.globalAverage.regionMap.regions.centralAmerica.name`**
- EN: Central America
- DE: Mittelamerika

**`averageHeightByCountry.globalAverage.regionMap.regions.centralAmerica.ex`**
- EN: Guatemala, Honduras
- DE: Guatemala, Honduras

**`averageHeightByCountry.extremes.tallestMan.title`**
- EN: Tallest Man in the World
- DE: Größter Mann der Welt

**`averageHeightByCountry.extremes.tallestMan.paragraph`**
- EN: Robert Wadlow of Alton, Illinois remains the tallest person in documented human history at 272 cm (8'11"). His pituitary gland produced unchecked growth hormone from birth, and his height had not yet peaked when he died in 1940 aged 22. The Guinness record for the tallest living man belongs to Turkey's Sultan Kösen at 251 cm (8'3"), whose pituitary tumour was treated surgically, halting further growth.
- DE: Robert Wadlow aus Alton, Illinois, bleibt mit 272 cm (8'11") die größte Person der dokumentierten Menschheitsgeschichte. Seine Hypophyse produzierte von Geburt an unkontrolliert Wachstumshormon, und seine Körpergröße hatte ihren Höhepunkt noch nicht erreicht, als er 1940 im Alter von 22 Jahren starb. Der Guinness-Rekord für den größten lebenden Mann gehört dem Türken Sultan Kösen mit 251 cm (8'3"), dessen Hypophysentumor operativ behandelt wurde, wodurch das weitere Wachstum gestoppt wurde.

**`averageHeightByCountry.extremes.shortestMan.title`**
- EN: Shortest Man in the World
- DE: Kleinster Mann der Welt

**`averageHeightByCountry.extremes.shortestMan.paragraph`**
- EN: Chandra Bahadur Dangi of Nepal, verified by Guinness World Records in 2012, was the shortest adult male ever documented at 54.6 cm (1'9"). He lived to 75, working as a farmer and craftsman. He was measured for the first time by Guinness when already in his seventies, remarkable given the health complications often associated with severe growth disorders.
- DE: Chandra Bahadur Dangi aus Nepal, 2012 von Guinness World Records verifiziert, war mit 54,6 cm (1'9") der kleinste je dokumentierte erwachsene Mann. Er wurde 75 Jahre alt und arbeitete als Bauer und Handwerker. Er wurde von Guinness erstmals gemessen, als er bereits in seinen Siebzigern war — bemerkenswert angesichts der gesundheitlichen Komplikationen, die häufig mit schweren Wachstumsstörungen einhergehen.

**`averageHeightByCountry.extremes.tallestFemale.title`**
- EN: Tallest Female in the World
- DE: Größte Frau der Welt

**`averageHeightByCountry.extremes.tallestFemale.paragraph`**
- EN: Zeng Jinlian of Hunan Province, China holds the record for the tallest woman in verified medical history at 246.3 cm (8'1"). Born in 1964, she grew rapidly due to pituitary gigantism and died at 17 in 1982. The current living record belongs to Turkey's Rumeysa Gelgi at 215.2 cm (7'1"), a web developer and disability advocate holding multiple Guinness titles.
- DE: Zeng Jinlian aus der chinesischen Provinz Hunan hält mit 246,3 cm (8'1") den Rekord für die größte Frau in der verifizierten medizinischen Geschichte. Sie wurde 1964 geboren, wuchs aufgrund von Hypophysengigantismus rasch und starb 1982 im Alter von 17 Jahren. Der aktuelle Rekord unter den Lebenden gehört der Türkin Rumeysa Gelgi mit 215,2 cm (7'1"), einer Webentwicklerin und Behindertenaktivistin, die mehrere Guinness-Titel hält.

**`averageHeightByCountry.extremes.shortestFemale.title`**
- EN: Shortest Female in the World
- DE: Kleinste Frau der Welt

**`averageHeightByCountry.extremes.shortestFemale.paragraph`**
- EN: Jyoti Amge of Nagpur, India has held the Guinness World Record for the shortest living woman since 2011 at 62.8 cm (2'1"). Her condition is achondroplasia, the most common form of dwarfism. She is also a working Bollywood actress who appeared in the US television series American Horror Story.
- DE: Jyoti Amge aus Nagpur, Indien, hält seit 2011 mit 62,8 cm (2'1") den Guinness-Weltrekord für die kleinste lebende Frau. Ihre Erkrankung ist Achondroplasie, die häufigste Form von Kleinwuchs. Sie ist außerdem eine aktive Bollywood-Schauspielerin, die in der US-amerikanischen Fernsehserie American Horror Story mitwirkte.

**`averageHeightByCountry.extremes.dataCards.tallestManEver.label`**
- EN: Tallest man ever
- DE: Größter Mann aller Zeiten

**`averageHeightByCountry.extremes.dataCards.tallestManEver.name`**
- EN: Robert Wadlow
- DE: Robert Wadlow

**`averageHeightByCountry.extremes.dataCards.tallestManEver.value`**
- EN: 272 cm
- DE: 272 cm

**`averageHeightByCountry.extremes.dataCards.tallestManEver.meta`**
- EN: 8'11" · USA · d. 1940
- DE: 8'11" · USA · gest. 1940

**`averageHeightByCountry.extremes.dataCards.shortestManEver.label`**
- EN: Shortest man ever
- DE: Kleinster Mann aller Zeiten

**`averageHeightByCountry.extremes.dataCards.shortestManEver.name`**
- EN: Chandra Bahadur Dangi
- DE: Chandra Bahadur Dangi

**`averageHeightByCountry.extremes.dataCards.shortestManEver.value`**
- EN: 54.6 cm
- DE: 54,6 cm

**`averageHeightByCountry.extremes.dataCards.shortestManEver.meta`**
- EN: 1'9" · Nepal · d. 2015
- DE: 1'9" · Nepal · gest. 2015

**`averageHeightByCountry.extremes.dataCards.tallestWomanEver.label`**
- EN: Tallest woman ever
- DE: Größte Frau aller Zeiten

**`averageHeightByCountry.extremes.dataCards.tallestWomanEver.name`**
- EN: Zeng Jinlian
- DE: Zeng Jinlian

**`averageHeightByCountry.extremes.dataCards.tallestWomanEver.value`**
- EN: 246.3 cm
- DE: 246,3 cm

**`averageHeightByCountry.extremes.dataCards.tallestWomanEver.meta`**
- EN: 8'1" · China · d. 1982
- DE: 8'1" · China · gest. 1982

**`averageHeightByCountry.extremes.dataCards.shortestLivingWoman.label`**
- EN: Shortest living woman
- DE: Kleinste lebende Frau

**`averageHeightByCountry.extremes.dataCards.shortestLivingWoman.name`**
- EN: Jyoti Amge
- DE: Jyoti Amge

**`averageHeightByCountry.extremes.dataCards.shortestLivingWoman.value`**
- EN: 62.8 cm
- DE: 62,8 cm

**`averageHeightByCountry.extremes.dataCards.shortestLivingWoman.meta`**
- EN: 2'1" · India
- DE: 2'1" · Indien

**`averageHeightByCountry.distribution.title`**
- EN: Human Height Distribution
- DE: Verteilung der menschlichen Körpergröße

**`averageHeightByCountry.distribution.bellCurve.globalAvgLabel`**
- EN: Global avg ≈ {mean} cm
- DE: Globaler Durchschnitt ≈ {mean} cm

**`averageHeightByCountry.distribution.bellCurve.axisLabel`**
- EN: Height (cm) — {label}
- DE: Körpergröße (cm) — {label}

**`averageHeightByCountry.distribution.bellCurve.male.label`**
- EN: global male population
- DE: globale männliche Bevölkerung

**`averageHeightByCountry.distribution.bellCurve.male.pctLabel`**
- EN: 68% of men fall within ±1 standard deviation
- DE: 68 % der Männer liegen innerhalb ±1 Standardabweichung

**`averageHeightByCountry.distribution.bellCurve.male.band1`**
- EN: 68% of men — within ±1σ (≈164–178 cm)
- DE: 68 % der Männer — innerhalb ±1σ (≈164–178 cm)

**`averageHeightByCountry.distribution.bellCurve.male.band2`**
- EN: 95% of men — within ±2σ (≈157–185 cm)
- DE: 95 % der Männer — innerhalb ±2σ (≈157–185 cm)

**`averageHeightByCountry.distribution.bellCurve.female.label`**
- EN: global female population
- DE: globale weibliche Bevölkerung

**`averageHeightByCountry.distribution.bellCurve.female.pctLabel`**
- EN: 68% of women fall within ±1 standard deviation
- DE: 68 % der Frauen liegen innerhalb ±1 Standardabweichung

**`averageHeightByCountry.distribution.bellCurve.female.band1`**
- EN: 68% of women — within ±1σ (≈153–165 cm)
- DE: 68 % der Frauen — innerhalb ±1σ (≈153–165 cm)

**`averageHeightByCountry.distribution.bellCurve.female.band2`**
- EN: 95% of women — within ±2σ (≈147–171 cm)
- DE: 95 % der Frauen — innerhalb ±2σ (≈147–171 cm)

**`averageHeightByCountry.distribution.legendNote`**
- EN: The global average male height is approximately 171 cm with a standard deviation of 7 cm. A man at 185 cm sits roughly two standard deviations above the mean, taller than approximately 97.5% of the world's male population.
- DE: Die globale durchschnittliche Körpergröße von Männern beträgt etwa 171 cm bei einer Standardabweichung von 7 cm. Ein Mann mit 185 cm liegt rund zwei Standardabweichungen über dem Mittelwert und ist damit größer als etwa 97,5 % der männlichen Weltbevölkerung.

**`averageHeightByCountry.distribution.dataSourcesLabel`**
- EN: Data sources:
- DE: Datenquellen:

**`averageHeightByCountry.distribution.dataSourcesText`**
- EN: NCD Risk Factor Collaboration (NCD-RisC), "A century of trends in adult human height," eLife 2016. · World Population Review, Average Height by Country 2026. · World Health Organization (WHO), Global Health Observatory.
- DE: NCD Risk Factor Collaboration (NCD-RisC), "A century of trends in adult human height," eLife 2016. · World Population Review, Average Height by Country 2026. · World Health Organization (WHO), Global Health Observatory.

**`averageHeightByCountry.distribution.paragraph1`**
- EN: Human height follows a normal distribution. When plotted across a large population, the data forms a near-perfect bell curve, most individuals fall close to the mean, with fewer people at either extreme. Roughly 68% of men fall within one standard deviation of the global mean, approximately 164 to 178 cm. The standard deviation for male height globally is approximately 7 cm. A man at 185 cm sits roughly two standard deviations above the global mean, taller than approximately 97.5% of the world's male population.
- DE: Die menschliche Körpergröße folgt einer Normalverteilung. Wird sie über eine große Bevölkerung aufgetragen, ergeben die Daten eine nahezu perfekte Glockenkurve — die meisten Personen liegen nahe am Mittelwert, während an den Extremen weniger Menschen zu finden sind. Etwa 68 % der Männer liegen innerhalb einer Standardabweichung vom globalen Mittelwert, also etwa 164 bis 178 cm. Die Standardabweichung der männlichen Körpergröße beträgt weltweit etwa 7 cm. Ein Mann mit 185 cm liegt rund zwei Standardabweichungen über dem globalen Mittelwert und ist damit größer als etwa 97,5 % der männlichen Weltbevölkerung.

**`averageHeightByCountry.distribution.paragraph2`**
- EN: For women it is slightly smaller at around 6 cm.
- DE: Bei Frauen ist sie mit rund 6 cm etwas geringer.

**`averageHeightByCountry.distribution.tableHeaders.minus2sd`**
- EN: −2 SD
- DE: −2 SD

**`averageHeightByCountry.distribution.tableHeaders.minus1sd`**
- EN: −1 SD
- DE: −1 SD

**`averageHeightByCountry.distribution.tableHeaders.globalAvg`**
- EN: Global Avg
- DE: Globaler Ø

**`averageHeightByCountry.distribution.tableHeaders.plus1sd`**
- EN: +1 SD
- DE: +1 SD

**`averageHeightByCountry.distribution.tableHeaders.plus2sd`**
- EN: +2 SD
- DE: +2 SD

**`averageHeightByCountry.distribution.captionMale`**
- EN: Global male height distribution · SD ≈ 7 cm
- DE: Globale Größenverteilung Männer · SD ≈ 7 cm

**`averageHeightByCountry.distribution.captionFemale`**
- EN: Global female height distribution · SD ≈ 6 cm
- DE: Globale Größenverteilung Frauen · SD ≈ 6 cm

**`averageHeightByCountry.distribution.captionSources`**
- EN: Sources: NCD-RisC
- DE: Quellen: NCD-RisC

**`averageHeightByCountry.whyDiffers.title`**
- EN: Why Average Height Differs by Country
- DE: Warum die Durchschnittsgröße nach Land variiert

**`averageHeightByCountry.whyDiffers.paragraph1`**
- EN: Height is shaped by both genetics and environment. Genetics sets the theoretical ceiling, tall parents tend to produce taller children but whether a child reaches that ceiling depends almost entirely on what happens during the first two decades of life.
- DE: Die Körpergröße wird sowohl von der Genetik als auch von der Umwelt geprägt. Die Genetik setzt die theoretische Obergrenze — große Eltern bekommen tendenziell größere Kinder —, aber ob ein Kind diese Obergrenze erreicht, hängt fast vollständig davon ab, was in den ersten zwei Lebensjahrzehnten geschieht.

**`averageHeightByCountry.whyDiffers.nutritionParagraph`**
- EN: <bold>Nutrition</bold> is the single strongest environmental determinant of adult height. Adequate protein and micronutrients during the first 1,000 days of life are critical to skeletal development. Dairy and meat availability in childhood consistently predicts national height rankings.
- DE: <bold>Ernährung</bold> ist der stärkste einzelne Umweltfaktor für die Körpergröße im Erwachsenenalter. Ausreichend Protein und Mikronährstoffe in den ersten 1.000 Tagen des Lebens sind entscheidend für die Skelettentwicklung. Die Verfügbarkeit von Milchprodukten und Fleisch im Kindesalter sagt die nationale Größenrangliste durchgehend voraus.

**`averageHeightByCountry.whyDiffers.healthcareParagraph`**
- EN: <bold>Healthcare access</bold> determines whether childhood illnesses divert energy away from growth. Countries with strong vaccination rates and low disease burdens consistently rank taller.
- DE: <bold>Der Zugang zur Gesundheitsversorgung</bold> bestimmt, ob Kinderkrankheiten Energie vom Wachstum ablenken. Länder mit hohen Impfquoten und geringer Krankheitslast rangieren durchgehend größer.

**`averageHeightByCountry.whyDiffers.economicParagraph`**
- EN: <bold>Economic development</bold> underpins both nutrition and healthcare. GDP per capita correlates strongly with average height because wealth enables better food, cleaner water, and medical care.
- DE: <bold>Die wirtschaftliche Entwicklung</bold> untermauert sowohl Ernährung als auch Gesundheitsversorgung. Das BIP pro Kopf korreliert stark mit der Durchschnittsgröße, da Wohlstand bessere Nahrung, saubereres Wasser und medizinische Versorgung ermöglicht.

**`averageHeightByCountry.whyDiffers.calloutUS`**
- EN: The United States is the most telling case study: in 1914, American men ranked third tallest in the world. Today they sit around 47th globally, not because their genetics changed but because diet quality declined relative to European peers after the 1970s.
- DE: Die Vereinigten Staaten sind das aufschlussreichste Fallbeispiel: 1914 belegten amerikanische Männer weltweit den dritten Platz in Sachen Körpergröße. Heute liegen sie global bei etwa Platz 47 — nicht weil sich ihre Genetik verändert hat, sondern weil sich die Ernährungsqualität im Vergleich zu europäischen Ländern nach den 1970er-Jahren verschlechterte.

**`averageHeightByCountry.toc[0].id`**
- EN: average-height-by-country
- DE: average-height-by-country

**`averageHeightByCountry.toc[0].label`**
- EN: Average Height by Country
- DE: Durchschnittsgröße nach Land

**`averageHeightByCountry.toc[1].id`**
- EN: tallest-countries-in-the-world
- DE: tallest-countries-in-the-world

**`averageHeightByCountry.toc[1].label`**
- EN: Tallest Countries in the World
- DE: Die größten Länder der Welt

**`averageHeightByCountry.toc[2].id`**
- EN: shortest-countries-in-the-world
- DE: shortest-countries-in-the-world

**`averageHeightByCountry.toc[2].label`**
- EN: Shortest Countries in the World
- DE: Die kleinsten Länder der Welt

**`averageHeightByCountry.toc[3].id`**
- EN: tallest-and-shortest-countries-by-average-height
- DE: tallest-and-shortest-countries-by-average-height

**`averageHeightByCountry.toc[3].label`**
- EN: Tallest and Shortest Countries by Average Height
- DE: Größte und kleinste Länder nach Durchschnittsgröße

**`averageHeightByCountry.toc[4].id`**
- EN: average-male-height-by-country
- DE: average-male-height-by-country

**`averageHeightByCountry.toc[4].label`**
- EN: Average Male Height by Country
- DE: Durchschnittliche Körpergröße von Männern nach Land

**`averageHeightByCountry.toc[5].id`**
- EN: average-female-height-by-country
- DE: average-female-height-by-country

**`averageHeightByCountry.toc[5].label`**
- EN: Average Female Height by Country
- DE: Durchschnittliche Körpergröße von Frauen nach Land

**`averageHeightByCountry.toc[6].id`**
- EN: average-height-in-selected-countries
- DE: average-height-in-selected-countries

**`averageHeightByCountry.toc[6].label`**
- EN: Average Height in Selected Countries
- DE: Durchschnittsgröße in ausgewählten Ländern

**`averageHeightByCountry.toc[7].id`**
- EN: average-height-chart-for-men
- DE: average-height-chart-for-men

**`averageHeightByCountry.toc[7].label`**
- EN: Average Height Chart for Men
- DE: Größendiagramm für Männer

**`averageHeightByCountry.toc[8].id`**
- EN: global-average-height
- DE: global-average-height

**`averageHeightByCountry.toc[8].label`**
- EN: Global Average Height
- DE: Globale Durchschnittsgröße

**`averageHeightByCountry.toc[9].id`**
- EN: tallest-man-in-the-world
- DE: tallest-man-in-the-world

**`averageHeightByCountry.toc[9].label`**
- EN: Tallest Man in the World
- DE: Größter Mann der Welt

**`averageHeightByCountry.toc[10].id`**
- EN: shortest-man-in-the-world
- DE: shortest-man-in-the-world

**`averageHeightByCountry.toc[10].label`**
- EN: Shortest Man in the World
- DE: Kleinster Mann der Welt

**`averageHeightByCountry.toc[11].id`**
- EN: tallest-female-in-the-world
- DE: tallest-female-in-the-world

**`averageHeightByCountry.toc[11].label`**
- EN: Tallest Female in the World
- DE: Größte Frau der Welt

**`averageHeightByCountry.toc[12].id`**
- EN: shortest-female-in-the-world
- DE: shortest-female-in-the-world

**`averageHeightByCountry.toc[12].label`**
- EN: Shortest Female in the World
- DE: Kleinste Frau der Welt

**`averageHeightByCountry.toc[13].id`**
- EN: human-height-distribution
- DE: human-height-distribution

**`averageHeightByCountry.toc[13].label`**
- EN: Human Height Distribution
- DE: Verteilung der menschlichen Körpergröße

**`averageHeightByCountry.toc[14].id`**
- EN: why-average-height-differs-by-country
- DE: why-average-height-differs-by-country

**`averageHeightByCountry.toc[14].label`**
- EN: Why Average Height Differs by Country
- DE: Warum die Durchschnittsgröße nach Land variiert

**`averageHeightByCountry.toc[15].id`**
- EN: frequently-asked-questions
- DE: frequently-asked-questions

**`averageHeightByCountry.toc[15].label`**
- EN: Frequently Asked Questions
- DE: Häufig gestellte Fragen

**`averageHeightByCountry.toc[16].id`**
- EN: references
- DE: references

**`averageHeightByCountry.toc[16].label`**
- EN: References
- DE: Quellenangaben

**`averageHeightByCountry.faq[0].q`**
- EN: What is the average height of men in the world?
- DE: Wie groß sind Männer im weltweiten Durchschnitt?

**`averageHeightByCountry.faq[0].a`**
- EN: The global average height for adult men is approximately 171 cm (5'7"). This weighted figure draws from NCD Risk Factor Collaboration and WHO data. It is pulled lower by the large populations of South and Southeast Asia, where averages fall between 160 and 168 cm. Men in high-income European countries average significantly more, often 178 to 184 cm.
- DE: Die globale Durchschnittsgröße für erwachsene Männer beträgt etwa 171 cm (5'7"). Dieser gewichtete Wert stammt aus Daten der NCD Risk Factor Collaboration und der WHO. Er wird durch die großen Bevölkerungen Süd- und Südostasiens nach unten gezogen, wo die Durchschnittswerte zwischen 160 und 168 cm liegen. Männer in einkommensstarken europäischen Ländern sind im Durchschnitt deutlich größer, oft 178 bis 184 cm.

**`averageHeightByCountry.faq[1].q`**
- EN: What is an average height for a woman worldwide?
- DE: Wie groß ist eine Frau im weltweiten Durchschnitt?

**`averageHeightByCountry.faq[1].a`**
- EN: The global average height for adult women is approximately 159 cm (5'3"). Netherlands and Montenegrin women average around 170 cm. Women in Guatemala and the Philippines average closer to 149 to 150 cm. Most women in Western countries fall between 162 and 168 cm.
- DE: Die globale Durchschnittsgröße für erwachsene Frauen beträgt etwa 159 cm (5'3"). Niederländische und montenegrinische Frauen sind im Durchschnitt etwa 170 cm groß. Frauen in Guatemala und auf den Philippinen sind im Durchschnitt eher 149 bis 150 cm groß. Die meisten Frauen in westlichen Ländern liegen zwischen 162 und 168 cm.

**`averageHeightByCountry.faq[2].q`**
- EN: Which country has the tallest people?
- DE: Welches Land hat die größten Menschen?

**`averageHeightByCountry.faq[2].a`**
- EN: The Netherlands holds the top spot for both men and women in most recent datasets. Netherlands men average 183.8 cm (approximately 6'0") and Netherlands women average 170.4 cm (5'7"). Montenegro and Estonia follow closely. The Netherlands has held this position for several decades, attributed to dairy-rich diets, strong public health infrastructure, and genetic factors in the population.
- DE: Die Niederlande belegen in den meisten aktuellen Datensätzen sowohl bei Männern als auch bei Frauen den Spitzenplatz. Niederländische Männer sind im Durchschnitt 183,8 cm groß (etwa 6'0") und niederländische Frauen 170,4 cm (5'7"). Montenegro und Estland folgen dicht dahinter. Die Niederlande halten diese Position seit mehreren Jahrzehnten, was auf milchreiche Ernährung, ein starkes öffentliches Gesundheitssystem und genetische Faktoren in der Bevölkerung zurückgeführt wird.

**`averageHeightByCountry.faq[3].q`**
- EN: Has average human height been increasing over time?
- DE: Ist die durchschnittliche menschliche Körpergröße im Laufe der Zeit gestiegen?

**`averageHeightByCountry.faq[3].a`**
- EN: Yes, substantially. Average height has risen sharply over the past 150 years in almost every country, driven by improvements in nutrition, sanitation, vaccination, and healthcare. The most dramatic recent gains occurred in East Asia: South Korean men gained around 6 cm across two generations following rapid economic development. Gains in Western Europe have largely plateaued since the 1980s.
- DE: Ja, deutlich. Die Durchschnittsgröße ist in fast allen Ländern in den letzten 150 Jahren stark gestiegen, angetrieben durch Verbesserungen bei Ernährung, sanitären Einrichtungen, Impfungen und Gesundheitsversorgung. Die dramatischsten jüngsten Zuwächse fanden in Ostasien statt: Südkoreanische Männer gewannen über zwei Generationen nach der raschen wirtschaftlichen Entwicklung rund 6 cm hinzu. Die Zuwächse in Westeuropa stagnieren seit den 1980er-Jahren weitgehend.

**`averageHeightByCountry.faq[4].q`**
- EN: What is the shortest country in the world by average height?
- DE: Welches ist das kleinste Land der Welt nach Durchschnittsgröße?

**`averageHeightByCountry.faq[4].a`**
- EN: Timor-Leste records the lowest combined average globally, with men averaging 159.8 cm and women 152.3 cm. Guatemala and Laos follow closely. These low averages reflect historical nutritional constraints and limited healthcare access rather than genetic limits on growth potential.
- DE: Timor-Leste verzeichnet weltweit den niedrigsten kombinierten Durchschnitt, mit Männern im Durchschnitt von 159,8 cm und Frauen von 152,3 cm. Guatemala und Laos folgen dicht dahinter. Diese niedrigen Durchschnittswerte spiegeln historische Ernährungseinschränkungen und einen eingeschränkten Zugang zur Gesundheitsversorgung wider, nicht genetische Grenzen des Wachstumspotenzials.

**`averageHeightByCountry.references.primarySources.title`**
- EN: Primary Data Sources
- DE: Primäre Datenquellen

**`averageHeightByCountry.references.primarySources.ref1`**
- EN: NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016. Vol. 5, e13410.
- DE: NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016. Vol. 5, e13410.

**`averageHeightByCountry.references.primarySources.ref2`**
- EN: Rodriguez-Martinez A, Zhou B, Sophiea MK et al. (NCD-RisC). Height and body-mass index trajectories of school-aged children and adolescents from 1985 to 2019 in 200 countries and territories. The Lancet, 2020. Vol. 396, pp. 1511–1524.
- DE: Rodriguez-Martinez A, Zhou B, Sophiea MK et al. (NCD-RisC). Height and body-mass index trajectories of school-aged children and adolescents from 1985 to 2019 in 200 countries and territories. The Lancet, 2020. Vol. 396, pp. 1511–1524.

**`averageHeightByCountry.references.primarySources.ref3`**
- EN: World Health Organization. Child Growth Standards — Length/Height-for-Age, Weight-for-Age. WHO Department of Nutrition and Food Safety. Geneva, 2006.
- DE: World Health Organization. Child Growth Standards — Length/Height-for-Age, Weight-for-Age. WHO Department of Nutrition and Food Safety. Geneva, 2006.

**`averageHeightByCountry.references.primarySources.ref4`**
- EN: World Health Organization. Global Health Observatory — Nutrition and Body Mass Index Data. WHO Global Health Observatory. Ongoing.
- DE: World Health Organization. Global Health Observatory — Nutrition and Body Mass Index Data. WHO Global Health Observatory. Ongoing.

**`averageHeightByCountry.references.primarySources.ref5`**
- EN: de Onis M, Garza C, Onyango AW, Martorell R (eds). WHO Child Growth Standards. Acta Paediatrica, 2006. Suppl 450:1–101.
- DE: de Onis M, Garza C, Onyango AW, Martorell R (eds). WHO Child Growth Standards. Acta Paediatrica, 2006. Suppl 450:1–101.

**`averageHeightByCountry.references.usGovernment.title`**
- EN: US Government — CDC and NIH
- DE: US-Regierung — CDC und NIH

**`averageHeightByCountry.references.usGovernment.ref1`**
- EN: Centers for Disease Control and Prevention. CDC Clinical Growth Charts, 2000 (Revised 2022). National Center for Health Statistics.
- DE: Centers for Disease Control and Prevention. CDC Clinical Growth Charts, 2000 (Revised 2022). National Center for Health Statistics.

**`averageHeightByCountry.references.usGovernment.ref2`**
- EN: Kuczmarski RJ, Ogden CL, Guo SS et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital and Health Statistics. Series 11, No. 246, 2002.
- DE: Kuczmarski RJ, Ogden CL, Guo SS et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital and Health Statistics. Series 11, No. 246, 2002.

**`averageHeightByCountry.references.usGovernment.ref3`**
- EN: Centers for Disease Control and Prevention — NCHS. National Health and Nutrition Examination Survey (NHANES) — Anthropometric Data. Ongoing survey cycles.
- DE: Centers for Disease Control and Prevention — NCHS. National Health and Nutrition Examination Survey (NHANES) — Anthropometric Data. Ongoing survey cycles.

**`averageHeightByCountry.references.usGovernment.ref4`**
- EN: Fryar CD, Gu Q, Ogden CL, Flegal KM. Anthropometric Reference Data for Children and Adults: United States, 2011–2014. Vital and Health Statistics. Series 3, No. 39, August 2016.
- DE: Fryar CD, Gu Q, Ogden CL, Flegal KM. Anthropometric Reference Data for Children and Adults: United States, 2011–2014. Vital and Health Statistics. Series 3, No. 39, August 2016.

**`averageHeightByCountry.references.usGovernment.ref5`**
- EN: National Institutes of Health — National Heart, Lung, and Blood Institute. Classification of Overweight and Obesity by BMI. NIH Publication No. 98-4083, 1998.
- DE: National Institutes of Health — National Heart, Lung, and Blood Institute. Classification of Overweight and Obesity by BMI. NIH Publication No. 98-4083, 1998.

**`averageHeightByCountry.references.peerReviewed.title`**
- EN: Peer-Reviewed Research Papers
- DE: Begutachtete Forschungsarbeiten

**`averageHeightByCountry.references.peerReviewed.ref1`**
- EN: Devine BJ. Gentamicin therapy. Drug Intelligence and Clinical Pharmacy, 1974. Vol. 8, pp. 650–655. (Original publication of the Devine ideal body weight formula.)
- DE: Devine BJ. Gentamicin therapy. Drug Intelligence and Clinical Pharmacy, 1974. Vol. 8, pp. 650–655. (Original publication of the Devine ideal body weight formula.)

**`averageHeightByCountry.references.peerReviewed.ref2`**
- EN: Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. Determination of ideal body weight for drug dosage calculations. American Journal of Hospital Pharmacy, 1983. Vol. 40, pp. 1016–1019.
- DE: Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. Determination of ideal body weight for drug dosage calculations. American Journal of Hospital Pharmacy, 1983. Vol. 40, pp. 1016–1019.

**`averageHeightByCountry.references.peerReviewed.ref3`**
- EN: Pai MP, Paloucek FP. The origin of the "ideal" body weight equations. Annals of Pharmacotherapy, 2000. Vol. 34, No. 9, pp. 1066–1069.
- DE: Pai MP, Paloucek FP. The origin of the "ideal" body weight equations. Annals of Pharmacotherapy, 2000. Vol. 34, No. 9, pp. 1066–1069.

**`averageHeightByCountry.references.peerReviewed.ref4`**
- EN: Janmahasatian S, Duffull SB, Ash S, Ward LC, Byrne NM, Green B. Quantification of lean bodyweight. Clinical Pharmacokinetics, 2005. Vol. 44, No. 10, pp. 1051–1065.
- DE: Janmahasatian S, Duffull SB, Ash S, Ward LC, Byrne NM, Green B. Quantification of lean bodyweight. Clinical Pharmacokinetics, 2005. Vol. 44, No. 10, pp. 1051–1065.

**`averageHeightByCountry.references.peerReviewed.ref5`**
- EN: Stulp G, Buunk AP, Pollet TV. Human height is positively related to interpersonal dominance in dyadic interactions. PLOS ONE, 2013. Vol. 8, Issue 2.
- DE: Stulp G, Buunk AP, Pollet TV. Human height is positively related to interpersonal dominance in dyadic interactions. PLOS ONE, 2013. Vol. 8, Issue 2.

**`averageHeightByCountry.references.peerReviewed.ref6`**
- EN: Flegal KM, Ogden CL, Wei R, Kuczmarski RL, Johnson CL. Prevalence of obesity in US adults by age and sex. JAMA, 2002. Vol. 288, pp. 1723–1727.
- DE: Flegal KM, Ogden CL, Wei R, Kuczmarski RL, Johnson CL. Prevalence of obesity in US adults by age and sex. JAMA, 2002. Vol. 288, pp. 1723–1727.

**`averageHeightByCountry.references.unBodies.title`**
- EN: United Nations and International Bodies
- DE: Vereinte Nationen und internationale Organisationen

**`averageHeightByCountry.references.unBodies.ref1`**
- EN: UNICEF / WHO / World Bank. Joint Child Malnutrition Estimates — Levels and Trends. Edition 2023.
- DE: UNICEF / WHO / World Bank. Joint Child Malnutrition Estimates — Levels and Trends. Edition 2023.

**`averageHeightByCountry.references.unBodies.ref2`**
- EN: Food and Agriculture Organization of the United Nations. The State of Food Security and Nutrition in the World 2023. FAO, IFAD, UNICEF, WFP, WHO. Rome, 2023.
- DE: Food and Agriculture Organization of the United Nations. The State of Food Security and Nutrition in the World 2023. FAO, IFAD, UNICEF, WFP, WHO. Rome, 2023.

## 5. Bugs/gaps found (during this session and inherited from the paused extraction)

All of the following were already documented in `RESUME-CONTEXT.md` from the
prior extraction pass (Stage 1-3 groundwork) and are restated here for the
record, matching `docs/i18n-migration-status.md`'s documented bug classes:

- **Fragment-concatenation fixed during extraction**: the `Bars` label
  ternaries in `page.tsx` (~lines 365, 393) that built strings via template
  concatenation were consolidated into 4 explicit full-sentence keys
  (`tallestCountries.barsLabelMen/Women`, `shortestCountries.barsLabelMen/Women`).
- **Module-level constant arrays scanned and included**: `REGIONS` (9 entries,
  `name`+`ex`) and `BELL_CONFIG` (`label`, `pctLabel`, `bands[].label`) both feed
  rendered JSX directly and are included under `globalAverage.regionMap.regions.*`
  and `distribution.bellCurve.*`.
- **Inline SVG template text** in the `BellCurve` component extracted as ICU-
  placeholder keys (`distribution.bellCurve.globalAvgLabel`/`axisLabel`) rather
  than left as template-string concatenation.
- **Three "highlighted word + sentence" span fragments** (Nutrition, Healthcare
  access, Economic development) consolidated into single `t.rich`-ready keys
  with a `<bold>` tag.
- **Two link-fragment paragraphs** consolidated into single `t.rich`-ready
  strings with `<ncdRisc>`/`<wpr>`/`<who>` tags instead of separate before/link/
  after keys.
- **Whitespace-only source typo normalizations** (flagged, not silently
  "fixed" as content changes): double space in "Dutch  men" → single space;
  space-before-colon in "175.5 cm : a gap" → "175.5 cm:"; space-before-comma in
  "height level , it is" → "height level, it is"; "Sources : NCD -RisC " →
  "Sources: NCD-RisC". All whitespace-only, zero content/wording change,
  rendered output unaffected since HTML collapses whitespace identically either
  way — but flagged explicitly per the migration skill's "verbatim, no
  rewording" guarantee.
- **References section restructured** into 4 nested sub-groups
  (`primarySources`, `usGovernment`, `peerReviewed`, `unBodies`), each with its
  own `title`+`ref1..refN`, matching this page's actual 4-subheading structure
  (unlike prior pages' single flat reference list) — citation text itself
  (author/title/journal/year) kept verbatim in English per the established
  precedent from `heightPredictor.references` etc.; only sub-group `title`
  headings were translated.
- **Shared UI labels factored out** into `averageHeightByCountry.common.*`
  (`tabMen`/`tabWomen`/`tabMale`/`tabFemale`) instead of duplicating "Men"/
  "Women"/"Male"/"Female" across every tab group, matching the
  height-difference-calculator page's precedent.
- **`toc[].id` fields kept untranslated** (technical DOM-anchor slugs, not
  user-facing text) while `toc[].label` fields were translated — matches the
  page's own `id`/`label` separation already present in `AVERAGE_HEIGHT_TOC`.

### New finding this session: concurrent file modification during Stage 1/2

While this session was writing `entities.json` (Stage 1) and
`seo-adaptation.md` (Stage 2), both files were reported by the tooling as
"changed on disk since you last read it" mid-task, with content that
substantively matched this session's intended edits but was not byte-identical
(entities.json ended up correctly re-alphabetized; `seo-adaptation.md` ended
up with different but equivalent title/description phrasing than this
session's first draft — "Durchschnittsgröße nach Land – Weltweiter
Körpergrößen-Vergleich" instead of this session's original "... - Globale
Körpergrößen-Tabelle"). This session treated the on-disk state as
authoritative per instruction, re-read it, and aligned the final German
translation candidate's `metadata.averageHeightByCountryTitle`/`Description`
keys to match the on-disk `seo-adaptation.md`'s title/description exactly
(visible in section 4 above). **Flagging this for human attention**: it's
unclear whether this was an automated JSON-sorting hook + a legitimately
different draft, or a second process/session working the same task
concurrently — worth checking session history if this recurs, since a true
concurrent-write race on `messages/de.json` later (which is NOT touched by
this task) could cause a lost update.

## 6. Explicit confirmations

- **No `.tsx` file was touched.** This session only wrote to files under
  `docs/semantic-seo-localization/de/average-height-by-country/` and to
  `docs/semantic-seo-localization/de/entities.json`.
- **`messages/de.json` was NOT written.** It remains exactly as it was at the
  start of this session; the German translation candidate produced here lives
  entirely in `de-candidate.json` (working file) and this report, pending
  human approval.
- **Nothing was committed.** No `git add`/`git commit` was run this session.
- **`npm run build` was NOT run.**

## 7. Files produced/updated this session

- `docs/semantic-seo-localization/de/entities.json` (updated: 1 conflict
  resolved, 10 new entities added, 43 total)
- `docs/semantic-seo-localization/de/average-height-by-country/seo-adaptation.md`
  (Stage 2 — note: final on-disk version differs from this session's first
  draft, see section 5's concurrent-modification note; both versions reach the
  same substantive conclusions)
- `docs/semantic-seo-localization/de/average-height-by-country/triples-source.md`
  (229 entries, continuous numbering)
- `docs/semantic-seo-localization/de/average-height-by-country/triples-target.md`
  (229 entries, continuous numbering, 1:1 with triples-source.md)
- `docs/semantic-seo-localization/de/average-height-by-country/validation-report.md`
  (Stage 5 completeness + numeric-fidelity + terminology-consistency report)
- `docs/semantic-seo-localization/de/average-height-by-country/de-candidate.json`
  (working file: the full merged German translation candidate as valid JSON,
  mirroring `en.json`'s `averageHeightByCountry` + 2 `metadata.*` keys —
  retained here as the mechanical source of truth for a future `messages/de.json`
  merge; not itself consumed by the app)
- `docs/semantic-seo-localization/de/average-height-by-country/PENDING-REVIEW.md`
  (this file — the human-facing deliverable)

## 8. Suggested next step

Once a human reviews and approves the translation candidate in section 4:
1. Merge the `averageHeightByCountry` object and the 2 `metadata.*` keys from
   `de-candidate.json` into `messages/de.json` (Step 3 of
   `nextjs-i18n-migration`, currently out of scope).
2. Wire the page's `.tsx`/`.ts` files to consume the new namespace (Step 4,
   also out of scope for this task).
3. Update `docs/i18n-migration-status.md` to record this page as the 5th
   completed migration.
