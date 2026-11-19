'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const COMMON_PAIRS = [
  { pair: "5'2\" vs 5'8\"", h1Ft: "5'2\"", h1Cm: 157.5, h2Ft: "5'8\"", h2Cm: 172.7, gapIn: 6.0, gapCm: 15.2, tallerPct: 9.7, shorterPct: 8.8 },
  { pair: "5'4\" vs 5'10\"", h1Ft: "5'4\"", h1Cm: 162.6, h2Ft: "5'10\"", h2Cm: 177.8, gapIn: 6.0, gapCm: 15.2, tallerPct: 9.4, shorterPct: 8.6 },
  { pair: "5'6\" vs 6'0\"", h1Ft: "5'6\"", h1Cm: 167.6, h2Ft: "6'0\"", h2Cm: 182.9, gapIn: 6.0, gapCm: 15.2, tallerPct: 9.1, shorterPct: 8.3 },
  { pair: "5'7\" vs 5'10\"", h1Ft: "5'7\"", h1Cm: 170.2, h2Ft: "5'10\"", h2Cm: 177.8, gapIn: 3.0, gapCm: 7.6, tallerPct: 4.4, shorterPct: 4.2 },
  { pair: "5'7\" vs 6'1\"", h1Ft: "5'7\"", h1Cm: 170.2, h2Ft: "6'1\"", h2Cm: 185.4, gapIn: 6.0, gapCm: 15.2, tallerPct: 8.8, shorterPct: 8.1 },
  { pair: "5'9\" vs 6'2\"", h1Ft: "5'9\"", h1Cm: 175.3, h2Ft: "6'2\"", h2Cm: 188.0, gapIn: 5.0, gapCm: 12.7, tallerPct: 7.2, shorterPct: 6.8 },
  { pair: "5'10\" vs 6'3\"", h1Ft: "5'10\"", h1Cm: 177.8, h2Ft: "6'3\"", h2Cm: 190.5, gapIn: 5.0, gapCm: 12.7, tallerPct: 7.1, shorterPct: 6.7 },
];

export const HeightGapTable: React.FC = () => {
  const t = useTranslations('home.visuals.heightGapTable');
  const maxCm = 195;

  return (
    <figure className="my-6 w-full">
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-zinc-50 dark:bg-zinc-900/60 text-muted font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">{t('colPair')}</th>
              <th className="py-3 px-3">{t('colDiff')}</th>
              <th className="py-3 px-3">{t('colTaller')}</th>
              <th className="py-3 px-3">{t('colShorter')}</th>
              <th className="py-3 px-4 min-w-[140px]">{t('colScale')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {COMMON_PAIRS.map((row) => {
              const basePct = (row.h1Cm / maxCm) * 100;
              const gapPct = (row.gapCm / maxCm) * 100;

              return (
                <tr key={row.pair} className="hover:bg-zinc-500/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-foreground whitespace-nowrap">
                    {row.pair}
                    <div className="text-[11px] font-normal font-mono text-muted">
                      {row.h1Cm} cm vs {row.h2Cm} cm
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-semibold text-foreground">{row.gapIn} in</span>
                    <span className="text-[11px] font-mono text-muted block">({row.gapCm} cm)</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    +{row.tallerPct}%
                  </td>
                  <td className="py-3 px-3 font-semibold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                    −{row.shorterPct}%
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center shadow-inner"
                      role="img"
                      aria-label={`${row.pair} comparison: shorter is ${(row.h1Cm).toFixed(0)}cm, taller adds ${row.gapCm}cm.`}
                    >
                      <div
                        style={{ width: `${basePct}%` }}
                        className="h-full bg-zinc-400 dark:bg-zinc-500"
                      />
                      <div
                        style={{ width: `${gapPct}%` }}
                        className="h-full bg-emerald-500"
                        title={`+${row.gapIn} in (+${row.gapCm} cm)`}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <figcaption className="text-xs text-muted mt-2.5 px-1 text-center sm:text-left">
        {t('caption')}
      </figcaption>
    </figure>
  );
};
