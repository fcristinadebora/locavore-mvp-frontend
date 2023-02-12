const KEY_SEARCH_SELECTED_CITY = 'searchSelectedCity';

function setSearchSelectedCity(keyValue) {
    localStorage.setItem(KEY_SEARCH_SELECTED_CITY, JSON.stringify(keyValue));
}

function getSearchSelectedCity(keyValue) {
    return JSON.parse(localStorage.getItem(KEY_SEARCH_SELECTED_CITY));
}

export default {
    setSearchSelectedCity,
    getSearchSelectedCity
}