import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PopConfirm } from "@/components/PopConfirm";
import { Button } from "@/components/ui/button";

const meta = {
	title: "Pumpwood/Components/PopConfirm",
	component: PopConfirm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof PopConfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Deseja solicitar um novo enriquecimento para esta unidade?",
		onConfirm: () => undefined,
		children: <Button>Solicitar enriquecimento</Button>,
	},
};

export const WithDescription: Story = {
	args: {
		title: "Deseja apagar este registro?",
		description:
			"Essa ação não poderá ser desfeita e o registro será removido permanentemente.",
		confirmText: "Apagar",
		confirmVariant: "destructive",
		onConfirm: () => undefined,
		children: <Button variant="destructive">Apagar</Button>,
	},
};

export const AsyncConfirm: Story = {
	render: () => {
		const [message, setMessage] = useState<string | null>(null);

		return (
			<>
				<PopConfirm
					title="Deseja continuar com a operação assíncrona?"
					onConfirm={async () => {
						await new Promise((resolve) => {
							setTimeout(resolve, 1200);
						});
						setMessage("Operação confirmada.");
					}}
				>
					<Button>Confirmar assíncrono</Button>
				</PopConfirm>
				{message ? <p className="mt-4 text-sm">{message}</p> : null}
			</>
		);
	},
};
