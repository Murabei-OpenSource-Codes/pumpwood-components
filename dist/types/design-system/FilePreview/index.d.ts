import type { ComponentType, ImgHTMLAttributes } from "react";
export type FileTypeCategory = "image" | "video" | "pdf" | "doc" | "excel" | "ppt" | "other";
interface FilePreviewProps {
    fileUrl: string;
    fileName: string;
    isLoading?: boolean;
    getFileType: (fileName: string) => FileTypeCategory;
    ImageComponent?: ComponentType<ImgHTMLAttributes<HTMLImageElement> & {
        fill?: boolean;
    }>;
}
export declare const FilePreview: ({ fileUrl, fileName, isLoading, getFileType, ImageComponent, }: FilePreviewProps) => import("react/jsx-runtime").JSX.Element;
export {};
