export interface IMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}
/**
 * WYSIWYG markdown editor wrapper around Toast UI Editor.
 */
export declare function MarkdownEditor({ value, onChange, placeholder, error, disabled, className, }: IMarkdownEditorProps): import("react/jsx-runtime").JSX.Element;
