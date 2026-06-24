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
export declare function TableSkeleton({ columns, rows, }: ITableSkeletonProps): import("react/jsx-runtime").JSX.Element;
