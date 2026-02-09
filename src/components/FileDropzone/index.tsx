"use client";

import { FileText, Pencil, Trash2, Upload, UploadCloud } from "lucide-react";
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
        () => Object.values(computedAccept).reduce((acc, val) => acc.concat(val), [] as string[]).join(","),
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
        accept: computedAccept,
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
        input.accept = acceptString;

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const allowedExtensions = Object.values(computedAccept).reduce((acc, val) => acc.concat(val), [] as string[]);
            const isValidExtension = allowedExtensions.some((ext) =>
                file.name.toLowerCase().endsWith(ext.toLowerCase()),
            );

            if (!isValidExtension) {
                toast.error(`Invalid file type. Allowed: ${allowedExtensions.join(", ")}`);
                return;
            }

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
        <div className="pw:space-y-2">
            <p className="pw:font-bold">
                Envie um arquivo com até {maxSizeMB} MB.
            </p>

            {acceptedFile ? (
                <div className="pw:flex pw:items-center pw:justify-between pw:border pw:rounded-md pw:px-3 pw:py-2 pw:bg-white">
                    <div className="pw:flex pw:items-center pw:gap-2">
                        <FileText className="pw:h-4 pw:w-4 pw:text-gray-600" />
                        <span className="pw:text-sm">{acceptedFile.name}</span>
                    </div>
                    <div className="pw:flex pw:items-center pw:gap-1">
                        <button onClick={handleEditFile} className="pw:p-1 hover:pw:bg-gray-100 rounded">
                            <Pencil className="pw:h-4 pw:w-4" />
                        </button>
                        <button onClick={handleDeleteFile} className="pw:p-1 hover:pw:bg-red-50 rounded">
                            <Trash2 className="pw:h-4 pw:w-4 pw:text-red-600" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`pw:border pw:rounded-lg pw:text-center pw:cursor-pointer pw:transition-colors pw:h-[300px] ${isDragActive
                        ? "pw:border-blue-500 pw:bg-blue-50"
                        : "pw:border-gray-300 hover:pw:border-gray-400"
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="pw:py-16 pw:px-6 pw:flex pw:flex-col pw:items-center">
                        <UploadCloud strokeWidth={1} className="pw:size-[80px] pw:text-[#026CB6]" />
                        <p className="pw:text-muted">
                            Arraste e solte ou selecione um arquivo.
                        </p>
                        <p className="pw:text-muted">Arquivos aceitos:{acceptExtensions}</p>
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
