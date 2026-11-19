"use client";

import { createPortal } from "react-dom";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
	MURABEI_LOGIN_NETWORK_EDGES,
	MURABEI_LOGIN_NETWORK_NODES,
} from "./login-form-panel-network-data";
import { useLoginNetworkDrift } from "./use-login-network-drift";

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

export function LoginFormPanelNetwork({
	enabled = true,
	className,
}: {
	enabled?: boolean;
	className?: string;
}) {
	const nodes = MURABEI_LOGIN_NETWORK_NODES;
	const edges = MURABEI_LOGIN_NETWORK_EDGES;
	const nodeIds = nodes.map((n) => n.id);
	const offsets = useLoginNetworkDrift(nodeIds);
	const nodeById = new Map(nodes.map((n) => [n.id, n]));

	const [tooltip, setTooltip] = useState<{
		title: string;
		message: string;
		x: number;
		y: number;
	} | null>(null);

	const showTip = useCallback(
		(node: ILoginFormPanelNetworkNode, clientX: number, clientY: number) => {
			setTooltip({
				title: node.title,
				message: node.message,
				x: clientX,
				y: clientY,
			});
		},
		[],
	);

	const hideTip = useCallback(() => {
		setTooltip(null);
	}, []);

	const moveTip = useCallback((clientX: number, clientY: number) => {
		setTooltip((prev) =>
			prev ? { ...prev, x: clientX, y: clientY } : null,
		);
	}, []);

	if (!enabled) {
		return null;
	}

	const pos = (id: string) => {
		const n = nodeById.get(id);
		const o = offsets[id] ?? { dx: 0, dy: 0 };
		if (!n) {
			return { x: 0, y: 0 };
		}
		return { x: n.x + o.dx, y: n.y + o.dy };
	};

	return (
		<div
			className={cn("absolute inset-0 overflow-hidden", className)}
			data-testid="login-form-panel-network"
		>
			<svg
				className="absolute inset-0 h-full w-full text-primary/25"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-label="Rede Murabei: ciência, colaboração e sistemas complexos"
				role="img"
			>
				<g stroke="currentColor" fill="none" pointerEvents="none">
					{edges.map(({ from, to }) => {
						const a = pos(from);
						const b = pos(to);
						return (
							<line
								key={`${from}-${to}`}
								x1={a.x}
								y1={a.y}
								x2={b.x}
								y2={b.y}
								strokeWidth={0.35}
								vectorEffect="non-scaling-stroke"
							/>
						);
					})}
				</g>
				{nodes.map((node) => {
					const p = pos(node.id);
					return (
						<g
							key={node.id}
							transform={`translate(${p.x} ${p.y})`}
							className="group cursor-default"
							onMouseEnter={(e) => showTip(node, e.clientX, e.clientY)}
							onMouseLeave={hideTip}
							onMouseMove={(e) => moveTip(e.clientX, e.clientY)}
							onFocus={(e) => {
								const box = e.currentTarget.getBoundingClientRect();
								showTip(node, box.left + box.width / 2, box.top);
							}}
							onBlur={hideTip}
							tabIndex={0}
							role="button"
							aria-label={`${node.title}. ${node.message}`}
						>
							<circle
								r={4}
								className="fill-transparent stroke-none"
								pointerEvents="all"
							/>
							<circle
								r={1.75}
								className="pointer-events-none fill-primary/25 stroke-primary/55 stroke-[0.35] transition-[fill,stroke] duration-200 group-hover:fill-primary/50 group-hover:stroke-primary/85 group-focus-visible:fill-primary/50"
								vectorEffect="non-scaling-stroke"
							/>
						</g>
					);
				})}
			</svg>
			{tooltip &&
				typeof document !== "undefined" &&
				createPortal(
					<div
						role="tooltip"
						className="pointer-events-none fixed z-[300] max-w-[min(300px,90vw)] rounded-md border border-border bg-popover px-3 py-2 text-popover-foreground shadow-md"
						style={{
							left: tooltip.x,
							top: tooltip.y - 10,
							transform: "translate(-50%, -100%)",
						}}
					>
						<p className="text-sm font-semibold leading-snug">
							{tooltip.title}
						</p>
						<p className="mt-1 text-xs leading-snug text-muted-foreground">
							{tooltip.message}
						</p>
					</div>,
					document.body,
				)}
		</div>
	);
}