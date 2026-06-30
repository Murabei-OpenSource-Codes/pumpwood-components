import type { Meta, StoryObj } from '@storybook/react-vite';
import { SquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const meta = {
    title: 'Pumpwood/Elements/Button',
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Click here',
        variant: "default",
    },
};

export const WithIconAndLabel: Story = {
    args: {
        label: 'Criar novo lote',
        icon: <SquarePlus size={16} />,
        variant: 'default',
        width: 200,
        className: 'mt-6',
    },
};
