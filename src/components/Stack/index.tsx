import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type StackProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    direction?: "row" | "col";
    gap?: number;
    className?: string;
};

function Stack({
    children,
    direction,
    gap,
    className,
    ...props
}: StackProps) {
    const baseGap = gap ? `gap-${gap}` : "gap-0";
    const baseDirection = direction === "row" ? "flex flex-row" : "flex flex-col";
    const baseStyle = `${baseDirection} ${baseGap}`;

    return (
        <div className={cn(baseStyle, className)} {...props}>
            {children}
        </div>
    );
}

export default Stack;
