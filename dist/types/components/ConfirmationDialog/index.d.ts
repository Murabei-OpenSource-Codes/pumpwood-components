import type { ReactNode } from "react";
export interface RootProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}
declare function Root({ open, onOpenChange, children }: RootProps): import("react/jsx-runtime").JSX.Element;
export interface ContentProps {
    children: ReactNode;
    className?: string;
}
declare function Content({ children, className }: ContentProps): import("react/jsx-runtime").JSX.Element;
export interface HeaderProps {
    children: ReactNode;
}
declare function Header({ children }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export interface TitleProps {
    children: ReactNode;
}
declare function Title({ children }: TitleProps): import("react/jsx-runtime").JSX.Element;
export interface DescriptionProps {
    children: ReactNode;
}
declare function Description({ children }: DescriptionProps): import("react/jsx-runtime").JSX.Element;
export interface FooterProps {
    children: ReactNode;
}
declare function Footer({ children }: FooterProps): import("react/jsx-runtime").JSX.Element;
export interface ActionProps {
    children: ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive";
    className?: string;
}
declare function Action({ children, onClick, variant, className, }: ActionProps): import("react/jsx-runtime").JSX.Element;
export interface CancelProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}
declare function Cancel({ children, onClick, className }: CancelProps): import("react/jsx-runtime").JSX.Element;
/**
 * A dialog component for confirming actions (e.g., delete).
 *
 * @example
 * ```tsx
 * <ConfirmationDialog.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <ConfirmationDialog.Content>
 *     <ConfirmationDialog.Header>
 *       <ConfirmationDialog.Title>Are you sure?</ConfirmationDialog.Title>
 *       <ConfirmationDialog.Description>This action cannot be undone.</ConfirmationDialog.Description>
 *     </ConfirmationDialog.Header>
 *     <ConfirmationDialog.Footer>
 *       <ConfirmationDialog.Cancel onClick={() => setIsOpen(false)}>Cancel</ConfirmationDialog.Cancel>
 *       <ConfirmationDialog.Action onClick={handleDelete} variant="destructive">Delete</ConfirmationDialog.Action>
 *     </ConfirmationDialog.Footer>
 *   </ConfirmationDialog.Content>
 * </ConfirmationDialog.Root>
 * ```
 */
export declare const ConfirmationDialog: {
    Root: typeof Root;
    Content: typeof Content;
    Header: typeof Header;
    Title: typeof Title;
    Description: typeof Description;
    Footer: typeof Footer;
    Action: typeof Action;
    Cancel: typeof Cancel;
};
export {};
