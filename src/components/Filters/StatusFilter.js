import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { useParams, useSearchParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../Utils/Utils';

const StatusFilter = (props) => {

    const [statusOpen, setStatusOpen] = useState(false);
    const [switchFilters, setSwitchFilters] = useState({"hasSwitchOn":false,"list":{}})

    const [queryStirng] = useSearchParams();
    let { city, cat } = useParams()

    const regexHasPhotoOrUrgent = /^(has-photo|urgent)=((true)|(false))(&(has-photo|urgent)=((true)|(false)))*$/g;


    const clearStatus = () => {
        props.urlClear(props.itemsList)
    }


    useEffect(() => {
        console.log("کامپوننت استاتوس");
       
        let switchObject = {}
        switchObject["hasSwitchOn"] = false
        switchObject["list"] = {}

        props.itemsList.forEach(element => {
            let switchOn = false 
            // console.log(element.slug);
            if (queryStirng.has(element.slug) && queryStirng.get(element.slug) === "true") {
                switchOn = true
                switchObject["hasSwitchOn"] = true
            }
            switchObject["list"][element.enTitle] = switchOn
        });
        // console.log(switchObject);
        setSwitchFilters(switchObject)

    }, [queryStirng, cat, city])


    return (
        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="status-box">
                <div className='d-flex flex-row flex-fill' onClick={() => setStatusOpen(!statusOpen)}>
                    <span className='pe-2'>
                        {statusOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    switchFilters["hasSwitchOn"] ? statusOpen ? <span className='reset-filter-span-open' onClick={clearStatus}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={statusOpen}>
                <div id="status-box">
                    <div className='mb-3'>

                        {props.itemsList.map((item,index) => {
                            return <div className="dv-filter-switch" onClick={() => props.urlMaker(item.slug)}>
                                <p className='align-self-center'>{item.title}</p>
                                <span className='align-self-center'>
                                    <Form>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            checked={switchFilters["list"][item.enTitle] ? true : false}
                                            onChange={(e) => ({ e })}
                                        />
                                    </Form>
                                </span>
                            </div>
                        })}

                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default StatusFilter;