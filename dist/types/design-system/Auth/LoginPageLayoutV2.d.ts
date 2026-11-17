import type { ReactNode } from "react";
export interface ILoginPageLayoutV2Props {
    brand: ReactNode;
    children: ReactNode;
    brandPanelClassName?: string;
    formPanelClassName?: string;
    pageClassName?: string;
    backgroundImageSrc?: string;
    welcomeTitle?: ReactNode;
    welcomeDescription?: ReactNode;
}
/**
 * Split-screen shell for login V2. Two grid children only so Tailwind
 * `lg:grid-cols-2` stays a true 50/50 split.
 */
export declare function LoginPageLayoutV2({ brand, children, brandPanelClassName, formPanelClassName, pageClassName, backgroundImageSrc, welcomeTitle, welcomeDescription, }: ILoginPageLayoutV2Props): import("react/jsx-runtime").JSX.Element;
