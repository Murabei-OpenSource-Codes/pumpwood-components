import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@/components/Stack';

const meta = {
    title: 'Pumpwood/Elements/Stack',
    component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: <>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </>,
        direction: 'col',
        gap: 2,
        className: 'bg-red-500 w-fit p-10 text-white rounded-xl',
    },
};
