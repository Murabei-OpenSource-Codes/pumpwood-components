import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const meta = {
    title: 'Pumpwood/Elements/Input',
    component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const WithIcon: Story = {
    args: {
        placeholder: 'Search...',
        icon: <Search className="h-4 w-4" />,
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
    },
};
