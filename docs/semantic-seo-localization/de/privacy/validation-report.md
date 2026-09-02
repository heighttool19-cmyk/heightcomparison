## Semantic Validation Report — privacy (de)

### Batch 1 (titlePrefix … shareableLinksText)

**Alignment score:** 100%
**Verdict:** PASS

#### Preserved (12)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1 | HeightComparison — is a — free height comparison tool | 1 | Entity kept untranslated; description translated naturally. |
| 2 | HeightComparison — available at — heightcomparisoncalculator.com | 2 | Domain kept verbatim (registry entity). |
| 3 | This Privacy Policy — explains — what info collected/used/choices | 3 | "Privacy Policy" localized to "Datenschutzerklärung" per SEO adaptation; meaning intact. |
| 4 | HeightComparison — sells/shares (negated) — personal data w/ third parties, commercial | 4 | "personal data" → "personenbezogene Daten"; negation and commercial-purpose qualifier both preserved. |
| 5 | the tool — temporarily stores — data on servers, certain features | 5 | Preserved. |
| 6 | Image to Height feature — sends — uploaded photo to servers, height estimation | 6 | Preserved; entity untranslated. |
| 7 | uploaded image — retained for — up to 7 days, then deleted automatically | 7 | Numeric detail (7 days) preserved exactly. |
| 8 | uploaded image — is not — permanently stored | 8 | Preserved. |
| 9 | shareable link generation — stores — chart configuration on servers | 9 | Preserved. |
| 10 | shareable chart data — retained for — up to 7 days, then deleted automatically | 10 | Numeric detail preserved exactly. |
| 11 | shareable link generation — requires — no account | 11 | Preserved. |
| 12 | stored shareable chart data — is not tied to — PII | 12 | Preserved; "personenbezogene Daten" reused consistently with #4. |

#### Weakened (0)
None.

#### Missing (0)
None.

#### Contradicted (0)
None.

#### Introduced / Possible Hallucination (0)
None.

**Established phrasing carried forward to later batches:** "Daten erheben" (collect data, GDPR-standard verb), "auf unseren Servern gespeichert" (stored on our servers), "bis zu 7 Tage aufbewahrt und anschließend automatisch gelöscht" (retained for up to 7 days, then deleted automatically), "personenbezogene Daten" (personal data / PII).

### Batch 2 (infoCollectedAutoTitle … whatWeDoNotCollectList[3])

**Alignment score:** 100%
**Verdict:** PASS

#### Preserved (16)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 13 | Google Analytics — used to — understand visitor usage | 13 | Preserved. |
| 14 | Google Analytics — collects — 5 usage data points | 14 | All five data points preserved individually. |
| 15 | Google Analytics — uses — cookies on its own end | 15 | Preserved. |
| 16 | HeightComparison — does not set — first-party cookies | 16 | Preserved; entity untranslated. |
| 17 | Google Privacy Policy & GA ToS — describe — how Google handles data | 17 | Both document-name entities kept untranslated per registry (reused from entity extraction). |
| 18 | server logs — may record — IP/URLs/timestamps | 18 | Preserved. |
| 19 | server log data — used for — security/operational only | 19 | Preserved. |
| 20 | site — does not collect — name/email/account info | 20 | Preserved. |
| 21 | site — has — no accounts | 21 | Preserved. |
| 22 | site — does not collect — payment info | 22 | Preserved. |
| 23 | the tool — is — free | 23 | Preserved. |
| 24 | site — does not track — entered heights | 24 | Preserved — highest-prominence claim in this batch, verified intact. |
| 25 | input data — processed in — browser, not sent/stored on servers | 25 | Preserved; reuses batch 1's established "auf unseren Servern gespeichert" phrasing in negated form, confirming cross-batch consistency. |
| 26 | site — not affiliated with — ad network | 26 | Preserved. |
| 27 | site — does not share — data with ad networks | 27 | Preserved. |
| 28 | site — does not conduct — behavioral advertising | 28 | Preserved. |

#### Weakened (0)
None.

#### Missing (0)
None.

#### Contradicted (0)
None.

#### Introduced / Possible Hallucination (0)
None.

**Established phrasing reused this batch:** "Daten erheben" / "erheben" (collect) — first established in batch 1's intro ("welche Daten … erhebt"), reused consistently in `infoCollectedAutoTitle` ("Automatisch erhobene Daten"), `googleAnalyticsText` ("Dieser Dienst erhebt …"), and `whatWeDoNotCollectTitle`/`list[0]`/`list[1]` ("Was wir nicht erheben" / "Wir erheben weder …" / "Wir erheben keine …"). See verification point C in the final report for cited occurrences.

### Batch 3 (howWeUseTitle … dataRetentionText)

**Alignment score:** 100%
**Verdict:** PASS

#### Preserved (10)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 29 | data described above — used for — following purposes only | 29 | Preserved. |
| 30 | HeightComparison — processes/returns — image-based height estimates | 30 | Preserved. |
| 31 | HeightComparison — generates/resolves — shareable chart links | 31 | Preserved. |
| 32 | HeightComparison — uses GA to understand — usage patterns, improve tool | 32 | Preserved. |
| 33 | HeightComparison — maintains/diagnoses — server security/technical issues | 33 | Preserved. |
| 34 | HeightComparison — does not use data to — build user profiles | 34 | Preserved; "erhobene Daten" reused from batch 2's established phrasing. |
| 35 | HeightComparison — does not use data to — serve targeted ads | 35 | Preserved; "targeted ads" → "personalisierte Werbung" is the natural target-market term, not a semantic loss. |
| 36 | HeightComparison — does not share — data w/ 3rd parties beyond GA | 36 | Preserved; the GA exception scope is retained. |
| 37 | uploaded images & shareable link data — deleted from servers within — 7 days | 37 | Numeric detail (7 days) preserved exactly. |
| 38 | server log data — retained for — standard operational periods | 38 | Preserved. |

#### Weakened (0)
None.

#### Missing (0)
None.

#### Contradicted (0)
None.

#### Introduced / Possible Hallucination (0)
None.

**Established phrasing reused this batch:** "erhobene Daten" (collected data, from "erheben") reused in `howWeUseFooter`; "unseren Servern" reused in `dataRetentionText`; "aufbewahrt" (retained) reused as the root of "Datenaufbewahrung" (`dataRetentionTitle`), consistent with "aufbewahrt und anschließend automatisch gelöscht" established in batch 1.

### Batch 4 (yourRightsTitle … browserControlsText)

**Alignment score:** 100%
**Verdict:** PASS

#### Preserved (5)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 39 | users — can request — deletion before automatic 7-day deletion | 39 | Numeric detail (7 days) preserved exactly. |
| 40 | HeightComparison — will delete — requested data promptly | 40 | Preserved. |
| 41 | users — can opt out of — GA data collection via Opt-out Add-on | 41 | Preserved; entity untranslated per registry; "erheben" root reused as "Datenerhebung". |
| 42 | HeightComparison — does not set — first-party cookies | 42 | Preserved; phrasing identical to batch 2's #16 target triple, confirming consistency. |
| 43 | browser cookies from this site — originate from — Google Analytics | 43 | Preserved. |

#### Weakened (0)
None.

#### Missing (0)
None.

#### Contradicted (0)
None.

#### Introduced / Possible Hallucination (0)
None.

**Established phrasing reused this batch:** "erheben" reused a third time (as "Datenerhebung" in `optOutGaText`), continuing the phrase first established in batch 1's intro and reused in batch 2 and batch 3. "First-Party-Cookies" reused verbatim from batch 2's `googleAnalyticsText`.

### Batch 5 (childrensPrivacyTitle … trustFooter)

**Alignment score:** 100%
**Verdict:** PASS

#### Preserved (9)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 44 | HeightComparison — is not directed at — children under 13 | 44 | Preserved. |
| 45 | HeightComparison — does not knowingly collect — personal info from children | 45 | Preserved; reuses "personenbezogene Daten" (batch 1) and "erheben" (batches 1-4). |
| 46 | HeightComparison — will remove — child's personal info upon report | 46 | Preserved. |
| 47 | site — may contain — links to external websites | 47 | Preserved. |
| 48 | this Privacy Policy — applies only to — HeightComparison | 48 | Preserved; "Privacy Policy" rendered with established "Datenschutzerklärung". |
| 49 | HeightComparison — is not responsible for — third-party privacy practices | 49 | Preserved. |
| 50 | HeightComparison — will update — "Last updated" date on material changes | 50 | Preserved. |
| 51 | continued use after changes — constitutes — acceptance of updated policy | 51 | Preserved. |
| 52 | users — can contact — HeightComparison for policy questions/deletion requests | 52 | Preserved; "request data deletion" reuses the exact phrase "Löschung Ihrer Daten beantragen" established in batch 4. |

#### Weakened (0)
None.

#### Missing (0)
None.

#### Contradicted (0)
None.

#### Introduced / Possible Hallucination (0)
None.

**Established phrasing reused this batch:** "personenbezogene Daten" (4th+ occurrence, first established batch 1), "erheben" (5th+ occurrence, first established batch 1), "Datenschutzerklärung" (2nd occurrence, first established batch 1's title/intro), "Löschung Ihrer Daten beantragen" (verbatim reuse of batch 4's `requestDeletionLabel` phrasing in `contactIntro`).

---

## Page-Level Summary — privacy (de)

| Batch | Key range | Triple # range | Alignment | Verdict |
|---|---|---|---:|---|
| 1 | titlePrefix … shareableLinksText (11 keys) | 1–12 | 100% | PASS |
| 2 | infoCollectedAutoTitle … whatWeDoNotCollectList[3] (12 keys) | 13–28 | 100% | PASS |
| 3 | howWeUseTitle … dataRetentionText (9 keys) | 29–38 | 100% | PASS |
| 4 | yourRightsTitle … browserControlsText (8 keys) | 39–43 | 100% | PASS |
| 5 | childrensPrivacyTitle … trustFooter (11 keys) | 44–52 | 100% | PASS |

**All 5 batches PASS.** No Missing, Weakened (high-prominence or otherwise), Contradicted, or Introduced triples found across the whole page. Proceeding to Stage 5 (Completeness Gate).
