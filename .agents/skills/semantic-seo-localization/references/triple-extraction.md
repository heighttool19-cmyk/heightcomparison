# SPO Triple Extraction

## Purpose
Extract subject → predicate → object triples from a piece of content and score each by how central it is to the content's meaning. Used twice per pipeline run: once on the source English content, once on the translated draft — so the two triple sets can be diffed for meaning loss in the semantic-validation stage.

## Steps
1. Parse the content semantically, not sentence-by-sentence mechanically.
2. Identify key entities, concepts, relationships, attributes, actions, and facts.
3. Convert the most meaningful relationships into triples: Subject → Predicate → Object.
4. Avoid redundant, vague, or purely grammatical relationships (e.g. don't extract a triple from an unresolved pronoun).
5. Preserve the meaning of the original content. Do not invent facts absent from the text.
6. Normalize predicates where it helps later comparison (e.g. "is located in" and "is based in" both become `located in` when they express the same relation type in this content). Note any normalization you apply — the target-pass extraction must normalize the same way, or the diff in semantic-validation.md won't line up.
7. Assign every triple a **Triple Prominence Score (0–100)**, combining:
   - Centrality (0–30): how central to the content's main topic
   - Specificity (0–20): how precise/information-rich
   - Entity importance (0–20): how important the subject/object are to the content
   - Relationship strength (0–15): how explicitly/strongly the text establishes it
   - SEO/topical value (0–15): how useful for understanding the topic/entity/topical context
8. Deduplicate equivalent triples. Order the table by prominence, highest first.

## Output Format
```markdown
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
```
Save to `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md` for the source pass, or `triples-target.md` for the target pass (same format, run on the translated draft).

## Example
Input: "Apple is an American technology company headquartered in Cupertino. It develops consumer electronics, software, and online services."

| # | Subject | Predicate | Object | Score | Explanation |
|---|---------|-----------|--------|------:|--------------|
| 1 | Apple | is a | American technology company | 96 | Core entity classification; establishes the primary topic. |
| 2 | Apple | develops | consumer electronics, software, and online services | 92 | Describes Apple's principal business activities. |
| 3 | Apple | headquartered in | Cupertino | 78 | Geographic attribute of the company. |

## Common Mistakes
- Extracting a triple for every grammatical dependency instead of only meaningful relationships.
- Inferring relationships not reasonably supported by the text.
- Using different predicate normalization on the source vs. target pass — reuse the same normalization notes both times so the diff works.
