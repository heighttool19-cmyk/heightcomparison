'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Person } from '../types';
import { useUnitStore } from '../store';

interface PersonBarProps {
    person: Person;
    scale: number;
    onEditRequest?: (id: string) => void;
    onRemove?: (id: string) => void;
    onHeightChange?: (val: number) => void;
}

const PersonBar: React.FC<PersonBarProps> = ({ person, scale, onEditRequest, onRemove, onHeightChange }) => {
    const { unitSystem } = useUnitStore();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(person.heightCm.toString());

    React.useEffect(() => {
        setInputValue(person.heightCm.toString());
    }, [person.heightCm]);

    const submitHeight = () => {
        const val = parseFloat(inputValue);
        if (!isNaN(val) && val > 0 && onHeightChange) {
            onHeightChange(val);
        } else {
            setInputValue(person.heightCm.toString());
        }
    };

    const handleBlur = () => submitHeight();
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            submitHeight();
            (e.target as HTMLElement).blur();
        }
    };

    // Total silhouette height in pixels
    const barHeightPx = person.heightCm * scale;

    // Head/Body proportions ensuring total = barHeightPx exactly
    const headDiameter = barHeightPx * 0.15;
    const bodyHeight = barHeightPx - headDiameter;

    const totalInches = Math.round(Math.abs(person.heightCm * 0.393701));
    const ftValue = Math.floor(totalInches / 12);
    const inValue = totalInches % 12;
    const ftDisplay = `${person.heightCm < 0 ? '-' : ''}${ftValue}' ${inValue}''`;

    const springConfig = { type: 'spring' as const, stiffness: 220, damping: 28 };

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={springConfig}
            className="relative group pointer-events-auto shrink-0 h-full"
            style={{ width: 'clamp(100px, 18vw, 150px)' }}
            onClick={() => {
                if (window.innerWidth < 768) {
                    setIsMenuOpen(!isMenuOpen);
                }
            }}
        >
            {/* Stacked Labels - Matching the exact reference image */}
            <div
                className={`flex flex-col items-center justify-center rounded-2xl bg-surface/80 backdrop-blur-md border border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-4 py-2.5 text-center pointer-events-none transition-all duration-500 ${isMenuOpen ? 'border-accent/60 bg-surface' : 'group-hover:border-accent/40'}`}
                style={{
                    position: 'absolute',
                    bottom: `${barHeightPx + 80}px`,
                    width: 'clamp(115px, 28vw, 160px)',
                    zIndex: 30
                }}
            >
                {/* Hover/Tap Action Menu */}
                <div
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-300 pointer-events-auto hide-on-export
                        ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 md:scale-75 md:group-hover:opacity-100 md:group-hover:scale-100'}
                    `}
                >
                    {onEditRequest && (
                        <button onClick={(e) => { e.stopPropagation(); onEditRequest(person.id); }} className="w-10 h-10 rounded-full bg-accent hover:bg-accent-secondary flex items-center justify-center shadow-xl text-white transition-all active:scale-90">
                            <Edit2 size={16} strokeWidth={3} />
                        </button>
                    )}
                    {onRemove && (
                        <button onClick={(e) => { e.stopPropagation(); onRemove(person.id); }} className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center shadow-xl text-white transition-all active:scale-90">
                            <Trash2 size={16} strokeWidth={3} />
                        </button>
                    )}
                </div>

                <span className="text-[10px] md:text-xs font-black uppercase text-[#3B82F6] mb-1">{person.name}</span>
                {unitSystem === 'metric' ? (
                    <span className="text-foreground text-[11px] md:text-sm font-bold">cm: {person.heightCm.toFixed(1)}</span>
                ) : (
                    <span className="text-foreground text-[11px] md:text-sm font-bold">ft: {ftDisplay}</span>
                )}
            </div>

            {/* Absolute Coordinate Wrapper */}
            <div className="absolute inset-x-0 bottom-[60px] flex flex-col items-center justify-end">
                {/* Indicator Line - Exactly at Height Line */}
                <div
                    className="w-24 md:w-36 h-[1.5px] bg-foreground/20 group-hover:bg-accent/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500 absolute"
                    style={{
                        bottom: `${barHeightPx}px`,
                        zIndex: 20
                    }}
                />

                {/* Silhouette - Optimized for zero-error alignment */}
                <div className="flex flex-col items-center justify-end relative transition-opacity group-hover:opacity-100" style={{ height: barHeightPx }}>
                    {person.imgUrl ? (
                        <motion.img
                            layout
                            src={person.imgUrl}
                            alt={person.name}
                            className="object-contain w-full h-full pointer-events-none drop-shadow-2xl"
                            style={{ height: barHeightPx }}
                            transition={springConfig}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-end h-full opacity-100 group-hover:opacity-100 transition-all duration-500">
                            {/* Head */}
                            <motion.div
                                layout
                                className="rounded-full shadow-2xl z-10"
                                style={{
                                    width: `${headDiameter}px`,
                                    height: `${headDiameter}px`,
                                    backgroundColor: person.color || '#6366F1',
                                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)`
                                }}
                                transition={springConfig}
                                animate={{ width: headDiameter, height: headDiameter }}
                            />

                            {/* Body */}
                            <motion.div
                                layout
                                className="rounded-t-[2rem] sm:rounded-t-[3.5rem] shadow-2xl relative z-10 overflow-hidden"
                                style={{
                                    width: `${headDiameter * 2.2}px`,
                                    backgroundColor: person.color || '#6366F1',
                                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 20%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.2) 100%)`
                                }}
                                animate={{ height: bodyHeight }}
                                transition={springConfig}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Inline Edit & Delete (Below Ruler Zero Line) */}
            <div className="absolute inset-x-0 bottom-0 h-[65px] flex items-center justify-center pointer-events-auto hide-on-export">
                <div className="flex items-center gap-1.5 bg-surface/90 border border-border/60 rounded-lg px-2.5 py-1.5 focus-within:border-accent/60 backdrop-blur-md shadow-2xl transition-all group-hover:border-accent/50 opacity-100 group-hover:opacity-100 ring-1 ring-white/5">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-12 bg-transparent text-[13px] font-mono font-black text-center text-foreground focus:outline-none"
                    />
                    <span className="text-[10px] font-mono font-black text-muted uppercase tracking-tighter">cm</span>
                    {onRemove && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove(person.id); }}
                            className="ml-1 p-1 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all active:scale-95"
                            title="Remove"
                        >
                            <Trash2 size={14} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PersonBar;
