import type { IGeoJsonMapProps } from "./types";
type MapLibreModule = typeof import("react-map-gl/maplibre");
export interface IGeoJsonMapCanvasProps extends IGeoJsonMapProps {
    mapModule: MapLibreModule;
    resolvedMapStyle: IGeoJsonMapProps["mapStyle"];
    resolvedViewState: NonNullable<IGeoJsonMapProps["initialViewState"]>;
}
export declare function GeoJsonMapCanvas({ mapModule, data, resolvedMapStyle, resolvedViewState, fitToData, maxZoom, className, style, workerUrl, testId, popupTestId, polygonFillColor, polygonFillOpacity, polygonLineColor, polygonLineWidth, renderPopup, getFeatureId, getPointTestId, onFeatureClick, }: IGeoJsonMapCanvasProps): import("react/jsx-runtime").JSX.Element;
export {};
