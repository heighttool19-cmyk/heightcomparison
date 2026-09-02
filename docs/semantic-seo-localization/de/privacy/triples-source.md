## Triples — Source (en) — privacy (de run)

**Predicate normalization notes:** "is retained for" / "is stored" / "temporarily stored" all normalized to `retained for` / `stored on servers` where they express the same server-storage relation. "does not sell" / "does not share" normalized to a single combined predicate `sells/shares (negated)` when the source states both about the same object in one sentence.

### Batch 1 (titlePrefix … shareableLinksText)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | HeightComparison | is a | free height comparison tool | 85 | Core entity classification restated in the intro. |
| 2 | HeightComparison | available at | heightcomparisoncalculator.com | 75 | Ties brand to its domain. |
| 3 | This Privacy Policy | explains | what information is collected, how it is used, and what choices exist | 70 | States the page's own purpose. |
| 4 | HeightComparison | sells/shares (negated) | personal data with third parties for commercial purposes | 90 | Central trust/compliance claim of the whole page. |
| 5 | the tool | temporarily stores | some data on our servers, when certain features are used | 65 | Frames the "Information You Provide" subsection. |
| 6 | Image to Height feature | sends | the uploaded photo to our servers, to process height estimation | 82 | Explains what happens to uploaded images and why. |
| 7 | uploaded image | retained for | up to 7 days, then deleted automatically | 85 | Concrete, numeric retention commitment. |
| 8 | uploaded image | is not | permanently stored | 60 | Reinforces the retention commitment. |
| 9 | shareable link generation | stores | chart configuration (heights, names, subjects) on our servers | 80 | Explains what shareable-link data consists of. |
| 10 | shareable chart data | retained for | up to 7 days, then deleted automatically | 85 | Concrete, numeric retention commitment, mirrors #7. |
| 11 | shareable link generation | requires | no account | 55 | Notable no-signup claim. |
| 12 | stored shareable chart data | is not tied to | personally identifiable information | 78 | Key privacy assurance for the shareable-link feature. |

### Batch 2 (infoCollectedAutoTitle … whatWeDoNotCollectList[3])
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 13 | Google Analytics | used to | understand how visitors use the site | 70 | States the purpose of the analytics integration. |
| 14 | Google Analytics | collects | standard usage data (pages visited, time on site, region, browser type, device type) | 85 | Enumerates the concrete data points GA collects. |
| 15 | Google Analytics | uses | cookies on its own end | 65 | Clarifies cookie source. |
| 16 | HeightComparison | does not set | first-party cookies | 80 | Central technical privacy claim. |
| 17 | Google Privacy Policy and Google Analytics Terms of Service | describe | how Google handles this data | 55 | Points to external reference docs. |
| 18 | server logs | may record | IP addresses, referring URLs, and timestamps | 78 | Concrete list of log data fields. |
| 19 | server log data | used for | security and operational purposes only | 75 | Scopes the purpose of log retention. |
| 20 | this site | does not collect | name, email address, or account information | 90 | Central "what we don't collect" claim. |
| 21 | this site | has | no accounts | 65 | Reinforces #20. |
| 22 | this site | does not collect | payment information | 82 | Central "what we don't collect" claim. |
| 23 | the tool | is | free | 60 | Explains why no payment info is collected. |
| 24 | this site | does not track | heights entered into the comparison tool | 88 | Core privacy claim about the tool's primary function. |
| 25 | input data (comparison tool) | is processed in | the user's browser, not sent to or stored on servers (except described cases) | 85 | Explains the mechanism behind #24. |
| 26 | this site | is not affiliated with | any advertising network | 80 | Central "what we don't collect" claim. |
| 27 | this site | does not share | data with ad networks | 80 | Reinforces #26. |
| 28 | this site | does not conduct | behavioral advertising | 78 | Reinforces #26/#27. |

### Batch 3 (howWeUseTitle … dataRetentionText)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 29 | the data described above | used for | the following purposes only | 80 | Scopes all downstream use-of-data claims. |
| 30 | HeightComparison | processes and returns | image-based height estimates to the user | 75 | First of the four listed purposes. |
| 31 | HeightComparison | generates and resolves | shareable chart links | 70 | Second listed purpose. |
| 32 | HeightComparison | uses Google Analytics to understand | general usage patterns, to improve the tool | 72 | Third listed purpose. |
| 33 | HeightComparison | maintains and diagnoses | server security and technical issues | 70 | Fourth listed purpose. |
| 34 | HeightComparison | does not use collected data to | build user profiles | 88 | Central trust claim. |
| 35 | HeightComparison | does not use collected data to | serve targeted ads | 88 | Central trust claim. |
| 36 | HeightComparison | does not share | data with third parties beyond Google Analytics | 82 | Central trust claim, scopes the one stated exception. |
| 37 | uploaded images and shareable chart link data | deleted from servers within | 7 days of creation | 90 | Concrete numeric retention commitment restated with full scope. |
| 38 | server log data | retained for | standard operational periods, consistent with security/debugging needs | 65 | Retention scope for the one data type without a fixed day count. |

### Batch 4 (yourRightsTitle … browserControlsText)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 39 | users | can request | deletion of shareable-link/uploaded-image data before the automatic 7-day deletion | 80 | Central user-rights claim. |
| 40 | HeightComparison | will delete | requested data promptly | 72 | Commitment tied to #39. |
| 41 | users | can opt out of | Google Analytics data collection, via the Google Analytics Opt-out Browser Add-on | 78 | Names the specific mechanism (registered Product entity). |
| 42 | HeightComparison | does not set | first-party cookies | 75 | Restates #16 in the browser-controls context; kept as a distinct triple since it appears at a distinct source location and grounds #43. |
| 43 | cookies present in the user's browser, from this site | originate from | Google Analytics | 72 | Explains the one exception to #42. |

### Batch 5 (childrensPrivacyTitle … trustFooter)
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 44 | HeightComparison | is not directed at | children under the age of 13 | 82 | Central children's-privacy claim. |
| 45 | HeightComparison | does not knowingly collect | personal information from children | 88 | Central children's-privacy claim, COPPA-relevant. |
| 46 | HeightComparison | will remove | a child's personal info upon report | 78 | Commitment tied to #45. |
| 47 | the site | may contain | links to external websites | 55 | Frames the third-party-links section. |
| 48 | this Privacy Policy | applies only to | HeightComparison | 72 | Scopes the policy's coverage. |
| 49 | HeightComparison | is not responsible for | the privacy practices of third-party sites | 75 | Central third-party disclaimer. |
| 50 | HeightComparison | will update | the "Last updated" date, upon material changes to this policy | 65 | Explains how policy changes are surfaced. |
| 51 | continued use of the site after changes | constitutes | acceptance of the updated policy | 72 | Central changes-acceptance claim. |
| 52 | users | can contact | HeightComparison for Privacy-Policy questions or data-deletion requests | 62 | Frames the contact section. |
