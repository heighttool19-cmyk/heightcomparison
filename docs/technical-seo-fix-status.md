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
| **T1** | Remove sitewide `noimageindex` tag & add `max-image-preview: large` | P1 Critical | Sitewide (`app/layout.tsx`) | 🚀 Ready (Batch 1) | `noimageindex` is absent; add `max-image-preview: large`. |
| **T2** | Add `https://` to every schema `@id` and `url` | P1 Critical | 5 Calculators | 🚀 Ready (Batch 3) | Standardize on `BASE_URL` in `schemas/`. |
| **T3** | Add Open Graph and Twitter tags | P2 High | 10 Pages | 🚀 Ready (Batch 5) | Add default OG/Twitter metadata; fallback image until custom designs ready. |
| **T4** | Fix table ranking order & remove "combined average" | P2 High | `/average-height-by-country` | 🚀 Ready (Batch 4) | Dynamically sort by male height descending; USA #27, Russia #28; add tie-rule. |
| **T5** | Complete Dataset schema | P2 High | `/average-height-by-country` | 🚀 Ready (Batch 3) | Full schema provided in Developer Notes (2019 data, NCD-RisC source). |
| **T6** | Use "Height Comparison Calculator" as single brand name | P2 High | Sitewide | 🚀 Ready (Batch 2) | Update Header, Footer, schema names, logo alt text, copyright line. |
| **T7** | Add `alt=""` and explicit dimensions to flag images | P3 Medium | `/average-height-by-country` | 🚀 Ready (Batch 4) | Decorative flags beside country names get `alt=""`, width & height. |
| **T8** | Lazy-load flag images & avoid unversioned CDN | P3 Medium | `/average-height-by-country` | 🚀 Ready (Batch 4) | Add `loading="lazy"` on rows > 5. |
| **T9** | Allow pinch-zoom on mobile | P3 Medium | All pages (`app/layout.tsx`) | ✅ Verified Clean | `maximumScale` and `userScalable` already removed from viewport. |
| **T10** | Add `aria-expanded` and `aria-controls` to toggles/accordions | P3 Medium | Accordions & Toggles | 🚀 Ready (Batch 4) | Update FAQ accordion, unit switch, and chart tabs with proper ARIA states. |
| **T11** | Clean up References block | P3 Medium | `/average-height-by-country` | 🚀 Ready (Batch 4) | Remove 16 unrelated papers; keep NCD-RisC 2016/2020; update global/Guatemala notes. |
| **T12** | Add in-body links to related tools | P3 Medium | `/average-height-by-country` | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T13** | Fix "the team" footer link | P3 Medium | Footer | 🚀 Ready (Batch 1) | Link "the team" to `/about`. |
| **T14** | Show an Updated date and author | P3 Medium | `/average-height-by-country` | ⏸️ Skipped | Marked "skip" in tracker CSV. |
| **T15** | Use real per-page `lastmod` in sitemap | P3 Medium | `app/sitemap.ts` | 🚀 Ready (Batch 5) | Implement dynamic `lastmod` mapping derived from content updates. |
| **T16** | Match FAQ schema to visible FAQ | P4 Low | `/average-height-by-country` | 🚀 Ready (Batch 3) | Build FAQ schema directly from page FAQ array. |
| **T17** | Remove 20 unreferenced `Observation` schema nodes | P4 Low | `/average-height-by-country` | 🚀 Ready (Batch 3) | Remove `Observation` array; covered cleanly by `Dataset` schema. |
| **T18** | Add BreadcrumbList schema | P4 Low | `/average-height-by-country` | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T19** | Fix World Population Review link | P4 Low | `/average-height-by-country` | 🚀 Ready (Batch 4) | Remove from intro; ensure any remaining mentions use `https://`. |
| **T20** | Remove leftover FAQ subtitle | P4 Low | 5 Calculators | 🚀 Ready (Batch 4) | Remove "Scientific insights into your development" subtitle from all 5 pages. |
| **T21** | Remove duplicate `dom-defender` script | P4 Low | Sitewide | ✅ Verified Clean | Only a single `<Script id="dom-defender">` in `layout.tsx`. |
| **T22** | Remove unused verification tag | P4 Low | Sitewide | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T23** | Fix broken/redirecting links in homepage FAQ | P2 High | Homepage | 🚀 Ready (Batch 5) | Remove trailing slash from `/average-height-by-country`; 301 redirects already active. |
| **T24** | Optimize & cache logo, add favicon/apple-icon | P2 High | Sitewide | 🚀 Ready (Batch 2) | Add static asset long-term cache headers in `next.config.ts`; check logo sizing. |
| **T25** | Cache blog posts (ISR / static params) | P3 Medium | `app/blog/[slug]/page.tsx` | 🚀 Ready (Batch 6) | Add `revalidate = 3600` and `generateStaticParams`. |
| **T26** | Resize blog images and add dimensions | P3 Medium | `/blogs`, `/blog/*` | 🚀 Ready (Batch 6) | Use Sanity image URL builder with explicit display width/height. |
| **T27** | Shorten titles & drop blog title template suffix | P3 Medium | Metadata across pages | 🚀 Ready (Batch 5) | Strip `"- Blog Height Comparison Tool"`; ensure titles stay under 561px. |
| **T28** | Shorten 3 meta descriptions | P4 Low | 3 Pages | ⏸️ Skipped | Marked "Skip" in tracker CSV. |
| **T29** | Fix heading hierarchy & pre-H1 labels | P4 Low | 5 Pages | 🚀 Ready (Batch 5) | Make "Image Measurement" a styled label; adjust H4s to H3s; structure FAQ headings. |
| **T30** | Add intro copy to `/blogs` page | P4 Low | `/blogs` | 🚀 Ready (Batch 6) | Change H1 to "Height Blog" and add intro paragraph. |
| **T31** | Fix 3 broken external links | P4 Low | External links | ⏳ Awaiting PM | Needs Screaming Frog 4xx export list from Biswa / PM. |
| **T32** | Add `rel="noopener"` to external link | P4 Low | `/height-weight-percentile` | ⏸️ Skipped | Marked "skip" in tracker CSV. |
| **T33** | Add basic security headers | P4 Low | Sitewide (`next.config.ts`) | 🚀 Ready (Batch 1) | Add HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy headers. |
| **T34** | Fix dead URL in `/image-to-height` schema | P2 High | `/image-to-height` | 🚀 Ready (Batch 3) | Replace `/measure-height-from-photo` with `/image-to-height` in schema. |
| **T35** | Match FAQ schema to visible FAQ on 3 more pages | P3 Medium | 3 Pages + Homepage | 🚀 Ready (Batch 3) | Synchronize schema Q&A with visible accordion arrays. |
| **T36** | Add Article schema, author, date to blog posts | P3 Medium | `/blog/*` | 🚀 Ready (Batch 6) | Add `BlogPosting` schema with author `"Height Expert"` and Sanity `_updatedAt`. |
| **T37** | Remove 3 empty H2s from blog post | P3 Medium | Blog post | ✅ Done | Marked DONE in tracker CSV. |
| **T38** | Standardize tool schema across calculators | P4 Low | 6 Calculators | 🚀 Ready (Batch 3) | Standardize `HealthApplication` vs `UtilitiesApplication` and add free `Offer`. |
| **T39** | Custom 404 page with clean title and tool links | P4 Low | `app/not-found.tsx` | 🚀 Ready (Batch 2) | Implement custom 404 page per Developer Notes spec. |

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

### **Batch 4: Average Height by Country Data, Table & Accessibility (T4, T7, T8, T10, T11, T19, T20)**
- **Files**: `src/app/[locale]/average-height-by-country/page.tsx`, `src/components/average-height-by-country/AverageHeightTable.tsx`, `src/components/FaqAccordion.tsx`, `src/components/References.tsx`.
- **Changes**:
  - Dynamically sort country table by male height descending (USA #27, Russia #28); add tie-break note; remove "and combined average" from intro.
  - Add `alt=""`, explicit width/height, and `loading="lazy"` to flag images.
  - Add ARIA accessibility attributes (`aria-expanded`, `aria-controls`, `aria-pressed`) to toggles and accordions.
  - Clean up References component (remove 16 off-topic citations, update global and Guatemala notes).
  - Remove "Scientific insights into your development" FAQ subtitle across all 5 calculators.
- **Validation**: Table sorting assertion check + accessibility attribute check.

### **Batch 5: Titles, Headings & Homepage Links (T3, T15, T23, T27, T29)**
- **Files**: `src/app/[locale]/page.tsx`, `src/app/sitemap.ts`, `src/app/[locale]/image-to-height/page.tsx`, `src/app/[locale]/blog/layout.tsx`.
- **Changes**:
  - Add Open Graph & Twitter card metadata defaults.
  - Automate per-page `lastmod` dates in `sitemap.ts`.
  - Fix homepage FAQ link to `/average-height-by-country` (remove trailing slash).
  - Shorten titles over 561px and remove `"- Blog Height Comparison Tool"` suffix.
  - Fix heading hierarchy: change pre-H1 "Image Measurement" to a styled label, adjust H4s to H3s, and format FAQ questions as H3 under H2.
- **Validation**: Heading level check + title pixel length audit.

### **Batch 6: Blog Caching, Image Sizing & Article Schema (T25, T26, T30, T36)**
- **Files**: `src/app/[locale]/blog/[slug]/page.tsx`, `src/app/[locale]/blogs/page.tsx`.
- **Changes**:
  - Add `revalidate = 3600` and `generateStaticParams` for ISR static caching.
  - Use Sanity image URL builder with explicit display width/height dimensions.
  - Update `/blogs` H1 to "Height Blog" and add intro copy.
  - Add `BlogPosting` Article schema with author `"Height Expert"` and Sanity publication/update dates.
- **Validation**: Next.js production build (`npm run build`) ensuring all blog routes generate statically.

