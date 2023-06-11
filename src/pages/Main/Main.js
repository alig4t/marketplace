import React from 'react';
import Layout from "../../components/Layout/Layout"
import Sidebar from '../../components/Sidebar/Sidebar';
import Cards from '../../components/Cards/Cards';
import { Col, Container, Row } from 'react-bootstrap';
import Test from '../../components/test/Test';

const Main = () => {
    return (
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
    );
}

export default Main;