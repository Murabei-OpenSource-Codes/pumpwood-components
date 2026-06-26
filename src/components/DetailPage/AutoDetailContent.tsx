"use client";

import type { ReactNode } from "react";
import Stack from "../Stack";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { KeyValueContent } from "../KeyValueContent";
import {
    formatDetailLabel,
    formatDetailValue,
    FULL_WIDTH_DETAIL_FIELDS,
    getDetailFieldValue,
    type IDetailFieldConfig,
    type IDetailSection,
    type IFormatDetailValueOptions,
} from "./detail-utils";

export type { IDetailFieldConfig, IDetailSection } from "./detail-utils";

export interface IAutoDetailContentProps {
    data: Record<string, any>;
    config?: IDetailFieldConfig;
    formatters?: {
        key: string;
        formatter: (value: unknown) => string;
    }[];
    wrapperElements?: {
        keys: string[];
        element: (props: {
            key: string;
            label: string;
            fieldValue: unknown;
            isFullWidth: boolean;
            data: Record<string, any>;
        }) => ReactNode;
    }[];
    statusLabels?: Record<string, string>;
    formatDate?: (date: string) => string;
}

const DEFAULT_SECTIONS = [
    {
        title: "Informações Gerais",
        fields: [
            "description",
            "row_permission",
            "origin",
            "created_by",
            "process_status",
            "msg",
        ],
        cols: 4 as const,
    },
    {
        title: "Datas de Processamento",
        fields: ["created_at", "start_processing_at", "finished_processing_at"],
        cols: 3 as const,
    },
    {
        title: "Proteção dos Dados",
        fields: ["ignore_locked", "lock_data"],
        cols: 4 as const,
    },
    {
        title: "Carregamento Manual",
        fields: [
            "format_type",
            "field_delimiter",
            "decimal_delimiter",
            "modeling_unit",
            "attribute",
            "geoarea",
        ],
        cols: 4 as const,
    },
];

/**
 * Auto-render entity detail fields in configurable sections.
 */
export function AutoDetailContent({
    data,
    config,
    formatters,
    wrapperElements,
    statusLabels,
    formatDate,
}: IAutoDetailContentProps) {
    const sections: IDetailSection[] = config?.sections || DEFAULT_SECTIONS;
    const formatOptions: IFormatDetailValueOptions = {
        statusLabels,
        formatDate,
    };

    const renderField = (key: string) => {
        if (!(key in data)) return null;

        const label = config?.labels?.[key] || formatDetailLabel(key, config?.labels);
        const formatter =
            (formatters || []).find((f) => f.key === key)?.formatter ||
            config?.formatters?.[key];
        const fieldValue = getDetailFieldValue(data, key);
        const value = formatter
            ? formatter(fieldValue)
            : formatDetailValue(fieldValue, key, formatOptions);

        const isFullWidth = FULL_WIDTH_DETAIL_FIELDS.includes(key);
        const wrapper = wrapperElements?.find((w) => w.keys.includes(key));
        if (wrapper?.element) {
            const element = wrapper.element({
                key,
                label,
                fieldValue,
                isFullWidth,
                data,
            });
            return (
                <Stack
                    key={key}
                    direction="col"
                    className={isFullWidth ? "col-span-full min-w-0" : "min-w-0"}
                >
                    {element}
                </Stack>
            );
        }

        return (
            <Stack
                key={key}
                direction="col"
                className={isFullWidth ? "col-span-full min-w-0" : "min-w-0"}
            >
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-base break-words whitespace-pre-wrap">{value}</p>
            </Stack>
        );
    };

    const results = data.results as
        | {
              processing_results?: {
                  count__added?: number;
                  count__updated?: number;
                  count__no_change?: number;
                  details?: Record<string, unknown>[];
              };
          }
        | undefined;

    return (
        <Stack direction="col" gap={6}>
            {sections.map((section) => {
                const visibleFields = section.fields.filter(
                    (field) => field in data,
                );
                if (visibleFields.length === 0) return null;

                if (section.isFullWidth)
                    return (
                        <Stack key={section.title} direction="col" gap={3}>
                            <h3 className="text-sm font-semibold text-foreground">
                                {section.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-x-6 gap-y-4">
                                {visibleFields.map((field) => renderField(field))}
                            </div>
                        </Stack>
                    );

                return (
                    <Stack key={section.title} direction="col" gap={3}>
                        <h3 className="text-sm font-semibold text-foreground">
                            {section.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
                            {visibleFields.map((field) => renderField(field))}
                        </div>
                    </Stack>
                );
            })}

            {Boolean(
                data.dimensions &&
                    typeof data.dimensions === "object" &&
                    Object.keys(data.dimensions as object).length > 0,
            ) && (
                    <Stack direction="col" gap={3}>
                        <h3 className="text-sm font-semibold text-foreground">
                            Tags
                        </h3>
                        <KeyValueContent
                            data={data.dimensions as Record<string, unknown>}
                        />
                    </Stack>
                )}

            {Boolean(
                data.extra_info &&
                    typeof data.extra_info === "object" &&
                    Object.keys(data.extra_info as object).length > 0,
            ) && (
                    <Stack direction="col" gap={3}>
                        <h3 className="text-sm font-semibold text-foreground">
                            Informações Extras
                        </h3>
                        <KeyValueContent
                            data={data.extra_info as Record<string, unknown>}
                        />
                    </Stack>
                )}

            {results?.processing_results && (
                <Accordion type="single" collapsible>
                    <AccordionItem value="processing-results" className="border-b-0">
                        <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-2">
                            Resultados do Processamento
                        </AccordionTrigger>
                        <AccordionContent>
                            <Stack direction="col" gap={4}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {[
                                        {
                                            label: "Adicionados",
                                            value:
                                                results.processing_results
                                                    .count__added,
                                            color: "text-green-600",
                                        },
                                        {
                                            label: "Atualizados",
                                            value:
                                                results.processing_results
                                                    .count__updated,
                                            color: "text-blue-600",
                                        },
                                        {
                                            label: "Sem Alteração",
                                            value:
                                                results.processing_results
                                                    .count__no_change,
                                            color: "text-gray-600",
                                        },
                                    ].map((result) => (
                                        <Stack key={result.label} direction="col">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {result.label}
                                            </p>
                                            <p
                                                className={`text-2xl font-bold ${result.color}`}
                                            >
                                                {result.value}
                                            </p>
                                        </Stack>
                                    ))}
                                </div>

                                {results.processing_results.details &&
                                    results.processing_results.details.length >
                                        0 && (
                                        <Stack direction="col" gap={2}>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Detalhes
                                            </p>
                                            <Stack direction="col" gap={2}>
                                                {results.processing_results.details.map(
                                                    (
                                                        detail: Record<
                                                            string,
                                                            unknown
                                                        >,
                                                        index: number,
                                                    ) => {
                                                        const detailKey = `detail-${index}-${Object.values(detail).join("-")}`;
                                                        return (
                                                            <Stack
                                                                key={detailKey}
                                                                className="border rounded-lg p-3"
                                                            >
                                                                <Stack className="grid grid-cols-4 gap-2">
                                                                    {Object.entries(
                                                                        detail,
                                                                    ).map(
                                                                        ([
                                                                            key,
                                                                            value,
                                                                        ]) => (
                                                                            <Stack
                                                                                key={
                                                                                    key
                                                                                }
                                                                                direction="col"
                                                                            >
                                                                                <p className="text-xs text-muted-foreground">
                                                                                    {formatDetailLabel(
                                                                                        key,
                                                                                        config?.labels,
                                                                                    )}
                                                                                </p>
                                                                                <p className="text-sm font-medium">
                                                                                    {formatDetailValue(
                                                                                        value,
                                                                                        key,
                                                                                        formatOptions,
                                                                                    )}
                                                                                </p>
                                                                            </Stack>
                                                                        ),
                                                                    )}
                                                                </Stack>
                                                            </Stack>
                                                        );
                                                    },
                                                )}
                                            </Stack>
                                        </Stack>
                                    )}
                            </Stack>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </Stack>
    );
}
