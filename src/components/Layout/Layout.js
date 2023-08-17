import React,{useEffect,useContext} from 'react';
import NavBar from '../NavBar/NavBar';
import BottomNavbar from '../NavBar/BottomNavbar';
import ActionNav from '../NavBar/ActionNav';
import { CityContext } from '../../Context/CityContext';

const Layout = (props) => {


    
    const currentCity = useContext(CityContext)
    useEffect(()=>{
        // console.log("layout Render");
        // console.log(currentCity);
        // console.log('ssssssssssss');
    })

    return (
        <>
            <NavBar />
            <ActionNav />
            {props.children}
            <BottomNavbar />
        </>
    );
}

export default Layout;