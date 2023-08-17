import React, { useContext, useEffect, useState } from 'react';

import PriceFilter from '../Filters/PriceFilter';
import StatusFilter from '../Filters/StatusFilter';
import DistrictFilter from '../Filters/DistrictFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import MinMaxTypeFilter from '../Filters/MinMaxTypeFilter';
import SelectTypeFilter from '../Filters/SelectTypeFilter';
import CheckboxFilter from '../Filters/CheckboxFilter';
import RadioBoxFilter from '../Filters/RadioBoxFilter';
import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { URLMaker, URLMakerWithFilter } from '../../Utils/Utils';



const FilterSection = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const cityContext = useContext(CityContext)
    const currentCat = useContext(CategoryContext)

    const [queryStirng] = useSearchParams();

    const [filtersObject, setFiltersObject] = useState({})

    // console.log(currentCat);
    // console.log(location.search);

    console.log(cityContext);

    useEffect(() => {
        let queryObject = {}
        console.log("Query String Has Been Changed..");
        console.log(location);
        if (location.search !== "") {
            let urlQueryString = location.search.slice(1);
            let urlQueryArray = urlQueryString.split("&");
            urlQueryArray.forEach((item) => {
                let subQuery = item.split("=");
                queryObject = { ...queryObject, [subQuery[0]]: decodeURIComponent(subQuery[1]) }
            })
            setFiltersObject(queryObject)
        }
        console.log(queryObject);
    }, [queryStirng])



    const urlMakerWithMinMaxFilter = (slug, value, opt) => {
        
        console.log(filtersObject);
        let newUrl = location.pathname;
        console.log(newUrl);
        console.log(slug, value, opt);

        let filters = { ...filtersObject }

        let cat = ''
        if (currentCat !== undefined) {
            cat = currentCat.slug
        }

        let minFilterUrl = '';
        let maxFilterUrl = '';
        let newArrayFilter = ['', ''];


        if (slug in filtersObject) {

            let filterArray = filters[slug].split("-");
            minFilterUrl = filterArray[0];
            maxFilterUrl = filterArray[1];
            if (opt === "max") {
                newArrayFilter[0] = minFilterUrl
                newArrayFilter[1] = value
            } else {
                newArrayFilter[0] = value
                newArrayFilter[1] = maxFilterUrl
            }
            let newFilterQuery = newArrayFilter.join("-")

            if (newFilterQuery == '-') {
                delete filters[slug]
            }else{
                filters[slug] = newFilterQuery
            }

            // console.log(URLMaker(cityContext.citiesList, cat, filters));

            navigate(URLMaker(cityContext.citiesList, cat, filters))
            // console.log(URLMaker(cityContext.citiesList, cat, filters));

        } else {
            if (opt === "max") {
                newArrayFilter[1] = value
            } else {
                newArrayFilter[0] = value
            }
            let newFilterQuery = newArrayFilter.join("-")
            if (newFilterQuery == '-') {
                delete filters[slug]
            }else{
                filters[slug] = newFilterQuery
            }
            console.log(filters);
            // console.log(URLMaker(cityContext.citiesList, cat, filters));

            navigate(URLMaker(cityContext.citiesList, cat,filters ))
            // console.log(URLMaker(cityContext.citiesList, cat,filters ))
        }




        // if (queryStirng.has(slug)) {
        //     let filterArray = queryStirng.get(slug).split("-");
        //     minFilterUrl = filterArray[0];
        //     maxFilterUrl = filterArray[1];

        //     if (opt === "max") {
        //         newArrayFilter[0] = minFilterUrl
        //         newArrayFilter[1] = value
        //     } else {
        //         newArrayFilter[0] = value
        //         newArrayFilter[1] = maxFilterUrl
        //     }

        //     let newFilterQuery = newArrayFilter.join("-")
        //     if (newFilterQuery == '-') {
        //         newFilterQuery = ''
        //     }
        //     // newUrl += "?price=" + price
        //     console.log(newFilterQuery);
        //     navigate(URLMaker(cityContext.citiesList, cat, slug, newFilterQuery))

        // } else {
        //     if (opt === "max") {
        //         newArrayFilter[1] = value
        //     } else {
        //         newArrayFilter[0] = value
        //     }
        //     let newPriceQuery = newArrayFilter.join("-")

        //     navigate(URLMaker(cityContext.citiesList, cat, slug, newPriceQuery))

        // }

    }

    const urlMakerClearMinMax = () => {
        let cat = ''
        if (currentCat !== undefined) {
            cat = currentCat.slug
        }
        navigate(URLMaker(cityContext.citiesList, cat, ''))
    }



    return (<>

        <CategoryFilter />
        <DistrictFilter />

        {/* <PriceFilter /> */}

        <MinMaxTypeFilter
            title="قیمت"
            unit="تومان"
            slug="price"
            suggestListMin={[10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000]}
            suggestListMax={[10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000]}
            minPlaceHolder="مثلا 40,000,000 "
            maxPlaceHolder="مثلا 70,000,000"
            urlMaker={urlMakerWithMinMaxFilter}
            urlClearMaker={urlMakerClearMinMax}
        />

        <StatusFilter />

        <SelectTypeFilter
            title="سن بنا"
            unit=""
            suggestList={["نوساز", "حداکثر 5 سال", "حداکثر 10 سال", "حداکثر 15 سال", "حداکثر 20 سال", "حداکثر 25 سال", "حداکثر 30 سال", "بیش از 30 سال"]}
            selectPlaceHolder="سن بنا را انتخاب نمایید"
        />
        <MinMaxTypeFilter
            title="متراژ"
            unit="متر"
            slug="meter"
            suggestListMin={[40, 50, 60]}
            suggestListMax={[90, 100, 120]}
            minPlaceHolder="مثلا 100 "
            maxPlaceHolder="مثلا 150 "
            urlMaker={urlMakerWithMinMaxFilter}
            urlClearMaker={urlMakerClearMinMax}
        />



        <RadioBoxFilter
            title="آگهی دهنده"
            itemsList={["همه", "شخصی", "مشاور املاک"]}
        />

        <CheckboxFilter
            title="تعداد اتاق"
            unit=""
            suggestList={["بدون اتاق", 1, 2, 3, 4, "بیشتر از 4"]}
        />

        <MinMaxTypeFilter
            title="طبقه"
            unit=""
            suggestListMin={["زیرهمکف", "همکف", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}
            suggestListMax={["زیرهمکف", "همکف", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}
            minPlaceHolder="مثلا 2 "
            maxPlaceHolder="مثلا 5 "
        />


    </>
    );
}

export default FilterSection;
