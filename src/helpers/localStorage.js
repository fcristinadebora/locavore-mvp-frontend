const KEY_SEARCH_SELECTED_CITY = 'searchSelectedCity';
const KEY_SEARCH_COORDINATES = 'searchCoordinates';

function setSearchSelectedLocation(keyValue) {
    localStorage.setItem(KEY_SEARCH_SELECTED_CITY, JSON.stringify(keyValue));
}

function getSearchSelectedLocation(keyValue) {
    return JSON.parse(localStorage.getItem(KEY_SEARCH_SELECTED_CITY));
}

function setSearchCoordinates(keyValue) {
    localStorage.setItem(KEY_SEARCH_COORDINATES, JSON.stringify(keyValue));
}

function getSearchCoordinates(keyValue) {
    return JSON.parse(localStorage.getItem(KEY_SEARCH_COORDINATES));
}

export default {
    setSearchSelectedLocation,
    getSearchSelectedLocation,
    setSearchCoordinates,
    getSearchCoordinates
}