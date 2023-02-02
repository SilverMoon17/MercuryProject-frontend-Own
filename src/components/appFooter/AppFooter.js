import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './AppFooter.css'

function AppFooter() {
        return (
            <Container className="footer-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} className="d-flex justify-content-between">
                        <div className="footer-block">
                            <h4 className="footer-title">About us</h4>
                            <ul className="footer-menu">
                                <li className="footer-item"><a href="/#" className="footer-link">Board of Directors</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Advisory Board</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Our Partners</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Financial Transparency</a></li>
                            </ul>
                        </div>
                        <div className="footer-block">
                            <h4 className="footer-title">Get Involved</h4>
                            <ul className="footer-menu">
                                <li className="footer-item"><a href="/#" className="footer-link">Become a Volunteer</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Help With Fundraising</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Shareable Materials</a></li>
                            </ul>
                        </div>
                        <div className="footer-block">
                            <h4 className="footer-title">Contact</h4>
                            <ul className="footer-menu">
                                <li className="footer-item"><a href="/#" className="footer-link">Contact Us</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Disclaimer</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Privacy Policy</a></li>
                                <li className="footer-item"><a href="/#" className="footer-link">Terms and Conditions</a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
}

export default AppFooter;