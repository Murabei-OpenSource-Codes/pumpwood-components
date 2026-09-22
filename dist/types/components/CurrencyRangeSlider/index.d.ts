export interface ICurrencyRangeSliderProps {
    id?: string;
    "data-testid"?: string;
    label?: string;
    domainMin?: number;
    domainMax?: number;
    step?: number;
    minValue: number;
    maxValue: number;
    onMinChange: (value: number) => void;
    onMaxChange: (value: number) => void;
    formatValue?: (value: number) => string;
    className?: string;
    /** When true, shows editable numeric inputs for min and max below the slider. */
    showNumericInputs?: boolean;
    minInputLabel?: string;
    maxInputLabel?: string;
    minReadoutTestId?: string;
    maxReadoutTestId?: string;
    minInputTestId?: string;
    maxInputTestId?: string;
}
/**
 * Range slider for currency values with formatted min/max readouts.
 */
export declare const CurrencyRangeSlider: ({ id, "data-testid": dataTestId, label, domainMin, domainMax, step, minValue, maxValue, onMinChange, onMaxChange, formatValue, className, showNumericInputs, minInputLabel, maxInputLabel, minReadoutTestId, maxReadoutTestId, minInputTestId, maxInputTestId, }: ICurrencyRangeSliderProps) => import("react/jsx-runtime").JSX.Element;
