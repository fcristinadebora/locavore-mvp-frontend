<script setup>
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { onMounted, ref, watch, computed, toRaw } from "vue";

const props = defineProps(['center', 'recenterable', 'markers']);
const emit = defineEmits(['mainMarkerMoved', 'maxDistanceUpdated']);

const defaultMapCenter = {lat: -24.23224, lng: -50.022991};
const mapElement = ref(null);
const centerMaker = ref(null);
const mapIdentifier = ref(getRandomIdentifier());
const markerIds = ref([]);

const mapCenter = computed(() => isValidCoordinate(props.center)  ? props.center : defaultMapCenter);

watch(
  () => props.center,
  (center) => {
    updateMapCenter(center.lat, center.lng);
  }
);

watch(
  () => props.markers,
  (markers) => {
    addMarkers(markers);
  }
);

const mapOptions = ref({
  center: mapCenter.value,
  lastZoom: 15,
  maxDistance: 0,
  myIcon: null,
  icon: {
    iconUrl:"/img/pin-blue-white.png",
    shadowUrl: "/img/marker-shadow.png",
    iconSize: [20, 30],
    popupAnchor: [0, -17],
    shadowSize: [30, 35],
    shadowAnchor: [10, 20],
  },
  loadedIds: [],
  markers: [],
});

onMounted(() => {
  setupMap();
});

function getRandomIdentifier() {
  return 'mapContainer' + Math.random().toString(15);
}

function isValidCoordinate(coordinate = null) {
  if (coordinate == null) {
    return false;
  }

  return !!coordinate.lat && !!coordinate.lng;
}

function setupMap() {
  mapElement.value = Leaflet.map(mapIdentifier.value).setView(
    mapOptions.value.center,
    mapOptions.value.lastZoom
  );
  Leaflet.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
    {
      id: "mapbox/streets-v11",
      accessToken:
        "sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
    }
  ).addTo(mapElement.value);

  addMainMarker();
  addMarkers();

  mapElement.value.on("zoomend", handleZoomEnd);
  mapElement.value.on("moveend", handleMoveEnd);

  setMaxDistance();
}

function addMarkers () {
  if (!props.markers) {
    return;
  }

  props.markers.forEach((marker) => {
    addMarker(marker)
  });
}

// Use this later on with the producers :)
function addMarker(markerInfo) {
  if (markerIds.value.includes(markerInfo.id)) {
    return 'Marker already present, skip';
  }
  var content = markerInfo.popup;

  const icon = Leaflet.icon({iconUrl:"/img/pin-green.png", shadowUrl: "/img/marker-shadow.png"});
  const latLng = new Leaflet.LatLng(markerInfo.lat, markerInfo.lng, markerInfo.label);

  if(content.includes('{distanceWildcard}')) {
    const centerLatLng = centerMaker.value.getLatLng();
    const distanceInMeters = mapElement.value.distance(latLng, centerLatLng);
    if (distanceInMeters < 1000) {
      content = content.replace('{distanceWildcard}', `${distanceInMeters.toFixed(0)}m`);
    } else{
      const distanceInKm = distanceInMeters / 1000;
      content = content.replace('{distanceWildcard}', `${distanceInKm.toFixed(1)}km`);
    }
  }

  const marker = Leaflet.marker(latLng, { icon })
    .addTo(toRaw(mapElement.value))
    .bindPopup(content);

  marker.on('click', centerOnMarkerClick);
  markerIds.value.push(markerInfo.id);
}

function addMainMarker() {
  const icon = Leaflet.icon({iconUrl:"/img/pin-blue-white.png", shadowUrl: "/img/marker-shadow.png"});
  centerMaker.value = Leaflet.marker(mapOptions.value.center, { icon: icon, draggable: props.recenterable ? true : false })
    .addTo(toRaw(mapElement.value))
    .bindPopup("Você está aqui")
    .openPopup();

  centerMaker.value.on('click', centerOnMarkerClick);
  
  if (props.recenterable) {
    centerMaker.value.on('dragend', onCenterMarkerDrag)
    mapElement.value.on('click', onMapClick)
  }
}

function onCenterMarkerDrag(event) {
  const position = centerMaker.value.getLatLng();
  recenterView(position.lat, position.lng);
  emit('mainMarkerMoved', {lat: position.lat, lng: position.lng});
}

function onMapClick(event) {
  const position = event.latlng;
  recenterView(position.lat, position.lng);
  emit('mainMarkerMoved', {lat: position.lat, lng: position.lng});
}

function centerOnMarkerClick(event) {
  const position = event.latlng;
  recenterView(position.lat, position.lng);
}

function updateMapCenter(newLat, newLng) {
  const latLngObj = new Leaflet.LatLng(newLat, newLng);
  centerMaker.value.setLatLng(latLngObj);
  recenterView(newLat, newLng);
}

function recenterView (lat, lng) {
  mapElement.value.setView(new Leaflet.latLng(lat, lng));
}

function handleZoomEnd () {
  setMaxDistance()
}

function handleMoveEnd(){
  setMaxDistance()
}

function getCenter() {
  const center  = mapElement.value.getCenter()

  return {
    lat: center.lat,
    lng:center.lng
  }
}

function setMaxDistance() {
  const bounds = mapElement.value.getBounds()

  const northWest = bounds.getNorthWest()
  const northEast = bounds.getNorthEast()
  const horizontalDistance = northWest.distanceTo(northEast) / 2;

  const southWest = bounds.getSouthWest()
  const verticalDistance = northWest.distanceTo(southWest) / 2;

  var maxDistance = 0;
  if(horizontalDistance > verticalDistance){
    maxDistance = horizontalDistance
  } else {
    maxDistance = verticalDistance
  }

  const mapCenter = getCenter();
  emit('maxDistanceUpdated', {maxDistance: maxDistance, unit: 'meters', from: {lat : mapCenter.lat, lng : mapCenter.lng }});
}
</script>

<style>
.mapContainer {
  width: 100%;
  height: 70vh;
  min-height: 350px;
  z-index: 98;
}
.leaflet-marker-icon{
  width: 36px;
  height: 36px;
}
.leaflet-marker-shadow {
  margin-top: -3px;
  margin-left: 2px;
}
.leaflet-popup {
  margin-left: 15px;
}
</style>

<template>
  <div :id="mapIdentifier" class="mapContainer"></div>
</template>

