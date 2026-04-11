import React from 'react';
import { AlertCircle, ArrowUpCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents';
import KhamisRocheCalculator from '@/components/child-height-calculator/KhamisRocheCalculator';
import MidParentalCalculator from '@/components/child-height-calculator/MidParentalCalculator';
import HeightConverter from '@/components/child-height-calculator/HeightConverter';
import FaqAccordion from '@/components/FaqAccordion';
import { CHILD_HEIGHT_QA, CHILD_HEIGHT_TOC } from '@/constants/childHeight';
import { DynamicHeightCharts, DynamicGrowthPlateExplainer } from '@/components/child-height-calculator/DynamicChildHeightIslands';

export default function HeightCalculatorPage() {
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative">
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={CHILD_HEIGHT_TOC} />
            </aside>
            <div className="flex-1 min-w-0 order-1 md:order-2 text-foreground font-bold">
                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* INTRO CONTENT */}
                    <div className="space-y-6 text-left sm:text-left mt-4 leading-relaxed p-2">
                        <h1 id="child-height-predictor-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24 text-left uppercase">
                            Height Calculator and Adult Height Predictor
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left font-medium">
                            Use this height calculator  to estimate the future height of children, teenagers, and adults based on age, genetics, and growth patterns.
                            This calculator uses the Khamis-Roche method, one of the most accurate height prediction models available. If your child is under four, or you are pregnant and curious about your baby's expected height, use the Mid-Parental Height Formula below instead, given below                        </p>

                        {/* <div className="bg-surface border border-border p-6 rounded-2xl inline-block text-left mx-auto sm:mx-0 mt-4 border-l-4 border-l-accent">
                            <h3 className="font-bold text-foreground mb-3 uppercase tracking-widest text-xs">Many parents search questions like:</h3>
                            <ul className="space-y-2 text-sm text-muted font-black uppercase tracking-wider">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will my child be?</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will my son be?</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will I be when I grow up?</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How can you determine how tall you will be?</li>
                            </ul>
                        </div>

                        <p className="text-muted leading-relaxed text-md max-w-3xl mx-auto sm:mx-0 font-medium">
                            A height predictor calculator provides a useful estimate based on genetics and current growth measurements. While no tool can guarantee an exact number, these models often come surprisingly close when accurate inputs are used.
                            Our calculator uses the Khamis-Roche height prediction method, one of the most widely used formulas for estimating adult height without requiring medical tests or X-rays.
                        </p> */}
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
                            <h2 id="how-does-a-height-calculator-work" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                How Does a Height Calculator Work?
                            </h2>
                            <p className="text-muted leading-relaxed font-medium">
                                A height calculator is a tool that combines current measurements (age, height, weight, and parental heights) and applies them to population growth data to produce a likely height range.
                            </p>


                            <div className="bg-surface border border-border p-6 rounded-2xl my-6 border-l-4 border-l-accent">
                                {/* <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest text-accent">
                                    How the prediction process works:
                                </h3> */}
                                <ul className="space-y-2 text-muted font-medium">
                                    <li className="flex items-start gap-2">
                                        <span><strong>1. Enter measurements:</strong> child's age, current height, weight, and both parents' heights. More inputs produce more accurate results.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span><strong>2. The model calculates:</strong> the calculator applies the growth formula to population data, adjusting for age, sex, and genetics.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span><strong>3. Get a predicted height range:</strong> The result is a likely adult height estimate, shown as a range rather than a single exact number.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* <p className="text-muted leading-relaxed font-medium">
                                These tools provide an estimated adult height range, which can help parents understand how their child’s development compares with typical growth patterns. The important thing to remember is that predictions are guidelines rather than guarantees.
                            </p> */}
                        </section>
                        <section className="space-y-6">
                            <div className="space-y-4">
                                <h2 id="how-tall-will-my-child-be" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                    How Tall Will My Child Be?
                                </h2>
                                <p className="text-muted leading-relaxed font-medium">
                                    No tool can predict a child's future height with complete certainty. However, research on child growth patterns makes it possible to estimate adult height with reasonable accuracy.
                                </p>
                            </div>

                            <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] border-l-4 border-l-accent shadow-sm">
                                <h3 className="font-bold text-foreground mb-6 text-sm uppercase tracking-widest text-accent">
                                    Modern height prediction calculators analyze three key factors:
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-tight">
                                            <CheckCircle2 className="text-accent w-4 h-4" /> Genetics
                                        </div>
                                        <p className="text-sm text-muted font-medium">responsible for 60–80% of final height.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-tight">
                                            <CheckCircle2 className="text-accent w-4 h-4" /> Current Growth
                                        </div>
                                        <p className="text-sm text-muted font-medium">Age, height, and weight measurements refine the estimate.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-tight">
                                            <CheckCircle2 className="text-accent w-4 h-4" /> Statistics
                                        </div>
                                        <p className="text-sm text-muted font-medium">Growth patterns observed across large populations by age and sex.</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed font-medium">
                                The result is an estimated adult height range: a useful guideline, not a guarantee. Children's growth patterns are individual and can vary significantly based on health, nutrition, and timing of puberty.
                            </p>
                        </section><section className="space-y-8 pt-8">
                            <div className="space-y-4">
                                <h2 id="how-tall-will-i-be" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                    How Tall Will I Be? Calculator for Teens & Adults
                                </h2>
                                <p className="text-muted leading-relaxed font-medium">
                                    Teens asking "how tall will I be" can use the  Khamis roche calculator. Enter your current age, height, weight, and your parents' heights for the most accurate estimate.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* TEENS CARD */}
                                <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-all" />
                                    <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter flex items-center gap-2">
                                        Teens (Under 18)
                                    </h3>
                                    <p className="text-muted leading-relaxed font-medium text-sm mb-4">
                                        Growth plates are still open. The Khamis-Roche calculator gives the best estimate. Use current measurements for maximum accuracy.
                                    </p>
                                    <ul className="space-y-3 text-muted font-medium text-sm">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                            Most reliable between ages 4–17
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                            Accuracy improves as you get closer to adult height
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                            Boys often grow until 18; girls until 15–16
                                        </li>
                                    </ul>
                                </div>

                                {/* ADULTS CARD */}
                                <div className="bg-surface border border-border p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tighter flex items-center gap-2">
                                        Adults (18+)
                                    </h3>
                                    <p className="text-muted leading-relaxed font-medium text-sm mb-4">
                                        Growth plates close after puberty. For adults, height prediction is no longer relevant, but the Mid-Parental Height Formula can still estimate what height their children may reach.
                                    </p>
                                    <ul className="space-y-3 text-muted font-medium text-sm">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            Adult height is already determined
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            Use the Parent's Height tool to predict children's height
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                            Use the height converter for unit conversion
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
                                <p className="text-sm font-bold text-foreground leading-relaxed">
                                    <span className="text-red-500 uppercase tracking-widest mr-2">Important Limitation:</span>
                                    No height calculator can account for medical conditions, growth hormone disorders, or premature puberty. If growth seems unusually fast or slow, consult a pediatrician.
                                </p>
                            </div>
                        </section>
                        <div className="bg-surface border border-accent/20 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 my-8 shadow-sm">
                            <p className="text-foreground font-medium text-sm md:text-base m-0 text-center sm:text-left leading-relaxed">
                                Ready to get your height prediction? The calculator is at the top of this page.
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
                                Use the Height Calculator
                            </Link>
                        </div>
                        <section className="space-y-4">
                            <h2 id="what-determines-child-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                What Determines Height?
                            </h2>
                            <p className="text-muted leading-relaxed font-medium">
                                A child's final adult height is shaped by two factors: genetics and environment. Understanding both helps set realistic expectations for height prediction.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                {/* GENETICS CARD */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all border-l-4 border-l-accent">
                                    <h4 className="font-black text-foreground text-lg mb-3 uppercase tracking-tight flex items-center gap-2">
                                        🧬 Genetics
                                    </h4>
                                    <p className="text-sm text-muted leading-relaxed font-medium">
                                        Accounts for <strong>60–80%</strong> of final height. Children of taller parents tend to be taller, but children of very tall or very short parents often grow closer to the average population height, a phenomenon called <strong>regression toward the mean.</strong>
                                    </p>
                                </div>

                                {/* NUTRITION & SLEEP CARD */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all border-l-4 border-l-green-500">
                                    <h4 className="font-black text-foreground text-lg mb-3 uppercase tracking-tight flex items-center gap-2">
                                        🥦 Nutrition & Sleep
                                    </h4>
                                    <p className="text-sm text-muted leading-relaxed font-medium mb-3">
                                        Remaining <strong>20–40%</strong> comes from environment.
                                    </p>
                                    <ul className="text-xs text-muted space-y-2 font-bold uppercase tracking-wider">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Protein, Calcium, Vitamin D, Zinc</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> 9–11 hrs sleep (School-age)</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> 8–10 hrs for teenagers</li>
                                    </ul>
                                </div>

                                {/* GROWTH TIMING CARD */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all border-l-4 border-l-amber-500">
                                    <h4 className="font-black text-foreground text-lg mb-3 uppercase tracking-tight flex items-center gap-2">
                                        ⏱ Growth Timing
                                    </h4>
                                    <p className="text-sm text-muted leading-relaxed font-medium">
                                        Early puberty may produce a taller child temporarily but a shorter adult. Late puberty often results in a longer growth window and greater final height.
                                    </p>
                                </div>
                            </div>

                            {/* <p className="text-muted leading-relaxed font-medium mt-6">
                                While researchers studying human growth and development estimate that genetics explains most of the variation, environmental influences determine how fully that genetic potential is reached.
                            </p> */}
                        </section>
                        {/* <div className="grid md:grid-cols-1 gap-8">
                            <section className="space-y-4">
                                <h2 id="when-do-boys-stop-growing" className="text-2xl font-black tracking-tight text-blue-500 uppercase tracking-tight scroll-mt-24">When Do Boys Stop Growing?</h2>
                                <p className="text-muted leading-relaxed font-medium">Boys usually experience their main growth spurt during puberty. The typical growth timeline for boys looks like this:</p>
                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-blue-500 font-bold uppercase tracking-wide text-xs">
                                    <li>Early puberty begins around age 11–12</li>
                                    <li>Rapid growth occurs between ages 13 and 15</li>
                                    <li>Growth slows around 16–17</li>
                                </ul>
                                <p className="text-muted leading-relaxed font-medium">
                                    During peak puberty, boys can grow 3–4 inches per year. Most boys stop growing around 18 years old, although small increases in height may continue until around age 20.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 id="when-do-girls-stop-growing" className="text-2xl font-black tracking-tight text-pink-500 uppercase tracking-tight scroll-mt-24">When Do Girls Stop Growing?</h2>
                                <p className="text-muted leading-relaxed font-medium">Girls generally begin puberty earlier than boys. Typical growth timeline:</p>
                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-pink-500 font-bold uppercase tracking-wide text-xs">
                                    <li>Puberty begins around age 9–10</li>
                                    <li>Growth spurt occurs between ages 10 and 14</li>
                                </ul>
                                <p className="text-muted leading-relaxed font-medium">
                                    Most girls reach their adult height between 15 and 16 years old. Because girls experience puberty earlier, they often appear taller than boys during late childhood.
                                </p>
                            </section>
                        </div> */}

                        <section className="space-y-4">
                            <h2 id="boys-girls-growth-charts" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                Average Height by Age (Growth Charts)
                            </h2>
                            <p className="text-muted leading-relaxed font-medium">
                                <a
                                    href="https://www.cdc.gov/growthcharts/cdc-growth-charts.htm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-black hover:underline px-1"
                                >
                                    CDC growth charts
                                </a>
                                track average height and weight from birth to young adulthood, covering boys and girls from ages 2 through 18. They show where a child falls on the height percentile chart relative to peers.
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-2xl my-6 border-l-4 border-l-accent shadow-sm">
                                <div className="space-y-4">
                                    <p className="text-muted leading-relaxed font-medium">
                                        The <strong>50th percentile</strong> represents the median height for that age and sex. Healthy children typically fall between the 3rd and 97th percentile.
                                    </p>
                                    <div className="flex items-start gap-3 bg-accent/5 p-4 rounded-xl border border-accent/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <p className="text-sm font-bold text-foreground leading-relaxed italic">
                                            Note: Pediatricians focus less on a single measurement and more on whether a child stays on a consistent growth curve over time.
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
                                <h2 id="height-prediction-comparison" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                    Height Calculator vs. Growth Charts
                                </h2>
                                <p className="text-muted leading-relaxed font-medium">
                                    Different tools answer different questions. Use this comparison to understand when to use each method.
                                </p>
                            </div>

                            <div className="overflow-x-auto rounded-[2rem] border border-border bg-surface shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-accent/5 border-b border-border">
                                            <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-foreground">Factor</th>
                                            <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-accent">Height Calculator</th>
                                            <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-foreground">Growth Chart</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">Purpose</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">Predict future adult height</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">Track current growth vs peers</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">Data needed</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">Age, height, weight, parent heights</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">Age + current height</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">Best for</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">Parents, teens, curiosity</td>
                                            <td className="p-4 md:p-6 text-muted font-medium">Monitoring growth over time</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">Requires doctor</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">No (use online)</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">No (use online)</td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">Typical accuracy</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">±2–4 inches</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">Shows percentile, not prediction</td>
                                        </tr>
                                        <tr className="hover:bg-accent/[0.02] transition-colors">
                                            <td className="p-4 md:p-6 font-bold text-foreground uppercase text-[10px] tracking-wider opacity-60">Works without parents</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">Partial (less accurate)</td>
                                            <td className="p-4 md:p-6 text-accent font-medium">✓ Yes</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>


                        <div className="grid md:grid-cols-1 gap-8">
                            {/* BOYS GROWTH SECTION */}
                            <section className="space-y-4 bg-blue-500/5 p-6 md:p-8 rounded-[2.5rem] border border-blue-500/10 shadow-sm" id="boys-growth">
                                <h2 className="text-2xl font-black tracking-tight text-blue-500 uppercase scroll-mt-24">When Do Boys Stop Growing?</h2>

                                <p className="text-muted leading-relaxed font-medium">Boys usually experience their main growth spurt during <strong>puberty</strong>.</p>

                                <p className="text-muted leading-relaxed font-medium">The typical growth timeline for boys looks like this:</p>

                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-blue-500 font-bold uppercase tracking-wide text-xs">
                                    <li>early puberty begins around <strong>age 11–12</strong></li>
                                    <li>rapid growth occurs between <strong>ages 13 and 15</strong></li>
                                    <li>growth slows around <strong>16–17</strong></li>
                                </ul>

                                <p className="text-muted leading-relaxed font-medium text-sm">During peak puberty, boys can grow <strong>3–4 inches per year</strong>. Most boys stop growing around age 18, although small increases may continue until around age 20.</p>
                            </section>


                            {/* GIRLS GROWTH SECTION */}
                            <section className="space-y-4 bg-pink-500/5 p-6 md:p-8 rounded-[2.5rem] border border-pink-500/10 shadow-sm" id="girls-growth">
                                <h2 className="text-2xl font-black tracking-tight text-pink-500 uppercase scroll-mt-24">When Do Girls Stop Growing?</h2>

                                <p className="text-muted leading-relaxed font-medium">Girls generally begin puberty earlier than boys.</p>

                                <p className="text-muted leading-relaxed font-medium">Typical growth timeline:</p>

                                <ul className="text-muted space-y-2 list-disc pl-5 marker:text-pink-500 font-bold uppercase tracking-wide text-xs">
                                    <li>puberty begins around <strong>age 9–10</strong></li>
                                    <li>growth spurt occurs between <strong>ages 10 and 14</strong></li>
                                </ul>

                                <p className="text-muted leading-relaxed font-medium text-sm">Most girls reach their adult height between <strong>15 and 16 years old</strong>. Because girls experience puberty earlier, they often appear taller than boys during late childhood.</p>
                            </section>

                        </div>



                        <section className="space-y-6 pt-8">
                            <h2 id="predict-child-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">Height prediction methods Explained</h2>
                            <h4 className="text-xl font-black text-foreground mt-2 uppercase tracking-tighter">
                                How to Predict Your Child's Height
                            </h4>
                            <p className="text-muted leading-relaxed mb-6 font-medium">
                                Researchers use several formulas to estimate adult height. Each method balances accuracy against the data it requires.

                            </p>

                            <div className="space-y-8">
                                {/* KHAMIS-ROCHE METHOD */}
                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                            Most Accurate
                                        </span>
                                        <h3 id="khamis-roche-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                            Khamis-Roche Method
                                        </h3>
                                    </div>

                                    <p className="text-muted leading-relaxed  font-medium">
                                        Considered the most accurate height prediction method that does not require bone age testing. Analyzes four inputs: child's age, height, weight, and average height of both parents.                                    </p>
                                    <p className="text-muted leading-relaxed mb-6 font-medium">Developed after studying thousands of children's growth patterns using linear regression analysis applied to population-level growth data. Because it includes current body measurements, it outperforms genetics-only formulas.</p>
                                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                        <ul className="text-foreground text-base space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-0.5" />
                                                <span>Accuracy: <strong>±2.1 inches for boys, ±1.7 inches for girls</strong></span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-0.5" />
                                                <span>Best for children older than 4 years</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-5 h-5 shrink-0 mt-0.5" />
                                                <span>Most reliable non-clinical prediction available</span>
                                            </li>
                                        </ul>

                                        <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-800 mt-4">
                                            ✓ Used by this calculator
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-foreground uppercase tracking-widest opacity-70">
                                            Have your child's age, height, weight, and parents' heights ready?
                                        </p>
                                        <Link
                                            href="#top"
                                            className="bg-accent text-white px-4 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                                        >
                                            <ArrowUpCircle size={35} /> Calculate with Khamis-Roche Now ↑
                                        </Link>
                                    </div>
                                </div>

                                {/* MID-PARENTAL HEIGHT */}
                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                    {/* BADGE AND HEADING CONTAINER */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                            SIMPLE
                                        </span>
                                        <h3 id="height-calculator-based-on-parents" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                            Height Predictor Based on Parents (Mid-Parental Height Formula)
                                        </h3>
                                    </div>

                                    <p className="text-muted leading-relaxed mb-6 font-medium">
                                        The Mid-Parental Height Formula is the simplest way to estimate a child's adult height using only the parents' heights. It requires no medical testing and works for any age, including babies and unborn children.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-bg border border-border p-5 rounded-2xl border-l-4 border-l-blue-500">
                                            <span className="font-black text-foreground block mb-2 text-xs uppercase tracking-widest text-blue-500">For Boys (US Units)</span>
                                            <code className="text-foreground text-sm font-black tracking-tight bg-blue-500/10 px-1 py-1 rounded-lg">(Father + Mother + 5 in) ÷ 2</code>
                                        </div>
                                        <div className="bg-bg border border-border p-5 rounded-2xl border-l-4 border-l-pink-500">
                                            <span className="font-black text-foreground block mb-2 text-xs uppercase tracking-widest text-pink-500">For Girls (US Units)</span>
                                            <code className="text-foreground text-sm font-black tracking-tight bg-pink-500/10 px-1 py-1 rounded-lg">(Father + Mother - 5 in) ÷ 2</code>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                        <ul className="text-foreground text-base space-y-3 font-black uppercase tracking-tight">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>Works for babies and young children when no current growth data is available</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>Typical accuracy: within ±4 inches (10 cm) of final adult height</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>Does not account for current growth trajectory. Use Khamis-Roche for children over 4</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                                <span>Can also be used as a rough baby height calculator or for unborn children</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-foreground uppercase tracking-widest opacity-70">
                                            Only have parents' heights? Use the Mid-Parental Height Formula calculator above.
                                        </p>
                                        <Link
                                            href="#top"
                                            className="bg-accent text-white px-4 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                                        >
                                            <ArrowUpCircle size={35} /> Scroll to top and calculate now ↑
                                        </Link>
                                    </div>
                                </div>

                                {/*  BONE AGE METHOD */}
                                {/* <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 id="bone-age-method" className="text-2xl font-black text-foreground mb-4 scroll-mt-24 uppercase tracking-tighter">Bone Age Method (Clinical Height Prediction)</h3>
                                    <p className="text-muted leading-relaxed font-medium">
                                        Doctors use X-rays of the left wrist to determine how mature the bones are compared with chronological age. Growth plates are thin cartilage bands; their thickness reveals how much growth remains.
                                    </p>
                                    <p className="text-muted leading-relaxed mt-6 mb-4 font-bold uppercase text-xs tracking-widest opacity-70">Clinical evaluation methods include:</p>
                                    <ul className="text-foreground space-y-3 font-black uppercase tracking-tight">
                                        <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> Greulich-Pyle method</li>
                                        <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> Tanner-Whitehouse method</li>
                                    </ul>
                                    <p className="text-muted leading-relaxed mt-6 font-medium">
                                        This is the most accurate prediction method available, but is usually reserved for cases where doctors suspect growth disorders or delayed puberty.
                                    </p>
                                </div> */}
                            </div>
                        </section>

                        {/* BONE AGE METHOD */}
                        <section className="space-y-6 pt-2">
                            <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                {/* BADGE AND HEADING CONTAINER */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                        CLINICAL
                                    </span>
                                    <h3 id="bone-age-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                        Bone Age Method (Wrist X-Ray)
                                    </h3>
                                </div>

                                <p className="text-muted leading-relaxed mb-6 font-medium">
                                    Doctors use X-rays of the left wrist to assess growth plate maturity. Growth plates are thin cartilage bands. Their thickness reveals how much growth remains.
                                </p>

                                <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                    <ul className="text-foreground text-base space-y-3 font-black uppercase tracking-tight">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                            <span>Most accurate prediction method available</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                            <span>Used only when doctors suspect growth disorders</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="text-accent w-4 h-4 mt-1 shrink-0" />
                                            <span>Evaluation methods: Greulich-Pyle, Tanner-Whitehouse</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* GROWTH PLATE VISUALIZER */}
                        {/* <div id='how-wrist-x-ray-predict-child-height' className="scroll-mt-24 bg-surface border border-border rounded-3xl overflow-hidden p-2 shadow-xl" style={{ minHeight: '400px' }}>
                            <DynamicGrowthPlateExplainer />
                        </div>
 */}


                        {/* SUPPLEMENTARY CLINICAL METHODS */}
                        {/* BAYLEY-PINNEAU METHOD */}
                        <section className="space-y-6 pt-2">
                            <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />

                                {/* BADGE AND HEADING CONTAINER */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider w-fit">
                                        CLINICAL
                                    </span>
                                    <h3 id="bayley-pinneau-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                        Bayley-Pinneau Method
                                    </h3>
                                </div>

                                <p className="text-muted leading-relaxed font-medium">
                                    Combines bone age data with height-for-age tables. Calculates the percentage of adult height already achieved to determine remaining growth potential. Requires bone age testing.
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
                                        CLINICAL
                                    </span>
                                    <h3 id="roche-wainer-thissen-method" className="text-2xl font-black text-foreground uppercase tracking-tighter scroll-mt-24">
                                        Roche-Wainer-Thissen Method
                                    </h3>
                                </div>

                                <p className="text-muted leading-relaxed font-medium">
                                    Uses bone age, current height, weight, and parental heights. Improves accuracy in some cases over Khamis-Roche but requires clinical bone age measurement. Primarily used in medical settings.
                                </p>
                            </div>
                        </section>
                        <section id="increase" className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24 uppercase">
                                Can You <span className="text-[#3B6CF4]">Increase Height</span>?
                            </h2>
                            <p className="text-muted leading-relaxed font-medium text-[14px]">
                                Your genes largely decide how tall you'll be. But how well you eat, sleep, and stay active during childhood can make a real difference in whether you reach that potential.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-4">
                                {/* Nutrition */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent flex items-center gap-2">
                                        <span className="text-lg"></span> Nutrition
                                    </h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed mb-2">
                                        Adequate nutrition supports bone development. Key nutrients:
                                    </p>
                                    <ul className="text-sm text-muted font-medium space-y-1 list-disc pl-5">
                                        <li>Protein</li>
                                        <li>Calcium</li>
                                        <li>Vitamin D</li>
                                        <li>Zinc</li>
                                    </ul>
                                </div>

                                {/* Sleep */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent flex items-center gap-2">
                                        <span className="text-lg"></span> Adequate Sleep
                                    </h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed mb-2">
                                        Growth hormone peaks during deep sleep.
                                    </p>
                                    <ul className="text-sm text-muted font-medium space-y-1 list-disc pl-5">
                                        <li>9–11 hrs for school-age children</li>
                                        <li>8–10 hrs for teenagers</li>
                                    </ul>
                                </div>

                                {/* Exercise */}
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent flex items-center gap-2">
                                        <span className="text-lg"></span> Regular Exercise
                                    </h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">
                                        Supports bone strength and overall development. Running, jumping, and sports encourage healthy bone growth.
                                    </p>
                                </div>
                            </div>

                            {/* Warning Box */}
                            <div className="bg-[#fffbeb] border border-[#fde68a] border-l-4 border-l-[#f59e0b] rounded-r-2xl p-6 mt-6">
                                <p className="text-sm text-[#78350f] font-medium leading-relaxed">
                                    <strong>Important:</strong> No exercise, supplement, or stretching program can increase height once growth plates close. Predictions are estimates. Genetics is the dominant factor.
                                </p>
                            </div>
                        </section>


                        <section className="space-y-4" id="accuracy">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-1.5 flex items-center gap-1.5">
                                Height calculator accuracy
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">
                                How <span className="text-accent underline decoration-4 underline-offset-4">Accurate</span> Is a Height Calculator?
                            </h2>

                            <p className="text-muted leading-relaxed font-medium">This height predictor uses the Khamis-Roche growth model, trained on long-term studies of child growth data.</p>

                            <ul className="space-y-3 text-muted font-medium">
                                <li className="flex items-start gap-2"><span className="shrink-0 text-green-500">✅</span> Most predictions fall within 5–10 cm (2–4 inches) of final adult height</li>
                                <li className="flex items-start gap-2"><span className="shrink-0 text-green-500">✅</span> Accuracy is highest when the child is older than 4 years</li>
                                <li className="flex items-start gap-2"><span className="shrink-0 text-green-500">✅</span> Accurate height and weight measurements improve results significantly</li>
                                <li className="flex items-start gap-2"><span className="shrink-0 text-green-500">✅</span> Correct parent height data is required for reliable output</li>
                                <li className="flex items-start gap-2"><span className="shrink-0 text-amber-500">⚠️</span> Results are a likely range, not an exact value</li>
                                <li className="flex items-start gap-2"><span className="shrink-0 text-amber-500">⚠️</span> Not suitable for children with known growth disorders</li>
                                <li className="flex items-start gap-2"><span className="shrink-0 text-amber-500">⚠️</span> Early or late puberty can reduce prediction accuracy</li>
                            </ul>

                            <div style={{ margin: '16px 0', padding: '12px 16px', background: 'color-mix(in srgb, var(--accent) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: '600', color: 'var(--accent)', textAlign: 'center' }}>
                                The result represents a likely range rather than an exact value.
                            </div>

                            <div className="text-xs text-muted leading-relaxed font-medium bg-muted/20 p-4 rounded-xl border border-border mt-6">
                                <strong>Medical disclaimer:</strong> This height calculator is for informational purposes only. It is not a substitute for professional medical advice. If you have concerns about your child's growth, consult a qualified pediatrician or endocrinologist.
                            </div>
                        </section>
                        {/* 
                        <div className="h-px w-full bg-border my-12" />

                        <section id='boys-height-predictor' className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-8 uppercase">Understanding Growth Timelines</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                Male and female growth patterns differ significantly. Boys usually experience a later but longer growth spurt, while girls reach adult height earlier.
                            </p>
                            <p className="text-muted leading-relaxed mt-4 font-bold uppercase text-xs tracking-widest opacity-80">During peak puberty growth:</p>
                            <ul className="text-foreground space-y-3 font-black uppercase tracking-tight">
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500" /> Boys grow around 3–4 inches per year</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-pink-500" /> Girls grow around 2.5–3 inches per year</li>
                            </ul>
                            <p className="text-muted leading-relaxed mt-6 font-medium">
                                Early puberty may produce a taller child temporarily but a shorter adult, whereas late puberty often results in a longer growth window and greater final height.
                            </p>
                        </section> */}

                        {/* <section className="space-y-6">
                            <h2 id="how-to-get-taller-as-a-kid" className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24 uppercase">Factors Affecting Height</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                Genetics determines the maximum potential, but lifestyle factors influence whether that potential is achieved.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-4">
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Healthy Diet</h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">Protein, Calcium, Vitamin D, and Zinc support bone development.</p>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Adequate Sleep</h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">9–11 hrs for school-age; 8–10 hrs for teens. Growth hormone peaks during deep sleep.</p>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Regular Exercise</h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">Physical activity supports bone strength and healthy development.</p>
                                </div>
                            </div>
                            <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-3xl mt-6">
                                <p className="text-sm font-bold text-foreground leading-relaxed italic">
                                    Note: No exercise or supplement can increase height once growth plates close. If growth seems unusually fast or slow, consult a pediatrician.
                                </p>
                            </div>
                        </section> */}
                        {/* 
                        <section className="space-y-4">
                            <h2 id="accuracy" className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24 uppercase">How Accurate Is Our Child Height Predictor?</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                Our child height predictor calculator estimates adult height using the Khamis Roche growth model. This model uses real growth data collected from long term studies of children. Most predictions fall within five to ten centimeters of final adult height.
                            </p>
                            <p className="text-muted leading-relaxed font-bold uppercase text-xs tracking-widest opacity-80 mt-6 mb-4">The calculator works best when:</p>
                            <ul className="text-foreground space-y-3 font-black uppercase tracking-tight">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> The child is older than four years</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> Accurate height and weight measurements are used</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> Parent height data is correct</li>
                            </ul>
                            <p className="text-xl font-black text-accent mt-8 uppercase tracking-tighter">
                                The result represents a likely range rather than an exact value.
                            </p>
                        </section>
                        */}
                    </div>

                    {/* FAQ Accordion Section */}
                    <section id="child-height-calculator-faq" className="scroll-mt-24 space-y-6">
                        {/* <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-foreground">
                                Height Calculator FAQs
                            </h2>
                        <div className="bg-surface border border-border p-6 rounded-2xl inline-block text-left mx-auto sm:mx-0 mt-4 border-l-4 border-l-accent">
                                <h3 className="font-bold text-foreground mb-3 uppercase tracking-widest text-xs">Many parents search questions like:</h3>
                                <ul className="space-y-2 text-sm text-muted font-black uppercase tracking-wider">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will my child be?</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will my son be?</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How tall will I be when I grow up?</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> How can you determine how tall you will be?</li>
                                </ul>
                            </div>


                        <div className="flex items-center gap-2 pt-4">
                                <span className="text-xl">🙋</span>
                                <h3 className="font-bold uppercase tracking-wider text-sm">Frequently Asked Questions</h3>
                            </div>
                        </div> */}

                        <FaqAccordion
                            items={CHILD_HEIGHT_QA}
                            description=""
                        />
                    </section>
                    {/* Related Tools Section */}
                    <section id="related-tools" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-foreground">
                            Related Tools
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Height Comparison Tool */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">Height Comparison Tool</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    Visualize height differences between people, celebrities, and objects on a proportional scale.
                                </p>
                                <Link href="/" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    Compare heights →
                                </Link>
                            </div>

                            {/* Image to Height Tool */}
                            {/* Corrected Related Tool Block */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">Image to Height Tool</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    Estimate height from photos by comparing subjects against known reference objects or surroundings.
                                </p>
                                <Link href="/image-to-height" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    Estimate from image →
                                </Link>
                            </div>
                            {/* Height & Weight Percentile */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">Height & Weight Percentile</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    Find where your child's height and weight sit within the population using WHO and CDC data.
                                </p>
                                <Link href="/height-weight-percentile-calculator" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    Check percentile →
                                </Link>
                            </div>

                            {/* Average Height by Country */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">Average Height by Country</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    Global height data for 46 countries. Sortable table, regional charts, and world map.
                                </p>
                                <Link href="/average-height-by-country" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    Explore data →
                                </Link>
                            </div>

                            {/* Ideal Body Weight Calculator */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">Ideal Body Weight Calculator</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    Calculate ideal weight using Devine, Robinson, and Hamwi formulas side by side.
                                </p>
                                <Link href="/ideal-body-weight-calculator" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    Calculate IBW →
                                </Link>
                            </div>

                            {/* Height Difference Calculator */}
                            <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col h-full">
                                <h3 className="font-bold text-foreground mb-2">Height Difference Calculator</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    Calculate the exact gap between two heights in cm, inches, and percentage difference.
                                </p>
                                <Link href="/height-difference-calculator" className="text-[#3B6CF4] font-bold text-sm flex items-center gap-1 hover:underline">
                                    Calculate difference →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* References Section */}
                    <div id="references" className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 text-sm text-muted mt-6 font-medium shadow-sm scroll-mt-24">
                        <h3 className="font-extrabold text-foreground mb-6 uppercase tracking-[0.2em] text-[10px] opacity-60">Scientific Bibliography & Data Sources</h3>
                        <ul className="space-y-4 break-words overflow-hidden list-disc pl-5 marker:text-accent/40">
                            <li>Centers for Disease Control and Prevention. CDC Growth Charts. <br /><a href="https://www.cdc.gov/growthcharts" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.cdc.gov/growthcharts</a></li>
                            <li>National Institutes of Health. Child Growth and Development Overview. </li>
                            <li>Silventoinen K. Determinants of variation in adult body height. Journal of Biosocial Science. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/12664962/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://pubmed.ncbi.nlm.nih.gov/12664962/</a></li>
                            <li>World Health Organization. Child Growth Standards. <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                            <li>National Sleep Foundation. Growth Hormone and Sleep in Children. <br /><a href="https://www.sleepfoundation.org/children-and-sleep" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.sleepfoundation.org/children-and-sleep</a></li>
                            {/* <li>American Academy of Pediatrics. Physical Development in Adolescence. <br /><a href="https://www.healthychildren.org" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.healthychildren.org</a></li> */}
                            <li>Khamis HJ, Roche AF. Predicting adult stature without using skeletal age. Pediatrics. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/7936860/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://pubmed.ncbi.nlm.nih.gov/7936860/</a></li>
                            <li>Tanner JM. Growth at Adolescence. Blackwell Scientific Publications.</li>
                            <li>Greulich WW, Pyle SI. Radiographic Atlas of Skeletal Development of the Hand and Wrist.</li>
                            <li>Tanner JM, Whitehouse RH. Assessment of Skeletal Maturity.</li>
                            <li>Bayley N, Pinneau SR. Tables for predicting adult height from skeletal age.</li>
                            <li>Roche AF, Wainer H, Thissen D. Predicting adult stature for individuals.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}