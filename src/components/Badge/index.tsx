import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const pumpwoodBadgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground" as string,
                secondary: "bg-[#DCFCE7] text-[#15803D]" as string,
                warning: "bg-[#FEF3C7] text-[#B45309]" as string,
                destructive: "bg-[#FEE2E2] text-[#B91C1C]" as string,
                muted: "bg-[#F1F5F9] text-[#334155]" as string,
            },
            size: {
                default: "" as string,
                sm: "text-[12px] font-bold" as string,
                lg: "text-[14px] font-normal" as string,
            },
        },
        defaultVariants: {
            variant: "primary" as const,
            size: "default" as const,
        },
    }
)

export interface PumpwoodBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pumpwoodBadgeVariants> { }

/**
 * A Badge component for status indicators and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="primary">New</Badge>
 * <Badge variant="destructive" size="sm">Error</Badge>
 * ```
 */
export function PumpwoodBadge({
    className,
    variant,
    size,
    ...props
}: PumpwoodBadgeProps): React.JSX.Element {
    const variantClasses: string = pumpwoodBadgeVariants({ variant, size })
    const combinedClassName: string = cn(variantClasses, className)

    return (
        <div
            className={combinedClassName}
            {...props}
        />
    )
}