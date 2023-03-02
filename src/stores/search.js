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

    const getSearchLocation = async (id = 0) => {
        if (id) {
            return await getSearchLocationFromId(id);
        }

        if (searchLocation.value) {
            console.log('found on store');
            return searchLocation.value;
        }
        
        const locationFromStorage = localStorageHelper.getSearchSelectedLocation();
        if (locationFromStorage) {
            console.log('found on localstorage');
            return locationFromStorage;
        }
        
        return null;
    }

    const getSearchLocationFromId = async (id) => {
        const city = await citiesStore.findCity(id);
        if (!city) {
            return city;
        }

        const locationFromStore = await citiesStore.findCity(id);
        if (locationFromStore) {
            console.log('fetch from api');
            return locationFromStore;
        }

        return null;
    }

    return {searchLocation, setSearchLocation, getSearchLocation };
});