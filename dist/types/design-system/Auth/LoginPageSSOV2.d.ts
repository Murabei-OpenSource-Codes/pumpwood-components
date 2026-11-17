import type { ReactNode } from "react";
import { type ILoginCardSSOProps } from "./LoginCardSSO";
export interface ILoginPageSSOV2Props extends ILoginCardSSOProps {
    brand: ReactNode;
    brandPanelClassName?: string;
    formPanelClassName?: string;
    pageClassName?: string;
    backgroundImageSrc?: string;
    cardClassName?: string;
    welcomeTitle?: ReactNode;
    welcomeDescription?: ReactNode;
}
/**
 * Split-screen SSO login (V2). Auth logic lives in LoginCardSSO unchanged.
 */
export declare function LoginPageSSOV2({ brand, brandPanelClassName, formPanelClassName, pageClassName, backgroundImageSrc, cardClassName, welcomeTitle, welcomeDescription, className, ...loginCardProps }: ILoginPageSSOV2Props): import("react/jsx-runtime").JSX.Element;
