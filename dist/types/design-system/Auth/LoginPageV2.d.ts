import type { ReactNode } from "react";
import { type ILoginCardProps } from "./LoginCard";
export interface ILoginPageV2Props extends ILoginCardProps {
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
 * Split-screen login (V2). Auth logic lives in LoginCard unchanged.
 */
export declare function LoginPageV2({ brand, brandPanelClassName, formPanelClassName, pageClassName, backgroundImageSrc, cardClassName, welcomeTitle, welcomeDescription, className, ...loginCardProps }: ILoginPageV2Props): import("react/jsx-runtime").JSX.Element;
