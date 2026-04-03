'use client';
import React, { useState } from 'react';
import { useUnitStore } from '@/store';
import { CheckCircle2 } from 'lucide-react';

// interface Props { } // Removed empty interface

export default function IdealWeightInteractive() {
    const { unitSystem, setUnitSystem } = useUnitStore();

    // Calculator State
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [heightFt, setHeightFt] = useState<number | ''>('');
    const [heightIn, setHeightIn] = useState<number | ''>('');
    const [weightKg, setWeightKg] = useState<number | ''>('');
    const [sex, setSex] = useState<'male' | 'female'>('male');

    // Calculate IBW
    const getIBW = () => {
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
            if (currentWeight > max) difference = `+${(currentWeight - max).toFixed(1)} kg above`;
            else if (currentWeight < min) difference = `${(currentWeight - min).toFixed(1)} kg below`;
            else difference = 'Within ideal range';
        }

        return { devine, robinson, hamwi, min, max, bmiMin, bmiMax, difference };
    };

    const results = getIBW();

    return (
        <section id="calculate-your-ideal-body-weight-in-kg-or-pounds" className="scroll-mt-24 bg-surface border border-border p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-foreground">Calculate Your Ideal Body Weight in Kg or pounds</h2>
            <p className="text-muted leading-relaxed mb-8">
                Use the calculator to find your ideal body weight in kilograms or pounds. Enter your age, height, sex, and current weight to see how much you differ from the ideal weight estimate based on three formulas.
            </p>

            {/* Controls */}
            <div className="flex gap-1 mb-6">
                <button
                    onClick={() => setUnitSystem('metric')}
                    className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${unitSystem === 'metric' ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                >
                    Metric (kg / cm)
                </button>
                <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${unitSystem === 'imperial' ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                >
                    Imperial (ft-in)
                </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <label htmlFor="height-cm" className="text-sm font-bold text-muted uppercase tracking-wider">Height</label>
                    {unitSystem === 'metric' ? (
                        <div className="relative">
                            <input
                                id="height-cm"
                                type="number"
                                value={heightCm}
                                onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="e.g. 175 "
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="height-ft" className="sr-only">Height in feet</label>
                                <input
                                    id="height-ft"
                                    type="number"
                                    value={heightFt}
                                    onChange={(e) => setHeightFt(e.target.value === '' ? '' : Number(e.target.value))}
                                    placeholder="e.g. 5 "
                                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="height-in" className="sr-only">Height in inches</label>
                                <input
                                    id="height-in"
                                    type="number"
                                    value={heightIn}
                                    onChange={(e) => setHeightIn(e.target.value === '' ? '' : Number(e.target.value))}
                                    placeholder="e.g. 5 "
                                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">in</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Sex</label>
                    <div className="flex gap-2 h-[46px]">
                        <button
                            onClick={() => setSex('male')}
                            className={`flex-1 rounded-xl font-black transition-all border-2 ${sex === 'male' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setSex('female')}
                            className={`flex-1 rounded-xl font-black transition-all border-2 ${sex === 'female' ? 'bg-pink-500/10 text-pink-500 border-pink-500' : 'bg-bg text-muted border-border hover:bg-surface'}`}
                        >
                            Female
                        </button>
                    </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="current-weight" className="text-sm font-bold text-muted uppercase tracking-wider">Current weight (optional — unlocks difference readout)</label>
                    <div className="relative w-full sm:w-1/2">
                        <input
                            id="current-weight"
                            type="number"
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="e.g. 80"
                            className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-foreground transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">kg</span>
                    </div>
                </div>
            </div>

            {results && (
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-6">
                    <div className="grid sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-border/50 text-center sm:text-left">
                        <div>
                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Ideal body weight</span>
                            <span className="text-2xl font-black text-foreground">{results.min.toFixed(1)} – {results.max.toFixed(1)} <span className="text-base text-accent">kg (range)</span></span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Healthy weight range</span>
                            <span className="text-2xl font-black text-foreground">{results.bmiMin.toFixed(1)} – {results.bmiMax.toFixed(1)} <span className="text-base text-accent">kg</span></span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Difference from current</span>
                            <span className="text-2xl font-black text-foreground">{results.difference ? results.difference : '—'}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-bg border border-border p-3 rounded-xl">
                            <span className="block text-xs font-bold text-muted mb-1">Devine (1974)</span>
                            <span className="font-bold text-foreground text-sm">{results.devine.toFixed(1)} kg</span>
                        </div>
                        <div className="bg-bg border border-border p-3 rounded-xl">
                            <span className="block text-xs font-bold text-muted mb-1">Robinson (1983)</span>
                            <span className="font-bold text-foreground text-sm">{results.robinson.toFixed(1)} kg</span>
                        </div>
                        <div className="bg-bg border border-border p-3 rounded-xl">
                            <span className="block text-xs font-bold text-muted mb-1">Hamwi (1964)</span>
                            <span className="font-bold text-foreground text-sm">{results.hamwi.toFixed(1)} kg</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Free</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> No account needed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Results in kg and lb</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> Based on Devine, Robinson, and Hamwi formulas</span>
            </div>
        </section>
    );
}
