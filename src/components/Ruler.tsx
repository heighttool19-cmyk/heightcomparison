'use client';

import React, { useMemo } from 'react';
import { useUnitStore } from '../store';

interface RulerProps {
    scale: number;
    maxHeightCm: number;
    containerHeight?: number;
    personCount?: number;
    mode?: 'full' | 'labels' | 'lines';
    isFullscreen?: boolean;
}

const Ruler: React.FC<RulerProps> = React.memo(({ scale, maxHeightCm, containerHeight, mode = 'full' }) => {
    const { unitSystem } = useUnitStore();

    // 1 & 2. STRICT 20-LINE GRID (No nice numbers, pure math fractions)
    const ticks = useMemo(() => {
        const TOTAL_LINES = 20;

        let maxVisibleCm = maxHeightCm;
        if (containerHeight && scale > 0) {
            maxVisibleCm = containerHeight / scale;
        }

        const allTicks = [];
        for (let i = 0; i <= TOTAL_LINES - 1; i++) {
            // Exact fractional numbers based purely on division
            allTicks.push((maxVisibleCm / TOTAL_LINES) * i);
        }

        return allTicks;
    }, [maxHeightCm, containerHeight, scale]);

    const showLabels = mode === 'full' || mode === 'labels';
    const showLines = mode === 'full' || mode === 'lines';

    return (
        // FIX: Changed overflow-hidden to overflow-visible to prevent clipping edges
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none select-none z-0 overflow-visible">
            {ticks.map((tick, index) => {
                const heightPx = tick * scale;
                const roundedTick = Math.round(tick); // Used for clean text display

                const isZero = roundedTick === 0;
                // FIX: Identify the absolute highest tick so we can adjust its placement
                const isTopTick = index === ticks.length - 1;

                const absFt = Math.abs(tick * 0.393701);
                const totalInches = Math.round(absFt);
                const ftValue = Math.floor(totalInches / 12);
                const inValue = totalInches % 12;
                const ftDisplay = `${ftValue}' ${inValue}''`;

                const isM = roundedTick >= 1000;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx}px` }}
                    >
                        {/* 3. ALL LINES ARE MAJOR (Labels always visible, text-foreground/90) */}
                        {showLabels && (
                            <div
                                className="relative left-0 z-20 flex flex-col w-full items-start justify-center pr-1 sm:pr-2 py-1"
                                style={{
                                    transform: isZero
                                        ? 'translateY(-20%)'
                                        : undefined
                                }}
                            >
                                {unitSystem === 'metric' ? (
                                    <div className="flex items-baseline justify-end w-full transition-opacity duration-300 text-foreground">
                                        <span className="text-[9px] sm:text-[10px] font-mono font-black leading-none text-right min-w-[30px] sm:min-w-[40px]">
                                            {isM
                                                ? (tick / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })
                                                : roundedTick.toLocaleString()}
                                        </span>
                                        <span className="text-[8px] sm:text-[9px] font-mono font-black leading-none text-left w-[12px] sm:w-[15px] ml-1">
                                            {isM ? 'm' : 'cm'}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-baseline justify-end w-full transition-opacity duration-300 text-foreground">
                                        <span className="text-[9px] sm:text-[10px] font-mono font-black leading-none text-right min-w-[35px] sm:min-w-[50px]">
                                            {ftDisplay}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. ALL LINES ARE MAJOR (Heavy bg-foreground/20 opacity on all lines) */}
                        {showLines && (
                            <div
                                className={`flex-1 transition-colors duration-500 h-[1px] opacity-100 ${isZero
                                    ? 'bg-foreground/40 -translate-y-[1px]'
                                    // FIX: Nudge the top line down by 1px so it renders cleanly
                                    : isTopTick
                                        ? 'bg-foreground/20 group-hover/tick:bg-foreground/30 translate-y-[1px]'
                                        : 'bg-foreground/20 group-hover/tick:bg-foreground/30'
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