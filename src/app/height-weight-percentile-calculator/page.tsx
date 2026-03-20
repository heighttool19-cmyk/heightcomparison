'use client';

import React, { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useThemeStore } from '@/store'; // Adjust import based on your actual path
import Navbar from '@/components/Navbar'; // Adjust import based on your actual path
import Link from 'next/link';
import ExampleCalculationVisual from '@/components/height-weight-percentile-calculator/ExampleCalculationVisual';
import HeightPercentileTool from '@/components/height-weight-percentile-calculator/HeightPercentileTool';
import BellCurveIllustration from '@/components/height-weight-percentile-calculator/BellCurveIllustration';
import WHOvsCDCVisual from '@/components/height-weight-percentile-calculator/WHOvsCDCVisual';
// Strict SEO Anchor Linking
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

const QA = [
    {
        q: "What is a good height percentile?",
        a: "There is no single good percentile. The average range on a height percentile calculator runs from the 25th to the 75th percentile, and most people fall somewhere in this band. What matters more is whether your percentile stays consistent over time and fits your family's typical height pattern."
    },
    {
        q: "How accurate is a height percentile calculator?",
        a: "A percentile height calculator is as accurate as the measurements you enter. The reference data behind the tool comes from large, nationally representative datasets from the CDC and WHO. Accuracy improves when you enter age in months rather than years for children, and when height is measured without shoes, standing straight for older children and lying flat for infants."
    },
    {
        q: "Can adults calculate their height percentile?",
        a: "Yes. The adult height percentile calculator compares your height to a population distribution rather than a growth chart. The height percentile calculator for adults uses NHANES survey data to place your height within the distribution for people of the same sex. The height percentile calculator for men uses male-specific data, giving a precise comparison against the adult male population."
    },
    {
        q: "Do boys and girls have different growth percentiles?",
        a: "Yes. The height percentile girl calculator and the height percentile calculator for boys each use separate CDC reference curves because male and female growth patterns diverge after early childhood. Girls grow faster in early adolescence and boys catch up later. Entering the wrong sex produces a meaningfully inaccurate result."
    },
    {
        q: "What is the difference between WHO and CDC growth charts?",
        a: "WHO Child Growth Standards cover ages 0 to 2 and are based on data from six countries, designed as an international reference for optimal growth. CDC growth charts cover ages 2 to 20 and are built from US population data, making them the standard reference for clinical use in the United States. This calculator uses WHO data for infants and CDC data from age 2 onward."
    }
];

export default function PercentileCalculatorClient() {
    const { theme } = useThemeStore();
    const [activeSection, setActiveSection] = useState<string>('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const isClickScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Intersection Observer for Active TOC state & URL Sync
    useEffect(() => {
        const visibleSections = new Map<string, IntersectionObserverEntry>();

        const observer = new IntersectionObserver(
            (entries) => {
                if (isClickScrolling.current) return;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.set(entry.target.id, entry);
                    } else {
                        visibleSections.delete(entry.target.id);
                    }
                });

                if (visibleSections.size > 0) {
                    let closestSection = '';
                    let minTop = Infinity;

                    visibleSections.forEach((entry, id) => {
                        const topPos = entry.boundingClientRect.top;
                        if (topPos >= 0 && topPos < minTop) {
                            minTop = topPos;
                            closestSection = id;
                        }
                    });

                    if (!closestSection) {
                        closestSection = Array.from(visibleSections.keys())[0];
                    }

                    if (closestSection && closestSection !== activeSection) {
                        setActiveSection(closestSection);

                        // DEBOUNCE URL UPDATE
                        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                        scrollTimeout.current = setTimeout(() => {
                            if (window.history.replaceState) {
                                window.history.replaceState(null, '', `#${closestSection}`);
                            }
                        }, 150);
                    }
                }
            },
            { rootMargin: '-70px 0px -40% 0px', threshold: 0 }
        );

        // Dynamically grab all IDs listed in the TOC to observe
        const headings = document.querySelectorAll(
            tocItems.flatMap(item => {
                const ids = [`#${item.id}`];
                if (item.subItems) {
                    item.subItems.forEach(sub => ids.push(`#${sub.id}`));
                }
                return ids;
            }).join(', ')
        );
        headings.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, [activeSection]);

    const TOCLink = ({ item, isSub = false }: { item: { id: string; label: string; subItems?: { id: string; label: string }[] }, isSub?: boolean }) => {
        const checkActiveRecursive = (node: { id: string; subItems?: { id: string; label: string }[] }): boolean => {
            if (activeSection === node.id) return true;
            if (node.subItems) return node.subItems.some((sub: { id: string; label: string }) => checkActiveRecursive(sub));
            return false;
        };

        const isActive = checkActiveRecursive(item);

        const handleLinkClick = () => {
            isClickScrolling.current = true;
            setActiveSection(item.id);

            if (window.history.pushState) {
                window.history.pushState(null, '', `#${item.id}`);
            }

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                isClickScrolling.current = false;
            }, 1000);
        };

        return (
            <li className={`transition-all duration-300 ${isSub ? 'mt-2' : 'mt-3'}`}>
                <a
                    href={`#${item.id}`}
                    onClick={handleLinkClick}
                    className={`block transition-all duration-300 border-l-2 pl-3 ${isActive ? 'text-accent border-accent font-bold translate-x-1' : 'text-muted hover:text-foreground border-transparent'
                        }`}
                >
                    {item.label}
                </a>
                {item.subItems && (
                    <ul className="pl-4 ml-3 border-l border-border/50 mt-2 space-y-2">
                        {item.subItems.map((sub: { id: string; label: string }) => <TOCLink key={sub.id} item={sub} isSub={true} />)}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            <Navbar activePage="height-weight-percentile-calculator" />

            <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative">

                {/* --- LEFT SIDEBAR: Table of Contents --- */}
                <aside className="w-full md:w-72 shrink-0 order-2 md:order-1">
                    <div className="md:sticky top-24 bg-surface border border-border rounded-3xl p-6 shadow-xl">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4">Table of Contents</h3>
                        <ul className="text-sm font-medium">
                            {tocItems.map(item => (
                                <TOCLink key={item.id} item={item} />
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* Mobile TOC */}
                        <div className="block md:hidden bg-surface border border-border p-6 rounded-3xl shadow-sm text-left">
                            <h3 className="font-black text-foreground mb-4 uppercase tracking-widest text-sm border-b border-border pb-4">Table of Contents</h3>
                            <ul className="text-sm font-medium">
                                {tocItems.map(item => (
                                    <TOCLink key={item.id} item={item} />
                                ))}
                            </ul>
                        </div>

                        {/* Title Section */}
                        <div className="space-y-6 text-center sm:text-left">
                            <h1 id="height-and-weight-percentile-calculator" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
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

                        {/* Calculator UI Placeholder */}
                        <section id="calculate-your-height-and-weight-percentile" className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Calculate Your Height and Weight Percentile</h2>
                            <HeightPercentileTool />
                        </section>

                        <section id="what-does-height-and-weight-percentile-mean" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">What Does Height and Weight Percentile Mean?</h2>
                            <p className="text-muted leading-relaxed">
                                A growth percentile shows how one person&apos;s measurement compares to a reference group of the same age and sex. The <span className="text-accent font-bold">World Health Organization</span> defines the 50th percentile as the median: exactly half the reference population falls above it and half falls below.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Percentile does not mean percentage of a maximum. A child at the 90th percentile for height is taller than 90 out of 100 children of the same age and sex in the reference group. It says nothing about how tall they can grow.
                            </p>

                            <div className="bg-bg border border-border p-6 rounded-2xl my-6">
                                <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">Two reference points that clarify the scale:</h3>
                                <ul className="space-y-2 text-muted">
                                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> <strong>50th percentile height</strong> = the average for that age and sex</li>
                                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> <strong>90th percentile height</strong> = taller than 90% of peers the same age</li>
                                </ul>
                            </div>

                            <p className="text-muted leading-relaxed">
                                A low result on the percentile height calculator does not mean something is wrong. A high result does not flag a problem. What matters is the pattern across multiple measurements over time, not a single number in isolation.
                            </p>

                            <BellCurveIllustration />
                        </section>

                        <section id="how-the-height-and-weight-percentile-calculator-works" className="space-y-6 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">How the Height and Weight Percentile Calculator Works</h2>
                            <p className="text-muted leading-relaxed">
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
                            </p>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                <div className="bg-surface border border-border p-5 rounded-2xl">
                                    <span className="text-xs font-black text-accent uppercase tracking-widest">Step 1</span>
                                    <p className="text-sm text-foreground font-medium mt-2">Enter age, sex, height, and weight</p>
                                </div>
                                <div className="bg-surface border border-border p-5 rounded-2xl">
                                    <span className="text-xs font-black text-accent uppercase tracking-widest">Step 2</span>
                                    <p className="text-sm text-foreground font-medium mt-2">Match inputs to CDC or WHO reference dataset</p>
                                </div>
                                <div className="bg-surface border border-border p-5 rounded-2xl">
                                    <span className="text-xs font-black text-accent uppercase tracking-widest">Step 3</span>
                                    <p className="text-sm text-foreground font-medium mt-2">Calculate percentile rank using age- and sex-matched curves</p>
                                </div>
                                <div className="bg-surface border border-border p-5 rounded-2xl">
                                    <span className="text-xs font-black text-accent uppercase tracking-widest">Step 4</span>
                                    <p className="text-sm text-foreground font-medium mt-2">Display numeric percentile and plain-language result</p>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed mt-6">
                                For children aged 0 to 2, the tool uses
                                <a
                                    href='https://www.who.int/tools/child-growth-standards'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline"
                                >  WHO Child Growth Standards </a> . From age 2 onward, it switches to CDC growth charts, the standard reference in US clinical practice. The pediatric height weight percentile calculator applies the correct dataset based on the age you enter. No manual switching is needed.
                            </p>

                            <WHOvsCDCVisual />
                        </section>

                        <section id="height-percentile-calculator-by-age-group" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Height Percentile Calculator by Age Group</h2>
                            <p className="text-muted leading-relaxed">
                                Growth patterns shift at different life stages. The tool adjusts its reference data based on whether you calculate for a baby, a school-age child, or an adult.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 my-6">
                                <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                    <div>
                                        <span className="font-bold text-foreground block text-sm">Ages 0–2</span>
                                        <p className="text-muted text-sm">WHO Child Growth Standards</p>
                                    </div>
                                </div>
                                <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                    <div>
                                        <span className="font-bold text-foreground block text-sm">Ages 2–20</span>
                                        <p className="text-muted text-sm">CDC Growth Charts</p>
                                    </div>
                                </div>
                                <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                    <div>
                                        <span className="font-bold text-foreground block text-sm">Adults</span>
                                        <p className="text-muted text-sm">NHANES Population Data</p>
                                    </div>
                                </div>
                                <div className="bg-bg border border-border p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-2 h-full bg-accent rounded-full shrink-0" />
                                    <div>
                                        <span className="font-bold text-foreground block text-sm">Boys and Girls</span>
                                        <p className="text-muted text-sm">Sex-specific reference curves</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10 mt-8">
                                <div id="height-percentile-calculator-for-babies-and-infants" className="scroll-mt-24">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Height Percentile Calculator for Babies and Infants</h3>
                                    <p className="text-muted leading-relaxed">
                                        The infant height weight percentile calculator uses <span className='text-accent font-bold '> WHO Growth Standards </span> for children in the first two years of life. WHO built this dataset from data collected across six countries to create an international reference. The baby height percentile calculator tracks length measured lying down, not standing height. Infants gain several centimeters in a single month during this period, so small percentile shifts between visits are normal.
                                    </p>
                                    <p className="text-muted leading-relaxed mt-2">
                                        The infant height percentile calculator produces the most useful information when you run it across multiple well-baby visits rather than as a one-time check.
                                    </p>
                                </div>

                                <div id="height-percentile-calculator-for-toddlers-and-kids" className="scroll-mt-24">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Height Percentile Calculator for Toddlers and Kids</h3>
                                    <p className="text-muted leading-relaxed">
                                        From age 2 through adolescence, the child height weight percentile calculator draws on <span className='text-accent font-bold'> CDC growth chart</span> reference data . Growth in this phase is steadier than in infancy but follows clear age-specific patterns. The child height percentile calculator accounts for age in months rather than years to keep results accurate for children who fall between birthdays.
                                    </p>
                                    <p className="text-muted leading-relaxed mt-2">
                                        Parents often run the height and weight percentile calculator for kids before annual checkups to understand what the numbers mean before meeting the pediatrician. The tool does not replace a clinical assessment.
                                    </p>
                                </div>

                                <div id="height-percentile-calculator-for-boys-and-girls" className="scroll-mt-24">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Height Percentile Calculator for Boys and Girls</h3>
                                    <p className="text-muted leading-relaxed">
                                        Boys and girls follow separate growth curves, especially after age 8. Girls typically begin their growth spurt around ages 10 to 11. Boys tend to peak between ages 12 and 14. The height percentile girl calculator and the height percentile calculator for boys each reference sex-specific datasets from the CDC.
                                    </p>
                                    <p className="text-muted leading-relaxed mt-2">
                                        Entering the correct sex is the single most important input for an accurate result. A girl measured against a male growth chart would show a meaningfully different percentile than her correct female result. The calculator applies the right curve automatically.
                                    </p>
                                </div>

                                <div id="height-percentile-calculator-for-adults" className="scroll-mt-24">
                                    <h3 className="text-xl font-bold text-foreground mb-3">Height Percentile Calculator for Adults</h3>
                                    <p className="text-muted leading-relaxed">
                                        Adults do not grow, so the adult height percentile calculator compares your height against a fixed population distribution rather than an age-adjusted growth curve. Reference data for adults comes from national health surveys including <span className='text-accent font-bold'>NHANES</span>. The height percentile calculator for adults is a straightforward population comparison: you are either taller or shorter than a given percentage of adults of the same sex.
                                    </p>
                                    <p className="text-muted leading-relaxed mt-2">
                                        The adult male height percentile calculator uses male-specific distributions because adult male and female height distributions are distinct. A result at the 50th percentile on the US adult male height percentile calculator corresponds to approximately 5 feet 9 inches (175 cm).
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section id="us-height-percentile-calculator" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">US Height Percentile Calculator</h2>
                            <p className="text-muted leading-relaxed">
                                The US height percentile calculator draws on growth data published by the <span className='text-accent font-bold'>Centers for Disease Control and Prevention</span>. CDC growth charts cover children and adolescents aged 2 to 20 and come from nationally representative US population data collected across multiple survey cycles.
                            </p>
                            <p className="text-muted leading-relaxed">
                                For US adults, the calculator uses height distributions from the <span className='text-accent font-bold'>National Health and Nutrition Examination Survey (NHANES)</span>. NHANES provides the reference population for all adult percentile comparisons in this tool.
                            </p>
                        </section>

                        <section id="how-to-interpret-height-percentile-result" className="space-y-6 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">How to Interpret Your Height Percentile Result</h2>
                            <p className="text-muted leading-relaxed">
                                A single percentile height calculator result is a snapshot, not a diagnosis. Use this table to read your result:
                            </p>

                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Percentile range</th>
                                            <th className="px-6 py-4">Interpretation</th>
                                            <th className="px-6 py-4">What it suggests</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-muted divide-y divide-border/50">
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-accent">90 to 100</td>
                                            <td className="px-6 py-4">Very tall compared to peers</td>
                                            <td className="px-6 py-4">Well above average for age and sex</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">75 to 90</td>
                                            <td className="px-6 py-4">Above average</td>
                                            <td className="px-6 py-4">Taller than most peers</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">25 to 75</td>
                                            <td className="px-6 py-4">Average height range</td>
                                            <td className="px-6 py-4">Normal and expected for most people</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-foreground">10 to 25</td>
                                            <td className="px-6 py-4">Below average</td>
                                            <td className="px-6 py-4">Shorter than most, within normal variation</td>
                                        </tr>
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-red-500">Below 10</td>
                                            <td className="px-6 py-4">Significantly shorter than peers</td>
                                            <td className="px-6 py-4">Worth discussing with a healthcare provider</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-muted leading-relaxed">
                                Falling below the 10th percentile is worth noting. Family height history, birth weight, and rate of change across multiple visits all factor into what a clinician considers meaningful. A consistent trend along the same band is more informative than any single percentile result.
                            </p>
                        </section>

                        <section id="example-height-percentile-calculation" className="space-y-6 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Example Height Percentile Calculation</h2>
                            <p className="text-muted leading-relaxed">
                                Here is how the percentile height calculator works through a real example:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="text-sm font-black uppercase text-foreground mb-4 border-b border-border pb-2">Input</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between"><span className="text-muted">Age</span><span className="font-bold text-foreground">10 years</span></div>
                                        <div className="flex justify-between"><span className="text-muted">Sex</span><span className="font-bold text-foreground">Male</span></div>
                                        <div className="flex justify-between"><span className="text-muted">Height</span><span className="font-bold text-foreground">138 cm</span></div>
                                    </div>
                                </div>
                                <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
                                    <h4 className="text-sm font-black uppercase text-foreground mb-4 border-b border-border pb-2">Result Data</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between"><span className="text-muted">CDC reference median</span><span className="font-bold text-foreground">137 cm</span></div>
                                        <div className="flex justify-between"><span className="text-muted">Deviation</span><span className="font-bold text-accent">+1 cm above</span></div>
                                        <div className="flex justify-between"><span className="text-muted">Result</span><span className="font-black text-foreground">55th percentile</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-bg border border-border p-6 rounded-2xl">
                                <div className="flex items-center justify-between text-xs font-bold text-muted mb-2">
                                    <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                                </div>
                                {/* Simple visual bar logic */}
                                <div className="h-4 w-full bg-surface border border-border rounded-full relative overflow-hidden flex">
                                    <div className="h-full bg-red-500/50 w-[10%]" title="Below 10" />
                                    <div className="h-full bg-orange-400/50 w-[15%]" title="10-25" />
                                    <div className="h-full bg-accent/30 w-[50%]" title="25-75 (avg)" />
                                    <div className="h-full bg-accent/70 w-[15%]" title="75-90" />
                                    <div className="h-full bg-accent w-[10%]" title="90-100" />

                                    {/* Indicator */}
                                    <div className="absolute top-0 bottom-0 w-1 bg-foreground z-10" style={{ left: '55%' }} />
                                </div>
                                <div className="mt-3 text-center">
                                    <span className="font-black text-foreground text-lg">55th</span> <span className="text-muted text-sm">— average range</span>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed">
                                This child sits one centimeter above the median for a 10-year-old boy. A result of 55 on the height percentile calculator places him in the average range, above 55 out of 100 peers. If this result stays near the same band at the next checkup, it confirms steady, consistent growth along a normal trajectory.
                            </p>

                            <ExampleCalculationVisual />
                        </section>

                        <section id="why-height-percentiles-are-used-in-pediatric-growth-monitoring" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Why Height Percentiles Are Used in Pediatric Growth Monitoring</h2>
                            <p className="text-muted leading-relaxed">
                                The World Health Organization and the Centers for Disease Control and Prevention both recommend tracking height and weight percentiles across multiple visits as a core part of pediatric care. A single measurement shows where a child stands today. A series of measurements shows whether they grow as expected.
                            </p>
                            <p className="text-muted leading-relaxed">Consistent tracking across checkups helps identify three specific patterns:</p>
                            <ul className="space-y-2 text-muted list-disc pl-5 marker:text-accent">
                                <li>Growth faltering, where a child&apos;s percentile drops significantly between visits</li>
                                <li>Early signs of hormonal or nutritional conditions that affect child development</li>
                                <li>Whether a child recovers well after illness or low birth weight</li>
                            </ul>
                            <p className="text-muted leading-relaxed mt-4">
                                The pediatric height weight percentile calculator is a starting point for these conversations, not a replacement for them. Clinicians plot results on a CDC growth chart across multiple visits and look for consistent tracking along the same percentile band rather than focusing on any single number.
                            </p>
                        </section>

                        <section id="try-the-height-and-weight-percentile-calculator" className="bg-surface border border-border rounded-3xl p-8 md:p-12 text-center scroll-mt-24 shadow-xl">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">Try the Height and Weight Percentile Calculator</h2>
                            <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
                                Enter your age, height, and weight above to get your result from the height and weight percentile calculator instantly.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground"><CheckCircle2 className="text-accent w-4 h-4 shrink-0" /> Works for babies, toddlers, children, and adults</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground"><CheckCircle2 className="text-accent w-4 h-4 shrink-0" /> Separate results for height and weight percentile</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground"><CheckCircle2 className="text-accent w-4 h-4 shrink-0" /> Plain-language interpretation included</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground"><CheckCircle2 className="text-accent w-4 h-4 shrink-0" /> Based on WHO and CDC reference data</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground"><CheckCircle2 className="text-accent w-4 h-4 shrink-0" /> Free, no account, any device</div>
                            </div>

                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.05] transition-all shadow-xl shadow-accent/20 active:scale-95 inline-block"
                            >
                                Scroll to top and calculate now ↑
                            </button>
                        </section>

                        {/* FAQ Accordion Section */}
                        <div className="border border-border rounded-[2.5rem] overflow-hidden bg-surface transition-colors duration-500 shadow-sm mt-4">
                            <div className="px-8 md:px-12 pt-10 pb-8 text-center sm:text-left space-y-2 border-b border-border">
                                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                    <HelpCircle size={12} /> HELP CENTER
                                </div>
                                <h2 id="frequently-asked-questions" className="text-3xl font-black text-foreground scroll-mt-24">Frequently Asked Questions</h2>
                            </div>

                            <div className="px-6 md:px-10 py-6 flex flex-col gap-3">
                                {QA.map((item, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/50 bg-bg shadow-lg shadow-accent/5' : 'border-border bg-bg hover:border-accent/30'}`}
                                        >
                                            <button
                                                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                            >
                                                <span className={`text-sm font-bold transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{item.q}</span>
                                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className={`shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-muted'}`}>
                                                    <ChevronDown size={18} />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                                                        <div className="px-5 pt-0 pb-5 border-t border-border/40">
                                                            <p className="text-sm text-muted leading-relaxed pt-4">
                                                                {item.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* References Section */}
                        <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8">
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Sources</h3>
                            <ul className="space-y-3 break-words overflow-hidden list-disc pl-2 marker:text-muted/40">
                                <li><a
                                    href='https://www.who.int/tools/child-growth-standards/standards'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline" >World Health Organization Child Growth Standards. WHO, 2006.</a></li>
                                <li><a
                                    href='https://www.cdc.gov/growthcharts/cdc-growth-charts.htm'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline" >CDC Clinical Growth Charts. Centers for Disease Control and Prevention, 2000 (revised 2022).</a></li>
                                <li><a
                                    href='https://www.cdc.gov/nchs/nhanes/index.html'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline" >NHANES: National Health and Nutrition Examination Survey. CDC National Center for Health Statistics.</a></li>
                                <li><a
                                    href='https://pubmed.ncbi.nlm.nih.gov/12043359/'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline" >Kuczmarski RJ et al. (2000). CDC growth charts: United States. Advance Data from Vital and Health Statistics, No. 314.</a></li>
                                <li> Tanner JM. Growth at Adolescence. Blackwell Scientific Publications. </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t border-border mt-auto">
                <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/about" className="hover:text-foreground">About</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <button className="hover:text-foreground">FAQ</button>
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