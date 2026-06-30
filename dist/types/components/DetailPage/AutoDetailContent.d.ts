import type { ReactNode } from "react";
import { type IDetailFieldConfig } from "./detail-utils";
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
/**
 * Auto-render entity detail fields in configurable sections.
 */
export declare function AutoDetailContent({ data, config, formatters, wrapperElements, statusLabels, formatDate, }: IAutoDetailContentProps): import("react/jsx-runtime").JSX.Element;
