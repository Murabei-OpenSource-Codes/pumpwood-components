import type { Meta, StoryObj } from '@storybook/react';
import { CreatedByUserFilter } from '../../components/Filters/CreatedByUserFilter';

const mockFetcher = async ({ search }: { search: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const items = [
        { pk: 1, username: 'user1' },
        { pk: 2, username: 'admin' },
        { pk: 3, username: 'guest' },
        { pk: 4, username: 'jdoe' },
    ];
    if (!search) return items;
    return items.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
};

const meta = {
    title: 'Pumpwood/Components/CreatedByUserFilter',
    component: CreatedByUserFilter,
} satisfies Meta<typeof CreatedByUserFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        fetcher: mockFetcher,
        value: null,
        onChange: (val) => console.log('Selected user ID:', val),
    }
};
