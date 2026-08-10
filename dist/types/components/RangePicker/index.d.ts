/**
 * Props for the RangePicker component.
 */
export interface IRangePickerProps {
    /** Optional id used as data-testid on the trigger button. */
    id?: string;
    /** Placeholder text when no range is selected. */
    placeholder: string;
    /** Controlled ISO date string for range start (empty = no selection). */
    fromValue?: string;
    /** Controlled ISO date string for range end (empty = no selection). */
    toValue?: string;
    /** Callback when the range start changes (ISO string or empty). */
    onFromChange?: (value: string) => void;
    /** Callback when the range end changes (ISO string or empty). */
    onToChange?: (value: string) => void;
    /** Optional class names for the wrapper (width, layout). */
    className?: string;
    /** Display format for selected dates. */
    dateFormat?: string;
}
/**
 * A date range picker with a single calendar for selecting start and end dates.
 *
 * @example
 * ```tsx
 * <RangePicker
 *   placeholder="Selecione o período"
 *   fromValue={filters.lastUpdateAtFrom}
 *   toValue={filters.lastUpdateAtTo}
 *   onFromChange={(value) => onFilterChange("lastUpdateAtFrom", value)}
 *   onToChange={(value) => onFilterChange("lastUpdateAtTo", value)}
 * />
 * ```
 */
export declare const RangePicker: ({ id, placeholder, fromValue, toValue, onFromChange, onToChange, className, dateFormat, }: IRangePickerProps) => import("react/jsx-runtime").JSX.Element;
