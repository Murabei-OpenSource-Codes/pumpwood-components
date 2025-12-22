import type { Meta, StoryObj } from '@storybook/react-vite';
import { PumpwoodBadge } from '@/components/Badge';

const meta = {
    title: 'Pumpwood/Elements/Badge',
    component: PumpwoodBadge,
} satisfies Meta<typeof PumpwoodBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Lorem Ipsum",
        variant: 'default',
    },
};
