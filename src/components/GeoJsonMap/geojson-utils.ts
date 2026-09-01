import type {
	GeoJsonMapData,
	IGeoJsonFeature,
	IGeoJsonFeatureCollection,
	IGeoJsonGeometry,
	IGeoJsonMapPosition,
	IGeoJsonPointMarker,
} from "./types";

const POINT_TYPES = new Set(["Point", "MultiPoint"]);
const POLYGON_TYPES = new Set(["Polygon", "MultiPolygon"]);
const LINE_TYPES = new Set(["LineString", "MultiLineString"]);

export function isFiniteNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

export function isLngLatPair(value: unknown): value is [number, number] {
	return (
		Array.isArray(value) &&
		value.length >= 2 &&
		isFiniteNumber(value[0]) &&
		isFiniteNumber(value[1])
	);
}

export function getDefaultFeatureId(
	feature: IGeoJsonFeature,
	index: number,
): string {
	if (feature.id !== undefined && feature.id !== null) {
		return String(feature.id);
	}

	const propertyId = feature.properties?.id;
	if (propertyId !== undefined && propertyId !== null) {
		return String(propertyId);
	}

	return String(index);
}

export function getFeatureLabel(feature: IGeoJsonFeature): string {
	const title = feature.properties?.title;
	if (typeof title === "string" && title.trim().length > 0) {
		return title;
	}

	if (feature.id !== undefined && feature.id !== null) {
		return String(feature.id);
	}

	return "Feature";
}

export function collectLngLatPairs(
	value: unknown,
	pairs: [number, number][],
): void {
	if (isLngLatPair(value)) {
		pairs.push([value[0], value[1]]);
		return;
	}

	if (!Array.isArray(value)) {
		return;
	}

	for (const item of value) {
		collectLngLatPairs(item, pairs);
	}
}

export function collectGeometryPositions(
	geometry: IGeoJsonGeometry | null,
): IGeoJsonMapPosition[] {
	if (!geometry) {
		return [];
	}

	const pairs: [number, number][] = [];
	collectLngLatPairs(geometry.coordinates, pairs);
	return pairs.map(([lng, lat]) => ({ lng, lat }));
}

export function computeFeatureCollectionBbox(
	collection: IGeoJsonFeatureCollection,
): [[number, number], [number, number]] | null {
	const lngs: number[] = [];
	const lats: number[] = [];

	for (const feature of collection.features) {
		const positions = collectGeometryPositions(feature.geometry);
		for (const position of positions) {
			lngs.push(position.lng);
			lats.push(position.lat);
		}
	}

	if (lngs.length === 0 || lats.length === 0) {
		return null;
	}

	return [
		[Math.min(...lngs), Math.min(...lats)],
		[Math.max(...lngs), Math.max(...lats)],
	];
}

export function hasPolygonOrLineGeometry(
	collection: IGeoJsonFeatureCollection,
): boolean {
	return collection.features.some((feature) => {
		const type = feature.geometry?.type;
		return (
			type !== undefined &&
			(POLYGON_TYPES.has(type) || LINE_TYPES.has(type))
		);
	});
}

function geometryToFeature(geometry: IGeoJsonGeometry): IGeoJsonFeature {
	return {
		type: "Feature",
		geometry,
		properties: {},
	};
}

export function normalizeGeoJsonData(
	data: GeoJsonMapData,
): IGeoJsonFeatureCollection {
	if (data.type === "FeatureCollection") {
		return {
			type: "FeatureCollection",
			features: data.features.filter(
				(feature) => feature.geometry !== null,
			),
		};
	}

	if (data.type === "Feature") {
		return {
			type: "FeatureCollection",
			features: data.geometry ? [data] : [],
		};
	}

	return {
		type: "FeatureCollection",
		features: [geometryToFeature(data)],
	};
}

export function withPromotedFeatureIds(
	collection: IGeoJsonFeatureCollection,
	getFeatureId: (feature: IGeoJsonFeature, index: number) => string,
): IGeoJsonFeatureCollection {
	return {
		type: "FeatureCollection",
		features: collection.features.map((feature, index) => {
			const featureId = getFeatureId(feature, index);
			return {
				...feature,
				id: featureId,
				properties: {
					...(feature.properties ?? {}),
					__pwId: featureId,
				},
			};
		}),
	};
}

export function extractPointMarkers(
	collection: IGeoJsonFeatureCollection,
	getFeatureId: (feature: IGeoJsonFeature, index: number) => string,
): IGeoJsonPointMarker[] {
	const markers: IGeoJsonPointMarker[] = [];

	collection.features.forEach((feature, featureIndex) => {
		const geometry = feature.geometry;
		if (!geometry || !POINT_TYPES.has(geometry.type)) {
			return;
		}

		const featureId = getFeatureId(feature, featureIndex);
		const label = getFeatureLabel(feature);

		if (geometry.type === "Point" && isLngLatPair(geometry.coordinates)) {
			markers.push({
				key: featureId,
				feature,
				featureIndex,
				vertexIndex: 0,
				position: {
					lng: geometry.coordinates[0],
					lat: geometry.coordinates[1],
				},
				label,
			});
			return;
		}

		if (geometry.type === "MultiPoint" && Array.isArray(geometry.coordinates)) {
			geometry.coordinates.forEach((coordinate, vertexIndex) => {
				if (!isLngLatPair(coordinate)) {
					return;
				}

				markers.push({
					key: `${featureId}-${String(vertexIndex)}`,
					feature,
					featureIndex,
					vertexIndex,
					position: {
						lng: coordinate[0],
						lat: coordinate[1],
					},
					label,
				});
			});
		}
	});

	return markers;
}

export function resolvePopupPosition(
	feature: IGeoJsonFeature,
	fallback: IGeoJsonMapPosition | null,
): IGeoJsonMapPosition | null {
	if (fallback) {
		return fallback;
	}

	const positions = collectGeometryPositions(feature.geometry);
	if (positions.length === 0) {
		return null;
	}

	return positions[0];
}
