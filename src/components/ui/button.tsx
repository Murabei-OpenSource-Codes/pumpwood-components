import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
    "pw:inline-flex pw:items-center pw:justify-center pw:gap-2 pw:whitespace-nowrap pw:rounded-md pw:text-sm pw:font-medium pw:transition-all disabled:pw:pointer-events-none disabled:pw:opacity-50 [&_svg]:pw:pointer-events-none [&_svg:not([class*='pw:size-'])]:pw:size-4 pw:shrink-0 [&_svg]:pw:shrink-0 pw:outline-none focus-visible:pw:border-ring focus-visible:pw:ring-ring/50 focus-visible:pw:ring-[3px] aria-invalid:pw:ring-destructive/20 dark:aria-invalid:pw:ring-destructive/40 aria-invalid:pw:border-destructive hover:pw:cursor-pointer",
    {
        variants: {
            variant: {
                default: "pw:bg-[#026CB6] pw:text-white hover:pw:bg-[#026CB6]/90",
                destructive:
                    "pw:bg-destructive pw:text-white hover:pw:bg-destructive/90 focus-visible:pw:ring-destructive/20 dark:focus-visible:pw:ring-destructive/40 dark:pw:bg-destructive/60",
                outline:
                    "pw:border pw:bg-background pw:shadow-xs hover:pw:bg-accent hover:pw:text-accent-foreground dark:pw:bg-input/30 dark:pw:border-input dark:hover:pw:bg-input/50",
                secondary:
                    "pw:bg-secondary pw:text-secondary-foreground hover:pw:bg-secondary/80",
                ghost:
                    "hover:pw:bg-accent hover:pw:text-accent-foreground dark:hover:pw:bg-accent/50",
                link: "pw:text-primary pw:underline-offset-4 hover:pw:underline",
            },
            size: {
                default: "pw:h-9 pw:px-4 pw:py-2 has-[>svg]:pw:px-3",
                sm: "pw:h-8 pw:rounded-md pw:gap-1.5 pw:px-3 has-[>svg]:pw:px-2.5",
                lg: "pw:h-10 pw:rounded-md pw:px-6 has-[>svg]:pw:px-4",
                icon: "pw:size-9",
                "icon-sm": "pw:size-8",
                "icon-lg": "pw:size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

/**
 * Displays a button or a component that looks like a button.
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="outline" size="sm">Action</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }>(({
        className,
        variant,
        size,
        asChild = false,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                data-slot="button"
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            />
        )
    })
Button.displayName = "Button"


export { Button, buttonVariants }
