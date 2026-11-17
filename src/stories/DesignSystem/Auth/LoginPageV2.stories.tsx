import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginPageV2 } from "@design-system/Auth/LoginPageV2";

const placeholderBrand = (
    <div className="flex flex-col items-center gap-3 text-center text-primary-foreground">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/15 text-2xl font-bold">
            M
        </div>
    </div>
);

const meta = {
    title: "Pumpwood/DesignSystem/Auth/LoginPageV2",
    component: LoginPageV2,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof LoginPageV2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        brand: placeholderBrand,
        onLogin: async () => ({ error: null }),
        onSuccess: () => undefined,
        sessionExpired: false,
    },
};

export const Expressive: Story = {
    args: {
        brand: placeholderBrand,
        welcomeTitle: "Acesso",
        welcomeDescription: "Entre com suas credenciais para continuar.",
        onLogin: async () => ({ error: null }),
        onSuccess: () => undefined,
    },
};

export const SessionExpired: Story = {
    args: {
        brand: placeholderBrand,
        welcomeTitle: "Acesso",
        onLogin: async () => ({ error: null }),
        sessionExpired: true,
        sessionExpiredAlert: {
            icon: <span aria-hidden>!</span>,
            title: "Sessão expirada",
            description: "Faça login novamente para continuar",
        },
    },
};