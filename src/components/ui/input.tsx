import * as React from "react";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode;
}

const inputClassName =
	"h-10 w-full bg-background text-sm border border-input rounded-md " +
	"hover:bg-[hsl(var(--hover-ring))] hover:border-[hsl(var(--focus-ring))] " +
	"focus:outline-none focus:ring-ring focus:ring-offset-2 ring-offset-background " +
	"file:border-0 file:bg-transparent file:text-sm file:font-medium " +
	"placeholder:text-muted-foreground focus-visible:outline-none " +
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
	"disabled:cursor-not-allowed disabled:opacity-50";

const inputWithIconWrapperClassName =
	"flex h-10 w-full items-center gap-2 rounded-md border border-input " +
	"bg-background px-3 " +
	"hover:bg-[hsl(var(--hover-ring))] hover:border-[hsl(var(--focus-ring))] " +
	"focus-within:outline-none focus-within:ring-2 " +
	"focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background";

const inputWithIconInnerClassName =
	"min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-sm shadow-none " +
	"placeholder:text-muted-foreground focus:outline-none " +
	"focus-visible:outline-none focus-visible:ring-0 " +
	"disabled:cursor-not-allowed disabled:opacity-50 " +
	"file:border-0 file:bg-transparent file:text-sm file:font-medium";

/**
 * Displays a styled input field with optional leading icon.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter text..." />
 * <Input icon={<Search className="h-4 w-4" />} placeholder="Search..." />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, icon, type, ...props }, ref) => {
		if (icon) {
			return (
				<div
					data-slot="input-icon-wrapper"
					className={inputWithIconWrapperClassName}
				>
					<span
						data-slot="input-icon"
						className="pointer-events-none flex shrink-0 items-center text-muted-foreground"
					>
						{icon}
					</span>
					<input
						data-slot="input"
						type={type}
						className={cn(inputWithIconInnerClassName, className)}
						ref={ref}
						{...props}
					/>
				</div>
			);
		}

		return (
			<input
				data-slot="input"
				type={type}
				className={cn(inputClassName, "px-3 py-2", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
