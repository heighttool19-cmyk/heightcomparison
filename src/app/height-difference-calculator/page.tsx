'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, HelpCircle, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore, useUnitStore } from '@/store';
import Navbar from '@/components/Navbar';

// Import our newly separated interactive components
import CalculateHeightDifference from '@/components/height-difference-calculator/CalculateHeightDifference';
import CoupleHeightDifferenceCalculator from '@/components/height-difference-calculator/CoupleHeightDifferenceCalculator';
import HeightDifferenceChart from '@/components/height-difference-calculator/HeightDifferenceChart';
import VisualHeightComparison from '@/components/height-difference-calculator/VisualHeightComparison';

const tocItems = [
    { id: 'calculate-height-difference', label: 'Calculate Height Difference' },
    { id: 'how-to-calculate-height-difference', label: 'How to Calculate Height Difference' },
    { id: 'height-difference-percentage', label: 'Height Difference Percentage' },
    { id: 'couple-height-difference-calculator', label: 'Couple Height Difference Calculator' },
    { id: 'height-difference-chart', label: 'Height Difference Chart' },
    { id: 'visual-height-comparison', label: 'Visual Height Comparison' },
    { id: 'height-difference-in-different-units', label: 'Height Difference in Different Units' },
    { id: 'try-the-height-difference-calculator', label: 'Try the Height Difference Calculator' },
    { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' }
];

const QA = [
    {
        id: "normal-height-difference-between-couples",
        q: "What is a normal height difference between couples?",
        a: "There is no fixed standard. Survey data places the average gap in male-female couples at around 12 to 15 cm (5 to 6 inches) globally. The couple height difference calculator shows the gap between any two heights. What counts as normal varies by country, culture, and individual preference."
    },
    {
        id: "how-do-you-calculate-height-difference",
        q: "How do you calculate height difference?",
        a: "Subtract the shorter person's height from the taller person's height: Height Difference = Taller Height − Shorter Height. For 180 cm and 165 cm, the difference is 15 cm. To get the percentage, divide 15 by 180 and multiply by 100, giving 8.3%."
    },
    {
        id: "can-a-height-difference-calculator-show-percentage-difference",
        q: "Can a height difference calculator show percentage difference?",
        a: "Yes. This difference in height calculator outputs both the absolute gap and the percentage difference. The percentage is calculated relative to the taller person's height and updates automatically when either value changes."
    },
    {
        id: "what-units-can-be-used-in-a-height-difference-calculator",
        q: "What units can be used in a height difference calculator?",
        a: "This height difference calculator supports centimeters and feet/inches. You can switch units at any time and both inputs and the result convert automatically. No manual conversion is needed."
    }
];

export default function HeightDifferencePage() {
    const { theme } = useThemeStore();
    const { unitSystem, setUnitSystem } = useUnitStore();

    const [activeSection, setActiveSection] = useState<string>('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const isClickScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Calculator State (for the main page logic, not the internal component)
    const [p1Cm, setP1Cm] = useState<number | ''>(180);
    const [p2Cm, setP2Cm] = useState<number | ''>(165);
    const [p1Ft, setP1Ft] = useState<number | ''>(5);
    const [p1In, setP1In] = useState<number | ''>(11);
    const [p2Ft, setP2Ft] = useState<number | ''>(5);
    const [p2In, setP2In] = useState<number | ''>(5);

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

        const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], section[id], div[id]');
        headings.forEach((h) => observer.observe(h));

        return () => {
            observer.disconnect();
            clearTimeout(historyTimeout);
        };
    }, [activeSection]);

    const TOCLink = ({ item }: { item: { id: string; label: string } }) => {
        const isActive = activeSection === item.id;
        const activeColor = 'text-accent border-accent';

        const handleLinkClick = () => {
            isClickScrolling.current = true;
            setActiveSection(item.id);

            if (window.history.pushState) {
                window.history.pushState(null, '', `#${item.id}`);
            }

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                isClickScrolling.current = false;
            }, 1000);
        };

        return (
            <li className="mt-3 transition-all duration-300">
                <a
                    href={`#${item.id}`}
                    onClick={handleLinkClick}
                    className={`block transition-all duration-300 border-l-2 pl-3 ${isActive ? `${activeColor} font-bold translate-x-1` : 'text-muted hover:text-foreground border-transparent'}`}
                >
                    {item.label}
                </a>
            </li>
        );
    };

    // Calculator Math Logic (for main page)
    const getHeights = () => {
        let h1 = 0;
        let h2 = 0;

        if (unitSystem === 'metric') {
            h1 = Number(p1Cm) || 0;
            h2 = Number(p2Cm) || 0;
        } else {
            h1 = ((Number(p1Ft) || 0) * 12 + (Number(p1In) || 0)) * 2.54;
            h2 = ((Number(p2Ft) || 0) * 12 + (Number(p2In) || 0)) * 2.54;
        }
        return { h1, h2 };
    };

    const { h1, h2 } = getHeights();
    const diffCm = Math.abs(h1 - h2);
    const diffInches = diffCm / 2.54;
    const tallerHeight = Math.max(h1, h2);
    const percentageDiff = tallerHeight > 0 ? (diffCm / tallerHeight) * 100 : 0;
    const isP2Shorter = h2 < h1;
    const shorterPersonName = isP2Shorter ? "Person 2" : "Person 1";
    const isValid = h1 > 0 && h2 > 0;

    return (
        <div className="flex flex-col min-h-screen bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            <Navbar activePage="height-difference-calculator" />

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

                        {/* Mobile TOC */}
                        {/* <div className="block lg:hidden bg-surface border border-border p-6 rounded-3xl shadow-sm text-left">
                            <h3 className="font-black text-foreground mb-4 uppercase tracking-widest text-sm border-b border-border pb-4">Table of Contents</h3>
                            <ul className="text-sm font-medium">
                                {tocItems.map(item => (
                                    <TOCLink key={item.id} item={item} />
                                ))}
                            </ul>
                        </div> */}

                        {/* H1 Intro */}
                        <div className="space-y-6 text-center sm:text-left">
                            <h1 id="height-difference-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                                Height Difference Calculator
                            </h1>
                            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                            <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0">
                                A height difference calculator compares two people&apos;s heights and returns the gap between them. Enter two heights in centimeters or feet and inches. The tool calculates the height difference and the percentage difference instantly. Compare yourself with a friend, a partner, or anyone else in seconds.
                            </p>
                        </div>

                        {/* Visual 1: Main Calculator Component */}
                        <section id="calculate-height-difference" className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Calculate Height Difference</h2>
                            <p className="text-muted leading-relaxed mb-8">
                                Use the difference in height calculator below. Enter both heights, choose your unit, and the comparison updates live.
                            </p>

                            <CalculateHeightDifference />

                            <div className="mt-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start text-xs font-bold text-muted uppercase tracking-wider">
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Free</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> No account needed</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Supports cm and ft/in</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Updates live</span>
                            </div>
                        </section>

                        <section id="how-to-calculate-height-difference" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">How to Calculate Height Difference</h2>
                            <p className="text-muted leading-relaxed">
                                Height difference calculation uses a single operation: subtract the shorter person&apos;s height from the taller person&apos;s height. The difference in height calculator identifies which person is taller automatically, so the result is always a positive number regardless of which height you enter first.
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Height difference formula:</h3>
                                <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                    Height Difference = Taller Height − Shorter Height
                                </p>

                                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-bg border border-border p-4 rounded-xl">
                                        <span className="block text-muted mb-1 font-medium">Person A</span>
                                        <span className="font-black text-foreground text-lg">180 cm</span>
                                    </div>
                                    <div className="bg-bg border border-border p-4 rounded-xl">
                                        <span className="block text-muted mb-1 font-medium">Person B</span>
                                        <span className="font-black text-foreground text-lg">165 cm</span>
                                    </div>
                                    <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl">
                                        <span className="block text-accent mb-1 font-bold">Difference</span>
                                        <span className="font-black text-foreground text-lg">180 − 165 = 15 cm</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed">
                                Subtraction is the only operation involved. The height difference calculator runs this the moment both values are filled in. No extra steps are needed.
                            </p>
                        </section>

                        <section id="height-difference-percentage" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Height Difference Percentage</h2>
                            <p className="text-muted leading-relaxed">
                                The percentage difference adds a proportional dimension to the raw gap. A 10 cm difference between two people both above 180 cm represents a much smaller relative gap than the same 10 cm between two people near 155 cm. The percentage makes the gap meaningful regardless of absolute height.
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Percentage difference formula:</h3>
                                <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                    Percentage Difference = (Height Difference ÷ Taller Height) × 100
                                </p>

                                <ul className="space-y-3 bg-bg border border-border p-5 rounded-xl text-sm sm:text-base">
                                    <li className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted font-medium">Height difference</span><span className="font-bold text-foreground">15 cm</span></li>
                                    <li className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted font-medium">Taller height</span><span className="font-bold text-foreground">180 cm</span></li>
                                    <li className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted font-medium">Calculation</span><span className="font-bold text-foreground">15 ÷ 180 × 100</span></li>
                                    <li className="flex justify-between pt-2"><span className="font-black text-foreground">Percentage difference</span><span className="font-black text-accent text-lg">8.3%</span></li>
                                </ul>
                            </div>

                            <p className="text-muted leading-relaxed">
                                This means Person B is 8.3% shorter relative to Person A. The difference in height calculator outputs this figure automatically alongside the absolute gap. Both values update live when either height changes.
                            </p>
                        </section>

                        <section id="couple-height-difference-calculator" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Couple Height Difference Calculator</h2>
                            <p className="text-muted leading-relaxed">
                                Comparing heights between romantic partners is one of the most common uses of a height difference calculator. Couples want to know how the gap looks in photos, how it compares to the average, or simply out of curiosity. The tool works the same way for any two people.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 my-6">
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Global average gap (male-female couples)</span>
                                    <span className="text-3xl font-black text-foreground">12 to 15 cm</span>
                                </div>
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">In feet and inches</span>
                                    <span className="text-3xl font-black text-accent">roughly 5 to 6 in</span>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed mb-6">
                                Survey data places the average height difference in male-female couples globally at around 12 to 15 cm (roughly 5 to 6 inches), though this varies by country and individual. There is no standard definition of a normal couple height difference. The numbers are just numbers.
                            </p>
                            <p className="text-muted leading-relaxed mb-8">
                                The couple height difference calculator works identically to the standard tool. Enter both heights and the proportional comparison shows visually alongside the figures.
                            </p>

                            {/* Visual 2: Couple Height Comparison Panel */}
                            <CoupleHeightDifferenceCalculator />
                        </section>

                        <section id="height-difference-chart" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Height Difference Chart</h2>
                            <p className="text-muted leading-relaxed mb-6">
                                The chart below covers common height pairings and their differences. Use it as a quick reference without entering values into the tool.
                            </p>

                            {/* Visual 3: Height Difference Chart Component */}
                            <HeightDifferenceChart />

                            <p className="text-muted leading-relaxed mt-6">
                                The percentage difference grows with the absolute gap but also depends on the taller height. A 15 cm gap is proportionally larger when the taller person stands at 165 cm than when they stand at 190 cm.
                            </p>
                        </section>

                        <section id="visual-height-comparison" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Visual Height Comparison</h2>
                            <p className="text-muted leading-relaxed mb-6">
                                A visual height comparison represents the gap between two people as a proportional graphic rather than a number alone. If one person is 10% taller, their bar renders 10% taller on screen. The difference becomes immediately legible without reading figures.
                            </p>

                            {/* Visual 4: Static Comparison Component */}
                            <VisualHeightComparison />

                            <p className="text-muted leading-relaxed mt-6">
                                This is especially useful when the raw number is ambiguous. A 10 cm gap between two people near 160 cm looks very different from the same gap between two people above 185 cm. The height difference calculator generates this scaled visual automatically from the values you enter.
                            </p>
                        </section>

                        <section id="height-difference-in-different-units" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Height Difference in Different Units</h2>
                            <p className="text-muted leading-relaxed">
                                You can calculate height difference in centimeters or in feet and inches. Switching units converts both inputs and the output simultaneously. No manual conversion is needed before entering values.
                            </p>

                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm my-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Person A</th>
                                            <th className="px-6 py-4">Person B</th>
                                            <th className="px-6 py-4">Difference (cm)</th>
                                            <th className="px-6 py-4">Difference (in)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-muted divide-y divide-border/50">
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">180 cm</td>
                                            <td className="px-6 py-4 font-medium text-foreground">170 cm</td>
                                            <td className="px-6 py-4 font-bold text-foreground">10 cm</td>
                                            <td className="px-6 py-4 font-bold text-accent">3.9 in</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">175 cm</td>
                                            <td className="px-6 py-4 font-medium text-foreground">160 cm</td>
                                            <td className="px-6 py-4 font-bold text-foreground">15 cm</td>
                                            <td className="px-6 py-4 font-bold text-accent">5.9 in</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">183 cm</td>
                                            <td className="px-6 py-4 font-medium text-foreground">165 cm</td>
                                            <td className="px-6 py-4 font-bold text-foreground">18 cm</td>
                                            <td className="px-6 py-4 font-bold text-accent">7.1 in</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">5&apos;11&quot; (180 cm)</td>
                                            <td className="px-6 py-4 font-medium text-foreground">5&apos;6&quot; (168 cm)</td>
                                            <td className="px-6 py-4 font-bold text-foreground">12 cm</td>
                                            <td className="px-6 py-4 font-bold text-accent">4.7 in</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">6&apos;0&quot; (183 cm)</td>
                                            <td className="px-6 py-4 font-medium text-foreground">5&apos;8&quot; (173 cm)</td>
                                            <td className="px-6 py-4 font-bold text-foreground">10 cm</td>
                                            <td className="px-6 py-4 font-bold text-accent">3.9 in</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">6&apos;2&quot; (188 cm)</td>
                                            <td className="px-6 py-4 font-medium text-foreground">5&apos;10&quot; (178 cm)</td>
                                            <td className="px-6 py-4 font-bold text-foreground">10 cm</td>
                                            <td className="px-6 py-4 font-bold text-accent">3.9 in</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-muted leading-relaxed">
                                To convert manually: divide centimeters by 2.54 to get inches, or multiply inches by 2.54 to get centimeters. The calculator handles this automatically in both directions.
                            </p>
                        </section>

                        <section id="try-the-height-difference-calculator" className="bg-surface border border-border rounded-3xl p-8 md:p-12 text-center scroll-mt-24 shadow-xl mt-8">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
                                Try the Height Difference Calculator
                            </h2>
                            <p className="text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
                                Enter two heights above to calculate height difference instantly. <br />
                                The visual comparison and percentage difference update as you type.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto mb-10">
                                <div className="flex items-start gap-3 text-base font-medium text-foreground">
                                    <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                    <span>Absolute difference and percentage difference</span>
                                </div>
                                <div className="flex items-start gap-3 text-base font-medium text-foreground">
                                    <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                    <span>Proportional visual comparison</span>
                                </div>
                                <div className="flex items-start gap-3 text-base font-medium text-foreground">
                                    <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                    <span>Supports cm and ft/in</span>
                                </div>
                                <div className="flex items-start gap-3 text-base font-medium text-foreground">
                                    <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                    <span>Free, no account, any device</span>
                                </div>
                            </div>

                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                            >
                                <ArrowUpCircle size={18} /> Scroll to top and compare now ↑
                            </button>
                        </section>

                        {/* FAQ Accordion Section */}
                        <div className="border border-border rounded-[2.5rem] overflow-hidden bg-surface transition-colors duration-500 shadow-sm mt-4">
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
                                                {/* The <h3> ID is placed here to satisfy the strict Anchor Linking requirement without breaking the button UI */}
                                                <h3 id={item.id} className={`text-sm font-bold transition-colors duration-200 scroll-mt-24 ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{item.q}</h3>
                                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className={`shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-muted'}`}>
                                                    <ChevronDown size={18} />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                                                        <div className="px-5 pt-0 pb-5 border-t border-border/40">
                                                            <p className="text-sm text-muted leading-relaxed pt-4">
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
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Sources</h3>
                            <ul className="space-y-3 break-words overflow-hidden list-disc pl-5 marker:text-muted/40">
                                <li>
                                    <a
                                        href='https://pubmed.ncbi.nlm.nih.gov/27458798/'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent font-semibold hover:underline"
                                    >
                                        NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016.
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054228' // Added actual PLOS ONE link for completeness, though it was empty in your code block
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent font-semibold hover:underline"
                                    >
                                        Stulp G, Buunk AP, Pollet TV (2013). Human height is positively related to interpersonal dominance in dyadic interactions. PLOS ONE.
                                    </a>
                                </li>
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