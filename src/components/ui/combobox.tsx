"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
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
import {
    fieldOptionClassName,
    fieldTriggerClassName,
    fieldTriggerPlaceholderClassName,
} from "@/lib/field-trigger";
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
    onSearchChange?: (search: string) => void;
    filterLocally?: boolean;
    loading?: boolean;
    displayLabel?: string;
    disabled?: boolean;
}

/**
 * A searchable select component (Combobox).
 *
 * @example
 * ```tsx
 * <Combobox
 *   items={[{ value: '1', label: 'Option 1' }]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 */
export function Combobox({
    items,
    value,
    onChange,
    placeholder = "Select an option...",
    emptyMessage = "No items found.",
    className,
    searchPlaceholder = "Search...",
    onSearchChange,
    filterLocally = true,
    loading = false,
    displayLabel,
    disabled = false,
}: GenericComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [selectedItem, setSelectedItem] =
        React.useState<ComboboxItem | null>(null);

    React.useEffect(() => {
        if (!value || value === "") {
            setSelectedItem(null);
            return;
        }

        const fromItems = items?.find(
            (item) => String(item.value) === String(value),
        );

        if (fromItems) {
            setSelectedItem(fromItems);
        }
    }, [value, items]);

    const handleSearchChange = (nextSearch: string) => {
        setSearchValue(nextSearch);
        onSearchChange?.(nextSearch);
    };

    const filteredItems = filterLocally && searchValue
        ? items?.filter((item) =>
            item.label.toLowerCase().includes(searchValue.toLowerCase()),
        )
        : items;

    const handleSelectedValue = (
        selectedValue: string,
        item: ComboboxItem,
    ) => {
        const selected = selectedValue === value ? null : item;
        onChange(selected?.value ?? "", selected);
        setOpen(false);
        setSearchValue("");
        setSelectedItem(selected);
    };

    const triggerLabel = displayLabel
        ?? selectedItem?.label
        ?? placeholder;

    const isPlaceholder = !displayLabel && !selectedItem;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    data-cy="combobox-trigger"
                    disabled={disabled}
                    aria-expanded={open}
                    className={cn(
                        fieldTriggerClassName,
                        "justify-between truncate",
                        isPlaceholder && fieldTriggerPlaceholderClassName,
                        className,
                    )}
                >
                    <span className="truncate">{triggerLabel}</span>
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>

            <PopoverContent className="max-w-[700px] p-0 w-full min-w-(--radix-popover-trigger-width)">
                <Command shouldFilter={false}>
                    <CommandInput
                        data-cy="combobox-input"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onValueChange={handleSearchChange}
                        className="h-9 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <CommandList data-cy="combobox-list">
                        <CommandEmpty>
                            {loading ? "Loading..." : emptyMessage}
                        </CommandEmpty>
                        <CommandGroup>
                            {filteredItems?.map((item) => (
                                <CommandItem
                                    key={item?.value}
                                    value={String(item?.value ?? "")}
                                    onSelect={(selectedValue) =>
                                        handleSelectedValue(
                                            selectedValue,
                                            item,
                                        )
                                    }
                                    className={cn(
                                        "cursor-pointer",
                                        fieldOptionClassName,
                                    )}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto size-4",
                                            String(value) === String(item.value)
                                                ? "opacity-100"
                                                : "opacity-0",
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
