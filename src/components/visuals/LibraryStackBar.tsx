'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const PRESET_LIBRARY_COUNTS = {
  celebrities: 1294,
  fictional: 1138,
  objects: 264,
  total: 2696,
} as const;

export const LibraryStackBar: React.FC = () => {
  const t = useTranslations('home.visuals.libraryStackBar');
  const { celebrities, fictional, objects, total } = PRESET_LIBRARY_COUNTS;
  const celebPct = ((celebrities / total) * 100).toFixed(1);
  const fictionalPct = ((fictional / total) * 100).toFixed(1);
  const objectsPct = ((objects / total) * 100).toFixed(1);

  return (
    <figure className="my-4 w-full" aria-label="Preset library distribution">
      <div
        className="w-full h-4 rounded-full overflow-hidden flex bg-zinc-200 dark:bg-zinc-800 shadow-inner"
        role="img"
        aria-label={`${t('celebrities')}: ${celebrities.toLocaleString()} (${celebPct}%), ${t('fictional')}: ${fictional.toLocaleString()} (${fictionalPct}%), ${t('objects')}: ${objects.toLocaleString()} (${objectsPct}%).`}
      >
        <div
          style={{ width: `${celebPct}%` }}
          className="h-full bg-emerald-500 hover:brightness-110 transition-all duration-300"
          title={`${t('celebrities')}: ${celebrities.toLocaleString()} (${celebPct}%)`}
        />
        <div
          style={{ width: `${fictionalPct}%` }}
          className="h-full bg-blue-500 hover:brightness-110 transition-all duration-300"
          title={`${t('fictional')}: ${fictional.toLocaleString()} (${fictionalPct}%)`}
        />
        <div
          style={{ width: `${objectsPct}%` }}
          className="h-full bg-amber-500 hover:brightness-110 transition-all duration-300"
          title={`${t('objects')}: ${objects.toLocaleString()} (${objectsPct}%)`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 text-xs text-muted font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
          <span>{t('celebrities')}: <strong>{celebrities.toLocaleString()}</strong> ({celebPct}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
          <span>{t('fictional')}: <strong>{fictional.toLocaleString()}</strong> ({fictionalPct}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <span>{t('objects')}: <strong>{objects.toLocaleString()}</strong> ({objectsPct}%)</span>
        </div>
      </div>

      <figcaption className="text-[11px] text-muted/80 mt-1.5 text-center sm:text-left">
        {t('caption')}
      </figcaption>
    </figure>
  );
};
