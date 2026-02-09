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
        <div className="pw:w-[600px]">
            <Tabs defaultValue="tab1" className="pw:w-full">
                <TabsList className="pw:grid pw:w-full pw:grid-cols-3">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="pw:mt-4">
                    <div className="pw:p-4 pw:border pw:rounded-lg">
                        <h3 className="pw:text-lg pw:font-semibold pw:mb-2">Tab 1 Content</h3>
                        <p className="pw:text-sm pw:text-muted-foreground">
                            This is the content for the first tab.
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="tab2" className="pw:mt-4">
                    <div className="pw:p-4 pw:border pw:rounded-lg">
                        <h3 className="pw:text-lg pw:font-semibold pw:mb-2">Tab 2 Content</h3>
                        <p className="pw:text-sm pw:text-muted-foreground">
                            This is the content for the second tab.
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="tab3" className="pw:mt-4">
                    <div className="pw:p-4 pw:border pw:rounded-lg">
                        <h3 className="pw:text-lg pw:font-semibold pw:mb-2">Tab 3 Content</h3>
                        <p className="pw:text-sm pw:text-muted-foreground">
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
        <div className="pw:w-[600px]">
            <Tabs defaultValue="series-temporais" className="pw:w-full pw:flex pw:flex-col pw:justify-center pw:items-center">
                <div className="pw:w-fit">
                    <TabsList className="pw:grid pw:w-fit pw:grid-cols-2">
                        <TabsTrigger value="series-temporais">Series Temporais</TabsTrigger>
                        <TabsTrigger value="resultados-modelo">Resultados do Modelo</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="series-temporais" className="pw:w-full">
                    <div className="pw:w-full pw:min-h-[300px] pw:border pw:rounded-lg pw:bg-card pw:p-4">
                        <h3 className="pw:text-lg pw:font-semibold pw:mb-2">Series Temporais</h3>
                        <p className="pw:text-sm pw:text-muted-foreground">
                            Content for time series data.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="resultados-modelo" className="pw:w-full">
                    <div className="pw:w-full pw:min-h-[300px] pw:border pw:rounded-lg pw:bg-card pw:p-4">
                        <h3 className="pw:text-lg pw:font-semibold pw:mb-2">Resultados do Modelo</h3>
                        <p className="pw:text-sm pw:text-muted-foreground">
                            Content for model results.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    ),
};
