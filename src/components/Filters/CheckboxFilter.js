import React, { useEffect, useState } from 'react';
import { Badge, Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useParams, useSearchParams } from 'react-router-dom';

const CheckboxFilter = (props) => {

    const [checkBoxOpen, setCheckBoxOpen] = useState(false)
    const [checkBoxList, setCheckBoxList] = useState([])

    let { city, cat } = useParams()
    const [queryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)

    const regexUrl = /(^(\d+|\w+))(\,(\d+|\w+))*$/g

    const checkItemHandler = (val) => {
        // let checked = [...checkBoxList]
        // checked.push(val)
        // setCheckBoxList(checked)
        props.urlMaker(props.slug,val)
    }

    const clearMahal = () => {
        // setCheckBoxList([])
        props.urlClear(props.slug)
    }

    useEffect(() => {
        console.log("کامپوننت چکباکس");

        if (queryStirng.has(props.slug)) {
            let urlValStr = queryStirng.get(props.slug)
            if (regexUrl.test(urlValStr)) {
                let checkListArray = [];
                let urlValArray = urlValStr.split(',');
                console.log("معتبرهههههههههههه");
                console.log(urlValArray);
                urlValArray.forEach((val) => {
                    let inItemsArray = props.itemsList.filter(item => item.value === val)
                    if (inItemsArray.length === 1 && !checkListArray.includes(val)) {
                        checkListArray.push(val)
                    }
                })
                setCheckBoxList(checkListArray)
                console.log(checkListArray);
            } else {
                setCheckBoxList([])
                console.log("سسسسسسسسسسسسسسسسسس");
            }
            console.log(urlValStr);
        }else{
            setCheckBoxList([])
        }
    }, [filterParam, cat, city])


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
                                props.itemsList.map((item, index) => {
                                    return <span key={index} className={checkBoxList.includes(item.value) ? "active" : ""} onClick={() => checkItemHandler(item.value)}>{item.title}</span>
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