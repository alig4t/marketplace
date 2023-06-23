
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Test.css"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const Test = () => {
    const navigate = useNavigate()
    let {id} = useParams()
    let context = useOutletContext();
    setTimeout(()=>{
        navigate(-1)
    })

    return (
        <>
            {id}
            <hr />
        
        </>
    );
}

export default Test;


