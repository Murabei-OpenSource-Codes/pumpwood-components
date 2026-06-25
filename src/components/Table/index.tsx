"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

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
    const isInitialLoading = Boolean(isLoading && data.length === 0);

    return (
        <div
            className={cn(
                "flex-1 overflow-auto mt-4",
                className,
            )}
        >
            {!isLoading && data.length === 0 ? (
                <div className="py-20">
                    <NoResult />
                </div>
            ) : (
                <TableRoot className="table-auto w-full">
                    <TableHeader
                        className={
                            "sticky top-0 bg-primary text-white z-10"
                        }
                    >
                        <HeaderRow
                            columns={columns}
                            ordering={ordering}
                            onSort={onSort}
                        />
                    </TableHeader>
                    <TableBody>
                        {isInitialLoading ? (
                            <TableSkeleton
                                columns={columns.map((column) => ({
                                    width: column.width,
                                    cellClassName: column.cellClassName,
                                }))}
                            />
                        ) : (
                            data.map((item) => (
                                <BodyRow
                                    key={getRowKey(item)}
                                    item={item}
                                    columns={columns}
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
                                    colSpan={columns.length}
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
            )}
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
    return (
        <TableRow>
            {columns.map((column) => {
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
    return (
        <TableRow
            className={cn(
                onClick ? "hover:bg-secondary cursor-pointer" : "",
            )}
            onClick={onClick}
        >
            {columns.map((column) => {
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
