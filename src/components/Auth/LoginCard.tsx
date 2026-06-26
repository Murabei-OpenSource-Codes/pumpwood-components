"use client";

import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import Stack from "../Stack";
import { AlertWithIcon } from "../AlertWithIcon";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface ILoginCardProps {
    onLogin: (credentials: {
        username: string;
        password: string;
    }) => Promise<{ error?: string | null }>;
    onSuccess?: () => void;
    onError?: (message: string, error: string) => void;
    sessionExpired?: boolean;
    sessionExpiredAlert?: {
        icon: ReactNode;
        title?: string;
        description?: string;
    };
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    usernameLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    loginErrorMessage?: string;
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
 * Username and password login card.
 */
export function LoginCard({
    onLogin,
    onSuccess,
    onError,
    sessionExpired = false,
    sessionExpiredAlert,
    forgotPasswordHref = "/",
    forgotPasswordLabel = "Esqueci a senha",
    usernameLabel = "Usuario",
    passwordLabel = "Senha",
    submitLabel = "Entrar",
    loginErrorMessage = "Login error!",
    LinkComponent = DefaultLink,
    className,
}: ILoginCardProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        setIsSubmitting(true);
        try {
            const { error } = await onLogin({ username, password });

            if (error) {
                onError?.(loginErrorMessage, String(error));
                return;
            }

            onSuccess?.();
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
                <CardHeader className="items-center" />
                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid w-full items-center gap-4 mt-6">
                            <Stack gap={4}>
                                <Label className="text-primary" htmlFor="username">
                                    {usernameLabel}
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Seu nome de usuário"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Stack>
                            <Stack gap={4}>
                                <Label className="text-primary" htmlFor="password">
                                    {passwordLabel}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Sua senha de acesso"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Stack>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="justify-center items-center">
                    <Stack gap={4} className="justify-center items-center mt-10">
                        <Button
                            className="w-full"
                            onClick={handleLogin}
                            disabled={isSubmitting}
                        >
                            {submitLabel}
                        </Button>
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
