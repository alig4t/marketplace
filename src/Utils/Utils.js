

export const URLMaker = (city, cat, filters = {}) => {

    let hashCities = '';
    let multiCity = city.length > 1 ? true : false
    let cityName = city.length > 1 ? "iran" : city[0].slug
    let catName = cat !== undefined ? cat : ''
    if (multiCity) {
        city.forEach((item, key) => {
            hashCities += item.id
            if (key < city.length - 1) {
                hashCities += ','
            }
        })
        // hashCities = encodeURIComponent(hashCities)
        filters.cities = hashCities
    } else {
        hashCities = city[0].slug
    }

    let filtersString = '?' + new URLSearchParams(filters);
    let urlArray = ['/s', cityName, catName]
    // console.log(catName);
    urlArray = urlArray.filter((seg) => seg !== '')
    urlArray = urlArray.join('/')
    // console.log(urlArray + filtersString);

    // console.log(urlArray + filtersString);

    return urlArray + filtersString

}


export const URLMakerWithHash = (hash, cat) => {
    console.log(cat);
    let catPath = cat === '' || cat == undefined ? "" : "/" + cat;
    return `/s/iran${catPath}?cities=${hash}`
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
