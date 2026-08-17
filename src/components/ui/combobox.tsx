"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
	loadingMore?: boolean;
	hasMore?: boolean;
	onEndReached?: () => void;
	onOpenChange?: (open: boolean) => void;
	displayLabel?: string;
	disabled?: boolean;
}

const LIST_END_THRESHOLD_PX = 32;
const DEFAULT_SEARCH_PLACEHOLDER = "Pesquisar...";
const DEFAULT_LOADING_MESSAGE = "Carregando...";

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
	searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
	onSearchChange,
	filterLocally = true,
	loading = false,
	loadingMore = false,
	hasMore = false,
	onEndReached,
	onOpenChange,
	displayLabel,
	disabled = false,
}: GenericComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");
	const [selectedItem, setSelectedItem] = React.useState<ComboboxItem | null>(
		null,
	);
	const autoLoadGuardRef = React.useRef(0);

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

	const filteredItems =
		filterLocally && searchValue
			? items?.filter((item) =>
					item.label.toLowerCase().includes(searchValue.toLowerCase()),
				)
			: items;

	const handleListScroll = (event: React.UIEvent<HTMLDivElement>) => {
		if (!onEndReached || !hasMore || loading || loadingMore) {
			return;
		}

		const target = event.currentTarget;
		if (target.scrollHeight <= target.clientHeight) {
			return;
		}

		const distanceToBottom =
			target.scrollHeight - target.scrollTop - target.clientHeight;

		if (distanceToBottom <= LIST_END_THRESHOLD_PX) {
			onEndReached();
		}
	};

	React.useLayoutEffect(() => {
		if (!open || !onEndReached || !hasMore || loading || loadingMore) {
			return;
		}

		const listElement = document.querySelector<HTMLDivElement>(
			'[data-cy="combobox-list"]',
		);
		if (!listElement) {
			return;
		}

		if (listElement.scrollHeight > listElement.clientHeight) {
			return;
		}

		const itemsSignature = items?.length ?? 0;
		if (autoLoadGuardRef.current === itemsSignature) {
			return;
		}

		autoLoadGuardRef.current = itemsSignature;
		onEndReached();
	}, [open, items, hasMore, loading, loadingMore, onEndReached]);

	const handleSelectedValue = (selectedValue: string, item: ComboboxItem) => {
		const selected = selectedValue === value ? null : item;
		onChange(selected?.value ?? "", selected);
		setOpen(false);
		setSearchValue("");
		setSelectedItem(selected);
	};

	const triggerLabel = displayLabel ?? selectedItem?.label ?? placeholder;

	const isPlaceholder = !displayLabel && !selectedItem;

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen);
		onOpenChange?.(nextOpen);
	};

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button
					type="button"
					data-cy="combobox-trigger"
					disabled={disabled || loading}
					aria-expanded={open}
					aria-busy={loading}
					className={cn(
						fieldTriggerClassName,
						"justify-between overflow-hidden",
						isPlaceholder && fieldTriggerPlaceholderClassName,
						className,
					)}
				>
					<span className="truncate min-w-0 flex-1 text-left">
						{triggerLabel}
					</span>
					{loading ? (
						<Loader2
							data-cy="combobox-loading"
							className="ml-2 size-4 shrink-0 animate-spin opacity-50"
						/>
					) : (
						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					)}
				</button>
			</PopoverTrigger>

			<PopoverContent className="max-w-[700px] p-0 w-full min-w-(--radix-popover-trigger-width)">
				<Command shouldFilter={false}>
					<CommandInput
						data-cy="combobox-input"
						placeholder={searchPlaceholder}
						value={searchValue}
						onValueChange={handleSearchChange}
					/>
					<CommandList data-cy="combobox-list" onScroll={handleListScroll}>
						{filteredItems?.length ? null : (
							<CommandEmpty>
								{loading ? DEFAULT_LOADING_MESSAGE : emptyMessage}
							</CommandEmpty>
						)}
						<CommandGroup>
							{filteredItems?.map((item) => (
								<CommandItem
									key={item?.value}
									value={String(item?.value ?? "")}
									onSelect={(selectedValue) =>
										handleSelectedValue(selectedValue, item)
									}
									className={cn("cursor-pointer", fieldOptionClassName)}
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
							{loadingMore ? (
								<div className="text-muted-foreground py-2 text-center text-sm">
									{DEFAULT_LOADING_MESSAGE}
								</div>
							) : null}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
