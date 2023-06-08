import { Button, Modal, Alert, Container, Col } from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';

import './Panel.css';
import avatar from '../../../resources/avatar.jpg';
import { axiosInstance } from '../../../API/axios';
import ProfilePage from '../profile/Profile';

function InputModal({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorDescription, setErrorDescription] = useState('')

    const schema = yup.object().shape({
        username: yup.string().required('Username field is requierd')
    });

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Give admin role by username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Formik
                        validationSchema={schema}
                        onSubmit={async (values) => {
                            let data =
                            {
                                username: values.username
                            }
                            await axiosInstance.patch('/admin', data)
                                .then(() => {
                                    setError(false)
                                    setSuccess(true)
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
                            username: '',
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
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        isValid={touched.username && !errors.username}
                                        isInvalid={!!errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                {error ? <Alert variant="danger">{errorDescription}</Alert> : success ? <Alert variant="success">Successfully</Alert> : null}
                                <Button variant="primary" type="submit" size='lg' style={{ width: '100%' }}>
                                    Add
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default function Panel() {

    const [show, setShow] = useState(false)

    const showModal = () => {
        setShow(true)
    }

    return (
        <div className='d-block'>
            <InputModal show={show} setShow={setShow} />
            <ProfilePage></ProfilePage>
            <Container className="buttons-block d-flex justify-content-center">
                <Col md={8} className="mb-5">
                    <Button href="./productCreating" variant='secondary'
                        style={{ marginLeft: "4%" }}>Create Product</Button>

                    <Button href="./IdeaCreating" variant='secondary'
                        style={{ marginLeft: "4%" }}>Submit Idea</Button>

                    <Button href="/ideas/review" variant='secondary'
                        style={{ marginLeft: "4%" }}>Check Submited Ideas</Button>

                    <Button href="" variant='secondary'
                        style={{ marginLeft: "4%" }}>Edit Profile</Button>

                    <Button variant='secondary' onClick={showModal}
                        style={{ marginLeft: "4%", marginTop: "5px" }}>Give admin rights</Button>
                </Col>
            </Container>
        </div>
    )
}