import { EmptyContainer } from "@/components/EmptyContainer";

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
export function NoResult({
    title = "Nenhum resultado",
    description = "Nenhum dado encontrado.",
}: INoResultProps) {
    return (
        <EmptyContainer
            title={title}
            description={description}
        />
    );
}
