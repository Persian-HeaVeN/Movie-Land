import { type } from "@testing-library/user-event/dist/type";


export function isFavorite(movieID){

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    let state = false;

    favorites?.forEach(element => {
        if ( element.imdbID === movieID ) {
            state = true;
        }
    });
    return state
}


export function setFavorite(movieDatas) {

    const favorites = JSON.parse(localStorage.getItem("favorites")) === null ? [] : JSON.parse(localStorage.getItem("favorites"));

    if ( ! isFavorite(movieDatas.imdbID) ) {
        favorites.push(movieDatas)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        return true
    }
    return false
}


export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites"))
}

export function removeFavorite(movieID) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) === null ? [] : JSON.parse(localStorage.getItem("favorites"));

    favorites = favorites.filter((datas) => datas.imdbID !== movieID);

    if ( isFavorite(movieID) ) {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }
}