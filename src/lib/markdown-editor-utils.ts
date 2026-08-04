const TOAST_UI_MARKDOWN_ESCAPE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;

const TOAST_UI_EDITOR_CHROME_LINES = new Set([
    "Write",
    "Preview",
    "Markdown",
    "WYSIWYG",
]);

/**
 * Removes tab/mode-switch labels leaked by Toast UI Editor into getMarkdown()
 * output when the editor initializes with empty content.
 */
export function stripToastUiEditorChrome(
    value: string,
    extraChromeLines: string[] = [],
): string {
    if (!value) {
        return value;
    }

    const isChromeLine = (line: string) =>
        TOAST_UI_EDITOR_CHROME_LINES.has(line) ||
        extraChromeLines.some((chromeLine) => chromeLine === line);

    const lines = value.split("\n");

    while (lines.length > 0) {
        const trimmedLine = lines[0].trim();

        if (!trimmedLine || isChromeLine(trimmedLine)) {
            lines.shift();
            continue;
        }

        break;
    }

    return lines.join("\n");
}

/**
 * Removes Markdown escape backslashes inserted by Toast UI Editor
 * when serializing WYSIWYG content via getMarkdown().
 */
export function unescapeToastUiMarkdown(value: string): string {
    if (!value) {
        return value;
    }

    return value.replace(TOAST_UI_MARKDOWN_ESCAPE, "$1");
}

/**
 * Normalizes Toast UI Editor markdown by removing UI chrome labels and
 * Markdown escape artifacts.
 */
export function sanitizeToastUiMarkdown(
    value: string,
    extraChromeLines: string[] = [],
): string {
    return unescapeToastUiMarkdown(
        stripToastUiEditorChrome(value, extraChromeLines),
    );
}
