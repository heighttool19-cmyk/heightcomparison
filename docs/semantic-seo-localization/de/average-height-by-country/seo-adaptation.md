# Target-Market SEO Adaptation — average-height-by-country (de)

## Source content summary
Primary topic: average human height by country, worldwide comparison of
male/female averages, tallest/shortest nations, global average, human
height distribution (bell curve), extremes (tallest/shortest documented
people ever), and reasons average height differs by country.

Secondary topics: specific country statistics (Netherlands, Denmark,
Germany, Japan, South Korea, India, Bangladesh, USA, UK, Iran, Canada,
Ireland, Sri Lanka), regional breakdowns (Northern Europe, Eastern Europe,
East Asia, South/SE Asia, etc.), nutrition/healthcare/economic determinants
of height, Guinness World Records extremes (Robert Wadlow, Sultan Kösen,
Zeng Jinlian, Rumeysa Gelgi, Jyoti Amge, Chandra Bahadur Dangi).

Concrete SEO-relevant terms the English version targets: "average height by
country", "average height chart", "tallest country", "shortest country",
"average male height", "average female height", "global average height",
"human height distribution", "tallest man/woman in the world".

## Localized Metadata

- **Title:** Durchschnittsgröße nach Land – Weltweiter Körpergrößen-Vergleich
- **Description:** Erfahren Sie die durchschnittliche Körpergröße von Mann und Frau weltweit und vergleichen Sie die Durchschnittsgröße nach Land. Die durchschnittliche menschliche Körpergröße weltweit auf einen Blick.
- **Slug:** durchschnittsgroesse-nach-land
  (URL-safe: umlaut ö normalized to "oe", no diacritics/spaces, matches the
  German web convention for ASCII-safe slugs; note the *page route itself*
  is out of scope for this pass — the slug is provided here for future
  routing/canonical-URL use per the nextjs-i18n-migration pattern of
  `/de/<route>`, which per that skill's convention keeps the *English*
  route segment `average-height-by-country` under `/de/` rather than a
  translated slug — this proposed German slug is for reference/future SEO
  use only, e.g. in `<link rel="alternate">` discussions, not for the
  Step 4 TSX routing which is out of scope for this task).

## Target Keywords

| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
| Durchschnittsgröße nach Land | Direct match to the registered, nav/footer-shipped entity term "Durchschnittsgröße nach Land" — must be the primary keyword for consistency with the rest of the site. |
| durchschnittliche Körpergröße | German searchers use "Körpergröße" (body height) rather than a literal "durchschnittliche Höhe" — "Höhe" alone reads ambiguous in German (can mean altitude/height of an object), so "Körpergröße" is the natural term for human height. |
| Körpergröße weltweit | "worldwide" search intent phrased as "weltweit" placed after the noun, standard German SEO phrasing order. |
| größtes Land nach Körpergröße / kleinstes Land nach Körpergröße | "tallest/shortest country" — literal translation of "tallest country" as "größtes Land" would be ambiguous with physical land area; qualifying with "nach Körpergröße" disambiguates for both users and search engines. |
| Körpergröße Männer / Körpergröße Frauen | "average male/female height" — German search behavior favors the short noun-phrase form over a literal "durchschnittliche Körpergröße von Männern". |
| größter Mensch der Welt / kleinster Mensch der Welt | "tallest/shortest man/woman in the world" — commonly searched informal German phrasing (gender-neutral "Mensch") rather than a literal "größter Mann der Welt" split by gender, though the page content itself still splits by gender in the body copy — this keyword note is for meta-description framing only, not a change to body content. |
| Körpergrößenverteilung | "height distribution" — standard German compound noun, more natural and more commonly searched than "Verteilung der Körpergröße". |

## Notes
- Per the confirmed nav/footer precedent, "Average Height by Country" as a
  page identity/product name translates to "Durchschnittsgröße nach Land" —
  this is now reflected in the `metadata.averageHeightByCountryTitle`
  candidate below and in `entities.json`.
- Country names throughout the body copy use standard German exonyms
  (Netherlands → Niederlande, Germany → Deutschland, Denmark → Dänemark,
  South Korea → Südkorea, etc.) — not SEO keyword targets themselves, just
  normal prose translation.
- "cm" stays "cm" (unit abbreviation, unchanged in German).
