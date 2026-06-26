import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircle } from "lucide-react";
import { AlertWithIcon } from "@/components/AlertWithIcon";

const meta = {
    title: "Pumpwood/Elements/AlertWithIcon",
    component: AlertWithIcon,
} satisfies Meta<typeof AlertWithIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Destructive: Story = {
    args: {
        variant: "destructive",
        icon: <AlertCircle />,
        title: "Sessão expirada",
        description: "Faça login novamente para continuar",
    },
};
