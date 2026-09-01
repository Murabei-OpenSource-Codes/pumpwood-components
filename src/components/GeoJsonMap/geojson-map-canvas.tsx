"use client";

import { MapPin } from "lucide-react";
import {
	type MouseEvent,
	type ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Stack from "../Stack";
import { cn } from "@/lib/utils";
import {
	extractPointMarkers,
	getDefaultFeatureId,
	getFeatureLabel,
	hasPolygonOrLineGeometry,
	normalizeGeoJsonData,
	resolvePopupPosition,
	withPromotedFeatureIds,
	computeFeatureCollectionBbox,
} from "./geojson-utils";
import type {
	IGeoJsonFeature,
	IGeoJsonMapPosition,
	IGeoJsonMapProps,
	IGeoJsonPointMarker,
} from "./types";

type MapLibreModule = typeof import("react-map-gl/maplibre");
type MapRef = import("react-map-gl/maplibre").MapRef;
type MapLayerMouseEvent = import("react-map-gl/maplibre").MapLayerMouseEvent;

const FILL_LAYER_ID = "pw-geojson-fill";
const LINE_LAYER_ID = "pw-geojson-line";
const SOURCE_ID = "pw-geojson";
const DEFAULT_FILL_COLOR = "#0265b5";
const DEFAULT_FILL_OPACITY = 0.35;
const DEFAULT_LINE_WIDTH = 2;

export interface IGeoJsonMapCanvasProps extends IGeoJsonMapProps {
	mapModule: MapLibreModule;
	resolvedMapStyle: IGeoJsonMapProps["mapStyle"];
	resolvedViewState: NonNullable<IGeoJsonMapProps["initialViewState"]>;
}

function DefaultPopupContent({
	feature,
	testId,
}: {
	feature: IGeoJsonFeature;
	testId?: string;
}) {
	const title = getFeatureLabel(feature);
	const description = feature.properties?.description;
	const descriptionText =
		typeof description === "string" && description.trim().length > 0
			? description
			: null;

	return (
		<Stack
			direction="col"
			gap={1}
			className="max-w-xs rounded-md border border-border bg-card p-2 text-sm text-card-foreground"
			data-testid={testId}
		>
			<p className="font-semibold">{title}</p>
			{descriptionText && descriptionText !== title ? (
				<p className="text-xs text-muted-foreground">{descriptionText}</p>
			) : null}
		</Stack>
	);
}

function handlePointMarkerClick(
	event: MouseEvent<HTMLButtonElement>,
	marker: IGeoJsonPointMarker,
	selectedId: string | null,
	setSelectedId: (value: string | null) => void,
	setPopupPosition: (value: IGeoJsonMapPosition | null) => void,
	onFeatureClick?: (feature: IGeoJsonFeature) => void,
) {
	event.stopPropagation();
	const featureId = String(marker.feature.id ?? marker.key);
	if (selectedId === featureId) {
		setSelectedId(null);
		setPopupPosition(null);
		return;
	}

	setSelectedId(featureId);
	setPopupPosition(marker.position);
	onFeatureClick?.(marker.feature);
}

export function GeoJsonMapCanvas({
	mapModule,
	data,
	resolvedMapStyle,
	resolvedViewState,
	fitToData = true,
	maxZoom = 18,
	className,
	style,
	workerUrl,
	testId,
	popupTestId,
	polygonFillColor = DEFAULT_FILL_COLOR,
	polygonFillOpacity = DEFAULT_FILL_OPACITY,
	polygonLineColor,
	polygonLineWidth = DEFAULT_LINE_WIDTH,
	renderPopup,
	getFeatureId = getDefaultFeatureId,
	getPointTestId,
	onFeatureClick,
}: IGeoJsonMapCanvasProps) {
	const MapGL = mapModule.Map ?? mapModule.default;
	const { Marker, NavigationControl, Popup, Source, Layer } = mapModule;
	const mapRef = useRef<MapRef>(null);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [popupPosition, setPopupPosition] =
		useState<IGeoJsonMapPosition | null>(null);

	const collection = useMemo(() => {
		return withPromotedFeatureIds(normalizeGeoJsonData(data), getFeatureId);
	}, [data, getFeatureId]);

	const pointMarkers = useMemo(
		() => extractPointMarkers(collection, getFeatureId),
		[collection, getFeatureId],
	);

	const showPolygonLayers = hasPolygonOrLineGeometry(collection);

	const selectedFeature = useMemo(() => {
		if (!selectedId) {
			return null;
		}

		return (
			collection.features.find(
				(feature) => String(feature.id) === selectedId,
			) ?? null
		);
	}, [collection.features, selectedId]);

	const selectedPopupPosition = selectedFeature
		? resolvePopupPosition(selectedFeature, popupPosition)
		: null;

	useEffect(() => {
		if (!fitToData) {
			return;
		}

		const map = mapRef.current?.getMap();
		const bounds = computeFeatureCollectionBbox(collection);
		if (!map || !bounds) {
			return;
		}

		const [[minLng, minLat], [maxLng, maxLat]] = bounds;
		if (minLng === maxLng && minLat === maxLat) {
			map.jumpTo({
				center: [minLng, minLat],
				zoom: Math.min(15, maxZoom),
			});
			return;
		}

		map.fitBounds(bounds, {
			padding: 48,
			maxZoom: Math.min(14, maxZoom),
			duration: 0,
		});
	}, [collection, fitToData, maxZoom]);

	const handleMapClick = (event: MapLayerMouseEvent) => {
		const clicked = event.features?.[0];
		const clickedId = clicked?.properties?.__pwId ?? clicked?.id;
		if (clickedId === undefined || clickedId === null) {
			return;
		}

		const featureId = String(clickedId);
		const feature =
			collection.features.find((item) => String(item.id) === featureId) ??
			null;
		if (!feature) {
			return;
		}

		setSelectedId(featureId);
		setPopupPosition({
			lng: event.lngLat.lng,
			lat: event.lngLat.lat,
		});
		onFeatureClick?.(feature);
	};

	const popupContent: ReactNode = selectedFeature
		? (renderPopup?.(selectedFeature) ?? (
				<DefaultPopupContent
					feature={selectedFeature}
					testId={popupTestId}
				/>
			))
		: null;

	return (
		<Stack
			direction="col"
			className={cn(
				"pw-geojson-map relative h-96 w-full shrink-0 overflow-hidden rounded-md border shadow-sm",
				className,
			)}
			data-testid={testId}
			style={style}
			onWheel={(event) => event.stopPropagation()}
		>
			<MapGL
				ref={mapRef}
				initialViewState={resolvedViewState}
				style={{ width: "100%", height: "100%" }}
				mapStyle={resolvedMapStyle}
				maxZoom={maxZoom}
				workerUrl={workerUrl}
				interactiveLayerIds={
					showPolygonLayers ? [FILL_LAYER_ID, LINE_LAYER_ID] : []
				}
				onClick={handleMapClick}
			>
				<NavigationControl position="top-right" showCompass={false} />
				{showPolygonLayers ? (
					<Source
						id={SOURCE_ID}
						type="geojson"
						data={collection}
						promoteId="__pwId"
					>
						<Layer
							id={FILL_LAYER_ID}
							type="fill"
							filter={["==", "$type", "Polygon"]}
							paint={{
								"fill-color": polygonFillColor,
								"fill-opacity": polygonFillOpacity,
							}}
						/>
						<Layer
							id={LINE_LAYER_ID}
							type="line"
							filter={[
								"in",
								"$type",
								"Polygon",
								"LineString",
							]}
							paint={{
								"line-color":
									polygonLineColor ?? polygonFillColor,
								"line-width": polygonLineWidth,
							}}
						/>
					</Source>
				) : null}
				{pointMarkers.map((marker) => (
					<Marker
						key={marker.key}
						longitude={marker.position.lng}
						latitude={marker.position.lat}
						anchor="bottom"
					>
						<button
							type="button"
							className="group cursor-pointer transition-transform hover:scale-110"
							data-testid={
								getPointTestId?.(
									marker.feature,
									marker.featureIndex,
									marker.vertexIndex,
								) ?? `geojson-map-point-${marker.key}`
							}
							aria-label={marker.label}
							onClick={(event) =>
								handlePointMarkerClick(
									event,
									marker,
									selectedId,
									setSelectedId,
									setPopupPosition,
									onFeatureClick,
								)
							}
						>
							<span className="relative flex drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
								<span className="absolute -inset-1 rounded-full bg-white/90 opacity-80 blur-[2px]" />
								<MapPin className="relative h-8 w-8 fill-primary stroke-[1.5] text-white" />
							</span>
						</button>
					</Marker>
				))}
				{selectedFeature && selectedPopupPosition && popupContent ? (
					<Popup
						longitude={selectedPopupPosition.lng}
						latitude={selectedPopupPosition.lat}
						anchor="top"
						className="pw-geojson-map-popup"
						closeOnClick
						onClose={() => {
							setSelectedId(null);
							setPopupPosition(null);
						}}
					>
						{popupContent}
					</Popup>
				) : null}
			</MapGL>
		</Stack>
	);
}
