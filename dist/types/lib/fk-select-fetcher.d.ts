import type { FKFetcherParams } from "../components/FKSelect";
export type DynamicListFn = (modelClass: string, filterDict: Record<string, unknown>, searchFields?: string[]) => Promise<[
    Record<string, unknown>[] | null,
    {
        message: string;
    } | null
]>;
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
export declare const fkSelectFetcher: (dynamicList: DynamicListFn, { search, modelClass, labelName, additionalFilters, fields, }: FKSelectFetcherParams) => Promise<Record<string, unknown>[]>;
/**
 * Creates a stable fetcher function for FKSelect.
 */
export declare const createFKSelectFetcher: (dynamicList: DynamicListFn, labelName: string, options?: CreateFKSelectFetcherOptions) => (params: FKFetcherParams) => Promise<Record<string, unknown>[]>;
