"use client";

import type { ReactNode } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export interface RootProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}

function Root({ open, onOpenChange, children }: RootProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{children}
		</AlertDialog>
	);
}

// Content component - wraps dialog content
export interface ContentProps {
	children: ReactNode;
	className?: string;
}

function Content({ children, className }: ContentProps) {
	return (
		<AlertDialogContent className={cn('bg-white', className)}>{children}</AlertDialogContent>
	);
}

// Header component - wraps title and description
export interface HeaderProps {
	children: ReactNode;
}

function Header({ children }: HeaderProps) {
	return <AlertDialogHeader>{children}</AlertDialogHeader>;
}

// Title component
export interface TitleProps {
	children: ReactNode;
}

function Title({ children }: TitleProps) {
	return <AlertDialogTitle>{children}</AlertDialogTitle>;
}

// Description component
export interface DescriptionProps {
	children: ReactNode;
}

function Description({ children }: DescriptionProps) {
	return <AlertDialogDescription>{children}</AlertDialogDescription>;
}

// Footer component - wraps action buttons
export interface FooterProps {
	children: ReactNode;
}

function Footer({ children }: FooterProps) {
	return <AlertDialogFooter>{children}</AlertDialogFooter>;
}

// Action component - confirm button
export interface ActionProps {
	children: ReactNode;
	onClick: () => void;
	variant?: "default" | "destructive";
	className?: string;
}

function Action({
	children,
	onClick,
	variant = "default",
	className = "",
}: ActionProps) {
	const variantClass =
		variant === "destructive"
			? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
			: "";

	return (
		<AlertDialogAction
			onClick={onClick}
			className={`${variantClass} ${className}`.trim()}
		>
			{children}
		</AlertDialogAction>
	);
}

// Cancel component - cancel button
export interface CancelProps {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}

function Cancel({ children, onClick, className }: CancelProps) {
	return (
		<AlertDialogCancel onClick={onClick} className={className}>
			{children}
		</AlertDialogCancel>
	);
}

// Export as namespace for composition
export const ConfirmationDialog = {
	Root,
	Content,
	Header,
	Title,
	Description,
	Footer,
	Action,
	Cancel,
};