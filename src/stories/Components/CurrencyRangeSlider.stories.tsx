import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CurrencyRangeSlider } from "@/components/CurrencyRangeSlider";

const meta = {
	title: "Pumpwood/Components/CurrencyRangeSlider",
	component: CurrencyRangeSlider,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CurrencyRangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [minValue, setMinValue] = useState(0);
		const [maxValue, setMaxValue] = useState(10_000_000);

		return (
			<div className="w-[360px]">
				<CurrencyRangeSlider
					label="Valor da causa"
					minValue={minValue}
					maxValue={maxValue}
					onMinChange={setMinValue}
					onMaxChange={setMaxValue}
				/>
			</div>
		);
	},
};

export const WithNumericInputs: Story = {
	render: () => {
		const [minValue, setMinValue] = useState(1_000);
		const [maxValue, setMaxValue] = useState(50_000);

		return (
			<div className="w-[360px]">
				<CurrencyRangeSlider
					label="Valor da causa"
					showNumericInputs
					minInputLabel="Mín."
					maxInputLabel="Máx."
					minValue={minValue}
					maxValue={maxValue}
					onMinChange={setMinValue}
					onMaxChange={setMaxValue}
				/>
			</div>
		);
	},
};
