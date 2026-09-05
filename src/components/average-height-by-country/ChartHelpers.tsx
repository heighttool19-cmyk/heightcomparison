import React from 'react';
import ReactCountryFlag from "react-country-flag";
import { BLUE, TEAL } from '@/constants/colors';

// --- Shared presentational chart building blocks for the Average Height by
// Country page. These take already-translated strings as props so they can
// be rendered from either the server page (static sections) or the client
// components (interactive tab sections) without owning any i18n/state
// themselves.

export function Bars({ items, color, label }: { items: { n: string, code: string | string[], v: number }[], color: string, label: string }) {
    const vals = items.map(d => d.v);
    const max = Math.max(...vals), min = Math.min(...vals), range = max - min;

    return (
        // 1. Changed to w-[98%] on mobile, removed the strict min-w-[300px] that caused horizontal scrolling
        <div className="w-[98%] sm:w-[90%] min-w-0 mx-auto">
            {label && <p className="mb-2 text-[10px] sm:text-[11px] text-muted uppercase tracking-[0.1em] font-bold">{label}</p>}

            <div className="flex flex-col gap-1.5 sm:gap-2 w-full min-w-0">
                {items.map(d => {
                    const pct = range > 0 ? ((d.v - min) / range) * 65 + 22 : 55;
                    return (
                        <div key={d.n} className="flex items-center gap-1.5 sm:gap-1 w-full min-w-0">

                            {/* 2. Responsive width (w-[85px] on mobile), text size, and min-w-0 to prevent flex blowout */}
                            <div className="w-[70px] sm:w-24 h-full text-[9px] sm:text-[11px] text-foreground text-left shrink-0 flex items-center justify-start gap-1 min-w-0">
                                {Array.isArray(d.code) ? (
                                    <div className="flex gap-0.5 shrink-0 w-7 sm:w-8">
                                        {d.code.map(c => <ReactCountryFlag key={c} countryCode={c} svg style={{ width: '1.2em', height: '1.2em' }} title={c} />)}
                                    </div>
                                ) : d.code ? (
                                    <div className="shrink-0 flex justify-start w-4">
                                        <ReactCountryFlag countryCode={d.code} svg style={{ width: '1.2em', height: '1.2em' }} title={d.n} />
                                    </div>
                                ) : null}

                                {/* 3. Swapped span for div, added break-words and leading-tight so long names wrap nicely */}
                                <div className="flex-1 leading-[1.1] min-w-0">
                                    {d.n.replace('/', '/ ')}
                                </div>
                            </div>

                            {/* 4. Middle Bar - flex-1 takes up the remaining safe space */}
                            <div className="flex-1 bg-border rounded-full h-2 sm:h-2.5 overflow-hidden min-w-[40px]">
                                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
                            </div>

                            {/* 5. Right Value - scaled down text and width for mobile, aligned right for neatness */}
                            <div className="w-[45px] sm:w-[55px] text-[9px] sm:text-[11px] text-foreground shrink-0 text-right">
                                {d.v} cm
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function GroupedChart({ data, title, maleLabel, femaleLabel }: { data: { n: string, code: string, m: number, w: number }[], title: string, maleLabel: string, femaleLabel: string }) {
    const W = 540, H = 240, pL = 26, pR = 14, pT = 14, pB = 48, plotW = W - pL - pR, plotH = H - pT - pB;
    const minV = 145, maxV = 188, toY = (v: number) => pT + plotH - ((v - minV) / (maxV - minV)) * plotH;
    const gW = plotW / data.length, bW = gW * 0.30, gap = gW * 0.04;
    const yTicks = [150, 155, 160, 165, 170, 175, 180, 185];
    return (
        <div className="w-full min-w-[500px] mb-2">
            {title && <p className="mb-2 text-[11px] text-muted uppercase tracking-[0.1em] font-bold">{title}</p>}
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
                {yTicks.map(t => (
                    <g key={t}>
                        <line x1={pL} y1={toY(t)} x2={pL + plotW} y2={toY(t)} stroke="var(--border)" strokeWidth="1" />
                        <text x={pL - 3} y={toY(t) + 4} textAnchor="end" fontSize="8" fill="var(--muted)">{t}</text>
                    </g>
                ))}
                {data.map((c, i) => {
                    const cx = pL + i * gW + gW / 2;
                    return (
                        <g key={c.n}>
                            <rect x={cx - bW - gap / 2} y={toY(c.m)} width={bW} height={toY(minV) - toY(c.m)} fill={BLUE} rx="3" opacity="0.88" />
                            <rect x={cx + gap / 2} y={toY(c.w)} width={bW} height={toY(minV) - toY(c.w)} fill={TEAL} rx="3" opacity="0.88" />
                            <text x={cx - bW / 2 - gap / 2} y={toY(c.m) - 3} textAnchor="middle" fontSize="7" fill={BLUE}>{c.m}</text>
                            <text x={cx + bW / 2 + gap / 2} y={toY(c.w) - 3} textAnchor="middle" fontSize="7" fill={TEAL}>{c.w}</text>
                            <text x={cx} y={pT + plotH + 12} textAnchor="middle" fontSize="8.5" fill="var(--foreground)">{c.code}</text>
                            <text x={cx} y={pT + plotH + 23} textAnchor="middle" fontSize="7.5" fill="var(--foreground)">{c.n}</text>
                        </g>
                    );
                })}
                <line x1={pL} y1={pT} x2={pL} y2={pT + plotH} stroke="var(--border)" strokeWidth="1.2" />
                <line x1={pL} y1={pT + plotH} x2={pL + plotW} y2={pT + plotH} stroke="var(--border)" strokeWidth="1.2" />
                <rect x={pL + plotW - 78} y={pT + 2} width={9} height={9} fill={BLUE} rx="2" />
                <text x={pL + plotW - 66} y={pT + 10} fontSize="9" fill="var(--foreground)">{maleLabel}</text>
                <rect x={pL + plotW - 34} y={pT + 2} width={9} height={9} fill={TEAL} rx="2" />
                <text x={pL + plotW - 22} y={pT + 10} fontSize="9" fill="var(--foreground)">{femaleLabel}</text>
            </svg>
        </div>
    );
}

export function BellCurve({ mean, sd, color, bandColor, globalAvgText, axisText, pctLabel }: {
    mean: number, sd: number, color: string, bandColor: string, globalAvgText: string, axisText: string, pctLabel: string
}) {
    const W = 520, H = 175, pL = 40, pR = 18, pT = 18, pB = 40;
    const minX = mean - 3.5 * sd, maxX = mean + 3.5 * sd;
    const gauss = (x: number) => Math.exp(-0.5 * ((x - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
    const peak = gauss(mean);
    const plotW = W - pL - pR, plotH = H - pT - pB;
    const toX = (v: number) => pL + ((v - minX) / (maxX - minX)) * plotW;
    const toY = (p: number) => pT + plotH - (p / peak) * plotH * 0.84;
    const pts = [];
    for (let x = minX; x <= maxX; x += 0.5) pts.push({ x, y: gauss(x) });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(" ");
    const band = (lo: number, hi: number, col: string, op: number) => {
        const b = []; for (let x = lo; x <= hi; x += 0.5) b.push([toX(x).toFixed(1), toY(gauss(x)).toFixed(1)]);
        if (!b.length) return null;
        const d = b.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + ` L${toX(hi)},${toY(0)} L${toX(lo)},${toY(0)} Z`;
        return <path d={d} fill={col} opacity={op} />;
    };
    const ticks = [mean - 3 * sd, mean - 2 * sd, mean - sd, mean, mean + sd, mean + 2 * sd, mean + 3 * sd];
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[500px] block">
            {band(mean - sd, mean + sd, color, 0.13)}
            {band(mean - 2 * sd, mean - sd, bandColor, 0.1)}
            {band(mean + sd, mean + 2 * sd, bandColor, 0.1)}
            <path d={line} fill="none" stroke={color} strokeWidth="2.2" />
            <line x1={toX(mean)} y1={pT} x2={toX(mean)} y2={pT + plotH} stroke={color} strokeWidth="1.2" strokeDasharray="4,3" opacity="0.5" />
            <text x={toX(mean)} y={pT - 4} textAnchor="middle" fontSize="9.5" fill={color} fontWeight="700">{globalAvgText}</text>
            {ticks.map(t => <text key={t} x={toX(t)} y={pT + plotH + 13} textAnchor="middle" fontSize="8.5" fill="var(--muted)">{Math.round(t)}</text>)}
            <line x1={pL} y1={pT + plotH} x2={pL + plotW} y2={pT + plotH} stroke="var(--border)" strokeWidth="1.2" />
            <text x={pL + plotW / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="var(--muted)">{axisText}</text>
            <text x={toX(mean)} y={toY(gauss(mean)) + 28} textAnchor="middle" fontSize="9.5" fill={color} fontWeight="700">{pctLabel}</text>
            <text x={toX(mean - sd) - 2} y={pT + plotH + 26} textAnchor="middle" fontSize="8" fill="var(--muted)">−1σ</text>
            <text x={toX(mean + sd) + 2} y={pT + plotH + 26} textAnchor="middle" fontSize="8" fill="var(--muted)">+1σ</text>
        </svg>
    );
}

export function RegionMap({ regions, colourScaleLabel, tallestLabel, shortestLabel }: {
    regions: { name: string, avg: number, color: string, ex: string }[],
    colourScaleLabel: string,
    tallestLabel: string,
    shortestLabel: string
}) {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                {regions.map(r => (
                    <div key={r.name} style={{ background: `${r.color}18`, borderColor: `${r.color}40` }} className="rounded-xl p-3 border-[1.5px]">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div style={{ background: r.color }} className="w-2.5 h-2.5 rounded-full shrink-0" />
                            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">{r.name}</span>
                        </div>
                        <div style={{ color: r.color }} className="text-base font-black">{r.avg} cm</div>
                        <div className="text-[10px] text-muted mt-0.5">{r.ex}</div>
                    </div>
                ))}
            </div>
            <p className="mb-1 text-[10px] text-muted uppercase tracking-[0.1em] font-bold">{colourScaleLabel}</p>
            <div className="flex h-3 rounded-md overflow-hidden">
                {["#1A56DB", "#2563EB", "#3B82F6", "#60A5FA", "#7DD3FC", "#86EFAC", "#FCD34D", "#FB923C", "#EF4444"].map(c => <div key={c} className="flex-1" style={{ background: c }} />)}
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-[9.5px] text-muted">{tallestLabel}</span>
                <span className="text-[9.5px] text-muted">{shortestLabel}</span>
            </div>
        </div>
    );
}

export function Tabs({ options, active, onChange }: { options: string[], active: string, onChange: (val: string) => void }) {
    return (
        <div className="flex gap-1 mb-4 flex-wrap">
            {options.map(o => (
                <button key={o} onClick={() => onChange(o)}
                    className={`px-2 py-1.5 rounded-full text-[11px] font-black transition-all border-2 ${active === o ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}>
                    {o}
                </button>
            ))}
        </div>
    );
}
