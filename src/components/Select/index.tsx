"use client";

import { useEffect, useState } from "react";
import { FKSelect, type IFKSelectProps } from "@/components/FKSelect";
import {
    Select as SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fieldOptionClassName } from "@/lib/field-trigger";
import { cn } from "@/lib/utils";

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

const StaticSelect = ({
    id,
    placeholder,
    options,
    className,
    value,
    onValueChange,
    required,
    name,
}: IStaticSelectProps) => {
    const [selectedValue, setSelectedValue] = useState<string>(value || "");

    useEffect(() => {
        setSelectedValue(value || "");
    }, [value]);

    const handleValueChange = (newValue: string) => {
        setSelectedValue(newValue);
        onValueChange?.(newValue);
    };

    const currentValue = value ?? selectedValue;

    return (
        <>
            {name ? (
                <input
                    type="hidden"
                    name={name}
                    value={currentValue}
                    required={required}
                />
            ) : null}
            <div className={cn("inline-flex w-fit shrink-0", className)}>
                <SelectRoot
                    value={currentValue || undefined}
                    onValueChange={handleValueChange}
                >
                    <SelectTrigger data-testid={id} className="w-full">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                data-testid={option.value}
                                value={option.value}
                                className={cn(
                                    "cursor-pointer",
                                    fieldOptionClassName,
                                    selectedValue === option.value
                                        ? "bg-accent text-accent-foreground"
                                        : "",
                                )}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
            </div>
        </>
    );
};

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
export const Select = (props: ISelectProps) => {
    if (props.variant === "fk") {
        const { variant: _variant, ...fkProps } = props;
        return <FKSelect {...fkProps} />;
    }

    return <StaticSelect {...props} />;
};
