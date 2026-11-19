'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const SCALE_POINTS = [
  { key: 'person' as const, heightM: 1.75, imperial: "5'9\"", position: 'above' },
  { key: 'eiffelTower' as const, heightM: 330, imperial: "1,083 ft", position: 'below' },
  { key: 'angelFalls' as const, heightM: 979, imperial: "3,212 ft", position: 'above' },
  { key: 'mtEverest' as const, heightM: 8848.86, imperial: "29,032 ft", position: 'below', shiftLeft: true },
  { key: 'chartLimit' as const, heightM: 10000, imperial: "32,808 ft", position: 'above', alignRight: true },
];

const AXIS_TICKS = [
  { label: '1 m', pct: 0 },
  { label: '10 m', pct: 25 },
  { label: '100 m', pct: 50 },
  { label: '1,000 m', pct: 75 },
  { label: '10,000 m', pct: 100 },
];

export const ScaleLadder: React.FC = () => {
  const t = useTranslations('home.visuals.scaleLadder');

  // Logarithmic positioning from 1m to 10,000m: log10(m) / 4 * 100%
  const getLogPct = (m: number) => Math.min(100, Math.max(0, (Math.log10(m) / 4) * 100));

  return (
    <figure className="my-6 p-5 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm max-w-3xl mx-auto overflow-hidden">
      <div
        className="w-full"
        role="img"
        aria-label="Logarithmic scale line illustrating range support from 1.75 m person, 330 m Eiffel Tower, 979 m Angel Falls, 8,848.86 m Mount Everest, to 10,000 m chart limit."
      >
        {/* Desktop View: Horizontal Log Scale with alternating above/below labels */}
        <div className="hidden sm:block">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 flex justify-between">
            <span>{t('humanScale')}</span>
            <span>{t('limit')}</span>
          </div>

          <div className="relative w-full h-32 my-4 flex items-center px-4">
            {/* Guide track */}
            <div className="relative w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600 rounded-full opacity-85" />

              {/* Background Ticks */}
              {AXIS_TICKS.map((tick) => (
                <div
                  key={tick.label}
                  style={{ left: `${tick.pct}%` }}
                  className={`absolute top-3.5 ${tick.pct === 100 ? '-translate-x-full' : tick.pct === 0 ? 'translate-x-0' : '-translate-x-1/2'} flex flex-col items-center pointer-events-none`}
                >
                  <span className="text-[9.5px] font-mono text-muted/50">{tick.label}</span>
                </div>
              ))}

              {/* Scale points with alternating above/below positions to prevent collision */}
              {SCALE_POINTS.map((pt) => {
                const leftPct = getLogPct(pt.heightM);
                const isAbove = pt.position === 'above';
                const isRight = pt.alignRight;
                const isShiftLeft = (pt as any).shiftLeft;
                const label = t(pt.key);

                return (
                  <div
                    key={pt.key}
                    style={{ left: `${leftPct}%` }}
                    className={`absolute -top-1.5 ${isRight ? '-translate-x-full' : isShiftLeft ? '-translate-x-[75%]' : '-translate-x-1/2'} flex flex-col items-center group cursor-default`}
                  >
                    {/* Marker Dot */}
                    <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-emerald-500 shadow-md flex items-center justify-center transition-transform group-hover:scale-125 z-10" />

                    {/* Label Badge */}
                    <div
                      className={`absolute ${
                        isAbove ? 'bottom-8' : 'top-8'
                      } ${
                        isRight ? 'right-0 items-end text-right' : isShiftLeft ? 'right-0 items-end text-right' : 'left-1/2 -translate-x-1/2 items-center text-center'
                      } flex flex-col whitespace-nowrap bg-surface/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-border/50 shadow-sm pointer-events-none z-20`}
                    >
                      <span className="text-[11px] font-bold text-foreground leading-tight">{label}</span>
                      <span className="text-[10px] font-mono text-muted leading-tight">
                        {pt.heightM.toLocaleString()} m <span className="text-[9px] text-muted/70">({pt.imperial})</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View: Vertical Bar Rows (Under 640px, fits 390px mobile screens cleanly) */}
        <div className="sm:hidden space-y-3 pt-2">
          {SCALE_POINTS.map((pt) => {
            const widthPct = getLogPct(pt.heightM);
            const label = t(pt.key);
            return (
              <div key={pt.key} className="text-xs">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-foreground">{label}</span>
                  <span className="font-mono text-muted text-[11px]">
                    {pt.heightM.toLocaleString()} m ({pt.imperial})
                  </span>
                </div>
                <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.max(6, widthPct)}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <figcaption className="text-xs text-muted mt-5 pt-3 border-t border-border/50 text-center sm:text-left">
        {t('caption')}
      </figcaption>
    </figure>
  );
};
