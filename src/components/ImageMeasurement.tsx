'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHeightStore } from '@/store/useHeightStore';
import { Camera, Ruler, RefreshCcw, Upload, Check, ChevronRight, Zap, Target, Box, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePersonStore, useUnitStore } from '../store';
import { cn } from '../../lib/utils';
interface Point {
    x: number;
    y: number;
}

export const ImageMeasurement: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const {
        uploadedImage,
        setUploadedImage,
        setCalibrationDetails,
        setMeasurementPx,
        calculatedHeight,
    } = useHeightStore();

    const { unitSystem } = useUnitStore();

    const { addPerson } = usePersonStore();

    const [mode, setMode] = useState<'idle' | 'calibrating' | 'measuring'>('idle');
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<Point | null>(null);
    const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
    const [calibrationLine, setCalibrationLine] = useState<{ p1: Point; p2: Point } | null>(null);
    const [measurementLine, setMeasurementLine] = useState<{ p1: Point; p2: Point } | null>(null);
    const [showCalibInput, setShowCalibInput] = useState(false);
    const [tempCalibCm, setTempCalibCm] = useState('8.56'); // Default to credit card height/width
    const [isScanning, setIsScanning] = useState(false);
    const [isSavedToChart, setIsSavedToChart] = useState(false);
    const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

    const triggerToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
        setToastMessage({ message, type });
        setTimeout(() => setToastMessage(null), 3000);
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !uploadedImage || !imageRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imageRef.current;

        // Clear and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get colors from CSS variables
        const style = getComputedStyle(document.documentElement);
        const accentColor = style.getPropertyValue('--accent').trim() || '#14B8A6';
        const secondaryColor = '#B9A7FF'; // Light purple for calibration

        // Draw Calibration Line
        if (calibrationLine) {
            drawDistanceLine(ctx, calibrationLine.p1, calibrationLine.p2, secondaryColor, 'Ref');
        }

        // Draw Measurement Line
        if (measurementLine) {
            drawDistanceLine(ctx, measurementLine.p1, measurementLine.p2, accentColor, 'Target');
        }

        // Draw current active line while dragging
        if (isDrawing && startPoint && currentPoint) {
            const color = mode === 'calibrating' ? secondaryColor : accentColor;
            drawDistanceLine(ctx, startPoint, currentPoint, color, mode === 'calibrating' ? 'Ref...' : 'Measuring...');
        }
    }, [uploadedImage, calibrationLine, measurementLine, isDrawing, startPoint, currentPoint, mode]);

    useEffect(() => {
        draw();
    }, [draw]);

    // Load image onto canvas
    useEffect(() => {
        if (!uploadedImage) {
            imageRef.current = null;
            return;
        }

        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerWidth = container.clientWidth;
            const containerHeight = 600;

            const scale = Math.min(containerWidth / img.width, containerHeight / img.height);


            imageRef.current = img; // Store for draw()

            if (canvasRef.current) {
                canvasRef.current.width = img.width * scale;
                canvasRef.current.height = img.height * scale;
                draw();
            }
        };
    }, [uploadedImage, draw]);

    const drawDistanceLine = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point, color: string, label: string) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw endpoints
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 5, 0, Math.PI * 2);
        ctx.arc(p2.x, p2.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw label
        ctx.font = '12px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.fillText(label, midX + 10, midY);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (mode === 'idle') return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDrawing(true);
        setStartPoint({ x, y });
        setCurrentPoint({ x, y });

        // Reset saved state when starting a new measurement
        if (mode === 'measuring') {
            setIsSavedToChart(false);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCurrentPoint({ x, y });
    };

    const handleMouseUp = () => {
        if (!isDrawing || !startPoint || !currentPoint) return;

        const dist = Math.sqrt(
            Math.pow(currentPoint.x - startPoint.x, 2) +
            Math.pow(currentPoint.y - startPoint.y, 2)
        );

        if (dist > 5) {
            if (mode === 'calibrating') {
                setCalibrationLine({ p1: startPoint, p2: currentPoint });
                setShowCalibInput(true);
            } else if (mode === 'measuring') {
                setMeasurementLine({ p1: startPoint, p2: currentPoint });
                setMeasurementPx(dist);
            }
        }

        setIsDrawing(false);
        setStartPoint(null);
        setCurrentPoint(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadedImage(url);
            setMode('calibrating');
            setCalibrationLine(null);
            setMeasurementLine(null);
        }
    };

    const finalizeCalibration = () => {
        if (calibrationLine) {
            const dist = Math.sqrt(
                Math.pow(calibrationLine.p2.x - calibrationLine.p1.x, 2) +
                Math.pow(calibrationLine.p2.y - calibrationLine.p1.y, 2)
            );
            setCalibrationDetails(dist, parseFloat(tempCalibCm));
            setShowCalibInput(false);
            setMode('measuring');
            triggerToast('Calibration set! Now measure the target.', 'success');
        }
    };

    const handleAutoScan = async () => {
        if (!uploadedImage || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        setIsScanning(true);
        setMeasurementLine(null);
        setIsSavedToChart(false);
        triggerToast('AI vision initializing: Sampling pixel data...', 'info');

        // Simulate "AI Thinking" delay
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const width = canvas.width;
            const height = canvas.height;

            // Calculate calibration line x center if it exists to avoid measuring it again
            const calibX = calibrationLine ? (calibrationLine.p1.x + calibrationLine.p2.x) / 2 : -1;
            const exclusionZone = width * 0.12; // 12% width buffer around reference

            // Sampler: Check multiple vertical strips but exclude those near the reference object
            const columnsToScan = [
                Math.floor(width * 0.15),
                Math.floor(width * 0.25),
                Math.floor(width * 0.35),
                Math.floor(width * 0.45),
                Math.floor(width * 0.55),
                Math.floor(width * 0.65),
                Math.floor(width * 0.75),
                Math.floor(width * 0.85)
            ].filter(x => Math.abs(x - calibX) > exclusionZone);

            // If we have no columns left (unlikely but safe), add dynamic fallbacks far from calibX
            if (columnsToScan.length === 0) {
                if (calibX > width / 2) columnsToScan.push(Math.floor(width * 0.2));
                else columnsToScan.push(Math.floor(width * 0.8));
            }

            let globalTop = height;
            let globalBottom = 0;
            let bestX = width / 2;

            // Threshold for "content" (not background)
            // If background is transparent, alpha > 50. 
            // If background is white/light, luminance < 240.
            const isContent = (r: number, g: number, b: number, a: number) => {
                const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
                return a > 50 && luminance < 245;
            };

            columnsToScan.forEach(x => {
                let localTop = -1;
                let localBottom = -1;

                // Scan column from top down
                for (let y = 0; y < height; y++) {
                    const idx = (y * width + x) * 4;
                    if (isContent(data[idx], data[idx + 1], data[idx + 2], data[idx + 3])) {
                        localTop = y;
                        break;
                    }
                }

                // Scan column from bottom up
                for (let y = height - 1; y >= 0; y--) {
                    const idx = (y * width + x) * 4;
                    if (isContent(data[idx], data[idx + 1], data[idx + 2], data[idx + 3])) {
                        localBottom = y;
                        break;
                    }
                }

                if (localTop !== -1 && localTop < globalTop) {
                    globalTop = localTop;
                    bestX = x;
                }
                if (localBottom !== -1 && localBottom > globalBottom) {
                    globalBottom = localBottom;
                }
            });

            // If no content found, fallback or notify
            if (globalTop >= globalBottom) {
                triggerToast('AI could not distinguish object from background. Try manual measurement.', 'error');
                setIsScanning(false);
                return;
            }

            // Buffer some breathing room (2%)
            const finalP1 = { x: bestX, y: globalTop };
            const finalP2 = { x: bestX, y: globalBottom };

            // Trigger visual "success"
            triggerToast('AI Detection complete: Object boundaries identified', 'success');

            setMeasurementLine({ p1: finalP1, p2: finalP2 });
            const dist = Math.sqrt(Math.pow(finalP2.x - finalP1.x, 2) + Math.pow(finalP2.y - finalP1.y, 2));
            setMeasurementPx(dist);

        } catch (err) {
            console.error('AI Scan Error', err);
            triggerToast('Neural processing failed', 'error');
        } finally {
            setIsScanning(false);
        }
    };

    const applyPreset = (cm: number, label: string) => {
        setTempCalibCm(cm.toString());
        triggerToast(`Preset applied: ${label} (${cm}cm)`, 'info');
    };

    return (
        <div className="flex flex-col gap-6 w-full" ref={containerRef}>
            {/* Header Info */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Camera className="w-5 h-5 text-accent" />
                            Image Measurement
                        </h2>
                        <p className="text-sm text-foreground/60 mt-1">
                            Calibrate with a known object, then measure.
                        </p>
                    </div>

                    {calculatedHeight > 0 && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, x: 20 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            className="flex flex-col items-end gap-2"
                        >
                            <div className="flex flex-col items-end leading-tight">
                                <span className="text-[10px] uppercase tracking-widest text-primary/40 font-black">AI Assessment</span>
                                <div className="text-3xl font-black text-primary flex items-baseline gap-1">
                                    {unitSystem === 'metric'
                                        ? calculatedHeight.toFixed(1)
                                        : (calculatedHeight / 30.48).toFixed(1)
                                    }
                                    <span className="text-sm font-bold opacity-40">{unitSystem === 'metric' ? 'cm' : 'ft'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {!isSavedToChart ? (
                                    <button
                                        onClick={() => {
                                            addPerson({
                                                id: `ai-${Date.now()}`,
                                                name: 'AI Measured',
                                                heightCm: calculatedHeight,
                                                color: 'var(--accent)',
                                                gender: 'male'
                                            });
                                            setIsSavedToChart(true);
                                            triggerToast('Added AI measurement to comparison chart!', 'success');
                                        }}
                                        className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <Box className="w-3.5 h-3.5" /> Save to Chart
                                    </button>
                                ) : (
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 bg-surface border border-accent text-accent px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-accent/5 transition-all animate-in fade-in zoom-in-95"
                                    >
                                        <BarChart2 className="w-3.5 h-3.5" /> View in Chart
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Relocated Instruction Banner */}
                <AnimatePresence>
                    {uploadedImage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3 mb-2">
                                {mode === 'calibrating' ? (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                            <Ruler className="w-4 h-4 text-accent" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black uppercase tracking-widest text-accent/60">Step 1: Calibration</span>
                                            <span className="text-sm font-bold">Draw a line over a known object (e.g., Credit Card or Door)</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                            <ChevronRight className="w-4 h-4 text-accent" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black uppercase tracking-widest text-accent/60">Step 2: Measurement</span>
                                            <span className="text-sm font-bold">Draw a line over the person or object you want to measure</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Container */}
            <div className={cn(
                "relative rounded-2xl border border-border bg-card/30 min-h-[400px] overflow-hidden flex items-center justify-center transition-all duration-300",
                !uploadedImage && "border-dashed p-12"
            )}>
                {!uploadedImage ? (
                    <div
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-16 h-16 rounded-full bg-border/20 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <Upload className="w-8 h-8 text-foreground/40 group-hover:text-accent transition-colors" />
                        </div>
                        <p className="mt-4 font-medium text-foreground/80">Drop images or click to browse</p>
                        <p className="text-sm text-foreground/40">PNG, JPG up to 10MB</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </div>
                ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-black/40 overflow-hidden">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            className={cn(
                                "cursor-crosshair shadow-2xl transition-opacity duration-300",
                                isDrawing ? "opacity-100" : "opacity-90 hover:opacity-100"
                            )}
                        />

                        {/* Visual Scanning Animation */}
                        <AnimatePresence>
                            {isScanning && (
                                <motion.div
                                    initial={{ top: '-10%' }}
                                    animate={{ top: '110%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                    className="absolute left-0 right-0 h-1 z-20 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
                                        boxShadow: '0 0 20px 2px var(--accent)'
                                    }}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Calibration Input Modal */}
                <AnimatePresence>
                    {showCalibInput && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px]"
                        >
                            <div className="bg-surface border border-border p-8 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col gap-5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
                                <h3 className="font-bold flex items-center gap-2">
                                    <Check className="w-4 h-4 text-accent" />
                                    Calibration Size
                                </h3>
                                <p className="text-xs text-foreground/60">
                                    Enter the real-world size of the object you just marked.
                                </p>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={tempCalibCm}
                                        onChange={(e) => setTempCalibCm(e.target.value)}
                                        className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-accent font-black outline-none focus:border-accent transition-all pr-12 focus:ring-1 focus:ring-accent/20"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/40">CM</span>
                                </div>
                                <button
                                    onClick={finalizeCalibration}
                                    className="w-full bg-accent text-white font-black py-4 rounded-xl hover:bg-accent/90 transition-all uppercase tracking-widest text-xs shadow-lg shadow-accent/20 active:scale-95"
                                >
                                    Confirm Scale
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            {uploadedImage && (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setMode('calibrating');
                                setIsSavedToChart(false);
                            }}
                            className={cn(
                                "flex-1 px-4 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border transition-all",
                                mode === 'calibrating'
                                    ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                                    : "bg-surface border-border text-muted hover:text-foreground"
                            )}
                        >
                            <Ruler className="w-4 h-4" />
                            Recalibrate
                        </button>
                        <button
                            onClick={handleAutoScan}
                            disabled={isScanning || !calibrationLine}
                            className={cn(
                                "flex-1 px-4 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border transition-all",
                                !calibrationLine ? "opacity-50 cursor-not-allowed" : "bg-[#14B8A6] text-white border-[#14B8A6] shadow-lg shadow-teal-500/20 hover:brightness-110"
                            )}
                        >
                            <Zap className={cn("w-4 h-4", isScanning && "animate-spin")} />
                            {isScanning ? 'AI Scanning...' : 'AI Auto-Scan'}
                        </button>
                        <button
                            onClick={() => {
                                setUploadedImage(null);
                                setMode('idle');
                                setCalibrationLine(null);
                                setMeasurementLine(null);
                                setIsSavedToChart(false);
                            }}
                            className="px-5 py-4 rounded-xl font-bold bg-surface text-muted hover:bg-red-500/10 hover:text-red-400 transition-all border border-border"
                        >
                            <RefreshCcw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Calibration Presets when calibrating */}
                    {mode === 'calibrating' && (
                        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <span className="text-[10px] font-black uppercase text-foreground/30 w-full mb-1">Calibration Presets</span>
                            <button onClick={() => applyPreset(8.56, 'Credit Card')} className="px-3 py-2 rounded-lg bg-card/50 border border-border text-[10px] font-bold hover:border-primary transition-colors flex items-center gap-2">
                                <Target className="w-3 h-3" /> ID Card
                            </button>
                            <button onClick={() => applyPreset(29.7, 'A4 Paper')} className="px-3 py-2 rounded-lg bg-card/50 border border-border text-[10px] font-bold hover:border-primary transition-colors flex items-center gap-2">
                                <Target className="w-3 h-3" /> A4 Paper
                            </button>
                            <button onClick={() => applyPreset(203, 'Door')} className="px-3 py-2 rounded-lg bg-card/50 border border-border text-[10px] font-bold hover:border-primary transition-colors flex items-center gap-2">
                                <Target className="w-3 h-3" /> Standard Door
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={cn(
                            "fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 z-50 pointer-events-none text-white font-bold text-sm tracking-tight border",
                            toastMessage.type === 'error' ? 'bg-red-500 border-red-400' :
                                toastMessage.type === 'success' ? 'bg-green-500 border-green-400' :
                                    'bg-surface border-border text-foreground'
                        )}
                    >
                        <span>{toastMessage.message}</span>
                        {toastMessage.type === 'success' && <Check size={16} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
