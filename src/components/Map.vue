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

// function onMapClick(e) {
//   marker = new Leaflet.marker(e.latlng, {draggable:'true'});
//   marker.on('dragend', function(event){
//     var marker = event.target;
//     var position = marker.getLatLng();
//     marker.setLatLng(new Leaflet.LatLng(position.lat, position.lng),{draggable:'true'});
//     map.panTo(new Leaflet.LatLng(position.lat, position.lng))
//   });
//   map.addLayer(marker);
// };

// map.on('click', onMapClick);
// export default {
//   components: {
//     Page
//   },

//   data() {
//     return {
//       center: [-27.232240,-52.022991],
//       lastZoom: 15,
//       maxDistance: 0,
//       myIcon: null,
//       icon: {
//         iconUrl: require("@/assets/img/marker.png"),
//         iconSize: [20, 30],
//         popupAnchor: [0, -17],
//         shadowUrl: require("@/assets/img/markerShadow.png"),
//         shadowSize: [30, 35],
//         shadowAnchor: [10, 20],
//       },
//       loadedIds: [],
//       markers: [],
//       mapDiv: null
//     };
//   },

//   mounted() {
//     this.myIcon = L.icon(this.icon);
//     this.setCenter()
//     this.setupLeafletMap()
//   },

//   methods: {
//     doSearch() {
//       this.getItems()
//     },

//     getItems(){
//       if(this.$route.params.type == 'produtos'){
//         this.getProducts()
//       }

//       if(this.$route.params.type == 'produtores'){
//         this.getGrowers()
//       }

//       if(this.$route.params.type == 'favoritos'){
//         this.getFavorites()
//       }
//     },

//     getGrowers() {
//       var params = {};

//       if (this.$root.searchForm.localType == "city") {
//         params = {
//           city: this.$root.searchForm.local.city,
//           state: this.$root.searchForm.local.state,
//         };
//       }

//       params = {
//         ...params,
//         lat: this.center[0],
//         long: this.center[1],
//         max_distance: this.maxDistance,
//         ignorable_ids: this.loadedIds,
//         search_string: this.$root.searchForm.search,
//         order_by: "distance",
//       };

//       this.$store
//         .dispatch("grower/get", {
//           params: params,
//         })
//         .then((response) => {
//           response.data.forEach(element => {
//             this.addGrowerMarker(element)

//             if(!this.loadedIds.includes(element.id)){
//               this.loadedIds.push(element.id)
//             }
//           });
//         })
//         .finally(() => {})
//     },

//     getProducts() {
//       var params = {};

//       if (this.$root.searchForm.localType == "city") {
//         params = {
//           city: this.$root.searchForm.local.city,
//           state: this.$root.searchForm.local.state,
//         };
//       }

//       params = {
//         ...params,
//         lat: this.center[0],
//         long: this.center[1],
//         max_distance: this.maxDistance,
//         ignorable_ids: this.loadedIds,
//         search_string: this.$root.searchForm.search,
//         order_by: "distance",
//       };

//       this.$store
//         .dispatch("product/get", {
//           params: params,
//         })
//         .then((response) => {
//           response.data.forEach(element => {
//             this.addProductMarker(element)

//             if(!this.loadedIds.includes(element.id)){
//               this.loadedIds.push(element.id)
//             }
//           });
//         })
//         .finally(() => {
//         })
//     },

//     getFavorites() {
//       const params = {
//         user_id: this.$root.user.id,
//         lat: this.center[0],
//         long: this.center[1],
//         max_distance: this.maxDistance,
//         ignorable_ids: this.loadedIds,
//         with_address: true
//       };

//       this.$store
//         .dispatch("favorite/fetchFromApi", {
//           params: params,
//         })
//         .then((response) => {
//           response.data.forEach(element => {
//             this.addFavoriteMarker(element.favorite_user)

//             if(!this.loadedIds.includes(element.id)){
//               this.loadedIds.push(element.id)
//             }
//           });
//         })
//         .finally(() => {
//         })
//     },

//     setupLeafletMap: function () {
//       const mapDiv = L.map("mapContainer").setView(this.center, this.lastZoom);
//       this.mapDiv = mapDiv
//       L.tileLayer(
//         "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
//         {
//           id: "mapbox/streets-v11",
//           accessToken:
//             "sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
//         }
//       ).addTo(mapDiv);

//       L.marker(this.center, { icon: this.myIcon })
//         .addTo(mapDiv)
//         .bindPopup('Você está aqui')
//         .openPopup();

//       mapDiv.on('zoomend',this.handleZoomEnd)
//       mapDiv.on('moveend',this.handleMoveEnd)
//       this.handleMoveEnd()
//     },

//     addProductMarker (product) {
//       var content = `<strong>${product.name}</strong><br>`
//       content += `${product.street}, `
//       content += `${product.number ? product.number : 'Sem número'}, `
//       content += `${product.complement ? `${product.complement}, ` : '' } `
//       content += `${product.district}`

//       this.addMarker(content, product.lat, product.long)
//     },

//     addGrowerMarker (grower) {
//       var content = `<strong>${grower.name}</strong><br>`
//       content += `${grower.street}, `
//       content += `${grower.number ? grower.number : 'Sem número'}, `
//       content += `${grower.complement ? `${grower.complement}, ` : '' } `
//       content += `${grower.district}`

//       this.addMarker(content, grower.lat, grower.long)
//     },

//     addFavoriteMarker (favorite) {
//       var content = `<strong>${favorite.name}</strong><br>`
//       content += `${favorite.addresses[0].street}, `
//       content += `${favorite.addresses[0].number ? favorite.addresses[0].number : 'Sem número'}, `
//       content += `${favorite.addresses[0].complement ? `${favorite.addresses[0].complement}, ` : '' } `
//       content += `${favorite.addresses[0].district}`

//       this.addMarker(content, favorite.addresses[0].lat, favorite.addresses[0].long)
//     },

//     addMarker(content, lat, long){
//       L.marker([lat, long], { icon: this.myIcon })
//         .addTo(this.mapDiv)
//         .bindPopup(content);
//     },

//     handleZoomEnd () {
//       this.setMaxDistance()
//       this.doSearch()
//     },

//     handleMoveEnd(){
//       this.setMaxDistance()
//       this.updateCenter()
//       this.doSearch()
//     },

//     setMaxDistance() {
//       const bounds = this.mapDiv.getBounds()

//       const northWest = bounds.getNorthWest()
//       const northEast = bounds.getNorthEast()
//       const horizontalDistance = northWest.distanceTo(northEast) / 2 /1000;

//       const southWest = bounds.getSouthWest()
//       const verticalDistance = northWest.distanceTo(southWest) / 2 /1000;

//       if(horizontalDistance > verticalDistance){
//         this.maxDistance = horizontalDistance
//       } else {
//         this.maxDistance = verticalDistance
//       }
//     },

//     updateCenter () {
//       const center  = this.mapDiv.getCenter()

//       this.center = [center.lat, center.lng]
//     },

//     setCenter () {
//       if (this.$root.searchForm.localType == "coord") {
//         this.center = [this.$root.searchForm.local.lat, this.$root.searchForm.local.long]
//       }
//       if (this.$root.searchForm.localType == "address") {
//         this.center = [this.$root.searchForm.local.lat, this.$root.searchForm.local.long]
//       }
//     }

//   },
// };
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

