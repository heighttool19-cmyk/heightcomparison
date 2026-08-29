'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: 'en' | 'de') => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative inline-flex items-center gap-1.5 bg-surface border border-border rounded-xl px-2.5 py-1.5 text-xs font-bold shadow-sm">
      <Globe size={14} className="text-accent" />
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          locale === 'en' ? 'bg-accent text-accent-foreground font-black' : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('de')}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          locale === 'de' ? 'bg-accent text-accent-foreground font-black' : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to Deutsch"
      >
        DE
      </button>
    </div>
  );
}
