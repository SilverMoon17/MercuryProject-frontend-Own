import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";
import {axiosInstance} from '../../../../API/axios'



import './MerchCard.css'
import defaultImage from '../../../../resources/default_image.png';


function ConfirmationModal({ show, setShow, id }) {


    const handleClose = () => setShow(false);

    const handleOnDelete = async (id) => {
        await axiosInstance.delete(`/product/${id}`)
        .then(() => {
            setShow(false);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        }) 
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Click Ok if you really want to remove this product
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => { handleOnDelete(id) }}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


function MerchCard({ name, description, iconUrl, price, id }) {

    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const [validDescription, setValidDescription] = useState(description);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (description.length > 100) {
            setValidDescription(description.slice(0, 100) + '...');
        }
        console.log(role);
    }, [description])
    return (
        <div style={{ position: 'relative' }} onMouseEnter={() => setShowDeleteIcon(true)} onMouseLeave={() => setShowDeleteIcon(false)}>
            {role === "Admin" ? showDeleteIcon && <span className="delete-icon" onClick={() => setShowModal(true)}></span> : null}
            {showModal && <ConfirmationModal show={showModal} setShow={setShowModal} id={id} />}
            <Link to={`/product/${id}`} className='card-link'>
                <Card className='text-align-center'>
                    <div className="Bord" style={{ width: '19rem', height: '37rem' }}>
                        <Card.Img src={iconUrl ? iconUrl : defaultImage} />

                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>
                                {validDescription}
                            </Card.Text>
                            <Button variant="primary" className="card-button">{price}$</Button>
                        </Card.Body>
                    </div>
                </Card>
            </Link>
        </div>
    )
}

export default MerchCard;

