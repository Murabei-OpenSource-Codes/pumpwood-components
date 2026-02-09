"use client";

import { type ReactNode, useCallback, useState } from "react";
import { type FileWithPath, useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";
import Stack from "../Stack";

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

type DropzoneProps = {
    children: ReactNode;
    maxFiles?: number;
    maxSize?: number;
    accept?: Record<string, string[]>;
    onFilesAccepted: (files: FileWithPath[]) => void;
};

/**
 * A drag-and-drop zone for file uploads.
 *
 * @example
 * ```tsx
 * <Dropzone onFilesAccepted={(files) => console.log(files)}>
 *   <Button>Upload</Button>
 * </Dropzone>
 * ```
 */
export default function PumpwoodDropzone({
    children,
    maxFiles = 1,
    maxSize = DEFAULT_MAX_SIZE,
    accept = {
        "text/csv": [".csv"],
    },
    onFilesAccepted,
}: DropzoneProps) {
    const [rejectedFiles, setRejectedFiles] = useState<FileWithPath[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[], fileRejections: any[]) => {
            // Handle rejected files
            const rejected = fileRejections.map(({ file }) => file);
            setRejectedFiles(rejected);

            // Process accepted files
            if (acceptedFiles.length > 0) {
                setAcceptedFiles(acceptedFiles);
                onFilesAccepted(acceptedFiles);
            }
        },
        [onFilesAccepted],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles,
        maxSize,
        accept,
        multiple: maxFiles > 1,
    });

    const removeRejected = (name: string) => {
        setRejectedFiles((files) => files.filter((file) => file.name !== name));
    };

    return (
        <div className="pw:space-y-4">
            <div
                {...getRootProps()}
                className={`pw:border-2 pw:border-dashed pw:rounded-lg pw:text-center pw:cursor-pointer pw:transition-colors ${isDragActive
                    ? "pw:border-blue-500 pw:bg-blue-50"
                    : "pw:border-gray-300 hover:pw:border-gray-400"
                    }`}
            >
                <input {...getInputProps()} />
                <div
                    className={cn(
                        acceptedFiles.length > 0 ? "pw:p-6 pw:bg-green-100" : "pw:p-6",
                        "pw:flex pw:flex-col pw:items-center pw:justify-center pw:gap-2",
                    )}
                >
                    {isDragActive && (
                        <p className="pw:font-medium pw:text-blue-500">Clique para selecionar os arquivos ou arraste-os aqui</p>
                    )}
                    {!isDragActive &&
                        acceptedFiles.length > 0 &&
                        acceptedFiles.map((file) => (
                            <Stack key={file.name}>
                                <p className="pw:font-medium">
                                    <b>Nome do arquivo:</b> {file.name}
                                </p>
                            </Stack>
                        ))}
                    {!isDragActive && acceptedFiles.length === 0 && (
                        <>
                            <p className="pw:font-medium">
                                Clique para selecionar os arquivos ou arraste-os aqui
                            </p>
                            <p className="pw:text-sm pw:text-gray-500">
                                {maxSize / 1024 / 1024}MB
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Button outside dropzone */}
            {acceptedFiles.length > 0 && <div className="pw:w-full">{children}</div>}

            {/* Rejected Files */}
            {rejectedFiles.length > 0 && (
                <div className="pw:text-sm pw:text-red-600">
                    <h4 className="pw:font-medium pw:mb-2">Rejected files:</h4>
                    <ul className="pw:space-y-1">
                        {rejectedFiles.map((file) => (
                            <li key={file.name} className="pw:flex pw:items-center pw:justify-between">
                                <span>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeRejected(file.name)}
                                    className="pw:text-red-800 hover:pw:text-red-900"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="pw:mt-1">
                        File must be {maxSize / 1024 / 1024}MB or smaller.
                    </p>
                </div>
            )}
        </div>
    );
}
