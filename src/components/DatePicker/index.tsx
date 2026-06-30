"use client";

import { endOfDay, format, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    fieldTriggerClassName,
    fieldTriggerIconClassName,
    fieldTriggerPlaceholderClassName,
} from "@/lib/field-trigger";
import { cn } from "@/lib/utils";

/**
 * Props for the DatePicker component.
 */
export interface IDatePickerProps {
    /** Optional id used as data-testid on the trigger button. */
    id?: string;
    /** Placeholder text when no date is selected. */
    placeholder: string;
    /** Controlled ISO date string (empty = no selection). */
    value?: string;
    /** Callback when the selected date changes (ISO string or empty). */
    onValueChange?: (value: string) => void;
    /** Optional class names for the wrapper (width, layout). */
    className?: string;
    /** Day boundary when serializing to ISO. */
    boundary?: "start" | "end";
    /** Display format for the selected date. */
    dateFormat?: string;
}

const parseDateValue = (value?: string): Date | undefined => {
    if (!value) {
        return undefined;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return undefined;
    }

    return parsedDate;
};

const formatDateValue = (
    value: string | undefined,
    dateFormat: string,
): string | null => {
    const parsedDate = parseDateValue(value);

    if (!parsedDate) {
        return null;
    }

    return format(parsedDate, dateFormat);
};

/**
 * A reusable date picker built with shadcn/ui.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   placeholder="Data inicial"
 *   boundary="start"
 *   value={filters.created_at__gte}
 *   onValueChange={(value) =>
 *     onFiltersChange({ target: "created_at__gte", value })
 *   }
 * />
 * ```
 */
export const DatePicker = ({
    id,
    placeholder,
    value,
    onValueChange,
    className,
    boundary = "start",
    dateFormat = "dd/MM/yyyy",
}: IDatePickerProps) => {
    const selectedDate = parseDateValue(value);
    const displayValue = formatDateValue(value, dateFormat);

    const handleSelect = (date: Date | undefined) => {
        if (!date) {
            onValueChange?.("");
            return;
        }

        const normalizedDate = boundary === "end"
            ? endOfDay(date)
            : startOfDay(date);

        onValueChange?.(normalizedDate.toISOString());
    };

    return (
        <div className={cn("flex w-full min-w-0", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        data-testid={id}
                        className={cn(
                            fieldTriggerClassName,
                            "justify-start text-left",
                            !displayValue && fieldTriggerPlaceholderClassName,
                        )}
                    >
                        <CalendarIcon
                            className={cn(
                                "mr-2",
                                fieldTriggerIconClassName,
                            )}
                        />
                        {displayValue ?? placeholder}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
