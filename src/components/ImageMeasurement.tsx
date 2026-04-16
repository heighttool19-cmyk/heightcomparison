'use client';

import React from 'react';
import { useImageMeasurement } from './ImageMeasurementCom/useImageMeasurement';
import { Header } from './ImageMeasurementCom/components/Header';
import { Canvas } from './ImageMeasurementCom/components/Canvas';
import { Controls } from './ImageMeasurementCom/components/Controls';
import { CalibrationModal } from './ImageMeasurementCom/components/CalibrationModal';
import { CropModal } from './ImageMeasurementCom/components/CropModal';
import { SaveToChartModal } from './ImageMeasurementCom/components/SaveToChartModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ChevronRight, XCircle, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ImageMeasurement: React.FC = () => {
    const {
        canvasRef,
        wrapperRef,
        fileInputRef,
        mode,
        calculatedHeight,
        unitSystem,
        uploadedImage,
        displaySize,
        toastMsg,
        calibCm,
        showCalibModal,
        isScanning,
        isSavedToChart,
        pendingUrl,
        showCropModal,
        magnifierPoint,
        isDrawing,
        calibLine,
        firstPoint,
        measLine,
        onCanvasMouseDown,
        onCanvasTouchStart,
        recalibrate,
        handleAutoScan,
        handleRemoveImage,
        handleNewImage,
        handleSaveToChart,
        confirmSaveToChart,
        handleFileUpload,
        resetCrop,
        applyCrop,
        closeCropModal,
        setCalibCm,
        applyPreset,
        confirmCalib,
        cancelCalib,
        finishDrawing,
        cancelDrawing,
        showSaveModal,
        setShowSaveModal,
        isSavingCrop,
        savedSubjectUrl
    } = useImageMeasurement();

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4">
                <Header
                    calculatedHeight={calculatedHeight}
                    unitSystem={unitSystem}
                    isSavedToChart={isSavedToChart}
                    handleSaveToChart={handleSaveToChart}
                    mode={mode}
                    hasFirstPoint={!!firstPoint}
                />

                {/* Step banner */}
                <AnimatePresence mode="wait">
                    {uploadedImage && mode !== 'idle' && (
                        <motion.div
                            key={mode + String(!!firstPoint) + String(!!measLine)}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="p-3 sm:px-4 sm:py-3 bg-surface/90 backdrop-blur-md border border-accent/20 rounded-2xl shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 overflow-hidden"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    {mode === 'calibrating' ? (
                                        <Ruler className="w-5 h-5 text-accent" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-accent" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-accent/80 block mb-0.5">
                                        {mode === 'calibrating' ? 'Step 1: Calibration' : 'Step 2: Measure Person'}
                                    </span>
                                    <span className="text-xs font-bold text-foreground s">
                                        {mode === 'calibrating'
                                            ? firstPoint ? 'Tap the other end to finish' : 'Draw calibration line of reference object by tapping on screen'
                                            : firstPoint ? 'Tap the other end to finish' : ' Click "Auto Scan" below or manually draw a line from head to toe'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:shrink-0">
                                {firstPoint && (
                                    <button
                                        onClick={cancelDrawing}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
                                    >
                                        <XCircle size={14} />
                                        <span>Cancel</span>
                                    </button>
                                )}

                                {mode === 'measuring' && measLine && !firstPoint && (
                                    <button
                                        onClick={finishDrawing}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-secondary active:scale-95 transition-all text-xs font-black uppercase tracking-widest"
                                    >
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                        <span>Done</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative  flex justify-center  align-center items-center">
                <Canvas
                    canvasRef={canvasRef}
                    wrapperRef={wrapperRef}
                    onCanvasMouseDown={onCanvasMouseDown}
                    onCanvasTouchStart={onCanvasTouchStart}
                    uploadedImage={uploadedImage}
                    displaySize={displaySize}
                    mode={mode}
                    isScanning={isScanning}
                    fileInputRef={fileInputRef}
                    magnifierPoint={magnifierPoint}
                    isDrawing={isDrawing}
                />

                <CalibrationModal
                    showCalibModal={showCalibModal}
                    calibCm={calibCm}
                    setCalibCm={setCalibCm}
                    applyPreset={applyPreset}
                    confirmCalib={confirmCalib}
                    cancelCalib={cancelCalib}
                />
            </div>

            <Controls
                mode={mode}
                recalibrate={recalibrate}
                handleAutoScan={handleAutoScan}
                isScanning={isScanning}
                uploadedImage={uploadedImage}
                handleRemoveImage={handleRemoveImage}
                handleNewImage={handleNewImage}
                showCalibModal={showCalibModal}
                calibLine={calibLine}
            />

            <SaveToChartModal
                show={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onConfirm={confirmSaveToChart}
                photoUrl={savedSubjectUrl}
                heightCm={calculatedHeight}
                unitSystem={unitSystem}
            />

            <CropModal
                showCropModal={showCropModal}
                pendingUrl={pendingUrl}
                resetCrop={resetCrop}
                closeCropModal={closeCropModal}
                applyCrop={applyCrop}
                title={isSavingCrop ? "Crop Subject for Chart" : "Finalize Upload"}
            />

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

            {/* Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div initial={{ opacity: 0, y: 48, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.9 }}
                        className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 z-[300] pointer-events-none font-bold text-sm border",
                            toastMsg.type === 'error' ? 'bg-red-500   border-red-400   text-white' :
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
