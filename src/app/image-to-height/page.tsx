'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Plus, Ruler, Trash2, Box, Moon, Sun, Monitor, Info, HelpCircle, CheckCircle2, Camera, Smartphone, ChevronDown, Menu } from 'lucide-react';
import { useUnitStore, useThemeStore, usePersonStore } from '@/store';
import { ImageMeasurement } from '@/components/ImageMeasurement';

export default function ImageToHeightPage() {
    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const { theme, toggleTheme } = useThemeStore();
    const { persons, removePerson } = usePersonStore();
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Apply the theme to the <html> document root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // No manual add logic needed anymore as per requirements

    return (
        <div className="flex flex-col min-h-screen bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            {/* Top Header */}
            <header className="h-[70px] shrink-0 border-b border-border/50 bg-bg flex items-center justify-between px-6 sm:px-12 z-50">
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
                    <Link href="/height-calculator" className="text-[15px] font-medium text-muted hover:text-foreground transition-colors"> Child height calculator </Link>
                    <Link href="/image-to-height" className="text-[15px] font-bold text-accent transition-colors border-b-2 border-accent pb-1 flex items-center gap-2">
                        Image to Height <Box size={14} />
                    </Link>
                    <button className="text-[15px] font-medium text-muted hover:text-foreground transition-colors">About</button>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleUnitSystem}
                        className="flex items-center gap-2 group hover:bg-item-hover px-4 py-2 rounded-xl transition-all border border-border bg-surface"
                    >
                        <ArrowLeftRight size={16} className="text-muted/50 group-hover:text-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted group-hover:text-foreground">
                            {unitSystem === 'metric' ? 'cm' : 'ft'}
                        </span>
                    </button>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-muted hover:text-foreground hover:bg-surface/50 rounded-full transition-colors flex items-center justify-center"
                        title="Toggle Theme"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {theme === 'dark' ? (
                                <motion.div key="moon" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon size={18} />
                                </motion.div>
                            ) : (
                                <motion.div key="sun" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun size={18} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Mobile Hamburger Menu */}
                    <div className="relative">
                        <button
                            className="lg:hidden p-2 text-muted hover:text-foreground transition-colors -ml-2"
                            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                        >
                            <Menu size={24} />
                        </button>

                        <AnimatePresence>
                            {isNavMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-2xl shadow-2xl p-2 z-[60] lg:hidden"
                                >
                                    <Link href="/" onClick={() => setIsNavMenuOpen(false)}><button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">Home</button></Link>
                                    <Link href="/height-calculator" onClick={() => setIsNavMenuOpen(false)}><button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">Calculator</button></Link>
                                    <Link href="/image-to-height" onClick={() => setIsNavMenuOpen(false)}>
                                        <button className="w-full text-left px-4 py-3 text-sm font-semibold text-accent bg-accent/10 rounded-xl transition-colors flex items-center justify-between">
                                            Image to Height <Box size={14} />
                                        </button>
                                    </Link>
                                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsNavMenuOpen(false)}>About</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* Main Application Area - Mobile First stacking */}
            <main className="flex-1 flex flex-col md:flex-row relative p-4 gap-4 bg-canvas">

                {/* Right Panel (Tool & Content) - Shown first on mobile */}
                <div className="md:w-[72%] w-full flex flex-col gap-4 pb-10 order-1 md:order-2">
                    <div className="flex-1 min-h-[500px] sm:min-h-[610px] bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative">
                        <div className="p-4 md:p-8 flex flex-col relative w-full h-full">
                            {/* Ghost Watermark */}
                            <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[15vw] font-black text-foreground opacity-5 pointer-events-none select-none tracking-tighter leading-none">
                                HEIGHT
                            </div>
                            <div className="relative z-10 w-full max-w-4xl mx-auto">
                                <ImageMeasurement />
                            </div>
                        </div>
                    </div>

                    {/* Comprehensive Content Section */}
                    <div className="flex flex-col gap-12 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                        {/* 1. Main Headline & Problem */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                                How to Measure Your Height Without a Measuring Tape — <span className="text-accent">Upload a Photo and Find Out Instantly</span>
                            </h2>
                            <div className="h-1.5 w-24 bg-accent rounded-full" />

                            <div className="grid md:grid-cols-5 gap-8 items-start">
                                <div className="md:col-span-3 space-y-4">
                                    <h3 className="text-xl font-bold text-foreground">The Problem With Measuring Your Own Height</h3>
                                    <p className="text-muted leading-relaxed">
                                        Measuring your own height accurately is harder than it looks — especially alone.
                                        Most people have tried the wall-and-book method. Stand straight, balance a hardback on your head, mark the wall, measure the mark.
                                        Simple enough except you&apos;re probably hunching slightly, the book isn&apos;t perfectly level, or the tape isn&apos;t sitting flat on the floor.
                                        The result is off by half an inch to a full inch without you realizing it.
                                    </p>
                                    <div className="p-4 bg-accent/5 border-l-4 border-accent rounded-r-xl">
                                        <p className="text-sm italic text-foreground/80">
                                            &quot;One more thing most people don&apos;t know: you&apos;re up to 1 cm taller in the morning than at night. Your spine compresses slightly throughout the day.&quot;
                                        </p>
                                    </div>
                                    <p className="text-muted leading-relaxed">
                                        Doing it alone makes it worse. Reaching up to mark a wall while keeping your heels flat and standing straight at the same time is awkward at best.
                                        And most guides on how to measure your height at home assume you have a second person helping, which defeats the point.
                                    </p>
                                </div>
                                <div className="md:col-span-2 bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-4">
                                    <h4 className="font-black uppercase tracking-widest text-[10px] text-accent">Quick Workarounds</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: "Doorframe Method", desc: "Standard doors are 203cm tall. Use them as a baseline." },
                                            { title: "Arm Span Method", desc: "Wingspan fingertip-to-fingertip is roughly equal to height." },
                                            { title: "Dollar Bill Method", desc: "A US dollar bill is 6.14 inches long. Stack and multiply." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-3 items-start">
                                                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent text-[10px] font-bold shrink-0">{i + 1}</div>
                                                <div>
                                                    <p className="text-xs font-bold text-foreground">{item.title}</p>
                                                    <p className="text-[11px] text-muted leading-tight mt-0.5">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-muted italic pt-2 border-t border-border">Limitation: These get you close, not exact.</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Photo Method Explained */}
                        <div className="bg-bg border border-border rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-1000" />
                            <div className="relative z-10 max-w-3xl">
                                <h3 className="text-2xl font-black text-foreground mb-4">Using a Photo: The Most Reliable Shortcut</h3>
                                <p className="text-muted leading-relaxed text-lg">
                                    Every photo contains hidden scale information as long as you know the size of at least one object in it.
                                    If either a standard door (203cm) or a credit card (85.6mm) appears in a photo with a person, the height is calculable.
                                    The relationship between every object in the frame is mathematically fixed once you have one known measurement.
                                </p>
                            </div>
                        </div>

                        {/* 3. Step-by-Step Visualization */}
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <h3 className="text-2xl font-black text-foreground">How It Works: Step-by-Step</h3>
                                <span className="text-xs font-bold text-muted uppercase tracking-[0.2em] bg-surface border border-border px-4 py-1.5 rounded-full">Automated Process</span>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { icon: <Camera size={20} />, title: "Upload Your Photo", body: "Select any photo where the subject is visible. For best results, use a full-body photo." },
                                    { icon: <Ruler size={20} />, title: "Calibrate Measurement", body: "Mark a known object like a door (203cm) or card (8.56cm) to set the scale." },
                                    { icon: <Smartphone size={20} />, title: "Measure Your Height", body: "Draw a line from the floor to the top of the subject's head." },
                                    { icon: <CheckCircle2 size={20} />, title: "Get Your Results", body: "Our tool calculates the height instantly in both CM and FT/IN." }
                                ].map((step, idx) => (
                                    <div key={idx} className="bg-surface border border-border p-6 rounded-3xl hover:border-accent/40 transition-all hover:translate-y-[-4px] group">
                                        <div className="w-12 h-12 rounded-2xl bg-bg border border-border flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent/5 transition-all mb-4">
                                            {step.icon}
                                        </div>
                                        <p className="text-[14px] font-black uppercase text-accent/60 mb-1 tracking-widest">Step 0{idx + 1}</p>
                                        <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                                        <p className="text-xs text-muted leading-relaxed">{step.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Tips Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-foreground flex items-center gap-3">
                                <Info className="text-accent" /> Tips for High Accuracy
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: "Shoot Straight-on", desc: "Camera at chest height, pointed straight. Avoid high or low angles." },
                                    { title: "Stand Straight", desc: "Heels flat, back straight, head level. Slouching introduces errors." },
                                    { title: "Reference Placement", desc: "Keep the reference object close to the subject to avoid lens distortion." },
                                    { title: "Standard Doors", desc: "Most reliable indoors. 203cm is the universal standard baseline." },
                                    { title: "Full Body", desc: "Feet must be in view. Always measure from the floor, not the toes." }
                                ].map((tip, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                            <Plus size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground leading-tight">{tip.title}</h4>
                                            <p className="text-xs text-muted mt-1 leading-relaxed">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Frequently Asked Questions — Accordion */}
                        <div className="border border-border rounded-[2.5rem] overflow-hidden mb-20 bg-surface transition-colors duration-500">
                            {/* Header */}
                            <div className="px-8 md:px-12 pt-10 pb-8 text-center space-y-2 border-b border-border">
                                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                    <HelpCircle size={12} /> FAQ
                                </div>
                                <h3 className="text-3xl font-black text-foreground">Frequently Asked Questions</h3>
                                <p className="text-sm text-muted">Everything you need to know about the image height tool</p>
                            </div>

                            {/* Accordion Items */}
                            <div className="px-6 md:px-10 py-6 flex flex-col gap-3">
                                {[
                                    {
                                        q: "How accurate is the photo measurement?",
                                        a: "Typically within 1–2 cm. Accuracy depends on camera angle, distance, and calibration precision. Best results come from straight-on photos at waist height with a clearly visible reference object on the same plane as the subject."
                                    },
                                    {
                                        q: "What is the best object to use for calibration?",
                                        a: "A standard interior door (203 cm / 6 ft 8 in) is the most reliable because it's a universal size. Credit cards (8.56 × 5.4 cm), A4 paper (29.7 cm tall), and standard rulers also work very well."
                                    },
                                    {
                                        q: "Can I measure someone else's height from a photo?",
                                        a: "Yes — this tool works on any photo of any person or object. As long as there is one reference object of known size in the frame, you can calculate the height of anything else in the image."
                                    },
                                    {
                                        q: "Does it work for measuring celebrities?",
                                        a: "Yes. If a paparazzi photo or red-carpet shot has a door, railing, or other known object visible alongside the celebrity, you can calibrate and measure with reasonable accuracy."
                                    },
                                    {
                                        q: "Do I need to create an account?",
                                        a: "No. The tool is completely free, requires no sign-up, and runs entirely in your browser. Nothing is uploaded to any server."
                                    },
                                    {
                                        q: "Is my uploaded photo stored or shared?",
                                        a: "No. All image processing happens locally on your device using the browser's Canvas API. Your photos are never sent to a server, stored remotely, or shared with anyone."
                                    },
                                    {
                                        q: "What photos give the best results?",
                                        a: "Full-body photos taken straight-on (not at an angle), in good lighting, where both feet and top of head are clearly visible. Avoid wide-angle or fisheye lenses as they distort proportions."
                                    },
                                    {
                                        q: "Can I use this on mobile?",
                                        a: "Yes. The tool is fully mobile-compatible. Use fullscreen mode for more precise line-drawing, and the tap-to-draw feature lets you place start and end points with just two taps."
                                    }
                                ].map((faq, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen
                                                ? 'border-accent/50 bg-bg shadow-lg shadow-accent/5'
                                                : 'border-border bg-bg hover:border-accent/30'
                                                }`}
                                        >
                                            {/* Trigger Button */}
                                            <button
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen
                                                        ? 'bg-accent text-white shadow-md shadow-accent/30'
                                                        : 'bg-accent/10 text-accent'
                                                        }`}>
                                                        <HelpCircle size={13} />
                                                    </div>
                                                    <span className={`text-sm font-bold transition-colors duration-200 truncate ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
                                                        }`}>
                                                        {faq.q}
                                                    </span>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                    className={`shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-muted'}`}
                                                >
                                                    <ChevronDown size={18} />
                                                </motion.div>
                                            </button>

                                            {/* Animated Answer */}
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        key="answer"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pt-0 pb-5 border-t border-border/40">
                                                            <p className="text-sm text-muted leading-relaxed pl-10 pt-4">
                                                                {faq.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer CTA */}
                            <div className="px-8 md:px-12 pb-10 pt-4 border-t border-border flex flex-col items-center gap-4 text-center">
                                <h4 className="text-xl font-bold text-foreground">No Tape Measure? No Problem.</h4>
                                <p className="text-sm text-muted max-w-sm">Upload a photo, set your reference point, and get your measurement in under a minute.</p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Monitor size={16} /> Measure Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Panel (Comparison List) - Shown second on mobile */}
                <div className="md:w-[28%] w-full flex flex-col gap-4 pb-10 order-2 md:order-1">

                    {/* Simplified AISpace Welcome Card */}
                    <div className="bg-surface border border-border rounded-3xl p-6 shadow-xl flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent/50" />
                        <h2 className="text-sm font-black uppercase tracking-[0.1em] text-foreground">
                            Image to Height
                        </h2>
                        <p className="text-xs text-muted font-medium">
                            Use advanced vision analysis to estimate heights from photographs.
                        </p>
                    </div>

                    {/* Currently Comparing List */}
                    <div className="bg-surface border border-border rounded-3xl p-6 shadow-xl flex flex-col gap-4 flex-1">
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">
                                Currently Comparing
                            </h2>
                            <p className="text-xs text-muted mt-1 font-medium">{persons.length} entities tracked</p>
                        </div>

                        <div className="space-y-3 mt-2 pr-2 pb-4">
                            {/* Locked Standard Door */}
                            <div className="bg-bg border border-border rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-foreground/20" />
                                <div className="flex items-center gap-3 pl-2">
                                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground/40">
                                        <Ruler size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground">Standard Door</h3>
                                        <p className="text-xs text-muted font-mono mt-0.5">Reference Object</p>
                                    </div>
                                </div>
                                {/* Notice the added pr-8 md:pr-10 here to match the persons list */}
                                <div className="flex items-baseline justify-end gap-1.5 pr-8 md:pr-10">
                                    <span className="text-lg font-black text-foreground whitespace-nowrap">
                                        {unitSystem === 'metric' ? '210.0' : (210 / 30.48).toFixed(1)}
                                    </span>
                                    <span className="text-[11px] font-bold text-muted uppercase whitespace-nowrap">
                                        {unitSystem === 'metric' ? 'cm' : 'ft'}
                                    </span>
                                </div>

                            </div>

                            <AnimatePresence>
                                {persons.map(person => (
                                    <motion.div
                                        key={person.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                        className="bg-bg border border-border rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group hover:border-border/80 transition-colors"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: person.color }} />
                                        <div className="flex items-center gap-3 pl-2">
                                            <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center font-black" style={{ color: person.color }}>
                                                {person.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-foreground line-clamp-1">{person.name}</h3>
                                                <p className="text-xs text-muted mt-0.5 capitalize">{person.gender || 'Object'}</p>
                                            </div>
                                        </div>

                                        {/* The fix: Added pr-8 to give the text room, and absolute positioned the button */}
                                        <div className="flex items-center pr-8 md:pr-10">
                                            <div className="flex items-baseline justify-end gap-1.5">
                                                <span className="text-lg font-black text-foreground whitespace-nowrap">
                                                    {unitSystem === 'metric' ? person.heightCm.toFixed(1) : (person.heightCm / 30.48).toFixed(1)}
                                                </span>
                                                <span className="text-[11px] font-bold text-muted uppercase whitespace-nowrap">
                                                    {unitSystem === 'metric' ? 'cm' : 'ft'}
                                                </span>
                                            </div>

                                            {/* Button is now absolutely positioned to the right edge */}
                                            <button
                                                onClick={() => removePerson(person.id)}
                                                className="absolute right-3 w-8 h-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {persons.length === 0 && (
                                <div className="text-center py-8 px-4 border border-dashed border-border rounded-2xl">
                                    <p className="text-xs font-bold text-muted tracking-wide uppercase">No items added yet</p>
                                    <p className="text-xs text-muted/60 mt-1">Measure via image to start</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
