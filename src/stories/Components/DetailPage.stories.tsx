import type { Meta, StoryObj } from "@storybook/react-vite";
import { AutoDetailContent, DetailPage } from "@/components/DetailPage";

const meta = {
    title: "Pumpwood/Components/DetailPage",
    component: DetailPage,
} satisfies Meta<typeof DetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleData = {
    pk: 1,
    description: "Exemplo de entidade",
    code: "ENT-001",
    notes: "Notas de exemplo",
    created_at: "2024-06-01T10:00:00Z",
    created_by: { __display_field__: "Admin" },
};

export const Default: Story = {
    render: () => (
        <DetailPage
            title="Entidade: #1"
            onBack={() => undefined}
            sections={[
                {
                    id: "details",
                    title: "Detalhes",
                    defaultOpen: true,
                    content: <AutoDetailContent data={sampleData} />,
                },
            ]}
        />
    ),
};
