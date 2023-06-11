import React from 'react';
// import Navbar from 'react-bootstrap/Navbar';
import {AiOutlineBars} from 'react-icons/ai'
import {AiFillPlusCircle} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {BsFillChatFill} from 'react-icons/bs'
import {BiHomeAlt} from 'react-icons/bi'

const BottomNavbar = () => {
    return (
        <nav class="d-md-none dv-mobile-bottom-nav fixed-bottom d-flex justify-content-around">
            <div className='sub-bottom-nav'>
                <span><BiHomeAlt/></span>
                <p>آگهی ها</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><AiOutlineBars /></span>
                <p>دسته ها</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><AiFillPlusCircle/></span>
                <p>ثبت آگهی</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><BsFillChatFill/></span>
                <p>چت</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><BsFillPersonFill/></span>
                <p>دیوار من</p>
            </div>
           

            {/* <a class="navbar-brand" href="#">Fixed bottom</a> */}
        </nav>
        // <Navbar fixed="bottom" />
        // <nav class="mobile-nav">
        //     <a href="#" class="bloc-icon">
        //         {/* <img src="ressources/home.svg" alt=""/> */}
        //         a
        //     </a>
        //     <a href="#" class="bloc-icon">
        //         {/* <img src="ressources/heart.svg" alt=""/> */}
        //         b
        //     </a>
        //     <a href="#" class="bloc-icon">
        //         {/* <img src="ressources/magnifying-glass.svg" alt=""/> */}
        //         c
        //     </a>
        //     <a href="#" class="bloc-icon">
        //         {/* <img src="ressources/plus.svg" alt=""/> */}
        //         d
        //     </a>
        //     <a href="#" class="bloc-icon">
        //         {/* <img src="ressources/user.svg" alt=""/> */}
        //    e
        //     </a>
        // </nav>
    );
}

export default BottomNavbar;