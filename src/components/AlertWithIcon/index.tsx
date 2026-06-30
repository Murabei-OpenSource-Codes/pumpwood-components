import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

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
export function AlertWithIcon({
    icon,
    title,
    description,
    variant = "default",
    className,
}: IAlertWithIconProps) {
    return (
        <Alert variant={variant} className={className ?? "w-auto h-auto m-4"}>
            {icon}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
}
