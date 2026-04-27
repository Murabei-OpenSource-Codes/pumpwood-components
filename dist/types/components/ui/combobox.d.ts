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
export declare function Combobox({ items, value, onChange, placeholder, emptyMessage, className, searchPlaceholder, }: GenericComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
