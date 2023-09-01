import React, { useContext, useEffect, useState } from 'react';
import { Badge, Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';


const RadioBoxFilter = (props) => {

    const [radioBoxOpen, setRadioBoxOpen] = useState(false)
    const [radioBoxChecked, setRadioBoxChecked] = useState(props.default)

    let { city, cat } = useParams()
    const [queryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)


    let obj = useOutletContext()

    const checkItemHandler = (val) => {
        if (val === props.default) {
            clearRadio()
        } else {
            props.urlMaker(props.slug, val)
        }
    }

    const clearRadio = () => {
        props.urlClear(props.slug)
    }


    useEffect(() => {
        console.log("کامپوننت رادیو");
        console.log(props.itemsList);
        if (queryStirng.has(props.slug)) {
            let val = queryStirng.get(props.slug)
            console.log(val);
            let inSuggestArray = props.itemsList.filter(item => item.value === val)
            console.log(inSuggestArray);
            if (inSuggestArray.length === 1 && val != props.default) {
                console.log(inSuggestArray);
                setRadioBoxChecked(val)
            } else {
                setRadioBoxChecked(props.default)
            }
        } else {
            setRadioBoxChecked(props.default)
        }
    }, [filterParam, cat, city])

    return (

        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-radioBox">
                <div className='d-flex flex-row flex-fill' onClick={() => setRadioBoxOpen(!radioBoxOpen)}>
                    <span className='pe-2'>
                        {radioBoxOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    (radioBoxChecked !== props.default) ? radioBoxOpen ? <span className='reset-filter-span-open' onClick={clearRadio}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={radioBoxOpen}>
                <div id="choose-radioBox">
                    <div className='mb-3'>

                        <div className="dv-filter-button-radioBox">

                            {
                                props.itemsList.map((item, index) => {
                                    return <span key={index} className={radioBoxChecked === item.value ? "active" : ""} onClick={() => checkItemHandler(item.value)}>{item.title}</span>
                                })
                            }

                        </div>

                    </div>
                </div>
            </Collapse>
        </div>

    );
}

export default RadioBoxFilter;