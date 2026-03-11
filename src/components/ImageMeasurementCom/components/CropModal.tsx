'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crop, X, Move, RotateCcw, Check } from 'lucide-react';
import NextImage from 'next/image';

interface CropBox { x: number; y: number; w: number; h: number; }
interface CropDrag { handle: string; startMX: number; startMY: number; startBox: CropBox; }

interface CropModalProps {
    showCropModal: boolean;
    pendingUrl: string | null;
    cropContainerRef: React.RefObject<HTMLDivElement | null>;
    cropDisplay: { w: number; h: number };
    onCropDragMove: (e: React.MouseEvent | React.TouchEvent) => void;
    onCropDragEnd: () => void;
    onCropImgLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
    onCropDragStart: (e: React.MouseEvent | React.TouchEvent, handle: string) => void;
    cropBox: CropBox;
    cropDrag: CropDrag | null;
    resetCrop: () => void;
    closeCropModal: () => void;
    applyCrop: () => void;
    title?: string;
}

const RESIZE_HANDLES = [
    { id: 'n', cursor: 'ns-resize', style: { top: -5, left: '50%', transform: 'translateX(-50%)' } },
    { id: 's', cursor: 'ns-resize', style: { bottom: -5, left: '50%', transform: 'translateX(-50%)' } },
    { id: 'e', cursor: 'ew-resize', style: { right: -5, top: '50%', transform: 'translateY(-50%)' } },
    { id: 'w', cursor: 'ew-resize', style: { left: -5, top: '50%', transform: 'translateY(-50%)' } },
    { id: 'ne', cursor: 'nesw-resize', style: { top: -5, right: -5 } },
    { id: 'nw', cursor: 'nwse-resize', style: { top: -5, left: -5 } },
    { id: 'se', cursor: 'nwse-resize', style: { bottom: -5, right: -5 } },
    { id: 'sw', cursor: 'nesw-resize', style: { bottom: -5, left: -5 } },
] as const;

export const CropModal: React.FC<CropModalProps> = ({
    showCropModal,
    pendingUrl,
    cropContainerRef,
    cropDisplay,
    onCropDragMove,
    onCropDragEnd,
    onCropImgLoad,
    onCropDragStart,
    cropBox,
    cropDrag,
    resetCrop,
    closeCropModal,
    applyCrop,
    title = "Finalize Upload"
}) => {
    return (
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
                                        <h3 className="text-sm font-black uppercase tracking-widest">{title}</h3>
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
                                    <NextImage src={pendingUrl} alt="Crop preview" onLoad={onCropImgLoad} draggable={false}
                                        width={cropDisplay.w || 600} height={cropDisplay.h || 300} unoptimized
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
    );
};
