import React from 'react';
import { getTranslations } from 'next-intl/server';
import ReactCountryFlag from "react-country-flag";
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/common/JsonLd';
import { getAverageHeightByCountrySchema } from '@/constants/schemas/averageHeightByCountry';
import { BLUE, TEAL } from '@/constants/colors';
import { TOP10, REGIONS } from '@/constants/averageHeight';
import { Bars, RegionMap } from '@/components/average-height-by-country/ChartHelpers';
import AverageHeightTable from '@/components/average-height-by-country/AverageHeightTable';
import TallestCountriesBars from '@/components/average-height-by-country/TallestCountriesBars';
import ShortestCountriesBars from '@/components/average-height-by-country/ShortestCountriesBars';
import TallestVsShortestChart from '@/components/average-height-by-country/TallestVsShortestChart';
import HeightDistributionChart from '@/components/average-height-by-country/HeightDistributionChart';
import { getAlternateLanguages, getCanonicalUrl, getSocialMetadata } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('averageHeightByCountryTitle'),
        description: t('averageHeightByCountryDescription'),
        alternates: {
            canonical: getCanonicalUrl('/average-height-by-country', locale),
            languages: getAlternateLanguages('/average-height-by-country')
        },
        ...getSocialMetadata({
            title: t('averageHeightByCountryTitle'),
            description: t('averageHeightByCountryDescription'),
            path: '/average-height-by-country',
            locale,
        }),
    };
}

const REGION_KEYS = [
    'northernEurope', 'easternEurope', 'westernEurope', 'northAmericaOceania',
    'middleEast', 'eastAsia', 'latinAmerica', 'southSeAsia', 'centralAmerica',
] as const;

const SELECTED_COUNTRIES = [
    { key: 'netherlands', code: 'NL', male: "183.8 cm (6'0\")", female: "170.4 cm (5'7\")" },
    { key: 'unitedKingdom', code: 'GB', male: "178.2 cm (5'10\")", female: "163.9 cm (5'5\")" },
    { key: 'japan', code: 'JP', male: "170.8 cm (5'7\")", female: "158.0 cm (5'2\")" },
    { key: 'bangladesh', code: 'BD', male: "163.0 cm (5'4\")", female: "152.1 cm (4'12\")" },
    { key: 'iran', code: 'IR', male: "175.6 cm (5'9\")", female: "161.2 cm (5'3\")" },
    { key: 'canada', code: 'CA', male: "178.8 cm (5'10\")", female: "164.7 cm (5'5\")" },
    { key: 'ireland', code: 'IE', male: "179.0 cm (5'10\")", female: "164.5 cm (5'5\")" },
    { key: 'sriLanka', code: 'LK', male: "166.0 cm (5'5\")", female: "153.0 cm (5'0\")" },
    { key: 'southKorea', code: 'KR', male: "175.5 cm (5'9\")", female: "163.2 cm (5'4\")" },
    { key: 'india', code: 'IN', male: "166.5 cm (5'5\")", female: "152.6 cm (5'0\")" },
    { key: 'usa', code: 'US', male: "176.9 cm (5'10\")", female: "163.3 cm (5'4\")" },
    { key: 'denmark', code: 'DK', male: "181.9 cm (5'11\")", female: "169.5 cm (5'7\")" },
] as const;

export default async function AverageHeightByCountryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'averageHeightByCountry' });

    const toc = t.raw('toc') as Array<{ id: string; label: string }>;
    const faq = t.raw('faq') as Array<{ q: string; a: string }>;

    const maleTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.male })).sort((a, b) => b.v - a.v);
    const femTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.female })).sort((a, b) => b.v - a.v);
    const regionBars = REGIONS.map((r, i) => ({ n: t(`globalAverage.regionMap.regions.${REGION_KEYS[i]}.name`), code: [], v: r.avg }));
    const translatedRegions = REGIONS.map((r, i) => ({
        name: t(`globalAverage.regionMap.regions.${REGION_KEYS[i]}.name`),
        avg: r.avg,
        color: r.color,
        ex: t(`globalAverage.regionMap.regions.${REGION_KEYS[i]}.ex`),
    }));

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative pt-8 overflow-x-clip transform-gpu">
            <JsonLd data={getAverageHeightByCountrySchema(locale)} />

            <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative pt-8">

                {/* --- LEFT SIDEBAR (TOC) --- */}
                <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                    <TableOfContents items={toc} />
                </aside>

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* H1 Intro */}
                        <div className="space-y-6 text-left sm:text-left">
                            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left">
                                {t('h1')}
                            </h1>
                            <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                                {t.rich('intro.description', {
                                    ncdRisc: (chunks) => (
                                        <a href='https://elifesciences.org/articles/13410'
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent font-semibold hover:underline">{chunks}</a>
                                    ),
                                })}
                            </p>
                        </div>

                        {/* Table Section */}
                        <section id="average-height-table-section" className="scroll-mt-24">
                            <AverageHeightTable />
                        </section>

                        <section id="tallest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('tallestCountries.title')}</h2>

                            <TallestCountriesBars />

                            <p className="text-muted leading-relaxed">
                                {t('tallestCountries.paragraph1')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('tallestCountries.paragraph2')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('tallestCountries.paragraph3')}
                            </p>
                        </section>

                        <section id="shortest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('shortestCountries.title')}</h2>

                            <ShortestCountriesBars />

                            <p className="text-muted leading-relaxed">
                                {t('shortestCountries.paragraph1')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t.rich('shortestCountries.paragraph2', {
                                    unicef: (chunks) => (
                                        <a href='https://www.unicef.org/guatemala/media/446/file/M%C3%ADrame.pdf' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">{chunks}</a>
                                    ),
                                })}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('shortestCountries.paragraph3')}
                            </p>
                        </section>

                        <section id="tallest-and-shortest-countries-by-average-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('tallestShortest.title')}</h2>

                            <TallestVsShortestChart />

                            <p className="text-muted leading-relaxed">
                                {t('tallestShortest.paragraph')}
                            </p>
                        </section>

                        <section id="average-male-height-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('averageMale.title')}</h2>
                            <p className="text-muted leading-relaxed">
                                {t('averageMale.paragraph1')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('averageMale.paragraph2')}
                            </p>
                        </section>

                        <section id="average-female-height-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('averageFemale.title')}</h2>
                            <p className="text-muted leading-relaxed">
                                {t('averageFemale.paragraph1')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('averageFemale.paragraph2')}
                            </p>

                        </section>
                        <section id="average-male-and-female-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                                {t('maleAndFemale.title')}
                            </h2>

                            {/* Removed overflow-x-auto and reduced mobile padding to p-3 to save space on 320px screens */}
                            <div className="bg-surface border border-border p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm my-6 w-full min-w-0">

                                {/* Side-by-side grid (stacks on mobile, side-by-side on large screens) */}
                                {/* REMOVED min-w-[650px] and ADDED w-full min-w-0 so it fluidly fits mobile screens */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full min-w-0">
                                    <Bars items={maleTop10} color={BLUE} label={t('maleAndFemale.barsLabelMale')} />
                                    <Bars items={femTop10} color={TEAL} label={t('maleAndFemale.barsLabelFemale')} />
                                </div>

                            </div>


                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                <p className="text-sm font-medium text-foreground/80">
                                    {t('maleAndFemale.callout')}
                                </p>
                            </div>
                        </section>
                        <section id="average-height-in-selected-countries" className="space-y-6 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('selectedCountries.title')}</h2>
                            <div className="grid md:grid-cols-1 gap-4">
                                {SELECTED_COUNTRIES.map((c) => (
                                    <div key={c.key} className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                        <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2">
                                            <ReactCountryFlag countryCode={c.code} svg style={{ width: '24px', height: '18px' }} aria-hidden="true" alt="" loading="lazy" /> {t(`selectedCountries.countries.${c.key}.name`)}
                                        </h3>
                                        <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">{t('common.tabMale')}</span><span className="font-bold text-foreground">{c.male}</span></div>
                                        <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">{t('common.tabFemale')}</span><span className="font-bold text-foreground">{c.female}</span></div>
                                        <p className="text-sm text-muted">{t(`selectedCountries.countries.${c.key}.paragraph`)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="average-height-chart-for-men" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('chartForMen.title')}</h2>
                            <p className="text-muted leading-relaxed">
                                {t('chartForMen.paragraph')}
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto grid grid-cols-1  gap-8">
                                <div className="mt-8">
                                    <Bars items={regionBars} color={BLUE} label={t('chartForMen.barsLabel')} />
                                    <p className="mt-3 text-[11.5px] text-muted leading-relaxed">
                                        {t('chartForMen.caption')}
                                    </p>
                                </div>

                            </div>
                        </section>

                        <section id="global-average-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('globalAverage.title')}</h2>

                            <div className="grid sm:grid-cols-2 gap-4 my-6">
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{t('globalAverage.maleStatLabel')}</span>
                                    <span className="text-4xl font-black text-foreground">171 cm</span>
                                    <span className="text-lg font-bold text-accent mt-1">5 ft 7 in</span>
                                </div>
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{t('globalAverage.femaleStatLabel')}</span>
                                    <span className="text-4xl font-black text-foreground">159 cm</span>
                                    <span className="text-lg font-bold text-accent mt-1">5 ft 3 in</span>
                                </div>
                            </div>
                            <RegionMap
                                regions={translatedRegions}
                                colourScaleLabel={t('globalAverage.regionMap.colourScaleLabel')}
                                tallestLabel={t('globalAverage.regionMap.tallestLabel')}
                                shortestLabel={t('globalAverage.regionMap.shortestLabel')}
                            />

                            <p className="text-muted leading-relaxed">
                                {t.rich('globalAverage.paragraph1', {
                                    ncdRisc: (chunks) => (
                                        <a href='https://www.ncdrisc.org/data-downloads-height.html' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">{chunks}</a>
                                    ),
                                })}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('globalAverage.paragraph2')}
                            </p>
                        </section>

                        {/* Extremes Section */}
                        <div className="grid md:grid-cols-1 gap-8 pt-6">
                            <section id="tallest-man-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('extremes.tallestMan.title')}</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    {t('extremes.tallestMan.paragraph')}
                                </p>

                            </section>

                            <section id="shortest-man-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('extremes.shortestMan.title')}</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    {t('extremes.shortestMan.paragraph')}
                                </p>

                            </section>

                            <section id="tallest-female-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('extremes.tallestFemale.title')}</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    {t('extremes.tallestFemale.paragraph')}
                                </p>
                            </section>

                            <section id="shortest-female-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">{t('extremes.shortestFemale.title')}</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    {t('extremes.shortestFemale.paragraph')}
                                </p>
                            </section>
                        </div>

                        {/* Extreme Data Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">{t('extremes.dataCards.tallestManEver.label')}</span>
                                <span className="block font-bold text-foreground">{t('extremes.dataCards.tallestManEver.name')}</span>
                                <span className="block text-2xl font-black text-accent my-1">{t('extremes.dataCards.tallestManEver.value')}</span>
                                <span className="block text-xs font-medium text-muted">{t('extremes.dataCards.tallestManEver.meta')}</span></div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">{t('extremes.dataCards.shortestManEver.label')}</span>
                                <span className="block font-bold text-foreground">{t('extremes.dataCards.shortestManEver.name')}</span>
                                <span className="block text-2xl font-black text-accent my-1">{t('extremes.dataCards.shortestManEver.value')}</span>
                                <span className="block text-xs font-medium text-muted">{t('extremes.dataCards.shortestManEver.meta')}</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">{t('extremes.dataCards.tallestWomanEver.label')}</span>
                                <span className="block font-bold text-foreground">{t('extremes.dataCards.tallestWomanEver.name')}</span>
                                <span className="block text-2xl font-black text-accent my-1">{t('extremes.dataCards.tallestWomanEver.value')}</span>
                                <span className="block text-xs font-medium text-muted">{t('extremes.dataCards.tallestWomanEver.meta')}</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">{t('extremes.dataCards.shortestLivingWoman.label')}</span>
                                <span className="block font-bold text-foreground">{t('extremes.dataCards.shortestLivingWoman.name')}</span>
                                <span className="block text-2xl font-black text-accent my-1">{t('extremes.dataCards.shortestLivingWoman.value')}</span>
                                <span className="block text-xs font-medium text-muted">{t('extremes.dataCards.shortestLivingWoman.meta')}</span>
                            </div>
                        </div>

                        <section id="human-height-distribution" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('distribution.title')}</h2>

                            <HeightDistributionChart />
                            <p className="text-xs text-left text-muted mt-2">
                                <strong>{t('distribution.dataSourcesLabel')}</strong> {t('distribution.dataSourcesText')}
                            </p>


                            <p className="text-muted leading-relaxed">
                                {t('distribution.paragraph1')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t('distribution.paragraph2')}
                            </p>

                            <div className="overflow-x-auto border border-border rounded-xl mt-4">
                                <table className="w-full text-sm text-center">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-4 py-3">{t('distribution.tableHeaders.minus2sd')}</th>
                                            <th className="px-4 py-3">{t('distribution.tableHeaders.minus1sd')}</th>
                                            <th className="px-4 py-3">{t('distribution.tableHeaders.globalAvg')}</th>
                                            <th className="px-4 py-3">{t('distribution.tableHeaders.plus1sd')}</th>
                                            <th className="px-4 py-3">{t('distribution.tableHeaders.plus2sd')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted font-mono">
                                        {/* Male Row */}
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-4 py-3">157 cm</td>
                                            <td className="px-4 py-3">164 cm</td>
                                            <td className="px-4 py-3 font-black text-lg text-accent">
                                                171 cm
                                                <span className="block text-[10px] font-sans text-muted font-bold uppercase tracking-wider mt-0.5">{t('common.tabMale')}</span>
                                            </td>
                                            <td className="px-4 py-3">178 cm</td>
                                            <td className="px-4 py-3">185 cm</td>
                                        </tr>
                                        {/* Female Row */}
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-4 py-3">147 cm</td>
                                            <td className="px-4 py-3">153 cm</td>
                                            <td className="px-4 py-3 font-black text-lg text-accent">
                                                159 cm
                                                <span className="block text-[10px] font-sans text-muted font-bold uppercase tracking-wider mt-0.5">{t('common.tabFemale')}</span>
                                            </td>
                                            <td className="px-4 py-3">165 cm</td>
                                            <td className="px-4 py-3">171 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-center text-muted mt-2">{t('distribution.captionMale')}</p>
                            <p className="text-xs text-center text-muted mt-2">{t('distribution.captionFemale')}</p>
                            <p className="text-xs text-center text-muted mt-2">{t('distribution.captionSources')}</p>
                        </section>

                        <section id="why-average-height-differs-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{t('whyDiffers.title')}</h2>
                            <p className="text-muted leading-relaxed">
                                {t('whyDiffers.paragraph1')}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t.rich('whyDiffers.nutritionParagraph', { bold: (chunks) => <span className='font-bold text-accent hover:underline'>{chunks}</span> })}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t.rich('whyDiffers.healthcareParagraph', { bold: (chunks) => <span className='font-bold text-accent hover:underline'>{chunks}</span> })}
                            </p>
                            <p className="text-muted leading-relaxed">
                                {t.rich('whyDiffers.economicParagraph', { bold: (chunks) => <span className='font-bold text-accent hover:underline'>{chunks}</span> })}
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                <p className="text-sm font-medium text-foreground/80">
                                    {t('whyDiffers.calloutUS')}
                                </p>
                            </div>
                        </section>

                        {/* FAQ Accordion Section */}
                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion items={faq} title={toc.find(i => i.id === 'frequently-asked-questions')?.label} description="" />
                        </div>


                        {/* References Section */}
                        <div id="references" className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8 scroll-mt-24">
                            <p className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.primarySources.title')}</p>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>{t('references.primarySources.ref1')} <br /><a href="https://elifesciences.org/articles/13410" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://elifesciences.org/articles/13410</a></li>
                                <li>{t('references.primarySources.ref2')} <br /><a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31859-6/fulltext" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31859-6/fulltext</a></li>
                                <li>{t('references.primarySources.ref3')} <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                                <li>{t('references.primarySources.ref4')} <br /><a href="https://www.who.int/data/gho" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/data/gho</a></li>
                                <li>{t('references.primarySources.ref5')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/16817681/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/16817681/</a></li>
                            </ul>

                            <p className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.usGovernment.title')}</p>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>{t('references.usGovernment.ref1')} <br /><a href="https://www.cdc.gov/growthcharts/cdc-growth-charts.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/growthcharts/cdc-growth-charts.htm</a></li>
                                <li>{t('references.usGovernment.ref2')} <br /><a href="https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf</a></li>
                                <li>{t('references.usGovernment.ref3')} <br /><a href="https://www.cdc.gov/nchs/nhanes/index.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/nhanes/index.html</a></li>
                                <li>{t('references.usGovernment.ref4')} <br /><a href="https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf</a></li>
                                <li>{t('references.usGovernment.ref5')} <br /><a href="https://www.nhlbi.nih.gov/calculate-your-bmi" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.nhlbi.nih.gov/calculate-your-bmi</a></li>
                            </ul>

                            <p className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.peerReviewed.title')}</p>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>{t('references.peerReviewed.ref1')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/?term=Devine+BJ+gentamicin+1974+ideal+body+weight" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/?term=Devine+BJ+gentamicin+1974+ideal+body+weight</a></li>
                                <li>{t('references.peerReviewed.ref2')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/6869387/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/6869387/</a></li>
                                <li>{t('references.peerReviewed.ref3')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/10981254/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/10981254/</a></li>
                                <li>{t('references.peerReviewed.ref4')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/16176118/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/16176118/</a></li>
                                <li>{t('references.peerReviewed.ref5')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/25719490/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/25719490/</a></li>
                                <li>{t('references.peerReviewed.ref6')} <br /><a href="https://pubmed.ncbi.nlm.nih.gov/12365955/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/12365955/</a></li>
                            </ul>

                            <p className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">{t('references.unBodies.title')}</p>
                            <ul className="space-y-3 break-words overflow-hidden">
                                <li>{t('references.unBodies.ref1')} <br /><a href="https://data.unicef.org/topic/nutrition/malnutrition/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://data.unicef.org/topic/nutrition/malnutrition/</a></li>
                                <li>{t('references.unBodies.ref2')} <br /><a href="https://www.fao.org/publications/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.fao.org/publications/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>

        </div>
    );
}
