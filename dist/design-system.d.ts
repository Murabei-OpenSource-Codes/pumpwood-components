import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode, ComponentType, ComponentPropsWithoutRef, ImgHTMLAttributes } from 'react';
import { FKFetcherParams } from '@murabei-data-science/pumpwood-ui/components';
import { LucideIcon } from 'lucide-react';

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
 * A demonstration component combining filters and a table.
 *
 * @example
 * ```tsx
 * <CombinedFilterTable />
 * ```
 */
declare const CombinedFilterTable: () => react_jsx_runtime.JSX.Element;

declare function KeyValueContent({ data }: {
    data: Record<string, any>;
}): react_jsx_runtime.JSX.Element;

interface ILoginCardProps {
    onLogin: (credentials: {
        username: string;
        password: string;
    }) => Promise<{
        error?: string | null;
    }>;
    onSuccess?: () => void;
    onError?: (message: string, error: string) => void;
    sessionExpired?: boolean;
    sessionExpiredAlert?: {
        icon: ReactNode;
        title?: string;
        description?: string;
    };
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    usernameLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    loginErrorMessage?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * Username and password login card.
 */
declare function LoginCard({ onLogin, onSuccess, onError, sessionExpired, sessionExpiredAlert, forgotPasswordHref, forgotPasswordLabel, usernameLabel, passwordLabel, submitLabel, loginErrorMessage, LinkComponent, className, }: ILoginCardProps): react_jsx_runtime.JSX.Element;

interface ILoginCardSSOProps {
    onLoginSSO: (email: string) => Promise<{
        redirect_url?: string | null;
        error?: string | null;
    }>;
    onRedirect?: (url: string) => void;
    onError?: (message: string, error: string) => void;
    sessionExpired?: boolean;
    sessionExpiredAlert?: {
        icon: ReactNode;
        title?: string;
        description?: string;
    };
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    emailLabel?: string;
    submitLabel?: string;
    unauthorizedMessage?: string;
    genericErrorMessage?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * SSO email login card.
 */
declare function LoginCardSSO({ onLoginSSO, onRedirect, onError, sessionExpired, sessionExpiredAlert, forgotPasswordHref, forgotPasswordLabel, emailLabel, submitLabel, unauthorizedMessage, genericErrorMessage, LinkComponent, className, }: ILoginCardSSOProps): react_jsx_runtime.JSX.Element;

interface IAuthenticatedViewProps {
    redirectHref: string;
    redirectDelayMs?: number;
    onRedirect?: (href: string) => void;
    title?: string;
    fallbackLinkLabel?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * OAuth success screen with auto-redirect.
 */
declare function AuthenticatedView({ redirectHref, redirectDelayMs, onRedirect, title, fallbackLinkLabel, LinkComponent, className, }: IAuthenticatedViewProps): react_jsx_runtime.JSX.Element;

interface INotAuthenticatedViewProps {
    error: unknown;
    loginHref: string;
    title?: string;
    description?: string;
    fallbackLinkLabel?: string;
    errorDetailsLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
    LinkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
    }>;
    className?: string;
}
/**
 * OAuth error screen with expandable error details.
 */
declare function NotAuthenticatedView({ error, loginHref, title, description, fallbackLinkLabel, errorDetailsLabel, copyLabel, copiedLabel, LinkComponent, className, }: INotAuthenticatedViewProps): react_jsx_runtime.JSX.Element;

interface IDetailSection {
    title: string;
    fields: string[];
    cols?: 2 | 3 | 4;
    isFullWidth?: boolean;
}
interface IDetailFieldConfig {
    exclude?: string[];
    labels?: Record<string, string>;
    formatters?: Record<string, (value: unknown) => string>;
    sections?: IDetailSection[];
}
interface IFormatDetailValueOptions {
    statusLabels?: Record<string, string>;
    formatDate?: (date: string) => string;
    booleanLabels?: {
        true: string;
        false: string;
    };
}
declare const formatDetailLabel: (key: string, labels?: Record<string, string>) => string;
declare const formatDetailValue: (value: unknown, key: string, options?: IFormatDetailValueOptions) => string;
declare const getDetailFieldValue: (data: Record<string, unknown>, key: string) => unknown;
declare const FULL_WIDTH_DETAIL_FIELDS: string[];

interface IAutoDetailContentProps {
    data: Record<string, any>;
    config?: IDetailFieldConfig;
    formatters?: {
        key: string;
        formatter: (value: unknown) => string;
    }[];
    wrapperElements?: {
        keys: string[];
        element: (props: {
            key: string;
            label: string;
            fieldValue: unknown;
            isFullWidth: boolean;
            data: Record<string, any>;
        }) => ReactNode;
    }[];
    statusLabels?: Record<string, string>;
    formatDate?: (date: string) => string;
}
/**
 * Auto-render entity detail fields in configurable sections.
 */
declare function AutoDetailContent({ data, config, formatters, wrapperElements, statusLabels, formatDate, }: IAutoDetailContentProps): react_jsx_runtime.JSX.Element;

interface IDetailPageSection {
    id?: string;
    title: string;
    content: ReactNode;
    defaultOpen?: boolean;
}
interface IDetailPageProps {
    title: string;
    titleAddon?: ReactNode;
    isLoading?: boolean;
    error?: Error | null;
    onBack?: () => void;
    actions?: ReactNode;
    sections?: IDetailPageSection[];
    children?: ReactNode;
    loadingComponent?: ReactNode;
    errorComponent?: ReactNode;
    backButtonLabel?: string;
}
/**
 * Reusable detail page shell with header, loading/error states and sections.
 */
declare function DetailPage({ title, titleAddon, isLoading, error, onBack, actions, sections, children, loadingComponent, errorComponent, backButtonLabel, }: IDetailPageProps): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | react.ReactPortal | react.ReactElement<unknown, string | react.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element;

/**
 * Interface representing a form field specification
 */
interface IFormField {
    type: "text" | "number" | "password" | "email" | "textarea" | "checkbox" | "select" | "date" | "key-value";
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: {
        label: string;
        value: string;
    }[];
    className?: string;
    cols?: 1 | 2 | 3 | 4;
}
/**
 * Custom section grouping configuration similar to AutoDetailContent
 */
interface IFormSection {
    title: string;
    fields: string[];
    cols?: 1 | 2 | 3 | 4;
    isFullWidth?: boolean;
}
interface IAutoFormContentProps {
    fields: Record<string, IFormField>;
    values?: Record<string, any>;
    defaultValue?: Record<string, any>;
    onChange?: (values: Record<string, any>) => void;
    errors?: Record<string, string>;
    config?: {
        exclude?: string[];
        labels?: Record<string, string>;
        sections?: IFormSection[];
    };
    customFields?: Record<string, (props: {
        value: any;
        onChange: (val: any) => void;
        error?: string;
        disabled?: boolean;
        fieldKey: string;
    }) => react.ReactNode>;
}
declare function AutoFormContent({ fields, values: externalValues, defaultValue, onChange, errors, config, customFields, }: IAutoFormContentProps): react_jsx_runtime.JSX.Element;

type M2MListFn = (modelClass: string, filterDict: Record<string, any>, fields: string[]) => Promise<[
    Record<string, any>[] | null,
    {
        message?: string;
    } | null
]>;
declare const M2MCreateDialog: ({ open, onOpenChange, targetModelClass, relationName, handleCreateNew, mutate, fkFetcher, }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    targetModelClass: string;
    relationName: string;
    handleCreateNew: (id: string) => void;
    mutate: () => void;
    fkFetcher: (params: FKFetcherParams) => Promise<any[]>;
}) => react_jsx_runtime.JSX.Element;
interface IM2MTableProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
    modelClass: string;
    targetModelClass: string;
    filterDict: Record<string, any>;
    targetField: string;
    relationName: string;
    displayFields: {
        name: string;
        field: string;
    }[];
    handleCreateNew: (id: string) => void;
    handleDeleteItem: (id: string) => void;
    fields: string[];
    listFn: M2MListFn;
    fkFetcher: (params: FKFetcherParams) => Promise<any[]>;
}
declare const M2MTable: ({ modelClass, targetModelClass, targetField, filterDict, relationName, fields, displayFields, handleCreateNew, handleDeleteItem, listFn, fkFetcher, }: IM2MTableProps) => react_jsx_runtime.JSX.Element;

interface ICustomBreadcrumbProps {
    label: string;
    steps?: string[];
}
declare function CustomBreadcrumb({ label, steps, }: ICustomBreadcrumbProps): react_jsx_runtime.JSX.Element;

type FileTypeCategory = "image" | "video" | "pdf" | "doc" | "excel" | "ppt" | "other";
interface FilePreviewProps {
    fileUrl: string;
    fileName: string;
    isLoading?: boolean;
    getFileType: (fileName: string) => FileTypeCategory;
    ImageComponent?: ComponentType<ImgHTMLAttributes<HTMLImageElement> & {
        fill?: boolean;
    }>;
}
declare const FilePreview: ({ fileUrl, fileName, isLoading, getFileType, ImageComponent, }: FilePreviewProps) => react_jsx_runtime.JSX.Element;

interface INavigationSidebarSubLink {
    title: string;
    href: string;
}
interface INavigationSidebarLink {
    title: string;
    href?: string;
    icon: string;
    subItems?: INavigationSidebarSubLink[];
}
interface INavigationSidebarLogo {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    collapsedWidth?: number;
    collapsedHeight?: number;
}
interface INavigationSidebarProps {
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
declare function NavigationSidebar({ links, iconMap, pathname, isSidebarCollapsedFromQuery, logo, onLogout, logoutIcon, logoutLabel, LinkComponent, ImageComponent, }: INavigationSidebarProps): react_jsx_runtime.JSX.Element;

export { AuthenticatedView, AutoDetailContent, AutoFormContent, CombinedFilterTable, CreatedByUserFilter, CustomBreadcrumb, DateRangeFilter, DetailPage, FULL_WIDTH_DETAIL_FIELDS, FilePreview, KeyValueContent, LoginCard, LoginCardSSO, M2MCreateDialog, M2MTable, NavigationSidebar, NotAuthenticatedView, formatDetailLabel, formatDetailValue, getDetailFieldValue };
export type { FileTypeCategory, IAuthenticatedViewProps, IAutoDetailContentProps, IAutoFormContentProps, IDetailFieldConfig, IDetailPageProps, IDetailPageSection, IDetailSection, IFormField, IFormSection, IFormatDetailValueOptions, ILoginCardProps, ILoginCardSSOProps, INavigationSidebarLink, INavigationSidebarLogo, INavigationSidebarProps, INavigationSidebarSubLink, INotAuthenticatedViewProps, M2MListFn };
