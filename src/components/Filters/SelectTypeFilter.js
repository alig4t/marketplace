import React, { useRef, useState } from 'react';
import { Collapse, ListGroup, Form, Dropdown, Fade } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { RxDotsVertical } from "react-icons/rx"
import { TiDelete } from "react-icons/ti"


const SelectTypeFilter = (props) => {

    const [filterOpen, setFilterOpen] = useState(false);
    const [selectFilter, setSelectFilter] = useState("")

    const inputSelectFilter = useRef(null);

    const [suggestionSelectFilter, setSuggestionSelectFilter] = useState(false)

    const [selectDropOpenTop, setSelectDropOpenTop] = useState(false)


    const chooseSelectFilter = (value) => {
        // event.preventDefault();
        // console.log(event.target.getAttribute('data-val'));
        // let value = event.target.getAttribute('data-val');

        setSelectFilter(value)
        // setSuggestionSelectFilter(false)
        // inputSelectFilter.current.focus()
    }


    function changeSelectHandler(val) {

        setSelectFilter(val)
    }


    function focusInputSelect() {
        setSuggestionSelectFilter(false)
        setSelectFilter("")
    }


    const clearFilter = () => {
        setSelectFilter("")

    }

    const onBlurSelectInput = () => {
        setTimeout(() => {
            setSuggestionSelectFilter(false)
        }, 100)
    }


    const onClickSelectDiv = () => {
        // inputSelectFilter.current.focus()
        // console.log(window.innerHeight);
        // console.log(window.pageYOffset);
        // console.log(inputSelectFilter.current.getBoundingClientRect().bottom);
        let divRect = inputSelectFilter.current.getBoundingClientRect().bottom;
        let bottomOffset = window.innerHeight - divRect
        console.log(bottomOffset);
        if (bottomOffset < 200) {
            setSelectDropOpenTop(true)
        } else {
            setSelectDropOpenTop(false)
        }
        setSuggestionSelectFilter(true)

    }

    const clearSelectHandler = () => {
        setSelectFilter("")
    }

    const closeDrop = () => {
        setSuggestionSelectFilter(false)

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
                    (selectFilter.length !== 0) ? filterOpen ? <span className='reset-filter-span-open' onClick={clearFilter}>حذف</span> : <span className='reset-filter-span-close' /> : null
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
                                                {selectFilter.length > 0 ? <TiDelete /> : null}
                                            </div>
                                            <p className={selectFilter.length > 0 ? "selected" : ""}>
                                                {selectFilter.length > 0 ? selectFilter : props.selectPlaceHolder}
                                            </p>
                                        </div>

                                        <span><FiChevronDown className='align-self-center' /></span>
                                    </Dropdown.Toggle>

                                    
                                    <Dropdown.Menu>
                                        {props.suggestList.map((item) => {
                                            return <Dropdown.Item data-val={item} href="#/action-1" onClick={() => chooseSelectFilter(item)}>{item}</Dropdown.Item>
                                        })}

                                    </Dropdown.Menu>
                            
                                </Dropdown>

                                {/* <div className='dv-filter-button' onClick={onClickSelectDiv} onBlur={closeDrop} ref={inputSelectFilter}>
                                    <div className='dv-clear-input' onClick={clearSelectHandler}>
                                        {selectFilter.length > 0 ? <TiDelete /> : null}
                                    </div>

                                    <p>
                                        {props.selectPlaceHolder}
                                    </p>
                                    <span className='d-flex flex-fill'>
                                        <p className='pe-2'>{props.unit}</p>
                                        <FiChevronDown className='align-self-center' />
                                    </span>


                                    <Fade in={suggestionSelectFilter}>
                                        <div id="suggestion-min-filter">
                                            <Dropdown show={suggestionSelectFilter ? true : false}>
                                                <Dropdown.Menu className={`dv-suggest-box ${selectDropOpenTop ? "top" : "bottom"} `}>

                                                    {
                                                        props.suggestList.map((item) => {
                                                            return <Dropdown.Item data-val={item} onClick={(e) => chooseSelectFilter(e)}>{item.toLocaleString()} {props.unit}</Dropdown.Item>
                                                        })
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Fade> 

                                </div> */}

                            </div>

                        </div>
                    </div>

                </div>
            </Collapse >
        </div >

    );
}

export default SelectTypeFilter;