import type { ReactElement } from "react";
export interface PopConfirmProps {
    title: string;
    description?: string;
    children: ReactElement;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    disabled?: boolean;
    confirmVariant?: "default" | "destructive";
    confirmTestId?: string;
    cancelTestId?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}
/**
 * Confirmation popover anchored to a trigger element.
 *
 * @example
 * ```tsx
 * <PopConfirm
 *   title="Deseja continuar?"
 *   onConfirm={handleConfirm}
 * >
 *   <Button>Enriquecer</Button>
 * </PopConfirm>
 * ```
 */
export declare function PopConfirm({ title, description, children, onConfirm, onCancel, confirmText, cancelText, disabled, confirmVariant, confirmTestId, cancelTestId, side, align, }: PopConfirmProps): import("react/jsx-runtime").JSX.Element;
