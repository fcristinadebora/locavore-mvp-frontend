const KEY_SEARCH_SELECTED_CITY = 'searchSelectedCity';
const KEY_SEARCH_COORDINATES = 'searchCoordinates';
const KEY_PAGE_REFERRER = 'pageReferrer';

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

function getPageReferrer() {
    return JSON.parse(localStorage.getItem(KEY_PAGE_REFERRER));
}

function setPageReferrer(keyValue) {
    localStorage.setItem(KEY_PAGE_REFERRER, JSON.stringify(keyValue));
}

export default {
    setSearchSelectedLocation,
    getSearchSelectedLocation,
    setSearchCoordinates,
    getSearchCoordinates,
    setPageReferrer,
    getPageReferrer
}