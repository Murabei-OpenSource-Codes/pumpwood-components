import type { ComponentType, ReactNode } from "react";
export interface ILoginCardProps {
    onLogin: (credentials: {
        username: string;
        password: string;
    }) => Promise<{
        error?: string | null;
    }>;
    onSuccess?: () => void;
    onError?: (message: string, error: string) => void;
    sessionExpired?: boolean;
    sessionExpiredAlert?: {
        icon: ReactNode;
        title?: string;
        description?: string;
    };
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    usernameLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    loginErrorMessage?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * Username and password login card.
 */
export declare function LoginCard({ onLogin, onSuccess, onError, sessionExpired, sessionExpiredAlert, forgotPasswordHref, forgotPasswordLabel, usernameLabel, passwordLabel, submitLabel, loginErrorMessage, LinkComponent, className, }: ILoginCardProps): import("react/jsx-runtime").JSX.Element;
