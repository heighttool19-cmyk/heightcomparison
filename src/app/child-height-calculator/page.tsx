'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, Box, ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore } from '@/store';
import HeightDashboard from '@/components/HeightDashboard';
import HeightCharts from '@/components/HeightCharts';
import GrowthPlateExplainer from '@/components/GrowthPlateExplainer';
import { Person } from '@/types';

// Structured TOC data for easy rendering and active state tracking
const tocItems = [
    { id: 'child-height-predictor-calculator', label: 'Height Predictor Calculator' },
    { id: 'how-tall-will-my-child-be', label: 'How Tall Will My Child Be?' },
    { id: 'what-determines-child-height', label: 'What Determines a Child’s Height?' },
    { id: 'when-do-boys-stop-growing', label: 'When Do Boys Stop Growing?' },
    { id: 'when-do-girls-stop-growing', label: 'When Do Girls Stop Growing?' },
    { id: 'boys-girls-growth-charts', label: 'Boys & Girls Growth Charts' },
    {
        id: 'predict-child-height',
        label: 'How to Predict Height',
        subItems: [
            { id: 'height-calculator-based-on-parents', label: 'Based on Parents' },
            { id: 'khamis-roche-method', label: 'Khamis-Roche Method' },
            { id: 'bone-age-method', label: 'Bone Age Method' }
        ]
    },
    { id: 'boys-height-predictor', label: 'Boys Height Predictor' },
    { id: 'how-to-get-taller-as-a-kid', label: 'How to Get Taller As A Kid' },
    { id: 'accuracy', label: 'Prediction Accuracy' },
    { id: 'child-height-calculator-faq', label: 'FAQ' }
];

export default function HeightCalculatorPage() {
    const { theme, toggleTheme } = useThemeStore();
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    // --- Shared State for Units ---
    const [unit, setUnit] = useState<'metric' | 'us'>('us');

    // --- State for Section 1: Child Height Predictor ---
    const [childAge, setChildAge] = useState<number | ''>('');
    const [childGender, setChildGender] = useState<'male' | 'female'>('male');
    const [childHtCm, setChildHtCm] = useState<number | ''>('');
    const [childHtFt, setChildHtFt] = useState<number | ''>('');
    const [childHtIn, setChildHtIn] = useState<number | ''>('');
    const [childWtKg, setChildWtKg] = useState<number | ''>('');
    const [childWtLbs, setChildWtLbs] = useState<number | ''>('');
    const [motherHtCm, setMotherHtCm] = useState<number | ''>('');
    const [motherHtFt, setMotherHtFt] = useState<number | ''>('');
    const [motherHtIn, setMotherHtIn] = useState<number | ''>('');
    const [fatherHtCm, setFatherHtCm] = useState<number | ''>('');
    const [fatherHtFt, setFatherHtFt] = useState<number | ''>('');
    const [fatherHtIn, setFatherHtIn] = useState<number | ''>('');
    const [predictedKhamis, setPredictedKhamis] = useState<{ cm: number; ft: number; in: number } | null>(null);

    // --- State for Section 2: Parent Only ---
    const [parentMotherHtCm, setParentMotherHtCm] = useState<number | ''>('');
    const [parentMotherHtFt, setParentMotherHtFt] = useState<number | ''>('');
    const [parentMotherHtIn, setParentMotherHtIn] = useState<number | ''>('');
    const [parentFatherHtCm, setParentFatherHtCm] = useState<number | ''>('');
    const [parentFatherHtFt, setParentFatherHtFt] = useState<number | ''>('');
    const [parentFatherHtIn, setParentFatherHtIn] = useState<number | ''>('');
    const [predictedParentOnlyBoys, setPredictedParentOnlyBoys] = useState<{ cm: number; ft: number; in: number; raw: number; fCm: number; mCm: number } | null>(null);
    const [predictedParentOnlyGirls, setPredictedParentOnlyGirls] = useState<{ cm: number; ft: number; in: number; raw: number; fCm: number; mCm: number } | null>(null);

    // --- State for Section 3: Converter ---
    const [convCmInput, setConvCmInput] = useState<string>('');
    const [convFtInput, setConvFtInput] = useState<string>('');
    const [convInInput, setConvInInput] = useState<string>('');

    // --- State for Chart Visualization ---
    const [showChart, setShowChart] = useState(false);
    const [chartPersons, setChartPersons] = useState<Person[]>([]);

    // Theme sync
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Intersection Observer for Active TOC state
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            // Triggers when a heading passes into the upper 40% of the viewport (below navbar)
            { rootMargin: '-100px 0px -60% 0px' }
        );

        const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, []);

    // Helpers
    const cmToFtIn = (cm: number) => {
        const totalInches = cm / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        if (inches === 12) return { ft: ft + 1, in: 0 };
        return { ft, in: inches };
    };

    const ftInToCm = (ft: number, inc: number) => {
        return (ft * 12 + inc) * 2.54;
    };

    // Calculate Section 1: Child Height Predictor
    const calculateKhamis = () => {
        let currentChildCm = 0;
        let pMotherCm = 0;
        let pFatherCm = 0;

        if (unit === 'us') {
            currentChildCm = ftInToCm(Number(childHtFt), Number(childHtIn));
            pMotherCm = ftInToCm(Number(motherHtFt), Number(motherHtIn));
            pFatherCm = ftInToCm(Number(fatherHtFt), Number(fatherHtIn));
        } else {
            currentChildCm = Number(childHtCm);
            pMotherCm = Number(motherHtCm);
            pFatherCm = Number(fatherHtCm);
        }

        if (currentChildCm <= 0 || pMotherCm <= 0 || pFatherCm <= 0 || !childAge) return;

        const mph = (childGender === 'male')
            ? (pFatherCm + pMotherCm + 13) / 2
            : (pFatherCm + pMotherCm - 13) / 2;

        const growthData = [
            { age: 2, bm: 86.8, gm: 85.5 },
            { age: 4, bm: 102.3, gm: 101.6 },
            { age: 6, bm: 115.5, gm: 114.6 },
            { age: 8, bm: 128.1, gm: 127.5 },
            { age: 10, bm: 138.4, gm: 138.6 },
            { age: 12, bm: 149.1, gm: 151.0 },
            { age: 14, bm: 163.8, gm: 160.5 },
            { age: 16, bm: 173.4, gm: 162.5 },
            { age: 18, bm: 176.1, gm: 163.1 },
        ];

        const age = Number(childAge);
        let currentAvgHeight = 0;
        const avgHeightAt18 = (childGender === 'male') ? 176.1 : 163.1;

        if (age <= 2) {
            currentAvgHeight = (childGender === 'male') ? 86.8 : 85.5;
        } else if (age >= 18) {
            currentAvgHeight = avgHeightAt18;
        } else {
            for (let i = 0; i < growthData.length - 1; i++) {
                if (age >= growthData[i].age && age <= growthData[i + 1].age) {
                    const d1 = growthData[i];
                    const d2 = growthData[i + 1];
                    const t = (age - d1.age) / (d2.age - d1.age);
                    const h1 = (childGender === 'male') ? d1.bm : d1.gm;
                    const h2 = (childGender === 'male') ? d2.bm : d2.gm;
                    currentAvgHeight = h1 + (h2 - h1) * t;
                    break;
                }
            }
        }

        const curveProjection = (currentChildCm / currentAvgHeight) * avgHeightAt18;
        const predCm = (mph * 0.4) + (curveProjection * 0.6);

        const res = cmToFtIn(predCm);
        const prediction = { cm: Math.round(predCm), ft: res.ft, in: res.in };
        setPredictedKhamis(prediction);

        const persons: Person[] = [
            { id: 'father', name: 'Father', heightCm: pFatherCm, color: '#3b82f6', isEntity: false },
            { id: 'mother', name: 'Mother', heightCm: pMotherCm, color: '#ec4899', isEntity: false },
            { id: 'child', name: childGender === 'male' ? 'Son' : 'Daughter', heightCm: predCm, color: '#10b981', isEntity: false }
        ];
        setChartPersons(persons);
    };

    const handleShowMidParentalChart = (gender: 'male' | 'female', predictedCm: number, fCm: number, mCm: number) => {
        const persons: Person[] = [
            { id: 'father', name: 'Father', heightCm: fCm, color: '#3b82f6', isEntity: false },
            { id: 'mother', name: 'Mother', heightCm: mCm, color: '#ec4899', isEntity: false },
            { id: 'child', name: gender === 'male' ? 'Son' : 'Daughter', heightCm: predictedCm, color: '#10b981', isEntity: false }
        ];
        setChartPersons(persons);
        setShowChart(true);
    };

    const clearKhamis = () => {
        setChildAge(''); setChildHtCm(''); setChildHtFt(''); setChildHtIn('');
        setChildWtKg(''); setChildWtLbs('');
        setMotherHtCm(''); setMotherHtFt(''); setMotherHtIn('');
        setFatherHtCm(''); setFatherHtFt(''); setFatherHtIn('');
        setPredictedKhamis(null);
    };

    const calculateMidParental = () => {
        let pMotherCm = 0;
        let pFatherCm = 0;
        if (unit === 'us') {
            pMotherCm = ftInToCm(Number(parentMotherHtFt), Number(parentMotherHtIn));
            pFatherCm = ftInToCm(Number(parentFatherHtFt), Number(parentFatherHtIn));
        } else {
            pMotherCm = Number(parentMotherHtCm);
            pFatherCm = Number(parentFatherHtCm);
        }

        if (pMotherCm <= 0 || pFatherCm <= 0) return;

        const boysCm = (pFatherCm + pMotherCm + 13) / 2;
        const girlsCm = (pFatherCm + pMotherCm - 13) / 2;

        const bRes = cmToFtIn(boysCm);
        const gRes = cmToFtIn(girlsCm);

        setPredictedParentOnlyBoys({ cm: Math.round(boysCm), ft: bRes.ft, in: bRes.in, raw: boysCm, fCm: pFatherCm, mCm: pMotherCm });
        setPredictedParentOnlyGirls({ cm: Math.round(girlsCm), ft: gRes.ft, in: gRes.in, raw: girlsCm, fCm: pFatherCm, mCm: pMotherCm });
    };

    const getCmToFtInDisplay = () => {
        const cm = Number(convCmInput);
        if (!convCmInput || isNaN(cm) || cm <= 0) return '-';
        const res = cmToFtIn(cm);
        return `${res.ft} ft ${res.in} in`;
    };

    const getFtInToCmDisplay = () => {
        if (!convFtInput && !convInInput) return '-';
        const ft = Number(convFtInput) || 0;
        const inc = Number(convInInput) || 0;
        if (isNaN(ft) || isNaN(inc) || (ft === 0 && inc === 0)) return '-';
        const cm = Math.round(ftInToCm(ft, inc));
        return `${cm} cm`;
    };

    const QA = [
        { q: "How tall will my son be?", a: "The most accurate way to estimate your son's adult height without a clinical assessment is the Khamis-Roche method, which factors in his current age, height, weight, and both parents' heights. Try our height predictor calculator above for an instant result." },
        { q: "How accurate is a child height predictor?", a: "The Khamis-Roche method has a margin of error of roughly ±2.1 inches (5.3 cm) for boys and ±1.7 inches (4.3 cm) for girls. Bone age methods are more accurate but require clinical testing. No calculator gives a guaranteed number." },
        { q: "What is the most accurate height prediction method?", a: "Bone age assessment (Greulich-Pyle or Tanner-Whitehouse) is the most accurate. Among calculator-based methods, Khamis-Roche leads for children over 4. For babies and toddlers, mid-parental height is your only practical option." },
        { q: "Can I predict my baby's height?", a: "Yes, the mid-parental height formula works from birth. Enter both parents' heights into our baby height calculator to get an estimated adult height range." },
        { q: "How tall should my child be at their age?", a: "The growth charts above show average and median height by age for both boys and girls. Most healthy children fall between the 3rd and 97th percentile. Where they sit matters less than whether they're consistently tracking the same curve over time." },
        { q: "What's the difference between average and median height?", a: "In a healthy population, they're nearly identical. The average is the mathematical mean; the median is the midpoint where half the population is taller and half is shorter. For height data, both figures land at the 50th percentile." }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Component for reusable TOC items
    const TOCLink = ({ item, isSub = false }: { item: any, isSub?: boolean }) => {
        const isActive = activeSection === item.id || (item.subItems && item.subItems.some((sub: any) => sub.id === activeSection));

        return (
            <li className={`transition-all duration-300 ${isSub ? 'mt-2' : 'mt-3'}`}>
                <a
                    href={`#${item.id}`}
                    className={`block transition-all duration-300 border-l-2 pl-3 ${isActive
                        ? 'text-accent font-bold border-accent translate-x-1'
                        : 'text-muted hover:text-foreground border-transparent hover:border-border'
                        }`}
                >
                    {item.label}
                </a>
                {item.subItems && (
                    <ul className="pl-4 ml-3 border-l border-border/50 mt-2 space-y-2">
                        {item.subItems.map((sub: any) => (
                            <TOCLink key={sub.id} item={sub} isSub={true} />
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <div className="min-h-screen bg-bg text-foreground font-sans transition-colors duration-500 overflow-x-hidden">
            {/* --- Navbar --- */}
            <header className="h-[70px] shrink-0 border-b border-border/50 bg-bg   flex items-center justify-between px-6 sm:px-12 z-50   top-0">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20">
                        <div className="flex items-end gap-[2px] h-4">
                            <div className="w-1.5 h-full bg-white rounded-t-sm" />
                            <div className="w-1.5 h-2/3 bg-white rounded-t-sm" />
                            <div className="w-1.5 h-1/3 bg-white rounded-t-sm" />
                        </div>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors">
                        Height<span className="text-[#3B82F6]">Comparison</span>
                    </h1>
                </div>

                <nav className="hidden lg:flex items-center gap-10">
                    <Link href="/" className="text-[15px] font-medium text-muted hover:text-foreground transition-colors">Home</Link>
                    <Link href="/child-height-calculator" className="text-[15px] font-bold text-foreground transition-colors border-b-2 border-accent pb-1">Child Height Calculator</Link>
                    <Link href="/image-to-height" className="text-[15px] font-bold text-accent transition-colors flex items-center gap-2">
                        Image to Height <Box size={14} />
                    </Link>
                    <Link href="/about" className="text-[15px] font-medium text-muted hover:text-foreground transition-colors">About</Link>
                </nav>

                <div className="flex items-center gap-4 sm:gap-6">
                    <button onClick={toggleTheme} className="p-2 text-muted hover:text-foreground hover:bg-surface/50 rounded-full transition-colors flex items-center justify-center" title="Toggle Theme">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {theme === 'dark' ? (
                                <motion.div key="moon" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}><Moon size={20} /></motion.div>
                            ) : (
                                <motion.div key="sun" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}><Sun size={20} /></motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                    <div className="relative">
                        <button className="lg:hidden p-2 text-muted hover:text-foreground transition-colors -ml-2" onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}>
                            <Menu size={24} />
                        </button>
                        <AnimatePresence>
                            {isNavMenuOpen && (
                                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-2xl shadow-2xl p-2 z-[60] lg:hidden">
                                    <Link href="/"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">Home</button></Link>
                                    <Link href="/child-height-calculator"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground bg-accent/10 rounded-xl transition-colors">Child Height Calculator</button></Link>
                                    <Link href="/image-to-height"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-accent hover:text-accent/80 hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between">Image to Height <Box size={14} /></button></Link>
                                    <Link href="/about"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">About</button></Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* --- Main Content with Sidebar Grid --- */}
            <main className="flex-1 flex flex-col relative p-4 md:p-8 bg-canvas">

                {/* Grid Layout: Mobile: 1 column | Desktop: 2 columns (Left sidebar for TOC, Right for content) */}
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-8 mt-4 md:mt-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                    {/* --- LEFT SIDEBAR: Sticky Table of Contents (Desktop Only) --- */}
                    <div className="hidden lg:block relative">
                        <div className="fixed top-24 bg-surface border border-border p-6 rounded-3xl shadow-sm text-left max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                            <h3 className="font-black text-foreground mb-4 uppercase tracking-widest text-xs border-b border-border pb-4">Table of Contents</h3>
                            <ul className="text-sm font-medium">
                                {tocItems.map(item => (
                                    <TOCLink key={item.id} item={item} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* --- RIGHT CONTENT AREA --- */}
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* Mobile TOC (Shows only on small screens before content) */}
                        <div className="block lg:hidden bg-surface border border-border p-6 rounded-3xl shadow-sm text-left">
                            <h3 className="font-black text-foreground mb-4 uppercase tracking-widest text-sm border-b border-border pb-4">Table of Contents</h3>
                            <ul className="text-sm font-medium">
                                {tocItems.map(item => (
                                    <TOCLink key={item.id} item={item} />
                                ))}
                            </ul>
                        </div>

                        {/* INTRO CONTENT */}
                        <div className="space-y-6 text-center sm:text-left">
                            <h1 id="child-height-predictor-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                                Child Height Predictor Calculator
                            </h1>
                            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                            <p className="text-muted leading-relaxed text-lg max-w-2xl mx-auto sm:mx-0">
                                Use our child height calculator to estimate how tall your child may grow as an adult. By entering a few basic details — such as your child’s age, height, weight, and parents’ heights — the calculator estimates their projected adult height using established scientific growth models.
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-2xl inline-block text-left mx-auto sm:mx-0 mt-4">
                                <h3 className="font-bold text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Many parents search questions like:</h3>
                                <ul className="space-y-2 text-sm text-muted font-medium">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will my child be?</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will my son be?</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will I be when I grow up?</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How can you determine how tall you will be?</li>
                                </ul>
                            </div>

                            <p className="text-muted leading-relaxed text-md max-w-3xl mx-auto sm:mx-0">
                                A height predictor calculator provides a useful estimate based on genetics and current growth measurements. While no tool can guarantee an exact number, these models often come surprisingly close when accurate inputs are used.
                                Our calculator uses the Khamis-Roche height prediction method, one of the most widely used formulas for estimating adult height without requiring medical tests or X-rays.
                            </p>
                        </div>

                        {/* SECTION 1: KHAMIS ROCHE */}
                        <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black tracking-tight text-foreground">Height Predictor <span className="text-muted text-base font-medium ml-2 uppercase tracking-widest">(Khamis-Roche)</span></h2>
                                </div>
                                {/* Synced Unit Toggle */}
                                <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                                    <button onClick={() => setUnit('us')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${unit === 'us' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>US (ft/in)</button>
                                    <button onClick={() => setUnit('metric')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${unit === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>Metric (cm)</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Child&apos;s Age (Years)</label>
                                    <input type="number" min="0" value={childAge} onChange={e => setChildAge(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Gender</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setChildGender('male')} className={`flex-1 py-3 rounded-xl border border-border font-semibold transition-all ${childGender === 'male' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : 'bg-bg text-muted hover:bg-surface'}`}>Boy</button>
                                        <button onClick={() => setChildGender('female')} className={`flex-1 py-3 rounded-xl border border-border font-semibold transition-all ${childGender === 'female' ? 'bg-pink-500/10 text-pink-500 border-pink-500' : 'bg-bg text-muted hover:bg-surface'}`}>Girl</button>
                                    </div>
                                </div>

                                {/* Child Height / Weight */}
                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Child&apos;s Current Height</label>
                                    {unit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={childHtCm} onChange={e => setChildHtCm(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 110" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input type="number" value={childHtFt} onChange={e => setChildHtFt(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 3" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="number" value={childHtIn} onChange={e => setChildHtIn(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Child&apos;s Current Weight </label>
                                    {unit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={childWtKg} onChange={e => setChildWtKg(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 20" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">kg</span>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <input type="number" value={childWtLbs} onChange={e => setChildWtLbs(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 45" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">lbs</span>
                                        </div>
                                    )}
                                </div>

                                {/* Parents */}
                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Mother&apos;s Height</label>
                                    {unit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={motherHtCm} onChange={e => setMotherHtCm(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 165" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input type="number" value={motherHtFt} onChange={e => setMotherHtFt(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="number" value={motherHtIn} onChange={e => setMotherHtIn(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Father&apos;s Height</label>
                                    {unit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={fatherHtCm} onChange={e => setFatherHtCm(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 180" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input type="number" value={fatherHtFt} onChange={e => setFatherHtFt(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="number" value={fatherHtIn} onChange={e => setFatherHtIn(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 10" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={calculateKhamis} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95">Calculate Height</button>
                                <button onClick={clearKhamis} className="px-6 bg-bg border border-border text-muted font-bold rounded-xl hover:text-foreground transition-all">Clear</button>
                            </div>

                            <AnimatePresence>
                                {predictedKhamis && (
                                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center shadow-lg shadow-accent/5 mt-8">
                                        <p className="text-base font-black text-accent uppercase tracking-widest mb-2">Estimated Adult Height</p>
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="text-4xl md:text-5xl font-black text-foreground">{predictedKhamis.cm} <span className="text-xl md:text-2xl text-accent">cm</span></span>
                                            <div className="w-px h-10 bg-border" />
                                            <span className="text-4xl md:text-5xl font-black text-accent">{predictedKhamis.ft}&apos;{predictedKhamis.in}&quot;</span>
                                        </div>
                                        <p className="text-xs font-bold text-muted uppercase mt-3 tracking-wider bg-surface/50 py-1.5 px-3 rounded-full inline-block border border-border/50">Target Range (±5 cm): {predictedKhamis.cm - 5} — {predictedKhamis.cm + 5} cm</p>

                                        <button
                                            onClick={() => setShowChart(true)}
                                            className="w-full mt-6 bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-2 group"
                                        >
                                            View Comparison Chart
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* SECTION 2: PARENT ONLY */}
                        <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black tracking-tight text-foreground">Parent&apos;s Height Only <span className="text-muted text-base font-medium ml-2 uppercase tracking-widest">(Mid-Parental)</span></h2>
                                </div>
                                {/* Synced Unit Toggle */}
                                <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                                    <button onClick={() => setUnit('us')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${unit === 'us' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>US (ft/in)</button>
                                    <button onClick={() => setUnit('metric')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${unit === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>Metric (cm)</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Mother&apos;s Height</label>
                                    {unit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={parentMotherHtCm} onChange={e => setParentMotherHtCm(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 165" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input type="number" value={parentMotherHtFt} onChange={e => setParentMotherHtFt(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="number" value={parentMotherHtIn} onChange={e => setParentMotherHtIn(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-base font-semibold text-muted">Father&apos;s Height</label>
                                    {unit === 'metric' ? (
                                        <div className="relative">
                                            <input type="number" value={parentFatherHtCm} onChange={e => setParentFatherHtCm(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 180" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input type="number" value={parentFatherHtFt} onChange={e => setParentFatherHtFt(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <input type="number" value={parentFatherHtIn} onChange={e => setParentFatherHtIn(Number(e.target.value))} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 10" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button onClick={calculateMidParental} className="w-full bg-surface border-2 border-border hover:border-accent hover:bg-accent/5 text-foreground font-bold py-3.5 rounded-xl transition-all shadow-sm active:scale-95">Calculate Estimate</button>

                            <AnimatePresence>
                                {predictedParentOnlyBoys && predictedParentOnlyGirls && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-center flex flex-col items-center">
                                            <p className="text-base font-black text-blue-500 mb-2 uppercase tracking-widest">Boys</p>
                                            <p className="text-2xl font-black text-foreground mb-4">{predictedParentOnlyBoys.cm} cm / {predictedParentOnlyBoys.ft}&apos;{predictedParentOnlyBoys.in}&quot;</p>
                                            <button
                                                onClick={() => handleShowMidParentalChart('male', predictedParentOnlyBoys.raw, predictedParentOnlyBoys.fCm, predictedParentOnlyBoys.mCm)}
                                                className="text-[10px] font-black uppercase tracking-widest text-[#3b82f6] hover:text-[#3b82f6]/80 flex items-center gap-1 group"
                                            >
                                                View Chart
                                                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                        <div className="p-6 bg-pink-500/5 border border-pink-500/20 rounded-2xl text-center flex flex-col items-center">
                                            <p className="text-base font-black text-pink-500 mb-2 uppercase tracking-widest">Girls</p>
                                            <p className="text-2xl font-black text-foreground mb-4">{predictedParentOnlyGirls.cm} cm / {predictedParentOnlyGirls.ft}&apos;{predictedParentOnlyGirls.in}&quot;</p>
                                            <button
                                                onClick={() => handleShowMidParentalChart('female', predictedParentOnlyGirls.raw, predictedParentOnlyGirls.fCm, predictedParentOnlyGirls.mCm)}
                                                className="text-[10px] font-black uppercase tracking-widest text-[#ec4899] hover:text-[#ec4899]/80 flex items-center gap-1 group"
                                            >
                                                View Chart
                                                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* SECTION 3: Height Converter */}
                        <section>
                            <div className="space-y-4 mb-8 text-center sm:text-left">
                                <h2 className="text-3xl md:text-4xl font-black text-foreground leading-[1.1] tracking-tight">Quick Height Converter</h2>
                                <div className="h-1.5 w-16 bg-accent rounded-full mx-auto sm:mx-0" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm hover:border-accent/40 transition-colors">
                                    <h3 className="font-semibold text-muted mb-4 uppercase text-xs tracking-widest">cm → ft/in</h3>
                                    <div className="relative mb-4">
                                        <input type="number" min="0" value={convCmInput} onChange={e => setConvCmInput(e.target.value)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-lg font-medium" placeholder="Centimeters" />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold text-xs uppercase">cm</span>
                                    </div>
                                    <div className="h-14 flex items-center justify-center font-mono font-bold text-2xl text-accent bg-accent/5 rounded-xl border border-accent/10">{getCmToFtInDisplay()}</div>
                                </div>

                                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm hover:border-accent/40 transition-colors">
                                    <h3 className="font-semibold text-muted mb-4 uppercase text-xs tracking-widest">ft/in → cm</h3>
                                    <div className="flex gap-2 mb-4">
                                        <div className="relative flex-1">
                                            <input type="number" min="0" value={convFtInput} onChange={e => setConvFtInput(e.target.value)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-lg font-medium" placeholder="Feet" />
                                        </div>
                                        <div className="relative flex-1">
                                            <input type="number" min="0" value={convInInput} onChange={e => setConvInInput(e.target.value)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-lg font-medium" placeholder="Inches" />
                                        </div>
                                    </div>
                                    <div className="h-14 flex items-center justify-center font-mono font-bold text-2xl text-accent bg-accent/5 rounded-xl border border-accent/10">{getFtInToCmDisplay()}</div>
                                </div>
                            </div>
                        </section>

                        {/* SEO CONTENT SECTION */}
                        <div className="space-y-12 text-foreground mt-8">

                            <section className="space-y-4">
                                <h2 id="how-tall-will-my-child-be" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24">How Tall Will My Child Be?</h2>
                                <p className="text-muted leading-relaxed">
                                    At some point, nearly every parent wonders about their child’s future height. Maybe your toddler already seems taller than other kids their age. Or maybe your child suddenly shot up several inches during a growth spurt. It’s natural to start asking questions like “how tall will my kid be?”
                                </p>
                                <p className="text-muted leading-relaxed">
                                    The honest answer is that no one can predict adult height with complete certainty. However, research on child growth patterns has made it possible to estimate adult height fairly accurately.
                                </p>
                                <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                                    <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Modern height prediction calculators analyze several key factors:</h3>
                                    <ul className="space-y-2 text-muted">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="text-accent w-4 h-4" /> Genetics from parents</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="text-accent w-4 h-4" /> Current growth measurements</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="text-accent w-4 h-4" /> Statistical growth patterns observed in large populations</li>
                                    </ul>
                                </div>
                                <p className="text-muted leading-relaxed">
                                    These tools provide an estimated adult height range, which can help parents understand how their child’s development compares with typical growth patterns. The important thing to remember is that predictions are guidelines rather than guarantees.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 id="what-determines-child-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24">What Determines a Child’s Height?</h2>
                                <p className="text-muted leading-relaxed">
                                    A child’s final adult height is influenced by both genetics and environmental factors. Height is considered a polygenic trait, meaning it is influenced by many genes rather than a single genetic factor. Researchers studying human growth and development estimate that genetics explains most of the variation in adult height, while environmental influences determine how fully that genetic potential is reached.
                                </p>

                                <h3 className="text-xl font-bold text-foreground mt-8 mb-2">Genetics — The Biggest Factor</h3>
                                <p className="text-muted leading-relaxed">
                                    Genetics plays the largest role in determining how tall a person becomes. Researchers estimate that 60–80% of adult height is inherited from parents. Children of taller parents tend to grow taller, while children of shorter parents often grow closer to that range.
                                </p>
                                <p className="text-muted leading-relaxed">
                                    However, height inheritance isn’t perfectly predictable. Scientists frequently observe something known as regression toward the mean, where children of very tall or very short parents end up closer to the average population height.
                                </p>

                                <h3 className="text-xl font-bold text-foreground mt-8 mb-2">Nutrition, Sleep, and Physical Activity</h3>
                                <p className="text-muted leading-relaxed">
                                    The remaining 20–40% of height potential comes from environmental influences.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mt-6">
                                    <div className="bg-bg border border-border p-6 rounded-2xl">
                                        <h4 className="font-bold text-foreground text-lg mb-2">Nutrition</h4>
                                        <p className="text-sm text-muted leading-relaxed mb-3">Healthy bone development requires adequate nutrition during childhood. Important nutrients include:</p>
                                        <ul className="text-sm text-muted space-y-1 list-disc pl-4 marker:text-accent">
                                            <li>Protein</li>
                                            <li>Calcium</li>
                                            <li>Vitamin D</li>
                                            <li>Zinc</li>
                                        </ul>
                                        <p className="text-sm text-muted mt-3">Long-term nutritional deficiencies can slow growth and affect final adult height.</p>
                                    </div>
                                    <div className="bg-bg border border-border p-6 rounded-2xl">
                                        <h4 className="font-bold text-foreground text-lg mb-2">Sleep</h4>
                                        <p className="text-sm text-muted leading-relaxed mb-3">During deep sleep, the body releases growth hormone, which stimulates bone development and tissue growth. Recommendations:</p>
                                        <ul className="text-sm text-muted space-y-1 list-disc pl-4 marker:text-accent">
                                            <li>9–11 hours for school-age children</li>
                                            <li>8–10 hours for teenagers</li>
                                        </ul>
                                        <p className="text-sm text-muted mt-3">Growth hormone stimulates cell regeneration, making sleep vital for development.</p>
                                    </div>
                                    <div className="bg-bg border border-border p-6 rounded-2xl">
                                        <h4 className="font-bold text-foreground text-lg mb-2">Physical Activity</h4>
                                        <p className="text-sm text-muted leading-relaxed">Regular exercise supports bone strength and overall development. Activities such as running, jumping, and sports encourage healthy growth, although exercise alone cannot increase height beyond genetic potential.</p>
                                    </div>
                                </div>
                            </section>

                            <div className="grid md:grid-cols-2 gap-8">
                                <section className="space-y-4">
                                    <h2 id="when-do-boys-stop-growing" className="text-2xl font-black tracking-tight text-blue-500 scroll-mt-24">When Do Boys Stop Growing?</h2>
                                    <p className="text-muted leading-relaxed">Boys usually experience their main growth spurt during puberty. The typical growth timeline for boys looks like this:</p>
                                    <ul className="text-muted space-y-2 list-disc pl-5 marker:text-blue-500">
                                        <li>Early puberty begins around age 11–12</li>
                                        <li>Rapid growth occurs between ages 13 and 15</li>
                                        <li>Growth slows around 16–17</li>
                                    </ul>
                                    <p className="text-muted leading-relaxed">
                                        During peak puberty, boys can grow 3–4 inches per year. Most boys stop growing around 18 years old, although small increases in height may continue until around age 20.
                                    </p>
                                </section>

                                <section className="space-y-4">
                                    <h2 id="when-do-girls-stop-growing" className="text-2xl font-black tracking-tight text-pink-500 scroll-mt-24">When Do Girls Stop Growing?</h2>
                                    <p className="text-muted leading-relaxed">Girls generally begin puberty earlier than boys. Typical growth timeline:</p>
                                    <ul className="text-muted space-y-2 list-disc pl-5 marker:text-pink-500">
                                        <li>Puberty begins around age 9–10</li>
                                        <li>Growth spurt occurs between ages 10 and 14</li>
                                    </ul>
                                    <p className="text-muted leading-relaxed">
                                        Most girls reach their adult height between 15 and 16 years old. Because girls experience puberty earlier, they often appear taller than boys during late childhood.
                                    </p>
                                </section>
                            </div>

                            <section className="space-y-4">
                                <h2 id="boys-girls-growth-charts" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24">Boys & Girls Height Growth Charts</h2>
                                <p className="text-muted leading-relaxed">
                                    CDC growth charts provide a useful reference for child development. Growth charts compare a child’s height with population averages and show where they fall within percentile ranges. The 50th percentile represents the average height as well as median for children of the same age and sex.
                                </p>
                                <p className="text-muted leading-relaxed">
                                    Healthy children typically fall between the 3rd percentile and the 97th percentile. Pediatricians usually focus less on a single measurement and more on whether children stay on a consistent growth curve over time.
                                </p>
                            </section>

                            {/* VISUAL INSERTED AS REQUESTED */}
                            <div className="scroll-mt-24">
                                <HeightCharts />
                            </div>

                            <section className="space-y-4 pt-8">
                                <h2 id="predict-child-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24">How to Predict Your Child’s Height</h2>
                                <p className="text-muted leading-relaxed mb-6">
                                    There are several methods researchers use to estimate adult height. Height prediction models rely on anthropometric measurements, including height, weight, and age. These measurements are analyzed using population growth data and statistical distributions to estimate a likely adult height range.
                                </p>

                                <div className="space-y-8">
                                    <div className="bg-surface border border-border p-6 md:p-8 rounded-3xl">
                                        <h3 id="height-calculator-based-on-parents" className="text-xl font-bold text-foreground mb-3 scroll-mt-24">Height Calculator Based on Parents (Mid-Parental Height)</h3>
                                        <p className="text-muted leading-relaxed mb-4">
                                            The mid-parental height method is one of the simplest ways to estimate adult height. This formula calculates a child’s predicted height using the average height of both parents.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-bg border border-border p-4 rounded-xl">
                                                <span className="font-bold text-foreground block mb-1 text-sm">For Boys (US Units)</span>
                                                <code className="text-accent text-sm">(Father + Mother + 5 in) ÷ 2</code>
                                            </div>
                                            <div className="bg-bg border border-border p-4 rounded-xl">
                                                <span className="font-bold text-foreground block mb-1 text-sm">For Girls (US Units)</span>
                                                <code className="text-accent text-sm">(Father + Mother - 5 in) ÷ 2</code>
                                            </div>
                                        </div>
                                        <p className="text-muted leading-relaxed">
                                            This method usually predicts adult height within about ±4 inches (10 cm). Because it requires only parental height, it can also be used as a baby height calculator.
                                        </p>
                                    </div>

                                    <div className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                                        <h3 id="khamis-roche-method" className="text-xl font-bold text-foreground mb-3 scroll-mt-24">Khamis-Roche Method</h3>
                                        <p className="text-muted leading-relaxed mb-4">
                                            The Khamis-Roche method is widely considered the most accurate height prediction model that does not require bone age testing. This method analyzes four factors: child’s age, child’s height, child’s weight, and average height of both parents.
                                        </p>
                                        <p className="text-muted leading-relaxed mb-4">
                                            Researchers developed the formula after studying the growth patterns of thousands of children. Because the model includes current body measurements, it produces more accurate predictions than formulas based only on genetics.
                                        </p>
                                        <p className="text-sm font-bold text-foreground mb-2">Typical prediction accuracy:</p>
                                        <ul className="text-muted text-sm space-y-1 list-disc pl-5 marker:text-accent mb-4">
                                            <li>±2.1 inches for boys</li>
                                            <li>±1.7 inches for girls</li>
                                        </ul>
                                        <p className="text-muted leading-relaxed">
                                            For children older than four years, the Khamis-Roche calculator is usually the most reliable prediction method available outside a medical setting.
                                        </p>
                                    </div>

                                    <div className="bg-surface border border-border p-6 md:p-8 rounded-3xl">
                                        <h3 id="bone-age-method" className="text-xl font-bold text-foreground mb-3 scroll-mt-24">Bone Age Method (Clinical Height Prediction)</h3>
                                        <p className="text-muted leading-relaxed">
                                            Doctors sometimes estimate adult height using bone age testing. This involves an X-ray of the left wrist and hand to determine how mature the bones are compared with the child’s chronological age.
                                        </p>
                                        <p className="text-muted leading-relaxed mt-4">Two commonly used evaluation methods include:</p>
                                        <ul className="text-muted space-y-1 list-disc pl-5 marker:text-accent mb-4">
                                            <li>Greulich-Pyle method</li>
                                            <li>Tanner-Whitehouse method</li>
                                        </ul>
                                        <p className="text-muted leading-relaxed">
                                            If bone development is ahead or behind typical growth patterns, doctors can estimate how much growth remains. Bone age testing is usually used only when doctors suspect growth disorders or delayed puberty.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* VISUAL INSERTED AS REQUESTED */}
                            <div className="scroll-mt-24">
                                <GrowthPlateExplainer />
                            </div>

                            <section className="grid md:grid-cols-2 gap-8 pt-8">
                                <div className="bg-surface border border-border p-6 md:p-8 rounded-3xl">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Bayley-Pinneau Method</h3>
                                    <p className="text-muted leading-relaxed">
                                        The Bayley Pinneau method combines bone age data with height for age tables. Doctors calculate the percentage of adult height the child has already reached. The remaining growth potential determines the final height estimate. This method works well but requires bone age testing.
                                    </p>
                                </div>
                                <div className="bg-surface border border-border p-6 md:p-8 rounded-3xl">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Roche-Wainer-Thissen Method</h3>
                                    <p className="text-muted leading-relaxed">
                                        The Roche Wainer Thissen method uses several growth variables. The formula includes bone age, current height, weight, and parental heights. This approach improves accuracy in some cases. Because it requires clinical measurements, it is mostly used in medical settings.
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 id="boys-height-predictor" className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24">Boys Height Predictor: Understanding Male Growth</h2>
                                <p className="text-muted leading-relaxed">
                                    Male growth patterns differ from female growth patterns. Boys usually experience a later but longer growth spurt during puberty.
                                </p>
                                <p className="text-muted leading-relaxed">During peak puberty growth:</p>
                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-accent">
                                    <li>Boys grow around 3–4 inches per year</li>
                                    <li>Girls grow around 2.5–3 inches per year</li>
                                </ul>
                                <p className="text-muted leading-relaxed mt-4">
                                    Because boys start puberty later, they may appear shorter than girls during early adolescence before eventually catching up. If you are trying to estimate how tall your son will be, a Khamis-Roche height predictor typically provides the most accurate estimate.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 id="how-to-get-taller-as-a-kid" className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24">How to Get Taller As A Kid</h2>
                                <p className="text-muted leading-relaxed">
                                    Genetics determines the maximum height a person can reach, but lifestyle factors influence whether that potential is achieved.
                                </p>
                                <div className="grid md:grid-cols-3 gap-6 mt-4">
                                    <div className="bg-bg border border-border p-5 rounded-2xl">
                                        <h4 className="font-bold text-foreground mb-2">Healthy Diet</h4>
                                        <p className="text-sm text-muted">Balanced nutrition supports bone growth and development.</p>
                                    </div>
                                    <div className="bg-bg border border-border p-5 rounded-2xl">
                                        <h4 className="font-bold text-foreground mb-2">Adequate Sleep</h4>
                                        <p className="text-sm text-muted">Growth hormone peaks during deep sleep, making consistent sleep schedules important.</p>
                                    </div>
                                    <div className="bg-bg border border-border p-5 rounded-2xl">
                                        <h4 className="font-bold text-foreground mb-2">Regular Exercise</h4>
                                        <p className="text-sm text-muted">Physical activity supports bone strength and healthy development.</p>
                                    </div>
                                </div>
                                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                    <p className="text-sm font-medium text-foreground/80">
                                        However, it’s important to understand that no exercise routine, supplement, or stretching program can increase height once growth plates close.
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 id="accuracy" className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24">Why Height Predictions Aren’t Exact</h2>
                                <p className="text-muted leading-relaxed">
                                    Our child height predictor calculator estimates adult height using the Khamis Roche growth model. This model uses real growth data collected from long term studies of children. Most predictions fall within five to ten centimeters of final adult height.
                                </p>
                                <p className="text-muted leading-relaxed">The calculator works best when:</p>
                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-accent">
                                    <li>The child is older than four years</li>
                                    <li>Accurate height and weight measurements are used</li>
                                    <li>Parent height data is correct</li>
                                </ul>
                                <p className="text-muted leading-relaxed font-bold mt-4">
                                    The result represents a likely range rather than an exact value.
                                </p>
                            </section>
                        </div>

                        {/* FAQ Accordion Section */}
                        <div className="border border-border rounded-[2.5rem] overflow-hidden bg-surface transition-colors duration-500 shadow-sm mt-12">
                            <div className="px-8 md:px-12 pt-10 pb-8 text-center sm:text-left space-y-2 border-b border-border">
                                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                    HELP CENTER
                                </div>
                                <h2 id="child-height-calculator-faq" className="text-3xl font-black text-foreground scroll-mt-24">Frequently Asked Questions</h2>
                                <p className="text-sm text-muted">Scientific insights into your child&apos;s development</p>
                            </div>

                            <div className="px-6 md:px-10 py-6 flex flex-col gap-3">
                                {QA.map((item, idx) => {
                                    const isOpen = openIndex === idx;
                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/50 bg-bg shadow-lg shadow-accent/5' : 'border-border bg-bg hover:border-accent/30'}`}
                                        >
                                            <button
                                                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
                                                onClick={() => setOpenIndex(isOpen ? null : idx)}
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
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">References</h3>
                            <ul className="space-y-3 break-words overflow-hidden">
                                <li>Centers for Disease Control and Prevention. CDC Growth Charts. <br /><a href="https://www.cdc.gov/growthcharts" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/growthcharts</a></li>
                                <li>National Institutes of Health. Child Growth and Development Overview. <br /><a href="https://www.nichd.nih.gov/health/topics/childgrowth" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.nichd.nih.gov/health/topics/childgrowth</a></li>
                                <li>Silventoinen K. Determinants of variation in adult body height. Journal of Biosocial Science. <br /><a href="https://doi.org/10.1017/S0021932003006429" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://doi.org/10.1017/S0021932003006429</a></li>
                                <li>World Health Organization. Child Growth Standards. <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                                <li>National Sleep Foundation. Growth Hormone and Sleep in Children. <br /><a href="https://www.sleepfoundation.org/children-and-sleep" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.sleepfoundation.org/children-and-sleep</a></li>
                                <li>American Academy of Pediatrics. Physical Development in Adolescence. <br /><a href="https://www.healthychildren.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.healthychildren.org</a></li>
                                <li>Khamis HJ, Roche AF. Predicting adult stature without using skeletal age. Pediatrics. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/8616011/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/8616011/</a></li>
                                <li>Tanner JM. Growth at Adolescence. Blackwell Scientific Publications.</li>
                                <li>Greulich WW, Pyle SI. Radiographic Atlas of Skeletal Development of the Hand and Wrist.</li>
                                <li>Tanner JM, Whitehouse RH. Assessment of Skeletal Maturity.</li>
                                <li>Bayley N, Pinneau SR. Tables for predicting adult height from skeletal age.</li>
                                <li>Roche AF, Wainer H, Thissen D. Predicting adult stature for individuals.</li>
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

            {/* Comparison Chart Overlay */}
            <AnimatePresence>
                {showChart && chartPersons && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-[60] bg-bg overflow-hidden">
                        <HeightDashboard
                            readOnly={true}
                            initialPersons={chartPersons}
                            onClose={() => setShowChart(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}