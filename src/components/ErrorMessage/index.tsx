"use client";

import type { FieldError } from "react-hook-form";

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
	return (
		<>
			{error && <span className="text-red-500 text-xs">{error?.message}</span>}
		</>
	);
};
