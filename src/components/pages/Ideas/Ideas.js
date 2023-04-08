import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import logo from "../../../resources/logo(black).svg";
import Idea from "./Idea";
import ErrorModal from "../../errorModal/ErrorModal";
import Spinner from "../../spinner/Spinner";
import './Ideas.css';

export default function Ideas(
        {
            ideasList, 
            loading, 
            error,
            setError,
            errorMessage,
        }
    ) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDisabled, setDisabled] = useState("hidden");
    const handleScroll = () => {
        const position = window.pageYOffset;      
        if(position > 500 && position < 1300) {
            setDisabled("visible")
        } else {
            setDisabled("hidden")
        }
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        const {items} = renderList(ideasList);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ideasList]);

    function renderList(arr) {
        const items = arr.map(idea => {
            const {id, title, description, status, goal, collected, category, ideaImageUrls } = idea
            return (
                <Idea 
                    key = {id.value} 
                    id = {id.value}
                    title = {title} 
                    description={description}
                    status = {status}
                    goal = {goal}
                    collected = {collected} 
                    category = {category} 
                    imageUrls = {ideaImageUrls}
                />
            )
        })
        return {items}
    }

    const {items} = renderList(ideasList);
    const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError = {setError}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

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
                        <ul>
                            {errorModal}
                            {spinner}
                            {content} 
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}