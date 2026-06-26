import type { ReactNode } from "react";
export interface IAlertWithIconProps {
    icon: ReactNode;
    title: string;
    description: string;
    variant?: "default" | "destructive";
    className?: string;
}
/**
 * Alert with icon, title and description.
 */
export declare function AlertWithIcon({ icon, title, description, variant, className, }: IAlertWithIconProps): import("react/jsx-runtime").JSX.Element;
