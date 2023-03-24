import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import {axiosInstance} from '../../../API/axios';

import logo from '../../../resources/logo(black).svg'

export default function Login() {

    const [error, setError] = useState(false)
    const [errorDescription, setErrorDescription] = useState('')

    const navigate = useNavigate()

    const schema = yup.object().shape({
        email: yup.string().email('Invalid e-mail').required('E-mail is reuqired'),
        password: yup.string().min(8, 'Too short (8-20 symbols)').max(20, 'Too long (8-20 symbols)').required('Password is required')
    });

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="mt-4 mb-3"><Image fluid src={logo} alt="" className="auth-logo" /></Link>
                    </div>
                    <Formik
                        validationSchema={schema}
                        onSubmit={async (values) => {
                            let data = {
                                "email": values.email,
                                "password": values.password
                            }
                            let res = await axiosInstance.post('/auth/login', data)
                                .catch((error) => {
                                    console.log(error)
                                    setError(true)
                                    setErrorDescription(error.response.data.errors['Auth.InvalidCredentials'])
                                })
                            if (res && values.remember) {
                                localStorage.setItem("token", res.data.token)
                                localStorage.setItem("id", res.data.id)
                                localStorage.setItem("username", res.data.username)
                                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
                                navigate('/')
                                window.location.reload();
                            } else if (res) {
                                sessionStorage.setItem("token", res.data.token)
                                sessionStorage.setItem("id", res.data.id)
                                sessionStorage.setItem("username", res.data.username)
                                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
                                navigate('/')
                                window.location.reload();
                            }
                        }}
                        initialValues={{
                            email: '',
                            password: '',
                            remember: false
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
                        }) =>
                            (<Form noValidate className="mb-5" onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                    required 
                                    type="email" 
                                    placeholder="Enter email" 
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    isValid={touched.email && !errors.email}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    required 
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                    isValid={touched.password && !errors.password}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex justify-content-between" controlId="remember">
                                    <Form.Check type="checkbox" label="Remember me" />
                                    <Link to="/register">Not registered yet? Sign up</Link>
                                </Form.Group>
                                {error && <Alert variant="danger">{errorDescription}</Alert>}
                                <Button variant="primary" type="submit" size='lg'>
                                    Login
                                </Button>
                            </Form>)}
                        </Formik>
                </Col>
            </Row>
        </Container>
    )
}