import { type ILoginCardSSOProps } from "./LoginCardSSO";
import { type ILoginPageSplitLayoutProps } from "./login-page-types";
export type ILoginPageSSOProps = ILoginCardSSOProps & ({
    variant?: "default";
} | ({
    variant: "v2";
} & ILoginPageSplitLayoutProps));
/**
 * Full-page SSO login. Use variant="v2" for split-screen layout; auth logic lives in LoginCardSSO.
 */
export declare function LoginPageSSO(props: ILoginPageSSOProps): import("react/jsx-runtime").JSX.Element;
