'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Download, UserPlus, Star, Box, ImageIcon, Check, Plus, X, Sun, Moon, Menu, Link, ArrowLeftRight, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { Person, AppState, DEFAULT_PERSONS, uid } from '../types';
import { useUnitStore, useThemeStore } from '../store';
import PersonBar from './PersonBar';
import Ruler from './Ruler';
import Sidebar from './Sidebar';

type PanelType = 'ADD_PERSON' | 'CELEBRITIES' | 'ENTITIES' | 'ADD_IMAGE' | 'EDIT_PERSON';

const HeightDashboard: React.FC = () => {
    // 1. URL Hash decoding (Lazy Initializer)
    const [state, setState] = useState<AppState>(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            try {
                const hash = window.location.hash.slice(1);
                const decoded = JSON.parse(decodeURIComponent(atob(hash)));

                // Hydrate Zustand from URL if present
                if (decoded.unitSystem) {
                    useUnitStore.setState({ unitSystem: decoded.unitSystem });
                }

                return {
                    persons: decoded.persons || DEFAULT_PERSONS,
                    zoom: decoded.zoom || 1.0,
                };
            } catch (e) {
                console.error("Hash decode failed, using fallback:", e);
                return {
                    persons: [{ id: uid(), name: 'Person 1', heightCm: 175, color: '#6366F1', gender: 'male' }],
                    zoom: 1.0,
                };
            }
        }
        return {
            persons: DEFAULT_PERSONS,
            zoom: 1.0,
        };
    });

    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const { theme, toggleTheme } = useThemeStore();

    const [canvasHeight, setCanvasHeight] = useState(0);
    const [activePanel, setActivePanel] = useState<PanelType>('ADD_PERSON');
    const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Apply the theme to the <html> document root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // 2. URL Hash Encoding Sync
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const encoded = btoa(encodeURIComponent(JSON.stringify({
                persons: state.persons,
                unitSystem,
                zoom: state.zoom
            })));
            window.history.replaceState(null, '', `#${encoded}`);
        }
    }, [state, unitSystem]);

    // Pinch Zoom Tracking
    const touchStartRef = useRef<number | null>(null);
    // const initialZoomRef = useRef<number>(1);

    // ResizeObserver & Wheel Events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setCanvasHeight(entry.contentRect.height);
                if (window.innerWidth >= 768) {
                    setIsMobileDrawerOpen(false);
                }
            }
        });
        observer.observe(container);

        // Ctrl + Mouse Wheel Zoom logic
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                // Positive delta = Scroll Down = Zoom Out
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setState(s => ({
                    ...s,
                    zoom: Math.max(0.25, Math.min(8.00, s.zoom + delta))
                }));
            }
        };
        container.addEventListener('wheel', handleWheel, { passive: false });

        // Touch Pinch Zoom logic
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                touchStartRef.current = dist;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2 && touchStartRef.current !== null) {
                e.preventDefault(); // Prevent standard page zoom
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );

                setState(s => {
                    if (touchStartRef.current === null) return s;
                    const ratio = dist / touchStartRef.current;
                    const newZoom = Math.max(0.25, Math.min(8.00, s.zoom * ratio));
                    touchStartRef.current = dist; // Update start for smooth continuous translation
                    return { ...s, zoom: newZoom };
                });
            }
        };

        const handleTouchEnd = () => {
            touchStartRef.current = null;
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            observer.disconnect();
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    // Zoom Boundaries
    const MIN_ZOOM = 0.25;
    const MAX_ZOOM = 8.00;

    const handleZoom = (delta: number) => {
        setState(s => {
            const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, s.zoom + delta));
            return { ...s, zoom: newZoom };
        });
    };

    // Handle Zoom via Mouse Wheel (with Ctrl Key) and Touch Pinch
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let initialPinchDist = 0;
        let startZoom = 0;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                handleZoom(delta);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                // Not calling e.preventDefault() here to let user pan if they want, 
                // but pinch usually implies preventDefault in touchmove
                initialPinchDist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                startZoom = state.zoom;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2 && initialPinchDist > 0) {
                e.preventDefault();
                const currentDist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                const ratio = currentDist / initialPinchDist;
                const newZoom = startZoom * ratio;
                setState(prev => ({
                    ...prev,
                    zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom))
                }));
            }
        };

        const handleTouchEnd = () => {
            initialPinchDist = 0;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [state.zoom]); // We depend on state.zoom for starting pinch zoom accurately

    const handleAutoScale = () => {
        if (state.persons.length === 0 || canvasHeight === 0) return;
        const heights = state.persons.map(p => p.heightCm);
        const maxHeightCm = Math.max(180, ...heights);

        // Slightly more conservative on mobile (lower targetHeightPx)
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const targetHeightPx = canvasHeight * (isMobile ? 0.65 : 0.75);

        const fitScale = Math.max(0, (canvasHeight - 200) / maxHeightCm);

        if (fitScale > 0) {
            const idealZoom = targetHeightPx / (maxHeightCm * fitScale);
            setState(s => ({
                ...s,
                zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, idealZoom))
            }));
        }
    };

    // Auto-zoom Guard logic
    const applyAutoZoomGuard = (currentPersons: Person[], currentHeight: number, currentZoom: number) => {
        if (currentPersons.length === 0 || currentHeight === 0) return currentZoom;
        const heights = currentPersons.map(p => p.heightCm);
        const maxHeightCm = Math.max(210, ...heights);
        const fitScale = Math.max(0, (currentHeight - 200) / maxHeightCm);

        const shortestPx = Math.min(...heights) * fitScale * currentZoom;
        if (shortestPx > 0 && shortestPx < 80) {
            // Increase zoom to make shortest exactly 80px, but clamp to max
            // Guard never decreases user-set zoom
            const requiredZoom = 80 / (Math.min(...heights) * fitScale);
            return Math.max(currentZoom, Math.min(MAX_ZOOM, requiredZoom));
        }
        return currentZoom;
    };

    const addPerson = (person: Person) => {
        setState(s => {
            const tempPersons = [...s.persons, person];
            const guardedZoom = applyAutoZoomGuard(tempPersons, canvasHeight, s.zoom);
            return { ...s, persons: tempPersons, zoom: guardedZoom };
        });
    };

    const removePerson = (id: string) => {
        setState(s => {
            const tempPersons = s.persons.filter(p => p.id !== id);
            return { ...s, persons: tempPersons };
        });
    };

    const updatePersonHeight = (id: string, newHeightCm: number) => {
        setState(s => {
            const clamped = Math.min(400, Math.max(50, newHeightCm));
            const tempPersons = s.persons.map(p => p.id === id ? { ...p, heightCm: clamped } : p);
            const guardedZoom = applyAutoZoomGuard(tempPersons, canvasHeight, s.zoom);
            return { ...s, persons: tempPersons, zoom: guardedZoom };
        });
    };

    const handleEditRequest = (id: string) => {
        setEditingPersonId(id);
        setActivePanel('EDIT_PERSON');
        setIsSidebarCollapsed(false);
        if (window.innerWidth < 768) {
            setIsMobileDrawerOpen(true);
        }
    };

    const handleEditSave = (updatedPerson: Person) => {
        setState(s => {
            const tempPersons = s.persons.map(p => p.id === updatedPerson.id ? updatedPerson : p);
            const guardedZoom = applyAutoZoomGuard(tempPersons, canvasHeight, s.zoom);
            return { ...s, persons: tempPersons, zoom: guardedZoom };
        });
        setActivePanel('ADD_PERSON');
        setEditingPersonId(null);
        if (window.innerWidth < 768) {
            setIsMobileDrawerOpen(false);
        }
    };

    const handleEditCancel = () => {
        setActivePanel('ADD_PERSON');
        setEditingPersonId(null);
    };

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            triggerToast('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleDownloadPNG = async () => {
        if (!containerRef.current) return;
        try {
            setIsCapturing(true);
            triggerToast('Generating your height comparison...');
            document.body.classList.add('is-capturing');

            // Wait a tick for CSS to apply (hiding inline inputs etc)
            await new Promise(resolve => setTimeout(resolve, 800));

            const dataUrl = await htmlToImage.toPng(containerRef.current, {
                pixelRatio: 2,
                backgroundColor: theme === 'dark' ? '#101011' : '#FAFAFA'
            });

            const link = document.createElement('a');
            link.download = `height-comparison-${new Date().getTime()}.png`;
            link.href = dataUrl;
            link.click();

            setTimeout(() => triggerToast('Image downloaded successfully!'), 500);
        } catch (error) {
            console.error('Failed to generate PNG', error);
            triggerToast('Failed to generate image. Please try again.');
        } finally {
            setIsCapturing(false);
            document.body.classList.remove('is-capturing');
        }
    };

    // Scale Engine Calculation
    const scale = useMemo(() => {
        if (canvasHeight === 0) return 0;
        const heights = state.persons.length > 0 ? state.persons.map(p => p.heightCm) : [0];
        const maxHeightCm = Math.max(210, ...heights);
        const fitScale = Math.max(0, (canvasHeight - 200) / maxHeightCm); // Reserve space for toolbars/padding
        return fitScale * state.zoom;
    }, [canvasHeight, state.persons, state.zoom]);

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden font-sans text-foreground selection:bg-accent/20 transition-colors duration-500">
            {/* 1. Global Top Header (New Navbar design) */}
            <motion.header
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[70px] shrink-0 border-b border-border/50 bg-background flex items-center justify-between px-6 sm:px-12 z-50"
            >
                {/* Left side: Logo & Brands */}
                <div className="flex items-center gap-3 cursor-pointer">
                    {/* Logo Graphic */}
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20">
                        <div className="flex items-end gap-[2px] h-4">
                            <div className="w-1.5 h-full bg-white rounded-t-sm" />
                            <div className="w-1.5 h-2/3 bg-white rounded-t-sm" />
                            <div className="w-1.5 h-1/3 bg-white rounded-t-sm" />
                        </div>
                    </div>
                    {/* Brand Name */}
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors">
                        Height<span className="text-[#3B82F6]">Comparison</span>
                    </h1>
                </div>

                {/* Center: Navigation Links (Desktop only) */}
                <nav className="hidden lg:flex items-center gap-10">
                    <button className="text-[15px] font-medium text-muted hover:text-foreground transition-colors">Home</button>
                    <button className="text-[15px] font-medium text-foreground transition-colors">Calculator</button>
                    <button className="text-[15px] font-medium text-muted hover:text-foreground transition-colors">About</button>
                </nav>

                {/* Right side: Auth & Theme */}
                <div className="flex items-center gap-6">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-muted hover:text-foreground hover:bg-surface/50 rounded-full transition-colors flex items-center justify-center"
                        title="Toggle Theme"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {theme === 'dark' ? (
                                <motion.div key="moon" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon size={20} />
                                </motion.div>
                            ) : (
                                <motion.div key="sun" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* <button className="hidden sm:block text-[15px] font-medium text-muted hover:text-foreground transition-colors">
                        Login
                    </button>
                    <button className="hidden sm:flex bg-[#3B82F6] hover:bg-blue-500 text-white font-semibold text-[15px] px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        Sign Up
                    </button> */}
                    {/* Mobile Hamburger Menu */}
                    <div className="relative">
                        <button
                            className="lg:hidden p-2 text-muted hover:text-foreground transition-colors -ml-2"
                            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                        >
                            <Menu size={24} />
                        </button>

                        <AnimatePresence>
                            {isNavMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-2xl shadow-2xl p-2 z-[60] lg:hidden"
                                >
                                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsNavMenuOpen(false)}>Home</button>
                                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground bg-accent/10 rounded-xl transition-colors" onClick={() => setIsNavMenuOpen(false)}>Calculator</button>
                                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsNavMenuOpen(false)}>About</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.header>

            {/* Main Application Area */}
            <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row custom-scrollbar bg-background transition-colors duration-500">

                {/* 2. Left Native Menu (Desktop) / Top Menu (Mobile) */}
                <motion.aside
                    initial={{ x: -85, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="
                    shrink-0 w-full h-[80px] bg-background border-b overflow-hidden border-border/50 z-40
                    flex overflow-x-auto overflow-y-hidden gap-0 custom-scrollbar
                    sm:static sm:w-[85px] sm:overflow-y-auto sm:overflow-x-hidden sm:h-full sm:border-b-0 sm:border-r sm:flex-col sm:py-0 sm:px-0 sm:gap-0
                ">
                    <motion.div
                        className="flex sm:flex-col h-full w-full"
                        variants={{
                            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                            hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        <LeftNavItem icon={<UserPlus size={22} />} label="ADD PERSON" active={activePanel === 'ADD_PERSON'} onClick={() => { setActivePanel('ADD_PERSON'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                        <LeftNavItem icon={<Star size={22} />} label="CELEBRITIES" active={activePanel === 'CELEBRITIES'} onClick={() => { setActivePanel('CELEBRITIES'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                        <LeftNavItem icon={<Box size={22} />} label="ENTITIES" active={activePanel === 'ENTITIES'} onClick={() => { setActivePanel('ENTITIES'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                        <LeftNavItem icon={<ImageIcon size={22} />} label="ADD IMAGE" active={activePanel === 'ADD_IMAGE'} onClick={() => { setActivePanel('ADD_IMAGE'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                    </motion.div>
                </motion.aside>
                {/* Center Column: Canvas */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    className="flex-1 flex flex-col relative min-w-0 bg-canvas min-h-[500px] xl:min-h-0 transition-colors duration-500 pb-14"
                >
                    {/* Top Canvas Toolbar */}
                    <div className="order-2 sm:order-first px-4 sm:px-8 py-4 z-30">
                        <div className="w-full flex items-center justify-between bg-toolbar-bg border border-toolbar-border rounded-2xl py-3 px-4 sm:px-6 backdrop-blur-md shadow-2xl overflow-x-auto custom-scrollbar flex-nowrap">

                            {/* Left Side: Units & Zoom Group */}
                            <div className="flex items-center gap-4 sm:gap-6">

                                {/* 1. UNIT TOGGLE (Now First) */}
                                <button
                                    onClick={toggleUnitSystem}
                                    className="shrink-0 flex items-center gap-2 group hover:bg-item-hover px-3 py-2 rounded-xl transition-all"
                                >
                                    <ArrowLeftRight size={18} className="text-muted/50 group-hover:text-accent" />
                                    <span className="text-xs font-semibold text-muted group-hover:text-foreground whitespace-nowrap">
                                        {unitSystem === 'metric' ? 'cm → ft/in' : 'ft/in → cm'}
                                    </span>
                                </button>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-6 bg-white/10 shrink-0" />

                                {/* 2. Zoom Controls Container */}
                                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                                    <button onClick={() => handleZoom(0.1)} className="p-2 text-muted hover:text-foreground hover:bg-item-hover rounded-lg transition-colors" title="Zoom In">
                                        <ZoomIn size={18} strokeWidth={2.5} />
                                    </button>

                                    {/* Zoom Input Box */}
                                    <div className="bg-item-hover rounded-lg px-3 py-2 flex items-center gap-0.5 border border-toolbar-border">
                                        <input
                                            type="number"
                                            value={Math.round(state.zoom * 100)}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                if (!isNaN(val)) {
                                                    setState(s => ({ ...s, zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, val / 100)) }));
                                                }
                                            }}
                                            className="w-8 sm:w-10 bg-transparent text-[11px] sm:text-[13px] font-mono font-bold text-center outline-none text-muted transition-colors focus:text-foreground"
                                        />
                                        <span className="text-[10px] font-bold text-muted/30">%</span>
                                    </div>

                                    <button onClick={() => handleZoom(-0.1)} className="p-2 text-muted hover:text-foreground hover:bg-item-hover rounded-lg transition-colors" title="Zoom Out">
                                        <ZoomOut size={18} strokeWidth={2.5} />
                                    </button>

                                    {/* Sub-actions: Auto & Slider (Preserved) */}
                                    <div className="flex items-center gap-1 ml-2 border-l border-white/10 pl-3">
                                        <button
                                            onClick={handleAutoScale}
                                            className="p-2 text-muted hover:text-primary transition-all rounded-lg hover:bg-white/5"
                                            title="Auto Scale"
                                        >
                                            <Maximize2 size={16} />
                                        </button>

                                        <div className="hidden sm:block px-2">
                                            <input
                                                type="range"
                                                min={MIN_ZOOM}
                                                max={MAX_ZOOM}
                                                step={0.1}
                                                value={state.zoom}
                                                onChange={(e) => setState(s => ({ ...s, zoom: parseFloat(e.target.value) }))}
                                                className="w-24 h-1 bg-border/30 rounded-lg appearance-none cursor-pointer accent-accent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Actions Group */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button onClick={handleShare} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground px-3 py-2 transition-all group">
                                    <Link size={18} className="text-muted/50 group-hover:text-accent transition-colors" />
                                    <span className="hidden sm:inline">Share</span>
                                </button>

                                <button
                                    onClick={handleDownloadPNG}
                                    disabled={isCapturing}
                                    className="flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/5 active:scale-95 disabled:opacity-50 whitespace-nowrap min-w-[140px] justify-center"
                                >
                                    {isCapturing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download size={18} strokeWidth={2.5} />
                                            <span className="hidden sm:inline">Download PNG</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CANVAS AREA */}
                    <div
                        ref={containerRef}
                        className="order-1 canvas-export-area flex-1 relative overflow-x-auto overflow-y-hidden custom-scrollbar chart-grid m-4 rounded-[2rem] border border-border/50 bg-canvas shadow-2xl scroll-smooth"
                    >
                        {/* Unified Absolute Coordinate Grid Container */}
                        <div className="relative min-w-full w-max h-full pl-24 md:pl-40 pr-24 md:pr-48 flex items-end">
                            <Ruler scale={scale} maxHeightCm={state.persons.length > 0 ? Math.max(...state.persons.map(p => p.heightCm)) : 300} canvasHeight={canvasHeight} />

                            <AnimatePresence mode="popLayout" initial={false}>
                                <div className="flex items-end gap-12 md:gap-24 h-full">
                                    {state.persons.map((person) => (
                                        <PersonBar
                                            key={person.id}
                                            person={person}
                                            scale={scale}
                                            onEditRequest={handleEditRequest}
                                            onRemove={removePerson}
                                            onHeightChange={(val) => updatePersonHeight(person.id, val)}
                                        />
                                    ))}

                                    {/* Ghost Column + */}
                                    <div className="flex flex-col items-center justify-end h-full relative group hide-on-export pointer-events-auto shrink-0 pb-[60px]" style={{ width: 'clamp(80px, 15vw, 150px)' }}>
                                        <button
                                            onClick={() => {
                                                setActivePanel('ADD_PERSON');
                                                setIsSidebarCollapsed(false);
                                                if (window.innerWidth < 768) {
                                                    setIsMobileDrawerOpen(true);
                                                }
                                            }}
                                            className="w-[80px] h-[120px] border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-muted hover:text-foreground hover:border-accent transition-colors"
                                        >
                                            <UserPlus size={24} />
                                        </button>
                                    </div>

                                    {/* Dedicated Scroll Spacer */}
                                    <div className="w-20 md:w-40 shrink-0 pointer-events-none" />
                                </div>
                            </AnimatePresence>
                        </div>

                        {state.persons.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-32 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="empty-door flex items-center justify-center"
                                >
                                    <Plus size={40} className="text-muted/20" />
                                </motion.div>
                                <span className="text-xl font-bold tracking-tight text-muted/50 bg-surface/50 px-8 py-3 rounded-2xl border border-border/50 backdrop-blur-md shadow-xl">
                                    Add a person to get started
                                </span>
                            </div>
                        )}
                    </div>
                </motion.main>

                {/* 3. Sidebar - Hidden on tiny Mobile, Visible on sm+ */}
                <div className="hidden sm:flex shrink-0 relative z-30">
                    <motion.div
                        initial={false}
                        animate={{
                            width: isSidebarCollapsed ? 0 : 280,
                            opacity: isSidebarCollapsed ? 0 : 1
                        }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="flex flex-col border-l border-border bg-surface overflow-hidden transition-colors duration-500"
                    >
                        <div className="flex-1 w-[280px] overflow-y-auto custom-scrollbar">
                            <Sidebar
                                persons={state.persons}
                                personCount={state.persons.length}
                                onAdd={addPerson}
                                onRemove={removePerson}
                                scale={scale}
                                zoom={state.zoom}
                                activePanel={activePanel}
                                editingPerson={state.persons.find(p => p.id === editingPersonId)}
                                onEditSave={handleEditSave}
                                onEditCancel={handleEditCancel}
                            />
                        </div>
                    </motion.div>

                    {/* Toggle Button Anchor (Always visible at the edge of the sidebar/canvas) */}
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className={`
                            absolute top-1/2 -translate-y-1/2 w-8 h-12 
                            bg-surface border border-border rounded-l-xl
                            flex items-center justify-center text-muted 
                            hover:text-white hover:bg-accent hover:border-accent
                            transition-all duration-300 shadow-2xl z-50 group
                            right-full translate-x-[1px]
                        `}
                        style={{ borderRight: 'none' }}
                        title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isSidebarCollapsed ? (
                            <ChevronLeft size={18} className="transition-transform group-hover:scale-125 translate-x-0.5" />
                        ) : (
                            <ChevronRight size={18} className="transition-transform group-hover:scale-125 -translate-x-0.5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Share Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface border border-border text-foreground px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50 pointer-events-none"
                    >
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-bold tracking-tight">{toastMessage}</span>
                        <Check size={16} className="text-accent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile FAB */}
            <div className="sm:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsMobileDrawerOpen(true)}
                    className="w-14 h-14 bg-accent hover:bg-accent-secondary rounded-full flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>

            {/* Mobile Bottom Drawer */}
            <AnimatePresence>
                {isMobileDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileDrawerOpen(false)}
                            className="sm:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="sm:hidden fixed bottom-0 left-0 right-0 h-[60vh] bg-surface rounded-t-[16px] z-50 overflow-hidden flex flex-col shadow-2xl border-t border-border"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                                <h3 className="text-xs font-black uppercase tracking-widest text-foreground/80">
                                    {activePanel === 'ADD_PERSON' ? 'Add Subject' :
                                        activePanel === 'ADD_IMAGE' ? 'Add Custom Image' :
                                            activePanel === 'EDIT_PERSON' ? 'Edit Subject' :
                                                activePanel.replace('_', ' ')}
                                </h3>
                                <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 text-muted hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar pb-6 relative">
                                <Sidebar
                                    persons={state.persons}
                                    personCount={state.persons.length}
                                    onAdd={(p) => { addPerson(p); setIsMobileDrawerOpen(false); }}
                                    onRemove={removePerson}
                                    scale={scale}
                                    zoom={state.zoom}
                                    activePanel={activePanel}
                                    editingPerson={state.persons.find(p => p.id === editingPersonId)}
                                    onEditSave={(p) => { handleEditSave(p); setIsMobileDrawerOpen(false); }}
                                    onEditCancel={() => setIsMobileDrawerOpen(false)}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const LeftNavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
    <motion.button
        variants={{
            show: { y: 0, opacity: 1, scale: 1 },
            hidden: { y: 15, opacity: 0, scale: 0.9 }
        }}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`
            flex flex-col items-center justify-center gap-2 py-3 sm:py-6 w-full transition-all border-b-4 sm:border-b-0 sm:border-r-4
            ${active
                ? 'bg-accent/10 text-accent border-accent shadow-sm'
                : 'text-muted hover:text-foreground border-transparent'}
        `}
    >
        <div className={`${active ? 'scale-110' : ''} transition-transform`}>
            {icon}
        </div>
        <span className="text-[10px] font-black tracking-[0.05em] uppercase text-center w-full px-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
        </span>
    </motion.button>
);

export default HeightDashboard;
