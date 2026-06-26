"use client";

import { Download, File, FileText, ImageIcon } from "lucide-react";
import type { ComponentType, ImgHTMLAttributes } from "react";
import { Button } from "../ui/button";
import Stack from "../Stack";
import Loading from "../Loading";

export type FileTypeCategory =
	| "image"
	| "video"
	| "pdf"
	| "doc"
	| "excel"
	| "ppt"
	| "other";

interface FilePreviewProps {
	fileUrl: string;
	fileName: string;
	isLoading?: boolean;
	getFileType: (fileName: string) => FileTypeCategory;
	ImageComponent?: ComponentType<
		ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }
	>;
}

const downloadFile = (url: string, filename: string) => {
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const FilePreview = ({
	fileUrl,
	fileName,
	isLoading = false,
	getFileType,
	ImageComponent,
}: FilePreviewProps) => {
	if (isLoading) {
		return (
			<Stack
				direction="col"
				className="bg-secondary border border-border rounded-lg min-h-[600px] items-center justify-center"
			>
				<Loading />
			</Stack>
		);
	}

	if (!fileUrl || !fileName) {
		return (
			<Stack
				direction="col"
				className="bg-secondary border border-border rounded-lg min-h-[600px] items-center justify-center"
			>
				<ImageIcon className="w-16 h-16 text-muted-foreground" />
				<p className="text-sm text-muted-foreground mt-4">No file available</p>
			</Stack>
		);
	}

	const fileType = getFileType(fileName);

	const renderPreview = () => {
		switch (fileType) {
			case "image":
				return (
					<Stack
						direction="col"
						className="w-full h-full items-center justify-center relative"
					>
						{ImageComponent ? (
							<ImageComponent
								src={fileUrl}
								alt={fileName}
								fill
								className="object-contain"
							/>
						) : (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={fileUrl}
								alt={fileName}
								className="max-w-full max-h-full object-contain"
							/>
						)}
					</Stack>
				);

			case "video":
				return (
					<Stack
						direction="col"
						className="w-full h-full items-center justify-center relative"
					>
						<video
							src={fileUrl}
							controls
							className="w-full h-full object-contain"
						>
							<track kind="captions" />
							Your browser does not support the video tag.
						</video>
					</Stack>
				);

			case "pdf":
				return (
					<Stack
						direction="col"
						className="w-full h-full items-center justify-center relative"
					>
						<iframe
							src={fileUrl}
							className="w-full h-full border-0"
							title={fileName}
						/>
					</Stack>
				);

			case "doc":
			case "excel":
			case "ppt":
				return (
					<Stack
						direction="col"
						gap={4}
						className="items-center justify-center h-full p-8"
					>
						<FileText className="w-20 h-20 text-muted-foreground" />
						<Stack direction="col" gap={1} className="text-center">
							<p className="text-sm font-medium text-foreground">{fileName}</p>
							<p className="text-xs text-muted-foreground uppercase">
								{fileType} Document
							</p>
						</Stack>
						<Button
							variant="outline"
							size="default"
							className="mt-4"
							onClick={() => downloadFile(fileUrl, fileName)}
						>
							<Download className="w-4 h-4 mr-2" />
							Download
						</Button>
					</Stack>
				);

			default:
				return (
					<Stack
						direction="col"
						gap={4}
						className="items-center justify-center h-full p-8"
					>
						<File className="w-16 h-16 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">{fileName}</p>
						<Button
							variant="outline"
							size="sm"
							onClick={() => downloadFile(fileUrl, fileName)}
						>
							<Download className="w-4 h-4 mr-2" />
							Download
						</Button>
					</Stack>
				);
		}
	};

	return (
		<Stack
			direction="col"
			className="bg-secondary border border-border rounded-lg min-h-[600px] h-full overflow-hidden relative"
		>
			{renderPreview()}
		</Stack>
	);
};
