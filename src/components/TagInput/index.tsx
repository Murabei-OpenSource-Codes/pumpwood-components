"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Stack from "../Stack";

export interface ITagItem {
	key: string;
	value: string;
}

interface ITagInputProps {
	value: ITagItem[];
	onChange: (tags: ITagItem[]) => void;
	keyPlaceholder?: string;
	valuePlaceholder?: string;
	disabled?: boolean;
}

export default function TagInput({
	value = [],
	onChange,
	keyPlaceholder = "Chave",
	valuePlaceholder = "Valor",
	disabled = false,
}: ITagInputProps) {
	const [keyInput, setKeyInput] = useState("");
	const [valueInput, setValueInput] = useState("");

	const handleAddTag = () => {
		const trimmedKey = keyInput.trim();
		const trimmedValue = valueInput.trim();

		if (trimmedKey && trimmedValue) {
			const isDuplicate = value.some((tag) => tag.key === trimmedKey);
			if (!isDuplicate) {
				onChange([...value, { key: trimmedKey, value: trimmedValue }]);
				setKeyInput("");
				setValueInput("");
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleRemoveTag = (keyToRemove: string) => {
		onChange(value.filter((tag) => tag.key !== keyToRemove));
	};

	return (
		<Stack direction="col" gap={3}>
			<Stack direction="row" gap={2}>
				<Input
					value={keyInput}
					onChange={(e) => setKeyInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={keyPlaceholder}
					disabled={disabled}
					className="flex-1"
				/>
				<Input
					value={valueInput}
					onChange={(e) => setValueInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={valuePlaceholder}
					disabled={disabled}
					className="flex-1"
				/>
				<Button
					type="button"
					onClick={handleAddTag}
					disabled={!keyInput.trim() || !valueInput.trim() || disabled}
					variant="outline"
				>
					Adicionar
				</Button>
			</Stack>

			{value.length > 0 && (
				<Stack direction="row" gap={2} className="flex-wrap">
					{value.map((tag) => (
						<Stack
							key={tag.key}
							direction="row"
							gap={1}
							className="items-center px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
						>
							<span className="font-medium">{tag.key}:</span>
							<span>{tag.value}</span>
							<Button
								type="button"
								onClick={() => handleRemoveTag(tag.key)}
								disabled={disabled}
								variant="ghost"
								size="icon"
								className="h-4 w-4 p-0 hover:bg-secondary-foreground/10 rounded-full"
								aria-label={`Remover tag ${tag.key}`}
							>
								<X className="h-3 w-3" />
							</Button>
						</Stack>
					))}
				</Stack>
			)}
		</Stack>
	);
}

export { TagInput };
