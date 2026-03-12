'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, Box, ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore } from '@/store';
import HeightDashboard from '@/components/HeightDashboard';
import HeightCharts from '@/components/HeightCharts';
import GrowthPlateExplainer from '@/components/GrowthPlateExplainer';
import { Person } from '@/types';

export default function HeightCalculatorPage() {
    const { theme, toggleTheme } = useThemeStore();
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // --- Shared State for Units (Keeps both sections in sync) ---
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

        // 1. Mid-Parental Height (MPH)
        const mph = (childGender === 'male')
            ? (pFatherCm + pMotherCm + 13) / 2
            : (pFatherCm + pMotherCm - 13) / 2;

        // 2. Growth Curve Projection
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

        // Find nearest data points for current age
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

        // Projection: (CurrentChildHt / AvgHAtCurrentAge) * AvgHAt18
        const curveProjection = (currentChildCm / currentAvgHeight) * avgHeightAt18;

        // Final result: Weighted combination
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

    // Calculate Section 2
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

    // Converter Live Logic
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

    return (
        <div className="min-h-screen bg-bg text-foreground font-sans transition-colors duration-500 overflow-x-hidden">
            {/* --- Navbar --- */}
            <header className="h-[70px] shrink-0 border-b border-border/50 bg-bg flex items-center justify-between px-6 sm:px-12 z-50 sticky top-0">
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
                    <Link href="/height-calculator" className="text-[15px] font-bold text-foreground transition-colors border-b-2 border-accent pb-1">Calculator</Link>
                    <Link href="/image-to-height" className="text-[15px] font-bold text-accent transition-colors flex items-center gap-2">
                        Image to Height <Box size={14} />
                    </Link>
                    <Link href="/about" className="text-[15px] font-medium text-muted hover:text-foreground transition-colors">About</Link>
                </nav>

                <div className="flex items-center gap-4 sm:gap-6">
                    {/* The Unit Toggle has been successfully removed from here! */}

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
                                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-2xl shadow-2xl p-2 z-[60] lg:hidden">
                                    {/* The Unit Toggle has been successfully removed from here as well! */}
                                    <Link href="/"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">Home</button></Link>
                                    <Link href="/height-calculator"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground bg-accent/10 rounded-xl transition-colors">Calculator</button></Link>
                                    <Link href="/image-to-height"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-accent hover:text-accent/80 hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between">Image to Height <Box size={14} /></button></Link>
                                    <Link href="/about"><button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">About</button></Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="flex-1 flex flex-col relative p-4 md:p-8 bg-canvas">
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-12 mt-4 md:mt-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                    <div className="space-y-6 text-center sm:text-left">
                        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                            Child Height Predictor
                        </h1>
                        <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                        <p className="text-muted leading-relaxed text-lg max-w-2xl mx-auto sm:mx-0">
                            Use our free child height predictor to estimate how tall your child will be. Based on Khamis-Roche and mid-parental height methods.
                        </p>
                    </div>

                    {/* SECTION 1: KHAMIS ROCHE */}
                    <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black tracking-tight text-foreground">Height Predictor <span className="text-muted text-base font-medium ml-2 uppercase tracking-widest">(Khamis-Roche)</span></h2>
                            </div>
                            {/* Synced Unit Toggle added here */}
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
                            {/* Synced Unit Toggle added here */}
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

                    {/* 2.5. NEW CHARTS AND EXPLAINERS FROM RECHARTS */}
                    <HeightCharts />
                    <GrowthPlateExplainer />

                    {/* 3. Methods Visualization */}
                    <div className="space-y-8 mt-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <h3 className="text-2xl font-black text-foreground">Prediction Methods Explained</h3>
                            <span className="text-xs font-bold text-muted uppercase tracking-[0.2em] bg-surface border border-border px-4 py-1.5 rounded-full">Science-Based Models</span>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { title: "Mid-Parental Height", body: "The simpler approach for babies. Averages both parents' heights with a ±5 inch sex adjustment." },
                                { title: "Khamis-Roche Method", body: "The gold standard for toddlers over 4. Uses age, current height, and current weight for precision." },
                                { title: "Bone Age Assessment", body: "Clinical X-ray method used by endocrinologists to view skeletal maturity. Most accurate overall." }
                            ].map((step, idx) => (
                                <div key={idx} className="bg-surface border border-border p-6 rounded-3xl hover:border-accent/40 transition-all hover:translate-y-[-4px] group">
                                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-black mb-4">
                                        0{idx + 1}
                                    </div>
                                    <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                                    <p className="text-xs text-muted leading-relaxed">{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Accordion Section */}
                    <div className="border border-border rounded-[2.5rem] overflow-hidden bg-surface transition-colors duration-500 shadow-sm mt-4">
                        {/* Header */}
                        <div className="px-8 md:px-12 pt-10 pb-8 text-center sm:text-left space-y-2 border-b border-border">
                            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                HELP CENTER
                            </div>
                            <h3 className="text-3xl font-black text-foreground">Frequently Asked Questions</h3>
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

                        {/* Conclusion Footer */}
                        <div className="px-8 md:px-12 pb-10 pt-8 border-t border-border flex flex-col items-center gap-4 text-center">
                            <h4 className="text-xl font-bold text-foreground">A Guide, Not a Guarantee</h4>
                            <p className="text-sm text-muted max-w-sm">Run the numbers, note the range, and track the journey. Height is just one part of your child&apos;s story.</p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-accent text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95"
                            >
                                Predict Another Height
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t border-border mt-auto">
                <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <div className="flex gap-4">
                        <Link href="/about" className="hover:text-foreground">About</Link>
                        <span className="text-border">|</span>
                        <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        <span className="text-border">|</span>
                        <button className="hover:text-foreground">FAQ</button>
                        <span className="text-border">|</span>
                        <Link href="/terms" className="hover:text-foreground">Terms</Link>
                        <span className="text-border">|</span>
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