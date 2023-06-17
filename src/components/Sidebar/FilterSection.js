import React, { useRef, useState } from 'react';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Collapse from 'react-bootstrap/Collapse';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { BiChevronLeft } from "react-icons/bi"
import DistrictModal from '../Modal/DistrictModal';
import Fade from 'react-bootstrap/Fade';
import CategoryModal from '../Modal/CategoryModal';


const FilterSection = () => {
    const [mahalOpen, setMahalOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);

    const [categoryModal, setCategoryModal] = useState(false);
    const [districtModal, setDistrictModal] = useState(false)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    const [switchImage,setSwitchImage]=useState(false)
    const [switchInstant,setSwitchInstant]=useState(false)

    const openModalDistrictHandler = () => {
        console.log('sss');
        setDistrictModal(true)
    }

    function format(input) {
        var nStr = input + '';
        nStr = nStr.replace(/\,/g, "");
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        input = x1 + x2;
        return input
    }

    function changeMinHandler(val) {
        let newVal = format(val)
        setMinPrice(newVal)
    }

    function changeMaxHandler(val) {
        let newVal = format(val)
        setMaxPrice(newVal)
    }

    return (<>

        <div className='dv-sidebox d-md-none'>
            <ListGroup onClick={() => setCategoryModal(!categoryModal)} className='dvm-filter-header'>
                {/* <span className='pe-2'>
                    {mahalOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span> */}
                <p>دسته بندی</p>
                <span>انتخاب کنید</span>
            </ListGroup>
        </div>



        <div className='dv-sidebox'>
            <ListGroup onClick={() => setMahalOpen(!mahalOpen)} className='dv-filter-header' aria-controls="choose-district-box">
                <span className='pe-2'>
                    {mahalOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
                <p>محله</p>
            </ListGroup>

            <Collapse in={mahalOpen}>
                <div id="choose-district-box">
                    <div className='mb-3'>
                        <div className={`dv-filter-button ${districtModal ? "active" : ""}`} onClick={openModalDistrictHandler}>
                            <p className='align-self-center'>تعیین محل</p>
                            <span className='align-self-center'><BiChevronLeft /></span>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>




        <div className='dv-sidebox'>
            <ListGroup onClick={() => setPriceOpen(!priceOpen)} className='dv-filter-header' aria-controls="choose-price-box">
                <span className='pe-2'>
                    {priceOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
                <p>قیمت</p>
            </ListGroup>

            <Collapse in={priceOpen}>
                <div id="choose-price-box">

                    <div className='mb-3'>
                        <div className='d-flex justify-content-center position-relative'>
                            <p className='align-self-center' style={{ width: "50px" }}>حداقل</p>
                            <div className="dv-filter-button flex-fill" aria-controls="max-price-fade">
                                <Form.Control className='filterform' list="fontstyle" autoFocus value={minPrice} onChange={(e) => changeMinHandler(e.target.value)} placeholder='مثلا ۷۰،۰۰۰،۰۰۰' />

                                <span className='d-flex flex-fill'>
                                    <p className='pe-2'>تومان</p>
                                    <FiChevronDown className='align-self-center' />
                                </span>

                                <div className='dv-suggest-box'>
                                    <ListGroup>
                                        <ListGroupItem>10 هزار</ListGroupItem>
                                        <ListGroupItem>20 هزار</ListGroupItem>
                                        <ListGroupItem>50 هزار</ListGroupItem>
                                        <ListGroupItem>100 هزار</ListGroupItem>
                                        <ListGroupItem>200 هزار</ListGroupItem>
                                        <ListGroupItem>500 هزار</ListGroupItem>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='align-self-center' style={{ width: "50px" }}>حداکثر</p>
                            <div className="dv-filter-button flex-fill" aria-controls="max-price-fade">
                                <Form.Control className='filterform' autoFocus value={maxPrice} onChange={(e) => changeMaxHandler(e.target.value)} placeholder='مثلا ۷۰،۰۰۰،۰۰۰' />
                                <span className='d-flex flex-fill'>
                                    <p className='pe-2'>تومان</p>
                                    <FiChevronDown className='align-self-center' />
                                </span>

                            </div>
                        </div>
                    </div>


                </div>
            </Collapse >
        </div >




        <div className='dv-sidebox'>
            <ListGroup onClick={() => setStatusOpen(!statusOpen)} className='dv-filter-header' aria-controls="status-box">
                <span className='pe-2'>
                    {statusOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
                <p>وضعیت آگهی</p>
            </ListGroup>

            <Collapse in={statusOpen}>
                <div id="status-box">
                    <div className='mb-3'>
                        <div className="dv-filter-switch" onClick={()=>setSwitchImage(!switchImage)}>
                            <p className='align-self-center'>فقط عکس دار</p>
                            <span className='align-self-center'>
                                <Form>
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                       checked={switchImage?true:false}
                                    />
                                </Form>
                            </span>
                        </div>
                        <div className="dv-filter-switch" onClick={()=>setSwitchInstant(!switchInstant)}>
                            <p className='align-self-center'>فقط فوری ها</p>
                            <span className='align-self-center'>
                                <Form>
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                       checked={switchInstant?true:false}
                                    />
                                </Form>
                            </span>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>




        {< DistrictModal showModal={districtModal} devicePhone={true} currentDistricts={[16, 12]} closeModal={() => setDistrictModal(false)} />}

        {<CategoryModal showModal={categoryModal} devicePhone={true} closeModal={() => setCategoryModal(false)} />}


    </>
    );
}

export default FilterSection;
