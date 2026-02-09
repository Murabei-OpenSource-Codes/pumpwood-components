import type { Meta, StoryObj } from '@storybook/react';
import { FKSelect } from '../../components/FKSelect';
import { useState } from 'react';

const mockFetcher = async ({ search }: { search: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const items = [
        { pk: 1, name: 'Item 1' },
        { pk: 2, name: 'Item 2' },
        { pk: 3, name: 'Other Item' },
        { pk: 4, name: 'Another Item' },
        { pk: 5, name: 'Special Item' },
    ];
    if (!search) return items;
    return items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
};

const meta = {
    title: 'Pumpwood/Components/FKSelect',
    component: FKSelect,
} satisfies Meta<typeof FKSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        fetcher: mockFetcher,
        modelClass: "MockModel",
        labelName: "name",
        value: null,
        onChange: (val) => console.log('FKSelect value:', val),
    },
    render: (args) => {
        const [value, setValue] = useState<string | number | null>(args.value);
        return (
            <div className="pw:h-[300px] pw:w-[300px]">
                <FKSelect
                    {...args}
                    value={value}
                    onChange={(val) => setValue(val)}
                />
            </div>
        );
    },
};
