"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Stack from "@/components/Stack";

export const ErrorToastContent = ({
	message,
	error,
}: {
	message: string;
	error: string;
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		const errorJson = JSON.stringify(error, null, 2);
		navigator.clipboard.writeText(errorJson);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const errorJson = JSON.stringify(error, null, 2);

	return (
		<Stack>
			<p>{message}</p>
			<Accordion type="single" collapsible className="max-w-60">
				<AccordionItem value="error-details" className="border-none">
					<AccordionTrigger className="text-sm py-2 hover:no-underline text-red-100">
						View Error Details
					</AccordionTrigger>
					<AccordionContent>
						<pre className="text-xs bg-red-950 p-3 rounded overflow-x-auto max-h-40 overflow-y-auto">
							<code className="text-red-100">{errorJson}</code>
						</pre>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<button
				type="button"
				onClick={handleCopy}
				className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors"
			>
				{copied ? (
					<>
						<Check size={14} />
						<span>Copied!</span>
					</>
				) : (
					<>
						<Copy size={14} />
						<span>Copy Error JSON</span>
					</>
				)}
			</button>
		</Stack>
	);
};
