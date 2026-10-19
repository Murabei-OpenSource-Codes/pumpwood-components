import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

const meta = {
    title: "Pumpwood/Components/Drawer",
    component: Drawer,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                    <DrawerDescription>
                        Slide-in panel anchored to the right edge.
                    </DrawerDescription>
                </DrawerHeader>
                <p className="text-sm text-muted-foreground">
                    Default side is right.
                </p>
                <DrawerFooter>
                    <Button variant="outline">Clear</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    ),
};

export const Left: Story = {
    render: () => (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>Open left drawer</Button>
            </DrawerTrigger>
            <DrawerContent side="left">
                <DrawerHeader>
                    <DrawerTitle>Left drawer</DrawerTitle>
                    <DrawerDescription>
                        Slide-in panel anchored to the left edge.
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    ),
};

export const Controlled: Story = {
    render: function ControlledDrawer() {
        const [open, setOpen] = useState(false);

        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button>Open controlled drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Controlled</DrawerTitle>
                        <DrawerDescription>
                            Open state is managed by the parent.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    },
};
