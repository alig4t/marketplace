import { Button, Modal } from "react-bootstrap";
import Categories from "../Categories/Categories";

const CategoryModal = (props) => {
    return (

        <Modal show={props.showModal} fullscreen={true} onHide={props.closeModal} className="d-md-none">
            <Modal.Header closeButton>
                <Modal.Title> انتخاب دسته بندی</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Categories devicePhone={true}/>
            </Modal.Body>
            <Modal.Footer>
        <Button variant='light' className='dv-btn-closemodal' onClick={props.closeModal}>انصراف</Button>

      </Modal.Footer>
        </Modal>
    );
}

export default CategoryModal;