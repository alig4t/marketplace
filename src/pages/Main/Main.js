import React, { useContext, useEffect, useState, useQuery } from 'react';
import Layout from "../../components/Layout/Layout"
import Sidebar from '../../components/Sidebar/Sidebar';
import Cards from '../../components/Cards/Cards';
import { Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import Test from '../../components/test/Test';
import CityList from "../../JsonFiles/city.json"
import CatList from "../../JsonFiles/catlist.json"

import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';
import { URLMaker, URLMakerWithHash } from '../../Utils/Utils';
import WrongUrlMsg from '../../components/UI/WrongUrlMsg';

// import { CityContext, CityProvider } from '../../Context/CityContext';


const Main = (props) => {

    const navigate = useNavigate()

    const regexStr = /(^\d+(\,\d+)*$)/g;
    const regexHash = /(^\d+(\%2C\d+)*$)/g;

    const location = useLocation()

    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(location);

    const [queryStirng] = useSearchParams();
    console.log(queryStirng.get('cities'));

    // console.log('Main Redner');
    let { city, cat } = useParams()

    const [currentCity, setCurrentCity] = useState({
        idsStr: "",
        idsArray: [],
        citiesList: [{ title: "" }]
    });

    const [currentCat, setCurrentCat] = useState({ id: -1 });


    // useEffect(()=>{
    //     console.log(currentCity);
    // })

    useEffect(() => {

        let ids = [];
        let wrongAddress = false;
        let cityListArray = []
        // let cityObj = {}
        if (city === 'iran') {

            if (queryStirng.has('cities')) {
                let citiesIdsString = queryStirng.get('cities');
                console.log(citiesIdsString);

                // const regex = /(^\d+(\%2C\d+)*$)/gm;

                if (regexStr.test(citiesIdsString)) {
                    console.log("رشته معتبر است.");
                } else {
                    console.log("رشته نااامعتبر است.");

                }

                // let citiesIdsArray = decodeURIComponent(citiesIdsString);
                let citiesIdsArray = citiesIdsString.split(",");
                citiesIdsArray.forEach(id => {
                    let cityObj = CityList.find((item) => item.id === Number(id))
                    console.log(cityObj);
                    if (cityObj === undefined) {
                        console.log("Wrong");
                        wrongAddress = true;
                    } else {
                        cityListArray.push(cityObj)
                        ids.push(Number(id))
                    }
                });
            } else {
                wrongAddress = true;
            }

        } else {
            let singleCityObj = CityList.find((item) => item.slug === city)
            if (singleCityObj === undefined) {
                wrongAddress = true
            } else {
                ids.push(singleCityObj.id)
                cityListArray.push(singleCityObj)
            }
        }

        if (wrongAddress) {
            let prevCityHash = localStorage.getItem("lastCities");
            let prevCat = localStorage.getItem("catSlug");
            console.log(currentCat);
            if (prevCityHash !== null && prevCityHash !== "" && regexHash.test(prevCityHash)) {
                console.log("هکس معتبر است");
                navigate(URLMakerWithHash(prevCityHash, prevCat),{state:{wrong:true}})
            } else {
                navigate('/',{state:{wrong:true}})
            }
        } else {
            let idsStr = (ids.sort()).join("");
            setCurrentCity({
                idsStr,
                idsArray: ids,
                citiesList: cityListArray
            })
            console.log(ids.join("%2C"));
            localStorage.setItem("lastCities", ids.join("%2C"))
        }

    }, [city, queryStirng])



    useEffect(() => {
        // console.log(cat);
        console.log(cat);
        let catObj = CatList.find((item) => item.slug === cat)
        setCurrentCat(catObj)

        if (cat !== undefined) {
            localStorage.setItem("catSlug", catObj.slug)
        } else {
            localStorage.removeItem("catSlug")
        }
        // console.log(catObj);
        // console.log(catObj);
        // console.log("<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>");

    }, [cat])

    useEffect(() => {
        // console.log(currentCity);

    }, [])

    return (
        <CityContext.Provider value={currentCity}>
            <CategoryContext.Provider value={currentCat}>
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
                        <Row>
                            {location.state !== null ? location.state.wrong ? <WrongUrlMsg currentCity={currentCity} />:"":""}}
                        </Row>
                    </Container>
                </Layout>
            </CategoryContext.Provider>
        </CityContext.Provider>
    );
}

export default Main;