import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface ICustomBreadcrumbProps {
	label: string;
	steps?: string[];
}

export default function CustomBreadcrumb({
	label,
	steps = [],
}: ICustomBreadcrumbProps) {
	return (
		<Breadcrumb className="mb-6">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbPage className="text-primary font-medium">
						{label}
					</BreadcrumbPage>
				</BreadcrumbItem>

				{steps.map((step) => (
					<Fragment key={`step-fragment-${step}`}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className="text-muted-foreground">
								{step}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export { CustomBreadcrumb };
