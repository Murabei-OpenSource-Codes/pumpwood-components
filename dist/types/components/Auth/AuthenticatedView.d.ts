import type { ComponentType, ReactNode } from "react";
export interface IAuthenticatedViewProps {
    redirectHref: string;
    redirectDelayMs?: number;
    onRedirect?: (href: string) => void;
    title?: string;
    fallbackLinkLabel?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * OAuth success screen with auto-redirect.
 */
export declare function AuthenticatedView({ redirectHref, redirectDelayMs, onRedirect, title, fallbackLinkLabel, LinkComponent, className, }: IAuthenticatedViewProps): import("react/jsx-runtime").JSX.Element;
