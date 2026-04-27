import { type VariantProps } from "class-variance-authority";
import type * as React from "react";
declare const badgeVariants: (props?: ({
    variant?: "default" | "info" | "outline" | "warning" | "success" | "destructive" | "secondary" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
/**
 * Displays a badge or a component that looks like a badge.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * ```
 */
declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
