import { Stack } from "@components/index";

export function KeyValueContent({ data }: { data: Record<string, any> }) {
	return (
		<Stack direction="row" gap={2} className="flex-wrap">
			{Object.entries(data).map(([key, value]) => (
				<Stack
					key={key}
					direction="row"
					gap={1}
					className="bg-muted px-3 py-1.5 rounded-md text-sm"
				>
					<span className="font-medium text-foreground">
						{key} : {String(value)}
					</span>
				</Stack>
			))}
		</Stack>
	);
}
