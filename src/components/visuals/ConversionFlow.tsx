'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export const ConversionFlow: React.FC = () => {
  const t = useTranslations('home.visuals.conversionFlow');

  return (
    <figure className="my-5 p-4 sm:p-5 rounded-2xl bg-surface border border-border shadow-sm max-w-xl mx-auto">
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
        role="img"
        aria-label="Three-step conversion flow"
      >
        {/* Step 1 */}
        <div className="p-3 bg-bg rounded-xl border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-muted uppercase text-[10px] tracking-wider mb-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px]">1</span>
              <span>{t('step1')}</span>
            </div>
            <p className="font-mono text-sm font-black text-foreground">175 ÷ 2.54</p>
          </div>
          <p className="text-muted mt-2 text-[11px] font-mono">= 68.897 in</p>
        </div>

        {/* Step 2 */}
        <div className="p-3 bg-bg rounded-xl border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-muted uppercase text-[10px] tracking-wider mb-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px]">2</span>
              <span>{t('step2')}</span>
            </div>
            <p className="font-mono text-sm font-black text-foreground">68.897 ÷ 12</p>
          </div>
          <p className="text-muted mt-2 text-[11px] font-mono">= 5 ft, rem 8.897&quot;</p>
        </div>

        {/* Step 3 */}
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300 uppercase text-[10px] tracking-wider mb-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">3</span>
              <span>{t('step3')}</span>
            </div>
            <p className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">5&apos;9&quot;</p>
          </div>
          <p className="text-emerald-600 dark:text-emerald-400 mt-2 text-[11px] font-mono">(exact: 5&apos;8.9&quot;)</p>
        </div>
      </div>

      <figcaption className="text-xs text-muted mt-3 pt-2 border-t border-border/50 text-center sm:text-left">
        {t('caption')}
      </figcaption>
    </figure>
  );
};
