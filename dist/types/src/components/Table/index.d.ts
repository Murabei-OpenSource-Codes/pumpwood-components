/**
 * A comprehensive Table component system.
 *
 * @example
 * ```tsx
 * <Table.Root>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.Head>ID</Table.Head>
 *       <Table.Head>Name</Table.Head>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>1</Table.Cell>
 *       <Table.Cell>John Doe</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table.Root>
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
