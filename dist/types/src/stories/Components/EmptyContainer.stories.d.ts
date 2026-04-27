import type { StoryObj } from "@storybook/react";
import { EmptyContainer } from "@/components/EmptyContainer";
declare const meta: {
    title: string;
    component: typeof EmptyContainer;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        title: {
            control: "text";
        };
        description: {
            control: "text";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const NoResults: Story;
export declare const EmptyDashboard: Story;
export declare const InContainer: Story;
