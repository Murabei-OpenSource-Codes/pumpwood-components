"use client";

import { endOfDay, format, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
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

const buildDisplayValue = (
    fromValue: string | undefined,
    toValue: string | undefined,
    dateFormat: string,
    placeholder: string,
): string => {
    const formattedFrom = formatDateValue(fromValue, dateFormat);
    const formattedTo = formatDateValue(toValue, dateFormat);

    if (formattedFrom && formattedTo) {
        return "{from} - {to}".replace("{from}", formattedFrom).replace(
            "{to}",
            formattedTo,
        );
    }

    if (formattedFrom) {
        return "{from} - …".replace("{from}", formattedFrom);
    }

    return placeholder;
};

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
export const RangePicker = ({
    id,
    placeholder,
    fromValue,
    toValue,
    onFromChange,
    onToChange,
    className,
    dateFormat = "dd/MM/yyyy",
}: IRangePickerProps) => {
    const selectedRange: DateRange = {
        from: parseDateValue(fromValue),
        to: parseDateValue(toValue),
    };

    const hasSelection = Boolean(fromValue?.trim() || toValue?.trim());
    const displayValue = buildDisplayValue(
        fromValue,
        toValue,
        dateFormat,
        placeholder,
    );

    const handleSelect = (range: DateRange | undefined) => {
        if (!range) {
            onFromChange?.("");
            onToChange?.("");
            return;
        }

        if (range.from) {
            onFromChange?.(startOfDay(range.from).toISOString());
        } else {
            onFromChange?.("");
        }

        if (range.to) {
            onToChange?.(endOfDay(range.to).toISOString());
        } else {
            onToChange?.("");
        }
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
                            !hasSelection &&
                                fieldTriggerPlaceholderClassName,
                        )}
                    >
                        <CalendarIcon
                            className={cn(
                                "mr-2",
                                fieldTriggerIconClassName,
                            )}
                        />
                        {displayValue}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-0" align="start">
                    <Calendar
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleSelect}
                        initialFocus
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
