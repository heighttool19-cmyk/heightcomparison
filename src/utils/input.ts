import React from 'react';

/**
 * Handles input changes for both number and text inputs.
 * For number inputs, it allows empty strings to prevent unwanted zero values.
 */
export const handleInputChange = <T,>(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: T) => void
) => {
    const { value, type } = e.target;

    if (type === 'number') {
        const numVal = value === "" ? "" : Number(value);
        setter(numVal as unknown as T);
    } else {
        setter(value as unknown as T);
    }
};

// NEW: Universal blocker for invalid characters in number fields
export const handleNumberKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onInvalid?: (key: string) => void
) => {
    // Physically block spacebar, minus, plus, and 'e' (exponential) 
    // Add or remove characters here depending on what your app allows
    if ([' ', '-', '+', 'e', 'E'].includes(e.key)) {
        e.preventDefault();
        onInvalid?.(e.key);
    }
};
