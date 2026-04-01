import { BLUE, TEAL } from '@/constants/colors';

export const TOP10 = [
    { name: "Netherlands", code: "NL", male: 183.8, female: 170.4 },
    { name: "Montenegro", code: "ME", male: 183.3, female: 170.0 },
    { name: "Estonia", code: "EE", male: 182.8, female: 168.7 },
    { name: "Bosnia", code: "BA", male: 182.5, female: 167.5 },
    { name: "Iceland", code: "IS", male: 182.1, female: 168.9 },
    { name: "Denmark", code: "DK", male: 181.9, female: 169.5 },
    { name: "Czechia", code: "CZ", male: 181.2, female: 168.0 },
    { name: "Latvia", code: "LV", male: 181.2, female: 168.8 },
    { name: "Slovakia", code: "SK", male: 181.0, female: 167.1 },
    { name: "Ukraine", code: "UA", male: 181.0, female: 166.6 },
];

export const BOT10 = [
    { name: "Timor-Leste", code: "TL", male: 159.8, female: 152.3 },
    { name: "Laos", code: "LA", male: 162.0, female: 153.0 },
    { name: "Guatemala", code: "GT", male: 163.4, female: 149.4 },
    { name: "Nepal", code: "NP", male: 163.0, female: 150.9 },
    { name: "Bangladesh", code: "BD", male: 163.0, female: 152.1 },
    { name: "Philippines", code: "PH", male: 163.2, female: 149.6 },
    { name: "Indonesia", code: "ID", male: 163.6, female: 152.8 },
    { name: "Sri Lanka", code: "LK", male: 166.0, female: 153.0 },
    { name: "India", code: "IN", male: 166.5, female: 152.6 },
    { name: "Pakistan", code: "PK", male: 166.9, female: 154.2 },
];

export const MVF = [
    { n: "Netherlands", code: "NL", m: 183.8, w: 170.4 },
    { n: "Denmark", code: "DK", m: 181.9, w: 169.5 },
    { n: "Germany", code: "DE", m: 180.3, w: 166.2 },
    { n: "USA", code: "US", m: 176.9, w: 163.3 },
    { n: "Iran", code: "IR", m: 175.6, w: 161.2 },
    { n: "S. Korea", code: "KR", m: 175.5, w: 163.2 },
    { n: "Japan", code: "JP", m: 170.8, w: 158.0 },
    { n: "India", code: "IN", m: 166.5, w: 152.6 },
    { n: "Bangladesh", code: "BD", m: 163.0, w: 152.1 },
    { n: "Guatemala", code: "GT", m: 163.4, w: 149.4 },
];

export const REGIONS = [
    { name: "Northern Europe", codes: ["NL", "DK"], avg: 181, color: "#1A56DB", ex: "Netherlands, Denmark, Norway" },
    { name: "Eastern Europe", codes: ["RS", "UA"], avg: 179, color: "#2563EB", ex: "Serbia, Ukraine, Poland" },
    { name: "W. Europe", codes: ["DE", "FR"], avg: 178, color: "#3B82F6", ex: "Germany, France, UK" },
    { name: "N. America / Oceania", codes: ["US", "AU"], avg: 178, color: "#60A5FA", ex: "Canada, USA, Australia" },
    { name: "Middle East", codes: ["IR", "TR"], avg: 175, color: "#7DD3FC", ex: "Iran, Turkey" },
    { name: "East Asia", codes: ["KR", "JP"], avg: 173, color: "#86EFAC", ex: "China, South Korea, Japan" },
    { name: "Latin America", codes: ["BR", "MX"], avg: 169, color: "#FCD34D", ex: "Brazil, Mexico" },
    { name: "South/SE Asia", codes: ["IN", "ID"], avg: 164, color: "#FB923C", ex: "India, Indonesia, Nepal" },
    { name: "Central America", codes: ["GT", "HN"], avg: 162, color: "#EF4444", ex: "Guatemala, Honduras" },
];

export const BELL_CONFIG = {
    Male: {
        mean: 171, sd: 7, color: BLUE, bandColor: "#7DD3FC",
        label: "global male population",
        pctLabel: "68% of men fall within ±1 standard deviation",
        bands: [
            { col: BLUE, label: "68% of men — within ±1σ (≈164–178 cm)" },
            { col: "#7DD3FC", label: "95% of men — within ±2σ (≈157–185 cm)" },
        ]
    },
    Female: {
        mean: 159, sd: 6, color: TEAL, bandColor: "#99F6E4",
        label: "global female population",
        pctLabel: "68% of women fall within ±1 standard deviation",
        bands: [
            { col: TEAL, label: "68% of women — within ±1σ (≈153–165 cm)" },
            { col: "#99F6E4", label: "95% of women — within ±2σ (≈147–171 cm)" },
        ]
    }
} as const;

export const heightData = [
    { rank: 1, flag: 'NL', name: 'Netherlands', maleCm: 183.8, femaleCm: 170.4 },
    { rank: 2, flag: 'ME', name: 'Montenegro', maleCm: 183.3, femaleCm: 170 },
    { rank: 3, flag: 'EE', name: 'Estonia', maleCm: 182.8, femaleCm: 168.7 },
    { rank: 4, flag: 'BA', name: 'Bosnia & Herz.', maleCm: 182.5, femaleCm: 167.5 },
    { rank: 5, flag: 'IS', name: 'Iceland', maleCm: 182.1, femaleCm: 168.9 },
    { rank: 6, flag: 'DK', name: 'Denmark', maleCm: 181.9, femaleCm: 169.5 },
    { rank: 7, flag: 'CZ', name: 'Czechia', maleCm: 181.2, femaleCm: 168 },
    { rank: 8, flag: 'LV', name: 'Latvia', maleCm: 181.2, femaleCm: 168.8 },
    { rank: 9, flag: 'SK', name: 'Slovakia', maleCm: 181, femaleCm: 167.1 },
    { rank: 10, flag: 'UA', name: 'Ukraine', maleCm: 181, femaleCm: 166.6 },
    { rank: 11, flag: 'HR', name: 'Croatia', maleCm: 180.8, femaleCm: 166.8 },
    { rank: 12, flag: 'RS', name: 'Serbia', maleCm: 180.7, femaleCm: 168.3 },
    { rank: 13, flag: 'LT', name: 'Lithuania', maleCm: 180.7, femaleCm: 167.6 },
    { rank: 14, flag: 'PL', name: 'Poland', maleCm: 180.7, femaleCm: 165.8 },
    { rank: 15, flag: 'FI', name: 'Finland', maleCm: 180.6, femaleCm: 166.5 },
    { rank: 16, flag: 'NO', name: 'Norway', maleCm: 180.5, femaleCm: 166.5 },
    { rank: 17, flag: 'SE', name: 'Sweden', maleCm: 180.5, femaleCm: 166.7 },
    { rank: 18, flag: 'DE', name: 'Germany', maleCm: 180.3, femaleCm: 166.2 },
    { rank: 19, flag: 'GR', name: 'Greece', maleCm: 179.3, femaleCm: 165.8 },
    { rank: 20, flag: 'BE', name: 'Belgium', maleCm: 179.1, femaleCm: 163.4 },
    { rank: 21, flag: 'IE', name: 'Ireland', maleCm: 179, femaleCm: 164.5 },
    { rank: 22, flag: 'AU', name: 'Australia', maleCm: 178.8, femaleCm: 164.7 },
    { rank: 23, flag: 'CA', name: 'Canada', maleCm: 178.8, femaleCm: 164.7 },
    { rank: 24, flag: 'FR', name: 'France', maleCm: 178.6, femaleCm: 164.5 },
    { rank: 25, flag: 'GB', name: 'United Kingdom', maleCm: 178.2, femaleCm: 163.9 },
    { rank: 26, flag: 'NZ', name: 'New Zealand', maleCm: 177.7, femaleCm: 164.7 },
    { rank: 27, flag: 'RU', name: 'Russia', maleCm: 176.7, femaleCm: 164.5 },
    { rank: 28, flag: 'US', name: 'USA', maleCm: 176.9, femaleCm: 163.3 },
    { rank: 29, flag: 'TR', name: 'Turkey', maleCm: 176.4, femaleCm: 161.8 },
    { rank: 30, flag: 'ES', name: 'Spain', maleCm: 176.1, femaleCm: 162 },
    { rank: 31, flag: 'BR', name: 'Brazil', maleCm: 175.7, femaleCm: 162.4 },
    { rank: 32, flag: 'CN', name: 'China', maleCm: 175.7, femaleCm: 163.5 },
    { rank: 33, flag: 'IR', name: 'Iran', maleCm: 175.6, femaleCm: 161.2 },
    { rank: 34, flag: 'KR', name: 'South Korea', maleCm: 175.5, femaleCm: 163.2 },
    { rank: 35, flag: 'JP', name: 'Japan', maleCm: 170.8, femaleCm: 158 },
    { rank: 36, flag: 'MX', name: 'Mexico', maleCm: 169, femaleCm: 158 },
    { rank: 37, flag: 'IN', name: 'India', maleCm: 166.5, femaleCm: 152.6 },
    { rank: 38, flag: 'LK', name: 'Sri Lanka', maleCm: 166, femaleCm: 153 },
    { rank: 39, flag: 'PK', name: 'Pakistan', maleCm: 166.9, femaleCm: 154.2 },
    { rank: 40, flag: 'ID', name: 'Indonesia', maleCm: 163.6, femaleCm: 152.8 },
    { rank: 41, flag: 'PH', name: 'Philippines', maleCm: 163.2, femaleCm: 149.6 },
    { rank: 42, flag: 'BD', name: 'Bangladesh', maleCm: 163, femaleCm: 152.1 },
    { rank: 43, flag: 'NP', name: 'Nepal', maleCm: 163, femaleCm: 150.9 },
    { rank: 44, flag: 'GT', name: 'Guatemala', maleCm: 163.4, femaleCm: 149.4 },
    { rank: 45, flag: 'LA', name: 'Laos', maleCm: 162, femaleCm: 153 },
    { rank: 46, flag: 'TL', name: 'Timor-Leste', maleCm: 159.8, femaleCm: 152.3 }
];

export const AVERAGE_HEIGHT_TOC = [
    { id: 'average-height-by-country', label: 'Average Height by Country' },
    { id: 'tallest-description', label: 'Tallest Populations' },
    { id: 'shortest-description', label: 'Shortest Populations' },
    { id: 'male-female-gap', label: 'The Male-Female Gap' },
    { id: 'selected-countries-cards', label: 'Selected Countries' },
    { id: 'extremes', label: 'Global Height Extremes' },
    { id: 'why-average-height-differs-by-country', label: 'Why Height Differs' },
    { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' }
];

export const AVERAGE_HEIGHT_FAQ = [
    {
        id: "why-nederlands-tallest",
        q: "Why are the Dutch the tallest people in the world?",
        a: "It is a combination of natural selection, excellent healthcare, and high dairy consumption. Studies suggest that taller Dutch men historically had more children, and the universal healthcare system ensures that children reach their full genetic potential without being stunted by illness or poor nutrition."
    },
    {
        id: "height-genetics-vs-nutrition",
        q: "Is height determined more by genetics or nutrition?",
        a: "Genetics accounts for about 60-80% of individual height variation. However, nutrition and environmental factors (like childhood health) determine whether a person actually reaches their genetic ceiling. This is why populations in developing nations often see rapid height increases as their economies grow."
    },
    {
        id: "when-do-we-stop-growing",
        q: "At what age do people typically stop growing taller?",
        a: "Most girls reach their full adult height by age 14 or 15. Most boys reach their adult height by age 16 or 17, though some may continue to grow slightly until their early twenties when the growth plates (epiphyses) in their long bones finally close."
    }
];
