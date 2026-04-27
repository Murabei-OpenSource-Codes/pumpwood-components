import { type VariantProps } from "class-variance-authority";
export declare const pumpwoodBadgeVariants: (props?: ({
    variant?: "destructive" | "secondary" | "primary" | "warning" | "muted" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface PumpwoodBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pumpwoodBadgeVariants> {
}
/**
 * A Badge component for status indicators and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="primary">New</Badge>
 * <Badge variant="destructive" size="sm">Error</Badge>
 * ```
 */
export declare function PumpwoodBadge({ className, variant, size, ...props }: PumpwoodBadgeProps): import("react/jsx-runtime").JSX.Element;
