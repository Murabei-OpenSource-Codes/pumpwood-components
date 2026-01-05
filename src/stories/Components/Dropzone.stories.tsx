import type { Meta, StoryObj } from '@storybook/react-vite';
import PumpwoodDropzone from '@/components/Dropzone';
import PumpwoodButton from '@/components/Button';
import { useState } from 'react';

const meta = {
    title: 'Pumpwood/Components/PumpwoodDropzone',
    component: PumpwoodDropzone,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof PumpwoodDropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UploadCSV: Story = {
    args: {
        maxFiles: 1,
        accept: {
            "text/csv": [".csv"],
        },
        onFilesAccepted: (files) => console.log('Files accepted:', files),
        children: <PumpwoodButton>Upload Files</PumpwoodButton>,
    },
    render: (args) => {
        const [files, setFiles] = useState<File[]>([]);

        return (
            <div className="p-8 max-w-2xl">
                <PumpwoodDropzone
                    {...args}
                    onFilesAccepted={(acceptedFiles) => {
                        console.log('Files accepted:', acceptedFiles);
                        setFiles(acceptedFiles);
                    }}
                >
                    <PumpwoodButton>
                        Upload {files.length} file(s)
                    </PumpwoodButton>
                </PumpwoodDropzone>
            </div>
        );
    },
};

export const CustomSizeLimit: Story = {
    args: {
        maxSize: 1 * 1024 * 1024,
        accept: {
            "text/csv": [".csv"],
        },
        onFilesAccepted: (files) => console.log('Files accepted:', files),
        children: <PumpwoodButton>Upload Document</PumpwoodButton>,
    },
    render: (args) => {
        const [files, setFiles] = useState<File[]>([]);

        return (
            <div className="p-8 max-w-2xl">
                <PumpwoodDropzone
                    {...args}
                    onFilesAccepted={(acceptedFiles) => {
                        console.log('Files accepted:', acceptedFiles);
                        setFiles(acceptedFiles);
                    }}
                />
            </div>
        );
    },
};
