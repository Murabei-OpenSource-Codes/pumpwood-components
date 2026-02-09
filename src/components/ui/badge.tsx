import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"pw:inline-flex pw:items-center pw:rounded-md pw:border pw:px-2.5 pw:py-0.5 pw:text-xs pw:font-semibold pw:transition-colors focus:pw:outline-none focus:pw:ring-2 focus:pw:ring-ring focus:pw:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"pw:border-transparent pw:bg-primary pw:text-primary-foreground pw:shadow hover:pw:bg-primary/80",
				secondary:
					"pw:border-transparent pw:bg-secondary pw:text-secondary-foreground hover:pw:bg-secondary/80",
				destructive:
					"pw:border-transparent pw:bg-destructive pw:text-destructive-foreground pw:shadow hover:pw:bg-destructive/80",
				outline: "pw:text-foreground",
				success:
					"pw:border-transparent pw:bg-green-100 pw:text-green-800 hover:pw:bg-green-200",
				warning:
					"pw:border-transparent pw:bg-yellow-100 pw:text-yellow-800 hover:pw:bg-yellow-200",
				info: "pw:border-transparent pw:bg-blue-100 pw:text-blue-800 hover:pw:bg-blue-200",
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

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
