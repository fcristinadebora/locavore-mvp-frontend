const KEY_SEARCH_SELECTED_CITY = 'searchSelectedCity';

function setSearchSelectedLocation(keyValue) {
    localStorage.setItem(KEY_SEARCH_SELECTED_CITY, JSON.stringify(keyValue));
}

function getSearchSelectedLocation(keyValue) {
    return JSON.parse(localStorage.getItem(KEY_SEARCH_SELECTED_CITY));
}

export default {
    setSearchSelectedLocation,
    getSearchSelectedLocation
}