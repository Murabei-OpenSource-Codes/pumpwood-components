import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { BadgeInfo } from "lucide-react";

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
export function EmptyContainer({ title, description }: EmptyContainerProps) {
    return (
        <Empty>
            <EmptyHeader className="pw:w-[250px]">
                <EmptyMedia>
                    <BadgeInfo />
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>
                    {description}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
