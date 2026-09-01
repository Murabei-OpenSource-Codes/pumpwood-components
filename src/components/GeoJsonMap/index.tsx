"use client";

import { useEffect, useMemo, useState } from "react";
import Stack from "../Stack";
import { cn } from "@/lib/utils";
import {
	DEFAULT_GEOJSON_MAP_STYLE,
	DEFAULT_GEOJSON_MAP_VIEW_STATE,
} from "./default-style";
import { GeoJsonMapCanvas } from "./geojson-map-canvas";
import "./geojson-map.css";
import type { IGeoJsonMapProps } from "./types";

export type {
	GeoJsonGeometryType,
	GeoJsonMapData,
	GeoJsonMapStyle,
	IGeoJsonFeature,
	IGeoJsonFeatureCollection,
	IGeoJsonGeometry,
	IGeoJsonMapPosition,
	IGeoJsonMapProps,
	IGeoJsonMapViewState,
	IGeoJsonPointMarker,
} from "./types";

type MapLibreModule = typeof import("react-map-gl/maplibre");

/**
 * Map canvas that renders GeoJSON points as HTML pins and polygons as
 * shaded fill layers. MapLibre is loaded on the client only.
 */
export function GeoJsonMap(props: IGeoJsonMapProps) {
	const [mapModule, setMapModule] = useState<MapLibreModule | null>(null);
	const workerUrl = props.workerUrl;

	const resolvedMapStyle = props.mapStyle ?? DEFAULT_GEOJSON_MAP_STYLE;
	const resolvedViewState = useMemo(
		() => ({
			...DEFAULT_GEOJSON_MAP_VIEW_STATE,
			...props.initialViewState,
		}),
		[props.initialViewState],
	);

	useEffect(() => {
		let active = true;

		Promise.all([
			import("react-map-gl/maplibre"),
			import("maplibre-gl"),
			import("maplibre-gl/dist/maplibre-gl.css"),
		]).then(([reactMapGl, maplibreGl]) => {
			if (!active) {
				return;
			}

			if (
				workerUrl &&
				typeof maplibreGl.setWorkerUrl === "function"
			) {
				maplibreGl.setWorkerUrl(workerUrl);
			}

			setMapModule(reactMapGl);
		});

		return () => {
			active = false;
		};
	}, [workerUrl]);

	if (!mapModule) {
		return (
			<Stack
				direction="col"
				className={cn(
					"pw-geojson-map relative h-96 w-full shrink-0 overflow-hidden rounded-md border shadow-sm",
					props.className,
				)}
				data-testid={props.testId}
				style={props.style}
			>
				<span />
			</Stack>
		);
	}

	return (
		<GeoJsonMapCanvas
			{...props}
			mapModule={mapModule}
			resolvedMapStyle={resolvedMapStyle}
			resolvedViewState={resolvedViewState}
		/>
	);
}
