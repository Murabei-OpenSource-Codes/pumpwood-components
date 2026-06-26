export interface ITagItem {
    key: string;
    value: string;
}
interface ITagInputProps {
    value: ITagItem[];
    onChange: (tags: ITagItem[]) => void;
    keyPlaceholder?: string;
    valuePlaceholder?: string;
    disabled?: boolean;
}
export default function TagInput({ value, onChange, keyPlaceholder, valuePlaceholder, disabled, }: ITagInputProps): import("react/jsx-runtime").JSX.Element;
export { TagInput };
