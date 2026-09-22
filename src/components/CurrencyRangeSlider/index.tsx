"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const defaultFormatValue = (value: number): string =>
	new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);

const filterFieldLabelClassName = "text-secondary-font text-sm font-normal";

const filterNumericInputGridClassName =
	"grid w-full min-w-0 grid-cols-[minmax(0,8.75rem)_1fr_minmax(0,8.75rem)] gap-x-2 gap-y-1 sm:grid-cols-[minmax(0,9.5rem)_1fr_minmax(0,9.5rem)]";

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
	/** When true, shows editable numeric inputs for min and max below the slider. */
	showNumericInputs?: boolean;
	minInputLabel?: string;
	maxInputLabel?: string;
	minReadoutTestId?: string;
	maxReadoutTestId?: string;
	minInputTestId?: string;
	maxInputTestId?: string;
}

const snapToStep = (
	value: number,
	step: number,
	domainMin: number,
	domainMax: number,
) => {
	const stepped = Math.round(value / step) * step;
	return Math.min(domainMax, Math.max(domainMin, stepped));
};

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
	minInputLabel = "Mín.",
	maxInputLabel = "Máx.",
	minReadoutTestId,
	maxReadoutTestId,
	minInputTestId,
	maxInputTestId,
}: ICurrencyRangeSliderProps) => {
	const clampedMin = Math.min(Math.max(minValue, domainMin), domainMax);
	const clampedMax = Math.min(Math.max(maxValue, domainMin), domainMax);
	const rangeMin = Math.min(clampedMin, clampedMax);
	const rangeMax = Math.max(clampedMin, clampedMax);

	const handleValueChange = (values: number[]) => {
		const [nextMin, nextMax] = values;
		onMinChange(nextMin);
		onMaxChange(nextMax);
	};

	const handleMinInputChange = (raw: string) => {
		const parsed = Number.parseFloat(raw);
		if (!Number.isFinite(parsed)) {
			return;
		}
		const next = snapToStep(parsed, step, domainMin, domainMax);
		onMinChange(Math.min(next, rangeMax));
	};

	const handleMaxInputChange = (raw: string) => {
		const parsed = Number.parseFloat(raw);
		if (!Number.isFinite(parsed)) {
			return;
		}
		const next = snapToStep(parsed, step, domainMin, domainMax);
		onMaxChange(Math.max(next, rangeMin));
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
				<div className={filterNumericInputGridClassName}>
					<Label
						htmlFor={minFieldTestId}
						className={cn(
							filterFieldLabelClassName,
							"col-start-1 row-start-1 leading-snug",
						)}
					>
						{minInputLabel}
					</Label>
					<Label
						htmlFor={maxFieldTestId}
						className={cn(
							filterFieldLabelClassName,
							"col-start-3 row-start-1 leading-snug",
						)}
					>
						{maxInputLabel}
					</Label>
					<Input
						id={minFieldTestId}
						data-testid={minFieldTestId}
						type="number"
						inputMode="decimal"
						min={domainMin}
						max={rangeMax}
						step={step}
						value={rangeMin}
						onChange={(event) => handleMinInputChange(event.target.value)}
						className="col-start-1 row-start-2 w-full min-w-0"
					/>
					<Slider
						min={domainMin}
						max={domainMax}
						step={step}
						value={[rangeMin, rangeMax]}
						onValueChange={handleValueChange}
						aria-label={label ?? minInputLabel}
						className="col-start-2 row-start-2 min-w-0 self-center"
					/>
					<Input
						id={maxFieldTestId}
						data-testid={maxFieldTestId}
						type="number"
						inputMode="decimal"
						min={rangeMin}
						max={domainMax}
						step={step}
						value={rangeMax}
						onChange={(event) => handleMaxInputChange(event.target.value)}
						className="col-start-3 row-start-2 w-full min-w-0"
					/>
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
