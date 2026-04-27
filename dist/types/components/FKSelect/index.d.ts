/**
 * Props for the FKSelect component
 */
export interface IFKSelectProps {
    /** FUNCTION to fetch data. Should return a promise resolving to an array of items */
    fetcher: (params: {
        search: string;
        modelClass: string;
        limit?: number;
        offset?: number;
    }) => Promise<any[]>;
    /** The model class name to identify the resource */
    modelClass: string;
    /** The field name to use as the display label from the fetched items */
    labelName: string;
    /** The field name to use as the value (ID) from the fetched items. Defaults to 'pk' or 'id' */
    valueField?: string;
    /** Placeholder text for the search input */
    placeholder?: string;
    /** Message to show when no items are found */
    emptyMessage?: string;
    /** The currently selected value */
    value: string | number | null;
    /** Callback function called when an item is selected */
    onChange: (value: string | number, item?: any) => void;
    /** Additional className */
    className?: string;
    /** Debounce time in ms. Defaults to 300 */
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
export declare const FKSelect: ({ fetcher, modelClass, labelName, valueField, placeholder, emptyMessage, value, onChange, className, debounceWait, }: IFKSelectProps) => import("react/jsx-runtime").JSX.Element;
