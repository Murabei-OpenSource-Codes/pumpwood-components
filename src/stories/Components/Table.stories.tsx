import type { Meta, StoryObj } from '@storybook/react-vite';
import { PumpwoodCard } from '@/components/Card';
import { PumpwoodTable } from '@/components/Table';
import { PumpwoodBadge } from '@/components/Badge';

const meta = {
    title: 'Pumpwood/Components/Table',
    component: PumpwoodTable.Root,
} satisfies Meta<typeof PumpwoodTable.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

// Mock Data
const MOCKED_DATA = [
    {
        id: 1,
        plant: "Solar Farm Alpha",
        inverter: "INV-001",
        radiance: "850 W/m²",
        power: "450 kW",
        status: "Normal",
        lastUpdate: "2024-05-20 10:30 AM",
    },
    {
        id: 2,
        plant: "Solar Farm Alpha",
        inverter: "INV-002",
        radiance: "845 W/m²",
        power: "448 kW",
        status: "Normal",
        lastUpdate: "2024-05-20 10:30 AM",
    },
    {
        id: 3,
        plant: "Solar Farm Beta",
        inverter: "INV-B01",
        radiance: "600 W/m²",
        power: "200 kW",
        status: "Warning",
        lastUpdate: "2024-05-20 10:35 AM",
    },
    {
        id: 4,
        plant: "Solar Farm Beta",
        inverter: "INV-B02",
        radiance: "610 W/m²",
        power: "310 kW",
        status: "Normal",
        lastUpdate: "2024-05-20 10:35 AM",
    },
    {
        id: 5,
        plant: "Solar Farm Gamma",
        inverter: "INV-G01",
        radiance: "920 W/m²",
        power: "500 kW",
        status: "Normal",
        lastUpdate: "2024-05-20 10:40 AM",
    },
    {
        id: 6,
        plant: "Solar Farm Gamma",
        inverter: "INV-G02",
        radiance: "915 W/m²",
        power: "0 kW",
        status: "Error",
        lastUpdate: "2024-05-20 10:40 AM",
    },
];

export const Primary: Story = {
    args: {
        children: (
            <PumpwoodTable.Root>
                <PumpwoodTable.Header>
                    <PumpwoodTable.Row>
                        <PumpwoodTable.Head>Planta</PumpwoodTable.Head>
                        <PumpwoodTable.Head>Inversor</PumpwoodTable.Head>
                        <PumpwoodTable.Head>Radiância</PumpwoodTable.Head>
                        <PumpwoodTable.Head>Potência Gerada</PumpwoodTable.Head>
                        <PumpwoodTable.Head>Status</PumpwoodTable.Head>
                        <PumpwoodTable.Head className="text-right">Última Atualização</PumpwoodTable.Head>
                    </PumpwoodTable.Row>
                </PumpwoodTable.Header>
                <PumpwoodTable.Body>
                    {MOCKED_DATA.map((row) => (
                        <PumpwoodTable.Row key={row.id}>
                            <PumpwoodTable.Cell className="font-medium">{row.plant}</PumpwoodTable.Cell>
                            <PumpwoodTable.Cell>{row.inverter}</PumpwoodTable.Cell>
                            <PumpwoodTable.Cell>{row.radiance}</PumpwoodTable.Cell>
                            <PumpwoodTable.Cell>{row.power}</PumpwoodTable.Cell>
                            <PumpwoodTable.Cell>
                                <PumpwoodBadge
                                    variant={
                                        row.status === "Normal"
                                            ? "secondary"
                                            : row.status === "Warning"
                                                ? "warning"
                                                : "destructive"
                                    }
                                >
                                    {row.status}
                                </PumpwoodBadge>
                            </PumpwoodTable.Cell>
                            <PumpwoodTable.Cell className="text-right">{row.lastUpdate}</PumpwoodTable.Cell>
                        </PumpwoodTable.Row>
                    ))}
                </PumpwoodTable.Body>
            </PumpwoodTable.Root>
        )
    }
}
