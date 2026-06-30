"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Spinner } from "@components/ui/spinner";

export interface IAuthenticatedViewProps {
    redirectHref: string;
    redirectDelayMs?: number;
    onRedirect?: (href: string) => void;
    title?: string;
    fallbackLinkLabel?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}

const DefaultLink = ({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: ReactNode;
}) => (
    <a href={href} className={className}>
        {children}
    </a>
);

/**
 * OAuth success screen with auto-redirect.
 */
export function AuthenticatedView({
    redirectHref,
    redirectDelayMs = 3000,
    onRedirect,
    title = "Autenticado com sucesso! Redirecionado automaticamente",
    fallbackLinkLabel =
        "Caso nao seja redirecionado automaticamente, clique aqui",
    LinkComponent = DefaultLink,
    className,
}: IAuthenticatedViewProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRedirect?.(redirectHref);
        }, redirectDelayMs);

        return () => clearTimeout(timer);
    }, [redirectHref, redirectDelayMs, onRedirect]);

    return (
        <div className="flex justify-center items-center h-screen">
            <Card
                className={
                    className ??
                    "bg-white w-[400px] h-[457px] rounded-[30px] shadow-lg"
                }
            >
                <CardHeader className="items-center mt-4" />
                <CardContent className="flex flex-col gap-4">
                    <Spinner />
                    <h4 className="text-center">{title}</h4>
                    <LinkComponent
                        href={redirectHref}
                        className="w-full text-sm underline text-accent text-center"
                    >
                        {fallbackLinkLabel}
                    </LinkComponent>
                </CardContent>
            </Card>
        </div>
    );
}
