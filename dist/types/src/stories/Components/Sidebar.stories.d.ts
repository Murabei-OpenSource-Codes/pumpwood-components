import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ children, isCollapsed, onToggleCollapse, className, }: import("../../components/Sidebar").SidebarRootProps) => import("react/jsx-runtime").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        isCollapsed: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Collapsed: Story;
