'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const GapPairBars: React.FC = () => {
  const t = useTranslations('home.visuals.gapPairBars');
  const max = 210;

  return (
    <figure className="my-5 p-4 sm:p-5 rounded-2xl bg-surface border border-border shadow-sm">
      <div
        className="space-y-5"
        role="img"
        aria-label="Perception comparison: A 12 cm gap between 160 cm and 172 cm is a 7.5% difference, but the same 12 cm gap between 190 cm and 202 cm is only 6.3%."
      >
        {/* Pair 1: 160 vs 172 cm */}
        <div className="p-3 bg-bg rounded-xl border border-border/60">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-foreground">{t('shorterBase')}</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px]">
              {t('gapDiff', { pct: '7.5' })}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-mono text-muted text-[11px] shrink-0">160 cm</span>
              <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden">
                <div style={{ width: `${(160 / max) * 100}%` }} className="h-full bg-zinc-400 dark:bg-zinc-500 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-mono font-bold text-foreground text-[11px] shrink-0">172 cm</span>
              <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden flex">
                <div style={{ width: `${(160 / max) * 100}%` }} className="h-full bg-zinc-400 dark:bg-zinc-500" />
                <div style={{ width: `${(12 / max) * 100}%` }} className="h-full bg-emerald-500" title="+12 cm (7.5%)" />
              </div>
            </div>
          </div>
        </div>

        {/* Pair 2: 190 vs 202 cm */}
        <div className="p-3 bg-bg rounded-xl border border-border/60">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-foreground">{t('tallerBase')}</span>
            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-bold text-[11px]">
              {t('gapDiff', { pct: '6.3' })}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-mono text-muted text-[11px] shrink-0">190 cm</span>
              <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden">
                <div style={{ width: `${(190 / max) * 100}%` }} className="h-full bg-zinc-400 dark:bg-zinc-500 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-mono font-bold text-foreground text-[11px] shrink-0">202 cm</span>
              <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden flex">
                <div style={{ width: `${(190 / max) * 100}%` }} className="h-full bg-zinc-400 dark:bg-zinc-500" />
                <div style={{ width: `${(12 / max) * 100}%` }} className="h-full bg-emerald-500" title="+12 cm (6.3%)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="text-xs text-muted mt-3 pt-2 border-t border-border/50 text-center sm:text-left">
        {t('caption')}
      </figcaption>
    </figure>
  );
};
