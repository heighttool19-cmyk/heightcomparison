import React from 'react';
import { getTranslations } from 'next-intl/server';
import { AlertCircle, ArrowUpCircle, CheckCircle2, Dna, Salad, Timer, ArrowUp, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import TableOfContents from '@/components/TableOfContents';
import { getAlternateLanguages, getCanonicalUrl } from '@/i18n/config';

import FaqAccordion from '@/components/FaqAccordion';
import {
    DynamicHeightCharts,
    DynamicGrowthPlateExplainer,
    DynamicKhamisRocheCalculator as KhamisRocheCalculator,
    DynamicMidParentalCalculator as MidParentalCalculator,
    DynamicHeightConverter as HeightConverter
} from '@/components/height-predictor/DynamicChildHeightIslands';
import JsonLd from '@/components/common/JsonLd';
import { HEIGHT_PREDICTOR_SCHEMA } from '@/constants/schemas/heightPredictor';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('heightPredictorTitle'),
        description: t('heightPredictorDescription'),
        alternates: {
            canonical: getCanonicalUrl('/height-predictor', locale),
            languages: getAlternateLanguages('/height-predictor'),
        }
    };
}

export default async function HeightCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'heightPredictor' });

    const toc = t.raw('toc') as Array<{ id: string; label: string; subItems?: Array<{ id: string; label: string }> }>;
    const faq = t.raw('faq') as Array<{ q: string; a: string }>;

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative overflow-x-clip transform-gpu">
            <JsonLd data={HEIGHT_PREDICTOR_SCHEMA} />
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={toc} />
            </aside>
            <div className="flex-1 min-w-0 order-1 md:order-2 text-foreground font-bold">
                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* INTRO CONTENT */}
                    <div className="space-y-6 text-left sm:text-left mt-4 leading-relaxed p-2">
                        <h1 id="height-predictor-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24 text-left uppercase">
                            {t('intro.title')}
                        </h1>
                        <p className="text-sm text-muted font-medium">
                            {t('intro.lastUpdated')}
                        </p>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left font-medium">
                            {t('intro.description')}
                        </p>
                    </div>

                    {/* SECTION 1: KHAMIS ROCHE */}
                    <KhamisRocheCalculator />

                    {/* SECTION 2: PARENT ONLY */}
                    <MidParentalCalculator />

                    {/* SECTION 3: Height Converter */}
                    <HeightConverter />

                    {/* SEO CONTENT SECTION */}
                    <div className="space-y-12 text-foreground mt-8">
                        <section className="space-y-4">
                            <h2 id="how-it-works" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                {t('howItWorks.title')}
                            </h2>
                            <p className="text-muted leading-relaxed font-medium">
                                {t('howItWorks.description')}
                            </p>


                            <div className="bg-surface border border-border p-6 rounded-2xl my-6 border-l-4 border-l-accent">
                                <ul className="space-y-2 text-muted font-medium">
                                    <li className="flex items-start gap-2">
                                        <span><strong>{t('howItWorks.step1Strong')}</strong> {t('howItWorks.step1Text')}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span><strong>{t('howItWorks.step2Strong')}</strong> {t('howItWorks.step2Text')}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span><strong>{t('howItWorks.step3Strong')}</strong> {t('howItWorks.step3Text')}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section className="space-y-6">
                            <div className="space-y-4">
                                <h2 id="how-tall-will-my-child-be" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                    {t('howTallChild.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('howTallChild.description')}
                                </p>
                            </div>

                            <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] border-l-4 border-l-accent shadow-sm">
                                <h3 className="font-bold text-foreground mb-6 text-sm uppercase tracking-widest text-accent">
                                    {t('howTallChild.factorsTitle')}
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-tight">
                                            <CheckCircle2 className="text-accent w-4 h-4" /> {t('howTallChild.geneticsLabel')}
                                        </div>
                                        <p className="text-sm text-muted font-medium">{t('howTallChild.geneticsText')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-tight">
                                            <CheckCircle2 className="text-accent w-4 h-4" /> {t('howTallChild.currentGrowthLabel')}
                                        </div>
                                        <p className="text-sm text-muted font-medium">{t('howTallChild.currentGrowthText')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-tight">
                                            <CheckCircle2 className="text-accent w-4 h-4" /> {t('howTallChild.statisticsLabel')}
                                        </div>
                                        <p className="text-sm text-muted font-medium">{t('howTallChild.statisticsText')}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed font-medium">
                                {t('howTallChild.closing')}
                            </p>

                            <div className="space-y-6 pt-2">
                                <div id="worked-example" className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] border-l-4 border-l-accent shadow-sm scroll-mt-24 space-y-4">
                                    <h3 className="font-black text-foreground text-lg uppercase tracking-tight">
                                        {t('howTallChild.workedExampleTitle')}
                                    </h3>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        {t('howTallChild.workedExampleIntro')}
                                    </p>
                                    <ul className="space-y-2 text-muted font-medium text-sm list-disc pl-5">
                                        <li>{t('howTallChild.workedExampleSon')}</li>
                                        <li>{t('howTallChild.workedExampleDaughter')}</li>
                                        <li>{t('howTallChild.workedExampleRange')}</li>
                                    </ul>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        {t('howTallChild.workedExampleClosing')}
                                    </p>
                                </div>

                                <div id="age-2-rule" className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] border-l-4 border-l-accent shadow-sm scroll-mt-24 space-y-3">
                                    <h3 className="font-black text-foreground text-lg uppercase tracking-tight">
                                        {t('howTallChild.age2RuleTitle')}
                                    </h3>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        {t('howTallChild.age2RuleText')}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="space-y-8 pt-8">
                            <div className="space-y-4">
                                <h2 id="how-tall-will-i-be-teens-adults" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                    {t('teensAdults.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('teensAdults.description')}
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* TEENS CARD */}
                                <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter flex items-center gap-2">
                                        {t('teensAdults.teensTitle')}
                                    </h3>
                                    <p className="text-muted leading-relaxed font-medium text-sm mb-4">
                                        {t('teensAdults.teensText')}
                                    </p>
                                    <ul className="space-y-3 text-muted font-medium text-sm">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            {t('teensAdults.teensItem1')}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            {t('teensAdults.teensItem2')}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            {t('teensAdults.teensItem3')}
                                        </li>
                                    </ul>
                                </div>

                                {/* ADULTS CARD */}
                                <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter flex items-center gap-2">
                                        {t('teensAdults.adultsTitle')}
                                    </h3>
                                    <p className="text-muted leading-relaxed font-medium text-sm mb-4">
                                        {t('teensAdults.adultsText')}
                                    </p>
                                    <ul className="space-y-3 text-muted font-medium text-sm">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            {t('teensAdults.adultsItem1')}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            {t('teensAdults.adultsItem2')}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            {t('teensAdults.adultsItem3')}
                                        </li>
                                    </ul>
                                </div>

                                {/* NO PARENTS HEIGHT CARD */}
                                <div id="no-parents-height" className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] border-l-4 border-l-accent shadow-sm scroll-mt-24 space-y-3 md:col-span-2">
                                    <h3 className="text-xl font-black text-foreground uppercase tracking-tight">
                                        {t('teensAdults.noParentsTitle')}
                                    </h3>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        {t('teensAdults.noParentsP1')}
                                    </p>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        {t('teensAdults.noParentsCheckPercentile')}{' '}
                                        <Link href="/height-weight-percentile-calculator" className="text-accent font-black hover:underline">
                                            {t('teensAdults.noParentsLinkText')}
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>

                            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
                                <p className="text-sm font-bold text-foreground leading-relaxed">
                                    <span className="text-red-500 uppercase tracking-widest mr-2">{t('teensAdults.limitationLabel')}</span>
                                    {t('teensAdults.limitationText')}
                                </p>
                            </div>
                        </section>
                        <div className="bg-surface border border-accent/20 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 my-8 shadow-sm">
                            <p className="text-foreground font-medium text-sm md:text-base m-0 text-center sm:text-left leading-relaxed">
                                {t('ctaBanner.text')}
                            </p>

                            <Link
                                href="#calculator"
                                className="shrink-0 bg-accent text-white hover:opacity-90 transition-opacity rounded-xl px-6 py-2.5 text-sm font-bold flex items-center gap-2 no-underline shadow-sm active:scale-95"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m18 15-6-6-6 6" />
                                </svg>
                                {t('ctaBanner.linkText')}
                            </Link>
                        </div>
                        <section className="space-y-4">
                            <h2 id="what-determines-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                {t('determinants.title')}
                            </h2>
                            <p className="text-muted leading-relaxed font-medium">
                                {t('determinants.description')}
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                {/* GENETICS CARD */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all border-l-4 border-l-accent">
                                    <h3 className="font-black text-foreground text-lg mb-3 uppercase tracking-tight flex items-center gap-2">
                                        <Dna className="text-accent w-5 h-5" /> {t('determinants.geneticsTitle')}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed font-medium">
                                        {t('determinants.geneticsBefore')}<strong>{t('determinants.geneticsStrong1')}</strong>{t('determinants.geneticsMiddle')}<strong>{t('determinants.geneticsStrong2')}</strong>{t('determinants.geneticsAfter')}
                                    </p>
                                </div>

                                {/* NUTRITION & SLEEP CARD */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all border-l-4 border-l-green-500">
                                    <h3 className="font-black text-foreground text-lg mb-3 uppercase tracking-tight flex items-center gap-2">
                                        <Salad className="text-green-500 w-5 h-5" /> {t('determinants.nutritionTitle')}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed font-medium mb-3">
                                        {t('determinants.nutritionBefore')}<strong>{t('determinants.nutritionStrong')}</strong>{t('determinants.nutritionAfter')}
                                    </p>
                                    <ul className="text-xs text-muted space-y-2 font-bold uppercase tracking-wider">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {t('determinants.nutritionItem1')}</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {t('determinants.nutritionItem2')}</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {t('determinants.nutritionItem3')}</li>
                                    </ul>
                                </div>

                                {/* GROWTH TIMING CARD */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all border-l-4 border-l-amber-500">
                                    <h3 className="font-black text-foreground text-lg mb-3 uppercase tracking-tight flex items-center gap-2">
                                        <Timer className="text-amber-500 w-5 h-5" /> {t('determinants.timingTitle')}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed font-medium">
                                        {t('determinants.timingText')}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="space-y-4">
                            <h2 id="boys-girls-growth-charts" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                {t('growthCharts.title')}
                            </h2>
                            <p className="text-muted leading-relaxed font-medium">
                                <a
                                    href="https://www.cdc.gov/growthcharts/cdc-growth-charts.htm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-black hover:underline px-1"
                                >
                                    {t('growthCharts.linkText')}
                                </a>
                                {t('growthCharts.textAfterLink')}
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-2xl my-6 border-l-4 border-l-accent shadow-sm">
                                <div className="space-y-4">
                                    <p className="text-muted leading-relaxed font-medium">
                                        {t('growthCharts.percentileBefore')}<strong>{t('growthCharts.percentileStrong')}</strong>{t('growthCharts.percentileAfter')}
                                    </p>
                                    <p className="text-muted leading-relaxed font-medium">
                                        {t('growthCharts.expandText')}
                                    </p>
                                    <div className="flex items-start gap-3 bg-accent/5 p-4 rounded-xl border border-accent/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <p className="text-sm font-bold text-foreground leading-relaxed italic">
                                            {t('growthCharts.note')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="space-y-6 pt-8">

                            <div className="scroll-mt-24 bg-surface border border-border rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: '600px' }}>
                                <DynamicHeightCharts />
                            </div>
                        </section>
                        <section className="space-y-6 pt-8">
                            <div className="space-y-4">
                                <h2 id="calculator-vs-growth-charts" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                    {t('comparisonTable.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('comparisonTable.description')}
                                </p>
                            </div>

                            <div className="overflow-x-auto rounded-[2rem] border border-border bg-surface shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-accent/5 border-b border-border">
                                            <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-foreground">{t('comparisonTable.headerFactor')}</th>
                                            <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-accent">{t('comparisonTable.headerCalculator')}</th>
                                            <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-foreground">{t('comparisonTable.headerGrowthChart')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">{t('comparisonTable.rowPurposeLabel')}</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">{t('comparisonTable.rowPurposeCalculator')}</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">{t('comparisonTable.rowPurposeGrowthChart')}</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">{t('comparisonTable.rowDataLabel')}</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">{t('comparisonTable.rowDataCalculator')}</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">{t('comparisonTable.rowDataGrowthChart')}</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">{t('comparisonTable.rowBestForLabel')}</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">{t('comparisonTable.rowBestForCalculator')}</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">{t('comparisonTable.rowBestForGrowthChart')}</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">{t('comparisonTable.rowDoctorLabel')}</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">{t('comparisonTable.rowDoctorCalculator')}</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">{t('comparisonTable.rowDoctorGrowthChart')}</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">{t('comparisonTable.rowAccuracyLabel')}</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">{t('comparisonTable.rowAccuracyCalculator')}</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">{t('comparisonTable.rowAccuracyGrowthChart')}</td>
                                        </tr>
                                        <tr className="hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">{t('comparisonTable.rowWithoutParentsLabel')}</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">{t('comparisonTable.rowWithoutParentsCalculator')}</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">{t('comparisonTable.rowWithoutParentsGrowthChart')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>


                        <div className="grid md:grid-cols-1 gap-8">
                            {/* BOYS GROWTH SECTION */}
                            <section className="space-y-4 bg-blue-500/5 p-6 md:p-8 rounded-[2.5rem] border border-blue-500/10 shadow-sm" id="when-do-boys-stop-growing">
                                <h2 className="text-2xl font-black tracking-tight text-blue-500 uppercase scroll-mt-24">{t('boysGrowth.title')}</h2>

                                <p className="text-muted leading-relaxed font-medium">{t('boysGrowth.p1Before')}<strong>{t('boysGrowth.p1Strong')}</strong>{t('boysGrowth.p1After')}</p>

                                <p className="text-muted leading-relaxed font-medium">{t('boysGrowth.p2')}</p>

                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-blue-500 font-bold uppercase tracking-wide text-xs">
                                    <li>{t('boysGrowth.item1Before')}<strong>{t('boysGrowth.item1Strong')}</strong></li>
                                    <li>{t('boysGrowth.item2Before')}<strong>{t('boysGrowth.item2Strong')}</strong></li>
                                    <li>{t('boysGrowth.item3Before')}<strong>{t('boysGrowth.item3Strong')}</strong></li>
                                </ul>

                                <p className="text-muted leading-relaxed font-medium text-sm">{t('boysGrowth.p3Before')}<strong>{t('boysGrowth.p3Strong')}</strong>{t('boysGrowth.p3After')}</p>
                            </section>


                            {/* GIRLS GROWTH SECTION */}
                            <section className="space-y-4 bg-pink-500/5 p-6 md:p-8 rounded-[2.5rem] border border-pink-500/10 shadow-sm" id="when-do-girls-stop-growing">
                                <h2 className="text-2xl font-black tracking-tight text-pink-500 uppercase scroll-mt-24">{t('girlsGrowth.title')}</h2>

                                <p className="text-muted leading-relaxed font-medium">{t('girlsGrowth.p1')}</p>

                                <p className="text-muted leading-relaxed font-medium">{t('girlsGrowth.p2')}</p>

                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-pink-500 font-bold uppercase tracking-wide text-xs">
                                    <li>{t('girlsGrowth.item1Before')}<strong>{t('girlsGrowth.item1Strong')}</strong></li>
                                    <li>{t('girlsGrowth.item2Before')}<strong>{t('girlsGrowth.item2Strong')}</strong></li>
                                </ul>

                                <p className="text-muted leading-relaxed font-medium text-sm">{t('girlsGrowth.p3Before')}<strong>{t('girlsGrowth.p3Strong')}</strong>{t('girlsGrowth.p3After')}</p>
                            </section>

                        </div>



                        <section className="space-y-6 pt-8">
                            <h2 id="height-prediction-methods" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">{t('methods.title')}</h2>
                            <p className="text-muted leading-relaxed mb-6 font-medium">
                                {t('methods.description')}
                            </p>

                            <div className="space-y-8">
                                {/* KHAMIS-ROCHE METHOD */}
                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                            {t('methods.khamisRoche.badge')}
                                        </span>
                                        <h3 id="khamis-roche-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                            {t('methods.khamisRoche.title')}
                                        </h3>
                                    </div>

                                    <p className="text-muted leading-relaxed  font-medium">
                                        {t('methods.khamisRoche.p1')}
                                    </p>
                                    <p className="text-muted leading-relaxed mb-6 font-medium">{t('methods.khamisRoche.p2')}</p>
                                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                        <ul className="text-foreground text-base space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-0.5" />
                                                <span>{t('methods.khamisRoche.item1Before')}<strong>{t('methods.khamisRoche.item1Strong')}</strong></span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-0.5" />
                                                <span>{t('methods.khamisRoche.item2')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-0.5" />
                                                <span>{t('methods.khamisRoche.item3')}</span>
                                            </li>
                                        </ul>

                                        <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-800 mt-4">
                                            {t('methods.khamisRoche.usedByCalculator')}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-foreground uppercase tracking-widest opacity-70">
                                            {t('methods.khamisRoche.readyText')}
                                        </p>
                                        <Link
                                            href="#top"
                                            className="bg-accent text-white px-4 py-4  rounded-2xl  font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                                        >
                                            <ArrowUpCircle size={35} /> {t('methods.khamisRoche.linkText')}
                                        </Link>
                                    </div>
                                </div>

                                {/* MID-PARENTAL HEIGHT */}
                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                    {/* BADGE AND HEADING CONTAINER */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                            {t('methods.midParental.badge')}
                                        </span>
                                        <h3 id="based-on-parents" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                            {t('methods.midParental.title')}
                                        </h3>
                                    </div>

                                    <p className="text-muted leading-relaxed mb-4 font-medium">
                                        {t('methods.midParental.p1')}
                                    </p>
                                    <p className="text-muted leading-relaxed mb-6 font-medium">
                                        {t('methods.midParental.formulaExplanation')}
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-bg border border-border p-4 rounded-2xl border-l-4 border-l-blue-500 space-y-1.5">
                                            <span className="font-black text-foreground block text-xs uppercase tracking-widest text-blue-500">{t('methods.midParental.boysFormulaLabel')}</span>
                                            <code className="text-foreground text-sm font-black tracking-tight bg-blue-500/10 px-2 py-1 rounded-lg block w-fit">{t('methods.midParental.boysFormula')}</code>
                                            <p className="text-xs text-muted font-medium">{t('methods.midParental.boysFormulaSub')}</p>
                                        </div>
                                        <div className="bg-bg border border-border p-4 rounded-2xl border-l-4 border-l-pink-500 space-y-1.5">
                                            <span className="font-black text-foreground block text-xs uppercase tracking-widest text-pink-500">{t('methods.midParental.girlsFormulaLabel')}</span>
                                            <code className="text-foreground text-sm font-black tracking-tight bg-pink-500/10 px-2 py-1 rounded-lg block w-fit">{t('methods.midParental.girlsFormula')}</code>
                                            <p className="text-xs text-muted font-medium">{t('methods.midParental.girlsFormulaSub')}</p>
                                        </div>
                                        <div className="bg-bg border border-border p-4 rounded-2xl border-l-4 border-l-blue-500 space-y-1.5">
                                            <span className="font-black text-foreground block text-xs uppercase tracking-widest text-blue-500">{t('methods.midParental.boysFormulaMetricLabel')}</span>
                                            <code className="text-foreground text-sm font-black tracking-tight bg-blue-500/10 px-2 py-1 rounded-lg block w-fit">{t('methods.midParental.boysFormulaMetric')}</code>
                                            <p className="text-xs text-muted font-medium">{t('methods.midParental.boysFormulaMetricSub')}</p>
                                        </div>
                                        <div className="bg-bg border border-border p-4 rounded-2xl border-l-4 border-l-pink-500 space-y-1.5">
                                            <span className="font-black text-foreground block text-xs uppercase tracking-widest text-pink-500">{t('methods.midParental.girlsFormulaMetricLabel')}</span>
                                            <code className="text-foreground text-sm font-black tracking-tight bg-pink-500/10 px-2 py-1 rounded-lg block w-fit">{t('methods.midParental.girlsFormulaMetric')}</code>
                                            <p className="text-xs text-muted font-medium">{t('methods.midParental.girlsFormulaMetricSub')}</p>
                                        </div>
                                    </div>

                                    <div className="bg-accent/5 border border-accent/20 p-5 rounded-2xl mb-6 space-y-2">
                                        <p className="text-sm text-foreground font-medium leading-relaxed">{t('methods.midParental.exampleText')}</p>
                                        <p className="text-sm font-black text-accent">{t('methods.midParental.exampleEstimateText')}</p>
                                        <p className="text-sm font-bold text-accent pt-1">
                                            <Link href="#worked-example" className="hover:underline">
                                                {t('methods.midParental.workedExamplePointer')}
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="p-4 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                        <ul className="text-foreground text-base space-y-3 font-black uppercase tracking-tight">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>{t('methods.midParental.item1')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>{t('methods.midParental.item2')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>{t('methods.midParental.item3')}</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>{t('methods.midParental.item4')}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-foreground uppercase tracking-widest opacity-70">
                                            {t('methods.midParental.onlyHaveText')}
                                        </p>
                                        <Link
                                            href="#top"
                                            className="bg-accent text-white px-4 py-4   text-md  rounded-2xl font-black uppercase tracking-widest  hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                                        >
                                            <ArrowUpCircle size={35} /> {t('methods.midParental.linkText')}
                                        </Link>
                                    </div>
                                </div>

                                {/* AGE-2 DOUBLING RULE */}
                                <div id="age-2-doubling-rule" className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                        <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                            {t('methods.age2Rule.badge')}
                                        </span>
                                        <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                            {t('methods.age2Rule.title')}
                                        </h3>
                                    </div>

                                    <p className="text-muted leading-relaxed font-medium">
                                        {t('methods.age2Rule.text')}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* BONE AGE METHOD */}
                        <section className="space-y-6 pt-2">
                            <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                {/* BADGE AND HEADING CONTAINER */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                        {t('methods.boneAge.badge')}
                                    </span>
                                    <h3 id="bone-age-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                        {t('methods.boneAge.title')}
                                    </h3>
                                </div>

                                <p className="text-muted leading-relaxed mb-6 font-medium">
                                    {t('methods.boneAge.p1')}
                                </p>

                                <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                    <ul className="text-foreground text-base space-y-3 font-black uppercase tracking-tight">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                            <span>{t('methods.boneAge.item1')}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                            <span>{t('methods.boneAge.item2')}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                            <span>{t('methods.boneAge.item3')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* SUPPLEMENTARY CLINICAL METHODS */}
                        {/* BAYLEY-PINNEAU METHOD */}
                        <section className="space-y-6 pt-2">
                            <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                {/* BADGE AND HEADING CONTAINER */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                        {t('methods.bayleyPinneau.badge')}
                                    </span>
                                    <h3 id="bayley-pinneau-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                        {t('methods.bayleyPinneau.title')}
                                    </h3>
                                </div>

                                <p className="text-muted leading-relaxed font-medium">
                                    {t('methods.bayleyPinneau.text')}
                                </p>
                            </div>
                        </section>

                        {/* ROCHE-WAINER-THISSEN METHOD */}
                        <section className="space-y-6 pt-2">
                            <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                {/* BADGE AND HEADING CONTAINER */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                        {t('methods.rocheWainerThissen.badge')}
                                    </span>
                                    <h3 id="roche-wainer-thissen-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                        {t('methods.rocheWainerThissen.title')}
                                    </h3>
                                </div>

                                <p className="text-muted leading-relaxed font-medium">
                                    {t('methods.rocheWainerThissen.text')}
                                </p>
                            </div>
                        </section>
                        <section id="can-you-increase-height" className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24 uppercase">
                                {t('canIncrease.title')}
                            </h2>
                            <p className="text-muted leading-relaxed font-medium text-[14px]">
                                {t('canIncrease.description')}
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-4">
                                {/* Nutrition */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h3 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent flex items-center gap-2">
                                        <span className="text-lg"></span> {t('canIncrease.nutritionTitle')}
                                    </h3>
                                    <p className="text-sm text-muted font-medium leading-relaxed mb-2">
                                        {t('canIncrease.nutritionText')}
                                    </p>
                                    <ul className="text-sm text-muted font-medium space-y-1 list-disc pl-5">
                                        <li>{t('canIncrease.nutritionItem1')}</li>
                                        <li>{t('canIncrease.nutritionItem2')}</li>
                                        <li>{t('canIncrease.nutritionItem3')}</li>
                                        <li>{t('canIncrease.nutritionItem4')}</li>
                                    </ul>
                                </div>

                                {/* Sleep */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h3 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent flex items-center gap-2">
                                        <span className="text-lg"></span> {t('canIncrease.sleepTitle')}
                                    </h3>
                                    <p className="text-sm text-muted font-medium leading-relaxed mb-2">
                                        {t('canIncrease.sleepText')}
                                    </p>
                                    <ul className="text-sm text-muted font-medium space-y-1 list-disc pl-5">
                                        <li>{t('canIncrease.sleepItem1')}</li>
                                        <li>{t('canIncrease.sleepItem2')}</li>
                                    </ul>
                                </div>

                                {/* Exercise */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h3 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent flex items-center gap-2">
                                        <span className="text-lg"></span> {t('canIncrease.exerciseTitle')}
                                    </h3>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        {t('canIncrease.exerciseText')}
                                    </p>
                                </div>
                            </div>

                            {/* Warning Box */}
                            <div className="bg-[#fffbeb] border border-[#fde68a] border-l-4 border-l-[#f59e0b] rounded-r-2xl p-6 mt-6">
                                <p className="text-sm text-[#78350f] font-medium leading-relaxed">
                                    <strong>{t('canIncrease.warningStrong')}</strong> {t('canIncrease.warningText')}
                                </p>
                            </div>
                        </section>


                        <section className="space-y-6 pt-4" id="accuracy">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                {t('accuracy.title')}
                            </h2>

                            <p className="text-muted leading-relaxed font-medium">
                                {t('accuracy.description')}
                            </p>

                            <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] border-l-4 border-l-accent shadow-sm space-y-4">
                                <ul className="space-y-3 text-muted font-medium">
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item1')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item2')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item3')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item4')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item5')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item6')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item7')}</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="shrink-0 text-accent w-5 h-5 mt-0.5" /> {t('accuracy.item8')}</li>
                                </ul>
                            </div>

                            <p className="text-muted leading-relaxed font-medium">
                                {t('accuracy.closing')}
                            </p>

                            <div className="text-xs text-muted leading-relaxed font-medium bg-muted/20 p-4 rounded-xl border border-border mt-6">
                                <strong>{t('accuracy.disclaimerStrong')}</strong> {t('accuracy.disclaimerText')}
                            </div>
                        </section>
                    </div>

                    {/* FAQ Accordion Section */}
                    <section id="faq" className="scroll-mt-24 space-y-6">
                        <FaqAccordion
                            items={faq}
                            description=""
                        />
                    </section>
                    {/* Related Tools Section */}
                    <section id="related-tools" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-foreground">
                            {t('relatedTools.title')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Height Comparison Tool */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">{t('relatedTools.heightComparisonTitle')}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {t('relatedTools.heightComparisonText')}
                                </p>
                                <Link href="/" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    {t('relatedTools.heightComparisonLink')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Image to Height Tool */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">{t('relatedTools.imageToHeightTitle')}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {t('relatedTools.imageToHeightText')}
                                </p>
                                <Link href="/image-to-height" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    {t('relatedTools.imageToHeightLink')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            {/* Height & Weight Percentile */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">{t('relatedTools.percentileTitle')}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {t('relatedTools.percentileText')}
                                </p>
                                <Link href="/height-weight-percentile-calculator" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    {t('relatedTools.percentileLink')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Average Height by Country */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">{t('relatedTools.countryTitle')}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {t('relatedTools.countryText')}
                                </p>
                                <Link href="/average-height-by-country" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    {t('relatedTools.countryLink')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Ideal Body Weight Calculator */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">{t('relatedTools.ibwTitle')}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {t('relatedTools.ibwText')}
                                </p>
                                <Link href="/ideal-body-weight-calculator" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    {t('relatedTools.ibwLink')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Height Difference Calculator */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">{t('relatedTools.differenceTitle')}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {t('relatedTools.differenceText')}
                                </p>
                                <Link href="/height-difference-calculator" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    {t('relatedTools.differenceLink')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* References Section */}
                    <div id="references" className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 text-sm text-muted mt-6 font-medium shadow-sm scroll-mt-24">
                        <h3 className="font-extrabold text-foreground mb-6 uppercase tracking-[0.2em] text-[10px] opacity-60">{t('references.title')}</h3>
                        <ul className="space-y-4 break-words overflow-hidden list-disc pl-5 marker:text-accent/40">
                            <li>{t('references.ref1')} <br /><a href="https://www.cdc.gov/growthcharts" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.cdc.gov/growthcharts</a></li>
                            <li>{t('references.ref2')} </li>
                            <li>{t('references.ref3')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/12664962/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://pubmed.ncbi.nlm.nih.gov/12664962/</a></li>
                            <li>{t('references.ref4')} <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                            <li>{t('references.ref5')} <br /><a href="https://www.sleepfoundation.org/children-and-sleep" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.sleepfoundation.org/children-and-sleep</a></li>
                            <li>{t('references.ref6')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/7936860/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://pubmed.ncbi.nlm.nih.gov/7936860/</a></li>
                            <li>{t('references.ref7')}</li>
                            <li>{t('references.ref8')}</li>
                            <li>{t('references.ref9')}</li>
                            <li>{t('references.ref10')}</li>
                            <li>{t('references.ref11')}</li>
                            <li>{t('references.ref12')} <br /><a href="https://www.mayoclinic.org/healthy-lifestyle/childrens-health/expert-answers/child-growth/faq-20057990" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">mayoclinic.org</a></li>
                            <li>{t('references.ref13')} <br /><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6603099/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">pmc.ncbi.nlm.nih.gov</a></li>
                            <li>{t('references.ref14')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/7936860/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">pubmed.ncbi.nlm.nih.gov/7936860</a></li>
                            <li>{t('references.ref15')} <br /><a href="https://www.cdc.gov/nchs/fastats/body-measurements.htm" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">cdc.gov</a></li>
                            <li>{t('references.ref16')} <br /><a href="https://jcsm.aasm.org/doi/10.5664/jcsm.5866" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">jcsm.aasm.org</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}
