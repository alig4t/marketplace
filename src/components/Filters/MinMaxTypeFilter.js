import React, { useContext, useEffect, useRef, useState } from 'react';
import { Collapse, ListGroup, Form, Dropdown, Fade } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { RxDotsVertical } from "react-icons/rx"
import { TiDelete } from "react-icons/ti"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';



const MinMaxTypeFilter = (props) => {

    const naviate = useNavigate()
    const currentCity = useContext(CityContext)
    const currentCat = useContext(CategoryContext)
    let { city, cat } = useParams()


    const [filterOpen, setFilterOpen] = useState(false);
    const [minFilter, setMinFilter] = useState("")
    const [maxFilter, setMaxFilter] = useState("")

    const inputMinFilter = useRef(null);
    const inputMaxFilter = useRef(null);

    const [suggestionMinFilter, setSuggestionMinFilter] = useState(false)
    const [suggestionMaxFilter, setSuggestionMaxFilter] = useState(false)

    const [minDropOpenTop, setMinDropOpenTop] = useState(false)
    const [maxDropOpenTop, setMaxDropOpenTop] = useState(false)

    const [queryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)

    const regexMinMaxUrl = /(^((-\d+)|(\d+\-)|(\d+\-\d+))$)/g;


    useEffect(() => {
        // console.log("executeddddd.............");
        // console.log(queryStirng.get('price'));
        // console.log(props.slug);
        console.log("کامپوننت مین ماکس");
        if (queryStirng.has(props.slug)) {
            if (regexMinMaxUrl.test(queryStirng.get(props.slug))) {
                let filterArray = queryStirng.get(props.slug).split("-");
                let minFilterUrl = filterArray[0];
                let maxFilterUrl = filterArray[1];
                changeMinHandler(minFilterUrl);
                changeMaxHandler(maxFilterUrl);
                console.log(filterArray);
                console.log("قیمت معبتر است..");

            } else {
                console.log("قیمت نامعبتر است..");
            }

        } else {
            setMinFilter("")
            setMaxFilter("")
        }

        //^-?(\d+)-?$
        //^((-\d+)|(\d+\-)|(\d+\-\d+))$

    }, [filterParam,cat,city])


    // useEffect(()=>{
    //     console.log('cat ...');
    //     changeMinHandler('');
    //     changeMaxHandler('');
    // },[cat,city])



    const chooseMinFilter = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('data-val'));
        let value = event.target.getAttribute('data-val');
        let formatValue = format(value);
        // setMinFilter(formatValue)
        setSuggestionMinFilter(false)
        // console.log(["min:",value]);
        props.urlMaker(props.slug, value, "min")
        // inputMinFilter.current.focus()
    }

    const chooseMaxFilter = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('data-val'));
        let value = event.target.getAttribute('data-val');
        let formatValue = format(value);
        // setMaxFilter(formatValue)
        setSuggestionMaxFilter(false)
        // inputMaxFilter.current.focus()
        // console.log(["max:",value]);
        props.urlMaker(props.slug, value, "max")

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
        console.log("changeddd min..");
        let newVal = format(val)
        setMinFilter(newVal)

    }

    function changeMaxHandler(val) {
        console.log("changeddd max..");
        let newVal = format(val)
        setMaxFilter(newVal)

    }

    function focusInputMin() {
        inputMinFilter.current.focus()
        setSuggestionMinFilter(false)
        setMinFilter("")
    }

    function focusInputMax() {
        inputMaxFilter.current.focus()
        setSuggestionMaxFilter(false)
        setMaxFilter("")
    }
    const clearFilter = () => {
        // props.urlMaker(props.slug, '', "max")

        // setMinFilter("")
        // setMaxFilter("")
        props.urlClearMaker(props.slug)
    }

    const onBlurMinInput = () => {
        setTimeout(() => {
            setSuggestionMinFilter(false)
        }, 100)
    }

    const onBlurMaxInput = () => {
        setTimeout(() => {
            setSuggestionMaxFilter(false)
        }, 100)
    }

    const onClickMaxDiv = () => {
        inputMaxFilter.current.focus()
        let divRect = inputMinFilter.current.getBoundingClientRect().bottom;
        let bottomOffset = window.innerHeight - divRect
        console.log(bottomOffset);
        if (bottomOffset < 200) {
            setMaxDropOpenTop(true)
        } else {
            setMaxDropOpenTop(false)
        }
        setSuggestionMaxFilter(true)
    }

    const onClickMinDiv = () => {
        inputMinFilter.current.focus()
        // console.log(window.innerHeight);
        // console.log(window.pageYOffset);
        // console.log(inputMinFilter.current.getBoundingClientRect().bottom);
        let divRect = inputMinFilter.current.getBoundingClientRect().bottom;
        let bottomOffset = window.innerHeight - divRect
        // console.log(bottomOffset);
        if (bottomOffset < 200) {
            setMinDropOpenTop(true)
        } else {
            setMinDropOpenTop(false)
        }
        setSuggestionMinFilter(true)

    }

    const clearMinHandler = () => {
        setMinFilter("")
        props.urlMaker(props.slug, '', "min")


    }
    const clearMaxHandler = () => {
        setMaxFilter("")
        props.urlMaker(props.slug, '', "max")

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
                    (minFilter.length !== 0 || maxFilter.length !== 0) ? filterOpen ? <span className='reset-filter-span-open' onClick={clearFilter}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={filterOpen}>
                <div id="choose-Filter-box">
                    <div className='mb-3'>
                        <div className='d-flex flex-row justify-content-between'>
                            <div className='d-flex flex-column justify-content-center align-items-center pe-2'>
                                <p>حداقل</p>
                                <span className='dv-vertical-dots'><RxDotsVertical /></span>
                                <p>حداکثر</p>
                            </div>
                            <div className='d-flex flex-column flex-fill'>
                                <div className='dv-filter-button'>

                                    <div className='dv-clear-input' onClick={clearMinHandler}>
                                        {minFilter.length > 0 ? <TiDelete /> : null}
                                    </div>

                                    <div className='d-flex flex-row flex-fill' onClick={onClickMinDiv}>
                                        <Form.Control className='filterform' ref={inputMinFilter} autoFocus value={minFilter}
                                            onChange={(e) => changeMinHandler(e.target.value)} placeholder={props.minPlaceHolder}
                                            aria-controls="suggestion-min-filter"
                                            aria-expanded={suggestionMinFilter} onBlur={onBlurMinInput}
                                        />

                                        <span className='d-flex flex-fill'>
                                            <p className='pe-2'>{props.unit}</p>
                                            <FiChevronDown className='align-self-center' />
                                        </span>

                                        <Fade in={suggestionMinFilter}>
                                            <div id="suggestion-min-filter">
                                                <Dropdown.Menu className={`dv-suggest-box ${minDropOpenTop ? "top" : "bottom"} `} show={suggestionMinFilter ? true : false}>
                                                    <Dropdown.Header onClick={focusInputMin}>وارد کردن مقدار دلخواه</Dropdown.Header>

                                                    {
                                                        props.suggestListMin.map((item, index) => {
                                                            return <Dropdown.Item key={index} data-val={item} onClick={(e) => chooseMinFilter(e)}>{item.toLocaleString()} {props.unit}</Dropdown.Item>
                                                        })
                                                    }
                                                </Dropdown.Menu>
                                            </div>
                                        </Fade>

                                    </div>


                                </div>

                                <div className='dv-filter-button'>


                                    <div className='dv-clear-input' onClick={clearMaxHandler}>
                                        {maxFilter.length > 0 ? <TiDelete /> : null}
                                    </div>
                                    <div className='d-flex flex-row flex-fill' onClick={onClickMaxDiv}>
                                        <Form.Control className='filterform' ref={inputMaxFilter} autoFocus value={maxFilter}
                                            onChange={(e) => changeMaxHandler(e.target.value)} placeholder={props.maxPlaceHolder}
                                            onBlur={onBlurMaxInput}
                                            aria-controls="suggestion-max-filter" aria-expanded={suggestionMaxFilter}
                                        />
                                        <span className='d-flex flex-fill'>
                                            <p className='pe-2'>{props.unit}</p>
                                            <FiChevronDown className='align-self-center' />
                                        </span>
                                        <Fade in={suggestionMaxFilter}>
                                            <div id="suggestion-max-filter">
                                                <Dropdown.Menu className={`dv-suggest-box ${maxDropOpenTop ? "top" : "bottom"}`} show={suggestionMaxFilter ? true : false}>
                                                    <Dropdown.Header onClick={focusInputMax}>وارد کردن مقدار دلخواه</Dropdown.Header>
                                                    {
                                                        props.suggestListMax.map((item, index) => {
                                                            return <Dropdown.Item key={index} data-val={item} onClick={(e) => chooseMaxFilter(e)}>{item.toLocaleString()} {props.unit}</Dropdown.Item>
                                                        })
                                                    }
                                                </Dropdown.Menu>
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Collapse >
        </div >

    );
}

export default MinMaxTypeFilter;