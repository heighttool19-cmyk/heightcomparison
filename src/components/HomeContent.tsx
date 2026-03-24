'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PanelType } from '../types';

const QA = [
    {
        q: "What is a height comparison tool?",
        a: "A height comparison tool converts two or more height measurements into proportional bars on a side-by-side visual chart  showing the exact size relationship between people, characters, or objects at true scale. This tool supports people, celebrities, fictional characters, real-world objects, and uploaded photos, all on one proportional chart that updates in real time."
    },
    {
        q: "How do I compare two people's heights side by side?",
        a: "Click Add Person in the left sidebar, enter the first height, pick a color, and hit Add Person. Repeat for the second. Your side-by-side chart renders instantly and updates every time you change a value. Use the cm → ft/in toggle to switch units without re-entering anything."
    },
    {
        q: "How does the chart calculate proportions?",
        a: "Each bar scales to the exact mathematical ratio between heights. If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09× the first (185 ÷ 170 = 1.088...). The ratio is calculated from your entered values with no rounding. What you see on screen is mathematically accurate."
    },
    {
        q: "Can I compare my height with celebrities?",
        a: "Yes. Add yourself with Add Person, then click Celebrities and search any name. Categories include Athletes, Bollywood, British, and Asian Celebs. Hit + and the celebrity drops onto your chart alongside you at accurate proportional scale."
    },
    {
        q: "Can I compare anime character heights?",
        a: "Yes. Click the Fictional icon in the left sidebar and search by character name or series. The database covers Attack on Titan, Dragon Ball, One Piece, Demon Slayer, and thousands more. All heights come from official source material."
    },
    {
        q: "How many people can I add to one comparison?",
        a: "There is no limit. Add as many people, celebrities, characters, or objects as you want. Each entry gets its own color so the chart stays readable regardless of how many subjects are present. The bars rescale automatically every time you add someone new."
    },
    {
        q: "What is the difference between this tool and the Height Difference Calculator?",
        a: "This tool is for comparing multiple heights visually on one proportional chart — people, celebrities, characters, objects, and uploaded photos all together. The Height Difference Calculator focuses specifically on the gap between two heights: the exact difference in cm and inches, the percentage, and a reference chart for common pairings. Both are free and work well together."
    },
    {
        q: "Does the tool work in centimeters and feet and inches?",
        a: "Yes. The cm → ft/in toggle in the top toolbar converts both inputs and the chart output at the same time. You can enter one person in cm and another in ft/in and the tool normalizes both to the same proportional scale automatically."
    },
    {
        q: "Can I download or share my height comparison chart?",
        a: "Yes. Hit Download PNG in the toolbar for a clean labeled chart image — free, unlimited, no watermark. Hit Share to generate a direct link to your exact comparison. Both work with no account required."
    },
    {
        q: "Is this height comparison website completely free?",
        a: "Yes — all of it. The celebrity database, fictional character library, entity scale, image upload, PNG download, and share link are all free. No account, no subscription, no hidden tiers. Open the page and everything is available straight away."
    }
];

export default function HomeContent() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const isClickScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);



    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openDashboardPanel = (panel: PanelType) => {
        scrollToTop();
        // Small delay to ensure scroll happens first
        setTimeout(() => {
            const event = new CustomEvent('open-dashboard-panel', { detail: panel });
            window.dispatchEvent(event);
        }, 100);
    };
    return (
        <div className="w-full bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 pt-12 pb-24 border-t border-border">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row gap-8 relative">

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">



                        {/* INTRO CONTENT */}
                        <div className="space-y-6 text-center sm:text-left mt-4">



                            <h1 className="text-3xl md:text-[40px] font-black text-foreground leading-[1.2] tracking-tight">
                                Height Comparison Tool — Compare Heights Online
                            </h1>

                            <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0">
                                Use this free tool to compare heights online instantly , senter any heights and get a proportional side-by-side visual that updates in real time. No account, no setup, just jump straight in.
                            </p>

                            <div className="flex items-start gap-2 p-3 bg-[#EAF3DE] dark:bg-[#27500A]/20 border border-[#C0DD97] dark:border-[#27500A]/40 rounded-lg mb-4 text-[13px] text-[#27500A] dark:text-[#EAF3DE] leading-[1.6]">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-[3px]"><path d="M2 7l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span><strong>100% free — and we mean it.</strong> Celebrity database, fictional characters, real-world objects, image upload, PNG download, and share link. No account, no payment, no limits. Ever.</span>
                            </div>

                            <div className="bg-surface border-l-4 border-[#22c55e] rounded-r-2xl p-5 my-6 shadow-sm">
                                <p className="mb-3 text-[14px] text-muted leading-[1.7]">
                                    A height comparison tool converts any two or more heights into a visual chart, each bar scaled to the exact mathematical ratio between the entered measurements                                </p>
                                <p className="m-0 text-[14px] text-muted leading-[1.7]">
                                    The same proportional scale applies whether you are comparing two people, a person against a celebrity, fictional characters from the same series, or a human height against a real-world object like Mt Everest at 8,848 m. Every subject type, people, celebrities, fictional characters, entities, and uploaded photos share one accurate visual scale. Results update in real time with no account or setup required.
                                </p>
                            </div>

                            <div className="text-[13px] text-muted/80 p-3 border-l-2 border-border my-5 leading-[1.6]">
                                For informational and entertainment use only. For clinical height assessment or medical growth tracking, consult a qualified healthcare provider.
                            </div>
                        </div>

                        {/* SECTION: How Does a Height Comparison Chart Work? */}
                        <section id="how-does-a-height-comparison-chart-work" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">How it works</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">How Does a Height Comparison Chart Work?</h2>

                            <p className="text-[15px] leading-[1.7] text-muted">
                                A height comparison chart converts raw height measurements into visual charts, each bar represents the exact ratio between any two entered heights, rendered visually at true scale                            </p>
                            <p className="text-[15px] leading-[1.7] text-muted">
                                If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09 times the height of the first. That ratio is calculated mathematically from the values entered no rounding, no visual approximation. What you see on screen matches what you would see standing in a room next to that person.
                            </p>
                            <p className="text-[15px] leading-[1.7] text-muted">
                                That is why a 10 cm gap between two people near 160 cm reads completely differently from the same 10 cm gap between two people near 190 cm. The proportional scale makes both situations immediately visible and distinguishable without any calculation on your part.
                            </p>

                            <div className="bg-surface border border-border rounded-2xl overflow-hidden my-8 shadow-sm">
                                <div className="p-4 border-b border-border flex items-center justify-between bg-bg/50">
                                    <span className="text-[13px] font-bold text-muted">Quick example — see the maths behind it</span>
                                    <span className="text-[10px] px-2.5 py-[3px] rounded-md font-bold bg-[#EAF3DE] dark:bg-[#27500A]/20 text-[#27500A] dark:text-[#EAF3DE] border border-[#C0DD97] dark:border-[#27500A]/40 uppercase tracking-wide">Worked example</span>
                                </div>
                                <div className="p-6">
                                    <div className="mb-5">
                                        <div className="flex justify-between text-[12px] text-muted mb-1.5">
                                            <span><strong className="text-foreground font-bold">Person A</strong></span>
                                            <span className="text-[#185FA5] dark:text-blue-400 font-bold">170 cm (5&apos;7&quot;)</span>
                                        </div>
                                        <div className="h-[24px] bg-bg rounded overflow-hidden border border-border">
                                            <div className="h-full rounded-l flex items-center pl-3" style={{ width: '92%', background: 'rgba(55, 138, 221, 0.12)', borderRight: '2px solid #378ADD' }}>
                                                <span className="text-[11px] font-bold text-[#185FA5] dark:text-blue-400">170 cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <div className="flex justify-between text-[12px] text-muted mb-1.5">
                                            <span><strong className="text-foreground font-bold">Person B</strong></span>
                                            <span className="text-[#0F6E56] dark:text-emerald-400 font-bold">185 cm (6&apos;1&quot;)</span>
                                        </div>
                                        <div className="h-[24px] bg-bg rounded overflow-hidden border border-border">
                                            <div className="h-full rounded-l flex items-center pl-3" style={{ width: '100%', background: 'rgba(29, 158, 117, 0.12)', borderRight: '2px solid #1D9E75' }}>
                                                <span className="text-[11px] font-bold text-[#0F6E56] dark:text-emerald-400">185 cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-border">
                                        <div className="text-center">
                                            <div className="text-[18px] font-black text-foreground">15 cm</div>
                                            <div className="text-[11px] text-muted mt-1 uppercase tracking-wide font-medium">Height difference</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[18px] font-black text-foreground">5.9 in</div>
                                            <div className="text-[11px] text-muted mt-1 uppercase tracking-wide font-medium">In inches</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[18px] font-black text-foreground">1.09×</div>
                                            <div className="text-[11px] text-muted mt-1 uppercase tracking-wide font-medium">Bar ratio (B to A)</div>
                                        </div>
                                    </div>
                                    <div className="text-[12px] text-muted mt-5 text-center italic">
                                        Bar ratio = 185 ÷ 170 = 1.09. Person B is 8.1% taller. No rounding. No estimates.
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 bg-surface rounded-2xl border border-border my-6 shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#9FE1CB] dark:border-emerald-500/30">
                                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#0F6E56" className="dark:stroke-emerald-400" strokeWidth="1.3" /><path d="M4 7h6M7 4v6" stroke="#0F6E56" className="dark:stroke-emerald-400" strokeWidth="1.3" strokeLinecap="round" /></svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[14px] font-bold text-foreground mb-1">Need just the gap between two specific heights?</div>
                                    <div className="text-[13px] text-muted leading-[1.6] mb-2">The Height Difference Calculator shows the exact difference in cm and inches, the percentage gap, and a visual bar — for any two measurements you enter.</div>
                                    <Link href="/height-difference-calculator" className="text-[12px] font-bold text-[#22c55e] inline-flex items-center gap-1 hover:underline">
                                        Open Height Difference Calculator →
                                    </Link>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Compare Height in 3 Simple Steps */}
                        <section id="compare-height-in-3-simple-steps" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Step by step</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Compare Height in 3 Simple Steps</h2>
                            <p className="text-[15px] leading-[1.7] text-muted mb-6">No technical knowledge needed. The whole thing takes under a minute.</p>

                            <div className="border border-border rounded-3xl overflow-hidden bg-surface shadow-sm">

                                {/* Step 1 */}
                                <div className="flex flex-col sm:flex-row border-b border-border">
                                    <div className="sm:w-[70px] flex sm:flex-col items-center sm:pt-6 p-4 sm:p-0 bg-bg border-b sm:border-b-0 sm:border-r border-border gap-3 sm:gap-0">
                                        <div className="w-[36px] h-[36px] rounded-full bg-[#22c55e] text-white text-[15px] font-black flex items-center justify-center shadow-md">1</div>
                                        <h3 className="text-[16px] font-bold text-foreground sm:hidden">Step 1: Get Your Numbers Together</h3>
                                    </div>
                                    <div className="flex-1 p-5 md:p-8">
                                        <h3 className="hidden sm:block text-[18px] font-bold text-foreground mb-3">Step 1: Get Your Numbers Together</h3>
                                        <p className="text-[14px] text-muted leading-[1.7] mb-4">
                                            Decide what you want to compare. Two friends, a celebrity and yourself, a group of anime characters, a person standing next to the CN Tower ,  whatever you are curious about. Heights work in centimeters or feet and inches. Switch between them at any time using the toggle at the top of the chart.
                                        </p>
                                        <div className="bg-bg border border-border rounded-xl p-4 mt-2 flex gap-3 items-start text-[13px] text-muted">
                                            <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.1em] shrink-0 mt-[3px]">Tip</span>
                                            <span>Not sure of a height? Search the celebrity or character database and the tool fills it in for you. Or just Google it  takes five seconds.</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            <button onClick={() => openDashboardPanel('ADD_PERSON')} className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-1.5 rounded-full border border-border bg-bg text-muted hover:border-[#22c55e] hover:text-[#22c55e] transition-all cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>People</button>
                                            <button onClick={() => openDashboardPanel('CELEBRITIES')} className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-1.5 rounded-full border border-border bg-bg text-muted hover:border-[#EF9F27] hover:text-[#EF9F27] transition-all cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#EF9F27]"></span>Celebrities</button>
                                            <button onClick={() => openDashboardPanel('FICTIONAL')} className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-1.5 rounded-full border border-border bg-bg text-muted hover:border-[#9F77DD] hover:text-[#9F77DD] transition-all cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#9F77DD]"></span>Fictional characters</button>
                                            <button onClick={() => openDashboardPanel('ENTITIES')} className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-1.5 rounded-full border border-border bg-bg text-muted hover:border-[#378ADD] hover:text-[#378ADD] transition-all cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#378ADD]"></span>Objects and entities</button>
                                            <button onClick={() => openDashboardPanel('ADD_IMAGE')} className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-1.5 rounded-full border border-border bg-bg text-muted hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#1D9E75]"></span>Your own photo</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col sm:flex-row border-b border-border">
                                    <div className="sm:w-[70px] flex sm:flex-col items-center sm:pt-6 p-4 sm:p-0 bg-bg border-b sm:border-b-0 sm:border-r border-border gap-3 sm:gap-0">
                                        <div className="w-[36px] h-[36px] rounded-full bg-[#22c55e] text-white text-[15px] font-black flex items-center justify-center shadow-md">2</div>
                                        <h3 className="text-[16px] font-bold text-foreground sm:hidden">Step 2: Build Your Chart</h3>
                                    </div>
                                    <div className="flex-1 p-5 md:p-8">
                                        <h3 className="hidden sm:block text-[18px] font-bold text-foreground mb-3">Step 2: Build Your Chart</h3>
                                        <p className="text-[14px] text-muted leading-[1.7] mb-3">The left sidebar has five icons. Each one opens a different input panel. Mix and match as many types as you want , they all appear on the same proportional chart together.</p>
                                        <div className="space-y-3 mb-5">
                                            <p className="text-[14px] text-muted leading-[1.7]"><button onClick={() => openDashboardPanel('ADD_PERSON')} className="text-foreground font-bold hover:text-[#22c55e] transition-colors bg-transparent border-none p-0 cursor-pointer">Add Person</button> : Enter a name (optional), select Male or Female, type a height in cm or ft/in, and pick a color. Hit Add Person and your bar appears instantly.</p>
                                            <p className="text-[14px] text-muted leading-[1.7]"><button onClick={() => openDashboardPanel('CELEBRITIES')} className="text-foreground font-bold hover:text-[#EF9F27] transition-colors bg-transparent border-none p-0 cursor-pointer">Celebrities</button> : Search any name across Athletes, Bollywood, British, Asian Celebs, and more. Every result shows height in both cm and ft/in. Hit + and they are on your chart.</p>
                                            <p className="text-[14px] text-muted leading-[1.7]"><button onClick={() => openDashboardPanel('FICTIONAL')} className="text-foreground font-bold hover:text-[#9F77DD] transition-colors bg-transparent border-none p-0 cursor-pointer">Fictional</button> : Browse Anime, Cartoons, DC Comics, and Fantasy. Search by character name or series. All heights come from official source material.</p>
                                            <p className="text-[14px] text-muted leading-[1.7]"><button onClick={() => openDashboardPanel('ENTITIES')} className="text-foreground font-bold hover:text-[#378ADD] transition-colors bg-transparent border-none p-0 cursor-pointer">Entities</button> : Search any animal, landmark, or object. A Patagonian Cypress tree, a double-decker bus, Angel Falls, Mt Everest,if it has a real height, it is probably in there. Everything renders at verified real-world scale.</p>
                                            <p className="text-[14px] text-muted leading-[1.7]"><button onClick={() => openDashboardPanel('ADD_IMAGE')} className="text-foreground font-bold hover:text-[#1D9E75] transition-colors bg-transparent border-none p-0 cursor-pointer">Add Image</button> : Upload a photo, enter the real height, and it slots into the chart scaled accurately against everything else. The most personal way to use the tool.</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <button onClick={() => openDashboardPanel('CELEBRITIES')} className="text-left bg-bg border border-border rounded-xl p-4 hover:border-[#EF9F27] transition-all cursor-pointer group">
                                                <div className="text-[12px] font-bold text-muted mb-2 group-hover:text-[#EF9F27]">Celebrity ideas</div>
                                                <div className="text-[12px] text-[#22c55e] leading-[1.6] font-medium">Jackie Chan 174 cm · Wembanyama 224 cm · Taylor Swift 178 cm</div>
                                            </button>
                                            <button onClick={() => openDashboardPanel('FICTIONAL')} className="text-left bg-bg border border-border rounded-xl p-4 hover:border-[#9F77DD] transition-all cursor-pointer group">
                                                <div className="text-[12px] font-bold text-muted mb-2 group-hover:text-[#9F77DD]">Character ideas</div>
                                                <div className="text-[12px] text-[#22c55e] leading-[1.6] font-medium">Goku 175 cm · Piccolo 226 cm · Levi 160 cm</div>
                                            </button>
                                            <button onClick={() => openDashboardPanel('ENTITIES')} className="text-left bg-bg border border-border rounded-xl p-4 hover:border-[#378ADD] transition-all cursor-pointer group">
                                                <div className="text-[12px] font-bold text-muted mb-2 group-hover:text-[#378ADD]">Entity ideas</div>
                                                <div className="text-[12px] text-[#22c55e] leading-[1.6] font-medium">Mt Everest 8,848 m · CN Tower 553 m · Saltasaurus 6 m</div>
                                            </button>
                                        </div>

                                        <div className="bg-bg border border-border rounded-xl p-4 mt-4 flex gap-3 items-start text-[13px] text-muted">
                                            <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.1em] shrink-0 mt-[2px]">Scale</span>
                                            <span>The chart scales up to 10,000 meters : 32,808 feet. Mt Everest at 8,848 m and Kilimanjaro at 5,895 m both fit on the same chart as a person at 175 cm. The proportional difference is what makes it genuinely striking.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-[70px] flex sm:flex-col items-center sm:pt-6 p-4 sm:p-0 bg-bg border-b sm:border-b-0 sm:border-r border-border gap-3 sm:gap-0">
                                        <div className="w-[36px] h-[36px] rounded-full bg-[#22c55e] text-white text-[15px] font-black flex items-center justify-center shadow-md">3</div>
                                        <h3 className="text-[16px] font-bold text-foreground sm:hidden">Step 3: See the Difference , Then Share It</h3>
                                    </div>
                                    <div className="flex-1 p-5 md:p-8">
                                        <h3 className="hidden sm:block text-[18px] font-bold text-foreground mb-3">Step 3: See the Difference  Then Share It</h3>
                                        <p className="text-[14px] text-muted leading-[1.7] mb-3">Every bar is labeled with name and height. The gap between any two subjects is visible straight away. Add more people, change a color, swap a height , the chart updates instantly every time.</p>
                                        <p className="text-[14px] text-muted leading-[1.7] mb-5">Hit <strong className="text-foreground">Download PNG</strong> to save a clean chart image  no watermark, completely free. Or hit <strong className="text-foreground">Share</strong> to get a direct link. Drop it in a group chat, post it on social media, add it to a Discord server, or share it in a presentation.</p>

                                        <div className="bg-bg border border-border rounded-xl p-4 flex gap-3 items-start text-[13px] text-muted">
                                            <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.1em] shrink-0 mt-[2px]">Tip</span>
                                            <span>Planning a wedding and want to coordinate bridesmaids with groomsmen by height? Add the whole party, assign each person a color, and see at a glance which pairings work best visually , no awkward surprises on the day.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Why a Visual Height Comparison Shows More Than Numbers */}
                        <section id="why-a-visual-height-comparison-shows-more-than-numbers" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Why use it</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Why a Visual Height Comparison Chart Shows More Than Numbers</h2>

                            <p className="text-[15px] leading-[1.7] text-muted mb-8">
                                A visual height comparison chart renders the mathematical relationship between two or more heights as a scaled visual — making the size difference between subjects immediately readable without calculation.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                    <div className="text-[15px] font-bold text-foreground mb-2">Proportional scale reveals what numbers hide</div>
                                    <div className="text-[14px] text-muted leading-[1.6]">A 12 cm gap between two people near 160 cm occupies a larger proportion of total height than the same 12 cm gap between two people near 190 cm. The proportional bars show that distinction at a glance.</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                    <div className="text-[15px] font-bold text-foreground mb-2">Compare yourself with anyone or anything</div>
                                    <div className="text-[14px] text-muted leading-[1.6]">Add yourself and then drop in a celebrity, a fictional character, a historical figure, or a real-world object. The same chart scales all of them together at accurate proportions.</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                    <div className="text-[15px] font-bold text-foreground mb-2">Character height comparison for creative work</div>
                                    <div className="text-[14px] text-muted leading-[1.6]">Writers, artists, and fandom communities use this to visualize character height relationships for stories, artwork, and community discussions.</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                    <div className="text-[15px] font-bold text-foreground mb-2">No unit conversions or manual calculations</div>
                                    <div className="text-[14px] text-muted leading-[1.6]">Enter heights in cm or ft/in and the proportional scale runs automatically. Switch between units at any time. Subtraction, ratio, and percentage calculations all happen as you type.</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                    <div className="text-[15px] font-bold text-foreground mb-2">Real-world scale puts human height in context</div>
                                    <div className="text-[14px] text-muted leading-[1.6]">A 175 cm person placed next to Mt Everest at 8,848 m on the same proportional chart shows the true scale relationship between human height and natural landmarks in a way statistics alone cannot.</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                    <div className="text-[15px] font-bold text-foreground mb-2">Exportable visual output in one click</div>
                                    <div className="text-[14px] text-muted leading-[1.6]">Download a labeled PNG or generate a shareable URL directly from the toolbar. The output is sized for immediate use on social media, in presentations, or in any message thread.</div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Comparing Heights — Examples and Use Cases */}
                        <section id="comparing-heights-examples-and-use-cases" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">What can you compare?</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Comparing Heights : Examples and Use Cases</h2>

                            <p className="text-[15px] leading-[1.7] text-muted mb-8">
                                Here are the most common use cases for this tool. Each one produces a proportional visual showing the exact height difference between subjects.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <span className="inline-block self-start  text-[11px] font-bold tracking-widest uppercase px-2.5 py-[3.5px] mb-3  rounded-md border bg-[var(--badge-bg)]  text-[var(--badge-text)]  border-[var(--badge-border)] transition-all duration-500">Couples and friends</span>
                                    <div className="text-[14px] font-medium italic text-foreground mb-3 leading-[1.5]">"Wait, how much taller are you than me, exactly?"</div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Drop in both heights and see the exact gap on a proportional chart. A 10 cm difference reads very differently at 155 cm compared to 185 cm , the visual makes both obvious straight away.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Try: 165 cm + 178 cm → 13 cm gap (7.9%) · 5&apos;4&quot; + 5&apos;11&quot; → 7 inches</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <span className="inline-block self-start  text-[11px] font-bold tracking-widest uppercase px-2.5 py-[3.5px] mb-3  rounded-md border bg-[var(--badge-bg)]  text-[var(--badge-text)]  border-[var(--badge-border)] transition-all duration-500">Sports and athletes</span>
                                    <div className="text-[14px] font-medium italic text-foreground mb-3 leading-[1.5]">"Who actually has the height advantage here?"</div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Build a visual lineup of any squad. Compare players across leagues on one chart. Coaches, scouts, and fans use this to settle height debates with something more convincing than a table.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Try: average NBA starter 200 cm · average NFL linebacker 188 cm · average Tour de France climber 174 cm</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <span className="inline-block self-start  text-[11px] font-bold tracking-widest uppercase px-2.5 py-[3.5px] mb-3  rounded-md border bg-[var(--badge-bg)]  text-[var(--badge-text)]  border-[var(--badge-border)] transition-all duration-500">Anime and fandom</span>
                                    <div className="text-[14px] font-medium italic text-foreground mb-3 leading-[1.5]">"The wiki says one thing, but what does it actually look like?"</div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Pull any character from the Fictional panel and build a side-by-side chart for your series. Cross-franchise comparisons, villain vs hero lineups , all at verified heights from official source material.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Try: Goku 175 cm · Vegeta 164 cm · Piccolo 226 cm · Krillin 153 cm</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <span className="inline-block self-start  text-[11px] font-bold tracking-widest uppercase px-2.5 py-[3.5px] mb-3  rounded-md border bg-[var(--badge-bg)]  text-[var(--badge-text)]  border-[var(--badge-border)] transition-all duration-500">Objects and real-world scale</span>
                                    <div className="text-[14px] font-medium italic text-foreground mb-3 leading-[1.5]">"I had no idea it was actually that big."</div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Place a person next to a Patagonian Cypress (60 m), Angel Falls (979 m), or Mt Everest (8,848 m) and the proportional chart makes the scale immediately real.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Try: person 175 cm → Chrysler Building 319 m → Angel Falls 979 m → Mt Everest 8,848 m</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <span className="inline-block self-start  text-[11px] font-bold tracking-widest uppercase px-2.5 py-[3.5px] mb-3  rounded-md border bg-[var(--badge-bg)]  text-[var(--badge-text)]  border-[var(--badge-border)] transition-all duration-500">Me vs celebrity</span>
                                    <div className="text-[14px] font-medium italic text-foreground mb-3 leading-[1.5]">"Hang on — they are the same height as me?"</div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Add yourself with the Add Person panel, search any celebrity, and see exactly where you stand relative to them on a real proportional scale. One of the most shared comparisons on the tool.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Try: you → Tom Cruise 170 cm · Dwayne Johnson 196 cm · Taylor Swift 178 cm</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <span className="inline-block self-start  text-[11px] font-bold tracking-widest uppercase px-2.5 py-[3.5px] mb-3  rounded-md border bg-[var(--badge-bg)]  text-[var(--badge-text)]  border-[var(--badge-border)] transition-all duration-500">Planning and design</span>
                                    <div className="text-[14px] font-medium italic text-foreground mb-3 leading-[1.5]">"Will this actually work in the space?"</div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Add a door frame, a ceiling height, or a piece of furniture alongside a person to check proportions before making decisions. Interior designers, architects, and set designers use this regularly.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Try: person 185 cm · standard door 203 cm · room ceiling 240 cm · double-decker bus 420 cm</div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Height Generator Comparison — All Features, All Free */}
                        <section id="height-generator-comparison-all-features-all-free" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Key features</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Height Generator Comparison : All Features, All Free</h2>

                            <p className="text-[15px] leading-[1.7] text-muted mb-8">
                                No tiers, no upgrades, no account required. Here is everything you get the moment you open the tool.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><rect x="1" y="4" width="3" height="9" rx="1" fill="#22c55e" /><rect x="5.5" y="2" width="3" height="11" rx="1" fill="#378ADD" /><rect x="10" y="6" width="3" height="7" rx="1" fill="#9FE1CB" /></svg>
                                        Instant height generator
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Type any height and your visual chart appears straight away. The chart updates live as you type , no submit button no reload. Switch between cm and ft/in any time with one tap.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Live updates · cm ↔ ft/in · Unlimited comparisons · Scales to 10,000 m </div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><circle cx="7" cy="5" r="2.5" stroke="#378ADD" strokeWidth="1.3" /><path d="M2 12c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="#378ADD" strokeWidth="1.3" strokeLinecap="round" /></svg>
                                        Customizable avatars and colors
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Your chart, your way. Pick from six colors per person and choose between Male and Female avatar styles. Every bar stays visually distinct even when comparing eight or more subjects at once.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">6 colors · Male and female styles · No entry limit <br /> <br /> </div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M7 1.5l1.4 2.9 3.1.5-2.2 2.2.5 3.2L7 8.9 4.2 10.3l.5-3.2L2.5 4.9l3.1-.5z" stroke="#EF9F27" strokeWidth="1.2" fill="none" /></svg>
                                        Full celebrity database, free
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Search across Athletes, Bollywood, British, Asian Celebs, and more. Every result shows height in cm and ft/in. Hit + and they land on your chart alongside whoever else is already there.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Hundreds of celebrities · All categories · No account needed</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><rect x="2" y="2" width="10" height="10" rx="2" stroke="#9F77DD" strokeWidth="1.3" /><path d="M5 7l2 2 4-4" stroke="#9F77DD" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        Full character library, free
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Anime, Cartoons, DC Comics, and Fantasy , all with verified heights from official source material. Search by character name or browse by franchise. No subscription required.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Goku 175 cm · Piccolo 226 cm · Vegeta 164 cm · thousands more</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M2 11L5 8M9 4l3-2-2 3M5 8l4-4" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round" /><circle cx="9" cy="4" r="1.5" stroke="#1D9E75" strokeWidth="1.3" /></svg>
                                        Real-world objects at true scale
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Add animals, landmarks, buildings, and objects at verified real-world dimensions. A Saltasaurus at 6 m, the CN Tower at 553 m, or Mt Everest at 8,848 m , all on the same chart as a person.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Animals · Landmarks · Dinosaurs · Objects · Verified dimensions</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#E24B4A" strokeWidth="1.3" /><path d="M4.5 6.5l2 2 3-3" stroke="#E24B4A" strokeWidth="1.3" strokeLinecap="round" /></svg>
                                        Upload your own photo
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Hit Add Image, upload any photo, enter the real height, and it slots into the chart , scaled accurately against everyone else. PNG with transparent background gives the cleanest result.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Any image · Auto-scaled · PNG transparent background works best</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M7 1v8M4 6l3 3 3-3M2 11v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        Download PNG — free, no watermark
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Hit Download PNG and your chart saves as a clean labeled image, No watermark, unlimited downloads, no account. Clean enough for social media, Discord, or any message thread.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">No watermark · Unlimited · No account · Any time</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col">
                                    <div className="text-[15px] font-bold mb-3 flex items-center gap-2.5 text-foreground">
                                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M9 2l3 3-3 3M5 12l-3-3 3-3M12 5H7a4 4 0 00-4 4" stroke="#185FA5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        Shareable link
                                    </div>
                                    <div className="text-[14px] text-muted leading-[1.6] mb-4 flex-1">Hit Share to get a direct URL to your exact chart. Send it to anyone , they open the same comparison you built in their browser. No account needed on their end either.</div>
                                    <div className="text-[12px] font-medium text-muted/70 pt-3 border-t border-border leading-[1.5]">Instant link · No account · Any browser · Any device</div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: How Accurate Is the Height Comparison Chart? */}
                        <section id="how-accurate-is-the-height-comparison-chart" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Accuracy and data</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">How Accurate Is the Height Comparison Chart?</h2>

                            <p className="text-[15px] leading-[1.7] text-muted mb-8">
                                Here is exactly where the data comes from and how the proportions are calculated.
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
                                    <div className="text-[14px] font-bold text-foreground mb-2">Celebrity heights</div>
                                    <div className="text-[13px] text-muted leading-[1.6]">Sourced from verified public records and official biographical sources. Where multiple sources conflict, the most widely cited verified figure is used.
                                    </div>
                                </div>
                                <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
                                    <div className="text-[14px] font-bold text-foreground mb-2">Fictional character heights</div>
                                    <div className="text-[13px] text-muted leading-[1.6]">Drawn from official franchise material published manga, anime production guides, game databases, and officially licensed character wikis. Not user estimates.</div>
                                </div>
                                <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
                                    <div className="text-[14px] font-bold text-foreground mb-2">Objects and entity dimensions</div>
                                    <div className="text-[13px] text-muted leading-[1.6]">Verified from established real-world specifications. Buildings from architectural records. Animals from verified wildlife and natural history records. Natural landmarks from geographic surveys.</div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: A Height Comparison Website Built for Simplicity */}
                        <section id="a-height-comparison-website-built-for-simplicity" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">How we compare</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">A Height Comparison Website Built for Simplicity</h2>

                            <p className="text-[15px] leading-[1.7] text-muted mb-8">
                                There are other tools that let you compare heights. Not many make it this simple, this complete, and this free.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-bg border-b-2 border-border">
                                            <th className="p-4 text-[12px] font-bold text-muted uppercase tracking-[0.05em]">Feature</th>
                                            <th className="p-4 text-[12px] font-bold bg-[#EAF3DE] dark:bg-emerald-900/30 text-[#27500A] dark:text-emerald-400 uppercase tracking-[0.05em]">This tool</th>
                                            <th className="p-4 text-[12px] font-bold text-muted uppercase tracking-[0.05em]">Most others</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[14px] divide-y divide-border/50">
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Visual side-by-side chart</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Exact proportional scale</td>
                                            <td className="p-4 text-muted">✓ Basic bars</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Unlimited people per comparison</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ No limit</td>
                                            <td className="p-4 text-muted/60">✗ Usually 2 to 4 max</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Full celebrity database</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Free, no account</td>
                                            <td className="p-4 text-muted/60">✗ Limited or paid</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Anime and fictional characters</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Thousands of entries</td>
                                            <td className="p-4 text-muted/60">✗ Rarely included</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Objects at real-world scale</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Animals, landmarks, buildings</td>
                                            <td className="p-4 text-muted/60">✗ Not available</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Upload your own photo</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Auto-scaled</td>
                                            <td className="p-4 text-muted/60">✗ Not available</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">PNG download — no watermark</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Free, unlimited</td>
                                            <td className="p-4 text-muted/60">✗ Watermarked or paid</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Height difference calculator</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Dedicated tool included</td>
                                            <td className="p-4 text-muted/60">✗ Rarely a separate tool</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Average height by country data</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Full 46-country table</td>
                                            <td className="p-4 text-muted/60">✗ No tool site covers this</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Account required</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ None needed</td>
                                            <td className="p-4 text-muted/60">✗ Often required</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="p-4 font-medium text-foreground bg-surface">Cost</td>
                                            <td className="p-4 text-[#22c55e] font-bold bg-bg/50">✓ Completely free</td>
                                            <td className="p-4 text-muted/60">✗ Freemium or paid tiers</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Mid-page CTA */}
                        <div className="bg-surface rounded-3xl p-8 text-center border border-border my-4 shadow-xl">
                            <h2 className="text-2xl font-black text-foreground mb-3">Ready to See the Difference?</h2>
                            <p className="text-[14px] text-muted mb-8 max-w-xl mx-auto">Scroll back up, add a few heights, and see your comparison in seconds. No sign-up, no cost — just jump straight in.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={() => openDashboardPanel('ADD_PERSON')} className="inline-flex items-center gap-2 h-12 px-6 bg-[#22c55e] border-none rounded-full text-white text-[14px] font-bold cursor-pointer hover:bg-green-600 transition-all shadow-md hover:-translate-y-0.5">
                                    ↑ Start Comparing Heights
                                </button>
                                <button onClick={() => openDashboardPanel('CELEBRITIES')} className="inline-flex items-center gap-2 h-12 px-6 bg-bg border border-border rounded-full text-foreground text-[14px] font-bold cursor-pointer hover:bg-surface transition-all shadow-sm hover:-translate-y-0.5">
                                    Explore Celebrity Heights
                                </button>
                            </div>
                        </div>



                        {/* SECTION: Why Choose This Height Comparison Tool? */}
                        <section id="why-choose-this-height-comparison-tool" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Why choose this tool</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Why Choose This Height Comparison Tool?</h2>

                            <div className="grid sm:grid-cols-2 gap-4 my-8">
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Mathematically precise, every time</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Every bar renders to the exact proportional ratio of the heights entered. 185 cm is always 1.09× the bar height of 170 cm. No visual approximation.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Five input types, one chart</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">People, celebrities, fictional characters, real-world objects, and uploaded photos all share one proportional scale. No switching apps or tabs.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Verified data in every database</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Celebrity, character, and entity heights come from verified records and official material — not crowd estimates or user submissions.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Ready in thirty seconds</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Open the page, click Add Person, type a height. Your first comparison is on screen before you finish reading this sentence. No tutorial, no setup.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">PNG with no watermark, ever</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Download a clean labeled chart any time. Unlimited, watermark-free, no account required. Part of the free tool — not an upgrade.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Live updates, no reloads</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Every new person, color change, or height edit appears on the chart straight away. No submit button, no delay, no refresh.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Part of a full height toolkit</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Alongside the comparison tool: a Height Difference Calculator, Height Percentile Calculator, Ideal Body Weight Calculator, and Average Height by Country data table.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-5 bg-surface rounded-2xl border border-border shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#EAF3DE] dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-[2px] border border-[#C0DD97] dark:border-emerald-500/30">
                                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <strong className="block text-foreground text-[14px] mb-[4px]">Genuinely free, nothing hidden</strong>
                                        <span className="text-[13px] text-muted leading-[1.6]">Every feature is included at no cost. No freemium tier, no locked features, no subscription. Open it and use all of it right now.</span>
                                    </div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Frequently Asked Questions */}
                        <section id="frequently-asked-questions" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Got questions?</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-8">Frequently Asked Questions</h2>

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

                        </section>



                        {/* Bottom CTA */}
                        <div className="bg-surface rounded-3xl p-8 text-center border border-border my-4 shadow-xl">
                            <h2 className="text-2xl font-black text-foreground mb-3">Go on — build your comparison.</h2>
                            <p className="text-[14px] text-muted mb-8 max-w-xl mx-auto">Free. No account. No limits. Scroll back up and see exactly how any heights compare on a visual scale that actually makes sense.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={() => openDashboardPanel('ADD_PERSON')} className="inline-flex items-center gap-2 h-12 px-6 bg-[#22c55e] border-none rounded-full text-white text-[14px] font-bold cursor-pointer hover:bg-green-600 transition-all shadow-md hover:-translate-y-0.5">
                                    ↑ Start Comparing
                                </button>
                                <button onClick={() => openDashboardPanel('CELEBRITIES')} className="inline-flex items-center gap-2 h-12 px-6 bg-bg border border-border rounded-full text-foreground text-[14px] font-bold cursor-pointer hover:bg-surface transition-all shadow-sm hover:-translate-y-0.5">
                                    Explore Celebrity Heights
                                </button>
                            </div>
                        </div>



                        {/* SECTION: Compare Heights Online — Tools and Articles */}
                        <section id="compare-heights-online-tools-and-articles" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border" />
                                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Other tools and articles</div>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Compare Heights Online — Tools and Articles</h2>

                            <div className="grid sm:grid-cols-2 gap-4 my-8">
                                <Link href="/height-difference-calculator" className="bg-surface rounded-2xl p-6 border-[1.5px] border-[#22c55e] hover:-translate-y-1 transition-all group shadow-sm flex flex-col">
                                    <div className="inline-flex self-start text-[10px] font-bold px-2 py-[2px] rounded-md bg-[#EAF3DE] dark:bg-emerald-900/30 text-[#27500A] dark:text-emerald-400 border border-[#C0DD97] dark:border-emerald-500/30 mb-3 uppercase tracking-wide">Tool</div>
                                    <div className="text-[16px] font-bold text-foreground mb-2 leading-[1.4] group-hover:text-[#22c55e] transition-colors">Height Difference Calculator</div>
                                    <div className="text-[13px] text-muted leading-[1.6] flex-1 mb-4">Enter any two heights and get the exact gap in cm and inches, the percentage difference, and a visual bar comparison. Includes a reference chart for the most common height pairings.</div>
                                    <div className="text-[12px] font-bold text-[#22c55e] mt-auto flex items-center gap-1.5 group-hover:gap-2 transition-all">Try the calculator <ArrowRight size={14} /></div>
                                </Link>

                                <div className="bg-surface rounded-2xl p-6 border-[1.5px] border-[#22c55e] hover:-translate-y-1 transition-all group shadow-sm flex flex-col cursor-pointer">
                                    <div className="inline-flex self-start text-[10px] font-bold px-2 py-[2px] rounded-md bg-[#EAF3DE] dark:bg-emerald-900/30 text-[#27500A] dark:text-emerald-400 border border-[#C0DD97] dark:border-emerald-500/30 mb-3 uppercase tracking-wide">Data</div>
                                    <div className="text-[16px] font-bold text-foreground mb-2 leading-[1.4] group-hover:text-[#22c55e] transition-colors">Average Height by Country</div>
                                    <div className="text-[13px] text-muted leading-[1.6] flex-1 mb-4">Global height data for 46 countries. Sortable table, regional charts, a world map heatmap, and records for the world's tallest and shortest populations.</div>
                                    <div className="text-[12px] font-bold text-[#22c55e] mt-auto flex items-center gap-1.5 group-hover:gap-2 transition-all">Explore the data <ArrowRight size={14} /></div>
                                </div>

                                <Link href="/height-weight-percentile-calculator" className="bg-surface rounded-2xl p-6 border border-border hover:border-[#CECBF6] hover:-translate-y-1 transition-all group shadow-sm flex flex-col">
                                    <div className="inline-flex self-start text-[10px] font-bold px-2 py-[2px] rounded-md bg-[#EEEDFE] dark:bg-indigo-900/30 text-[#3C3489] dark:text-indigo-300 border border-[#CECBF6] dark:border-indigo-500/30 mb-3 uppercase tracking-wide">Tool</div>
                                    <div className="text-[16px] font-bold text-foreground mb-2 leading-[1.4] group-hover:text-[#3C3489] dark:group-hover:text-indigo-400 transition-colors">Height and Weight Percentile Calculator</div>
                                    <div className="text-[13px] text-muted leading-[1.6] flex-1 mb-4">Find out where your height and weight sit within the population using WHO and CDC reference data. Works for babies, children, and adults.</div>
                                    <div className="text-[12px] font-bold text-[#22c55e] mt-auto flex items-center gap-1.5 group-hover:gap-2 transition-all">Try the tool <ArrowRight size={14} /></div>
                                </Link>

                                <div className="bg-surface rounded-2xl p-6 border border-border hover:border-[#CECBF6] hover:-translate-y-1 transition-all group shadow-sm flex flex-col cursor-pointer">
                                    <div className="inline-flex self-start text-[10px] font-bold px-2 py-[2px] rounded-md bg-[#EEEDFE] dark:bg-indigo-900/30 text-[#3C3489] dark:text-indigo-300 border border-[#CECBF6] dark:border-indigo-500/30 mb-3 uppercase tracking-wide">Tool</div>
                                    <div className="text-[16px] font-bold text-foreground mb-2 leading-[1.4] group-hover:text-[#3C3489] dark:group-hover:text-indigo-400 transition-colors">Ideal Body Weight Calculator</div>
                                    <div className="text-[13px] text-muted leading-[1.6] flex-1 mb-4">Calculate ideal body weight using the Devine, Robinson, and Hamwi formulas side by side. Results in kg and lb for men and women.</div>
                                    <div className="text-[12px] font-bold text-[#22c55e] mt-auto flex items-center gap-1.5 group-hover:gap-2 transition-all">Try the tool <ArrowRight size={14} /></div>
                                </div>

                                <Link href={"/image-to-height"} className="bg-surface rounded-2xl p-6 border border-border hover:border-[#CECBF6] hover:-translate-y-1 transition-all group shadow-sm flex flex-col cursor-pointer">
                                    <div className="inline-flex self-start text-[10px] font-bold px-2 py-[2px] rounded-md bg-[#EEEDFE] dark:bg-indigo-900/30 text-[#3C3489] dark:text-indigo-300 border border-[#CECBF6] dark:border-indigo-500/30 mb-3 uppercase tracking-wide">Guide</div>
                                    <div className="text-[16px] font-bold text-foreground mb-2 leading-[1.4] group-hover:text-[#3C3489] dark:group-hover:text-indigo-400 transition-colors">How to Measure Your Height Accurately</div>
                                    <div className="text-[13px] text-muted leading-[1.6] flex-1 mb-4">Why you are taller in the morning, how to use a photo to measure height without a tape measure, and where the wall-and-book method goes wrong.</div>
                                    <div className="text-[12px] font-bold text-[#22c55e] mt-auto flex items-center gap-1.5 group-hover:gap-2 transition-all">Read the guide <ArrowRight size={14} /></div>
                                </Link>

                                <div className="bg-surface rounded-2xl p-6 border border-border hover:border-[#CECBF6] hover:-translate-y-1 transition-all group shadow-sm flex flex-col cursor-pointer">
                                    <div className="inline-flex self-start text-[10px] font-bold px-2 py-[2px] rounded-md bg-[#EEEDFE] dark:bg-indigo-900/30 text-[#3C3489] dark:text-indigo-300 border border-[#CECBF6] dark:border-indigo-500/30 mb-3 uppercase tracking-wide">Data</div>
                                    <div className="text-[16px] font-bold text-foreground mb-2 leading-[1.4] group-hover:text-[#3C3489] dark:group-hover:text-indigo-400 transition-colors">Tallest and Shortest People in History</div>
                                    <div className="text-[13px] text-muted leading-[1.6] flex-1 mb-4">Verified Guinness World Records for Robert Wadlow, Chandra Bahadur Dangi, Zeng Jinlian, and Jyoti Amge — with a visual scale that puts their heights in perspective.</div>
                                    <div className="text-[12px] font-bold text-[#22c55e] mt-auto flex items-center gap-1.5 group-hover:gap-2 transition-all">Read the article <ArrowRight size={14} /></div>
                                </div>
                            </div>

                            {/* Legal / Do not sell */}
                            <div className="bg-surface rounded-xl p-5 border border-border mt-8 shadow-sm">
                                <strong className="text-muted block text-[13px] mb-2">Do Not Sell or Share My Personal Information</strong>
                                <p className="text-[13px] text-muted/80 leading-[1.7]">
                                    We do not sell your personal information to third parties. Under the California Consumer Privacy Act (CCPA) and similar state laws, you have the right to opt out of data sharing for cross-context behavioral advertising. Visit our <Link href="/privacy" className="text-[#185FA5] dark:text-blue-400 underline hover:text-foreground transition-colors font-medium">Privacy Policy</Link> or contact us directly. Standard use of the height comparison tool collects no personal information and requires no account.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div >
    );
}