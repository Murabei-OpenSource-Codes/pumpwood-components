type ExpectedFile = {
    file: string;
};
export type RetrieveFileFn = (modelClass: string, fileId: number) => Promise<[
    {
        data: number[];
        contentType: string;
    } | null,
    {
        message: string;
    } | null
]>;
interface IDownloadButtonProps<T extends ExpectedFile> {
    item: T;
    propertyName: keyof T;
    modelClass: string;
    retrieveFile: RetrieveFileFn;
}
export declare const DownloadButton: <T extends ExpectedFile>({ item, modelClass, propertyName, retrieveFile, }: IDownloadButtonProps<T>) => import("react/jsx-runtime").JSX.Element;
export {};
