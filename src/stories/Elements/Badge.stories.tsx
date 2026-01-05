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
        variant: "warning",
        size: "default",
    },
};

export const Secondary: Story = {
    args: {
        children: "Lorem Ipsum",
        variant: "secondary",
        size: "default",
    },
};

export const Warning: Story = {
    args: {
        children: "Lorem Ipsum",
        variant: "warning",
        size: "default",
    },
};

export const Destructive: Story = {
    args: {
        children: "Lorem Ipsum",
        variant: "destructive",
        size: "default",
    },
};

export const Muted: Story = {
    args: {
        children: "Lorem Ipsum",
        variant: "muted",
        size: "default",
    }
}