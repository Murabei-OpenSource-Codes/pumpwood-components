import type { Meta, StoryObj } from "@storybook/react";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { useState } from "react";
import { RangePicker } from "../../components/RangePicker";

const meta = {
    title: "Pumpwood/Components/RangePicker",
    component: RangePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: "Selecione o período",
    },
    render: (args) => {
        const today = new Date();
        const [fromValue, setFromValue] = useState<string>(
            startOfDay(subDays(today, 7)).toISOString(),
        );
        const [toValue, setToValue] = useState<string>(
            endOfDay(today).toISOString(),
        );

        return (
            <RangePicker
                {...args}
                className="min-w-[200px] w-[280px]"
                fromValue={fromValue}
                toValue={toValue}
                onFromChange={setFromValue}
                onToChange={setToValue}
            />
        );
    },
};

export const Empty: Story = {
    args: {
        placeholder: "Selecione o período",
    },
    render: (args) => {
        const [fromValue, setFromValue] = useState<string>("");
        const [toValue, setToValue] = useState<string>("");

        return (
            <RangePicker
                {...args}
                className="min-w-[200px] w-[280px]"
                fromValue={fromValue}
                toValue={toValue}
                onFromChange={setFromValue}
                onToChange={setToValue}
            />
        );
    },
};

export const StartOnly: Story = {
    args: {
        placeholder: "Selecione o período",
    },
    render: (args) => {
        const [fromValue, setFromValue] = useState<string>(
            startOfDay(new Date()).toISOString(),
        );
        const [toValue, setToValue] = useState<string>("");

        return (
            <RangePicker
                {...args}
                className="min-w-[200px] w-[280px]"
                fromValue={fromValue}
                toValue={toValue}
                onFromChange={setFromValue}
                onToChange={setToValue}
            />
        );
    },
};
