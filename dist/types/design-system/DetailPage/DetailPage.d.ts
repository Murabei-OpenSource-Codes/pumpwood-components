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
export declare function DetailPage({ title, titleAddon, isLoading, error, onBack, actions, sections, children, loadingComponent, errorComponent, backButtonLabel, }: IDetailPageProps): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element;
