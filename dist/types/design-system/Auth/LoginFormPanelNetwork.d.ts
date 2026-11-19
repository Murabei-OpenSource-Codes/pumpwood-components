export interface ILoginFormPanelNetworkNode {
    id: string;
    x: number;
    y: number;
    title: string;
    message: string;
}
export interface ILoginFormPanelNetworkEdge {
    from: string;
    to: string;
}
export declare function LoginFormPanelNetwork({ enabled, className, }: {
    enabled?: boolean;
    className?: string;
}): import("react/jsx-runtime").JSX.Element | null;
