import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ExampleCalculationVisual from '@/components/height-weight-percentile-calculator/ExampleCalculationVisual';
import HeightPercentileTool from '@/components/height-weight-percentile-calculator/HeightPercentileTool';
import BellCurveIllustration from '@/components/height-weight-percentile-calculator/BellCurveIllustration';
import WHOvsCDCVisual from '@/components/height-weight-percentile-calculator/WHOvsCDCVisual';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import { PERCENTILE_FAQ } from '@/constants/percentile';

const tocItems = [
    { id: 'calculate-your-height-and-weight-percentile', label: 'Calculate Your Height and Weight Percentile' },
    { id: 'what-does-height-and-weight-percentile-mean', label: 'What Does Height and Weight Percentile Mean?' },
    { id: 'how-the-height-and-weight-percentile-calculator-works', label: 'How the Height and Weight Percentile Calculator Works' },
    {
        id: 'height-percentile-calculator-by-age-group',
        label: 'Height Percentile Calculator by Age Group',
        subItems: [
            { id: 'height-percentile-calculator-for-babies-and-infants', label: 'Height Percentile Calculator for Babies and Infants' },
            { id: 'height-percentile-calculator-for-toddlers-and-kids', label: 'Height Percentile Calculator for Toddlers and Kids' },
            { id: 'height-percentile-calculator-for-boys-and-girls', label: 'Height Percentile Calculator for Boys and Girls' },
            { id: 'height-percentile-calculator-for-adults', label: 'Height Percentile Calculator for Adults' }
        ]
    },
    { id: 'us-height-percentile-calculator', label: 'US Height Percentile Calculator' },
    { id: 'how-to-interpret-height-percentile-result', label: 'How to Interpret Your Height Percentile Result' },
    { id: 'example-height-percentile-calculation', label: 'Example Height Percentile Calculation' },
    { id: 'why-height-percentiles-are-used-in-pediatric-growth-monitoring', label: 'Why Height Percentiles Are Used in Pediatric Growth Monitoring' },
    { id: 'try-the-height-and-weight-percentile-calculator', label: 'Try the Height and Weight Percentile Calculator' },
    { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' }
];

export default function PercentileCalculatorPage() {
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative">
            {/* --- Sidebar TOC --- */}
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={tocItems} />
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* Title Section */}
                    <div className="space-y-6 text-center sm:text-left mt-4 leading-relaxed">
                        <h1 id="calculate-your-height-and-weight-percentile" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                            Height and Weight Percentile Calculator
                        </h1>
                        <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                        <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0">
                            Compare your height and weight against population reference data from the <span className="text-accent font-bold">World Health Organization</span> and the <span className="text-accent font-bold">Centers for Disease Control and Prevention</span>. The tool covers babies, toddlers, children, and adults. Enter your age, sex, height, and weight to get your height percentile and weight percentile instantly.
                        </p>
                        <p className="text-sm text-muted/80 italic max-w-3xl mx-auto sm:mx-0">
                            For informational use only. Consult a pediatrician or healthcare provider for clinical growth assessments.
                        </p>
                    </div>

                    {/* Calculator Component Island */}
                    <section id="calculate-your-height-and-weight-percentile-tool" className="scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Calculate Your Height and Weight Percentile</h2>
                        <HeightPercentileTool />
                    </section>

                    <section id="what-does-height-and-weight-percentile-mean" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">What Does Height and Weight Percentile Mean?</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            A growth percentile shows how one person&apos;s measurement compares to a reference group of the same age and sex. The <span className="text-accent font-bold">World Health Organization</span> defines the 50th percentile as the median: exactly half the reference population falls above it and half falls below.
                        </p>
                        <p className="text-muted leading-relaxed font-medium">
                            Percentile does not mean percentage of a maximum. A child at the 90th percentile for height is taller than 90 out of 100 children of the same age and sex in the reference group. It says nothing about how tall they can grow.
                        </p>

                        <div className="bg-bg border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Two reference points that clarify the scale:</h3>
                            <ul className="space-y-2 text-muted">
                                <li className="flex items-start gap-2 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> <strong>50th percentile height</strong> = the average for that age and sex</li>
                                <li className="flex items-start gap-2 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> <strong>90th percentile height</strong> = taller than 90% of peers the same age</li>
                            </ul>
                        </div>

                        <p className="text-muted leading-relaxed font-medium">
                            A low result on the percentile height calculator does not mean something is wrong. A high result does not flag a problem. What matters is the pattern across multiple measurements over time, not a single number in isolation.
                        </p>

                        <BellCurveIllustration />
                    </section>

                    <section id="how-the-height-and-weight-percentile-calculator-works" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">How the Height and Weight Percentile Calculator Works</h2>
                        <div className="text-muted leading-relaxed font-medium">
                            The height weight percentile calculator maps your inputs to published growth datasets from the
                            <a
                                href="https://www.cdc.gov/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-semibold hover:underline"
                            > CDC </a> and
                            <a
                                href='https://www.who.int/'
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-semibold hover:underline"
                            > WHO </a> and returns a percentile rank for height and weight separately. The process follows four steps:
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">Step 1</span>
                                <p className="text-sm text-foreground font-bold mt-2">Enter age, sex, height, and weight</p>
                            </div>
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">Step 2</span>
                                <p className="text-sm text-foreground font-bold mt-2">Match inputs to CDC or WHO reference dataset</p>
                            </div>
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">Step 3</span>
                                <p className="text-sm text-foreground font-bold mt-2">Calculate percentile rank using age- and sex-matched curves</p>
                            </div>
                            <div className="bg-surface border border-border p-5 rounded-2xl">
                                <span className="text-xs font-black text-accent uppercase tracking-widest">Step 4</span>
                                <p className="text-sm text-foreground font-bold mt-2">Display numeric percentile and plain-language result</p>
                            </div>
                        </div>

                        <div className="text-muted leading-relaxed mt-6 font-medium">
                            For children aged 0 to 2, the tool uses
                            <a
                                href='https://www.who.int/tools/child-growth-standards'
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-semibold hover:underline"
                            > WHO Child Growth Standards</a>. From age 2 onward, it switches to CDC growth charts, the standard reference in US clinical practice. The pediatric height weight percentile calculator applies the correct dataset based on the age you enter. No manual switching is needed.
                        </div>

                        <WHOvsCDCVisual />
                    </section>

                    <section id="height-percentile-calculator-by-age-group" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Height Percentile Calculator by Age Group</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            Growth patterns shift at different life stages. The tool adjusts its reference data based on whether you calculate for a baby, a school-age child, or an adult.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 my-6">
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">Ages 0–2</span>
                                    <p className="text-muted text-sm font-medium">WHO Child Growth Standards</p>
                                </div>
                            </div>
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">Ages 2–20</span>
                                    <p className="text-muted text-sm font-medium">CDC Growth Charts</p>
                                </div>
                            </div>
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">Adults</span>
                                    <p className="text-muted text-sm font-medium">NHANES Population Data</p>
                                </div>
                            </div>
                            <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground block text-sm">Boys and Girls</span>
                                    <p className="text-muted text-sm font-medium">Sex-specific reference curves</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10 mt-8">
                            <div id="height-percentile-calculator-for-babies-and-infants" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70">Height Percentile Calculator for Babies and Infants</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    The infant height weight percentile calculator uses <span className='text-accent font-bold '> WHO Growth Standards </span> for children in the first two years of life. WHO built this dataset from data collected across six countries to create an international reference. The baby height percentile calculator tracks length measured lying down, not standing height. Infants gain several centimeters in a single month during this period, so small percentile shifts between visits are normal.
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    The infant height percentile calculator produces the most useful information when you run it across multiple well-baby visits rather than as a one-time check.
                                </p>
                            </div>

                            <div id="height-percentile-calculator-for-toddlers-and-kids" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70" >Height Percentile Calculator for Toddlers and Kids</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    From age 2 through adolescence, the child height weight percentile calculator draws on <span className='text-accent font-bold'> CDC growth chart</span> reference data. Growth in this phase is steadier than in infancy but follows clear age-specific patterns. The child height percentile calculator accounts for age in months rather than years to keep results accurate for children who fall between birthdays.
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    Parents often run the height and weight percentile calculator for kids before annual checkups to understand what the numbers mean before meeting the pediatrician. The tool does not replace a clinical assessment.
                                </p>
                            </div>

                            <div id="height-percentile-calculator-for-boys-and-girls" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70">Height Percentile Calculator for Boys and Girls</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    Boys and girls follow separate growth curves, especially after age 8. Girls typically begin their growth spurt around ages 10 to 11. Boys tend to peak between ages 12 and 14. The height percentile girl calculator and the height percentile calculator for boys each reference sex-specific datasets from the CDC.
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    Entering the correct sex is the single most important input for an accurate result. A girl measured against a male growth chart would show a meaningfully different percentile than her correct female result. The calculator applies the right curve automatically.
                                </p>
                            </div>

                            <div id="height-percentile-calculator-for-adults" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide text-sm opacity-70">Height Percentile Calculator for Adults</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    Adults do not grow, so the adult height percentile calculator compares your height against a fixed population distribution rather than an age-adjusted growth curve. Reference data for adults comes from national health surveys including <span className='text-accent font-bold'>NHANES</span>. The height percentile calculator for adults is a straightforward population comparison: you are either taller or shorter than a given percentage of adults of the same sex.
                                </p>
                                <p className="text-muted leading-relaxed mt-2 font-medium">
                                    The adult male height percentile calculator uses male-specific distributions because adult male and female height distributions are distinct. A result at the 50th percentile on the US adult male height percentile calculator corresponds to approximately 5 feet 9 inches (175 cm).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="us-height-percentile-calculator" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">US Height Percentile Calculator</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            The US height percentile calculator draws on growth data published by the <span className='text-accent font-bold'>Centers for Disease Control and Prevention</span>. CDC growth charts cover children and adolescents aged 2 to 20 and come from nationally representative US population data collected across multiple survey cycles.
                        </p>
                        <p className="text-muted leading-relaxed font-medium">
                            For US adults, the calculator uses height distributions from the <span className='text-accent font-bold'>National Health and Nutrition Examination Survey (NHANES)</span>. NHANES provides the reference population for all adult percentile comparisons in this tool.
                        </p>
                    </section>

                    <section id="how-to-interpret-height-percentile-result" className="space-y-6 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">How to Interpret Your Height Percentile Result</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            A single percentile height calculator result is a snapshot, not a diagnosis. Use this table to read your result:
                        </p>

                        <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-bg border-b border-border text-foreground font-black uppercase tracking-widest text-[11px]">
                                    <tr>
                                        <th className="px-6 py-4">Percentile range</th>
                                        <th className="px-6 py-4">Interpretation</th>
                                        <th className="px-6 py-4">What it suggests</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted divide-y divide-border/50 font-medium">
                                    <tr className="hover:bg-bg/50 transition-colors">
                                        <td className="px-6 py-4 font-black text-accent text-lg">90 to 100</td>
                                        <td className="px-6 py-4">Very tall compared to peers</td>
                                        <td className="px-6 py-4">Well above average for age and sex</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors">
                                        <td className="px-6 py-4 font-black text-foreground">75 to 90</td>
                                        <td className="px-6 py-4">Above average</td>
                                        <td className="px-6 py-4">Taller than most peers</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors">
                                        <td className="px-6 py-4 font-black text-foreground">25 to 75</td>
                                        <td className="px-6 py-4 italic">Average height range</td>
                                        <td className="px-6 py-4">Normal and expected for most people</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors">
                                        <td className="px-6 py-4 font-black text-foreground">10 to 25</td>
                                        <td className="px-6 py-4">Below average</td>
                                        <td className="px-6 py-4">Shorter than most, within normal variation</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors border-l-4 border-red-500/20">
                                        <td className="px-6 py-4 font-black text-red-500 text-lg">Below 10</td>
                                        <td className="px-6 py-4">Significantly shorter than peers</td>
                                        <td className="px-6 py-4">Worth discussing with a healthcare provider</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-muted leading-relaxed font-medium">
                            Falling below the 10th percentile is worth noting. Family height history, birth weight, and rate of change across multiple visits all factor into what a clinician considers meaningful. A consistent trend along the same band is more informative than any single percentile result.
                        </p>
                    </section>

                    <section id="example-height-percentile-calculation" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Example Height Percentile Calculation</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            Here is how the percentile height calculator works through a real example:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 font-bold">
                            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                <h4 className="text-[10px] font-black uppercase text-muted mb-4 border-b border-border pb-2 tracking-widest">Input Parameters</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">Age</span><span className="font-bold text-foreground">10 years</span></div>
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">Sex</span><span className="font-bold text-foreground">Male</span></div>
                                    <div className="flex justify-between"><span className="text-muted uppercase text-[11px]">Height</span><span className="font-bold text-foreground">138 cm</span></div>
                                </div>
                            </div>
                            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                <h4 className="text-[10px] font-black uppercase text-muted mb-4 border-b border-border pb-2 tracking-widest">Calculated Data</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">CDC reference median</span><span className="font-bold text-foreground">137 cm</span></div>
                                    <div className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted uppercase text-[11px]">Deviation</span><span className="font-bold text-accent">+1 cm above</span></div>
                                    <div className="flex justify-between"><span className="text-muted uppercase text-[11px]">Result</span><span className="font-black text-foreground text-lg">55th percentile</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg border border-border p-6 rounded-2xl">
                            <div className="flex items-center justify-between text-[10px] font-black text-muted mb-2 uppercase tracking-widest">
                                <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
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
                                <span className="font-black text-foreground text-2xl">55th</span> <span className="text-muted text-sm font-bold uppercase tracking-wider ml-2">— average range</span>
                            </div>
                        </div>

                        <p className="text-muted leading-relaxed font-medium">
                            This child sits one centimeter above the median for a 10-year-old boy. A result of 55 on the height percentile calculator places him in the average range, above 55 out of 100 peers. If this result stays near the same band at the next checkup, it confirms steady, consistent growth along a normal trajectory.
                        </p>

                        <ExampleCalculationVisual />
                    </section>

                    <section id="why-height-percentiles-are-used-in-pediatric-growth-monitoring" className="space-y-4 scroll-mt-24 font-bold">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Why Height Percentiles Are Used in Pediatric Growth Monitoring</h2>
                        <p className="text-muted leading-relaxed font-medium">
                            The World Health Organization and the Centers for Disease Control and Prevention both recommend tracking height and weight percentiles across multiple visits as a core part of pediatric care. A single measurement shows where a child stands today. A series of measurements shows whether they grow as expected.
                        </p>
                        <p className="text-muted leading-relaxed font-medium">Consistent tracking across checkups helps identify three specific patterns:</p>
                        <ul className="space-y-3 text-muted list-disc pl-8 marker:text-accent font-medium">
                            <li>Growth faltering, where a child&apos;s percentile drops significantly between visits</li>
                            <li>Early signs of hormonal or nutritional conditions that affect child development</li>
                            <li>Whether a child recovers well after illness or low birth weight</li>
                        </ul>
                        <div className="text-muted leading-relaxed mt-4 font-medium">
                            The pediatric height weight percentile calculator is a starting point for these conversations, not a replacement for them. Clinicians plot results on a
                            <a href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm' target='_blank' className='text-accent font-bold hover:underline mx-1'>CDC growth chart</a>
                            across multiple visits and look for consistent tracking along the same percentile band rather than focusing on any single number.
                        </div>
                    </section>

                    <section id="try-the-height-and-weight-percentile-calculator" className="bg-surface border border-border rounded-[3rem] p-8 md:p-16 text-center scroll-mt-24 shadow-2xl mt-8">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                            Use the Percentile Calculator
                        </h2>
                        <p className="text-muted leading-relaxed mb-12 max-w-2xl mx-auto font-medium text-lg">
                            Enter your age, height, and weight to calculate your result based on <span className="text-foreground font-black">WHO & CDC</span> reference data instantly.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left max-w-3xl mx-auto mb-12">
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>Babies, toddlers, children, and adults</span>
                            </div>
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>Height & weight percentile results</span>
                            </div>
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>Plain-language interpretation</span>
                            </div>
                            <div className="flex items-start gap-4 text-base font-bold text-foreground">
                                <CheckCircle2 className="text-accent w-6 h-6 shrink-0 mt-[2px]" />
                                <span>Global reference datasets</span>
                            </div>
                        </div>

                        <Link
                            href="#calculate-your-height-and-weight-percentile-tool"
                            className="bg-accent text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.05] transition-all shadow-2xl shadow-accent/40 active:scale-95 inline-flex items-center gap-3"
                        >
                            Calculate Now ↑
                        </Link>
                    </section>

                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={PERCENTILE_FAQ} />
                    </div>

                    {/* References Section */}
                    <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8 font-medium">
                        <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Scientific Sources</h3>
                        <ul className="space-y-4 break-words overflow-hidden list-disc pl-5 marker:text-muted/40">
                            <li>
                                <a href='https://www.who.int/tools/child-growth-standards/standards' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    World Health Organization Child Growth Standards. WHO, 2006.
                                </a>
                            </li>
                            <li>
                                <a href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    CDC Clinical Growth Charts. Centers for Disease Control and Prevention, 2000 (revised 2022).
                                </a>
                            </li>
                            <li>
                                <a href='https://www.cdc.gov/nchs/nhanes/index.html' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
                                    NHANES: National Health and Nutrition Examination Survey. CDC National Center for Health Statistics.
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}