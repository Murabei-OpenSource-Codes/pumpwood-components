import type { Meta, StoryObj } from '@storybook/react';
import { CombinedFilterTable } from '../../components/CombinedFilterTable';

const meta = {
    title: 'Pumpwood/Components/CombinedFilterTable',
    component: CombinedFilterTable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CombinedFilterTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
