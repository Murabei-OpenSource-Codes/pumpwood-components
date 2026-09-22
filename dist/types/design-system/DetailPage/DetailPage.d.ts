import type { ReactNode } from "react";
export interface IDetailPageSection {
    id?: string;
    title: string;
    content: ReactNode;
    defaultOpen?: boolean;
}
export interface IDetailPageProps {
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
export declare function DetailPage({ title, titleAddon, isLoading, error, onBack, actions, sections, children, loadingComponent, errorComponent, backButtonLabel, }: IDetailPageProps): string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element;
