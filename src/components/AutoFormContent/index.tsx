"use client";

import type * as React from "react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
	Select as SelectPrimitive,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import Stack from "../Stack";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive;

/**
 * Interface representing a form field specification
 */
export interface IFormField {
	type:
		| "text"
		| "number"
		| "password"
		| "email"
		| "textarea"
		| "checkbox"
		| "select"
		| "date"
		| "key-value";
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	options?: { label: string; value: string }[];
	className?: string;
	cols?: 1 | 2 | 3 | 4;
}

/**
 * Custom section grouping configuration similar to AutoDetailContent
 */
export interface IFormSection {
	title: string;
	fields: string[];
	cols?: 1 | 2 | 3 | 4;
	isFullWidth?: boolean;
}

export interface IAutoFormContentProps {
	fields: Record<string, IFormField>;
	values?: Record<string, any>;
	defaultValue?: Record<string, any>;
	onChange?: (values: Record<string, any>) => void;
	errors?: Record<string, string>;
	config?: {
		exclude?: string[];
		labels?: Record<string, string>;
		sections?: IFormSection[];
	};
	customFields?: Record<
		string,
		(props: {
			value: any;
			onChange: (val: any) => void;
			error?: string;
			disabled?: boolean;
			fieldKey: string;
		}) => React.ReactNode
	>;
}

const DEFAULT_LABELS: Record<string, string> = {
	description: "Descrição",
	code: "Código",
	notes: "Notas",
	force_temperature: "Temperatura Forçada",
	dimensions: "Tags",
	extra_info: "Informações extras",
};

const formatLabel = (
	key: string,
	customLabels?: Record<string, string>,
): string => {
	if (customLabels?.[key]) return customLabels[key];
	if (DEFAULT_LABELS[key]) return DEFAULT_LABELS[key];
	return key
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

function KeyValueField({
	value = {},
	onChange,
	name,
	placeholderKey = "Chave",
	placeholderValue = "Valor",
	disabled = false,
}: {
	value?: Record<string, string>;
	onChange: (val: any) => void;
	name: string;
	placeholderKey?: string;
	placeholderValue?: string;
	disabled?: boolean;
}) {
	const [input, setInput] = useState({ key: "", value: "" });

	const handleAdd = () => {
		const key = input.key.trim();
		const val = input.value.trim();
		if (!key) return;

		onChange((prev: any) => {
			const base = prev && typeof prev === "object" ? prev : {};
			return { ...base, [key]: val };
		});
		setInput({ key: "", value: "" });
	};

	const handleRemove = (keyToRemove: string) => {
		onChange((prev: any) => {
			const base = prev && typeof prev === "object" ? prev : {};
			const next = { ...base };
			delete next[keyToRemove];
			return next;
		});
	};

	return (
		<Stack direction="col" gap={2}>
			<div className="flex gap-2">
				<Input
					type="text"
					name={`${name}_key`}
					placeholder={placeholderKey}
					value={input.key}
					disabled={disabled}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setInput((prev) => ({ ...prev, key: e.target.value }))
					}
					className="flex-1"
				/>
				<Input
					type="text"
					name={`${name}_value`}
					placeholder={placeholderValue}
					value={input.value}
					disabled={disabled}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setInput((prev) => ({ ...prev, value: e.target.value }))
					}
					className="flex-1"
				/>
				<Button
					type="button"
					variant="default"
					className="px-4 py-2 shrink-0"
					id={`${name}_add`}
					onClick={handleAdd}
					disabled={disabled || !input.key.trim()}
				>
					Adicionar
				</Button>
			</div>

			{Object.entries(value).length > 0 && (
				<Stack direction="row" gap={2} className="flex-wrap">
					{Object.entries(value).map(([k, v]) => (
						<Stack
							key={k}
							direction="row"
							gap={1}
							className="bg-muted px-3 py-1.5 rounded-md text-sm"
						>
							<span className="font-medium text-foreground">
								{k} : {String(v)}
							</span>
							{!disabled && (
								<button
									type="button"
									onClick={() => handleRemove(k)}
									className="rounded-full p-0 hover:bg-muted-foreground/20 hover:text-destructive hover:backgro transition-colors"
								>
									×
								</button>
							)}
						</Stack>
					))}
				</Stack>
			)}
		</Stack>
	);
}

export function AutoFormContent({
	fields,
	values: externalValues,
	defaultValue = {},
	onChange,
	errors = {},
	config,
	customFields,
}: IAutoFormContentProps) {
	const [internalValues, setInternalValues] =
		useState<Record<string, any>>(defaultValue);

	const values = externalValues ?? internalValues;

	const handleValueChange = (key: string, valueOrUpdater: any) => {
		if (onChange) {
			onChange((prev: Record<string, any>) => {
				const base = prev && typeof prev === "object" ? prev : values;
				const currentValue = base[key];
				const nextValue =
					typeof valueOrUpdater === "function"
						? valueOrUpdater(currentValue)
						: valueOrUpdater;
				return { ...base, [key]: nextValue };
			});
		} else {
			setInternalValues((prev) => {
				const currentValue = prev[key];
				const nextValue =
					typeof valueOrUpdater === "function"
						? valueOrUpdater(currentValue)
						: valueOrUpdater;
				return { ...prev, [key]: nextValue };
			});
		}
	};

	useEffect(() => {
		if (
			Object.keys(defaultValue).length > 0 &&
			Object.keys(values).length === 0
		) {
			setInternalValues(defaultValue);
		}
	}, [defaultValue, values]);

	const activeFieldKeys = Object.keys(fields).filter(
		(key) => !config?.exclude?.includes(key),
	);

	const sections: IFormSection[] = config?.sections || [
		{
			title: "Dados do Formulário",
			fields: activeFieldKeys,
			cols: 1,
		},
	];

	const renderFieldInput = (key: string, field: IFormField) => {
		const val = values[key] ?? "";
		const error = errors[key];
		const disabled = field.disabled;

		if (customFields?.[key]) {
			return customFields[key]({
				value: val,
				onChange: (newVal) => handleValueChange(key, newVal),
				error,
				disabled,
				fieldKey: key,
			});
		}

		switch (field.type) {
			case "textarea":
				return (
					<Textarea
						id={key}
						name={key}
						placeholder={field.placeholder}
						value={val}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							handleValueChange(key, e.target.value)
						}
						required={field.required}
						disabled={disabled}
						className={cn(
							"min-h-[120px] w-full",
							error && "border-destructive",
						)}
					/>
				);

			case "checkbox":
				return (
					<div className="flex items-center gap-2 py-2">
						<Checkbox
							id={key}
							name={key}
							checked={!!val}
							onCheckedChange={(checked) => handleValueChange(key, !!checked)}
							disabled={disabled}
						/>
						<label
							htmlFor={key}
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{formatLabel(key, config?.labels)}
						</label>
					</div>
				);

			case "select":
				return (
					<Select
						key={val ? "loaded" : "empty"}
						name={key}
						value={val}
						onValueChange={(newVal) => handleValueChange(key, newVal)}
						disabled={disabled}
					>
						<SelectTrigger data-testid={`${key}-select-trigger`}>
							<SelectValue placeholder={field.placeholder || "Selecione..."} />
						</SelectTrigger>
						<SelectContent>
							{field.options?.map((opt) => (
								<SelectItem
									data-testid={`${key}-select-item-${opt.value}`}
									key={opt.value}
									value={opt.value}
								>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);

			case "key-value":
				return (
					<>
						<KeyValueField
							value={val || {}}
							name={key}
							onChange={(newVal) => handleValueChange(key, newVal)}
							placeholderKey="Chave"
							placeholderValue="Valor"
							disabled={disabled}
						/>
						<input type="hidden" name={key} value={JSON.stringify(val || {})} />
					</>
				);

			case "number":
				return (
					<Input
						type="number"
						id={key}
						name={key}
						placeholder={field.placeholder}
						value={val}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							const numVal =
								e.target.value === "" ? "" : Number(e.target.value);
							handleValueChange(key, numVal);
						}}
						required={field.required}
						disabled={disabled}
						className={cn("w-full", error && "border-destructive")}
					/>
				);

			case "date":
				return (
					<Input
						type="date"
						id={key}
						name={key}
						placeholder={field.placeholder}
						value={val}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							handleValueChange(key, e.target.value)
						}
						required={field.required}
						disabled={disabled}
						className={cn("w-full", error && "border-destructive")}
					/>
				);
			default:
				return (
					<Input
						type={field.type}
						id={key}
						name={key}
						placeholder={field.placeholder}
						value={val}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							handleValueChange(key, e.target.value)
						}
						required={field.required}
						disabled={disabled}
						className={cn("w-full", error && "border-destructive")}
					/>
				);
		}
	};

	return (
		<Stack direction="col" gap={6} className="w-full">
			{sections.map((section) => {
				const visibleFields = section.fields.filter(
					(fieldKey) =>
						fieldKey in fields && !config?.exclude?.includes(fieldKey),
				);

				if (visibleFields.length === 0) return null;

				const gridCols =
					section.cols === 1
						? "grid-cols-1"
						: section.cols === 2
							? "grid-cols-1 sm:grid-cols-2"
							: section.cols === 3
								? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
								: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

				return (
					<Stack key={section.title} direction="col" gap={3} className="w-full">
						<h3 className="text-sm font-semibold text-foreground">
							{section.title}
						</h3>
						<div className={cn("grid gap-x-6 gap-y-4 w-full", gridCols)}>
							{visibleFields.map((fieldKey) => {
								const field = fields[fieldKey];
								const isFullWidth =
									section.isFullWidth ||
									field.type === "textarea" ||
									field.type === "key-value" ||
									field.cols === 4;

								const error = errors[fieldKey];
								const showExternalLabel = field.type !== "checkbox";

								return (
									<Stack
										key={fieldKey}
										direction="col"
										gap={1.5}
										className={cn(
											isFullWidth ? "col-span-full" : "",
											field.className,
										)}
									>
										{showExternalLabel && (
											<label
												htmlFor={fieldKey}
												className="text-fontcolor-secondary font-bold text-sm"
											>
												{formatLabel(fieldKey, config?.labels)}
												{field.required && (
													<span className="text-destructive ml-0.5">*</span>
												)}
											</label>
										)}

										{renderFieldInput(fieldKey, field)}

										{error && (
											<span className="text-xs text-destructive font-medium mt-0.5">
												{error}
											</span>
										)}
									</Stack>
								);
							})}
						</div>
					</Stack>
				);
			})}
		</Stack>
	);
}
