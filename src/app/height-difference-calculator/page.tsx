import React from 'react';
import { CheckCircle2, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import CalculateHeightDifference from '@/components/height-difference-calculator/CalculateHeightDifference';
import CoupleHeightDifferenceCalculator from '@/components/height-difference-calculator/CoupleHeightDifferenceCalculator';
import HeightDifferenceChart from '@/components/height-difference-calculator/HeightDifferenceChart';
import VisualHeightComparison from '@/components/height-difference-calculator/VisualHeightComparison';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import { HEIGHT_DIFFERENCE_FAQ } from '@/constants/heightDifference';

const tocItems = [
    { id: 'calculate-height-difference', label: 'Calculate Height Difference' },
    { id: 'how-to-calculate-height-difference', label: 'How to Calculate Height Difference' },
    { id: 'height-difference-percentage', label: 'Height Difference Percentage' },
    { id: 'couple-height-difference-calculator', label: 'Couple Height Difference Calculator' },
    { id: 'height-difference-chart', label: 'Height Difference Chart' },
    { id: 'visual-height-comparison', label: 'Visual Height Comparison' },
    { id: 'height-difference-in-different-units', label: 'Height Difference in Different Units' },
    { id: 'try-the-height-difference-calculator', label: 'Try the Height Difference Calculator' },
    { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' }
];

export default function HeightDifferencePage() {
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative pt-8">
            {/* --- Sidebar TOC --- */}
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={tocItems} />
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* H1 Intro */}
                    <div className="space-y-6 text-left sm:text-left p-2">
                        <h1 id="height-difference-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24 text-left">
                            Height Difference Calculator
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                            A height difference calculator compares two people&apos;s heights and returns the gap between them. Enter two heights in centimeters or feet and inches. The tool calculates the height difference and the percentage difference instantly. Compare yourself with a friend, a partner, or anyone else in seconds.
                        </p>
                    </div>

                    {/* Interactive Calculator Island */}
                    <section id="calculate-height-difference" className="scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-foreground">Calculate Height Difference</h2>
                        <p className="text-muted leading-relaxed mb-8">
                            Use the difference in height calculator below. Enter both heights, choose your unit, and the comparison updates live.
                        </p>

                        <CalculateHeightDifference />

                        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start text-xs font-bold text-muted uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Free</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> No account needed</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Supports cm and ft/in</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Updates live</span>
                        </div>
                    </section>

                    <section id="how-to-calculate-height-difference" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">How to Calculate Height Difference</h2>
                        <p className="text-muted leading-relaxed">
                            Height difference calculation uses a single operation: subtract the shorter person&apos;s height from the taller person&apos;s height. The difference in height calculator identifies which person is taller automatically, so the result is always a positive number regardless of which height you enter first.
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Height difference formula:</h3>
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                Height Difference = Taller Height − Shorter Height
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                <div className="bg-bg border border-border p-4 rounded-xl">
                                    <span className="block text-muted mb-1 font-medium font-bold uppercase tracking-wider text-[10px]">Person A</span>
                                    <span className="font-black text-foreground text-lg">180 cm</span>
                                </div>
                                <div className="bg-bg border border-border p-4 rounded-xl">
                                    <span className="block text-muted mb-1 font-medium font-bold uppercase tracking-wider text-[10px]">Person B</span>
                                    <span className="font-black text-foreground text-lg">165 cm</span>
                                </div>
                                <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl">
                                    <span className="block text-accent mb-1 font-bold uppercase tracking-wider text-[10px]">Difference</span>
                                    <span className="font-black text-foreground text-lg">180 − 165 = 15 cm</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed">
                            Subtraction is the only operation involved. The height difference calculator runs this the moment both values are filled in. No extra steps are needed.
                        </p>
                    </section>

                    <section id="height-difference-percentage" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Height Difference Percentage</h2>
                        <p className="text-muted leading-relaxed">
                            The percentage difference adds a proportional dimension to the raw gap. A 10 cm difference between two people both above 180 cm represents a much smaller relative gap than the same 10 cm between two people near 155 cm. The percentage makes the gap meaningful regardless of absolute height.
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Percentage difference formula:</h3>
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                Percentage Difference = (Height Difference ÷ Taller Height) × 100
                            </p>

                            <ul className="space-y-3 bg-bg border border-border p-5 rounded-xl text-sm sm:text-base font-medium">
                                <li className="flex justify-between border-b border-border/50 pb-2 font-bold"><span className="text-muted uppercase tracking-wider text-[11px]">Height difference</span><span className="font-bold text-foreground">15 cm</span></li>
                                <li className="flex justify-between border-b border-border/50 pb-2 font-bold"><span className="text-muted uppercase tracking-wider text-[11px]">Taller height</span><span className="font-bold text-foreground">180 cm</span></li>
                                <li className="flex justify-between border-b border-border/50 pb-2 font-bold"><span className="text-muted uppercase tracking-wider text-[11px]">Calculation</span><span className="font-bold text-foreground">15 ÷ 180 × 100</span></li>
                                <li className="flex justify-between pt-2 font-black uppercase tracking-wider"><span className="text-foreground text-[12px]">Percentage difference</span><span className="text-accent text-xl">8.3%</span></li>
                            </ul>
                        </div>

                        <p className="text-muted leading-relaxed">
                            This means Person B is 8.3% shorter relative to Person A. The difference in height calculator outputs this figure automatically alongside the absolute gap. Both values update live when either height changes.
                        </p>
                    </section>

                    <section id="couple-height-difference-calculator" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Couple Height Difference Calculator</h2>
                        <p className="text-muted leading-relaxed">
                            Comparing heights between romantic partners is one of the most common uses of a height difference calculator. Couples want to know how the gap looks in photos, how it compares to the average, or simply out of curiosity. The tool works the same way for any two people.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 my-6">
                            <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Global average gap (male-female couples)</span>
                                <span className="text-3xl font-black text-foreground">12 to 15 cm</span>
                            </div>
                            <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">In feet and inches</span>
                                <span className="text-3xl font-black text-accent">roughly 5 to 6 in</span>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed mb-6">
                            Survey data places the average height difference in male-female couples globally at around 12 to 15 cm (roughly 5 to 6 inches), though this varies by country and individual. There is no standard definition of a normal couple height difference. The numbers are just numbers.
                        </p>

                        <CoupleHeightDifferenceCalculator />
                    </section>

                    <section id="height-difference-chart" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Height Difference Chart</h2>
                        <p className="text-muted leading-relaxed mb-6">
                            The chart below covers common height pairings and their differences. Use it as a quick reference without entering values into the tool.
                        </p>

                        <HeightDifferenceChart />

                        <p className="text-muted leading-relaxed mt-6">
                            The percentage difference grows with the absolute gap but also depends on the taller height. A 15 cm gap is proportionally larger when the taller person stands at 165 cm than when they stand at 190 cm.
                        </p>
                    </section>

                    <section id="visual-height-comparison" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Visual Height Comparison</h2>
                        <p className="text-muted leading-relaxed mb-6 font-medium">
                            A visual height comparison represents the gap between two people as a proportional graphic rather than a number alone. If one person is 10% taller, their bar renders 10% taller on screen. The difference becomes immediately legible without reading figures.
                        </p>

                        <VisualHeightComparison />

                        <p className="text-muted leading-relaxed mt-6 font-medium">
                            This is especially useful when the raw number is ambiguous. A 10 cm gap between two people near 160 cm looks very different from the same gap between two people above 185 cm. The height difference calculator generates this scaled visual automatically from the values you enter.
                        </p>
                    </section>

                    <section id="height-difference-in-different-units" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Height Difference in Different Units</h2>
                        <p className="text-muted leading-relaxed">
                            You can calculate height difference in centimeters or in feet and inches. Switching units converts both inputs and the output simultaneously. No manual conversion is needed before entering values.
                        </p>

                        <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm my-6 font-medium">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-bg border-b border-border text-foreground font-bold">
                                    <tr>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">Person A</th>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">Person B</th>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">Difference (cm)</th>
                                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">Difference (in)</th>
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
                            Try the Height Difference Calculator
                        </h2>
                        <p className="text-muted leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                            Enter two heights above to calculate height difference instantly. <br />
                            The visual comparison and percentage difference update as you type.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto mb-10">
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>Difference and percentage difference</span>
                            </div>
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>Proportional visual comparison</span>
                            </div>
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>Supports cm and ft/in</span>
                            </div>
                            <div className="flex items-start gap-3 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-[2px]" />
                                <span>Free, no account, any device</span>
                            </div>
                        </div>

                        <Link
                            href="#height-difference-calculator"
                            className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                        >
                            <ArrowUpCircle size={18} /> Scroll to top and compare now ↑
                        </Link>
                    </section>

                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={HEIGHT_DIFFERENCE_FAQ} />
                    </div>

                    {/* References Section */}
                    <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8 font-medium">
                        <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Sources</h3>
                        <ul className="space-y-3 break-words overflow-hidden list-disc pl-5 marker:text-muted/40">
                            <li>
                                <a href='https://pubmed.ncbi.nlm.nih.gov/27458798/' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016.
                                </a>
                            </li>
                            <li>
                                <a href='https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054228' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    Stulp G, Buunk AP, Pollet TV (2013). Human height is positively related to interpersonal dominance in dyadic interactions. PLOS ONE.
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}