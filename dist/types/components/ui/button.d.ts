import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    iconPosition?: "start" | "end";
    /** Button height in pixels or any valid CSS length. */
    height?: number | string;
    /** Button width in pixels or any valid CSS length. */
    width?: number | string;
}
/**
 * Displays a button or a component that looks like a button.
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="outline" size="sm">Action</Button>
 * <Button
 *   label="Criar novo lote"
 *   icon={<SquarePlus size={16} />}
 *   width={200}
 * />
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
