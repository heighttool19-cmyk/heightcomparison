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
        <div className="flex gap-3">
            <button
                onClick={recalibrate}
                className={cn(
                    "flex-1 px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border transition-all",
                    mode === 'calibrating' && !showCalibModal
                        ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                        : "bg-surface border-border text-muted hover:text-foreground hover:border-accent/30"
                )}
            >
                <Ruler className="w-4 h-4" /> Recalibrate
            </button>
            <button
                onClick={handleAutoScan}
                disabled={isScanning || !calibLine}
                className={cn(
                    "flex-1 px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border transition-all",
                    !calibLine
                        ? "opacity-40 cursor-not-allowed bg-surface border-border text-muted"
                        : "bg-[#14B8A6] text-white border-[#14B8A6] shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95"
                )}
            >
                <Zap className={cn("w-4 h-4", isScanning && "animate-spin")} />
                {isScanning ? 'Scanning…' : 'AI Auto-Scan'}
            </button>
            <button
                onClick={handleNewImage}
                className="px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-surface border-border text-muted hover:text-foreground hover:border-accent/30 transition-all border"
                title="Upload Another Image"
            >
                <RefreshCcw className="w-4 h-4" />
                <span className="hidden sm:inline">New Image</span>
            </button>
        </div>
    );
};
