import { Info, BarChart2, Zap, Database, Lock, ShieldCheck } from 'lucide-react';
import JsonLd from '@/components/common/JsonLd';
import { ABOUT_SCHEMA } from '@/constants/schemas/about';

export default function AboutPage() {
    return (
        <div className="flex-1 bg-canvas py-12 px-4 sm:px-6 lg:px-8">
            <JsonLd data={ABOUT_SCHEMA} />
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-accent/10 text-accent mb-6">
                        <Info size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase mb-4">
                        About <span className="text-accent">Height Comparison</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
                </div>

                {/* Main Content Card */}
                <div className="bg-surface border border-border rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Section 1: Intro */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl md:text-2xl text-foreground font-bold leading-relaxed tracking-tight">
                                HeightComparison started as a side project built around one simple observation: height numbers are almost useless without context. You need to see them. A 12 cm gap between two people at 165 cm is a genuinely different experience to the same 12 cm gap at 185 cm. The proportion changes. The visual relationship changes. Yet every other comparison tool on the internet just subtracts one number from another and calls it done.
                            </p>
                            <p className="text-lg text-muted font-medium mt-6">
                                We built something different.
                            </p>
                        </div>

                        {/* Section 2: What the Tool Actually Does */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart2 className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">What the Tool Actually Does</h2>
                            </div>
                            <div className="space-y-6 text-muted leading-relaxed font-medium text-lg">
                                <p>
                                    The height comparison chart takes your measurements and renders them at true proportional scale. Every bar is mathematically sized relative to every other bar on the screen. No rounding, no visual shortcuts, no bars that look "close enough." If Person A is 170 cm and Person B is 198 cm, that 16.5% gap is visible exactly as it should be.
                                </p>
                                <p>
                                    You can compare up to an unlimited number of subjects at once, which turns out to be useful more often than you'd expect. A family of five, a sports roster, a lineup of anime characters, a person standing next to a waterfall. All of it on one chart, all of it at scale.
                                </p>
                                <p>
                                    The celebrity database covers athletes, actors, musicians, and public figures across regions including Bollywood, British, Asian, and American entertainment. The fictional character library pulls from official production guides and licensed databooks for anime, cartoons, DC, and fantasy franchises. These aren't crowd-estimated figures. They're sourced from the records that the creators and organizations themselves published.
                                </p>
                                <p>
                                    There's also an image upload feature that slots a photo into the chart at real proportions, accurate to within 1 to 2 cm. Useful if you want to visualize yourself against a reference without manually measuring.
                                </p>
                            </div>
                        </div>

                        {/* Section 3: The Other Calculators */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">The Other Calculators</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Height Difference Calculator", text: "For when you want the exact gap between two heights in centimetres, inches, and percentage, without building a full chart. Faster for focused comparisons." },
                                    { title: "Height Predictor", text: "Uses the Khamis-Roche and Mid-Parental formulas to estimate adult height from a child's current measurements and parent heights. These are the same formulas used in clinical settings, not guesswork." },
                                    { title: "Height Weight Percentile Calculator", text: "Compares a person's height and weight against WHO and CDC population data, with charts broken down by age and sex. It covers both adults and children." },
                                    { title: "Ideal Body Weight Calculator", text: "Runs the Devine, Robinson, and Hamwi formulas side by side so you can see where each lands, rather than presenting a single number as if it's the whole answer." },
                                    { title: "Average Height by Country", text: "Covers 46 countries with a sortable table, regional breakdowns, a world heatmap, and height extremes. It's the reference we kept wanting to have open in another tab when thinking about global height context." },
                                    { title: "Image to Height", text: "Estimates height from a photo. There's also a morning height variation guide built into it, which matters more than most people realize when comparing measurements taken at different times of day." }
                                ].map((tool, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-accent/5 border border-accent/10">
                                        <h3 className="font-black text-foreground text-sm uppercase mb-2 tracking-wide">{tool.title}</h3>
                                        <p className="text-sm text-muted/80 leading-relaxed font-medium font-sans">
                                            {tool.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 4: No Account */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">No Account, No Payment, No Watermarks</h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                                <p>
                                    This decision was made early and has not changed. The PNG export has no watermark. The celebrity database is not behind a paywall. There is no subscription tier that unlocks features. The full tool is free.
                                </p>
                                <p>
                                    That's not a marketing angle. It's just how the tool was designed. Adding friction through account creation or paywalled exports would make the tool worse. Height comparison is not a premium activity.
                                </p>
                            </div>
                        </div>

                        {/* Section 5: Accuracy */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">A Note on Data Accuracy</h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                                <p>
                                    Conflicting height records are common, particularly for celebrities. Where data conflicts, we normalize to the most recently verified figure from a credible public source, not the most widely repeated one. Character heights come from licensed official materials where possible. Landmark and object dimensions come from architectural and scientific reference sources.
                                </p>
                                <p className="font-black text-foreground uppercase tracking-widest text-sm pt-4">
                                    Nothing here is user-submitted.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pb-12">
                     <p className="text-muted font-medium mb-6 italic opacity-70">
                        Visualizing height context, one pixel at a time.
                     </p>
                </div>
            </div>
        </div>
    );
}
