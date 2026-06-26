import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipComponent } from "../TooltipComponent";

type PaginationProps = {
	startRecord: number;
	endRecord: number;
	hasValidSearchValues: boolean;
	tabCount: number;
	disabledLoadBackButton: boolean;
	disabledLoadMoreButton: boolean;
	loadBack: () => void;
	loadMore: () => void;
};

export const Pagination = ({
	startRecord,
	endRecord,
	hasValidSearchValues,
	tabCount,
	disabledLoadBackButton,
	disabledLoadMoreButton,
	loadBack,
	loadMore,
}: PaginationProps) => {
	return (
		<div className="flex items-center gap-2 text-fontcolor-secondary">
			<div className="text-sm">
				<p>
					{startRecord} - {endRecord} de{" "}
					{hasValidSearchValues ? endRecord : tabCount}
				</p>
			</div>
			<div className="h-[32px] flex items-center">
				<TooltipComponent
					className="bg-zinc-900 text-white"
					trigger={
						<Button
							variant="ghost"
							disabled={disabledLoadBackButton}
							onClick={() => loadBack()}
							type="button"
							className="bg-transparent p-0 text-fontcolor-secondary hover:bg-transparent"
						>
							<div className="w-[32px] h-[32px] bg-transparent flex items-center justify-center cursor-pointer rounded-md hover:bg-tablerow-hoverlink">
								<ChevronLeft size={16} />
							</div>
						</Button>
					}
				>
					Anteriores
				</TooltipComponent>

				<TooltipComponent
					className="bg-zinc-900 text-white"
					trigger={
						<Button
							variant="ghost"
							disabled={disabledLoadMoreButton}
							onClick={() => loadMore()}
							className="bg-transparent p-0 text-fontcolor-secondary hover:bg-transparent"
						>
							<div className="w-[32px] h-[32px] bg-transparent flex items-center justify-center cursor-pointer rounded-md hover:bg-tablerow-hoverlink">
								<ChevronRight size={16} />
							</div>
						</Button>
					}
				>
					Próximos
				</TooltipComponent>
			</div>
		</div>
	);
};
