import type { ReactNode } from "react";
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
export declare const PumpwoodTable: {
    Root: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableElement> & import("react").RefAttributes<HTMLTableElement>>;
    Body: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
    Cell: import("react").ForwardRefExoticComponent<import("react").TdHTMLAttributes<HTMLTableCellElement> & import("react").RefAttributes<HTMLTableCellElement>>;
    Head: import("react").ForwardRefExoticComponent<import("react").ThHTMLAttributes<HTMLTableCellElement> & import("react").RefAttributes<HTMLTableCellElement>>;
    Header: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
    Row: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableRowElement> & import("react").RefAttributes<HTMLTableRowElement>>;
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
export declare function Table<T extends Record<string, unknown>>({ data, columns, getRowKey, ordering, onSort, onRowClick, isLoading, hasMore, onLoadMore, className, }: ITableProps<T>): import("react/jsx-runtime").JSX.Element;
