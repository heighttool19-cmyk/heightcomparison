import React from 'react';
import { getTranslations } from 'next-intl/server';
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
    Sparkles,
    Crop,
    Save
} from 'lucide-react';
import { ImageMeasurement } from '@/components/ImageMeasurement';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/common/JsonLd';
import { IMAGE_TO_HEIGHT_SCHEMA } from '@/constants/schemas/imageToHeight';
import { getAlternateLanguages, getCanonicalUrl } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('imageToHeightTitle'),
        description: t('imageToHeightDescription'),
        alternates: {
            canonical: getCanonicalUrl('/image-to-height', locale),
            languages: getAlternateLanguages('/image-to-height'),
        }
    };
}

interface StepItem {
    step: string;
    title: string;
    desc: string;
}

interface MeasureItem {
    title: string;
    desc: string;
    linkLabel?: string;
    linkHref?: string;
    isWide?: boolean;
}

interface ReferenceRow {
    object: string;
    size: string;
    standard: string;
    bestFor: string;
    isStandard?: boolean;
}

interface AccuracyRow {
    setup: string;
    trueHeight: string;
    measured: string;
    error: string;
    isExact?: boolean;
}

interface TipItem {
    title: string;
    desc: string;
}

interface MethodItem {
    id: string;
    title: string;
    tags: string[];
    desc: string;
    isWide?: boolean;
}

interface ErrorCause {
    title: string;
    desc: string;
}

interface FaqItem {
    id: string;
    q: string;
    a: string;
}

export default async function ImageToHeightPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'imageToHeight' });

    const stepIcons = [
        <Camera key="1" size={20} />,
        <Crop key="2" size={20} />,
        <Ruler key="3" size={20} />,
        <Smartphone key="4" size={20} />,
        <Save key="5" size={20} />
    ];

    const steps = t.raw('howItWorks.steps') as StepItem[];
    const measureItems = t.raw('whatYouCanMeasure.items') as MeasureItem[];
    const referenceRows = t.raw('referenceObjects.rows') as ReferenceRow[];
    const benchmarkRows = t.raw('accuracy.benchmarkRows') as AccuracyRow[];
    const tips = t.raw('accuracy.tips') as TipItem[];
    const methods = t.raw('noTapeMethods.methods') as MethodItem[];
    const clinicalSteps = t.raw('clinicMethod.steps') as string[];
    const errorCauses = t.raw('clinicMethod.errorCauses') as ErrorCause[];
    const faqItems = t.raw('faq.items') as FaqItem[];

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
                                <Sparkles size={14} /> {t('hero.eyebrow')}
                            </div>

                            <h1 className="text-2xl md:text-[40px] font-black text-foreground leading-[1.1] tracking-tighter uppercase px-3 py-4 bg-accent/5 rounded-2xl border-l-8 border-l-accent">
                                {t('hero.title')}<span className="text-accent">{t('hero.titleAccent')}</span>
                            </h1>

                            <p className="text-muted leading-relaxed text-base md:text-lg max-w-3xl mt-6 font-bold tracking-[0.01em] opacity-90 px-2">
                                {t('hero.description')}
                            </p>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap gap-2.5 pt-2 px-2">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <CheckCircle2 size={14} className="text-accent" /> {t('hero.badgeFree')}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <CheckCircle2 size={14} className="text-accent" /> {t('hero.badgeNoAccount')}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <Lock size={14} className="text-green-600 dark:text-green-400" /> {t('hero.badgePrivate')}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground shadow-xs">
                                    <CheckCircle2 size={14} className="text-accent" /> {t('hero.badgeUnits')}
                                </span>
                            </div>

                            {/* CTA Action */}
                            <div className="pt-2 flex flex-col items-start gap-4">
                                <Link
                                    href="#image-measurement-tool"
                                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.03] transition-all shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95"
                                >
                                    <Monitor size={16} /> {t('hero.ctaUpload')}
                                </Link>
                                <p className="text-[11px] text-muted font-black flex items-center gap-1.5 ml-2 uppercase tracking-wider">
                                    <ShieldCheck size={14} className="text-accent" /> {t('hero.accuracyNotice')}
                                </p>
                            </div>

                            {/* Photo Prep Guidelines Card */}
                            <div className="bg-surface border border-border rounded-2xl p-5 md:p-6 shadow-sm mt-6">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Check size={16} className="text-accent" /> {t('hero.prepTitle')}
                                </h3>
                                <div className="grid sm:grid-cols-3 gap-3 text-xs md:text-sm font-bold text-muted">
                                    <div className="p-3 rounded-xl bg-accent/5 border border-border/50 flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-black">1</div>
                                        <span>{t('hero.prep1')}</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-accent/5 border border-border/50 flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-black">2</div>
                                        <span>{t('hero.prep2')}</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-accent/5 border border-border/50 flex items-start gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 text-xs font-black">3</div>
                                        <span>{t('hero.prep3')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Step-by-Step Visualization */}
                        <div className="space-y-8 w-full">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('howItWorks.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('howItWorks.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    {t('howItWorks.description')}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-all hover:translate-y-[-2px] group flex flex-col shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all mb-4">
                                            {stepIcons[idx]}
                                        </div>
                                        <p className="text-[12px] font-black uppercase text-accent mb-1 tracking-widest">
                                            {t('howItWorks.stepPrefix')} {step.step}
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
                                    {t('whatYouCanMeasure.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('whatYouCanMeasure.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    {t('whatYouCanMeasure.description')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {measureItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between ${idx === 4 ? 'md:col-span-2' : ''}`}
                                    >
                                        <div>
                                            <h3 className="text-base font-black text-foreground uppercase tracking-wide mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted leading-relaxed font-medium">
                                                {item.desc}
                                                {idx === 1 && (
                                                    <>
                                                        <Link href="/height-predictor" className="text-accent underline hover:opacity-80 font-bold">
                                                            {item.linkLabel || 'predicted adult height'}
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
                                    <Info size={16} className="text-accent" /> {t('whatYouCanMeasure.whyArTitle')}
                                </h3>
                                <ul className="space-y-2 text-xs md:text-sm text-muted font-medium">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                        <span><strong>{t('whatYouCanMeasure.why1Bold')}</strong>{t('whatYouCanMeasure.why1Desc')}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                        <span><strong>{t('whatYouCanMeasure.why2Bold')}</strong>{t('whatYouCanMeasure.why2Desc')}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                                        <span><strong>{t('whatYouCanMeasure.why3Bold')}</strong>{t('whatYouCanMeasure.why3Desc')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 4. Which Reference Object to Use (Calibration Table) */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('referenceObjects.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('referenceObjects.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    {t('referenceObjects.description')}
                                </p>
                            </div>

                            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-accent/5 border-b border-border text-[11px] font-mono uppercase tracking-wider text-muted">
                                            <th className="p-4 font-bold">{t('referenceObjects.thObject')}</th>
                                            <th className="p-4 font-bold">{t('referenceObjects.thSize')}</th>
                                            <th className="p-4 font-bold">{t('referenceObjects.thStandard')}</th>
                                            <th className="p-4 font-bold">{t('referenceObjects.thBestFor')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {referenceRows.map((ref, idx) => (
                                            <tr key={idx} className="hover:bg-accent/[0.02] transition-colors">
                                                <td className="p-4 font-black text-foreground uppercase tracking-tight">
                                                    {ref.object}
                                                </td>
                                                <td className="p-4 font-mono font-bold text-accent whitespace-nowrap">
                                                    {ref.size}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${idx < 2 ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
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
                                    {t('accuracy.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('accuracy.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-3xl">
                                    {t('accuracy.description')}
                                </p>
                            </div>

                            {/* Camera Tilt Explanation Cards */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-foreground uppercase">{t('accuracy.tiltLowTitle')}</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">{t('accuracy.tiltLowBadge')}</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed font-medium">
                                        {t('accuracy.tiltLowDesc')}
                                    </p>
                                </div>

                                <div className="bg-surface border-2 border-green-500/30 p-5 rounded-2xl flex flex-col gap-2 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-foreground uppercase">{t('accuracy.tiltLevelTitle')}</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">{t('accuracy.tiltLevelBadge')}</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed font-medium">
                                        {t('accuracy.tiltLevelDesc')}
                                    </p>
                                </div>

                                <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-foreground uppercase">{t('accuracy.tiltHighTitle')}</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">{t('accuracy.tiltHighBadge')}</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed font-medium">
                                        {t('accuracy.tiltHighDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Accuracy Test Table */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                                    {t('accuracy.tableTitle')}
                                </h3>
                                <p className="text-xs text-muted leading-relaxed font-medium">
                                    {t('accuracy.tableDesc')}
                                </p>
                                <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                                        <thead>
                                            <tr className="bg-accent/5 border-b border-border text-[11px] font-mono uppercase tracking-wider text-muted">
                                                <th className="p-3 md:p-4 font-bold">{t('accuracy.thSetup')}</th>
                                                <th className="p-3 md:p-4 font-bold whitespace-nowrap">{t('accuracy.thTrueHeight')}</th>
                                                <th className="p-3 md:p-4 font-bold whitespace-nowrap">{t('accuracy.thMeasured')}</th>
                                                <th className="p-3 md:p-4 font-bold whitespace-nowrap">{t('accuracy.thError')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {benchmarkRows.map((row, idx) => (
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
                                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs ${idx < 2 ? 'bg-green-500/10 text-green-600 dark:text-green-400 font-black' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                                                            {row.error}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-muted leading-relaxed font-medium pt-1">
                                    <strong>{t('accuracy.pixelSensitivityBold')}</strong>{t('accuracy.pixelSensitivityDesc')}
                                </p>
                            </div>

                            {/* 4 Practical Tips Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {tips.map((tip, idx) => (
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
                                    {t('noTapeMethods.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('noTapeMethods.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    {t('noTapeMethods.description')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {methods.map((method, idx) => (
                                    <div
                                        key={idx}
                                        className={`bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between ${idx === 0 ? 'md:col-span-2' : ''}`}
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
                                {t('noTapeMethods.footer')}
                            </p>
                        </div>

                        {/* 7. Clinical Measurement Standard */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('clinicMethod.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('clinicMethod.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl">
                                    {t('clinicMethod.description')}
                                </p>
                            </div>

                            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                                <ol className="space-y-3">
                                    {clinicalSteps.map((step, idx) => (
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
                                    {t('clinicMethod.whyAloneTitle')}
                                </h3>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                    {errorCauses.map((err, idx) => (
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
                                    {t('clinicMethod.whyAloneFooter')}
                                </p>
                            </div>
                        </div>

                        {/* 8. Frequently Asked Questions */}
                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion
                                items={faqItems}
                                title={t('faq.title')}
                                badge={t('faq.badge')}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

