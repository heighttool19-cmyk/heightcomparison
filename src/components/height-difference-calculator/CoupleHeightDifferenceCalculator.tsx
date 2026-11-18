'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const PRESETS = [
    { a: 183, b: 165 },
    { a: 178, b: 163 },
    { a: 175, b: 160 }
];

const BANDS = [
    { min: -999, max: 0, key: 'bandWomanTaller', share: '4.0%', pctNum: 4, width: '18.8%' },
    { min: 0, max: 5, key: 'band0to5', share: '8.5%', pctNum: 8.5, width: '39.9%' },
    { min: 5, max: 10, key: 'band5to10', share: '16.3%', pctNum: 16.3, width: '76.5%' },
    { min: 10, max: 15, key: 'band10to15', share: '21.3%', pctNum: 21.3, width: '100%' },
    { min: 15, max: 20, key: 'band15to20', share: '20.7%', pctNum: 20.7, width: '97.2%' },
    { min: 20, max: 25, key: 'band20to25', share: '15.3%', pctNum: 15.3, width: '71.8%' },
    { min: 25, max: 30, key: 'band25to30', share: '8.8%', pctNum: 8.8, width: '41.3%' },
    { min: 30, max: 999, key: 'bandOver30', share: '5.1%', pctNum: 5.1, width: '23.9%' }
];

function round1(n: number): number {
    return Math.round(n * 10) / 10;
}

function fmt(n: number): string {
    const r = round1(n);
    return r % 1 === 0 ? String(r) : r.toFixed(1);
}

export default function CoupleHeightDifferenceCalculator() {
    const tCouple = useTranslations('heightDifference.couple');
    const tCalc = useTranslations('heightDifference.coupleCalc');

    const [presetIndex, setPresetIndex] = useState(0);
    const active = PRESETS[presetIndex];

    const a = active.a;
    const b = active.b;
    const gap = a - b;
    const pct = ((gap / a) * 100).toFixed(1);

    // Find the matching UK band
    const activeBand = BANDS.find((band) => gap >= band.min && gap < band.max) || BANDS[4];

    // SVG figure math
    const floor = 205;
    const maxPx = 170;
    const tallest = Math.max(a, b);

    const renderFigure = (hVal: number, cx: number, colorClass: string, label: string) => {
        const px = (maxPx * hVal) / tallest;
        const top = floor - px;
        const s = px / 170;
        const headR = 13 * s;
        const bodyW = 30 * s;
        const bodyH = 62 * s;
        const legH = px - headR * 2 - bodyH - 6 * s;

        return (
            <g key={label} aria-hidden="true" className={colorClass}>
                <circle cx={cx} cy={top + headR} r={headR} fill="currentColor" />
                <rect x={cx - bodyW / 2} y={top + headR * 2 + 3 * s} width={bodyW} height={bodyH} rx={7 * s} fill="currentColor" />
                <rect x={cx - bodyW / 2 - 9 * s} y={top + headR * 2 + 6 * s} width={7 * s} height={bodyH * 0.8} rx={3.5 * s} fill="currentColor" opacity="0.75" />
                <rect x={cx + bodyW / 2 + 2 * s} y={top + headR * 2 + 6 * s} width={7 * s} height={bodyH * 0.8} rx={3.5 * s} fill="currentColor" opacity="0.75" />
                <rect x={cx - bodyW / 2 + 2 * s} y={floor - legH} width={11 * s} height={legH} rx={4 * s} fill="currentColor" />
                <rect x={cx + bodyW / 2 - 13 * s} y={floor - legH} width={11 * s} height={legH} rx={4 * s} fill="currentColor" />
                <text x={cx} y={top - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">
                    {label}
                </text>
                <text x={cx} y={floor + 18} textAnchor="middle" fontSize="12" fontWeight="700" className="fill-foreground font-mono">
                    {hVal} cm
                </text>
            </g>
        );
    };

    const topA = floor - (maxPx * a) / tallest;
    const topB = floor - (maxPx * b) / tallest;
    const y1 = Math.min(topA, topB);
    const y2 = Math.max(topA, topB);

    const articleWord = /^(8|11|18)/.test(fmt(gap)) ? 'An' : 'A';

    return (
        <div className="space-y-6 w-full">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface border border-border rounded-2xl p-5 text-center shadow-sm">
                    <div className="text-[11px] font-black uppercase tracking-wider text-muted">
                        {tCouple('statAvgGapLabel')}
                    </div>
                    <div className="text-3xl font-black text-foreground mt-1 font-mono">
                        {tCouple('statAvgGapValue')}{' '}
                        <span className="text-base text-accent font-bold">
                            {tCouple('statAvgGapSub')}
                        </span>
                    </div>
                    <div className="text-xs text-muted font-medium mt-1">
                        {tCouple('statAvgGapSampleSize')}
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-2xl p-5 text-center shadow-sm">
                    <div className="text-[11px] font-black uppercase tracking-wider text-muted">
                        {tCouple('statManTallerLabel')}
                    </div>
                    <div className="text-3xl font-black text-accent mt-1 font-mono">
                        {tCouple('statManTallerValue')}
                    </div>
                    <div className="text-xs text-muted font-medium mt-1">
                        {tCouple('statManTallerSub')}
                    </div>
                </div>
            </div>

            {/* Distribution Table */}
            <div className="overflow-x-auto border border-border rounded-2xl bg-surface shadow-sm">
                <table className="w-full text-sm text-left">
                    <caption className="sr-only">{tCouple('distTableCaption')}</caption>
                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                        <tr>
                            <th className="px-5 py-3.5 uppercase tracking-widest text-[11px]">
                                {tCouple('tableHeaderGap')}
                            </th>
                            <th className="px-5 py-3.5 uppercase tracking-widest text-[11px]">
                                {tCouple('tableHeaderShare')}
                            </th>
                            <th className="px-5 py-3.5 uppercase tracking-widest text-[11px] w-[50%]">
                                <span className="sr-only">{tCouple('tableHeaderBar')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {BANDS.map((bRow) => {
                            const isHit = activeBand.key === bRow.key;
                            return (
                                <tr
                                    key={bRow.key}
                                    className={`transition-colors ${
                                        isHit
                                            ? 'bg-accent/10 font-bold'
                                            : 'hover:bg-bg/40'
                                    }`}
                                >
                                    <td className={`px-5 py-3 ${isHit ? 'text-accent font-extrabold' : 'text-foreground font-medium'}`}>
                                        {tCouple(bRow.key)}
                                    </td>
                                    <td className={`px-5 py-3 font-mono ${isHit ? 'text-accent font-extrabold' : 'text-muted'}`}>
                                        {bRow.share}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="h-2.5 w-full bg-border/60 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                    isHit ? 'bg-accent shadow-sm' : 'bg-muted/30'
                                                }`}
                                                style={{ width: bRow.width }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-muted font-medium m-0">
                {tCouple('tableSource')}
            </p>

            {/* Couple Visualization Card */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
                {/* Preset Chips */}
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label={tCouple('coupleCardChipsLabel')}>
                    {PRESETS.map((p, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setPresetIndex(idx)}
                            aria-pressed={presetIndex === idx}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                presetIndex === idx
                                    ? 'bg-accent text-white dark:text-zinc-950 border-accent shadow-sm'
                                    : 'bg-surface text-muted border-border hover:border-accent/40 hover:text-foreground'
                            }`}
                        >
                            <span className="font-mono">{p.a} cm</span> / <span className="font-mono">{p.b} cm</span>
                        </button>
                    ))}
                </div>

                {/* SVG */}
                <svg
                    viewBox="0 0 420 230"
                    role="img"
                    aria-label="Scaled figures for the selected couple"
                    className="w-full max-w-[420px] h-auto mx-auto block"
                >
                    <line x1="40" y1={floor} x2="380" y2={floor} stroke="currentColor" className="text-border" strokeWidth="2" />
                    {renderFigure(a, 130, 'text-blue-600 dark:text-blue-400', tCalc('partner1Label'))}
                    {renderFigure(b, 290, 'text-emerald-600 dark:text-emerald-400', tCalc('partner2Label'))}

                    {/* Gap Bracket */}
                    {y2 - y1 > 1 && (
                        <g>
                            <line x1="210" y1={y1} x2="210" y2={y2} stroke="currentColor" className="text-foreground" strokeWidth="1.5" />
                            <line x1="204" y1={y1} x2="216" y2={y1} stroke="currentColor" className="text-foreground" strokeWidth="1.5" />
                            <line x1="204" y1={y2} x2="216" y2={y2} stroke="currentColor" className="text-foreground" strokeWidth="1.5" />
                            <line x1="150" y1={y1} x2="210" y2={y1} stroke="currentColor" className="text-muted" strokeDasharray="3 4" strokeWidth="1" />
                        </g>
                    )}

                    {/* Pill */}
                    <g>
                        <rect x="176" y={y2 + 8} width="68" height="34" rx="17" className="fill-surface stroke-border" strokeWidth="1" />
                        <text x="210" y={y2 + 23} textAnchor="middle" fontSize="12" fontWeight="800" className="fill-foreground font-mono">
                            {gap} cm
                        </text>
                        <text x="210" y={y2 + 36} textAnchor="middle" fontSize="10" className="fill-muted font-bold font-mono">
                            {pct}%
                        </text>
                    </g>
                </svg>

                {/* Dynamic Sentence */}
                <p
                    className="text-center text-sm text-foreground leading-relaxed m-0 font-medium"
                    dangerouslySetInnerHTML={{
                        __html: tCouple('coupleLine', { h1: a, h2: b, gap, pct })
                    }}
                />
            </div>

            {/* Dynamic Band Context */}
            <p className="text-sm text-muted leading-relaxed font-medium m-0">
                {tCouple('coupleBandText', {
                    article: articleWord,
                    gap,
                    band: tCouple(activeBand.key),
                    share: Math.round(activeBand.pctNum)
                })}
            </p>
        </div>
    );
}
