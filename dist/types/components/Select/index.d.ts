type Option = {
    value: string;
    label: string;
};
/**
 * Props for the Select component.
 */
export interface ISelectProps {
    /** Optional id used as data-testid on the trigger. */
    id?: string;
    /** Placeholder text when no value is selected. */
    placeholder: string;
    /** Static options with value and label. */
    options: Option[];
    /** Optional class names for the select wrapper (width, layout). */
    className?: string;
    /** Controlled selected value. */
    value?: string;
    /** Callback when the selected value changes. */
    onValueChange?: (value: string) => void;
    /** Marks the field as required in HTML forms. */
    required?: boolean;
    /** Name attribute for HTML form submission. */
    name?: string;
}
/**
 * A reusable dropdown component built with shadcn/ui.
 *
 * @example
 * ```tsx
 * <Select
 *   placeholder="Choose an option"
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B" },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 * ```
 */
export declare const Select: ({ id, placeholder, options, className, value, onValueChange, required, name, }: ISelectProps) => import("react/jsx-runtime").JSX.Element;
export {};
