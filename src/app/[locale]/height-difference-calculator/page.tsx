import React from 'react';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import CalculateHeightDifference from '@/components/height-difference-calculator/CalculateHeightDifference';
import CoupleHeightDifferenceCalculator from '@/components/height-difference-calculator/CoupleHeightDifferenceCalculator';
import HeightDifferenceChart from '@/components/height-difference-calculator/HeightDifferenceChart';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/common/JsonLd';
import { HEIGHT_DIFFERENCE_SCHEMA } from '@/constants/schemas/heightDifference';
import { getAlternateLanguages, getCanonicalUrl, getSocialMetadata } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('heightDifferenceTitle'),
        description: t('heightDifferenceDescription'),
        alternates: {
            canonical: getCanonicalUrl('/height-difference-calculator', locale),
            languages: getAlternateLanguages('/height-difference-calculator'),
        },
        ...getSocialMetadata({
            title: t('heightDifferenceTitle'),
            description: t('heightDifferenceDescription'),
            path: '/height-difference-calculator',
            locale,
        }),
    };
}

export default async function HeightDifferencePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'heightDifference' });

    const toc = t.raw('toc') as Array<{ id: string; label: string }>;
    const faq = t.raw('faq') as Array<{ q: string; a: string }>;

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative pt-8 overflow-x-clip transform-gpu">
            <JsonLd data={HEIGHT_DIFFERENCE_SCHEMA} />

            {/* --- Sidebar TOC --- */}
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={toc} />
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* H1 Intro */}
                    <div className="space-y-4 text-left">
                        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                            {t('intro.title')}
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl">
                            {t('intro.description')}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="#calculate-height-difference"
                                className="inline-flex items-center gap-2 bg-accent text-white dark:text-zinc-950 font-black text-sm uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:opacity-95 hover:translate-y-[-1px] active:scale-95 transition-all"
                            >
                                {t('intro.heroCtaButton')} <span aria-hidden="true">↓</span>
                            </a>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-muted uppercase tracking-wider">
                                <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('intro.heroBadgeFree')}</span>
                                <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('intro.heroBadgeNoSignup')}</span>
                                <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('intro.heroBadgeUnits')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Calculate Height Difference */}
                    <section id="calculate-height-difference" className="scroll-mt-24 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground scroll-mt-24">
                            {t('calculateSection.title')}
                        </h2>
                        <p className="text-muted leading-relaxed">
                            {t('calculateSection.description')}
                        </p>

                        <CalculateHeightDifference />
                    </section>

                    {/* Section 2: How to Calculate Height Difference */}
                    <section id="how-to-calculate-height-difference" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                            {t('howToCalculate.title')}
                        </h2>
                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p1')}
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6 space-y-4 shadow-sm">
                            <h3 className="font-extrabold text-foreground text-xs uppercase tracking-widest text-muted">
                                {t('howToCalculate.formulaTitle')}
                            </h3>
                            <div className="font-mono bg-accent/5 border border-accent/20 p-4 rounded-xl text-accent font-black text-sm sm:text-base overflow-x-auto">
                                {t('howToCalculate.formulaText')}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                <div className="bg-bg border border-border p-4 rounded-xl">
                                    <span className="block text-muted font-bold uppercase tracking-wider text-[10px] mb-1">
                                        {t('howToCalculate.personALabel')}
                                    </span>
                                    <span className="font-black text-foreground text-lg font-mono">
                                        {t('howToCalculate.personAValue')}
                                    </span>
                                </div>
                                <div className="bg-bg border border-border p-4 rounded-xl">
                                    <span className="block text-muted font-bold uppercase tracking-wider text-[10px] mb-1">
                                        {t('howToCalculate.personBLabel')}
                                    </span>
                                    <span className="font-black text-foreground text-lg font-mono">
                                        {t('howToCalculate.personBValue')}
                                    </span>
                                </div>
                                <div className="bg-accent/10 border border-accent/25 p-4 rounded-xl">
                                    <span className="block text-accent font-bold uppercase tracking-wider text-[10px] mb-1">
                                        {t('howToCalculate.differenceLabel')}
                                    </span>
                                    <span className="font-black text-accent text-lg font-mono">
                                        {t('howToCalculate.differenceValue')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p2')}
                        </p>
                    </section>

                    {/* Section 3: Height Difference Percentage */}
                    <section id="height-difference-percentage" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                            {t('percentage.title')}
                        </h2>
                        <p className="text-muted leading-relaxed">
                            {t('percentage.p1')}
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6 space-y-4 shadow-sm">
                            <h3 className="font-extrabold text-foreground text-xs uppercase tracking-widest text-muted">
                                {t('percentage.formulaTitle')}
                            </h3>
                            <div className="font-mono bg-accent/5 border border-accent/20 p-4 rounded-xl text-accent font-black text-sm sm:text-base overflow-x-auto">
                                {t('percentage.formulaText')}
                            </div>

                            <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden text-sm bg-bg">
                                <li className="flex justify-between items-center p-3.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">{t('percentage.heightDiffLabel')}</span>
                                    <span className="font-bold text-foreground font-mono">{t('percentage.heightDiffValue')}</span>
                                </li>
                                <li className="flex justify-between items-center p-3.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">{t('percentage.tallerHeightLabel')}</span>
                                    <span className="font-bold text-foreground font-mono">{t('percentage.tallerHeightValue')}</span>
                                </li>
                                <li className="flex justify-between items-center p-3.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">{t('percentage.calculationLabel')}</span>
                                    <span className="font-bold text-foreground font-mono">{t('percentage.calculationValue')}</span>
                                </li>
                                <li className="flex justify-between items-center p-3.5 bg-accent/10 border-t border-accent/20">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-accent">{t('percentage.percentDiffLabel')}</span>
                                    <span className="font-black text-accent text-lg font-mono">{t('percentage.percentDiffValue')}</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-muted leading-relaxed">
                            {t('percentage.p2')}
                        </p>

                        <p className="text-muted leading-relaxed">
                            {t('percentage.p3')}
                        </p>

                        {/* Duo Cards: Shorter vs Taller */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                            <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm space-y-1 hover:border-accent/30 transition-colors">
                                <div className="text-[11px] font-black uppercase tracking-wider text-accent">
                                    {t('percentage.duoShorterLabel')}
                                </div>
                                <div className="text-3xl font-black text-foreground font-mono">
                                    {t('percentage.duoShorterValue')}
                                </div>
                                <div className="text-xs font-mono text-muted">
                                    {t('percentage.duoShorterEq')}
                                </div>
                            </div>

                            <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm space-y-1 hover:border-accent/30 transition-colors">
                                <div className="text-[11px] font-black uppercase tracking-wider text-accent-secondary">
                                    {t('percentage.duoTallerLabel')}
                                </div>
                                <div className="text-3xl font-black text-foreground font-mono">
                                    {t('percentage.duoTallerValue')}
                                </div>
                                <div className="text-xs font-mono text-muted">
                                    {t('percentage.duoTallerEq')}
                                </div>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed">
                            {t('percentage.p4')}
                        </p>
                    </section>

                    {/* Section 4: Couple Height Difference Calculator */}
                    <section id="couple-height-difference-calculator" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                            {t('couple.title')}
                        </h2>
                        <p className="text-muted leading-relaxed">
                            {t('couple.p1')}
                        </p>

                        <p className="text-muted leading-relaxed">
                            {t('couple.p2')}
                        </p>

                        <CoupleHeightDifferenceCalculator />

                        <p className="text-muted leading-relaxed mt-4">
                            {t('couple.p3')}
                        </p>
                    </section>

                    {/* Section 5: Height Difference Chart */}
                    <section id="height-difference-chart" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                            {t('chartSection.title')}
                        </h2>
                        <p className="text-muted leading-relaxed">
                            {t('chartSection.p1')}
                        </p>

                        <HeightDifferenceChart />

                        <p className="text-muted leading-relaxed mt-4">
                            {t('chartSection.p2')}
                        </p>

                        <div className="border border-border border-l-4 border-l-accent bg-accent/5 rounded-r-2xl p-5 text-sm text-foreground font-medium">
                            {t('chartSection.calloutPrefix')}
                            <Link href="/" className="text-accent font-bold hover:underline">
                                {t('chartSection.calloutLink')}
                            </Link>
                            {t('chartSection.calloutSuffix')}
                        </div>
                    </section>

                    {/* Section 6: Height Difference in Different Units */}
                    <section id="height-difference-in-different-units" className="space-y-6 scroll-mt-24">
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                                {t('unitsSection.title')}
                            </h2>
                            <p className="text-muted leading-relaxed">
                                {t('unitsSection.p1')}
                            </p>
                        </div>

                        {/* Table 1: Feet and Inches */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-foreground">
                                {t('unitsSection.subheadFtIn')}
                            </h3>
                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm font-medium">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table1HeaderPersonA')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table1HeaderPersonB')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table1HeaderDiffIn')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table1HeaderDiffCm')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table1HeaderPercent')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {[
                                            ["5'1\"", "5'2\"", "1 in", "2.5 cm", "1.6%"],
                                            ["5'1\"", "5'7\"", "6 in", "15.2 cm", "9.0%"],
                                            ["5'2\"", "5'10\"", "8 in", "20.3 cm", "11.4%"],
                                            ["5'3\"", "5'10\"", "7 in", "17.8 cm", "10.0%"],
                                            ["5'0\"", "5'10\"", "10 in", "25.4 cm", "14.3%"],
                                            ["5'8\"", "6'0\"", "4 in", "10.2 cm", "5.6%"],
                                            ["5'10\"", "6'2\"", "4 in", "10.2 cm", "5.4%"]
                                        ].map(([p1, p2, din, dcm, pct], i) => (
                                            <tr key={i} className="hover:bg-bg/50 transition-colors">
                                                <td className="px-6 py-3.5 font-bold text-foreground font-mono">{p1}</td>
                                                <td className="px-6 py-3.5 font-bold text-foreground font-mono">{p2}</td>
                                                <td className="px-6 py-3.5 font-black text-foreground font-mono">{din}</td>
                                                <td className="px-6 py-3.5 font-bold text-muted font-mono">{dcm}</td>
                                                <td className="px-6 py-3.5 font-black text-accent font-mono">{pct}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table 2: Centimeters */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-foreground">
                                {t('unitsSection.subheadCm')}
                            </h3>
                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm font-medium">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table2HeaderDiffCm')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table2HeaderInInches')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table2HeaderExamplePair')}</th>
                                            <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.table2HeaderPercent')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {[
                                            ["5 cm", "2.0 in", "160 cm and 165 cm", "3.0%"],
                                            ["10 cm", "3.9 in", "170 cm and 180 cm", "5.6%"],
                                            ["15 cm", "5.9 in", "165 cm and 180 cm", "8.3%"],
                                            ["18 cm", "7.1 in", "165 cm and 183 cm", "9.8%"],
                                            ["20 cm", "7.9 in", "170 cm and 190 cm", "10.5%"]
                                        ].map(([dcm, din, ex, pct], i) => (
                                            <tr key={i} className="hover:bg-bg/50 transition-colors">
                                                <td className="px-6 py-3.5 font-black text-foreground font-mono">{dcm}</td>
                                                <td className="px-6 py-3.5 font-bold text-muted font-mono">{din}</td>
                                                <td className="px-6 py-3.5 font-medium text-foreground">{ex}</td>
                                                <td className="px-6 py-3.5 font-black text-accent font-mono">{pct}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: CTA Box */}
                    <section id="try-the-height-difference-calculator" className="bg-surface border border-border hover:border-accent/30 rounded-3xl p-8 md:p-12 text-center scroll-mt-24 shadow-xl shadow-black/5 transition-colors">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-3">
                            {t('cta.title')}
                        </h2>
                        <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
                            {t('cta.descriptionLine1')} <br />
                            {t('cta.descriptionLine2')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-left max-w-2xl mx-auto mb-10 text-sm font-bold text-foreground">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature1')}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature2')}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature3')}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature4')}</span>
                            </div>
                        </div>

                        <a
                            href="#calculate-height-difference"
                            className="bg-accent text-white dark:text-zinc-950 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                        >
                            <ArrowUpCircle size={18} /> {t('cta.buttonText')}
                        </a>
                    </section>

                    {/* Section 8: Frequently Asked Questions */}
                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={faq} title={toc[7]?.label} description="" />
                    </div>

                    {/* Section 9: References Section */}
                    <div id="references" className="bg-surface border border-border rounded-3xl p-6 md:p-8 text-sm text-muted font-medium scroll-mt-24">
                        <p className="font-extrabold text-foreground mb-4 uppercase tracking-widest text-xs">
                            {t('references.title')}
                        </p>
                        <ul className="space-y-3 list-disc pl-5 marker:text-muted/60">
                            <li>
                                <a href={t('references.ref1Url')} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    {t('references.ref1')}
                                </a>
                            </li>
                            <li>
                                <a href={t('references.ref2Url')} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    {t('references.ref2')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
