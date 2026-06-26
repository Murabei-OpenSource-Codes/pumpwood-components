"use client";

import type { ComponentType, Ref } from "react";
import Stack from "../Stack";
import { useEffect, useRef, useState } from "react";

export interface IMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

type ToastEditorInstance = {
    getMarkdown: () => string;
};

type ToastEditorComponent = ComponentType<{
    initialValue: string;
    placeholder?: string;
    usageStatistics: boolean;
    autofocus: boolean;
    initialEditType: string;
    previewStyle: string;
    useCommandShortcut: boolean;
    hideModeSwitch?: boolean;
    onChange: () => void;
    ref: Ref<ToastEditorInstance>;
}>;

/**
 * WYSIWYG markdown editor wrapper around Toast UI Editor.
 */
export function MarkdownEditor({
    value,
    onChange,
    placeholder,
    error,
    disabled,
    className,
}: IMarkdownEditorProps) {
    const editorRef = useRef<ToastEditorInstance>(null);
    const [EditorComponent, setEditorComponent] =
        useState<ToastEditorComponent | null>(null);

    useEffect(() => {
        let active = true;

        Promise.all([
            import("@toast-ui/react-editor"),
            import("@toast-ui/editor/dist/toastui-editor.css"),
        ]).then(([editorModule]) => {
            if (active) {
                setEditorComponent(
                    () =>
                        editorModule.Editor as unknown as ToastEditorComponent,
                );
            }
        });

        return () => {
            active = false;
        };
    }, []);

    if (!EditorComponent) {
        return (
            <Stack
                direction="col"
                gap={2}
                className={className ?? "w-full min-h-[200px]"}
            >
                <span />
            </Stack>
        );
    }

    return (
        <Stack direction="col" gap={2} className={className ?? "w-full"}>
            <EditorComponent
                initialValue={value}
                placeholder={placeholder}
                usageStatistics={false}
                autofocus={false}
                initialEditType="wysiwyg"
                previewStyle="disabled"
                useCommandShortcut={true}
                hideModeSwitch={disabled}
                onChange={() =>
                    onChange(editorRef.current?.getMarkdown() || "")
                }
                ref={editorRef}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </Stack>
    );
}
