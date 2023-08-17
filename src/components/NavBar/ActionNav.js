import { useContext, useState } from "react";
import { Badge, Container, Row } from "react-bootstrap";
import CategoryModal from "../Modal/CategoryModal";
import DistrictModal from "../Modal/DistrictModal";
import FilterModal from "../Modal/FilterModal";
import { CategoryContext } from "../../Context/CategoryContext";
import { IoIosClose } from 'react-icons/io'
import { Link } from "react-router-dom";
import { CityContext } from "../../Context/CityContext";


const ActionNav = () => {

    const currentCat = useContext(CategoryContext)
    const currentCity = useContext(CityContext)
    // console.log(currentCat);
    // console.log(currentCity);

    const [categoryModal, setCategoryModal] = useState(false)
    const categoryModalHandler = () => {
        setCategoryModal(true)
    }
    const [filterModal, setFilterModal] = useState(false)
    const filterModalHandler = () => {
        setFilterModal(true)
    }
    const [districtModal, setDistrictModal] = useState(false)
    const districtModalHandler = () => {
        setDistrictModal(true)
    }

    return (
        <>
            <Container fluid className="d-md-none dv-actionnav-container sticky-top pt-3 pb-2">
                <Row>
                    <div className="col-12 dv-action-nav">
                        <Badge onClick={filterModalHandler} className="dv-action-badge" bg="">
                            فیلترها
                        </Badge>


                        <Badge onClick={categoryModalHandler} className="dv-action-badge" bg="">
                            دسته ها
                        </Badge>

                        {currentCat && <Badge className="dv-action-badge active" bg="">

                            <span onClick={categoryModalHandler}>
                                {currentCat.title}
                            </span>

                            <span className="dv-deleteFilter">
                                <Link to={currentCity.citiesList.length > 1 ? `/s/iran?cities=${currentCity.idsArray.join('-')}` : `/s/${currentCity.citiesList[0].slug}`}>
                                    <IoIosClose />
                                </Link>
                            </span>

                        </Badge>}

                        <Badge onClick={districtModalHandler} className="dv-action-badge" bg="">
                            محله ها
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            خودرو سواری
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            فروش آپارتمان
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            اجاره آپارتمان
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            موبایل
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            حیوانات
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            استخدام
                        </Badge>
                        <Badge className="dv-action-badge" bg="">
                            وسایل شخصی
                        </Badge>
                    </div>
                </Row>
            </Container>

            {<FilterModal showModal={filterModal} devicePhone={true} closeModal={() => setFilterModal(false)} />}
            {<CategoryModal showModal={categoryModal} devicePhone={true} closeModal={() => setCategoryModal(false)} />}
            {<DistrictModal showModal={districtModal} devicePhone={true} currentDistricts={[16, 12]} closeModal={() => setDistrictModal(false)} />}

        </>
    );
}

export default ActionNav;