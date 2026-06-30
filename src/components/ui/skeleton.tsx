import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A placeholder skeleton with pulse animation.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-[200px]" />
 * ```
 */
function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted",
                className,
            )}
            {...props}
        />
    );
}

export { Skeleton };
