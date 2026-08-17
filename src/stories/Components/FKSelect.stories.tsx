import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FKSelect } from "../../components/FKSelect";

const ALL_ITEMS = Array.from({ length: 80 }, (_, index) => ({
	pk: index + 1,
	name: `Item ${index + 1}`,
}));

const mockFetcher = async ({
	search,
	limit = 50,
	offset = 0,
}: {
	search: string;
	limit?: number;
	offset?: number;
}) => {
	await new Promise((resolve) => setTimeout(resolve, 250));
	const filtered = search
		? ALL_ITEMS.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase()),
			)
		: ALL_ITEMS;
	return filtered.slice(offset, offset + limit);
};

const meta = {
	title: "Pumpwood/Components/FKSelect",
	component: FKSelect,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof FKSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		fetcher: mockFetcher,
		modelClass: "MockModel",
		labelName: "name",
		value: null,
		onChange: (val) => console.log("FKSelect value:", val),
	},
	render: (args) => {
		const [value, setValue] = useState<string | number | null>(args.value);
		return (
			<div className="h-[300px] w-[300px]">
				<FKSelect {...args} value={value} onChange={(val) => setValue(val)} />
			</div>
		);
	},
};

export const ScrollPagination: Story = {
	args: {
		fetcher: mockFetcher,
		modelClass: "MockModel",
		labelName: "name",
		value: null,
		pageSize: 20,
		onChange: (val) => console.log("FKSelect value:", val),
	},
	render: (args) => {
		const [value, setValue] = useState<string | number | null>(args.value);
		return (
			<div className="h-[300px] w-[300px]">
				<FKSelect
					{...args}
					pageSize={20}
					value={value}
					onChange={(val) => setValue(val)}
				/>
			</div>
		);
	},
};

export const InFilterRow: Story = {
	args: {
		fetcher: mockFetcher,
		modelClass: "MockModel",
		labelName: "name",
		value: null,
		onChange: (val) => console.log("FKSelect value:", val),
	},
	render: (args) => {
		const [value, setValue] = useState<string | number | null>(args.value);
		const filterClass = "min-w-0 flex-1 basis-0";
		return (
			<div className="flex w-full flex-wrap items-end gap-4">
				<FKSelect
					{...args}
					className={filterClass}
					placeholder="Plano"
					value={value}
					onChange={(val) => setValue(val)}
				/>
				<FKSelect
					{...args}
					className={filterClass}
					placeholder="Área"
					value={value}
					onChange={(val) => setValue(val)}
				/>
				<FKSelect
					{...args}
					className={filterClass}
					placeholder="Atributo"
					value={value}
					onChange={(val) => setValue(val)}
				/>
			</div>
		);
	},
};
