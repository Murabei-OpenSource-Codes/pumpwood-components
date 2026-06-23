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
