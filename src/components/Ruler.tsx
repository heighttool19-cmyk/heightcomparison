'use client';

import React, { useMemo } from 'react';
import { useUnitStore } from '../store';

interface RulerProps {
    scale: number;
    maxHeightCm: number;
    canvasHeight?: number;
    /** 'full' = labels+lines (legacy), 'labels' = only left label col, 'lines' = only horizontal lines */
    mode?: 'full' | 'labels' | 'lines';
    zoom?: number;
}

/** Format a cm value for the ruler label. If >= 10m display in metres. */
function formatLabel(cm: number, showUnit: boolean): string {
    if (cm >= 1000) {
        const m = cm / 100;
        // Show up to 1 decimal place, drop .0
        const mStr = m % 1 === 0 ? `${m}` : `${m.toFixed(1)}`;
        return showUnit ? `${mStr} m` : mStr;
    }
    return showUnit ? `${cm} cm` : `${cm}`;
}

const Ruler: React.FC<RulerProps> = ({ scale, maxHeightCm, canvasHeight, mode = 'full', zoom = 1 }) => {
    const { unitSystem } = useUnitStore();

    // Calculate the maximum height we need to cover (at least 2x the canvas height at current zoom)
    const maxVisibleCm = useMemo(() => {
        let val = maxHeightCm;
        if (canvasHeight && scale > 0) {
            val = Math.max(maxHeightCm, (canvasHeight * 2) / scale);
        }
        return val;
    }, [maxHeightCm, canvasHeight, scale]);

    const tickInterval = useMemo(() => {
        // Aim for ~6-7 lines across the visible vertical range
        const visibleHeightCm = (canvasHeight && scale > 0) ? (canvasHeight / scale) : maxVisibleCm;
        const targetCount = 7.5;
        const rawInterval = visibleHeightCm / targetCount;

        // Extended intervals to handle extreme heights (buildings, mountains, etc.)
        const intervals = [
            5, 10, 20, 25, 50, 75, 100, 150, 200, 250, 500, 1000, 2000, 5000,
            10000, 20000, 50000, 100000
        ];
        let chosen = intervals[intervals.length - 1];
        for (const i of intervals) {
            if (i >= rawInterval * 0.9) {
                chosen = i;
                break;
            }
        }
        return chosen;
    }, [maxVisibleCm, canvasHeight, scale]);

    const ticks = useMemo(() => {
        const minTick = 0;
        const maxTick = Math.max(300, Math.ceil(maxVisibleCm / tickInterval) * tickInterval + (tickInterval * 2));
        const tickCount = Math.floor((maxTick - minTick) / tickInterval);
        return Array.from({ length: tickCount + 1 }, (_, i) => minTick + (i * tickInterval));
    }, [tickInterval, maxVisibleCm]);

    const showLabels = mode === 'full' || mode === 'labels';
    const showLines = mode === 'full' || mode === 'lines';

    // Whether any value is in "big" range (>=1000cm) — switch to metres display
    const useMetres = maxHeightCm >= 1000;

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
                // For imperial with very large heights, show in feet only
                const ftOnlyDisplay = ftValue >= 1000 ? `${ftValue.toLocaleString()} ft` : ftDisplay;

                const showLabelMetric = isZero || tick % tickInterval === 0;
                const showLabelImperial = isZero || tick % (tickInterval >= 30 ? tickInterval : 30) === 0;
                const hasLabel = unitSystem === 'metric' ? showLabelMetric : showLabelImperial;

                // Hide text specifically if it might overlap the URL label area at the top
                const topOffset = canvasHeight ? (canvasHeight - (heightPx + 60)) : 1000;
                const isNearTopWatermark = topOffset < 50;
                const shouldHideText = hasLabel && isNearTopWatermark;
                const shouldHideLine = isNearTopWatermark && !isZero;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx + 60}px` }}
                    >
                        {/* CM / M & FT Labels */}
                        {showLabels && (
                            <div
                                className="sticky left-0 z-20 flex flex-col items-end w-20 sm:w-28 pr-4 pl-2 bg-canvas/40 backdrop-blur-[2px]"
                                style={{
                                    maskImage: 'linear-gradient(to right, black 80%, transparent)',
                                    WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)',
                                    transformOrigin: 'right center',
                                    visibility: shouldHideText ? 'hidden' : 'visible'
                                }}
                            >
                                {unitSystem === 'metric' ? (
                                    <span className={`text-[10px] sm:text-[11px] font-mono font-black transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {hasLabel ? formatLabel(tick, true) : tick}
                                    </span>
                                ) : (
                                    <span className={`text-[10px] sm:text-[11px] font-mono font-black transition-opacity duration-300 ${hasLabel ? 'text-foreground/90' : 'text-foreground/30'}`}>
                                        {ftValue >= 1000 ? ftOnlyDisplay : ftDisplay}
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
                                style={{
                                    visibility: shouldHideLine ? 'hidden' : 'visible',
                                    opacity: shouldHideLine ? 0 : 1
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Ruler;
