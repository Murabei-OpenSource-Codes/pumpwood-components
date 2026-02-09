"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
        <div className={cn("pw:flex pw:flex-col pw:gap-2", className)}>
            <div className="pw:flex pw:flex-row pw:gap-2 pw:items-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "pw:justify-start pw:text-left pw:font-normal pw:w-[240px]",
                                !startDate && "pw:text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="pw:mr-2 pw:size-4" />
                            {startDate
                                ? format(startDate, "PPP")
                                : startLabel}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="pw:w-auto pw:p-0" align="start">
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
                        <Button
                            variant="outline"
                            className={cn(
                                "pw:justify-start pw:text-left pw:font-normal pw:w-[240px]",
                                !endDate && "pw:text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="pw:mr-2 pw:size-4" />
                            {endDate
                                ? format(endDate, "PPP")
                                : endLabel}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="pw:w-auto pw:p-0" align="start">
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
