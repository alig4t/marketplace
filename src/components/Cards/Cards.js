import React, { useEffect, useState } from 'react';

import Ads from "./ads.json"
import "./Card2.css"

import CardPlaceHolder from '../UI/CardPlaceHolder/CardPlaceHolder';
import { useLocation, useParams } from 'react-router-dom';
import ErrorCard from '../UI/ErrorCard/ErrorCard';
import SwitchShow from './SwitchShow/SwitchShow';
import CardShow1 from '../UI/CardShow1/CardShow1';
import CardShow2 from '../UI/CardShow2/CardShow2';

const Cards = () => {

    const [isLoading, setIsLoading] = useState(true);


    const [cardsList, setCardsList] = useState([])
    const [errorType, setErrorType] = useState(-1)

    const [defaultShowTypeUi, setDefaultShowTypeUi] = useState(true)

    let { city, cat } = useParams()
    const location = useLocation()

    // console.log(location);
    // console.log(city);

    const urls = [
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
        "https://mocki.io/v1/089fb",
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
        "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
    ]

    // console.log(Math.floor(Math.random() * (3 - 0 + 1) + 0));
    // const index = Math.floor(Math.random() * (3 - 0 + 1) + 0)
    // fetch("https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db")
    // https://mocki.io/v1/c2f5a6e7-2beb-46b1-9384-978691874bcc

    const fetchData = () => {
        let index = Math.floor(Math.random() * ((urls.length - 1) - 0 + 1) + 0)
        fetch(urls[index])
            .then((resp) => {
                return resp.json();
            })
            .then((respData) => {
                setTimeout(() => {
                    setCardsList(respData);
                    setIsLoading(false)
                    setErrorType(-1)
                }, 1000)
            })
            .catch(() => {
                setErrorType(500)
                setIsLoading(false)
                setCardsList([])
            })
    }



    useEffect(() => {
        // setErrorType(-1)
        setIsLoading(true)
        fetchData()

    }, [city, cat, location.search])



    const tryAgainLoader = () => {
        let index = Math.floor(Math.random() * ((urls.length - 1) - 0 + 1) + 0)

        // setErrorType(-1)
        // setIsLoading(true)
        fetch(urls[index])
            .then((resp) => {
                return resp.json();
            })
            .then((respData) => {

                setCardsList(respData);
                setErrorType(-1)

            })
            .catch(() => {
                setErrorType(500)
            })
    }





    return (
        // <div className='d-flex flex-row justify-content-around'>

        <div className='row'>

            {isLoading ? <CardPlaceHolder /> : <>
                <SwitchShow changeDefaultShow={setDefaultShowTypeUi} defaultShow={defaultShowTypeUi} />
                {
                    defaultShowTypeUi ? <CardShow2 cardsList={cardsList} /> : <CardShow1 cardsList={cardsList} />
                }
            </>
            }
            {
                errorType > 0 && isLoading === false ? (
                    <ErrorCard reload={tryAgainLoader} />
                ) : ""
            }


        </div>
    );
}

export default Cards;