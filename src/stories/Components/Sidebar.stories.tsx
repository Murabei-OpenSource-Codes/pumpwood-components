import type { Meta, StoryObj } from "@storybook/react";
import { Home, Settings, User } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";

const meta = {
    title: "Pumpwood/Components/Sidebar",
    component: Sidebar.Root,
    parameters: {
        layout: "right",
    },
    tags: ["autodocs"],
    argTypes: {
        isCollapsed: { control: "boolean" },
    },
} satisfies Meta<typeof Sidebar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarWrapper = (props: any) => {
    const [isCollapsed, setIsCollapsed] = useState(props.isCollapsed || false);
    const [currentPath, setCurrentPath] = useState("/home");

    const LinkComponent = ({ href, children, className }: any) => (
        <a
            href="#"
            className={className}
            onClick={(e) => {
                e.preventDefault();
                setCurrentPath(href);
            }}
        >
            {children}
        </a>
    );

    return (
        <div className="h-[600px] bg-[#0E2B63] w-fit rounded-xl flex">
            <Sidebar.Root
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                {...props}
            >
                <Sidebar.Header className="w-full flex flex-col">
                    <Sidebar.Toggle />
                    <Sidebar.Logo src="https://placehold.co/200x40/png" alt="Logo" />
                </Sidebar.Header>

                <Sidebar.Content>
                    <Sidebar.Link
                        icon={Home}
                        href="/home"
                        active={currentPath === "/home"}
                        LinkComponent={LinkComponent}
                    >
                        Home
                    </Sidebar.Link>
                    <Sidebar.Link
                        icon={User}
                        href="/profile"
                        active={currentPath === "/profile"}
                        LinkComponent={LinkComponent}
                    >
                        Profile
                    </Sidebar.Link>
                    <Sidebar.Link
                        icon={Settings}
                        href="/settings"
                        active={currentPath === "/settings"}
                        LinkComponent={LinkComponent}
                    >
                        Settings
                    </Sidebar.Link>
                </Sidebar.Content>

                <Sidebar.Footer>
                    <Sidebar.Logo src="https://placehold.co/200x40/png" alt="Logo" />
                </Sidebar.Footer>
            </Sidebar.Root>
        </div>
    );
};

export const Default: Story = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        isCollapsed: false,
    },
};

export const Collapsed: Story = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        isCollapsed: true,
    },
};
