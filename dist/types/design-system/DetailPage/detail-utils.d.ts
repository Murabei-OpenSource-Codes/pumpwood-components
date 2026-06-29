export interface IDetailSection {
    title: string;
    fields: string[];
    cols?: 2 | 3 | 4;
    isFullWidth?: boolean;
}
export interface IDetailFieldConfig {
    exclude?: string[];
    labels?: Record<string, string>;
    formatters?: Record<string, (value: unknown) => string>;
    sections?: IDetailSection[];
}
export interface IFormatDetailValueOptions {
    statusLabels?: Record<string, string>;
    formatDate?: (date: string) => string;
    booleanLabels?: {
        true: string;
        false: string;
    };
}
export declare const formatDetailLabel: (key: string, labels?: Record<string, string>) => string;
export declare const formatDetailValue: (value: unknown, key: string, options?: IFormatDetailValueOptions) => string;
export declare const getDetailFieldValue: (data: Record<string, unknown>, key: string) => unknown;
export declare const FULL_WIDTH_DETAIL_FIELDS: string[];
