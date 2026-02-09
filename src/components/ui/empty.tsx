import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * A placeholder component for empty states.
 *
 * @example
 * ```tsx
 * <Empty>
 *   <EmptyHeader>
 *     <EmptyTitle>No data</EmptyTitle>
 *   </EmptyHeader>
 * </Empty>
 * ```
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="empty"
            className={cn(
                "pw:flex pw:min-w-0 pw:flex-1 pw:flex-col pw:items-center pw:justify-center pw:gap-6 pw:text-balance pw:rounded-lg pw:border-dashed pw:p-6 pw:text-center md:pw:p-12",
                className
            )}
            {...props}
        />
    )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="empty-header"
            className={cn(
                "pw:flex pw:max-w-sm pw:flex-col pw:items-center pw:gap-2 pw:text-center",
                className
            )}
            {...props}
        />
    )
}

const emptyMediaVariants = cva(
    "pw:mb-2 pw:flex pw:shrink-0 pw:items-center pw:justify-center [&_svg]:pw:pointer-events-none [&_svg]:pw:shrink-0",
    {
        variants: {
            variant: {
                default: "pw:bg-transparent",
                icon: "pw:bg-muted pw:text-foreground pw:flex pw:size-10 pw:shrink-0 pw:items-center pw:justify-center pw:rounded-lg [&_svg:not([class*='pw:size-'])]:pw:size-6",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function EmptyMedia({
    className,
    variant = "default",
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
    return (
        <div
            data-slot="empty-icon"
            data-variant={variant}
            className={cn(emptyMediaVariants({ variant, className }))}
            {...props}
        />
    )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="empty-title"
            className={cn("pw:text-lg pw:font-medium pw:tracking-tight", className)}
            {...props}
        />
    )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <div
            data-slot="empty-description"
            className={cn(
                "pw:text-muted-foreground [&>a:hover]:pw:text-primary pw:text-sm/relaxed [&>a]:pw:underline [&>a]:pw:underline-offset-4",
                className
            )}
            {...props}
        />
    )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="empty-content"
            className={cn(
                "pw:flex pw:w-full pw:min-w-0 pw:max-w-sm pw:flex-col pw:items-center pw:gap-4 pw:text-balance pw:text-sm",
                className
            )}
            {...props}
        />
    )
}

export {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
}
