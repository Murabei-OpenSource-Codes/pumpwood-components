import type { Meta, StoryObj } from '@storybook/react-vite';
import PumpwoodButton from '@/components/Button';

const meta = {
    title: 'Pumpwood/Elements/Button',
    component: PumpwoodButton,
} satisfies Meta<typeof PumpwoodButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Click here',
    },
};
