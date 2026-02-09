import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const pumpwoodBadgeVariants = cva(
    "pw:inline-flex pw:items-center pw:rounded-full pw:border pw:px-2.5 pw:py-0.5 pw:text-xs pw:transition-colors",
    {
        variants: {
            variant: {
                primary: "pw:bg-primary pw:text-primary-foreground",
                secondary: "pw:bg-[#DCFCE7] pw:text-[#15803D]",
                warning: "pw:bg-[#FEF3C7] pw:text-[#B45309]",
                destructive: "pw:bg-[#FEE2E2] pw:text-[#B91C1C]",
                muted: "pw:bg-[#F1F5F9] pw:text-[#334155]",
            },
            size: {
                default: "",
                sm: "pw:text-[12px] pw:font-bold",
                lg: "pw:text-[14px] pw:font-normal",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export interface PumpwoodBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pumpwoodBadgeVariants> { }

export function PumpwoodBadge({
    className,
    variant,
    size,
    ...props
}: PumpwoodBadgeProps) {
    return (
        <div
            className={cn(pumpwoodBadgeVariants({ variant, size }), className)}
            {...props}
        />
    )
}
