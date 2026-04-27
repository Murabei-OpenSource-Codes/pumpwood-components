export interface EmptyContainerProps {
    title: string;
    description: string;
}
/**
 * A container to display an empty state.
 *
 * @example
 * ```tsx
 * <EmptyContainer
 *   title="No Data"
 *   description="There are no items to display at this time."
 * />
 * ```
 */
export declare function EmptyContainer({ title, description }: EmptyContainerProps): import("react/jsx-runtime").JSX.Element;
