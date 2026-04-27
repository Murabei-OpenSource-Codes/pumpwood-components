import { type Accept } from "react-dropzone";
interface FileDropzoneProps {
    onFileSelected: (file: File) => void;
    onFileDeleted?: () => void;
    acceptExtensions?: string[];
    accept?: Accept;
    maxSizeMB?: number;
}
/**
 * A specialized file dropzone with built-in preview and validation.
 *
 * @example
 * ```tsx
 * <FileDropzone
 *   onFileSelected={(file) => console.log(file)}
 *   maxSizeMB={5}
 *   acceptExtensions={['.pdf', '.docx']}
 * />
 * ```
 */
export default function FileDropzone({ onFileSelected, onFileDeleted, acceptExtensions, accept, maxSizeMB, }: FileDropzoneProps): import("react/jsx-runtime").JSX.Element;
export {};
