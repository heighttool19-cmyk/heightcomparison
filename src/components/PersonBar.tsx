'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Person } from '../types';
import { useUnitStore } from '../store';
import { handleInputChange } from '../utils/input';

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
    const [inputValue, setInputValue] = React.useState<number | ''>(person.heightCm);
    const [imageAspectRatio, setImageAspectRatio] = React.useState<number | null>(null);

    const handleImageLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (img.naturalHeight > 0) {
            setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        }
    }, []);

    React.useEffect(() => {
        setInputValue(person.heightCm);
    }, [person.heightCm]);

    const submitHeight = () => {
        const val = Number(inputValue);
        if (!isNaN(val) && val > 0 && onHeightChange) {
            onHeightChange(val);
        } else {
            setInputValue(person.heightCm);
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
    const negative = person.heightCm < 0 ? '-' : '';
    // For very tall objects, show feet only (no inches) for brevity
    const ftDisplay = ftValue >= 1000
        ? `${negative}${ftValue.toLocaleString()} ft`
        : `${negative}${ftValue}' ${inValue}''`;
    const ftDisplayShort = ftValue >= 1000
        ? `${negative}${ftValue.toLocaleString()}ft`
        : `${negative}${ftValue}'${inValue}"`;

    // For metric: switch to metres above 10m (1000cm)
    const isTall = person.heightCm >= 1000;
    const metricDisplay = isTall
        ? `${(person.heightCm / 100).toFixed(person.heightCm % 100 === 0 ? 0 : 1)} m`
        : `${Math.round(person.heightCm)} cm`;
    const metricDisplayShort = isTall
        ? `${(person.heightCm / 100 % 1 === 0 ? (person.heightCm / 100).toFixed(0) : (person.heightCm / 100).toFixed(1))}m`
        : `${Math.round(person.heightCm)}cm`;

    const springConfig = { type: 'spring' as const, stiffness: 220, damping: 28 };

    // Dynamic width calculation for true 2D zoom
    const baseWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 120;
    // const containerWidth = Math.max(50, baseWidth * zoom);
    const containerWidth = zoom < 0.3 ? Math.max(30, baseWidth * zoom * 0.3)
        : Math.max(50, baseWidth * zoom);

    // CRITICAL: The name label uses a different scale logic at low zoom (min 0.6)
    const nameScale = zoom < 0.8 ? Math.max(0.4, zoom + 0.1) : 1;
    const nameWidth = (person.name.length * 8.5 + 24) * nameScale;
    const mobile = (typeof window !== 'undefined' && window.innerWidth < 768);

    // For image persons: compute width from natural aspect ratio
    const effectiveWidth = person.imgUrl && imageAspectRatio
        ? Math.max(60, Math.round(barHeightPx * imageAspectRatio))
        : mobile ? ((Math.max(containerWidth, nameWidth)) / 1) : Math.max(containerWidth, nameWidth);

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={springConfig}
            className="relative group pointer-events-auto shrink-0 h-full flex flex-col items-center justify-end cursor-pointer"
            style={{ width: `${effectiveWidth}px` }}
            onClick={() => {
                if (window.innerWidth < 768) {
                    setIsMenuOpen(!isMenuOpen);
                } else if (onEditRequest) {
                    onEditRequest(person.id);
                }
            }}
        >
            {/* Persistent Top Label - Responsive Scaling (Current Style) */}
            <div
                className="absolute left-1/2 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 z-30 text-center"
                style={{
                    bottom: `${barHeightPx + 68}px`,
                    width: 'max-content',
                    transform: `translateX(-50%) scale(${zoom < 0.8 ? Math.max(0.3, zoom * 1.1) : Math.min(1.1, zoom * 0.8)})`,
                    transformOrigin: 'bottom'
                }}
            >
                <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider whitespace-nowrap text-center drop-shadow-sm max-w-[140px]   px-1">
                    {person.name}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-accent tracking-tighter whitespace-nowrap leading-tight mt-0.5 bg-bg/40 backdrop-blur-sm rounded px-1 text-center">
                    {unitSystem === 'metric' ? metricDisplayShort : `${ftDisplayShort} ft`}
                </span>
            </div>

            {/* Hover Detail Card - Appears on hover/tap (Current Style) */}
            <div
                className={`
                    flex flex-col items-center justify-center text-center pointer-events-none
                    absolute left-1/2 -translate-x-1/2
                    bg-surface/98 backdrop-blur-xl border-2 border-accent/20 rounded-2xl
                    px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
                    transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${(isMenuOpen || !readOnly) ? 'z-50' : 'z-40'}
                    opacity-0 scale-50 translate-y-4
                    group-hover:opacity-100 group-hover:scale-110 group-hover:translate-y-0
                    ${isMenuOpen ? 'opacity-100 scale-110 translate-y-0' : ''}
                `}
                style={{
                    bottom: `${barHeightPx + 65}px`,
                    width: 'max-content',
                    minWidth: '100px',
                    transformOrigin: 'bottom center'
                }}
            >
                {/* Person Name - Detailed */}
                <span className="text-xs font-black text-foreground uppercase tracking-tight whitespace-nowrap leading-tight mb-1 border-b border-border/50 pb-1 w-full text-center">
                    {person.name}
                </span>

                {/* Height Stats */}
                <div className="flex flex-col items-center text-center">
                    <span className="text-sm font-black text-accent whitespace-nowrap leading-none">
                        {unitSystem === 'metric' ? metricDisplay : ftDisplay}
                    </span>
                    <span className="text-[11px] font-bold text-muted whitespace-nowrap leading-tight mt-1 opacity-80">
                        {unitSystem === 'metric' ? ftDisplay : metricDisplay}
                    </span>
                </div>

                {/* Action buttons inside the card */}
                {!readOnly && (
                    <div className="flex items-center gap-3 mt-3 pointer-events-auto w-full justify-center">
                        {onEditRequest && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onEditRequest(person.id); }}
                                className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-white flex items-center justify-center transition-all active:scale-90 border border-accent/30 shadow-sm"
                                aria-label={`Edit ${person.name}`}
                            >
                                <Edit2 size={14} strokeWidth={2.5} />
                            </button>
                        )}
                        {onRemove && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove(person.id); }}
                                className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all active:scale-90 border border-red-500/30 shadow-sm"
                                aria-label={`Remove ${person.name}`}
                            >
                                <Trash2 size={14} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Silhouette Area - Aligned at 60px baseline - From User Snippet */}
            <div className="absolute inset-x-0 bottom-[60px] flex flex-col items-center justify-end overflow-visible">
                {/* Indicator Line - Neon Line at Height Boundary */}
                <div
                    className=" h-[1px] absolute transition-all duration-500 neon-indicator group-hover:brightness-150"
                    style={{
                        width: `${containerWidth * 0.8}px`,
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
                            <div className="relative z-20 h-full w-auto">
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

            {/* Bottom Label: Name + Height - Responsive and robust (Current Style) */}
            <div
                className="absolute left-1/2 bottom-0 h-[60px] flex flex-col items-center justify-center gap-0 pointer-events-auto hide-on-export"
                style={{
                    width: 'max-content',
                    transform: `translateX(-50%) scale(${zoom < 0.8 ? Math.max(0.35, zoom * 1.1) : Math.min(1.2, zoom)})`,
                    transformOrigin: 'top center'
                }}
            >
                <span className="text-[12px] font-black text-foreground/70 uppercase tracking-tight whitespace-nowrap text-center px-1 max-w-[120px]  "
                    style={{ lineHeight: 1.1 }}>
                    {person.name}
                </span>

                {readOnly ? (
                    <div className="flex items-center gap-1.5 bg-surface/50 border border-border/40 rounded-xl px-4 py-1.5 backdrop-blur-md shadow-sm transition-all">
                        <span className="text-xs sm:text-[13px] font-mono font-black text-foreground whitespace-nowrap">
                            {unitSystem === 'metric'
                                ? metricDisplay
                                : ftDisplay
                            }
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 bg-surface border border-border/60 rounded-xl px-1.5 py-0.5 focus-within:border-accent/60 backdrop-blur-md shadow-sm transition-all group-hover:border-accent/50 ring-1 ring-black/5 dark:ring-white/5">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => handleInputChange(e, setInputValue)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-6 sm:w-8 bg-transparent text-xs sm:text-[13px] font-mono font-black text-center text-foreground focus:outline-none"
                        />
                        <span className="text-[11px] sm:text-[10px] font-mono font-black text-muted uppercase tracking-tighter">cm</span>
                        {/* {onRemove && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove(person.id); }}
                                className="ml-1 p-1 text-muted hover:text-red-500 hover:bg-red-400 rounded-md transition-all active:scale-95"
                                title="Remove"
                            >
                                <Trash2 size={14} strokeWidth={2.5} />
                            </button>
                        )} */}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PersonBar;
