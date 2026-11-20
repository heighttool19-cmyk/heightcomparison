'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
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
    const rawInches = totalInches % 12;
    const roundedInches = Math.round(rawInches * 2) / 2;
    if (roundedInches === 12) return { ft: ft + 1, in: 0 };
    return { ft, in: roundedInches };
};

const ftInToCm = (ft: number, inc: number) => {
    return (ft * 12 + inc) * 2.54;
};

export default function KhamisRocheCalculator() {
    const t = useTranslations('heightPredictor.khamisRocheCalculator');
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

    const [predictedKhamis, setPredictedKhamis] = useState<{ cm: number; ft: number; in: number; rangeMin: string; rangeMax: string } | null>(null);
    const [chartPersons, setChartPersons] = useState<Person[]>([]);
    const [ageWarning, setAgeWarning] = useState<'under4' | 'over17' | null>(null);

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

        const age = Number(childAge);
        if (!childAge || age < 4) {
            setAgeWarning('under4');
            setPredictedKhamis(null);
            return;
        }
        if (age > 17.5) {
            setAgeWarning('over17');
            setPredictedKhamis(null);
            return;
        }
        setAgeWarning(null);

        if (currentChildCm <= 0 || pMotherCm <= 0 || pFatherCm <= 0) return;

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
        const errCm = childGender === 'male' ? 5.3 : 4.3;
        const errIn = childGender === 'male' ? 2.1 : 1.7;

        let rangeMin = '';
        let rangeMax = '';
        if (unit === 'imperial') {
            const totalIn = (res.ft * 12) + res.in;
            const minFt = cmToFtIn((totalIn - errIn) * 2.54);
            const maxFt = cmToFtIn((totalIn + errIn) * 2.54);
            rangeMin = `${minFt.ft}'${minFt.in}"`;
            rangeMax = `${maxFt.ft}'${maxFt.in}"`;
        } else {
            rangeMin = `${Math.round(predCm - errCm)} cm`;
            rangeMax = `${Math.round(predCm + errCm)} cm`;
        }

        const prediction = { cm: Math.round(predCm), ft: res.ft, in: res.in, rangeMin, rangeMax };
        setPredictedKhamis(prediction);

        const persons: Person[] = [
            { id: 'father', name: 'Father', heightCm: pFatherCm, color: '#1d4ed8', isEntity: false },
            { id: 'mother', name: 'Mother', heightCm: pMotherCm, color: '#be185d', isEntity: false },
            { id: 'child', name: childGender === 'male' ? 'Son' : 'Daughter', heightCm: predCm, color: '#047857', isEntity: false }
        ];
        setChartPersons(persons);
    };

    const clearKhamis = () => {
        setChildAge(''); setChildHtCm(''); setChildHtFt(''); setChildHtIn('');
        setChildWtKg(''); setChildWtLbs('');
        setMotherHtCm(''); setMotherHtFt(''); setMotherHtIn('');
        setFatherHtCm(''); setFatherHtFt(''); setFatherHtIn('');
        setPredictedKhamis(null);
        setAgeWarning(null);
    };

    return (
        <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
            <div className="flex flex-col mb-8 gap-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h2 id="height-predictor-calculator" className="text-3xl font-black tracking-tight text-foreground uppercase scroll-mt-24">{t('title')}</h2>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">{t('badge')}</span>
                    </div>
                    <p className="text-muted font-medium leading-relaxed">
                        {t('description')}
                    </p>
                </div>
                {/* Synced Unit Toggle */}
                <div className="w-full sm:w-auto bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                    {/* 2. Added flex-1 to both buttons so they share the space equally */}
                    {/* 3. Slightly increased padding (py-2) on mobile for better touch targets */}
                    <button
                        onClick={() => setUnitSystem('imperial')}
                        className={`flex-1 px-4 py-2 sm:py-1.5 rounded-full text-xs font-black transition-colors ${unit === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}
                    >
                        {t('unitUs')}
                    </button>
                    <button
                        onClick={() => setUnitSystem('metric')}
                        className={`flex-1 px-4 py-2 sm:py-1.5 rounded-full text-xs font-black transition-colors ${unit === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}
                    >
                        {t('unitMetric')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <label htmlFor="child-age-years" className="text-base font-semibold text-muted">{t('childAgeLabel')}</label>
                    <NumericInput
                        id="child-age-years"
                        value={childAge}
                        onValueChange={(val) => {
                            setChildAge(val);
                            if (val !== '' && Number(val) < 4) {
                                setAgeWarning('under4');
                            } else if (val !== '' && Number(val) > 17.5) {
                                setAgeWarning('over17');
                            } else {
                                setAgeWarning(null);
                            }
                        }}
                        className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
                        placeholder="e.g. 5"
                        aria-label={t('childAgeAriaLabel')}
                    />
                    {ageWarning === 'under4' && (
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 leading-snug">
                            {t('ageUnder4Prefix')}{' '}
                            <a href="#how-to-predict" className="text-accent underline font-bold">
                                {t('ageUnder4Link')}
                            </a>
                            {t('ageUnder4Suffix')}
                        </p>
                    )}
                    {ageWarning === 'over17' && (
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 leading-snug">
                            {t('ageOver17Warning')}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">{t('genderLabel')}</label>
                    <div className="flex gap-2">
                        <button onClick={() => setChildGender('male')} className={`flex-1 py-3 rounded-xl border border-border font-black transition-all ${childGender === 'male' ? 'bg-blue-600/10 text-blue-700 border-blue-600' : 'bg-bg text-muted hover:bg-surface'}`}>{t('boy')}</button>
                        <button onClick={() => setChildGender('female')} className={`flex-1 py-3 rounded-xl border border-border font-black transition-all ${childGender === 'female' ? 'bg-pink-600/10 text-pink-700 border-pink-600' : 'bg-bg text-muted hover:bg-surface'}`}>{t('girl')}</button>
                    </div>
                </div>

                {/* Child Height / Weight */}
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">{t('childHeightLabel')}</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="child-height-cm" className="sr-only">{t('childHeightCmAriaLabel')}</label>
                            <NumericInput id="child-height-cm" value={childHtCm} onValueChange={setChildHtCm} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 110" aria-label={t('childHeightCmAriaLabel')} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('cmUnit')}</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="child-height-ft" className="sr-only">{t('childHeightFtAriaLabel')}</label>
                                <NumericInput id="child-height-ft" value={childHtFt} onValueChange={setChildHtFt} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 3" aria-label={t('childHeightFtAriaLabel')} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('ftUnit')}</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="child-height-in" className="sr-only">{t('childHeightInAriaLabel')}</label>
                                <NumericInput id="child-height-in" value={childHtIn} onValueChange={setChildHtIn} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label={t('childHeightInAriaLabel')} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('inUnit')}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">{t('childWeightLabel')}</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="child-weight-kg" className="sr-only">{t('childWeightKgAriaLabel')}</label>
                            <NumericInput id="child-weight-kg" value={childWtKg} onValueChange={setChildWtKg} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 20" aria-label={t('childWeightKgAriaLabel')} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('kgUnit')}</span>
                        </div>
                    ) : (
                        <div className="relative">
                            <label htmlFor="child-weight-lbs" className="sr-only">{t('childWeightLbsAriaLabel')}</label>
                            <NumericInput id="child-weight-lbs" value={childWtLbs} onValueChange={setChildWtLbs} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 45" aria-label={t('childWeightLbsAriaLabel')} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('lbsUnit')}</span>
                        </div>
                    )}
                </div>

                {/* Parents */}
                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">{t('motherHeightLabel')}</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="mother-height-cm" className="sr-only">{t('motherHeightCmAriaLabel')}</label>
                            <NumericInput id="mother-height-cm" value={motherHtCm} onValueChange={setMotherHtCm} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 165" aria-label={t('motherHeightCmAriaLabel')} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('cmUnit')}</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="mother-height-ft" className="sr-only">{t('motherHeightFtAriaLabel')}</label>
                                <NumericInput id="mother-height-ft" value={motherHtFt} onValueChange={setMotherHtFt} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label={t('motherHeightFtAriaLabel')} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('ftUnit')}</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="mother-height-in" className="sr-only">{t('motherHeightInAriaLabel')}</label>
                                <NumericInput id="mother-height-in" value={motherHtIn} onValueChange={setMotherHtIn} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label={t('motherHeightInAriaLabel')} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('inUnit')}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-base font-semibold text-muted">{t('fatherHeightLabel')}</label>
                    {unit === 'metric' ? (
                        <div className="relative">
                            <label htmlFor="father-height-cm" className="sr-only">{t('fatherHeightCmAriaLabel')}</label>
                            <NumericInput id="father-height-cm" value={fatherHtCm} onValueChange={setFatherHtCm} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 180" aria-label={t('fatherHeightCmAriaLabel')} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('cmUnit')}</span>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <label htmlFor="father-height-ft" className="sr-only">{t('fatherHeightFtAriaLabel')}</label>
                                <NumericInput id="father-height-ft" value={fatherHtFt} onValueChange={setFatherHtFt} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 5" aria-label={t('fatherHeightFtAriaLabel')} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('ftUnit')}</span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="father-height-in" className="sr-only">{t('fatherHeightInAriaLabel')}</label>
                                <NumericInput id="father-height-in" value={fatherHtIn} onValueChange={setFatherHtIn} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors" placeholder="e.g. 10" aria-label={t('fatherHeightInAriaLabel')} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{t('inUnit')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={calculateKhamis} className="flex-1 bg-accent hover:bg-accent/90 text-white font-black py-3.5 rounded-xl transition-all shadow-lg btn-glow active:scale-95">{t('calculate')}</button>
                <button onClick={clearKhamis} className="px-6 bg-bg border border-border text-muted font-black rounded-xl hover:text-foreground transition-all">{t('clear')}</button>
            </div>

            {predictedKhamis && (
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center shadow-lg shadow-accent/5 mt-8">
                    <p className="text-base font-black text-accent uppercase tracking-widest mb-2">{t('estimatedAdultHeight')}</p>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl md:text-5xl font-black text-foreground">{predictedKhamis.cm} <span className="text-xl md:text-2xl text-accent">{t('cmUnit')}</span></span>
                        <div className="w-px h-10 bg-border" />
                        <span className="text-4xl md:text-5xl font-black text-accent">{predictedKhamis.ft}&apos;{predictedKhamis.in}&quot;</span>
                    </div>
                    <p className="text-xs font-black text-muted uppercase mt-3 tracking-wider bg-surface/50 py-1.5 px-3 rounded-full inline-block border border-border/50">{t('targetRange', { min: predictedKhamis.rangeMin, max: predictedKhamis.rangeMax })}</p>

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
                        {t('viewComparisonChart')}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </section>
    );
}
