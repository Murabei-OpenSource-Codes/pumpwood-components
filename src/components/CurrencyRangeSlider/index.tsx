"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { parseDraftValue, snapToStep } from "./utils";

const defaultFormatValue = (value: number): string =>
	new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);

const filterFieldLabelClassName = "text-secondary-font text-sm font-normal";

const numericInputClassName =
	"w-[5rem] max-w-[5.5rem] shrink-0 px-2 text-sm tabular-nums";

const sliderRowClassName =
	"flex-1 min-w-0 py-1 [&_[data-orientation=horizontal]]:!h-2 [&_[role=slider]]:!h-5 [&_[role=slider]]:!w-5";

export interface ICurrencyRangeSliderProps {
	id?: string;
	"data-testid"?: string;
	label?: string;
	domainMin?: number;
	domainMax?: number;
	step?: number;
	minValue: number;
	maxValue: number;
	onMinChange: (value: number) => void;
	onMaxChange: (value: number) => void;
	formatValue?: (value: number) => string;
	className?: string;
	/** When true, shows editable numeric inputs beside the slider. */
	showNumericInputs?: boolean;
	/** When false, hides per-input labels (min/max); use `label` for the field. */
	showInputLabels?: boolean;
	minInputLabel?: string;
	maxInputLabel?: string;
	minReadoutTestId?: string;
	maxReadoutTestId?: string;
	minInputTestId?: string;
	maxInputTestId?: string;
	sliderClassName?: string;
}

/**
 * Range slider for currency values with formatted min/max readouts.
 */
export const CurrencyRangeSlider = ({
	id,
	"data-testid": dataTestId,
	label,
	domainMin = 0,
	domainMax = 10_000_000,
	step = 1_000,
	minValue,
	maxValue,
	onMinChange,
	onMaxChange,
	formatValue = defaultFormatValue,
	className,
	showNumericInputs = false,
	showInputLabels = true,
	minInputLabel = "Mín.",
	maxInputLabel = "Máx.",
	minReadoutTestId,
	maxReadoutTestId,
	minInputTestId,
	maxInputTestId,
	sliderClassName,
}: ICurrencyRangeSliderProps) => {
	const clampedMin = Math.min(Math.max(minValue, domainMin), domainMax);
	const clampedMax = Math.min(Math.max(maxValue, domainMin), domainMax);
	const rangeMin = Math.min(clampedMin, clampedMax);
	const rangeMax = Math.max(clampedMin, clampedMax);

	const [minDraft, setMinDraft] = useState(String(rangeMin));
	const [maxDraft, setMaxDraft] = useState(String(rangeMax));
	const [minFocused, setMinFocused] = useState(false);
	const [maxFocused, setMaxFocused] = useState(false);

	useEffect(() => {
		if (!minFocused) {
			setMinDraft(String(rangeMin));
		}
	}, [rangeMin, minFocused]);

	useEffect(() => {
		if (!maxFocused) {
			setMaxDraft(String(rangeMax));
		}
	}, [rangeMax, maxFocused]);

	const handleValueChange = (values: number[]) => {
		const [nextMin, nextMax] = values;
		onMinChange(nextMin);
		onMaxChange(nextMax);
	};

	const commitMin = (raw: string) => {
		const parsed = parseDraftValue(raw);
		if (parsed === null) {
			if (!raw.trim()) {
				onMinChange(domainMin);
			} else {
				setMinDraft(String(rangeMin));
			}
			return;
		}
		const snapped = snapToStep(parsed, step, domainMin, domainMax);
		onMinChange(Math.min(snapped, rangeMax));
	};

	const commitMax = (raw: string) => {
		const parsed = parseDraftValue(raw);
		if (parsed === null) {
			if (!raw.trim()) {
				onMaxChange(domainMax);
			} else {
				setMaxDraft(String(rangeMax));
			}
			return;
		}
		const snapped = snapToStep(parsed, step, domainMin, domainMax);
		onMaxChange(Math.max(snapped, rangeMin));
	};

	const minFieldTestId = minInputTestId ?? minReadoutTestId;
	const maxFieldTestId = maxInputTestId ?? maxReadoutTestId;

	return (
		<div
			id={id}
			data-testid={dataTestId}
			className={cn(
				"flex w-full min-w-0 flex-col",
				showNumericInputs ? "gap-1" : "gap-3",
				className,
			)}
		>
			{label ? (
				<Label className={filterFieldLabelClassName}>{label}</Label>
			) : null}

			{showNumericInputs ? (
				<div className="flex w-full min-w-0 flex-col gap-1">
					{showInputLabels ? (
						<div className="flex w-full min-w-0 items-center gap-2">
							{minFieldTestId ? (
								<Label
									htmlFor={minFieldTestId}
									className={cn(filterFieldLabelClassName, "w-[5rem] shrink-0")}
								>
									{minInputLabel}
								</Label>
							) : null}
							<span className="min-w-0 flex-1" aria-hidden />
							{maxFieldTestId ? (
								<Label
									htmlFor={maxFieldTestId}
									className={cn(
										filterFieldLabelClassName,
										"w-[5rem] max-w-[5.5rem] shrink-0 text-right",
									)}
								>
									{maxInputLabel}
								</Label>
							) : null}
						</div>
					) : null}
					<div className="flex w-full min-w-0 items-center gap-2">
						<Input
							id={minFieldTestId}
							data-testid={minFieldTestId}
							type="text"
							inputMode="decimal"
							value={minDraft}
							onChange={(event) => setMinDraft(event.target.value)}
							onFocus={() => setMinFocused(true)}
							onBlur={() => {
								setMinFocused(false);
								commitMin(minDraft);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.currentTarget.blur();
								}
							}}
							className={numericInputClassName}
							aria-label={
								showInputLabels ? undefined : (label ?? "Mínimo")
							}
						/>
						<Slider
							min={domainMin}
							max={domainMax}
							step={step}
							value={[rangeMin, rangeMax]}
							onValueChange={handleValueChange}
							aria-label={label ?? minInputLabel}
							className={cn(sliderRowClassName, sliderClassName)}
						/>
						<Input
							id={maxFieldTestId}
							data-testid={maxFieldTestId}
							type="text"
							inputMode="decimal"
							value={maxDraft}
							onChange={(event) => setMaxDraft(event.target.value)}
							onFocus={() => setMaxFocused(true)}
							onBlur={() => {
								setMaxFocused(false);
								commitMax(maxDraft);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.currentTarget.blur();
								}
							}}
							className={numericInputClassName}
							aria-label={
								showInputLabels ? undefined : (label ?? "Máximo")
							}
						/>
					</div>
				</div>
			) : (
				<>
					<Slider
						min={domainMin}
						max={domainMax}
						step={step}
						value={[rangeMin, rangeMax]}
						onValueChange={handleValueChange}
						aria-label={label ?? "Currency range"}
						className={sliderClassName}
					/>
					<div
						className="flex items-center justify-between text-sm text-muted-foreground"
					>
						<span data-testid={minReadoutTestId}>
							{formatValue(rangeMin)}
						</span>
						<span data-testid={maxReadoutTestId}>
							{formatValue(rangeMax)}
						</span>
					</div>
				</>
			)}
		</div>
	);
};
