import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const meta = {
    title: 'Pumpwood/Elements/Tooltip',
    component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Tooltip content</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ),
};
