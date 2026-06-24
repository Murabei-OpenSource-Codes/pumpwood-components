"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import * as React from "react";
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

export interface DateRangeFilterProps {

    startDate?: Date;
    endDate?: Date;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    startLabel?: string;
    endLabel?: string;
    className?: string;
}

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

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="flex flex-row gap-2 items-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                fieldTriggerClassName,
                                "justify-start text-left w-[240px]",
                                !startDate && fieldTriggerPlaceholderClassName,
                            )}
                        >
                            <CalendarIcon
                                className={cn(
                                    "mr-2",
                                    fieldTriggerIconClassName,
                                )}
                            />
                            {startDate
                                ? format(startDate, "PPP")
                                : startLabel}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={onStartDateChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                fieldTriggerClassName,
                                "justify-start text-left w-[240px]",
                                !endDate && fieldTriggerPlaceholderClassName,
                            )}
                        >
                            <CalendarIcon
                                className={cn(
                                    "mr-2",
                                    fieldTriggerIconClassName,
                                )}
                            />
                            {endDate
                                ? format(endDate, "PPP")
                                : endLabel}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={onEndDateChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
