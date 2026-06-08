<script setup lang="ts">
import type { YMapClusterer } from '@yandex/ymaps3-clusterer';
import type { YMap } from '@yandex/ymaps3-types';
import XIcon from '@app/shared/components/ui/XIcon.vue';
import { computed, ref, shallowRef } from 'vue';
import {
	YandexMap,
	YandexMapClusterer,
	YandexMapControls,
	YandexMapDefaultFeaturesLayer,
	YandexMapDefaultSchemeLayer,
	YandexMapMarker,
	YandexMapZoomControl,
} from 'vue-yandex-maps';

interface Point {
	lat: number;
	lon: number;
	address: string;
	id: number;
}

type Coordinates = [number, number];

const props = defineProps<{
	points: Point[];
}>();
const DEFAULT_CENTER: Coordinates = [61.361445, 55.150494];
const DEFAULT_ZOOM = 14;
const SELECTED_ZOOM = 16;
const CLUSTER_GRID_SIZE = 2 ** 7;
const ANIMATION_DURATION = 700;

const map = shallowRef<YMap | null>(null);
const clusterer = shallowRef<YMapClusterer | null>(null);
const selectedPoint = ref<Point['id'] | null>(null);

const defaultCenter = computed<Coordinates>(() => {
	if (props.points.length === 0) {
		return DEFAULT_CENTER;
	}
	const firstPoint = props.points[0];

	if (!firstPoint)
		return DEFAULT_CENTER;

	return [firstPoint.lon, firstPoint.lat];
});

const location = ref({
	center: defaultCenter.value,
	zoom: DEFAULT_ZOOM,
	duration: ANIMATION_DURATION,
});

function selectPoint(point: Point) {
	selectedPoint.value = point.id;
	location.value.center = [point.lon, point.lat];
	location.value.zoom = SELECTED_ZOOM;
}
</script>

<template>
	<YandexMap
		v-model="map"
		:settings="{
			location: {
				...location,
			},
			behaviors: ['drag', 'pinchZoom', 'dblClick'],
		}"
	>
		<YandexMapDefaultSchemeLayer />
		<YandexMapDefaultFeaturesLayer />
		<YandexMapControls :settings="{ position: 'right' }">
			<YandexMapZoomControl />
		</YandexMapControls>
		<YandexMapClusterer
			v-model="clusterer"
			:grid-size="CLUSTER_GRID_SIZE"
			zoom-on-cluster-click
		>
			<YandexMapMarker
				v-for="point in points"
				:key="point.id"
				position="left-center top"
				:container-attrs="{ style: { 'z-index': 1 } }"
				:settings="{ coordinates: [point.lon, point.lat] }"
				@click="selectPoint(point)"
			>
				<div class="map-marker">
					<div class="map-marker__point">
						<XIcon class="map-marker__point-icon" name="map-pin" />
					</div>
					<div v-if="selectedPoint === point.id" class="map-marker__info">
						<span class="title title--h6">{{ point.address }} </span>
					</div>
				</div>
			</YandexMapMarker>
			<template #cluster="{ length }">
				<div class="map-cluster">
					{{ length }}
				</div>
			</template>
		</YandexMapClusterer>
	</YandexMap>
</template>

<style lang="sass">
.map-cluster
	display: flex
	align-items: center
	justify-content: center

	width: fluid(40, 32)
	height: fluid(40, 32)

	border-radius: 50%
	background: var(--color-primary-500)

	color: var(--color-neutral-100)
	font-weight: 500

.map-marker
	position: relative

	&__point
		width: fluid(50, 40)
		height: fluid(50, 40)
		cursor: pointer

		&-icon
			width: fluid(50, 40)
			height: fluid(50, 40)

	&__info
		position: absolute
		left: 0
		min-width: 230px
		padding: var(--g-xs)
		border-radius: var(--radius-m)
		background: var(--color-neutral-100)
</style>
