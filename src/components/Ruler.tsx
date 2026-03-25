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

    const tickInterval = useMemo(() => {
        // ... component content ...
        // Dynamic density based on personCount
        let baseMin = 40;
        if (personCount !== undefined) {
            if (personCount <= 3) baseMin = 25; // More dense
            else if (personCount >= 15) baseMin = 65; // Less dense
        }

        const rawMin = baseMin / scale; // Ensure at least baseMin px between lines
        const intervals = [
            5, 10, 20, 25, 50, 100, 200, 250, 500, 1000,
            2000, 2500, 5000, 10000, 20000, 25000, 50000,
            100000, 200000, 250000, 500000, 1000000
        ];
        let chosen = intervals[intervals.length - 1];
        for (const i of intervals) {
            if (i >= rawMin) {
                chosen = i;
                break;
            }
        }
        return chosen;
    }, [scale, personCount]);

    const ticks = useMemo(() => {
        const minTick = 0;

        // Determine the maximum visible height in CM based on available space
        let maxVisibleCm = maxHeightCm;
        if (containerHeight && scale > 0) {
            const containerMaxCm = (containerHeight - 100) / scale;
            maxVisibleCm = Math.max(maxHeightCm, containerMaxCm);
        }

        const baseMaxTick = Math.ceil(maxVisibleCm / tickInterval) * tickInterval;
        const maxTick = Math.max(maxHeightCm > 300 ? 0 : 300, baseMaxTick);

        const tickCount = Math.floor((maxTick - minTick) / tickInterval);
        return Array.from({ length: tickCount + 1 }, (_, i) => minTick + (i * tickInterval))
            .filter(tick => {
                const heightPx = tick * scale;
                const topBuffer = isFullscreen ? 160 : 40;
                if (containerHeight && (heightPx + 20) > (containerHeight - topBuffer)) return false;
                return true;
            });
    }, [tickInterval, maxHeightCm, containerHeight, scale]);

    const showLabels = mode === 'full' || mode === 'labels';
    const showLines = mode === 'full' || mode === 'lines';

    return (
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none select-none z-0">
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

                const showLabelMetric = isZero || tick % (tickInterval >= 50 ? tickInterval : 50) === 0;
                const showLabelImperial = isZero || tick % (tickInterval >= 30 ? tickInterval : 30) === 0;
                const hasLabel = unitSystem === 'metric' ? showLabelMetric : showLabelImperial;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx + 20}px` }}
                    >
                        {/* CM & FT Labels */}
                        {showLabels && (
                            <div
                                className="sticky left-0 z-20 flex flex-col items-end w-full pr-3 pl-1 sm:pr-4 sm:pl-2 bg-canvas/40 backdrop-blur-[2px]"
                                style={{
                                    maskImage: 'linear-gradient(to right, black 80%, transparent)',
                                    WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)'
                                }}
                            >
                                {unitSystem === 'metric' ? (
                                    <span className={`text-[10px] sm:text-[11px] font-mono font-black transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {hasLabel
                                            ? (tick >= 1000 ? `${(tick / 100).toLocaleString()} m` : `${tick.toLocaleString()} cm`)
                                            : (tick >= 1000 ? (tick / 100).toLocaleString() : tick.toLocaleString())
                                        }
                                    </span>
                                ) : (
                                    <span className={`text-[10px] sm:text-[11px] font-mono font-black transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {ftDisplay}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Grid Line */}
                        {showLines && (
                            <div
                                className={`flex-1 transition-colors duration-500 ${isZero
                                    ? 'bg-white/20 h-[1.5px] opacity-100'
                                    : hasLabel
                                        ? 'bg-foreground/20 group-hover/tick:bg-foreground/30 h-[1.5px]'
                                        : 'bg-foreground/5 group-hover/tick:bg-foreground/10 h-[1px]'
                                    }
                                    mr-4
                                    `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
});

export default Ruler;