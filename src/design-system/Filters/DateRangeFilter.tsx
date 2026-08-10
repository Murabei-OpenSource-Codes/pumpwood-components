"use client";

import { RangePicker } from "@components/RangePicker";
import { cn } from "@/lib/utils";

export interface DateRangeFilterProps {
    startDate?: Date;
    endDate?: Date;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    startLabel?: string;
    endLabel?: string;
    className?: string;
}

const dateToIso = (date: Date | undefined): string => {
    if (!date) {
        return "";
    }

    return date.toISOString();
};

const isoToDate = (value: string): Date | undefined => {
    if (!value.trim()) {
        return undefined;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return undefined;
    }

    return parsedDate;
};

/**
 * A date range picker filter component.
 *
 * @example
 * ```tsx
 * <DateRangeFilter
 *   startDate={startDate}
 *   endDate={endDate}
 *   onStartDateChange={setStartDate}
 *   onEndDateChange={setEndDate}
 * />
 * ```
 */
export const DateRangeFilter = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    startLabel = "Start date",
    endLabel = "End date",
    className,
}: DateRangeFilterProps) => {
    const placeholder = "{start} - {end}"
        .replace("{start}", startLabel)
        .replace("{end}", endLabel);

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <RangePicker
                className="w-[280px]"
                placeholder={placeholder}
                fromValue={dateToIso(startDate)}
                toValue={dateToIso(endDate)}
                onFromChange={(value) =>
                    onStartDateChange(isoToDate(value))
                }
                onToChange={(value) => onEndDateChange(isoToDate(value))}
            />
        </div>
    );
};
