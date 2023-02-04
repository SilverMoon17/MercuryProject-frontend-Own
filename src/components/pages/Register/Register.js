import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';

import logo from '../../../resources/logo(black).svg'

export default function Register() {
    const signUpSchema = yup.object().shape({
        username: yup.string().min(5, "Minimal 5 symbols").max(25).required('Username field is requierd'),
        email: yup.string().email('Invalid e-mail').required('E-mail is reuqired'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        password: yup.string().min(8, 'Too short (8-20 symbols)').max(20, 'Too long (8-20 symbols)').required('Password is required').matches(/^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number'),
        confirmedPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match').required()
    });

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6} className="mb-5">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="mt-4 mb-3"><Image fluid src={logo} alt="" className="auth-logo" /></Link>
                    </div>
                    <Formik
                        validationSchema={signUpSchema}
                        onSubmit={console.log}
                        initialValues={{
                            username: '',
                            email: '',
                            firstName: '',
                            lastName: '',
                            password: '',
                            confirmedPassword: ''
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

                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter e-mail address"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                    <InputGroup.Text id="basic-addon1">@example.com</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">First name</InputGroup.Text>
                                    <Form.Control
                                        placeholder="First name"
                                        aria-label="First name"
                                        aria-describedby="basic-addon1"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        isValid={touched.firstName && !errors.firstName}
                                        isInvalid={!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Last name</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Last name"
                                        aria-label="Last name"
                                        aria-describedby="basic-addon1"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        isValid={touched.lastName && !errors.lastName}
                                        isInvalid={!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Enter your password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter your password" name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirmedPassword">
                                    <Form.Label>Confirm your password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm your password" name="confirmedPassword"
                                        value={values.confirmedPassword}
                                        onChange={handleChange}
                                        isValid={touched.confirmedPassword && !errors.confirmedPassword}
                                        isInvalid={!!errors.confirmedPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmedPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" size='lg' style={{ width: '100%' }}>
                                    Register
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}