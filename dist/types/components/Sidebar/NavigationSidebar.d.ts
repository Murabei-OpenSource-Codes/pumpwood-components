import { type LucideIcon } from "lucide-react";
import { type ComponentType, type ReactNode } from "react";
export interface INavigationSidebarSubLink {
    title: string;
    href: string;
}
export interface INavigationSidebarLink {
    title: string;
    href?: string;
    icon: string;
    subItems?: INavigationSidebarSubLink[];
}
export interface INavigationSidebarLogo {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}
export interface INavigationSidebarProps {
    links: INavigationSidebarLink[];
    iconMap: Record<string, LucideIcon>;
    pathname: string;
    isSidebarCollapsedFromQuery?: boolean;
    logo: INavigationSidebarLogo;
    onLogout: () => void | Promise<void>;
    logoutIcon?: LucideIcon;
    logoutLabel?: string;
    LinkComponent?: ComponentType<{
        href: any;
        className?: string;
        children: ReactNode;
        title?: string;
    }>;
    ImageComponent?: ComponentType<{
        src: string;
        alt: string;
        width: number;
        height: number;
        className?: string;
    }>;
}
/**
 * Configurable navigation sidebar with collapse, groups and logout.
 */
export declare function NavigationSidebar({ links, iconMap, pathname, isSidebarCollapsedFromQuery, logo, onLogout, logoutIcon, logoutLabel, LinkComponent, ImageComponent, }: INavigationSidebarProps): import("react/jsx-runtime").JSX.Element;
