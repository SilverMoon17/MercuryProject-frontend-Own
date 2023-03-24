import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../../modules/cart/cart.css';
import Image from 'react-bootstrap/Image';
import myImage from '../../../resources/avatar.jpg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const cartItems = [
    {
        name: 'Hoodie',
        inStock: true,
        shippedFrom: 'MercuryProject.com Services LLC',
        giftOptions: 'Gift options not available. Learn more',
        price: 40,
        imageUrl: myImage
    },
    {
        name: 'Hoodie hui',
        inStock: false,
        shippedFrom: 'MercuryProject.com Services LLC zalupa',
        giftOptions: 'Gift options not available. Learn more asfsdgfsd',
        price: 40,
        imageUrl: myImage
    },
    {
        name: 'Hoodie 2125',
        inStock: true,
        shippedFrom: 'MercuryProject.com Services LLC',
        giftOptions: 'Gift options not available. Learn more',
        price: 40,
        imageUrl: myImage
    },
]

export const Cart = () => {

    return (
        <Container>
            {cartItems.map((item, index) => {
                return <Container className='wrapper justify-content-md-flex-start' key={index}>
                    <Row>
                        <Col className='title'>{item.name}</Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Image src={item.imageUrl} alt={item.imageUrl} className={'cartImage'} style={{ marginLeft: "10px" }} />
                        </Col>
                        <Col>
                            <Row>
                                {item.inStock ? <p className='green'> {' - '}In stock</p> : <p className='red'>{' - '}Out of stock</p>}
                            </Row>
                            <Row>
                                <p>{' - '} {item.shippedFrom}</p>
                            </Row>
                            <Row>
                                <p>{' - '}{item.giftOptions}</p>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            })

            }
        </Container >
    );
}