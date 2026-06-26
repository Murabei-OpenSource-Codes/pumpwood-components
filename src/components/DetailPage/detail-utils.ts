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
    booleanLabels?: { true: string; false: string };
}

const DEFAULT_LABELS: Record<string, string> = {
    created_at: "Criado em",
    start_processing_at: "Início do Processamento",
    finished_processing_at: "Fim do Processamento",
    field_delimiter: "Delimitador de Campo",
    decimal_delimiter: "Delimitador Decimal",
    ignore_locked: "Ignorar Bloqueados",
    lock_data: "Bloquear Dados",
    origin: "Origem",
    format_type: "Tipo de Formato",
    process_status: "Status",
    description: "Descrição",
    row_permission: "Row Permission",
    created_by: "Created By",
    modeling_unit: "Modeling Unit",
    attribute: "Attribute",
    geoarea: "Geoarea",
};

const defaultFormatDate = (date: string): string => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatDetailLabel = (
    key: string,
    labels?: Record<string, string>,
): string => {
    const mergedLabels = { ...DEFAULT_LABELS, ...labels };
    return (
        mergedLabels[key] ||
        key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );
};

export const formatDetailValue = (
    value: unknown,
    key: string,
    options: IFormatDetailValueOptions = {},
): string => {
    if (value === null || value === undefined || value === "") {
        return "N/A";
    }

    if (key === "process_status" && options.statusLabels) {
        return options.statusLabels[String(value)] ?? String(value);
    }

    if (
        key.endsWith("_at") ||
        key.includes("date") ||
        key.includes("_time")
    ) {
        const formatDateFn = options.formatDate ?? defaultFormatDate;
        return formatDateFn(String(value)) || "N/A";
    }

    if (typeof value === "boolean") {
        const labels = options.booleanLabels ?? { true: "Sim", false: "Não" };
        return value ? labels.true : labels.false;
    }

    if (typeof value === "object") {
        return "N/A";
    }

    return String(value);
};

export const getDetailFieldValue = (
    data: Record<string, unknown>,
    key: string,
): unknown => {
    const fieldValue = data[key];
    if (
        fieldValue &&
        typeof fieldValue === "object" &&
        fieldValue !== null &&
        "__display_field__" in fieldValue
    ) {
        return (fieldValue as { __display_field__: unknown }).__display_field__;
    }
    return fieldValue;
};

export const FULL_WIDTH_DETAIL_FIELDS = ["description", "notes"];
