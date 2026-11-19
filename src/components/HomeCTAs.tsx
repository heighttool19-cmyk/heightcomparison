'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PanelType } from '../types';

export default function HomeCTAs() {
  const t = useTranslations('home.cta');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDashboardPanel = (panel: PanelType) => {
    scrollToTop();
    setTimeout(() => {
      const event = new CustomEvent('open-dashboard-panel', { detail: panel });
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="bg-surface rounded-3xl p-8 text-center border-2 border-accent/30 my-6 shadow-sm">
      <p className="text-xl sm:text-2xl font-black text-foreground mb-2 uppercase tracking-tight">
        {t('heading')}
      </p>
      <p className="text-sm text-muted mb-6 max-w-xl mx-auto font-medium leading-relaxed">
        {t('description')}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => openDashboardPanel('ADD_PERSON')}
          className="inline-flex items-center gap-2 h-12 px-6 bg-accent border-none rounded-full text-zinc-950 text-xs font-black uppercase tracking-widest cursor-pointer hover:brightness-110 transition-all shadow-md hover:-translate-y-0.5 active:scale-95"
        >
          {t('startComparing')}
        </button>
        <button
          onClick={() => openDashboardPanel('CELEBRITIES')}
          className="inline-flex items-center gap-2 h-12 px-6 bg-bg border border-border rounded-full text-foreground text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-surface transition-all shadow-sm hover:-translate-y-0.5 active:scale-95"
        >
          {t('exploreCelebrities')}
        </button>
      </div>
    </div>
  );
}
