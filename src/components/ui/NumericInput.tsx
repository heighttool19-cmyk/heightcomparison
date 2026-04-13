import React, { useState } from 'react';
import { HTMLMotionProps, motion, AnimatePresence } from 'framer-motion';
import { handleNumberKeyDown, handleInputChange } from '../../utils/input';

interface NumericInputProps extends Omit<HTMLMotionProps<'input'>, 'onChange'> {
    // Custom prop to seamlessly use your existing setter pattern
    onValueChange: (value: number | '') => void;
}

export const NumericInput: React.FC<NumericInputProps> = ({ 
    onValueChange, 
    className, 
    ...rest 
}) => {
    const [error, setError] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);

    const handleInvalid = (key: string) => {
        setError(`'${key === ' ' ? 'Space' : key}' is not allowed in number fields`);
        setIsShaking(true);
        setTimeout(() => {
            setError(null);
            setIsShaking(false);
        }, 2000);
    };

    return (
        <div className="relative w-full flex items-center">
            <motion.input
                {...rest}
                type="number"
                inputMode="decimal" // 1. Forces strict iOS number pad
                onKeyDown={(e) => handleNumberKeyDown(e, handleInvalid)} // 2. Physically blocks spaces/symbols
                onChange={(e) => handleInputChange(e, onValueChange)} // 3. Safely updates state
                animate={isShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`focus:outline-none ${className || ''} ${error ? 'ring-2 ring-red-500/20 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]' : ''}`}
            />
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%' }}
                        className="absolute bottom-full left-1/2 mb-2 px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-2xl whitespace-nowrap z-[100] pointer-events-none"
                    >
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-500" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
