import {
    ChevronDown,
    PanelRightClose,
    PanelRightOpen,
    type LucideIcon,
} from "lucide-react";
import {
    createContext,
    useContext,
    type ComponentType,
    type ReactNode,
} from "react";
import Stack from "../Stack";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface SidebarContextType {
    isCollapsed: boolean;
    isCollapsing?: boolean;
    onToggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("Sidebar components must be used within a Sidebar.Root");
    }
    return context;
}

/**
 * Props for the Sidebar Root component.
 */
export interface SidebarRootProps {
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

function Root({
    children,
    isCollapsed,
    isCollapsing = false,
    onToggleCollapse,
    onTransitionEnd,
    className,
}: SidebarRootProps) {
    const sidebarWidth = isCollapsed
        ? "smaller:w-20 w-20"
        : "smaller:w-[232px] w-[232px]";

    return (
        <SidebarContext.Provider
            value={{ isCollapsed, isCollapsing, onToggleCollapse }}
        >
            <nav
                className={cn(
                    sidebarWidth,
                    "smaller:p-3 px-2 py-6 flex flex-col items-stretch bg-primary mb-2 rounded-lg transition-all duration-300 ease-in-out h-full min-h-0",
                    className,
                )}
                onTransitionEnd={onTransitionEnd}
            >
                {children}
            </nav>
        </SidebarContext.Provider>
    );
}

/**
 * Props for the Sidebar Header component.
 */
export interface SidebarHeaderProps {
    children: ReactNode;
    className?: string;
}

function Header({ children, className }: SidebarHeaderProps) {
    return (
        <div
            className={cn(
                "w-full flex justify-between items-center mb-8 gap-4",
                className
            )}
        >
            {children}
        </div>
    );
}

/**
 * Props for the Sidebar Content component.
 */
export interface SidebarContentProps {
    children: ReactNode;
    className?: string;
}

function Content({ children, className }: SidebarContentProps) {
    return (
        <Stack
            className={cn(
                "w-full flex-1 min-h-0 items-stretch gap-1 overflow-y-auto",
                className,
            )}
        >
            {children}
        </Stack>
    );
}

/**
 * Props for the Sidebar Footer component.
 */
export interface SidebarFooterProps {
    children: ReactNode;
    className?: string;
}

function Footer({ children, className }: SidebarFooterProps) {
    return <div className={cn("mt-auto w-full", className)}>{children}</div>;
}

/**
 * Props for the Sidebar Toggle component.
 */
export interface SidebarToggleProps {
    className?: string;
}

function Toggle({ className }: SidebarToggleProps) {
    const { isCollapsed, isCollapsing, onToggleCollapse } = useSidebar();
    const showCollapsed = isCollapsed && !isCollapsing;

    return (
        <div
            className={cn(
                "w-full flex transition-all duration-300 ease-in-out",
                showCollapsed ? "justify-center" : "justify-end",
                className,
            )}
        >
            <Button
                title={
                    showCollapsed
                        ? "Expandir Barra Lateral"
                        : "Recolher Barra Lateral"
                }
                height={48}
                className={cn(
                    "min-w-[48px] bg-transparent rounded-full hover:bg-white/5 transition-all duration-300 ease-in-out",
                    showCollapsed ? "justify-center" : "justify-end",
                )}
                onClick={onToggleCollapse}
            >
                {showCollapsed ? (
                    <PanelRightClose className="size-[28px] text-white" />
                ) : (
                    <PanelRightOpen className="size-[28px] text-white" />
                )}
            </Button>
        </div>
    );
}

/**
 * Props for the Sidebar Logo component.
 */
export interface SidebarLogoProps {
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

function Logo({
    src,
    alt,
    width = 200,
    height = 40,
    collapsedWidth = 48,
    collapsedHeight,
    className,
    ImageComponent = ({ src, alt, ...props }) => (
        <img src={src} alt={alt} {...props} />
    ),
}: SidebarLogoProps) {
    const { isCollapsed, isCollapsing } = useSidebar();
    const showCollapsed = isCollapsed && !isCollapsing;
    const displayWidth = showCollapsed ? collapsedWidth : width;
    const displayHeight = showCollapsed
        ? (collapsedHeight ??
          Math.max(16, Math.round((height / width) * collapsedWidth)))
        : height;

    return (
        <Stack
            className={cn(
                "w-full items-center justify-center py-2",
                className,
            )}
        >
            <ImageComponent
                className="object-contain transition-all duration-300 ease-in-out"
                src={src}
                width={displayWidth}
                height={displayHeight}
                alt={alt}
            />
        </Stack>
    );
}

/**
 * Props for the Sidebar Link component.
 */
export interface SidebarLinkProps {
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

function Link({
    icon: Icon,
    children,
    href,
    active,
    className,
    LinkComponent = ({ children, ...props }) => <a {...props}>{children}</a>,
}: SidebarLinkProps) {
    const { isCollapsed, isCollapsing } = useSidebar();

    return (
        <LinkComponent
            href={href}
            title={typeof children === "string" ? children : undefined}
            className={cn(
                "flex w-full h-12 smaller:p-3 p-4 font-bold text-white rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:bg-white/5",
                active ? "bg-white/5" : "",
                className,
            )}
        >
            <Stack direction="row" gap={2} className="w-full items-center">
                <Icon className="size-6 shrink-0" />
                {!isCollapsed && !isCollapsing && (
                    <span className="transition-opacity duration-300 ease-in-out opacity-100">
                        {children}
                    </span>
                )}
            </Stack>
        </LinkComponent>
    );
}

export interface SidebarNavGroupProps {
    icon: LucideIcon;
    title: string;
    isExpanded: boolean;
    isActive?: boolean;
    onToggle: () => void;
    children: ReactNode;
    className?: string;
}

function NavGroup({
    icon: Icon,
    title,
    isExpanded,
    isActive = false,
    onToggle,
    children,
    className,
}: SidebarNavGroupProps) {
    const { isCollapsed, isCollapsing } = useSidebar();

    return (
        <Stack className={cn("w-full gap-0", className)}>
            <Button
                type="button"
                title={title}
                onClick={onToggle}
                variant="ghost"
                height={48}
                className={cn(
                    "w-full smaller:p-3 p-4 font-bold text-white hover:bg-white/5 hover:text-white justify-start rounded-md transition-all duration-300 ease-in-out",
                    isActive ? "bg-white/5" : "",
                )}
            >
                <Stack
                    direction="row"
                    gap={2}
                    className="w-full items-center"
                >
                    <Icon className="size-6 shrink-0" />
                    {!isCollapsed && !isCollapsing && (
                        <>
                            <span className="flex-1 text-left transition-opacity duration-300 ease-in-out opacity-100 text-base">
                                {title}
                            </span>
                            <ChevronDown
                                width={20}
                                height={20}
                                className={cn(
                                    "shrink-0 transition-transform duration-300 ease-in-out",
                                    isExpanded ? "rotate-180" : "",
                                )}
                            />
                        </>
                    )}
                </Stack>
            </Button>

            {!isCollapsed && !isCollapsing && (
                <div
                    className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded
                            ? "max-h-96 opacity-100 mt-1"
                            : "max-h-0 opacity-0",
                    )}
                >
                    <Stack className="w-full gap-1 pl-9 pr-1">{children}</Stack>
                </div>
            )}
        </Stack>
    );
}

export interface SidebarNavSubLinkProps {
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

function NavSubLink({
    title,
    href,
    active = false,
    className,
    LinkComponent = ({ children, ...props }) => <a {...props}>{children}</a>,
}: SidebarNavSubLinkProps) {
    return (
        <LinkComponent
            href={href}
            title={title}
            className={cn(
                "flex w-full h-10 items-center px-3 text-sm text-white rounded-md transition-all duration-200 ease-in-out hover:bg-white/5",
                active ? "bg-white/10 font-semibold" : "",
                className,
            )}
        >
            {title}
        </LinkComponent>
    );
}

export interface SidebarActionProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    className?: string;
}

function Action({ icon: Icon, label, onClick, className }: SidebarActionProps) {
    const { isCollapsed, isCollapsing } = useSidebar();

    return (
        <Button
            title={label}
            onClick={onClick}
            variant="ghost"
            height={48}
            className={cn(
                "w-full smaller:p-3 p-4 font-bold text-white hover:bg-transparent hover:text-white/80 transition-all duration-300 ease-in-out justify-start",
                className,
            )}
        >
            <Stack direction="row" gap={2} className="w-full items-center">
                <Icon width={24} height={24} className="shrink-0" />
                {!isCollapsed && !isCollapsing && (
                    <span className="transition-opacity duration-300 ease-in-out opacity-100">
                        {label}
                    </span>
                )}
            </Stack>
        </Button>
    );
}

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
export const Sidebar = {
    Root,
    Header,
    Content,
    Footer,
    Toggle,
    Logo,
    Link,
    NavGroup,
    NavSubLink,
    Action,
};

export { useSidebarCollapse } from "./useSidebarCollapse";
export type { IUseSidebarCollapseOptions } from "./useSidebarCollapse";
