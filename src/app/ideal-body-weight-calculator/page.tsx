'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, HelpCircle, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore, useUnitStore } from '@/store';
import Navbar from '@/components/Navbar';
import HealthyWeightRange from '@/components/ideal-body-weight-calculator/HealthyWeightRange'; // Added the import here

// --- TOC Data ---
const tocItems = [
    { id: 'ideal-body-weight-calculator', label: 'Ideal Body Weight Calculator' },
    { id: 'calculate-your-ideal-body-weight-in-kg-or-pounds', label: 'Calculate Your Ideal Body Weight in Kg or pounds' },
    { id: 'how-to-calculate-ideal-body-weight', label: 'How to Calculate Ideal Body Weight' },
    {
        id: 'ideal-body-weight-calculation-formulas',
        label: 'Ideal Body Weight Calculation Formulas',
        subItems: [
            { id: 'devine-formula', label: 'Devine Formula' },
            { id: 'robinson-formula', label: 'Robinson Formula' },
            { id: 'hamwi-formula', label: 'Hamwi Formula' }
        ]
    },
    { id: 'ideal-body-weight-calculator-for-women', label: 'Ideal Body Weight Calculator for Women' },
    { id: 'ideal-body-weight-calculator-for-men', label: 'Ideal Body Weight Calculator for Men' },
    { id: 'ideal-body-weight-calculator-for-pediatrics', label: 'Ideal Body Weight Calculator for Pediatrics' },
    { id: 'adjusted-ideal-body-weight-calculator', label: 'Adjusted Ideal Body Weight Calculator' },
    { id: 'percent-ideal-body-weight-calculation', label: 'Percent Ideal Body Weight Calculation' },
    { id: 'healthy-weight-range', label: 'Healthy Weight Range' },
    { id: 'ideal-body-weight-vs-bmi', label: 'Ideal Body Weight vs BMI' },
    { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' }
];

// --- FAQ Data ---
const QA = [
    {
        q: "What is a good ideal body weight?",
        a: "There is no single correct number. A good ideal body weight is the range within which your body functions well, not a specific figure. The three-formula output from this calculator shows that even established clinical methods disagree by a few kilograms. Use the range as context, not a verdict."
    },
    {
        q: "Can ideal body weight be calculated in kg?",
        a: "Yes. The ideal weight calculator in kg mode is the default setting. All three formulas, Devine, Robinson, and Hamwi, were originally expressed in kilograms. The ideal body weight in kg calculator outputs your result directly and converts to pounds if you switch units."
    },
    {
        q: "How much should I weigh? Female, 5'4\"",
        a: "For a woman at 5 ft 4 in (163 cm):\nDevine: 54.1 kg (119 lb)\nRobinson: 55.8 kg (123 lb)\nHamwi: 54.3 kg (120 lb)\nHealthy range: approximately 54 to 56 kg"
    },
    {
        q: "How much should I weigh? Male, 5'10\"",
        a: "For a man at 5 ft 10 in (178 cm):\nDevine: 73 kg (161 lb)\nRobinson: 71 kg (157 lb)\nHamwi: 75 kg (165 lb)\nHealthy range: approximately 71 to 75 kg"
    },
    {
        q: "How much should I weigh at 5'5\" and 5'9\"?",
        a: "5'5\" female (165 cm)\nDevine 57.7 kg · Robinson 56.2 kg · Hamwi 56.4 kg\n\n5'5\" male (165 cm)\nDevine 62.2 kg · Robinson 61.7 kg · Hamwi 61.5 kg\n\n5'9\" female (175 cm)\nDevine 66.9 kg · Robinson 62.9 kg · Hamwi 64.1 kg\n\n5'9\" male (175 cm)\nDevine 70.7 kg · Robinson 69.1 kg · Hamwi 72.3 kg"
    },
    {
        q: "How much should I weigh? Female at 5'1\", 5'2\", 5'3\", 5'7\"",
        a: "5'1\" female: Devine 48.6 kg (107 lb)\n5'2\" female: Devine 50.9 kg (112 lb)\n5'3\" female: Devine 53.2 kg (117 lb)\n5'7\" female: Devine 60.0 kg (132 lb)\nThese are Devine formula single-formula estimates. The full calculator gives the range across all three formulas."
    },
    {
        q: "What is the difference between Devine, Robinson, and Hamwi formulas?",
        a: "All three formulas calculate ideal body weight as a base weight plus an increment per inch above 5 feet. The Devine formula (1974) uses a 2.3 kg increment and is the most widely cited in clinical practice. The Robinson formula (1983) uses a smaller 1.9 kg increment and produces leaner estimates for taller people. The Hamwi formula (1964) uses the highest increment at 2.7 kg and gives the largest IBW estimates for tall individuals."
    }
];

// --- Main Page Component ---
export default function IdealBodyWeightPage() {
    const { theme } = useThemeStore();
    const { unitSystem, setUnitSystem } = useUnitStore();
    const [activeSection, setActiveSection] = useState<string>('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const isClickScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Calculator State
    const [calcUnit, setCalcUnit] = useState<'metric' | 'imperial'>('metric');
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [heightFt, setHeightFt] = useState<number | ''>('');
    const [heightIn, setHeightIn] = useState<number | ''>('');
    const [weightKg, setWeightKg] = useState<number | ''>('');
    const [sex, setSex] = useState<'male' | 'female'>('male');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const visibleSections = new Map<string, IntersectionObserverEntry>();
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

                    if (!closestSection) closestSection = Array.from(visibleSections.keys())[0];
                    if (closestSection && closestSection !== activeSection) {
                        setActiveSection(closestSection);
                        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                        scrollTimeout.current = setTimeout(() => {
                            if (window.history.replaceState) {
                                window.history.replaceState(null, '', `#${closestSection}`);
                            }
                        }, 150);
                    }
                }
            },
            { rootMargin: '-70px 0px -40% 0px', threshold: 0 }
        );

        const headings = document.querySelectorAll(
            tocItems.flatMap(item => {
                const ids = [`#${item.id}`];
                if (item.subItems) {
                    item.subItems.forEach(sub => ids.push(`#${sub.id}`));
                }
                return ids;
            }).join(', ')
        );
        headings.forEach((h) => observer.observe(h));
        return () => observer.disconnect();
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

    // Calculate IBW
    const getIBW = () => {
        let totalInches = 0;
        if (calcUnit === 'metric') {
            if (!heightCm) return null;
            totalInches = Number(heightCm) / 2.54;
        } else {
            if (!heightFt && !heightIn) return null;
            totalInches = (Number(heightFt || 0) * 12) + Number(heightIn || 0);
        }

        const inchesOver60 = totalInches > 60 ? totalInches - 60 : 0;

        let devine = 0, robinson = 0, hamwi = 0;

        if (sex === 'male') {
            devine = 50 + (2.3 * inchesOver60);
            robinson = 52 + (1.9 * inchesOver60);
            hamwi = 48 + (2.7 * inchesOver60);
        } else {
            devine = 45.5 + (2.3 * inchesOver60);
            robinson = 49 + (1.7 * inchesOver60);
            hamwi = 45.5 + (2.2 * inchesOver60);
        }

        // Prevent negative or absurdly low weights for very short heights (fallback to base logic)
        if (totalInches < 60) {
            const deduction = 60 - totalInches;
            devine = sex === 'male' ? 50 - (2.3 * deduction) : 45.5 - (2.3 * deduction);
            robinson = sex === 'male' ? 52 - (1.9 * deduction) : 49 - (1.7 * deduction);
            hamwi = sex === 'male' ? 48 - (2.7 * deduction) : 45.5 - (2.2 * deduction);
        }

        const min = Math.min(devine, robinson, hamwi);
        const max = Math.max(devine, robinson, hamwi);

        // Healthy BMI (18.5 - 25)
        const heightMeters = totalInches * 0.0254;
        const bmiMin = 18.5 * (heightMeters * heightMeters);
        const bmiMax = 25 * (heightMeters * heightMeters);

        let difference = null;
        if (weightKg) {
            const currentWeight = Number(weightKg);
            if (currentWeight > max) difference = `+${(currentWeight - max).toFixed(1)} kg above`;
            else if (currentWeight < min) difference = `${(currentWeight - min).toFixed(1)} kg below`;
            else difference = 'Within ideal range';
        }

        return { devine, robinson, hamwi, min, max, bmiMin, bmiMax, difference };
    };

    const results = getIBW();

    return (
        <div className="flex flex-col min-h-screen bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            <Navbar activePage="ideal-body-weight-calculator" />

            <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative">
                {/* --- Sidebar TOC --- */}
                <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                    <div className="sticky top-24 bg-surface border border-border rounded-3xl p-6 shadow-xl">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em]">Table of Contents</h3>
                        <ul className="text-sm font-medium mt-4 table-of-contents">
                            {tocItems.map(item => (
                                <TOCLink key={item.id} item={item} />
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* Intro */}
                        <div className="space-y-6 text-center sm:text-left mt-4">
                            <h1 id="ideal-body-weight-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                                Ideal Body Weight Calculator
                            </h1>
                            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                            <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0">
                                <span className='text-accent font-semibold hover:underline'>Ideal Body Weight (IBW)</span> is an estimate of the weight range associated with good health for a given height and sex. This ideal body weight calculator applies three established clinical formulas: the <span className='text-accent font-semibold hover:underline'>Devine </span>, <span className='text-accent font-semibold hover:underline'>Robinson</span>, and <span className='text-accent font-semibold hover:underline'>Hamwi</span> methods to produce a range rather than a single number. The tool works for men, women, and pediatric patients. Enter your height and sex to calculate ideal body weight instantly.
                            </p>
                            <p className="text-sm text-muted/80 italic max-w-3xl mx-auto sm:mx-0">
                                (IBW is a clinical reference, not a body goal. Weight is one of many health markers. Always discuss weight-related health questions with a qualified clinician.)
                            </p>
                        </div>

                        {/* Calculator UI */}
                        <section id="calculate-your-ideal-body-weight-in-kg-or-pounds" className="scroll-mt-24 bg-surface border border-border p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Calculate Your Ideal Body Weight in Kg or pounds</h2>
                            <p className="text-muted leading-relaxed mb-8">
                                Use the calculator to find your ideal body weight in kilograms or pounds. Enter your age, height, sex, and current weight to see how much you differ from the ideal weight estimate based on three formulas.
                            </p>

                            {/* Controls */}
                            <div className="flex gap-2 mb-6">
                                <button onClick={() => setCalcUnit('metric')} className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${calcUnit === 'metric' ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}>Metric (kg / cm)</button>
                                <button onClick={() => setCalcUnit('imperial')} className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${calcUnit === 'imperial' ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}>Imperial (lb / ft-in)</button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Height</label>
                                    {calcUnit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))} placeholder="e.g. 175 cm" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">cm</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value === '' ? '' : Number(e.target.value))} placeholder="ft" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">ft</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value === '' ? '' : Number(e.target.value))} placeholder="in" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Sex</label>
                                    <div className="flex gap-2 h-[46px]">
                                        <button onClick={() => setSex('male')} className={`flex-1 rounded-xl font-bold transition-all border-2 ${sex === 'male' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : 'bg-bg text-muted border-border hover:bg-surface'}`}>Male</button>
                                        <button onClick={() => setSex('female')} className={`flex-1 rounded-xl font-bold transition-all border-2 ${sex === 'female' ? 'bg-pink-500/10 text-pink-500 border-pink-500' : 'bg-bg text-muted border-border hover:bg-surface'}`}>Female</button>
                                    </div>
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Current weight (optional — unlocks difference readout)</label>
                                    <div className="relative w-full sm:w-1/2">
                                        <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))} placeholder="e.g. 80" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">kg</span>
                                    </div>
                                </div>
                            </div>

                            {results && (
                                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-6">
                                    <div className="grid sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-border/50 text-center sm:text-left">
                                        <div>
                                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Ideal body weight</span>
                                            <span className="text-2xl font-black text-foreground">{results.min.toFixed(1)} – {results.max.toFixed(1)} <span className="text-base text-accent">kg (range)</span></span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Healthy weight range</span>
                                            <span className="text-2xl font-black text-foreground">{results.bmiMin.toFixed(1)} – {results.bmiMax.toFixed(1)} <span className="text-base text-accent">kg</span></span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Difference from current</span>
                                            <span className="text-2xl font-black text-foreground">{results.difference ? results.difference : '—'}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-bg border border-border p-3 rounded-xl">
                                            <span className="block text-xs font-bold text-muted mb-1">Devine (1974)</span>
                                            <span className="font-bold text-foreground">{results.devine.toFixed(1)} kg</span>
                                        </div>
                                        <div className="bg-bg border border-border p-3 rounded-xl">
                                            <span className="block text-xs font-bold text-muted mb-1">Robinson (1983)</span>
                                            <span className="font-bold text-foreground">{results.robinson.toFixed(1)} kg</span>
                                        </div>
                                        <div className="bg-bg border border-border p-3 rounded-xl">
                                            <span className="block text-xs font-bold text-muted mb-1">Hamwi (1964)</span>
                                            <span className="font-bold text-foreground">{results.hamwi.toFixed(1)} kg</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted uppercase tracking-wider">
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Free</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> No account needed</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Results in kg and lb</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Based on Devine, Robinson, and Hamwi formulas</span>
                            </div>
                        </section>

                        <section id="how-to-calculate-ideal-body-weight" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">How to Calculate Ideal Body Weight</h2>
                            <p className="text-muted leading-relaxed">
                                All three IBW formulas share the same logic. Start from a base weight at exactly 5 feet (152.4 cm) and add a fixed amount per inch of height above that. The formulas differ in their base weight and per-inch increment, which is why they produce slightly different outputs for the same person.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Ben J. Devine introduced his formula in 1974 to help clinicians estimate drug dosages based on height and weight. It became the most widely cited ideal body weight calculation formula in clinical practice.
                            </p>
                            <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">This is how to calculate ideal body weight step by step using the Devine method:</h3>
                                <ul className="space-y-2 text-muted list-decimal pl-5 marker:text-accent font-medium">
                                    <li>Measure your height in feet and inches.</li>
                                    <li>Subtract 5 feet to get the number of inches above the base height.</li>
                                    <li>Multiply those inches by the formula&apos;s per-inch increment.</li>
                                    <li>Add the result to the formula&apos;s base weight for your sex.</li>
                                </ul>
                            </div>
                            <p className="text-muted leading-relaxed">
                                The calculator applies all three formulas at once. You get a range rather than a single number, which is a more accurate representation of what ideal body weight calculation can and cannot tell you.
                            </p>
                        </section>

                        <section id="ideal-body-weight-calculation-formulas" className="space-y-8 scroll-mt-24">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Ideal Body Weight Calculation Formulas</h2>
                                <p className="text-muted leading-relaxed">
                                    The three formulas below cover most clinical use cases. Each one applies the ideal body weight calculation formula as a linear function of height above 5 feet. All were originally derived in kilograms.
                                </p>
                            </div>

                            <div id="devine-formula" className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                                <h3 className="text-xl font-bold text-foreground mb-3">Devine Formula</h3>
                                <p className="text-muted leading-relaxed mb-6">
                                    Ben J. Devine published his formula in 1974. It became the most widely cited IBW formula in clinical practice. The per-inch increment is identical for men and women at 2.3 kg, but the base weights differ by sex.
                                </p>
                                <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="bg-bg border-b border-border font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Sex</th>
                                                <th className="px-4 py-3">Formula</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-muted">
                                            <tr>
                                                <td className="px-4 py-3 font-bold text-foreground">Male</td>
                                                <td className="px-4 py-3">50 kg + 2.3 kg per inch above 5 ft</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold text-foreground">Female</td>
                                                <td className="px-4 py-3">45.5 kg + 2.3 kg per inch above 5 ft</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-bg border border-border p-5 rounded-xl font-mono text-sm">
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Height</span><span className="font-bold text-foreground">175 cm = 5 ft 9 in</span></div>
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Inches above 5 ft</span><span className="font-bold text-foreground">9</span></div>
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Calculation (male)</span><span className="font-bold text-foreground">50 + (2.3 × 9)</span></div>
                                    <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">Devine IBW</span><span className="font-bold text-foreground">70.7 kg</span></div>
                                </div>
                            </div>

                            <div id="robinson-formula" className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                                <h3 className="text-xl font-bold text-foreground mb-3">Robinson Formula</h3>
                                <p className="text-muted leading-relaxed mb-6">
                                    The Robinson Formula was published in 1983 as a refinement of the Devine equation. It raises the male base weight to 52 kg and lowers the per-inch increment to 1.9 kg, producing a leaner estimate for taller men. The female base rises to 49 kg with a 1.7 kg increment. Robinson tends to give the lowest IBW of the three formulas for tall individuals.
                                </p>
                                <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="bg-bg border-b border-border font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Sex</th>
                                                <th className="px-4 py-3">Formula</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-muted">
                                            <tr>
                                                <td className="px-4 py-3 font-bold text-foreground">Male</td>
                                                <td className="px-4 py-3">52 kg + 1.9 kg per inch above 5 ft</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold text-foreground">Female</td>
                                                <td className="px-4 py-3">49 kg + 1.7 kg per inch above 5 ft</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-bg border border-border p-5 rounded-xl font-mono text-sm">
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Height</span><span className="font-bold text-foreground">175 cm = 5 ft 9 in</span></div>
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Calculation (male)</span><span className="font-bold text-foreground">52 + (1.9 × 9)</span></div>
                                    <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">Robinson IBW</span><span className="font-bold text-foreground">69.1 kg</span></div>
                                </div>
                            </div>

                            <div id="hamwi-formula" className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                                <h3 className="text-xl font-bold text-foreground mb-3">Hamwi Formula</h3>
                                <p className="text-muted leading-relaxed mb-6">
                                    The Hamwi Formula is the oldest of the three, published in 1964. It uses a higher per-inch increment for men and tends to produce the largest IBW estimates for taller individuals. It remains common in dietetic and clinical nutrition practice.
                                </p>
                                <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="bg-bg border-b border-border font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Sex</th>
                                                <th className="px-4 py-3">Formula</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-muted">
                                            <tr>
                                                <td className="px-4 py-3 font-bold text-foreground">Male</td>
                                                <td className="px-4 py-3">48 kg + 2.7 kg per inch above 5 ft</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold text-foreground">Female</td>
                                                <td className="px-4 py-3">45.5 kg + 2.2 kg per inch above 5 ft</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-bg border border-border p-5 rounded-xl font-mono text-sm">
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Height</span><span className="font-bold text-foreground">175 cm = 5 ft 9 in</span></div>
                                    <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans">Calculation (male)</span><span className="font-bold text-foreground">48 + (2.7 × 9)</span></div>
                                    <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">Hamwi IBW</span><span className="font-bold text-foreground">72.3 kg</span></div>
                                </div>
                            </div>
                        </section>

                        <section id="ideal-body-weight-calculator-for-women" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Ideal Body Weight Calculator for Women</h2>
                            <p className="text-muted leading-relaxed">
                                The ideal weight calculator for women applies lower base weights than the male versions of the same formulas. This reflects two biological realities. Women carry a higher proportion of body fat relative to lean mass. Women also have lower average bone density and muscle mass than men of the same height.
                            </p>
                            <p className="text-muted leading-relaxed">
                                The Devine formula sets the female base at 45.5 kg against 50 kg for men. The Robinson formula raises the female base to 49 kg. The result is a lower IBW estimate at every height compared to the male calculation.
                            </p>
                            <div className="bg-surface border border-border p-6 rounded-2xl my-4">
                                <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Female IBW example at 5 ft 5 in (165 cm):</h4>
                                <ul className="space-y-2 text-muted font-medium">
                                    <li>Devine: 57.7 kg (127 lb)</li>
                                    <li>Robinson: 56.2 kg (124 lb)</li>
                                    <li>Hamwi: 56.4 kg (124 lb)</li>
                                    <li className="pt-2 text-accent font-bold">Healthy range across formulas: approximately 56 to 58 kg</li>
                                </ul>
                            </div>
                            <p className="text-muted leading-relaxed">
                                Factors including frame size, muscle mass from training, and hormonal variation all influence what a healthy weight looks like for any individual woman. None of the formulas account for these variables. The female ideal body weight calculator result is a reference band, not a target to reach.
                            </p>
                        </section>

                        <section id="ideal-body-weight-calculator-for-men" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Ideal Body Weight Calculator for Men</h2>
                            <p className="text-muted leading-relaxed">
                                The ideal body weight calculator for men produces higher estimates than the female version at every height. This reflects the greater average muscle mass and bone density in male bodies. Muscle weighs more than fat per unit volume, so a man and a woman at the same height can both be healthy while differing significantly in weight.
                            </p>
                            <div className="bg-surface border border-border p-6 rounded-2xl my-4">
                                <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Male IBW example at 5 ft 10 in (178 cm):</h4>
                                <ul className="space-y-2 text-muted font-medium">
                                    <li>Devine: 73 kg (161 lb)</li>
                                    <li>Robinson: 71 kg (157 lb)</li>
                                    <li>Hamwi: 75 kg (165 lb)</li>
                                    <li className="pt-2 text-accent font-bold">Healthy range across formulas: approximately 71 to 75 kg</li>
                                </ul>
                            </div>
                            <p className="text-muted leading-relaxed">
                                Highly trained men who lift weights regularly will often sit above their IBW while carrying low body fat. In these cases, IBW is a less useful clinical reference than direct body composition measurement. The male ideal body weight calculation gives a useful starting point but does not replace a full health assessment.
                            </p>
                        </section>

                        <section id="ideal-body-weight-calculator-for-pediatrics" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Ideal Body Weight Calculator for Pediatrics</h2>
                            <p className="text-muted leading-relaxed">
                                The adult IBW formulas do not apply to children. The ideal body weight calculator for pediatrics uses age- and height-based references instead, because children&apos;s bodies are still developing and their healthy weight range changes continuously as they grow.
                            </p>
                            <p className="text-muted leading-relaxed">
                                The most common method for ideal body weight calculation in pediatrics uses height to estimate expected weight based on growth charts. In clinical practice,     <a
                                    href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline"
                                > CDC growth charts </a>
                                <a href='https://www.who.int/tools/child-growth-standards'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline"
                                >and WHO Child Growth Standards</a> are the reference standards for pediatric growth assessment. A child&apos;s IBW is typically taken as the weight corresponding to the 50th percentile for their height on the appropriate growth chart.
                            </p>
                            <p className="text-muted leading-relaxed">
                                The calculator switches to this growth-chart method automatically when an age under 18 is entered. The result appears as a weight range rather than a single figure. For pediatric weight concerns, always work with a pediatrician. Growth tracking across multiple visits is more informative than any single measurement.
                            </p>
                        </section>

                        <section id="adjusted-ideal-body-weight-calculator" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Adjusted Ideal Body Weight Calculator</h2>
                            <p className="text-muted leading-relaxed">
                                The adjusted ideal body weight calculator applies in clinical settings for patients whose actual weight is more than 30% above their IBW. At that point, using IBW alone for drug dosing underestimates metabolic activity, because some excess fat tissue is still metabolically active. Adjusted Body Weight corrects for this.
                            </p>
                            <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Adjusted Body Weight formula:</h3>
                                <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                    Adjusted BW = IBW + 0.4 × (Actual Weight − IBW)
                                </p>
                                <h4 className="font-bold text-foreground mb-2 text-sm">Worked example — actual weight 100 kg, Devine IBW 70 kg:</h4>
                                <ul className="space-y-2 text-muted font-medium font-mono text-sm">
                                    <li>= 70 + 0.4 × (100 − 70) = 70 + 12 =  <span className='text-accent font-semibold hover:underline'>82 kg</span></li>
                                </ul>
                            </div>
                            <p className="text-muted leading-relaxed">
                                The 0.4 factor reflects the estimated metabolically active proportion of excess weight. Adjusted body weight is used most commonly in aminoglycoside antibiotic dosing, chemotherapy calculations, and renal dosing adjustments. It is not a weight target. It is a pharmacokinetic tool for clinical dosing decisions.
                            </p>
                        </section>

                        <section id="percent-ideal-body-weight-calculation" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Percent Ideal Body Weight Calculation</h2>
                            <p className="text-muted leading-relaxed">
                                To calculate percent ideal body weight, divide your actual weight by your IBW and multiply by 100. This shows how your current weight compares to the estimate as a percentage.
                            </p>
                            <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                    Percent IBW = (Actual Weight ÷ IBW) × 100
                                </p>
                                <div className="overflow-x-auto border border-border rounded-xl">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-bg border-b border-border font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Percent IBW</th>
                                                <th className="px-4 py-3">Weight status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-muted font-medium">
                                            <tr><td className="px-4 py-3">Below 70%</td><td className="px-4 py-3">Severely underweight</td></tr>
                                            <tr><td className="px-4 py-3">70 to 89%</td><td className="px-4 py-3">Underweight</td></tr>
                                            <tr><td className="px-4 py-3 text-accent font-bold">90 to 110%</td><td className="px-4 py-3 text-accent font-bold">Normal weight</td></tr>
                                            <tr><td className="px-4 py-3">110 to 120%</td><td className="px-4 py-3">Overweight</td></tr>
                                            <tr><td className="px-4 py-3">Above 120%</td><td className="px-4 py-3">Obesity risk range</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p className="text-muted leading-relaxed">
                                Percent IBW is used in clinical nutrition assessments to flag patients who need nutritional intervention. A percent ideal body weight below 70% is associated with significant nutritional depletion. Scores above 120% are used as one threshold in obesity-related dosing decisions.
                            </p>
                        </section>

                        {/* Integrated Visual Component */}
                        <section id="healthy-weight-range" className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Healthy Weight Range</h2>
                            <p className="text-muted leading-relaxed mb-6">
                                The healthy weight range sits around your IBW result, not at a single point. Because the three formulas produce slightly different figures for the same person, the spread between the lowest and highest result defines a practical healthy weight range. For most adults, this spread runs 3 to 5 kg across all three formulas.
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Illustrative range — male, 5 ft 9 in (175 cm):</h4>
                                <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
                                    <div className="bg-bg border border-border p-3 rounded-xl">
                                        <span className="block text-muted mb-1">Below IBW</span>
                                        <span className="font-bold text-foreground">Below 69 kg</span>
                                    </div>
                                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-xl">
                                        <span className="block text-green-500 mb-1">Healthy (69–73 kg)</span>
                                        <span className="font-bold text-green-600">69–73 kg (healthy)</span>
                                    </div>
                                    <div className="bg-bg border border-border p-3 rounded-xl">
                                        <span className="block text-muted mb-1">Above IBW</span>
                                        <span className="font-bold text-foreground">73–88 kg</span>
                                    </div>
                                    <div className="col-span-3 bg-red-500/10 border border-red-500/30 p-3 rounded-xl mt-2">
                                        <span className="block text-red-500 mb-1">Obesity risk</span>
                                        <span className="font-bold text-red-600">Above 88 kg</span>
                                    </div>
                                </div>
                            </div>

                            <HealthyWeightRange />
                        </section>

                        <section id="ideal-body-weight-vs-bmi" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Ideal Body Weight vs BMI</h2>
                            <p className="text-muted leading-relaxed">
                                Body Mass Index and Ideal Body Weight measure different things and answer different questions. BMI evaluates your weight category by dividing weight in kilograms by height in meters squared. It returns a category label: underweight, normal, overweight, or obese. Ideal body weight calculation, by contrast, gives an estimated weight to aim for rather than a category label.
                            </p>
                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm my-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Measure</th>
                                            <th className="px-6 py-4">What it does</th>
                                            <th className="px-6 py-4">Main limitation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">Ideal Body Weight</td>
                                            <td className="px-6 py-4">Estimates a target weight based on height and sex</td>
                                            <td className="px-6 py-4">Ignores body composition, frame size, and age</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">Body Mass Index</td>
                                            <td className="px-6 py-4">Classifies weight status using weight and height</td>
                                            <td className="px-6 py-4">Same limitations, plus does not adjust for sex differences in body composition</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-muted leading-relaxed">
                                Neither metric accounts for how weight is distributed between muscle, fat, and bone. A person with high muscle mass can show a normal IBW and a high BMI. A person with low muscle mass can show a normal BMI and sit above their IBW. For a full picture, both are best used alongside body composition data from a clinician.
                            </p>

                            <div className="text-center mt-12">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                                >
                                    <ArrowUpCircle size={18} /> Scroll to top and calculate now ↑
                                </button>
                            </div>
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
                                                <span className={`text-sm font-bold transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{item.q}</span>
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
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Sources</h3>
                            <ul className="space-y-3 break-words overflow-hidden list-disc pl-5 marker:text-muted/40">
                                <li>Devine BJ (1974). Gentamicin therapy. Drug Intelligence and Clinical Pharmacy.</li>
                                <li>Robinson JD et al. (1983). Estimation of ideal body weight. American Journal of Hospital Pharmacy.</li>
                                <li>Hamwi GJ (1964). Changing dietary concepts. In: Diabetes Mellitus: Diagnosis and Treatment. American Diabetes Association.</li>
                                <li>CDC Growth Charts. Centers for Disease Control and Prevention.</li>
                                <li>WHO Child Growth Standards. World Health Organization.</li>
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