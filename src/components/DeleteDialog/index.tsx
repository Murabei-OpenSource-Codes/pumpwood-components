import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import Stack from "../Stack";

/**
 * DeleteDialog - Confirmation dialog component for delete documents.
 */
export const DeleteDialog = ({
	openDialog,
	setOpenDialog,
	handleDelete,
	count,
}: {
	openDialog: boolean;
	setOpenDialog: (value: boolean) => void;
	handleDelete: () => void;
	count?: number;
}) => {
	const isMultiple = count !== undefined && count > 1;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleDelete();
	};

	return (
		<Stack direction="row">
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent className="max-w-[513px] rounded-xl px-8 py-6 gap-4">
					<DialogHeader>
						<DialogTitle className="pb-0 border-none">
							{isMultiple
								? `Deseja apagar ${count} registros selecionados?`
								: "Deseja apagar registro atual?"}
						</DialogTitle>

						<DialogDescription />
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<Stack gap={2}>
							<p className="text-fontcolor-secondary font-medium text-sm">
								{isMultiple
									? `Essa ação não poderá ser desfeita e os ${count} registros serão removidos permanentemente. Tem certeza de que deseja continuar?`
									: "Essa ação não poderá ser desfeita e o registro será removido permanentemente. Tem certeza de que deseja continuar?"}
							</p>

							<DialogFooter className="mt-4">
								<DialogClose asChild>
									<Button variant="ghost" type="button">
										Cancelar
									</Button>
								</DialogClose>
								<Button type="submit" variant="default">
									{isMultiple ? `Deletar ${count}` : "Deletar"}
								</Button>
							</DialogFooter>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
		</Stack>
	);
};
