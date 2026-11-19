"use client";

import { ImageOff } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LoginFormPanelNetwork } from "./LoginFormPanelNetwork";

export interface ILoginPageLayoutV2Props {
	brand: ReactNode;
	children: ReactNode;
	brandPanelClassName?: string;
	formPanelClassName?: string;
	pageClassName?: string;
	backgroundImageSrc?: string;
	welcomeTitle?: ReactNode;
	welcomeDescription?: ReactNode;
	formPanelNetwork?: boolean;
}

function BrandPanelAtmosphere({ showNoImageIcon }: { showNoImageIcon: boolean }) {
	return (
		<>
			<div
				aria-hidden
				data-testid="login-brand-dot-grid"
				className="pointer-events-none absolute inset-0 text-primary-foreground opacity-[0.12] motion-safe:animate-login-dot-grid-drift motion-reduce:animate-none"
				style={{
					backgroundImage:
						"radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
					backgroundSize: "24px 24px",
				}}
			/>
			{showNoImageIcon ? (
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 flex items-center justify-center"
					data-testid="login-brand-image-fallback"
				>
					<div className="flex flex-col items-center gap-3 text-primary-foreground/50">
						<ImageOff strokeWidth={1.5} className="h-24 w-24 lg:h-36 lg:w-36" />
					</div>
				</div>
			) : null}
		</>
	);
}

/**
 * Split-screen shell for login V2. Two grid children only so Tailwind
 * `lg:grid-cols-2` stays a true 50/50 split.
 */
export function LoginPageLayoutV2({
	brand,
	children,
	brandPanelClassName,
	formPanelClassName,
	pageClassName,
	backgroundImageSrc,
	welcomeTitle,
	welcomeDescription,
	formPanelNetwork,
}: ILoginPageLayoutV2Props) {
	const [backgroundImageFailed, setBackgroundImageFailed] = useState(false);
	const showBackgroundPhoto =
		Boolean(backgroundImageSrc) && !backgroundImageFailed;
	const showNoImageFallback = !showBackgroundPhoto;

	const brandTile = (
		<div className="flex items-center justify-center rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-8 py-6 shadow-lg backdrop-blur-sm">
			{brand}
		</div>
	);

	const mobileBrandHero = showNoImageFallback ? (
		<div
			className={cn(
				"relative mb-8 min-h-[10.5rem] overflow-hidden rounded-2xl text-primary-foreground lg:hidden",
				"bg-gradient-to-br from-primary to-primary/80",
				brandPanelClassName,
			)}
		>
			<BrandPanelAtmosphere showNoImageIcon />
			<div className="relative z-10 flex justify-center px-6 py-8">{brandTile}</div>
		</div>
	) : (
		<div className="mb-8 flex justify-center lg:hidden">{brandTile}</div>
	);

	return (
		<div
			className={cn(
				"grid min-h-screen w-full grid-cols-1 lg:grid-cols-2",
				pageClassName,
			)}
			data-testid="login-page-layout-v2"
		>
			<aside
				className={cn(
					"relative hidden min-h-screen flex-col items-center justify-center overflow-hidden",
					"bg-gradient-to-br from-primary to-primary/80 text-primary-foreground lg:flex",
					brandPanelClassName,
				)}
			>
				{showBackgroundPhoto && backgroundImageSrc ? (
					<>
						<img
							src={backgroundImageSrc}
							alt=""
							className="pointer-events-none absolute inset-0 h-full w-full object-cover"
							onError={() => setBackgroundImageFailed(true)}
						/>
						<div
							aria-hidden
							className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/85"
						/>
					</>
				) : null}
				<BrandPanelAtmosphere showNoImageIcon={showNoImageFallback} />
				<div
					aria-hidden
					className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10 motion-safe:animate-pulse motion-reduce:animate-none"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary-foreground/10 motion-safe:animate-pulse motion-reduce:animate-none"
				/>
				<div className="relative z-10 flex max-w-md flex-col items-center px-8">
					{brandTile}
				</div>
			</aside>
			<main
				className={cn(
					"relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-10 text-foreground",
					formPanelClassName,
				)}
			>
				<LoginFormPanelNetwork
					enabled={formPanelNetwork !== false}
					className="z-[1] opacity-90"
				/>
				<div className="relative z-10 w-full max-w-md min-w-0">
					{mobileBrandHero}
					{(welcomeTitle ?? welcomeDescription) && (
						<header className="mb-6 text-left">
							{welcomeTitle ? (
								<div className="mb-1 text-2xl font-semibold tracking-tight text-foreground">
									{welcomeTitle}
								</div>
							) : null}
							{welcomeDescription ? (
								<p className="text-sm text-muted-foreground">
									{welcomeDescription}
								</p>
							) : null}
						</header>
					)}
					{children}
				</div>
			</main>
		</div>
	);
}