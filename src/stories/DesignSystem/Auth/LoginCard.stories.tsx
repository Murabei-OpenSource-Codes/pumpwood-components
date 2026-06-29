import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginCard } from "@design-system/Auth/LoginCard";

const meta = {
    title: "Pumpwood/DesignSystem/Auth/LoginCard",
    component: LoginCard,
} satisfies Meta<typeof LoginCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onLogin: async () => ({ error: null }),
        onSuccess: () => undefined,
        sessionExpired: false,
        sessionExpiredAlert: undefined,
    },
};
