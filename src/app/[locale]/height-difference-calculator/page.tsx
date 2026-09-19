import React from 'react';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import CalculateHeightDifference from '@/components/height-difference-calculator/CalculateHeightDifference';
import CoupleHeightDifferenceCalculator from '@/components/height-difference-calculator/CoupleHeightDifferenceCalculator';
import HeightDifferenceChart from '@/components/height-difference-calculator/HeightDifferenceChart';
import VisualHeightComparison from '@/components/height-difference-calculator/VisualHeightComparison';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/common/JsonLd';
import { HEIGHT_DIFFERENCE_SCHEMA } from '@/constants/schemas/heightDifference';

import { getAlternateLanguages, getCanonicalUrl } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('heightDifferenceTitle'),
        description: t('heightDifferenceDescription'),
        alternates: {
            canonical: getCanonicalUrl('/height-difference-calculator', locale),
            languages: getAlternateLanguages('/height-difference-calculator'),
        }
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
                    <div className="space-y-6 text-left sm:text-left ">
                        <h1 id="height-difference-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24 text-left">
                            {t('intro.title')}
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                            {t('intro.description')}
                        </p>
                    </div>

                    {/* Interactive Calculator Island */}
                    <section id="calculate-height-difference" className="scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-foreground">{t('calculateSection.title')}</h2>
                        <p className="text-muted leading-relaxed mb-8">
                            {t('calculateSection.description')}
                        </p>

                        <CalculateHeightDifference />

                        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start text-xs font-bold text-muted uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('calculateSection.badgeFree')}</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('calculateSection.badgeNoAccount')}</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('calculateSection.badgeSupportsUnits')}</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('calculateSection.badgeUpdatesLive')}</span>
                        </div>
                    </section>

                    <section id="how-to-calculate-height-difference" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('howToCalculate.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p1')}
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">{t('howToCalculate.formulaTitle')}</h3>
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                {t('howToCalculate.formulaText')}
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                <div className="bg-bg border border-border p-4 rounded-xl">
                                    <span className="block text-muted mb-1 font-medium font-bold uppercase tracking-wider text-[10px]">{t('howToCalculate.personALabel')}</span>
                                    <span className="font-black text-foreground text-lg">{t('howToCalculate.personAValue')}</span>
                                </div>
                                <div className="bg-bg border border-border p-4 rounded-xl">
                                    <span className="block text-muted mb-1 font-medium font-bold uppercase tracking-wider text-[10px]">{t('howToCalculate.personBLabel')}</span>
                                    <span className="font-black text-foreground text-lg">{t('howToCalculate.personBValue')}</span>
                                </div>
                                <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl">
                                    <span className="block text-accent mb-1 font-bold uppercase tracking-wider text-[10px]">{t('howToCalculate.differenceLabel')}</span>
                                    <span className="font-black text-foreground text-lg">{t('howToCalculate.differenceValue')}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p2')}
                        </p>
                    </section>

                    <section id="height-difference-percentage" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('percentage.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('percentage.p1')}
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">{t('percentage.formulaTitle')}</h3>
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                {t('percentage.formulaText')}
                            </p>

                            <ul className="space-y-3 bg-bg border border-border p-5 rounded-xl text-sm sm:text-base font-medium">
                                <li className="flex justify-between border-b border-border/50 pb-2 font-bold"><span className="text-muted uppercase tracking-wider text-[11px]">{t('percentage.heightDiffLabel')}</span><span className="font-bold text-foreground">{t('percentage.heightDiffValue')}</span></li>
                                <li className="flex justify-between border-b border-border/50 pb-2 font-bold"><span className="text-muted uppercase tracking-wider text-[11px]">{t('percentage.tallerHeightLabel')}</span><span className="font-bold text-foreground">{t('percentage.tallerHeightValue')}</span></li>
                                <li className="flex justify-between border-b border-border/50 pb-2 font-bold"><span className="text-muted uppercase tracking-wider text-[11px]">{t('percentage.calculationLabel')}</span><span className="font-bold text-foreground">{t('percentage.calculationValue')}</span></li>
                                <li className="flex justify-between pt-2 font-black uppercase tracking-wider"><span className="text-foreground text-[12px]">{t('percentage.percentDiffLabel')}</span><span className="text-accent text-xl">{t('percentage.percentDiffValue')}</span></li>
                            </ul>
                        </div>

                        <p className="text-muted leading-relaxed">
                            {t('percentage.p2')}
                        </p>
                    </section>

                    <section id="couple-height-difference-calculator" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('couple.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('couple.p1')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 my-6">
                            <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{t('couple.globalAvgLabel')}</span>
                                <span className="text-3xl font-black text-foreground">{t('couple.globalAvgValue')}</span>
                            </div>
                            <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{t('couple.feetInLabel')}</span>
                                <span className="text-3xl font-black text-accent">{t('couple.feetInValue')}</span>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed mb-6">
                            {t('couple.p2')}
                        </p>

                        <CoupleHeightDifferenceCalculator />
                    </section>

                    <section id="height-difference-chart" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('chartSection.title')}</h2>
                        <p className="text-muted leading-relaxed mb-6">
                            {t('chartSection.p1')}
                        </p>

                        <HeightDifferenceChart />

                        <p className="text-muted leading-relaxed mt-6">
                            {t('chartSection.p2')}
                        </p>
                    </section>

                    <section id="visual-height-comparison" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('visualSection.title')}</h2>
                        <p className="text-muted leading-relaxed mb-6 font-medium">
                            {t('visualSection.p1')}
                        </p>

                        <VisualHeightComparison />

                        <p className="text-muted leading-relaxed mt-6 font-medium">
                            {t('visualSection.p2')}
                        </p>
                    </section>

                    <section id="height-difference-in-different-units" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('unitsSection.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('unitsSection.p1')}
                        </p>

                        <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm my-6 font-medium">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-bg border-b border-border text-foreground font-bold">
                                    <tr>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.tableHeaderPersonA')}</th>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.tableHeaderPersonB')}</th>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.tableHeaderDifferenceCm')}</th>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('unitsSection.tableHeaderDifferenceIn')}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted divide-y divide-border/50">
                                    {[
                                        ["180 cm", "170 cm", "10 cm", "3.9 in"],
                                        ["175 cm", "160 cm", "15 cm", "5.9 in"],
                                        ["183 cm", "165 cm", "18 cm", "7.1 in"],
                                        ["5'11\" (180 cm)", "5'6\" (168 cm)", "12 cm", "4.7 in"],
                                        ["6'0\" (183 cm)", "5'8\" (173 cm)", "10 cm", "3.9 in"],
                                        ["6'2\" (188 cm)", "5'10\" (178 cm)", "10 cm", "3.9 in"]
                                    ].map(([p1, p2, dcm, din], i) => (
                                        <tr key={i} className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">{p1}</td>
                                            <td className="px-6 py-4 font-bold text-foreground">{p2}</td>
                                            <td className="px-6 py-4 font-black text-foreground">{dcm}</td>
                                            <td className="px-6 py-4 font-black text-accent">{din}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="try-the-height-difference-calculator" className="bg-surface border border-border rounded-3xl p-8 md:p-12 text-center scroll-mt-24 shadow-xl mt-8">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
                            {t('cta.title')}
                        </h2>
                        <p className="text-muted leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                            {t('cta.descriptionLine1')} <br />
                            {t('cta.descriptionLine2')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto mb-10">
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature1')}</span>
                            </div>
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature2')}</span>
                            </div>
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature3')}</span>
                            </div>
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature4')}</span>
                            </div>
                        </div>

                        <Link
                            href="#height-difference-calculator"
                            className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                        >
                            <ArrowUpCircle size={18} /> {t('cta.buttonText')}
                        </Link>
                    </section>

                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={faq} title={toc[8]?.label} description="" />
                    </div>

                    {/* References Section */}
                    <div id="references" className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8 font-medium scroll-mt-36">
                        <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.title')}</h3>
                        <ul className="space-y-3 break-words overflow-hidden list-disc pl-5 marker:text-muted/40">
                            <li>
                                <a href='https://pubmed.ncbi.nlm.nih.gov/27458798/' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    {t('references.ref1')}
                                </a>
                            </li>
                            <li>
                                <a href='https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054228' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
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
