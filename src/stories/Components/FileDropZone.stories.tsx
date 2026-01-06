import type { Meta, StoryObj } from '@storybook/react-vite';
import FileDropzone from '@/components/FileDropzone';

const meta = {
    title: 'Pumpwood/Components/FileDropzone',
    component: FileDropzone,
} satisfies Meta<typeof FileDropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UploadCSV: Story = {
    args: {
        onFileSelected: (file) => console.log('File selected:', file),
    },
    render: (args) => {
        return (
            <FileDropzone
                maxSizeMB={1024}
                acceptExtensions={[".csv"]}
                {...args}
            />
        );
    },
};