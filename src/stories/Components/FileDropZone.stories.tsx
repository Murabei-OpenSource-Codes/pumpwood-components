import type { Meta, StoryObj } from '@storybook/react-vite';
import FileDropzone from '@/components/FileDropzone';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const meta = {
    title: 'Pumpwood/Components/FileDropzone',
    component: FileDropzone,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof FileDropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UploadCSV: Story = {
    args: {
        onFileSelected: (file) => console.log('File selected:', file),
    },
    render: (args) => {
        return (
            <div className="p-8 max-w-2xl">
                <FileDropzone
                    maxSizeMB={1024}
                    acceptExtensions={[".csv"]}
                    {...args}
                />
            </div>
        );
    },
};