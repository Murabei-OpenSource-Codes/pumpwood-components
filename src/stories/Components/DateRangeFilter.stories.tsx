import type { Meta, StoryObj } from '@storybook/react';
import { DateRangeFilter } from '../../components/Filters/DateRangeFilter';
import { useState } from 'react';

const meta = {
    title: 'Pumpwood/Components/DateRangeFilter',
    component: DateRangeFilter,
} satisfies Meta<typeof DateRangeFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        onStartDateChange: () => { },
        onEndDateChange: () => { },
    },
    render: (args) => {
        const [startDate, setStartDate] = useState<Date | undefined>(args.startDate);
        const [endDate, setEndDate] = useState<Date | undefined>(args.endDate);
        return (
            <DateRangeFilter
                {...args}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
        );
    }
};

