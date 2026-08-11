import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "text-foreground border-border",
				success:
					"border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30",
				warning:
					"border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30",
				info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-sky-500/20 dark:text-sky-300 dark:hover:bg-sky-500/30",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof badgeVariants> { }

/**
 * Displays a badge or a component that looks like a badge.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
