'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

function getCleanPath(rawPathname: string): string {
  let path = rawPathname || '/';
  if (path.startsWith('/de/') || path === '/de') {
    path = path.slice(3) || '/';
  } else if (path.startsWith('/en/') || path === '/en') {
    path = path.slice(3) || '/';
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path;
}

function getTargetUrl(rawPathname: string, targetLocale: 'en' | 'de'): string {
  const cleanPath = getCleanPath(rawPathname);
  if (targetLocale === 'en') {
    return cleanPath;
  }
  return cleanPath === '/' ? '/de' : `/de${cleanPath}`;
}

export default function LanguageSwitcher() {
  const rawPathname = usePathname() || '/';
  const [currentLocale, setCurrentLocale] = useState<'en' | 'de'>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowPath = window.location.pathname;
      if (windowPath.startsWith('/de/') || windowPath === '/de') {
        setCurrentLocale('de');
      } else {
        setCurrentLocale('en');
      }
    }
  }, [rawPathname]);

  const handleLanguageChange = (nextLocale: 'en' | 'de') => {
    if (typeof window === 'undefined') return;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    const windowPath = window.location.pathname;
    const targetUrl = getTargetUrl(windowPath, nextLocale);
    
    if (nextLocale === currentLocale && window.location.pathname === targetUrl) {
      return;
    }

    setCurrentLocale(nextLocale);
    window.location.href = targetUrl;
  };

  return (
    <div className="relative inline-flex items-center gap-1.5 bg-surface border border-border rounded-xl px-2.5 py-1.5 text-xs font-bold shadow-sm">
      <Globe size={14} className="text-accent" />
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          currentLocale === 'en'
            ? 'bg-accent text-accent-foreground font-black'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        type="button"
        onClick={() => handleLanguageChange('de')}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          currentLocale === 'de'
            ? 'bg-accent text-accent-foreground font-black'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to Deutsch"
      >
        DE
      </button>
    </div>
  );
}
