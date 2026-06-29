"use client";

import { LogOut, type LucideIcon } from "lucide-react";
import {
    type ComponentType,
    type ReactNode,
    useEffect,
} from "react";
import { Sidebar } from "@components/Sidebar";
import { useSidebarCollapse } from "@components/Sidebar/useSidebarCollapse";

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
export function NavigationSidebar({
    links,
    iconMap,
    pathname,
    isSidebarCollapsedFromQuery = false,
    logo,
    onLogout,
    logoutIcon = LogOut,
    logoutLabel = "Logout",
    LinkComponent,
    ImageComponent,
}: INavigationSidebarProps) {
    const currentModelClass = pathname.split("/")[2] ?? "";

    const {
        isCollapsed,
        isCollapsing,
        expandedItems,
        setExpandedItems,
        toggleCollapse,
        toggleExpanded,
        handleTransitionEnd,
        setExpandedOnCollapse,
    } = useSidebarCollapse({
        initialCollapsed: isSidebarCollapsedFromQuery,
        onPersist: (collapsed) => {
            const newQuery = new URLSearchParams();
            newQuery.set("sidebar-collapsed", String(collapsed));
            window.history.replaceState(
                {},
                "",
                `${window.location.pathname}?${newQuery}`,
            );
        },
    });

    useEffect(() => {
        if (!isSidebarCollapsedFromQuery) {
            const expanded: Record<string, boolean> = {};
            links.forEach((link) => {
                if (link.subItems) {
                    const hasActiveSubItem = link.subItems.some(
                        (subItem) => pathname === subItem.href,
                    );
                    if (hasActiveSubItem) {
                        expanded[link.title] = true;
                    }
                }
            });
            setExpandedItems(expanded);
        }
    }, [isSidebarCollapsedFromQuery, links, pathname, setExpandedItems]);

    const handleCollapseSidebar = () => {
        if (!isCollapsed) {
            setExpandedOnCollapse();
        }
        toggleCollapse();
    };

    const handleLogout = async () => {
        await onLogout();
    };

    return (
        <Sidebar.Root
            isCollapsed={isCollapsed}
            isCollapsing={isCollapsing}
            onToggleCollapse={handleCollapseSidebar}
            onTransitionEnd={handleTransitionEnd}
            className="h-full"
        >
            <Sidebar.Toggle />

            <Sidebar.Logo
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                ImageComponent={ImageComponent}
            />

            <Sidebar.Content className="mt-8">
                {links.map((link) => {
                    const Icon = iconMap[link.icon];
                    const hasSubItems = !!link.subItems?.length;

                    if (hasSubItems) {
                        const isAnySubItemActive = link.subItems?.some(
                            (subItem) => {
                                return (
                                    pathname === subItem.href ||
                                    currentModelClass ===
                                        subItem.href.split("/")[2]
                                );
                            },
                        );

                        return (
                            <Sidebar.NavGroup
                                key={link.title}
                                icon={Icon}
                                title={link.title}
                                isExpanded={!!expandedItems[link.title]}
                                isActive={!!isAnySubItemActive}
                                onToggle={() => toggleExpanded(link.title)}
                            >
                                {link.subItems?.map((subItem) => {
                                    const isActive = pathname === subItem.href;

                                    return (
                                        <Sidebar.NavSubLink
                                            key={subItem.href}
                                            title={subItem.title}
                                            href={{
                                                pathname: subItem.href,
                                                query: {
                                                    "sidebar-collapsed":
                                                        isCollapsed,
                                                },
                                            }}
                                            active={isActive}
                                            LinkComponent={LinkComponent}
                                        />
                                    );
                                })}
                            </Sidebar.NavGroup>
                        );
                    }

                    const linkModelClass = link.href?.split("/")[2] ?? "";

                    return (
                        <Sidebar.Link
                            key={link.href}
                            icon={Icon}
                            href={{
                                pathname: link.href,
                                query: {
                                    "sidebar-collapsed": isCollapsed,
                                },
                            }}
                            active={currentModelClass === linkModelClass}
                            LinkComponent={LinkComponent}
                        >
                            {link.title}
                        </Sidebar.Link>
                    );
                })}
            </Sidebar.Content>

            <Sidebar.Footer>
                <Sidebar.Action
                    icon={logoutIcon}
                    label={logoutLabel}
                    onClick={handleLogout}
                />
            </Sidebar.Footer>
        </Sidebar.Root>
    );
}
