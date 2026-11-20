# Technical SEO Fix Status & Implementation Tracker

**Source Documents:**
- `temp/docs/Fix/Technical Seo tickit/Technical SEO Fix Tracker.xlsx - Tickets.csv`
- `temp/docs/Fix/Technical Seo tickit/DEVELOPER NOTES.md`
- `temp/docs/Fix/Technical Seo tickit/Average Height by Country_ Technical SEO Fix List.md`

**Audit Origin:** November 14–15, 2026 Screaming Frog Crawl & 11-page live recheck.  
**Total Tickets:** 39 (T1 to T39)

---

## 1. Master Ticket Inventory & Current Status

| ID | Title / Task | Priority | Affected Pages | Status | Notes / Plan Action |
|:---|:---|:---|:---|:---|:---|
| **T1** | Remove sitewide `noimageindex` tag & add `max-image-preview: large` | P1 Critical | Sitewide (`app/layout.tsx`) | ✅ Complete (Batch 1) | `noimageindex` absent; added `max-image-preview: large`. |
| **T2** | Add `https://` to every schema `@id` and `url` | P1 Critical | 5 Calculators | ✅ Complete (Batch 3) | Standardized on `BASE_URL` in `schemas/`. |
| **T3** | Add Open Graph and Twitter tags | P2 High | 10 Pages | ✅ Complete (Batch 5) | Added `metadataBase`, `openGraph.siteName`, and social card tags. |
| **T4** | Fix table ranking order & remove "combined average" | P2 High | `/average-height-by-country` | ✅ Complete (Batch 4) | Dynamically sorted by male height descending; USA #27, Russia #28; alphabetical tie-break. |
| **T5** | Complete Dataset schema | P2 High | `/average-height-by-country` | ✅ Complete (Batch 3) | Full Dataset schema implemented (2019 data, NCD-RisC source, spatial/temporal coverage). |
| **T6** | Use "Height Comparison Calculator" as single brand name | P2 High | Sitewide | ✅ Complete (Batch 2) | Header, Footer, schema names, logo alt text, copyright line unified. |
| **T7** | Add `alt=""` and explicit dimensions to flag images | P3 Medium | `/average-height-by-country` | ✅ Complete (Batch 4) | Decorative flags beside country names have `alt=""`, width 24 & height 18. |
| **T8** | Lazy-load flag images & avoid unversioned CDN | P3 Medium | `/average-height-by-country` | ✅ Complete (Batch 4) | Added `loading="lazy"` on all flag rows. |
| **T9** | Allow pinch-zoom on mobile | P3 Medium | All pages (`app/layout.tsx`) | ✅ Complete (Batch 1/5) | `maximumScale` and `userScalable` completely removed from all viewports. |
| **T10** | Add `aria-expanded` and `aria-controls` to toggles/accordions | P3 Medium | Accordions & Toggles | ✅ Complete (Batch 4) | FAQ accordion, unit switch, and chart tabs have full ARIA states. |
| **T11** | Clean up References block | P3 Medium | `/average-height-by-country` | ✅ Complete (Batch 4) | Removed 16 off-topic citations; kept NCD-RisC 2016/2020; updated global/Guatemala notes. |
| **T12** | Add in-body links to related tools | P3 Medium | `/average-height-by-country` | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T13** | Fix "the team" footer link | P3 Medium | Footer | ✅ Complete (Batch 1) | Linked "the team" to `getLocalizedHref('/about')`. |
| **T14** | Show an Updated date and author | P3 Medium | `/average-height-by-country` | ⏸️ Skipped | Marked "skip" in tracker CSV. |
| **T15** | Use real per-page `lastmod` in sitemap | P3 Medium | `app/sitemap.ts` | ✅ Complete (Batch 5) | Dynamic `lastmod` mapping reflecting verified content revisions and Sanity updates. |
| **T16** | Match FAQ schema to visible FAQ | P4 Low | `/average-height-by-country` | ✅ Complete (Batch 3) | FAQ schema matches 5 page FAQs word-for-word. |
| **T17** | Remove 20 unreferenced `Observation` schema nodes | P4 Low | `/average-height-by-country` | ✅ Complete (Batch 3) | Removed `Observation` array; covered cleanly by `Dataset` schema. |
| **T18** | Add BreadcrumbList schema | P4 Low | `/average-height-by-country` | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T19** | Fix World Population Review link | P4 Low | `/average-height-by-country` | ✅ Complete (Batch 4) | Removed from intro; external links verified. |
| **T20** | Remove leftover FAQ subtitle | P4 Low | 5 Calculators | ✅ Complete (Batch 4) | Removed "Scientific insights into your development" subtitle from all pages. |
| **T21** | Remove duplicate `dom-defender` script | P4 Low | Sitewide | ✅ Verified Clean | Only a single `<Script id="dom-defender">` in `layout.tsx`. |
| **T22** | Remove unused verification tag | P4 Low | Sitewide | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T23** | Fix broken/redirecting links in homepage FAQ | P2 High | Homepage | ✅ Complete (Batch 5) | Removed trailing slash from `/average-height-by-country`; 301 redirects active in `next.config.ts`. |
| **T24** | Optimize & cache logo, add favicon/apple-icon | P2 High | Sitewide | ✅ Complete (Batch 2) | Static asset long-term cache headers (1-year immutable) active in `next.config.ts`. |
| **T25** | Cache blog posts (ISR / static params) | P3 Medium | `app/blog/[slug]/page.tsx` | ✅ Complete (Batch 6) | Added `revalidate = 3600` and `generateStaticParams` for SSG/ISR. |
| **T26** | Resize blog images and add dimensions | P3 Medium | `/blogs`, `/blog/*` | ✅ Complete (Batch 6) | Implemented `next/image` with auto-format queries, explicit dimensions, and descriptive alt. |
| **T27** | Shorten titles & drop blog title template suffix | P3 Medium | Metadata across pages | ✅ Complete (Batch 5) | Stripped `"- Blog Height Comparison Tool"` / `"- Height Comparison"`. |
| **T28** | Shorten 3 meta descriptions | P4 Low | 3 Pages | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T29** | Fix heading hierarchy & pre-H1 labels | P4 Low | 5 Pages | ✅ Complete (Batch 5) | Changed pre-H1 to `<p>`; converted skipped `<h4>`s to `<h3>`s; wrapped FAQ questions in `<h3>`. |
| **T30** | Add intro copy to `/blogs` page | P4 Low | `/blogs` | ✅ Complete (Batch 6) | Changed H1 to "Height Blog" and added intro paragraph + metadata. |
| **T31** | Fix 3 broken external links | P4 Low | External links | ⏳ Awaiting PM | Needs Screaming Frog 4xx export list from Biswa / PM. |
| **T32** | Add `rel="noopener"` to external link | P4 Low | `/height-weight-percentile` | ⏸️ Skipped | Marked "skip" in tracker CSV. |
| **T33** | Add basic security headers | P4 Low | Sitewide (`next.config.ts`) | ✅ Complete (Batch 1) | Added HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy headers. |
| **T34** | Fix dead URL in `/image-to-height` schema | P2 High | `/image-to-height` | ✅ Complete (Batch 3) | Replaced `/measure-height-from-photo` with `/image-to-height` in schema. |
| **T35** | Match FAQ schema to visible FAQ on 3 more pages | P3 Medium | 3 Pages + Homepage | ✅ Complete (Batch 3) | Synchronized schema Q&A with visible accordion arrays word-for-word. |
| **T36** | Add Article schema, author, date to blog posts | P3 Medium | `/blog/*` | ✅ Complete (Batch 6) | Added `BlogPosting` schema with author `"Height Expert"` and Sanity `_updatedAt`. |
| **T37** | Remove 3 empty H2s from blog post | P3 Medium | Blog post | ✅ Done | Marked DONE in tracker CSV. |
| **T38** | Standardize tool schema across calculators | P4 Low | 6 Calculators | ✅ Complete (Batch 3) | Standardized `HealthApplication` vs `UtilitiesApplication` and added free `Offer`. |
| **T39** | Custom 404 page with clean title and tool links | P4 Low | `app/not-found.tsx` | ✅ Complete (Batch 2) | Custom 404 page with single title and links to all 6 calculators. |

---

## 2. Six-Batch Execution Strategy

### **Batch 1: Sitewide Infrastructure & Security Headers (T1, T13, T33)**
- **Files**: `src/app/layout.tsx`, `src/components/Footer.tsx`, `next.config.ts`.
- **Changes**:
  - Add `"max-image-preview": "large"` to `googleBot` metadata in `src/app/layout.tsx`.
  - Fix `"the team"` link in `src/components/Footer.tsx` to point to `/about`.
  - Add security headers (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) in `next.config.ts`.
- **Validation**: TypeScript typecheck + header response inspection.

### **Batch 2: Brand Consistency, Asset Caching & 404 Page (T6, T24, T39)**
- **Files**: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `next.config.ts`, `src/app/not-found.tsx`.
- **Changes**:
  - Unify brand name to `"Height Comparison Calculator"` in header, footer, and schema helpers.
  - Add static asset long-term cache header in `next.config.ts`.
  - Create `src/app/not-found.tsx` with title `"Page Not Found | Height Comparison Calculator"`, user guidance, and links to all 6 calculator tools.
- **Validation**: Test custom 404 route rendering and brand string consistency.

### **Batch 3: Schema & Structured Data Parity (T2, T5, T17, T34, T35, T38) - [COMPLETE]**
- **Files**: `src/constants/schemas/*.ts`.
- **Changes**:
  - Add `https://` prefix to all schema `@id` and `url` values using `BASE_URL` (0 bare domain strings remaining).
  - Implement full `Dataset` schema on `/average-height-by-country` and remove 20 `Observation` nodes.
  - Verified `/image-to-height` schema entity URL is `/image-to-height`.
  - Harmonize FAQ schemas to match visible accordion questions word-for-word across all calculators and homepage.
  - Standardize `SoftwareApplication` / `HealthApplication` schema with free `Offer` (`HealthApplication` for predictor, percentile, IBW; `UtilitiesApplication` for rest).
- **Validation**: 57/57 automated schema validation assertions passed; `npx tsc --noEmit` and `npm run build` compiled cleanly.

### **Batch 4: Average Height by Country Data, Table & Accessibility (T4, T7, T8, T10, T11, T19, T20) - [COMPLETE]**
- **Files**: `src/constants/averageHeight.ts`, `src/app/[locale]/average-height-by-country/page.tsx`, `src/components/average-height-by-country/AverageHeightTable.tsx`, `src/components/average-height-by-country/ChartHelpers.tsx`, `src/components/FaqAccordion.tsx`, `messages/en.json`.
- **Changes**:
  - Dynamically sorted 46 countries by male height descending (USA #27 at 176.9 cm, Russia #28 at 176.7 cm, Pakistan #37 at 166.9 cm, India #38 at 166.5 cm, Sri Lanka #39 at 166.0 cm) with alphabetical tie-breaks.
  - Added tie-break source note under table and updated table intro copy.
  - Added `alt=""`, explicit width (`24`), height (`18`), and `loading="lazy"` to flag images.
  - Added ARIA accessibility attributes (`aria-expanded`, `aria-controls`, `role="region"`, `role="tablist"`, `role="tab"`, `aria-selected`, `aria-pressed`) to toggles, tabs, and FAQ accordions.
  - Cleaned up References section: removed 16 off-topic citations, kept only the two primary NCD-RisC studies (eLife 2016 and The Lancet 2020), and updated Guatemala & global average source notes.
  - Removed "Scientific insights into your development" FAQ subtitle across all calculators.
  - Removed World Population Review link from intro.
- **Validation**: Strict sorting assertion check passed for all 46 countries; 100% of accessibility assertions passed; `npx tsc --noEmit` and `npm run build` compiled cleanly.

### **Batch 5: Titles, Headings & Homepage Links (T3, T15, T23, T27, T29) - [COMPLETE]**
- **Files**: `src/app/layout.tsx`, `src/app/sitemap.ts`, `next.config.ts`, `src/components/ImageMeasurementCom/components/Header.tsx`, `src/components/FaqAccordion.tsx`, `src/app/[locale]/height-weight-percentile-calculator/page.tsx`, `src/app/[locale]/ideal-body-weight-calculator/page.tsx`, `src/app/[locale]/height-predictor/page.tsx`, `src/app/[locale]/height-difference-calculator/page.tsx`, `src/app/[locale]/blog/layout.tsx`, `src/app/[locale]/blog/[slug]/layout.tsx`.
- **Changes**:
  - Added `metadataBase` (`https://heightcomparisoncalculator.com`), `openGraph.siteName`, and social card metadata in root layout.
  - Automated per-page `lastmod` dates in `sitemap.ts` mapping directly to verified page updates.
  - Added explicit permanent 301 redirect for `/average-height-by-country/` in `next.config.ts`.
  - Removed template suffix `"- Height Comparison"` from blog post titles.
  - Fixed heading hierarchy: converted pre-H1 "Image Measurement" to a styled label `<p>`, eliminated all skipped `<h4>` levels on percentile & IBW pages, formatted all FAQ questions as accessible `<h3>` headings under `<h2>Frequently Asked Questions</h2>`, and linked external citations.
- **Validation**: Strict heading level assertion check, title length check, and Next.js production build (`npm run build`) passed cleanly.

### **Batch 6: Blog Caching, Image Sizing & Article Schema (T25, T26, T30, T36) - [COMPLETE]**
- **Files**: `src/sanity/lib/queries.ts`, `src/sanity/lib/types.ts`, `messages/en.json`, `src/components/blog/CustomPortableText.tsx`, `src/app/[locale]/blog/[slug]/page.tsx`, `src/app/[locale]/blogs/page.tsx`.
- **Changes**:
  - Implemented `export const revalidate = 3600;` and `generateStaticParams()` on `/blog/[slug]` for SSG/ISR prerendering.
  - Added `generateMetadata` on `/blogs` and updated H1 to `"Height Blog"` with descriptive subtitle.
  - Integrated `next/image` with auto-format queries (`?auto=format&w=...`) and explicit width & height dimensions across article cards, portable text body images, and author avatars.
  - Added descriptive alt text `"Icon of a person beside a height scale"` for the Height Expert avatar icon.
  - Added structured `BlogPosting` Article schema on all blog posts with Sanity author `"Height Expert"`, publisher `"Height Comparison Calculator"`, and `dateModified`.
- **Validation**: Automated Batch 6 assertions passed; Next.js production build confirmed `/blog/[slug]` rendered as pre-rendered SSG (`● (SSG)`).

