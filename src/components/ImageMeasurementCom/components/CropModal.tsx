'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crop as CropIcon, X, RotateCcw, Check } from 'lucide-react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { createPortal } from 'react-dom';

interface CropModalProps {
    showCropModal: boolean;
    pendingUrl: string | null;
    resetCrop: () => void;
    closeCropModal: () => void;
    applyCrop: (pixelCrop: PixelCrop) => void;
    title?: string;
    isLoading?: boolean;
}

export const CropModal: React.FC<CropModalProps> = ({
    showCropModal,
    pendingUrl,
    resetCrop,
    closeCropModal,
    applyCrop,
    title = "Finalize Upload",
    isLoading = false
}) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (showCropModal && mounted) {
            document.documentElement.classList.add('modal-open');
            document.body.classList.add('modal-open');
            return () => {
                document.documentElement.classList.remove('modal-open');
                document.body.classList.remove('modal-open');
            };
        }
    }, [showCropModal, mounted]);

    const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        imgRef.current = img;
        const { width: w, height: h } = img;

        // Initial crop: full image
        const newCrop: Crop = {
            unit: '%',
            x: 0,
            y: 0,
            width: 100,
            height: 100
        };
        setCrop(newCrop);
    }, []);

    const handleReset = () => {
        if (!imgRef.current) return;
        const newCrop: Crop = {
            unit: '%',
            x: 0,
            y: 0,
            width: 100,
            height: 100
        };
        setCrop(newCrop);
        setCompletedCrop(undefined);
        resetCrop();
    };

    const handleApply = () => {
        if (completedCrop && imgRef.current) {
            const img = imgRef.current;
            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;

            const isFullCrop = completedCrop.width > 99.8 && completedCrop.height > 99.8;

            const naturalCrop: PixelCrop = {
                unit: 'px',
                x: isFullCrop ? 0 : completedCrop.x * scaleX,
                y: isFullCrop ? 0 : completedCrop.y * scaleY,
                width: isFullCrop ? img.naturalWidth : completedCrop.width * scaleX,
                height: isFullCrop ? img.naturalHeight : completedCrop.height * scaleY
            };

            applyCrop(naturalCrop);
        } else if (imgRef.current) {
            applyCrop({
                x: 0, y: 0,
                width: imgRef.current.naturalWidth,
                height: imgRef.current.naturalHeight,
                unit: 'px'
            });
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {showCropModal && pendingUrl && (
                <div className="fixed inset-0 z-[9999999] pointer-events-none">
                    <motion.div key="crop-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/85 backdrop-blur-md pointer-events-auto" onClick={closeCropModal} />

                    <motion.div key="crop-modal-content" initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 24 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">

                        <div className="pointer-events-auto w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                            style={{ maxHeight: 'calc(100dvh - 32px)' }} onClick={e => e.stopPropagation()}>

                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-5 border-b border-border shrink-0 bg-surface">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        <CropIcon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-[0.15em] text-foreground">
                                            {title}
                                        </h3>
                                        <p className="text-[10px] uppercase tracking-wider text-muted mt-1 font-bold hidden sm:block">
                                            Drag corners to select region
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeCropModal}
                                    className="w-9 h-9 rounded-2xl bg-bg border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all shrink-0"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Crop Area */}
                            {/* Removed 'flex items-center justify-center' to prevent the top/left clipping bug */}
                            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-bg min-h-0 touch-none">
                                {/* Added an inner wrapper to allow safe centering that respects scroll boundaries */}
                                <div className="min-h-full flex flex-col">
                                    {/* m-auto safely centers. Removed percentage heights which break in flex containers */}
                                    <div className="relative m-auto rounded-2xl shadow-2xl w-fit h-fit overflow-hidden p-2 sm:p-4 bg-surface">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                        >
                                            <img
                                                src={pendingUrl}
                                                alt="Crop preview"
                                                onLoad={onImageLoad}
                                                draggable={false}
                                                // Added specific max-heights (vh) so the image scales down, 
                                                // keeping it visible without massive overflow.
                                                className="block select-none max-w-full max-h-[55vh] lg:max-h-[65vh] w-auto h-auto rounded-xl"
                                            />
                                        </ReactCrop>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            {/* FIX: Centered buttons by changing justify-between to justify-center and removing ml-auto */}
                            <div className="p-4 sm:p-5 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-3 shrink-0 bg-surface">
                                <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={closeCropModal}
                                        disabled={isLoading}
                                        className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-2xl border border-border bg-bg text-muted hover:text-foreground hover:border-accent/40 transition-all text-xs font-black uppercase tracking-widest disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        disabled={isLoading}
                                        className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-accent text-white font-black uppercase tracking-[0.1em] text-xs shadow-xl shadow-accent/25 hover:bg-accent-secondary active:scale-95 transition-all disabled:opacity-70"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Check size={16} strokeWidth={3} />
                                        )}
                                        <span>{isLoading ? 'Uploading...' : 'Apply Crop'}</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};