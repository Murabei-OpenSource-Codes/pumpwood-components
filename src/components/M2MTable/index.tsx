"use client";

import { Trash } from "lucide-react";
import { type ComponentPropsWithoutRef, useState } from "react";
import useSWR from "swr";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
} from "../ui/dialog";
import { FKSelect, type FKFetcherParams } from "../FKSelect";
import Stack from "../Stack";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { DeleteDialog } from "../DeleteDialog";
import ErrorBoundary from "../ErrorBoundary";
import { NoResult } from "../NoResult";

export type M2MListFn = (
	modelClass: string,
	filterDict: Record<string, any>,
	fields: string[],
) => Promise<
	[Record<string, any>[] | null, { message?: string } | null]
>;

export const M2MCreateDialog = ({
	open,
	onOpenChange,
	targetModelClass,
	relationName,
	handleCreateNew,
	mutate,
	fkFetcher,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	targetModelClass: string;
	relationName: string;
	handleCreateNew: (id: string) => void;
	mutate: () => void;
	fkFetcher: (params: FKFetcherParams) => Promise<any[]>;
}) => {
	const [selectedPk, setSelectedPk] = useState<string>("");
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-3xl centered p-0 border-none bg-transparent shadow-none">
				<Stack
					gap={3}
					direction="row"
					className="w-full items-center justify-center"
				>
					<div className="flex flex-col gap-4 p-6 border border-gray-200 bg-white rounded-lg shadow-sm">
						<FKSelect
							fetcher={fkFetcher}
							modelClass={targetModelClass}
							labelName="description"
							placeholder={`Selecione um(a) ${relationName.toLocaleLowerCase()}`}
							emptyMessage={`Nenhum(a) ${relationName.toLocaleLowerCase()} encontrado(a)`}
							value={selectedPk}
							onChange={(value) => {
								setSelectedPk(String(value));
							}}
						/>

						<Button
							onClick={async () => {
								await handleCreateNew(selectedPk);
								onOpenChange(false);
								setSelectedPk("");
								mutate();
							}}
						>
							Salvar
						</Button>

						<Button
							variant="secondary"
							onClick={() => {
								onOpenChange(false);
								setSelectedPk("");
							}}
						>
							Cancelar
						</Button>
					</div>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

interface IM2MTableProps
	extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
	modelClass: string;
	targetModelClass: string;
	filterDict: Record<string, any>;
	targetField: string;
	relationName: string;
	displayFields: {
		name: string;
		field: string;
	}[];
	handleCreateNew: (id: string) => void;
	handleDeleteItem: (id: string) => void;
	fields: string[];
	listFn: M2MListFn;
	fkFetcher: (params: FKFetcherParams) => Promise<any[]>;
}

type ItemsFetcherKey = {
	modelClass: string;
	filterDict: Record<string, any>;
	fields: string[];
};

export const M2MTable = ({
	modelClass,
	targetModelClass,
	targetField,
	filterDict,
	relationName,
	fields,
	displayFields,
	handleCreateNew,
	handleDeleteItem,
	listFn,
	fkFetcher,
}: IM2MTableProps) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const itemsFetcher = async ({ modelClass, fields }: ItemsFetcherKey) => {
		const [result, error] = await listFn(modelClass, filterDict, [
			...fields,
			"pk",
		]);

		if (error) {
			console.error("==> ERROR m2m table: ", error);
		}

		if (targetField && Array.isArray(result) && result.length > 0) {
			const refactoredItems =
				result?.map((item) => ({ ...item[targetField], m2m: item.pk })) ?? [];
			return refactoredItems;
		}

		return [];
	};

	const swrKey: ItemsFetcherKey | null = modelClass
		? {
				modelClass,
				filterDict,
				fields,
			}
		: null;

	const {
		data: items,
		error,
		mutate,
	} = useSWR(swrKey, itemsFetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
		errorRetryCount: 3,
		errorRetryInterval: 1000,
	});

	const [itemToDelete, setItemToDelete] = useState<string | null>(null);

	return (
		<ErrorBoundary hasError={!!error}>
			<Accordion type="multiple" className="w-full">
				<AccordionItem value="details" className="border-b">
					<AccordionTrigger className="text-base font-normal text-surface-secondary hover:no-underline">
						{relationName} ({items?.length || 0})
					</AccordionTrigger>
					<AccordionContent className="px-4 pt-4">
						<Stack direction="row" className="justify-end mb-4">
							<Button onClick={() => setIsCreateDialogOpen(true)}>
								Adicionar {relationName.toLowerCase()}
							</Button>
						</Stack>
						{items && items.length > 0 ? (
							<Table className="table-auto w-full">
								<TableHeader className="sticky top-0 bg-primary text-white z-10">
									<TableRow>
										<TableHead className="px-2 py-4" key="pk">
											Id
										</TableHead>
										{displayFields.map((columnKey) => {
											return (
												<TableHead className="px-2 py-2" key={columnKey.field}>
													{columnKey.name}
												</TableHead>
											);
										})}
										<TableHead className="px-2 py-4 text-end">
											<div className="mr-6">Opções</div>
										</TableHead>
									</TableRow>
								</TableHeader>

								<TableBody>
									{items?.map((item: Record<string, any>, index: number) => (
										<TableRow
											className="cursor-pointer hover:bg-secondary"
											key={index}
										>
											<TableCell className="px-2" key="pk">
												{item.pk ?? "N/A"}
											</TableCell>
											{displayFields.map((field) => (
												<TableCell className="px-2" key={field.field}>
													{item[field.field] ?? "N/A"}
												</TableCell>
											))}
											<TableCell className="px-2 justify-end flex">
												<Button
													variant="ghost"
													size="icon"
													className="border text-muted-foreground mr-6"
													onClick={() => {
														setItemToDelete(item.m2m);
														setIsDeleteDialogOpen(true);
													}}
												>
													<Trash className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}

									<TableRow>
										<TableCell
											colSpan={displayFields.length}
											className="text-center py-6"
										></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						) : (
							<NoResult />
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<M2MCreateDialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
				targetModelClass={targetModelClass}
				relationName={relationName}
				handleCreateNew={handleCreateNew}
				mutate={mutate}
				fkFetcher={fkFetcher}
			/>

			<DeleteDialog
				handleDelete={async () => {
					if (!itemToDelete) return;
					await handleDeleteItem(itemToDelete);
					setIsDeleteDialogOpen(false);
					setItemToDelete(null);
					mutate();
				}}
				openDialog={isDeleteDialogOpen}
				setOpenDialog={setIsDeleteDialogOpen}
				count={1}
			/>
		</ErrorBoundary>
	);
};
