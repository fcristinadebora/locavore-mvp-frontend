import { defineStore } from "pinia";
import { ref } from "vue";

import localStorageHelper from '../helpers/localStorage';
import { useCitiesStore } from "./cities";

export const useSearchStore = defineStore("search", () => {
    const citiesStore = useCitiesStore();
    const searchLocation = ref(null); //Search location = city (currently, it may change to a neighbour or an specific address, that's why it has a generic name)
    const searchCoordinates = ref(null); //Search coordinates = the coordinates used as reference point for search and distance calculation, can be different from the searchLocation.coordinates

    const setSearchLocation = (newSearchLocation) => {
        localStorageHelper.setSearchSelectedLocation(newSearchLocation);
        searchLocation.value = newSearchLocation;
    }

    const setSearchCoordinates = ({ lat, lng }) => {
        searchCoordinates.value = { lat, lng };
        localStorageHelper.setSearchCoordinates(searchCoordinates.value);
    }

    const getSearchLocation = async (id = 0) => {
        if (id) {
            const searchLocationFromId = await getSearchLocationFromId(id);
            searchLocation.value = searchLocationFromId;
        }

        if (searchLocation.value) {
            return searchLocation.value;
        }
        
        const locationFromStorage = localStorageHelper.getSearchSelectedLocation();
        if (locationFromStorage) {
            searchLocation.value = locationFromStorage;
            return locationFromStorage;
        }
        
        return null;
    }

    const getSearchLocationFromId = async (id) => {
        if (searchLocation.value && searchLocation.value.id == id) {
            return searchLocation.value;
        }

        const city = await citiesStore.findCity(id);
        if (!city) {
            return city;
        }

        const locationFromStore = await citiesStore.findCity(id);
        if (locationFromStore) {
            return locationFromStore;
        }

        return null;
    }

    const getSearchCoordinates = async () => {
        if (searchCoordinates.value) {
            return searchCoordinates.value;
        }
        
        const coordinatesFromStorage = localStorageHelper.getSearchCoordinates();
        if (coordinatesFromStorage) {
            return coordinatesFromStorage;
        }

        //fallback, not found, lets see if we get from the city
        const location = await getSearchLocation();
        if (location){
            setSearchCoordinates({
                lat: location.coordinates[1],
                lng: location.coordinates[0],
            });
        }
        
        return null;
    }

    return {searchLocation, searchCoordinates, setSearchCoordinates, getSearchCoordinates, setSearchLocation, getSearchLocation };
});