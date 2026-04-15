import React from 'react';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import { ArrowUpCircle } from 'lucide-react';
import { IBW_TOC, IBW_FAQ_SCA } from '@/constants/idealWeight';
import { DynamicIdealWeightIsland, DynamicHealthyWeightIsland } from '@/components/ideal-body-weight-calculator/DynamicIBWIslands';

export default function IdealBodyWeightPage() {
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative pt-8 overflow-hidden transform-gpu">
            {/* --- Sidebar TOC --- */}
            <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                <TableOfContents items={IBW_TOC} />
            </aside>

            {/* --- Main Content --- */}
            <div className="flex-1 min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                    {/* Intro */}
                    <div className="space-y-6 text-left sm:text-left p-2">
                        <h1 id="ideal-body-weight-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24 text-left">
                            Ideal Body Weight Calculator
                        </h1>
                        <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                            <span className='text-accent font-semibold hover:underline'>Ideal Body Weight (IBW)</span> is an estimate of the weight range associated with good health for a given height and sex. This ideal body weight calculator applies three established clinical formulas: the <span className='text-accent font-semibold hover:underline'>Devine</span>, <span className='text-accent font-semibold hover:underline'>Robinson</span>, and <span className='text-accent font-semibold hover:underline'>Hamwi</span> methods to produce a range rather than a single number. The tool works for men, women, and pediatric patients. Enter your height and sex to calculate ideal body weight instantly.
                        </p>
                        <p className="text-sm text-muted/80 italic max-w-3xl mx-auto sm:mx-0">
                            (IBW is a clinical reference, not a body goal. Weight is one of many health markers. Always discuss weight-related health questions with a qualified clinician.)
                        </p>
                    </div>

                    {/* Interactive Calculator Island */}
                    <DynamicIdealWeightIsland />

                    <section id="how-to-calculate-ideal-body-weight" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">How to Calculate Ideal Body Weight</h2>
                        <p className="text-muted leading-relaxed">
                            All three IBW formulas share the same logic. Start from a base weight at exactly 5 feet (152.4 cm) and add a fixed amount per inch of height above that. The formulas differ in their base weight and per-inch increment, which is why they produce slightly different outputs for the same person.
                        </p>
                        <p className="text-muted leading-relaxed">
                            Ben J. Devine introduced his formula in 1974 to help clinicians estimate drug dosages based on height and weight. It became the most widely cited ideal body weight calculation formula in clinical practice.
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">This is how to calculate ideal body weight step by step using the Devine method:</h3>
                            <ul className="space-y-2 text-muted list-decimal pl-5 marker:text-accent font-medium">
                                <li>Measure your height in feet and inches.</li>
                                <li>Subtract 5 feet to get the number of inches above the base height.</li>
                                <li>Multiply those inches by the formula&apos;s per-inch increment.</li>
                                <li>Add the result to the formula&apos;s base weight for your sex.</li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            The calculator applies all three formulas at once. You get a range rather than a single number, which is a more accurate representation of what ideal body weight calculation can and cannot tell you.
                        </p>
                    </section>

                    <section id="ideal-body-weight-calculation-formulas" className="space-y-8 scroll-mt-24">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">Ideal Body Weight Calculation Formulas</h2>
                            <p className="text-muted leading-relaxed">
                                The three formulas below cover most clinical use cases. Each one applies the ideal body weight calculation formula as a linear function of height above 5 feet. All were originally derived in kilograms.
                            </p>
                        </div>

                        <div id='devine-formula' className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                            <h3 className="text-xl font-bold text-foreground mb-3">Devine Formula</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                Ben J. Devine published his formula in 1974. It became the most widely cited IBW formula in clinical practice. The per-inch increment is identical for men and women at 2.3 kg, but the base weights differ by sex.
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground">
                                        <tr>
                                            <th className="px-4 py-3">Sex</th>
                                            <th className="px-4 py-3">Formula</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">Male</td>
                                            <td className="px-4 py-3">50 kg + 2.3 kg per inch above 5 ft</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">Female</td>
                                            <td className="px-4 py-3">45.5 kg + 2.3 kg per inch above 5 ft</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-bg border border-border p-2 rounded-xl font-mono text-xs">
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Height</span><span className="font-bold text-foreground">175 cm = 5 ft 9 in</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Inches above 5 ft</span><span className="font-bold text-foreground">9</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Calculation (male)</span><span className="font-bold text-foreground">50 + (2.3 × 9)</span></div>
                                <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">Devine IBW</span><span className="font-bold text-foreground">70.7 kg</span></div>
                            </div>
                        </div>

                        <div id="robinson-formula" className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                            <h3 className="text-xl font-bold text-foreground mb-3">Robinson Formula</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                The Robinson Formula was published in 1983 as a refinement of the Devine equation. It raises the male base weight to 52 kg and lowers the per-inch increment to 1.9 kg, producing a leaner estimate for taller men. The female base rises to 49 kg with a 1.7 kg increment. Robinson tends to give the lowest IBW of the three formulas for tall individuals.
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground">
                                        <tr>
                                            <th className="px-4 py-3">Sex</th>
                                            <th className="px-4 py-3">Formula</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">Male</td>
                                            <td className="px-4 py-3">52 kg + 1.9 kg per inch above 5 ft</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">Female</td>
                                            <td className="px-4 py-3">49 kg + 1.7 kg per inch above 5 ft</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-bg border border-border p-2 rounded-xl font-mono text-xs">
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Height</span><span className="font-bold text-foreground">175 cm = 5 ft 9 in</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Calculation (male)</span><span className="font-bold text-foreground">52 + (1.9 × 9)</span></div>
                                <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">Robinson IBW</span><span className="font-bold text-foreground">69.1 kg</span></div>
                            </div>
                        </div>

                        <div id='hamwi-formula' className="bg-surface border border-border p-6 md:p-8 rounded-3xl relative overflow-hidden scroll-mt-24">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                            <h3 className="text-xl font-bold text-foreground mb-3">Hamwi Formula</h3>
                            <p className="text-muted leading-relaxed mb-6">
                                The Hamwi Formula is the oldest of the three, published in 1964. It uses a higher per-inch increment for men and tends to produce the largest IBW estimates for taller individuals. It remains common in dietetic and clinical nutrition practice.
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl mb-6">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground">
                                        <tr>
                                            <th className="px-4 py-3">Sex</th>
                                            <th className="px-4 py-3">Formula</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted">
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">Male</td>
                                            <td className="px-4 py-3">48 kg + 2.7 kg per inch above 5 ft</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-foreground">Female</td>
                                            <td className="px-4 py-3">45.5 kg + 2.2 kg per inch above 5 ft</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-bg border border-border p-2 rounded-xl font-mono text-xs">
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Height</span><span className="font-bold text-foreground">175 cm = 5 ft 9 in</span></div>
                                <div className="flex justify-between border-b border-border/50 pb-2 mb-2"><span className="text-muted font-sans font-bold">Calculation (male)</span><span className="font-bold text-foreground">48 + (2.7 × 9)</span></div>
                                <div className="flex justify-between mt-2"><span className="text-accent font-bold font-sans">Hamwi IBW</span><span className="font-bold text-foreground">72.3 kg</span></div>
                            </div>
                        </div>
                    </section>

                    <section id="ideal-body-weight-calculator-for-women" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Ideal Body Weight Calculator for Women</h2>
                        <p className="text-muted leading-relaxed">
                            The ideal weight calculator for women applies lower base weights than the male versions of the same formulas. This reflects two biological realities. Women carry a higher proportion of body fat relative to lean mass. Women also have lower average bone density and muscle mass than men of the same height.
                        </p>
                        <p className="text-muted leading-relaxed">
                            The Devine formula sets the female base at 45.5 kg against 50 kg for men. The Robinson formula raises the female base to 49 kg. The result is a lower IBW estimate at every height compared to the male calculation.
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-4">
                            <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Female IBW example at 5 ft 5 in (165 cm):</h4>
                            <ul className="space-y-2 text-muted font-medium">
                                <li>Devine: 57.7 kg (127 lb)</li>
                                <li>Robinson: 56.2 kg (124 lb)</li>
                                <li>Hamwi: 56.4 kg (124 lb)</li>
                                <li className="pt-2 text-accent font-bold">Healthy range across formulas: approximately 56 to 58 kg</li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            Factors including frame size, muscle mass from training, and hormonal variation all influence what a healthy weight looks like for any individual woman. None of the formulas account for these variables. The female ideal body weight calculator result is a reference band, not a target to reach.
                        </p>
                    </section>

                    <section id="ideal-body-weight-calculator-for-men" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Ideal Body Weight Calculator for Men</h2>
                        <p className="text-muted leading-relaxed">
                            The ideal body weight calculator for men produces higher estimates than the female version at every height. This reflects the greater average muscle mass and bone density in male bodies. Muscle weighs more than fat per unit volume, so a man and a woman at the same height can both be healthy while differing significantly in weight.
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-4">
                            <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Male IBW example at 5 ft 10 in (178 cm):</h4>
                            <ul className="space-y-2 text-muted font-medium">
                                <li>Devine: 73 kg (161 lb)</li>
                                <li>Robinson: 71 kg (157 lb)</li>
                                <li>Hamwi: 75 kg (165 lb)</li>
                                <li className="pt-2 text-accent font-bold">Healthy range across formulas: approximately 71 to 75 kg</li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            Highly trained men who lift weights regularly will often sit above their IBW while carrying low body fat. In these cases, IBW is a less useful clinical reference than direct body composition measurement. The male ideal body weight calculation gives a useful starting point but does not replace a full health assessment.
                        </p>
                    </section>

                    <section id="ideal-body-weight-calculator-for-pediatrics" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Ideal Body Weight Calculator for Pediatrics</h2>
                        <p className="text-muted leading-relaxed">
                            The adult IBW formulas do not apply to children. The ideal body weight calculator for pediatrics uses age- and height-based references instead, because children&apos;s bodies are still developing and their healthy weight range changes continuously as they grow.
                        </p>
                        <p className="text-muted leading-relaxed">
                            The most common method for ideal body weight calculation in pediatrics uses height to estimate expected weight based on growth charts. In clinical practice, <a href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">CDC growth charts</a> and <a href='https://www.who.int/tools/child-growth-standards' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">WHO Child Growth Standards</a> are the reference standards for pediatric growth assessment. A child&apos;s IBW is typically taken as the weight corresponding to the 50th percentile for their height on the appropriate growth chart.
                        </p>
                        <p className="text-muted leading-relaxed">
                            The calculator switches to this growth-chart method automatically when an age under 18 is entered. The result appears as a weight range rather than a single figure. For pediatric weight concerns, always work with a pediatrician. Growth tracking across multiple visits is more informative than any single measurement.
                        </p>
                    </section>

                    <section id="adjusted-ideal-body-weight-calculator" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Adjusted Ideal Body Weight Calculator</h2>
                        <p className="text-muted leading-relaxed">
                            The adjusted ideal body weight calculator applies in clinical settings for patients whose actual weight is more than 30% above their IBW. At that point, using IBW alone for drug dosing underestimates metabolic activity, because some excess fat tissue is still metabolically active. Adjusted Body Weight corrects for this.
                        </p>
                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Adjusted Body Weight formula:</h3>
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                Adjusted BW = IBW + 0.4 × (Actual Weight − IBW)
                            </p>
                            <h4 className="font-bold text-foreground mb-2 text-sm">Worked example — actual weight 100 kg, Devine IBW 70 kg:</h4>
                            <ul className="space-y-2 text-muted font-medium font-mono text-sm">
                                <li>= 70 + 0.4 × (100 − 70) = 70 + 12 = <span className='text-accent font-semibold hover:underline'>82 kg</span></li>
                            </ul>
                        </div>
                        <p className="text-muted leading-relaxed">
                            The 0.4 factor reflects the estimated metabolically active proportion of excess weight. Adjusted body weight is used most commonly in aminoglycoside antibiotic dosing, chemotherapy calculations, and renal dosing adjustments. It is not a weight target. It is a pharmacokinetic tool for clinical dosing decisions.
                        </p>
                    </section>

                    <section id="percent-ideal-body-weight-calculation" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Percent Ideal Body Weight Calculation</h2>
                        <p className="text-muted leading-relaxed">
                            To calculate percent ideal body weight, divide your actual weight by your IBW and multiply by 100. This shows how your current weight compares to the estimate as a percentage.
                        </p>
                        <div className="bg-surface border border-border p-2 rounded-2xl my-6">
                            <p className="font-mono bg-bg border border-border p-4 rounded-xl text-accent font-bold text-center sm:text-left mb-6">
                                Percent IBW = (Actual Weight ÷ IBW) × 100
                            </p>
                            <div className="overflow-x-auto border border-border rounded-xl">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-bg border-b border-border font-bold text-foreground text-center">
                                        <tr>
                                            <th className=" py-3">Percent IBW</th>
                                            <th className=" py-3">Weight status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted font-medium text-center">
                                        <tr>
                                            <td className="  bg-red-500/10 py-3 text-red-600 dark:text-red-400 font-bold">Below 70%</td>
                                            <td className=" py-3 text-foreground font-bold">Severely underweight</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-amber-500/10 py-3 text-amber-600 dark:text-amber-400 font-bold">70 to 89%</td>
                                            <td className=" py-3 text-foreground font-bold">Underweight</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-green-500/10 py-3 text-green-600 dark:text-green-400 font-bold">90 to 110%</td>
                                            <td className=" py-3 text-foreground font-bold">Normal weight</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-amber-500/10 py-3 text-amber-600 dark:text-amber-400 font-bold">110 to 120%</td>
                                            <td className=" py-3 text-foreground font-bold">Overweight</td>
                                        </tr>
                                        <tr>
                                            <td className=" bg-red-500/10 py-3 text-red-600 dark:text-red-400 font-bold">Above 120%</td>
                                            <td className=" py-3 text-foreground font-bold">Obesity risk range</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-muted leading-relaxed">
                            Percent IBW is used in clinical nutrition assessments to flag patients who need nutritional intervention. A percent ideal body weight below 70% is associated with significant nutritional depletion. Scores above 120% are used as one threshold in obesity-related dosing decisions.
                        </p>
                    </section>

                    <section id="healthy-weight-range" className="space-y-4 scroll-mt-24 text-foreground">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Healthy Weight Range</h2>
                        <p className="text-muted leading-relaxed mb-6">
                            The healthy weight range sits around your IBW result, not at a single point. Because the three formulas produce slightly different figures for the same person, the spread between the lowest and highest result defines a practical healthy weight range. For most adults, this spread runs 3 to 5 kg across all three formulas.
                        </p>

                        <div className="bg-surface border border-border p-6 rounded-2xl my-6">
                            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest border-b border-border pb-3">Illustrative range — male, 5 ft 9 in (175 cm):</h4>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs/4 font-medium">
                                <div className="bg-bg border border-border p-2 rounded-xl">
                                    <span className="block text-muted mb-1 font-bold">Below IBW</span>
                                    <span className="font-bold text-foreground">Below 69 kg</span>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/30 p-2 rounded-xl">
                                    <span className="block text-green-500 mb-1 font-bold">Healthy (69–73 kg)</span>
                                    <span className="font-bold text-green-600">69–73 kg (healthy)</span>
                                </div>
                                <div className="bg-bg border border-border p-2 rounded-xl">
                                    <span className="block text-muted mb-1 font-bold">Above IBW</span>
                                    <span className="font-bold text-foreground">73–88 kg</span>
                                </div>
                                <div className="col-span-3 bg-red-500/10 border border-red-500/30 p-2 rounded-xl mt-2">
                                    <span className="block text-red-500 mb-1 font-bold">Obesity risk</span>
                                    <span className="font-bold text-red-600">Above 88 kg</span>
                                </div>
                            </div>
                        </div>
                        <DynamicHealthyWeightIsland />
                    </section>

                    <section id="ideal-body-weight-vs-bmi" className="space-y-4 scroll-mt-24">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Ideal Body Weight vs BMI</h2>
                        <p className="text-muted leading-relaxed">
                            Body Mass Index and Ideal Body Weight measure different things and answer different questions. BMI evaluates your weight category by dividing weight in kilograms by height in meters squared. It returns a category label: underweight, normal, overweight, or obese. Ideal body weight calculation, by contrast, gives an estimated weight to aim for rather than a category label.
                        </p>
                        <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm my-6">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-bg border-b border-border text-foreground font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Measure</th>
                                        <th className="px-6 py-4">What it does</th>
                                        <th className="px-6 py-4">Main limitation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50 text-muted">
                                    <tr className="hover:bg-bg/50 transition-colors font-medium">
                                        <td className="px-6 py-4 font-bold text-foreground">Ideal Body Weight</td>
                                        <td className="px-6 py-4 text-muted">Estimates a target weight based on height and sex</td>
                                        <td className="px-6 py-4 text-muted">Ignores body composition, frame size, and age</td>
                                    </tr>
                                    <tr className="hover:bg-bg/50 transition-colors font-medium">
                                        <td className="px-6 py-4 font-bold text-foreground">Body Mass Index</td>
                                        <td className="px-6 py-4 text-muted">Classifies weight status using weight and height</td>
                                        <td className="px-6 py-4 text-muted">Same limitations, plus does not adjust for sex differences in body composition</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted leading-relaxed">
                            Neither metric accounts for how weight is distributed between muscle, fat, and bone. A person with high muscle mass can show a normal IBW and a high BMI. A person with low muscle mass can show a normal BMI and sit above their IBW. For a full picture, both are best used alongside body composition data from a clinician.
                        </p>

                        <div className="text-center mt-12">
                            <Link
                                href="#ideal-body-weight-calculator"
                                className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-flex items-center gap-2"
                            >
                                <ArrowUpCircle size={18} /> Scroll to top and calculate now ↑
                            </Link>
                        </div>
                    </section>

                    <div id="frequently-asked-questions" className="scroll-mt-24">
                        <FaqAccordion items={IBW_FAQ_SCA} />
                    </div>

                    {/* References Section */}
                    <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8">
                        <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Sources</h3>
                        <ul className="space-y-3 break-words overflow-hidden list-disc pl-5 marker:text-muted/40 font-medium">
                            <li>Devine BJ (1974). Gentamicin therapy. Drug Intelligence and Clinical Pharmacy.</li>
                            <li>Robinson JD et al. (1983). Estimation of ideal body weight. American Journal of Hospital Pharmacy.</li>
                            <li>Hamwi GJ (1964). Changing dietary concepts. In: Diabetes Mellitus: Diagnosis and Treatment. American Diabetes Association.</li>
                            <li>CDC Growth Charts. Centers for Disease Control and Prevention.</li>
                            <li>WHO Child Growth Standards. World Health Organization.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}