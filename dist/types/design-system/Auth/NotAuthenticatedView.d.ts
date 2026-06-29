import type { ComponentType, ReactNode } from "react";
export interface INotAuthenticatedViewProps {
    error: unknown;
    loginHref: string;
    title?: string;
    description?: string;
    fallbackLinkLabel?: string;
    errorDetailsLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * OAuth error screen with expandable error details.
 */
export declare function NotAuthenticatedView({ error, loginHref, title, description, fallbackLinkLabel, errorDetailsLabel, copyLabel, copiedLabel, LinkComponent, className, }: INotAuthenticatedViewProps): import("react/jsx-runtime").JSX.Element;
