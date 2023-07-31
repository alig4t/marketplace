
export const URLMaker = (city, cat) => {
    let path = '';
    let catPath = cat == '' ? "" : "/"+cat;
    let hashCities = '';
    let multiCity = city.length > 1 ? true : false
    // console.log(city);
    if (multiCity) {
        city.forEach((item, key) => {
            hashCities += item.id
            if (key < city.length - 1) {
                hashCities += ','
            }
        })
        hashCities = encodeURIComponent(hashCities)
    }else{
        hashCities = city[0].slug
    }
    // console.log(hashCities);

    if(multiCity){
        return `/s/iran${catPath}?cities=${hashCities}`
    }else{
        return `/s/${hashCities}/${cat}`
    }
}

export const URLMakerWithHash = (hash, cat) => {
    console.log(cat);
    let catPath = cat === '' || cat == undefined ? "" : "/"+cat;
    // let multiCity = text.search("%2C") > 1 ? true : false;

    return `/s/iran${catPath}?cities=${hash}`

    // if(multiCity){
    //     return `/s/iran${catPath}?cities=${hashCities}`
    // }else{
    //     return `/s/${hashCities}/${cat}`
    // }
}