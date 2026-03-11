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
    fileInputRef
}) => {
    return (
        <div
            ref={wrapperRef}
            className={cn(
                "relative w-full rounded-2xl border border-border overflow-hidden bg-black/40",
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
                    <p className="text-xs text-foreground/40 mt-1">PNG, JPG up to 10 MB</p>
                </div>
            ) : (
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
        </div>
    );
};
