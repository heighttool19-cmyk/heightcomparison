'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Person } from '../types';
import { useUnitStore } from '../store';

// ─────────────────────────────────────────────────────────────────────────────
// SIZING  (must stay in sync with HeightDashboard constants)
//
//   barHeightPx  = heightCm * finalScale
//   barWidthPx   = barHeightPx * WIDTH_RATIO        (silhouette)
//   headDiameter = barHeightPx * HEAD_RATIO
//   bodyHeight   = barHeightPx - headDiameter
//
// For image persons: width = barHeightPx * imageAspectRatio (capped 800px)
//
// NAME LABEL CLIPPING FIX:
//   The name+measurement label sits ABOVE the bar top.
//   The parent .h-full container clips it if overflow:hidden.
//   Fix: labels use position:absolute with bottom > barH, and the
//   wrapper div has overflow:visible so labels protrude upward freely.
//   The canvasHeight in HeightDashboard already reserves headExtra + TOP_PAD
//   above the tallest bar, so there is always room.
// ─────────────────────────────────────────────────────────────────────────────

const WIDTH_RATIO = 0.34;
const HEAD_RATIO = 0.15;   // must match HeightDashboard's HEAD_RATIO

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
    personCount?: number;
}

const PersonBar: React.FC<PersonBarProps> = React.memo(({
    person, scale, zoom, onEditRequest, onRemove,
    readOnly, canvasHeight, isActiveMenu, onSetActiveMenu,
    personCount = 0,
}) => {
    const { unitSystem } = useUnitStore();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [imageAspectRatio, setImageAspectRatio] = React.useState<number | null>(null);

    const handleImageLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (img.naturalHeight > 0) setImageAspectRatio(img.naturalWidth / img.naturalHeight);
    }, []);

    // ── Pixel geometry ────────────────────────────────────────────────────────
    const barH = Math.max(0, Number.isFinite(person.heightCm * scale) ? person.heightCm * scale : 0);
    const headD = barH * HEAD_RATIO;
    const bodyH = Math.max(0, barH - headD);

    // ── Effective width ───────────────────────────────────────────────────────
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const minW = isMobile ? (person.isEntity ? 20 : 10) : 12;

    let effectiveW: number;
    if (person.imgUrl && imageAspectRatio !== null) {
        effectiveW = Math.min(800, Math.max(minW, barH * imageAspectRatio));
    } else {
        effectiveW = Math.max(minW, barH * WIDTH_RATIO);
    }
    if (!Number.isFinite(effectiveW) || effectiveW <= 0) effectiveW = minW;

    // ── Height display strings ────────────────────────────────────────────────
    const isTall = person.heightCm >= 1000;
    const metricFull = isTall
        ? `${(person.heightCm / 100).toFixed(person.heightCm % 100 === 0 ? 0 : 2)} m`
        : `${Math.round(person.heightCm)} cm`;
    const metricShort = isTall
        ? `${(person.heightCm / 100).toFixed(person.heightCm % 100 === 0 ? 0 : 2)}m`
        : `${Math.round(person.heightCm)}cm`;

    const totalIn = Math.round(Math.abs(person.heightCm) * 0.393701);
    const ft = Math.floor(totalIn / 12);
    const inch = totalIn % 12;
    const neg = person.heightCm < 0 ? '-' : '';
    const ftFull = ft >= 1000 ? `${neg}${ft.toLocaleString()} ft` : `${neg}${ft}' ${inch}''`;
    const ftShort = ft >= 1000 ? `${neg}${ft.toLocaleString()}ft` : `${neg}${ft}'${inch}"`;

    // ── Font size: proportional to bar width, clamped to readable range ───────
    // const showLabel = barH > 10 && zoom >= 0.01;
    const showLabel = true;
    // FIX: Dynamic font scaling based on string length.
    // A bold, uppercase character takes up roughly 65-70% of its font size in width.
    const charWidthFactor = 0.70;
    const maxFontSizeForLength = effectiveW / (Math.max(1, person.name.length) * charWidthFactor);

    // Dynamic threshold for "low count"
    const threshold = isMobile ? 5 : 7;
    const isLowCount = personCount > 0 && personCount <= threshold;

    // Scaling factors: be more generous if personCount is low
    const propScale = isLowCount ? 0.13 : 0.09;
    const maxBaseSize = isLowCount ? 21 : 18;
    const minBaseSize = isLowCount ? 0.8 : 0;

    // Take the smallest of: absolute max, proportional max, or our length-based max
    const fontSize = Math.max(minBaseSize, Math.min(maxBaseSize, effectiveW * propScale, maxFontSizeForLength));

    const spring = { type: 'spring' as const, stiffness: 220, damping: 28 };

    // ── Tooltip bottom anchor ─────────────────────────────────────────────────
    const safeVpH = canvasHeight || 600;
    const tipBottom = Math.min(barH + (isMobile ? 45 : 12), safeVpH - 180);

    return (
        /*
         * OUTER WRAPPER
         * overflow:visible is CRITICAL — the name label and head circle must
         * be able to protrude above the bar height without clipping.
         * The h-full makes it span the full canvas height so bars anchor to bottom.
         */
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0, width: effectiveW }}
            exit={{ opacity: 0, x: -60 }}
            whileHover={{ zIndex: 110 }}
            transition={spring}
            className="relative group pointer-events-auto shrink-0 h-full flex flex-col items-center justify-end"
            style={{
                width: `${effectiveW}px`,
                overflow: 'visible',          // ← allows head/label to protrude above
                zIndex: (isMenuOpen || isActiveMenu) ? 100 : (person.isEntity ? 10 : 20),
                touchAction: 'auto',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            {/* ── Hover / tap tooltip ──────────────────────────────────────── */}
            <div
                className={`
                    absolute left-1/2 -translate-x-1/2
                    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${(isMenuOpen || isActiveMenu)
                        ? 'z-[110] opacity-100 scale-110 translate-y-0 pointer-events-auto'
                        : 'z-40 opacity-0 scale-50 translate-y-4 pointer-events-none'}
                    group-hover:opacity-100 group-hover:scale-110 group-hover:translate-y-0 group-hover:pointer-events-auto
                `}
                style={{
                    bottom: `${Math.min(barH, safeVpH - 180)}px`,
                    width: 'max-content',
                    minWidth: '100px',
                    paddingBottom: `${Math.max(0, tipBottom - barH)}px`,
                    transformOrigin: 'bottom center',
                }}
                onPointerDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center bg-surface/98 backdrop-blur-xl border-2 border-accent/20 rounded-2xl px-3 py-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-tight whitespace-nowrap leading-tight mb-1 border-b border-border/50 pb-1 w-full text-center">
                        {person.name}
                    </span>
                    <span className="text-sm font-black text-accent whitespace-nowrap leading-none">
                        {unitSystem === 'metric' ? metricFull : ftFull}
                    </span>
                    <span className="text-[11px] font-bold text-muted whitespace-nowrap leading-tight mt-0.5 opacity-80">
                        {unitSystem === 'metric' ? ftFull : metricFull}
                    </span>
                    {!readOnly && (
                        <div className="flex items-center gap-3 mt-2 w-full justify-center">
                            {onEditRequest && (
                                <button
                                    onClick={e => { e.stopPropagation(); e.preventDefault(); onEditRequest(person.id); }}
                                    className="w-8 h-8 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-white flex items-center justify-center transition-all active:scale-90 border border-accent/30 cursor-pointer"
                                    style={{ touchAction: 'manipulation' }}
                                    aria-label={`Edit ${person.name}`}
                                >
                                    <Edit2 size={14} strokeWidth={2.5} />
                                </button>
                            )}
                            {onRemove && (
                                <button
                                    onClick={e => { e.stopPropagation(); e.preventDefault(); onRemove(person.id); }}
                                    className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all active:scale-90 border border-red-500/30 cursor-pointer"
                                    style={{ touchAction: 'manipulation' }}
                                    aria-label={`Remove ${person.name}`}
                                >
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Clickable silhouette area ─────────────────────────────────── */}
            <div
                className="flex flex-col items-center justify-end cursor-pointer w-full"
                style={{
                    /*
                     * height = barH (just the body portion — matches the bar exactly).
                     * overflow: visible allows head+label to protrude above.
                     * The outer motion.div has h-full, so this div sits at the bottom.
                     */
                    height: `${barH}px`,
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: 10,
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                }}
                onClick={e => {
                    e.stopPropagation();
                    if (window.innerWidth < 768) {
                        onSetActiveMenu ? onSetActiveMenu(!isActiveMenu) : setIsMenuOpen(m => !m);
                    } else if (onEditRequest) {
                        onEditRequest(person.id);
                    }
                }}
            >
                {/* ── Name + measurement label (sits above bar, no clipping) ── */}
                {showLabel && (
                    <div
                        className="absolute flex flex-col items-center justify-end pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-95"
                        style={{
                            // Position label directly above the bar top (positive bottom = above bar)
                            bottom: `${barH + 4}px`,
                            left: 0,
                            width: `${effectiveW}px`,
                            transformOrigin: 'bottom center',
                            zIndex: 30,
                            overflow: 'visible',
                        }}
                    >
                        <span
                            className="font-black uppercase leading-none text-center w-full overflow-hidden   whitespace-nowrap drop-shadow-md"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            {person.name}
                        </span>
                        <span
                            className="font-black text-accent tracking-tighter whitespace-nowrap leading-none mt-1 text-center w-full"
                            style={{ fontSize: `${fontSize * 1.5}px` }}
                        >
                            {unitSystem === 'metric' ? metricShort : ftShort}
                        </span>
                    </div>
                )}

                {/* ── Height indicator line ────────────────────────────────── */}
                <motion.div
                    animate={{ width: effectiveW * 0.8 }}
                    className="absolute h-[1px] neon-indicator group-hover:brightness-150"
                    transition={spring}
                    style={{ bottom: `${barH}px`, zIndex: 25, }}
                />

                {/* ── Silhouette or image ──────────────────────────────────── */}
                {person.imgUrl ? (
                    // IMAGE PERSON
                    <motion.div
                        layout
                        className="relative flex flex-col items-center justify-end"
                        style={{ height: `${barH}px`, width: '100%', overflow: 'visible' }}
                        animate={{ y: person.offsetY || 0 }}
                        transition={spring}
                    >
                        <motion.img
                            src={person.imgUrl}
                            alt={person.name}
                            onLoad={handleImageLoad}
                            animate={{ height: barH }}
                            transition={spring}
                            style={{
                                width: '100%',
                                height: barH,
                                objectFit: 'contain',
                                display: 'block',
                                objectPosition: 'bottom',
                            }}
                            className="drop-shadow-md"
                        />
                    </motion.div>
                ) : (
                    // SILHOUETTE PERSON
                    <motion.div
                        className="flex flex-col items-center justify-end"
                        style={{ height: `${barH}px`, width: `${effectiveW}px`, overflow: 'visible' }}
                        animate={{ y: person.offsetY || 0 }}
                        transition={spring}
                    >
                        {/* Head — protrudes above body (overflow:visible handles this) */}
                        <motion.div
                            layout
                            className="rounded-full shadow-2xl"
                            style={{
                                width: `${headD}px`,
                                height: `${headD}px`,
                                flexShrink: 0,
                                backgroundColor: person.color || '#6366F1',
                                backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                                zIndex: 10,
                            }}
                            animate={{ width: headD, height: headD }}
                            transition={spring}
                        />
                        {/* Body */}
                        <motion.div
                            layout
                            className="rounded-t-[2rem] sm:rounded-t-[3.5rem] shadow-2xl relative overflow-hidden"
                            style={{
                                backgroundColor: person.color || '#6366F1',
                                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 20%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.2) 100%)',
                                zIndex: 10,
                            }}
                            animate={{ height: bodyH, width: effectiveW }}
                            transition={spring}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
});

PersonBar.displayName = 'PersonBar';
export default PersonBar;