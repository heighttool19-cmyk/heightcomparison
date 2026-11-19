'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUIStore } from '@/store';
import { PanelType } from '../types';
import FaqAccordion from './FaqAccordion';
import DashboardLink from './DashboardLink';
import SmoothScrollLink from './SmoothScrollLink';
import HomeCTAs from './HomeCTAs';
import {
  LibraryStackBar,
  WorkedExampleBars,
  ScaleLadder,
  GapPairBars,
  HeightGapTable,
  AgeBenchmarkBars,
  TwoInchGap,
  ConversionFlow,
} from './visuals';

export default function HomeContent() {
  const { isCustomFullscreen } = useUIStore();
  const t = useTranslations('home');

  if (isCustomFullscreen) return null;

  const panels = t.raw('section2.panels') as Array<{ label: string; desc: string }>;
  const panelTypes: PanelType[] = ['ADD_PERSON', 'CELEBRITIES', 'FICTIONAL', 'ENTITIES'];

  const useCases = t.raw('section4.useCases') as Array<{
    tag: string;
    quote: string;
    desc: string;
    try: string;
  }>;

  const features = t.raw('section5.features') as Array<{
    title: string;
    desc: string;
  }>;

  const accuracyItems = t.raw('section6.items') as Array<{
    title: string;
    desc: string;
  }>;

  const checklistRows = t.raw('section7.rows') as Array<[string, string]>;

  const cards = t.raw('section9.cards') as Array<{
    label: string;
    desc: string;
    badge: string;
    href: string;
  }>;

  return (
    <div className="w-full bg-bg text-foreground selection:bg-accent/20 transition-colors duration-500 pt-12 pb-24 border-t border-border">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex flex-col md:flex-row gap-8 relative">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 order-1 md:order-2">
          <div className="flex flex-col gap-14 w-full min-w-0 max-w-4xl mx-auto">

            {/* --- INTRO SECTION --- */}
            <div className="space-y-6 text-left mt-2">
              <h1 className="text-2xl sm:text-3xl md:text-[38px] font-black text-foreground leading-[1.2] tracking-tight uppercase px-4 py-5 bg-accent/5 rounded-2xl border-l-8 border-l-accent shadow-sm">
                {t('intro.h1')}
              </h1>

              <p className="text-muted leading-relaxed text-base sm:text-lg font-medium tracking-[0.01em]">
                {t('intro.p')}
              </p>

              {/* Free Card with LibraryStackBar (V1) */}
              <div className="p-6 sm:p-7 bg-surface border-2 border-border/80 rounded-[2rem] shadow-sm hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {t('intro.freeLibraryBadge')}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                  {t('intro.freeLibraryDesc')}
                </p>

                {/* V1 Visual Stack Bar */}
                <LibraryStackBar />

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-bold text-muted border-t border-border/40">
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Check size={14} className="text-emerald-500" /> {t('intro.noAccounts')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Check size={14} className="text-emerald-500" /> {t('intro.noPayments')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Check size={14} className="text-emerald-500" /> {t('intro.free100')}
                  </span>
                </div>
              </div>

              <SmoothScrollLink
                targetId="height-comparison-tool"
                className="bg-accent w-full text-center text-zinc-950 px-8 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-base sm:text-lg hover:scale-[1.02] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center justify-center gap-3"
              >
                <span>{t('intro.compareNowCta')}</span>
              </SmoothScrollLink>
            </div>

            {/* --- SECTION 1: How Does a Height Comparison Chart Work? --- */}
            <section id="how-does-a-height-comparison-chart-work" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  {t('section1.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section1.title')}
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section1.p1')}
              </p>
              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section1.p2')}
              </p>
              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section1.p3')}
              </p>

              {/* Example Chart Image */}
              <figure className="my-6">
                <img
                  src="/height-comparison-chart-example.png"
                  alt={t('section1.imgAlt')}
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl border border-border shadow-md"
                />
                <figcaption className="text-xs text-muted mt-2.5 text-center sm:text-left">
                  {t('section1.imgCaption')}
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
                    {t('section1.needGapTitle')}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-medium">
                    {t('section1.needGapDesc')}
                  </p>
                  <Link
                    href="/height-difference-calculator"
                    className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 uppercase tracking-widest pt-1 group"
                  >
                    <span>{t('section1.needGapCta')}</span>
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
                  {t('section2.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase">
                {t('section2.title')}
              </h2>

              <div className="border-2 border-border/80 rounded-[2.5rem] overflow-hidden bg-surface shadow-sm divide-y-2 divide-border/60">
                {/* Step 1 */}
                <div className="flex flex-col sm:flex-row p-6 sm:p-8 md:p-10 gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-zinc-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    01
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tight">
                      {t('section2.step1Title')}
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed font-medium">
                      {t('section2.step1Desc')}
                    </p>
                    <div className="p-4 bg-bg rounded-xl border-l-4 border-l-accent text-xs sm:text-sm text-muted font-medium">
                      <strong className="text-foreground uppercase tracking-wider text-[11px] block mb-1">
                        {t('section2.guidebookNoteLabel')}
                      </strong>
                      {t('section2.guidebookNoteText')}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <DashboardLink
                        panel="ADD_PERSON"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-colors"
                      >
                        {t('section2.panelPeople')}
                      </DashboardLink>
                      <DashboardLink
                        panel="CELEBRITIES"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors"
                      >
                        {t('section2.panelCelebrities')}
                      </DashboardLink>
                      <DashboardLink
                        panel="FICTIONAL"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors"
                      >
                        {t('section2.panelCharacters')}
                      </DashboardLink>
                      <DashboardLink
                        panel="ENTITIES"
                        className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                      >
                        {t('section2.panelObjects')}
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
                      {t('section2.step2Title')}
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed font-medium">
                      {t('section2.step2Desc')}
                    </p>

                    {/* Interactive Input Panel Cards */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-1">
                      {panels.map((item, idx) => (
                        <DashboardLink
                          key={panelTypes[idx] || idx}
                          panel={panelTypes[idx] || 'ADD_PERSON'}
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
                      {t('section2.step3Title')}
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed font-medium">
                      {t('section2.step3Desc')}
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
                  {t('section3.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section3.title')}
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section3.description')}
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Card 1 with V4 GapPairBars */}
                <div className="sm:col-span-2 bg-surface rounded-3xl p-6 sm:p-8 border-2 border-border/80 shadow-sm space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-foreground uppercase tracking-tight">
                    {t('section3.card1Title')}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t('section3.card1Desc')}
                    <Link href="/height-difference-calculator" className="text-accent underline font-bold">
                      {t('section3.card1Link')}
                    </Link>.
                  </p>
                  {/* V4 Visual Component */}
                  <GapPairBars />
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    {t('section3.card2Title')}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t('section3.card2Desc')}
                  </p>
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    {t('section3.card3Title')}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t('section3.card3Desc')}
                  </p>
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    {t('section3.card4Title')}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t('section3.card4Desc')}
                  </p>
                </div>

                <div className="bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    {t('section3.card5Title')}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t('section3.card5Desc')}
                  </p>
                </div>

                <div className="sm:col-span-2 bg-surface rounded-3xl p-6 sm:p-7 border-2 border-border/80 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-foreground uppercase tracking-tight">
                    {t('section3.card6Title')}
                  </h3>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t('section3.card6Desc')}
                  </p>
                </div>
              </div>
            </section>

            {/* --- SECTION 4: Comparing Heights — Examples and Use Cases --- */}
            <section id="comparing-heights-examples-and-use-cases" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  {t('section4.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section4.title')}
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section4.description')}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {useCases.map((item, i) => (
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
                  {t('section4.tableTitle')}
                </h3>
                <p className="text-sm text-muted font-medium leading-relaxed mb-4">
                  {t('section4.tableDesc')}
                </p>
                <HeightGapTable />
              </div>
            </section>

            {/* --- SECTION 5: Why Choose Our Height Comparison Tool? --- */}
            <section id="height-generator-comparison-all-features-all-free" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  {t('section5.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section5.title')}
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section5.description')}
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((item, i) => (
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
                  {t('section6.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section6.title')}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accuracyItems.map((item, i) => (
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
                  {t('section7.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section7.title')}
              </h2>

              <p className="text-base text-muted leading-relaxed font-medium">
                {t('section7.description')}
              </p>

              <div className="overflow-x-auto rounded-[2rem] border-2 border-border/80 bg-surface shadow-sm custom-scrollbar">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border">
                      <th className="p-4 sm:p-6 text-xs font-black text-foreground uppercase tracking-widest">{t('section7.thFeature')}</th>
                      <th className="p-4 sm:p-6 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{t('section7.thFree')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {checklistRows.map((row, i) => (
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
            {(() => {
              const rawItems = (t.raw('section8.items') as Array<{ q: string; a: string }>) || [];
              const mappedItems = rawItems.map((item, idx) => {
                let extraNode: React.ReactNode = null;
                if (idx === 5) {
                  extraNode = <AgeBenchmarkBars />;
                } else if (idx === 6) {
                  extraNode = <TwoInchGap />;
                } else if (idx === 8) {
                  extraNode = <ConversionFlow />;
                }

                if (!extraNode) {
                  return { q: item.q, a: item.a };
                }

                return {
                  q: item.q,
                  a: (
                    <div className="space-y-3">
                      <p>{item.a}</p>
                      {extraNode}
                    </div>
                  )
                };
              });

              return (
                <FaqAccordion
                  items={mappedItems}
                  title={t('section8.title')}
                  description={t('section8.description')}
                  badge={t('section8.badge')}
                  footerText={t('section8.sources')}
                />
              );
            })()}

            {/* --- SECTION 9: Compare Heights Online — Tools and Articles --- */}
            <section id="compare-heights-online-tools-and-articles" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap bg-accent/5 px-4 py-2 rounded-full border border-accent/20">
                  {t('section9.eyebrow')}
                </div>
                <div className="flex-1 h-1 bg-accent/10 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
                {t('section9.title')}
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 my-6">
                {cards.map((item, i) => (
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
                      <span>{t('section9.launchTool')}</span>
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Data Privacy & Compliance Notice */}
              <div className="bg-surface rounded-3xl p-6 sm:p-8 border-2 border-border mt-8 shadow-inner">
                <p className="text-foreground block text-sm font-black uppercase tracking-wider mb-2">
                  {t('section9.privacyTitle')}
                </p>
                <p className="text-xs sm:text-sm text-muted font-medium leading-relaxed">
                  {t('section9.privacyText')}
                  <Link href="/privacy" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                    {t('section9.privacyLink')}
                  </Link>
                  {t('section9.privacyTextEnd')}
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
