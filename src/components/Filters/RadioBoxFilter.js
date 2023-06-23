import React, { useContext, useEffect, useState } from 'react';
import { Badge, Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';


const RadioBoxFilter = (props) => {

    const [radioBoxOpen, setRadioBoxOpen] = useState(false)
    const [radioBoxChecked, setRadioBoxChecked] = useState(props.itemsList[0])

    let obj = useOutletContext()

    const checkItemHandler = (val) => {
        let checked = [...radioBoxChecked]
        // checked.push(val)
        setRadioBoxChecked(val)
    }

    const clearMahal = () => {
        setRadioBoxChecked(props.itemsList[0])
    }

    useEffect(()=>{
        // console.log(radioBoxChecked);
        
        // console.log(obj.cityName);
    })

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
                    (radioBoxChecked !== props.itemsList[0] ) ? radioBoxOpen ? <span className='reset-filter-span-open' onClick={clearMahal}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={radioBoxOpen}>
                <div id="choose-radioBox">
                    <div className='mb-3'>

                        <div className="dv-filter-button-radioBox">

                            {
                                props.itemsList.map((item,index) => {
                                    return <span key={index} className={radioBoxChecked === item ? "active" : ""} onClick={() => checkItemHandler(item)}>{item}</span>
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