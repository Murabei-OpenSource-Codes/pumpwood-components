"use client";

import { useEffect, useState } from "react";

export interface INetworkDriftOffset {
	dx: number;
	dy: number;
}

const DRIFT_AMP_X = 2.1;
const DRIFT_AMP_Y = 1.7;

function zeroOffsets(
	nodeIds: string[],
): Record<string, INetworkDriftOffset> {
	const out: Record<string, INetworkDriftOffset> = {};
	for (const id of nodeIds) {
		out[id] = { dx: 0, dy: 0 };
	}
	return out;
}

/**
 * Subtle per-node drift in viewBox units (SVG 0–100). Lines use the same offsets.
 */
export function useLoginNetworkDrift(nodeIds: string[]) {
	const [offsets, setOffsets] = useState<Record<string, INetworkDriftOffset>>(
		() => zeroOffsets(nodeIds),
	);

	useEffect(() => {
		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduced) {
			setOffsets(zeroOffsets(nodeIds));
			return;
		}

		let frame = 0;
		const t0 = performance.now();

		const tick = (now: number) => {
			const t = (now - t0) / 1000;
			const next: Record<string, INetworkDriftOffset> = {};

			for (let i = 0; i < nodeIds.length; i += 1) {
				const id = nodeIds[i];
				const phase = i * 0.82;
				next[id] = {
					dx: Math.sin(t * 0.48 + phase) * DRIFT_AMP_X,
					dy: Math.cos(t * 0.41 + phase) * DRIFT_AMP_Y,
				};
			}

			setOffsets(next);
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [nodeIds]);

	return offsets;
}