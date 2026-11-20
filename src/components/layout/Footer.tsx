'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getLocalizedHref as toLocalizedHref } from '@/i18n/config';
import { useThemeStore, useUIStore } from '@/store';

const Footer = () => {
    const t = useTranslations('footer');
    const locale = useLocale();
    const { theme } = useThemeStore();
    const { isCustomFullscreen } = useUIStore();
    const pathname = usePathname() || '/';

    const currentLocale = locale || (routing.locales.find(loc => loc !== 'en' && (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`)) || 'en');
    const getLocalizedHref = (path: string) => toLocalizedHref(path, currentLocale);

    if (isCustomFullscreen || pathname?.startsWith('/studio')) return null;

    return (
        <footer className="bg-bg text-muted pt-14 pb-7 px-6 md:px-12 mt-auto font-sans border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-5">
                        <Link href={getLocalizedHref('/')} className="flex items-center gap-2.5 group">
                            {/* Logo Container */}
                            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                                <img
                                    src="/logo.png"
                                    alt="Height Comparison Calculator Logo"
                                    className="object-contain"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <span className="text-lg font-semibold text-foreground tracking-tight">
                                Height Comparison<span className="text-accent"> Calculator</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-muted max-w-[280px]">
                            {t('brandDescription')}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted">{t('badgeFreeToUse')}</span>
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted">{t('badgeNoAccountNeeded')}</span>
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted">{t('badgeMetricImperial')}</span>
                        </div>
                    </div>

                    {/* Calculators Column */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">{t('calculatorsHeading')}</p>
                        <ul className="flex flex-col gap-2.5">
                            <FooterLink href={getLocalizedHref('/height-predictor')}>{t('heightPredictor')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/height-weight-percentile-calculator')}>{t('heightWeightPercentile')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/ideal-body-weight-calculator')}>{t('idealBodyWeight')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/height-difference-calculator')}>{t('heightDifference')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/average-height-by-country')}>{t('averageHeightByCountry')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/image-to-height')}>{t('imageToHeight')}</FooterLink>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">{t('companyHeading')}</p>
                        <ul className="flex flex-col gap-2.5">
                            <FooterLink href={getLocalizedHref('/about')}>{t('about')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/contact')}>Contact</FooterLink>
                            <FooterLink href={getLocalizedHref('/blogs')}>{t('blogs')}</FooterLink>
                            <FooterLink href={getLocalizedHref('/privacy')}>{t('privacyPolicy')}</FooterLink>
                        </ul>
                    </div>
                </div>

                <hr className="border-none border-t border-border mb-6 opacity-50" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
                    <p className="text-[13px] text-muted">
                        {t('copyright', { year: new Date().getFullYear().toString() })}
                        <Link href={getLocalizedHref('/about')} className="text-accent hover:underline">{t('theTeam')}</Link>.
                    </p>
                    <div className="flex gap-3">
                        <SocialButton title="Reddit">
                            <path d="M18 10a2 2 0 0 0-2-2 2 2 0 0 0-1.38.55C13.2 7.87 11.73 7.5 10 7.5c-.06 0-.12 0-.19.01l-.85-3.97 2.74-.57a1.25 1.25 0 1 0-.13-.93L8.6 2.67 7.55 7.52C5.82 7.54 4.37 7.91 3.38 8.55A2 2 0 0 0 2 10a2 2 0 0 0 .92 1.68 3.94 3.94 0 0 0-.04.53c0 2.7 3.17 4.9 7.07 4.9s7.07-2.2 7.07-4.9a3.94 3.94 0 0 0-.04-.53A2 2 0 0 0 18 10zm-11.5 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.57 2.65c-.5.5-1.5.68-2.07.68s-1.57-.18-2.07-.68a.3.3 0 0 1 .42-.42c.34.34 1.08.5 1.65.5s1.31-.16 1.65-.5a.3.3 0 0 1 .42.42zm-.57-1.65a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                        </SocialButton>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <Link href={href} className="group flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors">
            {children}
            <span className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">›</span>
        </Link>
    </li>
);

const SocialButton = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <button title={title} aria-label={title} className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center cursor-pointer transition-all hover:border-accent hover:bg-accent/10 group">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] fill-muted group-hover:fill-accent transition-colors">
            {children}
        </svg>
    </button>
);

export default Footer;
