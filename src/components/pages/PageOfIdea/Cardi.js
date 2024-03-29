import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import {axiosInstance} from '../../../API/axios'


import ErrorModal from '../../errorModal/ErrorModal';
import SuccessModal from '../../successModal/SuccessModal';
import Spinner from '../../spinner/Spinner';
import "./Cardi.css"

export default function Cardi({id}) {
    const [index, setIndex] = useState(0);
    const [idea, setIdea] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDisabled, setDisabled] = useState("hidden");

    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    const handleScroll = () => {
        const position = window.pageYOffset;  
        const bodyHeight = document.body.scrollHeight;   
        if(position > 300 && position < position < bodyHeight - 1000 && role === "Admin") {
            setDisabled("visible")
        } else {
            setDisabled("hidden")
        }
        setScrollPosition(position);
    };
    const approveIdea = () => {
        axiosInstance.put(`/idea/approve/${id}`)
            .then(() => {
                setShowModal(true)
            })
            .catch((error) => {
                setErrorMessage(error.response.data.title ? error.response.data.title : error.message)
                setError(true);
            })
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const getIdeaInfo = () => {
        axiosInstance.get(`/idea/${id}`)
            .then((res) => {
                console.log(res.data);
                setIdea(res.data);
                setLoading(false)
            })
            .catch((error) => {
                setErrorMessage(error.response.data.title ? error.response.data.title : error.message)
                setError(true);
            })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        getIdeaInfo();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition])

    

    const renderImages = (arr, name) => {
        const images = arr.map(imageUrl => {
            return (
                <Carousel.Item key={imageUrl + name}>
                    <Image
                        className="d-block w-100 slide-img"
                        src={require('../../../resources/' + imageUrl)}
                        alt="Second slide"
                        rounded
                    />
                </Carousel.Item>
            )
        })
        return { images }
    }

    function ideaInfo(idea) {
        const {title, description, category, ideaImageUrls} = idea;
        console.log(ideaImageUrls);
        const { images } = ideaImageUrls ? renderImages(ideaImageUrls, title) : ""
        console.log(images);
        return (
            <>
                <Button 
                variant="custom-button button-absolute" 
                size="lg" style={{color: "#fff"}} 
                className={isDisabled}
                onClick={approveIdea}>Approve</Button>
				<SuccessModal 
                showModal = {showModal} 
                setShowModal = {setShowModal} 
                message="Idea approved successfully!"
                url="/ideas/review"/>
               <Row className='d-flex justify-content-center'>
                <Col md={5}>
                    {images != "" ? 
                    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark' className='mt-5'>
                        {images} 
                    </Carousel>
                    : ""}

                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h1 className='idea-page-title mt-5'>{title}</h1>
                    <label className='category mt-3'>{category}</label>
                    <hr style={{borderTop: "3px solid"}}/>
                    <h3 className='idea-description-title'>Description of the idea</h3>
                    <p className="idea-description">{description}</p>
                </Col>
            </Row> 
            </>
        )
    }

    const ideaRender = ideaInfo(idea);
    const errorModal = error ? <ErrorModal message={errorMessage} error={error} setError = {setError}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? ideaRender : null;

    return (
        <Container>
            {errorModal}
            {spinner}
            {content}
        </Container>
    );
}