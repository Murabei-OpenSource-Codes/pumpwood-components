import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "outline" | "destructive" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Displays a button or a component that looks like a button.
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="outline" size="sm">Action</Button>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "link" | "default" | "outline" | "destructive" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
    asChild?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
