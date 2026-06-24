import type { Meta, StoryObj } from '@storybook/react-vite';
import { NoResult } from '@/components/NoResult';

const meta = {
    title: 'Pumpwood/Components/NoResult',
    component: NoResult,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NoResult>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Custom: Story = {
    args: {
        title: 'Nada por aqui',
        description: 'Tente ajustar os filtros e buscar novamente.',
    },
};
