"use client";

import { useEffect, useState } from "react";
import {
    Select as SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
export const Select = ({
    id,
    placeholder,
    options,
    className,
    value,
    onValueChange,
    required,
    name,
}: ISelectProps) => {
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
                                    "cursor-pointer transition-colors",
                                    selectedValue === option.value
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-muted",
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
