import React from 'react';
import { useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"

const StatusFilter = () => {

    const [statusOpen, setStatusOpen] = useState(false);
    const [switchImage, setSwitchImage] = useState(false)
    const [switchInstant, setSwitchInstant] = useState(false)

    const clearStatus = () => {
        setSwitchInstant(false)
        setSwitchImage(false)
    }

    return (      
        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="status-box">
                <div className='d-flex flex-row flex-fill' onClick={() => setStatusOpen(!statusOpen)}>
                    <span className='pe-2'>
                        {statusOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>وضعیت آگهی</p>
                </div>
                {
                    (switchImage || switchInstant) ? statusOpen ? <span className='reset-filter-span-open' onClick={clearStatus}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={statusOpen}>
                <div id="status-box">
                    <div className='mb-3'>
                        <div className="dv-filter-switch" onClick={() => setSwitchImage(!switchImage)}>
                            <p className='align-self-center'>فقط عکس دار</p>
                            <span className='align-self-center'>
                                <Form>
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                        checked={switchImage ? true : false}
                                    />
                                </Form>
                            </span>
                        </div>
                        <div className="dv-filter-switch" onClick={() => setSwitchInstant(!switchInstant)}>
                            <p className='align-self-center'>فقط فوری ها</p>
                            <span className='align-self-center'>
                                <Form>
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                        checked={switchInstant ? true : false}
                                    />
                                </Form>
                            </span>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
     );
}
 
export default StatusFilter;