import React,{ useState }  from 'react';
import { ListGroup } from 'react-bootstrap';
import CategoryModal from "./../Modal/CategoryModal"


const CategoryFilter = () => {

    const [categoryModal, setCategoryModal] = useState(false);

    return (
        <>
            <div className='dv-sidebox d-md-none'>
                <ListGroup onClick={() => setCategoryModal(!categoryModal)} className='dvm-filter-header'>
                    {/* <span className='pe-2'>
                {mahalOpen ? <FiChevronUp /> : <FiChevronDown />}
            </span> */}
                    <p>دسته بندی</p>
                    <span>انتخاب کنید</span>
                </ListGroup>
            </div>

            {<CategoryModal showModal={categoryModal} devicePhone={true} closeModal={() => setCategoryModal(false)} />}
        </>

    );
}

export default CategoryFilter;