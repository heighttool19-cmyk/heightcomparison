'use client';

import React, { useMemo } from 'react';
import { useUnitStore } from '../store';

interface RulerProps {
    scale: number;
    maxHeightCm: number;
    containerHeight?: number;
    personCount?: number;
    /** 'full' = labels+lines (legacy), 'labels' = only left label col, 'lines' = only horizontal lines */
    mode?: 'full' | 'labels' | 'lines';
    isFullscreen?: boolean;
}

const Ruler: React.FC<RulerProps> = React.memo(({ scale, maxHeightCm, containerHeight, personCount, mode = 'full', isFullscreen = false }) => {
    const { unitSystem } = useUnitStore();

    // 1. DYNAMIC EXACT INTERVAL (No forced clean numbers)
    const tickInterval = useMemo(() => {
        const isMobileRuler = typeof window !== 'undefined' && window.innerWidth < 768;

        // Aim for roughly 10 major ticks on desktop, 18-20 on mobile
        const targetTicks = isMobileRuler ? 20 : 10;
        const idealIntervalByHeight = maxHeightCm / targetTicks;

        // Ensure we don't pack them too tightly if zoomed out
        let baseMinPx = isMobileRuler ? 25 : 40;
        if (personCount !== undefined) {
            if (personCount <= 3) baseMinPx = isMobileRuler ? 20 : 30; // Slightly denser if fewer people
            else if (personCount >= 15) baseMinPx = isMobileRuler ? 35 : 60; // More spread out if crowded
        }
        const rawMinByScale = baseMinPx / scale;

        // The required interval must satisfy BOTH the height requirement and the pixel density
        const requiredInterval = Math.max(idealIntervalByHeight, rawMinByScale);

        // Return the exact arbitrary interval, just rounded to the nearest whole number 
        // to avoid messy decimal labels (e.g., returns exactly 13, 53, or 76)
        return Math.max(1, Math.round(requiredInterval));
    }, [scale, maxHeightCm, personCount]);

    // 2. ANTI-CLIPPING LOGIC
    const ticks = useMemo(() => {
        const minTick = 0;

        let maxVisibleCm = maxHeightCm;
        if (containerHeight && scale > 0) {
            const containerMaxCm = (containerHeight - 20) / scale;
            maxVisibleCm = Math.max(maxHeightCm, containerMaxCm);
        }

        const baseMaxTick = Math.ceil(maxVisibleCm / tickInterval) * tickInterval;
        const maxTick = Math.max(maxHeightCm > 300 ? 0 : 300, baseMaxTick);

        const tickCount = Math.floor((maxTick - minTick) / tickInterval);
        const allTicks = Array.from({ length: tickCount + 1 }, (_, i) => minTick + (i * tickInterval));

        return allTicks.filter((tick, idx) => {
            const heightPx = tick * scale;
            const safeTopBuffer = isFullscreen ? 80 : 20; // Reduced buffer to allow labels closer to the top

            // 1. CLIP CHECK
            if (containerHeight && (heightPx + 30) > (containerHeight - safeTopBuffer)) {
                return false;
            }

            // 2. COLLISION CHECK (Don't let the last tick crowd the top if it's too close to the one before it)
            if (idx === allTicks.length - 1 && allTicks.length > 1) {
                const prevTick = allTicks[idx - 1];
                if ((tick - prevTick) * scale < 40) return false;
            }

            return true;
        });
    }, [tickInterval, maxHeightCm, containerHeight, scale, isFullscreen]);

    const showLabels = mode === 'full' || mode === 'labels';
    const showLines = mode === 'full' || mode === 'lines';

    return (
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none select-none z-0 overflow-hidden">
            {/* Horizontal Ticks */}
            {ticks.map((tick) => {
                const heightPx = tick * scale;
                const isZero = tick === 0;

                const absFt = Math.abs(tick * 0.393701);
                const isNegative = tick < 0;
                const totalInches = Math.round(absFt);
                const ftValue = Math.floor(totalInches / 12);
                const inValue = totalInches % 12;
                const ftDisplay = `${isNegative ? '-' : ''}${ftValue}' ${inValue}''`;

                // Since our intervals are now entirely random (e.g., 13), modulo logic like "tick % 50 === 0" 
                // will almost never be true. We just set hasLabel to true so every dynamically generated tick is labeled.
                const hasLabel = true;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx}px` }}
                    >
                        {/* CM & FT Labels */}
                        {showLabels && (
                            <div
                                className="relative left-0 z-20 flex flex-col w-full items-start justify-center px-0 sm:px-2 bg-canvas/40 backdrop-blur-[2px] py-1"
                                style={isZero ? { transform: 'translateY(-50%)' } : undefined}
                            >
                                {unitSystem === 'metric' ? (
                                    <span className={`text-[8px] sm:text-[9px] font-mono font-black leading-none transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {hasLabel
                                            ? (tick >= 1000 ? `${(tick / 100).toLocaleString()} m` : `${tick.toLocaleString()} cm`)
                                            : (tick >= 1000 ? (tick / 100).toLocaleString() : tick.toLocaleString())
                                        }
                                    </span>
                                ) : (
                                    <span className={`text-[8px] sm:text-[9px] font-mono font-black leading-none transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {ftDisplay}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Grid Line */}
                        {showLines && (
                            <div
                                className={`flex-1 transition-colors duration-500 ${isZero
                                    ? 'bg-foreground/40 h-[1px] -translate-y-[1px] opacity-100'
                                    : hasLabel
                                        ? 'bg-foreground/20 group-hover/tick:bg-foreground/30 h-[1px]'
                                        : 'bg-foreground/5 group-hover/tick:bg-foreground/10 h-[1px]'
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
});

Ruler.displayName = 'Ruler';

export default Ruler;