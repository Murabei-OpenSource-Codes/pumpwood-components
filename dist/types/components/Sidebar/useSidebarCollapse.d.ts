export interface IUseSidebarCollapseOptions {
    initialCollapsed?: boolean;
    onPersist?: (collapsed: boolean) => void;
}
/**
 * Hook for sidebar collapse state with optional persistence callback.
 */
export declare function useSidebarCollapse({ initialCollapsed, onPersist, }?: IUseSidebarCollapseOptions): {
    isCollapsed: boolean;
    isCollapsing: boolean;
    expandedItems: Record<string, boolean>;
    setExpandedItems: import("react").Dispatch<import("react").SetStateAction<Record<string, boolean>>>;
    toggleCollapse: () => void;
    expand: () => void;
    handleTransitionEnd: () => void;
    toggleExpanded: (title: string) => void;
    setExpandedOnCollapse: () => void;
};
