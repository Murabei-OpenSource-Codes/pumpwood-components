"use client";

import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import { Stack } from "@components/index";
import { AlertWithIcon } from "@components/AlertWithIcon";
import { Button } from "@components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

export interface ILoginCardSSOProps {
    onLoginSSO: (email: string) => Promise<{
        redirect_url?: string | null;
        error?: string | null;
    }>;
    onRedirect?: (url: string) => void;
    onError?: (message: string, error: string) => void;
    sessionExpired?: boolean;
    sessionExpiredAlert?: {
        icon: ReactNode;
        title?: string;
        description?: string;
    };
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    emailLabel?: string;
    submitLabel?: string;
    unauthorizedMessage?: string;
    genericErrorMessage?: string;
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
 * SSO email login card.
 */
export function LoginCardSSO({
    onLoginSSO,
    onRedirect,
    onError,
    sessionExpired = false,
    sessionExpiredAlert,
    forgotPasswordHref = "/",
    forgotPasswordLabel = "Esqueci a senha",
    emailLabel = "Email",
    submitLabel = "Entrar com SSO",
    unauthorizedMessage = "Usuario nao autorizado",
    genericErrorMessage = "Erro ao fazer login",
    LinkComponent = DefaultLink,
    className,
}: ILoginCardSSOProps) {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { redirect_url, error } = await onLoginSSO(email);

            if (redirect_url) {
                onRedirect?.(redirect_url);
                return;
            }

            const treatedError = error?.includes("401")
                ? unauthorizedMessage
                : genericErrorMessage;
            onError?.(treatedError, String(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Stack gap={4}>
            {sessionExpired && sessionExpiredAlert?.icon && (
                <AlertWithIcon
                    variant="destructive"
                    icon={sessionExpiredAlert.icon}
                    title={sessionExpiredAlert.title ?? "Sessão expirada"}
                    description={
                        sessionExpiredAlert.description ??
                        "Faça login novamente para continuar"
                    }
                />
            )}
            <Card
                className={
                    className ??
                    "bg-white w-[400px] h-[457px] rounded-[30px] shadow-lg"
                }
            >
                <CardHeader className="items-center mt-4" />
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid w-full items-center gap-4 mt-6">
                            <Stack gap={4}>
                                <Label className="text-primary" htmlFor="email">
                                    {emailLabel}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Seu email de acesso"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    required
                                />
                            </Stack>
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {submitLabel}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col justify-center items-center">
                    <Stack gap={4} className="justify-start items-center mb-7">
                        <LinkComponent
                            href={forgotPasswordHref}
                            className="text-primary text-xs"
                        >
                            {forgotPasswordLabel}
                        </LinkComponent>
                    </Stack>
                </CardFooter>
            </Card>
        </Stack>
    );
}
