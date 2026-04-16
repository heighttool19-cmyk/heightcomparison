'use client';

import React, { useState } from 'react';
import { useUnitStore } from '@/store';
import { NumericInput } from '@/components/ui/NumericInput';
import { ArrowLeftRight } from 'lucide-react';

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

export default function HeightConverter() {
    useUnitStore();

    const [convCm, setConvCm] = useState<number | ''>('');
    const [convFt, setConvFt] = useState<number | ''>('');
    const [convIn, setConvIn] = useState<number | ''>('');

    return (
        <section className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
            <div className="space-y-4 mb-8">
                <h2 className="text-3xl font-black tracking-tight text-foreground uppercase">Quick Height Converter</h2>
                <p className="text-muted font-medium leading-relaxed">
                    Convert cm to feet and inches, feet and inches to cm, or meters to feet instantly
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full">
                    <label htmlFor="conv-cm" className="text-sm font-bold text-muted mb-2 block text-center md:text-left">
                        Centimeters
                    </label>

                    {/* NEW RELATIVE WRAPPER */}
                    <div className="relative w-full">
                        <NumericInput
                            id="conv-cm"
                            value={convCm}
                            onValueChange={(val) => {
                                setConvCm(val);
                                if (val !== "") {
                                    const cm = Number(val);
                                    const { ft, in: inc } = cmToFtIn(cm);
                                    setConvFt(ft);
                                    setConvIn(inc);
                                } else {
                                    setConvFt('');
                                    setConvIn('');
                                }
                            }}
                            className="w-full bg-bg border border-border rounded-xl px-4 pr-12 py-4 text-center text-xl font-bold outline-none focus:border-accent transition-colors "
                            placeholder="e.g. 170"
                            aria-label="Height in Centimeters"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                            cm
                        </span>
                    </div>
                </div>
                <div className="hidden md:flex shrink-0 w-12 h-12 bg-accent/10 rounded-full items-center justify-center text-accent mt-6">
                    <ArrowLeftRight size={24} />
                </div>
                {/* Mobile icon */}
                <div className="md:hidden shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent rotate-90">
                    <ArrowLeftRight size={20} />
                </div>

                <div className="flex-1 w-full space-y-2">
                    <label className="text-sm font-bold text-muted mb-2 block text-center md:text-left">Feet & Inches</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <label htmlFor="conv-ft" className="sr-only">Feet</label>
                            <NumericInput
                                id="conv-ft"
                                value={convFt}
                                onValueChange={(val) => {
                                    setConvFt(val);
                                    if (val !== '' && convIn !== '') {
                                        setConvCm(Math.round(ftInToCm(Number(val), Number(convIn))));
                                    }
                                }}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-4 text-center text-xl font-bold outline-none focus:border-accent transition-colors placeholder:text-left"
                                placeholder="e.g. 5"
                                aria-label="Height in Feet"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">ft</span>
                        </div>
                        <div className="relative flex-1">
                            <label htmlFor="conv-in" className="sr-only">Inches</label>
                            <NumericInput
                                id="conv-in"
                                value={convIn}
                                onValueChange={(val) => {
                                    setConvIn(val);
                                    if (val !== '' && convFt !== '') {
                                        setConvCm(Math.round(ftInToCm(Number(convFt), Number(val))));
                                    }
                                }}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-4 text-center text-xl font-bold outline-none focus:border-accent transition-colors placeholder:text-left"
                                placeholder="e.g. 7"
                                aria-label="Height in Inches"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">in</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
