import { type ILoginCardProps } from "./LoginCard";
import { type ILoginPageSplitLayoutProps } from "./login-page-types";
export type ILoginPageProps = ILoginCardProps & ({
    variant?: "default";
} | ({
    variant: "v2";
} & ILoginPageSplitLayoutProps));
/**
 * Full-page login. Use variant="v2" for split-screen layout; auth logic lives in LoginCard.
 */
export declare function LoginPage(props: ILoginPageProps): import("react/jsx-runtime").JSX.Element;
