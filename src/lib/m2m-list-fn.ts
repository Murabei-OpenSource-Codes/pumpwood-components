import type { M2MListFn } from "../design-system/M2MTable";

export type ListWithoutPagFn = (
	modelClass: string,
	body?: Record<string, unknown>,
	queryParams?: Record<string, string>,
) => Promise<
	[
		Record<string, unknown>[] | null,
		{ message?: string } | null,
	]
>;

export type CreateM2MListFnOptions = {
	orderBy?: string[];
};

/**
 * Creates a M2MListFn adapter over an injected list-without-pag function.
 */
export const createM2MListFn = (
	listWithoutPag: ListWithoutPagFn,
	options: CreateM2MListFnOptions = {},
): M2MListFn => {
	const orderBy = options.orderBy ?? ["created_at"];

	return async (modelClass, filterDict, fields) => {
		return listWithoutPag(
			modelClass,
			{
				filter_dict: filterDict,
				fields,
				order_by: orderBy,
			},
			{ foreign_key_fields: "true" },
		);
	};
};
