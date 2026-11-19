'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const BENCHMARKS = [
  { key: 'boy4' as const, cm: 102.5, ft: "3'4.3\"", tone: 'zinc' },
  { key: 'girl10' as const, cm: 138.2, ft: "4'6.4\"", tone: 'zinc' },
  { key: 'boy10' as const, cm: 138.8, ft: "4'6.6\"", tone: 'zinc' },
  { key: 'women' as const, cm: 161.3, ft: "5'3.5\"", tone: 'emerald' },
  { key: 'men' as const, cm: 175.0, ft: "5'8.9\"", tone: 'emerald' },
];

export const AgeBenchmarkBars: React.FC = () => {
  const t = useTranslations('home.visuals.ageBenchmarks');
  const maxCm = 190;

  return (
    <figure className="my-5 p-4 sm:p-5 rounded-2xl bg-surface border border-border shadow-sm">
      <div
        className="space-y-3"
        role="img"
        aria-label="CDC US height benchmarks"
      >
        <div className="flex justify-between items-center text-xs font-semibold text-muted border-b border-border/50 pb-2">
          <span>{t('colPop')}</span>
          <span>{t('colAvg')}</span>
        </div>

        {BENCHMARKS.map((b) => {
          const widthPct = (b.cm / maxCm) * 100;
          const isAdult = b.tone === 'emerald';
          const label = t(b.key);

          return (
            <div key={b.key} className="space-y-1">
              <div className="flex justify-between items-baseline text-xs gap-2">
                <span className={`font-semibold truncate ${isAdult ? 'text-foreground font-bold' : 'text-muted'}`}>
                  {label}
                </span>
                <span className="font-mono text-xs font-bold text-foreground shrink-0">
                  {b.cm} cm <span className="text-muted font-normal">({b.ft})</span>
                </span>
              </div>
              <div className="w-full h-5 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex">
                <div
                  style={{ width: `${widthPct}%` }}
                  className={`h-full rounded-md transition-all ${
                    isAdult
                      ? 'bg-emerald-500 shadow-sm'
                      : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="text-xs text-muted mt-3 pt-2 border-t border-border/50 text-center sm:text-left">
        {t('caption')}
      </figcaption>
    </figure>
  );
};
