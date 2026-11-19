import type { ReactNode } from "react";
export type LoginPageVariant = "default" | "v2";
export interface ILoginPageSplitLayoutProps {
    brand: ReactNode;
    brandPanelClassName?: string;
    formPanelClassName?: string;
    pageClassName?: string;
    backgroundImageSrc?: string;
    cardClassName?: string;
    welcomeTitle?: ReactNode;
    welcomeDescription?: ReactNode;
    /** Murabei easter-egg graph on the form panel (default: on). */
    formPanelNetwork?: boolean;
}
export declare const DEFAULT_V2_CARD_CLASSNAME = "w-full max-w-md rounded-[30px] border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-2xl";
