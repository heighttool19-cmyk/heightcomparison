'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowUpCircle, Search, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore, useUnitStore } from '@/store';
import Navbar from '@/components/Navbar';

// --- TOC Data ---
const tocItems = [
    { id: 'average-height-by-country', label: 'Average Height by Country' },
    { id: 'tallest-countries-in-the-world', label: 'Tallest Countries in the World' },
    { id: 'shortest-countries-in-the-world', label: 'Shortest Countries in the World' },
    { id: 'tallest-and-shortest-countries-by-average-height', label: 'Tallest and Shortest Countries by Average Height' },
    { id: 'average-male-height-by-country', label: 'Average Male Height by Country' },
    { id: 'average-female-height-by-country', label: 'Average Female Height by Country' },
    { id: 'average-height-in-selected-countries', label: 'Average Height in Selected Countries' },
    { id: 'average-height-chart-for-men', label: 'Average Height Chart for Men' },
    { id: 'global-average-height', label: 'Global Average Height' },
    { id: 'tallest-man-in-the-world', label: 'Tallest Man in the World' },
    { id: 'shortest-man-in-the-world', label: 'Shortest Man in the World' },
    { id: 'tallest-female-in-the-world', label: 'Tallest Female in the World' },
    { id: 'shortest-female-in-the-world', label: 'Shortest Female in the World' },
    { id: 'human-height-distribution', label: 'Human Height Distribution' },
    { id: 'why-average-height-differs-by-country', label: 'Why Average Height Differs by Country' },
    {
        id: 'frequently-asked-questions',
        label: 'Frequently Asked Questions',
        subItems: [
            { id: 'average-height-of-men-in-the-world', label: 'What is the average height of men in the world?' },
            { id: 'average-height-for-a-woman-worldwide', label: 'What is an average height for a woman worldwide?' },
            { id: 'which-country-has-the-tallest-people', label: 'Which country has the tallest people?' },
            { id: 'has-average-human-height-been-increasing-over-time', label: 'Has average human height been increasing over time?' },
            { id: 'shortest-country-in-the-world-by-average-height', label: 'What is the shortest country in the world by average height?' }
        ]
    }
];

// --- FAQ Data ---
const QA = [
    {
        id: "average-height-of-men-in-the-world",
        q: "What is the average height of men in the world?",
        a: "The global average height for adult men is approximately 171 cm (5'7\"). This weighted figure draws from NCD Risk Factor Collaboration and WHO data. It is pulled lower by the large populations of South and Southeast Asia, where averages fall between 160 and 168 cm. Men in high-income European countries average significantly more, often 178 to 184 cm."
    },
    {
        id: "average-height-for-a-woman-worldwide",
        q: "What is an average height for a woman worldwide?",
        a: "The global average height for adult women is approximately 159 cm (5'3\"). Dutch and Montenegrin women average around 170 cm. Women in Guatemala and the Philippines average closer to 149 to 150 cm. Most women in Western countries fall between 162 and 168 cm."
    },
    {
        id: "which-country-has-the-tallest-people",
        q: "Which country has the tallest people?",
        a: "The Netherlands holds the top spot for both men and women in most recent datasets. Dutch men average 183.8 cm (approximately 6'0\") and Dutch women average 170.4 cm (5'7\"). Montenegro and Estonia follow closely. The Netherlands has held this position for several decades, attributed to dairy-rich diets, strong public health infrastructure, and genetic factors in the population."
    },
    {
        id: "has-average-human-height-been-increasing-over-time",
        q: "Has average human height been increasing over time?",
        a: "Yes, substantially. Average height has risen sharply over the past 150 years in almost every country, driven by improvements in nutrition, sanitation, vaccination, and healthcare. The most dramatic recent gains occurred in East Asia: South Korean men gained around 6 cm across two generations following rapid economic development. Gains in Western Europe have largely plateaued since the 1980s."
    },
    {
        id: "shortest-country-in-the-world-by-average-height",
        q: "What is the shortest country in the world by average height?",
        a: "Timor-Leste records the lowest combined average globally, with men averaging 159.8 cm and women 152.3 cm. Guatemala and Laos follow closely. These low averages reflect historical nutritional constraints and limited healthcare access rather than genetic limits on growth potential."
    }
];

// --- Global Height Table Data ---
const heightData = [
    { rank: 1, flag: '🇳🇱', name: 'Netherlands', maleCm: 183.8, femaleCm: 170.4 },
    { rank: 2, flag: '🇲🇪', name: 'Montenegro', maleCm: 183.3, femaleCm: 170 },
    { rank: 3, flag: '🇪🇪', name: 'Estonia', maleCm: 182.8, femaleCm: 168.7 },
    { rank: 4, flag: '🇧🇦', name: 'Bosnia & Herz.', maleCm: 182.5, femaleCm: 167.5 },
    { rank: 5, flag: '🇮🇸', name: 'Iceland', maleCm: 182.1, femaleCm: 168.9 },
    { rank: 6, flag: '🇩🇰', name: 'Denmark', maleCm: 181.9, femaleCm: 169.5 },
    { rank: 7, flag: '🇨🇿', name: 'Czechia', maleCm: 181.2, femaleCm: 168 },
    { rank: 8, flag: '🇱🇻', name: 'Latvia', maleCm: 181.2, femaleCm: 168.8 },
    { rank: 9, flag: '🇸🇰', name: 'Slovakia', maleCm: 181, femaleCm: 167.1 },
    { rank: 10, flag: '🇺🇦', name: 'Ukraine', maleCm: 181, femaleCm: 166.6 },
    { rank: 11, flag: '🇭🇷', name: 'Croatia', maleCm: 180.8, femaleCm: 166.8 },
    { rank: 12, flag: '🇷🇸', name: 'Serbia', maleCm: 180.7, femaleCm: 168.3 },
    { rank: 13, flag: '🇱🇹', name: 'Lithuania', maleCm: 180.7, femaleCm: 167.6 },
    { rank: 14, flag: '🇵🇱', name: 'Poland', maleCm: 180.7, femaleCm: 165.8 },
    { rank: 15, flag: '🇫🇮', name: 'Finland', maleCm: 180.6, femaleCm: 166.5 },
    { rank: 16, flag: '🇳🇴', name: 'Norway', maleCm: 180.5, femaleCm: 166.5 },
    { rank: 17, flag: '🇸🇪', name: 'Sweden', maleCm: 180.5, femaleCm: 166.7 },
    { rank: 18, flag: '🇩🇪', name: 'Germany', maleCm: 180.3, femaleCm: 166.2 },
    { rank: 19, flag: '🇬🇷', name: 'Greece', maleCm: 179.3, femaleCm: 165.8 },
    { rank: 20, flag: '🇧🇪', name: 'Belgium', maleCm: 179.1, femaleCm: 163.4 },
    { rank: 21, flag: '🇮🇪', name: 'Ireland', maleCm: 179, femaleCm: 164.5 },
    { rank: 22, flag: '🇦🇺', name: 'Australia', maleCm: 178.8, femaleCm: 164.7 },
    { rank: 23, flag: '🇨🇦', name: 'Canada', maleCm: 178.8, femaleCm: 164.7 },
    { rank: 24, flag: '🇫🇷', name: 'France', maleCm: 178.6, femaleCm: 164.5 },
    { rank: 25, flag: '🇬🇧', name: 'United Kingdom', maleCm: 178.2, femaleCm: 163.9 },
    { rank: 26, flag: '🇳🇿', name: 'New Zealand', maleCm: 177.7, femaleCm: 164.7 },
    { rank: 27, flag: '🇷🇺', name: 'Russia', maleCm: 176.7, femaleCm: 164.5 },
    { rank: 28, flag: '🇺🇸', name: 'USA', maleCm: 176.9, femaleCm: 163.3 },
    { rank: 29, flag: '🇹🇷', name: 'Turkey', maleCm: 176.4, femaleCm: 161.8 },
    { rank: 30, flag: '🇪🇸', name: 'Spain', maleCm: 176.1, femaleCm: 162 },
    { rank: 31, flag: '🇧🇷', name: 'Brazil', maleCm: 175.7, femaleCm: 162.4 },
    { rank: 32, flag: '🇨🇳', name: 'China', maleCm: 175.7, femaleCm: 163.5 },
    { rank: 33, flag: '🇮🇷', name: 'Iran', maleCm: 175.6, femaleCm: 161.2 },
    { rank: 34, flag: '🇰🇷', name: 'South Korea', maleCm: 175.5, femaleCm: 163.2 },
    { rank: 35, flag: '🇯🇵', name: 'Japan', maleCm: 170.8, femaleCm: 158 },
    { rank: 36, flag: '🇲🇽', name: 'Mexico', maleCm: 169, femaleCm: 158 },
    { rank: 37, flag: '🇮🇳', name: 'India', maleCm: 166.5, femaleCm: 152.6 },
    { rank: 38, flag: '🇱🇰', name: 'Sri Lanka', maleCm: 166, femaleCm: 153 },
    { rank: 39, flag: '🇵🇰', name: 'Pakistan', maleCm: 166.9, femaleCm: 154.2 },
    { rank: 40, flag: '🇮🇩', name: 'Indonesia', maleCm: 163.6, femaleCm: 152.8 },
    { rank: 41, flag: '🇵🇭', name: 'Philippines', maleCm: 163.2, femaleCm: 149.6 },
    { rank: 42, flag: '🇧🇩', name: 'Bangladesh', maleCm: 163, femaleCm: 152.1 },
    { rank: 43, flag: '🇳🇵', name: 'Nepal', maleCm: 163, femaleCm: 150.9 },
    { rank: 44, flag: '🇬🇹', name: 'Guatemala', maleCm: 163.4, femaleCm: 149.4 },
    { rank: 45, flag: '🇱🇦', name: 'Laos', maleCm: 162, femaleCm: 153 },
    { rank: 46, flag: '🇹🇱', name: 'Timor-Leste', maleCm: 159.8, femaleCm: 152.3 }
];

export default function page() {
    const { theme } = useThemeStore();
    const { unitSystem, setUnitSystem } = useUnitStore();
    const [activeSection, setActiveSection] = useState<string>('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const isClickScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Table State
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof heightData[0] | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

    // Sync Theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Intersection Observer for TOC
    useEffect(() => {
        const visibleSections = new Map<string, IntersectionObserverEntry>();
        let historyTimeout: NodeJS.Timeout;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isClickScrolling.current) return;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.set(entry.target.id, entry);
                    } else {
                        visibleSections.delete(entry.target.id);
                    }
                });

                if (visibleSections.size > 0) {
                    let closestSection = '';
                    let minTop = Infinity;

                    visibleSections.forEach((entry, id) => {
                        const topPos = entry.boundingClientRect.top;
                        if (topPos >= 0 && topPos < minTop) {
                            minTop = topPos;
                            closestSection = id;
                        }
                    });

                    if (!closestSection) {
                        closestSection = Array.from(visibleSections.keys())[0];
                    }

                    if (closestSection && closestSection !== activeSection) {
                        setActiveSection(closestSection);

                        clearTimeout(historyTimeout);
                        historyTimeout = setTimeout(() => {
                            if (window.history.replaceState) {
                                window.history.replaceState(null, '', `#${closestSection}`);
                            }
                        }, 150);
                    }
                }
            },
            { rootMargin: '-70px 0px -40% 0px', threshold: 0 }
        );

        const headings = document.querySelectorAll('h1[id], h2[id], h3[id], section[id]');
        headings.forEach((h) => observer.observe(h));

        return () => {
            observer.disconnect();
            clearTimeout(historyTimeout);
        };
    }, [activeSection]);

    const TOCLink = ({ item, isSub = false }: { item: { id: string; label: string; subItems?: { id: string; label: string }[] }, isSub?: boolean }) => {
        const checkActiveRecursive = (node: { id: string; subItems?: { id: string; label: string }[] }): boolean => {
            if (activeSection === node.id) return true;
            if (node.subItems) return node.subItems.some(sub => checkActiveRecursive(sub));
            return false;
        };

        const isActive = checkActiveRecursive(item);

        const handleLinkClick = () => {
            isClickScrolling.current = true;
            setActiveSection(item.id);
            if (window.history.pushState) window.history.pushState(null, '', `#${item.id}`);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => { isClickScrolling.current = false; }, 1000);
        };

        return (
            <li className={`transition-all duration-300 ${isSub ? 'mt-2' : 'mt-3'}`}>
                <a href={`#${item.id}`} onClick={handleLinkClick} className={`block transition-all duration-300 border-l-2 pl-3 ${isActive ? 'text-accent border-accent font-bold translate-x-1' : 'text-muted hover:text-foreground border-transparent'}`}>
                    {item.label}
                </a>
                {item.subItems && (
                    <ul className="pl-4 ml-3 border-l border-border/50 mt-2 space-y-2">
                        {item.subItems.map(sub => <TOCLink key={sub.id} item={sub} isSub={true} />)}
                    </ul>
                )}
            </li>
        );
    };

    // Helpers
    const cmToFtIn = (cm: number) => {
        const totalInches = cm / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        if (inches === 12) return `${ft + 1}'0"`;
        return `${ft}'${inches}"`;
    };

    const handleSort = (key: keyof typeof heightData[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedData = useMemo(() => {
        let sortableItems = [...heightData];
        if (searchQuery) {
            sortableItems = sortableItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [searchQuery, sortConfig]);

    return (
        <div className="flex flex-col min-h-screen bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            <Navbar activePage="average-height" />

            <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative pt-8">

                {/* --- LEFT SIDEBAR (TOC) --- */}
                <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                    <div className="sticky top-24 bg-surface border border-border rounded-3xl p-6 shadow-xl">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em]">Table of Contents</h3>
                        <ul className="text-sm font-medium mt-4">
                            {tocItems.map(item => (
                                <TOCLink key={item.id} item={item} />
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* H1 Intro */}
                        <div className="space-y-6 text-center sm:text-left">
                            <h1 id="average-height-by-country" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                                Average Height by Country
                            </h1>
                            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                            <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0">
                                Average height varies more than most people expect. The gap between the world's tallest and shortest populations spans nearly 24 cm for men and 21 cm for women. This page compares average human height around the world for both sexes, from the Netherlands at the top to Timor-Leste at the foot, drawing on data from the    <a href='https://elifesciences.org/articles/13410'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline">NCD Risk Factor Collaboration</a> and <a href='http://worldpopulationreview.com/country-rankings/average-height-by-country'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent font-semibold hover:underline">World Population Review</a>. Men and women follow the same broad geographic pattern, with Northern Europe at the top and parts of South and Central Asia at the lower end.
                            </p>
                        </div>

                        {/* Table Section */}
                        <section className="scroll-mt-24">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height by Country (Global Table)</h2>
                                {/* Synced Unit Toggle */}
                                <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                                    <button onClick={() => setUnitSystem('metric')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${unitSystem === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>Metric (cm)</button>
                                    <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${unitSystem === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>US (ft/in)</button>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed mb-6">
                                The table below shows average male height by country, average female height, and combined average across 46 nations. Click any column header to sort. Use the search field to find a specific country.
                            </p>

                            <div className="bg-surface border border-border p-4 rounded-3xl shadow-sm mb-8">
                                {/* Search Bar */}
                                <div className="relative mb-4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search countries..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-bg border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent transition-colors"
                                    />
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-border/50">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="bg-bg border-b border-border text-foreground font-bold uppercase tracking-wider text-xs">
                                            <tr>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('rank')}>
                                                    <div className="flex items-center gap-1">Rank <ArrowUpDown size={14} /></div>
                                                </th>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('name')}>
                                                    <div className="flex items-center gap-1">Country <ArrowUpDown size={14} /></div>
                                                </th>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('maleCm')}>
                                                    <div className="flex items-center gap-1">Avg Male <ArrowUpDown size={14} /></div>
                                                </th>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('femaleCm')}>
                                                    <div className="flex items-center gap-1">Avg Female <ArrowUpDown size={14} /></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-muted">
                                            {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((country) => (
                                                <tr key={country.name} className="hover:bg-bg/50 transition-colors">
                                                    <td className="px-6 py-4">{country.rank}</td>
                                                    <td className="px-6 py-4 font-bold text-foreground flex items-center gap-2">
                                                        <span>{country.flag}</span> {country.name}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-foreground">
                                                        {unitSystem === 'metric' ? `${country.maleCm} cm` : cmToFtIn(country.maleCm)}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-foreground">
                                                        {unitSystem === 'metric' ? `${country.femaleCm} cm` : cmToFtIn(country.femaleCm)}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-8 text-center text-muted">No countries found matching "{searchQuery}"</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-xs text-muted/60 mt-3 px-2">
                                    Source: NCD Risk Factor Collaboration (NCD-RisC) / World Population Review. Adults aged ~19.
                                </div>
                            </div>
                        </section>

                        <section id="tallest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest Countries in the World</h2>

                            {/* PLACEHOLDER: BISWA'S VISUAL */}
                            <div className="bg-bg border border-border border-dashed p-12 rounded-2xl flex items-center justify-center text-muted/50 my-6">
                                [Visual: Dual horizontal bar chart — top 10 tallest nations, male and female, with sex toggle]
                            </div>

                            <p className="text-muted leading-relaxed">
                                The Netherlands has topped global male height rankings for decades, with men averaging 183.8 cm, just under 6'1". Denmark sits at 181.9 cm, Germany at 180.3 cm, and Norway at 180.5 cm.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Three factors reinforce each other across this cluster: generous dairy consumption from early childhood, strong public healthcare that reduces illness during growth years, and long-term genetic selection in well-nourished populations.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Montenegro and Estonia have recently overtaken many traditionally tall Western European nations, reflecting rapid improvements in living standards following the post-Soviet period.
                            </p>
                        </section>

                        <section id="shortest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Shortest Countries in the World</h2>

                            {/* PLACEHOLDER: BISWA'S VISUAL */}
                            <div className="bg-bg border border-border border-dashed p-12 rounded-2xl flex items-center justify-center text-muted/50 my-6">
                                [Visual: Dual horizontal bar chart — 10 shortest nations, male and female, with sex toggle]
                            </div>

                            <p className="text-muted leading-relaxed">
                                The shortest populations sit predominantly in South and Southeast Asia and Central America. Timor-Leste records the lowest combined average globally, followed closely by Guatemala and Laos.
                            </p>
                            <p className="text-muted leading-relaxed">
                                In Guatemala, chronic malnutrition affects nearly a third of children under five, directly stunting skeletal development. Bangladesh and Nepal face similar constraints: protein-scarce diets, limited healthcare access, and structural poverty that limits growth potential from birth.
                            </p>
                            <p className="text-muted leading-relaxed">
                                These figures are not genetic ceilings. They are largely markers of historical underdevelopment, reversible, as South Korea and China demonstrated across the 20th century.
                            </p>
                        </section>

                        <section id="tallest-and-shortest-countries-by-average-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest and Shortest Countries by Average Height</h2>

                            {/* PLACEHOLDER: BISWA'S VISUAL */}
                            <div className="bg-bg border border-border border-dashed p-12 rounded-2xl flex items-center justify-center text-muted/50 my-6">
                                [Visual: Grouped bar chart — 10 countries spanning the full global height range, male and female bars side by side]
                            </div>

                            <p className="text-muted leading-relaxed">
                                Average height varies widely due to genetics, diet quality, childhood health, and economic development. Northern European populations consistently rank among the tallest, while some South Asian and Central American countries show shorter averages shaped by historical nutritional limitations.
                            </p>
                        </section>

                        <section id="average-male-height-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Male Height by Country</h2>
                            <p className="text-muted leading-relaxed">
                                The average height of a man worldwide is approximately 171 cm (5'7"). This figure masks a wide spread, from Dutch men at 183.8 cm down to Timor-Leste at 159.8 cm. Northern and Eastern European men are the tallest group globally, averaging 178 to 184 cm. North Americans and Australians sit in the 176 to 179 cm band.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Japan at 170.8 cm sits noticeably shorter than South Korea at 175.5 cm — a gap that has widened as South Korean diets and healthcare improved faster following the 1960s economic boom. Iran at 175.6 cm sits mid-table. India at 166.5 cm and Bangladesh at 163 cm sit at the lower end of the Asian cohort. Guatemala at 163.4 cm and Timor-Leste at 159.8 cm reflect the most severe documented nutritional constraints on record.
                            </p>
                        </section>

                        <section id="average-female-height-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Female Height by Country</h2>
                            <p className="text-muted leading-relaxed">
                                The average height of a woman worldwide is approximately 159 cm (5'3"). Dutch and Montenegrin women, averaging 170.4 cm and 170.0 cm respectively, are the tallest female populations on record. Russia at 164.5 cm consistently appears in global lists alongside Eastern European countries that make up most of the top ten.
                            </p>
                            <p className="text-muted leading-relaxed">
                                South Korean women at 163.2 cm stand notably taller than Japanese women at 158.0 cm, a gap that has grown over the past half-century. Filipino women average 149.6 cm and Guatemalan women 149.4 cm, the lowest verified female average in the Americas. The average height for women in Japan was around 148 cm in the 1950s and has since climbed by a full ten centimetres, one of the steepest documented rises for any female population.
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                <p className="text-sm font-medium text-foreground/80">
                                    Across virtually every population, men are taller than women by 12 to 15 centimetres. This gap holds consistent across very different absolute height ranges, the difference in the Netherlands is roughly the same as in Bangladesh. It reflects hormonal differences during adolescence: testosterone drives a longer growth spurt in males, while earlier oestrogen onset in females closes growth plates sooner. The sex gap is not meaningfully affected by nutrition or economic development.
                                </p>
                            </div>
                        </section>

                        <section id="average-height-in-selected-countries" className="space-y-6 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height in Selected Countries</h2>
                            <div className="grid md:grid-cols-1 gap-4">
                                {/* Country Card 1 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Netherlands</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">183.8 cm (6'0")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">170.4 cm (5'7")</span></div>
                                    <p className="text-sm text-muted">Dutch men have topped global rankings for decades. Dairy-rich diets and universal healthcare drive the result.</p>
                                </div>
                                {/* Country Card 2 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">United Kingdom</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">178.2 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.9 cm (5'5")</span></div>
                                    <p className="text-sm text-muted">UK sits mid-table in Europe. Heights vary by region — northern England and Scotland tend to average slightly taller.</p>
                                </div>
                                {/* Country Card 3 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Japan</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">170.8 cm (5'7")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">158.0 cm (5'2")</span></div>
                                    <p className="text-sm text-muted">Japanese heights have risen sharply since the 1950s. South Korean men at 175.5 cm have since overtaken their Japanese neighbours.</p>
                                </div>
                                {/* Country Card 4 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Bangladesh</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">163.0 cm (5'4")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">152.1 cm (4'12")</span></div>
                                    <p className="text-sm text-muted">High rates of childhood malnutrition have historically limited growth. Urban populations show modest gains over recent decades.</p>
                                </div>
                                {/* Country Card 5 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Iran</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">175.6 cm (5'9")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">161.2 cm (5'3")</span></div>
                                    <p className="text-sm text-muted">One of the fastest documented rises in the Middle East — average male height has increased an estimated 5 to 6 cm over 40 years.</p>
                                </div>
                                {/* Country Card 6 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Canada</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">178.8 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">164.7 cm (5'5")</span></div>
                                    <p className="text-sm text-muted">Canada's figures mirror Australia's closely, reflecting a well-nourished, high-income population profile. Growth has plateaued since the 1990s.</p>
                                </div>
                                {/* Country Card 7 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Ireland</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">179.0 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">164.5 cm (5'5")</span></div>
                                    <p className="text-sm text-muted">Ireland sits in the upper quarter of European rankings. Heights have risen steadily since the mid-20th century.</p>
                                </div>
                                {/* Country Card 8 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Sri Lanka</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">166.0 cm (5'5")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">153.0 cm (5'0")</span></div>
                                    <p className="text-sm text-muted">Urban populations in Colombo show measurable height gains over two generations. Rural areas have lagged due to food insecurity.</p>
                                </div>
                                {/* Country Card 9 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">South Korea</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">175.5 cm (5'9")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.2 cm (5'4")</span></div>
                                    <p className="text-sm text-muted">One of the largest documented generational height increases ever recorded — men gained around 6 cm across two generations post-war.</p>
                                </div>
                                {/* Country Card 10 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">India</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">166.5 cm (5'5")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">152.6 cm (5'0")</span></div>
                                    <p className="text-sm text-muted">India's national average masks large regional variation. Men in Punjab average around 172 to 174 cm. Urban areas show consistent gains.</p>
                                </div>
                                {/* Country Card 11 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">USA</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">176.9 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.3 cm (5'4")</span></div>
                                    <p className="text-sm text-muted">The US was once third tallest globally. It now sits around 47th for men, reflecting diet quality diverging from European peers after the 1970s.</p>
                                </div>
                                {/* Country Card 12 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2">Denmark</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">181.9 cm (5'11")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">169.5 cm (5'7")</span></div>
                                    <p className="text-sm text-muted">Denmark consistently ranks in the global top five. Strong public healthcare and high dairy consumption from early childhood contribute.</p>
                                </div>
                            </div>
                        </section>

                        <section id="average-height-chart-for-men" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height Chart for Men</h2>
                            <p className="text-muted leading-relaxed">
                                The chart below shows how male height benchmarks stack up across major world regions, from Northern Europe at the top to Central America at the foot. Country-level data varies within each region.
                            </p>
                        </section>

                        <section id="global-average-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Global Average Height</h2>

                            <div className="grid sm:grid-cols-2 gap-4 my-6">
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Global average male height</span>
                                    <span className="text-4xl font-black text-foreground">171 cm</span>
                                    <span className="text-lg font-bold text-accent mt-1">5 ft 7 in</span>
                                </div>
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Global average female height</span>
                                    <span className="text-4xl font-black text-foreground">159 cm</span>
                                    <span className="text-lg font-bold text-accent mt-1">5 ft 3 in</span>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed">
                                <a href='https://www.who.int/data/gho' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">The World Health Organization </a> and NCD Risk Factor Collaboration place the global average male height at approximately 171 cm and the global average female height at approximately 159 cm. These weighted figures pull lower than most Western country averages because they account for the large populations of South and Southeast Asia.
                            </p>
                            <p className="text-muted leading-relaxed">
                                The global figure has been rising since the early 20th century, with the most dramatic gains in East Asia. South Korea and China gained around 5 to 8 cm per generation since the 1950s. Gains in Western Europe, which started earlier, have largely plateaued since the 1980s.
                            </p>
                        </section>

                        {/* Extremes Section */}
                        <div className="grid md:grid-cols-1 gap-8 pt-6">
                            <section id="tallest-man-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Tallest Man in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Robert Wadlow of Alton, Illinois remains the tallest person in documented human history at 272 cm (8'11"). His pituitary gland produced unchecked growth hormone from birth, and his height had not yet peaked when he died in 1940 aged 22. The Guinness record for the tallest living man belongs to Turkey's Sultan Kösen at 251 cm (8'3"), whose pituitary tumour was treated surgically, halting further growth.
                                </p>

                            </section>

                            <section id="shortest-man-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Shortest Man in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Chandra Bahadur Dangi of Nepal, verified by Guinness World Records in 2012, was the shortest adult male ever documented at 54.6 cm (1'9"). He lived to 75, working as a farmer and craftsman. He was measured for the first time by Guinness when already in his seventies, remarkable given the health complications often associated with severe growth disorders.
                                </p>

                            </section>

                            <section id="tallest-female-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Tallest Female in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Zeng Jinlian of Hunan Province, China holds the record for the tallest woman in verified medical history at 246.3 cm (8'1"). Born in 1964, she grew rapidly due to pituitary gigantism and died at 17 in 1982. The current living record belongs to Turkey's Rumeysa Gelgi at 215.2 cm (7'1"), a web developer and disability advocate holding multiple Guinness titles.
                                </p>
                            </section>

                            <section id="shortest-female-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Shortest Female in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Jyoti Amge of Nagpur, India has held the Guinness World Record for the shortest living woman since 2011 at 62.8 cm (2'1"). Her condition is achondroplasia, the most common form of dwarfism. She is also a working Bollywood actress who appeared in the US television series American Horror Story.
                                </p>
                            </section>
                        </div>

                        {/* Extreme Data Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Tallest man ever</span>
                                <span className="block font-bold text-foreground">Robert Wadlow</span>
                                <span className="block text-2xl font-black text-accent my-1">272 cm</span>
                                <span className="block text-xs font-medium text-muted">8'11" · USA · d. 1940</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Shortest man ever</span>
                                <span className="block font-bold text-foreground">Chandra Bahadur Dangi</span>
                                <span className="block text-2xl font-black text-accent my-1">54.6 cm</span>
                                <span className="block text-xs font-medium text-muted">1'9" · Nepal · d. 2015</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Tallest woman ever</span>
                                <span className="block font-bold text-foreground">Zeng Jinlian</span>
                                <span className="block text-2xl font-black text-accent my-1">246.3 cm</span>
                                <span className="block text-xs font-medium text-muted">8'1" · China · d. 1982</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Shortest living woman</span>
                                <span className="block font-bold text-foreground">Jyoti Amge</span>
                                <span className="block text-2xl font-black text-accent my-1">62.8 cm</span>
                                <span className="block text-xs font-medium text-muted">2'1" · India</span>
                            </div>
                        </div>

                        <section id="human-height-distribution" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Human Height Distribution</h2>

                            {/* PLACEHOLDER: BISWA'S VISUAL */}
                            <div className="bg-bg border border-border border-dashed p-12 rounded-2xl flex items-center justify-center text-muted/50 my-6">
                                [Visual: Bell curve — shaded bands at ±1 SD (68%) and ±2 SD (95%), global male average marker at 171 cm]
                            </div>


                            <p className="text-muted leading-relaxed">
                                Human height follows a normal distribution. When plotted across a large population, the data forms a near-perfect bell curve, most individuals fall close to the mean, with fewer people at either extreme. Roughly 68% of men fall within one standard deviation of the global mean, approximately 164 to 178 cm. The standard deviation for male height globally is approximately 7 cm. A man at 185 cm sits roughly two standard deviations above the global mean, taller than approximately 97.5% of the world's male population.
                            </p>
                            <p className="text-muted leading-relaxed">
                                For women it is slightly smaller at around 6 cm.
                            </p>

                            <div className="overflow-x-auto border border-border rounded-xl mt-4">
                                <table className="w-full text-sm text-center">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-4 py-3">171 cm (global avg)</th>
                                            <th className="px-4 py-3">−1 SD</th>
                                            <th className="px-4 py-3">+1 SD</th>
                                            <th className="px-4 py-3">−2 SD</th>
                                            <th className="px-4 py-3">+2 SD</th>
                                            <th className="px-4 py-3">68%</th>
                                            <th className="px-4 py-3">95%</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted font-mono">
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-4 py-3"></td>
                                            <td className="px-4 py-3">164 cm (−1 SD)</td>
                                            <td className="px-4 py-3">178 cm (+1 SD)</td>
                                            <td className="px-4 py-3">157 cm (−2 SD)</td>
                                            <td className="px-4 py-3">185 cm (+2 SD)</td>
                                            <td className="px-4 py-3"></td>
                                            <td className="px-4 py-3"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-center text-muted mt-2">Global male height distribution · SD ≈ 7 cm · Source: NCD-RisC</p>
                        </section>

                        <section id="why-average-height-differs-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Why Average Height Differs by Country</h2>
                            <p className="text-muted leading-relaxed">
                                Height is shaped by both genetics and environment. Genetics sets the theoretical ceiling, tall parents tend to produce taller children but whether a child reaches that ceiling depends almost entirely on what happens during the first two decades of life.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Nutrition is the single strongest environmental determinant of adult height. Adequate protein and micronutrients during the first 1,000 days of life are critical to skeletal development. Dairy and meat availability in childhood consistently predicts national height rankings.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Healthcare access determines whether childhood illnesses divert energy away from growth. Countries with strong vaccination rates and low disease burdens consistently rank taller.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Economic development underpins both nutrition and healthcare. GDP per capita correlates strongly with average height because wealth enables better food, cleaner water, and medical care.
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                <p className="text-sm font-medium text-foreground/80">
                                    The United States is the most telling case study: in 1914, American men ranked third tallest in the world. Today they sit around 47th globally, not because their genetics changed but because diet quality declined relative to European peers after the 1970s.
                                </p>
                            </div>
                        </section>

                        {/* FAQ Accordion Section */}
                        <div className="border border-border rounded-[2.5rem] overflow-hidden bg-surface transition-colors duration-500 shadow-sm mt-12">
                            <div className="px-8 md:px-12 pt-10 pb-8 text-center sm:text-left space-y-2 border-b border-border">
                                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                    <HelpCircle size={12} /> HELP CENTER
                                </div>
                                <h2 id="frequently-asked-questions" className="text-3xl font-black text-foreground scroll-mt-24">Frequently Asked Questions</h2>
                            </div>

                            <div className="px-6 md:px-10 py-6 flex flex-col gap-3">
                                {QA.map((item, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/50 bg-bg shadow-lg shadow-accent/5' : 'border-border bg-bg hover:border-accent/30'}`}
                                        >
                                            <button
                                                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                            >
                                                <h3 id={item.id} className={`text-sm font-bold transition-colors duration-200 scroll-mt-24 ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{item.q}</h3>
                                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className={`shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-muted'}`}>
                                                    <ChevronDown size={18} />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                                                        <div className="px-5 pt-0 pb-5 border-t border-border/40">
                                                            <p className="text-sm text-muted leading-relaxed pt-4 whitespace-pre-wrap">
                                                                {item.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* References Section */}
                        <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8">
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Primary Data Sources</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016. Vol. 5, e13410. doi: 10.7554/eLife.13410. <br /><a href="https://elifesciences.org/articles/13410" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://elifesciences.org/articles/13410</a></li>
                                <li>Rodriguez-Martinez A, Zhou B, Sophiea MK et al. (NCD-RisC). Height and body-mass index trajectories of school-aged children and adolescents from 1985 to 2019 in 200 countries and territories. The Lancet, 2020. Vol. 396, pp. 1511–1524. doi: 10.1016/S0140-6736(20)31859-6. <br /><a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31859-6/fulltext" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31859-6/fulltext</a></li>
                                <li>World Health Organization. Child Growth Standards — Length/Height-for-Age, Weight-for-Age. WHO Department of Nutrition and Food Safety. Geneva, 2006. <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                                <li>World Health Organization. Global Health Observatory — Nutrition and Body Mass Index Data. WHO Global Health Observatory. Ongoing. <br /><a href="https://www.who.int/data/gho" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/data/gho</a></li>
                                <li>de Onis M, Garza C, Onyango AW, Martorell R (eds). WHO Child Growth Standards. Acta Paediatrica, 2006. Suppl 450:1–101. PMID: 16817523. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/16817523/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/16817523/</a></li>
                            </ul>

                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">US Government — CDC and NIH</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>Centers for Disease Control and Prevention. CDC Clinical Growth Charts, 2000 (Revised 2022). National Center for Health Statistics. <br /><a href="https://www.cdc.gov/growthcharts/clinical_charts.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/growthcharts/clinical_charts.htm</a></li>
                                <li>Kuczmarski RJ, Ogden CL, Guo SS et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital and Health Statistics. Series 11, No. 246, 2002. PMID: 15190009. <br /><a href="https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf</a></li>
                                <li>Centers for Disease Control and Prevention — NCHS. National Health and Nutrition Examination Survey (NHANES) — Anthropometric Data. Ongoing survey cycles. <br /><a href="https://www.cdc.gov/nchs/nhanes/index.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/nhanes/index.htm</a></li>
                                <li>Fryar CD, Gu Q, Ogden CL, Flegal KM. Anthropometric Reference Data for Children and Adults: United States, 2011–2014. Vital and Health Statistics. Series 3, No. 39, August 2016. PMID: 29446336. <br /><a href="https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf</a></li>
                                <li>National Institutes of Health — National Heart, Lung, and Blood Institute. Classification of Overweight and Obesity by BMI. NIH Publication No. 98-4083, 1998. <br /><a href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmi-m.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmi-m.htm</a></li>
                            </ul>

                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Peer-Reviewed Research Papers</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>Devine BJ. Gentamicin therapy. Drug Intelligence and Clinical Pharmacy, 1974. Vol. 8, pp. 650–655. (Original publication of the Devine ideal body weight formula.) <br /><a href="https://pubmed.ncbi.nlm.nih.gov/?term=Devine+BJ+gentamicin+1974+ideal+body+weight" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/?term=Devine+BJ+gentamicin+1974+ideal+body+weight</a></li>
                                <li>Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. Determination of ideal body weight for drug dosage calculations. American Journal of Hospital Pharmacy, 1983. Vol. 40, pp. 1016–1019. PMID: 6869387. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/6869387/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/6869387/</a></li>
                                <li>Pai MP, Paloucek FP. The origin of the "ideal" body weight equations. Annals of Pharmacotherapy, 2000. Vol. 34, No. 9, pp. 1066–1069. doi: 10.1345/aph.19381. PMID: 10981254. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/10981254/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/10981254/</a></li>
                                <li>Janmahasatian S, Duffull SB, Ash S, Ward LC, Byrne NM, Green B. Quantification of lean bodyweight. Clinical Pharmacokinetics, 2005. Vol. 44, No. 10, pp. 1051–1065. doi: 10.2165/00003088-200544100-00004. PMID: 16176118. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/16176118/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/16176118/</a></li>
                                <li>Stulp G, Buunk AP, Pollet TV. Human height is positively related to interpersonal dominance in dyadic interactions. PLOS ONE, 2013. Vol. 8, Issue 2. PMID: 23382931. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/23382931/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/23382931/</a></li>
                                <li>Flegal KM, Ogden CL, Wei R, Kuczmarski RL, Johnson CL. Prevalence of obesity in US adults by age and sex. JAMA, 2002. Vol. 288, pp. 1723–1727. doi: 10.1001/jama.288.14.1723. PMID: 12365955. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/12365955/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/12365955/</a></li>
                            </ul>

                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">United Nations and International Bodies</h3>
                            <ul className="space-y-3 break-words overflow-hidden">
                                <li>UNICEF / WHO / World Bank. Joint Child Malnutrition Estimates — Levels and Trends. Edition 2023. <br /><a href="https://data.unicef.org/topic/nutrition/malnutrition/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://data.unicef.org/topic/nutrition/malnutrition/</a></li>
                                <li>Food and Agriculture Organization of the United Nations. The State of Food Security and Nutrition in the World 2023. FAO, IFAD, UNICEF, WFP, WHO. Rome, 2023. doi: 10.4060/cc3017en. <br /><a href="https://www.fao.org/publications/sofi/en/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.fao.org/publications/sofi/en/</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t border-border mt-auto">
                <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/about" className="hover:text-foreground">About</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <button className="hover:text-foreground">FAQ</button>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/terms" className="hover:text-foreground">Terms</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                    </div>
                    <div>© 2026 HeightComparison. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}