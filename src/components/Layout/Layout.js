import React from 'react';
    
/*************************** components ***************************/
import NavBar from '../NavBar/NavBar';
import BottomNavbar from '../NavBar/BottomNavbar';
import ActionNav from '../NavBar/ActionNav';


const Layout = (props) => {
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