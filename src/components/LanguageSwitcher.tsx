'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';

import { SUPPORTED_LOCALES, ALL_LOCALE_CODES, type AppLocale } from '@/i18n/config';

export type LanguageOption = AppLocale;
export const LANGUAGES: LanguageOption[] = SUPPORTED_LOCALES;
const ALL_LOCALES = ALL_LOCALE_CODES;

/** Remove any existing locale prefix from pathname */
function getCleanPath(rawPathname: string, locales: string[]): string {
  let path = rawPathname || '/';
  for (const loc of locales) {
    if (loc === 'en') continue;
    if (path.startsWith(`/${loc}/`)) {
      path = path.slice(loc.length + 1) || '/';
      break;
    } else if (path === `/${loc}`) {
      path = '/';
      break;
    }
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path;
}

/** Compute the destination URL for a given target locale */
function getTargetUrl(rawPathname: string, targetLocale: string, locales: string[]): string {
  const cleanPath = getCleanPath(rawPathname, locales);
  if (targetLocale === 'en') {
    return cleanPath;
  }
  return cleanPath === '/' ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
}

export default function LanguageSwitcher() {
  const rawPathname = usePathname() || '/';
  const [currentLocale, setCurrentLocale] = useState<string>('en');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync current locale from pathname
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowPath = window.location.pathname;
      const matched = ALL_LOCALES.find(
        (code) =>
          code !== 'en' &&
          (windowPath.startsWith(`/${code}/`) || windowPath === `/${code}`)
      );
      setCurrentLocale(matched || 'en');
    }
  }, [rawPathname]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLanguageChange = (nextLocale: string) => {
    setIsOpen(false);
    if (typeof window === 'undefined') return;

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    const windowPath = window.location.pathname;
    const targetUrl = getTargetUrl(windowPath, nextLocale, ALL_LOCALES);

    if (nextLocale === currentLocale && window.location.pathname === targetUrl) {
      return;
    }

    setCurrentLocale(nextLocale);
    window.location.href = targetUrl;
  };

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-1.5 bg-surface border border-border hover:border-accent/40 rounded-xl px-2.5 py-1.5 text-xs font-bold shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe size={14} className="text-accent shrink-0 transition-transform duration-200 group-hover:rotate-12" />
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="text-foreground uppercase tracking-wider font-extrabold text-[11px]">
          {currentLanguage.code}
        </span>
        <ChevronDown
          size={13}
          className={`text-muted transition-transform duration-200 ease-in-out shrink-0 ${
            isOpen ? 'rotate-180 text-foreground' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 mt-2 w-48 origin-top-right bg-surface/95 backdrop-blur-md border border-border rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 focus:outline-none"
        >
          <div className="px-2.5 py-1.5 mb-1 border-b border-border/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Select Language
            </p>
          </div>

          <div className="space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLocale;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent/10 text-accent font-bold'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="text-xs">{lang.nativeName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted/10 text-muted'
                      }`}
                    >
                      {lang.code}
                    </span>
                    {isSelected && (
                      <Check size={14} className="text-accent shrink-0 stroke-[2.5]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
