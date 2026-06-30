import type { Meta, StoryObj } from '@storybook/react';
import { startOfDay } from 'date-fns';
import { useState } from 'react';
import { DatePicker } from '../../components/DatePicker';

const meta = {
    title: 'Pumpwood/Components/DatePicker',
    component: DatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Data inicial',
        boundary: 'start',
        value: startOfDay(new Date()).toISOString(),
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value);
        return (
            <DatePicker
                {...args}
                className="min-w-[150px] w-[180px]"
                value={value}
                onValueChange={setValue}
            />
        );
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Data inicial',
        boundary: 'start',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(undefined);
        return (
            <DatePicker
                {...args}
                className="min-w-[150px] w-[180px]"
                value={value}
                onValueChange={setValue}
            />
        );
    },
};

export const EndBoundary: Story = {
    args: {
        placeholder: 'Data final',
        boundary: 'end',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(undefined);
        return (
            <DatePicker
                {...args}
                className="min-w-[150px] w-[180px]"
                value={value}
                onValueChange={setValue}
            />
        );
    },
};
