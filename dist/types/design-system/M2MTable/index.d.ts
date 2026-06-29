import { type ComponentPropsWithoutRef } from "react";
import { type FKFetcherParams } from "@components/FKSelect";
export type M2MListFn = (modelClass: string, filterDict: Record<string, any>, fields: string[]) => Promise<[
    Record<string, any>[] | null,
    {
        message?: string;
    } | null
]>;
export declare const M2MCreateDialog: ({ open, onOpenChange, targetModelClass, relationName, handleCreateNew, mutate, fkFetcher, }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    targetModelClass: string;
    relationName: string;
    handleCreateNew: (id: string) => void;
    mutate: () => void;
    fkFetcher: (params: FKFetcherParams) => Promise<any[]>;
}) => import("react/jsx-runtime").JSX.Element;
interface IM2MTableProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
    modelClass: string;
    targetModelClass: string;
    filterDict: Record<string, any>;
    targetField: string;
    relationName: string;
    displayFields: {
        name: string;
        field: string;
    }[];
    handleCreateNew: (id: string) => void;
    handleDeleteItem: (id: string) => void;
    fields: string[];
    listFn: M2MListFn;
    fkFetcher: (params: FKFetcherParams) => Promise<any[]>;
}
export declare const M2MTable: ({ modelClass, targetModelClass, targetField, filterDict, relationName, fields, displayFields, handleCreateNew, handleDeleteItem, listFn, fkFetcher, }: IM2MTableProps) => import("react/jsx-runtime").JSX.Element;
export {};
