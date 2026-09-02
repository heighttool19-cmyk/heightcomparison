## Triples — Target (de) — privacy

**Predicate normalization notes:** same normalization as `triples-source.md` — "wird … gespeichert" / "vorübergehend gespeichert" both normalized to `stored on servers`; "werden … nicht verkauft oder weitergegeben" normalized to `sells/shares (negated)`.

### Batch 1 (titlePrefix … shareableLinksText)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | HeightComparison | is a | kostenloses Tool zum Größenvergleich (free height-comparison tool) | 85 | Matches source #1; entity kept untranslated, description translated. |
| 2 | HeightComparison | available at | heightcomparisoncalculator.com | 75 | Matches source #2; domain kept verbatim. |
| 3 | Diese Datenschutzerklärung (this Privacy Policy) | explains | welche Daten erhoben werden, wie sie verwendet werden, welche Wahlmöglichkeiten bestehen | 70 | Matches source #3; "Privacy Policy" localized to the target-market term "Datenschutzerklärung" per seo-adaptation.md. |
| 4 | HeightComparison | sells/shares (negated) | personenbezogene Daten an Dritte zu kommerziellen Zwecken | 90 | Matches source #4; "personal data" localized to the GDPR-standard term "personenbezogene Daten". |
| 5 | das Tool | temporarily stores | einige Daten vorübergehend auf unseren Servern, bei Nutzung bestimmter Funktionen | 65 | Matches source #5. |
| 6 | Image to Height-Funktion | sends | das hochgeladene Foto an unsere Server, zur Verarbeitung der Größenschätzung | 82 | Matches source #6; entity "Image to Height" kept untranslated per registry. |
| 7 | hochgeladenes Bild | retained for | bis zu 7 Tage, dann automatisch gelöscht | 85 | Matches source #7. |
| 8 | hochgeladenes Bild | is not | dauerhaft gespeichert | 60 | Matches source #8. |
| 9 | Erstellung eines teilbaren Links | stores | Diagrammkonfiguration (Größen, Namen, Objekte) auf unseren Servern | 80 | Matches source #9. |
| 10 | teilbare Diagrammdaten | retained for | bis zu 7 Tage, dann automatisch gelöscht | 85 | Matches source #10. |
| 11 | Erstellung eines teilbaren Links | requires | kein Konto | 55 | Matches source #11. |
| 12 | gespeicherte teilbare Diagrammdaten | is not tied to | personenbezogene Daten, die eine Identifizierung ermöglichen | 78 | Matches source #12; "personally identifiable information" rendered with the same "personenbezogene Daten" established in #4. |

### Batch 2 (infoCollectedAutoTitle … whatWeDoNotCollectList[3])
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 13 | Google Analytics | used to | verstehen, wie Besucher die Website nutzen | 70 | Matches source #13. |
| 14 | Google Analytics | collects | Standard-Nutzungsdaten (besuchte Seiten, Verweildauer, Region, Browsertyp, Gerätetyp) | 85 | Matches source #14; all five data points preserved. |
| 15 | Google Analytics | uses | eigene Cookies | 65 | Matches source #15. |
| 16 | HeightComparison | does not set | First-Party-Cookies | 80 | Matches source #16; entity untranslated, "first-party cookies" kept as the recognized borrowed term. |
| 17 | Google Privacy Policy und Google Analytics Terms of Service | describe | wie Google mit diesen Daten umgeht | 55 | Matches source #17; both document-name entities kept untranslated per registry. |
| 18 | Server-Protokolle | may record | IP-Adressen, verweisende URLs und Zeitstempel | 78 | Matches source #18. |
| 19 | Server-Protokolldaten | used for | ausschließlich Sicherheits- und Betriebszwecke | 75 | Matches source #19. |
| 20 | diese Website | does not collect | Name, E-Mail-Adresse oder sonstige Kontoinformationen | 90 | Matches source #20. |
| 21 | diese Website | has | keine Konten | 65 | Matches source #21. |
| 22 | diese Website | does not collect | Zahlungsinformationen | 82 | Matches source #22. |
| 23 | das Tool | is | kostenlos | 60 | Matches source #23. |
| 24 | diese Website | does not track | Größenangaben, die in das Vergleichstool eingegeben werden | 88 | Matches source #24. |
| 25 | Eingabedaten (Vergleichstool) | is processed in | Ihrem Browser, nicht an unsere Server gesendet oder dort gespeichert (außer in den beschriebenen Fällen) | 85 | Matches source #25; reuses established phrase "auf unseren Servern gespeichert" from batch 1 in negated form. |
| 26 | diese Website | is not affiliated with | irgendeinem Werbenetzwerk | 80 | Matches source #26. |
| 27 | diese Website | does not share | Daten mit Werbenetzwerken | 80 | Matches source #27. |
| 28 | diese Website | does not conduct | verhaltensbasiertes Targeting | 78 | Matches source #28. |

### Batch 3 (howWeUseTitle … dataRetentionText)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 29 | die oben beschriebenen Daten | used for | ausschließlich die folgenden Zwecke | 80 | Matches source #29. |
| 30 | HeightComparison | processes and returns | bildbasierte Größenschätzungen an den Nutzer | 75 | Matches source #30. |
| 31 | HeightComparison | generates and resolves | teilbare Diagrammlinks | 70 | Matches source #31. |
| 32 | HeightComparison | uses Google Analytics to understand | allgemeine Nutzungsmuster, um das Tool zu verbessern | 72 | Matches source #32. |
| 33 | HeightComparison | maintains and diagnoses | Serversicherheit und technische Probleme | 70 | Matches source #33. |
| 34 | HeightComparison | does not use collected data to | Nutzerprofile erstellen | 88 | Matches source #34; reuses established "erhobene Daten" (erheben) from batch 2. |
| 35 | HeightComparison | does not use collected data to | personalisierte Werbung ausspielen | 88 | Matches source #35; "targeted ads" rendered as "personalisierte Werbung", the natural German ad-tech term. |
| 36 | HeightComparison | does not share | Daten mit Dritten über Google Analytics hinaus | 82 | Matches source #36. |
| 37 | hochgeladene Bilder und Daten zu teilbaren Diagrammlinks | deleted from servers within | 7 Tagen nach ihrer Erstellung | 90 | Matches source #37; numeric detail (7 days) preserved exactly; reuses established "unseren Servern". |
| 38 | Server-Protokolldaten | retained for | übliche Betriebszeiträume, im Einklang mit Sicherheits- und Debugging-Anforderungen | 65 | Matches source #38. |

### Batch 4 (yourRightsTitle … browserControlsText)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 39 | Nutzer | can request | Löschung von Daten zu teilbaren Links/hochgeladenen Bildern vor der automatischen Löschung nach 7 Tagen | 80 | Matches source #39; numeric detail (7 days) preserved. |
| 40 | HeightComparison | will delete | angeforderte Daten umgehend | 72 | Matches source #40. |
| 41 | Nutzer | can opt out of | Datenerhebung durch Google Analytics, über das Google Analytics Opt-out Browser Add-on | 78 | Matches source #41; entity kept untranslated per registry; reuses established "erheben" as "Datenerhebung". |
| 42 | HeightComparison | does not set | First-Party-Cookies | 75 | Matches source #42; identical phrasing to batch 2's #16, confirming cross-batch consistency. |
| 43 | Cookies, die im Browser des Nutzers von dieser Website vorhanden sind | originate from | Google Analytics | 72 | Matches source #43. |

### Batch 5 (childrensPrivacyTitle … trustFooter)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 44 | HeightComparison | is not directed at | Kinder unter 13 Jahren | 82 | Matches source #44. |
| 45 | HeightComparison | does not knowingly collect | personenbezogene Daten von Kindern | 88 | Matches source #45; reuses established "personenbezogene Daten" (batch 1) and "erheben" (batches 1-4) as "erhebt wissentlich keine". |
| 46 | HeightComparison | will remove | die personenbezogenen Daten eines Kindes nach Meldung | 78 | Matches source #46. |
| 47 | die Website | may contain | Links zu externen Websites | 55 | Matches source #47. |
| 48 | diese Datenschutzerklärung | applies only to | HeightComparison | 72 | Matches source #48; "Privacy Policy" rendered with the established "Datenschutzerklärung" from batch 1's title/intro. |
| 49 | HeightComparison | is not responsible for | die Datenschutzpraktiken von Websites Dritter | 75 | Matches source #49. |
| 50 | HeightComparison | will update | das Datum „Zuletzt aktualisiert“, bei wesentlichen Änderungen dieser Richtlinie | 65 | Matches source #50. |
| 51 | fortgesetzte Nutzung der Website nach Änderungen | constitutes | Zustimmung zur aktualisierten Richtlinie | 72 | Matches source #51. |
| 52 | Nutzer | can contact | HeightComparison bei Fragen zur Datenschutzerklärung oder zur Löschung ihrer Daten | 62 | Matches source #52; "request data deletion" rendered with the exact phrase "Löschung Ihrer Daten beantragen" established in batch 4's `requestDeletionLabel`, confirming cross-batch consistency. |
