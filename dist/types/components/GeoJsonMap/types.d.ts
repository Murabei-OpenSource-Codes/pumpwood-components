import type { StyleSpecification } from "maplibre-gl";
import type { CSSProperties, ReactNode } from "react";
export type GeoJsonGeometryType = "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon";
export interface IGeoJsonGeometry {
    type: GeoJsonGeometryType;
    coordinates: unknown;
}
export interface IGeoJsonFeature {
    type: "Feature";
    id?: string | number;
    geometry: IGeoJsonGeometry | null;
    properties?: Record<string, unknown> | null;
}
export interface IGeoJsonFeatureCollection {
    type: "FeatureCollection";
    features: IGeoJsonFeature[];
}
export type GeoJsonMapData = IGeoJsonFeatureCollection | IGeoJsonFeature | IGeoJsonGeometry;
export interface IGeoJsonMapViewState {
    longitude: number;
    latitude: number;
    zoom: number;
}
export interface IGeoJsonMapPosition {
    lng: number;
    lat: number;
}
export type GeoJsonMapStyle = string | StyleSpecification;
export interface IGeoJsonMapProps {
    data: GeoJsonMapData;
    mapStyle?: GeoJsonMapStyle;
    fitToData?: boolean;
    maxZoom?: number;
    initialViewState?: IGeoJsonMapViewState;
    className?: string;
    style?: CSSProperties;
    /**
     * MapLibre GL JS v6 worker asset URL. Required when the app is bundled
     * (Next.js, Vite, webpack). Omit for MapLibre v5.
     */
    workerUrl?: string;
    testId?: string;
    popupTestId?: string;
    polygonFillColor?: string;
    polygonFillOpacity?: number;
    polygonLineColor?: string;
    polygonLineWidth?: number;
    renderPopup?: (feature: IGeoJsonFeature) => ReactNode;
    getFeatureId?: (feature: IGeoJsonFeature, index: number) => string;
    getPointTestId?: (feature: IGeoJsonFeature, index: number, vertexIndex: number) => string;
    onFeatureClick?: (feature: IGeoJsonFeature) => void;
}
export interface IGeoJsonPointMarker {
    key: string;
    feature: IGeoJsonFeature;
    featureIndex: number;
    vertexIndex: number;
    position: IGeoJsonMapPosition;
    label: string;
}
