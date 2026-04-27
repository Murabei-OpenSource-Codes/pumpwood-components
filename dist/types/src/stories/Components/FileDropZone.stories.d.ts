import type { StoryObj } from '@storybook/react-vite';
import FileDropzone from '@/components/FileDropzone';
declare const meta: {
    title: string;
    component: typeof FileDropzone;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const UploadCSV: Story;
