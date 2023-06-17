
import React, { useEffect } from 'react';
import Categories from '../Categories/Categories';

import FilterSection from './FilterSection';

const Sidebar = () => {

    // const [windowWidth,setWindowWidth]= useState(window.innerWidth) 
    // function handleResize() {
    //     setWindowWidth(window.innerWidth)
    // }
    // React.useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    // })

    return (
        <div className="dv-sidebar py-2">
            <Categories devicePhone={false} />
            <FilterSection />
        </div>
    )
}

export default Sidebar;