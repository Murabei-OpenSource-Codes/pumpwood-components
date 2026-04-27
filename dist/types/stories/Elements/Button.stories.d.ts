import type { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("react").ButtonHTMLAttributes<HTMLButtonElement> & import("class-variance-authority").VariantProps<(props?: ({
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
        size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
    } & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
        asChild?: boolean;
    } & import("react").RefAttributes<HTMLButtonElement>>;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
