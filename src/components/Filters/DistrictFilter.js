import React, { useEffect } from 'react';
import { useState } from 'react';
import { Collapse, ListGroup } from 'react-bootstrap';
import DistrictModal from '../Modal/DistrictModal';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { BiChevronLeft } from "react-icons/bi"
import { useParams, useSearchParams } from 'react-router-dom';

const DistrictFilter = (props) => {
    const [mahalOpen, setMahalOpen] = useState(false);
    const [districtModal, setDistrictModal] = useState(false)
    const [currentDistricts, setCurrentDistricts] = useState([])

    const regexDistrict = /(^\d+(\,\d+)*$)/g;


    let { city, cat } = useParams()
    const [queryStirng] = useSearchParams();


    const openModalDistrictHandler = () => {
        setDistrictModal(true)
    }
    const clearFilter = () => {
        // setCurrentDistricts([])
        props.urlMaker(props.slug,[])
    }


    useEffect(() => {
        console.log("کامپوننت محله باکس");

        if (queryStirng.has(props.slug)) {
            let urlValStr = queryStirng.get(props.slug)
            console.log(urlValStr);
            console.log(props.itemsList);
            if (regexDistrict.test(urlValStr)) {
                let checkListArray = [];
                let urlValArray = urlValStr.split(',');
                urlValArray.forEach((val) => {
                    let inItemsArray = props.itemsList.filter(item => item.id === parseInt(val))
                    console.log(val.toLowerCase(), typeof val);
                    if (inItemsArray.length === 1 && !checkListArray.includes((parseInt(val)))) {
                        checkListArray.push(parseInt(val))
                    }
                })
                setCurrentDistricts(checkListArray)
                console.log(checkListArray);
            } else {
                setCurrentDistricts([])
                console.log("سسسسسسسسسسسسسسسسسس");
            }
        } else {
            setCurrentDistricts([])
        }
    }, [queryStirng, cat, city])


    return (
        <>
            <div className='dv-sidebox'>
                <ListGroup className='dv-filter-header' aria-controls="choose-district-box" onClick={() => setMahalOpen(!mahalOpen)}>
                    <div className='d-flex flex-row flex-fill' >
                        <span className='pe-2'>
                            {mahalOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                        <p>{props.title}</p>
                    </div>
                    {
                        (currentDistricts.length > 0) ? mahalOpen ? <span className='reset-filter-span-open' onClick={clearFilter}>حذف</span> : <span className='reset-filter-span-close' /> : null
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

            {< DistrictModal
                showModal={districtModal}
                devicePhone={true}
                currentDistricts={currentDistricts}
                title={props.title}
                slug={props.slug}
                urlMaker={props.urlMaker}
                closeModal={() => setDistrictModal(false)}
            />}
        </>
    );
}

export default DistrictFilter;