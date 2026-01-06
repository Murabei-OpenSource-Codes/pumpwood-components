import { ChartNoAxesGantt, Menu, PanelRightClose, PanelRightOpen, type LucideIcon } from "lucide-react";
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

export interface SidebarRootProps {
    children: ReactNode;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    className?: string;
}

function Root({
    children,
    isCollapsed,
    onToggleCollapse,
    className,
}: SidebarRootProps) {
    const sidebarWidth = isCollapsed ? "w-20" : "w-[232px]";

    return (
        <SidebarContext.Provider value={{ isCollapsed, onToggleCollapse }}>
            <nav
                className={cn(
                    sidebarWidth,
                    "py-6 px-4 flex flex-col items-center bg-primary mb-2 rounded-xl transition-all duration-300 ease-in-out h-full",
                    className
                )}
            >
                {children}
            </nav>
        </SidebarContext.Provider>
    );
}

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

export interface SidebarContentProps {
    children: ReactNode;
    className?: string;
}

function Content({ children, className }: SidebarContentProps) {
    return (
        <Stack className={cn("w-full items-baseline gap-1", className)}>
            {children}
        </Stack>
    );
}

export interface SidebarFooterProps {
    children: ReactNode;
    className?: string;
}

function Footer({ children, className }: SidebarFooterProps) {
    return <div className={cn("mt-auto w-full", className)}>{children}</div>;
}

export interface SidebarToggleProps {
    className?: string;
}

function Toggle({ className }: SidebarToggleProps) {
    const { isCollapsed, onToggleCollapse } = useSidebar();

    return (
        <div
            className={cn(
                "w-full flex transition-all duration-300 ease-in-out",
                !isCollapsed ? "justify-end" : "justify-center",
                className
            )}
        >
            <Button
                title="Recolher Barra Lateral"
                className={cn(
                    "size-[40px] bg-transparent rounded-full hover:bg-white/5 transition-all duration-300 ease-in-out",
                    !isCollapsed ? "justify-end" : "justify-center"
                )}
                onClick={onToggleCollapse}
            >
                {isCollapsed ? (
                    <Menu className="size-[32px] text-white" />
                ) : (
                    <ChartNoAxesGantt className="size-[32px] text-white" />
                )}
            </Button>
        </div>
    );
}

export interface SidebarLogoProps {
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

function Logo({
    src,
    alt,
    width = 200,
    height = 40,
    className,
    ImageComponent = ({ src, alt, ...props }) => (
        <img src={src} alt={alt} {...props} />
    ),
}: SidebarLogoProps) {
    const { isCollapsed } = useSidebar();

    return (
        <Stack className={cn("py-2", className)}>
            <ImageComponent
                className={cn(
                    "transition-opacity duration-300 ease-in-out",
                    isCollapsed ? "opacity-0 invisible" : "opacity-100"
                )}
                src={src}
                width={width}
                height={height}
                alt={alt}
            />
        </Stack>
    );
}

export interface SidebarLinkProps {
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

function Link({
    icon: Icon,
    children,
    href,
    active,
    className,
    LinkComponent = ({ children, ...props }) => <a {...props}>{children}</a>,
}: SidebarLinkProps) {
    const { isCollapsed } = useSidebar();

    return (
        <LinkComponent
            href={href}
            title={typeof children === "string" ? children : undefined}

            className={cn(
                "w-full h-[48px] p-3 font-bold text-white rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:bg-white/5 flex items-center",
                active ? "bg-white/5" : "",
                className,
                !isCollapsed ? "px-6 py-3" : ""
            )}
        >
            <Stack direction="row" gap={2} className="items-center">
                <Icon size={24} />
                {!isCollapsed && (
                    <span className="transition-opacity duration-300 ease-in-out opacity-100 whitespace-nowrap">
                        {children}
                    </span>
                )}
            </Stack>
        </LinkComponent>
    );
}

export const Sidebar = {
    Root,
    Header,
    Content,
    Footer,
    Toggle,
    Logo,
    Link,
};
