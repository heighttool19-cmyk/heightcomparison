import React from 'react';
import {
    Plus,
    Monitor,
    CheckCircle2,
    Camera,
    Smartphone,
    Info,
    Ruler,
    Lock,
    ShieldCheck,
    Check,
    HelpCircle,
    ArrowRight,
    Sparkles,
    ChevronRight,
    AlertCircle,
    Layers,
    Crop,
    Save,
    Maximize2
} from 'lucide-react';
import { ImageMeasurement } from '@/components/ImageMeasurement';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import {
    IMAGE_TO_HEIGHT_FAQ,
    REFERENCE_OBJECTS,
    ACCURACY_TEST_ROWS,
    WHAT_YOU_CAN_MEASURE,
    NO_TAPE_METHODS,
    CLINICAL_MEASUREMENT_STEPS,
    MEASUREMENT_ERROR_CAUSES,
    IMAGE_MEASUREMENT_STEPS,
    ACCURACY_TIPS
} from '@/constants/imageToHeight';
import JsonLd from '@/components/common/JsonLd';
import { IMAGE_TO_HEIGHT_SCHEMA } from '@/constants/schemas/imageToHeight';

export default function ImageToHeightPage() {
    const stepIcons = [
        <Camera key="1" size={20} />,
        <Crop key="2" size={20} />,
        <Ruler key="3" size={20} />,
        <Smartphone key="4" size={20} />,
        <Save key="5" size={20} />
    ];

    return (
        <div className="flex-1 bg-canvas p-2 py-8 md:p-8 transform-gpu">
            <JsonLd data={IMAGE_TO_HEIGHT_SCHEMA} />
            <div className="flex-1 flex flex-col justify-center items-center md:flex-row relative p-2 md:p-4 gap-4 bg-canvas overflow-x-clip w-full transform-gpu">

                {/* Right Panel (Tool & Content) - Shown first on mobile */}
                <div className="responsive-tool-container flex flex-col gap-6 pb-10">

                    {/* Interactive Measurement Tool Box */}
                    <div id="image-measurement-tool" className="flex-1 bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative scroll-mt-24">
                        <div className="p-4 md:p-8 flex flex-col relative w-full">
                            {/* Ghost Watermark */}
                            <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-[16vw] md:text-[12vw] font-black text-foreground opacity-5 pointer-events-none select-none tracking-tighter leading-none transform-gpu">
                                HEIGHT
                            </div>
                            <div className="relative z-10 w-full h-fit max-w-4xl mx-auto">
                                <ImageMeasurement />
                            </div>
                        </div>
                    </div>

                    {/* Comprehensive Content Section */}
                    <div className="flex flex-col gap-14 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl mx-auto w-full">

                        {/* 1. Hero & Overview Section */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
                                <Sparkles size={14} /> Image to Height
                            </div>

                            <h1 className="text-2xl md:text-[40px] font-black text-foreground leading-[1.1] tracking-tighter uppercase px-3 py-4 bg-accent/5 rounded-2xl border-l-8 border-l-accent">
                                Measure Your Height From a Photo. <span className="text-accent">No Tape Measure Needed.</span>
                            </h1>

                            <p className="text-muted leading-relaxed text-base md:text-lg max-w-3xl mt-6 font-bold tracking-[0.01em] opacity-90 px-2">
                                Upload a full-body photo with a door, an A4 sheet, or a credit card in the frame. Mark the reference object and enter its real size, then draw a line from the floor to the top of the head. Get your height in centimeters and in feet and inches. Results land within 1 to 2 centimeters. Free, no sign-up, works on any device.
                            </p>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap gap-2.5 pt-2 px-2">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <CheckCircle2 size={14} className="text-accent" /> Free to use
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <CheckCircle2 size={14} className="text-accent" /> No account needed
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <Lock size={14} className="text-green-600 dark:text-green-400" /> Photo stays on your device
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <CheckCircle2 size={14} className="text-accent" /> Results in cm and ft/in
                                </span>
                            </div>

                            {/* CTA Action */}
                            <div className="pt-2 flex flex-col items-start gap-4">
                                <Link
                                    href="#image-measurement-tool"
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.03] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Monitor size={16} /> Upload Your Photo and Measure Now
                                </Link>
                                <p className="text-[11px] text-muted font-black flex items-center gap-1.5 ml-2 uppercase tracking-wider">
                                    <ShieldCheck size={14} className="text-accent" /> Accurate to 1–2 cm. 100% private. Runs in browser.
                                </p>
                            </div>

                            {/* Photo Prep Guidelines Card */}
                            <div className="bg-surface border border-border rounded-2xl p-5 md:p-6 shadow-sm mt-6">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Check size={16} className="text-accent" /> Check 3 Things Before Taking Your Photo:
                                </h3>
                                <div className="grid sm:grid-cols-3 gap-3 text-xs md:text-sm font-bold text-muted">
                                    <div className="p-3 rounded-xl bg-accent/5 border border-border/50 flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-black">1</div>
                                        <span>Full body in frame, head to toe with floor visible.</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-accent/5 border border-border/50 flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-black">2</div>
                                        <span>Stand against the same wall as the reference object.</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-accent/5 border border-border/50 flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-black">3</div>
                                        <span>Phone upright and level, at about waist height.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Step-by-Step Visualization */}
                        <div className="space-y-8 w-full">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    Five Taps, One Photo
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    How the Image Height Tool Works: Step by Step
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    A photo holds its own scale when one object of known size sits in the frame. Tell the tool how long that object is, and it can measure anyone or anything standing beside it.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {IMAGE_MEASUREMENT_STEPS.map((step, idx) => (
                                    <div key={idx} className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-all hover:translate-y-[-2px] group flex flex-col shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all mb-4">
                                            {stepIcons[idx]}
                                        </div>
                                        <p className="text-[12px] font-black uppercase text-accent mb-1 tracking-widest">
                                            Step {step.step}
                                        </p>
                                        <h3 className="text-sm font-black text-foreground mb-2 leading-snug uppercase tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-[12px] text-muted leading-relaxed font-medium">
                                            {step.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. What You Can Measure from a Photo */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    Beyond Your Own Height
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    What You Can Measure from a Photo
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    Anything works if a reference of known size stands at the exact same distance from the camera.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {WHAT_YOU_CAN_MEASURE.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between ${item.isWide ? 'md:col-span-2' : ''}`}
                                    >
                                        <div>
                                            <h3 className="text-base font-black text-foreground uppercase tracking-wide mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted leading-relaxed font-medium">
                                                {item.desc}
                                                {item.linkHref && (
                                                    <>
                                                        {' '}
                                                        <Link href={item.linkHref} className="text-accent underline hover:opacity-80 font-bold">
                                                            {item.linkLabel}
                                                        </Link>
                                                        .
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Why Photo instead of AR App */}
                            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Info size={16} className="text-accent" /> Why Use a Photo Instead of an AR Measurement App?
                                </h3>
                                <ul className="space-y-2 text-xs md:text-sm text-muted font-medium">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                        <span><strong>Measures past moments:</strong> AR apps only measure what is in front of you right now. A photo allows you to measure historic pictures, past milestones, and archive shots.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                        <span><strong>Zero installation:</strong> Runs natively in any modern browser on iOS, Android, Mac, or PC with no apps to download or subscriptions.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                        <span><strong>Complete device privacy:</strong> Your photo stays securely inside your browser's local sandbox and is never uploaded to any remote server.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. Which Reference Object to Use (Calibration Table) */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    Calibration Reference
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    Which Reference Object to Use for Calibration
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    The more certain you are of the reference size, the more you can trust the result. Standardized objects guarantee repeatable accuracy.
                                </p>
                            </div>

                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-accent/5 border-b border-border text-[11px] font-mono uppercase tracking-wider text-muted">
                                            <th className="p-4 font-bold">Object</th>
                                            <th className="p-4 font-bold">Size to enter</th>
                                            <th className="p-4 font-bold">Standard dimension?</th>
                                            <th className="p-4 font-bold">Best for</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {REFERENCE_OBJECTS.map((ref, idx) => (
                                            <tr key={idx} className="hover:bg-accent/[0.02] transition-colors">
                                                <td className="p-4 font-black text-foreground uppercase tracking-tight">
                                                    {ref.object}
                                                </td>
                                                <td className="p-4 font-mono font-bold text-accent whitespace-nowrap">
                                                    {ref.size}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${ref.isStandard ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                                                        {ref.standard}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-muted font-medium text-xs md:text-sm">
                                                    {ref.bestFor}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 5. Accuracy & Tilt Analysis Section */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    Empirical Accuracy Testing
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    How to Get an Accurate Result from a Photo
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-3xl">
                                    Two habits cause most of the error: standing in front of the reference and tilting the phone. Camera height on its own does not matter. Keep the phone upright and level, and stand against the same wall as the reference.
                                </p>
                            </div>

                            {/* Camera Tilt Explanation Cards */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-foreground uppercase">Low, Tilted Up</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">Reads taller</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed font-medium">
                                        The top of the scene sits farther from the lens and shrinks, so the door looks short next to the person (+2.4 to +4.5 cm error).
                                    </p>
                                </div>

                                <div className="bg-surface border-2 border-green-500/30 p-5 rounded-2xl flex flex-col gap-2 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-foreground uppercase">Level, at Waist Height</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">Closest result</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed font-medium">
                                        The phone faces the wall square on, so the reference and the person maintain their true geometric proportions (0.0 cm error).
                                    </p>
                                </div>

                                <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-foreground uppercase">High, Tilted Down</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">Reads shorter</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed font-medium">
                                        The floor sits farther from the lens and shrinks, so the door looks tall next to the person (−2.8 to −5.9 cm error).
                                    </p>
                                </div>
                            </div>

                            {/* Accuracy Test Table */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                                    Our Controlled Accuracy Benchmark (14 Rendered Scenes)
                                </h3>
                                <p className="text-xs text-muted leading-relaxed font-medium">
                                    We evaluated 14 calibrated scenes with known heights taken from 3.5 meters away to isolate camera geometry from manual tap variations.
                                </p>
                                <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                                        <thead>
                                            <tr className="bg-accent/5 border-b border-border text-[11px] font-mono uppercase tracking-wider text-muted">
                                                <th className="p-3 md:p-4 font-bold">Photo Setup</th>
                                                <th className="p-3 md:p-4 font-bold whitespace-nowrap">True Height</th>
                                                <th className="p-3 md:p-4 font-bold whitespace-nowrap">Measured</th>
                                                <th className="p-3 md:p-4 font-bold whitespace-nowrap">Error</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {ACCURACY_TEST_ROWS.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-accent/[0.02] transition-colors">
                                                    <td className="p-3 md:p-4 font-medium text-foreground">
                                                        {row.setup}
                                                    </td>
                                                    <td className="p-3 md:p-4 font-mono font-bold whitespace-nowrap">
                                                        {row.trueHeight}
                                                    </td>
                                                    <td className="p-3 md:p-4 font-mono font-bold whitespace-nowrap">
                                                        {row.measured}
                                                    </td>
                                                    <td className="p-3 md:p-4 font-mono font-bold whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs ${row.isExact ? 'bg-green-500/10 text-green-600 dark:text-green-400 font-black' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                                                            {row.error}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-muted leading-relaxed font-medium pt-1">
                                    <strong>Pixel Sensitivity:</strong> Tapping adds its own error, and small references magnify it. On a phone screen, missing one end of the reference by a single screen pixel moves a 172 cm result by about 1 cm with a door, 7 cm with an A4 sheet, and 23 cm with a card. Use the biggest reference in the photo, and zoom in before tapping.
                                </p>
                            </div>

                            {/* 4 Practical Tips Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {ACCURACY_TIPS.map((tip, idx) => (
                                    <div key={idx} className="bg-surface border border-border p-5 rounded-2xl flex gap-3.5 items-start">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                            <Plus size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-foreground uppercase tracking-wide mb-1">
                                                {tip.title}
                                            </h3>
                                            <p className="text-xs text-muted leading-relaxed font-medium">
                                                {tip.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 6. Alternative Methods Without a Tape */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    Alternative Methods
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    How to Measure Your Height Without a Measuring Tape
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    Five methods work reliably when no tape measure is available. Each uses an object of known size to establish scale.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {NO_TAPE_METHODS.map((method, idx) => (
                                    <div
                                        key={idx}
                                        className={`bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between ${method.isWide ? 'md:col-span-2' : ''}`}
                                    >
                                        <div>
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <h3 className="text-base font-black text-foreground uppercase tracking-wide">
                                                    {method.title}
                                                </h3>
                                                <div className="flex gap-1.5 flex-wrap">
                                                    {method.tags.map((tag, tIdx) => (
                                                        <span key={tIdx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-accent/10 text-accent">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs md:text-sm text-muted leading-relaxed font-medium mt-2">
                                                {method.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-muted leading-relaxed font-medium">
                                Each method gets you close, and none is exact. Confirming the precise number still needs a calibrated reference at some point, unless you use a calibrated photo.
                            </p>
                        </div>

                        {/* 7. Clinical Measurement Standard */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    Clinical Standard
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    How to Measure Height Accurately: The Clinic Method
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    Adapted from clinical stadiometer protocols (CDC guidelines) to ensure maximum physical accuracy at home.
                                </p>
                            </div>

                            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                                <ol className="space-y-3">
                                    {CLINICAL_MEASUREMENT_STEPS.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-muted font-medium">
                                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-black shrink-0 mt-0.5">
                                                {idx + 1}
                                            </div>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Why Measuring Yourself Goes Wrong */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                                    Why Measuring Yourself Alone Goes Wrong
                                </h3>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                    {MEASUREMENT_ERROR_CAUSES.map((err, idx) => (
                                        <div key={idx} className="bg-surface border border-border rounded-xl p-4">
                                            <h4 className="text-xs font-black text-foreground uppercase mb-1">
                                                {err.title}
                                            </h4>
                                            <p className="text-[11px] text-muted leading-relaxed font-medium">
                                                {err.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted leading-relaxed font-medium">
                                    Doing it alone makes everything worse. Standing straight, balancing a hardback on your head, marking a wall, and measuring the mark all at once is physically awkward. A photo with a reference object removes the need for a second person entirely.
                                </p>
                            </div>
                        </div>

                        {/* 8. Frequently Asked Questions */}
                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion items={IMAGE_TO_HEIGHT_FAQ} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}