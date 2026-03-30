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

    // 1. DYNAMIC INTERVAL BASED ON MAX HEIGHT
    const tickInterval = useMemo(() => {
        // Aim for roughly 10 major ticks to cover the tallest person
        const idealIntervalByHeight = maxHeightCm / 10;

        // Ensure we don't pack them too tightly if zoomed out (minimum 40px between lines)
        let baseMinPx = 40;
        if (personCount !== undefined) {
            if (personCount <= 3) baseMinPx = 30; // Slightly denser if fewer people
            else if (personCount >= 15) baseMinPx = 60; // More spread out if crowded
        }
        const rawMinByScale = baseMinPx / scale;

        // The required interval must satisfy BOTH the height requirement and the pixel density
        const requiredInterval = Math.max(idealIntervalByHeight, rawMinByScale);

        const intervals = [
            5, 10, 20, 25, 50, 100, 200, 250, 500, 1000,
            2000, 2500, 5000, 10000, 20000, 25000, 50000,
            100000, 200000, 250000, 500000, 1000000
        ];

        let chosen = intervals[intervals.length - 1];
        for (const i of intervals) {
            if (i >= requiredInterval) {
                chosen = i;
                break;
            }
        }
        return chosen;
    }, [scale, maxHeightCm, personCount]);

    // 2. ANTI-CLIPPING LOGIC
    const ticks = useMemo(() => {
        const minTick = 0;

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
                // To prevent clipping, we use a larger safe top buffer.
                // If the bottom offset of the line plus our buffer exceeds the container, hide it.
                const safeTopBuffer = isFullscreen ? 160 : 65; // Increased from 40 to 65 to ensure labels fit

                if (containerHeight && (heightPx + 20) > (containerHeight - safeTopBuffer)) {
                    return false; // Cuts off this specific line
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

                const showLabelMetric = isZero || tick % (tickInterval >= 50 ? tickInterval : 50) === 0;
                const showLabelImperial = isZero || tick % (tickInterval >= 30 ? tickInterval : 30) === 0;
                const hasLabel = unitSystem === 'metric' ? showLabelMetric : showLabelImperial;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx}px` }}
                    >
                        {/* CM & FT Labels */}
                        {showLabels && (
                            <div className="  relative left-0 z-20 flex flex-col items-start w-full pr-1 pl-6 sm:pr-2 sm:pl-8 bg-canvas/40 backdrop-blur-[2px]"
                                style={{ bottom: `15px` }}
                            >
                                {unitSystem === 'metric' ? (
                                    <span className={`text-[10px] sm:text-[11px] font-mono font-black leading-none transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {hasLabel
                                            ? (tick >= 1000 ? `${(tick / 100).toLocaleString()} m` : `${tick.toLocaleString()} cm`)
                                            : (tick >= 1000 ? (tick / 100).toLocaleString() : tick.toLocaleString())
                                        }
                                    </span>
                                ) : (
                                    <span className={`text-[10px] sm:text-[11px] font-mono font-black leading-none transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {ftDisplay}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Grid Line */}
                        {showLines && (
                            <div
                                className={`flex-1 transition-colors duration-500 ${isZero
                                    ? 'bg-white/20 h-[1px] opacity-100'
                                    : hasLabel
                                        ? 'bg-foreground/20 group-hover/tick:bg-foreground/30 h-[1px]'
                                        : 'bg-foreground/5 group-hover/tick:bg-foreground/10 h-[1px]'
                                    } mr-4`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
});

export default Ruler;