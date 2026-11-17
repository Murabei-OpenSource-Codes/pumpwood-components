"use client";

import type { ReactNode } from "react";
import { LoginCard, type ILoginCardProps } from "./LoginCard";
import {
    LoginPageLayoutV2,
    type ILoginPageLayoutV2Props,
} from "./LoginPageLayoutV2";

const DEFAULT_V2_CARD_CLASSNAME =
    "w-full max-w-md rounded-[30px] border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-2xl";

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
export function LoginPageV2({
    brand,
    brandPanelClassName,
    formPanelClassName,
    pageClassName,
    backgroundImageSrc,
    cardClassName,
    welcomeTitle,
    welcomeDescription,
    className,
    ...loginCardProps
}: ILoginPageV2Props) {
    const layoutProps: Pick<
        ILoginPageLayoutV2Props,
        | "brandPanelClassName"
        | "formPanelClassName"
        | "pageClassName"
        | "backgroundImageSrc"
        | "welcomeTitle"
        | "welcomeDescription"
    > = {
        brandPanelClassName,
        formPanelClassName,
        pageClassName,
        backgroundImageSrc,
        welcomeTitle,
        welcomeDescription,
    };

    return (
        <LoginPageLayoutV2 brand={brand} {...layoutProps}>
            <LoginCard
                {...loginCardProps}
                className={cardClassName ?? className ?? DEFAULT_V2_CARD_CLASSNAME}
            />
        </LoginPageLayoutV2>
    );
}