import type { FKFetcherParams } from "../components/FKSelect";

export type DynamicListFn = (
    modelClass: string,
    filterDict: Record<string, unknown>,
    searchFields?: string[],
) => Promise<
    [Record<string, unknown>[] | null, { message: string } | null]
>;

export type FKSelectFetcherParams = {
    search: string;
    modelClass: string;
    labelName: string;
    additionalFilters?: Record<string, unknown>;
    fields?: string[];
};

export type CreateFKSelectFetcherOptions = {
    additionalFilters?: Record<string, unknown>;
    fields?: string[];
};

/**
 * Fetches FK select options via an injected dynamicList function.
 */
export const fkSelectFetcher = async (
    dynamicList: DynamicListFn,
    {
        search,
        modelClass,
        labelName,
        additionalFilters = {},
        fields,
    }: FKSelectFetcherParams,
): Promise<Record<string, unknown>[]> => {
    const searchFilter = search
        ? { [`${labelName}__icontains`]: search }
        : {};
    const combinedFilters = { ...searchFilter, ...additionalFilters };
    const searchFields = !fields?.length ? [] : [labelName, ...fields];

    const [result, error] = await dynamicList(
        modelClass,
        combinedFilters,
        searchFields,
    );

    if (error) {
        throw new Error(error.message);
    }

    return result ?? [];
};

/**
 * Creates a stable fetcher function for FKSelect.
 */
export const createFKSelectFetcher = (
    dynamicList: DynamicListFn,
    labelName: string,
    options: CreateFKSelectFetcherOptions = {},
) => {
    return (params: FKFetcherParams) =>
        fkSelectFetcher(dynamicList, {
            ...params,
            labelName,
            additionalFilters: options.additionalFilters,
            fields: options.fields,
        });
};
