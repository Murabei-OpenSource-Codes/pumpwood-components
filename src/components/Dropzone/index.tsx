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
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
            >
                <input {...getInputProps()} />
                <div
                    className={cn(
                        acceptedFiles.length > 0 ? "p-6 bg-green-100" : "p-6",
                        "flex flex-col items-center justify-center gap-2",
                    )}
                >
                    {isDragActive && (
                        <p className="font-medium text-blue-500">Clique para selecionar os arquivos ou arraste-os aqui</p>
                    )}
                    {!isDragActive &&
                        acceptedFiles.length > 0 &&
                        acceptedFiles.map((file) => (
                            <Stack key={file.name}>
                                <p className="font-medium">
                                    <b>Nome do arquivo:</b> {file.name}
                                </p>
                            </Stack>
                        ))}
                    {!isDragActive && acceptedFiles.length === 0 && (
                        <>
                            <p className="font-medium">
                                Clique para selecionar os arquivos ou arraste-os aqui
                            </p>
                            <p className="text-sm text-gray-500">
                                {maxSize / 1024 / 1024}MB
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Button outside dropzone */}
            {acceptedFiles.length > 0 && <div className="w-full">{children}</div>}

            {/* Rejected Files */}
            {rejectedFiles.length > 0 && (
                <div className="text-sm text-red-600">
                    <h4 className="font-medium mb-2">Rejected files:</h4>
                    <ul className="space-y-1">
                        {rejectedFiles.map((file) => (
                            <li key={file.name} className="flex items-center justify-between">
                                <span>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeRejected(file.name)}
                                    className="text-red-800 hover:text-red-900"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-1">
                        File must be {maxSize / 1024 / 1024}MB or smaller.
                    </p>
                </div>
            )}
        </div>
    );
}
