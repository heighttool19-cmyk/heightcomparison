'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeStore, useUIStore } from '@/store';

const Footer = () => {
    const { theme } = useThemeStore();
    const { isCustomFullscreen } = useUIStore();
    const isDark = theme === 'dark';

    if (isCustomFullscreen) return null;

    return (
        <footer className="bg-bg text-muted pt-14 pb-7 px-6 md:px-12 mt-auto font-sans border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <rect x="2" y="14" width="3" height="4" rx="1" fill="white" />
                                    <rect x="7" y="10" width="3" height="8" rx="1" fill="white" opacity="0.7" />
                                    <rect x="12" y="6" width="3" height="12" rx="1" fill="white" opacity="0.5" />
                                    <rect x="17" y="2" width="1" height="16" rx="0.5" fill="white" opacity="0.3" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold text-foreground tracking-tight">
                                Height<span className="text-accent">Comparison</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-muted max-w-[280px]">
                            The most intuitive way to visualize and compare heights side by side. Add real people, celebrities, fictional characters, or any custom height and see them together instantly.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted">Free to use</span>
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted">No account needed</span>
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface border border-border text-muted">Metric & Imperial</span>
                        </div>
                    </div>

                    {/* Calculators Column */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Calculators</p>
                        <ul className="flex flex-col gap-2.5">
                            <FooterLink href="/child-height-calculator">Child Height Calculator</FooterLink>
                            <FooterLink href="/height-weight-percentile-calculator">Height Weight Percentile</FooterLink>
                            <FooterLink href="/ideal-body-weight-calculator">Ideal Body Weight</FooterLink>
                            <FooterLink href="/height-difference-calculator">Height Difference</FooterLink>
                            <FooterLink href="/average-height-by-country">Average Height by Country</FooterLink>
                            <FooterLink href="/image-to-height">Image to Height</FooterLink>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Company</p>
                        <ul className="flex flex-col gap-2.5">
                            <FooterLink href="/about">About</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/contact">Contact Us</FooterLink>
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/terms">Terms of Service</FooterLink>
                            <FooterLink href="/sitemap">Sitemap</FooterLink>
                        </ul>
                    </div>
                </div>

                <hr className="border-none border-t border-border mb-6 opacity-50" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
                    <p className="text-[13px] text-muted/80">
                        © {new Date().getFullYear()} HeightComparison. All rights reserved. Built with care by <Link href="#" className="text-accent hover:underline">the team</Link>.
                    </p>
                    <div className="flex gap-5">
                        <Link href="/privacy" className="text-[13px] text-muted/80 hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[13px] text-muted/80 hover:text-foreground transition-colors">Terms</Link>
                        <Link href="/cookies" className="text-[13px] text-muted/80 hover:text-foreground transition-colors">Cookies</Link>
                    </div>
                    <div className="flex gap-3">
                        <SocialButton title="Twitter / X">
                            <path d="M16.99 3H14.54L10 8.81 6.11 3H1l6.83 9.54L1.5 19h2.46l4.87-5.64L12.85 19H18l-7.17-9.95L16.99 3zm-2.64 14.13-10.1-14h1.94l10.1 14h-1.94z" />
                        </SocialButton>
                        <SocialButton title="Reddit">
                            <path d="M18 10a2 2 0 0 0-2-2 2 2 0 0 0-1.38.55C13.2 7.87 11.73 7.5 10 7.5c-.06 0-.12 0-.19.01l-.85-3.97 2.74-.57a1.25 1.25 0 1 0-.13-.93L8.6 2.67 7.55 7.52C5.82 7.54 4.37 7.91 3.38 8.55A2 2 0 0 0 2 10a2 2 0 0 0 .92 1.68 3.94 3.94 0 0 0-.04.53c0 2.7 3.17 4.9 7.07 4.9s7.07-2.2 7.07-4.9a3.94 3.94 0 0 0-.04-.53A2 2 0 0 0 18 10zm-11.5 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.57 2.65c-.5.5-1.5.68-2.07.68s-1.57-.18-2.07-.68a.3.3 0 0 1 .42-.42c.34.34 1.08.5 1.65.5s1.31-.16 1.65-.5a.3.3 0 0 1 .42.42zm-.57-1.65a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                        </SocialButton>
                        <SocialButton title="Instagram">
                            <path d="M10 2c2.17 0 2.44.01 3.3.05 2.8.13 4.12 1.46 4.25 4.25.04.86.05 1.13.05 3.3 0 2.17-.01 2.44-.05 3.3-.13 2.79-1.44 4.12-4.25 4.25-.86.04-1.12.05-3.3.05-2.17 0-2.44-.01-3.3-.05C3.91 17.02 2.58 15.7 2.45 12.9 2.41 12.04 2.4 11.77 2.4 9.6c0-2.17.01-2.44.05-3.3C2.58 3.51 3.91 2.18 6.7 2.05 7.56 2.01 7.83 2 10 2zm0 1.44c-2.13 0-2.38.01-3.22.05-2.14.1-3.14 1.1-3.24 3.24C3.5 7.57 3.49 7.82 3.49 9.6c0 1.78.01 2.03.05 2.87.1 2.13 1.1 3.14 3.24 3.24.84.04 1.09.05 3.22.05s2.38-.01 3.22-.05c2.13-.1 3.14-1.1 3.24-3.24.04-.84.05-1.09.05-2.87 0-1.78-.01-2.03-.05-2.87C16.14 4.6 15.13 3.59 13 3.49c-.84-.04-1.09-.05-3-.05zm0 2.44a3.72 3.72 0 1 1 0 7.44 3.72 3.72 0 0 1 0-7.44zM10 12a2.28 2.28 0 1 0 0-4.56A2.28 2.28 0 0 0 10 12zm4.4-6.6a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76z" />
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
    <button title={title} className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center cursor-pointer transition-all hover:border-accent hover:bg-accent/10 group">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] fill-muted group-hover:fill-accent transition-colors">
            {children}
        </svg>
    </button>
);

export default Footer;
