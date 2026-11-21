import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
    Plus,
    CheckCircle2,
    Info,
    Lock,
    Sparkles,
} from 'lucide-react';
import { ImageMeasurement } from '@/components/ImageMeasurement';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/common/JsonLd';
import { getImageToHeightSchema } from '@/constants/schemas/imageToHeight';
import { getAlternateLanguages, getCanonicalUrl, getSocialMetadata } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('imageToHeightTitle'),
        description: t('imageToHeightDescription'),
        alternates: {
            canonical: getCanonicalUrl('/image-to-height', locale),
            languages: getAlternateLanguages('/image-to-height'),
        },
        ...getSocialMetadata({
            title: t('imageToHeightTitle'),
            description: t('imageToHeightDescription'),
            path: '/image-to-height',
            locale,
        }),
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
}

interface ReferenceRow {
    object: string;
    size: string;
    standard: string;
    bestFor: string;
}

interface AccuracyRow {
    setup: string;
    trueHeight: string;
    measured: string;
    error: string;
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

    const stepImages = [
        '/images/image-to-height/live/step-1.jpg',
        '/images/image-to-height/live/step-2.jpg',
        '/images/image-to-height/live/step-3.jpg',
        '/images/image-to-height/live/step-4.jpg',
        '/images/image-to-height/live/step-5.jpg',
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
            <JsonLd data={getImageToHeightSchema(locale)} />
            <div className="flex-1 flex flex-col justify-center items-center md:flex-row relative p-2 md:p-4 gap-4 bg-canvas overflow-x-clip w-full transform-gpu">

                <div className="responsive-tool-container flex flex-col gap-10 pb-10 max-w-4xl mx-auto w-full">

                    {/* 1. Hero & Overview Section (Sits Above Tool) */}
                    <header className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
                            <Sparkles size={14} /> {t('hero.eyebrow')}
                        </div>

                        <h1 className="text-2xl md:text-[40px] font-black text-foreground leading-[1.15] tracking-tighter uppercase px-3 py-4 bg-accent/5 rounded-2xl border-l-8 border-l-accent">
                            {t('hero.title')}
                        </h1>

                        <p className="text-muted leading-relaxed text-base md:text-lg font-bold tracking-[0.01em] opacity-90 px-1">
                            {t('hero.description')}
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-2.5 pt-1 px-1">
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
                    </header>

                    {/* 2. Interactive Measurement Tool Box */}
                    <section id="image-measurement-tool" aria-label="Measurement Tool" className="bg-surface border border-border rounded-3xl shadow-xl overflow-hidden relative scroll-mt-24 w-full">
                        <div className="p-4 md:p-8 flex flex-col relative w-full">
                            {/* Tool Header & 3 Prep Tiles */}
                            <div className="mb-6">
                                <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">
                                    {t('hero.toolTitle')}
                                </h2>
                                <p className="text-xs md:text-sm text-muted font-medium mt-1">
                                    {t('hero.toolSubtitle')}
                                </p>
                                <div className="grid sm:grid-cols-3 gap-3 mt-4 text-xs md:text-sm font-bold text-muted">
                                    <div className="p-3.5 rounded-xl bg-accent/5 border border-border/60 flex items-start gap-2.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-accent"><circle cx="12" cy="4" r="2"/><path d="M12 6v8M8 10h8M10 22l2-8 2 8"/></svg>
                                        <span className="text-foreground">{t('hero.prep1')}</span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-accent/5 border border-border/60 flex items-start gap-2.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-accent"><rect x="4" y="3" width="7" height="18" rx="1"/><circle cx="17" cy="6" r="2"/><path d="M17 8v6M15 22l2-8 2 8"/></svg>
                                        <span className="text-foreground">{t('hero.prep2')}</span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-accent/5 border border-border/60 flex items-start gap-2.5">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-accent"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>
                                        <span className="text-foreground">{t('hero.prep3')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Client Interactive Tool Component */}
                            <div className="relative z-10 w-full h-fit max-w-4xl mx-auto">
                                <ImageMeasurement />
                            </div>

                            {/* Privacy line with lock icon */}
                            <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted font-medium text-center">
                                <Lock size={14} className="text-green-600 dark:text-green-400 shrink-0" />
                                <span>{t('hero.privacyLine')}</span>
                            </div>
                        </div>
                    </section>

                    {/* Comprehensive Content Sections */}
                    <div className="flex flex-col gap-14 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full">

                        {/* 3. Step-by-Step Visualization With Live Screens */}
                        <section className="space-y-6 w-full">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('howItWorks.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('howItWorks.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl text-sm md:text-base">
                                    {t('howItWorks.description')}
                                </p>
                            </div>

                            {/* 5 Step Cards with Images (Horizontal scroll on phone) */}
                            <div className="grid grid-flow-col auto-cols-[65%] sm:auto-cols-[45%] md:grid-flow-row md:grid-cols-5 gap-3 overflow-x-auto pb-3 pt-1 snap-x scroll-smooth">
                                {steps.map((step, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-2 min-w-0 snap-start"
                                    >
                                        <div className="relative aspect-[645/1398] w-full rounded-2xl overflow-hidden border border-border bg-surface-2 dark:bg-slate-900 shadow-xs">
                                            <Image
                                                src={stepImages[idx]}
                                                alt={step.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 70vw, 20vw"
                                            />
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center font-black text-xs shrink-0 mt-1">
                                            {step.step}
                                        </div>
                                        <h3 className="text-xs md:text-sm font-black text-foreground leading-snug uppercase tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-[11px] md:text-xs text-muted leading-relaxed font-medium">
                                            {step.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-muted font-medium italic">
                                {t('howItWorks.caption')}
                            </p>
                        </section>

                        {/* 4. What You Can Measure from a Photo */}
                        <section className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('whatYouCanMeasure.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('whatYouCanMeasure.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl text-sm md:text-base">
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
                                                        {' '}
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
                            <div className="bg-surface-2 dark:bg-accent/5 border border-border rounded-2xl p-6 shadow-xs flex flex-col gap-3">
                                <h3 className="text-sm md:text-base font-black text-foreground uppercase tracking-wide">
                                    {t('whatYouCanMeasure.whyArTitle')}
                                </h3>
                                <ul className="space-y-2 text-xs md:text-sm text-muted font-medium list-disc list-inside">
                                    <li>{t('whatYouCanMeasure.why1')}</li>
                                    <li>{t('whatYouCanMeasure.why2')}</li>
                                    <li>{t('whatYouCanMeasure.why3')}</li>
                                </ul>
                            </div>
                        </section>

                        {/* 5. Which Reference Object to Use (Calibration Table) */}
                        <section className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('referenceObjects.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('referenceObjects.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl text-sm md:text-base">
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
                        </section>

                        {/* 6. Accuracy & Tilt Analysis Section */}
                        <section className="space-y-8">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('accuracy.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('accuracy.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-3xl text-sm md:text-base">
                                    {t('accuracy.description')}
                                </p>
                            </div>

                            {/* Camera Angle Tilt Visual Diagrams */}
                            <div className="grid md:grid-cols-3 gap-4">
                                {/* Tilt 1: Low, tilted up */}
                                <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col gap-4">
                                    <svg viewBox="0 0 300 240" aria-hidden="true" className="w-full h-auto max-h-44">
                                        <line x1="10" y1="226" x2="290" y2="226" stroke="currentColor" strokeWidth="3" className="text-border" />
                                        <line x1="250" y1="24" x2="250" y2="226" stroke="currentColor" strokeWidth="3" className="text-border" />
                                        <rect x="244" y="43" width="6" height="183" className="fill-slate-400 dark:fill-slate-500" />
                                        <circle cx="228" cy="81" r="10" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="221" y="93" width="14" height="60" rx="5" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="222" y="151" width="12" height="75" rx="4" className="fill-slate-400 dark:fill-slate-500" />
                                        <line x1="46" y1="190.0" x2="244" y2="43" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" />
                                        <line x1="46" y1="190.0" x2="244" y2="226" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" />
                                        <line x1="46" y1="190.0" x2="244" y2="117.6" stroke="#f59e0b" strokeWidth="1.5" opacity=".55" />
                                        <g transform="rotate(-20 40 190.0)"><rect x="35" y="174.0" width="10" height="32" rx="3" className="fill-foreground" /></g>
                                    </svg>
                                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                                        <svg viewBox="0 0 120 150" aria-hidden="true" className="w-14 h-18 shrink-0">
                                            <rect x="4" y="4" width="112" height="142" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
                                            <rect x="6" y="128" width="108" height="16" className="fill-border" />
                                            <polygon points="74,32 92,32 96,128 70,128" className="fill-slate-400 dark:fill-slate-500" />
                                            <circle cx="41" cy="44" r="6" className="fill-slate-400 dark:fill-slate-500" />
                                            <rect x="35" y="51" width="12" height="38" rx="4" className="fill-slate-400 dark:fill-slate-500" />
                                            <rect x="36" y="88" width="10" height="40" rx="3" className="fill-slate-400 dark:fill-slate-500" />
                                        </svg>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xs font-black text-foreground uppercase">{t('accuracy.tiltLowTitle')}</h3>
                                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">{t('accuracy.tiltLowBadge')}</span>
                                            </div>
                                            <p className="text-[11px] text-muted leading-relaxed font-medium mt-1">
                                                {t('accuracy.tiltLowDesc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tilt 2: Level, at waist height */}
                                <div className="bg-surface border-2 border-green-500/40 p-5 rounded-2xl flex flex-col gap-4 shadow-sm">
                                    <svg viewBox="0 0 300 240" aria-hidden="true" className="w-full h-auto max-h-44">
                                        <line x1="10" y1="226" x2="290" y2="226" stroke="currentColor" strokeWidth="3" className="text-border" />
                                        <line x1="250" y1="24" x2="250" y2="226" stroke="currentColor" strokeWidth="3" className="text-border" />
                                        <rect x="244" y="43" width="6" height="183" className="fill-slate-400 dark:fill-slate-500" />
                                        <circle cx="228" cy="81" r="10" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="221" y="93" width="14" height="60" rx="5" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="222" y="151" width="12" height="75" rx="4" className="fill-slate-400 dark:fill-slate-500" />
                                        <line x1="46" y1="136.0" x2="244" y2="43" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
                                        <line x1="46" y1="136.0" x2="244" y2="226" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
                                        <line x1="46" y1="136.0" x2="244" y2="136.0" stroke="#10b981" strokeWidth="1.5" opacity=".55" />
                                        <g transform="rotate(0 40 136.0)"><rect x="35" y="120.0" width="10" height="32" rx="3" className="fill-foreground" /></g>
                                    </svg>
                                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                                        <svg viewBox="0 0 120 150" aria-hidden="true" className="w-14 h-18 shrink-0">
                                            <rect x="4" y="4" width="112" height="142" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
                                            <rect x="6" y="128" width="108" height="16" className="fill-border" />
                                            <polygon points="70,22 96,22 96,128 70,128" className="fill-slate-400 dark:fill-slate-500" />
                                            <circle cx="41" cy="44" r="6" className="fill-slate-400 dark:fill-slate-500" />
                                            <rect x="35" y="51" width="12" height="38" rx="4" className="fill-slate-400 dark:fill-slate-500" />
                                            <rect x="36" y="88" width="10" height="40" rx="3" className="fill-slate-400 dark:fill-slate-500" />
                                        </svg>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xs font-black text-foreground uppercase">{t('accuracy.tiltLevelTitle')}</h3>
                                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">{t('accuracy.tiltLevelBadge')}</span>
                                            </div>
                                            <p className="text-[11px] text-muted leading-relaxed font-medium mt-1">
                                                {t('accuracy.tiltLevelDesc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tilt 3: High, tilted down */}
                                <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col gap-4">
                                    <svg viewBox="0 0 300 240" aria-hidden="true" className="w-full h-auto max-h-44">
                                        <line x1="10" y1="226" x2="290" y2="226" stroke="currentColor" strokeWidth="3" className="text-border" />
                                        <line x1="250" y1="24" x2="250" y2="226" stroke="currentColor" strokeWidth="3" className="text-border" />
                                        <rect x="244" y="43" width="6" height="183" className="fill-slate-400 dark:fill-slate-500" />
                                        <circle cx="228" cy="81" r="10" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="221" y="93" width="14" height="60" rx="5" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="222" y="151" width="12" height="75" rx="4" className="fill-slate-400 dark:fill-slate-500" />
                                        <line x1="46" y1="64.0" x2="244" y2="43" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" />
                                        <line x1="46" y1="64.0" x2="244" y2="226" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" />
                                        <line x1="46" y1="64.0" x2="244" y2="117.3" stroke="#f59e0b" strokeWidth="1.5" opacity=".55" />
                                        <g transform="rotate(15 40 64.0)"><rect x="35" y="48.0" width="10" height="32" rx="3" className="fill-foreground" /></g>
                                    </svg>
                                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                                        <svg viewBox="0 0 120 150" aria-hidden="true" className="w-14 h-18 shrink-0">
                                            <rect x="4" y="4" width="112" height="142" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
                                            <rect x="6" y="128" width="108" height="16" className="fill-border" />
                                            <polygon points="69,14 97,14 93,128 73,128" className="fill-slate-400 dark:fill-slate-500" />
                                            <circle cx="41" cy="44" r="6" className="fill-slate-400 dark:fill-slate-500" />
                                            <rect x="35" y="51" width="12" height="38" rx="4" className="fill-slate-400 dark:fill-slate-500" />
                                            <rect x="36" y="88" width="10" height="40" rx="3" className="fill-slate-400 dark:fill-slate-500" />
                                        </svg>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xs font-black text-foreground uppercase">{t('accuracy.tiltHighTitle')}</h3>
                                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">{t('accuracy.tiltHighBadge')}</span>
                                            </div>
                                            <p className="text-[11px] text-muted leading-relaxed font-medium mt-1">
                                                {t('accuracy.tiltHighDesc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-muted font-medium">
                                {t('accuracy.tiltCaption')}
                            </p>

                            {/* Accuracy Test Table */}
                            <div className="space-y-3 pt-4">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                                    {t('accuracy.tableTitle')}
                                </h3>
                                <p className="text-xs md:text-sm text-muted leading-relaxed font-medium">
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
                                    {t('accuracy.pixelSensitivity')}
                                </p>
                                <p className="text-[11px] text-muted leading-relaxed font-medium">
                                    {t('accuracy.renderedNote')}
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
                        </section>

                        {/* 7. Alternative Methods Without a Tape */}
                        <section className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('noTapeMethods.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('noTapeMethods.title')}
                                </h2>
                                <p className="text-muted leading-relaxed font-medium mt-2 max-w-2xl text-sm md:text-base">
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
                        </section>

                        {/* 8. Clinical Measurement Standard */}
                        <section className="space-y-6">
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-accent block mb-1">
                                    {t('clinicMethod.eyebrow')}
                                </span>
                                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                                    {t('clinicMethod.title')}
                                </h2>
                            </div>

                            {/* Clinical Steps & Clinical Diagram Side-by-Side */}
                            <div className="grid lg:grid-cols-5 gap-6 items-center">
                                <div className="lg:col-span-3 bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-3">
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

                                <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-4 flex items-center justify-center">
                                    <svg viewBox="0 0 300 340" role="img" aria-label="Side view of a person standing against a wall with heels, buttocks, shoulders and head touching it and a book resting on the head." className="w-full max-w-[260px] h-auto">
                                        <line x1="200" y1="20" x2="200" y2="310" stroke="currentColor" strokeWidth="4" className="text-foreground" />
                                        <line x1="20" y1="310" x2="280" y2="310" stroke="currentColor" strokeWidth="4" className="text-foreground" />
                                        <rect x="150" y="56" width="58" height="10" rx="2" className="fill-accent" />
                                        <line x1="196" y1="66" x2="220" y2="66" stroke="#ef4444" strokeWidth="3" />
                                        <circle cx="176" cy="84" r="17" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="160" y="102" width="36" height="96" rx="12" className="fill-slate-400 dark:fill-slate-500" />
                                        <rect x="166" y="196" width="28" height="112" rx="9" className="fill-slate-400 dark:fill-slate-500" />
                                        <g className="fill-accent">
                                            <circle cx="194" cy="84" r="5" />
                                            <circle cx="196" cy="118" r="5" />
                                            <circle cx="196" cy="190" r="5" />
                                            <circle cx="194" cy="302" r="5" />
                                        </g>
                                        <g fontSize="12" className="fill-foreground font-bold">
                                            <text x="28" y="88">Head</text>
                                            <text x="28" y="122">Shoulders</text>
                                            <text x="28" y="194">Buttocks</text>
                                            <text x="28" y="300">Heels</text>
                                            <text x="226" y="70" className="fill-red-500">Mark</text>
                                        </g>
                                        <g stroke="currentColor" strokeWidth="1.5" className="text-border">
                                            <line x1="70" y1="84" x2="156" y2="84" />
                                            <line x1="96" y1="118" x2="158" y2="118" />
                                            <line x1="92" y1="190" x2="160" y2="190" />
                                            <line x1="66" y1="302" x2="164" y2="302" />
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <p className="text-xs text-muted leading-relaxed font-medium">
                                {t('clinicMethod.cdcAttribution')}{' '}
                                <a
                                    href="https://www.cdc.gov/bmi/child-teen-calculator/measure-child-height-weight.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline hover:opacity-80 font-bold"
                                >
                                    {t('clinicMethod.cdcLink')}
                                </a>
                                {t('clinicMethod.cdcSuffix')}
                            </p>

                            {/* Why Measuring Yourself Goes Wrong */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                                    {t('clinicMethod.whyAloneTitle')}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
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
                        </section>

                        {/* 9. Frequently Asked Questions */}
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
