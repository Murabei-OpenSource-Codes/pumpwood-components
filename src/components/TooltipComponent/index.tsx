"use client";

import { useId } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

type TooltipComponentProps = {
	trigger: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	triggerClassName?: string;
};

export const TooltipComponent = ({
	triggerClassName,
	className,
	trigger,
	children,
}: TooltipComponentProps) => {
	const id = useId();

	return (
		<TooltipProvider key={id}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={triggerClassName}>{trigger}</div>
				</TooltipTrigger>
				<TooltipContent className={className}>{children}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
