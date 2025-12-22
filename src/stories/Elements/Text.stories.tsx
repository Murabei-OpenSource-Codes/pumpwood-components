import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '@/components/Text';

const meta = {
    title: 'Pumpwood/Elements/Typography',
    render: () => (
        <>
            <Typography.H1>Lorem Ipsum</Typography.H1>
            <Typography.Muted>Lorem Ipsum</Typography.Muted>
        </>
    ),
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
