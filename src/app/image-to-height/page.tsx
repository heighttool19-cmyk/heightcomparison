'use client';

import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Ruler, Trash2, Monitor, HelpCircle, CheckCircle2, Camera, Smartphone, ChevronDown, Info } from 'lucide-react';
import { useUnitStore, useThemeStore, usePersonStore } from '@/store';
import { ImageMeasurement } from '@/components/ImageMeasurement';
import Navbar from '@/components/Navbar';

export default function ImageToHeightPage() {
    const { unitSystem } = useUnitStore();
    const { theme } = useThemeStore();
    const { persons, removePerson } = usePersonStore();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // Apply the theme to the <html> document root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="flex flex-col min-h-[100dvh] bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 overflow-x-hidden">
            <Navbar activePage="image-to-height" />

            {/* Main Application Area - Mobile First stacking */}
            <main className="flex-1 flex flex-col justify-center align-center items-center md:flex-row relative p-4 gap-4 bg-canvas overflow-x-hidden w-full">

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
                    <div className="flex p-6 flex-col gap-12 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

                        {/* 1. Main Headline & Problem */}
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                                Measure Your Height From a Photo. <span className="text-accent">No Tape Measure Needed.</span>
                            </h1>
                            <div className="h-1.5 w-24 bg-accent rounded-full" />
                            <p className="text-muted leading-relaxed text-lg max-w-3xl mt-6">
                                Upload any photo with a door or known object in the frame. Set one reference point. Get your height in centimeters and feet and inches. Results land within 1 to 2 centimeters. Free, no sign-up, works on any device.
                            </p>
                            <div className="pt-2 flex flex-col items-start gap-3">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Monitor size={16} /> Upload Your Photo and Measure Now
                                </button>
                                <p className="text-[11px] text-muted font-medium flex items-center gap-1.5 ml-2">
                                    <CheckCircle2 size={12} className="text-accent" /> Accurate to 1–2 cm. Free. No account needed.
                                </p>
                            </div>

                            {/* Stacked Content Layout */}
                            <div className="mt-12 space-y-12 max-w-3xl">

                                {/* Problem Section */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-foreground">The Problem With Measuring Your Own Height</h2>
                                    <p className="text-muted leading-relaxed">
                                        Measuring your own height accurately is harder than it looks. Most people are off by half an inch to a full inch without realizing it.
                                    </p>
                                    <p className="text-muted leading-relaxed">
                                        The wall-and-book method fails in three specific ways. You are probably hunching slightly. The book is not perfectly level. The tape is not sitting flat on the floor. Each error is small. Together they push the reading off by more than you expect.
                                    </p>
                                    <div className="p-4 bg-accent/5 border-l-4 border-accent rounded-r-xl my-4">
                                        <p className="text-sm italic text-foreground/80">
                                            There is one more thing most people miss. Your spine compresses under your body weight throughout the day. You stand up to one centimeter taller in the morning than at night. The time you measure actually changes the number.
                                        </p>
                                    </div>
                                    <p className="text-muted leading-relaxed">
                                        Doing it alone makes everything worse. Standing straight, balancing a hardback on your head, marking a wall, and measuring the mark, all at once, is physically awkward. Most guides assume a second person is helping. That defeats the point.
                                        <br /> There is a cleaner way.</p>
                                </div>

                                {/* Alternate Methods Section (Reformatted to match article flow) */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-foreground">How to Measure Your Height Without a Measuring Tape</h2>
                                    <p className="text-muted leading-relaxed">
                                        Three methods work reliably when no tape measure is available. Each uses a fixed reference dimension to establish scale.
                                    </p>

                                    <div className="space-y-6 mt-6">
                                        {[
                                            { title: "The doorframe method.", desc: "Standard US interior doors stand 80 inches (203 cm) tall. Stand in the frame, note where the top of your head falls, and you have a working estimate. Not precise to the half-inch, but accurate enough to know whether you are 5'8\" or 5'10\"." },
                                            { title: "The arm span method.", desc: "Your fingertip-to-fingertip wingspan with arms fully extended matches your height within about one inch. If you know your arm span, you know your height." },
                                            { title: "The dollar bill method.", desc: "A US dollar bill is 6.14 inches long. Mark your height on a wall, stack bills from the floor to the mark, count them, and multiply. Tedious, but mathematically sound." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                                                <div>
                                                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                                                    <p className="text-muted leading-relaxed mt-1">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-muted leading-relaxed pt-6">
                                        All three get you close. None gets you exact. Confirming the precise number still needs a calibrated reference at some point, unless you use a photo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Photo Method Explained */}
                        <div className="bg-bg border border-border rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-1000" />
                            <div className="relative z-10 max-w-3xl">
                                <h2 className="text-2xl font-black text-foreground mb-4">How to Determine Your Height Without Measuring: Using a Photo</h2>
                                <p className="text-muted leading-relaxed text-lg mb-4">
                                    Every photo contains fixed scale data as long as one object of known size appears in the frame. A standard door is 203 cm. A credit card is 85.6 mm wide. When either appears alongside a person, that person&apos;s height is calculable from the image alone.
                                </p>
                                <p className="text-muted leading-relaxed text-lg mb-8">
                                    That is exactly how this tool works. Upload a photo, identify one object you know the size of, and the tool calculates the height of anyone in the frame. No tape measure. No wall marks. No second person.
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-accent text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95 inline-flex"
                                >
                                    <Monitor size={16} /> Upload Your Photo and Measure Now
                                </button>
                            </div>
                        </div>

                        {/* 3. Step-by-Step Visualization */}
                        <div className="space-y-8 w-full">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                {/* Responsive sizing + whitespace-nowrap ensures it stays on one line on all devices */}
                                <h3 className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-[28px] xl:text-3xl font-black text-foreground tracking-tight">
                                    How the Image Height Tool Works: Step by Step
                                </h3>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { icon: <Camera size={20} />, title: "Upload your photo", body: "Use any photo that shows the full body, head to toe. Include at least one object of known size in the frame. A doorframe is the most reliable option." },
                                    { icon: <Ruler size={20} />, title: "Calibrate with a known object", body: "Select the reference object and enter its real size. A standard US interior door at 203 cm (80 inches) is the best choice. Its size is fixed and consistent across US construction. The more accurate your reference, the more accurate your result." },
                                    { icon: <Smartphone size={20} />, title: "Draw your measurement line", body: "Place a line from the floor beneath the subject's feet to the top of their head. Start from the floor, not the feet. That gap matters when footwear appears in the photo." },
                                    { icon: <CheckCircle2 size={20} />, title: "Read your result and save to chart", body: "Your height appears in both centimeters and feet and inches. Hit \"Save to Chart\" to log it and compare against friends, athletes, celebrities, or anyone else." }
                                ].map((step, idx) => (
                                    <div key={idx} className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/40 transition-all hover:translate-y-[-4px] group flex flex-col">
                                        {/* Circular icon container to match screenshot */}
                                        <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent/5 transition-all mb-6">
                                            {step.icon}
                                        </div>
                                        {/* Solid green step text */}
                                        <p className="text-[14px] font-black uppercase text-accent mb-2 tracking-widest">
                                            Step 0{idx + 1}
                                        </p>
                                        <h4 className="text-base font-bold text-foreground mb-3 leading-snug">
                                            {step.title}
                                        </h4>
                                        <p className="text-[13px] text-muted leading-relaxed">
                                            {step.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Tips Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                                <Info className="text-accent" /> How to Measure Your Height Accurately: Tips for the Best Result
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: "Camera angle", desc: "Camera angle is the single biggest source of error in photo-based measurement. A phone aimed from below adds false height. From above it removes it. Set your camera at mid-chest height, pointed straight ahead." },
                                    { title: "Reference Placement", desc: "Keep your reference object close to the subject in the frame. Lens distortion increases toward the edges of a photo. A reference object on one side of the frame and a subject on the other introduces small but real scale errors." },
                                    { title: "Stand straight", desc: "Stand straight in the photo. Heels flat, back straight, head level. Posture errors in the photo produce the same measurement errors as posture errors against a wall." },
                                    { title: "Show the full body", desc: "Show the full body. Cropped feet or a cropped head makes a floor-to-crown measurement impossible. Head to toe in the frame gives the cleanest result." },
                                    { title: "Use a door", desc: "Use a door whenever possible. At 203 cm it is the most universally sized and most commonly photographed reference object in any indoor setting." }
                                ].map((tip, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                            <Plus size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground leading-tight">{tip.title}</h3>
                                            <p className="text-xs text-muted mt-1 leading-relaxed">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Frequently Asked Questions : Accordion */}
                        <div className="border border-border rounded-[2.5rem] overflow-hidden mb-20 bg-surface transition-colors duration-500">
                            {/* Header */}
                            <div className="px-8 md:px-12 pt-10 pb-8 text-center space-y-2 border-b border-border">
                                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                    <HelpCircle size={12} /> FAQ
                                </div>
                                <h2 className="text-3xl font-black text-foreground">Frequently Asked Questions</h2>
                            </div>

                            {/* Accordion Items */}
                            <div className="px-6 md:px-10 py-6 flex flex-col gap-3">
                                {[
                                    {
                                        q: "How accurate is height measurement from a photo?",
                                        a: "Results land within 1 to 2 centimeters with a straight-on photo and a reliable reference object. Camera angle and calibration are the two main sources of error. For personal tracking and comparisons, that accuracy is more than enough."
                                    },
                                    {
                                        q: "What is the best object to use for calibration?",
                                        a: "A standard interior door at 203 cm (80 inches) is the most reliable choice. Its dimensions are fixed across US construction and it appears in a wide range of indoor photos. Credit cards at 85.6 mm wide and A4 paper at 297 mm both work as alternatives."
                                    },
                                    {
                                        q: "Can I measure someone else's height from a photo?",
                                        a: "Yes. Upload any photo where the person appears next to a known object, calibrate, draw the line, read the result. The subject does not need to be present."
                                    },
                                    {
                                        q: "Does it work for celebrities?",
                                        a: "Yes, when the photo shows them next to a door or another object of known size. Photos taken from unusual angles produce less reliable results."
                                    },
                                    {
                                        q: "Why do I measure taller in the morning?",
                                        a: "Spinal discs compress under body weight throughout the day. That compression reduces standing height by up to one centimeter between morning and evening. Measuring at the same time each day gives the most consistent results over time."
                                    },
                                    {
                                        q: "Do I need an account?",
                                        a: "No. The tool is free, requires no sign-up, and works on any device."
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
                                <h2 className="text-xl font-bold text-foreground">No tape measure. No second person. No wall marks.</h2>
                                <p className="text-sm text-muted max-w-sm">Upload a photo and get your height in under a minute.</p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Monitor size={16} /> Upload Your Photo and Measure Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Panel (Comparison List) - Shown second on mobile */}

            </main>
        </div>
    );
}