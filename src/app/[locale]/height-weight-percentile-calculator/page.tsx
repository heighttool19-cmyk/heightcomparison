import React from 'react';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ExampleCalculationVisual from '@/components/height-weight-percentile-calculator/ExampleCalculationVisual';
import HeightPercentileTool from '@/components/height-weight-percentile-calculator/HeightPercentileTool';
import BellCurveIllustration from '@/components/height-weight-percentile-calculator/BellCurveIllustration';
import WHOvsCDCVisual from '@/components/height-weight-percentile-calculator/WHOvsCDCVisual';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/common/JsonLd';
import { PERCENTILE_SCHEMA } from '@/constants/schemas/percentile';

import { getAlternateLanguages, getCanonicalUrl } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('heightWeightPercentileTitle'),
        description: t('heightWeightPercentileDescription'),
        alternates: {
            canonical: getCanonicalUrl('/height-weight-percentile-calculator', locale),
            languages: getAlternateLanguages('/height-weight-percentile-calculator'),
        }
    };
}

export default async function PercentileCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'heightWeightPercentile' });

    const toc = t.raw('toc') as Array<{ id: string; label: string; subItems?: Array<{ id: string; label: string }> }>;
    const faq = t.raw('faq') as Array<{ q: string; a: string }>;

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 mt-8 overflow-x-clip transform-gpu">
            <JsonLd data={PERCENTILE_SCHEMA} />
            {/* --- Sidebar TOC --- */}
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={toc} />
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* Title Section */}
                    <div className="space-y-6 text-left sm:text-left mt-4 leading-relaxed p-2">
                        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left">
                            {t('intro.title')}
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                            {t.rich('intro.description', {
                                who: (chunks) => <span className="text-accent font-bold">{chunks}</span>,
                                cdc: (chunks) => <span className="text-accent font-bold">{chunks}</span>,
                            })}
                        </p>
                        <p className="text-sm text-muted/80 italic max-w-3xl mx-auto sm:mx-0">
                            {t('intro.disclaimer')}
                        </p>
                    </div>

                    {/* Calculator Component Island */}
                    <section id="calculator-section" className="scroll-mt-24">
                        <h2 id="calculate-your-height-and-weight-percentile" className="text-2xl md:text-3xl font-black tracking-tight mb-6 scroll-mt-24">{t('toolSection.title')}</h2>
                        <HeightPercentileTool />
                    </section>

                    <section id="what-does-height-and-weight-percentile-mean" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('meaning.title')}</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('meaning.p1Before')}<span className="text-accent font-bold">{t('meaning.p1Strong')}</span>{t('meaning.p1After')}
                        </p>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('meaning.p2')}
                        </p>

                        <div className="bg-bg border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">{t('meaning.referencePointsTitle')}</h3>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-muted font-medium">
                                {/* Row 1 */}
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                    <strong>{t('meaning.p50Label')}</strong>
                                </div>
                                <div>
                                    {t('meaning.p50Value')}
                                </div>

                                {/* Row 2 */}
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                    <strong>{t('meaning.p90Label')}</strong>
                                </div>
                                <div>
                                    {t('meaning.p90Value')}
                                </div>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed font-medium">
                            {t('meaning.p3')}
                        </p>

                        <BellCurveIllustration />
                    </section>

                    <section id="how-the-height-and-weight-percentile-calculator-works" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('howItWorks.title')}</h2>
                        <div className="text-muted leading-relaxed font-medium">
                            {t('howItWorks.descriptionBefore')}
                            <a
                                href="https://www.cdc.gov/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-semibold hover:underline"
                            > {t('howItWorks.cdcLinkText')} </a> {t('howItWorks.descriptionMiddle')}
                            <a
                                href='https://www.who.int/'
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-semibold hover:underline"
                            > {t('howItWorks.whoLinkText')} </a> {t('howItWorks.descriptionAfter')}
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">{t('howItWorks.step1Label')}</span>
                                <p className="text-sm text-foreground font-bold mt-2">{t('howItWorks.step1Text')}</p>
                            </div>
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">{t('howItWorks.step2Label')}</span>
                                <p className="text-sm text-foreground font-bold mt-2">{t('howItWorks.step2Text')}</p>
                            </div>
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">{t('howItWorks.step3Label')}</span>
                                <p className="text-sm text-foreground font-bold mt-2">{t('howItWorks.step3Text')}</p>
                            </div>
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">{t('howItWorks.step4Label')}</span>
                                <p className="text-sm text-foreground font-bold mt-2">{t('howItWorks.step4Text')}</p>
                            </div>
                        </div>

                        <div className="text-muted leading-relaxed mt-6 font-medium">
                            {t('howItWorks.infantsNoteBefore')}
                            <a
                                href='https://www.who.int/tools/child-growth-standards'
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-semibold hover:underline"
                            > {t('howItWorks.infantsNoteLinkText')}</a>{t('howItWorks.infantsNoteAfter')}
                        </div>

                        <WHOvsCDCVisual />
                    </section>

                    <section id="height-percentile-calculator-by-age-group" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('byAgeGroup.title')}</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('byAgeGroup.description')}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 my-6">
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">{t('byAgeGroup.ages0to2Label')}</span>
                                    <p className="text-muted text-sm font-medium">{t('byAgeGroup.ages0to2Value')}</p>
                                </div>
                            </div>
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">{t('byAgeGroup.ages2to20Label')}</span>
                                    <p className="text-muted text-sm font-medium">{t('byAgeGroup.ages2to20Value')}</p>
                                </div>
                            </div>
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">{t('byAgeGroup.adultsLabel')}</span>
                                    <p className="text-muted text-sm font-medium">{t('byAgeGroup.adultsValue')}</p>
                                </div>
                            </div>
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">{t('byAgeGroup.boysGirlsLabel')}</span>
                                    <p className="text-muted text-sm font-medium">{t('byAgeGroup.boysGirlsValue')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10 mt-8">
                            <div id="height-percentile-calculator-for-babies-and-infants" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70">{t('byAgeGroup.infants.title')}</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('byAgeGroup.infants.p1Before')} <span className='text-accent font-bold '>{t('byAgeGroup.infants.p1Strong')}</span> {t('byAgeGroup.infants.p1After')}
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    {t('byAgeGroup.infants.p2')}
                                </p>
                            </div>

                            <div id="height-percentile-calculator-for-toddlers-and-kids" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70" >{t('byAgeGroup.toddlers.title')}</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('byAgeGroup.toddlers.p1Before')} <span className='text-accent font-bold'>{t('byAgeGroup.toddlers.p1Strong')}</span> {t('byAgeGroup.toddlers.p1After')}
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    {t('byAgeGroup.toddlers.p2')}
                                </p>
                            </div>

                            <div id="height-percentile-calculator-for-boys-and-girls" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70">{t('byAgeGroup.boysGirls.title')}</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('byAgeGroup.boysGirls.p1')}
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    {t('byAgeGroup.boysGirls.p2')}
                                </p>
                            </div>

                            <div id="height-percentile-calculator-for-adults" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70">{t('byAgeGroup.adults.title')}</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    {t('byAgeGroup.adults.p1Before')} <span className='text-accent font-bold'>{t('byAgeGroup.adults.p1Strong')}</span>{t('byAgeGroup.adults.p1After')}
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    {t('byAgeGroup.adults.p2')}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="us-height-percentile-calculator" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('usCalculator.title')}</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('usCalculator.p1Before')} <span className='text-accent font-bold'>{t('usCalculator.p1Strong')}</span>{t('usCalculator.p1After')}
                        </p>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('usCalculator.p2Before')} <span className='text-accent font-bold'>{t('usCalculator.p2Strong')}</span>{t('usCalculator.p2After')}
                        </p>
                    </section>

                    <section id="how-to-interpret-height-percentile-result" className="space-y-6 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('interpret.title')}</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('interpret.description')}
                        </p>

                        <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-bg border-b border-border text-foreground font-black uppercase tracking-widest text-[11px]">
                                    <tr>
                                        <th className="px-6 py-4">{t('interpret.tableHeaderRange')}</th>
                                        <th className="px-6 py-4">{t('interpret.tableHeaderInterpretation')}</th>
                                        <th className="px-6 py-4">{t('interpret.tableHeaderSuggests')}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted divide-y divide-border/50 font-medium">
                                    <tr className="hover:bg-bg/50 transition-colors text-center">
                                        <td className="px-2 py-4 font-black text-accent text-lg">{t('interpret.row1Range')}</td>
                                        <td className="px-6 py-4">{t('interpret.row1Interpretation')}</td>
                                        <td className="px-6 py-4">{t('interpret.row1Suggests')}</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors text-center">
                                        <td className="px-2 py-4 font-black text-lg">{t('interpret.row2Range')}</td>
                                        <td className="px-6 py-4">{t('interpret.row2Interpretation')}</td>
                                        <td className="px-6 py-4">{t('interpret.row2Suggests')}</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors text-center">
                                        <td className="px-2 py-4 font-black text-lg">{t('interpret.row3Range')}</td>
                                        <td className="px-6 py-4 italic">{t('interpret.row3Interpretation')}</td>
                                        <td className="px-6 py-4">{t('interpret.row3Suggests')}</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors text-center">
                                        <td className="px-2 py-4 font-black text-lg">{t('interpret.row4Range')}</td>
                                        <td className="px-6 py-4">{t('interpret.row4Interpretation')}</td>
                                        <td className="px-6 py-4">{t('interpret.row4Suggests')}</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors text-center border-l-4 border-red-500/20">
                                        <td className="px-2 py-4 font-black text-red-500 text-lg">{t('interpret.row5Range')}</td>
                                        <td className="px-6 py-4">{t('interpret.row5Interpretation')}</td>
                                        <td className="px-6 py-4">{t('interpret.row5Suggests')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-muted leading-relaxed font-medium">
                            {t('interpret.note')}
                        </p>
                    </section>

                    <section id="example-height-percentile-calculation" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('example.title')}</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('example.description')}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 font-bold">
                            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                <h3 className="text-[10px] font-black uppercase text-muted mb-4 border-b border-border pb-2 tracking-widest">{t('example.inputParamsTitle')}</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">{t('example.ageLabel')}</span><span className="font-bold text-foreground">{t('example.ageValue')}</span></div>
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">{t('example.sexLabel')}</span><span className="font-bold text-foreground">{t('example.sexValue')}</span></div>
                                    <div className="flex justify-between"><span className="text-muted uppercase text-[11px]">{t('example.heightLabel')}</span><span className="font-bold text-foreground">{t('example.heightValue')}</span></div>
                                </div>
                            </div>
                            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                <h3 className="text-[10px] font-black uppercase text-muted mb-4 border-b border-border pb-2 tracking-widest">{t('example.calculatedDataTitle')}</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">{t('example.cdcMedianLabel')}</span><span className="font-bold text-foreground">{t('example.cdcMedianValue')}</span></div>
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">{t('example.deviationLabel')}</span><span className="font-bold text-accent">{t('example.deviationValue')}</span></div>
                                    <div className="flex justify-between"><span className="text-muted uppercase text-[11px]">{t('example.resultLabel')}</span><span className="font-black text-foreground text-lg">{t('example.resultValue')}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg border border-border p-6 rounded-2xl">
                            <div className="flex items-center justify-between text-[10px] font-black text-muted mb-2 uppercase tracking-widest">
                                <span>{t('example.scaleMin')}</span><span>{t('example.scaleQ1')}</span><span>{t('example.scaleMid')}</span><span>{t('example.scaleQ3')}</span><span>{t('example.scaleMax')}</span>
                            </div>
                            <div className="h-4 w-full bg-surface border border-border rounded-full relative overflow-hidden flex">
                                <div className="h-full bg-red-500/50 w-[10%]" />
                                <div className="h-full bg-orange-400/50 w-[15%]" />
                                <div className="h-full bg-accent/30 w-[50%]" />
                                <div className="h-full bg-accent/70 w-[15%]" />
                                <div className="h-full bg-accent w-[10%]" />
                                <div className="absolute top-0 bottom-0 w-1 bg-foreground z-10 shadow-xl" style={{ left: '55%' }} />
                            </div>
                            <div className="mt-4 text-center">
                                <span className="font-black text-foreground text-2xl">{t('example.resultHeadline')}</span> <span className="text-muted text-sm font-bold uppercase tracking-wider ml-2">{t('example.resultSubtext')}</span>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed font-medium">
                            {t('example.closing')}
                        </p>

                        <ExampleCalculationVisual />
                    </section>

                    <section id="why-height-percentiles-are-used-in-pediatric-growth-monitoring" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('whyUsed.title')}</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            {t('whyUsed.p1')}
                        </p>
                        <p className="text-muted leading-relaxed font-medium">{t('whyUsed.p2Intro')}</p>
                        <ul className="space-y-3 text-muted list-disc pl-8 marker:text-accent font-medium">
                            <li>{t('whyUsed.item1')}</li>
                            <li>{t('whyUsed.item2')}</li>
                            <li>{t('whyUsed.item3')}</li>
                        </ul>
                        <div className="text-muted leading-relaxed mt-4 font-medium">
                            {t('whyUsed.p3Before')}
                            <a href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm' target='_blank' className='text-accent font-bold hover:underline mx-1'>{t('whyUsed.p3LinkText')}</a>
                            {t('whyUsed.p3After')}
                        </div>
                    </section>

                    <section id="try-the-height-and-weight-percentile-calculator" className="bg-surface border border-border rounded-[3rem] p-8 md:p-16 text-center scroll-mt-24 shadow-2xl mt-8">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                            {t('cta.title')}
                        </h2>
                        <p className="text-muted leading-relaxed mb-12 max-w-2xl mx-auto font-medium text-lg">
                            {t('cta.descriptionBefore')} <span className="text-foreground font-black">{t('cta.descriptionStrong')}</span> {t('cta.descriptionAfter')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left max-w-3xl mx-auto mb-12">
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature1')}</span>
                            </div>
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature2')}</span>
                            </div>
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature3')}</span>
                            </div>
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>{t('cta.feature4')}</span>
                            </div>
                        </div>

                        <Link
                            href="#calculate-your-height-and-weight-percentile-tool"
                            className="bg-accent text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.05] transition-all shadow-2xl shadow-accent/40 active:scale-95 inline-flex items-center gap-3"
                        >
                            {t('cta.buttonText')}
                        </Link>
                    </section>

                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={faq} title={toc[9]?.label} description="" />
                    </div>

                    {/* References Section */}
                    <div id="references" className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8 font-medium scroll-mt-24">
                        <p className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.title')}</p>
                        <ul className="space-y-4 break-words overflow-hidden list-disc pl-5 marker:text-muted/40">
                            <li>
                                <a href='https://www.who.int/tools/child-growth-standards/standards' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    {t('references.ref1')}
                                </a>
                            </li>
                            <li>
                                <a href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    {t('references.ref2')}
                                </a>
                            </li>
                            <li>
                                <a href='https://www.cdc.gov/nchs/nhanes/index.html' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    {t('references.ref3')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
