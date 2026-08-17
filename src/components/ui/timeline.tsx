"use client";

/**
 * Timeline primitives adapted from ReUI (MIT).
 * Vertical layout uses a flex rail (dot + line) for reliable connection.
 * @see https://reui.io/docs/components/radix/timeline
 */
import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes, TimeHTMLAttributes } from "react";
import { createContext, useCallback, useContext, useState } from "react";

import { cn } from "@/lib/utils";

type TimelineContextValue = {
	activeStep: number;
	setActiveStep: (step: number) => void;
	orientation: "horizontal" | "vertical";
	variant: "steps" | "events";
};

const TimelineContext = createContext<TimelineContextValue | undefined>(
	undefined,
);

function useTimeline(): TimelineContextValue {
	const context = useContext(TimelineContext);
	if (!context) {
		throw new Error("useTimeline must be used within a Timeline");
	}
	return context;
}

interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
	defaultValue?: number;
	value?: number;
	onValueChange?: (value: number) => void;
	orientation?: "horizontal" | "vertical";
	variant?: "steps" | "events";
}

function Timeline({
	defaultValue = 1,
	value,
	onValueChange,
	orientation = "vertical",
	variant = "steps",
	className,
	children,
	...props
}: TimelineProps): React.JSX.Element {
	const [activeStep, setInternalStep] = useState(defaultValue);

	const setActiveStep = useCallback(
		(step: number) => {
			if (value === undefined) {
				setInternalStep(step);
			}
			onValueChange?.(step);
		},
		[value, onValueChange],
	);

	const currentStep = value ?? activeStep;

	return (
		<TimelineContext.Provider
			value={{ activeStep: currentStep, setActiveStep, orientation, variant }}
		>
			<div
				className={cn(
					"group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
					className,
				)}
				data-orientation={orientation}
				data-variant={variant}
				data-slot="timeline"
				{...props}
			>
				{children}
			</div>
		</TimelineContext.Provider>
	);
}

function TimelineContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
	return (
		<div
			className={cn("text-muted-foreground text-sm", className)}
			data-slot="timeline-content"
			{...props}
		/>
	);
}

interface TimelineDateProps extends TimeHTMLAttributes<HTMLTimeElement> {
	asChild?: boolean;
}

function TimelineDate({
	asChild = false,
	className,
	...props
}: TimelineDateProps): React.JSX.Element {
	const Comp = asChild ? Slot : "time";

	return (
		<Comp
			className={cn(
				"text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4",
				className,
			)}
			data-slot="timeline-date"
			{...props}
		/>
	);
}

function TimelineHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
	return (
		<div className={cn(className)} data-slot="timeline-header" {...props} />
	);
}

/** @deprecated Vertical timelines render the rail inside TimelineItem. */
function TimelineIndicator(_props: HTMLAttributes<HTMLDivElement>): null {
	return null;
}

interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
	step: number;
}

function TimelineItem({
	step,
	className,
	children,
	...props
}: TimelineItemProps): React.JSX.Element {
	const { activeStep, orientation, variant } = useTimeline();
	const isCompleted = variant === "events" || step <= activeStep;

	if (orientation === "horizontal") {
		return (
			<div
				className={cn(
					"group/timeline-item relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8",
					className,
				)}
				data-completed={isCompleted || undefined}
				data-slot="timeline-item"
				{...props}
			>
				{children}
			</div>
		);
	}

	return (
		<div
			className={cn("group/timeline-item flex gap-3", className)}
			data-completed={isCompleted || undefined}
			data-slot="timeline-item"
			{...props}
		>
			<div
				className="flex w-4 shrink-0 flex-col items-center self-stretch"
				aria-hidden
			>
				<div
					className={cn(
						"size-3.5 shrink-0 rounded-full border-2 bg-[hsl(var(--background))] shadow-sm",
						isCompleted
							? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] dark:border-[hsl(var(--ring))] dark:bg-[hsl(var(--ring))]"
							: "border-[hsl(var(--border))]",
					)}
					data-slot="timeline-indicator"
				/>
				<div
					className={cn(
						"w-0.5 min-h-4 flex-1 bg-[hsl(var(--border))]",
						"group-last/timeline-item:hidden",
					)}
					data-slot="timeline-separator"
				/>
			</div>
			<div
				className={cn(
					"flex min-w-0 flex-1 flex-col gap-1 pb-6",
					"group-last/timeline-item:pb-0",
				)}
			>
				{children}
			</div>
		</div>
	);
}

/** @deprecated Vertical timelines render the rail inside TimelineItem. */
function TimelineSeparator(_props: HTMLAttributes<HTMLDivElement>): null {
	return null;
}

function TimelineTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>): React.JSX.Element {
	return (
		<h3
			className={cn("text-sm font-medium", className)}
			data-slot="timeline-title"
			{...props}
		/>
	);
}

export {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
};
