import React from 'react';

import PriceFilter from '../Filters/PriceFilter';
import StatusFilter from '../Filters/StatusFilter';
import DistrictFilter from '../Filters/DistrictFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import MinMaxTypeFilter from '../Filters/MinMaxTypeFilter';
import SelectTypeFilter from '../Filters/SelectTypeFilter';
import CheckboxFilter from '../Filters/CheckboxFilter';
import RadioBoxFilter from '../Filters/RadioBoxFilter';


const FilterSection = () => {


    return (<>


        <CategoryFilter />
        <DistrictFilter />

        {/* <PriceFilter /> */}
        
        <MinMaxTypeFilter
            title="قیمت"
            unit="تومان"
            suggestListMin={[10000, 20000, 50000,100000,200000,500000,1000000,2000000,5000000,10000000]}
            suggestListMax={[10000, 20000, 50000,100000,200000,500000,1000000,2000000,5000000,10000000]}
            minPlaceHolder="مثلا 40,000,000 "
            maxPlaceHolder="مثلا 70,000,000"
        />

        <StatusFilter />

        <SelectTypeFilter 
            title="سن بنا"
            unit=""
            suggestList={["نوساز","حداکثر 5 سال", "حداکثر 10 سال", "حداکثر 15 سال","حداکثر 20 سال","حداکثر 25 سال","حداکثر 30 سال","بیش از 30 سال"]}
            selectPlaceHolder="سن بنا را انتخاب نمایید"
        />

        <MinMaxTypeFilter
            title="متراژ"
            unit="متر"
            suggestListMin={[40, 50, 60]}
            suggestListMax={[90, 100, 120]}
            minPlaceHolder="مثلا 100 "
            maxPlaceHolder="مثلا 150 "
        />
        <RadioBoxFilter 
            title="آگهی دهنده"
            itemsList={["همه", "شخصی","مشاور املاک"]}
        />

        <CheckboxFilter 
        title="تعداد اتاق"
        unit=""
        suggestList={["بدون اتاق", 1,2,3,4,"بیشتر از 4"]}
        />

        <MinMaxTypeFilter
            title="طبقه"
            unit=""
            suggestListMin={["زیرهمکف", "همکف", 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}
            suggestListMax={["زیرهمکف", "همکف", 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}
            minPlaceHolder="مثلا 2 "
            maxPlaceHolder="مثلا 5 "
        />


    </>
    );
}

export default FilterSection;
