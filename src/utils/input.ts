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
