import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Table as TableRoot,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TableSkeleton } from '@/components/TableSkeleton';

const meta = {
    title: 'Pumpwood/Components/TableSkeleton',
    component: TableSkeleton,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TableSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

const COLUMN_LAYOUT = [
    { width: 'w-[5rem]', cellClassName: 'px-2' },
    { width: 'w-auto', cellClassName: 'px-2' },
    { width: 'w-[10rem]', cellClassName: 'px-2' },
    { width: 'w-[10rem]', cellClassName: 'px-2' },
    { width: 'w-[15rem]', cellClassName: 'px-2' },
];

export const Primary: Story = {
    render: () => (
        <TableRoot className="table-fixed w-full">
            <TableHeader className="sticky top-0 bg-primary text-white">
                <TableRow>
                    <TableHead className="w-[5rem] px-2">Id</TableHead>
                    <TableHead className="px-2">Descrição</TableHead>
                    <TableHead className="w-[10rem] px-2">Status</TableHead>
                    <TableHead className="w-[10rem] px-2">Criado em</TableHead>
                    <TableHead className="w-[15rem] px-2">Usuário</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableSkeleton columns={COLUMN_LAYOUT} rows={5} />
            </TableBody>
        </TableRoot>
    ),
};

export const DefaultColumns: Story = {
    render: () => (
        <TableRoot className="table-fixed w-full">
            <TableHeader className="bg-primary text-white">
                <TableRow>
                    <TableHead>Col 1</TableHead>
                    <TableHead>Col 2</TableHead>
                    <TableHead>Col 3</TableHead>
                    <TableHead>Col 4</TableHead>
                    <TableHead>Col 5</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableSkeleton columns={5} rows={5} />
            </TableBody>
        </TableRoot>
    ),
};
