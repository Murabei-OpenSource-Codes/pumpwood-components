/**
 * Removes tab/mode-switch labels leaked by Toast UI Editor into getMarkdown()
 * output when the editor initializes with empty content.
 */
export declare function stripToastUiEditorChrome(value: string, extraChromeLines?: string[]): string;
/**
 * Removes Markdown escape backslashes inserted by Toast UI Editor
 * when serializing WYSIWYG content via getMarkdown().
 */
export declare function unescapeToastUiMarkdown(value: string): string;
/**
 * Normalizes Toast UI Editor markdown by removing UI chrome labels and
 * Markdown escape artifacts.
 */
export declare function sanitizeToastUiMarkdown(value: string, extraChromeLines?: string[]): string;
