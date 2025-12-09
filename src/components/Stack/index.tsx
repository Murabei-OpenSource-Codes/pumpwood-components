"use client";

import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type StackProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    direction?: "row" | "col";
    gap?: number;
    onClick?: () => void;
    className?: string;
};

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
