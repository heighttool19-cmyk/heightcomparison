'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, Box, ArrowLeftRight } from 'lucide-react';
import { useThemeStore, useUnitStore } from '@/store';
import { useEffect } from 'react';

interface NavbarProps {
    activePage: 'home' | 'child-height-calculator' | 'image-to-height' | 'about';
}

const Navbar: React.FC<NavbarProps> = ({ activePage }) => {
    const { theme, toggleTheme } = useThemeStore();
    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`h-[70px] shrink-0 border-b flex items-center justify-between px-6 sm:px-12 z-50 sticky top-0 transition-all duration-300 ${scrolled
            ? 'bg-bg/80 backdrop-blur-md border-border/80 shadow-lg'
            : 'bg-bg border-border/50 shadow-none'
            }`}>
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
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
                {/* Desktop Link Highlights (Hidden on Mobile) */}
                <nav className="hidden lg:flex items-center gap-10 mr-4">
                    <Link
                        href="/"
                        className={`text-[15px] font-medium transition-colors ${activePage === 'home' ? 'text-accent font-bold border-b-2 border-accent pb-1' : 'text-muted hover:text-foreground'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/child-height-calculator"
                        className={`text-[15px] font-medium transition-colors ${activePage === 'child-height-calculator' ? 'text-accent font-bold border-b-2 border-accent pb-1' : 'text-muted hover:text-foreground'}`}
                    >
                        Child Height Calculator
                    </Link>
                    <Link
                        href="/image-to-height"
                        className={`text-[15px] font-medium transition-colors flex items-center gap-2 ${activePage === 'image-to-height' ? 'text-accent font-bold border-b-2 border-accent pb-1' : 'text-muted hover:text-foreground'}`}
                    >
                        Image to Height <Box size={14} />
                    </Link>
                    <Link
                        href="/about"
                        className={`text-[15px] font-medium transition-colors ${activePage === 'about' ? 'text-accent font-bold border-b-2 border-accent pb-1' : 'text-muted hover:text-foreground'}`}
                    >
                        About
                    </Link>
                </nav>

                {/* Unit Toggle - Desktop Only */}
                <button
                    onClick={toggleUnitSystem}
                    className="hidden lg:flex items-center justify-center gap-2 group hover:bg-item-hover px-3 py-2 rounded-xl transition-all border border-border bg-surface w-[85px] sm:w-[95px] shrink-0"
                    title="Toggle unit system"
                >
                    <ArrowLeftRight size={14} className="text-muted/50 group-hover:text-accent shrink-0" />
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-muted group-hover:text-foreground">
                        {unitSystem === 'metric' ? 'cm' : 'ft/in'}
                    </span>
                </button>

                {/* Theme Toggle - Visible on Mobile and Desktop */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-muted hover:text-foreground hover:bg-surface/50 rounded-full transition-colors flex items-center justify-center"
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

                {/* Mobile Hamburger Menu */}
                <div className="relative lg:hidden">
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
                                {/* Overlay to close menu */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsNavMenuOpen(false)}
                                    className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="absolute right-0 mt-3 w-64 bg-[#111111] border border-white/10 rounded-3xl shadow-2xl p-4 z-[60] overflow-hidden"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Link href="/" onClick={() => setIsNavMenuOpen(false)}>
                                            <button className={`w-full text-left px-4 py-3 text-base font-bold rounded-2xl transition-all ${activePage === 'home' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>Home</button>
                                        </Link>
                                        <Link href="/child-height-calculator" onClick={() => setIsNavMenuOpen(false)}>
                                            <button className={`w-full text-left px-4 py-3 text-base font-bold rounded-2xl transition-all ${activePage === 'child-height-calculator' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>Child Height Calculator</button>
                                        </Link>
                                        <Link href="/image-to-height" onClick={() => setIsNavMenuOpen(false)}>
                                            <button className={`w-full text-left px-4 py-3 text-base font-bold rounded-2xl transition-all flex items-center justify-between ${activePage === 'image-to-height' ? 'text-[#22C55E] bg-[#22C55E]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                                Image to Height <Box size={18} className={activePage === 'image-to-height' ? 'text-[#22C55E]' : ''} />
                                            </button>
                                        </Link>
                                        <Link href="/about" onClick={() => setIsNavMenuOpen(false)}>
                                            <button className={`w-full text-left px-4 py-3 text-base font-bold rounded-2xl transition-all ${activePage === 'about' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>About</button>
                                        </Link>
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
