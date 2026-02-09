import type { Meta, StoryObj } from "@storybook/react";
import { EmptyContainer } from "@/components/EmptyContainer";

const meta = {
    title: "Pumpwood/Components/EmptyContainer",
    component: EmptyContainer,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
    },
} satisfies Meta<typeof EmptyContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "No Data",
        description: "There is no data available to display.",
    },
};

export const NoResults: Story = {
    args: {
        title: "No Results Found",
        description: "Try adjusting your search or filter criteria.",
    },
};

export const EmptyDashboard: Story = {
    args: {
        title: "Sem dados",
        description: "Nenhum dado sobre series temporais encontrado para esta aba.",
    },
};

export const InContainer: Story = {
    render: (args) => (
        <div className="w-full min-h-[500px] border rounded-lg bg-card p-4 flex flex-col justify-center items-center">
            <EmptyContainer {...args} />
        </div>
    ),
    args: {
        title: "Empty State",
        description: "This shows how the empty container looks inside a card.",
    },
};
