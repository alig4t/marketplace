import React, { useState } from 'react';
import "./ErrorCard.css"
import { Button, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';



const ErrorCard = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const [btnReload, setBtnReload] = useState(false)

    // console.log(location.pathname);

    function refreshPage() {
        // window.location.reload(false);
        // navigate(location.pathname)
        setBtnReload(true)
        props.reload()
        setTimeout(()=>{
        setBtnReload(false)

        },2000)
    }

    return (
        <div className='w-100 py-4 text-center error-card'>
        

            {btnReload ? (
                <>
                    <p>در حال تلاش مجدد..</p>
                    <Spinner animation="border" className='my-3' variant="danger" />
                </>
            ) : (
                <>
                    <p>خطا در برقرای ارتباط با سرور</p>
                    <Button variant='outline-danger' onClick={refreshPage} className='my-3'>تلاش مجدد</Button>
                </>
            )}

        </div>
    );
}

export default ErrorCard;