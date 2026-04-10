'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ZoomIn, ZoomOut, Download, UserPlus, Star, Box, Ghost,
    ImageIcon, Check, Plus, X, Link as LinkIcon, ArrowLeftRight,
    Focus, ChevronLeft, ChevronRight, Trash2, Edit2, Maximize,
} from 'lucide-react';
import { Person, Entity, PanelType } from '../types';
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

// ─────────────────────────────────────────────────────────────────────────────
// SIZING CONSTANTS  (reverse-engineered from heightcomparison.com DOM)
//
//   finalScale  = baseScale * zoom          (px per cm)
//   barHeightPx = person.heightCm * finalScale
//   barWidthPx  = barHeightPx * WIDTH_RATIO  (≈ 0.34 for normal persons)
//   gapPx       = max(MIN_GAP, barHeightPx * GAP_RATIO)
//
// AUTO-SCALE ALGORITHM:
//   1. baseScale already makes the TALLEST person fill VERT_FILL of viewport height.
//   2. handleAutoScale computes hZoom = (availableWidth * 0.90) / totalContentWidth
//      where totalContentWidth is measured at zoom = 1.
//   3. hZoom is clamped to [MIN_ZOOM, MAX_AUTO_ZOOM].
//      MAX_AUTO_ZOOM = 1.0 — we NEVER auto-zoom IN beyond 100%.
//      (If the content already fits at zoom=1, keep zoom=1.)
//      This prevents the "1 huge person fills 800% of screen" bug.
//   4. The user can still manually zoom > 1.0 using the slider / buttons.
//
// CANVAS HEIGHT:
//   max(vpHeight, tallestBarPx + HEAD_EXTRA + TOP_PAD)
//   HEAD_EXTRA accounts for the head circle above the bar (15% of barH).
//   This prevents the head from being clipped at the top.
// ─────────────────────────────────────────────────────────────────────────────

const WIDTH_RATIO = 0.34;   // barWidth = barHeightPx * WIDTH_RATIO
const GAP_RATIO = 0.022;  // gap      = barHeightPx * GAP_RATIO
const MIN_GAP = 2;      // px
const TOP_PAD = 60;     // px reserved above name label
const HEAD_RATIO = 0.15;   // head circle = barH * HEAD_RATIO (must match PersonBar)
const VERT_FILL = 0.82;   // tallest bar fills this fraction of vpHeight at zoom=1
const MAX_AUTO_ZOOM = 1.0;    // auto-scale never zooms IN — prevents over-scaling
const MIN_ZOOM = 0.02;
const MAX_ZOOM = 10.0;

const HeightDashboard: React.FC<HeightDashboardProps> = ({
    readOnly = false, initialPersons, onClose,
}) => {
    const storePersons = usePersonStore(s => s.persons);
    const storeAddPerson = usePersonStore(s => s.addPerson);
    const storeRemovePerson = usePersonStore(s => s.removePerson);
    const storeUpdatePerson = usePersonStore(s => s.updatePerson);
    const storeSetPersons = usePersonStore(s => s.setPersons);

    const persons = (readOnly && initialPersons) ? initialPersons : storePersons;

    const [zoom, setZoom] = useState(1.0);
    const [zoomInput, setZoomInput] = useState('100');

    const { unitSystem, toggleUnitSystem } = useUnitStore();
    const { theme } = useThemeStore();

    // Viewport size of the scrollable chart area
    const [vpWidth, setVpWidth] = useState(0);
    const [vpHeight, setVpHeight] = useState(0);

    const [activePanel, setActivePanel] = useState<PanelType>('ADD_PERSON');
    const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
    const [highlightYourList, setHighlightYourList] = useState(false);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(readOnly);
    const [activePersonMenuId, setActivePersonMenuId] = useState<string | null>(null);
    const [shareStatus, setShareStatus] = useState<'idle' | 'generating' | 'copied' | 'error'>('idle');

    const containerRef = useRef<HTMLDivElement>(null);
    const chartScrollRef = useRef<HTMLDivElement>(null);
    const autoScaleRef = useRef<() => void>(() => { });

    const triggerToast = useCallback((msg: string) => {
        setToastMessage(msg); setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    }, []);

    useEffect(() => { setZoomInput(Math.round(zoom * 100).toString()); }, [zoom]);
    useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

    // ── Fullscreen ───────────────────────────────────────────────────────────
    const toggleFullscreen = useCallback(() => {
        if (/iPhone|iPod/.test(navigator.userAgent)) { setIsFullscreen(p => !p); return; }
        if (!document.fullscreenElement) containerRef.current?.requestFullscreen().catch(console.error);
        else document.exitFullscreen();
    }, []);

    useEffect(() => {
        const h = () => { setIsFullscreen(!!document.fullscreenElement); setTimeout(() => autoScaleRef.current(), 400); };
        document.addEventListener('fullscreenchange', h);
        return () => document.removeEventListener('fullscreenchange', h);
    }, []);

    useEffect(() => {
        const h = (e: Event) => {
            const ev = e as CustomEvent<PanelType>;
            if (ev.detail) { setActivePanel(ev.detail); setIsSidebarCollapsed(false); setIsMobileDrawerOpen(true); }
        };
        window.addEventListener('open-dashboard-panel', h as EventListener);
        return () => window.removeEventListener('open-dashboard-panel', h as EventListener);
    }, []);

    // ── ResizeObserver on chart scroll area ──────────────────────────────────
    useEffect(() => {
        const el = chartScrollRef.current;
        if (!el) return;

        // Keep track of the last applied dimensions inside the observer
        let lastW = 0;
        let lastH = 0;

        const ro = new ResizeObserver(entries => {
            for (const e of entries) {
                const newW = e.contentRect.width;
                const newH = e.contentRect.height;

                // FIX: 24px Deadband. Scrollbars are typically 15px to 17px.
                // If the screen size only changes by the size of a scrollbar appearing 
                // or disappearing, IGNORE IT. This breaks the infinite loop instantly.
                if (Math.abs(newW - lastW) > 24 || Math.abs(newH - lastH) > 24) {
                    lastW = newW;
                    lastH = newH;

                    setVpWidth(newW);
                    setVpHeight(newH);

                    const mob = window.innerWidth < 768;
                    setIsMobile(mob);
                    if (!mob) setIsMobileDrawerOpen(false);
                }
            }
        });

        ro.observe(el);

        const rect = el.getBoundingClientRect();
        if (rect.width > 0) {
            lastW = rect.width;
            lastH = rect.height;
            setVpWidth(rect.width);
            setVpHeight(rect.height);
        }

        return () => ro.disconnect();
    }, []);
    // ── Wheel / Pinch zoom ───────────────────────────────────────────────────
    useEffect(() => {
        const el = chartScrollRef.current;
        if (!el) return;
        let initDist = 0, startZ = 0;
        const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                setZoom(z => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, +(z + (e.deltaY > 0 ? -0.08 : 0.08)).toFixed(3))));
            }
        };
        const onTS = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                initDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                startZ = zoom;
            }
        };
        const onTM = (e: TouchEvent) => {
            if (e.touches.length === 2 && initDist > 0) {
                e.preventDefault();
                const d = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, +(startZ * d / initDist).toFixed(3))));
            }
        };
        const onTE = () => { initDist = 0; };
        el.addEventListener('wheel', onWheel, { passive: false });
        el.addEventListener('touchstart', onTS, { passive: false });
        el.addEventListener('touchmove', onTM, { passive: false });
        el.addEventListener('touchend', onTE);
        return () => {
            el.removeEventListener('wheel', onWheel);
            el.removeEventListener('touchstart', onTS);
            el.removeEventListener('touchmove', onTM);
            el.removeEventListener('touchend', onTE);
        };
    }, [zoom]);

    // ─────────────────────────────────────────────────────────────────────────
    // BASE SCALE: zoom-independent
    // Maps tallest person → VERT_FILL fraction of viewport height.
    // ─────────────────────────────────────────────────────────────────────────
    const baseScale = useMemo(() => {
        if (vpHeight <= 0 || persons.length === 0) return 1;
        const maxCm = Math.max(...persons.map(p => p.heightCm));
        if (maxCm <= 0) return 1;
        // Reserve space for: top padding + head circle above bar
        // headExtra at zoom=1: baseScale * maxCm * HEAD_RATIO — but baseScale is what we're solving for.
        // Simplified: allocate VERT_FILL of vpHeight to the bar, leaving room for head+label above.
        const avail = vpHeight * VERT_FILL - TOP_PAD;
        return avail > 0 ? avail / maxCm : 1;
    }, [persons, vpHeight]);

    // ─────────────────────────────────────────────────────────────────────────
    // FINAL SCALE: what PersonBar and Ruler receive
    // ─────────────────────────────────────────────────────────────────────────
    const finalScale = useMemo(() => {
        const s = baseScale * zoom;
        return Number.isFinite(s) && s > 0 ? s : 0;
    }, [baseScale, zoom]);

    // ─────────────────────────────────────────────────────────────────────────
    // CANVAS HEIGHT: grows for tall entities, never less than vpHeight.
    // Accounts for head circle protruding above bar top.
    // ─────────────────────────────────────────────────────────────────────────
    const canvasHeight = useMemo(() => {
        if (persons.length === 0 || finalScale === 0) return vpHeight || 600;
        const maxBarPx = Math.max(...persons.map(p => p.heightCm * finalScale));
        const headExtra = maxBarPx * HEAD_RATIO;  // head sticks above bar
        const needed = maxBarPx + headExtra + TOP_PAD + 20;
        return Math.max(vpHeight || 600, needed);
    }, [persons, finalScale, vpHeight]);

    // ─────────────────────────────────────────────────────────────────────────
    // AUTO-SCALE
    //
    // Goal: figures fill 90% of available WIDTH at the most natural zoom.
    //
    // Key insight: Auto-scale should ONLY zoom OUT (hZoom ≤ MAX_AUTO_ZOOM = 1.0).
    // Reason: baseScale already makes the tallest bar fill 82% of height.
    // If we also zoom IN horizontally, a single wide bar at 1240cm becomes
    // absurdly large (800%+). The user can manually zoom in if they want.
    //
    // When there are very few persons (1–2), content is narrow.
    // hZoom > 1.0 would over-zoom → clamp to 1.0, content stays centered.
    // The tallest bar will correctly fill 82% of the screen height.
    // ─────────────────────────────────────────────────────────────────────────
    const handleAutoScale = useCallback(() => {
        if (persons.length === 0 || vpHeight <= 0 || vpWidth <= 0) return;

        const rulerW = isMobile ? 40 : 56;
        const availW = vpWidth - rulerW;

        // Total content width at zoom=1 (using baseScale only)
        const totalW = persons.reduce((sum, p) => {
            const barH = p.heightCm * baseScale;       // at zoom=1
            const w = Math.max(isMobile ? 10 : 12, barH * (p.imgUrl ? 1.0 : WIDTH_RATIO));
            const gap = Math.max(MIN_GAP, barH * GAP_RATIO);
            return sum + w + gap;
        }, 0);

        if (totalW <= 0) return;

        // How much zoom makes content fill 90% of available width?
        const hZoom = (availW * 1) / totalW;

        // Clamp to MAX_AUTO_ZOOM = 1.0
        const safeZoom = Math.max(MIN_ZOOM, Math.min(MAX_AUTO_ZOOM, hZoom * 0.95));

        // FIX: Add a "deadband" to prevent infinite scrollbar toggle loops!
        setZoom((prevZoom) => {
            // If the zoom is only changing by a tiny fraction (2% or less),
            // it is just the scrollbar appearing/disappearing. 
            // Return the previous zoom to immediately break the infinite loop.
            if (Math.abs(prevZoom - safeZoom) < 0.02) {
                return prevZoom;
            }

            // Otherwise, apply the new zoom and round it cleanly to 2 decimals
            return Number(safeZoom.toFixed(2));
        });

    }, [persons, vpHeight, vpWidth, baseScale, isMobile, isSidebarCollapsed]);
    useEffect(() => { autoScaleRef.current = handleAutoScale; }, [handleAutoScale]);

    // Trigger auto-scale when persons or viewport changes
    // const prevLenRef = useRef(0);
    // const prevVpWidthRef = useRef(0);
    useEffect(() => {
        if (vpWidth <= 0 || vpHeight <= 0) return;

        // Run auto-scale exactly once
        handleAutoScale();
    }, [persons]);

    // Scroll to bottom when person added
    useEffect(() => {
        if (persons.length > 0 && chartScrollRef.current) {
            const el = chartScrollRef.current;
            const scroll = () => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
            const t1 = setTimeout(scroll, 80);
            const t2 = setTimeout(scroll, 400);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [persons.length]);

    // ── Gap helper ───────────────────────────────────────────────────────────
    const getGap = useCallback((person: Person) =>
        Math.max(MIN_GAP, person.heightCm * finalScale * GAP_RATIO), [finalScale]);

    // ── Person actions ────────────────────────────────────────────────────────
    const handleAddPerson = useCallback((person: Person) => {
        storeAddPerson(person);
        if (window.innerWidth < 768) window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [storeAddPerson]);

    const handleAddEntity = useCallback((entity: Entity) => {
        const id = `${entity.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        storeAddPerson({ id, name: entity.name, heightCm: entity.heightCm, color: entity.color, icon: entity.icon, imgUrl: entity.imgUrl, isEntity: true });
        triggerToast(`${entity.name} added`);
        if (window.innerWidth < 768) window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [storeAddPerson, triggerToast]);

    const handleRemovePerson = useCallback((id: string) => {
        storeRemovePerson(id);
        if (persons.length <= 1) setZoom(1.0);
    }, [storeRemovePerson, persons.length]);

    const handleReorderPerson = useCallback((id: string, dir: 'up' | 'down') => {
        const i = persons.findIndex(p => p.id === id);
        if (i === -1) return;
        const arr = [...persons];
        const t = dir === 'up' ? i - 1 : i + 1;
        if (t >= 0 && t < arr.length) { [arr[i], arr[t]] = [arr[t], arr[i]]; storeSetPersons(arr); }
    }, [persons, storeSetPersons]);

    const handleClearAll = useCallback(() => { if (persons.length > 0) setIsConfirmingClear(true); }, [persons.length]);
    const confirmClearAll = useCallback(() => { storeSetPersons([]); setZoom(1.0); triggerToast('Chart cleared'); setIsConfirmingClear(false); }, [storeSetPersons, triggerToast]);
    const handleEditRequest = useCallback((id: string) => { setEditingPersonId(id); setActivePanel('EDIT_PERSON'); setIsSidebarCollapsed(false); if (window.innerWidth < 768) setIsMobileDrawerOpen(true); }, []);
    const handleEditSave = useCallback((p: Person) => { storeUpdatePerson(p.id, p); setActivePanel('ADD_PERSON'); setEditingPersonId(null); if (window.innerWidth < 768) setIsMobileDrawerOpen(false); }, [storeUpdatePerson]);
    const handleEditUpdate = useCallback((p: Person) => storeUpdatePerson(p.id, p), [storeUpdatePerson]);
    const handleEditCancel = useCallback(() => { setActivePanel('ADD_PERSON'); setEditingPersonId(null); }, []);
    const handleUpdatePersonHeight = useCallback((id: string, val: number) => storeUpdatePerson(id, { heightCm: Math.min(400, Math.max(50, val)) }), [storeUpdatePerson]);

    // ── Share / URL ───────────────────────────────────────────────────────────
    const handleShare = useCallback(async () => {
        if (shareStatus !== 'idle') return;

        try {
            setShareStatus('generating');

            const payload = {
                unitSystem,
                zoom: Math.round(zoom * 100) / 100,
                persons: persons
            };

            const response = await fetch('/api/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: payload })
            });

            if (!response.ok) throw new Error('Network error');

            const { shortId } = await response.json();
            const shareUrl = `${window.location.origin}/?s=${shortId}`;

            await navigator.clipboard.writeText(shareUrl);
            setShareStatus('copied');
            triggerToast('Share link copied!');

            setTimeout(() => setShareStatus('idle'), 3000);

        } catch (e) {
            console.error(e);
            setShareStatus('error');
            triggerToast('Failed to generate link');
            setTimeout(() => setShareStatus('idle'), 3000);
        }
    }, [unitSystem, zoom, persons, triggerToast, shareStatus]);

    useEffect(() => {
        if (readOnly) return;

        const loadSharedData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const id = searchParams.get('s');

            if (id) {
                try {
                    const response = await fetch(`/api/share?id=${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.unitSystem) useUnitStore.setState({ unitSystem: data.unitSystem });
                        if (data.zoom) setZoom(data.zoom);
                        if (data.persons) storeSetPersons(data.persons);
                    }
                } catch (e) {
                    console.error('Failed to fetch shared chart:', e);
                }
            } else if (window.location.hash) {
                // Fallback for old hash-based links
                try {
                    const hash = window.location.hash.slice(1);
                    if (!hash) { setIsHydrated(true); return; }
                    let decoded: any = null;
                    try {
                        const lz = LZString.decompressFromEncodedURIComponent(hash);
                        if (lz) decoded = JSON.parse(lz);
                    } catch { }
                    if (!decoded) {
                        try { decoded = JSON.parse(decodeURIComponent(atob(hash))); } catch { }
                    }
                    if (decoded?.u !== undefined) {
                        useUnitStore.setState({ unitSystem: decoded.u === 1 ? 'metric' : 'imperial' });
                        if (decoded.z !== undefined) setZoom(decoded.z);
                        if (Array.isArray(decoded.p)) {
                            storeSetPersons(decoded.p.map((a: any[]) => ({
                                id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                                name: String(a[0]),
                                heightCm: Number(a[1]),
                                color: a[2] ? `#${a[2]}` : '#3b82f6',
                                gender: a[3] === 1 ? 'female' : a[3] === 2 ? 'male' : undefined,
                                imgUrl: a[4] ? String(a[4]) : undefined,
                                isEntity: !a[3],
                                offsetY: a[5] ? Number(a[5]) : 0
                            })));
                        }
                    } else if (decoded?.unitSystem) {
                        useUnitStore.setState({ unitSystem: decoded.unitSystem });
                        if (decoded.persons) storeSetPersons(decoded.persons);
                        if (decoded.zoom !== undefined) setZoom(decoded.zoom);
                    }
                } catch (e) { console.error('Hash hydration failed:', e); }
            }
            setIsHydrated(true);
        };

        loadSharedData();
    }, [storeSetPersons, readOnly]);

    // ── PNG download ──────────────────────────────────────────────────────────
    const handleDownloadPNG = useCallback(async () => {
        if (!containerRef.current) return;
        try {
            setIsCapturing(true); triggerToast('Generating...');
            document.body.classList.add('is-capturing');
            const exp = containerRef.current, scr = chartScrollRef.current;
            const oW = exp.style.width, oH = exp.style.height, oO = scr?.style.overflow;
            const tw = exp.offsetWidth, th = Math.max(exp.offsetHeight, (scr?.scrollHeight ?? 0) + 100);
            exp.style.width = `${tw}px`; exp.style.height = `${th}px`;
            if (scr) scr.style.overflow = 'visible';
            await new Promise(r => setTimeout(r, 800));
            const { toPng } = await import('html-to-image');
            const url = await toPng(exp, { pixelRatio: 2, backgroundColor: theme === 'dark' ? '#101011' : '#FAFAFA', width: tw, height: th });
            exp.style.width = oW; exp.style.height = oH;
            if (scr) scr.style.overflow = oO || '';
            const a = document.createElement('a'); a.download = `height-comparison-${Date.now()}.png`; a.href = url; a.click();
            setTimeout(() => triggerToast('Downloaded!'), 500);
        } catch (e) { console.error(e); triggerToast('Failed.'); }
        finally { setIsCapturing(false); document.body.classList.remove('is-capturing'); }
    }, [theme, triggerToast]);

    return (
        <div className="flex flex-col h-full bg-bg overflow-hidden font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 relative">
            {readOnly && onClose && (
                <button onClick={onClose} className="absolute top-4 right-4 z-[70] p-3 text-white bg-red-500/90 hover:bg-red-600 rounded-full shadow-2xl backdrop-blur-md sm:top-6 sm:right-6">
                    <X size={24} strokeWidth={3} />
                </button>
            )}

            <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row bg-bg transition-colors duration-500">

                {/* Left Nav */}
                {!readOnly && (
                    <motion.aside
                        initial={{ x: -85, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="shrink-0 w-full h-[65px] bg-bg border-b border-border/50 z-40 flex overflow-x-auto overflow-y-hidden custom-scrollbar sm:static sm:w-[85px] sm:overflow-y-auto sm:overflow-x-hidden sm:h-full sm:border-b-0 sm:border-r sm:flex-col"
                    >
                        <div className="flex sm:flex-col h-full w-full overflow-hidden">
                            {([
                                ['ADD_PERSON', <UserPlus size={18} />, 'ADD PERSON'],
                                ['CELEBRITIES', <Star size={18} />, 'CELEBRITIES'],
                                ['FICTIONAL', <Ghost size={18} />, 'FICTIONAL'],
                                ['ENTITIES', <Box size={18} />, 'ENTITIES'],
                                ['ADD_IMAGE', <ImageIcon size={18} />, 'ADD IMAGE'],
                            ] as [PanelType, React.ReactNode, string][]).map(([panel, icon, label]) => (
                                <LeftNavItem key={panel} icon={icon} label={label} active={activePanel === panel}
                                    onClick={() => { setActivePanel(panel); setIsMobileDrawerOpen(true); setIsSidebarCollapsed(false); }} />
                            ))}
                        </div>
                    </motion.aside>
                )}

                {/* Main */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    className="flex-1 flex flex-col relative min-w-0 bg-canvas transition-colors duration-500 overflow-hidden"
                    onClick={() => { if (activePersonMenuId) setActivePersonMenuId(null); }}
                >
                    {/* Toolbar */}
                    <div className="order-2 sm:order-first px-2 lg:px-4  z-30 w-full mb-2 shrink-0">
                        <div className="w-full flex items-center justify-between bg-toolbar-bg border border-toolbar-border rounded-2xl py-2 px-2 lg:px-4 backdrop-blur-md shadow-2xl overflow-x-auto flex-nowrap gap-1">
                            <div className="flex items-center gap-1 lg:gap-3 shrink-0">
                                <button onClick={toggleUnitSystem} className="shrink-0 flex items-center gap-1 group hover:bg-item-hover px-1.5 py-1.5 rounded-xl transition-all">
                                    <ArrowLeftRight size={14} className="text-muted/50 group-hover:text-accent" />
                                    <span className="hidden sm:inline text-[10px] lg:text-xs font-semibold text-muted group-hover:text-foreground whitespace-nowrap">
                                        {unitSystem === 'metric' ? 'cm → ft' : 'ft → cm'}
                                    </span>
                                </button>
                                <div className="hidden sm:block w-px h-5 bg-white/10 shrink-0" />
                                <div className="flex shrink-0 items-center gap-0.5">
                                    <button onClick={() => setZoom(z => Math.min(MAX_ZOOM, +(z + 0.1).toFixed(2)))} className="p-1.5 lg:p-2 text-muted hover:text-foreground hover:bg-item-hover rounded-lg">
                                        <ZoomIn size={16} strokeWidth={2.5} />
                                    </button>
                                    <div className="bg-item-hover rounded-lg px-1.5 py-1 flex items-center gap-0.5 border border-toolbar-border">
                                        <input type="number" value={zoomInput}
                                            onChange={e => { setZoomInput(e.target.value); const v = parseInt(e.target.value); if (!isNaN(v) && v >= MIN_ZOOM * 100) setZoom(Math.min(MAX_ZOOM, v / 100)); }}
                                            onBlur={e => { let v = parseInt(e.target.value); if (isNaN(v)) v = 100; const c = Math.max(MIN_ZOOM * 100, Math.min(MAX_ZOOM * 100, v)); setZoomInput(c.toString()); setZoom(c / 100); }}
                                            onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                                            className="w-7 lg:w-9 bg-transparent text-[10px] lg:text-[12px] font-mono font-bold text-center outline-none text-muted focus:text-foreground" />
                                        <span className="text-[9px] font-bold text-muted/30">%</span>
                                    </div>
                                    <button onClick={() => setZoom(z => Math.max(MIN_ZOOM, +(z - 0.1).toFixed(2)))} className="p-1.5 lg:p-2 text-muted hover:text-foreground hover:bg-item-hover rounded-lg">
                                        <ZoomOut size={16} strokeWidth={2.5} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-0.5 border-l border-white/10 pl-1 shrink-0">
                                    <button onClick={handleAutoScale} className="p-1.5 lg:p-2 text-primary hover:bg-accent/10 rounded-lg" title="Auto Fit">
                                        <Focus size={16} strokeWidth={2.5} />
                                    </button>
                                    <button onClick={() => { setActivePanel('ADD_PERSON'); setIsSidebarCollapsed(false); if (isMobile) setIsMobileDrawerOpen(true); setHighlightYourList(true); setTimeout(() => setHighlightYourList(false), 2000); }} className="p-1.5 lg:p-2 hover:bg-emerald-500/10 rounded-lg" title="Edit List">
                                        <Edit2 size={16} strokeWidth={2.5} />
                                    </button>
                                </div>
                                <div className="hidden md:flex items-center gap-1.5 px-1 lg:px-2 shrink-0 border-l border-white/10">
                                    <ZoomOut size={12} className="text-muted/80" />
                                    <input type="range" min={MIN_ZOOM} max={MAX_ZOOM} step={0.01} value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} className="w-16 lg:w-24 h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent" />
                                    <ZoomIn size={12} className="text-muted/80" />
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5 lg:gap-2 shrink-0">
                                <button onClick={handleClearAll} className="flex items-center gap-1.5 text-muted hover:text-red-500 px-1.5 py-2 transition-all group shrink-0">
                                    <Trash2 size={16} className="text-muted/50 group-hover:text-red-500 shrink-0" />
                                    <span className="hidden xl:inline whitespace-nowrap text-xs">Clear All</span>
                                </button>
                                <button
                                    onClick={handleShare}
                                    disabled={shareStatus !== 'idle'}
                                    className={`flex items-center gap-1.5 px-1.5 py-1.5 group shrink-0 transition-all duration-300 rounded-lg ${shareStatus === 'copied' ? 'text-emerald-500 bg-emerald-500/10' :
                                        shareStatus === 'error' ? 'text-red-500 bg-red-500/10' :
                                            'text-muted hover:text-foreground'
                                        }`}
                                >
                                    {shareStatus === 'generating' ? (
                                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                                    ) : shareStatus === 'copied' ? (
                                        <Check size={16} />
                                    ) : (
                                        <LinkIcon size={16} className={`group-hover:text-accent shrink-0 ${shareStatus === 'error' ? 'text-red-500' : 'text-muted/50'}`} />
                                    )}
                                    <span className="hidden xl:inline whitespace-nowrap text-xs">
                                        {shareStatus === 'generating' ? 'Generating...' :
                                            shareStatus === 'copied' ? 'Copied!' :
                                                shareStatus === 'error' ? 'Fixed Error' : 'Share'}
                                    </span>
                                </button>
                                <button onClick={handleDownloadPNG} disabled={isCapturing} className="flex items-center gap-1 bg-primary/10 text-primary border border-accent/20 px-2 lg:px-4 py-1.5 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold hover:bg-accent hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-50 shrink-0">
                                    {isCapturing ? <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Download size={14} strokeWidth={2.5} />}
                                    <span className="hidden lg:inline ml-1">PNG</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Canvas container */}
                    <div
                        ref={containerRef}
                        className={`order-1 canvas-export-area flex-1 relative flex flex-col overflow-hidden bg-canvas shadow-2xl min-h-0 ${isFullscreen ? 'fixed inset-0 z-[9999] m-0 rounded-none w-screen h-[100dvh]' : 'm-2 mb-2 rounded-[2rem] border border-border/50'}`}
                        style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)' }}
                    >
                        {/* Brand bar */}
                        <div className={`flex items-center justify-between px-2 py-1 shrink-0 z-20 border-b border-border/5 ${isFullscreen ? '' : 'opacity-40'}`}>
                            <div className="flex-1" />
                            <div className="flex flex-col items-center pointer-events-none">
                                <span className="font-black uppercase tracking-[0.4em] text-muted whitespace-nowrap text-[7px] sm:text-[10px]">
                                    heightcomparison.vercel.app
                                </span>
                                <div className="h-[1px] w-8 bg-accent/30 mt-1" />
                            </div>
                            <div className="flex-1 flex justify-end">
                                <button onClick={toggleFullscreen} className={`shrink-0 z-[100] flex items-center gap-1.5 active:scale-95 ${isFullscreen ? 'p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl' : 'px-2 py-1 bg-surface/90 backdrop-blur-md text-foreground/80 hover:bg-accent hover:text-white rounded-xl border border-border/60 shadow-lg'}`}>
                                    {isFullscreen ? <X size={isMobile ? 20 : 28} /> : <><Maximize size={16} strokeWidth={2.5} /><span className="hidden sm:inline text-xs font-bold ml-1">Fullscreen</span></>}
                                </button>
                            </div>
                        </div>

                        {/* Scrollable chart */}
                        <div
                            ref={chartScrollRef}
                            className="flex-1 relative overflow-auto custom-scrollbar chart-grid min-h-0"
                        >
                            <div
                                className="relative flex items-end min-w-full w-max"
                                style={{
                                    height: canvasHeight <= (vpHeight || 600) ? '100%' : `${canvasHeight}px`,
                                    minHeight: '100%',
                                }}
                            >
                                {/* Sticky ruler labels */}
                                <div className="sticky left-0 z-50 h-full w-10 sm:w-12 lg:w-14 shrink-0 bg-canvas/90 backdrop-blur-sm border-r border-border/10">
                                    <Ruler
                                        mode="labels"
                                        scale={finalScale}
                                        maxHeightCm={persons.length > 0 ? Math.max(...persons.map(p => p.heightCm)) : 300}
                                        containerHeight={canvasHeight}
                                        isFullscreen={isFullscreen}
                                    />
                                </div>

                                {/* Grid lines + person bars */}
                                <div className="relative flex-1 h-full flex items-end justify-center min-w-max">
                                    <Ruler
                                        mode="lines"
                                        scale={finalScale}
                                        maxHeightCm={persons.length > 0 ? Math.max(...persons.map(p => p.heightCm)) : 300}
                                        containerHeight={canvasHeight}
                                        isFullscreen={isFullscreen}
                                    />

                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <div className={`flex flex-nowrap items-end justify-center h-full ${isMobile ? 'w-full' : 'w-max'}`}>
                                            {persons.map(person => {
                                                const gap = getGap(person);
                                                return (
                                                    <motion.div
                                                        key={person.id}
                                                        layout
                                                        className="h-full flex items-end shrink-0"
                                                        style={{
                                                            marginLeft: `${gap / 2}px`,
                                                            marginRight: `${gap / 2}px`,
                                                            transition: 'margin 0.4s cubic-bezier(0.22,1,0.36,1)',
                                                        }}
                                                    >
                                                        <PersonBar
                                                            person={person}
                                                            scale={finalScale}
                                                            zoom={zoom}
                                                            readOnly={readOnly}
                                                            canvasHeight={vpHeight}
                                                            isActiveMenu={activePersonMenuId === person.id}
                                                            onSetActiveMenu={(active: boolean) => setActivePersonMenuId(active ? person.id : null)}
                                                            onEditRequest={!readOnly ? handleEditRequest : undefined}
                                                            onRemove={!readOnly ? handleRemovePerson : undefined}
                                                            onHeightChange={!readOnly ? (val) => handleUpdatePersonHeight(person.id, val) : undefined}
                                                        />
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </AnimatePresence>
                                </div>

                                {persons.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 pointer-events-none">
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            onClick={() => { if (readOnly) return; setActivePanel('ADD_PERSON'); setIsSidebarCollapsed(false); if (window.innerWidth < 768) setIsMobileDrawerOpen(true); }}
                                            className={`empty-door flex items-center justify-center group pointer-events-auto ${!readOnly ? 'cursor-pointer hover:border-accent' : ''}`}
                                        >
                                            <Plus size={40} className="text-muted/20 group-hover:text-accent group-hover:scale-110 transition-all duration-500" />
                                        </motion.button>
                                        <span className="text-sm sm:text-lg lg:text-xl text-center font-bold text-muted/50 bg-surface/50 px-6 py-2.5 rounded-2xl border border-border/50 backdrop-blur-md shadow-xl">
                                            Add a person to get started
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.main>

                {/* Desktop Sidebar */}
                {!readOnly && (
                    <div className="hidden sm:flex shrink-0 relative z-30">
                        <motion.div
                            initial={false}
                            animate={{ width: isSidebarCollapsed ? 0 : 400, opacity: isSidebarCollapsed ? 0 : 1 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="flex flex-col border-l border-border bg-surface overflow-hidden"
                        >
                            <div className="flex-1 w-[400px] overflow-y-auto custom-scrollbar">
                                <Sidebar
                                    persons={persons} personCount={persons.length}
                                    onAdd={handleAddPerson} onAddEntity={handleAddEntity}
                                    onRemove={handleRemovePerson} onEditRequest={handleEditRequest}
                                    onReorder={handleReorderPerson} scale={finalScale} zoom={zoom}
                                    activePanel={activePanel}
                                    editingPerson={persons.find(p => p.id === editingPersonId)}
                                    onEditSave={handleEditSave} onEditUpdate={handleEditUpdate}
                                    onEditCancel={handleEditCancel} onAddEntityExport={handleDownloadPNG}
                                    isCapturing={isCapturing} highlight={highlightYourList}
                                />
                            </div>
                        </motion.div>
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="absolute top-1/2 -translate-y-1/2 w-8 h-12 bg-surface border border-border rounded-l-xl flex items-center justify-center text-muted hover:text-white hover:bg-accent hover:border-accent transition-all shadow-2xl z-50 right-full translate-x-[1px]"
                            style={{ borderRight: 'none' }}
                        >
                            {isSidebarCollapsed ? <ChevronLeft size={18} className="translate-x-0.5" /> : <ChevronRight size={18} className="-translate-x-0.5" />}
                        </button>
                    </div>
                )}
            </div>

            {/* Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface border border-border text-foreground px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50 pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-bold">{toastMessage}</span>
                        <Check size={16} className="text-accent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile FAB */}
            {!readOnly && (
                <div className="sm:hidden fixed bottom-6 right-6 z-40">
                    <button onClick={() => setIsMobileDrawerOpen(true)} className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-2xl active:scale-95 transition-all">
                        <Plus size={18} strokeWidth={3} />
                    </button>
                </div>
            )}

            {/* Mobile Drawer */}
            {!readOnly && (
                <AnimatePresence>
                    {isMobileDrawerOpen && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileDrawerOpen(false)} className="sm:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
                            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="sm:hidden fixed bottom-0 left-0 right-0 h-[80vh] bg-surface rounded-t-[2rem] z-[200] overflow-hidden flex flex-col shadow-2xl border-t border-border">
                                <div className="flex items-center justify-between px-6 py-5 border-b border-border/30 bg-surface/50 backdrop-blur-md sticky top-0 z-20">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">
                                        {activePanel === 'ADD_PERSON' ? 'Enter Details' : activePanel === 'CELEBRITIES' ? 'Celebrities' : activePanel === 'FICTIONAL' ? 'Fictional' : activePanel.replace('_', ' ')}
                                    </h3>
                                    <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 bg-bg border border-border/50 rounded-xl text-muted hover:text-foreground active:scale-95">
                                        <X size={20} strokeWidth={3} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
                                    <Sidebar
                                        persons={persons} personCount={persons.length}
                                        onAdd={p => { handleAddPerson(p); setIsMobileDrawerOpen(false); }}
                                        activePanel={activePanel}
                                        onAddEntity={e => { handleAddEntity(e); setIsMobileDrawerOpen(false); }}
                                        onAddEntityExport={handleDownloadPNG} isCapturing={isCapturing}
                                        onRemove={handleRemovePerson} scale={finalScale} zoom={zoom}
                                        editingPerson={persons.find(p => p.id === editingPersonId)}
                                        onEditSave={p => { handleEditSave(p); setIsMobileDrawerOpen(false); }}
                                        onEditCancel={handleEditCancel} highlight={highlightYourList}
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            )}

            {/* Clear confirmation */}
            <AnimatePresence>
                {isConfirmingClear && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-surface border border-border/50 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
                            <h3 className="text-xl font-bold mb-3 text-red-500 flex items-center gap-2"><Trash2 size={24} />Clear Chart</h3>
                            <p className="text-muted/80 mb-8 text-sm">Remove all subjects? This cannot be undone.</p>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setIsConfirmingClear(false)} className="px-5 py-2.5 rounded-xl font-bold text-muted hover:text-foreground hover:bg-bg">Cancel</button>
                                <button onClick={confirmClearAll} className="px-5 py-2.5 rounded-xl font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">Clear All</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LeftNavItem = ({ icon, label, active = false, onClick }: {
    icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void;
}) => (
    <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(59,130,246,0.05)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1.5 py-2 sm:py-6 w-full transition-all border-b-4 sm:border-b-0 sm:border-r-4 min-w-0 cursor-pointer ${active ? 'bg-accent/10 text-accent border-accent' : 'text-muted hover:text-foreground border-transparent'}`}
        style={{ touchAction: 'manipulation' }}
    >
        <div className={`${active ? 'scale-110' : ''} transition-transform`}>{icon}</div>
        <span className="text-[7px] sm:text-[8px] font-black tracking-[0.05em] uppercase text-center w-full px-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
    </motion.button>
);

export default HeightDashboard;