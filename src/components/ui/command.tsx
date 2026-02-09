"use client";

import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function Command({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
    return (
        <CommandPrimitive
            data-slot="command"
            className={cn(
                "pw:bg-popover pw:text-popover-foreground pw:flex pw:h-full pw:w-full pw:flex-col pw:overflow-hidden pw:rounded-md",
                className,
            )}
            {...props}
        />
    );
}

function CommandDialog({
    title = "Command Palette",
    description = "Search for a command to run...",
    children,
    className,
    showCloseButton = true,
    ...props
}: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}) {
    return (
        <Dialog {...props}>
            <DialogHeader className="sr-only">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogContent className={cn("pw:overflow-hidden pw:p-0", className)}>
                <Command className="[&_[cmdk-group-heading]]:pw:text-muted-foreground **:data-[slot=command-input-wrapper]:pw:h-12 [&_[cmdk-group-heading]]:pw:px-2 [&_[cmdk-group-heading]]:pw:font-medium [&_[cmdk-group]]:pw:px-2 [&_[cmdk-group]:not([pw:hidden])_~[cmdk-group]]:pw:pt-0 [&_[cmdk-input-wrapper]_svg]:pw:h-5 [&_[cmdk-input-wrapper]_svg]:pw:w-5 [&_[cmdk-input]]:pw:h-12 [&_[cmdk-item]]:pw:px-2 [&_[cmdk-item]]:pw:py-3 [&_[cmdk-item]_svg]:pw:h-5 [&_[cmdk-item]_svg]:pw:w-5">
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
}

function CommandInput({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div
            data-slot="command-input-wrapper"
            className="pw:flex pw:h-9 pw:items-center pw:gap-2 pw:border-b pw:px-3"
        >
            <SearchIcon className="pw:size-4 pw:shrink-0 pw:opacity-50" />
            <CommandPrimitive.Input
                data-slot="command-input"
                className={cn(
                    "placeholder:pw:text-muted-foreground pw:flex pw:h-10 pw:w-full pw:rounded-md pw:bg-transparent pw:py-3 pw:text-sm pw:outline-hidden disabled:pw:cursor-not-allowed disabled:pw:opacity-50",
                    className,
                )}
                {...props}
            />
        </div>
    );
}

function CommandList({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className={cn(
                "pw:max-h-[300px] scroll-py-1 pw:overflow-x-hidden pw:overflow-y-auto",
                className,
            )}
            {...props}
        />
    );
}

function CommandEmpty({
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className="pw:py-6 pw:text-center pw:text-sm"
            {...props}
        />
    );
}

function CommandGroup({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className={cn(
                "pw:text-foreground [&_[cmdk-group-heading]]:pw:text-muted-foreground pw:overflow-hidden pw:p-1 [&_[cmdk-group-heading]]:pw:px-2 [&_[cmdk-group-heading]]:pw:py-1.5 [&_[cmdk-group-heading]]:pw:text-xs [&_[cmdk-group-heading]]:pw:font-medium",
                className,
            )}
            {...props}
        />
    );
}

function CommandSeparator({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className={cn("pw:bg-border -mx-1 pw:h-px", className)}
            {...props}
        />
    );
}

function CommandItem({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className={cn(
                "data-[selected=true]:pw:bg-accent data-[selected=true]:pw:text-accent-foreground [&_svg:not([class*='pw:text-'])]:pw:text-muted-foreground pw:relative pw:flex pw:cursor-default pw:items-center pw:gap-2 pw:rounded-sm pw:px-2 pw:py-1.5 pw:text-sm pw:outline-hidden select-none data-[disabled=true]:pw:pointer-events-none data-[disabled=true]:pw:opacity-50 [&_svg]:pw:pointer-events-none [&_svg]:pw:shrink-0 [&_svg:not([class*='pw:size-'])]:pw:size-4",
                className,
            )}
            {...props}
        />
    );
}

function CommandShortcut({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="command-shortcut"
            className={cn(
                "pw:text-muted-foreground pw:ml-auto pw:text-xs pw:tracking-widest",
                className,
            )}
            {...props}
        />
    );
}

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
