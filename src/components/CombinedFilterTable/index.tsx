"use client";

import { useState } from "react";
import { CreatedByUserFilter } from "@/components/Filters/CreatedByUserFilter";
import { DateRangeFilter } from "@/components/Filters/DateRangeFilter";
import { PumpwoodTable } from "@/components/Table";
import { format } from "date-fns";
import { EmptyContainer } from "../EmptyContainer";
import { Button } from "../ui/button";

export const CombinedFilterTable = () => {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [createdById, setCreatedById] = useState<string | number | null>(null);

    // Mock Data
    const allData = [
        { pk: 1, description: "Maintenance Task A", created_at: "2023-10-01", status: "Open", user_id: 1, username: "admin" },
        { pk: 2, description: "Inspection B", created_at: "2023-10-05", status: "Closed", user_id: 2, username: "jdoe" },
        { pk: 3, description: "Repair C", created_at: "2023-10-10", status: "In Progress", user_id: 1, username: "admin" },
        { pk: 4, description: "Log Analysis", created_at: "2023-10-15", status: "Open", user_id: 3, username: "guest" },
        { pk: 5, description: "System Update", created_at: "2023-11-01", status: "Pending", user_id: 2, username: "jdoe" },
    ];

    const mockFetcher = async ({ search, modelClass, limit, offset }: { search: string, modelClass: string, limit?: number, offset?: number }) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const users = [
            { pk: 1, username: 'admin' },
            { pk: 2, username: 'jdoe' },
            { pk: 3, username: 'guest' },
        ];
        if (!search) return users;
        return users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
    };

    // Filter Logic
    const filteredData = allData.filter(item => {
        let match = true;
        const itemDate = new Date(item.created_at);

        if (startDate && itemDate < startDate) match = false;
        if (endDate && itemDate > endDate) match = false;
        if (createdById && item.user_id !== Number(createdById)) match = false;

        return match;
    });

    return (
        <div className="flex flex-col gap-6 p-4 border rounded-lg bg-white">
            <h2 className="text-xl font-bold">Combined Filter & Table Demo</h2>

            <div className="flex flex-wrap gap-4 items-end">
                <DateRangeFilter
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                />
                <CreatedByUserFilter
                    fetcher={mockFetcher}
                    value={createdById}
                    onChange={(val) => setCreatedById(val)}
                />
                <Button
                    variant="outline"
                    className="h-full"
                    onClick={() => {
                        setStartDate(undefined);
                        setEndDate(undefined);
                        setCreatedById(null);
                    }}
                >
                    Clear Filters
                </Button>
            </div>

            <div className="border rounded-md overflow-hidden">
                <PumpwoodTable.Root>
                    <PumpwoodTable.Header>
                        <PumpwoodTable.Row>
                            <PumpwoodTable.Head>ID</PumpwoodTable.Head>
                            <PumpwoodTable.Head>Description</PumpwoodTable.Head>
                            <PumpwoodTable.Head>Created At</PumpwoodTable.Head>
                            <PumpwoodTable.Head>Created By</PumpwoodTable.Head>
                            <PumpwoodTable.Head>Status</PumpwoodTable.Head>
                        </PumpwoodTable.Row>
                    </PumpwoodTable.Header>
                    <PumpwoodTable.Body>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <PumpwoodTable.Row key={item.pk}>
                                    <PumpwoodTable.Cell>{item.pk}</PumpwoodTable.Cell>
                                    <PumpwoodTable.Cell>{item.description}</PumpwoodTable.Cell>
                                    <PumpwoodTable.Cell>{format(new Date(item.created_at), "PPP")}</PumpwoodTable.Cell>
                                    <PumpwoodTable.Cell>{item.username}</PumpwoodTable.Cell>
                                    <PumpwoodTable.Cell>{item.status}</PumpwoodTable.Cell>
                                </PumpwoodTable.Row>
                            ))
                        ) : (
                            <PumpwoodTable.Row>
                                <PumpwoodTable.Cell colSpan={5}>
                                    <EmptyContainer title="No results found" description="No data was found for the selected filters." />
                                </PumpwoodTable.Cell>
                            </PumpwoodTable.Row>
                        )}
                    </PumpwoodTable.Body>
                </PumpwoodTable.Root>
            </div>


            <div className="text-xs text-gray-400">
                Showing {filteredData.length} of {allData.length} records.
            </div>
        </div>
    );
};
