import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
export const PumpwoodTable = {
    Root: Table,
    Body: TableBody,
    Cell: TableCell,
    Head: TableHead,
    Header: TableHeader,
    Row: TableRow,
}