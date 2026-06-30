import type { ReactNode } from "react";
interface ErrorBoundaryProps {
    children: ReactNode;
    hasError: boolean;
    message?: string;
    className?: string;
}
declare const ErrorBoundary: ({ children, hasError, message, }: ErrorBoundaryProps) => import("react/jsx-runtime").JSX.Element;
export default ErrorBoundary;
export { ErrorBoundary };
