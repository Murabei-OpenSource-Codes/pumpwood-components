export function snapToStep(
	value: number,
	step: number,
	domainMin: number,
	domainMax: number,
): number {
	const snapped = Math.round(value / step) * step;
	return Math.min(domainMax, Math.max(domainMin, snapped));
}

export function parseDraftValue(raw: string): number | null {
	const trimmed = raw.trim();
	if (!trimmed) {
		return null;
	}
	const normalized = trimmed.replace(",", ".");
	const parsed = Number.parseFloat(normalized);
	return Number.isFinite(parsed) ? parsed : null;
}
