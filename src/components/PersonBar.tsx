'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Person } from '../types';
import { useUnitStore } from '../store';

interface PersonBarProps {
    person: Person;
    scale: number;
    zoom: number;
    onEditRequest?: (id: string) => void;
    onRemove?: (id: string) => void;
    onHeightChange?: (val: number) => void;
    readOnly?: boolean;
}

const PersonBar: React.FC<PersonBarProps> = ({ person, scale, zoom, onEditRequest, onRemove, onHeightChange, readOnly }) => {
    const { unitSystem } = useUnitStore();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(person.heightCm.toString());
    const [imageAspectRatio, setImageAspectRatio] = React.useState<number | null>(null);

    const handleImageLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (img.naturalHeight > 0) {
            setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        }
    }, []);

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

    // Dynamic width calculation for true 2D zoom
    const baseWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 120;
    const containerWidth = Math.max(65, baseWidth * zoom);

    // For image persons: compute width from natural aspect ratio so image fills its bar properly
    const effectiveWidth = person.imgUrl && imageAspectRatio
        ? Math.max(60, Math.round(barHeightPx * imageAspectRatio))
        : containerWidth;

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={springConfig}
            className="relative group pointer-events-auto shrink-0 h-full flex flex-col items-center justify-end"
            style={{ width: `${effectiveWidth}px` }}
            onClick={() => {
                if (window.innerWidth < 768) {
                    setIsMenuOpen(!isMenuOpen);
                }
            }}
        >
            {/* Stacked Labels - Matching the exact reference image */}
            <div
                className={`flex flex-col items-center justify-center rounded-[1rem] bg-surface/90 backdrop-blur-md border border-border/50 shadow-premium px-1 py-1.5 md:py-2 text-center pointer-events-none transition-all duration-500 ${isMenuOpen ? 'border-accent/60 bg-surface' : 'group-hover:border-accent/40'}`}
                style={{
                    position: 'absolute',
                    bottom: `${barHeightPx + (60 * Math.min(1, zoom)) + 20}px`,
                    width: '100%',
                    zIndex: 30,
                    transform: `scale(${Math.min(1, Math.max(0.65, zoom + 0.1))})`,
                    transformOrigin: 'bottom center'
                }}
            >
                {/* Hover/Tap Action Menu */}
                {!readOnly && (
                    <div
                        className={`absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-300 pointer-events-auto hide-on-export
                        ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 md:scale-75 md:group-hover:opacity-100 md:group-hover:scale-100'}
                    `}
                    >
                        {onEditRequest && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onEditRequest(person.id); }}
                                className="w-10 h-10 rounded-full bg-accent hover:bg-accent-secondary flex items-center justify-center shadow-xl text-white transition-all active:scale-90"
                                aria-label={`Edit ${person.name}`}
                            >
                                <Edit2 size={16} strokeWidth={3} />
                            </button>
                        )}
                        {onRemove && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove(person.id); }}
                                className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center shadow-xl text-white transition-all active:scale-90"
                                aria-label={`Remove ${person.name}`}
                            >
                                <Trash2 size={16} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                )}
                {unitSystem === 'metric' ? (
                    <span className="text-foreground text-[10px] md:text-[13px] font-bold w-full truncate px-1">cm: {person.heightCm.toFixed(1)}</span>
                ) : (
                    <span className="text-foreground text-[10px] md:text-[13px] font-bold w-full truncate px-1">ft: {ftDisplay}</span>
                )}
            </div>

            {/* Absolute Coordinate Wrapper */}
            <div className="absolute inset-x-0 bottom-[60px] flex flex-col items-center justify-end">
                {/* Indicator Line - Exactly at Height Line */}
                <div
                    className="w-[104%] h-[1px] absolute transition-all duration-500 neon-indicator group-hover:brightness-150"
                    style={{
                        bottom: `${barHeightPx}px`,
                        zIndex: 20
                    }}
                />
                {/* Silhouette - Clipped to exact height boundary */}
                <div
                    className="flex flex-col items-center justify-end relative transition-opacity group-hover:opacity-100"
                    style={{ height: barHeightPx, overflow: 'hidden' }}
                >
                    {person.imgUrl ? (
                        <motion.div
                            layout
                            className="relative flex flex-col items-center justify-end object-contain"
                            style={{ height: barHeightPx }}
                            transition={springConfig}
                        >
                            {/* Proportional Full-Height Image */}
                            <div className="relative z-20 h-full w-auto">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={person.imgUrl}
                                    alt={person.name}
                                    onLoad={handleImageLoad}
                                    style={{ height: `${barHeightPx}px`, width: 'auto', objectFit: 'contain', display: 'block' }}
                                    className="drop-shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    ) : person.isEntity ? (
                        <motion.div
                            layout
                            className="rounded-t-3xl shadow-2xl relative z-10"
                            style={{
                                width: `${Math.max(40, containerWidth * 0.6)}px`,
                                height: barHeightPx,
                                backgroundColor: person.color || '#6366F1',
                                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 20%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.2) 100%)`
                            }}
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

            {/* Inline Name, Edit & Delete (Below Ruler Zero Line) */}
            <div
                className="absolute inset-x-0 bottom-0 h-[65px] flex flex-col items-center justify-center gap-0 pointer-events-auto hide-on-export"
                style={{
                    transform: `scale(${zoom < 0.8 ? Math.max(0.7, zoom + 0.3) : 1})`,
                    transformOrigin: 'top center'
                }}
            >
                <span className="text-[12px] font-black text-foreground/70 uppercase tracking-tight truncate w-full text-center px-1"
                    style={{ lineHeight: 1.1 }}>
                    {person.name}
                </span>

                {readOnly ? (
                    <div className="flex items-center gap-1.5 bg-surface/50 border border-border/40 rounded-xl px-4 py-1.5 backdrop-blur-md shadow-sm mt-1 transition-all">
                        <span className="text-xs sm:text-[13px] font-mono font-black text-foreground whitespace-nowrap">
                            {unitSystem === 'metric'
                                ? `${person.heightCm.toFixed(1)} cm`
                                : ftDisplay
                            }
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 bg-surface border border-border/60 rounded-xl px-1.5 py-0.5 focus-within:border-accent/60 backdrop-blur-md shadow-sm transition-all group-hover:border-accent/50 ring-1 ring-black/5 dark:ring-white/5 mt-1">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-8 sm:w-12 bg-transparent text-xs sm:text-[13px] font-mono font-black text-center text-foreground focus:outline-none"
                        />
                        <span className="text-[11px] sm:text-[10px] font-mono font-black text-muted uppercase tracking-tighter">cm</span>
                        {onRemove && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove(person.id); }}
                                className="ml-1 p-1 text-muted hover:text-red-500 hover:bg-red-400 rounded-md transition-all active:scale-95"
                                title="Remove"
                            >
                                <Trash2 size={14} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PersonBar;
