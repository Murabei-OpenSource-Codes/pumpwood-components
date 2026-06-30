import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ITableSkeletonColumn {
    /** Tailwind width classes matching the table column. */
    width?: string;
    /** Extra classes for the skeleton cell. */
    cellClassName?: string;
}

export interface ITableSkeletonProps {
    /** Column layout or column count. */
    columns: ITableSkeletonColumn[] | number;
    /** Number of skeleton rows. Defaults to 5. */
    rows?: number;
}

function normalizeColumns(
    columns: ITableSkeletonColumn[] | number,
): ITableSkeletonColumn[] {
    if (typeof columns === "number") {
        return Array.from({ length: columns }, () => ({}));
    }
    return columns;
}

/**
 * Skeleton rows rendered inside TableBody while data is loading.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableSkeleton columns={columns} rows={5} />
 * </TableBody>
 * ```
 */
export function TableSkeleton({
    columns,
    rows = 5,
}: ITableSkeletonProps) {
    const columnDefs = normalizeColumns(columns);
    const rowKeys = Array.from(
        { length: rows },
        (_, index) => "row-".concat(String(index)),
    );

    return (
        <>
            {rowKeys.map((rowKey) => (
                <TableRow key={rowKey}>
                    {columnDefs.map((column, index) => (
                        <TableCell
                            key={rowKey.concat(
                                "-col-",
                                String(index),
                            )}
                            className={cn(
                                column.width,
                                column.cellClassName,
                                "px-2 py-2",
                            )}
                        >
                            <Skeleton className="block h-4 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}
