import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';

const meta = {
    title: 'Pumpwood/Components/ConfirmationDialog',
    component: ConfirmationDialog.Root,
} satisfies Meta<typeof ConfirmationDialog.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        open: true,
        onOpenChange: () => { },
        children: (<ConfirmationDialog.Content>
            <ConfirmationDialog.Header>
                <ConfirmationDialog.Title>Are you absolutely sure?</ConfirmationDialog.Title>
                <ConfirmationDialog.Description>
                    This action cannot be undone.This will permanently delete your account and remove your data from our servers.
                </ConfirmationDialog.Description>
            </ConfirmationDialog.Header>
            <ConfirmationDialog.Footer>
                <ConfirmationDialog.Cancel>Cancel </ConfirmationDialog.Cancel>
                <ConfirmationDialog.Action onClick={() => { }} className='bg-red-400 text-white'> Continue </ConfirmationDialog.Action>
            </ConfirmationDialog.Footer>
        </ConfirmationDialog.Content>)
    }
}
