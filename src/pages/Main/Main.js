import React, { useContext, useEffect, useState } from 'react';
import Layout from "../../components/Layout/Layout"
import Sidebar from '../../components/Sidebar/Sidebar';
import Cards from '../../components/Cards/Cards';
import { Container, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
// import Test from '../../components/test/Test';
import CityList from "../../JsonFiles/city.json"
import { CityContext } from '../../Context/CityContext';
// import { CityContext, CityProvider } from '../../Context/CityContext';


const Main = () => {

    console.log('Main Redner');
    let { city } = useParams()

    const [currentCity, setCurrentCity] = useState({
        idsStr: "",
        idsArray: [],
        citiesList: [{ title: "" }]
    });

    useEffect(() => {

        let cityObj = CityList.find((item) => item.slug === city)

        let ids = [];
        [cityObj].forEach((city) => {
            ids.push(city.id);
        })
        let idsStr = (ids.sort()).join("");
        setCurrentCity({
            idsStr,
            idsArray: ids,
            citiesList: [cityObj]
        })


    }, [city])

    useEffect(() => {
        // console.log(currentCity);
    
    }, [])

    return (
        <CityContext.Provider value={currentCity}>
            <Layout>
                <Container fluid>
                    <Row>
                        <div className='d-none d-md-block col-md-4 col-lg-3'>
                            <Sidebar />
                        </div>
                        <div className='col-12 col-md-8 col-lg-9'>
                            <Cards />
                        </div>
                    </Row>
                </Container>
            </Layout>
        </CityContext.Provider>
    );
}

export default Main;