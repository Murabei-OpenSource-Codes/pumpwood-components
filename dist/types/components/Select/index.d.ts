import { type IFKSelectProps } from "@/components/FKSelect";
type Option = {
    value: string;
    label: string;
};
type SharedSelectProps = {
    /** Optional id used as data-testid on the trigger. */
    id?: string;
    /** Optional class names for the select wrapper (width, layout). */
    className?: string;
};
/**
 * Props for the static (default) Select variant.
 */
export interface IStaticSelectProps extends SharedSelectProps {
    variant?: "static";
    /** Placeholder text when no value is selected. */
    placeholder: string;
    /** Static options with value and label. */
    options: Option[];
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
 * Props for the FK variant of Select.
 */
export interface ISelectFKProps extends IFKSelectProps {
    variant: "fk";
}
/**
 * Props for the Select component (static or FK variant).
 */
export type ISelectProps = IStaticSelectProps | ISelectFKProps;
/**
 * A reusable dropdown component built with shadcn/ui.
 *
 * Supports a static variant (Radix Select) and an FK variant (async
 * Combobox) for foreign-key fields.
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
 *
 * <Select
 *   variant="fk"
 *   fetcher={fetchUsers}
 *   modelClass="user"
 *   labelName="username"
 *   placeholder="Select user"
 *   value={userId}
 *   onChange={(id, item) => setUserId(id)}
 * />
 * ```
 */
export declare const Select: (props: ISelectProps) => import("react/jsx-runtime").JSX.Element;
export {};
