import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { format } from 'date-fns';
import { PumpwoodBadge } from '@/components/Badge';
import {
    Table,
    PumpwoodTable,
    type ITableColumn,
} from '@/components/Table';

const meta = {
    title: 'Pumpwood/Components/Table',
    component: Table,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

type MockRow = {
    pk: number;
    description: string;
    process_status: string;
    created_at: string;
    created_by: string;
};

const MOCK_ROWS: MockRow[] = [
    {
        pk: 1,
        description: 'Lote de importação A',
        process_status: 'finished',
        created_at: '2024-05-20T10:30:00Z',
        created_by: 'admin',
    },
    {
        pk: 2,
        description: 'Lote de importação B',
        process_status: 'processing',
        created_at: '2024-05-21T14:15:00Z',
        created_by: 'jdoe',
    },
    {
        pk: 3,
        description: 'Lote de importação C',
        process_status: 'error',
        created_at: '2024-05-22T09:00:00Z',
        created_by: 'guest',
    },
];

const STATUS_LABELS: Record<string, string> = {
    finished: 'Concluído',
    processing: 'Processando',
    error: 'Erro',
};

const COLUMNS: ITableColumn<MockRow>[] = [
    {
        key: 'pk',
        label: 'Id',
        width: 'w-[5rem] min-w-[6rem]',
        className: 'px-2 py-4 text-left',
        cellClassName: 'px-2 py-2 text-left',
        render: (value) => (
            <span className="text-xs">{String(value ?? 'N/D')}</span>
        ),
    },
    {
        key: 'description',
        label: 'Descrição',
        width: 'w-auto',
        className: 'px-2 py-4',
        cellClassName: 'px-2 py-2',
        render: (value) => (
            <span className="text-xs">{String(value || 'N/D')}</span>
        ),
    },
    {
        key: 'process_status',
        label: 'Status',
        width: 'w-[10rem] min-w-[10rem]',
        className: 'px-2 py-4',
        cellClassName: 'px-2 py-2',
        render: (value) => {
            const status = String(value ?? '');
            if (!status) {
                return 'N/D';
            }
            return (
                <PumpwoodBadge
                    variant={
                        status === 'finished'
                            ? 'secondary'
                            : status === 'processing'
                                ? 'warning'
                                : 'destructive'
                    }
                >
                    {STATUS_LABELS[status] ?? status}
                </PumpwoodBadge>
            );
        },
    },
    {
        key: 'created_at',
        label: 'Criado em',
        width: 'w-[10rem]',
        className: 'px-2 py-4',
        cellClassName: 'px-2 py-2',
        sortable: true,
        render: (value) => (
            <span className="text-xs">
                {value
                    ? format(new Date(String(value)), 'PPp')
                    : 'N/D'}
            </span>
        ),
    },
    {
        key: 'created_by',
        label: 'Usuário',
        width: 'w-[15rem]',
        className: 'px-2 py-4',
        cellClassName: 'px-2 py-2',
        render: (value) => (
            <span className="text-xs">{String(value ?? 'N/D')}</span>
        ),
    },
];

export const Primary: Story = {
    args: {
        data: MOCK_ROWS,
        columns: COLUMNS,
        getRowKey: (row) => row.pk,
    },
};

export const Loading: Story = {
    args: {
        data: [],
        columns: COLUMNS,
        getRowKey: (row) => row.pk,
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns: COLUMNS,
        getRowKey: (row) => row.pk,
        isLoading: false,
    },
};

export const Sortable: Story = {
    render: () => {
        const [ordering, setOrdering] = useState('created_at');

        return (
            <Table
                data={MOCK_ROWS}
                columns={COLUMNS}
                getRowKey={(row) => row.pk}
                ordering={ordering}
                onSort={(columnKey) => {
                    setOrdering((current) => {
                        if (current === columnKey) {
                            return '-'.concat(columnKey);
                        }
                        if (current === '-'.concat(columnKey)) {
                            return columnKey;
                        }
                        return columnKey;
                    });
                }}
            />
        );
    },
};

export const LoadMore: Story = {
    render: () => {
        const [data, setData] = useState(MOCK_ROWS.slice(0, 2));
        const [isLoading, setIsLoading] = useState(false);
        const hasMore = data.length < MOCK_ROWS.length;

        const handleLoadMore = () => {
            setIsLoading(true);
            setTimeout(() => {
                setData(MOCK_ROWS.slice(0, data.length + 1));
                setIsLoading(false);
            }, 800);
        };

        return (
            <Table
                data={data}
                columns={COLUMNS}
                getRowKey={(row) => row.pk}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
            />
        );
    },
};

export const ClickableRows: Story = {
    args: {
        data: MOCK_ROWS,
        columns: COLUMNS,
        getRowKey: (row) => row.pk,
        onRowClick: fn(),
    },
};

const COMPOUND_DATA = [
    {
        id: 1,
        plant: 'Solar Farm Alpha',
        inverter: 'INV-001',
        radiance: '850 W/m²',
        power: '450 kW',
        status: 'Normal',
        lastUpdate: '2024-05-20 10:30 AM',
    },
    {
        id: 2,
        plant: 'Solar Farm Beta',
        inverter: 'INV-B02',
        radiance: '610 W/m²',
        power: '310 kW',
        status: 'Normal',
        lastUpdate: '2024-05-20 10:35 AM',
    },
];

export const Compound: Story = {
    render: () => (
        <PumpwoodTable.Root>
            <PumpwoodTable.Header>
                <PumpwoodTable.Row>
                    <PumpwoodTable.Head>Planta</PumpwoodTable.Head>
                    <PumpwoodTable.Head>Inversor</PumpwoodTable.Head>
                    <PumpwoodTable.Head>Radiância</PumpwoodTable.Head>
                    <PumpwoodTable.Head>Potência Gerada</PumpwoodTable.Head>
                    <PumpwoodTable.Head>Status</PumpwoodTable.Head>
                    <PumpwoodTable.Head className="text-right">
                        Última Atualização
                    </PumpwoodTable.Head>
                </PumpwoodTable.Row>
            </PumpwoodTable.Header>
            <PumpwoodTable.Body>
                {COMPOUND_DATA.map((row) => (
                    <PumpwoodTable.Row key={row.id}>
                        <PumpwoodTable.Cell className="font-medium">
                            {row.plant}
                        </PumpwoodTable.Cell>
                        <PumpwoodTable.Cell>{row.inverter}</PumpwoodTable.Cell>
                        <PumpwoodTable.Cell>{row.radiance}</PumpwoodTable.Cell>
                        <PumpwoodTable.Cell>{row.power}</PumpwoodTable.Cell>
                        <PumpwoodTable.Cell>
                            <PumpwoodBadge variant="secondary">
                                {row.status}
                            </PumpwoodBadge>
                        </PumpwoodTable.Cell>
                        <PumpwoodTable.Cell className="text-right">
                            {row.lastUpdate}
                        </PumpwoodTable.Cell>
                    </PumpwoodTable.Row>
                ))}
            </PumpwoodTable.Body>
        </PumpwoodTable.Root>
    ),
};
