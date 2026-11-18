'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const CM_PER_IN = 2.54;

function round1(n: number): number {
    return Math.round(n * 10) / 10;
}

function fmt(n: number): string {
    const r = round1(n);
    return r % 1 === 0 ? String(r) : r.toFixed(1);
}

function toFtIn(cm: number): { ft: number; inch: number } {
    const totalIn = cm / CM_PER_IN;
    let ft = Math.floor(totalIn / 12);
    let inch = round1(totalIn - ft * 12);
    if (inch >= 12) {
        ft += 1;
        inch = 0;
    }
    return { ft, inch };
}

function ftInLabel(cm: number): string {
    const f = toFtIn(cm);
    return `${f.ft}'${fmt(f.inch)}"`;
}

function gapInLabel(cm: number): string {
    const totalIn = round1(cm / CM_PER_IN);
    if (totalIn < 12) return `${fmt(totalIn)} in`;
    let ft = Math.floor(totalIn / 12);
    let remIn = round1(totalIn - ft * 12);
    if (remIn >= 12) {
        ft += 1;
        remIn = 0;
    }
    return remIn > 0 ? `${ft} ft ${fmt(remIn)} in` : `${ft} ft`;
}

export default function CalculateHeightDifference() {
    const t = useTranslations('heightDifference.tool');
    const [unit, setUnit] = useState<'cm' | 'imp'>('cm');

    const [p1Cm, setP1Cm] = useState<string>('180');
    const [p1Ft, setP1Ft] = useState<string>('5');
    const [p1In, setP1In] = useState<string>('10.9');

    const [p2Cm, setP2Cm] = useState<string>('165');
    const [p2Ft, setP2Ft] = useState<string>('5');
    const [p2In, setP2In] = useState<string>('5');

    // Switch units with auto-conversion
    const handleUnitChange = (nextUnit: 'cm' | 'imp') => {
        if (nextUnit === unit) return;

        const val1 = unit === 'cm'
            ? parseFloat(p1Cm) || 0
            : (parseFloat(p1Ft) || 0) * 12 * CM_PER_IN + (parseFloat(p1In) || 0) * CM_PER_IN;

        const val2 = unit === 'cm'
            ? parseFloat(p2Cm) || 0
            : (parseFloat(p2Ft) || 0) * 12 * CM_PER_IN + (parseFloat(p2In) || 0) * CM_PER_IN;

        if (val1 > 0) {
            setP1Cm(fmt(val1));
            const f1 = toFtIn(val1);
            setP1Ft(String(f1.ft));
            setP1In(fmt(f1.inch));
        }

        if (val2 > 0) {
            setP2Cm(fmt(val2));
            const f2 = toFtIn(val2);
            setP2Ft(String(f2.ft));
            setP2In(fmt(f2.inch));
        }

        setUnit(nextUnit);
    };

    // Swap Person 1 and Person 2
    const handleSwap = () => {
        setP1Cm(p2Cm);
        setP2Cm(p1Cm);
        setP1Ft(p2Ft);
        setP2Ft(p1Ft);
        setP1In(p2In);
        setP2In(p1In);
    };

    // Calculate heights in cm
    const h1 = unit === 'cm'
        ? parseFloat(p1Cm) || 0
        : (parseFloat(p1Ft) || 0) * 12 * CM_PER_IN + (parseFloat(p1In) || 0) * CM_PER_IN;

    const h2 = unit === 'cm'
        ? parseFloat(p2Cm) || 0
        : (parseFloat(p2Ft) || 0) * 12 * CM_PER_IN + (parseFloat(p2In) || 0) * CM_PER_IN;

    const valid = h1 >= 30 && h1 <= 300 && h2 >= 30 && h2 <= 300;
    const gap = valid ? Math.abs(h1 - h2) : 0;
    const tall = valid ? Math.max(h1, h2) : 0;
    const pct = tall > 0 ? (gap / tall) * 100 : 0;

    const tallerWho = h1 > h2 ? t('person1Label') : (h2 > h1 ? t('person2Label') : t('sameHeightText'));
    const shorterWho = h1 > h2 ? t('person2Label') : t('person1Label');

    const diffDisplay = unit === 'cm' ? `${fmt(gap)} cm` : gapInLabel(gap);
    const diffAltDisplay = unit === 'cm' ? gapInLabel(gap) : `${fmt(gap)} cm`;
    const tallDisplay = unit === 'cm' ? `${fmt(tall)} cm` : ftInLabel(tall);

    // Format display for figures
    const fmtH = (h: number) => (unit === 'cm' ? `${fmt(h)} cm` : ftInLabel(h));
    const fmtGapText = (g: number) => (unit === 'cm' ? `${fmt(g)} cm` : gapInLabel(g));

    // SVG figure math
    const floor = 205;
    const maxPx = 170;
    const tallest = valid && tall > 0 ? tall : 180;

    const renderFigure = (hVal: number, cx: number, colorClass: string, label: string) => {
        const px = Math.max(30, (maxPx * hVal) / tallest);
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
                    {fmtH(hVal)}
                </text>
            </g>
        );
    };

    const topA = floor - (maxPx * (valid ? h1 : 180)) / tallest;
    const topB = floor - (maxPx * (valid ? h2 : 165)) / tallest;
    const y1 = Math.min(topA, topB);
    const y2 = Math.max(topA, topB);
    const showBracket = y2 - y1 > 1;

    return (
        <div id="calc" className="w-full bg-surface border border-border rounded-2xl shadow-xl overflow-hidden transition-all">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 bg-surface border-b border-border">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-foreground m-0 tracking-tight">{t('cardHeaderTitle')}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase bg-accent/10 text-accent border border-accent/20">
                            Live
                        </span>
                    </div>
                    <p className="text-xs text-muted font-medium m-0 mt-0.5">{t('cardHeaderSub')}</p>
                </div>
                <div className="inline-flex bg-bg border border-border p-1 rounded-full shadow-inner" role="group" aria-label="Unit">
                    <button
                        type="button"
                        onClick={() => handleUnitChange('cm')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                            unit === 'cm'
                                ? 'bg-accent text-white dark:text-zinc-950 shadow-sm'
                                : 'text-muted hover:text-foreground'
                        }`}
                        aria-pressed={unit === 'cm'}
                    >
                        {t('unitMetric')}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUnitChange('imp')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                            unit === 'imp'
                                ? 'bg-accent text-white dark:text-zinc-950 shadow-sm'
                                : 'text-muted hover:text-foreground'
                        }`}
                        aria-pressed={unit === 'imp'}
                    >
                        {t('unitImperial')}
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-6">
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-4">
                    {/* Person 1 */}
                    <div className="space-y-2">
                        <label htmlFor="p1cm" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-foreground">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                            {t('person1Label')}
                        </label>
                        {unit === 'cm' ? (
                            <div className="flex items-center bg-bg border-2 border-border focus-within:border-blue-600 dark:focus-within:border-blue-400 border-l-[5px] border-l-blue-600 dark:border-l-blue-400 rounded-xl px-3 transition-all shadow-inner">
                                <input
                                    id="p1cm"
                                    type="number"
                                    inputMode="decimal"
                                    min="30"
                                    max="300"
                                    step="0.1"
                                    value={p1Cm}
                                    onChange={(e) => setP1Cm(e.target.value)}
                                    placeholder={t('cmPlaceholder')}
                                    className="w-full py-3 bg-transparent text-foreground text-2xl font-black outline-none font-mono"
                                />
                                <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg font-mono">CM</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center bg-bg border-2 border-border focus-within:border-blue-600 dark:focus-within:border-blue-400 border-l-[5px] border-l-blue-600 dark:border-l-blue-400 rounded-xl px-2.5 transition-all shadow-inner">
                                    <input
                                        id="p1ft"
                                        type="number"
                                        inputMode="numeric"
                                        min="1"
                                        max="9"
                                        value={p1Ft}
                                        onChange={(e) => setP1Ft(e.target.value)}
                                        aria-label={`${t('person1Label')} ${t('ftLabel')}`}
                                        className="w-full py-3 bg-transparent text-foreground text-xl font-black outline-none font-mono"
                                    />
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-md font-mono">FT</span>
                                </div>
                                <div className="flex items-center bg-bg border-2 border-border focus-within:border-blue-600 dark:focus-within:border-blue-400 rounded-xl px-2.5 transition-all shadow-inner">
                                    <input
                                        id="p1in"
                                        type="number"
                                        inputMode="decimal"
                                        min="0"
                                        max="11.9"
                                        step="0.1"
                                        value={p1In}
                                        onChange={(e) => setP1In(e.target.value)}
                                        aria-label={`${t('person1Label')} ${t('inLabel')}`}
                                        className="w-full py-3 bg-transparent text-foreground text-xl font-black outline-none font-mono"
                                    />
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-md font-mono">IN</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Swap Button */}
                    <button
                        type="button"
                        onClick={handleSwap}
                        aria-label={t('swapButtonLabel')}
                        title={t('swapButtonTitle')}
                        className="w-11 h-11 mb-1 mx-auto rounded-full border-2 border-border bg-surface text-muted hover:border-accent hover:text-accent transition-transform duration-200 active:rotate-180 flex items-center justify-center font-bold text-lg shadow-sm"
                    >
                        ⇄
                    </button>

                    {/* Person 2 */}
                    <div className="space-y-2">
                        <label htmlFor="p2cm" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-foreground">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                            {t('person2Label')}
                        </label>
                        {unit === 'cm' ? (
                            <div className="flex items-center bg-bg border-2 border-border focus-within:border-emerald-600 dark:focus-within:border-emerald-400 border-l-[5px] border-l-emerald-600 dark:border-l-emerald-400 rounded-xl px-3 transition-all shadow-inner">
                                <input
                                    id="p2cm"
                                    type="number"
                                    inputMode="decimal"
                                    min="30"
                                    max="300"
                                    step="0.1"
                                    value={p2Cm}
                                    onChange={(e) => setP2Cm(e.target.value)}
                                    placeholder={t('cmPlaceholder2')}
                                    className="w-full py-3 bg-transparent text-foreground text-2xl font-black outline-none font-mono"
                                />
                                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg font-mono">CM</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center bg-bg border-2 border-border focus-within:border-emerald-600 dark:focus-within:border-emerald-400 border-l-[5px] border-l-emerald-600 dark:border-l-emerald-400 rounded-xl px-2.5 transition-all shadow-inner">
                                    <input
                                        id="p2ft"
                                        type="number"
                                        inputMode="numeric"
                                        min="1"
                                        max="9"
                                        value={p2Ft}
                                        onChange={(e) => setP2Ft(e.target.value)}
                                        aria-label={`${t('person2Label')} ${t('ftLabel')}`}
                                        className="w-full py-3 bg-transparent text-foreground text-xl font-black outline-none font-mono"
                                    />
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-mono">FT</span>
                                </div>
                                <div className="flex items-center bg-bg border-2 border-border focus-within:border-emerald-600 dark:focus-within:border-emerald-400 rounded-xl px-2.5 transition-all shadow-inner">
                                    <input
                                        id="p2in"
                                        type="number"
                                        inputMode="decimal"
                                        min="0"
                                        max="11.9"
                                        step="0.1"
                                        value={p2In}
                                        onChange={(e) => setP2In(e.target.value)}
                                        aria-label={`${t('person2Label')} ${t('inLabel')}`}
                                        className="w-full py-3 bg-transparent text-foreground text-xl font-black outline-none font-mono"
                                    />
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-mono">IN</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hint */}
                <p className="flex items-center gap-2 text-xs text-muted font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0_3px_var(--color-border)] shrink-0" />
                    {t('hintText')}
                </p>

                {/* Results Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
                    {/* Card 1: Difference */}
                    <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
                        <div className="text-[11px] font-black uppercase tracking-wider text-accent">
                            {t('heightDifferenceLabel')}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-foreground my-1.5 font-mono">
                            {valid ? diffDisplay : '—'}
                        </div>
                        <div className="text-xs text-muted font-bold font-mono">
                            {valid ? diffAltDisplay : ''}
                        </div>
                    </div>

                    {/* Card 2: Percentage */}
                    <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5 text-center shadow-sm">
                        <div className="text-[11px] font-black uppercase tracking-wider text-muted">
                            {t('percentDifferenceLabel')}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-foreground my-1.5 font-mono">
                            {valid ? `${fmt(pct)}%` : '—'}
                        </div>
                        <div className="text-xs text-muted font-bold">
                            {valid ? (gap === 0 ? t('noDifferenceText') : t('personShorterText', { person: shorterWho, pct: fmt(pct) })) : ''}
                        </div>
                    </div>

                    {/* Card 3: Taller Person */}
                    <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5 text-center shadow-sm">
                        <div className="text-[11px] font-black uppercase tracking-wider text-muted">
                            {t('tallerPersonLabel')}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-foreground my-1.5 font-mono">
                            {valid ? tallDisplay : '—'}
                        </div>
                        <div className="text-xs text-accent font-bold">
                            {valid ? tallerWho : ''}
                        </div>
                    </div>
                </div>

                {/* Integrated Gap SVG Visualization */}
                <div className="border border-border rounded-xl p-4 bg-bg/50">
                    <div className="text-[11px] font-black uppercase tracking-widest text-muted text-center mb-2">
                        {t('gapGraphicLabel')}
                    </div>
                    <svg
                        viewBox="0 0 420 230"
                        role="img"
                        aria-label="Scaled figures showing the height gap between Person 1 and Person 2"
                        className="w-full max-w-[420px] h-auto mx-auto block"
                    >
                        {/* Floor Line */}
                        <line x1="40" y1={floor} x2="380" y2={floor} stroke="currentColor" className="text-border" strokeWidth="2" />

                        {/* Person 1 (x = 130) */}
                        {renderFigure(valid ? h1 : 180, 130, 'text-blue-600 dark:text-blue-400', t('person1Label'))}

                        {/* Person 2 (x = 290) */}
                        {renderFigure(valid ? h2 : 165, 290, 'text-emerald-600 dark:text-emerald-400', t('person2Label'))}

                        {/* Gap Bracket */}
                        {showBracket && (
                            <g>
                                <line x1="210" y1={y1} x2="210" y2={y2} stroke="currentColor" className="text-foreground" strokeWidth="1.5" />
                                <line x1="204" y1={y1} x2="216" y2={y1} stroke="currentColor" className="text-foreground" strokeWidth="1.5" />
                                <line x1="204" y1={y2} x2="216" y2={y2} stroke="currentColor" className="text-foreground" strokeWidth="1.5" />
                                <line x1={h1 >= h2 ? '150' : '270'} y1={y1} x2="210" y2={y1} stroke="currentColor" className="text-muted" strokeDasharray="3 4" strokeWidth="1" />
                            </g>
                        )}

                        {/* Floating Gap Pill */}
                        <g>
                            <rect
                                x="176"
                                y={y2 + 8}
                                width="68"
                                height="34"
                                rx="17"
                                className="fill-surface stroke-border"
                                strokeWidth="1"
                            />
                            <text x="210" y={y2 + 23} textAnchor="middle" fontSize="12" fontWeight="800" className="fill-foreground font-mono">
                                {fmtGapText(gap)}
                            </text>
                            <text x="210" y={y2 + 36} textAnchor="middle" fontSize="10" className="fill-muted font-bold font-mono">
                                {fmt(pct)}%
                            </text>
                        </g>
                    </svg>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-bold text-muted uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('badgeFree')}</span>
                    <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('badgeNoAccount')}</span>
                    <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('badgeSupportsUnits')}</span>
                    <span className="flex items-center gap-1.5"><span className="text-accent font-black">✓</span> {t('badgeUpdatesLive')}</span>
                </div>
            </div>
        </div>
    );
}
