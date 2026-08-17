import * as React from "react";
export interface ComboboxItem {
    value: any;
    label: string;
}
interface GenericComboboxProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
    items: ComboboxItem[];
    value: string | null;
    onChange: (value: string, item: ComboboxItem | null) => void;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    searchPlaceholder?: string;
    onSearchChange?: (search: string) => void;
    filterLocally?: boolean;
    loading?: boolean;
    loadingMore?: boolean;
    hasMore?: boolean;
    onEndReached?: () => void;
    onOpenChange?: (open: boolean) => void;
    displayLabel?: string;
    disabled?: boolean;
}
/**
 * A searchable select component (Combobox).
 *
 * @example
 * ```tsx
 * <Combobox
 *   items={[{ value: '1', label: 'Option 1' }]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 */
export declare function Combobox({ items, value, onChange, placeholder, emptyMessage, className, searchPlaceholder, onSearchChange, filterLocally, loading, loadingMore, hasMore, onEndReached, onOpenChange, displayLabel, disabled, }: GenericComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
