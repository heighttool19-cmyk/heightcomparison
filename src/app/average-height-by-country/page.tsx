import React from 'react';
import Navbar from '@/components/Navbar';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import ThemeInitializer from '@/components/ThemeInitializer';
import Link from 'next/link';
import ReactCountryFlag from "react-country-flag";
import { AVERAGE_HEIGHT_TOC, AVERAGE_HEIGHT_FAQ } from '@/constants/averageHeight';
import { DynamicAverageHeightIsland } from '@/components/average-height-calculator/DynamicAverageHeightIsland';

export default function AverageHeightPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-clip bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            <ThemeInitializer />
            <Navbar activePage="average-height" />

            <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative pt-8">
                {/* --- LEFT SIDEBAR (TOC) --- */}
                <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                    <TableOfContents items={AVERAGE_HEIGHT_TOC} />
                </aside>

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* H1 Intro */}
                        <div className="space-y-6 text-center sm:text-left">
                            <h1 id="average-height-by-country" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                                Average Height by Country
                            </h1>
                            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                            <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0">
                                Average height varies more than most people expect. The gap between the world&apos;s tallest and shortest populations spans nearly 24 cm for men and 21 cm for women. This page compares average human height around the world for both sexes, from the Netherlands at the top to Timor-Leste at the foot, drawing on data from the <a href="https://elifesciences.org/articles/13410" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">NCD Risk Factor Collaboration</a> and <a href="http://worldpopulationreview.com/country-rankings/average-height-by-country" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">World Population Review</a>. Men and women follow the same broad geographic pattern, with Northern Europe at the top and parts of South and Central Asia at the lower end.
                            </p>
                        </div>

                        {/* Interactive Client Island */}
                        <DynamicAverageHeightIsland />

                        <section id="tallest-description" className="space-y-4">
                            <p className="text-muted leading-relaxed">
                                The Netherlands has topped global male height rankings for decades, with men averaging 183.8 cm, just under 6&apos;1&quot;. Denmark sits at 181.9 cm, Germany at 180.3 cm, and Norway at 180.5 cm.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Three factors reinforce each other across this cluster: generous dairy consumption from early childhood, strong public healthcare that reduces illness during growth years, and long-term genetic selection in well-nourished populations.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Montenegro and Estonia have recently overtaken many traditionally tall Western European nations, reflecting rapid improvements in living standards following the post-Soviet period.
                            </p>
                        </section>

                        <section id="shortest-description" className="space-y-4">
                            <p className="text-muted leading-relaxed">
                                The shortest populations sit predominantly in South and Southeast Asia and Central America. Timor-Leste records the lowest combined average globally, followed closely by Guatemala and Laos.
                            </p>
                            <p className="text-muted leading-relaxed">
                                In Guatemala, chronic malnutrition affects nearly a third of children under five, directly stunting skeletal development. Bangladesh and Nepal face similar constraints: protein-scarce diets, limited healthcare access, and structural poverty that limits growth potential from birth.
                            </p>
                            <p className="text-muted leading-relaxed">
                                These figures are not genetic ceilings. They are largely markers of historical underdevelopment, reversible, as South Korea and China demonstrated across the 20th century.
                            </p>
                        </section>

                        <section id="male-female-gap" className="space-y-4">
                            <p className="text-muted leading-relaxed">
                                Across all populations, men are taller than women by 12–15 cm. This gap holds consistent regardless of overall height level — it is nearly identical in the Netherlands and in Bangladesh.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Average height varies widely due to genetics, diet quality, childhood health, and economic development. Northern European populations consistently rank among the tallest, while some South Asian and Central American countries show shorter averages shaped by historical nutritional limitations.
                            </p>
                        </section>

                        <section id="selected-countries-cards" className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height in Selected Countries</h2>
                            <div className="grid md:grid-cols-1 gap-4">
                                {/* Country Card 1 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="NL" svg style={{ width: '1.2em', height: '1.2em' }} title="Netherlands" /> Netherlands</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">183.8 cm (6&apos;0&quot;)</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">170.4 cm (5&apos;7&quot;)</span></div>
                                    <p className="text-sm text-muted">Netherlands men have topped global rankings for decades. Dairy-rich diets and universal healthcare drive the result.</p>
                                </div>
                                {/* Add more cards as needed or keep just a few for performance */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="US" svg style={{ width: '1.2em', height: '1.2em' }} title="USA" /> USA</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">176.9 cm (5&apos;10&quot;)</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.3 cm (5&apos;4&quot;)</span></div>
                                    <p className="text-sm text-muted">The US was once third tallest globally. It now sits around 47th for men, reflecting diet quality diverging from European peers after the 1970s.</p>
                                </div>
                            </div>
                        </section>

                        <section id="extremes" className="grid md:grid-cols-1 gap-8 pt-6">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Global Height Extremes</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                    <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Tallest man ever</span>
                                    <span className="block font-bold text-foreground">Robert Wadlow</span>
                                    <span className="block text-2xl font-black text-accent my-1">272 cm</span>
                                    <span className="block text-xs font-medium text-muted">8&apos;11&quot; · USA · d. 1940</span>
                                </div>
                                <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                    <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Shortest man ever</span>
                                    <span className="block font-bold text-foreground">Chandra Bahadur Dangi</span>
                                    <span className="block text-2xl font-black text-accent my-1">54.6 cm</span>
                                    <span className="block text-xs font-medium text-muted">1&apos;9&quot; · Nepal · d. 2015</span>
                                </div>
                                <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                    <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Tallest woman ever</span>
                                    <span className="block font-bold text-foreground">Zeng Jinlian</span>
                                    <span className="block text-2xl font-black text-accent my-1">246.3 cm</span>
                                    <span className="block text-xs font-medium text-muted">8&apos;1&quot; · China · d. 1982</span>
                                </div>
                                <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                    <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Shortest living woman</span>
                                    <span className="block font-bold text-foreground">Jyoti Amge</span>
                                    <span className="block text-2xl font-black text-accent my-1">62.8 cm</span>
                                    <span className="block text-xs font-medium text-muted">2&apos;1&quot; · India</span>
                                </div>
                            </div>
                        </section>

                        <section id="why-average-height-differs-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Why Average Height Differs by Country</h2>
                            <p className="text-muted leading-relaxed">
                                Height is shaped by both genetics and environment. Genetics sets the theoretical ceiling, tall parents tend to produce taller children but whether a child reaches that ceiling depends almost entirely on what happens during the first two decades of life.
                            </p>
                            <p className="text-muted leading-relaxed">
                                <span className="font-bold text-accent hover:underline">Nutrition</span> is the single strongest environmental determinant of adult height. Adequate protein and micronutrients during the first 1,000 days of life are critical to skeletal development.
                            </p>
                        </section>

                        {/* FAQ Section */}
                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion items={AVERAGE_HEIGHT_FAQ} />
                        </div>

                        {/* References Section */}
                        <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8">
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Primary Data Sources</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016. Vol. 5, e13410.</li>
                                <li>The World Health Organization (WHO) Global Health Observatory.</li>
                                <li>World Population Review - Average Height by Country 2024.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-surface border-t border-border mt-auto">
                <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/about" className="hover:text-foreground">About</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/terms" className="hover:text-foreground">Terms</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                    </div>
                    <div>© 2026 HeightComparison. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}