'use client';

import React, { useState } from 'react';
import { useUnitStore, usePersonStore } from '@/store';
import { handleInputChange } from '@/utils/input';
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

export default function KhamisRocheCalculator() {
    const router = useRouter();
    const { unitSystem: unit, setUnitSystem } = useUnitStore();
    const { setPersons: storeSetPersons } = usePersonStore();

    const [childAge, setChildAge] = useState<number | ''>('');
    const [childGender, setChildGender] = useState<'male' | 'female'>('male');
    const [childHtCm, setChildHtCm] = useState<number | ''>('');
    const [childHtFt, setChildHtFt] = useState<number | ''>('');
    const [childHtIn, setChildHtIn] = useState<number | ''>('');
    const [childWtKg, setChildWtKg] = useState<number | ''>('');
    const [childWtLbs, setChildWtLbs] = useState<number | ''>('');
    const [motherHtCm, setMotherHtCm] = useState<number | ''>('');
    const [motherHtFt, setMotherHtFt] = useState<number | ''>('');
    const [motherHtIn, setMotherHtIn] = useState<number | ''>('');
    const [fatherHtCm, setFatherHtCm] = useState<number | ''>('');
    const [fatherHtFt, setFatherHtFt] = useState<number | ''>('');
    const [fatherHtIn, setFatherHtIn] = useState<number | ''>('');

    const [predictedKhamis, setPredictedKhamis] = useState<{ cm: number; ft: number; in: number } | null>(null);
    const [chartPersons, setChartPersons] = useState<Person[]>([]);

    const calculateKhamis = () => {
        let currentChildCm = 0;
        let pMotherCm = 0;
        let pFatherCm = 0;

        if (unit === 'imperial') {
            currentChildCm = ftInToCm(Number(childHtFt), Number(childHtIn));
            pMotherCm = ftInToCm(Number(motherHtFt), Number(motherHtIn));
            pFatherCm = ftInToCm(Number(fatherHtFt), Number(fatherHtIn));
        } else {
            currentChildCm = Number(childHtCm);
            pMotherCm = Number(motherHtCm);
            pFatherCm = Number(fatherHtCm);
        }

        if (currentChildCm <= 0 || pMotherCm <= 0 || pFatherCm <= 0 || !childAge) return;

        const mph = (childGender === 'male')
            ? (pFatherCm + pMotherCm + 13) / 2
            : (pFatherCm + pMotherCm - 13) / 2;

        const growthData = [
            { age: 2, bm: 86.8, gm: 85.5 },
            { age: 4, bm: 102.3, gm: 101.6 },
            { age: 6, bm: 115.5, gm: 114.6 },
            { age: 8, bm: 128.1, gm: 127.5 },
            { age: 10, bm: 138.4, gm: 138.6 },
            { age: 12, bm: 149.1, gm: 151.0 },
            { age: 14, bm: 163.8, gm: 160.5 },
            { age: 16, bm: 173.4, gm: 162.5 },
            { age: 18, bm: 176.1, gm: 163.1 },
        ];

        const age = Number(childAge);
        let currentAvgHeight = 0;
        const avgHeightAt18 = (childGender === 'male') ? 176.1 : 163.1;

        if (age <= 2) {
            currentAvgHeight = (childGender === 'male') ? 86.8 : 85.5;
        } else if (age >= 18) {
            currentAvgHeight = avgHeightAt18;
        } else {
            for (let i = 0; i < growthData.length - 1; i++) {
                if (age >= growthData[i].age && age <= growthData[i + 1].age) {
                    const d1 = growthData[i];
                    const d2 = growthData[i + 1];
                    const t = (age - d1.age) / (d2.age - d1.age);
                    const h1 = (childGender === 'male') ? d1.bm : d1.gm;
                    const h2 = (childGender === 'male') ? d2.bm : d2.gm;
                    currentAvgHeight = h1 + (h2 - h1) * t;
                    break;
                }
            }
        }

        const curveProjection = (currentChildCm / currentAvgHeight) * avgHeightAt18;
        const predCm = (mph * 0.4) + (curveProjection * 0.6);

        const res = cmToFtIn(predCm);
        const prediction = { cm: Math.round(predCm), ft: res.ft, in: res.in };
        setPredictedKhamis(prediction);

        const persons: Person[] = [
            { id: 'father', name: 'Father', heightCm: pFatherCm, color: '#3b82f6', isEntity: false },
            { id: 'mother', name: 'Mother', heightCm: pMotherCm, color: '#ec4899', isEntity: false },
            { id: 'child', name: childGender === 'male' ? 'Son' : 'Daughter', heightCm: predCm, color: '#10b981', isEntity: false }
        ];
        setChartPersons(persons);
    };

    const clearKhamis = () => {
        setChildAge(''); setChildHtCm(''); setChildHtFt(''); setChildHtIn('');
        setChildWtKg(''); setChildWtLbs('');
        setMotherHtCm(''); setMotherHtFt(''); setMotherHtIn('');
        setFatherHtCm(''); setFatherHtFt(''); setFatherHtIn('');
        setPredictedKhamis(null);
    };

    return (
        <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
            <div className="flex flex-col mb-8 gap-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h2 id="calculator" className="text-3xl font-black tracking-tight text-foreground uppercase">Height Predictor</h2>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">Khamis-Roche</span>
                    </div>
                    <p className="text-muted font-medium leading-relaxed">
                        ⚡ Instant height prediction using scientific growth models. Estimate predicted height based on age and parents
                    </p>
                    <div className="h-1.5 w-16 bg-accent rounded-full" />
                </div>
                {/* Synced Unit Toggle */}
                <div className="w-full sm:w-auto bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                    {/* 2. Added flex-1 to both buttons so they share the space equally */}
                    {/* 3. Slightly increased padding (py-2) on mobile for better touch targets */}
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
                    <label htmlFor="child-age-years" className="text-base font-semibold text-muted">Child&apos;s Age (Years)</label>
                    <input id="child-age-years" type="number" min="0" value={childAge} onChange={e => handleInputChange(e, setChildAge as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Child's Age in Years" />
                </div>
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Gender</label>
                    <div className="flex gap-2">
                        <button onClick={() => setChildGender('male')} className={`flex-1 py-3 rounded-xl border border-border font-black transition-all ${childGender === 'male' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : 'bg-bg text-muted hover:bg-surface'}`}>Boy</button>
                        <button onClick={() => setChildGender('female')} className={`flex-1 py-3 rounded-xl border border-border font-black transition-all ${childGender === 'female' ? 'bg-pink-500/10 text-pink-500 border-pink-500' : 'bg-bg text-muted hover:bg-surface'}`}>Girl</button>
                    </div>
                </div>

                {/* Child Height / Weight */}
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Child&apos;s Current Height</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="child-height-cm" className="sr-only">Child&apos;s Current Height (cm)</label>
                            <input id="child-height-cm" type="number" value={childHtCm} onChange={e => handleInputChange(e, setChildHtCm as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 110" aria-label="Child's Current Height in Centimeters" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="child-height-ft" className="sr-only">Child&apos;s Current Height (ft)</label>
                                <input id="child-height-ft" type="number" value={childHtFt} onChange={e => handleInputChange(e, setChildHtFt as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 3" aria-label="Child's Current Height in Feet" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="child-height-in" className="sr-only">Child&apos;s Current Height (in)</label>
                                <input id="child-height-in" type="number" value={childHtIn} onChange={e => handleInputChange(e, setChildHtIn as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Child's Current Height in Inches" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Child&apos;s Current Weight </label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="child-weight-kg" className="sr-only">Child&apos;s Current Weight (kg)</label>
                            <input id="child-weight-kg" type="number" value={childWtKg} onChange={e => handleInputChange(e, setChildWtKg as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 20" aria-label="Child's Current Weight in Kilograms" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">kg</span>
                        </div>
                    ) : (
                        <div className="relative">
                            <label htmlFor="child-weight-lbs" className="sr-only">Child&apos;s Current Weight (lbs)</label>
                            <input id="child-weight-lbs" type="number" value={childWtLbs} onChange={e => handleInputChange(e, setChildWtLbs as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 45" aria-label="Child's Current Weight in Pounds" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">lbs</span>
                        </div>
                    )}
                </div>

                {/* Parents */}
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Mother&apos;s Height</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="mother-height-cm" className="sr-only">Mother&apos;s Height (cm)</label>
                            <input id="mother-height-cm" type="number" value={motherHtCm} onChange={e => handleInputChange(e, setMotherHtCm as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 165" aria-label="Mother's Height in Centimeters" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="mother-height-ft" className="sr-only">Mother&apos;s Height (ft)</label>
                                <input id="mother-height-ft" type="number" value={motherHtFt} onChange={e => handleInputChange(e, setMotherHtFt as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Mother's Height in Feet" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="mother-height-in" className="sr-only">Mother&apos;s Height (in)</label>
                                <input id="mother-height-in" type="number" value={motherHtIn} onChange={e => handleInputChange(e, setMotherHtIn as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Mother's Height in Inches" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">Father&apos;s Height</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="father-height-cm" className="sr-only">Father&apos;s Height (cm)</label>
                            <input id="father-height-cm" type="number" value={fatherHtCm} onChange={e => handleInputChange(e, setFatherHtCm as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 180" aria-label="Father's Height in Centimeters" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="father-height-ft" className="sr-only">Father&apos;s Height (ft)</label>
                                <input id="father-height-ft" type="number" value={fatherHtFt} onChange={e => handleInputChange(e, setFatherHtFt as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label="Father's Height in Feet" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="father-height-in" className="sr-only">Father&apos;s Height (in)</label>
                                <input id="father-height-in" type="number" value={fatherHtIn} onChange={e => handleInputChange(e, setFatherHtIn as (val: string | number) => void)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 10" aria-label="Father's Height in Inches" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={calculateKhamis} className="flex-1 bg-accent hover:bg-accent/90 text-white font-black py-3.5 rounded-xl transition-all shadow-lg btn-glow active:scale-95">Calculate Height</button>
                <button onClick={clearKhamis} className="px-6 bg-bg border border-border text-muted font-black rounded-xl hover:text-foreground transition-all">Clear</button>
            </div>

            {predictedKhamis && (
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center shadow-lg shadow-accent/5 mt-8">
                    <p className="text-base font-black text-accent uppercase tracking-widest mb-2">Estimated Adult Height</p>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl md:text-5xl font-black text-foreground">{predictedKhamis.cm} <span className="text-xl md:text-2xl text-accent">cm</span></span>
                        <div className="w-px h-10 bg-border" />
                        <span className="text-4xl md:text-5xl font-black text-accent">{predictedKhamis.ft}&apos;{predictedKhamis.in}&quot;</span>
                    </div>
                    <p className="text-xs font-black text-muted uppercase mt-3 tracking-wider bg-surface/50 py-1.5 px-3 rounded-full inline-block border border-border/50">Target Range (±5 cm): {predictedKhamis.cm - 5} : {predictedKhamis.cm + 5} cm</p>

                    <button
                        onClick={() => {
                            storeSetPersons(chartPersons);
                            const dataToSync = {
                                persons: chartPersons,
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
            )}
        </section>
    );
}
