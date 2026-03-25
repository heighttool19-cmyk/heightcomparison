'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, ArrowLeftRight, ChevronDown } from 'lucide-react';
import { useThemeStore, useUnitStore } from '@/store';

interface NavbarProps {
    // Relaxed to string to allow future scalability without breaking TypeScript when you add new pages
    activePage: string;
}

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
            { label: 'Child Height Calculator', href: '/child-height-calculator', id: 'child-height-calculator' },
            { label: 'Height Weight Percentile Calculator', href: '/height-weight-percentile-calculator', id: 'height-weight-percentile-calculator' },
            { label: 'Ideal Body Weight Calculator', href: '/ideal-body-weight-calculator', id: 'ideal-body-weight-calculator' },
            { label: 'Height Difference Calculator', href: '/height-difference-calculator', id: 'height-difference-calculator' },
            { label: 'Image to Height', href: '/image-to-height', id: 'image-to-height' },
        ]
    },
    { label: 'About', href: '/about', id: 'about' },
];

const Navbar: React.FC<NavbarProps> = ({ activePage }) => {
    const { theme, toggleTheme } = useThemeStore();
    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileToolsOpen, setMobileToolsOpen] = useState(true); // Keeps mobile accordion open by default

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to check if a dropdown group contains the currently active page
    const isGroupActive = (children: any[]) => children.some(child => child.id === activePage);

    return (
        <header className={`h-[70px] shrink-0 border-b flex items-center justify-between px-4 sm:px-8 xl:px-12 z-300 sticky top-0 transition-all duration-300 ${scrolled
            ? 'bg-bg/80 backdrop-blur-md border-border/80 shadow-lg'
            : 'bg-bg border-border/50 shadow-none'
            }`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20">
                    <div className="flex items-end gap-[2px] h-4">
                        <div className="w-1.5 h-full bg-white rounded-t-sm" />
                        <div className="w-1.5 h-2/3 bg-white rounded-t-sm" />
                        <div className="w-1.5 h-1/3 bg-white rounded-t-sm" />
                    </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors whitespace-nowrap">
                    Height<span className="text-[#3B82F6]">Comparison</span>
                </h1>
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
                                    <button className={`flex items-center gap-1.5 whitespace-nowrap text-[14px] 2xl:text-[15px] font-extrabold transition-colors ${active ? 'text-accent' : 'text-muted hover:text-foreground'}`}>
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
                    className="hidden md:flex items-center justify-center gap-2 group hover:bg-item-hover px-3 py-2 rounded-xl transition-all border border-border bg-surface w-[85px] sm:w-[95px] shrink-0"
                    title="Toggle unit system"
                >
                    <ArrowLeftRight size={14} className="text-muted/50 group-hover:text-accent shrink-0" />
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-muted group-hover:text-foreground whitespace-nowrap">
                        {unitSystem === 'metric' ? 'cm' : 'ft/in'}
                    </span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-muted hover:text-foreground hover:bg-surface/50 rounded-full transition-colors flex items-center justify-center shrink-0"
                    title="Toggle Theme"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {theme === 'dark' ? (
                            <motion.div key="moon" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                                <Moon size={18} />
                            </motion.div>
                        ) : (
                            <motion.div key="sun" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                                <Sun size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                {/* --- MOBILE NAVIGATION DRAWER --- */}
                <div className="relative lg:hidden shrink-0">
                    <button
                        className="p-2 text-muted hover:text-foreground transition-colors focus:outline-none"
                        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <Menu size={24} />
                    </button>

                    <AnimatePresence>
                        {isNavMenuOpen && (
                            <>
                                {/* Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsNavMenuOpen(false)}
                                    className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
                                />

                                {/* Menu Panel */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-[#111111] border border-white/10 rounded-3xl shadow-2xl p-4 z-[60] overflow-hidden"
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
                                                        <AnimatePresence initial={false}>
                                                            {mobileToolsOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden flex flex-col gap-1 pl-4 border-l border-white/10 ml-4 mb-2"
                                                                >
                                                                    {item.children.map(child => (
                                                                        <Link key={child.id} href={child.href} onClick={() => setIsNavMenuOpen(false)}>
                                                                            <button className={`w-full text-left px-4 py-3 text-sm font-bold rounded-2xl transition-all flex items-center justify-between ${activePage === child.id ? (child.isSpecial ? 'text-[#22C55E] bg-[#22C55E]/10' : 'text-white bg-white/10') : (child.isSpecial ? 'text-[#22C55E] hover:bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5')}`}>
                                                                                {child.label}
                                                                            </button>
                                                                        </Link>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
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
                                            className="w-full text-left px-4 py-3 text-sm font-bold rounded-2xl transition-all text-gray-400 hover:text-white hover:bg-white/5 md:hidden flex items-center justify-between"
                                        >
                                            Switch to {unitSystem === 'metric' ? 'Imperial (ft/in)' : 'Metric (cm)'}
                                            <ArrowLeftRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Navbar;