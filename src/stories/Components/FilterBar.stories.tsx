import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { DatePicker } from '../../components/DatePicker';
import { Select } from '../../components/Select';
import { Input } from '../../components/ui/input';

const statusOptions = [
    { value: 'open', label: 'Aberto' },
    { value: 'in_progress', label: 'Em andamento' },
    { value: 'closed', label: 'Fechado' },
];

const mockUserFetcher = async ({
    search,
}: {
    search: string;
    modelClass: string;
}) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = [
        { pk: 1, username: 'alice' },
        { pk: 2, username: 'bob' },
        { pk: 3, username: 'carol' },
    ];
    if (!search) {
        return users;
    }
    return users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()),
    );
};

const FilterBar = () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | number | null>(null);

    return (
        <div className="flex flex-row flex-wrap items-center gap-2">
            <Input
                className="w-[220px]"
                icon={<Search className="size-4" />}
                placeholder="Buscar por descrição..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <Select
                className="w-[180px]"
                placeholder="Status do processo"
                options={statusOptions}
                value={status}
                onValueChange={setStatus}
            />
            <DatePicker
                className="w-[160px]"
                placeholder="Data inicial"
                boundary="start"
                value={startDate}
                onValueChange={setStartDate}
            />
            <DatePicker
                className="w-[160px]"
                placeholder="Data final"
                boundary="end"
                value={endDate}
                onValueChange={setEndDate}
            />
            <Select
                variant="fk"
                className="w-[140px]"
                fetcher={mockUserFetcher}
                modelClass="user"
                labelName="username"
                placeholder="Usuário"
                emptyMessage="Nenhum usuário encontrado"
                value={userId}
                onChange={(val) => setUserId(val)}
            />
        </div>
    );
};

const meta = {
    title: 'Pumpwood/Components/FilterBar',
    component: FilterBar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
