'use client';

import React from 'react';
import { Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';

interface CanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    wrapperRef: React.RefObject<HTMLDivElement | null>;
    onCanvasMouseDown: (e: React.MouseEvent) => void;
    onCanvasTouchStart: (e: React.TouchEvent) => void;
    uploadedImage: string | null;
    displaySize: { w: number; h: number } | null;
    mode: 'idle' | 'calibrating' | 'measuring';
    isScanning: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    magnifierPoint: { x: number; y: number } | null;
    isDrawing: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
    canvasRef,
    wrapperRef,
    onCanvasMouseDown,
    onCanvasTouchStart,
    uploadedImage,
    displaySize,
    mode,
    isScanning,
    fileInputRef,
    magnifierPoint,
    isDrawing
}) => {
    return (
        <div
            ref={wrapperRef}
            className={cn(
                "relative w-full rounded-2xl border border-border overflow-hidden bg-black/40 shadow-inner",
                !uploadedImage && "border-dashed min-h-[260px] flex items-center justify-center"
            )}
            style={displaySize ? { height: displaySize.h } : undefined}
        >
            {!uploadedImage ? (
                <div className="flex flex-col items-center cursor-pointer group p-10 w-full"
                    onClick={() => fileInputRef.current?.click()}>
                    <div className="w-14 h-14 rounded-full bg-border/20 flex items-center justify-center group-hover:bg-accent/10 transition-colors mb-3">
                        <Upload className="w-7 h-7 text-foreground/40 group-hover:text-accent transition-colors" />
                    </div>
                    <p className="font-semibold text-foreground/70">Click to upload an image</p>
                    <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-black">PNG, JPG up to 10 MB</p>
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={onCanvasMouseDown}
                        onTouchStart={onCanvasTouchStart}
                        className={cn(
                            "block select-none max-w-full",
                            mode !== 'idle' ? "cursor-crosshair" : "cursor-default",
                            isDrawing && "touch-none"
                        )}
                        style={isDrawing ? { touchAction: 'none' } : undefined}
                    />
                </div>
            )}

            {/* Magnifier for Mobile Precision */}
            <AnimatePresence>
                {magnifierPoint && displaySize && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute pointer-events-none z-[100] border-2 border-white shadow-2xl rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32"
                        style={{
                            left: magnifierPoint.x,
                            top: magnifierPoint.y - 100, // Show above the finger
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div
                            className="bg-accent/20 w-full h-full"
                            style={{
                                backgroundImage: `url(${uploadedImage})`,
                                backgroundSize: `${displaySize.w * 2}px ${displaySize.h * 2}px`,
                                backgroundPosition: `-${magnifierPoint.x * 2 - (magnifierPoint.x > displaySize.w / 2 ? 48 : 64)}px -${magnifierPoint.y * 2 - (magnifierPoint.y > displaySize.h / 2 ? 48 : 64)}px`,
                                // Simpler version: just center the point
                                backgroundPositionX: -magnifierPoint.x * 2 + (window.innerWidth < 640 ? 48 : 64),
                                backgroundPositionY: -magnifierPoint.y * 2 + (window.innerWidth < 640 ? 48 : 64),
                            }}
                        />
                        {/* Crosshair in magnifier */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-px bg-white/40" />
                            <div className="h-full w-px bg-white/40" />
                            <div className="w-2 h-2 rounded-full border border-white" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scan animation */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div initial={{ top: '-5%' }} animate={{ top: '105%' }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)', boxShadow: '0 0 16px 3px var(--accent)' }} />
                )}
            </AnimatePresence>
        </div>
    );
};
