"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import Stack from "@/components/Stack";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

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
export function PopConfirm({
	title,
	description,
	children,
	onConfirm,
	onCancel,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	disabled = false,
	confirmVariant = "default",
	confirmTestId,
	cancelTestId,
	side = "top",
	align = "center",
}: PopConfirmProps) {
	const [open, setOpen] = useState(false);
	const [isConfirming, setIsConfirming] = useState(false);

	const handleOpenChange = (nextOpen: boolean) => {
		if (disabled || isConfirming) {
			return;
		}

		setOpen(nextOpen);

		if (!nextOpen) {
			onCancel?.();
		}
	};

	const handleCancel = () => {
		setOpen(false);
		onCancel?.();
	};

	const handleConfirm = async () => {
		setIsConfirming(true);

		try {
			await onConfirm();
			setOpen(false);
		} finally {
			setIsConfirming(false);
		}
	};

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild disabled={disabled}>
				{children}
			</PopoverTrigger>
			<PopoverContent
				side={side}
				align={align}
				className="w-80 p-4"
				onOpenAutoFocus={(event) => event.preventDefault()}
			>
				<Stack gap={3}>
					<Stack gap={1}>
						<p className="text-sm font-medium text-foreground">{title}</p>
						{description ? (
							<p className="text-sm text-muted-foreground">{description}</p>
						) : null}
					</Stack>
					<Stack direction="row" gap={2} className="justify-end">
						<Button
							type="button"
							variant="secondary"
							size="sm"
							onClick={handleCancel}
							disabled={isConfirming}
							data-testid={cancelTestId}
						>
							{cancelText}
						</Button>
						<Button
							type="button"
							variant={
								confirmVariant === "destructive"
									? "destructive"
									: "default"
							}
							size="sm"
							onClick={handleConfirm}
							disabled={isConfirming}
							data-testid={confirmTestId}
						>
							{isConfirming ? "Confirmando..." : confirmText}
						</Button>
					</Stack>
				</Stack>
			</PopoverContent>
		</Popover>
	);
}
