"use client";

import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import {
	Select,
	SelectContent,
	SelectTrigger,
} from "../ui/select";
import { cn } from "@/lib/utils";

export interface IMultiSelectOption {
	label: string;
	value: string;
}

interface IMultiSelectDropdownProps {
	options: IMultiSelectOption[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	className?: string;
	maxDisplay?: number;
}

export function MultiSelectDropdown({
	options,
	selected,
	onChange,
	placeholder = "Select items...",
	className,
	maxDisplay = 3,
}: IMultiSelectDropdownProps) {
	const [open, setOpen] = React.useState(false);

	const allSelected = selected.length === options.length && options.length > 0;

	const handleSelect = (value: string) => {
		const newSelected = selected.includes(value)
			? selected.filter((item) => item !== value)
			: [...selected, value];
		onChange(newSelected);
	};

	const handleSelectAll = () => {
		if (allSelected) {
			onChange([]);
		} else {
			onChange(options.map((option) => option.value));
		}
	};

	const getDisplayText = () => {
		if (selected.length === 0) {
			return placeholder;
		}

		if (selected.length > maxDisplay) {
			return `${selected.length} items selected`;
		}

		const displayText = selected
			.map((value) => options.find((option) => option.value === value)?.label)
			.join(", ");

		if (displayText.length > 80) {
			return `${selected.length} item${
				selected.length !== 1 ? "s" : ""
			} selected`;
		}

		return displayText;
	};

	return (
		<Select open={open} onOpenChange={setOpen}>
			<SelectTrigger className={cn("w-full", className)}>
				<span
					className={cn(
						"truncate flex-1 text-left",
						selected.length === 0 && "text-muted-foreground",
					)}
				>
					{getDisplayText()}
				</span>
			</SelectTrigger>

			<SelectContent>
				{options.length > 0 && (
					<div className="border-b border-border">
						<div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-accent hover:text-accent-foreground rounded-sm w-full text-left font-medium">
							<Checkbox
								checked={allSelected}
								onCheckedChange={handleSelectAll}
							/>
							<span className="text-sm">
								{allSelected ? "Unselect All" : "Select All"}
							</span>
						</div>
					</div>
				)}

				<div className="p-1 space-y-1">
					{options.map((option) => (
						<div
							key={option.value}
							className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-accent hover:text-accent-foreground rounded-sm w-full text-left"
						>
							<Checkbox
								checked={selected.includes(option.value)}
								onCheckedChange={() => handleSelect(option.value)}
							/>
							<span className="text-sm">{option.label}</span>
						</div>
					))}
				</div>

				{selected.length > 0 && (
					<div className="border-t border-border p-2 bg-muted">
						<div className="text-xs text-muted-foreground">
							{selected.length} item{selected.length !== 1 ? "s" : ""} selected
						</div>
					</div>
				)}
			</SelectContent>
		</Select>
	);
}
