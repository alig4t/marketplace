import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Collapse, ListGroup, Form, Dropdown, Fade } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { RxDotsVertical } from "react-icons/rx"
import { TiDelete } from "react-icons/ti"
import { useParams, useSearchParams } from 'react-router-dom';


const SelectTypeFilter = (props) => {

    const [filterOpen, setFilterOpen] = useState(false);
    const [selectFilter, setSelectFilter] = useState("")
    const inputSelectFilter = useRef(null);

    let { city, cat } = useParams()
    const [queryStirng] = useSearchParams();


    useEffect(() => {
        console.log("کامپوننت سلکت");

        if (queryStirng.has(props.slug)) {
            let val = queryStirng.get(props.slug)
            console.log(val);
            let inSuggestArray = props.suggestList.filter(item => item.value === val)
            console.log(inSuggestArray);
            if (inSuggestArray.length === 1) {
                console.log(inSuggestArray);
                chooseSelectFilter(inSuggestArray[0])
            }
        }else{
            setSelectFilter("")
        }
    },[queryStirng, cat, city])


    const chooseSelectFilter = (filObject) => {

        setSelectFilter(filObject.title)
        
        // let newVal = value.slice(0,-1)
        // if (value.slice(-1) === "-") {
        //     setSelectFilter(" بیش از " + newVal + " " + props.unit)
        // }else{
        //     setSelectFilter(" حداکثر " + value + " " + props.unit)
        // }
   
    }


    const clearFilter = () => {
        setSelectFilter("")
    }


    const clearSelectHandler = (event) => {
        event.stopPropagation()
        props.urlClear(props.slug)
        setSelectFilter("")
        // setFilterOpen(false)
    }



    return (


        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-Filter-box">
                <div className='d-flex flex-row flex-fill' onClick={() => setFilterOpen(!filterOpen)}>
                    <span className='pe-2'>
                        {filterOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    (selectFilter.length !== 0) ? filterOpen ? <span className='reset-filter-span-open' onClick={clearSelectHandler}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={filterOpen}>
                <div id="choose-Filter-box">
                    <div className='mb-3'>
                        <div className='d-flex flex-row justify-content-between'>

                            <div className='d-flex flex-column flex-fill'>


                                <Dropdown className='dv-filter-dropdown' drop='down-centered'>
                                    <Dropdown.Toggle className='w-100 d-flex flex-row justify-content-between align-items-center' variant="" id="dropdown-basic">
                                        <div className='d-flex flex-row'>
                                            <div className='dv-clear-input' onClick={clearSelectHandler}>
                                                {selectFilter.length > 0 ? <TiDelete onClick={(e)=>clearSelectHandler(e)} /> : null}
                                            </div>
                                            <p className={selectFilter.length > 0 ? "selected" : ""}>
                                                {selectFilter.length > 0 ? selectFilter : props.selectPlaceHolder}
                                            </p>
                                        </div>

                                        <span><FiChevronDown className='align-self-center' /></span>
                                    </Dropdown.Toggle>


                                    <Dropdown.Menu>
                                        {props.suggestList.map((item, index) => {
                                            return <Dropdown.Item key={index} data-val={item.value} onClick={() => props.urlMaker(props.slug,item.value)}>{item.title}</Dropdown.Item>
                                        })}

                                    </Dropdown.Menu>

                                </Dropdown>

                            </div>

                        </div>
                    </div>

                </div>
            </Collapse>
        </div>

    );
}

export default SelectTypeFilter;