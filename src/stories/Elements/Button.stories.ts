import type { Meta, StoryObj } from '@storybook/react-vite';
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
        className: "bg-red-200 text-black/50"
    },
};
