/**
 * Parameters passed to the FK fetcher function.
 */
export type FKFetcherParams = {
    search: string;
    modelClass: string;
    labelName: string;
    additionalFilters?: Record<string, any>;
    fields?: string[];
    limit?: number;
    offset?: number;
};
/**
 * Props for the FKSelect component.
 */
export interface IFKSelectProps {
    /** Optional id used as data-testid on the trigger. */
    id?: string;
    /** Function to fetch data from the API. */
    fetcher: (params: FKFetcherParams) => Promise<any[]>;
    /** Optional function to resolve a value not present in the list. */
    resolveValue?: (params: {
        modelClass: string;
        value: string | number;
    }) => Promise<any>;
    /** The model class name to identify the resource. */
    modelClass: string;
    /** The field name to use as the display label. */
    labelName: string;
    /** The field name to use as the value (ID). Defaults to 'pk'. */
    valueField?: string;
    /** Placeholder text for the search input. */
    placeholder?: string;
    /** Message to show when no items are found. */
    emptyMessage?: string;
    /** The currently selected value. */
    value: string | number | null;
    /** Callback when an item is selected. */
    onChange: (value: string | number, item?: any) => void;
    /** Additional filters to apply to the API request. */
    additionalFilters?: Record<string, any>;
    /** Extra fields to include in search. */
    fields?: string[];
    /** Optional class names for the wrapper (e.g. width overrides). */
    className?: string;
    /** Debounce time in ms. Defaults to 300. */
    debounceWait?: number;
}
/**
 * A foreign key select component (async combobox).
 *
 * @example
 * ```tsx
 * <FKSelect
 *   fetcher={fetchData}
 *   modelClass="User"
 *   labelName="username"
 *   value={userId}
 *   onChange={setUserId}
 * />
 * ```
 */
export declare const FKSelect: ({ id, fetcher, resolveValue, modelClass, labelName, valueField, placeholder, emptyMessage, value, onChange, additionalFilters, fields, className, debounceWait, }: IFKSelectProps) => import("react/jsx-runtime").JSX.Element;
