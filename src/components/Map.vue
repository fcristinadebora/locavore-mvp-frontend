<script setup>
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { onMounted, ref, watch, computed } from "vue";

const props = defineProps(['center']);
const emit = defineEmits(['mainMarkerMoved']);

const defaultMapCenter = {lat: -24.23224, lng: -50.022991};
const mapElement = ref(null);
const centerMaker = ref(null);

const mapCenter = computed(() => isValidCoordinate(props.center)  ? props.center : defaultMapCenter);

watch(
  () => props.center,
  (center) => {
    updateMapCenter(center.lat, center.lng);
  })

const mapOptions = ref({
  center: mapCenter.value,
  lastZoom: 15,
  maxDistance: 0,
  myIcon: null,
  icon: {
    iconUrl: "@/img/map-marker.png",
    iconSize: [20, 30],
    popupAnchor: [0, -17],
    // shadowUrl: require("@/assets/img/markerShadow.png"),
    shadowSize: [30, 35],
    shadowAnchor: [10, 20],
  },
  loadedIds: [],
  markers: [],
});

onMounted(() => {
  setupMap();
});

function isValidCoordinate(coordinate = null) {
  if (coordinate == null) {
    return false;
  }

  return !!coordinate.lat && !!coordinate.lng;
}

function setupMap() {
  mapElement.value = Leaflet.map("mapContainer").setView(
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

  // mapContainer.on("zoomend", this.handleZoomEnd);
  // mapContainer.on("moveend", this.handleMoveEnd);

  // this.handleMoveEnd();
}

// Use this later on with the producers :)
function addMarker() {
  const marker = Leaflet.marker(mapOptions.value.center)
    .addTo(mapElement.value)
    .bindPopup("Você está aqui")
    .openPopup();
}

function addMainMarker() {
  centerMaker.value = Leaflet.marker(mapOptions.value.center, { draggable: 'true' })
    .addTo(mapElement.value)
    .bindPopup("Você está aqui")
    .openPopup();

    centerMaker.value.on('dragend', function (event) {
    const position = centerMaker.value.getLatLng();

    recenterView(position.lat, position.lng);

    emit('mainMarkerMoved', {lat: position.lat, lng: position.lng});
  })
}

function updateMapCenter(newLat, newLng) {
  const latLngObj = new Leaflet.LatLng(newLat, newLng);
  centerMaker.value.setLatLng(latLngObj);
  recenterView(newLat, newLng);
}

function recenterView (lat, lng) {
  mapElement.value.setView(new Leaflet.latLng(lat, lng));
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

<style scoped>
#mapContainer {
  width: 100%;
  height: 70vh;
  min-height: 350px;
  z-index: 98;
}
</style>

<template>
  <div id="mapContainer"></div>
</template>

