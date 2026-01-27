"use client";

import { FKSelect } from "@/components/FKSelect";
import { cn } from "@/lib/utils";

export interface CreatedByUserFilterProps {

    value: string | number | null;
    onChange: (value: string | number, item?: any) => void;
    fetcher: (params: {
        search: string;
        modelClass: string;
        limit?: number;
        offset?: number;
    }) => Promise<any[]>;
    className?: string;
}

export const CreatedByUserFilter = ({
    value,
    onChange,
    fetcher,
    className,
}: CreatedByUserFilterProps) => {
    return (
        <FKSelect
            fetcher={fetcher}
            modelClass="User"
            className={cn("max-w-36 h-10", className)}
            placeholder="Creator user"
            emptyMessage="No user found"
            labelName="username"
            value={value}
            onChange={onChange}
        />
    );
};
