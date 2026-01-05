"use client";

import { FileText, Pencil, Trash2, Upload } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { type Accept, type FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const DEFAULT_ACCEPTED_FILE_TYPES: Accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "video/mp4": [".mp4"],
};

interface FileDropzoneProps {
    onFileSelected: (file: File) => void;
    onFileDeleted?: () => void;
    acceptExtensions?: string[];
    accept?: Accept;
    maxSizeMB?: number;
}


export default function FileDropzone({
    onFileSelected,
    onFileDeleted,
    acceptExtensions,
    accept,
    maxSizeMB = 25,
}: FileDropzoneProps) {
    const [acceptedFile, setAcceptedFile] = useState<FileWithPath | null>(null);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const computedAccept: Accept = useMemo(() => {
        if (accept) return accept;
        if (acceptExtensions?.length) {
            return extensionsToAccept(acceptExtensions);
        }
        return DEFAULT_ACCEPTED_FILE_TYPES;
    }, [accept, acceptExtensions]);

    const acceptString = useMemo(
        () => Object.values(computedAccept).flat().join(","),
        [computedAccept],
    );

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[], fileRejections: any[]) => {
            if (fileRejections.length > 0) {
                const { errors } = fileRejections[0];
                const error = errors[0];

                if (error.code === "file-too-large") {
                    toast.error(`File size must be under ${maxSizeMB} MB`);
                } else if (error.code === "file-invalid-type") {
                    toast.error(`Invalid file type. Allowed: ${acceptExtensions}`);
                } else {
                    toast.error(error.message);
                }
                return;
            }

            const file = acceptedFiles[0];
            if (!file) return;

            setAcceptedFile(file);

            onFileSelected(
                new File([file], file.name, {
                    type: file.type,
                    lastModified: file.lastModified,
                }),
            );

            toast.success(`File "${file.name}" selected successfully!`);
        },
        [onFileSelected, maxSizeMB, acceptExtensions],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: maxSizeBytes,
        accept,
        multiple: false,
    });

    const handleDeleteFile = () => {
        setAcceptedFile(null);
        onFileDeleted?.();
        toast.success("File removed");
    };

    const handleEditFile = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = acceptExtensions;

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            if (file.size > maxSizeBytes) {
                toast.error(`File size must be under ${maxSizeMB} MB`);
                return;
            }

            setAcceptedFile(file as FileWithPath);
            onFileSelected(file);
            toast.success(`File "${file.name}" selected successfully!`);
        };

        input.click();
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-700">
                Envie um arquivo com até {maxSizeMB} MB.
            </p>

            {acceptedFile ? (
                <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-white">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">{acceptedFile.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={handleEditFile} className="p-1 hover:bg-gray-100 rounded">
                            <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={handleDeleteFile} className="p-1 hover:bg-red-50 rounded">
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`border rounded-lg text-center cursor-pointer transition-colors ${isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="py-16 px-6 flex flex-col items-center gap-3">
                        <Upload className="h-16 w-16 text-blue-500" />
                        <p className="text-sm text-gray-700">
                            Arraste e solte ou selecione um arquivo.
                        </p>
                        <p className="text-xs text-gray-500">{acceptExtensions}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

const normalizeExtensions = (extensions: string[]): string[] =>
    extensions.map((ext) =>
        ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`,
    );

const extensionsToAccept = (extensions: string[]): Accept => ({
    "application/octet-stream": normalizeExtensions(extensions),
});
