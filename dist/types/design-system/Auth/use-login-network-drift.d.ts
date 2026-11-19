export interface INetworkDriftOffset {
    dx: number;
    dy: number;
}
/**
 * Subtle per-node drift in viewBox units (SVG 0–100). Lines use the same offsets.
 */
export declare function useLoginNetworkDrift(nodeIds: string[]): Record<string, INetworkDriftOffset>;
