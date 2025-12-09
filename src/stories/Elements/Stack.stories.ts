import type { Meta, StoryObj } from '@storybook/react-vite';
import PumpwoodStack from '@/components/Stack';

const meta = {
    title: 'Pumpwood/Elements/Stack',
    component: PumpwoodStack,
} satisfies Meta<typeof PumpwoodStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Stack',
    },
};
