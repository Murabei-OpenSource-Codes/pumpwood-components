import type { Meta, StoryObj } from "@storybook/react-vite";

import { PumpwoodBadge } from "@/components/Badge";
import {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineHeader,
	TimelineItem,
	TimelineTitle,
} from "@/components/ui/timeline";

const meta = {
	title: "Pumpwood/Components/Timeline",
	component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicVertical: Story = {
	render: () => (
		<Timeline defaultValue={3} className="w-full max-w-md">
			<TimelineItem step={1}>
				<TimelineHeader>
					<TimelineDate>March 2024</TimelineDate>
					<TimelineTitle>Project Initialized</TimelineTitle>
				</TimelineHeader>
				<TimelineContent>
					Successfully set up the project repository and initial
					architecture.
				</TimelineContent>
			</TimelineItem>
			<TimelineItem step={2}>
				<TimelineHeader>
					<TimelineDate>April 2024</TimelineDate>
					<TimelineTitle>Beta Release</TimelineTitle>
				</TimelineHeader>
				<TimelineContent>
					Launched the beta version for early testers and feedback.
				</TimelineContent>
			</TimelineItem>
			<TimelineItem step={3}>
				<TimelineHeader>
					<TimelineDate>June 2024</TimelineDate>
					<TimelineTitle>Official Launch</TimelineTitle>
				</TimelineHeader>
				<TimelineContent>
					The platform is now live for all users worldwide.
				</TimelineContent>
			</TimelineItem>
		</Timeline>
	),
};

const processUpdates = [
	{
		pk: 8001,
		isFixed: true,
		date: null,
		attribute: "Tipo processo",
		text: "Tipo de processo fixo ao iniciar",
		replica: "noreplica",
	},
	{
		pk: 8002,
		isFixed: false,
		date: "2024-06-15",
		attribute: "Movimentação",
		text: "Movimentação com data real no processo.",
		replica: "mov-999",
	},
];

export const ProcessUpdates: Story = {
	render: () => (
		<Timeline variant="events" className="w-full max-w-xl">
			{processUpdates.map((row, index) => (
				<TimelineItem key={row.pk} step={index + 1}>
					<TimelineHeader className="flex flex-wrap items-center gap-2">
						{row.isFixed ? (
							<PumpwoodBadge variant="secondary" size="sm">
								Informação fixa
							</PumpwoodBadge>
						) : (
							<TimelineDate dateTime={row.date ?? undefined}>
								{row.date}
							</TimelineDate>
						)}
						<PumpwoodBadge variant="muted" size="sm">
							{row.attribute}
						</PumpwoodBadge>
					</TimelineHeader>
					<TimelineContent className="text-foreground">
						{row.text}
						{row.replica ? (
							<span className="mt-1 block text-xs text-muted-foreground">
								Réplica: {row.replica}
							</span>
						) : null}
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	),
};
