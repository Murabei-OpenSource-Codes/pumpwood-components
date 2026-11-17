"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
export function LoginPageLayoutV2({
    brand,
    children,
    brandPanelClassName,
    formPanelClassName,
    pageClassName,
    backgroundImageSrc,
    welcomeTitle,
    welcomeDescription,
}: ILoginPageLayoutV2Props) {
    const brandPanelStyle = backgroundImageSrc
        ? {
              backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.88), hsl(var(--primary) / 0.72)), url(${backgroundImageSrc})`,
          }
        : undefined;

    const brandTile = (
        <div className="flex items-center justify-center rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 px-10 py-8 shadow-lg backdrop-blur">
            {brand}
        </div>
    );

    return (
        <div
            className={cn(
                "grid min-h-screen w-full grid-cols-1 lg:grid-cols-2",
                pageClassName,
            )}
        >
            <aside
                className={cn(
                    "relative hidden min-h-screen flex-col items-center justify-center overflow-hidden",
                    "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground lg:flex",
                    backgroundImageSrc && "bg-cover bg-center bg-no-repeat",
                    brandPanelClassName,
                )}
                style={brandPanelStyle}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10 motion-safe:animate-pulse"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary-foreground/10 motion-safe:animate-pulse"
                />
                <div className="relative z-10 flex max-w-md flex-col items-center px-8">
                    {brandTile}
                </div>
            </aside>
            <main
                className={cn(
                    "flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-10 text-zinc-50",
                    formPanelClassName,
                )}
            >
                <div className="w-full max-w-md">
                    <div className="mb-8 flex justify-center lg:hidden">
                        {brandTile}
                    </div>
                    {(welcomeTitle ?? welcomeDescription) && (
                        <header className="mb-6 text-left">
                            {welcomeTitle ? (
                                <div className="mb-1 text-2xl font-semibold tracking-tight text-zinc-50">
                                    {welcomeTitle}
                                </div>
                            ) : null}
                            {welcomeDescription ? (
                                <p className="text-sm text-zinc-400">
                                    {welcomeDescription}
                                </p>
                            ) : null}
                        </header>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}