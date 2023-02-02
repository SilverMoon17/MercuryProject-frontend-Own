import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './AppCard.css'
import cardImage1 from '../../../../resources/card-image1.jpg'

function AppCard() {
        return(
            <Container className="card-container">
                <Row className="justify-content-md-center">
                    <h2 className="title">EXPLORE THE MERCURY PROJECT</h2>
                    <Col xs={12} md={12} className="d-flex justify-content-between text-center">
                        <Card style={{ width: '21rem', height: '37rem' }}>
                        <Card.Img variant="top" src={cardImage1} />
                            <Card.Body>
                                <Card.Title>What Is The Venus Project?</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur. Diam elit congue arcuLorem ipsum dolor sit amet consectetur. 
                                Diam elit congue arcu.
                                </Card.Text>
                                <Button variant="primary" className="card-button">READ MORE</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '21rem', height: '37rem' }}>
                        <Card.Img variant="top" src={cardImage1} />
                            <Card.Body>
                                <Card.Title>What Is The Venus Project?</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur. Diam elit congue arcuLorem ipsum dolor sit amet consectetur. 
                                Diam elit congue arcu.
                                </Card.Text>
                                <Button variant="primary" className="card-button">READ MORE</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '21rem', height: '37rem' }}>
                        <Card.Img variant="top" src={cardImage1} />
                            <Card.Body>
                                <Card.Title>What Is The Venus Project?</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur. Diam elit congue arcuLorem ipsum dolor sit amet consectetur. 
                                Diam elit congue arcu.
                                </Card.Text>
                                <Button variant="primary" className="card-button">READ MORE</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
}

export default AppCard; 