import type { HTMLAttributes, ReactNode } from "react";
type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
    children: ReactNode;
    className?: string;
};
declare function H1({ children, className, ...props }: TypographyProps): import("react/jsx-runtime").JSX.Element;
declare function Muted({ children, className, ...props }: TypographyProps): import("react/jsx-runtime").JSX.Element;
/**
 * Typography components for consistent text styling.
 *
 * @example
 * ```tsx
 * <Typography.H1>Main Title</Typography.H1>
 * <Typography.Muted>Subtitle text</Typography.Muted>
 * ```
 */
export declare const Typography: {
    H1: typeof H1;
    Muted: typeof Muted;
};
export {};
