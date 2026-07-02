import type { M2MListFn } from "../design-system/M2MTable";
export type ListWithoutPagFn = (modelClass: string, body?: Record<string, unknown>, queryParams?: Record<string, string>) => Promise<[
    Record<string, unknown>[] | null,
    {
        message?: string;
    } | null
]>;
export type CreateM2MListFnOptions = {
    orderBy?: string[];
};
/**
 * Creates a M2MListFn adapter over an injected list-without-pag function.
 */
export declare const createM2MListFn: (listWithoutPag: ListWithoutPagFn, options?: CreateM2MListFnOptions) => M2MListFn;
