import React, { useContext, useEffect, useState } from 'react';

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
import { URLMaker } from '../../Utils/Utils';



const FilterSection = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const cityContext = useContext(CityContext)
    const currentCat = useContext(CategoryContext)

    const [queryStirng] = useSearchParams();

    let cat = ''
    if (currentCat !== undefined) {
        cat = currentCat.slug
    }

    // const filterTypes = ["price", "districts", "meter"]
    const filterTypes = [
        {
            slug: "price",
            type: "MinMaxTypeFilter",
            title: "قیمت",
            unit: "تومان",
            suggestMin: [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000],
            suggestMax: [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000],
            exampleMin: "مثلا 40,000,000 ",
            exampleMax: "مثلا 70,000,000 "
        },
        {
            slug: "districts",
            type: "DistrictFilter",
            title: "محله",
            itemsList: [
                { "id": 12, "title": "آجودانیه", "city": 113, "neighbours": "سباری، موحد دانش، منجیل" },
                { "id": 13, "title": "آذربایجان", "city": 113, "neighbours": "کلهر، آذربایجان، رودکی، آزادی" },
                { "id": 14, "title": "اختیاریه", "city": 113, "neighbours": "اختیاریه شمالی، دیباجی جنوبی، کلاهدوز، پاسداران، منظریه، جهانتاب، کاوه، سنجابی" },
                { "id": 15, "title": "تهران‌ویلا", "city": 113, "neighbours": "امام منتظر، ستارخان، منصوری کیا" },
                { "id": 16, "title": "قیطریه", "city": 113, "neighbours": "قیطریه، اندرزگو، صبا، کاوه، پل رومی، شریعتی، سبحان، سهیل، بهار شمالی، صدر، قلندری شمالی، صدر، قیطریه" },
                { "id": 31, "title": "باغ نگار", "city": 132, "neighbours": "هفت دست، فیض" },
                { "id": 32, "title": "بهاران", "city": 132, "neighbours": "" },
                { "id": 33, "title": "فرهنگ", "city": 132, "neighbours": "باغ زیار، سهروردی، کشاورز" }
            ]
        },
        {
            slug: "meter",
            type: "MinMaxTypeFilter",
            title: "متراژ",
            unit: "متر",
            suggestMin: [50, 60, 70, 80],
            suggestMax: [50, 60, 70, 80],
            exampleMin: "مثلا 70",
            exampleMax: "مثلا 140"
        },
        {
            slug: "building-age",
            type: "SelectTypeFilter",
            title: "سن بنا",
            unit: "سال",
            suggestList: [
                { title: "حداکثر 1 سال", value: "1" },
                { title: "حداکثر 2 سال", value: "2" },
                { title: "حداکثر 5 سال", value: "5" },
                { title: "حداکثر 10 سال", value: "10" },
                { title: "حداکثر 15 سال", value: "15" },
                { title: "حداکثر 20 سال", value: "20" },
                { title: "حداکثر 25 سال", value: "25" },
                { title: "حداکثر 30 سال", value: "30" },
                { title: "بیش از 30 سال", value: "30-" }
            ],
            placeHolder: "سن بنا را انتخاب نمایید"
        },
        {
            slug: "originality",
            type: "SelectTypeFilter",
            title: "اصالت برند",
            unit: "",
            suggestList: [
                { title: "اصل", value: "original" },
                { title: "غیر اصل", value: "fake" },
            ],
            placeHolder: "انتخاب"
        },
        {
            slug: "user_type",
            type: "RadioBoxFilter",
            title: "آگهی دهنده",
            itemsList: [
                { title: "همه", value: "all" },
                { title: "شخصی", value: "personal" },
                { title: "مشاور املاک", value: "agency" },
            ],
            default: "all"
        },
        {
            slug: "rooms",
            type: "CheckboxFilter",
            title: "تعداد اتاق",
            itemsList: [
                { title: "بدون اتاق", value: "noroom" },
                { title: "1", value: "1" },
                { title: "2", value: "2" },
                { title: "3", value: "3" },
                { title: "4", value: "4" },
                { title: "بیشتر از 4", value: "more" },
            ]
        }, {
            title: "وضعیت آگهی",
            type: "StatusFilter",
            itemsList: [
                { title: "حذف توافقی ها", slug: "non-negotiable", enTitle: "negotiable" },
                { title: "فقط فوری ها", slug: "urgent", enTitle: "urgent" }
            ]
        },
        {
            title: "امکانات تصویری آگهی",
            type: "StatusFilter",
            itemsList: [
                { title: "ویدیو دار", slug: "has-video", enTitle: "video" },
                { title: "عکس دار", slug: "has-photo", enTitle: "image2" }
            ]
        }

    ]


    // <StatusFilter
    //         urlMaker={urlMakerWithStatus}
    //         urlClear={urlMakerStatusClear}
    //     />


    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(getQueryObjectUrl());
    //     }, 1500)
    // })

    const getQueryObjectUrl = () => {
        let queryObject = {}
        if (location.search !== "") {
            let urlQueryString = location.search.slice(1);
            let urlQueryArray = urlQueryString.split("&");
            urlQueryArray.forEach((item) => {
                let subQuery = item.split("=");
                console.log(subQuery);
                // console.log(decodeURIComponent(subQuery[1]));
                try {
                    // decodedValue = decodeURIComponent(subQuery[1])
                    queryObject = { ...queryObject, [subQuery[0]]: decodeURIComponent(subQuery[1]) }

                } catch (ex) {
                    // alert("ERROR DECODING URI");
                    console.log("اروووور");
                }
            })
        }
        return queryObject
    }


    const urlMakerWithMinMaxFilter = (slug, value, opt) => {




        let filters = getQueryObjectUrl();


        let minFilterUrl = '';
        let maxFilterUrl = '';
        let newArrayFilter = ['', ''];


        if (slug in filters) {

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

            if (newFilterQuery === '-') {
                delete filters[slug]
            } else {
                filters[slug] = newFilterQuery
            }



            navigate(URLMaker(cityContext.citiesList, cat, filters))

        } else {
            if (opt === "max") {
                newArrayFilter[1] = value
            } else {
                newArrayFilter[0] = value
            }
            let newFilterQuery = newArrayFilter.join("-")
            if (newFilterQuery === '-') {
                delete filters[slug]
            } else {
                filters[slug] = newFilterQuery
            }

            navigate(URLMaker(cityContext.citiesList, cat, filters))
        }

    }

    const urlMakerClearMinMax = (slug) => {



        let filters = getQueryObjectUrl();

        if (slug in filters) {
            delete filters[slug]
        }
        navigate(URLMaker(cityContext.citiesList, cat, filters))
    }

    const urlMakerWithStatus = (slug) => {

        let filters = getQueryObjectUrl();

        if (slug in filters) {
            let currentStatus = JSON.parse(filters[slug].toLowerCase());
            if (!currentStatus === true) {
                filters[slug] = !currentStatus;
            } else {
                delete filters[slug]
            }
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        } else {
            filters[slug] = "true"
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        }

    }

    const urlMakerStatusClear = (items) => {
        let filters = getQueryObjectUrl();
        items.forEach((switchItem) => {
            if (switchItem.slug in filters) {
                delete filters[switchItem.slug]
            }
        })
        navigate(URLMaker(cityContext.citiesList, cat, filters))
    }

    const urlMakerWithSelectTypeFilter = (slug, value) => {
        console.log(slug);
        console.log(value);
        let filters = getQueryObjectUrl();

        if (slug in filters) {
            filters[slug] = value;
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        } else {
            filters[slug] = value
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        }
    }

    const urlMakerSelectTypeClear = (slug) => {
        console.log(slug);
        let filters = getQueryObjectUrl();

        if (slug in filters) {
            delete filters[slug]
        }
        navigate(URLMaker(cityContext.citiesList, cat, filters))
    }


    const urlMakerWithRadioBoxFilter = (slug, value) => {
        console.log(slug);
        console.log(value);
        let filters = getQueryObjectUrl();

        if (slug in filters) {
            filters[slug] = value;
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        } else {
            filters[slug] = value
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        }
    }

    const urlMakerRadioBoxClear = (slug) => {
        let filters = getQueryObjectUrl();
        if (slug in filters) {
            delete filters[slug]
        }
        navigate(URLMaker(cityContext.citiesList, cat, filters))
    }


    const urlMakerWithCheckBoxFilter = (slug, value) => {
        console.log(slug);
        console.log(value);
        let filters = getQueryObjectUrl();

        if (slug in filters) {
            console.log(filters[slug]);
            let currentValueArray = filters[slug].split(',');
            if (currentValueArray.includes(value)) {
                let index = currentValueArray.indexOf(value)
                if (index > -1) {
                    currentValueArray.splice(index, 1);
                }
            } else {
                currentValueArray.push(value)
            }

            let currentValueString = currentValueArray.join(",");
            if (currentValueString === '') {
                delete filters[slug]
            } else {
                filters[slug] = currentValueString
            }
            console.log(currentValueArray);
            navigate(URLMaker(cityContext.citiesList, cat, filters))

        } else {
            filters[slug] = value
            navigate(URLMaker(cityContext.citiesList, cat, filters))
        }
    }

    const urlMakerCheckBoxClear = (slug) => {
        let filters = getQueryObjectUrl();
        if (slug in filters) {
            delete filters[slug]
        }
        navigate(URLMaker(cityContext.citiesList, cat, filters))
    }

    const urlMakerWithDistricts = (slug, ids) => {
        console.log(slug);
        console.log(ids);
        let filters = getQueryObjectUrl();

        let currentValueString = ids.join(",");

        if (slug in filters) {
            if (currentValueString === '') {
                delete filters[slug]
            } else {
                filters[slug] = currentValueString
            }
        } else {
            filters[slug] = currentValueString
        }
        navigate(URLMaker(cityContext.citiesList, cat, filters))

    }


    return (<>

        <CategoryFilter />
        {/* <DistrictFilter /> */}

        {/* <PriceFilter /> */}

        {
            filterTypes.map((fil) => {
                let ComponentFilter = fil.type
                switch (fil.type) {
                    case "MinMaxTypeFilter":
                        return <MinMaxTypeFilter
                            title={fil.title}
                            unit={fil.unit}
                            slug={fil.slug}
                            suggestListMin={fil.suggestMin}
                            suggestListMax={fil.suggestMax}
                            minPlaceHolder={fil.exampleMin}
                            maxPlaceHolder={fil.exampleMax}
                            urlMaker={urlMakerWithMinMaxFilter}
                            urlClearMaker={urlMakerClearMinMax}
                        />
                    case "DistrictFilter":
                        return <DistrictFilter
                            title={fil.title}
                            slug={fil.slug}
                            itemsList={fil.itemsList}
                            urlMaker={urlMakerWithDistricts}
                        />
                    case "SelectTypeFilter":
                        return <SelectTypeFilter
                            title={fil.title}
                            slug={fil.slug}
                            unit={fil.unit}
                            suggestList={fil.suggestList}
                            selectPlaceHolder={fil.placeHolder}
                            urlMaker={urlMakerWithSelectTypeFilter}
                            urlClear={urlMakerSelectTypeClear}
                        />
                    case "RadioBoxFilter":
                        return <RadioBoxFilter
                            slug={fil.slug}
                            title={fil.title}
                            itemsList={fil.itemsList}
                            default={fil.default}
                            urlMaker={urlMakerWithRadioBoxFilter}
                            urlClear={urlMakerRadioBoxClear}
                        />
                    case "CheckboxFilter":
                        return <CheckboxFilter
                            slug={fil.slug}
                            title={fil.title}
                            itemsList={fil.itemsList}
                            urlMaker={urlMakerWithCheckBoxFilter}
                            urlClear={urlMakerCheckBoxClear}
                        />
                    case "StatusFilter":
                        return <StatusFilter
                            title={fil.title}
                            itemsList={fil.itemsList}
                            urlMaker={urlMakerWithStatus}
                            urlClear={urlMakerStatusClear}
                        />
                }
            })
        }

        {/* 
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
                        /> */}

        {/* <MinMaxTypeFilter
            title="قیمت"
            unit="تومان"
            slug="price"
            suggestListMin={[10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000]}
            suggestListMax={[10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000]}
            minPlaceHolder="مثلا 40,000,000 "
            maxPlaceHolder="مثلا 70,000,000"
            urlMaker={urlMakerWithMinMaxFilter}
            urlClearMaker={urlMakerClearMinMax}
        /> */}

        {/* <StatusFilter
            urlMaker={urlMakerWithStatus}
            urlClear={urlMakerStatusClear}
        /> */}
        {/* 
        <SelectTypeFilter
            title="سن بنا"
            slug="building-age"
            suggestList={[
                { title: "حداکثر 1 سال", value: "1" },
                { title: "حداکثر 2 سال", value: "2" },
                { title: "حداکثر 5 سال", value: "5" },
                { title: "حداکثر 10 سال", value: "10" },
                { title: "حداکثر 15 سال", value: "15" },
                { title: "حداکثر 20 سال", value: "20" },
                { title: "حداکثر 25 سال", value: "25" },
                { title: "حداکثر 30 سال", value: "30" },
                { title: "بیش از 30 سال", value: "30-" }
            ]}
            selectPlaceHolder="سن بنا را انتخاب نمایید"
            urlMaker={urlMakerWithSelectTypeFilter}
            urlClear={urlMakerSelectTypeClear}
        /> */}



        {/* 
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

            */}

    </>
    );
}

export default FilterSection;
