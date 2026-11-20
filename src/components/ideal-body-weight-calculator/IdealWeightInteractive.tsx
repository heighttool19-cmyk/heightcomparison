'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useUnitStore } from '@/store';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { NumericInput } from '@/components/ui/NumericInput';

export default function IdealWeightInteractive() {
    const t = useTranslations('idealBodyWeight.tool');
    const { unitSystem, setUnitSystem } = useUnitStore();

    // Calculator State
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [heightFt, setHeightFt] = useState<number | ''>('');
    const [heightIn, setHeightIn] = useState<number | ''>('');
    const [weightKg, setWeightKg] = useState<number | ''>('');
    const [sex, setSex] = useState<'male' | 'female'>('male');

    // Validation Check
    const isInvalidInput = () => {
        if (unitSystem === 'metric') {
            if (heightCm !== '' && (heightCm < 50 || heightCm > 300)) return true;
        } else {
            if (heightFt !== '' && (heightFt < 1 || heightFt > 9)) return true;
            if (heightIn !== '' && (heightIn < 0 || heightIn > 11)) return true;
        }
        if (weightKg !== '' && (weightKg < 10 || weightKg > 500)) return true;
        return false;
    };

    const hasInvalidInput = isInvalidInput();

    // Calculate IBW
    const getIBW = () => {
        if (hasInvalidInput) return null;

        let totalInches = 0;
        if (unitSystem === 'metric') {
            if (!heightCm) return null;
            totalInches = Number(heightCm) / 2.54;
        } else {
            if (!heightFt && !heightIn) return null;
            totalInches = (Number(heightFt || 0) * 12) + Number(heightIn || 0);
        }

        const inchesOver60 = totalInches > 60 ? totalInches - 60 : 0;

        let devine = 0, robinson = 0, hamwi = 0;

        if (sex === 'male') {
            devine = 50 + (2.3 * inchesOver60);
            robinson = 52 + (1.9 * inchesOver60);
            hamwi = 48 + (2.7 * inchesOver60);
        } else {
            devine = 45.5 + (2.3 * inchesOver60);
            robinson = 49 + (1.7 * inchesOver60);
            hamwi = 45.5 + (2.2 * inchesOver60);
        }

        // Prevent negative or absurdly low weights for very short heights (fallback to base logic)
        if (totalInches < 60) {
            const deduction = 60 - totalInches;
            devine = sex === 'male' ? 50 - (2.3 * deduction) : 45.5 - (2.3 * deduction);
            robinson = sex === 'male' ? 52 - (1.9 * deduction) : 49 - (1.7 * deduction);
            hamwi = sex === 'male' ? 48 - (2.7 * deduction) : 45.5 - (2.2 * deduction);
        }

        const min = Math.min(devine, robinson, hamwi);
        const max = Math.max(devine, robinson, hamwi);

        // Healthy BMI (18.5 - 25)
        const heightMeters = totalInches * 0.0254;
        const bmiMin = 18.5 * (heightMeters * heightMeters);
        const bmiMax = 25 * (heightMeters * heightMeters);

        let difference = null;
        if (weightKg) {
            const currentWeight = Number(weightKg);
            if (currentWeight > max) difference = t('differenceAbove', { amount: (currentWeight - max).toFixed(1) });
            else if (currentWeight < min) difference = t('differenceBelow', { amount: (currentWeight - min).toFixed(1) });
            else difference = t('differenceWithin');
        }

        return { devine, robinson, hamwi, min, max, bmiMin, bmiMax, difference };
    };

    const results = getIBW();

    return (
        <section id="ideal-body-weight-calculator-section" className="scroll-mt-24 bg-surface border border-border p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
            <h2 id="ideal-body-weight-calculator" className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-foreground scroll-mt-24">{t('title')}</h2>
            <p className="text-muted leading-relaxed mb-8">
                {t('description')}
            </p>

            {/* Controls */}
            <div className="flex gap-1 mb-6">
                <button
                    onClick={() => setUnitSystem('metric')}
                    className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${unitSystem === 'metric' ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                >
                    {t('unitMetric')}
                </button>
                <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${unitSystem === 'imperial' ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                >
                    {t('unitImperial')}
                </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <label htmlFor="height-cm" className="text-sm font-bold text-muted uppercase tracking-wider">{t('heightLabel')}</label>
                    {unitSystem === 'metric' ? (
                        <div className="relative">
                            <NumericInput
                                id="height-cm"
                                value={heightCm}
                                onValueChange={setHeightCm}
                                placeholder={t('heightPlaceholder')}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">{t('unitCm')}</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="height-ft" className="sr-only">{t('feetAriaLabel')}</label>
                                <NumericInput
                                    id="height-ft"
                                    value={heightFt}
                                    onValueChange={setHeightFt}
                                    placeholder={t('feetPlaceholder')}
                                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">{t('unitFt')}</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="height-in" className="sr-only">{t('inchesAriaLabel')}</label>
                                <NumericInput
                                    id="height-in"
                                    value={heightIn}
                                    onValueChange={setHeightIn}
                                    placeholder={t('inchesPlaceholder')}
                                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors tracking-normal" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">{t('unitIn')}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">{t('sexLabel')}</label>
                    <div className="flex gap-2 h-[46px]">
                        <button
                            onClick={() => setSex('male')}
                            className={`flex-1 rounded-xl font-black transition-all border-2 ${sex === 'male' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                        >
                            {t('sexMale')}
                        </button>
                        <button
                            onClick={() => setSex('female')}
                            className={`flex-1 rounded-xl font-black transition-all border-2 ${sex === 'female' ? 'bg-pink-500/10 text-pink-500 border-pink-500' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                        >
                            {t('sexFemale')}
                        </button>
                    </div>
                </div>
                <div className="space-y-2 sm:col-span-2 text-center">
                    <label htmlFor="current-weight" className="text-sm font-bold text-muted uppercase tracking-wider  ">{t('currentWeightLabel')}</label>
                    <div className="relative mt-6  w-full sm:w-1/2">
                        <NumericInput
                            id="current-weight"
                            value={weightKg}
                            onValueChange={setWeightKg}
                            placeholder={t('weightPlaceholder')}
                            className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors tracking-normal" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">{t('unitKg')}</span>
                    </div>
                </div>
            </div>

            {hasInvalidInput && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6 flex items-start gap-4">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h3 className="font-bold text-red-500 mb-1">{t('invalidInputTitle')}</h3>
                        <p className="text-sm text-red-500/90">{t('invalidInputText')}</p>
                    </div>
                </div>
            )}

            {!hasInvalidInput && results && (
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-3 mb-6">
                    <div className="grid sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-border/50 text-center sm:text-left">
                        <div>
                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">{t('ideaBodyWeightResultLabel')}</span>
                            <span className="text-2xl font-black text-foreground">{results.min.toFixed(1)} – {results.max.toFixed(1)} <span className="text-base text-accent">{t('rangeUnit')}</span></span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">{t('healthyWeightRangeLabel')}</span>
                            <span className="text-2xl font-black text-foreground">{results.bmiMin.toFixed(1)} – {results.bmiMax.toFixed(1)} <span className="text-base text-accent">{t('kgLabel')}</span></span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">{t('differenceLabel')}</span>
                            <span className="text-2xl font-black text-foreground">{results.difference ? results.difference : t('differenceNone')}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center">
                        <div className="bg-bg border border-border p-3 rounded-xl flex flex-wrap items-center justify-center gap-1.5">
                            <span className="text-xs font-bold text-muted">{t('devineYear')}</span>
                            <span className="font-bold text-foreground text-sm whitespace-nowrap">{results.devine.toFixed(1)} kg</span>                        </div>
                        <div className="bg-bg border border-border p-3 rounded-xl flex flex-wrap items-center justify-center gap-1.5">
                            <span className="text-xs font-bold text-muted">{t('robinsonYear')}</span>
                            <span className="font-bold text-foreground text-sm whitespace-nowrap">{results.robinson.toFixed(1)} kg</span>
                        </div>
                        <div className="bg-bg border border-border p-3 rounded-xl flex flex-wrap items-center justify-center gap-1.5">
                            <span className="text-xs font-bold text-muted">{t('hamwiYear')}</span>
                            <span className="font-bold text-foreground text-sm whitespace-nowrap">{results.hamwi.toFixed(1)} kg</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('badgeFree')}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('badgeNoAccount')}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('badgeResultsInKg')}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> {t('badgeFormulas')}</span>
            </div>
        </section>
    );
}