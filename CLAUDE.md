# Height Comparison Tool Context (`CLAUDE.md`)

This document serves as a comprehensive developer guide and context reference for the **Height Comparison Tool** codebase. Use it to understand the architecture, file layout, design system, state management, database schema, and coding patterns in this project.

---

## 🎯 Project Overview & Vision

The **Height Comparison Tool** is an interactive, visually rich, and highly responsive web application built with **Next.js 15 (App Router)** and **React 19**, deployed at [heightcomparisoncalculator.com](https://heightcomparisoncalculator.com/). It allows users to visualize and compare heights of people, celebrities, fictional characters, landmarks, mountains, transport vehicles, and animals in an interactive 2D chart. Additionally, it offers developmental tracking, percentile calculators, and an image-based height estimation engine, backed by a headless CMS (Sanity) for the blog and MongoDB for custom chart-sharing.

### Key Capabilities
1. **Interactive Height Dashboard (`/`)**: Main interactive visualizer allowing users to add, modify, reorder, and remove people/objects/celebrities relative to a calibrated door and ruler.
2. **Growth & Health Calculators**:
   - `/height-difference-calculator`: Visualizes and compares the difference between two individuals.
   - `/height-predictor`: Calculates future adult height using Khamis-Roche and Mid-Parental methods.
   - `/height-weight-percentile-calculator`: Plots where an individual falls relative to WHO and CDC percentile curves.
   - `/ideal-body-weight-calculator`: Determines optimal body weight based on height, frame size, and gender.
   - `/image-to-height`: Estimates height from a photo using reference calibration.
3. **Average Height by Country (`/average-height-by-country`)**: Visualizes average male and female heights globally.
4. **Dynamic Blog System (`/blog` / `/blogs`)**: Rich SEO-friendly blog driven by Sanity CMS.
5. **Chart Sharing Backend**: Short-URL generator (`/api/share` -> `/s/[id]`) with auto-expiring records via MongoDB.

---

## 🛠 Tech Stack & Core Libraries

- **Frontend Core**: Next.js 15 (App Router, Turbopack, React Server Components), React 19.
- **Styling**: Tailwind CSS v4 + PostCSS (using `globals.css` for custom transitions, themes, and base variables).
- **Fonts**: `Plus_Jakarta_Sans` (`--font-jakarta`) and `JetBrains_Mono` (`--font-jetbrains-mono`).
- **Icons**: `lucide-react` for standard UI icons.
- **State Management**: `zustand` (with `localStorage` persistence).
- **Charts**: `recharts` for percentile and comparison charts.
- **CMS**: Sanity CMS (`next-sanity`, `@portabletext/react`).
- **Database**: MongoDB via `mongoose`.
- **Utilities**: `framer-motion` for transitions, `nanoid` (for short IDs), `react-country-flag` for country flags, `react-image-crop` and `html-to-image` for custom canvas interactions.

---

## 📂 Directory Structure

```bash
heightcomparison/
├── .env                  # Local environment configurations (MongoDB, Sanity tokens)
├── amplify.yml           # AWS Amplify CI/CD configuration
├── next.config.ts        # Next.js configurations
├── sanity.config.ts      # Sanity CMS config file
├── tailwind.config.ts    # Tailwind CSS configurations
├── src/
│   ├── app/              # Next.js App Router (pages, layouts, and API routes)
│   │   ├── api/          # Serverless route handlers (share, admin cleanup)
│   │   ├── s/            # Dynamic share redirect pages (/s/[id])
│   │   ├── blogs/        # Paginated blog list
│   │   ├── blog/         # Individual dynamic slug pages (/blog/[slug])
│   │   ├── studio/       # Embedded Sanity CMS admin studio
│   │   ├── globals.css   # Main CSS entrypoint with variables and theme definitions
│   │   ├── layout.tsx    # Root layout with scripts (GTM, GA), themes, and fonts
│   │   └── page.tsx      # Main Home page container
│   │
│   ├── components/       # Reusable components categorized by route/feature
│   │   ├── common/       # ErrorBoundary, JsonLd schemas
│   │   ├── layout/       # Footer, Navbar
│   │   ├── ui/           # Custom UI inputs, Filter tabs, headers
│   │   ├── blog/         # PortableText rendering components
│   │   ├── average-height-calculator/
│   │   ├── height-difference-calculator/
│   │   ├── height-predictor/
│   │   ├── height-weight-percentile-calculator/
│   │   └── ideal-body-weight-calculator/
│   │
│   ├── constants/        # Metadata, SEO schemas, and conversion formulas
│   ├── data/             # Static local databases (celebrities, animals, landmarks, fictional)
│   │   ├── celebrities/  # NBA, Hollywood, Bollywood, Athletes databases
│   │   ├── fictional/    # Anime, Marvel, Cartoons databases
│   │   └── entities/     # Animals, Landmarks, Mountains, Transport databases
│   │
│   ├── lib/              # Database drivers (mongoose, mongodb connection helpers)
│   ├── sanity/           # Sanity client configurations, queries, and schemas
│   ├── store/            # Transient stores (e.g., useHeightStore for image tool)
│   │   └── useHeightStore.ts
│   ├── store.ts          # Core persistent Zustand stores (Unit, Theme, Person, UI)
│   ├── types.ts          # TypeScript interfaces (Person, Celebrity, Entity, Mountain)
│   └── utils/            # Image crop, avatar generation, input sanitization helpers
```

---

## 💾 State Management (Zustand)

Global states are persistent across sessions via `localStorage` (except transient UI triggers).

### 1. `useUnitStore` (in `src/store.ts`)
Tracks the global unit system: Metric (`cm`/`kg`) vs. Imperial (`ft`/`in`/`lbs`).
- State: `unitSystem: 'metric' | 'imperial'`
- Actions: `setUnitSystem(unit)`, `toggleUnitSystem()`
- Storage Key: `'height-tool-units'`

### 2. `useThemeStore` (in `src/store.ts`)
Manages light/dark mode.
- State: `theme: 'light' | 'dark'` (Default is `'dark'`)
- Actions: `toggleTheme()`, `setTheme(theme)`
- Storage Key: `'height-tool-theme'`

### 3. `usePersonStore` (in `src/store.ts`)
Manages the primary active comparison list for the 2D dashboard.
- State: `persons: Person[]`
- Actions:
  - `addPerson(person: Person)`
  - `removePerson(id: string)`
  - `updatePerson(id: string, updates: Partial<Person>)`
  - `setPersons(persons: Person[])`
  - `reorderPerson(id: string, direction: 'up' | 'down')`
- Storage Key: `'height-tool-persons'`

### 4. `useHeightStore` (in `src/store/useHeightStore.ts`)
Dedicated transient store for the **Image to Height** tool page (`/image-to-height`). Tracks calibration points, user lines, cropped image data, and temporary comparisons.

---

## 🔗 Shared Chart API System

### Hashing & Duplication Avoidance (`/src/app/api/share/route.ts`)
To prevent database bloat, the sharing API implements duplicate detection:
1. When a user shares a chart, the JSON state payload is stable-stringified.
2. A `SHA-256` hash is calculated over the JSON string.
3. The API checks MongoDB for an existing `dataHash` match.
4. **If found**: It reuses the old `shortId` and updates `createdAt = new Date()` (refreshing the TTL timer).
5. **If not found**: It generates a unique 8-character `shortId` via `nanoid(8)` and creates a new document.

### MongoDB Schema & Auto-Expiry (`/src/lib/models/Share.ts`)
Shared charts are temporary to keep storage clean:
- `shortId`: Unique key used in URLs (e.g. `/s/aB3x9zY1`).
- `data`: Raw state structure.
- `dataHash`: Indexed string for duplicate checks.
- `createdAt`: Indexed Date with `expires: '7d'`. MongoDB automatically deletes the record exactly 7 days after the last update.

---

## ✍️ Headless CMS & Blog Integration (Sanity)

The blog utilizes **Sanity CMS** to fetch SEO articles dynamically.
- **Schemas** (`/src/sanity/schemas`):
  - `post`: Title, slug, author, mainImage, publishedAt, excerpt, body (PortableText block).
  - `author`: Name, role, image.
- **Queries** (`/src/sanity/lib/queries.ts`):
  - uses GROQ syntax (`postBySlugQuery`, `allPostsQuery`, `allPostSlugsQuery`).
  - Images are dereferenced inline: `mainImage { asset-> { _ref, url } }`.
- **Rendering**: Uses `@portabletext/react` and a custom component mapping (`src/components/blog/CustomPortableText.tsx`) to render headings, embeds, custom code blocks, and optimized responsive layouts.

---

## 🚀 Setup & Commands

### Prerequisites
- Node.js (v18 or higher recommended)
- A local or Atlas MongoDB URI
- A Sanity project configured

### Env Template (`.env`)
```env
# Database
MONGODB_URI=mongodb+srv://...

# Sanity configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_token_if_needed
```

### Commands
- **Run dev server**: `npm run dev`
- **Build production bundle**: `npm run build`
- **Start production server**: `npm run start`
- **Lint files**: `npm run lint`

---

## 🎨 Coding Conventions & Design System

### 1. Style Guidelines
- **Tailwind CSS v4**: Utilize native CSS variables defined inside `@theme` in `src/app/globals.css`.
- **Colors**: Avoid harsh default colors. Use the semantic theme variables:
  - Background: `var(--bg)` / `bg-bg`
  - Text: `var(--foreground)` / `text-foreground`
  - Primary/Accent: `var(--accent)` / `text-accent` / `bg-accent`
  - Border: `var(--border)` / `border-border`
- **Animations**: Prefer `framer-motion` for transitions instead of heavy raw CSS keyframes.

### 2. Components
- Keep client components lean. When using custom libraries that do not support server-side rendering (SSR), dynamic load them using `next/dynamic` with `ssr: false` (see `src/components/DynamicHeightDashboard.tsx`).
- Always structure schemas with semantic headings. Add rich schemas using `<JsonLd>` helper inside `src/components/common/JsonLd.tsx`.

### 3. Types
- Reference `src/types.ts` for entities, mountains, celebrities, and persons. If extending a person type (e.g. adding offset or coordinates), ensure it doesn't break `usePersonStore` serialization.
