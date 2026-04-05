'use client';

import React from 'react';
import { Ruler, Zap, RefreshCcw } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { Line } from '../useImageMeasurement';

interface ControlsProps {
    mode: 'idle' | 'calibrating' | 'measuring';
    recalibrate: () => void;
    handleAutoScan: () => void;
    isScanning: boolean;
    uploadedImage: string | null;
    handleRemoveImage: () => void;
    handleNewImage: () => void;
    showCalibModal: boolean;
    calibLine: Line | null;
}

export const Controls: React.FC<ControlsProps> = ({
    mode,
    recalibrate,
    handleAutoScan,
    isScanning,
    uploadedImage,
    handleNewImage,
    showCalibModal,
    calibLine,
}) => {
    if (!uploadedImage) return null;

    return (
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
            <button
                onClick={recalibrate}
                className={cn(
                    "flex-1 px-1 sm:px-4 py-3 sm:py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 border transition-all whitespace-nowrap",
                    mode === 'calibrating' && !showCalibModal
                        ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                        : "bg-surface border-border text-muted hover:text-foreground hover:border-accent/30"
                )}
            >
                <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Recalibrate
            </button>

            <button
                onClick={handleAutoScan}
                disabled={isScanning || !calibLine}
                className={cn(
                    "flex-1 px-1 sm:px-4 py-3 sm:py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 border transition-all whitespace-nowrap",
                    !calibLine
                        ? "opacity-40 cursor-not-allowed bg-surface border-border text-muted"
                        : "bg-[#14B8A6] text-white border-[#14B8A6] shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95"
                )}
            >
                <Zap className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0", isScanning && "animate-spin")} />
                {isScanning ? 'Scanning…' : 'AI Auto-Scan'}
            </button>

            <button
                onClick={handleNewImage}
                className="px-1 sm:px-4 py-3 sm:py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 bg-surface border-border text-muted hover:text-foreground hover:border-accent/30 transition-all border shrink-0"
                title="Upload Another Image"
            >
                <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">New Image</span>
            </button>
        </div>
    );
};