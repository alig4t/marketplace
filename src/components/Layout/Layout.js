import React from 'react';
import NavBar from '../NavBar/NavBar';
import BottomNavbar from '../NavBar/BottomNavbar';

const Layout = (props) => {
    return (
        <>
            <NavBar />
            {props.children}
            <BottomNavbar />
        </>
    );
}

export default Layout;