/**
 * Optimizes a canvas by resizing it if it exceeds max dimensions and
 * returning a compressed data URL (WebP or JPEG).
 */
export const getOptimizedDataUrl = (canvas: HTMLCanvasElement, maxDim = 1024): string => {
    let targetCanvas = canvas;
    const { width, height } = canvas;

    // 1. Calculate new dimensions if they exceed maxDim
    if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        const nw = Math.round(width * scale);
        const nh = Math.round(height * scale);

        const resizeCanvas = document.createElement('canvas');
        resizeCanvas.width = nw;
        resizeCanvas.height = nh;
        const ctx = resizeCanvas.getContext('2d');
        if (ctx) {
            // Use high-quality image smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(canvas, 0, 0, nw, nh);
            targetCanvas = resizeCanvas;
        }
    }

    // 2. Export as WebP for best quality/size ratio (falling back to JPEG)
    // Most modern browsers support WebP. Quality 0.8 is a great balance.
    try {
        return targetCanvas.toDataURL('image/webp', 0.8);
    } catch (_e) {
        // Fallback if webp is not supported for any reason (very rare now)
        console.error("WebP conversion failed:", _e);
        return targetCanvas.toDataURL('image/jpeg', 0.82);
    }
};
