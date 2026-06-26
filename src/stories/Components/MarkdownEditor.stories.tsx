import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MarkdownEditor } from "@/components/MarkdownEditor";

const meta = {
    title: "Pumpwood/Components/MarkdownEditor",
    component: MarkdownEditor,
} satisfies Meta<typeof MarkdownEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState("**Hello** world");
        return (
            <MarkdownEditor
                value={value}
                onChange={setValue}
                placeholder="Digite o conteúdo..."
            />
        );
    },
};
