import type { Meta, StoryObj } from '@storybook/react';
import { CombinedFilterTable } from '@design-system/CombinedFilterTable';

const meta = {
    title: 'Pumpwood/DesignSystem/CombinedFilterTable',
    component: CombinedFilterTable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CombinedFilterTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
