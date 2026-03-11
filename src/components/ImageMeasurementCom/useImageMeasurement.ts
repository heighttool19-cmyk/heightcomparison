'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useHeightStore } from '@/store/useHeightStore';
import { usePersonStore, useUnitStore } from '@/store';
import { Gender } from '@/types';

/* ─────────────────────────── Types ─────────────────────────── */
export interface Point { x: number; y: number; }
export interface Line { p1: Point; p2: Point; }
export interface CropBox { x: number; y: number; w: number; h: number; }
export interface CropDrag {
    handle: string;
    startMX: number; startMY: number;
    startBox: CropBox;
}

export type Mode = 'idle' | 'calibrating' | 'measuring';

const MIN_CROP = 20;
const MAX_CANVAS_H = 700;

export const useImageMeasurement = () => {
    /* ── refs ── */
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const cropContainerRef = useRef<HTMLDivElement>(null);

    const firstPointRef = useRef<Point | null>(null);
    const isDraggingRef = useRef(false);
    const modeRef = useRef<Mode>('idle');
    const isMouseDown = useRef(false);

    const { uploadedImage, setUploadedImage, setCalibrationDetails, setMeasurementPx, calculatedHeight } = useHeightStore();
    const { unitSystem } = useUnitStore();
    const { addPerson } = usePersonStore();

    const [mode, setMode] = useState<Mode>('idle');
    const [firstPoint, setFirstPoint] = useState<Point | null>(null);
    const [livePoint, setLivePoint] = useState<Point | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [calibLine, setCalibLine] = useState<Line | null>(null);
    const [measLine, setMeasLine] = useState<Line | null>(null);

    const [showCalibModal, setShowCalibModal] = useState(false);
    const [calibCm, setCalibCm] = useState('203');

    const [isScanning, setIsScanning] = useState(false);
    const [isSavedToChart, setIsSavedToChart] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [isSavingCrop, setIsSavingCrop] = useState(false);
    const [savedSubjectUrl, setSavedSubjectUrl] = useState<string | null>(null);
    const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, w: 200, h: 300 });
    const [cropDisplay, setCropDisplay] = useState({ w: 0, h: 0 });
    const [cropNatural, setCropNatural] = useState({ w: 0, h: 0 });
    const [cropDrag, setCropDrag] = useState<CropDrag | null>(null);

    const [displaySize, setDisplaySize] = useState<{ w: number; h: number } | null>(null);

    useEffect(() => { firstPointRef.current = firstPoint; }, [firstPoint]);
    useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);
    useEffect(() => { modeRef.current = mode; }, [mode]);

    const toast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'info') => {
        setToastMsg({ text, type });
        setTimeout(() => setToastMsg(null), 3000);
    }, []);

    const sizeAndDraw = useCallback((
        overrideCalibLine?: Line | null,
        overrideMeasLine?: Line | null,
        overrideFirstPt?: Point | null,
        overrideLivePt?: Point | null,
        overrideIsDragging?: boolean,
        overrideMode?: Mode,
    ) => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        const img = imageRef.current;
        if (!canvas || !wrapper || !img) return;

        const availW = wrapper.clientWidth;
        if (!availW) return;

        const scaleW = availW / img.naturalWidth;
        let dw = Math.round(img.naturalWidth * scaleW);
        let dh = Math.round(img.naturalHeight * scaleW);
        if (dh > MAX_CANVAS_H) {
            const scaleH = MAX_CANVAS_H / img.naturalHeight;
            dw = Math.round(img.naturalWidth * scaleH);
            dh = MAX_CANVAS_H;
        }

        const dpr = window.devicePixelRatio || 1;
        const needsResize = canvas.width !== dw * dpr || canvas.height !== dh * dpr;
        if (needsResize) {
            canvas.width = dw * dpr;
            canvas.height = dh * dpr;
            canvas.style.width = `${dw}px`;
            canvas.style.height = `${dh}px`;
            setDisplaySize({ w: dw, h: dh });
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, dw, dh);
        ctx.drawImage(img, 0, 0, dw, dh);

        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim() || '#14B8A6';
        const secondary = '#B9A7FF';

        const cLine = overrideCalibLine !== undefined ? overrideCalibLine : calibLine;
        const mLine = overrideMeasLine !== undefined ? overrideMeasLine : measLine;
        const fp = overrideFirstPt !== undefined ? overrideFirstPt : firstPoint;
        const lp = overrideLivePt !== undefined ? overrideLivePt : livePoint;
        const drag = overrideIsDragging !== undefined ? overrideIsDragging : isDragging;
        const md = overrideMode !== undefined ? overrideMode : mode;

        if (cLine) paintLine(ctx, cLine.p1, cLine.p2, secondary, 'Ref');
        if (mLine) paintLine(ctx, mLine.p1, mLine.p2, accent, 'Target');

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

    useEffect(() => { sizeAndDraw(); }, [sizeAndDraw]);

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
            requestAnimationFrame(() => requestAnimationFrame(() => sizeAndDraw()));
        };
    }, [uploadedImage, sizeAndDraw]);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            sizeAndDraw();
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [sizeAndDraw]);

    const clientToCanvas = useCallback((clientX: number, clientY: number): Point | null => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return null;
        return {
            x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
            y: Math.max(0, Math.min(rect.height, clientY - rect.top)),
        };
    }, []);

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
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [clientToCanvas, commitLine]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') cancelDrawing(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [cancelDrawing]);

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
            const COLS = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90]
                .map(p => Math.floor(iw * p)).filter(x => Math.abs(x - calibMidX) > exclW);
            if (!COLS.length) COLS.push(calibMidX > iw / 2 ? Math.floor(iw * 0.2) : Math.floor(iw * 0.8));
            const isContent = (r: number, g: number, b: number, a: number) => a > 40 && (0.299 * r + 0.587 * g + 0.114 * b) < 240;
            let gTop = ih, gBot = 0, bestX = iw / 2;
            for (const col of COLS) {
                let lTop = -1, lBot = -1;
                for (let y = 0; y < ih; y++) { const i = (y * iw + col) * 4; if (isContent(data[i], data[i + 1], data[i + 2], data[i + 3])) { lTop = y; break; } }
                for (let y = ih - 1; y >= 0; y--) { const i = (y * iw + col) * 4; if (isContent(data[i], data[i + 1], data[i + 2], data[i + 3])) { lBot = y; break; } }
                if (lTop !== -1 && lTop < gTop) { gTop = lTop; bestX = col; }
                if (lBot !== -1 && lBot > gBot) gBot = lBot;
            }
            if (gTop >= gBot) { toast('Could not detect subject.', 'error'); return; }
            const p1 = { x: bestX / dpr, y: gTop / dpr }, p2 = { x: bestX / dpr, y: gBot / dpr };
            setMeasLine({ p1, p2 }); setMeasurementPx(Math.hypot(p2.x - p1.x, p2.y - p1.y));
            toast('AI detection complete!', 'success');
        } catch { toast('AI scan failed.', 'error'); }
        finally { sizeAndDraw(); setIsScanning(false); }
    };

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
        const sc = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
        const dw = Math.round(img.naturalWidth * sc), dh = Math.round(img.naturalHeight * sc);
        setCropNatural({ w: img.naturalWidth, h: img.naturalHeight });
        setCropDisplay({ w: dw, h: dh });
        const pad = 0.05;
        setCropBox({ x: Math.round(dw * pad), y: Math.round(dh * pad), w: Math.round(dw * (1 - pad * 2)), h: Math.round(dh * (1 - pad * 2)) });
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
        if (cropDrag.handle === 'move') { nb.x = Math.max(0, Math.min(mw - sb.w, sb.x + dx)); nb.y = Math.max(0, Math.min(mh - sb.h, sb.y + dy)); }
        else {
            const h = cropDrag.handle;
            if (h.includes('e')) nb.w = Math.max(MIN_CROP, Math.min(mw - sb.x, sb.w + dx));
            if (h.includes('w')) { const nx = Math.max(0, Math.min(sb.x + sb.w - MIN_CROP, sb.x + dx)); nb.w = sb.x + sb.w - nx; nb.x = nx; }
            if (h.includes('s')) nb.h = Math.max(MIN_CROP, Math.min(mh - sb.y, sb.h + dy));
            if (h.includes('n')) { const ny = Math.max(0, Math.min(sb.y + sb.h - MIN_CROP, sb.y + dy)); nb.h = sb.y + sb.h - ny; nb.y = ny; }
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
            ctx.drawImage(img, cropBox.x * sx, cropBox.y * sy, cropBox.w * sx, cropBox.h * sy, 0, 0, c.width, c.height);
            const croppedDataUrl = c.toDataURL('image/png', 0.95);

            if (isSavingCrop) {
                setSavedSubjectUrl(croppedDataUrl);
                setShowCropModal(false);
                setPendingUrl(null);
                setIsSavingCrop(false);
                setShowSaveModal(true);
            } else {
                setUploadedImage(croppedDataUrl);
                setMode('calibrating');
                setCalibLine(null);
                setMeasLine(null);
                setShowCropModal(false);
                setPendingUrl(null);
                toast('Image ready — draw a calibration line.', 'success');
            }
        };
        img.src = pendingUrl;
    };
    const closeCropModal = () => { setShowCropModal(false); setPendingUrl(null); };
    const applyPreset = (cm: number, label: string) => { setCalibCm(cm.toString()); toast(`Preset: ${label} (${cm} cm)`, 'info'); };

    const handleSaveToChart = () => {
        if (calculatedHeight <= 0) {
            toast('No measurement to save!', 'error');
            return;
        }
        if (!uploadedImage) return;

        setPendingUrl(uploadedImage);
        setIsSavingCrop(true);
        setShowCropModal(true);
        toast('Crop the object for the chart entry', 'info');
    };

    const confirmSaveToChart = (details: { name: string; gender: Gender; color: string }) => {
        addPerson({
            id: `ai-${Date.now()}`,
            ...details,
            heightCm: calculatedHeight,
            imgUrl: savedSubjectUrl || undefined
        });
        setIsSavedToChart(true);
        setShowSaveModal(false);
        toast('Added to chart with photo!', 'success');
    };

    const handleNewImage = () => {
        handleRemoveImage();
        setTimeout(() => fileInputRef.current?.click(), 100);
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
        setMode('idle');
        setCalibLine(null);
        setMeasLine(null);
        setFirstPoint(null);
        setLivePoint(null);
        setIsSavedToChart(false);
        setDisplaySize(null);
    };

    return {
        // Refs
        canvasRef,
        wrapperRef,
        fileInputRef,
        cropContainerRef,
        // State
        mode,
        firstPoint,
        calibLine,
        measLine,
        showCalibModal,
        calibCm,
        isScanning,
        isSavedToChart,
        toastMsg,
        pendingUrl,
        showCropModal,
        cropBox,
        cropDisplay,
        cropDrag,
        displaySize,
        uploadedImage,
        calculatedHeight,
        unitSystem,
        // Methods
        onCanvasMouseDown,
        onCanvasTouchStart,
        confirmCalib,
        cancelCalib,
        recalibrate,
        handleAutoScan,
        handleFileUpload,
        onCropImgLoad,
        onCropDragStart,
        onCropDragMove,
        onCropDragEnd,
        resetCrop,
        applyCrop,
        closeCropModal,
        applyPreset,
        cancelDrawing,
        handleSaveToChart,
        confirmSaveToChart,
        handleRemoveImage,
        handleNewImage,
        setCalibCm,
        showSaveModal,
        setShowSaveModal,
        isSavingCrop,
        savedSubjectUrl
    };
};
