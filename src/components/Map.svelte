<script>
	import { Card } from 'flowbite-svelte';
	import 'ol/ol.css';
	import { onMount } from 'svelte';

	import Feature from 'ol/Feature';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import Point from 'ol/geom/Point';
	import TileLayer from 'ol/layer/Tile';
	import VectorLayer from 'ol/layer/Vector';
	import { fromLonLat } from 'ol/proj';
	import VectorSource from 'ol/source/Vector';
	import XYZ from 'ol/source/XYZ';
	import CircleStyle from 'ol/style/Circle';
	import Fill from 'ol/style/Fill';
	import Stroke from 'ol/style/Stroke';
	import Style from 'ol/style/Style';

	let { data } = $props();
	let { data: allData } = data;
	let map;

	const coordinates = allData.map((item) => [item.location.longitude, item.location.latitude]);

	// get center coordinate of the map
	function getCenterCoordinate(coords) {
		// Convert degrees to radians
		const toRadians = (degrees) => (degrees * Math.PI) / 180;
		const toDegrees = (radians) => (radians * 180) / Math.PI;

		let x = 0,
			y = 0,
			z = 0;

		// Convert each coordinate to Cartesian and sum
		coords.forEach(([lon, lat]) => {
			const latRad = toRadians(lat);
			const lonRad = toRadians(lon);

			x += Math.cos(latRad) * Math.cos(lonRad);
			y += Math.cos(latRad) * Math.sin(lonRad);
			z += Math.sin(latRad);
		});

		// Average the Cartesian coordinates
		const total = coords.length;
		x /= total;
		y /= total;
		z /= total;

		// Convert Cartesian back to latitude and longitude
		const centralLon = Math.atan2(y, x);
		const hyp = Math.sqrt(x * x + y * y);
		const centralLat = Math.atan2(z, hyp);

		return [toDegrees(centralLon), toDegrees(centralLat)];
	}

	const center = getCenterCoordinate(coordinates);

	onMount(() => {
		const features = allData.map((item) => {
			const point = new Point(fromLonLat([item.location.longitude, item.location.latitude]));
			const feature = new Feature({ geometry: point });

			// Assign a dynamic style based on status
			feature.setStyle(
				new Style({
					image: new CircleStyle({
						radius: 8,
						fill: new Fill({ color: item.status === 'active' ? 'green' : 'red' }),
						stroke: new Stroke({ color: 'white', width: 2 })
					})
				})
			);

			return feature;
		});

		// Create vector source and layer
		const vectorSource = new VectorSource({ features });
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: new Style({
				image: new CircleStyle({
					radius: 6,
					fill: new Fill({ color: 'limegreen' }),
					stroke: new Stroke({ color: 'white', width: 2 })
				})
			})
		});

		// Initialize the map
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
					})
				}),
				vectorLayer
			],
			view: new View({
				center: fromLonLat(center),
				zoom: 3
			})
		});
	});
</script>

<div>
	<Card size>
		<h5 class="text-md mb-5 me-1 font-bold leading-none text-gray-900 dark:text-white">Map View</h5>
		<div id="map"></div>
	</Card>
</div>

<style>
	#map {
		width: 100%;
		height: 300px;
	}
</style>
