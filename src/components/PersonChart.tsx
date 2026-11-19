'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Person } from '../types';
import { useUnitStore } from '../store';
import { heightGap, ftIn } from '../lib/height';

interface PersonChartProps {
    persons: Person[];
    onRemove: (id: string) => void;
    onEdit?: (id: string) => void;
    onReorder?: (id: string, direction: 'up' | 'down') => void;
    highlight?: boolean;
    referencePersonId?: string | null;
    onSelectReference?: (id: string) => void;
}

const PersonChart: React.FC<PersonChartProps> = React.memo(({
    persons,
    onRemove,
    onEdit,
    onReorder,
    highlight,
    referencePersonId,
    onSelectReference,
}) => {
    const t = useTranslations('dashboard.personChart');
    const { unitSystem } = useUnitStore();
    const listHeaderRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    React.useEffect(() => {
        if (highlight && listHeaderRef.current) {
            listHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [highlight]);

    // Ticket T2: Mode 2 Differences List when 3 or more figures are present
    if (persons.length >= 3) {
        const refPerson = persons.find(p => p.id === referencePersonId) || persons[0];
        const sortedPersons = [...persons].sort((a, b) => b.heightCm - a.heightCm);
        const tallest = sortedPersons[0];
        const shortest = sortedPersons[sortedPersons.length - 1];
        const extremeGap = heightGap(tallest.heightCm, shortest.heightCm);
        const extremeDiff = unitSystem === 'imperial'
            ? `${extremeGap.gapIn} in (${extremeGap.gapCm} cm)`
            : `${extremeGap.gapCm} cm (${extremeGap.gapIn} in)`;

        return (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-transparent">
                {/* 1. COMPARE AGAINST Selector */}
                <div className="px-5 pt-3 pb-2 bg-surface/50 border-b border-border/50 shrink-0">
                    <p className="text-[10.5px] font-black uppercase tracking-[0.12em] text-[#71717a] mb-1.5">
                        {t('compareAgainst')}
                    </p>
                    <div ref={dropdownRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="w-full flex items-center gap-2.5 bg-[#27272a] border border-[#52525b] hover:border-[#fdba74]/80 rounded-xl px-3.5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors text-left"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="listbox"
                        >
                            <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: refPerson.color }} />
                            <span className="flex-1 truncate">{refPerson.name}</span>
                            <span className="font-extrabold text-white text-xs">
                                {unitSystem === 'metric' ? `${refPerson.heightCm} cm` : ftIn(refPerson.heightCm)}
                            </span>
                            <ChevronDown size={14} className={`text-[#a1a1aa] shrink-0 ml-0.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#fdba74]' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                    transition={{ duration: 0.15 }}
                                    role="listbox"
                                    className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-[#1c1c1f] border border-[#3f3f46] rounded-xl p-1.5 shadow-2xl space-y-1 max-h-60 overflow-y-auto custom-scrollbar"
                                >
                                    {persons.map(p => {
                                        const isSelected = p.id === refPerson.id;
                                        return (
                                            <button
                                                key={p.id}
                                                type="button"
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() => {
                                                    onSelectReference?.(p.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left ${
                                                    isSelected
                                                        ? 'bg-[#fdba74]/20 text-[#fdba74] border border-[#fdba74]/40 font-black'
                                                        : 'text-[#e4e4e7] hover:bg-[#27272a] hover:text-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                    <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: p.color }} />
                                                    <span className="truncate">{p.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="font-mono text-[11px] text-[#a1a1aa]">
                                                        {unitSystem === 'metric' ? `${p.heightCm} cm` : ftIn(p.heightCm)}
                                                    </span>
                                                    {isSelected && <Check size={13} className="text-[#fdba74]" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 2. DIFFERENCES VS [NAME] Header */}
                <div className="px-5 pt-3 pb-1 flex items-center justify-between shrink-0">
                    <p className="text-[10.5px] font-black uppercase tracking-[0.12em] text-[#71717a]">
                        {t('differencesVs', { name: refPerson.name })}
                    </p>
                </div>

                {/* 3. Sorted Differences List (tallest to shortest) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-1.5 space-y-2">
                    <AnimatePresence mode="popLayout">
                        {sortedPersons.map((p) => {
                            const isRef = p.id === refPerson.id;
                            const isTaller = p.heightCm > refPerson.heightCm;
                            const isShorter = p.heightCm < refPerson.heightCm;
                            const gap = heightGap(p.heightCm, refPerson.heightCm);

                            let deltaClass = 'text-[#a1a1aa]';
                            let deltaText = 'Reference';
                            if (isTaller) {
                                deltaText = unitSystem === 'imperial'
                                    ? `+${gap.gapIn} in (${gap.gapCm} cm) · ${gap.tallerPct}% taller`
                                    : `+${gap.gapCm} cm (${gap.gapIn} in) · ${gap.tallerPct}% taller`;
                                deltaClass = 'text-[#86efac]';
                            } else if (isShorter) {
                                deltaText = unitSystem === 'imperial'
                                    ? `−${gap.gapIn} in (${gap.gapCm} cm) · ${gap.shorterPct}% shorter`
                                    : `−${gap.gapCm} cm (${gap.gapIn} in) · ${gap.shorterPct}% shorter`;
                                deltaClass = 'text-[#fdba74]';
                            } else if (!isRef) {
                                deltaText = 'Same height';
                                deltaClass = 'text-[#a1a1aa]';
                            }

                            return (
                                <motion.div
                                    layout
                                    key={p.id}
                                    onClick={() => onSelectReference?.(p.id)}
                                    className={`p-3 rounded-xl bg-[#27272a] border transition-all cursor-pointer shadow-sm relative overflow-hidden group ${
                                        isRef ? 'border-[#fdba74] ring-1.5 ring-[#fdba74]' : 'border-border/60 hover:border-accent/40'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: p.color }} />
                                            <span className="font-bold text-xs sm:text-[13px] text-[#f4f4f5] truncate">
                                                {p.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="font-extrabold text-xs font-mono text-white">
                                                {unitSystem === 'metric' ? `${p.heightCm} cm` : ftIn(p.heightCm)}
                                            </span>
                                            {onEdit && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onEdit(p.id); }}
                                                    className="p-1 text-muted hover:text-accent rounded transition-colors opacity-80 group-hover:opacity-100"
                                                    aria-label={`Edit ${p.name}`}
                                                >
                                                    <Edit2 size={13} />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onRemove(p.id); }}
                                                className="p-1 text-muted hover:text-red-400 rounded transition-colors opacity-80 group-hover:opacity-100"
                                                aria-label={`Remove ${p.name}`}
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`mt-1 pl-5 text-[11.5px] sm:text-[12px] font-bold ${deltaClass}`}>
                                        {deltaText}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* 4. Range Summary and Hint */}
                <div className="p-4 border-t border-[#3f3f46] shrink-0 bg-surface/50 space-y-1">
                    <p className="text-xs text-[#d4d4d8] leading-relaxed">
                        <b className="text-white font-bold">{t('tallestVsShortest')}:</b> {tallest.name} is {extremeDiff} taller than {shortest.name}.
                    </p>
                    <p className="text-[11px] text-[#a1a1aa]">
                        Tap any figure on the chart to make it the reference.
                    </p>
                </div>
            </div>
        );
    }

    // Standard list for 0, 1, or 2 figures
    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div
                ref={listHeaderRef}
                className={`px-6 py-4 flex items-center justify-between sticky top-0 bg-surface z-10 border-y border-border transition-colors duration-500 ${highlight ? 'bg-accent/10 border-accent/50 group' : ''}`}
            >
                <p className="text-xs uppercase tracking-[0.15em] font-black text-foreground/70 flex items-center gap-2">
                    {t('yourList')}
                    {highlight && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-accent"
                        />
                    )}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-2.5">
                <AnimatePresence mode="popLayout">
                    {persons.map((person, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                                delay: index * 0.01
                            }}
                            whileHover={{ scale: 1.01, x: 2, backgroundColor: 'rgba(59, 130, 246, 0.03)' }}
                            key={person.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border hover:border-accent/40 group transition-all shadow-sm relative overflow-hidden"
                        >
                            {/* Rigid Left Section */}
                            <div className="flex items-start gap-3 relative z-10 flex-1 min-w-0">
                                {/* 1. ARROWS */}
                                <div className="flex flex-col items-center justify-center gap-1 w-6 shrink-0">
                                    <button
                                        disabled={index === 0}
                                        onClick={() => onReorder?.(person.id, 'up')}
                                        aria-label="Move up"
                                        className="p-0.5 text-muted hover:text-accent disabled:opacity-30 transition-colors flex items-center justify-center"
                                    >
                                        <ChevronUp size={14} strokeWidth={3} />
                                    </button>
                                    <button
                                        disabled={index === persons.length - 1}
                                        onClick={() => onReorder?.(person.id, 'down')}
                                        aria-label="Move down"
                                        className="p-0.5 text-muted hover:text-accent disabled:opacity-30 transition-colors flex items-center justify-center"
                                    >
                                        <ChevronDown size={14} strokeWidth={3} />
                                    </button>
                                </div>
                                {/* 2. DOT: Match the height of the first line of text (h-4 is 16px) */}
                                <div className="flex items-center justify-center w-4 shrink-0 h-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                                        style={{ backgroundColor: person.color }}
                                    />
                                </div>
                                {/* 3. TEXT BLOCK: Name on top, Height below, no truncation */}
                                <div className="flex flex-col min-w-0 flex-1">
                                    {/* The name line is also roughly 16px high (h-4) */}
                                    <span className="text-[11px] h-4 flex items-center font-mono text-foreground uppercase tracking-tight break-words">
                                        {person.name}
                                    </span>
                                    <span className="text-[10px] font-mono font-black text-foreground mt-0.5">
                                        {unitSystem === 'metric'
                                            ? (person.heightCm >= 1000
                                                ? `${(person.heightCm / 100).toFixed(person.heightCm % 100 === 0 ? 0 : 2)} m`
                                                : `${person.heightCm} cm`)
                                            : ftIn(person.heightCm)}
                                    </span>
                                </div>
                            </div>

                            {/* Right Section Actions */}
                            <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10 shrink-0 ml-2 w-16">
                                <button
                                    onClick={() => onEdit?.(person.id)}
                                    className="p-1.5 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                                    aria-label={t('edit')}
                                >
                                    <Edit2 size={13} strokeWidth={3} />
                                </button>
                                <button
                                    onClick={() => onRemove(person.id)}
                                    className="p-1.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    aria-label={t('remove')}
                                >
                                    <Trash2 size={13} strokeWidth={3} />
                                </button>
                            </div>

                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {persons.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="flex flex-col items-center justify-center py-10"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] font-black text-foreground text-center">
                            List is Empty
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
});

PersonChart.displayName = 'PersonChart';

export default PersonChart;
