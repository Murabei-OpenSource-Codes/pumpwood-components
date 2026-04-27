import * as class_variance_authority_types from 'class-variance-authority/types';
import * as react from 'react';
import { HTMLAttributes, ReactNode, ComponentType } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { FileWithPath, Accept } from 'react-dropzone';
import { LucideIcon } from 'lucide-react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { DayPicker } from 'react-day-picker';
import { Button as Button$1 } from '@/components/ui/button';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/**
 * Displays a button or a component that looks like a button.
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="outline" size="sm">Action</Button>
 * ```
 */
declare const Button: react.ForwardRefExoticComponent<react.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    asChild?: boolean;
} & react.RefAttributes<HTMLButtonElement>>;

type StackProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    /** The direction of the stack. Defaults to 'col'. */
    direction?: "row" | "col";
    /** The gap between elements. Maps to Tailwind gap utility (e.g. 4 -> gap-4). */
    gap?: number;
    className?: string;
};
/**
 * A layout component that arranges children in a stack (vertical or horizontal).
 *
 * @example
 * ```tsx
 * <Stack direction="row" gap={4}>
 *   <Button>Btn 1</Button>
 *   <Button>Btn 2</Button>
 * </Stack>
 * ```
 */
declare function Stack({ children, direction, gap, className, ...props }: StackProps): react_jsx_runtime.JSX.Element;

type DropzoneProps = {
    children: ReactNode;
    maxFiles?: number;
    maxSize?: number;
    accept?: Record<string, string[]>;
    onFilesAccepted: (files: FileWithPath[]) => void;
};
/**
 * A drag-and-drop zone for file uploads.
 *
 * @example
 * ```tsx
 * <Dropzone onFilesAccepted={(files) => console.log(files)}>
 *   <Button>Upload</Button>
 * </Dropzone>
 * ```
 */
declare function PumpwoodDropzone({ children, maxFiles, maxSize, accept, onFilesAccepted, }: DropzoneProps): react_jsx_runtime.JSX.Element;

interface RootProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}
declare function Root$1({ open, onOpenChange, children }: RootProps): react_jsx_runtime.JSX.Element;
interface ContentProps {
    children: ReactNode;
    className?: string;
}
declare function Content$1({ children, className }: ContentProps): react_jsx_runtime.JSX.Element;
interface HeaderProps {
    children: ReactNode;
}
declare function Header$1({ children }: HeaderProps): react_jsx_runtime.JSX.Element;
interface TitleProps {
    children: ReactNode;
}
declare function Title({ children }: TitleProps): react_jsx_runtime.JSX.Element;
interface DescriptionProps {
    children: ReactNode;
}
declare function Description({ children }: DescriptionProps): react_jsx_runtime.JSX.Element;
interface FooterProps {
    children: ReactNode;
}
declare function Footer$1({ children }: FooterProps): react_jsx_runtime.JSX.Element;
interface ActionProps {
    children: ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive";
    className?: string;
}
declare function Action({ children, onClick, variant, className, }: ActionProps): react_jsx_runtime.JSX.Element;
interface CancelProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}
declare function Cancel({ children, onClick, className }: CancelProps): react_jsx_runtime.JSX.Element;
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
declare const ConfirmationDialog: {
    Root: typeof Root$1;
    Content: typeof Content$1;
    Header: typeof Header$1;
    Title: typeof Title;
    Description: typeof Description;
    Footer: typeof Footer$1;
    Action: typeof Action;
    Cancel: typeof Cancel;
};

type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
    children: ReactNode;
    className?: string;
};
declare function H1({ children, className, ...props }: TypographyProps): react_jsx_runtime.JSX.Element;
declare function Muted({ children, className, ...props }: TypographyProps): react_jsx_runtime.JSX.Element;
/**
 * Typography components for consistent text styling.
 *
 * @example
 * ```tsx
 * <Typography.H1>Main Title</Typography.H1>
 * <Typography.Muted>Subtitle text</Typography.Muted>
 * ```
 */
declare const Typography: {
    H1: typeof H1;
    Muted: typeof Muted;
};

/**
 * A Card component system for displaying content in boxes.
 *
 * @example
 * ```tsx
 * <Card.Root>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card Description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     <p>Card Content</p>
 *   </Card.Content>
 * </Card.Root>
 * ```
 */
declare const PumpwoodCard: {
    Root: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLDivElement> & react.RefAttributes<HTMLDivElement>>;
    Content: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLDivElement> & react.RefAttributes<HTMLDivElement>>;
    Header: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLDivElement> & react.RefAttributes<HTMLDivElement>>;
    Title: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLDivElement> & react.RefAttributes<HTMLDivElement>>;
    Description: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLDivElement> & react.RefAttributes<HTMLDivElement>>;
};

/**
 * A comprehensive Table component system.
 *
 * @example
 * ```tsx
 * <Table.Root>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.Head>ID</Table.Head>
 *       <Table.Head>Name</Table.Head>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>1</Table.Cell>
 *       <Table.Cell>John Doe</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table.Root>
 * ```
 */
declare const PumpwoodTable: {
    Root: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableElement> & react.RefAttributes<HTMLTableElement>>;
    Body: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableSectionElement> & react.RefAttributes<HTMLTableSectionElement>>;
    Cell: react.ForwardRefExoticComponent<react.TdHTMLAttributes<HTMLTableCellElement> & react.RefAttributes<HTMLTableCellElement>>;
    Head: react.ForwardRefExoticComponent<react.ThHTMLAttributes<HTMLTableCellElement> & react.RefAttributes<HTMLTableCellElement>>;
    Header: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableSectionElement> & react.RefAttributes<HTMLTableSectionElement>>;
    Row: react.ForwardRefExoticComponent<react.HTMLAttributes<HTMLTableRowElement> & react.RefAttributes<HTMLTableRowElement>>;
};

declare const pumpwoodBadgeVariants: (props?: ({
    variant?: "destructive" | "secondary" | "primary" | "warning" | "muted" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PumpwoodBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pumpwoodBadgeVariants> {
}
/**
 * A Badge component for status indicators and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="primary">New</Badge>
 * <Badge variant="destructive" size="sm">Error</Badge>
 * ```
 */
declare function PumpwoodBadge({ className, variant, size, ...props }: PumpwoodBadgeProps): react_jsx_runtime.JSX.Element;

interface FileDropzoneProps {
    onFileSelected: (file: File) => void;
    onFileDeleted?: () => void;
    acceptExtensions?: string[];
    accept?: Accept;
    maxSizeMB?: number;
}
/**
 * A specialized file dropzone with built-in preview and validation.
 *
 * @example
 * ```tsx
 * <FileDropzone
 *   onFileSelected={(file) => console.log(file)}
 *   maxSizeMB={5}
 *   acceptExtensions={['.pdf', '.docx']}
 * />
 * ```
 */
declare function FileDropzone({ onFileSelected, onFileDeleted, acceptExtensions, accept, maxSizeMB, }: FileDropzoneProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the Sidebar Root component.
 */
interface SidebarRootProps {
    /** The content of the sidebar. */
    children: ReactNode;
    /** Whether the sidebar is currently collapsed. */
    isCollapsed: boolean;
    /** Callback to toggle the collapsed state. */
    onToggleCollapse: () => void;
    /** Additional CSS classes. */
    className?: string;
}
declare function Root({ children, isCollapsed, onToggleCollapse, className, }: SidebarRootProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Header component.
 */
interface SidebarHeaderProps {
    children: ReactNode;
    className?: string;
}
declare function Header({ children, className }: SidebarHeaderProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Content component.
 */
interface SidebarContentProps {
    children: ReactNode;
    className?: string;
}
declare function Content({ children, className }: SidebarContentProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Footer component.
 */
interface SidebarFooterProps {
    children: ReactNode;
    className?: string;
}
declare function Footer({ children, className }: SidebarFooterProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Toggle component.
 */
interface SidebarToggleProps {
    className?: string;
}
declare function Toggle({ className }: SidebarToggleProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Logo component.
 */
interface SidebarLogoProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    ImageComponent?: ComponentType<{
        src: string;
        alt: string;
        width: number;
        height: number;
        className?: string;
    }>;
}
declare function Logo({ src, alt, width, height, className, ImageComponent, }: SidebarLogoProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Link component.
 */
interface SidebarLinkProps {
    icon: LucideIcon;
    children: ReactNode;
    href: string;
    active?: boolean;
    className?: string;
    LinkComponent?: ComponentType<{
        href: any;
        className?: string;
        children: ReactNode;
        title?: string;
    }>;
}
declare function Link({ icon: Icon, children, href, active, className, LinkComponent, }: SidebarLinkProps): react_jsx_runtime.JSX.Element;
/**
 * A composable Sidebar component.
 *
 * @example
 * ```tsx
 * const [collapsed, setCollapsed] = useState(false);
 *
 * return (
 *   <Sidebar.Root isCollapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)}>
 *     <Sidebar.Header>
 *       <Sidebar.Logo src="/logo.png" alt="Logo" />
 *       <Sidebar.Toggle />
 *     </Sidebar.Header>
 *     <Sidebar.Content>
 *       <Sidebar.Link icon={HomeIcon} href="/">Home</Sidebar.Link>
 *     </Sidebar.Content>
 *     <Sidebar.Footer>
 *        User Info
 *     </Sidebar.Footer>
 *   </Sidebar.Root>
 * )
 * ```
 */
declare const Sidebar: {
    Root: typeof Root;
    Header: typeof Header;
    Content: typeof Content;
    Footer: typeof Footer;
    Toggle: typeof Toggle;
    Logo: typeof Logo;
    Link: typeof Link;
};

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Content</TabsContent>
 * </Tabs>
 * ```
 */
declare const Tabs: react.ForwardRefExoticComponent<TabsPrimitive.TabsProps & react.RefAttributes<HTMLDivElement>>;
declare const TabsList: react.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: react.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & react.RefAttributes<HTMLButtonElement>, "ref"> & react.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: react.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

/**
 * A placeholder component for empty states.
 *
 * @example
 * ```tsx
 * <Empty>
 *   <EmptyHeader>
 *     <EmptyTitle>No data</EmptyTitle>
 *   </EmptyHeader>
 * </Empty>
 * ```
 */
declare function Empty({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const emptyMediaVariants: (props?: ({
    variant?: "default" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>): react_jsx_runtime.JSX.Element;
declare function EmptyTitle({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyDescription({ className, ...props }: React.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function EmptyContent({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

interface EmptyContainerProps {
    title: string;
    description: string;
}
/**
 * A container to display an empty state.
 *
 * @example
 * ```tsx
 * <EmptyContainer
 *   title="No Data"
 *   description="There are no items to display at this time."
 * />
 * ```
 */
declare function EmptyContainer({ title, description }: EmptyContainerProps): react_jsx_runtime.JSX.Element;

interface DateRangeFilterProps {
    startDate?: Date;
    endDate?: Date;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    startLabel?: string;
    endLabel?: string;
    className?: string;
}
/**
 * A date range picker filter component.
 *
 * @example
 * ```tsx
 * <DateRangeFilter
 *   startDate={startDate}
 *   endDate={endDate}
 *   onStartDateChange={setStartDate}
 *   onEndDateChange={setEndDate}
 * />
 * ```
 */
declare const DateRangeFilter: ({ startDate, endDate, onStartDateChange, onEndDateChange, startLabel, endLabel, className, }: DateRangeFilterProps) => react_jsx_runtime.JSX.Element;

interface CreatedByUserFilterProps {
    value: string | number | null;
    onChange: (value: string | number, item?: any) => void;
    fetcher: (params: {
        search: string;
        modelClass: string;
        limit?: number;
        offset?: number;
    }) => Promise<any[]>;
    className?: string;
}
/**
 * A filter component to select a user who created a resource.
 *
 * @example
 * ```tsx
 * <CreatedByUserFilter
 *   fetcher={fetchUsers}
 *   value={selectedUser}
 *   onChange={setSelectedUser}
 * />
 * ```
 */
declare const CreatedByUserFilter: ({ value, onChange, fetcher, className, }: CreatedByUserFilterProps) => react_jsx_runtime.JSX.Element;

/**
 * Props for the FKSelect component
 */
interface IFKSelectProps {
    /** FUNCTION to fetch data. Should return a promise resolving to an array of items */
    fetcher: (params: {
        search: string;
        modelClass: string;
        limit?: number;
        offset?: number;
    }) => Promise<any[]>;
    /** The model class name to identify the resource */
    modelClass: string;
    /** The field name to use as the display label from the fetched items */
    labelName: string;
    /** The field name to use as the value (ID) from the fetched items. Defaults to 'pk' or 'id' */
    valueField?: string;
    /** Placeholder text for the search input */
    placeholder?: string;
    /** Message to show when no items are found */
    emptyMessage?: string;
    /** The currently selected value */
    value: string | number | null;
    /** Callback function called when an item is selected */
    onChange: (value: string | number, item?: any) => void;
    /** Additional className */
    className?: string;
    /** Debounce time in ms. Defaults to 300 */
    debounceWait?: number;
}
/**
 * A foreign key select component (async combobox).
 *
 * @example
 * ```tsx
 * <FKSelect
 *   fetcher={fetchData}
 *   modelClass="User"
 *   labelName="username"
 *   value={userId}
 *   onChange={setUserId}
 * />
 * ```
 */
declare const FKSelect: ({ fetcher, modelClass, labelName, valueField, placeholder, emptyMessage, value, onChange, className, debounceWait, }: IFKSelectProps) => react_jsx_runtime.JSX.Element;

/**
 * A calendar component for date selection.
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   className="rounded-md border"
 * />
 * ```
 */
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, ...props }: react.ComponentProps<typeof DayPicker> & {
    buttonVariant?: react.ComponentProps<typeof Button$1>["variant"];
}): react_jsx_runtime.JSX.Element;

/**
 * A popover component for displaying rich content in a portal.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content</PopoverContent>
 * </Popover>
 * ```
 */
declare const Popover: react.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: react.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: react.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface ComboboxItem {
    value: any;
    label: string;
}
interface GenericComboboxProps extends Omit<react.ComponentPropsWithoutRef<"div">, "onChange"> {
    items: ComboboxItem[];
    value: string | null;
    onChange: (value: string, item: ComboboxItem | null) => void;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    searchPlaceholder?: string;
}
/**
 * A searchable select component (Combobox).
 *
 * @example
 * ```tsx
 * <Combobox
 *   items={[{ value: '1', label: 'Option 1' }]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 */
declare function Combobox({ items, value, onChange, placeholder, emptyMessage, className, searchPlaceholder, }: GenericComboboxProps): react_jsx_runtime.JSX.Element;

/**
 * A demonstration component combining filters and a table.
 *
 * @example
 * ```tsx
 * <CombinedFilterTable />
 * ```
 */
declare const CombinedFilterTable: () => react_jsx_runtime.JSX.Element;

export { PumpwoodBadge as Badge, Button, Calendar, PumpwoodCard as Card, CombinedFilterTable, Combobox, ConfirmationDialog, CreatedByUserFilter, DateRangeFilter, PumpwoodDropzone as Dropzone, Empty, EmptyContainer, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, FKSelect, FileDropzone, Popover, PopoverContent, PopoverTrigger, Sidebar, Stack, PumpwoodTable as Table, Tabs, TabsContent, TabsList, TabsTrigger, Typography };
export type { ComboboxItem };
