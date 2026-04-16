'use client';

import React, { useState } from 'react';
import { useUnitStore, usePersonStore } from '@/store';
import { NumericInput } from '@/components/ui/NumericInput';
import { Person } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LZString from 'lz-string';

// interface Props {} // Removed empty interface

const cmToFtIn = (cm: number) => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    if (inches === 12) return { ft: ft + 1, in: 0 };
    return { ft, in: inches };
};

const ftInToCm = (ft: number, inc: number) => {
    return (ft * 12 + inc) * 2.54;
};

export default function MidParentalCalculator() {
    const router = useRouter();
    const { unitSystem: unit, setUnitSystem } = useUnitStore();
    const { setPersons: storeSetPersons } = usePersonStore();

    const [parentMotherHtCm, setParentMotherHtCm] = useState<number | ''>('');
    const [parentMotherHtFt, setParentMotherHtFt] = useState<number | ''>('');
    const [parentMotherHtIn, setParentMotherHtIn] = useState<number | ''>('');
    const [parentFatherHtCm, setParentFatherHtCm] = useState<number | ''>('');
    const [parentFatherHtFt, setParentFatherHtFt] = useState<number | ''>('');
    const [parentFatherHtIn, setParentFatherHtIn] = useState<number | ''>('');

    const [predictedParentOnlyBoys, setPredictedParentOnlyBoys] = useState<{ cm: number; ft: number; in: number; raw: number; fCm: number; mCm: number } | null>(null);
    const [predictedParentOnlyGirls, setPredictedParentOnlyGirls] = useState<{ cm: number; ft: number; in: number; raw: number; fCm: number; mCm: number } | null>(null);

    const calculateMidParental = () => {
        let pMotherCm = 0;
        let pFatherCm = 0;
        if (unit === 'imperial') {
            pMotherCm = ftInToCm(Number(parentMotherHtFt), Number(parentMotherHtIn));
            pFatherCm = ftInToCm(Number(parentFatherHtFt), Number(parentFatherHtIn));
        } else {
            pMotherCm = Number(parentMotherHtCm);
            pFatherCm = Number(parentFatherHtCm);
        }

        if (pMotherCm <= 0 || pFatherCm <= 0) return;

        const boysCm = (pFatherCm + pMotherCm + 13) / 2;
        const girlsCm = (pFatherCm + pMotherCm - 13) / 2;

        const bRes = cmToFtIn(boysCm);
        const gRes = cmToFtIn(girlsCm);

        setPredictedParentOnlyBoys({ cm: Math.round(boysCm), ft: bRes.ft, in: bRes.in, raw: boysCm, fCm: pFatherCm, mCm: pMotherCm });
        setPredictedParentOnlyGirls({ cm: Math.round(girlsCm), ft: gRes.ft, in: gRes.in, raw: girlsCm, fCm: pFatherCm, mCm: pMotherCm });
    };

    return (
        <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
            <div className="flex flex-col mb-8 gap-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h2 id="how-to-predict" className="text-3xl font-black tracking-tight text-foreground uppercase">Parent&apos;s Height Only</h2>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">Mid-Parental</span>
                    </div>
                    <p className="text-muted font-medium leading-relaxed">
                        Estimate predicted height using only parents&apos; heights. Works for babies, very young children, and unborn babies too. If you are pregnant, enter both parents&apos; heights to get your child&apos;s estimated adult height range.
                    </p>
                </div>

                {/* Synced Unit Toggle */}
                <div className="w-full sm:w-auto bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                    <button
                        onClick={() => setUnitSystem('imperial')}
                        className={`flex-1 px-4 py-2 sm:py-1.5 rounded-full text-xs font-black transition-colors ${unit === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}
                    >
                        US (ft/in)
                    </button>
                    <button
                        onClick={() => setUnitSystem('metric')}
                        className={`flex-1 px-4 py-2 sm:py-1.5 rounded-full text-xs font-black transition-colors ${unit === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}
                    >
                        Metric (cm)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Mother&apos;s Height</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="p-mother-height-cm" className="sr-only">Mother&apos;s Height (cm)</label>
                            <NumericInput
                                id="p-mother-height-cm"
                                value={parentMotherHtCm}
                                onValueChange={setParentMotherHtCm}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
                                placeholder="e.g. 165"
                                aria-label="Mother's Height in Centimeters"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="p-mother-height-ft" className="sr-only">Mother&apos;s Height (ft)</label>
                                <NumericInput id="p-mother-height-ft" value={parentMotherHtFt} onValueChange={setParentMotherHtFt} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Mother's Height in Feet" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="p-mother-height-in" className="sr-only">Mother&apos;s Height (in)</label>
                                <NumericInput id="p-mother-height-in" value={parentMotherHtIn} onValueChange={setParentMotherHtIn} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Mother's Height in Inches" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Father&apos;s Height</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="p-father-height-cm" className="sr-only">Father&apos;s Height (cm)</label>
                            <NumericInput id="p-father-height-cm" value={parentFatherHtCm} onValueChange={setParentFatherHtCm} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 180" aria-label="Father's Height in Centimeters" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="p-father-height-ft" className="sr-only">Father&apos;s Height (ft)</label>
                                <NumericInput id="p-father-height-ft" value={parentFatherHtFt} onValueChange={setParentFatherHtFt} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Father's Height in Feet" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="p-father-height-in" className="sr-only">Father&apos;s Height (in)</label>
                                <NumericInput id="p-father-height-in" value={parentFatherHtIn} onValueChange={setParentFatherHtIn} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 10" aria-label="Father's Height in Inches" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={calculateMidParental} className="w-full bg-surface border-2 border-border hover:border-accent hover:bg-accent/5 text-foreground font-black py-3.5 rounded-xl transition-all shadow-sm btn-glow active:scale-95">Calculate Estimate</button>

            {predictedParentOnlyBoys && predictedParentOnlyGirls && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Boys Result Card (Updated to match image style) */}
                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center shadow-lg shadow-accent/5">
                        <p className="text-base font-black text-accent uppercase tracking-widest mb-2">Estimated Adult Height (Boys)</p>
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-4xl md:text-5xl font-black text-foreground">
                                {predictedParentOnlyBoys.cm} <span className="text-xl md:text-2xl text-accent">cm</span>
                            </span>
                            <div className="w-px h-10 bg-border" />
                            <span className="text-4xl md:text-5xl font-black text-accent">
                                {predictedParentOnlyBoys.ft}&apos;{predictedParentOnlyBoys.in}&quot;
                            </span>
                        </div>
                        <p className="text-xs font-bold text-muted uppercase mt-3 tracking-wider bg-surface/50 py-1.5 px-3 rounded-full inline-block border border-border/50">
                            Target Range (±5 cm): {predictedParentOnlyBoys.cm - 5} : {predictedParentOnlyBoys.cm + 5} cm
                        </p>

                        <button
                            onClick={() => {
                                const persons: Person[] = [
                                    { id: 'father', name: 'Father', heightCm: predictedParentOnlyBoys.fCm, color: '#3b82f6', isEntity: false },
                                    { id: 'mother', name: 'Mother', heightCm: predictedParentOnlyBoys.mCm, color: '#ec4899', isEntity: false },
                                    { id: 'child', name: 'Son', heightCm: predictedParentOnlyBoys.raw, color: '#10b981', isEntity: false }
                                ];
                                storeSetPersons(persons);
                                const dataToSync = {
                                    persons,
                                    unitSystem: unit,
                                    zoom: 1.0
                                };
                                const compact = LZString.compressToEncodedURIComponent(JSON.stringify(dataToSync));
                                router.push(`/#${compact}`);
                            }}
                            className="w-full mt-6 bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-2 group"
                        >
                            View Comparison Chart
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Girls Result Card (Updated to match image style) */}
                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center shadow-lg shadow-accent/5">
                        <p className="text-base font-black text-accent uppercase tracking-widest mb-2">Estimated Adult Height (Girls)</p>
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-4xl md:text-5xl font-black text-foreground">
                                {predictedParentOnlyGirls.cm} <span className="text-xl md:text-2xl text-accent">cm</span>
                            </span>
                            <div className="w-px h-10 bg-border" />
                            <span className="text-4xl md:text-5xl font-black text-accent">
                                {predictedParentOnlyGirls.ft}&apos;{predictedParentOnlyGirls.in}&quot;
                            </span>
                        </div>
                        <p className="text-xs font-bold text-muted uppercase mt-3 tracking-wider bg-surface/50 py-1.5 px-3 rounded-full inline-block border border-border/50">
                            Target Range (±5 cm): {predictedParentOnlyGirls.cm - 5} : {predictedParentOnlyGirls.cm + 5} cm
                        </p>

                        <button
                            onClick={() => {
                                const persons: Person[] = [
                                    { id: 'father', name: 'Father', heightCm: predictedParentOnlyGirls.fCm, color: '#3b82f6', isEntity: false },
                                    { id: 'mother', name: 'Mother', heightCm: predictedParentOnlyGirls.mCm, color: '#ec4899', isEntity: false },
                                    { id: 'child', name: 'Daughter', heightCm: predictedParentOnlyGirls.raw, color: '#10b981', isEntity: false }
                                ];
                                storeSetPersons(persons);
                                const dataToSync = {
                                    persons,
                                    unitSystem: unit,
                                    zoom: 1.0
                                };
                                const compact = LZString.compressToEncodedURIComponent(JSON.stringify(dataToSync));
                                router.push(`/#${compact}`);
                            }}
                            className="w-full mt-6 bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-2 group"
                        >
                            View Comparison Chart
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
