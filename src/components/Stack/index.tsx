"use client";

import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type StackProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    /** The direction of the stack. Defaults to 'col'. */
    direction?: "row" | "col";
    /** The gap between elements. Maps to Tailwind gap utility (e.g. 4 -> gap-4). */
    gap?: number;
    /** Click handler. When set, the stack becomes keyboard-accessible (role="button"). */
    onClick?: () => void;
    className?: string;
};

/**
 * A layout component that arranges children in a stack (vertical or horizontal).
 *
 * When `onClick` is provided, the stack receives `role="button"`, `tabIndex={0}`,
 * and responds to Enter and Space keys. Provide visible text or pass `aria-label`
 * via props for accessibility.
 *
 * @example
 * ```tsx
 * <Stack direction="row" gap={4}>
 *   <Button>Btn 1</Button>
 *   <Button>Btn 2</Button>
 * </Stack>
 * ```
 */
function Stack({
    children,
    onClick,
    direction,
    gap,
    className,
    ...props
}: StackProps) {
    const baseGap = gap ? `gap-${gap}` : "gap-0";
    const baseDirection = direction === "row" ? "flex flex-row" : "flex flex-col";
    const baseStyle = `${baseDirection} ${baseGap}`;

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onClick();
        }
    };

    const interactiveProps = onClick
        ? {
                role: "button" as const,
                tabIndex: 0,
                onClick,
                onKeyDown: handleKeyDown,
            }
        : {};

    return (
        <div {...interactiveProps} className={cn(baseStyle, className)} {...props}>
            {children}
        </div>
    );
}

export default Stack;
