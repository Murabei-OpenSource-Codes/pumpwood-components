import type * as React from "react";
/**
 * Interface representing a form field specification
 */
export interface IFormField {
    type: "text" | "number" | "password" | "email" | "textarea" | "checkbox" | "select" | "date" | "key-value";
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: {
        label: string;
        value: string;
    }[];
    className?: string;
    cols?: 1 | 2 | 3 | 4;
}
/**
 * Custom section grouping configuration similar to AutoDetailContent
 */
export interface IFormSection {
    title: string;
    fields: string[];
    cols?: 1 | 2 | 3 | 4;
    isFullWidth?: boolean;
}
export interface IAutoFormContentProps {
    fields: Record<string, IFormField>;
    values?: Record<string, any>;
    defaultValue?: Record<string, any>;
    onChange?: (values: Record<string, any>) => void;
    errors?: Record<string, string>;
    config?: {
        exclude?: string[];
        labels?: Record<string, string>;
        sections?: IFormSection[];
    };
    customFields?: Record<string, (props: {
        value: any;
        onChange: (val: any) => void;
        error?: string;
        disabled?: boolean;
        fieldKey: string;
    }) => React.ReactNode>;
}
export declare function AutoFormContent({ fields, values: externalValues, defaultValue, onChange, errors, config, customFields, }: IAutoFormContentProps): import("react/jsx-runtime").JSX.Element;
