import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import CityList from "../../JsonFiles/city.json"

const SelectCity = () => {

    const navigate = useNavigate()

    const topCities = [
        { "id": 112, "title": "بومهن", "parent": 21, "slug": "bomehen" },
        { "id": 113, "title": "تهران", "parent": 21, "slug": "tehran" },
        { "id": 114, "title": "فشم", "parent": 21, "slug": "fasham" },
        { "id": 115, "title": "لواسان", "parent": 21, "slug": "lavasan" },
        { "id": 116, "title": "ورامین", "parent": 21, "slug": "varamin" },
        { "id": 131, "title": "خمینی شهر", "parent": 3, "slug": "khomeyni-shahr" },
        { "id": 132, "title": "اصفهان", "parent": 3, "slug": "isfahan" },
        { "id": 133, "title": "سمیرم", "parent": 3, "slug": "semirom" },
        { "id": 134, "title": "شاهین شهر", "parent": 3, "slug": "shahinshahr" },
        { "id": 135, "title": "لنجان", "parent": 3, "slug": "lenjan" },
    ]


    return (
        <Container className='py-4'>
            <Row>
                <div className='col-md-6 m-auto'>
                    <div>
                        <Form.Control type="text" placeholder='جستجوی شهر' />
                    </div>
                    <div>
                        <h1 className='pt-5 pb-2 select-city-header'>شهر های پر بازدید</h1>
                        <div className='list-city d-flex flex-rox flex-wrap justify-content-between'>
                            {topCities.map((city) => {
                                return <Link to={`/s/${city.slug}`}>{city.title}</Link>

                            })}

                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
}

export default SelectCity;