import "./markdown-editor.css";
export interface IMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
    /** Toast UI theme. Defaults to following the document `.dark` class. */
    theme?: "light" | "dark";
}
/**
 * WYSIWYG markdown editor wrapper around Toast UI Editor.
 */
export declare function MarkdownEditor({ value, onChange, placeholder, error, disabled, className, theme, }: IMarkdownEditorProps): import("react/jsx-runtime").JSX.Element;
