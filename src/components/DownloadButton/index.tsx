"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

type ExpectedFile = {
	file: string;
};

export type RetrieveFileFn = (
	modelClass: string,
	fileId: number,
) => Promise<
	[
		{ data: number[]; contentType: string } | null,
		{ message: string } | null,
	]
>;

interface IDownloadButtonProps<T extends ExpectedFile> {
	item: T;
	propertyName: keyof T;
	modelClass: string;
	retrieveFile: RetrieveFileFn;
}

export const DownloadButton = <T extends ExpectedFile>({
	item,
	modelClass,
	propertyName,
	retrieveFile,
}: IDownloadButtonProps<T>) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		setIsDownloading(true);
		try {
			const [data, error] = await retrieveFile(
				modelClass,
				Number(item[propertyName]),
			);

			if (error) {
				toast.error(`Houve algum problema: ${error.message}`);
				return;
			}

			if (!data) {
				toast.error("Nenhum arquivo encontrado");
				return;
			}

			const blob = new Blob([new Uint8Array(data.data)], {
				type: data.contentType,
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = item.file.split(/[\\/]/).pop() ?? item.file;
			document.body.appendChild(a);
			try {
				a.click();
			} finally {
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			}

			toast.success("Arquivo baixado com sucesso!");
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<Button
			variant="outline"
			size="icon"
			disabled={isDownloading}
			onClick={handleDownload}
		>
			{isDownloading ? <Loader2 className="animate-spin" /> : <Download />}
		</Button>
	);
};
