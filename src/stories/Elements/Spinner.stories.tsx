import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@/components/ui/spinner';

const meta = {
    title: 'Pumpwood/Elements/Spinner',
    component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 8,
    },
};
