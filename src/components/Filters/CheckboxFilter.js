import React, { useState } from 'react';
import { Badge, Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CheckboxFilter = (props) => {

    const [checkBoxOpen, setCheckBoxOpen] = useState(false)
    const [checkBoxList,setCheckBoxList] = useState([])

    const checkItemHandler = (val) => {
        let checked = [...checkBoxList]
        checked.push(val)
        setCheckBoxList(checked)
    }

    const clearMahal = () => {
        setCheckBoxList([])
    }

    return (
        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-checkbox">
                <div className='d-flex flex-row flex-fill' onClick={() => setCheckBoxOpen(!checkBoxOpen)}>
                    <span className='pe-2'>
                        {checkBoxOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                (checkBoxList.length > 0) ? checkBoxOpen ? <span className='reset-filter-span-open' onClick={clearMahal}>حذف</span> : <span className='reset-filter-span-close' /> : null
            }
            </ListGroup>

            <Collapse in={checkBoxOpen}>
                <div id="choose-checkbox">
                    <div className='mb-3'>

                        <div className="dv-filter-button-checkbox">

                            {
                                props.suggestList.map((item) => {
                                    return <span className={checkBoxList.includes(item)?"active":""} onClick={()=>checkItemHandler(item)}>{item}</span>
                                })
                            }

                        </div>

                    </div>
                </div>
            </Collapse>
        </div>

    );
}

export default CheckboxFilter;