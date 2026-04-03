import React from 'react';
import { CheckCircle2 } from 'lucide-react';
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
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative">
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={CHILD_HEIGHT_TOC} />
            </aside>
            <div className="flex-1 min-w-0 order-1 md:order-2 text-foreground font-bold">
                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* INTRO CONTENT */}
                    <div className="space-y-6 text-center sm:text-left mt-4 leading-relaxed">
                        <h1 id="child-height-predictor-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24 uppercase">
                            Child Height Predictor Calculator
                        </h1>
                        <div className="h-1.5 w-24 bg-accent rounded-full mx-auto sm:mx-0" />
                        <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto sm:mx-0 font-medium">
                            Use our child height calculator to estimate how tall your child may grow as an adult. By entering a few basic details such as your child’s age, height, weight, and parents’ heights, the calculator estimates their projected adult height using established scientific growth models.
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl inline-block text-left mx-auto sm:mx-0 mt-4 border-l-4 border-l-accent">
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
                            <h2 id="how-tall-will-my-child-be" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">How Tall Will My Child Be?</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                At some point, nearly every parent wonders about their child’s future height. Maybe your toddler already seems taller than other kids their age. Or maybe your child suddenly shot up several inches during a growth spurt. It’s natural to start asking questions like “how tall will my kid be?”
                            </p>
                            <p className="text-muted leading-relaxed font-medium">
                                The honest answer is that no one can predict adult height with complete certainty. However, research on child growth patterns has made it possible to estimate adult height fairly accurately.
                            </p>
                            <div className="bg-surface border border-border p-6 rounded-2xl my-6 border-l-4 border-l-accent">
                                <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest text-accent">Modern height prediction calculators analyze several key factors:</h3>
                                <ul className="space-y-2 text-muted font-medium">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent w-4 h-4" /> Genetics from parents</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent w-4 h-4" /> Current growth measurements</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="text-accent w-4 h-4" /> Statistical growth patterns observed in large populations</li>
                                </ul>
                            </div>
                            <p className="text-muted leading-relaxed font-medium">
                                These tools provide an estimated adult height range, which can help parents understand how their child’s development compares with typical growth patterns. The important thing to remember is that predictions are guidelines rather than guarantees.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 id="what-determines-child-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">What Determines a Child’s Height?</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                A child’s final adult height is influenced by both genetics and environmental factors. Height is considered a polygenic trait, meaning it is influenced by many genes rather than a single genetic factor. Researchers studying human growth and development estimate that genetics explains most of the variation in adult height, while environmental influences determine how fully that genetic potential is reached.
                            </p>

                            <h3 className="text-xl font-black text-foreground mt-8 mb-2 uppercase tracking-wide opacity-80">Genetics : The Biggest Factor</h3>
                            <p className="text-muted leading-relaxed font-medium">
                                Genetics plays the largest role in determining how tall a person becomes. Researchers estimate that 60–80% of adult height is inherited from parents. Children of taller parents tend to grow taller, while children of shorter parents often grow closer to that range.
                            </p>
                            <p className="text-muted leading-relaxed font-medium">
                                However, height inheritance isn’t perfectly predictable. Scientists frequently observe something known as regression toward the mean, where children of very tall or very short parents end up closer to the average population height.
                            </p>

                            <h3 className="text-xl font-black text-foreground mt-8 mb-2 uppercase tracking-wide opacity-80">Nutrition, Sleep, and Physical Activity</h3>
                            <p className="text-muted leading-relaxed font-medium">
                                The remaining 20–40% of height potential comes from environmental influences.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-6">
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all">
                                    <h4 className="font-extrabold text-foreground text-lg mb-2 uppercase tracking-tight">Nutrition</h4>
                                    <p className="text-sm text-muted leading-relaxed mb-3 font-medium">Healthy bone development requires adequate nutrition during childhood. Important nutrients include:</p>
                                    <ul className="text-sm text-muted space-y-1 list-disc pl-4 marker:text-accent font-medium">
                                        <li>Protein</li>
                                        <li>Calcium</li>
                                        <li>Vitamin D</li>
                                        <li>Zinc</li>
                                    </ul>
                                    <p className="text-sm text-muted mt-3 font-medium">Long-term nutritional deficiencies can slow growth and affect final adult height.</p>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all">
                                    <h4 className="font-extrabold text-foreground text-lg mb-2 uppercase tracking-tight">Sleep</h4>
                                    <p className="text-sm text-muted leading-relaxed mb-3 font-medium">During deep sleep, the body releases growth hormone, which stimulates bone development and tissue growth. Recommendations:</p>
                                    <ul className="text-sm text-muted space-y-1 list-disc pl-4 marker:text-accent font-medium">
                                        <li>9–11 hours for school-age children</li>
                                        <li>8–10 hours for teenagers</li>
                                    </ul>
                                    <p className="text-sm text-muted mt-3 font-medium">Growth hormone stimulates cell regeneration, making sleep vital for development.</p>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all">
                                    <h4 className="font-extrabold text-foreground text-lg mb-2 uppercase tracking-tight">Physical Activity</h4>
                                    <p className="text-sm text-muted leading-relaxed font-medium">Regular exercise supports bone strength and overall development. Activities such as running, jumping, and sports encourage healthy growth, although exercise alone cannot increase height beyond genetic potential.</p>
                                </div>
                            </div>
                        </section>

                        <div className="grid md:grid-cols-1 gap-8">
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
                        </div>

                        <section className="space-y-4">
                            <h2 id="boys-girls-growth-charts" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">Boys & Girls Height Growth Charts</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                <a
                                    href="https://www.cdc.gov/growthcharts/cdc-growth-charts.htm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-black hover:underline px-1"
                                >
                                    CDC growth charts
                                </a> provide a useful reference for child development. Growth charts compare a child’s height with population averages and show where they fall within percentile ranges. The 50th percentile represents the average height as well as median for children of the same age and sex.
                            </p>
                            <p className="text-muted leading-relaxed font-medium">
                                Healthy children typically fall between the 3rd percentile and the 97th percentile. Pediatricians usually focus less on a single measurement and more on whether children stay on a consistent growth curve over time.
                            </p>
                        </section>

                        <div className="scroll-mt-24 bg-surface border border-border rounded-3xl overflow-hidden p-2 shadow-xl" style={{ minHeight: '600px' }}>
                            <DynamicHeightCharts />
                        </div>

                        <section className="space-y-6 pt-8">
                            <h2 id="predict-child-height" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24 uppercase">How to Predict Your Child’s Height</h2>
                            <p className="text-muted leading-relaxed mb-6 font-medium">
                                There are several methods researchers use to estimate adult height. Height prediction models rely on anthropometric measurements, including height, weight, and age. These measurements are analyzed using population growth data and statistical distributions to estimate a likely adult height range.
                            </p>

                            <div className="space-y-8">
                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 id="height-calculator-based-on-parents" className="text-2xl font-black text-foreground mb-4 scroll-mt-24 uppercase tracking-tighter">Height Calculator Based on Parents (Mid-Parental Height)</h3>
                                    <p className="text-muted leading-relaxed mb-6 font-medium">
                                        The mid-parental height method is one of the simplest ways to estimate adult height. This formula calculates a child’s predicted height using the average height of both parents.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-bg border border-border p-5 rounded-2xl border-l-4 border-l-blue-500">
                                            <span className="font-black text-foreground block mb-2 text-xs uppercase tracking-widest text-blue-500">For Boys (US Units)</span>
                                            <code className="text-foreground text-base font-black tracking-tight bg-blue-500/10 px-3 py-1 rounded-lg">(Father + Mother + 5 in) ÷ 2</code>
                                        </div>
                                        <div className="bg-bg border border-border p-5 rounded-2xl border-l-4 border-l-pink-500">
                                            <span className="font-black text-foreground block mb-2 text-xs uppercase tracking-widest text-pink-500">For Girls (US Units)</span>
                                            <code className="text-foreground text-base font-black tracking-tight bg-pink-500/10 px-3 py-1 rounded-lg">(Father + Mother - 5 in) ÷ 2</code>
                                        </div>
                                    </div>
                                    <p className="text-muted leading-relaxed font-medium italic">
                                        This method usually predicts adult height within about ±4 inches (10 cm). Because it requires only parental height, it can also be used as a baby height calculator.
                                    </p>
                                </div>

                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 id="khamis-roche-method" className="text-2xl font-black text-foreground mb-4 scroll-mt-24 uppercase tracking-tighter">Khamis-Roche Method</h3>
                                    <p className="text-muted leading-relaxed mb-6 font-medium">
                                        The Khamis-Roche method is widely considered the most accurate height prediction model that does not require bone age testing. This method analyzes four factors: child’s age, child’s height, child’s weight, and average height of both parents.
                                    </p>
                                    <p className="text-muted leading-relaxed mb-6 font-medium">
                                        Researchers developed the formula after studying the growth patterns of thousands of children. Because the model includes current body measurements, it produces more accurate predictions than formulas based only on genetics.
                                    </p>
                                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20 mb-6">
                                        <p className="text-sm font-black text-foreground mb-3 uppercase tracking-widest">Typical prediction accuracy:</p>
                                        <ul className="text-foreground text-base space-y-2 font-black uppercase tracking-tight">
                                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> ±2.1 inches for boys</li>
                                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> ±1.7 inches for girls</li>
                                        </ul>
                                    </div>
                                    <p className="text-muted leading-relaxed font-medium">
                                        For children older than four years, the Khamis-Roche calculator is usually the most reliable prediction method available outside a medical setting.
                                    </p>
                                </div>

                                <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                    <h3 id="bone-age-method" className="text-2xl font-black text-foreground mb-4 scroll-mt-24 uppercase tracking-tighter">Bone Age Method (Clinical Height Prediction)</h3>
                                    <p className="text-muted leading-relaxed font-medium">
                                        Doctors sometimes estimate adult height using bone age testing. This involves an X-ray of the left wrist and hand to determine how mature the bones are compared with the child’s chronological age.
                                    </p>
                                    <p className="text-muted leading-relaxed mt-6 mb-4 font-bold uppercase text-xs tracking-widest opacity-70">Two commonly used evaluation methods include:</p>
                                    <ul className="text-foreground space-y-3 font-black uppercase tracking-tight">
                                        <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> Greulich-Pyle method</li>
                                        <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-4 h-4" /> Tanner-Whitehouse method</li>
                                    </ul>
                                    <p className="text-muted leading-relaxed mt-6 font-medium">
                                        If bone development is ahead or behind typical growth patterns, doctors can estimate how much growth remains. Bone age testing is usually used only when doctors suspect growth disorders or delayed puberty.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div id='how-wrist-x-ray-predict-child-height' className="scroll-mt-24 bg-surface border border-border rounded-3xl overflow-hidden p-2 shadow-xl" style={{ minHeight: '400px' }}>
                            <DynamicGrowthPlateExplainer />
                        </div>

                        <section id='bayley-pinneau-method' className="grid md:grid-cols-1 gap-8 pt-8 scroll-mt-24">
                            <div className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">Bayley-Pinneau Method</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    The Bayley Pinneau method combines bone age data with height for age tables. Doctors calculate the percentage of adult height the child has already reached. The remaining growth potential determines the final height estimate. This method works well but requires bone age testing.
                                </p>
                            </div>
                            <div id='roche-wainer-thissen-method' className="bg-surface border border-border p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm scroll-mt-24">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent/20 group-hover:bg-accent transition-all" />
                                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">Roche-Wainer-Thissen Method</h3>
                                <p className="text-muted leading-relaxed font-medium">
                                    The Roche Wainer Thissen method uses several growth variables. The formula includes bone age, current height, weight, and parental heights. This approach improves accuracy in some cases. Because it requires clinical measurements, it is mostly used in medical settings.
                                </p>
                            </div>
                        </section>

                        <section id='boys-height-predictor' className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-8 uppercase">Boys Height Predictor: Understanding Male Growth</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                Male growth patterns differ from female growth patterns. Boys usually experience a later but longer growth spurt during puberty.
                            </p>
                            <p className="text-muted leading-relaxed mt-4 font-bold uppercase text-xs tracking-widest opacity-80">During peak puberty growth:</p>
                            <ul className="text-foreground space-y-3 font-black uppercase tracking-tight">
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500" /> Boys grow around 3–4 inches per year</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-pink-500" /> Girls grow around 2.5–3 inches per year</li>
                            </ul>
                            <p className="text-muted leading-relaxed mt-6 font-medium">
                                Because boys start puberty later, they may appear shorter than girls during early adolescence before eventually catching up. If you are trying to estimate how tall your son will be, a Khamis-Roche height predictor typically provides the most accurate estimate.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 id="how-to-get-taller-as-a-kid" className="text-2xl md:text-3xl font-black tracking-tight mt-8 scroll-mt-24 uppercase">How to Get Taller As A Kid</h2>
                            <p className="text-muted leading-relaxed font-medium">
                                Genetics determines the maximum height a person can reach, but lifestyle factors influence whether that potential is achieved.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-4">
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Healthy Diet</h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">Balanced nutrition supports bone growth and development.</p>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Adequate Sleep</h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">Growth hormone peaks during deep sleep, making consistent sleep schedules important.</p>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="font-black text-foreground mb-3 uppercase tracking-widest text-xs text-accent">Regular Exercise</h4>
                                    <p className="text-sm text-muted font-medium leading-relaxed">Physical activity supports bone strength and healthy development.</p>
                                </div>
                            </div>
                            <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-3xl mt-6">
                                <p className="text-sm font-bold text-foreground leading-relaxed italic">
                                    However, it’s important to understand that no exercise routine, supplement, or stretching program can increase height once growth plates close.
                                </p>
                            </div>
                        </section>

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
                    </div>

                    {/* FAQ Accordion Section */}
                    <div id="child-height-calculator-faq" className="scroll-mt-24">
                        <FaqAccordion 
                            items={CHILD_HEIGHT_QA} 
                            description="Scientific insights into your child's development"
                        />
                    </div>

                    {/* References Section */}
                    <div className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 text-sm text-muted mt-8 font-medium shadow-sm">
                        <h3 className="font-extrabold text-foreground mb-6 uppercase tracking-[0.2em] text-[10px] opacity-60">Scientific Bibliography & Data Sources</h3>
                        <ul className="space-y-4 break-words overflow-hidden list-disc pl-5 marker:text-accent/40">
                            <li>Centers for Disease Control and Prevention. CDC Growth Charts. <br /><a href="https://www.cdc.gov/growthcharts" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.cdc.gov/growthcharts</a></li>
                            <li>National Institutes of Health. Child Growth and Development Overview. <br /><a href=" National Institutes of Health. Child Growth and Development Overview" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.nichd.nih.gov/health/topics/childgrowth</a></li>
                            <li>Silventoinen K. Determinants of variation in adult body height. Journal of Biosocial Science. <br /><a href="https://doi.org/10.1017/S0021932003006429" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://doi.org/10.1017/S0021932003006429</a></li>
                            <li>World Health Organization. Child Growth Standards. <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                            <li>National Sleep Foundation. Growth Hormone and Sleep in Children. <br /><a href="https://www.sleepfoundation.org/children-and-sleep" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.sleepfoundation.org/children-and-sleep</a></li>
                            <li>American Academy of Pediatrics. Physical Development in Adolescence. <br /><a href="https://www.healthychildren.org" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://www.healthychildren.org</a></li>
                            <li>Khamis HJ, Roche AF. Predicting adult stature without using skeletal age. Pediatrics. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/8616011/" target="_blank" rel="noopener noreferrer" className="text-accent font-black hover:underline">https://pubmed.ncbi.nlm.nih.gov/8616011/</a></li>
                            <li>Tanner JM. Growth at Adolescence. Blackwell Scientific Publications.</li>
                            <li>Greulich WW, Pyle SI. Radiographic Atlas of Skeletal Development of the Hand and Wrist.</li>
                            <li>Tanner JM, Whitehouse RH. Assessment of Skeletal Maturity.</li>
                            <li>Bayley N, Pinneau SR. Tables for predicting adult height from skeletal age.</li>
                            <li>Roche AF, Wainer H, Thissen D. Predicting adult stature for individuals.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}