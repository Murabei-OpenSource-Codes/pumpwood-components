import { XIcon } from "lucide-react";
import Stack from "../Stack";

export const ClearButton = ({ handleClear }: { handleClear: () => void }) => {
	return (
		<button
			type="button"
			className="h-9 p-2 mt-1 text-xs bg-white"
			onClick={handleClear}
		>
			<Stack direction="row" gap={2} className="items-center">
				Limpar filtros <XIcon size={16} />
			</Stack>
		</button>
	);
};
