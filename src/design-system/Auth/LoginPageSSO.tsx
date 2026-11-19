"use client";

import { Stack } from "@components/index";
import { LoginCardSSO, type ILoginCardSSOProps } from "./LoginCardSSO";
import {
	LoginPageLayoutV2,
	type ILoginPageLayoutV2Props,
} from "./LoginPageLayoutV2";
import {
	DEFAULT_V2_CARD_CLASSNAME,
	type ILoginPageSplitLayoutProps,
	type LoginPageVariant,
} from "./login-page-types";

export type ILoginPageSSOProps = ILoginCardSSOProps &
	(
		| { variant?: "default" }
		| ({ variant: "v2" } & ILoginPageSplitLayoutProps)
	);

type ILoginPageSSOV2Props = ILoginCardSSOProps &
	({ variant: "v2" } & ILoginPageSplitLayoutProps);

/**
 * Full-page SSO login. Use variant="v2" for split-screen layout; auth logic lives in LoginCardSSO.
 */
export function LoginPageSSO(props: ILoginPageSSOProps) {
	const variant: LoginPageVariant = props.variant ?? "default";

	if (variant === "v2") {
		const {
			brand,
			brandPanelClassName,
			formPanelClassName,
			pageClassName,
			backgroundImageSrc,
			cardClassName,
			welcomeTitle,
			welcomeDescription,
			formPanelNetwork,
			className,
			...loginCardProps
		} = props as ILoginPageSSOV2Props;

		const layoutProps: Pick<
			ILoginPageLayoutV2Props,
			| "brandPanelClassName"
			| "formPanelClassName"
			| "pageClassName"
			| "backgroundImageSrc"
			| "welcomeTitle"
			| "welcomeDescription"
			| "formPanelNetwork"
		> = {
			brandPanelClassName,
			formPanelClassName,
			pageClassName,
			backgroundImageSrc,
			welcomeTitle,
			welcomeDescription,
			formPanelNetwork,
		};

		return (
			<LoginPageLayoutV2 brand={brand} {...layoutProps}>
				<LoginCardSSO
					{...loginCardProps}
					className={
						cardClassName ?? className ?? DEFAULT_V2_CARD_CLASSNAME
					}
				/>
			</LoginPageLayoutV2>
		);
	}

	const { variant: _variant, className, ...loginCardProps } = props;

	return (
		<Stack
			className="min-h-screen w-full items-center justify-center"
			gap={4}
		>
			<LoginCardSSO {...loginCardProps} className={className} />
		</Stack>
	);
}