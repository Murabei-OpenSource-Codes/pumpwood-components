import type { Meta, StoryObj } from "@storybook/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const meta = {
    title: "Pumpwood/Components/Accordion",
    component: Accordion,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="w-[600px]">
            <Accordion
                type="single"
                collapsible
                defaultValue="details"
                className="w-full"
            >
                <AccordionItem value="details" className="border-b">
                    <AccordionTrigger className="hover:no-underline text-base font-normal">
                        Detalhes
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                            Conteúdo do painel de detalhes.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};

export const MultipleSections: Story = {
    render: () => (
        <div className="w-[600px]">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="section-1" className="border-b">
                    <AccordionTrigger className="hover:no-underline text-base font-normal">
                        Seção 1
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                            Primeiro painel expansível.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="section-2" className="border-b">
                    <AccordionTrigger className="hover:no-underline text-base font-normal">
                        Seção 2
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                            Segundo painel expansível.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="section-3" className="border-b" disabled>
                    <AccordionTrigger className="hover:no-underline text-base font-normal">
                        Seção desabilitada
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                            Este conteúdo não deve ser acessível.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};
