import React from 'react';
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { handleInputChange } from '../utils/input';

interface AlignmentControlProps {
    offsetY: number;
    onOffsetChange: (newValue: number) => void;
}

export default function AlignmentControl({ offsetY = 0, onOffsetChange }: AlignmentControlProps) {
    
    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        onOffsetChange(offsetY + 1);
    };
    
    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        onOffsetChange(offsetY - 1);
    };

    return (
        <div className="space-y-3 mt-6">
            {/* Label & Tooltip */}
            <div className="flex items-center gap-2 relative group w-fit">
                <label className="text-sm font-bold text-foreground">Adjust Alignment</label>
                <HelpCircle className="w-4 h-4 text-muted cursor-help" />
                
                {/* Custom Tooltip (appears on hover) */}
                <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl z-50 pointer-events-none">
                    Move your uploaded image up or down to align the feet precisely with the ground level on the chart.
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-5 -mt-1 border-4 border-transparent border-t-slate-800" />
                </div>
            </div>

            {/* Up/Down Controls with Input */}
            <div className="flex items-center w-full h-11 border border-border rounded-xl overflow-hidden bg-surface shadow-sm">
                <button 
                    onClick={handleIncrement}
                    className="h-full px-5 bg-accent text-white hover:opacity-90 transition-opacity flex items-center justify-center active:bg-accent/80"
                    aria-label="Move image up"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>
                
                <div className="flex-1 flex items-center justify-center border-x border-border/50 bg-surface h-full">
                    <input
                        type="number"
                        value={offsetY}
                        onChange={(e) => handleInputChange(e, onOffsetChange as (val: string | number) => void)}
                        className="w-full h-full bg-transparent text-center font-bold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-label="Vertical Offset in Pixels"
                    />
                </div>
                
                <button 
                    onClick={handleDecrement}
                    className="h-full px-5 bg-accent text-white hover:opacity-90 transition-opacity flex items-center justify-center active:bg-accent/80"
                    aria-label="Move image down"
                >
                    <ChevronDown className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
