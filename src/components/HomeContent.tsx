import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PanelType } from '../types';
import Link from 'next/link';
import FaqAccordion from './FaqAccordion';
import DashboardLink from './DashboardLink';
import HomeCTAs from './HomeCTAs';
import { HOME_FAQ } from '@/constants/home';
import ErrorBoundary from './common/ErrorBoundary';

export default function HomeContent() {
    return (
        <div className="w-full bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 pt-12 pb-24 border-t border-border">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row gap-8 relative">

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">



                        {/* INTRO CONTENT */}
                        <div className="space-y-6 text-center sm:text-left mt-4 uppercase font-black tracking-tight">



                            <h1 className="text-3xl md:text-[40px] font-black text-foreground leading-[1.2] tracking-tighter uppercase px-2 py-4 bg-accent/5 rounded-2xl border-l-8 border-l-accent">
                                Height Comparison Tool Compare Heights Online
                            </h1>

                            <p className="text-muted leading-relaxed text-lg max-w-3xl text-left font-bold lowercase first-letter:uppercase tracking-[0.01em] opacity-90">
                                Use this free <strong className="text-accent">height chart</strong> to compare heights online instantly. Enter any height and get a proportional <strong className='text-accent'>height comparison chart</strong> that updates in real time at exact scale. No rounding, no approximation. Compare any person, celebrity, fictional character, or real-world object. No account needed.                            </p>

                            <ErrorBoundary name="ProGuarantee">
                                <div className="flex items-start gap-4 p-6 bg-emerald-50 border-2 border-emerald-500/20 rounded-[2rem] mb-6 shadow-lg transition-all hover:border-emerald-500/40 group">
                                    {/* Animated Icon Container */}
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 7l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    <div className="flex flex-col group">
                                        {/* Header with theme-synced gradient line */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <strong className="text-accent uppercase tracking-[0.25em] text-[10px] font-black transition-colors">
                                                Pro Guarantee 100% FREE.
                                            </strong>
                                            <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/30 to-transparent"></div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="leading-relaxed text-left">
                                                <span className="align-middle text-black font-bold">
                                                    Access our celebrity database, fictional characters, real-world objects, PNG downloads and instant share links.                                                </span>
                                            </p>
                                            {/* Footnote with theme-synced interactive dots */}
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                                                {['No accounts', 'No payments', 'No limits. Ever.'].map((text) => (
                                                    <span key={text} className="text-[12px] font-bold italic text-muted group-hover:text-accent transition-colors flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm"></span>
                                                        {text}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ErrorBoundary>




                        </div>

                        {/* SECTION: How Does a Height Comparison Chart Work? */}
                        <section id="how-does-a-height-comparison-chart-work" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">How it works</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">How Does a Height Comparison Chart Work?</h2>

                            <p className="text-[16px] leading-[1.8] text-muted font-bold opacity-80">
                                A <strong className='text-accent'> height comparison chart</strong> converts raw height measurements into a visual where each bar represents the exact ratio between heights at true proportional scale.</p>
                            <p className="text-[16px] leading-[1.8] text-muted font-bold opacity-80">
                                If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09x the height of the first. A 10 cm gap at 160 cm reads proportionally different from the same gap at 190 cm. The <strong className='text-accent'>height chart</strong> makes that distinction visible without any calculation on your part.                            </p>
                            <p className="text-[16px] leading-[1.8] text-muted font-bold opacity-80">
                                Use it as a <strong className='text-accent'>height chart maker</strong> for families, teams, or creative projects. A ready-made<strong className='text-accent'> comparison chart template</strong> loads in under thirty seconds.
                            </p>
                            <ErrorBoundary name="VisualRatioEngine">
                                <div className="bg-emerald-50 border-2 border-emerald-400/30 rounded-[2.5rem] overflow-hidden my-6 shadow-xl transition-all hover:border-emerald-500 group relative">

                                    {/* Header with matching solid background but slightly darker border */}
                                    <div className="p-6 border-b-2 border-emerald-400/20 flex items-center justify-between bg-white/10 backdrop-blur-sm">
                                        <span className="text-[14px] font-black uppercase tracking-widest text-emerald-950 opacity-70 group-hover:opacity-100 transition-opacity">
                                            VISUAL RATIO ENGINE VERBATIM ACCURACY
                                        </span>
                                        <div className="bg-emerald-500 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter shadow-sm">
                                            Live
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12">
                                        {/* Person A Section */}
                                        <div className="mb-8">
                                            <div className="flex justify-between items-end text-[13px] font-black uppercase tracking-widest mb-3">
                                                <span className="text-emerald-900/60 group-hover:text-blue-700 transition-colors">Person A</span>
                                                <span className="text-blue-700 font-black bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">170 cm (5&apos;7&quot;)</span>
                                            </div>
                                            {/* White Trough for maximum contrast against the green background */}
                                            <div className="h-[40px] bg-white rounded-xl overflow-hidden border-2 border-emerald-300 shadow-inner p-1">
                                                <div
                                                    className="h-full bg-blue-600 border-r-4 border-r-blue-800 flex items-center pl-4 rounded-lg transition-all duration-700"
                                                    style={{ width: '92%' }}
                                                >
                                                    <span className="text-[12px] font-black text-white">170.00</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Person B Section */}
                                        <div className="mb-0">
                                            <div className="flex justify-between items-end text-[13px] font-black uppercase tracking-widest mb-3">
                                                <span className="text-emerald-900/60 group-hover:text-emerald-800 transition-colors">Person B</span>
                                                <span className="text-emerald-800 font-black bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">185 cm (6&apos;1&quot;)</span>
                                            </div>
                                            <div className="h-[40px] bg-white rounded-xl overflow-hidden border-2 border-emerald-300 shadow-inner p-1">
                                                <div
                                                    className="h-full bg-emerald-600 border-r-4 border-r-emerald-800 flex items-center pl-4 rounded-lg transition-all duration-700"
                                                    style={{ width: '100%' }}
                                                >
                                                    <span className="text-[12px] font-black text-white">185.00</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Grid - Using darker text for the green bg */}
                                        <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t-2 border-emerald-400/20">
                                            {[
                                                { val: '15 cm', label: 'Delta' },
                                                { val: '5.9 in', label: 'Imperial' },
                                                { val: '1.09×', label: 'Proportion', special: true }
                                            ].map((stat) => (
                                                <div key={stat.label} className="text-center group-hover:scale-105 transition-transform">
                                                    <div className={`text-[24px] font-black tracking-tighter ${stat.special ? 'text-blue-700' : 'text-emerald-950'}`}>
                                                        {stat.val}
                                                    </div>
                                                    <div className="text-[10px] text-emerald-900/50 mt-2 font-black uppercase tracking-widest">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer Text using image-style labels */}
                                        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                                            <span className="text-[12px] font-bold italic text-emerald-900/70 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                                Bar ratio = 1.09
                                            </span>
                                            <span className="text-[12px] font-bold italic text-emerald-900/70 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                                                8.82% height gap
                                            </span>
                                            <span className="text-[12px] font-bold italic text-emerald-900/70 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                Zero visual rounding
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </ErrorBoundary>
                            <div className="flex items-start gap-6 p-8 bg-surface rounded-[2rem] border-2 border-border my-12 shadow-xl hover:border-emerald-500/30 transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center shrink-0 border-2 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                                    <svg width="24" height="24" viewBox="0 0 14 14" fill="none" className="group-hover:text-white transition-colors text-emerald-500"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 7h6M7 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[18px] font-black text-foreground mb-2 uppercase tracking-tighter">Need just the gap between two specific heights?</div>
                                    <div className="text-[15px] text-muted leading-[1.8] mb-4 font-bold opacity-70">The <strong className='text-accent'>Height Difference Calculator</strong> shows the exact difference in cm and inches, the percentage gap, and a visual bar. Use it when you need the precise <strong className='text-accent'>height gap</strong> without building a full chart.</div>
                                    <Link href="/height-difference-calculator" className="text-[14px] font-black text-emerald-500 inline-flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest py-2 px-4 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500 group-hover:text-white">
                                        Open Height Difference Calculator <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Compare Height in 3 Simple Steps */}
                        <section id="compare-height-in-3-simple-steps" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Step by step</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">Compare Height in 3 Simple Steps</h2>
                            <p className="text-[16px] leading-[1.8] text-muted mb-8 font-bold opacity-70">Professional-grade results in under sixty seconds.
                            </p>

                            <div className="border-2 border-border/80 rounded-[3rem] overflow-hidden bg-surface shadow-2xl">

                                {/* Step 1 */}
                                <div className="flex flex-col sm:flex-row border-b-2 border-border/80 group">
                                    <div className="sm:w-[100px] flex sm:flex-col items-center sm:pt-10 p-6 sm:p-0 bg-bg/50 border-b-2 sm:border-b-0 sm:border-r-2 border-border/80 gap-4 sm:gap-6">
                                        <div className="w-[48px] h-[48px] rounded-[1.2rem] bg-accent text-white text-[20px] font-black flex items-center justify-center shadow-xl shadow-accent/20 group-hover:rotate-12 transition-transform">01</div>
                                        <h3 className="text-[18px] font-black text-foreground sm:hidden uppercase tracking-tighter">Preparation</h3>
                                    </div>
                                    <div className="flex-1 p-8 md:p-12">
                                        <h3 className="hidden sm:block text-[22px] font-black text-foreground mb-4 uppercase tracking-tighter">Step 1: Begin with Your Comparison Setup</h3>
                                        <p className="text-[15px] text-muted leading-[1.8] mb-6 font-bold opacity-70">
                                            Decide what to compare. Two friends, a celebrity and yourself, a group of anime characters, a person next to a landmark. Heights work in cm or ft/in. Switch units at any time using the toggle at the top of the chart.                                        </p>
                                        <div className="bg-bg border-l-4 border-l-accent rounded-2xl p-6 mb-8 flex gap-4 items-start text-[14px] text-muted shadow-inner font-bold italic">
                                            <span className="text-[11px] font-black text-accent uppercase tracking-widest shrink-0 mt-[2px] px-2 py-1 bg-accent/10 rounded-md">PRO TIP</span>
                                            <span>Search the <strong className='text-accent'>celebrity height database</strong> and the tool fills heights in automatically. Browse <strong className='text-accent'>anime character heights</strong> and <strong className='text-accent'>fictional character heights</strong> from the Fictional panel. All sourced from official production guides.</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {/* PEOPLE - Blue Palette */}
                                            <DashboardLink
                                                panel="ADD_PERSON"
                                                className="inline-flex items-center gap-2.5 text-[12px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border-2 border-border/50 bg-[#dbeafe] text-[#1e40af] hover:border-blue-400 transition-all hover:-translate-y-0.5"
                                            >
                                                People
                                            </DashboardLink>

                                            {/* CELEBRITIES - Yellow/Gold Palette */}
                                            <DashboardLink
                                                panel="CELEBRITIES"
                                                className="inline-flex items-center gap-2.5 text-[12px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border-2 border-border/50 bg-[#fef9c3] text-[#854d0e] hover:border-amber-400 transition-all hover:-translate-y-0.5"
                                            >
                                                Celebrities
                                            </DashboardLink>

                                            {/* CHARACTERS - Purple Palette */}
                                            <DashboardLink
                                                panel="FICTIONAL"
                                                className="inline-flex items-center gap-2.5 text-[12px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border-2 border-border/50 bg-[#f3e8ff] text-[#6b21a8] hover:border-purple-400 transition-all hover:-translate-y-0.5"
                                            >
                                                Characters
                                            </DashboardLink>

                                            {/* OBJECTS - Green Palette */}
                                            <DashboardLink
                                                panel="ENTITIES"
                                                className="inline-flex items-center gap-2.5 text-[12px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full border-2 border-border/50 bg-[#dcfce7] text-[#15803d] hover:border-emerald-400 transition-all hover:-translate-y-0.5"
                                            >
                                                Objects
                                            </DashboardLink> </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col sm:flex-row border-b-2 border-border/80 group">
                                    <div className="sm:w-[100px] flex sm:flex-col items-center sm:pt-10 p-6 sm:p-0 bg-bg/50 border-b-2 sm:border-b-0 sm:border-r-2 border-border/80 gap-4 sm:gap-6">
                                        <div className="w-[48px] h-[48px] rounded-[1.2rem] bg-accent text-white text-[20px] font-black flex items-center justify-center shadow-xl shadow-accent/20 group-hover:-rotate-12 transition-transform">02</div>
                                        <h3 className="text-[18px] font-black text-foreground sm:hidden uppercase tracking-tighter">Construction</h3>
                                    </div>
                                    <div className="flex-1 p-8 md:p-12">
                                        <h3 className="hidden sm:block text-[22px] font-black text-foreground mb-4 uppercase tracking-tighter">Step 2: Build your height chart</h3>
                                        <p className="text-[15px] text-muted leading-[1.8] mb-8 font-bold opacity-70">The left sidebar has five icons. Each opens a different input panel. Mix and match any types on the same proportional<strong className='text-accent'> height comparison chart</strong>.</p>
                                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                                            {[
                                                { panel: 'ADD_PERSON', color: 'emerald', label: 'Add Person', desc: 'Name, sex, height in cm or ft/in, colour. Instant rendering.' },
                                                { panel: 'CELEBRITIES', color: 'emerald', label: 'Celebrities', desc: 'Athletes, actors, icons globally. Verified heights.' },
                                                { panel: 'FICTIONAL', color: 'emerald', label: 'Fictional', desc: 'Anime, Cartoons, Comics. Official production guides.' },
                                                { panel: 'ENTITIES', color: 'emerald', label: 'Entities', desc: 'Animals, landmarks, objects. Verified real-world dimensions.' },
                                            ].map(item => (
                                                <DashboardLink key={item.panel} panel={item.panel as PanelType} className={`text-left p-6 rounded-2xl border-2 border-border/50 hover:border-${item.color}-500/50 bg-bg/30 hover:bg-bg transition-all cursor-pointer group/item`}>
                                                    <div className={`text-[13px] font-black text-${item.color}-500 uppercase tracking-widest mb-2 group-hover/item:translate-x-1 transition-transform`}>{item.label}</div>
                                                    <div className="text-[13px] text-muted font-bold opacity-60 group-hover/item:opacity-100">{item.desc}</div>
                                                </DashboardLink>
                                            ))}
                                        </div>

                                        <div className=" border-2 border-border/80 rounded-2xl p-6 bg-[#1f2937] flex gap-4 items-start text-[14px] text-muted shadow-inner font-bold lowercase tracking-tight">
                                            <span className="text-[10px] font-black text-emerald-500 px-2 py-1 rounded uppercase tracking-[0.1em] shrink-0 mt-[2px]">Scale</span>
                                            <span>The chart scales to 10,000 metres. Mt Everest and a 175 cm person fit on the same chart.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col sm:flex-row group">
                                    <div className="sm:w-[100px] flex sm:flex-col items-center sm:pt-10 p-6 sm:p-0 bg-bg/50 border-r-0 sm:border-r-2 border-border/80 gap-4 sm:gap-6">
                                        <div className="w-[48px] h-[48px] rounded-[1.2rem] bg-accent text-white text-[20px] font-black flex items-center justify-center shadow-xl shadow-accent/20 group-hover:scale-110 transition-transform">03</div>
                                        <h3 className="text-[18px] font-black text-foreground sm:hidden uppercase tracking-tighter">Export</h3>
                                    </div>
                                    <div className="flex-1 p-8 md:p-12">
                                        <h3 className="hidden sm:block text-[22px] font-black text-foreground mb-4 uppercase tracking-tighter">Step 3: See the Difference, Then Share It</h3>
                                        <p className="text-[15px] text-muted leading-[1.8] mb-6 font-bold opacity-70">Every bar is labelled with name and height. The gap between any two subjects is visible straight away. The <strong className='text-accent'>height chart maker</strong> updates instantly with every change. Hit <strong className='text-accent'>Download PNG</strong> for a clean, watermark-free image or <strong className='text-accent'>Share</strong> to get a direct link.</p>
                                        <div className="bg-accent/5 border-2 border-accent/20 rounded-2xl p-8 flex gap-6 items-center text-[15px] text-accent shadow-lg shadow-accent/5">
                                            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/30">
                                                <svg width="24" height="24" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                            <div className="font-black uppercase tracking-tighter text-xl">PRO OUTPUT: CLEAN LABELLED PNGs. ZERO WATERMARKS.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                        {/* SECTION: Why a Visual Height Comparison Shows More Than Numbers */}
                        <section id="why-a-visual-height-comparison-shows-more-than-numbers" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Why use it</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">Why a Visual Height Comparison Chart Shows More Than Numbers</h2>

                            <p className="text-[16px] leading-[1.8] text-muted mb-10 font-bold opacity-70">
                                A visual <strong className='text-accent'>height comparison chart</strong> renders the mathematical relationship between heights as a scaled image, making the size difference between subjects immediately readable without any calculation on your part.                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: 'Proportional scale reveals what numbers hide',
                                        desc: 'A 12 cm gap at 160 cm is proportionally larger than at 190 cm. The visual bars show that distinction instantly. Raw numbers alone never make this visible.'
                                    },
                                    {
                                        title: 'Compare yourself with anyone or anything',
                                        desc: 'Add yourself and drop in a celebrity, a fictional character, or a mountain. The chart scales all of them together accurately on one proportional axis.'
                                    },
                                    {
                                        title: 'Character height comparison for creative work',
                                        desc: 'Artists and writers visualise character relationships at verified scale from official production guides. Updates live as you type.'
                                    },
                                    {
                                        title: 'No unit conversions or manual calculations',
                                        desc: 'Enter heights in cm or ft/in. Subtraction, ratio, and percentage calculations all happen automatically as you type. Switch units at any time.'
                                    },
                                    {
                                        title: 'Real-world scale puts human height in context',
                                        desc: 'See a 175 cm person next to Mt Everest (8,848 m) to understand true scale. No other tool handles both human and landmark scales on the same axis.'
                                    },
                                    {
                                        title: 'Exportable visual output in one click',
                                        desc: 'Download labelled PNGs or generate shareable URLs. Sized for social media and presentations.'
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="bg-surface rounded-3xl p-8 border-2 border-border/80 shadow-sm hover:border-accent/30 transition-all group">
                                        <div className="text-[17px] font-black text-foreground mb-3 uppercase tracking-tighter group-hover:text-accent transition-colors">{item.title}</div>
                                        <div className="text-[14px] text-muted font-bold leading-relaxed opacity-70 group-hover:opacity-100">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>



                        {/* SECTION: Comparing Heights — Examples and Use Cases */}
                        <section id="comparing-heights-examples-and-use-cases" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Usage</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">Comparing Heights: Examples and Use Cases</h2>

                            <p className="text-[16px] leading-[1.8] text-muted mb-10 font-bold opacity-70">
                                Common use cases producing proportional visuals showing exact height differences.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        tag: 'COUPLES AND FRIENDS',
                                        quote: '"Wait, how much taller are you than me, exactly?"',
                                        desc: "Drop in both heights and see the exact gap on a proportional chart. A 10 cm difference is visually obvious straight away.",
                                        try: '165 CM + 178 CM 13 CM GAP (7.9%)'
                                    },
                                    {
                                        tag: 'SPORTS AND ATHLETES',
                                        quote: '"Who actually has the height advantage here?"',
                                        desc: <>Build a visual lineup with <strong className='text-accent'>NBA height comparison</strong> charts or any <strong className='text-accent'>athlete height comparison</strong>. Coaches and fans use this to see the real height advantage with proportional data.</>,
                                        try: 'NBA STARTER 200 CM · NFL LINEBACKER 188 CM · CLIMBER 174 CM'
                                    },
                                    {
                                        tag: 'ANIME AND FANDOM',
                                        quote: '"The wiki says one thing, but what does it actually look like?"',
                                        desc: <>Cross-franchise <strong className='text-accent'>anime character heights</strong> at verified scale. Compare <strong className='text-accent'>Goku</strong> (175 cm), <strong className='text-accent'>Vegeta</strong> (164 cm), Piccolo (226 cm) and Levi (160 cm) side by side.</>,
                                        try: 'GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM'
                                    },
                                    {
                                        tag: 'OBJECTS AND REAL-WORLD SCALE',
                                        quote: '"I had no idea it was actually that big."',
                                        desc: <>Place a person next to Angel Falls (979 m). Check standard <strong className='text-accent'>door height</strong> (203 cm) or ceiling height against your own height for design decisions.</>,
                                        try: 'PERSON 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8,848 M'
                                    },
                                    {
                                        tag: 'ME VS CELEBRITY',
                                        quote: '"Hang on they are the same height as me?"',
                                        desc: <><strong className='text-accent'>Celebrity height comparison</strong> using verified public records. Add yourself and find out exactly where you stand.</>,
                                        try: 'YOU + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM'
                                    },
                                    {
                                        tag: 'PLANNING AND DESIGN',
                                        quote: '"Will this actually fit my room"',
                                        desc: "Add a door frame or ceiling height alongside a person to check proportions before making decisions.",
                                        try: 'PERSON 185 CM · STANDARD DOOR 203 CM · ROOM CEILING 260 CM'
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="bg-surface rounded-3xl p-8 border-2 border-border shadow-xl flex flex-col group hover:border-accent/40 transition-all">
                                        <div className="inline-flex self-start text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 mb-4 rounded-lg bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:scale-105">
                                            {item.tag}
                                        </div>
                                        <div className="text-[20px] font-black text-foreground mb-4 leading-tight uppercase  ">
                                            {item.quote}
                                        </div>
                                        <div className="text-[14px] text-muted font-bold leading-relaxed mb-6 flex-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                            {item.desc}
                                        </div>
                                        <div className="text-[11px] font-black text-muted/40 group-hover:text-accent/60 pt-6 border-t-2 border-border/50 uppercase tracking-widest transition-colors">
                                            Try: {item.try}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION: Height Generator Comparison — All Features, All Free */}
                        <section id="height-generator-comparison-all-features-all-free" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                                    WHY CHOOSE IT
                                </div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">Why Choose Our Height Comparison Tool?</h2>

                            <p className="text-[16px] leading-[1.8] text-muted mb-10 font-bold opacity-70">
                                Professional toolset. Zero friction. No accounts.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: 'M1 4h3v9H1z M5.5 2h3v11H5.5z M10 6h3v7H10z',
                                        color: 'emerald',
                                        title: 'Instant height generator',
                                        desc: <>This <strong className='text-accent'>height generator</strong> renders your <strong className='text-accent'>height chart</strong> as you type. No submits, no reloads.</>
                                    },
                                    {
                                        icon: 'M7 2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z M2 12c0-2.2 2.2-4 5-4s5 1.8 5 4',
                                        color: 'blue',
                                        title: 'Custom avatars',
                                        desc: <>Six colours, Male/Female styles. Stays distinct with 10+ subjects on one <strong className='text-accent'>height comparison chart</strong>.</>
                                    },
                                    {
                                        icon: 'M7 1.5l1.4 2.9 3.1.5-2.2 2.2.5 3.2L7 8.9 4.2 10.3l.5-3.2L2.5 4.9l3.1-.5z',
                                        color: 'amber',
                                        title: 'Celebrity data',
                                        desc: <>Athletes, Bollywood, British, Asian Celebs. The most complete free <strong className='text-accent'>celebrity height database</strong> online.</>
                                    },
                                    {
                                        icon: 'M2 2h10v10H2z M5 7l2 2 4-4',
                                        color: 'purple',
                                        title: 'Fictional characters',
                                        desc: <>Anime, Cartoons, DC, Fantasy. All <strong className='text-accent'>anime character heights</strong> and <strong className='text-accent'>fictional character heights</strong> verified from licensed datebooks.</>
                                    },
                                    {
                                        icon: 'M2 11L5 8M9 4l3-2-2 3M5 8l4-4 M9 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
                                        color: 'teal',
                                        title: 'Entities and objects',
                                        desc: <>Animals, landmarks, and real-world objects at verified scale. Place a person next to a Patagonian Cypress, Angel Falls, or Mt Everest.</>
                                    },
                                    {
                                        icon: 'M1.5 3h11v8h-11z M4.5 6.5l2 2 3-3',
                                        color: 'red',
                                        title: 'Image upload',
                                        desc: <>Our <strong className='text-accent'>image to height</strong> tool slots any photo into the chart at real proportions. Accurate to 1 to 2 cm.</>
                                    },
                                    {
                                        icon: 'M7 1v8M4 6l3 3 3-3M2 11v1a1 1 0 001 1h8a1 1 0 001-1v-1',
                                        color: 'emerald',
                                        title: 'Clean PNG export',
                                        desc: <>Download <strong className='text-accent'>height comparison PNG</strong> charts without watermarks. Free, unlimited, high resolution.</>
                                    },
                                    {
                                        icon: 'M9 2l3 3-3 3M5 12l-3-3 3-3M12 5H7a4 4 0 00-4 4',
                                        color: 'blue',
                                        title: 'Shareable links',
                                        desc: <>A direct <strong className='text-accent'>shareable height comparison link</strong> for your exact chart. No account needed for anyone.</>
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="bg-surface rounded-3xl p-8 border-2 border-border shadow-md flex flex-col group hover:border-foreground/20 transition-all">
                                        <div className={`text-[16px] font-black mb-4 flex items-center gap-4 text-foreground uppercase tracking-widest`}>
                                            <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                                <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                                                    <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`text-${item.color}-500`} />
                                                </svg>
                                            </div>
                                            {item.title}
                                        </div>
                                        <div className="text-[14px] text-muted font-bold leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity">
                                            {item.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>



                        {/* SECTION: How Accurate Is the Height Comparison Chart? */}
                        <section id="how-accurate-is-the-height-comparison-chart" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Data integrity</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">How Accurate Is the Height Comparison Chart?</h2>



                            <div className="grid sm:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: 'Celebrity records',
                                        desc: 'Sourced from verified public records and biographical guides. Conflicting data is normalised to the most recent verified figure. No crowd estimates.'
                                    },
                                    {
                                        title: 'Source material',
                                        desc: <>Character heights from <strong className='text-accent'>official production guides</strong>, licensed databooks, and verified franchise repositories.</>
                                    },
                                    {
                                        title: 'Architectural data',
                                        desc: 'Landmarks verified from architectural records and wildlife natural history databases. Scientific reference sources only.'
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="bg-surface rounded-3xl p-8 border-2 border-border shadow-sm group hover:border-accent/40 transition-all">
                                        <div className="text-[14px] font-black text-foreground mb-3 uppercase tracking-widest opacity-80 group-hover:opacity-100">{item.title}</div>
                                        <div className="text-[13px] text-muted font-bold leading-relaxed opacity-60 group-hover:opacity-100">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>



                        {/* SECTION: A Height Comparison Website Built for Simplicity */}
                        <section id="a-height-comparison-website-built-for-simplicity" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Benchmark</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">A Height Comparison Website Built for Simplicity</h2>

                            <p className="text-[16px] leading-[1.8] text-muted mb-10 font-bold opacity-70">
                                Comparing our standard feature set against the market.
                            </p>

                            <div className="overflow-x-auto rounded-[2.5rem] border-2 border-border/80 bg-surface shadow-2xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-bg/50 border-b-2 border-border/80">
                                            <th className="p-8 text-[11px] font-black text-foreground uppercase tracking-widest opacity-40">Matrix</th>
                                            <th className="p-8 text-[11px] font-black bg-emerald-500/5 text-emerald-500 uppercase tracking-[0.3em] ">THIS TOOL</th>
                                            <th className="p-8 text-[11px] font-black text-foreground uppercase tracking-widest opacity-40 ">THE OTHERS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[14px] divide-y-2 divide-border/50">
                                        {[
                                            ['Side-by-side height chart', ' Exact scale', ' Basic'],
                                            ['Subject limit', ' Unlimited', ' 2 to 4 max'],
                                            ['Celebrity height database', ' 100% Free', ' Paid/Date'],
                                            ['Anime character heights library', ' Official Data', ' Missing'],
                                            ['Entity scale (animals/peaks)', ' Animals/Peaks', ' Not available'],
                                            ['Image upload (image to height)', ' Auto-scaled', ' Not available'],
                                            ['PNG export', ' No Watermark', ' Paywall'],
                                            ['Account required', ' Zero', ' Mandatory'],
                                            ['Price', ' $0.00 Forever', ' Subscription'],
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-bg/50 transition-colors">
                                                <td className="p-6 font-black text-foreground uppercase  bg-surface text-base">{row[0]}</td>
                                                <td className="p-6 text-emerald-500 font-extrabold bg-emerald-500/5  text-base">{row[1]}</td>
                                                <td className="p-6 text-muted font-bold opacity-40 text-center">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Mid-page CTA */}
                        <div className="my-12">
                            <HomeCTAs />
                        </div>



                        {/* SECTION: Why Choose This Height Comparison Tool? */}
                        {/* <section id="why-choose-this-height-comparison-tool" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Verdict</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">Why Choose This Height Comparison Tool?</h2>

                            <div className="grid sm:grid-cols-2 gap-6 my-10">
                                {[
                                    { title: 'Mathematically precise', desc: 'Every bar renders to the exact proportional ratio of the heights entered. Zero visual rounding.' },
                                    { title: 'Five input types, one chart', desc: 'People, celebs, characters, objects, and photos share one verified proportional scale.' },
                                    { title: 'Verified Data Sourcing', desc: 'Heights come from verified public records and official guides — never crowd estimates.' },
                                    { title: 'Ready in thirty seconds', desc: 'Open, Add, Compare. Your first visual is on screen before you finish reading this.' },
                                    { title: 'Zero Watermark PNGs', desc: 'Download clean labeled charts for social media. Unlimited, free, high resolution.' },
                                    { title: 'Live Sync updates', desc: 'Every person, color, or height change appears on chart instantly. No refreshes.' },
                                    { title: 'Complete toolkit', desc: 'Diff calculator, percentile, ideal weight, and global average height tables included.' },
                                    { title: 'Genuiely $0.00 Forever', desc: 'No freemium, no hidden tiers, no subscriptions. Everything is available now.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-5 p-6 bg-surface rounded-[2rem] border-2 border-border shadow-sm hover:border-accent/30 transition-all group">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1 border-2 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                                            <svg width="14" height="14" viewBox="0 0 10 10" fill="none" className="group-hover:text-white transition-colors text-emerald-500"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <div>
                                            <strong className="block text-foreground text-[16px] mb-1 font-black uppercase tracking-tighter group-hover:text-accent transition-colors">{item.title}</strong>
                                            <span className="text-[14px] text-muted font-bold leading-relaxed opacity-60 group-hover:opacity-100">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section> */}



                        {/* SECTION: Frequently Asked Questions */}
                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion
                                items={HOME_FAQ}
                                title="Height Comparison FAQ"
                                description="Expert answers to common scaling, data, and prediction questions"
                            />
                        </div>

                        {/* SECTION: Compare Heights Online — Tools and Articles */}
                        <section id="compare-heights-online-tools-and-articles" className="space-y-4 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">Discovery</div>
                                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">Compare Heights Online Tools and Articles</h2>

                            <div className="grid sm:grid-cols-2 gap-6 my-10">

                                {/* Pairings */}
                                {[
                                    {
                                        href: '/height-difference/',
                                        label: 'Height Difference Calculator',
                                        desc: 'Exact gaps in cm/in, percentage difference, and reference chart for common height pairings.'
                                    },
                                    {
                                        href: '/average-height-by-country/',
                                        label: 'Average Height by Country',
                                        desc: 'Global height data for 46 countries. Sortable table, regional charts, world heatmap, and height extremes.'
                                    },
                                    {
                                        href: '/height-weight-percentile/',
                                        label: 'Height Weight Percentile Calculator',
                                        desc: 'Compare your height and weight against WHO and CDC population data. Includes a height weight chart by age and sex for adults and children.'
                                    },
                                    {
                                        href: '/ideal-body-weight/',
                                        label: 'Ideal Body Weight Calculator',
                                        desc: 'Devine, Robinson, and Hamwi formulas side by side. Includes a complete height and weight chart by sex.'
                                    },
                                    {
                                        href: '/image-to-height/',
                                        label: 'Image to Height Guide',
                                        desc: 'Measure your height from a photo. No tape measure needed. Morning height variation and accuracy guides.'
                                    },
                                    {
                                        href: '/child-height-calculator/',
                                        label: 'Child Growth Predictor',
                                        desc: 'Khamis-Roche and Mid-Parental formulas for estimating adult height. The most accurate free child height calculator.'
                                    },
                                ].map((item, i) => (
                                    <Link key={i} href={item.href} className="bg-surface rounded-3xl p-8 border-2 border-emerald-500/20 hover:border-emerald-500 hover:-translate-y-2 transition-all group shadow-2xl flex flex-col cursor-pointer">
                                        <div className="inline-flex self-start text-[10px] font-black px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500/20 mb-4 uppercase tracking-[0.2em]">Toolkit</div>
                                        <div className="text-[20px] font-black text-foreground mb-3 leading-tight uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">{item.label}</div>
                                        <div className="text-[14px] text-muted font-bold leading-relaxed flex-1 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</div>
                                        <div className="text-[12px] font-black text-emerald-500 mt-auto flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">LAUNCH TOOL <ArrowRight size={16} /></div>
                                    </Link>
                                ))}

                            </div>

                            {/* Legal / Do not sell */}
                            <div className="bg-surface rounded-[2.5rem] p-10 border-2 border-border mt-12 shadow-inner group">
                                <strong className="text-foreground block text-[15px] font-black uppercase tracking-widest mb-3 opacity-60 group-hover:opacity-100 transition-opacity">Data Privacy And Rights</strong>
                                <p className="text-[14px] text-muted font-bold leading-[1.8] opacity-60 group-hover:opacity-100 transition-opacity">
                                    DATA PRIVACY AND RIGHTS
                                    We do not sell your personal information to third parties. Under the California Consumer Privacy Act (CCPA) and similar state laws, you have the right to opt out of data sharing for cross-context behavioural advertising. Visit our<Link href="/privacy" className="text-blue-500 font-black hover:underline px-1">Privacy Policy</Link> or contact us directly. Standard use of the height comparison tool collects zero personal information and requires no authentication.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div >
    );
}