'use client';

import React, { useMemo } from 'react';
import { useUnitStore } from '../store';

interface RulerProps {
    scale: number;
    maxHeightCm: number;
    canvasHeight?: number;
}

const Ruler: React.FC<RulerProps> = ({ scale, maxHeightCm, canvasHeight }) => {
    const { unitSystem } = useUnitStore();

    const tickInterval = useMemo(() => {
        const baseMin = 40 / scale; // Ensure at least 40px between lines
        const intervals = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000];
        let chosen = intervals[intervals.length - 1];
        for (const i of intervals) {
            if (i >= baseMin) {
                chosen = i;
                break;
            }
        }
        return chosen;
    }, [scale]);

    const ticks = useMemo(() => {
        const minTick = 0; // Start exactly from 0 as requested

        // Ensure lines stretch across the entire zoomed canvas view
        let maxVisibleCm = maxHeightCm;
        if (canvasHeight && scale > 0) {
            maxVisibleCm = Math.max(maxHeightCm, (canvasHeight * 2) / scale);
        }

        const maxTick = Math.max(300, Math.ceil(maxVisibleCm / tickInterval) * tickInterval + (tickInterval * 2));
        const tickCount = Math.floor((maxTick - minTick) / tickInterval);
        return Array.from({ length: tickCount + 1 }, (_, i) => minTick + (i * tickInterval));
    }, [tickInterval, maxHeightCm, canvasHeight, scale]);

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
                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center group/tick h-0"
                        style={{ bottom: `${heightPx + 60}px` }}
                    >
                        {/* CM & FT Labels (Sticky Left) */}
                        <div
                            className="sticky left-0 z-20 flex flex-col items-end w-16 sm:w-20 pr-4 pl-2 bg-canvas/40 backdrop-blur-[2px]"
                            style={{

                                maskImage: 'linear-gradient(to right, black 80%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)'
                            }}
                        >
                            {unitSystem === 'metric' ? (
                                <span className="text-[10px] sm:text-[11px] font-mono font-black text-foreground/90 drop-shadow-md">
                                    {tick} cm
                                </span>
                            ) : (
                                <span className="text-[10px] sm:text-[11px] font-mono font-black text-foreground/90 drop-shadow-md">
                                    {ftDisplay}
                                </span>
                            )}
                        </div>

                        {/* Grid Line - ensure it stretches full width */}
                        <div
                            className={`flex-1 transition-colors duration-500 ${isZero
                                ? 'bg-[#EF4444] h-[1px] opacity-100'
                                : 'bg-foreground/10 group-hover/tick:bg-foreground/20 h-[1px]'
                                }
                                mr-4
                                `}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Ruler;
