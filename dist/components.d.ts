import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { InputHTMLAttributes, ReactNode, HTMLAttributes, ComponentType } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { FileWithPath, Accept } from 'react-dropzone';
import { LucideIcon } from 'lucide-react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IFKSelectProps as IFKSelectProps$1 } from '@/components/FKSelect';
import { DayPicker } from 'react-day-picker';
import { Button as Button$1 } from '@/components/ui/button';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Command as Command$1 } from 'cmdk';
import { Dialog as Dialog$1 } from '@/components/ui/dialog';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { FieldError } from 'react-hook-form';
import * as SelectPrimitive from '@radix-ui/react-select';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React$1.ReactNode;
    label?: React$1.ReactNode;
    iconPosition?: "start" | "end";
    /** Button height in pixels or any valid CSS length. */
    height?: number | string;
    /** Button width in pixels or any valid CSS length. */
    width?: number | string;
}
/**
 * Displays a button or a component that looks like a button.
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="outline" size="sm">Action</Button>
 * <Button
 *   label="Criar novo lote"
 *   icon={<SquarePlus size={16} />}
 *   width={200}
 * />
 * ```
 */
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
}
/**
 * Displays a styled input field with optional leading icon.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter text..." />
 * <Input icon={<Search className="h-4 w-4" />} placeholder="Search..." />
 * ```
 */
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

declare const Textarea: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React$1.RefAttributes<HTMLTextAreaElement>>;

type StackProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    /** The direction of the stack. Defaults to 'col'. */
    direction?: "row" | "col";
    /** The gap between elements. Maps to Tailwind gap utility (e.g. 4 -> gap-4). */
    gap?: number;
    /** Click handler. When set, the stack becomes keyboard-accessible (role="button"). */
    onClick?: () => void;
    className?: string;
};
/**
 * A layout component that arranges children in a stack (vertical or horizontal).
 *
 * When `onClick` is provided, the stack receives `role="button"`, `tabIndex={0}`,
 * and responds to Enter and Space keys. Provide visible text or pass `aria-label`
 * via props for accessibility.
 *
 * @example
 * ```tsx
 * <Stack direction="row" gap={4}>
 *   <Button>Btn 1</Button>
 *   <Button>Btn 2</Button>
 * </Stack>
 * ```
 */
declare function Stack({ children, onClick, direction, gap, className, ...props }: StackProps): react_jsx_runtime.JSX.Element;

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
declare function Action$1({ children, onClick, variant, className, }: ActionProps): react_jsx_runtime.JSX.Element;
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
    Action: typeof Action$1;
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
 * A container for grouping related content.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 * ```
 */
declare const Card: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardContent: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

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
    Root: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
    Content: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
    Header: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
    Title: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
    Description: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
};

declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
/**
 * Displays a badge or a component that looks like a badge.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * ```
 */
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare const pumpwoodBadgeVariants: (props?: ({
    variant?: "destructive" | "secondary" | "warning" | "primary" | "muted" | null | undefined;
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
declare function PumpwoodBadge({ className, variant, size, ...props }: PumpwoodBadgeProps): React.JSX.Element;

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

interface IUseSidebarCollapseOptions {
    initialCollapsed?: boolean;
    onPersist?: (collapsed: boolean) => void;
}
/**
 * Hook for sidebar collapse state with optional persistence callback.
 */
declare function useSidebarCollapse({ initialCollapsed, onPersist, }?: IUseSidebarCollapseOptions): {
    isCollapsed: boolean;
    isCollapsing: boolean;
    expandedItems: Record<string, boolean>;
    setExpandedItems: React$1.Dispatch<React$1.SetStateAction<Record<string, boolean>>>;
    toggleCollapse: () => void;
    expand: () => void;
    handleTransitionEnd: () => void;
    toggleExpanded: (title: string) => void;
    setExpandedOnCollapse: () => void;
};

/**
 * Props for the Sidebar Root component.
 */
interface SidebarRootProps {
    /** The content of the sidebar. */
    children: ReactNode;
    /** Whether the sidebar is currently collapsed. */
    isCollapsed: boolean;
    /** Whether the sidebar is mid-collapse transition. */
    isCollapsing?: boolean;
    /** Callback to toggle the collapsed state. */
    onToggleCollapse: () => void;
    /** Callback when width transition ends. */
    onTransitionEnd?: () => void;
    /** Additional CSS classes. */
    className?: string;
}
declare function Root({ children, isCollapsed, isCollapsing, onToggleCollapse, onTransitionEnd, className, }: SidebarRootProps): react_jsx_runtime.JSX.Element;
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
    /** Logo width when the sidebar is collapsed. Defaults to 48. */
    collapsedWidth?: number;
    /** Logo height when the sidebar is collapsed. */
    collapsedHeight?: number;
    className?: string;
    ImageComponent?: ComponentType<{
        src: string;
        alt: string;
        width: number;
        height: number;
        className?: string;
    }>;
}
declare function Logo({ src, alt, width, height, collapsedWidth, collapsedHeight, className, ImageComponent, }: SidebarLogoProps): react_jsx_runtime.JSX.Element;
/**
 * Props for the Sidebar Link component.
 */
interface SidebarLinkProps {
    icon: LucideIcon;
    children: ReactNode;
    href: any;
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
interface SidebarNavGroupProps {
    icon: LucideIcon;
    title: string;
    isExpanded: boolean;
    isActive?: boolean;
    onToggle: () => void;
    children: ReactNode;
    className?: string;
}
declare function NavGroup({ icon: Icon, title, isExpanded, isActive, onToggle, children, className, }: SidebarNavGroupProps): react_jsx_runtime.JSX.Element;
interface SidebarNavSubLinkProps {
    title: string;
    href: string | Record<string, unknown>;
    active?: boolean;
    className?: string;
    LinkComponent?: ComponentType<{
        href: any;
        className?: string;
        children: ReactNode;
        title?: string;
    }>;
}
declare function NavSubLink({ title, href, active, className, LinkComponent, }: SidebarNavSubLinkProps): react_jsx_runtime.JSX.Element;
interface SidebarActionProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    className?: string;
}
declare function Action({ icon: Icon, label, onClick, className }: SidebarActionProps): react_jsx_runtime.JSX.Element;
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
    NavGroup: typeof NavGroup;
    NavSubLink: typeof NavSubLink;
    Action: typeof Action;
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
declare const Tabs: React$1.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Accordion: React$1.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

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

/**
 * Parameters passed to the FK fetcher function.
 */
type FKFetcherParams = {
    search: string;
    modelClass: string;
    labelName: string;
    additionalFilters?: Record<string, any>;
    fields?: string[];
    limit?: number;
    offset?: number;
};
/**
 * Props for the FKSelect component.
 */
interface IFKSelectProps {
    /** Optional id used as data-testid on the trigger. */
    id?: string;
    /** Function to fetch data from the API. */
    fetcher: (params: FKFetcherParams) => Promise<any[]>;
    /** Optional function to resolve a value not present in the list. */
    resolveValue?: (params: {
        modelClass: string;
        value: string | number;
    }) => Promise<any>;
    /** The model class name to identify the resource. */
    modelClass: string;
    /** The field name to use as the display label. */
    labelName: string;
    /** The field name to use as the value (ID). Defaults to 'pk'. */
    valueField?: string;
    /** Placeholder text for the search input. */
    placeholder?: string;
    /** Message to show when no items are found. */
    emptyMessage?: string;
    /** The currently selected value. */
    value: string | number | null;
    /** Callback when an item is selected. */
    onChange: (value: string | number, item?: any) => void;
    /** Additional filters to apply to the API request. */
    additionalFilters?: Record<string, any>;
    /** Extra fields to include in search. */
    fields?: string[];
    /** Optional class names for the wrapper (e.g. width overrides). */
    className?: string;
    /** Debounce time in ms. Defaults to 300. */
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
declare const FKSelect: ({ id, fetcher, resolveValue, modelClass, labelName, valueField, placeholder, emptyMessage, value, onChange, additionalFilters, fields, className, debounceWait, }: IFKSelectProps) => react_jsx_runtime.JSX.Element;

type Option = {
    value: string;
    label: string;
};
type SharedSelectProps = {
    /** Optional id used as data-testid on the trigger. */
    id?: string;
    /** Optional class names for the select wrapper (width, layout). */
    className?: string;
};
/**
 * Props for the static (default) Select variant.
 */
interface IStaticSelectProps extends SharedSelectProps {
    variant?: "static";
    /** Placeholder text when no value is selected. */
    placeholder: string;
    /** Static options with value and label. */
    options: Option[];
    /** Controlled selected value. */
    value?: string;
    /** Callback when the selected value changes. */
    onValueChange?: (value: string) => void;
    /** Marks the field as required in HTML forms. */
    required?: boolean;
    /** Name attribute for HTML form submission. */
    name?: string;
}
/**
 * Props for the FK variant of Select.
 */
interface ISelectFKProps extends IFKSelectProps$1 {
    variant: "fk";
}
/**
 * Props for the Select component (static or FK variant).
 */
type ISelectProps = IStaticSelectProps | ISelectFKProps;
/**
 * A reusable dropdown component built with shadcn/ui.
 *
 * Supports a static variant (Radix Select) and an FK variant (async
 * Combobox) for foreign-key fields.
 *
 * @example
 * ```tsx
 * <Select
 *   placeholder="Choose an option"
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B" },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 *
 * <Select
 *   variant="fk"
 *   fetcher={fetchUsers}
 *   modelClass="user"
 *   labelName="username"
 *   placeholder="Select user"
 *   value={userId}
 *   onChange={(id, item) => setUserId(id)}
 * />
 * ```
 */
declare const Select$1: (props: ISelectProps) => react_jsx_runtime.JSX.Element;

/**
 * Props for the DatePicker component.
 */
interface IDatePickerProps {
    /** Optional id used as data-testid on the trigger button. */
    id?: string;
    /** Placeholder text when no date is selected. */
    placeholder: string;
    /** Controlled ISO date string (empty = no selection). */
    value?: string;
    /** Callback when the selected date changes (ISO string or empty). */
    onValueChange?: (value: string) => void;
    /** Optional class names for the wrapper (width, layout). */
    className?: string;
    /** Day boundary when serializing to ISO. */
    boundary?: "start" | "end";
    /** Display format for the selected date. */
    dateFormat?: string;
}
/**
 * A reusable date picker built with shadcn/ui.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   placeholder="Data inicial"
 *   boundary="start"
 *   value={filters.created_at__gte}
 *   onValueChange={(value) =>
 *     onFiltersChange({ target: "created_at__gte", value })
 *   }
 * />
 * ```
 */
declare const DatePicker: ({ id, placeholder, value, onValueChange, className, boundary, dateFormat, }: IDatePickerProps) => react_jsx_runtime.JSX.Element;

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
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, ...props }: React$1.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React$1.ComponentProps<typeof Button$1>["variant"];
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
declare const Popover: React$1.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface ComboboxItem {
    value: any;
    label: string;
}
interface GenericComboboxProps extends Omit<React$1.ComponentPropsWithoutRef<"div">, "onChange"> {
    items: ComboboxItem[];
    value: string | null;
    onChange: (value: string, item: ComboboxItem | null) => void;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    searchPlaceholder?: string;
    onSearchChange?: (search: string) => void;
    filterLocally?: boolean;
    loading?: boolean;
    displayLabel?: string;
    disabled?: boolean;
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
declare function Combobox({ items, value, onChange, placeholder, emptyMessage, className, searchPlaceholder, onSearchChange, filterLocally, loading, displayLabel, disabled, }: GenericComboboxProps): react_jsx_runtime.JSX.Element;

/**
 * Column definition for Table.
 */
interface ITableColumn<T> {
    /** Row field key used to read cell value. */
    key: keyof T & string;
    /** Header label. */
    label: string;
    /** Tailwind width classes for head and cell. */
    width?: string;
    /** Extra classes for the header cell. */
    className?: string;
    /** Extra classes for the body cell. */
    cellClassName?: string;
    /** Whether the column supports sorting. */
    sortable?: boolean;
    /** Custom cell renderer. */
    render?: (value: unknown, row: T) => ReactNode;
}
/**
 * Props for the Table component.
 */
interface ITableProps<T> {
    /** Rows to display. */
    data: T[];
    /** Column configuration. */
    columns: ITableColumn<T>[];
    /** Returns a stable key for each row. */
    getRowKey: (row: T) => string | number;
    /** Current sort field; prefix with '-' for descending. */
    ordering?: string;
    /** Called when a sortable column header is clicked. */
    onSort?: (columnKey: string) => void;
    /** Called when a row is clicked. */
    onRowClick?: (row: T) => void;
    /** Whether a data request is in progress. */
    isLoading?: boolean;
    /** Whether more rows can be loaded. */
    hasMore?: boolean;
    /** Called when the load-more button is clicked. */
    onLoadMore?: () => void;
    /** Extra classes for the scroll wrapper. */
    className?: string;
}
/**
 * Generic data table with loading, empty, sort, and load-more states.
 *
 * @example
 * ```tsx
 * <Table
 *   data={items}
 *   columns={columns}
 *   getRowKey={(row) => row.pk}
 *   ordering={ordering}
 *   onSort={handleSort}
 *   isLoading={isLoading}
 *   hasMore={hasMore}
 *   onLoadMore={handleLoadMore}
 * />
 * ```
 */
declare function Table$1<T extends Record<string, unknown>>({ data, columns, getRowKey, ordering, onSort, onRowClick, isLoading, hasMore, onLoadMore, className, }: ITableProps<T>): react_jsx_runtime.JSX.Element;

interface ITableSkeletonColumn {
    /** Tailwind width classes matching the table column. */
    width?: string;
    /** Extra classes for the skeleton cell. */
    cellClassName?: string;
}
interface ITableSkeletonProps {
    /** Column layout or column count. */
    columns: ITableSkeletonColumn[] | number;
    /** Number of skeleton rows. Defaults to 5. */
    rows?: number;
}
/**
 * Skeleton rows rendered inside TableBody while data is loading.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableSkeleton columns={columns} rows={5} />
 * </TableBody>
 * ```
 */
declare function TableSkeleton({ columns, rows, }: ITableSkeletonProps): react_jsx_runtime.JSX.Element;

interface INoResultProps {
    /** Title shown in the empty state. */
    title?: string;
    /** Description shown in the empty state. */
    description?: string;
}
/**
 * Default empty state for tables and lists with no data.
 *
 * @example
 * ```tsx
 * <NoResult />
 * ```
 */
declare function NoResult({ title, description, }: INoResultProps): react_jsx_runtime.JSX.Element;

/**
 * A placeholder skeleton with pulse animation.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-[200px]" />
 * ```
 */
declare function Skeleton({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

/**
 * A modal dialog component.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Title</DialogTitle>
 *     <DialogDescription>Desc</DialogDescription>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
declare const Dialog: React$1.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogContent: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    showCloseButton?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Open</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
declare function AlertDialog({ ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function AlertDialogTrigger({ ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function AlertDialogPortal({ ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function AlertDialogOverlay({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Overlay>): react_jsx_runtime.JSX.Element;
declare function AlertDialogContent({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Description>): react_jsx_runtime.JSX.Element;
declare function AlertDialogAction({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Action>): react_jsx_runtime.JSX.Element;
declare function AlertDialogCancel({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Cancel>): react_jsx_runtime.JSX.Element;

/**
 * A command palette component.
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>
 *     <CommandItem>Action</CommandItem>
 *   </CommandList>
 * </Command>
 * ```
 */
declare function Command({ className, ...props }: React$1.ComponentProps<typeof Command$1>): react_jsx_runtime.JSX.Element;
declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: React$1.ComponentProps<typeof Dialog$1> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function CommandInput({ className, ...props }: React$1.ComponentProps<typeof Command$1.Input>): react_jsx_runtime.JSX.Element;
declare function CommandList({ className, ...props }: React$1.ComponentProps<typeof Command$1.List>): react_jsx_runtime.JSX.Element;
declare function CommandEmpty({ ...props }: React$1.ComponentProps<typeof Command$1.Empty>): react_jsx_runtime.JSX.Element;
declare function CommandGroup({ className, ...props }: React$1.ComponentProps<typeof Command$1.Group>): react_jsx_runtime.JSX.Element;
declare function CommandSeparator({ className, ...props }: React$1.ComponentProps<typeof Command$1.Separator>): react_jsx_runtime.JSX.Element;
declare function CommandItem({ className, ...props }: React$1.ComponentProps<typeof Command$1.Item>): react_jsx_runtime.JSX.Element;
declare function CommandShortcut({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const Label: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React$1.RefAttributes<HTMLLabelElement>>;

declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React$1.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Alert: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React$1.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLHeadingElement> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;

declare function Breadcrumb({ ...props }: React$1.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbList({ className, ...props }: React$1.ComponentProps<"ol">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...props }: React$1.ComponentProps<"a"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare const DropdownMenu: React$1.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React$1.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React$1.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Radio: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>>;

/**
 * Spinner component
 * @param size the size of the spinner in REM
 * @returns
 */
declare const Spinner: ({ size }: {
    size?: number;
}) => react_jsx_runtime.JSX.Element;

declare const ErrorMessage: ({ error }: {
    error: FieldError | undefined;
}) => react_jsx_runtime.JSX.Element;

declare const ErrorToastContent: ({ message, error, }: {
    message: string;
    error: string;
}) => react_jsx_runtime.JSX.Element;

interface IAlertWithIconProps {
    icon: ReactNode;
    title: string;
    description: string;
    variant?: "default" | "destructive";
    className?: string;
}
/**
 * Alert with icon, title and description.
 */
declare function AlertWithIcon({ icon, title, description, variant, className, }: IAlertWithIconProps): react_jsx_runtime.JSX.Element;

type DynamicListFn = (modelClass: string, filterDict: Record<string, unknown>, searchFields?: string[]) => Promise<[
    Record<string, unknown>[] | null,
    {
        message: string;
    } | null
]>;
type FKSelectFetcherParams = {
    search: string;
    modelClass: string;
    labelName: string;
    additionalFilters?: Record<string, unknown>;
    fields?: string[];
};
type CreateFKSelectFetcherOptions = {
    additionalFilters?: Record<string, unknown>;
    fields?: string[];
};
/**
 * Fetches FK select options via an injected dynamicList function.
 */
declare const fkSelectFetcher: (dynamicList: DynamicListFn, { search, modelClass, labelName, additionalFilters, fields, }: FKSelectFetcherParams) => Promise<Record<string, unknown>[]>;
/**
 * Creates a stable fetcher function for FKSelect.
 */
declare const createFKSelectFetcher: (dynamicList: DynamicListFn, labelName: string, options?: CreateFKSelectFetcherOptions) => (params: FKFetcherParams) => Promise<Record<string, unknown>[]>;

interface IMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}
/**
 * WYSIWYG markdown editor wrapper around Toast UI Editor.
 */
declare function MarkdownEditor({ value, onChange, placeholder, error, disabled, className, }: IMarkdownEditorProps): react_jsx_runtime.JSX.Element;

declare function Loading(): react_jsx_runtime.JSX.Element;

interface ErrorBoundaryProps {
    children: ReactNode;
    hasError: boolean;
    message?: string;
    className?: string;
}
declare const ErrorBoundary: ({ children, hasError, message, }: ErrorBoundaryProps) => react_jsx_runtime.JSX.Element;

/**
 * DeleteDialog - Confirmation dialog component for delete documents.
 */
declare const DeleteDialog: ({ openDialog, setOpenDialog, handleDelete, count, }: {
    openDialog: boolean;
    setOpenDialog: (value: boolean) => void;
    handleDelete: () => void;
    count?: number;
}) => react_jsx_runtime.JSX.Element;

declare const ClearButton: ({ handleClear }: {
    handleClear: () => void;
}) => react_jsx_runtime.JSX.Element;

type TooltipComponentProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    triggerClassName?: string;
};
declare const TooltipComponent: ({ triggerClassName, className, trigger, children, }: TooltipComponentProps) => react_jsx_runtime.JSX.Element;

type PaginationProps = {
    startRecord: number;
    endRecord: number;
    hasValidSearchValues: boolean;
    tabCount: number;
    disabledLoadBackButton: boolean;
    disabledLoadMoreButton: boolean;
    loadBack: () => void;
    loadMore: () => void;
};
declare const Pagination: ({ startRecord, endRecord, hasValidSearchValues, tabCount, disabledLoadBackButton, disabledLoadMoreButton, loadBack, loadMore, }: PaginationProps) => react_jsx_runtime.JSX.Element;

interface ITagItem {
    key: string;
    value: string;
}
interface ITagInputProps {
    value: ITagItem[];
    onChange: (tags: ITagItem[]) => void;
    keyPlaceholder?: string;
    valuePlaceholder?: string;
    disabled?: boolean;
}
declare function TagInput({ value, onChange, keyPlaceholder, valuePlaceholder, disabled, }: ITagInputProps): react_jsx_runtime.JSX.Element;

type ExpectedFile = {
    file: string;
};
type RetrieveFileFn = (modelClass: string, fileId: number) => Promise<[
    {
        data: number[];
        contentType: string;
    } | null,
    {
        message: string;
    } | null
]>;
interface IDownloadButtonProps<T extends ExpectedFile> {
    item: T;
    propertyName: keyof T;
    modelClass: string;
    retrieveFile: RetrieveFileFn;
}
declare const DownloadButton: <T extends ExpectedFile>({ item, modelClass, propertyName, retrieveFile, }: IDownloadButtonProps<T>) => react_jsx_runtime.JSX.Element;

interface IMultiSelectOption {
    label: string;
    value: string;
}
interface IMultiSelectDropdownProps {
    options: IMultiSelectOption[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
    maxDisplay?: number;
}
declare function MultiSelectDropdown({ options, selected, onChange, placeholder, className, maxDisplay, }: IMultiSelectDropdownProps): react_jsx_runtime.JSX.Element;

/**
 * A responsive table component.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Header</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Cell</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
declare const Table: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableElement> & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React$1.ForwardRefExoticComponent<React$1.ThHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React$1.ForwardRefExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCaptionElement> & React$1.RefAttributes<HTMLTableCaptionElement>>;

declare const Select: React$1.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AlertWithIcon, Badge, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Calendar, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, ClearButton, Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ConfirmationDialog, DatePicker, DeleteDialog, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DownloadButton, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, PumpwoodDropzone as Dropzone, Empty, EmptyContainer, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, ErrorBoundary, ErrorMessage, ErrorToastContent, FKSelect, FileDropzone, Input, Label, Loading, MarkdownEditor, MultiSelectDropdown, NoResult, Pagination, Popover, PopoverContent, PopoverTrigger, PumpwoodBadge, PumpwoodCard, Radio, Select$1 as Select, SelectContent, SelectGroup, SelectItem, SelectLabel, Select as SelectPrimitive, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Sidebar, Skeleton, Spinner, Stack, Table$1 as Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, Table as TablePrimitive, TableRow, TableSkeleton, Tabs, TabsContent, TabsList, TabsTrigger, TagInput, Textarea, Tooltip, TooltipComponent, TooltipContent, TooltipProvider, TooltipTrigger, Typography, badgeVariants, createFKSelectFetcher, fkSelectFetcher, pumpwoodBadgeVariants, useSidebarCollapse };
export type { ComboboxItem, CreateFKSelectFetcherOptions, DynamicListFn, FKFetcherParams, FKSelectFetcherParams, IAlertWithIconProps, IDatePickerProps, IFKSelectProps, IMarkdownEditorProps, IMultiSelectOption, ISelectFKProps, ISelectProps, IStaticSelectProps, ITableColumn, ITableProps, ITagItem, IUseSidebarCollapseOptions, RetrieveFileFn };
