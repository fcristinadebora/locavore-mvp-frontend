import { ref } from "vue";
import { defineStore } from "pinia";
import { search, findById } from "../api/backend/cities";

export const useCitiesStore = defineStore("cities", () => {
  const lastSearchString = ref("");
  const searchCityResult = ref([]);

  const searchCity = async (searchString, maxResults = 100) => {
    try {
      if (searchString == lastSearchString.value) {
        return searchCityResult.value;
      }

      const result = await search(searchString, maxResults);

      searchCityResult.value = result.data;
      lastSearchString.value = searchString;
      return searchCityResult.value;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const findCity = async (id) => {
    try {
      const loadedCity = searchCityResult.length ? searchCityResult.filter((city) => city.id == id) : null;
      if (loadedCity) {
        return loadedCity;
      }

      const result = await findById(id);
      return result.data;

      return load

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { searchCity, findCity };
});
