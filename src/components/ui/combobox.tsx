"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface ComboboxItem {
    value: any;
    label: string;
}

interface GenericComboboxProps
    extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
    items: ComboboxItem[];
    value: string | null;
    onChange: (value: string, item: ComboboxItem | null) => void;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    searchPlaceholder?: string;
}

export function Combobox({
    items,
    value,
    onChange,
    placeholder = "Select an option...",
    emptyMessage = "No items found.",
    className,
    searchPlaceholder = "Search...",
}: GenericComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState<ComboboxItem | null>();

    // const selectedItem = items?.find((item) => item.value === value) || null;

    const filteredItems = searchValue
        ? items?.filter((item) =>
            item.label.toLowerCase().includes(searchValue.toLowerCase()),
        )
        : items;

    const handleSelectedValue = (selectedValue: string, item: ComboboxItem) => {
        const selected = selectedValue === value ? null : item;
        onChange(selected?.value ?? "", selected);
        setOpen(false);
        setSearchValue("");
        setSelectedItem(selected);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    data-cy="combobox-trigger"
                    variant="outline"
                    aria-expanded={open}
                    className={cn(
                        "pw:w-full pw:justify-between truncate hover:pw:bg-slate-100",
                        className,
                    )}
                >
                    {selectedItem ? selectedItem?.label : placeholder}
                    <ChevronsUpDown className="pw:ml-2 pw:h-4 pw:w-4 pw:shrink-0 pw:opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="pw:max-w-[700px] pw:p-0 pw:w-full pw:min-w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput
                        data-cy="combobox-input"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onValueChange={setSearchValue}
                        className="pw:h-9 focus:pw:ring-0 focus:pw:outline-none focus-visible:pw:ring-0 focus-visible:pw:ring-offset-0" // removes the black outline
                    />
                    <CommandList data-cy="combobox-list">
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {filteredItems?.map((item) => (
                                <CommandItem
                                    key={item?.value}
                                    value={item?.value || ""}
                                    onSelect={(selectedValue) =>
                                        handleSelectedValue(selectedValue, item)
                                    }
                                    className="data-[selected=true]:pw:bg-slate-100"
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "pw:ml-auto pw:h-4 pw:w-4",
                                            value === item.value ? "pw:opacity-100" : "pw:opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
