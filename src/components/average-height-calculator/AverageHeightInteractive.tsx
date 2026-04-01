'use client';

import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import ReactCountryFlag from "react-country-flag";
import { useUnitStore } from '@/store';
import { BLUE, TEAL, AMBER, RED } from '@/constants/colors';
import { TOP10, BOT10, MVF, BELL_CONFIG, heightData } from '@/constants/averageHeight';

// --- Sub-components (extracted from page.tsx) ---

function Tabs({ options, active, onChange }: { options: string[], active: string, onChange: (val: string) => void }) {
    return (
        <div className="flex bg-bg/50 p-1 rounded-xl mb-6 w-fit border border-border/50">
            {options.map(opt => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all duration-300 ${active === opt ? 'bg-accent text-white shadow-md scale-[1.02]' : 'text-muted hover:text-foreground'}`}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

function Bars({ items, color, label }: { items: { n: string, code: string | string[], v: number }[], color: string, label: string }) {
    const vals = items.map(d => d.v);
    const max = Math.max(...vals), min = Math.min(...vals), range = max - min;
    return (
        <div className="w-full min-w-[300px]">
            {label && <p className="mb-2 text-[11px] text-muted uppercase tracking-[0.1em] font-bold">{label}</p>}
            <div className="flex flex-col gap-2">
                {items.map(d => {
                    const pct = range > 0 ? ((d.v - min) / range) * 65 + 22 : 55;
                    return (
                        <div key={d.n} className="flex items-center gap-2.5">
                            <div className="w-[140px] text-[11px] text-foreground text-left shrink-0 flex items-center justify-start gap-2">
                                {Array.isArray(d.code) ? (
                                    <div className="flex -space-x-1">
                                        {d.code.map(c => <ReactCountryFlag key={c} countryCode={c} svg className="w-3.5 h-3.5 rounded-sm" />)}
                                    </div>
                                ) : <ReactCountryFlag countryCode={d.code} svg className="w-3.5 h-3.5 rounded-sm" />}
                                <span className="truncate">{d.n}</span>
                            </div>
                            <div className="flex-1 h-5 bg-bg/50 rounded-full overflow-hidden border border-border/20 relative">
                                <div
                                    style={{ width: `${pct}%`, backgroundColor: color }}
                                    className="h-full transition-all duration-1000 ease-out shadow-[0_0_12px_-2px_rgba(0,0,0,0.1)]"
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-[10px] font-black text-foreground/80">{d.v} cm</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function GroupedChart({ data, title }: { data: { n: string, code: string, m: number, w: number }[], title: string }) {
    return (
        <div className="w-full min-w-[400px]">
            <p className="mb-4 text-[11px] text-muted uppercase tracking-[0.1em] font-bold">{title}</p>
            <div className="flex flex-col gap-3">
                {data.map(d => (
                    <div key={d.n} className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-wider">
                            <ReactCountryFlag countryCode={d.code} svg className="w-3.5 h-3.5" /> {d.n}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div style={{ width: `${(d.m / 190) * 100}%`, backgroundColor: BLUE }} className="h-3 rounded-r-full shadow-sm" />
                                <span className="text-[10px] font-black text-foreground">{d.m}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div style={{ width: `${(d.w / 190) * 100}%`, backgroundColor: TEAL }} className="h-3 rounded-r-full shadow-sm" />
                                <span className="text-[10px] font-black text-foreground">{d.w}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RegionMap() {
    return (
        <div className="relative w-full aspect-[2/1] bg-bg/30 rounded-3xl border border-border/50 overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div className="w-full h-full border-[0.5px] border-foreground/20 [mask-image:radial-gradient(white,transparent)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-muted tracking-widest uppercase opacity-20">Global Height Regional Map</span>
            </div>
            {/* Visual pointers for regions */}
            <div className="absolute top-[20%] left-[45%] w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(26,86,219,0.5)]" />
            <div className="absolute top-[35%] left-[15%] w-2 h-2 bg-accent/60 rounded-full" />
            <div className="absolute top-[60%] left-[25%] w-2 h-2 bg-accent/60 rounded-full" />
            <div className="absolute top-[50%] left-[75%] w-3 h-3 bg-accent/80 rounded-full" />
            <div className="absolute bottom-4 right-4 bg-surface/80 backdrop-blur-sm border border-border px-3 py-2 rounded-xl text-[10px] font-bold text-muted">
                Denser teal/blue areas represent taller average populations.
            </div>
        </div>
    );
}

function BellCurve({ mean, sd, color, bandColor, label, pctLabel }: { mean: number, sd: number, color: string, bandColor: string, label: string, pctLabel: string }) {
    const points = useMemo(() => {
        const p = [];
        for (let x = mean - 4 * sd; x <= mean + 4 * sd; x += 0.5) {
            const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
            p.push({ x, y });
        }
        return p;
    }, [mean, sd]);

    const max_y = 1 / (sd * Math.sqrt(2 * Math.PI));
    const h = 180, w = 600;
    const scaleX = (val: number) => ((val - (mean - 4 * sd)) / (8 * sd)) * w;
    const scaleY = (val: number) => h - (val / max_y) * (h - 20);

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ');

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight">Height Distribution: {label}</h4>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">{pctLabel}</p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-muted block uppercase font-bold tracking-tighter">Mean Height</span>
                    <span className="text-2xl font-black text-accent">{mean} cm</span>
                </div>
            </div>
            <div className="relative bg-bg/50 rounded-2xl border border-border/50 p-4 overflow-hidden">
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible">
                    {/* SD Shading */}
                    <path
                        fill={bandColor} fillOpacity="0.15"
                        d={`${points.filter(p => p.x >= mean - sd && p.x <= mean + sd).map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ')} L ${scaleX(mean + sd)} ${h} L ${scaleX(mean - sd)} ${h} Z`}
                    />
                    <path
                        fill={bandColor} fillOpacity="0.08"
                        d={`${points.filter(p => p.x >= mean - 2 * sd && p.x <= mean + 2 * sd).map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ')} L ${scaleX(mean + 2 * sd)} ${h} L ${scaleX(mean - 2 * sd)} ${h} Z`}
                    />

                    {/* Main Curve */}
                    <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" className="drop-shadow-sm" />

                    {/* Mean line */}
                    <line x1={scaleX(mean)} y1={scaleY(max_y)} x2={scaleX(mean)} y2={h} stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

                    {/* Labels */}
                    <text x={scaleX(mean)} y={h + 15} textAnchor="middle" fontSize="10" fontWeight="900" fill="currentColor" className="text-muted">{mean}</text>
                    <text x={scaleX(mean - 2 * sd)} y={h + 15} textAnchor="middle" fontSize="10" fontWeight="900" fill="currentColor" className="text-muted/40">{mean - 2 * sd}</text>
                    <text x={scaleX(mean + 2 * sd)} y={h + 15} textAnchor="middle" fontSize="10" fontWeight="900" fill="currentColor" className="text-muted/40">{mean + 2 * sd}</text>
                </svg>
            </div>
        </div>
    );
}

// --- Main Interactive Component ---

export default function AverageHeightInteractive() {
    const { unitSystem, setUnitSystem } = useUnitStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof heightData[0] | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

    const [tallTab, setTallTab] = useState("Men");
    const [shortTab, setShortTab] = useState("Men");
    const [mvfView, setMvfView] = useState("Tallest vs Shortest");
    const [bellSex, setBellSex] = useState<"Male" | "Female">("Male");

    const cmToFtIn = (cm: number) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return `${feet}'${inches}"`;
    };

    const handleSort = (key: keyof typeof heightData[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedData = useMemo(() => {
        const sortableItems = heightData.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [searchQuery, sortConfig]);

    const maleTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.male }));
    const femTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.female }));
    const maleBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.male }));
    const femBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.female }));

    return (
        <div className="flex flex-col gap-12">
            {/* Global Table Section */}
            <section className="scroll-mt-24">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height by Country (Global Table)</h2>
                    <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                        <button onClick={() => setUnitSystem('metric')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>Metric (cm)</button>
                        <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>US (ft/in)</button>
                    </div>
                </div>

                <p className="text-muted leading-relaxed mb-6">
                    The table below shows average male height by country, average female height, and combined average across 46 nations. Click any column header to sort. Use the search field to find a specific country.
                </p>

                <div className="bg-surface border border-border p-4 rounded-3xl shadow-sm mb-8">
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent transition-colors"
                        />
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-bg border-b border-border text-foreground font-bold uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('rank')}>
                                        <div className="flex items-center gap-1">Rank <ArrowUpDown size={14} /></div>
                                    </th>
                                    <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('name')}>
                                        <div className="flex items-center gap-1">Country <ArrowUpDown size={14} /></div>
                                    </th>
                                    <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('maleCm')}>
                                        <div className="flex items-center gap-1">Avg Male <ArrowUpDown size={14} /></div>
                                    </th>
                                    <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('femaleCm')}>
                                        <div className="flex items-center gap-1">Avg Female <ArrowUpDown size={14} /></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50 text-muted">
                                {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((country) => (
                                    <tr key={country.name} className="hover:bg-bg/50 transition-colors">
                                        <td className="px-6 py-4">{country.rank}</td>
                                        <td className="px-6 py-4 font-bold text-foreground flex items-center gap-2">
                                            <ReactCountryFlag countryCode={country.flag} svg style={{ width: '1.5em', height: '1.5em' }} title={country.name} /> {country.name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            {unitSystem === 'metric' ? `${country.maleCm} cm` : cmToFtIn(country.maleCm)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            {unitSystem === 'metric' ? `${country.femaleCm} cm` : cmToFtIn(country.femaleCm)}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted">No countries found matching &quot;{searchQuery}&quot;</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Tallest countries bar charts */}
            <section id="tallest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest Countries in the World</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Men", "Women"]} active={tallTab} onChange={setTallTab} />
                    <Bars
                        items={tallTab === "Men" ? maleTop10 : femTop10}
                        color={tallTab === "Men" ? BLUE : TEAL}
                        label={`Top 10 tallest nations — ${tallTab === "Men" ? "Average male" : "Average female"} height (cm)`}
                    />
                </div>
            </section>

            {/* Shortest countries bar charts */}
            <section id="shortest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Shortest Countries in the World</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Men", "Women"]} active={shortTab} onChange={setShortTab} />
                    <Bars
                        items={shortTab === "Men" ? maleBot10 : femBot10}
                        color={shortTab === "Men" ? AMBER : RED}
                        label={`10 shortest nations — ${shortTab === "Men" ? "Average male" : "Average female"} height (cm)`}
                    />
                </div>
            </section>

            {/* Grouped Comparison Charts */}
            <section id="tallest-and-shortest-countries-by-average-height" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest and Shortest Countries by Average Height</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Tallest vs Shortest", "Top 10 tallest", "Bottom 10 shortest"]} active={mvfView} onChange={setMvfView} />
                    {mvfView === "Tallest vs Shortest" && <GroupedChart data={MVF} title="10 countries spanning the full global height range — male (blue) and female (teal)" />}
                    {mvfView === "Top 10 tallest" && <GroupedChart data={TOP10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title="Top 10 tallest nations — male vs female" />}
                    {mvfView === "Bottom 10 shortest" && <GroupedChart data={BOT10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title="10 shortest nations — male vs female" />}
                </div>
            </section>

            {/* Regional Map section */}
            <section id="global-average-height" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Global Average Height</h2>
                <RegionMap />
            </section>

            {/* Bell Curve distribution */}
            <section id="human-height-distribution" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Human Height Distribution</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Male", "Female"]} active={bellSex} onChange={(val) => setBellSex(val as "Male" | "Female")} />
                    <BellCurve
                        mean={BELL_CONFIG[bellSex].mean} sd={BELL_CONFIG[bellSex].sd}
                        color={BELL_CONFIG[bellSex].color} bandColor={BELL_CONFIG[bellSex].bandColor}
                        label={BELL_CONFIG[bellSex].label} pctLabel={BELL_CONFIG[bellSex].pctLabel}
                    />
                    <div className="flex gap-4 mt-4 flex-wrap">
                        {BELL_CONFIG[bellSex].bands.map((b: { col: string, label: string }) => (
                            <div key={b.label} className="flex items-center gap-2">
                                <div style={{ background: b.col, borderColor: b.col }} className="w-4 h-4 rounded opacity-35 border" />
                                <span className="text-[11.5px] text-muted">{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
