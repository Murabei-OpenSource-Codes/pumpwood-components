type PaginationProps = {
    startRecord: number;
    endRecord: number;
    hasValidSearchValues: boolean;
    tabCount: number;
    disabledLoadBackButton: boolean;
    disabledLoadMoreButton: boolean;
    loadBack: () => void;
    loadMore: () => void;
};
export declare const Pagination: ({ startRecord, endRecord, hasValidSearchValues, tabCount, disabledLoadBackButton, disabledLoadMoreButton, loadBack, loadMore, }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
export {};
