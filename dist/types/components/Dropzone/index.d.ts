import { type ReactNode } from "react";
import { type FileWithPath } from "react-dropzone";
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
export default function PumpwoodDropzone({ children, maxFiles, maxSize, accept, onFilesAccepted, }: DropzoneProps): import("react/jsx-runtime").JSX.Element;
export {};
