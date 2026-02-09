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
    const sidebarWidth = isCollapsed ? "pw:w-20" : "pw:w-[232px]";

    return (
        <SidebarContext.Provider value={{ isCollapsed, onToggleCollapse }}>
            <nav
                className={cn(
                    sidebarWidth,
                    "pw:py-6 pw:px-4 pw:flex pw:flex-col pw:items-center pw:bg-primary pw:mb-2 pw:rounded-xl pw:transition-all pw:duration-300 pw:ease-in-out pw:h-full",
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
                "pw:w-full pw:flex pw:justify-between pw:items-center pw:mb-8 pw:gap-4",
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
        <Stack className={cn("pw:w-full pw:items-baseline pw:gap-1", className)}>
            {children}
        </Stack>
    );
}

export interface SidebarFooterProps {
    children: ReactNode;
    className?: string;
}

function Footer({ children, className }: SidebarFooterProps) {
    return <div className={cn("pw:mt-auto pw:w-full", className)}>{children}</div>;
}

export interface SidebarToggleProps {
    className?: string;
}

function Toggle({ className }: SidebarToggleProps) {
    const { isCollapsed, onToggleCollapse } = useSidebar();

    return (
        <div
            className={cn(
                "pw:w-full pw:flex pw:transition-all pw:duration-300 pw:ease-in-out",
                !isCollapsed ? "pw:justify-end" : "pw:justify-center",
                className
            )}
        >
            <Button
                title="Recolher Barra Lateral"
                className={cn(
                    "pw:size-[40px] pw:bg-transparent pw:rounded-full hover:pw:bg-white/5 pw:transition-all pw:duration-300 pw:ease-in-out",
                    !isCollapsed ? "pw:justify-end" : "pw:justify-center"
                )}
                onClick={onToggleCollapse}
            >
                {isCollapsed ? (
                    <Menu className="pw:size-[32px] pw:text-white" />
                ) : (
                    <ChartNoAxesGantt className="pw:size-[32px] pw:text-white" />
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
        <Stack className={cn("pw:py-2", className)}>
            <ImageComponent
                className={cn(
                    "pw:transition-opacity pw:duration-300 pw:ease-in-out",
                    isCollapsed ? "pw:opacity-0 invisible" : "pw:opacity-100"
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
                "pw:w-full pw:h-[48px] pw:p-3 pw:font-bold pw:text-white pw:rounded-md pw:overflow-hidden pw:transition-all pw:duration-300 pw:ease-in-out hover:pw:bg-white/5 pw:flex pw:items-center",
                active ? "pw:bg-white/5" : "",
                className,
                !isCollapsed ? "pw:px-6 pw:py-3" : ""
            )}
        >
            <Stack direction="row" gap={2} className="pw:items-center">
                <Icon size={24} />
                {!isCollapsed && (
                    <span className="pw:transition-opacity pw:duration-300 pw:ease-in-out pw:opacity-100 pw:whitespace-nowrap">
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
