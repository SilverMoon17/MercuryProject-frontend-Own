import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {axiosInstance} from "../../../API/axios"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';



import './Idea.css';
import img from "../../../resources/idea_img1.png";
function InputModal({ show, setShow, IdeaId }) {
    const handleClose = () => setShow(false);

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorDescription, setErrorDescription] = useState('')

    const schema = yup.object().shape({
        donate: yup.number().required("This field is required")
    });

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Donate to promote an idea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Formik
                        validationSchema={schema}
                        onSubmit={async (values) => {
                            let data =
                            {
                                id : IdeaId,
                                donate: values.donate
                            }
                            await axiosInstance.put('/idea/donate', data)
                                .then(() => {
                                    setError(false)
                                    setSuccess(true)
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000)
                                }
                                )
                                .catch((error) => {
                                    setError(true);
                                    setSuccess(false)
                                    console.log(error);
                                    if (error.response) {
                                        let firstError = error.response.data.title;
                                        setErrorDescription(firstError)
                                    } else {
                                        setErrorDescription(error.message)
                                    }
                                })
                        }}
                        initialValues={{
                            donate: 0,
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Enter the amount you would like to donate"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        name="donate"
                                        value={values.donate}
                                        onChange={handleChange}
                                        isValid={touched.donate && !errors.donate}
                                        isInvalid={!!errors.donate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.donate}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                {error ? <Alert variant="danger">{errorDescription}</Alert> : success ? <Alert variant="success">Successfully</Alert> : null}
                                <Button variant="primary" type="submit" size='lg' style={{ width: '100%' }}>
                                    Donate
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

function ConfirmationModal({ show, setShow, id }) {


    const handleClose = () => setShow(false);

    const handleOnDelete = async (id) => {
        await axiosInstance.delete(`/idea/${id}`)
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

export default function Idea(
    {id,
    title,
    description,
    status,
    goal,
    collected,
    category, 
    imageUrls,}
) {
    const [progress, setProgress] = useState(0);
    const [validDescription, setValidDescription] = useState(description);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalInput, setShowModalInput] = useState(false);
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");


    useEffect(() => {
        if (description.length > 350) {
            setValidDescription(description.slice(0, 350) + '...');
        }
    }, [description])

    function calcProgress(collected, goal) {
        setProgress((collected * 100) / goal);
    }

    useEffect(() => { calcProgress(collected, goal) })

    const handleClick = () => {
        setShowModalInput(true);
    }

    return (
        <>
            <div className="idea-block d-flex mb-5" style={{ position: 'relative', zIndex: '0' }} onMouseEnter={() => setShowDeleteIcon(true)} onMouseLeave={() => setShowDeleteIcon(false)}>
            {role === "Admin" ? showDeleteIcon && <span className="delete-icon" onClick={() => setShowModal(true)}></span> : null}
            {showModal && <ConfirmationModal show={showModal} setShow={setShowModal} id={id} />}
            {showModalInput && <InputModal show={showModalInput} setShow={setShowModalInput} IdeaId={id} />}
                <Image className='idea-image' rounded src={imageUrls ? imageUrls[0] : img} style={{ marginLeft: "10px" }} />
                <div className="idea-block-info">
                    <h3 className="idea-title">{title}</h3>
                    <label className='category'>{category}</label>
                    <p className="idea-description">{validDescription}</p>
                    <div className="collected d-block" style={{ width: '40%' }}>
                        <span className='collected-text'>Collected</span>
                        <ProgressBar now={progress} />
                        <div className="d-flex justify-content-between">
                            <span>{collected}$</span>
                            <span>{goal}$</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ marginRight: "66px" }}>
                        <Button onClick={handleClick}>Donate</Button>
                        <Link to={`/idea/${id}`}><Button>LEARN MORE</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
} 