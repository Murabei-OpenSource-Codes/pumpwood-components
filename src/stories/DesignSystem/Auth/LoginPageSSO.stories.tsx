import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginPageSSO } from "@design-system/Auth/LoginPageSSO";

const placeholderBrand = (
	<div className="flex flex-col items-center gap-4 text-center">
		<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/15 text-3xl font-bold">
			M
		</div>
		<p className="text-sm text-primary-foreground/90">
			Pumpwood Design System
		</p>
	</div>
);

const meta = {
	title: "Pumpwood/DesignSystem/Auth/LoginPageSSO",
	component: LoginPageSSO,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof LoginPageSSO>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onLoginSSO: async () => ({ redirect_url: null, error: null }),
		onRedirect: () => undefined,
	},
};

export const SplitScreen: Story = {
	args: {
		variant: "v2",
		brand: placeholderBrand,
		welcomeTitle: "Acesso",
		welcomeDescription: "Informe seu e-mail corporativo para continuar.",
		onLoginSSO: async () => ({ redirect_url: null, error: null }),
		onRedirect: () => undefined,
	},
};