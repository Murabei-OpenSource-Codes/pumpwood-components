export interface INoResultProps {
    /** Title shown in the empty state. */
    title?: string;
    /** Description shown in the empty state. */
    description?: string;
}
/**
 * Default empty state for tables and lists with no data.
 *
 * @example
 * ```tsx
 * <NoResult />
 * ```
 */
export declare function NoResult({ title, description, }: INoResultProps): import("react/jsx-runtime").JSX.Element;
