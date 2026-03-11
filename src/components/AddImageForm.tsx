'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, uid, HEIGHT_LIMITS, UnitSystem } from '../types';
import { UploadCloud, Crop, Check, X, RotateCcw, Move } from 'lucide-react';

interface AddImageFormProps {
    onAdd: (person: Person) => void;
}

interface CropBox {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface DragState {
    type: 'move' | 'resize';
    handle: string;
    startMouseX: number;
    startMouseY: number;
    startBox: CropBox;
}

const RESIZE_HANDLES = [
    { id: 'n',  cursor: 'ns-resize',    style: { top: -5,    left: '50%', transform: 'translateX(-50%)' } },
    { id: 's',  cursor: 'ns-resize',    style: { bottom: -5, left: '50%', transform: 'translateX(-50%)' } },
    { id: 'e',  cursor: 'ew-resize',    style: { right: -5,  top: '50%',  transform: 'translateY(-50%)' } },
    { id: 'w',  cursor: 'ew-resize',    style: { left: -5,   top: '50%',  transform: 'translateY(-50%)' } },
    { id: 'ne', cursor: 'nesw-resize',  style: { top: -5,    right: -5 } },
    { id: 'nw', cursor: 'nwse-resize',  style: { top: -5,    left: -5  } },
    { id: 'se', cursor: 'nwse-resize',  style: { bottom: -5, right: -5 } },
    { id: 'sw', cursor: 'nesw-resize',  style: { bottom: -5, left: -5  } },
];

const AddImageForm: React.FC<AddImageFormProps> = ({ onAdd }) => {
    // Form state
    const [name, setName] = useState('');
    const [unit, setUnit] = useState<UnitSystem>('metric');
    const [heightCm, setHeightCm] = useState<string>('170');
    const [heightFt, setHeightFt] = useState<string>('5');
    const [heightIn, setHeightIn] = useState<string>('7');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Crop modal state
    const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, w: 200, h: 300 });
    const [imgDisplaySize, setImgDisplaySize] = useState({ w: 0, h: 0 });
    const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
    const [dragState, setDragState] = useState<DragState | null>(null);
    const cropContainerRef = useRef<HTMLDivElement>(null);

    const MIN_CROP = 20;

    /* ─────────────────── File Handling ─────────────────── */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }

        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = parseFloat(heightCm) || 0;
            if (finalHeightCm < HEIGHT_LIMITS.MIN_CM || finalHeightCm > HEIGHT_LIMITS.MAX_CM) {
                setError(`Height must be between ${HEIGHT_LIMITS.MIN_CM} and ${HEIGHT_LIMITS.MAX_CM} cm.`);
                return;
            }
        } else {
            finalHeightCm = (parseFloat(heightFt) || 0) * 30.48 + (parseFloat(heightIn) || 0) * 2.54;
            if (finalHeightCm < HEIGHT_LIMITS.MIN_CM || finalHeightCm > HEIGHT_LIMITS.MAX_CM) {
                setError('Height outside allowed range.'); return;
            }
        }

        setError('');
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            if (result) {
                setPendingImageUrl(result);
                setShowCropModal(true);
            }
        };
        reader.onerror = () => setError('Failed to read file.');
        reader.readAsDataURL(file);
        if (inputRef.current) inputRef.current.value = '';
    };

    /* ─────────────────── Image Load → set display dimensions ─────────────────── */
    const handleImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const container = cropContainerRef.current;
        if (!container) return;

        const maxW = Math.min(container.clientWidth, window.innerWidth - 48);
        const maxH = Math.min(Math.round(window.innerHeight * 0.52), 480);

        const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
        const dw = Math.round(img.naturalWidth * scale);
        const dh = Math.round(img.naturalHeight * scale);

        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
        setImgDisplaySize({ w: dw, h: dh });

        // Default crop: 85% centred
        const pad = 0.075;
        setCropBox({
            x: Math.round(dw * pad),
            y: Math.round(dh * pad),
            w: Math.round(dw * (1 - pad * 2)),
            h: Math.round(dh * (1 - pad * 2)),
        });
    }, []);

    /* ─────────────────── Pointer helpers ─────────────────── */
    const getCoords = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
        const rect = cropContainerRef.current?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        if ('touches' in e) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    };

    const startDrag = (e: React.MouseEvent | React.TouchEvent, handle: string) => {
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = getCoords(e);
        setDragState({ type: handle === 'move' ? 'move' : 'resize', handle, startMouseX: x, startMouseY: y, startBox: { ...cropBox } });
    };

const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!dragState) return;
        e.preventDefault();
        const { x, y } = getCoords(e);
        const dx = x - dragState.startMouseX;
        const dy = y - dragState.startMouseY;
        const sb = dragState.startBox;
        const mw = imgDisplaySize.w;
        const mh = imgDisplaySize.h;
        const nb = { ...sb };

        if (dragState.type === 'move') {
            nb.x = Math.max(0, Math.min(mw - sb.w, sb.x + dx));
            nb.y = Math.max(0, Math.min(mh - sb.h, sb.y + dy));
        } else {
            const h = dragState.handle;
            if (h.includes('e')) nb.w = Math.max(MIN_CROP, Math.min(mw - sb.x, sb.w + dx));
            if (h.includes('w')) {
                const nx = Math.max(0, Math.min(sb.x + sb.w - MIN_CROP, sb.x + dx));
                nb.w = sb.x + sb.w - nx; nb.x = nx;
            }
            if (h.includes('s')) nb.h = Math.max(MIN_CROP, Math.min(mh - sb.y, sb.h + dy));
            if (h.includes('n')) {
                const ny = Math.max(0, Math.min(sb.y + sb.h - MIN_CROP, sb.y + dy));
                nb.h = sb.y + sb.h - ny; nb.y = ny;
            }
        }
        setCropBox(nb);
    };

    const endDrag = () => setDragState(null);

    const resetCrop = () => {
        if (imgDisplaySize.w > 0)
            setCropBox({ x: 0, y: 0, w: imgDisplaySize.w, h: imgDisplaySize.h });
    };

    /* ─────────────────── Apply Crop → add Person ─────────────────── */
    const applyCrop = () => {
        if (!pendingImageUrl || imgDisplaySize.w === 0) return;
        const img = new Image();
        img.onload = () => {
            const sx = naturalSize.w / imgDisplaySize.w;
            const sy = naturalSize.h / imgDisplaySize.h;
            const canvas = document.createElement('canvas');
            canvas.width  = Math.round(cropBox.w * sx);
            canvas.height = Math.round(cropBox.h * sy);
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(img, cropBox.x * sx, cropBox.y * sy, cropBox.w * sx, cropBox.h * sy, 0, 0, canvas.width, canvas.height);

            let finalH = 0;
            if (unit === 'metric') finalH = parseFloat(heightCm) || 170;
            else finalH = (parseFloat(heightFt) || 5) * 30.48 + (parseFloat(heightIn) || 7) * 2.54;

            onAdd({
                id: uid(),
                name: name.trim() || 'Custom Image',
                heightCm: finalH,
                gender: 'other',
                color: '#3B82F6',
                imgUrl: canvas.toDataURL('image/png', 0.95),
            });

            setShowCropModal(false);
            setPendingImageUrl(null);
            setName('');
            setHeightCm('170');
        };
        img.src = pendingImageUrl;
    };

    const closeModal = () => { setShowCropModal(false); setPendingImageUrl(null); };

    /* ─────────────────── Render ─────────────────── */
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="p-6 space-y-6"
            >
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-accent rounded-full" />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-black text-foreground/70">Add Image Person</h2>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Name</label>
                    <input
                        type="text"
                        placeholder="Optional"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all"
                    />
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-0.5">
                        <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60">Height</label>
                        <div className="flex gap-1.5">
                            {(['metric', 'imperial'] as UnitSystem[]).map(u => (
                                <button key={u} type="button" onClick={() => setUnit(u)}
                                    className={`text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded border transition-all ${unit === u ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted/70 hover:text-muted'}`}>
                                    {u === 'metric' ? 'Metric' : 'Imp'}
                                </button>
                            ))}
                        </div>
                    </div>
                    {unit === 'metric' ? (
                        <div className="flex bg-bg border border-border rounded-2xl overflow-hidden focus-within:border-accent/40 transition-all">
                            <input type="number" placeholder="Height" value={heightCm} onChange={e => setHeightCm(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none" />
                            <div className="px-4 py-3 bg-surface text-foreground/60 font-mono text-sm font-black border-l border-border flex items-center">CM</div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <input type="number" placeholder="Ft" value={heightFt} onChange={e => setHeightFt(e.target.value)}
                                    className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none" />
                                <div className="px-2 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center shrink-0">FT</div>
                            </div>
                            <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <input type="number" placeholder="In" value={heightIn} onChange={e => setHeightIn(e.target.value)}
                                    className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none" />
                                <div className="px-2 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center shrink-0">IN</div>
                            </div>
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 text-xs px-1">{error}</p>}

                {/* Upload Button */}
                <div>
                    <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleFileChange} />
                    <button
                        onClick={() => { setError(''); inputRef.current?.click(); }}
                        className="w-full bg-accent text-white font-black py-4 px-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 uppercase tracking-widest text-xs hover:bg-accent-secondary"
                    >
                        <UploadCloud size={18} /> Upload &amp; Crop
                    </button>
                    <p className="text-[11px] text-muted font-black text-center mt-3 uppercase tracking-wider">
                        PNG with transparent background works best
                    </p>
                </div>
            </motion.div>

            {/* ────── Crop Modal ────── */}
            <AnimatePresence>
                {showCropModal && pendingImageUrl && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
                            onClick={closeModal}
                        />

                        {/* Modal Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 24 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
                        >
                            <div
                                className="pointer-events-auto w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                                style={{ maxHeight: 'calc(100dvh - 32px)' }}
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                            <Crop size={17} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Crop Image</h3>
                                            <p className="text-[11px] text-muted mt-0.5 hidden sm:block">Drag the box or handles to select the crop region</p>
                                        </div>
                                    </div>
                                    <button onClick={closeModal}
                                        className="w-8 h-8 rounded-xl bg-bg border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 transition-all shrink-0">
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Crop canvas area */}
                                <div className="flex-1 overflow-auto p-4 bg-bg/60 flex items-center justify-center">
                                    <div
                                        ref={cropContainerRef}
                                        className="relative overflow-hidden rounded-xl select-none"
                                        style={{
                                            width: imgDisplaySize.w || '100%',
                                            height: imgDisplaySize.h || 240,
                                            maxWidth: '100%',
                                            cursor: dragState ? 'grabbing' : 'default',
                                            // checkerboard pattern to show transparency
                                            backgroundImage: 'repeating-conic-gradient(#8881 0% 25%, transparent 0% 50%)',
                                            backgroundSize: '16px 16px',
                                        }}
                                        onMouseMove={onDragMove}
                                        onMouseUp={endDrag}
                                        onMouseLeave={endDrag}
                                        onTouchMove={onDragMove}
                                        onTouchEnd={endDrag}
                                    >
                                        {/* Base image */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={pendingImageUrl}
                                            alt="Crop preview"
                                            onLoad={handleImgLoad}
                                            draggable={false}
                                            className="block pointer-events-none select-none"
                                            style={{ width: imgDisplaySize.w || 'auto', height: imgDisplaySize.h || 'auto', maxWidth: '100%' }}
                                        />

                                        {/* Dark overlay: 4 quadrants */}
                                        {imgDisplaySize.w > 0 && (
                                            <>
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: 0, left: 0, right: 0, height: cropBox.y }} />
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: cropBox.y + cropBox.h, left: 0, right: 0, bottom: 0 }} />
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: cropBox.y, left: 0, width: cropBox.x, height: cropBox.h }} />
                                                <div className="absolute pointer-events-none bg-black/55" style={{ top: cropBox.y, left: cropBox.x + cropBox.w, right: 0, height: cropBox.h }} />

                                                {/* Crop box */}
                                                <div
                                                    className="absolute border-2 border-accent shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
                                                    style={{ left: cropBox.x, top: cropBox.y, width: cropBox.w, height: cropBox.h, cursor: 'grab' }}
                                                    onMouseDown={e => startDrag(e, 'move')}
                                                    onTouchStart={e => startDrag(e, 'move')}
                                                >
                                                    {/* Rule-of-thirds lines */}
                                                    <div className="absolute inset-0 pointer-events-none">
                                                        {[33.33, 66.66].map(p => (
                                                            <React.Fragment key={p}>
                                                                <div className="absolute border-l border-white/20 h-full" style={{ left: `${p}%` }} />
                                                                <div className="absolute border-t border-white/20 w-full" style={{ top: `${p}%` }} />
                                                            </React.Fragment>
                                                        ))}
                                                    </div>

                                                    {/* Move icon center hint */}
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                                                        <Move size={20} className="text-white" />
                                                    </div>

                                                    {/* 8 resize handles */}
                                                    {RESIZE_HANDLES.map(h => (
                                                        <div
                                                            key={h.id}
                                                            className="absolute w-3 h-3 bg-white border-2 border-accent rounded-sm shadow-md z-10"
                                                            style={{ ...h.style, position: 'absolute', cursor: h.cursor } as React.CSSProperties}
                                                            onMouseDown={e => startDrag(e, h.id)}
                                                            onTouchStart={e => startDrag(e, h.id)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-4 border-t border-border flex items-center justify-between gap-3 shrink-0 bg-surface">
                                    <button onClick={resetCrop}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg border border-border text-muted hover:text-foreground hover:border-accent/30 transition-all text-xs font-bold whitespace-nowrap">
                                        <RotateCcw size={14} /> Reset
                                    </button>
                                    <div className="flex gap-2 sm:gap-3">
                                        <button onClick={closeModal}
                                            className="px-4 py-2.5 rounded-xl border border-border bg-bg text-muted hover:text-foreground transition-all text-xs font-bold">
                                            Cancel
                                        </button>
                                        <button onClick={applyCrop}
                                            className="flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl bg-accent text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-accent/20 hover:bg-accent-secondary transition-all active:scale-95 whitespace-nowrap">
                                            <Check size={14} /> Apply Crop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default AddImageForm;
