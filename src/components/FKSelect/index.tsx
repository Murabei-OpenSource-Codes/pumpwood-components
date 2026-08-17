"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Combobox, type ComboboxItem } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

/**
 * Parameters passed to the FK fetcher function.
 */
export type FKFetcherParams = {
	search: string;
	modelClass: string;
	labelName: string;
	additionalFilters?: Record<string, any>;
	fields?: string[];
	limit?: number;
	offset?: number;
};

export type FKFetcherPageResult<T = unknown> = {
	items: T[];
	hasMore: boolean;
};

export type FKFetcherReturn<T = unknown> = T[] | FKFetcherPageResult<T>;

/**
 * Props for the FKSelect component.
 */
export interface IFKSelectProps {
	/** Optional id used as data-testid on the trigger. */
	id?: string;
	/** Function to fetch data from the API. */
	fetcher: (params: FKFetcherParams) => Promise<FKFetcherReturn>;
	/** Optional function to resolve a value not present in the list. */
	resolveValue?: (params: {
		modelClass: string;
		value: string | number;
	}) => Promise<any>;
	/** The model class name to identify the resource. */
	modelClass: string;
	/** The field name to use as the display label. */
	labelName: string;
	/** The field name to use as the value (ID). Defaults to 'pk'. */
	valueField?: string;
	/** Placeholder text for the search input. */
	placeholder?: string;
	/** Message to show when no items are found. */
	emptyMessage?: string;
	/** The currently selected value. */
	value: string | number | null;
	/** Callback when an item is selected. */
	onChange: (value: string | number, item?: any) => void;
	/** Additional filters to apply to the API request. */
	additionalFilters?: Record<string, any>;
	/** Extra fields to include in search. */
	fields?: string[];
	/** Optional class names for the wrapper (e.g. width overrides). */
	className?: string;
	/** Debounce time in ms. Defaults to 300. */
	debounceWait?: number;
	/** Page size for list requests. Defaults to 50. */
	pageSize?: number;
}

const EMPTY_ADDITIONAL_FILTERS: Record<string, any> = {};
const DEFAULT_PAGE_SIZE = 50;

function normalizeFetcherResult(
	data: unknown,
	pageSize: number,
): FKFetcherPageResult<unknown> {
	if (Array.isArray(data)) {
		return {
			items: data,
			hasMore: data.length === pageSize,
		};
	}

	if (data && typeof data === "object") {
		const record = data as { items?: unknown[]; hasMore?: boolean };
		if (Array.isArray(record.items)) {
			return {
				items: record.items,
				hasMore: record.hasMore ?? record.items.length === pageSize,
			};
		}
	}

	return { items: [], hasMore: false };
}

const formatItems = (
	data: any[],
	labelName: string,
	valueField: string,
): ComboboxItem[] => {
	if (!Array.isArray(data)) {
		return [];
	}

	return data.map((item) => ({
		value: item[valueField] ?? item.id ?? item.pk,
		label: String(item[labelName] ?? item.name ?? item.pk ?? ""),
		...item,
	}));
};

const mergeItems = (
	current: ComboboxItem[],
	incoming: ComboboxItem[],
): ComboboxItem[] => {
	const seen = new Set(current.map((item) => String(item.value)));
	const appended = incoming.filter((item) => {
		const key = String(item.value);
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});

	return [...current, ...appended];
};

/**
 * A foreign key select component (async combobox).
 *
 * @example
 * ```tsx
 * <FKSelect
 *   fetcher={fetchData}
 *   modelClass="User"
 *   labelName="username"
 *   value={userId}
 *   onChange={setUserId}
 * />
 * ```
 */
export const FKSelect = ({
	id,
	fetcher,
	resolveValue,
	modelClass,
	labelName,
	valueField = "pk",
	placeholder = "Select item...",
	emptyMessage = "No items found",
	value,
	onChange,
	additionalFilters = EMPTY_ADDITIONAL_FILTERS,
	fields,
	className,
	debounceWait = 300,
	pageSize = DEFAULT_PAGE_SIZE,
}: IFKSelectProps) => {
	const resolvedAdditionalFilters = useMemo(
		() => additionalFilters ?? EMPTY_ADDITIONAL_FILTERS,
		[additionalFilters],
	);
	const [items, setItems] = useState<ComboboxItem[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [displayLabel, setDisplayLabel] = useState<string | undefined>();
	const itemsRef = useRef<ComboboxItem[]>([]);
	const inFlightRef = useRef(false);
	const requestIdRef = useRef(0);
	const isOpenRef = useRef(false);
	const lastFetchedSearchRef = useRef<string | null>(null);

	useEffect(() => {
		itemsRef.current = items;
	}, [items]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchValue);
		}, debounceWait);

		return () => clearTimeout(timer);
	}, [searchValue, debounceWait]);

	const fetchPage = useCallback(
		async (offset: number, append: boolean) => {
			if (inFlightRef.current) {
				return;
			}

			inFlightRef.current = true;
			const requestId = requestIdRef.current + 1;
			requestIdRef.current = requestId;

			if (append) {
				setLoadingMore(true);
			} else {
				setLoading(true);
			}

			try {
				const data = await fetcher({
					search: debouncedSearch,
					modelClass,
					labelName,
					additionalFilters: resolvedAdditionalFilters,
					fields,
					limit: pageSize,
					offset,
				});

				if (requestId !== requestIdRef.current) {
					return;
				}

				const pageResult = normalizeFetcherResult(data, pageSize);
				const formatted = formatItems(pageResult.items, labelName, valueField);
				const merged = append
					? mergeItems(itemsRef.current, formatted)
					: formatted;
				setHasMore(pageResult.hasMore);
				setItems(merged);
			} catch (err) {
				console.error("FKSelect fetch error:", err);
				if (requestId !== requestIdRef.current) {
					return;
				}
				if (!append) {
					setItems([]);
				}
				setHasMore(false);
			} finally {
				if (requestId === requestIdRef.current) {
					inFlightRef.current = false;
					setLoading(false);
					setLoadingMore(false);
				}
			}
		},
		[
			fetcher,
			debouncedSearch,
			modelClass,
			labelName,
			resolvedAdditionalFilters,
			fields,
			valueField,
			pageSize,
		],
	);

	const triggerFetch = useCallback(
		(append: boolean) => {
			setHasMore(true);
			inFlightRef.current = false;
			fetchPage(append ? itemsRef.current.length : 0, append);
		},
		[fetchPage],
	);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			isOpenRef.current = open;

			if (!open) {
				return;
			}

			if (lastFetchedSearchRef.current === debouncedSearch) {
				return;
			}

			lastFetchedSearchRef.current = debouncedSearch;
			triggerFetch(false);
		},
		[debouncedSearch, triggerFetch],
	);

	useEffect(() => {
		if (!isOpenRef.current) {
			return;
		}

		if (lastFetchedSearchRef.current === debouncedSearch) {
			return;
		}

		lastFetchedSearchRef.current = debouncedSearch;
		triggerFetch(false);
	}, [debouncedSearch, triggerFetch]);

	const handleEndReached = useCallback(() => {
		if (!hasMore || loading || loadingMore || inFlightRef.current) {
			return;
		}

		fetchPage(itemsRef.current.length, true);
	}, [fetchPage, hasMore, loading, loadingMore]);

	const selectedLabel = items.find(
		(item) => String(item.value) === String(value),
	)?.label;

	useEffect(() => {
		if (!value) {
			setDisplayLabel(undefined);
			return;
		}

		if (selectedLabel) {
			setDisplayLabel(selectedLabel);
			return;
		}

		if (!resolveValue) {
			setDisplayLabel(undefined);
			return;
		}

		let active = true;

		resolveValue({ modelClass, value })
			.then((result) => {
				if (!active || !result) {
					return;
				}

				const label = String(result[labelName] ?? result.name ?? value);
				setDisplayLabel(label);
			})
			.catch((err) => {
				console.error("FKSelect resolve error:", err);
			});

		return () => {
			active = false;
		};
	}, [value, selectedLabel, resolveValue, modelClass, labelName]);

	const handleChange = (selectedValue: string, item: ComboboxItem | null) => {
		if (!item) {
			return;
		}

		onChange(selectedValue, item);
	};

	return (
		<div data-testid={id} className={cn("flex w-full min-w-0", className)}>
			<Combobox
				items={items}
				placeholder={placeholder}
				emptyMessage={emptyMessage}
				value={value ? String(value) : null}
				onChange={handleChange}
				onSearchChange={setSearchValue}
				filterLocally={false}
				loading={loading}
				loadingMore={loadingMore}
				hasMore={hasMore}
				onEndReached={handleEndReached}
				onOpenChange={handleOpenChange}
				displayLabel={displayLabel}
				className="w-full"
			/>
		</div>
	);
};
