"use client";

import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import * as React from "react";
import {
    type DayButton,
    DayPicker,
    getDefaultClassNames,
} from "react-day-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
    formatters,
    components,
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                "pw:bg-background group/calendar pw:p-3 [--cell-size:2.8rem]",

                String.raw`rtl:**:[.rdp-button\_next>svg]:pw:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:pw:rotate-180`,
                className,
            )}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date) =>
                    date.toLocaleString("default", { month: "short" }),
                ...formatters,
            }}
            classNames={{
                root: cn("pw:w-fit pw:min-w-[calc(var(--cell-size)*7+24px)]", defaultClassNames.root),
                months: cn(
                    "pw:relative pw:flex pw:flex-col pw:gap-4 md:pw:flex-row",
                    defaultClassNames.months,
                ),
                month: cn("pw:flex pw:w-full pw:flex-col pw:gap-4", defaultClassNames.month),
                nav: cn(
                    "pw:absolute pw:inset-x-0 pw:top-1.5 pw:flex pw:w-full pw:items-center pw:justify-between pw:gap-1 pw:z-10 pw:px-2",
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "pw:h-8 pw:w-8 select-none pw:p-0 aria-disabled:pw:opacity-50",
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "pw:h-8 pw:w-8 select-none pw:p-0 aria-disabled:pw:opacity-50",
                    defaultClassNames.button_next,
                ),
                month_caption: cn(
                    "pw:flex pw:h-9 pw:w-full pw:items-center pw:justify-center",
                    defaultClassNames.month_caption,
                ),
                dropdowns: cn(
                    "pw:flex pw:h-9 pw:w-full pw:items-center pw:justify-center pw:gap-1.5 pw:text-sm pw:font-medium",
                    defaultClassNames.dropdowns,
                ),
                dropdown_root: cn(
                    "has-focus:pw:border-ring pw:border-input  pw:bg-white pw:shadow-xs has-focus:pw:ring-ring/50 has-focus:pw:ring-[3px] pw:relative pw:rounded-md pw:border",
                    defaultClassNames.dropdown_root,
                ),
                dropdown: cn(
                    "pw:bg-popover pw:absolute pw:inset-0 pw:opacity-0",
                    defaultClassNames.dropdown,
                ),
                caption_label: cn(
                    "select-none pw:font-semibold pw:text-sm",
                    captionLayout === "label"
                        ? ""
                        : "[&>svg]:pw:text-muted-foreground pw:flex pw:h-8 pw:items-center pw:gap-1 pw:rounded-md pw:pl-2 pw:pr-1 pw:text-sm [&>svg]:pw:size-3.5",
                    defaultClassNames.caption_label,
                ),
                table: "pw:w-full",
                weekdays: cn("pw:grid pw:grid-cols-7 pw:mb-2", defaultClassNames.weekdays),
                weekday: cn(
                    "pw:text-muted-foreground select-none pw:rounded-md pw:text-[0.8rem] pw:font-medium pw:text-center pw:h-8 pw:flex pw:items-center pw:justify-center",
                    defaultClassNames.weekday,
                ),
                week: cn("pw:grid pw:grid-cols-7 pw:w-full", defaultClassNames.week),


                week_number_header: cn(
                    "pw:w-[--cell-size] select-none",
                    defaultClassNames.week_number_header,
                ),
                week_number: cn(
                    "pw:text-muted-foreground select-none pw:text-[0.8rem]",
                    defaultClassNames.week_number,
                ),
                day: cn(
                    "group/day pw:relative aspect-square pw:h-full pw:w-full select-none pw:p-0 pw:text-center [&:first-child[data-selected=true]_button]:pw:rounded-l-md [&:last-child[data-selected=true]_button]:pw:rounded-r-md",
                    defaultClassNames.day,
                ),
                range_start: cn(
                    "pw:bg-accent pw:rounded-l-md",
                    defaultClassNames.range_start,
                ),
                range_middle: cn("pw:rounded-none", defaultClassNames.range_middle),
                range_end: cn("pw:bg-accent pw:rounded-r-md", defaultClassNames.range_end),
                today: cn(
                    "pw:bg-accent pw:text-accent-foreground pw:rounded-md data-[selected=true]:pw:rounded-none",
                    defaultClassNames.today,
                ),
                outside: cn(
                    "pw:text-muted-foreground aria-selected:pw:text-muted-foreground",
                    defaultClassNames.outside,
                ),
                disabled: cn(
                    "pw:text-muted-foreground pw:opacity-50",
                    defaultClassNames.disabled,
                ),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => {
                    return (
                        <div
                            data-slot="calendar"
                            ref={rootRef}
                            className={cn(className)}
                            {...props}
                        />
                    );
                },
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === "left") {
                        return (
                            <ChevronLeftIcon className={cn("pw:size-4", className)} {...props} />
                        );
                    }

                    if (orientation === "right") {
                        return (
                            <ChevronRightIcon
                                className={cn("pw:size-4", className)}
                                {...props}
                            />
                        );
                    }

                    return (
                        <ChevronDownIcon className={cn("pw:size-4", className)} {...props} />
                    );
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({ children, ...props }) => {
                    return (
                        <td {...props}>
                            <div className="pw:flex pw:size-[--cell-size] pw:items-center pw:justify-center pw:text-center">
                                {children}
                            </div>
                        </td>
                    );
                },
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    ...props
}: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames();

    const ref = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                "data-[selected-single=true]:pw:bg-primary data-[selected-single=true]:pw:text-primary-foreground data-[range-middle=true]:pw:bg-accent data-[range-middle=true]:pw:text-accent-foreground data-[range-start=true]:pw:bg-primary data-[range-start=true]:pw:text-primary-foreground data-[range-end=true]:pw:bg-primary data-[range-end=true]:pw:text-primary-foreground group-data-[focused=true]/day:pw:border-ring group-data-[focused=true]/day:pw:ring-ring/50 pw:flex aspect-square pw:h-auto pw:w-full pw:min-w-[--cell-size] pw:flex-col pw:gap-1 pw:font-normal pw:leading-none data-[range-end=true]:pw:rounded-md data-[range-middle=true]:pw:rounded-none data-[range-start=true]:pw:rounded-md group-data-[focused=true]/day:pw:relative group-data-[focused=true]/day:pw:z-10 group-data-[focused=true]/day:pw:ring-[3px] [&>span]:pw:text-xs [&>span]:pw:opacity-70",
                defaultClassNames.day,
                className,
            )}
            {...props}
        />
    );
}

export { Calendar, CalendarDayButton };
