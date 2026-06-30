"use client";

import { CheckIcon, ClipboardIcon, XCircleIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import { Stack } from "@components/index";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@components/ui/accordion";
import { Card, CardContent, CardHeader } from "@components/ui/card";

export interface INotAuthenticatedViewProps {
    error: unknown;
    loginHref: string;
    title?: string;
    description?: string;
    fallbackLinkLabel?: string;
    errorDetailsLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
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
 * OAuth error screen with expandable error details.
 */
export function NotAuthenticatedView({
    error,
    loginHref,
    title = "Erro ao autenticar!",
    description =
        "Verifique suas informações de SSO ou converse com o administrador do sistema.",
    fallbackLinkLabel =
        "Caso não seja redirecionado automaticamente, clique aqui",
    errorDetailsLabel = "Detalhes para os Nerds",
    copyLabel = "Copiar",
    copiedLabel = "Copiado!",
    LinkComponent = DefaultLink,
    className,
}: INotAuthenticatedViewProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!error) return;
        try {
            await navigator.clipboard.writeText(
                typeof error === "string"
                    ? error
                    : JSON.stringify(error, null, 2),
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const errorText =
        typeof error === "string" ? error : JSON.stringify(error, null, 2);

    return (
        <Stack className="justify-center items-center h-screen">
            <Card
                className={
                    className ??
                    "w-[400px] h-[457px] rounded-[30px] shadow-lg bg-red-50"
                }
            >
                <CardHeader className="items-center" />
                <CardContent className="flex flex-col items-center gap-2">
                    <XCircleIcon size={48} className="text-red-700" />
                    <h4 className="text-center">{title}</h4>
                    <p className="text-sm text-center">{description}</p>
                    <LinkComponent
                        href={loginHref}
                        className="w-full text-sm underline text-accent text-center"
                    >
                        {fallbackLinkLabel}
                    </LinkComponent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="error-details">
                            <AccordionTrigger>{errorDetailsLabel}</AccordionTrigger>
                            <AccordionContent className="max-w-80">
                                <div className="flex justify-end mb-1">
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="text-xs text-accent hover:underline flex items-center gap-1"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckIcon
                                                    size={14}
                                                    className="text-green-600"
                                                />{" "}
                                                {copiedLabel}
                                            </>
                                        ) : (
                                            <>
                                                <ClipboardIcon size={14} />{" "}
                                                {copyLabel}
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="max-h-24 overflow-y-auto overflow-x-hidden">
                                    <pre className="bg-gray-100 p-4 rounded-md">
                                        <code className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap break-words">
                                            {errorText}
                                        </code>
                                    </pre>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </Stack>
    );
}
