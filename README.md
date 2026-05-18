# Height Comparison Tool 📏

A comprehensive, interactive, and visually stunning web application built with Next.js 15. This project provides a suite of tools for visualizing height differences, predicting growth, analyzing percentiles, and exploring average heights globally. It also features a fully integrated blog system powered by Sanity CMS and a chart-sharing backend using MongoDB.

---

## 🎯 Project Vision & Purpose

Height is a fundamental human trait that is often difficult to visualize accurately through numbers alone. This project was created to bridge the gap between raw data and visual perception, providing a high-fidelity interactive playground for human height visualization and statistical analysis.

### What is this project for?
The core objective is to provide an accurate, easy-to-use, and aesthetically pleasing environment where height isn't just a number on a page, but a visual entity. Whether you are comparing two people, a group of celebrities, or checking health metrics, the tool offers a realistic scale to make those comparisons meaningful.

### Primary Use Cases:
- **Visual Reference for Creatives**: Writers, illustrators, and character designers use this tool to visualize height dynamics between characters or relative to real-world objects like doors and rulers.
- **Entertainment & Curiosity**: Fans can add their favorite athletes, actors, or fictional characters to see how they would stand next to each other in real life.
- **Health & Developmental Tracking**: Parents and health-conscious individuals use the **Height Predictor** and **Percentile Calculators** to monitor growth trends and set realistic expectations based on global health data.
- **Global Statistical Exploration**: The **Average Height by Country** tool serves as an educational resource for exploring human biological trends across different regions and demographics.
- **Smart Estimations**: The **Image to Height** feature provides a unique way to estimate the height of individuals in photographs by using reference objects and perspective adjustment.

### Who is it made for?
- **Curious Individuals**: Anyone interested in comparing heights for fun.
- **Parents**: Tracking and predicting their children's growth.
- **Health Professionals & Enthusiasts**: Utilizing BMI, Ideal Weight, and Percentile data.
- **Content Creators**: Generating visual height charts for social media or articles.
- **Researchers**: Exploring global height datasets in a visual format.

---

## 🌟 Key Features Overview

- **Interactive Height Dashboard (`/`)**: A dynamic 2D/3D visualization tool where users can add people, celebrities, and fictional characters to compare their heights visually against common objects (like a Door) and a Ruler.
- **Multiple Health & Growth Calculators**:
  - **Height Difference Calculator**: Precisely calculates and visualizes the difference between two individuals.
  - **Height Predictor**: Estimates future adult height based on current data and parental heights.
  - **Height & Weight Percentile Calculator**: Analyzes where an individual stands compared to population averages.
  - **Ideal Body Weight Calculator**: Calculates ideal weight based on height, gender, and frame size.
  - **Image to Height**: Allows users to upload an image and estimate height using reference objects.
- **Average Height by Country**: Explore global height statistics with country flags and data visualization.
- **Dynamic Blog System**: A fully integrated SEO-friendly blog using Sanity CMS.
- **Chart Sharing System**: Save and share custom height comparisons via short, unique URLs.
- **Dark/Light Mode**: Full theme support out-of-the-box.
- **Metric & Imperial System Support**: Seamless toggling between cm/kg and ft/in/lbs.

---

## 🛠 Tech Stack

### Frontend Architecture
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS (`globals.css`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and smooth transitions.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) for data visualization.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with `localStorage` persistence.
- **Image Processing**: `react-image-crop` & `html-to-image` for the Image to Height feature.
- **Country Flags**: `react-country-flag` & `country-flag-icons`.

### Backend & Database Architecture
- **API Routes**: Next.js Serverless Route Handlers (`src/app/api/...`).
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/).
- **Content Management System (CMS)**: [Sanity](https://www.sanity.io/) (`next-sanity`, `@portabletext/react`).
- **Id Generation & Hashing**: `nanoid` for short URLs, `node:crypto` for duplicate detection.

---

## 📂 Project Structure & Routes

### App Router (`src/app`)
- `/` - Main Interactive Height Dashboard.
- `/about` - About page.
- `/privacy` - Privacy policy.
- `/average-height-by-country` - Global height statistics tool.
- `/height-difference-calculator` - Calculator route.
- `/height-predictor` - Calculator route.
- `/height-weight-percentile-calculator` - Calculator route.
- `/ideal-body-weight-calculator` - Calculator route.
- `/image-to-height` - Image-based height estimation tool.
- `/blog` & `/blogs` - Blog listing and individual post pages.
- `/studio` - Embedded Sanity Studio for content management.
- `/sitemap.ts` - Main dynamic XML sitemap.
- `/blog-sitemap.xml/route.ts` - Dedicated XML sitemap for blog posts.

### Backend Routes (`src/app/api`)
- **`/api/share`**: 
  - `POST`: Receives chart state data, creates a SHA-256 hash to detect duplicates, generates an 8-character `shortId` via `nanoid`, and saves the document to MongoDB. Documents automatically expire after 7 days via a MongoDB TTL index.
  - `GET`: Retrieves the saved chart data using the `shortId` to rehydrate the state for the recipient.
- **`/api/admin`**: Admin functionalities.

---

## ⚙️ Core Systems Deep Dive

### 1. State Management (Zustand)
Located in `src/store.ts`, the application utilizes Zustand for global, persistent state management.
- **`useUnitStore`**: Manages the unit system (Metric vs. Imperial) globally.
- **`useThemeStore`**: Manages Dark/Light mode.
- **`usePersonStore`**: Manages the array of entities (persons, celebrities, fictional characters) currently added to the dashboard. Includes functions to add, remove, update, and reorder entities.
- **`useUIStore`**: Manages transient UI states like fullscreen mode.

### 2. Sanity Blog System
The blog is built using a headless CMS approach with Sanity.
- **Schemas** (`src/sanity/schemas`): Defines the `Post` and `Author` models. The `Post` schema includes Title, Slug, Author reference, Main Image, Excerpt, and a rich text `Body` using Sanity's Portable Text block editor (supporting normal text, headings, quotes, links, and images).
- **Rendering**: `@portabletext/react` is used on the frontend to parse and render the rich text content into React components seamlessly.
- **SEO**: Dynamic generation of `blog-sitemap.xml` ensures new blog posts are immediately indexed by search engines.

### 3. Shareable Chart System
A robust backend system to share comparisons.
- **Model** (`src/lib/models/Share.ts`): Defines the Mongoose schema for the shared data.
- **Efficiency**: Instead of saving identical charts multiple times, the backend hashes the incoming JSON data. If the hash exists, it reuses the existing `shortId` and resets the 7-day expiration timer, saving database space.

### 4. Interactive Components
- **`DynamicHeightDashboard` & `HeightCharts`**: The core visualization engine. Renders entities dynamically based on their relative heights.
- **`EntitiesPanel` / `CelebritiesPanel` / `FictionalPanel`**: Sidebar panels containing curated lists of recognizable figures to quick-add to the chart.
- **`AddPersonForm` & `EditPersonForm`**: Forms to input custom data (name, height, color, gender).

---

## 🚀 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Height Comparison tool/heightcomparison"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and configure the following:
   ```env
   # MongoDB Connection
   MONGODB_URI=your_mongodb_connection_string

   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📈 SEO & Performance Best Practices
- **Server Components**: Leverages Next.js React Server Components (RSC) to reduce client-side JavaScript.
- **Sitemaps**: Modularized sitemaps (`sitemap.ts` and `blog-sitemap.xml`) to scale as content grows.
- **Robots.txt**: Auto-generated via `robots.ts`.
- **Dynamic Imports**: Components like heavy charts and UI are lazily loaded using `next/dynamic` and React `Suspense` to optimize Time to Interactive (TTI).
