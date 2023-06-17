import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


import { MdLocationOn } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs'
import { BsChatDots } from 'react-icons/bs'

import CityModal from '../Modal/CityModal';
import ActionNav from './ActionNav';

const NavBar = () => {

    const expand = "lg"
    const [cityModalShow, setCityModalShow] = useState(false)
    const handleCityModalShow = () => setCityModalShow(true);
    const handleCityModalClose = () => setCityModalShow(false);

    return (
        <>

            <Navbar key={expand} bg="light" expand={expand} className="dv-nav mb-3" sticky='top' >
                <Container fluid>

                    <div className='d-flex dv-head-flexbox align-items-center flex-fill'>
                        <Navbar.Brand className='d-none d-md-block' href="#">
                            دیوار
                        </Navbar.Brand>
                        <div className="d-none d-md-block vr h-75 mx-2 my-auto"></div>
                        <Button onClick={handleCityModalShow} variant="" className="d-none d-md-block dv-city-select-btn me-3 me-xl-5">
                            <span>
                                <MdLocationOn />
                            </span>
                            تهران
                        </Button>

                        {/* <div class="vr h-50 me-5 ml-4 my-auto"></div> */}


                        {/* <Dropdown className='d-md-none dv-cat-drop-btn me-3' align='start'>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                دسته ها
                                <span className='dv-arrowdown'>
                                    <BiChevronDown />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='dv-megamenu'>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}










                      









                        <div className="d-flex bd-highlight align-items-center dv-searchbox flex-fill">
                            <BiSearch className='mx-2' />
                            <Form.Control
                                type="search"
                                placeholder="جستجو در همه آگهی ها"
                                className="me-2 dv-search-input"
                                aria-label="Search"
                            />
                            <Button onClick={handleCityModalShow} variant="" className="d-block d-sm-block d-md-none dv-city-input-btn">

                                <span className='border-start ps-3'>تهران</span>
                            </Button>
                        </div>
                    </div>


                    <Navbar.Toggle className='d-none d-md-block d-lg-none dv-nav-toggle' aria-controls={`offcanvasNavbar-expand-${expand}`} />

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                دیوار
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link className='my-auto' href="#action1"><span className='me-1'><BsPerson /></span>دیوار من</Nav.Link>
                                <Nav.Link className='my-auto' href="#action2"><span className='me-1'><BsChatDots /></span>چت</Nav.Link>
                                <Nav.Link className='my-auto' href="#action2"><span className='me-1'></span>پشتیبانی</Nav.Link>
                                <Nav.Link className='my-auto' href="#action2">
                                    <button className="btn btn-danger dv-btn-ads" href="#">ثبت آگهی</button>
                                </Nav.Link>

                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            



            <CityModal show={cityModalShow} currentCity={[115, 114, 131, 132, 133, 134, 135]} close={handleCityModalClose} />
        </>
    );
}

export default NavBar;