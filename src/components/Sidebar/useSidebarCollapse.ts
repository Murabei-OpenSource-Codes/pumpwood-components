import { useCallback, useState } from "react";

export interface IUseSidebarCollapseOptions {
    initialCollapsed?: boolean;
    onPersist?: (collapsed: boolean) => void;
}

/**
 * Hook for sidebar collapse state with optional persistence callback.
 */
export function useSidebarCollapse({
    initialCollapsed = false,
    onPersist,
}: IUseSidebarCollapseOptions = {}) {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    const [isCollapsing, setIsCollapsing] = useState(false);

    const toggleCollapse = useCallback(() => {
        setIsCollapsing(true);
        setIsCollapsed((prev) => {
            const next = !prev;
            onPersist?.(next);
            return next;
        });
    }, [onPersist]);

    const expand = useCallback(() => {
        setIsCollapsing(true);
        setIsCollapsed(false);
        onPersist?.(false);
    }, [onPersist]);

    const handleTransitionEnd = useCallback(() => {
        setIsCollapsing(false);
    }, []);

    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
        {},
    );

    const toggleExpanded = useCallback(
        (title: string) => {
            if (isCollapsed) {
                expand();
                setExpandedItems({ [title]: true });
                return;
            }

            setExpandedItems((prev) => ({
                ...prev,
                [title]: !prev[title],
            }));
        },
        [isCollapsed, expand],
    );

    const setExpandedOnCollapse = useCallback(() => {
        setExpandedItems({});
    }, []);

    return {
        isCollapsed,
        isCollapsing,
        expandedItems,
        setExpandedItems,
        toggleCollapse,
        expand,
        handleTransitionEnd,
        toggleExpanded,
        setExpandedOnCollapse,
    };
}
