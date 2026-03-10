'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, ChevronLeft, Plus, Ruler, Trash2, Box, BarChart2, Moon, Sun } from 'lucide-react';
import { useUnitStore, useThemeStore, usePersonStore } from '@/store';
import { ImageMeasurement } from '@/components/ImageMeasurement';

export default function AISpacePage() {
    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const { theme, toggleTheme } = useThemeStore();
    const { persons, removePerson } = usePersonStore();

    // Apply the theme to the <html> document root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // const [isSaved, setIsSaved] = useState(false);

    // No manual add logic needed anymore as per requirements

    return (
        <div className="flex flex-col min-h-screen bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            {/* Top Header */}
            <header className="h-[70px] shrink-0 border-b border-border/50 bg-bg flex items-center justify-between px-6 sm:px-12 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center justify-center p-2 rounded-xl text-muted hover:text-foreground hover:bg-surface/50 transition-colors">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center relative overflow-hidden text-accent">
                            <Box size={16} />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors">
                            AI<span className="text-accent">Space</span>
                        </h1>
                    </div>
                </div>

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
                    <Link href="/" className="hidden sm:flex bg-surface hover:bg-surface/80 border border-border text-foreground font-semibold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all active:scale-95 items-center gap-2">
                        <BarChart2 size={16} /> Dashboard
                    </Link>
                </div>
            </header>

            {/* Main Application Area - Mobile First stacking */}
            <main className="flex-1 flex flex-col md:flex-row relative p-4 gap-4 bg-canvas">

                {/* Right Panel (Tool & Content) - Shown first on mobile */}
                <div className="md:w-[72%] w-full flex flex-col gap-4 pb-10 order-1 md:order-2">
                    <div className="flex-1 min-h-[500px] sm:min-h-[610px] bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative">
                        <div className="p-4 md:p-8 flex flex-col relative w-full h-full">
                            {/* Ghost AI Watermark */}
                            <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[15vw] font-black text-foreground opacity-5 pointer-events-none select-none tracking-tighter leading-none">
                                AI
                            </div>
                            <div className="relative z-10 w-full max-w-4xl mx-auto">
                                <ImageMeasurement />
                            </div>
                        </div>
                    </div>

                    {/* How to Guide Section */}
                    <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 shadow-lg mt-4 content-section">
                        <h2 className="text-xl md:text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                            <Ruler className="text-accent" /> How to Determine Your Height Without Measuring: Using a Photo
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground font-sans">Step-by-Step Instructions</h3>
                                <div className="space-y-4 text-muted text-sm leading-relaxed">
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">1</div>
                                        <p><strong>Upload a full-body photo</strong> standing upright with natural posture.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">2</div>
                                        <p><strong>Calibrate</strong> by drawing a line over an object of known size in the photo (like a door handle, credit card, or A4 paper).</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">3</div>
                                        <p><strong>Enter the exact size</strong> of that reference object to set the scale.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">4</div>
                                        <p><strong>Measure</strong> by drawing a line from the top of the head to the floor.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground font-sans">Frequently Asked Questions</h3>
                                <div className="space-y-4">
                                    <details className="group border-b border-border pb-4">
                                        <summary className="list-none font-bold text-sm cursor-pointer flex justify-between items-center group-open:text-accent transition-colors">
                                            How accurate is the measurement?
                                            <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                        </summary>
                                        <p className="text-xs text-muted mt-2 leading-relaxed">Accuracy depends on camera angle and perspective. For best results, take the photo exactly at waist height and ensure the person is standing on the same plane as the reference object.</p>
                                    </details>
                                    <details className="group border-b border-border pb-4">
                                        <summary className="list-none font-bold text-sm cursor-pointer flex justify-between items-center group-open:text-accent transition-colors">
                                            What photos work best?
                                            <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                        </summary>
                                        <p className="text-xs text-muted mt-2 leading-relaxed">Clear, well-lit photos with high resolution. Avoid wide-angle lenses or extreme &apos;fish-eye&apos; effects which can distort height proportions.</p>
                                    </details>
                                    <details className="group">
                                        <summary className="list-none font-bold text-sm cursor-pointer flex justify-between items-center group-open:text-accent transition-colors">
                                            Is my data private?
                                            <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                        </summary>
                                        <p className="text-xs text-muted mt-2 leading-relaxed">Yes. All image processing happens locally in your browser. No photos are uploaded to any server or stored remotely.</p>
                                    </details>
                                </div>
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
                            AI Workspace
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
                                <div className="text-right">
                                    <div className="text-lg font-black text-foreground">
                                        {unitSystem === 'metric' ? '210' : (210 / 30.48).toFixed(1)}
                                    </div>
                                    <div className="text-[10px] font-bold text-muted uppercase">
                                        {unitSystem === 'metric' ? 'cm' : 'ft'}
                                    </div>
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

                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-lg font-black text-foreground">
                                                    {unitSystem === 'metric' ? person.heightCm.toFixed(1) : (person.heightCm / 30.48).toFixed(1)}
                                                </div>
                                                <div className="text-[10px] font-bold text-muted uppercase">
                                                    {unitSystem === 'metric' ? 'cm' : 'ft'}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removePerson(person.id)}
                                                className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
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
