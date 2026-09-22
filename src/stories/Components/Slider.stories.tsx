import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/slider";

const meta = {
	title: "Pumpwood/Components/Slider",
	component: Slider,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-[360px]">
			<Slider defaultValue={[33]} max={100} step={1} />
		</div>
	),
};

export const Range: Story = {
	render: () => (
		<div className="w-[360px]">
			<Slider defaultValue={[20, 80]} max={100} step={1} />
		</div>
	),
};
