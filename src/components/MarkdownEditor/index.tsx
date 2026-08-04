"use client";

import type { ComponentType, Ref } from "react";
import Stack from "../Stack";
import { useEffect, useRef, useState } from "react";
import {
    sanitizeToastUiMarkdown,
} from "@/lib/markdown-editor-utils";
import "./markdown-editor.css";

export interface IMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

type ToastEditorInstance = {
    getInstance: () => {
        getMarkdown: () => string;
        reset: () => void;
        setMarkdown: (markdown: string) => void;
    };
};

type ToastEditorComponent = ComponentType<{
    initialValue: string;
    usageStatistics: boolean;
    autofocus: boolean;
    initialEditType: string;
    hideModeSwitch?: boolean;
    useCommandShortcut: boolean;
    onChange: () => void;
    onLoad: () => void;
    ref: Ref<ToastEditorInstance>;
}>;

function getEditorChromeLines(placeholder?: string): string[] {
    return placeholder ? [placeholder] : [];
}

function getInitialEditorValue(value: string, placeholder?: string): string {
    const sanitizedValue = sanitizeToastUiMarkdown(
        value,
        getEditorChromeLines(placeholder),
    );

    // Toast UI treats empty initialValue as invalid and leaks "Write/Preview".
    if (!sanitizedValue.trim()) {
        return " ";
    }

    return sanitizedValue;
}

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
    const isReadyRef = useRef(false);
    const [EditorComponent, setEditorComponent] =
        useState<ToastEditorComponent | null>(null);
    const chromeLines = getEditorChromeLines(placeholder);

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

    const handleChange = () => {
        if (!isReadyRef.current) {
            return;
        }

        const markdown =
            editorRef.current?.getInstance()?.getMarkdown() ?? "";
        onChange(sanitizeToastUiMarkdown(markdown, chromeLines));
    };

    const handleLoad = () => {
        const instance = editorRef.current?.getInstance();
        const sanitizedValue = sanitizeToastUiMarkdown(value, chromeLines);

        if (instance) {
            if (!sanitizedValue.trim()) {
                instance.reset();
            } else {
                instance.setMarkdown(sanitizedValue);
            }
        }

        window.requestAnimationFrame(() => {
            isReadyRef.current = true;
        });
    };

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
        <Stack
            direction="col"
            gap={2}
            className={`markdown-editor ${className ?? "w-full"}`}
        >
            <EditorComponent
                initialValue={getInitialEditorValue(value, placeholder)}
                usageStatistics={false}
                autofocus={false}
                initialEditType="wysiwyg"
                hideModeSwitch={true}
                useCommandShortcut={!disabled}
                onChange={handleChange}
                onLoad={handleLoad}
                ref={editorRef}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </Stack>
    );
}
