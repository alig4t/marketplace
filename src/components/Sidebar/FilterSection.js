import React from 'react';

import PriceFilter from '../Filters/PriceFilter';
import StatusFilter from '../Filters/StatusFilter';
import DistrictFilter from '../Filters/DistrictFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import MinMaxTypeFilter from '../Filters/MinMaxTypeFilter';


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


        <MinMaxTypeFilter
            title="متراژ"
            unit="متر"
            suggestListMin={[40, 50, 60]}
            suggestListMax={[90, 100, 120]}
            minPlaceHolder="مثلا 100 "
            maxPlaceHolder="مثلا 150 "
        />


    </>
    );
}

export default FilterSection;
