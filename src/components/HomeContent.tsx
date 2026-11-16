'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useUIStore } from '@/store';
import { PanelType } from '../types';
import FaqAccordion from './FaqAccordion';
import DashboardLink from './DashboardLink';
import SmoothScrollLink from './SmoothScrollLink';
import HomeCTAs from './HomeCTAs';
import { HOME_FAQ, HOME_FAQ_SOURCES } from '@/constants/home';
import {
  LibraryStackBar,
  WorkedExampleBars,
  ScaleLadder,
  GapPairBars,
  HeightGapTable,
} from './visuals';

export default function HomeContent() {
  const { isCustomFullscreen } = useUIStore();

  if (isCustomFullscreen) return null;

  return (
    <div className="w-full bg-bg text-foreground selection:bg-accent/20 transition-colors duration-500 pt-12 pb-24 border-t border-border">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex flex-col md:flex-row gap-8 relative">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 order-1 md:order-2">
          <div className="flex flex-col gap-14 w-full min-w-0 max-w-4xl mx-auto">

            {/* --- INTRO SECTION --- */}
            <div className="space-y-6 text-left mt-2">
              <h1 className="text-2xl sm:text-3xl md:text-[38px] font-black text-foreground leading-[1.2] tracking-tight uppercase px-4 py-5 bg-accent/5 rounded-2xl border-l-8 border-l-accent shadow-sm">
                Height Comparison Calculator to Compare Heights Online with Visual Chart
              </h1>

              <p className="text-muted leading-relaxed text-base sm:text-lg font-medium tracking-[0.01em]">
                Use this height comparison tool to see heights side by side with a real-scale chart. Enter any height in centimeters, feet, or inches to view the height difference instantly. The tool shows a visual comparison using proportional scaling. This way, you can clearly see how tall or short one subject is compared to another. The chart updates in real-time and scales every figure from the exact value you enter. You can compare two or more heights at once and create a visual height difference chart in seconds. The tool also converts units automatically, so you can use cm, feet, or inches easily. It works for comparing people, celebrities, fictional characters, and real-world objects. This helps you understand size differences and proportions better.
              </p>

              {/* Free Card with LibraryStackBar (V1) */}
              <div className="p-6 sm:p-7 bg-surface border-2 border-border/80 rounded-[2rem] shadow-sm hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Free Online Library
                  </span>
                </div>
                <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                  Access our database of ready-made reference heights across three collections, create unlimited custom comparisons, and export high-resolution PNG charts.
                </p>

                {/* V1 Visual Stack Bar */}
                <LibraryStackBar />

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-bold text-muted border-t border-border/40">
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Check size={14} className="text-emerald-500" /> No accounts
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Check size={14} className="text-emerald-500" /> No payments
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Check size={14} className="text-emerald-500" /> 100% Free
                  </span>
                </div>
              </div>

              <SmoothScrollLink
                targetId="height-comparison-tool"
                className="bg-accent w-full text-center text-zinc-950 px-8 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-base sm:text-lg hover:scale-[1.02] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center justify-center gap-3"
              >
                <span>Compare Now ↑</span>
              </SmoothScrollLink>
            </div>

            {/* --- SECTION 1: How Does a Height Comparison Chart Work? --- */}
            <section id="how-does-a-height-comparison-chart-work" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  How it works
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                How Does a Height Comparison Chart Work?
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                A height comparison chart converts raw height measurements into a visual chart where each bar represents the exact ratio between heights at true proportional scale.
              </p>
              <p className="text-base text-muted leading-relaxed font-medium">
                If Person A is 170&nbsp;cm and Person B is 185&nbsp;cm, the second bar renders at exactly 1.09x the height of the first. A 10&nbsp;cm gap at 160&nbsp;cm reads proportionally different from the same gap at 190&nbsp;cm. The height chart makes that distinction visible without any calculation on your part.
              </p>
              <p className="text-base text-muted leading-relaxed font-medium">
                Use it as a height chart maker for families, teams, or creative projects.
              </p>

              {/* Example Chart Image */}
              <figure className="my-6">
                <img
                  src="/height-comparison-chart-example.png"
                  alt="Height comparison chart of a 5'7&quot; and a 6'1&quot; person side by side"
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl border border-border shadow-md"
                />
                <figcaption className="text-xs text-muted mt-2.5 text-center sm:text-left">
                  Alex at 5&apos;7&quot; (170 cm) and Ben at 6&apos;1&quot; (185 cm), drawn to scale.
                </figcaption>
              </figure>

              {/* V2: Worked Example Bars */}
              <WorkedExampleBars />

              {/* Need just the gap card */}
              <div className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-7 bg-surface rounded-[2rem] border-2 border-border/80 shadow-sm hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <svg width="24" height="24" viewBox="0 0 14 14" fill="none" className="text-current">
                    <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 7h6M7 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-base sm:text-lg font-black text-foreground uppercase tracking-tight">
                    Need just the gap between two specific heights?
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-medium">
                    The Height Difference Calculator shows the exact difference in cm and inches, the percentage gap, and a visual bar. Use it when you need the precise height gap without building a full chart.
                  </p>
                  <Link
                    href="/height-difference-calculator"
                    className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 uppercase tracking-widest pt-1 group"
                  >
                    <span>Open Height Difference Calculator</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </section>

            {/* --- SECTION 2: Compare Height in 3 Simple Steps --- */}
            <section id="compare-height-in-3-simple-steps" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Step by step
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase">
                How to Compare Heights Online: Step-by-Step for Beginners
              </h2>

              <div className="border-2 border-border/80 rounded-[2.5rem] overflow-hidden bg-surface shadow-sm divide-y-2 divide-border/60">
                {/* Step 1 */}
                <div className="flex flex-col sm:flex-row p-6 sm:p-8 md:p-10 gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-zinc-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    01
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tight">
                      Step 1: Begin with Your Comparison Setup
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed font-medium">
                      Decide what to compare. Two friends, a celebrity and yourself, a group of anime characters, a person next to a landmark. Heights work in cm or ft/in. Switch units at any time using the toggle at the top of the chart.
                    </p>
                    <div className="p-4 bg-bg rounded-xl border-l-4 border-l-accent text-xs sm:text-sm text-muted font-medium">
                      <strong className="text-foreground uppercase tracking-wider text-[11px] block mb-1">Guidebook Note:</strong>
                      Search the celebrity height database and the tool fills heights in automatically. Browse anime character heights and fictional character heights from the Fictional panel. Character heights come from official guidebooks where a franchise publishes them.
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <DashboardLink
                        panel="ADD_PERSON"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-colors"
                      >
                        People
                      </DashboardLink>
                      <DashboardLink
                        panel="CELEBRITIES"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors"
                      >
                        Celebrities
                      </DashboardLink>
                      <DashboardLink
                        panel="FICTIONAL"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors"
                      >
                        Characters
                      </DashboardLink>
                      <DashboardLink
                        panel="ENTITIES"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                      >
                        Objects
                      </DashboardLink>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col sm:flex-row p-6 sm:p-8 md:p-10 gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-zinc-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    02
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tight">
                      Step 2: Build your height chart
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed font-medium">
                      Type names, add custom colors, and enter measurements. The height generator draws each figure immediately. The visual comparison scales dynamically as you add people or objects. Scale reaches up to 10,000 meters (32,808 ft), so you can line up a person next to the Eiffel Tower or Mount Everest.
                    </p>

                    {/* Interactive Input Panel Cards */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-1">
                      {[
                        { panel: 'ADD_PERSON', label: 'Add Person', desc: 'Name, gender, height in cm or ft/in, custom color.' },
                        { panel: 'CELEBRITIES', label: 'Celebrities', desc: 'Athletes, actors, historical icons worldwide.' },
                        { panel: 'FICTIONAL', label: 'Fictional', desc: 'Anime, cartoons, superheroes from licensed databooks.' },
                        { panel: 'ENTITIES', label: 'Entities & Objects', desc: 'Animals, architectural landmarks, natural peaks.' },
                      ].map((item) => (
                        <DashboardLink
                          key={item.panel}
                          panel={item.panel as PanelType}
                          className="text-left p-4 rounded-2xl border border-border bg-bg/50 hover:bg-bg hover:border-accent/40 transition-all cursor-pointer group"
                        >
                          <div className="text-xs font-black text-accent uppercase tracking-wider mb-1 group-hover:translate-x-1 transition-transform">
                            {item.label} →
                          </div>
                          <div className="text-xs text-muted font-medium">
                            {item.desc}
                          </div>
                        </DashboardLink>
                      ))}
                    </div>

                    {/* V3: ScaleLadder */}
                    <ScaleLadder />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col sm:flex-row p-6 sm:p-8 md:p-10 gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-zinc-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    03
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tight">
                      Step 3: See the Difference, Then Share It
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed font-medium">
                      Every bar is labelled with name and height. The gap between any two subjects is visible straight away. The height chart maker updates instantly with every change. Hit Download PNG for a clean image with a small site credit, or Share to get a direct link. Share links stay active for 7 days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECTION 3: Why a Visual Height Comparison Shows More Than Numbers --- */}
            <section id="why-a-visual-height-comparison-shows-more-than-numbers" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Why use it
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                Why a Visual Height Comparison Chart Shows More Than Numbers
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                A visual height comparison chart renders the mathematical relationship between heights as a scaled image, making the size difference between subjects immediately readable without any calculation on your part.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Card 1 with V4 GapPairBars */}
                <div className="sm:col-span-2 bg-surface rounded-3xl p-6 sm:p-8 border-2 border-border/80 shadow-sm space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-foreground uppercase tracking-tight">
                    Proportional scale reveals what numbers hide
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    A 12 cm gap at 160 cm is proportionally larger than at 190 cm. The visual bars show that distinction instantly. Raw numbers alone never make this visible. Need to calculate the exact difference between two heights? Open the{' '}
                    <Link href="/height-difference-calculator" className="text-accent underline font-bold">
                      Height Difference Calculator
                    </Link>.
                  </p>
                  {/* V4 Visual Component */}
                  <GapPairBars />
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    Compare yourself with anyone or anything
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Add yourself and drop in a celebrity, a fictional character, or a mountain. The chart scales all of them together accurately on one proportional axis.
                  </p>
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    Character height comparison for creative work
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Artists and writers visualise character relationships at verified scale from official production guides. Updates live as you type.
                  </p>
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    No unit conversions or manual calculations
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Enter heights in cm or ft/in. Subtraction, ratio, and percentage calculations all happen automatically as you type. Switch units at any time.
                  </p>
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    Real-world scale puts human height in context
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    See a 175 cm person next to Mt Everest (8,848 m) to understand true scale. Compare human heights directly against natural and architectural landmarks on the same axis.
                  </p>
                </div>

                <div className="sm:col-span-2 bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    Exportable visual output in one click
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Download labelled PNGs or generate shareable URLs. Sized for social media, discussion forums, and presentations.
                  </p>
                </div>
              </div>
            </section>

            {/* --- SECTION 4: Comparing Heights — Examples and Use Cases --- */}
            <section id="comparing-heights-examples-and-use-cases" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Usage
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                Comparing Heights: Examples and Use Cases
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                Common real-world scenarios where visual proportional scaling provides immediate clarity over raw measurements.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    tag: 'COUPLES AND FRIENDS',
                    quote: '"Wait, how much taller are you than me, exactly?"',
                    desc: 'Drop in both heights and see the exact gap on a proportional chart. A 10 cm difference is visually obvious straight away.',
                    try: '165 CM + 178 CM · 13 CM GAP (7.9%)',
                  },
                  {
                    tag: 'SPORTS AND ATHLETES',
                    quote: '"Who actually has the height advantage here?"',
                    desc: 'Build a visual lineup with NBA height comparison charts or any athlete height comparison. Coaches and fans use this to see the real height advantage with proportional data.',
                    try: 'NBA STARTER 200 CM · NFL LINEBACKER 188 CM · CLIMBER 174 CM',
                  },
                  {
                    tag: 'ANIME AND FANDOM',
                    quote: '"The wiki says one thing, but what does it actually look like?"',
                    desc: 'Cross-franchise anime character heights at verified scale. Compare Goku (175 cm), Vegeta (164 cm), Piccolo (226 cm) and Levi (160 cm) side by side.',
                    try: 'GOKU 175 CM · VEGETA 164 CM · PICCOLO 226 CM · LEVI 160 CM',
                  },
                  {
                    tag: 'OBJECTS AND REAL-WORLD SCALE',
                    quote: '"I had no idea it was actually that big."',
                    desc: 'Place a person next to Angel Falls (979 m). Check standard door height (203 cm) or ceiling height against your own height for design decisions.',
                    try: 'PERSON 175 CM + CHRYSLER BUILDING 319 M + MT EVEREST 8,848 M',
                  },
                  {
                    tag: 'ME VS CELEBRITY',
                    quote: '"Hang on, they are the same height as me?"',
                    desc: 'Celebrity height comparison using published heights. Add yourself and find out exactly where you stand.',
                    try: 'YOU + TOM CRUISE 170 CM · DWAYNE JOHNSON 196 CM · TAYLOR SWIFT 178 CM',
                  },
                  {
                    tag: 'PLANNING AND DESIGN',
                    quote: '"Will this actually fit in my room?"',
                    desc: 'Add a door frame or ceiling height alongside a person to check proportions before making decisions.',
                    try: 'PERSON 185 CM · STANDARD DOOR 203 CM · ROOM CEILING 260 CM',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-surface rounded-3xl p-8 border-2 border-border shadow-xl flex flex-col justify-between group hover:border-accent/40 transition-all"
                  >
                    {/* 1. TAG */}
                    <div className="inline-flex self-start text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 mb-4 rounded-lg bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:scale-105">
                      {item.tag}
                    </div>

                    {/* 2. QUOTE: Hanging quotation mark */}
                    <div className="text-[20px] font-black text-foreground mb-4 leading-tight uppercase min-h-[5.5rem] indent-[-0.55em] pl-[0.55em]">
                      {item.quote}
                    </div>

                    {/* 3. DESC */}
                    <div className="text-[14px] text-muted font-bold leading-relaxed mb-6 flex-1 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </div>

                    {/* 4. TRY LINE */}
                    <div className="text-[11px] font-black text-muted pt-6 border-t-2 border-border/50 uppercase tracking-widest transition-colors min-h-[5.5rem]">
                      Try: {item.try}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subsection: Height Difference Chart in Feet and Inches (V5) */}
              <div className="pt-6">
                <h3 id="height-difference-chart" className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight mb-2">
                  Height difference chart in feet and inches
                </h3>
                <p className="text-sm text-muted font-medium leading-relaxed mb-4">
                  When you want to see how common pairings compare side by side, this height difference chart lists seven everyday examples in feet, inches, centimeters, and relative percentages.
                </p>
                <HeightGapTable />
              </div>
            </section>

            {/* --- SECTION 5: Why Choose Our Height Comparison Tool? --- */}
            <section id="height-generator-comparison-all-features-all-free" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Why choose it
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                Why Choose Our Height Comparison Tool?
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                Professional toolset. Zero friction. No accounts.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Instant height generator',
                    desc: 'This height generator renders your height chart as you type. No submits, no reloads.',
                  },
                  {
                    title: 'Custom avatars',
                    desc: 'Six colors, Male/Female styles. Stays distinct with 10+ subjects on one height comparison chart.',
                  },
                  {
                    title: 'Celebrity data',
                    desc: '1,294 celebrities across athletes, Bollywood, British, and Asian figures. Counted directly in the database.',
                  },
                  {
                    title: 'Fictional characters',
                    desc: '1,138 fictional characters across Anime, Cartoons, DC, and Fantasy. Sourced from official franchise guidebooks where published.',
                  },
                  {
                    title: 'Entities and objects',
                    desc: '264 objects, animals, and landmarks at verified scale. Place a person next to a Patagonian Cypress, Angel Falls, or Mt Everest.',
                  },
                  {
                    title: 'Image upload',
                    desc: 'Our image to height tool slots any photo into the chart at real proportions using auto-scale geometry.',
                  },
                  {
                    title: 'Clean PNG export',
                    desc: 'Download height comparison PNG charts with a small site credit. Free, unlimited, high resolution.',
                  },
                  {
                    title: 'Shareable links',
                    desc: 'A direct shareable height comparison link for your exact chart. Links stay active for 7 days with no account needed.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-surface rounded-3xl p-8 border-2 border-border shadow-md flex flex-col group hover:border-accent/30 transition-all">
                    <h3 className="text-[16px] font-black mb-4 flex items-center gap-4 text-foreground uppercase tracking-widest">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-muted font-bold leading-relaxed transition-opacity">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- SECTION 6: How Accurate Is the Height Comparison Chart? --- */}
            <section id="how-accurate-is-the-height-comparison-chart" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Data Accuracy
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                How Accurate Is the Height Comparison Chart?
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Exact Scale Engine',
                    desc: 'Every figure is drawn from the exact value you enter: 170 cm renders at 170.00 on the canvas. Text labels round to the nearest cm or inch for readability, but the bars themselves never round.',
                  },
                  {
                    title: 'Reference Values',
                    desc: 'Published heights for the same person often differ between sources. We use the most recently verified figure from a credible public source, but treat all presets as reference values.',
                  },
                  {
                    title: 'Celebrity Records',
                    desc: 'Sourced from public records and biographical guides. Conflicting data is normalized to the most recent published figure. No crowd estimates.',
                  },
                  {
                    title: 'Source Material',
                    desc: 'Character heights come from official production guides, licensed databooks, and verified franchise repositories.',
                  },
                  {
                    title: 'Architectural & Natural Scale',
                    desc: 'Landmarks verified from architectural records. Animal heights measure to the shoulder (withers) rather than head or total length.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-surface rounded-3xl p-8 border-2 border-border shadow-sm group hover:border-accent/40 transition-all">
                    <h3 className="text-[14px] font-black text-foreground mb-3 uppercase tracking-widest group-hover:opacity-100">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-muted font-bold leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- SECTION 7: A Height Comparison Website Built for Simplicity --- */}
            <section id="a-height-comparison-website-built-for-simplicity" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Feature Checklist
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                A Height Comparison Website Built for Simplicity
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                Everything you need to compare heights accurately, with zero barriers.
              </p>

              <div className="overflow-x-auto rounded-[2rem] border-2 border-border/80 bg-surface shadow-sm custom-scrollbar">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border">
                      <th className="p-4 sm:p-6 text-xs font-black text-foreground uppercase tracking-widest">Feature</th>
                      <th className="p-4 sm:p-6 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">What You Get, Free</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      ['Subjects per chart', 'Unlimited — all on one proportional axis'],
                      ['Ready-made heights', '2,696 presets (1,294 celebrities, 1,138 fictional characters, 264 objects)'],
                      ['Supported units', 'Centimeters, meters, feet and inches (switch anytime)'],
                      ['Scale range', 'A few centimeters up to 10,000 meters (32,808 ft) with dynamic auto-zoom'],
                      ['Export options', 'Clean PNG chart download with site credit; shareable links (7-day active duration)'],
                      ['Account & price', '$0.00 forever — no account creation, no subscriptions, no credit card required'],
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-500/5 transition-colors">
                        <td className="p-4 sm:p-6 font-bold text-foreground">{row[0]}</td>
                        <td className="p-4 sm:p-6 text-muted font-medium">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interactive Mid-page Call to Action */}
              <HomeCTAs />
            </section>

            {/* --- SECTION 8: Frequently Asked Questions (Single ID via FaqAccordion) --- */}
            <FaqAccordion
              items={HOME_FAQ}
              title="Height Comparison FAQ"
              description="Expert answers to common scaling, data, and height conversion questions"
              footerText={HOME_FAQ_SOURCES}
            />

            {/* --- SECTION 9: Compare Heights Online — Tools and Articles --- */}
            <section id="compare-heights-online-tools-and-articles" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  Discovery
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                Compare Heights Online Tools and Articles
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 my-6">
                {[
                  {
                    href: '/height-difference-calculator',
                    label: 'Height Difference Calculator',
                    desc: 'Exact gaps in cm and inches, percentage difference, and reference chart for common height pairings.',
                    badge: 'Toolkit',
                  },
                  {
                    href: '/height-weight-percentile-calculator',
                    label: 'Height Weight Percentile Calculator',
                    desc: 'Compare your height and weight against WHO and CDC population data. Includes a height weight chart by age and sex for adults and children.',
                    badge: 'Toolkit',
                  },
                  {
                    href: '/ideal-body-weight-calculator',
                    label: 'Ideal Body Weight Calculator',
                    desc: 'Devine, Robinson, and Hamwi formulas side by side. Includes a complete height and weight chart by sex.',
                    badge: 'Toolkit',
                  },
                  {
                    href: '/image-to-height',
                    label: 'Image to Height Calculator',
                    desc: 'Measure height from a photo with no tape measure needed. Morning height variation and accuracy guides.',
                    badge: 'Toolkit',
                  },
                  {
                    href: '/height-predictor',
                    label: 'Height Calculator',
                    desc: 'Khamis-Roche and Mid-Parental formulas for estimating adult height in children.',
                    badge: 'Toolkit',
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="bg-surface rounded-3xl p-4 md:p-8 border-2 border-emerald-500/20 hover:border-emerald-500 hover:-translate-y-2 transition-all group shadow-2xl flex flex-col cursor-pointer"
                  >
                    <div className="inline-flex self-start text-[10px] font-black px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3 uppercase tracking-[0.2em]">
                      {item.badge}
                    </div>

                    <h3 className="text-[20px] font-black text-foreground mb-3 leading-tight uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">
                      {item.label}
                    </h3>

                    <p className="text-[14px] text-muted font-bold leading-relaxed mb-6 flex-1">
                      {item.desc}
                    </p>

                    <div className="text-[12px] font-black text-emerald-500 mt-auto flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
                      <span>Launch Tool</span>
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Data Privacy & Compliance Notice */}
              <div className="bg-surface rounded-3xl p-6 sm:p-8 border-2 border-border mt-8 shadow-inner">
                <p className="text-foreground block text-sm font-black uppercase tracking-wider mb-2">
                  Data Privacy And Rights
                </p>
                <p className="text-xs sm:text-sm text-muted font-medium leading-relaxed">
                  We do not sell your personal information to third parties. Under the California Consumer Privacy Act (CCPA) and similar state laws, you have the right to opt out of data sharing for cross-context behavioral advertising. Visit our{' '}
                  <Link href="/privacy" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  or contact us directly. Standard use of the height comparison tool collects zero personal information and requires no authentication.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
