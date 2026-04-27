import { type LucideIcon } from "lucide-react";
import { type ComponentType, type ReactNode } from "react";
/**
 * Props for the Sidebar Root component.
 */
export interface SidebarRootProps {
    /** The content of the sidebar. */
    children: ReactNode;
    /** Whether the sidebar is currently collapsed. */
    isCollapsed: boolean;
    /** Callback to toggle the collapsed state. */
    onToggleCollapse: () => void;
    /** Additional CSS classes. */
    className?: string;
}
declare function Root({ children, isCollapsed, onToggleCollapse, className, }: SidebarRootProps): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Sidebar Header component.
 */
export interface SidebarHeaderProps {
    children: ReactNode;
    className?: string;
}
declare function Header({ children, className }: SidebarHeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Sidebar Content component.
 */
export interface SidebarContentProps {
    children: ReactNode;
    className?: string;
}
declare function Content({ children, className }: SidebarContentProps): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Sidebar Footer component.
 */
export interface SidebarFooterProps {
    children: ReactNode;
    className?: string;
}
declare function Footer({ children, className }: SidebarFooterProps): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Sidebar Toggle component.
 */
export interface SidebarToggleProps {
    className?: string;
}
declare function Toggle({ className }: SidebarToggleProps): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Sidebar Logo component.
 */
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
declare function Logo({ src, alt, width, height, className, ImageComponent, }: SidebarLogoProps): import("react/jsx-runtime").JSX.Element;
/**
 * Props for the Sidebar Link component.
 */
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
declare function Link({ icon: Icon, children, href, active, className, LinkComponent, }: SidebarLinkProps): import("react/jsx-runtime").JSX.Element;
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
export declare const Sidebar: {
    Root: typeof Root;
    Header: typeof Header;
    Content: typeof Content;
    Footer: typeof Footer;
    Toggle: typeof Toggle;
    Logo: typeof Logo;
    Link: typeof Link;
};
export {};
