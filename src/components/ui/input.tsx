import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

import { fieldTriggerClassName } from "@/lib/field-trigger";
import { cn } from "@/lib/utils";

export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode;
}

const inputClassName =
	fieldTriggerClassName +
	" file:border-0 file:bg-transparent file:text-sm file:font-medium " +
	"placeholder:text-muted-foreground";

const inputWithIconWrapperClassName =
	fieldTriggerClassName + " gap-2 focus-within:ring-2 " +
	"focus-within:ring-ring focus-within:ring-offset-2";

const inputWithIconInnerClassName =
	"min-h-0 min-w-0 w-auto flex-1 rounded-none border-0 bg-transparent p-0 " +
	"text-sm shadow-none placeholder:text-muted-foreground focus:outline-none " +
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
				className={cn(inputClassName, className)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
