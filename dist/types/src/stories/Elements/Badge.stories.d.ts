import type { StoryObj } from '@storybook/react-vite';
import { PumpwoodBadge } from '@/components/Badge';
declare const meta: {
    title: string;
    component: typeof PumpwoodBadge;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Warning: Story;
export declare const Destructive: Story;
export declare const Muted: Story;
