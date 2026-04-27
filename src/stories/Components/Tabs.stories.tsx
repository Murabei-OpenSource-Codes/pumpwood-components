import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meta = {
    title: "Pumpwood/Components/Tabs",
    component: Tabs,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="w-[600px]">
            <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Tab 1 Content</h3>
                        <p className="text-sm text-muted-foreground">
                            This is the content for the first tab.
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Tab 2 Content</h3>
                        <p className="text-sm text-muted-foreground">
                            This is the content for the second tab.
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Tab 3 Content</h3>
                        <p className="text-sm text-muted-foreground">
                            This is the content for the third tab.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    ),
};

export const TwoTabs: Story = {
    render: () => (
        <div className="w-[600px]">
            <Tabs defaultValue="series-temporais" className="w-full flex flex-col justify-center items-center">
                <div className="w-fit">
                    <TabsList className="grid w-fit grid-cols-2">
                        <TabsTrigger value="series-temporais">Series Temporais</TabsTrigger>
                        <TabsTrigger value="resultados-modelo">Resultados do Modelo</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="series-temporais" className="w-full">
                    <div className="w-full min-h-[300px] border rounded-lg bg-card p-4">
                        <h3 className="text-lg font-semibold mb-2">Series Temporais</h3>
                        <p className="text-sm text-muted-foreground">
                            Content for time series data.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="resultados-modelo" className="w-full">
                    <div className="w-full min-h-[300px] border rounded-lg bg-card p-4">
                        <h3 className="text-lg font-semibold mb-2">Resultados do Modelo</h3>
                        <p className="text-sm text-muted-foreground">
                            Content for model results.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    ),
};
