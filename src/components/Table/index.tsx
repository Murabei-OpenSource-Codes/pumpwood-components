"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { type ReactNode, useCallback, useRef } from "react";

import { NoResult } from "@/components/NoResult";
import { TableSkeleton } from "@/components/TableSkeleton";
import Stack from "@/components/Stack";
import { Button } from "@/components/ui/button";
import {
    Table as TableRoot,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * Column definition for Table.
 */
export interface ITableColumn<T> {
    /** Row field key used to read cell value. */
    key: keyof T & string;
    /** Header label. */
    label: string;
    /** Tailwind width classes for head and cell. */
    width?: string;
    /** Extra classes for the header cell. */
    className?: string;
    /** Extra classes for the body cell. */
    cellClassName?: string;
    /** Whether the column supports sorting. */
    sortable?: boolean;
    /** Custom cell renderer. */
    render?: (value: unknown, row: T) => ReactNode;
}

/**
 * Props for the Table component.
 */
export interface ITableProps<T> {
    /** Rows to display. */
    data: T[];
    /** Column configuration. */
    columns: ITableColumn<T>[];
    /** Returns a stable key for each row. */
    getRowKey: (row: T) => string | number;
    /** Current sort field; prefix with '-' for descending. */
    ordering?: string;
    /** Called when a sortable column header is clicked. */
    onSort?: (columnKey: string) => void;
    /** Called when a row is clicked. */
    onRowClick?: (row: T) => void;
    /** Whether a data request is in progress. */
    isLoading?: boolean;
    /** Whether more rows can be loaded. */
    hasMore?: boolean;
    /** Called when the load-more button is clicked. */
    onLoadMore?: () => void;
    /** Extra classes for the scroll wrapper. */
    className?: string;
}

const TABLE_LAYOUT_CLASS = "table-auto w-full min-w-max";
const ROOT_SCROLL_OVERRIDE = "[&>div]:overflow-visible";

/**
 * A comprehensive Table component system.
 *
 * @example
 * ```tsx
 * <PumpwoodTable.Root>
 *   <PumpwoodTable.Header>
 *     <PumpwoodTable.Row>
 *       <PumpwoodTable.Head>ID</PumpwoodTable.Head>
 *       <PumpwoodTable.Head>Name</PumpwoodTable.Head>
 *     </PumpwoodTable.Row>
 *   </PumpwoodTable.Header>
 *   <PumpwoodTable.Body>
 *     <PumpwoodTable.Row>
 *       <PumpwoodTable.Cell>1</PumpwoodTable.Cell>
 *       <PumpwoodTable.Cell>John Doe</PumpwoodTable.Cell>
 *     </PumpwoodTable.Row>
 *   </PumpwoodTable.Body>
 * </PumpwoodTable.Root>
 * ```
 */
export const PumpwoodTable = {
    Root: TableRoot,
    Body: TableBody,
    Cell: TableCell,
    Head: TableHead,
    Header: TableHeader,
    Row: TableRow,
};

/**
 * Generic data table with loading, empty, sort, and load-more states.
 *
 * @example
 * ```tsx
 * <Table
 *   data={items}
 *   columns={columns}
 *   getRowKey={(row) => row.pk}
 *   ordering={ordering}
 *   onSort={handleSort}
 *   isLoading={isLoading}
 *   hasMore={hasMore}
 *   onLoadMore={handleLoadMore}
 * />
 * ```
 */
export function Table<T extends Record<string, unknown>>({
    data,
    columns,
    getRowKey,
    ordering,
    onSort,
    onRowClick,
    isLoading,
    hasMore,
    onLoadMore,
    className,
}: ITableProps<T>) {
    const headerScrollRef = useRef<HTMLDivElement>(null);
    const bodyScrollRef = useRef<HTMLDivElement>(null);
    const isInitialLoading = Boolean(isLoading && data.length === 0);
    const safeColumns = columns ?? [];

    const handleBodyScroll = useCallback(() => {
        if (!headerScrollRef.current || !bodyScrollRef.current) {
            return;
        }

        headerScrollRef.current.scrollLeft =
            bodyScrollRef.current.scrollLeft;
    }, []);

    if (!isLoading && data.length === 0) {
        return (
            <div className={cn("flex-1 mt-4", className)}>
                <div className="py-20">
                    <NoResult />
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-1 min-h-0 flex-col mt-4", className)}>
            <div
                ref={headerScrollRef}
                className={cn(
                    "shrink-0 overflow-x-auto overflow-y-hidden",
                    "[scrollbar-width:none] [-ms-overflow-style:none]",
                    "[&::-webkit-scrollbar]:hidden",
                    ROOT_SCROLL_OVERRIDE,
                )}
            >
                <TableRoot className={TABLE_LAYOUT_CLASS}>
                    <TableHeader className="bg-primary text-white">
                        <HeaderRow
                            columns={safeColumns}
                            ordering={ordering}
                            onSort={onSort}
                        />
                    </TableHeader>
                </TableRoot>
            </div>

            <div
                ref={bodyScrollRef}
                onScroll={handleBodyScroll}
                className={cn(
                    "flex-1 min-h-0 overflow-auto",
                    ROOT_SCROLL_OVERRIDE,
                )}
            >
                <TableRoot className={TABLE_LAYOUT_CLASS}>
                    <TableBody>
                        {isInitialLoading ? (
                            <TableSkeleton
                                columns={safeColumns.map((column) => ({
                                    width: column.width,
                                    cellClassName: column.cellClassName,
                                }))}
                            />
                        ) : (
                            data.map((item) => (
                                <BodyRow
                                    key={getRowKey(item)}
                                    item={item}
                                    columns={safeColumns}
                                    onClick={
                                        onRowClick
                                            ? () => onRowClick(item)
                                            : undefined
                                    }
                                />
                            ))
                        )}
                        {hasMore && onLoadMore && !isInitialLoading && (
                            <TableRow>
                                <TableCell
                                    colSpan={safeColumns.length}
                                    className="text-center py-6"
                                >
                                    <Button
                                        onClick={onLoadMore}
                                        disabled={isLoading}
                                        variant="outline"
                                    >
                                        {isLoading
                                            ? "Carregando..."
                                            : "Carregar Mais"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    );
}

function HeaderRow<T extends Record<string, unknown>>({
    columns,
    ordering,
    onSort,
}: {
    columns: ITableColumn<T>[];
    ordering?: string;
    onSort?: (columnKey: string) => void;
}) {
    const safeColumns = columns ?? [];

    return (
        <TableRow>
            {safeColumns.map((column) => {
                const isSortable = Boolean(column.sortable);
                const isActiveAsc = ordering === column.key;
                const isActiveDesc = ordering === "-".concat(column.key);
                const isActive = isActiveAsc || isActiveDesc;

                return (
                    <TableHead
                        key={column.key}
                        className={cn(
                            column.width,
                            column.className,
                            isSortable ? "cursor-pointer" : "",
                        )}
                        onClick={
                            isSortable && onSort
                                ? () => onSort(column.key)
                                : undefined
                        }
                    >
                        <Stack direction="row" gap={1}>
                            {column.label}
                            {isSortable && isActive && (
                                isActiveAsc ? (
                                    <ArrowUp size={16} />
                                ) : (
                                    <ArrowDown size={16} />
                                )
                            )}
                        </Stack>
                    </TableHead>
                );
            })}
        </TableRow>
    );
}

function BodyRow<T extends Record<string, unknown>>({
    item,
    columns,
    onClick,
}: {
    item: T;
    columns: ITableColumn<T>[];
    onClick?: () => void;
}) {
    const safeColumns = columns ?? [];

    return (
        <TableRow
            className={cn(
                onClick ? "hover:bg-secondary cursor-pointer" : "",
            )}
            onClick={onClick}
        >
            {safeColumns.map((column) => {
                const value = item[column.key];

                return (
                    <TableCell
                        key={column.key}
                        className={cn(
                            column.width,
                            column.cellClassName,
                        )}
                    >
                        {column.render
                            ? column.render(value, item)
                            : String(value ?? "N/D")}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}
