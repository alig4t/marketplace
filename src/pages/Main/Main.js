
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

/*************************** React Bootstrap Components ***************************/
import { Container, Row } from 'react-bootstrap';

/*************************** Components ***************************/
import Layout from "../../components/Layout/Layout"
import Sidebar from '../../components/Sidebar/Sidebar';
import Cards from '../../components/Cards/Cards';
import WrongUrlMsg from '../../components/UI/WrongUrlMsg';
import NotFound from '../../components/UI/404/NotFound';

/*************************** City And Category JSON files ***************************/
import CityList from "../../JsonFiles/city.json"
import CatList from "../../JsonFiles/catlist.json"

/*************************** City And Category Contextes ***************************/
import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';

/*************************** Essentials Functions ***************************/
import { URLMakerWithHash } from '../../Utils/Utils';

const Main = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [queryStirng] = useSearchParams();
    const cityParam = queryStirng.get('cities')
    let { city, cat } = useParams()

    /*************************** Regex for validate city Ids ***************************/
    const regexStr = /(^\d+(\,\d+)*$)/g;
    const regexHash = /(^\d+(\%2C\d+)*$)/g;

    /*************************** States ***************************/
    const [currentCity, setCurrentCity] = useState({
        idsStr: "",
        idsArray: [],
        citiesList: [{ title: "" }]
    });
    const [currentCat, setCurrentCat] = useState({ id: -1 });
    const [notFound, setNotFound] = useState(false)


    /*************************** Execute when City Changed ***************************/
    useEffect(() => {

        console.log("سیییییتییییییییییی");
        let ids = [];
        let wrongAddress = false;
        let cityListArray = []

        if (city === 'iran' && queryStirng.has('cities') && regexStr.test(queryStirng.get('cities'))) {

            let citiesIdsString = queryStirng.get('cities');
            let citiesIdsArray = citiesIdsString.split(",");
            citiesIdsArray.forEach(id => {
                let cityObj = CityList.find((item) => item.id === Number(id))
                if (cityObj === undefined) {
                    wrongAddress = true;
                } else {
                    cityListArray.push(cityObj)
                    ids.push(Number(id))
                }
            });

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
            if (prevCityHash !== null && prevCityHash !== "" && regexHash.test(prevCityHash)) {
                navigate(URLMakerWithHash(prevCityHash, prevCat), { state: { wrong: true } })
            } else {
                navigate('/', { state: { wrong: true } })
            }
        } else {
            let idsStr = (ids.sort()).join("");
            setCurrentCity({
                idsStr,
                idsArray: ids,
                citiesList: cityListArray
            })
            localStorage.setItem("lastCities", ids.join("%2C"))
        }
    }, [city, cityParam])



    /*************************** Execute when Category Changed ***************************/
    useEffect(() => {
        console.log(cat);

        if (cat !== undefined) {
            let catObj = CatList.find((item) => item.slug === cat)
            if (catObj !== undefined) {
                setCurrentCat(catObj)
                localStorage.setItem("catSlug", catObj.slug)
                setNotFound(false)
            } else {
                localStorage.removeItem("catSlug")
                setNotFound(true)
            }
        } else {
            setCurrentCat({ id: -1 })
            localStorage.removeItem("catSlug")
            setNotFound(false)
        }

    }, [cat])



    return (
        <CityContext.Provider value={currentCity}>
            <CategoryContext.Provider value={currentCat}>
                <Layout>
                    <Container fluid>
                        {
                            notFound === false ? <>
                                <Row>
                                    <div className='d-none d-md-block col-md-4 col-lg-3'>
                                        <Sidebar />
                                    </div>
                                    <div className='col-12 col-md-8 col-lg-9'>
                                        <Cards />
                                    </div>
                                </Row>
                                <Row>
                                    {location.state !== null ? location.state.wrong ? <WrongUrlMsg currentCity={currentCity} /> : "" : ""}
                                </Row>
                            </>
                                : <NotFound />
                        }

                    </Container>
                </Layout>
            </CategoryContext.Provider>
        </CityContext.Provider>
    );
}

export default Main;