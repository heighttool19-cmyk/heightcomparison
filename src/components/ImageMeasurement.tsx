'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHeightStore } from '@/store/useHeightStore';
import {
    Camera, Ruler, RefreshCcw, Upload, Check, ChevronRight, Zap,
    Target, Box, BarChart2, Crop, X, RotateCcw, Move, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePersonStore, useUnitStore } from '../store';
import { cn } from '../../lib/utils';

/* ─────────────────────────── Types ─────────────────────────── */
interface Point   { x: number; y: number; }
interface Line    { p1: Point; p2: Point; }
interface CropBox { x: number; y: number; w: number; h: number; }
interface CropDrag {
    handle: string;
    startMX: number; startMY: number;
    startBox: CropBox;
}

const RESIZE_HANDLES = [
    { id: 'n',  cursor: 'ns-resize',   style: { top: -5,    left: '50%', transform: 'translateX(-50%)' } },
    { id: 's',  cursor: 'ns-resize',   style: { bottom: -5, left: '50%', transform: 'translateX(-50%)' } },
    { id: 'e',  cursor: 'ew-resize',   style: { right: -5,  top: '50%',  transform: 'translateY(-50%)' } },
    { id: 'w',  cursor: 'ew-resize',   style: { left: -5,   top: '50%',  transform: 'translateY(-50%)' } },
    { id: 'ne', cursor: 'nesw-resize', style: { top: -5,    right: -5 } },
    { id: 'nw', cursor: 'nwse-resize', style: { top: -5,    left: -5  } },
    { id: 'se', cursor: 'nwse-resize', style: { bottom: -5, right: -5 } },
    { id: 'sw', cursor: 'nesw-resize', style: { bottom: -5, left: -5  } },
] as const;

const MIN_CROP = 20;
const MAX_CANVAS_H = 700;

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export const ImageMeasurement: React.FC = () => {
    /* ── refs ── */
    const canvasRef        = useRef<HTMLCanvasElement>(null);
    const wrapperRef       = useRef<HTMLDivElement>(null);   // full-width sizing wrapper
    const fileInputRef     = useRef<HTMLInputElement>(null);
    const imageRef         = useRef<HTMLImageElement | null>(null);
    const cropContainerRef = useRef<HTMLDivElement>(null);

    /* keep latest values accessible inside window listeners without stale closures */
    const firstPointRef = useRef<Point | null>(null);
    const isDraggingRef = useRef(false);
    const modeRef       = useRef<'idle' | 'calibrating' | 'measuring'>('idle');
    const isMouseDown   = useRef(false);

    const { uploadedImage, setUploadedImage, setCalibrationDetails, setMeasurementPx, calculatedHeight } = useHeightStore();
    const { unitSystem } = useUnitStore();
    const { addPerson }  = usePersonStore();

    type Mode = 'idle' | 'calibrating' | 'measuring';
    const [mode, setMode]           = useState<Mode>('idle');
    const [firstPoint, setFirstPoint] = useState<Point | null>(null);
    const [livePoint,  setLivePoint]  = useState<Point | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [calibLine, setCalibLine] = useState<Line | null>(null);
    const [measLine,  setMeasLine]  = useState<Line | null>(null);

    const [showCalibModal, setShowCalibModal] = useState(false);
    const [calibCm,        setCalibCm]        = useState('203');

    const [isScanning,     setIsScanning]     = useState(false);
    const [isSavedToChart, setIsSavedToChart] = useState(false);
    const [toastMsg,       setToastMsg]       = useState<{ text: string; type: 'success'|'info'|'error' } | null>(null);

    /* ── crop modal ── */
    const [pendingUrl,    setPendingUrl]    = useState<string | null>(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropBox,       setCropBox]       = useState<CropBox>({ x: 0, y: 0, w: 200, h: 300 });
    const [cropDisplay,   setCropDisplay]   = useState({ w: 0, h: 0 });
    const [cropNatural,   setCropNatural]   = useState({ w: 0, h: 0 });
    const [cropDrag,      setCropDrag]      = useState<CropDrag | null>(null);

    /* displayed canvas CSS size (drives the outer wrapper height) */
    const [displaySize, setDisplaySize] = useState<{ w: number; h: number } | null>(null);

    /* ── keep refs in sync ── */
    useEffect(() => { firstPointRef.current = firstPoint; },  [firstPoint]);
    useEffect(() => { isDraggingRef.current = isDragging; },  [isDragging]);
    useEffect(() => { modeRef.current       = mode;       },  [mode]);

    /* ── toast ── */
    const toast = useCallback((text: string, type: 'success'|'info'|'error' = 'info') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3000);
    }, []);

    /* ══════════════════════════════════════════════
       CORE: size canvas + draw in one atomic call
       This is the single source of truth — called
       on load, resize, and any state change that
       affects the image or overlays.
    ══════════════════════════════════════════════ */
    const sizeAndDraw = useCallback((
        overrideCalibLine?: Line | null,
        overrideMeasLine?:  Line | null,
        overrideFirstPt?:   Point | null,
        overrideLivePt?:    Point | null,
        overrideIsDragging?: boolean,
        overrideMode?: Mode,
    ) => {
        const canvas  = canvasRef.current;
        const wrapper = wrapperRef.current;
        const img     = imageRef.current;
        if (!canvas || !wrapper || !img) return;

        const availW = wrapper.clientWidth;
        if (!availW) return;

        /* --- compute display dimensions --- */
        const scaleW  = availW / img.naturalWidth;
        let dw = Math.round(img.naturalWidth  * scaleW);
        let dh = Math.round(img.naturalHeight * scaleW);
        if (dh > MAX_CANVAS_H) {
            const scaleH = MAX_CANVAS_H / img.naturalHeight;
            dw = Math.round(img.naturalWidth  * scaleH);
            dh = MAX_CANVAS_H;
        }

        /* --- update canvas physical size --- */
        const dpr = window.devicePixelRatio || 1;
        const needsResize = canvas.width !== dw * dpr || canvas.height !== dh * dpr;
        if (needsResize) {
            canvas.width  = dw * dpr;
            canvas.height = dh * dpr;
            canvas.style.width  = `${dw}px`;
            canvas.style.height = `${dh}px`;
            setDisplaySize({ w: dw, h: dh });
        }

        /* --- draw --- */
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, dw, dh);
        ctx.drawImage(img, 0, 0, dw, dh);

        const style     = getComputedStyle(document.documentElement);
        const accent    = style.getPropertyValue('--accent').trim() || '#14B8A6';
        const secondary = '#B9A7FF';

        const cLine  = overrideCalibLine  !== undefined ? overrideCalibLine  : calibLine;
        const mLine  = overrideMeasLine   !== undefined ? overrideMeasLine   : measLine;
        const fp     = overrideFirstPt    !== undefined ? overrideFirstPt    : firstPoint;
        const lp     = overrideLivePt     !== undefined ? overrideLivePt     : livePoint;
        const drag   = overrideIsDragging !== undefined ? overrideIsDragging : isDragging;
        const md     = overrideMode       !== undefined ? overrideMode       : mode;

        if (cLine) paintLine(ctx, cLine.p1, cLine.p2, secondary, 'Ref');
        if (mLine) paintLine(ctx, mLine.p1, mLine.p2, accent,    'Target');

        if (fp && lp) {
            const color = md === 'calibrating' ? secondary : accent;
            paintLine(ctx, fp, lp, color, md === 'calibrating' ? 'Ref…' : 'Measuring…');
        }
        if (fp && !drag) {
            const color = md === 'calibrating' ? secondary : accent;
            ctx.beginPath(); ctx.arc(fp.x, fp.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = color; ctx.fill();
            ctx.beginPath(); ctx.arc(fp.x, fp.y, 10, 0, Math.PI * 2);
            ctx.strokeStyle = color + '88'; ctx.lineWidth = 2; ctx.stroke();
        }
    }, [calibLine, measLine, firstPoint, livePoint, isDragging, mode]);

    const paintLine = (
        ctx: CanvasRenderingContext2D,
        p1: Point, p2: Point, color: string, label: string
    ) => {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 4;
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
        ctx.fillStyle = color;
        [p1, p2].forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill(); });
        const mid = { x: (p1.x + p2.x) / 2 + 10, y: (p1.y + p2.y) / 2 };
        ctx.font = 'bold 11px Inter, system-ui, sans-serif';
        const tw = ctx.measureText(label).width;
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.beginPath(); ctx.roundRect?.(mid.x - 4, mid.y - 12, tw + 8, 16, 4); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(label, mid.x, mid.y);
        ctx.restore();
    };

    /* redraw on every relevant state change */
    useEffect(() => { sizeAndDraw(); }, [sizeAndDraw]);

    /* ══════════════════════════════════════════════
       IMAGE LOAD
    ══════════════════════════════════════════════ */
    useEffect(() => {
        if (!uploadedImage) {
            imageRef.current = null;
            setDisplaySize(null);
            return;
        }
        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            imageRef.current = img;
            // rAF x2: let React render wrapperRef into DOM first
            requestAnimationFrame(() => requestAnimationFrame(() => sizeAndDraw()));
        };
    }, [uploadedImage, sizeAndDraw]);

    /* ══════════════════════════════════════════════
       RESIZE OBSERVER
       On resize: resize canvas + redraw immediately.
       No waiting, no click needed.
    ══════════════════════════════════════════════ */
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            // sizeAndDraw reads current state via the closure
            sizeAndDraw();
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [sizeAndDraw]);

    /* ══════════════════════════════════════════════
       COORDINATE HELPER
    ══════════════════════════════════════════════ */
    const clientToCanvas = useCallback((clientX: number, clientY: number): Point | null => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return null;
        return {
            x: Math.max(0, Math.min(rect.width,  clientX - rect.left)),
            y: Math.max(0, Math.min(rect.height, clientY - rect.top)),
        };
    }, []);

    /* ══════════════════════════════════════════════
       COMMIT LINE
    ══════════════════════════════════════════════ */
    const commitLine = useCallback((p1: Point, p2: Point) => {
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (dist < 5) return;

        if (modeRef.current === 'calibrating') {
            setCalibLine({ p1, p2 });
            setShowCalibModal(true);
        } else if (modeRef.current === 'measuring') {
            setMeasLine({ p1, p2 });
            setMeasurementPx(dist);
            setIsSavedToChart(false);
        }
        setFirstPoint(null);
        setLivePoint(null);
        setIsDragging(false);
    }, [setMeasurementPx]);

    const cancelDrawing = useCallback(() => {
        setFirstPoint(null); setLivePoint(null); setIsDragging(false);
    }, []);

    /* ══════════════════════════════════════════════
       GLOBAL MOUSE / TOUCH  (so dragging outside
       canvas works perfectly)
    ══════════════════════════════════════════════ */
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isMouseDown.current || !firstPointRef.current) return;
            const pt = clientToCanvas(e.clientX, e.clientY);
            if (pt) setLivePoint(pt);
        };
        const onMouseUp = (e: MouseEvent) => {
            isMouseDown.current = false;
            if (!firstPointRef.current || !isDraggingRef.current) return;
            const pt = clientToCanvas(e.clientX, e.clientY);
            if (!pt) return;
            const dist = Math.hypot(pt.x - firstPointRef.current.x, pt.y - firstPointRef.current.y);
            if (dist > 10) commitLine(firstPointRef.current, pt);
            else setIsDragging(false);
        };
        const onTouchMove = (e: TouchEvent) => {
            if (!firstPointRef.current) return;
            e.preventDefault();
            const pt = clientToCanvas(e.touches[0].clientX, e.touches[0].clientY);
            if (pt) setLivePoint(pt);
        };
        const onTouchEnd = (e: TouchEvent) => {
            if (!firstPointRef.current || !isDraggingRef.current) return;
            const t = e.changedTouches[0];
            const pt = clientToCanvas(t.clientX, t.clientY);
            if (!pt) return;
            const dist = Math.hypot(pt.x - firstPointRef.current.x, pt.y - firstPointRef.current.y);
            if (dist > 10) commitLine(firstPointRef.current, pt);
            else setIsDragging(false);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup',   onMouseUp);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend',  onTouchEnd);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup',   onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend',  onTouchEnd);
        };
    }, [clientToCanvas, commitLine]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') cancelDrawing(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [cancelDrawing]);

    /* ══════════════════════════════════════════════
       CANVAS POINTER HANDLERS
    ══════════════════════════════════════════════ */
    const onCanvasMouseDown = (e: React.MouseEvent) => {
        if (mode === 'idle') return;
        isMouseDown.current = true;
        const pt = clientToCanvas(e.clientX, e.clientY);
        if (!pt) return;
        if (!firstPoint) {
            setFirstPoint(pt); setLivePoint(pt); setIsDragging(true);
        } else {
            commitLine(firstPoint, pt);
        }
    };

    const onCanvasTouchStart = (e: React.TouchEvent) => {
        if (mode === 'idle') return;
        e.preventDefault();
        const pt = clientToCanvas(e.touches[0].clientX, e.touches[0].clientY);
        if (!pt) return;
        if (!firstPoint) {
            setFirstPoint(pt); setLivePoint(pt); setIsDragging(true);
        } else {
            commitLine(firstPoint, pt);
        }
    };

    /* ══════════════════════════════════════════════
       CALIBRATION
    ══════════════════════════════════════════════ */
    const confirmCalib = () => {
        if (!calibLine) return;
        const dist = Math.hypot(calibLine.p2.x - calibLine.p1.x, calibLine.p2.y - calibLine.p1.y);
        setCalibrationDetails(dist, parseFloat(calibCm) || 203);
        setShowCalibModal(false); setMode('measuring');
        toast('Calibration set! Now draw a line on the target.', 'success');
    };
    const cancelCalib = () => { setShowCalibModal(false); setCalibLine(null); toast('Cancelled. Draw again.', 'info'); };
    const recalibrate = () => {
        setMode('calibrating'); setCalibLine(null); setMeasLine(null);
        setFirstPoint(null); setLivePoint(null); setIsDragging(false);
        setIsSavedToChart(false); setShowCalibModal(false);
        toast('Recalibrating — draw a new reference line.', 'info');
    };

    /* ══════════════════════════════════════════════
       AI AUTO-SCAN
    ══════════════════════════════════════════════ */
    const handleAutoScan = async () => {
        if (!uploadedImage || !canvasRef.current || !calibLine) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx || !imageRef.current) return;
        setIsScanning(true); setMeasLine(null); setIsSavedToChart(false);
        toast('AI scanning…', 'info');
        await new Promise(r => setTimeout(r, 600));
        try {
            const dpr = window.devicePixelRatio || 1;
            const dw = canvas.width / dpr, dh = canvas.height / dpr;
            ctx.clearRect(0, 0, dw, dh);
            ctx.drawImage(imageRef.current, 0, 0, dw, dh);
            const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = id.data, iw = canvas.width, ih = canvas.height;
            const calibMidX = ((calibLine.p1.x + calibLine.p2.x) / 2) * dpr;
            const exclW = iw * 0.12;
            const COLS = [0.10,0.20,0.30,0.40,0.50,0.60,0.70,0.80,0.90]
                .map(p => Math.floor(iw * p)).filter(x => Math.abs(x - calibMidX) > exclW);
            if (!COLS.length) COLS.push(calibMidX > iw/2 ? Math.floor(iw*0.2) : Math.floor(iw*0.8));
            const isContent = (r: number, g: number, b: number, a: number) => a > 40 && (0.299*r + 0.587*g + 0.114*b) < 240;
            let gTop = ih, gBot = 0, bestX = iw / 2;
            for (const col of COLS) {
                let lTop = -1, lBot = -1;
                for (let y = 0; y < ih; y++)    { const i=(y*iw+col)*4; if(isContent(data[i],data[i+1],data[i+2],data[i+3])){lTop=y;break;} }
                for (let y = ih-1; y >= 0; y--) { const i=(y*iw+col)*4; if(isContent(data[i],data[i+1],data[i+2],data[i+3])){lBot=y;break;} }
                if (lTop !== -1 && lTop < gTop) { gTop = lTop; bestX = col; }
                if (lBot !== -1 && lBot > gBot)   gBot = lBot;
            }
            if (gTop >= gBot) { toast('Could not detect subject.', 'error'); return; }
            const p1 = { x: bestX / dpr, y: gTop / dpr }, p2 = { x: bestX / dpr, y: gBot / dpr };
            setMeasLine({ p1, p2 }); setMeasurementPx(Math.hypot(p2.x-p1.x, p2.y-p1.y));
            toast('AI detection complete!', 'success');
        } catch { toast('AI scan failed.', 'error'); }
        finally { sizeAndDraw(); setIsScanning(false); }
    };

    /* ══════════════════════════════════════════════
       FILE UPLOAD → CROP MODAL
    ══════════════════════════════════════════════ */
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (fileInputRef.current) fileInputRef.current.value = '';
        const reader = new FileReader();
        reader.onload = ev => { const url = ev.target?.result as string; if (url) { setPendingUrl(url); setShowCropModal(true); } };
        reader.readAsDataURL(file);
    };

    const onCropImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget, cont = cropContainerRef.current;
        if (!cont) return;
        const maxW = Math.min(cont.clientWidth || 600, window.innerWidth - 48);
        const maxH = Math.min(Math.round(window.innerHeight * 0.52), 480);
        const sc   = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
        const dw   = Math.round(img.naturalWidth * sc), dh = Math.round(img.naturalHeight * sc);
        setCropNatural({ w: img.naturalWidth, h: img.naturalHeight });
        setCropDisplay({ w: dw, h: dh });
        const pad = 0.05;
        setCropBox({ x: Math.round(dw*pad), y: Math.round(dh*pad), w: Math.round(dw*(1-pad*2)), h: Math.round(dh*(1-pad*2)) });
    }, []);

    const getCropPt = (e: React.MouseEvent | React.TouchEvent) => {
        const rect = cropContainerRef.current?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        if ('touches' in e) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    };

    const onCropDragStart = (e: React.MouseEvent | React.TouchEvent, handle: string) => {
        e.preventDefault(); e.stopPropagation();
        const { x, y } = getCropPt(e);
        setCropDrag({ handle, startMX: x, startMY: y, startBox: { ...cropBox } });
    };
    const onCropDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!cropDrag) return; e.preventDefault();
        const { x, y } = getCropPt(e);
        const dx = x - cropDrag.startMX, dy = y - cropDrag.startMY;
        const sb = cropDrag.startBox, mw = cropDisplay.w, mh = cropDisplay.h;
        const nb = { ...sb };
        if (cropDrag.handle === 'move') { nb.x = Math.max(0, Math.min(mw-sb.w, sb.x+dx)); nb.y = Math.max(0, Math.min(mh-sb.h, sb.y+dy)); }
        else {
            const h = cropDrag.handle;
            if (h.includes('e')) nb.w = Math.max(MIN_CROP, Math.min(mw-sb.x, sb.w+dx));
            if (h.includes('w')) { const nx=Math.max(0,Math.min(sb.x+sb.w-MIN_CROP,sb.x+dx)); nb.w=sb.x+sb.w-nx; nb.x=nx; }
            if (h.includes('s')) nb.h = Math.max(MIN_CROP, Math.min(mh-sb.y, sb.h+dy));
            if (h.includes('n')) { const ny=Math.max(0,Math.min(sb.y+sb.h-MIN_CROP,sb.y+dy)); nb.h=sb.y+sb.h-ny; nb.y=ny; }
        }
        setCropBox(nb);
    };
    const onCropDragEnd = () => setCropDrag(null);
    const resetCrop = () => { if (cropDisplay.w > 0) setCropBox({ x: 0, y: 0, w: cropDisplay.w, h: cropDisplay.h }); };

    const applyCrop = () => {
        if (!pendingUrl || cropDisplay.w === 0) return;
        const img = new Image();
        img.onload = () => {
            const sx = cropNatural.w / cropDisplay.w, sy = cropNatural.h / cropDisplay.h;
            const c = document.createElement('canvas');
            c.width = Math.round(cropBox.w * sx); c.height = Math.round(cropBox.h * sy);
            const ctx = c.getContext('2d'); if (!ctx) return;
            ctx.drawImage(img, cropBox.x*sx, cropBox.y*sy, cropBox.w*sx, cropBox.h*sy, 0, 0, c.width, c.height);
            setUploadedImage(c.toDataURL('image/png', 0.95));
            setMode('calibrating'); setCalibLine(null); setMeasLine(null);
            setShowCropModal(false); setPendingUrl(null);
            toast('Image ready — draw a calibration line.', 'success');
        };
        img.src = pendingUrl;
    };
    const closeCropModal = () => { setShowCropModal(false); setPendingUrl(null); };
    const applyPreset = (cm: number, label: string) => { setCalibCm(cm.toString()); toast(`Preset: ${label} (${cm} cm)`, 'info'); };

    /* ══════════════════════════════════════════════
       RENDER
    ══════════════════════════════════════════════ */
    return (
        <div className="flex flex-col gap-6 w-full">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Camera className="w-5 h-5 text-accent" /> Image Measurement
                        </h2>
                        <p className="text-sm text-foreground/60 mt-1">Calibrate with a known object, then measure.</p>
                    </div>
                    {calculatedHeight > 0 && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-end gap-2">
                            <div className="flex flex-col items-end leading-tight">
                                <span className="text-[10px] uppercase tracking-widest text-primary/40 font-black">Measured Height</span>
                                <div className="text-3xl font-black text-primary flex items-baseline gap-1">
                                    {unitSystem === 'metric' ? calculatedHeight.toFixed(1) : (calculatedHeight / 30.48).toFixed(2)}
                                    <span className="text-sm font-bold opacity-40">{unitSystem === 'metric' ? 'cm' : 'ft'}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!isSavedToChart ? (
                                    <button onClick={() => { addPerson({ id: `ai-${Date.now()}`, name: 'Measured', heightCm: calculatedHeight, color: 'var(--accent)', gender: 'male' }); setIsSavedToChart(true); toast('Saved!', 'success'); }}
                                        className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all">
                                        <Box className="w-3.5 h-3.5" /> Save to Chart
                                    </button>
                                ) : (
                                    <Link href="/" className="flex items-center gap-2 bg-surface border border-accent text-accent px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent/5 transition-all">
                                        <BarChart2 className="w-3.5 h-3.5" /> View Chart
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Step banner */}
                <AnimatePresence mode="wait">
                    {uploadedImage && mode !== 'idle' && (
                        <motion.div key={mode + String(!!firstPoint)} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                            className="px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                {mode === 'calibrating' ? <Ruler className="w-4 h-4 text-accent" /> : <ChevronRight className="w-4 h-4 text-accent" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-xs font-black uppercase tracking-widest text-accent/60 block">
                                    {mode === 'calibrating' ? 'Step 1: Calibration' : 'Step 2: Measurement'}
                                </span>
                                <span className="text-sm font-bold">
                                    {mode === 'calibrating'
                                        ? firstPoint ? 'Click / tap the end point to finish' : 'Draw a line over a known object'
                                        : firstPoint ? 'Click / tap the end point to finish' : 'Draw a line over the person or object'}
                                </span>
                            </div>
                            {firstPoint && (
                                <button onClick={cancelDrawing}
                                    className="flex items-center gap-1 text-xs font-bold text-muted hover:text-red-400 transition-colors px-2 py-1 rounded-lg border border-border hover:border-red-400/30 flex-shrink-0">
                                    <XCircle className="w-3.5 h-3.5" /> Cancel
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ══════════════════════════════════════════════
                CANVAS AREA
                ─ wrapperRef is full-width, always in DOM
                ─ height is set from displaySize (natural aspect ratio)
                ─ canvas is centred horizontally via flex
                ─ on narrow viewports it fills 100% width
                ─ on wider viewports it centres at natural width
            ══════════════════════════════════════════════ */}
            <div
                ref={wrapperRef}
                className={cn(
                    "relative w-full rounded-2xl border border-border overflow-hidden bg-black/40",
                    !uploadedImage && "border-dashed min-h-[260px] flex items-center justify-center"
                )}
                /* height tracks the canvas display height so no empty space / clipping */
                style={displaySize ? { height: displaySize.h } : undefined}
            >
                {!uploadedImage ? (
                    <div className="flex flex-col items-center cursor-pointer group p-10 w-full"
                        onClick={() => fileInputRef.current?.click()}>
                        <div className="w-14 h-14 rounded-full bg-border/20 flex items-center justify-center group-hover:bg-accent/10 transition-colors mb-3">
                            <Upload className="w-7 h-7 text-foreground/40 group-hover:text-accent transition-colors" />
                        </div>
                        <p className="font-semibold text-foreground/70">Click to upload an image</p>
                        <p className="text-xs text-foreground/40 mt-1">PNG, JPG up to 10 MB</p>
                    </div>
                ) : (
                    /*
                     * Canvas is absolutely centred inside the wrapper.
                     * applySize/sizeAndDraw sets canvas.style.width/height in CSS px.
                     * The wrapper height is set to displaySize.h so it hugs the canvas.
                     */
                    <div className="absolute inset-0 flex items-center justify-center">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={onCanvasMouseDown}
                            onTouchStart={onCanvasTouchStart}
                            className={cn(
                                "block select-none touch-none max-w-full",
                                mode === 'idle' ? "cursor-default" : "cursor-crosshair"
                            )}
                        />
                    </div>
                )}

                {/* Scan animation */}
                <AnimatePresence>
                    {isScanning && (
                        <motion.div initial={{ top: '-5%' }} animate={{ top: '105%' }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                            style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)', boxShadow: '0 0 16px 3px var(--accent)' }} />
                    )}
                </AnimatePresence>

                {/* Calibration confirm overlay */}
                <AnimatePresence>
                    {showCalibModal && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[3px]">
                            <motion.div initial={{ scale: 0.93, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 16 }}
                                className="bg-surface border border-border p-7 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col gap-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-accent rounded-t-3xl" />
                                <h3 className="font-bold text-base flex items-center gap-2 mt-1">
                                    <Ruler className="w-4 h-4 text-accent" /> Set Reference Size
                                </h3>
                                <p className="text-xs text-foreground/60">Enter the real-world length of the line you just drew.</p>
                                <div className="flex flex-wrap gap-2">
                                    {[{ cm: 203, label: 'Door' }, { cm: 8.56, label: 'ID Card' }, { cm: 29.7, label: 'A4 Paper' }, { cm: 100, label: '1 Metre' }].map(p => (
                                        <button key={p.label} onClick={() => applyPreset(p.cm, p.label)}
                                            className={cn("px-3 py-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1.5 transition-all",
                                                calibCm === String(p.cm) ? "border-accent text-accent bg-accent/10" : "border-border text-muted hover:border-accent/40 hover:text-foreground")}>
                                            <Target className="w-3 h-3" /> {p.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input type="number" value={calibCm} onChange={e => setCalibCm(e.target.value)}
                                        className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-accent font-black outline-none focus:border-accent transition-all pr-14 focus:ring-1 focus:ring-accent/20" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/40">CM</span>
                                </div>
                                <div className="flex gap-3 mt-1">
                                    <button onClick={cancelCalib}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-bg text-muted hover:text-red-400 hover:border-red-400/30 transition-all text-xs font-bold">
                                        <X className="w-3.5 h-3.5" /> Cancel
                                    </button>
                                    <button onClick={confirmCalib}
                                        className="flex-1 bg-accent text-white font-black py-3 rounded-xl hover:bg-accent/90 transition-all uppercase tracking-widest text-xs shadow-lg shadow-accent/20 active:scale-95 flex items-center justify-center gap-2">
                                        <Check className="w-3.5 h-3.5" /> Confirm
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            {uploadedImage && (
                <div className="flex gap-3">
                    <button onClick={recalibrate}
                        className={cn("flex-1 px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border transition-all",
                            mode === 'calibrating' && !showCalibModal
                                ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                                : "bg-surface border-border text-muted hover:text-foreground hover:border-accent/30")}>
                        <Ruler className="w-4 h-4" /> Recalibrate
                    </button>
                    <button onClick={handleAutoScan} disabled={isScanning || !calibLine}
                        className={cn("flex-1 px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border transition-all",
                            !calibLine ? "opacity-40 cursor-not-allowed bg-surface border-border text-muted"
                                : "bg-[#14B8A6] text-white border-[#14B8A6] shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95")}>
                        <Zap className={cn("w-4 h-4", isScanning && "animate-spin")} />
                        {isScanning ? 'Scanning…' : 'AI Auto-Scan'}
                    </button>
                    <button onClick={() => { setUploadedImage(null); setMode('idle'); setCalibLine(null); setMeasLine(null); setFirstPoint(null); setLivePoint(null); setIsSavedToChart(false); setDisplaySize(null); }}
                        className="px-4 py-3.5 rounded-xl font-bold bg-surface text-muted hover:bg-red-500/10 hover:text-red-400 transition-all border border-border" title="Remove image">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>
            )}

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

            {/* ══════════ CROP MODAL ══════════ */}
            <AnimatePresence>
                {showCropModal && pendingUrl && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]" onClick={closeCropModal} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 24 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
                            <div className="pointer-events-auto w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                                style={{ maxHeight: 'calc(100dvh - 32px)' }} onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0"><Crop size={17} /></div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest">Crop Image</h3>
                                            <p className="text-[11px] text-muted mt-0.5 hidden sm:block">Drag the box or handles to select the crop region</p>
                                        </div>
                                    </div>
                                    <button onClick={closeCropModal} className="w-8 h-8 rounded-xl bg-bg border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 transition-all shrink-0">
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto p-4 bg-bg/60 flex items-center justify-center min-h-0">
                                    <div ref={cropContainerRef} className="relative overflow-hidden rounded-xl select-none"
                                        style={{ width: cropDisplay.w || '100%', height: cropDisplay.h || 300, maxWidth: '100%', cursor: cropDrag ? 'grabbing' : 'default', backgroundImage: 'repeating-conic-gradient(#8881 0% 25%, transparent 0% 50%)', backgroundSize: '16px 16px' }}
                                        onMouseMove={onCropDragMove} onMouseUp={onCropDragEnd} onMouseLeave={onCropDragEnd}
                                        onTouchMove={onCropDragMove} onTouchEnd={onCropDragEnd}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={pendingUrl} alt="Crop preview" onLoad={onCropImgLoad} draggable={false}
                                            className="block pointer-events-none select-none"
                                            style={{ width: cropDisplay.w || 'auto', height: cropDisplay.h || 'auto', maxWidth: '100%' }} />
                                        {cropDisplay.w > 0 && (
                                            <>
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: 0, left: 0, right: 0, height: cropBox.y }} />
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: cropBox.y + cropBox.h, left: 0, right: 0, bottom: 0 }} />
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: cropBox.y, left: 0, width: cropBox.x, height: cropBox.h }} />
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: cropBox.y, left: cropBox.x + cropBox.w, right: 0, height: cropBox.h }} />
                                                <div className="absolute border-2 border-accent shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
                                                    style={{ left: cropBox.x, top: cropBox.y, width: cropBox.w, height: cropBox.h, cursor: 'grab' }}
                                                    onMouseDown={e => onCropDragStart(e, 'move')} onTouchStart={e => onCropDragStart(e, 'move')}>
                                                    <div className="absolute inset-0 pointer-events-none">
                                                        {[33.33, 66.66].map(p => (
                                                            <React.Fragment key={p}>
                                                                <div className="absolute border-l border-white/20 h-full" style={{ left: `${p}%` }} />
                                                                <div className="absolute border-t border-white/20 w-full" style={{ top: `${p}%` }} />
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                                                        <Move size={20} className="text-white" />
                                                    </div>
                                                    {RESIZE_HANDLES.map(h => (
                                                        <div key={h.id} className="absolute w-3 h-3 bg-white border-2 border-accent rounded-sm shadow-md z-10"
                                                            style={{ ...h.style, position: 'absolute', cursor: h.cursor } as React.CSSProperties}
                                                            onMouseDown={e => onCropDragStart(e, h.id)} onTouchStart={e => onCropDragStart(e, h.id)} />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="px-5 py-4 border-t border-border flex items-center justify-between gap-3 shrink-0 bg-surface">
                                    <button onClick={resetCrop} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg border border-border text-muted hover:text-foreground hover:border-accent/30 transition-all text-xs font-bold whitespace-nowrap">
                                        <RotateCcw size={14} /> Reset
                                    </button>
                                    <div className="flex gap-2 sm:gap-3">
                                        <button onClick={closeCropModal} className="px-4 py-2.5 rounded-xl border border-border bg-bg text-muted hover:text-foreground transition-all text-xs font-bold">Cancel</button>
                                        <button onClick={applyCrop} className="flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl bg-accent text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-accent/20 active:scale-95 whitespace-nowrap">
                                            <Check size={14} /> Apply Crop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div initial={{ opacity: 0, y: 48, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.9 }}
                        className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 z-[300] pointer-events-none font-bold text-sm border",
                            toastMsg.type === 'error'   ? 'bg-red-500   border-red-400   text-white' :
                            toastMsg.type === 'success' ? 'bg-green-500 border-green-400 text-white' :
                                                          'bg-surface   border-border    text-foreground')}>
                        <span>{toastMsg.text}</span>
                        {toastMsg.type === 'success' && <Check size={15} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};