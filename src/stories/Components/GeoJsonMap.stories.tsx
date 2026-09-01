import type { Meta, StoryObj } from "@storybook/react-vite";
import { GeoJsonMap, type IGeoJsonFeatureCollection } from "@/components/GeoJsonMap";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

const pointCollection: IGeoJsonFeatureCollection = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			id: 1,
			geometry: {
				type: "Point",
				coordinates: [-43.9378, -19.9167],
			},
			properties: {
				title: "Belo Horizonte",
				description: "Praça Sete de Setembro",
			},
		},
	],
};

const polygonCollection: IGeoJsonFeatureCollection = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			id: 10,
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[-44.06, -19.99],
						[-43.82, -19.99],
						[-43.82, -19.78],
						[-44.06, -19.78],
						[-44.06, -19.99],
					],
				],
			},
			properties: {
				title: "Área de concessão",
				description: "Polígono de exemplo em Belo Horizonte",
			},
		},
	],
};

const mixedCollection: IGeoJsonFeatureCollection = {
	type: "FeatureCollection",
	features: [...polygonCollection.features, ...pointCollection.features],
};

const meta = {
	title: "Pumpwood/Components/GeoJsonMap",
	component: GeoJsonMap,
	args: {
		workerUrl: maplibreWorkerUrl,
	},
} satisfies Meta<typeof GeoJsonMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Point: Story = {
	args: {
		data: pointCollection,
		fitToData: true,
		className: "h-[480px]",
	},
};

export const Polygon: Story = {
	args: {
		data: polygonCollection,
		fitToData: true,
		className: "h-[480px]",
	},
};

export const MixedFeatureCollection: Story = {
	args: {
		data: mixedCollection,
		fitToData: true,
		className: "h-[480px]",
	},
};

export const Dark: Story = {
	render: () => (
		<div className="dark bg-background p-4">
			<GeoJsonMap
				data={mixedCollection}
				fitToData
				className="h-[480px]"
				workerUrl={maplibreWorkerUrl}
			/>
		</div>
	),
	args: {
		data: mixedCollection,
	},
};
