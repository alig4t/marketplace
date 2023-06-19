import React from 'react';
import { useState } from 'react';
import { Collapse, ListGroup } from 'react-bootstrap';
import DistrictModal from '../Modal/DistrictModal';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { BiChevronLeft } from "react-icons/bi"

const DistrictFilter = () => {
    const [mahalOpen, setMahalOpen] = useState(false);
    const [districtModal, setDistrictModal] = useState(false)
    const [currentDistricts, setCurrentDistricts] = useState([16, 12])

    const openModalDistrictHandler = () => {
        console.log('sss');
        setDistrictModal(true)
    }
    const clearMahal = () => {
        setCurrentDistricts([])
    }

    return (
        <>
            <div className='dv-sidebox'>
                <ListGroup className='dv-filter-header' aria-controls="choose-district-box">
                    <div className='d-flex flex-row flex-fill' onClick={() => setMahalOpen(!mahalOpen)}>
                        <span className='pe-2'>
                            {mahalOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                        <p>محله</p>
                    </div>
                    {
                        (currentDistricts.length > 0) ? mahalOpen ? <span className='reset-filter-span-open' onClick={clearMahal}>حذف</span> : <span className='reset-filter-span-close' /> : null
                    }
                </ListGroup>

                <Collapse in={mahalOpen}>
                    <div id="choose-district-box">
                        <div className='mb-3'>

                            <div className={`dv-filter-button ${districtModal ? "active" : ""}`} onClick={openModalDistrictHandler}>
                                <div className='d-flex flex-row'>
                                    <div className='dv-clear-input'>
                                    </div>
                                    <p className='align-self-center'>
                                        {currentDistricts.length === 0 ? "تعیین محل" : currentDistricts.length + " محله "}
                                    </p>
                                </div>
                                <span className='align-self-center'><BiChevronLeft /></span>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>

            {< DistrictModal showModal={districtModal} devicePhone={true} currentDistricts={currentDistricts} closeModal={() => setDistrictModal(false)} />}
        </>
    );
}

export default DistrictFilter;