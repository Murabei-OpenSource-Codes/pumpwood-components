import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const pumpwoodBadgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground",
                secondary: "bg-[#DCFCE7] text-[#15803D]",
                warning: "bg-[#FEF3C7] text-[#B45309]",
                destructive: "bg-[#FEE2E2] text-[#B91C1C]",
                muted: "bg-[#F1F5F9] text-[#334155]",
            },
            size: {
                default: "",
                sm: "text-[12px] font-bold",
                lg: "text-[14px] font-normal",
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
