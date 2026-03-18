/**
 * Handles input changes for both number and text inputs.
 * For number inputs, it allows empty strings to prevent unwanted zero values.
 */
export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: any) => void
) => {
    const { value, type } = e.target;

    if (type === 'number') {
        // If empty, set as "", otherwise convert to Number
        setter(value === "" ? "" : Number(value));
    } else {
        setter(value);
    }
};
