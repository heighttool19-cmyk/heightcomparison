import React from 'react';
import { getTranslations } from 'next-intl/server';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import { ArrowUpCircle } from 'lucide-react';
import { DynamicIdealWeightIsland, DynamicHealthyWeightIsland } from '@/components/ideal-body-weight-calculator/DynamicIBWIslands';
import JsonLd from '@/components/common/JsonLd';
import { IDEAL_BODY_WEIGHT_SCHEMA } from '@/constants/schemas/idealBodyWeight';

import { getAlternateLanguages, getCanonicalUrl } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('idealBodyWeightTitle'),
        description: t('idealBodyWeightDescription'),
        alternates: {
            canonical: getCanonicalUrl('/ideal-body-weight-calculator', locale),
            languages: getAlternateLanguages('/ideal-body-weight-calculator'),
        }
    };
}

export default async function IdealBodyWeightPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'idealBodyWeight' });

    const toc = t.raw('toc') as Array<{ id: string; label: string; subItems?: Array<{ id: string; label: string }> }>;
    const faq = t.raw('faq') as Array<{ q: string; a: string }>;

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative pt-8 overflow-x-clip transform-gpu">
            <JsonLd data={IDEAL_BODY_WEIGHT_SCHEMA} />
            {/* --- Sidebar TOC --- */}
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={toc} />
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* Intro */}
                    <div className="space-y-6 text-left sm:text-left p-2">
                        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left">
                            {t('intro.title')}
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                            {t.rich('intro.description', {
                                ibw: (chunks) => <span className='text-accent font-semibold hover:underline'>{chunks}</span>,
                                devine: (chunks) => <span className='text-accent font-semibold hover:underline'>{chunks}</span>,
                                robinson: (chunks) => <span className='text-accent font-semibold hover:underline'>{chunks}</span>,
                                hamwi: (chunks) => <span className='text-accent font-semibold hover:underline'>{chunks}</span>,
                            })}
                        </p>
                        <p className="text-sm text-muted/80 italic max-w-3xl mx-auto sm:mx-0">
                            {t('intro.disclaimer')}
                        </p>
                    </div>

                    {/* Interactive Calculator Island */}
                    <DynamicIdealWeightIsland />

                    <section id="how-to-calculate-ideal-body-weight" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('howToCalculate.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p1')}
                        </p>
                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p2')}
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">{t('howToCalculate.stepsTitle')}</h3>
                            <ul className="space-y-2 text-muted list-decimal pl-5 marker:text-accent font-medium">
                                <li>{t('howToCalculate.step1')}</li>
                                <li>{t('howToCalculate.step2')}</li>
                                <li>{t('howToCalculate.step3')}</li>
                                <li>{t('howToCalculate.step4')}</li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            {t('howToCalculate.p3')}
                        </p>
                    </section>

                    <section id="ideal-body-weight-calculation-formulas" className="space-y-8 scroll-mt-24">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">{t('formulas.title')}</h2>
                            <p className="text-muted leading-relaxed">
                                {t('formulas.description')}
                            </p>
                        </div>

                        <div id='devine-formula' className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                            <h3 className="text-xl font-bold text-foreground mb-3">{t('formulas.devine.title')}</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                {t('formulas.devine.p1')}
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground">
                                        <tr>
                                            <th className="px-4 py-3">{t('formulas.tableSexHeader')}</th>
                                            <th className="px-4 py-3">{t('formulas.tableFormulaHeader')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">{t('formulas.maleLabel')}</td>
                                            <td className="px-4 py-3">{t('formulas.devine.maleFormula')}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">{t('formulas.femaleLabel')}</td>
                                            <td className="px-4 py-3">{t('formulas.devine.femaleFormula')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-bg border border-border p-2 rounded-xl font-mono text-xs">
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.heightRowLabel')}</span><span className="font-bold text-foreground">{t('formulas.devine.exampleHeightValue')}</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.devine.inchesAboveLabel')}</span><span className="font-bold text-foreground">{t('formulas.devine.inchesAboveValue')}</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.calculationRowLabel')}</span><span className="font-bold text-foreground">{t('formulas.devine.calculationValue')}</span></div>
                                <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">{t('formulas.devine.resultLabel')}</span><span className="font-bold text-foreground">{t('formulas.devine.resultValue')}</span></div>
                            </div>
                        </div>

                        <div id="robinson-formula" className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                            <h3 className="text-xl font-bold text-foreground mb-3">{t('formulas.robinson.title')}</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                {t('formulas.robinson.p1')}
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground">
                                        <tr>
                                            <th className="px-4 py-3">{t('formulas.tableSexHeader')}</th>
                                            <th className="px-4 py-3">{t('formulas.tableFormulaHeader')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">{t('formulas.maleLabel')}</td>
                                            <td className="px-4 py-3">{t('formulas.robinson.maleFormula')}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">{t('formulas.femaleLabel')}</td>
                                            <td className="px-4 py-3">{t('formulas.robinson.femaleFormula')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-bg border border-border p-2 rounded-xl font-mono text-xs">
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.heightRowLabel')}</span><span className="font-bold text-foreground">{t('formulas.robinson.exampleHeightValue')}</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.calculationRowLabel')}</span><span className="font-bold text-foreground">{t('formulas.robinson.calculationValue')}</span></div>
                                <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">{t('formulas.robinson.resultLabel')}</span><span className="font-bold text-foreground">{t('formulas.robinson.resultValue')}</span></div>
                            </div>
                        </div>

                        <div id='hamwi-formula' className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                            <h3 className="text-xl font-bold text-foreground mb-3">{t('formulas.hamwi.title')}</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                {t('formulas.hamwi.p1')}
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground">
                                        <tr>
                                            <th className="px-4 py-3">{t('formulas.tableSexHeader')}</th>
                                            <th className="px-4 py-3">{t('formulas.tableFormulaHeader')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">{t('formulas.maleLabel')}</td>
                                            <td className="px-4 py-3">{t('formulas.hamwi.maleFormula')}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">{t('formulas.femaleLabel')}</td>
                                            <td className="px-4 py-3">{t('formulas.hamwi.femaleFormula')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-bg border border-border p-2 rounded-xl font-mono text-xs">
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.heightRowLabel')}</span><span className="font-bold text-foreground">{t('formulas.hamwi.exampleHeightValue')}</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">{t('formulas.calculationRowLabel')}</span><span className="font-bold text-foreground">{t('formulas.hamwi.calculationValue')}</span></div>
                                <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">{t('formulas.hamwi.resultLabel')}</span><span className="font-bold text-foreground">{t('formulas.hamwi.resultValue')}</span></div>
                            </div>
                        </div>
                    </section>

                    <section id="ideal-body-weight-calculator-for-women" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('women.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('women.p1')}
                        </p>
                        <p className="text-muted leading-relaxed">
                            {t('women.p2')}
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-4">
                            <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">{t('women.exampleTitle')}</h3>
                            <ul className="space-y-2 text-muted font-medium">
                                <li>{t('women.exampleDevine')}</li>
                                <li>{t('women.exampleRobinson')}</li>
                                <li>{t('women.exampleHamwi')}</li>
                                <li className="pt-2 text-accent font-bold">{t('women.exampleRangeSummary')}</li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            {t('women.p3')}
                        </p>
                    </section>

                    <section id="ideal-body-weight-calculator-for-men" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('men.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('men.p1')}
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-4">
                            <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">{t('men.exampleTitle')}</h3>
                            <ul className="space-y-2 text-muted font-medium">
                                <li>{t('men.exampleDevine')}</li>
                                <li>{t('men.exampleRobinson')}</li>
                                <li>{t('men.exampleHamwi')}</li>
                                <li className="pt-2 text-accent font-bold">{t('men.exampleRangeSummary')}</li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            {t('men.p2')}
                        </p>
                    </section>

                    <section id="ideal-body-weight-calculator-for-pediatrics" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('pediatrics.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('pediatrics.p1')}
                        </p>
                        <p className="text-muted leading-relaxed">
                            {t('pediatrics.p2Before')} <a href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">{t('pediatrics.cdcLinkText')}</a> {t('pediatrics.p2Middle')} <a href='https://www.who.int/tools/child-growth-standards' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">{t('pediatrics.whoLinkText')}</a> {t('pediatrics.p2After')}
                        </p>
                        <p className="text-muted leading-relaxed">
                            {t('pediatrics.p3')}
                        </p>
                    </section>

                    <section id="adjusted-ideal-body-weight-calculator" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('adjusted.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('adjusted.p1')}
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">{t('adjusted.formulaTitle')}</h3>
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                {t('adjusted.formulaText')}
                            </p>
                            <h3 className="font-bold text-foreground mb-2 text-sm">{t('adjusted.exampleTitle')}</h3>
                            <ul className="space-y-2 text-muted font-medium font-mono text-sm">
                                <li>{t('adjusted.exampleResult')}<span className='text-accent font-semibold hover:underline'>{t('adjusted.exampleResultValue')}</span></li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            {t('adjusted.p2')}
                        </p>
                    </section>

                    <section id="percent-ideal-body-weight-calculation" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('percentIbw.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('percentIbw.p1')}
                        </p>
                        <div className="bg-surface border border-border p-2 rounded-2xl my-6">
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                {t('percentIbw.formulaText')}
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground text-center">
                                        <tr>
                                            <th className=" py-3">{t('percentIbw.tableHeaderPercent')}</th>
                                            <th className=" py-3">{t('percentIbw.tableHeaderStatus')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted font-medium text-center">
                                        <tr>
                                            <td className="  bg-red-500/10 py-3 text-red-600 dark:text-red-400 font-bold">{t('percentIbw.row1Percent')}</td>
                                            <td className=" py-3 text-foreground font-bold">{t('percentIbw.row1Status')}</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-amber-500/10 py-3 text-amber-600 dark:text-amber-400 font-bold">{t('percentIbw.row2Percent')}</td>
                                            <td className=" py-3 text-foreground font-bold">{t('percentIbw.row2Status')}</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-green-500/10 py-3 text-green-600 dark:text-green-400 font-bold">{t('percentIbw.row3Percent')}</td>
                                            <td className=" py-3 text-foreground font-bold">{t('percentIbw.row3Status')}</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-amber-500/10 py-3 text-amber-600 dark:text-amber-400 font-bold">{t('percentIbw.row4Percent')}</td>
                                            <td className=" py-3 text-foreground font-bold">{t('percentIbw.row4Status')}</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-red-500/10 py-3 text-red-600 dark:text-red-400 font-bold">{t('percentIbw.row5Percent')}</td>
                                            <td className=" py-3 text-foreground font-bold">{t('percentIbw.row5Status')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-muted leading-relaxed">
                            {t('percentIbw.p2')}
                        </p>
                    </section>

                    <section id="healthy-weight-range" className="space-y-4 scroll-mt-24 text-foreground">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('healthyRange.title')}</h2>
                        <p className="text-muted leading-relaxed mb-6">
                            {t('healthyRange.p1')}
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">{t('healthyRange.illustrativeTitle')}</h3>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs/4 font-medium">
                                <div className="bg-bg border border-border p-2 rounded-xl">
                                    <span className="block text-muted mb-1 font-bold">{t('healthyRange.belowLabel')}</span>
                                    <span className="font-bold text-foreground">{t('healthyRange.belowValue')}</span>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/30 p-2 rounded-xl">
                                    <span className="block text-green-500 mb-1 font-bold">{t('healthyRange.healthyLabel')}</span>
                                    <span className="font-bold text-green-600">{t('healthyRange.healthyValue')}</span>
                                </div>
                                <div className="bg-bg border border-border p-2 rounded-xl">
                                    <span className="block text-muted mb-1 font-bold">{t('healthyRange.aboveLabel')}</span>
                                    <span className="font-bold text-foreground">{t('healthyRange.aboveValue')}</span>
                                </div>
                                <div className="col-span-3 bg-red-500/10 border border-red-500/30 p-2 rounded-xl mt-2">
                                    <span className="block text-red-500 mb-1 font-bold">{t('healthyRange.obesityLabel')}</span>
                                    <span className="font-bold text-red-600">{t('healthyRange.obesityValue')}</span>
                                </div>
                            </div>
                        </div>
                        <DynamicHealthyWeightIsland />
                    </section>

                    <section id="ideal-body-weight-vs-bmi" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{t('vsBmi.title')}</h2>
                        <p className="text-muted leading-relaxed">
                            {t('vsBmi.p1')}
                        </p>
                        <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm my-6">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-bg border-b border-border text-foreground font-bold">
                                    <tr>
                                        <th className="px-6 py-4">{t('vsBmi.tableHeaderMeasure')}</th>
                                        <th className="px-6 py-4">{t('vsBmi.tableHeaderWhatItDoes')}</th>
                                        <th className="px-6 py-4">{t('vsBmi.tableHeaderLimitation')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50 text-muted">
                                    <tr className="hover:bg-bg/50 transition-colors font-medium">
                                        <td className="px-6 py-4 font-bold text-foreground">{t('vsBmi.row1Measure')}</td>
                                        <td className="px-6 py-4 text-muted">{t('vsBmi.row1WhatItDoes')}</td>
                                        <td className="px-6 py-4 text-muted">{t('vsBmi.row1Limitation')}</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors font-medium">
                                        <td className="px-6 py-4 font-bold text-foreground">{t('vsBmi.row2Measure')}</td>
                                        <td className="px-6 py-4 text-muted">{t('vsBmi.row2WhatItDoes')}</td>
                                        <td className="px-6 py-4 text-muted">{t('vsBmi.row2Limitation')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted leading-relaxed">
                            {t('vsBmi.p2')}
                        </p>

                        <div className="text-center mt-12">
                            <Link
                                href="#ideal-body-weight-calculator"
                                className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                            >
                                <ArrowUpCircle size={18} /> {t('vsBmi.scrollButtonText')}
                            </Link>
                        </div>
                    </section>

                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={faq} title={toc[10]?.label} description="" />
                    </div>

                    {/* References Section */}
                    <div id="references" className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8 scroll-mt-24">
                        <p className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.title')}</p>
                        <ul className="space-y-3 break-words overflow-hidden list-disc pl-5 marker:text-muted/40 font-medium">
                            <li>
                                <a href="https://jglobal.jst.go.jp/en/detail?JGLOBAL_ID=201002075945172870" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    Devine BJ (1974)
                                </a>: Gentamicin therapy. Drug Intelligence and Clinical Pharmacy.
                            </li>
                            <li>
                                <a href="https://pubmed.ncbi.nlm.nih.gov/6869387/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    Robinson JD et al. (1983)
                                </a>: Determination of ideal body weight for drug dosage calculations. American Journal of Hospital Pharmacy.
                            </li>
                            <li>
                                <a href="https://www.peng.org.uk/pdfs/pocket-guide/statement-on-ideal-body-weight.pdf" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    Hamwi GJ (1964)
                                </a>: Changing dietary concepts. In: Diabetes Mellitus: Diagnosis and Treatment. American Diabetes Association.
                            </li>
                            <li>
                                <a href="https://www.cdc.gov/growthcharts" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    CDC Growth Charts
                                </a>. Centers for Disease Control and Prevention.
                            </li>
                            <li>
                                <a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    WHO Child Growth Standards
                                </a>. World Health Organization.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
