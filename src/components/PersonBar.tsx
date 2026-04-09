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
    canvasHeight?: number;
    isActiveMenu?: boolean;
    onSetActiveMenu?: (active: boolean) => void;
    index?: number;
}

const PersonBar: React.FC<PersonBarProps> = React.memo(({ person, scale, zoom, onEditRequest, onRemove, readOnly, canvasHeight, isActiveMenu, onSetActiveMenu }) => {
    const { unitSystem } = useUnitStore();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [imageAspectRatio, setImageAspectRatio] = React.useState<number | null>(null);

    const handleImageLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (img.naturalHeight > 0) {
            setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        }
    }, []);

    // Total silhouette height in pixels
    const rawBarHeightPx = person.heightCm * scale;
    const barHeightPx = Number.isFinite(rawBarHeightPx) ? rawBarHeightPx : 0;

    // Head/Body proportions ensuring total = barHeightPx exactly
    const headDiameter = barHeightPx * 0.15;
    const bodyHeight = barHeightPx - (headDiameter);

    const totalInches = Math.round(Math.abs(person.heightCm * 0.393701));
    const ftValue = Math.floor(totalInches / 12);
    const inValue = totalInches % 12;
    const negative = person.heightCm < 0 ? '-' : '';
    const ftDisplay = ftValue >= 1000
        ? `${negative}${ftValue.toLocaleString()} ft`
        : `${negative}${ftValue}' ${inValue}''`;
    const ftDisplayShort = ftValue >= 1000
        ? `${negative}${ftValue.toLocaleString()}ft`
        : `${negative}${ftValue}'${inValue}"`;

    const isTall = person.heightCm >= 1000;
    const metricDisplay = isTall
        ? `${(person.heightCm / 100).toFixed(person.heightCm % 100 === 0 ? 0 : 2)} m`
        : `${Math.round(person.heightCm)} cm`;
    const metricDisplayShort = isTall
        ? `${(person.heightCm / 100).toFixed(person.heightCm % 100 === 0 ? 0 : 2)}m`
        : `${Math.round(person.heightCm)}cm`;

    const springConfig = { type: 'spring' as const, stiffness: 220, damping: 28 };

    // nameScale handles zoom-level adjustments
    const nameScale = Math.max(0.3, Math.min(1, zoom * 1.4));
    const showLabels = zoom >= 0.08;
    const mobile = (typeof window !== 'undefined' && window.innerWidth < 768);

    const headDiameterBase = headDiameter;
    const silhouetteWidth = headDiameterBase * 2.2;
    const horizontalSwayFactor = (imageAspectRatio && imageAspectRatio > 1) ? imageAspectRatio : 1;
    const maxEntityWidth = 800 * horizontalSwayFactor;

    const baseEffectiveWidth = person.imgUrl && imageAspectRatio
        ? Math.max(5, Math.round(barHeightPx * imageAspectRatio))
        : Math.max(5, silhouetteWidth);

    const rawEffectiveWidth = (person.isEntity || person.heightCm > 500)
        ? Math.min(maxEntityWidth, baseEffectiveWidth)
        : baseEffectiveWidth;
    const minClickableWidth = mobile ? (person.isEntity ? 25 : 12) : 15;
    const rawCalcWidth = Math.max(minClickableWidth, rawEffectiveWidth);
    const effectiveWidth = Number.isFinite(rawCalcWidth) ? rawCalcWidth : (mobile ? 40 : 120);

    const safeCanvasHeight = canvasHeight || (typeof window !== 'undefined' ? window.innerHeight : 800);
    const tooltipBottomRaw = barHeightPx + (mobile ? 45 : 12);
    const maxTooltipBottom = safeCanvasHeight - 180;
    const tooltipBottom = Math.min(tooltipBottomRaw, maxTooltipBottom);

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0, width: effectiveWidth }}
            exit={{ opacity: 0, x: -60 }}
            whileHover={{ zIndex: 110 }}
            transition={springConfig}
            className="relative group pointer-events-auto shrink-0 h-full flex flex-col items-center justify-end"
            style={{
                width: `${effectiveWidth}px`,
                zIndex: (isMenuOpen || isActiveMenu) ? 100 : (person.isEntity ? 10 : 20),
                touchAction: 'auto',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            {/* Hover Detail Card */}
            <div
                className={`
                    absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-end
                    transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${(isMenuOpen || isActiveMenu) ? 'z-[110] opacity-100 scale-110 translate-y-0 pointer-events-auto' : 'z-40 opacity-0 scale-50 translate-y-4 pointer-events-none'}
                    group-hover:opacity-100 group-hover:scale-110 group-hover:translate-y-0 group-hover:pointer-events-auto
                `}
                style={{
                    bottom: `${Math.min(barHeightPx, maxTooltipBottom)}px`,
                    width: 'max-content',
                    minWidth: '100px',
                    paddingBottom: `${Math.max(0, tooltipBottom - barHeightPx)}px`,
                    transformOrigin: 'bottom center'
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center justify-center text-center bg-surface/98 backdrop-blur-xl border-2 border-accent/20 rounded-2xl px-2 py-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-full">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-tight whitespace-nowrap leading-tight mb-1 border-b border-border/50 pb-1 w-full text-center">
                        {person.name}
                    </span>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-sm font-black text-accent whitespace-nowrap leading-none">
                            {unitSystem === 'metric' ? metricDisplay : ftDisplay}
                        </span>
                        <span className="text-[11px] font-bold text-muted whitespace-nowrap leading-tight mt-1 opacity-80">
                            {unitSystem === 'metric' ? ftDisplay : metricDisplay}
                        </span>
                    </div>
                    {!readOnly && (
                        <div className="flex items-center gap-3 mt-3 w-full justify-center">
                            {onEditRequest && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEditRequest(person.id); }}
                                    className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-white flex items-center justify-center transition-all active:scale-90 border border-accent/30 shadow-sm cursor-pointer"
                                    style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                                    aria-label={`Edit ${person.name}`}
                                >
                                    <Edit2 size={14} strokeWidth={2.5} />
                                </button>
                            )}
                            {onRemove && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); onRemove(person.id); }}
                                    className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all active:scale-90 border border-red-500/30 shadow-sm cursor-pointer"
                                    style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                                    aria-label={`Remove ${person.name}`}
                                >
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Silhouette Area */}
            <div
                className="inset-x-0 flex flex-col items-center justify-end overflow-visible pb-0 cursor-pointer"
                style={{
                    height: 'max-content',
                    minHeight: barHeightPx,
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (window.innerWidth < 768) {
                        if (onSetActiveMenu) {
                            onSetActiveMenu(!isActiveMenu);
                        } else {
                            setIsMenuOpen(!isMenuOpen);
                        }
                    } else if (onEditRequest) {
                        onEditRequest(person.id);
                    }
                }}
            >
                {/* Persistent Top Label */}
                {showLabels && (
                    <div
                        className=" flex flex-col items-center justify-center pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 z-30 "
                        style={{
                            bottom: `${barHeightPx + 4}px`,
                            width: `${effectiveWidth}px`,
                            transformOrigin: 'bottom'
                        }}
                    >
                        {/* Name - Refined height-based scaling with a legible floor, dynamically fitted to width */}
                        <span className="font-black  uppercase  leading-none whitespace-nowrap drop-shadow-md w-full"
                            style={{
                                fontSize: `${Math.max(10, Math.min(20, 8 * Math.pow(person.heightCm / 170, 0.35)))}px`,
                                // Calculate fit scale: shrink more for long names or narrow bars
                                transform: `scale(${Math.max(0.25, nameScale * 0.48 * Math.min(1, (effectiveWidth * 0.9) / (person.name.length * 8)))})`,
                                width: '100%',
                                transformOrigin: 'center',
                            }}
                        >
                            {person.name}
                        </span>

                        {/* Measurement - Standard scaling for readability, dynamically fitted to width */}
                        <span className="text-[11px] font-black text-accent tracking-tighter whitespace-nowrap leading-none mt-1.5  rounded  py-0.5   w-full"
                            style={{
                                transform: `scale(${Math.max(0.35, nameScale * Math.min(1, (effectiveWidth * 0.85) / (metricDisplayShort.length * 8)))})`,
                                maxWidth: '100%',
                            }}>
                            {unitSystem === 'metric' ? metricDisplayShort : `${ftDisplayShort} ft`}
                        </span>
                    </div>
                )}

                {/* Indicator Line */}
                <motion.div
                    animate={{ width: effectiveWidth }}
                    className="absolute h-[1px] neon-indicator group-hover:brightness-150 "
                    transition={springConfig}
                    style={{
                        bottom: `${barHeightPx}px`,
                        zIndex: 25
                    }}
                />

                {/* Silhouette */}
                <div
                    className="flex flex-col items-center justify-end relative transition-opacity group-hover:opacity-100"
                    style={{
                        height: barHeightPx,
                        overflow: 'visible',
                        zIndex: 10
                    }}
                >
                    {person.imgUrl ? (
                        <motion.div
                            layout
                            className="relative flex flex-col items-center justify-end"
                            style={{ height: barHeightPx, width: '100%' }}
                            animate={{ y: person.offsetY || 0 }}
                            transition={springConfig}
                        >
                            <div className="relative z-20 h-full w-auto">
                                <motion.img
                                    src={person.imgUrl}
                                    alt={person.name}
                                    onLoad={handleImageLoad}
                                    animate={{ height: barHeightPx }}
                                    transition={springConfig}
                                    style={{ width: '100%', height: barHeightPx, objectFit: 'contain', display: 'block', objectPosition: 'bottom' }}
                                    className="drop-shadow-md"
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex flex-col items-center justify-end h-full opacity-100 group-hover:opacity-100 transition-all duration-500"
                            animate={{ y: person.offsetY || 0 }}
                            transition={springConfig}
                        >
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
                            <motion.div
                                layout
                                className="rounded-t-[2rem] sm:rounded-t-[3.5rem] shadow-2xl relative z-10 overflow-hidden"
                                style={{
                                    backgroundColor: person.color || '#6366F1',
                                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 20%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.2) 100%)`
                                }}
                                animate={{ height: bodyHeight, width: effectiveWidth }}
                                transition={springConfig}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
});

PersonBar.displayName = 'PersonBar';

export default PersonBar;
