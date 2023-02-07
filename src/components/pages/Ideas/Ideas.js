import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import logo from "../../../resources/logo(black).svg";
import Idea from "./Idea";
import './Ideas.css';

export default function Ideas() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDisabled, setDisabled] = useState("hidden");
    const handleScroll = () => {
        const position = window.pageYOffset;      
        if(position > 500 && position < 1300) {
            setDisabled("visible")
        } else {
            setDisabled("hidden")
        }
        console.log(position);
        console.log(isDisabled);
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        console.log(scrollPosition);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Link to='/ideaCreating' className={isDisabled}><Button variant="custom-button button-absolute" size="lg" style={{color: "#fff"}}>Create new idea</Button></Link>
            <Container>
                <Row>
                    <Col md={4} sm={8} className="ideas-logo-block d-flex align-items-center">
                        <img src={logo} alt="" width={306} />
                        <h2 className="merch-title">Ideas</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <form className="search-box d-flex align-items-center justify-content-between">
                            <div className="search-input-group">
                                <input type="text" placeholder='Search' className='search-input' />
                            </div>
                            <div className="d-flex" style={{ width: "40%" }}>
                                <Form.Select size="lg" style={{ width: '50%', marginLeft: '45px' }}>
                                    <option>Category</option>
                                </Form.Select>
                                <button className='search-button'>Search</button>
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Idea />
                        <Idea />
                        <Idea />
                    </Col>
                </Row>
            </Container>
        </>
    )
}