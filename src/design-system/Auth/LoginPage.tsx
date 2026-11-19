"use client";

import { Stack } from "@components/index";
import { LoginCard, type ILoginCardProps } from "./LoginCard";
import {
	LoginPageLayoutV2,
	type ILoginPageLayoutV2Props,
} from "./LoginPageLayoutV2";
import {
	DEFAULT_V2_CARD_CLASSNAME,
	type ILoginPageSplitLayoutProps,
	type LoginPageVariant,
} from "./login-page-types";

export type ILoginPageProps = ILoginCardProps &
	(
		| { variant?: "default" }
		| ({ variant: "v2" } & ILoginPageSplitLayoutProps)
	);

type ILoginPageV2Props = ILoginCardProps &
	({ variant: "v2" } & ILoginPageSplitLayoutProps);

/**
 * Full-page login. Use variant="v2" for split-screen layout; auth logic lives in LoginCard.
 */
export function LoginPage(props: ILoginPageProps) {
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
		} = props as ILoginPageV2Props;

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
				<LoginCard
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
			<LoginCard {...loginCardProps} className={className} />
		</Stack>
	);
}