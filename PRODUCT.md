# Height Comparison Tool — Product & Technical Explainer (`PRODUCT.md`)

This document provides a high-level overview of the **Height Comparison Tool** for users, stakeholders, and developers. It answers the *What*, *Why*, *How*, and *Who* of the project, combining a friendly product explanation with key technical specifications.

---

## 🔍 1. What is the Project?

The **Height Comparison Tool** is an interactive, browser-based web application deployed at [heightcomparisoncalculator.com](https://heightcomparisoncalculator.com/) that converts numeric measurements into visually accurate 2D comparisons. Instead of just showing numbers (e.g., "180 cm" vs "160 cm"), it generates realistic, scaled avatars side-by-side. 

Users can add custom people, select from database presets of celebrities and fictional characters, or compare heights against objects like doors, rulers, landmarks (e.g., the Eiffel Tower), and animals (e.g., a giraffe).

---

## 🎯 2. Why was it Created? (The "Why")

While numbers are precise, humans struggle to mentally picture height differences accurately. A difference of 5 inches or 12 centimeters seems small on paper, but has a distinct physical presence in real life. 

This tool serves several distinct audiences and use cases:
*   **Creative Professionals**: Artists, illustrators, writers, and game designers use the tool to construct realistic height ratios between characters and their environments.
*   **Curious Fans**: Users like to see how they would stand next to their favorite NBA stars, Hollywood actors, anime characters, or historical figures.
*   **Parents & Families**: The **Height Predictor** and **Percentile Calculators** help parents visualize their child's projected growth and check how their child's size compares to global standards.
*   **Health Enthusiasts**: The **Ideal Body Weight Calculator** helps users find healthy weight ranges based on frame size and biological metrics.
*   **Smart Photo Estimations**: The **Image to Height** engine lets users estimate height from a photo by using reference heights or standard objects in the background.

---

## ⚡ 3. What does it Do? (Features & Capabilities)

The platform is divided into a main visual playground and a set of specialized mathematical tools:

### A. The Interactive Comparison Canvas (`/`)
*   **Add Custom Entities**: Input name, height (in metric or imperial), color, and gender.
*   **Massive Library Presets**: Instantly load celebrities (NBA stars, Hollywood, Bollywood, politicians) and fictional characters (anime, Marvel, DC, monsters).
*   **Scale Against the World**: Place your avatar next to real-world objects like a standard door, a ruler, landmarks, mountains, or wild animals.
*   **Unit Toggling**: Switch between Metric (cm) and Imperial (feet/inches) on the fly.
*   **Sharing Tool**: Save the layout configurations and generate a shareable short URL.

### B. Specialized Calculators
1.  **Height Difference Calculator**: Focuses on comparing two entities (e.g., couples, rivals) and computes the exact difference.
2.  **Height Predictor**: Estimates a child's future adult height using the **Mid-Parental Method** (based on mother and father heights) or the **Khamis-Roche Method** (uses current age, weight, and child height for greater accuracy).
3.  **Height & Weight Percentile Calculator**: Compares an individual's metrics against CDC (Centers for Disease Control) and WHO (World Health Organization) growth charts to show what percentage of the population they are taller/heavier than.
4.  **Ideal Body Weight Calculator**: Computes ideal body weight ranges using Robinson, Miller, Devine, and Hamwi equations based on body frame size.
5.  **Image to Height Tool**: Estimates height from uploaded photographs by defining a reference scale (e.g. calibrating a known object's pixels).

---

## ⚙️ 4. How does it Work? (The Mechanics)

Here is a look at the formulas and render engines behind the app:

### A. The Scaling Engine (2D Render Matrix)
*   **How it renders**: Avatars are loaded as SVGs or images. To ensure they scale correctly relative to each other, the app uses a **relative scaling algorithm**.
*   **The Math**: The tallest active entity on the canvas dictates the upper limit of the viewport. Every other avatar's height is rendered as a percentage of this tallest entity.
    $$\text{Render Height \%} = \left( \frac{\text{Entity Height}}{\text{Tallest Entity Height}} \right) \times 100$$
*   This ensures that whether you are comparing a 100 cm toddler to a 200 cm NBA player, or a 200 cm player to the 30,000 cm Eiffel Tower, the proportions remain perfectly accurate.

### B. Height Prediction Formulas
*   **Mid-Parental Target Height**:
    *   *For Boys*: $\text{Child Height} = \frac{\text{Father Height} + \text{Mother Height} + 13\text{ cm}}{2}$
    *   *For Girls*: $\text{Child Height} = \frac{\text{Father Height} + \text{Mother Height} - 13\text{ cm}}{2}$
*   **Khamis-Roche Method**: Uses statistical coefficients based on the child's age, current height, current weight, and the mid-parental height to predict adult height without requiring bone age X-rays.

### C. Image to Height Engine (Pixel-to-Metric Calibration)
1.  The user uploads an image.
2.  The user draws a line over an object of known height (e.g., a standard door, which is $203\text{ cm}$) to establish a calibration ratio:
    $$\text{Calibration Ratio} = \frac{\text{Known Height in cm}}{\text{Line Length in Pixels}}$$
3.  The user draws a second line over the person of unknown height.
4.  The system calculates the height:
    $$\text{Target Height} = \text{Target Line Length in Pixels} \times \text{Calibration Ratio}$$

---

## 📊 5. High-Level Technical Specifications

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Core server-side rendering and client-side page routing. |
| **Component Engine** | React 19 | Renders state-driven components and layout modules. |
| **State Store** | Zustand | Manages unit systems, active compared characters, and themes. |
| **Styling** | Tailwind CSS v4 & CSS Variables | Responsive styling, clean layout sizing, and dark/light modes. |
| **Data Storage** | MongoDB & Mongoose | Stores temporary comparison charts for sharing. |
| **Content Manager** | Sanity CMS | Headless content management system powering the blog posts. |
| **Chart Visuals** | Recharts | Plots bell curves and growth percentile trajectories. |

---

## 🙋‍♂️ 6. FAQ (Frequently Asked Questions)

### Q: Is my data saved when I refresh the page?
**A:** Yes. The application uses your browser's local storage to save your added custom people, preferred units (metric or imperial), and website theme (light or dark mode).

### Q: How long do shared comparison links last?
**A:** When you generate a shareable URL, the chart data is stored in our database. To keep storage clean, links automatically expire and are deleted **7 days** after creation.

### Q: Are the height prediction results 100% accurate?
**A:** No. Height predictions are mathematical estimations based on genetic averages (Mid-Parental) and growth study statistics (Khamis-Roche). Environmental factors, nutrition, and medical history also affect final adult height.
