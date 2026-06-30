import * as React from "react";

import { fieldTriggerClassName } from "@/lib/field-trigger";
import { cn } from "@/lib/utils";

const textareaClassName =
	fieldTriggerClassName +
	" h-auto min-h-[80px] items-start py-2 " +
	"placeholder:text-muted-foreground";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			data-slot="textarea"
			className={cn(textareaClassName, className)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
