import "./geojson-map.css";
import type { IGeoJsonMapProps } from "./types";
export type { GeoJsonGeometryType, GeoJsonMapData, GeoJsonMapStyle, IGeoJsonFeature, IGeoJsonFeatureCollection, IGeoJsonGeometry, IGeoJsonMapPosition, IGeoJsonMapProps, IGeoJsonMapViewState, IGeoJsonPointMarker, } from "./types";
/**
 * Map canvas that renders GeoJSON points as HTML pins and polygons as
 * shaded fill layers. MapLibre is loaded on the client only.
 */
export declare function GeoJsonMap(props: IGeoJsonMapProps): import("react/jsx-runtime").JSX.Element;
