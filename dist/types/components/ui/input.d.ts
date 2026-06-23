import * as React from "react";
import { InputHTMLAttributes, ReactNode } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
}
/**
 * Displays a styled input field with optional leading icon.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter text..." />
 * <Input icon={<Search className="h-4 w-4" />} placeholder="Search..." />
 * ```
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
