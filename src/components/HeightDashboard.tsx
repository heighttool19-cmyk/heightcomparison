'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Download, UserPlus, Star, Box, Ghost, ImageIcon, Check, Plus, X, Link as LinkIcon, ArrowLeftRight, Focus, ChevronLeft, ChevronRight, Mountain as MountainIcon, Trash2, RotateCcw, Edit2, Maximize, Minimize } from 'lucide-react';
import { Person, Entity, Mountain, PanelType } from '../types';
import { useUnitStore, useThemeStore } from '../store';
import PersonBar from './PersonBar';
import Ruler from './Ruler';
import Sidebar from './Sidebar';
import { usePersonStore } from '../store';
import LZString from 'lz-string';



interface HeightDashboardProps {
    readOnly?: boolean;
    onClose?: () => void;
    initialPersons?: Person[];
}

// Help function (Pure) - moved outside to avoid dependency overhead
const applyAutoZoomGuard = (currentPersons: Person[], currentHeight: number, currentZoom: number, MAX_ZOOM: number) => {
    if (currentPersons.length === 0 || currentHeight === 0) return currentZoom;
    const heights = currentPersons.map(p => p.heightCm);
    const maxHeightCm = Math.max(210, ...heights);
    const fitScale = Math.max(0, (currentHeight - 200) / maxHeightCm);

    const shortestPx = Math.min(...heights) * fitScale * currentZoom;
    if (shortestPx > 0 && shortestPx < 80) {
        const requiredZoom = 80 / (Math.min(...heights) * fitScale);
        return Math.max(currentZoom, Math.min(MAX_ZOOM, requiredZoom));
    }
    return currentZoom;
};

const HeightDashboard: React.FC<HeightDashboardProps> = ({ readOnly = false, initialPersons, onClose }) => {
    const {
        persons: storePersons,
        addPerson: storeAddPerson,
        removePerson: storeRemovePerson,
        updatePerson: storeUpdatePerson,
        setPersons: storeSetPersons
    } = usePersonStore();

    const persons = readOnly && initialPersons ? initialPersons : storePersons;
    const [state, setState] = useState({
        zoom: 1.0,
    });

    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const { theme } = useThemeStore();
    const [zoomInput, setZoomInput] = useState(Math.round(state.zoom * 100).toString());
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [activePanel, setActivePanel] = useState<PanelType>('ADD_PERSON');
    const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
    const [highlightYourList, setHighlightYourList] = useState(false);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isHighlightingAddPerson, setIsHighlightingAddPerson] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(readOnly); // Start as hydrated if readOnly as we don't care about hash sync then
    const [activePersonMenuId, setActivePersonMenuId] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const rulerScrollRef = useRef<HTMLDivElement>(null);
    const personsScrollRef = useRef<HTMLDivElement>(null);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };
    useEffect(() => {
        setZoomInput(Math.round(state.zoom * 100).toString());
    }, [state.zoom]);
    const toggleFullscreen = useCallback(() => {
        // iOS Safari does NOT support requestFullscreen() on iPhones.
        // Detect iOS and use a CSS pseudo-fullscreen fallback instead.
        const isIOS = typeof window !== 'undefined' &&
            /iPhone|iPod/.test(navigator.userAgent) &&
            !(window as any).MSStream;

        if (isIOS) {
            // Toggle pseudo-fullscreen state (CSS-based)
            setIsFullscreen(prev => !prev);
            return;
        }

        if (!document.fullscreenElement) {
            if (containerRef.current) {
                containerRef.current.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, []);

    React.useEffect(() => {
        const updateHeight = () => {
            const h = window.innerHeight;
            const mobile = window.innerWidth < 768;
            const isFS = !!document.fullscreenElement;
            // In fullscreen, fill the whole screen. Otherwise, subtract offsets for toolbar/nav.
            setCanvasHeight(isFS ? h : (mobile ? h - 180 : h - 250));
        };
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            updateHeight();
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Sync vertical scroll between ruler and persons panels
    const syncScroll = useCallback((source: 'ruler' | 'persons') => {
        if (source === 'persons' && rulerScrollRef.current && personsScrollRef.current) {
            rulerScrollRef.current.scrollTop = personsScrollRef.current.scrollTop;
        } else if (source === 'ruler' && personsScrollRef.current && rulerScrollRef.current) {
            personsScrollRef.current.scrollTop = rulerScrollRef.current.scrollTop;
        }
    }, []);

    // Apply the theme to the <html> document root
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Handle open-dashboard-panel custom event
    useEffect(() => {
        const handleOpenPanel = (e: Event) => {
            const customEvent = e as CustomEvent<PanelType>;
            if (customEvent.detail) {
                setActivePanel(customEvent.detail);
                setIsSidebarCollapsed(false);
                setIsMobileDrawerOpen(true);
            }
        };

        window.addEventListener('open-dashboard-panel' as any, handleOpenPanel);
        return () => window.removeEventListener('open-dashboard-panel' as any, handleOpenPanel);
    }, []);


    // Pinch Zoom Tracking
    const touchStartRef = useRef<number | null>(null);

    // ResizeObserver & Wheel Events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setCanvasHeight(entry.contentRect.height);
                const mobile = window.innerWidth < 768;
                setIsMobile(mobile);
                if (!mobile) {
                    setIsMobileDrawerOpen(false);
                }
            }
        });
        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Zoom Boundaries
    const MIN_ZOOM = 0.0001;
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
    }, [state.zoom, handleZoom]);

    const handleAutoScale = useCallback(() => {
        if (persons.length === 0 || canvasHeight === 0 || !personsScrollRef.current) return;

        const doScale = () => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const availableWidth = personsScrollRef.current?.getBoundingClientRect().width || (isMobile ? 300 : 800);
            const availableHeight = canvasHeight;

            const heights = persons.map(p => p.heightCm);
            const maxHeight = Math.max(...heights);
            const minHeight = Math.min(...heights);
            const heightRatio = maxHeight / (minHeight || 1);

            // --- HORIZONTAL CALCULATION ---
            // On mobile, if we have many people (14-15), we need to be very aggressive to avoid scrolling
            const manyItems = persons.length > 8;
            const baseBarWidth = isMobile ? (manyItems ? 36 : 48) : 120;
            const baseGap = isMobile ? (manyItems ? 4 : 12) : 20;

            // padding: pl-4 (16px) on mobile + right space buffer
            const fixedOffset = isMobile ? 32 : 200;

            const totalWidthAtZoom1 = (persons.length * baseBarWidth) + ((persons.length - 1) * baseGap) + fixedOffset;
            const horizontalZoom = (availableWidth * 0.96) / totalWidthAtZoom1;

            // --- VERTICAL CALCULATION ---
            const topPadding = isMobile ? 140 : 180;
            const usableHeight = availableHeight - topPadding;

            // Standard fit scale
            const fitScale = (canvasHeight - 160) / maxHeight;
            if (fitScale <= 0) return;

            // If the smallest person becomes too tiny (< 30px), we force a vertical zoom override
            let verticalZoom = 1.0;
            const minVisiblePx = minHeight * fitScale;
            if (minVisiblePx < 25 && maxHeight > 400) {
                // High-dynamic range mode: ensures the smallest person is at least 30px tall
                verticalZoom = 30 / minVisiblePx;
            } else {
                verticalZoom = (availableHeight * 0.72) / (maxHeight * fitScale);
            }

            // Final Ideal Zoom: prioritize seeing everyone horizontally on mobile
            let idealZoom = isMobile ? Math.min(horizontalZoom, verticalZoom) : Math.min(horizontalZoom, verticalZoom);

            // If on mobile and many items, strongly bias towards horizontal fitting
            if (isMobile && persons.length > 10) {
                idealZoom = Math.min(idealZoom, horizontalZoom);
            }

            // Clamp to existing limits
            idealZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, idealZoom));

            setState(s => ({ ...s, zoom: idealZoom }));
        };

        doScale();
        // Double-pass for layout stability
        requestAnimationFrame(() => setTimeout(doScale, 100));
    }, [persons, canvasHeight, MIN_ZOOM, MAX_ZOOM, isSidebarCollapsed]);

    const prevPersonsLenRef = useRef(0);
    useEffect(() => {
        const prev = prevPersonsLenRef.current;
        const curr = persons.length;
        prevPersonsLenRef.current = curr;
        if (curr > 0 && canvasHeight > 0) {
            const delay = curr !== prev ? 200 : 0;
            const t = setTimeout(handleAutoScale, delay);
            return () => clearTimeout(t);
        }
    }, [persons.length, canvasHeight, handleAutoScale]);

    const handleAddPerson = useCallback((person: Person) => {
        storeAddPerson(person);
    }, [storeAddPerson]);

    const handleAddEntity = useCallback((entity: Entity) => {
        const uniqueId = `${entity.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newPerson: Person = {
            id: uniqueId,
            name: entity.name,
            heightCm: entity.heightCm,
            color: entity.color,
            icon: entity.icon,
            imgUrl: entity.imgUrl,
            isEntity: true
        };
        storeAddPerson(newPerson);
        triggerToast(`${entity.name} added`);
    }, [storeAddPerson]);

    const handleRemovePerson = useCallback((id: string) => {
        storeRemovePerson(id);
        if (persons.length <= 1) {
            setState(s => ({ ...s, zoom: 1.0 }));
        }
    }, [storeRemovePerson, persons.length]);

    const handleReorderPerson = useCallback((id: string, direction: 'up' | 'down') => {
        const index = persons.findIndex(p => p.id === id);
        if (index === -1) return;

        const newPersons = [...persons];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < newPersons.length) {
            const temp = newPersons[index];
            newPersons[index] = newPersons[newIndex];
            newPersons[newIndex] = temp;
            storeSetPersons(newPersons);
        }
    }, [persons, storeSetPersons]);

    const handleClearAll = useCallback(() => {
        if (persons.length === 0) return;
        setIsConfirmingClear(true);
    }, [persons.length]);

    const confirmClearAll = useCallback(() => {
        storeSetPersons([]);
        setState(s => ({ ...s, zoom: 1.0 }));
        triggerToast('Chart cleared');
        setIsConfirmingClear(false);
    }, [storeSetPersons]);

    const handleUpdatePersonHeight = useCallback((id: string, newHeightCm: number) => {
        const clamped = Math.min(400, Math.max(50, newHeightCm));
        storeUpdatePerson(id, { heightCm: clamped });
        const tempPersons = persons.map(p => p.id === id ? { ...p, heightCm: clamped } : p);
        const guardedZoom = applyAutoZoomGuard(tempPersons, canvasHeight, state.zoom, MAX_ZOOM);
        setState(s => ({ ...s, zoom: guardedZoom }));
    }, [storeUpdatePerson, persons, canvasHeight, state.zoom, MAX_ZOOM]);

    const handleEditRequest = useCallback((id: string) => {
        setEditingPersonId(id);
        setActivePanel('EDIT_PERSON');
        setIsSidebarCollapsed(false);
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsMobileDrawerOpen(true);
        }
    }, [setEditingPersonId, setActivePanel, setIsSidebarCollapsed, setIsMobileDrawerOpen]);

    const handleEditSave = useCallback((updatedPerson: Person) => {
        storeUpdatePerson(updatedPerson.id, updatedPerson);
        const tempPersons = persons.map(p => p.id === updatedPerson.id ? updatedPerson : p);
        const guardedZoom = applyAutoZoomGuard(tempPersons, canvasHeight, state.zoom, MAX_ZOOM);
        setState(s => ({ ...s, zoom: guardedZoom }));
        setActivePanel('ADD_PERSON');
        setEditingPersonId(null);
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsMobileDrawerOpen(false);
        }
    }, [storeUpdatePerson, persons, canvasHeight, state.zoom, MAX_ZOOM]);

    const handleEditCancel = useCallback(() => {
        setActivePanel('ADD_PERSON');
        setEditingPersonId(null);
    }, []);

    // --- 1. The Share Handler ---
    const handleShare = useCallback(async () => {
        try {
            // Minify data before compressing
            const minifiedData = {
                u: unitSystem === 'metric' ? 1 : 0,
                z: Math.round(state.zoom * 100) / 100,
                p: persons.map(p => [
                    p.name,
                    Math.round(p.heightCm * 10) / 10,
                    p.color ? p.color.replace('#', '') : '',
                    p.gender === 'female' ? 1 : (p.gender === 'male' ? 2 : 0),
                    p.imgUrl || ''
                ])
            };
            const compact = LZString.compressToEncodedURIComponent(JSON.stringify(minifiedData));
            const shareUrl = `${window.location.origin}/#${compact}`;

            await navigator.clipboard.writeText(shareUrl);
            triggerToast('Share link copied!');
        } catch (err) {
            console.error('Failed to copy', err);
            triggerToast('Failed to copy link');
        }
    }, [unitSystem, state.zoom, persons]);

    // --- 2. URL Hash Encoding Sync ---
    useEffect(() => {
        if (readOnly || !isHydrated) return;
        if (typeof window !== 'undefined') {
            // Minify data before syncing to URL
            const minifiedData = {
                u: unitSystem === 'metric' ? 1 : 0,
                z: Math.round(state.zoom * 100) / 100,
                p: persons.map(p => [
                    p.name,
                    Math.round(p.heightCm * 10) / 10,
                    p.color ? p.color.replace('#', '') : '',
                    p.gender === 'female' ? 1 : (p.gender === 'male' ? 2 : 0),
                    p.imgUrl || ''
                ])
            };
            const compact = LZString.compressToEncodedURIComponent(JSON.stringify(minifiedData));
            window.history.replaceState(null, '', `#${compact}`);
        }
    }, [state.zoom, unitSystem, persons, readOnly, isHydrated]);

    // --- 3. URL Hash Hydration ---
    useEffect(() => {
        if (readOnly) return;
        if (typeof window !== 'undefined' && window.location.hash) {
            try {
                const hash = window.location.hash.slice(1);
                if (!hash) {
                    setIsHydrated(true);
                    return;
                }

                let decoded: any = null;
                const lzDecoded = LZString.decompressFromEncodedURIComponent(hash);
                if (lzDecoded) {
                    try {
                        decoded = JSON.parse(lzDecoded);
                    } catch (e) { }
                }

                if (!decoded) {
                    try {
                        decoded = JSON.parse(decodeURIComponent(atob(hash)));
                    } catch (e) {
                        console.error("Legacy hash decode failed:", e);
                    }
                }

                if (!decoded) {
                    setIsHydrated(true);
                    return;
                }

                // UNPACK LOGIC: Support both new minified format and old legacy format
                if (decoded.u !== undefined) {
                    // It's the new minified format
                    useUnitStore.setState({ unitSystem: decoded.u === 1 ? 'metric' : 'imperial' });
                    if (decoded.z) setState(s => ({ ...s, zoom: decoded.z }));

                    if (decoded.p && Array.isArray(decoded.p)) {
                        const restoredPersons: Person[] = decoded.p.map((arr: any) => ({
                            id: `shared-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, // Gen new ID
                            name: arr[0],
                            heightCm: arr[1],
                            color: arr[2] ? `#${arr[2]}` : '#3b82f6',
                            gender: arr[3] === 1 ? 'female' : (arr[3] === 2 ? 'male' : undefined),
                            imgUrl: arr[4] || undefined,
                            isEntity: !arr[3]
                        }));
                        storeSetPersons(restoredPersons);
                    }
                } else if (decoded.unitSystem) {
                    // It's the old legacy format (keeps old links working)
                    useUnitStore.setState({ unitSystem: decoded.unitSystem });
                    if (decoded.persons) {
                        storeSetPersons(decoded.persons);
                    }
                    if (decoded.zoom) {
                        setState(s => ({ ...s, zoom: decoded.zoom }));
                    }
                }

            } catch (e) {
                console.error("Hash hydration failed:", e);
            }
        }
        setIsHydrated(true);
    }, [storeSetPersons, readOnly]);

    const handleDownloadPNG = useCallback(async () => {
        if (!containerRef.current) return;
        try {
            setIsCapturing(true);
            triggerToast('Generating your height comparison...');
            document.body.classList.add('is-capturing');

            const exportContainer = containerRef.current;
            const personsContainer = personsScrollRef.current;
            const rulerContainer = rulerScrollRef.current;

            const origExportWidth = exportContainer.style.width;
            const origExportHeight = exportContainer.style.height;
            const origPersonsOverflow = personsContainer?.style.overflow;
            const origRulerOverflow = rulerContainer?.style.overflow;

            let targetWidth = exportContainer.offsetWidth;
            let targetHeight = exportContainer.offsetHeight;

            if (personsContainer && rulerContainer) {
                targetWidth = rulerContainer.offsetWidth + personsContainer.scrollWidth;
                targetHeight = Math.max(exportContainer.offsetHeight, personsContainer.scrollHeight + 100);

                exportContainer.style.width = `${targetWidth}px`;
                exportContainer.style.height = `${targetHeight}px`;

                personsContainer.style.overflow = 'visible';
                rulerContainer.style.overflow = 'visible';
            }

            await new Promise(resolve => setTimeout(resolve, 800));

            const htmlToImage = await import('html-to-image');
            const dataUrl = await htmlToImage.toPng(exportContainer, {
                pixelRatio: 2,
                backgroundColor: theme === 'dark' ? '#101011' : '#FAFAFA',
                width: targetWidth,
                height: targetHeight,
            });

            exportContainer.style.width = origExportWidth;
            exportContainer.style.height = origExportHeight;
            if (personsContainer) personsContainer.style.overflow = origPersonsOverflow || '';
            if (rulerContainer) rulerContainer.style.overflow = origRulerOverflow || '';

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
    }, [theme]);

    const scale = useMemo(() => {
        if (canvasHeight === 0) return 0;
        const heights = persons.length > 0 ? persons.map(p => p.heightCm) : [0];
        const maxHeightCm = Math.max(210, ...heights);
        const fitScale = Math.max(0, (canvasHeight - 160) / maxHeightCm);
        return fitScale * state.zoom;
    }, [canvasHeight, persons, state.zoom]);

    const totalHeight = useMemo(() => {
        if (persons.length === 0) return canvasHeight;
        const heights = persons.map(p => p.heightCm);
        const maxHeightPx = Math.max(...heights) * scale;
        // heightPx + 20px bottom offset + ~180px for top labels and clearance
        const needed = maxHeightPx + 200;
        return Math.max(canvasHeight, needed);
    }, [persons, scale, canvasHeight]);

    const requiredCanvasHeight = useMemo(() => {
        return persons.length === 0 || totalHeight <= canvasHeight ? '100%' : `${totalHeight}px`;
    }, [persons.length, totalHeight, canvasHeight]);

    return (
        <div className="flex flex-col h-full bg-bg overflow-hidden font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 relative">            {readOnly && onClose && (
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[70] p-3 text-white bg-red-500/90 hover:bg-red-600 rounded-full shadow-2xl backdrop-blur-md transition-all sm:top-6 sm:right-6"
                title="Close Chart"
            >
                <X size={24} strokeWidth={3} />
            </button>
        )}

            {/* {!readOnly && <Navbar activePage="home" />} */}

            <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row custom-scrollbar bg-bg transition-colors duration-500">
                {!readOnly && (
                    <motion.aside
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="
                    shrink-0 w-full h-[80px] bg-bg border-b overflow-hidden border-border/50 z-40
                    flex overflow-x-auto overflow-y-hidden gap-0 custom-scrollbar
                    sm:static sm:w-[85px] sm:overflow-y-auto sm:overflow-x-hidden sm:h-full sm:border-b-0 sm:border-r sm:flex-col sm:py-0 sm:px-0 sm:gap-0
                    initial={{ x: -85, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
               ">
                        <div className="flex sm:flex-col h-full w-full overflow-hidden">
                            <LeftNavItem
                                icon={<UserPlus size={18} />}
                                label="ADD PERSON"
                                active={activePanel === 'ADD_PERSON'}
                                isHighlighting={isHighlightingAddPerson && activePanel === 'ADD_PERSON'}
                                onClick={() => { setActivePanel('ADD_PERSON'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }}
                            />
                            <LeftNavItem icon={<Star size={18} />} label="CELEBRITIES" active={activePanel === 'CELEBRITIES'} onClick={() => { setActivePanel('CELEBRITIES'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                            <LeftNavItem icon={<Ghost size={18} />} label="FICTIONAL" active={activePanel === 'FICTIONAL'} onClick={() => { setActivePanel('FICTIONAL'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                            <LeftNavItem icon={<Box size={18} />} label="ENTITIES" active={activePanel === 'ENTITIES'} onClick={() => { setActivePanel('ENTITIES'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                            <LeftNavItem icon={<ImageIcon size={18} />} label="ADD IMAGE" active={activePanel === 'ADD_IMAGE'} onClick={() => { setActivePanel('ADD_IMAGE'); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                        </div>
                    </motion.aside>
                )}

                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    className="flex-1 flex flex-col relative min-w-0 bg-canvas min-h-[500px] xl:min-h-0 transition-colors duration-500 "
                    onClick={(e) => {
                        // Close person menu when clicking the broad background
                        if (activePersonMenuId) setActivePersonMenuId(null);
                    }}
                >
                    <div className="order-2 sm:order-first px-2 lg:px-4 pt-4 z-30 w-full mb-4">
                        <div className="w-full flex items-center justify-between bg-toolbar-bg border border-toolbar-border rounded-2xl py-2 px-2 lg:px-4 backdrop-blur-md shadow-2xl overflow-x-scroll flex-nowrap gap-1">

                            {/* === LEFT SECTION === */}
                            <div className="flex items-center gap-1 lg:gap-3 shrink-0">
                                {/* Unit Toggle */}
                                <button
                                    onClick={toggleUnitSystem}
                                    className="shrink-0 flex items-center gap-1 lg:gap-1.5 group hover:bg-item-hover px-1.5 lg:px-2 py-1.5 rounded-xl transition-all"
                                >
                                    <ArrowLeftRight size={14} className="text-muted/50 group-hover:text-accent shrink-0" />
                                    <span className="hidden sm:inline text-[10px] lg:text-xs font-semibold text-muted group-hover:text-foreground whitespace-nowrap">
                                        {unitSystem === 'metric' ? 'cm → ft' : 'ft → cm'}
                                    </span>
                                </button>

                                <div className="hidden sm:block w-px h-5 bg-white/10 shrink-0 mx-0.5 lg:mx-0" />

                                {/* Zoom Controls */}
                                <div className="flex shrink-0 items-center gap-0.5 lg:gap-1">
                                    <button
                                        onClick={() => handleZoom(0.1)}
                                        className="p-1.5 lg:p-2 text-muted hover:text-foreground hover:bg-item-hover rounded-lg transition-colors"
                                        title="Zoom In"
                                    >
                                        <ZoomIn size={16} strokeWidth={2.5} className="shrink-0" />
                                    </button>
                                    <div className="bg-item-hover rounded-lg px-1.5 lg:px-2 py-1 flex items-center gap-0.5 border border-toolbar-border">
                                        <input
                                            type="number"
                                            value={zoomInput}
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                setZoomInput(newValue); // Update the text box immediately

                                                // Try to parse what they typed
                                                const parsed = parseInt(newValue);

                                                // INSTANT APPLY: Only apply instantly if it's a valid number 
                                                // AND it's greater than or equal to your MIN_ZOOM.
                                                // (We don't clamp the max here while typing, to allow deleting/editing)
                                                if (!isNaN(parsed) && parsed >= (MIN_ZOOM * 100)) {
                                                    // Cap it at MAX_ZOOM if they type something huge
                                                    const safeZoom = Math.min(MAX_ZOOM * 100, parsed);
                                                    setState(s => ({ ...s, zoom: safeZoom / 100 }));
                                                }
                                            }}
                                            onBlur={(e) => {
                                                // SAFETY CATCH: When they click away, enforce the strict min/max limits
                                                let parsed = parseInt(e.target.value);
                                                if (isNaN(parsed)) parsed = 100; // Default if left blank

                                                const clampedZoom = Math.max(MIN_ZOOM * 100, Math.min(MAX_ZOOM * 100, parsed));

                                                // Finalize both the text box and the global state
                                                setZoomInput(clampedZoom.toString());
                                                setState(s => ({ ...s, zoom: clampedZoom / 100 }));
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.currentTarget.blur(); // Triggers the safety catch above
                                                }
                                            }}
                                            className="w-7 lg:w-9 bg-transparent text-[10px] lg:text-[12px] font-mono font-bold text-center outline-none text-muted transition-colors focus:text-foreground"
                                        />
                                        <span className="text-[9px] font-bold text-muted/30">%</span>
                                    </div>
                                    <button
                                        onClick={() => handleZoom(-0.1)}
                                        className="p-1.5 lg:p-2 text-muted hover:text-foreground hover:bg-item-hover rounded-lg transition-colors"
                                        title="Zoom Out"
                                    >
                                        <ZoomOut size={16} strokeWidth={2.5} className="shrink-0" />
                                    </button>
                                </div>

                                {/* Auto-Fit & Edit List */}
                                <div className="flex items-center gap-0.5 lg:gap-1 border-l border-white/10 pl-1 lg:pl-2 shrink-0">
                                    <button
                                        onClick={handleAutoScale}
                                        className="p-1.5 lg:p-2 text-primary hover:bg-accent/10 transition-all rounded-lg shrink-0"
                                        title="Auto Fit All"
                                    >
                                        <Focus size={16} strokeWidth={2.5} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActivePanel('ADD_PERSON');
                                            setIsSidebarCollapsed(false);
                                            if (isMobile) setIsMobileDrawerOpen(true);
                                            setHighlightYourList(true);
                                            setTimeout(() => setHighlightYourList(false), 2000);
                                        }}
                                        className="p-1.5 lg:p-2  hover:bg-emerald-500/10 transition-all rounded-lg shrink-0"
                                        title="Edit List"
                                    >
                                        <Edit2 size={16} strokeWidth={2.5} />
                                    </button>
                                </div>

                                {/* Slider - visible on larger screens, shrinks seamlessly */}
                                <div className="hidden md:flex items-center gap-1.5 px-1 lg:px-2 shrink-0 border-l border-white/10 ml-0.5">
                                    <ZoomOut size={12} className="text-muted/80 shrink-0" />
                                    <input
                                        type="range"
                                        min={MIN_ZOOM}
                                        max={MAX_ZOOM}
                                        step={0.1}
                                        value={state.zoom}
                                        onChange={(e) => setState(s => ({ ...s, zoom: parseFloat(e.target.value) }))}
                                        className="w-16 lg:w-20 h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <ZoomIn size={12} className="text-muted/80 shrink-0" />
                                </div>
                            </div>

                            {/* === RIGHT SECTION === */}
                            <div className="flex items-center gap-0.5 lg:gap-2 shrink-0">
                                <button
                                    onClick={handleClearAll}
                                    className="flex items-center gap-1.5 text-[10px] lg:text-xs font-medium text-muted hover:text-red-500 px-1.5 lg:px-2 py-2 transition-all group shrink-0"
                                    title="Clear All"
                                >
                                    <Trash2 size={16} className="text-muted/50 group-hover:text-red-500 transition-colors shrink-0" />
                                    <span className="hidden xl:inline whitespace-nowrap">Clear All</span>
                                </button>

                                <button
                                    onClick={() => setState(s => ({ ...s, zoom: 1.0 }))}
                                    className="flex items-center gap-1.5 text-[10px] lg:text-xs font-medium text-muted hover:text-foreground px-1.5 lg:px-2 py-2 transition-all group shrink-0"
                                    title="Reset Zoom"
                                >
                                    <RotateCcw size={16} className="text-muted/50 group-hover:text-accent transition-colors shrink-0" />
                                    <span className="hidden xl:inline whitespace-nowrap">Reset</span>                                </button>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-1.5 text-[10px] lg:text-xs font-medium text-muted hover:text-foreground px-1.5 lg:px-2 py-1.5 transition-all group shrink-0"
                                    title="Share"
                                >
                                    <LinkIcon size={16} className="text-muted/50 group-hover:text-accent transition-colors shrink-0" />
                                    <span className="hidden xl:inline whitespace-nowrap">Share</span>
                                </button>

                                <button
                                    onClick={handleDownloadPNG}
                                    disabled={isCapturing}
                                    className="flex items-center gap-1 lg:gap-1.5 bg-primary/10 text-primary border border-accent/20 px-2 lg:px-4 py-1.5 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/5 active:scale-95 disabled:opacity-50 shrink-0 ml-0.5"
                                    title="Download PNG"
                                >
                                    {isCapturing ? (
                                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                                    ) : (
                                        <Download size={14} strokeWidth={2.5} className="shrink-0" />
                                    )}
                                    <span className="hidden xl:inline whitespace-nowrap">Download PNG</span>
                                    <span className="hidden lg:inline lg:hidden whitespace-nowrap">PNG</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={containerRef}
                        className={`order-1 canvas-export-area p-4 flex-1 relative flex flex-col overflow-hidden bg-canvas shadow-2xl ${isFullscreen
                            ? 'fixed inset-0 z-[9999] m-0 rounded-none w-screen h-[100dvh]'
                            : 'm-4 mb-0 rounded-[2rem] border border-border/50'
                            }`}
                        style={{
                            height: isFullscreen ? '100dvh' : 'auto',
                            backgroundColor: isFullscreen ? 'var(--canvas)' : undefined,
                            WebkitOverflowScrolling: 'touch',
                            transform: 'translateZ(0)',
                            willChange: isFullscreen ? 'transform' : undefined
                        }}
                    >
                        {/* Fullscreen Toggle Button (Overlay) */}
                        <button
                            onClick={toggleFullscreen}
                            className={`absolute z-[100] transition-all duration-300 flex items-center justify-center active:scale-90
                                ${isFullscreen
                                    ? 'top-4 right-4 sm:top-8 sm:right-8 p-3 bg-white/10 backdrop-blur-md rounded-full text-foreground hover:bg-white/20 border border-white/20 shadow-2xl'
                                    : 'top-3 right-3 sm:top-5 sm:right-5 p-2 text-muted/50 hover:text-foreground hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10'
                                }`}
                            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {isFullscreen ? (
                                <X size={isMobile ? 20 : 28} className="transition-transform duration-300 group-hover:rotate-90" />
                            ) : (
                                <Maximize size={isMobile ? 18 : 22} strokeWidth={2.5} />
                            )}
                        </button>
                        <div className={`w-full flex flex-col items-center shrink-0 bg-canvas z-20 border-b border-border/5 transition-all duration-300 ${isFullscreen
                            ? 'pt-8 pb-4'
                            : 'pt-4 pb-2 sm:pt-6 sm:pb-3 opacity-40'
                            }`}>
                            <span className={`font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-muted whitespace-nowrap transition-all duration-300 ${isFullscreen
                                ? 'text-[12px] sm:text-lg lg:text-2xl'
                                : 'text-[7px] sm:text-[10px]'
                                }`}>
                                heightcomparison.vercel.app
                            </span>
                            {isFullscreen && <div className="h-[2px] w-12 sm:w-24 bg-accent/40 mt-2 sm:mt-4" />}
                            {!isFullscreen && <div className="h-[1px] w-8 sm:w-12 bg-accent/30 mt-1 sm:mt-1.5" />}
                        </div>

                        <div className="flex-1 flex flex-row relative overflow-hidden w-full">
                            <div
                                ref={rulerScrollRef}
                                className="shrink-0 relative bg-canvas z-10 overflow-hidden custom-scrollbar w-16 sm:w-20 lg:w-24"
                                onScroll={() => syncScroll('ruler')}
                            >
                                <div
                                    className="relative"
                                    style={{ height: requiredCanvasHeight }}
                                >
                                    <Ruler
                                        mode="labels"
                                        scale={scale}
                                        maxHeightCm={persons.length > 0 ? Math.max(...persons.map(p => p.heightCm)) : 300}
                                        containerHeight={totalHeight}
                                        personCount={persons.length}
                                        isFullscreen={isFullscreen}
                                    />
                                </div>
                            </div>

                            <div
                                ref={personsScrollRef}
                                className="flex-1 relative overflow-x-auto overflow-y-auto custom-scrollbar chart-grid scroll-smooth"
                                onScroll={() => syncScroll('persons')}
                            >
                                <div
                                    className="relative min-w-max flex items-end pr-8 md:pr-48"
                                    style={{ height: requiredCanvasHeight }}
                                >
                                    <Ruler
                                        mode="lines"
                                        scale={scale}
                                        maxHeightCm={persons.length > 0 ? Math.max(...persons.map(p => p.heightCm)) : 300}
                                        containerHeight={totalHeight}
                                        personCount={persons.length}
                                        isFullscreen={isFullscreen}
                                    />
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <div
                                            className="flex flex-nowrap items-end h-full w-max mt-auto pl-4 sm:pl-14"
                                            style={{
                                                gap: `${Math.max(2, Math.round(12 * state.zoom))}px`,
                                                transition: 'gap 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                                            }}
                                        >
                                            {persons.map((person, idx) => (
                                                <PersonBar
                                                    key={person.id}
                                                    person={person}
                                                    index={idx}
                                                    scale={scale}
                                                    zoom={state.zoom}
                                                    readOnly={readOnly}
                                                    canvasHeight={canvasHeight}
                                                    isActiveMenu={activePersonMenuId === person.id}
                                                    onSetActiveMenu={(active: boolean) => setActivePersonMenuId(active ? person.id : null)}
                                                    onEditRequest={!readOnly ? handleEditRequest : undefined}
                                                    onRemove={!readOnly ? handleRemovePerson : undefined}
                                                    onHeightChange={!readOnly ? (val) => handleUpdatePersonHeight(person.id, val) : undefined}
                                                />
                                            ))}
                                        </div>
                                    </AnimatePresence>
                                </div>

                                {persons.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center mb-24 sm:mb-32 gap-4 sm:gap-6 px-4">
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            onClick={() => {
                                                if (readOnly) return;
                                                setActivePanel('ADD_PERSON');
                                                setIsSidebarCollapsed(false);
                                                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                                    setIsMobileDrawerOpen(true);
                                                }
                                            }}
                                            className={`empty-door flex items-center justify-center group ${!readOnly ? 'cursor-pointer hover:border-accent' : ''}`}
                                        >
                                        </motion.button>
                                        <span className="text-sm sm:text-lg lg:text-xl text-center font-bold tracking-tight text-muted/50 bg-surface/50 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl border border-border/50 backdrop-blur-md shadow-xl w-auto max-w-[90%]">
                                            Add a person to get started
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.main>

                {!readOnly && (
                    <div className="hidden sm:flex shrink-0 relative z-30">
                        <motion.div
                            initial={false}
                            animate={{
                                width: isSidebarCollapsed ? 0 : 400,
                                opacity: isSidebarCollapsed ? 0 : 1
                            }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="flex flex-col border-l border-border bg-surface overflow-hidden transition-colors duration-500"
                        >
                            <div className="flex-1 w-[400px] overflow-y-auto custom-scrollbar">
                                <Sidebar
                                    persons={persons}
                                    personCount={persons.length}
                                    onAdd={handleAddPerson}
                                    onAddEntity={handleAddEntity}
                                    onRemove={handleRemovePerson}
                                    onEditRequest={handleEditRequest}
                                    onReorder={handleReorderPerson}
                                    scale={scale}
                                    zoom={state.zoom}
                                    activePanel={activePanel}
                                    editingPerson={persons.find(p => p.id === editingPersonId)}
                                    onEditSave={handleEditSave}
                                    onEditCancel={handleEditCancel}
                                    onAddEntityExport={handleDownloadPNG}
                                    isCapturing={isCapturing}
                                    highlight={highlightYourList}
                                />
                            </div>
                        </motion.div>

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
                )}
            </div>

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

            {!readOnly && (
                <div className="sm:hidden fixed bottom-6 right-6 z-40">
                    <button
                        onClick={() => setIsMobileDrawerOpen(true)}
                        className="w-12 h-12 bg-accent hover:bg-accent-secondary rounded-full flex items-center justify-center text-white shadow-2xl active:scale-95 transition-all"
                    >
                        <Plus size={18} strokeWidth={3} />
                    </button>
                </div>
            )}

            {!readOnly && (
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
                                className="sm:hidden fixed bottom-0 left-0 right-0 h-[80vh] bg-surface rounded-t-[2rem] z-200 overflow-hidden flex flex-col shadow-2xl border-t border-border"
                            >
                                <div className="flex items-center justify-between px-6 py-5 border-b border-border/30 bg-surface/50 backdrop-blur-md sticky top-0 z-20">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/90">
                                        {activePanel === 'ADD_PERSON' ? 'Enter Details' :
                                            activePanel === 'CELEBRITIES' ? 'Celebrities' :
                                                activePanel === 'FICTIONAL' ? 'Fictional' :
                                                    activePanel.replace('_', ' ')}
                                    </h3>
                                    <button
                                        onClick={() => setIsMobileDrawerOpen(false)}
                                        className="p-2 bg-bg border border-border/50 rounded-xl text-muted hover:text-foreground transition-all active:scale-95"
                                    >
                                        <X size={20} strokeWidth={3} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar pb-6 relative">
                                    <Sidebar
                                        persons={persons}
                                        personCount={persons.length}
                                        onAdd={(p) => { handleAddPerson(p); setIsMobileDrawerOpen(false); }}
                                        activePanel={activePanel}
                                        onAddEntity={(e) => { handleAddEntity(e); setIsMobileDrawerOpen(false); }}
                                        onAddEntityExport={handleDownloadPNG}
                                        isCapturing={isCapturing}
                                        onRemove={handleRemovePerson}
                                        scale={scale}
                                        zoom={state.zoom}
                                        editingPerson={persons.find(p => p.id === editingPersonId)}
                                        onEditSave={(p) => { handleEditSave(p); setIsMobileDrawerOpen(false); }}
                                        onEditCancel={() => setIsMobileDrawerOpen(false)}
                                        highlight={highlightYourList}
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            )}

            <AnimatePresence>
                {isConfirmingClear && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-surface border border-border/50 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full relative"
                        >
                            <h3 className="text-xl font-bold mb-3 text-red-500 flex items-center gap-2">
                                <Trash2 size={24} />
                                Clear Chart
                            </h3>
                            <p className="text-muted/80 mb-8 sm:mb-10 text-sm">
                                Are you sure you want to remove all subjects from the chart? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3 w-full">
                                <button
                                    onClick={() => setIsConfirmingClear(false)}
                                    className="px-5 py-2.5 rounded-xl font-bold text-muted hover:text-foreground hover:bg-bg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmClearAll}
                                    className="px-5 py-2.5 rounded-xl font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Clear All
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LeftNavItem = ({ icon, label, active = false, onClick, isHighlighting = false }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, isHighlighting?: boolean }) => (
    <motion.button
        variants={{
            show: { y: 0, opacity: 1, scale: 1 },
            hidden: { y: 15, opacity: 0, scale: 0.9 }
        }}
        animate={isHighlighting ? {
            scale: [1, 1.1, 1],
            backgroundColor: ['rgba(0,0,0,0)', 'rgba(34, 197, 94, 0.2)', 'rgba(0,0,0,0)'],
            transition: { duration: 1.5, repeat: Infinity }
        } : undefined}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`
        flex flex-col items-center justify-center gap-1.5 py-2 sm:py-6 w-full transition-all border-b-4 sm:border-b-0 sm:border-r-4
        min-w-0 cursor-pointer
        ${active
                ? 'bg-accent/10 text-accent border-accent shadow-sm'
                : 'text-muted hover:text-foreground border-transparent'}
    `}
        style={{ touchAction: 'manipulation' }}
    >
        <div className={`${active ? 'scale-110' : ''} transition-transform shrink-0`}>
            {icon}
        </div>
        <span className="text-[7px] sm:text-[8px] font-black tracking-[0.05em] uppercase text-center w-full px-0.5 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
            {label}
        </span>
    </motion.button>
);

export default HeightDashboard;