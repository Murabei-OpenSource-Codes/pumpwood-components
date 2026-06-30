import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../../components/Select';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
];

const mockFetcher = async ({
    search,
    modelClass,
}: {
    search: string;
    modelClass: string;
}) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const items = [
        { pk: 1, username: 'alice' },
        { pk: 2, username: 'bob' },
        { pk: 3, username: 'carol' },
    ];
    if (!search) {
        return items;
    }
    return items.filter((item) =>
        item.username.toLowerCase().includes(search.toLowerCase()),
    );
};

const meta = {
    title: 'Pumpwood/Components/Select',
    component: Select,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Select a fruit',
        options,
        value: 'banana',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value);
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
            </div>
        );
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Choose an option...',
        options,
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(undefined);
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
            </div>
        );
    },
};

export const FK: Story = {
    args: {
        variant: 'fk',
        fetcher: mockFetcher,
        modelClass: 'user',
        labelName: 'username',
        placeholder: 'Select user',
        emptyMessage: 'No users found',
        value: null,
    },
    render: (args) => {
        const [value, setValue] = useState<string | number | null>(null);
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(val) => setValue(val)}
                />
            </div>
        );
    },
};
