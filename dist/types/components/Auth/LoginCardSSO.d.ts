import type { ComponentType, ReactNode } from "react";
export interface ILoginCardSSOProps {
    onLoginSSO: (email: string) => Promise<{
        redirect_url?: string | null;
        error?: string | null;
    }>;
    onRedirect?: (url: string) => void;
    onError?: (message: string, error: string) => void;
    sessionExpired?: boolean;
    sessionExpiredAlert?: {
        icon: ReactNode;
        title?: string;
        description?: string;
    };
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    emailLabel?: string;
    submitLabel?: string;
    unauthorizedMessage?: string;
    genericErrorMessage?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * SSO email login card.
 */
export declare function LoginCardSSO({ onLoginSSO, onRedirect, onError, sessionExpired, sessionExpiredAlert, forgotPasswordHref, forgotPasswordLabel, emailLabel, submitLabel, unauthorizedMessage, genericErrorMessage, LinkComponent, className, }: ILoginCardSSOProps): import("react/jsx-runtime").JSX.Element;
