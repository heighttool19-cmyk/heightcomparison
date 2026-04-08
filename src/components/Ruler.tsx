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

    // 1. FIXED 20-LINE GRID
    const ticks = useMemo(() => {
        const TOTAL_LINES = 20;

        // Determine the maximum height we need to cover.
        // If we know the screen height and scale, use that so the grid fills the screen.
        // Otherwise, fallback to the tallest person (maxHeightCm).
        let maxVisibleCm = maxHeightCm;
        if (containerHeight && scale > 0) {
            maxVisibleCm = containerHeight / scale;
        }

        // Generate exactly 20 perfectly spaced ticks
        const allTicks = [];
        for (let i = 0; i <= TOTAL_LINES; i++) {
            // Calculate the exact CM value for this specific line
            const tickValue = (maxVisibleCm / TOTAL_LINES) * i;
            allTicks.push(tickValue);
        }

        return allTicks;
    }, [maxHeightCm, containerHeight, scale]);

    const showLabels = mode === 'full' || mode === 'labels';
    const showLines = mode === 'full' || mode === 'lines';

    return (
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none select-none z-0 overflow-hidden">
            {/* Horizontal Ticks */}
            {ticks.map((tick) => {
                const heightPx = tick * scale;
                const roundedTick = Math.round(tick);
                const isZero = roundedTick === 0;

                const absFt = Math.abs(roundedTick * 0.393701);
                const isNegative = roundedTick < 0;
                const totalInches = Math.round(absFt);
                const ftValue = Math.floor(totalInches / 12);
                const inValue = totalInches % 12;
                const ftDisplay = `${isNegative ? '-' : ''}${ftValue}' ${inValue}''`;

                // Since we force exactly 20 lines, we label every one of them for maximum info.
                const hasLabel = true;

                // --- KM Support ---
                const isKM = roundedTick >= 100000;
                const isM = roundedTick >= 1000 && !isKM;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx}px` }}
                    >
                        {/* CM & FT Labels */}
                        {showLabels && (
                            <div
                                className="relative left-0 z-20 flex flex-col w-full items-start justify-center pr-1 sm:pr-2 bg-canvas/40 backdrop-blur-[2px] py-1"
                                style={isZero ? { transform: 'translateY(-20%)' } : undefined}
                            >
                                {unitSystem === 'metric' ? (
                                    <div className={`flex items-baseline justify-end w-full transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        <span className="text-[8px] sm:text-[9px] font-mono font-black leading-none text-right min-w-[28px] sm:min-w-[40px]">
                                            {isKM
                                                ? (roundedTick / 100000).toLocaleString(undefined, { maximumFractionDigits: 1 })
                                                : (isM ? (roundedTick / 100).toLocaleString() : roundedTick.toLocaleString())}
                                        </span>
                                        <span className="text-[6px] sm:text-[7px] font-mono font-black leading-none text-left w-[12px] sm:w-[15px] opacity-70 ml-1">
                                            {hasLabel ? (isKM ? 'km' : (isM ? 'm' : 'cm')) : ''}
                                        </span>
                                    </div>
                                ) : (
                                    <div className={`flex items-baseline justify-end w-full transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        <span className="text-[8px] sm:text-[9px] font-mono font-black leading-none text-right min-w-[35px] sm:min-w-[50px]">
                                            {ftDisplay}
                                        </span>
                                    </div>
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