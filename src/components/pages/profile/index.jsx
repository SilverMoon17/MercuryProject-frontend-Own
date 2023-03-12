import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../modules/cart/cart.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import imageUrl from '../../../resources/avatar.jpg'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMemo } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { Formik } from 'formik';
import * as yup from 'yup';
export const ProfilePage = () => {
    const pickFile = () => {
        document.getElementById("filePicker")?.click()
       }
    return (
        <Container>
            <Row>
                <Col className='menu'>

                    <Stack className="align-items-center" gap={3}>
                        <Image src={imageUrl} alt={imageUrl} className={'cartImage'} style={{ marginLeft: "10px" }} />
                        <Button  onClick={() => pickFile()}>Change Photo</Button>
                        <div className="">First name : Nikita</div>
                        <div className="">Last name : LOX</div>
                        <div className="">Age : 228</div>
                        <input id="filePicker" type={'file'} style={{ display : 'none' }}></input>
                    </Stack>
                </Col>
                <Col className='content' xs={9}>
                    <Formik
                        onSubmit={console.log}
                        initialValues={{
                            title: '',
                            description: '',
                            price: 0,
                            stockLevel: 0,
                            category: 'Choose category',
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
                            <Form className="idea-info-inputs d-block" onSubmit={handleSubmit}>
                                <InputGroup className="mb-3" style={{marginTop : '14px' }}>
                                    <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                                    <Form.Control
                                        placeholder="idea title"
                                        aria-label="idea title"
                                        aria-describedby="basic-addon1"
                                        name="Phone"
                                        value={values.title}
                                        onChange={handleChange}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={!!errors.title}
                                    /> 
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Description</InputGroup.Text>
                                    <Form.Control as="textarea" aria-label="Description" name="description" placeholder='up to 3000 symbols'
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                    />
                                </InputGroup>
                                    <Form.Group as={Col} controlId="category" style={{ minWidth: '40%' , marginTop : '14px' }}>
                                        <Form.Select
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            isValid={touched.category && !errors.category}
                                            isInvalid={!!errors.category}>

                                            <option>Choose category</option>
                                            <option>IT</option>
                                            <option>Communication</option>
                                            <options>Agriculture</options>
                                            <options>Transport</options>
                                            <options>Optimisation</options>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container >
    );
}