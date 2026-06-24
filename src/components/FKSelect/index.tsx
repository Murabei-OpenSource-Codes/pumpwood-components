"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Combobox, type ComboboxItem } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

/**
 * Parameters passed to the FK fetcher function.
 */
export type FKFetcherParams = {
    search: string;
    modelClass: string;
    labelName: string;
    additionalFilters?: Record<string, any>;
    fields?: string[];
    limit?: number;
    offset?: number;
};

/**
 * Props for the FKSelect component.
 */
export interface IFKSelectProps {
    /** Optional id used as data-testid on the trigger. */
    id?: string;
    /** Function to fetch data from the API. */
    fetcher: (params: FKFetcherParams) => Promise<any[]>;
    /** Optional function to resolve a value not present in the list. */
    resolveValue?: (params: {
        modelClass: string;
        value: string | number;
    }) => Promise<any>;
    /** The model class name to identify the resource. */
    modelClass: string;
    /** The field name to use as the display label. */
    labelName: string;
    /** The field name to use as the value (ID). Defaults to 'pk'. */
    valueField?: string;
    /** Placeholder text for the search input. */
    placeholder?: string;
    /** Message to show when no items are found. */
    emptyMessage?: string;
    /** The currently selected value. */
    value: string | number | null;
    /** Callback when an item is selected. */
    onChange: (value: string | number, item?: any) => void;
    /** Additional filters to apply to the API request. */
    additionalFilters?: Record<string, any>;
    /** Extra fields to include in search. */
    fields?: string[];
    /** Optional class names for the wrapper. */
    className?: string;
    /** Debounce time in ms. Defaults to 300. */
    debounceWait?: number;
}

const EMPTY_ADDITIONAL_FILTERS: Record<string, any> = {};

const formatItems = (
    data: any[],
    labelName: string,
    valueField: string,
): ComboboxItem[] => {
    return data.map((item) => ({
        value: item[valueField] ?? item.id ?? item.pk,
        label: String(item[labelName] ?? item.name ?? item.pk ?? ""),
        ...item,
    }));
};

/**
 * A foreign key select component (async combobox).
 *
 * @example
 * ```tsx
 * <FKSelect
 *   fetcher={fetchData}
 *   modelClass="User"
 *   labelName="username"
 *   value={userId}
 *   onChange={setUserId}
 * />
 * ```
 */
export const FKSelect = ({
    id,
    fetcher,
    resolveValue,
    modelClass,
    labelName,
    valueField = "pk",
    placeholder = "Select item...",
    emptyMessage = "No items found",
    value,
    onChange,
    additionalFilters = EMPTY_ADDITIONAL_FILTERS,
    fields,
    className,
    debounceWait = 300,
}: IFKSelectProps) => {
    const resolvedAdditionalFilters = useMemo(
        () => additionalFilters ?? EMPTY_ADDITIONAL_FILTERS,
        [additionalFilters],
    );
    const [items, setItems] = useState<ComboboxItem[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayLabel, setDisplayLabel] = useState<string | undefined>();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, debounceWait);

        return () => clearTimeout(timer);
    }, [searchValue, debounceWait]);

    const loadItems = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetcher({
                search: debouncedSearch,
                modelClass,
                labelName,
                additionalFilters: resolvedAdditionalFilters,
                fields,
            });
            setItems(formatItems(data, labelName, valueField));
        } catch (err) {
            console.error("FKSelect fetch error:", err);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [
        fetcher,
        debouncedSearch,
        modelClass,
        labelName,
        resolvedAdditionalFilters,
        fields,
        valueField,
    ]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    const selectedLabel = items.find(
        (item) => String(item.value) === String(value),
    )?.label;

    useEffect(() => {
        if (!value) {
            setDisplayLabel(undefined);
            return;
        }

        if (selectedLabel) {
            setDisplayLabel(selectedLabel);
            return;
        }

        if (!resolveValue) {
            setDisplayLabel(undefined);
            return;
        }

        let active = true;

        resolveValue({ modelClass, value })
            .then((result) => {
                if (!active || !result) {
                    return;
                }

                const label = String(
                    result[labelName] ?? result.name ?? value,
                );
                setDisplayLabel(label);
            })
            .catch((err) => {
                console.error("FKSelect resolve error:", err);
            });

        return () => {
            active = false;
        };
    }, [value, selectedLabel, resolveValue, modelClass, labelName]);

    const handleChange = (
        selectedValue: string,
        item: ComboboxItem | null,
    ) => {
        if (!item) {
            return;
        }

        onChange(selectedValue, item);
    };

    return (
        <div
            data-testid={id}
            className={cn("inline-flex w-fit shrink-0", className)}
        >
            <Combobox
                items={items}
                placeholder={placeholder}
                emptyMessage={emptyMessage}
                value={value ? String(value) : null}
                onChange={handleChange}
                onSearchChange={setSearchValue}
                filterLocally={false}
                loading={loading}
                displayLabel={displayLabel}
                className="w-full"
            />
        </div>
    );
};
