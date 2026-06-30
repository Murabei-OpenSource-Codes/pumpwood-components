"use client";

import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Stack } from "@components/index";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";

export interface IDetailPageSection {
    id?: string;
    title: string;
    content: ReactNode;
    defaultOpen?: boolean;
}

export interface IDetailPageProps {
    title: string;
    titleAddon?: ReactNode;
    isLoading?: boolean;
    error?: Error | null;
    onBack?: () => void;
    actions?: ReactNode;
    sections?: IDetailPageSection[];
    children?: ReactNode;
    loadingComponent?: ReactNode;
    errorComponent?: ReactNode;
    backButtonLabel?: string;
}

/**
 * Reusable detail page shell with header, loading/error states and sections.
 */
export function DetailPage({
    title,
    titleAddon,
    isLoading = false,
    error = null,
    onBack,
    actions,
    sections = [],
    children,
    loadingComponent,
    errorComponent,
    backButtonLabel = "Voltar",
}: IDetailPageProps) {
    if (isLoading) {
        return (
            loadingComponent ?? (
                <Stack className="justify-center items-center p-8">
                    <Spinner />
                </Stack>
            )
        );
    }

    if (error) {
        return (
            errorComponent ?? (
                <Stack className="justify-center items-center p-8">
                    <p className="text-destructive">{error.message}</p>
                </Stack>
            )
        );
    }

    return (
        <Stack direction="col" gap={4}>
            <Stack
                direction="row"
                gap={4}
                className="justify-between items-center"
            >
                <Stack direction="row" gap={4} className="items-center">
                    {onBack && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onBack}
                            title={backButtonLabel}
                        >
                            <ArrowLeft className="size-4" />
                        </Button>
                    )}
                    <h1 className="text-2xl font-semibold text-surface-secondary">
                        {title}
                    </h1>
                    {titleAddon}
                </Stack>
                {actions && (
                    <Stack direction="row" gap={2}>
                        {actions}
                    </Stack>
                )}
            </Stack>

            {sections.map((section, index) => {
                const sectionId = section.id ?? `section-${index}`;
                return (
                    <Accordion
                        key={sectionId}
                        type="single"
                        collapsible
                        defaultValue={
                            section.defaultOpen ? sectionId : undefined
                        }
                        className="w-full"
                    >
                        <AccordionItem value={sectionId} className="border-b">
                            <AccordionTrigger className="hover:no-underline text-base font-normal text-surface-secondary">
                                {section.title}
                            </AccordionTrigger>
                            <AccordionContent className="pt-4">
                                {section.content}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                );
            })}

            {children}
        </Stack>
    );
}
