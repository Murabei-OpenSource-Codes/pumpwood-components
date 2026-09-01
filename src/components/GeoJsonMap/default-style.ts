import type { StyleSpecification } from "maplibre-gl";

const CARTO_VOYAGER_TILES = [
	"https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
];

const OSM_CARTO_ATTRIBUTION = "© OpenStreetMap contributors © CARTO";

/**
 * Default raster basemap for Storybook and consumers that omit `mapStyle`.
 */
export const DEFAULT_GEOJSON_MAP_STYLE: StyleSpecification = {
	version: 8,
	name: "pw-geojson-voyager",
	sources: {
		voyager: {
			type: "raster",
			tiles: CARTO_VOYAGER_TILES,
			tileSize: 256,
			maxzoom: 19,
			attribution: OSM_CARTO_ATTRIBUTION,
		},
	},
	layers: [
		{
			id: "voyager",
			type: "raster",
			source: "voyager",
		},
	],
};

export const DEFAULT_GEOJSON_MAP_VIEW_STATE = {
	longitude: -47.93,
	latitude: -15.78,
	zoom: 4,
};
