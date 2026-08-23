'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, Menu, ArrowLeftRight, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useThemeStore, useUnitStore, useUIStore } from '@/store';
import ThemeInitializer from './ThemeInitializer';

// 1. DATA-DRIVEN CONFIGURATION: Add future tools here once, and they populate everywhere automatically.
type NavItem = {
    label: string;
    href?: string;
    id?: string;
    isSpecial?: boolean;
    children?: { label: string; href: string; id: string; isSpecial?: boolean }[];
};

const NAVIGATION: NavItem[] = [
    { label: 'Home', href: '/', id: 'home' },
    {
        label: 'Tools & Calculators',
        // Grouping these saves horizontal space on desktop and cleans up mobile
        children: [
            { label: 'Height Predictor', href: '/height-predictor', id: 'height-predictor' },
            { label: 'Height Weight Percentile Calculator', href: '/height-weight-percentile-calculator', id: 'height-weight-percentile-calculator' },
            { label: 'Ideal Body Weight Calculator', href: '/ideal-body-weight-calculator', id: 'ideal-body-weight-calculator' },
            { label: 'Average Height by Country', href: '/average-height-by-country', id: 'average-height-by-country' },
            { label: 'Height Difference Calculator', href: '/height-difference-calculator', id: 'height-difference-calculator' },
            { label: 'Image to Height', href: '/image-to-height', id: 'image-to-height' },
        ]
    },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Blogs', href: '/blogs', id: 'blogs' },
];

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const activePage = pathname === '/' ? 'home' : pathname.split('/').pop() || 'home';
    const { theme, toggleTheme } = useThemeStore();
    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const { isCustomFullscreen } = useUIStore();
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileToolsOpen, setMobileToolsOpen] = useState(true); // Keeps mobile accordion open by default

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to check if a dropdown group contains the currently active page
    const isGroupActive = (children: { id: string }[]) => children.some(child => child.id === activePage);

    if (isCustomFullscreen || pathname?.startsWith('/studio')) return null;

    return (
        <>
            <ThemeInitializer />
            <header className={`h-[60px] shrink-0 border-b flex items-center justify-between px-4 sm:px-8 xl:px-12 z-300  top-0 transition-all duration-300 ${scrolled
                ? 'bg-bg/80 backdrop-blur-md border-border/80 shadow-lg'
                : 'bg-bg border-border/50 shadow-none'
                }`}>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"

                        />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors whitespace-nowrap">
                        Height<span className="text-accent"> Comparison</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">

                    {/* --- DESKTOP NAVIGATION --- */}
                    {/* Changed to lg:flex because grouping the links saves massive horizontal space */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mr-2">
                        {NAVIGATION.map((item, idx) => {
                            // Render Dropdown for Groups
                            if (item.children) {
                                const active = isGroupActive(item.children);
                                return (
                                    <div key={idx} className="relative group py-4">
                                        <button
                                            className={`flex items-center gap-1.5 whitespace-nowrap text-[14px] 2xl:text-[15px] font-extrabold transition-colors ${active ? 'text-accent' : 'text-muted hover:text-foreground'}`}
                                            aria-expanded={active}
                                            aria-haspopup="true"
                                            aria-label={item.label}
                                        >
                                            {item.label}
                                            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                        </button>

                                        {/* Dropdown Panel (CSS-based for zero-latency performance) */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                                            <div className="bg-surface border border-border shadow-xl rounded-2xl p-2 min-w-[260px] flex flex-col gap-1">
                                                {item.children.map(child => (
                                                    <Link
                                                        key={child.id}
                                                        href={child.href}
                                                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${activePage === child.id
                                                            ? (child.isSpecial ? 'text-[#22C55E] bg-[#22C55E]/10' : 'text-accent bg-accent/10')
                                                            : (child.isSpecial ? 'text-[#22C55E] hover:bg-bg/80' : 'text-muted hover:text-foreground hover:bg-bg/80')}`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Render Standard Links
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href!}
                                    className={`whitespace-nowrap text-[14px] 2xl:text-[15px] font-extrabold transition-colors ${activePage === item.id ? 'text-accent border-b-2 border-accent pb-1' : 'text-muted hover:text-foreground'}`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Unit Toggle (Desktop) */}
                    <button
                        onClick={toggleUnitSystem}
                        className="
        hidden md:flex items-center justify-center gap-2 group 
        px-3 py-2 rounded-xl transition-all shrink-0
        bg-surface border-2 w-[130px] sm:w-[180px]
        
        /* Uses your theme's accent color (Green in Dark / Blue in Light) */
        border-accent/40 hover:border-accent
        
        /* Fluorescent Effect using your CSS accent variable */
        shadow-[0_0_15px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] 
        hover:shadow-[0_0_25px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] 
        
        animate-pulse-subtle
    "
                        title={`Switch to ${unitSystem === 'metric' ? 'Imperial' : 'Metric'}`}
                        aria-label={`Current unit system: ${unitSystem === 'metric' ? 'Metric' : 'Imperial'}. Click to toggle.`}
                    >
                        <ArrowLeftRight
                            size={14}
                            className="text-accent group-hover:scale-110 transition-transform shrink-0"
                        />

                        <span className="inline-block px-2 py-1 rounded-md bg-accent/10 border border-accent/20 group-hover:bg-accent transition-colors">
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-accent group-hover:text-bg whitespace-nowrap">
                                {unitSystem === 'metric' ? 'metric (cm)' : 'imperial (ft/in)'}
                            </span>
                        </span>
                    </button>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-muted hover:text-foreground hover:bg-surface/50 rounded-full transition-colors flex items-center justify-center shrink-0 w-10 h-10 relative overflow-hidden"
                        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                        aria-label={`Current theme: ${theme}. Click to toggle theme.`}
                    >
                        <div className="relative w-5 h-5 flex items-center justify-center">
                            <Moon size={20} className={`absolute transition-all duration-300 ease-in-out ${theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`} />
                            <Sun size={20} className={`absolute transition-all duration-300 ease-in-out ${theme === 'light' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
                        </div>
                    </button>

                    {/* --- MOBILE NAVIGATION DRAWER --- */}
                    <div className="relative lg:hidden shrink-0">
                        <button
                            className="p-2 text-muted hover:text-foreground transition-colors focus:outline-none relative z-[60]"
                            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Overlay */}
                        <div
                            className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isNavMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                            onClick={() => setIsNavMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <div
                            className={`absolute right-0 mt-3 w-80 max-w-[90vw] bg-[#111111] border border-white/10 rounded-3xl shadow-2xl p-4 z-[60] overflow-hidden origin-top-right transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.1)] ${isNavMenuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 translate-y-4 invisible pointer-events-none'}`}
                        >
                            <div className="flex flex-col gap-2">

                                {/* Dynamic Mobile Mapping */}
                                {NAVIGATION.map((item, idx) => {

                                    // Render Mobile Accordion
                                    if (item.children) {
                                        return (
                                            <div key={idx} className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                                                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-2xl transition-all text-gray-400 hover:text-white hover:bg-white/5"
                                                >
                                                    {item.label}
                                                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                <div className={`overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileToolsOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <div className="flex flex-col gap-1 pl-4 border-l border-white/10 ml-4 mb-2 mt-1">
                                                            {item.children.map(child => (
                                                                <Link key={child.id} href={child.href} onClick={() => setIsNavMenuOpen(false)}>
                                                                    <button className={`w-full text-left px-4 py-3 text-sm font-bold rounded-2xl transition-all flex items-center justify-between ${activePage === child.id ? (child.isSpecial ? 'text-[#22C55E] bg-[#22C55E]/10' : 'text-white bg-white/10') : (child.isSpecial ? 'text-[#22C55E] hover:bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5')}`}>
                                                                        {child.label}
                                                                    </button>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // Render Mobile Standard Link
                                    return (
                                        <Link key={item.id} href={item.href!} onClick={() => setIsNavMenuOpen(false)}>
                                            <button className={`w-full text-left px-4 py-3 text-sm font-bold rounded-2xl transition-all ${activePage === item.id ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                                {item.label}
                                            </button>
                                        </Link>
                                    );
                                })}

                                <div className="h-px w-full bg-white/10 my-2" />
                                {/* Mobile Unit Toggle */}
                                <button
                                    onClick={() => { toggleUnitSystem(); setIsNavMenuOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-sm font-bold rounded-2xl transition-all text-gray-400 hover:text-white hover:bg-white/10 md:hidden flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span>Switch to</span>
                                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-wider text-white group-hover:bg-white/20 transition-colors">
                                            {unitSystem === 'metric' ? 'Imperial (ft/in)' : 'Metric (cm)'}
                                        </span>
                                    </div>
                                    <ArrowLeftRight size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;