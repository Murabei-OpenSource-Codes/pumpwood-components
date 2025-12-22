import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
    children: ReactNode;
    className?: string;
};

function H1({ children, className, ...props }: TypographyProps) {
    return <h1 className={cn("text-3xl font-bold tracking-tight", className)} {...props}>{children}</h1>
}

function Muted({ children, className, ...props }: TypographyProps) {
    return <p className={cn("text-muted-foreground", className)} {...props}>{children}</p>
}

export const Typography = {
    H1,
    Muted,
}